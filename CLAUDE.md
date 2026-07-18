# CLAUDE.md — SindicApp

## What this project is

SindicApp is a functional prototype of a neutral, worker-coordination platform, built as a static web app with no backend (`index.html` + `css/` + `js/`, with Vite as dev/build tooling). It follows a geography-first approach: every company gets an automatic profile on an interactive map (Leaflet + OpenStreetMap), and from that profile users reach anonymous complaints (denuncias), salary transparency, collective agreement (convenio) info, collective action tools (e.g. strike coordination), and discussion forums.

It is explicitly **not** a replacement for existing unions (CCOO, UGT, SIPTU, etc.) — it's neutral infrastructure meant to complement them: a company directory, territorial map, sector/territory forums, and verified coordination spaces.

**Navigation (since the 2026-07-17 rework — ADRs 0013–0017).** The subnav holds twelve buttons in **two boxes** (ADR 0017): on top the six **collective types**, below the **transversal tools** — **Usuario · Mapa · Foro · Wiki · Sectores · Empresas**. Two destinations deliberately have *no* button: **Red Social** (`feed`) is the home and the default landing, reached by clicking the **SindicApp** header title; and the **CRM** (`coordination`), which is no longer a module at all (see below). The reserved-but-empty `sindicatos` module is also out of the nav, its id still allowed in code.

**Access rings, implicit (ADR 0014).** Roles **Visitante · Usuario · Afiliado · Militante** (`propuestaRoleAllows`, persisted). The rings never organise the interface: they appear as locks and role-dependent content *inside* the modules. Locks walk through — a gated module opens and explains which role it needs, offering contextual role chips. There is no global role switcher and no page explaining the doctrine. `activeWebVersion` is a constant `'propuesta'` and `#sindicato-subnav` is permanently hidden — both are documented no-ops left over from the three-version experiment (ADR 0013).

**Equipos sindicales (ADR 0016).** Each collective type is a **directory of equipos sindicales**; selecting one opens a per-type section nav in the sidebar, grouped **Perfil** (Resumen, Foro, Estructura, Empresas — *Propietarios* in Inquilinos) / **Acción** (Huelgómetro, Alarmas, Calculadora, Asambleas — Inquilinos only today) / **Gestión** (CRM). The six types: **Trabajadores** (`unions`, labour unions), **Profesionales** (`profesionales`, professional bodies), **Inquilinos** (`housing`, one tenants' union per territory — Catalunya by default), **Autónomos** (`autonomos`, self-employed unions as equipos *plus* platforms as actors), **Consumidores** (`consumidores`) and **Estudiantes** (`estudiantes`). Every type also has a sidebar search + select picker. Note the stretch: in Trabajadores the entity *is* the union, while in Profesionales/Consumidores/Estudiantes it is the actor a team organises around.

**CRM inside each equipo (ADR 0015, supersedes 0006).** Militante-gated, scoped to the open team, with tabs, labels, org chart and datasets **per type**: Autónomos and Estudiantes drop Finances; Consumidores keeps only Campaigns/Comms/Calendar/Documents/Databases; the census is named for the collective; commissions differ per type; and cases/intake/assemblies carry sector-specific data keyed by `(locale, type)`. Its tabs include Intake, living Casos, Asambleas (role quadrant + speaking turns), Bases de datos and Estructura.

**Locales vs languages (ADR 0018).** Three locales — `es`, `ie`, `ca` — but only **two datasets**. `localeKey()` resolves the dataset region and returns `'es' | 'ie'` (`ca` → `es`, same territory); `copyKey()` resolves the UI language and may return `'ca'`. Catalan copy is merged *over* Spanish, so untranslated keys fall back to Spanish, never to `undefined`. Adding a language is cheap (one copy file + one nav pack); adding a region is not. **Watch out**: ~175 places still build small labels with inline `es ? … : …` ternaries instead of reading `COPY`, so they can show the wrong language under `ca` — migrate them into `COPY` when you touch them. The language switcher lives only on the portada.

**Unchanged from earlier ADRs**: the map remains the primary navigation surface (0005) with per-section views (0008) and Resumen-first company tabs (0009); territory profiles live in **Mapa** (`vivienda`, 0007) and are distinct from Inquilinos (`housing`, 0011); the forum keeps the `feed`-prefixed state keys of 0012. Every entity profile carries a demo **Telegram group + social links** block. Naming coincidences to watch: Empresas and Mapa each still have their own internal Mapa | Lista toggle, unrelated to the top-level **Mapa** button; the legacy sub id `map` aliases to `vivienda`'s map view; and inside Inquilinos, "Asambleas" names two different things (the public listing under Acción and the CRM's moderation tool under Gestión).

