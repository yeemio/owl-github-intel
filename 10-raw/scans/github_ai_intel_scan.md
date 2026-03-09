# 外部 GitHub 深度情报扫描（AI Agent 生态）

## 扫描范围与方法
- 范围：Agent 编排、协议互联、工具执行、记忆层、观测层、推理运行时、弱相关底座（向量库/本地推理）。
- 方法：仅基于公开网页与公开 API 页面阅读（GitHub API、GitHub Blog、协议官网），未使用本地爬虫或脚本化抓取。
- 数据时点：`2026-03-09`（受公开页面实时变动影响）。

## 趋势（带来源）
- 协议化正在成为 Agent 基础设施主线：MCP 作为“AI 的 USB-C”定位已形成跨客户端支持，推动“工具接口标准化”优先于“单框架封闭生态”。来源：[MCP Introduction](https://modelcontextprotocol.io/introduction), [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
- Agent 间互联从框架内协作走向跨系统协作：A2A 强调 opaque agentic applications 的互操作，意味着未来编排层需要“外部 Agent 网关能力”。来源：[a2aproject/A2A](https://github.com/a2aproject/A2A)
- 2024 后 AI 开源贡献继续高增：GitHub Octoverse 显示生成式 AI 项目数与贡献数显著增长，推动 Agent 生态快速迭代。来源：[Octoverse 2024](https://github.blog/news-insights/octoverse/octoverse-2024/)
- “Agent + 浏览器执行”成为高增长接口层：`browser-use` 星标和活跃度高，说明 API-only Agent 正向“Web action capable agent”迁移。来源：[browser-use/browser-use](https://github.com/browser-use/browser-use)
- Agent 系统进入工程化阶段：观测、评测、网关、记忆分层项目（Langfuse/LiteLLM/Mem0）同时高活跃，表明焦点从 demo 转向可靠性与运营。来源：[langfuse/langfuse](https://github.com/langfuse/langfuse), [BerriAI/litellm](https://github.com/BerriAI/litellm), [mem0ai/mem0](https://github.com/mem0ai/mem0)

## 对比（框架/协议/基础设施）
| 维度 | 代表项目 | 结论 | 来源 |
|---|---|---|---|
| 编排范式 | LangGraph vs CrewAI vs AutoGen | LangGraph 偏状态图与可控流程；CrewAI 偏角色协作；AutoGen 生态成熟但 license 需审查 | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph), [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI), [microsoft/autogen](https://github.com/microsoft/autogen) |
| 协议互联 | MCP vs A2A | MCP 偏“模型到工具/数据”连接；A2A 偏“Agent 到 Agent”互联；两者可并存 | [MCP Introduction](https://modelcontextprotocol.io/introduction), [a2aproject/A2A](https://github.com/a2aproject/A2A) |
| 工具执行层 | Browser-use vs MCP Servers | Browser-use 强在网页动作执行；MCP Servers 强在统一工具接入面 | [browser-use/browser-use](https://github.com/browser-use/browser-use), [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) |
| 运行时底座（弱相关） | Ollama vs vLLM | Ollama 偏本地便捷部署，vLLM 偏高吞吐服务化；都影响 Agent 成本/延迟上限 | [ollama/ollama](https://github.com/ollama/ollama), [vllm-project/vllm](https://github.com/vllm-project/vllm) |
| 记忆与检索（弱相关） | Mem0 + Qdrant | “记忆服务 + 向量数据库”分层组合是可复用模式 | [mem0ai/mem0](https://github.com/mem0ai/mem0), [qdrant/qdrant](https://github.com/qdrant/qdrant) |

## 机会（对 OwlClaw 的可落地启发）
- 建立“双协议面”：北向采用 MCP（工具接入标准化），东向预留 A2A（跨 Agent 协作）。可先做 MCP 优先，A2A 作为网关扩展。来源：[MCP Introduction](https://modelcontextprotocol.io/introduction), [a2aproject/A2A](https://github.com/a2aproject/A2A)
- 编排内核采用“状态图 + 角色代理”混合：关键流程走 LangGraph 式可控图，探索任务走 CrewAI/AutoGen 式协作代理，统一在同一调度面。来源：[langchain-ai/langgraph](https://github.com/langchain-ai/langgraph), [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI), [microsoft/autogen](https://github.com/microsoft/autogen)
- 把“浏览器执行”纳入一等工具能力：对缺 API 场景（控制台、SaaS 后台）提供标准 action 接口，补齐 Agent 真实生产可用性。来源：[browser-use/browser-use](https://github.com/browser-use/browser-use)
- 先建设“网关 + 观测 + 评测”三件套：LiteLLM（路由/成本）、Langfuse（Tracing/Evals），形成上线闭环。来源：[BerriAI/litellm](https://github.com/BerriAI/litellm), [langfuse/langfuse](https://github.com/langfuse/langfuse)
- 在记忆层采用“短期上下文 + 长期记忆服务 + 向量索引”分层：避免把记忆逻辑硬编码到单一 Agent。来源：[mem0ai/mem0](https://github.com/mem0ai/mem0), [qdrant/qdrant](https://github.com/qdrant/qdrant)

## 风险（含弱相关说明）
- License 不确定性风险：多个关键项目在 GitHub API 中为 `NOASSERTION/Other`，企业分发或二次封装前需法务核验。来源：[modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers), [BerriAI/litellm](https://github.com/BerriAI/litellm), [langfuse/langfuse](https://github.com/langfuse/langfuse), [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)
- 生态迭代过快风险：高活跃意味着 API/行为变化快，平台需做好适配层与回归测试。来源：[Octoverse 2024](https://github.blog/news-insights/octoverse/octoverse-2024/)
- 弱相关基础设施“反向制约”风险：推理层（vLLM/Ollama）和检索层（Qdrant）虽然非 Agent 框架，但会直接决定延迟、成本、稳定性。来源：[vllm-project/vllm](https://github.com/vllm-project/vllm), [ollama/ollama](https://github.com/ollama/ollama), [qdrant/qdrant](https://github.com/qdrant/qdrant)
- 浏览器自动化的合规与稳定性风险：网页结构变更、反爬策略、账户风控会影响任务成功率。来源：[browser-use/browser-use](https://github.com/browser-use/browser-use)

## 建议路线图（P0 / P1 / P2）
- **P0（0-4周）**
  - 建 MCP-first 工具接入层与统一 Tool Schema，先覆盖高频内部工具。
  - 接入 LLM Gateway（LiteLLM 类）+ Tracing/Evals（Langfuse 类）作为上线门槛。
  - 设立 License 白名单与风险清单，冻结 `NOASSERTION` 项目的生产引入路径。
  - 来源：[modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers), [BerriAI/litellm](https://github.com/BerriAI/litellm), [langfuse/langfuse](https://github.com/langfuse/langfuse)
- **P1（1-2个月）**
  - 在调度层引入“图编排 + 多代理协作”双模式运行。
  - 增加浏览器执行能力作为补盲通道，并建立失败重试与人工回退策略。
  - 实施“记忆服务 + 向量索引”分层（Mem0/Qdrant 思路）并定义数据生命周期。
  - 来源：[langchain-ai/langgraph](https://github.com/langchain-ai/langgraph), [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI), [browser-use/browser-use](https://github.com/browser-use/browser-use), [mem0ai/mem0](https://github.com/mem0ai/mem0), [qdrant/qdrant](https://github.com/qdrant/qdrant)
- **P2（2-3个月）**
  - 预研 A2A 网关，实现跨 Agent 系统互联（外部供应商/内部多团队 Agent）。
  - 根据成本与隐私需求做推理运行时双轨：本地便捷（Ollama）+ 集群高吞吐（vLLM）。
  - 建立“协议兼容性测试矩阵”（MCP/A2A/模型供应商）降低升级风险。
  - 来源：[a2aproject/A2A](https://github.com/a2aproject/A2A), [ollama/ollama](https://github.com/ollama/ollama), [vllm-project/vllm](https://github.com/vllm-project/vllm)

## 附：核心数据文件
- 结构化仓库清单（CSV）：`D:\ai\owl-github-intel\github_ai_intel_scan.csv`
