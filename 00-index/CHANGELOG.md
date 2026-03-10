# Changelog

## 2026-03-09 (continued)

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
