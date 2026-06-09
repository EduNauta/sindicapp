<div align="center">

# SindicApp

**Infraestructura neutral para la coordinación laboral**

Aplicación web de un solo archivo: mapa geográfico, perfiles de empresa, foros y herramientas sindicales en el navegador — sin servidor propio.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=flat&logo=openstreetmap&logoColor=white)](https://www.openstreetmap.org/)

</div>

---

## Descripción

SindicApp es un **prototipo funcional** de plataforma de coordinación trabajadora. Parte de un enfoque *geography-first*: cada empresa tiene un perfil automático en el mapa, y desde ahí se accede a denuncias, transparencia salarial, convenio, acción colectiva y foros.

No sustituye a los sindicatos existentes (CCOO, UGT, SIPTU, etc.): actúa como **infraestructura neutral** que los complementa — directorio de empresas, mapa territorial, foros por sector y territorio, y espacios de coordinación verificada.

La interfaz principal se organiza en dos módulos:

| Módulo | Rol |
|--------|-----|
| **Usuario** | Tu empresa: ubicación en el mapa, denuncias, salarios, convenio y acción desde la perspectiva personal |
| **Sindicato** | Vista colectiva: mapa de empresas, directorio sindical, sectores, foro, vivienda, wiki y coordinación de plataforma |

Al abrir la web, el **mapa OpenStreetMap** (Leaflet) carga de forma automática como fondo interactivo. El panel lateral permite alternar entre barra de navegación y mapa a pantalla completa.

---

## Características principales

### Mapa y territorio

- **OpenStreetMap** por defecto al cargar la página (Leaflet + tiles OSM)
- **Fronteras administrativas** (Cartagrama): CCAA, provincias, comarcas, municipios, NUTS, Irlanda, países, etc.
- **Pins de empresa** geolocalizados; clic en territorio o pin para abrir perfiles
- Locales **España (Catalunya)** e **Irlanda** con datos de demostración

### Módulo Sindicato

- **Mapa** — explorar empresas por territorio y fronteras
- **Empresas** — directorio con búsqueda; alta manual de empresas (demo en `localStorage`)
- **Sindicatos** — directorio neutral con puntuación de prestigio comunitario
- **Sectores** — árbol sector → subsector → foro y empresas del ramo
- **Foro** — tableros general, por sector y por territorio
- **Vivienda** — coordinación por territorio: foro y alertas de desahucio (demo)
- **Coordinación** — estructura, dinero y objetivos de la plataforma
- **Wiki** — índice y normas internas

### Perfil de empresa (automático)

Cada empresa incluye secciones de demostración:

- Ubicación enlazada al mapa
- Denuncias anónimas con cola de moderación
- Transparencia salarial y organigrama colaborativo
- Convenio colectivo con chat y FAQ
- Coordinación de huelga (votaciones, confirmaciones)
- Sala privada de trabajadores (concepto verificado)

### Módulo Usuario

- Perfil vinculado a **tu empresa** de demostración
- Mismas secciones (ubicación, denuncias, salarios, convenio, acción) desde la perspectiva personal

### Otros

- Interfaz **bilingüe** (ES / EN) con persistencia de idioma
- Diseño **responsive** (sidebar / mapa en móvil)
- Datos de demo en **localStorage** del navegador (sin backend)

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Aplicación | Un solo archivo HTML (`SindicApp.html`) |
| Lenguaje | JavaScript (ES6+, sin framework) |
| Mapa base | [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) |
| Fronteras | Módulo Cartagrama (GeoJSON, integrado en el bundle) |
| Estilos | CSS3 embebido |
| Persistencia | `localStorage` (estado de demo) |
| Fuentes editables | `src/sindicapp/` en el monorepo LUX21 AI Web |

> **Nota:** Esta versión **no** usa React, Next.js, Node en producción ni base de datos. Es una aplicación estática que se abre en el navegador.

---

## Inicio rápido

La app es el archivo **`SindicApp.html`** en la raíz de este repositorio. Necesitas conexión a internet para Leaflet y los tiles de OpenStreetMap (CDN).

### Abrir en local

1. Clona o descarga el repositorio
2. Abre `SindicApp.html` en el navegador (doble clic o arrastrar al navegador)
3. Si algo falla al abrirlo como `file://`, usa un servidor local:

```bash
python -m http.server 8080
# Visita http://localhost:8080/SindicApp.html
```

### Abrir desde GitHub (no es la vista de código)

Si en el repositorio haces clic en `SindicApp.html`, GitHub muestra el **código fuente**, no la aplicación ejecutándose. Para ver la web renderizada tienes dos opciones habituales:

**GitHub Pages (recomendado)** — en *Settings → Pages*, activa Pages desde la rama `main` (carpeta `/root`). La app quedará en:

`https://<tu-usuario>.github.io/<nombre-repo>/SindicApp.html`

Opcional: renombra `SindicApp.html` a `index.html` para que la URL raíz del sitio abra la app directamente.

**Descarga** — botón *Code → Download ZIP*, descomprime y abre `SindicApp.html` en el navegador.

---

## Desarrollo (monorepo LUX21)

Si trabajas desde el repositorio LUX21 AI Web (o equivalente local):

### Editar fuentes

Los módulos editables están en:

```
src/sindicapp/
├── sindicapp-sindicato.js      # Datos demo, perfiles de empresa, HTML de workspaces
├── sindicapp-locale-es-content.js
├── sindicapp-locale-en-content.js
└── sindicapp-locale-geo-data.js

src/shared/
└── cartagrama-territories-bundle.js   # Fronteras administrativas
```

### Regenerar el HTML empaquetado

Tras modificar fuentes bajo `src/sindicapp/`:

```bash
node scripts/bundle-sindicapp.mjs
```

Esto inline los scripts en `SindicApp.html` y actualiza el logo del encabezado.

### Regenerar la plantilla desde Pandora (avanzado)

```bash
node scripts/fork-sindicapp.mjs
```

---

## Estructura del repositorio SindicApp

```
sindicapp/
├── SindicApp.html          # Aplicación completa (archivo único)
└── README.md               # Este documento
```

En el monorepo LUX21, `SindicApp.html` vive en la raíz del proyecto junto a `scripts/` y `src/sindicapp/`.

---

## Locales de demostración

| Locale | Región por defecto | Centro del mapa |
|--------|-------------------|-----------------|
| **ES** | Catalunya / España | Zona Barcelona–Lleida |
| **IE** | Irlanda | Centro de la isla |

Cambia idioma con los botones **ES** / **EN** en la cabecera. La preferencia se guarda en `localStorage`.

---

## Estado del proyecto

SindicApp es un **prototipo embrionario** dentro del ecosistema LUX21 / Pandora. Muchas funciones son interfaces de demostración con datos ficticios:

- [x] Mapa OpenStreetMap con carga automática
- [x] Fronteras administrativas (Cartagrama)
- [x] Perfiles de empresa geolocalizados
- [x] Foros, sectores, sindicatos y vivienda (UI + demo)
- [x] Denuncias anónimas y moderación (simulada)
- [x] Bilingüe ES / EN
- [ ] Backend, autenticación real y base de datos
- [ ] Notificaciones push y PWA
- [ ] Integración con APIs de mapas de pago (Mapbox / Google)

---

## Privacidad y uso responsable

- Los datos de demo se almacenan **solo en tu navegador** (`localStorage`)
- Las denuncias anónimas son un **flujo simulado**; no hay servidor que las reciba
- El uso legal y responsable de la plataforma es responsabilidad de cada persona usuaria

---

## Licencia

Este proyecto está bajo la licencia **MIT**. Ver el archivo `LICENSE` para más detalles.

---

## Enlaces

- **Repositorio:** [github.com/edunauta/sindicapp](https://github.com/edunauta/sindicapp)
- **Issues:** [github.com/edunauta/sindicapp/issues](https://github.com/edunauta/sindicapp/issues)
- **Proyecto padre:** LUX21 AI Web (Cartagrama, Pandora, módulos cartográficos)

---

<div align="center">

**Infraestructura neutral para que la clase trabajadora se organice con herramientas geográficas compartidas.**

[⭐ Star](https://github.com/edunauta/sindicapp) · [🐛 Reportar bug](https://github.com/edunauta/sindicapp/issues) · [💡 Proponer mejora](https://github.com/edunauta/sindicapp/issues)

</div>
