# 0025. Accordion subnav: Sindicatos and Funcionalidades as exclusive groups

Status: Accepted
Date: 2026-07-20

## Context

Since ADR 0017 the subnav showed twelve buttons in two unlabeled boxes, both always visible: six collective types on top, six transversal tools below. It worked, but the sidebar carried all twelve at all times, and the reserved module id `sindicatos` had been an unreachable stub for three versions ("decidir su encaje o purgarlo" was an open structural decision in reports v4 and v5).

Edu resolved both at once (20-07): recover **Sindicatos** — not as a thirteenth module but as the *name* of the collectives group — and add **Funcionalidades** as the name of the tools group, turning the two boxes into a two-item accordion.

## Decision

- The subnav becomes **two named, mutually exclusive groups**: **Sindicatos** (Trabajadores, Profesionales, Inquilinos, Autónomos, Consumidores, Estudiantes) and **Funcionalidades** (Usuario, Mapa, Foro, Wiki, Sectores, Empresas). Clicking a group header expands it and collapses the other; the collapsed group shows only its header. Only six module buttons are visible at a time — the sidebar cleanup was the stated goal.
- The expanded group persists (`sindicapp-nav-group`, default `sindicatos`), and **auto-expands** to follow the active module regardless of how it was reached (nav click, global search, hash/history, onboarding).
- **Red Social stays off-nav** (header title), unchanged from 0017.
- The stub module id `sindicatos` remains reserved and unreachable; its *destiny* is resolved as the group name. The ComingSoon route can be purged in a later cleanup.

## Consequences

- Partially supersedes 0017: the "collectives first, both boxes visible" layout gives way to named accordion groups; the collectives-first ordering and the off-nav Red Social survive.
- One more click to cross between a colectivo and a herramienta. Accepted trade-off: the auto-expansion means deep links, search results and back/forward never strand the user in front of a collapsed group.
- The group names are now user-facing vocabulary ("Sindicatos" = the collective types, plural and concrete; "Funcionalidades" = the transversal surfaces). Future modules must pick a group — or argue for a third, which should be resisted.
