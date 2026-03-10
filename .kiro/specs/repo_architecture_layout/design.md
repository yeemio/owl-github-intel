# Design: Repository Architecture + Directory Layout

---

## 1. Source of Truth

- Architecture and boundaries: `docs/ARCHITECTURE.md`
- Search engine product spec: `.kiro/specs/intel_search_engine/`

---

## 2. Directory Contract

### 2.1 Intel Assets (versioned, citable)

- `data/`: curated datasets (CSV/MD), treated as facts/fields
- `sources/`: raw scans and public evidence snapshots
- `analysis/`: track and cross-track analyses
- `insights/`: decisions (P0/P1/P2) and boundaries
- `publish/`: external deliverables and reports

### 2.2 Product System (runnable)

- `apps/portal/`: UI (search-like UX, report rendering)
- `services/intel_api/`: backend API (recommend/analyze/submit)
- `services/ingest_worker/`: ingestion worker (public-only)
- `packages/intel_core/`: shared core (schemas, evidence gate, ranking, renderers)
- `packages/connectors/`: GitHub public connector + repo signal extraction
- `infra/index/`: indexing pipeline configs/scripts (keyword -> embeddings)
- `infra/deploy/`: deploy contracts/manifests (minimal for MVP)

### 2.3 GitHub Pages path stability

- Keep `50-publish/site/` as the stable public portal path.
- Do not move this path without an explicit migration plan.

---

## 3. Boundary Rules (enforced by code reuse)

- Evidence gate must live in shared core (`packages/intel_core/`) and be reused by API/worker/portal.
- “Intel Assets” directories are outputs, not runtime code.
- “Product System” code must not invent intel; it may only read and render it, or create new evidence snapshots via ingestion.

---

## 4. Navigation + Visibility

- Portal docs list must include `docs/ARCHITECTURE.md`.
- `docs/OVERVIEW.md` must link to `docs/ARCHITECTURE.md`.

---

## 5. CI Gates

- `scripts/validate_data.py` must require `docs/ARCHITECTURE.md`.
- Portal link check must verify architecture doc link resolves.

