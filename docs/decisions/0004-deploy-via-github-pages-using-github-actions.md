# 0004. Deploy via GitHub Pages using GitHub Actions

Status: Accepted
Date: 2026-07-09

## Context

Following [0003](0003-avoid-backend-store-demo-state-in-localstorage.md), SindicApp needs a public, zero-cost hosting target for a static site. It's also desirable for deployment to be tied directly to the same git history and review process already governing the codebase, rather than a separate manual publish step.

## Decision

Use GitHub Pages with its "GitHub Actions" source mode (not the legacy "deploy from a branch" mode). `.github/workflows/deploy.yml` runs on every push to `main`: `npm ci`, `npm run build`, then `actions/deploy-pages`.

Enabling this requires a one-time manual step outside of git: Settings → Pages → Build and deployment → Source → GitHub Actions, on github.com. The workflow file being present in the repo isn't sufficient by itself.

## Consequences

- Every push to `main` that changes the build output triggers an automatic redeploy — no manual publish step, no separate deploy branch to keep in sync.
- The build entry point must be intact for the pipeline to succeed: a missing or misnamed `index.html` (see [0001](0001-split-single-file-prototype-into-vite-project.md)) fails the whole workflow, not just the affected page — this happened in practice on 2026-07-11.
- Anyone with a fork can redeploy their own copy of the site for free the same way, which fits the project's "neutral infrastructure" framing.
