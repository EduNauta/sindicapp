# Planes — SindicApp

*Hoja de ruta viva y de propósito general (antes `REFORMAS-FASE-4.md`, específico de una ronda de reformas de producto; ahora cubre también trabajo de ingeniería/proceso). Ordenada por procedencia. Nada de esto se implementa sin discusión previa.*

---

## Herencia del manifiesto (2023) y de `old/REFORMAS-PROPUESTAS.md`

### Datos registrales reales (BORME / Registro Mercantil)
*(era B5 / R3; raíz en el manifiesto: análisis del libro contable)*
La sección demo de datos registrales ya existe en el perfil de empresa; falta la ingesta real de fuentes públicas (constitución, administradores, cuentas depositadas). Backend o dataset curado por naturaleza. «Conoce las cuentas de tu empresa antes de negociar.»

### Verificación con backend real
*(era B6 / R5; raíz en el manifiesto: sindicatos anfitriones)*
El flujo demo de aval sindical está completo (niveles anónimo → persona → trabajador, sindicato garante). El diseño institucional y técnico del garante real es materia del grupo de «Diseño informático» del 14/7 y condiciona todo lo demás.

### Búsqueda real de convenios sobre el BOE
*(era parte de R1)*
El buscador demo por sector ya funciona (fase 3, B4); la búsqueda real sobre el registro del BOE/autonómicos requiere servidor o dataset curado. La curación de datos es el reto, no la ingeniería.

## Herencia de `old/DOXA-REDISENO.md` (método por fases)

### Fases 2, 3 y 5 de la doxa: navegación, componentes, microcopia
De la fase 4 de la doxa se implementaron los básicos (foco visible, sidebar fluida, tramo tableta, reduced-motion). Quedan: fase 2 (presentación de la anidación profunda de la sidebar — indentación clara, breadcrumb del nivel activo), fase 3 (barrido completo de componentes: foros, pickers, formularios) y fase 5 (pulido y microcopia solo tipográfica).

## Transpuestas de la fase 3 (veredicto 10-07-2026)

### Foro de verdad
*(era C3)*
Hilos con respuestas listadas, caja de responder y creación de hilo por ámbito (general/sector/territorio). Hoy el hilo abre una vista mínima; a este nivel de desarrollo basta con que la idea esté representada.

### IA demo menos monocorde
*(era C5)*
La «Asistencia IA» de convenio responde siempre la misma frase enlatada. Se acepta como marcador de la idea; variará cuando la asistencia sea real.

### Catalán
*(era C9)*
Tercer locale `ca`. La arquitectura ya lo permite (es/ie); es sobre todo traducción. Políticamente relevante; se hará cuando el contenido se estabilice.

### Harness de QA como herramienta del repo
*(era C10)*
**Implementado 2026-07-11** como CI: ver `.github/workflows/deploy.yml` (smoke test con Playwright, bloquea el deploy si falla) — ya no es un plan, es proceso activo.

### Export/import del estado demo
*(era C11)*
Dos botones (exportar/importar JSON de `sindicapp-sindicato-state-v2`) para proteger demos presenciales ante un borrado de datos del navegador.

## Propuestas de producto (10-07-2026, tarde — tras implementar la fase 3)

### Botón «compartir» en el perfil de empresa
Los deep links ya existen (`#sindicato-empresa:<id>:<sección>`, fase 3 C7); falta el gesto: un botón «copiar enlace» en el perfil y en el dossier territorial. Es la pieza que convierte el perfil público en herramienta de agitación práctica («mira las denuncias de tu empresa») y cuesta una tarde.

### Elegir tu empresa en el módulo Usuario
Hoy «Tu empresa» está clavada a Polígon Nord Logística. Un selector inicial («¿dónde trabajas?» sobre el picker/buscador ya existente, persistido en localStorage) haría el módulo Usuario creíble para cualquier visitante — y es el primer paso natural de cualquier onboarding.

### El mapa que cuenta el conflicto
Los pins son hoy uniformes. Con datos que ya existen (denuncias abiertas, % de apoyo a huelga), el mapa puede colorear o escalar los pins — un vistazo y sabes dónde arde el territorio. Es el pilar geography-first llevado a su consecuencia visual; puro Leaflet, sin backend.

### Comparador sectorial de sueldos
Cruzar las bandas salariales entre empresas del mismo sector («¿pagan mejor los almacenes de Girona que los de Zona Franca?»). Los datos demo ya existen por empresa y sector; es una vista nueva sobre datos viejos, con sinergia directa con la calculadora de convenio.

### Avisos de agenda
La agenda (R4) ya sabe qué votaciones y asambleas se acercan; nadie te lo dice. Un aviso discreto al entrar («votación de huelga en 3 días en tu empresa») usando el sistema de toasts de la fase 3. Sin backend: se calcula al cargar.

### Búsqueda global
Un buscador en cabecera que encuentre empresas, sindicatos, territorios e hilos a la vez. Hoy cada picker busca solo lo suyo; el usuario nuevo no sabe en qué sección vive cada cosa.

### Onboarding de primera visita
Tres pasos sobre el paradigma (mapa → perfil de empresa → herramientas), descartable y que no vuelva a aparecer (localStorage). La portada actual explica poco a quien llega de fuera; conecta con "Elegir tu empresa" arriba.

### PWA instalable
Manifest + service worker con caché básica: la app estática es candidata perfecta. Relevante para el uso real (móvil, en el tajo, con cobertura mala) y para la vía app-store de la agenda del 14/7 (asociación, NIF, D-U-N-S) — una PWA es la ruta barata mientras tanto.

### Modo oscuro
Con los tokens de la fase 1 centralizados, es redefinir variables bajo `prefers-color-scheme: dark` (más un toggle). Barato, y en línea con el registro de infraestructura cívica seria.

## Prácticas de ingeniería diferidas (2026-07-11)

Evaluadas junto con el resto del batch de "buenas prácticas profesionales" (commits convencionales, changelog, ADRs, CI, meta tags, CONTRIBUTING, Dependabot, SECURITY.md — todo eso ya implementado), pero descartadas por ahora por no compensar su fricción con un solo autor humano + asistencia de IA. Reconsiderar si se suman colaboradores reales (posible tras la reunión del 14/7).

### Linting (ESLint / Stylelint)
Impondría un estilo de código consistente automáticamente. Con una sola persona escribiendo/revisando el código, el beneficio es bajo frente a la fricción de configurarlo y mantenerlo al día.

### Pre-commit hooks (Husky + lint-staged)
Ejecutarían lint/formato automáticamente antes de cada commit. Solo tiene sentido una vez exista linting real que hacer cumplir; hasta entonces añade fricción sin beneficio claro.

### Flujo de revisión por Pull Request
Actualmente los cambios van directos a `main` (o a una rama experimental que luego se fusiona) por decisión explícita de Edu. Un flujo de PR con revisión formal tiene más sentido con varias personas contribuyendo — de momento la CI (smoke test) cumple el rol de red de seguridad automática.

### Automatización de releases (semantic-release o similar)
Generaría versiones y changelog automáticamente a partir de los mensajes de commit convencionales. Prematuro mientras las versiones se deciden a mano por lotes de trabajo (ver `docs/changelog/CHANGELOG.md` y las tags de git); revisar si el ritmo de cambios se acelera mucho.
