# 结合大模型的全网数据抓取与搜索 — 开源项目调研

**日期**: 2026-03-09  
**范围**: 开源项目，支持「抓取/爬取 + 搜索/检索」且面向 LLM/RAG 场景

---

## 一、抓取 + LLM 就绪输出（Crawl → Markdown/结构化）

| 项目 | 仓库 | 许可 | 星数(约) | 说明 |
|------|------|------|----------|------|
| **Crawl4AI** | [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | Apache-2.0 | 61.6k | 面向 LLM 的爬虫/抓取，输出 Markdown；支持 CSS/XPath/LLM 抽取、并行爬取、代理、RAG 管道；可集成 Claude 等 Agent。 |
| **Firecrawl** | [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | AGPL-3.0 | 90k+ | 将整站转为 Markdown/JSON/截图；JS 渲染、批量、变更追踪；有 MCP server；可自托管。 |
| **Jina Reader** | [jina-ai/reader](https://github.com/jina-ai/reader) | Apache-2.0 | 10k+ | 通过 `https://r.jina.ai/<url>` 将任意 URL 转为 LLM 友好文本；免费 API；另有 `s.jina.ai` 网页搜索。 |
| **ForgeCrawl** | [cschweda/forgecrawl](https://github.com/cschweda/forgecrawl) | - | - | 自托管、零月费；SQLite+Docker；输出 Markdown+YAML frontmatter；内置鉴权与缓存。 |
| **LLM-Reader** | [m92vyas/llm-reader](https://github.com/m92vyas/llm-reader) | - | - | Python，Playwright 并发抓取，转 LLM 友好文本；RAG/抽取/链接发现。 |

---

## 二、抓取 + 搜索/检索（Crawl → RAG / 向量检索）

| 项目 | 仓库 | 许可 | 星数(约) | 说明 |
|------|------|------|----------|------|
| **Crawl2RAG** | [tavily-ai/crawl2rag](https://github.com/tavily-ai/crawl2rag) | MIT | 46 | 用 Tavily Crawl API 抓站 → MongoDB Atlas 向量索引 → 带引用的对话问答；LangGraph + FastAPI；TS/Python。（注：仓库已归档） |
| **RagRabbit** | [madarco/ragrabbit](https://github.com/madarco/ragrabbit) | - | - | 自托管 AI 搜索：站内爬虫 + pgVector/PostgreSQL 建索引；可嵌聊天组件；LlamaIndex；支持 Vercel 一键部署。 |
| **Embedchain** | [embedchain/embedchain](https://github.com/embedchain/embedchain) | Apache-2.0 | 20k+ | 多数据源（网页、sitemap、PDF 等）→ 分块 + 向量库 → RAG 应用；支持多种向量库与 LLM。 |
| **DawnSearch** | [dawn-search/dawnsearch](https://github.com/dawn-search/dawnsearch) | - | 14 | 分布式「按语义搜索」的搜索引擎，偏早期。 |
| **IntellilSearch** | [ashwantmanikoth/intellilsearch](https://github.com/ashwantmanikoth/intellilsearch) | - | - | AI 驱动爬虫，按用户输入抓取并整理信息，带语义理解。 |

---

## 三、AI 问答式搜索引擎（Perplexity 类、可自托管）

与 Perplexica 同类的开源「搜索 + LLM → 带引用答案」方案：

| 项目 | 仓库 | 许可 | 星数(约) | 说明 |
|------|------|------|----------|------|
| **Perplexica** | [ItzCrazyKns/Perplexica](https://github.com/ItzCrazyKns/Perplexica) | MIT | 32k+ | 对标 Perplexity；SearxNG 元搜索 + 多 LLM（Ollama/OpenAI/Claude/Groq/Gemini）；Speed/Balanced/Quality 模式，学术/Reddit/YouTube；图/视频搜索、文件上传；Next.js。 |
| **Farfalle** | [rashadphz/farfalle](https://github.com/rashadphz/farfalle) | Apache-2.0 | 3.5k | 自托管 AI 问答引擎；支持本地/云端 LLM；集成 SearxNG、Tavily 等搜索；Python 后端 + Docker。 |
| **Turboseek** | [Nutlope/turboseek](https://github.com/Nutlope/turboseek) | - | 1.6k | 对标 Perplexity；抓取搜索结果 → LLM 汇总 → 流式带引用回答；Next.js；可接 Together AI / OpenAI；逻辑简单、无向量库。 |
| **Sensei** | [jjleng/sensei](https://github.com/jjleng/sensei) | Apache-2.0 | 460+ | 「Yet another open source Perplexity」；heysensei.app 演示。 |
| **LangChain-SearXNG** | [ptonlix/LangChain-SearXNG](https://github.com/ptonlix/LangChain-SearXNG) | Apache-2.0 | 215+ | 基于 LangChain + SearXNG 的 AI 问答搜索引擎；中文社区常用。 |
| **Perplexify** | [kamranxdev/Perplexify](https://github.com/kamranxdev/Perplexify) | - | 14 | Perplexica 的 fork；增加 Search Orchestrator（分步规划与执行）；TypeScript。 |

**本地知识库 + 带引用问答**（非全网搜索，但形态接近）：

| 项目 | 说明 |
|------|------|
| **GNO** | [gno.sh](https://www.gno.sh/) / `bun install -g @gmickel/gno` — 本地文档索引（Markdown/PDF/DOCX 等），BM25+向量混合检索，`gno ask` 生成带引用答案；MCP/SKILL 集成；无云端、无 API key。 |

---

## 四、搜索 API / 搜索服务（供 Agent 调用）

| 项目/服务 | 类型 | 说明 |
|-----------|------|------|
| **Tavily** | API（有免费额度） | 面向 LLM Agent 的搜索：Search API（多档深度）、Extract API（单 URL 抽 Markdown）、Crawl API（图遍历整站）；Python/JS SDK；非全开源，服务为主。 |
| **Jina s.jina.ai** | 免费 API | 网页搜索端点，与 r.jina.ai 配套，供 Agent 做检索。 |

---

## 五、分类小结

- **纯抓取、输出给 LLM**：Crawl4AI、Firecrawl、Jina Reader、ForgeCrawl、LLM-Reader  
- **抓取 + 自建检索/RAG**：Crawl2RAG、RagRabbit、Embedchain、DawnSearch、IntellilSearch  
- **搜索 API（可配合自建抓取）**：Tavily、Jina s.jina.ai  
- **AI 问答式搜索（自托管）**：**Perplexica**、**Farfalle**、**Turboseek**、**Sensei**、**LangChain-SearXNG**、**Perplexify**；本地知识库+引用问答：**GNO**。

**全网数据抓取 + 搜索** 的典型组合建议：

1. **自托管、全开源**：**Crawl4AI** 或 **Firecrawl** 做抓取 → 自建向量库（Qdrant/Milvus/pgvector 等）→ 自建检索与 RAG；或直接用 **RagRabbit** 一站完成爬虫+向量+搜索。  
2. **快速接 API**：**Tavily**（Search + Crawl + Extract）或 **Jina**（r.jina.ai + s.jina.ai）给 Agent 做全网检索与页面转 Markdown。  
3. **站级/知识库级 RAG**：**Embedchain** 加网页/sitemap 数据源，或 **Crawl2RAG**（依赖 Tavily Crawl）做「整站→可问可搜」。

---

## 六、数据来源与备注

- 检索词：open source LLM web crawler, AI agent web scraping, RAG web crawl search, Firecrawl Jina Reader, Perplexity alternative self-hosted, Farfalle Turboseek Sensei LangChain-SearXNG, GNO local knowledge。  
- 星数/许可以 GitHub 与官方文档为准，部分项目未核对最新 license。  
- Crawl2Rag 仓库已归档，仍可参考实现；Tavily 为商业 API + 免费额度，非完全自托管。

---

## 七、选型速查

| 需求 | 优先考虑 |
|------|----------|
| 自托管爬虫，输出给 LLM/RAG | **Crawl4AI**（功能最全）、**Firecrawl**（整站+JS）、**ForgeCrawl**（极简、SQLite） |
| 单 URL 转 Markdown，免自建 | **Jina Reader**（r.jina.ai）、**Tavily Extract** |
| 整站/知识库可问可搜（RAG） | **RagRabbit**（一站）、**Embedchain**（多源）、**Crawl2RAG**（依赖 Tavily） |
| 全网「问一句得带引用答案」（Perplexity 类） | **Perplexica**（功能最全）、**Farfalle**（Python 栈）、**Turboseek**（轻量无向量库）、**LangChain-SearXNG**（中文社区） |
| 只搜本地文档、要引用答案 | **GNO**（gno ask，MCP/SKILL） |
| Agent 用搜索/抓取 API | **Tavily**（Search+Extract+Crawl）、**Jina**（r.jina.ai + s.jina.ai） |
