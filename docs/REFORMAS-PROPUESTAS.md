# Reformas propuestas — SindicApp

*Lista de cambios y reformas derivada de la evaluación holística del 10-07-2026, aprobada en lo general por Edu; cada punto se discutirá en concreto antes de implementarse. Importante: **ninguna de estas reformas entra en la rama experimental de rediseño**, que mantiene congelación funcional estricta (ver `DOXA-REDISENO.md` §2.2). Esto es hoja de ruta para después — y material para el grupo de «Diseño político» de la reunión del 14/7 (ver `AGENDA-REUNION-14-07-26.md`).*

Orden: por relación utilidad/riesgo, de más inmediata a más ambiciosa.

> **Estado (10-07-2026):** R1–R8 aprobadas en bloque por Edu e **implementadas a fidelidad de prototipo** (demo UI + localStorage, sin backend) en la rama `experimental/redesign`. Los apartados de backend real de R5 (identidad verificable) siguen pendientes por naturaleza.

---

## R1 — Convenio como punta de lanza (estrategia *single-player-first*)

**Qué.** Priorizar y engordar la sección Convenio: buscador del convenio aplicable, FAQ estructurado y, como pieza estrella, una **calculadora de convenio** («introduce tu categoría, jornada y salario → ¿te pagan según convenio?»).

**Por qué.** Es la única funcionalidad plenamente útil con un solo usuario: no necesita masa crítica, no tiene riesgo legal y responde a una ignorancia real y masiva. Es la respuesta estructural al mayor riesgo del proyecto (la plaza vacía): la gente viene por el convenio y se queda por la coordinación. Principio general derivado: **toda funcionalidad útil en soledad va antes que toda funcionalidad que exija comunidad.**

**Coste/riesgo.** Bajo. Los convenios son públicos (BOE/autonómicos); el reto es curación de datos, no ingeniería.

## R2 — Puente institucional en Denuncias

**Qué.** Que cada flujo de denuncia termine ofreciendo la pasarela al canal oficial pertinente: Inspección de Trabajo (ITSS), canal de whistleblowing interno obligatorio (Directiva UE 2019/1937), autoridad de protección de datos, etc., con guía práctica de cómo usarlos.

**Por qué.** Da dientes reales a la sección (una denuncia pública desahoga; una denuncia a la ITSS obliga) y, paradójicamente, **reduce** la exposición legal de la plataforma: SindicApp pasa de tribunal paralelo a señalizador hacia los cauces legales. Responde directamente al riesgo de difamación señalado en el comentario crítico del manifiesto.

**Coste/riesgo.** Bajo. Es contenido + enlaces + UX, no backend.

## R3 — Datos registrales en el perfil de empresa (BORME / Registro Mercantil)

**Qué.** Sección de datos objetivos por empresa a partir de fuentes públicas: constitución, administradores, cuentas depositadas, y donde sea posible ingresos/EBITDA. Lema: «conoce las cuentas de tu empresa antes de negociar».

**Por qué.** Ya estaba en el manifiesto original (análisis del libro contable). Sustituye especulación por datos verificables, alimenta la negociación salarial (sinergia con Sueldos y con la Directiva de Transparencia Salarial, transpuesta en 2026), y da al perfil automático contenido valioso desde el día cero — otra pieza *single-player*.

**Coste/riesgo.** Medio: el BORME es abierto pero áspero; las cuentas del Registro son de pago. Empezar por lo gratuito.

## R4 — Agenda: la capa temporal

**Qué.** Un calendario/agenda como ciudadano de primera: asambleas, votaciones y sus plazos, fechas de huelga, hitos de negociación. Vistas por empresa (dentro de Acción), por sector y por territorio.

**Por qué.** El mapa resuelve el espacio; el tiempo no está resuelto. El manifiesto ya pedía una «agenda d'objectius». La coordinación es, al final, quedar: sin capa temporal, las herramientas de acción colectiva quedan flotando en un presente perpetuo.

**Coste/riesgo.** Medio. Afecta a varias secciones; conviene diseñarla una vez y reutilizarla en todas.

## R5 — Verificación como arquitectura (sindicatos como garantes)

