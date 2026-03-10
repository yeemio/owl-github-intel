# C8 未知 #5 预扫：30-analysis/crawl 覆盖（ForgeCrawl / RagRabbit / Crawl2RAG）

**用途**：为 C8 digest「下轮 5 个未知」第 5 条提供 A 侧预扫，供下轮是否纳入证据周期及如何映射 P2 触发用。  
**日期**：2026-03-09（窗口 A 自由发挥）

---

## 未知 #5 原文

> Whether to include **ForgeCrawl, RagRabbit, Crawl2RAG** in next evidence cycle and how they map to P2 triggers; external sources or "内部归纳、待外部验证" for crawl conclusions.

---

## 预扫结果（仅公开信号）

| 项目 | 仓库 | 公开 issue/PR/release | 备注 |
|------|------|------------------------|------|
| **ForgeCrawl** | [cschweda/forgecrawl](https://github.com/cschweda/forgecrawl) | 0 open/closed issues | 无公开讨论；README 描述为 SQLite+Docker、Markdown+YAML；需依赖文档或代码变更做采纳/风险信号。 |
| **RagRabbit** | [madarco/ragrabbit](https://github.com/madarco/ragrabbit) | 1 issue（#1 Glama listing missing Dockerfile） | 133 stars, 19 forks；issue 量极少，采纳/升级证据需从 README、releases 或第三方引用补。 |
| **Crawl2RAG** | [tavily-ai/crawl2rag](https://github.com/tavily-ai/crawl2rag) | 仓库已归档 | 46 stars, 0 forks；依赖 Tavily Crawl API + MongoDB Atlas；C8 文档已注明「仓库已归档，仍可参考实现」。 |

---

## 来源 URL（可作下轮 evidence 候选）

- https://github.com/cschweda/forgecrawl  
- https://github.com/cschweda/forgecrawl/issues  
- https://github.com/madarco/ragrabbit  
- https://github.com/madarco/ragrabbit/issues/1  
- https://github.com/tavily-ai/crawl2rag  

---

## A 侧建议

1. **下轮是否纳入**：若 B/C 希望「crawl 栈结论有外部验证」，建议将 RagRabbit 纳入（至少 1 条 issue + repo）；ForgeCrawl 仅作 repo/README 级一条；Crawl2RAG 标为「已归档，仅参考」不占正式 claim 配额。  
2. **P2 映射**：三者当前均在 30-analysis/crawl 中列为抓取+RAG 或 AI 问答类；若纳入，建议 P2 触发与现有 Crawl4AI/Firecrawl 等一致（两处独立采纳信号 + 风险与回滚说明），并注明「证据稀疏、待外部验证」。  
3. **内部归纳**：当前 crawl 结论主要来自 30-analysis/crawl 文档与 C8 A/B/C 产出；对 ForgeCrawl/RagRabbit/Crawl2RAG 的「采纳/风险」若延后纳入，可在 adoption_backlog 或 digest 中保留一句「内部归纳、待下轮外部证据补全」。
