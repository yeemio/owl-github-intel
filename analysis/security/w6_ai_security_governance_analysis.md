# W6 AI Security Governance Analysis (Deep-Dive for Agent Platform)

## Scope
- Sample size: **57** entries (projects + standards), including archived references for historical baseline.
- Source constraints: web search + web page/API reading only.
- Structured asset: `w6_ai_security_governance_map.csv`.
- Execution mapping assets: `w6_ai_security_control_module_mapping.csv` and `w6_ai_security_control_module_mapping.md`.
- Accessibility note: NIST and CISA pages returned 403 in this environment, so controls below are built from accessible sources.
  Sources: <https://www.nist.gov/itl/ai-risk-management-framework>, <https://www.cisa.gov/resources-tools/ai-security>

## Threat Chain View (for OwlClaw-like Agent Infra)
1. **Ingress poisoning**: user input, web page, retrieved doc injects malicious instructions.
2. **Privilege pivot**: model output triggers over-privileged tools.
3. **Unsafe materialization**: generated code/config/queries become executable artifacts.
4. **Silent drift**: lack of normalized telemetry weakens incident attribution.
5. **Weak governance**: no signed provenance or policy gate before release.

Evidence that this chain is practical in current ecosystem:
- Prompt injection and jailbreak attack/benchmark tooling is mature and active.
  Sources: <https://api.github.com/repos/NVIDIA/garak>, <https://api.github.com/repos/promptfoo/promptfoo>, <https://api.github.com/repos/Azure/PyRIT>, <https://api.github.com/repos/liu00222/Open-Prompt-Injection>, <https://api.github.com/repos/microsoft/BIPIA>
- Agent-level attack surface is extending to MCP, skill packs, and infra scans.
  Sources: <https://api.github.com/repos/Tencent/AI-Infra-Guard>, <https://api.github.com/repos/msoedov/agentic_security>

## Coverage Deepening by Control Domain

### 1) 输入防护 (Prompt Injection)
- Strong offensive/benchmark ecosystem means defenses must be regression-tested, not static-rule only.
  Sources: <https://api.github.com/repos/promptfoo/promptfoo>, <https://api.github.com/repos/Azure/PyRIT>, <https://api.github.com/repos/NVIDIA/garak>, <https://api.github.com/repos/microsoft/BIPIA>
- Archived projects still useful as negative baseline corpora, but not runtime dependencies.
  Sources: <https://api.github.com/repos/protectai/rebuff>, <https://api.github.com/repos/trailofbits/copilot-prompt-injection-demo>

### 2) 工具权限边界 (Tool Abuse)
- Policy engine + relation-based auth + sandbox isolation should be treated as one stack.
  Sources: <https://api.github.com/repos/open-policy-agent/opa>, <https://api.github.com/repos/openfga/openfga>, <https://api.github.com/repos/authzed/spicedb>, <https://api.github.com/repos/casbin/casbin>, <https://api.github.com/repos/ory/keto>, <https://api.github.com/repos/e2b-dev/E2B>, <https://api.github.com/repos/alibaba/OpenSandbox>, <https://api.github.com/repos/abshkbh/arrakis>, <https://api.github.com/repos/SWE-agent/SWE-ReX>

### 3) 输出校验 (Output Safety)
- Output safety needs three gates: structure gate, secrets/privacy gate, executable risk gate.
  Sources: <https://api.github.com/repos/guardrails-ai/guardrails>, <https://api.github.com/repos/NVIDIA-NeMo/Guardrails>, <https://api.github.com/repos/microsoft/presidio>, <https://api.github.com/repos/gitleaks/gitleaks>, <https://api.github.com/repos/semgrep/semgrep>, <https://api.github.com/repos/google/osv-scanner>, <https://api.github.com/repos/aquasecurity/trivy>, <https://api.github.com/repos/anchore/grype>
- Add refusal/safety benchmark to continuously calibrate model behavior drift.
  Sources: <https://api.github.com/repos/SORRY-Bench/sorry-bench>, <https://api.github.com/repos/Giskard-AI/phare>

