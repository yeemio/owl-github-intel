# W6 Security Control to Module Mapping (Execution Pack)

## Purpose
This file operationalizes `w6_ai_security_governance_analysis.md` into owner-ready tasks.

Primary mapping asset:
- `w6_ai_security_control_module_mapping.csv`

## How to Use
1. Import CSV into your tracker (Jira/Linear/Notion).
2. Create one epic per `category` and one story per `control_id`.
3. Make `primary_metric` and `target` mandatory acceptance criteria.
4. Treat `gate_type` as deployment policy:
   - `pre_runtime`: block before tool/model action.
   - `pre_execution`: block before executing generated outputs.
   - `pre_release`/`pre_deploy`: block release path.
   - `runtime`: alerting plus auto-response rules.
   - `governance`: evidence and control registry checks.
5. Store `evidence_artifact` in immutable bucket and link to release ID.

## Recommended Owner Model
- **Security Engineer**: injection defenses, DLP, high-risk tool policy.
- **Platform Engineer**: authz graph, tool router policy integration.
- **SRE**: runtime isolation SLOs and detection response.
- **LLM Engineer**: guardrails schema and safety benchmark drift.
- **DevOps Engineer**: SBOM/signing/provenance gates.
- **GRC Lead**: external framework control mapping.

## Week-By-Week Rollout (90 days)
- **Week 1-2**: IP-01, TB-01, OV-02, AT-01.
- **Week 3-4**: TB-04, OV-03, AT-02, PG-02.
- **Week 5-8**: IP-02, TB-03, OV-04, AT-03, PG-01.
- **Week 9-12**: PG-03, PG-04 plus evidence hardening.

## Fast Validation Checklist
- Injection regression runs on every prompt/model change.
- Unauthorized tool call success rate stays zero.
- No unscanned executable output reaches deployment.
- P1 incident chain replay completes with full provenance.
- Unsigned artifacts cannot pass deploy gate.
