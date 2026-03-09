# MCP Intelligence Program Index (W2-W5)

## Program Status
- Status: **Completed**
- Depth level: **execution-ready and audit-ready**
- Scope delivered: ecosystem scan -> shortlist -> gates -> playbook -> field spec -> threat model -> CI jobs -> release scorecard -> evidence manifest

## Deliverables Map

### W2 - Ecosystem Intelligence
- `w2_mcp_ecosystem_map.csv`
- `w2_mcp_ecosystem_analysis.md`
- `w2_mcp_shortlist_top15.csv`
- `w2_mcp_shortlist_top15.md`
- `w2_mcp_deep_dive_top15_matrix.csv`

### W3 - Execution Baseline
- `w3_mcp_execution_checklist.md`
- `w3_mcp_ci_gates.csv`
- `w3_mcp_server_contract_template.json`
- `w3_mcp_execution_playbook_detailed.md`
- `w3_mcp_gate_testcases.csv`

### W4 - Governance Deepening
- `w4_mcp_server_contract_field_spec.md`
- `w4_mcp_p0_tool_test_matrix.csv`
- `w4_mcp_aggregator_threat_model.md`

### W5 - Operationalization
- `w5_mcp_ci_job_spec.md`
- `w5_mcp_release_readiness_scorecard.csv`
- `w5_mcp_evidence_manifest.csv`

## Suggested Execution Order
1. Adopt `w3_mcp_server_contract_template.json` + `w4_mcp_server_contract_field_spec.md`
2. Wire `w3_mcp_ci_gates.csv` into CI using `w5_mcp_ci_job_spec.md`
3. Execute `w4_mcp_p0_tool_test_matrix.csv` for filesystem/git/fetch
4. Run aggregator security controls from `w4_mcp_aggregator_threat_model.md`
5. Score release with `w5_mcp_release_readiness_scorecard.csv`
6. Archive evidence using `w5_mcp_evidence_manifest.csv`

## Completion Definition
- Contract validated (L1/L2/L3)
- CI gates active in premerge/preprod/postdeploy
- P0 tools fully tested (positive/negative/security/resilience/rollback)
- Aggregator threat controls implemented for chosen pattern
- Release score >= policy threshold and evidence archived

