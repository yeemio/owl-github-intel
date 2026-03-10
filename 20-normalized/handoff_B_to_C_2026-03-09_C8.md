# Handoff B → C (2026-03-09 C8)

Theme: **Upgrade risk + cross-track decision memo**

## B Deliverables

- **matrix:** `30-analysis/cross/challenge_matrix_2026-03-09_C8.csv`
- **log:** `30-analysis/cross/challenge_log_2026-03-09_C8.md`
- **challenged claims:** 12
- **verdict coverage:** 100%

## Summary Counts

| Verdict | Count |
|---------|-------|
| survives | 0 |
| partial | 11 |
| fails | 1 |

**Failed claim:** C8-A07 (temporary exception policy without automated expiry).

## Top 3 Risks for C

1. **Exception policy remains non-automated** — C8-A07 fails (same as C7-B-016): “Temporary exception with expiry and compensating controls” is insufficient without automated expiry enforcement; exceptions become permanent and governance degrades. C must implement automated exception-expiry check and escalation and document in decision memo and risk register.
2. **Upgrade matrix and no_clear_breaking over-trusted** — A01, A10: Matrix as single source of truth and no_clear_breaking classification can hide breaks when changelog is sparse or automated. C must add changelog-quality flag and code-diff or compatibility-test requirement for no_clear_breaking.
3. **Wave timing and default stack presented as unconditional** — A08, A09: P0/P1 wave timing is not execution-ready without owner availability and incident-freeze dependency (C7); Recommendation A as “production-default” over-assumes org capacity. C must add rollout dependencies and label stack as scale profile with minimal profile alternative.

## Suggested C Actions

1. **Exception policy (P0)**  
   - Implement automated exception-expiry check and escalation.  
   - Do not rely on manual expiry only.  
   - Update risk register and decision memo with this requirement.

2. **Upgrade risk matrix**  
   - Add changelog-quality / coverage flag.  
   - For no_clear_breaking: require code-diff or compatibility-test evidence before treating as low risk.  
   - Add pin expiry and security-backport policy for pin-based rollback.

3. **Rollout plan**  
   - Add dependency on owner availability and incident freeze for wave execution.  
   - Add step count and scope by blast-radius class (multi-region / high-tenant).  
   - Document baseline refresh and golden-set coverage where applicable.

4. **Cross-track decision memo and executive digest**  
   - Clarify audience (research closure vs ops/eng live assets).  
   - Add trigger-based review (P0 release, CVE) with quarterly minimum for decision memo.  
   - Label Recommendation A as “scale profile” and add “minimal profile” option.

5. **Rollback and adapters**  
   - Define state snapshot and config export for stateful components (e.g. Mem0).  
   - Document adapter maintenance SLA and version support window for PyRIT/TruLens/OTel.

## Priority Warning

C8-A07 is the same failure mode as C7-B-016. If C does not add automated exception-expiry enforcement, the decision memo and upgrade governance will retain a known-high risk that has now failed two consecutive cycles.
