# Failure Patterns from Top 40 AI Dev Repos

Date: 2026-03-09

Scope: 40 repos selected from AI dev stack with >=20 readable issues/discussions each.

## Coverage Audit

| Repo | Items Read | Issues Read | Discussions Read | Status |
|---|---:|---:|---:|---|
| langfuse/langfuse | 50 | 30 | 20 | ok |
| openai/evals | 50 | 30 | 20 | ok |
| openai/simple-evals | 30 | 30 | 0 | ok |
| huggingface/lighteval | 30 | 30 | 0 | ok |
| truera/trulens | 50 | 30 | 20 | ok |
| Agenta-AI/agenta | 42 | 22 | 20 | ok |
| comet-ml/opik | 26 | 26 | 0 | ok |
| confident-ai/deepeval | 50 | 30 | 20 | ok |
| promptfoo/promptfoo | 20 | 20 | 0 | ok |
| Arize-ai/phoenix | 50 | 30 | 20 | ok |
| Helicone/helicone | 39 | 30 | 9 | ok |
| mlflow/mlflow | 50 | 30 | 20 | ok |
| pydantic/logfire | 26 | 26 | 0 | ok |
| lmnr-ai/lmnr | 31 | 27 | 4 | ok |
| pezzolabs/pezzo | 38 | 30 | 8 | ok |
| BerriAI/litellm | 49 | 29 | 20 | ok |
| langchain-ai/langchain | 33 | 27 | 6 | ok |
| langchain-ai/langgraph | 21 | 21 | 0 | ok |
| openlit/openlit | 50 | 30 | 20 | ok |
| vibrantlabsai/ragas | 30 | 30 | 0 | ok |
| Giskard-AI/giskard-oss | 50 | 30 | 20 | ok |
| whylabs/langkit | 23 | 23 | 0 | ok |
| microsoft/prompty | 41 | 29 | 12 | ok |
| microsoft/promptflow | 50 | 30 | 20 | ok |
| NVIDIA-NeMo/Guardrails | 50 | 30 | 20 | ok |
| guardrails-ai/guardrails | 50 | 30 | 20 | ok |
| EleutherAI/lm-evaluation-harness | 30 | 30 | 0 | ok |
| EvolvingLMMs-Lab/lmms-eval | 33 | 30 | 3 | ok |
| raga-ai-hub/RagaAI-Catalyst | 35 | 30 | 5 | ok |
| Kiln-AI/Kiln | 43 | 23 | 20 | ok |
| coze-dev/coze-loop | 50 | 30 | 20 | ok |
| AgentOps-AI/agentops | 24 | 21 | 3 | ok |
| braintrustdata/braintrust-sdk-javascript | 30 | 30 | 0 | ok |
| VoltAgent/voltagent | 44 | 26 | 18 | ok |
| JudgmentLabs/judgeval | 27 | 27 | 0 | ok |
| Marker-Inc-Korea/AutoRAG | 35 | 30 | 5 | ok |
| google/adk-python | 50 | 30 | 20 | ok |
| microsoft/autogen | 50 | 30 | 20 | ok |
| openai/openai-agents-python | 30 | 30 | 0 | ok |
| modelcontextprotocol/modelcontextprotocol | 50 | 30 | 20 | ok |

## Global High-Frequency Failure Types

| Failure Type | Frequency |
|---|---:|
| docs_example_drift | 794 |
| ui_frontend_runtime | 733 |
| dependency_version_conflict | 691 |
| config_env_secret | 525 |
| async_concurrency_state | 501 |
| evaluation_metric_mismatch | 489 |
| install_build_failure | 378 |
| observability_tracing_gap | 377 |
| rag_retrieval_quality | 275 |
| tool_call_or_function_call | 171 |
| network_ssl_proxy | 156 |
| api_breaking_change | 79 |

## Extracted Patterns (See CSV for full table)

Columns: repo, failure_type, trigger_condition, root_cause, fix_method, reproducible, source_url

### langfuse/langfuse
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: yes | source: https://github.com/langfuse/langfuse/issues/11738
- **observability_tracing_gap** | trigger: New runtime/tool path shipped without instrumentation hooks. | root cause: Instrumentation coverage is incomplete across gateway/runtime/tool hops. | fix: Enforce trace_id propagation and add span coverage checks in CI. | reproducible: yes | source: https://github.com/langfuse/langfuse/issues/12401

### openai/evals
- **evaluation_metric_mismatch** | trigger: Benchmark updates or business KPI changes without metric recalibration. | root cause: Metric definition differs from business objective or dataset labeling quality. | fix: Align metric definitions with product KPIs and refresh labeled datasets. | reproducible: partial | source: https://github.com/openai/evals/issues/1629
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/openai/evals/issues/1629

