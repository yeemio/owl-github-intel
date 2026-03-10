# 3-Window Assignment — Start This Round

**Date**: 2026-03-09  
**Cycle**: C6  
**Theme**: Upgrade risk + cross-track decision memo  

**Authority**: `00-index/THREE_WINDOW_EXECUTION_PLAN.md`  
**Data context**: `20-normalized/repo_master_latest.csv`, `40-insights/adoption_backlog_latest.md`

---

## Window A — Evidence Miner

**Mission**: Produce high-density evidence for upgrade risk and cross-track (agent/mcp/rag/gateway/eval/security) signals.

**Outputs** (write under `D:\AI\owl-github-intel\`):

1. `10-raw/scans/scan_2026-03-09_A_C6.md`
2. `10-raw/scans/evidence_2026-03-09_A_C6.csv`
3. `10-raw/scans/handoff_A_to_B_2026-03-09_C6.md`

**Copy-paste prompt for Window A**:

```
You are the Evidence Miner for owl-github-intel. Run one full cycle (C6). Theme: upgrade risk + cross-track decision evidence.

Tasks:
1) Search and collect evidence on: breaking changes, migration pain, and rollback stories from AI dev ecosystem (repos, issues, releases, changelogs).
2) Add cross-track signals: one finding per track (agent, mcp, rag, gateway, eval, security) that affects adoption or upgrade decisions.
3) Output files in D:\AI\owl-github-intel\:
   - 10-raw/scans/scan_2026-03-09_A_C6.md  (narrative by claim_id)
   - 10-raw/scans/evidence_2026-03-09_A_C6.csv  (columns: claim_id, topic, claim, source_type, url, evidence_excerpt, date_observed, novelty)
   - 10-raw/scans/handoff_A_to_B_2026-03-09_C6.md  (list of claim_ids for B to challenge, plus open questions)

Requirements:
- At least 30 source URLs this cycle.
- At least 10 from issue/PR/release (not README only).
- Every claim has claim_id for B to reference.
- No conclusion without a source URL.
```

---

## Window B — Red Team Reviewer

**Mission**: Challenge A’s C6 claims with counterevidence and boundary conditions.

**Inputs**: Read A’s outputs for C6 (scan, evidence CSV, handoff).

**Outputs**:

1. `30-analysis/cross/challenge_log_2026-03-09_C6.md`
2. `30-analysis/cross/challenge_matrix_2026-03-09_C6.csv`
3. `20-normalized/handoff_B_to_C_2026-03-09_C6.md`

**Copy-paste prompt for Window B**:

```
You are the Red Team Reviewer for owl-github-intel. Run one full cycle (C6).

Tasks:
1) Read Window A’s C6 outputs in D:\AI\owl-github-intel\:
   - 10-raw/scans/scan_2026-03-09_A_C6.md
   - 10-raw/scans/evidence_2026-03-09_A_C6.csv
   - 10-raw/scans/handoff_A_to_B_2026-03-09_C6.md
2) For each claim_id: find counterevidence or boundary conditions; set verdict to survives | partial | fails; add counter_source_url.
3) Write:
   - 30-analysis/cross/challenge_log_2026-03-09_C6.md  (per-claim summary and verdict)
   - 30-analysis/cross/challenge_matrix_2026-03-09_C6.csv  (claim_id, challenge_type, counter_source_url, verdict, notes)
   - 20-normalized/handoff_B_to_C_2026-03-09_C6.md  (summary counts: survives/partial/fails, top 3 risks, suggested C actions)

Requirements:
- Challenge at least 12 claims (or all A produced if fewer).
- Every challenged claim has a verdict and at least one counter_source_url where applicable.
- No claim left unclassified.
```

---

## Window C — Decision Desk

**Mission**: Resolve A vs B, update master assets, and publish digest.

**Inputs**: A’s C6 outputs and B’s C6 challenge outputs.

**Outputs**:

1. Update `20-normalized/repo_master_latest.csv` (if any repo/priority/risk changes).
2. Update `40-insights/adoption_backlog_latest.md` (P0/P1/P2 and triggers).
3. Update at least one of: `40-insights/risks/failure-patterns.csv`, `40-insights/risks/upgrade-risk-matrix.csv`.
4. Add `50-publish/weekly_digest_2026-03-09_C6.md`.
5. Append `00-index/CHANGELOG.md`.
6. Update `00-index/CYCLE_SCOREBOARD.csv` with C6 row.

**Copy-paste prompt for Window C**:

```
You are the Decision Desk for owl-github-intel. Run one full cycle (C6).

Tasks:
1) Read A’s and B’s C6 outputs in D:\AI\owl-github-intel\ (scan, evidence, challenge_log, challenge_matrix, handoffs).
2) Apply rule: survives → candidate for backlog; partial → conditional only; fails → reject, do not promote.
3) Update these files in D:\AI\owl-github-intel\:
   - 20-normalized/repo_master_latest.csv  (if any new or changed repo/priority/risk)
   - 40-insights/adoption_backlog_latest.md  (P0/P1/P2, triggers, exception policy)
   - At least one of: 40-insights/risks/failure-patterns.csv, 40-insights/risks/upgrade-risk-matrix.csv
   - 50-publish/weekly_digest_2026-03-09_C6.md  (what changed, key decisions, next 5 unknowns)
   - 00-index/CHANGELOG.md  (one-line C6 summary)
   - 00-index/CYCLE_SCOREBOARD.csv  (add C6 row: cycle_id=C6, theme=upgrade_risk_cross_track, a_sources, a_hard_evidence, b_challenged, b_failed_claims, c_promoted_p0, c_rejected, quality_score_100, notes)

Requirements:
- No P0 without at least 2 independent sources and explicit risk + rollback signal.
- Every promoted item has adoption_profile and trigger_threshold or exception_policy where applicable.
- Rejected claims logged in digest; next-cycle “top 5 unknowns” listed at end of digest.
```

---

## Execution order

1. **Start A and B in parallel** (B can start as soon as A’s handoff exists; if A not done yet, B waits or uses latest prior cycle).
2. **Start C after B’s handoff exists** (C reads both A and B).
3. **After C finishes**: run one `git add -A && git commit -m "chore(intel): C6 cycle outputs" && git push` from `D:\AI\owl-github-intel` (or let the main/orchestrator window do it).

---

## Handoff rule

Each window must write its handoff file. No verbal-only handoff. Files are the source of truth.
