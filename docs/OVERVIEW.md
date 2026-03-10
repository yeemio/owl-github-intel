# Overview

Owl GitHub Intelligence is an evidence-led research publication about the AI development ecosystem.
It turns scattered public signals (issues, PRs, releases, docs) into decision-ready artifacts: datasets, risk intelligence, and adoption guidance.

## What You Get

- A static portal for browsing: `50-publish/site/` (GitHub Pages-friendly)
- Core datasets (CSV/MD) you can reuse:
  - `20-normalized/repo_master_latest.csv` (master repo map + decision fields)
  - `40-insights/adoption_backlog_latest.md` (current adoption recommendations)
  - `40-insights/risks/failure-patterns.csv` (recurring failure signatures)
  - `40-insights/risks/upgrade-risk-matrix.csv` (upgrade/migration risks)
- Publish outputs:
  - `50-publish/weekly_digest_*.md` (cycle digests)

## What This Is Not

- Not an internal team runbook or an execution workflow guide.
- Not a “best tools list” without evidence.
- Not a promise of correctness or freshness; treat outputs as decision inputs and verify critical points.

## Fast Start (10 minutes)

1. Open the portal: `50-publish/site/`
2. Read the latest adoption plan: `40-insights/adoption_backlog_latest.md`
3. Check risks:
   - `40-insights/risks/failure-patterns.md`
   - `40-insights/risks/upgrade-risk-matrix.md`
4. If you need full context, jump into `30-analysis/` by topic.

## How To Contribute

See `CONTRIBUTING.md`. If you add new conclusions, include sources and update the relevant dataset row(s).

