/* sindicapp/sindicapp-sindicato.js */
/**
 * Sindicato module — SindicApp worker-coordination platform.
 * Exposes window.SINDICAPP_SINDICATO (demo data, persistence, workspace HTML).
 */
/* SINDICATO_FORK_START — extract from SindicApp.html for standalone SindicApp / llogateres BCN fork */
(function () {
    'use strict';

    const STORAGE_KEY = 'sindicapp-sindicato-state-v2';
    const STORAGE_KEY_LEGACY = 'sindicapp-sindicato-state-v1';

    const SINDICAPP_LOGO_SRC = 'assets/sindicapp-logo.jpg'; /* B3 — logo extraído del markup a fichero */

    const COPY = {
        ie: {
            manifestTitle: 'Neutral infrastructure for workplace coordination',
            manifestBody: 'Syndicate is a geography-first platform: every company gets a profile on the map. Workers, unions, and communities share the same tools — reports, wage transparency, collective agreement guidance, and strike coordination — without replacing existing union structures.',
            welcomeTitle: 'Welcome to SindicApp',
            welcomeLead: 'Neutral infrastructure for workplace coordination. Pick a section in the sidebar to begin.',
            welcomeHint: 'CRM, wiki, unions, housing, map, forum, sectors, and companies — all on one geography-first platform.',
            mapTitle: 'Company map',
            mapIntro: 'Each pin is an auto-generated company profile. Click a pin on the map to open its profile.',
            mapHint: 'Toggle Borders layers to explore company pins by territory.',
            workplacesTitle: 'Company directory',
            unionsTitle: 'Union directory',
            feedTitle: 'Forum',
            feedIntro: 'Open board for SindicApp — delegate coordination, convenio disputes, strike readiness, and territory alerts.',
            feedIntroSidebar: 'Three forum scopes — one button per row. General board, sector forums, and territory forums.',
            feedSubs: { general: 'General', sectores: 'Sectors', territorios: 'Territories' },
            feedPickScope: 'Pick a subsector or territory in the sidebar to open its forum in the workspace.',
            feedScopeGeneral: 'General forum',
            feedScopeSector: 'Sector forum',
            feedScopeTerritory: 'Territory forum',
            feedCompanyFilter: 'Company in this scope',
            selectFeedCompany: 'All companies in scope…',
            sectoresTitle: 'Economic sectors',
            sectoresIntro: 'Sector dossier — unions on site, companies, and sector forum for the branch.',
            sectoresSectorIntro: 'Sector overview — all sub-branches, unions on site, companies, and sector forum.',
            sectoresPick: 'Pick a sector, subsector, or sub-subsector in the sidebar.',
            sectoresUnions: 'Unions present',
            sectoresWorkplaces: 'Companies in sector',
            sectoresForum: 'Sector forum',
            sectoresForumPosts: 'Recent posts',
            sectoresGotoForumBtn: 'Open sector forum',
            sectoresConvenioTitle: 'Applicable agreement',
            sectoresConvenioIntro: 'Reference collective agreement for this sector (demo directory).',
            sectoresEmptyUnions: 'No unions registered in this sector yet.',
            sectoresEmptyWorkplaces: 'No companies registered in this sector yet.',
            sectoresIntroSidebar: 'Sector tree (sector → subsector → sub-subsector). Expand branches with ▼. All open by default.',
            coordinationTitle: 'CRM',
            coordinationIntro: 'Union CRM — members, cases, campaigns and finances for any organisation.',
            coordinationIntroSidebar: 'Union CRM — pick an organisation and manage members, cases, campaigns and finances.',
            crmOrgLabel: 'Organisation',
            wikiTitle: 'Wiki',
            wikiIntroSidebar: 'Internal wiki — index and platform rules.',
            wikiIndexBlurb: 'Knowledge base — platform rules and how coordination works.',
            wikiNormasBody: 'Moderation queue, verified accounts, anonymous reports, and escalation to coordination council.',
            viviendaTitle: 'Territory',
            viviendaIntro: 'Territory profile — companies, housing, forum and social channels.',
            viviendaIntroSidebar: 'Each territory has a profile — companies, housing, forum and social channels.',
            viviendaEmpty: 'Pick a county and district in the sidebar to open the territory profile.',
            viviendaPickTerritory: 'Select a district in the sidebar.',
            viviendaForumTitle: 'Territory forum',
            viviendaHousingTitle: 'Housing',
            viviendaAlertsTitle: 'Eviction alerts',
            viviendaNoAlerts: 'No scheduled evictions in this territory (demo).',
            viviendaParentLabel: 'Select county',
            viviendaTerritoryLabel: 'Select district',
            viviendaMunicipalityLabel: 'Select municipality',
            viviendaMunicipalityAll: 'Whole district',
            viewToggle: { map: 'Map', lista: 'List' },
            viviendaMunicipalityNote: 'Municipality profile — coming soon (demo structure).',
            viviendaLinksTitle: 'Social & channels',
            viviendaLinksIntro: 'Territory channels — Telegram, fediverse and social media (demo links).',
            viviendaParentShort: 'County',
            viviendaTerritoryShort: 'District',
            viviendaMunicipalityShort: 'Municipality',
            viviendaStatWorkplaces: 'companies',
            viviendaStatAlerts: 'alerts',
            viviendaStatBuildings: 'buildings',
            viviendaStatThreads: 'threads',
            viviendaOpenMap: 'View on map',
            viviendaOpenForum: 'Open territory forum',
            viviendaAgendaTitle: 'Agenda',
            coordSections: { admin: 'Admin', wiki: 'Wiki' },
            coordSubs: { afiliadas: 'Members', casos: 'Cases', campanas: 'Campaigns', finanzas: 'Finances', comunicaciones: 'Comms', calendario: 'Calendar', documentos: 'Documents' },
            wikiSubs: { index: 'Index', sindicapp: 'SindicApp', derechos: 'Rights', denunciar: 'Reporting', organizar: 'Organising', glosario: 'Glossary', normas: 'Rules' },
            wikiIntro: 'Shared knowledge base — start with SindicApp itself, then labour rights, how to report, how to organise, plus platform rules. The wiki is transversal: every company, sector, union and territory also has its own wiki page.',
            wikiEntitySummaryTitle: 'Summary',
            wikiEntityNotesTitle: 'History &amp; notes',
            wikiEntityLinksTitle: 'Links',
            wikiOpenProfile: 'Open profile',
            wikiOpenForum: 'Open forum',
            wikiEntityNotes: {
                workplace: 'Shared record for this company — disputes won and lost, applicable agreement, delegates and organising milestones. Demo content; verified workers can expand it.',
                sector: 'Sector knowledge — reference agreements, recurring grievances, and how organising tends to work across these companies. Demo content.',
                union: 'Union page — how to join, internal structure, historic wins and resources for members. Demo content.',
                territory: 'Territory knowledge — local labour and housing background, contacts and resources. Demo content.'
            },
            wikiKbTitle: 'Knowledge base',
            wikiPlatformTitle: 'Platform',
            wikiTransversalTitle: 'Across the platform',
            wikiTransversalIntro: 'Open any company, sector, union or territory profile — each one has a 📖 Wiki section linking back here.',
            wikiEmbedTitle: 'Wiki',
            wikiEmbedCta: 'Open the wiki',
            wikiArticles: {
                sindicapp: {
                    title: 'About SindicApp',
                    summary: 'What this platform is, where it came from, and who built it.',
                    body: '<p>SindicApp is neutral infrastructure for worker coordination — a geography-first platform where every company has an automatic profile on the map, and from there you reach anonymous reports, pay transparency, the collective agreement, collective action and forums.</p>'
                        + '<p>It is explicitly <strong>not</strong> a replacement for existing unions. It is complementary plumbing: a company directory, a territorial map, sector and territory forums, and verified coordination spaces that any organisation can use.</p>'
                        + '<h3>History</h3>'
                        + '<p>SindicApp was created by <strong>Edu Nauta</strong> as an independent, open prototype. It began as a single self-contained web page exploring one idea: that if you put every workplace on a shared map, coordination becomes visible and reachable instead of scattered across private chats.</p>'
                        + '<p>From that first sketch it grew, module by module — company profiles, reports and pay transparency, sector and territory forums, a union directory, a multi-union CRM, and this transversal wiki. It is built as a static web app with no backend: the code runs entirely in the browser, so anyone can open it, read it and fork it. The project stays deliberately neutral and non-commercial — a common tool, not a product.</p>'
                        + '<div class="sindicato-coord-card"><strong>Principles</strong><p>Geography-first · neutral and complementary to unions · anonymity for workers, verification for weight · open and forkable.</p></div>'
                },
                derechos: {
                    title: 'Basic rights at work',
                    summary: 'Minimum standards: pay, working time, rest and the right to organise.',
                    body: '<p>These are the floor that no contract can go below. If your employer offers less, that is a breach — not a favour withdrawn.</p>'
                        + '<div class="sindicato-coord-card"><strong>Pay</strong><p>You are owed at least the statutory or collective-agreement minimum for every hour worked, including overtime and premiums.</p></div>'
                        + '<div class="sindicato-coord-card"><strong>Working time &amp; rest</strong><p>Maximum weekly hours, daily and weekly rest, and paid annual leave are set by law and the applicable agreement.</p></div>'
                        + '<div class="sindicato-coord-card"><strong>Right to organise</strong><p>Joining a union, electing delegates and meeting colleagues is protected. Retaliation for it is unlawful.</p></div>'
                        + '<div class="sindicato-coord-card"><strong>Safety</strong><p>You can refuse work that puts your health at serious, imminent risk and report unsafe conditions.</p></div>'
                },
                denunciar: {
                    title: 'How to file a report',
                    summary: 'From draft to moderation — how anonymous reports travel on SindicApp.',
                    body: '<p>Reports feed a company\'s public record while protecting the person filing them.</p>'
                        + '<ol class="sindicato-wiki-steps"><li>Open the company profile → <strong>Reports</strong>, or use your own workplace in <strong>User</strong>.</li>'
                        + '<li>Pick a type (unpaid overtime, safety, harassment…) and describe what happened. No real name is required.</li>'
                        + '<li>An AI pass plus community moderation reviews it before it becomes public.</li>'
                        + '<li>Approved reports raise the company\'s counters; sensitive cases can escalate to the coordination council.</li></ol>'
                        + '<p class="template-muted">Verified worker accounts carry more weight, but anyone can contribute.</p>'
                },
                organizar: {
                    title: 'Organising a workplace section',
                    summary: 'Going from a private chat to a recognised section, step by step.',
                    body: '<p>Organising is a sequence, not a leap. Each step lowers the risk of the next.</p>'
                        + '<ol class="sindicato-wiki-steps"><li><strong>Map it.</strong> List who works there, shifts and grievances shared by many.</li>'
                        + '<li><strong>Build a core.</strong> Find three to five trusted colleagues before going wide.</li>'
                        + '<li><strong>Pick an issue.</strong> Start with a concrete, winnable demand.</li>'
                        + '<li><strong>Go to a union.</strong> Use the <strong>Unions</strong> directory to find one active in your sector.</li>'
                        + '<li><strong>Elect delegates.</strong> Formalise representation and open a private worker room.</li></ol>'
                        + '<p class="template-muted">The private room in each company profile is for exactly this — management accounts are blocked.</p>'
                },
                glosario: {
                    title: 'Glossary',
                    summary: 'Key terms used across SindicApp.',
                    body: '<dl class="sindicato-wiki-glossary">'
                        + '<dt>Collective agreement (convenio)</dt><dd>The negotiated rulebook — pay scales, hours, leave — that applies to a sector or company.</dd>'
                        + '<dt>Delegate</dt><dd>An elected worker who represents colleagues before management and the union.</dd>'
                        + '<dt>Union section</dt><dd>A union\'s organised presence inside one company.</dd>'
                        + '<dt>Strike fund</dt><dd>Money set aside to support members during industrial action.</dd>'
                        + '<dt>Verified worker</dt><dd>An account confirmed as an on-site employee, giving reports and votes more weight.</dd>'
                        + '</dl>'
                }
            },
            wikiEmbedBlurbs: {
                workplace: 'Company wiki — applicable agreement, history of disputes, and how to organise here.',
                sector: 'Sector wiki — reference agreements, common grievances and organising notes for the sector.',
                union: 'Union wiki — how to join, internal structure and member resources.',
                territory: 'Territory wiki — local resources, contacts and housing/labour background.'
            },
            crmAfiliadasIntro: 'Member census — search, filter by status, and open each record.',
            crmCasosIntro: 'Case pipeline — move each conflict through its stages with ◀ ▶.',
            crmCampanasIntro: 'Active campaigns — progress towards each goal.',
            crmFinanzasIntro: 'Dues, strike fund and ledger for the selected organisation.',
            crmComunicacionesIntro: 'Bulletins and notices — drafts, scheduled and sent.',
            crmCalendarioIntro: 'Assemblies, bargaining tables and training — add events below.',
            crmDocumentosIntro: 'Document library — filter by category.',
            sector: 'Sector',
            workers: 'Verified workers',
            reports: 'Open reports',
            unionsPresent: 'Unions on site',
            strikeMeterTitle: 'Strike-o-meter',
            strikeSupport: 'Strike support',
            addWorkplace: 'Add company',
            addWorkplaceTitle: 'Register a missing employer',
            addWorkplaceHint: 'Creates a new pin on the map. Demo: saved in this browser only.',
            searchPlaceholder: 'Search by name or sector…',
            selectWorkplace: 'Select company…',
            sections: {
                location: 'Map',
                overview: 'Overview',
                reports: 'Reports',
                wages: 'Wages',
                convenio: 'Convenio',
                action: 'Action'
            },
            subs: { coordination: 'CRM', wiki: 'Wiki', unions: 'Workers', sindicatos: 'Unions', autonomos: 'Self-employed', vivienda: 'Map', map: 'Map', feed: 'Social Network', foro: 'Forum', sectores: 'Sectors', workplaces: 'Companies', housing: 'Tenants', consumidores: 'Consumers', estudiantes: 'Students', usuario: 'Profile' },
            /* Red Social (13-07-2026) — módulo master: landing + panel de stats por módulo + actividad. */
            redSocialTitle: 'Social network',
            redSocialIntro: 'Home of the network — every module at a glance. Open a panel to dive in.',
            redSocialIntroSidebar: 'Network home — per-module stats and the latest activity live in the workspace.',
            redSocialActivityTitle: 'Latest activity',
            redSocialStatLabels: {
                unions: ['unions in directory', 'combined members'],
                vivienda: ['territory profiles', 'eviction alerts'],
                sectores: ['sector branches', 'subsector forums'],
                workplaces: ['companies on the map', 'open reports'],
                consumidores: ['products & services', 'active campaigns'],
                estudiantes: ['study centres', 'student groups']
            },
            /* Redes y canales (13-07-2026) — grupo de Telegram y RRSS por entidad. */
            socialLinksTitle: 'Social & channels',
            socialLinksIntro: 'Official group and channels for this profile (demo links).',
            telegramGroupLabel: 'Telegram group',
            /* Foro (13-07-2026) — módulo propio; los árboles de subforos van al fondo. */
            foroPickSectorTitle: 'Sector subforums',
            foroPickSectorIntro: 'Pick a branch of the sector tree to open its forum.',
            foroPickTerritoryTitle: 'Territory subforums',
            foroPickTerritoryIntro: 'Pick a territory to open its forum — every county and district has one.',
            foroBackToTree: 'All subforums',
            /* Consumidores (13-07-2026) */
            consumidoresTitle: 'Consumer coordination',
            consumidoresIntro: 'Products and services with a public record — consumer reports, pressure campaigns and fair alternatives. The company-map logic, seen from the till.',
            consumidoresDirectoryHint: 'Open a product or service to see its record.',
            consumidoresStatComplaints: 'consumer reports',
            consumidoresStatCampaigns: 'active campaigns',
            consumidoresStatSupport: 'avg. campaign support',
            consumidoresCampaignsTitle: 'Pressure campaigns',
            consumidoresAlternativesTitle: 'Fair alternatives',
            consumidoresTipsTitle: 'Know your rights',
            consumidoresRelatedCompany: 'Company profile on the map',
            consumidoresBack: 'Back to directory',
            consumidoresTypeProduct: 'Product',
            consumidoresTypeService: 'Service',
            /* Estudiantes (13-07-2026) */
            estudiantesTitle: 'Study centres',
            estudiantesIntro: 'Universities, secondary schools and vocational training — each centre gets a profile with student groups, grievances and mobilisations. Geography-first, applied to education.',
            estudiantesDirectoryHint: 'Open a centre to see its profile.',
            estudiantesStatStudents: 'students',
            estudiantesStatGroups: 'student groups',
            estudiantesStatIssues: 'open grievances',
            estudiantesGroupsTitle: 'Student groups & unions',
            estudiantesIssuesTitle: 'Grievances & demands',
            estudiantesMobilizationsTitle: 'Mobilisations',
            estudiantesBack: 'Back to centres',
            housingSubs: { huelgometro: 'Strike-o-meter', alarmas: 'Eviction alerts', tenedores: 'Big landlords', calculadora: 'Rent check', asambleas: 'Assemblies' },
            housingIntro: 'Tenant organising — strike-o-meter, eviction alerts, big-landlord campaigns, a rent checker and local assemblies.',
            /* Vivienda ampliado (13-07-2026): tenedores, calculadora, asambleas, acompañamiento */
            housingEscortBtn: '🤝 Join the escort picket',
            housingEscortCount: 'pledged to show up',
            housingTenedoresTitle: 'Big landlords',
            housingTenedoresIntro: 'Funds, REITs and banks that own housing at scale — building-by-building collective bargaining, "We\'re staying" style.',
            housingTenedoresBuildings: 'organised buildings',
            housingTenedoresUnits: 'homes',
            housingTenedoresProgress: 'collective negotiation progress',
            housingTenedoresUnionCta: 'Organised with the tenants\' union',
            housingCalcTitle: 'Rent check',
            housingCalcIntro: 'Compare your rent with the reference index for your area (demo index).',
            housingCalcTerritory: 'Area',
            housingCalcM2: 'Home size (m²)',
            housingCalcRent: 'Your monthly rent (€)',
            housingCalcBtn: 'Check my rent',
            housingCalcReference: 'Reference rent for this home',
            housingCalcOver: 'above the reference index',
            housingCalcUnder: 'below the reference index',
            housingCalcAdvice: 'If you are paying above the index, your local assembly and the tenants\' union can help you negotiate it down.',
            housingCalcInvalid: 'Enter a size and a rent to run the check.',
            housingAsambleasTitle: 'Local assemblies',
            housingAsambleasIntro: 'Tenant assemblies by area — open meetings, each with its own Telegram group.',
            housingAsambleasMembers: 'members',
            housingAsambleasMeets: 'Meets',
            housingAsambleasTerritoryBtn: 'Territory profile',
            housingHuelgometroTitle: 'Strike-o-meter',
            housingHuelgometroIntro: 'National tally of tenants pledged to a rent strike. At 1,000,000 confirmed pledges, the call goes out.',
            housingThresholdLabel: 'tenants pledged (goal: 1,000,000)',
            housingPledgeBtn: 'I pledge to join the rent strike',
            housingAlarmasTitle: 'Eviction alerts',
            housingAlarmasIntro: 'All scheduled evictions and at-risk cases across every territory, in one feed.',
            badges: { verified: 'Verified workers', ai: 'AI assist', neutral: 'Neutral platform' },
            reportTypes: {
                overtime: 'Unpaid overtime',
                blackWages: 'Off-the-books pay',
                lowPay: 'Below convenio',
                abuse: 'Abusive management'
            },
            locationBridgeTitle: 'Map ↔ company bridge',
            locationBridgeBody: 'The pin is highlighted on the map above. Use the section buttons to open reports, wages, convenio, or action — or pick another company on the map.',
            locationCoords: 'Coordinates',
            locationOpenOverview: 'Open overview',
            locationOpenReports: 'View reports',
            reportFormTitle: 'Submit anonymous report',
            reportFormDetail: 'Describe the issue (optional)',
            reportFormSubmit: 'Submit for moderation',
            reportFormAiNote: 'AI pre-screen flags duplicates and obvious bad-faith entries before human review.',
            moderationTitle: 'Moderation queue',
            moderationPending: 'Pending',
            moderationApproved: 'Approved',
            moderationRejected: 'Rejected',
            moderationApprove: 'Approve',
            moderationReject: 'Reject',
            moderationEmpty: 'No reports in this state.',
            privateForumTitle: 'Private worker room',
            privateForum: 'Union-hosted private room — filters management and topos. Verification required to join.',
            privateForumRules: 'Hosted by on-site union delegate. No real names required. Management accounts blocked.',
            presenceTitle: 'Presence',
            presenceDelegates: 'Workplace delegates',
            presenceAgreements: 'Agreements signed',
            presenceSectors: 'Main sectors',
            members: 'Members on platform',
            companiesOnSite: 'Companies with presence',
            selectUnion: 'Select union…',
            unionsPick: 'Pick a union or click any union name across the platform.',
            unionSearchPlaceholder: 'Search by union or sector…',
            unionBack: 'Back to unions',
            unionRelatedTitle: 'Other unions in this sector',
            unionsStatCount: 'Unions in directory',
            unionsStatMembers: 'Combined membership',
            unionsStatDelegates: 'Combined workplace delegates',
            unionFoundedLabel: 'Founded',
            unionWebsiteLabel: 'Official website',
            unionMilestonesTitle: 'Milestones & wins',
            unionHousingCompaniesNote: 'This union organises tenants building by building, not by employer — so it will not show up in a company presence list.',
            unionSections: {
                overview: 'Overview',
                forum: 'Forum',
                structure: 'Structure',
                companies: 'Companies'
            },
            unionForumIntro: 'Union forum — coordination threads, delegate updates, and sector alerts.',
            unionStructureIntro: 'Organisational structure — branches, delegates, and liaison roles on SindicApp.',
            unionOverviewIntro: 'Union profile on the neutral SindicApp directory.',
            unionOpenForum: 'Open forum',
            unionOpenStructure: 'View structure',
            convenioAskAi: 'Ask AI about convenio',
            convenioAskPlaceholder: 'Paste a clause or describe your doubt…',
            convenioAskBtn: 'Explain in plain language',
            convenioAiSample: 'AI assist (demo): This clause limits overtime to 80h/year unless collectively agreed. If your contract says otherwise, flag it with a report.',
            demoNote: 'Demo data for SindicApp. Production would use verified accounts, legal review, and union partnerships.',
            forumBack: 'Back to general forum',
            forumThreadMissing: 'Thread not found.',
            territoryDossierIntro: 'Territory dossier — unions on site, companies, housing forum, and territorial alerts.',
            territoryWorkplaces: 'Companies in territory',
            territoryHousingLink: 'Open territory profile',
            viviendaWorkplacesTitle: 'Companies in territory',
            viviendaWorkplacesIntro: 'Employers in this territory — labour and housing struggles often overlap here.',
            fieldSubsector: 'Subsector (branch)',
            fieldTerritory: 'Territory',
            selectSubsector: 'Pick subsector…',
            selectTerritory: 'Pick territory…',
            addWorkplaceStep2: 'Step 2 — classify on the geography tree',
            strikeVoteYes: 'I would join a lawful strike',
            strikeVoteNo: 'Not ready yet',
            strikeVoteThanks: 'Vote recorded (demo — stored in this browser).',
            convenioBranchTitle: 'Branch clauses (from collective agreement library)',
            mapTerritoryDossier: 'Territory dossier',
            mapClearTerritory: 'Show all territories',
            aiConvenioHint: 'AI convenio assist explains clauses in plain language and flags common employer workarounds.',
            aiContractHint: 'Upload a contract for community review plus AI summary of risky clauses (demo).',
            fieldName: 'Company name',
            fieldSector: 'Sector',
            fieldAddress: 'Address',
            fieldLat: 'Latitude',
            fieldLng: 'Longitude',
            workplacesIntro: 'Search companies on the map or pick one to open its profile.',
            unionsIntro: 'Neutral directory — SIPTU, Unite, sector unions, and more. Presence data (delegates, companies, agreements) comes from verifiable records, not community scoring.',
            reportsIntro: 'Anonymous public reports. Community + AI review before publication.',
            wagesIntro: 'Crowd-sourced anonymous org chart and pay bands.',
            wageConvenioRange: 'Range from collective agreement:',
            actionIntro: 'Strike readiness, confirmation lists, and secure chat.',
            strikeThreshold: 'threshold',
            actionPollActive: 'Active poll — 12 days left',
            actionPrivateList: 'Private confirmation list',
            actionCoordChat: 'Coordination chat (union-hosted)',
            officerLabel: 'Officer',
            /* B4 (R1) — buscador de convenio + FAQ estructurado */
            finderTitle: 'Which agreement applies to me?',
            finderIntro: 'Pick your sector to find the collective agreement that likely covers you (demo directory).',
            finderSector: 'Sector',
            finderSubmit: 'Find my agreement',
            finderNoResult: 'No demo entry for that sector yet.',
            finderScope: 'Scope',
            finderVigencia: 'In force',
            finderSource: 'Check the official registry',
            finderDisclaimer: 'Demo directory — always confirm against the official registry or with a union rep.',
            faqItems: [
                { q: 'Can they change my roster without notice?', a: 'Most agreements require minimum notice for roster changes (often 5–7 days). Check the working-time chapter of your agreement; changes without notice can be challenged.' },
                { q: 'Do I get paid more for night or Sunday work?', a: 'Sectoral agreements usually set premiums for night (e.g. +25%) and Sunday/holiday work. If your payslip shows no premium, compare it against the agreement tables.' },
                { q: 'How much annual leave am I owed?', a: 'The statutory minimum is 4 working weeks; many agreements improve it. Leave cannot be replaced by pay except at the end of the employment relationship.' },
                { q: 'What if my contract contradicts the agreement?', a: 'The agreement is a floor, not a ceiling: a contract clause below the agreement minimum is void. The agreement condition applies automatically.' },
                { q: 'Who can I talk to confidentially?', a: 'Union delegates are bound to confidentiality, and this platform lets you compare situations anonymously before taking any step.' }
            ],
            faqOvertimeQ: 'How many overtime hours per month?',
            faqOvertimeA: 'Sectoral agreement caps at 80h/year unless collectively agreed.',
            faqContractQ: 'Upload my contract',
            noMatch: 'No companies match your search.',
            wageRoleBase: 'Base operative',
            wageRoleMid: 'Mid role',
            wageRoleLead: 'Team lead',
            /* C2 — aportar sueldo */
            wageContribsTitle: 'Community contributions (this browser)',
            wageFormTitle: 'Add your salary',
            wageFormHint: 'Anonymous — stored only in this browser (demo). No names, no accounts.',
            wageFormRole: 'Role',
            wageFormAmount: 'Gross amount (€)',
            wageFormPeriod: 'Period',
            wageFormMonthly: 'Per month',
            wageFormHourly: 'Per hour',
            wageFormSubmit: 'Add anonymously',
            wagePerHour: '/ hr',
            wagePerMonth: '/ month',
            officialChannelsTitle: 'Official channels',
            officialChannelsIntro: 'A public report here informs your co-workers; an official complaint obliges the authorities to act. This platform signposts the channels with real legal force.',
            officialChannels: [
                { name: 'Workplace Relations Commission (WRC)', url: 'https://www.workplacerelations.ie', desc: 'Formal complaints and inspections on pay, working time and employment rights — its decisions are legally enforceable.' },
                { name: 'Protected Disclosures Act channel (internal)', url: '', desc: 'Internal reporting channel required by the Protected Disclosures Act; gives whistleblowers statutory protection against penalisation.' },
                { name: 'Data Protection Commission', url: 'https://www.dataprotection.ie', desc: 'Supervisory authority for personal-data issues at work (CCTV, monitoring, HR files) — its rulings are binding.' }
            ],
            registryTitle: 'Registry data',
            registryLegalForm: 'Legal form',
            registryFounded: 'Incorporated',
            registryAdmins: 'Directors',
            registryLastAccounts: 'Latest filed accounts',
            registryRevenue: 'Revenue',
            registryResult: 'Net result',
            registryEbitda: 'EBITDA (approx.)',
            registrySource: 'Source: CRO / Companies Registration Office — demo data',
            registryTagline: "Know your company's accounts before you negotiate.",
            calcTitle: 'Agreement calculator',
            calcIntro: 'Check your pay against the demo salary table of the applicable agreement.',
            calcCategory: 'Professional category (ERO/JLC demo table)',
            calcSelectCategory: 'Select category…',
            calcHours: 'Weekly hours',
            calcSalary: 'Gross salary (€)',
            calcPeriod: 'Salary period',
            calcPeriodMonthly: 'Monthly (×12 — assumes 12 equal payments)',
            calcPeriodAnnual: 'Annual',
            calcSubmit: 'Compare with agreement minimum',
            calcAbove: 'At or above the agreement minimum.',
            calcBelow: 'Below the agreement minimum — you can claim the difference.',
            calcMinLabel: 'Agreement minimum (prorated to your hours)',
            calcDiffLabel: 'Difference',
            calcDisclaimer: 'Orientative result based on a demo salary table — not legal advice. Check the full agreement text or ask a union representative.',
            /* C4 — feedback de acciones (toasts) */
            notices: {
                reportQueued: 'Report sent to the moderation queue.',
                strikeVoteSaved: 'Vote recorded (demo — saved in this browser).',
                agendaEventAdded: 'Event added to the agenda.',
                endorsementRequested: 'Endorsement request sent.',
                endorsementMissingUnion: 'Choose a guarantor union first.',
                companyAdded: 'Company profile created.',
                companyFormInvalid: 'Name and address are required.',
                wageSubmitted: 'Salary contribution saved. Thank you.',
                pledgeSaved: 'Pledge recorded (demo).'
            },
            /* R4 — Agenda: la capa temporal */
            agendaTitle: 'Action agenda',
            agendaUpcomingTitle: 'Upcoming dates',
            agendaViviendaTitle: 'Territory housing agenda',
            agendaEmpty: 'No upcoming events (demo).',
            agendaTypes: { assembly: 'Assembly', vote: 'Vote', deadline: 'Deadline', strike: 'Strike', negotiation: 'Negotiation' },
            agendaAddTitle: 'Add event (demo)',
            agendaFieldType: 'Type',
            agendaFieldDate: 'Date',
            agendaFieldTitle: 'Title',
            agendaAddSubmit: 'Add to agenda',
            agendaAddHint: 'Demo: saved in this browser only.',
            /* R5 — Verificación como arquitectura */
            verificationTitle: 'Verification',
            verificationCurrent: 'Current level',
            trustLevels: { anon: 'Anonymous', person: 'Verified person', worker: 'Verified worker' },
            trustLevelDesc: {
                anon: 'Default level — no identity data. Enough to read and to file anonymous reports.',
                person: 'A real person is confirmed behind the account — still pseudonymous on the platform.',
                worker: 'A union vouches that this person works where they say they work.'
            },
            verificationDoctrine: 'Unions act as identity guarantors: any union can endorse a worker, and none owns the platform. The endorsement protects this space against company astroturfing without exposing anyone’s name.',
            verifyRequestBtn: 'Request union endorsement',
            verifySelectUnion: 'Select guarantor union',
            verifyPending: 'Pending endorsement from',
            verifyConfirmBtn: 'The union confirms (demo)',
            verifyDone: 'Verified worker — endorsed by',
            /* R7 — Perfiles automáticos de edificio */
            buildingsTitle: 'Buildings',
            buildingsIntro: 'Every building gets an automatic profile — condition reports, rent transparency, tenancy rights, and collective action.',
            buildingUnits: 'homes',
            buildingOwnerLabel: 'Owner',
            buildingLargeHolder: 'Large landlord',
            buildingYearLabel: 'Built',
            buildingBack: 'Back to buildings',
            buildingStateTitle: 'Condition',
            buildingStateIntro: 'Anonymous building-condition reports from residents.',
            buildingStateModNote: 'Reports pass community moderation before publication, like company reports.',
            buildingStateEmpty: 'No published reports for this building yet (demo).',
            buildingRentsTitle: 'Rents',
            buildingRentM2: 'Zone price per m²',
            buildingRentTypical: 'Typical rent in the zone',
            buildingRentIndexNote: 'Reference: RTB Rent Index for the area — check it before signing or renewing.',
            buildingContractTitle: 'Tenancy & rights',
            buildingContractFaq: [
                { q: 'Is the tenancy registered?', a: 'Landlords must register every tenancy with the Residential Tenancies Board (RTB). An unregistered tenancy still protects the tenant.' },
                { q: 'How much can rent rise?', a: 'In Rent Pressure Zones increases are capped (2% per year or inflation, whichever is lower). Check whether the building is in an RPZ.' },
                { q: 'What notice must I get?', a: 'Notice periods scale with tenancy duration — from 90 days after 6 months up to 224 days after 8 years. A notice without valid grounds can be challenged at the RTB.' }
            ],
            buildingActionTitle: 'Action',
            buildingEvictionLinkNote: 'Linked to the territory eviction alerts — same channel, same moderation.',
            tenantPledgeBtn: 'I would join collective tenant action',
            tenantPledgeCount: 'confirmations (demo)',
            moduleLoadError: 'Syndicate module failed to load.'
        },
        es: {
            manifestTitle: 'Infraestructura neutral para coordinación laboral',
            manifestBody: 'Sindicato es una plataforma basada en la geografía: cada empresa tiene perfil en el mapa. Trabajadores, sindicatos y comunidades comparten herramientas — denuncias, transparencia salarial, guía de convenio y coordinación de huelga — sin sustituir a los sindicatos existentes.',
            welcomeTitle: 'Bienvenido/a a SindicApp',
            welcomeLead: 'Infraestructura neutral para coordinación laboral. Elige una sección en la barra lateral para empezar.',
            welcomeHint: 'CRM, wiki, sindicatos, vivienda, mapa, foro, sectores y empresas — todo en una plataforma basada en la geografía.',
            mapTitle: 'Mapa de empresas',
            mapIntro: 'Cada pin es un perfil automático de empresa. Pulsa un pin del mapa para abrir su perfil.',
            mapHint: 'Activa capas en Borders para explorar los pins por territorio.',
            workplacesTitle: 'Directorio de empresas',
            unionsTitle: 'Directorio sindical',
            feedTitle: 'Foro',
            feedIntro: 'Tablón abierto de SindicApp — coordinación de delegadas, conflictos de convenio, preparación de huelga y alertas territoriales.',
            feedIntroSidebar: 'Tres ámbitos de foro — un botón por fila. Foro general, foros sectoriales y foros territoriales.',
            feedSubs: { general: 'General', sectores: 'Sectores', territorios: 'Territorios' },
            feedPickScope: 'Elige un subsector o territorio en la barra lateral para abrir su foro en el espacio de fondo.',
            feedScopeGeneral: 'Foro general',
            feedScopeSector: 'Foro sectorial',
            feedScopeTerritory: 'Foro territorial',
            feedCompanyFilter: 'Empresa en este ámbito',
            selectFeedCompany: 'Todas las empresas del ámbito…',
            sectoresTitle: 'Sectores económicos',
            sectoresIntro: 'Dossier del subsector — sindicatos presentes, empresas y foro de la rama.',
            sectoresSectorIntro: 'Vista del sector — todas las ramas, sindicatos presentes, empresas y foro sectorial.',
            sectoresPick: 'Elige sector, subsector o sub-subsector en la barra lateral.',
            sectoresUnions: 'Sindicatos presentes',
            sectoresWorkplaces: 'Empresas del sector',
            sectoresForum: 'Foro sectorial',
            sectoresForumPosts: 'Publicaciones recientes',
            sectoresGotoForumBtn: 'Abrir foro del sector',
            sectoresConvenioTitle: 'Convenio aplicable',
            sectoresConvenioIntro: 'Convenio colectivo de referencia para este sector (directorio demo).',
            sectoresEmptyUnions: 'Aún no hay sindicatos registrados en este sector.',
            sectoresEmptyWorkplaces: 'Aún no hay empresas registradas en este sector.',
            sectoresIntroSidebar: 'Árbol sectorial (sector → subsector → sub-subsector). Despliega ramas con ▼. Todo abierto de momento.',
            coordinationTitle: 'CRM',
            coordinationIntro: 'CRM sindical — afiliadas, casos, campañas y finanzas para cualquier organización.',
            coordinationIntroSidebar: 'CRM sindical — elige organización y gestiona afiliadas, casos, campañas y finanzas.',
            crmOrgLabel: 'Organización',
            wikiTitle: 'Wiki',
            wikiIntroSidebar: 'Wiki interna — índice y normas de plataforma.',
            wikiIndexBlurb: 'Base de conocimiento — normas de plataforma y cómo funciona la coordinación.',
            wikiNormasBody: 'Cola de denuncias, cuentas verificadas, informes anónimos y escalado al consejo de coordinación.',
            viviendaTitle: 'Territorio',
            viviendaIntro: 'Perfil del territorio — empresas, vivienda, foro y redes.',
            viviendaIntroSidebar: 'Cada territorio tiene su perfil — empresas, vivienda, foro y redes.',
            viviendaEmpty: 'Elige provincia y comarca en la barra lateral para abrir el perfil del territorio.',
            viviendaPickTerritory: 'Selecciona una comarca en la barra lateral.',
            viviendaForumTitle: 'Foro del territorio',
            viviendaHousingTitle: 'Vivienda',
            viviendaAlertsTitle: 'Alertas de desahucio',
            viviendaNoAlerts: 'Sin desahucios programados en este territorio (demo).',
            viviendaParentLabel: 'Selecciona provincia',
            viviendaTerritoryLabel: 'Selecciona comarca',
            viviendaMunicipalityLabel: 'Selecciona municipio',
            viviendaMunicipalityAll: 'Toda la comarca',
            viewToggle: { map: 'Mapa', lista: 'Lista' },
            viviendaMunicipalityNote: 'Perfil de municipio — próximamente (estructura demo).',
            viviendaLinksTitle: 'Redes y canales',
            viviendaLinksIntro: 'Canales del territorio — Telegram, fediverso y RRSS (enlaces demo).',
            viviendaParentShort: 'Provincia',
            viviendaTerritoryShort: 'Comarca',
            viviendaMunicipalityShort: 'Municipio',
            viviendaStatWorkplaces: 'empresas',
            viviendaStatAlerts: 'alertas',
            viviendaStatBuildings: 'edificios',
            viviendaStatThreads: 'hilos',
            viviendaOpenMap: 'Ver en el mapa',
            viviendaOpenForum: 'Abrir foro del territorio',
            viviendaAgendaTitle: 'Agenda',
            coordSections: { admin: 'Admin', wiki: 'Wiki' },
            coordSubs: { afiliadas: 'Afiliadas', casos: 'Casos', campanas: 'Campañas', finanzas: 'Finanzas', comunicaciones: 'Comunicaciones', calendario: 'Calendario', documentos: 'Documentos' },
            crmAfiliadasIntro: 'Censo de afiliación — busca, filtra por estado y abre cada ficha.',
            crmCasosIntro: 'Pipeline de casos — mueve cada conflicto por sus etapas con ◀ ▶.',
            crmCampanasIntro: 'Campañas activas — progreso hacia cada objetivo.',
            crmFinanzasIntro: 'Cuotas, fondo de huelga y libro de movimientos de la organización elegida.',
            crmComunicacionesIntro: 'Boletines y avisos — borradores, programadas y enviadas.',
            crmCalendarioIntro: 'Asambleas, mesas de negociación y formación — añade eventos abajo.',
            crmDocumentosIntro: 'Biblioteca de documentos — filtra por categoría.',
            wikiSubs: { index: 'Índice', sindicapp: 'SindicApp', derechos: 'Derechos', denunciar: 'Denunciar', organizar: 'Organizar', glosario: 'Glosario', normas: 'Normas' },
            wikiIntro: 'Base de conocimiento compartida — empieza por SindicApp, luego derechos laborales, cómo denunciar, cómo organizarse y normas de plataforma. La wiki es transversal: cada empresa, sector, sindicato y territorio tiene además su propia página wiki.',
            wikiEntitySummaryTitle: 'Resumen',
            wikiEntityNotesTitle: 'Historia y notas',
            wikiEntityLinksTitle: 'Enlaces',
            wikiOpenProfile: 'Abrir perfil',
            wikiOpenForum: 'Abrir foro',
            wikiEntityNotes: {
                workplace: 'Registro compartido de esta empresa — conflictos ganados y perdidos, convenio aplicable, delegadas e hitos de organización. Contenido demo; las trabajadoras verificadas pueden ampliarlo.',
                sector: 'Conocimiento del sector — convenios de referencia, agravios recurrentes y cómo suele funcionar la organización en estas empresas. Contenido demo.',
                union: 'Página del sindicato — cómo afiliarse, estructura interna, victorias históricas y recursos para afiliadas. Contenido demo.',
                territory: 'Conocimiento del territorio — contexto laboral y de vivienda local, contactos y recursos. Contenido demo.'
            },
            wikiKbTitle: 'Base de conocimiento',
            wikiPlatformTitle: 'Plataforma',
            wikiTransversalTitle: 'A lo largo de la plataforma',
            wikiTransversalIntro: 'Abre cualquier perfil de empresa, sector, sindicato o territorio — todos tienen una sección 📖 Wiki que enlaza aquí.',
            wikiEmbedTitle: 'Wiki',
            wikiEmbedCta: 'Abrir la wiki',
            wikiArticles: {
                sindicapp: {
                    title: 'Sobre SindicApp',
                    summary: 'Qué es esta plataforma, de dónde viene y quién la creó.',
                    body: '<p>SindicApp es infraestructura neutral para la coordinación trabajadora — una plataforma basada en la geografía donde cada empresa tiene un perfil automático en el mapa, y desde ahí se accede a denuncias anónimas, transparencia salarial, convenio, acción colectiva y foros.</p>'
                        + '<p>Explícitamente <strong>no</strong> sustituye a los sindicatos existentes. Es fontanería complementaria: un directorio de empresas, un mapa territorial, foros de sector y territorio, y espacios de coordinación verificados que cualquier organización puede usar.</p>'
                        + '<h3>Historia</h3>'
                        + '<p>SindicApp la creó <strong>Edu Nauta</strong> como prototipo independiente y abierto. Empezó como una sola página web autocontenida explorando una idea: que si pones cada centro de trabajo en un mapa compartido, la coordinación se vuelve visible y alcanzable en vez de dispersarse por chats privados.</p>'
                        + '<p>Desde aquel primer boceto fue creciendo, módulo a módulo — perfiles de empresa, denuncias y transparencia salarial, foros de sector y territorio, un directorio de sindicatos, un CRM multi-sindicato y esta wiki transversal. Está construida como una web estática sin backend: el código corre entero en el navegador, así que cualquiera puede abrirla, leerla y bifurcarla. El proyecto se mantiene deliberadamente neutral y no comercial — una herramienta común, no un producto.</p>'
                        + '<div class="sindicato-coord-card"><strong>Principios</strong><p>La geografía primero · neutral y complementaria a los sindicatos · anonimato para la trabajadora, verificación para el peso · abierta y bifurcable.</p></div>'
                },
                derechos: {
                    title: 'Derechos básicos en el trabajo',
                    summary: 'Mínimos irrenunciables: salario, jornada, descanso y derecho a organizarse.',
                    body: '<p>Son el suelo que ningún contrato puede rebajar. Si tu empresa ofrece menos, es un incumplimiento — no un favor que te retiran.</p>'
                        + '<div class="sindicato-coord-card"><strong>Salario</strong><p>Te corresponde al menos el mínimo legal o de convenio por cada hora trabajada, incluidas horas extra y pluses.</p></div>'
                        + '<div class="sindicato-coord-card"><strong>Jornada y descanso</strong><p>La jornada máxima semanal, los descansos diario y semanal y las vacaciones pagadas los fijan la ley y el convenio aplicable.</p></div>'
                        + '<div class="sindicato-coord-card"><strong>Derecho a organizarse</strong><p>Afiliarse a un sindicato, elegir delegadas y reunirse con compañeras está protegido. Represaliar por ello es ilegal.</p></div>'
                        + '<div class="sindicato-coord-card"><strong>Seguridad</strong><p>Puedes negarte a un trabajo con riesgo grave e inminente para tu salud y denunciar condiciones inseguras.</p></div>'
                },
                denunciar: {
                    title: 'Cómo poner una denuncia',
                    summary: 'Del borrador a la moderación — el recorrido de una denuncia anónima en SindicApp.',
                    body: '<p>Las denuncias alimentan el historial público de una empresa protegiendo a quien las pone.</p>'
                        + '<ol class="sindicato-wiki-steps"><li>Abre el perfil de la empresa → <strong>Denuncias</strong>, o usa tu propia empresa en <strong>Usuario</strong>.</li>'
                        + '<li>Elige un tipo (horas extra sin pagar, seguridad, acoso…) y describe lo ocurrido. No hace falta nombre real.</li>'
                        + '<li>Una pasada de IA más moderación comunitaria la revisan antes de hacerse pública.</li>'
                        + '<li>Las denuncias aprobadas suben los contadores de la empresa; los casos sensibles escalan al consejo de coordinación.</li></ol>'
                        + '<p class="template-muted">Las cuentas de trabajadora verificada pesan más, pero cualquiera puede aportar.</p>'
                },
                organizar: {
                    title: 'Organizar una sección sindical',
                    summary: 'De un chat privado a una sección reconocida, paso a paso.',
                    body: '<p>Organizarse es una secuencia, no un salto. Cada paso reduce el riesgo del siguiente.</p>'
                        + '<ol class="sindicato-wiki-steps"><li><strong>Mapea.</strong> Anota quién trabaja, los turnos y los agravios compartidos por muchas.</li>'
                        + '<li><strong>Forma un núcleo.</strong> Encuentra de tres a cinco compañeras de confianza antes de abrirlo.</li>'
                        + '<li><strong>Elige un tema.</strong> Empieza por una demanda concreta y ganable.</li>'
                        + '<li><strong>Acude a un sindicato.</strong> Usa el directorio de <strong>Sindicatos</strong> para encontrar uno activo en tu sector.</li>'
                        + '<li><strong>Elige delegadas.</strong> Formaliza la representación y abre una sala privada de trabajadoras.</li></ol>'
                        + '<p class="template-muted">La sala privada de cada perfil de empresa es justo para esto — las cuentas de dirección quedan bloqueadas.</p>'
                },
                glosario: {
                    title: 'Glosario',
                    summary: 'Términos clave usados en SindicApp.',
                    body: '<dl class="sindicato-wiki-glossary">'
                        + '<dt>Convenio colectivo</dt><dd>El reglamento negociado — tablas salariales, jornada, permisos — que se aplica a un sector o empresa.</dd>'
                        + '<dt>Delegada</dt><dd>Trabajadora elegida que representa a sus compañeras ante la dirección y el sindicato.</dd>'
                        + '<dt>Sección sindical</dt><dd>La presencia organizada de un sindicato dentro de una empresa.</dd>'
                        + '<dt>Caja de resistencia</dt><dd>Fondo reservado para sostener a las afiliadas durante una acción sindical.</dd>'
                        + '<dt>Trabajadora verificada</dt><dd>Cuenta confirmada como empleada en el centro, que da más peso a denuncias y votos.</dd>'
                        + '</dl>'
                }
            },
            wikiEmbedBlurbs: {
                workplace: 'Wiki de la empresa — convenio aplicable, historial de conflictos y cómo organizarse aquí.',
                sector: 'Wiki del sector — convenios de referencia, agravios comunes y notas de organización del sector.',
                union: 'Wiki del sindicato — cómo afiliarse, estructura interna y recursos para afiliadas.',
                territory: 'Wiki del territorio — recursos locales, contactos y contexto de vivienda/trabajo.'
            },
            sector: 'Sector',
            workers: 'Trabajadores verificados',
            reports: 'Denuncias abiertas',
            unionsPresent: 'Sindicatos presentes',
            strikeMeterTitle: 'Huelgómetro',
            strikeSupport: 'Apoyo a huelga',
            addWorkplace: 'Añadir empresa',
            addWorkplaceTitle: 'Registrar empleador que falta',
            addWorkplaceHint: 'Crea un nuevo pin en el mapa. Demo: se guarda solo en este navegador.',
            searchPlaceholder: 'Buscar por nombre o sector…',
            selectWorkplace: 'Seleccionar empresa…',
            sections: {
                location: 'Mapa',
                overview: 'Resumen',
                reports: 'Denuncias',
                wages: 'Sueldos',
                convenio: 'Convenio',
                action: 'Acción'
            },
            subs: { coordination: 'CRM', wiki: 'Wiki', unions: 'Trabajadores', sindicatos: 'Sindicatos', autonomos: 'Autónomos', vivienda: 'Mapa', map: 'Mapa', feed: 'Red Social', foro: 'Foro', sectores: 'Sectores', workplaces: 'Empresas', housing: 'Inquilinos', consumidores: 'Consumidores', estudiantes: 'Estudiantes', usuario: 'Perfil' },
            /* Red Social (13-07-2026) — módulo master: landing + panel de stats por módulo + actividad. */
            redSocialTitle: 'Red social',
            redSocialIntro: 'Portada de la red — todos los módulos de un vistazo. Abre un panel para entrar.',
            redSocialIntroSidebar: 'Portada de la red — stats de cada módulo y actividad reciente en el fondo.',
            redSocialActivityTitle: 'Actividad reciente',
            redSocialStatLabels: {
                unions: ['sindicatos en el directorio', 'afiliación combinada'],
                vivienda: ['perfiles de territorio', 'alertas de desahucio'],
                sectores: ['ramas sectoriales', 'foros de subsector'],
                workplaces: ['empresas en el mapa', 'denuncias abiertas'],
                consumidores: ['productos y servicios', 'campañas activas'],
                estudiantes: ['centros de estudios', 'colectivos estudiantiles']
            },
            /* Redes y canales (13-07-2026) — grupo de Telegram y RRSS por entidad. */
            socialLinksTitle: 'Redes y canales',
            socialLinksIntro: 'Grupo y canales oficiales de este perfil (enlaces demo).',
            telegramGroupLabel: 'Grupo de Telegram',
            /* Foro (13-07-2026) — módulo propio; los árboles de subforos van al fondo. */
            foroPickSectorTitle: 'Subforos por sector',
            foroPickSectorIntro: 'Elige una rama del árbol sectorial para abrir su foro.',
            foroPickTerritoryTitle: 'Subforos por territorio',
            foroPickTerritoryIntro: 'Elige un territorio para abrir su foro — cada provincia y comarca tiene el suyo.',
            foroBackToTree: 'Todos los subforos',
            /* Consumidores (13-07-2026) */
            consumidoresTitle: 'Coordinación de consumo',
            consumidoresIntro: 'Productos y servicios con registro público — denuncias de consumo, campañas de presión y alternativas justas. La lógica del mapa de empresas, vista desde la caja.',
            consumidoresDirectoryHint: 'Abre un producto o servicio para ver su registro.',
            consumidoresStatComplaints: 'denuncias de consumo',
            consumidoresStatCampaigns: 'campañas activas',
            consumidoresStatSupport: 'apoyo medio de campaña',
            consumidoresCampaignsTitle: 'Campañas de presión',
            consumidoresAlternativesTitle: 'Alternativas justas',
            consumidoresTipsTitle: 'Conoce tus derechos',
            consumidoresRelatedCompany: 'Perfil de empresa en el mapa',
            consumidoresBack: 'Volver al directorio',
            consumidoresTypeProduct: 'Producto',
            consumidoresTypeService: 'Servicio',
            /* Estudiantes (13-07-2026) */
            estudiantesTitle: 'Centros de estudios',
            estudiantesIntro: 'Universidades, institutos y FP — cada centro tiene su perfil con colectivos estudiantiles, reivindicaciones y movilizaciones. La lógica geografía-primero, aplicada a la educación.',
            estudiantesDirectoryHint: 'Abre un centro para ver su perfil.',
            estudiantesStatStudents: 'estudiantes',
            estudiantesStatGroups: 'colectivos',
            estudiantesStatIssues: 'reivindicaciones abiertas',
            estudiantesGroupsTitle: 'Colectivos y sindicatos de estudiantes',
            estudiantesIssuesTitle: 'Quejas y reivindicaciones',
            estudiantesMobilizationsTitle: 'Movilizaciones',
            estudiantesBack: 'Volver a centros',
            housingSubs: { huelgometro: 'Huelgómetro', alarmas: 'Alarmas', tenedores: 'Tenedores', calculadora: 'Calculadora', asambleas: 'Asambleas' },
            housingIntro: 'Organización de inquilinos — huelgómetro, alarmas por desahucios, campañas por gran tenedor, calculadora de alquiler y asambleas locales.',
            /* Vivienda ampliado (13-07-2026): tenedores, calculadora, asambleas, acompañamiento */
            housingEscortBtn: '🤝 Me apunto al acompañamiento',
            housingEscortCount: 'apuntadas al piquete',
            housingTenedoresTitle: 'Grandes tenedores',
            housingTenedoresIntro: 'Fondos, socimis y banca con vivienda a escala — negociación colectiva finca a finca, al estilo «Nos Quedamos».',
            housingTenedoresBuildings: 'fincas organizadas',
            housingTenedoresUnits: 'viviendas',
            housingTenedoresProgress: 'progreso de negociación colectiva',
            housingTenedoresUnionCta: 'Organizado con el sindicato de inquilinas',
            housingCalcTitle: 'Calculadora de alquiler',
            housingCalcIntro: 'Compara tu renta con el índice de referencia de tu zona (índice demo).',
            housingCalcTerritory: 'Zona',
            housingCalcM2: 'Superficie (m²)',
            housingCalcRent: 'Tu alquiler mensual (€)',
            housingCalcBtn: 'Comprobar mi alquiler',
            housingCalcReference: 'Renta de referencia para esta vivienda',
            housingCalcOver: 'por encima del índice de referencia',
            housingCalcUnder: 'por debajo del índice de referencia',
            housingCalcAdvice: 'Si pagas por encima del índice, tu asamblea local y el sindicato de inquilinas pueden ayudarte a negociarlo a la baja.',
            housingCalcInvalid: 'Introduce superficie y renta para hacer la comprobación.',
            housingAsambleasTitle: 'Asambleas locales',
            housingAsambleasIntro: 'Asambleas de inquilinas por zona — reuniones abiertas, cada una con su grupo de Telegram.',
            housingAsambleasMembers: 'miembros',
            housingAsambleasMeets: 'Se reúne',
            housingAsambleasTerritoryBtn: 'Perfil del territorio',
            housingHuelgometroTitle: 'Huelgómetro',
            housingHuelgometroIntro: 'Recuento nacional de inquilinos comprometidos con una huelga de alquileres. Al llegar a 1.000.000 de compromisos confirmados, se convoca.',
            housingThresholdLabel: 'inquilinos comprometidos (meta: 1.000.000)',
            housingPledgeBtn: 'Me comprometo con la huelga de alquileres',
            housingAlarmasTitle: 'Alarmas por desahucios',
            housingAlarmasIntro: 'Todos los desahucios programados y casos en riesgo de cada territorio, en un solo tablón.',
            badges: { verified: 'Trabajadores verificados', ai: 'Asistencia IA', neutral: 'Plataforma neutral' },
            reportTypes: {
                overtime: 'Horas extra no pagadas',
                blackWages: 'Sueldo en negro',
                lowPay: 'Por debajo del convenio',
                abuse: 'Acoso o abuso'
            },
            locationBridgeTitle: 'Puente mapa ↔ empresa',
            locationBridgeBody: 'El pin está resaltado en el mapa de arriba. Usa los botones de sección para denuncias, sueldos, convenio o acción — o elige otra empresa en el mapa.',
            locationCoords: 'Coordenadas',
            locationOpenOverview: 'Abrir resumen',
            locationOpenReports: 'Ver denuncias',
            reportFormTitle: 'Enviar denuncia anónima',
            reportFormDetail: 'Describe el problema (opcional)',
            reportFormSubmit: 'Enviar a moderación',
            reportFormAiNote: 'La pre-revisión IA filtra duplicados y entradas de mala fe antes de la revisión humana.',
            moderationTitle: 'Cola de moderación',
            moderationPending: 'Pendiente',
            moderationApproved: 'Aprobada',
            moderationRejected: 'Rechazada',
            moderationApprove: 'Aprobar',
            moderationReject: 'Rechazar',
            moderationEmpty: 'No hay denuncias en este estado.',
            privateForumTitle: 'Sala privada de trabajadores',
            privateForum: 'Sala privada con sindicato anfitrión — filtra dirección y topas. Verificación necesaria para entrar.',
            privateForumRules: 'Moderada por delegada sindical. Sin nombre real obligatorio. Cuentas de dirección bloqueadas.',
            presenceTitle: 'Implantación',
            presenceDelegates: 'Delegados/as en empresa',
            presenceAgreements: 'Convenios firmados',
            presenceSectors: 'Sectores principales',
            members: 'Miembros en la plataforma',
            companiesOnSite: 'Empresas con presencia',
            selectUnion: 'Seleccionar sindicato…',
            unionsPick: 'Elige un sindicato o pulsa cualquier nombre de sindicato en la plataforma.',
            unionSearchPlaceholder: 'Buscar por sindicato o sector…',
            unionBack: 'Volver a sindicatos',
            unionRelatedTitle: 'Otros sindicatos en este sector',
            unionsStatCount: 'Sindicatos en el directorio',
            unionsStatMembers: 'Afiliación conjunta',
            unionsStatDelegates: 'Delegadas en empresa (conjunto)',
            unionFoundedLabel: 'Fundado en',
            unionWebsiteLabel: 'Sitio web oficial',
            unionMilestonesTitle: 'Hitos y victorias',
            unionHousingCompaniesNote: 'Este sindicato organiza fincas y comunidades de inquilinas, no empresas — por eso no aparece en la lista de empresas con presencia sindical.',
            unionSections: {
                overview: 'Resumen',
                forum: 'Foro',
                structure: 'Estructura',
                companies: 'Empresas'
            },
            unionForumIntro: 'Foro del sindicato — hilos de coordinación, avisos de delegadas y alertas sectoriales.',
            unionStructureIntro: 'Estructura organizativa — comités, delegadas y roles de enlace en SindicApp.',
            unionOverviewIntro: 'Perfil del sindicato en el directorio neutral SindicApp.',
            unionOpenForum: 'Abrir foro',
            unionOpenStructure: 'Ver estructura',
            convenioAskAi: 'Preguntar a la IA sobre el convenio',
            convenioAskPlaceholder: 'Pega una cláusula o describe tu duda…',
            convenioAskBtn: 'Explicar en lenguaje llano',
            convenioAiSample: 'Asistencia IA (demo): Esta cláusula limita las horas extra a 80 h/año salvo pacto. Si tu contrato dice otra cosa, denúncialo.',
            demoNote: 'Datos demo de SindicApp. En producción: cuentas verificadas, revisión legal y acuerdos con sindicatos.',
            forumBack: 'Volver al foro general',
            forumThreadMissing: 'Hilo no encontrado.',
            territoryDossierIntro: 'Dossier territorial — sindicatos presentes, empresas, foro de vivienda y alertas del territorio.',
            territoryWorkplaces: 'Empresas del territorio',
            territoryHousingLink: 'Abrir perfil del territorio',
            viviendaWorkplacesTitle: 'Empresas del territorio',
            viviendaWorkplacesIntro: 'Empleadores en este territorio — aquí suelen cruzarse luchas laborales y de vivienda.',
            fieldSubsector: 'Subsector (rama)',
            fieldTerritory: 'Territorio',
            selectSubsector: 'Elige subsector…',
            selectTerritory: 'Elige territorio…',
            addWorkplaceStep2: 'Paso 2 — clasificar en el árbol geográfico',
            strikeVoteYes: 'Me sumaría a una huelga legal',
            strikeVoteNo: 'Aún no estoy preparada/o',
            strikeVoteThanks: 'Voto registrado (demo — guardado en este navegador).',
            convenioBranchTitle: 'Cláusulas de rama (biblioteca de convenio)',
            mapTerritoryDossier: 'Dossier territorial',
            mapClearTerritory: 'Ver todos los territorios',
            aiConvenioHint: 'La asistencia IA de convenio explica cláusulas en lenguaje llano y señala artimañas habituales del empleador.',
            aiContractHint: 'Sube un contrato para revisión comunitaria y resumen IA de cláusulas de riesgo (demo).',
            fieldName: 'Nombre de empresa',
            fieldSector: 'Sector',
            fieldAddress: 'Dirección',
            fieldLat: 'Latitud',
            fieldLng: 'Longitud',
            workplacesIntro: 'Busca empresas en el mapa o elige una para abrir su perfil.',
            unionsIntro: 'Directorio neutral — CCOO, UGT, sindicatos sectoriales y más. Los datos de implantación (delegados, empresas, convenios) proceden de registros verificables, no de puntuaciones.',
            reportsIntro: 'Denuncias públicas anónimas. Revisión comunitaria + IA antes de publicar.',
            wagesIntro: 'Organigrama anónimo y bandas salariales aportadas por la comunidad.',
            wageConvenioRange: 'Rango según convenio:',
            actionIntro: 'Preparación de huelga, listas de confirmación y chat seguro.',
            strikeThreshold: 'umbral',
            actionPollActive: 'Sondeo activo — 12 días restantes',
            actionPrivateList: 'Lista de confirmación privada',
            actionCoordChat: 'Chat de coordinación (sindicato anfitrión)',
            officerLabel: 'Liberado/a',
            /* B4 (R1) — buscador de convenio + FAQ estructurado */
            finderTitle: '¿Qué convenio me aplica?',
            finderIntro: 'Elige tu sector para localizar el convenio colectivo que probablemente te cubre (directorio demo).',
            finderSector: 'Sector',
            finderSubmit: 'Buscar mi convenio',
            finderNoResult: 'Aún no hay entrada demo para ese sector.',
            finderScope: 'Ámbito',
            finderVigencia: 'Vigencia',
            finderSource: 'Consultar el registro oficial',
            finderDisclaimer: 'Directorio demo — confirma siempre en el registro oficial (BOE / autonómico) o con una delegada sindical.',
            faqItems: [
                { q: '¿Pueden cambiarme el turno sin avisar?', a: 'La mayoría de convenios exigen preaviso mínimo para cambios de cuadrante (a menudo 5–7 días). Revisa el capítulo de jornada de tu convenio; los cambios sin preaviso son impugnables.' },
                { q: '¿Me pagan más por trabajar de noche o en domingo?', a: 'Los convenios sectoriales suelen fijar pluses de nocturnidad (p. ej. +25%) y de domingo/festivo. Si tu nómina no refleja ningún plus, compárala con las tablas del convenio.' },
                { q: '¿Cuántos días de vacaciones me corresponden?', a: 'El mínimo legal son 30 días naturales (o 22 laborables); muchos convenios lo mejoran. Las vacaciones no se pueden sustituir por dinero salvo al terminar el contrato.' },
                { q: '¿Y si mi contrato contradice el convenio?', a: 'El convenio es suelo, no techo: una cláusula de contrato por debajo del mínimo de convenio es nula. La condición del convenio se aplica automáticamente.' },
                { q: '¿Con quién puedo hablar de forma confidencial?', a: 'Las delegadas sindicales tienen deber de sigilo, y esta plataforma permite comparar situaciones de forma anónima antes de dar ningún paso.' }
            ],
            faqOvertimeQ: '¿Cuántas horas extra al mes?',
            faqOvertimeA: 'Según el convenio sectorial, máximo 80 h/año salvo pacto.',
            faqContractQ: 'Subir mi contrato',
            noMatch: 'Ninguna empresa coincide con la búsqueda.',
            wageRoleBase: 'Operario/a base',
            wageRoleMid: 'Puesto intermedio',
            wageRoleLead: 'Mando intermedio',
            /* C2 — aportar sueldo */
            wageContribsTitle: 'Aportaciones de la comunidad (este navegador)',
            wageFormTitle: 'Aporta tu sueldo',
            wageFormHint: 'Anónimo — se guarda solo en este navegador (demo). Sin nombres, sin cuentas.',
            wageFormRole: 'Puesto',
            wageFormAmount: 'Importe bruto (€)',
            wageFormPeriod: 'Periodo',
            wageFormMonthly: 'Al mes',
            wageFormHourly: 'A la hora',
            wageFormSubmit: 'Aportar anónimamente',
            wagePerHour: '/ hora',
            wagePerMonth: '/ mes',
            officialChannelsTitle: 'Cauces oficiales',
            officialChannelsIntro: 'Una denuncia pública aquí informa a la plantilla; una denuncia oficial obliga a la Administración a actuar. Esta plataforma señaliza los cauces con fuerza legal real.',
            officialChannels: [
                { name: 'Inspección de Trabajo y Seguridad Social (ITSS)', url: 'https://www.mites.gob.es/itss/web/', desc: 'Denuncia formal con capacidad de inspección y sanción — jornada, salarios, seguridad y salud. Obliga a la Administración a actuar.' },
                { name: 'Canal interno de denuncias de la empresa', url: '', desc: 'Obligatorio por la Ley 2/2023 en empresas de 50 o más personas; protege legalmente a quien informa frente a represalias.' },
                { name: 'Agencia Española de Protección de Datos (AEPD)', url: 'https://www.aepd.es', desc: 'Autoridad de control para vulneraciones de datos personales en el trabajo (videovigilancia, geolocalización, ficheros de RRHH) — sus resoluciones son vinculantes.' }
            ],
            registryTitle: 'Datos registrales',
            registryLegalForm: 'Forma jurídica',
            registryFounded: 'Constitución',
            registryAdmins: 'Administradores',
            registryLastAccounts: 'Último depósito de cuentas',
            registryRevenue: 'Ingresos',
            registryResult: 'Resultado',
            registryEbitda: 'EBITDA (aprox.)',
            registrySource: 'Fuente: BORME / Registro Mercantil — datos de demostración',
            registryTagline: 'Conoce las cuentas de tu empresa antes de negociar.',
            calcTitle: 'Calculadora de convenio',
            calcIntro: 'Comprueba tu salario frente a la tabla salarial demo del convenio aplicable.',
            calcCategory: 'Categoría profesional (tabla demo del convenio)',
            calcSelectCategory: 'Selecciona categoría…',
            calcHours: 'Jornada semanal (horas)',
            calcSalary: 'Salario bruto (€)',
            calcPeriod: 'Periodo del salario',
            calcPeriodMonthly: 'Mensual (×12 — se asumen 12 pagas)',
            calcPeriodAnnual: 'Anual',
            calcSubmit: 'Comparar con el mínimo de convenio',
            calcAbove: 'Por encima del mínimo de convenio.',
            calcBelow: 'Por debajo del mínimo de convenio — puedes reclamar la diferencia.',
            calcMinLabel: 'Mínimo de convenio (prorrateado a tu jornada)',
            calcDiffLabel: 'Diferencia',
            calcDisclaimer: 'Resultado orientativo basado en una tabla salarial de demostración — no es asesoramiento legal. Consulta el texto íntegro del convenio o a tu delegado/a.',
            /* R4 — Agenda: la capa temporal */
            /* C4 — feedback de acciones (toasts) */
            notices: {
                reportQueued: 'Denuncia enviada a la cola de moderación.',
                strikeVoteSaved: 'Voto registrado (demo — guardado en este navegador).',
                agendaEventAdded: 'Evento añadido a la agenda.',
                endorsementRequested: 'Solicitud de aval enviada.',
                endorsementMissingUnion: 'Elige primero un sindicato garante.',
                companyAdded: 'Perfil de empresa creado.',
                companyFormInvalid: 'Nombre y dirección son obligatorios.',
                wageSubmitted: 'Aportación salarial guardada. Gracias.',
                pledgeSaved: 'Confirmación registrada (demo).'
            },
            agendaTitle: 'Agenda de acción',
            agendaUpcomingTitle: 'Próximas fechas',
            agendaViviendaTitle: 'Agenda de vivienda del territorio',
            agendaEmpty: 'Sin eventos próximos (demo).',
            agendaTypes: { assembly: 'Asamblea', vote: 'Votación', deadline: 'Plazo', strike: 'Huelga', negotiation: 'Negociación' },
            agendaAddTitle: 'Añadir evento (demo)',
            agendaFieldType: 'Tipo',
            agendaFieldDate: 'Fecha',
            agendaFieldTitle: 'Título',
            agendaAddSubmit: 'Añadir a la agenda',
            agendaAddHint: 'Demo: se guarda solo en este navegador.',
            /* R5 — Verificación como arquitectura */
            verificationTitle: 'Verificación',
            verificationCurrent: 'Nivel actual',
            trustLevels: { anon: 'Anónimo', person: 'Persona verificada', worker: 'Trabajador verificado' },
            trustLevelDesc: {
                anon: 'Nivel por defecto — sin datos de identidad. Suficiente para leer y para denunciar de forma anónima.',
                person: 'Se confirma que hay una persona real tras la cuenta — sigue siendo seudónima en la plataforma.',
                worker: 'Un sindicato avala que esta persona trabaja donde dice trabajar.'
            },
            verificationDoctrine: 'Los sindicatos actúan como garantes de identidad: cualquier sindicato puede avalar a un trabajador y ninguno es dueño de la plataforma. El aval protege este espacio del astroturfing empresarial sin exponer el nombre de nadie.',
            verifyRequestBtn: 'Solicitar aval sindical',
            verifySelectUnion: 'Selecciona sindicato garante',
            verifyPending: 'Pendiente de aval de',
            verifyConfirmBtn: 'El sindicato confirma (demo)',
            verifyDone: 'Trabajador verificado — avalado por',
            /* R7 — Perfiles automáticos de edificio */
            buildingsTitle: 'Edificios',
            buildingsIntro: 'Cada edificio recibe un perfil automático — estado, transparencia de rentas, derechos de contrato y acción colectiva.',
            buildingUnits: 'viviendas',
            buildingOwnerLabel: 'Propietario',
            buildingLargeHolder: 'Gran tenedor',
            buildingYearLabel: 'Construcción',
            buildingBack: 'Volver a edificios',
            buildingStateTitle: 'Estado',
            buildingStateIntro: 'Denuncias anónimas del estado del edificio, aportadas por la vecindad.',
            buildingStateModNote: 'Las denuncias pasan moderación comunitaria antes de publicarse, como las denuncias de empresa.',
            buildingStateEmpty: 'Aún no hay denuncias publicadas de este edificio (demo).',
            buildingRentsTitle: 'Rentas',
            buildingRentM2: 'Precio de zona por m²',
            buildingRentTypical: 'Alquiler típico de la zona',
            buildingRentIndexNote: 'Referencia: índice de referencia de precios de alquiler para la zona — consúltalo antes de firmar o renovar.',
            buildingContractTitle: 'Contrato y derechos',
            buildingContractFaq: [
                { q: '¿Cuánto dura mi contrato?', a: 'Con la LAU, prórroga obligatoria hasta 5 años (7 si el arrendador es persona jurídica), aunque el contrato firme un plazo menor.' },
                { q: '¿Qué fianza pueden pedirme?', a: 'Una mensualidad de fianza legal, más garantías adicionales limitadas. Debe depositarse en el organismo autonómico (INCASÒL en Catalunya).' },
                { q: '¿Cuánto puede subir el alquiler?', a: 'Durante el contrato, solo la actualización pactada dentro del límite legal. En zonas tensionadas, el índice de referencia limita el precio de los nuevos contratos.' }
            ],
            buildingActionTitle: 'Acción',
            buildingEvictionLinkNote: 'Vinculado a las alertas de desahucio del territorio — mismo canal, misma moderación.',
            tenantPledgeBtn: 'Me sumaría a una acción colectiva de inquilinos',
            tenantPledgeCount: 'confirmaciones (demo)',
            moduleLoadError: 'No se pudo cargar el módulo Sindicato.'
        }
    };

    const BASE_WORKPLACES = {
        ie: [
            { id: 'docklands-logistics', name: 'Dublin Docklands Logistics', sector: 'Logistics', subsectorId: 'logistics-warehousing', territoryId: 'dublin-docklands', address: 'North Wall Quay, Dublin 1', lat: 53.3482, lng: -6.2298, workers: 142, reports: 7, unions: ['SIPTU', 'Unite'], strikeSupport: 34, convenio: 'Road haulage & logistics SNA 2024', wageRange: '€14.20 – €19.80 / hr' },
            { id: 'temple-bar-hospitality', name: 'Temple Bar Hospitality Group', sector: 'Hospitality', subsectorId: 'hospitality-pubs', territoryId: 'dublin-city-centre', address: 'Fleet St, Dublin 2', lat: 53.3454, lng: -6.2642, workers: 89, reports: 12, unions: ['Unite'], strikeSupport: 58, convenio: 'Hotel & restaurant JLC', wageRange: '€12.70 – €16.50 / hr' },
            { id: 'st-james-medical', name: "St James's Medical Services", sector: 'Healthcare', subsectorId: 'healthcare-inpatient', territoryId: 'dublin-south', address: 'James St, Dublin 8', lat: 53.3415, lng: -6.2948, workers: 210, reports: 4, unions: ['INMO', 'SIPTU'], strikeSupport: 22, convenio: 'Health & social care sectoral', wageRange: '€32k – €48k / yr' },
            { id: 'silicon-docks-tech', name: 'Silicon Docks Tech Ltd', sector: 'Technology', subsectorId: 'technology-software', territoryId: 'dublin-docklands', address: 'Grand Canal Dock, Dublin 4', lat: 53.3428, lng: -6.2281, workers: 64, reports: 9, unions: ['FSU', 'Unite'], strikeSupport: 41, convenio: 'ICT services agreement', wageRange: '€38k – €72k / yr' },
            { id: 'grafton-retail', name: 'Grafton Retail Co-op', sector: 'Retail', subsectorId: 'retail-grocery', territoryId: 'dublin-city-centre', address: 'Grafton St, Dublin 2', lat: 53.3412, lng: -6.2598, workers: 37, reports: 5, unions: ['Mandate'], strikeSupport: 19, convenio: 'Retail grocery SNA', wageRange: '€13.50 – €17.20 / hr' },
            { id: 'cork-harbour-logistics', name: 'Cork Harbour Logistics', sector: 'Logistics', subsectorId: 'logistics-haulage', territoryId: 'cork-harbour', address: 'Tivoli, Cork', lat: 51.8985, lng: -8.4378, workers: 118, reports: 6, unions: ['SIPTU'], strikeSupport: 38, convenio: 'Road haulage & logistics SNA 2024', wageRange: '€14.00 – €18.90 / hr' },
            { id: 'patrick-street-pub', name: 'Patrick Street Pub Group', sector: 'Hospitality', subsectorId: 'hospitality-restaurants', territoryId: 'cork-city', address: 'Patrick St, Cork', lat: 51.8983, lng: -8.4731, workers: 52, reports: 9, unions: ['Unite'], strikeSupport: 49, convenio: 'Hotel & restaurant JLC', wageRange: '€12.50 – €15.80 / hr' },
            { id: 'cork-clinic', name: 'Cork Outpatient Clinic', sector: 'Healthcare', subsectorId: 'healthcare-outpatient', territoryId: 'cork-west', address: 'Wilton, Cork', lat: 51.8842, lng: -8.5123, workers: 88, reports: 3, unions: ['INMO'], strikeSupport: 24, convenio: 'Health & social care sectoral', wageRange: '€30k – €44k / yr' },
            { id: 'galway-medtech', name: 'Galway MedTech Ltd', sector: 'Technology', subsectorId: 'technology-consulting', territoryId: 'galway-city', address: 'Parkmore, Galway', lat: 53.2918, lng: -9.0218, workers: 71, reports: 5, unions: ['FSU', 'Unite'], strikeSupport: 33, convenio: 'ICT services agreement', wageRange: '€36k – €65k / yr' },
            { id: 'salthill-hotel', name: 'Salthill Hotel Collective', sector: 'Hospitality', subsectorId: 'hospitality-catering', territoryId: 'galway-coast', address: 'Salthill, Galway', lat: 53.2612, lng: -9.0867, workers: 44, reports: 7, unions: ['Unite'], strikeSupport: 42, convenio: 'Hotel & restaurant JLC', wageRange: '€12.40 – €16.10 / hr' },
            { id: 'limerick-distribution', name: 'Limerick Distribution Hub', sector: 'Logistics', subsectorId: 'logistics-last-mile', territoryId: 'limerick-dock', address: 'Dock Rd, Limerick', lat: 52.6638, lng: -8.6267, workers: 96, reports: 4, unions: ['SIPTU', 'Unite'], strikeSupport: 29, convenio: 'Road haulage & logistics SNA 2024', wageRange: '€13.90 – €18.20 / hr' },
            { id: 'castletroy-retail', name: 'Castletroy Retail Park', sector: 'Retail', subsectorId: 'retail-department', territoryId: 'limerick-east', address: 'Castletroy, Limerick', lat: 52.6734, lng: -8.5621, workers: 58, reports: 6, unions: ['Mandate'], strikeSupport: 21, convenio: 'Retail grocery SNA', wageRange: '€13.20 – €16.80 / hr' },
            { id: 'waterford-hospital', name: 'Waterford Regional Hospital (contract)', sector: 'Healthcare', subsectorId: 'healthcare-emergency', territoryId: 'waterford-city', address: 'Dunmore Rd, Waterford', lat: 52.2461, lng: -7.1389, workers: 165, reports: 5, unions: ['INMO', 'SIPTU'], strikeSupport: 27, convenio: 'Health & social care sectoral', wageRange: '€31k – €46k / yr' },
            { id: 'tramore-local-shop', name: 'Tramore Local Shop', sector: 'Retail', subsectorId: 'retail-local', territoryId: 'waterford-coast', address: 'Tramore, Waterford', lat: 52.1612, lng: -7.1498, workers: 19, reports: 2, unions: ['Mandate'], strikeSupport: 14, convenio: 'Retail grocery SNA', wageRange: '€12.90 – €15.50 / hr' },
            { id: 'enniscorthy-it', name: 'Enniscorthy IT Support', sector: 'Technology', subsectorId: 'technology-ops', territoryId: 'waterford-inland', address: 'Enniscorthy, Wexford', lat: 52.5008, lng: -6.5661, workers: 31, reports: 3, unions: ['FSU'], strikeSupport: 18, convenio: 'ICT services agreement', wageRange: '€28k – €48k / yr' }
        ],
        es: [
            { id: 'boqueria-hostaleria', name: 'Mercat Central Hostaleria SL', sector: 'Hostelería', subsectorId: 'hosteleria-restauracion', territoryId: 'barcelona-ciutat', address: 'Carrer de la Boqueria, Barcelona', lat: 41.3818, lng: 2.1719, workers: 76, reports: 11, unions: ['CCOO', 'UGT'], strikeSupport: 47, convenio: 'Hostelería de Barcelona 2024', wageRange: '1.180 – 1.650 € / mes' },
            { id: 'zona-franca-logistica', name: 'Polígon Nord Logística', sector: 'Logística', subsectorId: 'logistica-almacen', territoryId: 'barcelona-ponent', address: 'Zona Franca, Barcelona', lat: 41.3521, lng: 2.1384, workers: 198, reports: 8, unions: ['CCOO', 'CGT'], strikeSupport: 52, convenio: 'Transporte y logística Cataluña', wageRange: '1.350 – 1.920 € / mes' },
            { id: 'clinica-sant-pere', name: 'Clínica Privada Sant Pere', sector: 'Sanidad privada', subsectorId: 'sanidad-privada-consultas', territoryId: 'barcelona-ciutat', address: 'Carrer Sant Pere, Barcelona', lat: 41.3889, lng: 2.1765, workers: 124, reports: 6, unions: ['CCOO', 'SAT'], strikeSupport: 31, convenio: 'Sanidad privada Cataluña', wageRange: '1.600 – 2.400 € / mes' },
            { id: 'techpark-solutions', name: 'TechPark Solutions', sector: 'Tecnología', subsectorId: 'tecnologia-desarrollo', territoryId: 'barcelona-litoral', address: '22@, Poblenou, Barcelona', lat: 41.4032, lng: 2.1954, workers: 55, reports: 10, unions: ['UGT', 'CGT'], strikeSupport: 44, convenio: 'Consultoría y servicios IT', wageRange: '24k – 42k € / año' },
            { id: 'supermercat-diari', name: 'Supermercat Diari', sector: 'Comercio', subsectorId: 'comercio-alimentacion', territoryId: 'barcelona-ciutat', address: 'Eixample, Barcelona', lat: 41.3932, lng: 2.1641, workers: 42, reports: 4, unions: ['CCOO'], strikeSupport: 15, convenio: 'Comercio alimentación Cataluña', wageRange: '1.200 – 1.480 € / mes' },
            { id: 'hostal-girona-centre', name: 'Hostal Girona Centre', sector: 'Hostelería', subsectorId: 'hosteleria-bares', territoryId: 'girona-comarca', address: 'Plaça del Vi, Girona', lat: 41.9831, lng: 2.8249, workers: 34, reports: 5, unions: ['CCOO', 'UGT'], strikeSupport: 39, convenio: 'Hostelería Girona 2024', wageRange: '1.150 – 1.520 € / mes' },
            { id: 'logistica-costa-brava', name: 'Logística Costa Brava', sector: 'Logística', subsectorId: 'logistica-ultima-milla', territoryId: 'girona-costa', address: 'Polígon Blanes, Girona', lat: 41.6754, lng: 2.7901, workers: 67, reports: 4, unions: ['CCOO'], strikeSupport: 36, convenio: 'Transporte y logística Cataluña', wageRange: '1.320 – 1.780 € / mes' },
            { id: 'centre-ripoll', name: 'Centre Mèdic Ripoll', sector: 'Sanidad privada', subsectorId: 'sanidad-privada-urgencias', territoryId: 'girona-interior', address: 'Ripoll, Girona', lat: 42.2012, lng: 2.1903, workers: 48, reports: 3, unions: ['SAT', 'CCOO'], strikeSupport: 28, convenio: 'Sanidad privada Cataluña', wageRange: '1.550 – 2.200 € / mes' },
            { id: 'super-lleida', name: 'Supermercat Ponent', sector: 'Comercio', subsectorId: 'comercio-gran-superficie', territoryId: 'lleida-segria', address: 'Carrer Major, Lleida', lat: 41.6176, lng: 0.6200, workers: 89, reports: 5, unions: ['CCOO', 'UGT'], strikeSupport: 22, convenio: 'Comercio alimentación Cataluña', wageRange: '1.220 – 1.510 € / mes' },
            { id: 'transport-ponent', name: 'Transport Ponent SL', sector: 'Logística', subsectorId: 'logistica-transporte', territoryId: 'lleida-noguera', address: 'Balaguer, Lleida', lat: 41.7912, lng: 0.8103, workers: 112, reports: 6, unions: ['CCOO', 'CGT'], strikeSupport: 41, convenio: 'Transporte y logística Cataluña', wageRange: '1.340 – 1.880 € / mes' },
            { id: 'hotel-seu-urgell', name: 'Hotel La Seu Catering', sector: 'Hostelería', subsectorId: 'hosteleria-catering', territoryId: 'lleida-alt-urgell', address: 'La Seu d\'Urgell, Lleida', lat: 42.3581, lng: 1.4621, workers: 29, reports: 2, unions: ['UGT'], strikeSupport: 33, convenio: 'Hostelería Pirineo 2024', wageRange: '1.140 – 1.490 € / mes' },
            { id: 'hospital-tarragona', name: 'Hospital Privat Tarragona', sector: 'Sanidad privada', subsectorId: 'sanidad-privada-hospitalizacion', territoryId: 'tarragona-camp', address: 'Tarragona', lat: 41.1189, lng: 1.2445, workers: 156, reports: 7, unions: ['CCOO', 'SAT'], strikeSupport: 35, convenio: 'Sanidad privada Cataluña', wageRange: '1.650 – 2.500 € / mes' },
            { id: 'port-ebre-logistics', name: 'Port Ebre Logística', sector: 'Logística', subsectorId: 'logistica-transporte', territoryId: 'tarragona-ebre', address: 'Tortosa, Tarragona', lat: 40.8126, lng: 0.5210, workers: 74, reports: 4, unions: ['CCOO'], strikeSupport: 30, convenio: 'Transporte y logística Cataluña', wageRange: '1.310 – 1.820 € / mes' },
            { id: 'priorat-vinyes', name: 'Cooperativa Priorat', sector: 'Comercio', subsectorId: 'comercio-barrio', territoryId: 'tarragona-priorat', address: 'Falset, Tarragona', lat: 41.1432, lng: 0.6621, workers: 22, reports: 1, unions: ['USOC'], strikeSupport: 19, convenio: 'Comercio alimentación Cataluña', wageRange: '1.180 – 1.420 € / mes' },
            { id: 'manresa-metal', name: 'Manresa Metal IT', sector: 'Tecnología', subsectorId: 'tecnologia-soporte', territoryId: 'central-bages', address: 'Manresa, Barcelona', lat: 41.7298, lng: 1.8290, workers: 41, reports: 4, unions: ['UGT', 'CCOO'], strikeSupport: 37, convenio: 'Consultoría y servicios IT', wageRange: '22k – 38k € / año' },
            { id: 'vic-consulting', name: 'Vic Consulting Tech', sector: 'Tecnología', subsectorId: 'tecnologia-consultoria', territoryId: 'central-osona', address: 'Vic, Barcelona', lat: 41.9301, lng: 2.2540, workers: 38, reports: 3, unions: ['CGT'], strikeSupport: 32, convenio: 'Consultoría y servicios IT', wageRange: '23k – 40k € / año' },
            { id: 'igualada-textil', name: 'Igualada Textil Comerç', sector: 'Comercio', subsectorId: 'comercio-barrio', territoryId: 'central-anoia', address: 'Igualada, Barcelona', lat: 41.5789, lng: 1.6172, workers: 27, reports: 2, unions: ['CCOO'], strikeSupport: 17, convenio: 'Comercio alimentación Cataluña', wageRange: '1.190 – 1.450 € / mes' }
        ]
    };

    /* Union metadata (founded/website/about) reflects real organisations and was verified
       via web search on 2026-07-12 — sources noted in docs/changelog. Membership/delegate
       counts for the pre-existing demo unions (siptu/unite/inmo/mandate/fsu/ccoo/ugt/cgt/
       csc/usoc/sat) are illustrative and unchanged; llogateres and iac are new entries with
       real recent figures. */
    const UNIONS = {
        ie: [
            { id: 'siptu', name: 'SIPTU', sector: 'General', delegates: 240, agreements: 36, mainSectors: 'General, logistics, healthcare', members: 18400, liberado: 'Niamh O\'Connell',
                founded: 1990, website: 'https://www.siptu.ie/',
                about: 'Ireland\'s largest trade union, formed in 1990 by the merger of the Irish Transport and General Workers\' Union (ITGWU) and the Federated Workers\' Union of Ireland (FWUI).' },
            { id: 'unite', name: 'Unite the Union', sector: 'General', delegates: 130, agreements: 21, mainSectors: 'General, hospitality', members: 9200, liberado: 'James Murphy',
                founded: 2007, website: 'https://unitetheunionireland.org/',
                about: 'Formed in 2007 by the merger of Amicus and the Transport and General Workers\' Union (TGWU), Unite organises across Ireland and Britain in manufacturing, transport and hospitality.' },
            { id: 'inmo', name: 'INMO', sector: 'Nursing', delegates: 85, agreements: 12, mainSectors: 'Nursing & midwifery', members: 4100, liberado: '—',
                founded: 1919, website: 'https://www.inmo.ie/',
                about: 'Ireland\'s professional trade union for nurses and midwives, founded in 1919 by a small group who met in Dublin to discuss working conditions.' },
            { id: 'mandate', name: 'Mandate', sector: 'Retail & bar', delegates: 60, agreements: 14, mainSectors: 'Retail & bar', members: 2800, liberado: 'Sarah Lynch',
                founded: 1994, website: 'https://mandate.ie/',
                about: 'Formed in 1994 by the merger of two retail-sector unions (IDATU and INUVGATA), Mandate organises workers in retail, bar and administrative roles.' },
            { id: 'fsu', name: 'FSU', sector: 'Finance & tech', delegates: 25, agreements: 6, mainSectors: 'Finance & tech', members: 1500, liberado: '—',
                founded: 1918, website: 'https://www.fsunion.org/',
                about: 'Founded in 1918 as the Irish Bank Officials Association (IBOA), it rebranded as the Financial Services Union in 2016 to reflect its wider finance-sector membership.' }
        ],
        es: [
            /* Sindicat de Llogateres — sindicato de inquilinas real (no laboral), añadido a
               petición expresa 12-07-2026, con datos verificados en sindicatdellogateres.org
               y Viquipèdia. Primera entrada de la lista. */
            { id: 'llogateres', name: 'Sindicat de Llogateres', sector: 'Vivienda de alquiler', type: 'housing',
                delegates: 20, agreements: 3, mainSectors: 'Inquilinato en Catalunya', members: 5880, liberado: '—',
                founded: 2017, website: 'https://sindicatdellogateres.org/',
                about: 'Sindicato horizontal, asambleario y apartidista de personas inquilinas, presentado en el Casinet d\'Hostafrancs de Barcelona el 12 de mayo de 2017. Organiza secciones por barrio, municipio y por gran tenedor (Blackstone, La Caixa…) para negociar colectivamente contratos y frenar subidas de alquiler con la estrategia "Nos Quedamos". Se financia únicamente con las cuotas de afiliación.',
                buildingsOrganized: 80,
                presenceLabels: { delegates: 'Secciones territoriales', companies: 'Fincas organizadas', agreements: 'Grandes reformas legales', sectors: 'Ámbito' },
                milestones: [
                    { year: 2017, text: 'Presentación pública en el Casinet d\'Hostafrancs ante 1.000 personas (12 de mayo).' },
                    { year: 2018, text: 'Lanzamiento de "Nos Quedamos", la estrategia de negociación colectiva por finca.' },
                    { year: 2019, text: 'Primera reforma legislativa conseguida: contratos de 5-7 años y honorarios de agencia a cargo del propietario.' },
                    { year: 2020, text: 'Aprobación de la Llei 11/2020 de contención de rentas en Catalunya.' },
                    { year: 2023, text: 'Ley estatal por el Derecho a la Vivienda: fin de los honorarios de agencia para las inquilinas.' },
                    { year: 2025, text: 'Más de 5.880 personas afiliadas y 80 fincas organizadas en toda Catalunya.' }
                ] },
            { id: 'ccoo', name: 'CCOO', sector: 'General', delegates: 420, agreements: 58, mainSectors: 'General, industria, servicios', members: 42000, liberado: 'Marina Soler',
                founded: 1976, website: 'https://es.ccoo.cat/',
                about: 'Uno de los dos sindicatos mayoritarios del Estado español, con origen en las comisiones obreras clandestinas de los años 60 y constituido como confederación sindical en la Asamblea de Barcelona de 1976.' },
            { id: 'ugt', name: 'UGT', sector: 'General', delegates: 360, agreements: 51, mainSectors: 'General, transporte, comercio', members: 31000, liberado: 'Pere Vidal',
                founded: 1888, website: 'https://www.ugt.cat/',
                about: 'Sindicato histórico de tradición socialista, fundado en Barcelona en 1888 por Pablo Iglesias Posse. Junto con CCOO, es una de las dos organizaciones sindicales mayoritarias en Catalunya.' },
            { id: 'cgt', name: 'CGT', sector: 'General', delegates: 95, agreements: 9, mainSectors: 'General, logística, tecnología', members: 8500, liberado: 'Laia Ferrer',
                founded: 1989, website: 'https://cgtcatalunya.cat/',
                about: 'Sindicato de tradición anarcosindicalista, adoptó el nombre CGT en 1989 tras la escisión de la CNT. Tercera fuerza por delegadas en Catalunya, con fuerte implantación en transporte, educación, banca y correos.' },
            { id: 'csc', name: 'Intersindical CSC', sector: 'Catalunya', delegates: 70, agreements: 8, mainSectors: 'Intersectorial (Catalunya)', members: 4200, liberado: '—',
                founded: 1990, website: 'https://www.intersindical-csc.cat/',
                about: 'Sindicato independentista catalán, miembro de la Federación Sindical Mundial. Impulsa un marco de relaciones laborales propio para Catalunya.' },
            { id: 'usoc', name: 'USOC', sector: 'Servicios', delegates: 32, agreements: 5, mainSectors: 'Servicios', members: 2100, liberado: 'Jordi Mas',
                founded: 1966, website: 'https://usoc.cat/',
                about: 'Federación catalana de la Unió Sindical Obrera, nacida en 1966 de una generación de trabajadores de posguerra, con vocación de sindicalismo autónomo y plural.' },
            /* IAC — confederación sindical real, añadida 12-07-2026 junto con Llogateres.
               Datos verificados vía Viquipèdia / prensa (Público, cronicaglobal). */
            { id: 'iac', name: 'IAC (Intersindical Alternativa de Catalunya)', sector: 'Sector público', delegates: 7, agreements: 2, mainSectors: 'Enseñanza, función pública, sector públic', members: 14000, liberado: '—',
                founded: 1997, website: 'https://iac.cat/',
                about: 'Confederación de sindicatos sectoriales combativos y asamblearios, constituida en 1997. Cuarta fuerza sindical en afiliación en Catalunya y primera en representación en enseñanza y en la Administración de la Generalitat.',
                presenceLabels: { delegates: 'Sindicatos confederados', agreements: 'Ámbitos con 1ª fuerza sindical' } },
            { id: 'sat', name: 'SAT (sectorial)', sector: 'Sanidad', delegates: 28, agreements: 4, mainSectors: 'Sanidad privada', members: 1800, liberado: '—' }
        ]
    };

    const FEED = {
        ie: [
            { id: 'f1', type: 'report', workplaceId: 'temple-bar-hospitality', section: 'reports', workplace: 'Temple Bar Hospitality Group', text: '3 new anonymous reports: unpaid closing shifts, tip pooling by management.', time: '2h ago', hot: true },
            { id: 'f2', type: 'wage', workplaceId: 'docklands-logistics', section: 'wages', workplace: 'Dublin Docklands Logistics', text: 'Night-shift pallet rate updated in crowd-sourced wage chart — €16.10 median.', time: '5h ago', hot: false },
            { id: 'f3', type: 'strike', workplaceId: 'silicon-docks-tech', section: 'action', workplace: 'Silicon Docks Tech Ltd', text: 'Strike readiness poll at 41% — needs 55% to schedule action window.', time: '8h ago', hot: true },
            { id: 'f4', type: 'convenio', workplaceId: 'grafton-retail', section: 'convenio', workplace: 'Grafton Retail Co-op', text: 'AI convenio assist answered: Sunday premium clause applies after 6 months tenure.', time: '1d ago', hot: false },
            { id: 'f5', type: 'union', unionId: 'inmo', workplaceId: 'st-james-medical', section: 'forum', workplace: "St James's Medical Services", text: 'INMO posted liberado contact and FAQ on roster-change rights.', time: '1d ago', hot: false }
        ],
        es: [
            { id: 'f1', type: 'report', workplaceId: 'boqueria-hostaleria', section: 'reports', workplace: 'Mercat Central Hostaleria SL', text: '4 denuncias nuevas: turnos partidos sin compensación, propinas retenidas.', time: 'hace 2h', hot: true },
            { id: 'f2', type: 'wage', workplaceId: 'zona-franca-logistica', section: 'wages', workplace: 'Polígon Nord Logística', text: 'Actualizado organigrama anónimo — carretillero 1.720 € media mensual.', time: 'hace 4h', hot: false },
            { id: 'f3', type: 'strike', workplaceId: 'techpark-solutions', section: 'action', workplace: 'TechPark Solutions', text: 'Sondeo de huelga al 44% — umbral de convocatoria en 55%.', time: 'hace 6h', hot: true },
            { id: 'f4', type: 'convenio', workplaceId: 'supermercat-diari', section: 'convenio', workplace: 'Supermercat Diari', text: 'Asistencia IA: el plus de festivo del convenio aplica desde el primer mes.', time: 'hace 1d', hot: false },
            { id: 'f5', type: 'union', unionId: 'ccoo', workplaceId: 'clinica-sant-pere', section: 'forum', workplace: 'Clínica Privada Sant Pere', text: 'CCOO publicó contacto de delegada y alerta sobre cambios de turno.', time: 'hace 1d', hot: false }
        ]
    };

    const REPORTS_BY_WORKPLACE = {
        'docklands-logistics': [{ type: 'overtime', count: 3, severity: 'high' }, { type: 'lowPay', count: 2, severity: 'medium' }, { type: 'abuse', count: 2, severity: 'medium' }],
        'temple-bar-hospitality': [{ type: 'overtime', count: 5, severity: 'high' }, { type: 'blackWages', count: 4, severity: 'high' }, { type: 'abuse', count: 3, severity: 'high' }],
        'st-james-medical': [{ type: 'overtime', count: 2, severity: 'medium' }, { type: 'lowPay', count: 1, severity: 'low' }, { type: 'abuse', count: 1, severity: 'medium' }],
        'silicon-docks-tech': [{ type: 'overtime', count: 4, severity: 'high' }, { type: 'lowPay', count: 3, severity: 'medium' }, { type: 'abuse', count: 2, severity: 'medium' }],
        'grafton-retail': [{ type: 'overtime', count: 2, severity: 'medium' }, { type: 'lowPay', count: 2, severity: 'medium' }, { type: 'abuse', count: 1, severity: 'low' }],
        'boqueria-hostaleria': [{ type: 'overtime', count: 4, severity: 'high' }, { type: 'blackWages', count: 3, severity: 'high' }, { type: 'abuse', count: 4, severity: 'high' }],
        'zona-franca-logistica': [{ type: 'overtime', count: 3, severity: 'high' }, { type: 'lowPay', count: 3, severity: 'medium' }, { type: 'abuse', count: 2, severity: 'medium' }],
        'clinica-sant-pere': [{ type: 'overtime', count: 2, severity: 'medium' }, { type: 'lowPay', count: 2, severity: 'medium' }, { type: 'abuse', count: 2, severity: 'medium' }],
        'techpark-solutions': [{ type: 'overtime', count: 5, severity: 'high' }, { type: 'lowPay', count: 3, severity: 'medium' }, { type: 'abuse', count: 2, severity: 'high' }],
        'supermercat-diari': [{ type: 'overtime', count: 1, severity: 'low' }, { type: 'lowPay', count: 2, severity: 'medium' }, { type: 'abuse', count: 1, severity: 'low' }]
    };

    const WAGE_CHART = {
        'docklands-logistics': [{ role: 'Warehouse operative', wage: '€15.40/hr', votes: 28 }, { role: 'Forklift driver', wage: '€17.20/hr', votes: 19 }, { role: 'Shift supervisor', wage: '€19.80/hr', votes: 8 }],
        'boqueria-hostaleria': [{ role: 'Camarero/a', wage: '1.280 €', votes: 22 }, { role: 'Cocinero/a', wage: '1.450 €', votes: 14 }, { role: 'Encargado/a', wage: '1.620 €', votes: 6 }]
    };

    /* R3 — Datos registrales (BORME / Registro Mercantil · CRO). Demo data keyed by workplace id. */
    const REGISTRO_BY_WORKPLACE = {
        'docklands-logistics': { legalForm: 'Private company limited by shares (LTD)', founded: 2004, admins: 'K. Brennan, M. Doyle', lastAccounts: '2025', revenue: '€21.4m', result: '€1.3m', ebitda: '€2.6m' },
        'temple-bar-hospitality': { legalForm: 'Private company limited by shares (LTD)', founded: 2011, admins: 'F. Kavanagh', lastAccounts: '2025', revenue: '€9.8m', result: '€0.6m', ebitda: '€1.4m' },
        'st-james-medical': { legalForm: 'Designated Activity Company (DAC)', founded: 1998, admins: 'E. Whelan, P. Nolan', lastAccounts: '2025', revenue: '€24.6m', result: '€1.1m', ebitda: '€2.9m' },
        'silicon-docks-tech': { legalForm: 'Private company limited by shares (LTD)', founded: 2015, admins: 'A. Byrne, S. Patel', lastAccounts: '2025', revenue: '€12.7m', result: '€1.8m', ebitda: '€2.4m' },
        'grafton-retail': { legalForm: 'Co-operative society', founded: 1987, admins: 'Management committee (7 members)', lastAccounts: '2025', revenue: '€5.2m', result: '€0.2m', ebitda: '€0.5m' },
        'cork-harbour-logistics': { legalForm: 'Private company limited by shares (LTD)', founded: 2001, admins: 'D. O\'Leary', lastAccounts: '2025', revenue: '€17.9m', result: '€0.9m', ebitda: '€2.1m' },
        'patrick-street-pub': { legalForm: 'Private company limited by shares (LTD)', founded: 2009, admins: 'C. Barrett, N. Hayes', lastAccounts: '2025', revenue: '€5.6m', result: '€0.3m', ebitda: '€0.8m' },
        'cork-clinic': { legalForm: 'Designated Activity Company (DAC)', founded: 2006, admins: 'M. Fitzgerald', lastAccounts: '2025', revenue: '€10.3m', result: '€0.5m', ebitda: '€1.3m' },
        'galway-medtech': { legalForm: 'Private company limited by shares (LTD)', founded: 2013, admins: 'R. Conneely, L. Chen', lastAccounts: '2025', revenue: '€14.2m', result: '€1.5m', ebitda: '€2.2m' },
        'salthill-hotel': { legalForm: 'Private company limited by shares (LTD)', founded: 2010, admins: 'T. Flaherty', lastAccounts: '2025', revenue: '€4.7m', result: '€0.2m', ebitda: '€0.7m' },
        'limerick-distribution': { legalForm: 'Private company limited by shares (LTD)', founded: 2003, admins: 'J. Ryan, B. Collins', lastAccounts: '2025', revenue: '€14.8m', result: '€0.7m', ebitda: '€1.7m' },
        'castletroy-retail': { legalForm: 'Private company limited by shares (LTD)', founded: 1996, admins: 'G. Moloney', lastAccounts: '2025', revenue: '€8.9m', result: '€0.4m', ebitda: '€0.9m' },
        'waterford-hospital': { legalForm: 'Designated Activity Company (DAC)', founded: 2000, admins: 'S. Power, H. Walsh', lastAccounts: '2025', revenue: '€19.5m', result: '€0.8m', ebitda: '€2.3m' },
        'tramore-local-shop': { legalForm: 'Private company limited by shares (LTD)', founded: 1992, admins: 'P. Murphy', lastAccounts: '2024', revenue: '€1.6m', result: '€0.1m', ebitda: '€0.2m' },
        'enniscorthy-it': { legalForm: 'Private company limited by shares (LTD)', founded: 2016, admins: 'O. Redmond', lastAccounts: '2025', revenue: '€3.4m', result: '€0.3m', ebitda: '€0.5m' },
        'boqueria-hostaleria': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2008, admins: 'N. Camps, R. Ferré', lastAccounts: '2025', revenue: '6,8 M€', result: '0,4 M€', ebitda: '0,9 M€' },
        'zona-franca-logistica': { legalForm: 'Sociedad Anónima (S.A.)', founded: 1999, admins: 'Consejo de administración (5 miembros)', lastAccounts: '2025', revenue: '28,3 M€', result: '1,4 M€', ebitda: '3,2 M€' },
        'clinica-sant-pere': { legalForm: 'Sociedad Anónima (S.A.)', founded: 1995, admins: 'M. Roca, J. Español', lastAccounts: '2025', revenue: '14,9 M€', result: '0,7 M€', ebitda: '1,8 M€' },
        'techpark-solutions': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2014, admins: 'A. Puig, D. Kaur', lastAccounts: '2025', revenue: '9,6 M€', result: '1,1 M€', ebitda: '1,6 M€' },
        'supermercat-diari': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2005, admins: 'F. Vila', lastAccounts: '2025', revenue: '7,2 M€', result: '0,2 M€', ebitda: '0,5 M€' },
        'hostal-girona-centre': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2012, admins: 'C. Bosch', lastAccounts: '2025', revenue: '2,9 M€', result: '0,1 M€', ebitda: '0,4 M€' },
        'logistica-costa-brava': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2007, admins: 'E. Serrat, P. Font', lastAccounts: '2025', revenue: '9,4 M€', result: '0,5 M€', ebitda: '1,1 M€' },
        'centre-ripoll': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2010, admins: 'L. Casals', lastAccounts: '2025', revenue: '5,3 M€', result: '0,3 M€', ebitda: '0,7 M€' },
        'super-lleida': { legalForm: 'Sociedad Anónima (S.A.)', founded: 1993, admins: 'G. Torres, M. Pané', lastAccounts: '2025', revenue: '13,6 M€', result: '0,5 M€', ebitda: '1,2 M€' },
        'transport-ponent': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2002, admins: 'X. Solé', lastAccounts: '2025', revenue: '16,1 M€', result: '0,8 M€', ebitda: '1,9 M€' },
        'hotel-seu-urgell': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2015, admins: 'I. Ribó', lastAccounts: '2024', revenue: '2,3 M€', result: '0,1 M€', ebitda: '0,3 M€' },
        'hospital-tarragona': { legalForm: 'Sociedad Anónima (S.A.)', founded: 1997, admins: 'A. Queralt, S. Mestre', lastAccounts: '2025', revenue: '18,7 M€', result: '0,9 M€', ebitda: '2,4 M€' },
        'port-ebre-logistics': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2006, admins: 'J. Curto', lastAccounts: '2025', revenue: '10,2 M€', result: '0,5 M€', ebitda: '1,2 M€' },
        'priorat-vinyes': { legalForm: 'Sociedad Cooperativa', founded: 1984, admins: 'Consejo rector (6 miembros)', lastAccounts: '2024', revenue: '1,8 M€', result: '0,1 M€', ebitda: '0,2 M€' },
        'manresa-metal': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2011, admins: 'R. Comas, T. Oliva', lastAccounts: '2025', revenue: '5,1 M€', result: '0,4 M€', ebitda: '0,7 M€' },
        'vic-consulting': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2013, admins: 'M. Erra', lastAccounts: '2025', revenue: '4,6 M€', result: '0,4 M€', ebitda: '0,6 M€' },
        'igualada-textil': { legalForm: 'Sociedad Limitada (S.L.)', founded: 2001, admins: 'N. Claramunt', lastAccounts: '2024', revenue: '2,4 M€', result: '0,1 M€', ebitda: '0,3 M€' }
    };

    const CONVENIO_CLAUSES = {
        es: {
            'hosteleria-restauracion': [
                { title: 'Jornada y turnos partidos', body: 'Máximo 2 turnos partidos/semana salvo pacto escrito. Compensación mínima 30 min entre tramos en restauración Barcelona.' },
                { title: 'Plus nocturnidad', body: '22:00–06:00: plus del 25% sobre hora ordinaria según convenio hostelería Barcelona 2024.' }
            ],
            'logistica-almacen': [
                { title: 'Carretillero', body: 'Certificación vigente obligatoria. Empresa debe facilitar renovación en horario laboral.' },
                { title: 'Horas extra', body: 'Tope 80 h/año salvo acuerdo. Registro horario inalterable — denunciar manipulación.' }
            ],
            'sanidad-privada-consultas': [
                { title: 'Cambio de turno', body: 'Preaviso mínimo 5 días. Cambio unilateral sin compensación es impugnable.' }
            ],
            default: [
                { title: 'Horas extraordinarias', body: 'Tope anual 80 h salvo pacto colectivo. Deben constar en nómina con recargo legal.' }
            ]
        },
        ie: {
            'hospitality-restaurants': [
                { title: 'Split shifts', body: 'Maximum 2 split shifts per week unless collectively agreed. Minimum 30 min paid gap between segments.' },
                { title: 'Night premium', body: '22:00–06:00: 25% premium on ordinary rate under Hotel & Restaurant JLC.' }
            ],
            'logistics-warehousing': [
                { title: 'Forklift certification', body: 'Valid licence required. Employer must allow renewal during paid hours.' },
                { title: 'Overtime cap', body: '80 hours/year unless agreed. Time records must not be altered — report tampering.' }
            ],
            default: [
                { title: 'Overtime', body: 'Annual cap 80 hours unless collectively agreed. Must appear on payslip with legal premium.' }
            ]
        }
    };

    function getConvenioClausesForWorkplace(locale, wp) {
        const key = localeKey(locale);
        const lib = CONVENIO_CLAUSES[key] || CONVENIO_CLAUSES.ie;
        const subId = wp.subsectorId || '';
        return lib[subId] || lib.default || [];
    }

    /* R1 — Tablas salariales demo por locale Y por sector para la calculadora de convenio
       (mínimo anual a jornada completa de 40 h). Fase 3 C1: antes había una única tabla de
       hostelería que se mostraba también en empresas de logística, sanidad, etc. */
    const CONVENIO_SALARY_TABLES = {
        es: {
            'Hostelería': {
                label: 'Convenio de hostelería — tabla demo (salario mínimo anual, jornada completa)',
                categories: [
                    { id: 'es-hos-1', name: 'Nivel I — Jefe/a de cocina o de sala', annualMin: 24800 },
                    { id: 'es-hos-2', name: 'Nivel II — Cocinero/a, recepcionista', annualMin: 21900 },
                    { id: 'es-hos-3', name: 'Nivel III — Camarero/a, dependiente/a', annualMin: 19400 },
                    { id: 'es-hos-4', name: 'Nivel IV — Ayudante de cocina o sala', annualMin: 17800 },
                    { id: 'es-hos-5', name: 'Nivel V — Auxiliar, limpieza', annualMin: 16900 }
                ]
            },
            'Logística': {
                label: 'Convenio de transporte y logística — tabla demo (salario mínimo anual, jornada completa)',
                categories: [
                    { id: 'es-log-1', name: 'Grupo I — Jefe/a de tráfico o almacén', annualMin: 26400 },
                    { id: 'es-log-2', name: 'Grupo II — Mando intermedio, encargado/a de turno', annualMin: 23000 },
                    { id: 'es-log-3', name: 'Grupo III — Carretillero/a, conductor/a', annualMin: 20200 },
                    { id: 'es-log-4', name: 'Grupo IV — Operario/a de almacén, picking', annualMin: 18100 },
                    { id: 'es-log-5', name: 'Grupo V — Peón, auxiliar de carga', annualMin: 17000 }
                ]
            },
            'Sanidad privada': {
                label: 'Convenio de sanidad privada — tabla demo (salario mínimo anual, jornada completa)',
                categories: [
                    { id: 'es-san-1', name: 'Grupo I — Facultativo/a', annualMin: 32600 },
                    { id: 'es-san-2', name: 'Grupo II — Enfermería, fisioterapia', annualMin: 25800 },
                    { id: 'es-san-3', name: 'Grupo III — Técnico/a sanitario', annualMin: 21400 },
                    { id: 'es-san-4', name: 'Grupo IV — Auxiliar de enfermería', annualMin: 18600 },
                    { id: 'es-san-5', name: 'Grupo V — Celador/a, limpieza sanitaria', annualMin: 17200 }
                ]
            },
            'Tecnología': {
                label: 'Convenio de consultoría y TIC — tabla demo (salario mínimo anual, jornada completa)',
                categories: [
                    { id: 'es-tec-1', name: 'Área 1 — Jefatura de proyecto', annualMin: 33900 },
                    { id: 'es-tec-2', name: 'Área 2 — Analista, desarrollador/a senior', annualMin: 27600 },
                    { id: 'es-tec-3', name: 'Área 3 — Programador/a', annualMin: 22300 },
                    { id: 'es-tec-4', name: 'Área 4 — Técnico/a de soporte', annualMin: 19500 },
                    { id: 'es-tec-5', name: 'Área 5 — Operador/a, tareas auxiliares', annualMin: 17600 }
                ]
            },
            'Comercio': {
                label: 'Convenio de comercio — tabla demo (salario mínimo anual, jornada completa)',
                categories: [
                    { id: 'es-com-1', name: 'Grupo I — Encargado/a de establecimiento', annualMin: 23800 },
                    { id: 'es-com-2', name: 'Grupo II — Responsable de sección', annualMin: 21200 },
                    { id: 'es-com-3', name: 'Grupo III — Dependiente/a, cajero/a', annualMin: 18900 },
                    { id: 'es-com-4', name: 'Grupo IV — Reponedor/a, mozo/a de almacén', annualMin: 17500 },
                    { id: 'es-com-5', name: 'Grupo V — Ayudante, personal auxiliar', annualMin: 16800 }
                ]
            }
        },
        ie: {
            'Logistics': {
                label: 'Logistics & distribution — demo table (annual minimum, full-time)',
                categories: [
                    { id: 'ie-log-1', name: 'Warehouse / transport manager', annualMin: 36400 },
                    { id: 'ie-log-2', name: 'Shift supervisor', annualMin: 31900 },
                    { id: 'ie-log-3', name: 'Forklift driver', annualMin: 28700 },
                    { id: 'ie-log-4', name: 'Warehouse operative', annualMin: 26100 },
                    { id: 'ie-log-5', name: 'General operative (entry)', annualMin: 24300 }
                ]
            },
            'Hospitality': {
                label: 'Hospitality — demo table (annual minimum, full-time)',
                categories: [
                    { id: 'ie-hosp-1', name: 'Head chef / floor manager', annualMin: 33200 },
                    { id: 'ie-hosp-2', name: 'Chef de partie / receptionist', annualMin: 28100 },
                    { id: 'ie-hosp-3', name: 'Waiter / bartender', annualMin: 25200 },
                    { id: 'ie-hosp-4', name: 'Kitchen assistant', annualMin: 23900 },
                    { id: 'ie-hosp-5', name: 'Accommodation assistant', annualMin: 23400 }
                ]
            },
            'Healthcare': {
                label: 'Private healthcare — demo table (annual minimum, full-time)',
                categories: [
                    { id: 'ie-hc-1', name: 'Clinical nurse manager', annualMin: 41200 },
                    { id: 'ie-hc-2', name: 'Staff nurse', annualMin: 34500 },
                    { id: 'ie-hc-3', name: 'Healthcare technician', annualMin: 29300 },
                    { id: 'ie-hc-4', name: 'Healthcare assistant', annualMin: 26400 },
                    { id: 'ie-hc-5', name: 'Support / cleaning staff', annualMin: 24100 }
                ]
            },
            'Technology': {
                label: 'Tech & IT services — demo table (annual minimum, full-time)',
                categories: [
                    { id: 'ie-tech-1', name: 'Project lead', annualMin: 48600 },
                    { id: 'ie-tech-2', name: 'Senior developer / analyst', annualMin: 41800 },
                    { id: 'ie-tech-3', name: 'Developer', annualMin: 34200 },
                    { id: 'ie-tech-4', name: 'IT support technician', annualMin: 28900 },
                    { id: 'ie-tech-5', name: 'Operations assistant', annualMin: 25700 }
                ]
            },
            'Retail': {
                label: 'Retail ERO/JLC — demo table (annual minimum, full-time)',
                categories: [
                    { id: 'ie-ret-1', name: 'Department manager', annualMin: 35600 },
                    { id: 'ie-ret-2', name: 'Supervisor', annualMin: 31800 },
                    { id: 'ie-ret-3', name: 'Senior sales assistant / keyholder', annualMin: 29100 },
                    { id: 'ie-ret-4', name: 'Sales assistant (2+ years)', annualMin: 27300 },
                    { id: 'ie-ret-5', name: 'Sales assistant (entry)', annualMin: 25400 }
                ]
            }
        }
    };

    /* B4 (R1) — directorio demo de convenios por sector: «encuentra tu convenio».
       En producción esto sería una búsqueda real sobre el registro del BOE / autonómicos. */
    const CONVENIO_DIRECTORY = {
        es: {
            'Hostelería': { name: 'Convenio colectivo de hostelería de Cataluña', scope: 'Autonómico (Cataluña)', vigencia: '2024–2026', source: 'https://www.boe.es/buscar/convenios.php' },
            'Logística': { name: 'Convenio de transporte de mercancías y logística de Barcelona', scope: 'Provincial (Barcelona)', vigencia: '2024–2025', source: 'https://www.boe.es/buscar/convenios.php' },
            'Sanidad privada': { name: 'Convenio de sanidad privada de Cataluña', scope: 'Autonómico (Cataluña)', vigencia: '2023–2026', source: 'https://www.boe.es/buscar/convenios.php' },
            'Tecnología': { name: 'XVIII Convenio estatal de consultoría y TIC', scope: 'Estatal', vigencia: '2023–2026', source: 'https://www.boe.es/buscar/convenios.php' },
            'Comercio': { name: 'Convenio de comercio en general de Cataluña', scope: 'Autonómico (Cataluña)', vigencia: '2024–2026', source: 'https://www.boe.es/buscar/convenios.php' }
        },
        ie: {
            'Logistics': { name: 'Road haulage & distribution SNA', scope: 'Sectoral (national)', vigencia: '2024–2026', source: 'https://www.workplacerelations.ie/en/what_you_should_know/hours-and-wages/' },
            'Hospitality': { name: 'Hotel & restaurant JLC framework', scope: 'Sectoral (national)', vigencia: '2024–2025', source: 'https://www.workplacerelations.ie/en/what_you_should_know/hours-and-wages/' },
            'Healthcare': { name: 'Health & social care sectoral agreement', scope: 'Sectoral (national)', vigencia: '2023–2026', source: 'https://www.workplacerelations.ie/en/what_you_should_know/hours-and-wages/' },
            'Technology': { name: 'ICT services agreement (company-level norm)', scope: 'Company-level', vigencia: '2024–2026', source: 'https://www.workplacerelations.ie/en/what_you_should_know/hours-and-wages/' },
            'Retail': { name: 'Retail grocery SNA / ERO', scope: 'Sectoral (national)', vigencia: '2024–2026', source: 'https://www.workplacerelations.ie/en/what_you_should_know/hours-and-wages/' }
        }
    };

    function getConvenioDirectory(locale) {
        return CONVENIO_DIRECTORY[localeKey(locale)] || CONVENIO_DIRECTORY.ie;
    }

    function buildConvenioFinderHtml(locale, wp) {
        const c = t(locale);
        const dir = getConvenioDirectory(locale);
        const currentSector = wp && wp.sector && dir[wp.sector] ? wp.sector : '';
        const options = Object.keys(dir).map((sector) =>
            `<option value="${sector}"${sector === currentSector ? ' selected' : ''}>${sector}</option>`
        ).join('');
        return `<form class="sindicato-convenio-finder" data-sindicato-convenio-finder>
            <h4>${c.finderTitle}</h4>
            <p class="template-muted">${c.finderIntro}</p>
            <label>${c.finderSector}
                <select name="sector">${options}</select>
            </label>
            <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.finderSubmit}</button>
            <div class="sindicato-finder-result" data-sindicato-finder-out hidden></div>
        </form>`;
    }

    function getConvenioFinderResultHtml(locale, sector) {
        const c = t(locale);
        const entry = getConvenioDirectory(locale)[sector];
        if (!entry) return `<p>${c.finderNoResult}</p>`;
        return `<p><strong>${entry.name}</strong></p>
            <p>${c.finderScope}: ${entry.scope} · ${c.finderVigencia}: ${entry.vigencia}</p>
            <p><a href="${entry.source}" target="_blank" rel="noopener">${c.finderSource}</a></p>
            <p class="sindicato-note">${c.finderDisclaimer}</p>`;
    }

    function getConvenioSalaryTable(locale, wp) {
        const tables = CONVENIO_SALARY_TABLES[localeKey(locale)] || CONVENIO_SALARY_TABLES.ie;
        const sector = wp && wp.sector ? String(wp.sector).trim() : '';
        if (sector && tables[sector]) return tables[sector];
        /* empresas con sector libre (alta manual): primera tabla del locale como fallback */
        return tables[Object.keys(tables)[0]];
    }

    function formatEuroAmount(locale, value) {
        return Number(value || 0).toLocaleString(locale === 'es' ? 'es-ES' : 'en-IE', { maximumFractionDigits: 0 });
    }

    /* ============================================================
       R4 — Agenda: la capa temporal (docs/REFORMAS-PROPUESTAS.md).
       Eventos demo por empresa y por territorio; los eventos añadidos
       por el usuario se guardan en localStorage (agendaEvents).
       ============================================================ */
    const AGENDA_BY_WORKPLACE = {
        /* ie */
        'docklands-logistics': [
            { date: '2026-07-17', type: 'assembly', title: 'Shift-floor assembly — night rates' },
            { date: '2026-08-05', type: 'negotiation', title: 'Logistics SNA talks — session 2' },
            { date: '2026-09-18', type: 'deadline', title: 'Deadline — roster consultation submissions' }
        ],
        'temple-bar-hospitality': [
            { date: '2026-07-22', type: 'assembly', title: 'Staff assembly — tip pooling' },
            { date: '2026-08-12', type: 'vote', title: 'Ballot on protective notice response' },
            { date: '2026-10-02', type: 'strike', title: 'Strike day (if ballot passes threshold)' }
        ],
        'st-james-medical': [
            { date: '2026-07-29', type: 'assembly', title: 'Ward assembly — safe staffing ratios' },
            { date: '2026-09-10', type: 'negotiation', title: 'Meeting with management — roster changes' }
        ],
        'silicon-docks-tech': [
            { date: '2026-08-06', type: 'vote', title: 'Vote — right-to-disconnect clause' },
            { date: '2026-08-25', type: 'deadline', title: 'Remote-work agreement sign-off deadline' }
        ],
        'grafton-retail': [
            { date: '2026-07-20', type: 'assembly', title: 'Members assembly — Sunday premium' },
            { date: '2026-10-08', type: 'negotiation', title: 'Annual pay review — first session' }
        ],
        'cork-harbour-logistics': [
            { date: '2026-08-19', type: 'assembly', title: 'Depot assembly — summer cover plan' },
            { date: '2026-09-24', type: 'vote', title: 'Vote on mobilisation calendar' }
        ],
        'patrick-street-pub': [
            { date: '2026-09-02', type: 'negotiation', title: 'JLC talks — split-shift compensation' },
            { date: '2026-09-29', type: 'deadline', title: 'Deadline — works council nominations' }
        ],
        'limerick-distribution': [
            { date: '2026-08-11', type: 'assembly', title: 'Warehouse assembly — heat protocol' },
            { date: '2026-10-14', type: 'deadline', title: 'Deadline — union election registration' }
        ],
        /* es */
        'boqueria-hostaleria': [
            { date: '2026-07-16', type: 'assembly', title: 'Asamblea de plantilla — turnos partidos' },
            { date: '2026-07-28', type: 'negotiation', title: 'Mesa del convenio de hostelería — 2ª sesión' },
            { date: '2026-09-04', type: 'deadline', title: 'Fin de plazo de alegaciones al calendario laboral' }
        ],
        'zona-franca-logistica': [
            { date: '2026-07-21', type: 'vote', title: 'Votación de huelga — cierre del sondeo' },
            { date: '2026-07-24', type: 'assembly', title: 'Asamblea informativa previa a la votación' },
            { date: '2026-10-01', type: 'strike', title: 'Jornada de huelga (si el sondeo supera el umbral)' }
        ],
        'clinica-sant-pere': [
            { date: '2026-07-30', type: 'assembly', title: 'Asamblea — ratios de enfermería' },
            { date: '2026-09-15', type: 'negotiation', title: 'Reunión con dirección — cambios de turno' }
        ],
        'techpark-solutions': [
            { date: '2026-08-03', type: 'vote', title: 'Votación — cláusula de desconexión digital' },
            { date: '2026-08-20', type: 'deadline', title: 'Plazo de firma del acuerdo de teletrabajo' }
        ],
        'supermercat-diari': [
            { date: '2026-07-19', type: 'assembly', title: 'Asamblea — horarios de domingo' },
            { date: '2026-10-13', type: 'negotiation', title: 'Revisión salarial anual — primera reunión' }
        ],
        'hospital-tarragona': [
            { date: '2026-08-27', type: 'assembly', title: 'Asamblea de plantas — plan de verano' },
            { date: '2026-09-22', type: 'deadline', title: 'Fin de plazo — bolsa de sustituciones' }
        ],
        'transport-ponent': [
            { date: '2026-09-09', type: 'negotiation', title: 'Mesa de transporte — tablas salariales' },
            { date: '2026-09-30', type: 'vote', title: 'Votación del calendario de movilizaciones' }
        ],
        'super-lleida': [
            { date: '2026-08-14', type: 'assembly', title: 'Asamblea — descansos en caja' },
            { date: '2026-10-06', type: 'deadline', title: 'Plazo de inscripción — elecciones sindicales' }
        ]
    };

    const AGENDA_BY_TERRITORY = {
        es: {
            'barcelona-ciutat': [
                { date: '2026-07-18', type: 'assembly', title: 'Asamblea de vecinos — bloque Balmes 120' },
                { date: '2026-09-01', type: 'deadline', title: 'Fin de moratoria — revisar lanzamientos previstos' }
            ],
            'barcelona-litoral': [
                { date: '2026-08-09', type: 'assembly', title: 'Asamblea PAH Litoral — calendario de otoño' }
            ],
            'girona-comarca': [
                { date: '2026-09-17', type: 'negotiation', title: 'Negociación con gran tenedor — pisos turísticos' }
            ]
        },
        ie: {
            'dublin-docklands': [
                { date: '2026-07-25', type: 'assembly', title: 'Tenant assembly — Mayor Street block' },
                { date: '2026-09-08', type: 'deadline', title: 'RPZ review submissions close' }
            ],
            'cork-city': [
                { date: '2026-08-15', type: 'assembly', title: 'Tenant union Cork — open assembly' }
            ],
            'galway-city': [
                { date: '2026-09-21', type: 'negotiation', title: 'Negotiation with receiver — Eyre Square flats' }
            ]
        }
    };

    const AGENDA_EVENT_TYPES = ['assembly', 'vote', 'deadline', 'strike', 'negotiation'];

    function agendaTypeLabel(locale, type) {
        const types = t(locale).agendaTypes || {};
        return types[type] || type;
    }

    function formatAgendaDate(locale, iso) {
        const d = new Date(`${iso}T12:00:00`);
        if (Number.isNaN(d.getTime())) return iso;
        return d.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-IE', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function isUpcomingAgendaEvent(ev) {
        const today = new Date();
        const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        return String(ev.date || '') >= todayIso;
    }

    function sortAgendaEvents(events) {
        return events.filter(isUpcomingAgendaEvent).sort((a, b) => String(a.date).localeCompare(String(b.date)));
    }

    function getAgendaForWorkplace(locale, workplaceId) {
        const wp = findWorkplace(locale, workplaceId);
        const custom = (loadState().agendaEvents || {})[workplaceId] || [];
        const base = AGENDA_BY_WORKPLACE[workplaceId] || [];
        return sortAgendaEvents([...base, ...custom].map((ev) => ({ ...ev, scope: ev.scope || wp?.name || '' })));
    }

    function addAgendaEvent(workplaceId, payload) {
        const entry = {
            date: String(payload.date || '').slice(0, 10),
            type: AGENDA_EVENT_TYPES.includes(payload.type) ? payload.type : 'assembly',
            title: String(payload.title || '').trim().slice(0, 120),
            custom: true
        };
        if (!workplaceId || !entry.date || !entry.title) return null;
        const state = loadState();
        state.agendaEvents = state.agendaEvents || {};
        state.agendaEvents[workplaceId] = state.agendaEvents[workplaceId] || [];
        state.agendaEvents[workplaceId].push(entry);
        saveState(state);
        return entry;
    }

    function getAgendaForTerritory(locale, territoryId) {
        const terr = getSubterritoryById(locale, territoryId);
        const base = AGENDA_BY_TERRITORY[localeKey(locale)]?.[territoryId] || [];
        return sortAgendaEvents(base.map((ev) => ({ ...ev, scope: ev.scope || terr?.name || '' })));
    }

    function getUpcomingAgendaDigest(locale, limit) {
        const events = [];
        getWorkplaces(locale).forEach((wp) => {
            (AGENDA_BY_WORKPLACE[wp.id] || []).forEach((ev) => events.push({ ...ev, scope: wp.name }));
        });
        const subterritories = getSubterritories(locale);
        Object.entries(AGENDA_BY_TERRITORY[localeKey(locale)] || {}).forEach(([terrId, list]) => {
            const terr = subterritories.find((s) => s.id === terrId);
            list.forEach((ev) => events.push({ ...ev, scope: terr ? `${terr.parentName} / ${terr.name}` : terrId }));
        });
        return sortAgendaEvents(events).slice(0, limit || 5);
    }

    /** R4 — renderer único de agenda: lista cronológica sobria (fecha, chip de tipo, título, ámbito). */
    function buildAgendaHtml(locale, events, opts) {
        const c = t(locale);
        const o = opts || {};
        const rows = (events || []).map((ev) => `
            <li class="sindicato-agenda-item">
                <time class="sindicato-agenda-date" datetime="${ev.date}">${formatAgendaDate(locale, ev.date)}</time>
                <span class="sindicato-agenda-chip sindicato-agenda-chip--${ev.type}">${agendaTypeLabel(locale, ev.type)}</span>
                <span class="sindicato-agenda-body"><strong>${ev.title}</strong>${ev.scope ? `<span class="sindicato-agenda-scope">${ev.scope}</span>` : ''}</span>
            </li>`).join('');
        const list = rows
            ? `<ul class="sindicato-agenda-list${o.compact ? ' sindicato-agenda-list--compact' : ''}">${rows}</ul>`
            : `<p class="template-muted">${c.agendaEmpty}</p>`;
        return `<div class="sindicato-agenda">${o.title ? `<h3>${o.title}</h3>` : ''}${list}</div>`;
    }

    function buildAgendaAddFormHtml(locale, workplaceId) {
        const c = t(locale);
        const typeOptions = AGENDA_EVENT_TYPES.map((k) => `<option value="${k}">${agendaTypeLabel(locale, k)}</option>`).join('');
        return `<form class="sindicato-agenda-add" data-sindicato-agenda-form data-sindicato-workplace-id="${workplaceId}">
            <strong>${c.agendaAddTitle}</strong>
            <div class="sindicato-form-row">
                <label>${c.agendaFieldType}<select name="type" required>${typeOptions}</select></label>
                <label>${c.agendaFieldDate}<input type="date" name="date" required></label>
            </div>
            <label>${c.agendaFieldTitle}<input type="text" name="title" maxlength="120" required></label>
            <p class="sindicato-form-hint">${c.agendaAddHint}</p>
            <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.agendaAddSubmit}</button>
        </form>`;
    }

    /* ============================================================
       R5 — Verificación como arquitectura: niveles de confianza
       (anónimo → persona verificada → trabajador verificado) con
       sindicatos como garantes de identidad. Flujo demo en localStorage.
       ============================================================ */
    const FORUM_THREAD_TRUST = {
        ie: {
            'faq-delegate': 'worker',
            'convenio-hospitality': 'worker',
            'split-shift': 'anon',
            'rent-docklands': 'person',
            'hr-retaliation': 'anon',
            'pay-scales': 'worker',
            'nurse-ratios': 'worker',
            'remote-policy': 'person',
            'minutes-template': 'worker',
            'anonymous-report': 'person',
            'strike-fund': 'worker'
        },
        es: {
            'faq-delegado': 'worker',
            'convenio-hosteleria': 'worker',
            'turno-partido': 'anon',
            'desahucio-balmes': 'person',
            'filtracion-rrhh': 'anon',
            'tablas-salariales': 'worker',
            'ratios-sanidad': 'worker',
            'teletrabajo-22': 'person',
            'modelo-acta': 'worker',
            'denuncia-anonima': 'person',
            'fondo-huelga': 'worker'
        }
    };

    function forumThreadTrust(locale, slug) {
        return FORUM_THREAD_TRUST[localeKey(locale)]?.[slug] || 'person';
    }

    /** Las denuncias son mayoritariamente anónimas (ese es el sentido de la sección);
        las reclamaciones salariales suelen venir de cuentas avaladas. */
    function reportTrustLevel(type) {
        return type === 'lowPay' ? 'worker' : 'anon';
    }

    function buildTrustBadgeHtml(locale, level) {
        const c = t(locale);
        const lvl = c.trustLevels && c.trustLevels[level] ? level : 'anon';
        return `<span class="sindicato-trust-badge sindicato-trust-badge--${lvl}">${c.trustLevels[lvl]}</span>`;
    }

    function getVerification() {
        const v = loadState().verification;
        if (!v || typeof v !== 'object') return { level: 'anon', unionId: '', pending: false };
        return { level: v.level || 'anon', unionId: v.unionId || '', pending: Boolean(v.pending) };
    }

    function requestUnionEndorsement(unionId) {
        const state = loadState();
        state.verification = { level: 'anon', unionId: String(unionId || ''), pending: true };
        saveState(state);
        return state.verification;
    }

    function confirmUnionEndorsement() {
        const state = loadState();
        const v = state.verification;
        if (!v || !v.pending || !v.unionId) return v || null;
        state.verification = { level: 'worker', unionId: v.unionId, pending: false };
        saveState(state);
        return state.verification;
    }

    /** R5 — tarjeta de verificación (módulo Usuario → Resumen). */
    function buildVerificationCardHtml(locale) {
        const c = t(locale);
        const v = getVerification();
        const union = v.unionId ? findUnion(locale, v.unionId) : null;
        const ladder = ['anon', 'person', 'worker'].map((lvl) =>
            `<li class="${!v.pending && v.level === lvl ? 'is-current' : ''}">${buildTrustBadgeHtml(locale, lvl)}<span>${c.trustLevelDesc[lvl]}</span></li>`
        ).join('');
        let statusHtml;
        let actionHtml = '';
        if (v.level === 'worker' && union) {
            statusHtml = `${buildTrustBadgeHtml(locale, 'worker')} <span>${c.verifyDone} ${union.name}.</span>`;
        } else if (v.pending && union) {
            statusHtml = `${buildTrustBadgeHtml(locale, 'anon')} <span>${c.verifyPending} ${union.name}.</span>`;
            actionHtml = `<button type="button" class="sindicato-cta-btn" data-sindicato-verify-confirm>${c.verifyConfirmBtn}</button>`;
        } else {
            statusHtml = buildTrustBadgeHtml(locale, v.level);
            const unionOptions = getUnions(locale).map((u) => `<option value="${u.id}">${u.name}</option>`).join('');
            actionHtml = `<form class="sindicato-verify-form" data-sindicato-verify-request>
                <label>${c.verifySelectUnion}
                    <select name="unionId" required>
                        <option value="">${c.selectUnion}</option>
                        ${unionOptions}
                    </select>
                </label>
                <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.verifyRequestBtn}</button>
            </form>`;
        }
        return `<div class="sindicato-verification">
            <h3>${c.verificationTitle}</h3>
            <p class="sindicato-verify-status"><strong>${c.verificationCurrent}:</strong> ${statusHtml}</p>
            <ul class="sindicato-verify-ladder">${ladder}</ul>
            ${actionHtml}
            <p class="sindicato-verify-doctrine">${c.verificationDoctrine}</p>
        </div>`;
    }

    /* ============================================================
       R7 — Vivienda: perfil automático de edificio. Datos demo por
       territorio (edificios, estado, rentas) + lista de confirmación
       de acción colectiva de inquilinos en localStorage.
       ============================================================ */
    const BUILDINGS_BY_TERRITORY = {
        es: {
            'barcelona-ciutat': [
                { id: 'bcn-balmes-120', address: 'Carrer de Balmes 120', units: 24, owner: 'Vertex Patrimonial SOCIMI', largeHolder: true, year: 1931 },
                { id: 'bcn-consell-245', address: 'Carrer del Consell de Cent 245', units: 18, owner: 'Comunidad de propietarios', largeHolder: false, year: 1905 },
                { id: 'bcn-marina-88', address: 'Carrer de la Marina 88', units: 32, owner: 'Fons Residencial Iberia SL', largeHolder: true, year: 1978 },
                { id: 'bcn-gran-via-411', address: 'Gran Via de les Corts Catalanes 411', units: 28, owner: 'Inversiones Laietana SA', largeHolder: true, year: 1964 },
                { id: 'bcn-verdi-52', address: 'Carrer de Verdi 52 (Gràcia)', units: 10, owner: 'Propietario particular', largeHolder: false, year: 1922 }
            ],
            'barcelona-litoral': [
                { id: 'lit-rambla-poblenou-95', address: 'Rambla del Poblenou 95', units: 16, owner: 'Comunidad de propietarios', largeHolder: false, year: 1971 },
                { id: 'lit-pere-iv-140', address: 'Carrer de Pere IV 140', units: 22, owner: 'Blau Litoral Gestió SL', largeHolder: true, year: 1985 },
                { id: 'lit-maresme-310', address: 'Carrer del Maresme 310', units: 40, owner: 'Fons Residencial Iberia SL', largeHolder: true, year: 1992 },
                { id: 'lit-badalona-mar-12', address: 'Carrer del Mar 12, Badalona', units: 8, owner: 'Propietario particular', largeHolder: false, year: 1954 }
            ],
            'girona-comarca': [
                { id: 'gir-placa-vi-3', address: 'Plaça del Vi 3, Girona', units: 6, owner: 'Torrent Capital SL (fondo)', largeHolder: true, year: 1890 },
                { id: 'gir-santa-clara-44', address: 'Carrer de Santa Clara 44, Girona', units: 12, owner: 'Propietario particular', largeHolder: false, year: 1935 },
                { id: 'gir-migdia-77', address: 'Carrer Migdia 77, Girona', units: 20, owner: 'Habitatge Gironí SA', largeHolder: true, year: 1989 },
                { id: 'gir-salt-major-15', address: 'Carrer Major 15, Salt', units: 14, owner: 'Comunidad de propietarios', largeHolder: false, year: 1968 }
            ]
        },
        ie: {
            'dublin-docklands': [
                { id: 'dub-mayor-12', address: '12 Mayor Street Lower', units: 36, owner: 'Liffey Point Residential Fund', largeHolder: true, year: 2007 },
                { id: 'dub-sheriff-84', address: '84 Sheriff Street Upper', units: 20, owner: 'Private landlord', largeHolder: false, year: 1998 },
                { id: 'dub-castleforbes-3', address: '3 Castleforbes Road', units: 48, owner: 'Anchorage REIT', largeHolder: true, year: 2016 },
                { id: 'dub-eastwall-27', address: '27 East Wall Road', units: 9, owner: 'Private landlord', largeHolder: false, year: 1936 },
                { id: 'dub-northwall-56', address: '56 North Wall Quay', units: 30, owner: 'Docklands Living Ltd', largeHolder: true, year: 2011 }
            ],
            'cork-city': [
                { id: 'cork-patrick-45', address: '45 Patrick Street', units: 12, owner: 'Lee Valley Properties Ltd', largeHolder: true, year: 1902 },
                { id: 'cork-macurtain-18', address: '18 MacCurtain Street', units: 8, owner: 'Private landlord', largeHolder: false, year: 1911 },
                { id: 'cork-blackpool-60', address: '60 Great William O\'Brien Street, Blackpool', units: 16, owner: 'Shandon Residential Fund', largeHolder: true, year: 1995 },
                { id: 'cork-douglas-9', address: '9 Douglas Street', units: 6, owner: 'Private landlord', largeHolder: false, year: 1927 }
            ],
            'galway-city': [
                { id: 'gal-eyre-8', address: '8 Eyre Square', units: 10, owner: 'Corrib Asset Management (receivership)', largeHolder: true, year: 1898 },
                { id: 'gal-dominick-33', address: '33 Lower Dominick Street', units: 7, owner: 'Private landlord', largeHolder: false, year: 1904 },
                { id: 'gal-headford-120', address: '120 Headford Road', units: 42, owner: 'Atlantic Quarter REIT', largeHolder: true, year: 2019 },
                { id: 'gal-salthill-5', address: '5 Upper Salthill Road', units: 12, owner: 'Private landlord', largeHolder: false, year: 1975 }
            ]
        }
    };

    const BUILDING_CONDITION_REPORTS = {
        'bcn-balmes-120': [
            { issue: 'Humedades en escalera y bajos', count: 4, severity: 'high' },
            { issue: 'Ascensor averiado desde marzo', count: 6, severity: 'high' },
            { issue: 'Calefacción central sin revisión', count: 2, severity: 'medium' }
        ],
        'bcn-marina-88': [
            { issue: 'Grietas en fachada interior', count: 3, severity: 'medium' },
            { issue: 'Portero automático fuera de servicio', count: 2, severity: 'low' }
        ],
        'bcn-gran-via-411': [
            { issue: 'Bajante comunitaria con fugas', count: 3, severity: 'medium' }
        ],
        'gir-placa-vi-3': [
            { issue: 'Instalación eléctrica antigua', count: 2, severity: 'medium' }
        ],
        'dub-mayor-12': [
            { issue: 'Mould in stairwell and ground-floor flats', count: 4, severity: 'high' },
            { issue: 'Lift out of order since March', count: 5, severity: 'high' }
        ],
        'dub-castleforbes-3': [
            { issue: 'Ventilation faults in inner units', count: 3, severity: 'medium' }
        ],
        'cork-patrick-45': [
            { issue: 'Damp in rear bedrooms', count: 3, severity: 'medium' },
            { issue: 'Fire door does not close', count: 2, severity: 'high' }
        ],
        'gal-eyre-8': [
            { issue: 'Windows in poor repair', count: 2, severity: 'medium' }
        ]
    };

    const RENT_BANDS_BY_TERRITORY = {
        es: {
            'barcelona-ciutat': { m2: '15,1 €/m²', typical: '1.060 €/mes (70 m²)' },
            'barcelona-litoral': { m2: '13,4 €/m²', typical: '940 €/mes (70 m²)' },
            'girona-comarca': { m2: '10,2 €/m²', typical: '710 €/mes (70 m²)' }
        },
        ie: {
            'dublin-docklands': { m2: '€27.90 / m²', typical: '€2,050 / month (two-bed)' },
            'cork-city': { m2: '€18.60 / m²', typical: '€1,480 / month (two-bed)' },
            'galway-city': { m2: '€19.10 / m²', typical: '€1,520 / month (two-bed)' }
        }
    };

    const TENANT_PLEDGE_BASE = {
        'bcn-balmes-120': 14,
        'bcn-marina-88': 6,
        'gir-placa-vi-3': 3,
        'dub-mayor-12': 11,
        'cork-patrick-45': 5,
        'gal-eyre-8': 4
    };

    function getBuildingsForTerritory(locale, territoryId) {
        return BUILDINGS_BY_TERRITORY[localeKey(locale)]?.[territoryId] || [];
    }

    function findBuilding(locale, buildingId) {
        const map = BUILDINGS_BY_TERRITORY[localeKey(locale)] || {};
        for (const [terrId, list] of Object.entries(map)) {
            const found = list.find((b) => b.id === buildingId);
            if (found) return { ...found, territoryId: terrId };
        }
        return null;
    }

    function getTenantPledgeCount(buildingId) {
        const base = TENANT_PLEDGE_BASE[buildingId] || 0;
        const extra = (loadState().tenantPledges || {})[buildingId] || 0;
        return base + extra;
    }

    function addTenantPledge(buildingId) {
        if (!buildingId) return 0;
        const state = loadState();
        state.tenantPledges = state.tenantPledges || {};
        state.tenantPledges[buildingId] = (state.tenantPledges[buildingId] || 0) + 1;
        saveState(state);
        return getTenantPledgeCount(buildingId);
    }

    /* Módulo Vivienda (13-07-2026) — huelgómetro nacional de inquilinos: umbral fijo de
       1.000.000 de compromisos para convocar. Base demo por locale + pledges del navegador. */
    const HOUSING_STRIKE_THRESHOLD = 1000000;
    const HOUSING_STRIKE_BASE = { es: 683000, ie: 76000 };

    function getHousingStrikePledgeCount(locale) {
        const key = localeKey(locale);
        const base = HOUSING_STRIKE_BASE[key] || 0;
        const extra = loadState().housingPledges || 0;
        return base + extra;
    }

    function addHousingStrikePledge(locale) {
        const state = loadState();
        state.housingPledges = (state.housingPledges || 0) + 1;
        saveState(state);
        return getHousingStrikePledgeCount(locale || 'es');
    }

    function buildBuildingsBlockHtml(locale, territoryId) {
        const c = t(locale);
        const buildings = getBuildingsForTerritory(locale, territoryId);
        if (!buildings.length) return '';
        const rows = buildings.map((b) => `
            <button type="button" class="sindicato-building-card" data-sindicato-goto-building="${b.id}">
                <div class="sindicato-building-card-head">
                    <strong>${b.address}</strong>
                    ${b.largeHolder ? `<span class="sindicato-building-flag">${c.buildingLargeHolder}</span>` : ''}
                </div>
                <div class="sindicato-building-meta">
                    <span>${b.units} ${c.buildingUnits}</span>
                    <span>${c.buildingOwnerLabel}: ${b.owner}</span>
                    <span>${c.buildingYearLabel}: ${b.year}</span>
                </div>
            </button>`).join('');
        /* Sin <h3> propio (12-07-2026): el título lo pone la tarjeta del perfil de territorio. */
        return `<p class="template-muted">${c.buildingsIntro}</p>
            <div class="sindicato-building-grid">${rows}</div>`;
    }

    /** R7 — perfil de edificio: Estado · Rentas · Contrato y derechos · Acción. */
    function buildBuildingProfileHtml(locale, building, terr) {
        const c = t(locale);
        const es = locale === 'es';
        const condition = BUILDING_CONDITION_REPORTS[building.id] || [];
        const conditionRows = condition.length ? condition.map((r) => `
            <div class="sindicato-report-row ${severityClass(r.severity)}">
                <span class="sindicato-report-type">${r.issue} ${buildTrustBadgeHtml(locale, 'anon')}</span>
                <span class="sindicato-report-count">${r.count}</span>
                <span class="sindicato-report-sev">${r.severity}</span>
            </div>`).join('') : `<p class="template-muted">${c.buildingStateEmpty}</p>`;
        const rent = RENT_BANDS_BY_TERRITORY[localeKey(locale)]?.[terr.id] || null;
        const rentHtml = rent
            ? `<dl class="sindicato-registry-grid">
                <div><dt>${c.buildingRentM2}</dt><dd>${rent.m2}</dd></div>
                <div><dt>${c.buildingRentTypical}</dt><dd>${rent.typical}</dd></div>
            </dl>`
            : `<p class="template-muted">—</p>`;
        const faq = (c.buildingContractFaq || []).map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('');
        const alerts = getViviendaAlerts(locale, terr.id);
        const alertsHtml = alerts.length
            ? alerts.map((alert) => {
                const statusLabel = alert.status === 'scheduled' ? (es ? 'Programado' : 'Scheduled') : (es ? 'Riesgo' : 'At risk');
                return `<div class="sindicato-coord-card sindicato-alert-card"><strong>${alert.date} — ${statusLabel}</strong><p>${alert.address}</p></div>`;
            }).join('')
            : `<p class="template-muted">${c.viviendaNoAlerts}</p>`;
        const pledges = getTenantPledgeCount(building.id);
        return `<div class="sindicato-panel sindicato-building-profile">
            <p><button type="button" class="sindicato-back-btn" data-sindicato-building-back>← ${c.buildingBack}</button></p>
            <h2>${building.address}</h2>
            <p class="template-muted">${terr.parentName} / ${terr.name} · ${building.units} ${c.buildingUnits} · ${c.buildingYearLabel} ${building.year}</p>
            <div class="sindicato-building-owner">
                <span><strong>${c.buildingOwnerLabel}:</strong> ${building.owner}</span>
                ${building.largeHolder ? `<span class="sindicato-building-flag">${c.buildingLargeHolder}</span>` : ''}
            </div>
            <h3>${c.buildingStateTitle}</h3>
            <p class="template-muted">${c.buildingStateIntro}</p>
            <div class="sindicato-report-list">${conditionRows}</div>
            <p class="sindicato-note">${c.buildingStateModNote}</p>
            <h3>${c.buildingRentsTitle}</h3>
            ${rentHtml}
            <p class="sindicato-note">${c.buildingRentIndexNote}</p>
            <h3>${c.buildingContractTitle}</h3>
            <div class="sindicato-faq">${faq}</div>
            <h3>${c.buildingActionTitle}</h3>
            <p class="template-muted">${c.buildingEvictionLinkNote}</p>
            ${alertsHtml}
            <form class="sindicato-tenant-pledge" data-sindicato-tenant-pledge data-sindicato-building-id="${building.id}">
                <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.tenantPledgeBtn}</button>
                <span class="sindicato-tenant-pledge-count"><strong>${pledges}</strong> ${c.tenantPledgeCount}</span>
            </form>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* ================================================================
     * Módulo Vivienda / Housing (13-07-2026) — nuevo módulo de nivel superior,
     * distinto de Territorios: dos funcionalidades, huelgómetro de inquilinos
     * (umbral nacional fijo de 1.000.000) y panel de alarmas por desahucios
     * agregado de todos los territorios.
     * ================================================================ */
    function buildHousingHuelgometroHtml(locale) {
        const c = t(locale);
        const localeTag = locale === 'es' ? 'es-ES' : 'en-IE';
        const count = getHousingStrikePledgeCount(locale);
        const pct = Math.max(0, Math.min(100, Math.round((count / HOUSING_STRIKE_THRESHOLD) * 100)));
        return `<div class="sindicato-panel">
            <h2>🌡️ ${c.housingHuelgometroTitle}</h2>
            <p class="template-muted">${c.housingHuelgometroIntro}</p>
            <div class="sindicato-strike-meter">
                <div class="sindicato-strike-track"><div class="sindicato-strike-fill" style="width:${pct}%"></div></div>
                <span class="sindicato-strike-label">${count.toLocaleString(localeTag)} / ${HOUSING_STRIKE_THRESHOLD.toLocaleString(localeTag)} <small>${c.housingThresholdLabel}</small></span>
            </div>
            <form class="sindicato-tenant-pledge" data-sindicato-housing-pledge>
                <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.housingPledgeBtn}</button>
            </form>
            <p>${buildTelegramLinkHtml(locale, locale === 'es' ? 'vivienda' : 'housing')}</p>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildHousingAlarmasHtml(locale) {
        const c = t(locale);
        const es = locale === 'es';
        const alerts = getAllViviendaAlerts(locale);
        const alertsHtml = alerts.length
            ? alerts.map((alert) => {
                const statusLabel = alert.status === 'scheduled'
                    ? (es ? 'Programado' : 'Scheduled')
                    : (es ? 'Riesgo' : 'At risk');
                /* Acompañamiento (13-07-2026): piquete de acompañamiento por alerta,
                   con contador demo + apuntados de este navegador. */
                const escortKey = getHousingEscortKey(alert);
                const escortCount = getHousingEscortCount(escortKey);
                return `<div class="sindicato-coord-card sindicato-alert-card">
                    <strong>${alert.date} — ${statusLabel}</strong>
                    <p>${alert.territoryName} · ${alert.address}</p>
                    ${alert.note ? `<p class="template-muted">${alert.note}</p>` : ''}
                    <div class="sindicato-escort-row">
                        <button type="button" class="sindicato-cta-btn sindicato-escort-btn" data-sindicato-housing-escort="${escortKey}">${c.housingEscortBtn}</button>
                        <span class="sindicato-escort-count"><strong>${escortCount}</strong> ${c.housingEscortCount}</span>
                    </div>
                </div>`;
            }).join('')
            : `<p class="template-muted">${c.viviendaNoAlerts}</p>`;
        return `<div class="sindicato-panel">
            <h2>🚨 ${c.housingAlarmasTitle}</h2>
            <p class="template-muted">${c.housingAlarmasIntro}</p>
            ${alertsHtml}
        </div>`;
    }

    /* ================================================================
     * Vivienda ampliado (13-07-2026) — grandes tenedores, calculadora de
     * alquiler, asambleas locales y acompañamiento a desahucios.
     * ================================================================ */
    const LARGE_HOLDERS = {
        es: [
            { id: 'fondo-blackrock-habitatge', icon: '🏦', name: 'Blackstone / Testa', type: 'Fondo de inversión', buildings: 34, units: 2140, progress: 62, status: 'Mesa de negociación abierta — 3ª ronda' },
            { id: 'inmocaixa-habitatge', icon: '🏛️', name: 'InmoCaixa', type: 'Banca', buildings: 21, units: 1380, progress: 48, status: 'Campaña «Nos Quedamos» activa en 6 fincas' },
            { id: 'cerberus-socimi', icon: '🏢', name: 'Cerberus / Divarian', type: 'Socimi', buildings: 12, units: 760, progress: 27, status: 'Censo de inquilinas en marcha' },
            { id: 'azora-residencial', icon: '🏢', name: 'Azora Residencial', type: 'Socimi', buildings: 8, units: 520, progress: 15, status: 'Primeras asambleas por finca' }
        ],
        ie: [
            { id: 'ires-reit', icon: '🏢', name: 'I-RES REIT', type: 'REIT', buildings: 18, units: 1210, progress: 44, status: 'Rent-review negotiation open in 4 blocks' },
            { id: 'kennedy-wilson', icon: '🏦', name: 'Kennedy Wilson', type: 'Investment fund', buildings: 11, units: 830, progress: 31, status: 'Tenant census under way' },
            { id: 'greystar-dublin', icon: '🏢', name: 'Greystar', type: 'Investment fund', buildings: 6, units: 470, progress: 12, status: 'First block assemblies' }
        ]
    };

    const TENANT_ASSEMBLIES = {
        es: [
            { id: 'assemblea-barcelones', name: 'Assemblea del Barcelonès', territoryId: 'barcelona-ciutat', members: 240, meets: 'martes, 19:00 — Ateneu L\'Harmonia' },
            { id: 'assemblea-poblenou', name: 'Assemblea Litoral / Poblenou', territoryId: 'barcelona-litoral', members: 95, meets: 'jueves, 19:30 — Casal de barri' },
            { id: 'assemblea-girones', name: 'Assemblea del Gironès', territoryId: 'girona-comarca', members: 60, meets: 'miércoles, 19:00 — Espai social' },
            { id: 'assemblea-segria', name: 'Assemblea del Segrià', territoryId: 'lleida-segria', members: 38, meets: '1º sábado de mes, 11:00 — Casal popular' },
            { id: 'assemblea-camp-tarragona', name: 'Assemblea del Camp de Tarragona', territoryId: 'tarragona-camp', members: 42, meets: 'lunes, 19:00 — Local veïnal' }
        ],
        ie: [
            { id: 'assembly-docklands', name: 'Docklands Tenants Assembly', territoryId: 'dublin-docklands', members: 110, meets: 'Tuesdays, 7pm — community hall' },
            { id: 'assembly-cork-city', name: 'Cork City Tenants Assembly', territoryId: 'cork-city', members: 55, meets: 'Wednesdays, 7pm — social centre' },
            { id: 'assembly-galway', name: 'Galway Tenants Assembly', territoryId: 'galway-city', members: 40, meets: 'First Saturday, 11am — arts centre' }
        ]
    };

    /* Índice de referencia demo (€/m² mes) — mismas zonas que RENT_BANDS_BY_TERRITORY. */
    const RENT_INDEX = {
        es: { 'barcelona-ciutat': 15.1, 'barcelona-litoral': 13.4, 'girona-comarca': 10.2, 'lleida-segria': 7.8, 'tarragona-camp': 8.9 },
        ie: { 'dublin-docklands': 27.9, 'dublin-city-centre': 26.4, 'cork-city': 18.6, 'galway-city': 19.1, 'limerick-east': 15.2 }
    };

    function getHousingEscortKey(alert) {
        return slugify(`${alert.territoryId}-${alert.date}-${alert.address}`);
    }

    function getHousingEscortCount(alertKey) {
        /* Base demo determinista (3–8) + apuntados reales de este navegador. */
        let hash = 0;
        for (let i = 0; i < alertKey.length; i++) hash = (hash * 31 + alertKey.charCodeAt(i)) % 997;
        const base = 3 + (hash % 6);
        const extra = (loadState().housingEscortPledges || {})[alertKey] || 0;
        return base + extra;
    }

    function addHousingEscortPledge(alertKey) {
        const state = loadState();
        state.housingEscortPledges = state.housingEscortPledges || {};
        state.housingEscortPledges[alertKey] = (state.housingEscortPledges[alertKey] || 0) + 1;
        saveState(state);
        return getHousingEscortCount(alertKey);
    }

    function buildHousingTenedoresHtml(locale) {
        const c = t(locale);
        const holders = LARGE_HOLDERS[localeKey(locale)] || [];
        const llogateres = locale === 'es' ? findUnion(locale, 'llogateres') : null;
        const cards = holders.map((h) => `
            <div class="sindicato-coord-card sindicato-holder-card">
                <div class="sindicato-holder-head">
                    <strong>${h.icon} ${h.name}</strong>
                    <span class="template-muted">${h.type}</span>
                </div>
                <p class="template-muted"><strong>${h.buildings}</strong> ${c.housingTenedoresBuildings} · <strong>${h.units.toLocaleString(locale === 'es' ? 'es-ES' : 'en-IE')}</strong> ${c.housingTenedoresUnits}</p>
                <div class="sindicato-strike-track sindicato-campaign-track"><div class="sindicato-strike-fill" style="width:${h.progress}%"></div></div>
                <p class="template-muted">${h.progress}% ${c.housingTenedoresProgress}</p>
                <p>${h.status}</p>
                ${buildTelegramLinkHtml(locale, h.id)}
            </div>`).join('');
        const unionCta = llogateres
            ? `<p><button type="button" class="sindicato-cta-btn" data-sindicato-goto-union="${llogateres.id}">✊ ${c.housingTenedoresUnionCta}: ${llogateres.name}</button></p>`
            : '';
        return `<div class="sindicato-panel">
            <h2>🏦 ${c.housingTenedoresTitle}</h2>
            <p class="template-muted">${c.housingTenedoresIntro}</p>
            ${cards}
            ${unionCta}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function getHousingCalcTerritories(locale) {
        const index = RENT_INDEX[localeKey(locale)] || {};
        return Object.keys(index).map((id) => {
            const terr = getSubterritoryById(locale, id);
            return { id, name: terr ? `${terr.parentName} / ${terr.name}` : id, index: index[id] };
        });
    }

    function buildHousingCalcResultHtml(locale, territoryId, m2, rent) {
        const c = t(locale);
        const index = (RENT_INDEX[localeKey(locale)] || {})[territoryId];
        const size = parseFloat(m2);
        const paid = parseFloat(rent);
        if (!index || !(size > 0) || !(paid > 0)) {
            return `<p class="template-muted">${c.housingCalcInvalid}</p>`;
        }
        const localeTag = locale === 'es' ? 'es-ES' : 'en-IE';
        const reference = size * index;
        const diffPct = Math.round(((paid - reference) / reference) * 100);
        const over = diffPct > 0;
        const fmt = (n) => n.toLocaleString(localeTag, { maximumFractionDigits: 0 });
        return `<div class="sindicato-coord-card ${over ? 'sindicato-alert-card' : ''}">
            <p>${c.housingCalcReference}: <strong>${fmt(reference)} €</strong> (${index.toLocaleString(localeTag)} €/m²)</p>
            <p><strong>${Math.abs(diffPct)}%</strong> ${over ? c.housingCalcOver : c.housingCalcUnder}</p>
            ${over ? `<p class="template-muted">${c.housingCalcAdvice}</p>` : ''}
        </div>`;
    }

    function buildHousingCalculadoraHtml(locale) {
        const c = t(locale);
        const territories = getHousingCalcTerritories(locale);
        const options = territories.map((terr) =>
            `<option value="${terr.id}">${terr.name} — ${terr.index.toLocaleString(locale === 'es' ? 'es-ES' : 'en-IE')} €/m²</option>`
        ).join('');
        return `<div class="sindicato-panel">
            <h2>🧮 ${c.housingCalcTitle}</h2>
            <p class="template-muted">${c.housingCalcIntro}</p>
            <form class="sindicato-report-form sindicato-housing-calc" data-sindicato-housing-calc novalidate>
                <label>${c.housingCalcTerritory}
                    <select name="territory">${options}</select>
                </label>
                <div class="sindicato-form-row">
                    <label>${c.housingCalcM2}<input type="number" name="m2" min="10" step="1" required></label>
                    <label>${c.housingCalcRent}<input type="number" name="rent" min="1" step="1" required></label>
                </div>
                <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.housingCalcBtn}</button>
            </form>
            <div data-sindicato-housing-calc-result aria-live="polite"></div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildHousingAsambleasHtml(locale) {
        const c = t(locale);
        const assemblies = TENANT_ASSEMBLIES[localeKey(locale)] || [];
        const cards = assemblies.map((a) => {
            const terr = getSubterritoryById(locale, a.territoryId);
            return `<div class="sindicato-coord-card sindicato-assembly-card">
                <strong>${a.name}</strong>
                <p class="template-muted">${terr ? `${terr.parentName} / ${terr.name} · ` : ''}<strong>${a.members}</strong> ${c.housingAsambleasMembers}</p>
                <p>📅 ${c.housingAsambleasMeets}: ${a.meets}</p>
                <div class="sindicato-union-companies">
                    ${buildTelegramLinkHtml(locale, a.id)}
                    <button type="button" class="sindicato-union-company-link" data-sindicato-goto-vivienda="${a.territoryId}">🗺️ ${c.housingAsambleasTerritoryBtn}</button>
                </div>
            </div>`;
        }).join('');
        return `<div class="sindicato-panel">
            <h2>🫂 ${c.housingAsambleasTitle}</h2>
            <p class="template-muted">${c.housingAsambleasIntro}</p>
            ${cards}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildHousingHtml(locale, housingSub) {
        if (housingSub === 'alarmas') return buildHousingAlarmasHtml(locale);
        if (housingSub === 'tenedores') return buildHousingTenedoresHtml(locale);
        if (housingSub === 'calculadora') return buildHousingCalculadoraHtml(locale);
        if (housingSub === 'asambleas') return buildHousingAsambleasHtml(locale);
        return buildHousingHuelgometroHtml(locale);
    }

    /* ================================================================
     * Redes y canales (13-07-2026) — cada entidad (territorio, sector,
     * sindicato, empresa, producto/servicio, centro de estudios) tiene su
     * grupo de Telegram y canales sociales. Enlaces demo, generados del slug.
     * ================================================================ */
    function buildTelegramLinkHtml(locale, slug) {
        const c = t(locale);
        const tg = String(slug || '').replace(/[^a-z0-9]+/gi, '_');
        return `<a class="sindicato-union-company-link sindicato-social-link sindicato-social-link--telegram" href="https://t.me/sindicapp_${tg}" target="_blank" rel="noopener"><span aria-hidden="true">✈️</span> ${c.telegramGroupLabel}</a>`;
    }

    function buildSocialLinksHtml(locale, slug) {
        const tg = String(slug || '').replace(/[^a-z0-9]+/gi, '_');
        const dots = String(slug || '').replace(/[^a-z0-9]+/gi, '.');
        return `<div class="sindicato-union-companies sindicato-social-links">
            ${buildTelegramLinkHtml(locale, slug)}
            <a class="sindicato-union-company-link sindicato-social-link" href="https://mastodon.social/@sindicapp_${tg}" target="_blank" rel="noopener"><span aria-hidden="true">🐘</span> Mastodon</a>
            <a class="sindicato-union-company-link sindicato-social-link" href="https://instagram.com/sindicapp.${dots}" target="_blank" rel="noopener"><span aria-hidden="true">📷</span> Instagram</a>
            <a class="sindicato-union-company-link sindicato-social-link" href="https://x.com/sindicapp_${tg}" target="_blank" rel="noopener"><span aria-hidden="true">✖️</span> X</a>
        </div>`;
    }

    /** Bloque completo (título + intro + enlaces) para perfiles con secciones planas. */
    function buildSocialLinksBlockHtml(locale, slug) {
        const c = t(locale);
        return `<h3>📣 ${c.socialLinksTitle}</h3>
            <p class="template-muted">${c.socialLinksIntro}</p>
            ${buildSocialLinksHtml(locale, slug)}`;
    }

    /* ================================================================
     * Módulo Consumidores (13-07-2026) — productos y servicios con registro
     * público: denuncias de consumo, campañas de presión y alternativas.
     * ================================================================ */
    const CONSUMER_ITEMS = {
        es: [
            { id: 'cesta-basica', icon: '🧺', name: 'Cesta básica de supermercado', type: 'producto', sector: 'Comercio', complaints: 38,
                campaigns: [
                    { title: 'Precios espejo — aceite, leche y huevos', support: 64 },
                    { title: 'Etiquetado de origen real en marca blanca', support: 41 }
                ],
                alternatives: ['Cooperativas de consumo de barrio', 'Mercados municipales y venta directa del campo'],
                tips: 'El precio por unidad de medida (€/kg, €/L) es obligatorio en el lineal: compara siempre por unidad, no por envase.',
                relatedWorkplaceId: 'supermercat-diari' },
            { id: 'tarifa-electrica', icon: '⚡', name: 'Tarifa eléctrica doméstica', type: 'servicio', sector: 'Energía', complaints: 52,
                campaigns: [{ title: 'Bajada colectiva a PVPC — revisión de contratos', support: 57 }],
                alternatives: ['Cooperativas energéticas ciudadanas', 'Comunidades energéticas locales de autoconsumo'],
                tips: 'Cambiar de comercializadora es gratuito y no puede cortarte el suministro durante el cambio.' },
            { id: 'telefonia-internet', icon: '📶', name: 'Telefonía e internet', type: 'servicio', sector: 'Telecomunicaciones', complaints: 47,
                campaigns: [{ title: 'Fin de las permanencias encadenadas', support: 72 }],
                alternatives: ['Operadoras locales y cooperativas de telecomunicaciones'],
                tips: 'Las subidas de tarifa te dan derecho a salir sin penalización aunque tengas permanencia.' },
            { id: 'banca-comisiones', icon: '🏦', name: 'Comisiones bancarias', type: 'servicio', sector: 'Banca', complaints: 61,
                campaigns: [{ title: 'Cuenta básica gratuita para rentas bajas', support: 68 }],
                alternatives: ['Banca ética y cooperativas de crédito'],
                tips: 'La cuenta de pago básica está regulada: máximo legal de comisión y gratuita para colectivos vulnerables.' },
            { id: 'apps-reparto', icon: '🛵', name: 'Apps de reparto a domicilio', type: 'servicio', sector: 'Logística', complaints: 29,
                campaigns: [{ title: 'Propina íntegra para el repartidor', support: 81 }],
                alternatives: ['Pedido directo al local — llama al restaurante', 'Cooperativas de reparto en bici'],
                tips: 'La ley rider presume laboralidad: si la app fija precio y ruta, quien reparte es plantilla, no autónomo.',
                relatedWorkplaceId: 'zona-franca-logistica' }
        ],
        ie: [
            { id: 'grocery-basket', icon: '🧺', name: 'Grocery basket', type: 'producto', sector: 'Retail', complaints: 31,
                campaigns: [
                    { title: 'Mirror pricing — bread, milk and butter', support: 59 },
                    { title: 'Honest unit pricing on multibuys', support: 44 }
                ],
                alternatives: ['Local food co-ops', 'Farmers\' markets and direct-from-farm schemes'],
                tips: 'Unit pricing (€/kg, €/L) must be displayed on the shelf — always compare per unit, not per pack.',
                relatedWorkplaceId: 'grafton-retail' },
            { id: 'household-energy', icon: '⚡', name: 'Household energy', type: 'servicio', sector: 'Energy', complaints: 46,
                campaigns: [{ title: 'Collective switch — end loyalty penalties', support: 62 }],
                alternatives: ['Community energy co-operatives'],
                tips: 'Switching supplier is free and your supply cannot be cut off during the changeover.' },
            { id: 'broadband-mobile', icon: '📶', name: 'Broadband & mobile', type: 'servicio', sector: 'Telecoms', complaints: 39,
                campaigns: [{ title: 'End chained minimum-term contracts', support: 70 }],
                alternatives: ['Local and community-owned ISPs'],
                tips: 'A mid-contract price rise gives you the right to leave without penalty.' },
            { id: 'bank-fees', icon: '🏦', name: 'Bank fees & charges', type: 'servicio', sector: 'Banking', complaints: 54,
                campaigns: [{ title: 'Free basic account for low incomes', support: 66 }],
                alternatives: ['Credit unions and ethical banks'],
                tips: 'The basic payment account is regulated — free for those receiving certain social welfare payments.' },
            { id: 'delivery-apps', icon: '🛵', name: 'Food delivery apps', type: 'servicio', sector: 'Logistics', complaints: 24,
                campaigns: [{ title: 'Full tip to the rider', support: 78 }],
                alternatives: ['Order direct from the restaurant', 'Bike-courier co-operatives'],
                tips: 'If the app sets the price and the route, the courier is likely an employee — misclassification can be reported.',
                relatedWorkplaceId: 'docklands-logistics' }
        ]
    };

    function getConsumerItems(locale) {
        return CONSUMER_ITEMS[localeKey(locale)] || [];
    }

    function findConsumerItem(locale, itemId) {
        return getConsumerItems(locale).find((i) => i.id === itemId) || null;
    }

    function buildConsumidoresHtml(locale, itemId) {
        const c = t(locale);
        const items = getConsumerItems(locale);
        const typeLabel = (item) => item.type === 'producto' ? c.consumidoresTypeProduct : c.consumidoresTypeService;
        const item = itemId ? findConsumerItem(locale, itemId) : null;
        if (!item) {
            const cards = items.map((it) => `
                <button type="button" class="sindicato-redsocial-card sindicato-dir-card" data-sindicato-goto-consumidor="${it.id}">
                    <span class="sindicato-redsocial-card-icon" aria-hidden="true">${it.icon}</span>
                    <strong class="sindicato-redsocial-card-name">${it.name}</strong>
                    <span class="template-muted">${typeLabel(it)} · ${it.sector}</span>
                    <span class="sindicato-redsocial-card-stats">
                        <span><strong>${it.complaints}</strong> ${c.consumidoresStatComplaints}</span>
                        <span><strong>${it.campaigns.length}</strong> ${c.consumidoresStatCampaigns}</span>
                    </span>
                </button>`).join('');
            return `<div class="sindicato-panel sindicato-consumidores">
                <h2>🛒 ${c.consumidoresTitle}</h2>
                <p class="template-muted">${c.consumidoresIntro}</p>
                <p>${c.consumidoresDirectoryHint}</p>
                <div class="sindicato-redsocial-grid">${cards}</div>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        const avgSupport = item.campaigns.length
            ? Math.round(item.campaigns.reduce((s, k) => s + k.support, 0) / item.campaigns.length)
            : 0;
        const campaignCards = item.campaigns.map((k) => `
            <div class="sindicato-coord-card sindicato-campaign-card">
                <strong>${k.title}</strong>
                <div class="sindicato-strike-track sindicato-campaign-track"><div class="sindicato-strike-fill" style="width:${k.support}%"></div></div>
                <p class="template-muted">${k.support}% ${c.consumidoresStatSupport}</p>
            </div>`).join('');
        const alternatives = item.alternatives.map((a) => `<li>${a}</li>`).join('');
        const relatedWp = item.relatedWorkplaceId ? findWorkplace(locale, item.relatedWorkplaceId) : null;
        const relatedHtml = relatedWp
            ? `<p><button type="button" class="sindicato-cta-btn" data-sindicato-goto-workplace="${relatedWp.id}">🏢 ${c.consumidoresRelatedCompany}: ${relatedWp.name}</button></p>`
            : '';
        return `<div class="sindicato-panel sindicato-consumer-profile">
            <p><button type="button" class="sindicato-back-btn" data-sindicato-goto-consumidor="">← ${c.consumidoresBack}</button></p>
            <h2>${item.icon} ${item.name}</h2>
            <p class="template-muted">${typeLabel(item)} · ${item.sector}</p>
            <div class="sindicato-summary-grid">
                <div class="sindicato-stat"><strong>${item.complaints}</strong><span>${c.consumidoresStatComplaints}</span></div>
                <div class="sindicato-stat"><strong>${item.campaigns.length}</strong><span>${c.consumidoresStatCampaigns}</span></div>
                <div class="sindicato-stat"><strong>${avgSupport}%</strong><span>${c.consumidoresStatSupport}</span></div>
            </div>
            <h3>📣 ${c.consumidoresCampaignsTitle}</h3>
            ${campaignCards}
            <h3>🌱 ${c.consumidoresAlternativesTitle}</h3>
            <ul class="sindicato-sector-detail-list">${alternatives}</ul>
            <h3>⚖️ ${c.consumidoresTipsTitle}</h3>
            <div class="sindicato-coord-card"><p>${item.tips}</p></div>
            ${relatedHtml}
            ${buildSocialLinksBlockHtml(locale, item.id)}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* ================================================================
     * Módulo Estudiantes (13-07-2026) — centros de estudios con perfil:
     * colectivos estudiantiles, reivindicaciones y movilizaciones.
     * ================================================================ */
    const STUDY_CENTERS = {
        es: [
            { id: 'universitat-barcelona', icon: '🏛️', name: 'Universitat de Barcelona', type: 'Universidad pública', territoryId: 'barcelona-ciutat', students: 63000,
                groups: ['SEPC', 'AJEC', 'Sindicat d\'Estudiants'],
                issues: [
                    { title: 'Rebaja de tasas de máster y grado', replies: 48 },
                    { title: 'Salud mental: más plazas de atención psicológica', replies: 35 }
                ],
                mobilizations: [
                    { date: '2026-09-28', title: 'Asamblea de inicio de curso', place: 'Plaça Universitat' },
                    { date: '2026-10-15', title: 'Concentración por las becas', place: 'Rectorado' }
                ] },
            { id: 'uab-bellaterra', icon: '🏛️', name: 'Universitat Autònoma de Barcelona', type: 'Universidad pública', territoryId: 'central-bages', students: 37000,
                groups: ['SEPC', 'Assemblees de facultat'],
                issues: [
                    { title: 'Transporte público asequible al campus', replies: 52 },
                    { title: 'Prácticas curriculares remuneradas', replies: 44 }
                ],
                mobilizations: [{ date: '2026-10-02', title: 'Huelga de prácticas no pagadas', place: 'Plaça Cívica' }] },
            { id: 'institut-mila-fontanals', icon: '🏫', name: 'Institut Milà i Fontanals', type: 'Instituto de secundaria', territoryId: 'barcelona-ciutat', students: 850,
                groups: ['Assemblea d\'estudiants', 'AFA — comissió d\'alumnat'],
                issues: [{ title: 'Climatización de las aulas (olas de calor)', replies: 27 }],
                mobilizations: [{ date: '2026-09-24', title: 'Asamblea abierta de alumnado', place: 'Patio central' }] },
            { id: 'escola-del-treball', icon: '🛠️', name: 'Escola del Treball (FP)', type: 'Formación profesional', territoryId: 'barcelona-ciutat', students: 2400,
                groups: ['Coordinadora FP en lluita'],
                issues: [
                    { title: 'FP dual: convenio digno en las estancias de empresa', replies: 39 },
                    { title: 'Material de taller a cargo del centro', replies: 22 }
                ],
                mobilizations: [{ date: '2026-10-08', title: 'Jornada FP digna', place: 'Escola del Treball' }] },
            { id: 'universitat-girona', icon: '🏛️', name: 'Universitat de Girona', type: 'Universidad pública', territoryId: 'girona-comarca', students: 15000,
                groups: ['SEPC Girona'],
                issues: [{ title: 'Alquiler estudiantil: pisos a precio índice', replies: 41 }],
                mobilizations: [{ date: '2026-10-20', title: 'Acampada por la vivienda estudiantil', place: 'Campus Montilivi' }] },
            { id: 'universitat-lleida', icon: '🏛️', name: 'Universitat de Lleida', type: 'Universidad pública', territoryId: 'lleida-segria', students: 10000,
                groups: ['SEPC Lleida', 'Consell de l\'Estudiantat'],
                issues: [{ title: 'Becas comedor para estudiantes desplazados', replies: 18 }],
                mobilizations: [] }
        ],
        ie: [
            { id: 'trinity-college', icon: '🏛️', name: 'Trinity College Dublin', type: 'University', territoryId: 'dublin-city-centre', students: 18000,
                groups: ['TCDSU', 'Postgrad Workers\' Organisation'],
                issues: [
                    { title: 'Student rent — cap on-campus accommodation', replies: 56 },
                    { title: 'Stipends for postgraduate researchers', replies: 43 }
                ],
                mobilizations: [{ date: '2026-10-01', title: 'Rent freeze rally', place: 'Front Square' }] },
            { id: 'ucd-belfield', icon: '🏛️', name: 'University College Dublin', type: 'University', territoryId: 'dublin-south', students: 33000,
                groups: ['UCDSU'],
                issues: [{ title: 'Affordable campus housing', replies: 61 }],
                mobilizations: [{ date: '2026-10-09', title: 'March for affordable education', place: 'Belfield gates' }] },
            { id: 'ucc-cork', icon: '🏛️', name: 'University College Cork', type: 'University', territoryId: 'cork-city', students: 24000,
                groups: ['UCCSU', 'Fair Placements Now'],
                issues: [{ title: 'Paid placements for nursing & teaching students', replies: 49 }],
                mobilizations: [{ date: '2026-10-14', title: 'Placement pay picket', place: 'Main quad' }] },
            { id: 'university-galway', icon: '🏛️', name: 'University of Galway', type: 'University', territoryId: 'galway-city', students: 19000,
                groups: ['NUIGSU'],
                issues: [{ title: 'Digs rights — written licences for lodgers', replies: 32 }],
                mobilizations: [] },
            { id: 'limerick-cfe', icon: '🛠️', name: 'Limerick College of Further Education', type: 'Further education', territoryId: 'limerick-east', students: 2100,
                groups: ['Class reps assembly'],
                issues: [{ title: 'Free materials for apprenticeship courses', replies: 15 }],
                mobilizations: [{ date: '2026-09-30', title: 'Apprentice pay town hall', place: 'Main hall' }] }
        ]
    };

    function getStudyCenters(locale) {
        return STUDY_CENTERS[localeKey(locale)] || [];
    }

    function findStudyCenter(locale, centerId) {
        return getStudyCenters(locale).find((s) => s.id === centerId) || null;
    }

    function buildEstudiantesHtml(locale, centerId) {
        const c = t(locale);
        const es = locale === 'es';
        const centers = getStudyCenters(locale);
        const center = centerId ? findStudyCenter(locale, centerId) : null;
        if (!center) {
            const cards = centers.map((ct) => `
                <button type="button" class="sindicato-redsocial-card sindicato-dir-card" data-sindicato-goto-centro="${ct.id}">
                    <span class="sindicato-redsocial-card-icon" aria-hidden="true">${ct.icon}</span>
                    <strong class="sindicato-redsocial-card-name">${ct.name}</strong>
                    <span class="template-muted">${ct.type}</span>
                    <span class="sindicato-redsocial-card-stats">
                        <span><strong>${ct.students.toLocaleString(es ? 'es-ES' : 'en-IE')}</strong> ${c.estudiantesStatStudents}</span>
                        <span><strong>${ct.groups.length}</strong> ${c.estudiantesStatGroups}</span>
                    </span>
                </button>`).join('');
            return `<div class="sindicato-panel sindicato-estudiantes">
                <h2>🎓 ${c.estudiantesTitle}</h2>
                <p class="template-muted">${c.estudiantesIntro}</p>
                <p>${c.estudiantesDirectoryHint}</p>
                <div class="sindicato-redsocial-grid">${cards}</div>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        const terr = getSubterritoryById(locale, center.territoryId);
        const groupTags = center.groups.map((g) => `<span class="sindicato-union-tag">${g}</span>`).join('');
        const issueCards = center.issues.map((i) =>
            `<div class="sindicato-coord-card"><strong>${i.title}</strong><p class="template-muted">${i.replies} ${es ? 'respuestas' : 'replies'}</p></div>`
        ).join('') || `<p class="template-muted">—</p>`;
        const mobCards = center.mobilizations.map((m) =>
            `<div class="sindicato-coord-card sindicato-mob-card"><strong>${m.date}</strong><p>${m.title}</p><p class="template-muted">📍 ${m.place}</p></div>`
        ).join('') || `<p class="template-muted">—</p>`;
        const terrBtn = terr
            ? `<p><button type="button" class="sindicato-cta-btn" data-sindicato-goto-vivienda="${terr.id}">🗺️ ${terr.parentName} / ${terr.name}</button></p>`
            : '';
        return `<div class="sindicato-panel sindicato-estudiantes-profile">
            <p><button type="button" class="sindicato-back-btn" data-sindicato-goto-centro="">← ${c.estudiantesBack}</button></p>
            <h2>${center.icon} ${center.name}</h2>
            <p class="template-muted">${center.type}${terr ? ` · ${terr.name}` : ''}</p>
            <div class="sindicato-summary-grid">
                <div class="sindicato-stat"><strong>${center.students.toLocaleString(es ? 'es-ES' : 'en-IE')}</strong><span>${c.estudiantesStatStudents}</span></div>
                <div class="sindicato-stat"><strong>${center.groups.length}</strong><span>${c.estudiantesStatGroups}</span></div>
                <div class="sindicato-stat"><strong>${center.issues.length}</strong><span>${c.estudiantesStatIssues}</span></div>
            </div>
            <h3>✊ ${c.estudiantesGroupsTitle}</h3>
            <div class="sindicato-union-tags">${groupTags}</div>
            <h3>📢 ${c.estudiantesIssuesTitle}</h3>
            ${issueCards}
            <h3>📅 ${c.estudiantesMobilizationsTitle}</h3>
            ${mobCards}
            ${terrBtn}
            ${buildSocialLinksBlockHtml(locale, center.id)}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* ================================================================
     * Red Social (13-07-2026) — módulo master: landing por defecto, tronco
     * hacia Sindicatos, Territorios, Sectores, Empresas, Consumidores y
     * Estudiantes. Panel de stats por módulo + feed de actividad.
     * ================================================================ */
    function buildRedSocialHtml(locale) {
        const c = t(locale);
        const localeTag = locale === 'es' ? 'es-ES' : 'en-IE';
        const unions = getUnions(locale);
        const members = unions.reduce((s, u) => s + (u.members || 0), 0);
        const terrs = getSubterritories(locale);
        const alerts = getAllViviendaAlerts(locale);
        const sectorTree = getSectorTreeDef(locale);
        const sectorParents = Object.keys(sectorTree).length;
        let subforums = 0;
        Object.values(sectorTree).forEach((def) => {
            subforums += def.subsectors.length;
            def.subsectors.forEach((s) => { subforums += (s.subsubsectors || []).length; });
        });
        const wps = getWorkplaces(locale);
        const reports = wps.reduce((s, w) => s + (w.reports || 0) + getApprovedReportCount(w.id), 0);
        const consumers = getConsumerItems(locale);
        const consumerCampaigns = consumers.reduce((s, i) => s + i.campaigns.length, 0);
        const centers = getStudyCenters(locale);
        const studentGroups = centers.reduce((s, x) => s + x.groups.length, 0);
        const labels = c.redSocialStatLabels || {};
        const fmt = (n) => n.toLocaleString(localeTag);
        const card = (sub, icon, a, b) => `
            <button type="button" class="sindicato-redsocial-card" data-sindicato-goto-sub="${sub}">
                <span class="sindicato-redsocial-card-icon" aria-hidden="true">${icon}</span>
                <strong class="sindicato-redsocial-card-name">${(c.subs && c.subs[sub]) || sub}</strong>
                <span class="sindicato-redsocial-card-stats">
                    <span><strong>${fmt(a)}</strong> ${(labels[sub] || [])[0] || ''}</span>
                    <span><strong>${fmt(b)}</strong> ${(labels[sub] || [])[1] || ''}</span>
                </span>
            </button>`;
        const activity = getFeed(locale).map((item) => buildFeedCardHtml(locale, item)).join('');
        return `<div class="sindicato-panel sindicato-redsocial">
            <h2>💬 ${c.redSocialTitle}</h2>
            <p class="template-muted">${c.redSocialIntro}</p>
            <div class="sindicato-redsocial-grid">
                ${card('unions', '🏛️', unions.length, members)}
                ${card('vivienda', '🏘️', terrs.length, alerts.length)}
                ${card('sectores', '🏭', sectorParents, subforums)}
                ${card('workplaces', '🏢', wps.length, reports)}
                ${card('consumidores', '🛒', consumers.length, consumerCampaigns)}
                ${card('estudiantes', '🎓', centers.length, studentGroups)}
            </div>
            <h3>${c.redSocialActivityTitle}</h3>
            <div class="sindicato-feed">${activity}</div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    const DEFAULT_MAP_CENTER = { ie: { lat: 53.3498, lng: -6.2603 }, es: { lat: 41.3874, lng: 2.1686 } };

    function defaultState() {
        return {
            schemaVersion: 2,
            customWorkplaces: { ie: [], es: [] },
            moderationQueue: [],
            strikeVotes: {},
            forumReads: {},
            /* R4/R5/R7 — agenda por empresa, verificación demo y confirmaciones de inquilinos */
            agendaEvents: {},
            verification: { level: 'anon', unionId: '', pending: false },
            tenantPledges: {},
            /* Huelgómetro de vivienda (13-07-2026) — compromisos de huelga de alquileres, este navegador */
            housingPledges: 0,
            /* Acompañamiento a desahucios (13-07-2026) — apuntados por alerta, este navegador */
            housingEscortPledges: {},
            /* C2 — aportaciones salariales anónimas (demo, este navegador) */
            wageContribs: {}
        };
    }

    function loadState() {
        try {
            let raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                raw = localStorage.getItem(STORAGE_KEY_LEGACY);
                if (raw) {
                    const legacy = JSON.parse(raw);
                    const migrated = {
                        ...defaultState(),
                        customWorkplaces: legacy.customWorkplaces || { ie: [], es: [] },
                        moderationQueue: Array.isArray(legacy.moderationQueue) ? legacy.moderationQueue : []
                    };
                    saveState(migrated);
                    return migrated;
                }
                return defaultState();
            }
            const parsed = JSON.parse(raw);
            return {
                ...defaultState(),
                customWorkplaces: parsed.customWorkplaces || { ie: [], es: [] },
                moderationQueue: Array.isArray(parsed.moderationQueue) ? parsed.moderationQueue : [],
                strikeVotes: parsed.strikeVotes && typeof parsed.strikeVotes === 'object' ? parsed.strikeVotes : {},
                forumReads: parsed.forumReads && typeof parsed.forumReads === 'object' ? parsed.forumReads : {},
                agendaEvents: parsed.agendaEvents && typeof parsed.agendaEvents === 'object' ? parsed.agendaEvents : {},
                verification: parsed.verification && typeof parsed.verification === 'object' ? parsed.verification : { level: 'anon', unionId: '', pending: false },
                tenantPledges: parsed.tenantPledges && typeof parsed.tenantPledges === 'object' ? parsed.tenantPledges : {},
                housingPledges: typeof parsed.housingPledges === 'number' ? parsed.housingPledges : 0,
                housingEscortPledges: parsed.housingEscortPledges && typeof parsed.housingEscortPledges === 'object' ? parsed.housingEscortPledges : {},
                wageContribs: parsed.wageContribs && typeof parsed.wageContribs === 'object' ? parsed.wageContribs : {}
            };
        } catch (_) {
            return defaultState();
        }
    }

    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, schemaVersion: 2 }));
        } catch (_) {}
    }

    function parseSindicatoRoute(hash) {
        const h = String(hash || (typeof location !== 'undefined' ? location.hash : '') || '').replace(/^#/, '');
        const forumMatch = h.match(/^sindicato-forum:(.+)$/);
        if (forumMatch) return { view: 'forum-thread', slug: forumMatch[1] };
        const terrMatch = h.match(/^sindicato-territorio:(.+)$/);
        if (terrMatch) return { view: 'territory-dossier', territoryId: terrMatch[1] };
        /* C7 — deep link al perfil de empresa: #sindicato-empresa:<id>[:<sección>] */
        const wpMatch = h.match(/^sindicato-empresa:([^:]+)(?::([a-z]+))?$/);
        if (wpMatch) return { view: 'workplace', workplaceId: wpMatch[1], sectionId: wpMatch[2] || 'location' };
        return null;
    }

    function getStrikeSupportPct(locale, workplaceId) {
        const wp = findWorkplace(locale, workplaceId);
        if (!wp) return 0;
        const votes = loadState().strikeVotes[workplaceId];
        if (votes && (votes.yes + votes.no) > 0) {
            return Math.round((votes.yes / (votes.yes + votes.no)) * 100);
        }
        return wp.strikeSupport || 0;
    }

    function castStrikeVote(workplaceId, vote) {
        const state = loadState();
        /* fix QA A3: al primer voto real, sembrar el contador con el baseline demo
           (52% → 52 sí / 48 no) para que un voto no dispare el porcentaje a 0/100. */
        let cur = state.strikeVotes[workplaceId];
        if (!cur) {
            const wp = findWorkplace('es', workplaceId) || findWorkplace('ie', workplaceId);
            const pct = Math.max(0, Math.min(100, Math.round(wp?.strikeSupport || 0)));
            cur = pct > 0 ? { yes: pct, no: 100 - pct } : { yes: 0, no: 0 };
        }
        if (vote === 'yes') cur.yes += 1;
        else if (vote === 'no') cur.no += 1;
        state.strikeVotes[workplaceId] = cur;
        saveState(state);
        return cur;
    }

    /* C2 — aportar el propio sueldo (demo, localStorage) */
    function addWageContribution(workplaceId, contrib) {
        const state = loadState();
        if (!state.wageContribs[workplaceId]) state.wageContribs[workplaceId] = [];
        state.wageContribs[workplaceId].push({
            role: String(contrib.role || '').trim().slice(0, 60),
            amount: Number(contrib.amount) || 0,
            period: contrib.period === 'hourly' ? 'hourly' : 'monthly',
            date: new Date().toISOString().slice(0, 10)
        });
        saveState(state);
    }

    function getWageContributions(workplaceId) {
        return loadState().wageContribs[workplaceId] || [];
    }

    function markForumThreadRead(slug) {
        if (!slug) return;
        const state = loadState();
        state.forumReads[slug] = new Date().toISOString();
        saveState(state);
    }

    function localeKey(locale) {
        return locale === 'es' ? 'es' : 'ie';
    }

    function t(locale) {
        return COPY[localeKey(locale)];
    }

    function getWorkplaces(locale) {
        const key = localeKey(locale);
        const custom = loadState().customWorkplaces[key] || [];
        return [...BASE_WORKPLACES[key], ...custom];
    }

    function getUnions(locale) {
        return UNIONS[localeKey(locale)];
    }

    function getFeed(locale) {
        return FEED[localeKey(locale)];
    }

    function findWorkplace(locale, id) {
        return getWorkplaces(locale).find((w) => w.id === id) || null;
    }

    function findWorkplaceByName(locale, name) {
        const token = String(name || '').trim().toLowerCase();
        return getWorkplaces(locale).find((w) => w.name.toLowerCase() === token) || null;
    }

    function slugify(text) {
        return String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'company';
    }

    function addCompany(locale, payload) {
        const key = localeKey(locale);
        const state = loadState();
        const base = DEFAULT_MAP_CENTER[key];
        const subsectorId = String(payload.subsectorId || '').trim();
        const territoryId = String(payload.territoryId || '').trim();
        const subsector = subsectorId ? getSubsectorById(locale, subsectorId) : null;
        const territory = territoryId ? getSubterritoryById(locale, territoryId) : null;
        const id = `custom-${slugify(payload.name)}-${Date.now().toString(36)}`;
        const company = {
            id,
            name: payload.name.trim(),
            sector: payload.sector.trim() || (subsector?.parentName || (locale === 'es' ? 'Sin clasificar' : 'Unclassified')),
            subsectorId: subsector?.id || subsectorId || '',
            territoryId: territory?.id || territoryId || '',
            address: payload.address.trim(),
            lat: Number(payload.lat) || base.lat,
            lng: Number(payload.lng) || base.lng,
            workers: 0,
            reports: 0,
            unions: [],
            strikeSupport: 0,
            convenio: locale === 'es' ? 'Convenio sectorial por determinar' : 'Sectoral agreement TBD',
            wageRange: '—',
            custom: true
        };
        state.customWorkplaces[key] = state.customWorkplaces[key] || [];
        state.customWorkplaces[key].push(company);
        saveState(state);
        return company;
    }

    function getModerationQueue(workplaceId) {
        return loadState().moderationQueue.filter((r) => r.workplaceId === workplaceId);
    }

    function submitReport(locale, workplaceId, type, detail) {
        const state = loadState();
        const entry = {
            id: `rep-${Date.now().toString(36)}`,
            workplaceId,
            locale: localeKey(locale),
            type,
            detail: String(detail || '').trim(),
            status: 'pending',
            aiFlag: String(detail || '').length < 8 ? 'low-detail' : 'ok',
            createdAt: new Date().toISOString()
        };
        state.moderationQueue.unshift(entry);
        saveState(state);
        return entry;
    }

    function moderateReport(reportId, status) {
        const state = loadState();
        const item = state.moderationQueue.find((r) => r.id === reportId);
        if (!item) return null;
        item.status = status;
        saveState(state);
        return item;
    }

    function getApprovedReportCount(workplaceId) {
        return loadState().moderationQueue.filter((r) => r.workplaceId === workplaceId && r.status === 'approved').length;
    }

    function getCompaniesForUnion(locale, unionName) {
        return getWorkplaces(locale).filter((w) => (w.unions || []).includes(unionName));
    }

    function findUnion(locale, id) {
        return getUnions(locale).find((u) => u.id === id) || null;
    }

    function findUnionByName(locale, name) {
        const token = String(name || '').trim().toLowerCase();
        if (!token) return null;
        return getUnions(locale).find((u) =>
            u.id === token
            || u.name.toLowerCase() === token
            || u.name.toLowerCase().includes(token)
        ) || null;
    }

    function buildUnionGotoBtn(locale, unionNameOrId, label) {
        const u = findUnionByName(locale, unionNameOrId) || findUnion(locale, unionNameOrId);
        if (!u) return label || unionNameOrId;
        const text = label || u.name;
        return `<button type="button" class="sindicato-union-link" data-sindicato-goto-union="${u.id}">${text}</button>`;
    }

    function buildUnionTagsHtml(locale, unionNames) {
        if (!unionNames?.length) return '—';
        return unionNames.map((name) => `<span class="sindicato-union-tag">${buildUnionGotoBtn(locale, name)}</span>`).join('');
    }

    const UNION_FORUM = {
        ie: {
            siptu: [{ title: 'National wage claim coordination — logistics branch', replies: 41 }, { title: 'Delegate training schedule Q3', replies: 18 }],
            unite: [{ title: 'Hospitality sector — split-shift reporting', replies: 29 }],
            inmo: [{ title: 'Roster-change rights FAQ — updated', replies: 56 }, { title: 'Safe staffing ratios campaign', replies: 33 }],
            mandate: [{ title: 'Sunday premium — retail convenio thread', replies: 22 }],
            fsu: [{ title: 'ICT remote-work policy template', replies: 14 }]
        },
        es: {
            ccoo: [{ title: 'Negociación convenio hostelería 2024', replies: 67 }, { title: 'Alertas de cambio de turno — sanidad privada', replies: 34 }],
            ugt: [{ title: 'Coordinación huelga sector tecnología', replies: 44 }],
            cgt: [{ title: 'Asambleas de empresa — protocolo', replies: 28 }],
            csc: [{ title: 'Catalunya — calendario de movilizaciones', replies: 19 }],
            usoc: [{ title: 'Servicios públicos — ratios mínimos', replies: 15 }],
            sat: [{ title: 'Sanidad privada — contacto delegadas', replies: 38 }]
        }
    };

    function getUnionForumPosts(locale, unionId) {
        const key = localeKey(locale);
        return (UNION_FORUM[key] && UNION_FORUM[key][unionId]) || [];
    }

    function feedIcon(type) {
        const map = { report: '⚠️', wage: '💶', strike: '✊', convenio: '📋', union: '🏛️' };
        return map[type] || '📌';
    }

    function severityClass(sev) {
        return sev === 'high' ? 'sindicato-severity-high' : sev === 'medium' ? 'sindicato-severity-medium' : 'sindicato-severity-low';
    }

    function buildSectionJumpBtn(section, label, workplaceId) {
        return `<button type="button" class="sindicato-bridge-jump" data-sindicato-goto-section="${section}" data-sindicato-workplace-id="${workplaceId}">${label}</button>`;
    }

    function buildUnionSectionJumpBtn(section, label, unionId) {
        return `<button type="button" class="sindicato-bridge-jump" data-sindicato-union-jump="${section}" data-sindicato-union-id="${unionId}">${label}</button>`;
    }

    function buildLocationBridgeHtml(locale, wp) {
        const c = t(locale);
        const unionTags = buildUnionTagsHtml(locale, wp.unions || []);
        return `<div class="sindicato-location-bridge">
            <div class="sindicato-location-bridge-head">
                <span class="sindicato-location-pin" aria-hidden="true">📍</span>
                <div>
                    <h2>${wp.name}</h2>
                    <p class="template-muted">${wp.address} · ${wp.sector}</p>
                </div>
            </div>
            <p class="sindicato-location-bridge-lead">${c.locationBridgeBody}</p>
            <div class="sindicato-location-bridge-meta">
                <span><strong>${c.locationCoords}:</strong> ${wp.lat?.toFixed(4)}, ${wp.lng?.toFixed(4)}</span>
                <span><strong>${c.reports}:</strong> ${wp.reports + getApprovedReportCount(wp.id)}</span>
            </div>
            <div class="sindicato-location-bridge-unions">${unionTags}</div>
            <div class="sindicato-bridge-jumps">
                ${buildSectionJumpBtn('overview', c.locationOpenOverview, wp.id)}
                ${buildSectionJumpBtn('reports', c.locationOpenReports, wp.id)}
                ${buildSectionJumpBtn('wages', c.sections.wages, wp.id)}
                ${buildSectionJumpBtn('convenio', c.sections.convenio, wp.id)}
                ${buildSectionJumpBtn('action', c.sections.action, wp.id)}
            </div>
        </div>`;
    }

    function buildSubsectorSelectOptions(locale) {
        const c = t(locale);
        const tree = getSectorTreeDef(locale);
        const opts = [`<option value="">${c.selectSubsector}</option>`];
        Object.entries(tree).forEach(([parentId, def]) => {
            def.subsectors.forEach((sub) => {
                opts.push(`<option value="${sub.id}">${def.name} — ${sub.name}</option>`);
            });
        });
        return opts.join('');
    }

    function buildTerritorySelectOptions(locale) {
        const c = t(locale);
        const tree = getTerritoryTreeDef(locale);
        const opts = [`<option value="">${c.selectTerritory}</option>`];
        Object.entries(tree).forEach(([parentId, def]) => {
            def.subterritories.forEach((sub) => {
                opts.push(`<option value="${sub.id}">${def.name} — ${sub.name}</option>`);
            });
        });
        return opts.join('');
    }

    function buildAddCompanyFormHtml(locale) {
        const c = t(locale);
        const center = DEFAULT_MAP_CENTER[localeKey(locale)];
        return `<details class="sindicato-add-company-wrap" id="sindicato-add-company-wrap">
            <summary class="sindicato-add-company-summary">+ ${c.addWorkplace}</summary>
            <form class="sindicato-add-company-form" id="sindicato-add-company-form" data-sindicato-add-company novalidate>
                <p class="sindicato-form-hint">${c.addWorkplaceHint}</p>
                <label>${c.fieldName}<input type="text" name="name" required></label>
                <label>${c.fieldSector}<input type="text" name="sector"></label>
                <label>${c.fieldAddress}<input type="text" name="address" required></label>
                <fieldset class="sindicato-add-company-step2">
                    <legend>${c.addWorkplaceStep2}</legend>
                    <label>${c.fieldSubsector}
                        <select name="subsectorId">${buildSubsectorSelectOptions(locale)}</select>
                    </label>
                    <label>${c.fieldTerritory}
                        <select name="territoryId">${buildTerritorySelectOptions(locale)}</select>
                    </label>
                </fieldset>
                <div class="sindicato-form-row">
                    <label>${c.fieldLat}<input type="number" step="any" name="lat" value="${center.lat}"></label>
                    <label>${c.fieldLng}<input type="number" step="any" name="lng" value="${center.lng}"></label>
                </div>
                <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.addWorkplace}</button>
            </form>
        </details>`;
    }

    function buildManifestHtml(locale) {
        const c = t(locale);
        return `<div class="sindicato-manifest">
            <p class="sindicato-manifest-lead">${c.manifestBody}</p>
            <div class="sindicato-badge-row">
                <span class="sindicato-badge sindicato-badge-neutral">🤝 ${c.badges.neutral}</span>
                <span class="sindicato-badge sindicato-badge-ai">✨ ${c.badges.ai}</span>
                <span class="sindicato-badge sindicato-badge-verified">🛡️ ${c.badges.verified}</span>
            </div>
        </div>`;
    }

    function buildWelcomeHtml(locale) {
        const c = t(locale);
        return `<div class="sindicato-panel sindicato-welcome">
            <img class="sindicato-welcome-logo" src="${SINDICAPP_LOGO_SRC}" alt="SindicApp" width="96" height="96" />
            <h2>${c.welcomeTitle}</h2>
            <p class="sindicato-welcome-lead">${c.welcomeLead}</p>
            <p class="template-muted sindicato-welcome-hint">${c.welcomeHint}</p>
            <div class="sindicato-badge-row sindicato-welcome-badges">
                <span class="sindicato-badge sindicato-badge-neutral">🤝 ${c.badges.neutral}</span>
                <span class="sindicato-badge sindicato-badge-ai">✨ ${c.badges.ai}</span>
                <span class="sindicato-badge sindicato-badge-verified">🛡️ ${c.badges.verified}</span>
            </div>
        </div>`;
    }

    /* Sindicatos y Autónomos (15-07-2026): módulos nuevos, sin contenido de momento —
       placeholder simple hasta que se defina su alcance. */
    function buildComingSoonHtml(locale, icon, sub) {
        const c = t(locale);
        const title = (c.subs && c.subs[sub]) || sub;
        const es = locale === 'es';
        const lead = es
            ? 'Este módulo todavía no tiene contenido.'
            : 'This module has no content yet.';
        const hint = es
            ? 'Está reservado en el cuadro de módulos y llegará en una próxima iteración.'
            : "It's reserved in the module grid and will arrive in a future iteration.";
        return `<div class="sindicato-panel sindicato-coming-soon">
            <h2>${icon} ${title}</h2>
            <p class="template-muted">${lead}</p>
            <p class="sindicato-note">${hint}</p>
        </div>`;
    }

    function buildMapHtml(locale, mapTerritoryId) {
        const c = t(locale);
        if (mapTerritoryId) {
            const terr = getSubterritoryById(locale, mapTerritoryId);
            if (terr) {
                return buildTerritoryDossierHtml(locale, terr, { showMapBack: true, mapTerritoryId });
            }
        }
        const rows = getWorkplaces(locale).map((w) => `
            <button type="button" class="sindicato-workplace-pin" data-sindicato-goto-workplace="${w.id}">
                <span class="sindicato-pin-dot" aria-hidden="true"></span>
                <span class="sindicato-pin-label"><strong>${w.name}</strong><span>${w.address}</span></span>
                <span class="sindicato-pin-meta">${w.reports} ${c.reports.toLowerCase()}</span>
            </button>`).join('');
        return `<div class="sindicato-panel">
            <h2>${c.mapTitle}</h2>
            <p class="template-muted">${c.mapIntro}</p>
            ${buildManifestHtml(locale)}
            <div class="sindicato-map-list" role="list">${rows}</div>
            <p class="sindicato-note">${c.mapHint}</p>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildWorkplacesDirectoryHtml(locale, filter) {
        const c = t(locale);
        const q = String(filter || '').trim().toLowerCase();
        const list = getWorkplaces(locale).filter((w) =>
            !q || w.name.toLowerCase().includes(q) || w.sector.toLowerCase().includes(q)
        );
        const cards = list.map((w) => `
            <button type="button" class="sindicato-workplace-card" data-sindicato-goto-workplace="${w.id}">
                <div class="sindicato-workplace-card-head">
                    <strong>${w.name}</strong>
                    <span class="sindicato-workplace-sector">${w.sector}</span>
                </div>
                <span class="sindicato-workplace-address">${w.address}</span>
                <div class="sindicato-workplace-stats">
                    <span>👥 ${w.workers}</span>
                    <span>⚠️ ${w.reports}</span>
                    <span>✊ ${w.strikeSupport}%</span>
                </div>
            </button>`).join('');
        return `<div class="sindicato-panel">
            <h2>${c.workplacesTitle}</h2>
            <p class="template-muted">${c.mapIntro}</p>
            ${buildAddCompanyFormHtml(locale)}
            <div class="sindicato-workplace-grid">${cards || `<p class="template-muted">${c.noMatch}</p>`}</div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* R3 — bloque de datos registrales en el Resumen de empresa. */
    function buildRegistroHtml(locale, wp) {
        const c = t(locale);
        const reg = REGISTRO_BY_WORKPLACE[wp.id];
        if (!reg) return '';
        return `<div class="sindicato-registry">
            <h3>${c.registryTitle}</h3>
            <dl class="sindicato-registry-grid">
                <div><dt>${c.registryLegalForm}</dt><dd>${reg.legalForm}</dd></div>
                <div><dt>${c.registryFounded}</dt><dd>${reg.founded}</dd></div>
                <div><dt>${c.registryAdmins}</dt><dd>${reg.admins}</dd></div>
                <div><dt>${c.registryLastAccounts}</dt><dd>${reg.lastAccounts}</dd></div>
                <div><dt>${c.registryRevenue}</dt><dd>${reg.revenue}</dd></div>
                <div><dt>${c.registryResult}</dt><dd>${reg.result}</dd></div>
                <div><dt>${c.registryEbitda}</dt><dd>${reg.ebitda}</dd></div>
            </dl>
            <p class="sindicato-registry-source">${c.registrySource}</p>
            <p class="sindicato-registry-tagline">${c.registryTagline}</p>
        </div>`;
    }

    /* R2 — puente institucional: cauces oficiales de denuncia con fuerza legal. */
    function buildOfficialChannelsHtml(locale) {
        const c = t(locale);
        const items = (c.officialChannels || []).map((ch) => {
            const name = ch.url
                ? `<a href="${ch.url}" target="_blank" rel="noopener">${ch.name}</a>`
                : `<strong>${ch.name}</strong>`;
            return `<li>${name}<span>${ch.desc}</span></li>`;
        }).join('');
        return `<div class="sindicato-official-channels">
            <h3>${c.officialChannelsTitle}</h3>
            <p class="template-muted">${c.officialChannelsIntro}</p>
            <ul>${items}</ul>
        </div>`;
    }

    /* R1 — calculadora de convenio (categoría + jornada + salario vs. mínimo de la tabla demo). */
    function buildConvenioCalculatorHtml(locale, wp) {
        const c = t(locale);
        const table = getConvenioSalaryTable(locale, wp);
        const options = table.categories.map((cat) =>
            `<option value="${cat.annualMin}">${cat.name} — ${formatEuroAmount(locale, cat.annualMin)} €</option>`
        ).join('');
        return `<form class="sindicato-convenio-calc" data-sindicato-convenio-calc>
            <h4>${c.calcTitle}</h4>
            <p class="template-muted">${c.calcIntro}</p>
            <p class="sindicato-calc-table-label">${table.label}</p>
            <label>${c.calcCategory}
                <select name="category" required>
                    <option value="">${c.calcSelectCategory}</option>
                    ${options}
                </select>
            </label>
            <div class="sindicato-form-row">
                <label>${c.calcHours}<input type="number" name="hours" min="1" max="60" step="0.5" value="40" required></label>
                <label>${c.calcSalary}<input type="number" name="salary" min="0" step="any" required></label>
            </div>
            <fieldset class="sindicato-calc-period">
                <legend>${c.calcPeriod}</legend>
                <label><input type="radio" name="period" value="monthly" checked> ${c.calcPeriodMonthly}</label>
                <label><input type="radio" name="period" value="annual"> ${c.calcPeriodAnnual}</label>
            </fieldset>
            <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.calcSubmit}</button>
            <p class="sindicato-calc-result" data-sindicato-calc-out hidden></p>
            <p class="sindicato-note">${c.calcDisclaimer}</p>
        </form>`;
    }

    function buildWorkplaceOverviewHtml(locale, wp, opts) {
        const c = t(locale);
        const unionTags = buildUnionTagsHtml(locale, wp.unions || []);
        return `<div class="sindicato-panel">
            <h2>${wp.name}</h2>
            <p class="template-muted">${wp.address} · ${wp.sector}</p>
            <div class="sindicato-summary-grid">
                <div class="sindicato-stat"><strong>${wp.workers}</strong><span>${c.workers}</span></div>
                <div class="sindicato-stat"><strong>${wp.reports + getApprovedReportCount(wp.id)}</strong><span>${c.reports}</span></div>
                <div class="sindicato-stat"><strong>${getStrikeSupportPct(locale, wp.id)}%</strong><span>${c.strikeSupport}</span></div>
            </div>
            ${opts && opts.selfView ? buildVerificationCardHtml(locale) : ''}
            ${buildRegistroHtml(locale, wp)}
            <h3>${c.unionsPresent}</h3>
            <div class="sindicato-union-tags">${unionTags}</div>
            <div class="sindicato-private-room">
                <strong>${c.privateForumTitle}</strong>
                <p>${c.privateForum}</p>
                <p class="sindicato-private-rules">${c.privateForumRules}</p>
            </div>
            ${buildSocialLinksBlockHtml(locale, wp.id)}
            ${buildEmbeddedWikiSectionHtml(locale, 'workplace', { id: wp.id, name: wp.name })}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildModerationHtml(locale, wp) {
        const c = t(locale);
        const queue = getModerationQueue(wp.id);
        const tabs = ['pending', 'approved', 'rejected'];
        const tabLabels = { pending: c.moderationPending, approved: c.moderationApproved, rejected: c.moderationRejected };
        const panels = tabs.map((status) => {
            const items = queue.filter((r) => r.status === status);
            const rows = items.length ? items.map((r) => `
                <div class="sindicato-mod-row">
                    <span class="sindicato-report-type">${c.reportTypes[r.type] || r.type}</span>
                    <p>${r.detail || '—'}</p>
                    <span class="sindicato-mod-ai">AI: ${r.aiFlag}</span>
                    ${status === 'pending' ? `<div class="sindicato-mod-actions">
                        <button type="button" class="sindicato-mod-btn sindicato-mod-approve" data-sindicato-moderate="${r.id}" data-sindicato-moderate-action="approved">${c.moderationApprove}</button>
                        <button type="button" class="sindicato-mod-btn sindicato-mod-reject" data-sindicato-moderate="${r.id}" data-sindicato-moderate-action="rejected">${c.moderationReject}</button>
                    </div>` : ''}
                </div>`).join('') : `<p class="template-muted">${c.moderationEmpty}</p>`;
            return `<details class="sindicato-mod-group" ${status === 'pending' ? 'open' : ''}>
                <summary>${tabLabels[status]} (${items.length})</summary>
                <div class="sindicato-mod-list">${rows}</div>
            </details>`;
        }).join('');
        return `<div class="sindicato-moderation-block"><h3>${c.moderationTitle}</h3>${panels}</div>`;
    }

    function buildWorkplaceReportsHtml(locale, wp) {
        const c = t(locale);
        const reports = REPORTS_BY_WORKPLACE[wp.id] || [];
        const rows = reports.map((r) => `
            <div class="sindicato-report-row ${severityClass(r.severity)}">
                <span class="sindicato-report-type">${c.reportTypes[r.type] || r.type} ${buildTrustBadgeHtml(locale, reportTrustLevel(r.type))}</span>
                <span class="sindicato-report-count">${r.count}</span>
                <span class="sindicato-report-sev">${r.severity}</span>
            </div>`).join('');
        const typeOptions = Object.entries(c.reportTypes).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
        return `<div class="sindicato-panel">
            <h2>${wp.name} — ${c.sections.reports}</h2>
            <p class="template-muted">${c.reportsIntro}</p>
            <div class="sindicato-report-list">${rows}</div>
            <form class="sindicato-report-form" data-sindicato-report-form data-sindicato-workplace-id="${wp.id}">
                <h3>${c.reportFormTitle}</h3>
                <label>${c.sections.reports}
                    <select name="type" required>${typeOptions}</select>
                </label>
                <label>${c.reportFormDetail}
                    <textarea name="detail" rows="3" placeholder="…"></textarea>
                </label>
                <p class="sindicato-ai-hint">${c.reportFormAiNote}</p>
                <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.reportFormSubmit}</button>
            </form>
            ${buildModerationHtml(locale, wp)}
            ${buildOfficialChannelsHtml(locale)}
        </div>`;
    }

    function buildWorkplaceWagesHtml(locale, wp) {
        const c = t(locale);
        const chart = WAGE_CHART[wp.id] || [
            { role: c.wageRoleBase, wage: wp.wageRange.split('–')[0]?.trim() || '—', votes: 12 },
            { role: c.wageRoleMid, wage: '—', votes: 7 },
            { role: c.wageRoleLead, wage: wp.wageRange.split('–')[1]?.trim() || '—', votes: 4 }
        ];
        const rows = chart.map((row) => `
            <div class="sindicato-wage-row">
                <span>${row.role}</span>
                <strong>${row.wage}</strong>
                <span class="sindicato-wage-votes">${row.votes} ✓</span>
            </div>`).join('');
        /* C2 — aportaciones del navegador + formulario para aportar la propia */
        const contribs = getWageContributions(wp.id);
        const contribRows = contribs.map((row) => `
            <div class="sindicato-wage-row sindicato-wage-row--contrib">
                <span>${row.role || c.wageRoleBase}</span>
                <strong>${formatEuroAmount(locale, row.amount)} € ${row.period === 'hourly' ? c.wagePerHour : c.wagePerMonth}</strong>
                <span class="sindicato-wage-votes">✓</span>
            </div>`).join('');
        const roleOptions = chart.map((row) => `<option value="${row.role}">${row.role}</option>`).join('');
        return `<div class="sindicato-panel">
            <h2>${wp.name} — ${c.sections.wages}</h2>
            <p class="template-muted">${c.wagesIntro}</p>
            <div class="sindicato-wage-chart">${rows}</div>
            ${contribRows ? `<h4 class="sindicato-wage-contribs-title">${c.wageContribsTitle}</h4><div class="sindicato-wage-chart">${contribRows}</div>` : ''}
            <p class="sindicato-note">${c.wageConvenioRange} <strong>${wp.wageRange}</strong></p>
            <form class="sindicato-wage-form" data-sindicato-wage-form data-sindicato-workplace-id="${wp.id}" novalidate>
                <h4>${c.wageFormTitle}</h4>
                <p class="template-muted">${c.wageFormHint}</p>
                <label>${c.wageFormRole}
                    <select name="role">${roleOptions}</select>
                </label>
                <div class="sindicato-form-row">
                    <label>${c.wageFormAmount}<input type="number" name="amount" min="0" step="any" required></label>
                    <label>${c.wageFormPeriod}
                        <select name="period">
                            <option value="monthly">${c.wageFormMonthly}</option>
                            <option value="hourly">${c.wageFormHourly}</option>
                        </select>
                    </label>
                </div>
                <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.wageFormSubmit}</button>
            </form>
        </div>`;
    }

    function buildWorkplaceConvenioHtml(locale, wp) {
        const c = t(locale);
        const branchClauses = getConvenioClausesForWorkplace(locale, wp);
        const clauseRows = branchClauses.map((cl) =>
            `<details><summary>${cl.title}</summary><p>${cl.body}</p></details>`
        ).join('');
        return `<div class="sindicato-panel">
            <h2>${wp.name} — ${c.sections.convenio}</h2>
            <div class="sindicato-convenio-box">
                <h3>📋 ${wp.convenio}</h3>
                <p class="sindicato-ai-hint">✨ ${c.aiConvenioHint}</p>
                ${clauseRows ? `<div class="sindicato-faq"><h4>${c.convenioBranchTitle}</h4>${clauseRows}</div>` : ''}
                <form class="sindicato-convenio-ask" data-sindicato-convenio-ask>
                    <label>${c.convenioAskAi}
                        <textarea name="question" rows="2" placeholder="${c.convenioAskPlaceholder}"></textarea>
                    </label>
                    <button type="submit" class="sindicato-cta-btn sindicato-cta-btn-active">${c.convenioAskBtn}</button>
                    <p class="sindicato-convenio-ai-out" data-sindicato-convenio-out hidden>${c.convenioAiSample}</p>
                </form>
                <div class="sindicato-faq">
                    <details><summary>${c.faqOvertimeQ}</summary>
                        <p>${c.faqOvertimeA}</p>
                    </details>
                    <details><summary>${c.faqContractQ}</summary>
                        <p>${c.aiContractHint}</p>
                    </details>
                    ${(c.faqItems || []).map((item) => `<details><summary>${item.q}</summary><p>${item.a}</p></details>`).join('')}
                </div>
                ${buildConvenioFinderHtml(locale, wp)}
                ${buildConvenioCalculatorHtml(locale, wp)}
            </div>
        </div>`;
    }

    function buildWorkplaceActionHtml(locale, wp) {
        const c = t(locale);
        const pct = getStrikeSupportPct(locale, wp.id);
        const votes = loadState().strikeVotes[wp.id] || { yes: 0, no: 0 };
        const userVoted = votes.yes + votes.no > 0;
        return `<div class="sindicato-panel">
            <h2>${wp.name} — ${c.sections.action}</h2>
            <p class="template-muted">${c.actionIntro}</p>
            <div class="sindicato-strike-meter">
                <h3 class="sindicato-strike-meter-title">🌡️ ${c.strikeMeterTitle}</h3>
                <div class="sindicato-strike-track"><div class="sindicato-strike-fill" style="width:${pct}%"></div></div>
                <span class="sindicato-strike-label">${pct}% ${c.strikeSupport} <small>(55% ${c.strikeThreshold})</small></span>
            </div>
            <form class="sindicato-strike-poll" data-sindicato-strike-poll data-sindicato-workplace-id="${wp.id}">
                <p><strong>${c.actionPollActive}</strong></p>
                <div class="sindicato-strike-vote-row">
                    <button type="submit" name="vote" value="yes" class="sindicato-cta-btn sindicato-cta-btn-active">${c.strikeVoteYes}</button>
                    <button type="submit" name="vote" value="no" class="sindicato-cta-btn">${c.strikeVoteNo}</button>
                </div>
                ${userVoted ? `<p class="sindicato-note">${c.strikeVoteThanks}</p>` : ''}
            </form>
            ${buildAgendaHtml(locale, getAgendaForWorkplace(locale, wp.id), { title: c.agendaTitle })}
            ${buildAgendaAddFormHtml(locale, wp.id)}
            <ul class="sindicato-action-list">
                <li>📝 ${c.actionPrivateList}</li>
                <li>💬 ${c.actionCoordChat}</li>
            </ul>
        </div>`;
    }

    /* Sidebar-only union browsing (UI reform 12-07): the background workspace no longer
       renders a card for every union at once — it shows a directory summary and defers
       to the sidebar select. Individual profiles still render full detail via
       buildUnionSectionHtml once a union is picked. */
    function buildUnionsDirectoryHtml(locale) {
        const c = t(locale);
        const unions = getUnions(locale);
        const totalMembers = unions.reduce((sum, u) => sum + (u.members || 0), 0);
        const totalDelegates = unions.reduce((sum, u) => sum + (u.delegates || 0), 0);
        return `<div class="sindicato-panel sindicato-unions-empty">
            <h2>${c.unionsTitle}</h2>
            <p class="template-muted">${c.unionsIntro}</p>
            <div class="sindicato-summary-grid">
                <div class="sindicato-stat"><strong>${unions.length}</strong><span>${c.unionsStatCount}</span></div>
                <div class="sindicato-stat"><strong>${totalMembers.toLocaleString()}</strong><span>${c.unionsStatMembers}</span></div>
                <div class="sindicato-stat"><strong>${totalDelegates.toLocaleString()}</strong><span>${c.unionsStatDelegates}</span></div>
            </div>
            <p class="sindicato-union-empty-hint">👈 ${c.unionsPick}</p>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildUnionBackBtnHtml(c) {
        return `<p><button type="button" class="sindicato-back-btn" data-sindicato-union-back>← ${c.unionBack}</button></p>`;
    }

    function buildRelatedUnionsHtml(locale, union) {
        const c = t(locale);
        const related = getUnions(locale).filter((u) => u.id !== union.id && u.sector === union.sector);
        if (!related.length) return '';
        const links = related.map((u) =>
            `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-union="${u.id}">${u.name}</button>`
        ).join('');
        return `<p class="sindicato-union-companies-label">${c.unionRelatedTitle}</p>
            <div class="sindicato-union-companies">${links}</div>`;
    }

    function buildUnionFoundedRowHtml(c, union) {
        if (!union.founded && !union.website) return '';
        const foundedPart = union.founded ? `<span>📅 ${c.unionFoundedLabel}: <strong>${union.founded}</strong></span>` : '';
        const websitePart = union.website
            ? `<span>🔗 <a href="${union.website}" target="_blank" rel="noopener noreferrer">${c.unionWebsiteLabel}</a></span>`
            : '';
        return `<div class="sindicato-union-founded-row">${foundedPart}${websitePart}</div>`;
    }

    function buildUnionMilestonesHtml(c, union) {
        if (!union.milestones || !union.milestones.length) return '';
        const items = union.milestones.map((m) =>
            `<li class="sindicato-milestone-item"><span class="sindicato-milestone-year">${m.year}</span><span class="sindicato-milestone-text">${m.text}</span></li>`
        ).join('');
        return `<div class="sindicato-union-milestones">
            <h3>${c.unionMilestonesTitle}</h3>
            <ol class="sindicato-milestone-list">${items}</ol>
        </div>`;
    }

    function buildUnionOverviewHtml(locale, union) {
        const c = t(locale);
        const labels = union.presenceLabels || {};
        const isHousing = union.type === 'housing';
        const companiesCount = isHousing ? (union.buildingsOrganized || 0) : getCompaniesForUnion(locale, union.name).length;
        return `<div class="sindicato-panel">
            ${buildUnionBackBtnHtml(c)}
            <h2>${union.name}</h2>
            <p class="template-muted">${c.unionOverviewIntro}</p>
            <span class="template-muted">${union.sector}</span>
            ${buildUnionFoundedRowHtml(c, union)}
            ${union.about ? `<p class="sindicato-union-about">${union.about}</p>` : ''}
            <div class="sindicato-summary-grid">
                <div class="sindicato-stat"><strong>${union.delegates}</strong><span>${labels.delegates || c.presenceDelegates}</span></div>
                <div class="sindicato-stat"><strong>${union.members.toLocaleString()}</strong><span>${c.members}</span></div>
                <div class="sindicato-stat"><strong>${companiesCount}</strong><span>${labels.companies || c.companiesOnSite}</span></div>
            </div>
            ${union.liberado !== '—' ? `<p><strong>${c.officerLabel}:</strong> ${union.liberado}</p>` : ''}
            <div class="sindicato-union-presence">
                <span>${labels.agreements || c.presenceAgreements}: <strong>${union.agreements}</strong></span>
                <span>${labels.sectors || c.presenceSectors}: <strong>${union.mainSectors}</strong></span>
            </div>
            <div class="sindicato-bridge-jumps">
                ${buildUnionSectionJumpBtn('forum', c.unionOpenForum, union.id)}
                ${buildUnionSectionJumpBtn('structure', c.unionOpenStructure, union.id)}
            </div>
            ${buildUnionMilestonesHtml(c, union)}
            ${buildRelatedUnionsHtml(locale, union)}
            ${buildSocialLinksBlockHtml(locale, union.id)}
            ${buildEmbeddedWikiSectionHtml(locale, 'union', { id: union.id, name: union.name })}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildUnionForumHtml(locale, union) {
        const c = t(locale);
        const posts = getUnionForumPosts(locale, union.id);
        const cards = posts.map((post) =>
            `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${locale === 'es' ? 'respuestas' : 'replies'}</p></div>`
        ).join('') || `<p class="template-muted">—</p>`;
        return `<div class="sindicato-panel">
            ${buildUnionBackBtnHtml(c)}
            <h2>${union.name} — ${c.unionSections.forum}</h2>
            <p class="template-muted">${c.unionForumIntro}</p>
            ${cards}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildUnionStructureHtml(locale, union) {
        const c = t(locale);
        const es = locale === 'es';
        if (union.type === 'housing') {
            const labels = union.presenceLabels || {};
            return `<div class="sindicato-panel">
                ${buildUnionBackBtnHtml(c)}
                <h2>${union.name} — ${c.unionSections.structure}</h2>
                <p class="template-muted">${c.unionStructureIntro}</p>
                <div class="sindicato-coord-card"><strong>${es ? 'Modelo organizativo' : 'Organisational model'}</strong><p>${es ? 'Horizontal y asambleario — asamblea anual de afiliadas, plenarias mensuales y tres comisiones (comunicación, acción sindical, organización) abiertas a toda la afiliación.' : 'Horizontal and assembly-based — annual members\' assembly, monthly plenaries, and three open commissions (communication, union action, organisation).'}</p></div>
                <div class="sindicato-coord-card"><strong>${labels.delegates || (es ? 'Secciones' : 'Sections')}</strong><p>${union.delegates} ${es ? 'secciones por territorio y por gran tenedor (p. ej. Blackstone, La Caixa)' : 'sections organised by territory and by large landlord (e.g. Blackstone)'}</p></div>
                <div class="sindicato-coord-card"><strong>${es ? 'Sector' : 'Sector'}</strong><p>${union.sector}</p></div>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        return `<div class="sindicato-panel">
            ${buildUnionBackBtnHtml(c)}
            <h2>${union.name} — ${c.unionSections.structure}</h2>
            <p class="template-muted">${c.unionStructureIntro}</p>
            <div class="sindicato-coord-card"><strong>${es ? 'Comité ejecutivo' : 'Executive committee'}</strong><p>${es ? 'Demo — 7 plazas' : 'Demo — 7 seats'}</p></div>
            <div class="sindicato-coord-card"><strong>${es ? 'Delegadas en empresa' : 'Workplace delegates'}</strong><p>${getCompaniesForUnion(locale, union.name).length} ${es ? 'empresas con presencia' : 'companies with presence'}</p></div>
            <div class="sindicato-coord-card"><strong>${es ? 'Sector' : 'Sector'}</strong><p>${union.sector}</p></div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildUnionCompaniesHtml(locale, union) {
        const c = t(locale);
        if (union.type === 'housing') {
            const labels = union.presenceLabels || {};
            return `<div class="sindicato-panel">
                ${buildUnionBackBtnHtml(c)}
                <h2>${union.name} — ${c.unionSections.companies}</h2>
                <p class="template-muted">${c.unionHousingCompaniesNote}</p>
                <div class="sindicato-summary-grid">
                    <div class="sindicato-stat"><strong>${union.buildingsOrganized || 0}</strong><span>${labels.companies || c.companiesOnSite}</span></div>
                </div>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        const companies = getCompaniesForUnion(locale, union.name);
        const links = companies.map((co) =>
            `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-workplace="${co.id}">${co.name}</button>`
        ).join('') || `<span class="template-muted">—</span>`;
        return `<div class="sindicato-panel">
            ${buildUnionBackBtnHtml(c)}
            <h2>${union.name} — ${c.unionSections.companies}</h2>
            <p class="template-muted">${c.companiesOnSite}</p>
            <div class="sindicato-union-companies sindicato-union-companies--page">${links}</div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildUnionSectionHtml(locale, unionId, section) {
        const union = findUnion(locale, unionId);
        if (!union) return buildUnionsDirectoryHtml(locale);
        if (section === 'forum') return buildUnionForumHtml(locale, union);
        if (section === 'structure') return buildUnionStructureHtml(locale, union);
        if (section === 'companies') return buildUnionCompaniesHtml(locale, union);
        return buildUnionOverviewHtml(locale, union);
    }

    const SINDICATO_GENERAL_FORUM_THREADS = {
        ie: [
            { id: 'faq-delegate', pinned: true, title: 'READ FIRST: Acting as a workplace rep in Dublin — FAQ', meta: 'Moderation · 86 replies · Last post 2h ago' },
            { id: 'convenio-hospitality', title: 'Hospitality JLC renegotiation — assembly calendar Docklands', meta: 'Convenio · 54 replies · 5h ago' },
            { id: 'split-shift', title: 'Split shifts without compensation — case log Temple Bar', meta: 'Reports · 132 replies · Yesterday' },
            { id: 'rent-docklands', title: 'Rent cap campaign — linking tenant union + workplace delegates', meta: 'Housing · 47 replies · Yesterday' },
            { id: 'hr-retaliation', title: 'Internal security: retaliation reports after walkout', meta: 'Security · 38 replies · Yesterday' },
            { id: 'pay-scales', title: 'Published pay scales vs payslip — logistics branch thread', meta: 'Wages · 29 replies · 2 days ago' },
            { id: 'nurse-ratios', title: 'Private healthcare nurse ratios — St James cluster', meta: 'Healthcare · 41 replies · 2 days ago' },
            { id: 'remote-policy', title: 'Remote work policy Silicon Docks — right to disconnect', meta: 'Technology · 33 replies · 3 days ago' },
            { id: 'minutes-template', title: 'Template: workplace assembly minutes (hospitality)', meta: 'Resources · 19 replies · 3 days ago' },
            { id: 'anonymous-report', title: 'Guide: anonymous report with AI + human review', meta: 'Moderation · 27 replies · 4 days ago' },
            { id: 'strike-fund', title: 'Sector strike fund — quarterly transparency ledger', meta: 'Finance · 16 replies · 5 days ago' }
        ],
        es: [
            { id: 'faq-delegado', pinned: true, title: 'LEER PRIMERO: Actuar como delegada en Barcelona — FAQ', meta: 'Moderación · 92 respuestas · Último hace 2 h' },
            { id: 'convenio-hosteleria', title: 'Renegociación convenio hostelería Barcelona — calendario de asambleas', meta: 'Convenio · 61 respuestas · Hace 5 h' },
            { id: 'turno-partido', title: 'Turnos partidos sin compensación — recopilación de casos Zona Franca', meta: 'Denuncias · 148 respuestas · Ayer' },
            { id: 'desahucio-balmes', title: 'Desahucio Balmes 120 — coordinación sindical + PAH', meta: 'Vivienda · 53 respuestas · Ayer' },
            { id: 'filtracion-rrhh', title: 'Seguridad interna: represalias tras paro parcial', meta: 'Seguridad · 44 respuestas · Ayer' },
            { id: 'tablas-salariales', title: 'Tablas salariales logística Ponent vs nómina real', meta: 'Sueldos · 37 respuestas · Hace 2 días' },
            { id: 'ratios-sanidad', title: 'Ratios enfermería — clínicas privadas Eixample', meta: 'Sanidad · 49 respuestas · Hace 2 días' },
            { id: 'teletrabajo-22', title: 'Teletrabajo en 22@ — cláusulas de desconexión digital', meta: 'Tecnología · 31 respuestas · Hace 3 días' },
            { id: 'modelo-acta', title: 'Modelo de acta para asambleas de empresa (hostelería)', meta: 'Recursos · 22 respuestas · Hace 3 días' },
            { id: 'denuncia-anonima', title: 'Guía: denuncia anónima con revisión IA + humana', meta: 'Moderación · 28 respuestas · Hace 4 días' },
            { id: 'fondo-huelga', title: 'Fondo de huelga sectorial — transparencia trimestral', meta: 'Finanzas · 18 respuestas · Hace 5 días' }
        ]
    };

    const SINDICATO_FORUM_THREAD_BODIES = {
        ie: {
            'faq-delegate': '<p>Pin this thread covers verification, what you can and cannot do as a rep, and when to escalate to union liaison.</p><p>Docklands delegates: use the private room on your company profile after on-site verification.</p>',
            'convenio-hospitality': '<p>Q3 bargaining calendar for hospitality JLC — Temple Bar and Docklands shops coordinating assembly dates.</p>',
            'split-shift': '<p>Collecting split-shift cases without paid gap. Template report link in company → Reports.</p>',
            'rent-docklands': '<p>Tenant union thread cross-post: workplace delegates supporting rent cap mobilisation — no employer retaliation tolerated.</p>',
            'hr-retaliation': '<p>If management contacted HR after a walkout vote, document timeline and submit anonymous report.</p>',
            'pay-scales': '<p>Compare published SNA bands with crowd-sourced wage chart on company profiles.</p>',
            'nurse-ratios': '<p>Safe staffing campaign — private hospitals cluster around James St.</p>',
            'remote-policy': '<p>ICT agreement template for right to disconnect — FSU branch reviewing.</p>',
            'minutes-template': '<p>Downloadable assembly minutes template (demo markdown block).</p>',
            'anonymous-report': '<p>Reports go to moderation queue; AI flags duplicates before human review.</p>',
            'strike-fund': '<p>Demo ledger: sector pools and routed dues — coordination council publishes quarterly summary.</p>'
        },
        es: {
            'faq-delegado': '<p>Hilo fijado: verificación, límites legales de la delegada y cuándo escalar al sindicato de enlace.</p><p>Delegadas Zona Franca / Eixample: sala privada en el perfil de empresa tras verificación in situ.</p>',
            'convenio-hosteleria': '<p>Calendario de asambleas para la mesa de hostelería Barcelona 2024 — Boqueria y Litoral coordinando fechas.</p>',
            'turno-partido': '<p>Recopilación de turnos partidos sin compensación. Plantilla de denuncia en empresa → Denuncias.</p>',
            'desahucio-balmes': '<p>Concentración 9:00 — delegadas de hostelería y logística del Eixample apoyan bloque PAH Balmes.</p>',
            'filtracion-rrhh': '<p>Si RRHH contactó tras votación de paro, documenta cronología y envía denuncia anónima.</p>',
            'tablas-salariales': '<p>Comparativa entre tablas del convenio de transporte y gráfico salarial colaborativo en perfiles de empresa.</p>',
            'ratios-sanidad': '<p>Campaña ratios mínimos — cluster clínicas privadas Sant Pere / Eixample.</p>',
            'teletrabajo-22': '<p>Plantilla de cláusula de desconexión para equipos de desarrollo en Poblenou.</p>',
            'modelo-acta': '<p>Modelo de acta de asamblea (demo) — adaptar a comité de empresa.</p>',
            'denuncia-anonima': '<p>Las denuncias entran en cola de moderación; la IA filtra duplicados antes de revisión humana.</p>',
            'fondo-huelga': '<p>Libro demo: fondos sectoriales y cuotas enrutadas — consejo publica resumen trimestral.</p>'
        }
    };

    function getGeneralForumThreads(locale) {
        const key = localeKey(locale);
        return SINDICATO_GENERAL_FORUM_THREADS[key] || [];
    }

    function findForumThread(locale, slug) {
        return getGeneralForumThreads(locale).find((t) => t.id === slug) || null;
    }

    function getForumThreadBody(locale, slug) {
        const key = localeKey(locale);
        return SINDICATO_FORUM_THREAD_BODIES[key]?.[slug]
            || SINDICATO_FORUM_THREAD_BODIES.es?.[slug]
            || SINDICATO_FORUM_THREAD_BODIES.ie?.[slug]
            || '<p>—</p>';
    }

    function buildForumThreadHtml(locale, slug) {
        const c = t(locale);
        const thread = findForumThread(locale, slug);
        if (!thread) {
            return `<div class="sindicato-panel"><p class="template-muted">${c.forumThreadMissing}</p>
                <button type="button" class="sindicato-cta-btn" data-sindicato-forum-back>${c.forumBack}</button></div>`;
        }
        markForumThreadRead(slug);
        return `<div class="sindicato-panel sindicato-forum-thread">
            <p><button type="button" class="sindicato-back-btn" data-sindicato-forum-back>← ${c.forumBack}</button></p>
            <h2>${thread.title}</h2>
            <p class="template-muted">${thread.meta} · ${buildTrustBadgeHtml(locale, forumThreadTrust(locale, slug))}</p>
            <div class="sindicato-forum-thread-body">${getForumThreadBody(locale, slug)}</div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildGeneralForumBoardHtml(locale) {
        const items = getGeneralForumThreads(locale).map((thread, i) => {
            const pinned = thread.pinned ? ' cp-forum-post--pinned' : '';
            const slug = thread.id || `thread-${i}`;
            return `<li><a class="cp-forum-post${pinned}" href="#sindicato-forum:${slug}" data-sindicato-forum-thread="${slug}"><span class="cp-forum-post-title">${thread.title}</span><span class="cp-forum-post-meta">${thread.meta} · ${buildTrustBadgeHtml(locale, forumThreadTrust(locale, slug))}</span></a></li>`;
        }).join('');
        return `<ul class="cp-forum-board">${items}</ul>`;
    }

    function buildFeedCardHtml(locale, item) {
        const unionAttrs = item.unionId
            ? ` data-sindicato-feed-goto-union data-sindicato-union-id="${item.unionId}" data-sindicato-union-section="${item.section || 'forum'}"`
            : ` data-sindicato-feed-goto data-sindicato-workplace-id="${item.workplaceId}" data-sindicato-section="${item.section}"`;
        const title = item.unionId && item.type === 'union'
            ? (findUnion(locale, item.unionId)?.name || item.workplace)
            : item.workplace;
        return `<button type="button" class="sindicato-feed-card${item.hot ? ' sindicato-feed-card-hot' : ''}"${unionAttrs}>
            <div class="sindicato-feed-icon">${feedIcon(item.type)}</div>
            <div class="sindicato-feed-body">
                <strong>${title}</strong>
                <p>${item.text}</p>
                <time>${item.time}</time>
            </div>
        </button>`;
    }

    function buildFeedHtml(locale, ctx) {
        const c = t(locale);
        const options = ctx || {};
        const scope = options.feedScope || 'general';

        if (scope === 'general') {
            if (options.forumThreadSlug) {
                return buildForumThreadHtml(locale, options.forumThreadSlug);
            }
            return `<div class="sindicato-panel">
                <h2>${c.feedScopeGeneral}</h2>
                <p class="template-muted">${c.feedIntro}</p>
                ${buildAgendaHtml(locale, getUpcomingAgendaDigest(locale, 5), { title: c.agendaUpcomingTitle, compact: true })}
                ${buildGeneralForumBoardHtml(locale)}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }

        if (scope === 'sectores') {
            const sectorNodeId = options.feedSectorId || '';
            const sectorNode = sectorNodeId ? resolveSectorNode(locale, sectorNodeId) : null;
            if (!sectorNode) {
                /* Foro (13-07-2026): el árbol de subforos por sector vive en el fondo,
                   no en la sidebar — misma interacción (data-sindicato-feed-sector). */
                return `<div class="sindicato-panel sindicato-forum-scope-picker">
                    <h2>🏭 ${c.foroPickSectorTitle}</h2>
                    <p class="template-muted">${c.foroPickSectorIntro}</p>
                    <div class="sindicato-sector-tree sindicato-forum-scope-tree" role="tree" aria-label="${c.foroPickSectorTitle}">
                        ${buildSectorTreeHtml(locale, { activeId: '', attr: 'data-sindicato-feed-sector', showDemoNote: true })}
                    </div>
                </div>`;
            }
            const companyId = options.feedCompanyId || '';
            const scopeWorkplaces = sectorNode.workplaces;
            const workplaceIds = new Set(scopeWorkplaces.map((wp) => wp.id));
            const liveCards = getFeed(locale)
                .filter((item) => item.workplaceId && workplaceIds.has(item.workplaceId))
                .filter((item) => !companyId || item.workplaceId === companyId)
                .map((item) => buildFeedCardHtml(locale, item))
                .join('');
            const forumPosts = sectorNode.forumPosts.map((post) =>
                `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${locale === 'es' ? 'respuestas' : 'replies'}</p></div>`
            ).join('');
            const companyNote = companyId
                ? `<p class="template-muted">${scopeWorkplaces.find((wp) => wp.id === companyId)?.name || ''}</p>`
                : '';
            const feedMeta = sectorNode.type === 'sector'
                ? c.feedScopeSector
                : sectorNode.type === 'subsubsector'
                    ? `${sectorNode.parentName} — ${sectorNode.subsectorName} — ${c.feedScopeSector}`
                    : `${sectorNode.parentName} — ${c.feedScopeSector}`;
            return `<div class="sindicato-panel">
                <p><button type="button" class="sindicato-back-btn" data-sindicato-feed-scope="sectores">← ${c.foroBackToTree}</button></p>
                <h2>${sectorNode.name}</h2>
                <p class="template-muted">${feedMeta}</p>
                <p>${buildTelegramLinkHtml(locale, sectorNode.id)}</p>
                ${companyNote}
                <h3>${c.sectoresForumPosts}</h3>
                ${forumPosts}
                <div class="sindicato-feed">${liveCards || `<p class="template-muted">—</p>`}</div>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }

        if (scope === 'territorios') {
            const territoryId = options.feedTerritoryId || '';
            const territory = territoryId ? getSubterritoryById(locale, territoryId) : null;
            if (!territory) {
                /* Foro (13-07-2026): árbol territorial completo (provincia → comarca) en el
                   fondo, desplegado — antes el ámbito Territorios estaba incompleto en la sidebar. */
                return `<div class="sindicato-panel sindicato-forum-scope-picker">
                    <h2>🗺️ ${c.foroPickTerritoryTitle}</h2>
                    <p class="template-muted">${c.foroPickTerritoryIntro}</p>
                    <div class="sindicato-sector-tree sindicato-forum-scope-tree" role="tree" aria-label="${c.foroPickTerritoryTitle}">
                        ${buildTerritoryScopeTreeHtml(locale, '', 'data-sindicato-feed-territory', { collapsed: false })}
                    </div>
                </div>`;
            }
            const companyId = options.feedCompanyId || '';
            const scopeWorkplaces = territory.workplaces;
            const workplaceIds = new Set(scopeWorkplaces.map((wp) => wp.id));
            const liveCards = getFeed(locale)
                .filter((item) => item.workplaceId && workplaceIds.has(item.workplaceId))
                .filter((item) => !companyId || item.workplaceId === companyId)
                .map((item) => buildFeedCardHtml(locale, item))
                .join('');
            const forumPosts = territory.forumPosts.map((post) =>
                `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${locale === 'es' ? 'respuestas' : 'replies'}</p></div>`
            ).join('');
            const companyNote = companyId
                ? `<p class="template-muted">${scopeWorkplaces.find((wp) => wp.id === companyId)?.name || ''}</p>`
                : '';
            return `<div class="sindicato-panel">
                <p><button type="button" class="sindicato-back-btn" data-sindicato-feed-scope="territorios">← ${c.foroBackToTree}</button></p>
                <h2>${territory.name}</h2>
                <p class="template-muted">${territory.parentName} — ${c.feedScopeTerritory}</p>
                <p>${buildTelegramLinkHtml(locale, territory.id)}</p>
                ${companyNote}
                <h3>${c.sectoresForumPosts}</h3>
                ${forumPosts}
                <div class="sindicato-feed">${liveCards || `<p class="template-muted">—</p>`}</div>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }

        return buildFeedHtml(locale, { feedScope: 'general' });
    }

    function slugifySector(name) {
        return String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const SECTOR_TREE = {
        es: {
            hosteleria: {
                name: 'Hostelería',
                subsectors: [
                    {
                        id: 'hosteleria-restauracion',
                        name: 'Restauración',
                        subsubsectors: [{ id: 'hosteleria-restauracion-cocina', name: 'Cocina' }]
                    },
                    { id: 'hosteleria-bares', name: 'Bares y cafeterías' },
                    { id: 'hosteleria-catering', name: 'Catering y eventos' }
                ]
            },
            logistica: {
                name: 'Logística',
                subsectors: [
                    {
                        id: 'logistica-almacen',
                        name: 'Almacén y picking',
                        subsubsectors: [{ id: 'logistica-almacen-carretilleros', name: 'Carretilleros' }]
                    },
                    { id: 'logistica-transporte', name: 'Transporte por carretera' },
                    { id: 'logistica-ultima-milla', name: 'Última milla' }
                ]
            },
            'sanidad-privada': {
                name: 'Sanidad privada',
                subsectors: [
                    {
                        id: 'sanidad-privada-hospitalizacion',
                        name: 'Hospitalización',
                        subsubsectors: [{ id: 'sanidad-privada-hospitalizacion-plantas', name: 'Plantas de hospitalización' }]
                    },
                    { id: 'sanidad-privada-consultas', name: 'Consultas ambulatorias' },
                    { id: 'sanidad-privada-urgencias', name: 'Urgencias' }
                ]
            },
            tecnologia: {
                name: 'Tecnología',
                subsectors: [
                    {
                        id: 'tecnologia-desarrollo',
                        name: 'Desarrollo de software',
                        subsubsectors: [{ id: 'tecnologia-desarrollo-backend', name: 'Backend' }]
                    },
                    { id: 'tecnologia-soporte', name: 'Soporte y operaciones IT' },
                    { id: 'tecnologia-consultoria', name: 'Consultoría tecnológica' }
                ]
            },
            comercio: {
                name: 'Comercio',
                subsectors: [
                    {
                        id: 'comercio-alimentacion',
                        name: 'Alimentación',
                        subsubsectors: [{ id: 'comercio-alimentacion-caja', name: 'Caja y reposición' }]
                    },
                    { id: 'comercio-gran-superficie', name: 'Gran superficie' },
                    { id: 'comercio-barrio', name: 'Comercio de barrio' }
                ]
            }
        },
        ie: {
            hospitality: {
                name: 'Hospitality',
                subsectors: [
                    { id: 'hospitality-restaurants', name: 'Restaurants' },
                    { id: 'hospitality-pubs', name: 'Pubs & hotels' },
                    { id: 'hospitality-catering', name: 'Catering & events' }
                ]
            },
            logistics: {
                name: 'Logistics',
                subsectors: [
                    {
                        id: 'logistics-warehousing',
                        name: 'Warehousing & picking',
                        subsubsectors: [{ id: 'logistics-warehousing-forklift', name: 'Forklift ops' }]
                    },
                    { id: 'logistics-haulage', name: 'Road haulage' },
                    { id: 'logistics-last-mile', name: 'Last mile' }
                ]
            },
            healthcare: {
                name: 'Healthcare',
                subsectors: [
                    {
                        id: 'healthcare-inpatient',
                        name: 'Inpatient care',
                        subsubsectors: [{ id: 'healthcare-inpatient-wards', name: 'Ward care' }]
                    },
                    { id: 'healthcare-outpatient', name: 'Outpatient clinics' },
                    { id: 'healthcare-emergency', name: 'Emergency services' }
                ]
            },
            technology: {
                name: 'Technology',
                subsectors: [
                    {
                        id: 'technology-software',
                        name: 'Software development',
                        subsubsectors: [{ id: 'technology-software-backend', name: 'Backend' }]
                    },
                    { id: 'technology-ops', name: 'IT support & ops' },
                    { id: 'technology-consulting', name: 'Tech consulting' }
                ]
            },
            retail: {
                name: 'Retail',
                subsectors: [
                    {
                        id: 'retail-grocery',
                        name: 'Grocery',
                        subsubsectors: [{ id: 'retail-grocery-checkout', name: 'Checkout & replenishment' }]
                    },
                    { id: 'retail-department', name: 'Department stores' },
                    { id: 'retail-local', name: 'Local retail' }
                ]
            }
        }
    };

    /* Territorios (12-07-2026) — estructura provincia → comarca (todas las comarcas de
       Catalunya). Los ids demo históricos (barcelona-ciutat, girona-comarca, central-bages…)
       se conservan porque los referencian empresas, alertas, edificios y foros; las comarcas
       nuevas no tienen datos demo todavía. Municipios: solo estructura, ver TERRITORY_MUNICIPALITIES. */
    const TERRITORY_TREE = {
        es: {
            barcelona: {
                name: 'Barcelona',
                subterritories: [
                    { id: 'alt-penedes', name: 'Alt Penedès' },
                    { id: 'central-anoia', name: 'Anoia' },
                    { id: 'central-bages', name: 'Bages' },
                    { id: 'barcelona-ponent', name: 'Baix Llobregat' },
                    { id: 'barcelona-ciutat', name: 'Barcelonès' },
                    { id: 'bergueda', name: 'Berguedà' },
                    { id: 'garraf', name: 'Garraf' },
                    { id: 'llucanes', name: 'Lluçanès' },
                    { id: 'barcelona-litoral', name: 'Maresme' },
                    { id: 'moianes', name: 'Moianès' },
                    { id: 'central-osona', name: 'Osona' },
                    { id: 'valles-occidental', name: 'Vallès Occidental' },
                    { id: 'valles-oriental', name: 'Vallès Oriental' }
                ]
            },
            girona: {
                name: 'Girona',
                subterritories: [
                    { id: 'alt-emporda', name: 'Alt Empordà' },
                    { id: 'baix-emporda', name: 'Baix Empordà' },
                    { id: 'cerdanya', name: 'Cerdanya' },
                    { id: 'garrotxa', name: 'Garrotxa' },
                    { id: 'girona-comarca', name: 'Gironès' },
                    { id: 'pla-estany', name: 'Pla de l\'Estany' },
                    { id: 'girona-interior', name: 'Ripollès' },
                    { id: 'girona-costa', name: 'Selva' }
                ]
            },
            lleida: {
                name: 'Lleida',
                subterritories: [
                    { id: 'lleida-alt-urgell', name: 'Alt Urgell' },
                    { id: 'alta-ribagorca', name: 'Alta Ribagorça' },
                    { id: 'aran', name: 'Aran' },
                    { id: 'garrigues', name: 'Garrigues' },
                    { id: 'lleida-noguera', name: 'Noguera' },
                    { id: 'pallars-jussa', name: 'Pallars Jussà' },
                    { id: 'pallars-sobira', name: 'Pallars Sobirà' },
                    { id: 'pla-urgell', name: 'Pla d\'Urgell' },
                    { id: 'segarra', name: 'Segarra' },
                    { id: 'lleida-segria', name: 'Segrià' },
                    { id: 'solsones', name: 'Solsonès' },
                    { id: 'urgell', name: 'Urgell' }
                ]
            },
            tarragona: {
                name: 'Tarragona',
                subterritories: [
                    { id: 'alt-camp', name: 'Alt Camp' },
                    { id: 'baix-camp', name: 'Baix Camp' },
                    { id: 'tarragona-ebre', name: 'Baix Ebre' },
                    { id: 'baix-penedes', name: 'Baix Penedès' },
                    { id: 'conca-barbera', name: 'Conca de Barberà' },
                    { id: 'montsia', name: 'Montsià' },
                    { id: 'tarragona-priorat', name: 'Priorat' },
                    { id: 'ribera-ebre', name: 'Ribera d\'Ebre' },
                    { id: 'tarragona-camp', name: 'Tarragonès' }
                ]
            }
        },
        ie: {
            dublin: {
                name: 'Dublin',
                subterritories: [
                    { id: 'dublin-docklands', name: 'Docklands' },
                    { id: 'dublin-city-centre', name: 'City centre' },
                    { id: 'dublin-south', name: 'South Dublin' }
                ]
            },
            cork: {
                name: 'Cork',
                subterritories: [
                    { id: 'cork-harbour', name: 'Cork Harbour' },
                    { id: 'cork-city', name: 'Cork city' },
                    { id: 'cork-west', name: 'West Cork' }
                ]
            },
            galway: {
                name: 'Galway',
                subterritories: [
                    { id: 'galway-city', name: 'Galway city' },
                    { id: 'galway-coast', name: 'Coast' },
                    { id: 'galway-inland', name: 'Inland' }
                ]
            },
            limerick: {
                name: 'Limerick',
                subterritories: [
                    { id: 'limerick-dock', name: 'Docklands' },
                    { id: 'limerick-east', name: 'East Limerick' },
                    { id: 'limerick-west', name: 'West Limerick' }
                ]
            },
            waterford: {
                name: 'Waterford',
                subterritories: [
                    { id: 'waterford-city', name: 'Waterford city' },
                    { id: 'waterford-coast', name: 'Coast' },
                    { id: 'waterford-inland', name: 'Inland' }
                ]
            }
        }
    };

    /* Municipios por comarca — solo estructura demo (12-07-2026). La lista completa
       (~947 municipios) llegará en una fase posterior; de momento unos pocos por comarca demo. */
    const TERRITORY_MUNICIPALITIES = {
        es: {
            'barcelona-ciutat': [
                { id: 'municipality-barcelona', name: 'Barcelona' },
                { id: 'municipality-hospitalet', name: "L'Hospitalet de Llobregat" },
                { id: 'municipality-badalona', name: 'Badalona' }
            ],
            'barcelona-litoral': [
                { id: 'municipality-mataro', name: 'Mataró' },
                { id: 'municipality-masnou', name: 'El Masnou' }
            ],
            'girona-comarca': [
                { id: 'municipality-girona', name: 'Girona' },
                { id: 'municipality-salt', name: 'Salt' }
            ],
            'girona-costa': [
                { id: 'municipality-blanes', name: 'Blanes' },
                { id: 'municipality-lloret', name: 'Lloret de Mar' }
            ],
            'lleida-segria': [
                { id: 'municipality-lleida', name: 'Lleida' }
            ],
            'tarragona-camp': [
                { id: 'municipality-tarragona', name: 'Tarragona' }
            ],
            'baix-camp': [
                { id: 'municipality-reus', name: 'Reus' }
            ],
            'central-bages': [
                { id: 'municipality-manresa', name: 'Manresa' }
            ]
        },
        ie: {}
    };

    function getMunicipalitiesForTerritory(locale, territoryId) {
        const key = localeKey(locale);
        return TERRITORY_MUNICIPALITIES[key]?.[territoryId] || [];
    }

    /** Links SindicApp territory ids → boundary layer + GeoJSON display name(s). */
    const TERRITORY_BOUNDARY_MAP = {
        es: {
            'barcelona-ciutat': { layer: 'catComarques', names: ['Barcelonès'] },
            'barcelona-litoral': { layer: 'catComarques', names: ['Maresme'] },
            'barcelona-ponent': { layer: 'catComarques', names: ['Baix Llobregat'] },
            'girona-comarca': { layer: 'catComarques', names: ['Gironès'] },
            'girona-costa': { layer: 'catComarques', names: ['Selva'] },
            'girona-interior': { layer: 'catComarques', names: ['Ripollès'] },
            'lleida-segria': { layer: 'catComarques', names: ['Segrià'] },
            'lleida-alt-urgell': { layer: 'catComarques', names: ['Alt Urgell'] },
            'lleida-noguera': { layer: 'catComarques', names: ['Noguera'] },
            'tarragona-camp': { layer: 'catComarques', names: ['Tarragonès'] },
            'tarragona-ebre': { layer: 'catComarques', names: ['Baix Ebre'] },
            'tarragona-priorat': { layer: 'catComarques', names: ['Priorat'] },
            'central-bages': { layer: 'catComarques', names: ['Bages'] },
            'central-osona': { layer: 'catComarques', names: ['Osona'] },
            'central-anoia': { layer: 'catComarques', names: ['Anoia'] },
            /* Comarcas sin datos demo — enlace a la capa de límites (12-07-2026). */
            'alt-penedes': { layer: 'catComarques', names: ['Alt Penedès'] },
            'bergueda': { layer: 'catComarques', names: ['Berguedà'] },
            'garraf': { layer: 'catComarques', names: ['Garraf'] },
            'llucanes': { layer: 'catComarques', names: ['Lluçanès'] },
            'moianes': { layer: 'catComarques', names: ['Moianès'] },
            'valles-occidental': { layer: 'catComarques', names: ['Vallès Occidental'] },
            'valles-oriental': { layer: 'catComarques', names: ['Vallès Oriental'] },
            'alt-emporda': { layer: 'catComarques', names: ['Alt Empordà'] },
            'baix-emporda': { layer: 'catComarques', names: ['Baix Empordà'] },
            'cerdanya': { layer: 'catComarques', names: ['Cerdanya'] },
            'garrotxa': { layer: 'catComarques', names: ['Garrotxa'] },
            'pla-estany': { layer: 'catComarques', names: ["Pla de l'Estany"] },
            'alta-ribagorca': { layer: 'catComarques', names: ['Alta Ribagorça'] },
            'aran': { layer: 'catComarques', names: ["Aran", "Val d'Aran"] },
            'garrigues': { layer: 'catComarques', names: ['Garrigues'] },
            'pallars-jussa': { layer: 'catComarques', names: ['Pallars Jussà'] },
            'pallars-sobira': { layer: 'catComarques', names: ['Pallars Sobirà'] },
            'pla-urgell': { layer: 'catComarques', names: ["Pla d'Urgell"] },
            'segarra': { layer: 'catComarques', names: ['Segarra'] },
            'solsones': { layer: 'catComarques', names: ['Solsonès'] },
            'urgell': { layer: 'catComarques', names: ['Urgell'] },
            'alt-camp': { layer: 'catComarques', names: ['Alt Camp'] },
            'baix-camp': { layer: 'catComarques', names: ['Baix Camp'] },
            'baix-penedes': { layer: 'catComarques', names: ['Baix Penedès'] },
            'conca-barbera': { layer: 'catComarques', names: ['Conca de Barberà'] },
            'montsia': { layer: 'catComarques', names: ['Montsià'] },
            'ribera-ebre': { layer: 'catComarques', names: ["Ribera d'Ebre"] }
        },
        ie: {
            'dublin-docklands': { layer: 'irelandCounties', names: ['Dublin'] },
            'dublin-city-centre': { layer: 'irelandCounties', names: ['Dublin'] },
            'dublin-south': { layer: 'irelandCounties', names: ['Dublin'] },
            'cork-harbour': { layer: 'irelandCounties', names: ['Cork'] },
            'cork-city': { layer: 'irelandCounties', names: ['Cork'] },
            'cork-west': { layer: 'irelandCounties', names: ['Cork'] },
            'galway-city': { layer: 'irelandCounties', names: ['Galway'] },
            'galway-coast': { layer: 'irelandCounties', names: ['Galway'] },
            'galway-inland': { layer: 'irelandCounties', names: ['Galway'] },
            'limerick-dock': { layer: 'irelandCounties', names: ['Limerick'] },
            'limerick-east': { layer: 'irelandCounties', names: ['Limerick'] },
            'limerick-west': { layer: 'irelandCounties', names: ['Limerick'] },
            'waterford-city': { layer: 'irelandCounties', names: ['Waterford'] },
            'waterford-coast': { layer: 'irelandCounties', names: ['Waterford'] },
            'waterford-inland': { layer: 'irelandCounties', names: ['Waterford'] }
        }
    };

    function getTerritoryBoundaryLink(locale, territoryId) {
        const key = localeKey(locale);
        return TERRITORY_BOUNDARY_MAP[key]?.[territoryId] || null;
    }

    function getDefaultBoundaryLayerForLocale(locale) {
        return localeKey(locale) === 'es' ? 'catComarques' : 'irelandCounties';
    }

    function resolveSindicatoTerritoryFromBoundary(locale, layer, name) {
        const token = String(name || '').trim();
        if (!token || !layer) return '';
        const key = localeKey(locale);
        const map = TERRITORY_BOUNDARY_MAP[key] || {};
        const match = Object.entries(map).find(([, link]) =>
            link.layer === layer && link.names.some((n) => n === token || token.includes(n) || n.includes(token))
        );
        if (match) return match[0];
        if (key === 'es' && (layer === 'catProvinces' || layer === 'spainProvinces')) {
            const provinceToTerritory = {
                Barcelona: 'barcelona-ciutat',
                Girona: 'girona-comarca',
                Lleida: 'lleida-segria',
                Tarragona: 'tarragona-camp'
            };
            const fallbackId = provinceToTerritory[token];
            if (fallbackId && map[fallbackId]) return fallbackId;
        }
        return '';
    }

    /* Linking mapa → Territorios (12-07-2026): resuelve una feature geojson de
       provincia o comarca a su página en la sección Territorios (id interno
       «vivienda»). Devuelve { parentId, territoryId } o null si la capa no
       tiene página de territorio (municipios, censo, etc.). */
    function normalizeTerritoryToken(value) {
        return String(value || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    }

    function resolveTerritoryPageFromBoundary(locale, layer, name) {
        const token = normalizeTerritoryToken(name);
        if (!token || !layer) return null;
        const key = localeKey(locale);
        const tree = getTerritoryTreeDef(locale);
        /* En ie los counties son el nivel superior; en es «county» es alias
           de comarca en Cartagrama (patrón Edumapa). */
        let mode = null;
        if (key === 'ie' && (layer === 'irelandCounties' || layer === 'county')) {
            mode = 'parent';
        } else if (layer === 'catProvinces' || layer === 'spainProvinces' || layer === 'province') {
            mode = 'parent';
        } else if (layer === 'catComarques' || layer === 'spainComarques' || layer === 'county') {
            mode = 'sub';
        }
        if (!mode) return null;
        const entries = Object.entries(tree);
        if (mode === 'parent') {
            const exact = entries.find(([, def]) => normalizeTerritoryToken(def.name) === token);
            if (exact) return { parentId: exact[0], territoryId: '' };
            const relaxed = entries.find(([, def]) => {
                const t = normalizeTerritoryToken(def.name);
                return token.includes(t) || t.includes(token);
            });
            return relaxed ? { parentId: relaxed[0], territoryId: '' } : null;
        }
        /* Comarcas: primero coincidencia exacta (evita que «Urgell» capture
           «Alt Urgell»), después relajada priorizando nombres largos. */
        for (const [parentId, def] of entries) {
            const sub = (def.subterritories || []).find((s) => normalizeTerritoryToken(s.name) === token);
            if (sub) return { parentId, territoryId: sub.id };
        }
        const candidates = [];
        for (const [parentId, def] of entries) {
            (def.subterritories || []).forEach((s) => {
                const t = normalizeTerritoryToken(s.name);
                if (token.includes(t) || t.includes(token)) candidates.push({ parentId, territoryId: s.id, len: t.length });
            });
        }
        candidates.sort((a, b) => b.len - a.len);
        return candidates[0] ? { parentId: candidates[0].parentId, territoryId: candidates[0].territoryId } : null;
    }

    const SECTOR_FORUM_POSTS = {
        es: {
            hosteleria: [{ title: 'Convenio sectorial hostelería — hilo general', replies: 38 }],
            logistica: [{ title: 'Coordinación logística — ratios y turnos', replies: 29 }],
            'hosteleria-restauracion': [{ title: 'Turnos partidos en restauración — hilo abierto', replies: 24 }],
            'hosteleria-restauracion-cocina': [{ title: 'Temperatura y ritmo en cocina', replies: 17 }],
            'logistica-almacen': [{ title: 'Ratios de carretillero en almacén', replies: 19 }],
            'logistica-almacen-carretilleros': [{ title: 'Certificaciones carretillero — renovación', replies: 11 }],
            'sanidad-privada-consultas': [{ title: 'Cambios de turno en consultas ambulatorias', replies: 16 }],
            'sanidad-privada-hospitalizacion-plantas': [{ title: 'Ratios enfermería por planta', replies: 14 }],
            'tecnologia-desarrollo': [{ title: 'Teletrabajo y desconexión en desarrollo', replies: 31 }],
            'tecnologia-desarrollo-backend': [{ title: 'Guardias nocturnas en backend', replies: 9 }],
            'comercio-alimentacion': [{ title: 'Horarios dominicales en alimentación', replies: 14 }],
            'comercio-alimentacion-caja': [{ title: 'Colas en caja y descansos', replies: 10 }]
        },
        ie: {
            hospitality: [{ title: 'Hospitality sector agreement — general thread', replies: 36 }],
            logistics: [{ title: 'Logistics coordination — ratios & shifts', replies: 27 }],
            'hospitality-pubs': [{ title: 'Split shifts in pubs — open thread', replies: 22 }],
            'hospitality-restaurants': [{ title: 'Kitchen pace & heat — restaurant floor', replies: 16 }],
            'logistics-warehousing': [{ title: 'Forklift ratios in warehousing', replies: 17 }],
            'logistics-warehousing-forklift': [{ title: 'Forklift licence renewals', replies: 10 }],
            'healthcare-inpatient': [{ title: 'Roster changes in inpatient care', replies: 20 }],
            'healthcare-inpatient-wards': [{ title: 'Ward nurse ratios', replies: 13 }],
            'technology-software': [{ title: 'Remote work policy in software teams', replies: 28 }],
            'technology-software-backend': [{ title: 'On-call rotations in backend', replies: 8 }],
            'retail-grocery': [{ title: 'Sunday trading in grocery retail', replies: 13 }],
            'retail-grocery-checkout': [{ title: 'Checkout queues & breaks', replies: 9 }]
        }
    };

    const VIVIENDA_ALERTS = {
        es: {
            'barcelona-ciutat': [
                { date: '2026-06-12', address: 'Carrer de Balmes 120, 4º', status: 'scheduled', note: 'Desahucio programado — PAH convoca concentración 9:00' },
                { date: '2026-06-18', address: 'Pg. de Gràcia 88', status: 'risk', note: 'Aviso de lanzamiento — revisar moratoria' }
            ],
            'barcelona-litoral': [
                { date: '2026-06-08', address: 'Av. Diagonal 640', status: 'scheduled', note: 'Desahucio por impago — abogada de oficio asignada' }
            ],
            'girona-comarca': [
                { date: '2026-06-15', address: 'Plaça del Vi 3', status: 'risk', note: 'Propietario fondo buitre — negociación abierta' }
            ]
        },
        ie: {
            'dublin-docklands': [
                { date: '2026-06-10', address: '12 Mayor Street Lower', status: 'scheduled', note: 'Eviction notice — tenant union mobilising' }
            ],
            'cork-city': [
                { date: '2026-06-20', address: '45 Patrick Street', status: 'risk', note: 'Rent increase dispute — court date pending' }
            ],
            'galway-city': [
                { date: '2026-06-14', address: '8 Eyre Square', status: 'scheduled', note: 'Sheriff sale scheduled — legal aid contacted' }
            ]
        }
    };

    const VIVIENDA_FORUM_POSTS = {
        es: {
            'barcelona-ciutat': [
                { title: 'Huelga de alquileres — bloque Balmes', replies: 28 },
                { title: 'Modelo de acta para asambleas de vecinos', replies: 15 }
            ],
            'barcelona-litoral': [{ title: 'Coordinación PAH Litoral — calendario', replies: 12 }],
            'girona-comarca': [{ title: 'Vivienda turística — denuncias agrupadas', replies: 19 }]
        },
        ie: {
            'dublin-docklands': [{ title: 'Rent cap campaign — Docklands thread', replies: 22 }],
            'cork-city': [{ title: 'Tenant union Cork — weekly roundup', replies: 11 }],
            'galway-city': [{ title: 'Student housing crisis — Galway', replies: 9 }]
        }
    };

    const TERRITORY_FORUM_POSTS = {
        es: {
            'barcelona-ciutat': [{ title: 'Movilizaciones en Barcelona ciutat', replies: 42 }],
            'girona-comarca': [{ title: 'Coordinación territorial Girona', replies: 18 }],
            'lleida-segria': [{ title: 'Foro Ponent — Lleida ciutat', replies: 15 }],
            'tarragona-camp': [{ title: 'Camp de Tarragona — alertas convenio', replies: 12 }],
            'central-bages': [{ title: 'Catalunya Central — asambleas', replies: 9 }]
        },
        ie: {
            'dublin-docklands': [{ title: 'Docklands coordination thread', replies: 35 }],
            'cork-city': [{ title: 'Cork city mobilisation', replies: 16 }],
            'galway-city': [{ title: 'Galway city — sector alerts', replies: 11 }],
            'limerick-dock': [{ title: 'Limerick docklands forum', replies: 10 }],
            'waterford-city': [{ title: 'Waterford city worker room', replies: 8 }]
        }
    };

    function getSectorForumPosts(locale) {
        return locale === 'es'
            ? [
                { title: 'Convenio 2024 — ¿quién negocia en hostelería?', replies: 34 },
                { title: 'Turnos partidos en logística — denuncias agrupadas', replies: 21 },
                { title: 'Sanidad privada: ratios de enfermería', replies: 18 },
                { title: 'Teletrabajo y desconexión digital en tecnología', replies: 27 },
                { title: 'Horarios en comercio — apertura dominical', replies: 15 }
            ]
            : [
                { title: '2024 agreement — who negotiates in hospitality?', replies: 34 },
                { title: 'Split shifts in logistics — grouped reports', replies: 21 },
                { title: 'Private healthcare: nurse ratios', replies: 18 },
                { title: 'Remote work & right to disconnect in tech', replies: 27 },
                { title: 'Retail opening hours — Sunday trading', replies: 15 }
            ];
    }

    function getSectors(locale) {
        const workplaces = getWorkplaces(locale);
        const map = new Map();
        workplaces.forEach((wp) => {
            const name = wp.sector || (locale === 'es' ? 'Sin clasificar' : 'Unclassified');
            const id = slugifySector(name);
            if (!map.has(id)) {
                map.set(id, { id, name, workplaces: [], unions: new Set(), forumPosts: [] });
            }
            const sector = map.get(id);
            sector.workplaces.push(wp);
            (wp.unions || []).forEach((u) => sector.unions.add(u));
        });
        const demoPosts = getSectorForumPosts(locale);
        const tree = SECTOR_TREE[localeKey(locale)] || {};
        const orderedIds = Object.keys(tree);
        const sectors = Array.from(map.values()).map((sector) => ({
            id: sector.id,
            name: tree[sector.id]?.name || sector.name,
            workplaces: sector.workplaces,
            unions: Array.from(sector.unions),
            forumPosts: []
        }));
        sectors.forEach((sector, i) => {
            const postIdx = orderedIds.indexOf(sector.id);
            const idx = postIdx >= 0 ? postIdx : i;
            if (demoPosts[idx]) sector.forumPosts = [demoPosts[idx]];
        });
        return sectors.sort((a, b) => a.name.localeCompare(b.name, locale === 'es' ? 'es' : 'en'));
    }

    function getWorkplacesForSubsector(locale, subsectorId) {
        return getWorkplaces(locale).filter((wp) => wp.subsectorId === subsectorId);
    }

    function getWorkplacesForTerritory(locale, territoryId) {
        return getWorkplaces(locale).filter((wp) => wp.territoryId === territoryId);
    }

    function getSectorTreeDef(locale) {
        return SECTOR_TREE[localeKey(locale)] || {};
    }

    function aggregateWorkplacesUnions(workplaces) {
        return {
            workplaces,
            unions: [...new Set(workplaces.flatMap((wp) => wp.unions || []))]
        };
    }

    function getSectorParentForumPosts(locale, parentId, name) {
        const key = localeKey(locale);
        const stored = SECTOR_FORUM_POSTS[key]?.[parentId];
        if (stored) return stored;
        const es = locale === 'es';
        return [{ title: es ? `Foro del sector — ${name}` : `Sector forum — ${name}`, replies: 12 }];
    }

    function getSubsubsectorForumPosts(locale, subsubId, name) {
        const key = localeKey(locale);
        const stored = SECTOR_FORUM_POSTS[key]?.[subsubId];
        if (stored) return stored;
        const es = locale === 'es';
        return [{ title: es ? `Foro — ${name}` : `Forum — ${name}`, replies: 6 }];
    }

    function resolveSectorNode(locale, nodeId) {
        if (!nodeId) return null;
        const tree = getSectorTreeDef(locale);
        if (tree[nodeId]) {
            const def = tree[nodeId];
            const workplaces = def.subsectors.flatMap((sub) => getWorkplacesForSubsector(locale, sub.id));
            const { unions } = aggregateWorkplacesUnions(workplaces);
            return {
                type: 'sector',
                id: nodeId,
                name: def.name,
                parentId: null,
                parentName: null,
                subsectorName: null,
                workplaces,
                unions,
                forumPosts: getSectorParentForumPosts(locale, nodeId, def.name)
            };
        }
        for (const [parentId, def] of Object.entries(tree)) {
            for (const sub of def.subsectors) {
                if (sub.id === nodeId) {
                    const workplaces = getWorkplacesForSubsector(locale, sub.id);
                    const { unions } = aggregateWorkplacesUnions(workplaces);
                    return {
                        type: 'subsector',
                        id: sub.id,
                        name: sub.name,
                        parentId,
                        parentName: def.name,
                        subsectorName: null,
                        workplaces,
                        unions,
                        forumPosts: getSubsectorForumPosts(locale, sub.id, sub.name)
                    };
                }
                for (const subsub of (sub.subsubsectors || [])) {
                    if (subsub.id === nodeId) {
                        const workplaces = getWorkplacesForSubsector(locale, sub.id);
                        const { unions } = aggregateWorkplacesUnions(workplaces);
                        return {
                            type: 'subsubsector',
                            id: subsub.id,
                            name: subsub.name,
                            parentId: sub.id,
                            parentName: def.name,
                            subsectorName: sub.name,
                            workplaces,
                            unions,
                            forumPosts: getSubsubsectorForumPosts(locale, subsub.id, subsub.name)
                        };
                    }
                }
            }
        }
        return null;
    }

    function getSubsectorForumPosts(locale, subsectorId, subName) {
        const key = localeKey(locale);
        const stored = SECTOR_FORUM_POSTS[key]?.[subsectorId];
        if (stored) return stored;
        const es = locale === 'es';
        return [{ title: es ? `Foro general — ${subName}` : `General forum — ${subName}`, replies: 8 }];
    }

    function getTerritoryForumPosts(locale, territoryId, terrName) {
        const key = localeKey(locale);
        const stored = TERRITORY_FORUM_POSTS[key]?.[territoryId];
        if (stored) return stored;
        const es = locale === 'es';
        return [{ title: es ? `Foro general — ${terrName}` : `General forum — ${terrName}`, replies: 6 }];
    }

    function getSubsectors(locale) {
        const key = localeKey(locale);
        const tree = SECTOR_TREE[key] || {};
        const subsectors = [];
        Object.entries(tree).forEach(([parentId, def]) => {
            def.subsectors.forEach((sub) => {
                const workplaces = getWorkplacesForSubsector(locale, sub.id);
                const unions = [...new Set(workplaces.flatMap((wp) => wp.unions || []))];
                subsectors.push({
                    id: sub.id,
                    name: sub.name,
                    parentId,
                    parentName: def.name,
                    workplaces,
                    unions,
                    forumPosts: getSubsectorForumPosts(locale, sub.id, sub.name)
                });
            });
        });
        return subsectors;
    }

    function getSubsectorById(locale, subsectorId) {
        const node = resolveSectorNode(locale, subsectorId);
        return node?.type === 'subsector' ? node : null;
    }

    function getSubsubsectorById(locale, subsubsectorId) {
        const node = resolveSectorNode(locale, subsubsectorId);
        return node?.type === 'subsubsector' ? node : null;
    }

    function getSectorById(locale, sectorId) {
        const node = resolveSectorNode(locale, sectorId);
        return node?.type === 'sector' ? node : null;
    }

    function buildSectorTreeHtml(locale, options = {}) {
        const c = t(locale);
        const { activeId, attr = 'data-sindicato-sector', showDemoNote = true } = options;
        const tree = getSectorTreeDef(locale);

        function nodeBtn(id, label, ariaLabel, active, hasChildren) {
            const activeCls = active ? ' active' : '';
            const toggle = hasChildren
                ? `<button type="button" class="sindicato-sector-toggle" aria-expanded="true" aria-label="${ariaLabel || label}">
                    <span class="sindicato-sector-toggle-icon" aria-hidden="true">▼</span>
                   </button>`
                : '';
            const soloCls = hasChildren ? '' : ' sindicato-sector-node-btn--solo';
            return `<div class="sindicato-sector-node-row">
                ${toggle}
                <button type="button" class="sindicato-sector-node-btn${activeCls}${soloCls}" ${attr}="${id}" aria-label="${ariaLabel || label}">
                    <span>${label}</span>
                </button>
            </div>`;
        }

        function renderSubsub(subsub, sub, def) {
            const aria = `${def.name} — ${sub.name} — ${subsub.name}`;
            return `<li class="sindicato-sector-node sindicato-sector-node--leaf sindicato-sector-node--depth-2" role="treeitem">
                ${nodeBtn(subsub.id, subsub.name, aria, activeId === subsub.id, false)}
            </li>`;
        }

        function renderSub(sub, def) {
            const subsubs = sub.subsubsectors || [];
            const hasChildren = subsubs.length > 0;
            const aria = `${def.name} — ${sub.name}`;
            let html = `<li class="sindicato-sector-node${hasChildren ? ' sindicato-sector-node--has-children' : ' sindicato-sector-node--leaf'} sindicato-sector-node--depth-1" role="treeitem">
                ${nodeBtn(sub.id, sub.name, aria, activeId === sub.id, hasChildren)}`;
            if (hasChildren) {
                html += `<ul class="sindicato-sector-children is-open" role="group">${subsubs.map((ss) => renderSubsub(ss, sub, def)).join('')}</ul>`;
            }
            html += '</li>';
            return html;
        }

        function renderParent([parentId, def]) {
            const hasChildren = def.subsectors.length > 0;
            let html = `<li class="sindicato-sector-node sindicato-sector-node--has-children sindicato-sector-node--depth-0" role="treeitem">
                ${nodeBtn(parentId, def.name, def.name, activeId === parentId, hasChildren)}`;
            if (hasChildren) {
                html += `<ul class="sindicato-sector-children is-open" role="group">${def.subsectors.map((sub) => renderSub(sub, def)).join('')}</ul>`;
            }
            html += '</li>';
            return html;
        }

        const body = `<ul class="sindicato-sector-branch sindicato-sector-branch--depth-0" role="tree">${Object.entries(tree).map(renderParent).join('')}</ul>`;
        const note = showDemoNote ? `<p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>` : '';
        return body + note;
    }

    function getTerritoryTreeDef(locale) {
        return TERRITORY_TREE[localeKey(locale)] || {};
    }

    function getTerritoryParents(locale) {
        const tree = getTerritoryTreeDef(locale);
        return Object.entries(tree).map(([id, def]) => ({ id, name: def.name }));
    }

    function getSubterritoriesForParent(locale, parentId) {
        const def = getTerritoryTreeDef(locale)[parentId];
        return def ? def.subterritories : [];
    }

    function getViviendaAlerts(locale, territoryId) {
        const key = localeKey(locale);
        return VIVIENDA_ALERTS[key]?.[territoryId] || [];
    }

    /* Módulo Vivienda (13-07-2026) — panel de alarmas agregado: todas las alertas de
       desahucio de todos los territorios de este locale, en un solo tablón nacional. */
    function getAllViviendaAlerts(locale) {
        const key = localeKey(locale);
        const byTerritory = VIVIENDA_ALERTS[key] || {};
        const rows = [];
        Object.keys(byTerritory).forEach((territoryId) => {
            const terr = getSubterritoryById(locale, territoryId);
            (byTerritory[territoryId] || []).forEach((alert) => {
                rows.push({
                    ...alert,
                    territoryId,
                    territoryName: terr ? `${terr.parentName} / ${terr.name}` : territoryId
                });
            });
        });
        rows.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
        return rows;
    }

    function getViviendaForumPosts(locale, territoryId, terrName) {
        const key = localeKey(locale);
        const stored = VIVIENDA_FORUM_POSTS[key]?.[territoryId];
        if (stored) return stored;
        const es = locale === 'es';
        return [{ title: es ? `Foro de vivienda — ${terrName}` : `Housing forum — ${terrName}`, replies: 5 }];
    }

    function buildTerritoryScopeTreeHtml(locale, activeId, attr, options) {
        const c = t(locale);
        const opts = options || {};
        const collapsed = opts.collapsed !== false;
        const showViviendaLinks = Boolean(opts.showViviendaLinks);
        const showDemoNote = opts.showDemoNote !== false;
        const tree = getTerritoryTreeDef(locale);
        const territoryAttr = attr || 'data-sindicato-feed-territory';
        const openCls = collapsed ? '' : ' is-open';
        const expanded = collapsed ? 'false' : 'true';
        const toggleIcon = collapsed ? '▶' : '▼';
        const viviendaLabel = locale === 'es' ? 'Abrir vivienda' : 'Open housing';

        function renderLeaf(sub, def) {
            const active = activeId === sub.id;
            const viviendaBtn = showViviendaLinks
                ? `<button type="button" class="sindicato-territory-vivienda-btn" data-sindicato-goto-vivienda="${sub.id}" title="${viviendaLabel}" aria-label="${viviendaLabel}: ${sub.name}">🏠</button>`
                : '';
            return `<li class="sindicato-sector-node sindicato-sector-node--leaf sindicato-sector-node--depth-1" role="treeitem">
                <div class="sindicato-sector-node-row sindicato-territory-node-row">
                    <button type="button" class="sindicato-sector-node-btn sindicato-sector-node-btn--solo${active ? ' active' : ''}" ${territoryAttr}="${sub.id}" aria-label="${def.name} — ${sub.name}">
                        <span>${sub.name}</span>
                    </button>${viviendaBtn}
                </div>
            </li>`;
        }

        function renderParent([parentId, def]) {
            const hasChildren = def.subterritories.length > 0;
            return `<li class="sindicato-sector-node sindicato-sector-node--has-children sindicato-sector-node--depth-0" role="treeitem">
                <div class="sindicato-sector-node-row">
                    ${hasChildren ? `<button type="button" class="sindicato-sector-toggle" aria-expanded="${expanded}" aria-label="${def.name}">
                        <span class="sindicato-sector-toggle-icon" aria-hidden="true">${toggleIcon}</span>
                    </button>` : ''}
                    <span class="sindicato-sector-node-btn sindicato-sector-node-btn--label">${def.name}</span>
                </div>
                ${hasChildren ? `<ul class="sindicato-sector-children${openCls}" role="group">${def.subterritories.map((sub) => renderLeaf(sub, def)).join('')}</ul>` : ''}
            </li>`;
        }

        const body = `<ul class="sindicato-sector-branch sindicato-sector-branch--depth-0" role="tree">${Object.entries(tree).map(renderParent).join('')}</ul>`;
        const note = showDemoNote ? `<p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>` : '';
        return body + note;
    }

    function buildFeedScopeTreeHtml(locale, scope, activeId) {
        if (scope !== 'territorios') {
            return buildSectorTreeHtml(locale, { activeId, attr: 'data-sindicato-feed-sector', showDemoNote: true });
        }
        return buildTerritoryScopeTreeHtml(locale, activeId, 'data-sindicato-feed-territory', { collapsed: true });
    }

    function buildSectoresSidebarTreeHtml(locale, activeId) {
        return buildSectorTreeHtml(locale, { activeId, attr: 'data-sindicato-sector', showDemoNote: true });
    }

    function buildTerritoryDossierHtml(locale, terr, options) {
        const c = t(locale);
        const opts = options || {};
        const workplaceItems = terr.workplaces.map((wp) =>
            `<li><button type="button" class="sindicato-union-company-link" data-sindicato-goto-workplace="${wp.id}">${wp.name}</button> — ${wp.workers} ${c.workers.toLowerCase()}</li>`
        ).join('');
        const unionItems = terr.unions.map((u) => `<li>${buildUnionGotoBtn(locale, u)}</li>`).join('') || `<li class="template-muted">—</li>`;
        const forumPosts = terr.forumPosts.map((post) =>
            `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${locale === 'es' ? 'respuestas' : 'replies'}</p></div>`
        ).join('');
        const housingAlerts = getViviendaAlerts(locale, terr.id);
        const es = locale === 'es';
        const alertsHtml = housingAlerts.length
            ? housingAlerts.slice(0, 2).map((alert) =>
                `<div class="sindicato-coord-card sindicato-alert-card"><strong>${alert.date}</strong><p>${alert.address}</p></div>`
            ).join('')
            : '';
        const mapBack = opts.showMapBack && opts.mapTerritoryId
            ? `<p><button type="button" class="sindicato-back-btn" data-sindicato-map-clear-territory>← ${c.mapClearTerritory}</button></p>`
            : '';
        return `<div class="sindicato-panel sindicato-territory-dossier">
            ${mapBack}
            <h2>${c.mapTerritoryDossier} — ${terr.parentName} / ${terr.name}</h2>
            <p class="template-muted">${c.territoryDossierIntro}</p>
            <h3>${c.sectoresUnions}</h3>
            <ul class="sindicato-sector-detail-list">${unionItems}</ul>
            <h3>${c.territoryWorkplaces}</h3>
            <ul class="sindicato-sector-detail-list">${workplaceItems || '<li class="template-muted">—</li>'}</ul>
            ${alertsHtml ? `<h3>${c.viviendaAlertsTitle}</h3>${alertsHtml}` : ''}
            <p><button type="button" class="sindicato-cta-btn" data-sindicato-goto-vivienda="${terr.id}">${c.territoryHousingLink}</button></p>
            <h3>${c.sectoresForum}</h3>
            ${forumPosts}
            ${buildSocialLinksBlockHtml(locale, terr.id)}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* Convenio de referencia para un nodo del árbol sectorial: se busca siempre por el
       nombre del sector de primer nivel (sector padre), que es la clave del directorio. */
    function getSectorTopLevelName(node) {
        return node.type === 'sector' ? node.name : node.parentName;
    }

    function buildSectorConvenioHtml(locale, sectorName) {
        const c = t(locale);
        const entry = sectorName ? getConvenioDirectory(locale)[sectorName] : null;
        if (!entry) {
            return `<p class="template-muted">${c.finderNoResult}</p>`;
        }
        return `<p class="sindicato-sector-convenio-name"><strong>${entry.name}</strong></p>
            <p class="template-muted">${c.finderScope}: ${entry.scope} · ${c.finderVigencia}: ${entry.vigencia}</p>
            <p><a href="${entry.source}" target="_blank" rel="noopener">${c.finderSource}</a></p>
            <p class="sindicato-note sindicato-note-demo"><em>${c.finderDisclaimer}</em></p>`;
    }

    function buildSectorDossierHtml(locale, node) {
        const c = t(locale);
        const workplaceItems = node.workplaces.map((wp) =>
            `<li><button type="button" class="sindicato-union-company-link" data-sindicato-goto-workplace="${wp.id}">${wp.name}</button> — ${wp.workers} ${c.workers.toLowerCase()}</li>`
        ).join('');
        const unionItems = node.unions.map((u) => `<li>${buildUnionGotoBtn(locale, u)}</li>`).join('');
        const forumPosts = node.forumPosts.map((post) =>
            `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${locale === 'es' ? 'respuestas' : 'replies'}</p></div>`
        ).join('');
        const meta = node.type === 'sector'
            ? c.sectoresSectorIntro
            : node.type === 'subsubsector'
                ? `${node.parentName} — ${node.subsectorName} — ${c.sectoresIntro}`
                : `${node.parentName} — ${c.sectoresIntro}`;
        const convenioHtml = buildSectorConvenioHtml(locale, getSectorTopLevelName(node));
        return `<div class="sindicato-panel sindicato-sector-dossier">
            <div class="sindicato-sector-dossier-head">
                <h2>${node.name}</h2>
                <p class="template-muted">${meta}</p>
            </div>
            <div class="sindicato-sector-sections">
                <section class="sindicato-sector-section sindicato-sector-section--forum">
                    <header class="sindicato-sector-section-head">
                        <span class="sindicato-sector-section-icon" aria-hidden="true">💬</span>
                        <h3>${c.sectoresForum}</h3>
                    </header>
                    <p class="template-muted">${c.sectoresForumPosts}</p>
                    ${forumPosts}
                    <button type="button" class="sindicato-cta-btn sindicato-cta-btn-active" data-sindicato-goto-sector-forum="${node.id}">${c.sectoresGotoForumBtn}</button>
                </section>
                <section class="sindicato-sector-section sindicato-sector-section--empresas">
                    <header class="sindicato-sector-section-head">
                        <span class="sindicato-sector-section-icon" aria-hidden="true">🏢</span>
                        <h3>${c.sectoresWorkplaces}</h3>
                    </header>
                    <ul class="sindicato-sector-detail-list">${workplaceItems || `<li class="template-muted">${c.sectoresEmptyWorkplaces}</li>`}</ul>
                </section>
                <section class="sindicato-sector-section sindicato-sector-section--sindicatos">
                    <header class="sindicato-sector-section-head">
                        <span class="sindicato-sector-section-icon" aria-hidden="true">🤝</span>
                        <h3>${c.sectoresUnions}</h3>
                    </header>
                    <ul class="sindicato-sector-detail-list">${unionItems || `<li class="template-muted">${c.sectoresEmptyUnions}</li>`}</ul>
                </section>
                <section class="sindicato-sector-section sindicato-sector-section--convenio">
                    <header class="sindicato-sector-section-head">
                        <span class="sindicato-sector-section-icon" aria-hidden="true">📄</span>
                        <h3>${c.sectoresConvenioTitle}</h3>
                    </header>
                    <p class="template-muted">${c.sectoresConvenioIntro}</p>
                    ${convenioHtml}
                </section>
                <section class="sindicato-sector-section sindicato-sector-section--redes">
                    <header class="sindicato-sector-section-head">
                        <span class="sindicato-sector-section-icon" aria-hidden="true">📣</span>
                        <h3>${c.socialLinksTitle}</h3>
                    </header>
                    <p class="template-muted">${c.socialLinksIntro}</p>
                    ${buildSocialLinksHtml(locale, node.id)}
                </section>
                ${buildEmbeddedWikiSectionHtml(locale, 'sector', { id: node.id, name: node.name })}
            </div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildSectoresHtml(locale, sectorId) {
        const c = t(locale);
        const node = sectorId ? resolveSectorNode(locale, sectorId) : null;
        if (!node) {
            return `<div class="sindicato-panel">
                <h2>${c.sectoresTitle}</h2>
                <p class="template-muted">${c.sectoresIntro}</p>
                <p>${c.sectoresPick}</p>
            </div>`;
        }
        return buildSectorDossierHtml(locale, node);
    }

    function getSubterritories(locale) {
        const key = localeKey(locale);
        const tree = TERRITORY_TREE[key] || {};
        const subterritories = [];
        Object.entries(tree).forEach(([parentId, def]) => {
            def.subterritories.forEach((sub) => {
                const workplaces = getWorkplacesForTerritory(locale, sub.id);
                const unions = [...new Set(workplaces.flatMap((wp) => wp.unions || []))];
                subterritories.push({
                    id: sub.id,
                    name: sub.name,
                    parentId,
                    parentName: def.name,
                    workplaces,
                    unions,
                    forumPosts: getTerritoryForumPosts(locale, sub.id, sub.name)
                });
            });
        });
        return subterritories;
    }

    function getSubterritoryById(locale, territoryId) {
        return getSubterritories(locale).find((t) => t.id === territoryId) || null;
    }

    /* ================================================================
     * CRM (reforma 12-07-2026) — gestión multi-organización.
     * La sección Coordinación pasa a ser un CRM para cualquier sindicato
     * (SindicApp incluido): afiliadas, casos, campañas, finanzas,
     * comunicaciones, calendario y documentos. Estado en memoria de sesión.
     * ================================================================ */

    const CRM_STAGES = ['nuevo', 'curso', 'negociacion', 'resuelto'];

    function crmStageLabel(locale, stage) {
        const es = locale === 'es';
        return {
            nuevo: es ? 'Nuevo' : 'New',
            curso: es ? 'En curso' : 'In progress',
            negociacion: es ? 'Negociación' : 'Bargaining',
            resuelto: es ? 'Resuelto' : 'Resolved'
        }[stage] || stage;
    }

    /* Hash simple del id de organización — desplaza y escala los datasets
       demo para que cada sindicato tenga cifras y repartos distintos. */
    function crmOrgHash(orgId) {
        let h = 0;
        for (let i = 0; i < String(orgId).length; i += 1) h = (h * 31 + String(orgId).charCodeAt(i)) % 997;
        return h;
    }

    function getCrmOrgs(locale) {
        const es = locale === 'es';
        return [{ id: 'sindicapp', name: 'SindicApp', sector: es ? 'Plataforma' : 'Platform' }]
            .concat(getUnions(locale).map((u) => ({ id: u.id, name: u.name, sector: u.sector })));
    }

    function findCrmOrg(locale, orgId) {
        return getCrmOrgs(locale).find((o) => o.id === orgId) || null;
    }

    const CRM_PEOPLE = {
        es: ['Marina Soler', 'Pere Vidal', 'Laia Ferrer', 'Jordi Mas', 'Núria Bosch', 'Amina El Idrissi', 'Óscar Peña', 'Carme Rovira', 'Iván Ortega', 'Rosa Camps'],
        ie: ['Niamh O\'Connell', 'James Murphy', 'Sarah Lynch', 'Aoife Byrne', 'Conor Walsh', 'Priya Sharma', 'Liam Doyle', 'Emma Kavanagh', 'Sean Brennan', 'Grace Nolan']
    };

    /* Estado CRM en memoria de sesión, por locale+organización.
       Se genera perezosamente a partir de los datasets demo. */
    const CRM_RUNTIME = { es: {}, ie: {} };

    function crmSeedData(locale, orgId) {
        const es = locale === 'es';
        const h = crmOrgHash(orgId);
        const people = CRM_PEOPLE[localeKey(locale)];
        const wps = getWorkplaces(locale);
        const wpName = (i) => wps[(h + i) % wps.length]?.name || '—';
        const person = (i) => people[(h + i) % people.length];
        const estados = ['activa', 'activa', 'pendiente', 'activa', 'activa', 'baja', 'activa', 'pendiente', 'activa', 'activa'];
        const roles = es
            ? ['delegada', 'afiliada', 'afiliada', 'liberada', 'afiliada', 'afiliada', 'delegada', 'afiliada', 'afiliada', 'delegada']
            : ['delegate', 'member', 'member', 'official', 'member', 'member', 'delegate', 'member', 'member', 'delegate'];
        const members = people.map((_, i) => ({
            id: `m${i}`,
            name: person(i),
            workplace: wpName(i),
            estado: estados[(h + i) % estados.length],
            rol: roles[(h + i) % roles.length],
            cuota: 8 + ((h + i * 3) % 9),
            alta: `202${3 + ((h + i) % 3)}-${String(1 + ((h + i * 5) % 12)).padStart(2, '0')}`
        }));
        const caseTitles = es
            ? ['Impago de horas extra', 'Despido de delegada', 'Modificación de turnos', 'Plus de nocturnidad', 'Ratios de plantilla', 'Sanción impugnada']
            : ['Unpaid overtime', 'Delegate dismissal', 'Roster change dispute', 'Night premium claim', 'Staffing ratios', 'Contested sanction'];
        const cases = caseTitles.map((title, i) => ({
            id: `c${i}`,
            title,
            workplace: wpName(i + 2),
            owner: person(i + 1),
            stage: CRM_STAGES[(h + i) % 3],
            updated: es ? `hace ${1 + ((h + i) % 9)}d` : `${1 + ((h + i) % 9)}d ago`
        }));
        const campaignDefs = es
            ? [['Afiliación sector logística', 120], ['Firma convenio hostelería', 300], ['Caja de resistencia', 500]]
            : [['Logistics membership drive', 120], ['Hospitality agreement signatures', 300], ['Strike fund drive', 500]];
        const campaigns = campaignDefs.map(([title, target], i) => ({
            id: `p${i}`,
            title,
            target,
            support: Math.min(target - 5, 20 + ((h * (i + 3)) % target))
        }));
        const movConceptos = es
            ? ['Cuotas del mes', 'Aportación fondo de huelga', 'Asesoría jurídica', 'Material campaña', 'Formación delegadas', 'Cuotas atrasadas']
            : ['Monthly dues', 'Strike fund contribution', 'Legal counsel', 'Campaign materials', 'Delegate training', 'Back dues'];
        const finances = {
            cuotasMes: 900 + (h % 400) * 10,
            fondoHuelga: 20000 + (h % 700) * 40,
            gastosMes: 400 + (h % 300) * 5,
            movimientos: movConceptos.map((concepto, i) => ({
                concepto,
                fecha: `2026-0${1 + (i % 7)}`,
                importe: (i % 3 === 2 ? -1 : 1) * (120 + ((h + i * 7) % 60) * 10)
            }))
        };
        const commDefs = es
            ? [['Boletín mensual de afiliadas', 'enviada'], ['Convocatoria asamblea general', 'programada'], ['Aviso mesa de negociación', 'borrador'], ['Resumen campaña afiliación', 'borrador']]
            : [['Monthly members bulletin', 'enviada'], ['General assembly notice', 'programada'], ['Bargaining table notice', 'borrador'], ['Membership campaign recap', 'borrador']];
        const comms = commDefs.map(([title, estado], i) => ({
            id: `q${i}`,
            title,
            estado,
            audiencia: i % 2 === 0 ? (es ? 'Todas las afiliadas' : 'All members') : (es ? 'Delegadas' : 'Delegates')
        }));
        const eventDefs = es
            ? [['asamblea', 'Asamblea general ordinaria'], ['negociacion', 'Mesa de convenio sectorial'], ['formacion', 'Formación: derechos de delegadas'], ['asamblea', 'Asamblea extraordinaria territorial']]
            : [['asamblea', 'Ordinary general assembly'], ['negociacion', 'Sector agreement table'], ['formacion', 'Training: delegate rights'], ['asamblea', 'Territorial special assembly']];
        const events = eventDefs.map(([type, title], i) => ({
            type,
            title,
            date: `2026-0${7 + (i % 3)}-${String(3 + ((h + i * 6) % 25)).padStart(2, '0')}`
        }));
        const docDefs = es
            ? [['estatutos', 'Estatutos de la organización'], ['actas', 'Acta asamblea junio 2026'], ['convenios', 'Convenio sectorial vigente'], ['plantillas', 'Plantilla de denuncia a Inspección'], ['actas', 'Acta comité ejecutivo'], ['plantillas', 'Modelo de preaviso de huelga']]
            : [['estatutos', 'Organisation rulebook'], ['actas', 'June 2026 assembly minutes'], ['convenios', 'Current sector agreement'], ['plantillas', 'Labour inspectorate complaint template'], ['actas', 'Executive committee minutes'], ['plantillas', 'Strike notice template']];
        const docs = docDefs.map(([cat, title], i) => ({
            id: `d${i}`,
            cat,
            title,
            updated: `2026-0${1 + ((h + i) % 7)}`
        }));
        return { members, cases, campaigns, finances, comms, events, docs };
    }

    function getCrmData(locale, orgId) {
        const key = localeKey(locale);
        const org = findCrmOrg(locale, orgId) ? orgId : 'sindicapp';
        if (!CRM_RUNTIME[key][org]) CRM_RUNTIME[key][org] = crmSeedData(locale, org);
        return CRM_RUNTIME[key][org];
    }

    function crmMoveCase(locale, orgId, caseId, dir) {
        const data = getCrmData(locale, orgId);
        const item = data.cases.find((cs) => cs.id === caseId);
        if (!item) return;
        const idx = CRM_STAGES.indexOf(item.stage);
        const next = idx + (dir === 'back' ? -1 : 1);
        if (next < 0 || next >= CRM_STAGES.length) return;
        item.stage = CRM_STAGES[next];
        item.updated = locale === 'es' ? 'ahora' : 'now';
    }

    function crmSupportCampaign(locale, orgId, campaignId) {
        const data = getCrmData(locale, orgId);
        const item = data.campaigns.find((cp) => cp.id === campaignId);
        if (item && item.support < item.target) item.support += 1;
    }

    function crmSendComm(locale, orgId, commId) {
        const data = getCrmData(locale, orgId);
        const item = data.comms.find((cm) => cm.id === commId);
        if (!item) return;
        item.estado = item.estado === 'borrador' ? 'programada' : 'enviada';
    }

    function crmAddEvent(locale, orgId, event) {
        if (!event || !event.date || !event.title) return;
        const data = getCrmData(locale, orgId);
        data.events.push({ type: event.type || 'asamblea', title: event.title, date: event.date });
        data.events.sort((a, b) => a.date.localeCompare(b.date));
    }

    function crmMemberEstadoLabel(locale, estado) {
        const es = locale === 'es';
        return {
            activa: es ? 'Activa' : 'Active',
            pendiente: es ? 'Pendiente' : 'Pending',
            baja: es ? 'Baja' : 'Lapsed'
        }[estado] || estado;
    }

    function crmEventTypeLabel(locale, type) {
        const es = locale === 'es';
        return {
            asamblea: es ? 'Asamblea' : 'Assembly',
            negociacion: es ? 'Negociación' : 'Bargaining',
            formacion: es ? 'Formación' : 'Training'
        }[type] || type;
    }

    function crmDocCatLabel(locale, cat) {
        const es = locale === 'es';
        return {
            estatutos: es ? 'Estatutos' : 'Rulebook',
            actas: es ? 'Actas' : 'Minutes',
            convenios: es ? 'Convenios' : 'Agreements',
            plantillas: es ? 'Plantillas' : 'Templates'
        }[cat] || cat;
    }

    function crmEuro(n) {
        return `${n < 0 ? '−' : ''}€ ${Math.abs(n).toLocaleString('de-DE')}`;
    }

    function buildCrmMemberRowsHtml(locale, orgId, query, filter) {
        const es = locale === 'es';
        const q = String(query || '').trim().toLowerCase();
        const data = getCrmData(locale, orgId);
        const rows = data.members
            .filter((m) => (filter && filter !== 'todas' ? m.estado === filter : true))
            .filter((m) => (q ? `${m.name} ${m.workplace} ${m.rol}`.toLowerCase().includes(q) : true));
        if (!rows.length) {
            return `<tr><td colspan="5" class="template-muted">${es ? 'Sin resultados con este filtro.' : 'No results for this filter.'}</td></tr>`;
        }
        return rows.map((m) => `<tr>
            <td><strong>${m.name}</strong></td>
            <td>${m.workplace}</td>
            <td>${m.rol}</td>
            <td><span class="crm-badge crm-badge-${m.estado}">${crmMemberEstadoLabel(locale, m.estado)}</span></td>
            <td>€ ${m.cuota}/${es ? 'mes' : 'mo'} · ${es ? 'alta' : 'since'} ${m.alta}</td>
        </tr>`).join('');
    }

    function buildCrmAfiliadasHtml(locale, orgId, view) {
        const c = t(locale);
        const es = locale === 'es';
        const data = getCrmData(locale, orgId);
        const activas = data.members.filter((m) => m.estado === 'activa').length;
        const filters = ['todas', 'activa', 'pendiente', 'baja'];
        const filterLabel = (f) => (f === 'todas' ? (es ? 'Todas' : 'All') : crmMemberEstadoLabel(locale, f));
        const active = view.crmMemberFilter || 'todas';
        return `
            <p class="template-muted">${c.crmAfiliadasIntro}</p>
            <div class="crm-stat-row">
                <div class="crm-stat"><strong>${data.members.length}</strong><span>${es ? 'en censo' : 'in census'}</span></div>
                <div class="crm-stat"><strong>${activas}</strong><span>${es ? 'activas' : 'active'}</span></div>
                <div class="crm-stat"><strong>${data.members.filter((m) => m.estado === 'pendiente').length}</strong><span>${es ? 'pendientes' : 'pending'}</span></div>
            </div>
            <input type="search" class="sindicato-search-input" value="${(view.crmMemberQuery || '').replace(/"/g, '&quot;')}"
                placeholder="${es ? 'Busca por nombre, empresa o rol…' : 'Search name, company or role…'}"
                aria-label="${es ? 'Buscar afiliadas' : 'Search members'}" data-sindicato-crm-member-search>
            <div class="crm-chip-row" role="group" aria-label="${es ? 'Filtrar por estado' : 'Filter by status'}">
                ${filters.map((f) => `<button type="button" class="crm-chip${f === active ? ' active' : ''}" data-sindicato-crm-member-filter="${f}">${filterLabel(f)}</button>`).join('')}
            </div>
            <table class="crm-table">
                <thead><tr>
                    <th>${es ? 'Nombre' : 'Name'}</th><th>${es ? 'Empresa' : 'Company'}</th><th>${es ? 'Rol' : 'Role'}</th><th>${es ? 'Estado' : 'Status'}</th><th>${es ? 'Cuota / alta' : 'Dues / since'}</th>
                </tr></thead>
                <tbody data-sindicato-crm-member-list>${buildCrmMemberRowsHtml(locale, orgId, view.crmMemberQuery, active)}</tbody>
            </table>`;
    }

    function buildCrmCasosHtml(locale, orgId) {
        const c = t(locale);
        const es = locale === 'es';
        const data = getCrmData(locale, orgId);
        const cols = CRM_STAGES.map((stage) => {
            const cards = data.cases.filter((cs) => cs.stage === stage).map((cs) => `
                <div class="crm-case-card">
                    <strong>${cs.title}</strong>
                    <p class="template-muted">${cs.workplace}</p>
                    <p class="crm-case-meta">${es ? 'Lleva' : 'Owner'}: ${cs.owner} · ${cs.updated}</p>
                    <div class="crm-case-actions">
                        <button type="button" class="crm-mini-btn" data-sindicato-crm-case-move="${cs.id}:back" ${stage === 'nuevo' ? 'disabled' : ''} aria-label="${es ? 'Etapa anterior' : 'Previous stage'}">◀</button>
                        <button type="button" class="crm-mini-btn" data-sindicato-crm-case-move="${cs.id}:fwd" ${stage === 'resuelto' ? 'disabled' : ''} aria-label="${es ? 'Etapa siguiente' : 'Next stage'}">▶</button>
                    </div>
                </div>`).join('');
            return `<div class="crm-pipeline-col">
                <h4>${crmStageLabel(locale, stage)} <span class="crm-count">${data.cases.filter((cs) => cs.stage === stage).length}</span></h4>
                ${cards || `<p class="template-muted crm-empty-col">${es ? 'Vacío' : 'Empty'}</p>`}
            </div>`;
        }).join('');
        return `
            <p class="template-muted">${c.crmCasosIntro}</p>
            <div class="crm-pipeline">${cols}</div>`;
    }

    function buildCrmCampanasHtml(locale, orgId) {
        const c = t(locale);
        const es = locale === 'es';
        const data = getCrmData(locale, orgId);
        return `
            <p class="template-muted">${c.crmCampanasIntro}</p>
            ${data.campaigns.map((cp) => {
                const pct = Math.min(100, Math.round((cp.support / cp.target) * 100));
                return `<div class="sindicato-coord-card crm-campaign-card">
                    <strong>${cp.title}</strong>
                    <div class="crm-progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
                        <div class="crm-progress-fill" style="width:${pct}%"></div>
                    </div>
                    <p class="template-muted">${cp.support} / ${cp.target} ${es ? 'apoyos' : 'supporters'} (${pct}%)</p>
                    <button type="button" class="crm-btn" data-sindicato-crm-campaign-support="${cp.id}" ${cp.support >= cp.target ? 'disabled' : ''}>${es ? '✊ Sumar apoyo' : '✊ Add support'}</button>
                </div>`;
            }).join('')}`;
    }

    function buildCrmFinanzasHtml(locale, orgId, view) {
        const c = t(locale);
        const es = locale === 'es';
        const data = getCrmData(locale, orgId);
        const f = data.finances;
        const tab = view.crmFinanzasView === 'movimientos' ? 'movimientos' : 'resumen';
        const tabs = [['resumen', es ? 'Resumen' : 'Summary'], ['movimientos', es ? 'Movimientos' : 'Ledger']];
        let body;
        if (tab === 'movimientos') {
            body = `<table class="crm-table">
                <thead><tr><th>${es ? 'Concepto' : 'Item'}</th><th>${es ? 'Mes' : 'Month'}</th><th class="crm-num">${es ? 'Importe' : 'Amount'}</th></tr></thead>
                <tbody>${f.movimientos.map((m) => `<tr>
                    <td>${m.concepto}</td><td>${m.fecha}</td>
                    <td class="crm-num ${m.importe < 0 ? 'crm-neg' : 'crm-pos'}">${crmEuro(m.importe)}</td>
                </tr>`).join('')}</tbody>
            </table>`;
        } else {
            body = `<div class="crm-stat-row">
                <div class="crm-stat"><strong>${crmEuro(f.cuotasMes)}</strong><span>${es ? 'cuotas / mes' : 'dues / month'}</span></div>
                <div class="crm-stat"><strong>${crmEuro(f.fondoHuelga)}</strong><span>${es ? 'fondo de huelga' : 'strike fund'}</span></div>
                <div class="crm-stat"><strong>${crmEuro(f.gastosMes)}</strong><span>${es ? 'gastos / mes' : 'spend / month'}</span></div>
            </div>`;
        }
        return `
            <p class="template-muted">${c.crmFinanzasIntro}</p>
            <div class="crm-chip-row" role="group" aria-label="${es ? 'Vista de finanzas' : 'Finance view'}">
                ${tabs.map(([id, label]) => `<button type="button" class="crm-chip${id === tab ? ' active' : ''}" data-sindicato-crm-finanzas-view="${id}">${label}</button>`).join('')}
            </div>
            ${body}`;
    }

    function buildCrmComunicacionesHtml(locale, orgId) {
        const c = t(locale);
        const es = locale === 'es';
        const data = getCrmData(locale, orgId);
        const estadoLabel = (s) => ({
            borrador: es ? 'Borrador' : 'Draft',
            programada: es ? 'Programada' : 'Scheduled',
            enviada: es ? 'Enviada' : 'Sent'
        }[s] || s);
        const nextAction = (s) => (s === 'borrador' ? (es ? 'Programar' : 'Schedule') : (es ? 'Enviar' : 'Send'));
        return `
            <p class="template-muted">${c.crmComunicacionesIntro}</p>
            ${data.comms.map((cm) => `<div class="sindicato-coord-card crm-comm-card">
                <div class="crm-comm-head">
                    <strong>${cm.title}</strong>
                    <span class="crm-badge crm-badge-${cm.estado}">${estadoLabel(cm.estado)}</span>
                </div>
                <p class="template-muted">${es ? 'Audiencia' : 'Audience'}: ${cm.audiencia}</p>
                ${cm.estado !== 'enviada' ? `<button type="button" class="crm-btn" data-sindicato-crm-comm-send="${cm.id}">✉️ ${nextAction(cm.estado)}</button>` : ''}
            </div>`).join('')}`;
    }

    function buildCrmCalendarioHtml(locale, orgId) {
        const c = t(locale);
        const es = locale === 'es';
        const data = getCrmData(locale, orgId);
        const types = ['asamblea', 'negociacion', 'formacion'];
        return `
            <p class="template-muted">${c.crmCalendarioIntro}</p>
            <ul class="crm-event-list">
                ${data.events.map((ev) => `<li>
                    <span class="crm-event-date">${ev.date}</span>
                    <span class="crm-badge crm-badge-${ev.type}">${crmEventTypeLabel(locale, ev.type)}</span>
                    <span>${ev.title}</span>
                </li>`).join('')}
            </ul>
            <form class="crm-event-form" data-sindicato-crm-event-form>
                <h4>${es ? 'Añadir evento' : 'Add event'}</h4>
                <select name="type" aria-label="${es ? 'Tipo de evento' : 'Event type'}">
                    ${types.map((ty) => `<option value="${ty}">${crmEventTypeLabel(locale, ty)}</option>`).join('')}
                </select>
                <input type="date" name="date" required aria-label="${es ? 'Fecha' : 'Date'}">
                <input type="text" name="title" required maxlength="80" placeholder="${es ? 'Título del evento' : 'Event title'}" aria-label="${es ? 'Título' : 'Title'}">
                <button type="submit" class="crm-btn">${es ? 'Añadir' : 'Add'}</button>
            </form>`;
    }

    function buildCrmDocumentosHtml(locale, orgId, view) {
        const c = t(locale);
        const es = locale === 'es';
        const data = getCrmData(locale, orgId);
        const cats = ['todas', 'estatutos', 'actas', 'convenios', 'plantillas'];
        const active = view.crmDocFilter || 'todas';
        const docs = data.docs.filter((d) => (active !== 'todas' ? d.cat === active : true));
        return `
            <p class="template-muted">${c.crmDocumentosIntro}</p>
            <div class="crm-chip-row" role="group" aria-label="${es ? 'Filtrar documentos' : 'Filter documents'}">
                ${cats.map((cat) => `<button type="button" class="crm-chip${cat === active ? ' active' : ''}" data-sindicato-crm-doc-filter="${cat}">${cat === 'todas' ? (es ? 'Todas' : 'All') : crmDocCatLabel(locale, cat)}</button>`).join('')}
            </div>
            ${docs.length ? docs.map((d) => `<div class="sindicato-coord-card crm-doc-card">
                <span class="crm-badge crm-badge-doc">${crmDocCatLabel(locale, d.cat)}</span>
                <strong>${d.title}</strong>
                <span class="template-muted">${es ? 'actualizado' : 'updated'} ${d.updated}</span>
            </div>`).join('') : `<p class="template-muted">${es ? 'No hay documentos en esta categoría.' : 'No documents in this category.'}</p>`}`;
    }

    function buildCoordinationSubHtml(locale, coordSub, ctx) {
        const c = t(locale);
        const view = ctx || {};
        const orgId = findCrmOrg(locale, view.crmOrg) ? view.crmOrg : 'sindicapp';
        const org = findCrmOrg(locale, orgId);
        const sub = c.coordSubs[coordSub] ? coordSub : 'afiliadas';
        const builders = {
            afiliadas: () => buildCrmAfiliadasHtml(locale, orgId, view),
            casos: () => buildCrmCasosHtml(locale, orgId),
            campanas: () => buildCrmCampanasHtml(locale, orgId),
            finanzas: () => buildCrmFinanzasHtml(locale, orgId, view),
            comunicaciones: () => buildCrmComunicacionesHtml(locale, orgId),
            calendario: () => buildCrmCalendarioHtml(locale, orgId),
            documentos: () => buildCrmDocumentosHtml(locale, orgId, view)
        };
        return `<div class="sindicato-panel crm-panel">
            <h2>${c.coordSubs[sub]} <span class="crm-org-tag">· ${org.name}</span></h2>
            ${builders[sub]()}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* Orden de artículos de la base de conocimiento (claves compartidas ES/EN).
       'sindicapp' es el artículo inicial/destacado de la wiki. */
    const WIKI_KB_ARTICLES = ['sindicapp', 'derechos', 'denunciar', 'organizar', 'glosario'];

    function buildWikiArticleHtml(locale, id) {
        const c = t(locale);
        const es = locale === 'es';
        const art = (c.wikiArticles || {})[id];
        if (!art) return buildWikiIndexHtml(locale);
        const backLabel = es ? '‹ Índice' : '‹ Index';
        return `<div class="sindicato-panel cp-wiki-article">
            <button type="button" class="sindicato-bridge-jump cp-wiki-back" data-sindicato-wiki-jump="index">${backLabel}</button>
            <h2>${art.title}</h2>
            <p class="template-muted">${art.summary}</p>
            <div class="cp-wiki-article-body">${art.body}</div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildWikiIndexHtml(locale) {
        const c = t(locale);
        const es = locale === 'es';
        const kbItems = WIKI_KB_ARTICLES.map((id) => {
            const art = (c.wikiArticles || {})[id] || {};
            const label = (c.wikiSubs && c.wikiSubs[id]) || id;
            return `<li><button type="button" class="cp-wiki-link" data-sindicato-wiki-jump="${id}">${art.title || label}</button><span class="cp-wiki-blurb">${art.summary || ''}</span></li>`;
        }).join('');
        return `<div class="sindicato-panel cp-wiki-index">
            <h2>${c.wikiTitle}</h2>
            <p class="template-muted">${c.wikiIntro}</p>
            <h3 class="cp-wiki-section-title">${c.wikiKbTitle}</h3>
            <ul class="cp-wiki-pages" data-sindicato-wiki-index>
                ${kbItems}
            </ul>
            <h3 class="cp-wiki-section-title">${c.wikiPlatformTitle}</h3>
            <ul class="cp-wiki-pages">
                <li><button type="button" class="cp-wiki-link" data-sindicato-wiki-jump="normas">${c.wikiSubs.normas}</button><span class="cp-wiki-blurb">${c.wikiNormasBody}</span></li>
            </ul>
            <section class="sindicato-sector-section sindicato-sector-section--wiki cp-wiki-transversal">
                <header class="sindicato-sector-section-head">
                    <span class="sindicato-sector-section-icon" aria-hidden="true">🧭</span>
                    <h3>${c.wikiTransversalTitle}</h3>
                </header>
                <p class="template-muted">${c.wikiTransversalIntro}</p>
                <div class="sindicato-union-companies">${buildWikiEntityExampleLinks(locale)}</div>
            </section>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* Enlaces de ejemplo del índice a páginas wiki por entidad (primera de cada tipo). */
    function buildWikiEntityExampleLinks(locale) {
        const c = t(locale);
        const items = [];
        const wp = (getWorkplaces(locale) || [])[0];
        if (wp) items.push({ kind: 'workplace', id: wp.id, icon: '🏢', name: wp.name });
        const sectors = getSectors(locale) || [];
        if (sectors[0]) items.push({ kind: 'sector', id: sectors[0].id, icon: '🏭', name: sectors[0].name });
        const unions = getUnions(locale) || [];
        if (unions[0]) items.push({ kind: 'union', id: unions[0].id, icon: '🏛️', name: unions[0].name });
        const terrs = getSubterritories(locale) || [];
        if (terrs[0]) items.push({ kind: 'territory', id: terrs[0].id, icon: '🏘️', name: terrs[0].name });
        if (!items.length) return `<span class="template-muted">—</span>`;
        return items.map((it) =>
            `<button type="button" class="sindicato-union-company-link" data-sindicato-wiki-entity="${it.kind}:${it.id}">${it.icon} ${it.name}</button>`
        ).join('');
    }

    /* Página wiki personalizada de una entidad concreta (empresa/sector/sindicato/territorio):
       resumen, historia/notas y enlaces al perfil, su foro y artículos generales. */
    function buildEntityWikiPageHtml(locale, kind, id) {
        const c = t(locale);
        const es = locale === 'es';
        const backLabel = es ? '‹ Índice' : '‹ Index';
        const notes = (c.wikiEntityNotes || {})[kind] || '';
        let name = '';
        let summaryRows = '';
        let profileLinks = '';
        if (kind === 'workplace') {
            const wp = findWorkplace(locale, id);
            if (!wp) return buildWikiIndexHtml(locale);
            name = wp.name;
            summaryRows = `<p class="template-muted">${wp.address ? wp.address + ' · ' : ''}${wp.sector}</p>`
                + `<div class="sindicato-summary-grid">
                    <div class="sindicato-stat"><strong>${wp.workers}</strong><span>${c.workers}</span></div>
                    <div class="sindicato-stat"><strong>${wp.reports + getApprovedReportCount(wp.id)}</strong><span>${c.reports}</span></div>
                </div>`;
            profileLinks = `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-workplace="${wp.id}">🏢 ${c.wikiOpenProfile}</button>`
                + `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-section="reports" data-sindicato-workplace-id="${wp.id}">📢 ${c.sections.reports}</button>`;
        } else if (kind === 'sector') {
            const node = resolveSectorNode(locale, id);
            if (!node) return buildWikiIndexHtml(locale);
            name = node.name;
            summaryRows = `<p class="template-muted">${node.workplaces.length} ${c.subs.workplaces.toLowerCase()} · ${node.unions.length} ${c.subs.unions.toLowerCase()}</p>`;
            profileLinks = `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-sector="${node.id}">🏭 ${c.wikiOpenProfile}</button>`
                + `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-sector-forum="${node.id}">💬 ${c.wikiOpenForum}</button>`;
        } else if (kind === 'union') {
            const union = findUnion(locale, id);
            if (!union) return buildWikiIndexHtml(locale);
            name = union.name;
            summaryRows = `<p class="template-muted">${union.sector}</p>`
                + `<div class="sindicato-summary-grid">
                    <div class="sindicato-stat"><strong>${union.members.toLocaleString()}</strong><span>${c.members}</span></div>
                    <div class="sindicato-stat"><strong>${union.delegates}</strong><span>${c.presenceDelegates}</span></div>
                </div>`;
            profileLinks = `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-union="${union.id}">🏛️ ${c.wikiOpenProfile}</button>`
                + `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-union="${union.id}" data-sindicato-union-section="forum">💬 ${c.wikiOpenForum}</button>`;
        } else if (kind === 'territory') {
            const terr = getSubterritoryById(locale, id);
            if (!terr) return buildWikiIndexHtml(locale);
            name = terr.name;
            summaryRows = `<p class="template-muted">${terr.parentName || ''}</p>`
                + `<div class="sindicato-summary-grid">
                    <div class="sindicato-stat"><strong>${(terr.workplaces || []).length}</strong><span>${c.subs.workplaces}</span></div>
                </div>`;
            profileLinks = `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-vivienda="${terr.id}">🏘️ ${c.wikiOpenProfile}</button>`
                + `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-territory-forum="${terr.id}">💬 ${c.wikiOpenForum}</button>`;
        } else {
            return buildWikiIndexHtml(locale);
        }
        const articleLinks = ['derechos', 'organizar'].map((aid) => {
            const art = (c.wikiArticles || {})[aid] || {};
            return `<button type="button" class="sindicato-union-company-link" data-sindicato-wiki-jump="${aid}">📖 ${art.title || aid}</button>`;
        }).join('');
        const section = (icon, title, body) => `<section class="sindicato-sector-section sindicato-sector-section--wiki">
                <header class="sindicato-sector-section-head">
                    <span class="sindicato-sector-section-icon" aria-hidden="true">${icon}</span>
                    <h3>${title}</h3>
                </header>
                ${body}
            </section>`;
        return `<div class="sindicato-panel cp-wiki-entity">
            <button type="button" class="sindicato-bridge-jump cp-wiki-back" data-sindicato-wiki-jump="index">${backLabel}</button>
            <h2>${c.wikiEmbedTitle} — ${name}</h2>
            ${summaryRows}
            <div class="sindicato-sector-sections">
                ${section('📝', c.wikiEntityNotesTitle, `<p class="template-muted">${notes}</p>`)}
                ${section('🔗', c.wikiEntityLinksTitle, `<div class="sindicato-union-companies">${profileLinks}${articleLinks}</div>`)}
            </div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildWikiNormasHtml(locale) {
        const c = t(locale);
        const es = locale === 'es';
        const backLabel = es ? '‹ Índice' : '‹ Index';
        return `<div class="sindicato-panel">
            <button type="button" class="sindicato-bridge-jump cp-wiki-back" data-sindicato-wiki-jump="index">${backLabel}</button>
            <h2>${c.wikiSubs.normas}</h2>
            <p class="template-muted">${c.wikiNormasBody}</p>
            <div class="sindicato-coord-card"><strong>${es ? 'Denuncias anónimas' : 'Anonymous reports'}</strong><p>${es ? 'Revisión comunitaria + IA antes de publicar' : 'Community + AI review before publication'}</p></div>
            <div class="sindicato-coord-card"><strong>${es ? 'Cuentas verificadas' : 'Verified accounts'}</strong><p>${es ? 'Trabajadoras con verificación en sitio' : 'On-site verified worker accounts'}</p></div>
            <div class="sindicato-coord-card"><strong>${es ? 'Escalado' : 'Escalation'}</strong><p>${es ? 'Cola de moderación → consejo de coordinación' : 'Moderation queue → coordination council'}</p></div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* Wiki transversal (13-07-2026): sección embebida en cada perfil (empresa, sector,
       sindicato, territorio), mismo patrón que el foro embebido. `kind` ∈
       workplace | sector | union | territory. `entity` = {id, name}: la CTA abre la
       PÁGINA wiki personalizada de esa entidad; los enlaces rápidos, artículos generales. */
    function buildEmbeddedWikiSectionHtml(locale, kind, entity) {
        const c = t(locale);
        const blurbs = c.wikiEmbedBlurbs || {};
        const blurb = blurbs[kind] || '';
        const ent = entity || {};
        /* Enlaces rápidos a los artículos más útiles según el tipo de perfil. */
        const quickByKind = {
            workplace: ['organizar', 'denunciar', 'derechos'],
            sector: ['derechos', 'organizar', 'glosario'],
            union: ['organizar', 'glosario', 'derechos'],
            territory: ['derechos', 'denunciar', 'glosario']
        };
        const quick = (quickByKind[kind] || WIKI_KB_ARTICLES).map((id) => {
            const art = (c.wikiArticles || {})[id] || {};
            const label = art.title || (c.wikiSubs && c.wikiSubs[id]) || id;
            return `<button type="button" class="sindicato-union-company-link" data-sindicato-wiki-jump="${id}">📖 ${label}</button>`;
        }).join('');
        /* CTA principal: si hay entidad, abre su página wiki propia; si no, el índice. */
        const cta = ent.id
            ? `<button type="button" class="sindicato-cta-btn sindicato-cta-btn-active" data-sindicato-wiki-entity="${kind}:${ent.id}">${c.wikiEmbedCta}${ent.name ? ` — ${ent.name}` : ''}</button>`
            : `<button type="button" class="sindicato-cta-btn sindicato-cta-btn-active" data-sindicato-wiki-jump="index">${c.wikiEmbedCta}</button>`;
        return `<section class="sindicato-sector-section sindicato-sector-section--wiki">
            <header class="sindicato-sector-section-head">
                <span class="sindicato-sector-section-icon" aria-hidden="true">📖</span>
                <h3>${c.wikiEmbedTitle}</h3>
            </header>
            <p class="template-muted">${blurb}</p>
            <div class="sindicato-union-companies">${quick}</div>
            ${cta}
        </section>`;
    }

    /* Territorios (12-07-2026, reforma legibilidad) — antes «Vivienda». Perfil del
       territorio con cabecera (migas + stats) y rejilla de tarjetas coloreadas, mismo
       patrón que el dossier de sector (sindicato-sector-section). */
    function buildViviendaHtml(locale, territoryId, buildingId, municipalityId) {
        const c = t(locale);
        if (!territoryId) {
            return `<div class="sindicato-panel">
                <h2>${c.viviendaTitle}</h2>
                <p class="template-muted">${c.viviendaIntro}</p>
                <p class="template-muted">${c.viviendaEmpty}</p>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        const terr = getSubterritoryById(locale, territoryId);
        if (!terr) {
            return `<div class="sindicato-panel">
                <h2>${c.viviendaTitle}</h2>
                <p class="template-muted">${c.viviendaPickTerritory}</p>
            </div>`;
        }
        /* R7 — perfil de edificio (mismo patrón mostrar/ocultar que el resto de perfiles). */
        if (buildingId) {
            const building = findBuilding(locale, buildingId);
            if (building && building.territoryId === territoryId) {
                return buildBuildingProfileHtml(locale, building, terr);
            }
        }
        const es = locale === 'es';
        const forumPosts = getViviendaForumPosts(locale, territoryId, terr.name);
        const forumHtml = forumPosts.map((post) =>
            `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${es ? 'respuestas' : 'replies'}</p></div>`
        ).join('');
        const linkedWorkplaces = terr.workplaces.slice(0, 8).map((wp) =>
            `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-workplace="${wp.id}">${wp.name}</button>`
        ).join('') || `<span class="template-muted">—</span>`;
        const alerts = getViviendaAlerts(locale, territoryId);
        const alertsHtml = alerts.length
            ? alerts.map((alert) => {
                const statusLabel = alert.status === 'scheduled'
                    ? (es ? 'Programado' : 'Scheduled')
                    : (es ? 'Riesgo' : 'At risk');
                return `<div class="sindicato-coord-card sindicato-alert-card">
                    <strong>${alert.date} — ${statusLabel}</strong>
                    <p>${alert.address}</p>
                    <p class="template-muted">${alert.note}</p>
                </div>`;
            }).join('')
            : `<p class="template-muted">${c.viviendaNoAlerts}</p>`;
        const municipality = municipalityId
            ? getMunicipalitiesForTerritory(locale, territoryId).find((m) => m.id === municipalityId)
            : null;
        const agendaEvents = getAgendaForTerritory(locale, territoryId);
        const buildings = getBuildingsForTerritory(locale, territoryId);
        /* 13-07-2026: enlaces sociales unificados en buildSocialLinksHtml (Telegram destacado). */
        const linksHtml = buildSocialLinksHtml(locale, terr.id);
        const stat = (icon, n, label, extraCls) =>
            `<span class="sindicato-territory-stat${extraCls ? ` ${extraCls}` : ''}"><span aria-hidden="true">${icon}</span> <strong>${n}</strong> ${label}</span>`;
        const statsHtml = `<div class="sindicato-territory-stats">
            ${stat('🏢', terr.workplaces.length, c.viviendaStatWorkplaces)}
            ${stat('🚨', alerts.length, c.viviendaStatAlerts, alerts.length ? 'sindicato-territory-stat--alert' : '')}
            ${stat('🏠', buildings.length, c.viviendaStatBuildings)}
            ${stat('💬', forumPosts.length, c.viviendaStatThreads)}
        </div>`;
        const breadcrumb = `<p class="sindicato-territory-breadcrumb">
            <span aria-hidden="true">🗺️</span> ${terr.parentName}
            <span class="sindicato-territory-breadcrumb-sep" aria-hidden="true">›</span> ${terr.name}
            ${municipality ? `<span class="sindicato-territory-breadcrumb-sep" aria-hidden="true">›</span> ${municipality.name}` : ''}
        </p>`;
        const municipalityHtml = municipality
            ? `<p class="sindicato-territory-municipality-note">📍 ${municipality.name} — ${c.viviendaMunicipalityNote}</p>`
            : '';
        const section = (mod, icon, title, body) => `<section class="sindicato-sector-section sindicato-territory-section--${mod}">
                <header class="sindicato-sector-section-head">
                    <span class="sindicato-sector-section-icon" aria-hidden="true">${icon}</span>
                    <h3>${title}</h3>
                </header>
                ${body}
            </section>`;
        return `<div class="sindicato-panel sindicato-territory-profile">
            <div class="sindicato-territory-head">
                ${breadcrumb}
                <div class="sindicato-territory-title-row">
                    <h2>${terr.name}</h2>
                    <button type="button" class="sindicato-cta-btn sindicato-territory-map-btn" data-sindicato-goto-map-territory="${terr.id}">🗺️ ${c.viviendaOpenMap}</button>
                </div>
                <p class="template-muted">${c.viviendaIntro}</p>
                ${statsHtml}
                ${municipalityHtml}
            </div>
            <div class="sindicato-sector-sections">
                ${section('empresas', '🏢', c.viviendaWorkplacesTitle, `
                    <p class="template-muted">${c.viviendaWorkplacesIntro}</p>
                    <div class="sindicato-union-companies">${linkedWorkplaces}</div>`)}
                ${section('alertas', '🚨', `${c.viviendaHousingTitle} — ${c.viviendaAlertsTitle.toLowerCase()}`, alertsHtml)}
                ${section('agenda', '📅', c.viviendaAgendaTitle, buildAgendaHtml(locale, agendaEvents, { compact: true }))}
                ${buildings.length ? section('edificios', '🏠', c.buildingsTitle, buildBuildingsBlockHtml(locale, territoryId)) : ''}
                ${section('foro', '💬', c.viviendaForumTitle, `
                    ${forumHtml}
                    <button type="button" class="sindicato-cta-btn sindicato-cta-btn-active" data-sindicato-goto-territory-forum="${terr.id}">${c.viviendaOpenForum}</button>`)}
                ${section('redes', '📣', c.viviendaLinksTitle, `
                    <p class="template-muted">${c.viviendaLinksIntro}</p>
                    ${linksHtml}`)}
                ${buildEmbeddedWikiSectionHtml(locale, 'territory', { id: terr.id, name: terr.name })}
            </div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildWorkspaceHtml(locale, sub, workplaceId, section, filter, context) {
        const ctx = context || {};
        if (!sub) return '';
        if (sub === 'map') return buildMapHtml(locale, ctx.mapTerritoryId || ctx.territoryDossierId || '');
        if (sub === 'unions') {
            if (!ctx.unionId) return buildUnionsDirectoryHtml(locale);
            return buildUnionSectionHtml(locale, ctx.unionId, ctx.unionSection || 'overview');
        }
        /* 13-07-2026: «feed» es ahora Red Social (módulo master, landing con stats);
           el foro real vive en el sub «foro» con los ámbitos de siempre. */
        if (sub === 'feed') return buildRedSocialHtml(locale);
        if (sub === 'foro') {
            return buildFeedHtml(locale, {
                feedScope: ctx.feedScope || 'general',
                feedSectorId: ctx.feedSectorId || '',
                feedTerritoryId: ctx.feedTerritoryId || '',
                feedCompanyId: ctx.feedCompanyId || '',
                forumThreadSlug: ctx.forumThreadSlug || ''
            });
        }
        if (sub === 'consumidores') return buildConsumidoresHtml(locale, ctx.consumidorId || '');
        if (sub === 'estudiantes') return buildEstudiantesHtml(locale, ctx.estudianteCentroId || '');
        if (sub === 'sectores') {
            if (ctx.territoryDossierId) {
                const terr = getSubterritoryById(locale, ctx.territoryDossierId);
                if (terr) return buildTerritoryDossierHtml(locale, terr);
            }
            return buildSectoresHtml(locale, ctx.sectorId);
        }
        if (sub === 'coordination') return buildCoordinationSubHtml(locale, ctx.coordSub || 'afiliadas', ctx);
        if (sub === 'wiki') {
            const wikiSub = ctx.wikiSub || 'index';
            if (wikiSub === 'entity') return buildEntityWikiPageHtml(locale, ctx.wikiEntityKind, ctx.wikiEntityId);
            if (wikiSub === 'normas') return buildWikiNormasHtml(locale);
            if (WIKI_KB_ARTICLES.indexOf(wikiSub) !== -1) return buildWikiArticleHtml(locale, wikiSub);
            return buildWikiIndexHtml(locale);
        }
        if (sub === 'vivienda') return buildViviendaHtml(locale, ctx.viviendaTerritoryId || '', ctx.viviendaBuildingId || '', ctx.viviendaMunicipalityId || '');
        if (sub === 'housing') return buildHousingHtml(locale, ctx.housingSub || 'huelgometro');
        if (sub === 'sindicatos') return buildComingSoonHtml(locale, '🚩', 'sindicatos');
        if (sub === 'autonomos') return buildComingSoonHtml(locale, '🧰', 'autonomos');
        if (sub === 'workplaces') {
            if (!workplaceId) return buildWorkplacesDirectoryHtml(locale, filter);
            const wp = findWorkplace(locale, workplaceId);
            if (!wp) return buildWorkplacesDirectoryHtml(locale, filter);
            if (section === 'location') return buildLocationBridgeHtml(locale, wp);
            if (section === 'reports') return buildWorkplaceReportsHtml(locale, wp);
            if (section === 'wages') return buildWorkplaceWagesHtml(locale, wp);
            if (section === 'convenio') return buildWorkplaceConvenioHtml(locale, wp);
            if (section === 'action') return buildWorkplaceActionHtml(locale, wp);
            return buildWorkplaceOverviewHtml(locale, wp, ctx);
        }
        return buildWelcomeHtml(locale);
    }

    window.SINDICAPP_SINDICATO = {
        t,
        parseSindicatoRoute,
        getStrikeSupportPct,
        castStrikeVote,
        getConvenioFinderResultHtml,
        addWageContribution,
        getWageContributions,
        markForumThreadRead,
        findForumThread,
        buildForumThreadHtml,
        getWorkplaces,
        getUnions,
        findUnion,
        findUnionByName,
        getFeed,
        getSectors,
        getSubsectors,
        getSubsectorById,
        getSubsubsectorById,
        getSectorById,
        resolveSectorNode,
        getSubterritories,
        getSubterritoryById,
        getTerritoryParents,
        getSubterritoriesForParent,
        getMunicipalitiesForTerritory,
        getViviendaAlerts,
        getAllViviendaAlerts,
        getHousingStrikePledgeCount,
        addHousingStrikePledge,
        /* Vivienda ampliado (13-07-2026) — acompañamiento y calculadora */
        addHousingEscortPledge,
        buildHousingCalcResultHtml,
        getWorkplacesForSubsector,
        getWorkplacesForTerritory,
        buildFeedScopeTreeHtml,
        buildTerritoryScopeTreeHtml,
        buildTerritoryDossierHtml,
        getTerritoryBoundaryLink,
        getDefaultBoundaryLayerForLocale,
        resolveSindicatoTerritoryFromBoundary,
        resolveTerritoryPageFromBoundary,
        buildCoordinationSubHtml,
        buildWikiIndexHtml,
        buildWikiNormasHtml,
        buildWikiArticleHtml,
        buildEmbeddedWikiSectionHtml,
        buildEntityWikiPageHtml,
        findWorkplace,
        findWorkplaceByName,
        addCompany,
        submitReport,
        moderateReport,
        /* R4 — agenda */
        getAgendaForWorkplace,
        getAgendaForTerritory,
        getUpcomingAgendaDigest,
        addAgendaEvent,
        buildAgendaHtml,
        /* R5 — verificación */
        getVerification,
        requestUnionEndorsement,
        confirmUnionEndorsement,
        buildTrustBadgeHtml,
        /* R7 — edificios */
        getBuildingsForTerritory,
        findBuilding,
        getTenantPledgeCount,
        addTenantPledge,
        buildWorkspaceHtml,
        buildWelcomeHtml,
        buildSectoresSidebarTreeHtml,
        /* CRM (12-07-2026) */
        getCrmOrgs,
        findCrmOrg,
        getCrmData,
        buildCrmMemberRowsHtml,
        crmMoveCase,
        crmSupportCampaign,
        crmSendComm,
        crmAddEvent,
        buildLocationBridgeHtml,
        buildAddCompanyFormHtml,
        LOGO_SRC: SINDICAPP_LOGO_SRC,
        DEFAULT_MAP_CENTER,
        COPY
    };

    window.SINDICAPP_LOGO = { LOGO_SRC: SINDICAPP_LOGO_SRC };
    const headerLogo = document.querySelector('#content-lux21-template .sindicapp-header-logo');
    if (headerLogo && SINDICAPP_LOGO_SRC) headerLogo.src = SINDICAPP_LOGO_SRC;
})();
/* SINDICATO_FORK_END */
