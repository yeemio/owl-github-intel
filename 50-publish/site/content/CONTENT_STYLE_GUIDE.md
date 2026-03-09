# Content Style Guide (EN/ZH Topic Pages)

## Scope
- Applies to:
  - `50-publish/site/content/en/topic-*.html`
  - `50-publish/site/content/zh/topic-*.html`
- Topics covered: `agent`, `mcp`, `rag`, `gateway`, `eval`, `security`.

## Required Page Structure
Every topic page must keep the same section order:
1. `Why it matters`
2. `Key findings`
3. `Evidence sources`
4. `Risks`
5. `Next actions`

## Navigation Requirements
- Top bar must include:
  - Portal button (`../../index.html`)
  - Cross-language button to the same topic page
- EN page links to ZH page, ZH page links to EN page.

## Writing Rules
- Keep sections short and decision-oriented.
- Prefer concrete statements over generic summaries.
- Include at least 3 evidence links in `Evidence sources`.
- Risks must be explicit, not only principles.
- Next actions should be executable and sequenced.

## Formatting Rules
- Reuse `../styles-content.css`.
- Use `.card` blocks for each section.
- Keep one H1 per page.
- Use ASCII for EN pages; ZH pages may use Chinese text.

## Localization Rules
- Keep topic parity: EN and ZH pages should reflect the same core meaning.
- Allow language adaptation, but do not change decision intent.
- Keep section mapping one-to-one across languages.

## File Naming Convention
- EN: `topic-<theme>.html` in `content/en/`
- ZH: `topic-<theme>.html` in `content/zh/`

## Quality Checklist
- [ ] All 5 required sections exist in correct order.
- [ ] Cross-language switch works.
- [ ] Evidence links are valid and topic-relevant.
- [ ] Risks include boundary or failure conditions.
- [ ] Next actions include owner-ready steps.
