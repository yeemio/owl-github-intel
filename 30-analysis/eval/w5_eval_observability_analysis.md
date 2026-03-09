# W5: LLM Eval + Observability + Prompt Lifecycle

日期：2026-03-09
范围：仅基于 GitHub 网页检索与公开仓库页面/API 阅读（无本地爬虫、无脚本采集）。

## 1) 生态扫描结论（40+ 项）

本轮已扫描并结构化 53 个项目（见 `w5_eval_observability_map.csv`），覆盖：
- 开发期评测：`openai/evals`、`openai/simple-evals`、`huggingface/lighteval`、`confident-ai/deepeval`、`vibrantlabsai/ragas`、`EleutherAI/lm-evaluation-harness`
- 线上观测：`langfuse/langfuse`、`comet-ml/opik`、`Helicone/helicone`、`pydantic/logfire`、`openlit/openlit`、`AgentOps-AI/agentops`
- Prompt 生命周期：`microsoft/prompty`、`pezzolabs/pezzo`、`Agenta-AI/agenta`、`latitude-dev/latitude-llm`、`MagnivOrg/prompt-layer-library`
- 闭环型平台：`coze-dev/coze-loop`、`mlflow/mlflow`、`raga-ai-hub/RagaAI-Catalyst`、`Arize-ai/phoenix`
- 增补项目：`dataelement/bisheng`、`uptrain-ai/uptrain`、`modelscope/evalscope`、`langwatch/langwatch`、`zenml-io/zenml`、`datachain-ai/datachain`、`agentscope-ai/OpenJudge`

代表性来源：
- https://api.github.com/repos/langfuse/langfuse
- https://api.github.com/repos/openai/evals
- https://api.github.com/repos/huggingface/lighteval
- https://api.github.com/repos/comet-ml/opik
- https://api.github.com/repos/Agenta-AI/agenta
- https://api.github.com/repos/latitude-dev/latitude-llm
- https://api.github.com/repos/dataelement/bisheng
- https://api.github.com/repos/langwatch/langwatch
- https://api.github.com/repos/modelscope/evalscope

## 2) 开发期评测与线上观测如何闭环

### 闭环目标
- 把“离线好分数”转成“线上稳定表现”，并防止版本回归。
- 把“线上异常”可回灌为“离线评测样本”，持续提高模型/Prompt/工具链质量。

### 闭环拓扑（可执行）
1. Prompt 与应用版本化  
   - 每次变更绑定 `prompt_version`、`model_id`、`toolset_version`。  
   - 参考：`langfuse/langfuse`、`microsoft/prompty`、`pezzolabs/pezzo`  
2. 开发期离线评测（PR/合并前）  
   - 在固定数据集上跑质量+安全+成本评测。  
   - 参考：`openai/evals`、`huggingface/lighteval`、`promptfoo/promptfoo`  
3. 灰度上线与线上观测  
   - 按流量切分新旧版本，采集 trace、延迟、成本、错误、用户反馈。  
   - 参考：`comet-ml/opik`、`Helicone/helicone`、`pydantic/logfire`  
4. 线上异常回灌离线  
   - 将 bad cases 自动回写为 regression dataset；触发 nightly eval。  
   - 参考：`Arize-ai/phoenix`、`mlflow/mlflow`、`coze-dev/coze-loop`  
5. 发布门禁  
   - 仅当“离线阈值 + 线上守护阈值”同时满足才放量。  
   - 参考：`confident-ai/deepeval`、`vibrantlabsai/ragas`、`AgentOps-AI/agentops`

## 3) 可直接执行的评测体系模板

### 3.1 指标体系（Metrics）

#### A. 质量指标（开发期主判）
- `task_success_rate`（任务成功率）
- `factuality_score`（事实性）
- `answer_relevance`（答案相关性）
- `context_precision` / `context_recall`（RAG 场景）
- `tool_call_accuracy`（工具调用参数正确率）

