# 0005. Keep the map as the primary navigation surface

Status: Accepted
Date: project inception; reaffirmed as an explicit invariant in the doxa redesign doctrine, 2026-07-10

## Context

SindicApp's core organizing idea is geography-first: every workplace should be discoverable and coordinatable by location first, rather than requiring users to already know which union, forum, or company page to look for. This is a navigation/information-architecture decision, not just a visual one — it shapes how every other feature is reached.

## Decision

The OpenStreetMap (Leaflet) map loads automatically as the interactive background the moment the page opens, and stays the primary navigation surface throughout the app. Company profiles, denuncias, salary transparency, convenio info, and forums are reached by clicking a pin or a territory on the map (or an equivalent map-linked list/picker) — not via a conventional top-level content menu that treats the map as one feature among several.

This is documented as an explicit invariant in the doxa redesign doctrine (`docs/plans/old/DOXA-REDISENO.md`) and was preserved through the fase 1–3 redesign work, including the removal of the dead duplicate "Map provider" UI block on 2026-07-10.

## Consequences

- Navigation and IA decisions default to "how does this connect back to the map," not a generic page hierarchy.
- Any future redesign that would demote the map from persistent background to an ordinary feature/tab needs its own ADR that explicitly supersedes this one — it shouldn't happen as a side effect of an unrelated UI change.
- Ties the project's technical navigation model directly to its stated mission (neutral, territorial coordination infrastructure — see `README.md`), which is worth keeping in mind before treating this as a purely aesthetic choice.
