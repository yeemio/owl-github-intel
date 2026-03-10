from __future__ import annotations

from .gate import is_eligible_for_recommend_list
from .report import DecisionReport


def render_markdown(report: DecisionReport) -> str:
    report.validate()

    lines: list[str] = []
    lines.append("# Decision Report")
    lines.append("")
    if report.input_summary:
        lines.append("## Input")
        lines.append("")
        for k, v in report.input_summary.items():
            if v is None:
                continue
            lines.append(f"- {k}: {v}")
        lines.append("")

    lines.append("## Recommendations")
    lines.append("")
    any_items = False
    for lane in report.lanes:
        eligible = [i for i in lane.items if is_eligible_for_recommend_list(i)]
        if not eligible:
            continue
        any_items = True
        lines.append(f"### {lane.lane}")
        lines.append("")
        for item in eligible:
            lines.append(f"- `{item.repo}` ({item.posture}/{item.verdict})")
            lines.append(f"  - why: {item.why}")
            lines.append(f"  - allowed: {item.boundaries_allowed}")
            lines.append(f"  - not_allowed: {item.boundaries_not_allowed}")
            lines.append(f"  - risk_signal: {item.risk_signal}")
            lines.append(f"  - rollback_signal: {item.rollback_signal}")
            if item.evidence_links:
                lines.append("  - evidence:")
                for link in item.evidence_links[:5]:
                    lines.append(f"    - {link}")
        lines.append("")

    if not any_items:
        lines.append("- (No eligible recommendations found for the given constraints.)")
        lines.append("")

    if report.unknown_items:
        lines.append("## Unknown Items (scan next)")
        lines.append("")
        for u in report.unknown_items:
            lines.append(f"- `{u}`")
        lines.append("")

    if report.next_actions:
        lines.append("## Next Actions")
        lines.append("")
        for a in report.next_actions:
            lines.append(f"- {a}")
        lines.append("")

    return "\n".join(lines)

