# Burn W6 Master Digest（W1-W5 总汇编·长文版）

> 版本：v1.0  
> 生成时间：2026-03-09  
> 汇编范围：`w1` ~ `w5` 新增资产（Agent 编排、MCP 协议与执行、RAG 数据层、推理网关、Eval/Observability/Prompt 生命周期）  
> 目标：将前五周成果从“分散交付”升级为“可对外复盘、可内部执行、可持续迭代”的统一认知底稿。

---

## 目录

1. 汇编背景与方法  
2. W1-W5 总体演进主线  
3. 主题聚类（五大主题，十五个子议题）  
4. 关键共识（跨周稳定结论）  
5. 重复点（高频出现、应平台化固化）  
6. 争议点（尚未收敛、需要决策）  
7. 结构性风险与盲区  
8. 30 分钟增量汇编机制（执行规程）  
9. 下一阶段建议（W6-W8）  
10. 附：关联资产索引（W1-W5）

---

## 1) 汇编背景与方法

过去五个阶段并不是“并列的调研包”，而是一个逐步下钻的工程化路径：

- W1 解决“选谁做编排核心”的问题；
- W2 解决“工具协议和生态位怎么定”的问题；
- W3 解决“如何把选型翻译成执行 gate、测试、合同模板”的问题；
- W4 解决“生产流量下成本、可靠性、安全怎么守住”的问题；
- W5 解决“评测—观测—回滚如何形成闭环”的问题。

本汇编采用“三层抽象法”重构所有信息：

- **战略层**：方向是否一致（是否从 demo 导向转成治理导向）；
- **架构层**：边界是否清晰（编排层、协议层、网关层、评测层）；
- **操作层**：动作是否可执行（门禁规则、阈值、回滚路径、证据留存）。

这意味着，本文件不是摘要，而是把五周成果重新压缩成一份“可执行的共同语言”。

---

## 2) W1-W5 总体演进主线

### 2.1 从“框架对比”走向“治理体系”

W1 的中心是框架评估与 PoC 对打，典型产物包括：

- `w1_agent_orchestration_deep_analysis.md`
- `w1_top6_scoring_sheet.csv`
- `w1_top6_failure_injection_tests.csv`
- `w1_review_meeting_pack.md`

在这一阶段，关键转折已经出现：结论不再是“哪个框架最强”，而是“哪个方案在组织约束下最可控可交付”。这一定义，直接决定了后续 W2-W5 全部工作都围绕可治理性展开。

### 2.2 从“框架能力”走向“协议边界”

W2 通过 50+ MCP 项目扫描，把注意力从单一框架切换到协议层：

- `w2_mcp_ecosystem_map.csv`
- `w2_mcp_ecosystem_analysis.md`
- `w2_mcp_shortlist_top15.csv`
- `w2_mcp_deep_dive_top15_matrix.csv`

核心变化是：成熟度评价标准由 stars 和热度，迁移到 conformance、版本策略、schema 严格校验、transport 安全要求。换句话说，W2 不是“选 MCP 项目”，而是“把工具接入变成可验证合同”。

### 2.3 从“原则”走向“流水线门禁”

W3 把 W2 的分析落成执行工件：

- `w3_mcp_execution_playbook_detailed.md`
- `w3_mcp_ci_gates.csv`
- `w3_mcp_server_contract_template.json`
- `w3_mcp_gate_testcases.csv`

这一步非常关键：团队从“知道风险”升级到“知道在哪个 stage 阻断风险”。例如 G01-G12 直接把版本协商、schema 校验、origin 防护、回滚演练对应到 premerge/preprod/postdeploy。

### 2.4 从“协议合规”走向“生产控制面”

W4 并行推进了 MCP 聚合器威胁建模和推理网关深潜：

- `w4_mcp_aggregator_threat_model.md`
- `w4_mcp_server_contract_field_spec.md`
- `w4_gateway_deep_dive.md`
- `w4_gateway_slo_policy.md`
- `w4_gateway_runbook.md`

重点不再是“有没有功能”，而是控制项级治理：预算、限流、路由、熔断、重试、审计、可观测、金丝雀、扩缩容、许可证门禁。至此，体系具备了真正的“生产语言”。

### 2.5 从“治理框架”走向“闭环运营”

W5 将评测与观测收口为可持续运行机制：

