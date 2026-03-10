# Changelog

## 2026-03-09 (continued)

- **C 收口加固（约 30 分钟）**：failure-patterns.csv 新增 cross-track C9-A18（失败类型频次与生产根因对齐 caveat）；adoption_backlog 例外政策补充「临时例外须含自动化到期」及 C9-A20 引用、C8 Crawl 节补充「内部归纳、待外部验证」；CURRENT_CYCLE 标 C9 已收口、C10 预备与历史；30-analysis/crawl/README 采纳结论标注待外部验证；THREE_WINDOW_WORKFLOW 增加 C 每轮必做检查两条。
- **C9 Decision Desk 收口**：主题全轨道采纳信号+失败模式复核；已消费 A+B C9 产出；更新 upgrade-risk-matrix（例外政策须自动化到期 C9-A20、网关级联 runbook C9-A08）、adoption_backlog；C9-A20 判 fails 并纳入风险与 digest；weekly_digest_2026-03-09_C9.md 文末「下轮 5 个未知」含 B 的 top 5 风险中 ≥2 条闭环；CYCLE_SCOREBOARD 新增 C9 行。
- **排期文档**：新增 `00-index/CURRENT_CYCLE.md`，写明当前周期 C9、主题、A/B/C 任务概要、产出路径、提示词所在、下一轮预备；MASTER_INDEX 增「当前排期」表与链接，THREE_WINDOW_WORKFLOW 增 CURRENT_CYCLE 链接，便于一眼看到「排了啥」。
- **C9 分配（加量）**：更新 `WINDOW_ASSIGNMENTS_NOW.md` 为 C9；主题「全轨道采纳信号 + 失败模式复核」；A 要求六轨覆盖 + C8 未知深挖（≥45 URL，≥18 claim），B 要求全部挑战 + handoff 含 top 5 风险与 3 条建议行动，C 要求更新至少一个 risk 文件且 digest 下轮未知引用 B top 5 中≥2 条；文末增加 C10 预备说明。
- **C8 Decision Desk 收口**：主题 Crawl/Search 栈采纳信号；已消费 A 的 scan/evidence/handoff 与 B 的 challenge 产出（B 内容与主题错位，为升级风险/跨轨）；按 A 证据更新 adoption_backlog（Crawl/Search P2 条件项）、upgrade-risk-matrix、repo_master；已写 weekly_digest_2026-03-09_C8.md、CYCLE_SCOREBOARD C8 行；无新 P0。
- **3 窗口工作流固化**：新增 `00-index/THREE_WINDOW_WORKFLOW.md`，固定「统筹 + A/B/C」角色、单轮周期结构、产出路径命名、执行顺序、手递手规则、进入下一轮方式；MASTER_INDEX 与 WINDOW_ASSIGNMENTS_NOW 已链入，便于持续使用。
- **3 窗口 C8 分配 + 统筹**：更新 `00-index/WINDOW_ASSIGNMENTS_NOW.md`：周期 C8、主题 Crawl/Search 栈采纳信号；窗口 A（Evidence Miner）、B（Red Team）、C（Decision Desk）各带复制用提示词与产出路径；新增「统筹」流程（发布→等待→收口→报告），收口时由统筹窗口执行 git commit/push。
- **Crawl & search 收口**：补全 `30-analysis/crawl/`：新增 `README.md` 目录与分类速览；主文档第二节补许可/星数、新增第七节「选型速查」表；CSV 修正 Jina Reader self_hosted=no、Embedchain stars≈20k；BROWSE_BY_TOPIC 增加 crawl 目录链接。
- **C6 Decision Desk pass**: Applied survives/partial/fails rule; rejected C6-B-018 (pipeline backbones P2-only); updated adoption_backlog_latest.md, upgrade-risk-matrix.csv, weekly_digest_2026-03-09_C6.md, CYCLE_SCOREBOARD.csv; no new P0 promotions.
- **Crawl & search intel**: Added `30-analysis/crawl/llm_web_crawl_search_2026-03-09.md` and `.csv` — open-source projects for LLM + web crawl/search (Crawl4AI, Firecrawl, Jina Reader, ForgeCrawl, Crawl2RAG, RagRabbit, Embedchain, Tavily, etc.). BROWSE_BY_TOPIC updated with Crawl & Search section.
- Added `00-index/WINDOW_ASSIGNMENTS_NOW.md`: C6 cycle assignment for 3 windows (A: Evidence Miner, B: Red Team, C: Decision Desk); theme: upgrade risk + cross-track; copy-paste prompts and output paths included. MASTER_INDEX linked to WINDOW_ASSIGNMENTS_NOW.

