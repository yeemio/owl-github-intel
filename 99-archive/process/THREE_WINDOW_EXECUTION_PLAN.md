# Three-Window Execution Plan (V3 - Command Center)

Purpose: run a research factory with only 3 windows, but produce outputs deep enough to be publishable and decision-grade.

Last updated: 2026-03-09 (v3)

## One-Line Summary

Use a hard loop: **Mine -> Attack -> Decide**.  
If a claim cannot survive attack, it never enters backlog.

---

## Window Ownership

- `Window A`: Evidence Miner (high-volume discovery)
- `Window B`: Red Team Reviewer (adversarial falsification)
- `Window C`: Decision Desk (resolution + publication)

Each window has fixed commands, fixed outputs, and fixed scoring.

---

## Timebox and Rhythm

Use 70-minute cycles (better depth than 50/60):

- Minute 0-25: A mines evidence
- Minute 25-45: B attacks A claims
- Minute 45-60: C resolves and writes decisions
- Minute 60-70: all windows handoff + scorecard update

Run 4 cycles/day minimum.

---

## Window A - Evidence Miner

## Objective

Generate high-density evidence, not summary prose.

## Mandatory output files per cycle

1. `sources/scans/scan_<date>_A_<cycle>.md`
2. `sources/scans/evidence_<date>_A_<cycle>.csv`
3. `sources/scans/handoff_A_to_B_<date>_<cycle>.md`

## Copy-paste prompt for Window A

```text
你是证据挖掘器。围绕当前主题进行深挖，不做泛泛总结。
必须输出：
1) evidence CSV（每行一条可验证证据）
2) scan MD（按证据编号解释上下文）
要求：
- 本轮至少30个URL
- 至少10条来自 issue/pr/release（不是README）
- 每条证据写 claim_id，后续给B窗口挑战
- 严禁无来源结论
文件写入：
sources/scans/scan_<date>_A_<cycle>.md
sources/scans/evidence_<date>_A_<cycle>.csv
sources/scans/handoff_A_to_B_<date>_<cycle>.md
```

## A窗口硬指标

- `source_count >= 30`
- `hard_evidence_count(issue/pr/release) >= 10`
- `new_claims >= 12`

If any metric fails, A must rerun before handoff.

---

## Window B - Red Team Reviewer

## Objective

Try to break A's claims with counterexamples and boundary conditions.

## Mandatory output files per cycle

1. `analysis/cross/challenge_log_<date>_<cycle>.md`
2. `analysis/cross/challenge_matrix_<date>_<cycle>.csv`
3. `99-archive/handoffs/handoff_B_to_C_<date>_<cycle>.md`

## Copy-paste prompt for Window B

```text
你是反驳审校员。读取A窗口claim_id逐条攻击：
1) 找反例
2) 找过时证据
3) 找不可泛化场景
每条claim必须给 verdict：
- survives
- partial
- fails
并给 counter_source_url。
输出：
analysis/cross/challenge_log_<date>_<cycle>.md
analysis/cross/challenge_matrix_<date>_<cycle>.csv
99-archive/handoffs/handoff_B_to_C_<date>_<cycle>.md
```

## B窗口硬指标

- `claims_challenged >= 15`
- `counter_sources >= claims_challenged`
- `every_claim_has_verdict = true`

If B leaves any claim unclassified, cycle is invalid.

---

## Window C - Decision Desk

## Objective

Resolve contested claims and update official decision assets.

## Mandatory output files per cycle

1. update `data/master/repo_master.csv`
2. update `insights/adoption_backlog.md`
3. **update at least one risk file** (content must relate to current-cycle evidence / B risks, e.g. C9):
   - `data/risks/failure-patterns.csv` or
   - `data/risks/upgrade-risk-matrix.csv`
4. `publish/digests/weekly_digest_<date>_<cycle>.md` — **digest closure**: the section "下轮 5 个未知" / "Next 5 unknowns" must include **at least 2 items from B's top 5 risks**, so that B→C→next round forms a loop.
5. append `index/CHANGELOG.md`

## Copy-paste prompt for Window C

```text
你是决策编辑台。读取A和B的交付，按“证据强度+反驳结果”定稿：
1) survives -> 可进入候选结论
2) partial -> 仅标注为条件性结论
3) fails -> 进入驳回列表，不进backlog
必须更新：
- data/master/repo_master.csv
- insights/adoption_backlog.md
- data/risks/*.csv（至少一个，且与当轮证据/B 风险相关）
- publish/digests/weekly_digest_<date>_<cycle>.md（文末「下轮 5 个未知」须包含 B 的 **top 5 风险**中至少 2 条，形成 B→C→下一轮闭环）
- index/CHANGELOG.md
```

## C窗口硬指标

- `P0 entries must have >=2 independent sources`
- `every P0 has risk + rollback signal`
- `rejected_claims logged`

If C cannot justify a P0, downgrade to P1/P2.

---

## Scoreboard (must maintain)

Create and update each cycle:

- `index/CYCLE_SCOREBOARD.csv`

Fields:

- `cycle_id`
- `theme`
- `a_sources`
- `a_hard_evidence`
- `b_challenged`
- `b_failed_claims`
- `c_promoted_p0`
- `c_rejected`
- `quality_score_100`
- `notes`

Quality score formula:

- Evidence density (40)
- Adversarial rigor (30)
- Decision clarity (30)

Target: `quality_score_100 >= 75`.

---

## Theme Plan (8-cycle program)

1. C1-C2: MCP + Gateway reliability
2. C3-C4: Eval + Security failure modes
3. C5-C6: Agent + RAG architecture trade-offs
4. C7-C8: Upgrade risk + cross-track decision memo

At end of C8, publish:

- `50-publish/executive_research_digest_<date>.md`
- `40-insights/backlogs/decision_memo_<date>.md`

---

## "Not Deep Enough" Kill Rules

A cycle is automatically rejected if:

- mostly README/blog sources
- no counterexamples
- claims without boundary conditions
- recommendations without rollback criteria

Rejected cycles must be rerun with same theme.

---

## Minimum Daily Done (strict)

Day closes only when all true:

- 4 completed cycles
- scoreboard updated
- backlog updated
- at least 1 public digest published
- at least 1 decision memo drafted

No exceptions.
