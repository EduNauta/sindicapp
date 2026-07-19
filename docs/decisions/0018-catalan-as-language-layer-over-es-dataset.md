# 0018. Add Catalan as a language layer over the `es` dataset, not a third dataset

Status: Accepted (merge strategy superseded by 0023)
Date: 2026-07-17

## Context

SindicApp had two locales, `es` and `ie`, and the codebase treated "locale" as a single concept: `localeKey(locale)` returned `'es' | 'ie'` and *everything* keyed off it — UI copy (`COPY`), demo datasets (companies, unions, territories, professional bodies, tenants' unions, CRM seeds, the ring/CRM demo data), map centre, boundary layers, nav packs.

Catalan had been deferred in `docs/plans/PLANES.md` on the grounds that it is "mostly translation" and should wait until the content stabilises. Edu decided to do it now, together with removing the header language switcher so that only the portada's remains.

The naive implementation — a third value everywhere — would have meant duplicating every dataset: thousands of lines of demo content, and three copies to keep in sync on every future change. That is obviously wrong here for a specific reason: **`ca` and `es` describe the same territory.** The Spanish locale is already Catalunya-centric — Barcelona, the 42 comarques, Sindicat de Llogateres, Col·legi de Metges de Barcelona, Polígon Nord. Many of its entity names are already Catalan. What changes between `es` and `ca` is the *language of the interface*, not the *world being described*.

## Decision

- **Split the single "locale" concept in two**, which the code had been conflating:
  - `localeKey(locale)` resolves the **dataset region** and still returns only `'es' | 'ie'`; `'ca'` maps to `'es'`. Every dataset lookup keeps working untouched.
  - `copyKey(locale)` resolves the **UI language** and may return `'ca'`. `t()` uses it.
- **Catalan copy lives in its own file**, `js/sindicapp-locale-ca-copy.js`, loaded before `sindicapp-sindicato.js`, which merges it **over** Spanish: `COPY.ca = Object.assign({}, COPY.es, window.SINDICAPP_COPY_CA)`. Anything not translated falls back to Spanish — **never to `undefined`**. Nested objects are translated whole or not at all, since the merge is shallow by design.
- A matching nav pack `js/sindicapp-locale-ca-content.js` (`window.SINDICAPP_CA`) provides module/section labels, mirroring the `es`/`ie` packs.
- `LOCALE_CONFIG.ca` reuses the Spanish map centre and boundary pre-checks, changing only `htmlLang`. The body class becomes `sindicapp-locale-ca`.
- **The header language switcher is removed**; the portada's switcher is the only one, now with three buttons (CA · ES · EN) and a *senyera* flag icon.
- Coverage at the time of writing: **381 of 486 copy keys** translated, including every module title and intro, all section and tab labels, the CRM vocabulary, the ring/role vocabulary, the housing tools, the portada, and the wiki articles in full. The remainder — long-tail strings and the demo *content* itself (case titles, forum threads, intake entries) — stays Spanish.

## Consequences

- Adding a language is now cheap: one copy file plus one nav pack, no dataset work. Adding a *region* remains expensive, as it should be, because it means a genuinely new world of data.
- The fallback makes partial translation a valid state rather than a bug. A missing Catalan key degrades to Spanish silently; nobody sees an empty label. The flip side is that untranslated keys are invisible — the count above is the honest measure, and a future pass should re-measure rather than assume completeness.
- **Inline ternaries are the known gap.** Roughly 175 places build small strings with `const es = locale === 'es'` or `es ? '…' : '…'` instead of reading `COPY`. Under `ca` these evaluate as *not Spanish* unless they go through `localeKey`, so short labels like "respuestas"/"replies" or "Vacío"/"Empty" can surface in the wrong language. They were left alone deliberately: rewriting 175 call sites carries more regression risk than the benefit, and the right fix is to migrate those strings into `COPY` incrementally.
- The demo content stays Spanish under `ca`, which is defensible for a prototype (the entities are real Catalan organisations with Catalan names anyway) but would be odd in production. Translating content, not just chrome, is a separate job.
- Removing the header switcher means the language can only be changed from the home. That is consistent with ADR 0017's logic — the home is where global choices live — but it does mean a user deep in a module must return home to switch.
