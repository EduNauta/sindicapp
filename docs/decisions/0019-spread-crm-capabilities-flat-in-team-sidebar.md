# 0019. Spread every CRM capability flat into the team sidebar

Status: Accepted
Date: 2026-07-18

## Context

Since ADR 0015 the CRM lives inside each equipo sindical, and ADR 0016 grouped the team sections into Perfil / Acción / Gestión — with **Gestión holding a single "CRM" button** that opened a panel with its own internal row of tab chips (Afiliadas, Intake, Casos, Asambleas, Campañas, Finanzas, Comunicaciones, Calendario, Documentos, Estructura, Bases de datos).

That meant the CRM's real surface was hidden one level deep: the sidebar said "CRM" and the actual capabilities only appeared after entering. While rethinking the information architecture, Edu issued an explicit decree (18-07): **all CRM functionality must be visible in the sidebar as buttons at the same level — even if that leaves a lot of buttons.** The stated method matters as much as the layout: first spread everything on one plane so it can all be seen at once, and only then think about how to reorder it. Premature grouping was the thing being avoided.

## Decision

- Each CRM tab becomes its own sidebar section with id `crm-<tab>` inside the **Gestión** group, for all six collective types. The list is derived from `getCrmTabsForType(type)`, so per-type differences (Consumidores' reduced set, no Finanzas for Autónomos/Estudiantes) carry over automatically.
- The five generalized types get this dynamically (`getEquipoSectionGroupsForType`); Trabajadores' static sidebar in `index.html` gets one `data-sindicato-union-section="crm-*"` button per tab, relabelled at boot from `coordSubs`.
- The internal chip row is hidden for `crm-*` sections (`opts.hideTabs` in `buildEquipoCrmHtml`) — the sidebar *is* the tab bar now.
- The legacy section id `crm` keeps rendering (with chips) so old links and code paths don't break, but no sidebar button emits it.
- **No reordering, no sub-grouping** of the spread buttons yet. That is a future, separate decision.

## Consequences

- The Gestión group is deliberately long (up to 12 buttons). This is accepted noise: the point is to see the full surface before deciding its final shape. Any future reordering starts from `getCrmTabsForType` and the `crm-` prefix convention.
- Section ids like `crm-estructura` and `crm-asambleas` coexist with the Perfil section `estructura` and (in Inquilinos) the Acción section `asambleas` — same label, different thing. The `crm-` prefix is what disambiguates them in code; visually they are distinguished only by their group. This is a known naming coincidence to watch, in the spirit of the existing Mapa/Asambleas ones.
- Every per-type section router must accept the `crm-` prefix. This bit once already: Inquilinos' router matched only the literal `'crm'` and silently sent `crm-*` clicks to Resumen (fixed the same day). A future type with its own router must remember `section.indexOf('crm-') === 0`.
