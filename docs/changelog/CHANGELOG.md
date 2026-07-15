# Changelog

All notable changes to SindicApp are documented in this file.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Entries before v0.0.4 predate this project's use of version numbers and are grouped by date only; from v0.0.4 onward each batch of work gets a version and a git tag. Each new push should add an entry here — see `CLAUDE.md` for the process.

## Unreleased

### Added
- Two new placeholder modules in the subnav, 3rd and 4th position, with no content yet: **Sindicatos** (`data-sindicato-sub="sindicatos"`) and **Autónomos** (`data-sindicato-sub="autonomos"`). Fully wired (click, active state, header title, locale labels) but render a simple "sin contenido de momento" panel until their scope is defined.

### Changed
- Subnav relabelling: the former union-directory module **Sindicatos** (`unions`) is now **Trabajadores**, freeing up the "Sindicatos" name for the new module above. The housing module **Vivienda** (`housing`) is now **Inquilinos**. The territory-profile module **Territorios** (`vivienda`) is now **Mapa**. Internal sub ids (`unions`, `housing`, `vivienda`) are unchanged — only display labels moved, in both locale packs and in the Red Social landing's stat cards.
- Swapped the subnav positions of **Inquilinos** (`housing`) and **Mapa** (`vivienda`): Inquilinos now sits right after CRM, and Mapa moved down next to Estudiantes.

## v0.1.0 — 2026-07-13 — Platform reforms: Red Social, CRM, Territorios, and four new modules

*Bigger and more transformative than the process-focused v0.0.4, hence the minor version bump rather than another patch.*

