# W9 Upgrade Risk Radar (Top 30, last 12 months)

## Scope
- Target set: 30 projects in OwlClaw-adjacent stack (orchestration, MCP protocol layer, model/runtime, observability, sandbox, memory).
- Evidence basis: GitHub release/changelog pages and API release feeds.
- Output detail: breaking changes, impact surface (API/config/deploy/data model), migration complexity, rollback guidance, OwlClaw module mapping.
- Structured matrix: `w9_upgrade_matrix.csv`

## Executive Radar

### P0 High-Risk Upgrade Streams (upgrade behind guardrails)
1. **`vllm-project/vllm`**
 - Explicit breaking dependency shift (PyTorch 2.10) and behavior default change (`recompute` -> `fail` policy).
 - OwlClaw impact: `model-serving-and-inference-gateway`.
 - Migration complexity: **High**.
 - Source: [vLLM releases](https://api.github.com/repos/vllm-project/vllm/releases?per_page=5)

2. **`modelcontextprotocol/kotlin-sdk`**
 - Explicit breaking API changes in handler signatures and Ktor extension placement.
 - OwlClaw impact: `tool-protocol-sdk-kotlin`.
 - Migration complexity: **High**.
 - Source: [Kotlin SDK latest release](https://api.github.com/repos/modelcontextprotocol/kotlin-sdk/releases/latest)

3. **`modelcontextprotocol/go-sdk`**
 - Security/behavior defaults changed (DNS rebinding protection on by default, JSON escaping behavior changed).
 - OwlClaw impact: `tool-protocol-sdk-go`.
 - Migration complexity: **High**.
 - Source: [Go SDK latest release](https://api.github.com/repos/modelcontextprotocol/go-sdk/releases/latest)

4. **`modelcontextprotocol/java-sdk`**
 - GA 1.0 with RC deprecations removed and Spring AI 2.0 transport baseline.
 - OwlClaw impact: `tool-protocol-sdk-java`.
 - Migration complexity: **High**.
 - Source: [Java SDK latest release](https://api.github.com/repos/modelcontextprotocol/java-sdk/releases/latest)

5. **`truera/trulens`**
 - Major API migration from `Feedback/MetricConfig` to unified `Metric`.
 - OwlClaw impact: `eval-and-feedback-engine`.
 - Migration complexity: **High**.
 - Source: [TruLens latest release](https://api.github.com/repos/truera/trulens/releases/latest)

6. **`mem0ai/mem0`**
 - Release notes point to stricter filter validation and breaking behavior around delete flows.
 - OwlClaw impact: `memory-and-context-layer`.
 - Migration complexity: **High**.
 - Source: [Mem0 latest release](https://api.github.com/repos/mem0ai/mem0/releases/latest)

## Medium-Risk Streams (normal canary + contract checks)
- `langchain-ai/langchain`, `langchain-ai/langgraph`, `microsoft/autogen`, `crewAIInc/crewAI`, `browser-use/browser-use`, `modelcontextprotocol/python-sdk`, `modelcontextprotocol/typescript-sdk`, `modelcontextprotocol/csharp-sdk`, `modelcontextprotocol/php-sdk`, `modelcontextprotocol/swift-sdk`, `openai/openai-agents-python`, `Aider-AI/aider`, `e2b-dev/E2B`, `ollama/ollama`.

Common pattern:
- Fast patch cadence and dependency floor bumps drive **soft-break risk** even when no explicit breaking label is present.
- Primary risk axis is integration assumptions (error semantics, handler signatures, config keys, route mounting) rather than data corruption.

## Governance Risk Flags
- **Sparse release notes risk**: `continuedev/continue` latest release lacks substantive changelog details.
 - Recommendation: enforce internal diff review before upgrade promotion.
 - Source: [Continue latest release](https://api.github.com/repos/continuedev/continue/releases/latest)
- **Stale release cadence risk**: `openinterpreter/open-interpreter` latest release artifacts are from 2024 prerelease stream.
 - Recommendation: treat as frozen dependency and isolate behind adapter boundary.
 - Source: [Open Interpreter releases](https://api.github.com/repos/openinterpreter/open-interpreter/releases?per_page=3)

## Impact Surface by OwlClaw Module

### 1) Tool Protocol Layer (MCP SDK family + servers)
- Highest compatibility sensitivity this cycle.
- Notable issues:
 - Signature/handler changes (Kotlin).
 - Security default changes (Go).
 - major-line cleanup (Java 1.0).
- Recommended controls:
 - version-window lock
 - per-SDK contract tests
 - adapter shims for renamed classes and moved APIs

### 2) Model Serving / Gateway
- `vllm`, `litellm`, `ollama`:
 - Breaking risk concentrates in runtime/dependency matrix and policy defaults.
 - Rollback must be **image+dependency bundle**, not package-only.

### 3) Orchestration Core
- `langchain`, `langgraph`, `autogen`, `crewAI`:
 - Frequent soft breaks from dependency/core package coupling.
 - Need import-path and state-checkpoint compatibility tests before promote.

### 4) Observability / Eval
- `langfuse`, `phoenix`, `trulens`:
 - Fast feature velocity; API shape and query/backing-store behavior shifts possible.
 - For `trulens`, migration is explicit and should be planned as API refactor.

### 5) Sandbox / Memory / IDE integration
- `e2b`, `mem0`, `continue`, `aider`, `open-interpreter`:
 - mix of fast and sparse-release governance patterns.
 - require extra human review for projects with weak changelog signal.

## Migration Complexity Distribution
- **High**: 10 / 30
- **Medium**: 17 / 30
- **Low**: 3 / 30

## Recommended Rollback Strategy Standard
For all high-risk projects:
1. Keep previous known-good artifact bundle (`image/tag + dependency lock + config snapshot`).
2. Use canary ring deployment with contract checks.
3. Trigger rollback automatically on:
 - protocol negotiation failures
 - schema validation failures
 - critical tool-path errors above threshold.

## Practical Upgrade Order (for OwlClaw)
1. MCP SDK layer first (resolve interface breaks early).
2. Serving/gateway second (`vllm`/`litellm`/`ollama`).
3. Orchestration frameworks third.
4. Observability/eval fourth (after runtime stabilized).
5. Long-tail integrations last (`continue`, `open-interpreter`), with stricter manual gates.

## Sources (core)
- [Ollama latest release](https://api.github.com/repos/ollama/ollama/releases/latest)
- [vLLM releases](https://api.github.com/repos/vllm-project/vllm/releases?per_page=5)
- [LangChain releases](https://api.github.com/repos/langchain-ai/langchain/releases?per_page=5)
- [LangGraph releases](https://api.github.com/repos/langchain-ai/langgraph/releases?per_page=5)
- [AutoGen releases](https://api.github.com/repos/microsoft/autogen/releases?per_page=3)
- [CrewAI releases](https://api.github.com/repos/crewAIInc/crewAI/releases?per_page=3)
- [OpenHands releases](https://api.github.com/repos/OpenHands/OpenHands/releases?per_page=3)
- [browser-use releases](https://api.github.com/repos/browser-use/browser-use/releases?per_page=3)
- [LiteLLM latest release](https://api.github.com/repos/BerriAI/litellm/releases/latest)
- [LlamaIndex latest release](https://api.github.com/repos/run-llama/llama_index/releases/latest)
- [Haystack latest release](https://api.github.com/repos/deepset-ai/haystack/releases/latest)
- [Langfuse latest release](https://api.github.com/repos/langfuse/langfuse/releases/latest)
- [Phoenix latest release](https://api.github.com/repos/Arize-ai/phoenix/releases/latest)
- [TruLens latest release](https://api.github.com/repos/truera/trulens/releases/latest)
- [MCP Servers latest release](https://api.github.com/repos/modelcontextprotocol/servers/releases/latest)
- [MCP Python SDK latest release](https://api.github.com/repos/modelcontextprotocol/python-sdk/releases/latest)
- [MCP TypeScript SDK latest release](https://api.github.com/repos/modelcontextprotocol/typescript-sdk/releases/latest)
- [MCP Go SDK latest release](https://api.github.com/repos/modelcontextprotocol/go-sdk/releases/latest)
- [MCP Java SDK latest release](https://api.github.com/repos/modelcontextprotocol/java-sdk/releases/latest)
- [MCP C# SDK latest release](https://api.github.com/repos/modelcontextprotocol/csharp-sdk/releases/latest)
- [MCP Kotlin SDK latest release](https://api.github.com/repos/modelcontextprotocol/kotlin-sdk/releases/latest)
- [MCP Rust SDK latest release](https://api.github.com/repos/modelcontextprotocol/rust-sdk/releases/latest)
- [MCP PHP SDK latest release](https://api.github.com/repos/modelcontextprotocol/php-sdk/releases/latest)
- [MCP Swift SDK latest release](https://api.github.com/repos/modelcontextprotocol/swift-sdk/releases/latest)
- [Continue latest release](https://api.github.com/repos/continuedev/continue/releases/latest)
- [Aider latest release](https://api.github.com/repos/Aider-AI/aider/releases/latest)
- [Open Interpreter releases](https://api.github.com/repos/openinterpreter/open-interpreter/releases?per_page=3)
- [E2B latest release](https://api.github.com/repos/e2b-dev/E2B/releases/latest)
- [Mem0 latest release](https://api.github.com/repos/mem0ai/mem0/releases/latest)
- [OpenAI Agents Python latest release](https://api.github.com/repos/openai/openai-agents-python/releases/latest)
