# OwlClaw 外部 AI 开发真实落地案例库（30 项）

## 方法与范围

- 范围：从既有已收集仓库中筛选 30 个高热项目（RAG、向量数据库、检索、网关、推理、观测）。
- 证据优先级：官方文档、官方架构说明、官方实践页；每条含来源 URL。
- 说明：很多项目不公开统一线上指标，因此“指标”字段按“公开可见”原则填充。

## 案例清单（30）

### 1) `langchain-ai/langchain`
- 场景：多工具 Agent 与企业工作流编排
- 架构：Agent + Tool + Memory + Callback 分层
- 关键技术选型：LCEL、统一工具接口
- 踩坑：链路复杂后提示词漂移与可观测缺口
- 指标：无统一官方基准（需自建）
- 适用边界：适合快速迭代；不适合无治理直接大规模上线
- 来源：https://docs.langchain.com/oss/python/langchain/overview

### 2) `run-llama/llama_index`
- 场景：企业知识库问答与 RAG
- 架构：Connector + Index + Retriever + Synthesizer
- 关键技术选型：索引/检索策略模块化
- 踩坑：策略组合过多导致参数治理复杂
- 指标：无统一官方 SLA
- 适用边界：适合文档密集业务；不适合强事务主系统
- 来源：https://docs.llamaindex.ai/en/stable/

### 3) `deepset-ai/haystack`
- 场景：检索增强问答和搜索应用
- 架构：节点式 Pipeline（ingest/retrieve/rerank/generate）
- 关键技术选型：组件化 pipeline + eval
- 踩坑：节点增多后运维复杂度上升
- 指标：有评测流程，缺统一全局 KPI
- 适用边界：适合中大型协作团队
- 来源：https://docs.haystack.deepset.ai/docs/intro

### 4) `infiniflow/ragflow`
- 场景：可视化 RAG 编排
- 架构：流程编排 + 知识库 + 检索重排 + 生成
- 关键技术选型：低代码流式编排
- 踩坑：灵活性高但标准化治理成本高
- 指标：未见统一公开基准
- 适用边界：适合业务团队共建
- 来源：https://github.com/infiniflow/ragflow

### 5) `microsoft/graphrag`
- 场景：复杂关系与多跳问答
- 架构：图构建 + 社区摘要 + 图检索 + 生成
- 关键技术选型：图增强检索
- 踩坑：图构建和更新成本高
- 指标：质量提升依赖数据结构特征
- 适用边界：适合高关系密度知识域
- 来源：https://microsoft.github.io/graphrag/

### 6) `HKUDS/LightRAG`
- 场景：轻量图增强 RAG
- 架构：轻量图结构 + 向量检索混合
- 关键技术选型：降低图成本的图检索折中
- 踩坑：图抽取不稳会放大误检
- 指标：缺工业级统一披露
- 适用边界：适合低预算图增强实验
- 来源：https://github.com/HKUDS/LightRAG

### 7) `qdrant/qdrant`
- 场景：多租户向量检索与过滤
- 架构：Vector index + Payload index + Query API
- 关键技术选型：tenant/principal/payload 索引能力
- 踩坑：过滤字段索引过多会吃内存
- 指标：文档有查询示例但无全局统一 KPI
- 适用边界：适合强过滤 RAG
- 来源：https://qdrant.tech/documentation/

### 8) `milvus-io/milvus`
- 场景：大规模向量检索平台
- 架构：分布式存储 + 索引构建 + 查询节点
- 关键技术选型：IVF/HNSW/DISKANN 多路径
- 踩坑：参数与资源强耦合，调优门槛高
- 指标：有参数调优范围与性能导向文档
- 适用边界：适合千万级以上检索
- 来源：https://milvus.io/docs

### 9) `weaviate/weaviate`
- 场景：语义 + 关键词混合检索
- 架构：向量检索 + 倒排/关键词 + 模块扩展
- 关键技术选型：Hybrid Search
- 踩坑：版本与模块组合复杂，升级测试重
- 指标：无统一公开 KPI
- 适用边界：适合混合检索产品
- 来源：https://docs.weaviate.io/weaviate

### 10) `chroma-core/chroma`
- 场景：快速原型与本地检索
- 架构：嵌入式向量存储 + 简单 API
- 关键技术选型：低门槛、快速集成
- 踩坑：高并发和复杂过滤能力有限
- 指标：无生产级统一 SLO
- 适用边界：适合 PoC/中小规模
- 来源：https://docs.trychroma.com/

