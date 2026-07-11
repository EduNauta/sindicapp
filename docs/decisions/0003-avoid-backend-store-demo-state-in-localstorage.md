# 0003. Avoid a backend; store demo state in localStorage

Status: Accepted
Date: 2026-07-09 (formalizing a decision implicit since the project's inception)

## Context

SindicApp exists to demonstrate a concept — geography-first company profiles, denuncias, salary transparency, collective action tools, and forums — before committing to real backend infrastructure, hosting costs, real user accounts, or a real data model. Building that infrastructure prematurely would slow down validating whether the concept and UX work at all.

## Decision

Ship SindicApp as a fully static site: HTML/CSS/classic JS, Leaflet + OpenStreetMap for the map, GeoJSON administrative borders embedded directly in source. All interactive/demo state (companies added, denuncias submitted, votes cast, salary contributions, etc.) lives in the browser's `localStorage`. There is no server, no database, and no real authentication.

## Consequences

- Zero hosting cost beyond GitHub Pages; the entire app can be inspected, forked, and run from static files alone.
- Demo data does not persist across browsers or devices, and isn't real: anonymous denuncias are a simulated flow, and no data is ever transmitted to a server (documented in the README's privacy section).
- Real backend, authentication, and a database are explicitly out of scope for now. Specific future needs that will require one are already tracked as separate, not-yet-decided items in `docs/plans/PLANES.md` — e.g. real BORME/Registro Mercantil data ingestion and a real union-as-guarantor verification backend. Deciding to build a backend should get its own ADR when it happens, since it will affect hosting, cost, and most of the decisions in this file.
