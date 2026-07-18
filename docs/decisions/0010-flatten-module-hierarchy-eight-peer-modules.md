# 0010. Flatten the module hierarchy: eight peer modules, no Usuario/Colectivo umbrella

Status: Partially superseded by 0017
Date: 2026-07-13

## Context

The app opened with a two-button **module picker** (`Usuario` / `Colectivo`) sitting above the navigation. Picking one set an internal `activeModule` (`'self'` or `'sindicato'`) and revealed that module's own navigation tree:

- **Colectivo** (`sindicato`) was an umbrella with no content of its own — it just held a subnav of seven modules (Empresas, Sectores, Foro, Unions, Territorios, CRM, Wiki).
- **Usuario** (`self`) was a parallel top-level module with its own personal workplace sections (Resumen / Mapa / Denuncias / Sueldos / Convenio / Acción).

Once the collective subnav reached seven buttons, the umbrella earned nothing: it added a level of nesting and an extra click, and "Colectivo" as a concept didn't describe anything the user did — the real destinations were the seven modules underneath. Usuario, meanwhile, is just one more first-class destination, not a separate universe.

## Decision

Remove the umbrella. There is no longer a "Colectivo" container; SindicApp presents **eight peer modules** at one level, with **Usuario the eighth**.

- The **subnav becomes the primary navigation**, moved out of the collective nav-tree into the always-visible `#template-module-picker` and shown on the portada too (it is now how you enter any module). The old two-button picker (`data-module="self"` / `data-module="sindicato"`) is deleted.
- Usuario is added to the subnav as `data-sindicato-sub="usuario"` (eighth button).
- **The internal `activeModule` split (`'self'` vs `'sindicato'`) is kept.** Clicking the `usuario` button calls `setActiveModule('self')`; the other seven dispatch through `setSindicatoSub`. Folding the personal-view rendering (`syncSelf*`, the `self-sindicato-block` section nav, the `selfView` verification card) into the sindicato sub system would have been a large, risky refactor for no user-visible gain, so the two nav-tree containers (`#self-nav-tree`, `#sindicato-nav-tree`) now simply coexist *below* the shared subnav, and only one shows at a time.

Unified highlight lives in `updateModuleNavTrees`: a subnav button is active when `(activeModule === 'self' && id === 'usuario')` or `(activeModule === 'sindicato' && id === activeSindicatoSub)`.

## Consequences

- This does not reverse [ADR 0005](0005-keep-map-as-primary-navigation-surface.md): the map is still the primary browse surface. This only removes a redundant nesting level in the sidebar.
- **Non-obvious bit for future contributors:** the `usuario` subnav button is not a normal sindicato sub — it flips `activeModule` to `'self'`. `setSindicatoSub` deliberately does not list `usuario` in its allowed set; the routing happens in the subnav click handler and the highlight in `updateModuleNavTrees`. The internal ids `self` / `sindicato` and all their rendering paths, deep links, and state are untouched — only the top-level UI shape changed.
- Because the subnav is always visible (including on the portada with nothing selected), it is the single entry point; there is no longer a "choose Usuario or Colectivo first" step.
- Display labels are decoupled from ids: the `self`/`usuario` button later reads "Perfil" and the `feed` module "Red Social" (locale packs) without touching this structure.
- Verified headless (jsdom + stubbed Leaflet): Usuario↔Empresas↔Wiki switching highlights the right button, shows/hides the correct nav-tree and detail sidebars, and renders each module's workspace with no console errors.
