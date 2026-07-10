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
            const sindicatoUnionSelect = document.getElementById('sindicato-union-select');
            const sindicatoUnionSectionNav = document.getElementById('sindicato-union-section-nav');
            const sindicatoUnionSectionButtons = document.querySelectorAll('[data-sindicato-union-section]');
            const sindicatoFeedSidebar = document.getElementById('sindicato-feed-sidebar');
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
            const sindicatoViviendaParentSelect = document.getElementById('sindicato-vivienda-parent-select');
            const sindicatoViviendaTerritorySelect = document.getElementById('sindicato-vivienda-territory-select');
            const sindicatoMapTerritoryTreeMount = document.getElementById('sindicato-map-territory-tree-mount');
            const sindicatoCoordSubnav = document.getElementById('sindicato-coordination-subnav');
            const sindicatoCoordSubButtons = document.querySelectorAll('[data-sindicato-coord-sub]');
            const sindicatoWikiSubnav = document.getElementById('sindicato-wiki-subnav');
            const sindicatoWikiSubButtons = document.querySelectorAll('[data-sindicato-wiki-sub]');
            const sindicatoWorkplaceSearch = document.getElementById('sindicato-workplace-search');
            const sindicatoWorkplaceSelect = document.getElementById('sindicato-workplace-select');
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

            function getLocalePack() {
                return activeLocale === 'es' ? window.SINDICAPP_ES : window.SINDICAPP_IE;
            }

            function getLocaleUi(locale) {
                const loc = locale || activeLocale;
                const pack = loc === 'es' ? window.SINDICAPP_ES : window.SINDICAPP_IE;
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
            let activeSindicatoSection = 'location';
            let activeSindicatoSector = '';
            let activeSindicatoUnion = '';
            let activeSindicatoUnionSection = 'overview';
            let activeSindicatoCoordSub = 'estructura';
            let activeSindicatoWikiSub = 'index';
            let activeSindicatoViviendaParent = '';
            let activeSindicatoViviendaTerritory = '';
            let activeSindicatoViviendaBuilding = ''; /* R7 — perfil de edificio en Vivienda */
            let activeSindicatoMapTerritory = '';
            let activeSindicatoFeedScope = 'general';
            let activeSindicatoFeedSectorId = '';
            let activeSindicatoFeedTerritoryId = '';
            let activeSindicatoFeedCompanyId = '';
            let activeSindicatoForumThread = '';
            let sindicatoWorkplaceFilter = '';
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
                    return stored === 'es' || stored === 'ie' ? stored : null;
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
                document.body.classList.remove('sindicapp-locale-ie', 'sindicapp-locale-es');
                document.body.classList.add(activeLocale === 'es' ? 'sindicapp-locale-es' : 'sindicapp-locale-ie');
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
                document.body.classList.remove('sindicapp-locale-ie', 'sindicapp-locale-es');
                document.body.classList.add(activeLocale === 'es' ? 'sindicapp-locale-es' : 'sindicapp-locale-ie');
            }

            function setActiveLocale(locale, options = {}) {
                const next = locale === 'es' ? 'es' : 'ie';
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
                const mapProviderTitle = document.getElementById('geo-map-provider-title');
                if (mapProviderTitle && ui.mapProviderTitle) mapProviderTitle.textContent = ui.mapProviderTitle;
                const mapProviderMuted = document.getElementById('geo-map-provider-muted');
                if (mapProviderMuted && ui.mapProviderMuted) mapProviderMuted.textContent = ui.mapProviderMuted;
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
                const sindTitle = document.getElementById('sindicato-panel-title');
                const modLabels = getModuleLabels();
                if (sindTitle && modLabels.sindicato) sindTitle.textContent = modLabels.sindicato;
                const sindNavTree = document.getElementById('sindicato-nav-tree');
                if (sindNavTree && ui.sindicatoNavAria) sindNavTree.setAttribute('aria-label', ui.sindicatoNavAria);
                const sindSubnav = document.getElementById('sindicato-subnav');
                if (sindSubnav && ui.sindicatoViewsAria) sindSubnav.setAttribute('aria-label', ui.sindicatoViewsAria);
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

            function getUserWorkplaceId() {
                const preferred = USER_WORKPLACE_BY_LOCALE[activeLocale] || USER_WORKPLACE_BY_LOCALE.ie;
                if (window.SINDICAPP_SINDICATO && window.SINDICAPP_SINDICATO.findWorkplace(activeLocale, preferred)) {
                    return preferred;
                }
                const list = window.SINDICAPP_SINDICATO?.getWorkplaces(activeLocale) || [];
                return list[0]?.id || '';
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
                const wpId = getUserWorkplaceId();
                mapTextDisplay.innerHTML = window.SINDICAPP_SINDICATO.buildWorkspaceHtml(
                    activeLocale,
                    'workplaces',
                    wpId,
                    activeSelfSindicatoSection,
                    '',
                    { selfView: true } /* R5 — la tarjeta de verificación solo aparece en el módulo Usuario */
                );
            }

            function syncSelfSindicatoLocationBridge() {
                if (!mapTextDisplay || !window.SINDICAPP_SINDICATO) return;
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
                const allowed = ['overview', 'location', 'reports', 'wages', 'convenio', 'action'];
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
                const mapIntro = document.getElementById('sindicato-map-intro');
                const wpIntro = document.getElementById('sindicato-workplaces-intro');
                const unionsIntro = document.getElementById('sindicato-unions-intro');
                const feedIntro = document.getElementById('sindicato-feed-intro');
                const sectoresIntro = document.getElementById('sindicato-sectores-intro');
                const coordinationIntro = document.getElementById('sindicato-coordination-intro');
                const wikiIntro = document.getElementById('sindicato-wiki-intro');
                const viviendaIntro = document.getElementById('sindicato-vivienda-intro');
                const mapProviderTitle = document.getElementById('sindicato-map-provider-title');
                const mapProviderMuted = document.getElementById('sindicato-map-provider-muted');
                const mapTerritoriesTitle = document.getElementById('sindicato-map-territories-title');
                const viviendaParentLabel = document.getElementById('sindicato-vivienda-parent-label');
                const viviendaTerritoryLabel = document.getElementById('sindicato-vivienda-territory-label');
                const panelMuted = document.getElementById('sindicato-panel-muted');
                if (mapIntro && c.mapIntro) mapIntro.textContent = c.mapIntro;
                if (wpIntro && c.workplacesIntro) wpIntro.textContent = c.workplacesIntro;
                if (unionsIntro && c.unionsIntro) unionsIntro.textContent = c.unionsIntro;
                if (feedIntro && c.feedIntroSidebar) feedIntro.textContent = c.feedIntroSidebar;
                else if (feedIntro && c.feedIntro) feedIntro.textContent = c.feedIntro;
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
                if (wikiIntro && c.wikiIntroSidebar) wikiIntro.textContent = c.wikiIntroSidebar;
                if (viviendaIntro && c.viviendaIntroSidebar) viviendaIntro.textContent = c.viviendaIntroSidebar;
                if (mapProviderTitle && c.mapProviderTitle) mapProviderTitle.textContent = c.mapProviderTitle;
                if (mapProviderMuted && c.mapProviderMuted) mapProviderMuted.textContent = c.mapProviderMuted;
                if (mapTerritoriesTitle && c.mapTerritoriesTitle) mapTerritoriesTitle.textContent = c.mapTerritoriesTitle;
                if (viviendaParentLabel && c.viviendaParentLabel) viviendaParentLabel.textContent = c.viviendaParentLabel;
                if (viviendaTerritoryLabel && c.viviendaTerritoryLabel) viviendaTerritoryLabel.textContent = c.viviendaTerritoryLabel;
                sindicatoUnionSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-union-section');
                    const label = (c.unionSections && c.unionSections[id]) || id;
                    const icon = btn.querySelector('[aria-hidden="true"]');
                    if (icon) btn.innerHTML = `${icon.outerHTML} ${label}`;
                });
                if (panelMuted && c.panelMuted) panelMuted.textContent = c.panelMuted;
                if (sindicatoWorkplaceSearch && c.searchPlaceholder) {
                    sindicatoWorkplaceSearch.placeholder = c.searchPlaceholder;
                    sindicatoWorkplaceSearch.setAttribute('aria-label', c.searchPlaceholder);
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
                if (sindicatoViviendaTerritorySelect) sindicatoViviendaTerritorySelect.value = activeSindicatoViviendaTerritory || '';
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
                const allowed = ['general', 'sectores', 'territorios'];
                activeSindicatoFeedScope = allowed.includes(scopeId) ? scopeId : 'general';
                if (activeSindicatoFeedScope === 'general') {
                    activeSindicatoFeedSectorId = '';
                    activeSindicatoFeedTerritoryId = '';
                    activeSindicatoFeedCompanyId = '';
                }
                if (activeSindicatoFeedScope !== 'sectores') activeSindicatoFeedSectorId = '';
                if (activeSindicatoFeedScope !== 'territorios') activeSindicatoFeedTerritoryId = '';
                if (activeSindicatoFeedScope !== 'general') activeSindicatoForumThread = '';
                activeSindicatoFeedCompanyId = '';
                if (activeSindicatoSub !== 'feed') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('feed');
                }
                renderSindicatoFeedSidebar();
                applySindicatoViewSync();
            }

            function setSindicatoFeedSector(sectorId) {
                activeSindicatoFeedSectorId = sectorId || '';
                activeSindicatoFeedTerritoryId = '';
                activeSindicatoFeedCompanyId = '';
                activeSindicatoFeedScope = 'sectores';
                if (activeSindicatoSub !== 'feed') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('feed');
                }
                renderSindicatoFeedSidebar();
                applySindicatoViewSync();
            }

            function setSindicatoFeedTerritory(territoryId) {
                activeSindicatoFeedTerritoryId = territoryId || '';
                activeSindicatoFeedSectorId = '';
                activeSindicatoFeedCompanyId = '';
                activeSindicatoFeedScope = 'territorios';
                if (activeSindicatoSub !== 'feed') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('feed');
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
                    const errCopy = window.SINDICAPP_SINDICATO?.COPY?.[activeLocale === 'es' ? 'es' : 'ie']?.moduleLoadError;
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
                        wikiSub: activeSindicatoWikiSub,
                        feedScope: activeSindicatoFeedScope,
                        feedSectorId: activeSindicatoFeedSectorId,
                        feedTerritoryId: activeSindicatoFeedTerritoryId,
                        feedCompanyId: activeSindicatoFeedCompanyId,
                        forumThreadSlug: activeSindicatoForumThread,
                        mapTerritoryId: activeSindicatoMapTerritory,
                        viviendaTerritoryId: activeSindicatoViviendaTerritory,
                        viviendaBuildingId: activeSindicatoViviendaBuilding
                    }
                );
            }

            function applySindicatoHashRoute() {
                const route = window.SINDICAPP_SINDICATO?.parseSindicatoRoute(location.hash);
                if (!route) {
                    if (activeSindicatoForumThread) {
                        activeSindicatoForumThread = '';
                        if (activeModule === SINDICATO_MODULE && activeSindicatoSub === 'feed') {
                            applySindicatoViewSync();
                        }
                    }
                    return;
                }
                if (route.view === 'forum-thread') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'feed') setSindicatoSub('feed');
                    setSindicatoFeedScope('general');
                    activeSindicatoForumThread = route.slug;
                    applySindicatoViewSync();
                    return;
                }
                if (route.view === 'territory-dossier') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'map') setSindicatoSub('map');
                    setSindicatoMapTerritory(route.territoryId);
                }
            }

            function clearSindicatoForumThread() {
                activeSindicatoForumThread = '';
                if (location.hash.match(/^#sindicato-forum:/)) {
                    history.replaceState(null, '', location.pathname + location.search);
                }
                if (activeModule === SINDICATO_MODULE && activeSindicatoSub === 'feed') {
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
                if (activeSindicatoSub === 'map') return true;
                if (activeSindicatoSub === 'workplaces' && !activeSindicatoWorkplace) return true;
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
                if (activeSindicatoSub === 'feed') return true;
                if (activeSindicatoSub === 'sectores' || activeSindicatoSub === 'coordination'
                    || activeSindicatoSub === 'wiki' || activeSindicatoSub === 'vivienda') return true;
                return activeSindicatoSub === 'workplaces'
                    && Boolean(activeSindicatoWorkplace)
                    && activeSindicatoSection !== 'location';
            }

            function ensureSindicatoDefaultBoundaryLayer() {
                const layer = window.SINDICAPP_SINDICATO?.getDefaultBoundaryLayerForLocale(activeLocale)
                    || (activeLocale === 'es' ? 'catComarques' : 'irelandCounties');
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
                sindicatoMarkersLayer = L.layerGroup();
                window.SINDICAPP_SINDICATO.getWorkplaces(activeLocale).forEach((wp) => {
                    if (wp.lat == null || wp.lng == null) return;
                    if (activeSindicatoMapTerritory && wp.territoryId !== activeSindicatoMapTerritory) return;
                    const isActive = activeSindicatoWorkplace === wp.id;
                    const marker = L.circleMarker([wp.lat, wp.lng], {
                        radius: isActive ? 11 : 8,
                        color: '#e11d48',
                        fillColor: '#e11d48',
                        fillOpacity: isActive ? 1 : 0.85,
                        weight: isActive ? 3 : 2
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
                ensureSindicatoDefaultBoundaryLayer();
                if (activeSindicatoMapTerritory) {
                    highlightSindicatoTerritoryBoundaries(activeSindicatoMapTerritory);
                }
            }

            function applySindicatoViewSync() {
                updateModuleNavTrees();
                applyVisiblePanels();
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
            }

            function setSindicatoSub(subId) {
                const allowed = ['coordination', 'wiki', 'unions', 'vivienda', 'map', 'feed', 'sectores', 'workplaces'];
                if (subId === '' || subId == null) {
                    activeSindicatoSub = '';
                    activeSindicatoWorkplace = '';
                    activeSindicatoSection = 'location';
                    activeSindicatoSector = '';
                    activeSindicatoUnion = '';
                    activeSindicatoUnionSection = 'overview';
                    activeSindicatoCoordSub = 'estructura';
                    activeSindicatoWikiSub = 'index';
                    activeSindicatoViviendaParent = '';
                    activeSindicatoViviendaTerritory = '';
                    activeSindicatoViviendaBuilding = '';
                    activeSindicatoMapTerritory = '';
                    activeSindicatoFeedScope = 'general';
                    activeSindicatoFeedSectorId = '';
                    activeSindicatoFeedTerritoryId = '';
                    activeSindicatoFeedCompanyId = '';
                } else {
                    activeSindicatoSub = allowed.includes(subId) ? subId : '';
                }
                if (activeSindicatoSub !== 'workplaces') {
                    activeSindicatoWorkplace = '';
                    activeSindicatoSection = 'location';
                }
                if (activeSindicatoSub !== 'sectores') {
                    activeSindicatoSector = '';
                }
                if (activeSindicatoSub !== 'unions') {
                    activeSindicatoUnion = '';
                    activeSindicatoUnionSection = 'overview';
                }
                if (activeSindicatoSub !== 'feed') {
                    activeSindicatoFeedScope = 'general';
                    activeSindicatoFeedSectorId = '';
                    activeSindicatoFeedTerritoryId = '';
                    activeSindicatoFeedCompanyId = '';
                }
                if (activeSindicatoSub !== 'coordination') {
                    activeSindicatoCoordSub = 'estructura';
                }
                if (activeSindicatoSub !== 'wiki') {
                    activeSindicatoWikiSub = 'index';
                }
                if (activeSindicatoSub !== 'vivienda') {
                    activeSindicatoViviendaParent = '';
                    activeSindicatoViviendaTerritory = '';
                    activeSindicatoViviendaBuilding = '';
                }
                if (activeSindicatoSub !== 'map') {
                    activeSindicatoMapTerritory = '';
                }
                sindicatoSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-sub');
                    btn.classList.toggle('active', id === activeSindicatoSub);
                });
                if (activeSindicatoSub === 'coordination') {
                    sindicatoCoordSubButtons.forEach((btn) => {
                        const id = btn.getAttribute('data-sindicato-coord-sub');
                        btn.classList.toggle('active', id === activeSindicatoCoordSub);
                    });
                }
                if (activeSindicatoSub === 'wiki') {
                    sindicatoWikiSubButtons.forEach((btn) => {
                        const id = btn.getAttribute('data-sindicato-wiki-sub');
                        btn.classList.toggle('active', id === activeSindicatoWikiSub);
                    });
                }
                if (activeSindicatoSub === 'sectores') {
                    renderSindicatoSectoresTree();
                }
                if (activeSindicatoSub === 'unions') {
                    rebuildSindicatoUnionSelect();
                }
                if (activeSindicatoSub === 'feed') {
                    renderSindicatoFeedSidebar();
                }
                if (activeSindicatoSub === 'vivienda') {
                    rebuildSindicatoViviendaSelects();
                }
                if (activeSindicatoSub === 'map') {
                    renderSindicatoMapTerritoryTree();
                }
                applySindicatoViewSync();
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

            function setSindicatoCoordSub(subId) {
                const allowed = ['estructura', 'dinero', 'objetivos'];
                activeSindicatoCoordSub = allowed.includes(subId) ? subId : 'estructura';
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
                const allowed = ['index', 'normas'];
                activeSindicatoWikiSub = allowed.includes(subId) ? subId : 'index';
                if (activeSindicatoSub !== 'wiki') {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub('wiki');
                }
                sindicatoWikiSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-wiki-sub');
                    btn.classList.toggle('active', id === activeSindicatoWikiSub);
                });
                applySindicatoViewSync();
            }

            function rebuildSindicatoUnionSelect() {
                if (!sindicatoUnionSelect || !window.SINDICAPP_SINDICATO) return;
                const c = window.SINDICAPP_SINDICATO.t(activeLocale);
                const placeholder = c.selectUnion || 'Select union…';
                const unions = window.SINDICAPP_SINDICATO.getUnions(activeLocale);
                sindicatoUnionSelect.innerHTML = `<option value="">${placeholder}</option>`
                    + unions.map((u) => `<option value="${u.id}">${u.name}</option>`).join('');
                sindicatoUnionSelect.value = activeSindicatoUnion || '';
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
                const allowed = ['overview', 'forum', 'structure', 'companies'];
                activeSindicatoUnionSection = allowed.includes(sectionId) ? sectionId : 'overview';
                sindicatoUnionSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-union-section');
                    btn.classList.toggle('active', id === activeSindicatoUnionSection);
                });
                applySindicatoViewSync();
            }

            function setSindicatoWorkplace(workplaceId, sectionId) {
                activeSindicatoWorkplace = workplaceId || '';
                activeSindicatoSection = sectionId || (workplaceId ? 'location' : 'location');
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
            }

            function setSindicatoSection(sectionId) {
                const allowed = ['location', 'overview', 'reports', 'wages', 'convenio', 'action'];
                activeSindicatoSection = allowed.includes(sectionId) ? sectionId : 'location';
                sindicatoSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-sindicato-section');
                    btn.classList.toggle('active', id === activeSindicatoSection);
                });
                applySindicatoViewSync();
            }

            function handleSindicatoWorkspaceClick(e) {
                const forumBack = e.target.closest('[data-sindicato-forum-back]');
                if (forumBack) {
                    e.preventDefault();
                    clearSindicatoForumThread();
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
                    if (terr?.parentId) setSindicatoViviendaParent(terr.parentId);
                    setSindicatoViviendaTerritory(terrId);
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
                    if (activeSindicatoSub !== 'feed') setSindicatoSub('feed');
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
                        syncSindicatoWorkspace();
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
                    const fmt = (n) => Math.abs(n).toLocaleString(activeLocale === 'es' ? 'es-ES' : 'en-IE', { maximumFractionDigits: 0 });
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

                const convenioAsk = (e.type === 'submit' && e.target.matches?.('[data-sindicato-convenio-ask]'))
                    ? e.target
                    : e.target.closest?.('[data-sindicato-convenio-ask]');
                if (convenioAsk && (e.type === 'submit' || e.target.type === 'submit')) {
                    e.preventDefault();
                    const out = convenioAsk.querySelector('[data-sindicato-convenio-out]');
                    if (out) out.hidden = false;
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
                        syncSindicatoWorkspace();
                    }
                    return;
                }

                const goto = e.target.closest('[data-sindicato-goto-workplace]');
                if (goto) {
                    const id = goto.getAttribute('data-sindicato-goto-workplace');
                    if (!id) return;
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoWorkplace(id, 'location');
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
                if (sindicatoWorkplaceSectionNav) {
                    sindicatoWorkplaceSectionNav.hidden = !onSindicato || activeSindicatoSub !== 'workplaces' || !activeSindicatoWorkplace;
                }
                if (sindicatoUnionSectionNav) {
                    sindicatoUnionSectionNav.hidden = !onSindicato || activeSindicatoSub !== 'unions' || !activeSindicatoUnion;
                }
                updateMapSelectedTerritoryBar();
            }

            function updateMapSelectedTerritoryBar() {
                if (!mapSelectedTerritoryBar || !mapSelectedTerritoryName) return;
                const selection = lastMapTerritorySelection;
                const show = Boolean(selection?.name)
                    && (isGeoTeamsMapWorkspace() || isSindicatoMapVisible());
                mapSelectedTerritoryBar.hidden = !show;
                mapSelectedTerritoryName.textContent = selection?.name || '—';
            }

            function navigateSindicatoMapTerritoryFromSelection(selection) {
                if (!selection?.name) return;
                if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                if (activeSindicatoSub !== 'map') setSindicatoSub('map');
                const terrId = window.SINDICAPP_SINDICATO?.resolveSindicatoTerritoryFromBoundary(
                    activeLocale,
                    selection.type,
                    selection.name
                );
                if (terrId) setSindicatoMapTerritory(terrId);
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
                        recenterMapForLocale();
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
                document.querySelectorAll('.map-api-button[data-api="openstreetmap"]').forEach((btn) => {
                    btn.classList.add('active');
                });
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

            function syncTextWorkspace() {
                if (!mapTextDisplay) return;
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
                if (activeModule) return;
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
                        title = `${subs.coordination || 'Coordination'} — ${coordLabel}`;
                    } else if (activeSindicatoSub === 'wiki') {
                        const wikiSubs = c.wikiSubs || {};
                        const wikiLabel = wikiSubs[activeSindicatoWikiSub] || activeSindicatoWikiSub;
                        title = `${subs.wiki || 'Wiki'} — ${wikiLabel}`;
                    } else if (activeSindicatoSub === 'vivienda' && activeSindicatoViviendaTerritory && window.SINDICAPP_SINDICATO) {
                        const terr = window.SINDICAPP_SINDICATO.getSubterritoryById(activeLocale, activeSindicatoViviendaTerritory);
                        if (terr) title = `${subs.vivienda || 'Vivienda'} — ${terr.name}`;
                    } else if (activeSindicatoSub === 'unions' && activeSindicatoUnion && window.SINDICAPP_SINDICATO) {
                        const union = window.SINDICAPP_SINDICATO.findUnion(activeLocale, activeSindicatoUnion);
                        const unionSections = c.unionSections || {};
                        const sec = unionSections[activeSindicatoUnionSection] || activeSindicatoUnionSection;
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
            const territoryInfoBoxEl = document.getElementById('territory-info-box');
            if (territoryInfoBoxEl) {
                const territoryInfoBoxCloseBtn = territoryInfoBoxEl.querySelector('.close-btn');
                if (territoryInfoBoxCloseBtn && !territoryInfoBoxCloseBtn.dataset.sindicappCloseWired) {
                    territoryInfoBoxCloseBtn.dataset.sindicappCloseWired = '1';
                    territoryInfoBoxCloseBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (typeof window.closeTerritoryInfoBox === 'function') {
                            window.closeTerritoryInfoBox();
                        }
                    });
                }
                territoryInfoBoxEl.addEventListener('click', (e) => {
                    if (e.target.closest('#territory-info-box-info-btn')) {
                        e.preventDefault();
                        e.stopPropagation();
                        navigateSindicatoMapTerritoryFromSelection(lastMapTerritorySelection);
                    }
                });
            }
            if (typeof window.wireTerritoryInfoBoxControls === 'function') {
                window.wireTerritoryInfoBoxControls();
            }

            document.addEventListener('sindicapp-territory-selected', (e) => {
                lastMapTerritorySelection = e.detail || null;
                updateMapSelectedTerritoryBar();
                if (activeModule === SINDICATO_MODULE && activeSindicatoSub === 'map' && e.detail) {
                    const terrId = window.SINDICAPP_SINDICATO?.resolveSindicatoTerritoryFromBoundary(
                        activeLocale,
                        e.detail.type,
                        e.detail.name
                    );
                    if (terrId && terrId !== activeSindicatoMapTerritory) {
                        setSindicatoMapTerritory(terrId);
                    }
                }
            });
            document.addEventListener('sindicapp-territory-cleared', () => {
                lastMapTerritorySelection = null;
                updateMapSelectedTerritoryBar();
            });

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
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    setSindicatoSub(btn.getAttribute('data-sindicato-sub'));
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

            if (mapTextDisplay) {
                mapTextDisplay.addEventListener('click', handleSindicatoWorkspaceClick);
                mapTextDisplay.addEventListener('submit', handleSindicatoWorkspaceClick);
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

            sindicatoFeedScopeButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'feed') setSindicatoSub('feed');
                    setSindicatoFeedScope(btn.getAttribute('data-sindicato-feed-scope'));
                });
            });

            if (sindicatoFeedScopeTreeMount) {
                sindicatoFeedScopeTreeMount.addEventListener('click', (e) => {
                    handleSindicatoSectorTreeClick(e, (sectorBtn) => {
                        const feedSector = sectorBtn.getAttribute('data-sindicato-feed-sector');
                        const feedTerritory = sectorBtn.getAttribute('data-sindicato-feed-territory');
                        if (feedSector) {
                            if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                            setSindicatoFeedSector(feedSector);
                            return;
                        }
                        if (feedTerritory) {
                            if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                            setSindicatoFeedTerritory(feedTerritory);
                        }
                    });
                });
            }

            if (sindicatoFeedCompanySelect) {
                sindicatoFeedCompanySelect.addEventListener('change', () => {
                    if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                    if (activeSindicatoSub !== 'feed') setSindicatoSub('feed');
                    setSindicatoFeedCompany(sindicatoFeedCompanySelect.value);
                });
            }

            if (sindicatoNavTree) {
                sindicatoNavTree.addEventListener('submit', (e) => {
                    const form = e.target;
                    if (!form.matches?.('[data-sindicato-add-company]') || !window.SINDICAPP_SINDICATO) return;
                    e.preventDefault();
                    const fd = new FormData(form);
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
                homeTitle.addEventListener('click', () => setActiveModule(null));
            }

            document.querySelectorAll('.map-api-button[data-api="openstreetmap"]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (!isSindicatoMapVisible()) {
                        if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                        setSindicatoSub('map');
                    }
                    initOpenStreetMap();
                });
            });

            function finishSindicAppBoot() {
                try {
                    const bootLocale = readStoredLocale() || window.__sindicappEarlyLocale || 'es';
                    setActiveLocale(bootLocale, { persist: false, skipGeoRebuild: true, skipRelocalize: true });
                    updateModuleNavTrees();
                    initBoundaryControlsOnce();
                    initOpenStreetMap();
                    setActiveModule(null);
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
