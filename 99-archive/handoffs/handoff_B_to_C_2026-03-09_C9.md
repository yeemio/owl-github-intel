# Handoff B → C (2026-03-09 C9)

Theme: **全轨道采纳信号 + 失败模式复核**

## B Deliverables

- **matrix:** `analysis/cross/challenge_matrix_2026-03-09_C9.csv`
- **log:** `analysis/cross/challenge_log_2026-03-09_C9.md`
- **challenged claims:** 20（全部挑战，无遗漏）
- **verdict coverage:** 100%

## Summary Counts

| Verdict | Count |
|---------|-------|
| survives | 0 |
| partial | 19 |
| fails | 1 |

**Failed claim:** C9-A20（例外政策须含自动化到期，不可仅靠人工到期与补偿控制）。

---

## Top 5 风险（简短描述 + claim_id）

1. **例外政策无自动化到期导致例外永久化** — **C9-A20**  
   与 C7-B-016、C8-A07 相同结论：仅“到期+补偿控制”而无自动化执行，例外会长期存在，治理退化。C 须在风险登记与 digest 中写明须实现自动化例外到期检查与升级。

2. **网关/路由级联故障未写入 runbook 与演练** — **C9-A08**  
   LiteLLM 等网关的 auth/quota/proxy 故障可级联导致路由不稳，证据存在但缓解动作（回滚与路由 bundle）需固化到 runbook 与演练，否则 C 的“可回滚”不闭环。

3. **六轨“默认/最优”结论缺少画像与触发条件** — **C9-A05, C9-A07, C9-A03**  
   RAG 默认栈、网关+mesh、MCP 强制边界等仅在特定规模或画像下成立；未标注 scale/minimal 与触发条件会导致执行层误用。C 写 digest 时需标出适用边界。

4. **C8 未知项被当结论使用，缺少定义与证据计划** — **C9-A13, C9-A14, C9-A15**  
   Crawl P0 门槛、Jina vs Firecrawl  parity、Perplexica 基准等为“未知”而非已证实结论；若进入 backlog 或 digest 而未注明“待定义/待验证”及所需证据，会混淆决策与待办。C 须将之列为下轮未知或研究项并附证据计划。

5. **失败类型频次与生产根因未对齐** — **C9-A18**  
   docs_example_drift、dependency_version_conflict 等来自 40 仓 issue 文本统计，未必等同生产事故根因。C 若引用为“主要失败模式”，需与内部事故分类对照或注明数据来源与局限。

---

## 给 C 的 3 条建议行动（可执行、与证据相关）

1. **落实 C9-A20 的闭环（证据：C7/C8/C9 挑战矩阵）**  
   - 在 `data/risks/`（如 upgrade-risk-matrix.csv 或 failure-patterns 相关资产）中新增或修订一条：**“临时例外须含自动化到期检查与升级路径；不得仅依赖人工到期”**，并注明依据为 C7-B-016、C8-A07、C9-A20 的 B 审校结论。  
   - 在 `weekly_digest_2026-03-09_C9.md` 中写明：C9-A20 判 fails，C 采纳 B 建议，将“例外政策自动化到期”纳入风险缓解与后续验收标准。

2. **将 C8 未知项转为可追踪的“下轮未知/研究项”（证据：C8 digest 末尾 5 条 + C9-A13–A17）**  
   - 在 `adoption_backlog_latest.md` 或 digest 的「下轮 5 个未知」中，至少包含 B 的 top 5 风险中的 2 条（例如：C9-A20 例外自动化；C9-A13/A14 Crawl P0 口径与 Jina vs Firecrawl 对照实验）。  
   - 对 C9-A13（Crawl P0 多源口径）、C9-A14（同 URL 同时间对照）、C9-A15（Perplexica 基准）写明：所需证据或动作（如“定义多源”“设计对照实验”“立项 token/context 基准”），便于下一轮 A 深挖或 C 验收。

3. **六轨采纳结论加画像与触发条件（证据：challenge_matrix 中 C9-A01,A03,A05,A07 等 notes）**  
   - 更新 `adoption_backlog_latest.md` 或等价决策资产：凡涉及“默认栈”“强制边界”“网关+mesh 足够”的条目，增加 **adoption_profile**（如 scale / minimal）与 **trigger_threshold**（或等价触发条件），并在 `weekly_digest_2026-03-09_C9.md` 中简述本轮 B 对六轨结论的边界要求及 C 的采纳方式（例如“已按 B 建议为默认栈补充 profile 与触发条件”）。

---

## Priority Warning

C9-A20 已连续三轮（C7/C8/C9）被判 fails。若 C 不在风险资产与 digest 中明确“例外政策须自动化到期”并纳入验收，决策闭环缺失，B 将在下一轮继续标注同一风险。
