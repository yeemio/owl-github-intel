# W1 Review Meeting Pack (30-Min Decision Flow)

日期：2026-03-09  
目标：在 30 分钟内完成 W1 阶段性决策（主选/备选/淘汰），并明确 W2 执行方向。  
适用角色：技术负责人、平台负责人、SRE、法务/安全代表、业务方观察员。

---

## 1) 会议输入材料（会前必读）

1. `w1_agent_orchestration_deep_analysis.md`  
2. `w1_agent_orchestration_deep_evidence_matrix.csv`  
3. `w1_top6_framework_adr_cards.md`  
4. `w1_top6_failure_injection_tests.csv`  
5. `w1_top6_scoring_sheet.csv`

---

## 2) 30 分钟议程

### 0-5 min：目标与边界确认
- 本次不是“选最强框架”，而是选“当前组织约束下最可控可交付方案”。  
- 必须确认：MCP 边界、观测门禁、许可证门禁是硬约束。  

### 5-12 min：P0 双核心对打结果
- `LangGraph` vs `OpenAI Agents SDK`  
- 只看 5 个硬指标：成功率、恢复率、P95 延迟、成本、trace 覆盖。  

### 12-18 min：P1/P2 定位与风险
- `CrewAI` / `Haystack` 是否保留为场景备选。  
- `Dify` / `Mastra` 是否进入继续观察池（取决于 license/commercial 边界）。  

### 18-24 min：一票否决项检查
- 任何一条不满足即本轮 No-Go：  
  1) trace 覆盖 < 90%  
  2) 恢复率 < 95%（P0）  
  3) 许可证边界未清  
  4) 工具可移植性未过 MCP 边界验证  

### 24-30 min：决策与行动项
- 产出：主选 1 个 + 备选 1 个 + 淘汰清单。  
- 指派：W2 负责人、里程碑、风险 owner、复盘日期。  

---

## 3) 决策口径（统一话术）

### 技术口径
- 我们优先选择“故障可恢复、行为可审计、协议可迁移”的框架，而不是单次效果最优。  

### 平台口径
- 任何运行时接入必须通过 MCP 适配层；任何评估结果必须有 trace 证据。  

### 管理口径
- 本次是“Conditional Go”：进入下一阶段受控放量，而非全量上线承诺。  

---

## 4) 评审模板（会议记录可直接填）

## 4.1 框架评分快照

| Framework | Weighted Total | Demo Risk | Gate Result | 结论 |
|---|---:|---:|---|---|
| LangGraph | TBD | TBD | PASS/FAIL | 主选/备选/淘汰 |
| OpenAI Agents SDK | TBD | TBD | PASS/FAIL | 主选/备选/淘汰 |
| CrewAI | TBD | TBD | PASS/FAIL | 主选/备选/淘汰 |
| Haystack | TBD | TBD | PASS/FAIL | 主选/备选/淘汰 |
| Dify | TBD | TBD | PASS/FAIL | 主选/备选/淘汰 |
| Mastra | TBD | TBD | PASS/FAIL | 主选/备选/淘汰 |

## 4.2 会议决策

- 主选：`TBD`  
- 备选：`TBD`  
- 淘汰：`TBD`  
- 决策类型：`Conditional Go / No-Go`

## 4.3 决策依据（只填证据，不填感觉）

- 指标证据：`TBD`  
- 故障注入证据：`TBD`  
- 许可证结论：`TBD`  
- 可移植性结论（MCP）：`TBD`

---

## 5) 一票否决项（硬门禁）

1. 无法提供可追溯 trace/eval 证据。  
2. 无法证明故障恢复路径（至少通过 3 类故障注入）。  
3. 许可证条款无法在评审窗口内明确。  
4. 工具接入绕过 MCP 边界。  

---

## 6) 会后 48 小时行动清单

1. 更新 `w1_top6_scoring_sheet.csv` 的实测分数与 Gate 结论。  
2. 更新 `w1_decision_memo_template.md` 为最终决策版本。  
3. 形成 W2 实施 backlog（只保留主选+备选路径）。  
4. 对淘汰项输出“退出原因与复活条件”。  

---

## 7) 核心证据链接

- LangGraph: https://raw.githubusercontent.com/langchain-ai/langgraph/main/README.md  
- OpenAI Agents SDK: https://raw.githubusercontent.com/openai/openai-agents-python/main/README.md  
- CrewAI: https://raw.githubusercontent.com/crewAIInc/crewAI/main/README.md  
- Haystack: https://raw.githubusercontent.com/deepset-ai/haystack/main/README.md  
- Dify: https://raw.githubusercontent.com/langgenius/dify/main/README.md  
- Mastra: https://raw.githubusercontent.com/mastra-ai/mastra/main/README.md  
- MCP Python SDK: https://raw.githubusercontent.com/modelcontextprotocol/python-sdk/main/README.md  
- Langfuse: https://raw.githubusercontent.com/langfuse/langfuse/main/README.md
