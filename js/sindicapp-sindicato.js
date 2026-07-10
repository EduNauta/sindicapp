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
            welcomeHint: 'Coordination, wiki, unions, housing, map, forum, sectors, and companies — all on one geography-first platform.',
            mapTitle: 'Company map',
            mapIntro: 'Each pin is an auto-generated company profile. Click OpenStreetMap below, toggle Borders, then explore pins on the map.',
            mapHint: 'Use OpenStreetMap and Borders in the panel below to explore company pins by territory.',
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
            sectoresIntroSidebar: 'Sector tree (sector → subsector → sub-subsector). Expand branches with ▼. All open by default.',
            coordinationTitle: 'Coordination',
            coordinationIntro: 'Neutral platform coordination — council, sector delegates, and liaison nodes.',
            coordinationIntroSidebar: 'Platform coordination — structure, money and objectives.',
            wikiTitle: 'Wiki',
            wikiIntroSidebar: 'Internal wiki — index and platform rules.',
            wikiIndexBlurb: 'Knowledge base — platform rules and how coordination works.',
            wikiNormasBody: 'Moderation queue, verified accounts, anonymous reports, and escalation to coordination council.',
            viviendaTitle: 'Housing',
            viviendaIntro: 'Housing coordination by territory — forum threads and eviction alerts.',
            viviendaIntroSidebar: 'Housing coordination by territory — forum and eviction alerts.',
            viviendaEmpty: 'Pick a region and territory in the sidebar to open its housing forum and alerts.',
            viviendaPickTerritory: 'Select a territory in the sidebar.',
            viviendaForumTitle: 'Territory housing forum',
            viviendaAlertsTitle: 'Eviction alerts',
            viviendaNoAlerts: 'No scheduled evictions in this territory (demo).',
            viviendaParentLabel: 'Select region',
            viviendaTerritoryLabel: 'Select territory',
            mapProviderTitle: 'Map provider',
            mapProviderMuted: 'OpenStreetMap only.',
            mapTerritoriesTitle: 'Territories',
            coordSections: { admin: 'Admin', wiki: 'Wiki' },
            coordSubs: { estructura: 'Structure', dinero: 'Money', objetivos: 'Objectives' },
            wikiSubs: { index: 'Index', normas: 'Rules' },
            coordObjetivosBody: 'Neutral infrastructure goals — geography-first workplace profiles, union liaison without replacing existing structures, and verified worker coordination.',
            coordAdminTitle: 'Admin panel',
            coordAdminBody: 'Moderation queue, verified accounts, and platform settings for SindicApp coordinators.',
            coordAdminStats: 'Pending reports',
            coordAdminAccounts: 'Verified worker accounts',
            coordWikiEstructuraTitle: 'Organisation structure',
            coordWikiEstructuraBody: 'Coordination council, sector delegates, and union liaison nodes — neutral infrastructure, not a replacement union.',
            coordWikiDineroTitle: 'Money & transparency',
            coordWikiDineroBody: 'Demo ledger: membership dues routing, strike fund pools, and audit trail for platform operations.',
            sector: 'Sector',
            workers: 'Verified workers',
            reports: 'Open reports',
            unionsPresent: 'Unions on site',
            strikeSupport: 'Strike support',
            addWorkplace: 'Add company',
            addWorkplaceTitle: 'Register a missing employer',
            addWorkplaceHint: 'Creates a new pin on the map. Demo: saved in this browser only.',
            searchPlaceholder: 'Search by name or sector…',
            selectWorkplace: 'Select company…',
            sections: {
                location: 'Location',
                overview: 'Overview',
                reports: 'Reports',
                wages: 'Wages',
                convenio: 'Convenio',
                action: 'Action'
            },
            subs: { coordination: 'Coordination', wiki: 'Wiki', unions: 'Unions', vivienda: 'Housing', map: 'Map', feed: 'Forum', sectores: 'Sectors', workplaces: 'Companies' },
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
            territoryHousingLink: 'Open housing coordination',
            viviendaWorkplacesTitle: 'Linked workplaces',
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
            panelMuted: 'Neutral workplace coordination — open the background workspace for the full view.',
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
            welcomeHint: 'Coordinación, wiki, sindicatos, vivienda, mapa, foro, sectores y empresas — todo en una plataforma basada en la geografía.',
            mapTitle: 'Mapa de empresas',
            mapIntro: 'Cada pin es un perfil automático de empresa. Pulsa OpenStreetMap abajo, activa Borders y explora los pins en el mapa.',
            mapHint: 'Usa OpenStreetMap y Borders en el panel inferior para explorar pins por territorio.',
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
            sectoresIntroSidebar: 'Árbol sectorial (sector → subsector → sub-subsector). Despliega ramas con ▼. Todo abierto de momento.',
            coordinationTitle: 'Coordinación',
            coordinationIntro: 'Coordinación neutral de plataforma — consejo, delegadas sectoriales y nodos de enlace.',
            coordinationIntroSidebar: 'Coordinación de plataforma — estructura, dinero y objetivos.',
            wikiTitle: 'Wiki',
            wikiIntroSidebar: 'Wiki interna — índice y normas de plataforma.',
            wikiIndexBlurb: 'Base de conocimiento — normas de plataforma y cómo funciona la coordinación.',
            wikiNormasBody: 'Cola de denuncias, cuentas verificadas, informes anónimos y escalado al consejo de coordinación.',
            viviendaTitle: 'Vivienda',
            viviendaIntro: 'Coordinación en vivienda por territorio — foro y alertas de desahucio.',
            viviendaIntroSidebar: 'Coordinación en vivienda por territorio — foro y alertas de desahucio.',
            viviendaEmpty: 'Elige región y territorio en la barra lateral para abrir su foro y alertas.',
            viviendaPickTerritory: 'Selecciona un territorio en la barra lateral.',
            viviendaForumTitle: 'Foro de vivienda del territorio',
            viviendaAlertsTitle: 'Alertas de desahucio',
            viviendaNoAlerts: 'Sin desahucios programados en este territorio (demo).',
            viviendaParentLabel: 'Selecciona región',
            viviendaTerritoryLabel: 'Selecciona territorio',
            mapProviderTitle: 'Proveedor de mapa',
            mapProviderMuted: 'Solo OpenStreetMap.',
            mapTerritoriesTitle: 'Territorios',
            coordSections: { admin: 'Admin', wiki: 'Wiki' },
            coordSubs: { estructura: 'Estructura', dinero: 'Dinero', objetivos: 'Objetivos' },
            wikiSubs: { index: 'Índice', normas: 'Normas' },
            coordObjetivosBody: 'Objetivos de infraestructura neutral — perfiles geográficos de empresa, enlace sindical sin sustituir estructuras existentes y coordinación trabajadora verificada.',
            coordAdminTitle: 'Panel de administración',
            coordAdminBody: 'Cola de moderación, cuentas verificadas y ajustes de plataforma para coordinadores SindicApp.',
            coordAdminStats: 'Denuncias pendientes',
            coordAdminAccounts: 'Cuentas trabajadoras verificadas',
            coordWikiEstructuraTitle: 'Estructura organizativa',
            coordWikiEstructuraBody: 'Consejo de coordinación, delegadas sectoriales y nodos de enlace sindical — infraestructura neutral, no sindicato sustituto.',
            coordWikiDineroTitle: 'Dinero y transparencia',
            coordWikiDineroBody: 'Libro demo: cuotas, fondos de huelga y trazabilidad de operaciones de la plataforma.',
            sector: 'Sector',
            workers: 'Trabajadores verificados',
            reports: 'Denuncias abiertas',
            unionsPresent: 'Sindicatos presentes',
            strikeSupport: 'Apoyo a huelga',
            addWorkplace: 'Añadir empresa',
            addWorkplaceTitle: 'Registrar empleador que falta',
            addWorkplaceHint: 'Crea un nuevo pin en el mapa. Demo: se guarda solo en este navegador.',
            searchPlaceholder: 'Buscar por nombre o sector…',
            selectWorkplace: 'Seleccionar empresa…',
            sections: {
                location: 'Localización',
                overview: 'Resumen',
                reports: 'Denuncias',
                wages: 'Sueldos',
                convenio: 'Convenio',
                action: 'Acción'
            },
            subs: { coordination: 'Coordinación', wiki: 'Wiki', unions: 'Sindicatos', vivienda: 'Vivienda', map: 'Mapa', feed: 'Foro', sectores: 'Sectores', workplaces: 'Empresas' },
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
            territoryHousingLink: 'Abrir coordinación en vivienda',
            viviendaWorkplacesTitle: 'Empresas vinculadas',
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
            panelMuted: 'Coordinación laboral neutral — abre el espacio de fondo para la vista completa.',
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

    const UNIONS = {
        ie: [
            { id: 'siptu', name: 'SIPTU', sector: 'General', delegates: 240, agreements: 36, mainSectors: 'General, logistics, healthcare', members: 18400, liberado: 'Niamh O\'Connell' },
            { id: 'unite', name: 'Unite the Union', sector: 'General', delegates: 130, agreements: 21, mainSectors: 'General, hospitality', members: 9200, liberado: 'James Murphy' },
            { id: 'inmo', name: 'INMO', sector: 'Nursing', delegates: 85, agreements: 12, mainSectors: 'Nursing & midwifery', members: 4100, liberado: '—' },
            { id: 'mandate', name: 'Mandate', sector: 'Retail & bar', delegates: 60, agreements: 14, mainSectors: 'Retail & bar', members: 2800, liberado: 'Sarah Lynch' },
            { id: 'fsu', name: 'FSU', sector: 'Finance & tech', delegates: 25, agreements: 6, mainSectors: 'Finance & tech', members: 1500, liberado: '—' }
        ],
        es: [
            { id: 'ccoo', name: 'CCOO', sector: 'General', delegates: 420, agreements: 58, mainSectors: 'General, industria, servicios', members: 42000, liberado: 'Marina Soler' },
            { id: 'ugt', name: 'UGT', sector: 'General', delegates: 360, agreements: 51, mainSectors: 'General, transporte, comercio', members: 31000, liberado: 'Pere Vidal' },
            { id: 'cgt', name: 'CGT', sector: 'General', delegates: 95, agreements: 9, mainSectors: 'General, logística, tecnología', members: 8500, liberado: 'Laia Ferrer' },
            { id: 'csc', name: 'Intersindical CSC', sector: 'Catalunya', delegates: 70, agreements: 8, mainSectors: 'Intersectorial (Catalunya)', members: 4200, liberado: '—' },
            { id: 'usoc', name: 'USOC', sector: 'Servicios', delegates: 32, agreements: 5, mainSectors: 'Servicios', members: 2100, liberado: 'Jordi Mas' },
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
        return `<h3>${c.buildingsTitle}</h3>
            <p class="template-muted">${c.buildingsIntro}</p>
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

    function buildUnionsDirectoryHtml(locale) {
        const c = t(locale);
        const rows = getUnions(locale).map((u) => {
            const companies = getCompaniesForUnion(locale, u.name);
            const companyLinks = companies.slice(0, 3).map((co) =>
                `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-workplace="${co.id}">${co.name}</button>`
            ).join('') || `<span class="template-muted">—</span>`;
            const more = companies.length > 3
                ? `<button type="button" class="sindicato-union-link" data-sindicato-goto-union="${u.id}" data-sindicato-union-section="companies">+${companies.length - 3}</button>`
                : '';
            return `<button type="button" class="sindicato-union-card sindicato-union-card--link" data-sindicato-goto-union="${u.id}">
                <div class="sindicato-union-card-head">
                    <strong>${u.name}</strong>
                </div>
                <span class="template-muted">${u.sector}</span>
                <div class="sindicato-union-meta">
                    <span>${u.members.toLocaleString()} ${c.members}</span>
                    ${u.liberado !== '—' ? `<span>${c.officerLabel}: ${u.liberado}</span>` : ''}
                </div>
                <p class="sindicato-union-companies-label">${c.presenceTitle}</p>
                <div class="sindicato-union-presence">
                    <span>${c.presenceDelegates}: <strong>${u.delegates}</strong></span>
                    <span>${c.companiesOnSite}: <strong>${companies.length}</strong></span>
                    <span>${c.presenceAgreements}: <strong>${u.agreements}</strong></span>
                    <span>${c.presenceSectors}: <strong>${u.mainSectors}</strong></span>
                </div>
                <p class="sindicato-union-companies-label">${c.companiesOnSite}</p>
                <div class="sindicato-union-companies">${companyLinks}${more}</div>
            </button>`;
        }).join('');
        return `<div class="sindicato-panel">
            <h2>${c.unionsTitle}</h2>
            <p class="template-muted">${c.unionsIntro}</p>
            <p class="template-muted">${c.unionsPick}</p>
            <div class="sindicato-union-grid">${rows}</div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildUnionOverviewHtml(locale, union) {
        const c = t(locale);
        const companies = getCompaniesForUnion(locale, union.name);
        return `<div class="sindicato-panel">
            <h2>${union.name}</h2>
            <p class="template-muted">${c.unionOverviewIntro}</p>
            <span class="template-muted">${union.sector}</span>
            <div class="sindicato-summary-grid">
                <div class="sindicato-stat"><strong>${union.delegates}</strong><span>${c.presenceDelegates}</span></div>
                <div class="sindicato-stat"><strong>${union.members.toLocaleString()}</strong><span>${c.members}</span></div>
                <div class="sindicato-stat"><strong>${companies.length}</strong><span>${c.companiesOnSite}</span></div>
            </div>
            ${union.liberado !== '—' ? `<p><strong>${c.officerLabel}:</strong> ${union.liberado}</p>` : ''}
            <div class="sindicato-union-presence">
                <span>${c.presenceAgreements}: <strong>${union.agreements}</strong></span>
                <span>${c.presenceSectors}: <strong>${union.mainSectors}</strong></span>
            </div>
            <div class="sindicato-bridge-jumps">
                ${buildUnionSectionJumpBtn('forum', c.unionOpenForum, union.id)}
                ${buildUnionSectionJumpBtn('structure', c.unionOpenStructure, union.id)}
            </div>
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
            <h2>${union.name} — ${c.unionSections.forum}</h2>
            <p class="template-muted">${c.unionForumIntro}</p>
            ${cards}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildUnionStructureHtml(locale, union) {
        const c = t(locale);
        const es = locale === 'es';
        return `<div class="sindicato-panel">
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
        const companies = getCompaniesForUnion(locale, union.name);
        const links = companies.map((co) =>
            `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-workplace="${co.id}">${co.name}</button>`
        ).join('') || `<span class="template-muted">—</span>`;
        return `<div class="sindicato-panel">
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
                return `<div class="sindicato-panel">
                    <h2>${c.feedTitle}</h2>
                    <p class="template-muted">${c.feedPickScope}</p>
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
                <h2>${sectorNode.name}</h2>
                <p class="template-muted">${feedMeta}</p>
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
                return `<div class="sindicato-panel">
                    <h2>${c.feedTitle}</h2>
                    <p class="template-muted">${c.feedPickScope}</p>
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
                <h2>${territory.name}</h2>
                <p class="template-muted">${territory.parentName} — ${c.feedScopeTerritory}</p>
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

    const TERRITORY_TREE = {
        es: {
            'area-metropolitana': {
                name: 'Àrea Metropolitana de Barcelona',
                subterritories: [
                    { id: 'barcelona-ciutat', name: 'Barcelona ciutat' },
                    { id: 'barcelona-litoral', name: 'Litoral' },
                    { id: 'barcelona-ponent', name: 'Ponent' }
                ]
            },
            girona: {
                name: 'Girona',
                subterritories: [
                    { id: 'girona-comarca', name: 'Comarca de Girona' },
                    { id: 'girona-costa', name: 'Costa Brava' },
                    { id: 'girona-interior', name: 'Interior' }
                ]
            },
            lleida: {
                name: 'Lleida / Ponent',
                subterritories: [
                    { id: 'lleida-segria', name: 'Segrià' },
                    { id: 'lleida-alt-urgell', name: 'Alt Urgell' },
                    { id: 'lleida-noguera', name: 'Noguera' }
                ]
            },
            tarragona: {
                name: 'Tarragona / Sud',
                subterritories: [
                    { id: 'tarragona-camp', name: 'Camp de Tarragona' },
                    { id: 'tarragona-ebre', name: 'Terres de l\'Ebre' },
                    { id: 'tarragona-priorat', name: 'Priorat' }
                ]
            },
            central: {
                name: 'Catalunya Central',
                subterritories: [
                    { id: 'central-bages', name: 'Bages' },
                    { id: 'central-osona', name: 'Osona' },
                    { id: 'central-anoia', name: 'Anoia' }
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
            'central-anoia': { layer: 'catComarques', names: ['Anoia'] }
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
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildSectorDossierHtml(locale, node) {
        const c = t(locale);
        const workplaceItems = node.workplaces.map((wp) =>
            `<li><button type="button" class="sindicato-union-company-link" data-sindicato-goto-workplace="${wp.id}">${wp.name}</button> — ${wp.workers} ${c.workers.toLowerCase()}</li>`
        ).join('');
        const unionItems = node.unions.map((u) => `<li>${buildUnionGotoBtn(locale, u)}</li>`).join('') || `<li class="template-muted">—</li>`;
        const forumPosts = node.forumPosts.map((post) =>
            `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${locale === 'es' ? 'respuestas' : 'replies'}</p></div>`
        ).join('');
        const meta = node.type === 'sector'
            ? c.sectoresSectorIntro
            : node.type === 'subsubsector'
                ? `${node.parentName} — ${node.subsectorName} — ${c.sectoresIntro}`
                : `${node.parentName} — ${c.sectoresIntro}`;
        return `<div class="sindicato-panel">
            <h2>${node.name}</h2>
            <p class="template-muted">${meta}</p>
            <h3>${c.sectoresUnions}</h3>
            <ul class="sindicato-sector-detail-list">${unionItems}</ul>
            <h3>${c.sectoresWorkplaces}</h3>
            <ul class="sindicato-sector-detail-list">${workplaceItems || '<li class="template-muted">—</li>'}</ul>
            <h3>${c.sectoresForum}</h3>
            <p class="template-muted">${c.sectoresForumPosts}</p>
            ${forumPosts}
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

    function buildCoordinationAdminHtml(locale) {
        const c = t(locale);
        const pending = getWorkplaces(locale).reduce((sum, wp) => sum + (wp.reports || 0), 0);
        return `<div class="sindicato-panel">
            <h2>${c.coordAdminTitle}</h2>
            <p class="template-muted">${c.coordAdminBody}</p>
            <div class="sindicato-coord-card"><strong>${c.coordAdminStats}</strong><p>${pending}</p></div>
            <div class="sindicato-coord-card"><strong>${c.coordAdminAccounts}</strong><p>${getWorkplaces(locale).reduce((sum, wp) => sum + (wp.workers || 0), 0).toLocaleString(locale === 'es' ? 'es-ES' : 'en-IE')}</p></div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildCoordinationSubHtml(locale, coordSub) {
        const c = t(locale);
        const es = locale === 'es';
        if (coordSub === 'dinero') {
            return `<div class="sindicato-panel">
                <h2>${c.coordSubs.dinero}</h2>
                <p class="template-muted">${c.coordWikiDineroBody}</p>
                <div class="sindicato-coord-card"><strong>${es ? 'Fondo de huelga sectorial' : 'Sector strike fund'}</strong><p>€ 48.200 demo</p></div>
                <div class="sindicato-coord-card"><strong>${es ? 'Cuotas enrutadas' : 'Routed dues'}</strong><p>€ 12.840 demo${es ? ' / trimestre' : ' / quarter'}</p></div>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        if (coordSub === 'objetivos') {
            return `<div class="sindicato-panel">
                <h2>${c.coordSubs.objetivos}</h2>
                <p class="template-muted">${c.coordObjetivosBody}</p>
                <div class="sindicato-coord-card"><strong>${es ? 'Geografía primero' : 'Geography first'}</strong><p>${es ? 'Cada empresa con perfil en el mapa' : 'Every company profiled on the map'}</p></div>
                <div class="sindicato-coord-card"><strong>${es ? 'Infraestructura neutral' : 'Neutral infrastructure'}</strong><p>${es ? 'Sin sustituir sindicatos existentes' : 'No replacement for existing unions'}</p></div>
                <div class="sindicato-coord-card"><strong>${es ? 'Cuentas verificadas' : 'Verified accounts'}</strong><p>${es ? 'Moderación humana + IA' : 'Human moderation + AI assist'}</p></div>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        return `<div class="sindicato-panel">
            <h2>${c.coordSubs.estructura}</h2>
            <p class="template-muted">${c.coordWikiEstructuraBody}</p>
            <div class="sindicato-coord-card"><strong>${es ? 'Consejo de coordinación' : 'Coordination council'}</strong><p>7 seats — demo</p></div>
            <div class="sindicato-coord-card"><strong>${es ? 'Delegadas sectoriales' : 'Sector delegates'}</strong><p>${getSectors(locale).length} ${es ? 'ramas activas' : 'active branches'}</p></div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildWikiIndexHtml(locale) {
        const c = t(locale);
        const es = locale === 'es';
        return `<div class="sindicato-panel cp-wiki-index">
            <h2>${c.wikiTitle}</h2>
            <p class="template-muted">${c.wikiIndexBlurb}</p>
            <ul class="cp-wiki-pages" data-sindicato-wiki-index>
                <li><button type="button" class="cp-wiki-link" data-sindicato-wiki-jump="normas">${c.wikiSubs.normas}</button><span class="cp-wiki-blurb">${c.wikiNormasBody}</span></li>
                <li><span class="cp-wiki-link cp-wiki-link--static">${es ? 'Coordinación → Estructura' : 'Coordination → Structure'}</span><span class="cp-wiki-blurb">${c.coordWikiEstructuraBody}</span></li>
                <li><span class="cp-wiki-link cp-wiki-link--static">${es ? 'Coordinación → Dinero' : 'Coordination → Money'}</span><span class="cp-wiki-blurb">${c.coordWikiDineroBody}</span></li>
                <li><span class="cp-wiki-link cp-wiki-link--static">${es ? 'Coordinación → Objetivos' : 'Coordination → Objectives'}</span><span class="cp-wiki-blurb">${c.coordObjetivosBody}</span></li>
            </ul>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildWikiNormasHtml(locale) {
        const c = t(locale);
        const es = locale === 'es';
        return `<div class="sindicato-panel">
            <h2>${c.wikiSubs.normas}</h2>
            <p class="template-muted">${c.wikiNormasBody}</p>
            <div class="sindicato-coord-card"><strong>${es ? 'Denuncias anónimas' : 'Anonymous reports'}</strong><p>${es ? 'Revisión comunitaria + IA antes de publicar' : 'Community + AI review before publication'}</p></div>
            <div class="sindicato-coord-card"><strong>${es ? 'Cuentas verificadas' : 'Verified accounts'}</strong><p>${es ? 'Trabajadoras con verificación en sitio' : 'On-site verified worker accounts'}</p></div>
            <div class="sindicato-coord-card"><strong>${es ? 'Escalado' : 'Escalation'}</strong><p>${es ? 'Cola de moderación → consejo de coordinación' : 'Moderation queue → coordination council'}</p></div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildViviendaHtml(locale, territoryId, buildingId) {
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
        const forumPosts = getViviendaForumPosts(locale, territoryId, terr.name);
        const forumHtml = forumPosts.map((post) =>
            `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${locale === 'es' ? 'respuestas' : 'replies'}</p></div>`
        ).join('');
        const linkedWorkplaces = terr.workplaces.slice(0, 8).map((wp) =>
            `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-workplace="${wp.id}">${wp.name}</button>`
        ).join('') || `<span class="template-muted">—</span>`;
        const alerts = getViviendaAlerts(locale, territoryId);
        const es = locale === 'es';
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
        return `<div class="sindicato-panel">
            <h2>${c.viviendaTitle} — ${terr.parentName} / ${terr.name}</h2>
            <p class="template-muted">${c.viviendaIntro}</p>
            <h3>${c.viviendaAlertsTitle}</h3>
            ${alertsHtml}
            ${buildAgendaHtml(locale, getAgendaForTerritory(locale, territoryId), { title: c.agendaViviendaTitle })}
            ${buildBuildingsBlockHtml(locale, territoryId)}
            <h3>${c.viviendaForumTitle}</h3>
            ${forumHtml}
            <h3>${c.viviendaWorkplacesTitle}</h3>
            <p class="template-muted">${c.viviendaWorkplacesIntro}</p>
            <div class="sindicato-union-companies sindicato-union-companies--page">${linkedWorkplaces}</div>
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
        if (sub === 'feed') {
            return buildFeedHtml(locale, {
                feedScope: ctx.feedScope || 'general',
                feedSectorId: ctx.feedSectorId || '',
                feedTerritoryId: ctx.feedTerritoryId || '',
                feedCompanyId: ctx.feedCompanyId || '',
                forumThreadSlug: ctx.forumThreadSlug || ''
            });
        }
        if (sub === 'sectores') {
            if (ctx.territoryDossierId) {
                const terr = getSubterritoryById(locale, ctx.territoryDossierId);
                if (terr) return buildTerritoryDossierHtml(locale, terr);
            }
            return buildSectoresHtml(locale, ctx.sectorId);
        }
        if (sub === 'coordination') return buildCoordinationSubHtml(locale, ctx.coordSub || 'estructura');
        if (sub === 'wiki') {
            const wikiSub = ctx.wikiSub || 'index';
            if (wikiSub === 'normas') return buildWikiNormasHtml(locale);
            return buildWikiIndexHtml(locale);
        }
        if (sub === 'vivienda') return buildViviendaHtml(locale, ctx.viviendaTerritoryId || '', ctx.viviendaBuildingId || '');
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
        getViviendaAlerts,
        getWorkplacesForSubsector,
        getWorkplacesForTerritory,
        buildFeedScopeTreeHtml,
        buildTerritoryScopeTreeHtml,
        buildTerritoryDossierHtml,
        getTerritoryBoundaryLink,
        getDefaultBoundaryLayerForLocale,
        resolveSindicatoTerritoryFromBoundary,
        buildCoordinationSubHtml,
        buildWikiIndexHtml,
        buildWikiNormasHtml,
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
        buildCoordinationAdminHtml,
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
