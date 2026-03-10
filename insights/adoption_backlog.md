# Adoption Backlog (Latest)

Last updated: 2026-03-09
Source baseline: `data/master/repo_master.csv`
Decision cycle: `C9` (Window C final after A+B)

## C9 Decision Principle

- **Rule**: survives → candidate for backlog; partial → conditional only; fails → reject, do not promote.
- **C9 theme**: 全轨道采纳信号 + 失败模式复核（六轨 + C8 未知深挖）。A: 20 claims, 46 evidence rows; B: 20 challenged, 19 partial, 1 fails (C9-A20).
- **Rejected**: **C9-A20** — 例外政策须含自动化到期，不可仅靠人工到期与补偿控制；已纳入 upgrade-risk-matrix 与 digest，后续验收须含自动化例外到期检查与升级。
- **B top 5 风险**已写入 digest「下轮 5 个未知」≥2 条闭环；六轨结论已按 B 建议标注 adoption_profile / trigger 边界（scale vs minimal）。

## C8 Decision Principle (carryover)

- **Rule**: survives → candidate for backlog; partial → conditional only; fails → reject, do not promote.
- **C8 theme**: Crawl/Search 栈采纳信号（Crawl4AI, Firecrawl, Jina Reader, Perplexica, Farfalle, Turboseek）。
- A output: 14 claims, 44 evidence rows, 41 from issue/release. B output: 12 challenged; B’s verdict text referred to upgrade-risk/cross-track (theme mismatch with A). C resolved from **A’s evidence** and C’s own criteria; no new P0 (no survives; P0 requires ≥2 independent sources + risk + rollback).
- **Rejected / not promoted**: None from A’s crawl/search claims; B’s only “fails” (C8-A07 in B’s matrix) referred to exception-policy automation, not a crawl stack claim — that governance action remains in risk register.

## C6 Carryover (unchanged)

- **Rejected claim (do not promote)**: `C6-B-018` — batch_reindex_engine and incremental_pipeline_backbone: add velocity-based promotion rule and P1 trigger before promoting pipeline backbones.

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

## C8 Crawl/Search (P2 conditional)

**说明**：以下采纳结论部分来自 analysis/crawl 内部归纳，**待外部验证**（C8-A12/B）；采纳决策时须结合外部来源（GitHub 活跃度、第三方集成案例）或显式标注「内部归纳、待外部验证」。

- `unclecode/crawl4ai` — P2: Docker/schema 0.8.x risk; MCP bridge timeout + Redis/security config; proxy_config breaking change. Adopt only after schema migration and security hardening; rollback to v0.7.x if regression.
- `firecrawl/firecrawl` — P2: v2 parsers.mode + MCP/Google model compatibility; self-host hostname/proxy. Adopt with parser validation and self-host checklist; rollback to prior image if scrape failures.
- `jina-ai/reader` — P2: Agent/MCP site variance (Reddit, Thales) and Unauthorized API key issues. Use with fallback (e.g. Firecrawl) and verify API key path before P1.
- `ItzCrazyKns/Perplexica` — P2: token/context and LM Studio disconnect; Docker image availability. Adopt with token budget and local-LLM stability checks.
- `rashadphz/farfalle` — P2: Docker/port and model selection friction. Sandbox first; document port fallback and model matrix.
- `Nutlope/turboseek` — P2: no Regenerate/Docker/local LLM yet. Watch for feature parity before comparing to Perplexica/Farfalle.

Trigger for P2→P1: two independent adoption signals (e.g. docs + issue resolution) and explicit risk + rollback note.

## Exception Policy (C6 + C9)

- Emergency adoption allowed only with:
  - risk acceptance ticket id
  - **explicit expiry** (`<=7d` or `<=14d` depending on class); **临时例外须含自动化到期检查与升级路径，不得仅依赖人工到期**（C9-A20，见 upgrade-risk-matrix）
  - rollback owner + rehearsal evidence
- Every promoted item must have `adoption_profile`, and `trigger_threshold` or `exception_policy` where applicable.
