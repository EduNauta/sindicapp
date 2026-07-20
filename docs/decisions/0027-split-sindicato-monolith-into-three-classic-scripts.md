# 0027. Split the sindicato monolith into three classic scripts

Status: Accepted
Date: 2026-07-20

## Context

`js/sindicapp-sindicato.js` had grown past 8,500 lines — copy, demo seeds and logic interleaved in one file — making every working session needlessly expensive: any edit meant loading and navigating the whole monolith (idea 71 of report v5). At the same time, ADR 0002 forbids converting the app scripts to ES modules, so the standard remedy (import/export) was off the table. The realistic option was the same one the original single-file split used (ADR 0001): more classic scripts, loaded in a deliberate order, communicating through `window` globals.

## Decision

Split the monolith into **three classic scripts**, loaded in this order in `index.html`:

1. `js/sindicapp-sindicato-copy.js` — the whole `COPY` text object (plus the Catalan deep-merge over `COPY.es`), exported as `window.SINDICAPP_SINDICATO_COPY`.
2. `js/sindicapp-sindicato-data.js` — the pure-literal demo-data seeds, exported as `window.SINDICAPP_SINDICATO_DATA`.
3. `js/sindicapp-sindicato.js` — the remaining logic, still exporting `window.SINDICAPP_SINDICATO`.

Behaviour is **identical, verified**: a fingerprint of the rendered HTML across nav, portada, all modules, CRM screens and notifications in the three locales matches **byte for byte** before and after the split. Double-clicking `index.html` keeps working, as ADR 0002 requires.

## Consequences

- Working sessions get cheaper: copy edits touch only the copy file, seed edits only the data file, and the logic file shrinks to what actually needs reading.
- The **load order in `index.html` is load-bearing**: copy and data must load before the logic script, which reads their globals at parse/boot time. Reordering or lazy-loading them breaks the app — `getSindicAppMissingDependencies` now reports the two new files if they are missing.
- ADR 0002 stands intact: all three are classic non-module scripts; nothing here is a step toward ES modules.
