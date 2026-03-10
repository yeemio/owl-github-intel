# Owl GitHub Intel - Master Index

Last updated: 2026-03-09 (restructured)
Owner: OwlClaw intel workspace

---

## What this is

This is the primary entrypoint for ongoing external AI ecosystem intelligence.
Use this page first, then jump by topic or output type.

## Quick Navigation

- Browse by topic: `00-index/BROWSE_BY_TOPIC.md`
- Change history: `00-index/CHANGELOG.md`
- File catalog: `00-index/FILE_CATALOG.md`
- Research trail map: `00-index/RESEARCH_TRAIL_MAP.md`
- 7-day guided route: `00-index/START_HERE_7_DAY_PATH.md`
- High-value questions: `00-index/HIGH_VALUE_RESEARCH_QUESTIONS.md`
- Researcher quickstart: `00-index/QUICKSTART_FOR_RESEARCHERS.md`
- Public overview page: `50-publish/PROJECT_OVERVIEW_PUBLIC.md`
- Static portal (EN/ZH): `50-publish/site/index.html`
- Master normalized repo table: `20-normalized/repo_master_latest.csv`
- Current adoption plan: `40-insights/adoption_backlog_latest.md`

## Current Status

- Dataset mode: active rolling updates
- Index coverage: agent / mcp / rag / gateway / eval / security
- Priority phase: consolidate + deduplicate + decision-ready outputs

## Core Deliverables (existing)

- Landscape synthesis:
  - `30-analysis/cross/deep_ai_dev_landscape_2026-03-09.md`
  - `10-raw/scans/github_ai_external_deep_scan_2026-03-09.md`
- Repo maps:
  - `30-analysis/cross/deep_ai_dev_repo_map_2026-03-09.csv`
  - `10-raw/scans/github_ai_external_deep_scan_2026-03-09.csv`
  - `10-raw/scans/github_ai_ecosystem_scan_2026-03-09.csv`
- Failure intelligence:
  - `40-insights/risks/failure-patterns.md`
  - `40-insights/risks/failure-patterns.csv`
- Upgrade risk:
  - `40-insights/risks/upgrade-risk-matrix.md`
  - `40-insights/risks/upgrade-risk-matrix.csv`
- Track reports:
  - `30-analysis/agent/w1_agent_orchestration_analysis.md`
  - `30-analysis/mcp/w2_mcp_ecosystem_analysis.md`
  - `30-analysis/rag/w3_rag_data_analysis.md`
  - `30-analysis/gateway/w4_inference_gateway_analysis.md`
  - `30-analysis/eval/w5_eval_observability_analysis.md`
  - `30-analysis/security/w6_ai_security_governance_analysis.md`
  - `30-analysis/cross/w7_case_studies.md`

## Weekly Operating Loop

1. Add new raw scans to `10-raw/` with date in filename.
2. Merge and deduplicate into `20-normalized/repo_master_latest.csv`.
3. Update conclusions in `30-analysis/` and decisions in `40-insights/`.
4. Append one-line update into `00-index/CHANGELOG.md`.
5. Refresh this `MASTER_INDEX.md` updated date and active priorities.

## Active Priorities

- P0: Keep a clean Top 100 with relevance/risk/adoption tags.
- P1: Maintain failure and upgrade intelligence with source links.
- P2: Publish an external digest from `50-publish/`.
