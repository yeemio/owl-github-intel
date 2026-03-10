# Challenge Log C7 (Window B)

## Cycle Metadata
- cycle_id: `C7`
- date: `2026-03-09`
- theme: `upgrade_risk_cross_track_decision`
- reviewer_window: `B (Red Team Reviewer)`
- input_scope:
  - `data/risks/upgrade-risk-matrix.md` / `upgrade-risk-matrix.csv`
  - `data/risks/upgrade-risk-rollout-plan.md`
  - `analysis/cross/w9_upgrade_radar.md`
  - `analysis/cross/architecture-decision-benchmark.md`
  - `data/risks/failure-patterns.md`
- output_matrix: `analysis/cross/challenge_matrix_2026-03-09_C7.csv`

## Hard-Metric Check
- claims_challenged: `18` (target >= 15, pass)
- counter_sources: `18` (target >= claims_challenged, pass)
- every_claim_has_verdict: `true` (pass)

## Verdict Distribution
- survives: `0`
- partial: `17`
- fails: `1`

## Failed Claim
- `C7-B-016`
  - claim: temporary-exception-policy with expiry and compensating controls is sufficient
  - reason: without automated expiry enforcement, exceptions become permanent and governance degrades
  - required C action: add automated exception-expiry check and escalation (e.g. ticket or revoke)

## Red-Team Pattern Summary
1. Upgrade risk classification relies on release-note visibility; sparse changelog creates false low risk.
2. Rollback and gate thresholds are single-value; need tiering by blast radius and business criticality.
3. Upgrade order and wave timing assume dedicated ownership; need dependency on capacity and incident freeze.
4. Cross-track “recommendation A” is framed as default; must be profile-labeled (e.g. scale vs minimal).

## Mandatory C Follow-ups
- Upgrade matrix: add changelog_quality, pin_expiry_policy, and code_diff_or_compat_test for no_clear_breaking.
- Rollout plan: tier rollback windows and gate thresholds by criticality; add baseline refresh and golden-set coverage rules.
- Exception policy: implement automated expiry check and escalation; no manual-only exception lifecycle.
- W9 radar: add state/config snapshot requirement for stateful components; document event-driven reorder for upgrade order.

## Escalation Note
- C7 ties upgrade risk to cross-track decision memo; C should ensure recommendation A is explicitly “scale profile” and that upgrade/rollback playbooks reference the same profile and exception policy.
