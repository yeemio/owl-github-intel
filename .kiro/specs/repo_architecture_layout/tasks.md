# Tasks: Repository Architecture + Directory Layout

> Foundation spec. No runtime features here; only structure, docs, and gates.

---

## 1. Architecture Source of Truth

- [x] Add `docs/ARCHITECTURE.md` and define dual-domain monorepo structure.
- [x] Ensure `docs/OVERVIEW.md` links to `docs/ARCHITECTURE.md`.
- [x] Ensure related specs reference `docs/ARCHITECTURE.md` instead of duplicating.

Verify:
- `python scripts/validate_data.py`

---

## 2. Directory Skeleton

- [x] Create product directories: `apps/`, `services/`, `packages/`, `infra/`.
- [x] Add responsibility READMEs:
  - `apps/portal/README.md`
  - `services/intel_api/README.md`
  - `services/ingest_worker/README.md`
  - `packages/intel_core/README.md`
  - `packages/connectors/README.md`
  - `infra/index/README.md`
  - `infra/deploy/README.md`

Verify:
- `python scripts/validate_data.py`

---

## 3. Portal and Link Checks

- [x] Add `docs/ARCHITECTURE.md` to portal docs group (`50-publish/site/portal.config.json`).
- [x] Add `docs/ARCHITECTURE.md` to portal link checks (`50-publish/site/check-portal-links.js`).

Verify:
- `node 50-publish/site/check-portal-links.js` (served from repo root)

---

## 4. CI Gates

- [x] Extend `scripts/validate_data.py` to require `docs/ARCHITECTURE.md`.

Verify:
- GitHub Actions `ci` job passes.

