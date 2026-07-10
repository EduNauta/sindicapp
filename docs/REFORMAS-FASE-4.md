# Reformas Fase 4 — SindicApp

*Transposición del 10-07-2026 por veredicto de Edu: estas reformas de `REFORMAS-FASE-3.md` no se implementan de momento — «es la idea de que haya algo así, no que funcione, at this stage of development». Quedan aquí como hoja de ruta.*

---

## F4-1 — Foro de verdad *(era C3)*
Hilos con respuestas listadas, caja de responder y creación de hilo nuevo por ámbito (general/sector/territorio). Hoy el hilo abre una vista mínima de dos líneas, sin respuestas ni posteo. A este nivel de desarrollo basta con que la idea esté representada; la conversación real llegará con backend.

## F4-2 — IA demo menos monocorde *(era C5)*
La «Asistencia IA» de convenio responde siempre la misma frase enlatada. Se acepta como marcador de la idea: variar respuestas por palabra clave queda para cuando la asistencia sea real.

## F4-3 — Catalán *(era C9)*
Tercer locale `ca`. La arquitectura de locales ya lo permite (es/ie); es sobre todo trabajo de traducción. Políticamente relevante para el público del proyecto; se hará cuando el contenido se estabilice.

## F4-4 — Harness de QA como herramienta del repo *(era C10)*
Archivar el harness Playwright (navegador headless + servidor estático + pasos scriptados) en `tools/qa/` con smoke tests: carga sin errores de consola y jerarquía de menús intacta contra el canon (`old/DOXA-REDISENO.md` §2.3). Los scripts existen y funcionan — se usaron para el QA del 10-07 y la verificación de la fase 3.

## F4-5 — Export/import del estado demo *(era C11)*
Dos botones (exportar/importar JSON de `sindicapp-sindicato-state-v2`) para proteger demos presenciales ante un borrado de datos del navegador.

---

## Backend pendiente por naturaleza (heredado, sin fecha)

- **Verificación real** *(R5)* — el flujo demo de aval está completo; el garante sindical con backend es diseño institucional para la reunión del 14/7.
- **Datos registrales reales** *(R3)* — ingesta BORME/Registro Mercantil; la sección demo ya existe.
- **Búsqueda real de convenios** *(R1)* — el buscador demo por sector existe (fase 3); la búsqueda sobre el registro del BOE requiere servidor o dataset curado.
- **Fases 2–3 y 5 del método de la doxa** — sidebar/navegación, barrido completo de componentes y pulido de microcopia siguen siendo trabajo de rediseño incremental (de la fase 4 de la doxa se implementaron los básicos: foco visible, tramo tableta, sidebar fluida, reduced-motion).
