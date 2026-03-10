# Research Trail Map

This map is designed for readers who want to "follow the trail" from broad landscape to decision-ready insights.

## Trail A: Understand the AI Dev Stack Fast (90 minutes)

1. Read cross-layer synthesis:
   - `analysis/cross/deep_ai_dev_landscape_2026-03-09.md`
2. Open topic navigator:
   - `index/BROWSE_BY_TOPIC.md`
3. Check normalized shortlist:
   - `data/master/repo_master.csv`
4. End with current decisions:
   - `insights/adoption_backlog.md`

Outcome: You get a complete mental map and a concrete priority list.

## Trail B: Validate What Breaks in Production (2-3 hours)

1. Failure pattern summary:
   - `data/risks/failure-patterns.md`
2. Failure raw table:
   - `data/risks/failure-patterns.csv`
3. Upgrade and breakage matrix:
   - `data/risks/upgrade-risk-matrix.md`
   - `data/risks/upgrade-risk-matrix.csv`
4. Compare with architecture benchmark:
   - `analysis/cross/architecture-decision-benchmark.md`

Outcome: You identify recurring breakpoints before adopting tools.

## Trail C: Go Deep by Topic (half-day)

Pick one track and follow the same pattern:

1. Topic analysis narrative (`analysis/<topic>/*.md`)
2. Topic evidence matrix (`analysis/<topic>/*.csv`)
3. Decision implications (`insights/adoption_backlog.md`)

Suggested topic order for platform teams:

1) `mcp` -> 2) `gateway` -> 3) `eval` -> 4) `security` -> 5) `rag` -> 6) `agent`

## Trail D: Reproduce the Research Process (for contributors)

1. Ingest new material:
   - add files into `sources/scans/` and `sources/seeds/`
2. Normalize:
   - update `data/master/repo_master.csv`
3. Analyze:
   - write/update in `analysis/`
4. Decide:
   - update `insights/adoption_backlog.md`
5. Record:
   - append to `index/CHANGELOG.md`

Outcome: New contributions stay compatible with existing structure.

## What Makes This Repository Worth Studying

- It connects ecosystem discovery to architecture decisions.
- It preserves both narrative reports and structured evidence.
- It includes risk-first intelligence, not only tool popularity.
- It is organized so new researchers can continue from current state.
