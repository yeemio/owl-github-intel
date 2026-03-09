# Upgrade Risk Matrix (Top 30 Security Repos, Last 12 Months)

## Scope
- Time window: last 12 months release notes/changelog.
- Method: prioritized explicit "breaking"/"deprecated"/default behavior change signals, then high-risk operational shifts.
- Repo set: top 30 security ecosystem repos used in previous governance mapping.

## A) Explicit Breaking Changes (Action First)

| repo | release | breaking change | impact area | migration complexity | rollback suggestion | source |
|---|---|---|---|---|---|---|
| Azure/PyRIT | v0.11.0 (2026-02) | Attacks/executors switched to `Message` instead of `SeedPromptGroup`; scenario/config APIs renamed; scorer registry protocols refactored. | API/配置 | High | Pin to `v0.10.x`, keep adapter layer for legacy objects, dual-run regression suite before cutover. | https://github.com/Azure/PyRIT/releases/tag/v0.11.0 |
| Azure/PyRIT | v0.10.0 (2025-12) | OpenAI target args realigned (`api_version` removed, endpoint format changed, auth args changed). | API/配置 | High | Keep old target wrapper in compatibility branch; rollback by restoring legacy endpoint/auth wiring. | https://github.com/Azure/PyRIT/releases/tag/v0.10.0 |
| truera/trulens | trulens-2.7.0 (2026-02) | New `Metric` API replaces `Feedback`/`MetricConfig` (deprecated path retained but migration required). | API | Medium | Freeze at `2.6.x`, retain deprecated `Feedback` path until selector mapping tests pass. | https://github.com/truera/trulens/releases/tag/trulens-2.7.0 |
| NVIDIA-NeMo/Guardrails | v0.20.0 (2026-01) | `streaming` field removed from config. | 配置 | Medium | Keep prior config schema and pin `v0.19.x`; add schema transform script before upgrade retry. | https://github.com/NVIDIA-NeMo/Guardrails/releases/tag/v0.20.0 |
| NVIDIA-NeMo/Guardrails | v0.18.0 (2025-11) | Reasoning traces moved to separate `reasoning` field (no longer prepended into bot message). | API/数据 | Medium | Rollback parser changes and re-enable legacy text extraction path on `v0.17.x`. | https://github.com/NVIDIA-NeMo/Guardrails/releases/tag/v0.18.0 |
| NVIDIA-NeMo/Guardrails | v0.18.0 (2025-11) | Python 3.9 support dropped. | 部署 | Medium | Revert runtime image/tag to Python 3.9-compatible release while upgrading base image pipeline to 3.10+. | https://github.com/NVIDIA-NeMo/Guardrails/releases/tag/v0.18.0 |
| open-telemetry/opentelemetry-collector | v0.146.0 (2026-02) | Minimum Go version raised to 1.25. | 部署 | High | Keep prior collector build chain (`v0.145.x`) until toolchain and CI images are upgraded. | https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.146.0 |
| open-telemetry/opentelemetry-collector | v0.144.0 (2026-01) | Deprecated feature gates removed; config/API breakages noted (`ServerConfig.Endpoint` replacement etc.). | API/配置 | High | Maintain old config template set and component factory signatures on previous minor until migration validated. | https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.144.0 |
| open-policy-agent/gatekeeper | v3.21.0 -> v3.22 line (2025-11 onward) | `sync-vap-enforcement-scope` planned default flip to true and eventual flag removal (enforcement scope behavior change). | 配置/部署 | High | Explicitly set old flag behavior before upgrade; rollback to `v3.21.x` if VAP scope drifts. | https://github.com/open-policy-agent/gatekeeper/releases/tag/v3.21.0 |
| semgrep/semgrep | v1.150.0 (2026-01) | MCP server streamableHttp now requires OAuth. | API/配置 | Medium | Keep non-OAuth integration on `v1.149.x`; introduce token bootstrap and fallback auth path. | https://github.com/semgrep/semgrep/releases/tag/v1.150.0 |
| semgrep/semgrep | v1.149.0 (2026-01) | MCP server no longer supports SSE transport. | API | Medium | Re-enable SSE by pinning `v1.148.x` while migrating clients to supported transport. | https://github.com/semgrep/semgrep/releases/tag/v1.149.0 |
| open-telemetry/opentelemetry-specification | v1.54.0 (2026-02) | OT Trace propagator + Jaeger propagator deprecated/optional (implementation behavior can change by distro). | API/配置 | Medium | Keep explicit propagator config and pin SDK/collector combo to previous spec alignment. | https://github.com/open-telemetry/opentelemetry-specification/releases/tag/v1.54.0 |
| open-telemetry/opentelemetry-specification | v1.46.0 (2025-06) | Prometheus mapping changed (`otel_scope_info` removed; new scope labels required). | 数据 | Medium | Roll back exporter/receiver pair version together; keep translation compatibility rule-set in gateway. | https://github.com/open-telemetry/opentelemetry-specification/releases/tag/v1.46.0 |

