from __future__ import annotations

from .report import RecommendationItem


def apply_evidence_gate(item: RecommendationItem) -> RecommendationItem:
    """
    Hard gate: if an item has no evidence links, it cannot be recommended.
    We downgrade it to verdict=unverified and clear posture to P2 (conservative).
    """

    if item.evidence_links:
        return item

    # Keep copy with conservative posture and verdict.
    return RecommendationItem(
        repo=item.repo,
        lane=item.lane,
        posture="P2",
        verdict="unverified",
        why=item.why or "No evidence links available in the current database snapshot.",
        boundaries_allowed=item.boundaries_allowed,
        boundaries_not_allowed=item.boundaries_not_allowed,
        risk_signal=item.risk_signal or "evidence_missing",
        rollback_signal=item.rollback_signal or "do_not_promote_without_evidence",
        evidence_links=[],
        alternatives=item.alternatives,
    )


def is_eligible_for_recommend_list(item: RecommendationItem) -> bool:
    return bool(item.evidence_links) and item.verdict != "unverified"

