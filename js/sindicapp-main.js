        function runSindicApp() {
            /* Sidebar visible immediately — Drive / missing scripts must not leave console hidden */
            document.body.classList.add('sidebar-open');

            const mobileToggle = document.getElementById('mobile-toggle');
            const mapTextDisplay = document.getElementById('map-text-display');
            const templateModuleNav = document.getElementById('template-module-nav');
            const templateModulePicker = document.getElementById('template-module-picker');
            const modulePanels = document.querySelectorAll('.template-module-panel');
            const selfNavTree = document.getElementById('self-nav-tree');
            const selfSubButtons = document.querySelectorAll('[data-self-sub]');
            const selfSindicatoBlock = document.getElementById('self-sindicato-block');
            const selfPartyBlock = document.getElementById('self-party-block');
            const selfPartyAdminNav = document.getElementById('self-party-admin-nav');
            const selfSindicatoWorkplaceLabel = document.getElementById('self-sindicato-workplace-label');
            const selfSindicatoWorkplaceName = document.getElementById('self-sindicato-workplace-name');
            const selfSindicatoSectionButtons = document.querySelectorAll('[data-self-sindicato-section]');
            const selfPartySectionButtons = document.querySelectorAll('[data-self-party-section]');
            const candidacyNavTree = document.getElementById('candidacy-nav-tree');
            const candidacySubButtons = document.querySelectorAll('[data-candidacy-sub]');
            const candidacyCcaaBlock = document.getElementById('candidacy-ccaa-block');
            const candidacyMunicipalesBlock = document.getElementById('candidacy-municipales-block');
            const candidacyCcaaSelect = document.getElementById('candidacy-ccaa-select');
            const candidacyMunicipalitySelect = document.getElementById('candidacy-municipality-select');
            const collectivesNavTree = document.getElementById('collectives-nav-tree');
            const collectivesSectionNav = document.getElementById('collectives-section-nav');
            const collectivesSectionButtons = document.querySelectorAll('[data-collectives-section]');
            const collectivesListaSubnav = document.getElementById('collectives-lista-subnav');
            const collectivesListSubButtons = document.querySelectorAll('[data-collectives-list-sub]');
            const collectivesCompleteListBlock = document.getElementById('collectives-complete-list-block');
            const collectivesRepresentationSidebar = document.getElementById('collectives-representation-sidebar');
            const collectivesGeneralCoordinationSidebar = document.getElementById('collectives-general-coordination-sidebar');
            const partyNavTree = document.getElementById('party-nav-tree');
            const partyInternalSubButtons = document.querySelectorAll('[data-party-internal-sub]');
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
            const localGroupsNavTree = document.getElementById('local-groups-nav-tree');
            const localGroupsSubnav = document.getElementById('local-groups-subnav');
            const collectivesOrgSubButtons = document.querySelectorAll('[data-collectives-org-sub]');
            const localGroupsOrgSubButtons = document.querySelectorAll('[data-local-groups-org-sub]');
            const geoTeamsBranch = document.getElementById('geo-teams-branch');
            const geoTeamsInfoBlock = document.getElementById('geo-teams-info-block');
            const topicTeamsNavBlock = document.getElementById('topic-teams-nav-block');
            const geoTeamsModeNav = document.getElementById('geo-teams-mode-nav');
            const geoTeamsTeamSubnav = document.getElementById('geo-teams-team-subnav');
            const mapSelectedTerritoryBar = document.getElementById('map-selected-territory-bar');
            const mapSelectedTerritoryName = document.getElementById('map-selected-territory-name');
            const mapSelectedTerritoryInfoBtn = document.getElementById('map-selected-territory-info-btn');
            const topicTeamsTeamSubnav = document.getElementById('topic-teams-team-subnav');
            const geoTeamsModeButtons = document.querySelectorAll('[data-geo-teams-mode]');
            const geoTeamSelect = document.getElementById('geo-team-select');
            const geoCountySelect = document.getElementById('geo-county-select');
            const geoCountyRow = document.getElementById('geo-picker-county-row');
            const geoCountySubtitle = document.getElementById('geo-county-subtitle');
            const geoCcaaSelect = document.getElementById('geo-ccaa-select');
            const geoProvinceSelect = document.getElementById('geo-province-select');
            const geoComarcaSelect = document.getElementById('geo-comarca-select');
            const geoCcaaRow = document.getElementById('geo-picker-ccaa-row');
            const geoProvinceRow = document.getElementById('geo-picker-province-row');
            const geoComarcaRow = document.getElementById('geo-picker-comarca-row');
            const geoCcaaSubtitle = document.getElementById('geo-ccaa-subtitle');
            const geoProvinceSubtitle = document.getElementById('geo-province-subtitle');
            const geoComarcaSubtitle = document.getElementById('geo-comarca-subtitle');
            const geoMunicipalitySubtitle = document.getElementById('geo-municipality-subtitle');
            const geoMunicipalityRow = document.getElementById('geo-picker-municipality-row');
            const topicTeamSelect = document.getElementById('topic-team-select');
            const geoTeamPartyWrap = document.getElementById('geo-team-party-wrap');
            const topicTeamPartyWrap = document.getElementById('topic-team-party-wrap');
            const geoTeamSubButtons = document.querySelectorAll('[data-geo-team-sub]');
            const topicTeamSubButtons = document.querySelectorAll('[data-topic-team-sub]');
            const geoTeamsViewPanels = document.querySelectorAll('.geo-teams-view-panel');
            const moduleBody = document.getElementById('template-module-body');
            const moduleBodyLabel = document.getElementById('template-module-body-label');
            const portadaWelcomeLogo = document.getElementById('portada-welcome-logo');
            const homeTitle = document.getElementById('template-home-title');

            const COLLECTIVES_MODULE = 'collectives';
            const SINDICATO_MODULE = 'sindicato';
            const LOCAL_GROUPS_MODULE = 'local-groups';
            const PARTY_MODULE = 'party';

            const ES_TERRITORY_TREE = (window.SINDICAPP_GEO && window.SINDICAPP_GEO.ES_TERRITORY_TREE) || [];
            const ES_MUNICIPALITY_ID_ALIASES = (window.SINDICAPP_GEO && window.SINDICAPP_GEO.ES_MUNICIPALITY_ID_ALIASES) || {};
            const IE_COUNTIES = (window.SINDICAPP_GEO && window.SINDICAPP_GEO.IE_COUNTIES) || [];

            function getSpainGeoTeamsFlat() {
                if (window.SINDICAPP_GEO && typeof window.SINDICAPP_GEO.getSpainGeoTeamsFlat === 'function') {
                    return window.SINDICAPP_GEO.getSpainGeoTeamsFlat();
                }
                return [];
            }

            const GEO_TEAMS_ES = (window.SINDICAPP_GEO && window.SINDICAPP_GEO.GEO_TEAMS_ES) || getSpainGeoTeamsFlat();

            function getCcaaTeamId(ccaaId) {
                if (window.SINDICAPP_GEO && window.SINDICAPP_GEO.getCcaaTeamId) {
                    return window.SINDICAPP_GEO.getCcaaTeamId(ccaaId);
                }
                return ccaaId ? `ccaa-${ccaaId}` : '';
            }

            function getProvinceTeamId(provinceId) {
                if (window.SINDICAPP_GEO && window.SINDICAPP_GEO.getProvinceTeamId) {
                    return window.SINDICAPP_GEO.getProvinceTeamId(provinceId);
                }
                return provinceId ? `province-${provinceId}` : '';
            }

            function getComarcaTeamId(comarcaId) {
                if (window.SINDICAPP_GEO && window.SINDICAPP_GEO.getComarcaTeamId) {
                    return window.SINDICAPP_GEO.getComarcaTeamId(comarcaId);
                }
                return comarcaId ? `comarca-${comarcaId}` : '';
            }

            function resolveEsMunicipalityId(id) {
                return ES_MUNICIPALITY_ID_ALIASES[id] || id;
            }

            function findEsCcaa(ccaaId) {
                return ES_TERRITORY_TREE.find((c) => c.id === ccaaId) || null;
            }

            function findEsProvince(ccaaId, provinceId) {
                const ccaa = findEsCcaa(ccaaId);
                return ccaa ? (ccaa.provinces || []).find((p) => p.id === provinceId) || null : null;
            }

            function findEsComarca(ccaaId, provinceId, comarcaId) {
                const province = findEsProvince(ccaaId, provinceId);
                return province ? (province.comarques || []).find((c) => c.id === comarcaId) || null : null;
            }

            function isTerritoryOverviewGeoTeam(teamId) {
                if (!teamId) return false;
                return isCountyGeoTeam(teamId)
                    || teamId.startsWith('ccaa-')
                    || teamId.startsWith('province-')
                    || teamId.startsWith('comarca-');
            }

            function getCountyMunicipalDistricts(county) {
                return county.municipalDistricts || county.municipalities || [];
            }

            function getDistrictShortLabel(district) {
                if (district.shortLabel) return district.shortLabel;
                return String(district.label || '')
                    .replace(/^Municipal District of\s+/i, '')
                    .replace(/\s+County Council$/i, '')
                    .trim();
            }

            function getIrelandGeoTeamsFlat() {
                const teams = [];
                IE_COUNTIES.forEach((county) => {
                    teams.push({
                        id: `county-${county.id}`,
                        label: county.label,
                        countyId: county.id,
                        countyLabel: county.label,
                        level: 'county'
                    });
                    getCountyMunicipalDistricts(county).forEach((district) => {
                        teams.push({
                            id: district.id,
                            label: district.label,
                            shortLabel: getDistrictShortLabel(district),
                            countyId: county.id,
                            countyLabel: county.label,
                            level: 'district'
                        });
                    });
                });
                return teams;
            }

            function flattenCountyMunicipalities(counties) {
                return (counties || []).flatMap((county) =>
                    getCountyMunicipalDistricts(county).map((m) => ({
                        id: m.id,
                        label: m.label,
                        shortLabel: getDistrictShortLabel(m),
                        countyId: county.id,
                        countyLabel: county.label,
                        level: 'district'
                    }))
                );
            }

            function getAllGeoTeamsUnion() {
                const byId = new Map();
                GEO_TEAMS_ES.forEach((t) => byId.set(t.id, t));
                getIrelandGeoTeamsFlat().forEach((t) => byId.set(t.id, t));
                return [...byId.values()];
            }

            function getCountyTeamId(countyId) {
                return countyId ? `county-${countyId}` : '';
            }

            function isCountyGeoTeam(teamId) {
                return Boolean(teamId && teamId.startsWith('county-'));
            }

            let GEO_TEAMS_LIST = GEO_TEAMS_ES.slice();
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

            function getPartyTeamSubmodules() {
                const pack = getLocalePack();
                if (pack && pack.PARTY_TEAM_SUBMODULES) return pack.PARTY_TEAM_SUBMODULES;
                return PARTY_TEAM_SUBMODULES;
            }

            function getModuleLabels() {
                const pack = getLocalePack();
                if (pack && pack.moduleLabels) return pack.moduleLabels;
                return moduleLabels;
            }

            function getOrgMirrorLabel(prefix) {
                const pack = getLocalePack();
                if (pack && pack.orgMirrorLabels && pack.orgMirrorLabels[prefix]) {
                    return pack.orgMirrorLabels[prefix];
                }
                return prefix === 'collectives' ? 'Collectives' : 'Local Groups';
            }

            function getCpMilitantOnlyBanner() {
                const pack = getLocalePack();
                if (pack && pack.cpMilitantOnlyBanner) return pack.cpMilitantOnlyBanner;
                return CP_MILITANT_ONLY_BANNER;
            }

            function getTopicAreaLabels() {
                const pack = getLocalePack();
                if (pack && pack.topicAreaLabels) return pack.topicAreaLabels;
                return TOPIC_AREA_LABELS;
            }

            function getLocaleNavMap() {
                const pack = getLocalePack();
                return (pack && pack.nav) ? pack.nav : {};
            }

            function getGeoTeamsListForLocale(locale) {
                return locale === 'ie' ? getIrelandGeoTeamsFlat() : getSpainGeoTeamsFlat();
            }

            function hasActiveGeoSelection() {
                return Boolean(activeGeoTeam);
            }

            function getCountyWideOptionLabel(county) {
                const ui = getLocaleUi('ie');
                return `${county.label} (${ui.countyWideSuffix})`;
            }

            function refreshGeoTeamsForLocale() {
                GEO_TEAMS_LIST = getGeoTeamsListForLocale(activeLocale);
            }

            function getPartyMilitantContacts() {
                const teams = activeLocale === 'ie'
                    ? GEO_TEAMS_LIST.filter((t) => t.level === 'district' || !t.level)
                    : GEO_TEAMS_LIST.filter((t) => t.level === 'municipality');
                if (!teams.length) {
                    return PARTY_MILITANT_CONTACTS.map((p) => enrichDemoContact(p));
                }
                return PARTY_MILITANT_CONTACTS.map((p, i) => enrichDemoContact({
                    ...p,
                    municipality: teams[i % teams.length].id
                }));
            }

            const TOPIC_AREA_DEFS = [
                { id: 'miscellaneous', label: 'Miscellaneous' },
                { id: 'intellectual', label: 'Intellectual' },
                { id: 'spiritual', label: 'Spiritual' },
                { id: 'cultural', label: 'Cultural' },
                { id: 'professional', label: 'Professional' },
                { id: 'territorial', label: 'Territorial' },
                { id: 'syndical', label: 'Syndical' }
            ];

            const TOPIC_AREA_LABELS = {
                all: 'All',
                ...Object.fromEntries(TOPIC_AREA_DEFS.map((a) => [a.id, a.label]))
            };

            const TOPIC_TEAM_NAMES = {
                miscellaneous: [
                    'The Drawer of Unlabeled Keys',
                    'Coalition of Mildly Concerned Bystanders',
                    'Institute for Optional Paperwork'
                ],
                intellectual: [
                    'Seminar That Never Ends',
                    'Peer Reviewers Anonymous',
                    'Footnote Preservation Society'
                ],
                spiritual: [
                    'Temple of Ambient Candle Safety',
                    'Order of the Hesitant Halo',
                    'Committee for Cosmic Vibes Only'
                ],
                cultural: [
                    'Museum of Lost Umbrellas',
                    'Folk Dance Emergency Response',
                    'Subcommittee for Avant-Garde Snacks'
                ],
                professional: [
                    'Guild of Certified Overthinkers',
                    'Bureau of Strategic Coffee',
                    'Syndicate of Reluctant Experts'
                ],
                territorial: [
                    'Neighbors Without Borders (Very Local Chapter)',
                    'Cartography of Feelings LLC',
                    'Municipality of Perpetual Roadworks'
                ],
                syndical: [
                    'Union of Things That Beep at Night',
                    'Strike Committee for Better Break Rooms',
                    'Solidarity with the Lunch Hour'
                ]
            };

            const TOPIC_TEAMS_LIST = TOPIC_AREA_DEFS.flatMap((area) =>
                [1, 2, 3].map((n) => ({
                    id: `${area.id}-team-${n}`,
                    label: TOPIC_TEAM_NAMES[area.id][n - 1],
                    areaId: area.id,
                    areaLabel: area.label,
                    teamIndex: n
                }))
            );

            function hashCollectiveId(id) {
                let h = 0;
                for (let i = 0; i < id.length; i++) h = ((h << 5) - h) + id.charCodeAt(i);
                return Math.abs(h);
            }

            const COLLECTIVE_REPRESENTATION = (() => {
                const rows = TOPIC_TEAMS_LIST.map((team, idx) => {
                    const weight = (hashCollectiveId(team.id) % 41) + 12 + idx * 3;
                    return { ...team, weight };
                });
                const total = rows.reduce((sum, row) => sum + row.weight, 0);
                return rows
                    .map((row) => ({
                        ...row,
                        sharePct: total ? (row.weight / total) * 100 : 0,
                        militantVotes: Math.round(row.weight * 14.8)
                    }))
                    .sort((a, b) => b.weight - a.weight);
            })();

            const CP_MILITANT_ONLY_BANNER = `<p class="cp-militant-only-banner" role="status">Militants only (Nv 3+). Visitors and participants do not see this directory in production.</p>`;

            window.SINDICAPP_DEMO_PERSON_NAMES = {
                marina: { ie: 'Siobhán Ní Houlihan', es: 'Marina del Campo' },
                iker: { ie: 'Cillian Burke', es: 'Iker Montenegro' },
                helena: { ie: 'Niamh Ballot', es: 'Helena Votes' },
                pau: { ie: 'Paddy Pipeworks', es: 'Pau Infrastructure' },
                lucia: { ie: 'Orla Lynch', es: 'Lúcia Comms' },
                omar: { ie: 'Fiachra Ledger', es: 'Omar Treasury' },
                elena: { ie: 'Ellen Malloy', es: 'Elena Morales' },
                marc: { ie: 'Mark Pike', es: 'Marc Puig' },
                sofia: { ie: 'Sofia Andersen', es: 'Sofia Andersen' },
                joao: { ie: 'Seán Forde', es: 'João Ferreira' },
                'lucia-v': { ie: 'Lucy Wade', es: 'Lucía Vidal' },
                tomas: { ie: 'Tommy Reilly', es: 'Tomás Riera' },
                nadia: { ie: 'Nadia El Amrani', es: 'Nadia El Amrani' },
                'jose-garcia': { ie: 'John Murphy', es: 'José García' },
                clara: { ie: 'Claire Dunne', es: 'Clara Domènech' },
                paloma: { ie: '«Riot» Peig Mischief', es: '«Riot» Paloma Desorden' },
                bruno: { ie: 'Councillor-In-Waiting Brian Byrne', es: 'Alcalde-En-Espera Bruno Barrio' },
                carmen: { ie: 'Carmel Ní Cheallaigh', es: 'Carmen La Vecina Eterna' },
                pilar: { ie: 'Dame Pilar of the Territory', es: 'Doña Pilar del Territorio' }
            };

            function personIdFromEmail(email) {
                return (email || '').split('@')[0].replace(/\+.*/, '').replace(/\./g, '-');
            }

            function demoName(personId) {
                const pack = getLocalePack();
                if (activeLocale === 'ie' && pack?.demoPersonNames?.[personId]) {
                    return pack.demoPersonNames[personId];
                }
                const row = window.SINDICAPP_DEMO_PERSON_NAMES[personId];
                if (!row) return '';
                return activeLocale === 'es' ? row.es : row.ie;
            }

            function enrichDemoContact(contact) {
                const personId = contact.personId || personIdFromEmail(contact.email);
                const localized = demoName(personId);
                return localized ? { ...contact, personId, name: localized } : { ...contact, personId };
            }

            const PARTY_MILITANT_CONTACTS = [
                { name: 'Moira Field', role: 'General Secretary', municipality: 'municipality-barcelona', collective: 'intellectual-team-1', current: 'Organic Directorate', email: 'marina@party.demo' },
                { name: 'Connor Blackwood', role: 'Coalition Desk', municipality: 'municipality-barcelona', collective: 'miscellaneous-team-1', current: 'Organic Directorate', email: 'iker@party.demo' },
                { name: 'Helena Votes', role: 'Congress Liaison', municipality: 'municipality-girona', collective: 'professional-team-2', current: 'Organic Directorate', email: 'helena@party.demo' },
                { name: 'Paul Pipeworks', role: 'Technical Ops', municipality: 'municipality-girona', collective: 'intellectual-team-2', current: 'Organic Directorate', email: 'pau@party.demo' },
                { name: 'Lucy Comms', role: 'Press & Narrative', municipality: 'municipality-lleida', collective: 'cultural-team-1', current: 'Organic Directorate', email: 'lucia@party.demo' },
                { name: 'Omar Treasury', role: 'Public Ledger Custodian', municipality: 'municipality-lleida', collective: 'professional-team-1', current: 'Organic Directorate', email: 'omar@party.demo' },
                { name: 'Countess Aldric van Metrics', role: 'Coordination deputy', municipality: 'municipality-barcelona', collective: 'intellectual-team-3', current: 'Neo-Aristocratic Technocracy', email: 'aldric@party.demo' },
                { name: 'Prof. Sebastian Optimum', role: 'Policy modeling', municipality: 'municipality-barcelona', collective: 'intellectual-team-1', current: 'Neo-Aristocratic Technocracy', email: 'sebastian@party.demo' },
                { name: 'Lady Cordelia Benchmark', role: 'Congress scoring', municipality: 'municipality-girona', collective: 'professional-team-3', current: 'Neo-Aristocratic Technocracy', email: 'cordelia@party.demo' },
                { name: 'Lord Pemberton KPI', role: 'Municipal lists', municipality: 'municipality-lleida', collective: 'territorial-team-1', current: 'Neo-Aristocratic Technocracy', email: 'kpi@party.demo' },
                { name: '«Riot» Paloma Disorder', role: 'Street mobilization', municipality: 'municipality-barcelona', collective: 'syndical-team-1', current: 'Revolutionary Antisystem Front', email: 'paloma@party.demo' },
                { name: 'Marco Off-the-Books', role: 'Direct action liaison', municipality: 'municipality-girona', collective: 'syndical-team-2', current: 'Revolutionary Antisystem Front', email: 'marco@party.demo' },
                { name: 'The Void Sister (Patricia M.)', role: 'Manifesto drafting', municipality: 'municipality-girona', collective: 'spiritual-team-2', current: 'Revolutionary Antisystem Front', email: 'void@party.demo' },
                { name: 'Gideon Unmanager', role: 'Anti-bureaucracy cell', municipality: 'municipality-lleida', collective: 'miscellaneous-team-2', current: 'Revolutionary Antisystem Front', email: 'gideon@party.demo' },
                { name: 'Mayor-In-Waiting Bruno Holt', role: 'Municipal campaigns', municipality: 'municipality-barcelona', collective: 'territorial-team-2', current: 'Sovereignist Hyperlocal Populism', email: 'bruno@party.demo' },
                { name: 'Carmen The Eternal Neighbor', role: 'Neighborhood assemblies', municipality: 'municipality-barcelona', collective: 'territorial-team-3', current: 'Sovereignist Hyperlocal Populism', email: 'carmen@party.demo' },
                { name: 'Rufus «Only My Town» Holt', role: 'Local sedes', municipality: 'municipality-girona', collective: 'territorial-team-1', current: 'Sovereignist Hyperlocal Populism', email: 'rufus@party.demo' },
                { name: 'Dame Pilar of the Territory', role: 'Territorial pledges', municipality: 'municipality-lleida', collective: 'territorial-team-2', current: 'Sovereignist Hyperlocal Populism', email: 'pilar@party.demo' },
                { name: 'Gaia-7 Sterling', role: 'Climate narrative', municipality: 'municipality-barcelona', collective: 'spiritual-team-1', current: 'Cosmic Eco-Accelerationism', email: 'gaia@party.demo' },
                { name: 'Comrade Moss FastForward', role: 'Growth & urgency', municipality: 'municipality-girona', collective: 'cultural-team-3', current: 'Cosmic Eco-Accelerationism', email: 'moss@party.demo' },
                { name: 'Dr. Helix Permaculture', role: 'Food sovereignty', municipality: 'municipality-lleida', collective: 'professional-team-2', current: 'Cosmic Eco-Accelerationism', email: 'helix@party.demo' },
                { name: 'Terra Nullius Chen', role: 'Land use working group', municipality: 'municipality-lleida', collective: 'territorial-team-3', current: 'Cosmic Eco-Accelerationism', email: 'terra@party.demo' },
                { name: 'Duke Bluetooth of Kildare', role: 'Digital guilds', municipality: 'municipality-barcelona', collective: 'professional-team-1', current: 'Retro-Feudalist Digital Syndicalism', email: 'bluetooth@party.demo' },
                { name: 'Guildmaster Slack O\'Brien', role: 'Platform cooperatives', municipality: 'municipality-girona', collective: 'syndical-team-3', current: 'Retro-Feudalist Digital Syndicalism', email: 'slack@party.demo' },
                { name: 'Serf Liberation Zhang', role: 'Labor standards', municipality: 'municipality-girona', collective: 'syndical-team-1', current: 'Retro-Feudalist Digital Syndicalism', email: 'zhang@party.demo' },
                { name: 'Abbess Blockchain', role: 'Ledger rituals', municipality: 'municipality-lleida', collective: 'miscellaneous-team-3', current: 'Retro-Feudalist Digital Syndicalism', email: 'abbess@party.demo' },
                { name: 'Ellen Malloy', role: 'Militant organizer', municipality: 'municipality-barcelona', collective: 'cultural-team-2', current: 'Unaligned', email: 'elena@party.demo' },
                { name: 'Mark Pike', role: 'Local branch host', municipality: 'municipality-girona', collective: 'cultural-team-1', current: 'Unaligned', email: 'marc@party.demo' },
                { name: 'Sofia Andersen', role: 'Training pipeline', municipality: 'municipality-lleida', collective: 'intellectual-team-2', current: 'Unaligned', email: 'sofia@party.demo' },
                { name: 'John Foster', role: 'Coalition pastries', municipality: 'municipality-barcelona', collective: 'miscellaneous-team-2', current: 'Unaligned', email: 'joao@party.demo' },
                { name: 'Lucy Wade', role: 'CRM hygiene', municipality: 'municipality-girona', collective: 'intellectual-team-3', current: 'Unaligned', email: 'lucia.v@party.demo' },
                { name: 'Tommy Reilly', role: 'Event logistics', municipality: 'municipality-lleida', collective: 'cultural-team-3', current: 'Unaligned', email: 'tomas@party.demo' },
                { name: 'Nadia El Amrani', role: 'Interpreter corps', municipality: 'municipality-barcelona', collective: 'spiritual-team-3', current: 'Unaligned', email: 'nadia@party.demo' },
                { name: 'John Murphy', role: 'Militant (duplicate registry)', municipality: 'municipality-girona', collective: 'miscellaneous-team-1', current: 'Data quarantine', email: 'jose.garcia@party.demo' },
                { name: 'John Murphy', role: 'Militant (duplicate registry)', municipality: 'municipality-girona', collective: 'miscellaneous-team-1', current: 'Data quarantine', email: 'jose.garcia+2@party.demo' },
                { name: 'John Murphy', role: 'Militant (duplicate registry)', municipality: 'municipality-lleida', collective: 'miscellaneous-team-3', current: 'Data quarantine', email: 'jose.garcia+3@party.demo' }
            ];

            const collectiveLabelById = Object.fromEntries(TOPIC_TEAMS_LIST.map((t) => [t.id, t.label]));

            function getCollectiveLabelsById() {
                const pack = getLocalePack();
                if (pack && pack.collectiveLabelsById) return pack.collectiveLabelsById;
                return collectiveLabelById;
            }

            function getCollectiveLabel(collectiveId) {
                const labels = getCollectiveLabelsById();
                return labels[collectiveId] || collectiveLabelById[collectiveId] || collectiveId;
            }

            function applyTopicTeamsLocaleLabels() {
                const labels = getCollectiveLabelsById();
                const areaLabels = getTopicAreaLabels();
                TOPIC_TEAMS_LIST.forEach((team) => {
                    team.label = labels[team.id] || collectiveLabelById[team.id] || team.label;
                    team.areaLabel = areaLabels[team.areaId] || team.areaId;
                });
                COLLECTIVE_REPRESENTATION.forEach((row) => {
                    const team = TOPIC_TEAMS_LIST.find((t) => t.id === row.id);
                    if (!team) return;
                    row.label = team.label;
                    row.areaLabel = team.areaLabel;
                });
                if (typeof rebuildTopicTeamSelect === 'function') rebuildTopicTeamSelect();
            }

            function formatMilitantContactRow(contact) {
                const base = enrichDemoContact(contact);
                if (activeLocale === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.localizeMilitantContact) {
                    return window.SINDICAPP_ES.localizeMilitantContact(base);
                }
                return base;
            }

            function getMunicipalityLabel(id) {
                const team = GEO_TEAMS_LIST.find((m) => m.id === id);
                if (!team) return id;
                if (team.level === 'county') {
                    const suffix = getLocaleUi().countySuffix || 'County';
                    return `${team.label} (${suffix})`;
                }
                return team.shortLabel || getDistrictShortLabel({ label: team.label });
            }

            function buildPartyStructureHtml(opts = {}) {
                if (activeLocale === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.buildPartyStructureHtml) {
                    return window.SINDICAPP_ES.buildPartyStructureHtml(opts);
                }
                if (activeLocale === 'ie' && window.SINDICAPP_IE && window.SINDICAPP_IE.buildPartyStructureHtml) {
                    return window.SINDICAPP_IE.buildPartyStructureHtml(opts);
                }
                const ui = getLocaleUi();
                const localSedes = GEO_TEAMS_LIST.slice(0, 3).map((m) => `<li>${m.label} — local group sede (demo)</li>`).join('');
                const candidacyPointer = opts.municipalityLabel
                    ? `<p class="template-muted" style="margin-top:10px;">Congress and municipal candidacies: open <strong>Party → Candidacy</strong> (national list plus <strong>${opts.municipalityLabel}</strong> municipal slate).</p>`
                    : `<p class="template-muted" style="margin-top:10px;">Electoral lists (congress and municipal): open <strong>Party → Candidacy</strong>.</p>`;
                return `<h5>Party Structure</h5>
                    ${CP_MILITANT_ONLY_BANNER}
                    <p class="template-muted">Functional chart of the Abstract Party — offices, coordinations, and congress liaison (demo).</p>
                    <ul class="cp-party-structure-tree">
                        <li><strong>Organic Directorate</strong><span>Executive coordination; Good/Bad alignment reviews</span>
                            <ul>
                                <li>General Secretary — ${demoName('marina')}</li>
                                <li>Coalition Desk — ${demoName('iker')}</li>
                                <li>Congress Liaison — ${demoName('helena')}</li>
                                <li>Technical Ops — ${demoName('pau')}</li>
                                <li>Press &amp; Narrative — ${demoName('lucia')}</li>
                                <li>Public Ledger Custodian — Omar Treasury</li>
                            </ul>
                        </li>
                        <li><strong>General Directorate</strong><span>Thematic coordinations, ${ui.generalDirectorateNuclei}, congress liaison</span>
                            <ul>
                                <li>Thematic coordinations (8) — min. 5% party score per seat block</li>
                                <li>Intellectual · Spiritual · Cultural · Professional</li>
                                <li>Territorial · Syndical · Miscellaneous · Coalition pastries</li>
                                ${localSedes}
                                <li>Congress liaison office — delegates (Nv 5), coordinators (Nv 6)</li>
                            </ul>
                        </li>
                    </ul>
                    ${candidacyPointer}`;
            }

            const PARTY_CONGRESS_CANDIDATES = {
                organic: [
                    { pos: 1, personId: 'marina', seat: 'National list head', note: 'General Secretary · pledges toner reform before coalition dessert' },
                    { pos: 2, personId: 'helena', seat: 'Congress liaison', note: 'Keeps staring contests within parliamentary rules' },
                    { pos: 3, personId: 'iker', seat: 'Coalition desk', note: 'Authorized to trade manifesto clauses for croissants (max. 2)' },
                    { pos: 4, personId: 'lucia', seat: 'Press & narrative', note: 'Declared yellow «provisional Good» on all outbound wires' },
                    { pos: 5, personId: 'pau', seat: 'Ballot integrity & CRM', note: 'Quarantines the 3,000 John Murphy records pre-count' },
                    { pos: 6, personId: 'omar', seat: 'Public ledger', note: 'Publishes every expense except the mystery yellow line' },
                    { pos: 7, personId: 'clara', seat: 'Honor-points liaison', note: 'Explains why 50% is still a love letter in caucus math' },
                    { pos: 8, personId: 'elena', seat: 'Militant organizer', note: 'Street delegate pipeline · Nv 4 endorsements' }
                ],
                general: [
                    { pos: 9, name: 'Prof. Sebastian Optimum', seat: 'Intellectual coordination', note: 'Neo-Aristocratic Technocracy · models Good on spreadsheets' },
                    { pos: 10, name: 'Gaia-7 Sterling', seat: 'Spiritual / eco bloc', note: 'Cosmic Eco-Accelerationism · urgent photosynthesis' },
                    { pos: 11, name: 'Comrade Moss FastForward', seat: 'Cultural acceleration', note: 'Same faction · growth & urgency subcommittee' },
                    { pos: 12, name: 'Duke Bluetooth of Kildare', seat: 'Professional / digital guilds', note: 'Retro-Feudalist Digital Syndicalism · Bluetooth oath' },
                    { pos: 13, name: 'Guildmaster Slack O\'Brien', seat: 'Platform cooperatives', note: 'Syndical slot · feudal Slack permissions' },
                    { pos: 14, personId: 'bruno', seat: 'Territorial populism', note: 'Sovereignist Hyperlocal · folding-chair doctrine' },
                    { pos: 15, personId: 'carmen', seat: 'Neighborhood assemblies', note: 'Same faction · eternal neighbor status' },
                    { pos: 16, name: 'Countess Aldric van Metrics', seat: 'Miscellaneous / KPI', note: 'Scores congress attendance in quill ledgers' },
                    { pos: 17, name: 'Lady Cordelia Benchmark', seat: 'Coalition pastries', note: 'Tracks rival party croissant superiority index' },
                    { pos: 18, name: 'Dr. Helix Permaculture', seat: 'Food sovereignty reserve', note: 'Cosmic Eco · backup if Gaia-7 photosynthesizes late' },
                    { pos: 19, personId: 'paloma', seat: 'Antisystem guest quota', note: 'Revolutionary Front · manifesto footnote 47 (non-binding)' },
                    { pos: 20, name: 'The Void Sister (Patricia M.)', seat: 'Manifesto reserve', note: 'Spiritual antisystem · defines terms we refuse elsewhere' }
                ]
            };

            function renderCongressCandidateRows(rows) {
                return rows.map((c) => {
                    const name = c.personId ? demoName(c.personId) : c.name;
                    return `<tr>
                        <td>${c.pos}</td>
                        <td><strong>${name}</strong></td>
                        <td>${c.seat}</td>
                        <td class="cp-candidacy-note">${c.note}</td>
                    </tr>`;
                }).join('');
            }

            function buildPartyCandidacyHtml(opts = {}) {
                if (activeLocale === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.buildPartyCandidacyHtml) {
                    return window.SINDICAPP_ES.buildPartyCandidacyHtml(opts);
                }
                if (activeLocale === 'ie' && window.SINDICAPP_IE && window.SINDICAPP_IE.buildPartyCandidacyHtml) {
                    return window.SINDICAPP_IE.buildPartyCandidacyHtml(opts);
                }
                const ui = getLocaleUi();
                const municipalityLabel = opts.municipalityLabel || '';
                if (municipalityLabel) {
                    return `<h5>Candidacy</h5>
                        ${CP_MILITANT_ONLY_BANNER}
                        <p class="cp-candidacy-meta"><strong>${municipalityLabel}</strong> — municipal open list (Nv 7). Same <strong>50%</strong> Organic / <strong>50%</strong> General directorate split as the national congress slate.</p>
                        <div class="cp-party-structure-candidacy-split">
                            <div>
                                <strong>Organic half (municipal)</strong>
                                <ul>
                                    <li>${demoName('marina')} — list coordinator (provisional)</li>
                                    <li>${demoName('bruno')} — territorial lead (if ${municipalityLabel} allows chairs)</li>
                                    <li>Open slot — plebiscite pending</li>
                                </ul>
                            </div>
                            <div>
                                <strong>General half (municipal)</strong>
                                <ul>
                                    <li>${demoName('carmen')} — neighborhood assemblies</li>
                                    <li>Lord Pemberton KPI — municipal metrics</li>
                                    <li>Open slot — plebiscite pending</li>
                                </ul>
                            </div>
                        </div>
                        <p class="template-muted" style="margin-top:12px;">National congress list for the whole country: open <strong>Party → Candidacy</strong> (party level, not local).</p>`;
                }
                const organicRows = renderCongressCandidateRows(PARTY_CONGRESS_CANDIDATES.organic);
                const generalRows = renderCongressCandidateRows(PARTY_CONGRESS_CANDIDATES.general);
                return `<h5>Candidacy</h5>
                    ${CP_MILITANT_ONLY_BANNER}
                    <p class="cp-candidacy-meta">Official <strong>Abstract Party of Principled Ambiguity</strong> slate for the <strong>national congress</strong> (demo). The list is locked at <strong>50% Organic Directorate</strong> and <strong>50% General Directorate</strong>; coordination council may veto individual rows after the pastry summit.</p>
                    <p class="template-muted">Status: plebiscite wording approved · batch allocation Q3 · 12,000 militants eligible to confirm order (Nv 7).</p>
                    <p class="cp-candidacy-bloc-title">Organic Directorate — 50% of congress list (positions 1–8)</p>
                    <table class="cp-contact-table cp-candidacy-congress-list">
                        <thead><tr><th>#</th><th>Candidate</th><th>Seat / role</th><th>Notes</th></tr></thead>
                        <tbody>${organicRows}</tbody>
                    </table>
                    <p class="cp-candidacy-bloc-title">General Directorate — 50% of congress list (positions 9–20)</p>
                    <table class="cp-contact-table cp-candidacy-congress-list">
                        <thead><tr><th>#</th><th>Candidate</th><th>Seat / bloc</th><th>Notes</th></tr></thead>
                        <tbody>${generalRows}</tbody>
                    </table>
                    <p class="template-muted" style="margin-top:14px;">Reserve bench (non-allocated): Serf Liberation Zhang, Abbess Blockchain, Dame Pilar of the Territory, Gideon Unmanager — activated if any delegate defects to the Bad after dessert.</p>
                    <p class="template-muted">Municipal slates (${ui.filterMunicipality.toLowerCase()}): same 50/50 rule per local group — open <strong>${ui.partyStructurePath.replace('Party Structure', 'Candidacy')}</strong> under each ${ui.filterMunicipality.toLowerCase()} mirror.</p>`;
            }

            function buildPartyContactListHtml() {
                const ui = getLocaleUi();
                const isEs = activeLocale === 'es';
                const title = isEs ? 'Lista de contactos' : 'Contact list';
                const banner = getCpMilitantOnlyBanner();
                const munOptions = GEO_TEAMS_LIST.map((m) =>
                    `<option value="${m.id}">${m.label}</option>`).join('');
                const colOptions = TOPIC_TEAMS_LIST.map((t) =>
                    `<option value="${t.id}">${getCollectiveLabel(t.id)}</option>`).join('');
                const rows = getPartyMilitantContacts().slice(0, 20).map((raw) => {
                    const p = formatMilitantContactRow(raw);
                    const colLabel = getCollectiveLabel(p.collective);
                    const munLabel = getMunicipalityLabel(p.municipality);
                    return `<tr data-contact-row data-municipality="${p.municipality}" data-collective="${p.collective}">
                        <td>${p.name}</td>
                        <td>${p.role}</td>
                        <td>${munLabel}</td>
                        <td>${colLabel}</td>
                        <td>${p.current}</td>
                        <td><a href="mailto:${p.email}">${p.email}</a></td>
                    </tr>`;
                }).join('');
                return `<!-- locale:${isEs ? 'es' : 'ie'} -->
                    <h5>${title}</h5>
                    ${banner}
                    <p class="template-muted">${isEs ? 'Padrón completo de militantes (Nv 3+). Filtra por municipio o colectivo; la tabla es continua — los filtros solo acotan la vista.' : `Complete militant roster (Nv 3+). Filter by ${ui.filterMunicipality.toLowerCase()} or collective; the list below is continuous — filters only narrow the view.`}</p>
                    <div class="cp-people-contact-root" data-people-contact-root>
                        <a class="cp-people-full-list-link" href="#" role="button" aria-label="${isEs ? 'Abrir lista completa en Excel' : 'Open full member list in Excel'}">
                            <svg class="cp-people-full-list-link-icon" viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="2" y="2" width="20" height="20" rx="3" fill="#107c41"></rect>
                                <path d="M6 7h12v10H6z" fill="#185c37"></path>
                                <path d="M9.2 9.1h2l1.2 2.2 1.2-2.2h2l-2.2 3.4 2.3 3.4h-2l-1.3-2.3-1.3 2.3h-2l2.3-3.4z" fill="#fff"></path>
                            </svg>
                            ${isEs ? 'Abrir lista completa de 12.000 militantes (Excel)' : 'Open full 12,000-member list (Excel)'}
                        </a>
                        <div class="cp-people-filters" data-people-contact-filters>
                            <label>${ui.filterMunicipality}
                                <select data-filter-municipality aria-label="${isEs ? 'Filtrar por municipio' : `Filter by ${ui.filterMunicipality.toLowerCase()}`}">
                                    <option value="all">${ui.filterAllMunicipalities}</option>
                                    ${munOptions}
                                </select>
                            </label>
                            <label>${isEs ? 'Colectivo' : 'Collective'}
                                <select data-filter-collective aria-label="${isEs ? 'Filtrar por colectivo' : 'Filter by collective'}">
                                    <option value="all">${isEs ? 'Todos los colectivos' : 'All collectives'}</option>
                                    ${colOptions}
                                </select>
                            </label>
                        </div>
                        <table class="cp-contact-table cp-people-contact-list">
                            <thead><tr><th>${isEs ? 'Nombre' : 'Name'}</th><th>${isEs ? 'Cargo' : 'Role'}</th><th>${ui.municipalityColumn}</th><th>${isEs ? 'Colectivo' : 'Collective'}</th><th>${isEs ? 'Situación' : 'Current'}</th><th>${isEs ? 'Contacto' : 'Contact'}</th></tr></thead>
                            <tbody>${rows}</tbody>
                        </table>
                        <p class="template-muted cp-people-contact-count" data-people-contact-count></p>
                    </div>`;
            }

            function buildStructureTeamHtml(title, blurb, bullets) {
                const items = bullets.map((b) => `<li>${b}</li>`).join('');
                return `<h5>${title}</h5>
                    ${CP_MILITANT_ONLY_BANNER}
                    <p class="template-muted">${blurb}</p>
                    <ul class="cp-wiki-pages" style="margin-top:10px;">${items}</ul>`;
            }

            function applyPeopleContactListFilters(root) {
                if (!root) return;
                const munSel = root.querySelector('[data-filter-municipality]');
                const colSel = root.querySelector('[data-filter-collective]');
                if (!munSel || !colSel) return;
                const mun = munSel.value;
                const col = colSel.value;
                const rows = root.querySelectorAll('[data-contact-row]');
                let visible = 0;
                rows.forEach((row) => {
                    const okMun = mun === 'all' || row.getAttribute('data-municipality') === mun;
                    const okCol = col === 'all' || row.getAttribute('data-collective') === col;
                    const show = okMun && okCol;
                    row.hidden = !show;
                    if (show) visible += 1;
                });
                const countEl = root.querySelector('[data-people-contact-count]');
                if (countEl) {
                    const fmt = getLocaleUi().contactCount;
                    countEl.textContent = typeof fmt === 'function'
                        ? fmt(visible, rows.length)
                        : `Showing ${visible} of ${rows.length} militants`;
                }
            }

            function initAllPeopleContactLists() {
                document.querySelectorAll('[data-people-contact-root]').forEach(applyPeopleContactListFilters);
            }

            const moduleLabels = {
                self: 'Self',
                collectives: 'Collectives',
                sindicato: 'Syndicate',
                'local-groups': 'Local',
                party: 'Party',
                talk: 'Talk',
                info: 'Info',
                admin: 'Admin',
                local: 'Local',
                'geo-teams': 'Local',
                'topic-teams': 'Complete List'
            };

            const TEXT_SUBDOCS_MODULES = ['talk', 'info', 'self'];

            const TALK_SIDEBAR_MAP_SECTIONS = new Set(['news', 'forum', 'social-media']);

            function buildTalkSplitSectionHtml(title, sectionId, introHtml, mapBodyHtml) {
                return `<h5>${title}</h5>
                    <div class="cp-section-intro">${introHtml}</div>
                    <div class="cp-map-body" data-map-body="${sectionId}" hidden aria-hidden="true">${mapBodyHtml}</div>`;
            }

            const PARTY_TALK_FORUM_THREADS_HTML = `
                            <ul class="cp-forum-board">
                                <li><a class="cp-forum-post cp-forum-post--pinned" href="#"><span class="cp-forum-post-title">READ FIRST: We are for the Good, against the Bad — FAQ thread</span><span class="cp-forum-post-meta">Moderation · 142 replies · Last post 2h ago</span></a></li>
                                <li><a class="cp-forum-post" href="#"><span class="cp-forum-post-title">Proposal: rename «Steering Cell» to «Cell That Steers, Hopefully»</span><span class="cp-forum-post-meta">@moira_field · 38 replies · 5h ago</span></a></li>
                                <li><a class="cp-forum-post" href="#"><span class="cp-forum-post-title">Municipal elections — who is bringing the folding chairs?</span><span class="cp-forum-post-meta">Territorial · 67 replies · Yesterday</span></a></li>
                                <li><a class="cp-forum-post" href="#"><span class="cp-forum-post-title">Is yellow a morally acceptable manifesto color? (serious)</span><span class="cp-forum-post-meta">Comms · 201 replies · Yesterday</span></a></li>
                                <li><a class="cp-forum-post" href="#"><span class="cp-forum-post-title">CONFIDENTIAL: Good/Bad alignment scorecard — Q2 draft</span><span class="cp-forum-post-meta">Steering Cell · 24 replies · 1h ago</span></a></li>
                                <li><a class="cp-forum-post" href="#"><span class="cp-forum-post-title">Leak check: who told the pastries faction our coalition position?</span><span class="cp-forum-post-meta">Security · 56 replies · Yesterday</span></a></li>
                                <li><a class="cp-forum-post" href="#"><span class="cp-forum-post-title">Treasury thread — explain the yellow printer line item</span><span class="cp-forum-post-meta">Finance · 17 replies · Yesterday</span></a></li>
                                <li><a class="cp-forum-post" href="#"><span class="cp-forum-post-title">Guest column: Why coalition pastries matter for turnout</span><span class="cp-forum-post-meta">Coalition desk · 19 replies · 2 days ago</span></a></li>
                                <li><a class="cp-forum-post" href="#"><span class="cp-forum-post-title">Introduce your collective in 3 emojis or fewer</span><span class="cp-forum-post-meta">Icebreakers · 88 replies · 3 days ago</span></a></li>
                                <li><a class="cp-forum-post" href="#"><span class="cp-forum-post-title">Bug report: forum shows 3,000 users named John Murphy online</span><span class="cp-forum-post-meta">Technical · 12 replies · 4 days ago</span></a></li>
                                <li><a class="cp-forum-post" href="#"><span class="cp-forum-post-title">Scenario planning if the Bad wins the next debate</span><span class="cp-forum-post-meta">Strategy · 43 replies · 3 days ago</span></a></li>
                            </ul>`;

            const PARTY_TALK_SOCIAL_GRID_HTML = `
                            <div class="cp-social-grid">
                                <a class="cp-social-link cp-social-link--wa" href="https://chat.whatsapp.com/ExampleAbstractPartyGroup" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#25D366" role="img"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></span>
                                    <span class="cp-social-label">WhatsApp</span>
                                    <span class="cp-social-desc">Militant group chat</span>
                                </a>
                                <a class="cp-social-link cp-social-link--tg" href="https://t.me/abstract_party_militants" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#229ED9" role="img"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></span>
                                    <span class="cp-social-label">Telegram</span>
                                    <span class="cp-social-desc">Strategy &amp; rapid alerts</span>
                                </a>
                                <a class="cp-social-link cp-social-link--ig" href="https://instagram.com/abstractparty" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#E4405F" role="img"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></span>
                                    <span class="cp-social-label">Instagram</span>
                                    <span class="cp-social-desc">Public account</span>
                                </a>
                                <a class="cp-social-link cp-social-link--tk" href="https://tiktok.com/@abstractparty" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#000000" role="img"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 3.2.01 6.39.02 9.59.04 1.88-.47 3.77-1.44 5.26-1.09 1.67-2.86 2.86-4.83 3.22-2.06.38-4.21-.12-5.89-1.36-1.97-1.35-3.2-3.65-3.32-6.05-.1-1.6.28-3.2 1.07-4.55.96-1.66 2.49-2.85 4.25-3.27 1.55-.35 3.19-.15 4.6.57.01-2.39-.01-4.78.02-7.17z"/></svg></span>
                                    <span class="cp-social-label">TikTok</span>
                                    <span class="cp-social-desc">Public account</span>
                                </a>
                                <a class="cp-social-link cp-social-link--x" href="https://x.com/AbstractParty" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#000000" role="img"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></span>
                                    <span class="cp-social-label">X</span>
                                    <span class="cp-social-desc">Public account</span>
                                </a>
                                <a class="cp-social-link cp-social-link--yt" href="https://youtube.com/@AbstractParty" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#FF0000" role="img"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></span>
                                    <span class="cp-social-label">YouTube</span>
                                    <span class="cp-social-desc">Talks &amp; livestreams</span>
                                </a>
                            </div>
                            <p class="template-muted" style="margin-top:12px;">Demo links — replace before production.</p>`;

            const PARTY_TALK_NEWS_FEED_HTML = `
                            <ul class="cp-news-feed">
                                <li class="cp-news-item"><time datetime="2026-05-26">26 May 2026 · 09:14</time><strong>Steering Cell declares yellow «provisional Good» until printer fixed</strong><p>After a manifesto reprint came out entirely in highlighter ink, the Abstract Party of Principled Ambiguity voted 11–3 (with two abstentions and one «morally chartreuse») to treat yellow as the official color of optimism pending a toner cartridge miracle.</p></li>
                                <li class="cp-news-item"><time datetime="2026-05-25">25 May 2026 · 16:02</time><strong>Coalition summit ends in pastry deadlock; Good faction claims moral victory</strong><p>Negotiations stalled when rival delegates arrived with superior croissants. Communique states willingness to govern «provided the Bad brings napkins.»</p></li>
                                <li class="cp-news-item"><time datetime="2026-05-24">24 May 2026 · 11:30</time><strong>Municipal leaflet typo promises «against the Good, for the Bad»</strong><p>10,000 flyers recalled from three towns. Party blames autocorrect, the Bad, and a volunteer named autocorrect.</p></li>
                                <li class="cp-news-item"><time datetime="2026-05-23">23 May 2026 · 08:45</time><strong>HQ coat rack granted consultative status by acclamation</strong><p>The Room Above the Stationery Shop votes to recognize the coat rack as «observer member with veto on drafts.» First policy win of the quarter.</p></li>
                                <li class="cp-news-item"><time datetime="2026-05-22">22 May 2026 · 19:20</time><strong>Treasury publishes Q2 ledger; line item «mystery yellow» under investigation</strong><p>Auditors request explanation for €214.50 spent on «toner that only prints optimism.» Finance desk promises transparency after coffee.</p></li>
                                <li class="cp-news-item"><time datetime="2026-05-21">21 May 2026 · 14:00</time><strong>Staring contest resolves internal dispute over folding chairs</strong><p>Territorial working group chair retains custody of twelve chairs after three-hour silence. Minutes note «heavy ideological blinking.»</p></li>
                                <li class="cp-news-item"><time datetime="2026-05-20">20 May 2026 · 10:15</time><strong>Virtue mugs sell out; proceeds earmarked for biscuit emergency fund</strong><p>Limited edition mugs reading «I voted Good (probably)» fund coalition hospitality. Bad faction demands equal mug rights.</p></li>
                                <li class="cp-news-item"><time datetime="2026-05-19">19 May 2026 · 07:50</time><strong>Forum thread on manifesto color reaches 201 replies; no consensus</strong><p>Comms team recommends Pantone Hopeful for Good and «whatever the printer does» for everything else.</p></li>
                            </ul>`;

            function buildPartyTalkSeedHtml() {
                const ie = window.SINDICAPP_IE;
                const newsFeed = (ie && ie.buildTalkNewsFeedHtml && ie.TALK_NEWS_ARTICLES)
                    ? ie.buildTalkNewsFeedHtml(ie.TALK_NEWS_ARTICLES)
                    : PARTY_TALK_NEWS_FEED_HTML;
                const forumBoard = (ie && ie.buildTalkForumBoardHtml && ie.TALK_FORUM_THREADS)
                    ? ie.buildTalkForumBoardHtml(ie.TALK_FORUM_THREADS)
                    : PARTY_TALK_FORUM_THREADS_HTML;
                return {
                    news: buildTalkSplitSectionHtml(
                        'News',
                        'news',
                        `<p>Official party wire — satirical briefings from the Abstract Party of Principled Ambiguity. Headlines appear in the background panel.</p>`,
                        newsFeed
                    ),
                    forum: buildTalkSplitSectionHtml(
                        'Forum',
                        'forum',
                        `<p>One party board: militants and visitors, public rows and confidential rows in a single thread list (demo). Pick a thread in the background panel.</p>`,
                        forumBoard
                    ),
                    'social-media': buildTalkSplitSectionHtml(
                        'Social Media',
                        'social-media',
                        `<p>Official channels — militant group chats and public outreach accounts. Open a link from the background panel.</p>`,
                        PARTY_TALK_SOCIAL_GRID_HTML
                    )
                };
            }

            /* Party Talk / Info / Admin — canonical blueprint; topic teams mirror unless overridden */
            /* Stable code id `talk`; display label from locale pack (Talk / Comunicación). */
            const PARTY_TEAM_SUBMODULES = {
                talk: {
                    id: 'talk',
                    header: 'Talk',
                    sections: [
                        { id: 'news', label: 'News' },
                        { id: 'forum', label: 'Forum' },
                        { id: 'social-media', label: 'Social Media' }
                    ],
                    seedHtml: buildPartyTalkSeedHtml()
                },
                info: {
                    id: 'info',
                    header: 'Info',
                    sections: [
                        {
                            id: 'structure',
                            label: 'Structure',
                            children: [
                                { id: 'party-structure', label: 'Party Structure' },
                                { id: 'candidacy', label: 'Candidacy' },
                                { id: 'contact-list', label: 'Contact list' },
                                { id: 'individual-scoreboard', label: 'Individual Scoreboard' },
                                {
                                    id: 'structure-teams',
                                    label: 'Teams',
                                    children: [
                                        { id: 'team-ideology', label: 'Ideology' },
                                        { id: 'team-it', label: 'IT' },
                                        { id: 'team-legal', label: 'Legal' },
                                        { id: 'team-administration', label: 'Administration' },
                                        { id: 'team-accounting', label: 'Accounting' },
                                        { id: 'team-communication', label: 'Communication' },
                                        { id: 'team-campaigning', label: 'Campaigning' },
                                        { id: 'team-policy', label: 'Policy' },
                                        { id: 'team-events', label: 'Events' }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'money',
                            label: 'Money',
                            children: [
                                { id: 'financial-statement', label: 'Financial Statement' },
                                { id: 'journal', label: 'Journal' },
                                { id: 'income-expenditure', label: 'Income & Expenditure' }
                            ]
                        },
                        {
                            id: 'goals',
                            label: 'Goals',
                            children: [
                                { id: 'issues', label: 'Issues' },
                                { id: 'objective-tree', label: 'Objective Tree' }
                            ]
                        },
                        {
                            id: 'wiki',
                            label: 'Wiki',
                            children: [
                                { id: 'wiki-index', label: 'Index' },
                                {
                                    id: 'rules',
                                    label: 'Rules',
                                    children: [
                                        { id: 'platform-rank-ladder', label: 'Platform rank ladder' },
                                        { id: 'rules-statutes', label: 'Statutes' }
                                    ]
                                }
                            ]
                        }
                    ],
                    seedHtml: {
                        'rules-statutes': `<h5>Statutes</h5>
                            <p class="template-muted">Satirical party statutes (demo lore). Official access levels: <strong>Wiki → Rules → Platform rank ladder</strong>.</p>
                            <div class="cp-statutes-wrap">
                                <div class="cp-statutes-bg" aria-label="Sample party statutes">
                                    <h6>Title I — Denomination and Purpose</h6>
                                    <p>The Abstract Party of Principled Ambiguity (hereinafter «the Party») is a political organization whose statutory purpose is to be <strong>in favor of the Good</strong> and <strong>against the Bad</strong>, without prejudice to future assemblies redefining which is which.</p>
                                    <h6>Title II — Membership</h6>
                                    <p>Any person who agrees with Article I may join. Persons who disagree may also join, provided they register their disagreement in triplicate. Honorary members need not exist but are encouraged for banquet seating plans.</p>
                                    <h6>Title III — Internal Democracy</h6>
                                    <p>Decisions shall be taken by majority vote, unanimity, acclamation, or whichever method produces the least paperwork. The Steering Cell may declare a «consensus emergency» and decide by staring contest.</p>
                                    <h6>Title IV — Financing</h6>
                                    <p>Funds shall be transparent, circular, and preferably denominated in units of moral credit. All expenditures must serve the Good or, in documented exceptions, the strategically necessary Bad.</p>
                                    <h6>Title V — Dissolution</h6>
                                    <p>Upon dissolution, remaining assets revert to the public good, the Bad (for safe disposal), or the stationery cupboard, in that order of preference.</p>
                                    <p><em>Certified abstractly at the Provisional Congress of Indeterminate Location, revision 0.Ω.</em></p>
                                </div>
                            </div>`,
                        'platform-rank-ladder': null,
                        'wiki-index': null,
                        issues: `<h5>Issues</h5>
                            <p class="template-muted">Strategic operations repo — political and technical party issues (GitHub-style panel).</p>
                            <div class="cp-repo-bar">abstract-party / strategic-operations</div>
                            <div class="cp-issues-toolbar">
                                <span>Open: 5</span>
                                <span>Closed: 12</span>
                                <span>Labels: political · technical · coalition · comms</span>
                            </div>
                            <ul class="cp-issues-list">
                                <li class="cp-issue open">
                                    <span class="cp-issue-state">OPEN</span>
                                    <div><strong>#47</strong> Municipal alliance talks stalled after rival party brought superior pastries <div class="cp-issue-meta">opened by @coalition-desk · political</div></div>
                                    <span class="cp-issue-tag">political</span>
                                </li>
                                <li class="cp-issue open">
                                    <span class="cp-issue-state">OPEN</span>
                                    <div><strong>#46</strong> HQ printer outputs only yellow — manifesto drafts unreadable on cream paper <div class="cp-issue-meta">opened by @ops · technical</div></div>
                                    <span class="cp-issue-tag">technical</span>
                                </li>
                                <li class="cp-issue open">
                                    <span class="cp-issue-state">OPEN</span>
                                    <div><strong>#44</strong> Define whether «against the Bad» includes retroactive moral audits <div class="cp-issue-meta">opened by @ethics-cell · political</div></div>
                                    <span class="cp-issue-tag">political</span>
                                </li>
                                <li class="cp-issue open">
                                    <span class="cp-issue-state">OPEN</span>
                                    <div><strong>#41</strong> CRM sync duplicates 3,000 militants named «John Murphy» <div class="cp-issue-meta">opened by @data · technical</div></div>
                                    <span class="cp-issue-tag">technical</span>
                                </li>
                                <li class="cp-issue closed">
                                    <span class="cp-issue-state">CLOSED</span>
                                    <div><strong>#38</strong> Clarify logo orientation when party is morally upside-down <div class="cp-issue-meta">closed by @brand · comms</div></div>
                                    <span class="cp-issue-tag">comms</span>
                                </li>
                            </ul>`,
                        'objective-tree': `<h5>Objective Tree</h5>
                            <p class="template-muted">Branch graph of strategic objectives — electoral, organizational, and reputational.</p>
                            <div class="cp-objective-tree">
                                <ul>
                                    <li><span class="cp-tree-node cp-tree-node--root">Party strategic horizon 2026–2029</span>
                                        <ul>
                                            <li><span class="cp-tree-node">Electoral footprint</span>
                                                <ul>
                                                    <li><span class="cp-tree-node">Reach 12,000 registered participants</span></li>
                                                    <li><span class="cp-tree-node">Win 3 municipal councils (&lt;50k inhabitants)</span></li>
                                                    <li><span class="cp-tree-node">Fill Congress list (50% per directorate)</span></li>
                                                </ul>
                                            </li>
                                            <li><span class="cp-tree-node">Organizational capacity</span>
                                                <ul>
                                                    <li><span class="cp-tree-node">Open 15 functional local sedes</span></li>
                                                    <li><span class="cp-tree-node">Train 200 street delegates (Nv 4 pipeline)</span></li>
                                                    <li><span class="cp-tree-node cp-tree-node--done">Launch intranet v2 (completed)</span></li>
                                                </ul>
                                            </li>
                                            <li><span class="cp-tree-node">Coalition &amp; congress</span>
                                                <ul>
                                                    <li><span class="cp-tree-node">Secure 5% score in 2 thematic coordinations</span></li>
                                                    <li><span class="cp-tree-node">Sign 1 pre-electoral pact without betraying Article I</span></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>`,
                        'party-structure': buildPartyStructureHtml(),
                        'candidacy': buildPartyCandidacyHtml(),
                        'contact-list': buildPartyContactListHtml(),
                        'team-ideology': buildStructureTeamHtml(
                            'Ideology',
                            'Doctrine, narrative, and coalition positioning — the Abstract Party of Principled Ambiguity.',
                            [
                                '<strong>Good / Bad alignment</strong> — statutory purpose reviews and manifesto color debates',
                                '<strong>Coalition narrative</strong> — pastry diplomacy, pre-electoral pacts, and press lines',
                                '<strong>Congress messaging</strong> — thematic coordination talking points',
                                '<strong>Steering briefs</strong> — weekly «provisional Good» declarations (see yellow printer incident)'
                            ]
                        ),
                        'team-it': buildStructureTeamHtml(
                            'IT',
                            'Intranet, CRM, and the machinery that keeps 3,000 militants named John Murphy distinct.',
                            [
                                '<strong>Intranet v2</strong> — militant registry (Nv 3+) and collective overrides',
                                '<strong>CRM / data</strong> — duplicate-name quarantine, honor-points sync',
                                '<strong>Ops desk</strong> — HQ printer (yellow-only mode), forum ghost users',
                                '<strong>Platform liaison</strong> — IDIN reserve integrations (30% ledger line)'
                            ]
                        ),
                        'team-legal': buildStructureTeamHtml(
                            'Legal',
                            'Statutes, compliance, and retroactive moral audits.',
                            [
                                '<strong>Party statutes</strong> — Title I–V maintenance and triplicate disagreement registry',
                                '<strong>Electoral compliance</strong> — candidacy lists, plebiscite wording, municipal filings',
                                '<strong>Coalition agreements</strong> — napkin enforceability and pastry clauses',
                                '<strong>Ethics backlog</strong> — issue #44: whether «against the Bad» is retroactive'
                            ]
                        ),
                        'team-administration': buildStructureTeamHtml(
                            'Administration',
                            'HQ, sedes, treasury handoffs, and folding-chair logistics.',
                            [
                                '<strong>HQ</strong> — Room Above the Stationery Shop; coat rack consultative status',
                                '<strong>Municipal sedes</strong> — three demo nuclei; chair custody protocols',
                                '<strong>Treasury liaison</strong> — public ledger custodian; virtue-mug proceeds',
                                '<strong>Congress logistics</strong> — delegate travel, banquet seating, emergency biscuits'
                            ]
                        ),
                        'team-accounting': buildStructureTeamHtml(
                            'Accounting',
                            'Public ledger, journal entries, and the mystery yellow toner line item.',
                            [
                                '<strong>Financial Statement</strong> — Q2 balance sheet and net position (€27,297.70 demo)',
                                '<strong>Journal</strong> — libro diario; opening balance through donation J-2408',
                                '<strong>Income &amp; Expenditure</strong> — militant fees, collective dues, virtue mugs',
                                '<strong>Audits</strong> — reconcile cash to ledger hash <code>0xGOOD-BAD-27a3f9</code>'
                            ]
                        ),
                        'team-communication': buildStructureTeamHtml(
                            'Communication',
                            'Press, social channels, and manifesto colors the printer can actually render.',
                            [
                                '<strong>Press &amp; narrative</strong> — Lucy Comms; yellow «provisional Good» statements',
                                '<strong>Social media</strong> — WhatsApp militants, Telegram alerts, IG/TikTok/X/YouTube',
                                '<strong>Forum &amp; news wire</strong> — party board threads and official satirical briefings',
                                '<strong>Brand</strong> — Pantone Hopeful; logo orientation when morally upside-down'
                            ]
                        ),
                        'team-campaigning': buildStructureTeamHtml(
                            'Campaigning',
                            'Municipal lists, leaflet runs, and folding-chair electoral logistics.',
                            [
                                '<strong>Municipal candidacies</strong> — three open lists; plebiscites pending',
                                '<strong>Provincial &amp; congress lists</strong> — 50% Organic / 50% General directorate split',
                                '<strong>Field ops</strong> — door knocking, chair custody, staring-contest tiebreaks',
                                '<strong>Materials</strong> — recall run for «against the Good, for the Bad» typo flyers'
                            ]
                        ),
                        'team-policy': buildStructureTeamHtml(
                            'Policy',
                            'Issues repo, objective tree, and statutes that refuse to define key terms.',
                            [
                                '<strong>Strategic issues</strong> — political &amp; technical backlog (#47 pastries, #46 printer)',
                                '<strong>Objective tree</strong> — 12k participants, 3 councils, congress list fill',
                                '<strong>Rules corpus</strong> — Good/Bad purpose, triplicate disagreement registry',
                                '<strong>Wiki liaison</strong> — coalition matrix, crisis manual, glossary of refusal'
                            ]
                        ),
                        'team-events': buildStructureTeamHtml(
                            'Events',
                            'Coalition summits, assemblies, and catering that wins or loses alliances.',
                            [
                                '<strong>Coalition summits</strong> — pastry deadlock protocol; napkin agreements',
                                '<strong>Assemblies</strong> — consensus emergencies; staring contests',
                                '<strong>Municipal rallies</strong> — folding-chair deployments; virtue-mug merch',
                                '<strong>Congress social</strong> — banquet seating; emergency biscuit reserves'
                            ]
                        ),
                        'financial-statement': `<h5>Financial Statement</h5>
                            <p class="template-muted">Balance sheet (estado de situación financiera) — Q2 2026, public summary.</p>
                            <div class="cp-fin-summary">
                                <div class="cp-fin-summary-card"><span>Total assets</span><strong>€31,840.00</strong></div>
                                <div class="cp-fin-summary-card"><span>Total liabilities</span><strong>€4,542.30</strong></div>
                                <div class="cp-fin-summary-card"><span>Net position</span><strong>€27,297.70</strong></div>
                                <div class="cp-fin-summary-card"><span>Cash &amp; equivalents</span><strong>€22,120.00</strong></div>
                            </div>
                            <table class="cp-fin-table">
                                <thead><tr><th>Account</th><th>Amount (€)</th></tr></thead>
                                <tbody>
                                    <tr class="cp-fin-subhead"><td colspan="2">Assets</td></tr>
                                    <tr><td>100 — Cash at bank</td><td>22,120.00</td></tr>
                                    <tr><td>110 — HQ deposits &amp; prepayments</td><td>1,780.00</td></tr>
                                    <tr><td>120 — Campaign materials inventory</td><td>4,940.00</td></tr>
                                    <tr><td>130 — Equipment (net)</td><td>3,000.00</td></tr>
                                    <tr class="cp-fin-total"><td>Total assets</td><td>31,840.00</td></tr>
                                    <tr class="cp-fin-subhead"><td colspan="2">Liabilities</td></tr>
                                    <tr><td>200 — Creditors (suppliers)</td><td>2,112.30</td></tr>
                                    <tr><td>210 — Deferred militant fees</td><td>1,430.00</td></tr>
                                    <tr><td>220 — Coalition event payables</td><td>1,000.00</td></tr>
                                    <tr class="cp-fin-total"><td>Total liabilities</td><td>4,542.30</td></tr>
                                    <tr class="cp-fin-subhead"><td colspan="2">Net position</td></tr>
                                    <tr class="cp-fin-total"><td>Fund balance (party equity)</td><td>27,297.70</td></tr>
                                </tbody>
                            </table>
                            <p class="cp-ledger-foot">Auditor note (demo): figures reconcile to Journal closing balance · Last closed 2026-05-22.</p>`,
                        journal: `<h5>Journal</h5>
                            <p class="template-muted">General journal (libro diario) — chronological movements, public ledger.</p>
                            <table class="cp-ledger-table">
                                <thead><tr><th>Date</th><th>Entry</th><th>Account</th><th>Debit</th><th>Credit</th><th>Memo</th></tr></thead>
                                <tbody>
                                    <tr><td>2026-05-01</td><td>J-2401</td><td>100 Cash</td><td class="cp-ledger-in">24,180.00</td><td class="cp-ledger-out">—</td><td>Opening balance Q2</td></tr>
                                    <tr><td>2026-05-03</td><td>J-2402</td><td>410 Militant fees</td><td class="cp-ledger-in">3,420.00</td><td class="cp-ledger-out">—</td><td>April Nv 3 batch</td></tr>
                                    <tr><td>2026-05-05</td><td>J-2403</td><td>510 HQ rent</td><td class="cp-ledger-in">—</td><td class="cp-ledger-out">890.00</td><td>Room Above Stationery Shop</td></tr>
                                    <tr><td>2026-05-08</td><td>J-2404</td><td>520 Printing</td><td class="cp-ledger-in">—</td><td class="cp-ledger-out">214.50</td><td>Yellow-only manifesto incident</td></tr>
                                    <tr><td>2026-05-12</td><td>J-2405</td><td>420 Collective dues</td><td class="cp-ledger-in">1,100.00</td><td class="cp-ledger-out">—</td><td>Colectivo Aurora transfer</td></tr>
                                    <tr><td>2026-05-12</td><td>J-2406</td><td>530 IDIN reserve</td><td class="cp-ledger-in">—</td><td class="cp-ledger-out">330.00</td><td>30% platform allocation</td></tr>
                                    <tr><td>2026-05-18</td><td>J-2407</td><td>540 Events</td><td class="cp-ledger-in">—</td><td class="cp-ledger-out">467.80</td><td>Coalition summit catering</td></tr>
                                    <tr><td>2026-05-22</td><td>J-2408</td><td>430 Donations</td><td class="cp-ledger-in">500.00</td><td class="cp-ledger-out">—</td><td>Anonymous Friend of the Good</td></tr>
                                </tbody>
                            </table>
                            <p class="cp-ledger-foot">Ledger hash (demo): <code>0xGOOD-BAD-27a3f9</code> · Closing cash €27,297.70 · Disputes via Admin → Treasury.</p>`,
                        'income-expenditure': `<h5>Income &amp; Expenditure</h5>
                            <p class="template-muted">Income &amp; expenditure account (cuenta de ingresos y gastos) — Q2 2026 to date.</p>
                            <div class="cp-ie-grid">
                                <div class="cp-ie-block">
                                    <h6>Income (ingresos)</h6>
                                    <ul class="cp-ie-list">
                                        <li><span>Militant fees (Nv 3)</span><span class="cp-ie-amt">€8,940.00</span></li>
                                        <li><span>Collective dues transfers</span><span class="cp-ie-amt">€3,850.00</span></li>
                                        <li><span>Individual donations</span><span class="cp-ie-amt">€1,250.00</span></li>
                                        <li><span>Merchandise (virtue mugs)</span><span class="cp-ie-amt">€320.00</span></li>
                                        <li><span>Public subsidies (applied)</span><span class="cp-ie-amt">€2,100.00</span></li>
                                    </ul>
                                    <div class="cp-ie-total"><span>Total income</span><span>€16,460.00</span></div>
                                </div>
                                <div class="cp-ie-block">
                                    <h6>Expenditure (gastos)</h6>
                                    <ul class="cp-ie-list">
                                        <li><span>HQ rent &amp; utilities</span><span class="cp-ie-amt">€2,670.00</span></li>
                                        <li><span>Printing &amp; materials</span><span class="cp-ie-amt">€1,890.50</span></li>
                                        <li><span>Events &amp; coalition summits</span><span class="cp-ie-amt">€1,420.80</span></li>
                                        <li><span>IDIN platform reserve (30%)</span><span class="cp-ie-amt">€990.00</span></li>
                                        <li><span>Staff &amp; volunteer expenses</span><span class="cp-ie-amt">€640.00</span></li>
                                        <li><span>Legal &amp; compliance</span><span class="cp-ie-amt">€380.00</span></li>
                                    </ul>
                                    <div class="cp-ie-total"><span>Total expenditure</span><span>€7,991.30</span></div>
                                </div>
                            </div>
                            <p class="cp-ledger-foot" style="margin-top:14px;">Surplus (demo): <strong>€8,468.70</strong> · Matches movement in Net position after non-cash adjustments.</p>`
                    }
                },
                admin: {
                    id: 'admin',
                    defaultHtml: `<h4 class="template-section-title">Admin</h4>
                        <p class="template-muted">Party administration — mirrored by every collective in the list unless that collective saves its own override.</p>
                        <div class="party-admin-sections">
                            <section class="party-admin-block">
                                <h5>Membership &amp; roles</h5>
                                <p>Militant registry (Nv 3), representative plebiscites (Nv 4), delegate discipline in congress (Nv 5).</p>
                                <ul>
                                    <li>Quota collection and fiduciary commitment tracking</li>
                                    <li>Intranet access rules per collective voted</li>
                                </ul>
                            </section>
                            <section class="party-admin-block">
                                <h5>Votes &amp; scores</h5>
                                <p>Social vote totals per collective, party affiliation splits, congress weighting.</p>
                            </section>
                            <section class="party-admin-block">
                                <h5>Candidacies 21</h5>
                                <p>Congress and municipal seat batches — 50% Organic Directorate / 50% General Directorate per list. Coordination council vetoes (essay).</p>
                            </section>
                            <section class="party-admin-block">
                                <h5>Moderation &amp; compliance</h5>
                                <p>IDIN reserved moderation for illegal conduct or terms violations (wiki IDIN).</p>
                            </section>
                        </div>`
                }
            };

            function cloneDocSection(sec) {
                const out = { id: sec.id, label: sec.label };
                if (sec.children) out.children = sec.children.map(cloneDocSection);
                return out;
            }

            function clonePartySubmoduleSections(subId) {
                return getPartyTeamSubmodules()[subId].sections.map(cloneDocSection);
            }

            function buildTopicTeamPartyWrap() {
                const wrap = document.getElementById('topic-team-party-wrap');
                if (!wrap || wrap.dataset.built === '1') return;

                const talkMounts = TOPIC_TEAMS_LIST.map((team, i) =>
                    `<div class="template-subdocs-mount" data-subdocs-module="topic-${team.id}-talk" data-team-key="topic-${team.id}-talk" data-mirror-party-sub="talk"${i === 0 ? '' : ' hidden'}></div>`
                ).join('');
                const infoMounts = TOPIC_TEAMS_LIST.map((team, i) =>
                    `<div class="template-subdocs-mount" data-subdocs-module="topic-${team.id}-info" data-team-key="topic-${team.id}-info" data-mirror-party-sub="info"${i === 0 ? '' : ' hidden'}></div>`
                ).join('');
                wrap.innerHTML = `
                    <div class="team-sub-panel active" data-topic-team-sub-panel="talk">${talkMounts}</div>
                    <div class="team-sub-panel" data-topic-team-sub-panel="info">${infoMounts}</div>`;
                wrap.dataset.built = '1';
            }

            buildTopicTeamPartyWrap();

            const geoRenderedModules = new Set();

            function getGeoTeamsForPartyWrap() {
                if (activeLocale === 'ie') {
                    if (!activeGeoCounty) return [];
                    const countyTeam = GEO_TEAMS_LIST.find((t) => t.id === getCountyTeamId(activeGeoCounty));
                    const districts = getDistrictsForActiveCounty();
                    return [countyTeam, ...districts].filter(Boolean);
                }
                if (!activeGeoComarca) return [];
                const comarcaTeam = GEO_TEAMS_LIST.find((t) => t.id === getComarcaTeamId(activeGeoComarca));
                const municipalities = getMunicipalitiesForActiveComarca();
                return [comarcaTeam, ...municipalities].filter(Boolean);
            }

            function applyLocalGroupSeedForTeams(teams) {
                (teams || []).forEach((team) => {
                    ['talk', 'info'].forEach((sub) => {
                        const moduleId = `geo-${team.id}-${sub}`;
                        const cfg = subdocsConfig[moduleId];
                        if (!cfg) return;
                        collectDocSectionLeafIds(cfg).forEach((sectionId) => {
                            const key = docEditKey(moduleId, sectionId);
                            if (sectionId === 'party-structure') {
                                const structureLabel = team.level === 'county' || team.level === 'ccaa'
                                    ? team.label
                                    : team.level === 'province' || team.level === 'comarca'
                                        ? team.label
                                        : (team.shortLabel || getDistrictShortLabel({ label: team.label }));
                                cartagramaDocEdits[key] = buildPartyStructureHtml({ municipalityLabel: structureLabel });
                                return;
                            }
                            if (sectionId === 'candidacy') {
                                const structureLabel = team.level === 'county' || team.level === 'ccaa'
                                    ? team.label
                                    : team.level === 'province' || team.level === 'comarca'
                                        ? team.label
                                        : (team.shortLabel || getDistrictShortLabel({ label: team.label }));
                                cartagramaDocEdits[key] = buildPartyCandidacyHtml({ municipalityLabel: structureLabel });
                                return;
                            }
                            if (typeof cartagramaDocEdits[key] === 'string' && cartagramaDocEdits[key].trim()) return;
                            const sectionLabel = getSectionLabelById(cfg.sections, sectionId);
                            if (team.level === 'county' || team.level === 'ccaa' || team.level === 'province' || team.level === 'comarca') {
                                cartagramaDocEdits[key] = buildCountyLoreHtml(sectionId, sectionLabel, team.label);
                            } else {
                                const districtLabel = team.shortLabel || getDistrictShortLabel({ label: team.label });
                                const parentLabel = team.comarcaLabel || team.countyLabel || team.provinceLabel || '';
                                cartagramaDocEdits[key] = buildLocalGroupLoreHtml(sectionId, sectionLabel, districtLabel, parentLabel);
                            }
                        });
                    });
                });
            }

            function ensureGeoTeamsRendered(teams) {
                const list = teams || [];
                registerTeamSubdocs('geo', list, { mirrorParty: true });
                applyLocalGroupSeedForTeams(list);
                list.forEach((team) => {
                    ['talk', 'info'].forEach((sub) => {
                        const moduleId = `geo-${team.id}-${sub}`;
                        if (!subdocsConfig[moduleId]) return;
                        if (!geoRenderedModules.has(moduleId)) {
                            renderSubdocsModule(moduleId);
                            geoRenderedModules.add(moduleId);
                        }
                        applyResolvedDocToModule(moduleId);
                    });
                });
                syncGeoTeamAdminPanelsFromParty();
            }

            function ensureGeoChangeLocationButton() {
                if (!geoTeamsInfoBlock || document.getElementById('geo-change-location-btn')) return;
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.id = 'geo-change-location-btn';
                btn.className = 'geo-change-location-btn';
                btn.textContent = activeLocale === 'es' ? 'Cambiar municipio' : 'Change county or district';
                btn.hidden = true;
                btn.addEventListener('click', () => {
                    setGeoTeam('');
                    updateGeoInfoSidebarLayout();
                });
                if (geoTeamsTeamSubnav) {
                    geoTeamsInfoBlock.insertBefore(btn, geoTeamsTeamSubnav);
                } else {
                    geoTeamsInfoBlock.appendChild(btn);
                }
            }

            function updateGeoInfoSidebarLayout() {
                ensureGeoChangeLocationButton();
                const onLocalTeamsMode = isLocalModuleActive() && activeGeoTeamsMode !== 'map';
                const inTeamContent = onLocalTeamsMode && Boolean(activeGeoTeam);
                const changeBtn = document.getElementById('geo-change-location-btn');
                if (geoCountyRow) geoCountyRow.hidden = activeLocale !== 'ie' || inTeamContent;
                if (geoCcaaRow) geoCcaaRow.hidden = activeLocale !== 'es' || inTeamContent;
                if (geoProvinceRow) geoProvinceRow.hidden = activeLocale !== 'es' || inTeamContent;
                if (geoComarcaRow) geoComarcaRow.hidden = activeLocale !== 'es' || inTeamContent;
                if (geoMunicipalityRow) geoMunicipalityRow.hidden = inTeamContent;
                if (changeBtn) changeBtn.hidden = !inTeamContent;
            }

            function buildGeoTeamPartyWrap(force) {
                const wrap = document.getElementById('geo-team-party-wrap');
                if (!wrap) return;
                const scopeKey = activeLocale === 'ie'
                    ? (activeGeoCounty || '')
                    : `${activeGeoCcaa}|${activeGeoProvince}|${activeGeoComarca}`;
                if (!force && wrap.dataset.built === '1' && wrap.dataset.locale === activeLocale && wrap.dataset.scope === scopeKey) {
                    return;
                }
                const teams = getGeoTeamsForPartyWrap();
                const talkMounts = teams.map((team, i) =>
                    `<div class="template-subdocs-mount" data-subdocs-module="geo-${team.id}-talk" data-team-key="geo-${team.id}-talk" data-mirror-party-sub="talk"${i === 0 ? '' : ' hidden'}></div>`
                ).join('');
                const infoMounts = teams.map((team, i) =>
                    `<div class="template-subdocs-mount" data-subdocs-module="geo-${team.id}-info" data-team-key="geo-${team.id}-info" data-mirror-party-sub="info"${i === 0 ? '' : ' hidden'}></div>`
                ).join('');
                wrap.innerHTML = `
                    <div class="team-sub-panel active" data-geo-team-sub-panel="talk">${talkMounts}</div>
                    <div class="team-sub-panel" data-geo-team-sub-panel="info">${infoMounts}</div>`;
                wrap.dataset.built = '1';
                wrap.dataset.locale = activeLocale;
                wrap.dataset.scope = scopeKey;
            }

            function getSelfSubdocsConfig() {
                const pack = getLocalePack();
                const s = pack && pack.selfSections;
                if (s) {
                    return {
                        containerId: 'template-self-subdocs',
                        header: s.header,
                        sections: [
                            {
                                id: 'profile',
                                label: s.profile,
                                children: [
                                    { id: 'public-profile', label: s.publicProfile },
                                    { id: 'account-details', label: s.accountDetails },
                                    { id: 'votes-received', label: s.votesReceived }
                                ]
                            },
                            { id: 'voting', label: s.voting },
                            { id: 'messages', label: s.messages },
                            {
                                id: 'admin',
                                label: s.admin,
                                children: [
                                    { id: 'admin-party', label: s.adminParty },
                                    { id: 'admin-collectives', label: s.adminCollectives },
                                    { id: 'admin-groupings', label: s.adminGroupings },
                                    { id: 'admin-sindicato', label: s.adminSindicato }
                                ]
                            }
                        ]
                    };
                }
                return {
                    containerId: 'template-self-subdocs',
                    header: 'Self',
                    sections: [
                        {
                            id: 'profile',
                            label: 'Profile',
                            children: [
                                { id: 'public-profile', label: 'Public Profile' },
                                { id: 'account-details', label: 'Account Details' },
                                { id: 'votes-received', label: 'Votes Received' }
                            ]
                        },
                        { id: 'voting', label: 'Voting' },
                        { id: 'messages', label: 'Messages' },
                        {
                            id: 'admin',
                            label: 'Admin',
                            children: [
                                { id: 'admin-party', label: 'Party' },
                                { id: 'admin-collectives', label: 'Collectives' },
                                { id: 'admin-groupings', label: 'Groupings' },
                                { id: 'admin-sindicato', label: 'Syndicate' }
                            ]
                        }
                    ]
                };
            }

            const subdocsConfig = {
                talk: {
                    containerId: 'template-talk-subdocs',
                    header: getPartyTeamSubmodules().talk.header,
                    sections: clonePartySubmoduleSections('talk')
                },
                info: {
                    containerId: 'template-info-subdocs',
                    header: getPartyTeamSubmodules().info.header,
                    sections: clonePartySubmoduleSections('info')
                },
                self: getSelfSubdocsConfig()
            };

            function registerOrgMirror(prefix, orgLabel) {
                ['talk', 'info'].forEach((sub) => {
                    const spec = getPartyTeamSubmodules()[sub];
                    const key = `${prefix}-${sub}`;
                    subdocsConfig[key] = {
                        containerId: `template-${key}-subdocs`,
                        header: `${orgLabel} — ${spec.header}`,
                        sections: clonePartySubmoduleSections(sub),
                        mirrorPartySub: sub
                    };
                });
            }

            function registerTeamSubdocs(prefix, teams, options = {}) {
                const mirrorParty = options.mirrorParty === true;
                teams.forEach((team) => {
                    ['talk', 'info'].forEach((sub) => {
                        const spec = getPartyTeamSubmodules()[sub];
                        const key = `${prefix}-${team.id}-${sub}`;
                        if (subdocsConfig[key]) return;
                        subdocsConfig[key] = {
                            containerId: `template-${key}-subdocs`,
                            header: `${team.label} — ${spec.header}`,
                            sections: clonePartySubmoduleSections(sub),
                            mirrorPartySub: mirrorParty ? sub : null
                        };
                    });
                });
            }

            registerOrgMirror('collectives');
            registerOrgMirror('local-groups');
            registerTeamSubdocs('geo', [], { mirrorParty: true });
            registerTeamSubdocs('topic', TOPIC_TEAMS_LIST, { mirrorParty: false });

            let activeModule = null;
            let activeCollectivesOrgSub = 'talk';
            let activeCollectivesSection = 'lista';
            let activeCollectivesListSub = 'complete-list';
            let activeLocalGroupsOrgSub = 'talk';
            let localGroupsWorkspace = 'map';
            let activePartySub = 'partido';
            let activePartyInternalSub = 'talk';
            let activeCandidacySub = 'congreso';
            let activeCandidacyCcaa = '';
            let activeCandidacyMunicipality = '';
            let activeGeoTeamsMode = 'map';
            let lastMapTerritorySelection = null;
            let activeGeoTeam = '';
            let activeGeoCounty = '';
            let activeGeoCcaa = '';
            let activeGeoProvince = '';
            let activeGeoComarca = '';
            let activeGeoTeamSub = 'talk';
            let activeTopicTeam = '';
            let activeTopicTeamSub = 'talk';
            let activeTopicArea = 'all';
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
            let activeSindicatoMapTerritory = '';
            let activeSindicatoFeedScope = 'general';
            let activeSindicatoFeedSectorId = '';
            let activeSindicatoFeedTerritoryId = '';
            let activeSindicatoFeedCompanyId = '';
            let activeSindicatoForumThread = '';
            let sindicatoWorkplaceFilter = '';
            let activeSelfSub = 'sindicato';
            let activeSelfPartySection = 'public-profile';
            let activeSelfSindicatoSection = 'overview';
            const USER_WORKPLACE_BY_LOCALE = { es: 'zona-franca-logistica', ie: 'docklands-logistics' };
            const topicAreaButtons = document.querySelectorAll('[data-topic-area]');
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

            function getDistrictsForActiveCounty() {
                if (activeLocale !== 'ie' || !activeGeoCounty) return [];
                const county = IE_COUNTIES.find((c) => c.id === activeGeoCounty);
                if (!county) return [];
                return getCountyMunicipalDistricts(county).map((m) => ({
                    id: m.id,
                    label: getDistrictShortLabel(m),
                    countyId: county.id,
                    countyLabel: county.label,
                    level: 'district'
                }));
            }

            function getMunicipalitiesForActiveComarca() {
                if (activeLocale !== 'es' || !activeGeoCcaa || !activeGeoProvince || !activeGeoComarca) return [];
                const comarca = findEsComarca(activeGeoCcaa, activeGeoProvince, activeGeoComarca);
                if (!comarca) return [];
                const province = findEsProvince(activeGeoCcaa, activeGeoProvince);
                const ccaa = findEsCcaa(activeGeoCcaa);
                return (comarca.municipalities || []).map((m) => ({
                    id: m.id,
                    label: m.label,
                    shortLabel: m.shortLabel || m.label,
                    ccaaId: ccaa.id,
                    ccaaLabel: ccaa.label,
                    provinceId: province.id,
                    provinceLabel: province.label,
                    comarcaId: comarca.id,
                    comarcaLabel: comarca.label,
                    level: 'municipality'
                }));
            }

            function getComarcaWideOptionLabel(comarca) {
                const ui = getLocaleUi('es');
                return `${comarca.label} (${ui.comarcaWideSuffix || 'toda la comarca'})`;
            }

            function syncSpainGeoPickerValues() {
                if (geoCcaaSelect && activeGeoCcaa) geoCcaaSelect.value = activeGeoCcaa;
                if (geoProvinceSelect && activeGeoProvince) geoProvinceSelect.value = activeGeoProvince;
                if (geoComarcaSelect && activeGeoComarca) geoComarcaSelect.value = activeGeoComarca;
                if (geoTeamSelect && activeGeoTeam) geoTeamSelect.value = activeGeoTeam;
            }

            function applySpainGeoPathFromTeam(teamId) {
                const team = GEO_TEAMS_LIST.find((t) => t.id === teamId);
                if (!team || activeLocale !== 'es') return;
                if (team.ccaaId) activeGeoCcaa = team.ccaaId;
                if (team.provinceId) activeGeoProvince = team.provinceId;
                if (team.comarcaId) activeGeoComarca = team.comarcaId;
                rebuildGeoProvinceSelect();
                rebuildGeoComarcaSelect();
                rebuildGeoMunicipalitySelect();
                syncSpainGeoPickerValues();
            }

            function rebuildGeoCcaaSelect() {
                if (!geoCcaaSelect) return;
                const ui = getLocaleUi();
                if (activeLocale !== 'es') {
                    geoCcaaSelect.innerHTML = '';
                    return;
                }
                geoCcaaSelect.innerHTML = `<option value="">${ui.selectCcaaPlaceholder || '…'}</option>`
                    + ES_TERRITORY_TREE.map((c) => `<option value="${c.id}">${c.label}</option>`).join('');
                if (activeGeoCcaa && ES_TERRITORY_TREE.some((c) => c.id === activeGeoCcaa)) {
                    geoCcaaSelect.value = activeGeoCcaa;
                }
            }

            function rebuildGeoProvinceSelect() {
                if (!geoProvinceSelect) return;
                const ui = getLocaleUi();
                const provinceRow = geoProvinceRow;
                if (activeLocale !== 'es') {
                    geoProvinceSelect.innerHTML = '';
                    return;
                }
                if (!activeGeoCcaa) {
                    geoProvinceSelect.innerHTML = `<option value="">${ui.selectCcaaPlaceholder || '…'}</option>`;
                    geoProvinceSelect.disabled = true;
                    if (provinceRow) provinceRow.classList.add('geo-picker-row--disabled');
                    return;
                }
                const ccaa = findEsCcaa(activeGeoCcaa);
                geoProvinceSelect.disabled = false;
                if (provinceRow) provinceRow.classList.remove('geo-picker-row--disabled');
                geoProvinceSelect.innerHTML = `<option value="">${ui.selectProvincePlaceholder || '…'}</option>`
                    + (ccaa?.provinces || []).map((p) => `<option value="${p.id}">${p.label}</option>`).join('');
                if (activeGeoProvince && (ccaa?.provinces || []).some((p) => p.id === activeGeoProvince)) {
                    geoProvinceSelect.value = activeGeoProvince;
                } else {
                    geoProvinceSelect.value = '';
                }
            }

            function rebuildGeoComarcaSelect() {
                if (!geoComarcaSelect) return;
                const ui = getLocaleUi();
                const comarcaRow = geoComarcaRow;
                if (activeLocale !== 'es') {
                    geoComarcaSelect.innerHTML = '';
                    return;
                }
                if (!activeGeoProvince) {
                    geoComarcaSelect.innerHTML = `<option value="">${ui.selectProvinceFirst || '…'}</option>`;
                    geoComarcaSelect.disabled = true;
                    if (comarcaRow) comarcaRow.classList.add('geo-picker-row--disabled');
                    return;
                }
                const province = findEsProvince(activeGeoCcaa, activeGeoProvince);
                geoComarcaSelect.disabled = false;
                if (comarcaRow) comarcaRow.classList.remove('geo-picker-row--disabled');
                geoComarcaSelect.innerHTML = `<option value="">${ui.selectComarcaPlaceholder || '…'}</option>`
                    + (province?.comarques || []).map((c) => `<option value="${c.id}">${c.label}</option>`).join('');
                if (activeGeoComarca && (province?.comarques || []).some((c) => c.id === activeGeoComarca)) {
                    geoComarcaSelect.value = activeGeoComarca;
                } else {
                    geoComarcaSelect.value = '';
                }
            }

            function setGeoCcaa(ccaaId) {
                activeGeoCcaa = ES_TERRITORY_TREE.some((c) => c.id === ccaaId) ? ccaaId : '';
                activeGeoProvince = '';
                activeGeoComarca = '';
                rebuildGeoProvinceSelect();
                rebuildGeoComarcaSelect();
                rebuildGeoMunicipalitySelect();
                buildGeoTeamPartyWrap(true);
                const wrapTeams = getGeoTeamsForPartyWrap();
                if (wrapTeams.length) ensureGeoTeamsRendered(wrapTeams);
                const keepTeam = activeGeoTeam && GEO_TEAMS_LIST.some((t) => {
                    if (t.id !== activeGeoTeam) return false;
                    return !activeGeoCcaa || t.ccaaId === activeGeoCcaa;
                });
                if (!keepTeam) setGeoTeam('');
                updateGeoInfoSidebarLayout();
            }

            function setGeoProvince(provinceId) {
                const province = findEsProvince(activeGeoCcaa, provinceId);
                activeGeoProvince = province ? provinceId : '';
                activeGeoComarca = '';
                rebuildGeoComarcaSelect();
                rebuildGeoMunicipalitySelect();
                buildGeoTeamPartyWrap(true);
                const wrapTeams = getGeoTeamsForPartyWrap();
                if (wrapTeams.length) ensureGeoTeamsRendered(wrapTeams);
                const comarcaTeamId = activeGeoComarca ? getComarcaTeamId(activeGeoComarca) : '';
                const keepTeam = activeGeoTeam && (() => {
                    const t = GEO_TEAMS_LIST.find((x) => x.id === activeGeoTeam);
                    return t && t.ccaaId === activeGeoCcaa && t.provinceId === activeGeoProvince
                        && (t.level === 'province' || t.level === 'ccaa');
                })();
                if (!keepTeam) setGeoTeam('');
                updateGeoInfoSidebarLayout();
            }

            function setGeoComarca(comarcaId) {
                const comarca = findEsComarca(activeGeoCcaa, activeGeoProvince, comarcaId);
                activeGeoComarca = comarca ? comarcaId : '';
                rebuildGeoMunicipalitySelect();
                buildGeoTeamPartyWrap(true);
                const wrapTeams = getGeoTeamsForPartyWrap();
                if (wrapTeams.length) ensureGeoTeamsRendered(wrapTeams);
                const comarcaTeamId = activeGeoComarca ? getComarcaTeamId(activeGeoComarca) : '';
                const keepTeam = activeGeoTeam && (
                    activeGeoTeam === comarcaTeamId
                    || getMunicipalitiesForActiveComarca().some((m) => m.id === activeGeoTeam)
                );
                if (!keepTeam) setGeoTeam('');
                updateGeoInfoSidebarLayout();
            }

            function rebuildGeoCountySelect() {
                if (!geoCountySelect) return;
                const ui = getLocaleUi();
                if (activeLocale !== 'ie') {
                    geoCountySelect.innerHTML = '';
                    return;
                }
                geoCountySelect.innerHTML = `<option value="">${ui.selectCountyPlaceholder}</option>`
                    + IE_COUNTIES.map((c) => `<option value="${c.id}">${c.label}</option>`).join('');
                if (activeGeoCounty && IE_COUNTIES.some((c) => c.id === activeGeoCounty)) {
                    geoCountySelect.value = activeGeoCounty;
                } else if (IE_COUNTIES.length) {
                    activeGeoCounty = IE_COUNTIES[0].id;
                    geoCountySelect.value = activeGeoCounty;
                }
            }

            function rebuildGeoMunicipalitySelect() {
                if (!geoTeamSelect) return;
                const ui = getLocaleUi();
                if (activeLocale === 'ie' && !activeGeoCounty) {
                    geoTeamSelect.innerHTML = `<option value="">${ui.selectCountyFirst || 'Select a county first…'}</option>`;
                    geoTeamSelect.disabled = true;
                    if (geoMunicipalityRow) geoMunicipalityRow.classList.add('geo-picker-row--disabled');
                    return;
                }
                if (activeLocale === 'es' && !activeGeoComarca) {
                    geoTeamSelect.innerHTML = `<option value="">${ui.selectComarcaFirst || 'Selecciona una comarca primero…'}</option>`;
                    geoTeamSelect.disabled = true;
                    if (geoMunicipalityRow) geoMunicipalityRow.classList.add('geo-picker-row--disabled');
                    return;
                }
                geoTeamSelect.disabled = false;
                if (geoMunicipalityRow) geoMunicipalityRow.classList.remove('geo-picker-row--disabled');
                const teams = activeLocale === 'ie' ? getDistrictsForActiveCounty() : getMunicipalitiesForActiveComarca();
                const prevTeam = activeGeoTeam || '';
                let optionsHtml = `<option value="">${ui.selectMunicipalityPlaceholder}</option>`;
                if (activeLocale === 'ie' && activeGeoCounty) {
                    const county = IE_COUNTIES.find((c) => c.id === activeGeoCounty);
                    if (county) {
                        const countyTeamId = getCountyTeamId(county.id);
                        optionsHtml += `<option value="${countyTeamId}">${getCountyWideOptionLabel(county)}</option>`;
                    }
                }
                if (activeLocale === 'es' && activeGeoComarca) {
                    const comarca = findEsComarca(activeGeoCcaa, activeGeoProvince, activeGeoComarca);
                    if (comarca) {
                        const comarcaTeamId = getComarcaTeamId(comarca.id);
                        optionsHtml += `<option value="${comarcaTeamId}">${getComarcaWideOptionLabel(comarca)}</option>`;
                    }
                }
                optionsHtml += teams.map((m) => `<option value="${m.id}">${m.label}</option>`).join('');
                geoTeamSelect.innerHTML = optionsHtml;
                const countyTeamId = activeGeoCounty ? getCountyTeamId(activeGeoCounty) : '';
                const comarcaTeamId = activeGeoComarca ? getComarcaTeamId(activeGeoComarca) : '';
                const validValues = new Set(teams.map((m) => m.id));
                if (countyTeamId) validValues.add(countyTeamId);
                if (comarcaTeamId) validValues.add(comarcaTeamId);
                if (prevTeam && validValues.has(prevTeam)) {
                    geoTeamSelect.value = prevTeam;
                } else {
                    geoTeamSelect.value = '';
                }
            }

            function setGeoCounty(countyId) {
                activeGeoCounty = IE_COUNTIES.some((c) => c.id === countyId) ? countyId : '';
                rebuildGeoMunicipalitySelect();
                buildGeoTeamPartyWrap(true);
                const wrapTeams = getGeoTeamsForPartyWrap();
                if (wrapTeams.length) ensureGeoTeamsRendered(wrapTeams);
                const countyTeamId = activeGeoCounty ? getCountyTeamId(activeGeoCounty) : '';
                const keepTeam = activeGeoTeam && (
                    activeGeoTeam === countyTeamId
                    || getDistrictsForActiveCounty().some((d) => d.id === activeGeoTeam)
                );
                if (!keepTeam) setGeoTeam('');
                updateGeoInfoSidebarLayout();
            }

            function syncLocaleGeoPickers() {
                const ui = getLocaleUi();
                if (geoCountyRow) geoCountyRow.hidden = activeLocale !== 'ie';
                if (geoCcaaRow) geoCcaaRow.hidden = activeLocale !== 'es';
                if (geoProvinceRow) geoProvinceRow.hidden = activeLocale !== 'es';
                if (geoComarcaRow) geoComarcaRow.hidden = activeLocale !== 'es';
                if (geoCountySubtitle) geoCountySubtitle.textContent = ui.selectCounty;
                if (geoCcaaSubtitle) geoCcaaSubtitle.textContent = ui.selectCcaa || 'Comunidad autónoma';
                if (geoProvinceSubtitle) geoProvinceSubtitle.textContent = ui.selectProvince || 'Provincia';
                if (geoComarcaSubtitle) geoComarcaSubtitle.textContent = ui.selectComarca || 'Comarca';
                if (geoMunicipalitySubtitle) geoMunicipalitySubtitle.textContent = ui.selectMunicipality;
                if (geoTeamSelect) geoTeamSelect.setAttribute('aria-label', ui.selectMunicipality);
                if (geoCountySelect) geoCountySelect.setAttribute('aria-label', ui.selectCounty);
                if (geoCcaaSelect) geoCcaaSelect.setAttribute('aria-label', ui.selectCcaa || 'Comunidad autónoma');
                if (geoProvinceSelect) geoProvinceSelect.setAttribute('aria-label', ui.selectProvince || 'Provincia');
                if (geoComarcaSelect) geoComarcaSelect.setAttribute('aria-label', ui.selectComarca || 'Comarca');
                if (geoTeamsTeamSubnav) geoTeamsTeamSubnav.setAttribute('aria-label', ui.municipalityModulesAria);
                const infoModeBtn = document.querySelector('[data-geo-teams-mode="info"]');
                if (infoModeBtn) {
                    infoModeBtn.innerHTML = `<span aria-hidden="true">📖</span> ${ui.infoLocalGroupsNav}`;
                }
                rebuildGeoCountySelect();
                rebuildGeoCcaaSelect();
                rebuildGeoProvinceSelect();
                rebuildGeoComarcaSelect();
                rebuildGeoMunicipalitySelect();
            }

            function onLocaleGeoChanged() {
                geoRenderedModules.clear();
                refreshGeoTeamsForLocale();
                syncLocaleGeoPickers();
                if (activeLocale === 'ie' && IE_COUNTIES.length && !activeGeoCounty) {
                    activeGeoCounty = IE_COUNTIES[0].id;
                }
                if (activeLocale !== 'ie') {
                    activeGeoCounty = '';
                }
                if (activeLocale === 'es') {
                    activeGeoCcaa = ES_TERRITORY_TREE[0]?.id || '';
                    activeGeoProvince = '';
                    activeGeoComarca = '';
                } else {
                    activeGeoCcaa = '';
                    activeGeoProvince = '';
                    activeGeoComarca = '';
                }
                rebuildGeoCountySelect();
                rebuildGeoCcaaSelect();
                rebuildGeoProvinceSelect();
                rebuildGeoComarcaSelect();
                rebuildGeoMunicipalitySelect();
                if (activeLocale === 'ie' && IE_COUNTIES.length) {
                    setGeoCounty(activeGeoCounty || IE_COUNTIES[0].id);
                } else if (activeLocale === 'es' && activeGeoCcaa) {
                    setGeoCcaa(activeGeoCcaa);
                    setGeoTeam('');
                } else {
                    buildGeoTeamPartyWrap(true);
                    setGeoTeam('');
                }
                updateGeoInfoSidebarLayout();
                if (typeof initAllPeopleContactLists === 'function') initAllPeopleContactLists();
            }

            function initLocaleEarly() {
                activeLocale = readStoredLocale() || window.__sindicappEarlyLocale || 'es';
                syncEuropePreCheckedOverride(activeLocale);
                refreshGeoTeamsForLocale();
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
                if (options.skipGeoRebuild !== true) {
                    onLocaleGeoChanged();
                }
                if (boundaryControlsInitialized) {
                    applyEuropePinnedTerritories(getLocaleConfig(activeLocale).europePreChecked);
                }
                recenterMapForLocale();
                if (options.skipRelocalize !== true) {
                    relocalizeForLocale();
                }
                refreshLocaleSensitiveCopy();
                applyPersonalModuleForLocale();
                document.body.classList.remove('sindicapp-booting');
            }

            window.__sindicappApplyLocale = function (locale) {
                setActiveLocale(locale);
            };
            if (window.__sindicappLocaleQueue) {
                setActiveLocale(window.__sindicappLocaleQueue);
                window.__sindicappLocaleQueue = null;
            }

            let cartagramaDocsEditorOpenFor = null;
            const cartagramaDocEdits = {};

            function docEditKey(moduleId, sectionId) {
                return `${moduleId}:${sectionId}`;
            }

            function topicTeamAdminEditKey(teamId) {
                return `topic-admin:${teamId}`;
            }

            function buildAbstractCollectiveLoreHtml(sectionId, sectionLabel, contextLabel) {
                if (activeLocale === 'es') {
                    const title = sectionLabel || contextLabel || 'Nota del colectivo';
                    const context = contextLabel || 'este colectivo';
                    const sharedIntro = `<p>El <strong>Colectivo Abstracto</strong> persigue objetivos cívicos de alcance general — alfabetización democrática, equidad procedimental y coordinación de interés público a largo plazo, al estilo de un departamento secreto que perdió el mapa pero no el expediente.</p>
                    <p>Dentro de <strong>${context}</strong>, el colectivo actúa como estabilizador constitucional: menos ruido de facción, más lenguaje común y decisiones auditables por cualquier militante con paciencia.</p>`;
                    switch (sectionId) {
                        case 'news':
                            return `<h5>${title}</h5>${sharedIntro}<p>Canal de hitos públicos: campañas, consultas y acuerdos municipales, tono institucional sin propaganda barata.</p>`;
                        case 'forum':
                            return `<h5>${title}</h5>${sharedIntro}<p>Cámara deliberativa: conflicto de principios, límites prácticos y vías de implementación — con acta obligatoria.</p>`;
                        case 'social-media':
                            return `<h5>${title}</h5>${sharedIntro}<p>Capa de traducción cívica: resúmenes y convocatorias para quien no lee PDFs de 40 páginas.</p>`;
                        default:
                            return `<h5>${title}</h5>${sharedIntro}<p>Cómo el colectivo traduce objetivos abstractos en coordinación práctica en ${context}.</p>`;
                    }
                }
                const title = sectionLabel || contextLabel || 'Collective note';
                const context = contextLabel || 'this collective';
                const sharedIntro = `<p><strong>Abstract Collective</strong> is devoted to abstract civic objectives of general nature: democratic literacy, procedural fairness, and long-horizon public-interest coordination across ideological families.</p>
                    <p>Inside <strong>${context}</strong>, the collective acts as a constitutional stabilizer: reducing factional noise, translating debates into common civic language, and keeping decisions auditable by ordinary participants.</p>`;
                switch (sectionId) {
                    case 'news':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>News in this channel tracks public-facing milestones: civic campaigns launched, consultation rounds opened, and municipal cooperation outcomes. Tone is institutional, transparent, and non-propagandistic.</p>
                            <ul>
                                <li>Priority feed: participation drives, rights-awareness actions, and community service outcomes.</li>
                                <li>Editorial rule: report decisions with rationale, trade-offs, and next review date.</li>
                                <li>Narrative objective: show governance as a civic process, not a personality contest.</li>
                            </ul>`;
                    case 'forum':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>The forum is the deliberative chamber of the Abstract Collective. Threads are organized by principle conflicts, practical constraints, and implementation pathways.</p>
                            <ul>
                                <li>Debate protocol: claim, evidence, counterfactual, and civic impact statement.</li>
                                <li>Moderation standard: disagreement is protected; procedural sabotage is not.</li>
                                <li>Expected output: concrete proposals that can be voted or piloted locally.</li>
                            </ul>`;
                    case 'social-media':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>Social channels are treated as a civic translation layer: turning dense policy and procedural topics into accessible formats for broader participation.</p>
                            <ul>
                                <li>Publishing rhythm: explainers, meeting summaries, and participatory calls.</li>
                                <li>Brand voice: calm, specific, and accountability-first.</li>
                                <li>Engagement goal: convert spectators into informed contributors.</li>
                            </ul>`;
                    case 'rules':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>Rules define how abstract objectives become enforceable civic practice: quorum design, amendment paths, and appeal mechanisms.</p>
                            <ul>
                                <li>Core norm: clarity over charisma.</li>
                                <li>Governance safeguard: every exceptional procedure has an expiry clause.</li>
                                <li>Revision cycle: statutes are reviewed each congress period.</li>
                            </ul>`;
                    case 'wiki':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>The wiki stores the institutional memory of the Abstract Collective: concepts, precedents, and implementation notes reusable across collectives and municipalities.</p>
                            <ul>
                                <li>Knowledge model: doctrine, case notes, and reusable policy templates.</li>
                                <li>Maintenance rule: each page includes author, date, and confidence level.</li>
                            </ul>`;
                    case 'issues':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>Issues represent unresolved civic problems that require cross-collective coordination. Entries combine political framing and operational tasks.</p>
                            <ul>
                                <li>Triage dimensions: urgency, reversibility, and social impact radius.</li>
                                <li>Closure criteria: implemented action plus measurable public outcome.</li>
                            </ul>`;
                    case 'objective-tree':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>The objective tree maps abstract civic aims into executable layers: institutional trust, territorial cohesion, and long-term democratic capability.</p>
                            <ul>
                                <li>Root: public legitimacy through transparent process.</li>
                                <li>Branches: participation, service coordination, and conflict mediation.</li>
                                <li>Leaves: measurable actions at neighborhood and municipal scale.</li>
                            </ul>`;
                    case 'party-structure':
                    case 'candidacy':
                    case 'contact-list':
                    case 'individual-scoreboard':
                    case 'team-ideology':
                    case 'team-it':
                    case 'team-legal':
                    case 'team-administration':
                    case 'team-accounting':
                    case 'team-communication':
                    case 'team-campaigning':
                    case 'team-policy':
                    case 'team-events':
                    case 'financial-statement':
                    case 'journal':
                    case 'income-expenditure':
                    case 'admin':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>This section documents institutional capacity for ${context}: who does what, where accountability sits, and how civic resources are tracked over time.</p>
                            <ul>
                                <li>Operational focus: transparent role ownership and auditable decisions.</li>
                                <li>Civic focus: resources and representation aligned with general public benefit.</li>
                            </ul>`;
                    default:
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>This submodule records how the Abstract Collective translates high-level civic objectives into practical coordination in ${context}.</p>`;
                }
            }

            function buildCountyLoreHtml(sectionId, sectionLabel, countyLabel) {
                if (activeLocale === 'es') {
                    const title = sectionLabel || 'Expediente comarcal';
                    const county = countyLabel || 'esta comarca';
                    const sharedIntro = `<p>El grupo local de <strong>${county}</strong> coordina Comunicación, Info y Admin en todos los municipios de la comarca — política compartida, recursos y enlace con el partido.</p>
                    <p>El trabajo comarcal fija valores por defecto para los municipios sin quitar autonomía en lo local.</p>`;
                    switch (sectionId) {
                        case 'news':
                            return `<h5>${title}</h5>${sharedIntro}<p>Noticias comarcales: decisiones que afectan a todo el territorio, campañas cruzadas y resultados compartidos.</p>`;
                        case 'forum':
                            return `<h5>${title}</h5>${sharedIntro}<p>Foro comarcal: debates que cruzan municipios — presupuestos, candidaturas e infraestructura común.</p>`;
                        case 'social-media':
                            return `<h5>${title}</h5>${sharedIntro}<p>Canales comarcales: resúmenes que aplican a todos los municipios salvo override local.</p>`;
                        default:
                            return `<h5>${title}</h5>${sharedIntro}<p>Roles, procedimientos y compromisos comarcales de ${county}.</p>`;
                    }
                }
                const title = sectionLabel || 'County dossier';
                const county = countyLabel || 'this county';
                const talkLabel = getModuleLabels().talk;
                const sharedIntro = `<p><strong>${county}</strong> county local group coordinates ${talkLabel}, Info, and Admin across all municipal districts — shared county policy, county council liaison, and party HQ in Dublin (demo).</p>
                    <p>County-level work sets defaults for districts while keeping parish-hall autonomy on local delivery.</p>`;
                switch (sectionId) {
                    case 'news':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>County news covers council-wide decisions, cross-district campaigns, and outcomes that affect the whole county — plus the occasional folding-chair dispute.</p>`;
                    case 'forum':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>The county forum hosts debates that span municipal districts — budgets, Dáil candidacies, and who is bringing the chairs to the caucus.</p>`;
                    case 'social-media':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>County channels publish briefings that apply to every district unless a district page overrides them.</p>`;
                    default:
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>This section records county-wide roles, procedures, and commitments for ${county}.</p>`;
                }
            }

            function buildLocalGroupLoreHtml(sectionId, sectionLabel, municipalityLabel, countyLabel) {
                const ui = getLocaleUi();
                if (activeLocale === 'es') {
                    const muni = municipalityLabel || ui.localGroupIntro;
                    const title = sectionLabel || 'Expediente local';
                    const placeLine = countyLabel
                        ? `<p>En <strong>${muni}</strong> (<strong>${countyLabel}</strong>) hay un grupo local municipal: mediación vecinal, servicios y custodia democrática del barrio.</p>`
                        : `<p><strong>${muni}</strong> acoge un grupo local de práctica municipal: mediación, coordinación de servicios y vigilancia ciudadana del mandato.</p>`;
                    const sharedIntro = `${placeLine}<p>Su mandato es territorial: adaptar marcos del partido y los colectivos a la realidad del pueblo, sin perder transparencia.</p>`;
                    switch (sectionId) {
                        case 'news':
                            return `<h5>${title}</h5>${sharedIntro}<p>Noticias locales: asambleas, acuerdos de servicio y resultados que afectan al día a día.</p>`;
                        case 'forum':
                            return `<h5>${title}</h5>${sharedIntro}<p>Tablón municipal donde vecinos, militantes y delegados negocian plazos y soluciones concretas.</p>`;
                        case 'social-media':
                            return `<h5>${title}</h5>${sharedIntro}<p>Redes del municipio: convocatorias y cuentas de resultados para quien no entra al foro interno.</p>`;
                        default:
                            return `<h5>${title}</h5>${sharedIntro}<p>Práctica institucional local en ${muni}: cargos, procedimientos y compromisos medibles.</p>`;
                    }
                }
                const muni = municipalityLabel || ui.localGroupIntro;
                const title = sectionLabel || 'Local dossier';
                const placeLine = countyLabel
                    ? `<p><strong>${muni}</strong> (<strong>${countyLabel}</strong>) hosts a municipal-district local group: parish-hall meetings, neighborhood mediation, and democratic stewardship with a cup of tea.</p>`
                    : `<p><strong>${muni}</strong> hosts a local group anchored in municipal-district civic practice: parish-hall meetings, service coordination, and local democratic stewardship.</p>`;
                const sharedIntro = `${placeLine}
                    <p>Its mandate is territorial: adapt party and collective frameworks to concrete local constraints while preserving transparency, citizen oversight, and the craic.</p>`;
                switch (sectionId) {
                    case 'news':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>Local news tracks municipal milestones: assemblies, service agreements, and implementation outcomes affecting daily civic life.</p>`;
                    case 'forum':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>The forum is the municipal deliberation board where residents, militants, and delegates negotiate practical solutions and timeline commitments.</p>`;
                    case 'social-media':
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>Social channels publish local briefings, meeting calls, and accountability updates for residents who do not follow internal forums.</p>`;
                    default:
                        return `<h5>${title}</h5>
                            ${sharedIntro}
                            <p>This section describes local institutional practice in ${muni}: roles, procedures, and measurable municipal commitments.</p>`;
                }
            }

            function getFirstLeafSection(sec) {
                if (!sec.children?.length) return sec;
                return getFirstLeafSection(sec.children[0]);
            }

            function collectDocSectionLeafIds(cfg) {
                const ids = [];
                function walk(sections) {
                    (sections || []).forEach((sec) => {
                        if (sec.children) walk(sec.children);
                        else ids.push(sec.id);
                    });
                }
                walk(cfg.sections);
                return ids;
            }

            function findDocSectionPath(sections, docId, ancestors = []) {
                for (const sec of sections || []) {
                    const path = [...ancestors, sec];
                    if (sec.id === docId) return path;
                    if (sec.children) {
                        const found = findDocSectionPath(sec.children, docId, path);
                        if (found) return found;
                    }
                }
                return null;
            }

            function getPartyAdminHtml() {
                if (typeof cartagramaDocEdits['party:admin'] === 'string') {
                    return cartagramaDocEdits['party:admin'];
                }
                return getPartyTeamSubmodules().admin.defaultHtml;
            }

            function initPartyAdminPanel() {
                const panel = document.getElementById('party-admin-panel');
                if (panel) panel.innerHTML = getPartyAdminHtml();
            }

            function initOrgAdminPanels() {
                const collectivesPanel = document.getElementById('collectives-admin-panel');
                if (collectivesPanel) collectivesPanel.innerHTML = getPartyAdminHtml();
                const localGroupsPanel = document.getElementById('local-groups-admin-panel');
                if (localGroupsPanel) localGroupsPanel.innerHTML = getPartyAdminHtml();
            }

            function getResolvedAdminHtml(teamId) {
                const overrideKey = topicTeamAdminEditKey(teamId);
                if (typeof cartagramaDocEdits[overrideKey] === 'string') {
                    return cartagramaDocEdits[overrideKey];
                }
                return buildAbstractCollectiveLoreHtml('Admin', 'this collective');
            }

            function syncTopicTeamAdminPanelsFromParty() {
                if (!topicTeamPartyWrap) return;
                TOPIC_TEAMS_LIST.forEach((team) => {
                    const panel = topicTeamPartyWrap.querySelector(`[data-team-key="topic-${team.id}-admin"]`);
                    if (panel) panel.innerHTML = getResolvedAdminHtml(team.id);
                });
            }

            function syncGeoTeamAdminPanelsFromParty() {
                if (!geoTeamPartyWrap) return;
                getGeoTeamsForPartyWrap().forEach((team) => {
                    const panel = geoTeamPartyWrap.querySelector(`[data-team-key="geo-${team.id}-admin"]`);
                    if (panel) panel.innerHTML = getPartyAdminHtml();
                });
            }

            function syncMirroredAdminPanelsFromParty() {
                syncTopicTeamAdminPanelsFromParty();
                syncGeoTeamAdminPanelsFromParty();
                initOrgAdminPanels();
            }

            function getResolvedDocHtml(moduleId, sectionId) {
                const ownKey = docEditKey(moduleId, sectionId);
                if (typeof cartagramaDocEdits[ownKey] === 'string' && cartagramaDocEdits[ownKey].trim()) {
                    return cartagramaDocEdits[ownKey];
                }
                const cfg = subdocsConfig[moduleId];
                if (!cfg?.mirrorPartySub) return null;
                const partySub = cfg.mirrorPartySub;
                const partyKey = docEditKey(partySub, sectionId);
                if (typeof cartagramaDocEdits[partyKey] === 'string') {
                    return cartagramaDocEdits[partyKey];
                }
                const partyContainer = getSubdocsContainer(partySub);
                const partyTarget = partyContainer?.querySelector(
                    `.cartagrama-doc-edit-target[data-doc-section="${sectionId}"]`
                );
                return partyTarget ? partyTarget.innerHTML : null;
            }

            function applyResolvedDocToModule(moduleId) {
                const cfg = subdocsConfig[moduleId];
                const container = getSubdocsContainer(moduleId);
                if (!cfg || !container) return;
                let syncedContactList = false;
                collectDocSectionLeafIds(cfg).forEach((sectionId) => {
                    const html = getResolvedDocHtml(moduleId, sectionId);
                    if (!html) return;
                    container.querySelectorAll(`.cartagrama-doc-edit-target[data-doc-section="${sectionId}"]`).forEach((el) => {
                        el.innerHTML = html;
                    });
                    if (sectionId === 'contact-list') syncedContactList = true;
                });
                if (syncedContactList) {
                    container.querySelectorAll('[data-people-contact-root]').forEach(applyPeopleContactListFilters);
                }
            }

            function syncMirroredSubdocsFromParty(moduleId) {
                const cfg = subdocsConfig[moduleId];
                if (!cfg?.mirrorPartySub) return;
                applyResolvedDocToModule(moduleId);
            }

            function syncAllMirroredSubdocsFromParty() {
                Object.keys(subdocsConfig).forEach((moduleId) => {
                    if (!subdocsConfig[moduleId].mirrorPartySub) return;
                    if (moduleId.startsWith('geo-') && !geoRenderedModules.has(moduleId)) return;
                    syncMirroredSubdocsFromParty(moduleId);
                });
                syncMirroredAdminPanelsFromParty();
            }

            function applyPartySubmoduleSeedToStore() {
                const subs = getPartyTeamSubmodules();
                ['talk', 'info'].forEach((sub) => {
                    const spec = subs[sub];
                    if (!spec.seedHtml) return;
                    Object.entries(spec.seedHtml).forEach(([sectionId, html]) => {
                        if (html) cartagramaDocEdits[docEditKey(sub, sectionId)] = html;
                    });
                });
                cartagramaDocEdits['party:admin'] = subs.admin.defaultHtml;
                cartagramaDocEdits[docEditKey('info', 'contact-list')] = buildPartyContactListHtml();
                cartagramaDocEdits[docEditKey('info', 'individual-scoreboard')] = buildPartyIndividualScoreboardHtml();
                cartagramaDocEdits[docEditKey('info', 'wiki-index')] = buildPartyWikiIndexHtml(activeLocale);
                cartagramaDocEdits[docEditKey('info', 'platform-rank-ladder')] = buildPlatformRankLadderSeedHtml();
                delete cartagramaDocEdits[docEditKey('info', 'wiki')];
                delete cartagramaDocEdits[docEditKey('info', 'rules')];
            }

            function syncSubdocsConfigSectionsForLocale() {
                const subs = getPartyTeamSubmodules();
                ['talk', 'info'].forEach((sub) => {
                    const sections = clonePartySubmoduleSections(sub);
                    if (subdocsConfig[sub]) {
                        subdocsConfig[sub].sections = sections;
                        subdocsConfig[sub].header = subs[sub].header;
                    }
                    Object.keys(subdocsConfig).forEach((key) => {
                        const cfg = subdocsConfig[key];
                        if (cfg.mirrorPartySub !== sub) return;
                        cfg.sections = sections;
                        if (key.startsWith('local-groups-')) {
                            cfg.header = `${getOrgMirrorLabel('local-groups')} — ${subs[sub].header}`;
                        } else if (key.startsWith('collectives-')) {
                            cfg.header = `${getOrgMirrorLabel('collectives')} — ${subs[sub].header}`;
                        } else if (key.startsWith('geo-')) {
                            const teamId = key.replace(/^geo-/, '').replace(/-(talk|info)$/, '');
                            const team = GEO_TEAMS_LIST.find((t) => t.id === teamId);
                            cfg.header = team ? `${team.label} — ${subs[sub].header}` : cfg.header;
                        } else if (key.startsWith('topic-')) {
                            const teamId = key.replace(/^topic-/, '').replace(/-(talk|info)$/, '');
                            const team = TOPIC_TEAMS_LIST.find((t) => t.id === teamId);
                            cfg.header = team ? `${team.label} — ${subs[sub].header}` : cfg.header;
                        }
                    });
                });
                const selfCfg = getSelfSubdocsConfig();
                subdocsConfig.self.header = selfCfg.header;
                subdocsConfig.self.sections = selfCfg.sections;
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
                const repIntro = document.querySelector('#collectives-representation-sidebar .collectives-representation-sidebar-intro');
                if (repIntro && ui.collectivesScoreboardIntro) repIntro.textContent = ui.collectivesScoreboardIntro;
                const genIntro = document.querySelector('#collectives-general-coordination-sidebar .collectives-representation-sidebar-intro');
                if (genIntro && ui.generalCoordinationIntro) genIntro.textContent = ui.generalCoordinationIntro;
                const scoreTitle = document.querySelector('#template-module-collectives-representation .template-section-title');
                if (scoreTitle && ui.collectivesScoreboardTitle) scoreTitle.textContent = ui.collectivesScoreboardTitle;
                const scoreMuted = document.querySelector('#template-module-collectives-representation .template-muted');
                if (scoreMuted && ui.collectivesScoreboardMuted) scoreMuted.textContent = ui.collectivesScoreboardMuted;
                const genTitle = document.querySelector('#template-module-collectives-general-coordination .template-section-title');
                if (genTitle && ui.generalCoordinationTitle) genTitle.textContent = ui.generalCoordinationTitle;
                const genMuted = document.querySelector('#template-module-collectives-general-coordination .template-muted');
                if (genMuted && ui.generalCoordinationMuted) genMuted.textContent = ui.generalCoordinationMuted;
                const candidacyCcaaSubtitle = document.getElementById('candidacy-ccaa-subtitle');
                if (candidacyCcaaSubtitle && ui.candidacyCcaaSubtitle) candidacyCcaaSubtitle.textContent = ui.candidacyCcaaSubtitle;
                const candidacyMuniSubtitle = document.getElementById('candidacy-municipales-subtitle');
                if (candidacyMuniSubtitle && ui.candidacyMunicipalesSubtitle) candidacyMuniSubtitle.textContent = ui.candidacyMunicipalesSubtitle;
                if (candidacyCcaaSelect && ui.candidacyCcaaSelect) candidacyCcaaSelect.setAttribute('aria-label', ui.candidacyCcaaSelect);
                if (candidacyMunicipalitySelect && ui.candidacyMunicipalesSelect) {
                    candidacyMunicipalitySelect.setAttribute('aria-label', ui.candidacyMunicipalesSelect);
                }
                const areasSubtitle = document.querySelector('#topic-areas-filter .teams-team-nav-subtitle');
                if (areasSubtitle && ui.areas) areasSubtitle.textContent = ui.areas;
                const selectColSubtitle = document.querySelector('#topic-teams-nav-block .teams-team-nav-subtitle');
                if (selectColSubtitle && ui.selectCollectiveLabel) selectColSubtitle.textContent = ui.selectCollectiveLabel;
                if (topicTeamSelect && ui.selectCollective) {
                    const firstOpt = topicTeamSelect.querySelector('option[value=""]');
                    if (firstOpt) firstOpt.textContent = ui.selectCollective;
                }
                const geoBranchLabel = document.querySelector('#geo-teams-branch .template-nav-branch-label');
                if (geoBranchLabel && ui.infoLocalGroupsNav) geoBranchLabel.textContent = ui.infoLocalGroupsNav;
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
                const topicLabels = getTopicAreaLabels();
                topicAreaButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-topic-area');
                    if (topicLabels[id]) btn.textContent = topicLabels[id];
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
                applyTopicTeamsLocaleLabels();
                syncSubdocsConfigSectionsForLocale();
                applyPartySubmoduleSeedToStore();
                Object.keys(subdocsConfig).forEach((moduleId) => {
                    if (moduleId.startsWith('geo-') && !geoRenderedModules.has(moduleId)) return;
                    renderSubdocsModule(moduleId);
                });
                applyPartySubmoduleSeedToDom();
                applyTopicCollectiveSeedToStore();
                applyTopicCollectiveSeedToDom();
                applyLocalGroupSeedToStore();
                applyLocalGroupSeedToDom();
                syncAllMirroredSubdocsFromParty();
                refreshLocaleNavLabels();
                const changeBtn = document.getElementById('geo-change-location-btn');
                if (changeBtn) changeBtn.textContent = getLocaleUi().changeLocation || (activeLocale === 'es' ? 'Cambiar municipio' : 'Change county or district');
                if (typeof buildGeoTeamPartyWrap === 'function') {
                    buildGeoTeamPartyWrap(true);
                    if (activeLocale === 'es' && activeGeoComarca) ensureGeoTeamsRendered(getGeoTeamsForPartyWrap());
                }
                updateModuleBodyLabel();
                if (isRankingWorkspace()) syncCollectiveRepresentationWorkspace();
                if (isGeneralCoordinationWorkspace()) syncCollectivesGeneralCoordinationWorkspace();
                if (isPartyCandidacyWorkspace()) {
                    rebuildCandidacyTerritorySelects();
                    syncPartyCandidacyWorkspace();
                }
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
                if (isTextWorkspaceModule()) syncDocsSectionToMapText();
            }

            function getSectionLabelById(sections, sectionId) {
                const path = findDocSectionPath(sections, sectionId);
                const leaf = path?.[path.length - 1];
                return leaf?.label || sectionId;
            }

            function applyTopicCollectiveSeedToStore() {
                TOPIC_TEAMS_LIST.forEach((team) => {
                    ['talk', 'info'].forEach((sub) => {
                        const moduleId = `topic-${team.id}-${sub}`;
                        const cfg = subdocsConfig[moduleId];
                        if (!cfg) return;
                        collectDocSectionLeafIds(cfg).forEach((sectionId) => {
                            const key = docEditKey(moduleId, sectionId);
                            if (typeof cartagramaDocEdits[key] === 'string' && cartagramaDocEdits[key].trim()) return;
                            const sectionLabel = getSectionLabelById(cfg.sections, sectionId);
                            cartagramaDocEdits[key] = buildAbstractCollectiveLoreHtml(sectionId, sectionLabel, team.label);
                        });
                    });
                    const adminKey = topicTeamAdminEditKey(team.id);
                    if (typeof cartagramaDocEdits[adminKey] !== 'string' || !cartagramaDocEdits[adminKey].trim()) {
                        cartagramaDocEdits[adminKey] = buildAbstractCollectiveLoreHtml('admin', 'Admin', team.label);
                    }
                });
            }

            function applyTopicCollectiveSeedToDom() {
                TOPIC_TEAMS_LIST.forEach((team) => {
                    applyResolvedDocToModule(`topic-${team.id}-talk`);
                    applyResolvedDocToModule(`topic-${team.id}-info`);
                });
                syncTopicTeamAdminPanelsFromParty();
            }

            function applyLocalGroupSeedToStore() {
                applyLocalGroupSeedForTeams(GEO_TEAMS_LIST);
            }

            function applyLocalGroupSeedToDom() {
                GEO_TEAMS_LIST.forEach((team) => {
                    applyResolvedDocToModule(`geo-${team.id}-talk`);
                    applyResolvedDocToModule(`geo-${team.id}-info`);
                });
            }

            function applyPartySubmoduleSeedToDom() {
                ['talk', 'info'].forEach((sub) => applyResolvedDocToModule(sub));
                initPartyAdminPanel();
                initOrgAdminPanels();
            }

            function docEditPencilInTabRow(moduleId) {
                if (moduleId === 'self') return false;
                if (moduleId === 'talk' || moduleId === 'info') return false;
                const cfg = subdocsConfig[moduleId];
                if (cfg?.mirrorPartySub) return false;
                return true;
            }

            function buildDocEditDropdown(sectionId) {
                return `<div class="cartagrama-doc-edit-dropdown" data-doc-section="${sectionId}" hidden>
                            <div class="cartagrama-doc-edit-dropdown-inner">
                                <div class="cartagrama-doc-edit-format-row">
                                    <button type="button" class="cartagrama-doc-format-btn" data-doc-format="bold" aria-label="Bold">B</button>
                                    <button type="button" class="cartagrama-doc-format-btn" data-doc-format="italic" aria-label="Italic">I</button>
                                    <button type="button" class="cartagrama-doc-format-btn" data-doc-format="underline" aria-label="Underline">U</button>
                                    <input type="number" class="cartagrama-doc-font-size-number" min="8" max="32" step="1" value="16" aria-label="Font size px"/>
                                    <span class="cartagrama-doc-font-size-px">px</span>
                                </div>
                                <div class="cartagrama-doc-edit-control-row">
                                    <label class="cartagrama-doc-edit-label">Font</label>
                                    <select class="cartagrama-doc-font-select" aria-label="Font family">
                                        <option value="sans-serif">Sans-serif</option>
                                        <option value="serif">Serif</option>
                                        <option value="monospace">Monospace</option>
                                        <option value="Arial">Arial</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Courier New">Courier New</option>
                                    </select>
                                </div>
                            </div>
                        </div>`;
            }

            function resolveDocTabTarget(cfg, docId) {
                const path = findDocSectionPath(cfg.sections, docId);
                if (!path?.length) return { topId: docId, leafId: docId };
                const leafSec = getFirstLeafSection(path[path.length - 1]);
                return { topId: path[0].id, leafId: leafSec.id };
            }

            function buildLeafDocSection(moduleId, sec, pencilInTabs, active, asSubpanel) {
                const bodyToolbar = pencilInTabs ? '' : `
                                <div class="cartagrama-doc-section-toolbar">
                                    <button type="button" class="cartagrama-doc-edit-pencil" data-doc-section="${sec.id}" data-doc-module="${moduleId}" aria-label="Edit ${sec.label}">✏️</button>
                                </div>
                                ${buildDocEditDropdown(sec.id)}`;
                if (asSubpanel) {
                    return `
                            <div class="cartagrama-docs-subpanel${active ? ' active' : ''}" data-doc-section="${sec.id}">
                                ${bodyToolbar}
                                <div class="cartagrama-doc-edit-target" data-doc-section="${sec.id}" contenteditable="false" spellcheck="true">
                                    <h5>${sec.label}</h5>
                                    <p class="template-doc-empty">Empty text.</p>
                                </div>
                            </div>`;
                }
                return `
                            <section class="cartagrama-docs-section${active ? ' active' : ''}" data-doc-section="${sec.id}">
                                ${bodyToolbar}
                                <div class="cartagrama-doc-edit-target" data-doc-section="${sec.id}" contenteditable="false" spellcheck="true">
                                    <h5>${sec.label}</h5>
                                    <p class="template-doc-empty">Empty text.</p>
                                </div>
                            </section>`;
            }

            function buildNestedDocSectionContent(moduleId, sec, pencilInTabs, active, asSubpanel, depth) {
                const subTabs = sec.children.map((child, ci) => `
                        <button type="button" class="cartagrama-docs-subtab${active && ci === 0 ? ' active' : ''}" data-doc-tab="${child.id}">${child.label}</button>`).join('');
                const subPanels = sec.children.map((child, ci) =>
                    buildDocSectionNode(moduleId, child, pencilInTabs, active && ci === 0, depth + 1)).join('');
                const tabsClass = depth > 0 ? 'cartagrama-docs-subtabs cartagrama-docs-subtabs--depth-2' : 'cartagrama-docs-subtabs';
                if (asSubpanel) {
                    return `
                            <div class="cartagrama-docs-subpanel${active ? ' active' : ''}" data-doc-section="${sec.id}">
                                <div class="${tabsClass}" role="tablist">${subTabs}</div>
                                <div class="cartagrama-docs-subpanels">${subPanels}</div>
                            </div>`;
                }
                return `
                            <section class="cartagrama-docs-section cartagrama-docs-section--nested${active ? ' active' : ''}" data-doc-section="${sec.id}">
                                <div class="${tabsClass}" role="tablist">${subTabs}</div>
                                <div class="cartagrama-docs-subpanels">${subPanels}</div>
                            </section>`;
            }

            function buildDocSectionNode(moduleId, sec, pencilInTabs, active, depth) {
                if (sec.children) return buildNestedDocSectionContent(moduleId, sec, pencilInTabs, active, true, depth);
                return buildLeafDocSection(moduleId, sec, pencilInTabs, active, true);
            }

            function buildNestedDocSection(moduleId, sec, pencilInTabs, topActive) {
                return buildNestedDocSectionContent(moduleId, sec, pencilInTabs, topActive, false, 0);
            }

            function renderSubdocsModule(moduleId) {
                const cfg = subdocsConfig[moduleId];
                const mount = document.querySelector(`.template-subdocs-mount[data-subdocs-module="${moduleId}"]`);
                if (!cfg || !mount) return null;

                const pencilInTabs = docEditPencilInTabRow(moduleId);

                const tabsHtml = cfg.sections.map((sec, i) => {
                    const tabBtn = `<button type="button" class="cartagrama-docs-tab${i === 0 ? ' active' : ''}" data-doc-tab="${sec.id}">${sec.label}</button>`;
                    if (pencilInTabs) {
                        return `<div class="cartagrama-doc-tab-row">${tabBtn}
                            <button type="button" class="cartagrama-doc-edit-pencil" data-doc-section="${sec.id}" data-doc-module="${moduleId}" aria-label="Edit ${sec.label}">✏️</button>
                        </div>${buildDocEditDropdown(sec.id)}`;
                    }
                    return tabBtn;
                }).join('');

                const panelsHtml = cfg.sections.map((sec, i) => {
                    if (sec.children) return buildNestedDocSection(moduleId, sec, pencilInTabs, i === 0);
                    return buildLeafDocSection(moduleId, sec, pencilInTabs, i === 0, false);
                }).join('');

                mount.innerHTML = `<div id="${cfg.containerId}" class="cartagrama-docs-container" data-subdocs-module="${moduleId}">
                        <p class="cartagrama-docs-header">${cfg.header}</p>
                        <div class="cartagrama-docs-tabs" role="tablist">${tabsHtml}</div>
                        <div class="cartagrama-docs-panel">${panelsHtml}</div>
                    </div>`;

                const container = document.getElementById(cfg.containerId);
                container.querySelectorAll('.cartagrama-docs-tab, .cartagrama-docs-subtab').forEach((tab) => {
                    tab.addEventListener('click', () => {
                        const docId = tab.getAttribute('data-doc-tab');
                        const { leafId } = resolveDocTabTarget(cfg, docId);
                        if (cartagramaDocsEditorOpenFor && cartagramaDocsEditorOpenFor.section !== leafId) {
                            closeAllDocDropdowns();
                        }
                        activateDocTab(moduleId, docId);
                        if (moduleId === 'self') {
                            updateModuleBodyLabel();
                            syncTextModeBodyClasses();
                        }
                        if (moduleId === 'self' && leafId === 'voting') initAllVoteCastPages();
                        if (moduleId === 'self' && leafId === 'messages') initAllMessagesPages();
                        if (isTextWorkspaceModule() && getActiveTextSubdocsModuleId() === moduleId) {
                            syncDocsSectionToMapText();
                        }
                    });
                });

                container.querySelectorAll('.cartagrama-doc-edit-pencil').forEach((pencil) => {
                    pencil.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const docId = pencil.getAttribute('data-doc-section');
                        const modId = pencil.getAttribute('data-doc-module') || moduleId;
                        if (cartagramaDocsEditorOpenFor && cartagramaDocsEditorOpenFor.module === modId && cartagramaDocsEditorOpenFor.section === docId) {
                            closeAllDocDropdowns();
                            return;
                        }
                        closeAllDocDropdowns();
                        activateDocTab(modId, docId);
                        if (modId === 'self') {
                            if (activeModule !== 'self') setActiveModule('self');
                        } else if (modId.startsWith('geo-') && (modId.endsWith('-talk') || modId.endsWith('-info'))) {
                            const parts = modId.split('-');
                            const sub = parts.pop();
                            const teamId = parts.slice(1).join('-');
                            if (activeModule !== LOCAL_GROUPS_MODULE) setActiveModule(LOCAL_GROUPS_MODULE);
                            if (activeGeoTeamsMode !== 'info') setGeoTeamsMode('info');
                            const geoTeam = GEO_TEAMS_LIST.find((t) => t.id === teamId);
                            if (geoTeam?.countyId && geoCountySelect) {
                                activeGeoCounty = geoTeam.countyId;
                                geoCountySelect.value = geoTeam.countyId;
                                rebuildGeoMunicipalitySelect();
                            }
                            if (geoTeamSelect) geoTeamSelect.value = teamId;
                            setGeoTeam(teamId);
                            setGeoTeamSub(sub);
                        } else if (modId.startsWith('topic-') && (modId.endsWith('-talk') || modId.endsWith('-info'))) {
                            const parts = modId.split('-');
                            const sub = parts.pop();
                            const teamId = parts.slice(1).join('-');
                            if (activeModule !== COLLECTIVES_MODULE) setActiveModule(COLLECTIVES_MODULE);
                            if (topicTeamSelect) topicTeamSelect.value = teamId;
                            setTopicTeam(teamId);
                            setTopicTeamSub(sub);
                        } else if (modId === 'collectives-talk' || modId === 'collectives-info') {
                            if (activeModule !== COLLECTIVES_MODULE) setActiveModule(COLLECTIVES_MODULE);
                            if (activeCollectivesListSub !== 'complete-list') setCollectivesListSub('complete-list');
                            if (!activeTopicTeam && TOPIC_TEAMS_LIST.length) {
                                setTopicTeam(TOPIC_TEAMS_LIST[0].id);
                            }
                            if (activeTopicTeam) setTopicTeamSub(modId.replace('collectives-', ''));
                        } else if (modId === 'local-groups-talk' || modId === 'local-groups-info') {
                            if (activeModule !== LOCAL_GROUPS_MODULE) setActiveModule(LOCAL_GROUPS_MODULE);
                            setLocalGroupsOrgSub(modId.replace('local-groups-', ''));
                        } else if (activeModule !== PARTY_MODULE || getPartyContentSub() !== modId) {
                            setActiveModule(PARTY_MODULE);
                            setPartySub(modId);
                        }
                        cartagramaDocsEditorOpenFor = { module: modId, section: docId };
                        pencil.classList.add('active');
                        const sectionEl = pencil.closest('.cartagrama-docs-section');
                        const dd = sectionEl
                            ? sectionEl.querySelector('.cartagrama-doc-edit-dropdown')
                            : container.querySelector(`.cartagrama-doc-edit-dropdown[data-doc-section="${docId}"]`);
                        if (dd) dd.hidden = false;
                        syncDocsSectionToMapText();
                        const el = getMapTextEditable(modId, docId);
                        if (el) {
                            el.setAttribute('contenteditable', 'true');
                            const resolved = getResolvedDocHtml(modId, docId);
                            if (resolved) el.innerHTML = resolved;
                        }
                    });
                });

                if (cfg.mirrorPartySub) {
                    syncMirroredSubdocsFromParty(moduleId);
                }

                return container;
            }

            function getSubdocsContainer(moduleId) {
                const cfg = subdocsConfig[moduleId];
                return cfg ? document.getElementById(cfg.containerId) : null;
            }

            function getActiveTextSubdocsModuleId() {
                if (activeModule === PARTY_MODULE && activePartySub === 'partido') return activePartyInternalSub;
                if (activeModule === PARTY_MODULE && activePartySub === 'candidatura') return null;
                if (activeModule === COLLECTIVES_MODULE) {
                    if (activeTopicTeam && (activeTopicTeamSub === 'talk' || activeTopicTeamSub === 'info')) {
                        return `topic-${activeTopicTeam}-${activeTopicTeamSub}`;
                    }
                }
                if (isLocalModuleActive()) {
                    if (localGroupsWorkspace !== 'org'
                        && activeGeoTeamsMode === 'info' && activeGeoTeam
                        && (activeGeoTeamSub === 'talk' || activeGeoTeamSub === 'info')) {
                        return `geo-${activeGeoTeam}-${activeGeoTeamSub}`;
                    }
                    if (localGroupsWorkspace === 'org'
                        && (activeLocalGroupsOrgSub === 'talk' || activeLocalGroupsOrgSub === 'info')) {
                        return `local-groups-${activeLocalGroupsOrgSub}`;
                    }
                }
                if (activeModule === 'self') return 'self';
                return null;
            }

            function buildCollectiveRepRowHtml(c, formatPct) {
                const pct = typeof formatPct === 'function' ? formatPct(c.sharePct) : `${c.sharePct.toFixed(1)}%`;
                const barWidth = Math.max(c.sharePct, 1.5).toFixed(1);
                const label = getCollectiveLabel(c.id);
                const areaLabel = getTopicAreaLabels()[c.areaId] || c.areaLabel;
                return `
                    <div class="collective-rep-row">
                        <div class="collective-rep-label">
                            <button type="button" class="collective-rep-profile-link" data-collective-profile-id="${c.id}">${label}</button>
                            <span class="collective-rep-meta">${areaLabel}</span>
                        </div>
                        <div class="collective-rep-bar-track" title="${pct} of party collective weight">
                            <div class="collective-rep-bar-fill" style="width:${barWidth}%"></div>
                        </div>
                        <span class="collective-rep-pct">${pct}</span>
                    </div>`;
            }

            function openCollectiveProfile(teamId) {
                if (!teamId) return;
                if (activeModule !== COLLECTIVES_MODULE) setActiveModule(COLLECTIVES_MODULE);
                setCollectivesSection('lista');
                setCollectivesListSub('complete-list');
                setTopicTeam(teamId);
                setTopicTeamSub('info');
            }

            function buildCollectiveRepresentationHtml() {
                const formatPct = (n) => `${n.toFixed(1)}%`;
                if (activeLocale === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.buildCollectiveRepresentationHtml) {
                    return window.SINDICAPP_ES.buildCollectiveRepresentationHtml(COLLECTIVE_REPRESENTATION, formatPct, buildCollectiveRepRowHtml);
                }
                const top = COLLECTIVE_REPRESENTATION[0];
                const totalVotes = COLLECTIVE_REPRESENTATION.reduce((s, c) => s + c.militantVotes, 0);
                const rows = COLLECTIVE_REPRESENTATION.map((c) => buildCollectiveRepRowHtml(c, formatPct)).join('');
                return `
                    <div class="collective-representation-panel">
                        <h2>Collective representation in the party</h2>
                        <p class="template-muted">Each civil collective casts <strong>social votes</strong> that roll up into the party score. Collectives with more militant support and stronger social-vote totals carry more weight in coalition decisions, candidacy lists, and internal plebiscites.</p>
                        <div class="collective-representation-summary">
                            <div class="collective-representation-stat">
                                <strong>${COLLECTIVE_REPRESENTATION.length}</strong>
                                <span>Listed collectives</span>
                            </div>
                            <div class="collective-representation-stat">
                                <strong>${totalVotes.toLocaleString()}</strong>
                                <span>Demo militant votes (sum)</span>
                            </div>
                            <div class="collective-representation-stat">
                                <strong>${top ? top.label : '—'}</strong>
                                <span>Largest share (${top ? top.sharePct.toFixed(1) : '0'}%)</span>
                            </div>
                        </div>
                        <div class="collective-representation-chart" role="img" aria-label="Bar chart ranking party voting power by collective">
                            <h3>Ranking by collective</h3>
                            ${rows}
                        </div>
                        <p class="collective-representation-note"><em>Demo data:</em> weights are fictional but stable per collective. Click a name to open that collective’s profile. In production, scores follow Platform 21 rules.</p>
                    </div>`;
            }

            function buildCollectivesGeneralCoordinationHtml() {
                if (activeLocale === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.buildCollectivesGeneralCoordinationHtml) {
                    return window.SINDICAPP_ES.buildCollectivesGeneralCoordinationHtml();
                }
                const directorate = [
                    { personId: 'marina', collective: 'Seminar That Never Ends', share: 15 },
                    { personId: 'helena', collective: 'Guild of Certified Overthinkers', share: 12 },
                    { personId: 'iker', collective: 'Coalition of Mildly Concerned Bystanders', share: 11 },
                    { personId: 'pau', collective: 'Bureau of Strategic Coffee', share: 10 },
                    { personId: 'elena', collective: 'Folk Dance Emergency Response', share: 9 },
                    { personId: 'marc', collective: 'Museum of Lost Umbrellas', share: 9 },
                    { personId: 'sofia', collective: 'Peer Reviewers Anonymous', share: 8 },
                    { personId: 'joao', collective: 'Neighbors Without Borders (Very Local Chapter)', share: 8 },
                    { personId: 'lucia-v', collective: 'Union of Things That Beep at Night', share: 8 },
                    { personId: 'nadia', collective: 'Order of the Hesitant Halo', share: 10 }
                ];
                const rows = directorate.map((p, i) => `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${demoName(p.personId)}</td>
                            <td>${p.collective}</td>
                            <td>${p.share}%</td>
                        </tr>`).join('');
                return `
                    <div class="collective-representation-panel">
                        <h2>General Coordination Directorate</h2>
                        <p class="template-muted">After the Night of Seven Deadlocks, the collectives signed the <strong>Pact of Rotating Custody</strong>: no single bloc could command the party alone, and every strategic cycle would be co-authored by a mixed chamber.</p>
                        <p class="template-muted">That pact became General Coordination: a 10-seat command table where each seat carries a protected share block, each coordinator answers to their collective assembly, and legitimacy is renewed every Congress through open score tallies.</p>
                        <div class="collective-representation-summary">
                            <div class="collective-representation-stat">
                                <strong>10</strong>
                                <span>Directors</span>
                            </div>
                            <div class="collective-representation-stat">
                                <strong>Multi-collective support</strong>
                                <span>Each director can be backed by multiple coordinations</span>
                            </div>
                            <div class="collective-representation-stat">
                                <strong>100%</strong>
                                <span>Total voting share</span>
                            </div>
                        </div>
                        <div class="collective-representation-chart">
                            <h3>Current Seat Ledger</h3>
                            <p class="template-muted">Share blocks indicate strategic influence in coalition lines, candidacy order, and procedural veto windows. Directors represent weighted support coalitions, not single-collective seats.</p>
                            <table class="cp-contact-table">
                                <thead>
                                    <tr><th>#</th><th>Coordinator</th><th>Collective origin</th><th>Voting share</th></tr>
                                </thead>
                                <tbody>${rows}</tbody>
                            </table>
                        </div>
                        <p class="collective-representation-note"><em>Lore status:</em> doctrine and rituals are intentionally deferred for a future revision. This page currently focuses on director shares and coalition support structure.</p>
                    </div>`;
            }

            function syncCollectiveRepresentationWorkspace() {
                if (!mapTextDisplay) return;
                mapTextDisplay.innerHTML = buildCollectiveRepresentationHtml();
            }

            function syncCollectivesGeneralCoordinationWorkspace() {
                if (!mapTextDisplay) return;
                mapTextDisplay.innerHTML = buildCollectivesGeneralCoordinationHtml();
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
                    ''
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

            function setSelfPartySection(sectionId) {
                const adminSections = ['admin-party', 'admin-collectives', 'admin-groupings', 'admin-sindicato'];
                const allowed = [
                    'public-profile', 'account-details', 'votes-received',
                    'voting', 'messages', 'admin',
                    ...adminSections
                ];
                if (sectionId === 'admin') {
                    sectionId = adminSections.includes(activeSelfPartySection)
                        ? activeSelfPartySection
                        : 'admin-party';
                }
                activeSelfPartySection = allowed.includes(sectionId) ? sectionId : 'public-profile';
                const onAdminSection = adminSections.includes(activeSelfPartySection);
                if (selfPartyAdminNav) selfPartyAdminNav.hidden = !onAdminSection;
                selfPartySectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-self-party-section');
                    const isActive = id === 'admin'
                        ? adminSections.includes(activeSelfPartySection)
                        : id === activeSelfPartySection;
                    btn.classList.toggle('active', isActive);
                });
                activateDocTab('self', activeSelfPartySection);
                if (activeSelfPartySection === 'voting') initAllVoteCastPages();
                if (activeSelfPartySection === 'messages') initAllMessagesPages();
                syncTextModeBodyClasses();
                syncTextWorkspace();
                updateModuleBodyLabel();
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
                selfSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-self-sub');
                    btn.classList.toggle('active', id === activeSelfSub);
                });
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
                rebuildSindicatoViviendaSelects();
                applySindicatoViewSync();
            }

            function setSindicatoViviendaTerritory(territoryId) {
                if (!window.SINDICAPP_SINDICATO) return;
                const subs = activeSindicatoViviendaParent
                    ? window.SINDICAPP_SINDICATO.getSubterritoriesForParent(activeLocale, activeSindicatoViviendaParent)
                    : [];
                activeSindicatoViviendaTerritory = subs.some((s) => s.id === territoryId) ? territoryId : (subs[0]?.id || '');
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
                        viviendaTerritoryId: activeSindicatoViviendaTerritory
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
                const infoView = document.getElementById('geo-teams-view-info');
                const mapOptions = document.getElementById('geo-teams-map-view-map-options');
                if (mapView) mapView.classList.add('active');
                if (infoView) infoView.classList.remove('active');
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

            function activateGeoTeamsMapWorkspace() {
                initBoundaryControlsOnce();
                if (!mapInitialized || !currentMap) {
                    initOpenStreetMap();
                } else {
                    restoreMapWorkspaceAfterTextMode();
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

                const collectiveProfile = e.target.closest('[data-collective-profile-id]');
                if (collectiveProfile) {
                    e.preventDefault();
                    const teamId = collectiveProfile.getAttribute('data-collective-profile-id');
                    if (teamId) openCollectiveProfile(teamId);
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
                const onCollectives = activeModule === COLLECTIVES_MODULE;
                const onSindicato = activeModule === SINDICATO_MODULE;
                const onLocalGroups = isLocalModuleActive();
                const onLista = onCollectives && activeCollectivesSection === 'lista';
                const onCompleteList = onLista && activeCollectivesListSub === 'complete-list';
                const onRanking = onLista && activeCollectivesListSub === 'ranking';
                const onGeneralCoordination = onCollectives && activeCollectivesSection === 'general-coordination';
                const onPartyPartido = activeModule === PARTY_MODULE && activePartySub === 'partido';
                const onCandidacy = activeModule === PARTY_MODULE && activePartySub === 'candidatura';
                if (selfNavTree) selfNavTree.hidden = !onSelf;
                if (selfSindicatoBlock) {
                    selfSindicatoBlock.hidden = !onSelf;
                }
                if (selfPartyBlock) {
                    selfPartyBlock.hidden = true;
                }
                if (partyNavTree) partyNavTree.hidden = !onPartyPartido;
                if (candidacyNavTree) candidacyNavTree.hidden = !onCandidacy;
                if (candidacyCcaaBlock) {
                    candidacyCcaaBlock.hidden = !onCandidacy || activeCandidacySub !== 'ccaa';
                }
                if (candidacyMunicipalesBlock) {
                    candidacyMunicipalesBlock.hidden = !onCandidacy || activeCandidacySub !== 'municipales';
                }
                if (collectivesNavTree) collectivesNavTree.hidden = !onCollectives;
                if (collectivesListaSubnav) collectivesListaSubnav.hidden = !onLista;
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
                if (collectivesCompleteListBlock) {
                    collectivesCompleteListBlock.hidden = !onCompleteList;
                }
                if (collectivesRepresentationSidebar) {
                    collectivesRepresentationSidebar.hidden = !onRanking;
                }
                if (collectivesGeneralCoordinationSidebar) {
                    collectivesGeneralCoordinationSidebar.hidden = !onGeneralCoordination;
                }
                if (topicTeamsTeamSubnav) {
                    topicTeamsTeamSubnav.hidden = !onCompleteList || !activeTopicTeam;
                }
                if (localGroupsNavTree) localGroupsNavTree.hidden = !onLocalGroups;
                if (localGroupsSubnav) localGroupsSubnav.hidden = true;
                if (geoTeamsInfoBlock) {
                    geoTeamsInfoBlock.hidden = !onLocalGroups || activeGeoTeamsMode !== 'info';
                }
                if (geoTeamsTeamSubnav) {
                    geoTeamsTeamSubnav.hidden = !onLocalGroups || activeGeoTeamsMode !== 'info' || !hasActiveGeoSelection();
                }
                updateGeoInfoSidebarLayout();
                updateMapSelectedTerritoryBar();
            }

            function normalizeMapTerritoryToken(value) {
                return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
            }

            function resolveGeoTeamFromMapTerritory(layerType, territoryName) {
                if (!territoryName) return null;
                if (activeLocale === 'ie') {
                    if (layerType === 'irelandCounties') {
                        const county = IE_COUNTIES.find((c) =>
                            normalizeMapTerritoryToken(c.label) === normalizeMapTerritoryToken(territoryName)
                        );
                        if (county) {
                            return { countyId: county.id, teamId: getCountyTeamId(county.id) };
                        }
                    }
                    if (layerType === 'irelandMunicipalDistricts') {
                        const commaIdx = territoryName.indexOf(', ');
                        const leaPart = commaIdx > 0 ? territoryName.slice(0, commaIdx) : territoryName;
                        const countyPart = commaIdx > 0 ? territoryName.slice(commaIdx + 2) : '';
                        for (const county of IE_COUNTIES) {
                            if (countyPart && normalizeMapTerritoryToken(county.label) !== normalizeMapTerritoryToken(countyPart)) {
                                continue;
                            }
                            for (const district of getCountyMunicipalDistricts(county)) {
                                const shortLabel = getDistrictShortLabel(district);
                                if (
                                    normalizeMapTerritoryToken(shortLabel) === normalizeMapTerritoryToken(leaPart)
                                    || normalizeMapTerritoryToken(district.label).includes(normalizeMapTerritoryToken(leaPart))
                                ) {
                                    return { countyId: county.id, teamId: district.id };
                                }
                            }
                        }
                    }
                }
                if (activeLocale === 'es') {
                    const token = normalizeMapTerritoryToken(territoryName);
                    const censusLayers = new Set(['spainCensus', 'catCensus']);
                    if (censusLayers.has(layerType)) return null;
                    const flat = getSpainGeoTeamsFlat();
                    const byLevel = (level) => flat.find((t) =>
                        t.level === level && normalizeMapTerritoryToken(t.label) === token
                    );
                    if (layerType === 'spainCCAA' || layerType === 'cataloniaCCAA') {
                        const team = byLevel('ccaa');
                        if (team) {
                            return { ccaaId: team.ccaaId, teamId: team.id };
                        }
                    }
                    if (layerType === 'spainProvinces' || layerType === 'catProvinces') {
                        const team = byLevel('province');
                        if (team) {
                            return {
                                ccaaId: team.ccaaId,
                                provinceId: team.provinceId,
                                teamId: team.id
                            };
                        }
                    }
                    if (layerType === 'spainComarques' || layerType === 'catComarques') {
                        const team = byLevel('comarca');
                        if (team) {
                            return {
                                ccaaId: team.ccaaId,
                                provinceId: team.provinceId,
                                comarcaId: team.comarcaId,
                                teamId: team.id
                            };
                        }
                    }
                    if (layerType === 'spainMunicipalities' || layerType === 'catMunicipalities') {
                        const team = byLevel('municipality');
                        if (team) {
                            return {
                                ccaaId: team.ccaaId,
                                provinceId: team.provinceId,
                                comarcaId: team.comarcaId,
                                teamId: team.id
                            };
                        }
                    }
                    const municipality = flat.find((t) =>
                        t.level === 'municipality' && normalizeMapTerritoryToken(t.label) === token
                    );
                    if (municipality) {
                        return {
                            ccaaId: municipality.ccaaId,
                            provinceId: municipality.provinceId,
                            comarcaId: municipality.comarcaId,
                            teamId: municipality.id
                        };
                    }
                }
                return null;
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

            function navigateMapTerritoryToLocalGroups(subPage = 'info') {
                const selection = lastMapTerritorySelection;
                if (!selection?.name) return;
                if (activeModule === SINDICATO_MODULE && isSindicatoMapVisible()) {
                    navigateSindicatoMapTerritoryFromSelection(selection);
                    return;
                }
                if (activeModule !== LOCAL_GROUPS_MODULE) {
                    setActiveModule(LOCAL_GROUPS_MODULE);
                }
                setGeoTeamsMode('info');
                const match = resolveGeoTeamFromMapTerritory(selection.type, selection.name);
                if (match?.countyId) setGeoCounty(match.countyId);
                if (activeLocale === 'es') {
                    if (match?.ccaaId) setGeoCcaa(match.ccaaId);
                    if (match?.provinceId) setGeoProvince(match.provinceId);
                    if (match?.comarcaId) setGeoComarca(match.comarcaId);
                }
                if (match?.teamId) {
                    setGeoTeam(match.teamId);
                } else if (match?.countyId) {
                    setGeoTeam(getCountyTeamId(match.countyId));
                } else if (match?.comarcaId) {
                    setGeoTeam(getComarcaTeamId(match.comarcaId));
                } else if (match?.provinceId) {
                    setGeoTeam(getProvinceTeamId(match.provinceId));
                } else if (match?.ccaaId) {
                    setGeoTeam(getCcaaTeamId(match.ccaaId));
                }
                setGeoTeamSub(subPage);
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

            function updateTeamContentVisibility(prefix, teamId, activeSub) {
                const wrap = prefix === 'geo' ? geoTeamPartyWrap : topicTeamPartyWrap;
                if (!wrap || !teamId) return;
                const attr = prefix === 'geo' ? 'data-geo-team-sub-panel' : 'data-topic-team-sub-panel';
                wrap.querySelectorAll('.team-sub-panel').forEach((panel) => {
                    panel.classList.toggle('active', panel.getAttribute(attr) === activeSub);
                });
                wrap.querySelectorAll('[data-team-key]').forEach((el) => {
                    const key = el.getAttribute('data-team-key');
                    el.hidden = key !== `${prefix}-${teamId}-${activeSub}`;
                });
            }

            function isInfoTextWorkspace() {
                if (activeModule === PARTY_MODULE && activePartySub === 'partido' && activePartyInternalSub === 'info') return true;
                if (activeModule === COLLECTIVES_MODULE) {
                    if (activeTopicTeam && activeTopicTeamSub === 'info') return true;
                }
                if (isLocalModuleActive()) {
                    if (localGroupsWorkspace === 'org' && activeLocalGroupsOrgSub === 'info') return true;
                    if (localGroupsWorkspace !== 'org'
                        && activeGeoTeamsMode === 'info' && hasActiveGeoSelection() && activeGeoTeamSub === 'info') {
                        return true;
                    }
                }
                return false;
            }

            function getActiveTalkSectionId(moduleId) {
                if (!moduleId) return null;
                const isTalk = moduleId === 'talk' || moduleId.endsWith('-talk');
                if (!isTalk) return null;
                const container = getSubdocsContainer(moduleId);
                if (!container) return null;
                const activeSection = getActiveDocSectionElement(container);
                return activeSection?.getAttribute('data-doc-section') || null;
            }

            function isTalkSidebarIntroOnly() {
                if (!isTextWorkspaceModule() || isInfoTextWorkspace()) return false;
                const modId = getActiveTextSubdocsModuleId();
                const docId = getActiveTalkSectionId(modId);
                return Boolean(docId && TALK_SIDEBAR_MAP_SECTIONS.has(docId));
            }

            function getActiveSelfDocLeafId() {
                if (activeModule !== 'self') return null;
                const container = getSubdocsContainer('self');
                if (!container) return null;
                const active = getActiveDocSectionElement(container);
                if (!active) return null;
                const target = active.querySelector('.cartagrama-doc-edit-target[data-doc-section]')
                    || (active.classList.contains('cartagrama-doc-edit-target') ? active : null);
                return target?.getAttribute('data-doc-section')
                    || active.getAttribute('data-doc-section')
                    || null;
            }

            function isSelfContentInBackgroundOnly() {
                if (activeSelfSub === 'sindicato') return true;
                const leaf = getActiveSelfDocLeafId();
                return leaf === 'votes-received' || leaf === 'voting' || leaf === 'messages';
            }

            function syncTextModeBodyClasses() {
                const textOn = isTextWorkspaceModule();
                const repOn = isRankingWorkspace() || isGeneralCoordinationWorkspace() || isPartyCandidacyWorkspace();
                const sindLocationOn = isSindicatoLocationWorkspace();
                const selfSindicatoLocationOn = isSelfSindicatoLocationWorkspace();
                const sindTextOn = isSindicatoTextWorkspace();
                const sindMapSplit = isSindicatoMapSplitWorkspace();
                const sindMapOn = isSindicatoMapVisible() && !sindLocationOn && !sindMapSplit;
                document.body.classList.toggle('template-text-mode', textOn);
                document.body.classList.toggle('template-representation-workspace', repOn);
                document.body.classList.toggle('template-sindicato-text-workspace', sindTextOn);
                document.body.classList.toggle('template-sindicato-map-workspace', sindMapOn || sindMapSplit);
                document.body.classList.toggle('template-sindicato-split-workspace', sindMapSplit);
                document.body.classList.toggle('template-sindicato-location-workspace', sindLocationOn);
                document.body.classList.toggle('template-self-sindicato-location-workspace', selfSindicatoLocationOn);
                document.body.classList.toggle('template-info-sidebar-nav-only', textOn && isInfoTextWorkspace());
                document.body.classList.toggle('template-talk-sidebar-nav-only', textOn && isTalkSidebarIntroOnly());
                document.body.classList.toggle('template-self-content-sidebar-nav-only', textOn && isSelfContentInBackgroundOnly());
            }

            function clearTextModeBodyClasses() {
                document.body.classList.remove(
                    'template-text-mode',
                    'template-representation-workspace',
                    'template-sindicato-text-workspace',
                    'template-sindicato-map-workspace',
                    'template-sindicato-split-workspace',
                    'template-sindicato-location-workspace',
                    'template-self-sindicato-location-workspace',
                    'template-info-sidebar-nav-only',
                    'template-talk-sidebar-nav-only',
                    'template-self-content-sidebar-nav-only'
                );
            }

            function applyTeamTextMode() {
                syncTextModeBodyClasses();
                if (isTextWorkspaceModule()) syncDocsSectionToMapText();
                else closeAllDocDropdowns();
            }

            function setGeoTeam(teamId) {
                const resolvedId = activeLocale === 'es' ? resolveEsMunicipalityId(teamId) : teamId;
                activeGeoTeam = GEO_TEAMS_LIST.some((t) => t.id === resolvedId) ? resolvedId : '';
                if (activeLocale === 'ie' && isCountyGeoTeam(activeGeoTeam)) {
                    activeGeoCounty = activeGeoTeam.slice('county-'.length);
                }
                if (activeLocale === 'es' && activeGeoTeam) {
                    applySpainGeoPathFromTeam(activeGeoTeam);
                }
                if (geoTeamPartyWrap) geoTeamPartyWrap.hidden = !hasActiveGeoSelection();
                if (activeLocale === 'ie') {
                    if (geoCountySelect && activeGeoCounty) geoCountySelect.value = activeGeoCounty;
                    if (geoTeamSelect) geoTeamSelect.value = activeGeoTeam || '';
                } else if (activeLocale === 'es') {
                    syncSpainGeoPickerValues();
                }
                if (activeGeoTeam) {
                    const teamMeta = GEO_TEAMS_LIST.find((t) => t.id === activeGeoTeam);
                    if (teamMeta) ensureGeoTeamsRendered([teamMeta]);
                    updateTeamContentVisibility('geo', activeGeoTeam, activeGeoTeamSub);
                    if (activeGeoTeamSub === 'talk' || activeGeoTeamSub === 'info') {
                        syncMirroredSubdocsFromParty(`geo-${activeGeoTeam}-${activeGeoTeamSub}`);
                    }
                    applyTeamTextMode();
                } else {
                    syncTextModeBodyClasses();
                    closeAllDocDropdowns();
                }
                applyVisiblePanels();
                updateModuleNavTrees();
                updateGeoInfoSidebarLayout();
                updateModuleBodyLabel();
                syncTextWorkspace();
            }

            function setGeoTeamSub(subId) {
                const allowed = ['talk', 'info'];
                activeGeoTeamSub = allowed.includes(subId) ? subId : 'talk';
                geoTeamSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-geo-team-sub');
                    btn.classList.toggle('active', id === activeGeoTeamSub);
                });
                if (activeGeoTeam) {
                    updateTeamContentVisibility('geo', activeGeoTeam, activeGeoTeamSub);
                    if (activeGeoTeamSub === 'talk' || activeGeoTeamSub === 'info') {
                        syncMirroredSubdocsFromParty(`geo-${activeGeoTeam}-${activeGeoTeamSub}`);
                    }
                }
                applyTeamTextMode();
                updateModuleNavTrees();
                updateGeoInfoSidebarLayout();
                updateModuleBodyLabel();
                syncTextWorkspace();
                if (activeGeoTeamSub === 'info') {
                    requestAnimationFrame(() => initAllPeopleContactLists());
                }
            }

            function getFilteredTopicTeams() {
                if (activeTopicArea === 'all') return TOPIC_TEAMS_LIST;
                return TOPIC_TEAMS_LIST.filter((t) => t.areaId === activeTopicArea);
            }

            function rebuildTopicTeamSelect() {
                if (!topicTeamSelect) return;
                const teams = getFilteredTopicTeams();
                const prev = activeTopicTeam;
                const placeholder = getLocaleUi().selectCollective || 'Select collective…';
                topicTeamSelect.innerHTML = `<option value="">${placeholder}</option>`
                    + teams.map((t) => `<option value="${t.id}">${getCollectiveLabel(t.id)}</option>`).join('');
                if (prev && teams.some((t) => t.id === prev)) {
                    topicTeamSelect.value = prev;
                } else {
                    topicTeamSelect.value = '';
                    if (prev) setTopicTeam('');
                }
            }

            function setTopicArea(areaId) {
                const valid = areaId === 'all' || TOPIC_AREA_DEFS.some((a) => a.id === areaId);
                activeTopicArea = valid ? areaId : 'all';
                topicAreaButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-topic-area');
                    const on = id === activeTopicArea;
                    btn.classList.toggle('active', on);
                    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
                });
                rebuildTopicTeamSelect();
                updateModuleBodyLabel();
            }

            function setTopicTeam(teamId) {
                const allowed = getFilteredTopicTeams();
                activeTopicTeam = allowed.some((t) => t.id === teamId) ? teamId : '';
                if (topicTeamSelect) topicTeamSelect.value = activeTopicTeam;
                if (topicTeamPartyWrap) topicTeamPartyWrap.hidden = !activeTopicTeam;
                if (activeTopicTeam) {
                    updateTeamContentVisibility('topic', activeTopicTeam, activeTopicTeamSub);
                    applyTeamTextMode();
                } else {
                    syncTextModeBodyClasses();
                    closeAllDocDropdowns();
                }
                applyVisiblePanels();
                updateModuleNavTrees();
                updateModuleBodyLabel();
                syncTextWorkspace();
                if (activeTopicTeam && activeTopicTeamSub === 'info') {
                    requestAnimationFrame(() => initAllPeopleContactLists());
                }
            }

            function setTopicTeamSub(subId) {
                const allowed = ['talk', 'info', 'local'];
                activeTopicTeamSub = allowed.includes(subId) ? subId : 'talk';
                topicTeamSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-topic-team-sub');
                    btn.classList.toggle('active', id === activeTopicTeamSub);
                });
                if (activeTopicTeamSub === 'local') {
                    localGroupsWorkspace = activeGeoTeamsMode === 'info' ? 'info-territory' : 'map';
                    updateModuleNavTrees();
                    applyVisiblePanels();
                    syncTextModeBodyClasses();
                    syncTextWorkspace();
                    syncMapWorkspacePlaceholder();
                    updateModuleBodyLabel();
                    return;
                }
                if (activeTopicTeam) {
                    updateTeamContentVisibility('topic', activeTopicTeam, activeTopicTeamSub);
                }
                updateModuleNavTrees();
                applyVisiblePanels();
                applyTeamTextMode();
                updateModuleBodyLabel();
                syncTextWorkspace();
                if (activeTopicTeamSub === 'info') {
                    requestAnimationFrame(() => initAllPeopleContactLists());
                }
            }

            initLocaleEarly();
            syncLocaleGeoPickers();

            function renderInitialSubdocsModules() {
                Object.keys(subdocsConfig).forEach((moduleId) => {
                    if (moduleId.startsWith('geo-')) return;
                    renderSubdocsModule(moduleId);
                });
            }

            document.addEventListener('change', (e) => {
                if (!e.target.matches('[data-filter-municipality], [data-filter-collective]')) return;
                const root = e.target.closest('[data-people-contact-root]');
                if (root) applyPeopleContactListFilters(root);
            });

            const PLATFORM_RANK_LADDER_IE = {
                title: 'Platform rank ladder',
                html: `<!-- locale:ie -->
                        <p class="cp-real-content-banner" role="status">Official Platform 21 rule — not demo lore.</p>
                        <p>Each user has one <strong>divisible vote</strong> to split across people. Some ranks depend on <strong>Honor Points received</strong> from social votes (full units only; partial votes still count toward totals but may stay hidden).</p>
                        <ul class="cp-opciones-list">
                            <li><strong>1 — Visitor</strong> Browse public areas with limited participation.</li>
                            <li><strong>2 — User</strong> Registered account with standard platform access.</li>
                            <li><strong>3 — Member</strong> You pay membership dues; full participation rights inside the party and collectives you join.</li>
                            <li><strong>4 — Representative</strong> At least <strong>1 Honor Point</strong> received from social votes.</li>
                            <li><strong>5 — Professional</strong> You hold a position in the structure of the party or a collective.</li>
                            <li><strong>6 — Candidate</strong> You are a member of the party electoral list.</li>
                        </ul>
                        <p class="template-muted">Representative status can be reached with a single full Honor Point if enough voters assign you one; most people split votes, so climbing the ladder usually takes broader support.</p>`
            };

            function getPlatformRankLadderArticle() {
                if (window.SINDICAPP_IE && window.SINDICAPP_IE.PLATFORM_RANK_LADDER) {
                    return window.SINDICAPP_IE.PLATFORM_RANK_LADDER;
                }
                if (activeLocale === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.PLATFORM_RANK_LADDER) {
                    return window.SINDICAPP_ES.PLATFORM_RANK_LADDER;
                }
                return PLATFORM_RANK_LADDER_IE;
            }

            function buildPlatformRankLadderSeedHtml() {
                const pack = getLocalePack();
                if (pack && pack.buildPlatformRankLadderSeedHtml) {
                    return pack.buildPlatformRankLadderSeedHtml();
                }
                const rank = getPlatformRankLadderArticle();
                return `<h5>${rank.title}</h5>${rank.html}`;
            }

            function buildPartyWikiIndexHtml(locale) {
                const loc = locale === 'es' ? 'es' : 'ie';
                if (loc === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.buildPartyWikiIndexHtml) {
                    return window.SINDICAPP_ES.buildPartyWikiIndexHtml();
                }
                if (window.SINDICAPP_IE && window.SINDICAPP_IE.buildPartyWikiIndexHtml) {
                    return window.SINDICAPP_IE.buildPartyWikiIndexHtml();
                }
                const rulesPath = loc === 'es'
                    ? 'Wiki → Normas → Escalafón de la plataforma'
                    : 'Wiki → Rules → Platform rank ladder';
                return `<h5>Wiki</h5>
                            <p class="template-muted">Knowledge base — satirical party lore (demo). Official platform access: <strong>${rulesPath}</strong>.</p>
                            <ul class="cp-wiki-pages" data-wiki-index>
                                <li><a href="#wiki:party-history-vol-0" data-wiki-article="party-history-vol-0">Party History, Vol. 0: The Meeting That Almost Definitely Occurred</a><span class="cp-wiki-blurb">Founding myths, missing minutes, and why the coffee was always cold.</span></li>
                                <li><a href="#wiki:hq-stationery-shop" data-wiki-article="hq-stationery-shop">HQ — The Room Above the Stationery Shop</a><span class="cp-wiki-blurb">Floor plan, fire exit that opens onto ideology, and the sacred coat rack.</span></li>
                                <li><a href="#wiki:official-website" data-wiki-article="official-website">Official Website — www.we-definitely-have-a-site.party</a><span class="cp-wiki-blurb">DNS propagation pending since the prior electoral cycle.</span></li>
                                <li><a href="#wiki:brand-guidelines" data-wiki-article="brand-guidelines">Brand Guidelines for Virtue Signaling</a><span class="cp-wiki-blurb">Approved shades of Good (Pantone Hopeful), forbidden fonts of Bad.</span></li>
                                <li><a href="#wiki:coalition-matrix" data-wiki-article="coalition-matrix">Coalition Compatibility Matrix (Spoiler: Maybe)</a><span class="cp-wiki-blurb">Who we may govern with before lunch and oppose after dessert.</span></li>
                                <li><a href="#wiki:crisis-manual" data-wiki-article="crisis-manual">Crisis Manual — When the Good and Bad File Joint Lists</a><span class="cp-wiki-blurb">Press statements, blame allocation, and emergency biscuits.</span></li>
                                <li><a href="#wiki:glossary-undefined" data-wiki-article="glossary-undefined">Glossary of Terms We Refuse to Define</a><span class="cp-wiki-blurb">People, sovereignty, progress, and «the situation».</span></li>
                            </ul>`;
            }

            function buildSelfAccountDetailsSeed(locale) {
                const loc = locale === 'es' ? 'es' : 'ie';
                if (loc === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.buildSelfAccountDetailsSeed) {
                    return window.SINDICAPP_ES.buildSelfAccountDetailsSeed();
                }
                return `<!-- locale:ie -->
                    <h5>Account Details</h5>
                    <p class="template-muted">Private account settings (demo).</p>
                    <p><strong>Demo access level:</strong> User (level 2) — registered account.</p>
                    <p class="template-muted">The six-level rank ladder (official Platform 21 rule) is at <strong>Party → Info → Wiki → Rules → Platform rank ladder</strong>.</p>`;
            }

            function buildPartyIndividualScoreboardHtml() {
                const banner = getCpMilitantOnlyBanner();
                const scoreRows = [
                    ['marina', '41'],
                    ['iker', '38'],
                    ['clara', '35'],
                    ['helena', '31'],
                    ['elena', '29'],
                    ['marc', '28'],
                    ['sofia', '26'],
                    ['nadia', '24'],
                    ['tomas', '22'],
                    ['joao', '21']
                ];
                const dec = activeLocale === 'es' ? ',' : '.';
                const suffix = activeLocale === 'es' ? 'PH' : 'HP';
                const listItems = scoreRows.map(([id, pts], i) => {
                    const score = activeLocale === 'es' ? `${pts}${dec}30 ${suffix}` : `${pts}.30 ${suffix}`;
                    return `<li><span>${i + 1}. ${demoName(id)}</span><span>${score}</span></li>`;
                }).join('');
                if (activeLocale === 'es') {
                    return `<!-- locale:es -->
                    <h5>Marcador individual</h5>
                    ${banner}
                    <p class="template-muted">Personas con más Puntos de Honor recibidos en el partido (ranking demo).</p>
                    <ul class="cp-vote-list">${listItems}</ul>
                    <p class="template-muted" style="margin-top:10px;">Referencia: tu puntuación en <strong>Personal</strong> es <strong>23,76 Puntos de Honor</strong>.</p>`;
                }
                return `<!-- locale:ie -->
                    <h5>Individual Scoreboard</h5>
                    ${banner}
                    <p class="template-muted">Top individuals in the party by received Honor Points (demo ranking).</p>
                    <ul class="cp-vote-list">${listItems}</ul>
                    <p class="template-muted" style="margin-top:10px;">Reference point: your score in Self is <strong>23.76 Honor Points</strong>.</p>`;
            }

            function refreshLocaleSensitiveCopy() {
                const wikiHtml = buildPartyWikiIndexHtml(activeLocale);
                cartagramaDocEdits[docEditKey('info', 'wiki-index')] = wikiHtml;
                cartagramaDocEdits[docEditKey('info', 'platform-rank-ladder')] = buildPlatformRankLadderSeedHtml();
                delete cartagramaDocEdits[docEditKey('info', 'wiki')];
                delete cartagramaDocEdits[docEditKey('info', 'rules')];
                applyResolvedDocToModule('info');
                ['collectives-info', 'local-groups-info'].forEach((moduleId) => {
                    if (subdocsConfig[moduleId]?.mirrorPartySub) applyResolvedDocToModule(moduleId);
                });

                if (openWikiArticleSlug === 'platform-rank-ladder') {
                    openWikiArticleSlug = null;
                    wikiReturnState = null;
                    ensurePartyRankLadderView();
                    return;
                }

                if (isTextWorkspaceModule()) syncDocsSectionToMapText();
            }

            const WIKI_ARTICLES = {
                'party-history-vol-0': {
                    title: 'Party History, Vol. 0',
                    html: `<p>The founding meeting almost certainly occurred, though minutes were lost behind a radiator.</p>
                        <p>Key resolutions: adopt Good/Bad axis; defer definition of both; establish stationery supremacy.</p>`
                },
                'hq-stationery-shop': {
                    title: 'HQ — The Room Above the Stationery Shop',
                    html: `<p>Floor plan includes one window, three chairs, and a fire exit that opens onto ideology.</p>
                        <p>The sacred coat rack holds exactly twelve folding chairs and one umbrella of undecided allegiance.</p>`
                },
                'official-website': {
                    title: 'Official Website',
                    html: `<p><code>www.we-definitely-have-a-site.party</code> — DNS propagation pending since the prior electoral cycle.</p>`
                },
                'brand-guidelines': {
                    title: 'Brand Guidelines for Virtue Signaling',
                    html: `<p>Approved Good palette: Pantone Hopeful. Forbidden Bad fonts: Comic Sans (unless ironic, then mandatory).</p>`
                },
                'coalition-matrix': {
                    title: 'Coalition Compatibility Matrix',
                    html: `<p>Rows: pastries faction, yellow printer bloc, steering cell. Columns: before lunch, after dessert. Cells: maybe.</p>`
                },
                'crisis-manual': {
                    title: 'Crisis Manual',
                    html: `<p>When Good and Bad file joint lists: issue press statement, allocate blame, distribute emergency biscuits.</p>`
                },
                'glossary-undefined': {
                    title: 'Glossary of Terms We Refuse to Define',
                    html: `<p><strong>People</strong>, <strong>sovereignty</strong>, <strong>progress</strong>, and «the situation» — see also: everything else.</p>`
                }
            };

            let wikiReturnState = null;
            let openWikiArticleSlug = null;

            function getWikiArticle(slug) {
                if (activeLocale === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.WIKI_ARTICLES && window.SINDICAPP_ES.WIKI_ARTICLES[slug]) {
                    return window.SINDICAPP_ES.WIKI_ARTICLES[slug];
                }
                if (activeLocale === 'ie' && window.SINDICAPP_IE && window.SINDICAPP_IE.WIKI_ARTICLES && window.SINDICAPP_IE.WIKI_ARTICLES[slug]) {
                    return window.SINDICAPP_IE.WIKI_ARTICLES[slug];
                }
                return WIKI_ARTICLES[slug] || null;
            }

            function openWikiArticleInWorkspace(slug, returnState) {
                const article = getWikiArticle(slug);
                if (!article || !mapTextDisplay) return;
                openWikiArticleSlug = slug;
                if (returnState) wikiReturnState = returnState;
                mapTextDisplay.innerHTML = '';
                const heading = document.createElement('h2');
                heading.className = 'template-workspace-heading';
                heading.textContent = article.title;
                mapTextDisplay.appendChild(heading);
                if (wikiReturnState) {
                    const back = document.createElement('button');
                    back.type = 'button';
                    back.className = 'cp-wiki-back-btn';
                    back.textContent = `← ${wikiReturnState.label || 'Back'}`;
                    back.addEventListener('click', () => {
                        const st = wikiReturnState;
                        wikiReturnState = null;
                        openWikiArticleSlug = null;
                        if (st?.restore) st.restore();
                        else syncDocsSectionToMapText();
                    });
                    mapTextDisplay.appendChild(back);
                }
                const body = document.createElement('div');
                body.className = 'cp-wiki-article-body cp-workspace-doc-body';
                body.innerHTML = article.html;
                mapTextDisplay.appendChild(body);
            }

            function ensurePartyInfoWikiView() {
                if (activeModule !== PARTY_MODULE) setActiveModule(PARTY_MODULE);
                if (activePartySub !== 'partido' || activePartyInternalSub !== 'info') setPartySub('info');
                activateDocTab('info', 'wiki-index');
                syncTextModeBodyClasses();
            }

            function ensurePartyRankLadderView() {
                if (activeModule !== PARTY_MODULE) setActiveModule(PARTY_MODULE);
                if (activePartySub !== 'partido' || activePartyInternalSub !== 'info') setPartySub('info');
                activateDocTab('info', 'platform-rank-ladder');
                syncTextModeBodyClasses();
                syncDocsSectionToMapText();
            }

            function capturePartyWikiReturnState() {
                return {
                    label: activeLocale === 'es' ? 'Info — Wiki — Índice' : 'Info — Wiki — Index',
                    restore: () => {
                        ensurePartyInfoWikiView();
                        syncDocsSectionToMapText();
                    }
                };
            }

            function initWikiLinkDelegation() {
                if (window._pandoraWikiLinkInit) return;
                window._pandoraWikiLinkInit = true;
                document.addEventListener('click', (e) => {
                    const link = e.target.closest('a[data-wiki-article], a[href^="#wiki:"]');
                    if (!link) return;
                    const slug = link.getAttribute('data-wiki-article')
                        || (link.getAttribute('href') || '').replace(/^#wiki:/, '');
                    if (!slug) return;
                    if (slug === 'platform-rank-ladder') {
                        e.preventDefault();
                        e.stopPropagation();
                        ensurePartyRankLadderView();
                        return;
                    }
                    if (!getWikiArticle(slug)) return;
                    e.preventDefault();
                    e.stopPropagation();
                    ensurePartyInfoWikiView();
                    openWikiArticleInWorkspace(slug, capturePartyWikiReturnState());
                });
            }

            function getTalkNewsCatalog() {
                const pack = getLocalePack();
                if (pack && pack.TALK_NEWS_ARTICLES) return pack.TALK_NEWS_ARTICLES;
                if (window.SINDICAPP_IE && window.SINDICAPP_IE.TALK_NEWS_ARTICLES) return window.SINDICAPP_IE.TALK_NEWS_ARTICLES;
                return {};
            }

            function getTalkForumCatalog() {
                const pack = getLocalePack();
                if (pack && pack.TALK_FORUM_THREADS) return pack.TALK_FORUM_THREADS;
                if (window.SINDICAPP_IE && window.SINDICAPP_IE.TALK_FORUM_THREADS) return window.SINDICAPP_IE.TALK_FORUM_THREADS;
                return {};
            }

            function getTalkNewsArticle(slug) {
                return getTalkNewsCatalog()[slug] || null;
            }

            function getTalkForumThread(slug) {
                return getTalkForumCatalog()[slug] || null;
            }

            function getTalkSectionBackLabel(sectionId) {
                if (activeLocale === 'es') {
                    if (sectionId === 'news') return 'Noticias';
                    if (sectionId === 'forum') return 'Foro';
                    return 'Comunicación';
                }
                if (sectionId === 'news') return 'News';
                if (sectionId === 'forum') return 'Forum';
                return 'Talk';
            }

            function captureTalkReturnState(sectionId) {
                return {
                    label: getTalkSectionBackLabel(sectionId),
                    restore: () => syncDocsSectionToMapText()
                };
            }

            function appendTalkBackButton(returnState) {
                if (!returnState || !mapTextDisplay) return;
                const back = document.createElement('button');
                back.type = 'button';
                back.className = 'cp-wiki-back-btn';
                back.textContent = `← ${returnState.label}`;
                back.addEventListener('click', () => {
                    if (returnState.restore) returnState.restore();
                    else syncDocsSectionToMapText();
                });
                mapTextDisplay.appendChild(back);
            }

            function openTalkNewsArticleInWorkspace(slug, returnState) {
                const article = getTalkNewsArticle(slug);
                if (!article || !mapTextDisplay) return;
                openWikiArticleSlug = null;
                wikiReturnState = null;
                mapTextDisplay.innerHTML = '';
                const heading = document.createElement('h2');
                heading.className = 'template-workspace-heading';
                heading.textContent = article.title;
                mapTextDisplay.appendChild(heading);
                appendTalkBackButton(returnState);
                const dateEl = document.createElement('time');
                dateEl.className = 'cp-news-article-date';
                dateEl.dateTime = article.datetime;
                dateEl.textContent = article.dateLabel;
                mapTextDisplay.appendChild(dateEl);
                const body = document.createElement('div');
                body.className = 'cp-news-article-body cp-workspace-doc-body';
                body.innerHTML = article.body;
                mapTextDisplay.appendChild(body);
            }

            function openTalkForumThreadInWorkspace(slug, returnState) {
                const thread = getTalkForumThread(slug);
                if (!thread || !mapTextDisplay) return;
                openWikiArticleSlug = null;
                wikiReturnState = null;
                mapTextDisplay.innerHTML = '';
                const heading = document.createElement('h2');
                heading.className = 'template-workspace-heading';
                heading.textContent = thread.title;
                mapTextDisplay.appendChild(heading);
                appendTalkBackButton(returnState);
                const wrap = document.createElement('div');
                wrap.className = 'cp-forum-thread-view cp-workspace-doc-body';
                const op = document.createElement('div');
                op.className = 'cp-forum-thread-op';
                op.innerHTML = `<span class="cp-forum-thread-op-meta"><strong>${thread.author}</strong> · ${thread.authorHandle}</span>${thread.op}`;
                wrap.appendChild(op);
                if (thread.replies && thread.replies.length) {
                    const replies = document.createElement('ul');
                    replies.className = 'cp-forum-replies';
                    thread.replies.forEach((reply) => {
                        const li = document.createElement('li');
                        li.className = 'cp-forum-reply';
                        li.innerHTML = `<span class="cp-forum-reply-meta"><strong>${reply.author}</strong> · ${reply.handle} · ${reply.time}</span>${reply.html}`;
                        replies.appendChild(li);
                    });
                    wrap.appendChild(replies);
                }
                mapTextDisplay.appendChild(wrap);
            }

            function initTalkLinkDelegation() {
                if (window._pandoraTalkLinkInit) return;
                window._pandoraTalkLinkInit = true;
                document.addEventListener('click', (e) => {
                    if (!mapTextDisplay || !mapTextDisplay.contains(e.target)) return;
                    const newsLink = e.target.closest('a[data-news-article], a[href^="#news:"]');
                    if (newsLink) {
                        const slug = newsLink.getAttribute('data-news-article')
                            || (newsLink.getAttribute('href') || '').replace(/^#news:/, '');
                        if (!slug || !getTalkNewsArticle(slug)) return;
                        e.preventDefault();
                        e.stopPropagation();
                        openTalkNewsArticleInWorkspace(slug, captureTalkReturnState('news'));
                        return;
                    }
                    const forumLink = e.target.closest('a[data-forum-thread], a[href^="#forum:"]');
                    if (forumLink) {
                        const slug = forumLink.getAttribute('data-forum-thread')
                            || (forumLink.getAttribute('href') || '').replace(/^#forum:/, '');
                        if (!slug || !getTalkForumThread(slug)) return;
                        e.preventDefault();
                        e.stopPropagation();
                        openTalkForumThreadInWorkspace(slug, captureTalkReturnState('forum'));
                    }
                });
            }

            let messageThreadsRuntime = null;
            let messageThreadsRuntimeLocale = '';

            const VOTE_CAST_UI_IE = {
                remaining: 'Remaining',
                currentVote: 'Current vote',
                loading: 'Loading…',
                noVoteYet: 'No vote cast yet.',
                openEditor: 'Open editor',
                closeEditor: 'Close editor',
                modifyVotes: 'Modify, remove, or add votes',
                saveVote: 'Save vote',
                removeAll: 'Remove all',
                selectFriends: 'Select friends and assign percentages totaling 100%.',
                exceeds100: 'Total exceeds 100%. Reduce assignments.',
                voteSaved: 'Vote saved (demo).',
                now: 'Now',
                honorPoints: 'Honor Points',
                partialSuffix: 'p'
            };

            function getVoteCastUi() {
                if (activeLocale === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.voteCastUi) {
                    return window.SINDICAPP_ES.voteCastUi;
                }
                return VOTE_CAST_UI_IE;
            }

            function getVoteCastFriendNames() {
                const ids = ['clara', 'marina', 'iker', 'helena', 'pau', 'elena', 'marc', 'sofia'];
                const names = {};
                ids.forEach((id) => { names[id] = demoName(id); });
                return names;
            }

            function getCuentaPersonalSeedBundle() {
                if (activeLocale === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.cuentaPersonalSeed) {
                    return window.SINDICAPP_ES.cuentaPersonalSeed;
                }
                return CUENTA_PERSONAL_SEED_IE;
            }

            function resetMessageThreadsRuntime() {
                messageThreadsRuntime = null;
                messageThreadsRuntimeLocale = '';
            }

            function getMessageThreads() {
                const loc = activeLocale === 'es' ? 'es' : 'ie';
                if (messageThreadsRuntime && messageThreadsRuntimeLocale === loc) {
                    return messageThreadsRuntime;
                }
                const base = (loc === 'es' && window.SINDICAPP_ES && window.SINDICAPP_ES.messageThreads)
                    ? window.SINDICAPP_ES.messageThreads
                    : MESSAGE_THREADS_IE;
                messageThreadsRuntime = JSON.parse(JSON.stringify(base));
                Object.keys(messageThreadsRuntime).forEach((id) => {
                    const localized = demoName(id);
                    if (localized) messageThreadsRuntime[id].name = localized;
                });
                messageThreadsRuntimeLocale = loc;
                return messageThreadsRuntime;
            }

            function personalSeedMatchesLocale(html) {
                if (typeof html !== 'string') return false;
                const marker = activeLocale === 'es' ? 'locale:es' : 'locale:ie';
                return html.includes(`<!-- ${marker} -->`) || html.includes(`<!-- ${marker} `);
            }

            function buildSelfAdminSubmoduleSeeds() {
                const partyAdmin = getPartyAdminHtml();
                const es = activeLocale === 'es';
                const ctxIntro = (label) => es
                    ? `<p class="template-muted">Panel de administración de <strong>${label}</strong> (antes en su módulo). Gestionado desde Usuario → Admin.</p>`
                    : `<p class="template-muted"><strong>${label}</strong> administration panel (formerly in its module). Managed from Self → Admin.</p>`;
                const sindHtml = window.SINDICAPP_SINDICATO?.buildCoordinationAdminHtml
                    ? window.SINDICAPP_SINDICATO.buildCoordinationAdminHtml(activeLocale)
                    : `<p class="template-muted">${es ? 'Módulo Sindicato no cargado.' : 'Syndicate module not loaded.'}</p>`;
                return {
                    'self:admin-party': `${ctxIntro(es ? 'Partido' : 'Party')}${partyAdmin}`,
                    'self:admin-collectives': `${ctxIntro(es ? 'Colectivos' : 'Collectives')}${partyAdmin}`,
                    'self:admin-groupings': `${ctxIntro(es ? 'Agrupaciones' : 'Groupings')}${partyAdmin}`,
                    'self:admin-sindicato': sindHtml
                };
            }

            function applyPersonalModuleForLocale() {
                resetMessageThreadsRuntime();
                const seeds = getCuentaPersonalSeedBundle();
                Object.entries(seeds).forEach(([key, html]) => {
                    if (!key.startsWith('self:')) return;
                    cartagramaDocEdits[key] = html;
                });
                Object.entries(buildSelfAdminSubmoduleSeeds()).forEach(([key, html]) => {
                    cartagramaDocEdits[key] = html;
                });
                cartagramaDocEdits[docEditKey('self', 'account-details')] = buildSelfAccountDetailsSeed(activeLocale);
                const container = getSubdocsContainer('self');
                if (container) {
                    const allSelfSections = [
                        'public-profile', 'account-details', 'votes-received',
                        'voting', 'messages',
                        'admin-party', 'admin-collectives', 'admin-groupings', 'admin-sindicato'
                    ];
                    allSelfSections.forEach((sectionId) => {
                        const key = `self:${sectionId}`;
                        let html = sectionId === 'account-details'
                            ? buildSelfAccountDetailsSeed(activeLocale)
                            : (cartagramaDocEdits[key] || seeds[key]);
                        if (!html) return;
                        container.querySelectorAll(`.cartagrama-doc-edit-target[data-doc-section="${sectionId}"]`).forEach((target) => {
                            target.innerHTML = html;
                        });
                    });
                }
                document.querySelectorAll('[data-messages-page]').forEach((page) => {
                    delete page.dataset.messagesInit;
                });
                document.querySelectorAll('[data-vote-cast-page]').forEach((page) => {
                    const summaryTitle = page.querySelector('.cp-vote-cast-summary-box h6');
                    const ui = getVoteCastUi();
                    if (summaryTitle) summaryTitle.textContent = ui.currentVote;
                    const editorTitle = page.querySelector('.cp-vote-cast-editor-box h6');
                    if (editorTitle) editorTitle.textContent = ui.modifyVotes;
                    const remainingLabel = page.querySelector('[data-vote-cast-meter] > span');
                    if (remainingLabel) remainingLabel.textContent = ui.remaining;
                    const submit = page.querySelector('.cp-vote-cast-submit');
                    if (submit) submit.textContent = ui.saveVote;
                    const reset = page.querySelector('.cp-vote-cast-reset');
                    if (reset) reset.textContent = ui.removeAll;
                    const toggle = page.querySelector('[data-vote-cast-toggle]');
                    if (toggle && toggle.getAttribute('aria-expanded') !== 'true') toggle.textContent = ui.openEditor;
                });
                if (subdocsConfig.self) {
                    const selfCfg = getSelfSubdocsConfig();
                    subdocsConfig.self.header = selfCfg.header;
                    subdocsConfig.self.sections = selfCfg.sections;
                    renderSubdocsModule('self');
                }
                initAllMessagesPages();
                initAllVoteCastPages();
                if (activeModule === 'self' && isTextWorkspaceModule()) syncDocsSectionToMapText();
            }

            const MESSAGE_THREADS_IE = {
                clara: {
                    name: 'Clara Domènech',
                    preview: '50% is still a love letter',
                    messages: [
                        { from: 'them', text: 'Did you finish your vote split?', time: 'Mon 10:42' },
                        { from: 'me', text: 'Yes — 50% to you, the rest to chaos.', time: 'Mon 10:45' },
                        { from: 'them', text: '50% is still a love letter in this party.', time: 'Mon 10:46' }
                    ]
                },
                marina: {
                    name: 'Marina del Campo',
                    preview: 'Steering cell renamed again',
                    messages: [
                        { from: 'them', text: 'Can you vote for me before the steering cell meeting?', time: 'Sun 18:02' },
                        { from: 'me', text: 'Already in the draft at 20%.', time: 'Sun 18:15' },
                        { from: 'them', text: 'Perfect. Bring folding chairs.', time: 'Sun 18:16' }
                    ]
                },
                iker: {
                    name: 'Iker Montenegro',
                    preview: 'Map layer question',
                    messages: [
                        { from: 'them', text: 'Which municipality layer shows secret votes?', time: 'Sat 09:10' },
                        { from: 'me', text: 'None. That is the point.', time: 'Sat 09:22' }
                    ]
                },
                helena: {
                    name: 'Helena Votes',
                    preview: 'Vote audit thread',
                    messages: [
                        { from: 'them', text: 'Your visible list shows 7 names — forum says 42.', time: 'Fri 14:00' },
                        { from: 'me', text: '35 are secret. Welcome to Platform 21.', time: 'Fri 14:08' }
                    ]
                },
                elena: {
                    name: 'Elena Morales',
                    preview: 'Thanks for the 0.80 p',
                    messages: [
                        { from: 'them', text: 'I gave you 0.80 p — hope that helps your ladder.', time: 'Thu 11:30' },
                        { from: 'me', text: 'It does. Secret voters are another story.', time: 'Thu 11:45' }
                    ]
                },
                marc: {
                    name: 'Marc Puig',
                    preview: 'Assembly this week?',
                    messages: [
                        { from: 'them', text: 'Are you coming to the territorial assembly?', time: 'Wed 16:20' },
                        { from: 'me', text: 'If the folding chairs arrive.', time: 'Wed 16:33' }
                    ]
                },
                sofia: {
                    name: 'Sofia Andersen',
                    preview: 'Intrigue and pastries',
                    messages: [
                        { from: 'them', text: 'Coalition pastries faction wants your vote.', time: 'Tue 08:05' },
                        { from: 'me', text: 'I only vote for people, not pastries.', time: 'Tue 08:19' },
                        { from: 'them', text: 'The croissants are disappointed.', time: 'Tue 08:20' }
                    ]
                }
            };

            function renderMessagesThread(page, threadId) {
                const threads = getMessageThreads();
                const thread = threads[threadId];
                const log = page?.querySelector('[data-messages-log]');
                const header = page?.querySelector('[data-messages-chat-title]');
                if (!thread || !log) return;
                if (header) header.textContent = thread.name;
                log.innerHTML = thread.messages.map((msg) => `
                    <div class="cp-messages-bubble cp-messages-bubble--${msg.from === 'me' ? 'me' : 'them'}">
                        ${msg.text}
                        <time>${msg.time}</time>
                    </div>`).join('');
            }

            function initMessagesPage(page) {
                if (!page || page.dataset.messagesInit === '1') return;
                page.dataset.messagesInit = '1';
                const threads = getMessageThreads();
                const threadIds = Object.keys(threads);
                const ui = getVoteCastUi();
                page.querySelectorAll('[data-message-thread]').forEach((btn) => {
                    const id = btn.getAttribute('data-message-thread');
                    const nameEl = btn.querySelector('.cp-messages-thread-name');
                    if (id && threads[id] && nameEl) nameEl.textContent = threads[id].name;
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-message-thread');
                        if (!threads[id]) return;
                        page.querySelectorAll('[data-message-thread]').forEach((b) => {
                            b.classList.toggle('active', b === btn);
                        });
                        renderMessagesThread(page, id);
                    });
                });
                const first = threadIds[0];
                if (first) {
                    const firstBtn = page.querySelector(`[data-message-thread="${first}"]`);
                    if (firstBtn) firstBtn.classList.add('active');
                    renderMessagesThread(page, first);
                }
                const form = page.querySelector('[data-messages-compose]');
                const input = page.querySelector('[data-messages-input]');
                if (form && input) {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const text = input.value.trim();
                        if (!text) return;
                        const activeBtn = page.querySelector('[data-message-thread].active');
                        const id = activeBtn?.getAttribute('data-message-thread');
                        const thread = id && threads[id];
                        if (!thread) return;
                        thread.messages.push({ from: 'me', text, time: ui.now });
                        thread.preview = text.length > 40 ? `${text.slice(0, 40)}…` : text;
                        const previewEl = activeBtn?.querySelector('.cp-messages-thread-preview');
                        if (previewEl) previewEl.textContent = thread.preview;
                        input.value = '';
                        renderMessagesThread(page, id);
                    });
                }
            }

            function initAllMessagesPages() {
                document.querySelectorAll('[data-messages-page]').forEach(initMessagesPage);
            }

            const CUENTA_PERSONAL_SEED_IE = {
                'self:public-profile': `<!-- locale:ie -->
                    <h5>Public Profile</h5>
                    <p class="template-muted">What other users see on Platform 21 (demo).</p>
                    <p><strong>Display name:</strong> Demo User</p>
                    <p><strong>Bio:</strong> Militant in the Abstract Party of Principled Ambiguity. Votes only for people, never for abstractions before lunch.</p>
                    <p class="template-muted" style="margin-top:10px;">Vote totals under <strong>Voting</strong>. Rank rules: <strong>Party → Info → Wiki → Rules → Platform rank ladder</strong>.</p>`,
                'self:messages': `<!-- locale:ie -->
                    <h5>Messages</h5>
                    <p class="template-muted">Private chats with people you know on Platform 21 (demo).</p>
                    <div class="cp-messages-page" data-messages-page>
                        <div class="cp-messages-layout">
                            <aside class="cp-messages-threads">
                                <h6>Conversations</h6>
                                <ul class="cp-messages-thread-list">
                                    <li><button type="button" class="cp-messages-thread-btn" data-message-thread="clara"><span class="cp-messages-thread-name">Claire Dunne</span><span class="cp-messages-thread-preview">50% is still a love letter</span></button></li>
                                    <li><button type="button" class="cp-messages-thread-btn" data-message-thread="marina"><span class="cp-messages-thread-name">Moira Field</span><span class="cp-messages-thread-preview">Steering cell renamed again</span></button></li>
                                    <li><button type="button" class="cp-messages-thread-btn" data-message-thread="iker"><span class="cp-messages-thread-name">Connor Blackwood</span><span class="cp-messages-thread-preview">Map layer question</span></button></li>
                                    <li><button type="button" class="cp-messages-thread-btn" data-message-thread="helena"><span class="cp-messages-thread-name">Helena Votes</span><span class="cp-messages-thread-preview">Vote audit thread</span></button></li>
                                    <li><button type="button" class="cp-messages-thread-btn" data-message-thread="elena"><span class="cp-messages-thread-name">Ellen Malloy</span><span class="cp-messages-thread-preview">Thanks for the 0.80 p</span></button></li>
                                    <li><button type="button" class="cp-messages-thread-btn" data-message-thread="marc"><span class="cp-messages-thread-name">Mark Pike</span><span class="cp-messages-thread-preview">Assembly this week?</span></button></li>
                                    <li><button type="button" class="cp-messages-thread-btn" data-message-thread="sofia"><span class="cp-messages-thread-name">Sofia Andersen</span><span class="cp-messages-thread-preview">Intrigue and pastries</span></button></li>
                                </ul>
                            </aside>
                            <div class="cp-messages-chat">
                                <div class="cp-messages-chat-header" data-messages-chat-title>Claire Dunne</div>
                                <div class="cp-messages-log" data-messages-log></div>
                                <form class="cp-messages-compose" data-messages-compose>
                                    <input type="text" data-messages-input placeholder="Write a message…" autocomplete="off" />
                                    <button type="submit">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>`,
                'self:votes-received': `<!-- locale:ie -->
                    <h5>Votes Received</h5>
                    <p class="template-muted">Partial votes from individuals — visible and secret (demo).</p>
                    <p><strong>Visible</strong></p>
                    <ul class="cp-vote-list" data-votes-received-list>
                        <li><span>Ellen Malloy</span><span>0.80 p</span></li>
                        <li><span>Mark Pike</span><span>0.65 p</span></li>
                        <li><span>Sofia Andersen</span><span>0.50 p</span></li>
                        <li><span>John Foster</span><span>0.40 p</span></li>
                        <li><span>Lucy Wade</span><span>0.35 p</span></li>
                        <li><span>Tommy Reilly</span><span>0.28 p</span></li>
                        <li><span>Nadia El Amrani</span><span>0.22 p</span></li>
                    </ul>
                    <details class="cp-vote-secret-toggle">
                        <summary>Secret voters (13) — show percentages only</summary>
                        <ul class="cp-vote-secret-list">
                            <li><span>0.41 p</span></li>
                            <li><span>0.39 p</span></li>
                            <li><span>0.37 p</span></li>
                            <li><span>0.34 p</span></li>
                            <li><span>0.31 p</span></li>
                            <li><span>0.29 p</span></li>
                            <li><span>0.27 p</span></li>
                            <li><span>0.25 p</span></li>
                            <li><span>0.24 p</span></li>
                            <li><span>0.22 p</span></li>
                            <li><span>0.20 p</span></li>
                            <li><span>0.18 p</span></li>
                            <li><span>0.16 p</span></li>
                        </ul>
                    </details>
                    <div class="cp-vote-received-total"><strong>Total received:</strong> 23.76 Honor Points</div>
                    <p style="margin-top:10px;" class="template-muted"><strong>20 people</strong> voted for you · <strong>13</strong> secret · hidden entries reveal percentages only (no names)</p>`,
                'self:voting': `<!-- locale:ie -->
                    <h5>Voting</h5>
                    <p class="template-muted">Your social vote split across friends (100% total). Summary above; editor opens on demand.</p>
                    <div class="cp-vote-cast-page" data-vote-cast-page>
                        <div class="cp-vote-cast-summary-box">
                            <h6>Current vote</h6>
                            <ul class="cp-vote-list" data-vote-cast-summary hidden></ul>
                            <p class="cp-vote-cast-summary-empty" data-vote-cast-summary-empty>Loading…</p>
                        </div>
                        <button type="button" class="cp-vote-cast-open-btn" data-vote-cast-toggle aria-expanded="false">Open editor</button>
                        <div class="cp-vote-cast-editor-box" data-vote-cast-editor hidden>
                            <h6>Modify, remove, or add votes</h6>
                            <div class="cp-vote-cast-tool" data-vote-cast-root>
                                <div class="cp-vote-cast-meter" data-vote-cast-meter>
                                    <span>Remaining</span>
                                    <strong data-vote-remaining>100</strong><span>%</span>
                                </div>
                                <ul class="cp-vote-cast-friends" data-vote-cast-friends>
                                    <li data-friend-id="clara"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Claire Dunne</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="marina"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Moira Field</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="iker"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Connor Blackwood</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="helena"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Helena Votes</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="pau"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Paul Pipeworks</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="elena"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Ellen Malloy</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="marc"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Mark Pike</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="sofia"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Sofia Andersen</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                </ul>
                                <div class="cp-vote-cast-actions">
                                    <button type="button" class="cp-vote-cast-submit" disabled>Save vote</button>
                                    <button type="button" class="cp-vote-cast-reset">Remove all</button>
                                </div>
                                <p class="cp-vote-cast-status" data-vote-cast-status>Select friends and assign percentages totaling 100%.</p>
                            </div>
                        </div>
                    </div>
                    <p class="template-muted" style="margin-top:10px;">Only votes to named persons — not collectives or parties.</p>`
            };

            function applyCuentaPersonalSeedContent() {
                Object.entries(getCuentaPersonalSeedBundle()).forEach(([key, html]) => {
                    if (!key.startsWith('self:')) return;
                    const [moduleId, sectionId] = key.split(':');
                    cartagramaDocEdits[key] = html;
                    const container = getSubdocsContainer(moduleId);
                    if (!container) return;
                    container.querySelectorAll(`.cartagrama-doc-edit-target[data-doc-section="${sectionId}"]`).forEach((target) => {
                        target.innerHTML = html;
                    });
                });
            }

            function ensureSelfDocSectionsSeeded() {
                ['self:individual-voting', 'self:party-voting', 'self:votes-cast'].forEach((legacyKey) => {
                    delete cartagramaDocEdits[legacyKey];
                });
                Object.entries(getCuentaPersonalSeedBundle()).forEach(([key, html]) => {
                    if (!key.startsWith('self:')) return;
                    const sectionId = key.split(':')[1];
                    const stored = cartagramaDocEdits[key];
                    const needsSeed = typeof stored !== 'string' || !stored.trim()
                        || stored.includes('template-doc-empty');
                    const wrongLocale = typeof stored === 'string' && stored.trim() && !personalSeedMatchesLocale(stored)
                        && sectionId !== 'account-details';
                    const staleProfileCopy = sectionId === 'public-profile'
                        && stored.includes('platform-rank-ladder');
                    const staleAccountDetails = sectionId === 'account-details' && (
                        stored.includes('wiki index in the background')
                        || stored.includes('desde el índice en el espacio de fondo')
                        || stored.includes('Party → Info → Wiki</strong>')
                        || stored.includes('Partido → Info → Wiki</strong>')
                        || !stored.includes('Wiki →')
                    );
                    const staleVotingLayout = sectionId === 'voting'
                        && (stored.includes('individual-voting') || stored.includes('party-voting') || stored.includes('Party Voting'));
                    if (!needsSeed && !wrongLocale && !staleProfileCopy && !staleAccountDetails && !staleVotingLayout) return;
                    if (sectionId === 'account-details') {
                        cartagramaDocEdits[key] = buildSelfAccountDetailsSeed(activeLocale);
                    } else {
                        cartagramaDocEdits[key] = html;
                    }
                    const container = getSubdocsContainer('self');
                    if (!container) return;
                    const htmlToApply = sectionId === 'account-details'
                        ? buildSelfAccountDetailsSeed(activeLocale)
                        : html;
                    container.querySelectorAll(`.cartagrama-doc-edit-target[data-doc-section="${sectionId}"]`).forEach((target) => {
                        target.innerHTML = htmlToApply;
                    });
                });
            }

            applyCuentaPersonalSeedContent();
            refreshLocaleSensitiveCopy();
            initWikiLinkDelegation();
            initTalkLinkDelegation();

            const VOTE_CAST_STORAGE_KEY = 'sindicapp:self-vote-cast';
            const VOTE_CAST_DEMO_ALLOCATION = {
                clara: { pct: 50 },
                marina: { pct: 20 },
                iker: { pct: 15 },
                helena: { pct: 10 },
                pau: { pct: 5 }
            };

            function readVoteCastAllocation() {
                try {
                    const raw = localStorage.getItem(VOTE_CAST_STORAGE_KEY);
                    return raw ? JSON.parse(raw) : null;
                } catch (_) {
                    return null;
                }
            }

            function writeVoteCastAllocation(allocation) {
                try {
                    localStorage.setItem(VOTE_CAST_STORAGE_KEY, JSON.stringify(allocation));
                } catch (_) {}
            }

            function getVoteCastRows(tool) {
                return [...tool.querySelectorAll('.cp-vote-cast-friends li')];
            }

            function getVoteCastSum(tool) {
                return getVoteCastRows(tool).reduce((sum, row) => {
                    const check = row.querySelector('.cp-vote-cast-friend-check');
                    const pct = row.querySelector('.cp-vote-cast-pct');
                    if (!check?.checked) return sum;
                    return sum + (parseInt(pct.value, 10) || 0);
                }, 0);
            }

            function ensureVoteCastDemoSeed() {
                const saved = readVoteCastAllocation();
                if (!saved || !Object.keys(saved).length) {
                    writeVoteCastAllocation({ ...VOTE_CAST_DEMO_ALLOCATION });
                }
            }

            function getVoteCastPage(el) {
                return el?.closest('[data-vote-cast-page]') || null;
            }

            function setVoteCastEditorOpen(page, open) {
                const ui = getVoteCastUi();
                const editor = page?.querySelector('[data-vote-cast-editor]');
                const toggle = page?.querySelector('[data-vote-cast-toggle]');
                if (editor) editor.hidden = !open;
                if (toggle) {
                    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                    toggle.textContent = open ? ui.closeEditor : ui.openEditor;
                }
            }

            function renderVoteCastSummary(page) {
                if (!page) return;
                const ui = getVoteCastUi();
                const names = getVoteCastFriendNames();
                const list = page.querySelector('[data-vote-cast-summary]');
                const empty = page.querySelector('[data-vote-cast-summary-empty]');
                const allocation = readVoteCastAllocation();
                const entries = allocation
                    ? Object.entries(allocation).filter(([, v]) => v && v.pct > 0)
                    : [];
                if (!list || !empty) return;
                if (!entries.length) {
                    list.hidden = true;
                    list.innerHTML = '';
                    empty.hidden = false;
                    empty.textContent = ui.noVoteYet;
                    return;
                }
                entries.sort((a, b) => b[1].pct - a[1].pct);
                list.innerHTML = entries.map(([id, { pct }]) => {
                    const name = names[id] || id;
                    const partial = (pct / 100).toFixed(2);
                    return `<li><span>${name}</span><span>${partial} ${ui.partialSuffix} (${pct}%)</span></li>`;
                }).join('');
                list.hidden = false;
                empty.hidden = true;
            }

            function updateVoteCastMeter(tool) {
                if (!tool) return;
                const ui = getVoteCastUi();
                const sum = getVoteCastSum(tool);
                const remaining = 100 - sum;
                const remainingEl = tool.querySelector('[data-vote-remaining]');
                const meter = tool.querySelector('[data-vote-cast-meter]');
                const submit = tool.querySelector('.cp-vote-cast-submit');
                const status = tool.querySelector('[data-vote-cast-status]');
                if (remainingEl) remainingEl.textContent = String(Math.max(0, remaining));
                meter?.classList.toggle('cp-vote-cast-meter--ok', sum === 100);
                meter?.classList.toggle('cp-vote-cast-meter--over', sum > 100);
                const hasAny = getVoteCastRows(tool).some((r) => r.querySelector('.cp-vote-cast-friend-check')?.checked);
                if (submit) submit.disabled = sum !== 100 || !hasAny;
                if (status && !status.classList.contains('cp-vote-cast-status--ok')) {
                    status.textContent = sum > 100 ? ui.exceeds100 : ui.selectFriends;
                    status.className = 'cp-vote-cast-status' + (sum > 100 ? ' cp-vote-cast-status--err' : '');
                }
            }

            function loadVoteCastToolState(tool) {
                if (!tool) return;
                const saved = readVoteCastAllocation();
                getVoteCastRows(tool).forEach((row) => {
                    const id = row.getAttribute('data-friend-id');
                    const check = row.querySelector('.cp-vote-cast-friend-check');
                    const pct = row.querySelector('.cp-vote-cast-pct');
                    const entry = saved?.[id];
                    if (entry && entry.pct > 0) {
                        check.checked = true;
                        pct.disabled = false;
                        pct.value = String(entry.pct);
                    } else {
                        check.checked = false;
                        pct.disabled = true;
                        pct.value = '0';
                    }
                });
                updateVoteCastMeter(tool);
            }

            function syncAllVoteCastPagesFromStorage() {
                document.querySelectorAll('[data-vote-cast-page]').forEach((page) => {
                    renderVoteCastSummary(page);
                    const tool = page.querySelector('[data-vote-cast-root]');
                    if (tool) loadVoteCastToolState(tool);
                });
            }

            function applyVoteCastFromTool(tool) {
                const allocation = {};
                getVoteCastRows(tool).forEach((row) => {
                    const id = row.getAttribute('data-friend-id');
                    const check = row.querySelector('.cp-vote-cast-friend-check');
                    const pct = parseInt(row.querySelector('.cp-vote-cast-pct').value, 10) || 0;
                    if (check?.checked && pct > 0) allocation[id] = { pct };
                });
                writeVoteCastAllocation(allocation);
                syncAllVoteCastPagesFromStorage();
                const page = getVoteCastPage(tool);
                setVoteCastEditorOpen(page, false);
                const status = tool.querySelector('[data-vote-cast-status]');
                if (status) {
                    const ui = getVoteCastUi();
                    status.textContent = ui.voteSaved;
                    status.className = 'cp-vote-cast-status cp-vote-cast-status--ok';
                }
            }

            function initAllVoteCastPages() {
                ensureVoteCastDemoSeed();
                const friendNames = getVoteCastFriendNames();
                document.querySelectorAll('[data-vote-cast-page]').forEach((page) => {
                    page.querySelectorAll('[data-friend-id]').forEach((row) => {
                        const id = row.getAttribute('data-friend-id');
                        const label = row.querySelector('.cp-vote-cast-friend-label');
                        const check = label?.querySelector('.cp-vote-cast-friend-check');
                        if (id && friendNames[id] && label && check) {
                            label.innerHTML = '';
                            label.appendChild(check);
                            label.appendChild(document.createTextNode(` ${friendNames[id]}`));
                        }
                    });
                    renderVoteCastSummary(page);
                    const tool = page.querySelector('[data-vote-cast-root]');
                    if (tool) loadVoteCastToolState(tool);
                    setVoteCastEditorOpen(page, false);
                });
            }

            function initVoteCastToolDelegation() {
                if (window._pandoraVoteCastInit) return;
                window._pandoraVoteCastInit = true;

                document.addEventListener('change', (e) => {
                    const check = e.target.closest('.cp-vote-cast-friend-check');
                    if (!check) return;
                    const tool = check.closest('[data-vote-cast-root]');
                    const row = check.closest('li');
                    const pct = row?.querySelector('.cp-vote-cast-pct');
                    if (pct) {
                        pct.disabled = !check.checked;
                        if (!check.checked) pct.value = '0';
                    }
                    updateVoteCastMeter(tool);
                });

                document.addEventListener('input', (e) => {
                    if (!e.target.classList.contains('cp-vote-cast-pct')) return;
                    const tool = e.target.closest('[data-vote-cast-root]');
                    const row = e.target.closest('li');
                    let sumOthers = 0;
                    getVoteCastRows(tool).forEach((r) => {
                        if (r === row) return;
                        const c = r.querySelector('.cp-vote-cast-friend-check');
                        if (c?.checked) sumOthers += parseInt(r.querySelector('.cp-vote-cast-pct').value, 10) || 0;
                    });
                    const maxAllowed = Math.max(0, 100 - sumOthers);
                    let v = parseInt(e.target.value, 10) || 0;
                    if (v > maxAllowed) {
                        v = maxAllowed;
                        e.target.value = String(v);
                    }
                    if (v < 0) {
                        v = 0;
                        e.target.value = '0';
                    }
                    updateVoteCastMeter(tool);
                });

                document.addEventListener('click', (e) => {
                    const toggle = e.target.closest('[data-vote-cast-toggle]');
                    if (toggle) {
                        e.preventDefault();
                        e.stopPropagation();
                        const page = getVoteCastPage(toggle);
                        const editor = page?.querySelector('[data-vote-cast-editor]');
                        const opening = Boolean(editor?.hidden);
                        setVoteCastEditorOpen(page, opening);
                        if (opening) {
                            const tool = page?.querySelector('[data-vote-cast-root]');
                            if (tool) loadVoteCastToolState(tool);
                        }
                        return;
                    }
                    const tool = e.target.closest('[data-vote-cast-root]');
                    if (!tool) return;
                    if (e.target.classList.contains('cp-vote-cast-submit')) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (getVoteCastSum(tool) !== 100) return;
                        applyVoteCastFromTool(tool);
                    }
                    if (e.target.classList.contains('cp-vote-cast-reset')) {
                        e.preventDefault();
                        e.stopPropagation();
                        writeVoteCastAllocation({});
                        getVoteCastRows(tool).forEach((row) => {
                            row.querySelector('.cp-vote-cast-friend-check').checked = false;
                            const pct = row.querySelector('.cp-vote-cast-pct');
                            pct.value = '0';
                            pct.disabled = true;
                        });
                        updateVoteCastMeter(tool);
                        syncAllVoteCastPagesFromStorage();
                        const status = tool.querySelector('[data-vote-cast-status]');
                        if (status) {
                            status.textContent = 'All votes removed. Open editor to assign a new split.';
                            status.className = 'cp-vote-cast-status';
                        }
                    }
                });
            }

            initVoteCastToolDelegation();
            initAllVoteCastPages();

            try {
                applyPartySubmoduleSeedToStore();
                applyPartySubmoduleSeedToDom();
                relocalizeForLocale();
                applyPersonalModuleForLocale();
                applyTopicCollectiveSeedToStore();
                applyTopicCollectiveSeedToDom();
                if (activeLocale === 'ie' && IE_COUNTIES.length) {
                    setGeoCounty(activeGeoCounty || IE_COUNTIES[0].id);
                } else if (activeLocale === 'es' && activeGeoCcaa) {
                    setGeoCcaa(activeGeoCcaa);
                } else {
                    buildGeoTeamPartyWrap(true);
                }
                syncAllMirroredSubdocsFromParty();
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

            function activateDocTab(moduleId, docId) {
                const container = getSubdocsContainer(moduleId);
                const cfg = subdocsConfig[moduleId];
                if (!container || !cfg) return;
                let path = findDocSectionPath(cfg.sections, docId);
                if (!path?.length) return;
                const clicked = path[path.length - 1];
                if (clicked.children) {
                    path = findDocSectionPath(cfg.sections, getFirstLeafSection(clicked).id);
                }
                const topId = path[0].id;
                container.querySelectorAll('.cartagrama-docs-tab').forEach((tab) => {
                    tab.classList.toggle('active', tab.getAttribute('data-doc-tab') === topId);
                });
                container.querySelectorAll(':scope > .cartagrama-docs-panel > .cartagrama-docs-section').forEach((sec) => {
                    sec.classList.toggle('active', sec.getAttribute('data-doc-section') === topId);
                });
                const topSection = container.querySelector(`.cartagrama-docs-section[data-doc-section="${topId}"]`);
                if (!topSection) return;
                topSection.querySelectorAll('.cartagrama-docs-subtab').forEach((sub) => sub.classList.remove('active'));
                topSection.querySelectorAll('.cartagrama-docs-subpanel').forEach((panel) => panel.classList.remove('active'));
                for (let i = 1; i < path.length; i++) {
                    const sec = path[i];
                    const parentEl = i === 1
                        ? topSection
                        : topSection.querySelector(`.cartagrama-docs-subpanel[data-doc-section="${path[i - 1].id}"]`);
                    if (!parentEl) continue;
                    const subtab = parentEl.querySelector(`.cartagrama-docs-subtab[data-doc-tab="${sec.id}"]`);
                    if (subtab) subtab.classList.add('active');
                    const subpanel = parentEl.querySelector(`:scope > .cartagrama-docs-subpanels > .cartagrama-docs-subpanel[data-doc-section="${sec.id}"]`);
                    if (subpanel) subpanel.classList.add('active');
                }
            }

            function getActiveDocSectionElement(container) {
                const top = container.querySelector('.cartagrama-docs-section.active');
                if (!top) return container.querySelector('.cartagrama-docs-section');
                const activePanels = top.querySelectorAll('.cartagrama-docs-subpanel.active');
                if (!activePanels.length) return top;
                const deepest = activePanels[activePanels.length - 1];
                const innerLeaf = deepest.querySelector('.cartagrama-doc-edit-target')
                    ? deepest
                    : deepest.querySelector('.cartagrama-docs-subpanel.active') || deepest;
                return innerLeaf;
            }

            function getActiveDocEditTarget(container) {
                const activeSection = getActiveDocSectionElement(container);
                if (!activeSection) return null;
                if (activeSection.classList.contains('cartagrama-doc-edit-target')) {
                    return activeSection;
                }
                const direct = activeSection.querySelector(':scope > .cartagrama-doc-edit-target[data-doc-section]');
                if (direct) return direct;
                return activeSection.querySelector('.cartagrama-docs-subpanel.active .cartagrama-doc-edit-target[data-doc-section]')
                    || activeSection.querySelector('.cartagrama-doc-edit-target[data-doc-section]');
            }

            function getMapTextEditable(moduleId, docId) {
                if (!mapTextDisplay) return null;
                const mapBody = mapTextDisplay.querySelector(`[data-map-body="${docId}"]`);
                if (mapBody) return mapBody;
                return mapTextDisplay.querySelector(`.cartagrama-doc-edit-target[data-doc-section="${docId}"]`);
            }

            function getDocEditableElement(moduleId, docId) {
                const mapEl = getMapTextEditable(moduleId, docId);
                if (mapEl) return mapEl;
                const container = getSubdocsContainer(moduleId);
                return container?.querySelector(`.cartagrama-doc-edit-target[data-doc-section="${docId}"]`) || null;
            }

            function persistCurrentDocEditable() {
                if (!cartagramaDocsEditorOpenFor) return;
                const { module: modId, section: docId } = cartagramaDocsEditorOpenFor;
                const el = getDocEditableElement(modId, docId);
                if (!el) return;
                cartagramaDocEdits[docEditKey(modId, docId)] = el.innerHTML;
                if (modId === 'talk' || modId === 'info') {
                    syncAllMirroredSubdocsFromParty();
                } else if (modId.endsWith('-talk') || modId.endsWith('-info')) {
                    const cfg = subdocsConfig[modId];
                    if (cfg?.mirrorPartySub) {
                        applyResolvedDocToModule(modId);
                    }
                }
            }

            function syncDocsSectionToMapText() {
                const textModuleId = getActiveTextSubdocsModuleId();
                if (!mapTextDisplay || !textModuleId || !subdocsConfig[textModuleId]) return;
                const container = getSubdocsContainer(textModuleId);
                if (!container) return;
                wikiReturnState = null;
                persistCurrentDocEditable();
                if (textModuleId === 'self') {
                    ensureSelfDocSectionsSeeded();
                }
                const editTarget = getActiveDocEditTarget(container);
                if (!editTarget) return;
                const docId = editTarget.getAttribute('data-doc-section');
                if (!docId) return;
                const cfg = subdocsConfig[textModuleId];
                const resolved = getResolvedDocHtml(textModuleId, docId);
                if (resolved && resolved.trim()) {
                    editTarget.innerHTML = resolved;
                }
                const heading = document.createElement('h2');
                heading.className = 'template-workspace-heading';
                const sectionLabel = (editTarget.querySelector('h5') || {}).textContent?.trim() || docId;
                heading.textContent = cfg ? `${cfg.header} — ${sectionLabel}` : sectionLabel;
                mapTextDisplay.innerHTML = '';
                mapTextDisplay.appendChild(heading);

                const mapBody = editTarget.querySelector(`[data-map-body="${docId}"]`);
                if (mapBody) {
                    const box = document.createElement('div');
                    box.className = 'cp-workspace-bg-box';
                    const bodyClone = mapBody.cloneNode(true);
                    bodyClone.removeAttribute('hidden');
                    bodyClone.removeAttribute('aria-hidden');
                    bodyClone.classList.add('template-map-text-doc-section');
                    box.appendChild(bodyClone);
                    mapTextDisplay.appendChild(box);
                } else {
                    const body = document.createElement('div');
                    body.className = 'template-map-text-doc-section cp-workspace-doc-body';
                    body.setAttribute('data-doc-section', docId);
                    body.innerHTML = editTarget.innerHTML;
                    mapTextDisplay.appendChild(body);
                }
                if (textModuleId === 'self' && docId === 'voting') {
                    initAllVoteCastPages();
                }
                if (textModuleId === 'self' && docId === 'messages') {
                    initAllMessagesPages();
                }
                if (docId === 'contact-list') {
                    requestAnimationFrame(() => initAllPeopleContactLists());
                }
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
                if (activeModule === SINDICATO_MODULE && isSindicatoMapSplitWorkspace()) {
                    syncSindicatoWorkspace();
                    return;
                }
                if (activeModule === SINDICATO_MODULE && isSindicatoTextWorkspace()) {
                    syncSindicatoWorkspace();
                    return;
                }
                if (activeModule === PARTY_MODULE && isPartyCandidacyWorkspace()) {
                    syncPartyCandidacyWorkspace();
                    return;
                }
                if (activeModule === COLLECTIVES_MODULE && isRankingWorkspace()) {
                    syncCollectiveRepresentationWorkspace();
                    return;
                }
                if (activeModule === COLLECTIVES_MODULE && isGeneralCoordinationWorkspace()) {
                    syncCollectivesGeneralCoordinationWorkspace();
                    return;
                }
                if (isTextWorkspaceModule()) {
                    syncDocsSectionToMapText();
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
                if (activeModule === COLLECTIVES_MODULE) {
                    if (isRankingWorkspace()) return 'collectives-representation';
                    if (isGeneralCoordinationWorkspace()) return 'collectives-general-coordination';
                    if (activeTopicTeamSub === 'local' && activeTopicTeam) return 'geo-teams';
                    if (activeTopicTeam) return 'topic-teams';
                    return null;
                }
                if (activeModule === PARTY_MODULE && isPartyAgrupacionesActive()) {
                    return 'geo-teams';
                }
                if (activeModule === LOCAL_GROUPS_MODULE) {
                    if (localGroupsWorkspace === 'map' || localGroupsWorkspace === 'info-territory') {
                        return 'geo-teams';
                    }
                    return `local-groups-${activeLocalGroupsOrgSub}`;
                }
                if (activeModule === PARTY_MODULE) {
                    const contentSub = getPartyContentSub();
                    if (contentSub === 'candidatura') return null;
                    return contentSub;
                }
                if (activeModule === SINDICATO_MODULE) {
                    if (isSindicatoMapVisible()) return 'geo-teams';
                    if (!activeSindicatoSub) return null;
                    return 'sindicato';
                }
                return activeModule;
            }

            function isTextWorkspaceModule() {
                if (activeModule === 'self') {
                    if (activeSelfSub === 'sindicato') return !isSelfSindicatoLocationWorkspace();
                    return activeSelfSub === 'partido';
                }
                if (activeModule === PARTY_MODULE) {
                    if (activePartySub === 'candidatura') return false;
                    if (isPartyAgrupacionesActive()) {
                        if (activeGeoTeamsMode === 'info' && activeGeoTeam) {
                            return activeGeoTeamSub === 'talk' || activeGeoTeamSub === 'info';
                        }
                        return false;
                    }
                    if (activePartySub === 'partido') {
                        return TEXT_SUBDOCS_MODULES.includes(activePartyInternalSub);
                    }
                    return false;
                }
                if (activeModule === COLLECTIVES_MODULE) {
                    if (isRankingWorkspace() || isGeneralCoordinationWorkspace()) return false;
                    if (activeTopicTeamSub === 'local' && activeTopicTeam) {
                        return activeGeoTeamsMode === 'info' && (activeGeoTeamSub === 'talk' || activeGeoTeamSub === 'info');
                    }
                    if (activeTopicTeam) {
                        return activeTopicTeamSub === 'talk' || activeTopicTeamSub === 'info';
                    }
                    return false;
                }
                if (activeModule === LOCAL_GROUPS_MODULE) {
                    if (localGroupsWorkspace === 'org') {
                        return activeLocalGroupsOrgSub === 'talk' || activeLocalGroupsOrgSub === 'info';
                    }
                    if (activeGeoTeamsMode === 'info' && hasActiveGeoSelection()) {
                        return activeGeoTeamSub === 'talk' || activeGeoTeamSub === 'info';
                    }
                }
                return false;
            }

            function isGeoTeamsMapWorkspace() {
                return isLocalModuleActive() && localGroupsWorkspace === 'map';
            }

            function isOpenStreetMapEligible() {
                return isGeoTeamsMapWorkspace() || isSindicatoMapVisible() || !activeModule;
            }

            function isRankingWorkspace() {
                return activeModule === COLLECTIVES_MODULE
                    && activeCollectivesSection === 'lista'
                    && activeCollectivesListSub === 'ranking';
            }

            function isGeneralCoordinationWorkspace() {
                return activeModule === COLLECTIVES_MODULE && activeCollectivesSection === 'general-coordination';
            }

            function syncMapWorkspacePlaceholder() {
                if (isSindicatoMapVisible() || isRankingWorkspace() || isGeneralCoordinationWorkspace() || isPartyCandidacyWorkspace() || isTextWorkspaceModule()) return;
                const root = document.getElementById('map-provider-root');
                if (!root || root.querySelector('.leaflet-container')) return;
                if (!activeModule) return;
                const ui = getLocaleUi();
                if (isGeoTeamsMapWorkspace() || isSindicatoMapVisible()) {
                    setMapPlaceholder(ui.mapPlaceholder || 'Click OpenStreetMap to load the map.');
                } else {
                    setMapPlaceholder(ui.welcome || 'Welcome to SindicApp');
                }
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
                if (isLocalModuleActive()) {
                    if (localGroupsWorkspace === 'map') {
                        title = labels.map || 'Map';
                    } else if (localGroupsWorkspace === 'info-territory') {
                        if (activeGeoTeam) {
                            const team = GEO_TEAMS_LIST.find((m) => m.id === activeGeoTeam);
                            const sub = labels[activeGeoTeamSub] || activeGeoTeamSub;
                            if (team?.level === 'county' || team?.level === 'ccaa' || team?.level === 'province' || team?.level === 'comarca') {
                                title = `${team.label} — ${sub}`;
                            } else if (team) {
                                const districtName = team.shortLabel || getDistrictShortLabel({ label: team.label });
                                const parent = team.comarcaLabel || team.countyLabel || team.provinceLabel;
                                title = parent
                                    ? `${parent} · ${districtName} — ${sub}`
                                    : `${districtName} — ${sub}`;
                            } else {
                                title = sub;
                            }
                        } else {
                            title = getLocaleUi().infoLocalGroupsTitle;
                        }
                    } else {
                        title = labels[activeLocalGroupsOrgSub] || activeLocalGroupsOrgSub;
                    }
                } else if (activeModule === COLLECTIVES_MODULE) {
                    if (isGeneralCoordinationWorkspace()) {
                        title = labels['general-coordination'] || 'General Coordination';
                    } else if (isRankingWorkspace()) {
                        title = labels.ranking || labels['collectives-scoreboard'] || 'Ranking';
                    } else if (activeTopicTeamSub === 'local' && activeTopicTeam) {
                        title = 'Local';
                    } else if (activeTopicTeam && activeTopicTeamSub) {
                        const team = TOPIC_TEAMS_LIST.find((t) => t.id === activeTopicTeam);
                        const sub = labels[activeTopicTeamSub] || activeTopicTeamSub;
                        title = team ? `${team.label} — ${sub}` : sub;
                    } else if (activeTopicArea !== 'all') {
                        const listLabel = labels.lista || 'List';
                        const subLabel = getTopicAreaLabels()[activeTopicArea] || labels['complete-list'] || 'Complete List';
                        title = `${listLabel} — ${subLabel}`;
                    } else {
                        const listLabel = labels.lista || 'List';
                        const subLabel = labels['complete-list'] || 'Complete List';
                        title = `${listLabel} — ${subLabel}`;
                    }
                } else if (activeModule === PARTY_MODULE) {
                    if (activePartySub === 'candidatura') {
                        const subKey = `candidacy-${activeCandidacySub}`;
                        title = labels[subKey] || labels.candidatura || labels.candidacy || 'Candidacy';
                    } else if (isPartyAgrupacionesActive()) {
                        title = labels.agrupaciones || labels.local || 'Groupings';
                    } else {
                        title = labels.partido || labels.party || 'Party';
                        if (activePartyInternalSub && activePartyInternalSub !== 'talk') {
                            const sub = labels[activePartyInternalSub] || activePartyInternalSub;
                            title = `${title} — ${sub}`;
                        }
                    }
                } else if (activeModule === SINDICATO_MODULE) {
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
                    } else {
                        const sectionLabels = {
                            'public-profile': s.publicProfile,
                            'account-details': s.accountDetails,
                            'votes-received': s.votesReceived,
                            voting: s.voting,
                            messages: s.messages,
                            'admin-party': s.adminParty,
                            'admin-collectives': s.adminCollectives,
                            'admin-groupings': s.adminGroupings,
                            'admin-sindicato': s.adminSindicato
                        };
                        title = sectionLabels[activeSelfPartySection]
                            || activeSelfPartySection
                            || s.header
                            || 'Self';
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

            function setGeoTeamsMode(mode) {
                if (activeModule === SINDICATO_MODULE && isSindicatoMapVisible()) {
                    if (mode === 'info' && lastMapTerritorySelection?.name) {
                        navigateSindicatoMapTerritoryFromSelection(lastMapTerritorySelection);
                    }
                    ensureSindicatoMapPanelVisible();
                    return;
                }
                activeGeoTeamsMode = mode === 'info' ? 'info' : 'map';
                localGroupsWorkspace = activeGeoTeamsMode === 'info' ? 'info-territory' : 'map';
                geoTeamsModeButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-geo-teams-mode');
                    btn.classList.toggle('active', id === activeGeoTeamsMode);
                });
                geoTeamsViewPanels.forEach((panel) => {
                    const show = panel.id === `geo-teams-view-${activeGeoTeamsMode}`;
                    panel.classList.toggle('active', show);
                });
                if (activeGeoTeamsMode !== 'info') {
                    clearTextModeBodyClasses();
                    closeAllDocDropdowns();
                } else if (activeGeoTeam) {
                    applyTeamTextMode();
                }
                updateModuleNavTrees();
                applyVisiblePanels();
                if (activeGeoTeamsMode === 'map') {
                    activateGeoTeamsMapWorkspace();
                }
                updateModuleBodyLabel();
                updateMapSelectedTerritoryBar();
                syncTextWorkspace();
                syncMapWorkspacePlaceholder();
            }

            function setCollectivesSection(sectionId) {
                const allowed = ['lista', 'general-coordination'];
                activeCollectivesSection = allowed.includes(sectionId) ? sectionId : 'lista';
                collectivesSectionButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-collectives-section');
                    btn.classList.toggle('active', id === activeCollectivesSection);
                });
                if (activeCollectivesSection === 'general-coordination' && activeTopicTeam) {
                    setTopicTeam('');
                    closeAllDocDropdowns();
                }
                updateModuleNavTrees();
                applyVisiblePanels();
                syncTextModeBodyClasses();
                syncTextWorkspace();
                if (!isRankingWorkspace() && !isGeneralCoordinationWorkspace()) {
                    syncMapWorkspacePlaceholder();
                }
                updateModuleBodyLabel();
            }

            function setCollectivesListSub(subId) {
                if (activeCollectivesSection !== 'lista') {
                    activeCollectivesSection = 'lista';
                    collectivesSectionButtons.forEach((btn) => {
                        const id = btn.getAttribute('data-collectives-section');
                        btn.classList.toggle('active', id === activeCollectivesSection);
                    });
                }
                activeCollectivesListSub = subId === 'ranking' ? 'ranking' : 'complete-list';
                collectivesListSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-collectives-list-sub');
                    btn.classList.toggle('active', id === activeCollectivesListSub);
                });
                if (activeCollectivesListSub === 'ranking' && activeTopicTeam) {
                    setTopicTeam('');
                    closeAllDocDropdowns();
                }
                updateModuleNavTrees();
                applyVisiblePanels();
                syncTextModeBodyClasses();
                syncTextWorkspace();
                if (!isRankingWorkspace() && !isGeneralCoordinationWorkspace()) {
                    syncMapWorkspacePlaceholder();
                }
                updateModuleBodyLabel();
            }

            function setCollectivesOrgSub(subId) {
                const allowed = ['talk', 'info'];
                activeCollectivesOrgSub = allowed.includes(subId) ? subId : 'talk';
                collectivesOrgSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-collectives-org-sub');
                    btn.classList.toggle('active', id === activeCollectivesOrgSub);
                });
                updateModuleNavTrees();
                applyVisiblePanels();
                syncTextModeBodyClasses();
                if (activeCollectivesOrgSub === 'talk' || activeCollectivesOrgSub === 'info') {
                    syncMirroredSubdocsFromParty(`collectives-${activeCollectivesOrgSub}`);
                    if (isTextWorkspaceModule()) syncDocsSectionToMapText();
                    else closeAllDocDropdowns();
                }
                updateModuleBodyLabel();
                syncTextWorkspace();
            }

            function setLocalGroupsOrgSub(subId) {
                const allowed = ['talk', 'info'];
                activeLocalGroupsOrgSub = allowed.includes(subId) ? subId : 'talk';
                localGroupsOrgSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-local-groups-org-sub');
                    btn.classList.toggle('active', id === activeLocalGroupsOrgSub);
                });
                localGroupsWorkspace = 'org';
                updateModuleNavTrees();
                applyVisiblePanels();
                syncTextModeBodyClasses();
                if (activeLocalGroupsOrgSub === 'talk' || activeLocalGroupsOrgSub === 'info') {
                    syncMirroredSubdocsFromParty(`local-groups-${activeLocalGroupsOrgSub}`);
                    if (isTextWorkspaceModule()) syncDocsSectionToMapText();
                    else closeAllDocDropdowns();
                }
                updateModuleBodyLabel();
                syncTextWorkspace();
                syncMapWorkspacePlaceholder();
            }

            function isPartyAgrupacionesActive() {
                return activePartySub === 'agrupaciones' || activePartySub === 'local';
            }

            function isPartyCandidacyWorkspace() {
                return activeModule === PARTY_MODULE && activePartySub === 'candidatura';
            }

            function getPartyContentSub() {
                if (activePartySub === 'partido') return activePartyInternalSub;
                if (activePartySub === 'candidatura') return 'candidatura';
                if (isPartyAgrupacionesActive()) return 'local';
                return activePartySub;
            }

            function updateModulePickerActiveStates(activeNav) {
                if (!templateModulePicker) return;
                templateModulePicker.querySelectorAll('[data-module], [data-org-nav]').forEach((btn) => {
                    const mod = btn.getAttribute('data-module');
                    const org = btn.getAttribute('data-org-nav');
                    let on = false;
                    if (mod === 'self') on = activeModule === 'self';
                    else if (mod === 'sindicato') on = activeModule === SINDICATO_MODULE;
                    else if (org === 'colectivos') on = activeModule === COLLECTIVES_MODULE;
                    else if (org && activeModule === PARTY_MODULE) {
                        if (activePartySub === 'candidatura') on = org === 'candidatura';
                        else if (isPartyAgrupacionesActive()) on = org === 'agrupaciones';
                        else on = org === 'partido';
                    }
                    if (activeNav) {
                        if (activeNav === 'colectivos') on = org === 'colectivos';
                        else if (org) on = org === activeNav;
                    }
                    btn.classList.toggle('active', on);
                });
            }

            function getCandidacyTerritoryLabel(teamId, level) {
                if (!teamId) return '';
                const team = GEO_TEAMS_LIST.find((t) => t.id === teamId && t.level === level);
                return team ? team.label : '';
            }

            function rebuildCandidacyTerritorySelects() {
                const ui = getLocaleUi();
                const ccaaLevel = activeLocale === 'ie' ? 'county' : 'ccaa';
                const muniLevel = activeLocale === 'ie' ? 'district' : 'municipality';
                const ccaaTeams = GEO_TEAMS_LIST.filter((t) => t.level === ccaaLevel);
                const muniTeams = GEO_TEAMS_LIST.filter((t) => t.level === muniLevel);
                if (candidacyCcaaSelect) {
                    const placeholder = ui.candidacyCcaaSelect || 'Select…';
                    candidacyCcaaSelect.innerHTML = `<option value="">${placeholder}</option>`
                        + ccaaTeams.map((t) => `<option value="${t.id}">${t.label}</option>`).join('');
                    if (!ccaaTeams.some((t) => t.id === activeCandidacyCcaa)) {
                        activeCandidacyCcaa = ccaaTeams[0] ? ccaaTeams[0].id : '';
                    }
                    candidacyCcaaSelect.value = activeCandidacyCcaa;
                }
                if (candidacyMunicipalitySelect) {
                    const placeholder = ui.candidacyMunicipalesSelect || 'Select…';
                    candidacyMunicipalitySelect.innerHTML = `<option value="">${placeholder}</option>`
                        + muniTeams.map((t) => `<option value="${t.id}">${t.label}</option>`).join('');
                    if (!muniTeams.some((t) => t.id === activeCandidacyMunicipality)) {
                        activeCandidacyMunicipality = muniTeams[0] ? muniTeams[0].id : '';
                    }
                    candidacyMunicipalitySelect.value = activeCandidacyMunicipality;
                }
            }

            function getCandidacyWorkspaceOpts() {
                const ccaaLevel = activeLocale === 'ie' ? 'county' : 'ccaa';
                const muniLevel = activeLocale === 'ie' ? 'district' : 'municipality';
                if (activeCandidacySub === 'ccaa') {
                    return {
                        scope: 'ccaa',
                        territoryLabel: getCandidacyTerritoryLabel(activeCandidacyCcaa, ccaaLevel)
                    };
                }
                if (activeCandidacySub === 'municipales') {
                    return {
                        scope: 'municipales',
                        territoryLabel: getCandidacyTerritoryLabel(activeCandidacyMunicipality, muniLevel)
                    };
                }
                return { scope: 'congreso' };
            }

            function syncPartyCandidacyWorkspace() {
                if (!mapTextDisplay) return;
                const opts = getCandidacyWorkspaceOpts();
                let html = '';
                if (activeLocale === 'es' && window.SINDICAPP_ES && typeof window.SINDICAPP_ES.buildPartyCandidacyHtml === 'function') {
                    html = window.SINDICAPP_ES.buildPartyCandidacyHtml(opts);
                } else if (window.SINDICAPP_IE && typeof window.SINDICAPP_IE.buildPartyCandidacyHtml === 'function') {
                    html = window.SINDICAPP_IE.buildPartyCandidacyHtml(opts);
                } else {
                    html = buildPartyCandidacyHtml(opts);
                }
                mapTextDisplay.innerHTML = html || '<p class="template-muted">Candidacy content unavailable.</p>';
            }

            function setCandidacySub(subId) {
                const allowed = ['congreso', 'ccaa', 'municipales'];
                activeCandidacySub = allowed.includes(subId) ? subId : 'congreso';
                candidacySubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-candidacy-sub');
                    btn.classList.toggle('active', id === activeCandidacySub);
                });
                updateModuleNavTrees();
                syncPartyCandidacyWorkspace();
                updateModuleBodyLabel();
            }

            function updatePartyInternalSubButtons() {
                partyInternalSubButtons.forEach((btn) => {
                    const id = btn.getAttribute('data-party-internal-sub');
                    btn.classList.toggle('active', id === activePartyInternalSub);
                });
            }

            function setPartySub(subId) {
                if (subId === 'local') subId = 'agrupaciones';
                if (subId === 'candidacy') subId = 'candidatura';
                if (subId === 'admin') subId = 'talk';
                if (subId === 'talk' || subId === 'info') {
                    activePartySub = 'partido';
                    activePartyInternalSub = subId;
                    updateModulePickerActiveStates('partido');
                    updatePartyInternalSubButtons();
                } else if (subId === 'partido') {
                    activePartySub = 'partido';
                    activePartyInternalSub = activePartyInternalSub || 'talk';
                    updateModulePickerActiveStates('partido');
                    updatePartyInternalSubButtons();
                } else if (subId === 'candidatura') {
                    activePartySub = 'candidatura';
                    rebuildCandidacyTerritorySelects();
                    setCandidacySub(activeCandidacySub || 'congreso');
                    updateModulePickerActiveStates('candidatura');
                } else if (subId === 'agrupaciones') {
                    activePartySub = 'agrupaciones';
                    updateModulePickerActiveStates('agrupaciones');
                } else {
                    activePartySub = 'partido';
                    activePartyInternalSub = 'talk';
                    updateModulePickerActiveStates('partido');
                    updatePartyInternalSubButtons();
                }
                updateModuleNavTrees();
                if (isPartyAgrupacionesActive()) {
                    setGeoTeamsMode('map');
                    return;
                }
                applyVisiblePanels();
                syncTextModeBodyClasses();
                if (activePartySub === 'candidatura') {
                    closeAllDocDropdowns();
                    syncTextWorkspace();
                } else if (isTextWorkspaceModule()) {
                    syncDocsSectionToMapText();
                } else {
                    closeAllDocDropdowns();
                }
                const contentSub = getPartyContentSub();
                if (contentSub === 'talk' || contentSub === 'info') {
                    syncAllMirroredSubdocsFromParty();
                }
                syncMapWorkspacePlaceholder();
                updateModuleBodyLabel();
            }

            geoTeamsModeButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (!isLocalModuleActive() && !isSindicatoMapVisible()) {
                        if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                        setSindicatoSub('map');
                    }
                    setGeoTeamsMode(btn.getAttribute('data-geo-teams-mode'));
                });
            });

            if (mapSelectedTerritoryInfoBtn) {
                mapSelectedTerritoryInfoBtn.addEventListener('click', () => navigateMapTerritoryToLocalGroups('info'));
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
                        navigateMapTerritoryToLocalGroups('info');
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

            localGroupsOrgSubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== LOCAL_GROUPS_MODULE) setActiveModule(LOCAL_GROUPS_MODULE);
                    setLocalGroupsOrgSub(btn.getAttribute('data-local-groups-org-sub'));
                });
            });

            if (templateModulePicker) {
                templateModulePicker.addEventListener('click', (e) => {
                    const btn = e.target.closest('.template-module-btn[data-module], .template-module-btn[data-org-nav]');
                    if (!btn || !templateModulePicker.contains(btn)) return;
                    const mod = btn.getAttribute('data-module');
                    const org = btn.getAttribute('data-org-nav');
                    if (mod) {
                        setActiveModule(mod);
                        return;
                    }
                    if (org === 'colectivos' || org) {
                        return;
                    }
                });
            }

            if (geoCountySelect) {
                geoCountySelect.addEventListener('change', () => {
                    if (!isLocalModuleActive()) {
                        if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                        setSindicatoSub('map');
                    }
                    if (activeGeoTeamsMode !== 'info') setGeoTeamsMode('info');
                    setGeoCounty(geoCountySelect.value || '');
                });
            }

            function wireSpainGeoPicker(selectEl, setter) {
                if (!selectEl) return;
                selectEl.addEventListener('change', () => {
                    if (isSindicatoMapVisible()) return;
                    if (!isLocalModuleActive()) {
                        if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                        setSindicatoSub('map');
                    }
                    if (activeGeoTeamsMode !== 'info') setGeoTeamsMode('info');
                    setter(selectEl.value || '');
                });
            }
            wireSpainGeoPicker(geoCcaaSelect, setGeoCcaa);
            wireSpainGeoPicker(geoProvinceSelect, setGeoProvince);
            wireSpainGeoPicker(geoComarcaSelect, setGeoComarca);

            if (geoTeamSelect) {
                geoTeamSelect.addEventListener('change', () => {
                    if (isSindicatoMapVisible()) return;
                    if (!isLocalModuleActive()) {
                        if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                        setSindicatoSub('map');
                    }
                    if (activeGeoTeamsMode !== 'info') setGeoTeamsMode('info');
                    setGeoTeam(geoTeamSelect.value || '');
                });
            }

            if (topicTeamSelect) {
                rebuildTopicTeamSelect();
                topicTeamSelect.addEventListener('change', () => {
                    if (activeModule !== COLLECTIVES_MODULE) setActiveModule(COLLECTIVES_MODULE);
                    if (activeCollectivesListSub !== 'complete-list') setCollectivesListSub('complete-list');
                    setTopicTeam(topicTeamSelect.value);
                });
            }

            topicAreaButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== COLLECTIVES_MODULE) setActiveModule(COLLECTIVES_MODULE);
                    if (activeCollectivesListSub !== 'complete-list') setCollectivesListSub('complete-list');
                    setTopicArea(btn.getAttribute('data-topic-area'));
                });
            });

            selfSubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== 'self') setActiveModule('self');
                    setSelfSub(btn.getAttribute('data-self-sub'));
                });
            });

            selfPartySectionButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== 'self') setActiveModule('self');
                    if (activeSelfSub !== 'partido') setSelfSub('partido');
                    setSelfPartySection(btn.getAttribute('data-self-party-section'));
                });
            });

            selfSindicatoSectionButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== 'self') setActiveModule('self');
                    if (activeSelfSub !== 'sindicato') setSelfSub('sindicato');
                    setSelfSindicatoSection(btn.getAttribute('data-self-sindicato-section'));
                });
            });

            candidacySubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const subId = btn.getAttribute('data-candidacy-sub');
                    activeCandidacySub = subId || 'congreso';
                    if (activeModule !== PARTY_MODULE) setActiveModule(PARTY_MODULE);
                    if (activePartySub !== 'candidatura') setPartySub('candidatura');
                    else setCandidacySub(subId);
                });
            });

            if (candidacyCcaaSelect) {
                candidacyCcaaSelect.addEventListener('change', () => {
                    activeCandidacyCcaa = candidacyCcaaSelect.value;
                    if (isPartyCandidacyWorkspace() && activeCandidacySub === 'ccaa') {
                        syncPartyCandidacyWorkspace();
                        updateModuleBodyLabel();
                    }
                });
            }

            if (candidacyMunicipalitySelect) {
                candidacyMunicipalitySelect.addEventListener('change', () => {
                    activeCandidacyMunicipality = candidacyMunicipalitySelect.value;
                    if (isPartyCandidacyWorkspace() && activeCandidacySub === 'municipales') {
                        syncPartyCandidacyWorkspace();
                        updateModuleBodyLabel();
                    }
                });
            }

            collectivesSectionButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== COLLECTIVES_MODULE) setActiveModule(COLLECTIVES_MODULE);
                    setCollectivesSection(btn.getAttribute('data-collectives-section'));
                });
            });

            collectivesListSubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== COLLECTIVES_MODULE) setActiveModule(COLLECTIVES_MODULE);
                    setCollectivesListSub(btn.getAttribute('data-collectives-list-sub'));
                });
            });

            partyInternalSubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== PARTY_MODULE) setActiveModule(PARTY_MODULE);
                    setPartySub(btn.getAttribute('data-party-internal-sub'));
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

            geoTeamSubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (!activeGeoTeam) return;
                    setGeoTeamSub(btn.getAttribute('data-geo-team-sub'));
                });
            });

            topicTeamSubButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (activeModule !== COLLECTIVES_MODULE) setActiveModule(COLLECTIVES_MODULE);
                    if (!activeTopicTeam) return;
                    setTopicTeamSub(btn.getAttribute('data-topic-team-sub'));
                });
            });

            function closeAllDocDropdowns() {
                persistCurrentDocEditable();
                cartagramaDocsEditorOpenFor = null;
                document.querySelectorAll('.cartagrama-doc-edit-dropdown').forEach((dd) => { dd.hidden = true; });
                document.querySelectorAll('.cartagrama-doc-edit-pencil.active').forEach((p) => p.classList.remove('active'));
                if (mapTextDisplay) {
                    mapTextDisplay.querySelectorAll('.cartagrama-doc-edit-target').forEach((el) => {
                        el.setAttribute('contenteditable', 'false');
                    });
                }
            }

            function setActiveModule(moduleId) {
                activeModule = moduleId || null;

                updateModulePickerActiveStates();
                updateModuleNavTrees();

                if (moduleBody) {
                    moduleBody.classList.toggle('has-module', Boolean(activeModule));
                }

                if (activeModule === COLLECTIVES_MODULE) {
                    if (isRankingWorkspace() || isGeneralCoordinationWorkspace()) {
                        applyVisiblePanels();
                        syncTextModeBodyClasses();
                        updateModuleBodyLabel();
                    } else if (activeTopicTeamSub === 'local' && activeTopicTeam) {
                        setGeoTeamsMode(activeGeoTeamsMode);
                    } else if (activeTopicTeam) {
                        applyVisiblePanels();
                        applyTeamTextMode();
                        updateModuleBodyLabel();
                    } else {
                        updateModuleNavTrees();
                        applyVisiblePanels();
                        syncTextModeBodyClasses();
                        closeAllDocDropdowns();
                        updateModuleBodyLabel();
                    }
                } else if (activeModule === LOCAL_GROUPS_MODULE) {
                    if (localGroupsWorkspace === 'org') {
                        setLocalGroupsOrgSub(activeLocalGroupsOrgSub);
                    } else {
                        setGeoTeamsMode(activeGeoTeamsMode);
                    }
                } else if (activeModule === PARTY_MODULE) {
                    setPartySub(activePartySub);
                } else if (activeModule === 'self') {
                    refreshSelfNavLabels();
                    setSelfSub('sindicato');
                    updateModuleBodyLabel();
                } else if (activeModule === SINDICATO_MODULE) {
                    refreshSindicatoSidebarLabels();
                    setSindicatoSub('');
                } else if (activeModule) {
                    applyVisiblePanels();
                    clearTextModeBodyClasses();
                    closeAllDocDropdowns();
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
                } else if (!isTextWorkspaceModule() && !isRankingWorkspace() && !isGeneralCoordinationWorkspace() && !isSindicatoMapVisible()) {
                    syncMapWorkspacePlaceholder();
                }

                syncTextWorkspace();

                if (isSindicatoMapVisible()) {
                    activateSindicatoMapWorkspace();
                } else if (isGeoTeamsMapWorkspace() && mapInitialized && currentMap) {
                    restoreMapWorkspaceAfterTextMode();
                } else if (activeModule !== SINDICATO_MODULE) {
                    clearSindicatoMapMarkers();
                }
            }

            if (homeTitle) {
                homeTitle.addEventListener('click', () => setActiveModule(null));
            }

            document.querySelectorAll('.map-api-button[data-api="openstreetmap"]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (!isGeoTeamsMapWorkspace() && !isSindicatoMapVisible()) {
                        if (activeModule === SINDICATO_MODULE) {
                            setSindicatoSub('map');
                        } else {
                            if (activeModule !== SINDICATO_MODULE) setActiveModule(SINDICATO_MODULE);
                        setSindicatoSub('map');
                            setGeoTeamsMode('map');
                        }
                    }
                    initOpenStreetMap();
                });
            });

            function isLocalModuleActive() {
                if (activeModule === LOCAL_GROUPS_MODULE) return true;
                if (activeModule === PARTY_MODULE && isPartyAgrupacionesActive()) return true;
                return activeModule === COLLECTIVES_MODULE && activeTopicTeamSub === 'local' && Boolean(activeTopicTeam);
            }

            function finishSindicAppBoot() {
                try {
                    const bootLocale = readStoredLocale() || window.__sindicappEarlyLocale || 'es';
                    setActiveLocale(bootLocale, { persist: false, skipGeoRebuild: true, skipRelocalize: true });
                    setGeoTeamsMode('map');
                    setPartySub('partido');
                    updateModuleNavTrees();
                    initBoundaryControlsOnce();
                    initOpenStreetMap();
                    setActiveModule(null);
                    renderInitialSubdocsModules();
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
