<div align="center">

# SindicApp

**Infraestructura neutral para la coordinación laboral**

Aplicación web estática: mapa geográfico, perfiles de empresa, foros y herramientas sindicales en el navegador — sin servidor propio.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
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
| **Sindicato** | Vista colectiva: mapa de empresas, directorio sindical, sectores, foro, territorios, wiki y CRM multi-organización |

Al abrir la web, el **mapa OpenStreetMap** (Leaflet) carga de forma automática como fondo interactivo. El panel lateral permite alternar entre barra de navegación y mapa a pantalla completa.

---

## Características principales

### Mapa y territorio

- **OpenStreetMap** por defecto al cargar la página (Leaflet + tiles OSM)
- **Fronteras administrativas**: CCAA, provincias, comarcas, municipios, NUTS, Irlanda, países, etc.
- **Pins de empresa** geolocalizados; clic en territorio o pin para abrir perfiles
- Locales **España (Catalunya)** e **Irlanda** con datos de demostración

### Módulo Sindicato

- **Empresas** — vistas Mapa (pins de empresa) y Lista (directorio con búsqueda); alta manual de empresas (demo en `localStorage`)
- **Sindicatos** — directorio neutral con datos de implantación (delegados, empresas con presencia, convenios firmados)
- **Sectores** — árbol sector → subsector → foro y empresas del ramo
- **Red Social** — módulo master y landing por defecto (ver ADR 0012): portada de la red con panel de stats por módulo (Sindicatos, Territorios, Sectores, Empresas, Consumidores, Estudiantes) + actividad reciente; la portada clásica (logo, bienvenida, selector de idioma) vive fusionada en su barra lateral
- **Foro** — tableros general, por sector y por territorio; los árboles de subforos se eligen en el fondo, no en la barra lateral (módulo distinto de «Red Social», que antes llevaba este foro)
- **Territorios** — vistas Mapa (selector sobre las fronteras geojson: clic en comarca/provincia → Info → su perfil) y Lista (provincia → comarca → municipio, las 42 comarcas catalanas): empresas, vivienda (alertas de desahucio, agenda, edificios), foro y redes del territorio (demo)
- **CRM** — gestión para cualquier organización (SindicApp o cualquier sindicato del directorio): afiliadas, casos, campañas, finanzas, comunicaciones, calendario y documentos (demo en memoria de sesión)
- **Wiki** — índice y normas internas
- **Vivienda** — módulo nuevo y distinto de Territorios (ver ADR 0011), con cinco pestañas: Huelgómetro (recuento nacional de inquilinos comprometidos con una huelga de alquileres, umbral 1.000.000, botón de compromiso), Alarmas (todos los desahucios de todos los territorios en un tablón, con «me apunto al acompañamiento» por alerta), Tenedores (campañas de negociación colectiva por gran tenedor), Calculadora (tu renta vs índice de referencia demo) y Asambleas (asambleas locales con su grupo de Telegram)
- **Consumidores** — coordinación de consumo: productos y servicios con denuncias, campañas de presión, alternativas justas y enlace a la empresa del mapa
- **Estudiantes** — centros de estudios con colectivos estudiantiles, reivindicaciones, movilizaciones y salto al perfil de su territorio
- **Redes por entidad** — cada territorio, sector, sindicato, empresa, producto/servicio y centro de estudios lleva su grupo de Telegram y canales sociales (enlaces demo)

### Perfil de empresa (automático)

Cada empresa incluye secciones de demostración:

- Ubicación enlazada al mapa
- Denuncias anónimas con cola de moderación
- Transparencia salarial y organigrama colaborativo
- Convenio colectivo con chat y FAQ
- Coordinación de huelga (votaciones, confirmaciones)
- Sala privada de trabajadores (concepto verificado)

