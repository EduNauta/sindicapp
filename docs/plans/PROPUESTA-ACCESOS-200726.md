# Propuesta de modelo de accesos — de anillos a cargos

**Fecha:** 20-07-2026 · **Estado:** APROBADA por Edu el 20-07 («podemos abandonar el concepto de anillos») y consagrada en el **ADR 0024**; el mock-up del §7 está implementado (cargos demo, candados «quién lo lleva», ver-como, wiki «Quién ve qué», búsqueda global y onboarding).
**Origen:** reflexión de Edu (20-07): «Lo de los anillos no es algo que debería ser explícito. Al final habrá 4, pero el cuarto en verdad dentro de la organización será múltiple, porque cada puesto tendrá acceso a ciertas cosas. El esquema de anillos en tanto que idea es limitante.»

---

## 1. El diagnóstico: el cuarto anillo no es un anillo

Los tres primeros anillos funcionan porque describen algo real y lineal: **etapas de la relación** de una persona con la organización. Visitante → usuaria → afiliada es de verdad una escalera: cada etapa contiene a la anterior, se sube en orden, y casi nunca se baja.

El cuarto («militante») rompe el patrón. Dentro de la organización el acceso **no es una etapa: es un mosaico**. Quien lleva Comunicación no debería ver los expedientes jurídicos; quien modera asambleas necesita los turnos y el contexto de los casos de *esa* sesión, no la contabilidad; la comisión de un territorio ve su territorio. Un «rol militante» plano comete los dos errores a la vez: **sobre-concede** (todo militante ve todo) e **infra-concede** (no distingue responsabilidades). El FEATURE_REFERENCE lo dice literal (§9, §12): *access should follow responsibility, not only hierarchy*.

La escalera es buena idea para la relación y mala idea para la responsabilidad. Solución: dejar de pedirle a un solo eje que haga los dos trabajos.

## 2. La reformulación: tres fuentes de acceso, ningún esquema visible

Lo que una persona puede ver/hacer sale de la **unión de tres fuentes** independientes:

1. **Relación** — la etapa del vínculo: visitante, usuaria, afiliada. Escalera, como hasta ahora. Gobierna lo *extensivo*: qué superficies generales existen para ti.
2. **Responsabilidad** — los **cargos** que ocupas. No es escalera: es un conjunto. Cada cargo concede un paquete de **capacidades** sobre un **ámbito**. Gobierna lo *intensivo*: qué herramientas de gestión operas y sobre qué porción.
3. **Parte** — lo que es *tuyo* por ser parte del asunto: tu caso, tus documentos, tus datos de censo. No depende de etapa ni de cargo: la afectada ve su expediente aunque sea solo participante (autoservicio del FEATURE_REFERENCE §10).

«Militante» deja de ser un rol que se activa: es un **estado emergente** — tener ≥1 cargo. El cuarto anillo no se elimina: *se despliega* en el organigrama, que es lo que Edu describía («cada puesto tendrá acceso a ciertas cosas»).

## 3. La pieza clave ya existe: el organigrama como sistema de permisos

Estructura ya modela **comisión → cargo → persona → documento de funciones** (petición literal de la reunión del 14-07). Y el decreto de desparramar el CRM (ADR 0019) dejó, sin buscarlo, el **vocabulario exacto de capacidades**: cada botón `crm-*` de la sidebar es una unidad concedible — afiliadas, intake, casos, asambleas, campañas, finanzas, comunicaciones, calendario, documentos, estructura, bases de datos, fuentes.

Propuesta: cada **cargo** declara

- **capacidades**: qué botones de Gestión opera (`crm-casos`, `crm-asambleas`…),
- **ámbito**: sobre qué porción (territorio, tipo de caso, comisión, campaña — o «toda la organización» para coordinación),

y el **documento de funciones** que ya existe por cargo pasa a ser la versión legible por humanos de esa declaración. Una sola fuente de verdad: **el organigrama ES la ACL**. Quien rota de cargo rota de accesos automáticamente — sin limpieza manual de permisos, que es donde las organizaciones reales se agujerean.

## 4. Opciones sobre la mesa

**A. Por cargo (organigrama como ACL)** — lo de arriba. Coherente con cómo se organiza de verdad un sindicato; el acceso sigue al puesto, no a la persona. Riesgo: rigidez para lo excepcional.

