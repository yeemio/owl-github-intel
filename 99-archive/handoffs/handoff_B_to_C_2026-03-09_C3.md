# Handoff B -> C (C3)

## B Output Summary
- challenged claims: `18`
- matrix: `analysis/cross/challenge_matrix_2026-03-09_C3.csv`
- log: `analysis/cross/challenge_log_2026-03-09_C3.md`
- verdict coverage: `100% classified`

## Verdict Breakdown
- survives: `0`
- partial: `17`
- fails: `1` (`C3-B-016`)

## What C Must Change
1. Extend eval ranking model:
   - add `org_readiness_score`
   - add `migration_debt_score`
2. Update rollback policy:
   - add `semantic_quality_regression` trigger (not only error/latency/safety rate)
3. Update security governance docs:
   - add `temporary_exception_policy` (time-bound + approval chain)
   - add `evidence_debt` register for inaccessible primary standards
4. Rewrite all “default stack” statements as profile-specific recommendations.

## Blocking/Warning Notes
- No direct primary-source ingestion for NIST/CISA in this environment; C should preserve this as explicit audit caveat.
- C should avoid promoting any eval/security item to unconditional P0 without profile and exception policy fields.

---

## 规范补全（B 窗口必填 — 方便 C 写 digest 和闭环）

### Top 5 风险（简短描述 + claim_id）
1. **Top30 评分维度缺 org 就绪与迁移债务，采纳决策易偏** — **C3-B-016**
2. **离线—在线闭环无负责人与 SLA 则不可达成** — **C3-B-002**
3. **回滚仅靠错误率/成功率触发会漏语义与幻觉退化** — **C3-B-008**
4. **周序 90 天滚动假设人力稳定，无重大事件打断** — **C3-B-015**
5. **未签名制品零部署在紧急热修场景需时限例外与事后审计** — **C3-B-013**

### 给 C 的 3 条建议行动（可执行、和证据相关）
1. **扩展评测排名模型并增加临时例外政策** — 在 eval 相关资产中增加 org_readiness_score、migration_debt_score；在安全治理文档中增加 temporary_exception_policy（时限+批准链）；证据：C3-B-016 fails，C3-B-013 partial。
2. **回滚策略增加语义质量退化触发** — 在 rollback/runbook 中增加 semantic_quality_regression 触发条件（不限于 error/latency/safety）；证据：C3-B-008。
3. **“默认栈”全部改为画像化建议** — 所有 default stack 表述改为 profile-specific，并注明 exception_policy 与证据债务登记；证据：C3 全部 partial 的 boundary 与 recommendation_for_c。
