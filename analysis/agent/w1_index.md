# W1 Assets Index (Navigation + Run Order)

日期：2026-03-09  
用途：把 W1 所有产物按“先看什么、先做什么、先决策什么”串成一条执行线。

---

## A. 快速导航（按用途）

### 1) 宏观结论（管理层）
- `w1_exec_readout_1page.md`  
- `w1_decision_memo_template.md`

### 2) 深度证据（技术评审）
- `w1_agent_orchestration_analysis.md`  
- `w1_agent_orchestration_deep_analysis.md`  
- `w1_agent_orchestration_map.csv`  
- `w1_agent_orchestration_deep_evidence_matrix.csv`

### 3) 候选与 PoC 执行
- `w1_agent_orchestration_top12_poc.csv`  
- `w1_agent_orchestration_top12_poc.md`  
- `w1_poc_tasks_backlog.md`  
- `w1_poc_scorecard_template.csv`

### 4) 本轮新增（可执行决策闭环）
- `w1_top6_framework_adr_cards.md`  
- `w1_top6_failure_injection_tests.csv`  
- `w1_top6_scoring_sheet.csv`  
- `w1_review_meeting_pack.md`

---

## B. 建议使用顺序（从0到1）

1. 先读 `w1_exec_readout_1page.md`（3分钟，统一方向）  
2. 再读 `w1_agent_orchestration_deep_analysis.md`（10-15分钟，统一标准）  
3. 对照 `w1_agent_orchestration_deep_evidence_matrix.csv`（核验证据来源）  
4. 进入 `w1_top6_framework_adr_cards.md`（做候选边界与放弃条件）  
5. 执行 `w1_top6_failure_injection_tests.csv`（先做故障注入，再谈主选）  
6. 回填 `w1_top6_scoring_sheet.csv`（出可追溯分数）  
7. 用 `w1_review_meeting_pack.md` 开评审会（30分钟决策）  
8. 会后更新 `w1_decision_memo_template.md`（冻结结论）  

---

## C. W1 Done Definition（完成判定）

W1 视为完成需同时满足：

1. Top6 至少完成 18 条故障注入测试中的 80%。  
2. P0 候选（LangGraph/OpenAI Agents）完成同任务集对打。  
3. `w1_top6_scoring_sheet.csv` 已回填并产出主选+备选。  
4. 许可证风险条目有法务结论（至少“可 PoC / 不可上线”级别）。  
5. 已输出最终版决策 memo（可用于管理层签批）。  

---

## D. 评审会输出物（必须留痕）

1. 主选框架：1 个  
2. 备选框架：1 个  
3. 淘汰清单：其余候选 + 原因  
4. W2 计划：30/60/90 里程碑  
5. 风险 owner：技术/平台/法务/SRE 对应责任人  

---

## E. 下一阶段（W2）建议主题

1. 主选框架的生产化改造清单（权限、审计、熔断、回放）。  
2. MCP 工具目录治理（版本、权限、隔离域）。  
3. 评估闭环自动化（trace->score->gate->release）。  
4. 灰度发布与回滚演练（故障剧本化）。  
