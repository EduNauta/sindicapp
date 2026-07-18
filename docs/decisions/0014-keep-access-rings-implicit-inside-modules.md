# 0014. Keep the access rings implicit inside the modules, not as a navigation layer

Status: Accepted
Date: 2026-07-17

## Context

`SINDICAPP_FEATURE_REFERENCE` insists that a union app must treat its data as sensitive by default and that **access should follow responsibility, not only hierarchy**: a militant covering one territory should not automatically see everything. The prototype had no such notion — everything was public demo data.

The first implementation of the rework took this literally and made the rings the *organising principle of the interface*: the navigation was rebuilt as four labelled boxes (Ring 0 Público, Ring 1 Personal, Ring 2 Afiliadas, Ring 3 Responsabilidad), with a global "Ver como" role selector and an explainer screen on top.

Edu rejected that shape in two steps, and the reasoning matters more than the outcome:

1. It **re-mixed** what he had deliberately separated: the union-type modules had just been split from the transversal tools into two boxes, and the ring layout dissolved that split again.
2. More fundamentally: *"no sé si es buena idea que la UI de la web gire explícitamente en base a esta distinción, más bien tendría que estar implícitamente integrada en los diversos módulos."* The rings are a property of the data, not a place you navigate to. He also removed the global role selector and the explainer screen: *"sabemos que la web tiene que ser así, pero es dentro de cada módulo que esto tiene que aparecer."*

A related correction from the same session set a standing rule: **normative content is Edu's to write, and norms belong implicit in the design, not in explanatory pages.** Two wiki articles drafted to state the ring doctrine and the Telegram-vs-forum rule were removed for this reason ("no bloat").

## Decision

- The navigation does **not** reflect the rings. It mirrors the module structure (see ADR 0017). The rings surface only as **locks and role-dependent content inside the modules where they apply**.
- Ring/role vocabulary is the same word for both: **Visitante · Usuario · Afiliado · Militante** (`PROPUESTA_ROLE_RANK`).
- **Locks are walk-through**: a module above your role still opens; the module itself renders a "this space is protected" panel that explains which role it needs and offers **contextual role chips** to switch. Role switching happens where the ring becomes visible — never in a global control.
- Each ring lives in the module it belongs to, rather than in a screen of its own:
  - *Usuario* is one module that gates as a whole and contains the personal ring completely (profile + "Mis casos y documentos" as one of its sections).
  - *Afiliado* appears as the Foro's **Interno** scope and as an embedded "Espacio interno — afiliadas" section in every collective directory.
  - *Militante* gates the CRM, which lives inside each equipo sindical (ADR 0015).
- The role simulator is a **demo device**, persisted in `localStorage`. Real auth would replace it; the doctrine it demonstrates would not change.
- No page explains the rings. The design is the explanation.

## Consequences

- There is no single place in the code that "shows the rings" — by design. `propuestaRoleAllows` and the per-module gates are the doctrine; `PROPUESTA_RINGS` survives only as data for a since-removed explainer and is now near-vestigial.
- Because locks walk through instead of blocking, a visitor can always discover *why* something is closed and elevate to see it. Without that, a demo with no global role switcher would be a dead end.
- The rule "normative decisions are Edu's, and norms go implicit in the design" applies beyond the rings: it is why there is no doctrine page for the forum-vs-Telegram split, and why the AI stance is a single bounded wiki article rather than a manifesto.
- If real accounts arrive, the gates are already in the right places; what changes is where the role comes from.