可映射工具：
- `vibrantlabsai/ragas`（RAG 指标）
- `confident-ai/deepeval`（多类 LLM 指标）
- `openai/evals`、`huggingface/lighteval`（基准/任务评测）

#### B. 运行指标（线上主判）
- `p95_latency_ms`
- `error_rate`（HTTP/工具执行/超时）
- `cost_per_success`（每成功任务成本）
- `token_per_success`
- `fallback_rate`（模型回退率）

可映射工具：
- `Helicone/helicone`、`AgentOps-AI/agentops`、`BerriAI/litellm`

#### C. 安全与鲁棒性（双环境）
- `prompt_injection_pass_rate`
- `policy_violation_rate`
- `refusal_quality_score`
- `jailbreak_success_rate`（越低越好）

可映射工具：
- `promptfoo/promptfoo`、`guardrails-ai/guardrails`、`NVIDIA-NeMo/Guardrails`

### 3.2 数据集分层（Datasets）

- `golden_core`（100-300 条）：高价值关键路径，人工标注；用于 PR 必跑
- `shadow_prod`（滚动 500-5k 条）：线上抽样匿名化；用于 nightly
- `adversarial_set`（50-200 条）：注入、越权、越狱、边界输入
- `tool_failure_set`（50-100 条）：API 超时/空结果/脏数据/重试链路
- `cost_stress_set`（100+ 条）：长上下文、高工具调用深度场景

来源实践参考：
- `openai/evals`（基准组织）
- `coze-dev/coze-loop`（开发到监控全生命周期）
- `mlflow/mlflow`（数据与实验管理）

### 3.3 阈值模板（Thresholds）

按环境分级：

- PR Gate（阻断）
  - `task_success_rate >= 0.90`
  - `factuality_score >= 0.85`
  - `prompt_injection_pass_rate >= 0.95`
  - `cost_per_success` 不高于基线 +10%

- Staging Gate（阻断）
  - `task_success_rate >= 0.92`
  - `p95_latency_ms <= baseline * 1.15`
  - `error_rate <= 1.5%`
  - `jailbreak_success_rate <= 2%`

- Production Guardrail（告警/自动降级）
  - 5 分钟窗口 `error_rate > 3%` 触发降级
  - 15 分钟窗口 `cost_per_success > baseline * 1.25` 触发模型路由调整
  - 连续 3 个窗口 `task_success_rate < 0.88` 触发回滚

### 3.4 回归规则（Regression Rules）

- Rule R1（质量回归阻断）
  - 任意核心指标较基线下降 > 3% 且 p-value 通过（或样本量>100）即阻断
- Rule R2（成本回归阻断）
  - `cost_per_success` 上升 > 12% 且质量无显著提升时阻断
- Rule R3（延迟回归告警）
  - `p95_latency_ms` 上升 > 20% 连续 2 个发布周期触发容量/路由排查
- Rule R4（安全红线）
  - 注入成功率、越权率任一超过阈值即回滚到上个稳定版本
- Rule R5（线上异常回灌）
  - 所有 Sev-1/Sev-2 线上事件必须在 24h 内进入 `shadow_prod` 回归集

### 3.5 可执行配置模板（可直接改参数）

`eval_policy.yaml`：

```yaml
version: 1
owners:
  - llm-platform
  - app-team
release_unit:
  required_tags: [prompt_version, model_id, toolset_version, dataset_snapshot]
datasets:
  golden_core:
    min_samples: 120
    refresh_days: 30
  shadow_prod:
    min_samples: 1000
    refresh_days: 1
  adversarial_set:
    min_samples: 80
    refresh_days: 14
metrics:
  quality:
    task_success_rate: {op: ">=", threshold: 0.90}
    factuality_score: {op: ">=", threshold: 0.85}
  runtime:
    p95_latency_ms: {op: "<=", baseline_factor: 1.15}
    error_rate: {op: "<=", threshold: 0.015}
    cost_per_success: {op: "<=", baseline_factor: 1.10}
  safety:
    prompt_injection_pass_rate: {op: ">=", threshold: 0.95}
    jailbreak_success_rate: {op: "<=", threshold: 0.02}
regression:
  quality_drop_block_pct: 3
  cost_rise_block_pct: 12
  latency_rise_alert_pct: 20
production_guardrail:
  - name: high_error_auto_degrade
    window_min: 5
    condition: "error_rate > 0.03"
    action: "degrade_to_safe_model"
  - name: unstable_success_auto_rollback
    window_min: 15
    consecutive_windows: 3
    condition: "task_success_rate < 0.88"
    action: "rollback_release_unit"
```