### Added
- **Red Social as master module and default landing** (internal sub id `feed`; see [ADR 0012](../decisions/0012-red-social-master-module-forum-split.md)): opening the app now lands on a network home — six clickable stat panels, one per trunk module (Sindicatos, Territorios, Sectores, Empresas, Consumidores, Estudiantes), each showing two live stats computed from the demo data (e.g. "8 sindicatos en el directorio / 109.480 afiliación combinada", "42 perfiles de territorio / 4 alertas de desahucio"), followed by the existing activity feed. Clicking a panel opens its module (`data-sindicato-goto-sub`). The classic welcome portada remains reachable via the header title; `#sindicato-…` deep links still win over the landing at boot.
- **Foro module goes live** (4th button of the subnav's left column, previously a disabled placeholder): the real forum — general board, sector forums, territory forums — moves out of Red Social into its own module. The sidebar keeps only the three scope buttons (plus the in-scope company filter); the **subforum trees now render in the workspace, not the sidebar** — picking Sectores shows the full sector tree, picking Territorios shows the complete provincia → comarca tree expanded (this scope was previously incomplete in the sidebar). Open subforums get a "← Todos los subforos" back button and their own Telegram group link; re-clicking a scope button also returns to that scope's root. Internal forum state keys deliberately still say `feed` (`activeSindicatoFeedScope` etc.) — only the owning sub id changed to `foro` (ADR 0012 has the rationale).
- **Consumidores module** (new): consumer-coordination directory of products and services — supermarket basket, household energy, telecoms, bank fees, delivery apps — each with a profile: consumer-report count, pressure campaigns with support bars, fair alternatives, a "know your rights" tip, a link to the related company profile on the map where one exists (Supermercat Diari, Polígon Nord Logística…), and social channels. Demo data in both locales (`CONSUMER_ITEMS`).
- **Estudiantes module** (new): study-centre directory — universities, a secondary school and vocational training in ES (UB, UAB, Institut Milà i Fontanals, Escola del Treball, UdG, UdL); TCD, UCD, UCC, University of Galway and Limerick CFE in EN — each with a profile: student count, student groups/unions (SEPC, TCDSU…), grievances & demands with reply counts, dated mobilisations, a jump to the centre's territory profile, and social channels. Demo data in both locales (`STUDY_CENTERS`).
- **Telegram group + social links on every entity** (`buildSocialLinksHtml`/`buildSocialLinksBlockHtml`): territory profiles (previously the only ones with links, now unified through the helper), sector dossiers (new "Redes y canales" card), union overviews, company overviews, product/service profiles, study-centre profiles, and open sector/territory forum pages. Telegram is visually highlighted first, followed by Mastodon, Instagram and X; all URLs are demo links generated from the entity slug (`t.me/sindicapp_<slug>`).
- New smoke test asserting the Red Social landing renders its six stat panels and that they navigate (Consumidores directory opens on click); the map smoke test now opens Empresas first, since the landing is a text workspace.
- **Vivienda module extended with four features** (on top of Huelgómetro and Alarmas; sidebar grows to five tabs): **Tenedores** — big-landlord directory (Blackstone/Testa, InmoCaixa, Cerberus/Divarian, Azora in ES; I-RES REIT, Kennedy Wilson, Greystar in EN) with organised buildings, homes, a collective-bargaining progress bar per holder, a per-holder Telegram group, and a CTA to the Sindicat de Llogateres profile (ES). **Calculadora** — rent checker: pick an area, enter m² and current rent, and it compares against a demo reference index (`RENT_INDEX`, €/m² by comarca/district), reporting % above/below with advice when above; only the result div re-renders so the form keeps its state. **Asambleas** — local tenant assemblies by area, each with members, meeting time/place, its own Telegram group, and a jump to the territory profile. **Acompañamiento** — every eviction alert in Alarmas gets a "🤝 Me apunto al acompañamiento" button with a counter (deterministic demo base + real pledges persisted in `localStorage` under `housingEscortPledges`). The Huelgómetro tab also gains the national Telegram group link.
- CRM module (Sindicato → CRM, formerly "Coordination"): a per-organisation management workspace that serves SindicApp itself *and* every union in the demo directory. An organisation picker at the top of the sidebar re-contextualises seven sections: **Members** (census table with live search — updates only the table body so the input keeps focus — plus status filter chips and headline stats), **Cases** (four-stage pipeline New → In progress → Bargaining → Resolved, each card movable with ◀/▶), **Campaigns** (progress bars towards a target with an "add support" action), **Finances** (dues / strike fund / spend summary plus a ledger view, absorbing the old "Money" panel), **Comms** (bulletins moving draft → scheduled → sent), **Calendar** (sorted event list plus an add-event form), and **Documents** (category-filtered library). Each organisation gets distinct demo data seeded from a hash of its id; interactive CRM state lives in session memory only, deliberately *not* in localStorage (see [ADR 0006](../decisions/0006-turn-coordination-into-a-multi-union-crm.md)).
- "Convenios" section in the sector/subsector dossier (Sindicato → Sectores module): looks up the reference collective agreement in the demo directory by the node's top-level sector, showing scope, validity dates, and a link to the source.
- "Open sector forum" button in the sector dossier: jumps straight to the forum pre-filtered to that sector (reuses the existing sector-scoped forum navigation).
- **Sindicat de Llogateres** added as the first entry in the Sindicatos directory (ES locale) — a real Barcelona tenants' union (founded 12 May 2017), populated with verified real data: current membership (5,880 affiliates / 80 organised buildings, end of 2025), founding story, official site link, an "about" summary, and a 6-point "Hitos y victorias" milestones timeline (Nos Quedamos campaign, LAU reform 2019, Llei 11/2020, Ley de Vivienda 2023). Sourced from sindicatdellogateres.org and Viquipèdia.
- **IAC (Intersindical Alternativa de Catalunya)** added to the same directory — real confederal public-sector union, founded 1997, ~14,000 affiliates, 1st union force in enseñanza/Generalitat.
- Union overview pages (Sindicato → Sindicatos) now show a founding year, an official website link, and a real "about" paragraph for every union in both locales (SIPTU, Unite, INMO, Mandate, FSU, CCOO, UGT, CGT, Intersindical-CSC, USOC, IAC, Llogateres) — existing demo membership/delegate numbers for the pre-existing unions were left untouched, only the new factual metadata was added.
- `presenceLabels` + `type: 'housing'` schema fields so a non-labour union (Llogateres) can relabel its presence stats ("Secciones territoriales", "Fincas organizadas", "Grandes reformas legales") instead of showing the generic company/workplace-delegate labels; its Estructura and Empresas tabs render union-appropriate content instead of an empty company list.
- Reusable milestones-timeline component on union overview pages (`buildUnionMilestonesHtml`) — currently populated for Llogateres only, but any union can opt in via a `milestones` array.
- Search/filter input in the Sindicatos sidebar (filters by name or sector), matching the existing Empresas search pattern; select options now show the sector alongside the name (e.g. "CCOO (General)").
- "← Volver a sindicatos" back button and "Otros sindicatos en este sector" cross-links on every union sub-page (Resumen, Foro, Estructura, Empresas).
- **Territory profiles** (Sindicato → Territorios, formerly "Vivienda"): each territory now gets a full geography-first profile — header with a Provincia › Comarca breadcrumb, four stat chips (companies / eviction alerts / buildings / forum threads, alerts highlighted in red when present), and colour-coded cards for Companies, Housing (eviction alerts + agenda + building profiles), Forum, and Social channels (demo Telegram / Mastodon / Instagram links per territory), reusing the sector-dossier card pattern. Two navigation CTAs wired through existing functions: "Ver en el mapa" (opens the Map with the territory's boundary highlighted) and "Abrir foro del territorio" (opens the Forum pre-filtered to the territorios scope).
- Province → comarca → municipality geography selectors in the Territorios sidebar: all **42 Catalan comarcas** grouped under their four provinces (Barcelona, Girona, Lleida, Tarragona), plus a municipality picker that is deliberately structure-only for now (a few demo municipalities per comarca in `TERRITORY_MUNICIPALITIES`; the full ~947-municipality list is a later phase). A live 📍 path line under the selectors confirms the current selection. In the `ie` locale the same three levels read county / district / municipality.
- Boundary-layer links (`TERRITORY_BOUNDARY_MAP`) for all 27 newly added comarcas, so selecting any comarca can highlight its real GeoJSON boundary on the map.
- Map → territory-page linking: the Info button on the map's territory bubble and on the selection bar now navigates to that territory's page in Territorios → Lista, via the new exported `resolveTerritoryPageFromBoundary(locale, layer, name)` (provinces and comarcas match accent-insensitively, exact-first so Urgell / Alt Urgell / Pla d'Urgell don't collide; municipality and census layers, which have no territory page, just close the bubble).
- **Mapa | Lista views in Empresas and Territorios** (see [ADR 0008](../decisions/0008-split-map-into-per-section-views.md)): both sections get a two-button toggle at the top of their sidebar, defaulting to Mapa (geography-first). The split is clean — **Territorios → Mapa** is the territory picker: the comarques/counties boundary layer switches on automatically, the Borders panel shows, company pins don't, and the provincia/comarca/municipio dropdowns hide (you pick on the map; bubble → Info → the territory's page in Lista). **Empresas → Mapa** shows company pins only: the Borders panel is hidden and stray boundary layers are switched off on entry. Empresas → Lista is the existing searchable directory. One Leaflet instance serves both; the toggle labels localise via the new `viewToggle` copy key.
- Placeholder row in the subnav for three upcoming modules: **Consumidores** (`data-sindicato-sub="consumidores"`), **Foro** (`data-sindicato-sub="foro"` — a new module distinct from the `feed` module, which now reads "Red Social"; see Changed), and **Estudiantes** (`data-sindicato-sub="estudiantes"`). Rendered as disabled buttons (new `.template-module-btn--soon` style: 50% opacity, `cursor: not-allowed`, `title="Próximamente"`). Both locale packs carry their labels (ES: Consumidores/Foro/Estudiantes, EN: Consumers/Forum/Students) but none of the three subs is wired to any view yet. (A fourth placeholder in this same row, **Vivienda** / `housing`, has since been built out — see below.)
- **Vivienda / Housing module** (Sindicato → Vivienda, internal sub id `housing`): the ninth subnav button, previously an inert placeholder (see above), now has two sub-tabs of its own, deliberately flat and *not* scoped to a territory — see [ADR 0011](../decisions/0011-vivienda-housing-module-distinct-from-territorios.md) for why this is a separate module from Territorios (internal id `vivienda`) rather than a merge into it. **Huelgómetro** (default tab): a national tally of tenants pledged to a rent strike, shown with the same `.sindicato-strike-meter` bar used by the per-company strike meter but as an absolute count against a fixed goal of 1,000,000, seeded with a per-locale demo baseline (`HOUSING_STRIKE_BASE`) plus real pledges from a "me sumo" button persisted in `localStorage`. **Alarmas**: every eviction alert from every territory aggregated into a single national feed (new `getAllViviendaAlerts(locale)`, flattening the existing per-territory `VIVIENDA_ALERTS` and labelling each entry with its territory name) — previously alerts were only visible one territory or building at a time.
- **Transversal Wiki** (Sindicato → Wiki): the wiki — previously two thin pages — becomes a real knowledge base and, like the forum, is embedded across the platform. (1) A shared **knowledge base** of articles in both locales: an opening **"SindicApp"** article (what the platform is, its principles, and a **History** section crediting its creator **Edu Nauta**), plus **Basic rights**, **How to report**, **Organising a section**, and a **Glossary**; the existing **Rules/Normas** page stays under a Platform heading. The wiki index lists all of these and links one example entity page of each kind. (2) An embedded **📖 Wiki section in every company, sector, union and territory profile** (`buildEmbeddedWikiSectionHtml`, mirroring the embedded-forum pattern) — a kind-specific blurb, quick links to the most relevant articles, and a CTA that opens that entity's own page. (3) **Per-entity wiki pages** (`buildEntityWikiPageHtml`; internal `wikiSub = 'entity'` with `activeSindicatoWikiEntityKind`/`Id`, reached via `data-sindicato-wiki-entity="kind:id"`): a summary drawn from the entity, a history/notes section, and a Links section pointing to the entity's profile, its forum, and general articles. A new `data-sindicato-goto-sector` handler lets those pages open a sector dossier inline. The Wiki sidebar sub-nav and the `setSindicatoWikiSub` allowlist were extended accordingly; all copy lives in both locale packs. Verified headless (Node + jsdom).

### Changed
- **Original portada fused into the Red Social landing**: with Red Social active, the classic welcome UI (logo, "Bienvenido/a a SindicApp", flag language switcher) now shows in the sidebar — reusing the space this module leaves free there — while the workspace shows the stats dashboard, merging the two landings into one view (new `redsocial-landing` class on `#template-module-body` overrides the `has-module` hide; `syncPortadaWelcome` runs on every locale change instead of only with no module active). The header title now returns to this fused landing instead of the old standalone portada-over-map state, which is no longer reachable in normal navigation.
- **Module hierarchy flattened to eight peers, no Usuario/Colectivo umbrella** (see [ADR 0010](../decisions/0010-flatten-module-hierarchy-eight-peer-modules.md)): the two-button `Usuario` / `Colectivo` module picker is gone, and the subnav — now the always-visible **primary** navigation, shown on the portada too — carries Usuario/Perfil as a peer eighth module alongside the seven collective ones. The internal `activeModule` split (`'self'` / `'sindicato'`) is deliberately retained: the `usuario` button flips `activeModule` to `'self'`, the other buttons dispatch sindicato subs, and the unified highlight lives in `updateModuleNavTrees`. The CI smoke test's menu-hierarchy check was rewritten to assert the flat subnav (it previously clicked the now-removed picker buttons). The reorder and renames in the next entry build on this flattened subnav.
- Subnav module order and two renames, at Edu's request (superseding the reorder from earlier the same day). The subnav wraps two buttons per row (`flex: 1 1 calc(50% - 3px)` on `.template-submodule-nav--depth-1`), so DOM order sets the visual rows; the buttons are now ordered **Red Social · Sindicatos / CRM · Territorios / Perfil · Sectores / Foro · Empresas / Wiki · Consumidores / Vivienda · Estudiantes** (Foro, Consumidores, Vivienda and Estudiantes are the disabled placeholders described above). The `feed` module now reads **"Red Social"** (previously "Foro" — "Foro" itself comes back as a separate, not-yet-built placeholder module) and the `usuario`/`self` module now reads **"Perfil"** (previously "Usuario") in both locale packs (`moduleLabels.self`, `nav['[data-module="self"]']`, `nav['[data-sindicato-sub="usuario"]']`) — internal ids (`feed`, `usuario`, `self`) are untouched, only the display labels and DOM order changed.
- The "Coordination" section — previously three static demo cards (Structure / Money / Objectives) about coordinating the platform itself — is renamed **CRM** across the sidebar, welcome hint, page titles, and both locale packs, and the wiki index now links to the CRM modules instead. The internal sub id stays `coordination` so existing routing/state wiring is untouched (rationale in ADR 0006).
- The **"Vivienda" section is renamed "Territorios"** across the sidebar nav, both locale packs, and page titles. Housing hasn't gone anywhere — it's now one card inside the broader territory profile instead of being the whole section. The internal sub id stays `vivienda` so demo data, routing, and state wiring are untouched (rationale in [ADR 0007](../decisions/0007-turn-vivienda-into-territory-profiles.md)).
- `TERRITORY_TREE` (ES) restructured from informal regions ("Àrea Metropolitana", "Catalunya Central"…) to the real **provincia → comarca** hierarchy. The historical demo territory ids are preserved under their new names (`barcelona-ciutat` → Barcelonès, `girona-comarca` → Gironès, `central-bages` → Bages, `tarragona-ebre` → Baix Ebre, etc.) because companies, alerts, buildings, and forum data reference them; new comarcas simply render an empty profile.
- Territorios sidebar legibility pass: the three stacked scroll-lists became compact dropdowns with short uppercase labels (Provincia / Comarca / Municipio — the full "Selecciona…" wording moved into each select's `aria-label`).
- Redesigned the sector/subsector/sub-subsector dossier: Forum, Companies, Unions, and the new Convenios section moved from a stacked list of `<h3>` blocks to visually distinct cards (icon + colour-coded left border per section) in a 2-column grid (1 column on mobile).
- Sindicatos directory (Sindicato → Sindicatos) no longer renders a card for every union in the background workspace by default. It now shows a compact summary (union count, combined membership, combined delegates) and defers to the sidebar picker — matching how Vivienda and Sectores already behave.
- Company map pins shrunk to readable size (circleMarker radius 8/11 → 4/6, thinner stroke) — at Catalonia zoom the old ones overlapped into blobs.
- Map copy (`mapIntro`/`mapHint`, both locales) no longer instructs users to "click OpenStreetMap below" — the map opens on its own and the provider button is gone.
- Legacy routes routed into the new structure: the internal sub id `map` is now an alias for Territorios → Mapa, and `#sindicato-territorio:id` deep links open the territory's page in Territorios → Lista instead of the old in-map dossier.
- **Empresa profile now opens on Resumen** (moved to the first tab and active by default) instead of the map, and the per-company **"Localización" tab is renamed "Mapa"** (icon 🗺️; internal section id stays `location`, so the map machinery and deep links are untouched) — making explicit that a company's map tab and Empresas → Mapa are one surface reached two ways. Opening a company from a list card or link lands on Resumen; clicking a map pin still lands on its Mapa tab. Same rename applies to the Usuario → Sindicato tabs, which share the section copy. (See [ADR 0009](../decisions/0009-empresa-map-tab-and-toggle-as-exit.md).)
- **The Empresas `Mapa | Lista` toggle now stays visible while a company is open**, where it acts as the exit: pressing either button deselects the company and returns to the general view (all pins / the directory list), with neither button highlighted while a company is open. Previously, once inside a company the only way back was the "Seleccionar empresa…" placeholder buried in the dropdown, so users got stuck (ADR 0009).
- The per-company strike-support meter (Empresas → a company → Acción tab) gets an explicit title, "🌡️ Huelgómetro" (EN: "Strike-o-meter") — new `strikeMeterTitle` copy key — so the existing bar-and-percentage widget reads as a named feature instead of an unlabelled progress bar. Only the meter itself changed; the strike-vote poll, agenda, and coordination chat in the same tab are untouched.

### Fixed
- Clicking a boundary on the map threw a `ReferenceError` in `updateMapSelectedTerritoryBar` (it still called `isGeoTeamsMapWorkspace()`, removed in an earlier rework), which silently broke the territory-selection listeners.
- The territory bubble's Info button did nothing on real map clicks: Cartagrama emits `pandora-territory-selected`/`pandora-territory-cleared`, but the app listened for `sindicapp-territory-*` events that nothing emits, so the selection never registered. Both event names are handled now, and the bubble's Info/close buttons are wired via document-level delegation because Cartagrama can recreate the bubble element (verified headless with a real polygon click: comarca → bubble → Info → territory page).
- The Comarques boundary layer no longer turns itself on in contexts that don't need it — it auto-enables only in Territorios → Mapa, where picking a territory is the whole point.
- **Selecting a company didn't zoom the map to it** (Empresas → Mapa and the company's Mapa tab): `restoreMapWorkspaceAfterTextMode` fires a deferred `recenterMapForLocale()` (double `requestAnimationFrame`) that ran *after* the synchronous focus `setView`, snapping the map back to the country view. The restore now re-focuses the company's pin when the workspace is a company's Mapa tab (verified headless: final `setView` at zoom 14 on the company's coordinates, no recenter overriding it). (ADR 0009)

### Removed
- The two-button **`Usuario` / `Colectivo` module picker** (`data-module="self"` / `data-module="sindicato"` buttons) — the subnav moved into that container and is now the primary navigation ([ADR 0010](../decisions/0010-flatten-module-hierarchy-eight-peer-modules.md)). The old `.sindicapp-module-box-row` styles are left in place but no longer used.
- The three legacy Coordination panels and their locale strings, plus the `buildCoordinationAdminHtml` renderer (exported but never called from anywhere).
- The redundant block at the bottom of the sidebar: the static "Colectivo / Coordinación laboral neutral…" stub panel and the zone label that duplicated the current view's title ("Territorios — Gironès"). The zone label is kept only in the Map view, where it captions the borders controls.
- The top-level **"Mapa" sidebar button** — the map now lives inside Empresas and Territorios as their Mapa view (ADR 0008); the old in-map territory dossier workspace is retired with it.
- The Map section's leftover template chrome: the sidebar block (intro text, collapsible Territorios tree, demo note — redundant with the map itself and with the Territorios selectors) and the "Proveedor de mapa" panel with its 🌍 OpenStreetMap button and "Solo OpenStreetMap…" caption (the map initialises on boot; the button and its `mapProviderTitle`/`mapProviderMuted` locale strings did nothing useful).
- The "Busca empresas en el mapa o elige una para abrir su perfil." intro line at the top of the Empresas sidebar (redundant — the search box, map, and list already make the action obvious).

## v0.0.4 — 2026-07-11 — Professional practices batch

*What was originally planned as "fase 4" (UI/roadmap polish) became, at Edu's request, a pass to bring the repo's process up to standard practice. First version-tagged release; see [ADR 0001](../decisions/0001-split-single-file-prototype-into-vite-project.md) discussion for why the two prior working versions (`0.1.0` in `package.json`, set by Vite's scaffolding and never a deliberate choice, vs. the fase-numbering Edu had been using informally) are reconciled as `0.0.4` here rather than following the untouched placeholder.*

### Added
- Conventional Commits as the commit message format, documented in `CLAUDE.md`.
- This changelog, backfilled with the project's full history.
- `docs/decisions/`: an ADR process (template + 5 initial decisions covering the Vite split, classic scripts, no backend, GitHub Pages deploy, and map-as-navigation).
- CI smoke tests (Playwright, `tests/smoke.spec.js`): page loads without console errors, Usuario/Sindicato menu hierarchy intact, map loads — runs on every push and pull request and blocks deployment on failure (`.github/workflows/deploy.yml`).
- SEO/social preview support: `<meta name="description">`, Open Graph and Twitter Card tags in `index.html`, plus `robots.txt` and `sitemap.xml`.
- `CONTRIBUTING.md`: human-facing setup and contribution conventions (CLAUDE.md remains the AI-assistant-facing equivalent).
- `SECURITY.md`: vulnerability reporting policy.
- `.github/dependabot.yml`: monthly automated dependency updates for npm and GitHub Actions.

### Changed
- `docs/plans/REFORMAS-FASE-4.md` renamed and restructured into `docs/plans/PLANES.md`: dropped the `F4-N` numbering scheme (now a general living plans doc, not tied to one reform round) and added a new section logging engineering practices considered but deliberately deferred (linting, pre-commit hooks, PR-based review, release automation) with the reasoning for each.
- `package.json` version set to `0.0.4` (see note above).

### Fixed
- `deploy.yml`'s concurrency group was a static `"pages"` string shared across every event. Within seconds of this batch landing, Dependabot opened five PRs at once, and their CI runs shared that group with the actual `main` deploy — cancelling it before it finished. Scoped the group per-branch/per-PR instead (`pages-${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}`) so unrelated runs no longer cancel each other.

## 2026-07-11

### Changed
- Reorganized `docs/` into `docs/plans/` (roadmap and proposal docs) and `docs/wiki/` (archived historical snapshots of the app, plus the original 2023 article that inspired the project).

### Fixed
- Restored `index.html` at the repo root after the docs reorg above accidentally moved it into the wiki archive, which broke the Vite build entry (see [ADR 0001](../decisions/0001-split-single-file-prototype-into-vite-project.md)).

## 2026-07-10 — Fase 4 polish

### Fixed
- Sidebar width now derives from a single `--sidebar-width` custom property instead of three hardcoded copies that had drifted out of sync, which was causing overlap with the map.

### Removed
- Dead duplicate "Map provider" box in the Sindicato map sidebar (Cartagrama's own control elsewhere in the same panel is the functional one).
- `docs/AGENDA-REUNION-14-07-26.md` (internal meeting agenda, removed from the repo at Edu's request).

### Changed
- Reorganized and substantially expanded the fase 4 roadmap document with proposals F4-10 through F4-18 (share button, pick-your-company onboarding, conflict-aware map pins, sector wage comparator, agenda alerts, global search, first-visit onboarding, PWA, dark mode).

## 2026-07-10 — Fase 3: QA fixes and B/C reforms

### Fixed
- Submitting a denuncia or a strike vote in the Usuario module blanked the workspace — the handlers called `syncSindicatoWorkspace()` instead of `syncTextWorkspace()`; the underlying data was persisting correctly, only the re-render was wrong.
- A single strike vote could jump support from 52% to 100% — `getStrikeSupportPct()` was ignoring the seeded baseline.
- Forms were missing `novalidate` and toast feedback on submit.

### Added
- Language switcher moved into the header (previously portada-only).
- Real logo asset (`assets/sindicapp-logo.jpg`).
- Convenio search demo and a 5-item FAQ.
- Per-sector wage tables and a "contribute your salary" flow (`wageContribs` in state).
- Toast notifications (`notify()`).
- Deep links to specific company-profile sections (`#sindicato-empresa:id:seccion`).
- Baseline accessibility/responsive polish: focus-visible states, fluid sidebar width, a dedicated tablet breakpoint, `prefers-reduced-motion` support.

### Changed
- Reorganized planning docs: moved `DOXA-REDISENO.md` and `REFORMAS-PROPUESTAS.md` into `docs/old/` (later `docs/plans/old/`), added the full QA findings (`REFORMAS-FASE-3.md`) and a fase 4 roadmap doc for deferred items.

## 2026-07-10 — Experimental redesign (merged to main)

### Added
- Doxa redesign doctrine document, defining the project's design invariants and visual register.
- Reforms R1–R8: convenio calculator, official-channels bridge in denuncias, registro/BORME block in company overview, agenda layer, verification ladder (union-as-guarantor demo), union prestige → implantación, building profiles in Vivienda, reordered Colectivo subnav.
- Fase 1 design tokens (civic blue `#24549c`, 15px base font size).

### Removed
- Latent `Partido`/`Colectivos`/`Candidatura` tree (fork residue from an earlier experiment) and all satirical demo lore that lived inside it — roughly 6,340 lines removed from `sindicapp-main.js` (7157 → 2160 lines).

### Changed
- Language switcher relocated from portada-only to the header.

## 2026-07-09 — Professional project structure

### Added
- `CLAUDE.md`, documenting the project's purpose and its git commit policy for AI assistants working in this repo.
- GitHub Actions workflow (`.github/workflows/deploy.yml`) deploying the build to GitHub Pages on every push to `main`.
- MIT `LICENSE`.

### Changed
- Refactored the single-file prototype (`SindicApp.html`, ~22.8k lines) into a Vite-based static project: `index.html` + `css/main.css` + seven classic (non-module) scripts under `js/`, following the module boundaries the monolith already documented internally. Extraction was verbatim — re-inlining the split files reproduces the original file byte-for-byte. See [ADR 0001](../decisions/0001-split-single-file-prototype-into-vite-project.md) and [ADR 0002](../decisions/0002-keep-application-scripts-classic-not-es-modules.md).
- Original monolith kept at `legacy/SindicApp.html` for reference.

## 2025-06-17 – 2026-06-09 — Prototype era

Single-file HTML prototype (`SindicApp.html`) built and iterated directly on GitHub: initial commit, several file uploads, and README revisions. No build process — the entire app (markup, styles, and logic) lived in one file, designed to be downloaded and opened locally by double-clicking, with no server involved.
