# 0024. Abandon the ring model: access = relación × cargos × parte

Status: Accepted
Date: 2026-07-20

## Context

ADR 0014 kept four access rings (Visitante · Usuario · Afiliado · Militante) implicit inside the modules. Living with them through the v0.1.3 work surfaced the flaw, and Edu named it (20-07): the rings must not be explicit, and the fourth one isn't a ring at all — inside the organisation, access is a mosaic where **each position (puesto/cargo) sees certain things**. A single "militante" step both over-grants (every militante sees everything) and under-grants (no way to scope by responsibility). "El esquema de anillos en tanto que idea es limitante." The `SINDICAPP_FEATURE_REFERENCE` had warned exactly this: *access should follow responsibility, not only hierarchy* (§9, §12).

The full reasoning and the options considered live in `docs/plans/PROPUESTA-ACCESOS-200726.md`, approved by Edu on 20-07.

## Decision

Access derives from the **union of three independent sources**, and the ring vocabulary is dropped:

1. **Relación** — three linear stages of the person's bond: visitante → usuario → afiliada. The only surviving ladder. Governs which general surfaces exist for you.
2. **Responsabilidad** — the **cargos** you hold. Not a ladder: a set. Each cargo grants a bundle of **capacidades** (the CRM capabilities — the flattened `crm-*` buttons of ADR 0019 are the grant vocabulary) over an **ámbito** (territory, case type, commission, campaign, or whole-org for coordination). "Militante" stops being a role: it is the emergent state of holding ≥1 cargo. **The org chart (Estructura) is the permission system**: rotating a cargo rotates its access, and the per-cargo documento de funciones is the human-readable ACL.
3. **Parte** — what is yours by being part of the matter: your own case, documents, census data. Independent of stage and cargo (member self-service).

Chosen shape: cargo-based grants plus transversal ámbitos (options A+C of the proposal), with individual exceptions expressed only as **cargos ad hoc** with expiry — never as a person×capability matrix.

The implicitness doctrine of 0014 **survives**: no permissions page, no scheme diagram. Locks change meaning — from "requires role Militante" to *who carries this* ("esto lo opera el cargo X de la comisión Y") — and remain walk-through. The theory is user-facing only as a wiki article ("Quién ve qué") and as the capacidades visible on each cargo in Estructura.

## Consequences

- 0014 is **partially superseded**: its ladder (and the word "anillo" for level 4) goes; its implicitness stays. Code should migrate `militante` gates to capability checks and keep only the three relation stages in the role chips.
- The demo can model this today (archetype cargos with capacidades in localStorage); the real system later maps 1:1 — cargo records in the org's database instead of seeds.
- Search, onboarding and any future surface inherit a clear rule: public entities are searchable, gestión content never is; onboarding may ask about your *relación*, never about cargos.
- Naming debt: identifiers like `propuestaRoleAllows`/`PROPUESTA_RINGS` and copy keys with ring vocabulary survive in code for now; rename opportunistically, not in a big bang.
