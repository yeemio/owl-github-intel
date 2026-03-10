# Methodology

This repo optimizes for evidence density and decision usefulness.

## Evidence First

Preferred source types (highest to lowest):

1. GitHub issues / PRs / releases (primary operational signals)
2. Official docs and migration guides
3. Benchmarks or reproducible experiments (with clear setup)
4. Blog posts (only as supporting context)

## From Evidence to Decisions

The repository maintains a small set of “official” decision assets:

- `data/master/repo_master.csv`: the canonical repo table (with risks and rollback signals)
- `insights/adoption_backlog.md`: the current shortlist and adoption posture
- `data/risks/*.csv|*.md`: risk intelligence (failure + upgrade)

Other files are supporting context or publications (digests, deep dives).

## Handling Uncertainty

If evidence is insufficient, the correct outcome is:

- record the uncertainty explicitly,
- avoid comparative claims,
- and propose the minimum experiment or data needed to decide.

## Maintenance Rules

- Do not commit secrets.
- Avoid “internal-only” process docs in the main navigation. Archive them under `99-archive/` if needed.
- Keep datasets stable: treat schema changes as breaking and document them.

