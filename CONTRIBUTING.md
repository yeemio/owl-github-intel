# Contributing

This repo is a research workspace. Contributions should improve evidence quality, reproducibility, and decision usefulness.

## Quick Start

1. Read `index/MASTER_INDEX.md`.
2. Read `index/THREE_WINDOW_WORKFLOW.md` (the fixed A/B/C cycle workflow).
3. Use `index/WINDOW_ASSIGNMENTS_NOW.md` to follow the current cycle prompts and output paths.

## What To Contribute

- New evidence scans (raw sources, issue/PR/release links) under `sources/scans/`.
- Deduped, normalized entries in `data/master/repo_master.csv`.
- Topic or cross-topic analysis under `analysis/`.
- Decision-ready backlog updates in `insights/adoption_backlog.md`.
- Risk intelligence updates under `data/risks/`.
- Publish-ready outputs (digests, portal content) under `50-publish/`.

## Contribution Rules (Non-Negotiable)

- No secrets. Never paste API keys, tokens, credentials, or private URLs.
- No unsourced claims. Any claim that enters datasets or analysis must carry source URLs.
- Prefer primary sources. Issues/PRs/releases are higher value than blog summaries.
- Keep filenames date + cycle consistent (see `index/THREE_WINDOW_WORKFLOW.md`).
- Keep changes focused. One PR should ideally correspond to one cycle output or one quality fix.

## Local Portal (Optional)

The portal is static and must be served from the repo root (browsers block ES modules on `file://`).

- Start server from repo root: `python -m http.server 3765`
- Open: `http://localhost:3765/50-publish/site/`
- Link check: `node 50-publish/site/check-portal-links.js` (requires Node 18+)

## Pull Request Checklist

- I did not add secrets.
- I updated `index/CHANGELOG.md` if this is a cycle output.
- I followed the required output paths and naming conventions for the cycle.
- I ran at least one validation step:
  - Portal link check (if portal content changed), or
  - CSV sanity check (if datasets changed).

