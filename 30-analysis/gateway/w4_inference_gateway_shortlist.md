# W4 网关选型 Shortlist（Top 10）

## 结果定位
- 目标：从现有 `43` 项图谱中，筛出“可立即推进”的前 10 组件组合。
- 适用：OwlClaw 类 Agent 基础设施，需要兼顾吞吐、成本治理、多模型策略、SLA 与可观测。
- 数据基础：`w4_inference_gateway_map.csv` 与公开仓库页面/API。

## Top 10（按落地先后）
1. **LiteLLM**（AI Gateway）  
   - 用途：统一入口、多模型路由、成本跟踪。  
   - 价值：最快形成“一个 API 对接多家模型”的控制面。  
   - 来源：[https://github.com/BerriAI/litellm](https://github.com/BerriAI/litellm)

2. **Istio**（流量弹性层）  
   - 用途：熔断、故障注入、请求路由、服务级 SLA 保障。  
   - 价值：把“可用性问题”从业务代码前移到流量层治理。  
   - 来源：[https://github.com/istio/istio](https://github.com/istio/istio)

3. **vLLM**（主力推理运行时）  
   - 用途：高吞吐模型服务池。  
   - 价值：显著提升吞吐/延迟上限，控制单位推理成本。  
   - 来源：[https://github.com/vllm-project/vllm](https://github.com/vllm-project/vllm)

4. **OpenMeter**（预算与计量）  
   - 用途：usage metering、配额、计费与 chargeback。  
   - 价值：把“成本治理”从报表变成在线控制。  
   - 来源：[https://github.com/openmeterio/openmeter](https://github.com/openmeterio/openmeter)

5. **OpenTelemetry Collector**（观测底座）  
   - 用途：统一采集 traces/metrics/logs。  
   - 价值：避免可观测绑定单厂商，支撑审计闭环。  
   - 来源：[https://github.com/open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector)

6. **Langfuse**（LLM 可观测与评测）  
   - 用途：Tracing、Evals、Prompt 管理。  
   - 价值：支撑质量回归、线上问题归因与提示词治理。  
   - 来源：[https://github.com/langfuse/langfuse](https://github.com/langfuse/langfuse)

7. **Envoy Ratelimit**（限流配额）  
   - 用途：全局限流与配额控制。  
   - 价值：预算和 SLA 的第一道防线。  
   - 来源：[https://github.com/envoyproxy/ratelimit](https://github.com/envoyproxy/ratelimit)

8. **Kong**（组织级策略网关）  
   - 用途：插件化策略、组织级入口治理。  
   - 价值：适合多团队共用网关与统一政策。  
   - 来源：[https://github.com/Kong/kong](https://github.com/Kong/kong)

9. **SGLang**（备选推理池）  
   - 用途：作为 vLLM 之外的第二推理后端。  
   - 价值：提升多运行时冗余与故障切换能力。  
   - 来源：[https://github.com/sgl-project/sglang](https://github.com/sgl-project/sglang)

10. **Ollama**（本地兜底）  
    - 用途：离线/私有/开发环境 fallback。  
    - 价值：外部 provider 异常时维持基本服务能力。  
    - 来源：[https://github.com/ollama/ollama](https://github.com/ollama/ollama)

## 推荐组合（直接可执行）
- **P0（先搭可运行闭环）**：`LiteLLM + vLLM + Istio + OpenMeter + OTel Collector`
- **P1（补齐生产治理）**：`Langfuse + Envoy Ratelimit + Kong`
- **P2（增强冗余与容灾）**：`SGLang + Ollama`

## 三条硬规则
- **预算先行**：没有 `OpenMeter` 类能力，路由再好也会成本失控。来源：[https://github.com/openmeterio/openmeter](https://github.com/openmeterio/openmeter)
- **弹性前置**：没有 `Istio/Resilience`，故障切换只能靠人工介入。来源：[https://github.com/istio/istio](https://github.com/istio/istio)
- **可观测闭环**：没有 `OTel + Tracing/Evals`，SLA 无法持续优化。来源：[https://github.com/open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector), [https://github.com/langfuse/langfuse](https://github.com/langfuse/langfuse)

## 许可证提醒（上线前）
- API 元数据显示部分关键项目为 `NOASSERTION/Other`（如 LiteLLM、Langfuse），生产前需要法务确认。  
- 来源：[https://api.github.com/repos/BerriAI/litellm](https://api.github.com/repos/BerriAI/litellm), [https://api.github.com/repos/langfuse/langfuse](https://api.github.com/repos/langfuse/langfuse)
