# 0011. Vivienda (housing) is a new module, distinct from Territorios

Status: Accepted
Date: 2026-07-13

## Context

ADR 0007 renamed the old "Vivienda" section to "Territorios" and demoted housing (eviction alerts, tenant pledges, building profiles) from a top-level section to one card inside each territory's profile — deliberately keeping the internal sub id `vivienda` for that section even though its visible label became "Territorios".

Separately, the 2026-07-13 module-picker reform (see the "Added" entry for placeholder modules in the changelog) introduced a *ninth*, disabled placeholder button labelled "Vivienda" with the internal id `housing` — a deliberately new and different concept from Territorios: a platform-wide tenant-organising module, not a per-territory profile. At that point it was inert (`template-module-btn--soon`, no view wired up).

Edu then asked to build it out with two features: a **Huelgómetro** (a national tenant-strike meter, modelled on the existing per-company strike meter but counting absolute pledges — not a percentage — towards a fixed goal of 1,000,000) and a national **eviction alert panel** aggregating every territory's alerts in one feed (until now, alerts were only visible per-territory or per-building).

This creates an unavoidable naming collision: the app now has two things a Spanish-speaking user would call "Vivienda" — the Territorios section (internal id `vivienda`, ADR 0007) that folds housing into a broader territory profile, and this new module (internal id `housing`) that is specifically about housing/tenant organising at a national scale. The realistic options were: (a) give the new module a different visible label to avoid confusion (e.g. "Inquilinos"); (b) merge the new features into the existing Territorios section instead of a new module; (c) keep both as "Vivienda" in the UI, accepting the collision, because the internal ids are already different and stable.

Option (b) was rejected because the two things operate at different scopes by design — Territorios is inherently per-territory (you pick a comarca/municipio first), while the Huelgómetro and the aggregated alert panel are deliberately *not* scoped to a territory; they're platform-wide tallies. Cramming them into the Territorios profile would mean either duplicating them in every territory page or bolting a scope-less feature onto a scope-first section. Option (a) was rejected because Edu explicitly asked for the label "Vivienda" for this module and it is not this ADR's place to override that; the risk is the same kind of pre-existing mismatch ADR 0007 already normalized (a label that doesn't 1:1 match its internal id, or here, two labels that collide) — worth writing down, not worth avoiding at the cost of not doing what was asked.

## Decision

Option (c): both sections can be labelled "Vivienda" in Spanish (EN: Territorios stays "Territories", the new module reads "Housing"). They are kept fully separate in code:

- **Territorios** — internal sub id `vivienda` (unchanged since ADR 0007). Per-territory profile: companies, housing card (eviction alerts + agenda + buildings, scoped to that territory), forum, social links.
- **Vivienda / Housing** — internal sub id `housing` (newly wired up, was previously an inert placeholder). Two flat sub-tabs, no territory picker: **Huelgómetro** (`huelgometro`, default) shows a national tenant-pledge count against a fixed 1,000,000 threshold, reusing the `.sindicato-strike-meter` visual pattern from the per-company strike meter but with an absolute count instead of a percentage, plus a pledge button persisted in `localStorage` (`state.housingPledges`, demo baseline `HOUSING_STRIKE_BASE` per locale so the counter doesn't start at zero); **Alarmas** (`alarmas`) shows every eviction alert from every territory in one feed, via a new `getAllViviendaAlerts(locale)` that flattens the existing per-territory `VIVIENDA_ALERTS` dataset and attaches each alert's territory name — the underlying alert data is not duplicated, only aggregated for display.

No shared state or code path between the two beyond reusing the existing `VIVIENDA_ALERTS` dataset (read-only, for the aggregate view) and the strike-meter CSS classes (visual reuse only).

## Consequences

- Anyone searching the codebase for "vivienda" will find two unrelated things: the `vivienda` sub (Territorios) and the `housing` sub, plus shared literal Spanish text "Vivienda" in both UIs. Always check the `data-sindicato-sub` value, not just the visible label, when tracing a bug report that mentions "la sección de Vivienda."
- The two sections' eviction-alert views can drift: today `getAllViviendaAlerts` reads from the same `VIVIENDA_ALERTS` object the territory profile already reads via `getViviendaAlerts`, so they can never disagree — but if a future change adds alerts that should only appear in one view (e.g. draft/unverified alerts), that distinction will need a new field, not two separate datasets.
- The Huelgómetro's 1,000,000 threshold and per-locale baseline (`HOUSING_STRIKE_BASE`) are hardcoded demo numbers, same category as the per-company strike meter's fixed 55% threshold — a future real backend would replace both with live counts, not configuration.
- If a future contributor wants to eliminate the naming collision, that requires a deliberate rename decision (superseding this ADR), not a quiet label tweak — the same rule ADR 0007 already established for `vivienda`/Territorios.
