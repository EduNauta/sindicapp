# 0007. Turn the Vivienda section into geography-first territory profiles

Status: Accepted
Date: 2026-07-12

## Context

SindicApp's founding idea is geography-first coordination: every *company* already gets an automatic profile reachable from the map. Territories, however, only had a narrow "Vivienda" (housing) section — a region/territory picker that opened a housing forum and eviction alerts. Meanwhile the concept of a *territory page* was accumulating elsewhere (the Map's territory dossier, the forum's territorios scope), with no single canonical place where a territory "lives."

Three sub-problems came together on 2026-07-12:

1. **Scope.** Edu's verdict: the section should be the territory's *profile* — companies, housing, forum, and social channels (Telegram etc.) — not just housing. Housing becomes one part of a larger whole.
2. **Geography.** The picker used an informal two-level tree ("Àrea Metropolitana", "Catalunya Central" → made-up subterritories like "Costa Brava"). The real Spanish administrative hierarchy is provincia → comarca → municipio, and the map's boundary layers (catComarques) already speak real comarca names.
3. **Naming vs. wiring.** The internal sub id `vivienda` is referenced by routing, state variables, demo datasets (workplaces' `territoryId`, alerts, buildings, forum posts keyed by territory id), and cross-navigation attributes. A wholesale rename would touch all of it for zero user-visible gain — the same trade-off already decided for Coordination → CRM in ADR 0006.

The realistic options were: (a) rename everything internally too; (b) rename only the user-facing surface and restructure the data underneath; (c) build a new "Territorios" section alongside Vivienda. Option (a) is churn with high regression risk in a prototype; option (c) would duplicate the territory concept the reform is trying to unify.

## Decision

Option (b), in four parts:

- **Rename the surface, keep the id.** The section is "Territorios" (EN: "Territories") in the nav, locale packs, and page titles, but the sub id stays `vivienda` everywhere in code and URLs, exactly as `coordination` stayed for the CRM (ADR 0006).
- **Real hierarchy, preserved ids.** `TERRITORY_TREE` (ES) now models provincia → comarca with all 42 Catalan comarcas under Barcelona / Girona / Lleida / Tarragona. The historical demo ids are kept and re-labelled to their real comarca (`girona-comarca` → Gironès, `central-bages` → Bages, `barcelona-ciutat` → Barcelonès, …) so every dataset keyed by territory id keeps working; comarcas without demo data render an empty but functional profile. A third selector level, municipio, exists as structure only (`TERRITORY_MUNICIPALITIES`, a few demo entries) — the full ~947-municipality list is deliberately deferred.
- **The profile is the canonical territory page.** It aggregates companies, housing (alerts / agenda / buildings), the territory forum, and social channels, and both directions of map linking converge on it: map boundary → territory page (`resolveTerritoryPageFromBoundary`) and territory page → map ("Ver en el mapa").
- **Housing is demoted from section to card**, not removed: eviction alerts, the housing agenda, and building profiles (R7) all live inside the profile unchanged.

## Consequences

- Future contributors will see `vivienda` ids, state variables (`activeSindicatoVivienda*`), and copy keys (`vivienda*`) rendering a section labelled "Territorios". That mismatch is this decision; don't "fix" it by renaming the ids piecemeal. If a rename is ever done, it must be done wholesale (ids, hash routes, state keys, datasets) in one deliberate change.
- Demo territory ids no longer look systematic (`central-bages` sits under the `barcelona` province; `tarragona-ebre` is labelled Baix Ebre). They are historical keys, not slugs — new comarcas *do* use clean slugs (`alt-emporda`, `moianes`, …). Never re-key the historical ids without migrating every dataset that references them.
- The comarca list is now real and complete, so map-boundary matching can rely on real names; `TERRITORY_BOUNDARY_MAP` covers all 42.
- The municipality level is a UI promise ahead of its data. Anything built on it must tolerate comarcas with zero municipalities (the common case) until the full dataset lands.
- Ireland (`ie` locale) keeps its counties → districts tree untouched; the three selector levels read county / district / municipality there. A future locale needs its own hierarchy labels, not Spain's.
