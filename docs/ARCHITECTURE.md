# Architecture (Source of Truth)

This repository is a dual-domain monorepo:

1. **Intel Assets**: curated datasets, evidence snapshots, analyses, and publish-ready deliverables.
2. **Product System**: a public-only “intel search engine” that turns user intent or a public GitHub URL into an evidence-backed decision report.

The portal is not a directory. The portal is a **report generator** backed by an evolving intel database.

---

## 1. Top-Level Layout (contract)

### Intel Assets (versioned, citable)

- `data/`:
  - curated datasets and risk intelligence (CSV/MD)
  - treated as “facts + fields”, not prose
- `sources/`:
  - raw scans, snapshots, and source artifacts (public-only)
- `analysis/`:
  - track reports and cross-track synthesis (human-readable, evidence-backed)
- `insights/`:
  - decision outputs (P0/P1/P2 posture, boundaries, rollback)
- `publish/`:
  - external-facing deliverables (LATEST, starter kits, digests, reports)

### Product System (runnable)

- `apps/portal/`:
  - web UI (search engine UX): intent input, constraints, repo URL, inventory upload, results page
- `services/intel_api/`:
  - backend API: recommend + analyze + submit
- `services/ingest_worker/`:
  - ingestion worker: fetch public metadata, capture evidence, update catalog, manage submission states
- `packages/intel_core/`:
  - shared core: schemas, evidence gate, ranking, report generation, renderers
- `packages/connectors/`:
  - GitHub public connector and repo signal extractors (pyproject/package.json/go.mod etc.)
- `infra/index/`:
  - indexing pipeline configs (keyword first, embeddings later)
- `infra/deploy/`:
  - deployment manifests and environment contracts (kept minimal for MVP)

### Publishing portal path stability

- `50-publish/site/` remains stable for GitHub Pages URL compatibility.

---

## 2. Product Architecture (MVP data flow)

Inputs:
- Intent query (text + constraints)
- Public GitHub repo URL
- BYO inventory (CSV/JSON)
- Public submissions (repo URL + optional evidence URLs)

Pipeline:

1. **Retrieve** candidates from catalog + evidence using:
   - structured filters (lane/license/self-host/etc.)
   - keyword match (deterministic baseline)
   - embeddings (phase 1)
2. **Gate** with evidence rules:
   - no evidence -> `unverified` -> cannot appear in “recommended list”
3. **Rank** by posture/verdict/risk strategy.
4. **Render** a report:
   - JSON for UI
   - Markdown for download and sharing

Outputs:
- Decision-grade report with:
  - posture (`P0/P1/P2`), verdict (`survives/partial/fails/unverified`)
  - boundaries, risk signals, rollback signals
  - evidence links
  - next actions (30/60/90 day)

---

## 3. Evidence Gate (hard rule)

No recommendation without evidence.

Implementation posture:
- Evidence must be stored as rows/records and referenced by ID/link.
- LLM can generate narrative, but may not invent facts.
- If evidence is missing, the UI must display the item as “unverified” and keep it out of ranked recommendations.

---

## 4. Evolution Strategy (how this scales)

Phase 0 (closed loop, public-only):
- Deterministic retrieval + evidence gate + report generation.
- Public repo analysis extracts stack signals and maps to known catalog items.

Phase 1:
- Index improvements (embeddings, better mapping).
- Ingestion queue + verification workflow for community submissions.

Phase 2:
- Optional private-repo support (separate product decision; requires auth + isolation).

---

## 5. Where specs live

Specs follow a three-layer structure:

- `.kiro/specs/<feature>/requirements.md`
- `.kiro/specs/<feature>/design.md`
- `.kiro/specs/<feature>/tasks.md`

For the search engine MVP:
- `.kiro/specs/intel_search_engine/`

