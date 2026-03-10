# Owl GitHub Intel - Master Index

Last updated: 2026-03-09 (restructured)
Owner: Maintainers of this intel workspace (independent; originally built to support OwlClaw)

---

## What this is

This is the primary entrypoint for ongoing external AI ecosystem intelligence.
Use this page first, then jump by topic or output type.

## Quick Navigation

- Recommended start: `index/START_HERE.md`
- Browse by topic: `index/BROWSE_BY_TOPIC.md`
- Change history: `index/CHANGELOG.md`
- File catalog: `index/FILE_CATALOG.md`
- Research trail map: `index/RESEARCH_TRAIL_MAP.md`
- 7-day guided route: `index/START_HERE_7_DAY_PATH.md`
- High-value questions: `index/HIGH_VALUE_RESEARCH_QUESTIONS.md`
- Researcher quickstart: `index/QUICKSTART_FOR_RESEARCHERS.md`
- Public overview page: `publish/overview_public.md`
- Static portal (EN/ZH): `50-publish/site/index.html`
- Master normalized repo table: `data/master/repo_master.csv`
- Current adoption plan: `insights/adoption_backlog.md`

## Current Status

- Dataset mode: active rolling updates
- Index coverage: agent / mcp / rag / gateway / eval / security
- Priority phase: consolidate + deduplicate + decision-ready outputs

## Core Deliverables (existing)

- Landscape synthesis:
  - `analysis/cross/deep_ai_dev_landscape_2026-03-09.md`
  - `sources/scans/github_ai_external_deep_scan_2026-03-09.md`
- Repo maps:
  - `analysis/cross/deep_ai_dev_repo_map_2026-03-09.csv`
  - `sources/scans/github_ai_external_deep_scan_2026-03-09.csv`
  - `sources/scans/github_ai_ecosystem_scan_2026-03-09.csv`
- Failure intelligence:
  - `data/risks/failure-patterns.md`
  - `data/risks/failure-patterns.csv`
- Upgrade risk:
  - `data/risks/upgrade-risk-matrix.md`
  - `data/risks/upgrade-risk-matrix.csv`
- Track reports:
  - `analysis/agent/w1_agent_orchestration_analysis.md`
  - `analysis/mcp/w2_mcp_ecosystem_analysis.md`
  - `analysis/rag/w3_rag_data_analysis.md`
  - `analysis/gateway/w4_inference_gateway_analysis.md`
  - `analysis/eval/w5_eval_observability_analysis.md`
  - `analysis/security/w6_ai_security_governance_analysis.md`
  - `analysis/cross/w7_case_studies.md`

## Weekly Operating Loop

1. Add new raw scans to `sources/` with date in filename.
2. Merge and deduplicate into `data/master/repo_master.csv`.
3. Update conclusions in `analysis/` and decisions in `insights/`.
4. Append one-line update into `index/CHANGELOG.md`.
5. Refresh this `MASTER_INDEX.md` updated date and active priorities.

## Active Priorities

- P0: Keep a clean Top 100 with relevance/risk/adoption tags.
- P1: Maintain failure and upgrade intelligence with source links.
- P2: Publish an external digest from `publish/`.