### 11) `lancedb/lancedb`
- 场景：本地优先检索与分析融合
- 架构：列式数据 + 向量索引
- 关键技术选型：检索与分析一体
- 踩坑：生态广度仍在扩张
- 指标：暂无统一公开 KPI
- 适用边界：适合离线分析+检索
- 来源：https://lancedb.github.io/lancedb/

### 12) `pgvector/pgvector`
- 场景：在 PostgreSQL 内实现向量检索
- 架构：Postgres + HNSW/IVFFlat
- 关键技术选型：复用 ACID/WAL/SQL
- 踩坑：ANN 参数不当会明显掉召回
- 指标：README 提供调参经验（lists/probes/ef_search）
- 适用边界：适合已有 Postgres 团队
- 来源：https://github.com/pgvector/pgvector

### 13) `opensearch-project/OpenSearch`
- 场景：搜索与向量混检统一平台
- 架构：索引管道 + knn_vector + hybrid query
- 关键技术选型：同平台融合 lexical + vector
- 踩坑：集群治理与插件配置复杂
- 指标：有流程样例，无通用全局 KPI
- 适用边界：适合已有搜索平台升级
- 来源：https://opensearch.org/docs/latest/vector-search/

### 14) `elastic/elasticsearch`
- 场景：企业级搜索 + 向量扩展
- 架构：倒排 + 向量字段 + DSL 查询
- 关键技术选型：成熟生态与企业特性
- 踩坑：许可策略需前置评估
- 指标：官方提供向量检索能力说明
- 适用边界：适合企业统一搜索底座
- 来源：https://www.elastic.co/guide/en/elasticsearch/reference/current/vector-search-overview.html

### 15) `vespa-engine/vespa`
- 场景：超大规模检索与排序
- 架构：内容节点 + 查询节点 + 排序表达式
- 关键技术选型：多阶段检索/排序
- 踩坑：学习曲线陡峭
- 指标：强调大规模低延迟能力
- 适用边界：适合高并发高复杂检索
- 来源：https://docs.vespa.ai/en/nearest-neighbor-search.html

### 16) `meilisearch/meilisearch`
- 场景：开发友好搜索与语义扩展
- 架构：全文核心 + 向量检索扩展
- 关键技术选型：快速集成与低门槛
- 踩坑：企业级治理深度有限
- 指标：无统一生产基准
- 适用边界：适合中小应用
- 来源：https://www.meilisearch.com/docs/learn/ai_powered_search/vector_search

### 17) `typesense/typesense`
- 场景：实时搜索与向量检索
- 架构：轻量集群 + 向量字段
- 关键技术选型：易部署和低复杂度
- 踩坑：复杂策略定制空间有限
- 指标：有性能描述，非跨场景标准基准
- 适用边界：适合快速产品化
- 来源：https://typesense.org/docs/guide/vector-search.html

### 18) `facebookresearch/faiss`
- 场景：自研向量检索内核
- 架构：ANN 算法库（IVF/PQ/HNSW 等）
- 关键技术选型：高性能底层算子/GPU
- 踩坑：需自行服务化与治理
- 指标：偏算法性能，不是业务 KPI
- 适用边界：适合深度自研团队
- 来源：https://github.com/facebookresearch/faiss/wiki

### 19) `nmslib/hnswlib`
- 场景：轻量 ANN 内嵌检索
- 架构：嵌入式 ANN 库
- 关键技术选型：轻量高性能
- 踩坑：缺少企业治理能力
- 指标：无统一业务指标
- 适用边界：适合服务内嵌
- 来源：https://github.com/nmslib/hnswlib

### 20) `AirbyteHQ/airbyte`
- 场景：多源数据接入 AI 数据底座
- 架构：Connector + Worker + Sync 编排
- 关键技术选型：连接器生态
- 踩坑：连接器质量与运维治理复杂
- 指标：有同步与连接器运行观测框架
- 适用边界：适合多源接入场景
- 来源：https://docs.airbyte.com/platform/understanding-airbyte/airbyte-architecture

### 21) `Unstructured-IO/unstructured`
- 场景：非结构化文档解析切分
- 架构：文档解析 + 分块 + 元数据抽取
- 关键技术选型：文档前处理工程化
- 踩坑：文档异构导致抽取波动
- 指标：无统一跨语料基准
- 适用边界：适合 RAG 前处理层
- 来源：https://docs.unstructured.io/

