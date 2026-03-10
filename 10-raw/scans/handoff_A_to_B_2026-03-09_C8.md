# Handoff A -> B (2026-03-09 C8)

Theme: Crawl/Search 栈采纳信号与风险证据

## A Window Hard Metric Status

- source_count >= 30: PASS（44 条证据，≥30 唯一来源 URL）
- hard_evidence_count >= 10 (issue/PR/release): PASS（41 来自 issue/release）
- 每条结论均有来源 URL：PASS

## Claims To Challenge

- **C8-A01**: Crawl4AI Docker API 与 schema 兼容性问题（from_serializable_dict 拒绝 type 字段）影响 0.8.x 升级。
- **C8-A02**: Crawl4AI MCP bridge 与 LLM 集成存在超时与安全配置问题，影响 Agent 采纳。
- **C8-A03**: Crawl4AI 策略与编码兼容性（BestFirstCrawlingStrategy、PDFContentScrapingStrategy、gbk）影响多语言与深度爬取采纳。
- **C8-A04**: Firecrawl v2 scrape parsers.mode 校验与 MCP/Google 模型兼容性影响自托管与 OpenCode 采纳。
- **C8-A05**: Jina Reader 与 Agent/MCP 集成存在站点差异与鉴权问题（Reddit、Thales、MCP Unauthorized）。
- **C8-A06**: Perplexica 存在 token 消耗、上下文超限、LM Studio 断开与 Docker 镜像可用性等采纳与运维风险。
- **C8-A07**: Farfalle 自托管在 Docker、模型选择与端口占用方面存在采纳摩擦。
- **C8-A08**: Turboseek 功能缺口（Regenerate、Docker、本地 LLM）影响与 Perplexica/Farfalle 的选型对比。
- **C8-A09**: Crawl4AI 版本升级存在显式破坏性变更（proxy_config、Python 3.10+）需迁移与兼容性评估。
- **C8-A10**: Firecrawl 采纳信号：Skill/MCP/CLI、Zod v4、自托管 ARM64 与 Agent 工作流增强。
- **C8-A11**: Firecrawl 自托管在 custom hostname、代理与部署配置上存在需求与问题。
- **C8-A12**: Crawl/Search 栈选型与分类由 30-analysis/crawl 文档与 CSV 归纳。
- **C8-A13**: Firecrawl 与下游 RAG/调试的集成：markdown URL 错误与 web-to-RAG 故障诊断需求。
- **C8-A14**: Perplexica 与 openclaw web_search 等前端/API 的集成需求（front-facing chat API）。

## Priority Attack Targets

1. **C8-A05**: Jina vs Firecrawl 的“站点通过/失败”是否同条件对比（同一 URL、同一时间、同一 Agent），还是仅用户自述。
2. **C8-A06**: Perplexica “extreme amount of tokens” 是否有可复现的基准或与竞品（Farfalle、Turboseek）的对比数据。
3. **C8-A10**: Firecrawl “采纳信号”是否应区分为“功能存在”与“实际采纳案例”（如 star 增长、集成文档、第三方引用）。
4. **C8-A12**: 仅依赖内部 30-analysis/crawl 归纳是否足以支撑“采纳信号与风险”结论，是否需补充 GitHub star/issue 趋势或第三方博客。

## Open Questions for B

- Crawl4AI 与 Firecrawl 在“自托管 + MCP + Agent”场景下的官方或社区集成案例（如 Claude Code、OpenCode）是否有公开清单或文档链接？
- Jina Reader 的 MCP Unauthorized 与 API key 校验逻辑是否已有官方说明或修复时间线？
- Perplexica 仓库若已更名为 Vane，issue 与 release 的归属与引用是否仍以 Perplexica 产品名为准？
- Turboseek 的 Docker / 本地 LLM 需求在 issue 中的状态（open/closed、是否有 PR）如何，是否影响“轻量无向量库”的选型结论？
- 30-analysis/crawl 中未覆盖的项目（如 ForgeCrawl、RagRabbit、Crawl2RAG）在本周期是否应纳入证据范围？

## Evidence and Scan References

- Evidence file: `D:\ai\owl-github-intel\10-raw\scans\evidence_2026-03-09_A_C8.csv`
- Scan file: `D:\ai\owl-github-intel\10-raw\scans\scan_2026-03-09_A_C8.md`
