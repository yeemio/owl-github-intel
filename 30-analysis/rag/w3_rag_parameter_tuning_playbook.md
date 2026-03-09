# OwlClaw RAG 参数级调优手册（v1）

## 1) 目标与适用范围

- 目标：给 OwlClaw 的 RAG 数据层提供“可直接执行”的参数起点、调参顺序与回滚阈值。
- 适用：`Qdrant` / `Milvus` / `pgvector` / `OpenSearch` 组合栈。
- 原则：先锁定召回下限，再压延迟与成本；所有参数调整都用 A/B 回放验证。

## 2) 参数调优总流程（统一）

1. 固定数据切片与评测集（同一批 query + ground truth）。
2. 先调召回主参数（如 `hnsw_ef` / `ef` / `nprobe` / `probes`）。
3. 达到 Recall@K 下限后，再调延迟与内存参数（压缩、on-disk、缓存比例）。
4. 每次只改 1-2 个参数，记录前后变化（P50/P95、Recall@K、成本）。
5. 若 P95 恶化 > 20% 且 Recall 提升 < 1.5%，回滚该参数组。

## 3) Qdrant 参数建议（起步区间）

### 3.1 查询层

- `hnsw_ef`: 64 / 128 / 256 三档回放；高值通常提高召回但增加延迟。  
  Source: https://qdrant.tech/documentation/concepts/search/
- `exact`: 仅用于离线基准或回归排障，不建议常开在线流量。  
  Source: https://qdrant.tech/documentation/concepts/search/
- `indexed_only`: 重建期可用于稳住延迟，但会有“部分结果”风险。  
  Source: https://qdrant.tech/documentation/concepts/search/

### 3.2 过滤/多租户层

- 高频过滤字段必须建 payload index（`keyword/integer/text/...`）。  
  Source: https://qdrant.tech/documentation/concepts/indexing/
- 多租户字段启用 `is_tenant=true`，并优先按 `group_id` 过滤查询。  
  Source: https://qdrant.tech/documentation/guides/multitenancy/
- 多租户高写入场景可试 `m=0 + payload_m=16`（禁全局图、按租户图）。  
  Source: https://qdrant.tech/documentation/guides/multitenancy/

### 3.3 过滤精度层

- 严格过滤+召回下降场景可启用 `acorn.enable=true`；`max_selectivity` 从 0.4 起测。  
  Source: https://qdrant.tech/documentation/concepts/search/

## 4) Milvus 参数建议（起步区间）

### 4.1 IVF 系列

- `nlist`: 从 `1024/2048/4096` 起做分档实验（大库优先更高 nlist）。  
- `nprobe`: 从 `8/16/32/64` 回放，找 Recall 与 P95 平衡点。  
  Source: https://raw.githubusercontent.com/milvus-io/web-content/master/v2.6.x/site/en/reference/index.md

### 4.2 HNSW 系列

- `M`: 从 `16/32` 起测（更高召回通常伴随更高内存与构建成本）。  
- `efConstruction`: 从 `100/200` 起测，偏向索引质量。  
- `ef`: 从 `64/128/256` 起测，偏向查询召回。  
  Source: https://raw.githubusercontent.com/milvus-io/web-content/master/v2.6.x/site/en/reference/index.md

### 4.3 DISKANN

- `search_list`: 从 `32/64/128` 回放，控制召回/延迟权衡。  
- `MaxDegree`、`SearchListSize`、`BeamWidthRatio` 可在 `milvus.yaml` 做二级优化。  
  Source: https://raw.githubusercontent.com/milvus-io/web-content/master/v2.6.x/site/en/reference/disk_index.md

## 5) pgvector 参数建议（起步区间）

### 5.1 HNSW

- 建索引参数：`m=16`、`ef_construction=64` 为默认基线。  
- 查询参数：`hnsw.ef_search` 从 `40/80/120/200` 逐步抬升。  
  Source: https://raw.githubusercontent.com/pgvector/pgvector/master/README.md

### 5.2 IVFFlat

- `lists`: 按官方经验设起点：  
  - <=1M rows: `rows / 1000`  
  - >1M rows: `sqrt(rows)`  
- `ivfflat.probes`: 从 `sqrt(lists)` 起步，再按 recall 递增。  
  Source: https://raw.githubusercontent.com/pgvector/pgvector/master/README.md

### 5.3 过滤场景

- 开启 `iterative_scan`（strict/relaxed）可缓解“过滤后结果不足”。  
- 高选择性过滤优先对过滤字段建普通索引（B-tree/GIN 等）再叠加向量检索。  
  Source: https://raw.githubusercontent.com/pgvector/pgvector/master/README.md

## 6) OpenSearch 参数建议（起步区间）

- `knn_vector.method.parameters.m`: 16 起步；`ef_construction`: 100 起步。  
- `index.knn.algo_param.ef_search`: 64/100/200 分档回放。  
  Source: https://opensearch.org/docs/latest/field-types/supported-field-types/knn-vector/
- 成本优先场景可用 `mode=on_disk` + `compression_level`（如 `16x`）压内存。  
  Source: https://opensearch.org/docs/latest/field-types/supported-field-types/knn-vector/
- 混合检索可通过 search pipeline 归一化加权（如 lexical:vector = 0.3:0.7）。  
  Source: https://opensearch.org/docs/latest/vector-search/

## 7) 分规模默认参数包（建议起点）

### Small（<1M chunks）

- Qdrant: `hnsw_ef=64~128`，核心过滤字段建 payload index。
- pgvector: HNSW `ef_search=80~120`。
- 目标：低运维复杂度 + 可接受召回。

### Mid（1M~100M chunks）

- Qdrant: `hnsw_ef=128~256` + 关键过滤字段全索引。
- Milvus IVF: `nlist=2048/4096`, `nprobe=16~64`。
- OpenSearch 混检通道启用（长尾 query 兜底）。

### Large（>100M chunks）

- Milvus DISKANN 或 OpenSearch on-disk 方案优先压内存。
- Qdrant 多租户采用 `is_tenant` + 分层分片策略。
- 所有变更必须配套离线门禁 + 灰度回放。

## 8) 变更记录模板（建议复制到每次实验）

```markdown
### Experiment: <name>
- Date:
- Dataset slice:
- Baseline params:
- New params:
- Recall@10:
- MRR@10:
- NDCG@10:
- P50/P95 latency:
- Cost per 1k queries:
- Decision: keep / rollback
- Source URLs:
```

## 9) 来源清单

- Qdrant Search: https://qdrant.tech/documentation/concepts/search/
- Qdrant Indexing: https://qdrant.tech/documentation/concepts/indexing/
- Qdrant Multitenancy: https://qdrant.tech/documentation/guides/multitenancy/
- Milvus Index Vector Fields: https://raw.githubusercontent.com/milvus-io/web-content/master/v2.6.x/site/en/userGuide/manage-indexes/index-vector-fields.md
- Milvus In-memory Index: https://raw.githubusercontent.com/milvus-io/web-content/master/v2.6.x/site/en/reference/index.md
- Milvus On-disk Index: https://raw.githubusercontent.com/milvus-io/web-content/master/v2.6.x/site/en/reference/disk_index.md
- pgvector README: https://raw.githubusercontent.com/pgvector/pgvector/master/README.md
- OpenSearch k-NN Vector: https://opensearch.org/docs/latest/field-types/supported-field-types/knn-vector/
- OpenSearch Vector Search: https://opensearch.org/docs/latest/vector-search/
