# 0023. Deep-merge the Catalan copy layer over Spanish

Status: Accepted (amends the merge strategy of 0018)
Date: 2026-07-18

## Context

ADR 0018 established Catalan as a language layer merged over Spanish with `Object.assign` — a **shallow** merge, with the stated rule "nested objects are translated whole or not at all". The full code check of 18-07 (F2 of the v4 report) showed why that rule is a trap: if the Catalan pack ever ships a nested object *partially* translated (say, three new keys land in `coordSubs` and the pack lags behind), the partial object replaces the Spanish one wholesale and every missing sub-key reads `undefined` — precisely the failure 0018's "never to `undefined`" promise was meant to exclude. The invariant held only as long as humans remembered to copy whole objects, and every new feature adds nested keys.

## Decision

Replace the shallow merge with a recursive `deepMergeCopy`: plain objects merge key by key (Catalan wins where present, Spanish fills the rest), arrays and scalars are replaced whole. The fallback promise — any untranslated key falls back to Spanish, never to `undefined` — now holds at every depth, mechanically.

This supersedes only the merge-strategy point of 0018; everything else there (two-concept locale split, `ca`→`es` dataset mapping, separate copy file, portada-only switcher) stands.

## Consequences

- Partial translation of nested objects is now a valid state, same as it always was for top-level keys. The CA pack can translate incrementally without ceremony.
- The merge builds new nested objects rather than sharing references with `COPY.es`, so mutating `COPY.ca` at runtime cannot corrupt Spanish (nobody does this today; now it also can't happen by accident).
- The ~175 inline `es ? … : …` ternaries flagged in 0018 are untouched by this — they remain the known gap for `ca` and still need migrating into `COPY` when touched.
