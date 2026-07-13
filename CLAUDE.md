# CLAUDE.md — SindicApp

## What this project is

SindicApp is a functional prototype of a neutral, worker-coordination platform, built as a static web app with no backend (`index.html` + `css/` + `js/`, with Vite as dev/build tooling). It follows a geography-first approach: every company gets an automatic profile on an interactive map (Leaflet + OpenStreetMap), and from that profile users reach anonymous complaints (denuncias), salary transparency, collective agreement (convenio) info, collective action tools (e.g. strike coordination), and discussion forums.

It is explicitly **not** a replacement for existing unions (CCOO, UGT, SIPTU, etc.) — it's neutral infrastructure meant to complement them: a company directory, territorial map, sector/territory forums, and verified coordination spaces.

Twelve peer modules in the always-visible subnav (no Usuario/Colectivo umbrella — see ADR 0010), with **Red Social** as the master module and default landing (internal sub id still `feed`, see ADR 0012): a per-module stats dashboard that acts as the trunk into Sindicatos, Territorios, Sectores, Empresas, Consumidores and Estudiantes, plus a live activity feed; the classic portada (logo, greeting, language switcher) is fused into its sidebar, and the header title returns here. The others: **Perfil** (`usuario`/`self` — personal view of one's own company), **Sindicatos** (union directory), **CRM** (multi-organisation, internal sub id still `coordination`, ADR 0006), **Territorios** (territory profiles, internal sub id still `vivienda`, ADR 0007), **Sectores**, **Foro** (the real forum — general board plus sector/territory subforums whose trees render in the workspace, not the sidebar; internal forum state keys still say `feed`, ADR 0012), **Empresas**, **Wiki** (transversal), **Consumidores** (products/services with consumer reports, pressure campaigns and alternatives), **Vivienda / Housing** (`housing`, deliberately distinct from Territorios, ADR 0011 — five tabs: national rent-strike meter, eviction alerts with escort-picket sign-ups, big-landlord campaigns, a rent-vs-reference-index checker, and local tenant assemblies), and **Estudiantes** (study-centre profiles with student groups, grievances and mobilisations). Every entity profile — territory, sector, union, company, product/service, study centre — carries a demo **Telegram group + social links** block. There is no top-level "Mapa" section: Empresas and Territorios each have a Mapa | Lista view toggle (default Mapa; company pins vs. boundary picker — see ADR 0008), and the legacy sub id `map` aliases to Territorios → Mapa.

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

`docs/decisions/` holds ADRs for decisions that would confuse a future contributor if only the code were visible — see `docs/decisions/README.md` for the template and when to write one. Current set: [0001](docs/decisions/0001-split-single-file-prototype-into-vite-project.md) Vite split, [0002](docs/decisions/0002-keep-application-scripts-classic-not-es-modules.md) classic scripts, [0003](docs/decisions/0003-avoid-backend-store-demo-state-in-localstorage.md) no backend, [0004](docs/decisions/0004-deploy-via-github-pages-using-github-actions.md) GitHub Pages via Actions, [0005](docs/decisions/0005-keep-map-as-primary-navigation-surface.md) map as primary navigation, [0006](docs/decisions/0006-turn-coordination-into-a-multi-union-crm.md) Coordination → multi-union CRM, [0007](docs/decisions/0007-turn-vivienda-into-territory-profiles.md) Vivienda → territory profiles, [0008](docs/decisions/0008-split-map-into-per-section-views.md) map split into per-section views, [0009](docs/decisions/0009-empresa-map-tab-and-toggle-as-exit.md) Empresa Resumen-first tabs + Mapa|Lista toggle as company exit, [0010](docs/decisions/0010-flatten-module-hierarchy-eight-peer-modules.md) flatten module hierarchy (8 peer modules, no Usuario/Colectivo umbrella), [0011](docs/decisions/0011-vivienda-housing-module-distinct-from-territorios.md) Vivienda (housing) as a module distinct from Territorios, [0012](docs/decisions/0012-red-social-master-module-forum-split.md) Red Social as master module + forum split into its own module. Don't edit an old ADR to reflect a change of mind — write a new one that supersedes it.

## Commit policy — read before touching git

Edu Collin (project owner) is the only human author of this repo; every commit should be attributable to him even when Claude runs the git commands. As of 2026-07-10, Edu has authorized Claude to commit and push directly when he says **"push"**: commit everything currently in the working folder (using conventional commit format above, and adding a changelog entry) and push it — to whichever branch is currently checked out, not automatically to `main` unless `main` is what's checked out or Edu says so explicitly. Local git identity should be set to Edu's name/email; a short-lived, repo-scoped GitHub token is supplied by Edu each session for the actual push (never persisted to disk).

This supersedes any stricter "never push" default for this specific project and this specific phrase. Still pause and confirm before pushing anything that looks like it could be accidental or destructive (e.g. a large unexplained deletion, like `index.html` going missing during a reorg on 2026-07-11) — "push" means "commit and push what's clearly intended," not "push blindly no matter what's in the folder."