`event_schema.json`（线上回灌最小字段）：

```json
{
  "trace_id": "string",
  "timestamp": "ISO-8601",
  "environment": "prod|staging|dev",
  "release_unit": {
    "prompt_version": "string",
    "model_id": "string",
    "toolset_version": "string",
    "dataset_snapshot": "string"
  },
  "task": {
    "task_type": "string",
    "success": true,
    "latency_ms": 0,
    "tokens_in": 0,
    "tokens_out": 0,
    "cost_usd": 0.0
  },
  "safety": {
    "policy_violation": false,
    "prompt_injection_detected": false
  },
  "feedback": {
    "user_score": null,
    "judge_score": null,
    "comment": null
  }
}
```

执行规则（CI/CD）：
- PR：跑 `golden_core + adversarial_set`，任一阻断阈值不通过则拒绝合并
- Nightly：跑 `shadow_prod`，自动生成 regression candidates
- Release：要求“离线通过 + 线上 guardrail 连续稳定窗口通过”才允许放量
- Incident：Sev-1/2 事件 24 小时内转入 `shadow_prod` 并加入必跑回归

## 4) 建议的实施节奏（可落地）

### P0（0-2 周）
- 建立统一 Trace ID 贯穿（网关 -> Agent Runtime -> Tool -> Eval）
- 建立 `golden_core` + PR Gate（先覆盖前 3 条关键用户路径）
- 接入一套线上观测（延迟/错误/成本）和一套离线评测（质量/安全）

参考来源：
- https://api.github.com/repos/langfuse/langfuse
- https://api.github.com/repos/promptfoo/promptfoo
- https://api.github.com/repos/comet-ml/opik

### P1（2-6 周）
- 打通“线上异常自动回灌离线集”
- 引入对照实验（A/B 或 shadow）+ 发布门禁策略
- 补齐 adversarial 和 tool_failure 数据集

参考来源：
- https://api.github.com/repos/Arize-ai/phoenix
- https://api.github.com/repos/mlflow/mlflow
- https://api.github.com/repos/coze-dev/coze-loop

### P2（6-12 周）
- 建立多模型路由+预算策略联动评测结果
- 建立多模态评测扩展（图像/视频/语音）
- 建立跨团队标准化质量分层（P0/P1/P2 场景）

参考来源：
- https://api.github.com/repos/BerriAI/litellm
- https://api.github.com/repos/EvolvingLMMs-Lab/lmms-eval
- https://api.github.com/repos/modelcontextprotocol/modelcontextprotocol

## 5) 风险提示

- 许可证风险：多个关键项目为 `NOASSERTION/Other`，商用复用需法务审查  
  来源：
  - https://api.github.com/repos/openai/evals
  - https://api.github.com/repos/Arize-ai/phoenix
  - https://api.github.com/repos/BerriAI/litellm
  - https://api.github.com/repos/modelcontextprotocol/servers

- 生态波动风险：高热项目 API/最佳实践迭代快，需适配层隔离  
  来源：
  - https://api.github.com/repos/langchain-ai/langgraph
  - https://api.github.com/repos/microsoft/autogen
  - https://api.github.com/repos/openai/openai-agents-python

