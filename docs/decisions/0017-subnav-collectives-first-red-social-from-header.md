# 0017. Subnav: collectives first, tools below; Red Social only from the header title

Status: Accepted
Date: 2026-07-17

Partially supersedes [0010](0010-flatten-module-hierarchy-eight-peer-modules.md) and [0012](0012-red-social-master-module-forum-split.md).

## Context

ADR 0010 flattened the module hierarchy into a single grid of peer buttons; by 17-07 that grid had grown to fourteen. Earlier the same day it was split into **two boxes** — transversal tools in one, the collective types in the other — which fixed the "everything is a peer of everything" problem but left three oddities:

- **Red Social** occupied a full-width button at the top of the collectives box, although it is not a collective: it is the app's home. Its landing was already reachable by clicking the **SindicApp** header title (ADR 0012), so the button was a second door to the same room.
- **CRM** sat among the tools, although ADR 0015 was about to dissolve it into each equipo sindical.
- The tools box sat **above** the collectives, which inverted the app's own thesis: the collectives are the subject, the tools are instruments.

Edu's instruction was direct: swap the two boxes; remove the Red Social button and reach its contents "únicamente a través de clicar en el botón principal SindicApp"; and leave the lower box as "Usuario Mapa Foro Wiki Sectores Empresas".

## Decision

- **The two boxes swap places**: the six collective types on top, the transversal tools below.
- **Red Social leaves the navigation.** It remains the default landing at boot and the destination of the header title (`#template-home-title`) — the home, reached the way homes are reached, not a peer button. Its internal sub id stays `feed`.
- **CRM leaves the navigation** (see ADR 0015). The tools box is exactly **Usuario · Mapa · Foro · Wiki · Sectores · Empresas**.
- The reserved-but-empty **Sindicatos** module stays out of the navigation; its id remains allowed in code, so reintroducing it is a markup change.
- The **portada** (the landing's background zone) was reworked in the same pass, since removing its button made it purely a home: a claim line stating the platform's premise, a strip of aggregate figures (combined membership, companies mapped, open reports, territories), the module panels split into **Colectivos** and **Territorio y empresas**, and the upcoming-agenda digest above the activity feed. This is also where a real gap surfaced: **Inquilinos was missing from the landing entirely** — five of the six collectives were shown.

## Consequences

- ADR 0010's "flat grid of peers" no longer describes the navigation; ADR 0012's "Red Social as master module" survives in substance (it is still the landing and the trunk into the modules) but no longer as a button. Both remain accurate about the id decisions they made — `feed`/`foro` naming in particular — which is why they are marked *partially* superseded.
- Twelve buttons in two boxes, from fourteen in one grid. Nothing became unreachable: the two removed buttons lead to places that are now reached through the header title (Red Social) and through each equipo (CRM).
- The landing's stat cards read from every module's demo data at render time, so it stayed correct as modules were added — except where a card was simply never written, which is exactly how Inquilinos went missing for a while. Worth re-checking the landing whenever a collective is added.
- Removing a button is only safe if the destination has another door. That check — "does this still have a way in?" — is the one to repeat before deleting any nav entry.
