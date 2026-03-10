#!/usr/bin/env python3
"""
Validate product DB (MVP): evidence + submissions.

Hard rule (MVP baseline):
- Every P0/P1 repo in data/master/repo_master.csv must have >= 1 evidence row.
"""

from __future__ import annotations

import csv
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def eprint(msg: str) -> None:
    print(msg, file=sys.stderr)


def load_repo_master() -> list[dict[str, str]]:
    path = ROOT / "data" / "master" / "repo_master.csv"
    with path.open("r", encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def load_evidence() -> dict[str, list[dict[str, str]]]:
    path = ROOT / "data" / "db" / "evidence.csv"
    if not path.exists():
        return {}
    out: dict[str, list[dict[str, str]]] = {}
    with path.open("r", encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            repo = (row.get("repo") or "").strip()
            if not repo:
                continue
            out.setdefault(repo.lower(), []).append(row)
    return out


def main() -> int:
    try:
        evidence = load_evidence()
        missing: list[str] = []
        for row in load_repo_master():
            pr = (row.get("adoption_priority") or "").strip().upper()
            if pr not in {"P0", "P1"}:
                continue
            repo = (row.get("repo") or "").strip()
            if not repo:
                continue
            links = [r.get("url") for r in evidence.get(repo.lower(), []) if (r.get("url") or "").strip()]
            if not links:
                missing.append(repo)

        if missing:
            raise ValueError("Missing evidence for P0/P1 repos: " + ", ".join(sorted(missing)))

        print("validate_catalog_db: OK")
        return 0
    except ValueError as ex:
        eprint(f"validate_catalog_db: FAIL: {ex}")
        return 2


if __name__ == "__main__":
    raise SystemExit(main())

