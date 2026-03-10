# Handoff A -> B (2026-03-09 C6)

Theme: Upgrade risk + cross-track decision evidence

## A Window Hard Metric Status

- source_count >= 30: PASS (35 evidence rows; ≥30 unique source URLs)
- hard_evidence_count >= 10 (issue/PR/release): PASS (28 from issue/release/changelog)
- new_claims: 12 (every claim has claim_id and at least one source URL)

## Claims To Challenge

- **C6-A01**: LiteLLM proxy DB migrations can be recorded as applied while columns are missing, causing silent 500s on upgrade.
- **C6-A02**: Handoff/history changes in OpenAI Agents SDK break compatibility and parsing (nest_handoff_history, to_input_list).
- **C6-A03**: MCP server tool return-type changes (array vs string) break client expectations and cause -32602 errors.
- **C6-A04**: Qdrant minor upgrades can introduce internal errors and snapshot restore failures requiring rollback.
- **C6-A05**: DeepEval minor upgrades break model config (Gemini judge, Azure deployment) and remove metrics without clear migration path.
- **C6-A06**: NeMo Guardrails major release removes streaming config and moves reasoning traces, causing config/schema migration pain.
- **C6-A07**: Langfuse self-hosted upgrades can break ClickHouse migrations and cause internal server errors loading traces.
- **C6-A08**: Provider-specific translation bugs (Bedrock, Vertex) cause breaking behavior and overbilling after gateway/LiteLLM upgrades.
- **C6-A09**: RAGAS version upgrades change metric APIs and schema (e.g. v0.4) causing evaluate() and indicator compatibility failures.
- **C6-A10**: Explicit breaking changes in the AI stack are concentrated in observability, gateway, and security guardrails.
- **C6-A11**: Rollback readiness (pin version, snapshot restore, last-known-good) is documented in upgrade-risk matrix for agent, gateway, RAG, eval, security.
- **C6-A12**: Cross-track upgrade decisions (agent + MCP + gateway + eval) should consider compatibility pairs and atomic rollback units.

## Priority Attack Targets

1. **C6-A01**: Whether “migrations recorded but columns not created” is a single bug or a class of migration/versioning failure across LiteLLM extras.
2. **C6-A02**: Whether handoff breaking changes in v0.6.0 are fully documented and whether non-OpenAI model breakage is a supported scenario.
3. **C6-A10**: Whether “concentrated in observability, gateway, security” is sampling bias (repos we track) vs ecosystem-wide.
4. **C6-A12**: Whether internal handoff/scoreboard evidence supports “atomic rollback units” as a cross-track recommendation.

## Open Questions for B

- Are there public post-mortems or runbooks that contradict or reinforce rollback practices (C6-A11) for Langfuse, LiteLLM, Qdrant?
- For MCP (C6-A03), is the filesystem return-type break a spec ambiguity or a server bug; does the MCP spec mandate string vs array for these tools?
- For eval (C6-A05, C6-A09), do maintainers document migration guides for removed metrics (e.g. ConversationRelevancyMetric) and for RAGAS v0.4 API changes?
- Does the upgrade-risk-matrix (and C6-A10/A11) over-weight our curated repo set and under-weight other ecosystems (e.g. closed-source or non-GitHub stacks)?

## Evidence and Scan References

- Evidence file: `sources/scans/evidence_2026-03-09_A_C6.csv`
- Scan file: `sources/scans/scan_2026-03-09_A_C6.md`
