# Design: Intel Search Engine Portal

> Scope: Public-only MVP that closes the loop for (1) intent search, (2) public repo URL analysis, (3) BYO inventory analysis, and (4) public submissions into an ingestion queue.

---

## 1. Architecture Overview

### 1.1 Components

- **Web Portal (frontend)**: a search-like UI.
  - Inputs: intent query, constraints, repo URL, inventory upload.
  - Outputs: a report view (HTML) + downloadable Markdown.

- **API Service (backend)**:
  - `/recommend`: intent -> structured report
  - `/analyze/repo`: public repo URL -> audit report
  - `/analyze/inventory`: inventory -> audit report
  - `/submit`: submission -> queue record

- **Ingestion Worker**:
  - Pulls submissions
  - Fetches public metadata, releases, issues, docs
  - Produces: catalog rows + evidence rows + derived intelligence placeholders

- **Data Stores**
  - **Catalog DB** (structured): repo rows + evidence rows + intelligence rows + risk rows + submission queue.
  - **Index store** (retrieval):
    - Phase 0: keyword index (simple)
    - Phase 1: add embeddings for semantic search

### 1.2 Data flow (MVP)

1. User intent -> API -> retrieval (catalog + evidence) -> report generator -> return report.
2. User repo URL -> fetch public repo files -> extract stack signals -> map to catalog -> report.
3. User inventory -> map to catalog -> report.
4. User submission -> queue -> ingestion worker -> add to catalog/evidence -> ready for verification.

---

## 2. Output Contract (Report schema)

All reports must conform to a strict schema before rendering:

- `input_summary`
- `lanes`:
  - each lane contains ranked candidates
  - each candidate contains:
    - `repo`
    - `posture` (`P0|P1|P2`)
    - `verdict` (`survives|partial|fails|unverified`)
    - `why`
    - `boundaries` (allowed / not allowed)
    - `risk_signal`
    - `rollback_signal`
    - `evidence_links[]` (>= 1 for any non-unverified recommendation)
    - `alternatives[]` (optional)
- `unknown_items[]` (repo slugs/urls)
- `next_actions` (30/60/90 day checklist)

Hard gating rules:
- If `evidence_links` is empty, the item is `unverified` and must not appear in “recommended list” sections.

---

## 3. Data Model (minimal)

### 3.1 Repository (catalog)

Fields (minimum):
- `repo` (org/name)
- `url`
- `topic` (lane)
- `license`
- `risk_level`
- `adoption_priority`
- `decision_verdict`
- `risk_signal`
- `rollback_signal`
- `updated_at`

### 3.2 Evidence

Fields (minimum):
- `evidence_id`
- `repo`
- `type` (`issue|release|doc|advisory|benchmark`)
- `url`
- `title`
- `excerpt` (optional, <= 300 chars)
- `captured_at`

### 3.3 Submission + ingestion status

Fields (minimum):
- `submission_id`
- `repo_or_url`
- `submitted_at`
- `status` (`queued|running|partial|verified|rejected`)
- `notes`

---

## 4. Retrieval and Recommendation (MVP)

### 4.1 Retrieval strategy

MVP should be deterministic:
- Primary key: lane + structured filters (license, deployment constraints)
- Secondary: keyword matching against catalog fields + evidence titles

Phase 1:
- Add embeddings for: intent query -> relevant repos/evidence.

### 4.2 Recommendation strategy

Baseline:
- Hard filters: license denylist, self-host constraints, language constraints
- Rank:
  - posture (`P0` > `P1` > `P2`)
  - verdict (`survives` > `partial` > `unverified`)
  - risk_level (lower risk preferred unless user requests “aggressive”)

LLM usage policy:
- LLM may generate: explanations, boundaries, next actions, comparison narrative.
- LLM must not generate: new factual claims without linking to stored evidence rows.
- The system should pass evidence snippets to the LLM and require a citation list.

---

## 5. Public Repo Analysis (MVP)

Signals extraction:
- Python: `pyproject.toml`, `requirements.txt`
- Node: `package.json`
- Go: `go.mod`
- General: `Dockerfile`, `README` keywords

Mapping:
- Normalize dependency/repo names -> candidate repo slugs
- If no match, classify as unknown and propose ingestion.

---

## 6. Verification Workflow (quality gate)

Promotion rule:
- A repo cannot be recommended unless:
  - It has >= 1 evidence row
  - It has non-empty `risk_signal` and `rollback_signal`
  - It has a `decision_verdict` and `adoption_priority`

This is how we prevent “awesome list drift”.

---

## 7. Security and Compliance Notes (public-only MVP)

- No tokens required.
- Rate limit external fetches.
- Store only public artifacts.
- Provide clear disclaimer that outputs are decision inputs, not guarantees.

