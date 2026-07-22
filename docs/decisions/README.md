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
- [0012 — Red Social is the master module and default landing; the forum moves to its own module](0012-red-social-master-module-forum-split.md) *(partially superseded by 0017)*
- [0013 — Triplicate the web to explore a rework, then unify into a single ring-based app](0013-triplicate-then-unify-into-ring-based-app.md)
- [0014 — Keep the access rings implicit inside the modules, not as a navigation layer](0014-keep-access-rings-implicit-inside-modules.md)
- [0015 — Dissolve the CRM module into each equipo sindical](0015-dissolve-crm-module-into-each-equipo-sindical.md) *(supersedes 0006)*
- [0016 — "Equipo sindical" as the common entity model, with sections grouped Perfil / Acción / Gestión](0016-equipo-sindical-as-common-entity-model.md)
- [0017 — Subnav: collectives first, tools below; Red Social only from the header title](0017-subnav-collectives-first-red-social-from-header.md) *(partially supersedes 0010 and 0012)*
- [0018 — Add Catalan as a language layer over the `es` dataset, not a third dataset](0018-catalan-as-language-layer-over-es-dataset.md) *(merge strategy amended by 0023)*
- [0019 — Spread every CRM capability flat into the team sidebar](0019-spread-crm-capabilities-flat-in-team-sidebar.md)
- [0020 — Split Fuentes de datos out of Bases de datos as its own CRM capability](0020-split-fuentes-de-datos-from-bases-de-datos.md)
- [0021 — Park all post-mock-up work until the prototype freezes](0021-park-post-mockup-work-until-prototype-freezes.md)
- [0022 — Real browser history via hash routes and pushState](0022-browser-history-via-hash-routes-pushstate.md)
- [0023 — Deep-merge the Catalan copy layer over Spanish](0023-deep-merge-catalan-copy-layer.md) *(amends 0018)*
- [0024 — Abandon the ring model: access = relación × cargos × parte](0024-abandon-rings-access-is-relation-cargos-parte.md) *(partially supersedes 0014)*
- [0025 — Accordion subnav: Sindicatos and Funcionalidades as exclusive groups](0025-accordion-subnav-sindicatos-funcionalidades.md) *(partially supersedes 0017)*
- [0026 — Order the Gestión sidebar group by organizing flow](0026-order-gestion-by-organizing-flow.md) *(completes 0019's postponed reorder)*
- [0027 — Split the sindicato monolith into three classic scripts](0027-split-sindicato-monolith-into-three-classic-scripts.md)
- [0028 — Add an Objetivos repository to the Inquilinos CRM](0028-objetivos-repository-in-inquilinos-crm.md)
- [0029 — Open the demo as Coordinación general by default](0029-open-demo-as-coordinacion-general-by-default.md)