- `w5_eval_observability_analysis.md`
- `w5_eval_release_gate_rules.yaml`
- `w5_eval_p0_execution_board.csv`
- `w5_eval_rollback_runbook.md`
- `w5_mcp_ci_job_spec.md`
- `w5_mcp_release_readiness_scorecard.csv`
- `w5_mcp_evidence_manifest.csv`

核心意义：形成了“离线评测 -> 线上守护 -> 自动回滚 -> 事件回灌 -> 回归再验证”的闭环，不再依赖“人工经验判断上线”。

---

## 3) 主题聚类（五大主题，十五个子议题）

## 主题 A：编排核心与运行时治理

### A1. 主选与备选逻辑已从功能导向转为恢复导向
- W1 明确提出 durable execution、HITL、trace 覆盖、恢复率优先。
- “Conditional Go”替代“直接全量上线”是重要治理升级。

### A2. 一票否决项机制基本成型
- trace 覆盖不足、恢复率不达标、license 不清、绕开 MCP 边界均可直接 No-Go。
- 这使得评审会从讨论会变成决策会。

### A3. 失败注入先于规模放量
- 故障注入测试不再是补充材料，而是进入 DoD 判定。
- 这为后续 W4/W5 的 runbook 和回滚策略奠定了操作基础。

## 主题 B：MCP 协议层与工具契约化

### B1. 协议成熟度评价范式升级
- 从“活跃不活跃”升级为“是否通过 conformance + tier + 版本窗口”。
- 这是标准化思维而非项目崇拜。

### B2. 工具发现变为双平面治理
- 预运行：registry/catalog 元数据；
- 运行时：`tools/list` 与 `list_changed` 真值。
- 两者不一致被定义为重大兼容风险。

### B3. 合同模板与字段规范完成落地
- `w3_mcp_server_contract_template.json` 与 `w4_mcp_server_contract_field_spec.md` 组成“声明 + 规则”双件套。
- 这意味着可以做自动化 diff，不再靠人工比对。

## 主题 C：RAG 数据层与质量工程

### C1. 分规模架构路线明确
- Small：快速验证；
- Mid：默认生产主战场（LlamaIndex + Qdrant + 二阶段重排）；
- Large：分布式与混合检索并行。

### C2. 指标门禁开始前置
- NDCG/Recall/MRR 与成本、延迟一起进入上线判断，而非单维质量分。

### C3. 索引版本与回滚从“建议”变“必需”
- W3 已给出 N-1 快照、灰度切流、质量恶化自动回退机制。
- 这与 W5 的 release state machine 完整衔接。

## 主题 D：推理网关与流量治理

### D1. 控制项化是 W4 最大增量
- 12 项控制项定义了网关是否具备生产资格。
- 重点是“预算约束 + 弹性保护 + 审计可追踪”三件事必须同时成立。

### D2. 控制面/数据面分层认识趋于一致
- 控制面负责策略与治理，数据面负责转发与弹性。
- 这避免了“把所有问题都塞给单个网关组件”。

### D3. SLO 与预算策略已具备执行语义
- 软预算、硬预算、降级阶梯、错误预算消耗动作都已定量化。
- 能直接接入值班体系和发布流程。

## 主题 E：Eval + Observability + Prompt 生命周期闭环

### E1. 指标字典和数据契约已标准化
- `task_success_rate`、`cost_per_success`、`prompt_injection_pass_rate` 等口径已统一。
- release_unit（prompt/model/toolset/dataset）成为贯穿主键。

### E2. 发布门禁状态机化
- `draft -> pr_eval -> staging_shadow -> canary -> full_rollout -> rollback`。
- 条件明确，触发器明确，可自动执行。

### E3. 事件回灌机制补齐“学习回路”
- Sev1/2 必须在 SLA 内回灌 `shadow_prod`。
- 这让线上事故直接转化为后续质量改进资产。

---

## 4) 关键共识（跨周稳定结论）

1. **“可治理”优先于“单点能力最强”**  
   五周材料反复证明：没有审计、回滚、门禁、版本窗口的能力，都会在生产阶段变成不确定性成本。

2. **MCP 不是附加能力，而是边界能力**  
   它决定未来是否能替换编排框架、替换工具供应商、替换接入方式而不重写核心系统。

