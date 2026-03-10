# W4 网关执行路线图（30/60/90）

## 目标
- 用 90 天建立“可观测、可控成本、可故障切换”的推理网关体系。
- 以 `LiteLLM + vLLM + Istio + OpenMeter + OTel` 作为默认主线，保留 `Portkey` 作为替代线。

## 30 天（P0）- 打通最小闭环
- 交付：
  - 统一入口网关（LiteLLM 或 Portkey）接入至少 3 家模型来源。  
    来源：[LiteLLM](https://github.com/BerriAI/litellm), [Portkey](https://github.com/Portkey-AI/gateway)
  - 主推理池（vLLM）上线并承接 1 条生产流量。  
    来源：[vLLM](https://github.com/vllm-project/vllm)
  - OTel 采集 + Prometheus 基础看板（延迟/错误率/吞吐）。  
    来源：[OTel Collector](https://github.com/open-telemetry/opentelemetry-collector), [Prometheus](https://github.com/prometheus/prometheus)
  - OpenMeter 完成请求计量与租户预算阈值。  
    来源：[OpenMeter](https://github.com/openmeterio/openmeter)
- KPI：
  - p95 延迟可见率 100%
  - 按租户成本统计覆盖率 >= 95%
  - 单 provider 故障演练可在 5 分钟内切流

## 60 天（P1）- 强化 SLA 与治理
- 交付：
  - Istio 启用熔断/重试/超时/故障注入策略。  
    来源：[Istio](https://github.com/istio/istio)
  - Envoy Ratelimit 接入关键租户限流策略。  
    来源：[Envoy Ratelimit](https://github.com/envoyproxy/ratelimit)
  - Langfuse（或 Helicone）接入 tracing/eval，形成质量回归面板。  
    来源：[Langfuse](https://github.com/langfuse/langfuse), [Helicone](https://github.com/Helicone/helicone)
  - 建立降级链：主模型 -> 低价模型 -> 本地 Ollama fallback。  
    来源：[LiteLLM](https://github.com/BerriAI/litellm), [Ollama](https://github.com/ollama/ollama)
- KPI：
  - 月度可用性 >= 99.9%
  - provider 故障自动恢复成功率 >= 99%
  - 单请求成本环比下降 >= 15%（同负载）

## 90 天（P2）- 组织化与规模化
- 交付：
  - 组织级策略网关（Kong/APISIX）承载统一策略模板。  
    来源：[Kong](https://github.com/Kong/kong), [APISIX](https://github.com/apache/apisix)
  - 双运行时冗余（vLLM + SGLang）和金丝雀路由。  
    来源：[vLLM](https://github.com/vllm-project/vllm), [SGLang](https://github.com/sgl-project/sglang)
  - 审计闭环：OTel + Jaeger + Grafana + 预算告警全链打通。  
    来源：[Jaeger](https://github.com/jaegertracing/jaeger), [Grafana](https://github.com/grafana/grafana)
  - 形成标准化准入：模型接入 checklist、license checklist、SLA checklist。
- KPI：
  - 多模型流量自动路由覆盖率 >= 80%
  - 预算超标请求自动阻断/降级覆盖率 >= 95%
  - SLO（p95、错误率）周达标率 >= 98%

## 评审门槛（Go/No-Go）
- `Go`：
  - 成本计量可追溯到租户/模型/请求级
  - 出现单 provider 故障时业务连续性可验证
  - 审计链路可在 10 分钟内定位根因
- `No-Go`：
  - 缺失预算硬阈值
  - 缺失自动降级链
  - 缺失 trace 级观测

## 许可证与合规提醒
- 关键组件若为 `NOASSERTION/Other`，生产前必须法务确认（例如 LiteLLM、Langfuse、TensorRT-LLM）。  
  来源：[LiteLLM API](https://api.github.com/repos/BerriAI/litellm), [Langfuse API](https://api.github.com/repos/langfuse/langfuse), [TensorRT-LLM API](https://api.github.com/repos/NVIDIA/TensorRT-LLM)
