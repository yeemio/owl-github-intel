# Owl GitHub Intelligence

[![ci](https://github.com/yeemio/owl-github-intel/actions/workflows/ci.yml/badge.svg)](https://github.com/yeemio/owl-github-intel/actions/workflows/ci.yml)

This workspace stores and maintains external AI ecosystem intelligence for OwlClaw.

If you are a researcher, architect, or builder, this repository is meant to be navigated as a research trail, not a dump folder.

License: MIT (see `LICENSE`).

## Start Here

- Portal (GitHub Pages): `https://yeemio.github.io/owl-github-intel/50-publish/site/`
- Docs overview: `docs/OVERVIEW.md`
- Main entrypoint: `index/MASTER_INDEX.md`
- Browse entrypoint: `index/BROWSE_BY_TOPIC.md`
- Change log: `index/CHANGELOG.md`
- Research trail map: `index/RESEARCH_TRAIL_MAP.md`
- 7-day guided path: `index/START_HERE_7_DAY_PATH.md`
- High-value question bank: `index/HIGH_VALUE_RESEARCH_QUESTIONS.md`
- Researcher quickstart: `index/QUICKSTART_FOR_RESEARCHERS.md`
- Public project overview: `publish/overview_public.md`
- Static portal (EN/ZH): `50-publish/site/index.html` (recommended entrypoint: `/50-publish/site/`)
- Bilingual content pages: `50-publish/site/content/en/` and `50-publish/site/content/zh/`

## Directory Layout

- `index/`: navigation and reading paths
- `sources/`: raw scans and source snapshots
- `analysis/`: topic and cross-topic analysis reports
- `data/`: curated datasets (master + risks)
- `insights/`: current adoption decisions
- `publish/`: publish-ready external-facing outputs (digests, overview)
- `50-publish/site/`: static portal (kept for GitHub Pages path stability)
- `99-archive/`: deprecated or internal-only documents

## Current Core Files

- `data/master/repo_master.csv`
- `insights/adoption_backlog.md`
- `analysis/cross/deep_ai_dev_landscape_2026-03-09.md`
- `analysis/cross/deep_ai_dev_repo_map_2026-03-09.csv`

## Docs

- `docs/OVERVIEW.md`
- `docs/METHODOLOGY.md`
- `docs/DATA_SCHEMA.md`
- `docs/GLOSSARY.md`
- `docs/FAQ.md`

## Update Rule

Every update should:

1. Add/refresh source artifacts.
2. Update curated datasets under `data/`.
3. Reflect decisions in `insights/`.
4. Append one line to `index/CHANGELOG.md`.

## Portal (Optional)

The static portal lives in `50-publish/site/` and must be served over HTTP (browsers block ES modules and `fetch` on `file://`).

- Start server from repo root: `python -m http.server 3765`
- Open: `http://localhost:3765/50-publish/site/`
- Link check: `node 50-publish/site/check-portal-links.js` (Node 18+)

## Contributing and Security

- Contributing guide: `CONTRIBUTING.md`
- Code of conduct: `CODE_OF_CONDUCT.md`
- Security policy: `SECURITY.md`
