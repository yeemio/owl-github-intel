# OwlClaw RAG 评测集设计模板（可直接复用）

## 1) 设计目标

- 让 RAG 的“召回质量、答案质量、稳健性、安全性”可度量、可门禁、可回归。
- 同一套样本同时支持：离线评测、灰度验收、线上回放抽检。

## 2) 样本结构（单条）

```json
{
  "query_id": "q_0001",
  "domain": "policy|ops|code|product",
  "intent": "factoid|howto|comparison|decision|troubleshooting",
  "difficulty": "easy|medium|hard",
  "query": "",
  "must_include_points": [],
  "ground_truth_answer": "",
  "ground_truth_doc_ids": [],
  "negative_doc_ids": [],
  "constraints": {
    "time_bound": "",
    "locale": "zh-CN",
    "forbidden_claims": []
  },
  "risk_tag": "none|privacy|security|compliance",
  "source_urls": []
}
```

## 3) 数据集分层建议

- `Core Set`（上线门禁）：200-500 条，覆盖高频意图与关键业务域。
- `Stress Set`（回归压测）：100-300 条，长尾、歧义、多跳、冲突证据样本。
- `Red Team Set`（安全门禁）：50-150 条，注入、越权、敏感信息诱导。

## 4) 意图分布模板（建议）

- factoid（事实检索）: 25%
- howto（操作步骤）: 25%
- comparison（对比选择）: 20%
- decision（方案决策）: 15%
- troubleshooting（排障）: 15%

> 规则：任一意图占比不应超过 35%，防止评测偏科。

## 5) 检索层指标（必须）

- Recall@k（k=5/10/20）
- MRR@10
- NDCG@10
- 命中率：`ground_truth_doc_ids` 至少命中 1 条的占比

这些指标用于判断“是否找到了对的证据”，优先级高于生成分。  
Source: https://github.com/beir-cellar/beir  
Source: https://github.com/embeddings-benchmark/mteb

## 6) 生成层指标（建议）

- Faithfulness（答案与证据一致性）
- Answer Relevance（回答与问题相关性）
- Context Precision / Recall（上下文是否足够且不过量）

可先用自动评测做批量筛查，再抽样人工复核。  
Source: https://github.com/explodinggradients/ragas

## 7) 安全与鲁棒门禁（建议）

- Prompt Injection 抵抗率
- 敏感信息泄露率
- 拒答策略正确率（不确定/越权时）
- 工具调用安全检查通过率

建议纳入 CI 的固定 gate，不通过则阻断上线。  
Source: https://github.com/promptfoo/promptfoo

## 8) 判分 Rubric（人工复核模板）

- 5 分：关键事实完整、证据一致、无幻觉、结构清晰。
- 4 分：核心正确，少量次要遗漏，不影响决策。
- 3 分：部分正确，存在关键遗漏或表述模糊。
- 2 分：核心结论不稳，证据不足或有明显偏差。
- 1 分：错误/幻觉/越权输出。

建议每周对自动评测 Top 异常样本做 30-50 条人工复核校准。

## 9) 离线门禁阈值（示例）

- Recall@10 >= 0.85
- MRR@10 >= 0.70
- NDCG@10 >= 0.75
- Faithfulness >= 0.80
- Injection 抵抗率 >= 0.95

> 若任一核心域低于阈值，禁止扩量，只允许灰度修复。

## 10) 实验记录表（建议）

```csv
run_id,date,embed_model,retriever,reranker,top_k,filter_strategy,recall_at_10,mrr_at_10,ndcg_at_10,faithfulness,latency_p95_ms,cost_per_1k_queries,pass_gate,notes
```

## 11) 最小落地节奏（2 周）

- Week 1: 定义样本 schema + Core Set 200 条 + 自动评测流水线。
- Week 2: 加入 Stress/Red Team 子集 + CI 门禁 + 异常样本复核机制。

## 12) 来源清单

- BEIR: https://github.com/beir-cellar/beir
- MTEB: https://github.com/embeddings-benchmark/mteb
- RAGAS: https://github.com/explodinggradients/ragas
- Promptfoo: https://github.com/promptfoo/promptfoo
