/* sindicapp/sindicapp-locale-ca-content.js */
/**
 * Catalunya (català) locale pack for SindicApp.
 * Live surface only: UI strings, module labels, self-module labels and nav labels.
 * Catalan is a *language* over the `es` dataset (same territory), not a dataset of
 * its own — see ADR 0018.
 */
(function () {
    window.SINDICAPP_CA = {
        id: 'ca',
        localeUi: {
            welcome: 'Benvingut/da a SindicApp',
            mapHint: 'Tria un mòdul a la barra lateral: <strong>Empreses</strong>, <strong>Mapa</strong> o <strong>Sectors</strong> per explorar el mapa.',
            sidebar: 'Barra lateral',
            background: 'Fons',
            mobileToggleAria: 'Mostrar barra lateral',
            showBackgroundAria: 'Mostrar fons',
            territoryInfo: 'Info',
            bordersTitle: 'Fronteres',
            bordersHelp1: 'Activa capes de límits administratius al mapa. Fes clic en una regió i fes servir <strong>Info</strong> per centrar-ne el territori.',
            bordersHelp2: 'Consell: activa o desactiva capes per explorar l\'estructura administrativa a diferents nivells.',
            bordersHelp3: '✅ = hi ha conjunts de fronteres. ❌ = encara no n\'hi ha.',
            bordersHelp4: 'Consell: prem 👁️ per veure límits al mapa. Els conjunts grans poden trigar un moment.',
            sindicatoNavAria: 'Navegació Col·lectiu',
            sindicatoViewsAria: 'Vistes de Col·lectiu'
        },
        moduleLabels: {
            self: 'Perfil',
            sindicato: 'Col·lectiu'
        },
        selfSections: {
            selfSubSindicato: 'Sindicat',
            selfWorkplaceLabel: 'La teva empresa',
            selfNoWorkplace: 'Sense empresa assignada'
        },
        nav: {
            '[data-module="self"]': 'Perfil',
            '[data-module="sindicato"]': 'Col·lectiu',
            '[data-self-sindicato-section="overview"]': 'Resum',
            '[data-self-sindicato-section="location"]': 'Mapa',
            '[data-self-sindicato-section="reports"]': 'Denúncies',
            '[data-self-sindicato-section="wages"]': 'Sous',
            '[data-self-sindicato-section="convenio"]': 'Conveni',
            '[data-self-sindicato-section="action"]': 'Acció',
            '[data-self-sindicato-section="miscasos"]': 'Els meus casos',
            '[data-sindicato-sub="map"]': 'Mapa',
            '[data-sindicato-sub="workplaces"]': 'Empreses',
            '[data-sindicato-sub="sectores"]': 'Sectors',
            '[data-sindicato-sub="feed"]': 'Xarxa Social',
            '[data-sindicato-sub="unions"]': 'Treballadores',
            '[data-sindicato-sub="sindicatos"]': 'Sindicats',
            '[data-sindicato-sub="autonomos"]': 'Autònomes',
            '[data-sindicato-sub="profesionales"]': 'Professionals',
            '[data-sindicato-sub="vivienda"]': 'Mapa',
            '[data-sindicato-sub="coordination"]': 'CRM',
            '[data-sindicato-sub="wiki"]': 'Wiki',
            '[data-sindicato-sub="usuario"]': 'Perfil',
            '[data-sindicato-sub="consumidores"]': 'Consumidores',
            '[data-sindicato-sub="housing"]': 'Llogateres',
            '[data-sindicato-sub="foro"]': 'Fòrum',
            '[data-sindicato-sub="estudiantes"]': 'Estudiants',
            '[data-sindicato-coord-sub="afiliadas"]': 'Afiliades',
            '[data-sindicato-coord-sub="datos"]': 'Bases de dades',
            '[data-sindicato-coord-sub="estructura"]': 'Estructura',
            '[data-sindicato-coord-sub="intake"]': 'Acollida',
            '[data-sindicato-coord-sub="asambleas"]': 'Assemblees',
            '[data-sindicato-coord-sub="casos"]': 'Casos',
            '[data-sindicato-coord-sub="campanas"]': 'Campanyes',
            '[data-sindicato-coord-sub="finanzas"]': 'Finances',
            '[data-sindicato-coord-sub="comunicaciones"]': 'Comunicacions',
            '[data-sindicato-coord-sub="calendario"]': 'Calendari',
            '[data-sindicato-coord-sub="documentos"]': 'Documents',
            '[data-sindicato-wiki-sub="index"]': 'Índex',
            '[data-sindicato-wiki-sub="sindicapp"]': 'SindicApp',
            '[data-sindicato-wiki-sub="derechos"]': 'Drets',
            '[data-sindicato-wiki-sub="denunciar"]': 'Denunciar',
            '[data-sindicato-wiki-sub="organizar"]': 'Organitzar',
            '[data-sindicato-wiki-sub="glosario"]': 'Glossari',
            '[data-sindicato-wiki-sub="normas"]': 'Normes',
            '[data-sindicato-section="location"]': 'Mapa',
            '[data-sindicato-section="overview"]': 'Resum',
            '[data-sindicato-section="reports"]': 'Denúncies',
            '[data-sindicato-section="wages"]': 'Sous',
            '[data-sindicato-section="convenio"]': 'Conveni',
            '[data-sindicato-section="action"]': 'Acció'
        }
    };
})();
