# Challenge Log C9 (Window B)

## Cycle Metadata

- **cycle_id:** C9
- **date:** 2026-03-09
- **theme:** 全轨道采纳信号 + 失败模式复核（agent / mcp / rag / gateway / eval / security + C8 未知项深挖）
- **reviewer_window:** B (Red Team Reviewer)
- **input_scope:** `10-raw/scans/scan_2026-03-09_A_C9.md`, `evidence_2026-03-09_A_C9.csv`, `handoff_A_to_B_2026-03-09_C9.md`
- **output_matrix:** `30-analysis/cross/challenge_matrix_2026-03-09_C9.csv`

## Hard-Metric Check

| Requirement | Target | Actual | Pass |
|-------------|--------|--------|------|
| claims_challenged | 全部无遗漏 | 20/20 | ✓ |
| counter_sources | ≥ claims_challenged | 20 | ✓ |
| every_claim_has_verdict | true | true | ✓ |

## Verdict Distribution

| Verdict | Count |
|---------|-------|
| survives | 0 |
| partial | 19 |
| fails | 1 |

## Per-Claim Summary (all 20)

| claim_id | verdict | 挑战要点 |
|----------|---------|----------|
| C9-A01 | partial | 框架层 checkpoint 不足以为“生产就绪”，需业务结果与回滚影响面门禁 |
| C9-A02 | partial | 3% 手递手失败率需结合严重度与业务影响再触发降级 |
| C9-A03 | partial | 强制 MCP 首日可阻塞既有工具，需分阶段采纳与例外清单 |
| C9-A04 | partial | 目录质量风险成立，发现仅用之外需版本/兼容性检查 |
| C9-A05 | partial | 最优栈依赖场景，小规模可不必全栈，标为平衡/成长画像默认 |
| C9-A06 | partial | 全路径强制 reranker 增加延迟与成本，需按不确定性条件化 |
| C9-A07 | partial | 仅当具备 mesh 能力时成立，小团队需最小画像 |
| C9-A08 | partial | 级联有证据，需写入 runbook 与回滚演练 |
| C9-A09 | partial | 回归可隐藏缺陷，需 trace 完整性门禁 |
| C9-A10 | partial | 指标漂移存在，需冻结评测集与回滚流程 |
| C9-A11 | partial | 规则漂移可导致误拒，需规则版本与拒识率监控 |
| C9-A12 | partial | 部分策略引擎嵌入式，无法分离时需更强 canary |
| C9-A13 | partial | Crawl P0 门槛为开放问题，需在 backlog 中定义多源口径 |
| C9-A14 | partial | 同 URL 同时间为方法未落地，不可先下 parity 结论 |
| C9-A15 | partial | 基线为未知项，需先做 token/context 基准再定采纳标准 |
| C9-A16 | partial | 功能与采纳证据需区分，Firecrawl 标为功能信号直至有采纳指标 |
| C9-A17 | partial | 覆盖扩展为建议，将 ForgeCrawl 等纳入下一轮扫描范围并设 P2 触发 |
| C9-A18 | partial | 失败类型频次来自 issue 文本，未必等同生产根因，需与内部事故分类对照 |
| C9-A19 | partial | 适配器有维护负担与版本滞后，需维护 SLA 与版本支持窗口 |
| C9-A20 | **fails** | 与 C7-B-016/C8-A07 一致：无自动化到期的例外政策会导致例外永久化，须自动化到期检查与升级 |

## Failed Claim (C Action Required)

- **C9-A20:** Temporary exception policy with expiry and compensating controls covers all waiver cases.  
  - **Why failed:** C7/C8 已判定：仅人工到期不可执行会导致例外长期存在，治理退化。  
  - **Required C action:** 实现自动化例外到期检查与升级路径，并在风险登记与决策摘要中写明。

## Red-Team Pattern Summary

1. **六轨采纳结论** 多为“在特定边界下成立”（画像、规模、既有能力），需在 backlog 与 ADR 中标明适用边界与触发条件。  
2. **C8 未知项** 被当作 claim 产出；B 将其标为 partial，要求 C 将之转为“待定义/待验证”并纳入 backlog 或研究项。  
3. **例外政策** 再次判 fails，与 C7/C8 一致，C 必须落实自动化到期，否则不得在 digest 中称“已覆盖”。

## Mandatory Rewrite Requests for Window C

1. **C9-A20 (fails):** 在 risk register 与 adoption_backlog 中写入“例外政策须含自动化到期检查与升级”，并不得以“人工到期”作为闭环依据。  
2. **六轨建议:** 所有“默认/最优”结论均需标注画像（scale / minimal）与触发条件；C9-A07、A05、A03 等需在 digest 中体现边界。  
3. **C8 未知项 (A13–A17):** 在 digest 或 backlog 中列为“下轮 5 个未知”或研究项，并注明所需证据（如 Crawl P0 口径、Jina vs Firecrawl 对照实验、Perplexica 基准、Firecrawl 采纳指标、crawl 覆盖扩展范围）。
