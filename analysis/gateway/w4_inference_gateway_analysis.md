# W4 Inference Gateway 深度图谱与治理分析

## 扫描结论（40+ 项）
- 本轮共扫描 `44` 个相关项目（CSV 内收录 `43` 行可执行资产；剔除 fork 重复）。覆盖 AI 网关、API 网关、服务网格、限流熔断、推理运行时、可观测、计量计费与自动扩缩容。来源：`w4_inference_gateway_map.csv` 中全部条目及其 URL。
- 你要求的“网关、路由、负载均衡、故障切换”四类能力已覆盖：
  - 网关：LiteLLM/Portkey/Kong/APISIX/KGateway。来源：[LiteLLM](https://github.com/BerriAI/litellm), [Portkey](https://github.com/Portkey-AI/gateway), [Kong](https://github.com/Kong/kong), [APISIX](https://github.com/apache/apisix), [KGateway](https://github.com/kgateway-dev/kgateway)
  - 路由：Portkey 多模型路由、Istio request routing、K8s ingress/gateway 规则。来源：[Portkey](https://github.com/Portkey-AI/gateway), [Istio](https://github.com/istio/istio), [ingress-nginx](https://github.com/kubernetes/ingress-nginx), [NGINX Gateway Fabric](https://github.com/nginx/nginx-gateway-fabric)
  - 负载均衡：LiteLLM、Traefik、NGINX、HAProxy、Cilium。来源：[LiteLLM](https://github.com/BerriAI/litellm), [Traefik](https://github.com/traefik/traefik), [NGINX](https://github.com/nginx/nginx), [HAProxy](https://github.com/haproxy/haproxy), [Cilium](https://github.com/cilium/cilium)
  - 故障切换/弹性：Istio（circuit/fault injection）、Resilience4j/Polly/Failsafe/Gobreaker。来源：[Istio](https://github.com/istio/istio), [Resilience4j](https://github.com/resilience4j/resilience4j), [Polly](https://github.com/App-vNext/Polly), [Failsafe](https://github.com/failsafe-lib/failsafe), [Gobreaker](https://github.com/sony/gobreaker)

## 五维对比（吞吐 / 成本治理 / 多模型策略 / SLA / 可观测）
| 架构层 | 代表项目 | 吞吐 | 成本治理 | 多模型策略 | SLA 保障 | 可观测性 | 结论 |
|---|---|---|---|---|---|---|---|
| AI 网关层 | LiteLLM, Portkey | 高 | 高（LiteLLM cost tracking） | 高（100+/200+ providers） | 中高（路由+回退） | 中高（logging） | 适合作为统一入口与策略执行面 |
| API 网关层 | Kong, APISIX, KGateway | 高 | 中 | 中 | 高 | 高（生态成熟） | 适合承载组织级策略与插件化治理 |
| 数据平面代理 | Envoy, NGINX, HAProxy, Traefik | 很高 | 低-中 | 低 | 高 | 中 | 负责极致吞吐与稳定转发，不负责业务级成本策略 |
| Mesh/弹性层 | Istio, Linkerd | 高 | 中（策略化） | 低 | 很高（熔断/故障注入/路由） | 高 | SLA 关键层，建议与网关解耦部署 |
| 推理运行时层 | vLLM, SGLang, TGI, TensorRT-LLM | 很高 | 中（效率驱动） | 中 | 中 | 中 | 决定单位 token 成本和延迟上限 |
| 可观测与评估层 | Langfuse, Helicone, OpenLIT, Phoenix, OTel, Prometheus, Jaeger, Grafana | 低（控制面） | 中-高（LLM cost/usage） | 低 | 中（告警与回溯） | 很高 | 生产治理闭环不可缺 |
| 计量与预算层 | OpenMeter | 低（控制面） | 很高 | 低 | 中 | 中 | 预算、配额、计费中枢 |

来源：
- [LiteLLM](https://github.com/BerriAI/litellm), [Portkey](https://github.com/Portkey-AI/gateway), [Kong](https://github.com/Kong/kong), [APISIX](https://github.com/apache/apisix), [Envoy](https://github.com/envoyproxy/envoy), [Istio](https://github.com/istio/istio)
- [vLLM](https://github.com/vllm-project/vllm), [SGLang](https://github.com/sgl-project/sglang), [TGI](https://github.com/huggingface/text-generation-inference), [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM)
- [Langfuse](https://github.com/langfuse/langfuse), [Helicone](https://github.com/Helicone/helicone), [OpenLIT](https://github.com/openlit/openlit), [Arize Phoenix](https://github.com/Arize-ai/phoenix), [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector), [Prometheus](https://github.com/prometheus/prometheus), [Jaeger](https://github.com/jaegertracing/jaeger), [Grafana](https://github.com/grafana/grafana), [OpenMeter](https://github.com/openmeterio/openmeter)

## 网关治理能力清单（可直接落地）

### 1) 预算（Budget）
- `P0` 必备：按租户/应用/模型建立 token 与费用预算阈值，超阈值触发降级模型。来源：[LiteLLM](https://github.com/BerriAI/litellm), [OpenMeter](https://github.com/openmeterio/openmeter), [Helicone](https://github.com/Helicone/helicone)
- `P1` 进阶：引入实时 usage 计量 + chargeback，支撑 FinOps 看板。来源：[OpenMeter](https://github.com/openmeterio/openmeter), [Grafana](https://github.com/grafana/grafana)

### 2) 路由（Routing）
- `P0` 必备：基于模型能力、区域、延迟、错误率做策略路由（主路由+备路由）。来源：[Portkey](https://github.com/Portkey-AI/gateway), [LiteLLM](https://github.com/BerriAI/litellm), [Istio](https://github.com/istio/istio)
- `P1` 进阶：引入网关层与服务网格层双层路由（北向 provider 路由 + 南向服务路由）。来源：[Kong](https://github.com/Kong/kong), [APISIX](https://github.com/apache/apisix), [Istio](https://github.com/istio/istio)

### 3) 降级（Degradation）
- `P0` 必备：模型降档（SOTA -> 低价模型 -> 本地模型）与功能降级（关闭工具调用、缩短上下文）。来源：[LiteLLM](https://github.com/BerriAI/litellm), [ollama/ollama](https://github.com/ollama/ollama)
- `P1` 进阶：过载时自动触发排队、限流、优先级队列。来源：[envoyproxy/ratelimit](https://github.com/envoyproxy/ratelimit), [kedacore/keda](https://github.com/kedacore/keda)

### 4) 熔断（Circuit Breaker）
- `P0` 必备：按 provider 和模型维度配置熔断、重试、超时、隔舱（bulkhead）。来源：[Istio](https://github.com/istio/istio), [resilience4j](https://github.com/resilience4j/resilience4j), [App-vNext/Polly](https://github.com/App-vNext/Polly)
- `P1` 进阶：熔断状态进入路由决策（开路自动摘除、半开灰度恢复）。来源：[resilience4j](https://github.com/resilience4j/resilience4j), [failsafe](https://github.com/failsafe-lib/failsafe), [gobreaker](https://github.com/sony/gobreaker)

### 5) 审计（Audit）
- `P0` 必备：请求链路唯一 ID、Prompt/Model/Provider/Cost/Latency/Error 全量记录。来源：[LiteLLM](https://github.com/BerriAI/litellm), [Langfuse](https://github.com/langfuse/langfuse), [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector)
- `P1` 进阶：Trace + Metrics + Logs 三位一体（OTel + Prometheus + Jaeger/Grafana），满足事后审计与SLA归因。来源：[Prometheus](https://github.com/prometheus/prometheus), [Jaeger](https://github.com/jaegertracing/jaeger), [Grafana](https://github.com/grafana/grafana)

## 风险与注意事项
- 许可证风险：若核心组件为 `NOASSERTION/Other`，生产落地前需法务审查（如 LiteLLM、Langfuse、Seldon、TensorRT-LLM）。来源：[LiteLLM](https://github.com/BerriAI/litellm), [Langfuse](https://github.com/langfuse/langfuse), [Seldon Core](https://github.com/SeldonIO/seldon-core), [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM)
- 生态波动风险：高活跃项目（高 issue + 高频 push）需适配层与兼容测试矩阵。来源：[vLLM](https://github.com/vllm-project/vllm), [SGLang](https://github.com/sgl-project/sglang), [Ray](https://github.com/ray-project/ray)
- 成本错配风险：只做“路由”不做“预算+计量”会导致成本不可控。来源：[OpenMeter](https://github.com/openmeterio/openmeter), [Helicone](https://github.com/Helicone/helicone)

## 建议的最小可行网关治理架构（MVP）
- 入口：`LiteLLM/Portkey + Kong/APISIX`（多模型入口 + 组织策略层）。
- 弹性：`Istio + Envoy Ratelimit + Resilience 策略`（重试/熔断/限流/降级）。
- 推理：`vLLM/SGLang/TGI` 主力，`Ollama` 作为本地兜底。
- 观测：`OTel Collector + Prometheus + Jaeger + Grafana + Langfuse/Helicone`。
- 预算：`OpenMeter` 统一 usage metering 与配额计费。

来源：
[LiteLLM](https://github.com/BerriAI/litellm), [Portkey](https://github.com/Portkey-AI/gateway), [Kong](https://github.com/Kong/kong), [APISIX](https://github.com/apache/apisix), [Istio](https://github.com/istio/istio), [envoyproxy/ratelimit](https://github.com/envoyproxy/ratelimit), [vLLM](https://github.com/vllm-project/vllm), [SGLang](https://github.com/sgl-project/sglang), [TGI](https://github.com/huggingface/text-generation-inference), [Ollama](https://github.com/ollama/ollama), [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector), [Prometheus](https://github.com/prometheus/prometheus), [Jaeger](https://github.com/jaegertracing/jaeger), [Grafana](https://github.com/grafana/grafana), [Langfuse](https://github.com/langfuse/langfuse), [Helicone](https://github.com/Helicone/helicone), [OpenMeter](https://github.com/openmeterio/openmeter)
