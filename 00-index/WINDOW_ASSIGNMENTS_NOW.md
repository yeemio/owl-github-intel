# 3 窗口任务分配 — 本轮执行

**日期**: 2026-03-09  
**周期**: C8  
**主题**: Crawl/Search 栈采纳信号 + 门户与主索引同步  

**权威文档**: `00-index/THREE_WINDOW_EXECUTION_PLAN.md`  
**数据上下文**: `20-normalized/repo_master_latest.csv`, `40-insights/adoption_backlog_latest.md`, `30-analysis/crawl/`

---

## 统筹（本窗口执行）

本窗口为**统筹**：负责任务发布、收口与提交，不执行 A/B/C 的具体挖掘或审校。

### 统筹流程

1. **发布**：将本文档推送到仓库，确保 3 个窗口可读到最新分配与提示词。
2. **等待**：A/B/C 按顺序或并行产出，以**文件就绪**为准（见各窗口 Outputs）。
3. **收口**：
   - 检查 A 的 handoff、B 的 handoff、C 的产出是否齐全；
   - 若有冲突（如多人改同一文件），以 C 窗口决策为准，或合并合理部分；
   - 更新 `00-index/CYCLE_SCOREBOARD.csv` 的 C7 行（若 C 未写）；
   - 执行：`cd D:\AI\owl-github-intel && git add -A && git status && git commit -m "chore(intel): C7 cycle outputs" && git push`
4. **报告**：在对话中简短汇报：本轮产出文件、提交 hash、下一轮建议（是否 C9、主题建议）。

### 本轮产出检查清单（统筹用）

- [ ] A: `10-raw/scans/scan_2026-03-09_A_C8.md`, `evidence_2026-03-09_A_C8.csv`, `handoff_A_to_B_2026-03-09_C8.md`
- [ ] B: `30-analysis/cross/challenge_log_2026-03-09_C8.md`, `challenge_matrix_2026-03-09_C8.csv`, `20-normalized/handoff_B_to_C_2026-03-09_C8.md`
- [ ] C: 至少更新 `adoption_backlog_latest.md` 或 `repo_master_latest.csv` 之一 + `weekly_digest_2026-03-09_C8.md` + `CHANGELOG.md` + `CYCLE_SCOREBOARD.csv` 的 C8 行

---

## 窗口 A — Evidence Miner（证据挖掘）

**使命**：围绕「Crawl/Search 栈」（Crawl4AI、Firecrawl、Perplexica、Turboseek 等）收集采纳与风险证据，供 B 挑战、C 决策。

**产出**（均写在 `D:\AI\owl-github-intel\` 下）：

1. `10-raw/scans/scan_2026-03-09_A_C8.md`
2. `10-raw/scans/evidence_2026-03-09_A_C8.csv`
3. `10-raw/scans/handoff_A_to_B_2026-03-09_C8.md`

**复制到窗口 A 的提示词**：

```
你是 owl-github-intel 的证据挖掘器，执行 C8 周期。主题：Crawl/Search 栈采纳信号与风险证据。

任务：
1) 针对 30-analysis/crawl/ 中列出的项目（Crawl4AI、Firecrawl、Jina Reader、Perplexica、Farfalle、Turboseek 等），搜集：采纳案例、集成方式、已知问题、issue/PR/release 中的升级或兼容性讨论。
2) 每条证据带 claim_id，并区分 topic（如 crawl_llm, answer_engine, search_api）。
3) 在 D:\AI\owl-github-intel\ 下生成：
   - 10-raw/scans/scan_2026-03-09_A_C8.md（按 claim_id 的说明与上下文）
   - 10-raw/scans/evidence_2026-03-09_A_C8.csv（列：claim_id, topic, claim, source_type, url, evidence_excerpt, date_observed, novelty）
   - 10-raw/scans/handoff_A_to_B_2026-03-09_C8.md（交给 B 的 claim_id 列表与开放问题）

要求：
- 至少 30 个来源 URL，其中至少 10 个来自 issue/PR/release（非仅 README）。
- 每条结论必须有来源 URL；无来源不得写入。
```

---

## 窗口 B — Red Team Reviewer（红队审校）

**使命**：对 A 的 C7 证据逐条挑战，给出 survives / partial / fails 及反例或边界说明。

**输入**：A 的 C8 产出（scan、evidence CSV、handoff）。

**产出**：

1. `30-analysis/cross/challenge_log_2026-03-09_C8.md`
2. `30-analysis/cross/challenge_matrix_2026-03-09_C8.csv`
3. `20-normalized/handoff_B_to_C_2026-03-09_C8.md`

**复制到窗口 B 的提示词**：

```
你是 owl-github-intel 的红队审校员，执行 C8 周期。

