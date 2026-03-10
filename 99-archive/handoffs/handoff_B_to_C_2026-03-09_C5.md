# Handoff B -> C (C5)

## B Deliverables
- matrix: `analysis/cross/challenge_matrix_2026-03-09_C5.csv`
- log: `analysis/cross/challenge_log_2026-03-09_C5.md`
- challenged claims: `18`
- verdict coverage: `100%`

## Verdict Summary
- survives: `0`
- partial: `17`
- fails: `1` (`C5-B-016`)

## Required C Actions
1. Update Agent ADR cards:
   - add business KPI stop/go gates
   - add profile-based adoption (not one default for all orgs)
2. Update RAG ADR:
   - add incumbent-infra weighting
   - add uncertainty-based reranking policy
   - add embedding/index compatibility and migration rehearsal requirements
3. Update decision assets:
   - every tier recommendation must include trigger + fallback + rollback blast-radius note

## Priority Warning
- If C keeps static default framing for Agent/RAG, downstream execution will overfit medium/large organizations and degrade startup-phase delivery speed.

---

## 规范补全（B 窗口必填 — 方便 C 写 digest 和闭环）

### Top 5 风险（简短描述 + claim_id）
1. **ADR 出口标准仅框架本地指标缺业务 KPI 门禁，不可直接执行** — **C5-B-016**
2. **RAG 默认栈与“必须两段检索”在轻量/现网主导场景会误伤** — **C5-B-008, C5-B-009**
3. **Agent 双跑与强制 MCP 首日对小团队与硬交付期限不友好** — **C5-B-001, C5-B-002**
4. **升级触发仅 100M chunks + P95 忽略单租户热点与队列深度** — **C5-B-011**
5. **Kafka/Spark 仅标 P2 在高文档流速场景会阻塞规模升级** — **C5-B-015**

### 给 C 的 3 条建议行动（可执行、和证据相关）
1. **Agent/RAG ADR 增加业务 KPI 门禁与画像化采纳** — 在 ADR 卡片中增加 task success、operator burden、rollback blast-radius 与 profile（minimal/scale）；证据：C5-B-016 fails，C5-B-001/B-002/B-008。
2. **RAG 默认栈与评分矩阵增加现网基础设施与条件化 rerank** — 在 RAG ADR 中增加 incumbent-infra 权重、按不确定性条件化 rerank、embedding/index 兼容与迁移演练要求；证据：C5-B-008, C5-B-009, C5-B-012。
3. **决策资产每条建议含 trigger + fallback + rollback 影响面** — 在 adoption_backlog 或等价资产中为每层建议补充；证据：C5 全部 partial 的 recommendation_for_c。
