# Crawl & Search（抓取与搜索）情报目录

本目录存放「大模型 + 全网抓取/搜索」相关开源项目调研。

**采纳与选型结论**：分类与采纳信号来自本目录内部归纳（C8-A12）；引用为决策依据时须补充外部来源（GitHub 活跃度、第三方集成案例）或显式标注「内部归纳、待外部验证」。

## 主文档

- **综合调研（中文）**：[llm_web_crawl_search_2026-03-09.md](llm_web_crawl_search_2026-03-09.md)  
  - 抓取→LLM 输出、抓取+RAG、AI 问答式搜索（Perplexity 类）、搜索 API、选型建议、数据来源说明。
- **结构化数据**：[llm_web_crawl_search_2026-03-09.csv](llm_web_crawl_search_2026-03-09.csv)  
  - 字段：project, repo_url, license, stars_approx, focus, crawl, search_rag, self_hosted, notes。

## 分类速览

| 分类 | 代表项目 |
|------|----------|
| 抓取→Markdown/结构化 | Crawl4AI, Firecrawl, Jina Reader, ForgeCrawl, LLM-Reader |
| 抓取+RAG/向量检索 | Crawl2RAG, RagRabbit, Embedchain, DawnSearch, IntellilSearch |
| AI 问答式搜索（Perplexity 类） | Perplexica, Farfalle, Turboseek, Sensei, LangChain-SearXNG, Perplexify |
| 本地知识库+引用问答 | GNO |
| 搜索 API（供 Agent） | Tavily, Jina s.jina.ai |

## 导航

- 按主题浏览全库：`00-index/BROWSE_BY_TOPIC.md` → Crawl & Search (LLM-oriented)。
