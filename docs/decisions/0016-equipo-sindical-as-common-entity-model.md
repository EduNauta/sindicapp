# 0016. "Equipo sindical" as the common entity model, with sections grouped Perfil / Acción / Gestión

Status: Accepted
Date: 2026-07-17

## Context

The six collective modules had grown independently and were shaped differently. **Trabajadores** listed unions and gave each a section nav (Resumen · Foro · Estructura · Empresas). **Profesionales, Consumidores** and **Estudiantes** listed entities but rendered them as single-page profiles with no sections. **Autónomos** listed *platforms* — the actors, not the organised teams — and its self-employed unions existed only as a flat list of names. **Inquilinos** had no directory at all: it was a national module with five loose tools (Huelgómetro, Alarmas, Tenedores, Calculadora, Asambleas).

This mattered because ADR 0015 made the CRM reachable only from inside a team. A type without teams had no way in.

Edu introduced the vocabulary and the requirement in one sentence: *"cada equipo sindical seleccionado ha de tener sus botones… En Trabajadores, cualquier equipo sindical tiene Resumen Foro Estructura Empresas. Ahí es donde falta el CRM. Los otros tipos no están teniendo nada de eso, aplica también."* For Inquilinos he was explicit that everything should converge before the layout is settled: *"necesita un directorio de entidades como el resto… hay funcionalidades aleatorias… y luego las funcionalidades del CRM. Todo se ha de juntar. No sé muy bien cómo de momento, pero lo suyo sería primero tenerlo todo junto y luego decidir UI."*

## Decision

- **"Equipo sindical" is the common noun** for the selectable entity of every collective type. Each type has a directory of equipos, and each equipo has a section nav in the sidebar.
- Every type that lacked one gained a directory of real teams:
  - **Autónomos**: the self-employed unions (RidersXDerechos, Conductors Units VTC, Coordinadora Freelance, Sindicat de Periodistes; CATU-style equivalents in EN) become first-class selectable equipos with their own profiles, sitting above the platforms, which remain browsable as *actors*. A single id space resolves to either.
  - **Inquilinos**: since no single tenants' union exists, the directory is **one per territory** — Sindicat de Llogateres i Llogaters (Catalunya, the default), Madrid, País Valencià, Euskadi, Andalucía; CATU Dublin/Cork/Galway in EN.
- **The section nav is rendered per type** (`buildEquipoSectionNavHtml` / `EQUIPO_SECTION_GROUPS`), not a fixed strip, so a type can carry its own sections and its own labels. Inquilinos calls "Empresas" **Propietarios**, because its counterpart actors are landlords.
- **Inquilinos' loose tools become sections of the equipo**: Huelgómetro, Alarmas, Calculadora and Asambleas move out of a module-level subnav (now permanently hidden) and into the team, next to the common sections. This is the "todo junto" step.
- **Sections are grouped into three blocks** with small labels — **Perfil** (Resumen, Foro, Estructura, Empresas/Propietarios), **Acción** (the tools; only Inquilinos has them today) and **Gestión** (CRM). The flat section list is **derived from the groups**, so grouping cannot silently drop a section; a test compares the resulting set against the pre-grouping one.
- Every type's directory is also reachable from a **sidebar picker** (search + select), matching the Trabajadores pattern.

## Consequences

- One vocabulary and one interaction shape across six heterogeneous collectives. The cost is a deliberate conceptual stretch: in Trabajadores the entity *is* a union, while in Profesionales, Consumidores and Estudiantes it is a college, a product or a campus — an actor that a team organises *around*, not the team itself. Autónomos now models both explicitly; the other three do not yet, and that is the clearest unfinished edge of this decision.
- Inquilinos' nine sections in one sidebar is a lot, and the grouping is a first pass at taming it. Two names now collide inside that module: **Asambleas** as a public listing (Acción) and **Asambleas** as the CRM's moderation tool (Gestión). They are different objects and will need renaming or merging.
- Because the section nav is re-rendered by JS and lives outside the workspace, it needs its own event delegation — this was learned the hard way when the buttons shipped dead (clicks were only handled on the workspace element). Any future JS-rendered nav outside `#map-text-display` has the same requirement.
- The "everything together first, layout later" instruction is honoured literally: the current arrangement is explicitly a staging point, not a settled design.
