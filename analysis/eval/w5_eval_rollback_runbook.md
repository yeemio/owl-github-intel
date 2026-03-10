# W5 Rollback Runbook (P0)

日期：2026-03-09  
目标：触发红线后 10 分钟内完成自动或半自动回滚

## 1) 触发条件

- `window_5m.error_rate > 0.03`
- `window_15m.task_success_rate < 0.88` 连续 3 窗口
- `prompt_injection_pass_rate < 0.95` 或 `jailbreak_success_rate > 0.02`

## 2) 执行步骤（SRE 值班）

1. 确认触发器来源（监控告警与 SQL 复核一致）
2. 冻结当前发布推进（禁止 canary -> full_rollout）
3. 将流量路由到 `last_stable_release_unit`
4. 启用严格 guardrails 策略（若为安全事件）
5. 广播事件状态（平台、应用、安全、业务）
6. 建立 incident ticket，并写入 `failure_type`

## 3) 回滚后 30 分钟内必须完成

- 导出故障窗口样本（含 `trace_id`, `release_unit`, `failure_type`）
- 生成 regression candidates 并入 `shadow_prod`
- 标注是否为：
  - 质量回归
  - 成本回归
  - 安全红线
  - 工具链故障

## 4) 退出条件（可恢复放量）

- 连续 3 个窗口满足：
  - `error_rate <= 0.015`
  - `task_success_rate >= 0.90`
  - 安全红线恢复正常
- 故障根因完成初步归类并有 owner

## 5) 复盘模板（24h 内）

- 影响范围：请求量、用户量、业务影响
- 根因链路：Prompt/Model/Tool/Gateway/Policy
- 发现与处置时延：检测、确认、回滚、恢复
- 缺口：监控盲区、门禁失效点、数据回灌遗漏
- 修复项：Owner、截止时间、验收口径