任务：
1) 阅读 D:\AI\owl-github-intel\ 下 A 的 C8 产出：
   - 10-raw/scans/scan_2026-03-09_A_C8.md
   - 10-raw/scans/evidence_2026-03-09_A_C8.csv
   - 10-raw/scans/handoff_A_to_B_2026-03-09_C8.md
2) 对每个 claim_id：寻找反例或边界条件；给出 verdict：survives | partial | fails；并填 counter_source_url（如有）。
3) 在 D:\AI\owl-github-intel\ 下生成：
   - 30-analysis/cross/challenge_log_2026-03-09_C8.md（逐条挑战与 verdict 说明）
   - 30-analysis/cross/challenge_matrix_2026-03-09_C8.csv（列：claim_id, challenge_type, counter_source_url, verdict, notes）
   - 20-normalized/handoff_B_to_C_2026-03-09_C8.md（survives/partial/fails 数量、前 3 风险、给 C 的建议）

要求：
- 至少挑战 12 条（若 A 产出不足 12 条则全部挑战）。
- 每条被挑战的 claim 必须有 verdict；尽量提供 counter_source_url。
```

---

## 窗口 C — Decision Desk（决策收口）

**使命**：根据 A+B 的 C7 产出，更新主表与采纳清单，写出周摘要并更新检查点。

**输入**：A 的 C8 产出 + B 的 C8 挑战与 handoff。

**产出**：

1. 视情况更新 `20-normalized/repo_master_latest.csv`（若 Crawl/Search 相关 repo 需调整优先级或风险）
2. 视情况更新 `40-insights/adoption_backlog_latest.md`（若将 crawl/answer-engine 相关项纳入 P1/P2 或注明触发条件）
3. 新增 `50-publish/weekly_digest_2026-03-09_C8.md`（本轮变更、关键决策、下轮 5 个未知）
4. 追加 `00-index/CHANGELOG.md`（一行 C8 摘要）
5. 在 `00-index/CYCLE_SCOREBOARD.csv` 中新增 C8 行（cycle_id=C8, theme=crawl_search_adoption, a_sources, a_hard_evidence, b_challenged, b_failed_claims, c_promoted_p0, c_rejected, quality_score_100, notes）

**复制到窗口 C 的提示词**：

```
你是 owl-github-intel 的决策收口（Decision Desk），执行 C8 周期。

任务：
1) 阅读 D:\AI\owl-github-intel\ 下 A 与 B 的 C8 产出（scan, evidence CSV, challenge_log, challenge_matrix, handoffs）。
2) 规则：survives → 可进入 backlog 候选；partial → 仅条件性采纳；fails → 不提升、记录原因。
3) 在 D:\AI\owl-github-intel\ 下完成：
   - 若有 Crawl/Search 相关 repo 需纳入或调整：更新 20-normalized/repo_master_latest.csv、40-insights/adoption_backlog_latest.md；
   - 新增 50-publish/weekly_digest_2026-03-09_C8.md（本轮变更、关键决策、下轮 5 个未知）；
   - 在 00-index/CHANGELOG.md 追加一行 C8 摘要；
   - 在 00-index/CYCLE_SCOREBOARD.csv 添加 C8 行（cycle_id=C8, theme=crawl_search_adoption, 以及 a_sources, b_challenged, c_promoted_p0 等可填字段，notes 简要说明）。

要求：
- 任何新 P0 必须有至少 2 个独立来源且具备风险与回滚说明。
- 被拒绝的 claim 在 digest 中简要记录；文末列出「下轮 5 个未知」。
```

---

## 执行顺序与统筹收口

1. **先开 A**：窗口 A 按提示词产出 3 个文件。
2. **A 有 handoff 后开 B**：窗口 B 读 A 的产出，产出 3 个文件。
3. **B 有 handoff 后开 C**：窗口 C 读 A+B 产出，更新主资产并写 digest、CHANGELOG、CYCLE_SCOREBOARD。
4. **C 完成后由统筹收口**：本窗口（统筹）检查清单 → `git add -A && git commit -m "chore(intel): C8 cycle outputs" && git push` → 在对话中汇报结果与下一轮建议。

**手递手规则**：只认文件，不认口头；未生成对应文件视为该步未完成。
