# 0012. Red Social is the master module and default landing; the forum moves to its own module

Status: Partially superseded by 0017
Date: 2026-07-13

## Context

The 2026-07-13 subnav reform (ADR 0010) flattened the module hierarchy and renamed the `feed` module "Red Social", leaving "Foro" as a disabled placeholder — a new module, distinct from `feed`, still to be built. But at that point "Red Social" still *was* the forum: its view held the general board plus the sector/territory forum scopes, and the placeholder had no content to receive. Meanwhile the app's landing was a static welcome portada, and the two remaining placeholders (Consumidores, Estudiantes) had labels but no views.

Edu asked for a restructure: make Red Social a proper **master module** — the app's landing page and the trunk into the six "entity" modules (Sindicatos, Territorios, Sectores, Empresas, Consumidores, Estudiantes), offering a stats panel per module in the workspace; move **the actual forum** into the Foro button (4th button of the subnav's left column); stop rendering the sector/territory subforum trees in the sidebar — they belong in the workspace ("background"), where the territory tree can be shown complete; build **Consumidores** and **Estudiantes** with invented demo content; and give every entity (territory, sector, union, company, product/service, study centre) social-network links, especially a Telegram group per entity (demo links, real icons).

The main design question was how to split state and ids between `feed` (Red Social) and the new `foro` module without breaking existing wiring: forum state (`activeSindicatoFeedScope`, `feedSectorId`, `feedTerritoryId`, company filter, `#sindicato-forum:` thread deep links) and a dozen cross-module jump handlers (`data-sindicato-goto-sector-forum`, `data-sindicato-goto-territory-forum`, feed cards) all pointed at `feed`.

## Decision

- `feed` keeps its internal id but its view becomes the **Red Social dashboard**: six clickable stat panels (`data-sindicato-goto-sub`), one per trunk module, each computing two live stats from the demo data (unions + combined members, territories + eviction alerts, sector branches + subsector forums, companies + open reports, products/services + active campaigns, study centres + student groups), followed by the existing activity feed. It is the **default landing at boot** (`setActiveModule('sindicato')` + `setSindicatoSub('feed')` instead of the portada; deep links still win because the hash route is re-applied after).
- The classic portada is **fused into this landing** rather than kept as a separate state (refinement, same day): with Red Social active, the welcome UI — logo, greeting, flag language switcher — renders in the sidebar (this module needs no sidebar controls of its own), while the workspace holds the dashboard. The header title returns here; the old standalone portada-over-map state is no longer reachable in normal navigation, though its machinery (`activeModule = null`) is retained.
- The forum view moves wholesale to the new sub id `foro`, **reusing the `feed*` state variables and copy keys unchanged** — only the sub id that owns them changes (`setSindicatoFeedScope` and friends now force `foro`). This mirrors the `vivienda`/`coordination` precedent: stable internal ids, moved surface.
- Subforum trees render **in the workspace, not the sidebar**: the Foro sidebar keeps only the three scope buttons (plus the in-scope company filter), and picking Sectores/Territorios shows the full tree in the background (`.sindicato-forum-scope-tree`, handled by `handleSindicatoWorkspaceClick`). The territory tree renders expanded and complete (all provinces/comarcas), fixing the previously incomplete territorios scope. Selecting a scope always returns to its root, which doubles as the "← Todos los subforos" back action.
- **Consumidores** (`CONSUMER_ITEMS`) and **Estudiantes** (`STUDY_CENTERS`) become real modules with the same directory-card → profile pattern (no sidebar pickers — directory lives in the workspace), bilingual demo data, and cross-links into existing modules (related company profiles, territory profiles).
- Social links are unified in `buildSocialLinksHtml`/`buildSocialLinksBlockHtml` (Telegram highlighted first, then Mastodon/Instagram/X, all demo URLs generated from the entity slug) and embedded in every entity profile; sector/territory forum pages additionally show their Telegram group link.

## Consequences

- The naming mismatch is now permanent vocabulary: `feed` = Red Social (dashboard), `foro` = forum, and the forum's state/copy keys still say "feed" (`activeSindicatoFeedScope`, `c.feedSubs`…). Renaming them would touch dozens of call sites for zero behaviour change; this ADR is the map for future readers.
- The boot no longer lands on the portada, so anything that assumed "no module selected" at startup (map placeholder, smoke tests) had to be revisited — the map smoke test now opens Empresas first.
- All twelve subnav buttons are now live; `.template-module-btn--soon` no longer has users (kept in CSS for future placeholders).
- Red Social's stat panels read from every module's demo data at render time, so adding entities anywhere updates the landing for free.
