#!/usr/bin/env python3
"""
Analyze a user-provided stack inventory against the repo master table and risks.

Input: CSV (see templates/user_inventory.csv)
Output: Markdown report
No external dependencies.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


LANES = {"agent", "mcp", "rag", "gateway", "eval", "security", "cross"}


def normalize_repo_slug(value: str) -> str | None:
    v = (value or "").strip()
    if not v:
        return None

    # github URL
    if "github.com/" in v:
        m = re.search(r"github\.com/([^/\s]+)/([^/\s#?]+)", v)
        if not m:
            return None
        org = m.group(1).strip()
        name = m.group(2).strip()
        name = re.sub(r"\.git$", "", name)
        return f"{org}/{name}".lower()

    # org/repo
    if "/" in v and " " not in v and len(v.split("/")) == 2:
        return v.lower()

    return None


def load_master() -> dict[str, dict[str, str]]:
    path = ROOT / "data" / "master" / "repo_master.csv"
    out: dict[str, dict[str, str]] = {}
    with path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            slug = (row.get("repo") or "").strip().lower()
            if slug:
                out[slug] = row
    return out


def load_risk_register() -> list[dict[str, str]]:
    path = ROOT / "data" / "risks" / "master_risk_register_2026-03-09.csv"
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def pick_related(master: dict[str, dict[str, str]], lanes: set[str], exclude: set[str]) -> dict[str, list[str]]:
    # Recommend P0/P1 items by lane that are not already in the user's inventory.
    out: dict[str, list[str]] = {}
    for lane in sorted(lanes):
        cands = []
        for slug, row in master.items():
            if slug in exclude:
                continue
            if (row.get("topic") or "").strip().lower() != lane:
                continue
            pr = (row.get("adoption_priority") or "").strip().upper()
            verdict = (row.get("decision_verdict") or "").strip().lower()
            if pr in {"P0", "P1"} and verdict in {"survives", "partial"}:
                cands.append((pr, slug))
        cands.sort(key=lambda x: (x[0], x[1]))
        out[lane] = [slug for _, slug in cands[:6]]
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True, help="Inventory CSV path (see templates/user_inventory.csv)")
    ap.add_argument("--output", required=True, help="Output markdown path")
    args = ap.parse_args()

    input_path = Path(args.input)
    if not input_path.is_absolute():
        input_path = (ROOT / input_path).resolve()

    out_path = Path(args.output)
    if not out_path.is_absolute():
        out_path = (ROOT / out_path).resolve()

    master = load_master()
    risks = load_risk_register()

    rows: list[dict[str, str]] = []
    with input_path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    inventory: list[dict[str, str]] = []
    lanes_present: set[str] = set()
    slugs_present: set[str] = set()

    for r in rows:
        slug = normalize_repo_slug(r.get("repo", "")) or normalize_repo_slug(r.get("url", ""))
        lane = (r.get("lane") or "").strip().lower()
        if lane and lane in LANES:
            lanes_present.add(lane)
        if slug:
            slugs_present.add(slug)
        inventory.append({**r, "slug": slug or ""})

    matched: list[tuple[str, dict[str, str], dict[str, str]]] = []
    unknown: list[dict[str, str]] = []

    for r in inventory:
        slug = (r.get("slug") or "").strip().lower()
        if not slug:
            unknown.append(r)
            continue
        m = master.get(slug)
        if m:
            matched.append((slug, r, m))
        else:
            unknown.append(r)

    matched.sort(key=lambda x: x[0])

    # Relevant risks: any open risk whose affected_scope mentions a repo in inventory.
    relevant_risks: list[dict[str, str]] = []
    for rr in risks:
        if (rr.get("status") or "").strip().lower() != "open":
            continue
        scope = (rr.get("affected_scope") or "").strip().lower()
        if any(s in scope for s in slugs_present):
            relevant_risks.append(rr)
    relevant_risks.sort(key=lambda x: (x.get("risk_level") or "", x.get("risk_id") or ""))

    related = pick_related(master, lanes_present or LANES, slugs_present)

    today = dt.date.today().isoformat()
    out_lines: list[str] = []
    out_lines.append("# User Stack Report")
    out_lines.append("")
    out_lines.append(f"Generated: {today}")
    out_lines.append(f"Input: `{input_path.relative_to(ROOT).as_posix()}`" if input_path.is_relative_to(ROOT) else f"Input: `{input_path}`")
    out_lines.append("")
    out_lines.append("## Summary")
    out_lines.append("")
    out_lines.append(f"- Matched in master table: {len(matched)}")
    out_lines.append(f"- Unknown / not in master: {len(unknown)}")
    out_lines.append(f"- Lanes present: {', '.join(sorted(lanes_present)) if lanes_present else '(not provided)'}")
    out_lines.append("")
    out_lines.append("## Matched Items (with posture + risks)")
    out_lines.append("")
    if not matched:
        out_lines.append("- (No matches found.)")
    else:
        for slug, inv, m in matched:
            display = (m.get("repo") or slug).strip()
            pr = (m.get("adoption_priority") or "").strip()
            verdict = (m.get("decision_verdict") or "").strip()
            risk_level = (m.get("risk_level") or "").strip()
            risk_signal = (m.get("risk_signal") or "").strip()
            rollback = (m.get("rollback_signal") or "").strip()
            out_lines.append(f"- `{display}`: {pr} / {verdict} / risk={risk_level}")
            if risk_signal:
                out_lines.append(f"  - risk_signal: {risk_signal}")
            if rollback:
                out_lines.append(f"  - rollback_signal: {rollback}")
    out_lines.append("")
    out_lines.append("## Unknown Items (scan next)")
    out_lines.append("")
    if not unknown:
        out_lines.append("- (None.)")
    else:
        for r in unknown:
            slug = (r.get("slug") or "").strip()
            repo = (r.get("repo") or "").strip()
            url = (r.get("url") or "").strip()
            lane = (r.get("lane") or "").strip()
            label = slug or repo or url or "(unparsed row)"
            extra = f" lane={lane}" if lane else ""
            out_lines.append(f"- `{label}`{extra}")
    out_lines.append("")
    out_lines.append("## Relevant Open Risks")
    out_lines.append("")
    if not relevant_risks:
        out_lines.append("- (No open risks matched your inventory by repo name.)")
    else:
        for rr in relevant_risks[:10]:
            rid = (rr.get("risk_id") or "").strip()
            title = (rr.get("risk_title") or "").strip()
            level = (rr.get("risk_level") or "").strip()
            out_lines.append(f"- `{rid}` {title} (level={level})")
    out_lines.append("")
    out_lines.append("## Suggested Complements (by lane)")
    out_lines.append("")
    for lane in sorted(related.keys()):
        items = related[lane]
        if not items:
            continue
        out_lines.append(f"### {lane}")
        for slug in items:
            out_lines.append(f"- `{slug}`")
        out_lines.append("")

    out_lines.append("---")
    out_lines.append("")
    out_lines.append("Source assets:")
    out_lines.append("- Master: `data/master/repo_master.csv`")
    out_lines.append("- Decisions: `insights/adoption_backlog.md`")
    out_lines.append("- Risks: `data/risks/`")
    out_lines.append("")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text("\n".join(out_lines), encoding="utf-8", newline="\n")
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
