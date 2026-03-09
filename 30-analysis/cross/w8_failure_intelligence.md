# W8 Failure Intelligence: 问题复发地图（Top 25 仓库）

日期：2026-03-09  
输出文件：
- `w8_failure_patterns.csv`
- `w8_failure_intelligence.md`

---

## 扫描范围与方法

- 样本仓库：Top 25（Agent 编排、协议、观测、网关、RAG 相关主仓）
- 扫描口径：每仓扫描最近 `30` 条 Issues/PR（满足“每仓至少15条”）
- 总扫描量：`25 * 30 = 750` 条
- 数据源：GitHub Issues/Pulls API（含 issue 与 PR）

### Top 25 仓库（本轮）

`langchain-ai/langgraph`, `microsoft/autogen`, `crewAIInc/crewAI`, `deepset-ai/haystack`, `openai/openai-agents-python`, `microsoft/agent-framework`, `run-llama/llama_index`, `langgenius/dify`, `mastra-ai/mastra`, `modelcontextprotocol/python-sdk`, `langfuse/langfuse`, `AgentOps-AI/agentops`, `langchain-ai/langchain`, `langchain-ai/langchainjs`, `microsoft/semantic-kernel`, `BerriAI/litellm`, `Significant-Gravitas/AutoGPT`, `geekan/MetaGPT`, `camel-ai/camel`, `stanfordnlp/dspy`, `run-llama/LlamaIndexTS`, `deepset-ai/hayhooks`, `OpenBMB/AgentVerse`, `microsoft/TaskWeaver`, `Azure/azure-sdk-for-python`

---

## 高频失败模式总览（跨仓聚合）

基于关键词分类后的跨仓计数（750条样本内，可多标签）：

- **配置/部署**：334
- **并发与状态**：287
- **安全与权限**：214
- **检索质量**：167
- **评测漂移**：154
- **网关路由**：151

结论：复发最集中在**“部署配置 + 运行时状态”**，其次是**“权限边界与数据面可见性”**。这与 OwlClaw 落地风险高度一致。

---

## 六大维度复发地图

## 1) 配置/部署

### 复发画像
- 依赖升级导致环境特定回归（TLS/Redis/DB migration）；
- 同一配置在不同初始化路径读取不一致（主链路通，迁移链路失败）；
- 配置键“存在即启用”而非“值为真才启用”造成误连。

### 代表证据
- LangGraph Redis TLS cluster PubSub 端口回归：  
  https://github.com/langchain-ai/langgraph/issues/6987
- AutoGen Studio Alembic 认证失败：  
  https://github.com/microsoft/autogen/issues/7341
- LiteLLM Redis SSL false 仍走 SSLConnection：  
  https://github.com/BerriAI/litellm/pull/22745

### OwlClaw 启发
- 强制“配置一致性断言”（启动前检查主链路/迁移链路/worker链路配置同源）；
- 依赖升级需要“环境矩阵回归”（TLS Redis、Postgres、k8s三套最小矩阵）；
- 配置解析统一用“布尔真值语义”，禁止仅按键存在判断。

---

## 2) 并发与状态

### 复发画像
- 快速退出/中断时，cleanup 与后台任务并发产生竞态；
- streaming 边界值（None chunk、断链）未处理导致状态不一致；
- shutdown 顺序错误导致连接未优雅收束。

### 代表证据
- MCP stdio cleanup 竞态：  
  https://github.com/modelcontextprotocol/python-sdk/issues/1960
- MCP Streamable HTTP shutdown 未终止活动会话：  
  https://github.com/modelcontextprotocol/python-sdk/issues/2150
- AutoGen streaming None chunk 修复：  
  https://github.com/microsoft/autogen/pull/7355

### OwlClaw 启发
- 所有 executor 必须具备“先停任务再关流”约束；
- streaming 消息协议需要定义“空块/乱序/尾块”容错规范；
- 增加“快速进入-快速退出”稳定性测试作为发布门禁。

---

## 3) 检索质量

### 复发画像
- 参数透传失控（embedding dimensions、格式字段）引发上游422/400；
- 检索输入结构被错误转换，导致召回或读取路径偏移；
- 多文档场景中元数据限制（block/name）触发隐性失败。

