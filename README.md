# Owl GitHub Intel

[![ci](https://github.com/yeemio/owl-github-intel/actions/workflows/ci.yml/badge.svg)](https://github.com/yeemio/owl-github-intel/actions/workflows/ci.yml)

Owl GitHub Intel is an evidence-led research publication about the AI development ecosystem.
It turns scattered public signals (issues, PRs, releases, docs) into decision-grade artifacts:
datasets, risk intelligence, and adoption guidance.

Part of a broader local-first AI tooling stack by [yeemio](https://github.com/yeemio).
Related public repos: [owlcc-byoscc](https://github.com/yeemio/owlcc-byoscc), [owlclaw-core](https://github.com/yeemio/owlclaw-core), [omlx-runtime-hardening](https://github.com/yeemio/omlx-runtime-hardening).

This repository is independent. It was originally built to support OwlClaw, but it is not an OwlClaw codebase or documentation site.

If you are a researcher, architect, or builder, this repository is meant to be navigated as a research trail, not a dump folder.

License: MIT (see `LICENSE`).

## Start Here

- Portal (GitHub Pages): `https://yeemio.github.io/owl-github-intel/50-publish/site/`
- Single entrypoint: `index/START_HERE.md`
- Latest one-page brief: `publish/LATEST.md`
- 10-minute decision kit: `publish/starter_pack.md`
- Bring your stack: `docs/BRING_YOUR_STACK.md`
- Core dataset: `data/master/repo_master.csv`

If you prefer reading without the portal:
- Master index: `index/MASTER_INDEX.md`
- Docs overview: `docs/OVERVIEW.md`
- Public overview: `publish/overview_public.md`

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