### 4) 审计追踪 (Auditability)
- Agent audit should include both app-level trace and infra/runtime detections.
  Sources: <https://api.github.com/repos/langfuse/langfuse>, <https://api.github.com/repos/Arize-ai/phoenix>, <https://api.github.com/repos/truera/trulens>, <https://api.github.com/repos/open-telemetry/opentelemetry-collector>, <https://api.github.com/repos/open-telemetry/opentelemetry-specification>, <https://api.github.com/repos/falcosecurity/falco>, <https://api.github.com/repos/elastic/detection-rules>

### 5) 策略执行 (Policy Governance)
- Governance should be machine-enforced with verifiable evidence artifacts (SBOM/signature/provenance), not docs-only.
  Sources: <https://api.github.com/repos/anchore/syft>, <https://api.github.com/repos/sigstore/cosign>, <https://api.github.com/repos/in-toto/in-toto>, <https://api.github.com/repos/slsa-framework/slsa>
- Regulatory and attack-taxonomy frameworks should map to policy controls and audit evidence.
  Sources: <https://owasp.org/www-project-top-10-for-large-language-model-applications/>, <https://atlas.mitre.org>, <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai>

## MVSB v2 (Minimum Viable Security Baseline)

### A. MUST Controls (上线门槛)
1. **Ingress Injection Gate**
   - All inbound contexts (user, retrieval, web, MCP content) pass risk classifier + blocklist/heuristics + attack regression.
   - KPI: High-risk injection recall >= 90% on red-team suite; false-positive rate <= 5% for trusted corpora.
   References: <https://api.github.com/repos/protectai/llm-guard>, <https://api.github.com/repos/NVIDIA/garak>, <https://api.github.com/repos/promptfoo/promptfoo>, <https://api.github.com/repos/Azure/PyRIT>, <https://api.github.com/repos/microsoft/BIPIA>

2. **Policy-Enforced Tool Invocation**
   - Tool call requires explicit `subject-resource-action-condition` decision and defaults to deny.
   - High-risk actions require dual check: static policy allow + runtime risk allow.
   - KPI: Unauthorized tool call success rate = 0 in staging attack suite.
   References: <https://api.github.com/repos/open-policy-agent/opa>, <https://api.github.com/repos/openfga/openfga>, <https://api.github.com/repos/cedar-policy/cedar>, <https://api.github.com/repos/authzed/spicedb>

3. **Sandboxed Execution Plane**
   - All code/command/file/network-capable tools run in isolated runtime with restricted egress and ephemeral credentials.
   - KPI: Host escape incidents = 0; cross-tenant leakage incidents = 0.
   References: <https://api.github.com/repos/e2b-dev/E2B>, <https://api.github.com/repos/alibaba/OpenSandbox>, <https://api.github.com/repos/abshkbh/arrakis>, <https://api.github.com/repos/SWE-agent/SWE-ReX>

4. **Output Execution Firewall**
   - Executable outputs must pass schema constraints + secret/PII scan + SAST/dependency/container scan before action.
   - KPI: Critical vuln artifacts blocked before release >= 99%; secret leakage to user output = 0.
   References: <https://api.github.com/repos/guardrails-ai/guardrails>, <https://api.github.com/repos/microsoft/presidio>, <https://api.github.com/repos/gitleaks/gitleaks>, <https://api.github.com/repos/semgrep/semgrep>, <https://api.github.com/repos/google/osv-scanner>, <https://api.github.com/repos/aquasecurity/trivy>, <https://api.github.com/repos/anchore/grype>

5. **End-to-End Security Telemetry**
   - Log every decision hop: input fingerprint, policy decision id, tool call id, model/version, prompt version, block reason.
   - Align event schema with OTel conventions for SIEM and incident response.
   - KPI: P1 incident replayability >= 95% (can reconstruct full chain).
   References: <https://api.github.com/repos/open-telemetry/opentelemetry-collector>, <https://api.github.com/repos/open-telemetry/opentelemetry-specification>, <https://api.github.com/repos/langfuse/langfuse>

