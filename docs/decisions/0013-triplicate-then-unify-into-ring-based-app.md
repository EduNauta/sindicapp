# 0013. Triplicate the web to explore a rework, then unify into a single ring-based app

Status: Accepted
Date: 2026-07-17

## Context

The 14-07 meeting of the Sindicat de Llogateres' IT working group, plus the `SINDICAPP_FEATURE_REFERENCE` document written by one of its members, made clear that the union evaluates SindicApp mostly on its *internal* face — member database, intake, case follow-up, assemblies, document handling, privacy — while the prototype's strength was its *public* face: map, company profiles, reports, pay transparency. Reorganising the app around that feedback meant a rework big enough to risk breaking a prototype that already demonstrated its thesis well.

Edu asked to **triplicate the web** first: three buttons above the module boxes selecting **Clásica** (the app as it existed), **Propuesta** (a full rework, carte blanche) and **Final** (identical to Clásica for now, the eventual merge target). The idea was to see the rework standing next to the original before deciding what to merge.

The obvious implementation — three copies of the app — was rejected immediately: ~14k lines duplicated three ways, with every later fix needing to land three times.

Once the Propuesta had been iterated on (see ADR 0014), Edu concluded the triple version "no tiene mucho sentido" and asked to unify — but only after archiving the Clásica as a **self-contained HTML file** that works opened from any folder, as insurance against losing something in the merge.

## Decision

- The triplication was implemented as **one codebase with three presentations**: Clásica and Final shared all existing code, and the Propuesta swapped only the *navigation shell* (`#sindicato-subnav-propuesta`) while reusing every module unchanged. `activeWebVersion` (persisted) selected the shell; `.propuesta-only` elements appeared only in the Propuesta. No module code was ever duplicated.
- Before unifying, the Clásica was **archived as `legacy/Sindicapp 170726.html`**: a build-time inline of every local CSS/JS file plus the logo as a data URI, frozen to the classic experience. It opens from any folder; Leaflet and map tiles remain CDN/network dependencies, which is inherent to a map application, not a folder dependency. This restores the self-contained-snapshot practice of the pre-Vite era (`legacy/SindicApp 260626.html`), which the post-split snapshot (`Sindicapp 130726.html`) had silently lost by still referencing `./js` and `./css`.
- The three versions were then **unified into the ring-based shell**, because it is the strict superset: every Clásica module is reused as the public ring, plus the ring locks, the internal CRM tabs, the Usuario ring section, the Foro's internal scope and the collectives' internal space. `activeWebVersion` is now a constant `'propuesta'` — the variable is kept (rather than removing the dozens of branches that read it) as a deliberate, documented no-op.
- **Feature parity was enforced explicitly**: the single Clásica-only interaction (moving a case through the pipeline stages) was folded into the Propuesta's living case file, which now carries both the history/documents/outcome view **and** the ◀▶ stage controls.
- The classic `#sindicato-subnav` markup is kept in the DOM but permanently hidden, so that references to it (label refreshes, `data-sindicato-sub` handlers) don't need unwinding.

## Consequences

- Anyone reading the code will find a `activeWebVersion` constant that never changes and a hidden classic subnav. Both are intentional: the constant marks where the version branches were, and the hidden nav avoids a risky removal. A future cleanup can delete them together.
- `legacy/Sindicapp 170726.html` is a frozen artefact, not a maintained build: it will drift from the live app immediately and by design. If another snapshot is ever needed, the recipe is "inline every local asset; leave CDN alone" — anything that still says `./js` or `./css` is not self-contained.
- The unification means there is no longer a way to see the old navigation in the running app. That is exactly what the legacy snapshot is for.
- Because the shells shared one codebase, the merge cost was near zero — the lesson worth keeping is that "show me both versions" is affordable when the difference is a shell, and ruinous when it is a copy.
