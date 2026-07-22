# 0029. Open the demo as Coordinación general by default

Status: Accepted
Date: 2026-07-22

## Context

ADR [0024](0024-abandon-rings-access-is-relation-cargos-parte.md) made access `= relación × cargos × parte`, with the locks kept implicit inside the modules (ADR [0014](0014-keep-access-rings-implicit-inside-modules.md)). The code defaults for a **fresh browser** were relación `visitante` + cargo `ninguno` — the most locked-down view, where most gestión screens render informative locks.

That is the truthful default for a real anonymous visitor, but it is the wrong first impression for what the prototype is *for right now*: showing the whole surface in a meeting or demo, where landing on a wall of locks buries the very features being pitched. Edu asked that, for now, the web open as if the person were part of the general coordination.

The realistic options were: force coordinación on **every** load (overriding any stored choice); leave the locked default and rely on the "Ver como" simulator to climb up; or change only the **default-when-absent** to coordinación while still respecting an explicit stored choice.

## Decision

When there is **no stored value**, the demo now defaults to relación **`afiliado`** + cargo **`coordinación`** (which `cargoAllows()` grants everything), so a fresh browser opens with every section visible and no locks. An explicitly stored role/cargo is still respected; "Reiniciar datos demo" clears the keys and returns to this default.

This is a **demo-stance decision, not a change to the access model**. ADR 0024 stands untouched — the three-stage ladder, the cargos, `cargoAllows()` and the informative locks are all unchanged; only the starting point moves from the bottom of the ladder to the top.

## Consequences

- A returning browser that already stored `visitante`/`ninguno` from earlier testing **keeps that state** and still sees locks until "Reiniciar datos demo" (or a clean browser). This is intentional: the default does not clobber a choice the user made on purpose.
- The "Ver como" simulator and the informative locks remain the way to *demonstrate* the access model — you now step **down** from coordinación to reveal a lock, rather than **up** from visitante to reveal a screen.
- This is trivial to reverse (two fallback literals in `sindicapp-main.js`) and therefore trivial to reverse **by accident**; it is recorded here so a future contributor doesn't "fix" the defaults back to `visitante`/`ninguno` without knowing it was deliberate for the demo phase.
- When the app reaches real accounts and auth (the ADR [0021](0021-park-post-mockup-work-until-prototype-freezes.md) moratorium), this demo default disappears: real relación and cargo will come from the account, not from a `localStorage` fallback.
