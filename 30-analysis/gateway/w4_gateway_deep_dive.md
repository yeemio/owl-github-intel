# W4 推理网关深潜版（控制项级）

## 你说的“细致深入”具体化
这版把“网关治理”拆成 12 个可审计控制项，并逐项映射到组件能力与证据：

1) 预算阈值  
2) 配额/限流  
3) 路由策略  
4) 故障切换  
5) 负载均衡  
6) 熔断  
7) 重试/超时  
8) 审计字段  
9) 可观测  
10) 金丝雀发布  
11) 自动扩缩容  
12) 合规与许可证风险

控制项明细矩阵见：`w4_gateway_capability_evidence.csv`

---

## 控制项深度结论（按落地优先级）

### P0-1 预算与配额（必须先做）
- `LiteLLM` 已具备 key/team/user 预算、预算周期、RPM/TPM 限制，且支持超预算拒绝。  
  来源：[Budgets, Rate Limits](https://docs.litellm.ai/docs/proxy/users), [Virtual Keys](https://docs.litellm.ai/docs/proxy/virtual_keys)
- `OpenMeter` 可提供客户级 entitlement/limit 与 usage enforcement 语义，适合作为“计量权威层”。  
  来源：[Entitlements Overview](https://openmeter.io/docs/billing/entitlements/overview), [Metered Entitlements](https://openmeter.io/docs/billing/entitlements/entitlement#metered-entitlements)
- 结论：**预算治理要双层**（网关实时限流 + 计量系统账本），只做一层会失真。

### P0-2 路由、故障切换、重试超时（SLA核心）
- `LiteLLM` 明确提供 routing strategy、priority ordering、fallbacks、retries、timeouts、cooldown。  
  来源：[Load Balancing](https://docs.litellm.ai/docs/proxy/load_balancing), [Fallbacks](https://docs.litellm.ai/docs/proxy/reliability)
- `Portkey` 文档明确支持 conditional routing、fallbacks、automatic retries、request timeouts、load balancing。  
  来源：[AI Gateway Features](https://portkey.ai/features/ai-gateway), [Configs](https://portkey.ai/docs/product/ai-gateway/configs)
- `Istio + Envoy` 提供更底层的 circuit-breaking/outlier-ejection，适合网关下沉保护。  
  来源：[Istio Circuit Breaking](https://istio.io/latest/docs/tasks/traffic-management/circuit-breaking/), [Envoy Outlier Detection](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/outlier)
- 结论：**上层网关做 provider/model 路由，下层 mesh 做连接级弹性**，才能稳定达成 99.9+。

### P0-3 审计与可观测（上线门槛）
- `LiteLLM` 有 `x-litellm-call-id`、成本 header、标准日志对象、OTel/Langfuse callback。  
  来源：[Logging](https://docs.litellm.ai/docs/proxy/logging)
- `Langfuse` 提供 traces/sessions/evals 与用户维度成本延迟质量分析。  
  来源：[Langfuse Docs](https://langfuse.com/docs)
- `OTel + Prometheus + Grafana + Jaeger` 构成中立可迁移观测底座。  
  来源：[OTel Collector](https://github.com/open-telemetry/opentelemetry-collector), [Prometheus](https://github.com/prometheus/prometheus), [Grafana](https://github.com/grafana/grafana), [Jaeger](https://github.com/jaegertracing/jaeger)
- 结论：**没有 trace_id 贯穿 + 成本归因 + SLO 告警，不能算生产可控**。

### P1 金丝雀与扩缩容（规模化必需）
- `KServe` 支持 canaryTrafficPercent 与自动回滚到上一健康 revision。  
  来源：[KServe Canary](https://kserve.github.io/website/latest/modelserving/v1beta1/rollout/canary/)
- `KEDA` 提供事件驱动扩缩容与 scale-to-zero，补齐突发流量弹性。  
  来源：[KEDA Scaling Deployments](https://keda.sh/docs/latest/concepts/scaling-deployments/)
- 结论：**把“模型发布风险”与“流量风险”拆开治理**（canary 控版本，KEDA 控容量）。

---

## 深度缺口（你现在最该补的）

1. **预算闭环缺口**：若只有网关日志、没有 entitlement/账本，成本只能“看见”，无法“约束”。  
   - 动作：`LiteLLM budget/rate` + `OpenMeter entitlement` 双轨落地。

2. **弹性分层缺口**：只在网关做 fallback，遇到底层连接抖动会失效。  
   - 动作：引入 `Istio/Envoy` 的 outlier/circuit 层。

3. **审计字段缺口**：不少团队只打应用日志，缺少统一 call_id / traceparent 贯穿。  
   - 动作：统一 header 标准，强制写入 `request_id, tenant_id, model, provider, cost, latency, error`.

4. **发布风险缺口**：模型切换常直接全量，缺少 canary 百分比与自动回滚。  
   - 动作：用 `KServe canaryTrafficPercent` 建发布闸门。

5. **合规缺口**：关键项目存在 `NOASSERTION/Other` 许可证元数据，商用前需法务闭环。  
   - 动作：建立“许可证白名单 + 替代栈”策略（如 Langfuse/LiteLLM 预置替代方案）。

---

## 建议的“控制面/数据面”分层（最终形态）

- **控制面（治理）**：`LiteLLM/Portkey + OpenMeter + Langfuse + OTel`
- **数据面（转发/弹性）**：`Envoy/Istio + vLLM/SGLang`
- **发布与容量**：`KServe Canary + KEDA`

这套分层的关键不是“选一个最好项目”，而是把能力切到正确边界：  
预算在治理层、弹性在数据层、观测贯穿全链路。

---

## 下一步我建议直接做的（可继续让我执行）

如果你同意，我下一步直接给你三份更硬的落地文件（不再泛泛）：
1) `w4_gateway_control_checklist.csv`：逐控制项验收清单（是否达标、证据链接、负责人）  
2) `w4_gateway_slo_policy.md`：SLO/SLA 策略模板（延迟、错误率、预算、降级触发）  
3) `w4_gateway_runbook.md`：故障演练 Runbook（provider 故障、成本异常、延迟突刺、回滚流程）
