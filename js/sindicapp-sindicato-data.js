/* sindicapp/sindicapp-sindicato-data.js */
/* 20-07-2026 tarde (idea 71, report v5): los grandes literales de DATOS DEMO del
   módulo Sindicato (directorios, seeds de convenios/agenda/vivienda/colectivos y
   los datasets propuesta) salen de sindicapp-sindicato.js a su propio script
   clásico, cargado antes que él. Expone window.SINDICAPP_SINDICATO_DATA.<NOMBRE>;
   sindicapp-sindicato.js referencia cada literal por su nombre de siempre, así que
   las mutaciones runtime (añadir empresa, votos…) siguen tocando el mismo objeto. */
(function () {
    'use strict';

    window.SINDICAPP_SINDICATO_DATA = {};

    window.SINDICAPP_SINDICATO_DATA.BASE_WORKPLACES = {
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

    window.SINDICAPP_SINDICATO_DATA.UNIONS = {
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

    window.SINDICAPP_SINDICATO_DATA.FEED = {
        ie: [
            { id: 'f1', type: 'report', workplaceId: 'temple-bar-hospitality', section: 'reports', workplace: 'Temple Bar Hospitality Group', text: '3 new anonymous reports: unpaid closing shifts, tip pooling by management.', time: '2h ago', hot: true },
            { id: 'f2', type: 'wage', workplaceId: 'docklands-logistics', section: 'wages', workplace: 'Dublin Docklands Logistics', text: 'Night-shift pallet rate updated in crowd-sourced wage chart — €16.10 median.', time: '5h ago', hot: false },
            { id: 'f3', type: 'strike', workplaceId: 'silicon-docks-tech', section: 'action', workplace: 'Silicon Docks Tech Ltd', text: 'Strike readiness poll at 41% — needs 55% to schedule action window.', time: '8h ago', hot: true },
            { id: 'f4', type: 'convenio', workplaceId: 'grafton-retail', section: 'convenio', workplace: 'Grafton Retail Co-op', text: 'Guided lookup answered: Sunday premium clause applies after 6 months tenure.', time: '1d ago', hot: false },
            { id: 'f5', type: 'union', unionId: 'inmo', workplaceId: 'st-james-medical', section: 'forum', workplace: "St James's Medical Services", text: 'INMO posted liberado contact and FAQ on roster-change rights.', time: '1d ago', hot: false }
        ],
        es: [
            { id: 'f1', type: 'report', workplaceId: 'boqueria-hostaleria', section: 'reports', workplace: 'Mercat Central Hostaleria SL', text: '4 denuncias nuevas: turnos partidos sin compensación, propinas retenidas.', time: 'hace 2h', hot: true },
            { id: 'f2', type: 'wage', workplaceId: 'zona-franca-logistica', section: 'wages', workplace: 'Polígon Nord Logística', text: 'Actualizado organigrama anónimo — carretillero 1.720 € media mensual.', time: 'hace 4h', hot: false },
            { id: 'f3', type: 'strike', workplaceId: 'techpark-solutions', section: 'action', workplace: 'TechPark Solutions', text: 'Sondeo de huelga al 44% — umbral de convocatoria en 55%.', time: 'hace 6h', hot: true },
            { id: 'f4', type: 'convenio', workplaceId: 'supermercat-diari', section: 'convenio', workplace: 'Supermercat Diari', text: 'Consulta guiada: el plus de festivo del convenio aplica desde el primer mes.', time: 'hace 1d', hot: false },
            { id: 'f5', type: 'union', unionId: 'ccoo', workplaceId: 'clinica-sant-pere', section: 'forum', workplace: 'Clínica Privada Sant Pere', text: 'CCOO publicó contacto de delegada y alerta sobre cambios de turno.', time: 'hace 1d', hot: false }
        ]
    };

    window.SINDICAPP_SINDICATO_DATA.REPORTS_BY_WORKPLACE = {
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

    window.SINDICAPP_SINDICATO_DATA.WAGE_CHART = {
        'docklands-logistics': [{ role: 'Warehouse operative', wage: '€15.40/hr', votes: 28 }, { role: 'Forklift driver', wage: '€17.20/hr', votes: 19 }, { role: 'Shift supervisor', wage: '€19.80/hr', votes: 8 }],
        'boqueria-hostaleria': [{ role: 'Camarero/a', wage: '1.280 €', votes: 22 }, { role: 'Cocinero/a', wage: '1.450 €', votes: 14 }, { role: 'Encargado/a', wage: '1.620 €', votes: 6 }]
    };

    window.SINDICAPP_SINDICATO_DATA.REGISTRO_BY_WORKPLACE = {
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

    window.SINDICAPP_SINDICATO_DATA.CONVENIO_CLAUSES = {
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

    window.SINDICAPP_SINDICATO_DATA.CONVENIO_SALARY_TABLES = {
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

    window.SINDICAPP_SINDICATO_DATA.CONVENIO_DIRECTORY = {
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

    window.SINDICAPP_SINDICATO_DATA.AGENDA_BY_WORKPLACE = {
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

    window.SINDICAPP_SINDICATO_DATA.AGENDA_BY_TERRITORY = {
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

    window.SINDICAPP_SINDICATO_DATA.FORUM_THREAD_TRUST = {
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

    window.SINDICAPP_SINDICATO_DATA.BUILDINGS_BY_TERRITORY = {
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

    window.SINDICAPP_SINDICATO_DATA.BUILDING_CONDITION_REPORTS = {
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

    window.SINDICAPP_SINDICATO_DATA.RENT_BANDS_BY_TERRITORY = {
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

    window.SINDICAPP_SINDICATO_DATA.TENANT_PLEDGE_BASE = {
        'bcn-balmes-120': 14,
        'bcn-marina-88': 6,
        'gir-placa-vi-3': 3,
        'dub-mayor-12': 11,
        'cork-patrick-45': 5,
        'gal-eyre-8': 4
    };

    window.SINDICAPP_SINDICATO_DATA.LARGE_HOLDERS = {
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

    window.SINDICAPP_SINDICATO_DATA.TENANT_ASSEMBLIES = {
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

    window.SINDICAPP_SINDICATO_DATA.RENT_INDEX = {
        es: { 'barcelona-ciutat': 15.1, 'barcelona-litoral': 13.4, 'girona-comarca': 10.2, 'lleida-segria': 7.8, 'tarragona-camp': 8.9 },
        ie: { 'dublin-docklands': 27.9, 'dublin-city-centre': 26.4, 'cork-city': 18.6, 'galway-city': 19.1, 'limerick-east': 15.2 }
    };

    window.SINDICAPP_SINDICATO_DATA.HOUSING_UNIONS = {
        es: [
            { id: 'hu-catalunya', icon: '🏠', name: 'Sindicat de Llogateres i Llogaters', region: 'Catalunya', members: 6500, buildings: 120, issues: ['Huelga de alquileres', 'Fin de los contratos de temporada', 'Regulación real de los precios'] },
            { id: 'hu-madrid', icon: '🏠', name: 'Sindicato de Inquilinas de Madrid', region: 'Comunidad de Madrid', members: 3800, buildings: 74, issues: ['Bloques en lucha frente a fondos', 'Contra las subidas abusivas'] },
            { id: 'hu-valencia', icon: '🏠', name: 'Sindicat de Llogateres del País Valencià', region: 'País Valencià', members: 1500, buildings: 31, issues: ['Turistificación y expulsión de vecinas'] },
            { id: 'hu-euskadi', icon: '🏠', name: 'Etxebizitza Sindikatua', region: 'Euskadi', members: 900, buildings: 18, issues: ['Vivienda pública de alquiler asequible'] },
            { id: 'hu-andalucia', icon: '🏠', name: 'Sindicato de Inquilinas de Andalucía', region: 'Andalucía', members: 1100, buildings: 22, issues: ['Contra los desahucios de grandes tenedores'] }
        ],
        ie: [
            { id: 'hu-dublin', icon: '🏠', name: 'CATU Dublin', region: 'Dublin', members: 2200, buildings: 48, issues: ['Rent freeze', 'End no-fault evictions'] },
            { id: 'hu-cork', icon: '🏠', name: 'CATU Cork', region: 'Cork', members: 800, buildings: 19, issues: ['Affordable public housing'] },
            { id: 'hu-galway', icon: '🏠', name: 'CATU Galway', region: 'Galway', members: 400, buildings: 9, issues: ['Student and worker housing crisis'] }
        ]
    };

    window.SINDICAPP_SINDICATO_DATA.CONSUMER_ITEMS = {
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

    window.SINDICAPP_SINDICATO_DATA.STUDY_CENTERS = {
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

    window.SINDICAPP_SINDICATO_DATA.PRO_BODIES = {
        es: [
            { id: 'comb-metges-bcn', icon: '🩺', name: 'Col·legi de Metges de Barcelona (CoMB)', type: 'Colegio de médicos', territoryId: 'barcelona-ciutat', members: 30000, fee: 560,
                unions: ['Metges de Catalunya', 'CCOO Sanitat'],
                issues: [
                    { title: 'Límite de agendas: máximo de visitas diarias en primaria', replies: 58 },
                    { title: 'Descanso efectivo tras guardia de 24 h', replies: 44 }
                ],
                mobilizations: [{ date: '2026-10-06', title: 'Concentración por la primaria', place: 'Passeig de la Bonanova' }] },
            { id: 'icab-advocacia', icon: '⚖️', name: 'Il·lustre Col·legi de l\'Advocacia de Barcelona (ICAB)', type: 'Colegio de la abogacía', territoryId: 'barcelona-ciutat', members: 25000, fee: 480,
                unions: ['Advocacia Jove', 'Plataforma Torn d\'Ofici Digne'],
                issues: [
                    { title: 'Turno de oficio: baremos dignos y pago puntual', replies: 63 },
                    { title: 'Conciliación: suspensión de plazos por baja parental', replies: 37 }
                ],
                mobilizations: [{ date: '2026-09-29', title: 'Paro del turno de oficio', place: 'Ciutat de la Justícia' }] },
            { id: 'coac-arquitectes', icon: '📐', name: 'Col·legi d\'Arquitectes de Catalunya (COAC)', type: 'Colegio de arquitectos', territoryId: 'barcelona-ciutat', members: 10500, fee: 350,
                unions: ['Sindicat d\'Arquitectes (SArq)'],
                issues: [
                    { title: 'Concursos: fin de las bajas temerarias en honorarios', replies: 29 },
                    { title: 'Falso autónomo en estudios de arquitectura', replies: 41 }
                ],
                mobilizations: [] },
            { id: 'coib-infermeria', icon: '💉', name: 'Col·legi Oficial d\'Infermeres de Barcelona (COIB)', type: 'Colegio de enfermería', territoryId: 'barcelona-ciutat', members: 45000, fee: 180,
                unions: ['SATSE', 'Infermeres de Catalunya'],
                issues: [
                    { title: 'Ratios seguras de pacientes por enfermera', replies: 72 },
                    { title: 'Reconocimiento efectivo de las especialidades', replies: 33 }
                ],
                mobilizations: [{ date: '2026-10-12', title: 'Jornada por las ratios seguras', place: 'Plaça Sant Jaume' }] },
            { id: 'comg-metges-girona', icon: '🩺', name: 'Col·legi de Metges de Girona', type: 'Colegio de médicos', territoryId: 'girona-comarca', members: 3200, fee: 520,
                unions: ['Metges de Catalunya'],
                issues: [{ title: 'Cobertura de plazas en comarcas: incentivos reales', replies: 21 }],
                mobilizations: [] }
        ],
        ie: [
            { id: 'rcpi-physicians', icon: '🩺', name: 'Royal College of Physicians of Ireland', type: 'Medical professional body', territoryId: 'dublin-city-centre', members: 11000, fee: 540,
                unions: ['IMO', 'IHCA'],
                issues: [
                    { title: 'Safe rosters — end 24h+ hospital shifts', replies: 51 },
                    { title: 'Consultant posts left unfilled outside Dublin', replies: 34 }
                ],
                mobilizations: [{ date: '2026-10-07', title: 'NCHD lunchtime protest', place: 'St James\'s Hospital' }] },
            { id: 'law-society-ie', icon: '⚖️', name: 'Law Society of Ireland', type: 'Solicitors\' professional body', territoryId: 'dublin-city-centre', members: 12000, fee: 300,
                unions: ['Trainee Solicitors\' Forum', 'FLAC'],
                issues: [
                    { title: 'Legal aid rates — restore and index fees', replies: 46 },
                    { title: 'Trainee minimum salary across all firms', replies: 39 }
                ],
                mobilizations: [] },
            { id: 'nmbi-nursing', icon: '💉', name: 'Nursing & Midwifery Board of Ireland', type: 'Nursing professional body', territoryId: 'dublin-city-centre', members: 79000, fee: 100,
                unions: ['INMO'],
                issues: [
                    { title: 'Safe staffing ratios in every ward', replies: 68 },
                    { title: 'Recognition of overseas qualifications, faster', replies: 27 }
                ],
                mobilizations: [{ date: '2026-10-15', title: 'Safe staffing rally', place: 'Merrion Square' }] },
            { id: 'riai-architects', icon: '📐', name: 'Royal Institute of the Architects of Ireland', type: 'Architects\' professional body', territoryId: 'dublin-city-centre', members: 3200, fee: 380,
                unions: ['Architectural Workers Assembly'],
                issues: [{ title: 'Unpaid overtime culture in practices', replies: 24 }],
                mobilizations: [] },
            { id: 'teaching-council-ie', icon: '🏫', name: 'The Teaching Council', type: 'Teachers\' professional body', territoryId: 'dublin-south', members: 120000, fee: 65,
                unions: ['INTO', 'ASTI', 'TUI'],
                issues: [{ title: 'Permanent contracts for young teachers', replies: 57 }],
                mobilizations: [{ date: '2026-10-02', title: 'Equal pay for equal work march', place: 'Leinster House' }] }
        ]
    };

    window.SINDICAPP_SINDICATO_DATA.AUTONOMO_PLATFORMS = {
        es: [
            { id: 'glovo-reparto', icon: '🛵', name: 'Glovo', type: 'Plataforma de reparto', sector: 'Reparto y última milla', freelancers: 12000,
                rates: [
                    { role: 'Pedido medio (Barcelona)', rate: '€ 4,20 / pedido', votes: 61 },
                    { role: 'Hora en franja punta', rate: '€ 9,50 / h', votes: 38 }
                ],
                campaigns: [
                    { title: 'Tarifa mínima garantizada por pedido', support: 64 },
                    { title: 'Fin de las desconexiones sin causa', support: 71 }
                ],
                associations: ['RidersXDerechos', 'Mensakas (coop alternativa)'] },
            { id: 'vtc-uber-cabify', icon: '🚗', name: 'Uber / Cabify (VTC)', type: 'Plataforma VTC', sector: 'Transporte de pasajeros', freelancers: 8000,
                rates: [
                    { role: 'Hora efectiva de conducción', rate: '€ 11,00 / h', votes: 45 },
                    { role: 'Km en trayecto asignado', rate: '€ 0,52 / km', votes: 27 }
                ],
                campaigns: [{ title: 'Tarifa mínima por km y hora de espera', support: 58 }],
                associations: ['Conductors Units VTC'] },
            { id: 'amazon-flex-es', icon: '📦', name: 'Amazon Flex', type: 'Reparto de paquetería', sector: 'Logística', freelancers: 4000,
                rates: [{ role: 'Bloque de 2 h (furgoneta propia)', rate: '€ 26 / bloque', votes: 33 }],
                campaigns: [{ title: 'Que el bloque cubra combustible y seguro', support: 49 }],
                associations: ['Repartidores Unidos'] },
            { id: 'malt-fiverr-freelance', icon: '💻', name: 'Malt / Fiverr', type: 'Marketplace freelance', sector: 'Diseño, código y contenidos', freelancers: 15000,
                rates: [
                    { role: 'Diseño gráfico — hora', rate: '€ 28 / h', votes: 42 },
                    { role: 'Desarrollo web — hora', rate: '€ 45 / h', votes: 55 }
                ],
                campaigns: [{ title: 'Comisiones de plataforma por debajo del 10%', support: 47 }],
                associations: ['Coordinadora Freelance'] },
            { id: 'prensa-colaboradores', icon: '📰', name: 'Medios — colaboradores', type: 'Gran cliente (prensa)', sector: 'Periodismo y contenidos', freelancers: 2500,
                rates: [{ role: 'Pieza estándar (800 palabras)', rate: '€ 80 / pieza', votes: 29 }],
                campaigns: [{ title: 'Pago a 30 días, no a 90', support: 76 }],
                associations: ['Sindicat de Periodistes de Catalunya'] }
        ],
        ie: [
            { id: 'deliveroo-ie', icon: '🛵', name: 'Deliveroo', type: 'Delivery platform', sector: 'Last-mile delivery', freelancers: 5000,
                rates: [
                    { role: 'Average drop (Dublin)', rate: '€ 4.60 / drop', votes: 48 },
                    { role: 'Peak-hour rate', rate: '€ 12.00 / h', votes: 31 }
                ],
                campaigns: [
                    { title: 'Guaranteed minimum per drop', support: 62 },
                    { title: 'No deactivation without appeal', support: 69 }
                ],
                associations: ['Dublin Couriers Collective'] },
            { id: 'uber-ie', icon: '🚗', name: 'Uber', type: 'Ride-hailing platform', sector: 'Passenger transport', freelancers: 3000,
                rates: [{ role: 'Effective driving hour', rate: '€ 13.50 / h', votes: 26 }],
                campaigns: [{ title: 'Fair per-km rate and waiting pay', support: 54 }],
                associations: ['App Drivers Alliance'] },
            { id: 'amazon-flex-ie', icon: '📦', name: 'Amazon Flex', type: 'Parcel delivery', sector: 'Logistics', freelancers: 1500,
                rates: [{ role: '2h block (own van)', rate: '€ 30 / block', votes: 19 }],
                campaigns: [{ title: 'Blocks must cover fuel and insurance', support: 44 }],
                associations: ['Couriers Together'] },
            { id: 'upwork-ie', icon: '💻', name: 'Upwork', type: 'Freelance marketplace', sector: 'Design, code & content', freelancers: 9000,
                rates: [
                    { role: 'Graphic design — hour', rate: '€ 32 / h', votes: 37 },
                    { role: 'Web development — hour', rate: '€ 50 / h', votes: 41 }
                ],
                campaigns: [{ title: 'Platform fees below 10%', support: 51 }],
                associations: ['Freelance Ireland'] }
        ]
    };

    window.SINDICAPP_SINDICATO_DATA.AUTONOMO_UNIONS = {
        es: [
            { id: 'aut-riders', icon: '🛵', name: 'RidersXDerechos', sector: 'Reparto', members: 3500, platforms: ['Glovo', 'Deliveroo'], issues: ['Tarifa mínima garantizada por pedido', 'Fin de las desconexiones sin causa'] },
            { id: 'aut-vtc', icon: '🚗', name: 'Conductors Units VTC', sector: 'VTC', members: 1200, platforms: ['Uber / Cabify'], issues: ['Tarifa mínima por km y hora de espera'] },
            { id: 'aut-freelance', icon: '💻', name: 'Coordinadora Freelance', sector: 'Freelance digital', members: 2000, platforms: ['Malt / Fiverr'], issues: ['Comisiones de plataforma por debajo del 10%'] },
            { id: 'aut-prensa', icon: '📰', name: 'Sindicat de Periodistes de Catalunya', sector: 'Periodismo', members: 2500, platforms: ['Medios — colaboradores'], issues: ['Pago a 30 días, no a 90'] }
        ],
        ie: [
            { id: 'aut-couriers', icon: '🛵', name: 'Dublin Couriers Collective', sector: 'Delivery', members: 1500, platforms: ['Deliveroo'], issues: ['Guaranteed minimum per drop', 'No deactivation without appeal'] },
            { id: 'aut-drivers', icon: '🚗', name: 'App Drivers Alliance', sector: 'Ride-hailing', members: 900, platforms: ['Uber'], issues: ['Fair per-km rate and waiting pay'] },
            { id: 'aut-freelance', icon: '💻', name: 'Freelance Ireland', sector: 'Freelance', members: 1200, platforms: ['Upwork'], issues: ['Platform fees below 10%'] }
        ]
    };

    window.SINDICAPP_SINDICATO_DATA.PROPUESTA_DEMO = {
        es: {
            intake: [
                { name: 'Marta G.', channel: 'Telegram', territory: 'Barcelonès', theme: 'Impago de horas extra', next: 'Invitar a asamblea de bienvenida (24-07)', state: 'nuevo' },
                { name: 'Youssef B.', channel: 'Email', territory: 'Vallès Occidental', theme: 'Subida de alquiler', next: 'Pedir contrato y burofax', state: 'seguimiento' },
                { name: 'Irene T.', channel: 'Presencial (asamblea)', territory: 'Barcelonès', theme: 'Despido en periodo de prueba', next: 'Revisar carta con jurídica', state: 'seguimiento' },
                { name: 'Pau R.', channel: 'Teléfono', territory: 'Gironès', theme: 'Falso autónomo', next: '—', state: 'convertida' },
                { name: 'Ana L.', channel: 'Formulario web', territory: 'Bages', theme: 'Consulta de convenio', next: 'Resuelta en primera respuesta', state: 'archivada' }
            ],
            cases: [
                { id: 'pc1', title: 'Impago de horas extra', person: 'Marina Soler', theme: 'Salario', territoryId: 'barcelona-ciutat', actor: 'Polígon Nord Logística', owner: 'Laia Ferrer', stage: 'En curso',
                    updates: [
                        { date: '2026-07-02', by: 'Laia Ferrer', note: 'Primera reunión: recopiladas nóminas de 6 meses.' },
                        { date: '2026-07-10', by: 'Laia Ferrer', note: 'Enviado burofax reclamando 41 h extra.' },
                        { date: '2026-07-15', by: 'Marina Soler', note: 'La empresa ofrece pagar el 60%. Se lleva a asamblea.' }
                    ],
                    docs: [{ name: 'Contrato', status: 'ok' }, { name: 'Nóminas (6 meses)', status: 'ok' }, { name: 'Registro horario', status: 'falta' }] },
                { id: 'pc2', title: 'Modificación unilateral de turnos', person: 'Óscar Peña', theme: 'Jornada', territoryId: 'barcelona-ciutat', actor: 'Polígon Nord Logística', owner: 'Jordi Mas', stage: 'Nuevo',
                    updates: [{ date: '2026-07-14', by: 'Jordi Mas', note: 'Caso abierto desde intake. Afecta a todo el turno de noche.' }],
                    docs: [{ name: 'Contrato', status: 'revision' }, { name: 'Cuadrante nuevo', status: 'ok' }] },
                { id: 'pc3', title: 'Plus de nocturnidad impagado', person: 'Amina El Idrissi', theme: 'Salario', territoryId: 'girona-comarca', actor: 'Polígon Nord Logística', owner: 'Laia Ferrer', stage: 'Negociación',
                    updates: [
                        { date: '2026-06-20', by: 'Laia Ferrer', note: 'Detectado en revisión colectiva de nóminas.' },
                        { date: '2026-07-08', by: 'Laia Ferrer', note: 'Mesa con la empresa: reconoce el error, negocia atrasos.' }
                    ],
                    docs: [{ name: 'Nóminas', status: 'ok' }, { name: 'Convenio aplicable', status: 'ok' }] },
                { id: 'pc4', title: 'Sanción impugnada', person: 'Pere Vidal', theme: 'Disciplinario', actor: 'Supermercat Diari', owner: 'Núria Bosch', stage: 'Resuelto', outcome: 'favorable',
                    updates: [
                        { date: '2026-05-30', by: 'Núria Bosch', note: 'Alegaciones presentadas.' },
                        { date: '2026-06-25', by: 'Núria Bosch', note: 'Sanción retirada. Caso cerrado con resultado favorable.' }
                    ],
                    docs: [{ name: 'Carta de sanción', status: 'ok' }, { name: 'Alegaciones', status: 'ok' }] }
            ],
            myCases: [
                { title: 'Impago de horas extra', stage: 'En curso', updated: 'hace 2d', note: 'La empresa ofrece el 60% — se decide en asamblea.' }
            ],
            myDocs: [
                { name: 'Contrato', status: 'ok' }, { name: 'Nóminas (6 meses)', status: 'ok' }, { name: 'Registro horario', status: 'falta' }
            ],
            internalThreads: [
                { title: 'Estrategia ante la oferta del 60% en Polígon Nord', replies: 14, last: 'hace 3h' },
                { title: 'Caja de resistencia: propuesta de cuota extraordinaria', replies: 9, last: 'hace 1d' },
                { title: 'Acta de la asamblea del 10-07', replies: 3, last: 'hace 5d' }
            ],
            sessions: [
                { id: 'ps1', type: 'ordinaria', title: 'Asamblea ordinaria de julio', date: '2026-07-24 · 18:30', place: 'Local del sindicato', attendance: 34,
                    roles: [
                        { role: 'Moderación', holder: 'Carme Rovira', backup: 'Jordi Mas' },
                        { role: 'Acogida', holder: 'Iván Ortega', backup: '' },
                        { role: 'Acta', holder: '', backup: '' },
                        { role: 'Turnos', holder: 'Laia Ferrer', backup: 'Rosa Camps' }
                    ],
                    turns: [
                        { who: 'Marina Soler', kind: 'actualizacion', status: 'atendida', caseRef: 'Impago de horas extra' },
                        { who: 'Marta G.', kind: 'primera', status: 'encurso', caseRef: 'Impago de horas extra (nueva)' },
                        { who: 'Óscar Peña', kind: 'actualizacion', status: 'pendiente', caseRef: 'Modificación de turnos' },
                        { who: 'Youssef B.', kind: 'primera', status: 'pendiente', caseRef: 'Subida de alquiler' }
                    ] },
                { id: 'ps2', type: 'bienvenida', title: 'Sesión de bienvenida', date: '2026-07-24 · 17:30', place: 'Local del sindicato', attendance: 8, roles: [{ role: 'Acogida', holder: 'Iván Ortega', backup: '' }], turns: [] },
                { id: 'ps3', type: 'especial', title: 'Sesión especial: Polígon Nord (3 casos)', date: '2026-07-29 · 18:00', place: 'Local del sindicato', attendance: 12, roles: [{ role: 'Moderación', holder: 'Laia Ferrer', backup: '' }], turns: [] }
            ]
        },
        ie: {
            intake: [
                { name: 'Aoife K.', channel: 'Telegram', territory: 'Dublin City', theme: 'Unpaid overtime', next: 'Invite to welcome session (24-07)', state: 'nuevo' },
                { name: 'Tomás M.', channel: 'Email', territory: 'Cork City', theme: 'Rent increase', next: 'Request lease and notice letter', state: 'seguimiento' },
                { name: 'Priya S.', channel: 'In person (assembly)', territory: 'Dublin City', theme: 'Probation dismissal', next: 'Legal review of letter', state: 'seguimiento' },
                { name: 'Sean B.', channel: 'Phone', territory: 'Galway', theme: 'Bogus self-employment', next: '—', state: 'convertida' },
                { name: 'Emma N.', channel: 'Web form', territory: 'Limerick', theme: 'Agreement query', next: 'Solved in first reply', state: 'archivada' }
            ],
            cases: [
                { id: 'pc1', title: 'Unpaid overtime', person: 'Niamh O\'Connell', theme: 'Pay', territoryId: 'dublin-docklands', actor: 'Liffey Logistics Park', owner: 'Sarah Lynch', stage: 'In progress',
                    updates: [
                        { date: '2026-07-02', by: 'Sarah Lynch', note: 'First meeting: collected 6 months of payslips.' },
                        { date: '2026-07-15', by: 'Niamh O\'Connell', note: 'Company offers 60%. Going to the assembly.' }
                    ],
                    docs: [{ name: 'Contract', status: 'ok' }, { name: 'Payslips (6 months)', status: 'ok' }, { name: 'Time records', status: 'falta' }] },
                { id: 'pc2', title: 'Unilateral roster change', person: 'Liam Doyle', theme: 'Hours', territoryId: 'dublin-docklands', actor: 'Liffey Logistics Park', owner: 'James Murphy', stage: 'New',
                    updates: [{ date: '2026-07-14', by: 'James Murphy', note: 'Opened from intake. Affects the whole night shift.' }],
                    docs: [{ name: 'Contract', status: 'revision' }, { name: 'New roster', status: 'ok' }] },
                { id: 'pc3', title: 'Night premium unpaid', person: 'Grace Nolan', theme: 'Pay', territoryId: 'cork-city', actor: 'Liffey Logistics Park', owner: 'Sarah Lynch', stage: 'Bargaining',
                    updates: [{ date: '2026-07-08', by: 'Sarah Lynch', note: 'Company admits the error, negotiating back pay.' }],
                    docs: [{ name: 'Payslips', status: 'ok' }, { name: 'Agreement', status: 'ok' }] },
                { id: 'pc4', title: 'Contested sanction', person: 'Conor Walsh', theme: 'Disciplinary', actor: 'Grafton Retail Co-op', owner: 'Aoife Byrne', stage: 'Resolved', outcome: 'favorable',
                    updates: [{ date: '2026-06-25', by: 'Aoife Byrne', note: 'Sanction withdrawn. Closed with a favourable outcome.' }],
                    docs: [{ name: 'Sanction letter', status: 'ok' }, { name: 'Appeal', status: 'ok' }] }
            ],
            myCases: [
                { title: 'Unpaid overtime', stage: 'In progress', updated: '2d ago', note: 'Company offers 60% — the assembly decides.' }
            ],
            myDocs: [
                { name: 'Contract', status: 'ok' }, { name: 'Payslips (6 months)', status: 'ok' }, { name: 'Time records', status: 'falta' }
            ],
            internalThreads: [
                { title: 'Strategy on the 60% offer at Liffey Logistics', replies: 14, last: '3h ago' },
                { title: 'Strike fund: special dues proposal', replies: 9, last: '1d ago' },
                { title: 'Minutes of the 10-07 assembly', replies: 3, last: '5d ago' }
            ],
            sessions: [
                { id: 'ps1', type: 'ordinaria', title: 'July ordinary assembly', date: '2026-07-24 · 18:30', place: 'Union hall', attendance: 34,
                    roles: [
                        { role: 'Moderation', holder: 'Emma Kavanagh', backup: 'James Murphy' },
                        { role: 'Welcome desk', holder: 'Sean Brennan', backup: '' },
                        { role: 'Minutes', holder: '', backup: '' },
                        { role: 'Turns', holder: 'Sarah Lynch', backup: 'Grace Nolan' }
                    ],
                    turns: [
                        { who: 'Niamh O\'Connell', kind: 'actualizacion', status: 'atendida', caseRef: 'Unpaid overtime' },
                        { who: 'Aoife K.', kind: 'primera', status: 'encurso', caseRef: 'Unpaid overtime (new)' },
                        { who: 'Liam Doyle', kind: 'actualizacion', status: 'pendiente', caseRef: 'Roster change' },
                        { who: 'Tomás M.', kind: 'primera', status: 'pendiente', caseRef: 'Rent increase' }
                    ] },
                { id: 'ps2', type: 'bienvenida', title: 'Welcome session', date: '2026-07-24 · 17:30', place: 'Union hall', attendance: 8, roles: [{ role: 'Welcome desk', holder: 'Sean Brennan', backup: '' }], turns: [] },
                { id: 'ps3', type: 'especial', title: 'Special session: Liffey Logistics (3 cases)', date: '2026-07-29 · 18:00', place: 'Union hall', attendance: 12, roles: [{ role: 'Moderation', holder: 'Sarah Lynch', backup: '' }], turns: [] }
            ]
        }
    };

    window.SINDICAPP_SINDICATO_DATA.PROPUESTA_TYPE_DEMO = {
        es: {
            profesionales: {
                intake: [
                    { name: 'Anna R.', channel: 'Telegram', territory: 'Barcelonès', theme: 'Colegiación y cuota', next: 'Enviar información de alta', state: 'nuevo' },
                    { name: 'David M.', channel: 'Email', territory: 'Gironès', theme: 'Intrusismo profesional', next: 'Recopilar pruebas', state: 'seguimiento' },
                    { name: 'Laia P.', channel: 'Presencial', territory: 'Barcelonès', theme: 'Baja por burnout', next: 'Derivar a salud laboral', state: 'seguimiento' }
                ],
                cases: [
                    { id: 'pc1', title: 'Ratios de enfermería inseguros', person: 'Marina Soler', theme: 'Condiciones', territoryId: 'barcelona-ciutat', actor: 'Hospital Vall d\'Hebron', owner: 'Laia Ferrer', stage: 'En curso',
                        updates: [{ date: '2026-07-05', by: 'Laia Ferrer', note: 'Recogidas 40 firmas de la unidad.' }, { date: '2026-07-12', by: 'Laia Ferrer', note: 'Presentada queja ante la dirección médica.' }],
                        docs: [{ name: 'Cuadrante de turnos', status: 'ok' }, { name: 'Registro de incidencias', status: 'falta' }] },
                    { id: 'pc2', title: 'Guardia de 24 h sin descanso', person: 'Pere Vidal', theme: 'Jornada', territoryId: 'girona-comarca', actor: 'ICS', owner: 'Núria Bosch', stage: 'Negociación',
                        updates: [{ date: '2026-07-08', by: 'Núria Bosch', note: 'Mesa con el ICS sobre libranzas post-guardia.' }],
                        docs: [{ name: 'Convenio sanitario', status: 'ok' }] },
                    { id: 'pc3', title: 'Turno de oficio impagado', person: 'Jordi Mas', theme: 'Honorarios', actor: 'Generalitat — Justícia', owner: 'Óscar Peña', stage: 'Nuevo',
                        updates: [{ date: '2026-07-14', by: 'Óscar Peña', note: 'Caso abierto: 6 meses de baremos sin abonar.' }],
                        docs: [{ name: 'Expedientes de turno', status: 'revision' }] }
                ],
                sessions: [
                    { id: 'ps1', type: 'ordinaria', title: 'Junta ordinaria de colegiadas', date: '2026-07-24 · 19:00', place: 'Sede colegial', attendance: 40,
                        roles: [{ role: 'Moderación', holder: 'Carme Rovira', backup: '' }, { role: 'Deontología', holder: 'Iván Ortega', backup: '' }, { role: 'Acta', holder: '', backup: '' }, { role: 'Turnos', holder: 'Laia Ferrer', backup: '' }],
                        turns: [{ who: 'Marina Soler', kind: 'actualizacion', status: 'encurso', caseRef: 'Ratios de enfermería' }, { who: 'Anna R.', kind: 'primera', status: 'pendiente', caseRef: 'Colegiación' }] },
                    { id: 'ps2', type: 'especial', title: 'Comisión de deontología', date: '2026-07-30 · 18:00', place: 'Sede colegial', attendance: 9, roles: [{ role: 'Instrucción', holder: 'Iván Ortega', backup: '' }], turns: [] }
                ]
            },
            autonomos: {
                intake: [
                    { name: 'Youssef B.', channel: 'Telegram', territory: 'Barcelonès', theme: 'Desconexión sin causa (Glovo)', next: 'Documentar el histórico', state: 'nuevo' },
                    { name: 'Marta G.', channel: 'Email', territory: 'Vallès Occidental', theme: 'Falso autónomo', next: 'Revisar con jurídica', state: 'seguimiento' },
                    { name: 'Kevin O.', channel: 'Teléfono', territory: 'Barcelonès', theme: 'Tarifa por debajo de coste', next: 'Sumar a la campaña de tarifas', state: 'seguimiento' }
                ],
                cases: [
                    { id: 'pc1', title: 'Desconexión masiva tras protesta', person: 'Youssef B.', theme: 'Plataforma', territoryId: 'barcelona-ciutat', actor: 'Glovo', owner: 'Laia Ferrer', stage: 'En curso',
                        updates: [{ date: '2026-07-06', by: 'Laia Ferrer', note: 'Recogidos 30 casos de desconexión el mismo día.' }, { date: '2026-07-13', by: 'Laia Ferrer', note: 'Escrito colectivo a la plataforma.' }],
                        docs: [{ name: 'Capturas de la app', status: 'ok' }, { name: 'Historial de pedidos', status: 'falta' }] },
                    { id: 'pc2', title: 'Falso autónomo en VTC', person: 'Marta G.', theme: 'Laboral', territoryId: 'girona-comarca', actor: 'Uber / Cabify', owner: 'Jordi Mas', stage: 'Negociación',
                        updates: [{ date: '2026-07-09', by: 'Jordi Mas', note: 'Preparada demanda de laboralidad.' }],
                        docs: [{ name: 'Contrato mercantil', status: 'ok' }] },
                    { id: 'pc3', title: 'Tarifa por debajo de coste', person: 'Kevin O.', theme: 'Tarifas', actor: 'Amazon Flex', owner: 'Óscar Peña', stage: 'Nuevo',
                        updates: [{ date: '2026-07-14', by: 'Óscar Peña', note: 'El bloque no cubre combustible ni seguro.' }],
                        docs: [{ name: 'Cálculo de costes', status: 'revision' }] }
                ],
                sessions: [
                    { id: 'ps1', type: 'ordinaria', title: 'Asamblea de riders', date: '2026-07-24 · 20:00', place: 'Local / online', attendance: 55,
                        roles: [{ role: 'Moderación', holder: 'Rosa Camps', backup: '' }, { role: 'Plataformas', holder: 'Amina El Idrissi', backup: '' }, { role: 'Acta', holder: '', backup: '' }, { role: 'Turnos', holder: 'Laia Ferrer', backup: '' }],
                        turns: [{ who: 'Youssef B.', kind: 'primera', status: 'encurso', caseRef: 'Desconexión Glovo' }, { who: 'Marta G.', kind: 'actualizacion', status: 'pendiente', caseRef: 'Falso autónomo VTC' }] },
                    { id: 'ps2', type: 'especial', title: 'Sesión especial: tarifas mínimas', date: '2026-07-31 · 19:00', place: 'Online', attendance: 30, roles: [{ role: 'Coordinación de tarifas', holder: 'Rosa Camps', backup: '' }], turns: [] }
                ]
            },
            estudiantes: {
                intake: [
                    { name: 'Èlia F.', channel: 'Telegram', territory: 'Barcelonès', theme: 'Beca denegada', next: 'Revisar requisitos y recurso', state: 'nuevo' },
                    { name: 'Marc S.', channel: 'Presencial', territory: 'Barcelonès', theme: 'Acoso de un docente', next: 'Activar protocolo', state: 'seguimiento' },
                    { name: 'Nora V.', channel: 'Email', territory: 'Gironès', theme: 'Prácticas no remuneradas', next: 'Sumar a la campaña', state: 'seguimiento' }
                ],
                cases: [
                    { id: 'pc1', title: 'Subida de tasas de máster', person: 'Marina Soler', theme: 'Tasas', territoryId: 'barcelona-ciutat', actor: 'Universitat de Barcelona', owner: 'Laia Ferrer', stage: 'En curso',
                        updates: [{ date: '2026-07-05', by: 'Laia Ferrer', note: 'Recogida de firmas en tres facultades.' }, { date: '2026-07-12', by: 'Laia Ferrer', note: 'Reunión con el rectorado solicitada.' }],
                        docs: [{ name: 'Tabla de tasas', status: 'ok' }, { name: 'Firmas', status: 'ok' }] },
                    { id: 'pc2', title: 'Prácticas curriculares sin pagar', person: 'Pere Vidal', theme: 'Prácticas', territoryId: 'girona-comarca', actor: 'UB — Facultad', owner: 'Núria Bosch', stage: 'Negociación',
                        updates: [{ date: '2026-07-09', by: 'Núria Bosch', note: 'Propuesta de convenio de prácticas dignas.' }],
                        docs: [{ name: 'Convenio de prácticas', status: 'revision' }] },
                    { id: 'pc3', title: 'Salud mental: sin plazas', person: 'Èlia F.', theme: 'Bienestar', actor: 'Universitat de Barcelona', owner: 'Óscar Peña', stage: 'Nuevo',
                        updates: [{ date: '2026-07-14', by: 'Óscar Peña', note: 'Lista de espera de meses en el servicio psicológico.' }],
                        docs: [{ name: 'Datos del servicio', status: 'falta' }] }
                ],
                sessions: [
                    { id: 'ps1', type: 'ordinaria', title: 'Asamblea de estudiantes', date: '2026-07-24 · 13:00', place: 'Aula magna', attendance: 60,
                        roles: [{ role: 'Moderación', holder: 'Carme Rovira', backup: '' }, { role: 'Bienestar', holder: 'Iván Ortega', backup: '' }, { role: 'Acta', holder: '', backup: '' }, { role: 'Turnos', holder: 'Laia Ferrer', backup: '' }],
                        turns: [{ who: 'Marina Soler', kind: 'actualizacion', status: 'encurso', caseRef: 'Tasas de máster' }, { who: 'Èlia F.', kind: 'primera', status: 'pendiente', caseRef: 'Beca denegada' }] },
                    { id: 'ps2', type: 'especial', title: 'Sesión especial: becas', date: '2026-07-30 · 12:00', place: 'Sala de juntas', attendance: 25, roles: [{ role: 'Referente de becas', holder: 'Iván Ortega', backup: '' }], turns: [] }
                ]
            }
        },
        ie: {
            profesionales: {
                intake: [
                    { name: 'Aoife K.', channel: 'Telegram', territory: 'Dublin City', theme: 'Registration & fees', next: 'Send onboarding info', state: 'nuevo' },
                    { name: 'Tom D.', channel: 'Email', territory: 'Cork City', theme: 'Unlicensed practice', next: 'Gather evidence', state: 'seguimiento' },
                    { name: 'Sinead R.', channel: 'In person', territory: 'Dublin City', theme: 'Burnout leave', next: 'Refer to occupational health', state: 'seguimiento' }
                ],
                cases: [
                    { id: 'pc1', title: 'Unsafe nursing ratios', person: 'Niamh O\'Connell', theme: 'Conditions', territoryId: 'dublin-docklands', actor: 'St James\'s Hospital', owner: 'Sarah Lynch', stage: 'In progress',
                        updates: [{ date: '2026-07-05', by: 'Sarah Lynch', note: 'Collected 40 signatures from the ward.' }],
                        docs: [{ name: 'Roster', status: 'ok' }, { name: 'Incident log', status: 'falta' }] },
                    { id: 'pc2', title: '24h shift with no rest', person: 'James Murphy', theme: 'Hours', territoryId: 'cork-city', actor: 'HSE', owner: 'Aoife Byrne', stage: 'Bargaining',
                        updates: [{ date: '2026-07-08', by: 'Aoife Byrne', note: 'Table with the HSE on post-call rest.' }],
                        docs: [{ name: 'Agreement', status: 'ok' }] },
                    { id: 'pc3', title: 'Legal aid fees unpaid', person: 'Liam Doyle', theme: 'Fees', actor: 'Dept of Justice', owner: 'Conor Walsh', stage: 'New',
                        updates: [{ date: '2026-07-14', by: 'Conor Walsh', note: 'Opened: 6 months of fees outstanding.' }],
                        docs: [{ name: 'Case files', status: 'revision' }] }
                ],
                sessions: [
                    { id: 'ps1', type: 'ordinaria', title: 'Ordinary members\' meeting', date: '2026-07-24 · 19:00', place: 'College HQ', attendance: 40,
                        roles: [{ role: 'Moderation', holder: 'Emma Kavanagh', backup: '' }, { role: 'Ethics', holder: 'Sean Brennan', backup: '' }, { role: 'Minutes', holder: '', backup: '' }, { role: 'Turns', holder: 'Sarah Lynch', backup: '' }],
                        turns: [{ who: 'Niamh O\'Connell', kind: 'actualizacion', status: 'encurso', caseRef: 'Nursing ratios' }, { who: 'Aoife K.', kind: 'primera', status: 'pendiente', caseRef: 'Registration' }] },
                    { id: 'ps2', type: 'especial', title: 'Ethics board', date: '2026-07-30 · 18:00', place: 'College HQ', attendance: 9, roles: [{ role: 'Case instruction', holder: 'Sean Brennan', backup: '' }], turns: [] }
                ]
            },
            autonomos: {
                intake: [
                    { name: 'Karl B.', channel: 'Telegram', territory: 'Dublin City', theme: 'Deactivation (Deliveroo)', next: 'Log the history', state: 'nuevo' },
                    { name: 'Mia G.', channel: 'Email', territory: 'Cork City', theme: 'Bogus self-employment', next: 'Legal review', state: 'seguimiento' },
                    { name: 'Owen L.', channel: 'Phone', territory: 'Dublin City', theme: 'Below-cost rate', next: 'Add to rates campaign', state: 'seguimiento' }
                ],
                cases: [
                    { id: 'pc1', title: 'Mass deactivation after protest', person: 'Karl B.', theme: 'Platform', territoryId: 'dublin-docklands', actor: 'Deliveroo', owner: 'Sarah Lynch', stage: 'In progress',
                        updates: [{ date: '2026-07-06', by: 'Sarah Lynch', note: '30 same-day deactivation cases collected.' }],
                        docs: [{ name: 'App screenshots', status: 'ok' }, { name: 'Order history', status: 'falta' }] },
                    { id: 'pc2', title: 'Bogus self-employment (ride-hailing)', person: 'Mia G.', theme: 'Employment', territoryId: 'cork-city', actor: 'Uber', owner: 'James Murphy', stage: 'Bargaining',
                        updates: [{ date: '2026-07-09', by: 'James Murphy', note: 'Employment-status claim prepared.' }],
                        docs: [{ name: 'Service contract', status: 'ok' }] },
                    { id: 'pc3', title: 'Below-cost delivery rate', person: 'Owen L.', theme: 'Rates', actor: 'Amazon Flex', owner: 'Conor Walsh', stage: 'New',
                        updates: [{ date: '2026-07-14', by: 'Conor Walsh', note: 'Block covers neither fuel nor insurance.' }],
                        docs: [{ name: 'Cost breakdown', status: 'revision' }] }
                ],
                sessions: [
                    { id: 'ps1', type: 'ordinaria', title: 'Couriers assembly', date: '2026-07-24 · 20:00', place: 'Hall / online', attendance: 55,
                        roles: [{ role: 'Moderation', holder: 'Grace Nolan', backup: '' }, { role: 'Platforms', holder: 'Priya Sharma', backup: '' }, { role: 'Minutes', holder: '', backup: '' }, { role: 'Turns', holder: 'Sarah Lynch', backup: '' }],
                        turns: [{ who: 'Karl B.', kind: 'primera', status: 'encurso', caseRef: 'Deliveroo deactivation' }, { who: 'Mia G.', kind: 'actualizacion', status: 'pendiente', caseRef: 'Bogus self-employment' }] },
                    { id: 'ps2', type: 'especial', title: 'Special session: minimum rates', date: '2026-07-31 · 19:00', place: 'Online', attendance: 30, roles: [{ role: 'Rates coordination', holder: 'Grace Nolan', backup: '' }], turns: [] }
                ]
            },
            estudiantes: {
                intake: [
                    { name: 'Ella F.', channel: 'Telegram', territory: 'Dublin City', theme: 'Grant refused', next: 'Review criteria & appeal', state: 'nuevo' },
                    { name: 'Mark S.', channel: 'In person', territory: 'Dublin City', theme: 'Lecturer harassment', next: 'Trigger protocol', state: 'seguimiento' },
                    { name: 'Nora V.', channel: 'Email', territory: 'Cork City', theme: 'Unpaid placement', next: 'Add to campaign', state: 'seguimiento' }
                ],
                cases: [
                    { id: 'pc1', title: 'Master\'s fee increase', person: 'Niamh O\'Connell', theme: 'Fees', territoryId: 'dublin-docklands', actor: 'Trinity College Dublin', owner: 'Sarah Lynch', stage: 'In progress',
                        updates: [{ date: '2026-07-05', by: 'Sarah Lynch', note: 'Signature drive across three schools.' }],
                        docs: [{ name: 'Fees table', status: 'ok' }, { name: 'Signatures', status: 'ok' }] },
                    { id: 'pc2', title: 'Unpaid curricular placement', person: 'James Murphy', theme: 'Placement', territoryId: 'cork-city', actor: 'TCD — School', owner: 'Aoife Byrne', stage: 'Bargaining',
                        updates: [{ date: '2026-07-09', by: 'Aoife Byrne', note: 'Fair-placement agreement proposed.' }],
                        docs: [{ name: 'Placement agreement', status: 'revision' }] },
                    { id: 'pc3', title: 'Mental health: no slots', person: 'Ella F.', theme: 'Wellbeing', actor: 'Trinity College Dublin', owner: 'Conor Walsh', stage: 'New',
                        updates: [{ date: '2026-07-14', by: 'Conor Walsh', note: 'Months-long waiting list at counselling.' }],
                        docs: [{ name: 'Service data', status: 'falta' }] }
                ],
                sessions: [
                    { id: 'ps1', type: 'ordinaria', title: 'Students\' assembly', date: '2026-07-24 · 13:00', place: 'Main hall', attendance: 60,
                        roles: [{ role: 'Moderation', holder: 'Emma Kavanagh', backup: '' }, { role: 'Wellbeing', holder: 'Sean Brennan', backup: '' }, { role: 'Minutes', holder: '', backup: '' }, { role: 'Turns', holder: 'Sarah Lynch', backup: '' }],
                        turns: [{ who: 'Niamh O\'Connell', kind: 'actualizacion', status: 'encurso', caseRef: 'Fee increase' }, { who: 'Ella F.', kind: 'primera', status: 'pendiente', caseRef: 'Grant refused' }] },
                    { id: 'ps2', type: 'especial', title: 'Special session: grants', date: '2026-07-30 · 12:00', place: 'Boardroom', attendance: 25, roles: [{ role: 'Grants reference', holder: 'Sean Brennan', backup: '' }], turns: [] }
                ]
            }
        }
    };

    window.SINDICAPP_SINDICATO_DATA.SINDICATO_GENERAL_FORUM_THREADS = {
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

})();
