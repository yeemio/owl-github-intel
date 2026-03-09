# W4 Gateway SLO/SLA Policy（执行版）

## 1. 范围与对象
- 范围：AI Gateway 请求链路（gateway -> router -> inference runtime -> response）。
- 对象：生产租户流量（不含内部压测、回放流量）。
- 目标：在保障成本上限的同时，稳定达成可用性和时延目标。

## 2. SLI 定义（统一口径）
- `Availability SLI` = `1 - (5xx_responses / total_requests)`，按 5 分钟窗口计算。
- `Latency SLI` = `p95 end_to_end_latency_ms`，按租户、模型、provider 维度分桶。
- `Budget SLI` = `actual_spend / planned_spend`，按日/月双周期。
- `Failover SLI` = `auto_failover_success / failover_triggered_total`。
- `Observability SLI` = `requests_with_trace_id / total_requests`。

参考：
- [LiteLLM Logging](https://docs.litellm.ai/docs/proxy/logging)
- [OpenMeter Entitlements](https://openmeter.io/docs/billing/entitlements/overview)
- [Langfuse Overview](https://langfuse.com/docs)

## 3. SLO 目标（分级）

### P0 基线（上线门槛）
- `Availability`: >= 99.9%（rolling 30d）
- `Latency p95`: <= 2500ms（文本对话主路径）
- `Failover Success`: >= 99%
- `Trace Coverage`: >= 99%
- `Budget Drift`（网关 vs 账本）: <= 1%

### P1 强化（规模期）
- `Availability`: >= 99.95%
- `Latency p95`: <= 1800ms
- `Failover Success`: >= 99.5%
- `Trace Coverage`: >= 99.5%
- `Budget Overrun Incidents`: 0（每月）

## 4. Error Budget 与动作
- 月度错误预算（99.9）约 43.2 分钟不可用时间。
- 预算消耗策略：
  - 消耗 > 25%：冻结非必要发布，开启加密度监控。
  - 消耗 > 50%：仅允许修复性变更（no feature release）。
  - 消耗 > 75%：进入事故战备，强制降级策略开启。
  - 消耗 > 100%：触发 SRE/平台联合复盘与整改。

## 5. 预算治理策略（Budget Policy）
- 每租户默认硬预算 + 软预算（告警阈值）：
  - 软预算：80%
  - 硬预算：100%
- 预算触发动作：
  1. 80%：告警 + 路由偏向低成本模型
  2. 95%：关闭高成本可选功能（如高上下文长度）
  3. 100%：拒绝或降级到兜底模型

参考：
- [LiteLLM Budgets/Rate Limits](https://docs.litellm.ai/docs/proxy/users)
- [OpenMeter Metered Entitlements](https://openmeter.io/docs/billing/entitlements/entitlement#metered-entitlements)

## 6. 路由与降级策略（Routing/Degrade）
- 正常态：按 `latency + cost + capability` 策略路由。
- 故障态：
  - provider unhealthy -> fallback provider
  - context overflow -> long-context model fallback
  - policy violation -> compliant model fallback
- 降级优先顺序：
  - 模型降档（SOTA -> mid-tier -> low-cost）
  - 功能降级（工具调用关停、上下文缩短）
  - 本地兜底（必要时）

参考：
- [LiteLLM Load Balancing](https://docs.litellm.ai/docs/proxy/load_balancing)
- [LiteLLM Fallbacks](https://docs.litellm.ai/docs/proxy/reliability)
- [Portkey AI Gateway](https://portkey.ai/features/ai-gateway)

## 7. 熔断与重试策略（SLA Protection）
- 网关层：
  - `num_retries` 按路径配置，禁止对非幂等操作自动重试。
  - `request_timeout` 明确分级（实时/同步/异步）。
- Mesh/Proxy 层：
  - 启用 outlier detection + ejection。
  - 启用 circuit breaker 阈值与恢复窗口。

参考：
- [Istio Circuit Breaking](https://istio.io/latest/docs/tasks/traffic-management/circuit-breaking/)
- [Envoy Outlier Detection](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/outlier)

## 8. 可观测与审计最小要求
- 每请求强制字段：
  - `request_id`, `tenant_id`, `model`, `provider`, `latency_ms`, `cost`, `status_code`, `error_type`
- 必须可关联：
  - 网关日志 <-> trace <-> 计量账本
- 数据保留：
  - 审计日志 >= 90 天
  - 指标 >= 30 天
  - 关键事故 trace >= 180 天

## 9. 发布门禁（Release Gates）
- 模型/网关变更发布前必须满足：
  - 回归压测：p95 不退化 > 10%
  - 成本评估：单位请求成本不升高 > 15%（无批准不可发布）
  - canary 门禁：10% -> 25% -> 50% -> 100%，每级观测通过才晋级

参考：
- [KServe Canary Rollout](https://kserve.github.io/website/latest/modelserving/v1beta1/rollout/canary/)

## 10. 合规门禁
- 若依赖组件许可证为 `NOASSERTION/Other`，进入“法务阻塞队列”：
  - 未通过审查，不可进生产。
- 例外审批需记录风险接受单号与过期时间。

参考：
- [LiteLLM API License Metadata](https://api.github.com/repos/BerriAI/litellm)
- [Langfuse API License Metadata](https://api.github.com/repos/langfuse/langfuse)