Stack: plain HTML/CSS/JS (ES6+, no framework), Leaflet + OpenStreetMap for the map, GeoJSON borders embedded in `js/cartagrama-territories-bundle.js`, `localStorage` for demo persistence. Vite provides the dev server, production build (`dist/`), and GitHub Pages deploy (via `.github/workflows/deploy.yml`); there is no React, no Node in production, no database. All app scripts are deliberately *classic* (non-module) scripts loaded in order, so globals and execution timing match the original single-file version — `index.html` still works opened directly via double click. Do not convert them to ES modules without an explicit decision to do so.

Current state: early-stage prototype. Most features are demo UI over fake/local data; there is no real backend, auth, or database yet (see README's project status checklist for what's implemented vs. planned).

## Repository layout

```
sindicapp/
├── index.html                              # page markup; loads css/ and js/ in order
├── css/main.css                            # all styles
├── js/                                     # classic scripts, load order matters
│   ├── locale-bootstrap.js                 # early locale bootstrap (runs before body renders)
│   ├── cartagrama-territories-bundle.js    # territories/boundaries data (verbatim Cartagrama extract)
│   ├── sindicapp-locale-geo-data.js        # ES + IE territory trees
│   ├── sindicapp-locale-en-content.js      # Ireland (EN) locale pack
│   ├── sindicapp-locale-es-content.js      # España (ES) locale pack
│   ├── sindicapp-locale-ca-content.js      # Catalunya (CA) nav pack — ADR 0018
│   ├── sindicapp-locale-ca-copy.js         # Catalan copy layer, merged over COPY.es
│   ├── sindicapp-sindicato.js              # Sindicato module (window.SINDICAPP_SINDICATO)
│   └── sindicapp-main.js                   # main app (runSindicApp)
├── assets/                                 # logo etc.; copied into dist/ by vite.config.js
├── package.json / vite.config.js           # Vite tooling (dev/build/preview)
├── .github/workflows/deploy.yml            # GitHub Pages deploy on push to main
├── legacy/SindicApp.html                   # original monolith, kept verbatim for reference
├── docs/
│   ├── decisions/                          # ADRs — see "Architecture decisions" below
│   ├── changelog/CHANGELOG.md              # dated changelog — see "Changelog" below
│   ├── plans/                              # roadmap / proposal docs, incl. plans/old/ (superseded proposals)
│   └── wiki/                               # archived historical snapshots of the app (frozen, not maintained)
├── LICENSE
└── README.md
```

The `index.html` + `css/` + `js/` split mirrors the module boundaries that were already documented inside the old single-file `SindicApp.html` (`/* sindicapp/... */` header comments and `SINDICAPP_BUNDLED_SCRIPTS` markers); see [docs/decisions/0001](docs/decisions/0001-split-single-file-prototype-into-vite-project.md). **`index.html` must exist at the repo root** — both Vite's build and GitHub Pages' default document depend on that exact name and location; moving or renaming it (e.g. during a docs reorg) breaks the deploy.

