# OwlClaw AI 开发生态总览（2026-03-09）

## 0) 先给结论（可直接决策）
- **结论 A（可采纳）**：OwlClaw 主线采用 `LangGraph + MCP(Python SDK/Servers) + Qdrant + LiteLLM + Istio + OTel Collector + Opik/Promptfoo + OPA/OpenFGA + E2B`。  
  - 证据：`w1_agent_orchestration_map.csv`、`w2_mcp_ecosystem_map.csv`、`w3_rag_data_map.csv`、`w4_inference_gateway_map.csv`、`w5_eval_observability_map.csv`、`w6_ai_security_governance_map.csv`
- **结论 B（先做后做顺序）**：先“网关+观测+策略护栏”，再“RAG优化与多方案扩展”。  
  - 证据：`w4_gateway_control_checklist.csv`、`w4_gateway_slo_policy.md`、`w4_gateway_runbook.md`、`w5_eval_p0_execution_board.csv`
- **结论 C（冲突需裁决）**：`litellm`、`langfuse`、`TGI`、`OpenHands` 存在“高价值 vs 风险/弱相关”冲突，必须进入“带条件采纳”。  
  - 证据：`w4_inference_gateway_shortlist.csv`、`w5_eval_observability_top30.csv`、`deep_ai_dev_repo_map_2026-03-09.csv`、`github_ai_intel_scan_2026-03-09.csv`
- **结论 D（交付可追踪）**：已归一化去重 `144` 仓库，分层为 `P0/P1/P2/观察池`，并给出每仓采纳理由+主要风险。  
  - 证据：`master_repo_radar_2026-03-09.csv`

---

## 1) 全量去重与归一化结果
- **输入范围**：目录根下 `46` 个 `md` + `37` 个 `csv`（共 `83` 文件）。
- **归一化规则**：
  - 仓库名统一 `owner/repo`
  - 重复条目合并，优先保留字段完整条目（层级、分数、风险、证据）
  - 冲突项用 `conflict_flag/conflict_note` 标记
- **产物**：`master_repo_radar_2026-03-09.csv`（`144` 条）

### 已识别冲突项（示例）
1. `huggingface/text-generation-inference`
   - 冲突：一处描述“维护模式”，另一处描述“生产广泛使用”
   - 证据：`deep_ai_dev_repo_map_2026-03-09.csv` vs `w4_inference_gateway_map.csv`
2. `OpenHands/OpenHands`
   - 冲突：一处高价值，一处弱相关中价值
   - 证据：`github_ai_intel_scan_2026-03-09.csv` vs `owlclaw_external_github_scan_2026-03-09.csv`
3. `langfuse/langfuse`
   - 冲突：高优先级推荐，同时存在许可证元数据风险提示
   - 证据：`w5_eval_observability_top30.csv`、`w4_inference_gateway_shortlist.csv`
4. `BerriAI/litellm`
   - 冲突：被标“弱相关”，但在网关路线为 P0 核心
   - 证据：`github_ai_external_deep_scan_2026-03-09.csv`、`w4_inference_gateway_shortlist.csv`

### 空洞结论（需补证据）
- `w1_exec_readout_1page.md`：多处“趋势性判断”未给定量口径（待补证据）
- `github_ai_intel_scan.md`：工程化结论缺少明确指标窗口（待补证据）
- `w4_inference_gateway_analysis.md`：部分“适合做统一入口”未绑定 SLA/成本阈值（待补证据）

---

## 2) 质量评分与分层（0-100）

## 评分模型
- `总分 = 相关性(30) + 活跃度(20) + 成熟度(20) + (100-风险)(20) + (100-迁移成本)(10)`
- 风险包括：许可证、维护中断、供应链、架构耦合

## 分层门槛
- `P0`: `>= 82`（优先落地）
- `P1`: `70-81`（第二波）
- `P2`: `58-69`（条件采用）
- `观察池`: `<58`（仅观察或不建议）

## 当前结构（摘要）
- `P0`：平台主干组件（编排/MCP/网关/观测/安全控制面）
- `P1`：可快速扩展组件（多语言 SDK、评测增强、供应链工具）
- `P2`：场景化备选（轻量框架、特定推理后端）
- `观察池`：弱相关、证据不足或迁移代价不经济

> 详细仓库级结论（采纳理由+主要风险）见：`master_repo_radar_2026-03-09.csv`

---

## 3) 六层主题总览（面向架构决策）

## 3.1 Agent 编排层
- **趋势**：从 prompt 链转向“状态化、可恢复、可审计”。
- **主流路线**：`LangGraph` 主编排，`AutoGen/CrewAI` 用于协作策略。
- **分歧点**：快速开发体验 vs 生产可控性。
- **推荐路径**：生产 `LangGraph`，实验层并行 `CrewAI/AutoGen`。
- **暂不建议路径**：仅用会话式多 Agent 直接上生产。
- 证据：`w1_agent_orchestration_deep_analysis.md`、`w1_agent_orchestration_deep_evidence_matrix.csv`