3. **没有 trace 的评测等于不可复现**  
   W1 提到 trace 覆盖，W4 规定审计字段，W5 固化 release_unit 与回滚触发。三者形成一致链条。

4. **预算治理必须“限流层 + 账本层”双轨**  
   只看网关日志会失真，只看账本会滞后。两层结合才可操作。

5. **回滚能力必须演练而非声明**  
   W3/W5 都强调 rollback drill；未演练的回滚路径不能视为可用。

---

## 5) 重复点（高频出现、应平台化固化）

以下内容在 W1-W5 多次重复出现，说明应当从“项目实践”升级为“平台默认能力”：

### 5.1 重复点 R1：版本与契约漂移

- 在编排框架、MCP SDK、网关组件、Eval 工具中都存在“迭代快、隐性变更多”的问题。
- 结论：必须固化 contract diff 与版本窗口策略，不能依赖口头兼容承诺。

### 5.2 重复点 R2：可观测字段不统一导致断链

- 多文档都要求统一 request_id/trace_id/model/provider/cost/latency，但现实中最容易缺字段。
- 结论：将字段校验纳入 CI/CD gate，而不是上线后补日志。

### 5.3 重复点 R3：许可证与商用边界持续不确定

- 多个高价值项目存在 `NOASSERTION/Other`，重复触发法务风险。
- 结论：建立白名单与替代栈机制；PoC 可用不等于生产可用。

### 5.4 重复点 R4：发布流程“有灰度、无回灌”

- 许多流程谈到 canary，但如果事件不回灌数据集，下一次仍会重复故障。
- 结论：发布策略必须和回灌策略绑定；否则闭环只完成一半。

### 5.5 重复点 R5：动态发现/动态安装治理薄弱

- W2/W4 对聚合器（Forage/1MCP/MetaMCP 类）都提示了供应链与命名冲突风险。
- 结论：动态安装必须审批化、白名单化、可回滚化。

---

## 6) 争议点（尚未收敛、需要决策）

## 争议 1：主控制平面到底选单栈还是双栈？

- 一派主张单主平台（降低维护成本）；  
- 一派主张双栈并行（降低供应商锁定和单点失效）。

**建议**：短期单主 + 影子备份。即生产只认一个主控制面，但保留第二栈的最小可运行能力，用于故障演练与迁移验证。

## 争议 2：MCP 聚合器是否应在早期引入？

- 支持方：统一入口提升接入效率；  
- 反对方：动态安装和多下游信任边界会放大风险。

**建议**：早期只允许“静态注册聚合”，禁用动态安装；待审计链与冲突扫描稳定后再开动态能力。

## 争议 3：RAG 默认栈是否应直接押中大型架构？

- 支持方：一次到位避免二次迁移；  
- 反对方：运维成本高且过度设计。

**建议**：坚持中规模默认栈，设置明确升级触发阈值（数据量、QPS、SLA 退化、成本恶化），而不是主观“提前上大集群”。

## 争议 4：评测门禁阈值固定还是动态？

- 固定阈值优点是简单透明；  
- 动态阈值优点是适应业务季节波动。

**建议**：保留固定红线（安全、错误率、成功率底线），并允许对延迟/成本采用基线系数动态门限。

## 争议 5：是否允许“无证据的经验发布”？

- 现实中赶工常绕过门禁，后续再补报告。

**建议**：不允许。W5 已给出 `release_state_machine`，应把“无证据不可晋级”设为硬规则。

---

## 7) 结构性风险与盲区

### 7.1 当前最强项

- 有标准：门禁、阈值、合同模板、scorecard、evidence manifest 已具雏形；
- 有动作：P0 任务板、runbook、SLO 策略可直接排期；
- 有留痕：发布证据、保留周期、artifact 映射开始体系化。

### 7.2 当前最弱项

1. **跨域统一命名尚未完全收敛**  
   同类字段在网关、MCP、Eval 中命名可能不同，影响联查效率。

2. **组织协同流程仍偏“文件到人”，未完全“系统到系统”**  
   资产完善，但自动化执行深度仍有提升空间。

3. **法律/采购环节仍是关键外部依赖**  
   技术方案可以前进，但商用边界不清会卡在最后一公里。

4. **聚合器与动态安装仍是潜在爆点**  
   此类能力价值高，但需要更严格的默认关闭策略与审计策略。

---

## 8) 30 分钟增量汇编机制（执行规程）

