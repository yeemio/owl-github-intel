# 3 窗口任务分配 — 本轮执行

**日期**: 2026-03-09  
**周期**: C9  
**主题**: 全轨道采纳信号 + 失败模式复核（agent / mcp / rag / gateway / eval / security + C8 未知项深挖）  

**固定流程**：`index/THREE_WINDOW_WORKFLOW.md`（持续工作流）  
**细部规则与 KPI**：`index/THREE_WINDOW_EXECUTION_PLAN.md`  
**数据上下文**: `data/master/repo_master.csv`, `insights/adoption_backlog.md`, `data/risks/`, `publish/digests/weekly_digest_2026-03-09_C8.md`（下轮 5 个未知）

---

## 统筹（本窗口执行）

本窗口为**统筹**：负责任务发布、收口与提交，不执行 A/B/C 的具体挖掘或审校。

### 统筹流程

1. **发布**：将本文档推送到仓库，确保 3 个窗口可读到最新分配与提示词。
2. **等待**：A/B/C 按顺序产出，以**文件就绪**为准。
3. **收口**：检查清单 → 冲突时以 C 为准 → 更新 CYCLE_SCOREBOARD 当轮行（若 C 未写）→ `git add -A && git commit -m "chore(intel): C9 cycle outputs" && git push`
4. **报告**：本轮产出、提交 hash、下一轮建议（C10 主题）。

### 本轮产出检查清单（统筹用）

- [ ] A: `scan_2026-03-09_A_C9.md`, `evidence_2026-03-09_A_C9.csv`, `handoff_A_to_B_2026-03-09_C9.md`
- [ ] B: `challenge_log_2026-03-09_C9.md`, `challenge_matrix_2026-03-09_C9.csv`, `handoff_B_to_C_2026-03-09_C9.md`
- [ ] C: 至少更新 `repo_master_latest.csv` 或 `adoption_backlog_latest.md` 之一 + 至少一个 `data/risks/*` + `weekly_digest_2026-03-09_C9.md` + `CHANGELOG.md` + `CYCLE_SCOREBOARD.csv` 的 C9 行

---

## 窗口 A — Evidence Miner（证据挖掘）

**使命**：覆盖 **六轨**（agent, mcp, rag, gateway, eval, security）采纳与失败模式证据，并针对 **C8 digest 末尾「下轮 5 个未知」** 中至少 2 条做深挖（多来源、issue/PR/release）。

**产出**（均写在 `D:\AI\owl-github-intel\` 下）：

1. `sources/scans/scan_2026-03-09_A_C9.md`
2. `sources/scans/evidence_2026-03-09_A_C9.csv`
3. `sources/scans/handoff_A_to_B_2026-03-09_C9.md`

**复制到窗口 A 的提示词**：

```
你是 owl-github-intel 的证据挖掘器，执行 C9 周期。主题：全轨道采纳信号 + 失败模式复核。

任务：
1) 六轨覆盖：对 agent、mcp、rag、gateway、eval、security 每轨至少产出 2 条可验证证据（采纳案例、集成方式、已知问题、升级/兼容性讨论），来源含 issue/PR/release。每条证据带 claim_id（如 C9-A01…），topic 填对应轨道。
2) C8 未知深挖：阅读 publish/digests/weekly_digest_2026-03-09_C8.md 末尾「Next 5 unknowns」，从中选至少 2 条做深挖，每条至少 2 个独立来源 URL，产出追加到同一 evidence CSV，claim_id 连续编号。
3) 在 D:\AI\owl-github-intel\ 下生成：
   - sources/scans/scan_2026-03-09_A_C9.md（按 claim_id 的说明与上下文，可分段：六轨 / C8 未知）
   - sources/scans/evidence_2026-03-09_A_C9.csv（列：claim_id, topic, claim, source_type, url, evidence_excerpt, date_observed, novelty）
   - sources/scans/handoff_A_to_B_2026-03-09_C9.md（交给 B 的 claim_id 列表、六轨与 C8 未知对应关系、开放问题）

要求：
- 至少 45 个来源 URL，其中至少 15 个来自 issue/PR/release（非仅 README）。
- 至少 18 条 claim（六轨 12+ + C8 未知 2 条深挖各至少 3 条）。
- 每条结论必须有来源 URL；无来源不得写入。
```

---

## 窗口 B — Red Team Reviewer（红队审校）

**使命**：对 A 的 C9 证据**全部**逐条挑战，给出 survives / partial / fails 及反例或边界说明；handoff 中必须包含「top 5 风险」与「给 C 的 3 条建议行动」。

**输入**：A 的 C9 产出（scan、evidence CSV、handoff）。

**产出**：

1. `analysis/cross/challenge_log_2026-03-09_C9.md`
2. `analysis/cross/challenge_matrix_2026-03-09_C9.csv`
3. `99-archive/handoffs/handoff_B_to_C_2026-03-09_C9.md`

**复制到窗口 B 的提示词**：

```
你是 owl-github-intel 的红队审校员，执行 C9 周期。

任务：
1) 阅读 D:\AI\owl-github-intel\ 下 A 的 C9 产出：
   - sources/scans/scan_2026-03-09_A_C9.md
   - sources/scans/evidence_2026-03-09_A_C9.csv
   - sources/scans/handoff_A_to_B_2026-03-09_C9.md