### 22) `apache/tika`
- 场景：通用文件文本提取
- 架构：Parser 框架 + 格式识别
- 关键技术选型：格式覆盖广
- 踩坑：语义结构保真能力有限
- 指标：无统一在线 KPI
- 适用边界：适合保底解析层
- 来源：https://tika.apache.org/

### 23) `apache/kafka`
- 场景：实时增量索引与事件管道
- 架构：Topic + Consumer Group + Stream
- 关键技术选型：高吞吐事件驱动
- 踩坑：分区键与消费语义设计容易踩坑
- 指标：官方文档强调吞吐与持久化语义
- 适用边界：适合实时增量链路
- 来源：https://kafka.apache.org/documentation/

### 24) `apache/spark`
- 场景：离线重建与批流处理
- 架构：分布式计算 + Structured Streaming
- 关键技术选型：批流一体
- 踩坑：资源调度和作业治理复杂
- 指标：官方提供流式语义与性能建议
- 适用边界：适合重建/特征加工层
- 来源：https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html

### 25) `duckdb/duckdb`
- 场景：本地评测与数据分析
- 架构：嵌入式 OLAP
- 关键技术选型：单机高效分析
- 踩坑：非分布式主数据库定位
- 指标：公开 benchmark 偏分析性能
- 适用边界：适合评测和离线准备
- 来源：https://duckdb.org/docs/

### 26) `ClickHouse/ClickHouse`
- 场景：日志分析与检索侧观测中台
- 架构：列式存储 + 并行查询
- 关键技术选型：高吞吐分析
- 踩坑：分区/模型设计要求高
- 指标：官方提供性能导向实践
- 适用边界：适合分析侧车
- 来源：https://clickhouse.com/docs

### 27) `BerriAI/litellm`
- 场景：多模型供应商网关
- 架构：统一 API + 路由 + 回退
- 关键技术选型：成本路由与供应商抽象
- 踩坑：路由策略不当会造成质量波动
- 指标：文档突出成本追踪与路由能力
- 适用边界：适合模型抽象层
- 来源：https://docs.litellm.ai/

### 28) `vllm-project/vllm`
- 场景：高吞吐 LLM 推理服务
- 架构：Serving Engine + PagedAttention
- 关键技术选型：吞吐优先推理
- 踩坑：模型升级需严格压测
- 指标：文档强调吞吐和服务性能
- 适用边界：适合高并发推理后端
- 来源：https://docs.vllm.ai/

### 29) `huggingface/text-generation-inference`
- 场景：标准化模型推理服务
- 架构：推理服务器 + 批处理 + 并发调度
- 关键技术选型：HF 生态集成
- 踩坑：模型与硬件适配要求高
- 指标：官方提供部署和调优参数
- 适用边界：适合标准服务化推理
- 来源：https://huggingface.co/docs/text-generation-inference/index

### 30) `langfuse/langfuse`
- 场景：LLM 观测与评测闭环
- 架构：Trace + Prompt + Eval + Cost 平面
- 关键技术选型：把质量与成本放在同一观测链路
- 踩坑：埋点规范不统一会导致数据不可比
- 指标：可观测指标体系可配置
- 适用边界：适合中大型团队质量治理
- 来源：https://langfuse.com/docs

## 对 OwlClaw 的借鉴点（可执行）

- 先定“主干架构”：`LlamaIndex/Haystack + Qdrant/Milvus + LiteLLM + Langfuse`，避免早期过度分叉。
- 把“数据接入”和“检索服务”解耦：`Airbyte/Unstructured` 独立流水线，支持可重建与回放。
- 强制双门禁：离线检索指标（Recall/MRR/NDCG）+ 线上观测指标（P95/错误率/成本）。
- 建立参数实验板：统一记录 `nprobe/ef/hnsw_ef` 与质量-延迟-成本三角关系。
- 在中期引入混合检索兜底（OpenSearch/Weaviate 模式），专门解决长尾 query。
- 提前做多租户治理：tenant 字段、索引策略、限流与配额，不要等流量上来再补。
- 供应商抽象必须前置：通过网关层实现模型切换、回退、预算控制，降低锁定风险。
- 把“观测”做成发布前置条件：没有 trace 与评测数据的版本不允许进生产。
