# Handoff B -> C (C5)

## B Deliverables
- matrix: `30-analysis/cross/challenge_matrix_2026-03-09_C5.csv`
- log: `30-analysis/cross/challenge_log_2026-03-09_C5.md`
- challenged claims: `18`
- verdict coverage: `100%`

## Verdict Summary
- survives: `0`
- partial: `17`
- fails: `1` (`C5-B-016`)

## Required C Actions
1. Update Agent ADR cards:
   - add business KPI stop/go gates
   - add profile-based adoption (not one default for all orgs)
2. Update RAG ADR:
   - add incumbent-infra weighting
   - add uncertainty-based reranking policy
   - add embedding/index compatibility and migration rehearsal requirements
3. Update decision assets:
   - every tier recommendation must include trigger + fallback + rollback blast-radius note

## Priority Warning
- If C keeps static default framing for Agent/RAG, downstream execution will overfit medium/large organizations and degrade startup-phase delivery speed.
