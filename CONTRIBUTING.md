# Contributing to SindicApp

SindicApp is a static site — no backend, no database. Everything runs in the browser, built with [Vite](https://vitejs.dev/).

## Setup

```bash
npm install
npm run dev       # dev server at http://localhost:5173
```

`npm run build` produces the production build in `dist/`; `npm run preview` serves that build locally so you can check what will actually ship. `index.html` also still works opened directly via double-click (`file://`) — no server required — since the app's scripts are deliberately not ES modules (see [ADR 0002](docs/decisions/0002-keep-application-scripts-classic-not-es-modules.md)).

## Before you touch the code

Read [`CLAUDE.md`](CLAUDE.md) — it covers the project's purpose, layout, and the invariants that shouldn't change without a deliberate decision (map as persistent background, scripts staying classic/non-module, geography-first navigation, etc.). If you're not sure whether a change is "just an implementation detail" or something that needs a documented decision, check [`docs/decisions/`](docs/decisions/README.md).

## Making changes

- **Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`, e.g. `fix(usuario): call syncTextWorkspace on denuncia submit`. Common types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `build`, `ci`.
- **Changelog**: add an entry to [`docs/changelog/CHANGELOG.md`](docs/changelog/CHANGELOG.md) for anything a future reader would want to know about (skip it for trivial typo fixes).
- **Architecture decisions**: if a change is a genuine trade-off a future contributor could easily reverse by accident (like moving `index.html` out of the repo root, or converting a script to an ES module), write an ADR — template and process in [`docs/decisions/README.md`](docs/decisions/README.md).
- **Tests**: `npm test` runs a Playwright smoke suite (`tests/smoke.spec.js`) against a production build — loads without console errors, core Usuario/Sindicato menu hierarchy intact, map loads. It's meant to catch "visibly broken," not be exhaustive. CI runs this on every push and pull request and blocks deployment if it fails (`.github/workflows/deploy.yml`). Run `npx playwright install --with-deps chromium` once locally before your first `npm test`.

## Roadmap and planning docs

- [`docs/plans/PLANES.md`](docs/plans/PLANES.md) — the living backlog of proposed features and deferred engineering work.
- [`docs/plans/old/`](docs/plans/old/) and [`docs/wiki/`](docs/wiki/) — historical/archived documents, kept for reference and not maintained going forward.

## Questions

Open an issue, or reach the maintainer directly (see [`SECURITY.md`](SECURITY.md) for how to report anything sensitive privately).
