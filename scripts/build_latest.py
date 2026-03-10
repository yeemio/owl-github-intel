#!/usr/bin/env python3
"""
Generate publish/LATEST.md from the current core assets.

Design goal: one-page brief that answers "what can I do with this repo right now?"
No external dependencies.
"""

from __future__ import annotations

import csv
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read_text(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8", errors="strict")


def list_digests() -> list[str]:
    d = ROOT / "publish" / "digests"
    if not d.exists():
        return []
    files = sorted([p.name for p in d.glob("weekly_digest_*.md")])
    return files[-8:]


def extract_last_updated(adoption_md: str) -> str:
    m = re.search(r"^Last updated:\s*(.+)$", adoption_md, flags=re.MULTILINE)
    return m.group(1).strip() if m else "unknown"


def extract_p0_list(adoption_md: str) -> list[str]:
    # Capture lines under "## P0" until the next "Activation triggers:" marker.
    start = adoption_md.find("## P0")
    if start < 0:
        return []
    segment = adoption_md[start:]
    end = segment.find("Activation triggers:")
    if end > 0:
        segment = segment[:end]
    items: list[str] = []
    for line in segment.splitlines():
        line = line.strip()
        m = re.match(r"^\d+\.\s+`([^`]+)`\s*$", line)
        if m:
            items.append(m.group(1))
    return items


def top_open_high_risks(limit: int = 5) -> list[tuple[str, str, str]]:
    path = ROOT / "data" / "risks" / "master_risk_register_2026-03-09.csv"
    if not path.exists():
        return []
    out: list[tuple[str, str, str]] = []
    with path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if (row.get("status") or "").strip().lower() != "open":
                continue
            if (row.get("risk_level") or "").strip().lower() != "high":
                continue
            out.append(
                (
                    (row.get("risk_id") or "").strip(),
                    (row.get("risk_title") or "").strip(),
                    (row.get("affected_scope") or "").strip(),
                )
            )
    out.sort(key=lambda x: x[0])
    return out[:limit]


def recent_changelog_lines(limit: int = 6) -> list[str]:
    path = ROOT / "index" / "CHANGELOG.md"
    if not path.exists():
        return []
    lines = path.read_text(encoding="utf-8", errors="strict").splitlines()
    # Grab the most recent bullets before the first date header, if present.
    bullets: list[str] = []
    for line in lines:
        if line.startswith("## "):
            break
        if line.strip().startswith("- "):
            bullets.append(line.strip())
    return bullets[:limit]


def main() -> None:
    adoption = read_text("insights/adoption_backlog.md")
    last_updated = extract_last_updated(adoption)
    p0 = extract_p0_list(adoption)
    risks = top_open_high_risks()
    digests = list_digests()
    recent = recent_changelog_lines()

    lines: list[str] = []
    lines.append("# LATEST")
    lines.append("")
    lines.append(f"Decision baseline updated: {last_updated}")
    lines.append("")
    lines.append("## Use This Repo For")
    lines.append("")
    lines.append("- Adopt with posture: P0/P1/P2 decisions with boundaries and rollback signals.")
    lines.append("- Reduce production risk: failure patterns + upgrade risk matrix + risk register.")
    lines.append("- Save time: curated datasets and track analyses instead of link-chasing.")
    lines.append("")
    lines.append("## Start Here (10 minutes)")
    lines.append("")
    lines.append("- Decision kit: `starter_pack.md`")
    lines.append("- Adoption decisions: `../insights/adoption_backlog.md`")
    lines.append("- Master dataset: `../data/master/repo_master.csv`")
    lines.append("- Risks: `../data/risks/failure-patterns.md` and `../data/risks/upgrade-risk-matrix.md`")
    lines.append("")
    lines.append("## Current P0 (Scale profile)")
    lines.append("")
    if p0:
        for item in p0:
            lines.append(f"- `{item}`")
    else:
        lines.append("- (No P0 items found in adoption backlog.)")
    lines.append("")
    lines.append("## Top Open High Risks")
    lines.append("")
    if risks:
        for risk_id, title, scope in risks:
            scope_txt = f" ({scope})" if scope else ""
            lines.append(f"- `{risk_id}` {title}{scope_txt}")
    else:
        lines.append("- (No open High risks found.)")
    lines.append("")
    lines.append("## Latest Digests")
    lines.append("")
    if digests:
        for name in digests[::-1]:
            lines.append(f"- `digests/{name}`")
    else:
        lines.append("- (No digests found.)")
    lines.append("")
    lines.append("## Recent Changes (high-signal)")
    lines.append("")
    if recent:
        lines.extend(recent)
    else:
        lines.append("- See `../index/CHANGELOG.md`.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("If you want the full navigation index: `../index/MASTER_INDEX.md`.")
    lines.append("")

    out_path = ROOT / "publish" / "LATEST.md"
    out_path.write_text("\n".join(lines), encoding="utf-8", newline="\n")
    print(f"Wrote {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

