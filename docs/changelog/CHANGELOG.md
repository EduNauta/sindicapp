# Changelog

All notable changes to SindicApp are documented in this file.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). SindicApp doesn't have version numbers yet (it's a pre-1.0 prototype), so entries are grouped by date instead of version. Each new push should add an entry here — see `CLAUDE.md` for the process.

## Unreleased

Nothing pending.

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
