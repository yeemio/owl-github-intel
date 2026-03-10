# Handoff B -> C (C4)

## B Deliverables
- challenge matrix: `30-analysis/cross/challenge_matrix_2026-03-09_C4.csv`
- challenge log: `30-analysis/cross/challenge_log_2026-03-09_C4.md`
- challenged claims: `18` with full verdict coverage

## Verdict Summary
- survives: `0`
- partial: `17`
- fails: `1` (`C4-B-018`)

## Required C Actions (Non-Optional)
1. Update eval KPI stack:
   - add calibration and coverage KPIs, not just outcome KPIs
   - separate targets by risk profile (regulated vs non-regulated)
2. Update security control mapping:
   - add proactive validation metrics (breakout test cadence, adversarial coverage)
   - add evidence-quality constraints (field completeness, labeling quality)
3. Update rollout plan:
   - add `backup_owner`, `resource_contention_plan`, `parallelism_limit`
   - do not mark execution-ready until fallback staffing is defined
4. Update legal/governance:
   - define policy for archived/no-license corpus usage
   - enforce NOASSERTION decision deadline (approve/replace/escalate)

## Consolidated C3+C4 Message for C
- Move from `single default` to `profile-based baseline`.
- Move from `binary pass/fail metrics` to `outcome + coverage + calibration`.
- Move from `plan-by-sequence` to `plan-with-failure-modes`.

---

## 规范补全（B 窗口必填 — 方便 C 写 digest 和闭环）

### Top 5 风险（简短描述 + claim_id）
1. **评测排名仅结果 KPI 缺校准与覆盖维度，采纳决策易偏** — **C4-B-018**
2. **安全控制映射缺主动验证与证据质量约束** — **C4 Required C Actions 2**
3. **滚动计划缺 backup_owner、资源争用与并行上限则非可执行** — **C4 Required C Actions 3**
4. **归档/无证照语料使用与 NOASSERTION 无政策会滞压决策** — **C4 Required C Actions 4**
5. **单一默认栈与二元通过/失败指标在多元画像下不适用** — **C3+C4 Consolidated Message**

### 给 C 的 3 条建议行动（可执行、和证据相关）
1. **更新 eval KPI 栈：增加校准与覆盖 KPI，按风险画像分目标** — 在 eval 相关资产中增加 calibration/coverage KPIs 与 regulated vs non-regulated 目标；证据：C4-B-018 fails，Required C Actions 1。
2. **更新滚动计划：增加 backup_owner、resource_contention_plan、parallelism_limit** — 在 rollout/upgrade 计划中写入，未定义 fallback 人力前不得标 execution-ready；证据：C4 Required C Actions 3。
3. **定义归档/无证照语料与 NOASSERTION 的政策与决策时限** — 在 legal/governance 或风险登记中新增条款并设 approve/replace/escalate 截止；证据：C4 Required C Actions 4。
