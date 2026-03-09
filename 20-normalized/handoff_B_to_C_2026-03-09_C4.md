# Handoff B -> C (C4)

## B Deliverables
- challenge matrix: `30-analysis/cross/challenge_matrix_2026-03-09_C4.csv`
- challenge log: `30-analysis/cross/challenge_log_2026-03-09_C4.md`
- challenged claims: `18` with full verdict coverage

## Verdict Summary
- survives: `0`
- partial: `17`
- fails: `1` (`C4-B-018`)

## Required C Actions (Non-Optional)
1. Update eval KPI stack:
   - add calibration and coverage KPIs, not just outcome KPIs
   - separate targets by risk profile (regulated vs non-regulated)
2. Update security control mapping:
   - add proactive validation metrics (breakout test cadence, adversarial coverage)
   - add evidence-quality constraints (field completeness, labeling quality)
3. Update rollout plan:
   - add `backup_owner`, `resource_contention_plan`, `parallelism_limit`
   - do not mark execution-ready until fallback staffing is defined
4. Update legal/governance:
   - define policy for archived/no-license corpus usage
   - enforce NOASSERTION decision deadline (approve/replace/escalate)

## Consolidated C3+C4 Message for C
- Move from `single default` to `profile-based baseline`.
- Move from `binary pass/fail metrics` to `outcome + coverage + calibration`.
- Move from `plan-by-sequence` to `plan-with-failure-modes`.
