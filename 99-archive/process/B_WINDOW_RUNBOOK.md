# B 窗口执行清单（Red Team Reviewer）

每轮 B 执行前/后按本清单自检，确保 C 能直接用于 digest 与闭环。

**依据**：`index/THREE_WINDOW_WORKFLOW.md` — B 窗口必填规范。

---

## 1. 范围（不能漏）

- [ ] 已读取 A 的 3 个产出：`scan_<date>_A_<C>.md`、`evidence_<date>_A_<C>.csv`、`handoff_A_to_B_<date>_<C>.md`
- [ ] 从 A 的 handoff 或 evidence CSV 中列出**全部 claim_id**
- [ ] `challenge_matrix_<date>_<C>.csv` 中**行数 = A 的 claim 总数**，且每个 claim_id 至少出现一次
- [ ] 每条 claim 均有 **verdict**（`survives` | `partial` | `fails`），尽量每行有 **counter_source_url**

---

## 2. Handoff 必填（方便 C 写 digest 和闭环）

### 2.1 Top 5 风险

格式：**简短描述** + **claim_id**（可多条共一风险）。

- 风险 1：一句话描述；— **claim_id**
- 风险 2：一句话描述；— **claim_id**
- 风险 3：一句话描述；— **claim_id**
- 风险 4：一句话描述；— **claim_id**
- 风险 5：一句话描述；— **claim_id**

优先从 **fails** 与 **partial** 中选对决策/闭环影响最大的 5 条；若 fails ≥1，至少 1 条为 fails。

### 2.2 给 C 的 3 条建议行动

每条需**可执行**且**和证据相关**（能对应到具体文件、矩阵或证据来源）。

- **行动 1**：具体动作 + 涉及文件/资产 + 证据依据（如「在 data/risks/ 中新增…，依据 Cx-Ayy 与 challenge_matrix」）
- **行动 2**：具体动作 + 涉及文件/资产 + 证据依据
- **行动 3**：具体动作 + 涉及文件/资产 + 证据依据

C 应能据此更新 risk 文件、backlog 或 digest，并在「下轮 5 个未知」中引用 B 的 top 5 中至少 2 条。

---

## 3. 产出文件检查

- [ ] `analysis/cross/challenge_log_<date>_<C>.md`：含逐条挑战摘要、verdict、失败 claim 及 C 必做动作
- [ ] `analysis/cross/challenge_matrix_<date>_<C>.csv`：列含 `claim_id`、`challenge_type`、`counter_source_url`、`verdict`、`notes`
- [ ] `99-archive/handoffs/handoff_B_to_C_<date>_<C>.md`：含 **Summary Counts**、**Top 5 风险（简短描述 + claim_id）**、**给 C 的 3 条建议行动**、必要时 Priority Warning

---

## 4. Handoff 模板（复制到新 handoff 时替换占位）

```markdown
## Summary Counts
| Verdict | Count |
|---------|-------|
| survives | ? |
| partial | ? |
| fails | ? |
**Failed claim(s):** <claim_id>（一句话）.

---

## Top 5 风险（简短描述 + claim_id）
1. **<描述>** — **<claim_id>**
2. **<描述>** — **<claim_id>**
3. **<描述>** — **<claim_id>**
4. **<描述>** — **<claim_id>**
5. **<描述>** — **<claim_id>**

---

## 给 C 的 3 条建议行动（可执行、和证据相关）
1. **<行动标题>** — <具体动作、涉及文件、证据依据>
2. **<行动标题>** — <具体动作、涉及文件、证据依据>
3. **<行动标题>** — <具体动作、涉及文件、证据依据>
```

---

**维护**：流程或必填项变更时同步更新本文档与 `THREE_WINDOW_WORKFLOW.md`。

---

## 历史 handoff 合规补全记录

| 周期 | 原 handoff | 规范补全 |
|------|------------|----------|
| C1 | 无 top 5 / 3 条 | 已补「规范补全」：Top 5 风险 + 3 条建议行动 |
| C2 | 无 top 5 / 3 条 | 已补「规范补全」 |
| C3 | 无 top 5 / 3 条 | 已补「规范补全」 |
| C4 | 无 top 5 / 3 条 | 已补「规范补全」 |
| C5 | 无 top 5 / 3 条 | 已补「规范补全」 |
| C6 | 已有 Top 3 Risks + 5 Suggested C Actions | 结构已满足 C 写 digest，未改 |
| C7 | 无 top 5 / 3 条 | 已补「规范补全」 |
| C8 | 已有 Top 5 + 3 条 | 符合必填规范 |
| C9 | 已有 Top 5 + 3 条 | 符合必填规范 |
