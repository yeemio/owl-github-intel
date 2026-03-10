# Handoff B -> C (C2)

## What B Challenged
- challenged claims: `18`
- matrix: `30-analysis/cross/challenge_matrix_2026-03-09_C2.csv`
- log: `30-analysis/cross/challenge_log_2026-03-09_C2.md`
- verdict coverage: `100% classified`

## Verdict Summary
- survives: `0`
- partial: `18`
- fails: `0`

## Core Message to C
本轮所有关键结论方向基本可保留，但必须改写为“条件性结论”，否则会在小团队/低规模场景过度工程化。

## Required C Edits
1. 在 `20-normalized/repo_master_latest.csv` 增加字段：
   - `adoption_profile` (`minimal` / `scale`)
   - `trigger_threshold`
   - `exception_policy`
2. 在 `40-insights/adoption_backlog_latest.md`：
   - 每条建议增加“不成立条件”与“回滚信号”。
3. 在风险文件补充：
   - 临时例外政策（license/紧急变更）的时限和批准链。
4. 将以下结论改写为“触发器模式”：
   - 三件套网关（LiteLLM+Istio+OpenMeter）
   - 严格双重MCP准入
   - 固定canary阶梯
   - 预算偏差1%硬门槛

## Suggested Trigger Examples
- `QPS > 50/s` 或 `provider_count >= 3` -> 升级到 mesh 弹性层
- `budget_drift > 3% for 2 weeks` -> 引入账本强约束
- `security_incidents >= 2/month` -> 提升到严格准入模式
- `rollback_count >= 2/release` -> 强制扩展发布门禁

---

## 规范补全（B 窗口必填 — 方便 C 写 digest 和闭环）

### Top 5 风险（简短描述 + claim_id）
1. **三件套网关/双重 MCP/固定 canary 若写死为默认，会在小团队场景过度工程化** — **C2 本轮全部 partial，见 matrix**
2. **repo_master 缺 adoption_profile 与 trigger_threshold 导致无法按画像决策** — **C2 Required C Edits 1**
3. **backlog 建议缺“不成立条件”与“回滚信号”易被当绝对结论执行** — **C2 Required C Edits 2**
4. **临时例外（license/紧急变更）无时限与批准链会积累治理债务** — **C2 Required C Edits 3**
5. **预算偏差 1% 硬门槛在低规模或单提供商场景可能过严** — **C2 触发器改写项**

### 给 C 的 3 条建议行动（可执行、和证据相关）
1. **在 repo_master 增加 adoption_profile、trigger_threshold、exception_policy** — 便于 C 按 minimal/scale 与触发条件写 digest 与 backlog；证据：C2 全部 18 条 partial，Core Message to C。
2. **在 adoption_backlog 每条建议增加“不成立条件”与“回滚信号”** — 避免绝对表述被直接执行；证据：C2 Required C Edits 2。
3. **在风险文件中补充临时例外政策的时限与批准链** — 与 C1/C3 例外政策闭环一致；证据：C2 Required C Edits 3、Suggested Trigger Examples。
