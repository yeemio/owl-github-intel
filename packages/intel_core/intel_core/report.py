from __future__ import annotations

from dataclasses import dataclass, field
from typing import Literal


Posture = Literal["P0", "P1", "P2"]
Verdict = Literal["survives", "partial", "fails", "unverified"]


@dataclass(frozen=True)
class RecommendationItem:
    repo: str
    lane: str
    posture: Posture
    verdict: Verdict
    why: str
    boundaries_allowed: str
    boundaries_not_allowed: str
    risk_signal: str
    rollback_signal: str
    evidence_links: list[str] = field(default_factory=list)
    alternatives: list[str] = field(default_factory=list)

    def validate(self) -> None:
        if not self.repo or "/" not in self.repo:
            raise ValueError(f"Invalid repo slug: {self.repo!r}")
        if not self.lane:
            raise ValueError("Missing lane")
        if self.posture not in {"P0", "P1", "P2"}:
            raise ValueError(f"Invalid posture: {self.posture}")
        if self.verdict not in {"survives", "partial", "fails", "unverified"}:
            raise ValueError(f"Invalid verdict: {self.verdict}")


@dataclass(frozen=True)
class LaneRecommendation:
    lane: str
    items: list[RecommendationItem]

    def validate(self) -> None:
        if not self.lane:
            raise ValueError("Missing lane")
        for item in self.items:
            item.validate()


@dataclass(frozen=True)
class DecisionReport:
    input_summary: dict[str, str]
    lanes: list[LaneRecommendation]
    unknown_items: list[str] = field(default_factory=list)
    next_actions: list[str] = field(default_factory=list)

    def validate(self) -> None:
        if not isinstance(self.input_summary, dict):
            raise ValueError("input_summary must be a dict")
        for lane in self.lanes:
            lane.validate()

    def to_dict(self) -> dict:
        def item_to_dict(i: RecommendationItem) -> dict:
            return {
                "repo": i.repo,
                "lane": i.lane,
                "posture": i.posture,
                "verdict": i.verdict,
                "why": i.why,
                "boundaries": {
                    "allowed": i.boundaries_allowed,
                    "not_allowed": i.boundaries_not_allowed,
                },
                "risk_signal": i.risk_signal,
                "rollback_signal": i.rollback_signal,
                "evidence_links": i.evidence_links,
                "alternatives": i.alternatives,
            }

        return {
            "input_summary": dict(self.input_summary),
            "lanes": [
                {"lane": lr.lane, "items": [item_to_dict(i) for i in lr.items]}
                for lr in self.lanes
            ],
            "unknown_items": list(self.unknown_items),
            "next_actions": list(self.next_actions),
        }

