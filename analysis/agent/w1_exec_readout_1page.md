# W1 Executive Readout (1-Page)

日期：2026-03-09  
主题：AI Agent 编排框架选型（W1）  
样本：42 仓库（Strong 16 / Medium 16 / Weak 10）

## 结论（给管理层）

- **建议进入 PoC 主战场**：`LangGraph`、`AutoGen`、`CrewAI`
- **建议保留备份路线**：`Haystack`（模块化强，落地稳）
- **强制配套（不建议省略）**：可观测层（`Langfuse`/`AgentOps`）+ MCP 协议边界
- **阶段性判断**：可进入 `Conditional Go`（先 2 周 PoC，再最终 Go/No-Go）

## 为什么现在可以推进

- 主流框架仍在高频更新，生态热度与活跃度稳定  
- 工程风险从“模型能力”转向“治理能力”：状态恢复、追踪审计、人工接管  
- 工具协议（MCP）正在收敛，可降低长期框架锁定风险

核心来源：
- https://api.github.com/repos/langchain-ai/langgraph
- https://api.github.com/repos/microsoft/autogen
- https://api.github.com/repos/crewAIInc/crewAI
- https://api.github.com/repos/deepset-ai/haystack
- https://api.github.com/repos/modelcontextprotocol/python-sdk
- https://api.github.com/repos/langfuse/langfuse

## 关键风险（管理视角）

1. **许可证与商用边界风险**  
   - 部分高热项目为 `NOASSERTION/Other`，需要法务预审。  
2. **框架锁定风险**  
   - 过早深度绑定单框架会放大迁移成本。  
3. **生产可观测不足风险**  
   - 无 trace/eval 将导致故障排查与质量回归不可控。  

## 风险对策（已定义）

- 用 MCP 做工具协议边界，降低框架耦合  
- 双轨可观测（Langfuse/AgentOps）并行验证  
- 采用“主选1 + 备选1”策略，避免单点决策失误  

## 2 周行动计划（简版）

- **Week 1**：5 个候选统一任务集对打（成功率/延迟/成本/恢复率）  
- **Week 2**：补齐生产能力（MCP 边界、记忆层、执行器、故障注入）  
- **交付物**：`scorecard` + `decision memo` + `30/60/90` 路线图

## 里程碑与决策点

- D5：中期评审（是否淘汰 1-2 个候选）  
- D10：最终评审（Go/No-Go + 主选/备选确定）  

## 请求的管理支持

- 指定 1 名技术负责人 + 1 名平台负责人  
- 法务与安全评审窗口（许可证、权限、审计）  
- 保证 2 周 PoC 资源不被中断（模型预算 + 环境配额）

