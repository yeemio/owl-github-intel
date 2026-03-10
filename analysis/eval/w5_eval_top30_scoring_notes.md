# W5 Top30 Scoring Notes (Audit Trail)

日期：2026-03-09  
对应文件：`w5_eval_observability_top30.csv`

## 评分口径（统一）

- `closure_fit_5`
  - 5：覆盖 dev eval + online obs + rollback/feed-back loop 三环
  - 4：覆盖两环并可通过外部组件补齐第三环
  - 3：单环强能力，但闭环依赖多个外部系统
- `freshness_5`
  - 5：近 7 天活跃
  - 4：近 30 天活跃
  - 3：近 180 天活跃
  - 2：近 365 天活跃
- `adoption_5`
  - 5：超大规模采用（头部 stars）
  - 4：高采用（万级或接近万级）
  - 3：中等采用
- `license_safety_5`
  - 5：MIT/Apache-2.0
  - 3：LGPL-3.0（需评估链接与分发边界）
  - 2：CC-BY-4.0（需评估归属与内容使用）
  - 1：NOASSERTION/Other（法务必审）

## Top 10 逐项说明

1) `mlflow/mlflow`（20）
- 闭环：实验追踪 + 评测 + 线上观测可拼闭环
- 活跃：近 7 天活跃
- 采用：头部生态
- 许可证：Apache-2.0
- 来源：https://api.github.com/repos/mlflow/mlflow

2) `comet-ml/opik`（19）
- 闭环：评测与观测均强，发布门禁可外接 CI
- 活跃：近 7 天活跃
- 采用：高采用
- 许可证：Apache-2.0
- 来源：https://api.github.com/repos/comet-ml/opik

3) `langchain-ai/langgraph`（19）
- 闭环：作为 runtime 承载评测点与回滚钩子
- 活跃：近 7 天活跃
- 采用：高采用
- 许可证：MIT
- 来源：https://api.github.com/repos/langchain-ai/langgraph

4) `promptfoo/promptfoo`（18）
- 闭环：强在 PR 门禁与安全评测，线上观测需搭配平台
- 活跃：近 7 天活跃
- 采用：高采用
- 许可证：MIT
- 来源：https://api.github.com/repos/promptfoo/promptfoo

5) `confident-ai/deepeval`（18）
- 闭环：离线评测覆盖高，线上需接观测系统
- 活跃：近 7 天活跃
- 采用：高采用
- 许可证：Apache-2.0
- 来源：https://api.github.com/repos/confident-ai/deepeval

6) `openlit/openlit`（18）
- 闭环：OTel 导向，线上观测强，离线需补评测框架
- 活跃：近 7 天活跃
- 采用：中等采用
- 许可证：Apache-2.0
- 来源：https://api.github.com/repos/openlit/openlit

7) `microsoft/promptflow`（18）
- 闭环：Prompt 生命周期和发布流程适配度高
- 活跃：近 14 天活跃
- 采用：高采用
- 许可证：MIT
- 来源：https://api.github.com/repos/microsoft/promptflow

8) `guardrails-ai/guardrails`（18）
- 闭环：安全红线能力强，需外接观测与离线评测
- 活跃：近 7 天活跃
- 采用：高采用
- 许可证：Apache-2.0
- 来源：https://api.github.com/repos/guardrails-ai/guardrails

9) `coze-dev/coze-loop`（18）
- 闭环：官方定位即开发-调试-评测-监控闭环
- 活跃：近 7 天活跃
- 采用：中高采用
- 许可证：Apache-2.0
- 来源：https://api.github.com/repos/coze-dev/coze-loop

10) `google/adk-python`（18）
- 闭环：agent toolkit + eval workflow，生产观测需补监控层
- 活跃：近 7 天活跃
- 采用：高采用
- 许可证：Apache-2.0
- 来源：https://api.github.com/repos/google/adk-python

## 许可证风险特别标注（Top30 内）

- `NOASSERTION/Other`：`langfuse/langfuse`、`Arize-ai/phoenix`、`Agenta-AI/agenta`、`BerriAI/litellm`、`NVIDIA-NeMo/Guardrails`、`openai/evals`、`langwatch/langwatch`
- 建议：进入采购/商用前执行法务审查清单（分发方式、SaaS 条款、二次开发条款、商标与品牌使用）
