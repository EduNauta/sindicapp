# Reformas Fase 3 — SindicApp

*Derivado del QA sweep completo del 10-07-2026 (navegador headless, todas las secciones y flujos de ambos módulos) más la herencia no implementada de `old/DOXA-REDISENO.md` y `old/REFORMAS-PROPUESTAS.md`.*

***Actualización 10-07-2026:** Edu aprobó implementar todo salvo C3, C5, C9, C10 y C11, que pasan a `REFORMAS-FASE-4.md`. Lo aprobado está **implementado y verificado** con el harness de QA (cero errores de consola en la re-verificación). Este documento queda como registro: cada punto lleva su estado.*

**Resultado global del QA original:** la app cargaba sin un solo error de consola JS en todo el recorrido; las ocho reformas R1–R8 presentes y operativas a fidelidad de prototipo. Tres hallazgos del sweep resultaron ser falsos negativos del navegador headless, corregidos abajo.

---

## A. Bugs

### A1 — Enviar denuncia desde módulo Usuario dejaba la vista en blanco 🔴 → ✅ ARREGLADO
El dato se guardaba pero el workspace moría tras «Enviar a moderación». Causa: el handler llamaba a `syncSindicatoWorkspace()` (renderer de Colectivo) en vez de `syncTextWorkspace()` (dispatcher). Arreglado en `sindicapp-main.js`; verificado: la cola pasa a Pendiente (1) en la misma vista, con toast de confirmación.

### A2 — Votar huelga desde módulo Usuario dejaba la vista en blanco 🔴 → ✅ ARREGLADO
Idéntico patrón y misma corrección. Verificado: la vista sobrevive al voto.

### A3 — Un voto disparaba el apoyo a huelga de 52% a 100% 🟠 → ✅ ARREGLADO
`castStrikeVote()` ahora siembra el contador con el baseline demo (52% → 52 sí / 48 no) al primer voto real; un voto individual mueve el porcentaje de forma creíble (52% → 52%). De paso, el Resumen ahora usa `getStrikeSupportPct()` en lugar del baseline crudo, así ambas secciones cuentan lo mismo.

### A4 — «Add Border Set» parecía botón muerto 🟠 → ⚪ FALSO NEGATIVO
Funciona vía `prompt()` nativo, que el navegador headless auto-cancela (por eso el QA vio «sin efecto»). Es UX tosca de la herencia Cartagrama (extracto verbatim, no se toca), y «➕ Custom Border Sets» cubre el mismo caso con formulario propio. Sin cambio.

### A5 — Añadir empresa: validación sobre controles ocultos 🟡 → ✅ ARREGLADO
`novalidate` + validación JS propia con aviso («Nombre y dirección son obligatorios»); toast de confirmación al crear. Las coordenadas ya eran editables en el formulario (lat/lng); la geocodificación real queda para cuando haya backend.

### A6 — «Solicitar aval sindical» sin sindicato no respondía 🟡 → ⚪ FALSO NEGATIVO (+ red de seguridad)
El select tiene `required` y en un navegador real `reportValidity()` muestra el aviso nativo; el headless lo silenciaba. Se añadió igualmente un toast de respaldo para navegadores sin validación nativa.

---

## B. Herencia de los documentos archivados

### B1 — Fases 2–5 del método de la doxa → ✅ BÁSICOS DE FASE 4 IMPLEMENTADOS
Añadidos: estados de foco visibles (`:focus-visible`), sidebar de ancho fluido con mínimo digno (antes 300px clavados), tramo tableta (768–1100px), ajuste móvil y `prefers-reduced-motion`. Las fases 2, 3 y 5 completas (navegación, barrido de componentes, microcopia) siguen en `REFORMAS-FASE-4.md`.

### B2 — Selector de idioma en la cabecera (doxa §4.4) → ✅ IMPLEMENTADO
ES/EN compacto en la cabecera, visible desde cualquier módulo; la portada conserva el suyo. El binding existente por clase lo recoge sin JS nuevo.

