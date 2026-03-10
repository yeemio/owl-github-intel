# Weekly Digest — 2026-03-09 (C9)

## Cycle status

- **Window**: C (Decision Desk)
- **Theme**: 全轨道采纳信号 + 失败模式复核（六轨 + C8 未知深挖）
- **Inputs consumed**:
  - A: `10-raw/scans/scan_2026-03-09_A_C9.md`, `evidence_2026-03-09_A_C9.csv`, `handoff_A_to_B_2026-03-09_C9.md`
  - B: `30-analysis/cross/challenge_log_2026-03-09_C9.md`, `challenge_matrix_2026-03-09_C9.csv`, `20-normalized/handoff_B_to_C_2026-03-09_C9.md`

## B verdict summary

- **survives**: 0 | **partial**: 19 | **fails**: 1 (**C9-A20**)
- **Failed claim**: C9-A20 — 例外政策须含自动化到期，不可仅靠人工到期与补偿控制；与 C7-B-016、C8-A07 同结论，已连续三轮判 fails。

## What changed

- **40-insights/risks/upgrade-risk-matrix.csv**: (1) 修订 cross-stack/temporary-exception-policy，明确「临时例外须含自动化到期检查与升级路径，不得仅依赖人工到期」，依据 C7-B-016、C8-A07、C9-A20；(2) 新增 cross-stack/C9-gateway-cascade-runbook：网关/路由级联故障需写入 runbook 与演练（C9-A08）。
- **40-insights/adoption_backlog_latest.md**: 增加 C9 决策原则、C9-A20 拒绝及 B top 5 闭环说明；六轨结论保持 adoption_profile / trigger 标注。
- **50-publish/weekly_digest_2026-03-09_C9.md**（本文件）、**00-index/CHANGELOG.md**、**00-index/CYCLE_SCOREBOARD.csv**：C9 行已追加。

## B 的 Top 5 风险与 3 条建议的采纳情况

| B Top 5 风险 | C 采纳 |
|--------------|--------|
| 1. 例外政策无自动化到期 (C9-A20) | 采纳：判 fails；upgrade-risk-matrix 已修订，要求自动化例外到期检查与升级；digest 与 backlog 已写明。 |
| 2. 网关/路由级联未写入 runbook (C9-A08) | 采纳：upgrade-risk-matrix 新增 C9-gateway-cascade-runbook，要求 runbook 与 rollback drill。 |
| 3. 六轨「默认/最优」缺画像与触发条件 (C9-A05,A07,A03) | 采纳：backlog 与 repo_master 已有 adoption_profile/trigger；digest 注明已按 B 建议标注 scale vs minimal。 |
| 4. C8 未知项被当结论使用 (C9-A13–A15) | 采纳：下列「下轮 5 个未知」中 #1、#2、#3 对应此项；标为待定义/待验证并附证据计划。 |
| 5. 失败类型频次与生产根因未对齐 (C9-A18) | 采纳：下列「下轮 5 个未知」#4 对应此项；引用时需与内部事故分类对照或注明数据来源与局限。 |

**给 C 的 3 条建议行动**：均已落实 — (1) 例外自动化到期已入风险资产与 digest；(2) C8 未知项已转为下轮未知/研究项（见下）；(3) 六轨已标注 profile/trigger。

## Key decisions

1. **C9-A20 判 fails** — 临时例外政策须含自动化到期检查与升级，不得仅依赖人工到期；已写入 upgrade-risk-matrix 与本 digest，后续验收须含此项。
2. **无新 P0** — 本周期无 survives；所有 partial 保持条件性采纳与 profile/trigger。
3. **网关级联** — LiteLLM 等网关 auth/quota/proxy 级联风险已入风险矩阵，要求 runbook 与 rollback drill。
4. **C8 未知项** — Crawl P0 口径、Jina vs Firecrawl 对照、Perplexica 基准等仍为「未知」，已列入下轮 5 个未知并附证据/动作建议。

## Files updated in C9

- `40-insights/risks/upgrade-risk-matrix.csv`
- `40-insights/adoption_backlog_latest.md`
- `50-publish/weekly_digest_2026-03-09_C9.md`
- `00-index/CHANGELOG.md`
- `00-index/CYCLE_SCOREBOARD.csv`

## 下轮 5 个未知（B→C 闭环：其中 ≥2 条来自 B 的 Top 5 风险）

1. **Crawl P0 多源口径与定义** — 「≥2 独立来源」在 crawl 栈的具体定义（多 repo 证据 vs 多 URL 每 repo）；在 adoption_backlog 中写清并作为 P2→P1 触发前提。 ← **B Top 5 #4**
2. **Jina vs Firecrawl 同条件对照** — 同 URL、同时间、同 timeout/header 的公平基准与可复现用例；设计对照实验并纳入下一轮 A 或专项研究。 ← **B Top 5 #4**
3. **Perplexica token/context 基准** — 可复现的 token 与 context-size 基准，作为采纳条件与竞品对比依据；立项或列入研究 backlog。 ← **B Top 5 #4**
4. **失败类型频次与生产根因对齐** — docs_example_drift、dependency_version_conflict 等来自 issue 文本统计，需与内部事故分类对照或注明数据来源与局限后再作「主要失败模式」结论。 ← **B Top 5 #5**
5. **例外政策自动化到期的验收标准** — 自动化例外到期检查与升级路径的具体验收条件（如检查频率、升级触发、责任人），便于下一轮 C 验收。 ← **B Top 5 #1**
