# Handoff B -> C (C7)

## B Deliverables
- matrix: `analysis/cross/challenge_matrix_2026-03-09_C7.csv`
- log: `analysis/cross/challenge_log_2026-03-09_C7.md`
- challenged claims: `18`
- verdict coverage: `100%`

## Verdict Summary
- survives: `0`
- partial: `17`
- fails: `1` (`C7-B-016`)

## Required C Actions
1. **Upgrade risk matrix**: Add changelog_quality / coverage flag; add pin_expiry and security-backport policy; for no_clear_breaking add code-diff or compatibility-test requirement.
2. **Rollout plan**: Tier rollback windows and gate thresholds by blast radius and business criticality; add baseline refresh rule and golden-set coverage; add owner-availability and incident-freeze dependency for waves.
3. **Exception policy**: Implement automated exception-expiry check and escalation; do not rely on manual expiry only.
4. **W9 upgrade radar**: Add state/config snapshot for stateful rollback; document event-driven reorder (e.g. CVE/compliance) for upgrade order.
5. **Architecture benchmark**: Label recommendation A as “scale profile” and add minimal profile; ensure upgrade/rollback playbooks reference same profile.

## Priority Warning
- C7-B-016: Exception policy without automated expiry enforcement will accumulate hidden risk; C must add revocation or escalation path.

## Consolidated Message for C
- Upgrade and cross-track assets are directionally strong but need tiering (criticality, blast radius), automation (exception expiry), and profile alignment (scale vs minimal).

---

## 规范补全（B 窗口必填 — 方便 C 写 digest 和闭环）

### Top 5 风险（简短描述 + claim_id）
1. **临时例外仅人工到期无自动执行，例外会永久化** — **C7-B-016**
2. **升级顺序 MCP→serving→orchestration 在 CVE/合规时可能不适用** — **C7-B-003**
3. **no_clear_breaking 仅依 release notes，代码/配置破坏可能未记录** — **C7-B-012**
4. **两段式 canary→partial→full 在跨区/多租户爆炸半径下可能不足** — **C7-B-017**
5. **P0/P1 波次时间假设有专人且无并行事件，否则不可执行** — **C7-B-014**

### 给 C 的 3 条建议行动（可执行、和证据相关）
1. **实现例外政策自动化到期与升级** — 在 data/risks/ 中新增或修订：临时例外须含自动化到期检查与升级路径，不得仅依赖人工到期；证据：C7-B-016 fails，challenge_matrix_2026-03-09_C7.csv。
2. **升级矩阵与滚动计划分层与依赖** — 在 upgrade-risk-matrix 增加 changelog_quality、pin_expiry；在 rollout 计划中增加 owner-availability、incident-freeze 依赖，并按 blast radius 分层回滚窗口与门禁；证据：C7-B-002、B-006、B-011、B-014。
3. **架构推荐 A 标为 scale 画像并增加 minimal 画像** — 在 architecture-decision-benchmark 或等价资产中，将 Recommendation A 标为 scale profile，并补充 minimal profile 与升级/回滚 playbook 的画像一致；证据：C7-B-013。