## B) High-Risk but Not Explicitly Marked "Breaking"

| repo | risk signal | impact area | migration complexity | rollback suggestion | source |
|---|---|---|---|---|---|
| open-policy-agent/opa | Frequent policy/runtime evolution may invalidate strict Rego assumptions across services. | API/配置 | Medium | Canary policy bundles and keep last known-good bundle digest for instant rollback. | https://github.com/open-policy-agent/opa/releases |
| openfga/openfga | Authz model evolution can cause tuple/model incompatibilities if schema rollout is not staged. | 数据/配置 | Medium | Version relation model and keep dual-read period before write switch. | https://github.com/openfga/openfga/releases |
| authzed/spicedb | Permission graph/runtime updates can impact check semantics/latency under large tuple sets. | API/部署 | Medium | Keep previous image + datastore snapshot restore plan. | https://github.com/authzed/spicedb/releases |
| kyverno/kyverno | Policy engine defaults and admission behavior changes often have cluster-wide blast radius. | 配置/部署 | High | Blue/green policy controller rollout with namespace-scoped canary. | https://github.com/kyverno/kyverno/releases |
| guardrails-ai/guardrails | Guardrail schema/runtime updates can alter rejection/pass behavior for existing prompts. | API/配置 | Medium | Lock guardrail config version and replay golden conversations before promoting. | https://github.com/guardrails-ai/guardrails/releases |
| superagent-ai/superagent | Early-stage split release streams (node/rust) and rapid packaging changes raise integration drift risk. | 部署/API | Medium | Pin exact CLI/runtime artifact tag and keep previous binary in rollback bucket. | https://github.com/superagent-ai/superagent/releases |

## C) No Clear Breaking Change Signals in Last 12 Months (Still Track)

- `aquasecurity/trivy` — https://github.com/aquasecurity/trivy/releases
- `gitleaks/gitleaks` — https://github.com/gitleaks/gitleaks/releases
- `langfuse/langfuse` — https://github.com/langfuse/langfuse/releases
- `casbin/casbin` — https://github.com/casbin/casbin/releases
- `anchore/grype` — https://github.com/anchore/grype/releases
- `e2b-dev/E2B` — https://github.com/e2b-dev/E2B/releases
- `promptfoo/promptfoo` — https://github.com/promptfoo/promptfoo/releases
- `falcosecurity/falco` — https://github.com/falcosecurity/falco/releases
- `google/osv-scanner` — https://github.com/google/osv-scanner/releases
- `anchore/syft` — https://github.com/anchore/syft/releases
- `Arize-ai/phoenix` — https://github.com/Arize-ai/phoenix/releases
- `NVIDIA/garak` — https://github.com/NVIDIA/garak/releases
- `alibaba/OpenSandbox` — https://github.com/alibaba/OpenSandbox/releases
- `ory/keto` — https://github.com/ory/keto/releases
- `Giskard-AI/giskard` — https://github.com/Giskard-AI/giskard/releases
- `sigstore/cosign` — https://github.com/sigstore/cosign/releases
- `protectai/llm-guard` — no GitHub Releases page entries; monitor commits/changelog: https://github.com/protectai/llm-guard

## Recommended Upgrade Guardrails for OwlClaw

- Enforce `pre-upgrade contract tests` for: tool router authz, prompt guardrail schema, telemetry ingestion parsers.
- Require `two-step rollout`: canary workspace -> partial prod -> full prod, with auto rollback on policy reject-rate spike.
- Keep `versioned adapters` for PyRIT/TruLens/OTel config objects to absorb API drift.
- For policy engines (OPA/Gatekeeper/Kyverno/OpenFGA), separate `policy bundle rollout` from `runtime binary rollout`.