## 2026-03-09

- Created structured intel workspace folders:
  - `00-index`, `10-raw`, `20-normalized`, `30-analysis`, `40-insights`, `50-publish`, `99-archive`
- Added operational entrypoints:
  - `00-index/MASTER_INDEX.md`
  - `00-index/BROWSE_BY_TOPIC.md`
  - `00-index/CHANGELOG.md`
- Added normalized master table seed:
  - `20-normalized/repo_master_latest.csv`
- Added rolling adoption decision file:
  - `40-insights/adoption_backlog_latest.md`
- Updated root `README.md` to point to indexed workflow.
- Migrated legacy root files into structured folders:
  - raw scans -> `10-raw/scans/`
  - seed files -> `10-raw/seeds/`
  - topic reports -> `30-analysis/{agent,mcp,rag,gateway,eval,security,cross}/`
  - risk and upgrade intelligence -> `40-insights/risks/`
  - backlog snapshots -> `40-insights/backlogs/`
- Updated navigation documents to new paths:
  - `00-index/MASTER_INDEX.md`
  - `00-index/BROWSE_BY_TOPIC.md`
- Added publication and researcher onboarding pages:
  - `50-publish/PROJECT_OVERVIEW_PUBLIC.md`
  - `00-index/QUICKSTART_FOR_RESEARCHERS.md`
- Updated top-level navigation links:
  - `README.md`
  - `00-index/MASTER_INDEX.md`
- Upgraded three-window runbook to V2:
  - `00-index/THREE_WINDOW_EXECUTION_PLAN.md`
  - changed from linear pipeline to discover/challenge/decide adversarial loop
- Upgraded three-window runbook to V3 command-center style:
  - stricter 70-minute cycle
  - copy-paste prompts for each window
  - kill rules for shallow cycles
  - 8-cycle theme program
  - added scoreboard: `00-index/CYCLE_SCOREBOARD.csv`
- Added static portal with language switching:
  - `50-publish/site/index.html`
  - `50-publish/site/styles.css`
  - `50-publish/site/app.js`
- Added bilingual content pages (not navigation-only translation):
  - `50-publish/site/content/en/*.html`
  - `50-publish/site/content/zh/*.html`
  - shared style: `50-publish/site/content/styles-content.css`
- Completed bilingual topic page set and linked topic hubs to language-matched pages:
  - `topic-agent`, `topic-mcp`, `topic-rag`, `topic-gateway`, `topic-eval`, `topic-security`
- Window C cycle C1 decision pass completed:
  - updated `20-normalized/repo_master_latest.csv` with decision verdicts and explicit risk/rollback signals
  - updated `40-insights/adoption_backlog_latest.md` with C1 adjudication notes and rejected claims
  - updated `40-insights/risks/upgrade-risk-matrix.csv` with MCP/gateway/retrieval upgrade risks
  - updated `00-index/CYCLE_SCOREBOARD.csv` with C1 provisional score and outcomes
  - published `50-publish/weekly_digest_2026-03-09_C1.md`

- Window C cycle C1 finalized with B-challenge inputs:
  - consumed `10-raw/scans/scan_2026-03-09_A_C1.md` and `30-analysis/cross/challenge_matrix_2026-03-09_C1.csv`
  - updated `20-normalized/repo_master_latest.csv` with challenge-informed verdict/source/risk/rollback fields
  - rewrote `40-insights/adoption_backlog_latest.md` to remove provisional/duplicate notes and record failed claim IDs
  - appended C1-specific entries to `40-insights/risks/upgrade-risk-matrix.csv`
  - published final (non-provisional) `50-publish/weekly_digest_2026-03-09_C1.md`

- Window C cycle C2 finalized (conditionalization pass):
  - consumed A/B C2 handoffs and converted recommendations to trigger-based policies
  - updated `20-normalized/repo_master_latest.csv` with `adoption_profile/trigger_threshold/exception_policy`
  - rewrote `40-insights/adoption_backlog_latest.md` as C2 conditional-final backlog
  - appended temporary-exception governance risk to `40-insights/risks/upgrade-risk-matrix.csv`
  - published `50-publish/weekly_digest_2026-03-09_C2.md`
