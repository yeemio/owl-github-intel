# Weekly Digest — 2026-03-09 (C6)

## Cycle status

- **Window**: C (Decision Desk)
- **Theme**: Agent/RAG architecture trade-offs (evidence matrix, failure-injection, RAG scoring)
- **Inputs consumed**:
  - `analysis/cross/challenge_log_2026-03-09_C6.md`
  - `analysis/cross/challenge_matrix_2026-03-09_C6.csv`
  - `99-archive/handoffs/handoff_B_to_C_2026-03-09_C6.md`

## B verdict impact

- **survives**: 0  
- **partial**: 17 (all recommendations conditionalized; no absolute mandates)  
- **fails**: 1 (`C6-B-018`)

Decision rule applied: survives → candidate for backlog; partial → conditional only; fails → reject, do not promote.

## What changed

- No new repos added to `repo_master_latest.csv` (no survives; no P0 without ≥2 independent sources and explicit risk + rollback).
- `insights/adoption_backlog.md` updated to C6: decision principle, rejected claim C6-B-018, and explicit rule for pipeline backbones (P2 unless velocity-based trigger).
- `data/risks/upgrade-risk-matrix.csv`: one new row for C6 pipeline-backbone velocity risk and required velocity-based promotion rule.

## Key decisions

1. **Rejected claim C6-B-018**  
   Claim that batch_reindex_engine and incremental_pipeline_backbone are P2-only is **rejected**. At high document velocity they become P1 or P0 dependencies; static P2 understates risk. Pipeline backbones (e.g. Kafka/Spark) remain P2 unless a velocity-based promotion rule and P1 trigger (e.g. docs/day or event_rate threshold) are defined and met. Do not promote to P0 without at least 2 independent sources and explicit risk + rollback signal.

2. **Partial claims (17)**  
   All retained as **conditional only**: org-readiness, rollback-signal, churn-indicator, failure-injection thresholds, RAG incumbent-bias, workload assumptions, license/redistribution checklist, etc. Backlog and master table remain profile- and trigger-based; no new absolute mandates.

3. **P0 / promotion bar**  
   No P0 promotions this cycle. Every promoted item must have `adoption_profile` and `trigger_threshold` or `exception_policy` where applicable.

## Files updated in C6

- `insights/adoption_backlog.md`
- `data/risks/upgrade-risk-matrix.csv`
- `publish/digests/weekly_digest_2026-03-09_C6.md`
- `index/CHANGELOG.md`
- `index/CYCLE_SCOREBOARD.csv`

## Next 5 unknowns

1. **Velocity threshold definition** — Exact docs/day or event_rate threshold that should trigger P2→P1 for pipeline backbones (Kafka/Spark, batch_reindex, incremental pipeline) is not yet defined; needs workload data and SLA input.
2. **Org-readiness and rollback-signal columns** — Agent evidence matrix and RAG scoring still lack explicit org_readiness, rollback_signal, churn_indicator; next cycle should add or link to these dimensions.
3. **Failure-injection sensitivity tiering** — Recovery and consistency thresholds are single-KPI; tiering by data sensitivity (e.g. regulated vs internal) and flaky-test policy remains open.
4. **Incumbent-bias and compliance in RAG scoring** — Default framework/vector_db labels assume greenfield; incumbent stack and compliance dimensions not yet in scoring model.
5. **License redistribution checklist** — CC-BY and dual-license entries need explicit redistribution and attribution checklist and approved-exception with expiry; not yet codified in backlog or risk matrix.
