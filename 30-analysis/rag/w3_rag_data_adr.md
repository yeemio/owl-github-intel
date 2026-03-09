# ADR: OwlClaw RAG 数据层选型（v1）

- **状态**: Proposed
- **日期**: 2026-03-09
- **决策范围**: OwlClaw 的 RAG 数据层（接入、索引、检索、重排、运维）

## 1. 背景与问题

OwlClaw 需要在“上线速度、检索质量、可扩展性、运维复杂度”之间平衡。  
当前目标是先形成可复用的数据层基线，再支持从小规模平滑升级到中/大规模。

关键外部证据来源：
- https://api.github.com/repos/run-llama/llama_index
- https://api.github.com/repos/qdrant/qdrant
- https://api.github.com/repos/milvus-io/milvus
- https://api.github.com/repos/opensearch-project/OpenSearch
- https://api.github.com/search/repositories?q=topic:reranking&sort=stars&order=desc&per_page=100

## 2. 决策

**默认主决策（v1）**  
采用 `LlamaIndex + Qdrant + 二阶段重排（FlashRank/rerankers）`，并预留 `OpenSearch` 作为混合检索扩展位。

## 3. 选择理由

- `LlamaIndex`：数据接入与索引抽象成熟，适合快速组装与迭代。  
  来源：https://api.github.com/repos/run-llama/llama_index
- `Qdrant`：向量检索能力与工程复杂度较平衡，适配中规模主场景。  
  来源：https://api.github.com/repos/qdrant/qdrant
- 重排层：二阶段检索是质量提升杠杆，且可独立演进。  
  来源：https://api.github.com/search/repositories?q=rerank+in:name,description&sort=stars&order=desc&per_page=100
- 可升级路径清晰：流量与数据量上升后可接入 `OpenSearch` 混合检索或迁移 `Milvus`。  
  来源：https://api.github.com/repos/opensearch-project/OpenSearch, https://api.github.com/repos/milvus-io/milvus

## 4. 备选方案与取舍

### A) `LangChain + Chroma`
- 优点：开发快、运维轻。
- 缺点：中大规模场景下检索策略与扩展弹性相对弱。
- 来源：https://api.github.com/repos/langchain-ai/langchain, https://api.github.com/repos/chroma-core/chroma

### B) `Haystack + OpenSearch`
- 优点：混合检索能力强，企业级扩展成熟。
- 缺点：运维复杂度高于默认方案。
- 来源：https://api.github.com/repos/deepset-ai/haystack, https://api.github.com/repos/opensearch-project/OpenSearch

### C) `RAGFlow + Milvus`
- 优点：端到端工程化强，适合大规模。
- 缺点：学习与运维成本偏高，不适合作为 v1 默认。
- 来源：https://api.github.com/repos/infiniflow/ragflow, https://api.github.com/repos/milvus-io/milvus

## 5. 分规模落地策略

| 规模 | 推荐 | 说明 |
|---|---|---|
| 小规模 | `LlamaIndex + Chroma/pgvector` | 先快后优，验证业务闭环 |
| 中规模（默认） | `LlamaIndex + Qdrant + Reranker` | 质量/扩展/复杂度最均衡 |
| 大规模 | `Milvus + OpenSearch (+Kafka/Spark)` | 强扩展与高吞吐，换取更高运维门槛 |

## 6. 非功能验收指标（上线门槛）

- **质量**：Top-k Recall、MRR、NDCG 按周追踪；重排后 NDCG 提升 >= 10%
- **性能**：P95 检索延迟（召回+重排）满足业务 SLA
- **稳定性**：索引构建失败率、回滚成功率、数据新鲜度（T+X）
- **成本**：单千次查询成本（模型 + 存储 + 算力）可观测

## 7. 里程碑

- **M1（2-4 周）**：默认栈跑通 + 离线评测基线
- **M2（4-8 周）**：混合检索上线 + A/B 验证
- **M3（8-12 周）**：容量扩展与多租户治理

## 8. 风险与缓解

- **许可证风险**：含 `NOASSERTION/Other` 组件需法务复核后再进入商用路径。  
  来源：https://api.github.com/repos/elastic/elasticsearch
- **质量风险**：仅向量召回会在长尾 query 退化，必须保留重排与评测门禁。  
  来源：https://api.github.com/repos/beir-cellar/beir
- **运维风险**：扩容后索引生命周期与租户隔离复杂度上升。  
  来源：https://api.github.com/repos/milvus-io/milvus

## 9. 结论

在当前阶段，`LlamaIndex + Qdrant + 二阶段重排` 是 OwlClaw 的最优默认决策；  
通过预留 `OpenSearch/Milvus` 扩展位，可保障后续从中规模向大规模平滑演进。

