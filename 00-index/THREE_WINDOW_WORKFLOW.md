# 3 窗口 + 统筹 持续工作流

本文档为 **固定流程**，每轮研究均按此执行，长期有效。

**当前轮次任务与复制用提示词**：见 `00-index/WINDOW_ASSIGNMENTS_NOW.md`（每轮更新周期号与主题）。  
**细部规则与 KPI**：见 `00-index/THREE_WINDOW_EXECUTION_PLAN.md`。

---

## 一、角色与职责

| 角色 | 窗口 | 职责 |
|------|------|------|
| **统筹** | 主窗口（本窗口） | 发布当轮任务、等待 A/B/C 产出、收口（检查清单 + git commit/push）、在对话中汇报；不执行 A/B/C 的具体挖掘或审校。 |
| **窗口 A** | Evidence Miner（证据挖掘） | 按当轮主题搜集证据，产出 scan MD、evidence CSV、handoff 给 B。 |
| **窗口 B** | Red Team Reviewer（红队审校） | 读 A 的产出，逐条挑战 claim，产出 challenge_log、challenge_matrix、handoff 给 C。 |
| **窗口 C** | Decision Desk（决策收口） | 读 A+B 产出，按 survives/partial/fails 规则更新主资产，写 weekly_digest、CHANGELOG、CYCLE_SCOREBOARD。 |

---

## 二、单轮周期结构

- **周期编号**：C1, C2, … , C8, C9, …（在 `WINDOW_ASSIGNMENTS_NOW.md` 与文件名中统一使用，如 `_C8`）。
- **主题**：每轮在分配单中指定（如「Crawl/Search 栈采纳信号」「upgrade risk + cross-track」）。
- **日期**：产出文件名使用同一日期，如 `2026-03-09`，与当轮分配单一致。

### 各窗口产出路径（命名规则）

所有路径相对于仓库根 `D:\AI\owl-github-intel\`。

| 窗口 | 产出文件（将 `<date>`、`<C>` 换为当轮日期与周期号，如 2026-03-09、C8） |
|------|----------------------------------------------------------------------|
| A | `10-raw/scans/scan_<date>_A_<C>.md` |
| A | `10-raw/scans/evidence_<date>_A_<C>.csv` |
| A | `10-raw/scans/handoff_A_to_B_<date>_<C>.md` |
| B | `30-analysis/cross/challenge_log_<date>_<C>.md` |
| B | `30-analysis/cross/challenge_matrix_<date>_<C>.csv` |
| B | `20-normalized/handoff_B_to_C_<date>_<C>.md` |
| C | 视情况更新：`20-normalized/repo_master_latest.csv`、`40-insights/adoption_backlog_latest.md`、`40-insights/risks/*` |
| C | 必写：`50-publish/weekly_digest_<date>_<C>.md` |
| C | 必写：在 `00-index/CHANGELOG.md` 追加一行当轮摘要 |
| C | 必写：在 `00-index/CYCLE_SCOREBOARD.csv` 添加当轮一行（cycle_id, theme, a_sources, b_challenged, c_promoted_p0, notes 等） |

---

## 三、执行顺序（每轮固定）

1. **统筹发布**  
   - 更新 `WINDOW_ASSIGNMENTS_NOW.md`：周期号、主题、当轮 A/B/C 的复制用提示词与产出路径。  
   - 提交并推送（或告知 3 窗口「分配已更新」）。

2. **窗口 A 执行**  
   - 打开 `WINDOW_ASSIGNMENTS_NOW.md`，将「窗口 A」的提示词复制到窗口 A，执行。  
   - 确保生成 3 个文件：`scan_…`, `evidence_…`, `handoff_A_to_B_…`。

3. **窗口 B 执行**  
   - 在 A 的 handoff 就绪后，将「窗口 B」的提示词复制到窗口 B，执行。  
   - 阅读 A 的 3 个产出，生成 3 个文件：`challenge_log_…`, `challenge_matrix_…`, `handoff_B_to_C_…`。

4. **窗口 C 执行**  
   - 在 B 的 handoff 就绪后，将「窗口 C」的提示词复制到窗口 C，执行。  
   - 阅读 A+B 产出，更新主资产，必写 digest、CHANGELOG、CYCLE_SCOREBOARD 当轮行。

5. **统筹收口**  
   - 检查当轮清单（见 `WINDOW_ASSIGNMENTS_NOW.md` 内「本轮产出检查清单」）。  
   - 若有冲突，以 C 的决策为准或合并合理部分。  
   - 执行：`cd D:\AI\owl-github-intel && git add -A && git status && git commit -m "chore(intel): C<轮次> cycle outputs" && git push`  
   - 在对话中汇报：本轮产出文件、提交 hash、下一轮建议（下一周期号与主题）。

---

## 四、手递手规则

- **只认文件，不认口头**：未生成对应文件视为该步未完成。  
- **B 依赖 A**：B 的输入为 A 的 3 个文件；若 A 未就绪，B 可等待或使用上一轮产出做演练。  
- **C 依赖 A+B**：C 的输入为 A 的 3 个文件 + B 的 3 个文件。

---

## 五、进入下一轮

- 每轮结束后，**统筹**在汇报中给出下一轮建议（如 C9、主题建议）。  
- 下一轮开始时：  
  - 打开 `00-index/WINDOW_ASSIGNMENTS_NOW.md`；  
  - 将周期号、日期、主题、以及 A/B/C 的产出路径与提示词中的占位（如 C8、2026-03-09）替换为新一轮（如 C9、当轮日期）；  
  - 保存后由统筹提交并推送，然后按「三、执行顺序」从步骤 2 开始执行。

---

## 六、文档索引

| 文档 | 用途 |
|------|------|
| **本文档** `00-index/THREE_WINDOW_WORKFLOW.md` | 固定流程，持续使用 |
| `00-index/WINDOW_ASSIGNMENTS_NOW.md` | 当前轮次任务与复制用提示词（每轮更新） |
| `00-index/THREE_WINDOW_EXECUTION_PLAN.md` | 细部规则、KPI、时间盒、硬指标 |
| `00-index/CYCLE_SCOREBOARD.csv` | 每轮得分与备注 |

---

**维护**：流程变更时只改本文档；当轮任务与提示词只改 `WINDOW_ASSIGNMENTS_NOW.md`。
