# Owl GitHub Intel

This repository is an evidence-led research publication about the AI developer ecosystem.
It exists to help builders make **faster** and **safer** decisions when adopting AI stacks (agents, MCP, RAG, gateways, eval, security).

## The customer value (what you can do with it)

- Build an adoption shortlist with clear posture (`P0/P1/P2`), boundaries, and rollback signals.
- Avoid common production failures by reusing a cross-repo failure signature library.
- Pre-empt breaking upgrades by tracking migration risk before you upgrade dependencies.
- Keep a decision record that is evidence-backed (issue/release links), not “vibes”.

## The outputs you can directly reuse

- Master dataset (filterable table): `../data/master/repo_master.csv`
- Adoption decisions: `../insights/adoption_backlog.md`
- Risk intelligence:
  - `../data/risks/failure-patterns.md`
  - `../data/risks/upgrade-risk-matrix.md`
  - `../data/risks/master_risk_register_2026-03-09.csv`
- Digests: `../publish/digests/`

## Start (10 minutes)

1. Use the 10-minute decision kit: `../publish/starter_pack.md`
2. Read the current adoption list: `../insights/adoption_backlog.md`
3. Filter the master dataset by your track: `../data/master/repo_master.csv`
4. If you need depth, go to `../analysis/` by topic.

## What this is not

- Not an “awesome list” clone.
- Not a claim of correctness or freshness; treat outputs as decision inputs and verify critical points.
- Not tied to any single downstream system (it was originally built to support OwlClaw, but it is independent).
