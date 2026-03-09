# OwlClaw RAG 成本模型说明（配套 `w3_rag_cost_model_template.csv`）

## 1) 计算口径

总成本按 6 项拆分：

1. Embedding 成本
2. LLM 输入 token 成本
3. LLM 输出 token 成本
4. Rerank 成本
5. 向量库基础设施成本
6. 数据接入/编排基础设施成本

模板中 `cost_formula` 已给统一公式，可直接贴到 BI 或表格中计算。

## 2) 三个最敏感杠杆（优先优化）

- `avg_llm_input_tokens_per_query`：通常是最大成本项，先做上下文压缩和去重。
- `avg_rerank_pairs_per_query`：二阶段重排质量提升明显，但成本线性上升。
- `vector_infra_monthly_usd`：规模上来后，索引与存储策略决定固定成本天花板。

## 3) 参数与成本联动建议

- Qdrant：`hnsw_ef` 上调可提召回，但会拉高查询延迟与资源占用。  
  Source: https://qdrant.tech/documentation/concepts/search/
- Qdrant：payload index 要“按过滤字段精简建立”，避免不必要内存开销。  
  Source: https://qdrant.tech/documentation/concepts/indexing/
- Milvus：`nlist/nprobe`、`M/ef` 与性能/资源直接耦合，必须按规模分档。  
  Source: https://raw.githubusercontent.com/milvus-io/web-content/master/v2.6.x/site/en/reference/index.md
- Milvus DiskANN：`search_list` 与 `MaxDegree` 提召回的同时会增加时间或内存预算。  
  Source: https://raw.githubusercontent.com/milvus-io/web-content/master/v2.6.x/site/en/reference/disk_index.md
- OpenSearch：`mode=on_disk` + `compression_level` 可显著降低内存成本。  
  Source: https://opensearch.org/docs/latest/field-types/supported-field-types/knn-vector/
- pgvector：`lists/probes` 与 `ef_search` 是核心成本-质量调节手柄。  
  Source: https://raw.githubusercontent.com/pgvector/pgvector/master/README.md

## 4) 成本压降执行顺序（建议）

1. 先减输入 token（上下文截断、去重、摘要缓存）。
2. 再控 rerank 对数（`top_k -> rerank_topn` 做漏斗）。
3. 再调 ANN 参数（在 Recall 门槛内尽量降低 `ef/nprobe/probes`）。
4. 最后做存储层优化（on-disk、压缩、冷热分层）。

## 5) 审计与复盘字段（建议新增）

- `quality_guard_pass`（是否达召回/faithfulness 门槛）
- `rollback_flag`（本次参数是否回滚）
- `incident_count`（是否引发线上告警）
- `slo_breach_minutes`（SLO 超时累计）

> 原则：任何“降成本”动作如果导致质量门禁失败，不纳入正式基线。