### openai/simple-evals
- **evaluation_metric_mismatch** | trigger: Benchmark updates or business KPI changes without metric recalibration. | root cause: Metric definition differs from business objective or dataset labeling quality. | fix: Align metric definitions with product KPIs and refresh labeled datasets. | reproducible: partial | source: https://github.com/openai/simple-evals/issues/103
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/openai/simple-evals/issues/103

### huggingface/lighteval
- **evaluation_metric_mismatch** | trigger: Benchmark updates or business KPI changes without metric recalibration. | root cause: Metric definition differs from business objective or dataset labeling quality. | fix: Align metric definitions with product KPIs and refresh labeled datasets. | reproducible: yes | source: https://github.com/huggingface/lighteval/issues/1167
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: yes | source: https://github.com/huggingface/lighteval/issues/1167

### truera/trulens
- **evaluation_metric_mismatch** | trigger: Benchmark updates or business KPI changes without metric recalibration. | root cause: Metric definition differs from business objective or dataset labeling quality. | fix: Align metric definitions with product KPIs and refresh labeled datasets. | reproducible: yes | source: https://github.com/truera/trulens/issues/2355
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: yes | source: https://github.com/truera/trulens/issues/2366

### Agenta-AI/agenta
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/Agenta-AI/agenta/issues/3892
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/Agenta-AI/agenta/issues/3169

### comet-ml/opik
- **async_concurrency_state** | trigger: Concurrent agent/tool execution under load. | root cause: Shared state or async scheduling introduces non-deterministic behavior. | fix: Isolate mutable state and add deterministic stress tests for async paths. | reproducible: partial | source: https://github.com/comet-ml/opik/issues/5524
- **observability_tracing_gap** | trigger: New runtime/tool path shipped without instrumentation hooks. | root cause: Instrumentation coverage is incomplete across gateway/runtime/tool hops. | fix: Enforce trace_id propagation and add span coverage checks in CI. | reproducible: partial | source: https://github.com/comet-ml/opik/issues/5524

### confident-ai/deepeval
- **evaluation_metric_mismatch** | trigger: Benchmark updates or business KPI changes without metric recalibration. | root cause: Metric definition differs from business objective or dataset labeling quality. | fix: Align metric definitions with product KPIs and refresh labeled datasets. | reproducible: partial | source: https://github.com/confident-ai/deepeval/issues/2512
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: partial | source: https://github.com/confident-ai/deepeval/issues/2531

### promptfoo/promptfoo
- **config_env_secret** | trigger: Environment promotion with missing keys or inconsistent config. | root cause: Required configuration keys are missing, malformed, or inconsistent by environment. | fix: Provide validated config templates and startup checks for required secrets. | reproducible: yes | source: https://github.com/promptfoo/promptfoo/issues/7322
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: yes | source: https://github.com/promptfoo/promptfoo/issues/7322

### Arize-ai/phoenix
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/Arize-ai/phoenix/issues/11288
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/Arize-ai/phoenix/issues/11953

### Helicone/helicone
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/Helicone/helicone/issues/5629
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/Helicone/helicone/issues/5629

### mlflow/mlflow
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/mlflow/mlflow/issues/21466
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/mlflow/mlflow/issues/19428

### pydantic/logfire
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: partial | source: https://github.com/pydantic/logfire/issues/1726
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/pydantic/logfire/issues/1753

### lmnr-ai/lmnr
- **async_concurrency_state** | trigger: Concurrent agent/tool execution under load. | root cause: Shared state or async scheduling introduces non-deterministic behavior. | fix: Isolate mutable state and add deterministic stress tests for async paths. | reproducible: partial | source: https://github.com/lmnr-ai/lmnr/issues/1182
- **observability_tracing_gap** | trigger: New runtime/tool path shipped without instrumentation hooks. | root cause: Instrumentation coverage is incomplete across gateway/runtime/tool hops. | fix: Enforce trace_id propagation and add span coverage checks in CI. | reproducible: partial | source: https://github.com/lmnr-ai/lmnr/issues/1182

### pezzolabs/pezzo
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: yes | source: https://github.com/pezzolabs/pezzo/issues/337
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: yes | source: https://github.com/pezzolabs/pezzo/issues/337

### BerriAI/litellm
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: partial | source: https://github.com/BerriAI/litellm/issues/23134
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/BerriAI/litellm/issues/23134

### langchain-ai/langchain
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: partial | source: https://github.com/langchain-ai/langchain/issues/35574
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/langchain-ai/langchain/issues/35574

