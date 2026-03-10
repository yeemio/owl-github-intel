# Bring Your Stack (BYO Inventory)

This repo becomes much more useful when you bring your own stack inventory.
You provide a CSV of the repos/tools you already use (or plan to use), and we generate a decision-grade report:

- Which items are already covered in `data/master/repo_master.csv`
- Their current posture (`P0/P1/P2`) and verdict (`survives/partial/fails`)
- Relevant risk notes (risk level, risk signals, rollback signals)
- What is missing (unknown repos) and what to scan next
- Suggested complements by track (agent/mcp/rag/gateway/eval/security)

## 1) Prepare your inventory CSV

Use the template:

- `../templates/user_inventory.csv`

Columns (minimum):

- `repo`: `org/name` (preferred)
- `url`: GitHub URL (optional if `repo` is present)
- `lane`: one of `agent|mcp|rag|gateway|eval|security|cross` (optional)
- `criticality`: `high|medium|low` (optional)
- `notes`: free text

## 2) Run the analyzer

From the repository root:

```bash
python scripts/analyze_user_stack.py --input templates/user_inventory.csv --output publish/reports/user_stack_report.md
```

## 3) Read the report

The report is a Markdown file you can attach to your architecture review, adoption ticket, or roadmap doc.

## Privacy note

If your inventory contains private/internal repos, keep the CSV local. The script runs locally and does not upload anything.