- 评测漂移风险：离线分数与线上真实行为偏差，需要持续回灌机制  
  来源：
  - https://api.github.com/repos/comet-ml/opik
  - https://api.github.com/repos/coze-dev/coze-loop
  - https://api.github.com/repos/mlflow/mlflow

## 6) Top30 推荐栈（闭环优先）

已输出：`w5_eval_observability_top30.csv`

### 评分方法（用于技术选型会）
- `closure_fit_5`：是否同时支持“开发评测 -> 线上观测 -> 回灌迭代”关键环节
- `freshness_5`：近期活跃度（近 7-30 天活跃更高）
- `adoption_5`：社区采用度（stars 量级作为近似）
- `license_safety_5`：许可证可商用友好度（Apache/MIT 更高，NOASSERTION 更低）
- `total_score_20`：四项加总，用于形成优先级

### 快速落地分层（建议）
- L1 控制平面：`langfuse/langfuse` 或 `comet-ml/opik`（二选一主平台）
- L2 离线评测：`confident-ai/deepeval` + `vibrantlabsai/ragas` + `openai/simple-evals`
- L3 线上守护：`Helicone/helicone` 或 `AgentOps-AI/agentops`（延迟/错误/成本）
- L4 安全红线：`promptfoo/promptfoo` + `guardrails-ai/guardrails`
- L5 版本与发布：`microsoft/promptflow` 或 `coze-dev/coze-loop`（门禁+回滚）

### 两条默认组合（可直接开工）
- 组合 A（开源优先）：`langfuse + deepeval + ragas + promptfoo + guardrails + litellm`
- 组合 B（平台化优先）：`opik + mlflow + promptflow + helicone + promptfoo`

## 7) 深化版：从“可用”到“可治理”的闭环实施细节

### 7.1 能力矩阵（细颗粒）

已输出：`w5_eval_observability_capability_matrix.csv`

用途：
- 不是只看 stars，而是按能力位（离线评测/线上观测/Prompt 生命周期/数据集治理/安全）拆开比较
- 可直接用于 RFP 或技术选型评审，先选“主平台”，再补“短板组件”

建议选型顺序：
1. 先选 L1 主控制平面（只选一个）：`langfuse/langfuse` 或 `comet-ml/opik`
2. 再补 L2 质量评测：`confident-ai/deepeval` + `vibrantlabsai/ragas`
3. 再补 L3 安全与发布门禁：`promptfoo/promptfoo` + `guardrails-ai/guardrails`
4. 最后补 L4 流量与成本控制：`BerriAI/litellm` 或 `Helicone/helicone`

### 7.2 指标字典（带公式，避免口径漂移）

- `task_success_rate = success_count / total_count`
- `factuality_score = mean(judge_factuality_i)`
- `answer_relevance = mean(judge_relevance_i)`
- `tool_call_accuracy = correct_tool_calls / total_tool_calls`
- `p95_latency_ms = percentile(latency_ms, 95)`
- `error_rate = error_requests / total_requests`
- `cost_per_success = total_cost_usd / max(success_count, 1)`
- `token_per_success = (input_tokens + output_tokens) / max(success_count, 1)`
- `prompt_injection_pass_rate = safe_cases / injection_test_cases`
- `jailbreak_success_rate = jailbreak_success_count / jailbreak_attempt_count`

反作弊/反“刷分”规则：
- 质量分提升但 `cost_per_success` 恶化 > 12%，按“无效优化”处理
- 仅在 `golden_core` 提升、`shadow_prod` 下降，按“过拟合”处理
- `tool_call_accuracy` 下降时，禁止仅靠模板改写绕过

### 7.3 数据集治理（版本、抽样、回灌）

数据集分层与 SLA：
- `golden_core`：每 30 天复审；业务 owner 必须签字
- `shadow_prod`：每天滚动；自动匿名化；Sev-1/2 事件 24h 内入集
- `adversarial_set`：双周更新；覆盖注入、越权、越狱
- `tool_failure_set`：每周更新；覆盖超时、空结果、429、脏数据