### 代表证据
- LlamaIndex Anthropic cache_control block 限制修复：  
  https://github.com/run-llama/llama_index/pull/20875
- LiteLLM embedding dimensions 透传导致422：  
  https://github.com/BerriAI/litellm/pull/23120
- LlamaIndex SharePointReader folder_id 被忽略：  
  https://github.com/run-llama/llama_index/pull/20838

### OwlClaw 启发
- 建立“provider能力矩阵”并在网关层做参数裁剪；
- 检索连接器必须有“路径正确性测试”（id/path 双路径）；
- 多文档请求统一做“命名唯一性 + 格式一致性”预检。

---

## 4) 网关路由

### 复发画像
- discovery/proxy 阶段 header 丢失导致鉴权失败；
- 模型路由规则滞后于新模型版本，落到错误API协议；
- UI 选择状态和后端路由状态不同步，导致“看起来选了，实际没路由”。

### 代表证据
- LangChain MCP discovery 未转发鉴权头：  
  https://github.com/langchain-ai/langchain/issues/35574
- LangChain gpt-5.4 路由识别修复：  
  https://github.com/langchain-ai/langchain/pull/35643
- LiteLLM 模型选择状态不一致：  
  https://github.com/BerriAI/litellm/issues/23134

### OwlClaw 启发
- 将“header透传一致性”列为代理层契约测试；
- 模型注册中心需自动化刷新能力映射并做回归；
- UI/API 路由状态来源统一（single source of truth）。

---

## 5) 评测漂移

### 复发画像
- 评测输入映射（JSONPath/切片）错误导致样本被截断；
- trace存在但关键LLM call缺失，评价体系失真；
- callback上下文丢失使流式事件退化为块级输出。

### 代表证据
- Langfuse evaluator JSONPath slicing异常：  
  https://github.com/langfuse/langfuse/issues/11738
- Langfuse CrewAI+Azure 场景缺失LLM调用追踪：  
  https://github.com/langfuse/langfuse/issues/12401
- LangChain create_agent 丢失RunnableConfig导致stream events缺失：  
  https://github.com/langchain-ai/langchain/pull/35531

### OwlClaw 启发
- 评测链路要做“输入映射回放测试”；
- 观测数据必须满足最小完备性（trace + model call + tool call）；
- callback context 传播需单测覆盖 sync/async 两路径。

---

## 6) 安全与权限

### 复发画像
- 启用企业鉴权后数据导出链路失效（401）；
- 模型暴露边界与调用边界不一致（alias与provider model穿透）；
- 协议异常输入被静默吞掉，形成“无告警失败”。

### 代表证据
- Langfuse Azure AD后trace export 401：  
  https://github.com/langfuse/langfuse/issues/11726
- LiteLLM proxy 模型暴露边界问题：  
  https://github.com/BerriAI/litellm/issues/14257
- MCP id:null 被误判为notification：  
  https://github.com/modelcontextprotocol/python-sdk/issues/2057

### OwlClaw 启发
- 将“认证模式切换后数据面可用性”纳入安全回归；
- 对外公开模型名必须和内部路由ID隔离；
- 协议层禁止静默吞错，必须返回结构化错误。

---

## 复发优先级（P0/P1/P2）

## P0（立即治理）
- 配置同源校验（runtime/migration/worker）
- cleanup顺序与中断恢复语义统一
- Header透传与鉴权一致性测试
- 观测最小完备性门禁（trace/model/tool）

## P1（两周内）
- provider参数能力矩阵+自动裁剪
- 模型路由能力表自动更新与回归
- 检索连接器路径正确性专项测试

## P2（持续改进）
- 评测映射可视化校验器
- 异常输入协议合规扫描（JSON-RPC/MCP）
- UI状态机与后端路由联调监控

---

## 字段化模式库说明

结构化明细见：`w8_failure_patterns.csv`  
每条记录都包含：
- `症状`
- `触发条件`
- `根因`
- `修复方式`
- `是否有回归测试`
- `来源 URL`

---

## 限制说明

- 本轮为外部仓库公开Issue/PR情报扫描，基于最近活动样本（每仓30条）；  
- 某些issue仍处于open状态，根因/修复以“当前公开信息”为准；  
- 分类使用统一规则做聚合，单条可能跨多个维度（本报告按主因归类）。
