        function runSindicApp() {
            /* Sidebar visible immediately — Drive / missing scripts must not leave console hidden */
            document.body.classList.add('sidebar-open');

            const mobileToggle = document.getElementById('mobile-toggle');
            const mapTextDisplay = document.getElementById('map-text-display');
            const templateModulePicker = document.getElementById('template-module-picker');
            const modulePanels = document.querySelectorAll('.template-module-panel');
            const selfNavTree = document.getElementById('self-nav-tree');
            const selfSindicatoBlock = document.getElementById('self-sindicato-block');
            const selfSindicatoWorkplaceLabel = document.getElementById('self-sindicato-workplace-label');
            const selfSindicatoWorkplaceName = document.getElementById('self-sindicato-workplace-name');
            const selfSindicatoSectionButtons = document.querySelectorAll('[data-self-sindicato-section]');
            const sindicatoNavTree = document.getElementById('sindicato-nav-tree');
            const sindicatoSubButtons = document.querySelectorAll('[data-sindicato-sub]');
            const sindicatoWorkplacesBlock = document.getElementById('sindicato-workplaces-block');
            const sindicatoMapSidebar = document.getElementById('sindicato-map-sidebar');
            const sindicatoUnionsSidebar = document.getElementById('sindicato-unions-sidebar');
            const sindicatoUnionSearch = document.getElementById('sindicato-union-search');
            const sindicatoUnionSelect = document.getElementById('sindicato-union-select');
            const sindicatoUnionSectionNav = document.getElementById('sindicato-union-section-nav');
            const sindicatoUnionSectionButtons = document.querySelectorAll('[data-sindicato-union-section]');
            const sindicatoFeedSidebar = document.getElementById('sindicato-feed-sidebar');
            /* 13-07-2026: Foro con sidebar propia (ámbitos); Consumidores/Estudiantes solo intro */
            const sindicatoForoSidebar = document.getElementById('sindicato-foro-sidebar');
            const sindicatoConsumidoresSidebar = document.getElementById('sindicato-consumidores-sidebar');
            const sindicatoEstudiantesSidebar = document.getElementById('sindicato-estudiantes-sidebar');
            /* 17-07-2026: Profesionales y Autónomos, mismo patrón de sidebar mínima */
            const sindicatoProfesionalesSidebar = document.getElementById('sindicato-profesionales-sidebar');
            const sindicatoAutonomosSidebar = document.getElementById('sindicato-autonomos-sidebar');
            /* 17-07-2026: selectores de sidebar (patrón Trabajadores) en 3 directorios */
            const sindicatoProfesionalesSearch = document.getElementById('sindicato-profesionales-search');
            const sindicatoProfesionalesSelect = document.getElementById('sindicato-profesionales-select');
            const sindicatoConsumidoresSearch = document.getElementById('sindicato-consumidores-search');
            const sindicatoConsumidoresSelect = document.getElementById('sindicato-consumidores-select');
            const sindicatoEstudiantesSearch = document.getElementById('sindicato-estudiantes-search');
            const sindicatoEstudiantesSelect = document.getElementById('sindicato-estudiantes-select');
            const sindicatoAutonomosSearch = document.getElementById('sindicato-autonomos-search');
            const sindicatoAutonomosSelect = document.getElementById('sindicato-autonomos-select');
            const sindicatoHousingSearch = document.getElementById('sindicato-housing-search');
            const sindicatoHousingSelect = document.getElementById('sindicato-housing-select');
            /* Nav de la Propuesta (única desde 17-07; barra de versiones y subnav clásica
               purgadas el 18-07 — F5 del report v4). */
            const sindicatoSubnavPropuesta = document.getElementById('sindicato-subnav-propuesta');
            /* 20-07 tarde (idea 68 parcial): la sidebar del sub `anillo` se purgó con
               la pantalla «inicio» y PROPUESTA_RINGS (ADR 0024). */
            /* 17-07-2026: nav de secciones del equipo sindical (Profesionales/Autónomos/
               Consumidores/Estudiantes), compartida. */
            const sindicatoEquipoSectionBlock = document.getElementById('sindicato-equipo-section-block');
            const sindicatoEquipoSectionNav = document.getElementById('sindicato-equipo-section-nav');
            const sindicatoFeedSubnav = document.getElementById('sindicato-feed-subnav');
            const sindicatoFeedScopeButtons = document.querySelectorAll('[data-sindicato-feed-scope]');
            const sindicatoFeedScopeTreeMount = document.getElementById('sindicato-feed-scope-tree-mount');
            const sindicatoFeedCompanyLabel = document.getElementById('sindicato-feed-company-label');
            const sindicatoFeedCompanySelect = document.getElementById('sindicato-feed-company-select');
            const sindicatoSectoresSidebar = document.getElementById('sindicato-sectores-sidebar');
            const sindicatoSectoresTreeMount = document.getElementById('sindicato-sectores-tree-mount');
            const sindicatoCoordinationSidebar = document.getElementById('sindicato-coordination-sidebar');
            const sindicatoWikiSidebar = document.getElementById('sindicato-wiki-sidebar');
            const sindicatoViviendaSidebar = document.getElementById('sindicato-vivienda-sidebar');
            /* Vivienda / Housing (13-07-2026) — módulo nuevo, distinto de Territorios */
            const sindicatoHousingSidebar = document.getElementById('sindicato-housing-sidebar');
            const sindicatoHousingSubnav = document.getElementById('sindicato-housing-subnav');
            const sindicatoHousingSubButtons = document.querySelectorAll('[data-sindicato-housing-sub]');
            const sindicatoViviendaParentSelect = document.getElementById('sindicato-vivienda-parent-select');
            const sindicatoViviendaTerritorySelect = document.getElementById('sindicato-vivienda-territory-select');
            const sindicatoViviendaMunicipalitySelect = document.getElementById('sindicato-vivienda-municipality-select');
            const sindicatoMapTerritoryTreeMount = document.getElementById('sindicato-map-territory-tree-mount');
            const sindicatoCoordSubnav = document.getElementById('sindicato-coordination-subnav');
            const sindicatoCoordSubButtons = document.querySelectorAll('[data-sindicato-coord-sub]');
            /* CRM (12-07-2026) — selector de organización del CRM */
            const sindicatoCrmOrgSelect = document.getElementById('sindicato-crm-org-select');
            const sindicatoCrmOrgLabel = document.getElementById('sindicato-crm-org-label');
            const sindicatoWikiSubnav = document.getElementById('sindicato-wiki-subnav');
            const sindicatoWikiSubButtons = document.querySelectorAll('[data-sindicato-wiki-sub]');
            const sindicatoWorkplaceSearch = document.getElementById('sindicato-workplace-search');
            const sindicatoWorkplaceSelect = document.getElementById('sindicato-workplace-select');
            const sindicatoWorkplacesViewNav = document.getElementById('sindicato-workplaces-view-nav');
            const sindicatoWorkplaceSectionNav = document.getElementById('sindicato-workplace-section-nav');
            const sindicatoSectionButtons = document.querySelectorAll('[data-sindicato-section]');
            const sindicatoAddCompanySidebarMount = document.getElementById('sindicato-add-company-sidebar-mount');
            const mapSelectedTerritoryBar = document.getElementById('map-selected-territory-bar');
            const mapSelectedTerritoryName = document.getElementById('map-selected-territory-name');
            const mapSelectedTerritoryInfoBtn = document.getElementById('map-selected-territory-info-btn');
            const moduleBody = document.getElementById('template-module-body');
            const moduleBodyLabel = document.getElementById('template-module-body-label');
            const portadaWelcomeLogo = document.getElementById('portada-welcome-logo');
            const homeTitle = document.getElementById('template-home-title');

            const SINDICATO_MODULE = 'sindicato';
            let activeLocale = 'es';

            /* F3 (20-07-2026): resolución de DATASET ('es'|'ie') delegada en
               SINDICAPP_SINDICATO.localeKey — 'ca' cae al dataset 'es' (ADR 0018).
               Fallback local por si el módulo sindicato no cargó. */
            function datasetKey(locale) {
                const loc = locale || activeLocale;
                const lk = window.SINDICAPP_SINDICATO?.localeKey;
                return lk ? lk(loc) : (loc === 'ie' ? 'ie' : 'es');
            }

            function getLocalePack() {
                if (activeLocale === 'ca' && window.SINDICAPP_CA) return window.SINDICAPP_CA;
                return datasetKey() === 'es' ? window.SINDICAPP_ES : window.SINDICAPP_IE;
            }

            function getLocaleUi(locale) {
                const loc = locale || activeLocale;
                const pack = (loc === 'ca' && window.SINDICAPP_CA) ? window.SINDICAPP_CA
                    : (datasetKey(loc) === 'es' ? window.SINDICAPP_ES : window.SINDICAPP_IE);
                if (pack && pack.localeUi) return pack.localeUi;
                return {};
            }

            function getModuleLabels() {
                const pack = getLocalePack();
                if (pack && pack.moduleLabels) return pack.moduleLabels;
                return moduleLabels;
            }

            function getLocaleNavMap() {
                const pack = getLocalePack();
                return (pack && pack.nav) ? pack.nav : {};
            }

            const moduleLabels = {
                self: 'Self',
                sindicato: 'Syndicate'
            };

            let activeModule = null;
            let lastMapTerritorySelection = null;
            let activeSindicatoSub = '';
            let activeSindicatoWorkplace = '';
            let activeSindicatoSection = 'overview';
            let activeSindicatoSector = '';
            let activeSindicatoUnion = '';
            let activeSindicatoUnionSection = 'overview';
            let activeSindicatoCoordSub = 'afiliadas';
            /* CRM (12-07-2026) — organización activa y estado de vista por módulo */
            let activeSindicatoCrmOrg = 'sindicapp';
            let sindicatoCrmMemberQuery = '';
            let sindicatoCrmMemberFilter = 'todas';
            let sindicatoCrmFinanzasView = 'resumen';
            let sindicatoCrmDocFilter = 'todas';
            let activeSindicatoWikiSub = 'index';
            /* 13-07-2026: página wiki personalizada por entidad (empresa/sector/sindicato/territorio). */
            let activeSindicatoWikiEntityKind = '';
            let activeSindicatoWikiEntityId = '';
            /* Vivienda / Housing (13-07-2026) — huelgómetro | alarmas */
            let activeSindicatoHousingSub = 'huelgometro';
            let activeSindicatoViviendaParent = '';
            let activeSindicatoViviendaTerritory = '';
            let activeSindicatoViviendaBuilding = ''; /* R7 — perfil de edificio en Territorios */
            let activeSindicatoViviendaMunicipality = ''; /* Territorios — municipio (solo estructura, 12-07-2026) */
            /* Reestructura 12-07-2026: Empresas y Territorios tienen dos vistas, Mapa y Lista.
               Default «map» (geography-first). El antiguo sub «map» de primer nivel se
               redirige a Territorios→Mapa. */
            let activeSindicatoViviendaView = 'map';
            let activeSindicatoWorkplacesView = 'map';
            let activeSindicatoMapTerritory = '';
            let activeSindicatoFeedScope = 'general';
            let activeSindicatoFeedSectorId = '';
            let activeSindicatoFeedTerritoryId = '';
            let activeSindicatoFeedCompanyId = '';
            let activeSindicatoForumThread = '';
            /* Consumidores y Estudiantes (13-07-2026) — perfil abierto en cada directorio */
            let activeSindicatoConsumidor = '';
            let activeSindicatoEstudiantesCentro = '';
            /* Profesionales y Autónomos (17-07-2026) — perfil abierto en cada directorio */
            let activeSindicatoProfesional = '';
            let activeSindicatoAutonomo = '';
            /* Filtros de los selectores de sidebar (17-07-2026) */
            let sindicatoProfesionalesFilter = '';
            let sindicatoConsumidoresFilter = '';
            let sindicatoEstudiantesFilter = '';
            let sindicatoAutonomosFilter = '';
            let sindicatoHousingFilter = '';
            /* Versión única (17-07-2026, tarde): las tres versiones (Clásica/Propuesta/
               Final) se unificaron en una sola — el shell por anillos. La Clásica queda
               archivada como snapshot autocontenido en `legacy/Sindicapp 170726.html`.
               `activeWebVersion` se mantiene fijo en 'propuesta' para no reescribir las
               numerosas ramas que consultan la versión; ya no hay conmutador. */
            const activeWebVersion = 'propuesta';
            let activePropuestaRole = (function () {
                try {
                    let r = localStorage.getItem('sindicapp-propuesta-role');
                    /* 20-07-2026 (ADR 0024): 'militante' desaparece como rol de relación —
                       el estado persistido pre-migración se convierte en 'afiliado' (el
                       acceso interno lo dan ahora los cargos). */
                    if (r === 'militante') {
                        r = 'afiliado';
                        try { localStorage.setItem('sindicapp-propuesta-role', r); } catch (e2) { /* demo */ }
                    }
                    return ['visitante', 'usuario', 'afiliado'].includes(r) ? r : 'visitante';
                } catch (e) { return 'visitante'; }
            })();
            /* 20-07-2026 (ideas 42+43, ADR 0024): cargo demo ocupado — persiste en
               'sindicapp-propuesta-cargo' (el reset demo borra sindicapp-*, cubierto).
               20-07 tarde (idea 63): el formato pasa a JSON {cargoId, orgId} para los
               cargos de equipo ('team:…') y ad hoc ('adhoc:…'); el formato string
               antiguo (arquetipos) se sigue aceptando — retro-compat sin migración. */
            const isValidCargoId = (cg) => ['ninguno', 'coordinacion', 'accion', 'comunicacion', 'datos'].includes(cg)
                || String(cg || '').indexOf('team:') === 0 || String(cg || '').indexOf('adhoc:') === 0;
            let activePropuestaCargoOrg = '';
            let activePropuestaCargo = (function () {
                try {
                    const raw = localStorage.getItem('sindicapp-propuesta-cargo');
                    if (raw && raw.charAt(0) === '{') {
                        const st = JSON.parse(raw);
                        if (st && isValidCargoId(st.cargoId)) {
                            activePropuestaCargoOrg = String(st.orgId || '');
                            return st.cargoId;
                        }
                        return 'ninguno';
                    }
                    return isValidCargoId(raw) ? raw : 'ninguno';
                } catch (e) { return 'ninguno'; }
            })();
            /* Persistencia del cargo ocupado en el formato nuevo {cargoId, orgId}. */
            function persistPropuestaCargo() {
                try {
                    localStorage.setItem('sindicapp-propuesta-cargo',
                        JSON.stringify({ cargoId: activePropuestaCargo, orgId: activePropuestaCargoOrg }));
                } catch (err) { /* demo */ }
            }
            /* 20-07-2026 (ADR 0025): grupo abierto del acordeón de la nav propuesta —
               'sindicatos' (colectivos) o 'funcionalidades' (herramientas). Solo uno
               abierto a la vez; persiste (el reset demo borra sindicapp-*, cubierto). */
            let activePropuestaNavGroup = (function () {
                try {
                    const g = localStorage.getItem('sindicapp-nav-group');
                    return ['sindicatos', 'funcionalidades'].includes(g) ? g : 'sindicatos';
                } catch (e) { return 'sindicatos'; }
            })();
            /* 20-07-2026 (ADR 0025): último sub pintado en la nav — para auto-expandir
               el grupo SOLO cuando el sub activo cambia, no en cada re-render (si no,
               abrir el otro grupo con la cabecera se desharía al instante). */
            let lastPropuestaNavSub = null;
            /* 20-07 tarde (idea 68 parcial): activeSindicatoAnilloScreen purgado — el
               sub `anillo` ya no existe como ruta. */
            /* Descomposición del CRM (17-07): desde qué módulo de colectivo se entró a la
               gestión (para el banner de contexto y las peculiaridades por tipo). */
            let activeCrmContextModule = '';
            /* Pestaña activa del CRM inline dentro de un equipo sindical. */
            let activeEquipoCrmTab = 'afiliadas';
            /* Sección activa del perfil de entidad en los tipos sin sidebar de secciones
               (profesionales/autónomos/consumidores/estudiantes): 'resumen' | 'crm'. */
            let activeEquipoSection = 'resumen';
            /* Equipo sindical de inquilinas abierto (directorio por comunidad). */
            let activeSindicatoHousingUnion = '';
            let sindicatoWorkplaceFilter = '';
            let sindicatoUnionFilter = '';
            let activeSelfSub = 'sindicato';
            let activeSelfSindicatoSection = 'overview';
            const USER_WORKPLACE_BY_LOCALE = { es: 'zona-franca-logistica', ie: 'docklands-logistics' };
            let currentMap = null;
            let mapInitialized = false;
            let boundaryControlsInitialized = false;
            let sindicatoMarkersLayer = null;

            const LOCALE_STORAGE_KEY = 'sindicapp-locale';
            const LOCALE_CONFIG = {
                ie: {
                    mapCenter: [53.4129, -7.9423],
                    mapZoom: 7,
                    europePreChecked: ['Ireland'],
                    htmlLang: 'en'
                },
                es: {
                    mapCenter: [41.7282, 1.8239],
                    mapZoom: 7,
                    europePreChecked: ['Catalunya', 'Spain'],
                    htmlLang: 'es'
                },
                /* 'ca' comparte territorio y mapa con 'es' — solo cambia el idioma. */
                ca: {
                    mapCenter: [41.7282, 1.8239],
                    mapZoom: 7,
                    europePreChecked: ['Catalunya', 'Spain'],
                    htmlLang: 'ca'
                }
            };
            const EUROPE_PIN_MAP = {
                'NUTS Regions': 'nuts-content',
                'Catalunya': 'catalonia-content',
                'Spain': 'espana-content',
                'Ireland': 'ireland-content'
            };
            const languageButtons = document.querySelectorAll('.template-language-btn[data-locale]');

            function getLocaleConfig(locale) {
                return LOCALE_CONFIG[locale] || LOCALE_CONFIG.ie;
            }

            function syncEuropePreCheckedOverride(locale) {
                window.EUROPE_PRE_CHECKED_OVERRIDE = getLocaleConfig(locale).europePreChecked.slice();
            }

            function readStoredLocale() {
                try {
                    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
                    return stored === 'es' || stored === 'ie' || stored === 'ca' ? stored : null;
                } catch (_) {
                    return null;
                }
            }

            function applyEuropePinnedTerritories(countries) {
                const pinned = Array.isArray(countries) ? countries : [];
                document.querySelectorAll('.continent-country-list[data-continent="europe"] input[type="checkbox"]').forEach((cb) => {
                    const country = cb.dataset.country.replace(/_/g, ' ');
                    const shouldCheck = pinned.includes(country);
                    if (cb.checked !== shouldCheck) {
                        cb.checked = shouldCheck;
                        cb.dispatchEvent(new Event('change', { bubbles: true }));
                        return;
                    }
                    const contentId = EUROPE_PIN_MAP[country];
                    if (!contentId) return;
                    const subgroup = document.getElementById(contentId)?.closest('.border-subgroup');
                    if (subgroup) subgroup.style.display = shouldCheck ? '' : 'none';
                });
            }

            function updateLanguageButtons() {
                languageButtons.forEach((btn) => {
                    const loc = btn.getAttribute('data-locale');
                    btn.setAttribute('aria-pressed', loc === activeLocale ? 'true' : 'false');
                });
            }

            function applyLocaleToDocument() {
                const cfg = getLocaleConfig(activeLocale);
                document.documentElement.lang = cfg.htmlLang || 'en';
                document.body.classList.remove('sindicapp-locale-ie', 'sindicapp-locale-es', 'sindicapp-locale-ca');
                document.body.classList.add('sindicapp-locale-' + (activeLocale === 'ie' ? 'ie' : activeLocale));
                syncEuropePreCheckedOverride(activeLocale);
            }

            function recenterMapForLocale() {
                const cfg = getLocaleConfig(activeLocale);
                if (!currentMap || !cfg) return;
                try {
                    currentMap.setView(cfg.mapCenter, cfg.mapZoom);
                } catch (_) {}
            }

            function initLocaleEarly() {
                activeLocale = readStoredLocale() || window.__sindicappEarlyLocale || 'es';
                syncEuropePreCheckedOverride(activeLocale);
                document.documentElement.lang = getLocaleConfig(activeLocale).htmlLang || 'en';
                document.body.classList.remove('sindicapp-locale-ie', 'sindicapp-locale-es', 'sindicapp-locale-ca');
                document.body.classList.add('sindicapp-locale-' + (activeLocale === 'ie' ? 'ie' : activeLocale));
            }

            function setActiveLocale(locale, options = {}) {
                /* 17-07-2026: tres locales — 'ca' es idioma sobre el dataset 'es' (ADR 0018). */
                const next = ['es', 'ca'].includes(locale) ? locale : 'ie';
                if (next === activeLocale && !options.force) return;
                activeLocale = next;
                applyLocaleToDocument();
                updateLanguageButtons();
                if (options.persist !== false) {
                    try {
                        localStorage.setItem(LOCALE_STORAGE_KEY, activeLocale);
                    } catch (_) {}
                }
                if (boundaryControlsInitialized) {
                    applyEuropePinnedTerritories(getLocaleConfig(activeLocale).europePreChecked);
                }
                recenterMapForLocale();
                if (options.skipRelocalize !== true) {
                    relocalizeForLocale();
                }
                document.body.classList.remove('sindicapp-booting');
            }

            window.__sindicappApplyLocale = function (locale) {
                setActiveLocale(locale);
            };
            if (window.__sindicappLocaleQueue) {
                setActiveLocale(window.__sindicappLocaleQueue);
                window.__sindicappLocaleQueue = null;
            }

            function syncChromeSpacer() {
                const chrome = document.getElementById('sindicapp-mobile-chrome-float');
                const spacer = document.getElementById('sindicapp-chrome-spacer');
                if (!chrome || !spacer) return;
                spacer.style.width = chrome.offsetWidth + 'px';
                spacer.style.minHeight = chrome.offsetHeight + 'px';
            }

            function syncMobileToggleLabels() {
                if (!mobileToggle) return;
                const ui = getLocaleUi();
                const open = document.body.classList.contains('sidebar-open');
                mobileToggle.textContent = open ? (ui.background || 'Background') : (ui.sidebar || 'Sidebar');
                mobileToggle.setAttribute('aria-label', open ? (ui.showBackgroundAria || 'Show background') : (ui.mobileToggleAria || ui.sidebar || 'Show sidebar'));
                mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                syncChromeSpacer();
            }

            function refreshLocaleNavLabels() {
                const ui = getLocaleUi();
                const welcome = document.getElementById('portada-welcome-title')
                    || document.querySelector('.template-welcome');
                if (welcome && !activeModule) {
                    const c = getSindicatoCopy();
                    if (c.welcomeTitle) welcome.textContent = c.welcomeTitle;
                    else if (ui.welcome) welcome.textContent = ui.welcome;
                }
                syncPortadaWelcome();
                const mapPlaceholder = document.querySelector('.map-placeholder');
                if (mapPlaceholder && ui.mapHint) mapPlaceholder.innerHTML = ui.mapHint;
                syncMobileToggleLabels();
                const mapInfoBtn = document.getElementById('map-selected-territory-info-btn');
                if (mapInfoBtn && ui.territoryInfo) mapInfoBtn.textContent = ui.territoryInfo;
                const territoryInfoBtn = document.getElementById('territory-info-box-info-btn');
                if (territoryInfoBtn && ui.territoryInfo) territoryInfoBtn.textContent = ui.territoryInfo;
                /* Bloque «Proveedor de mapa» retirado del DOM (12-07-2026). */
                const bordersTitle = document.getElementById('geo-borders-title');
                if (bordersTitle && ui.bordersTitle) bordersTitle.textContent = `🗺️ ${ui.bordersTitle}`;
                const bordersHelp1 = document.getElementById('geo-borders-help-1');
                if (bordersHelp1 && ui.bordersHelp1) bordersHelp1.innerHTML = ui.bordersHelp1;
                const bordersHelp2 = document.getElementById('geo-borders-help-2');
                if (bordersHelp2 && ui.bordersHelp2) bordersHelp2.innerHTML = `<em>${ui.bordersHelp2}</em>`;
                const bordersHelp3 = document.getElementById('geo-borders-help-3');
                if (bordersHelp3 && ui.bordersHelp3) bordersHelp3.innerHTML = `<em>${ui.bordersHelp3}</em>`;
                const bordersHelp4 = document.getElementById('geo-borders-help-4');
                if (bordersHelp4 && ui.bordersHelp4) bordersHelp4.innerHTML = `<em>${ui.bordersHelp4}</em>`;
                Object.entries(getLocaleNavMap()).forEach(([selector, label]) => {
                    document.querySelectorAll(`.template-module-btn${selector}`).forEach((btn) => {
                        const icon = btn.querySelector('[aria-hidden="true"]');
                        if (icon) btn.innerHTML = `${icon.outerHTML} ${label}`;
                        else btn.textContent = label;
                    });
                });
                /* Panel stub de Sindicato retirado (12-07-2026) — ya no hay título que sincronizar. */
                const sindNavTree = document.getElementById('sindicato-nav-tree');
                if (sindNavTree && ui.sindicatoNavAria) sindNavTree.setAttribute('aria-label', ui.sindicatoNavAria);
                if (activeModule === SINDICATO_MODULE) refreshSindicatoSidebarLabels();
                refreshSelfNavLabels();
            }

            function relocalizeForLocale() {
                refreshLocaleNavLabels();
                updateModuleBodyLabel();
                if (activeModule === SINDICATO_MODULE) {
                    if (activeSindicatoWorkplace && window.SINDICAPP_SINDICATO
                        && !window.SINDICAPP_SINDICATO.findWorkplace(activeLocale, activeSindicatoWorkplace)) {
                        activeSindicatoWorkplace = '';
                    }
                    rebuildSindicatoUnionSelect();
                    refreshSindicatoSidebarLabels();
                    if (isSindicatoLocationWorkspace()) {
                        syncSindicatoLocationBridge();
                        syncSindicatoMapMarkers();
                    } else if (isSindicatoMapVisible()) {
                        syncSindicatoMapMarkers();
                    } else {
                        syncSindicatoWorkspace();
                    }
                }
                if (activeModule === 'self') {
                    syncTextWorkspace();
                }
            }

            function getSindicatoCopy() {
                const pack = window.SINDICAPP_SINDICATO;
                if (pack && typeof pack.t === 'function') return pack.t(activeLocale);
                return {};
            }

            function userWorkplaceStorageKey() { return `sindicapp-user-workplace-${datasetKey()}`; }

            function getUserWorkplaceId() {
                /* 17-07-2026: preferencia elegida por la persona (persistida), luego el
                   valor por defecto por locale, luego la primera empresa disponible. */
                let chosen = '';
                try { chosen = localStorage.getItem(userWorkplaceStorageKey()) || ''; } catch (e) { /* demo */ }
                if (chosen && window.SINDICAPP_SINDICATO && window.SINDICAPP_SINDICATO.findWorkplace(activeLocale, chosen)) {
                    return chosen;
                }
                const preferred = USER_WORKPLACE_BY_LOCALE[activeLocale] || USER_WORKPLACE_BY_LOCALE.ie;
                if (window.SINDICAPP_SINDICATO && window.SINDICAPP_SINDICATO.findWorkplace(activeLocale, preferred)) {
                    return preferred;
                }
                const list = window.SINDICAPP_SINDICATO?.getWorkplaces(activeLocale) || [];
                return list[0]?.id || '';
            }

            let selfWorkplaceFilter = '';
            const selfWorkplaceSearch = document.getElementById('self-workplace-search');
            const selfWorkplaceSelect = document.getElementById('self-workplace-select');

            function rebuildSelfWorkplaceSelect() {
                if (!selfWorkplaceSelect || !window.SINDICAPP_SINDICATO) return;
                const q = selfWorkplaceFilter.trim().toLowerCase();
                const list = window.SINDICAPP_SINDICATO.getWorkplaces(activeLocale).filter((w) =>
                    !q || w.name.toLowerCase().includes(q) || (w.sector || '').toLowerCase().includes(q));
                const current = getUserWorkplaceId();
                selfWorkplaceSelect.innerHTML = '';
                list.forEach((w) => {
                    const opt = document.createElement('option');
                    opt.value = w.id;
                    opt.textContent = `${w.name} (${w.sector})`;
                    selfWorkplaceSelect.appendChild(opt);
                });
                selfWorkplaceSelect.value = list.some((w) => w.id === current) ? current : '';
            }

            if (selfWorkplaceSelect) {
                selfWorkplaceSelect.addEventListener('change', () => {
                    const id = selfWorkplaceSelect.value;
                    if (!id) return;
                    try { localStorage.setItem(userWorkplaceStorageKey(), id); } catch (e) { /* demo */ }
                    refreshSelfNavLabels();
                    syncTextWorkspace();
                });
            }
            if (selfWorkplaceSearch) {
                selfWorkplaceSearch.addEventListener('input', () => {
                    selfWorkplaceFilter = selfWorkplaceSearch.value;
                    rebuildSelfWorkplaceSelect();
                });
            }

            function refreshSelfNavLabels() {
                const s = (getLocalePack() && getLocalePack().selfSections) || {};
                const c = getSindicatoCopy();
                if (selfSindicatoWorkplaceLabel && s.selfWorkplaceLabel) {
                    selfSindicatoWorkplaceLabel.textContent = s.selfWorkplaceLabel;
                }
                const wpId = getUserWorkplaceId();
                const wp = window.SINDICAPP_SINDICATO?.findWorkplace(activeLocale, wpId);
                if (selfSindicatoWorkplaceName) {
                    selfSindicatoWorkplaceName.textContent = wp
                        ? `${wp.name} — ${wp.sector}`
                        : (s.selfNoWorkplace || '—');
                }
                rebuildSelfWorkplaceSelect();
                selfSindicatoSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-self-sindicato-section');
                    const label = (c.sections && c.sections[id]) || id;
                    const icon = btn.querySelector('[aria-hidden="true"]');
                    if (icon) btn.innerHTML = `${icon.outerHTML} ${label}`;
                });
            }

            function isSelfSindicatoLocationWorkspace() {
                return activeModule === 'self'
                    && activeSelfSub === 'sindicato'
                    && activeSelfSindicatoSection === 'location';
            }

            function syncSelfSindicatoWorkspace() {
                if (!mapTextDisplay || !window.SINDICAPP_SINDICATO) return;
                /* Propuesta (17-07): el módulo Usuario ES el anillo usuario — entero.
                   Con rol visitante se explica y ofrece el cambio de rol contextual. */
                if (activeWebVersion === 'propuesta'
                    && !window.SINDICAPP_SINDICATO.propuestaRoleAllows(activePropuestaRole, 'usuario')) {
                    mapTextDisplay.innerHTML = window.SINDICAPP_SINDICATO.buildPropuestaLockedHtml(activeLocale, 'usuario', activePropuestaRole);
                    return;
                }
                /* Propuesta: «Mis casos y documentos» vive dentro del módulo Usuario. */
                if (activeWebVersion === 'propuesta' && activeSelfSindicatoSection === 'miscasos') {
                    /* 20-07 (idea 43): el simulador «ver como» vive dentro de esta pantalla. */
                    mapTextDisplay.innerHTML = window.SINDICAPP_SINDICATO.buildPropuestaScreenHtml(activeLocale, 'miscasos', activePropuestaRole, '', activePropuestaCargo);
                    return;
                }
                const wpId = getUserWorkplaceId();
                mapTextDisplay.innerHTML = window.SINDICAPP_SINDICATO.buildWorkspaceHtml(
                    activeLocale,
                    'workplaces',
                    wpId,
                    activeSelfSindicatoSection === 'miscasos' ? 'overview' : activeSelfSindicatoSection,
                    '',
                    { selfView: true } /* R5 — la tarjeta de verificación solo aparece en el módulo Usuario */
                );
            }

            function syncSelfSindicatoLocationBridge() {
                if (!mapTextDisplay || !window.SINDICAPP_SINDICATO) return;
                if (activeWebVersion === 'propuesta'
                    && !window.SINDICAPP_SINDICATO.propuestaRoleAllows(activePropuestaRole, 'usuario')) {
                    mapTextDisplay.innerHTML = window.SINDICAPP_SINDICATO.buildPropuestaLockedHtml(activeLocale, 'usuario', activePropuestaRole);
                    return;
                }
                const wpId = getUserWorkplaceId();
                const wp = window.SINDICAPP_SINDICATO.findWorkplace(activeLocale, wpId);
                if (!wp) return;
                mapTextDisplay.innerHTML = window.SINDICAPP_SINDICATO.buildLocationBridgeHtml(activeLocale, wp);
                if (mapInitialized && currentMap) {
                    focusSindicatoWorkplaceOnMap(wpId);
                } else {
                    initBoundaryControlsOnce();
                    initOpenStreetMap();
                    requestAnimationFrame(() => focusSindicatoWorkplaceOnMap(wpId));
                }
            }

            function setSelfSindicatoSection(sectionId) {
                const allowed = ['overview', 'location', 'reports', 'wages', 'convenio', 'action', 'miscasos'];
                activeSelfSindicatoSection = allowed.includes(sectionId) ? sectionId : 'overview';
                selfSindicatoSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-self-sindicato-section');
                    btn.classList.toggle('active', id === activeSelfSindicatoSection);
                });
                refreshSelfNavLabels();
                syncTextModeBodyClasses();
                syncTextWorkspace();
                updateModuleBodyLabel();
            }

            function setSelfSub(subId) {
                activeSelfSub = 'sindicato';
                updateModuleNavTrees();
                applyVisiblePanels();
                setSelfSindicatoSection(activeSelfSindicatoSection || 'overview');
            }

            function rebuildSindicatoWorkplaceSelect() {
                if (!sindicatoWorkplaceSelect || !window.SINDICAPP_SINDICATO) return;
                const c = getSindicatoCopy();
                const q = sindicatoWorkplaceFilter.trim().toLowerCase();
                const list = window.SINDICAPP_SINDICATO.getWorkplaces(activeLocale).filter((w) =>
                    !q || w.name.toLowerCase().includes(q) || w.sector.toLowerCase().includes(q)
                );
                sindicatoWorkplaceSelect.innerHTML = `<option value="">${c.selectWorkplace || 'Select workplace…'}</option>`;
                list.forEach((w) => {
                    const opt = document.createElement('option');
                    opt.value = w.id;
                    opt.textContent = `${w.name} (${w.sector})`;
                    sindicatoWorkplaceSelect.appendChild(opt);
                });
                if (activeSindicatoWorkplace && list.some((w) => w.id === activeSindicatoWorkplace)) {
                    sindicatoWorkplaceSelect.value = activeSindicatoWorkplace;
                } else {
                    sindicatoWorkplaceSelect.value = '';
                }
            }

            function refreshSindicatoSidebarLabels() {
                const c = getSindicatoCopy();
                const wpIntro = document.getElementById('sindicato-workplaces-intro');
                const unionsIntro = document.getElementById('sindicato-unions-intro');
                const feedIntro = document.getElementById('sindicato-feed-intro');
                const sectoresIntro = document.getElementById('sindicato-sectores-intro');
                const coordinationIntro = document.getElementById('sindicato-coordination-intro');
                const wikiIntro = document.getElementById('sindicato-wiki-intro');
                const viviendaIntro = document.getElementById('sindicato-vivienda-intro');
                const viviendaParentLabel = document.getElementById('sindicato-vivienda-parent-label');
                const viviendaTerritoryLabel = document.getElementById('sindicato-vivienda-territory-label');
                const viviendaMunicipalityLabel = document.getElementById('sindicato-vivienda-municipality-label');
                if (wpIntro && c.workplacesIntro) wpIntro.textContent = c.workplacesIntro;
                /* Toggles Mapa/Lista (12-07-2026) */
                document.querySelectorAll('[data-sindicato-vivienda-view], [data-sindicato-workplaces-view]').forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-vivienda-view') || btn.getAttribute('data-sindicato-workplaces-view');
                    const label = (c.viewToggle && c.viewToggle[id]) || (id === 'map' ? 'Mapa' : 'Lista');
                    const icon = btn.querySelector('[aria-hidden="true"]');
                    if (icon) btn.innerHTML = `${icon.outerHTML} ${label}`;
                });
                if (unionsIntro && c.unionsIntro) unionsIntro.textContent = c.unionsIntro;
                /* 13-07-2026: la sidebar de «feed» es ahora la intro de Red Social; el foro
                   tiene bloque propio (#sindicato-foro-intro) con la intro de ámbitos. */
                if (feedIntro && (c.redSocialIntroSidebar || c.feedIntroSidebar)) {
                    feedIntro.textContent = c.redSocialIntroSidebar || c.feedIntroSidebar;
                }
                const foroIntro = document.getElementById('sindicato-foro-intro');
                if (foroIntro && (c.feedIntroSidebar || c.feedIntro)) {
                    foroIntro.textContent = c.feedIntroSidebar || c.feedIntro;
                }
                const consumidoresIntroEl = document.getElementById('sindicato-consumidores-intro');
                if (consumidoresIntroEl && c.consumidoresIntro) consumidoresIntroEl.textContent = c.consumidoresIntro;
                const estudiantesIntroEl = document.getElementById('sindicato-estudiantes-intro');
                if (estudiantesIntroEl && c.estudiantesIntro) estudiantesIntroEl.textContent = c.estudiantesIntro;
                const profesionalesIntroEl = document.getElementById('sindicato-profesionales-intro');
                if (profesionalesIntroEl && c.profesionalesIntro) profesionalesIntroEl.textContent = c.profesionalesIntro;
                const autonomosIntroEl = document.getElementById('sindicato-autonomos-intro');
                if (autonomosIntroEl && c.autonomosIntro) autonomosIntroEl.textContent = c.autonomosIntro;
                if (sindicatoFeedCompanyLabel && c.feedCompanyFilter) {
                    sindicatoFeedCompanyLabel.textContent = c.feedCompanyFilter;
                }
                sindicatoFeedScopeButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-feed-scope');
                    const label = (c.feedSubs && c.feedSubs[id]) || id;
                    const icon = btn.querySelector('[aria-hidden="true"]');
                    if (icon) btn.innerHTML = `${icon.outerHTML} ${label}`;
                });
                if (sectoresIntro && c.sectoresIntro) sectoresIntro.textContent = c.sectoresIntro;
                if (coordinationIntro && c.coordinationIntroSidebar) coordinationIntro.textContent = c.coordinationIntroSidebar;
                else if (coordinationIntro && c.coordinationIntro) coordinationIntro.textContent = c.coordinationIntro;
                if (sindicatoCrmOrgLabel && c.crmOrgLabel) {
                    sindicatoCrmOrgLabel.textContent = c.crmOrgLabel;
                    if (sindicatoCrmOrgSelect) sindicatoCrmOrgSelect.setAttribute('aria-label', c.crmOrgLabel);
                }
                rebuildSindicatoCrmOrgSelect();
                if (wikiIntro && c.wikiIntroSidebar) wikiIntro.textContent = c.wikiIntroSidebar;
                if (viviendaIntro && c.viviendaIntroSidebar) viviendaIntro.textContent = c.viviendaIntroSidebar;
                /* Reforma legibilidad 12-07: labels cortos («Provincia») encima del dropdown;
                   el «Selecciona…» completo queda en el aria-label del select. */
                if (viviendaParentLabel && (c.viviendaParentShort || c.viviendaParentLabel)) viviendaParentLabel.textContent = c.viviendaParentShort || c.viviendaParentLabel;
                if (viviendaTerritoryLabel && (c.viviendaTerritoryShort || c.viviendaTerritoryLabel)) viviendaTerritoryLabel.textContent = c.viviendaTerritoryShort || c.viviendaTerritoryLabel;
                if (viviendaMunicipalityLabel && (c.viviendaMunicipalityShort || c.viviendaMunicipalityLabel)) viviendaMunicipalityLabel.textContent = c.viviendaMunicipalityShort || c.viviendaMunicipalityLabel;
                sindicatoUnionSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-union-section');
                    /* Secciones crm-* (decreto 18-07): label desde coordSubs del CRM. */
                    const label = (c.unionSections && c.unionSections[id])
                        || (id.indexOf('crm-') === 0 && c.coordSubs && c.coordSubs[id.slice(4)])
                        || id;
                    const icon = btn.querySelector('[aria-hidden="true"]');
                    /* 20-07 (ADR 0024): candado informativo en los crm-* que el cargo
                       actual no concede — se marca pero SIGUE siendo clicable (el panel
                       explica quién lo lleva; doctrina ADR 0014). El emoji original se
                       guarda en data-base-icon para poder restaurarlo al desbloquear. */
                    const S = window.SINDICAPP_SINDICATO;
                    const locked = id.indexOf('crm-') === 0 && S && S.cargoAllows
                        && !(S.propuestaRoleAllows(activePropuestaRole, 'afiliado')
                            && S.cargoAllows(activePropuestaCargo, id));
                    btn.classList.toggle('propuesta-item-locked', Boolean(locked));
                    if (icon) {
                        if (!btn.dataset.baseIcon) btn.dataset.baseIcon = icon.textContent;
                        icon.textContent = locked ? '🔒' : btn.dataset.baseIcon;
                        btn.innerHTML = `${icon.outerHTML} ${label}`;
                    }
                    if (locked) {
                        const holder = S.cargoForCapability ? S.cargoForCapability(id) : 'coordinacion';
                        const holderName = (c.propuestaCargos && c.propuestaCargos[holder]) || holder;
                        btn.setAttribute('aria-label', `${label} — ${c.propuestaCargoLockedTitle || ''} (${holderName})`);
                    } else {
                        btn.removeAttribute('aria-label');
                    }
                });
                /* 20-07 tarde (idea 70): sub-etiquetas del grupo Gestión en la sidebar
                   estática de Trabajadores — texto localizado via COPY.crmNavGroups. */
                document.querySelectorAll('[data-crm-nav-sublabel]').forEach((el) => {
                    const id = el.getAttribute('data-crm-nav-sublabel');
                    if (c.crmNavGroups && c.crmNavGroups[id]) el.textContent = c.crmNavGroups[id];
                });
                if (sindicatoWorkplaceSearch && c.searchPlaceholder) {
                    sindicatoWorkplaceSearch.placeholder = c.searchPlaceholder;
                    sindicatoWorkplaceSearch.setAttribute('aria-label', c.searchPlaceholder);
                }
                if (sindicatoUnionSearch && c.unionSearchPlaceholder) {
                    sindicatoUnionSearch.placeholder = c.unionSearchPlaceholder;
                    sindicatoUnionSearch.setAttribute('aria-label', c.unionSearchPlaceholder);
                }
                [sindicatoProfesionalesSearch, sindicatoConsumidoresSearch, sindicatoEstudiantesSearch].forEach((inp) => {
                    if (inp && c.searchPlaceholder) inp.placeholder = c.searchPlaceholder;
                });
                /* 20-07 (idea 52): placeholder/aria localizados de la búsqueda global. */
                const globalSearchEl = document.getElementById('sindicapp-global-search');
                if (globalSearchEl && c.searchGlobalPlaceholder) {
                    globalSearchEl.placeholder = c.searchGlobalPlaceholder;
                    globalSearchEl.setAttribute('aria-label', c.searchGlobalPlaceholder);
                }
                sindicatoSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-sub');
                    const label = (c.subs && c.subs[id]) || id;
                    const icon = btn.querySelector('[aria-hidden="true"]');
                    if (icon) btn.innerHTML = `${icon.outerHTML} ${label}`;
                });
                sindicatoSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-section');
                    const label = (c.sections && c.sections[id]) || id;
                    const icon = btn.querySelector('[aria-hidden="true"]');
                    if (icon) btn.innerHTML = `${icon.outerHTML} ${label}`;
                });
                sindicatoCoordSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-coord-sub');
                    const label = (c.coordSubs && c.coordSubs[id]) || id;
                    const icon = btn.querySelector('[aria-hidden="true"]');
                    if (icon) btn.innerHTML = `${icon.outerHTML} ${label}`;
                });
                sindicatoWikiSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-wiki-sub');
                    const label = (c.wikiSubs && c.wikiSubs[id]) || id;
                    const icon = btn.querySelector('[aria-hidden="true"]');
                    if (icon) btn.innerHTML = `${icon.outerHTML} ${label}`;
                });
                sindicatoHousingSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-housing-sub');
                    const label = (c.housingSubs && c.housingSubs[id]) || id;
                    const icon = btn.querySelector('[aria-hidden="true"]');
                    if (icon) btn.innerHTML = `${icon.outerHTML} ${label}`;
                });
                const housingIntroEl = document.getElementById('sindicato-housing-intro');
                if (housingIntroEl && c.housingIntro) housingIntroEl.textContent = c.housingIntro;
                rebuildSindicatoWorkplaceSelect();
                renderSindicatoAddCompanySidebarForm();
                renderSindicatoSectoresTree();
                renderSindicatoFeedSidebar();
                rebuildSindicatoUnionSelect();
                rebuildSindicatoViviendaSelects();
                renderSindicatoMapTerritoryTree();
                syncPortadaWelcome();
            }

            function rebuildSindicatoViviendaSelects() {
                if (!window.SINDICAPP_SINDICATO || !sindicatoViviendaParentSelect || !sindicatoViviendaTerritorySelect) return;
                const c = getSindicatoCopy();
                const parents = window.SINDICAPP_SINDICATO.getTerritoryParents(activeLocale);
                const parentPlaceholder = c.viviendaParentLabel || 'Select region';
                const territoryPlaceholder = c.viviendaTerritoryLabel || 'Select territory';
                if (!activeSindicatoViviendaParent || !parents.some((p) => p.id === activeSindicatoViviendaParent)) {
                    activeSindicatoViviendaParent = parents[0]?.id || '';
                }
                sindicatoViviendaParentSelect.innerHTML = parents.map((p) =>
                    `<option value="${p.id}">${p.name}</option>`
                ).join('');
                sindicatoViviendaParentSelect.value = activeSindicatoViviendaParent || '';
                const subs = activeSindicatoViviendaParent
                    ? window.SINDICAPP_SINDICATO.getSubterritoriesForParent(activeLocale, activeSindicatoViviendaParent)
                    : [];
                if (!activeSindicatoViviendaTerritory || !subs.some((s) => s.id === activeSindicatoViviendaTerritory)) {
                    activeSindicatoViviendaTerritory = subs[0]?.id || '';
                }
                sindicatoViviendaTerritorySelect.innerHTML = subs.length
                    ? subs.map((s) => `<option value="${s.id}">${s.name}</option>`).join('')
                    : `<option value="">${territoryPlaceholder}</option>`;
                sindicatoViviendaTerritorySelect.value = activeSindicatoViviendaTerritory || '';
                sindicatoViviendaParentSelect.setAttribute('aria-label', parentPlaceholder);
                sindicatoViviendaTerritorySelect.setAttribute('aria-label', territoryPlaceholder);
                /* Territorios — tercer selector: municipio (solo estructura, 12-07-2026) */
                if (sindicatoViviendaMunicipalitySelect) {
                    const municipalityPlaceholder = c.viviendaMunicipalityLabel || 'Selecciona municipio';
                    const allLabel = c.viviendaMunicipalityAll || 'Toda la comarca';
                    const municipalities = activeSindicatoViviendaTerritory
                        ? (window.SINDICAPP_SINDICATO.getMunicipalitiesForTerritory?.(activeLocale, activeSindicatoViviendaTerritory) || [])
                        : [];
                    if (activeSindicatoViviendaMunicipality && !municipalities.some((m) => m.id === activeSindicatoViviendaMunicipality)) {
                        activeSindicatoViviendaMunicipality = '';
                    }
                    sindicatoViviendaMunicipalitySelect.innerHTML = `<option value="">${allLabel}</option>`
                        + municipalities.map((m) => `<option value="${m.id}">${m.name}</option>`).join('');
                    sindicatoViviendaMunicipalitySelect.value = activeSindicatoViviendaMunicipality || '';
                    sindicatoViviendaMunicipalitySelect.setAttribute('aria-label', municipalityPlaceholder);
                }
                /* Reforma legibilidad 12-07 — línea de ruta con la selección actual. */
                const pathEl = document.getElementById('sindicato-vivienda-path');
                if (pathEl) {
                    const parentName = parents.find((p) => p.id === activeSindicatoViviendaParent)?.name || '';
                    const terrName = subs.find((s) => s.id === activeSindicatoViviendaTerritory)?.name || '';
                    const munis = activeSindicatoViviendaTerritory
                        ? (window.SINDICAPP_SINDICATO.getMunicipalitiesForTerritory?.(activeLocale, activeSindicatoViviendaTerritory) || [])
                        : [];
                    const muniName = munis.find((m) => m.id === activeSindicatoViviendaMunicipality)?.name || '';
                    const parts = [parentName, terrName, muniName].filter(Boolean);
                    pathEl.textContent = parts.length ? `📍 ${parts.join(' › ')}` : '';
                    pathEl.hidden = !parts.length;
                }
            }

            function setSindicatoViviendaParent(parentId) {
                if (!window.SINDICAPP_SINDICATO) return;
                const parents = window.SINDICAPP_SINDICATO.getTerritoryParents(activeLocale);
                activeSindicatoViviendaParent = parents.some((p) => p.id === parentId) ? parentId : (parents[0]?.id || '');
                const subs = activeSindicatoViviendaParent
                    ? window.SINDICAPP_SINDICATO.getSubterritoriesForParent(activeLocale, activeSindicatoViviendaParent)
                    : [];
                activeSindicatoViviendaTerritory = subs[0]?.id || '';
                activeSindicatoViviendaBuilding = '';
                activeSindicatoViviendaMunicipality = '';
                rebuildSindicatoViviendaSelects();
                applySindicatoViewSync();
            }

            function setSindicatoViviendaTerritory(territoryId) {
                if (!window.SINDICAPP_SINDICATO) return;
                const subs = activeSindicatoViviendaParent
                    ? window.SINDICAPP_SINDICATO.getSubterritoriesForParent(activeLocale, activeSindicatoViviendaParent)
                    : [];
                activeSindicatoViviendaTerritory = subs.some((s) => s.id === territoryId) ? territoryId : (subs[0]?.id || '');
                activeSindicatoViviendaBuilding = '';
                activeSindicatoViviendaMunicipality = '';
                if (sindicatoViviendaTerritorySelect) sindicatoViviendaTerritorySelect.value = activeSindicatoViviendaTerritory || '';
                rebuildSindicatoViviendaSelects();
                applySindicatoViewSync();
            }

            function setSindicatoViviendaMunicipality(municipalityId) {
                if (!window.SINDICAPP_SINDICATO) return;
                const municipalities = activeSindicatoViviendaTerritory
                    ? (window.SINDICAPP_SINDICATO.getMunicipalitiesForTerritory?.(activeLocale, activeSindicatoViviendaTerritory) || [])
                    : [];
                activeSindicatoViviendaMunicipality = municipalities.some((m) => m.id === municipalityId) ? municipalityId : '';
                if (sindicatoViviendaMunicipalitySelect) sindicatoViviendaMunicipalitySelect.value = activeSindicatoViviendaMunicipality || '';
                rebuildSindicatoViviendaSelects(); /* refresca la línea de ruta 📍 */
                applySindicatoViewSync();
            }

            function renderSindicatoMapTerritoryTree() {
                if (!sindicatoMapTerritoryTreeMount || !window.SINDICAPP_SINDICATO?.buildTerritoryScopeTreeHtml) return;
                sindicatoMapTerritoryTreeMount.innerHTML = window.SINDICAPP_SINDICATO.buildTerritoryScopeTreeHtml(
                    activeLocale,
                    activeSindicatoMapTerritory,
                    'data-sindicato-map-territory',
                    { collapsed: true, showViviendaLinks: true }
                );
            }

            function setSindicatoMapTerritory(territoryId) {
                if (!window.SINDICAPP_SINDICATO) return;
                const allSubs = window.SINDICAPP_SINDICATO.getSubterritories(activeLocale);
                activeSindicatoMapTerritory = allSubs.some((t) => t.id === territoryId) ? territoryId : '';
                renderSindicatoMapTerritoryTree();
                if (activeSindicatoMapTerritory) {
                    highlightSindicatoTerritoryBoundaries(activeSindicatoMapTerritory);
                } else if (typeof window.resetTerritoryInfo === 'function') {
                    window.resetTerritoryInfo();
                }
                if (isSindicatoMapVisible()) syncSindicatoMapMarkers();
                applySindicatoViewSync();
                reflectSindicatoHash();
            }

            function renderSindicatoSectoresTree() {
                if (!sindicatoSectoresTreeMount || !window.SINDICAPP_SINDICATO?.buildSectoresSidebarTreeHtml) return;
                sindicatoSectoresTreeMount.innerHTML = window.SINDICAPP_SINDICATO.buildSectoresSidebarTreeHtml(
                    activeLocale,
                    activeSindicatoSector
                );
            }

            function renderSindicatoAddCompanySidebarForm() {
                if (!sindicatoAddCompanySidebarMount || !window.SINDICAPP_SINDICATO?.buildAddCompanyFormHtml) return;
                sindicatoAddCompanySidebarMount.innerHTML = window.SINDICAPP_SINDICATO.buildAddCompanyFormHtml(activeLocale);
            }

            function getSindicatoFeedScopeWorkplaces() {
                if (!window.SINDICAPP_SINDICATO) return [];
                if (activeSindicatoFeedScope === 'sectores' && activeSindicatoFeedSectorId) {
                    const node = window.SINDICAPP_SINDICATO.resolveSectorNode(activeLocale, activeSindicatoFeedSectorId);
                    return node?.workplaces || [];
                }
                if (activeSindicatoFeedScope === 'territorios' && activeSindicatoFeedTerritoryId) {
                    const terr = window.SINDICAPP_SINDICATO.getSubterritoryById(activeLocale, activeSindicatoFeedTerritoryId);
                    return terr?.workplaces || [];
                }
                return [];
            }

            function rebuildSindicatoFeedCompanySelect() {
                if (!sindicatoFeedCompanySelect || !window.SINDICAPP_SINDICATO) return;
                const c = getSindicatoCopy();
                const placeholder = c.selectFeedCompany || 'All companies in scope…';
                const list = getSindicatoFeedScopeWorkplaces();
                sindicatoFeedCompanySelect.innerHTML = `<option value="">${placeholder}</option>`
                    + list.map((w) => `<option value="${w.id}">${w.name}</option>`).join('');
                if (activeSindicatoFeedCompanyId && list.some((w) => w.id === activeSindicatoFeedCompanyId)) {
                    sindicatoFeedCompanySelect.value = activeSindicatoFeedCompanyId;
                } else {
                    activeSindicatoFeedCompanyId = '';
                    sindicatoFeedCompanySelect.value = '';
                }
            }

            function renderSindicatoFeedSidebar() {
                sindicatoFeedScopeButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-feed-scope');
                    btn.classList.toggle('active', id === activeSindicatoFeedScope);
                });
                const showTree = activeSindicatoFeedScope === 'sectores' || activeSindicatoFeedScope === 'territorios';
                if (sindicatoFeedScopeTreeMount) {
                    sindicatoFeedScopeTreeMount.hidden = !showTree;
                    if (showTree && window.SINDICAPP_SINDICATO?.buildFeedScopeTreeHtml) {
                        const activeId = activeSindicatoFeedScope === 'territorios'
                            ? activeSindicatoFeedTerritoryId
                            : activeSindicatoFeedSectorId;
                        sindicatoFeedScopeTreeMount.innerHTML = window.SINDICAPP_SINDICATO.buildFeedScopeTreeHtml(
                            activeLocale,
                            activeSindicatoFeedScope,
                            activeId
                        );
                    } else if (!showTree) {
                        sindicatoFeedScopeTreeMount.innerHTML = '';
                    }
                }
                const scopeSelected = (activeSindicatoFeedScope === 'sectores' && activeSindicatoFeedSectorId)
                    || (activeSindicatoFeedScope === 'territorios' && activeSindicatoFeedTerritoryId);
                const showCompanySelect = showTree && scopeSelected;
                if (sindicatoFeedCompanyLabel) sindicatoFeedCompanyLabel.hidden = !showCompanySelect;
                if (sindicatoFeedCompanySelect) sindicatoFeedCompanySelect.hidden = !showCompanySelect;
                if (showCompanySelect) {
                    rebuildSindicatoFeedCompanySelect();
                } else {
                    activeSindicatoFeedCompanyId = '';
                }
            }

            function setSindicatoFeedScope(scopeId) {
                const allowed = ['general', 'sectores', 'territorios', 'interno'];
                activeSindicatoFeedScope = allowed.includes(scopeId) ? scopeId : 'general';
                /* 13-07-2026: elegir un ámbito devuelve siempre a su raíz (árbol de
                   subforos en el fondo o tablón general) — también sirve de «volver»
                   desde un subforo abierto. */
                activeSindicatoFeedSectorId = '';
                activeSindicatoFeedTerritoryId = '';
                activeSindicatoFeedCompanyId = '';
                if (activeSindicatoFeedScope !== 'general') activeSindicatoForumThread = '';
                /* 13-07-2026: el foro vive en el sub «foro» (antes «feed»). */
                if (activeSindicatoSub !== 'foro') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('foro');
                }
                renderSindicatoFeedSidebar();
                applySindicatoViewSync();
            }

            function setSindicatoFeedSector(sectorId) {
                activeSindicatoFeedSectorId = sectorId || '';
                activeSindicatoFeedTerritoryId = '';
                activeSindicatoFeedCompanyId = '';
                activeSindicatoFeedScope = 'sectores';
                if (activeSindicatoSub !== 'foro') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('foro');
                }
                renderSindicatoFeedSidebar();
                applySindicatoViewSync();
            }

            function setSindicatoFeedTerritory(territoryId) {
                activeSindicatoFeedTerritoryId = territoryId || '';
                activeSindicatoFeedSectorId = '';
                activeSindicatoFeedCompanyId = '';
                activeSindicatoFeedScope = 'territorios';
                if (activeSindicatoSub !== 'foro') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('foro');
                }
                renderSindicatoFeedSidebar();
                applySindicatoViewSync();
            }

            function setSindicatoFeedCompany(companyId) {
                activeSindicatoFeedCompanyId = companyId || '';
                if (sindicatoFeedCompanySelect) {
                    sindicatoFeedCompanySelect.value = activeSindicatoFeedCompanyId;
                }
                applySindicatoViewSync();
            }

            function buildSindicatoWorkspaceHtml() {
                if (!window.SINDICAPP_SINDICATO) {
                    const errCopy = window.SINDICAPP_SINDICATO?.t?.(activeLocale)?.moduleLoadError;
                    return `<div class="sindicato-panel"><p class="template-muted">${errCopy || 'Syndicate module failed to load.'}</p></div>`;
                }
                return window.SINDICAPP_SINDICATO.buildWorkspaceHtml(
                    activeLocale,
                    activeSindicatoSub,
                    activeSindicatoWorkplace,
                    activeSindicatoSection,
                    sindicatoWorkplaceFilter,
                    {
                        sectorId: activeSindicatoSector,
                        unionId: activeSindicatoUnion,
                        unionSection: activeSindicatoUnionSection,
                        coordSub: activeSindicatoCoordSub,
                        crmOrg: activeSindicatoCrmOrg,
                        crmMemberQuery: sindicatoCrmMemberQuery,
                        crmMemberFilter: sindicatoCrmMemberFilter,
                        crmFinanzasView: sindicatoCrmFinanzasView,
                        crmDocFilter: sindicatoCrmDocFilter,
                        wikiSub: activeSindicatoWikiSub,
                        wikiEntityKind: activeSindicatoWikiEntityKind,
                        wikiEntityId: activeSindicatoWikiEntityId,
                        housingSub: activeSindicatoHousingSub,
                        feedScope: activeSindicatoFeedScope,
                        feedSectorId: activeSindicatoFeedSectorId,
                        feedTerritoryId: activeSindicatoFeedTerritoryId,
                        feedCompanyId: activeSindicatoFeedCompanyId,
                        forumThreadSlug: activeSindicatoForumThread,
                        consumidorId: activeSindicatoConsumidor,
                        estudianteCentroId: activeSindicatoEstudiantesCentro,
                        profesionalId: activeSindicatoProfesional,
                        autonomoId: activeSindicatoAutonomo,
                        propuestaRole: activePropuestaRole,
                        /* 20-07 (ADR 0024): el cargo viaja en el ctx igual que el rol. */
                        propuestaCargo: activePropuestaCargo,
                        webVersion: activeWebVersion,
                        crmContextModule: activeCrmContextModule,
                        equipoCrmTab: activeEquipoCrmTab,
                        equipoSection: activeEquipoSection,
                        housingUnionId: activeSindicatoHousingUnion,
                        mapTerritoryId: activeSindicatoMapTerritory,
                        viviendaTerritoryId: activeSindicatoViviendaTerritory,
                        viviendaBuildingId: activeSindicatoViviendaBuilding,
                        viviendaMunicipalityId: activeSindicatoViviendaMunicipality
                    }
                );
            }

            function applySindicatoHashRoute() {
                const route = window.SINDICAPP_SINDICATO?.parseSindicatoRoute(location.hash);
                if (!route) {
                    if (activeSindicatoForumThread) {
                        activeSindicatoForumThread = '';
                        if (activeModule === SINDICATO_MODULE && activeSindicatoSub === 'foro') {
                            applySindicatoViewSync();
                        }
                    }
                    return;
                }
                if (route.view === 'forum-thread') {
                    /* 13-07-2026: los hilos del foro general viven en el sub «foro». */
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'foro') setSindicatoSub('foro');
                    setSindicatoFeedScope('general');
                    activeSindicatoForumThread = route.slug;
                    applySindicatoViewSync();
                    return;
                }
                if (route.view === 'territory-dossier') {
                    /* Reestructura 12-07-2026: el deep link #sindicato-territorio:id
                       abre ahora la página del territorio en Territorios→Lista. */
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'vivienda') setSindicatoSub('vivienda');
                    activeSindicatoViviendaView = 'lista';
                    const terr = window.SINDICAPP_SINDICATO?.getSubterritoryById(activeLocale, route.territoryId);
                    if (terr?.parentId) setSindicatoViviendaParent(terr.parentId);
                    setSindicatoViviendaTerritory(route.territoryId);
                    return;
                }
                /* C7 — deep link al perfil de empresa */
                if (route.view === 'workplace') {
                    const wp = window.SINDICAPP_SINDICATO?.findWorkplace(activeLocale, route.workplaceId);
                    if (!wp) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoWorkplace(route.workplaceId, route.sectionId);
                    return;
                }
                /* 18-07 (idea 51): back del navegador entre módulos de primer nivel. */
                if (route.view === 'sub') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== route.subId) setSindicatoSub(route.subId);
                    return;
                }
                /* 18-07 (idea 51): back del navegador con un equipo sindical abierto. */
                if (route.view === 'equipo') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (route.type === 'unions') {
                        if (activeSindicatoSub !== 'unions') setSindicatoSub('unions');
                        setSindicatoUnion(route.entityId, route.sectionId || 'overview');
                        return;
                    }
                    const equipoSetters = {
                        profesionales: (id) => { activeSindicatoProfesional = id; },
                        autonomos: (id) => { activeSindicatoAutonomo = id; },
                        consumidores: (id) => { activeSindicatoConsumidor = id; },
                        estudiantes: (id) => { activeSindicatoEstudiantesCentro = id; },
                        housing: (id) => { activeSindicatoHousingUnion = id; }
                    };
                    const setEntity = equipoSetters[route.type];
                    if (!setEntity) return;
                    if (activeSindicatoSub !== route.type) setSindicatoSub(route.type);
                    setEntity(route.entityId);
                    activeEquipoSection = route.sectionId || 'resumen';
                    applySindicatoViewSync();
                }
            }

            /* C7 — reflejar la vista actual en la URL.
               18-07 (idea 51): ahora con pushState — cada navegación real crea una entrada
               de historial y el back del navegador funciona entre módulos y equipos (el
               hashchange resultante la re-aplica vía applySindicatoHashRoute). Durante el
               boot y sin hash previo se usa replaceState para no ensuciar el historial. */
            function reflectSindicatoHash() {
                if (activeModule !== SINDICATO_MODULE) return;
                let next = '';
                if (activeSindicatoSub === 'workplaces' && activeSindicatoWorkplace) {
                    next = '#sindicato-empresa:' + activeSindicatoWorkplace + ':' + activeSindicatoSection;
                } else if (activeSindicatoSub === 'vivienda' && activeSindicatoViviendaView === 'lista'
                    && activeSindicatoViviendaTerritory) {
                    next = '#sindicato-territorio:' + activeSindicatoViviendaTerritory;
                } else if (activeSindicatoSub === 'foro' && activeSindicatoForumThread) {
                    next = '#sindicato-forum:' + activeSindicatoForumThread;
                } else if (activeSindicatoSub === 'unions' && activeSindicatoUnion) {
                    next = '#sindicato-equipo:unions:' + activeSindicatoUnion + ':' + activeSindicatoUnionSection;
                } else if (activeSindicatoSub === 'profesionales' && activeSindicatoProfesional) {
                    next = '#sindicato-equipo:profesionales:' + activeSindicatoProfesional + ':' + activeEquipoSection;
                } else if (activeSindicatoSub === 'autonomos' && activeSindicatoAutonomo) {
                    next = '#sindicato-equipo:autonomos:' + activeSindicatoAutonomo + ':' + activeEquipoSection;
                } else if (activeSindicatoSub === 'consumidores' && activeSindicatoConsumidor) {
                    next = '#sindicato-equipo:consumidores:' + activeSindicatoConsumidor + ':' + activeEquipoSection;
                } else if (activeSindicatoSub === 'estudiantes' && activeSindicatoEstudiantesCentro) {
                    next = '#sindicato-equipo:estudiantes:' + activeSindicatoEstudiantesCentro + ':' + activeEquipoSection;
                } else if (activeSindicatoSub === 'housing' && activeSindicatoHousingUnion) {
                    next = '#sindicato-equipo:housing:' + activeSindicatoHousingUnion + ':' + activeEquipoSection;
                } else if (activeSindicatoSub) {
                    next = '#sindicato-sub:' + activeSindicatoSub;
                }
                if (next && location.hash !== next) {
                    const url = location.pathname + location.search + next;
                    const booting = document.body && document.body.classList.contains('sindicapp-booting');
                    if (!location.hash || booting) history.replaceState(null, '', url);
                    else history.pushState(null, '', url);
                } else if (!next && /^#sindicato-(empresa|territorio|equipo|sub|forum):/.test(location.hash)) {
                    history.replaceState(null, '', location.pathname + location.search);
                }
            }

            function clearSindicatoForumThread() {
                activeSindicatoForumThread = '';
                if (location.hash.match(/^#sindicato-forum:/)) {
                    history.replaceState(null, '', location.pathname + location.search);
                }
                if (activeModule === SINDICATO_MODULE && activeSindicatoSub === 'foro') {
                    applySindicatoViewSync();
                }
            }

            function syncSindicatoWorkspace() {
                if (!mapTextDisplay) return;
                mapTextDisplay.innerHTML = buildSindicatoWorkspaceHtml();
            }

            function syncSindicatoLocationBridge() {
                if (!mapTextDisplay || !window.SINDICAPP_SINDICATO || !activeSindicatoWorkplace) return;
                const wp = window.SINDICAPP_SINDICATO.findWorkplace(activeLocale, activeSindicatoWorkplace);
                if (!wp) return;
                mapTextDisplay.innerHTML = window.SINDICAPP_SINDICATO.buildLocationBridgeHtml(activeLocale, wp);
            }

            function isSindicatoLocationWorkspace() {
                return activeModule === SINDICATO_MODULE
                    && activeSindicatoSub === 'workplaces'
                    && Boolean(activeSindicatoWorkplace)
                    && activeSindicatoSection === 'location';
            }

            function isSindicatoMapVisible() {
                if (activeModule !== SINDICATO_MODULE) return false;
                /* Reestructura 12-07-2026: dos mapas — Territorios→Mapa (geojson) y
                   Empresas→Mapa (pins). */
                if (activeSindicatoSub === 'vivienda') return activeSindicatoViviendaView === 'map';
                if (activeSindicatoSub === 'workplaces' && !activeSindicatoWorkplace) {
                    return activeSindicatoWorkplacesView === 'map';
                }
                if (isSindicatoLocationWorkspace()) return true;
                return false;
            }

            function isSindicatoMapSplitWorkspace() {
                return activeModule === SINDICATO_MODULE
                    && activeSindicatoSub === 'map'
                    && Boolean(activeSindicatoMapTerritory);
            }

            function isSindicatoTextWorkspace() {
                if (activeModule !== SINDICATO_MODULE) return false;
                if (!activeSindicatoSub) return false;
                if (activeSindicatoSub === 'unions') return true;
                if (activeSindicatoSub === 'feed' || activeSindicatoSub === 'foro') return true;
                if (activeSindicatoSub === 'sectores' || activeSindicatoSub === 'coordination'
                    || activeSindicatoSub === 'wiki' || activeSindicatoSub === 'housing'
                    || activeSindicatoSub === 'consumidores' || activeSindicatoSub === 'estudiantes'
                    || activeSindicatoSub === 'sindicatos' || activeSindicatoSub === 'autonomos'
                    || activeSindicatoSub === 'profesionales') return true;
                if (activeSindicatoSub === 'vivienda') return activeSindicatoViviendaView === 'lista';
                if (activeSindicatoSub === 'workplaces' && !activeSindicatoWorkplace) {
                    return activeSindicatoWorkplacesView === 'lista';
                }
                return activeSindicatoSub === 'workplaces'
                    && Boolean(activeSindicatoWorkplace)
                    && activeSindicatoSection !== 'location';
            }

            function ensureSindicatoDefaultBoundaryLayer() {
                const layer = window.SINDICAPP_SINDICATO?.getDefaultBoundaryLayerForLocale(activeLocale)
                    || (datasetKey() === 'es' ? 'catComarques' : 'irelandCounties');
                const btn = document.querySelector(`.boundary-controls .border-eye-btn[data-layer="${layer}"]`);
                if (btn && btn.classList.contains('eye-off')) {
                    btn.click();
                } else if (typeof window.toggleBoundaryLayer === 'function' && mapInitialized && currentMap) {
                    window.toggleBoundaryLayer(layer, true);
                }
            }

            function highlightSindicatoTerritoryBoundaries(territoryId) {
                const link = window.SINDICAPP_SINDICATO?.getTerritoryBoundaryLink(activeLocale, territoryId);
                if (!link || typeof window.highlightTerritoryOnMap !== 'function') return;
                ensureSindicatoDefaultBoundaryLayer();
                window.highlightTerritoryOnMap(link.layer, link.names[0]);
            }

            function ensureSindicatoMapPanelVisible() {
                const mapView = document.getElementById('geo-teams-view-map');
                const mapOptions = document.getElementById('geo-teams-map-view-map-options');
                if (mapView) mapView.classList.add('active');
                if (mapOptions) mapOptions.classList.add('active');
            }

            function clearSindicatoMapMarkers() {
                if (sindicatoMarkersLayer && currentMap) {
                    try { currentMap.removeLayer(sindicatoMarkersLayer); } catch (_) {}
                }
                sindicatoMarkersLayer = null;
            }

            function syncSindicatoMapMarkers() {
                if (!currentMap || !window.SINDICAPP_SINDICATO || typeof L === 'undefined') return;
                clearSindicatoMapMarkers();
                if (!isSindicatoMapVisible()) return;
                /* Split limpio 12-07-2026: los pins de empresa solo en Empresas→Mapa
                   y en Localización; el mapa de Territorios va sin pins. */
                if (activeSindicatoSub === 'vivienda') return;
                sindicatoMarkersLayer = L.layerGroup();
                window.SINDICAPP_SINDICATO.getWorkplaces(activeLocale).forEach((wp) => {
                    if (wp.lat == null || wp.lng == null) return;
                    if (activeSindicatoMapTerritory && wp.territoryId !== activeSindicatoMapTerritory) return;
                    const isActive = activeSindicatoWorkplace === wp.id;
                    /* 17-07-2026 «el mapa que cuenta el conflicto»: color y tamaño del pin
                       según la intensidad (apoyo a huelga + denuncias). Un vistazo y sabes
                       dónde arde el territorio. Datos que ya existen, puro Leaflet. */
                    const strikePct = typeof wp.strikeSupport === 'number' ? wp.strikeSupport : 0;
                    const reportN = (wp.reports || 0);
                    const heat = Math.max(0, Math.min(1, (strikePct / 100) * 0.7 + Math.min(reportN, 10) / 10 * 0.3));
                    const pinColor = heat >= 0.66 ? '#e11d48' : heat >= 0.33 ? '#f59e0b' : '#16a34a';
                    const baseR = 3 + Math.round(heat * 4);
                    const marker = L.circleMarker([wp.lat, wp.lng], {
                        radius: isActive ? baseR + 2 : baseR,
                        color: pinColor,
                        fillColor: pinColor,
                        fillOpacity: isActive ? 1 : 0.85,
                        weight: isActive ? 2 : 1
                    });
                    marker.bindPopup(`<strong>${wp.name}</strong><br><span>${wp.sector}</span>`);
                    marker.on('click', () => {
                        if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                        setSindicatoWorkplace(wp.id, 'location');
                    });
                    marker.addTo(sindicatoMarkersLayer);
                });
                sindicatoMarkersLayer.addTo(currentMap);
            }

            function focusSindicatoWorkplaceOnMap(workplaceId) {
                if (!currentMap || !window.SINDICAPP_SINDICATO || !workplaceId) return;
                const wp = window.SINDICAPP_SINDICATO.findWorkplace(activeLocale, workplaceId);
                if (!wp || wp.lat == null || wp.lng == null) return;
                try {
                    currentMap.setView([wp.lat, wp.lng], Math.max(currentMap.getZoom(), 14));
                } catch (_) {}
                syncSindicatoMapMarkers();
            }

            function activateSindicatoMapWorkspace() {
                ensureSindicatoMapPanelVisible();
                initBoundaryControlsOnce();
                if (!mapInitialized || !currentMap) {
                    initOpenStreetMap();
                } else {
                    if (typeof window.cartagramaSetMapContext === 'function') {
                        window.cartagramaSetMapContext(currentMap, 'openstreetmap');
                    }
                    syncSindicatoMapMarkers();
                    restoreMapWorkspaceAfterTextMode();
                }
                /* Territorios→Mapa es el selector de territorios: ahí sí se enciende la
                   capa por defecto (comarques/counties). En Empresas→Mapa, solo pins:
                   se apagan las capas de límites que quedaran encendidas. */
                if (activeSindicatoSub === 'vivienda' && activeSindicatoViviendaView === 'map') {
                    ensureSindicatoDefaultBoundaryLayer();
                } else if (activeSindicatoSub === 'workplaces') {
                    document.querySelectorAll('.boundary-controls .border-eye-btn[data-layer]').forEach((btn) => {
                        if (!btn.classList.contains('eye-off')) btn.click();
                    });
                }
                if (activeSindicatoMapTerritory) {
                    highlightSindicatoTerritoryBoundaries(activeSindicatoMapTerritory);
                }
            }

            function applySindicatoViewSync() {
                updateModuleNavTrees();
                applyVisiblePanels();
                syncSindicatoViewToggles();
                syncTextModeBodyClasses();
                if (isSindicatoMapVisible()) {
                    activateSindicatoMapWorkspace();
                    if (activeSindicatoWorkplace) focusSindicatoWorkplaceOnMap(activeSindicatoWorkplace);
                } else {
                    clearSindicatoMapMarkers();
                }
                if (isSindicatoLocationWorkspace()) {
                    syncSindicatoLocationBridge();
                } else if (isSindicatoMapSplitWorkspace() || isSindicatoTextWorkspace()) {
                    syncSindicatoWorkspace();
                } else if (mapTextDisplay) {
                    mapTextDisplay.innerHTML = '';
                }
                updateModuleBodyLabel();
                syncMapWorkspacePlaceholder();
                /* 18-07 (idea 51): toda sincronización de vista refleja la URL; los
                   duplicados no pasan nada (guardado por hash idéntico). */
                reflectSindicatoHash();
                /* 18-07 (idea 54): el badge de avisos se mantiene al día en cada sync. */
                refreshNotifBadge();
            }

            function setSindicatoSub(subId) {
                /* Reestructura 12-07-2026: «map» ya no es sub de primer nivel; los
                   enlaces y rutas antiguos caen en Territorios→Mapa. */
                if (subId === 'map') {
                    subId = 'vivienda';
                    activeSindicatoViviendaView = 'map';
                }
                /* 13-07-2026: «feed» = Red Social (master); «foro», «consumidores» y
                   «estudiantes» son subs propios. El estado del foro (ámbitos) cuelga
                   ahora de «foro», no de «feed». */
                /* 20-07 tarde (idea 68 parcial): 'anillo' sale de la allowlist — la
                   pantalla se purgó (ADR 0024); los enlaces viejos caen a la portada. */
                const allowed = ['coordination', 'wiki', 'unions', 'vivienda', 'feed', 'foro', 'sectores', 'workplaces', 'housing', 'consumidores', 'estudiantes', 'sindicatos', 'autonomos', 'profesionales'];
                if (subId === '' || subId == null) {
                    activeSindicatoSub = '';
                    activeSindicatoWorkplace = '';
                    activeSindicatoSection = 'overview';
                    activeSindicatoSector = '';
                    activeSindicatoUnion = '';
                    activeSindicatoUnionSection = 'overview';
                    activeSindicatoCoordSub = 'afiliadas';
                    resetSindicatoCrmViewState();
                    activeSindicatoWikiSub = 'index';
                    activeSindicatoWikiEntityKind = '';
                    activeSindicatoWikiEntityId = '';
                    activeSindicatoHousingSub = 'huelgometro';
                    activeSindicatoViviendaParent = '';
                    activeSindicatoViviendaTerritory = '';
                    activeSindicatoViviendaBuilding = '';
                    activeSindicatoMapTerritory = '';
                    activeSindicatoFeedScope = 'general';
                    activeSindicatoFeedSectorId = '';
                    activeSindicatoFeedTerritoryId = '';
                    activeSindicatoFeedCompanyId = '';
                    activeSindicatoConsumidor = '';
                    activeSindicatoEstudiantesCentro = '';
                    activeSindicatoProfesional = '';
                    activeSindicatoAutonomo = '';
                } else {
                    activeSindicatoSub = allowed.includes(subId) ? subId : '';
                }
                if (activeSindicatoSub !== 'workplaces') {
                    activeSindicatoWorkplace = '';
                    activeSindicatoSection = 'overview';
                    activeSindicatoWorkplacesView = 'map';
                }
                if (activeSindicatoSub !== 'sectores') {
                    activeSindicatoSector = '';
                }
                if (activeSindicatoSub !== 'unions') {
                    activeSindicatoUnion = '';
                    activeSindicatoUnionSection = 'overview';
                }
                if (activeSindicatoSub !== 'foro') {
                    activeSindicatoFeedScope = 'general';
                    activeSindicatoFeedSectorId = '';
                    activeSindicatoFeedTerritoryId = '';
                    activeSindicatoFeedCompanyId = '';
                }
                if (activeSindicatoSub !== 'consumidores') {
                    activeSindicatoConsumidor = '';
                }
                if (activeSindicatoSub !== 'estudiantes') {
                    activeSindicatoEstudiantesCentro = '';
                }
                if (activeSindicatoSub !== 'profesionales') {
                    activeSindicatoProfesional = '';
                }
                if (activeSindicatoSub !== 'autonomos') {
                    activeSindicatoAutonomo = '';
                }
                if (activeSindicatoSub !== 'coordination') {
                    activeSindicatoCoordSub = 'afiliadas';
                    resetSindicatoCrmViewState();
                    activeCrmContextModule = '';
                }
                if (activeSindicatoSub !== 'wiki') {
                    activeSindicatoWikiSub = 'index';
                    activeSindicatoWikiEntityKind = '';
                    activeSindicatoWikiEntityId = '';
                }
                if (activeSindicatoSub !== 'housing') {
                    activeSindicatoHousingSub = 'huelgometro';
                    activeSindicatoHousingUnion = '';
                }
                if (activeSindicatoSub !== 'vivienda') {
                    activeSindicatoViviendaParent = '';
                    activeSindicatoViviendaTerritory = '';
                    activeSindicatoViviendaBuilding = '';
                    activeSindicatoViviendaView = 'map';
                    activeSindicatoMapTerritory = '';
                }
                sindicatoSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-sub');
                    btn.classList.toggle('active', id === activeSindicatoSub);
                });
                if (activeSindicatoSub === 'coordination') {
                    syncCrmTabsForContext();
                    sindicatoCoordSubButtons.forEach((btn) => {
                        const id = btn.getAttribute('data-sindicato-coord-sub');
                        btn.classList.toggle('active', id === activeSindicatoCoordSub);
                    });
                    rebuildSindicatoCrmOrgSelect();
                }
                if (activeSindicatoSub === 'wiki') {
                    sindicatoWikiSubButtons.forEach((btn) => {
                        const id = btn.getAttribute('data-sindicato-wiki-sub');
                        btn.classList.toggle('active', id === activeSindicatoWikiSub);
                    });
                }
                if (activeSindicatoSub === 'housing') {
                    sindicatoHousingSubButtons.forEach((btn) => {
                        const id = btn.getAttribute('data-sindicato-housing-sub');
                        btn.classList.toggle('active', id === activeSindicatoHousingSub);
                    });
                }
                if (activeSindicatoSub === 'sectores') {
                    renderSindicatoSectoresTree();
                }
                if (activeSindicatoSub === 'unions') {
                    rebuildSindicatoUnionSelect();
                }
                if (activeSindicatoSub === 'foro') {
                    renderSindicatoFeedSidebar();
                }
                if (activeSindicatoSub === 'vivienda') {
                    rebuildSindicatoViviendaSelects();
                }
                applySindicatoViewSync();
            }

            /* Reestructura 12-07-2026: cambio de vista Mapa/Lista dentro de un sub. */
            function setSindicatoViviendaView(view) {
                activeSindicatoViviendaView = view === 'lista' ? 'lista' : 'map';
                applySindicatoViewSync();
            }

            function setSindicatoWorkplacesView(view) {
                activeSindicatoWorkplacesView = view === 'lista' ? 'lista' : 'map';
                /* Fusión Mapa 12-07: con una empresa abierta el toggle general es la salida —
                   deselecciona la empresa y devuelve a la vista de todas (mapa con pines / lista). */
                if (activeSindicatoWorkplace) {
                    activeSindicatoWorkplace = '';
                    activeSindicatoSection = 'overview';
                    rebuildSindicatoWorkplaceSelect();
                    reflectSindicatoHash();
                }
                applySindicatoViewSync();
            }

            function syncSindicatoViewToggles() {
                document.querySelectorAll('[data-sindicato-vivienda-view]').forEach((btn) => {
                    btn.classList.toggle('active', btn.getAttribute('data-sindicato-vivienda-view') === activeSindicatoViviendaView);
                });
                /* Sin empresa: refleja la vista activa. Con empresa abierta el toggle es una salida,
                   así que no se resalta ninguno (evita leer «Mapa» activo estando en Resumen). */
                const wpToggleReflectsView = !activeSindicatoWorkplace;
                document.querySelectorAll('[data-sindicato-workplaces-view]').forEach((btn) => {
                    btn.classList.toggle('active', wpToggleReflectsView
                        && btn.getAttribute('data-sindicato-workplaces-view') === activeSindicatoWorkplacesView);
                });
                /* En Territorios→Mapa se ocultan los selectores y la ruta (se elige en el mapa);
                   el bloque Borders del workspace solo aparece en Territorios→Mapa. */
                const onViviendaMap = activeModule === SINDICATO_MODULE
                    && activeSindicatoSub === 'vivienda' && activeSindicatoViviendaView === 'map';
                ['sindicato-vivienda-parent-row', 'sindicato-vivienda-territory-row',
                 'sindicato-vivienda-municipality-row', 'sindicato-vivienda-path'].forEach((id) => {
                    const el = document.getElementById(id);
                    if (el) el.hidden = onViviendaMap;
                });
                const bordersBlock = document.getElementById('cartagrama-content-territories');
                if (bordersBlock) bordersBlock.hidden = !onViviendaMap;
            }

            function setSindicatoSector(sectorId) {
                activeSindicatoSector = sectorId || '';
                if (activeSindicatoSub !== 'sectores') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('sectores');
                }
                renderSindicatoSectoresTree();
                applySindicatoViewSync();
            }

            function resetSindicatoCrmViewState() {
                sindicatoCrmMemberQuery = '';
                sindicatoCrmMemberFilter = 'todas';
                sindicatoCrmFinanzasView = 'resumen';
                sindicatoCrmDocFilter = 'todas';
            }

            function rebuildSindicatoCrmOrgSelect() {
                if (!sindicatoCrmOrgSelect || !window.SINDICAPP_SINDICATO) return;
                const orgs = window.SINDICAPP_SINDICATO.getCrmOrgs(activeLocale);
                if (!orgs.some((o) => o.id === activeSindicatoCrmOrg)) {
                    activeSindicatoCrmOrg = 'sindicapp';
                }
                sindicatoCrmOrgSelect.innerHTML = orgs.map((o) =>
                    `<option value="${o.id}"${o.id === activeSindicatoCrmOrg ? ' selected' : ''}>${o.name}</option>`
                ).join('');
            }

            function setSindicatoCoordSub(subId) {
                const allowed = ['afiliadas', 'casos', 'campanas', 'finanzas', 'comunicaciones', 'calendario', 'documentos', 'datos', 'estructura', 'intake', 'asambleas'];
                activeSindicatoCoordSub = allowed.includes(subId) ? subId : 'afiliadas';
                if (activeSindicatoSub !== 'coordination') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('coordination');
                }
                sindicatoCoordSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-coord-sub');
                    btn.classList.toggle('active', id === activeSindicatoCoordSub);
                });
                applySindicatoViewSync();
            }

            function setSindicatoWikiSub(subId) {
                /* 20-07 (ADR 0024): «accesos» — teoría de quién ve qué. */
                const allowed = ['index', 'sindicapp', 'derechos', 'denunciar', 'organizar', 'glosario', 'normas', 'ia', 'accesos'];
                if (activeSindicatoSub !== 'wiki') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('wiki');
                }
                activeSindicatoWikiSub = allowed.includes(subId) ? subId : 'index';
                activeSindicatoWikiEntityKind = '';
                activeSindicatoWikiEntityId = '';
                sindicatoWikiSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-wiki-sub');
                    btn.classList.toggle('active', id === activeSindicatoWikiSub);
                });
                applySindicatoViewSync();
            }

            /* Vivienda / Housing (13-07-2026) — huelgómetro | alarmas */
            function setSindicatoHousingSub(subId) {
                const allowed = ['huelgometro', 'alarmas', 'tenedores', 'calculadora', 'asambleas'];
                if (activeSindicatoSub !== 'housing') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('housing');
                }
                activeSindicatoHousingSub = allowed.includes(subId) ? subId : 'huelgometro';
                sindicatoHousingSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-housing-sub');
                    btn.classList.toggle('active', id === activeSindicatoHousingSub);
                });
                applySindicatoViewSync();
            }

            /* 13-07-2026: abre la página wiki personalizada de una entidad concreta. */
            function setSindicatoWikiEntity(kind, id) {
                const allowedKinds = ['workplace', 'sector', 'union', 'territory'];
                if (!allowedKinds.includes(kind) || !id) return;
                if (activeSindicatoSub !== 'wiki') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('wiki');
                }
                activeSindicatoWikiSub = 'entity';
                activeSindicatoWikiEntityKind = kind;
                activeSindicatoWikiEntityId = id;
                sindicatoWikiSubButtons.forEach((btn) => btn.classList.remove('active'));
                applySindicatoViewSync();
            }

            function rebuildSindicatoUnionSelect() {
                if (!sindicatoUnionSelect || !window.SINDICAPP_SINDICATO) return;
                const c = window.SINDICAPP_SINDICATO.t(activeLocale);
                const placeholder = c.selectUnion || 'Select union…';
                const q = sindicatoUnionFilter.trim().toLowerCase();
                const list = window.SINDICAPP_SINDICATO.getUnions(activeLocale).filter((u) =>
                    !q || u.name.toLowerCase().includes(q) || u.sector.toLowerCase().includes(q)
                );
                sindicatoUnionSelect.innerHTML = `<option value="">${placeholder}</option>`;
                list.forEach((u) => {
                    const opt = document.createElement('option');
                    opt.value = u.id;
                    opt.textContent = `${u.name} (${u.sector})`;
                    sindicatoUnionSelect.appendChild(opt);
                });
                sindicatoUnionSelect.value = list.some((u) => u.id === activeSindicatoUnion) ? activeSindicatoUnion : '';
            }

            /* 17-07-2026: selectores de sidebar para Profesionales/Consumidores/Estudiantes,
               mismo patrón que el de sindicatos (buscador + select). */
            function rebuildSindicatoDirSelect(selectEl, list, activeId, placeholder, labelFn) {
                if (!selectEl) return;
                selectEl.innerHTML = `<option value="">${placeholder}</option>`;
                list.forEach((entry) => {
                    const opt = document.createElement('option');
                    opt.value = entry.id;
                    opt.textContent = labelFn(entry);
                    selectEl.appendChild(opt);
                });
                selectEl.value = list.some((entry) => entry.id === activeId) ? activeId : '';
            }

            function rebuildSindicatoDirSelects() {
                if (!window.SINDICAPP_SINDICATO) return;
                const c = window.SINDICAPP_SINDICATO.t(activeLocale);
                const norm = (s) => String(s || '').toLowerCase();
                const proQ = norm(sindicatoProfesionalesFilter).trim();
                rebuildSindicatoDirSelect(
                    sindicatoProfesionalesSelect,
                    window.SINDICAPP_SINDICATO.getProBodies(activeLocale).filter((b) =>
                        !proQ || norm(b.name).includes(proQ) || norm(b.type).includes(proQ)),
                    activeSindicatoProfesional,
                    c.selectProfesional || 'Seleccionar colegio…',
                    (b) => `${b.name}`
                );
                const conQ = norm(sindicatoConsumidoresFilter).trim();
                rebuildSindicatoDirSelect(
                    sindicatoConsumidoresSelect,
                    window.SINDICAPP_SINDICATO.getConsumerItems(activeLocale).filter((it) =>
                        !conQ || norm(it.name).includes(conQ) || norm(it.sector).includes(conQ)),
                    activeSindicatoConsumidor,
                    c.selectConsumidor || 'Seleccionar producto o servicio…',
                    (it) => `${it.name} (${it.sector})`
                );
                const estQ = norm(sindicatoEstudiantesFilter).trim();
                rebuildSindicatoDirSelect(
                    sindicatoEstudiantesSelect,
                    window.SINDICAPP_SINDICATO.getStudyCenters(activeLocale).filter((ct) =>
                        !estQ || norm(ct.name).includes(estQ) || norm(ct.type).includes(estQ)),
                    activeSindicatoEstudiantesCentro,
                    c.selectCentro || 'Seleccionar centro…',
                    (ct) => `${ct.name} (${ct.type})`
                );
                /* Inquilinas: directorio de sindicatos por territorio. */
                const houQ = norm(sindicatoHousingFilter).trim();
                rebuildSindicatoDirSelect(
                    sindicatoHousingSelect,
                    window.SINDICAPP_SINDICATO.getHousingUnions(activeLocale).filter((u) =>
                        !houQ || norm(u.name).includes(houQ) || norm(u.region).includes(houQ)),
                    activeSindicatoHousingUnion,
                    c.selectHousingUnion || 'Seleccionar sindicato…',
                    (u) => `${u.name} (${u.region})`
                );
                /* Autónomas: dos grupos — equipos sindicales y plataformas/actores. */
                if (sindicatoAutonomosSelect) {
                    const autQ = norm(sindicatoAutonomosFilter).trim();
                    const match = (o, extra) => !autQ || norm(o.name).includes(autQ) || norm(extra || '').includes(autQ);
                    const unions = window.SINDICAPP_SINDICATO.getAutonomoUnions(activeLocale).filter((u) => match(u, u.sector));
                    const plats = window.SINDICAPP_SINDICATO.getAutonomoPlatforms(activeLocale).filter((p) => match(p, p.sector));
                    sindicatoAutonomosSelect.innerHTML = `<option value="">${c.selectAutonomo || 'Seleccionar…'}</option>`;
                    const addGroup = (label, list, fmt) => {
                        if (!list.length) return;
                        const og = document.createElement('optgroup');
                        og.label = label;
                        list.forEach((entry) => {
                            const opt = document.createElement('option');
                            opt.value = entry.id;
                            opt.textContent = fmt(entry);
                            og.appendChild(opt);
                        });
                        sindicatoAutonomosSelect.appendChild(og);
                    };
                    addGroup(c.autonomosUnionsListTitle || 'Sindicatos', unions, (u) => `${u.name} (${u.sector})`);
                    addGroup(c.autonomosPlatformsTitle || 'Plataformas', plats, (p) => `${p.name} (${p.sector})`);
                    const all = unions.concat(plats);
                    sindicatoAutonomosSelect.value = all.some((e) => e.id === activeSindicatoAutonomo) ? activeSindicatoAutonomo : '';
                }
            }

            function setSindicatoUnion(unionId, sectionId) {
                const unions = window.SINDICAPP_SINDICATO?.getUnions(activeLocale) || [];
                activeSindicatoUnion = unions.some((u) => u.id === unionId) ? unionId : '';
                activeSindicatoUnionSection = sectionId || (unionId ? 'overview' : 'overview');
                if (unionId) activeSindicatoSub = 'unions';
                sindicatoSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-sub');
                    btn.classList.toggle('active', id === activeSindicatoSub);
                });
                sindicatoUnionSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-union-section');
                    btn.classList.toggle('active', id === activeSindicatoUnionSection);
                });
                rebuildSindicatoUnionSelect();
                applySindicatoViewSync();
            }

            function setSindicatoUnionSection(sectionId) {
                /* Decreto 18-07: las pestañas del CRM son secciones de sidebar (crm-*). */
                const crmSections = (window.SINDICAPP_SINDICATO?.getCrmTabsForType('unions') || []).map((id) => 'crm-' + id);
                const allowed = ['overview', 'forum', 'structure', 'companies', 'crm'].concat(crmSections);
                activeSindicatoUnionSection = allowed.includes(sectionId) ? sectionId : 'overview';
                sindicatoUnionSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-union-section');
                    btn.classList.toggle('active', id === activeSindicatoUnionSection);
                });
                applySindicatoViewSync();
            }

            function setSindicatoWorkplace(workplaceId, sectionId) {
                activeSindicatoWorkplace = workplaceId || '';
                activeSindicatoSection = sectionId || 'overview';
                if (workplaceId) activeSindicatoSub = 'workplaces';
                sindicatoSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-sub');
                    btn.classList.toggle('active', id === activeSindicatoSub);
                });
                sindicatoSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-section');
                    btn.classList.toggle('active', id === activeSindicatoSection);
                });
                rebuildSindicatoWorkplaceSelect();
                applySindicatoViewSync();
                reflectSindicatoHash();
            }

            function setSindicatoSection(sectionId) {
                const allowed = ['location', 'overview', 'reports', 'wages', 'convenio', 'action'];
                activeSindicatoSection = allowed.includes(sectionId) ? sectionId : 'location';
                sindicatoSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-section');
                    btn.classList.toggle('active', id === activeSindicatoSection);
                });
                applySindicatoViewSync();
                reflectSindicatoHash();
            }

            function handleSindicatoWorkspaceClick(e) {
                /* ===== Red Social (13-07-2026) — paneles de stats: tronco hacia los módulos ===== */
                const gotoSubBtn = e.target.closest?.('[data-sindicato-goto-sub]');
                if (gotoSubBtn) {
                    e.preventDefault();
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub(gotoSubBtn.getAttribute('data-sindicato-goto-sub') || '');
                    return;
                }

                /* ===== Foro (13-07-2026) — árboles de subforos y botón «volver» en el fondo ===== */
                const scopeTreeToggle = e.target.closest?.('.sindicato-forum-scope-tree .sindicato-sector-toggle');
                if (scopeTreeToggle) {
                    e.preventDefault();
                    const node = scopeTreeToggle.closest('.sindicato-sector-node');
                    const children = node?.querySelector(':scope > .sindicato-sector-children');
                    const icon = scopeTreeToggle.querySelector('.sindicato-sector-toggle-icon');
                    if (children) {
                        const open = children.classList.toggle('is-open');
                        scopeTreeToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                        if (icon) icon.textContent = open ? '▼' : '▶';
                    }
                    return;
                }

                const wsFeedScopeBtn = e.target.closest?.('[data-sindicato-feed-scope]');
                if (wsFeedScopeBtn) {
                    e.preventDefault();
                    setSindicatoFeedScope(wsFeedScopeBtn.getAttribute('data-sindicato-feed-scope'));
                    return;
                }

                const wsFeedSectorBtn = e.target.closest?.('[data-sindicato-feed-sector]');
                if (wsFeedSectorBtn) {
                    e.preventDefault();
                    setSindicatoFeedSector(wsFeedSectorBtn.getAttribute('data-sindicato-feed-sector'));
                    return;
                }

                const wsFeedTerritoryBtn = e.target.closest?.('[data-sindicato-feed-territory]');
                if (wsFeedTerritoryBtn) {
                    e.preventDefault();
                    setSindicatoFeedTerritory(wsFeedTerritoryBtn.getAttribute('data-sindicato-feed-territory'));
                    return;
                }

                /* ===== Consumidores / Estudiantes (13-07-2026) — abrir y cerrar perfiles ===== */
                const gotoConsumidor = e.target.closest?.('[data-sindicato-goto-consumidor]');
                if (gotoConsumidor) {
                    e.preventDefault();
                    activeSindicatoConsumidor = gotoConsumidor.getAttribute('data-sindicato-goto-consumidor') || '';
                    activeEquipoSection = 'resumen';
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'consumidores') {
                        const keep = activeSindicatoConsumidor;
                        setSindicatoSub('consumidores');
                        activeSindicatoConsumidor = keep;
                    }
                    applySindicatoViewSync();
                    return;
                }

                const gotoCentro = e.target.closest?.('[data-sindicato-goto-centro]');
                if (gotoCentro) {
                    e.preventDefault();
                    activeSindicatoEstudiantesCentro = gotoCentro.getAttribute('data-sindicato-goto-centro') || '';
                    activeEquipoSection = 'resumen';
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'estudiantes') {
                        const keep = activeSindicatoEstudiantesCentro;
                        setSindicatoSub('estudiantes');
                        activeSindicatoEstudiantesCentro = keep;
                    }
                    applySindicatoViewSync();
                    return;
                }

                /* ===== Profesionales / Autónomos (17-07-2026) — abrir y cerrar perfiles ===== */
                const gotoProfesional = e.target.closest?.('[data-sindicato-goto-profesional]');
                if (gotoProfesional) {
                    e.preventDefault();
                    activeSindicatoProfesional = gotoProfesional.getAttribute('data-sindicato-goto-profesional') || '';
                    activeEquipoSection = 'resumen';
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'profesionales') {
                        const keep = activeSindicatoProfesional;
                        setSindicatoSub('profesionales');
                        activeSindicatoProfesional = keep;
                    }
                    applySindicatoViewSync();
                    return;
                }

                const gotoAutonomo = e.target.closest?.('[data-sindicato-goto-autonomo]');
                if (gotoAutonomo) {
                    e.preventDefault();
                    activeSindicatoAutonomo = gotoAutonomo.getAttribute('data-sindicato-goto-autonomo') || '';
                    activeEquipoSection = 'resumen';
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'autonomos') {
                        const keep = activeSindicatoAutonomo;
                        setSindicatoSub('autonomos');
                        activeSindicatoAutonomo = keep;
                    }
                    applySindicatoViewSync();
                    return;
                }

                /* ===== CRM (12-07-2026) — interacciones de los módulos ===== */
                const crmMemberFilterBtn = e.target.closest?.('[data-sindicato-crm-member-filter]');
                if (crmMemberFilterBtn) {
                    e.preventDefault();
                    sindicatoCrmMemberFilter = crmMemberFilterBtn.getAttribute('data-sindicato-crm-member-filter') || 'todas';
                    syncTextWorkspace();
                    return;
                }

                const crmCaseMoveBtn = e.target.closest?.('[data-sindicato-crm-case-move]');
                if (crmCaseMoveBtn && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const [caseId, dir] = (crmCaseMoveBtn.getAttribute('data-sindicato-crm-case-move') || '').split(':');
                    if (caseId) {
                        window.SINDICAPP_SINDICATO.crmMoveCase(activeLocale, activeSindicatoCrmOrg, caseId, dir === 'back' ? 'back' : 'fwd');
                        syncTextWorkspace();
                    }
                    return;
                }

                const crmCampaignBtn = e.target.closest?.('[data-sindicato-crm-campaign-support]');
                if (crmCampaignBtn && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    window.SINDICAPP_SINDICATO.crmSupportCampaign(activeLocale, activeSindicatoCrmOrg, crmCampaignBtn.getAttribute('data-sindicato-crm-campaign-support'));
                    syncTextWorkspace();
                    return;
                }

                const crmFinanzasBtn = e.target.closest?.('[data-sindicato-crm-finanzas-view]');
                if (crmFinanzasBtn) {
                    e.preventDefault();
                    sindicatoCrmFinanzasView = crmFinanzasBtn.getAttribute('data-sindicato-crm-finanzas-view') || 'resumen';
                    syncTextWorkspace();
                    return;
                }

                const crmCommBtn = e.target.closest?.('[data-sindicato-crm-comm-send]');
                if (crmCommBtn && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    window.SINDICAPP_SINDICATO.crmSendComm(activeLocale, activeSindicatoCrmOrg, crmCommBtn.getAttribute('data-sindicato-crm-comm-send'));
                    syncTextWorkspace();
                    return;
                }

                const crmDocFilterBtn = e.target.closest?.('[data-sindicato-crm-doc-filter]');
                if (crmDocFilterBtn) {
                    e.preventDefault();
                    sindicatoCrmDocFilter = crmDocFilterBtn.getAttribute('data-sindicato-crm-doc-filter') || 'todas';
                    syncTextWorkspace();
                    return;
                }

                /* 17-07-2026: plantillas de respuesta (CRM → Comunicaciones) — copiar al portapapeles. */
                const crmTemplateBtn = e.target.closest?.('[data-sindicato-crm-template-copy]');
                if (crmTemplateBtn && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const tp = window.SINDICAPP_SINDICATO.crmGetTemplate(activeLocale, activeSindicatoCrmOrg, crmTemplateBtn.getAttribute('data-sindicato-crm-template-copy'));
                    if (tp) {
                        const done = () => notify(sindicatoNotice('crmTemplateCopied'));
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(tp.body).then(done, done);
                        } else {
                            const ta = document.createElement('textarea');
                            ta.value = tp.body;
                            document.body.appendChild(ta);
                            ta.select();
                            try { document.execCommand('copy'); } catch (err) { /* demo: sin portapapeles */ }
                            ta.remove();
                            done();
                        }
                    }
                    return;
                }

                /* 17-07-2026: Propuesta — chips de rol contextuales dentro de los espacios
                   protegidos (el «Ver como» global desapareció de la nav). */
                const propuestaWorkspaceRoleBtn = e.target.closest?.('[data-propuesta-role]');
                if (propuestaWorkspaceRoleBtn) {
                    e.preventDefault();
                    activePropuestaRole = propuestaWorkspaceRoleBtn.getAttribute('data-propuesta-role') || 'visitante';
                    try { localStorage.setItem('sindicapp-propuesta-role', activePropuestaRole); } catch (err) { /* demo */ }
                    syncPropuestaNav();
                    /* 20-07 (ADR 0024): los candados de cargo de las sidebars dependen
                       también de la relación — refrescar etiquetas. */
                    refreshSindicatoSidebarLabels();
                    applySindicatoViewSync();
                    if (activeModule === 'self') syncSelfSindicatoWorkspace();
                    return;
                }

                /* 20-07-2026 (ideas 42+43, ADR 0024): chips de cargo demo — ocupar un
                   cargo concede sus capacidades; el organigrama es la ACL.
                   20-07 tarde (ideas 63+66): también cargos de equipo/ad hoc, con
                   rastro persistido de ocupar/soltar (recordCargoTrail). */
                const propuestaCargoBtn = e.target.closest?.('[data-propuesta-cargo]');
                if (propuestaCargoBtn) {
                    e.preventDefault();
                    const S = window.SINDICAPP_SINDICATO;
                    const prevCargo = activePropuestaCargo;
                    activePropuestaCargo = propuestaCargoBtn.getAttribute('data-propuesta-cargo') || 'ninguno';
                    /* El orgId viaja embebido en los ids ad hoc ('adhoc:<ds>:<org>:<ts>');
                       para arquetipos y cargos de seed no hace falta. */
                    activePropuestaCargoOrg = activePropuestaCargo.indexOf('adhoc:') === 0
                        ? (activePropuestaCargo.split(':')[2] || '')
                        : '';
                    persistPropuestaCargo();
                    const cCargo = getSindicatoCopy();
                    const cargoName = (S && S.cargoDisplayName)
                        ? S.cargoDisplayName(activeLocale, activePropuestaCargo)
                        : ((cCargo.propuestaCargos && cCargo.propuestaCargos[activePropuestaCargo]) || activePropuestaCargo);
                    /* Idea 66: rastro — soltar el anterior, ocupar el nuevo. */
                    if (S && S.recordCargoTrail && prevCargo !== activePropuestaCargo) {
                        if (prevCargo && prevCargo !== 'ninguno') {
                            S.recordCargoTrail('deja', S.cargoDisplayName ? S.cargoDisplayName(activeLocale, prevCargo) : prevCargo);
                        }
                        if (activePropuestaCargo !== 'ninguno') S.recordCargoTrail('ocupa', cargoName);
                    }
                    notify(String(cCargo.propuestaCargoAssigned || '{cargo}').replace('{cargo}', cargoName));
                    refreshSindicatoSidebarLabels();
                    applySindicatoViewSync();
                    if (activeModule === 'self') syncTextWorkspace();
                    return;
                }

                /* 17-07-2026: secciones (Resumen | CRM) del perfil de entidad en los tipos
                   sin sidebar de secciones. */
                const equipoSectionBtn = e.target.closest?.('[data-equipo-section]');
                if (equipoSectionBtn) {
                    e.preventDefault();
                    const allowed = window.SINDICAPP_SINDICATO
                        ? window.SINDICAPP_SINDICATO.getEquipoSectionsForType(activeSindicatoSub)
                        : ['resumen'];
                    const sec = equipoSectionBtn.getAttribute('data-equipo-section');
                    activeEquipoSection = allowed.indexOf(sec) !== -1 ? sec : 'resumen';
                    updateModuleNavTrees();
                    syncTextWorkspace();
                    reflectSindicatoHash();
                    return;
                }

                /* 17-07-2026: elegir equipo sindical de inquilinas (directorio por comunidad). */
                const gotoHousingUnion = e.target.closest?.('[data-sindicato-goto-housing-union]');
                if (gotoHousingUnion) {
                    e.preventDefault();
                    activeSindicatoHousingUnion = gotoHousingUnion.getAttribute('data-sindicato-goto-housing-union') || '';
                    activeEquipoSection = 'resumen';
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'housing') {
                        const keep = activeSindicatoHousingUnion;
                        setSindicatoSub('housing');
                        activeSindicatoHousingUnion = keep;
                    }
                    applySindicatoViewSync();
                    return;
                }

                /* 17-07-2026: pestañas del CRM inline dentro de un equipo sindical. */
                const equipoCrmTabBtn = e.target.closest?.('[data-equipo-crm-tab]');
                if (equipoCrmTabBtn) {
                    e.preventDefault();
                    activeEquipoCrmTab = equipoCrmTabBtn.getAttribute('data-equipo-crm-tab') || 'afiliadas';
                    syncTextWorkspace();
                    return;
                }

                /* 18-07 (idea 44): convocar sesión especial desde el banner de patrón. */
                const patternSessionBtn = e.target.closest?.('[data-propuesta-pattern-session]');
                if (patternSessionBtn) {
                    e.preventDefault();
                    const raw = patternSessionBtn.getAttribute('data-propuesta-pattern-session') || '';
                    const i = raw.indexOf('|');
                    const res = window.SINDICAPP_SINDICATO.propuestaCreatePatternSession(activeLocale, raw.slice(i + 1), raw.slice(0, i));
                    const pc = getSindicatoCopy();
                    if (res === 'created') notify(pc.propuestaCasosConvened || 'OK');
                    else if (res === 'exists') notify(pc.propuestaCasosSessionExists || '—');
                    syncTextWorkspace();
                    return;
                }

                /* 18-07 (idea 45): registrar asistencia en una sesión. */
                const attendBtn = e.target.closest?.('[data-propuesta-attend]');
                if (attendBtn) {
                    e.preventDefault();
                    const raw = attendBtn.getAttribute('data-propuesta-attend') || '';
                    const i = raw.indexOf('|');
                    window.SINDICAPP_SINDICATO.propuestaAddAttendance(activeLocale, raw.slice(i + 1), raw.slice(0, i));
                    syncTextWorkspace();
                    return;
                }

                /* 20-07 tarde (idea 65): toggle demo «sesión en curso» — con la sesión
                   activa, las suplentes del cuadrante muestran el badge «hereda». */
                const sessionLiveBtn = e.target.closest?.('[data-propuesta-session-live]');
                if (sessionLiveBtn) {
                    e.preventDefault();
                    const raw = sessionLiveBtn.getAttribute('data-propuesta-session-live') || '';
                    const i = raw.indexOf('|');
                    window.SINDICAPP_SINDICATO.propuestaToggleSessionLive(activeLocale, raw.slice(i + 1), raw.slice(0, i));
                    syncTextWorkspace();
                    return;
                }

                /* 20-07 tarde (idea 64): crear un cargo ad hoc desde el formulario de
                   crm-estructura — validación mínima, persistencia en el runtime del
                   equipo, rastro (idea 66) y aviso. */
                const adhocCreateBtn = e.target.closest?.('[data-crm-adhoc-create]');
                if (adhocCreateBtn) {
                    e.preventDefault();
                    const form = adhocCreateBtn.closest('[data-crm-adhoc-form]');
                    const rc = getSindicatoCopy();
                    if (!form || !window.SINDICAPP_SINDICATO?.crmCreateAdhocCargo) return;
                    const nombre = (form.querySelector('[data-crm-adhoc-name]')?.value || '').trim();
                    const capacidades = [...form.querySelectorAll('[data-crm-adhoc-cap]:checked')].map((el) => el.value);
                    const ambito = (form.querySelector('[data-crm-adhoc-ambito]')?.value || '').trim();
                    const caduca = (form.querySelector('[data-crm-adhoc-caduca]')?.value || '').trim();
                    const created = (nombre && capacidades.length && caduca)
                        ? window.SINDICAPP_SINDICATO.crmCreateAdhocCargo(activeLocale,
                            adhocCreateBtn.getAttribute('data-crm-adhoc-create') || '',
                            { nombre, capacidades, ambito, caduca })
                        : null;
                    if (!created) {
                        notify(rc.crmAdhocInvalid || '—', 'warn');
                        return;
                    }
                    notify(String(rc.crmAdhocCreated || '{c}').replace('{c}', created.nombre));
                    syncTextWorkspace();
                    return;
                }

                /* 18-07 (idea 50): abrir el modo asamblea (overlay de proyección). */
                const liveOpenBtn = e.target.closest?.('[data-asamblea-live-open]');
                if (liveOpenBtn) {
                    e.preventDefault();
                    const raw = liveOpenBtn.getAttribute('data-asamblea-live-open') || '';
                    const i = raw.indexOf('|');
                    renderAsambleaLive(raw.slice(0, i), raw.slice(i + 1));
                    return;
                }

                /* 18-07 (idea 55): descargar el orden del día de una sesión (markdown). */
                const agendaExportBtn = e.target.closest?.('[data-propuesta-agenda-export]');
                if (agendaExportBtn) {
                    e.preventDefault();
                    const raw = agendaExportBtn.getAttribute('data-propuesta-agenda-export') || '';
                    const i = raw.indexOf('|');
                    const od = window.SINDICAPP_SINDICATO.propuestaOrderOfDayText(activeLocale, raw.slice(i + 1), raw.slice(0, i));
                    if (od) {
                        try {
                            const blob = new Blob([od.content], { type: 'text/markdown' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = od.filename;
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            setTimeout(() => URL.revokeObjectURL(url), 1000);
                        } catch (err) { /* demo */ }
                    }
                    return;
                }

                /* 18-07 (idea 57, report v4): reiniciar los datos demo del navegador —
                   pensado para enseñar la app en reuniones partiendo de cero. */
                const resetDemoBtn = e.target.closest?.('[data-sindicapp-reset-demo]');
                if (resetDemoBtn) {
                    e.preventDefault();
                    const rc = getSindicatoCopy();
                    if (window.confirm((rc && rc.resetDemoConfirm) || 'Reset demo data?')) {
                        try {
                            const doomed = [];
                            for (let i = 0; i < localStorage.length; i++) {
                                const k = localStorage.key(i);
                                if (k && (k.indexOf('sindicapp-') === 0 || k.indexOf('cartagrama_') === 0)) doomed.push(k);
                            }
                            doomed.forEach((k) => localStorage.removeItem(k));
                        } catch (err) { /* demo */ }
                        window.location.reload();
                    }
                    return;
                }

                /* 17-07-2026 (descomposición CRM): abrir la gestión de un módulo de colectivo. */
                const gotoCrmBtn = e.target.closest?.('[data-sindicato-goto-crm]');
                if (gotoCrmBtn) {
                    e.preventDefault();
                    activeCrmContextModule = gotoCrmBtn.getAttribute('data-sindicato-goto-crm') || '';
                    /* Al entrar, ajusta la pestaña activa a una que encaje en este tipo. */
                    const tabs = window.SINDICAPP_SINDICATO?.getCrmTabsForType(activeCrmContextModule) || [];
                    if (tabs.length && tabs.indexOf(activeSindicatoCoordSub) === -1) activeSindicatoCoordSub = tabs[0];
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('coordination');
                    return;
                }

                /* 17-07-2026: botón compartir — copia el deep link del perfil al portapapeles. */
                const shareBtn = e.target.closest?.('[data-sindicato-share]');
                if (shareBtn) {
                    e.preventDefault();
                    const raw = shareBtn.getAttribute('data-sindicato-share') || '';
                    const sep = raw.indexOf(':');
                    const kind = sep === -1 ? raw : raw.slice(0, sep);
                    const id = sep === -1 ? '' : raw.slice(sep + 1);
                    let hash = '';
                    if (kind === 'empresa' && id) hash = `#sindicato-empresa:${id}:${activeSindicatoSection || 'overview'}`;
                    else if (kind === 'territorio' && id) hash = `#sindicato-territorio:${id}`;
                    const url = location.origin + location.pathname + hash;
                    const c = sindicappCopy();
                    const done = () => notify(c.shareCopied || 'Copied.');
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(url).then(done, done);
                    } else {
                        const ta = document.createElement('textarea');
                        ta.value = url; document.body.appendChild(ta); ta.select();
                        try { document.execCommand('copy'); } catch (err) { /* demo */ }
                        ta.remove(); done();
                    }
                    return;
                }

                /* 17-07-2026 (idea 14): avanzar la revisión de un documento del CRM. */
                const crmDocReviewBtn = e.target.closest?.('[data-sindicato-crm-doc-review]');
                if (crmDocReviewBtn && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    window.SINDICAPP_SINDICATO.crmAdvanceDocReview(activeLocale, activeSindicatoCrmOrg, crmDocReviewBtn.getAttribute('data-sindicato-crm-doc-review'));
                    syncTextWorkspace();
                    return;
                }

                /* 17-07-2026 (idea 4): convertir un contacto de intake en afiliada. */
                const intakeConvertBtn = e.target.closest?.('[data-propuesta-intake-convert]');
                if (intakeConvertBtn && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const raw = intakeConvertBtn.getAttribute('data-propuesta-intake-convert') || '';
                    const sep = raw.indexOf('|');
                    const type = sep === -1 ? '' : raw.slice(0, sep);
                    const name = sep === -1 ? raw : raw.slice(sep + 1);
                    window.SINDICAPP_SINDICATO.propuestaConvertIntake(activeLocale, name, type);
                    syncTextWorkspace();
                    return;
                }

                /* 17-07-2026: ficha viva de caso — mover de etapa (fusión con el pipeline clásico). */
                const propuestaCaseMoveBtn = e.target.closest?.('[data-propuesta-case-move]');
                if (propuestaCaseMoveBtn && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const [type, caseId, dir] = (propuestaCaseMoveBtn.getAttribute('data-propuesta-case-move') || '').split('|');
                    if (caseId) {
                        window.SINDICAPP_SINDICATO.propuestaMoveCase(activeLocale, caseId, dir === 'back' ? 'back' : 'fwd', type);
                        syncTextWorkspace();
                    }
                    return;
                }

                /* 17-07-2026: Propuesta — vista de moderación: avanzar el turno de palabra. */
                const propuestaTurnBtn = e.target.closest?.('[data-propuesta-turno-next]');
                if (propuestaTurnBtn && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const [tType, sId] = (propuestaTurnBtn.getAttribute('data-propuesta-turno-next') || '').split('|');
                    window.SINDICAPP_SINDICATO.propuestaAdvanceTurn(activeLocale, sId || tType, sId ? tType : '');
                    syncTextWorkspace();
                    return;
                }

                /* 17-07-2026: export JSON de la organización (CRM → Documentos) — «tus datos son tuyos». */
                const crmExportBtn = e.target.closest?.('[data-sindicato-crm-export]');
                if (crmExportBtn && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const payload = window.SINDICAPP_SINDICATO.crmExportPayload(activeLocale, activeSindicatoCrmOrg);
                    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `sindicapp-crm-${payload.organisation.id}-${payload.exportedAt.slice(0, 10)}.json`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    setTimeout(() => URL.revokeObjectURL(url), 1000);
                    notify(sindicatoNotice('crmExported'));
                    return;
                }

                const crmEventForm = (e.type === 'submit' && e.target.matches?.('[data-sindicato-crm-event-form]'))
                    ? e.target
                    : null;
                if (crmEventForm && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    if (typeof crmEventForm.reportValidity === 'function' && !crmEventForm.reportValidity()) return;
                    window.SINDICAPP_SINDICATO.crmAddEvent(activeLocale, activeSindicatoCrmOrg, {
                        type: crmEventForm.querySelector('[name="type"]')?.value,
                        date: crmEventForm.querySelector('[name="date"]')?.value,
                        title: crmEventForm.querySelector('[name="title"]')?.value
                    });
                    syncTextWorkspace();
                    return;
                }

                const forumBack = e.target.closest('[data-sindicato-forum-back]');
                if (forumBack) {
                    e.preventDefault();
                    clearSindicatoForumThread();
                    return;
                }

                const unionBackBtn = e.target.closest('[data-sindicato-union-back]');
                if (unionBackBtn) {
                    e.preventDefault();
                    setSindicatoUnion('');
                    return;
                }

                const mapClearTerritory = e.target.closest('[data-sindicato-map-clear-territory]');
                if (mapClearTerritory) {
                    e.preventDefault();
                    setSindicatoMapTerritory('');
                    applySindicatoViewSync();
                    return;
                }

                const gotoVivienda = e.target.closest('[data-sindicato-goto-vivienda]');
                if (gotoVivienda) {
                    e.preventDefault();
                    const terrId = gotoVivienda.getAttribute('data-sindicato-goto-vivienda');
                    if (!terrId || !window.SINDICAPP_SINDICATO) return;
                    const terr = window.SINDICAPP_SINDICATO.getSubterritoryById(activeLocale, terrId);
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('vivienda');
                    activeSindicatoViviendaView = 'lista';
                    if (terr?.parentId) setSindicatoViviendaParent(terr.parentId);
                    setSindicatoViviendaTerritory(terrId);
                    return;
                }

                /* Reforma legibilidad 12-07 — del perfil de territorio al mapa con el
                   territorio resaltado (ahora Territorios→Mapa). */
                const gotoMapTerritory = e.target.closest('[data-sindicato-goto-map-territory]');
                if (gotoMapTerritory) {
                    e.preventDefault();
                    const terrId = gotoMapTerritory.getAttribute('data-sindicato-goto-map-territory');
                    if (!terrId) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'vivienda') setSindicatoSub('vivienda');
                    activeSindicatoViviendaView = 'map';
                    applySindicatoViewSync();
                    highlightSindicatoTerritoryBoundaries(terrId);
                    return;
                }

                /* Reforma legibilidad 12-07 — del perfil de territorio a su foro (ámbito territorios) */
                const gotoTerritoryForum = e.target.closest('[data-sindicato-goto-territory-forum]');
                if (gotoTerritoryForum) {
                    e.preventDefault();
                    const terrId = gotoTerritoryForum.getAttribute('data-sindicato-goto-territory-forum');
                    if (!terrId) return;
                    setSindicatoFeedTerritory(terrId);
                    return;
                }

                /* R7 — abrir/cerrar el perfil de edificio dentro de Vivienda */
                const gotoBuilding = e.target.closest('[data-sindicato-goto-building]');
                if (gotoBuilding) {
                    e.preventDefault();
                    activeSindicatoViviendaBuilding = gotoBuilding.getAttribute('data-sindicato-goto-building') || '';
                    applySindicatoViewSync();
                    return;
                }

                const buildingBack = e.target.closest('[data-sindicato-building-back]');
                if (buildingBack) {
                    e.preventDefault();
                    activeSindicatoViviendaBuilding = '';
                    applySindicatoViewSync();
                    return;
                }

                const forumThreadLink = e.target.closest('[data-sindicato-forum-thread]');
                if (forumThreadLink) {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'foro') setSindicatoSub('foro');
                    setSindicatoFeedScope('general');
                    return;
                }

                const strikePoll = (e.type === 'submit' && e.target.matches?.('[data-sindicato-strike-poll]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-strike-poll]');
                if (strikePoll && (e.type === 'submit' || e.target.type === 'submit') && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const wpId = strikePoll.getAttribute('data-sindicato-workplace-id');
                    const voteBtn = e.submitter || strikePoll.querySelector('[type="submit"][name="vote"]');
                    const vote = voteBtn?.value;
                    if (wpId && vote) {
                        window.SINDICAPP_SINDICATO.castStrikeVote(wpId, vote);
                        /* fix QA A2: usar el dispatcher, no el renderer de Colectivo (rompía la vista en módulo Usuario) */
                        syncTextWorkspace();
                        notify(sindicatoNotice('strikeVoteSaved'));
                    }
                    return;
                }

                /* R4 — alta de evento de agenda por empresa (demo, localStorage) */
                const agendaForm = (e.type === 'submit' && e.target.matches?.('[data-sindicato-agenda-form]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-agenda-form]');
                if (agendaForm && (e.type === 'submit' || e.target.type === 'submit') && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    if (typeof agendaForm.reportValidity === 'function' && !agendaForm.reportValidity()) return;
                    const wpId = agendaForm.getAttribute('data-sindicato-workplace-id');
                    const type = agendaForm.querySelector('[name="type"]')?.value;
                    const date = agendaForm.querySelector('[name="date"]')?.value;
                    const title = agendaForm.querySelector('[name="title"]')?.value;
                    if (wpId && date && title) {
                        window.SINDICAPP_SINDICATO.addAgendaEvent(wpId, { type, date, title });
                        syncTextWorkspace();
                        notify(sindicatoNotice('agendaEventAdded'));
                    }
                    return;
                }

                /* R5 — flujo demo de verificación: solicitar aval sindical y confirmación */
                const verifyConfirm = e.target.closest('[data-sindicato-verify-confirm]');
                if (verifyConfirm && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    window.SINDICAPP_SINDICATO.confirmUnionEndorsement();
                    syncTextWorkspace();
                    return;
                }

                const verifyRequest = (e.type === 'submit' && e.target.matches?.('[data-sindicato-verify-request]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-verify-request]');
                if (verifyRequest && (e.type === 'submit' || e.target.type === 'submit') && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    if (typeof verifyRequest.reportValidity === 'function' && !verifyRequest.reportValidity()) return;
                    const unionId = verifyRequest.querySelector('[name="unionId"]')?.value;
                    if (unionId) {
                        window.SINDICAPP_SINDICATO.requestUnionEndorsement(unionId);
                        syncTextWorkspace();
                        notify(sindicatoNotice('endorsementRequested'));
                    } else {
                        /* fix QA A6: antes el botón callaba si no había sindicato elegido */
                        notify(sindicatoNotice('endorsementMissingUnion'), 'warn');
                    }
                    return;
                }

                /* R7 — lista de confirmación de acción colectiva de inquilinos (demo) */
                const tenantPledge = (e.type === 'submit' && e.target.matches?.('[data-sindicato-tenant-pledge]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-tenant-pledge]');
                if (tenantPledge && (e.type === 'submit' || e.target.type === 'submit') && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const buildingId = tenantPledge.getAttribute('data-sindicato-building-id');
                    if (buildingId) {
                        window.SINDICAPP_SINDICATO.addTenantPledge(buildingId);
                        syncTextWorkspace();
                        notify(sindicatoNotice('pledgeSaved'));
                    }
                    return;
                }

                /* Huelgómetro de vivienda (13-07-2026) — compromiso nacional de huelga de alquileres */
                const housingPledge = (e.type === 'submit' && e.target.matches?.('[data-sindicato-housing-pledge]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-housing-pledge]');
                if (housingPledge && (e.type === 'submit' || e.target.type === 'submit') && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    window.SINDICAPP_SINDICATO.addHousingStrikePledge(activeLocale);
                    syncTextWorkspace();
                    notify(sindicatoNotice('pledgeSaved'));
                    return;
                }

                /* Vivienda ampliado (13-07-2026) — acompañamiento a desahucios por alerta */
                const housingEscort = e.target.closest?.('[data-sindicato-housing-escort]');
                if (housingEscort && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    window.SINDICAPP_SINDICATO.addHousingEscortPledge(housingEscort.getAttribute('data-sindicato-housing-escort'));
                    syncTextWorkspace();
                    notify(sindicatoNotice('pledgeSaved'));
                    return;
                }

                /* Vivienda ampliado (13-07-2026) — calculadora de alquiler: solo se
                   actualiza el div de resultado, así el formulario no pierde estado. */
                const housingCalc = (e.type === 'submit' && e.target.matches?.('[data-sindicato-housing-calc]'))
                    ? e.target
                    : null;
                if (housingCalc && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const fd = new FormData(housingCalc);
                    const resultMount = mapTextDisplay?.querySelector('[data-sindicato-housing-calc-result]');
                    if (resultMount) {
                        resultMount.innerHTML = window.SINDICAPP_SINDICATO.buildHousingCalcResultHtml(
                            activeLocale,
                            fd.get('territory'),
                            fd.get('m2'),
                            fd.get('rent')
                        );
                    }
                    return;
                }

                const wikiJump = e.target.closest('[data-sindicato-wiki-jump]');
                if (wikiJump) {
                    e.preventDefault();
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'wiki') setSindicatoSub('wiki');
                    setSindicatoWikiSub(wikiJump.getAttribute('data-sindicato-wiki-jump'));
                    return;
                }

                /* 13-07-2026: página wiki personalizada de una entidad (kind:id). */
                const wikiEntity = e.target.closest('[data-sindicato-wiki-entity]');
                if (wikiEntity) {
                    e.preventDefault();
                    const raw = wikiEntity.getAttribute('data-sindicato-wiki-entity') || '';
                    const sep = raw.indexOf(':');
                    if (sep === -1) return;
                    setSindicatoWikiEntity(raw.slice(0, sep), raw.slice(sep + 1));
                    return;
                }

                /* 13-07-2026: abrir el dossier de un sector desde un enlace inline. */
                const gotoSector = e.target.closest('[data-sindicato-goto-sector]');
                if (gotoSector) {
                    e.preventDefault();
                    const sectorId = gotoSector.getAttribute('data-sindicato-goto-sector');
                    if (!sectorId) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSector(sectorId);
                    return;
                }

                const feedGotoUnion = e.target.closest('[data-sindicato-feed-goto-union]');
                if (feedGotoUnion) {
                    const unionId = feedGotoUnion.getAttribute('data-sindicato-union-id');
                    const section = feedGotoUnion.getAttribute('data-sindicato-union-section') || 'forum';
                    if (!unionId) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoUnion(unionId, section);
                    return;
                }

                const gotoUnion = e.target.closest('[data-sindicato-goto-union]');
                if (gotoUnion) {
                    const unionId = gotoUnion.getAttribute('data-sindicato-goto-union');
                    const section = gotoUnion.getAttribute('data-sindicato-union-section') || 'overview';
                    if (!unionId) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoUnion(unionId, section);
                    return;
                }

                /* Dossier de sector — botón "Abrir foro del sector": salta directo al foro filtrado por ese sector. */
                const gotoSectorForum = e.target.closest('[data-sindicato-goto-sector-forum]');
                if (gotoSectorForum) {
                    e.preventDefault();
                    const sectorId = gotoSectorForum.getAttribute('data-sindicato-goto-sector-forum');
                    if (!sectorId) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoFeedSector(sectorId);
                    return;
                }

                const unionJump = e.target.closest('[data-sindicato-union-jump]');
                if (unionJump) {
                    const unionId = unionJump.getAttribute('data-sindicato-union-id') || activeSindicatoUnion;
                    const section = unionJump.getAttribute('data-sindicato-union-jump');
                    if (!unionId || !section) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoUnion(unionId, section);
                    return;
                }

                const feedGoto = e.target.closest('[data-sindicato-feed-goto]');
                if (feedGoto) {
                    const wpId = feedGoto.getAttribute('data-sindicato-workplace-id');
                    const section = feedGoto.getAttribute('data-sindicato-section') || 'location';
                    if (!wpId) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('workplaces');
                    setSindicatoWorkplace(wpId, section);
                    return;
                }

                const sectionGoto = e.target.closest('[data-sindicato-goto-section]');
                if (sectionGoto) {
                    const wpId = sectionGoto.getAttribute('data-sindicato-workplace-id') || activeSindicatoWorkplace;
                    const section = sectionGoto.getAttribute('data-sindicato-goto-section');
                    if (!wpId || !section) return;
                    setSindicatoWorkplace(wpId, section);
                    return;
                }

                const moderateBtn = e.target.closest('[data-sindicato-moderate]');
                if (moderateBtn && window.SINDICAPP_SINDICATO) {
                    const reportId = moderateBtn.getAttribute('data-sindicato-moderate');
                    const action = moderateBtn.getAttribute('data-sindicato-moderate-action');
                    if (reportId && action) {
                        window.SINDICAPP_SINDICATO.moderateReport(reportId, action);
                        syncSindicatoWorkspace();
                    }
                    return;
                }

                /* R1 — calculadora de convenio: cálculo puro en cliente sobre la tabla demo. */
                const convenioCalc = (e.type === 'submit' && e.target.matches?.('[data-sindicato-convenio-calc]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-convenio-calc]');
                if (convenioCalc && (e.type === 'submit' || e.target.type === 'submit')) {
                    e.preventDefault();
                    const c = getSindicatoCopy();
                    const out = convenioCalc.querySelector('[data-sindicato-calc-out]');
                    const annualMin = Number(convenioCalc.querySelector('[name="category"]')?.value);
                    const hoursRaw = Number(convenioCalc.querySelector('[name="hours"]')?.value) || 40;
                    const salaryInput = Number(convenioCalc.querySelector('[name="salary"]')?.value);
                    const period = convenioCalc.querySelector('[name="period"]:checked')?.value || 'monthly';
                    if (!out || !annualMin || !(salaryInput > 0)) return;
                    const hours = Math.min(Math.max(hoursRaw, 1), 60);
                    const annualSalary = period === 'monthly' ? salaryInput * 12 : salaryInput;
                    const proratedMin = annualMin * (hours / 40);
                    const diff = annualSalary - proratedMin;
                    const pct = proratedMin > 0 ? (diff / proratedMin) * 100 : 0;
                    const fmt = (n) => Math.abs(n).toLocaleString(datasetKey() === 'es' ? 'es-ES' : 'en-IE', { maximumFractionDigits: 0 });
                    const sign = diff >= 0 ? '+' : '−';
                    const ok = diff >= 0;
                    out.hidden = false;
                    out.classList.toggle('sindicato-calc-result--ok', ok);
                    out.classList.toggle('sindicato-calc-result--below', !ok);
                    out.innerHTML = `<strong>${ok ? c.calcAbove : c.calcBelow}</strong><br>`
                        + `${c.calcMinLabel}: ${fmt(proratedMin)} € · `
                        + `${c.calcDiffLabel}: ${sign}${fmt(diff)} € (${sign}${Math.abs(pct).toFixed(1)}%)`;
                    return;
                }

                /* B4 (R1) — buscador de convenio aplicable (directorio demo) */
                const convenioFinder = (e.type === 'submit' && e.target.matches?.('[data-sindicato-convenio-finder]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-convenio-finder]');
                if (convenioFinder && (e.type === 'submit' || e.target.type === 'submit') && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const sector = convenioFinder.querySelector('[name="sector"]')?.value;
                    const out = convenioFinder.querySelector('[data-sindicato-finder-out]');
                    if (out && sector) {
                        out.innerHTML = window.SINDICAPP_SINDICATO.getConvenioFinderResultHtml(activeLocale, sector);
                        out.hidden = false;
                    }
                    return;
                }

                const convenioAsk = (e.type === 'submit' && e.target.matches?.('[data-sindicato-convenio-ask]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-convenio-ask]');
                if (convenioAsk && (e.type === 'submit' || e.target.type === 'submit')) {
                    e.preventDefault();
                    const out = convenioAsk.querySelector('[data-sindicato-convenio-out]');
                    if (out) out.hidden = false;
                    return;
                }

                /* C2 — aportar el propio sueldo (demo, localStorage) */
                const wageForm = (e.type === 'submit' && e.target.matches?.('[data-sindicato-wage-form]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-wage-form]');
                if (wageForm && (e.type === 'submit' || e.target.type === 'submit') && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const wpId = wageForm.getAttribute('data-sindicato-workplace-id');
                    const role = wageForm.querySelector('[name="role"]')?.value;
                    const amount = Number(wageForm.querySelector('[name="amount"]')?.value);
                    const period = wageForm.querySelector('[name="period"]')?.value;
                    if (wpId && amount > 0) {
                        window.SINDICAPP_SINDICATO.addWageContribution(wpId, { role, amount, period });
                        syncTextWorkspace();
                        notify(sindicatoNotice('wageSubmitted'));
                    }
                    return;
                }

                const reportForm = (e.type === 'submit' && e.target.matches?.('[data-sindicato-report-form]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-report-form]');
                if (reportForm && (e.type === 'submit' || e.target.type === 'submit') && window.SINDICAPP_SINDICATO) {
                    e.preventDefault();
                    const wpId = reportForm.getAttribute('data-sindicato-workplace-id');
                    const type = reportForm.querySelector('[name="type"]')?.value;
                    const detail = reportForm.querySelector('[name="detail"]')?.value;
                    if (wpId && type) {
                        window.SINDICAPP_SINDICATO.submitReport(activeLocale, wpId, type, detail);
                        reportForm.reset();
                        /* fix QA A1: usar el dispatcher, no el renderer de Colectivo (rompía la vista en módulo Usuario) */
                        syncTextWorkspace();
                        notify(sindicatoNotice('reportQueued'));
                    }
                    return;
                }

                const goto = e.target.closest('[data-sindicato-goto-workplace]');
                if (goto) {
                    const id = goto.getAttribute('data-sindicato-goto-workplace');
                    if (!id) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    /* Fusión Mapa 12-07: abrir una empresa desde una tarjeta/enlace lleva a
                       Resumen (pestaña por defecto). Los pines del mapa siguen abriendo «Mapa». */
                    setSindicatoWorkplace(id);
                }
            }

            function updateModuleNavTrees() {
                const onSelf = activeModule === 'self';
                const onSindicato = activeModule === SINDICATO_MODULE;
                if (selfNavTree) selfNavTree.hidden = !onSelf;
                if (selfSindicatoBlock) {
                    selfSindicatoBlock.hidden = !onSelf;
                }
                if (sindicatoNavTree) sindicatoNavTree.hidden = !onSindicato;
                if (sindicatoWorkplacesBlock) {
                    sindicatoWorkplacesBlock.hidden = !onSindicato || activeSindicatoSub !== 'workplaces';
                }
                if (sindicatoMapSidebar) {
                    sindicatoMapSidebar.hidden = !onSindicato || activeSindicatoSub !== 'map';
                }
                if (sindicatoUnionsSidebar) {
                    sindicatoUnionsSidebar.hidden = !onSindicato || activeSindicatoSub !== 'unions';
                }
                if (sindicatoFeedSidebar) {
                    sindicatoFeedSidebar.hidden = !onSindicato || activeSindicatoSub !== 'feed';
                }
                /* Fusión portada ↔ Red Social (13-07-2026): con Red Social activa, la
                   portada original (logo, bienvenida, selector de idioma) se muestra en
                   la sidebar — su UI de siempre — mientras el fondo lleva el dashboard. */
                if (moduleBody) {
                    moduleBody.classList.toggle('redsocial-landing', onSindicato && activeSindicatoSub === 'feed');
                }
                if (sindicatoForoSidebar) {
                    sindicatoForoSidebar.hidden = !onSindicato || activeSindicatoSub !== 'foro';
                }
                if (sindicatoConsumidoresSidebar) {
                    sindicatoConsumidoresSidebar.hidden = !onSindicato || activeSindicatoSub !== 'consumidores';
                }
                if (sindicatoEstudiantesSidebar) {
                    sindicatoEstudiantesSidebar.hidden = !onSindicato || activeSindicatoSub !== 'estudiantes';
                }
                if (sindicatoProfesionalesSidebar) {
                    sindicatoProfesionalesSidebar.hidden = !onSindicato || activeSindicatoSub !== 'profesionales';
                }
                if (sindicatoAutonomosSidebar) {
                    sindicatoAutonomosSidebar.hidden = !onSindicato || activeSindicatoSub !== 'autonomos';
                }
                /* Nav de secciones del equipo: visible al tener una entidad abierta en uno
                   de los 4 tipos generalizados. */
                if (sindicatoEquipoSectionBlock) {
                    const entityOpen = (activeSindicatoSub === 'profesionales' && activeSindicatoProfesional)
                        || (activeSindicatoSub === 'autonomos' && activeSindicatoAutonomo)
                        || (activeSindicatoSub === 'consumidores' && activeSindicatoConsumidor)
                        || (activeSindicatoSub === 'estudiantes' && activeSindicatoEstudiantesCentro)
                        || (activeSindicatoSub === 'housing' && activeSindicatoHousingUnion);
                    sindicatoEquipoSectionBlock.hidden = !onSindicato || !entityOpen;
                    /* La nav se renderiza por tipo: Inquilinos tiene más secciones
                       (absorbe huelgómetro, alarmas, calculadora, asambleas) y llama
                       «Propietarios» a lo que en Trabajadores es «Empresas». */
                    if (entityOpen && sindicatoEquipoSectionNav && window.SINDICAPP_SINDICATO) {
                        /* 20-07 (ADR 0024): el rol y el cargo viajan para pintar los
                           candados informativos de la Gestión. */
                        sindicatoEquipoSectionNav.innerHTML = window.SINDICAPP_SINDICATO.buildEquipoSectionNavHtml(
                            activeLocale, activeSindicatoSub, activeEquipoSection,
                            { propuestaRole: activePropuestaRole, propuestaCargo: activePropuestaCargo }
                        );
                    }
                }
                /* 17-07-2026: los selectores de directorio se re-sincronizan en cada refresco
                   (mantienen filtro y selección; opciones re-localizadas). */
                rebuildSindicatoDirSelects();
                /* Web triplicada: la nav de la Propuesta se re-renderiza en cada refresco
                   (labels por locale, estado activo y candados por rol). */
                syncPropuestaNav();
                if (sindicatoSectoresSidebar) {
                    sindicatoSectoresSidebar.hidden = !onSindicato || activeSindicatoSub !== 'sectores';
                }
                if (sindicatoCoordinationSidebar) {
                    sindicatoCoordinationSidebar.hidden = !onSindicato || activeSindicatoSub !== 'coordination';
                }
                if (sindicatoWikiSidebar) {
                    sindicatoWikiSidebar.hidden = !onSindicato || activeSindicatoSub !== 'wiki';
                }
                if (sindicatoViviendaSidebar) {
                    sindicatoViviendaSidebar.hidden = !onSindicato || activeSindicatoSub !== 'vivienda';
                }
                if (sindicatoHousingSidebar) {
                    sindicatoHousingSidebar.hidden = !onSindicato || activeSindicatoSub !== 'housing';
                }
                /* Fusión Mapa 12-07: el toggle [Mapa|Lista] queda siempre visible en Empresas.
                   Con una empresa abierta hace de salida: deselecciona y vuelve a la vista general
                   (ver setSindicatoWorkplacesView). Así siempre hay camino de vuelta a Lista/Mapa. */
                if (sindicatoWorkplacesViewNav) {
                    sindicatoWorkplacesViewNav.hidden = !onSindicato || activeSindicatoSub !== 'workplaces';
                }
                if (sindicatoWorkplaceSectionNav) {
                    sindicatoWorkplaceSectionNav.hidden = !onSindicato || activeSindicatoSub !== 'workplaces' || !activeSindicatoWorkplace;
                }
                if (sindicatoUnionSectionNav) {
                    sindicatoUnionSectionNav.hidden = !onSindicato || activeSindicatoSub !== 'unions' || !activeSindicatoUnion;
                }
                /* 13-07-2026: subnav unificado siempre visible (8 módulos). Usuario ya no es
                   un módulo paraguas sino el 8º botón, que activa el módulo interno 'self'. */
                sindicatoSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-sub');
                    const on = (onSelf && id === 'usuario')
                        || (onSindicato && id === activeSindicatoSub);
                    btn.classList.toggle('active', on);
                });
                updateMapSelectedTerritoryBar();
            }

            function updateMapSelectedTerritoryBar() {
                if (!mapSelectedTerritoryBar || !mapSelectedTerritoryName) return;
                const selection = lastMapTerritorySelection;
                /* Fix 12-07-2026: isGeoTeamsMapWorkspace() ya no existe tras el
                   refactor — su llamada rompía todo listener que pasara por aquí.
                   La barra de selección solo tiene sentido en Territorios→Mapa. */
                const show = Boolean(selection?.name) && isSindicatoMapVisible()
                    && activeSindicatoSub === 'vivienda';
                mapSelectedTerritoryBar.hidden = !show;
                mapSelectedTerritoryName.textContent = selection?.name || '—';
            }

            function navigateSindicatoMapTerritoryFromSelection(selection) {
                if (!selection?.name) return;
                /* Linking (12-07-2026): el botón Info de la burbuja del mapa lleva a la
                   página del territorio en Territorios→Lista, para provincias y comarcas. */
                const page = window.SINDICAPP_SINDICATO?.resolveTerritoryPageFromBoundary?.(
                    activeLocale,
                    selection.type,
                    selection.name
                );
                if (page?.parentId) {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'vivienda') setSindicatoSub('vivienda');
                    activeSindicatoViviendaView = 'lista';
                    setSindicatoViviendaParent(page.parentId);
                    if (page.territoryId) setSindicatoViviendaTerritory(page.territoryId);
                    if (typeof window.hideTerritoryInfoBox === 'function') {
                        window.hideTerritoryInfoBox();
                    }
                    return;
                }
                /* Capas sin página de territorio (municipios, censo…): solo cerrar la burbuja. */
                if (typeof window.hideTerritoryInfoBox === 'function') {
                    window.hideTerritoryInfoBox();
                }
            }

            function restoreMapWorkspaceAfterTextMode() {
                if (!isOpenStreetMapEligible() || !mapInitialized || !currentMap) return;
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        try {
                            currentMap.invalidateSize(true);
                        } catch (_) {}
                        /* Fix zoom 12-07: el recenter diferido pisaba el setView de foco de empresa
                           (la vista saltaba de vuelta al país). En la pestaña «Mapa» de una empresa
                           reenfocamos su pin en lugar de recentrar. */
                        if (isSindicatoLocationWorkspace() && activeSindicatoWorkplace) {
                            focusSindicatoWorkplaceOnMap(activeSindicatoWorkplace);
                        } else {
                            recenterMapForLocale();
                        }
                        if (typeof window.ensureBoundaryLayersOnMap === 'function') {
                            window.ensureBoundaryLayersOnMap();
                        }
                        if (lastMapTerritorySelection?.name && lastMapTerritorySelection?.type
                            && typeof window.highlightTerritoryOnMap === 'function') {
                            window.highlightTerritoryOnMap(
                                lastMapTerritorySelection.type,
                                lastMapTerritorySelection.name
                            );
                        }
                        updateMapSelectedTerritoryBar();
                    });
                });
            }

            function syncTextModeBodyClasses() {
                const textOn = isTextWorkspaceModule();
                const sindLocationOn = isSindicatoLocationWorkspace();
                const selfSindicatoLocationOn = isSelfSindicatoLocationWorkspace();
                const sindTextOn = isSindicatoTextWorkspace();
                const sindMapSplit = isSindicatoMapSplitWorkspace();
                const sindMapOn = isSindicatoMapVisible() && !sindLocationOn && !sindMapSplit;
                document.body.classList.toggle('template-text-mode', textOn);
                document.body.classList.toggle('template-sindicato-text-workspace', sindTextOn);
                document.body.classList.toggle('template-sindicato-map-workspace', sindMapOn || sindMapSplit);
                document.body.classList.toggle('template-sindicato-split-workspace', sindMapSplit);
                document.body.classList.toggle('template-sindicato-location-workspace', sindLocationOn);
                document.body.classList.toggle('template-self-sindicato-location-workspace', selfSindicatoLocationOn);
                document.body.classList.toggle('template-self-content-sidebar-nav-only', textOn && activeModule === 'self');
            }

            function clearTextModeBodyClasses() {
                document.body.classList.remove(
                    'template-text-mode',
                    'template-sindicato-text-workspace',
                    'template-sindicato-map-workspace',
                    'template-sindicato-split-workspace',
                    'template-sindicato-location-workspace',
                    'template-self-sindicato-location-workspace',
                    'template-self-content-sidebar-nav-only'
                );
            }

            initLocaleEarly();

            try {
                relocalizeForLocale();
            } catch (bootErr) {
                console.error('SindicApp init error (partial UI may still work):', bootErr);
                showSindicAppBootError(getSindicAppMissingDependencies().concat(['init: ' + (bootErr && bootErr.message ? bootErr.message : String(bootErr))]));
            }

            function setSidebarOpen(isOpen) {
                document.body.classList.toggle('sidebar-open', Boolean(isOpen));
                syncMobileToggleLabels();
            }

            if (mobileToggle) {
                mobileToggle.addEventListener('click', () => {
                    setSidebarOpen(!document.body.classList.contains('sidebar-open'));
                });
            }

            function setMapPlaceholder(message) {
                const root = document.getElementById('map-provider-root');
                if (!root) return;
                if (root.querySelector('.leaflet-container')) return;
                let ph = root.querySelector('.map-placeholder');
                if (!ph) {
                    ph = document.createElement('div');
                    ph.className = 'map-placeholder';
                    root.appendChild(ph);
                }
                ph.textContent = message;
            }

            function clearMapSlot() {
                const root = document.getElementById('map-provider-root');
                if (!root) return;
                if (currentMap) {
                    try { currentMap.remove(); } catch (_) {}
                    currentMap = null;
                    mapInitialized = false;
                }
                root.innerHTML = '';
            }

            async function initOpenStreetMap() {
                if (!isOpenStreetMapEligible()) return;
                if (typeof L === 'undefined') {
                    initOpenStreetMap._leafletRetries = (initOpenStreetMap._leafletRetries || 0) + 1;
                    if (initOpenStreetMap._leafletRetries <= 20) {
                        setTimeout(initOpenStreetMap, 50);
                        return;
                    }
                    setMapPlaceholder('Leaflet failed to load. Check your network connection.');
                    return;
                }
                initOpenStreetMap._leafletRetries = 0;
                clearMapSlot();
                const root = document.getElementById('map-provider-root');
                const div = document.createElement('div');
                div.id = 'leaflet-map';
                div.style.width = '100%';
                div.style.height = '100%';
                root.appendChild(div);
                const mapCfg = getLocaleConfig(activeLocale);
                currentMap = L.map('leaflet-map', {
                    center: mapCfg.mapCenter,
                    zoom: mapCfg.mapZoom
                });
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 19,
                    subdomains: 'abc'
                }).addTo(currentMap);
                mapInitialized = true;
                currentProvider = 'openstreetmap';
                if (typeof window.cartagramaSetMapContext === 'function') {
                    window.cartagramaSetMapContext(currentMap, 'openstreetmap');
                }
                let leafletTerritoryClickHandled = false;
                currentMap.on('click', () => {
                    setTimeout(() => {
                        if (!leafletTerritoryClickHandled) {
                            if (typeof window.closeTerritoryInfoBox === 'function') {
                                window.closeTerritoryInfoBox();
                            } else if (typeof window.resetTerritoryInfo === 'function') {
                                window.resetTerritoryInfo();
                            }
                        }
                        leafletTerritoryClickHandled = false;
                    }, 50);
                });
                window.__leafletPolygonClickHandled = () => {
                    leafletTerritoryClickHandled = true;
                };
                requestAnimationFrame(() => {
                    try { currentMap.invalidateSize(); } catch (_) {}
                    syncSindicatoMapMarkers();
                    if (isSindicatoMapVisible()) {
                        ensureSindicatoDefaultBoundaryLayer();
                        if (typeof window.ensureBoundaryLayersOnMap === 'function') {
                            window.ensureBoundaryLayersOnMap();
                        }
                    }
                });
            }

            /* C4 — feedback de acciones: toast sobrio, autodescartable, aria-live */
            let notifyHost = null;
            function notify(message, tone) {
                if (!message) return;
                if (!notifyHost) {
                    notifyHost = document.createElement('div');
                    notifyHost.className = 'sindicapp-toast-host';
                    notifyHost.setAttribute('aria-live', 'polite');
                    document.body.appendChild(notifyHost);
                }
                const toast = document.createElement('div');
                toast.className = 'sindicapp-toast' + (tone ? ' sindicapp-toast--' + tone : '');
                toast.setAttribute('role', 'status');
                toast.textContent = message;
                notifyHost.appendChild(toast);
                requestAnimationFrame(() => toast.classList.add('is-visible'));
                setTimeout(() => {
                    toast.classList.remove('is-visible');
                    setTimeout(() => toast.remove(), 400);
                }, 3500);
            }

            function sindicatoNotice(key) {
                /* F3: la copy es del IDIOMA (t maneja 'ca' con fallback al castellano), no del dataset. */
                const pack = window.SINDICAPP_SINDICATO?.t?.(activeLocale);
                return pack?.notices?.[key] || '';
            }

            function syncTextWorkspace() {
                if (!mapTextDisplay) return;
                refreshNotifBadge();
                mapTextDisplay.innerHTML = '';
                if (activeModule === 'self' && activeSelfSub === 'sindicato') {
                    if (isSelfSindicatoLocationWorkspace()) {
                        syncSelfSindicatoLocationBridge();
                    } else {
                        syncSelfSindicatoWorkspace();
                    }
                    return;
                }
                if (activeModule === SINDICATO_MODULE && isSindicatoLocationWorkspace()) {
                    syncSindicatoLocationBridge();
                    return;
                }
                if (activeModule === SINDICATO_MODULE && (isSindicatoMapSplitWorkspace() || isSindicatoTextWorkspace())) {
                    syncSindicatoWorkspace();
                }
            }

            function getSindicAppMissingDependencies() {
                const missing = [];
                if (typeof window.setupBoundaryControls !== 'function') {
                    missing.push('cartagrama-territories-bundle.js');
                }
                if (!window.SINDICAPP_GEO) {
                    missing.push('sindicapp-locale-geo-data.js');
                }
                if (!window.SINDICAPP_IE || !window.SINDICAPP_IE.localeUi) {
                    missing.push('sindicapp-locale-en-content.js');
                }
                if (!window.SINDICAPP_ES) {
                    missing.push('sindicapp-locale-es-content.js');
                }
                /* 20-07 tarde (idea 71): el módulo Sindicato viene ahora en tres
                   scripts — copy, datos y lógica — cargados en orden antes que este. */
                if (!window.SINDICAPP_SINDICATO_COPY) {
                    missing.push('sindicapp-sindicato-copy.js');
                }
                if (!window.SINDICAPP_SINDICATO_DATA) {
                    missing.push('sindicapp-sindicato-data.js');
                }
                return missing;
            }

            function showSindicAppBootError(missing) {
                if (!missing.length || document.getElementById('sindicapp-boot-error')) return;
                const fromDrive = /drive\.google\.com|docs\.google\.com|googleusercontent\.com/i.test(location.hostname);
                const el = document.createElement('div');
                el.id = 'sindicapp-boot-error';
                el.className = 'sindicapp-boot-error';
                el.setAttribute('role', 'alert');
                el.innerHTML = `<strong>SindicApp failed to start</strong>
                    <p>These embedded modules did not initialize:</p>
                    <ul>${missing.map((f) => `<li><code>${f}</code></li>`).join('')}</ul>
                    ${fromDrive
                        ? '<p><strong>Google Drive preview blocked script execution.</strong> Download <code>SindicApp.html</code> and open it locally (Chrome → File → Open), not inside Drive’s preview.</p>'
                        : '<p>Try reloading the page. If you edited locale data, run <code>node scripts/bundle-sindicapp.mjs</code> to rebuild the single-file bundle. Map tiles still need internet (Leaflet loads from CDN).</p>'}`;
                const host = document.getElementById('console-content') || document.body;
                host.insertBefore(el, host.firstChild);
            }

            function assertSindicAppDependencies() {
                const missing = getSindicAppMissingDependencies();
                if (missing.length) showSindicAppBootError(missing);
                return !missing.length;
            }

            function initBoundaryControlsOnce() {
                if (boundaryControlsInitialized) return;
                if (!assertSindicAppDependencies()) return;
                syncEuropePreCheckedOverride(activeLocale);
                if (typeof window.setupBoundaryControls === 'function') {
                    window.setupBoundaryControls();
                    boundaryControlsInitialized = true;
                    applyEuropePinnedTerritories(getLocaleConfig(activeLocale).europePreChecked);
                }
            }

            function getActivePanelId() {
                if (activeModule === SINDICATO_MODULE) {
                    if (isSindicatoMapVisible()) return 'geo-teams';
                    if (!activeSindicatoSub) return null;
                    return 'sindicato';
                }
                return activeModule;
            }

            function isTextWorkspaceModule() {
                if (activeModule === 'self') {
                    return activeSelfSub === 'sindicato' && !isSelfSindicatoLocationWorkspace();
                }
                return false;
            }

            function isOpenStreetMapEligible() {
                return isSindicatoMapVisible() || !activeModule;
            }

            function syncMapWorkspacePlaceholder() {
                if (isSindicatoMapVisible() || isTextWorkspaceModule()) return;
                const root = document.getElementById('map-provider-root');
                if (!root || root.querySelector('.leaflet-container')) return;
                if (!activeModule) return;
                const ui = getLocaleUi();
                setMapPlaceholder(ui.welcome || 'Welcome to SindicApp');
            }

            function syncSindicAppHeaderLogo() {
                const logo = document.querySelector('#content-lux21-template .sindicapp-header-logo');
                const logoSrc = window.SINDICAPP_LOGO?.LOGO_SRC || window.SINDICAPP_SINDICATO?.LOGO_SRC;
                if (logo && logoSrc) logo.src = logoSrc;
            }

            function syncPortadaWelcome() {
                /* Fusión 13-07-2026: la portada vive también bajo Red Social, así que se
                   sincroniza siempre (antes solo sin módulo activo). */
                const logo = portadaWelcomeLogo || document.getElementById('portada-welcome-logo');
                const titleEl = document.getElementById('portada-welcome-title');
                const logoSrc = window.SINDICAPP_SINDICATO?.LOGO_SRC || window.SINDICAPP_LOGO?.LOGO_SRC;
                if (logo && logoSrc) logo.src = logoSrc;
                const c = getSindicatoCopy();
                if (titleEl && c.welcomeTitle) titleEl.textContent = c.welcomeTitle;
            }

            function updateModuleBodyLabel() {
                if (!moduleBodyLabel) return;
                if (!activeModule) {
                    moduleBodyLabel.textContent = '';
                    moduleBodyLabel.hidden = true;
                    syncPortadaWelcome();
                    return;
                }
                /* 12-07-2026 — con el panel stub de Sindicato retirado, la etiqueta al pie de la
                   sidebar («Territorios — Gironès», etc.) era redundante: la vista completa ya
                   lleva su propio título en el espacio de fondo. Solo se mantiene en Mapa. */
                if (activeModule === SINDICATO_MODULE && getActivePanelId() === 'sindicato') {
                    moduleBodyLabel.textContent = '';
                    moduleBodyLabel.hidden = true;
                    syncPortadaWelcome();
                    return;
                }
                const labels = getModuleLabels();
                let title = labels[activeModule] || activeModule;
                if (activeModule === SINDICATO_MODULE) {
                    const c = getSindicatoCopy();
                    const subs = c.subs || {};
                    if (!activeSindicatoSub) {
                        title = labels.sindicato || 'Colectivo';
                    } else {
                        title = subs[activeSindicatoSub] || labels.sindicato || 'Syndicate';
                    }
                    if (activeSindicatoSub === 'workplaces' && activeSindicatoWorkplace && window.SINDICAPP_SINDICATO) {
                        const wp = window.SINDICAPP_SINDICATO.findWorkplace(activeLocale, activeSindicatoWorkplace);
                        const sections = c.sections || {};
                        const sec = sections[activeSindicatoSection] || activeSindicatoSection;
                        if (wp) title = `${wp.name} — ${sec}`;
                    } else if (activeSindicatoSub === 'sectores' && activeSindicatoSector && window.SINDICAPP_SINDICATO?.resolveSectorNode) {
                        const sectorNode = window.SINDICAPP_SINDICATO.resolveSectorNode(activeLocale, activeSindicatoSector);
                        if (sectorNode) title = `${subs.sectores || 'Sectors'} — ${sectorNode.name}`;
                    } else if (activeSindicatoSub === 'coordination') {
                        const coordSubs = c.coordSubs || {};
                        const coordLabel = coordSubs[activeSindicatoCoordSub] || activeSindicatoCoordSub;
                        title = `${subs.coordination || 'CRM'} — ${coordLabel}`;
                    } else if (activeSindicatoSub === 'wiki') {
                        const wikiSubs = c.wikiSubs || {};
                        const wikiLabel = wikiSubs[activeSindicatoWikiSub] || activeSindicatoWikiSub;
                        title = `${subs.wiki || 'Wiki'} — ${wikiLabel}`;
                    } else if (activeSindicatoSub === 'vivienda' && activeSindicatoViviendaTerritory && window.SINDICAPP_SINDICATO) {
                        const terr = window.SINDICAPP_SINDICATO.getSubterritoryById(activeLocale, activeSindicatoViviendaTerritory);
                        if (terr) title = `${subs.vivienda || 'Territorios'} — ${terr.name}`;
                    } else if (activeSindicatoSub === 'unions' && activeSindicatoUnion && window.SINDICAPP_SINDICATO) {
                        const union = window.SINDICAPP_SINDICATO.findUnion(activeLocale, activeSindicatoUnion);
                        const unionSections = c.unionSections || {};
                        const sec = unionSections[activeSindicatoUnionSection]
                            || (activeSindicatoUnionSection.indexOf('crm-') === 0
                                && (c.coordSubs || {})[activeSindicatoUnionSection.slice(4)])
                            || activeSindicatoUnionSection;
                        if (union) title = `${union.name} — ${sec}`;
                    }
                } else if (activeModule === 'self') {
                    const s = (getLocalePack() && getLocalePack().selfSections) || {};
                    if (activeSelfSub === 'sindicato') {
                        const c = getSindicatoCopy();
                        const wp = window.SINDICAPP_SINDICATO?.findWorkplace(activeLocale, getUserWorkplaceId());
                        const sectionLabel = (c.sections && c.sections[activeSelfSindicatoSection])
                            || activeSelfSindicatoSection;
                        title = wp
                            ? `${s.selfSubSindicato || 'Syndicate'} — ${wp.name} — ${sectionLabel}`
                            : `${s.selfSubSindicato || 'Syndicate'} — ${sectionLabel}`;
                    }
                }
                moduleBodyLabel.textContent = title;
                moduleBodyLabel.hidden = !title;
                syncPortadaWelcome();
            }

            function applyVisiblePanels() {
                const panelId = getActivePanelId();
                modulePanels.forEach((panel) => {
                    const id = panel.getAttribute('data-module-panel');
                    const show = Boolean(activeModule) && panelId && id === panelId;
                    panel.classList.toggle('active', show);
                    panel.hidden = !show;
                });
            }

            function updateModulePickerActiveStates() {
                if (!templateModulePicker) return;
                templateModulePicker.querySelectorAll('[data-module]').forEach((btn) => {
                    const mod = btn.getAttribute('data-module');
                    const on = (mod === 'self' && activeModule === 'self')
                        || (mod === 'sindicato' && activeModule === SINDICATO_MODULE);
                    btn.classList.toggle('active', on);
                });
            }

            if (mapSelectedTerritoryInfoBtn) {
                mapSelectedTerritoryInfoBtn.addEventListener('click', () => navigateSindicatoMapTerritoryFromSelection(lastMapTerritorySelection));
            }
            /* Fix 12-07-2026: delegación a nivel de documento — Cartagrama puede
               recrear la burbuja (#territory-info-box) y un listener atado al
               elemento original se perdería. */
            document.addEventListener('click', (e) => {
                if (e.target.closest('#territory-info-box-info-btn')) {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateSindicatoMapTerritoryFromSelection(lastMapTerritorySelection);
                    return;
                }
                const bubbleClose = e.target.closest('#territory-info-box .close-btn');
                if (bubbleClose && typeof window.closeTerritoryInfoBox === 'function') {
                    e.preventDefault();
                    e.stopPropagation();
                    window.closeTerritoryInfoBox();
                }
            });
            if (typeof window.wireTerritoryInfoBoxControls === 'function') {
                window.wireTerritoryInfoBoxControls();
            }

            /* Fix 12-07-2026: Cartagrama emite «pandora-territory-selected/cleared»;
               aquí se escuchaba «sindicapp-territory-…», que no emite nadie — por eso
               el botón Info de la burbuja no respondía a clics reales en el geojson.
               Se escuchan ambos nombres por compatibilidad. */
            const onMapTerritorySelected = (e) => {
                lastMapTerritorySelection = e.detail || null;
                updateMapSelectedTerritoryBar();
                /* Reestructura 12-07-2026: seleccionar una feature ya no abre el dossier
                   antiguo; la navegación a la página del territorio la hace el botón
                   Info de la burbuja (navigateSindicatoMapTerritoryFromSelection). */
            };
            const onMapTerritoryCleared = () => {
                lastMapTerritorySelection = null;
                updateMapSelectedTerritoryBar();
            };
            document.addEventListener('pandora-territory-selected', onMapTerritorySelected);
            document.addEventListener('sindicapp-territory-selected', onMapTerritorySelected);
            document.addEventListener('pandora-territory-cleared', onMapTerritoryCleared);
            document.addEventListener('sindicapp-territory-cleared', onMapTerritoryCleared);

            if (templateModulePicker) {
                templateModulePicker.addEventListener('click', (e) => {
                    const btn = e.target.closest('.template-module-btn[data-module]');
                    if (!btn || !templateModulePicker.contains(btn)) return;
                    const mod = btn.getAttribute('data-module');
                    if (mod) setActiveModule(mod);
                });
            }

            selfSindicatoSectionButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== 'self') setActiveModule('self');
                    if (activeSelfSub !== 'sindicato') setSelfSub('sindicato');
                    setSelfSindicatoSection(btn.getAttribute('data-self-sindicato-section'));
                });
            });

            sindicatoSubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const sub = btn.getAttribute('data-sindicato-sub');
                    /* 13-07-2026: Usuario es el 8º botón del subnav; activa el módulo 'self'. */
                    if (sub === 'usuario') {
                        if (activeModule !== 'self') setActiveModule('self');
                        return;
                    }
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub(sub);
                });
            });

            /* ===== Web triplicada (17-07-2026): versiones clásica/propuesta/final =====
               Clásica y Final comparten el código existente (son idénticas por ahora);
               la Propuesta sustituye el shell de navegación por anillos de acceso con
               un simulador de rol. */
            /* 18-07 (idea 50): modo asamblea — overlay de proyección, fuera del flujo de
               re-render del workspace (vive en <body>, con listener propio). */
            function renderAsambleaLive(type, sessionId) {
                let host = document.getElementById('sindicapp-asamblea-live');
                if (!host) {
                    host = document.createElement('div');
                    host.id = 'sindicapp-asamblea-live';
                    host.addEventListener('click', (e) => {
                        const closeBtn = e.target.closest('[data-asamblea-live-close]');
                        if (closeBtn) { host.remove(); return; }
                        const nextBtn = e.target.closest('[data-asamblea-live-next]');
                        if (nextBtn) {
                            const raw = nextBtn.getAttribute('data-asamblea-live-next') || '';
                            const i = raw.indexOf('|');
                            window.SINDICAPP_SINDICATO.propuestaAdvanceTurn(activeLocale, raw.slice(i + 1), raw.slice(0, i));
                            renderAsambleaLive(raw.slice(0, i), raw.slice(i + 1));
                            syncTextWorkspace();
                        }
                    });
                    document.body.appendChild(host);
                }
                const html = window.SINDICAPP_SINDICATO
                    ? window.SINDICAPP_SINDICATO.buildAsambleaLiveHtml(activeLocale, sessionId, type)
                    : '';
                if (!html) { host.remove(); return; }
                host.innerHTML = html;
                const adv = host.querySelector('.asamblea-live-advance');
                if (adv) adv.focus();
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    document.getElementById('sindicapp-asamblea-live')?.remove();
                }
            });

            /* 18-07 (idea 54): campana de avisos según rol en la cabecera. El badge se
               apaga al abrir el panel y vuelve si aparecen avisos nuevos. */
            const notifToggle = document.getElementById('sindicapp-notif-toggle');
            const notifPanel = document.getElementById('sindicapp-notif-panel');
            const notifBadge = document.getElementById('sindicapp-notif-badge');
            let notifSeenCount = -1;
            function refreshNotifBadge() {
                if (!notifBadge || !window.SINDICAPP_SINDICATO?.getNotificationCount) return;
                /* 20-07 (ADR 0024): los avisos internos dependen del cargo, no de «militante». */
                const n = window.SINDICAPP_SINDICATO.getNotificationCount(activeLocale, activePropuestaRole, activePropuestaCargo);
                notifBadge.textContent = String(n);
                notifBadge.hidden = !n || n === notifSeenCount;
            }
            if (notifToggle && notifPanel) {
                notifToggle.addEventListener('click', () => {
                    const opening = notifPanel.hidden;
                    if (opening && window.SINDICAPP_SINDICATO?.buildNotificationsHtml) {
                        notifPanel.innerHTML = window.SINDICAPP_SINDICATO.buildNotificationsHtml(activeLocale, activePropuestaRole, activePropuestaCargo);
                        notifSeenCount = window.SINDICAPP_SINDICATO.getNotificationCount(activeLocale, activePropuestaRole, activePropuestaCargo);
                    }
                    notifPanel.hidden = !opening;
                    notifToggle.setAttribute('aria-expanded', String(opening));
                    refreshNotifBadge();
                });
                document.addEventListener('click', (e) => {
                    if (!notifPanel.hidden
                        && !e.target.closest?.('#sindicapp-notif-panel')
                        && !e.target.closest?.('#sindicapp-notif-toggle')) {
                        notifPanel.hidden = true;
                        notifToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            }

            /* 20-07-2026 (idea 52, ADR 0024): búsqueda global en cabecera — entidades
               públicas por nombre, con dropdown al estilo del panel de avisos. La
               navegación reutiliza lo existente: hashes de empresa/territorio/equipo
               y el salto de wiki (misma lógica que data-sindicato-wiki-jump). */
            const globalSearchInput = document.getElementById('sindicapp-global-search');
            const globalSearchPanel = document.getElementById('sindicapp-search-panel');
            let globalSearchTimer = null;
            function closeGlobalSearch(clearInput) {
                if (globalSearchPanel) {
                    globalSearchPanel.hidden = true;
                    globalSearchPanel.innerHTML = '';
                }
                if (clearInput && globalSearchInput) globalSearchInput.value = '';
            }
            function renderGlobalSearchResults() {
                if (!globalSearchInput || !globalSearchPanel || !window.SINDICAPP_SINDICATO?.searchEntities) return;
                const q = globalSearchInput.value.trim();
                if (!q) { closeGlobalSearch(false); return; }
                const c = sindicappCopy();
                const results = window.SINDICAPP_SINDICATO.searchEntities(activeLocale, q);
                globalSearchPanel.innerHTML = results.length
                    ? results.map((r) =>
                        `<button type="button" class="sindicapp-search-result" data-sindicapp-search-goto="${r.kind}:${r.id}">
                            <span aria-hidden="true">${r.icon}</span> <strong>${r.name}</strong>${r.hint ? ` <span class="template-muted">· ${r.hint}</span>` : ''}
                        </button>`).join('')
                    : `<p class="template-muted sindicapp-notif-item">${c.searchNoResults || '—'}</p>`;
                globalSearchPanel.hidden = false;
            }
            if (globalSearchInput && globalSearchPanel) {
                globalSearchInput.addEventListener('input', () => {
                    /* Debounce simple: el dataset es pequeño, 150 ms bastan. */
                    clearTimeout(globalSearchTimer);
                    globalSearchTimer = setTimeout(renderGlobalSearchResults, 150);
                });
                globalSearchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') closeGlobalSearch(true);
                });
                globalSearchPanel.addEventListener('click', (e) => {
                    const btn = e.target.closest('[data-sindicapp-search-goto]');
                    if (!btn) return;
                    e.preventDefault();
                    const raw = btn.getAttribute('data-sindicapp-search-goto') || '';
                    const sep = raw.indexOf(':');
                    if (sep === -1) return;
                    const kind = raw.slice(0, sep);
                    const id = raw.slice(sep + 1);
                    if (kind === 'workplace') {
                        location.hash = '#sindicato-empresa:' + id;
                    } else if (kind === 'territory') {
                        location.hash = '#sindicato-territorio:' + id;
                    } else if (kind === 'union') {
                        location.hash = '#sindicato-equipo:unions:' + id;
                    } else if (kind === 'housing' || kind === 'profesionales' || kind === 'autonomos'
                        || kind === 'consumidores' || kind === 'estudiantes') {
                        location.hash = '#sindicato-equipo:' + kind + ':' + id;
                    } else if (kind === 'wiki') {
                        /* Mismo camino que data-sindicato-wiki-jump. */
                        if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                        if (activeSindicatoSub !== 'wiki') setSindicatoSub('wiki');
                        setSindicatoWikiSub(id);
                    }
                    closeGlobalSearch(true);
                });
                document.addEventListener('click', (e) => {
                    if (!globalSearchPanel.hidden
                        && !e.target.closest?.('#sindicapp-search-panel')
                        && !e.target.closest?.('#sindicapp-global-search')) {
                        closeGlobalSearch(false);
                    }
                });
            }

            /* 20-07-2026: el onboarding de primera visita (idea 53) se RETIRÓ por decisión
               de Edu — a la moratoria (ADR 0021) hasta la fase producto. El flag
               'sindicapp-onboarded-v1' deja de leerse y escribirse. */

            function sindicappCopy() {
                /* F3: devuelve la copy del IDIOMA activo vía t() — bajo 'ca' llega el
                   merge profundo catalán-sobre-castellano (ADR 0023), nunca el inglés. */
                return window.SINDICAPP_SINDICATO?.t?.(activeLocale) || {};
            }

            /* 17-07-2026 (descomposición CRM, fase 2): muestra solo las pestañas del CRM que
               encajan en el tipo de colectivo desde el que se entró; oculta las demás y
               reencuadra la pestaña activa si dejó de estar permitida. */
            function syncCrmTabsForContext() {
                if (!window.SINDICAPP_SINDICATO) return;
                const tabs = window.SINDICAPP_SINDICATO.getCrmTabsForType(activeCrmContextModule);
                let firstVisible = '';
                sindicatoCoordSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-coord-sub');
                    const allowed = tabs.indexOf(id) !== -1;
                    btn.hidden = !allowed;
                    if (allowed && !firstVisible) firstVisible = id;
                });
                if (tabs.indexOf(activeSindicatoCoordSub) === -1 && firstVisible) {
                    activeSindicatoCoordSub = firstVisible;
                }
            }

            /* 20-07-2026 (ADR 0025): grupo del acordeón al que pertenece un sub —
               delega en el módulo Sindicato, que es quien conoce los dos cuadros. */
            function navGroupForSub(sub) {
                return window.SINDICAPP_SINDICATO?.navGroupForSub?.(sub) || '';
            }

            function syncPropuestaNav() {
                const onPropuesta = activeWebVersion === 'propuesta';
                if (sindicatoSubnavPropuesta) {
                    sindicatoSubnavPropuesta.hidden = !onPropuesta;
                    if (onPropuesta && window.SINDICAPP_SINDICATO) {
                        const currentSub = activeModule === 'self' ? 'self' : activeSindicatoSub;
                        /* 20-07-2026 (ADR 0025): auto-expansión del acordeón — si el sub
                           activo cambió por CUALQUIER vía (click de nav, búsqueda global,
                           hash/History: todas acaban re-sincronizando aquí),
                           el grupo al que pertenece se abre solo. Así navegar por hash a
                           un sub de un grupo cerrado funciona y lo expande. */
                        if (currentSub !== lastPropuestaNavSub) {
                            lastPropuestaNavSub = currentSub;
                            const grp = navGroupForSub(currentSub);
                            if (grp && grp !== activePropuestaNavGroup) {
                                activePropuestaNavGroup = grp;
                                try { localStorage.setItem('sindicapp-nav-group', grp); } catch (err) { /* demo */ }
                            }
                        }
                        /* 20-07 tarde (idea 68 parcial): buildPropuestaNavHtml perdió el
                           4º parámetro `activeScreen` (solo servía al sub `anillo`) —
                           el grupo del acordeón pasa a ser el 4º argumento. */
                        sindicatoSubnavPropuesta.innerHTML = window.SINDICAPP_SINDICATO.buildPropuestaNavHtml(
                            activeLocale, activePropuestaRole, currentSub, activePropuestaNavGroup
                        );
                    }
                }
                document.body.classList.toggle('sindicapp-version-propuesta', onPropuesta);
                /* Elementos marcados .propuesta-only solo existen en la versión propuesta.
                   Los tabs del CRM (data-sindicato-coord-sub) se excluyen: su visibilidad
                   la gobierna syncCrmTabsForContext según el tipo de colectivo. */
                document.querySelectorAll('.propuesta-only:not([data-sindicato-coord-sub])').forEach((el) => { el.hidden = !onPropuesta; });
            }

            /* setWebVersion + barra de versiones purgadas el 18-07 (F5 del report v4):
               la versión es única ('propuesta') desde la unificación del 17-07. */

            if (sindicatoSubnavPropuesta) {
                sindicatoSubnavPropuesta.addEventListener('click', (e) => {
                    const roleBtn = e.target.closest('[data-propuesta-role]');
                    if (roleBtn) {
                        activePropuestaRole = roleBtn.getAttribute('data-propuesta-role') || 'visitante';
                        try { localStorage.setItem('sindicapp-propuesta-role', activePropuestaRole); } catch (err) { /* demo */ }
                        syncPropuestaNav();
                        applySindicatoViewSync();
                        return;
                    }
                    const lockedBtn = e.target.closest('[data-propuesta-locked]');
                    if (lockedBtn) {
                        const c = sindicappCopy();
                        const minRole = lockedBtn.getAttribute('data-propuesta-locked');
                        const roleName = (c.propuestaRoles && c.propuestaRoles[minRole]) || minRole;
                        notify((c.propuestaLockNotice || '').replace('{role}', roleName), 'warn');
                        return;
                    }
                    /* 20-07-2026 (ADR 0025): cabeceras del acordeón — clicar la del grupo
                       cerrado lo abre y cierra el otro; clicar la del abierto no lo
                       colapsa (siempre hay exactamente un grupo abierto). */
                    const navGroupBtn = e.target.closest('[data-propuesta-navgroup]');
                    if (navGroupBtn) {
                        const grp = navGroupBtn.getAttribute('data-propuesta-navgroup');
                        if ((grp === 'sindicatos' || grp === 'funcionalidades') && grp !== activePropuestaNavGroup) {
                            activePropuestaNavGroup = grp;
                            try { localStorage.setItem('sindicapp-nav-group', grp); } catch (err) { /* demo */ }
                            syncPropuestaNav();
                        }
                        return;
                    }
                    const gotoBtn = e.target.closest('[data-propuesta-goto]');
                    if (gotoBtn) {
                        const raw = gotoBtn.getAttribute('data-propuesta-goto') || '';
                        const sep = raw.indexOf(':');
                        if (sep === -1) return;
                        const kind = raw.slice(0, sep);
                        const id = raw.slice(sep + 1);
                        /* 20-07 tarde (idea 68 parcial): solo queda el kind 'sub' — el
                           kind de pantalla de anillo se purgó con el sub `anillo`. */
                        if (kind === 'sub') {
                            if (id === 'usuario') {
                                if (activeModule !== 'self') setActiveModule('self');
                            } else {
                                if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                                setSindicatoSub(id);
                            }
                        }
                        syncPropuestaNav();
                    }
                });
            }
            syncPropuestaNav();

            /* Reestructura 12-07-2026: toggles Mapa/Lista en Empresas y Territorios */
            document.querySelectorAll('[data-sindicato-vivienda-view]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'vivienda') setSindicatoSub('vivienda');
                    setSindicatoViviendaView(btn.getAttribute('data-sindicato-vivienda-view'));
                });
            });
            document.querySelectorAll('[data-sindicato-workplaces-view]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'workplaces') setSindicatoSub('workplaces');
                    setSindicatoWorkplacesView(btn.getAttribute('data-sindicato-workplaces-view'));
                });
            });

            sindicatoCoordSubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'coordination') setSindicatoSub('coordination');
                    setSindicatoCoordSub(btn.getAttribute('data-sindicato-coord-sub'));
                });
            });

            sindicatoWikiSubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'wiki') setSindicatoSub('wiki');
                    setSindicatoWikiSub(btn.getAttribute('data-sindicato-wiki-sub'));
                });
            });

            sindicatoHousingSubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'housing') setSindicatoSub('housing');
                    setSindicatoHousingSub(btn.getAttribute('data-sindicato-housing-sub'));
                });
            });

            if (sindicatoViviendaParentSelect) {
                sindicatoViviendaParentSelect.addEventListener('change', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'vivienda') setSindicatoSub('vivienda');
                    setSindicatoViviendaParent(sindicatoViviendaParentSelect.value);
                });
            }

            if (sindicatoViviendaTerritorySelect) {
                sindicatoViviendaTerritorySelect.addEventListener('change', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'vivienda') setSindicatoSub('vivienda');
                    setSindicatoViviendaTerritory(sindicatoViviendaTerritorySelect.value);
                });
            }

            if (sindicatoViviendaMunicipalitySelect) {
                sindicatoViviendaMunicipalitySelect.addEventListener('change', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'vivienda') setSindicatoSub('vivienda');
                    setSindicatoViviendaMunicipality(sindicatoViviendaMunicipalitySelect.value);
                });
            }

            if (sindicatoMapTerritoryTreeMount) {
                sindicatoMapTerritoryTreeMount.addEventListener('click', (e) => {
                    const toggleBtn = e.target.closest('.sindicato-sector-toggle');
                    if (toggleBtn) {
                        e.preventDefault();
                        const node = toggleBtn.closest('.sindicato-sector-node');
                        const children = node?.querySelector(':scope > .sindicato-sector-children');
                        const icon = toggleBtn.querySelector('.sindicato-sector-toggle-icon');
                        if (children) {
                            const open = children.classList.toggle('is-open');
                            toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
                            if (icon) icon.textContent = open ? '▼' : '▶';
                        }
                        return;
                    }
                    if (e.target.closest('[data-sindicato-goto-vivienda]')) return;
                    const terrBtn = e.target.closest('[data-sindicato-map-territory]');
                    if (!terrBtn) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'map') setSindicatoSub('map');
                    const terrId = terrBtn.getAttribute('data-sindicato-map-territory');
                    const nextId = activeSindicatoMapTerritory === terrId ? '' : terrId;
                    setSindicatoMapTerritory(nextId);
                });
            }

            sindicatoUnionSectionButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (!activeSindicatoUnion) return;
                    setSindicatoUnionSection(btn.getAttribute('data-sindicato-union-section'));
                });
            });

            if (sindicatoUnionSelect) {
                sindicatoUnionSelect.addEventListener('change', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'unions') setSindicatoSub('unions');
                    setSindicatoUnion(sindicatoUnionSelect.value);
                });
            }

            if (sindicatoUnionSearch) {
                sindicatoUnionSearch.addEventListener('input', () => {
                    sindicatoUnionFilter = sindicatoUnionSearch.value;
                    rebuildSindicatoUnionSelect();
                });
            }

            /* 17-07-2026: selectores de sidebar de Profesionales/Consumidores/Estudiantes */
            if (sindicatoProfesionalesSelect) {
                sindicatoProfesionalesSelect.addEventListener('change', () => {
                    activeSindicatoProfesional = sindicatoProfesionalesSelect.value || '';
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'profesionales') {
                        const keep = activeSindicatoProfesional;
                        setSindicatoSub('profesionales');
                        activeSindicatoProfesional = keep;
                    }
                    applySindicatoViewSync();
                });
            }
            if (sindicatoProfesionalesSearch) {
                sindicatoProfesionalesSearch.addEventListener('input', () => {
                    sindicatoProfesionalesFilter = sindicatoProfesionalesSearch.value;
                    rebuildSindicatoDirSelects();
                });
            }
            if (sindicatoConsumidoresSelect) {
                sindicatoConsumidoresSelect.addEventListener('change', () => {
                    activeSindicatoConsumidor = sindicatoConsumidoresSelect.value || '';
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'consumidores') {
                        const keep = activeSindicatoConsumidor;
                        setSindicatoSub('consumidores');
                        activeSindicatoConsumidor = keep;
                    }
                    applySindicatoViewSync();
                });
            }
            if (sindicatoConsumidoresSearch) {
                sindicatoConsumidoresSearch.addEventListener('input', () => {
                    sindicatoConsumidoresFilter = sindicatoConsumidoresSearch.value;
                    rebuildSindicatoDirSelects();
                });
            }
            if (sindicatoEstudiantesSelect) {
                sindicatoEstudiantesSelect.addEventListener('change', () => {
                    activeSindicatoEstudiantesCentro = sindicatoEstudiantesSelect.value || '';
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'estudiantes') {
                        const keep = activeSindicatoEstudiantesCentro;
                        setSindicatoSub('estudiantes');
                        activeSindicatoEstudiantesCentro = keep;
                    }
                    applySindicatoViewSync();
                });
            }
            if (sindicatoEstudiantesSearch) {
                sindicatoEstudiantesSearch.addEventListener('input', () => {
                    sindicatoEstudiantesFilter = sindicatoEstudiantesSearch.value;
                    rebuildSindicatoDirSelects();
                });
            }
            if (sindicatoAutonomosSelect) {
                sindicatoAutonomosSelect.addEventListener('change', () => {
                    activeSindicatoAutonomo = sindicatoAutonomosSelect.value || '';
                    activeEquipoSection = 'resumen';
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'autonomos') {
                        const keep = activeSindicatoAutonomo;
                        setSindicatoSub('autonomos');
                        activeSindicatoAutonomo = keep;
                    }
                    applySindicatoViewSync();
                });
            }
            if (sindicatoAutonomosSearch) {
                sindicatoAutonomosSearch.addEventListener('input', () => {
                    sindicatoAutonomosFilter = sindicatoAutonomosSearch.value;
                    rebuildSindicatoDirSelects();
                });
            }
            if (sindicatoHousingSelect) {
                sindicatoHousingSelect.addEventListener('change', () => {
                    activeSindicatoHousingUnion = sindicatoHousingSelect.value || '';
                    activeEquipoSection = 'resumen';
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'housing') {
                        const keep = activeSindicatoHousingUnion;
                        setSindicatoSub('housing');
                        activeSindicatoHousingUnion = keep;
                    }
                    applySindicatoViewSync();
                });
            }
            if (sindicatoHousingSearch) {
                sindicatoHousingSearch.addEventListener('input', () => {
                    sindicatoHousingFilter = sindicatoHousingSearch.value;
                    rebuildSindicatoDirSelects();
                });
            }

            sindicatoSectionButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (!activeSindicatoWorkplace) return;
                    setSindicatoSection(btn.getAttribute('data-sindicato-section'));
                });
            });

            if (sindicatoWorkplaceSelect) {
                sindicatoWorkplaceSelect.addEventListener('change', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'workplaces') setSindicatoSub('workplaces');
                    setSindicatoWorkplace(sindicatoWorkplaceSelect.value);
                });
            }

            if (sindicatoWorkplaceSearch) {
                sindicatoWorkplaceSearch.addEventListener('input', () => {
                    sindicatoWorkplaceFilter = sindicatoWorkplaceSearch.value;
                    rebuildSindicatoWorkplaceSelect();
                    if (activeModule === SINDICATO_MODULE && activeSindicatoSub === 'workplaces' && !activeSindicatoWorkplace) {
                        syncSindicatoWorkspace();
                    }
                });
            }

            /* 17-07-2026 (fix): el nav de secciones del equipo vive en la BARRA LATERAL y se
               re-renderiza por JS, así que necesita delegación propia — los clics no llegaban
               al handler del workspace y los botones quedaban muertos en los 5 tipos. */
            if (sindicatoEquipoSectionNav) {
                sindicatoEquipoSectionNav.addEventListener('click', handleSindicatoWorkspaceClick);
            }

            if (mapTextDisplay) {
                mapTextDisplay.addEventListener('click', handleSindicatoWorkspaceClick);
                mapTextDisplay.addEventListener('submit', handleSindicatoWorkspaceClick);
                /* 18-07 (idea 38 mock-up): import de CSV al censo del CRM. */
                mapTextDisplay.addEventListener('change', (e) => {
                    const inp = e.target.closest?.('[data-crm-import-csv]');
                    if (!inp || !inp.files || !inp.files[0] || !window.SINDICAPP_SINDICATO) return;
                    const orgId = inp.getAttribute('data-crm-import-csv') || 'sindicapp';
                    const reader = new FileReader();
                    reader.onload = () => {
                        const rc = getSindicatoCopy();
                        try {
                            const lines = String(reader.result || '').split(/\r?\n/).filter((l) => l.trim());
                            const sep = lines.length && lines[0].includes(';') && !lines[0].includes(',') ? ';' : ',';
                            const headers = lines.length ? lines[0].split(sep).map((h) => h.trim().toLowerCase()) : [];
                            const col = (names) => headers.findIndex((h) => names.some((n) => h.includes(n)));
                            const iName = col(['nombre', 'name', 'nom']);
                            const iWp = col(['empresa', 'company', 'workplace', 'centro', 'centre']);
                            const iRol = col(['rol', 'role', 'relaci']);
                            if (lines.length < 2 || iName === -1) {
                                notify(rc.crmImportEmpty || 'CSV?');
                                return;
                            }
                            const rows = lines.slice(1).map((l) => {
                                const p = l.split(sep);
                                return {
                                    name: (p[iName] || '').trim(),
                                    workplace: iWp !== -1 ? (p[iWp] || '').trim() : '',
                                    rol: iRol !== -1 ? (p[iRol] || '').trim() : ''
                                };
                            }).filter((r) => r.name);
                            const n = window.SINDICAPP_SINDICATO.crmImportMembers(activeLocale, orgId, rows);
                            notify(String(rc.crmImportDone || '{n}').replace('{n}', n));
                            syncTextWorkspace();
                        } catch (err) { /* demo */ }
                    };
                    reader.readAsText(inp.files[0]);
                });
                /* CRM — la búsqueda de afiliadas actualiza solo el tbody para no perder el foco */
                mapTextDisplay.addEventListener('input', (e) => {
                    /* 18-07 (idea 49): filtro vivo genérico — oculta en el DOM los elementos
                       que no casan, sin re-render (el foco no se pierde). El selector de lo
                       filtrable viene en data-live-filter. */
                    const live = e.target.closest?.('[data-live-filter]');
                    if (live) {
                        const sel = live.getAttribute('data-live-filter');
                        const scope = live.closest('.sindicato-panel') || mapTextDisplay;
                        const q = live.value.trim().toLowerCase();
                        scope.querySelectorAll(sel).forEach((el) => {
                            el.hidden = !!q && el.textContent.toLowerCase().indexOf(q) === -1;
                        });
                        return;
                    }
                    const search = e.target.closest?.('[data-sindicato-crm-member-search]');
                    if (!search || !window.SINDICAPP_SINDICATO) return;
                    sindicatoCrmMemberQuery = search.value;
                    const tbody = mapTextDisplay.querySelector('[data-sindicato-crm-member-list]');
                    if (tbody) {
                        tbody.innerHTML = window.SINDICAPP_SINDICATO.buildCrmMemberRowsHtml(
                            activeLocale, activeSindicatoCrmOrg, sindicatoCrmMemberQuery, sindicatoCrmMemberFilter
                        );
                    }
                });
            }

            /* CRM (12-07-2026) — cambio de organización re-contextualiza todos los módulos */
            if (sindicatoCrmOrgSelect) {
                sindicatoCrmOrgSelect.addEventListener('change', () => {
                    activeSindicatoCrmOrg = sindicatoCrmOrgSelect.value || 'sindicapp';
                    resetSindicatoCrmViewState();
                    if (activeModule === SINDICATO_MODULE && activeSindicatoSub === 'coordination') {
                        applySindicatoViewSync();
                    }
                });
            }

            window.addEventListener('hashchange', applySindicatoHashRoute);
            applySindicatoHashRoute();

            function handleSindicatoSectorTreeClick(e, onSelect) {
                const toggleBtn = e.target.closest('.sindicato-sector-toggle');
                if (toggleBtn) {
                    e.preventDefault();
                    const node = toggleBtn.closest('.sindicato-sector-node');
                    const children = node?.querySelector(':scope > .sindicato-sector-children');
                    if (children) {
                        const open = children.classList.toggle('is-open');
                        toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
                    }
                    return;
                }
                const sectorBtn = e.target.closest('[data-sindicato-sector], [data-sindicato-feed-sector]');
                if (!sectorBtn) return;
                onSelect(sectorBtn);
            }

            if (sindicatoSectoresTreeMount) {
                sindicatoSectoresTreeMount.addEventListener('click', (e) => {
                    handleSindicatoSectorTreeClick(e, (sectorBtn) => {
                        if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                        setSindicatoSector(sectorBtn.getAttribute('data-sindicato-sector'));
                    });
                });
            }

            /* 13-07-2026: los ámbitos del foro viven en el sub «foro». Los árboles de
               subforos ya no se montan en la sidebar — se renderizan en el fondo y sus
               clics los atiende handleSindicatoWorkspaceClick. */
            sindicatoFeedScopeButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'foro') setSindicatoSub('foro');
                    setSindicatoFeedScope(btn.getAttribute('data-sindicato-feed-scope'));
                });
            });

            if (sindicatoFeedCompanySelect) {
                sindicatoFeedCompanySelect.addEventListener('change', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'foro') setSindicatoSub('foro');
                    setSindicatoFeedCompany(sindicatoFeedCompanySelect.value);
                });
            }

            if (sindicatoNavTree) {
                sindicatoNavTree.addEventListener('submit', (e) => {
                    const form = e.target;
                    if (!form.matches?.('[data-sindicato-add-company]') || !window.SINDICAPP_SINDICATO) return;
                    e.preventDefault();
                    const fd = new FormData(form);
                    /* fix QA A5: validación propia (novalidate) — la nativa fallaba sobre controles ocultos */
                    if (!String(fd.get('name') || '').trim() || !String(fd.get('address') || '').trim()) {
                        notify(sindicatoNotice('companyFormInvalid'), 'warn');
                        return;
                    }
                    const company = window.SINDICAPP_SINDICATO.addCompany(activeLocale, {
                        name: fd.get('name'),
                        sector: fd.get('sector'),
                        address: fd.get('address'),
                        subsectorId: fd.get('subsectorId'),
                        territoryId: fd.get('territoryId'),
                        lat: fd.get('lat'),
                        lng: fd.get('lng')
                    });
                    form.reset();
                    renderSindicatoAddCompanySidebarForm();
                    rebuildSindicatoWorkplaceSelect();
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('workplaces');
                    setSindicatoWorkplace(company.id, 'location');
                    notify(sindicatoNotice('companyAdded'));
                });
            }

            function setActiveModule(moduleId) {
                activeModule = moduleId || null;

                updateModulePickerActiveStates();
                updateModuleNavTrees();

                if (moduleBody) {
                    moduleBody.classList.toggle('has-module', Boolean(activeModule));
                }

                if (activeModule === 'self') {
                    refreshSelfNavLabels();
                    setSelfSub('sindicato');
                    updateModuleBodyLabel();
                } else if (activeModule === SINDICATO_MODULE) {
                    refreshSindicatoSidebarLabels();
                    setSindicatoSub('');
                } else if (activeModule) {
                    applyVisiblePanels();
                    clearTextModeBodyClasses();
                    updateModuleBodyLabel();
                }

                if (!activeModule) {
                    clearTextModeBodyClasses();
                    modulePanels.forEach((panel) => {
                        panel.classList.remove('active');
                        panel.hidden = true;
                    });
                    syncMapWorkspacePlaceholder();
                    updateModuleBodyLabel();
                    if (mapInitialized && currentMap) {
                        restoreMapWorkspaceAfterTextMode();
                    }
                } else if (!isTextWorkspaceModule() && !isSindicatoMapVisible()) {
                    syncMapWorkspacePlaceholder();
                }

                syncTextWorkspace();

                if (isSindicatoMapVisible()) {
                    activateSindicatoMapWorkspace();
                } else if (activeModule !== SINDICATO_MODULE) {
                    clearSindicatoMapMarkers();
                }
            }

            if (homeTitle) {
                /* Fusión portada ↔ Red Social (13-07-2026): el título de cabecera lleva a la
                   landing fusionada (portada en sidebar + dashboard en fondo), no a la
                   portada suelta con mapa. */
                homeTitle.addEventListener('click', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('feed');
                });
            }

            /* Botón «OpenStreetMap» retirado del DOM (12-07-2026): el mapa
               se inicializa solo en el boot y al entrar en Mapa. */

            function finishSindicAppBoot() {
                try {
                    const bootLocale = readStoredLocale() || window.__sindicappEarlyLocale || 'es';
                    setActiveLocale(bootLocale, { persist: false, skipGeoRebuild: true, skipRelocalize: true });
                    updateModuleNavTrees();
                    initBoundaryControlsOnce();
                    initOpenStreetMap();
                    /* 13-07-2026: Red Social es la landing por defecto (módulo master).
                       La portada clásica sigue accesible desde el título de cabecera.
                       Si la URL trae un deep link (#sindicato-…), se respeta re-aplicando
                       la ruta después de fijar la landing. */
                    setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('feed');
                    if (/^#sindicato-/.test(location.hash)) {
                        applySindicatoHashRoute();
                    }
                    relocalizeForLocale();
                } catch (bootErr) {
                    console.error('SindicApp startup error:', bootErr);
                    showSindicAppBootError(getSindicAppMissingDependencies().concat(['startup: ' + (bootErr && bootErr.message ? bootErr.message : String(bootErr))]));
                }
                document.body.classList.remove('sindicapp-booting');
                setSidebarOpen(true);
                assertSindicAppDependencies();
                syncSindicAppHeaderLogo();
                syncPortadaWelcome();
                maybeShowAgendaNotice();
                /* 20-07: el onboarding de primera visita (idea 53) se retiró — moratoria. */
            }

            /* 17-07-2026: aviso de agenda al arrancar — la próxima fecha relevante
               (votación/asamblea) como toast discreto. Sin backend: se calcula al cargar. */
            function maybeShowAgendaNotice() {
                try {
                    if (!window.SINDICAPP_SINDICATO || !window.SINDICAPP_SINDICATO.getUpcomingAgendaDigest) return;
                    const c = sindicappCopy();
                    const next = (window.SINDICAPP_SINDICATO.getUpcomingAgendaDigest(activeLocale, 1) || [])[0];
                    if (!next) return;
                    const label = `${c.agendaAlertPrefix || '📅'} ${next.title}${next.scope ? ' — ' + next.scope : ''}${next.date ? ' (' + next.date + ')' : ''}`;
                    setTimeout(() => notify(label), 1200);
                } catch (e) { /* demo */ }
            }

            if (typeof requestAnimationFrame === 'function') {
                requestAnimationFrame(function () {
                    setTimeout(finishSindicAppBoot, 0);
                });
            } else {
                setTimeout(finishSindicAppBoot, 0);
            }

            /* Initial state: sidebar visible, no module selected, OpenStreetMap loaded behind */
        }

        if (typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(function () { setTimeout(runSindicApp, 0); });
        } else {
            setTimeout(runSindicApp, 0);
        }
