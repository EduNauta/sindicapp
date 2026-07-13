# 0009. Refine the Empresa profile: Resumen-first tabs, "Mapa" tab, and the view toggle as company exit

Status: Accepted
Date: 2026-07-13

Refines [ADR 0008](0008-split-map-into-per-section-views.md) (does not supersede it — the top-level "Mapa" is still gone, there is still one Leaflet instance, and Empresas/Territorios still use a Mapa | Lista toggle).

## Context

After ADR 0008 split the map into per-section views, the Empresa side still had two rough edges:

1. A company profile opened on its **Localización** tab (a focused map with a "bridge" card), with **Resumen** second. So the first thing you saw on picking a company was the map again, not the company's summary — and "Localización" and the section's own map were effectively the same surface under two names.
2. Once inside a company there was **no visible way back** to the general Empresas view. The `[Mapa|Lista]` toggle was only shown when no company was selected, and clicking "Empresas" while already in Empresas is a no-op (`setSindicatoSub` early-returns), so the only exit was the "Seleccionar empresa…" placeholder buried in the dropdown. Users got stuck.

Separately, selecting a company **did not zoom the map to it**: `restoreMapWorkspaceAfterTextMode` runs a deferred `recenterMapForLocale()` (double `requestAnimationFrame`) that fired *after* the synchronous focus `setView`, snapping the map back to the country view.

## Decision

Within Empresas (and, for naming consistency, the Usuario → Sindicato tabs, which share the same `sections` copy):

- **Resumen (`overview`) is the default company tab**, moved to first position and active on selection. Opening a company from a list card or link lands on Resumen; clicking a **map pin** still lands on the map tab (you were already looking at the map).
- The per-company **"Localización" tab is renamed "Mapa"** (icon 🗺️). Its internal section id stays `location` so all the map machinery keyed on `section === 'location'` is untouched — only the label changed. This makes explicit that the company's map tab and the general Empresas → Mapa are one surface reached two ways.
- The **`[Mapa|Lista]` toggle stays visible even with a company open**, where it acts as the **exit**: pressing either button deselects the company and returns to the general view (all pins / the directory list). While a company is open neither toggle button is highlighted, so it reads as "leave to Mapa / leave to Lista" rather than a current state.
- **Zoom fix**: in the deferred restore, when the workspace is a company's Mapa tab, re-focus that company's pin instead of recentering to the locale default.

Also removed: the "Busca empresas en el mapa o elige una para abrir su perfil." sidebar intro (redundant).

## Consequences

- This does **not** reverse ADR 0005 (map as primary navigation). The browse surface is still map-first: Empresas defaults to the Mapa view and you find companies on the map. Only the landing *tab of an already-chosen company* is now its textual summary.
- The toggle is intentionally overloaded: general view-switch when no company is selected, company-exit when one is. A future contributor might mistake the "deselect on click" for a bug — it is deliberate (`setSindicatoWorkplacesView` clears `activeSindicatoWorkplace`). The no-highlight-while-open rule lives in `syncSindicatoViewToggles`.
- Because the section id is still `location`, deep links (`#sindicato-empresa:id:location`) and the location-bridge card keep working unchanged.
- Verified headless (jsdom + a stubbed Leaflet that records `setView`): tab order/labels, toggle visibility with/without a company, Resumen-default, exit-via-toggle deselect, and a final `setView` at zoom 14 on the company's coordinates with no country recenter overriding it.
