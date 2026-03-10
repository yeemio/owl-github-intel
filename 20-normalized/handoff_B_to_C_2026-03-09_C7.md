# Handoff B -> C (C7)

## B Deliverables
- matrix: `30-analysis/cross/challenge_matrix_2026-03-09_C7.csv`
- log: `30-analysis/cross/challenge_log_2026-03-09_C7.md`
- challenged claims: `18`
- verdict coverage: `100%`

## Verdict Summary
- survives: `0`
- partial: `17`
- fails: `1` (`C7-B-016`)

## Required C Actions
1. **Upgrade risk matrix**: Add changelog_quality / coverage flag; add pin_expiry and security-backport policy; for no_clear_breaking add code-diff or compatibility-test requirement.
2. **Rollout plan**: Tier rollback windows and gate thresholds by blast radius and business criticality; add baseline refresh rule and golden-set coverage; add owner-availability and incident-freeze dependency for waves.
3. **Exception policy**: Implement automated exception-expiry check and escalation; do not rely on manual expiry only.
4. **W9 upgrade radar**: Add state/config snapshot for stateful rollback; document event-driven reorder (e.g. CVE/compliance) for upgrade order.
5. **Architecture benchmark**: Label recommendation A as “scale profile” and add minimal profile; ensure upgrade/rollback playbooks reference same profile.

## Priority Warning
- C7-B-016: Exception policy without automated expiry enforcement will accumulate hidden risk; C must add revocation or escalation path.

## Consolidated Message for C
- Upgrade and cross-track assets are directionally strong but need tiering (criticality, blast radius), automation (exception expiry), and profile alignment (scale vs minimal).
