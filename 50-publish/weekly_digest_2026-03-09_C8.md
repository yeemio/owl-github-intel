# Weekly Digest — 2026-03-09 (C8)

## Cycle status

- **Window**: C (Decision Desk)
- **Theme**: Crawl/Search 栈采纳信号（Crawl4AI, Firecrawl, Jina Reader, Perplexica, Farfalle, Turboseek）
- **Inputs consumed**:
  - A: `10-raw/scans/scan_2026-03-09_A_C8.md`, `evidence_2026-03-09_A_C8.csv`, `handoff_A_to_B_2026-03-09_C8.md`
  - B: `30-analysis/cross/challenge_log_2026-03-09_C8.md`, `challenge_matrix_2026-03-09_C8.csv`, `20-normalized/handoff_B_to_C_2026-03-09_C8.md`

## Input note (B theme mismatch)

- B’s challenge content referred to **upgrade risk + cross-track** (exception policy, upgrade matrix, rollout waves, Recommendation A, etc.), not to A’s crawl/search claims. Verdicts by claim_id (C8-A01…A12) therefore do not map to A’s claim text. C resolved from **A’s evidence** using survives/partial/fails rules and C’s own risk/rollback criteria.

## A metrics (C8)

- source_count: 44 evidence rows (≥30 required)
- hard_evidence (issue/PR/release): 41
- new_claims: 14 (C8-A01…C8-A14)

## What changed

- **adoption_backlog_latest.md**: C8 decision principle; new section **C8 Crawl/Search (P2 conditional)** with six repos (Crawl4AI, Firecrawl, Jina Reader, Perplexica, Farfalle, Turboseek), each with risk and rollback conditions. No new P0.
- **40-insights/risks/upgrade-risk-matrix.csv**: Two new rows for Crawl4AI 0.8.x / Docker/security and Firecrawl v2 parsers/MCP.
- **20-normalized/repo_master_latest.csv**: Six Crawl/Search repos added as P2 with risk_signal and rollback_signal.

## Key decisions

1. **No P0 promotions** — No claim had ≥2 independent sources and explicit risk + rollback sufficient for P0; all crawl stack entries remain P2 conditional.
2. **Crawl4AI** — Docker/schema 0.8.x, MCP bridge timeout, Redis/security; adopt only after schema migration and security hardening; rollback to v0.7.x.
3. **Firecrawl** — v2 parsers.mode and MCP/Google model compatibility; self-host hostname/proxy; adopt with parser validation and self-host checklist.
4. **Jina Reader** — Site variance and MCP Unauthorized; use with fallback and verify API key path before P1.
5. **Perplexica / Farfalle / Turboseek** — Token/context/Docker/model and feature gaps; P2 with sandbox and feature-parity watch.
6. **B’s governance actions** — Exception-policy automated expiry (C8-A07 fails in B) and upgrade-matrix changelog-quality requirements remain in risk register; not applied to crawl stack claims.

## Rejected / not promoted (from A’s crawl theme)

- None. B’s only “fails” referred to exception-policy automation (cross-track), not a crawl stack claim.

## Files updated in C8

- `40-insights/adoption_backlog_latest.md`
- `40-insights/risks/upgrade-risk-matrix.csv`
- `20-normalized/repo_master_latest.csv`
- `50-publish/weekly_digest_2026-03-09_C8.md`
- `00-index/CHANGELOG.md`
- `00-index/CYCLE_SCOREBOARD.csv`

## Next 5 unknowns

1. **Crawl/Search P0 bar** — What “≥2 independent sources” means for crawl stack (multi-repo evidence vs multi-URL per repo) and when to promote from P2 to P1.
2. **Jina vs Firecrawl parity** — Same-URL/same-time comparison for site pass/fail (Thales, Reddit) to define fair benchmark and fallback policy.
3. **Perplexica token/context baseline** — Reproducible token and context-size benchmarks vs Farfalle/Turboseek for adoption criteria.
4. **Firecrawl adoption signal** — Distinguish “feature exists” from “adoption evidence” (stars, integration docs, third-party references) for backlog priority.
5. **30-analysis/crawl coverage** — Whether to include ForgeCrawl, RagRabbit, Crawl2RAG in next evidence cycle and how they map to P2 triggers.
