# Architecture decisions

This folder records SindicApp's significant technical decisions — the "why," not just the "what." Each file is one decision: what problem it addresses, what we chose, and what follows from that choice.

## When to write one

Write a new ADR when a decision would be genuinely confusing to a future contributor (including future Edu, or Claude in a future session) if only the code were visible — a choice with real trade-offs, especially ones that are easy to accidentally reverse without realizing it (like moving `index.html` out of the repo root, or converting a classic script to an ES module). Skip it for anything small, easily reversible, or already fully explained by the code and a good commit message.

## What NOT to do

Decisions here are treated as a history, not a living FAQ: don't edit an old ADR to reflect a change of mind. If a decision changes, write a new ADR that explicitly supersedes the old one (update the old one's Status line to `Superseded by 000X`) and mark the new one `Status: Accepted`. This keeps the sequence a reliable record of what was actually decided and when, not just what's currently true.

## Template

```markdown
# NNNN. Imperative title (e.g. "Keep scripts classic, not ES modules")

Status: Proposed | Accepted | Superseded by NNNN
Date: YYYY-MM-DD

## Context

What situation, constraint, or problem made this decision necessary? What were the realistic options?

## Decision

What did we choose, stated plainly.

## Consequences

What follows from this — the good, the bad, and anything a future change would need to account for.
```

## Naming

`NNNN-imperative-phrase.md`, lowercase, dashes, four-digit zero-padded sequence number (`0001`, `0002`, ...). The number reflects the order decisions were written, not necessarily code order.

## Current decisions

- [0001 — Split single-file prototype into a Vite project](0001-split-single-file-prototype-into-vite-project.md)
- [0002 — Keep application scripts classic, not ES modules](0002-keep-application-scripts-classic-not-es-modules.md)
- [0003 — Avoid a backend; store demo state in localStorage](0003-avoid-backend-store-demo-state-in-localstorage.md)
- [0004 — Deploy via GitHub Pages using GitHub Actions](0004-deploy-via-github-pages-using-github-actions.md)
- [0005 — Keep the map as the primary navigation surface](0005-keep-map-as-primary-navigation-surface.md)
- [0006 — Turn the Coordination section into a multi-union CRM](0006-turn-coordination-into-a-multi-union-crm.md)
- [0007 — Turn the Vivienda section into geography-first territory profiles](0007-turn-vivienda-into-territory-profiles.md)
- [0008 — Split the map into per-section views (Empresas and Territorios)](0008-split-map-into-per-section-views.md)
- [0009 — Refine the Empresa profile: Resumen-first tabs, "Mapa" tab, and the view toggle as company exit](0009-empresa-map-tab-and-toggle-as-exit.md)
- [0010 — Flatten the module hierarchy: eight peer modules, no Usuario/Colectivo umbrella](0010-flatten-module-hierarchy-eight-peer-modules.md)
- [0011 — Vivienda (housing) is a new module, distinct from Territorios](0011-vivienda-housing-module-distinct-from-territorios.md)
- [0012 — Red Social is the master module and default landing; the forum moves to its own module](0012-red-social-master-module-forum-split.md)
