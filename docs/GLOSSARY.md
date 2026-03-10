# Glossary

- **Evidence**: a public, linkable source that supports a statement (issue/PR/release/doc/benchmark).
- **Decision asset**: a file that represents the current “official” posture, not a draft.
- **P0 / P1 / P2**:
  - P0: adopt for scale (requires stricter guardrails)
  - P1: adopt for minimal/standard use
  - P2: watch/conditional; do not default-adopt
- **Risk signal**: what could go wrong and what to watch.
- **Rollback signal**: how to revert safely if adoption fails.
- **Trigger threshold**: explicit conditions to promote from P2->P1->P0.
- **Adoption profile**:
  - minimal: small usage, low blast radius
  - scale: multi-provider, high QPS, high operational surface

