# 0006. Turn the Coordination section into a multi-union CRM

Status: Superseded by 0015
Date: 2026-07-12

## Context

The "Coordinación" section was originally conceived as the place to coordinate *SindicApp itself* — not any particular union. In practice it held three static demo cards (Structure / Money / Objectives) with almost no content, and nothing in the app offered unions a workspace to actually manage their own organisation. Edu decided the section should become a CRM for *any* organisation — SindicApp included, but also every union in the directory — with the basic options in the sidebar and each option's full UI developing in the background workspace.

Realistic options considered:

1. Keep Coordinación as-is and add a separate CRM section — rejected: two sections would overlap ("platform coordination" is just the CRM with SindicApp selected), and the sidebar tab order is deliberate (see redesign doctrine), so adding a ninth tab has a real cost.
2. Rename the section's internal id from `coordination` to `crm` — rejected: the id appears in the allowed-subs lists, view-sync logic, sidebar wiring, and locale nav maps; renaming buys no user-visible benefit while risking regressions in uncommitted QA work.
3. Transform Coordinación in place, UI-label only rename (chosen).

A second decision rode along: where does interactive CRM state live? ADR 0003 established localStorage for demo state, but that pattern fits *user-owned* actions (your denuncia, your vote). CRM demo data is *organisation-owned* and regenerated per organisation; persisting mutated copies of it per browser would make the demo drift from its seed data with no way to reset from the UI.

## Decision

Rebuild the section as a CRM in place:

- UI label becomes **CRM** everywhere (sidebar, welcome hint, titles, both locale packs); the internal sub id remains `coordination`.
- An organisation `<select>` at the top of the CRM sidebar lists SindicApp plus every union from the existing directory (`getUnions`); all modules re-contextualise to the selected organisation.
- Seven modules as sidebar sub-tabs: afiliadas, casos, campanas, finanzas, comunicaciones, calendario, documentos. The old Money card's content is absorbed into Finanzas; Structure/Objectives content was dropped (its useful parts already live in the wiki).
- Demo data is generated per organisation by seeding from a hash of the org id (`crmOrgHash`), so every union shows different-but-plausible numbers without hand-authoring datasets.
- Interactive CRM state (case stages, campaign support, comm status, added events) lives in a session-memory store (`CRM_RUNTIME`), *not* localStorage — a deliberate, scoped exception to ADR 0003, which remains the rule for user-owned demo actions elsewhere in the app.
- Interactions reuse the established delegated-event pattern on the workspace (`handleSindicatoWorkspaceClick` + `syncTextWorkspace()` re-render); the members search updates only the table body so typing never loses focus.

## Consequences

- Any union (or SindicApp itself) now has a management demo: census, case pipeline, campaigns, finances, comms, calendar, documents — the section is no longer platform-navel-gazing.
- The `coordination` id no longer matches its UI label. Future contributors grepping for "CRM" will find locale strings and CSS (`crm-*` classes, `data-sindicato-crm-*` attributes) but must know the sub id is still `coordination`. This ADR is the pointer.
- CRM mutations reset on reload by design. If cross-session persistence is ever wanted, that's a revisit of this ADR (and probably of ADR 0003's localStorage-only stance, since per-org datasets would need namespacing and a reset affordance).
- The seeded-data approach means CRM numbers are synthetic and unrelated to the union directory's real-ish figures (members, delegates); reconciling them would require a shared data model — out of scope for the prototype.
