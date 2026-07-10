# Doxa del rediseño experimental de SindicApp

*Documento de doctrina previo a tocar código. Rama experimental de UI/UX. Autor: Claude, bajo la tutela intelectual de Edu Collin. Julio de 2026.*

---

## 0. Propósito de este documento

Edu me ha encargado rediseñar la web de SindicApp hacia un estado más canónico, profesional y presentable, con una condición de contorno estricta: **no cambiar ni introducir funcionalidades**, y **no tocar la jerarquía de menús y submenús**, que fue concebida explícitamente y de la que él reclama la tutela (stewardship) intelectual e ideológica.

Este documento expone, antes de escribir una sola línea de código, mi lectura completa del proyecto: qué entiendo que es SindicApp, qué considero invariante, qué considero mandato de cambio, dónde veo zonas grises que no me corresponde resolver a mí, y cómo pienso trabajar. Si algo de lo que sigue contradice la intención original, este es el momento de corregirme: todo lo que no se objete aquí lo trataré como doctrina aprobada.

---

## 1. Mi lectura del proyecto

### 1.1 Qué es SindicApp

SindicApp nace en el texto fundacional (*SindicApp: com fer la revolució digital*, 2023) como hipótesis de una infraestructura organizativa para la clase trabajadora: «una cruïlla entre Infojobs, Facebook i Wikileaks». Su idea seminal es una sola: **cada empresa del territorio recibe automáticamente un perfil público**, y sobre ese perfil se montan las herramientas de coordinación — foro, denuncias anónimas, transparencia salarial, convenio, coordinación de huelga.

De esa idea derivan dos pilares que el propio manifiesto declara fundacionales:

**La geografía como pilar.** «El pilar sobre el qual es fonamentaria l'èxit de SindicApp rau en un ús innovador de la geografia.» El mapa no es una funcionalidad más: es el modo de acceso al mundo. La web actual honra esto — el mapa OpenStreetMap carga como fondo protagonista y la barra lateral flota sobre él como una consola. Esto es *geography-first* y es sagrado.

**La neutralidad como requisito único.** «L'únic gran requisit és que la plataforma en què se sustenti aquest moviment nou sigui completament neutral.» SindicApp no compite con CCOO, UGT o SIPTU; les ofrece infraestructura, igual que a cada trabajador individual. La palabra que el proyecto usa de sí mismo es exacta: *infraestructura neutral*.

### 1.2 Qué implica eso para un rediseño

De los dos pilares deduzco la tesis central de mi doxa estética:

> **La forma es parte del fondo.** Para una plataforma cuya premisa es que el trabajador estándar carece de una infraestructura «fiable, còmoda, fàcil d'usar i entendre», el acabado visual no es cosmética: es credibilidad. Una web que parece amateur comunica inseguridad, y la inseguridad es fatal para una plataforma que pide a la gente denunciar a su empresa. Profesionalizar la interfaz **es** ejecutar el manifiesto, no adornarlo.

El comentario crítico que acompaña al texto original apuntaba en dirección parecida («el formato foro... necesitaría una reinvención del formato a nivel de diseño/experiencia de usuario»), aunque Edu no suscribe necesariamente ese diagnóstico — y con razón parcial: el formato foro no está muerto (Reddit y compañía lo desmienten); lo que muere son los foros vacíos. El mandato de rediseño no depende de esa cita: se sostiene solo sobre la tesis anterior — reinventar la *presentación*, no el *contenido*.

### 1.3 El registro visual correcto

Si la plataforma es neutral, el diseño debe *leerse* como neutral. Eso descarta dos tentaciones opuestas:

