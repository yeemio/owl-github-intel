# Requirements: Intel Search Engine Portal

> **Goal**: Build a search-engine-like portal that turns user intent or a public GitHub repo URL into an evidence-backed, decision-grade stack recommendation (with risks + rollback + next actions).
> **Priority**: P0 (MVP closed loop)
> **Estimated effort**: 3-6 weeks (public-only)

---

## 0. Scope and Architecture Source of Truth

- Architecture and directory contract: `docs/ARCHITECTURE.md` (source of truth)
- Product roadmap entrypoint: `index/PRODUCT_ROADMAP.md`

MVP scope decision:
- Public-only closed loop first (no private repos).
- Portal UX can be hosted as static frontend (GitHub Pages) while backend runs elsewhere; URLs must remain stable.

## 1. Background and Motivation

### 1.1 Current problem

People (individual devs, platform teams, architects) all share the same core problem: **information acquisition and decision-making under uncertainty**.
Today, “stack selection” usually happens via link chasing, trend-following, or partial anecdotes. Outcomes:

- No clear boundaries (where the tool is allowed / not allowed).
- No rollback plan (what signal triggers rollback).
- No evidence trail (why we adopted it).
- High probability of shipping into known failure patterns or breaking upgrades.

### 1.2 Product intent

This product is not “a static directory”. It is a **decision engine** backed by a growing intel database:

- A curated catalog of repos/components.
- Evidence references (issues/releases/docs).
- Intelligence outputs (verdict, posture, risk, rollback).
- A retrieval + reasoning layer that produces a report.

---

## 2. User Stories

### Story 1: Intent to recommendation (search mode)

As a builder (any role),
I want to describe my goal and constraints in natural language,
so I can receive a recommended stack with evidence, risks, rollback signals, and next actions.

Acceptance criteria:
- [ ] The user can enter a free-text requirement and constraints (language, self-host, license, compliance keywords).
- [ ] The system outputs a recommendation grouped by lanes: `agent/mcp/rag/gateway/eval/security`.
- [ ] Every recommended component includes: `why`, `boundaries`, `risk_signal`, `rollback_signal`, and evidence links.

### Story 2: Public Git repo to audit + complements (repo mode)

As a builder,
I want to paste a public GitHub repository URL,
so I can get a report showing my current stack signals, gaps, risks, and recommended complements.

Acceptance criteria:
- [ ] The system extracts stack signals (dependencies and keywords) from the public repo.
- [ ] The report classifies current components into lanes and maps them to known catalog items if possible.
- [ ] Unknown items are listed as “scan next”.

### Story 3: Bring-your-own inventory (BYO mode)

As a builder,
I want to upload an inventory list (CSV/JSON) of repos/tools I use,
so I can get the same audit + gap + recommendation report without giving repository access.

Acceptance criteria:
- [ ] The system accepts an inventory file and generates a report.
- [ ] Matched items show posture/verdict and risk/rollback signals.
- [ ] Unknown items are clearly flagged and suggested for ingestion.

### Story 4: User submissions (public-only ingestion)

As a user,
I want to submit public repos (or evidence links) to be included,
so the intel database improves over time.

Acceptance criteria:
- [ ] Users can submit public repo URLs and optionally evidence URLs.
- [ ] Submissions are tracked with status: `queued/running/partial/verified/rejected`.
- [ ] No submission becomes “recommended” without evidence references.

---

## 3. Functional Requirements (FR)

### FR-1: Search portal (intent)

Requirement:
- Provide an API to accept intent + constraints and return a structured recommendation report.

Acceptance criteria:
- [ ] Supports constraints: `language`, `deployment`, `license_allow/deny`, `self_hosted`, `risk_tolerance`.
- [ ] Supports lanes output: `agent/mcp/rag/gateway/eval/security`.
- [ ] Includes evidence citations for each recommendation.

### FR-2: Repo analysis (public GitHub URL)

Requirement:
- Fetch and analyze a public GitHub repo, extract stack signals, and produce an audit report.

Acceptance criteria:
- [ ] Handles common ecosystems at minimum: Python (`pyproject.toml`, `requirements.txt`), Node (`package.json`), Go (`go.mod`).
- [ ] Does not require cloning full history; shallow fetch is allowed.
- [ ] Fails safe: returns partial report if some files are missing.

### FR-3: Inventory analysis (CSV/JSON)

Requirement:
- Accept a user inventory list and map it against catalog + risks + intelligence.

Acceptance criteria:
- [ ] Accepts repo slug or GitHub URL per row.
- [ ] Outputs: matched posture/verdict + risks + complements + unknown list.

### FR-4: Evidence-backed intelligence output

Requirement:
- Recommendations must be grounded in stored evidence references.

Acceptance criteria:
- [ ] Every recommendation has >= 1 evidence link (issue/release/doc).
- [ ] If evidence is missing, the system must label it as “unverified / not eligible for recommend list”.

### FR-5: Submission + ingestion queue (public)

Requirement:
- Allow public submissions and run ingestion jobs to enrich catalog and evidence.

Acceptance criteria:
- [ ] Submissions are stored and visible (at least admin view).
- [ ] Ingestion produces a catalog record and evidence snapshot.
- [ ] Items remain “unverified” until a verification step confirms evidence quality.

---

## 4. Non-Functional Requirements (NFR)

### NFR-1: Safety and privacy (public-only MVP)

- The MVP must not require private repo access.
- The system must not store secrets from users.

Acceptance criteria:
- [ ] No private repo token is needed for MVP workflows.
- [ ] BYO inventory can be processed locally (CLI) without uploading.

### NFR-2: Reliability and determinism

Acceptance criteria:
- [ ] Report generation must be reproducible given the same database snapshot and the same input.
- [ ] LLM output must not invent facts; every claim must map to evidence IDs/links.

### NFR-3: Performance (MVP targets)

Acceptance criteria:
- [ ] Search-mode report: p95 < 5s for cached intel.
- [ ] Repo-mode analysis: p95 < 60s for small-to-medium repos (public API limits permitting).

---

## 5. Acceptance Overview (Definition of Done)

### 5.1 MVP closed loop (P0)

- [ ] A single portal supports: intent search, public repo URL analysis, and BYO inventory upload.
- [ ] Output is a “decision report” with: posture, verdict, boundaries, risk_signal, rollback_signal, evidence links, and next actions.
- [ ] Unknown items flow into “scan next” and can be submitted for ingestion.

### 5.2 Quality gates

- [ ] No recommendation is output without evidence links.
- [ ] CI validates that required published deliverables exist (LATEST, starter pack, BYO docs).

---

## 6. Constraints and Assumptions

Constraints:
- Public-only for the first closed loop.
- Evidence-first: correctness > breadth.

Assumptions:
- We can start with a small curated dataset and expand iteratively.

---

## 7. Risks

- Risk: Hallucinated recommendations without evidence.
  - Mitigation: evidence-required output contract; hard gate in code.
- Risk: Ingestion quality degrades if submissions are unmoderated.
  - Mitigation: verification workflow + “unverified” status; no promotion to recommend list.

---

## 8. References

- Current deliverables: `publish/LATEST.md`, `publish/starter_pack.md`
- Current dataset: `data/master/repo_master.csv`
- Architecture: `docs/ARCHITECTURE.md`
