# Three-Window Execution Plan

Purpose: run high-output research operations with only three active windows while preserving quality and update cadence.

Last updated: 2026-03-09

## Operating Model

- Window A = Intake + Evidence Mining
- Window B = Structuring + Normalization
- Window C = Insight Synthesis + Publishing

The three windows run in 50-minute cycles with strict handoff rules.

---

## Window A - Intake and Evidence Mining

## Mission

Collect high-signal external evidence and produce structured raw artifacts.

## Scope

- External searches and source collection
- Issue/PR/release evidence extraction
- Source credibility tagging

## Required Outputs per cycle

1. One raw scan markdown:
   - `10-raw/scans/scan_<date>_A_<cycle>.md`
2. One raw evidence csv:
   - `10-raw/scans/evidence_<date>_A_<cycle>.csv`
3. One handoff note:
   - `10-raw/scans/handoff_A_to_B_<date>_<cycle>.md`

## Mandatory fields in evidence csv

- `source_type` (repo/release/issue/pr/blog)
- `topic` (agent/mcp/rag/gateway/eval/security/cross)
- `claim`
- `evidence_excerpt`
- `url`
- `date_observed`
- `confidence` (high/medium/low)

## Quality bar

- Minimum 20 validated URLs per cycle
- At least 5 issue or PR links (not only README/blog)
- Every claim must have direct source references

---

## Window B - Structuring and Normalization

## Mission

Turn incoming raw evidence into clean, deduplicated, decision-ready datasets.

## Scope

- Deduplicate repositories and claims
- Normalize schema and tags
- Score relevance/risk/priority

## Required Outputs per cycle

1. Update:
   - `20-normalized/repo_master_latest.csv`
2. Update (if risk-related evidence exists):
   - `40-insights/risks/failure-patterns.csv`
   - `40-insights/risks/upgrade-risk-matrix.csv`
3. One handoff note:
   - `20-normalized/handoff_B_to_C_<date>_<cycle>.md`

## Normalization rules

- Repo name format must be `owner/repo`
- Merge duplicates by URL and canonical repo slug
- Keep strongest evidence when claims conflict
- Always set:
  - `relevance` (strong/medium/weak)
  - `risk_level` (high/medium/low)
  - `adoption_priority` (P0/P1/P2/watch)

## Quality bar

- Zero empty `repo` or `url`
- No duplicate `owner/repo` rows
- At least one source file trace for each newly added row

---

## Window C - Insight Synthesis and Publishing

## Mission

Convert normalized datasets into narrative intelligence and public-facing outputs.

## Scope

- Topic analysis updates
- Backlog and recommendation updates
- Public digest refresh

## Required Outputs per cycle

1. One analysis update in `30-analysis/<topic>/`
2. One decision update in:
   - `40-insights/adoption_backlog_latest.md`
3. One publish artifact:
   - `50-publish/weekly_digest_<date>_<cycle>.md`
4. Index updates:
   - `00-index/CHANGELOG.md`
   - if needed, `00-index/MASTER_INDEX.md`

## Narrative structure requirement

Each analysis update must include:

1. What changed this cycle
2. Evidence-backed findings
3. Risks and unknowns
4. Recommended action (P0/P1/P2)
5. Next-cycle research gap

---

## Cycle Cadence (50 minutes)

- Minute 0-25: Window A mines and packages evidence
- Minute 25-35: Window B normalizes and scores
- Minute 35-47: Window C writes and publishes
- Minute 47-50: all windows append handoff notes and blockers

Repeat for as many cycles as needed.

---

## Handoff Protocol

Every handoff note must include:

- Completed files
- Open questions
- Blockers
- Suggested next 3 actions

No verbal-only handoff. Files are the source of truth.

---

## Priority Rotation Strategy

If one theme is saturated, rotate by cycle:

1. Cycle 1: MCP + Gateway
2. Cycle 2: Eval + Security
3. Cycle 3: Agent + RAG
4. Cycle 4: Cross-topic risks and upgrades

This keeps breadth while still deepening evidence.

---

## Minimum Daily Done Criteria

End of day is complete only if all are true:

- `repo_master_latest.csv` updated
- at least one risk file updated
- at least one publish digest created
- changelog entry written

If any item is missing, continue another cycle.
