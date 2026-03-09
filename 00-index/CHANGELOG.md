# Changelog

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