## Commit message conventions

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`, e.g. `fix(usuario): call syncTextWorkspace on denuncia submit`. Common types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `build`, `ci`. Scope is optional but helpful (module or area name). Body paragraphs below the summary line are welcome for anything non-trivial — explain the *why*, not just the *what*.

## Changelog

`docs/changelog/CHANGELOG.md` follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Entries before v0.0.4 are grouped by date only; from v0.0.4 onward each released batch gets a version number and a git tag. Ongoing work accumulates under the **Unreleased** heading, which becomes the next version's section at release time. Add an entry — under Added / Changed / Fixed / Removed as appropriate — for every push that a future reader would want to know about. Trivial pushes (typo fixes, doc-only tweaks) don't need one; use judgment.

## Architecture decisions

`docs/decisions/` holds ADRs for decisions that would confuse a future contributor if only the code were visible — see `docs/decisions/README.md` for the template and when to write one. Current set: [0001](docs/decisions/0001-split-single-file-prototype-into-vite-project.md) Vite split, [0002](docs/decisions/0002-keep-application-scripts-classic-not-es-modules.md) classic scripts, [0003](docs/decisions/0003-avoid-backend-store-demo-state-in-localstorage.md) no backend, [0004](docs/decisions/0004-deploy-via-github-pages-using-github-actions.md) GitHub Pages via Actions, [0005](docs/decisions/0005-keep-map-as-primary-navigation-surface.md) map as primary navigation, [0006](docs/decisions/0006-turn-coordination-into-a-multi-union-crm.md) Coordination → multi-union CRM, [0007](docs/decisions/0007-turn-vivienda-into-territory-profiles.md) Vivienda → territory profiles, [0008](docs/decisions/0008-split-map-into-per-section-views.md) map split into per-section views, [0009](docs/decisions/0009-empresa-map-tab-and-toggle-as-exit.md) Empresa Resumen-first tabs + Mapa|Lista toggle as company exit, [0010](docs/decisions/0010-flatten-module-hierarchy-eight-peer-modules.md) flatten module hierarchy (8 peer modules, no Usuario/Colectivo umbrella), [0011](docs/decisions/0011-vivienda-housing-module-distinct-from-territorios.md) Vivienda (housing) as a module distinct from Territorios, [0012](docs/decisions/0012-red-social-master-module-forum-split.md) Red Social as master module + forum split into its own module, [0013](docs/decisions/0013-triplicate-then-unify-into-ring-based-app.md) triplicate the web then unify into one ring-based app, [0014](docs/decisions/0014-keep-access-rings-implicit-inside-modules.md) keep the access rings implicit inside the modules, [0015](docs/decisions/0015-dissolve-crm-module-into-each-equipo-sindical.md) dissolve the CRM module into each equipo sindical (supersedes 0006), [0016](docs/decisions/0016-equipo-sindical-as-common-entity-model.md) "equipo sindical" as the common entity model with grouped sections, [0017](docs/decisions/0017-subnav-collectives-first-red-social-from-header.md) subnav reshuffle: collectives first, Red Social from the header title (partially supersedes 0010 and 0012), [0018](docs/decisions/0018-catalan-as-language-layer-over-es-dataset.md) Catalan as a language layer over the `es` dataset. Don't edit an old ADR to reflect a change of mind — write a new one that supersedes it.

## Commit policy — read before touching git

Edu Collin (project owner) is the only human author of this repo; every commit should be attributable to him even when Claude runs the git commands. As of 2026-07-10, Edu has authorized Claude to commit and push directly when he says **"push"**: commit everything currently in the working folder (using conventional commit format above, and adding a changelog entry) and push it — to whichever branch is currently checked out, not automatically to `main` unless `main` is what's checked out or Edu says so explicitly. Local git identity should be set to Edu's name/email; a short-lived, repo-scoped GitHub token is supplied by Edu each session for the actual push (never persisted to disk).

This supersedes any stricter "never push" default for this specific project and this specific phrase. Still pause and confirm before pushing anything that looks like it could be accidental or destructive (e.g. a large unexplained deletion, like `index.html` going missing during a reorg on 2026-07-11) — "push" means "commit and push what's clearly intended," not "push blindly no matter what's in the folder."
