# Handoff B → C (2026-03-09 C6)

Theme: **Agent + RAG architecture trade-offs**

## B Deliverables

- **matrix:** `analysis/cross/challenge_matrix_2026-03-09_C6.csv`
- **log:** `analysis/cross/challenge_log_2026-03-09_C6.md`
- **challenged claims:** 12
- **verdict coverage:** 100%

## Summary Counts

| Verdict | Count |
|---------|-------|
| survives | 0 |
| partial | 11 |
| fails | 1 |

**Failed claim:** C6-A12 (Kafka/Spark P2-only framing).

## Top 3 Risks for C

1. **RAG default stack over-generalization** — Claims A04, A05, A06 treat “optimal default” and “must enforce” as universal; without profile (startup vs growth vs enterprise) and workload-mix caveats, execution will overfit mid-scale and hurt lightweight or incumbent-heavy orgs.
2. **Agent promotion without business gates** — Claims A01, A03, A07 rely on framework-local metrics (prod_signal_score, recovery_success_rate, handoff failure %); without task success, incident burden, and blast-radius criteria, promotions can ship brittle or high-friction flows.
3. **P2-only streaming assumption** — Claim A12 (fails): Treating Kafka/Spark as strictly P2-only blocks high-velocity or real-time ingestion paths; C must define velocity-based exception and document when streaming becomes required.

## Suggested C Actions

1. **Update Agent ADR / promotion criteria**
   - Add business KPI stop/go gates: task success rate, operator burden, rollback blast radius.
   - Add severity-weighted handoff failure (and business impact) before framework downgrade trigger.

2. **Update RAG default stack and scoring matrix**
   - Label default stack (LlamaIndex + Qdrant + reranker) as “balanced/growth profile” only; allow lightweight single-store baseline for low-complexity products.
   - Add conditional reranking policy (e.g. by uncertainty/confidence).
   - Add incumbent-infra and workload-mix caveats to default_framework / default_vector_db recommendations.

3. **Update scale-up and pipeline policy**
   - Add per-tenant and queue-depth triggers alongside 100M-chunk and P95 degradation.
   - Define velocity-based exception for Kafka/streaming: document when document velocity or real-time SLA justifies P1 or earlier adoption; do not treat as strictly P2-only.

4. **Risk and governance**
   - Rebalance risk model: license clarity + operational readiness (owners, runbooks, incident freeze) + observability readiness.
   - MCP: enforce “new integrations only” as first step; allow phased adoption with exception inventory.

5. **Eval/PR gate**
   - Add domain stratification and size guidance for golden_core / adversarial_set; avoid single global sample counts as universal PR gate.

## Priority Warning

If C keeps a single “optimal v1 default” RAG stack and strict “P2-only” for Kafka/Spark without velocity-based exceptions, high-velocity or real-time use cases will hit adoption blockers and scale-up decisions will be delayed or wrong.
