# Modelo de datos de SindicApp

*Esquema conceptual, no técnico. Fija las entidades y sus relaciones para que el prototipo (y una futura implementación real) soporten la **pluralidad** que la base de datos actual del sindicato no soporta. Responde directamente al dolor de la reunión del 14-07: «una persona, una dirección, un propietario, un piso — y programada pocha».*

*17-07-2026. La pestaña CRM → Bases de datos muestra estas tablas con sus recuentos en vivo; este documento las formaliza.*

## Principio rector

El esquema del sindicato hoy es rígido: 1 persona ↔ 1 dirección ↔ 1 propietario ↔ 1 piso. La realidad organizativa es plural: una persona se muda, un caso afecta a varias personas, un edificio cambia de manos. SindicApp modela **relaciones N:M desde el principio**, y separa la *persona* de sus *roles*, *casos* y *lugares*.

## Entidades

### Persona
El individuo, independiente de su rol. Campos: nombre, canales de contacto (N), notas.
Una persona **no** lleva incrustada su dirección ni su empresa: esas son relaciones.

- Persona ↔ **Relación** (N): su vínculo con una o varias organizaciones, con estado y grado.
- Persona ↔ **Dirección** (N, histórica): dónde ha vivido/trabajado, con fechas.
- Persona ↔ **Caso** (N): como afectada o como responsable.
- Persona ↔ **Documento** (N): los que aporta.

### Relación (Persona ↔ Organización)
El vínculo, no la persona. Campos: `grado` (participante · afiliada · militante · delegada · liberada · cargo) y `estado` (activa · pendiente · baja). Una misma persona puede tener relación con más de una organización (p. ej. inquilina *y* trabajadora).

### Organización
Un sindicato o entidad. Campos: nombre, tipo (laboral · vivienda · profesional · autónomos · estudiantil · consumo), ámbito.

- Organización ↔ **Comisión** (N).
- Organización ↔ **Sección** (N): territorial o por empresa/propiedad.
- Organización ↔ **Sesión** (N): sus asambleas.

### Comisión → Cargo → Persona
La jerarquía viva (CRM → Estructura). Comisión con su ámbito; Cargo con su **documento de funciones**; una Persona (vía Relación) ocupa el Cargo. Un Cargo puede estar **vacante**.

### Caso
El conflicto o solicitud como registro vivo, no como formulario. Campos: título, `tema`, `responsable`, `etapa` (nuevo · en curso · negociación · resuelto), `resultado` (favorable · desfavorable · derivado · abandonado).

- Caso ↔ **Persona** (N): afectadas.
- Caso ↔ **Actualización** (N): historial (fecha, autora, nota).
- Caso ↔ **Documento** (N): requeridos/aportados, con estado de revisión.
- Caso ↔ **Actor** (1): la contraparte (empresa, tenedor, agencia, institución).
- Caso ↔ **Tema** (1): conecta con playbook (wiki, convenio, comisión).

Cuando ≥3 Casos comparten Actor, emerge un **patrón** (conflicto colectivo).

### Actor
La contraparte, polimórfica: empresa / gran tenedor / agencia / plataforma / cliente / institución / colegio. Es la abstracción que permite que la app sea plataforma sindical *general* y no una app por sindicato. Un Actor ↔ Caso (N), Actor ↔ Lugar (N).

### Lugar / Territorio
Jerarquía geográfica: Provincia → Comarca → Municipio → Edificio/Centro. Cada nivel con perfil propio. Lugar ↔ Actor (N, histórico: un edificio, varios propietarios en el tiempo).

### Tema
Categoría de caso conectada a conocimiento: recomendaciones, recurso wiki, cláusula de convenio, comisión responsable. No es una etiqueta: es la puerta al playbook.

### Sesión → Turno
Asamblea con tipo (ordinaria · bienvenida · especial), asistencia (N Personas), **cuadrante de roles** (titular/suplente, con huecos) y cola de **Turnos** de palabra (persona, tipo primera/actualización, estado). Sesión especial ↔ Caso (N): clustering de casos afines.

### Documento
Archivo con `tipo`, `ámbito` de acceso (público · afiliadas · comisión · caso), `estado de revisión` (pendiente · en revisión · revisada) y `revisor`. Documento ↔ Caso (1) o ↔ Ámbito (1). Es material de alta sensibilidad.

### Fuente de datos
De dónde viene cada tabla: BD principal, CRM externo, encuestas, hojas heredadas, calendario — con responsable y estado de integración. (CRM → Bases de datos.)

## Cardinalidades clave (lo que hoy falta)

| Relación | Cardinalidad | Por qué importa |
|---|---|---|
| Persona ↔ Dirección | 1 ↔ N (histórica) | La gente se muda; el historial no se pierde |
| Persona ↔ Organización | N ↔ M vía Relación | Inquilina y trabajadora a la vez |
| Caso ↔ Persona | N ↔ M | Un despido colectivo, una subida de alquiler de bloque |
| Edificio ↔ Propietario | 1 ↔ N (histórica) | Los pisos cambian de manos |
| Caso ↔ Actor | N ↔ 1 | Detección de patrones colectivos |
| Documento ↔ Ámbito | N ↔ 1 | Quién puede ver qué (acceso por responsabilidad) |

## Nota sobre acceso

El modelo no define permisos por sí solo: el **acceso sigue la responsabilidad** (doctrina de anillos). Cada entidad lleva implícito su anillo — público, personal, afiliadas, responsabilidad acotada — y la UI lo expresa dentro de cada módulo. Esa capa es decisión organizativa (ADR pendiente), no de este esquema.

## Estado

Documento vivo. El prototipo materializa este modelo con datos demo; la ingesta real (BORME, BOE, censo del sindicato, fusión con Madrid) y la parametrización por tipo de organización quedan para fases posteriores.
