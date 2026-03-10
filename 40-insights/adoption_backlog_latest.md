# Adoption Backlog (Latest)

Last updated: 2026-03-09
Source baseline: `20-normalized/repo_master_latest.csv`
Decision cycle: `C6` (Window C final after B challenge)

## C6 Decision Principle

- **Rule**: survives → candidate for backlog; partial → conditional only; fails → reject, do not promote.
- B verdict summary: `survives=0`, `partial=17`, `fails=1`.
- No new P0 promotions (no survives). All recommendations remain trigger- and profile-based.
- **Rejected claim (do not promote)**: `C6-B-018` — batch_reindex_engine and incremental_pipeline_backbone must not be treated as permanently P2; at high document velocity they become critical path. Add velocity-based promotion rule and P1 trigger (e.g. docs/day or event-rate threshold) before promoting pipeline backbones (Kafka/Spark or equivalent).

## P0 - Scale Profile (triggered)

1. `modelcontextprotocol/servers`
2. `modelcontextprotocol/typescript-sdk`
3. `BerriAI/litellm`
4. `langfuse/langfuse`
5. `langchain-ai/langgraph`
6. `qdrant/qdrant`

Activation triggers:
- `QPS > 50/s` OR `provider_count >= 3`
- `rollback_count >= 2/release`
- `budget_drift > 3% for 2 weeks`

Exception policy: `timeboxed_exception<=14d with platform+security approval` where applicable.

## P1 - Minimal Profile (default)

- `openai/openai-agents-python`, `langchain-ai/langchain`, `microsoft/autogen`, `crewaiinc/crewai`
- `openai/evals`, `huggingface/lighteval`, `truera/trulens`
- `run-llama/llama_index`, `weaviate/weaviate`, `chroma-core/chroma`
- `guardrails-ai/guardrails`, `temporalio/sdk-python`

Policy: allow lean baseline first; promote to P0 only when trigger thresholds are hit.

## P2 / Watch (conditional)

- `milvus-io/milvus`, `microsoft/durabletask-python`, `dapr/dapr-agents`
- `huggingface/text-generation-inference`, `protectai/rebuff`

**Pipeline backbones (e.g. Kafka/Spark, batch_reindex_engine, incremental_pipeline_backbone):** Remain P2 unless velocity-based trigger is defined and met (e.g. doc_velocity or event_rate threshold); then consider P1 with explicit rollback and adoption gate. Do not promote to P0 without at least 2 independent sources and explicit risk + rollback signal.

## Exception Policy (C6)

- Emergency adoption allowed only with:
  - risk acceptance ticket id
  - explicit expiry (`<=7d` or `<=14d` depending on class)
  - rollback owner + rehearsal evidence
- Every promoted item must have `adoption_profile`, and `trigger_threshold` or `exception_policy` where applicable.
