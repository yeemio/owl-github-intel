# GitHub External Scan (Round 1)

Date: 2026-03-09
Scope: Broad scan across MCP, agent orchestration, durable workflow, LLM observability, and skill/memory ecosystems.

## 1) Strong relevance to OwlClaw direction

### MCP ecosystem

- https://github.com/modelcontextprotocol/servers
- https://github.com/wong2/awesome-mcp-servers
- https://github.com/docker/mcp-servers
- https://github.com/modelcontextprotocol/typescript-sdk
- https://github.com/modelcontextprotocol/create-typescript-server

### Agent + MCP frameworks

- https://github.com/mcp-use/mcp-use
- https://docs.mcp-agent.com/
- https://github.com/rinadelph/Agent-MCP
- https://github.com/QuantGeekDev/mcp-framework

## 2) Medium relevance (architecture and platform patterns)

### Multi-agent orchestration

- https://github.com/Josh-XT/AGiXT
- https://github.com/kagent-dev/kagent
- https://github.com/mainframecomputer/orchestra
- https://github.com/Decentralised-AI/swarms-Enterprise-Grade-Production-Ready-Multi-Agent-Orchestration-Framework

### Durable workflow and execution

- https://github.com/temporalio/sdk-python
- https://github.com/microsoft/durabletask-python
- https://github.com/dapr/dapr-agents

## 3) Weak-to-medium relevance (stack-adjacent)

### Observability / LLMOps / prompt lifecycle

- https://github.com/langfuse/langfuse
- https://github.com/BerriAI/litellm
- https://github.com/agenta-ai/agenta
- https://github.com/latitude-dev/latitude-llm

### Memory / skill specs

- https://github.com/langchain-ai/langmem
- https://github.com/MemMachine/MemMachine
- https://github.com/agentskills/agentskills

## 4) Key trend signals (first pass)

- MCP ecosystem is rapidly expanding around curated server directories and SDK standardization.
- TypeScript-first tooling is dominant in MCP server authoring; Python remains strong in orchestration/runtime layers.
- Durable execution + agent orchestration convergence is becoming a mainstream pattern (Temporal/Dapr/graph runtimes).
- Observability platforms are integrating deeper with LLM gateways/proxies (LiteLLM + Langfuse OTEL direction).
- Skills/markdown-driven capability packaging is becoming more standardized and reusable.

## 5) Proposed next expansion

- Batch collect 80 repos per track:
  - MCP, Agent Orchestration, Durable Workflow, LLMOps
- Normalize to a single CSV schema:
  - repo, stars, forks, language, updated_at, category, relevance, priority
- Deliver three downstream assets:
  - `radar.md`
  - `signals.md`
  - `adoption_backlog.md`
