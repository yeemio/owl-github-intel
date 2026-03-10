# Data Schema

This document describes the meaning of the most important datasets in this repo.

## `20-normalized/repo_master_latest.csv`

Purpose: canonical repository map with decision fields.

Key columns (high level):

- `repo`, `url`, `topic`: identity and classification
- `relevance`, `activity`, `license`: coarse signals
- `risk_level`: low/medium/high
- `adoption_priority`: P0/P1/P2 (priority to adopt)
- `why_relevant`, `source`: rationale and pointers
- `decision_verdict`: survives/partial/fails (or equivalent)
- `risk_signal`, `rollback_signal`: operational guardrails
- `adoption_profile`: minimal vs scale
- `trigger_threshold`: when to promote posture
- `exception_policy`: constraints for timeboxed exceptions
- `updated_at`: last updated date

## `40-insights/risks/failure-patterns.csv`

Purpose: recurring production failure signatures extracted from public issue/discussion evidence.

Expect fields such as:

- `repo`, `failure_type`, `trigger_condition`, `root_cause`, `fix_method`
- `reproducible`, `source_url`

## `40-insights/risks/upgrade-risk-matrix.csv`

Purpose: track breaking change and migration risks across key dependencies.

Expect fields such as:

- `repo`, `release`, `breaking_change`, `impact_area`
- `migration_complexity`, `rollback_suggestion`, `source`

## Schema Changes

If you add/remove/rename columns:

1. Update this document.
2. Update any portal/validation scripts that assume headers.
3. Keep a short note in `00-index/CHANGELOG.md`.

