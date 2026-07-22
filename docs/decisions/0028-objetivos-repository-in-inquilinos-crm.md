# 0028. Add an Objetivos repository to the Inquilinos CRM

Status: Accepted
Date: 2026-07-22

## Context

The CRM capabilities so far (ADR [0006](0006-turn-coordination-into-a-multi-union-crm.md) / [0015](0015-dissolve-crm-module-into-each-equipo-sindical.md) / [0019](0019-spread-crm-capabilities-flat-in-team-sidebar.md)) track *members' cases* — individual conflicts routed through intake, casos and asambleas. But a tenants' union also has *its own* collective goals — stop evictions with no housing alternative, win a rent agreement with a large landlord, reach N affiliated households — that are not any single member's case and have nowhere to live in the existing tabs. Edu asked for a place to track the organization's own objectives, GitHub-issues style.

The realistic options were: fold goals into **Campañas** (but a campaign is a mobilisation drive with a support counter, a different object with a different verb); add a generic new tab to **every** collective type at once; or add one focused capability to the single type that asked for it first.

## Decision

Add **Objetivos**, a new `crm-*` capability, **to Inquilinos (`housing`) only for now**. It is a repository of the organization's collective goals in a GitHub-issues idiom: each objective carries an open/achieved status, a priority, labels, a responsible commission, a milestone, a target date, a progress bar and an update count. Open objectives list first, achieved ones below; a per-objective button marks it achieved or reopens it, mutating the persisted CRM runtime exactly as the other CRM actions do.

Because it is housing-only, `housing` gets its own tab list (`CRM_HOUSING_TABS`) instead of pointing at `CRM_ALL_TABS`, and the capability slots into the **Impulsar** sub-group of ADR [0026](0026-order-gestion-by-organizing-flow.md) — what the organization pushes toward. Its seed data is user-owned runtime state (`crmSeedObjetivos`), lazily back-filled for CRM runtimes persisted before this change.

## Consequences

- Objetivos is the **first CRM capability scoped to a single collective type**. Extending it to another type is a one-line addition to that type's tab list, plus type-flavoured seeds if wanted — but it is a deliberate per-type choice, never automatic.
- It respects ADR 0026's discipline: a new capability picks one of the four flow groups (Impulsar) rather than inventing a fifth.
- Objectives are organization-level, so no cargo archetype owns the `objetivos` capability and `cargoForCapability('objetivos')` resolves to **Coordinación**; by default only a cargo that grants everything (Coordinación) opens it. A future type-specific commission could claim it through its Estructura seed's `capacidades`.
- Like every CRM screen it is demo state in `localStorage` (ADR [0003](0003-avoid-backend-store-demo-state-in-localstorage.md)): the repo fakes no shared persistence: it is a visual specification of the capability, to be backed by real data at the product phase (ADR [0021](0021-park-post-mockup-work-until-prototype-freezes.md)).
