# 0021. Park all post-mock-up work until the prototype freezes

Status: Accepted
Date: 2026-07-18

## Context

`REPORT-MEJORAS-180726-v4.md` collected, alongside UI ideas implementable as demo, a set of ideas that only make sense with real implementation behind them: a working forum (replies, thread creation — pointless to fake without a backend holding collective state), PWA/offline (manifest + service worker + cache testing), data federation with Madrid, migration from Action Network, union email identity / SSO, and real ingestion of BORME/BOE data.

The prototype's job right now is to demonstrate the thesis and order the design conversation with SdLl — not to become a product. Building "real" features on fake foundations would fake persistence and trust that don't exist (especially bad for a forum that pretends to hold a community's writing), and would burn effort that the eventual grupo de informática should direct.

Edu decided (18-07): these are "de momento no necesarias".

## Decision

Everything requiring real implementation — backend, real data, real accounts — is **parked** in §5-bis of the v4 report and stays out of the working roadmap until the prototype is frozen. Parked as of this decision: real forum (idea 61), PWA/offline (62), federation between nodes (39), Action Network migration (40), identity/SSO (41), real BORME/BOE ingestion, and any replacement of demo seeds with live data.

The only survivor is idea 38 (CSV import), which has a legitimate **mock-up variant** — simulating column mapping on a local file — and was implemented as such.

## Consequences

- The roadmap stays honest: what remains in play is either demo-UI work or decisions (rings ADR, CRM parameterization).
- When the freeze comes, §5-bis is the ready-made backlog for the real-implementation phase, already argued item by item.
- The forum stays read-only meanwhile. Demo visitors will notice; that is preferable to faking a community.
