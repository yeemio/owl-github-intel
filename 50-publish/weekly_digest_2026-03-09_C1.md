# Weekly Digest - 2026-03-09 - C1

## Cycle Status

- Window: C (Decision Desk)
- Theme: MCP + Gateway reliability
- Input quality:
  - A evidence status: available in scoreboard summary
  - B challenge status: missing handoff for this cycle
- Decision confidence: provisional (pending B red-team verdicts)

## Promoted (P0)

1. `modelcontextprotocol/servers`
2. `modelcontextprotocol/typescript-sdk`
3. `BerriAI/litellm`
4. `qdrant/qdrant`
5. `langfuse/langfuse`
6. `langchain-ai/langgraph`

Rationale:
- Each promoted P0 has explicit risk and rollback signals in `20-normalized/repo_master_latest.csv`.
- Upgrade and migration risks were added or validated in `40-insights/risks/upgrade-risk-matrix.csv`.

## Conditional (P1/P2)

- `langchain-ai/langchain`, `microsoft/autogen`, `crewaiinc/crewai`
- `run-llama/llama_index`, `weaviate/weaviate`, `chroma-core/chroma`, `milvus-io/milvus`
- `openai/evals`, `huggingface/lighteval`, `truera/trulens`
- `guardrails-ai/guardrails`, `temporalio/sdk-python`, `microsoft/durabletask-python`, `dapr/dapr-agents`

Condition:
- Keep in backlog but require B-window counterexample challenge before any promotion to P0 in the next cycle.

## Rejected Claims

- `huggingface/text-generation-inference`
  - Verdict: fails
  - Reason: maintenance mode trend and reduced momentum for active adoption priority.
- `protectai/rebuff`
  - Verdict: fails
  - Reason: archived status; reference-only value.

## Risk and Rollback Signals

- MCP risk: protocol/schema mismatch across sdk/server versions.
  - Rollback: pin and roll back sdk+server as a compatibility pair.
- Gateway risk: provider api/proxy drift causing fallback breakage.
  - Rollback: revert gateway image and routing policy bundle.
- Retrieval risk: index/search behavior changes impacting recall/latency.
  - Rollback: restore prior snapshot and previous minor release.

## Next-Cycle Requirements

- Require `20-normalized/handoff_B_to_C_<date>_<cycle>.md` before final promotion lock.
- Re-score P0 list after B verdicts; downgrade if any claim fails adversarial challenge.
- Publish updated digest with final (non-provisional) verdicts.