### langchain-ai/langgraph
- **async_concurrency_state** | trigger: Concurrent agent/tool execution under load. | root cause: Shared state or async scheduling introduces non-deterministic behavior. | fix: Isolate mutable state and add deterministic stress tests for async paths. | reproducible: partial | source: https://github.com/langchain-ai/langgraph/issues/6929
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/langchain-ai/langgraph/issues/6929

### openlit/openlit
- **observability_tracing_gap** | trigger: New runtime/tool path shipped without instrumentation hooks. | root cause: Instrumentation coverage is incomplete across gateway/runtime/tool hops. | fix: Enforce trace_id propagation and add span coverage checks in CI. | reproducible: partial | source: https://github.com/openlit/openlit/issues/1042
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/openlit/openlit/issues/1034

### vibrantlabsai/ragas
- **rag_retrieval_quality** | trigger: Noisy corpus, poor chunking, or embedding/model mismatch. | root cause: Retriever/chunking/embedding strategy is misaligned with query and corpus. | fix: Tune chunking and rerankers, add retrieval eval set, and monitor context precision/recall. | reproducible: partial | source: https://github.com/vibrantlabsai/ragas/issues/2629
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/vibrantlabsai/ragas/issues/2627

### Giskard-AI/giskard-oss
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/Giskard-AI/giskard-oss/issues/2290
- **async_concurrency_state** | trigger: Concurrent agent/tool execution under load. | root cause: Shared state or async scheduling introduces non-deterministic behavior. | fix: Isolate mutable state and add deterministic stress tests for async paths. | reproducible: partial | source: https://github.com/Giskard-AI/giskard-oss/issues/2290

### whylabs/langkit
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/whylabs/langkit/issues/320
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: partial | source: https://github.com/whylabs/langkit/issues/323

### microsoft/prompty
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/microsoft/prompty/issues/278
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/microsoft/prompty/issues/278

### microsoft/promptflow
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/microsoft/promptflow/issues/4070
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: yes | source: https://github.com/microsoft/promptflow/issues/4064

### NVIDIA-NeMo/Guardrails
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/NVIDIA-NeMo/Guardrails/issues/1700
- **config_env_secret** | trigger: Environment promotion with missing keys or inconsistent config. | root cause: Required configuration keys are missing, malformed, or inconsistent by environment. | fix: Provide validated config templates and startup checks for required secrets. | reproducible: partial | source: https://github.com/NVIDIA-NeMo/Guardrails/issues/1418

### guardrails-ai/guardrails
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/guardrails-ai/guardrails/issues/1420
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: partial | source: https://github.com/guardrails-ai/guardrails/issues/1385

### EleutherAI/lm-evaluation-harness
- **evaluation_metric_mismatch** | trigger: Benchmark updates or business KPI changes without metric recalibration. | root cause: Metric definition differs from business objective or dataset labeling quality. | fix: Align metric definitions with product KPIs and refresh labeled datasets. | reproducible: partial | source: https://github.com/EleutherAI/lm-evaluation-harness/issues/2847
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/EleutherAI/lm-evaluation-harness/issues/2847

### EvolvingLMMs-Lab/lmms-eval
- **evaluation_metric_mismatch** | trigger: Benchmark updates or business KPI changes without metric recalibration. | root cause: Metric definition differs from business objective or dataset labeling quality. | fix: Align metric definitions with product KPIs and refresh labeled datasets. | reproducible: partial | source: https://github.com/EvolvingLMMs-Lab/lmms-eval/issues/1242
- **async_concurrency_state** | trigger: Concurrent agent/tool execution under load. | root cause: Shared state or async scheduling introduces non-deterministic behavior. | fix: Isolate mutable state and add deterministic stress tests for async paths. | reproducible: yes | source: https://github.com/EvolvingLMMs-Lab/lmms-eval/issues/1242

### raga-ai-hub/RagaAI-Catalyst
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: yes | source: https://github.com/raga-ai-hub/RagaAI-Catalyst/issues/250
- **rag_retrieval_quality** | trigger: Noisy corpus, poor chunking, or embedding/model mismatch. | root cause: Retriever/chunking/embedding strategy is misaligned with query and corpus. | fix: Tune chunking and rerankers, add retrieval eval set, and monitor context precision/recall. | reproducible: yes | source: https://github.com/raga-ai-hub/RagaAI-Catalyst/issues/253

### Kiln-AI/Kiln
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/Kiln-AI/Kiln/issues/1080
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/Kiln-AI/Kiln/issues/1080

### coze-dev/coze-loop
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/coze-dev/coze-loop/issues/444
- **async_concurrency_state** | trigger: Concurrent agent/tool execution under load. | root cause: Shared state or async scheduling introduces non-deterministic behavior. | fix: Isolate mutable state and add deterministic stress tests for async paths. | reproducible: partial | source: https://github.com/coze-dev/coze-loop/issues/444

