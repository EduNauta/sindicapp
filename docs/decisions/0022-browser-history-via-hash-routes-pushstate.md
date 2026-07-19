# 0022. Real browser history via hash routes and pushState

Status: Accepted
Date: 2026-07-19

## Context

The app had deep links for three things only (`#sindicato-forum:`, `#sindicato-territorio:`, `#sindicato-empresa:`), written with `history.replaceState` — so the URL reflected *some* views but the browser's Back button never worked between modules: on mobile, Back (the number-one gesture) dropped the user out of the app entirely. Idea 51 of the v4 report.

Options considered: (a) full History API routing with path-style URLs — breaks the double-click-`index.html` guarantee (ADR 0002's spirit) and GitHub Pages' static hosting without a rewrite rule; (b) keep hashes but push real history entries — compatible with both, and the app already had the parse/apply/reflect triangle (`parseSindicatoRoute`, `applySindicatoHashRoute` on `hashchange`, `reflectSindicatoHash`).

## Decision

- Two new hash routes join the existing three: `#sindicato-sub:<id>` (top-level module) and `#sindicato-equipo:<type>:<entityId>[:<section>]` (open team, including its `crm-*` sections).
- `reflectSindicatoHash` is called at the end of every view sync and now uses **pushState** when the hash actually changes — each real navigation creates a history entry. It uses **replaceState** during boot and when there is no previous hash, so page load doesn't pollute history.
- Back/forward need no new machinery: the resulting `hashchange` re-applies the route through `applySindicatoHashRoute`, which gained branches for the two new views. Re-application is loop-safe because reflecting an already-current hash is a no-op.

## Consequences

- Back and forward work across modules, teams and team sections, and **every screen is shareable by URL** — including a specific team's CRM tab, which matters for the "botón compartir" workflow.
- The hash is now a load-bearing public surface: renaming a sub id or section id breaks saved links. Route ids should be treated with the same care as localStorage keys.
- Views not encoded in a route (e.g. CRM tab *within* the legacy coordination module, wiki article) restore to their container, not their exact leaf. Encode more state in routes only if someone actually misses it — every addition grows the URL surface that must stay stable.
- The `self`/Usuario module deliberately stays out of the history (it reflects nothing); personal screens behind role gates are not meant to be shareable URLs.
