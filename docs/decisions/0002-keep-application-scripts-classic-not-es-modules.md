# 0002. Keep application scripts classic, not ES modules

Status: Accepted
Date: 2026-07-09

## Context

The original single-file app relied on classic (non-module) script semantics: globals attached to `window`, and execution order/timing determined purely by `<script>` tag order in the document. Modern build tooling, including Vite, defaults to encouraging ES modules for bundling, code-splitting, and hot module replacement.

When [0001](0001-split-single-file-prototype-into-vite-project.md) split the monolith into separate files, converting those scripts to ES modules would have been the "modern" default choice — but it risks subtly changing execution order, global availability, and timing in ways that are easy to get wrong and hard to notice until a specific interaction breaks.

## Decision

Keep all application scripts as classic (non-module) scripts, loaded via plain `<script src="...">` tags in explicit order in `index.html`. Vite does not run them through its module bundling graph; a custom `closeBundle` hook in `vite.config.js` copies `js/` (and `assets/`) verbatim into `dist/` at build time instead.

This also preserves the original single-file app's key property: `index.html` still works when opened directly via `file://` (double-click), with no server required — useful for offline demos.

## Consequences

- Forgoes Vite's module-graph benefits for these files: no automatic code-splitting or tree-shaking, and hot-reload during `npm run dev` is page-level rather than module-level.
- Preserves exact original runtime behavior, which was verified byte-for-byte at the time of the split (see [0001](0001-split-single-file-prototype-into-vite-project.md)).
- Any future decision to convert scripts to ES modules must be explicit and deliberate, not an incidental side effect of some other refactor — this is called out directly in `CLAUDE.md`.