2) 对**每一个** claim_id：寻找反例或边界条件；给出 verdict：survives | partial | fails；并填 counter_source_url（如有）。不得遗漏任何一条。
3) 在 D:\AI\owl-github-intel\ 下生成：
   - analysis/cross/challenge_log_2026-03-09_C9.md（逐条挑战与 verdict 说明，可按六轨或 C8 未知分段）
   - analysis/cross/challenge_matrix_2026-03-09_C9.csv（列：claim_id, challenge_type, counter_source_url, verdict, notes）
   - 99-archive/handoffs/handoff_B_to_C_2026-03-09_C9.md（必须包含：survives/partial/fails 数量；**top 5 风险**（简短描述+claim_id）；**给 C 的 3 条建议行动**（可执行、与证据相关））

要求：
- 挑战 A 产出的全部 claim，无遗漏。
- 每条被挑战的 claim 必须有 verdict；尽量提供 counter_source_url。
- handoff 中「top 5 风险」与「3 条建议行动」为必填，供 C 写入 digest。
```

---

## 窗口 C — Decision Desk（决策收口）

**使命**：根据 A+B 的 C9 产出，更新主表与采纳清单、至少一个风险资产，写出周摘要；digest 末尾「下轮 5 个未知」须引用 B 的 top 5 风险中至少 2 条。

**输入**：A 的 C9 产出 + B 的 C9 挑战与 handoff。

**产出**：

1. 更新 `data/master/repo_master.csv`（若本轮有 repo 需新增或调整优先级/风险）
2. 更新 `insights/adoption_backlog.md`（P0/P1/P2 或触发条件、C9 决策原则）
3. 更新至少一个：`data/risks/failure-patterns.csv` 或 `data/risks/upgrade-risk-matrix.csv`（新增或修订与 C9 证据相关的行）
4. 新增 `publish/digests/weekly_digest_2026-03-09_C9.md`（本轮变更、关键决策、B 的 top 5 风险与 3 条建议的采纳情况；**下轮 5 个未知**须包含 B 的 top 5 中至少 2 条）
5. 追加 `index/CHANGELOG.md`（一行 C9 摘要）
6. 在 `index/CYCLE_SCOREBOARD.csv` 中新增 C9 行（cycle_id=C9, theme=full_track_failure_review, a_sources, a_hard_evidence, b_challenged, b_failed_claims, c_promoted_p0, c_rejected, quality_score_100, notes）

**复制到窗口 C 的提示词**：

```
你是 owl-github-intel 的决策收口（Decision Desk），执行 C9 周期。

任务：
1) 阅读 D:\AI\owl-github-intel\ 下 A 与 B 的 C9 产出（scan, evidence CSV, challenge_log, challenge_matrix, handoffs）。特别注意 B 的 handoff 中的「top 5 风险」与「给 C 的 3 条建议行动」。
2) 规则：survives → 可进入 backlog 候选；partial → 仅条件性采纳；fails → 不提升、记录原因。
3) 在 D:\AI\owl-github-intel\ 下完成：
   - 若有 repo 需纳入或调整：更新 data/master/repo_master.csv、insights/adoption_backlog.md；
   - 更新至少一个风险文件：data/risks/failure-patterns.csv 或 upgrade-risk-matrix.csv（与 C9 证据/B 风险相关的新增或修订）；
   - 新增 publish/digests/weekly_digest_2026-03-09_C9.md（本轮变更、关键决策、B 的 top 5 风险及 3 条建议的采纳情况；文末「下轮 5 个未知」必须包含 B 的 top 5 风险中至少 2 条）；
   - 在 index/CHANGELOG.md 追加一行 C9 摘要；
   - 在 index/CYCLE_SCOREBOARD.csv 添加 C9 行（cycle_id=C9, theme=full_track_failure_review, 及 a_sources, b_challenged, c_promoted_p0 等可填字段，notes 简要说明）。

要求：
- 任何新 P0 必须有至少 2 个独立来源且具备风险与回滚说明。
- 被拒绝的 claim 在 digest 中简要记录。
- digest 末尾「下轮 5 个未知」必须引用 B 的 top 5 风险中至少 2 条，保证闭环。
```

---

## 执行顺序与统筹收口

1. **先开 A**：窗口 A 按提示词产出 3 个文件（六轨 + C8 未知深挖，≥45 URL，≥18 claim）。
2. **A 有 handoff 后开 B**：窗口 B 读 A 的产出，**全部**挑战，产出 3 个文件（handoff 含 top 5 风险 + 3 条建议行动）。
3. **B 有 handoff 后开 C**：窗口 C 读 A+B 产出，更新主资产 + 至少一个 risk 文件 + digest（下轮未知含 B top 5 中≥2 条）+ CHANGELOG + CYCLE_SCOREBOARD。
4. **C 完成后由统筹收口**：检查清单 → `git add -A && git commit -m "chore(intel): C9 cycle outputs" && git push` → 汇报并给出 C10 主题建议。

**手递手规则**：只认文件，不认口头；未生成对应文件视为该步未完成。

---

## 下一轮（C10）预备

C9 收口后，统筹将把本分配单更新为 **C10**。C10 主题候选：
- 「C8/C9 下轮未知项落地」：针对 digest 中未闭环的未知做证据或决策跟进；
- 「门户与 30-analysis 同步」：将 30-analysis 各轨结论同步到 50-publish/site 内容页或 BROWSE_BY_TOPIC；
- 或由 C9 digest 末尾「下轮 5 个未知」再选 2～3 条作为 C10 主题。
