# Ingestion Worker

Public-only ingestion pipeline.

Responsibilities:
- Pull submissions from a queue.
- Fetch public repo metadata (and selected public artifacts).
- Produce evidence rows and update catalog records.
- Maintain submission status: queued/running/partial/verified/rejected.

