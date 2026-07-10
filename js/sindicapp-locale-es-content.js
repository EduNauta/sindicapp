/* sindicapp/sindicapp-locale-es-content.js */
/**
 * Catalunya/España (castellano) locale pack for SindicApp.
 * Live surface only: UI strings, module labels, self-module labels and nav labels.
 */
(function () {
    window.SINDICAPP_ES = {
        id: 'es',
        localeUi: {
            welcome: 'Bienvenido a SindicApp',
            mapHint: 'Elige <strong>Colectivo</strong> → <strong>Mapa</strong>, luego <strong>OpenStreetMap</strong>.',
            sidebar: 'Barra lateral',
            background: 'Fondo',
            mobileToggleAria: 'Mostrar barra lateral',
            showBackgroundAria: 'Mostrar fondo',
            territoryInfo: 'Info',
            mapProviderTitle: 'Proveedor de mapa',
            mapProviderMuted: 'Solo OpenStreetMap (sin capas extra en esta plantilla).',
            bordersTitle: 'Fronteras',
            bordersHelp1: 'Activa capas de límites administrativos en el mapa. Haz clic en una región y usa <strong>Info</strong> para centrar su territorio.',
            bordersHelp2: 'Consejo: activa o desactiva capas para explorar la estructura administrativa a distintos niveles.',
            bordersHelp3: '✅ = hay conjuntos de fronteras. ❌ = aún no hay conjuntos.',
            bordersHelp4: 'Consejo: pulsa 👁️ para ver límites en el mapa. Datasets grandes pueden tardar un momento.',
            sindicatoNavAria: 'Navegación Colectivo',
            sindicatoViewsAria: 'Vistas de Colectivo'
        },
        moduleLabels: {
            self: 'Usuario',
            sindicato: 'Colectivo'
        },
        selfSections: {
            selfSubSindicato: 'Sindicato',
            selfWorkplaceLabel: 'Tu empresa',
            selfNoWorkplace: 'Sin empresa asignada'
        },
        nav: {
            '[data-module="self"]': 'Usuario',
            '[data-module="sindicato"]': 'Colectivo',
            '[data-self-sindicato-section="overview"]': 'Resumen',
            '[data-self-sindicato-section="location"]': 'Localización',
            '[data-self-sindicato-section="reports"]': 'Denuncias',
            '[data-self-sindicato-section="wages"]': 'Sueldos',
            '[data-self-sindicato-section="convenio"]': 'Convenio',
            '[data-self-sindicato-section="action"]': 'Acción',
            '[data-sindicato-sub="map"]': 'Mapa',
            '[data-sindicato-sub="workplaces"]': 'Empresas',
            '[data-sindicato-sub="sectores"]': 'Sectores',
            '[data-sindicato-sub="feed"]': 'Foro',
            '[data-sindicato-sub="unions"]': 'Sindicatos',
            '[data-sindicato-sub="vivienda"]': 'Vivienda',
            '[data-sindicato-sub="coordination"]': 'Coordinación',
            '[data-sindicato-sub="wiki"]': 'Wiki',
            '[data-sindicato-coord-sub="estructura"]': 'Estructura',
            '[data-sindicato-coord-sub="dinero"]': 'Dinero',
            '[data-sindicato-coord-sub="objetivos"]': 'Objetivos',
            '[data-sindicato-wiki-sub="index"]': 'Índice',
            '[data-sindicato-wiki-sub="normas"]': 'Normas',
            '[data-sindicato-section="location"]': 'Localización',
            '[data-sindicato-section="overview"]': 'Resumen',
            '[data-sindicato-section="reports"]': 'Denuncias',
            '[data-sindicato-section="wages"]': 'Sueldos',
            '[data-sindicato-section="convenio"]': 'Convenio',
            '[data-sindicato-section="action"]': 'Acción'
        }
    };
})();
