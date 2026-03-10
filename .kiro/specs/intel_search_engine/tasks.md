# Tasks: Intel Search Engine Portal (Public-only MVP)

> Principle: tasks are delivery commitments. Each task must end with runnable verification.

---

## 0. Spec Setup

- [ ] Create canonical entrypoint: add `index/PRODUCT_ROADMAP.md` linking to this spec and publish deliverables.
  - Verify: `python scripts/validate_data.py`

---

## 1. Data Layer (Catalog + Evidence + Submission)

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

- [ ] Implement a simple API service (Python) with endpoints:
  - `POST /recommend`
  - `POST /analyze/repo`
  - `POST /analyze/inventory`
  - `POST /submit`
  - Verify: `pytest` (or a runnable smoke script) hitting endpoints locally.

Notes:
- The API must enforce the “evidence-required” gate in code.

---

## 3. Ingestion Worker (Public-only)

- [ ] Implement ingestion job:
  - fetch GitHub metadata for public repos
  - snapshot releases/issues URLs
  - create evidence placeholders
  - mark status `partial` until verified
  - Verify: run against 3 public repos in a test mode.

---

## 4. Retrieval + Recommendation Engine (Deterministic first)

- [ ] Implement retrieval:
  - structured filters + keyword match
  - Verify: deterministic ranking tests for a fixed dataset snapshot.

- [ ] Implement report schema and renderer:
  - outputs Markdown (for download) and JSON (for UI)
  - Verify: schema validation + snapshot tests.

---

## 5. Frontend Portal (Search-engine UX)

- [ ] Replace navigation-only portal with:
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