用户要求“每 30 分钟读取 w1-w5 新增内容做一次总汇编”，建议采用以下统一机制（可被脚本化，也可由值班同学半自动执行）：

### 8.1 执行节拍

- T+0、T+30、T+60 ... 固定触发；
- 每次仅处理“新增或更新文件”（按修改时间增量）。

### 8.2 输入筛选规则

- 目录范围：`w1*` ~ `w5*`；
- 文件类型：`.md/.csv/.json/.yaml`；
- 增量判断：`last_modified > last_digest_timestamp`。

### 8.3 汇编动作

1. 提取新增内容中的：结论、阈值、门禁、风险、owner；
2. 归入五大主题聚类（A-E）；
3. 自动检测重复点（同义项、同阈值、同风险）；
4. 自动检测争议点（结论冲突、阈值冲突、流程冲突）；
5. 生成“本轮 delta 摘要 + 主文更新段落”。

### 8.4 输出格式约束

- 主文件：`burn_w6_master_digest.md`（持续更新）；
- 每次追加：
  - 更新时间戳
  - 新增文件清单
  - 新增共识
  - 新增争议
  - 对应 action item。

### 8.5 质量门槛

- 每轮汇编必须包含至少：
  - 1 个主题归类结果
  - 1 个重复点判断
  - 1 个争议点判断
  - 1 条可执行动作。

---

## 9) 下一阶段建议（W6-W8）

### W6：把“文件规范”变成“平台执行”

- 将 `w5_eval_release_gate_rules.yaml` 与 `w5_mcp_ci_job_spec.md` 接入实际 CI；
- 把 `w3_mcp_ci_gates.csv`、`w5_mcp_release_readiness_scorecard.csv` 做成自动打分看板；
- 把“证据 artifact”上传统一存储并绑定 release_id。

### W7：打通跨层联动（MCP x Gateway x Eval）

- 将 MCP tool call、网关 request、eval result 用统一 trace_id 关联；
- 建立跨层根因模板（协议失败、网关失败、模型失败、提示失败分桶）；
- 验证“同一事故在 30 分钟内可定位到 release_unit”。

### W8：组织化运行（值班 + 评审 + 复盘）

- 固定周评审模板：指标趋势、故障回放、争议裁决、白名单更新；
- 固定月度治理评审：许可证风险、供应链风险、预算偏差；
- 固定季度演练：大规模回滚与动态安装攻防演练。

---

## 10) 附：关联资产索引（W1-W5）

### W1（编排与评审）
- `w1_index.md`
- `w1_agent_orchestration_deep_analysis.md`
- `w1_review_meeting_pack.md`
- `w1_exec_readout_1page.md`

### W2（MCP 生态与选型）
- `w2_mcp_ecosystem_analysis.md`
- `w2_mcp_shortlist_top15.md`
- `w2_mcp_shortlist_top15.csv`
- `w2_mcp_deep_dive_top15_matrix.csv`

### W3（执行设计）
- `w3_mcp_execution_playbook_detailed.md`
- `w3_mcp_ci_gates.csv`
- `w3_mcp_server_contract_template.json`
- `w3_rag_deep_dive.md`
- `w3_rag_execution_checklist.md`

### W4（安全与网关治理）
- `w4_mcp_aggregator_threat_model.md`
- `w4_mcp_server_contract_field_spec.md`
- `w4_gateway_deep_dive.md`
- `w4_gateway_slo_policy.md`
- `w4_gateway_execution_plan.md`

### W5（闭环运营与审计）
- `w5_eval_observability_analysis.md`
- `w5_eval_top30_scoring_notes.md`
- `w5_eval_release_gate_rules.yaml`
- `w5_eval_p0_execution_board.csv`
- `w5_eval_rollback_runbook.md`
- `w5_mcp_ci_job_spec.md`
- `w5_mcp_release_readiness_scorecard.csv`
- `w5_mcp_evidence_manifest.csv`

---

## 结语

W1-W5 的真正价值不在于“产出了很多文件”，而在于已经形成一条相对完整的工程化链条：  
**选型 -> 边界 -> 门禁 -> 控制 -> 回滚 -> 回灌 -> 再验证**。  

下一步最重要的工作，不是继续扩展分析广度，而是把既有规则接入真实流水线和真实值班场景，让这些规则从“文档中的正确”变成“系统中的默认”。
