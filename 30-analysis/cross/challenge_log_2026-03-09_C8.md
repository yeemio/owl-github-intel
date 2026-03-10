# Challenge Log C8 (Window B)

## Cycle Metadata

- **cycle_id:** C8
- **date:** 2026-03-09
- **theme:** Crawl/Search 栈采纳信号与风险证据
- **reviewer_window:** B (Red Team Reviewer)
- **input_scope:**
  - `10-raw/scans/scan_2026-03-09_A_C8.md`
  - `10-raw/scans/evidence_2026-03-09_A_C8.csv`
  - `10-raw/scans/handoff_A_to_B_2026-03-09_C8.md`
- **output_matrix:** `30-analysis/cross/challenge_matrix_2026-03-09_C8.csv`

## Hard-Metric Check

| Requirement | Target | Actual | Pass |
|-------------|--------|--------|------|
| claims_challenged | ≥ 12 | 14 | ✓ |
| counter_sources | ≥ claims_challenged | 14 | ✓ |
| every_claim_has_verdict | true | true | ✓ |

## Verdict Distribution

| Verdict | Count |
|---------|-------|
| survives | 0 |
| partial | 13 |
| fails | 1 |

## Per-Claim Summary and Verdict

### C8-A01 — partial
**Claim:** Crawl4AI Docker API 与 schema 兼容性问题（from_serializable_dict 拒绝 type 字段）影响 0.8.x 升级。  
**Challenge:** 问题可能仅限特定 schema 或 0.8.0；后续 patch 或 schema 形态 workaround 可能已存在。  
**Counter source:** https://github.com/unclecode/crawl4ai/issues/1797  
**Verdict:** partial — C 需在采纳清单中注明受影响 schema 形态及可用修复版本。

### C8-A02 — partial
**Claim:** Crawl4AI MCP bridge 与 LLM 集成存在超时与安全配置问题，影响 Agent 采纳。  
**Challenge:** 5s 超时可能可配置；Redis/安全联系方式可能是流程缺口而非代码缺陷。  
**Counter source:** https://github.com/unclecode/crawl4ai/issues/1769  
**Verdict:** partial — C 需将超时配置与安全联系渠道纳入采纳检查项。

### C8-A03 — partial
**Claim:** Crawl4AI 策略与编码兼容性（BestFirstCrawlingStrategy、PDFContentScrapingStrategy、gbk）影响多语言与深度爬取采纳。  
**Challenge:** 可能为边缘场景或已在 main 修复；需确认 issue 仍 open 及影响范围。  
**Counter source:** https://github.com/unclecode/crawl4ai/issues/1815  
**Verdict:** partial — C 在 crawl 栈 ADR 中将兼容性标为已知限制。

### C8-A04 — partial
**Claim:** Firecrawl v2 scrape parsers.mode 校验与 MCP/Google 模型兼容性影响自托管与 OpenCode 采纳。  
**Challenge:** 可能为版本相关或下一版已修复。  
**Counter source:** https://github.com/firecrawl/firecrawl/issues/2917  
**Verdict:** partial — C 在兼容性矩阵中补充 Firecrawl 版本及 OpenCode vs 托管环境。

### C8-A05 — partial
**Claim:** Jina Reader 与 Agent/MCP 集成存在站点差异与鉴权问题（Reddit、Thales、MCP Unauthorized）。  
**Challenge:** 「Jina 失败、Firecrawl 通过」为用户自述，非同 URL/同时间/同 Agent 的对照实验。  
**Counter source:** https://github.com/jina-ai/reader/issues/1229  
**Verdict:** partial — C 在无对照基准前勿作为公平对比结论；可记为「已报告的站点差异」。

### C8-A06 — partial
**Claim:** Perplexica 存在 token 消耗、上下文超限、LM Studio 断开与 Docker 镜像可用性等采纳与运维风险。  
**Challenge:** 「极端 token」与断开未与 Farfalle/Turboseek 做基准对比；可能与模型或配置有关。  
**Counter source:** https://github.com/ItzCrazyKns/Perplexica/issues/1031  
**Verdict:** partial — C 补充 token 与 context 相关 caveat；无数据时不表述为对比风险。

### C8-A07 — partial
**Claim:** Farfalle 自托管在 Docker、模型选择与端口占用方面存在采纳摩擦。  
**Challenge:** 证据为 2025-03/08 的 issue；可能已修复或有文档 workaround。  
**Counter source:** https://github.com/rashadphz/farfalle/issues/108  
**Verdict:** partial — C 确认 issue 状态并将解决/修复时间纳入采纳说明。

### C8-A08 — partial
**Claim:** Turboseek 功能缺口（Regenerate、Docker、本地 LLM）影响与 Perplexica/Farfalle 的选型对比。  
**Challenge:** Feature request 不直接等于「不可采纳」；可能已在 roadmap 或 PR。  
**Counter source:** https://github.com/Nutlope/turboseek/issues/14  
**Verdict:** partial — C 标为能力缺口而非采纳阻断；有 roadmap/PR 时补充链接。

