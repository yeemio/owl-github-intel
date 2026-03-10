# Weekly Digest - 2026-03-09 - C1

## Cycle Status

- Window: C (Decision Desk)
- Theme: MCP + Gateway reliability
- Input quality:
  - A evidence package: available
  - B challenge package: available
- Decision confidence: final (challenge-informed)

## A/B/C Outcome Snapshot

- A metrics: sources=60, hard_evidence=50, new_claims=12
- B metrics: challenged=18, fails=2
- C adjudication rule applied:
  - survives -> candidate conclusion
  - partial -> conditional conclusion with boundary
  - fails -> reject or downgrade

## Promoted (P0 Final)

1. `modelcontextprotocol/servers`
2. `modelcontextprotocol/typescript-sdk`
3. `BerriAI/litellm`
4. `langfuse/langfuse`
5. `langchain-ai/langgraph`
6. `qdrant/qdrant`

Why final:
- each P0 has >=2 independent sources in `data/master/repo_master.csv`
- each P0 contains explicit risk + rollback signal
- B-window counterexamples were resolved into boundary conditions

## Downgraded or Reframed by B Challenges

- `C-A04` (release frequency -> regression risk) downgraded to conditional claim:
  - only holds when regression gate and canary discipline are weak
- `C-A12` (closed-loop necessity) reframed as stage-dependent:
  - early low-complexity systems may operate without full loop, but scale stage requires closed loop

## Rejected / Watch-only

- `huggingface/text-generation-inference`
- `protectai/rebuff`

## Risk + Rollback Signals (C1)

- MCP compatibility risk:
  - rollback sdk-server pair together
- Gateway auth/proxy risk:
  - rollback gateway image + routing bundle
- Agent handoff state risk:
  - rollback SDK minor + disable nested path

## Files Updated in C1

- `data/master/repo_master.csv`
- `insights/adoption_backlog.md`
- `data/risks/upgrade-risk-matrix.csv`
- `publish/digests/weekly_digest_2026-03-09_C1.md`
- `index/CHANGELOG.md`
