# Adoption Backlog (Latest)

Last updated: 2026-03-09
Source baseline: `20-normalized/repo_master_latest.csv`
Decision cycle: `C1` (Window C final after B challenges)

## Window C Final Adjudication (C1)

- Inputs consumed:
  - `10-raw/scans/scan_2026-03-09_A_C1.md`
  - `10-raw/scans/evidence_2026-03-09_A_C1.csv`
  - `30-analysis/cross/challenge_log_2026-03-09_C1.md`
  - `30-analysis/cross/challenge_matrix_2026-03-09_C1.csv`
  - `20-normalized/handoff_B_to_C_2026-03-09_C1.md`
- B-window summary: challenged=18, survives=5, partial=11, fails=2
- Rejected claim IDs: `C-A04` (absolute release-frequency risk claim), `C-A12` (absolute closed-loop necessity claim)

## P0 - Execute First (final)

1. `modelcontextprotocol/servers`
2. `modelcontextprotocol/typescript-sdk`
3. `BerriAI/litellm`
4. `langfuse/langfuse`
5. `langchain-ai/langgraph`
6. `qdrant/qdrant`

P0 admission checks applied:
- each P0 has >=2 independent sources in `repo_master_latest.csv`
- each P0 has explicit `risk_signal` and `rollback_signal`
- absolute claims downgraded to conditional where B produced counterexamples

## P1 - Conditional Build

- Agent runtime and orchestration:
  - `langchain-ai/langchain`, `microsoft/autogen`, `openai/openai-agents-python`, `crewaiinc/crewai`
- Retrieval and data stack:
  - `run-llama/llama_index`, `weaviate/weaviate`, `chroma-core/chroma`, `milvus-io/milvus`
- Evaluation expansion:
  - `openai/evals`, `huggingface/lighteval`, `truera/trulens`
- Safety and durable execution:
  - `guardrails-ai/guardrails`, `temporalio/sdk-python`

## P2 - Watch / Optional

- `microsoft/durabletask-python`
- `dapr/dapr-agents`

## Rejected / Watch-Only

- `huggingface/text-generation-inference` (maintenance trajectory)
- `protectai/rebuff` (archived)

## Next-Cycle Gating

- Require canary + rollback drill evidence before any new P0 promotion
- Require challenge_matrix verdict not equal to `fails`
- Require release notes + issue trend to jointly support upgrade decisions
