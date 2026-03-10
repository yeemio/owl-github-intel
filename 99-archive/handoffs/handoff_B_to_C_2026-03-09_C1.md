# Handoff B -> C (2026-03-09 C1)

Theme: MCP + Gateway reliability

## B Window Decision Summary

- challenged_items: 18
- survives: 5
- partial: 11
- fails: 2

## Claims recommended for downgrade or rejection
- C-A04: 发布频率与回归风险并非线性关系，需增加门禁条件后再成立
- C-A12: 闭环是成熟组织最佳实践，但并非所有低复杂度阶段的必要条件

## C Window action requests
1. 将 C-A04 降级为条件性结论（partial）
2. 将 C-A12 由绝对表述改为阶段性表述
3. P0候选必须增加‘规模/复杂度前提’与回滚信号

Challenge matrix: `D:/ai/owl-github-intel/analysis/cross/challenge_matrix_2026-03-09_C1.csv`
Challenge log: `D:/ai/owl-github-intel/analysis/cross/challenge_log_2026-03-09_C1.md`

---

## 规范补全（B 窗口必填 — 方便 C 写 digest 和闭环）

### Top 5 风险（简短描述 + claim_id）
1. **高频发布与回归风险被泛化为线性关系，易误判门禁** — **C-A04**
2. **闭环表述为绝对必要会否定低复杂度阶段可行性** — **C-A12**
3. **MCP 契约漂移在单服/锁版本下可控，但多版本生态仍险** — **C-A01**
4. **认证/限流故障归因于 gateway 忽略下游提供商因素** — **C-A02**
5. **trace 缺失在跨服务/异步场景放大定位时间，小规模易低估** — **C-A06**

### 给 C 的 3 条建议行动（可执行、和证据相关）
1. **将 C-A04/C-A12 降级为条件性/阶段性结论** — 在 adoption_backlog 或等价决策资产中，把“发布频率→回归风险”“闭环必要性”改为带前提的表述；证据：challenge_matrix C1 CH-007、CH-018。
2. **P0 候选增加规模/复杂度前提与回滚信号** — 在 repo_master 或 ADR 中，凡标 P0 的条目增加 adoption_profile 与 rollback_signal 字段；证据：C1 全部 partial/survives 的 boundary 条件。
3. **门禁与治理结论加“不成立条件”** — 在风险或 runbook 中为 MCP 契约、gateway 认证限流、trace 要求补充“在何种条件下不成立”；证据：C1 counter_claim 与 counter_source_url。