### AgentOps-AI/agentops
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/AgentOps-AI/agentops/issues/1287
- **observability_tracing_gap** | trigger: New runtime/tool path shipped without instrumentation hooks. | root cause: Instrumentation coverage is incomplete across gateway/runtime/tool hops. | fix: Enforce trace_id propagation and add span coverage checks in CI. | reproducible: partial | source: https://github.com/AgentOps-AI/agentops/issues/1285

### braintrustdata/braintrust-sdk-javascript
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/braintrustdata/braintrust-sdk-javascript/issues/1502
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: partial | source: https://github.com/braintrustdata/braintrust-sdk-javascript/issues/1510

### VoltAgent/voltagent
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/VoltAgent/voltagent/issues/1145
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: yes | source: https://github.com/VoltAgent/voltagent/issues/1145

### JudgmentLabs/judgeval
- **evaluation_metric_mismatch** | trigger: Benchmark updates or business KPI changes without metric recalibration. | root cause: Metric definition differs from business objective or dataset labeling quality. | fix: Align metric definitions with product KPIs and refresh labeled datasets. | reproducible: partial | source: https://github.com/JudgmentLabs/judgeval/issues/383
- **async_concurrency_state** | trigger: Concurrent agent/tool execution under load. | root cause: Shared state or async scheduling introduces non-deterministic behavior. | fix: Isolate mutable state and add deterministic stress tests for async paths. | reproducible: partial | source: https://github.com/JudgmentLabs/judgeval/issues/383

### Marker-Inc-Korea/AutoRAG
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/Marker-Inc-Korea/AutoRAG/issues/771
- **rag_retrieval_quality** | trigger: Noisy corpus, poor chunking, or embedding/model mismatch. | root cause: Retriever/chunking/embedding strategy is misaligned with query and corpus. | fix: Tune chunking and rerankers, add retrieval eval set, and monitor context precision/recall. | reproducible: partial | source: https://github.com/Marker-Inc-Korea/AutoRAG/issues/771

### google/adk-python
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/google/adk-python/issues/4768
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: yes | source: https://github.com/google/adk-python/issues/4770

### microsoft/autogen
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/microsoft/autogen/issues/7337
- **dependency_version_conflict** | trigger: Upgrade/downgrade of SDK/framework dependencies during setup or deploy. | root cause: Transitive or pinned dependency versions diverge from supported matrix. | fix: Lock compatible versions, publish support matrix, and add CI matrix tests. | reproducible: yes | source: https://github.com/microsoft/autogen/issues/7337

### openai/openai-agents-python
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/openai/openai-agents-python/issues/2630
- **async_concurrency_state** | trigger: Concurrent agent/tool execution under load. | root cause: Shared state or async scheduling introduces non-deterministic behavior. | fix: Isolate mutable state and add deterministic stress tests for async paths. | reproducible: partial | source: https://github.com/openai/openai-agents-python/issues/2258

### modelcontextprotocol/modelcontextprotocol
- **docs_example_drift** | trigger: Users follow outdated README/tutorial steps. | root cause: Documentation examples lag behind current code paths and defaults. | fix: Run docs examples in CI and version docs with releases. | reproducible: partial | source: https://github.com/modelcontextprotocol/modelcontextprotocol/issues/229
- **ui_frontend_runtime** | trigger: Frontend dependency updates or browser/runtime version change. | root cause: Frontend dependency/runtime mismatch causes client-side execution failures. | fix: Pin frontend toolchain versions and add browser/runtime compatibility checks. | reproducible: partial | source: https://github.com/modelcontextprotocol/modelcontextprotocol/issues/611
## Governance Priority Layer (De-noised)

Generated file: `failure-patterns-priority.csv`

| Rank | Failure Type | Priority Score | Why First |
|---:|---|---:|---|
| 1 | async_concurrency_state | 576 | Idempotent tool calls |
| 2 | config_env_secret | 568 | Startup config validation |
| 3 | dependency_version_conflict | 532 | Lockfiles |
| 4 | network_ssl_proxy | 504 | Regional retry policy |
| 5 | install_build_failure | 428 | Reproducible devcontainer |
| 6 | observability_tracing_gap | 424 | Trace propagation policy |
| 7 | rag_retrieval_quality | 416 | Retrieval eval gate |
| 8 | evaluation_metric_mismatch | 356 | Metric governance board |
| 9 | ui_frontend_runtime | 324 | Frontend version pin |
| 10 | docs_example_drift | 212 | Docs-in-CI execution |
