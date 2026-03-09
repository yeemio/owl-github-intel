# W4 Gateway Incident Runbook（值班执行版）

## 0. 适用范围
- 适用于 AI Gateway 生产事故：可用性下降、时延激增、成本异常、provider 故障、模型发布回滚。
- 角色：IC（Incident Commander）、SRE、平台工程、ML 平台、业务值班。

## 1. 统一分级
- `SEV-1`：核心流量不可用或数据/计费风险重大。
- `SEV-2`：核心功能退化，可降级维持服务。
- `SEV-3`：局部异常，不影响核心 SLA。

## 2. 通用处置骨架（任何事故先走）
1. 事故建群，指定 IC，冻结非修复发布。
2. 锁定时间窗（起始时间、变化点、影响租户）。
3. 拉取统一面板：错误率、p95、成本、provider 健康。
4. 执行对应分支 runbook（见下）。
5. 30 分钟内给出第一次 ETA 与临时缓解。
6. 恢复后 24h 内提交复盘与防再发动作。

---

## 3. 分支 A：Provider 故障 / 5xx 激增

### 触发条件
- 单 provider 5xx > 5% 持续 5 分钟，或自动熔断频繁触发。

### 快速诊断
- 检查 gateway 路由命中分布是否异常集中。
- 检查 mesh outlier ejection 是否生效。
- 检查 fallback 链是否可用（备用 provider 配额是否足够）。

### 即时动作
1. 将故障 provider 权重降为 0（或从路由池摘除）。
2. 强制 fallback 到次优 provider/model。
3. 若总体延迟超阈，触发功能降级（关闭非关键扩展能力）。
4. 通知业务方“降级模式已启用”。

### 恢复判据
- 连续 15 分钟错误率恢复至基线范围。
- failover success >= 99%。

参考：
- [LiteLLM Fallbacks](https://docs.litellm.ai/docs/proxy/reliability)
- [Istio Circuit Breaking](https://istio.io/latest/docs/tasks/traffic-management/circuit-breaking/)

---

## 4. 分支 B：成本异常（预算突刺）

### 触发条件
- 10 分钟成本速率 > 日均 2 倍，或租户预算超过 95%。

### 快速诊断
- 拆分维度：tenant/model/provider/path。
- 识别是否由重试风暴、缓存失效、路由偏移导致。
- 比对 gateway 账单与计量账本偏差。

### 即时动作
1. 启用硬预算保护（超预算直接拒绝或降级）。
2. 路由偏向低成本模型（同能力等级下）。
3. 降低最大上下文长度与并发上限。
4. 开启高成本路径限流。

### 恢复判据
- 成本速率回归基线 120% 以内。
- 预算漂移（gateway vs ledger）<= 1%。

参考：
- [LiteLLM Budgets/Rate Limits](https://docs.litellm.ai/docs/proxy/users)
- [OpenMeter Entitlements](https://openmeter.io/docs/billing/entitlements/overview)

---

## 5. 分支 C：延迟突刺（p95/p99 上升）

### 触发条件
- p95 > SLO 阈值 20% 且持续 10 分钟。

### 快速诊断
- 判断瓶颈层：网关、mesh、推理运行时、下游 provider。
- 查看请求排队长度、并发、超时与重试分布。
- 验证 autoscaling 是否启动与生效延迟。

### 即时动作
1. 临时减少长上下文请求比例（策略路由）。
2. 提高 runtime 池副本（KEDA/HPA）并观察排队长度。
3. 调整超时与重试，避免重试放大效应。
4. 必要时启动低延迟模型降级路径。

### 恢复判据
- p95 恢复至阈值内并稳定 30 分钟。

参考：
- [KEDA Scaling](https://keda.sh/docs/latest/concepts/scaling-deployments/)
- [vLLM Docs](https://docs.vllm.ai/)
- [SGLang Docs](https://docs.sglang.ai/)

---

## 6. 分支 D：模型发布后质量或稳定性回退

### 触发条件
- canary 期间错误率/延迟/成本任一超门禁阈值。

### 即时动作
1. 停止发布推进，维持当前 canary 比例。
2. 若超阈明显，立即回滚到 `PreviousRolledoutRevision`。
3. 标记该 revision 为 blocked，禁止自动重试上线。
4. 拉取前后版本差异与指标对比。

### 恢复判据
- 回滚后核心 SLI 回归基线，且 30 分钟稳定。

参考：
- [KServe Canary Rollout](https://kserve.github.io/website/latest/modelserving/v1beta1/rollout/canary/)

---

## 7. 分支 E：审计链路缺失（Trace/ID 断裂）

### 触发条件
- requests_with_trace_id < 99%，或关键请求无法链路追踪。

### 即时动作
1. 强制检查并恢复 `request_id` 注入中间件。
2. 检查 traceparent 透传配置与采样策略。
3. 暂时提高采样率，保障事故窗口可追溯。

### 恢复判据
- 关键路径 trace 覆盖 >= 99%，抽样核验通过。

参考：
- [LiteLLM Logging + Traceparent](https://docs.litellm.ai/docs/proxy/logging)
- [Langfuse Docs](https://langfuse.com/docs)

---

## 8. 事故沟通模板（可直接复制）

### 首报（10 分钟内）
- 时间：`<UTC+8 hh:mm>`
- 级别：`SEV-x`
- 影响：`<租户/接口/区域>`
- 当前症状：`<错误率/延迟/成本>`
- 已执行动作：`<摘流/降级/回滚>`
- 下一次更新：`<+15min>`

### 进展更新（每 15 分钟）
- 关键指标变化：`<error,p95,cost>`
- 新发现：`<根因线索>`
- 新动作：`<执行项>`
- 预计恢复：`<ETA>`

### 恢复通告
- 恢复时间：`<UTC+8 hh:mm>`
- 恢复措施：`<动作摘要>`
- 影响范围：`<最终统计>`
- 后续：`<复盘时间 + 永久修复计划>`

---

## 9. 演练计划（强制）
- 每月 2 次固定演练：
  1) provider 故障切换演练
  2) 成本突刺与预算硬阈值演练
- 产出物：
  - 演练记录（步骤、截图、指标）
  - MTTR 与失败步骤清单
  - 下月整改任务（负责人 + 截止日期）

---

## 10. 最低工具链要求（值班可用）
- 指标：Prometheus + Grafana
- 链路：OTel/Jaeger（或等效）
- 网关审计：LiteLLM/Portkey 请求日志
- 计量：OpenMeter（或等效账本）

参考：
- [Prometheus](https://github.com/prometheus/prometheus)
- [Grafana](https://github.com/grafana/grafana)
- [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector)
- [Jaeger](https://github.com/jaegertracing/jaeger)
- [OpenMeter Docs](https://openmeter.io/docs)
