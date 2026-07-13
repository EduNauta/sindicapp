# 0008. Split the map into per-section views (Empresas and Territorios)

Status: Accepted
Date: 2026-07-12

## Context

Since inception the sidebar had a top-level "Mapa" section that showed everything at once: company pins, the Borders (GeoJSON boundary) controls, a map-provider block inherited from the original template, and its own sidebar with an intro text and a collapsible territory tree. After the Territorios rework (ADR 0007) this became visibly redundant: the territory tree duplicated the Territorios selectors, the provider block was dead weight (OpenStreetMap already auto-loads at boot), and one map trying to serve both "find a company" and "pick a territory" made each task noisier.

The realistic options were (a) keep a single Mapa section and declutter it, or (b) remove the top-level entry and give each geography-driven section its own map view.

## Decision

Empresas and Territorios each get a **Mapa | Lista** toggle in their sidebar (default: Mapa, per the geography-first doctrine). The top-level "Mapa" button is removed.

The split is deliberately clean:

- **Territorios → Mapa** is the territory picker: the default boundary layer (comarques / counties) turns on automatically, the Borders panel is visible, company pins are not drawn, and the provincia/comarca/municipio dropdowns hide (you pick on the map). The Info button on a boundary's bubble navigates to that territory's page in Territorios → Lista.
- **Empresas → Mapa** shows company pins only: the Borders panel is hidden and any boundary layers left on are switched off on entry.
- There is still exactly **one Leaflet instance** (the persistent background map); the two "maps" are view states over it, not separate map objects.

Legacy routes keep working: the internal sub id `map` is now an alias for Territorios → Mapa, and `#sindicato-territorio:id` deep links open the territory's page in Territorios → Lista (the old in-map territory dossier is retired).

## Consequences

- This does **not** supersede ADR 0005 — the map remains the primary navigation surface and the default view of both sections; what disappears is "Mapa" as a destination of its own.
- Each map now has one job, so per-view behaviour (auto-enabling comarques in Territorios, clearing layers in Empresas) is encoded in `activateSindicatoMapWorkspace` / `syncSindicatoViewToggles` in `sindicapp-main.js`. New geography features should decide which of the two views they belong to instead of piling onto a shared map.
- The old dossier-inside-Mapa workspace (`isSindicatoMapSplitWorkspace`) is unreachable and kept only as dead code pending removal.
- Fixed alongside (belongs to this rework's history): Cartagrama emits `pandora-territory-selected`/`-cleared`, but the app listened for `sindicapp-territory-*` events nobody emitted — real map clicks never registered a selection, so the bubble's Info button appeared dead. Both event names are now handled, and the Info/close buttons are wired via document-level delegation because Cartagrama can recreate the bubble element.
