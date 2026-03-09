# Adoption Backlog (Latest)

Last updated: 2026-03-09
Source baseline: `20-normalized/repo_master_latest.csv`
Decision cycle: `C1` (Window C adjudication)

## Window C Decision Notes (C1)

- Input status: A/B handoff files were not found in this cycle, so claims were adjudicated from existing normalized and risk assets.
- Decision policy applied:
  - `survives` -> keep or promote in backlog
  - `partial` -> keep as conditional with explicit gating
  - `fails` -> reject from active backlog
- Rejected claims logged:
  - `huggingface/text-generation-inference` (maintenance trend; keep watch only)
  - `protectai/rebuff` (archived; reference only)
Decision cycle: `C1` (Window C adjudication)

## Window C Decision Notes (C1)

- Input status: A/B handoff files were not found in this cycle, so claims were adjudicated from existing normalized and risk assets.
- Decision policy applied:
  - `survives` -> keep or promote in backlog
  - `partial` -> keep as conditional with explicit gating
  - `fails` -> reject from active backlog
- Rejected claims logged:
  - `huggingface/text-generation-inference` (maintenance trend; keep watch only)
  - `protectai/rebuff` (archived; reference only)

## P0 - Execute First

## 1) MCP quality gate baseline

- Goal: standardize MCP integration quality across capability packages.
- Candidates: `modelcontextprotocol/servers`, `modelcontextprotocol/typescript-sdk`
- Actions:
  - define contract checks for tool schema completeness
  - add compatibility matrix and version pin policy
  - create release checklist for MCP-facing features
- Acceptance:
  - every MCP integration has schema validation, smoke test, and rollback note

## 2) Unified gateway policy layer

- Goal: govern model routing and fallback behavior by policy.
- Candidates: `BerriAI/litellm`
- Actions:
  - define routing policy fields (budget, latency, confidence, fallback)
  - document failover behavior and test matrix
  - attach cost attribution to route decision logs
- Acceptance:
  - one policy spec drives all routing decisions in test and staging

## 3) Eval and observability core loop

- Goal: make regression visible before release.
- Candidates: `langfuse/langfuse`
- Actions:
  - define core eval KPI set (success, latency, cost, failure taxonomy)
  - align trace model with tool/action granularity
  - create release gate based on KPI thresholds
- Acceptance:
  - release checklist includes passing eval baseline with trace evidence
  - each P0 item carries explicit risk and rollback signal in `repo_master_latest.csv`
  - each P0 item carries explicit risk and rollback signal in `repo_master_latest.csv`

## P1 - Build Next

- Durable execution adapter exploration:
  - candidates: `langchain-ai/langgraph`, `temporalio/sdk-python`
- Retrieval backend strategy:
  - candidates: `qdrant/qdrant`, `chroma-core/chroma`, `weaviate/weaviate`
- Evaluation breadth expansion:
  - candidates: `openai/evals`, `huggingface/lighteval`, `truera/trulens`
- Security guardrails baseline:
  - candidate: `guardrails-ai/guardrails`

## P2 - Watch / Optional

- Large-scale vector platform path:
  - candidate: `milvus-io/milvus`
- Alternate durable stacks:
  - candidates: `microsoft/durabletask-python`, `dapr/dapr-agents`

## Watchlist

- `huggingface/text-generation-inference` (maintenance mode trend)
- `protectai/rebuff` (archived, reference-only)

## Rejected This Cycle

- `huggingface/text-generation-inference`: not promoted due to maintenance trajectory and lower decision confidence.
- `protectai/rebuff`: not promoted due to archived project status and weak maintenance signal.

## Rejected This Cycle

- `huggingface/text-generation-inference`: not promoted due to maintenance trajectory and lower decision confidence.
- `protectai/rebuff`: not promoted due to archived project status and weak maintenance signal.

## Next Review Cadence

- Weekly: refresh repo risk and activity tags.
- Biweekly: adjust P0/P1/P2 based on new evidence.
- Monthly: publish external digest in `50-publish/`.
