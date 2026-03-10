# Overview

Owl GitHub Intelligence is an evidence-led research publication about the AI development ecosystem.
It turns scattered public signals (issues, PRs, releases, docs) into decision-ready artifacts: datasets, risk intelligence, and adoption guidance.

## What You Get

- A static portal for browsing: `50-publish/site/` (GitHub Pages-friendly)
- Core datasets (CSV/MD) you can reuse:
  - `data/master/repo_master.csv` (master repo map + decision fields)
  - `insights/adoption_backlog.md` (current adoption recommendations)
  - `data/risks/failure-patterns.csv` (recurring failure signatures)
  - `data/risks/upgrade-risk-matrix.csv` (upgrade/migration risks)
- Publish outputs:
  - `publish/digests/weekly_digest_*.md` (cycle digests)

## What This Is Not

- Not an internal team runbook or an execution workflow guide.
- Not a “best tools list” without evidence.
- Not a promise of correctness or freshness; treat outputs as decision inputs and verify critical points.

## Fast Start (10 minutes)

1. Open the portal: `50-publish/site/`
2. Read the latest adoption plan: `insights/adoption_backlog.md`
3. Check risks:
   - `data/risks/failure-patterns.md`
   - `data/risks/upgrade-risk-matrix.md`
4. If you need full context, jump into `analysis/` by topic.

## How To Contribute

See `CONTRIBUTING.md`. If you add new conclusions, include sources and update the relevant dataset row(s).

