from __future__ import annotations

from dataclasses import dataclass

from .gate import apply_evidence_gate, is_eligible_for_recommend_list
from .report import DecisionReport, LaneRecommendation, RecommendationItem
from .store import IntelStore, RepoRow


LANES = ["agent", "mcp", "rag", "gateway", "eval", "security"]


@dataclass(frozen=True)
class Constraints:
    lane: str | None = None
    license_deny: list[str] | None = None
    risk_tolerance: str | None = None  # "low|medium|high" (MVP: best-effort)


def _matches_constraints(row: RepoRow, c: Constraints) -> bool:
    if c.lane and row.topic != c.lane:
        return False
    if c.license_deny:
        deny = {x.strip().lower() for x in c.license_deny if x and x.strip()}
        if row.license.strip().lower() in deny:
            return False
    return True


def _rank_key(row: RepoRow) -> tuple:
    posture = row.adoption_priority
    verdict = row.decision_verdict
    risk = row.risk_level

    posture_rank = {"P0": 0, "P1": 1, "P2": 2}.get(posture, 9)
    verdict_rank = {"survives": 0, "partial": 1, "fails": 2}.get(verdict, 9)
    risk_rank = {"low": 0, "medium": 1, "high": 2}.get(risk, 9)

    return (posture_rank, verdict_rank, risk_rank, row.repo.lower())


def _default_boundaries(row: RepoRow) -> tuple[str, str]:
    allowed = "Public-only evaluation and controlled adoption based on posture/triggers."
    not_allowed = "Production promotion without evidence, rollback signals, and risk review."
    if row.adoption_priority == "P0":
        allowed = "Scale profile: allowed for production when triggers are met and gates are in place."
        not_allowed = "Ungated rollout; upgrades without canary and rollback."
    return allowed, not_allowed


def _to_item(store: IntelStore, row: RepoRow) -> RecommendationItem:
    allowed, not_allowed = _default_boundaries(row)
    links = store.evidence_links_for_repo(row.repo)
    item = RecommendationItem(
        repo=row.repo,
        lane=row.topic,
        posture=row.adoption_priority if row.adoption_priority in {"P0", "P1", "P2"} else "P2",
        verdict=row.decision_verdict if row.decision_verdict in {"survives", "partial", "fails"} else "unverified",
        why=row.why_relevant or "Curated candidate from the intel master table.",
        boundaries_allowed=allowed,
        boundaries_not_allowed=not_allowed,
        risk_signal=row.risk_signal or "risk_signal_missing",
        rollback_signal=row.rollback_signal or "rollback_signal_missing",
        evidence_links=links,
        alternatives=[],
    )
    return apply_evidence_gate(item)


def recommend_by_intent(
    store: IntelStore,
    query: str,
    constraints: Constraints,
    max_per_lane: int = 6,
) -> DecisionReport:
    """
    Deterministic baseline:
    - filter by constraints
    - rank by posture/verdict/risk
    - output per lane
    """

    candidates = [r for r in store.all_repos() if _matches_constraints(r, constraints)]
    candidates.sort(key=_rank_key)

    lanes: list[LaneRecommendation] = []
    for lane in ([constraints.lane] if constraints.lane else LANES):
        if not lane:
            continue
        rows = [r for r in candidates if r.topic == lane]
        items = [_to_item(store, r) for r in rows]
        # Only show eligible items as "recommendations" (unverified items are removed from list).
        eligible = [i for i in items if is_eligible_for_recommend_list(i)]
        lanes.append(LaneRecommendation(lane=lane, items=eligible[:max_per_lane]))

    report = DecisionReport(
        input_summary={
            "mode": "intent",
            "query": (query or "").strip(),
            "lane": constraints.lane or "",
        },
        lanes=lanes,
        unknown_items=[],
        next_actions=[
            "Read publish/LATEST.md to see current decisions and top risks.",
            "If adopting, record boundaries + rollback signals in your own ticket.",
            "Run BYO inventory analysis if you have an existing stack list.",
        ],
    )
    report.validate()
    return report


def analyze_inventory(store: IntelStore, repos: list[str]) -> DecisionReport:
    unknown: list[str] = []
    matched: list[RecommendationItem] = []

    for raw in repos:
        slug = (raw or "").strip()
        if not slug:
            continue
        row = store.get_repo(slug)
        if not row:
            unknown.append(slug)
            continue
        matched.append(_to_item(store, row))

    by_lane: dict[str, list[RecommendationItem]] = {}
    for item in matched:
        if not is_eligible_for_recommend_list(item):
            continue
        by_lane.setdefault(item.lane, []).append(item)

    lanes = [
        LaneRecommendation(lane=lane, items=sorted(items, key=lambda i: (i.posture, i.repo.lower()))[:10])
        for lane, items in sorted(by_lane.items())
    ]

    report = DecisionReport(
        input_summary={"mode": "inventory", "count": str(len(repos))},
        lanes=lanes,
        unknown_items=sorted(set(unknown)),
        next_actions=[
            "Submit unknown items for ingestion (public-only) to expand coverage.",
            "Review upgrade-risk-matrix before upgrading any P0/P1 dependency.",
        ],
    )
    report.validate()
    return report