### C8-A09 — partial
**Claim:** Crawl4AI 版本升级存在显式破坏性变更（proxy_config、Python 3.10+）需迁移与兼容性评估。  
**Challenge:** 破坏性变更为事实；边界在于迁移文档是否完整。  
**Counter source:** https://github.com/unclecode/crawl4ai/releases/tag/v0.7.5  
**Verdict:** partial — C 在升级矩阵中补充迁移检查项与 pin/rollback 建议。

### C8-A10 — partial
**Claim:** Firecrawl 采纳信号：Skill/MCP/CLI、Zod v4、自托管 ARM64 与 Agent 工作流增强。  
**Challenge:** Release 说明体现的是「功能存在」而非采纳（star、第三方集成）。  
**Counter source:** https://github.com/firecrawl/firecrawl/releases/tag/v2.8.0  
**Verdict:** partial — C 若称「采纳信号」需区分「功能信号」或补充采纳类指标/外部引用。

### C8-A11 — partial
**Claim:** Firecrawl 自托管在 custom hostname、代理与部署配置上存在需求与问题。  
**Challenge:** 多为增强类需求；可能有文档化 workaround。  
**Counter source:** https://github.com/firecrawl/firecrawl/issues/2964  
**Verdict:** partial — C 在 Firecrawl 采纳条目中补充自托管配置 caveat。

### C8-A12 — fails
**Claim:** Crawl/Search 栈选型与分类由 30-analysis/crawl 文档与 CSV 归纳。  
**Challenge:** 选型与分类仅依赖内部归纳，无外部采纳案例或 star/issue 趋势；采纳信号不可仅据此决策。  
**Counter source:** ../../30-analysis/crawl/llm_web_crawl_search_2026-03-09.md  
**Verdict:** fails — C 须补充外部来源（GitHub 活跃度、第三方博客或集成案例），或显式标注「内部归纳、待外部验证」。

### C8-A13 — partial
**Claim:** Firecrawl 与下游 RAG/调试的集成：markdown URL 错误与 web-to-RAG 故障诊断需求。  
**Challenge:** Markdown URL 可能已修或有 workaround；RAG 调试为增强建议。  
**Counter source:** https://github.com/firecrawl/firecrawl/issues/2971  
**Verdict:** partial — C 纳入集成检查项并跟踪修复状态。

### C8-A14 — partial
**Claim:** Perplexica 与 openclaw web_search 等前端/API 的集成需求（front-facing chat API）。  
**Challenge:** 属功能需求而非风险；Perplexica 或已可作为后端使用。  
**Counter source:** https://github.com/ItzCrazyKns/Perplexica/issues/996  
**Verdict:** partial — C 记为 openclaw 集成能力缺口，不作为采纳阻断项。

## Failed Claim (C Action Required)

- **C8-A12:** Crawl/Search 栈选型与分类由 30-analysis/crawl 文档与 CSV 归纳。  
  - **Why failed:** 采纳信号与风险结论若仅依内部归纳、无外部采纳案例或 star/issue 趋势，不足以作为采纳决策唯一依据。  
  - **Required C action:** 为 crawl 栈补充外部来源（GitHub activity、第三方博客或集成案例），或在文档中显式标注「内部归纳、待外部验证」，不得将内部归纳单独作为采纳信号依据。

## Red-Team Pattern Summary

1. **Crawl4AI / Firecrawl:** 多数 claim 有明确 issue/release 支撑，但需区分「影响范围」「是否已修复」「配置/流程 vs 代码缺陷」；C 需补充版本与兼容性矩阵、采纳检查项。  
2. **Jina / Perplexica / Farfalle / Turboseek:** 站点差异与 token/功能缺口缺乏对照基准或竞品数据；C 避免未验证的对比结论，可标为「已报告差异」或「能力缺口」。  
3. **采纳信号:** A10、A12 将 release 功能或内部归纳等同于「采纳信号」；B 要求区分「功能存在」与「采纳证据」，且 A12 判 fails，要求补充外部验证或显式免责。

## Mandatory Rewrite Requests for Window C

1. **C8-A12 (fails):** 采纳信号不可仅依 30-analysis/crawl 内部归纳；补充外部来源或标注「待外部验证」。  
2. **Crawl 栈 ADR / 采纳清单:** 增加 Crawl4AI/Firecrawl 版本与兼容性、超时与安全联系、自托管与集成检查项；C8-A09 纳入升级矩阵与迁移/pin 建议。  
3. **对比与风险表述:** Jina vs Firecrawl、Perplexica token/context 等不做无数据的对比结论；Turboseek/Farfalle 记为能力缺口并附 issue/PR 状态。  
4. **Firecrawl 采纳条目:** 区分「功能信号」与「采纳证据」；自托管与 RAG 集成补充 caveat 与修复跟踪。
