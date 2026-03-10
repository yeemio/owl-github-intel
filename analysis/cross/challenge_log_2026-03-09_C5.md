# Challenge Log C5 (Window B)

## Cycle Metadata
- cycle_id: `C5`
- date: `2026-03-09`
- theme: `agent_rag_architecture_tradeoffs`
- reviewer_window: `B (Red Team Reviewer)`
- input_scope:
  - `analysis/agent/w1_agent_orchestration_deep_analysis.md`
  - `analysis/agent/w1_top6_framework_adr_cards.md`
  - `analysis/rag/w3_rag_deep_dive.md`
  - `analysis/rag/w3_rag_data_adr.md`
- output_matrix: `analysis/cross/challenge_matrix_2026-03-09_C5.csv`

## Hard-Metric Check
- claims_challenged: `18` (target >= 15, pass)
- counter_sources: `18` (target >= claims_challenged, pass)
- every_claim_has_verdict: `true` (pass)

## Verdict Distribution
- survives: `0`
- partial: `17`
- fails: `1`

## Failed Claim
- `C5-B-016`
  - claim: Top6 ADR exit criteria are execution-ready
  - why failed: criteria are framework-centric and missing direct business outcome gates
  - required C action: add end-to-end KPI gates (task success, incident burden, user impact) into ADR stop/go criteria

## Red-Team Pattern Summary
1. Agent side over-assumes dual-run and strict MCP from day-1 as universal optimal.
2. RAG side over-assumes default stack generalization and static thresholds.
3. Upgrade/rollback logic under-specifies embedding/version compatibility and migration rehearsal.
4. Risk model overweights legal clarity relative to operational readiness in some contexts.

## Mandatory C Rewrites
- Convert “default stack” to profile-based:
  - startup/lightweight
  - growth/balanced
  - regulated/enterprise
- Add migration realism controls:
  - dual-write or dual-read rehearsal
  - compatibility matrix for embedding/index versions
- Add business-impact gates across Agent/RAG:
  - outcome quality KPI
  - operator load KPI
  - rollback blast-radius KPI

## Escalation Note
- C3/C4/C5 converge on one governance defect: recommendations are directionally good but too absolute; they require explicit trigger conditions and fallback pathways.
