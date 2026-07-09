# CLAUDE.md — SindicApp

## What this project is

SindicApp is a functional prototype of a neutral, worker-coordination platform, built as a single-file web app (`SindicApp.html`) with no backend. It follows a geography-first approach: every company gets an automatic profile on an interactive map (Leaflet + OpenStreetMap), and from that profile users reach anonymous complaints (denuncias), salary transparency, collective agreement (convenio) info, collective action tools (e.g. strike coordination), and discussion forums.

It is explicitly **not** a replacement for existing unions (CCOO, UGT, SIPTU, etc.) — it's neutral infrastructure meant to complement them: a company directory, territorial map, sector/territory forums, and verified coordination spaces.

Two main modules:
- **Usuario** — personal view of one's own company (location, complaints, salaries, agreement, action).
- **Sindicato** — collective view (map of companies, union directory, sectors, forum, housing, wiki, platform coordination).

Stack: plain HTML/CSS/JS (ES6+, no framework), Leaflet + OpenStreetMap for the map, GeoJSON borders embedded in the HTML, `localStorage` for demo persistence. No React, no Node in production, no database — it's a static app opened directly in the browser.

Current state: early-stage prototype. Most features are demo UI over fake/local data; there is no real backend, auth, or database yet (see README's project status checklist for what's implemented vs. planned).

## Repository layout

```
sindicapp/
├── SindicApp.html   # the entire application, single file
└── README.md
```

## Commit policy — read before touching git

**Every commit to this repository must be authored and pushed by Edu Collin (the project owner), and only by Edu Collin.**

- Claude (or any AI assistant working in this project) must **never** run `git commit` or `git push` against this repository on its own initiative or as a "favor."
- Claude may prepare changes (edit files, stage a diff, draft a commit message) and hand them to Edu for review, but the actual `git add` / `git commit` / `git push` steps are performed by Edu, from his own machine, under his own GitHub account.
- If Claude is ever asked to "just commit this" or "push this for me," it should pause and confirm explicitly with Edu first, and should default to *not* pushing unless that confirmation is unambiguous and specific to that request.
- This applies to all branches, not just `main`.

Reason: authorship and review of every change to this codebase needs to trace back to a single accountable human (Edu), not to an assistant acting autonomously.
