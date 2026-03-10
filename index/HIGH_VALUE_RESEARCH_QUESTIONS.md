# High-Value Research Questions

Use these questions to push analysis deeper than repository popularity.

## Agent and Workflow

1. Which orchestration model handles long-running tasks with the lowest operational overhead?
2. What are the most common state corruption or replay issues in graph/workflow agents?
3. Where do multi-agent coordination patterns fail under partial tool outages?

## MCP and Tool Contracts

4. What percentage of MCP servers publish enough metadata for safe production use?
5. Which contract fields are most often missing when integrations fail?
6. How often do version upgrades break tool schema compatibility?

## RAG and Data Stack

7. In real incidents, what fails first: ingestion, retrieval quality, reranking, or eval design?
8. Which vector database choices correlate with lower migration pain at growth stages?
9. How much quality gain comes from better retrieval versus better evaluation loops?

## Gateway and Inference

10. Which routing strategies actually reduce cost without hurting reliability?
11. What are the dominant failure signatures in fallback chains?
12. At what traffic profile does a gateway become the main bottleneck?

## Evaluation and Observability

13. Which eval metrics predict user-facing regressions most reliably?
14. Where do teams overfit evals and miss production failure modes?
15. What minimum observability set is required before scaling agent workloads?

## Security and Governance

16. Which prompt injection defenses are effective in tool-enabled agents, not just chatbots?
17. What governance controls prevent unsafe tool invocation with least developer friction?
18. Which security mechanisms create false confidence and should be avoided?

## Decision Quality

19. For each adoption candidate, what evidence would falsify the current recommendation?
20. What is the rollback plan if top P0 choices underperform within 30 days?