**B. Concesiones individuales (matriz persona × capacidad)** — máxima flexibilidad, pero carga administrativa permanente, deriva inevitable respecto del organigrama y auditoría difícil. Es lo que hacen los CRM genéricos y lo que la reunión del 14-07 describía como problema, no como solución.

**C. Ámbitos como dimensión transversal** — territorio/tema/campaña como recorte que multiplica a A o a B. No es alternativa: es el segundo factor.

**Recomendación: A + C, con B solo como excepción disciplinada** — el «cargo ad hoc»: un cargo temporal con caducidad, creado en Estructura como cualquier otro, para la voluntaria de confianza con una responsabilidad concreta (FEATURE_REFERENCE §1: *limited access when they have a concrete responsibility*). Así lo excepcional queda registrado en el mismo organigrama, no en una matriz aparte.

## 5. Casos que el modelo debe resolver bien (prueba de fuego)

- **Pluralidad**: una persona con dos cargos = unión de paquetes. Coherente con el MODELO-DE-DATOS (persona ≠ relación ≠ cargo).
- **Suplencias**: el cuadrante de roles ya tiene suplente por sesión — la suplente hereda las capacidades del rol *durante la sesión*, no permanentemente.
- **Rotación**: traspasar el cargo traspasa el acceso. Nada que revocar a mano.
- **Verticalidad real**: lo que hoy sería «solo ejecutiva» se expresa como capacidades que solo tienen los cargos de coordinación — sin inventar un anillo 5.
- **La afectada**: ve su caso y sube sus documentos por ser **parte**, aunque no tenga etapa alta ni cargo. Tres fuentes, no una escalera más fina.
- **Sensibilidad por capacidad**: documentos ya tiene ámbito de acceso por pieza (idea 14, hecha); el modelo por cargo encaja encima sin cambiarlo.

## 6. Cómo se ve en la UI (sin hacerse explícito nunca)

Fiel al ADR 0014 y al instinto de Edu: **ninguna página de permisos, ningún diagrama de anillos**.

- Los candados dejan de decir «requiere rol Militante» y pasan a decir **quién lo lleva**: «Esto lo opera la comisión de Comunicación (cargo: Coordinación de comms)». El candado se vuelve información organizativa, no burocracia.
- La sidebar de Gestión muestra operables los `crm-*` que tus cargos conceden; el resto, con candado informativo.
- Los chips de rol («entra como Militante») se convierten en **chips de cargo**: «ocupa un cargo (demo)» con el selector de cargos del organigrama del equipo.
- El simulador «ver como» (idea 43) sale gratis: elegir etapa + cargo(s) y mirar. Es la doctrina de privacidad hecha visible sin escribirla.

## 7. Qué se puede mock-upear ya (si se aprueba el modelo)

Todo en localStorage, sin backend, sin tocar lo normativo más allá de esta decisión:

1. Añadir `capacidades` + `ambito` a los cargos de los seeds de Estructura (por tipo de colectivo).
2. Selector demo «ocupas: [cargo]» en lugar del chip militante; estado persistido.
3. Candados de Gestión calculados contra los cargos ocupados, con el texto «quién lo lleva».
4. Simulador «ver como» (etapa × cargo).

Esto materializa las ideas **42 y 43** del report v4 y deja **52 (búsqueda global)** y **53 (onboarding)** con criterio claro (la búsqueda respeta capacidades; el onboarding pregunta por relación, nunca por cargo).

## 8. Lo que esto le hace al «ADR de anillos» (idea 1)

La decisión pendiente más antigua del report deja de llamarse así. El ADR que habría que escribir es: **«El acceso = relación × cargos × parte; los anillos quedan reducidos a las tres etapas de relación y desaparecen como vocabulario del cuarto nivel»**. La palabra «anillo» sobrevive, como mucho, en la doctrina interna — nunca en la UI, que es exactamente lo que Edu pedía.

---

*Siguiente paso: discutir §4 (¿A+C con cargo ad hoc?) y §5 (¿algún caso de fuego que falte?). Con el visto bueno, el mock-up de §7 es una tanda normal; el ADR se escribe entonces, no antes.*