**Qué.** Convertir «Trabajadores verificados» de insignia a arquitectura: niveles explícitos de confianza (anónimo → verificado como persona → verificado como trabajador de la empresa X), y extender la idea ya presente en el manifiesto — sindicatos como anfitriones de salas privadas — un paso más: **sindicatos como garantes de identidad** que avalan que alguien trabaja donde dice trabajar.

**Por qué.** Es el problema existencial de la plataforma (astroturfing empresarial, bots, contenido sintético), agravado desde 2023. La solución del garante sindical además da a los sindicatos un papel estructural dentro de la app sin romper la neutralidad: todos pueden ser garantes, ninguno es dueño.

**Coste/riesgo.** Alto: es diseño institucional, no solo código, y requiere backend real. Diseñarlo pronto (aunque se implemente tarde) porque condiciona todo lo demás — encaja con el grupo de «Diseño informático» del 14/7.

## R6 — Sindicatos: de prestigio votado a implantación verificable

**Qué.** Sustituir (o subordinar) la puntuación de prestigio comunitario por datos objetivos: implantación por empresa y sector, delegados, resultados electorales, convenios firmados. Si se conserva algo reputacional, que sea testimonio estructurado, no nota numérica.

**Por qué.** Puntuar instituciones invita a guerras de reseñas entre partidarios (CCOO vs UGT vs CNT) y convierte a la plataforma en árbitro de una rivalidad sobre la que se declaró neutral. Es la única funcionalidad actual que amenaza la neutralidad desde dentro. Datos verificables informan igual sin arbitrar.

**Coste/riesgo.** Bajo en código, delicado en política: es quitar algo. Merece discusión aparte.

## R7 — Vivienda: perfil automático de edificio (y la generalización del motor)

**Qué.** Que Vivienda herede la lógica fundacional de la app: **perfil automático por edificio/finca y por gran tenedor**, con sus equivalentes de denuncias (estado del edificio, prácticas del casero), transparencia (rentas por zona, referencia del índice de precios), «convenio» (contrato de alquiler, LAU, guía de derechos) y acción (huelga de alquileres, resistencia a desahucios).

**Por qué.** Hoy Vivienda es funcionalmente decorativa porque su unidad atómica no es la empresa. Pero la tesis profunda es que el motor de SindicApp generaliza: *perfiles automáticos de entidades territoriales + herramientas de coordinación*. Empresa, edificio, campus, mercado — de ahí salen los «Tipos de Sindicato» de la agenda del 14/7 (laborales, inquilinos, consumidores, estudiantes). **Con la reunión del Sindicat de Llogateres, esta reforma pasa de hipotética a estratégica: Vivienda puede ser el primer despliegue real de la plataforma.**

**Coste/riesgo.** Alto (es casi una segunda app), pero reutiliza el 80% del diseño existente. Candidata natural a eje del hackathon previsto en la 3ª reunión.

## R8 — Rejerarquización del módulo Colectivo

**Qué.** Reordenar la subnavegación según el viaje del usuario — territorio → empresa → sector → conversación → instituciones → sala de máquinas: **Mapa · Empresas · Sectores · Foro · Sindicatos · Vivienda · Coordinación · Wiki** (hoy: Coordinación · Wiki · Sindicatos · Vivienda · Mapa · Foro · Sectores · Empresas).

**Por qué.** El orden actual abre con las secciones más introspectivas y entierra el alma geográfica de la app (Mapa 5º, Empresas 8ª). Es la única disidencia mía con el canon; la jerarquía es tutela de Edu y esta reforma solo procede con su bendición explícita.

**Coste/riesgo.** Trivial en código, máximo en doctrina. Última de la lista a propósito.

---

## Encaje con el marco de la reunión del 14/7

Bajo el esquema de los cuatro vetos, esta lista se somete así: R1–R4 difícilmente chocan con ningún veto; R5 vive bajo el veto técnico y legal (diseño de identidad); R6 y R8 viven bajo el **veto ideológico** — que es de Edu — y no se mueven sin él; R7 es la que conecta SindicApp con el Sindicat de Llogateres y con la distinción intranet (CRM sindical) / extranet (red ciudadana): el perfil automático de entidad es la pieza compartida entre ambas.
