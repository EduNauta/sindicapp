# 0026. Order the Gestión sidebar group by organizing flow

Status: Accepted
Date: 2026-07-20

## Context

ADR 0019 spread every CRM capability into the Gestión group as flat sidebar buttons — deliberately many, deliberately unordered. The method was explicit: **first spread everything on one plane, then think about how to reorder it** ("no reordering, no sub-grouping yet. That is a future, separate decision"). After two days of using the spread sidebar, that future arrived: Edu ordered the reorder executed (idea 70 of report v5).

The realistic options were: keep the pile as-is, re-hierarchise into collapsible sub-sections (undoing 0019's flatness), or add a light layer of *labels* over the existing flat buttons.

## Decision

The Gestión group gets **four non-clickable sub-labels**, ordering the `crm-*` buttons by the flow of organizing work:

- **Captar** — intake, afiliadas
- **Acompañar** — casos, asambleas, documentos
- **Impulsar** — campañas, comunicaciones, calendario
- **Administrar** — finanzas, estructura, datos, fuentes

The buttons themselves stay flat and at the same level — the labels are headings, not containers; nothing collapses, nothing gains a level of depth. Types with a reduced capability set simply omit the labels that would be empty (Consumidores, with no intake or census, shows no "Captar").

## Consequences

- This completes the "reordering comes later" clause of ADR 0019. 0019's flat-spread doctrine survives intact — the labels organize the reading order without hiding anything.
- The ordering criterion is the **flow of union work** — captar → acompañar → impulsar → administrar — not usage frequency and not the alphabet. A future dispute about button order should argue in those terms.
- Any future CRM capability must choose one of the four groups (or argue for a fifth, which should be resisted, mirroring the accordion-group discipline of ADR 0025).