回灌准入标准（避免噪声污染）：
- 必须有 `trace_id + release_unit + failure_label`
- 至少满足其一：用户差评、业务规则失败、安全检测命中
- 去重键：`(intent_hash, context_hash, failure_type)`

### 7.4 发布门禁状态机（强约束）

`Draft -> PR_Eval -> Staging_Shadow -> Canary -> Full_Rollout`

状态流转条件：
- `PR_Eval -> Staging_Shadow`：PR 指标全部达标
- `Staging_Shadow -> Canary`：影子流量 24h，`error_rate <= 1.5%`
- `Canary -> Full_Rollout`：5%-20% 灰度窗口内，连续 3 窗口稳定
- 任意状态 -> `Rollback`：触发红线（安全阈值/错误率/成功率）

自动回滚触发器（建议默认值）：
- 5 分钟窗口 `error_rate > 3%`
- 连续 3 窗口 `task_success_rate < 0.88`
- 任一安全红线（注入成功率或越权率）超阈值

### 7.5 观测数据契约（跨系统一致）

强制字段：
- 追踪：`trace_id`、`span_id`、`parent_span_id`
- 版本：`prompt_version`、`model_id`、`toolset_version`、`dataset_snapshot`
- 运行：`latency_ms`、`cost_usd`、`input_tokens`、`output_tokens`
- 评测：`judge_score_*`、`policy_violation`、`failure_type`

治理约束：
- 缺少 `release_unit` 字段的线上事件不得进入统计报表
- 缺少 `trace_id` 的样本不得进入回灌集
- 字段变更必须版本化（`schema_version`）

### 7.6 团队职责划分（RACI 简化）

- 平台团队：指标口径、门禁引擎、观测管道、回滚自动化
- 应用团队：Prompt/工具链迭代、黄金集维护、失败样本标注
- 安全团队：注入与越狱用例库、红线阈值、审批策略
- 业务团队：成功标准定义、关键路径验收、上线批准

### 7.7 30/60/90 天执行清单（细到验收）

30 天（先把红线立起来）：
- 统一 `trace_id` + `release_unit` 字段
- 跑通 PR Gate（`golden_core + adversarial_set`）
- 首版生产守护（延迟/错误/成本）
- 验收：出现回归时可在 30 分钟内定位到 release_unit

60 天（把回灌闭环跑起来）：
- 线上事件自动生成 regression candidates
- 建立 nightly eval + 周报（质量/成本/安全）
- 引入 canary + 自动回滚策略
- 验收：Sev-1/2 事件 24h 内入回归集达标率 >= 95%

90 天（优化到可规模化）：
- 多模型路由联动门禁（质量优先或成本优先策略）
- 评测分层（P0/P1/P2）覆盖主要业务线
- 引入多模态/Agent 复杂链路评测
- 验收：核心链路发布失败率下降，回滚时长稳定在目标阈值内

### 7.8 新增可执行资产（本次补充）

- `w5_eval_observability_capability_matrix.csv`：细颗粒能力矩阵（用于选型/RFP）
- `w5_eval_release_gate_rules.yaml`：发布门禁状态机与自动回滚规则
- `w5_eval_kpi_catalog.csv`：KPI 指标目录（口径/owner/阈值/越线动作）

## 8) P0 工程化落地包（可直接排期）

已输出：
- `w5_eval_p0_execution_board.csv`（任务看板：owner/依赖/验收）
- `w5_eval_acceptance_sql.md`（验收 SQL 模板）
- `w5_eval_rollback_runbook.md`（回滚应急操作手册）

建议使用方式：
1. 先按 `w5_eval_p0_execution_board.csv` 建 2 周冲刺
2. 每个任务以 `w5_eval_acceptance_sql.md` 对应查询做 DoD 验收
3. 上线前做一次 game day，按 `w5_eval_rollback_runbook.md` 走完整演练
