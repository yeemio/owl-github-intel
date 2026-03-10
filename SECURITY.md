# Security Policy

## Reporting a Vulnerability

If you believe you have found a security vulnerability, please do not open a public issue with exploit details.

Instead:

1. Open a GitHub issue with minimal details and label it `security` (or just mark it clearly).
2. If the issue includes sensitive details, request that maintainers move the discussion to a private channel.

## Repository Safety Rules

- Do not commit secrets: API keys, tokens, credentials, cookies, private endpoints, or internal URLs.
- Do not paste secrets into evidence excerpts. Redact aggressively.
- Prefer linking to public sources (issues/PRs/releases) instead of copying large text blobs.

## Supported Content

This repository contains research artifacts, datasets, and a static portal. There is no production service to patch, but we still treat:

- accidental secret disclosure,
- malicious links,
- and supply-chain style injection into scripts

as security issues.

