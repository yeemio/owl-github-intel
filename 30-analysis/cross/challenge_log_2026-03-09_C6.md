# Challenge Log C6 (Window B)

## Cycle Metadata

- **cycle_id:** C6
- **date:** 2026-03-09
- **theme:** Agent + RAG architecture trade-offs
- **reviewer_window:** B (Red Team Reviewer)
- **input_scope:**
  - `10-raw/scans/scan_2026-03-09_A_C6.md`
  - `10-raw/scans/evidence_2026-03-09_A_C6.csv`
  - `10-raw/scans/handoff_A_to_B_2026-03-09_C6.md`
- **output_matrix:** `30-analysis/cross/challenge_matrix_2026-03-09_C6.csv`

## Hard-Metric Check

| Requirement | Target | Actual | Pass |
|-------------|--------|--------|------|
| claims_challenged | ≥ 12 | 12 | ✓ |
| counter_sources | ≥ claims_challenged | 12 | ✓ |
| every_claim_has_verdict | true | true | ✓ |

## Verdict Distribution

| Verdict | Count |
|---------|-------|
| survives | 0 |
| partial | 11 |
| fails | 1 |

## Per-Claim Summary and Verdict

### C6-A01 — partial
**Claim:** LangGraph prod_signal_score >= 80 implies production-ready for OwlClaw orchestration baseline.  
**Challenge:** prod_signal_score is an internal composite; without a business KPI gate (task success, incident load), a score ≥ 80 can still ship brittle flows.  
**Counter source:** https://github.com/langchain-ai/langgraph  
**Verdict:** partial — Add outcome-based promotion criterion (e.g. task success rate, operator burden).

### C6-A02 — partial
**Claim:** MCP as mandatory tool boundary reduces framework lock-in and must be enforced before adoption.  
**Challenge:** Mandatory MCP from day one can block teams with legacy or internal tools; phased adoption with an exception inventory is more realistic.  
**Counter source:** https://github.com/modelcontextprotocol/python-sdk  
**Verdict:** partial — Enforce “new integrations only” first; allow phased MCP migration with documented exceptions.

### C6-A03 — partial
**Claim:** Failure-injection recovery_success_rate >= 95% is sufficient exit criterion for LangGraph promotion.  
**Challenge:** 95% is framework-local; end-to-end user task success and rollback blast radius are not in scope.  
**Counter source:** https://github.com/langchain-ai/langgraph  
**Verdict:** partial — Add business-outcome and blast-radius gates to promotion criteria.

### C6-A04 — partial
**Claim:** LlamaIndex + Qdrant + reranker is the optimal v1 default RAG stack for OwlClaw.  
**Challenge:** “Optimal” is context-dependent; small static FAQ-style corpora may not need Qdrant + reranker.  
**Counter source:** https://github.com/chroma-core/chroma  
**Verdict:** partial — Label as default for “balanced/growth” profile only; allow lightweight single-store baseline for low-complexity products.

### C6-A05 — partial
**Claim:** Two-stage retrieval (vector recall + reranker) must be enforced for all RAG paths.  
**Challenge:** Always-on reranker adds latency and cost; high-confidence, low-ambiguity queries may not benefit.  
**Counter source:** https://github.com/vibrantlabsai/ragas  
**Verdict:** partial — Adopt conditional reranking policy (e.g. by uncertainty/confidence score).

### C6-A06 — partial
**Claim:** RAG default_framework and default_vector_db labels in scoring matrix are stable recommendations for mid-scale.  
**Challenge:** Stability depends on workload mix and incumbent infra; orgs with mature PG/OpenSearch may have a different optimal default.  
**Counter source:** https://github.com/opensearch-project/OpenSearch  
**Verdict:** partial — Add incumbent-infra and workload-mix caveats to scoring matrix.

### C6-A07 — partial
**Claim:** OpenAI Agents handoff failure rate > 3% should trigger framework downgrade.  
**Challenge:** Raw handoff failure rate can mislead if failures are low-impact or auto-recovered.  
**Counter source:** https://github.com/openai/openai-agents-python  
**Verdict:** partial — Use severity-weighted handoff failure and business impact before downgrade trigger.

### C6-A08 — partial
**Claim:** Haystack is the blueprint for modular vendor-agnostic orchestration plus retrieval composition.  
**Challenge:** Blueprint is valid; adoption cost and team familiarity vary—not a mandatory stack.  
**Counter source:** https://github.com/deepset-ai/haystack  
**Verdict:** partial — Recommend as reference pattern; do not mandate stack.

### C6-A09 — partial
**Claim:** Golden_core 120 samples and adversarial_set 80 samples make PR gate meaningful.  
**Challenge:** Fixed counts are not calibrated to domain; verticals need domain-stratified sets and size guidance.  
**Counter source:** https://github.com/promptfoo/promptfoo  
**Verdict:** partial — Add stratification and domain-size guidance; avoid single global sample targets.

### C6-A10 — partial
**Claim:** Upgrade trigger at 100M chunks and P95 degradation is sufficient for RAG scale-up decision.  
**Challenge:** Global volume + P95 misses per-tenant hotspot and queue-depth; noisy tenants can breach SLO before global threshold.  
**Counter source:** https://github.com/milvus-io/milvus  
**Verdict:** partial — Add per-tenant and queue-depth triggers to scale-up policy.

### C6-A11 — partial
**Claim:** License clarity (MIT/Apache) is the top fake-production risk; NOASSERTION blocks production by default.  
**Challenge:** License is critical; operational readiness (owners, runbooks, incident freeze) can dominate early incidents.  
**Counter source:** https://github.com/langchain-ai/langgraph  
**Verdict:** partial — Rebalance risk model: legal + operational + observability readiness.

### C6-A12 — fails
**Claim:** Kafka/Spark and batch_reindex_engine are P2-only; not required for v1 or mid-scale default.  
**Challenge:** High document velocity or real-time ingestion needs can require streaming (e.g. Kafka) before “P2”; P2-only framing can block scale-up.  
**Counter source:** https://github.com/apache/kafka  
**Verdict:** fails — Add velocity-based exception path; do not treat Kafka/streaming as strictly P2-only.

## Failed Claim (C Action Required)

- **C6-A12:** Kafka/Spark and batch_reindex_engine are P2-only; not required for v1 or mid-scale default.  
  - **Why failed:** High document velocity or real-time ingestion can necessitate streaming/P2 components earlier than “mid-scale.” A single P2-only rule ignores velocity and latency requirements.  
  - **Required C action:** Define a velocity-based exception path; allow promotion of Kafka/streaming when document velocity or real-time SLA justifies it; document trigger conditions in scale-up policy.

## Red-Team Pattern Summary

1. **Agent:** Score- and threshold-based claims (A01, A03, A07) need business-outcome and severity-weighted gates.  
2. **RAG:** “Optimal default” and “must enforce” (A04, A05, A06) need profile and workload-mix caveats; scale triggers (A10) need per-tenant and queue-depth dimensions.  
3. **Governance:** License vs operational risk (A11) and P2-only stack (A12) need rebalanced risk model and velocity-based exceptions.

## Mandatory Rewrite Requests for Window C

1. Add **business-outcome gates** to Agent promotion (task success, incident burden, rollback blast radius).  
2. Add **profile labels** to RAG default stack (startup/lightweight vs balanced/growth vs regulated/enterprise).  
3. Add **conditional reranking** and **incumbent-infra** caveats to RAG scoring matrix.  
4. Add **per-tenant and queue-depth** triggers to RAG scale-up policy.  
5. Define **velocity-based exception** for Kafka/streaming; do not treat as strictly P2-only.
