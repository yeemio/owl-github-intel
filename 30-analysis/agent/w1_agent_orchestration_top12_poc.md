# W1 Top12 生产候选与两周 PoC 执行单

日期：2026-03-09  
输入基线：`w1_agent_orchestration_map.csv`（42 仓库分层）

## A) Top12 选择逻辑

- 主编排框架只保留 4 个主候选：`langgraph` / `autogen` / `crewAI` / `haystack`
- 增加 1 个轻量控制组：`openai-agents-python`
- 可观测双轨：`langfuse` + `agentops`
- 协议与工具边界：`modelcontextprotocol/python-sdk` + `fastapi_mcp`
- 生产补齐：记忆层（`mem0`）+ 执行层（`browser-use`）+ 企业候选（`microsoft/agent-framework`)

核心来源：
- https://api.github.com/repos/langchain-ai/langgraph
- https://api.github.com/repos/microsoft/autogen
- https://api.github.com/repos/crewAIInc/crewAI
- https://api.github.com/repos/deepset-ai/haystack
- https://api.github.com/repos/openai/openai-agents-python
- https://api.github.com/repos/langfuse/langfuse
- https://api.github.com/repos/AgentOps-AI/agentops
- https://api.github.com/repos/modelcontextprotocol/python-sdk
- https://api.github.com/repos/tadata-org/fastapi_mcp
- https://api.github.com/repos/mem0ai/mem0
- https://api.github.com/repos/browser-use/browser-use
- https://api.github.com/repos/microsoft/agent-framework

## B) 两周 PoC 任务节奏

### Week 1：统一基线 + 框架对打

1. **统一任务集（同输入/同模型/同工具）**
   - 任务类型：工具调用、长链推理、多代理协作、失败恢复
2. **接入 5 个编排候选**
   - `langgraph`、`autogen`、`crewAI`、`haystack`、`openai-agents-python`
3. **接入观测层**
   - 首选 `langfuse`，并行试 `agentops` 对比埋点成本
4. **周末里程碑**
   - 产出框架对比表：成功率、平均延迟、token 成本、恢复成功率

### Week 2：生产能力补齐

1. **MCP 边界落地**
   - 用 `python-sdk` + `fastapi_mcp` 抽象工具层，验证框架可替换性
2. **记忆与执行器验证**
   - 接入 `mem0`（会话记忆）+ `browser-use`（执行器）
3. **企业路线可行性**
   - 小范围验证 `microsoft/agent-framework` 的跨语言与部署成本
4. **周末里程碑**
   - 产出 Go/No-Go：主框架 1 个 + 备选 1 个 + 必选配套组件清单

## C) 统一评估 KPI（建议阈值）

- `Task Success Rate`：>= 85%
- `Recovery Success Rate`（故障后恢复）：>= 70%
- `P95 End-to-End Latency`：<= 基线 * 1.3
- `Token Cost / Task`：<= 基线 * 1.2
- `Trace Coverage`（关键步骤可追踪）：>= 95%
- `Tool Portability`（切框架工具不改协议）：>= 80%

## D) 生产可用判定门槛（最终决策）

满足以下 4/5 即可进入生产候选：

1. 任务成功率与稳定性达标  
2. 有可回放与可观测链路  
3. 有清晰许可证/商用边界  
4. 具备人机协同或审批机制  
5. 工具协议抽象后可迁移（降低锁定）

## E) 当前建议结论

- **P0 主战场**：`langgraph` vs `autogen` vs `crewAI`
- **P0 强制配套**：`langfuse`（或 `agentops`）+ MCP 边界
- **P1 补齐**：`mem0` + `browser-use`
- **P2 企业路线**：`microsoft/agent-framework`

