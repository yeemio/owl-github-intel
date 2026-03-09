# Upgrade Risk Rollout Plan (P0/P1/P2)

## Purpose
Turn `upgrade-risk-matrix.csv` into execution-ready rollout waves with explicit gates, rollback triggers, and ownership.

## Wave Strategy

### P0 (Week 1-2): Highest Blast Radius / Explicit Breaking
- `open-telemetry/opentelemetry-collector` (Go 1.25 + API/config breaks)
- `open-policy-agent/gatekeeper` (VAP enforcement scope behavior shift)
- `Azure/PyRIT` (core object model/API refactor)
- `NVIDIA-NeMo/Guardrails` (config schema changes + runtime baseline changes)

### P1 (Week 3-5): Medium Risk Platform Integrations
- `semgrep/semgrep` (MCP transport/auth migration)
- `truera/trulens` (Metric API migration)
- `open-telemetry/opentelemetry-specification` aligned stack updates
- `openfga/openfga`, `authzed/spicedb`, `kyverno/kyverno` staged policy/authz updates

### P2 (Week 6-8): Low-Risk/No-Clear-Breaking Track
- Scanner/tooling repos with no explicit breaking flags in releases
- Keep minor-version pinning, monthly drift check, and shadow-run verification

## Upgrade Gates (Mandatory)

1. **Schema/API Contract Gate**
   - Run compatibility tests for prompt/tool/output/telemetry schemas.
   - Block rollout if parsing failure rate increases by more than 0.5%.

2. **Policy Behavior Gate**
   - Replay fixed policy corpus (allow/deny golden set).
   - Block rollout if deny drift exceeds 2% on approved traffic.

3. **Runtime SLO Gate**
   - p95 latency and error budget checks in canary.
   - Block rollout if p95 regresses more than 15% or error rate more than 1.5x baseline.

4. **Security Outcome Gate**
   - Prompt injection/tool abuse benchmark replay.
   - Block rollout if high-risk block rate drops below target baseline.

## Rollback Rules (Unified)

- Trigger immediate rollback when one condition is met:
  - policy deny/allow drift > 5% for approved regression corpus
  - production error rate > 2x baseline for 10 minutes
  - telemetry ingestion failure > 1% sustained for 15 minutes
  - critical workflow success rate drops below 98%

- Rollback sequence:
  1. freeze rollout
  2. revert image/version pin
  3. revert config bundle/policy bundle
  4. restore previous parser adapter if applicable
  5. replay smoke + security regression suite

## Repo-Level Priority Actions

| repo | immediate action | owner suggestion | target wave |
|---|---|---|---|
| open-telemetry/opentelemetry-collector | Upgrade CI builder/runtime to Go 1.25 before bump | Platform/SRE | P0 |
| open-policy-agent/gatekeeper | Explicitly set and test `sync-vap-enforcement-scope` behavior before upgrade | Security Platform | P0 |
| Azure/PyRIT | Build compatibility adapter (`SeedPromptGroup` -> `Message`) and run dual execution tests | LLM Security Eng | P0 |
| NVIDIA-NeMo/Guardrails | Add config transform for removed `streaming` field and reasoning-field parser checks | LLM Platform | P0 |
| semgrep/semgrep | Migrate MCP client to OAuth + supported transport; retire SSE clients | AppSec Platform | P1 |
| truera/trulens | Migrate `Feedback` to `Metric` API with selector mapping tests | Observability Eng | P1 |
| openfga/openfga / authzed/spicedb | Stage relation-model evolution with dual-read window | IAM/Platform | P1 |
| kyverno/kyverno | Namespace canary and policy dry-run before cluster-wide rollout | Kubernetes Security | P1 |

## Recommended Cadence
- Weekly: release triage + risk re-score.
- Bi-weekly: canary rollout window.
- Monthly: full regression replay and rollback drill.
