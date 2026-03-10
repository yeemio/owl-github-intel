# Challenge Log C8 (Window B)

## Cycle Metadata

- **cycle_id:** C8
- **date:** 2026-03-09
- **theme:** Upgrade risk + cross-track decision memo
- **reviewer_window:** B (Red Team Reviewer)
- **input_scope:**
  - `10-raw/scans/scan_2026-03-09_A_C8.md`
  - `10-raw/scans/evidence_2026-03-09_A_C8.csv`
  - `10-raw/scans/handoff_A_to_B_2026-03-09_C8.md`
- **output_matrix:** `30-analysis/cross/challenge_matrix_2026-03-09_C8.csv`

## Hard-Metric Check

| Requirement | Target | Actual | Pass |
|-------------|--------|--------|------|
| claims_challenged | ≥ 12 | 12 | ✓ |
| counter_sources | ≥ claims_challenged | 12 | ✓ |
| every_claim_has_verdict | true | true | ✓ |

## Verdict Distribution

| Verdict | Count |
|---------|-------|
| survives | 0 |
| partial | 11 |
| fails | 1 |

## Per-Claim Summary and Verdict

### C8-A01 — partial
**Claim:** Upgrade risk matrix (explicit breaking vs no_clear_breaking) is the single source of truth for upgrade prioritization.  
**Challenge:** Holds only when changelog coverage is complete; no_clear_breaking can hide breaks in sparse or automated changelog.  
**Counter source:** https://github.com/protectai/llm-guard  
**Verdict:** partial — Add changelog-quality flag and code-diff requirement for no_clear_breaking.

### C8-A02 — partial
**Claim:** Executive research digest and decision memo at end of C8 are the canonical publishable outputs for stakeholders.  
**Challenge:** Canonical for “research closure” audience; ops and eng need live backlog and risk register.  
**Counter source:** 40-insights/backlogs/master_action_backlog_2026-03-09.md  
**Verdict:** partial — Clarify audience and add pointer to operational assets.

### C8-A03 — partial
**Claim:** Two-step rollout (canary → partial prod → full prod) with auto-rollback on policy reject spike is sufficient for all upgrade waves.  
**Challenge:** Sufficient for single-region/single-tenant; multi-region or high-tenant blast radius may need more steps.  
**Counter source:** https://github.com/kyverno/kyverno/releases  
**Verdict:** partial — Add step count and scope by blast-radius class.

### C8-A04 — partial
**Claim:** Versioned adapters for PyRIT/TruLens/OTel absorb API drift and reduce upgrade blast radius.  
**Challenge:** Adapters add maintenance burden and can lag behind multi-version support.  
**Counter source:** https://github.com/truera/trulens/releases  
**Verdict:** partial — Document adapter maintenance SLA and version support window.

### C8-A05 — partial
**Claim:** MCP-first then serving then orchestration upgrade order is the default sequence for OwlClaw.  
**Challenge:** CVE or compliance can force serving or orchestration first.  
**Counter source:** https://github.com/modelcontextprotocol/python-sdk/releases  
**Verdict:** partial — Add event-driven reorder and exception path (e.g. CVE/compliance).

### C8-A06 — partial
**Claim:** Pin to v0.10.x / v0.145.x with rollback suggestion is adequate remediation for high-migration-complexity releases.  
**Challenge:** Pin alone does not define how long the pin is safe (CVE, support EOL).  
**Counter source:** https://github.com/open-telemetry/opentelemetry-collector/releases  
**Verdict:** partial — Add pin expiry and security-backport policy.

### C8-A07 — fails
**Claim:** Temporary exception policy with expiry and compensating controls covers all waiver cases.  
**Challenge:** C7-B-016: expiry without enforcement leads to permanent exceptions; manual expiry is insufficient.  
**Counter source:** 30-analysis/cross/challenge_matrix_2026-03-09_C7.csv  
**Verdict:** fails — Automated exception-expiry check and escalation required; do not rely on manual expiry only.

### C8-A08 — partial
**Claim:** P0 wave Week 1–2 and P1 wave Week 3–5 is execution-ready without dependency on incident freeze or owner availability.  
**Challenge:** C7 handoff required: owner availability and incident-freeze dependency for waves.  
**Counter source:** 20-normalized/handoff_B_to_C_2026-03-09_C7.md  
**Verdict:** partial — Wave timing not execution-ready without these; add to rollout plan.

### C8-A09 — partial
**Claim:** Recommendation A (LangGraph + MCP + Qdrant + LiteLLM + Istio + Langfuse) is the production-default stack for OwlClaw.  
**Challenge:** Single combo assumes org has mesh and multi-stack capacity; small team or single-provider constraint.  
**Counter source:** https://github.com/istio/istio  
**Verdict:** partial — Label as scale profile and add minimal profile.

### C8-A10 — partial
**Claim:** Changelog-quality and no_clear_breaking classification does not require code-diff or compatibility-test evidence.  
**Challenge:** Sparse or automated changelog can misclassify no_clear_breaking.  
**Counter source:** https://github.com/aquasecurity/trivy/releases  
**Verdict:** partial — Add code-diff or compatibility-test requirement for no_clear_breaking.

### C8-A11 — partial
**Claim:** Keep previous known-good artifact bundle is sufficient rollback preparation for all components.  
**Challenge:** Bundle may not include state or runtime-generated config; stateful components need explicit state snapshot and config export.  
**Counter source:** https://github.com/mem0ai/mem0/releases  
**Verdict:** partial — Define state snapshot and config export for stateful components.

### C8-A12 — partial
**Claim:** Cross-track decision memo ownership and review cadence can be quarterly without loss of decision freshness.  
**Challenge:** Quarterly can lag behind CVE or major release churn.  
**Counter source:** 40-insights/risks/upgrade-risk-matrix.md  
**Verdict:** partial — Add trigger-based review (e.g. P0 release, CVE) and keep quarterly as minimum floor.

## Failed Claim (C Action Required)

- **C8-A07:** Temporary exception policy with expiry and compensating controls covers all waiver cases.  
  - **Why failed:** C7-B-016 already established that expiry without automated enforcement leads to permanent exceptions; A re-asserted the same policy without automation.  
  - **Required C action:** Implement automated exception-expiry check and escalation; do not rely on manual expiry only; document in decision memo and risk register.

## Red-Team Pattern Summary

1. **Upgrade matrix:** Single source of truth and no_clear_breaking need changelog-quality and code-diff/compat-test (A01, A10).  
2. **Rollout and waves:** Two-step and wave timing need blast-radius and owner/incident dependencies (A03, A08).  
3. **Exception and rollback:** Exception policy must have automated expiry (A07 fails); pin and artifact bundle need expiry and state/config rules (A06, A11).  
4. **Cross-track:** Recommendation A and decision cadence need profile labeling and trigger-based review (A09, A12).

## Mandatory Rewrite Requests for Window C

1. **Exception policy:** Add automated exception-expiry check and escalation; do not treat manual expiry as sufficient.  
2. **Upgrade matrix:** Add changelog-quality flag and code-diff/compatibility-test requirement for no_clear_breaking.  
3. **Rollout plan:** Add owner-availability and incident-freeze dependency for waves; add step count and scope by blast-radius class.  
4. **Decision memo / executive digest:** Clarify audience (research vs ops); add trigger-based review (P0 release, CVE) with quarterly minimum; label Recommendation A as scale profile and add minimal profile.
