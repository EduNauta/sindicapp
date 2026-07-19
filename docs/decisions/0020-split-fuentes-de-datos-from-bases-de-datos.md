# 0020. Split Fuentes de datos out of Bases de datos as its own CRM capability

Status: Accepted
Date: 2026-07-19

## Context

The data-source registry — which sources feed the organisation's data, who answers for each one, and its integration status — was a literal request from the SdLl 14-07 meeting ("hay que crear un listado de fuentes de datos"). It was first implemented (17-07) as a section *inside* the CRM's Bases de datos tab, below the table-of-tables.

With the CRM spread flat into the sidebar (ADR 0019), keeping the registry buried inside another tab contradicted the whole point of the spread: the sidebar should show the full management surface. Edu decreed it be separated into its own module-level capability.

Conceptually the two are also different things: **Bases de datos** describes the internal model (tables, records, cardinality — the destination), while **Fuentes de datos** describes the external world feeding it (Action Network, legacy spreadsheets, surveys — the origins) and the political work of integrating them.

## Decision

- New CRM tab id `fuentes`, present in every collective type's tab list (including Consumidores' reduced set), rendered by its own builder (`buildCrmFuentesHtml`) with the registry table.
- **Bases de datos keeps** the model tables and the JSON export, and points to the new tab in its intro text.
- Sidebar buttons: dynamic `crm-fuentes` for the five generalized types, static buttons for Trabajadores and the legacy coordination tab row.

## Consequences

- The 14-07 meeting request now has a first-class answer visible in every team's sidebar, instead of an easter egg inside another tab.
- The registry data still lives in the same seeded `sources` array of the CRM data (`getCrmData(...).sources`) — only the surface moved. A future real ingestion pipeline would populate that array; nothing else needs to change.
- Anyone following pre-19-07 instructions ("sources are under Bases de datos") will be redirected by the intro line left in that tab.
