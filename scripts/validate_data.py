#!/usr/bin/env python3
"""
Lightweight repo data validation (no external deps).

Goal: fail fast in CI when core published assets are missing or structurally broken.
"""

from __future__ import annotations

import csv
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def eprint(msg: str) -> None:
    print(msg, file=sys.stderr)


def require_file(rel_path: str) -> Path:
    p = ROOT / rel_path
    if not p.exists():
        raise ValueError(f"Missing required file: {rel_path}")
    if p.is_dir():
        raise ValueError(f"Expected file but found directory: {rel_path}")
    return p


def read_csv_header(path: Path) -> list[str]:
    with path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.reader(f)
        header = next(reader, None)
        if not header:
            raise ValueError(f"Empty CSV (no header): {path.relative_to(ROOT).as_posix()}")
        header = [h.strip() for h in header]
        if any(not h for h in header):
            raise ValueError(f"CSV has empty header fields: {path.relative_to(ROOT).as_posix()}")
        if len(set(header)) != len(header):
            raise ValueError(f"CSV has duplicate header fields: {path.relative_to(ROOT).as_posix()}")
        return header


def require_columns(path: Path, required: set[str]) -> None:
    header = set(read_csv_header(path))
    missing = sorted(required - header)
    if missing:
        raise ValueError(
            "CSV missing required columns: "
            f"{path.relative_to(ROOT).as_posix()} -> {', '.join(missing)}"
        )


def require_min_rows(path: Path, minimum_rows: int) -> None:
    # minimum_rows excludes header row
    with path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.reader(f)
        next(reader, None)  # header
        count = 0
        for _ in reader:
            count += 1
            if count >= minimum_rows:
                return
    raise ValueError(
        f"CSV has too few data rows (<{minimum_rows}): {path.relative_to(ROOT).as_posix()}"
    )


def validate_adoption_backlog_md(path: Path) -> None:
    text = path.read_text(encoding="utf-8", errors="strict")
    if "# Adoption Backlog" not in text:
        raise ValueError("adoption_backlog.md missing '# Adoption Backlog' heading")
    if "Last updated:" not in text:
        raise ValueError("adoption_backlog.md missing 'Last updated:' line")


def main() -> int:
    try:
        repo_master = require_file("data/master/repo_master.csv")
        failure_patterns = require_file("data/risks/failure-patterns.csv")
        upgrade_risk_matrix = require_file("data/risks/upgrade-risk-matrix.csv")
        risk_register = require_file("data/risks/master_risk_register_2026-03-09.csv")
        adoption_backlog = require_file("insights/adoption_backlog.md")

        # Additional files referenced by the portal / docs.
        require_file("docs/OVERVIEW.md")
        require_file("docs/METHODOLOGY.md")
        require_file("docs/DATA_SCHEMA.md")
        require_file("docs/GLOSSARY.md")
        require_file("docs/FAQ.md")
        require_file("index/MASTER_INDEX.md")

        require_columns(
            repo_master,
            {
                "repo",
                "url",
                "topic",
                "license",
                "risk_level",
                "adoption_priority",
                "decision_verdict",
                "updated_at",
            },
        )
        require_min_rows(repo_master, minimum_rows=1)

        require_columns(
            failure_patterns,
            {"repo", "failure_type", "trigger_condition", "root_cause", "fix_method", "source_url"},
        )
        require_min_rows(failure_patterns, minimum_rows=1)

        require_columns(
            upgrade_risk_matrix,
            {
                "repo",
                "classification",
                "release_window",
                "breaking_change_or_risk",
                "impact_area",
                "migration_complexity",
                "rollback_suggestion",
                "source_url",
            },
        )
        require_min_rows(upgrade_risk_matrix, minimum_rows=1)

        require_columns(
            risk_register,
            {
                "risk_id",
                "category",
                "risk_title",
                "affected_scope",
                "risk_level",
                "trigger_signal",
                "mitigation_actions",
                "status",
            },
        )
        require_min_rows(risk_register, minimum_rows=1)

        validate_adoption_backlog_md(adoption_backlog)

        print("validate_data: OK")
        return 0
    except ValueError as ex:
        eprint(f"validate_data: FAIL: {ex}")
        return 2


if __name__ == "__main__":
    raise SystemExit(main())

