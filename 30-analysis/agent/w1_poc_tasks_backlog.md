# W1 PoC Tasks Backlog (2 Weeks)

日期：2026-03-09  
周期：10 个工作日（D1-D10）  
目标：完成 Top12 生产候选对比并输出 Go/No-Go 结论。

## 使用说明

- `Owner` 填负责人。
- `Status` 取值：`todo` / `doing` / `blocked` / `done`。
- 每日收盘更新 `Evidence`（链接到 trace、日志或报告文件）。

| Day | Workstream | Task | Deliverable | Owner | Status | Evidence |
|---|---|---|---|---|---|---|
| D1 | Setup | 定义统一任务集（工具调用/多代理/失败恢复） | `w1_task_suite.md` | TBD | todo | |
| D1 | Setup | 冻结统一模型与提示参数 | `w1_eval_config.yaml` | TBD | todo | |
| D1 | Setup | 建立打分表与阈值 | `w1_poc_scorecard_template.csv` 更新 | TBD | todo | |
| D2 | Orchestrator | 接入 `langgraph` 基线流程 | `langgraph_run_1` 结果 | TBD | todo | |
| D2 | Orchestrator | 接入 `autogen` 基线流程 | `autogen_run_1` 结果 | TBD | todo | |
| D3 | Orchestrator | 接入 `crewAI` 基线流程 | `crewai_run_1` 结果 | TBD | todo | |
| D3 | Orchestrator | 接入 `haystack` 基线流程 | `haystack_run_1` 结果 | TBD | todo | |
| D4 | Baseline | 接入 `openai-agents-python` 控制组 | `openai_agents_run_1` | TBD | todo | |
| D4 | Observability | 接入 `langfuse` 全链路埋点 | Trace 覆盖率报告 v1 | TBD | todo | |
| D5 | Observability | 并行接入 `agentops` 对比埋点成本 | 埋点对比报告 v1 | TBD | todo | |
| D5 | Review | 周中评审：成功率/延迟/成本首轮比较 | `w1_mid_review.md` | TBD | todo | |
| D6 | Protocol | 接入 `python-sdk` 统一 MCP 工具边界 | MCP 适配层 v1 | TBD | todo | |
| D6 | Protocol | 使用 `fastapi_mcp` 暴露 2-3 内部 API 工具 | MCP 工具服务 v1 | TBD | todo | |
| D7 | Memory | 接入 `mem0` 会话记忆并压测 | 记忆命中与漂移报告 | TBD | todo | |
| D7 | Actuator | 接入 `browser-use` 执行器并定义回退策略 | 执行成功率报告 v1 | TBD | todo | |
| D8 | Reliability | 故障注入（超时/工具失败/上下文污染） | 恢复成功率报告 | TBD | todo | |
| D8 | Security | 工具权限、审计字段、最小授权检查 | 安全检查清单 v1 | TBD | todo | |
| D9 | Enterprise | 小范围验证 `microsoft/agent-framework` 跨栈可行性 | 企业路线可行性报告 | TBD | todo | |
| D9 | Scoring | 汇总 Top12 KPI 打分与风险评级 | `w1_poc_scorecard_template.csv` 完整版 | TBD | todo | |
| D10 | Decision | 产出 Go/No-Go：主选1+备选1+配套组件 | `w1_decision_memo.md` | TBD | todo | |
| D10 | Handover | 形成下阶段实施路线图（30/60/90天） | `w1_roadmap_90d.md` | TBD | todo | |

## Go/No-Go 快速判定门槛

- `Task Success Rate` >= 85%
- `Recovery Success Rate` >= 70%
- `Trace Coverage` >= 95%
- `Tool Portability` >= 80%
- `License Clarity` = clear（MIT/Apache 优先）

## 依赖输入文件

- `w1_agent_orchestration_map.csv`
- `w1_agent_orchestration_analysis.md`
- `w1_agent_orchestration_top12_poc.csv`
- `w1_poc_scorecard_template.csv`

