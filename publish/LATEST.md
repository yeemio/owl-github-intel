# LATEST

Decision baseline updated: 2026-03-10

## Use This Repo For

- Adopt with posture: P0/P1/P2 decisions with boundaries and rollback signals.
- Reduce production risk: failure patterns + upgrade risk matrix + risk register.
- Save time: curated datasets and track analyses instead of link-chasing.

## Start Here (10 minutes)

- Decision kit: `starter_pack.md`
- Adoption decisions: `../insights/adoption_backlog.md`
- Master dataset: `../data/master/repo_master.csv`
- Risks: `../data/risks/failure-patterns.md` and `../data/risks/upgrade-risk-matrix.md`

## Current P0 (Scale profile)

- `modelcontextprotocol/servers`
- `modelcontextprotocol/typescript-sdk`
- `BerriAI/litellm`
- `langfuse/langfuse`
- `langchain-ai/langgraph`
- `qdrant/qdrant`

## Top Open High Risks

- `R001` NOASSERTION in core gateway component (BerriAI/litellm)
- `R002` NOASSERTION in eval platform (langfuse/langfuse)
- `R003` Archived security baseline reused (protectai/rebuff)
- `R005` External MCP server supply-chain risk (modelcontextprotocol/servers)
- `R006` Unsigned artifact deployment (全组件CI/CD)

## Latest Digests

- `digests/weekly_digest_2026-03-09_C9.md`
- `digests/weekly_digest_2026-03-09_C8.md`
- `digests/weekly_digest_2026-03-09_C6.md`
- `digests/weekly_digest_2026-03-09_C2.md`
- `digests/weekly_digest_2026-03-09_C1.md`

## Recent Changes (high-signal)

- See `../index/CHANGELOG.md`.

---

If you want the full navigation index: `../index/MASTER_INDEX.md`.
