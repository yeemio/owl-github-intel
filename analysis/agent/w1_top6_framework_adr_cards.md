# W1 Top6 Framework ADR Cards (Production Drill-Down)

日期：2026-03-09  
目的：把“框架对比”落到可决策、可执行、可放弃（exit-ready）的工程卡片。  
适用：OwlClaw 编排基础设施 PoC 与评审会。

---

## ADR-01: LangGraph as Durable Orchestrator Candidate

**Status**: Proposed (P0)  
**Decision Type**: Primary orchestrator contender  

### Why now
- README 把 durable execution / HITL / memory / debugging 放在核心价值位，和 OwlClaw 目标高度一致。  
- release 持续活跃，主干更新频率高。  

### Scope boundary (must)
- 只负责：工作流编排、状态推进、失败恢复、人工中断点。  
- 不负责：模型供应商耦合、工具协议定义、观测存储后端。  

### Integration cost (estimate)
- 工程接入：中（7/10）  
- 学习曲线：中（6/10）  
- 生产配套：中高（8/10，需配套观测与治理）  

### Migration risk
- 与 LangChain 生态边界不清时，容易出现组件层级耦合。  
- 图状态模型一旦深入业务逻辑，迁移成本上升。  

### Exit condition (drop criteria)
- 10天 PoC 后若“恢复成功率 < 95%”或“人工接管恢复 > 2 次人工干预/任务”则降级为备选。  

### 3 mandatory failure-injection tests
1. **Node crash resume**：执行中途 kill worker，检查是否从 checkpoint 恢复。  
2. **Tool timeout storm**：高并发工具超时，验证重试/回滚一致性。  
3. **HITL pause expiry**：人工迟迟不处理时，验证超时策略与补偿路径。  

### Sources
- https://raw.githubusercontent.com/langchain-ai/langgraph/main/README.md
- https://api.github.com/repos/langchain-ai/langgraph
- https://api.github.com/repos/langchain-ai/langgraph/releases?per_page=3

---

## ADR-02: OpenAI Agents SDK as Lightweight Runtime Candidate

**Status**: Proposed (P0)  
**Decision Type**: Co-primary orchestrator contender

### Why now
- Agents/Handoffs/Sessions/HITL/Tracing 一体化，适合快速迭代与低样板接入。  
- 近期 release 密集，功能演进快。  

### Scope boundary (must)
- 只负责：agent runtime、handoff 编排、session 上下文。  
- 不负责：工具协议标准化（必须通过 MCP 适配层）、观测平台替代。  

### Integration cost (estimate)
- 工程接入：低中（5/10）  
- 学习曲线：低（4/10）  
- 生产配套：中（6/10）  

### Migration risk
- 虽声明 provider-agnostic，但若直接绑定特定 provider 特性会加剧后续迁移成本。  

### Exit condition (drop criteria)
- 若多Agent任务中 handoff 失败率 > 3% 或跨会话一致性异常 > 2%（样本>=200）则降级。  

### 3 mandatory failure-injection tests
1. **Session store restart**：会话存储重启后上下文一致性验证。  
2. **Handoff loop guard**：构造循环委派，验证防无限循环机制。  
3. **Provider fallback break**：主模型不可用时是否正确切换。  

### Sources
- https://raw.githubusercontent.com/openai/openai-agents-python/main/README.md
- https://api.github.com/repos/openai/openai-agents-python
- https://api.github.com/repos/openai/openai-agents-python/releases?per_page=3

---

## ADR-03: CrewAI as Process-Control Backup

**Status**: Proposed (P1)  
**Decision Type**: Scenario backup (flow-heavy workloads)

### Why now
- Crews + Flows 双模清晰，适合“自治协作 + 确定性流程”混合业务。  
- release 连续，修复与功能节拍较快。  

### Scope boundary (must)
- 只用于：流程编排强、事件驱动强的业务域。  
- 不用于：作为唯一全局编排内核（先通过双核心基线对比）。  

### Integration cost (estimate)
- 工程接入：中（6/10）  
- 学习曲线：中（6/10）  
- 生产配套：中（7/10）  

### Migration risk
- 部分“企业级能力”叙事依赖 AMP 平台，需区分 OSS 与商业能力边界。  

### Exit condition (drop criteria)
- 若流程复杂度上升后，调试定位时长 > 基线框架 1.5x，则不进入主线。  

### 3 mandatory failure-injection tests
1. **Parallel task partial fail**：并行子任务一部分失败时的聚合策略。  
2. **Flow state corruption**：状态字段异常注入，验证防污染机制。  
3. **MCP tool nil config**：工具配置缺失时的降级与告警。  