## 3.2 MCP 协议层
- **趋势**：工具协议标准化与 server 目录化并行。
- **主流路线**：`modelcontextprotocol/*` + 组织内网关治理。
- **分歧点**：开放生态速度 vs 安全/审计强约束。
- **推荐路径**：`python-sdk + servers` 先落地，统一认证/配额/审计。
- **暂不建议路径**：无策略门禁地直接引入外部 server。
- 证据：`w2_mcp_ecosystem_analysis.md`、`w2_mcp_ecosystem_map.csv`、`w4_mcp_aggregator_threat_model.md`

## 3.3 RAG 数据层
- **趋势**：向量检索 + 重排 + 评测闭环成为标配。
- **主流路线**：`Qdrant/Milvus/Weaviate` + 离线/在线评测。
- **分歧点**：检索性能极致 vs 运维复杂度。
- **推荐路径**：默认 `Qdrant`，高规模再引入 `Milvus` 方案。
- **暂不建议路径**：只做向量库，不做召回质量评测。
- 证据：`w3_rag_deep_dive.md`、`w3_rag_deep_scoring_matrix.csv`

## 3.4 推理网关层
- **趋势**：从“转发代理”升级为“预算+路由+SLA+审计控制面”。
- **主流路线**：`LiteLLM/Portkey` + `Istio/Envoy` + 计量账本。
- **分歧点**：托管平台效率 vs 自主可控与可迁移性。
- **推荐路径**：`LiteLLM + Istio + OpenMeter` 三层组合。
- **暂不建议路径**：仅单网关承载全部治理能力。
- 证据：`w4_inference_gateway_analysis.md`、`w4_gateway_deep_dive.md`、`w4_gateway_capability_evidence.csv`

## 3.5 评测观测层
- **趋势**：Tracing 与 Eval 合并进入发布门禁。
- **主流路线**：`Langfuse/Opik/Helicone` + `Promptfoo/DeepEval` + OTel。
- **分歧点**：观测深度 vs 成本/接入复杂度。
- **推荐路径**：`Opik + Promptfoo + OTel`；`Langfuse` 条件采纳（许可证先核实）。
- **暂不建议路径**：只看成本或只看响应时间，不看质量回归。
- 证据：`w5_eval_observability_analysis.md`、`w5_eval_observability_capability_matrix.csv`、`w5_eval_kpi_catalog.csv`

## 3.6 安全治理层
- **趋势**：从静态策略转向“策略执行+沙箱+红队回归”。
- **主流路线**：`OPA/OpenFGA` 授权 + `E2B` 沙箱 + `Garak/PyRIT` 对抗测试。
- **分歧点**：安全隔离强度 vs 执行成本与时延。
- **推荐路径**：高风险工具强制沙箱；策略默认拒绝。
- **暂不建议路径**：仅依赖提示词防护，无执行层隔离。
- 证据：`w6_ai_security_governance_analysis.md`、`w6_ai_security_governance_map.csv`

---

## 4) OwlClaw 关联逻辑（弱相关保留原则）
- **保留条件**：弱相关项目必须能补齐 OwlClaw 的某个控制缺口（如预算账本、签名、沙箱、评测基准）。
- **典型弱相关但保留**：
  - `openmeterio/openmeter`：补齐预算/配额账本
  - `sigstore/cosign`：补齐制品签名与供应链验证
  - `gitleaks/semgrep`：补齐安全左移门禁
- **不保留条件**：仅“概念相关”，但无法映射到控制项验收/SLO/上线门禁。

---

## 5) 落地路线图（决策摘要）
- **先做（30天）**：网关治理基线 + 观测链路 + 策略护栏（因为这是后续所有能力的“稳定底盘”）
- **后做（60天）**：RAG 与评测体系强化（在底盘稳定后才能评估真实增益）
- **再做（90天）**：供应链治理与多路线扩展（防止早期优化造成架构漂移）

> 详细行动项、依赖、工作量、验收标准见：`master_action_backlog_2026-03-09.md`

---

## 6) 风险与治理（摘要）
- **License 风险**：NOASSERTION/Other 项需法务门禁，未通过不得入生产。
- **维护中断风险**：Archived/低活跃项目仅可用于样本，不入核心链路。
- **供应链风险**：引入 SBOM、签名验证、漏洞扫描三件套。
- **架构漂移风险**：按六层设 owner，发布前强制 ADR 与漂移检查。

> 详细风险项与缓解动作见：`master_risk_register_2026-03-09.csv`
