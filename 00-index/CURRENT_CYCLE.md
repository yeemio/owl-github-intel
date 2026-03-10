# 当前排期（由统筹每轮更新）

**最后更新**: 2026-03-09  
**当前周期**: **C9**（C 已收口）→ 下一轮 **C10**  
**主题**: 全轨道采纳信号 + 失败模式复核（agent / mcp / rag / gateway / eval / security + C8 未知项深挖）

---

## C9 收口状态

- **A** ✓ scan / evidence / handoff_A_to_B  
- **B** ✓ challenge_log / challenge_matrix / handoff_B_to_C（top 5 风险 + 3 条建议）  
- **C** ✓ 已更新 upgrade-risk-matrix（例外自动化到期、网关级联 runbook）、adoption_backlog、failure-patterns（C9-A18 方法论 caveat）；weekly_digest_C9 文末「下轮 5 未知」含 B top 5 中 ≥2 条；CHANGELOG、CYCLE_SCOREBOARD 已追加 C9。

---

## 本轮在干啥（C10 前可沿用 C9 任务描述）

| 窗口 | 角色 | 本轮任务概要 | 产出文件（前缀 `2026-03-09_…_C9`） |
|------|------|--------------|-------------------------------------|
| **A** | Evidence Miner | 六轨每轨至少 2 条证据 + C8 digest「下轮 5 未知」中至少 2 条深挖；≥45 URL，≥18 claim | `10-raw/scans/scan_A_C9.md`、`evidence_A_C9.csv`、`handoff_A_to_B_C9.md` |
| **B** | Red Team Reviewer | 对 A 的**全部** claim 逐条挑战；handoff 必含 **top 5 风险** + **给 C 的 3 条建议行动** | `30-analysis/cross/challenge_log_C9.md`、`challenge_matrix_C9.csv`、`20-normalized/handoff_B_to_C_C9.md` |
| **C** | Decision Desk | 按 A+B 更新 repo_master / adoption_backlog / 至少一个 risk 文件；digest 末尾「下轮 5 未知」须含 B 的 top 5 风险中≥2 条 | `50-publish/weekly_digest_C9.md` + 更新 CHANGELOG、CYCLE_SCOREBOARD、risks/* |

**统筹**：发布本排期、等 A→B→C 产出、收口（检查清单 + git commit/push）、汇报并给出下一轮主题。

---

## 复制用提示词在哪

完整提示词（可直接复制到各窗口）：**`00-index/WINDOW_ASSIGNMENTS_NOW.md`**  
- 窗口 A：见该文档「窗口 A」节的「复制到窗口 A 的提示词」  
- 窗口 B：见「窗口 B」节  
- 窗口 C：见「窗口 C」节  

执行顺序：先 A → A 有 handoff 后 B → B 有 handoff 后 C → C 完成后统筹收口。

---

## 下一轮预备（C10）

C9 收口后统筹将把排期改为 **C10**。C10 主题候选：
- C8/C9 下轮未知项落地（Crawl P0 口径、Jina vs Firecrawl 对照、Perplexica 基准、例外自动化验收）
- 门户与 30-analysis 同步
- 或从 C9 digest「下轮 5 未知」再选 2～3 条

**C10 前统筹检查**：更新 WINDOW_ASSIGNMENTS_NOW 为 C10、日期与产出路径；A/B/C 提示词中占位替换为 C10。

---

## 历史

- **C9**：全轨道采纳+失败模式复核；A 46 源/38 hard/20 claims，B 全挑战 20 条/1 fails (C9-A20)；C 更新 risk 文件、backlog、digest 闭环 B top 5≥2 条。
- **C8**：Crawl/Search 栈采纳信号；A 44 源/41 hard，B 挑战 12 条/1 fails，C 六库 P2 条件、无新 P0。
- **C7**：upgrade_risk_cross_track；B 完成审校，exception policy 与升级门控需自动化与分层。
- 更早见 `00-index/CYCLE_SCOREBOARD.csv`。