### Módulo Usuario (en el subnav, «Perfil»)

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
| Aplicación | HTML + CSS + JS estáticos (`index.html`, `css/`, `js/`) |
| Tooling | [Vite](https://vitejs.dev/) — servidor de desarrollo y build (no forma parte del runtime) |
| Lenguaje | JavaScript (ES6+, sin framework) |
| Mapa base | [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) |
| Fronteras | Capas GeoJSON embebidas en `js/cartagrama-territories-bundle.js` |
| Estilos | CSS3 (`css/main.css`) |
| Persistencia | `localStorage` (estado de demo) |

> **Nota:** Esta versión **no** usa React, Next.js ni base de datos, y no hay Node en producción. Vite se usa solo como herramienta de desarrollo y build; el resultado sigue siendo una aplicación estática. Los scripts son *classic scripts* (sin módulos ES) a propósito, para mantener el comportamiento original intacto.

---

## Cómo abrir la web

Necesitas **conexión a internet** (Leaflet y el mapa OpenStreetMap se cargan desde la red).

### Opción 1 — Web publicada (GitHub Pages)

Abre directamente: **<https://edunauta.github.io/sindicapp/>**

### Opción 2 — Sin instalar nada

1. En la página principal del repo, pulsa el botón verde **Code** → **Download ZIP** (o clona con git)
2. Descomprime la carpeta
3. **Doble clic** en `index.html`, o arrástralo a Chrome, Firefox o Edge

### Opción 3 — Desarrollo con Node

```bash
git clone https://github.com/edunauta/sindicapp.git
cd sindicapp
npm install
npm run dev       # servidor de desarrollo con recarga (http://localhost:5173)
npm run build     # genera la versión de producción en dist/
npm run preview   # sirve dist/ en local
```

### Si el mapa no carga

Algunos navegadores limitan recursos cuando abres un `file://`. En ese caso, desde la carpeta del proyecto:

```bash
python -m http.server 8080
```

Luego visita en el navegador: `http://localhost:8080/`

---

## Estructura del repositorio

```
sindicapp/
├── index.html                              # Página principal (markup)
├── css/
│   └── main.css                            # Estilos de la aplicación
├── js/
│   ├── locale-bootstrap.js                 # Arranque temprano de idioma (localStorage)
│   ├── cartagrama-territories-bundle.js    # Fronteras / territorios (GeoJSON embebido)
│   ├── sindicapp-locale-geo-data.js        # Árbol territorial ES + IE
│   ├── sindicapp-locale-en-content.js      # Locale pack Irlanda (EN)
│   ├── sindicapp-locale-es-content.js      # Locale pack España (ES)
│   ├── sindicapp-sindicato.js              # Módulo Sindicato
│   └── sindicapp-main.js                   # Aplicación principal (runSindicApp)
├── package.json                            # Scripts npm + dependencia de Vite
├── vite.config.js                          # Configuración de Vite
├── .github/workflows/deploy.yml            # CI: build + deploy a GitHub Pages
├── legacy/SindicApp.html                   # Versión monolítica original (solo referencia)
├── LICENSE                                 # MIT
└── README.md                               # Este documento
```

---

## Locales de demostración

| Locale | Región por defecto | Centro del mapa |
|--------|-------------------|-----------------|
| **ES** | Catalunya / España | Zona Barcelona–Lleida |
| **IE** | Irlanda | Centro de la isla |

Cambia idioma con los botones **ES** / **EN** en la cabecera. La preferencia se guarda en `localStorage`.

---

## Estado del proyecto

SindicApp es un **prototipo embrionario**. Muchas funciones son interfaces de demostración con datos ficticios:

- [x] Mapa OpenStreetMap con carga automática
- [x] Fronteras administrativas
- [x] Perfiles de empresa geolocalizados
- [x] Foros, sectores, sindicatos y perfiles de territorio (UI + demo)
- [x] Denuncias anónimas y moderación (simulada)
- [x] Bilingüe ES / EN
- [ ] Backend, autenticación real y base de datos
- [ ] Notificaciones push y PWA
- [ ] Proveedores de mapa adicionales

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

---

<div align="center">

**Infraestructura neutral para que la clase trabajadora se organice con herramientas geográficas compartidas.**

[⭐ Star](https://github.com/edunauta/sindicapp) · [🐛 Reportar bug](https://github.com/edunauta/sindicapp/issues) · [💡 Proponer mejora](https://github.com/edunauta/sindicapp/issues)

</div>
