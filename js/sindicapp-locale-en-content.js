/* sindicapp/sindicapp-locale-en-content.js */
/**
 * Ireland (English) locale pack for SindicApp.
 * Live surface only: UI strings, module labels, self-module labels and nav labels.
 */
(function () {
    window.SINDICAPP_IE = {
        id: 'ie',
        localeUi: {
            welcome: 'Welcome to SindicApp',
            mapHint: 'Choose <strong>Collective</strong> → <strong>Map</strong>, then <strong>OpenStreetMap</strong>.',
            sidebar: 'Sidebar',
            background: 'Background',
            mobileToggleAria: 'Show sidebar',
            showBackgroundAria: 'Show background',
            territoryInfo: 'Info',
            mapProviderTitle: 'Map provider',
            mapProviderMuted: 'OpenStreetMap only (no extra layers in this template).',
            bordersTitle: 'Borders',
            bordersHelp1: 'Toggle administrative boundary layers on the map. Click a region to select it, then use <strong>Info</strong> to focus its territory.',
            bordersHelp2: 'Tip: activate/deactivate layers to explore the administrative structure at different levels.',
            bordersHelp3: '✅ = has border sets. ❌ = no border sets yet.',
            bordersHelp4: 'Tip: click 👁️ to show boundaries on the map. Large datasets may take a moment.',
            sindicatoNavAria: 'Collective navigation',
            sindicatoViewsAria: 'Collective views'
        },
        moduleLabels: {
            self: 'User',
            sindicato: 'Collective'
        },
        selfSections: {
            selfSubSindicato: 'Syndicate',
            selfWorkplaceLabel: 'Your workplace',
            selfNoWorkplace: 'No workplace assigned'
        },
        nav: {
            '[data-module="self"]': 'User',
            '[data-module="sindicato"]': 'Collective',
            '[data-self-sindicato-section="overview"]': 'Overview',
            '[data-self-sindicato-section="location"]': 'Location',
            '[data-self-sindicato-section="reports"]': 'Reports',
            '[data-self-sindicato-section="wages"]': 'Wages',
            '[data-self-sindicato-section="convenio"]': 'Collective agreement',
            '[data-self-sindicato-section="action"]': 'Action',
            '[data-sindicato-sub="map"]': 'Map',
            '[data-sindicato-sub="workplaces"]': 'Companies',
            '[data-sindicato-sub="sectores"]': 'Sectors',
            '[data-sindicato-sub="feed"]': 'Forum',
            '[data-sindicato-sub="unions"]': 'Unions',
            '[data-sindicato-sub="vivienda"]': 'Housing',
            '[data-sindicato-sub="coordination"]': 'Coordination',
            '[data-sindicato-sub="wiki"]': 'Wiki',
            '[data-sindicato-coord-sub="estructura"]': 'Structure',
            '[data-sindicato-coord-sub="dinero"]': 'Money',
            '[data-sindicato-coord-sub="objetivos"]': 'Objectives',
            '[data-sindicato-wiki-sub="index"]': 'Index',
            '[data-sindicato-wiki-sub="normas"]': 'Rules',
            '[data-sindicato-section="location"]': 'Location',
            '[data-sindicato-section="overview"]': 'Overview',
            '[data-sindicato-section="reports"]': 'Reports',
            '[data-sindicato-section="wages"]': 'Wages',
            '[data-sindicato-section="convenio"]': 'Collective agreement',
            '[data-sindicato-section="action"]': 'Action'
        }
    };
})();
