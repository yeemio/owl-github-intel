# Adoption Backlog (Latest)

Last updated: 2026-03-09
Source baseline: `20-normalized/repo_master_latest.csv`
Decision cycle: `C2` (Window C final after B conditional review)

## C2 Final Decision Principle

- B verdict summary: `survives=0, partial=18, fails=0`
- Decision rule for this cycle:
  - no absolute architecture mandates
  - convert all recommendations into trigger-based conditional policies
  - every promoted item must include rollback signal + exception policy

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

Not-hold conditions:
- low-QPS internal tools with single provider and low compliance constraints

## P1 - Minimal Profile (default)

- `openai/openai-agents-python`, `langchain-ai/langchain`, `microsoft/autogen`, `crewaiinc/crewai`
- `openai/evals`, `huggingface/lighteval`, `truera/trulens`
- `run-llama/llama_index`, `weaviate/weaviate`, `chroma-core/chroma`
- `guardrails-ai/guardrails`, `temporalio/sdk-python`

Policy:
- allow lean baseline first
- promote to P0 only when trigger thresholds are hit

## P2 / Watch

- `milvus-io/milvus`, `microsoft/durabletask-python`, `dapr/dapr-agents`
- `huggingface/text-generation-inference`, `protectai/rebuff`

## Exception Policy (C2)

- Emergency adoption allowed only with:
  - risk acceptance ticket id
  - explicit expiry (`<=7d` or `<=14d` depending on class)
  - rollback owner + rehearsal evidence
