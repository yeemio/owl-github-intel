# Starter Pack (10-minute decision kit)

If you are evaluating AI dev stacks (agents, MCP, RAG, gateway, eval, security), this repository is designed to save you time and reduce risk.

This page is the fastest way to get value from the repo without reading the full analysis set.

---

## What you get (concrete outcomes)

- A **normalized master table** you can filter and reuse:
  - `../data/master/repo_master.csv`
- A **current adoption shortlist** with P0/P1/P2 posture:
  - `../insights/adoption_backlog.md`
- **Risk intelligence** you can plug into rollout plans:
  - `../data/risks/failure-patterns.md` (recurring failure signatures)
  - `../data/risks/upgrade-risk-matrix.md` (breaking change + migration risk)
  - `../data/risks/master_risk_register_2026-03-09.csv` (risk register)

## What problems this helps you avoid

- Picking tools from popularity alone (no boundaries, no rollback, no evidence).
- Upgrading into breaking changes without a migration plan.
- Shipping agents/tools without timeouts, redaction, and boundary controls.
- Having no “decision record” for why a stack was adopted and under what conditions.

## How to use (10 minutes)

1. Open the adoption decisions:
   - `../insights/adoption_backlog.md`
2. Open the master table and filter by your lane:
   - `../data/master/repo_master.csv`
   - Suggested filter fields: `topic`, `adoption_priority`, `decision_verdict`, `risk_level`
3. Before you adopt anything, scan the two risk pages:
   - `../data/risks/failure-patterns.md`
   - `../data/risks/upgrade-risk-matrix.md`

## Decision template (copy/paste)

Use this structure in your own docs or tickets:

- Candidate:
  - Repo:
  - Adopt priority: `P0|P1|P2`
  - Verdict: `survives|partial|fails`
- Why (one sentence):
- Boundaries:
  - Where it is allowed:
  - Where it is NOT allowed:
- Risk signals:
- Rollback signals:
- Upgrade risk notes (if any):
- Evidence links:
  - Issue / release URLs:
  - This repo evidence row(s):

## If you need depth (pick one track)

- Agent: `../analysis/agent/`
- MCP: `../analysis/mcp/`
- RAG: `../analysis/rag/`
- Gateway: `../analysis/gateway/`
- Eval: `../analysis/eval/`
- Security: `../analysis/security/`
- Cross-track synthesis: `../analysis/cross/`

---

## 中文：10分钟决策包

如果你在做 AI 开发栈选型（Agent/MCP/RAG/网关/评测/安全），这个仓库的目标是帮你更快做出可追溯、可回滚的决策。

- 先看决策清单：`../insights/adoption_backlog.md`
- 再按字段筛主表：`../data/master/repo_master.csv`
- 最后过风险两张表：
  - `../data/risks/failure-patterns.md`
  - `../data/risks/upgrade-risk-matrix.md`

### 带入你的库（BYO Inventory）

如果你有自己的技术栈清单（GitHub 仓库、工具、组件），可以直接生成一份“对照报告”：

- 模板：`../templates/user_inventory.csv`
- 使用说明：`../docs/BRING_YOUR_STACK.md`
