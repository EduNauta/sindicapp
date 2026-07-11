# 0001. Split single-file prototype into a Vite project

Status: Accepted
Date: 2026-07-09

## Context

SindicApp began as `SindicApp.html`, a single ~22.8k-line file combining all markup, CSS, and JavaScript. That was deliberate: it was built in Cursor as a portable experimental artifact, meant to be handed to friends as one downloadable file, opened via double-click (`file://`), with no server and no build step required.

As the project grew from a shareable demo into a real, deployed, iteratively-developed website with a public URL, the single-file format stopped being an advantage. It made diffs unreadable, mixed unrelated concerns in one file, and had no structured build or deploy process.

## Decision

Split the monolith into `index.html` + `css/main.css` + seven classic scripts under `js/`, following the module boundaries the file already documented internally (`/* sindicapp/... */` header comments and `SINDICAPP_BUNDLED_SCRIPTS` markers). The extraction was verbatim: re-inlining the split files reproduces the original file byte-for-byte, so this was a pure structural change with no behavior change.

Vite was adopted as the dev/build tool (`npm run dev` / `build` / `preview`), with `base: './'` so the built output works both on GitHub Pages and as a plain static host. The original monolith is kept at `legacy/SindicApp.html` for reference.

## Consequences

- The project now has a build step (`npm install && npm run build`) and Node/npm as a dev-time dependency, though the shipped output is still a fully static site with no server-side runtime.
- `index.html` must exist, by that exact name, at the repository root — both Vite's default build entry and GitHub Pages' default document depend on it (see [0004](0004-deploy-via-github-pages-using-github-actions.md)). This was learned the hard way on 2026-07-11, when a docs reorganization moved `index.html` into an archive folder and broke the build.
- Enables normal web-project tooling going forward: a fast dev server, meaningful diffs, and file boundaries that map to the app's actual module structure.
- See [0002](0002-keep-application-scripts-classic-not-es-modules.md) for why the extracted scripts stayed classic (non-module) rather than becoming ES modules.