- **La estética militante** (rojinegra, cartelería de agitación, tipografía de pancarta): traicionaría la neutralidad y ahuyentaría al trabajador no militante, que es exactamente el usuario que el manifiesto quiere captar («l'hegemonia neoliberal ha tornat moribund el clàssic esperit de lluita col·lectiva» — a ese individuo atomizado no se le recluta con simbología de partido).
- **El glamour de startup SaaS** (degradados violeta, ilustraciones 3D, tono de landing de venta): traicionaría la seriedad del propósito y olería a producto comercial, que es lo contrario de infraestructura común.

El registro que propongo es el de la **infraestructura cívica**: sobrio, institucional sin ser gubernamental, denso en información pero legible, con la dignidad tipográfica de un registro público y la calidez justa para no ser hostil. Referentes de tono: la cartografía pública, el diseño cívico tipo gov.uk / decidim, la Wikipedia bien maquetada. La plataforma debe parecer lo que dice ser: un *servicio público de facto*, construido por nadie en particular para todos en general.

---

## 2. Los invariantes (lo que no tocaré)

### 2.1 El foco ideológico

Intocables: la neutralidad de plataforma y la no sustitución de los sindicatos existentes; el enfoque *geography-first* con el mapa como protagonista y punto de entrada; el perfil automático de empresa como unidad atómica; el anonimato como principio en denuncias y salarios; la vocación de clase («infraestructura neutral para que la clase trabajadora se organice con herramientas geográficas compartidas»). Ningún texto de misión, manifiesto o disclaimer se reescribe sin aprobación explícita — como mucho propondré correcciones tipográficas, en diff separado y visible.

### 2.2 El conjunto de funcionalidades — congelación estricta

Regla operativa, que aplicaré como test antes de cada cambio:

> **Test de invariancia funcional:** ¿puede el usuario, tras el cambio, *hacer* algo que antes no podía, o *dejar de poder* algo que antes podía? ¿Cambia el contenido informativo, el vocabulario conceptual o el orden jerárquico de las secciones? Si la respuesta a cualquiera es sí, el cambio está fuera de mandato y no lo haré sin consulta.

*Enmienda 10-07-2026:* Edu aprobó en bloque las reformas R1–R8 de `REFORMAS-PROPUESTAS.md` y ordenó implementarlas; la congelación queda levantada exclusivamente para esas ocho reformas, implementadas a fidelidad de prototipo en esta misma rama experimental. Para todo lo demás, el test sigue vigente.

Quedan dentro del mandato: reestilizar, reespaciar, retitular *visualmente* (tamaño, peso, color — no palabras), reordenar *dentro de una misma pantalla* elementos sin jerarquía conceptual (p. ej. alinear botones), añadir estados vacíos, estados de carga, *focus states* y mejoras de accesibilidad. Quedan fuera: añadir secciones, fusionar pantallas, eliminar pasos, cambiar etiquetas de menú, alterar el orden de navegación, tocar la semántica de ningún flujo (denuncia, votación de huelga, moderación).

### 2.3 La jerarquía de menús — canon exacto

La registro aquí como está en el código hoy, porque es el contrato. El rediseño puede cambiar *cómo se ve* esta navegación (tipografía, iconos, espaciado, plegado), nunca *qué contiene ni en qué orden*.

**Portada:** selector de módulo con dos entradas, en este orden: **Usuario** · **Colectivo**.

**Módulo Usuario** — bloque «Tu empresa», secciones en este orden:

| # | ES | EN |
|---|----|----|
| 1 | Resumen | Overview |
| 2 | Localización | Location |
| 3 | Denuncias | Reports |
| 4 | Sueldos | Wages |
| 5 | Convenio | Agreement |
| 6 | Acción | Action |

**Módulo Colectivo** — subnavegación principal. *Enmienda 10-07-2026: con la aprobación de R8, el orden canónico pasa a ser* **Mapa · Empresas · Sectores · Foro · Sindicatos · Vivienda · Coordinación · Wiki**. *La tabla siguiente conserva el orden histórico original como registro:*

| # | ES | EN | Subsecciones (en orden) |
|---|----|----|--------------------------|
| 1 | Coordinación | Coordination | Estructura · Dinero · Objetivos |
| 2 | Wiki | Wiki | Índice · Normas |
| 3 | Sindicatos | Unions | picker → Overview · Forum · Structure · Companies |
| 4 | Vivienda | Housing | selector región → territorio (foro + alertas desahucio) |
| 5 | Mapa | Map | proveedor de mapa + selectores de territorio |
| 6 | Foro | Forum | General · Sectores · Territorios |
| 7 | Sectores | Sectors | árbol sector → subsector → foro/empresas |
| 8 | Empresas | Companies | picker → Localización · Resumen · Denuncias · Sueldos · Convenio · Acción |

El perfil de empresa en Colectivo abre en *Localización* mientras que Usuario abre en *Resumen*: confirmado por Edu como deliberado (§4.3); se conserva.

También son invariantes: el bilingüismo ES/EN con persistencia, el paradigma mapa-de-fondo + sidebar-consola, y los dos locales de demostración (Catalunya/España e Irlanda).

### 2.4 Los invariantes técnicos

Del CLAUDE.md del repo, que acato íntegro: aplicación estática sin backend; sin framework (no React, no Node en producción); *classic scripts* sin módulos ES, cargados en orden — no los convertiré; Vite solo como tooling; `localStorage` como persistencia de demo; Leaflet + OSM. Y la política de commits: **yo preparo, Edu commitea** — nada llega a git sin su mano, tampoco en la rama experimental.

---

## 3. El mandato de cambio (lo que sí haré)

Auditoría del estado actual, en frío: 4.980 líneas de CSS monolítico con tokens adoptados a medias (18 usos sueltos de `#ccc`, acentos ad-hoc `#ce1124`, `#5b21b6`, `#1a6b3c` fuera del sistema); tipografía base de 13px con escala 11–16px, densa hasta lo ilegible; 148 declaraciones de `border-radius` mayormente artesanales; emojis como sistema de iconos (👤✊📋📍💶); sidebar clavada en 300px exactos con 4–5 niveles de anidación dentro; solo dos media queries, ambas a 520px (no existe la tableta); el HTML por defecto mezcla inglés y español antes de que arranque el locale; logo JPEG en base64 incrustado en el markup.

Nada de esto es funcionalidad. Todo esto es mandato. En concreto:

**Sistema de diseño.** Un conjunto único de design tokens — paleta semántica completa (primario, superficie, texto, éxito/peligro/aviso), escala de espaciado, escala tipográfica (base 15–16px, jerarquía real de títulos), radios y sombras normalizados — y la migración de todo el CSS a esos tokens. Muerte a los hex sueltos.

**Iconografía.** Los emojis se mantienen por veredicto de Edu (§4.2). Sustituirlos queda fuera de mandato; como mucho, normalizar tamaño y alineación donde bailen.

**Legibilidad y respiración.** Subir el cuerpo de texto, abrir el interlineado y el espaciado vertical, dar a la sidebar un ancho fluido con mínimo digno, y presentar la anidación profunda con mejor artesanía (indentación clara, breadcrumb visual del nivel activo) — sin alterar un solo nivel de la jerarquía.

**Responsive real.** Introducir el tramo tableta y suavizar la transición sidebar/mapa en móvil. El paradigma de dos capas se conserva; solo se pule su mecánica.

**Accesibilidad.** Contraste AA, estados de foco visibles, `aria` correcto en la navegación, jerarquía de encabezados sana. Una plataforma para toda la clase trabajadora que no es accesible se contradice a sí misma.

**Higiene de código presentacional.** Componentizar el CSS por familias, unificar el idioma base del markup (que el DOM por defecto sea coherente y el locale haga el resto), sacar el logo a fichero. Sin tocar la lógica JS más que donde la presentación lo exija, y en diffs mínimos.

---

## 4. Zonas grises — resueltas por veredicto de Edu (10-07-2026)

**4.1 Los módulos latentes.** Son restos de un proyecto anterior del que se hizo fork para aprovechar el setup sidebar + fondo (formato que permitió trabajar a la vez en móvil y web). Veredicto: el árbol no expuesto (Partido, Colectivos, Agrupaciones, Candidatura) **puede desaparecer** de la rama experimental. Su eliminación queda dentro de mandato.

**4.2 Emojis vs. iconos.** Ambos aceptables en principio; veredicto final de Edu (10-07-2026, segunda ronda): **los emojis se mantienen** en esta versión.

**4.3 El orden de apertura divergente** (Usuario abre en Resumen; Empresa en Colectivo abre en Localización). Deliberado, con reservas del autor. Se conserva tal cual.

**4.4 El selector de idioma.** Estaba solo en portada por falta de espacio en la cabecera antigua, no por doctrina. Autorizado a resolverlo mejor: subirá a la cabecera si el nuevo diseño lo acomoda con dignidad; la portada puede conservar el suyo.

**4.5 El lore satírico de los datos de demo.** Veredicto: «no hace falta broma en esta próxima versión». Los datos de demostración se volverán sobrios en la rama experimental; el humor queda archivado en `main` y en `legacy/`.

---

## 5. Método de trabajo

Rama `experimental/redesign` desde `main`, creada y commiteada por Edu según la política del repo; yo preparo los cambios en el árbol de trabajo. Trabajaré por fases, cada una revisable por separado: (1) tokens y tipografía; (2) sidebar y navegación; (3) barrido de componentes (foros, perfiles de empresa, pickers, formularios); (4) responsive y accesibilidad; (5) pulido y microcopia *solo tipográfica*.

Al final de cada fase: verificación contra el canon — recorrido completo de la jerarquía de §2.3 confirmando que cada menú, submenú, etiqueta y orden sobrevive intacto; capturas antes/después; y el test de invariancia funcional de §2.2 aplicado al diff. La rama debe poder morir sin dejar huella: ese es el precio justo de la libertad experimental.

---

## 6. Definición de éxito

Que un desconocido que abra la web piense «esto es una infraestructura seria que ya existe», y que Edu, navegándola, no encuentre ni una funcionalidad nueva, ni una de menos, ni un menú movido de sitio — solo su misma criatura, mejor vestida.
