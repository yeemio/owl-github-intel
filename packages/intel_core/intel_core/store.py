from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class RepoRow:
    repo: str
    url: str
    topic: str
    license: str
    risk_level: str
    adoption_priority: str
    decision_verdict: str
    why_relevant: str
    risk_signal: str
    rollback_signal: str
    updated_at: str


@dataclass(frozen=True)
class EvidenceRow:
    evidence_id: str
    repo: str
    type: str
    url: str
    title: str
    captured_at: str


class IntelStore:
    """
    Read-only store over the current intel asset snapshot.

    MVP posture:
    - repos come from data/master/repo_master.csv
    - evidence comes from data/db/evidence.csv
    """

    def __init__(self, root: Path) -> None:
        self._root = root
        self._repos: dict[str, RepoRow] = {}
        self._evidence_by_repo: dict[str, list[EvidenceRow]] = {}
        self._load()

    @property
    def root(self) -> Path:
        return self._root

    def _load(self) -> None:
        self._repos = self._load_repos()
        self._evidence_by_repo = self._load_evidence()

    def _load_repos(self) -> dict[str, RepoRow]:
        path = self._root / "data" / "master" / "repo_master.csv"
        out: dict[str, RepoRow] = {}
        with path.open("r", encoding="utf-8", newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                repo = (row.get("repo") or "").strip()
                if not repo:
                    continue
                out[repo.lower()] = RepoRow(
                    repo=repo,
                    url=(row.get("url") or "").strip(),
                    topic=(row.get("topic") or "").strip().lower(),
                    license=(row.get("license") or "").strip(),
                    risk_level=(row.get("risk_level") or "").strip().lower(),
                    adoption_priority=(row.get("adoption_priority") or "").strip().upper(),
                    decision_verdict=(row.get("decision_verdict") or "").strip().lower(),
                    why_relevant=(row.get("why_relevant") or "").strip(),
                    risk_signal=(row.get("risk_signal") or "").strip(),
                    rollback_signal=(row.get("rollback_signal") or "").strip(),
                    updated_at=(row.get("updated_at") or "").strip(),
                )
        return out

    def _load_evidence(self) -> dict[str, list[EvidenceRow]]:
        path = self._root / "data" / "db" / "evidence.csv"
        out: dict[str, list[EvidenceRow]] = {}
        if not path.exists():
            return out
        with path.open("r", encoding="utf-8", newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                repo = (row.get("repo") or "").strip()
                if not repo:
                    continue
                ev = EvidenceRow(
                    evidence_id=(row.get("evidence_id") or "").strip(),
                    repo=repo,
                    type=(row.get("type") or "").strip(),
                    url=(row.get("url") or "").strip(),
                    title=(row.get("title") or "").strip(),
                    captured_at=(row.get("captured_at") or "").strip(),
                )
                out.setdefault(repo.lower(), []).append(ev)
        return out

    def get_repo(self, slug: str) -> RepoRow | None:
        return self._repos.get((slug or "").strip().lower())

    def all_repos(self) -> list[RepoRow]:
        return list(self._repos.values())

    def evidence_links_for_repo(self, slug: str) -> list[str]:
        rows = self._evidence_by_repo.get((slug or "").strip().lower(), [])
        links = [r.url for r in rows if r.url]
        # stable order
        return sorted(set(links))

