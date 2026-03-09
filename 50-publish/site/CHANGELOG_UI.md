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
