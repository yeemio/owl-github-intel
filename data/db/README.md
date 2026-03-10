# Product DB (MVP)

This folder stores minimal structured data for the **product system**.

Why it exists:
- `data/master/` and `insights/` are curated intel assets.
- The product system needs a minimal, queryable store for:
  - evidence links (required to recommend)
  - submissions + ingestion status

Files:
- `evidence.csv`: evidence rows keyed by repo
- `submissions.csv`: user submissions (public-only) + status

Notes:
- MVP uses CSV for simplicity and reproducibility.
- We can migrate to SQLite later when query semantics become necessary.

