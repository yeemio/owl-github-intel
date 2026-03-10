# UI Changelog

## 2026-03-09

- Refactored `app.js` into modular architecture:
  - `i18n` module (language switching + persistence via `localStorage`)
  - `router` module (hash-based state sync for search/theme/tag)
  - `filterModel` module (search/theme/tag filtering)
- Added new helper file `ui.js`:
  - centralized list rendering
  - keyword highlight renderer (`mark`)
  - reusable status and controls mounting utilities
- Added search enhancements:
  - theme filter
  - tag filter
  - search highlight on title/description
- Added persistent language memory:
  - key: `owl.portal.lang`
  - language remains after refresh
- Added page state feedback:
  - loading
  - ready count
  - empty result
  - error
- Updated `index.html` script loading to ES module mode.
- Updated `styles.css` for:
  - filter control styles
  - status banner variants
  - highlight style
- Added runtime config hook:
  - `portal.config.json` is loaded at startup (if present)
  - supports overriding `text` and `groups` without changing app logic

### Dynamic sections (config-only new blocks)

- **New partition without code change**: Any new key under `groups` in `portal.config.json` that is not in the built-in `SECTION_MAP` is rendered as a new section.
- **`sectionTitles`**: In config, add `sectionTitles.<sectionKey>` with `en` and `zh` to set the section heading.
- **DOM**: A single container `#dynamic-groups` in `index.html` is used; the app creates one card per dynamic group (heading + link list).
- **Example**: `portal.config.json` now includes a real sample:
  - `sectionTitles.cycleDigests`: "Cycle Digests (C1–C8)" / "周期摘要 (C1–C8)"
  - `groups.cycleDigests`: Cycle Scoreboard, Weekly Digest C1/C2, Three-Window Plan, Handoff B→C C1/C2 links.
- Adding another partition (e.g. `groups.myNewSection` + `sectionTitles.myNewSection`) requires no change to `app.js` or `index.html`.

### Cycle Digests expansion (C3–C6)

- **cycleDigests** in `portal.config.json` extended with:
  - Scan A C3 + Handoff A→B C3 (Window A artifacts for C3)
  - Handoff B→C for C3, C4, C5, C6 (links to `20-normalized/handoff_B_to_C_2026-03-09_Cx.md`)
- Theme/tags: all use `operations`; tags include `c3`–`c6`, `handoff`, `b-to-c`, `scan`, `window-a` for filter and search.
