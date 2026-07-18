# 0015. Dissolve the CRM module into each equipo sindical

Status: Accepted
Date: 2026-07-17

Supersedes [0006](0006-turn-coordination-into-a-multi-union-crm.md).

## Context

ADR 0006 turned the old Coordination section into a **multi-organisation CRM module**: one workspace with an organisation picker at the top, serving SindicApp itself and every union in the directory. That was the right move at the time — it gave the prototype a credible internal face — but it left two problems that the 14-07 meeting made obvious.

First, **the CRM was a place, not a capability**. It sat in the navigation as a peer of Mapa or Foro, so managing a union was something you did *elsewhere*, after choosing an organisation from a dropdown, rather than something you did *inside* that union.

Second, **it was one CRM pretending to be many**. The tabs (census, cases, campaigns, finances, comms, calendar, documents) and their data were modelled on a tenant/labour union. As soon as the app grew to six collective types, Edu named the problem: *"ahora el CRM es de SdLl, no un CRM para todos los tipos de sindicatos. Cada uno tendrá sus especificaciones."* A consumer-coordination group has no member census with dues; a student union has no strike fund; a professional college's grievances are not workplace disputes.

Then, when the CRM button was removed from the navigation and a "Gestión" entry was added at the directory level of each collective, Edu reported the real failure: *"no veo el CRM por ninguna parte"* — and specified the shape he expected: *"cada equipo sindical seleccionado ha de tener sus botones, entre ellos el botón CRM."*

## Decision

- **The CRM ceases to exist as a module.** There is no CRM button in the navigation. The `coordination` sub id and all its machinery remain, but they are only reachable from inside an equipo sindical.
- **The CRM is a section of each equipo sindical** (ADR 0016), alongside Resumen, Foro, Estructura and Empresas/Propietarios. Opening it renders the management workspace scoped to that team, with an inline tab row and the team's name on the panel — `buildEquipoCrmHtml`.
- **Tabs are per type** (`CRM_TABS_BY_TYPE` / `getCrmTabsForType`): each type shows only the tabs that fit it, and a tab outside the set reframes to the first allowed one. Autónomos and Estudiantes drop Finances (no classic dues or strike fund); Consumidores keeps only Campaigns, Comms, Calendar, Documents and Databases, because it is campaign coordination rather than a membership union with cases and assemblies.
- **Content is per type, not just labels**:
  - the census is named for the collective (Afiliadas / Colegiadas / Inquilinas / Autónomas / Estudiantes);
  - the org chart carries each type's own commissions (`crmComisionesForType`) — ethics/professional defence/continuing education for colleges, rates/platforms/mutual aid for the self-employed, demands/wellbeing/communication for students — instead of the tenant union's four;
  - **cases, intake and assemblies have their own datasets** (`PROPUESTA_TYPE_DEMO`), with state keyed by `(locale, type)` so that moving a case, converting an intake or advancing a speaking turn in one type cannot touch another. The type is threaded through the `data-propuesta-*` attributes and into the mutation functions.
- The CRM gains the internal tools the union asked for — **Intake**, **Asambleas** (role quadrant + live speaking turns), living **Casos**, **Bases de datos** and **Estructura** — as ordinary tabs rather than separate screens.

## Consequences

- ADR 0006's organisation picker survives inside the CRM but is now secondary: the equipo you opened is the context, and the picker only re-scopes the shared demo data. A future clean-up should probably bind the CRM strictly to the equipo and drop the picker.
- Per-type data multiplies the demo content. `PROPUESTA_TYPE_DEMO` overrides only `intake`/`cases`/`sessions`; everything else falls back to the base (tenant-union) dataset, which is what Trabajadores and Inquilinos still use deliberately.
- The census, finances, comms, calendar and documents tabs still read the shared per-organisation CRM runtime (`CRM_RUNTIME`, now persisted). They are type-labelled but not yet type-modelled — the next honest step if the parametrisation is pushed further.
- Because the CRM is reached only through an equipo, any type without a directory of equipos would lose access to it entirely. That is what forced Inquilinos to be normalised (ADR 0016).
