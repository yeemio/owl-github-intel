# Handoff B → C (2026-03-09 C8)

Theme: **Crawl/Search 栈采纳信号与风险证据**

## B Deliverables

- **matrix:** `analysis/cross/challenge_matrix_2026-03-09_C8.csv`
- **log:** `analysis/cross/challenge_log_2026-03-09_C8.md`
- **challenged claims:** 14
- **verdict coverage:** 100%

## Summary Counts

| Verdict | Count |
|---------|-------|
| survives | 0 |
| partial | 13 |
| fails | 1 |

**Failed claim:** C8-A12（选型与分类仅依内部 analysis/crawl 归纳，采纳信号需外部验证或显式标注）。

## Top 3 Risks for C

1. **采纳信号仅依内部归纳（C8-A12 fails）**  
   选型与分类若仅来自 analysis/crawl 文档与 CSV、无外部采纳案例或 star/issue 趋势，不可单独作为采纳决策依据。C 须补充外部来源（GitHub 活跃度、第三方博客或集成案例），或在 crawl 栈结论处显式标注「内部归纳、待外部验证」。

2. **Jina vs Firecrawl 等对比无同条件基准（C8-A05 等）**  
   「Jina 失败、Firecrawl 通过」类结论为用户自述，非同 URL/同时间/同 Agent 的对照。C 勿将此类表述作为公平对比结论；可记为「已报告的站点/鉴权差异」并注明需对照实验验证。

3. **Crawl4AI / Firecrawl 采纳与升级表述需可操作化**  
   兼容性、超时、安全联系、自托管与集成等多为 partial：证据有效但需版本、配置与修复状态纳入采纳清单与升级矩阵。C 需在 repo_master / adoption_backlog 中为 Crawl4AI、Firecrawl 等补充版本兼容、迁移/pin 与检查项。

## Suggested C Actions

1. **C8-A12（fails）**  
   - 在 analysis/crawl 或采纳结论中：补充外部来源（如 GitHub activity、第三方集成案例），或显式标注「内部归纳、待外部验证」。  
   - 不得将内部归纳单独作为「采纳信号」依据写入决策或 digest。

2. **Crawl 栈主表与采纳清单**  
   - 若有 Crawl/Search 相关 repo 优先级或风险调整：更新 `repo_master_latest.csv`、`adoption_backlog_latest.md`。  
   - 为 Crawl4AI、Firecrawl 等补充：版本与兼容性、超时与安全联系、自托管与 RAG 集成 caveat、迁移/pin 建议（含 C8-A09 破坏性变更）。  
   - 在 crawl 栈 ADR 或等价文档中标注已知兼容性限制（如 C8-A01–A04）。

3. **对比与风险表述**  
   - Jina/Perplexica/Farfalle/Turboseek 的站点差异、token/功能缺口：不做无数据的竞品对比结论；可标为「已报告差异」或「能力缺口」并附 issue/PR 状态或解决时间。  
   - Firecrawl「采纳信号」：区分「功能信号」（release 功能）与「采纳证据」（star、集成案例）；自托管与 RAG 集成补充 caveat 与修复跟踪。

4. **Weekly digest 与 CHANGELOG**  
   - 在 `weekly_digest_2026-03-09_C8.md` 中简述本轮 Crawl/Search 证据与 B 挑战结果；被拒 claim（C8-A12）及 C 的处置（补充外部或标注待验证）。  
   - 在 CHANGELOG 追加一行 C8 摘要；在 CYCLE_SCOREBOARD 中补全 C8 行（theme=crawl_search_adoption，含 b_challenged=14, b_failed_claims=1 等）。

## Priority Warning

C8-A12 为唯一 fails：若 C 未补充外部来源或未标注「待外部验证」，crawl 栈的采纳结论将保留「仅内部归纳」的决策风险，不符合「采纳信号需可验证来源」的审校标准。
