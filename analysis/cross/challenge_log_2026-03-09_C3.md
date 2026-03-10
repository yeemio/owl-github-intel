# Challenge Log C3 (Window B)

## Cycle Metadata
- cycle_id: `C3`
- date: `2026-03-09`
- theme: `eval_security_failure_modes`
- reviewer_window: `B (Red Team Reviewer)`
- input_scope:
  - `analysis/eval/w5_eval_observability_analysis.md`
  - `analysis/eval/w5_eval_rollback_runbook.md`
  - `analysis/security/w6_ai_security_governance_analysis.md`
  - `analysis/security/w6_ai_security_control_module_mapping.md`
- output_matrix: `analysis/cross/challenge_matrix_2026-03-09_C3.csv`

## Hard-Metric Check
- claims_challenged: `18` (target >= 15, pass)
- counter_sources: `18` (target >= claims_challenged, pass)
- every_claim_has_verdict: `true` (pass)

## Verdict Distribution
- survives: `0`
- partial: `17`
- fails: `1`

## Failed Claim
- `C3-B-016`
  - claim: Top30 scoring dimensions are enough for adoption decisions
  - reason: ranking omits organizational readiness and migration debt, which are often primary failure causes
  - C action: extend score model before any promotion decisions

## High-Impact Partial Findings
1. Eval gate thresholds are over-generalized; must be profile-based by task class.
2. Rollback triggers rely too much on runtime errors and underweight semantic quality regressions.
3. Security baseline wording is strong but needs exception governance and evidence-debt tracking.
4. “Single control-plane” recommendation increases concentration risk without explicit exit plan.

## Mandatory C-Side Rewrites
- Add `org_readiness_score` and `migration_debt_score` to ranking.
- Add `semantic_regression_trigger` to rollback policy.
- Add `exception_policy` and `evidence_debt_due_date` to security governance artifacts.
- Split all default recommendations into:
  - `baseline_minimal`
  - `baseline_regulated`
  - `baseline_scale`

## Risk Flags to Carry Forward
- Audit defensibility risk from inaccessible primary frameworks (NIST/CISA direct retrieval).
- False confidence risk from single-metric safety gates.
- Operational fragility risk from unrealistic uniform rollback SLO.
