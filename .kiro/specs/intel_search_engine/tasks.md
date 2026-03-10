# Tasks: Intel Search Engine Portal (Public-only MVP)

> Principle: tasks are delivery commitments. Each task must end with runnable verification.

---

## 0. Spec Setup

- [x] Create canonical entrypoint: `index/PRODUCT_ROADMAP.md` linking to this spec and publish deliverables.
  - Verify: `python scripts/validate_data.py`

---

## 1. Data Layer (Catalog + Evidence + Submission)

- [x] Ship user-facing entry deliverables (customer value layer):
  - `publish/LATEST.md` (one-page brief)
  - `publish/starter_pack.md` (10-minute decision kit)
  - `docs/BRING_YOUR_STACK.md` + `templates/user_inventory.csv` + `scripts/analyze_user_stack.py` (BYO closed loop)
  - Verify: `python scripts/validate_data.py`

- [ ] Introduce a dedicated **catalog+evidence store** for the product system (separate from prose docs):
  - Location: `data/db/` (CSV/JSON) OR `data/db.sqlite` (SQLite) for query semantics.
  - Must include: repos, evidence, submissions, verification status.
  - Verify: add `scripts/validate_catalog_db.py` (no external deps).

- [ ] Define a minimal storage format for:
  - catalog (repos)
  - evidence
  - submissions
  - verification status
  - Proposed: `data/db/` as CSV/JSON for MVP, or SQLite if we need query semantics.
  - Verify: add a validator script `scripts/validate_catalog_db.py` (no external deps).

- [ ] Add evidence rows for all P0/P1 items currently in `repo_master.csv`.
  - Verify: validator ensures each `P0/P1` has >= 1 evidence link.

---

## 2. Backend API (MVP)

- [ ] Implement the API service under `services/intel_api/` with endpoints:
  - `POST /recommend`
  - `POST /analyze/repo`
  - `POST /analyze/inventory`
  - `POST /submit`
  - Verify: `pytest` (or a runnable smoke script) hitting endpoints locally.

Notes:
- The API must enforce the “evidence-required” gate in code.

---

## 3. Ingestion Worker (Public-only)

- [ ] Implement ingestion worker under `services/ingest_worker/`:
  - fetch GitHub metadata for public repos
  - snapshot releases/issues URLs
  - create evidence placeholders
  - mark status `partial` until verified
  - Verify: run against 3 public repos in a test mode.

---

## 4. Retrieval + Recommendation Engine (Deterministic first)

- [ ] Implement shared core under `packages/intel_core/`:
  - report schema (JSON) + validation
  - evidence gate (hard rule)
  - deterministic ranker (posture/verdict/risk filters)
  - Verify: unit tests for gate + ranking + schema validation.

- [ ] Implement retrieval in core:
  - structured filters + keyword match
  - Verify: deterministic ranking tests for a fixed dataset snapshot.

- [ ] Implement report schema and renderer:
  - outputs Markdown (for download) and JSON (for UI)
  - Verify: schema validation + snapshot tests.

---

## 5. Frontend Portal (Search-engine UX)

- [ ] Evolve `apps/portal/` into a search-engine UX (without breaking Pages URL):
  - intent input + constraints panel
  - repo URL input
  - inventory upload
  - results view (report)
  - Verify: Playwright smoke (optional) or minimal DOM tests + link check.

Constraint:
- Keep GitHub Pages path stable (`/50-publish/site/`) until we have a new deployment.

---

## 6. Publish Deliverables

- [ ] Add a public “how it works” page: `publish/HOW_IT_WORKS.md`
  - Explain evidence gate, verification status, and limitations.
  - Verify: link check.

- [ ] Add sample outputs:
  - `publish/reports/sample_intent_report.md`
  - `publish/reports/sample_repo_report.md`
  - Verify: ensure samples do not require secrets.

---

## 7. CI and Quality Gates

- [ ] Extend CI to:
  - run `python scripts/build_latest.py` and check it is up-to-date (no diff)
  - run `python scripts/validate_data.py`
  - run portal link check

---

## 8. Definition of Done (MVP Close)

- [ ] User can:
  - paste intent -> get report with evidence citations
  - paste public repo URL -> get audit report + complements
  - upload inventory -> get report
  - submit a public repo -> see queued record
- [ ] Evidence gate is enforced (no evidence, no recommend list)
- [ ] CI passes.