6. **Supply-Chain Policy Gate**
   - Require SBOM generation + signature verification + provenance attestation before deploy.
   - KPI: Unsigned artifact deployment = 0.
   References: <https://api.github.com/repos/anchore/syft>, <https://api.github.com/repos/sigstore/cosign>, <https://api.github.com/repos/in-toto/in-toto>, <https://api.github.com/repos/slsa-framework/slsa>

### B. SHOULD Controls (30-90天增强)
1. **Continuous Safety Benchmarking**
   - Track refusal and safety drift with fixed benchmark set at each model/prompt release.
   References: <https://api.github.com/repos/SORRY-Bench/sorry-bench>, <https://api.github.com/repos/Giskard-AI/phare>, <https://api.github.com/repos/truera/trulens>, <https://api.github.com/repos/Arize-ai/phoenix>

2. **SOC Integration for Agent Runtime**
   - Bridge runtime signals to SOC rule pipeline for threat hunting.
   References: <https://api.github.com/repos/falcosecurity/falco>, <https://api.github.com/repos/elastic/detection-rules>

3. **Policy Mapping to External Frameworks**
   - Maintain control-to-framework mapping for OWASP LLM, MITRE ATLAS, EU AI Act.
   References: <https://owasp.org/www-project-top-10-for-large-language-model-applications/>, <https://atlas.mitre.org>, <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai>

## Implementation Blueprint for OwlClaw-like Platform

### Phase P0 (0-30 days): Block obvious high-risk paths
- Deploy ingress injection checks + deny-by-default tool policy + minimum audit fields.
- Wire output secret/PII and code/dependency scans before execution.
Sources: <https://api.github.com/repos/protectai/llm-guard>, <https://api.github.com/repos/promptfoo/promptfoo>, <https://api.github.com/repos/open-policy-agent/opa>, <https://api.github.com/repos/openfga/openfga>, <https://api.github.com/repos/gitleaks/gitleaks>, <https://api.github.com/repos/semgrep/semgrep>

### Phase P1 (31-60 days): Stabilize and measure
- Introduce sandbox execution isolation and red-team CI baselines.
- Standardize telemetry schema and incident replay process.
Sources: <https://api.github.com/repos/e2b-dev/E2B>, <https://api.github.com/repos/alibaba/OpenSandbox>, <https://api.github.com/repos/Azure/PyRIT>, <https://api.github.com/repos/NVIDIA/garak>, <https://api.github.com/repos/open-telemetry/opentelemetry-specification>

### Phase P2 (61-90 days): Governance at scale
- Enforce SBOM/signature/provenance policy gate.
- Link controls to OWASP/ATLAS/EU evidence package for governance reporting.
Sources: <https://api.github.com/repos/anchore/syft>, <https://api.github.com/repos/sigstore/cosign>, <https://api.github.com/repos/in-toto/in-toto>, <https://api.github.com/repos/slsa-framework/slsa>, <https://owasp.org/www-project-top-10-for-large-language-model-applications/>, <https://atlas.mitre.org>, <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai>

## Residual Risks and Design Warnings
- Archived repos are useful for test corpora only; avoid production dependency lock-in.
  Sources: <https://api.github.com/repos/protectai/rebuff>, <https://api.github.com/repos/trailofbits/copilot-prompt-injection-demo>, <https://api.github.com/repos/kubewarden/policy-server>
- License diversity is non-trivial (NOASSERTION / AGPL / custom terms). Procurement and legal review must be part of integration gate.
  Sources: <https://api.github.com/repos/Tencent/AI-Infra-Guard>, <https://api.github.com/repos/NVIDIA-NeMo/Guardrails>, <https://api.github.com/repos/Giskard-AI/phare>, <https://api.github.com/repos/abshkbh/arrakis>
- Standards access constraints (NIST/CISA 403 here) mean external verification workflow should include alternate mirrors in your process.
  Sources: <https://www.nist.gov/itl/ai-risk-management-framework>, <https://www.cisa.gov/resources-tools/ai-security>