### B3 — Higiene del markup → ✅ IMPLEMENTADO
Logo extraído de base64 a `assets/sindicapp-logo.jpg` (index.html pasa de ~190 KB a ~116 KB; `vite.config.js` copia `assets/` a `dist/` — build verificado). Defaults visibles del shell unificados a español (el runtime repinta por locale; el panel Cartagrama queda verbatim). `<html lang>` ya era dinámico.

### B4 — R1 restante: buscador de convenio + FAQ estructurado → ✅ IMPLEMENTADO (demo)
«¿Qué convenio me aplica?»: directorio demo por sector con ámbito, vigencia y enlace al registro oficial (BOE / WRC). FAQ ampliado con cinco preguntas estructuradas por locale. La búsqueda real sobre el BOE queda en fase 4 (backend por naturaleza).

### B5 — R3: datos registrales reales → ⏭ A FASE 4 (backend por naturaleza)

### B6 — R5: backend de verificación → ⏭ A FASE 4 (backend por naturaleza)

---

## C. Reformas nuevas

### C1 — Coherencia calculadora ↔ empresa → ✅ IMPLEMENTADO
Tabla salarial demo por sector (5 por locale: hostelería, logística, sanidad privada, tecnología/TIC, comercio — y sus equivalentes irlandeses), elegida según `wp.sector` con fallback para empresas de alta manual. Verificado: Polígon Nord muestra «Convenio de transporte y logística», con grupos de carretillero/a y picking.

### C2 — Aportar mi sueldo → ✅ IMPLEMENTADO
Formulario anónimo en Sueldos (puesto, importe, mes/hora → localStorage), lista de «Aportaciones de la comunidad (este navegador)» y toast. La mitad que faltaba de la transparencia salarial, y funcionalidad single-player pura.

### C3 — Foro de verdad → ⏭ A FASE 4 (veredicto: la idea basta a este nivel)

### C4 — Feedback de acciones → ✅ IMPLEMENTADO
Sistema de toasts sobrio (aria-live, autodescarte, variante de aviso) conectado a: denuncia, voto, evento de agenda, aval, alta de empresa, aportación salarial y confirmación de inquilinos.

### C5 — IA demo menos monocorde → ⏭ A FASE 4

### C6 — Territorio con recompensa → ⚪ FALSO NEGATIVO
Ya funcionaba: pulsar una hoja del árbol abre el dossier territorial completo (sindicatos, empresas, alertas, foro) y resalta el territorio. El QA original pulsó la etiqueta del nodo padre (solo expande, por diseño). Sin cambio.

### C7 — Deep links → ✅ IMPLEMENTADO
Extendido el routing por hash existente (foro, territorio) a perfiles de empresa: `#sindicato-empresa:<id>:<sección>`, entrante y saliente (la URL refleja la vista al navegar, con `replaceState`). Verificado: abrir TechPark pone el hash, y cargar `#sindicato-empresa:techpark-solutions:reports` en frío abre sus denuncias. «Mira las denuncias de TechPark» ya es un enlace compartible.

### C8 — Buscador de empresas → ⚪ FALSO NEGATIVO
Ya existía: input de búsqueda con filtrado en vivo por nombre y sector sobre el picker. Sin cambio.

### C9, C10, C11 → ⏭ A FASE 4

---

## Notas de entrega

Cambios en `js/sindicapp-main.js`, `js/sindicapp-sindicato.js`, `css/main.css`, `index.html`, `vite.config.js` y nuevo `assets/sindicapp-logo.jpg`. Sintaxis validada (`node --check`), build de Vite verificado, regresión completa de ambos módulos con el harness sin errores de consola. Un `dist/` residual del build de prueba quedó en el repo (está en `.gitignore`; el sandbox no pudo borrarlo — elimínalo con `rm -rf dist` si molesta). **Sin commitear, según la política del repo.**