### Sources
- https://raw.githubusercontent.com/crewAIInc/crewAI/main/README.md
- https://api.github.com/repos/crewAIInc/crewAI
- https://api.github.com/repos/crewAIInc/crewAI/releases?per_page=3

---

## ADR-04: Haystack as Retrieval-Centric Production Backup

**Status**: Proposed (P1)  
**Decision Type**: Retrieval-heavy stack option

### Why now
- 模块化 pipeline/agent + vendor-agnostic 定位明确，适合检索与治理并重场景。  
- Apache-2.0 清晰，企业法务路径更顺。  

### Scope boundary (must)
- 只用于：RAG/知识密集链路的主导业务。  
- 不用于：替代全局协议层（MCP 边界仍独立）。  

### Integration cost (estimate)
- 工程接入：中（6/10）  
- 学习曲线：中（5/10）  
- 生产配套：中（6/10）  

### Migration risk
- 组件丰富导致“过度组装”风险，项目初期容易复杂化。  

### Exit condition (drop criteria)
- 若同等任务集下延迟与成本较主线高出 > 25% 且准确收益不足 5%，降级。  

### 3 mandatory failure-injection tests
1. **Retriever degradation**：索引服务抖动时路由退化策略。  
2. **Memory retrieval mismatch**：记忆召回错误注入后的纠偏能力。  
3. **Pipeline branch timeout**：分支级超时是否拖垮全链路。  

### Sources
- https://raw.githubusercontent.com/deepset-ai/haystack/main/README.md
- https://api.github.com/repos/deepset-ai/haystack
- https://api.github.com/repos/deepset-ai/haystack/releases?per_page=3

---

## ADR-05: Dify as Productized Benchmark (Not Core Runtime)

**Status**: Proposed (P2)  
**Decision Type**: Benchmark and UX/ops reference

### Why now
- HITL、pause/resume、worker 架构与平台化能力演进快，可作为“产品形态”参考。  

### Scope boundary (must)
- 用于：控制台体验、运营闭环、模板化流程借鉴。  
- 不用于：直接绑定为 OwlClaw 核心执行内核（当前阶段）。  

### Integration cost (estimate)
- 工程接入：中高（7/10）  
- 学习曲线：中（5/10）  
- 生产配套：中高（8/10）  

### Migration risk
- license metadata 为 NOASSERTION/Other，商用边界需单独法务审查。  
- 平台耦合导致替换成本高。  

### Exit condition (drop criteria)
- 若 license/commercial 边界无法在评审窗口内明确，直接退出主线候选。  

### 3 mandatory failure-injection tests
1. **Worker queue saturation**：队列积压时执行时延与失败率。  
2. **Pause-resume replay consistency**：恢复后变量一致性。  
3. **Tenant isolation leak test**：多租户边界污染检测。  

### Sources
- https://raw.githubusercontent.com/langgenius/dify/main/README.md
- https://api.github.com/repos/langgenius/dify
- https://api.github.com/repos/langgenius/dify/releases?per_page=3

---

## ADR-06: Mastra as TS-Native Strategic Watch

**Status**: Proposed (P2)  
**Decision Type**: TS ecosystem strategic option

### Why now
- TS 生态下 agents/workflows/MCP/evals/observability 一体化叙事强。  

### Scope boundary (must)
- 用于：前后端一体 TS 团队的中期能力布局。  
- 不用于：当前窗口的唯一核心框架。  

### Integration cost (estimate)
- 工程接入：中（6/10）  
- 学习曲线：中（6/10）  
- 生产配套：中高（7/10）  

### Migration risk
- dual-license + ee 目录商业条款，需提前处理采购/法务策略。  
- 新兴框架 API 演进快，稳定性窗口需观察。  

### Exit condition (drop criteria)
- 若 2 周 PoC 中 API 兼容变更导致返工 > 20% 工时，停止主线评估。  

### 3 mandatory failure-injection tests
1. **Suspend-resume DB failover**：存储切换后恢复正确性。  
2. **Workflow branch race**：并发分支竞争条件测试。  
3. **MCP server disconnect**：协议连接中断后的重连与幂等。  

### Sources
- https://raw.githubusercontent.com/mastra-ai/mastra/main/README.md
- https://api.github.com/repos/mastra-ai/mastra

---

## Cross-ADR Global Guardrails (OwlClaw mandatory)

1. MCP must be the only tool boundary in production runtime.  
2. Observability must be wired before KPI scoring (no trace, no score).  
3. License gate is a release blocker, not a post-hoc checklist.  
4. Any framework-specific feature must have a portability fallback design.
