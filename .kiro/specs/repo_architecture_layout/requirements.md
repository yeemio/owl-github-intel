# Requirements: Repository Architecture + Directory Layout

> **Goal**: Define and lock the repository architecture and top-level directory layout so the project can evolve from “intel assets” into a runnable product system without drifting into chaos.
> **Priority**: P0 (foundation)
> **Estimated effort**: 0.5-1 day (docs + structure + gates)

---

## 1. Background and Motivation

This repo currently serves two purposes:

1. Maintain **Intel Assets** (datasets, evidence snapshots, analyses, decisions, publish deliverables).
2. Host a **Product System** that turns user intent or a public GitHub URL into an evidence-backed decision report.

Without an explicit directory contract and boundary rules, it is easy to:
- mix runtime code with intel assets
- drift names and entrypoints
- break GitHub Pages URLs
- lose “source of truth” for architecture decisions

---

## 2. User Stories

### Story 1: New contributor orientation

As a new contributor,
I want to understand where to put new code vs new intel assets,
so I can add value without breaking structure or conventions.

Acceptance criteria:
- [ ] The repo has an architecture “source of truth” document.
- [ ] Each top-level product directory has a short responsibility README.

### Story 2: Stable publish entrypoints

As a user,
I want stable public entrypoints (portal and publish deliverables),
so links do not break over time.

Acceptance criteria:
- [ ] GitHub Pages path remains stable at `/50-publish/site/`.
- [ ] Core deliverables exist and are CI-gated.

### Story 3: Enforced boundaries

As a maintainer,
I want clear boundaries between intel assets and product runtime,
so changes remain auditable and maintainable.

Acceptance criteria:
- [ ] “Intel Assets” directories are treated as versioned outputs.
- [ ] “Product System” directories are treated as runnable code.
- [ ] Evidence-gate policy is centralized and reused across codepaths.

---

## 3. Functional Requirements (FR)

### FR-1: Directory layout contract

Requirement:
- The top-level directory layout must be explicitly documented and followed.

Acceptance criteria:
- [ ] The following product-system directories exist:
  - `apps/`, `services/`, `packages/`, `infra/`
- [ ] The following intel-asset directories remain canonical:
  - `data/`, `sources/`, `analysis/`, `insights/`, `publish/`

### FR-2: Architecture source of truth

Requirement:
- Maintain `docs/ARCHITECTURE.md` as the source of truth for architecture and boundaries.

Acceptance criteria:
- [ ] Specs refer to `docs/ARCHITECTURE.md` instead of duplicating architecture content.

### FR-3: Portal and docs navigation alignment

Requirement:
- Public portal “Docs” must link to architecture and key onboarding docs.

Acceptance criteria:
- [ ] Portal docs group includes `docs/ARCHITECTURE.md`.
- [ ] Link checks cover these docs.

---

## 4. Non-Functional Requirements (NFR)

### NFR-1: Stability

Acceptance criteria:
- [ ] Existing public URLs remain valid (GitHub Pages path stability).

### NFR-2: Maintainability

Acceptance criteria:
- [ ] Every top-level product directory contains a README with responsibilities and non-goals.

---

## 5. Definition of Done

- [ ] `docs/ARCHITECTURE.md` exists and is referenced by specs.
- [ ] Directory skeleton exists with responsibility READMEs.
- [ ] CI gates required deliverables (including architecture doc).

