# Failure Patterns Priority (De-noised)

Date: 2026-03-09

Method: Incident-oriented reweighting over `failure-patterns.csv` to reduce documentation/UI noise and prioritize operationally expensive failures.

## Top Priority Failure Types

| Rank | Failure Type | Severity | Signals | Repo Coverage | Priority Score | Reproducible |
|---:|---|---:|---:|---:|---:|---|
| 1 | async_concurrency_state | 5 | 19 | 19 | 576 | partial |
| 2 | config_env_secret | 5 | 17 | 17 | 568 | partial |
| 3 | dependency_version_conflict | 4 | 33 | 33 | 532 | partial |
| 4 | network_ssl_proxy | 5 | 1 | 1 | 504 | partial |
| 5 | install_build_failure | 4 | 7 | 7 | 428 | partial |
| 6 | observability_tracing_gap | 4 | 6 | 6 | 424 | partial |
| 7 | rag_retrieval_quality | 4 | 4 | 4 | 416 | partial |
| 8 | evaluation_metric_mismatch | 3 | 14 | 14 | 356 | partial |
| 9 | ui_frontend_runtime | 2 | 31 | 31 | 324 | partial |
| 10 | docs_example_drift | 1 | 28 | 28 | 212 | partial |

## Control Recommendations (Top 10)

1. **async_concurrency_state** -> Idempotent tool calls + state isolation + load stress tests | source: https://github.com/langfuse/langfuse/issues/12401
2. **config_env_secret** -> Startup config validation + secret rotation checks + env parity tests | source: https://github.com/huggingface/lighteval/issues/1170
3. **dependency_version_conflict** -> Lockfiles + dependency matrix CI + periodic upgrade windows | source: https://github.com/langfuse/langfuse/issues/11738
4. **network_ssl_proxy** -> Regional retry policy + CA/proxy baseline + timeout budget | source: https://github.com/BerriAI/litellm/issues/21314
5. **install_build_failure** -> Reproducible devcontainer + prebuilt wheels/images + setup smoke test | source: https://github.com/Agenta-AI/agenta/issues/3169
6. **observability_tracing_gap** -> Trace propagation policy + span coverage CI + drop-rate alerts | source: https://github.com/langfuse/langfuse/issues/12401
7. **rag_retrieval_quality** -> Retrieval eval gate + chunk/reranker tuning + drift monitors | source: https://github.com/vibrantlabsai/ragas/issues/2629
8. **evaluation_metric_mismatch** -> Metric governance board + KPI-aligned eval definitions | source: https://github.com/openai/evals/issues/1629
9. **ui_frontend_runtime** -> Frontend version pin + browser/runtime compatibility checks | source: https://github.com/langfuse/langfuse/issues/11738
10. **docs_example_drift** -> Docs-in-CI execution + versioned examples | source: https://github.com/openai/evals/issues/1629