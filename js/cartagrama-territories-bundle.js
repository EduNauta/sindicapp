/* shared/cartagrama-territories-bundle.js */
/**
 * Cartagrama territories / boundaries — verbatim extract from Cartagrama.html.
 * Regenerate: node scripts/extract-cartagrama-territories.mjs
 * Do not hand-edit; fix upstream in Cartagrama.html and re-run extract.
 */
(function () {
'use strict';

const CONFIG = { MAPBOX_STYLE_URL: 'mapbox://styles/mapbox/streets-v12', MAPBOX_STYLE_URL_STYLED: '' };
let currentMapboxStyleUrl = CONFIG.MAPBOX_STYLE_URL;

/* --- Cartagrama.html L10117-L10117: currentMap --- */
let currentMap = null;

/* --- Cartagrama.html L10127-L10144: debug + isLeafletProvider --- */
let DEBUG_LOGS_MAP_APIS = false;
try {
    DEBUG_LOGS_MAP_APIS =
        localStorage.getItem('cartagrama_debug') === '1' ||
        localStorage.getItem('cartagrama_debug_map_apis') === '1';
} catch (_) {}
function cartagramaDebugLog(...args) {
    if (DEBUG_LOGS_MAP_APIS) console.log(...args);
}
if (typeof window.setupMapApiKeyInputs === 'function') window.setupMapApiKeyInputs();
if (typeof window.setupMapboxCustomStyles === 'function') window.setupMapboxCustomStyles();
    if (typeof window.setupGoogleCustomStyles === 'function') window.setupGoogleCustomStyles();
let currentProvider = null;

/** Leaflet / Terra Draw path (OpenStreetMap base; optional OpenRailwayMap overlay is not a separate provider). */
function isLeafletProvider(provider = currentProvider) {
    return provider === 'openstreetmap';
}

/* --- Cartagrama.html L10875-L10875: currentMode --- */
let currentMode = 'select'; // Current drawing mode

/* --- Cartagrama.html L10941-L12151: BOUNDARY_DATA + fetchGeoJSON + boundary state --- */
const BOUNDARY_DATA = {
    WORLD_COUNTRIES: 'https://datahub.io/core/geo-countries/r/countries.geojson',
    SPAIN_PROVINCES: 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/spain-provinces.geojson',
    // Spain-wide CCAA (Comunidades autónomas)
    SPAIN_CCAA: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-spain-comunidad-autonoma/exports/geojson?limit=-1',
    
    // Spain-wide datasets (all regions)
    // Comarcas: Currently using Autonomous Communities as substitute
    // Note: True comarcas only exist officially in Catalunya, Aragon, Galicia, and some other regions
    SPAIN_COMARCAS: 'https://raw.githubusercontent.com/highcharts/map-collection-dist/master/countries/es/es-all.geo.json',
    
    // Municipalities: All 8,000+ Spanish municipalities from official IGN API
    // Source: Spanish National Geographic Institute (IGN) via OGC API-Features
    // Note: API limit is 5000 features per request
    SPAIN_MUNICIPALITIES: 'https://api-features.ign.es/collections/administrativeunit/items?f=json&limit=5000',
    
    // Census Sections: Statistical territorial units from INE
    // Source: Spanish National Statistics Institute (INE) via WFS
    // Note: Limited to 2000 features for performance (35,000+ total nationwide)
    SPAIN_CENSUS: 'https://www.ine.es/geoserver/WMS_INE_SECCIONES_G01/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=Secciones_2024&outputFormat=application/json&maxFeatures=2000',
    
    // Catalunya-specific layers (used by Catalunya section)
    CAT_COMARQUES: 'https://raw.githubusercontent.com/ArnauInes/geometries_cat_bcn_2024/main/dts_comarques_cat_2025.json',
    CAT_MUNICIPALITIES: 'https://raw.githubusercontent.com/ArnauInes/geometries_cat_bcn_2024/main/dts_municipis_cat_2025.json',
    CAT_CENSUS: 'https://raw.githubusercontent.com/ArnauInes/geometries_cat_bcn_2024/main/dts_seccions_censals_cat_2025.json',
    // NUTS regions (Eurostat GISCO, NUTS 2021, 20M, 4326)
    NUTS1_2021: 'https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_20M_2021_4326_LEVL_1.geojson',
    NUTS2_2021: 'https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_20M_2021_4326_LEVL_2.geojson',
    NUTS3_2021: 'https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_20M_2021_4326_LEVL_3.geojson',
    // Ireland administrative boundaries (GitHub sources used in Irish Alliance demo)
    IRELAND_COUNTIES: 'https://gist.githubusercontent.com/vool/969e3be0cfac519560755cce0b91e097/raw/ireland.geojson',
    IRELAND_MUNICIPAL_DISTRICTS: 'https://raw.githubusercontent.com/brendanjodowd/maps/main/lea_166.geojson'
};

// Population data for Catalan territories (ported from Edumapa)
// Full dataset ported from Edumapa.html lines 1059-2053
const POPULATION_DATA = {
    provinces: {
        'Barcelona': 5877672,
        'Girona': 821108,
        'Lleida': 451707,
        'Tarragona': 861744
    },
    counties: {
        'Alt Camp': 46388,
        'Alt Empordà': 148732,
        'Alt Penedès': 114189,
        'Alt Urgell': 21128,
        'Alta Ribagorça': 4040,
        'Anoia': 128432,
        'Aran': 10545,
        'Bages': 185352,
        'Baix Camp': 204458,
        'Baix Ebre': 82399,
        'Baix Empordà': 143443,
        'Baix Llobregat': 848827,
        'Baix Penedès': 118350,
        'Barcelonès': 2354301,
        'Berguedà': 41058,
        'Cerdanya': 20115,
        'Conca de Barberà': 20569,
        'Garraf': 161907,
        'Garrigues': 19075,
        'Garrotxa': 62449,
        'Gironès': 205573,
        'Lluçanès': 5718,
        'Maresme': 472572,
        'Moianès': 14758,
        'Montsià': 71460,
        'Noguera': 39727,
        'Osona': 164006,
        'Pallars Jussà': 13383,
        'Pallars Sobirà': 7332,
        'Pla d\'Urgell': 9420,
        'Pla de l\'Estany': 33447,
        'Priorat': 9420,
        'Ribera d\'Ebre': 22132,
        'Ripollès': 25826,
        'Segarra': 22667,
        'Segrià': 217853,
        'Selva': 185264,
        'Solsonès': 15323,
        'Tarragonès': 275122,
        'Terra Alta': 11446,
        'Urgell': 38531,
        'Vallès Occidental': 960033,
        'Vallès Oriental': 426653
    },
    municipalities: {
        'Àger': 1012,
        'Agramunt': 5629,
        'Aguilar de Segarra': 291,
        'Agullana': 909,
        'Aiguafreda': 2576,
        'Aiguamúrcia': 957,
        'Aiguaviva': 802,
        'Aitona': 2603,
        'Alàs i Cerc': 322,
        'Albanyà': 168,
        'Albatàrrec': 2251,
        'Albesa': 1584,
        'Albinyana': 2677,
        'Albons': 830,
        'Alcanar': 9943,
        'Alcanó': 239,
        'Alcarràs': 10018,
        'Alcoletge': 3594,
        'Alcover': 5348,
        'Aldover': 880,
        'Alella': 10217,
        'Alfara de Carles': 361,
        'Alfarràs': 2778,
        'Alfés': 281,
        'Alforja': 2019,
        'Algerri': 424,
        'Alguaire': 2986,
        'Alins': 275,
        'Alió': 504,
        'Almacelles': 6896,
        'Almatret': 305,
        'Almenar': 3338,
        'Almoster': 1338,
        'Alòs de Balaguer': 120,
        'Alp': 1728,
        'Alpens': 270,
        'Alpicat': 6387,
        'Alt Àneu': 455,
        'Altafulla': 5838,
        'Amer': 2415,
        'Amposta': 22637,
        'Anglès': 5969,
        'Anglesola': 1367,
        'Arbeca': 2081,
        'Arbolí': 129,
        'Arbúcies': 6574,
        'Arenys de Mar': 16642,
        'Arenys de Munt': 9458,
        'Argelaguer': 452,
        'Argençola': 237,
        'Argentona': 12844,
        'Arnes': 463,
        'Arres': 64,
        'Arsèguel': 78,
        'Artés': 6084,
        'Artesa de Lleida': 1539,
        'Artesa de Segre': 3485,
        'Ascó': 1608,
        'Aspa': 220,
        'Avià': 2243,
        'Avinyó': 2313,
        'Avinyonet de Puigventós': 1684,
        'Avinyonet del Penedès': 1744,
        'Badalona': 227083,
        'Badia del Vallès': 13118,
        'Bagà': 2182,
        'Baix Pallars': 340,
        'Balaguer': 17705,
        'Balenyà': 4036,
        'Balsareny': 3328,
        'Banyeres del Penedès': 3347,
        'Banyoles': 20599,
        'Barbens': 926,
        'Barberà de la Conca': 471,
        'Barberà del Vallès': 33575,
        'Barcelona': 1702547,
        'Bàscara': 1057,
        'Bassella': 210,
        'Batea': 1877,
        'Bausen': 60,
        'Begues': 7462,
        'Begur': 4245,
        'Belianes': 517,
        'Bellaguarda': 288,
        'Bellcaire d\'Empordà': 737,
        'Bellcaire d\'Urgell': 1228,
        'Bell-lloc d\'Urgell': 2359,
        'Bellmunt del Priorat': 298,
        'Bellmunt d\'Urgell': 182,
        'Bellprat': 69,
        'Bellpuig': 5276,
        'Bellvei': 2417,
        'Bellver de Cerdanya': 2260,
        'Bellvís': 2269,
        'Benavent de Segrià': 1578,
        'Benifallet': 718,
        'Benissanet': 1186,
        'Berga': 17160,
        'Besalú': 2583,
        'Bescanó': 5141,
        'Beuda': 204,
        'Bigues i Riells del Fai': 10036,
        'Biosca': 176,
        'Biure': 223,
        'Blancafort': 393,
        'Blanes': 42198,
        'Boadella i les Escaules': 260,
        'Bolvir': 497,
        'Bonastre': 760,
        'Bordils': 1804,
        'Borrassà': 773,
        'Borredà': 419,
        'Bossòst': 1141,
        'Bot': 554,
        'Botarell': 1174,
        'Bovera': 247,
        'Bràfim': 696,
        'Breda': 3930,
        'Brunyola i Sant Martí Sapresa': 395,
        'Cabanabona': 65,
        'Cabanelles': 281,
        'Cabanes': 978,
        'Cabassers': 302,
        'Cabó': 89,
        'Cabra del Camp': 1321,
        'Cabrera d\'Anoia': 1709,
        'Cabrera de Mar': 5018,
        'Cabrils': 7767,
        'Cadaqués': 2918,
        'Calaf': 3618,
        'Calafell': 31828,
        'Calders': 1114,
        'Caldes de Malavella': 8509,
        'Caldes de Montbui': 18336,
        'Caldes d\'Estrac': 3259,
        'Calella': 20369,
        'Calldetenes': 2690,
        'Callús': 2145,
        'Calonge de Segarra': 174,
        'Calonge i Sant Antoni': 12316,
        'Camarasa': 805,
        'Camarles': 3392,
        'Cambrils': 36849,
        'Camós': 711,
        'Campdevànol': 3262,
        'Campelles': 165,
        'Campins': 606,
        'Campllong': 544,
        'Campmany': 693,
        'Camprodon': 2527,
        'Canejan': 101,
        'Canet d\'Adri': 744,
        'Canet de Mar': 15140,
        'Canovelles': 17312,
        'Cànoves i Samalús': 17243,
        'Cantallops': 346,
        'Capafonts': 5367,
        'Capçanes': 92,
        'Capellades': 106,
        'Capolat': 5567,
        'Cardedeu': 428,
        'Cardona': 19064,
        'Carme': 4574,
        'Caseres': 814,
        'Cassà de la Selva': 1676,
        'Casserres': 240,
        'Castell d\'Aro, Platja d\'Aro i s\'Agaró': 10943,
        'Castell de l\'Areny': 170,
        'Castell de Mur': 12981,
        'Castellar de la Ribera': 69,
        'Castellar de n\'Hug': 144,
        'Castellar del Riu': 164,
        'Castellar del Vallès': 163,
        'Castellbell i el Vilar': 25322,
        'Castellbisbal': 4138,
        'Castellcir': 12972,
        'Castelldans': 784,
        'Castelldefels': 891,
        'Castellet i la Gornal': 69450,
        'Castellfollit de la Roca': 151,
        'Castellfollit de Riubregós': 2674,
        'Castellfollit del Boix': 957,
        'Castellgalí': 459,
        'Castellnou de Bages': 2347,
        'Castellnou de Seana': 1430,
        'Castelló de Farfanya': 12163,
        'Castelló d\'Empúries': 1716,
        'Castellolí': 723,
        'Castellserà': 658,
        'Castellterçol': 993,
        'Castellvell del Camp': 2773,
        'Castellví de la Marca': 2106,
        'Castellví de Rosanes': 2995,
        'Cava': 544,
        'Celrà': 39,
        'Centelles': 5561,
        'Cercs': 7775,
        'Cerdanyola del Vallès': 1193,
        'Cervelló': 58100,
        'Cervera': 9647,
        'Cervià de les Garrigues': 997,
        'Cervià de Ter': 9533,
        'Cistella': 641,
        'Ciutadilla': 294,
        'Clariana de Cardener': 194,
        'Colera': 161,
        'Coll de Nargó': 491,
        'Collbató': 587,
        'Colldejou': 4849,
        'Collsuspina': 160,
        'Colomers': 389,
        'Conca de Dalt': 205,
        'Conesa': 434,
        'Constantí': 113,
        'Copons': 6888,
        'Corbera de Llobregat': 1019,
        'Corbera d\'Ebre': 351,
        'Corbins': 15726,
        'Cornellà de Llobregat': 1502,
        'Cornellà del Terri': 91589,
        'Creixell': 2390,
        'Crespià': 1023,
        'Cruïlles, Monells i Sant Sadurní de l\'Heura': 1282,
        'Cubelles': 4190,
        'Cubells': 250,
        'Cunit': 1329,
        'Darnius': 343,
        'Das': 15804,
        'Deltebre': 3315,
        'Dosrius': 548,
        'Duesaigües': 270,
        'el Bruc': 1150,
        'El Bruc': 1150,
        'el Brull': 201,
        'el Catllar': 893,
        'el Cogul': 450,
        'el Far d\'Empordà': 424,
        'el Figaró-Montmany': 2400,
        'el Lloar': 175,
        'el Masnou': 1766,
        'El Masnou': 1766,
        'el Masroig': 1156,
        'el Milà': 2288,
        'el Molar': 293,
        'el Montmell': 5218,
        'el Morell': 161,
        'el Palau d\'Anglesola': 626,
        'el Papiol': 1188,
        'el Perelló': 101,
        'el Pinell de Brai': 24479,
        'el Pla de Santa Maria': 480,
        'el Pla del Penedès': 197,
        'el Poal': 307,
        'el Pont d\'Armentera': 1917,
        'el Pont de Bar': 3878,
        'el Pont de Suert': 2205,
        'El Pont de Suert': 2205,
        'el Pont de Vilomara i Rocafort': 4363,
        'el Port de la Selva': 2907,
        'El Port de la Selva': 2907,
        'el Prat de Llobregat': 979,
        'El Prat de Llobregat': 979,
        'el Rourell': 2389,
        'el Soleràs': 1352,
        'el Vendrell': 653,
        'El Vendrell': 653,
        'el Vilosell': 498,
        'els Alamús': 165,
        'els Garidells': 2380,
        'els Guiamets': 4140,
        'els Hostalets de Pierola': 1061,
        'els Omellons': 66184,
        'Els Omells de na Gaia': 403,
        'els Pallaresos': 310,
        'Els Plans de Sió': 40440,
        'els Prats de Rei': 194,
        'els Torms': 800,
        'Es Bòrdes': 11951,
        'Esparreguera': 6142,
        'Espinelves': 222,
        'Esplugues de Llobregat': 280,
        'Espolla': 22550,
        'Esponellà': 254,
        'Espot': 47613,
        'Estamariu': 412,
        'Estaràs': 438,
        'Esterri d\'Àneu': 379,
        'Esterri de Cardós': 132,
        'Falset': 162,
        'Farrera': 921,
        'Fígols': 40,
        'Fígols i Alinyà': 424,
        'Figueres': 63,
        'Figuerola del Camp': 2856,
        'Flaçà': 127,
        'Flix': 48875,
        'Fogars de la Selva': 1145,
        'Fogars de Montclús': 345,
        'Foixà': 3324,
        'Folgueroles': 502,
        'Fondarella': 1680,
        'Fonollosa': 292,
        'Fontanals de Cerdanya': 805,
        'Fontanilles': 1585,
        'Fontcoberta': 1446,
        'Font-rubí': 2263,
        'Foradada': 531,
        'Forès': 195,
        'Fornells de la Selva': 168,
        'Fortià': 1503,
        'Freginals': 2781,
        'Fulleda': 801,
        'Gaià': 91,
        'Gallifa': 41,
        'Gandesa': 243,
        'Garcia': 178,
        'Garrigàs': 543,
        'Garrigoles': 172,
        'Garriguella': 3166,
        'Gavà': 967,
        'Gavet de la Conca': 185,
        'Gelida': 472,
        'Ger': 259,
        'Gimenells i el Pla de la Font': 48007,
        'Ginestar': 8098,
        'Girona': 494,
        'Gironella': 1097,
        'Gisclareny': 794,
        'Godall': 107032,
        'Golmés': 5055,
        'Gombrèn': 30,
        'Gósol': 7635,
        'Granera': 612,
        'Granollers': 1916,
        'Granyanella': 196,
        'Granyena de les Garrigues': 64181,
        'Granyena de Segarra': 84,
        'Gratallops': 140,
        'Gualba': 145,
        'Gualta': 163,
        'Guardiola de Berguedà': 229,
        'Guils de Cerdanya': 1738,
        'Guimerà': 419,
        'Guissona': 953,
        'Guixers': 566,
        'Gurb': 246,
        'Horta de Sant Joan': 134,
        'Hostalric': 2712,
        'Igualada': 215,
        'Isona i Conca Dellà': 1157,
        'Isòvol': 4446,
        'Ivars de Noguera': 1046,
        'Ivars d\'Urgell': 41466,
        'Ivorra': 330,
        'Jafre': 1590,
        'Jorba': 318,
        'Josa i Tuixén': 100,
        'Juncosa': 387,
        'Juneda': 827,
        'la Baronia de Rialb': 129,
        'la Bisbal de Montsant': 10429,
        'la Bisbal del Penedès': 331,
        'la Bisbal d\'Empordà': 1070,
        'la Canonja': 3817,
        'la Cellera de Ter': 262,
        'la Coma i la Pedra': 2277,
        'la Fatarella': 401,
        'la Febró': 279993,
        'la Figuera': 231,
        'la Floresta': 11683,
        'la Fuliola': 208,
        'la Galera': 4168,
        'La Garriga': 5943,
        'La Granada': 2014,
        'La Granadella': 282,
        'La Granja d\'Escarp': 852,
        'La Guingueta d\'Àneu': 36,
        'La Jonquera': 122,
        'La Llacuna': 164,
        'La Llagosta': 1238,
        'La Masó': 708,
        'La Molsosa': 17305,
        'La Morera de Montsant': 2263,
        'La Nou de Berguedà': 758,
        'La Nou de Gaià': 943,
        'La Palma de Cervelló': 3408,
        'La Palma d\'Ebre': 285,
        'La Pera': 982,
        'La Pobla de Cérvoles': 288,
        'La Pobla de Claramunt': 13085,
        'La Pobla de Lillet': 103,
        'La Pobla de Mafumet': 138,
        'La Pobla de Massaluca': 163,
        'La Pobla de Montornès': 611,
        'La Pobla de Segur': 335,
        'La Portella': 3044,
        'La Quar': 450,
        'La Ràpita': 4115,
        'La Riba': 2353,
        'La Riera de Gaià': 205,
        'La Roca del Vallès': 1109,
        'La Secuita': 344,
        'La Selva de Mar': 3329,
        'La Selva del Camp': 3015,
        'La Sénia': 569,
        'La Sentiu de Sió': 735,
        'La Seu d\'Urgell': 42,
        'La Tallada d\'Empordà': 1807,
        'La Torre de Cabdella': 10962,
        'La Torre de Claramunt': 15683,
        'La Torre de Fontaubella': 1828,
        'La Torre de l\'Espanyol': 220,
        'La Vajol': 5819,
        'La Vall de Bianya': 12831,
        'La Vall de Boí': 5594,
        'La Vall d\'en Bas': 455,
        'La Vansa i Fórnols': 478,
        'l\'Albagés': 202,
        'l\'Albi': 258,
        'l\'Albiol': 3231,
        'l\'Aldea': 190,
        'l\'Aleixar': 121,
        'l\'Ametlla de Mar': 5006,
        'l\'Ametlla del Vallès': 512,
        'l\'Ampolla': 553,
        'l\'Arboç': 137,
        'l\'Argentera': 344,
        'l\'Armentera': 766,
        'Les': 122,
        'les Avellanes i Santa Linya': 785,
        'les Borges Blanques': 4122,
        'les Borges del Camp': 119,
        'les Cabanyes': 631,
        'les Franqueses del Vallès': 96,
        'les Llosses': 3219,
        'les Masies de Roda': 1350,
        'les Masies de Voltregà': 1116,
        'les Oluges': 188,
        'les Piles': 128,
        'les Planes d\'Hostoles': 207,
        'les Preses': 430,
        'les Valls d\'Aguilar': 6379,
        'les Valls de Valira': 2260,
        'l\'Escala': 537,
        'l\'Espluga Calba': 4471,
        'l\'Espluga de Francolí': 962,
        'l\'Espunyola': 7373,
        'L\'Esquirol': 9462,
        'l\'Estany': 3681,
        'l\'Hospitalet de Llobregat': 5758,
        'Linyola': 342,
        'Lladorre': 390,
        'Lladurs': 3473,
        'Llagostera': 1013,
        'Llambilles': 2749,
        'Llanars': 254,
        'Llançà': 185,
        'Lleida': 9508,
        'Llers': 730,
        'Lles de Cerdanya': 515,
        'Lliçà d\'Amunt': 336,
        'Lliçà de Vall': 829,
        'Llimiana': 4943,
        'Llinars del Vallès': 428,
        'Llívia': 10740,
        'Llobera': 144739,
        'Llorenç del Penedès': 1248,
        'Lloret de Mar': 285,
        'Lluçà': 131,
        'Maçanes': 297,
        'Maçanet de Cabrenys': 1149,
        'Maçanet de la Selva': 573,
        'Madremanya': 16253,
        'Maià de Montcal': 209,
        'Maials': 6861,
        'Maldà': 101,
        'Malgrat de Mar': 2431,
        'Malla': 42600,
        'Manlleu': 288,
        'Manresa': 1560,
        'Marçà': 19377,
        'Margalef': 289,
        'Marganell': 921,
        'Martorell': 491,
        'Martorelles': 236,
        'Mas de Barberans': 272,
        'Masarac i Vilarnadal': 21348,
        'Masdenverge': 80201,
        'Masllorenç': 106,
        'Maspujols': 308,
        'Massalcoreig': 28507,
        'Massoteres': 4987,
        'Matadepera': 598,
        'Mataró': 547,
        'Mediona': 889,
        'Menàrguens': 10038,
        'Meranges': 584,
        'Mieres': 216,
        'Miralcamp': 9815,
        'Miravet': 131798,
        'Moià': 843,
        'Molins de Rei': 772,
        'Mollerussa': 7962,
        'Mollet de Peralada': 2637,
        'Mollet del Vallès': 789,
        'Molló': 112,
        'Monistrol de Calders': 349,
        'Monistrol de Montserrat': 1390,
        'Montagut i Oix': 15544,
        'Montblanc': 215,
        'Montbrió del Camp': 52283,
        'Montcada i Reixac': 374,
        'Montclar': 761,
        'Montellà i Martinet': 3198,
        'Montesquiu': 184,
        'Montferrer i Castellbò': 1690,
        'Montferri': 14114,
        'Montgai': 1000,
        'Montgat': 7550,
        'Montmajor': 3128,
        'Montmaneu': 37153,
        'Montmeló': 132,
        'Montoliu de Lleida': 620,
        'Montoliu de Segarra': 1099,
        'Montornès de Segarra': 1164,
        'Montornès del Vallès': 473,
        'Mont-ral': 688,
        'Mont-ras': 6738,
        'Mont-roig del Camp': 26948,
        'Montseny': 637,
        'Móra d\'Ebre': 200,
        'Móra la Nova': 8906,
        'Muntanyola': 12625,
        'Mura': 472,
        'Nalec': 475,
        'Naut Aran': 180,
        'Navarcles': 88,
        'Navàs': 380,
        'Navata': 17089,
        'Navès': 712,
        'Nulles': 232,
        'Odèn': 5726,
        'Òdena': 20715,
        'Ogassa': 3314,
        'Olèrdola': 2093,
        'Olesa de Bonesvalls': 89,
        'Olesa de Montserrat': 1899,
        'Oliana': 6160,
        'Oliola': 1469,
        'Olius': 6185,
        'Olivella': 300,
        'Olost': 552,
        'Olot': 230,
        'Olvan': 218,
        'Ordis': 24677,
        'Organyà': 1839,
        'Orís': 4419,
        'Oristà': 196,
        'Orpí': 1003,
        'Òrrius': 199,
        'Os de Balaguer': 1216,
        'Osor': 38822,
        'Ossó de Sió': 913,
        'Pacs del Penedès': 3946,
        'Palafolls': 400,
        'Palafrugell': 811,
        'Palamós': 569,
        'Palau de Santa Eulàlia': 178,
        'Palau-sator': 350,
        'Palau-saverdera': 1075,
        'Palau-solità i Plegamans': 418,
        'Pallejà': 195,
        'Palol de Revardit': 935,
        'Pals': 9938,
        'Pardines': 24300,
        'Parets del Vallès': 18651,
        'Parlavà': 136,
        'Passanant i Belltall': 300,
        'Pau': 1503,
        'Paüls': 15456,
        'Pedret i Marzà': 11825,
        'Penelles': 465,
        'Perafita': 2556,
        'Perafort': 161,
        'Peralada': 18881,
        'Peramola': 427,
        'Piera': 162,
        'Pineda de Mar': 584,
        'Pinell de Solsonès': 544,
        'Pinós': 188,
        'Pira': 435,
        'Planoles': 438,
        'Poboleda': 1308,
        'Polinyà': 2047,
        'Pont de Molins': 357,
        'Pontils': 17555,
        'Pontons': 29455,
        'Pontós': 277,
        'Ponts': 203,
        'Porqueres': 498,
        'Porrera': 306,
        'Portbou': 334,
        'Pradell de la Teixeta': 8555,
        'Prades': 576,
        'Prat de Comte': 123,
        'Pratdip': 518,
        'Prats de Lluçanès': 2703,
        'Prats i Sansor': 290,
        'Preixana': 4804,
        'Preixens': 417,
        'Premià de Dalt': 1082,
        'Premià de Mar': 178,
        'Prullans': 665,
        'Puigcerdà': 759,
        'Puigdàlber': 2688,
        'Puiggròs': 249,
        'Puigpelat': 406,
        'Puig-reig': 185,
        'Puigverd d\'Agramunt': 392,
        'Puigverd de Lleida': 10594,
        'Pujalt': 28951,
        'Quart': 252,
        'Queralbs': 4489,
        'Querol': 10008,
        'Rabós': 629,
        'Rajadell': 258,
        'Rasquera': 1205,
        'Regencós': 240,
        'Rellinars': 1418,
        'Renau': 210,
        'Reus': 4099,
        'Rialb': 206,
        'Riba-roja d\'Ebre': 591,
        'Ribera d\'Ondara': 230,
        'Ribera d\'Urgellet': 594,
        'Ribes de Freser': 792,
        'Riells i Viabrea': 279,
        'Riner': 920,
        'Ripoll': 158,
        'Ripollet': 109930,
        'Riu de Cerdanya': 664,
        'Riudarenes': 1128,
        'Riudaura': 454,
        'Riudecanyes': 965,
        'Riudecols': 1847,
        'Riudellots de la Selva': 4499,
        'Riudoms': 262,
        'Riumors': 10692,
        'Rocafort de Queralt': 39462,
        'Roda de Berà': 99,
        'Roda de Ter': 2445,
        'Rodonyà': 529,
        'Roquetes': 1345,
        'Roses': 1232,
        'Rosselló': 2142,
        'Rubí': 262,
        'Rubió': 6905,
        'Rupià': 8048,
        'Rupit i Pruit': 246,
        'Sabadell': 6900,
        'Sagàs': 521,
        'Salàs de Pallars': 330,
        'Saldes': 8369,
        'Sales de Llierca': 20362,
        'Sallent': 3353,
        'Salomó': 237,
        'Salou': 81532,
        'Salt': 281,
        'Sanaüja': 222177,
        'Sant Adrià de Besòs': 153,
        'Sant Agustí de Lluçanès': 301,
        'Sant Andreu de la Barca': 525,
        'Sant Andreu de Llavaneres': 6927,
        'Sant Andreu Salou': 158,
        'Sant Aniol de Finestres': 30810,
        'Sant Antoni de Vilamajor': 33904,
        'Sant Bartomeu del Grau': 349,
        'Sant Boi de Llobregat': 379,
        'Sant Boi de Lluçanès': 38490,
        'Sant Cebrià de Vallalta': 108,
        'Sant Celoni': 172,
        'Sant Climent de Llobregat': 27062,
        'Sant Climent Sescebes': 11933,
        'Sant Cugat del Vallès': 6668,
        'Sant Cugat Sesgarrigues': 372,
        'Sant Esteve de la Sarga': 575,
        'Sant Esteve de Palautordera': 84831,
        'Sant Esteve Sesrovires': 943,
        'Sant Feliu de Buixalleu': 18761,
        'Sant Feliu de Codines': 675,
        'Sant Feliu de Guíxols': 4182,
        'Sant Feliu de Llobregat': 1031,
        'Sant Feliu de Pallerols': 98621,
        'Sant Feliu Sasserra': 3828,
        'Sant Ferriol': 8060,
        'Sant Fost de Campsentelles': 3080,
        'Sant Fruitós de Bages': 127,
        'Sant Gregori': 629,
        'Sant Guim de Freixenet': 878,
        'Sant Guim de la Plana': 6661,
        'Sant Hilari Sacalm': 23050,
        'Sant Hipòlit de Voltregà': 46554,
        'Sant Iscle de Vallalta': 1692,
        'Sant Jaume de Frontanyà': 9227,
        'Sant Jaume de Llierca': 9248,
        'Sant Jaume dels Domenys': 4243,
        'Sant Jaume d\'Enveja': 233,
        'Sant Joan de les Abadesses': 3687,
        'Sant Joan de Mollet': 193,
        'Sant Joan de Vilatorrada': 5982,
        'Sant Joan Despí': 1222,
        'Sant Joan les Fonts': 1458,
        'Sant Jordi Desvalls': 3667,
        'Sant Julià de Cerdanyola': 26,
        'Sant Julià de Ramis': 849,
        'Sant Julià de Vilatorta': 2803,
        'Sant Julià del Llor i Bonmatí': 35083,
        'Sant Just Desvern': 526,
        'Sant Llorenç de la Muga': 871,
        'Sant Llorenç de Morunys': 3111,
        'Sant Llorenç d\'Hortons': 3375,
        'Sant Llorenç Savall': 11017,
        'Sant Martí d\'Albars': 1373,
        'Sant Martí de Centelles': 20881,
        'Sant Martí de Llémena': 2586,
        'Sant Martí de Riucorb': 2617,
        'Sant Martí de Tous': 1003,
        'Sant Martí Sarroca': 232,
        'Sant Martí Sesgueioles': 3644,
        'Sant Martí Vell': 3297,
        'Sant Mateu de Bages': 258,
        'Sant Miquel de Campmajor': 3391,
        'Sant Miquel de Fluvià': 360,
        'Sant Mori': 264,
        'Sant Pau de Segúries': 140,
        'Sant Pere de Ribes': 673,
        'Sant Pere de Riudebitlles': 1275,
        'Sant Pere de Torelló': 637,
        'Sant Pere de Vilamajor': 254,
        'Sant Pere Pescador': 1259,
        'Sant Pere Sallavinera': 706,
        'Sant Pol de Mar': 839,
        'Sant Quintí de Mediona': 163,
        'Sant Quirze de Besora': 2241,
        'Sant Quirze del Vallès': 158,
        'Sant Quirze Safaja': 724,
        'Sant Ramon': 32121,
        'Sant Sadurní d\'Anoia': 2497,
        'Sant Sadurní d\'Osormort': 2592,
        'Sant Salvador de Guardiola': 4941,
        'Sant Vicenç de Castellet': 5834,
        'Sant Vicenç de Montalt': 2504,
        'Sant Vicenç de Torelló': 669,
        'Sant Vicenç dels Horts': 2127,
        'Santa Bàrbara': 20161,
        'Santa Cecília de Voltregà': 495,
        'Santa Coloma de Cervelló': 12915,
        'Santa Coloma de Farners': 84,
        'Santa Coloma de Gramenet': 3476,
        'Santa Coloma de Queralt': 10131,
        'Santa Cristina d\'Aro': 6712,
        'Santa Eugènia de Berga': 2092,
        'Santa Eulàlia de Riuprimer': 28568,
        'Santa Eulàlia de Ronçana': 3827,
        'Santa Fe del Penedès': 192,
        'Santa Llogaia d\'Àlguema': 8335,
        'Santa Margarida de Montbui': 13657,
        'Santa Margarida i els Monjos': 121203,
        'Santa Maria de Besora': 5866,
        'Santa Maria de Martorelles': 2308,
        'Santa Maria de Merlès': 1487,
        'Santa Maria de Miralles': 7911,
        'Santa Maria de Palautordera': 360,
        'Santa Maria d\'Oló': 2800,
        'Santa Oliva': 397,
        'Santa Pau': 10549,
        'Santa Perpètua de Mogoda': 7806,
        'Santa Susanna': 1077,
        'Santpedor': 164,
        'Sarral': 873,
        'Sarrià de Ter': 175,
        'Sarroca de Bellera': 137,
        'Sarroca de Lleida': 10008,
        'Saus, Camallera i Llampaies': 3672,
        'Savallà del Comtat': 1611,
        'Senan': 25960,
        'Senterada': 4023,
        'Sentmenat': 7716,
        'Serinyà': 1583,
        'Seròs': 115,
        'Serra de Daró': 5392,
        'Setcases': 381,
        'Seva': 898,
        'Sidamon': 50,
        'Sils': 46,
        'Sitges': 158,
        'Siurana': 9553,
        'Sobremunt': 1198,
        'Solivella': 229,
        'Solsona': 1902,
        'Sora': 191,
        'Soriguera': 3798,
        'Sort': 767,
        'Soses': 6720,
        'Subirats': 32405,
        'Sudanell': 180,
        'Sunyer': 101,
        'Súria': 9480,
        'Susqueda': 626,
        'Tagamanent': 219,
        'Talamanca': 444,
        'Talarn': 2213,
        'Talavera': 1881,
        'Taradell': 3281,
        'Tarragona': 897,
        'Tàrrega': 772,
        'Tarrés': 97,
        'Tarroja de Segarra': 313,
        'Tavèrnoles': 339,
        'Tavertet': 6090,
        'Teià': 212,
        'Térmens': 12521,
        'Terrades': 539,
        'Terrassa': 280,
        'Terrassola i Lavit': 6844,
        'Tiana': 141151,
        'Tírvia': 137,
        'Tiurana': 170,
        'Tivenys': 125,
        'Tivissa': 131,
        'Tona': 341,
        'Torà': 2657,
        'Tordera': 6818,
        'Torelló': 345,
        'Tornabous': 228708,
        'Torrebesses': 9305,
        'Torredembarra': 66,
        'Torrefarrera': 936,
        'Torrefeta i Florejacs': 1632,
        'Torregrossa': 8511,
        'Torrelameu': 18780,
        'Torrelles de Foix': 15093,
        'Torrelles de Llobregat': 851,
        'Torrent': 435,
        'Torres de Segre': 273,
        'Torre-serona': 1509,
        'Torroella de Fluvià': 17984,
        'Torroella de Montgrí': 4861,
        'Torroja del Priorat': 605,
        'Tortellà': 2194,
        'Tortosa': 766,
        'Toses': 6155,
        'Tossa de Mar': 173,
        'Tremp': 2318,
        'Ullà': 6274,
        'Ullastrell': 828,
        'Ullastret': 35265,
        'Ulldecona': 1207,
        'Ulldemolins': 191,
        'Ultramort': 6015,
        'Urús': 18542,
        'Vacarisses': 1347,
        'Vall de Cardós': 144,
        'Vallbona d\'Anoia': 260,
        'Vallbona de les Monges': 6551,
        'Vallcebre': 416,
        'Vallclara': 1219,
        'Vallfogona de Balaguer': 214,
        'Vallfogona de Ripollès': 207,
        'Vallfogona de Riucorb': 7563,
        'Vallgorguina': 375,
        'Vallirana': 906,
        'Vall-llobrega': 2176,
        'Vallmoll': 1406,
        'Vallromanes': 223,
        'Valls': 271,
        'Vandellòs i l\'Hospitalet de l\'Infant': 89,
        'Veciana': 2000,
        'Ventalló': 222,
        'Verdú': 97,
        'Verges': 3198,
        'Vespella de Gaià': 15985,
        'Vic': 1951,
        'Vidrà': 25047,
        'Vidreres': 2742,
        'Vielha e Mijaran': 7104,
        'Vilabella': 506,
        'Vilabertran': 49530,
        'Vilablareix': 8538,
        'Vilada': 169,
        'Viladamat': 5832,
        'Viladasens': 1374,
        'Viladecans': 811,
        'Viladecavalls': 753,
        'Vilademuls': 23826,
        'Viladrau': 723,
        'Vilafant': 984,
        'Vilafranca del Penedès': 3772,
        'Vilagrassa': 443,
        'Vilajuïga': 492,
        'Vilalba dels Arcs': 67348,
        'Vilalba Sasserra': 212,
        'Vilaller': 7802,
        'Vilallonga de Ter': 866,
        'Vilallonga del Camp': 1172,
        'Vilamacolum': 5706,
        'Vilamalla': 41504,
        'Vilamaniscle': 633,
        'Vilamòs': 1179,
        'Vilanant': 780,
        'Vilanova de Bellpuig': 506,
        'Vilanova de la Barca': 175,
        'Vilanova de l\'Aguda': 201,
        'Vilanova de Meià': 395,
        'Vilanova de Prades': 2451,
        'Vilanova de Sau': 376,
        'Vilanova de Segrià': 1220,
        'Vilanova del Camí': 402,
        'Vilanova del Vallès': 610,
        'Vilanova d\'Escornalbou': 608,
        'Vilanova i la Geltrú': 1168,
        'Vilaplana': 466,
        'Vila-rodona': 172,
        'Vila-sacra': 891,
        'Vila-sana': 886,
        'Vila-seca': 1187,
        'Vilassar de Dalt': 111,
        'Vilassar de Mar': 317,
        'Vilaür': 193,
        'Vilaverd': 1065,
        'Vilobí del Penedès': 12844,
        'Vilobí d\'Onyar': 1107,
        'Vilopriu': 5632,
        'Vimbodí i Poblet': 70418,
        'Vinaixa': 553,
        'Vinebre': 9281,
        'Vinyols i els Arcs': 21162,
        'Viver i Serrateix': 468,
        'Vulpellac, Fonteta i Peratallada': 170,
        'Xerta': 3315
    }
};

// GeoJSON cache - avoid duplicate fetches (Task 015)
const geojsonCache = {};

async function fetchGeoJSON(url, isTopoJSON = false) {
    if (geojsonCache[url]) return geojsonCache[url];
    
    cartagramaDebugLog('[BOUNDARIES] Fetching GeoJSON', { url, isTopoJSON });
    const response = await fetch(url);
    if (!response.ok) {
        console.error('[BOUNDARIES] HTTP error', { url, status: response.status, statusText: response.statusText });
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Convert TopoJSON to GeoJSON if needed (ported from Edumapa)
    if (isTopoJSON && data.objects) {
        const objectKey = Object.keys(data.objects || {})[0];
        if (!objectKey) {
            throw new Error('TopoJSON has no objects');
        }
        
        // Wait for topojsonFeature to be available
        let attempts = 0;
        while (!window.topojsonFeature && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!window.topojsonFeature) {
            throw new Error('TopoJSON converter not loaded');
        }
        
        const fc = window.topojsonFeature(data, data.objects[objectKey]);
        
        // Normalize property names based on layer type (ported from Edumapa)
        if (url.includes('comarques')) {
            // Comarques: normalize to 'name'
            fc.features = fc.features.map(f => {
                f.properties = f.properties || {};
                const name = f.properties.nom_comarca || f.properties.NOM_COMAR || f.properties.NOMCOMAR || f.properties.name;
                if (name) {
                    f.properties.name = name;
                    f.properties.COUNTY = name;
                }
                return f;
            });
        } else if (url.includes('municipis')) {
            // Municipalities: normalize to 'name'
            fc.features = fc.features.map(f => {
                f.properties = f.properties || {};
                const name = f.properties.nom_municipi || f.properties.NOM_MUNI || f.properties.NOM_MUNICIPI || f.properties.name;
                if (name) {
                    f.properties.name = name;
                    f.properties.LEA = name;
                }
                return f;
            });
        } else if (url.includes('seccions_censals')) {
            // Census sections: normalize to 'name'
            fc.features = fc.features.map(f => {
                f.properties = f.properties || {};
                const name = f.properties.nom_seccio || f.properties.NOM_SECCIO || f.properties.seccio || f.properties.SECCIO || f.properties.name || f.properties.id || f.id;
                if (name) {
                    f.properties.name = name;
                    f.properties.CENSUS = name;
                }
                return f;
            });
        }
        
        const featureCount = Array.isArray(fc.features) ? fc.features.length : 0;
        cartagramaDebugLog('[BOUNDARIES] Parsed TopoJSON -> GeoJSON', { url, isTopoJSON, features: featureCount });
        geojsonCache[url] = fc;
        return fc;
    }
    
    const featureCount = Array.isArray(data.features) ? data.features.length : 0;
    cartagramaDebugLog('[BOUNDARIES] Parsed GeoJSON', { url, isTopoJSON, features: featureCount });
    
    // Normalize property names for Spain-wide GeoJSON/API data
    if (data.features && Array.isArray(data.features)) {
        // IGN Municipalities API normalization
        if (url.includes('api-features.ign.es') && url.includes('administrativeunit')) {
            data.features = data.features.map(f => {
                f.properties = f.properties || {};
                const name = f.properties.nameunit || f.properties.name || f.properties.NAME;
                if (name) {
                    f.properties.name = name;
                    f.properties.LEA = name;
                }
                return f;
            });
            cartagramaDebugLog('[BOUNDARIES] Normalized IGN municipalities', { features: data.features.length });
        }
        
        // INE Census Sections normalization
        if (url.includes('ine.es/geoserver') && url.includes('Secciones')) {
            data.features = data.features.map(f => {
                f.properties = f.properties || {};
                const name = f.properties.CUSEC || f.properties.cusec || f.properties.id || f.id || 'Census Section';
                if (name) {
                    f.properties.name = name;
                    f.properties.CENSUS = name;
                }
                return f;
            });
            cartagramaDebugLog('[BOUNDARIES] Normalized INE census sections', { features: data.features.length });
        }
        
        // Highcharts Spain map (Autonomous Communities) normalization
        if (url.includes('highcharts') && url.includes('es-all')) {
            data.features = data.features.map(f => {
                f.properties = f.properties || {};
                const name = f.properties['hc-key'] || f.properties.name || f.properties.NAME;
                if (name) {
                    f.properties.name = name;
                    f.properties.COUNTY = name;
                }
                return f;
            });
            cartagramaDebugLog('[BOUNDARIES] Normalized Highcharts autonomous communities', { features: data.features.length });
        }
    }
    
    geojsonCache[url] = data;
    return data;
}

// Loading indicator functions (Task 015)
function showBoundaryLoading(layerName) {
    const indicator = document.getElementById('boundary-loading-indicator');
    if (indicator) {
        indicator.textContent = `Loading ${layerName}...`;
        indicator.style.display = 'block';
    }
}

function hideBoundaryLoading() {
    const indicator = document.getElementById('boundary-loading-indicator');
    if (indicator) indicator.style.display = 'none';
}

// Boundary layer state
let boundaryLayers = {
    worldCountries: null,
    spainCCAA: null,
    spainProvinces: null,
    spainComarques: null,
    spainMunicipalities: null,
    spainCensus: null,
    catProvinces: null,
    catComarques: null,
    catMunicipalities: null,
    catCensus: null,
    nuts1: null,
    nuts2: null,
    nuts3: null,
    irelandCounties: null,
    irelandMunicipalDistricts: null
};

let boundaryLayersVisible = {
    worldCountries: false,
    spainCCAA: false,
    spainProvinces: false,
    spainComarques: false,
    spainMunicipalities: false,
    spainCensus: false,
    catProvinces: false,
    catComarques: false,
    catMunicipalities: false,
    catCensus: false,
    nuts1: false,
    nuts2: false,
    nuts3: false,
    irelandCounties: false,
    irelandMunicipalDistricts: false
};

/* --- Cartagrama.html L12440-L13392: groups state + territory UI --- */
// Groups state
let territoryGroups = [];
let selectedTerritories = [];
let isGroupCreationActive = false;
let currentGroupColor = '#2196F3';
let nextGroupId = 1;
let groupColors = new Map(); // Map groupId -> color (ported from Edumapa)
let highlightedGroupIds = new Set(); // Set of highlighted group IDs (ported from Edumapa)

function setGroupCreationCursorActive(active) {
    const cursor = active ? 'crosshair' : '';
    var mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        mapContainer.style.cursor = cursor;
    }
    try {
        if (currentProvider === 'mapbox' && currentMap && currentMap.getCanvas) {
            currentMap.getCanvas().style.cursor = cursor;
        } else if (isLeafletProvider() && currentMap && currentMap.getContainer) {
            currentMap.getContainer().style.cursor = cursor;
        }
    } catch (e) { /* ignore */ }
}

// Territory selection state
let selectedTerritory = null;
// Territory selection state (ported from Edumapa for deselection)
let selectedWorldCountry = null;
let selectedProvince = null;
let selectedCounty = null;
let selectedLEA = null;
let selectedCensus = null;

// Feature mapping Maps (ported from Edumapa)
let worldCountriesMapFeatures = new Map(); // Map feature ID -> country name
let provinceMapFeatures = new Map(); // Map feature ID -> province name
let countyMapFeatures = new Map(); // Map feature ID -> comarca name
let leaMapFeatures = new Map(); // Map feature ID -> municipi name
let censusMapFeatures = new Map(); // Map feature ID -> census name

function setTerritoryPanelText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = text;
}

function dispatchPandoraTerritorySelected(detail) {
    try {
        document.dispatchEvent(new CustomEvent('pandora-territory-selected', { detail }));
    } catch (_) { /* ignore */ }
}

function dispatchPandoraTerritoryCleared() {
    try {
        document.dispatchEvent(new CustomEvent('pandora-territory-cleared'));
    } catch (_) { /* ignore */ }
}

function resetTerritoryInfo() {
    // Clear map highlight for currently selected territory (including cat, nuts, ireland, etc.)
    if (selectedTerritory && selectedTerritory.type) {
        clearTerritoryMapHighlight(selectedTerritory.type);
    }
    selectedTerritory = null;
    selectedWorldCountry = null;
    selectedProvince = null;
    selectedCounty = null;
    selectedLEA = null;
    selectedCensus = null;
    setTerritoryPanelText('territory-name', 'Select a territory on the map');
    setTerritoryPanelText('territory-type', '—');
    setTerritoryPanelText('territory-population', '—');
    setTerritoryPanelText('territory-region', '—');
    setTerritoryPanelText('territory-notes', '—');
    const applyBtn = document.getElementById('territory-apply-btn');
    if (applyBtn) applyBtn.disabled = true;
    resetTerritoryInfoSubtab();
    closeTerritoryInfoBox();
    dispatchPandoraTerritoryCleared();
    
    // Clear all territory highlights (ported from Edumapa)
    clearWorldCountriesMapHighlight();
    clearProvinceMapHighlight();
    clearCountyMapHighlight();
    clearLEAMapHighlight();
    clearCensusMapHighlight();
}


/* ═══════════════════════════════════════════════════════════════════════════
   § 7. TERRITORIES MODULE
   
   Handles territory boundaries (counties, municipalities), loading GeoJSON,
   territory info display, groups (Grouper), and Territory Info data.
   
   Key functions:
   - updateTerritoryInfo(): Display territory details
   - loadGroupsFromStorage(): Restore saved territory groups
   - setupGroupsButtons(): Wire up Grouper UI
   ═══════════════════════════════════════════════════════════════════════════ */

function updateTerritoryInfo({ name, type, population, region, notes }, clickEvent = null) {
    // Check if this territory is already selected (toggle behavior - ported from Edumapa)
    let isAlreadySelected = false;
    const simpleName = name;
    
    if ((type === 'worldCountries') && selectedWorldCountry === simpleName) {
        isAlreadySelected = true;
    } else if ((type === 'spainProvinces' || type === 'province') && selectedProvince === simpleName) {
        isAlreadySelected = true;
    } else if ((type === 'spainComarques' || type === 'county') && selectedCounty === simpleName) {
        isAlreadySelected = true;
    } else if ((type === 'spainMunicipalities' || type === 'lea') && selectedLEA === simpleName) {
        isAlreadySelected = true;
    } else if ((type === 'spainCensus' || type === 'census') && selectedCensus === simpleName) {
        isAlreadySelected = true;
    } else if (selectedTerritory && selectedTerritory.type === type && selectedTerritory.name === simpleName) {
        isAlreadySelected = true;
    }
    
    // If already selected, deselect it (ported from Edumapa)
    if (isAlreadySelected) {
        clearFeatureSelection(type);
        return;
    }
    
    // Clear ALL previous selections (Edumapa pattern - selecting new territory clears old ones)
    if (selectedTerritory && selectedTerritory.type) {
        clearFeatureSelection(selectedTerritory.type);
    }
    
    // Update global state (ported from Edumapa)
    if (type === 'worldCountries') {
        selectedWorldCountry = simpleName;
    } else if (type === 'spainProvinces' || type === 'province') {
        selectedProvince = simpleName;
    } else if (type === 'spainComarques' || type === 'county') {
        selectedCounty = simpleName;
    } else if (type === 'spainMunicipalities' || type === 'lea') {
        selectedLEA = simpleName;
    } else if (type === 'spainCensus' || type === 'census') {
        selectedCensus = simpleName;
    }
    
    selectedTerritory = { name, type };
    const applyBtn = document.getElementById('territory-apply-btn');
    if (applyBtn) applyBtn.disabled = false;
    setTerritoryPanelText('territory-name', name || '—');
    setTerritoryPanelText('territory-type', getTerritoryTypeDisplayName(type) || '—');
    
    // Get population data if not provided (ported from Edumapa)
    let displayPopulation = population;
    if (!displayPopulation || displayPopulation === '—') {
        const territoryTypeForPop = getTerritoryTypeForPopulation(type);
        const popData = getPopulationData(territoryTypeForPop, name);
        if (popData) {
            displayPopulation = formatPopulation(popData);
        }
    }
    let displayRegion = region || '—';
    let displayNotes = notes || '—';
    // Overlay user-saved wiki data if exists
    const saved = typeof loadTerritoryInfoFieldsData === 'function' ? loadTerritoryInfoFieldsData(type, name) : null;
    if (saved) {
        if (saved.name) setTerritoryPanelText('territory-name', saved.name);
        if (saved.population) displayPopulation = saved.population;
        if (saved.region) displayRegion = saved.region;
        if (saved.notes) displayNotes = saved.notes;
    }
    setTerritoryPanelText('territory-population', displayPopulation || '—');
    setTerritoryPanelText('territory-region', displayRegion || '—');
    setTerritoryPanelText('territory-notes', displayNotes || '—');
    updateTerritoryInfoSubtab(type, name);
    dispatchPandoraTerritorySelected({
        name,
        type,
        population: displayPopulation || '—',
        region: displayRegion || '—'
    });
    
    // Show floating info box near click - fix clickEvent handling
    let clickCoords = null;
    if (clickEvent) {
        if (clickEvent.point) {
            // Mapbox format
            clickCoords = { x: clickEvent.point.x, y: clickEvent.point.y };
        } else if (clickEvent.originalEvent) {
            // Leaflet format
    var mapContainer = document.getElementById('map-container');
            if (mapContainer) {
                const rect = mapContainer.getBoundingClientRect();
                clickCoords = {
                    x: clickEvent.originalEvent.clientX - rect.left,
                    y: clickEvent.originalEvent.clientY - rect.top
                };
            }
        } else if (clickEvent.clientX !== undefined) {
            // Standard mouse event
    var mapContainer = document.getElementById('map-container');
            if (mapContainer) {
                const rect = mapContainer.getBoundingClientRect();
                clickCoords = {
                    x: clickEvent.clientX - rect.left,
                    y: clickEvent.clientY - rect.top
                };
            }
        } else if (clickEvent.x !== undefined && clickEvent.y !== undefined) {
            // Precomputed container-relative coordinates (used by Google projection path)
            clickCoords = { x: clickEvent.x, y: clickEvent.y };
        }
    }
    showTerritoryInfoBox({ name, type, population: displayPopulation, region }, clickCoords);
    
    // On Mapbox, rebuild highlights from state so visible groups are preserved.
    if (currentProvider === 'mapbox') {
        refreshMapHighlights();
    } else {
        // Generic for all non-Mapbox providers.
        highlightTerritoryOnMap(type, name);
    }
}

function clearFeatureSelection(type) {
    // Clear selection for a specific territory type (ported from Edumapa)
    const normalizedType = normalizeBoundarySelectionType(type);
    
    if (normalizedType === 'worldCountries') {
        selectedWorldCountry = null;
        clearWorldCountriesMapHighlight();
    } else if (normalizedType === 'spainProvinces') {
        selectedProvince = null;
        clearProvinceMapHighlight();
    } else if (normalizedType === 'spainComarques') {
        selectedCounty = null;
        clearCountyMapHighlight();
    } else if (normalizedType === 'spainMunicipalities') {
        selectedLEA = null;
        clearLEAMapHighlight();
    } else if (normalizedType === 'spainCensus') {
        selectedCensus = null;
        clearCensusMapHighlight();
    } else {
        clearTerritoryMapHighlight(normalizedType);
    }
    
    // If this was the currently selected territory, clear UI
    if (selectedTerritory && selectedTerritory.type === normalizedType) {
        selectedTerritory = null;
        const applyBtn = document.getElementById('territory-apply-btn');
        if (applyBtn) applyBtn.disabled = true;
        setTerritoryPanelText('territory-name', 'Select a territory on the map');
        setTerritoryPanelText('territory-type', '—');
        setTerritoryPanelText('territory-population', '—');
        setTerritoryPanelText('territory-region', '—');
        setTerritoryPanelText('territory-notes', '—');
        resetTerritoryInfoSubtab();
        closeTerritoryInfoBox();
        dispatchPandoraTerritoryCleared();
    }
    if (currentProvider === 'mapbox') {
        refreshMapHighlights();
    }
}

// Population data functions (ported from Edumapa)
function getTerritoryTypeForPopulation(type) {
    // Map layer names to population data keys
    if (type === 'spainProvinces') return 'provinces';
    if (type === 'spainComarques') return 'counties';
    if (type === 'spainMunicipalities') return 'municipalities';
    if (type === 'spainCensus') return 'census';
    // Fallback for old type names
    if (type === 'province') return 'provinces';
    if (type === 'county') return 'counties';
    if (type === 'lea') return 'municipalities';
    return type;
}

function getPopulationData(territoryType, territoryName) {
    if (!POPULATION_DATA || !POPULATION_DATA[territoryType]) return null;
    const population = POPULATION_DATA[territoryType][territoryName];
    if (territoryType === 'municipalities' && !population) {
        console.warn(`Population data not found for municipality: "${territoryName}"`);
    }
    return population || null;
}

function formatPopulation(population) {
    if (!population) return null;
    return population.toLocaleString();
}

function getTerritoryTypeDisplayName(type) {
    // Map territory types to display names (ported from Edumapa)
    switch (type) {
        case 'county':
        case 'spainComarques':
        case 'catComarques': return 'Comarca';
        case 'lea':
        case 'spainMunicipalities':
        case 'catMunicipalities': return 'Municipi';
        case 'province':
        case 'spainProvinces':
        case 'catProvinces': return 'Província';
        case 'census':
        case 'spainCensus':
        case 'catCensus': return 'Secció Censal';
        default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
}

// Territory Info Box functions (ported from Edumapa)
// Ensure info box exists (like Edumapa's ensureCountyInfoBoxExists pattern)
function ensureTerritoryInfoBoxExists() {
    let infoBox = document.getElementById('territory-info-box');
    
    if (!infoBox) {
    var mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            infoBox = document.createElement('div');
            infoBox.id = 'territory-info-box';
            infoBox.className = 'territory-info-box';
            infoBox.innerHTML = `
                <button type="button" class="close-btn" aria-label="Close">×</button>
                <h4 id="territory-info-box-name">Territory Name</h4>
                <p id="territory-info-box-type" class="territory-info-box-meta"></p>
                <p id="territory-info-box-population" class="territory-info-box-meta"></p>
                <p id="territory-info-box-region" class="territory-info-box-meta"></p>
                <div class="territory-info-box-actions">
                    <button type="button" id="territory-info-box-info-btn" class="territory-info-box-info-btn">Info</button>
                </div>
            `;
            mapContainer.appendChild(infoBox);
        }
    }
    wireTerritoryInfoBoxControls();
    return infoBox;
}

function wireTerritoryInfoBoxControls() {
    const infoBox = document.getElementById('territory-info-box');
    if (!infoBox) return;
    const closeBtn = infoBox.querySelector('.close-btn');
    if (closeBtn && !closeBtn.dataset.cartagramaCloseWired) {
        closeBtn.dataset.cartagramaCloseWired = '1';
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof window.closeTerritoryInfoBox === 'function') {
                window.closeTerritoryInfoBox();
            }
        });
    }
}

function showTerritoryInfoBox(info, clickCoords) {
    // Always ensure box exists first (Edumapa pattern)
    const infoBox = ensureTerritoryInfoBoxExists();
    if (!infoBox) {
        console.error('Could not create territory info box');
        return;
    }
    
    // Get child elements safely (they should exist if ensureTerritoryInfoBoxExists worked)
    const nameEl = infoBox.querySelector('#territory-info-box-name') || document.getElementById('territory-info-box-name');
    const typeEl = infoBox.querySelector('#territory-info-box-type') || document.getElementById('territory-info-box-type');
    const popEl = infoBox.querySelector('#territory-info-box-population') || document.getElementById('territory-info-box-population');
    const regionEl = infoBox.querySelector('#territory-info-box-region') || document.getElementById('territory-info-box-region');
    
    if (!nameEl || !typeEl || !popEl || !regionEl) {
        console.error('Territory info box child elements not found:', { nameEl: !!nameEl, typeEl: !!typeEl, popEl: !!popEl, regionEl: !!regionEl });
        // Recreate the box if child elements are missing
    var mapContainer = document.getElementById('map-container');
        if (mapContainer && infoBox.parentNode) {
            infoBox.remove();
            ensureTerritoryInfoBoxExists();
            return showTerritoryInfoBox(info, clickCoords); // Retry
        }
        return;
    }
    
    nameEl.textContent = info.name || 'Unknown';
    const typeLabel = getTerritoryTypeDisplayName(info.type) || info.type || '';
    if (typeEl) {
        typeEl.textContent = typeLabel ? `Type: ${typeLabel}` : '';
        typeEl.style.display = typeLabel ? '' : 'none';
    }
    if (popEl) {
        popEl.textContent = info.population && info.population !== '—' ? `Population: ${info.population}` : '';
        popEl.style.display = popEl.textContent ? '' : 'none';
    }
    if (regionEl) {
        regionEl.textContent = info.region && info.region !== '—' ? `Region: ${info.region}` : '';
        regionEl.style.display = regionEl.textContent ? '' : 'none';
    }
    
    // Position near click or center (ported from Edumapa)
    var mapContainer = document.getElementById('map-container');
    if (clickCoords && mapContainer) {
        const containerRect = mapContainer.getBoundingClientRect();
        // Handle both {x, y} and {clientX, clientY} formats
        const x = clickCoords.x !== undefined ? clickCoords.x : (clickCoords.clientX !== undefined ? clickCoords.clientX - containerRect.left : null);
        const y = clickCoords.y !== undefined ? clickCoords.y : (clickCoords.clientY !== undefined ? clickCoords.clientY - containerRect.top : null);
        
        
        if (x === null || y === null) {
            // Fallback to center positioning
            infoBox.style.left = '50%';
            infoBox.style.top = '20px';
            infoBox.style.transform = 'translateX(-50%)';
            infoBox.style.zIndex = '10000';
            infoBox.classList.add('show');
            return;
        }
        
        const boxWidth = 250;
        const boxHeight = 120;
        
        let left = x;
        let top = y - boxHeight - 10; // Position above click point
        
        // Adjust if box would go outside map bounds
        if (left + boxWidth > containerRect.width) {
            left = containerRect.width - boxWidth - 10;
        }
        if (left < 10) left = 10;
        if (top < 10) top = y + 10; // Position below click point if too high
        
        infoBox.style.left = left + 'px';
        infoBox.style.top = top + 'px';
        infoBox.style.transform = 'none';
        infoBox.style.zIndex = '10000';
    } else {
        // Fallback to center positioning
        if (mapContainer) {
            const containerRect = mapContainer.getBoundingClientRect();
            infoBox.style.left = (containerRect.width / 2 - 125) + 'px'; // Center minus half box width
            infoBox.style.top = '20px';
            infoBox.style.transform = 'none';
        } else {
            infoBox.style.left = '50%';
            infoBox.style.top = '20px';
            infoBox.style.transform = 'translateX(-50%)';
        }
        infoBox.style.zIndex = '10000';
    }
    
    // Force show the box
    infoBox.classList.add('show');
    infoBox.style.display = 'block'; // Force display as backup
    
}

function hideTerritoryInfoBox() {
    const infoBox = document.getElementById('territory-info-box');
    if (infoBox) {
        infoBox.classList.remove('show');
        infoBox.style.display = 'none';
    }
}

function closeTerritoryInfoBox() {
    hideTerritoryInfoBox();
}

// Close button on the map popup: hide bubble and clear territory selection.
window.closeTerritoryInfoBox = function() {
    hideTerritoryInfoBox();
    if (selectedTerritory && selectedTerritory.type) {
        clearFeatureSelection(selectedTerritory.type);
    } else {
        resetTerritoryInfo();
    }
};

window.hideTerritoryInfoBox = hideTerritoryInfoBox;

// Ensure info box exists on page load (Edumapa pattern)
document.addEventListener('DOMContentLoaded', () => {
    ensureTerritoryInfoBoxExists();
});

// Also ensure it exists immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ensureTerritoryInfoBoxExists();
    });
} else {
    ensureTerritoryInfoBoxExists();
}

// Territory highlighting functions (ported from Edumapa)
function highlightProvinceOnMap(provinceName) {
    if (currentProvider === 'google' && boundaryLayers.spainProvinces) {
        boundaryLayers.spainProvinces.forEach(polygon => {
            const n = polygon.get('provinceName');
            if (n === provinceName) {
                polygon.setOptions({ fillOpacity: 0.2, strokeWeight: 3, strokeColor: '#FF6B35' });
            }
        });
    } else if (currentProvider === 'mapbox' && currentMap) {
        if (currentMap.getLayer('spainProvinces-fill')) {
            const nameMatch = ['any',
                ['==', ['get', 'NAME_1'], provinceName],
                ['==', ['get', 'name'], provinceName],
                ['==', ['get', 'NAME'], provinceName]
            ];
            currentMap.setPaintProperty('spainProvinces-fill', 'fill-color', ['case', nameMatch, '#FF6B35', '#FF6B35']);
            currentMap.setPaintProperty('spainProvinces-fill', 'fill-opacity', ['case', nameMatch, 0.35, 0.02]);
        }
        if (currentMap.getLayer('spainProvinces-line')) {
            const nameMatch = ['any', ['==', ['get', 'NAME_1'], provinceName], ['==', ['get', 'name'], provinceName], ['==', ['get', 'NAME'], provinceName]];
            currentMap.setPaintProperty('spainProvinces-line', 'line-width', ['case', nameMatch, 3.5, 1.5]);
        }
    } else if (isLeafletProvider() && boundaryLayers.spainProvinces) {
        try {
            boundaryLayers.spainProvinces.eachLayer(layer => {
                try {
                    const props = layer.feature?.properties;
                    const name = props?.name || props?.NAME_1 || props?.NAME || '';
                    if (name === provinceName && layer.setStyle) {
                        layer.setStyle({ fillOpacity: 0.3, weight: 3, color: '#FF6B35' });
                    }
                } catch (e) { /* skip feature */ }
            });
        } catch (e) { console.warn('highlightProvinceOnMap OSM error', e); }
    }
}

function clearProvinceMapHighlight() {
    if (currentProvider === 'google' && boundaryLayers.spainProvinces) {
        boundaryLayers.spainProvinces.forEach(polygon => {
            polygon.setOptions({ fillOpacity: 0.02, strokeWeight: 3, strokeColor: '#FF6B35' });
        });
    } else if (currentProvider === 'mapbox' && currentMap && currentMap.getStyle && currentMap.getLayer) {
        if (currentMap.getLayer('spainProvinces-fill')) {
            currentMap.setPaintProperty('spainProvinces-fill', 'fill-color', '#FF6B35');
            currentMap.setPaintProperty('spainProvinces-fill', 'fill-opacity', 0.02);
        }
        if (currentMap.getLayer('spainProvinces-line')) {
            currentMap.setPaintProperty('spainProvinces-line', 'line-width', 1.5);
        }
    } else if (isLeafletProvider() && boundaryLayers.spainProvinces) {
        try {
            boundaryLayers.spainProvinces.eachLayer(layer => {
                try { if (layer.setStyle) layer.setStyle({ fillOpacity: 0.02, weight: 2, color: '#FF6B35' }); } catch (e) {}
            });
        } catch (e) { console.warn('clearProvinceMapHighlight OSM error', e); }
    }
}

function highlightCountyOnMap(countyName) {
    if (currentProvider === 'google' && boundaryLayers.spainComarques) {
        const polygon = boundaryLayers.spainComarques.find(p => p.get('countyName') === countyName);
        if (polygon) {
                    polygon.setOptions({ fillOpacity: 0.2, strokeWeight: 3, strokeColor: '#4A90E2' });
        }
    } else if (currentProvider === 'mapbox' && currentMap) {
        if (currentMap.getLayer('spainComarques-fill')) {
            const nameMatch = ['any',
                ['==', ['get', 'NOMCOMAR'], countyName],
                ['==', ['get', 'NOM_COMAR'], countyName],
                ['==', ['get', 'nom_comar'], countyName],
                ['==', ['get', 'name'], countyName],
                ['==', ['get', 'NAME'], countyName]
            ];
            currentMap.setPaintProperty('spainComarques-fill', 'fill-color', ['case', nameMatch, '#4A90E2', '#4A90E2']);
            currentMap.setPaintProperty('spainComarques-fill', 'fill-opacity', ['case', nameMatch, 0.35, 0.02]);
        }
        if (currentMap.getLayer('spainComarques-line')) {
            const nameMatch = ['any', ['==', ['get', 'NOMCOMAR'], countyName], ['==', ['get', 'NOM_COMAR'], countyName], ['==', ['get', 'nom_comar'], countyName], ['==', ['get', 'name'], countyName]];
            currentMap.setPaintProperty('spainComarques-line', 'line-width', ['case', nameMatch, 3.5, 1.5]);
        }
    } else if (isLeafletProvider() && boundaryLayers.spainComarques) {
        try {
            boundaryLayers.spainComarques.eachLayer(layer => {
                try {
                    const props = layer.feature?.properties;
                    const name = props?.NOMCOMAR || props?.NOM_COMAR || props?.name || props?.NAME_1 || '';
                    if (name === countyName && layer.setStyle) {
                        layer.setStyle({ fillOpacity: 0.3, weight: 3, color: '#4A90E2' });
                    }
                } catch (e) { /* skip feature */ }
            });
        } catch (e) { console.warn('highlightCountyOnMap OSM error', e); }
    }
}

function clearCountyMapHighlight() {
    if (currentProvider === 'google' && boundaryLayers.spainComarques) {
        boundaryLayers.spainComarques.forEach(polygon => {
            polygon.setOptions({ fillOpacity: 0.02, strokeWeight: 2, strokeColor: '#3498db' });
        });
    } else if (currentProvider === 'mapbox' && currentMap && currentMap.getStyle && currentMap.getLayer) {
        if (currentMap.getLayer('spainComarques-fill')) {
            currentMap.setPaintProperty('spainComarques-fill', 'fill-color', '#4A90E2');
            currentMap.setPaintProperty('spainComarques-fill', 'fill-opacity', 0.02);
        }
        if (currentMap.getLayer('spainComarques-line')) {
            currentMap.setPaintProperty('spainComarques-line', 'line-width', 1.5);
        }
    } else if (isLeafletProvider() && boundaryLayers.spainComarques) {
        try {
            boundaryLayers.spainComarques.eachLayer(layer => {
                try { if (layer.setStyle) layer.setStyle({ fillOpacity: 0.02, weight: 2, color: '#3498db' }); } catch (e) {}
            });
        } catch (e) { console.warn('clearCountyMapHighlight OSM error', e); }
    }
}

function highlightLEAOnMap(leaName) {
    if (currentProvider === 'google' && boundaryLayers.spainMunicipalities) {
        const polygon = boundaryLayers.spainMunicipalities.find(p => p.get('leaName') === leaName);
        if (polygon) {
            polygon.setOptions({ fillOpacity: 0.2, strokeWeight: 3, strokeColor: '#2ecc71' });
        }
    } else if (currentProvider === 'mapbox' && currentMap) {
        if (currentMap.getLayer('spainMunicipalities-fill')) {
            const nameMatch = ['any',
                ['==', ['get', 'nom_municipi'], leaName],
                ['==', ['get', 'NAME_1'], leaName],
                ['==', ['get', 'name'], leaName],
                ['==', ['get', 'NOM'], leaName]
            ];
            currentMap.setPaintProperty('spainMunicipalities-fill', 'fill-color', ['case', nameMatch, '#2ecc71', '#2ecc71']);
            currentMap.setPaintProperty('spainMunicipalities-fill', 'fill-opacity', ['case', nameMatch, 0.35, 0.02]);
        }
        if (currentMap.getLayer('spainMunicipalities-line')) {
            const nameMatch = ['any', ['==', ['get', 'nom_municipi'], leaName], ['==', ['get', 'NAME_1'], leaName], ['==', ['get', 'name'], leaName]];
            currentMap.setPaintProperty('spainMunicipalities-line', 'line-width', ['case', nameMatch, 3, 1]);
        }
    } else if (isLeafletProvider() && boundaryLayers.spainMunicipalities) {
        try {
            boundaryLayers.spainMunicipalities.eachLayer(layer => {
                try {
                    const props = layer.feature?.properties;
                    const name = props?.nom_municipi || props?.NAME_1 || props?.name || '';
                    if (name === leaName && layer.setStyle) {
                        layer.setStyle({ fillOpacity: 0.3, weight: 3, color: '#2ecc71' });
                    }
                } catch (e) { /* skip feature */ }
            });
        } catch (e) { console.warn('highlightLEAOnMap OSM error', e); }
    }
}

function clearLEAMapHighlight() {
    if (currentProvider === 'google' && boundaryLayers.spainMunicipalities) {
        boundaryLayers.spainMunicipalities.forEach(polygon => {
            polygon.setOptions({ fillOpacity: 0.02, strokeWeight: 1, strokeColor: '#2ecc71' });
        });
    } else if (currentProvider === 'mapbox' && currentMap && currentMap.getStyle && currentMap.getLayer) {
        if (currentMap.getLayer('spainMunicipalities-fill')) {
            currentMap.setPaintProperty('spainMunicipalities-fill', 'fill-color', '#2ecc71');
            currentMap.setPaintProperty('spainMunicipalities-fill', 'fill-opacity', 0.02);
        }
        if (currentMap.getLayer('spainMunicipalities-line')) {
            currentMap.setPaintProperty('spainMunicipalities-line', 'line-width', 1);
        }
    } else if (isLeafletProvider() && boundaryLayers.spainMunicipalities) {
        try {
            boundaryLayers.spainMunicipalities.eachLayer(layer => {
                try { if (layer.setStyle) layer.setStyle({ fillOpacity: 0.02, weight: 1, color: '#2ecc71' }); } catch (e) {}
            });
        } catch (e) { console.warn('clearLEAMapHighlight OSM error', e); }
    }
}

function highlightCensusOnMap(censusName) {
    if (currentProvider === 'google' && boundaryLayers.spainCensus) {
        const polygon = boundaryLayers.spainCensus.find(p => p.get('censusName') === censusName);
        if (polygon) {
            polygon.setOptions({ fillOpacity: 0.15, strokeWeight: 2, strokeColor: '#9b59b6' });
        }
    } else if (currentProvider === 'mapbox' && currentMap) {
        const parts = censusName.split(' - Secció ');
        const mun = parts[0] || '';
        const sec = (parts[1] || censusName).trim();
        if (currentMap.getLayer('spainCensus-fill')) {
            const nameMatch = ['all',
                ['==', ['get', 'nom_municipi'], mun],
                ['==', ['to-string', ['get', 'codi_seccio_censal']], sec]
            ];
            currentMap.setPaintProperty('spainCensus-fill', 'fill-color', ['case', nameMatch, '#9b59b6', '#9b59b6']);
            currentMap.setPaintProperty('spainCensus-fill', 'fill-opacity', ['case', nameMatch, 0.35, 0.02]);
        }
        if (currentMap.getLayer('spainCensus-line')) {
            const nameMatch = ['all', ['==', ['get', 'nom_municipi'], mun], ['==', ['to-string', ['get', 'codi_seccio_censal']], sec]];
            currentMap.setPaintProperty('spainCensus-line', 'line-width', ['case', nameMatch, 2.5, 0.5]);
        }
    } else if (isLeafletProvider() && boundaryLayers.spainCensus) {
        try {
            boundaryLayers.spainCensus.eachLayer(layer => {
                try {
                    const props = layer.feature?.properties;
                    const mun = props?.nom_municipi;
                    const sec = props?.codi_seccio_censal;
                    const name = (mun && sec) ? (mun + ' - Secció ' + sec) : (props?.name || '');
                    if (name === censusName && layer.setStyle) {
                        layer.setStyle({ fillOpacity: 0.3, weight: 2, color: '#9b59b6' });
                    }
                } catch (e) { /* skip feature */ }
            });
        } catch (e) { console.warn('highlightCensusOnMap OSM error', e); }
    }
}

function clearCensusMapHighlight() {
    if (currentProvider === 'google' && boundaryLayers.spainCensus) {
        boundaryLayers.spainCensus.forEach(polygon => {
            polygon.setOptions({ fillOpacity: 0.02, strokeWeight: 0.5, strokeColor: '#9b59b6' });
        });
    } else if (currentProvider === 'mapbox' && currentMap && currentMap.getStyle && currentMap.getLayer) {
        if (currentMap.getLayer('spainCensus-fill')) {
            currentMap.setPaintProperty('spainCensus-fill', 'fill-color', '#9b59b6');
            currentMap.setPaintProperty('spainCensus-fill', 'fill-opacity', 0.02);
        }
        if (currentMap.getLayer('spainCensus-line')) {
            currentMap.setPaintProperty('spainCensus-line', 'line-width', 0.5);
        }
    } else if (isLeafletProvider() && boundaryLayers.spainCensus) {
        try {
            boundaryLayers.spainCensus.eachLayer(layer => {
                try { if (layer.setStyle) layer.setStyle({ fillOpacity: 0.02, weight: 0.5, color: '#9b59b6' }); } catch (e) {}
            });
        } catch (e) { console.warn('clearCensusMapHighlight OSM error', e); }
    }
}

function highlightWorldCountriesOnMap(countryName) {
    if (currentProvider === 'google' && boundaryLayers.worldCountries) {
        const polygon = boundaryLayers.worldCountries.find(p => {
            const name = p.get('countryName') || p.get('name') || p.get('NAME') || p.get('NAME_1') || '';
            return name === countryName;
        });
        if (polygon) {
            polygon.setOptions({ fillOpacity: 0.3, strokeWeight: 4, strokeColor: '#4A90E2', fillColor: '#4A90E2' });
        }
    } else if (currentProvider === 'mapbox' && currentMap) {
        if (currentMap.getLayer('worldCountries-fill')) {
            const nameMatch = ['any',
                ['==', ['get', 'name'], countryName],
                ['==', ['get', 'NAME'], countryName],
                ['==', ['get', 'NAME_1'], countryName],
                ['==', ['get', 'ADMIN'], countryName],
                ['==', ['get', 'NAME_LONG'], countryName]
            ];
            currentMap.setPaintProperty('worldCountries-fill', 'fill-color', ['case', nameMatch, '#4A90E2', '#4A90E2']);
            currentMap.setPaintProperty('worldCountries-fill', 'fill-opacity', ['case', nameMatch, 0.35, 0.02]);
        }
        if (currentMap.getLayer('worldCountries-line')) {
            const nameMatch = ['any', ['==', ['get', 'name'], countryName], ['==', ['get', 'NAME'], countryName], ['==', ['get', 'ADMIN'], countryName]];
            currentMap.setPaintProperty('worldCountries-line', 'line-width', ['case', nameMatch, 3.5, 2]);
        }
    } else if (isLeafletProvider() && boundaryLayers.worldCountries) {
        try {
            boundaryLayers.worldCountries.eachLayer(layer => {
                try {
                    const props = layer.feature?.properties || {};
                    const name = props.name || props.NAME || props.NAME_1 || props.ADMIN || props.NAME_LONG || props.NAME_EN || '';
                    if (name === countryName && layer.setStyle) {
                        layer.setStyle({ fillOpacity: 0.3, weight: 4, color: '#4A90E2', fillColor: '#4A90E2' });
                    }
                } catch (e) { /* skip feature */ }
            });
        } catch (e) { console.warn('highlightWorldCountriesOnMap OSM error', e); }
    }
}

function clearWorldCountriesMapHighlight() {
    if (currentProvider === 'google' && boundaryLayers.worldCountries) {
        boundaryLayers.worldCountries.forEach(polygon => {
            polygon.setOptions({ fillOpacity: 0.02, strokeWeight: 2, strokeColor: '#4A90E2', fillColor: '#4A90E2' });
        });
    } else if (currentProvider === 'mapbox' && currentMap && currentMap.getStyle && currentMap.getLayer) {
        if (currentMap.getLayer('worldCountries-fill')) {
            currentMap.setPaintProperty('worldCountries-fill', 'fill-color', '#4A90E2');
            currentMap.setPaintProperty('worldCountries-fill', 'fill-opacity', 0.02);
        }
        if (currentMap.getLayer('worldCountries-line')) {
            currentMap.setPaintProperty('worldCountries-line', 'line-width', 2);
        }
    } else if (isLeafletProvider() && boundaryLayers.worldCountries) {
        try {
            boundaryLayers.worldCountries.eachLayer(layer => {
                try { if (layer.setStyle) layer.setStyle({ fillOpacity: 0.02, weight: 2, color: '#4A90E2', fillColor: '#4A90E2' }); } catch (e) {}
            });
        } catch (e) { console.warn('clearWorldCountriesMapHighlight OSM error', e); }
    }
}

// Generic territory highlight - works for all layer types (spain, cat, nuts, ireland, etc.)
function highlightTerritoryOnMap(type, name) {
    if (!type || !name) return;
    // Clear previous selection of same type first
    clearTerritoryMapHighlight(type);
    const color = getDefaultBoundaryColorForLayerId ? getDefaultBoundaryColorForLayerId(type + '-fill') : '#4A90E2';
    const highlightColor = color || '#4A90E2';
    const highlightOpacity = 0.22;
    const highlightWeight = 2.5;
    if (isLeafletProvider() && boundaryLayers) {
        const layer = boundaryLayers[type];
        if (!layer || typeof layer.eachLayer !== 'function') return;
        try {
            const checks = getPropertyChecksForTerritory ? getPropertyChecksForTerritory(type, name) : [];
            const layerDefaultColor = (typeof getDefaultBoundaryColorForLayerId === 'function' && getDefaultBoundaryColorForLayerId(type + '-fill')) || highlightColor;
            const resetStyle = { fillOpacity: 0.02, weight: 2, color: layerDefaultColor, fillColor: layerDefaultColor };
            layer.eachLayer(layerItem => {
                try {
                    if (!layerItem || typeof layerItem.setStyle !== 'function') return;
                    const props = layerItem.feature && layerItem.feature.properties ? layerItem.feature.properties : {};
                    const itemName = getBoundaryDisplayName(type, props, {
                        featureId: layerItem.feature?.id
                    });
                    if (itemName === name) {
                        layerItem.setStyle({ fillOpacity: highlightOpacity, weight: highlightWeight, color: highlightColor, fillColor: highlightColor });
                        if (typeof layerItem.bringToFront === 'function') layerItem.bringToFront();
                    } else {
                        layerItem.setStyle(resetStyle);
                    }
                } catch (e) { /* skip feature */ }
            });
        } catch (e) { console.warn('highlightTerritoryOnMap OSM error', e); }
    } else if (currentProvider === 'mapbox' && currentMap) {
        const fillId = type + '-fill';
        const lineId = type + '-line';
        if (!currentMap.getLayer(fillId)) return;
        const checks = getPropertyChecksForTerritory ? getPropertyChecksForTerritory(type, name) : [['==', ['get', 'name'], name]];
        const nameMatch = checks.length > 0 ? ['any', ...checks] : ['==', ['get', 'name'], name];
        const colorCases = ['case', nameMatch, highlightColor, color || '#888'];
        const opacityCases = ['case', nameMatch, highlightOpacity, 0.02];
        currentMap.setPaintProperty(fillId, 'fill-color', colorCases);
        currentMap.setPaintProperty(fillId, 'fill-opacity', opacityCases);
        if (currentMap.getLayer(lineId)) {
            const defaultLineW = typeof getDefaultLineWidthForLayerId === 'function' ? getDefaultLineWidthForLayerId(type) : 2;
            currentMap.setPaintProperty(lineId, 'line-color', ['case', nameMatch, highlightColor, color || '#888']);
            currentMap.setPaintProperty(lineId, 'line-width', ['case', nameMatch, 2.5, defaultLineW]);
        }
    } else if (currentProvider === 'google' && boundaryLayers) {
        const layer = boundaryLayers[getGoogleBoundaryLayerName(type)];
        if (layer && layer.length) {
            const resetStrokeW = (type && type.includes('Census')) ? 0.5 : (type && type.includes('Municipal')) ? 1 : 2;
            const resetStyle = { fillOpacity: 0.02, strokeWeight: resetStrokeW, strokeColor: color || defaultColor, fillColor: color || defaultColor };
            layer.forEach(p => {
                if (!p || !p.setOptions) return;
                if (p.get('territoryName') === name) {
                    p.setOptions({ fillOpacity: highlightOpacity, strokeWeight: highlightWeight, strokeColor: highlightColor, fillColor: highlightColor });
                } else {
                    p.setOptions(resetStyle);
                }
            });
        }
    }
}

function clearTerritoryMapHighlight(type) {
    if (!type) return;
    const color = getDefaultBoundaryColorForLayerId ? getDefaultBoundaryColorForLayerId(type + '-fill') : '#4A90E2';
    const defaultColor = color || '#888';
    const defaultOpacity = 0.02;
    const defaultWeight = 2;
    const defaultLineW = typeof getDefaultLineWidthForLayerId === 'function' ? getDefaultLineWidthForLayerId(type) : 2;
    if (isLeafletProvider() && boundaryLayers) {
        const layer = boundaryLayers[type];
        if (layer && typeof layer.eachLayer === 'function') {
            try {
                layer.eachLayer(layerItem => {
                    try { if (layerItem.setStyle) layerItem.setStyle({ fillOpacity: defaultOpacity, weight: defaultWeight, color: defaultColor, fillColor: defaultColor }); } catch (e) {}
                });
            } catch (e) { /* ignore */ }
        }
    } else if (currentProvider === 'mapbox' && currentMap) {
        const fillId = type + '-fill';
        const lineId = type + '-line';
        if (currentMap.getLayer(fillId)) {
            currentMap.setPaintProperty(fillId, 'fill-color', defaultColor);
            currentMap.setPaintProperty(fillId, 'fill-opacity', defaultOpacity);
        }
        if (currentMap.getLayer(lineId)) {
            currentMap.setPaintProperty(lineId, 'line-color', defaultColor);
            currentMap.setPaintProperty(lineId, 'line-width', defaultLineW);
        }
    } else if (currentProvider === 'google' && boundaryLayers) {
        const layer = boundaryLayers[type];
        if (layer && layer.forEach) {
            layer.forEach(p => {
                if (p && p.setOptions) p.setOptions({ fillOpacity: defaultOpacity, strokeWeight: defaultWeight, strokeColor: defaultColor, fillColor: defaultColor });
            });
        }
    }
}

// --- Territory Info fields (name, population, notes); legacy localStorage prefix territory_wiki_ ---
function getTerritoryInfoFieldsStorageKey(type, name) {
    return `territory_wiki_${(type||'').toLowerCase().replace(/\s+/g, '_')}_${(name||'').toLowerCase().replace(/\s+/g, '_')}`;
}
function loadTerritoryInfoFieldsData(type, name) {
    const key = getTerritoryInfoFieldsStorageKey(type, name);
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : null;
}
function saveTerritoryInfoFieldsData(type, name, data) {
    const key = getTerritoryInfoFieldsStorageKey(type, name);
    localStorage.setItem(key, JSON.stringify(data));
}

// --- Territory Info panel (agenda accordions); localStorage keys keep legacy politics_ prefix ---
function getTerritoryInfoStorageKey(type, name) {
    return `politics_${type}_${name.toLowerCase().replace(/\s+/g, '_')}`;
}

function loadTerritoryInfoData(type, name) {
    const dataKey = getTerritoryInfoStorageKey(type, name);
    const savedData = localStorage.getItem(dataKey);
    
    if (savedData) {
        const data = JSON.parse(savedData);
        updateTerritoryInfoPanelUI(data);
    } else {
        const defaultData = {
            links: 'Paste telegram / whatsapp group link here',
            civilOrgs: 'Enter name and website link of given civil organization',
            politicalParties: 'Enter name and website link of local political party representation',
            relevantPeople: 'Enter name and telephone / email'
        };
        updateTerritoryInfoPanelUI(defaultData);
    }
}

function saveTerritoryInfoPanelData(type, name, data) {
    const dataKey = getTerritoryInfoStorageKey(type, name);
    localStorage.setItem(dataKey, JSON.stringify(data));
}

function updateTerritoryInfoPanelUI(data) {
    const linksP = document.querySelector('#links-accordion .placeholder-text p');
    if (linksP) linksP.textContent = data.links;

    const civilOrgsP = document.querySelector('#civil-orgs-accordion .placeholder-text p');
    if (civilOrgsP) civilOrgsP.textContent = data.civilOrgs;

    const politicalPartiesP = document.querySelector('#political-parties-accordion .placeholder-text p');
    if (politicalPartiesP) politicalPartiesP.textContent = data.politicalParties;

    const relevantPeopleP = document.querySelector('#relevant-people-accordion .placeholder-text p');
    if (relevantPeopleP) relevantPeopleP.textContent = data.relevantPeople;
}

function getCurrentTerritoryInfoData() {
    return {
        links: document.querySelector('#links-accordion .placeholder-text p')?.textContent || '',
        civilOrgs: document.querySelector('#civil-orgs-accordion .placeholder-text p')?.textContent || '',
        politicalParties: document.querySelector('#political-parties-accordion .placeholder-text p')?.textContent || '',
        relevantPeople: document.querySelector('#relevant-people-accordion .placeholder-text p')?.textContent || ''
    };
}

function updateTerritoryInfoSubtab(type, name) {
    const titleEl = document.getElementById('territory-info-title');
    const subtitleEl = document.getElementById('territory-info-subtitle');
    const detailsEl = document.getElementById('territory-info-details');

    if (!titleEl || !subtitleEl || !detailsEl) return;

    titleEl.textContent = `${type}: ${name}`;
    subtitleEl.textContent = `Territory information for ${name}`;
    
    loadTerritoryInfoData(type, name);
    detailsEl.style.display = 'block';
}

function resetTerritoryInfoSubtab() {
    const titleEl = document.getElementById('territory-info-title');
    const subtitleEl = document.getElementById('territory-info-subtitle');
    const detailsEl = document.getElementById('territory-info-details');

    if (!titleEl || !subtitleEl || !detailsEl) return;

    titleEl.textContent = '📖 Territory Info — Select a territory';
    subtitleEl.textContent = 'Enable a boundary layer in Borders, then click a region on the map.';
    detailsEl.style.display = 'none';
}

function setupTerritoryInfoAccordions() {
    document.querySelectorAll('.territory-info-section .accordion-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent the global accordion delegate from toggling this twice.
            e.preventDefault();
            e.stopPropagation();
            const targetId = btn.getAttribute('data-accordion');
            const content = document.getElementById(targetId);
            if (!content) return;
            btn.classList.toggle('active');
            content.classList.toggle('show');
        });
    });
}

function setupTerritoryInfoEditButtons() {
    document.querySelectorAll('.territory-info-section .edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const field = btn.getAttribute('data-field');
            const paragraph = btn.previousElementSibling;
            if (!paragraph || !selectedTerritory) return;

            const currentText = paragraph.textContent;
            const newText = prompt(`Edit ${field}:`, currentText);
            
            if (newText !== null && typeof newText === 'string' && newText !== currentText) {
                paragraph.textContent = newText;
                const data = getCurrentTerritoryInfoData();
                saveTerritoryInfoPanelData(selectedTerritory.type, selectedTerritory.name, data);
            }
        });
    });
}

/* --- Cartagrama.html L14507-L14731: layer helpers + refreshMapHighlights --- */
function getLayerIdForTerritoryType(type) {
    // If type already matches a loaded layer name, use it directly.
    if (typeof type === 'string') {
        const direct = type + '-fill';
        try {
            if (currentProvider === 'mapbox' && currentMap && currentMap.getLayer && currentMap.getLayer(direct)) {
                return direct;
            }
        } catch (e) { /* ignore */ }
    }
    // Backwards-compatible aliases (Edumapa types)
    const source = (type === 'worldCountries') ? 'worldCountries' :
        (type === 'county' || type === 'spainComarques') ? 'spainComarques' :
        (type === 'lea' || type === 'spainMunicipalities') ? 'spainMunicipalities' :
        (type === 'province' || type === 'spainProvinces') ? 'spainProvinces' :
        (type === 'census' || type === 'spainCensus') ? 'spainCensus' :
        // Catalunya aliases
        (type === 'catComarques') ? 'catComarques' :
        (type === 'catMunicipalities') ? 'catMunicipalities' :
        (type === 'catCensus') ? 'catCensus' :
        (type === 'catProvinces') ? 'catProvinces' :
        // NUTS
        (type === 'nuts1' || type === 'nuts2' || type === 'nuts3') ? type :
        // Ireland
        (type === 'irelandCounties' || type === 'irelandMunicipalDistricts') ? type :
        type;
    return source + '-fill';
}

// Returns array of Mapbox expression checks for a territory (type, name) for paint case expressions
function getPropertyChecksForTerritory(type, territoryName) {
    const checks = [];
    if (type === 'worldCountries') {
        checks.push(['==', ['get', 'name'], territoryName], ['==', ['get', 'NAME'], territoryName],
            ['==', ['get', 'NAME_1'], territoryName], ['==', ['get', 'ADMIN'], territoryName],
            ['==', ['get', 'NAME_LONG'], territoryName], ['==', ['get', 'NAME_EN'], territoryName]);
    } else if (type === 'county' || type === 'spainComarques' || type === 'catComarques') {
        checks.push(['==', ['get', 'name'], territoryName], ['==', ['get', 'NAME_1'], territoryName],
            ['==', ['get', 'NOMCOMAR'], territoryName], ['==', ['get', 'NOM_COMAR'], territoryName],
            ['==', ['get', 'nom_comar'], territoryName], ['==', ['get', 'NomComarca'], territoryName],
            ['==', ['get', 'nom_comarca'], territoryName], ['==', ['get', 'nom_comarc'], territoryName],
            ['==', ['get', 'nomcomarca'], territoryName], ['==', ['get', 'COMARCA'], territoryName],
            ['==', ['get', 'comarca'], territoryName], ['==', ['get', 'comarca_name'], territoryName],
            ['==', ['get', 'NOM'], territoryName], ['==', ['get', 'nom'], territoryName], ['==', ['get', 'Nom'], territoryName]);
    } else if (type === 'lea' || type === 'spainMunicipalities' || type === 'catMunicipalities') {
        checks.push(['==', ['get', 'nom_municipi'], territoryName], ['==', ['get', 'name'], territoryName],
            ['==', ['get', 'NAME_1'], territoryName], ['==', ['get', 'NOM'], territoryName],
            ['==', ['get', 'nom'], territoryName], ['==', ['get', 'Nom'], territoryName],
            ['==', ['get', 'municipi'], territoryName], ['==', ['get', 'MUNICIPI'], territoryName],
            ['==', ['get', 'NOM_MUNICIPI'], territoryName]);
    } else if (type === 'province' || type === 'spainProvinces' || type === 'catProvinces') {
        checks.push(['==', ['get', 'name'], territoryName], ['==', ['get', 'NAME_1'], territoryName],
            ['==', ['get', 'NAME'], territoryName], ['==', ['get', 'nom'], territoryName],
            ['==', ['get', 'Nom'], territoryName], ['==', ['get', 'provincia'], territoryName],
            ['==', ['get', 'PROVINCIA'], territoryName], ['==', ['get', 'nom_provincia'], territoryName],
            ['==', ['get', 'NOM_PROVINCIA'], territoryName]);
    } else if (type === 'census' || type === 'spainCensus' || type === 'catCensus') {
        const parts = territoryName.split(' - Secció ');
        const municipality = parts[0];
        const sectionCode = parts[1];
        if (municipality != null && sectionCode != null) {
            checks.push(['all', ['==', ['get', 'nom_municipi'], municipality], ['==', ['get', 'codi_seccio_censal'], sectionCode]]);
        }
        checks.push(['==', ['get', 'name'], territoryName], ['==', ['get', 'NAME_1'], territoryName],
            ['==', ['get', 'NOM'], territoryName], ['==', ['get', 'nom'], territoryName],
            ['==', ['get', 'Nom'], territoryName], ['==', ['get', 'seccio'], territoryName],
            ['==', ['get', 'SECCIO'], territoryName], ['==', ['get', 'NOM_SECCIO'], territoryName]);
    } else if (type === 'irelandCounties') {
        checks.push(
            ['==', ['get', 'NAME_1'], territoryName],
            ['==', ['get', 'name'], territoryName],
            ['==', ['get', 'NAME'], territoryName],
            ['==', ['get', 'NOM'], territoryName],
            ['==', ['get', 'nom'], territoryName]
        );
    } else if (type === 'irelandMunicipalDistricts') {
        checks.push(...getIrelandMunicipalDistrictPropertyChecks(territoryName));
    } else {
        // Generic fallback for any other boundary layers (NUTS, Catalunya, custom)
        checks.push(
            ['==', ['get', 'name'], territoryName],
            ['==', ['get', 'NAME'], territoryName],
            ['==', ['get', 'NAME_1'], territoryName],
            ['==', ['get', 'NOM'], territoryName],
            ['==', ['get', 'nom'], territoryName],
            ['==', ['get', 'Nom'], territoryName],
            ['==', ['get', 'nombre'], territoryName],
            ['==', ['get', 'NOMBRE'], territoryName],
            ['==', ['get', 'ADMIN'], territoryName],
            ['==', ['get', 'admin'], territoryName],
            ['==', ['get', 'NAME_LONG'], territoryName],
            ['==', ['get', 'NAME_EN'], territoryName],
            ['==', ['get', 'nuts_name'], territoryName],
            ['==', ['get', 'NUTS_NAME'], territoryName],
            ['==', ['get', 'NAME_LATN'], territoryName]
        );
    }
    return checks;
}

function getDefaultLineWidthForLayerId(type) {
    const w = { worldCountries: 2, nuts1: 1.5, nuts2: 1.5, nuts3: 1.5, spainCCAA: 2, spainProvinces: 2, spainComarques: 2,
        spainMunicipalities: 1, spainCensus: 0.5, catProvinces: 2, catComarques: 2, catMunicipalities: 1, catCensus: 0.5,
        irelandCounties: 2, irelandMunicipalDistricts: 1.5 };
    return w[type] ?? 2;
}

function getDefaultBoundaryColorForLayerId(fillLayerId) {
    const key = String(fillLayerId || '').replace(/-fill$/, '');
    if (key === 'worldCountries') return '#4A90E2';
    if (key === 'nuts1') return '#e67e22';
    if (key === 'nuts2') return '#d35400';
    if (key === 'nuts3') return '#c0392b';
    if (key === 'spainCCAA') return '#2980b9';
    if (key === 'spainProvinces' || key === 'catProvinces') return '#FF6B35';
    if (key === 'spainComarques' || key === 'catComarques') return '#3498db';
    if (key === 'spainMunicipalities' || key === 'catMunicipalities') return '#2ecc71';
    if (key === 'spainCensus' || key === 'catCensus') return '#9b59b6';
    if (key === 'irelandCounties') return '#16a085';
    if (key === 'irelandMunicipalDistricts') return '#27ae60';
    return '#888';
}

// Single source of truth: rebuild all boundary layer highlights from selection + visible groups (fixes color bugs)
function refreshMapHighlights() {
    if (currentProvider !== 'mapbox' || !currentMap) return;
    // Hardcoded list of all boundary layers we support for group highlighting
    // This ensures highlights work regardless of whether the eye button is toggled on
    const layerConfig = [
        { layerId: 'worldCountries-fill', type: 'worldCountries', defaultColor: '#4A90E2', defaultOpacity: 0.02, defaultLineWidth: 2 },
        { layerId: 'nuts1-fill', type: 'nuts1', defaultColor: '#e67e22', defaultOpacity: 0.02, defaultLineWidth: 1.5 },
        { layerId: 'nuts2-fill', type: 'nuts2', defaultColor: '#d35400', defaultOpacity: 0.02, defaultLineWidth: 1.5 },
        { layerId: 'nuts3-fill', type: 'nuts3', defaultColor: '#c0392b', defaultOpacity: 0.02, defaultLineWidth: 1.5 },
        { layerId: 'spainCCAA-fill', type: 'spainCCAA', defaultColor: '#2980b9', defaultOpacity: 0.02, defaultLineWidth: 2 },
        { layerId: 'spainProvinces-fill', type: 'spainProvinces', defaultColor: '#FF6B35', defaultOpacity: 0.02, defaultLineWidth: 2 },
        { layerId: 'spainComarques-fill', type: 'spainComarques', defaultColor: '#3498db', defaultOpacity: 0.02, defaultLineWidth: 2 },
        { layerId: 'spainMunicipalities-fill', type: 'spainMunicipalities', defaultColor: '#2ecc71', defaultOpacity: 0.02, defaultLineWidth: 1 },
        { layerId: 'spainCensus-fill', type: 'spainCensus', defaultColor: '#9b59b6', defaultOpacity: 0.02, defaultLineWidth: 0.5 },
        { layerId: 'catProvinces-fill', type: 'catProvinces', defaultColor: '#FF6B35', defaultOpacity: 0.02, defaultLineWidth: 2 },
        { layerId: 'catComarques-fill', type: 'catComarques', defaultColor: '#3498db', defaultOpacity: 0.02, defaultLineWidth: 2 },
        { layerId: 'catMunicipalities-fill', type: 'catMunicipalities', defaultColor: '#2ecc71', defaultOpacity: 0.02, defaultLineWidth: 1 },
        { layerId: 'catCensus-fill', type: 'catCensus', defaultColor: '#9b59b6', defaultOpacity: 0.02, defaultLineWidth: 0.5 },
        { layerId: 'irelandCounties-fill', type: 'irelandCounties', defaultColor: '#16a085', defaultOpacity: 0.02, defaultLineWidth: 2 },
        { layerId: 'irelandMunicipalDistricts-fill', type: 'irelandMunicipalDistricts', defaultColor: '#27ae60', defaultOpacity: 0.02, defaultLineWidth: 1.5 }
    ];
    const highlightOpacity = 0.22;
    const highlightLineWidth = 2.5;
    const hasSelectedTerritory = !!(selectedTerritory && selectedTerritory.type && selectedTerritory.name);
    layerConfig.forEach(function (cfg) {
        try {
            if (!currentMap.getLayer(cfg.layerId)) return;
            const colorCases = ['case'];
            const opacityCases = ['case'];
            const lineId = cfg.layerId.replace('-fill', '-line');
            const lineColorCases = ['case'];
            const lineWidthCases = ['case'];
            const defaultLineColor = cfg.defaultColor;
            const defaultLineWidth = cfg.defaultLineWidth ?? 2;
            // Selection first (so selection is visible while creating a group)
            if (isGroupCreationActive && selectedTerritories.length > 0) {
                selectedTerritories.forEach(function (t) {
                    const expectedLayerId = getLayerIdForTerritoryType(t.type);
                    if (expectedLayerId !== cfg.layerId) return;
                    const checks = getPropertyChecksForTerritory(t.type, t.name);
                    checks.forEach(function (c) {
                        colorCases.push(c, currentGroupColor);
                        opacityCases.push(c, highlightOpacity);
                        lineColorCases.push(c, currentGroupColor);
                        lineWidthCases.push(c, highlightLineWidth);
                    });
                });
            }
            // Then each visible group
            highlightedGroupIds.forEach(function (gid) {
                const group = territoryGroups.find(function (g) { return g.id === gid; });
                if (!group) return;
                const color = groupColors.get(gid) || '#4CAF50';
                group.territories.forEach(function (t) {
                    const expectedLayerId = getLayerIdForTerritoryType(t.type);
                    if (expectedLayerId !== cfg.layerId) return;
                    const checks = getPropertyChecksForTerritory(t.type, t.name);
                    checks.forEach(function (c) {
                        colorCases.push(c, color);
                        opacityCases.push(c, highlightOpacity);
                        lineColorCases.push(c, color);
                        lineWidthCases.push(c, highlightLineWidth);
                    });
                });
            });
            // Keep single-territory selection visible without removing visible group highlights.
            if (!isGroupCreationActive && hasSelectedTerritory) {
                const selectedFillId = getLayerIdForTerritoryType(selectedTerritory.type);
                if (selectedFillId === cfg.layerId) {
                    const selectedColor = getDefaultBoundaryColorForLayerId(cfg.layerId) || cfg.defaultColor;
                    const checks = getPropertyChecksForTerritory(selectedTerritory.type, selectedTerritory.name);
                    checks.forEach(function (c) {
                        colorCases.push(c, selectedColor);
                        opacityCases.push(c, highlightOpacity);
                        lineColorCases.push(c, selectedColor);
                        lineWidthCases.push(c, highlightLineWidth);
                    });
                }
            }
            colorCases.push(cfg.defaultColor);
            opacityCases.push(cfg.defaultOpacity);
            lineColorCases.push(defaultLineColor);
            lineWidthCases.push(defaultLineWidth);
            // Mapbox 'case' requires at least one (condition, output) pair plus default; ['case', default] is invalid and can blank the map
            const hasHighlightCases = colorCases.length > 2;
            if (hasHighlightCases) {
                currentMap.setPaintProperty(cfg.layerId, 'fill-color', colorCases);
                currentMap.setPaintProperty(cfg.layerId, 'fill-opacity', opacityCases);
                if (currentMap.getLayer(lineId)) {
                    currentMap.setPaintProperty(lineId, 'line-color', lineColorCases);
                    currentMap.setPaintProperty(lineId, 'line-width', lineWidthCases);
                }
            } else {
                currentMap.setPaintProperty(cfg.layerId, 'fill-color', cfg.defaultColor);
                currentMap.setPaintProperty(cfg.layerId, 'fill-opacity', cfg.defaultOpacity);
                if (currentMap.getLayer(lineId)) {
                    currentMap.setPaintProperty(lineId, 'line-color', defaultLineColor);
                    currentMap.setPaintProperty(lineId, 'line-width', defaultLineWidth);
                }
            }
            // Z-order: put line below fill so fill (highlights) are visible above boundary lines
            if (currentMap.getLayer(lineId)) {
                try {
                    currentMap.moveLayer(lineId, cfg.layerId);
                } catch (moveErr) { /* ignore */ }
            }
        } catch (err) {
            console.warn('refreshMapHighlights layer', cfg.layerId, err);
        }
    });
}

/* --- Cartagrama.html L14781-L14786: isGroupsTabActive --- */
function isGroupsTabActive() {
    const territoriesContent = document.getElementById('cartagrama-content-territories');
    const grouperContent = document.getElementById('territories-content-grouper');
    return territoriesContent && territoriesContent.classList.contains('active') &&
           grouperContent && grouperContent.classList.contains('active');
}

/* --- Cartagrama.html L26320-L26559: boundary display names + click dispatch --- */
/* BOUNDARY LAYER FUNCTIONS */

function getIrelandCountyDisplayName(props) {
    return props.NAME_1 || props.name || props.NAME || props.NOM || props.nom || '';
}

function getIrelandMunicipalDistrictDisplayName(props, fallbackId) {
    if (props.cso_name || props.CSO_NAME) return props.cso_name || props.CSO_NAME;
    const lea = props.LEA || props.lea;
    const county = props.COUNTY || props.county;
    if (lea && county) return `${lea}, ${county}`;
    if (lea) return lea;
    if (props.LE_ID || props.LEA_ID) return String(props.LE_ID || props.LEA_ID);
    return fallbackId != null && fallbackId !== '' ? `District ${fallbackId}` : '';
}

function getIrelandMunicipalDistrictPropertyChecks(territoryName) {
    const checks = [
        ['==', ['get', 'cso_name'], territoryName],
        ['==', ['get', 'CSO_NAME'], territoryName],
        ['==', ['get', 'LEA'], territoryName],
        ['==', ['get', 'lea'], territoryName],
        ['==', ['get', 'LE_ID'], territoryName],
        ['==', ['get', 'LEA_ID'], territoryName]
    ];
    const commaIdx = territoryName.indexOf(', ');
    if (commaIdx > 0) {
        const lea = territoryName.slice(0, commaIdx);
        const county = territoryName.slice(commaIdx + 2);
        if (lea && county) {
            checks.push(['all', ['==', ['get', 'LEA'], lea], ['==', ['get', 'COUNTY'], county]]);
        }
    }
    return checks;
}

// Per-layer click handlers (Edumapa approach) - Mapbox handles layer priority automatically
// We just need to ensure only the top visible layer processes clicks
// Single map-level click handler that manually selects topmost layer
// Mapbox fires ALL matching layer handlers, so we need ONE handler that queries and prioritizes
function getBoundaryDisplayName(layerName, props, { featureId, index } = {}) {
    const fallbackId = (featureId !== undefined && featureId !== null && featureId !== '') ? featureId : (index !== undefined && index !== null ? index : 'Unknown');

    // Base (covers most layers); provider-specific special cases refine below.
    let name = props.name || props.NAME || props.NAME_1 || props.nombre || props.NOMBRE ||
        props.nuts_name || props.NUTS_NAME || props.nameunit || props.nom || props.NOM ||
        props.NOMCOMAR || props.NOM_COMAR || props.ADMIN || props.NAME_EN || props.NAME_LONG || props.admin || 'Unknown';

    // Comarques (Spain & Catalunya)
    if (layerName === 'spainComarques' || layerName === 'catComarques') {
        name = props.NOMCOMAR || props.NOM_COMAR || props.nom_comar || props.NomComarca || props.nom_comarca || props.nom_comarc ||
            props.nomcomarca || props.COMARCA || props.comarca || props.comarca_name || props.NOM || props.nom || props.Nom ||
            props.NAME || props.name || 'Comarca';
    }

    // Municipalities (Spain & Catalunya)
    if (layerName === 'spainMunicipalities' || layerName === 'catMunicipalities') {
        name = props.nom_municipi || props.name || props.NAME_1 || props.NOM || props.nom || props.Nom || props.municipi || props.MUNICIPI ||
            props.NOM_MUNICIPI || 'Municipality';
    }

    // Provinces (Spain & Catalunya)
    if (layerName === 'spainProvinces' || layerName === 'catProvinces') {
        name = props.NAME_1 || props.name || props.NAME || props.nom || props.Nom || props.provincia || props.PROVINCIA || props.nom_provincia ||
            props.NOM_PROVINCIA || 'Province';
    }

    // Census sections (Spain & Catalunya)
    if (layerName === 'spainCensus' || layerName === 'catCensus') {
        const mun = props.nom_municipi;
        const sec = props.codi_seccio_censal;
        name = (mun && sec)
            ? (mun + ' - Secció ' + sec)
            : (props.name || props.CENSUS || props.census || props.CENSUS_NAME || props.census_name || `Census Section ${fallbackId}`);
    }

    // World countries (keep stronger English/long-name fallbacks if present)
    if (layerName === 'worldCountries') {
        name = props.name || props.NAME || props.NAME_1 || props.ADMIN || props.NAME_LONG || props.NAME_EN || 'Unknown';
    }

    // NUTS (nuts1/nuts2/nuts3)
    if (layerName && layerName.startsWith('nuts')) {
        name = props.nuts_name || props.NUTS_NAME || props.NAME_LATN || props.name || props.NAME || props.NOM || 'Unknown';
    }

    // Ireland counties (GADM-style NAME_1)
    if (layerName === 'irelandCounties') {
        name = getIrelandCountyDisplayName(props) || 'Unknown';
    }

    // Ireland municipal districts (LEA GeoJSON: LEA, cso_name, LE_ID — not name/NAME_1)
    if (layerName === 'irelandMunicipalDistricts') {
        name = getIrelandMunicipalDistrictDisplayName(props, fallbackId) || 'Unknown';
    }

    return name;
}

// Shared helper: filter catProvinces to Barcelona/Girona/Lleida/Tarragona.
// Keeps provider loaders in sync without mutating the cached GeoJSON.
function getCatProvincesFilteredData(baseData) {
    if (!baseData || !Array.isArray(baseData.features)) return baseData;
    const catNames = ['Barcelona', 'Girona', 'Lleida', 'Tarragona'];
    return {
        type: 'FeatureCollection',
        features: baseData.features.filter(f => {
            const props = f.properties || {};
            const n = props.NAME_1 || props.name || props.NAME || '';
            return catNames.includes(n);
        })
    };
}

const boundaryClickPriorities = {
    worldCountries: 1,
    spainProvinces: 2,
    catProvinces: 2,
    spainComarques: 3,
    catComarques: 3,
    spainMunicipalities: 4,
    catMunicipalities: 4,
    spainCensus: 5,
    catCensus: 5,
    irelandCounties: 6,
    irelandMunicipalDistricts: 7
};

function getBoundaryClickPriority(layerName) {
    return boundaryClickPriorities[layerName] || 0;
}

function boundaryClickClaim({
    mode,
    layerName,
    clickId,
    myPriority,
    data,
    timeWindowMs = 50
} = {}) {
    // Returns `false` if this handler should exit early because a higher-priority layer
    // already claimed the click (within the provider's matching window).
    const claimed = window.__boundaryClickClaimed;
    const claimedPriority = window.__boundaryClickPriority;

    if (mode === 'google') {
        const within = claimed && Math.abs(claimed - clickId) < timeWindowMs;
        if (within && claimedPriority > myPriority) return false;

        const shouldOverride =
            !claimed || !within || myPriority > claimedPriority;
        if (shouldOverride) {
            window.__boundaryClickClaimed = clickId;
            window.__boundaryClickPriority = myPriority;
            window.__boundaryClickData = data;
        }
        return true;
    }

    if (mode === 'leaflet') {
        if (claimed === clickId && claimedPriority > myPriority) return false;
        const shouldOverride = !claimed || claimed !== clickId || myPriority > claimedPriority;
        if (shouldOverride) {
            window.__boundaryClickClaimed = clickId;
            window.__boundaryClickPriority = myPriority;
            window.__boundaryClickData = data;
        }
        return true;
    }

    // Fallback: act like google
    const within = claimed && Math.abs(claimed - clickId) < timeWindowMs;
    if (within && claimedPriority > myPriority) return false;
    const shouldOverride = !claimed || !within || myPriority > claimedPriority;
    if (shouldOverride) {
        window.__boundaryClickClaimed = clickId;
        window.__boundaryClickPriority = myPriority;
        window.__boundaryClickData = data;
    }
    return true;
}

function boundaryClickShouldProcess({
    mode,
    layerName,
    clickId,
    timeWindowMs = 50
} = {}) {
    const claimed = window.__boundaryClickClaimed;
    if (!claimed) return false;
    const data = window.__boundaryClickData || {};

    if (mode === 'google') {
        return Math.abs(claimed - clickId) < timeWindowMs && data?.layerName === layerName;
    }

    if (mode === 'leaflet') {
        return claimed === clickId && data?.layerName === layerName;
    }

    return Math.abs(claimed - clickId) < timeWindowMs && data?.layerName === layerName;
}

function boundaryClickReset() {
    window.__boundaryClickClaimed = null;
}

function getMapboxBoundarySourceLayerId(type) {
    // Maps logical boundary "type" to the Mapbox source layer used by our boundary loader.
    return (type === 'worldCountries') ? 'worldCountries' :
        (type === 'county' || type === 'spainComarques') ? 'spainComarques' :
        (type === 'lea' || type === 'spainMunicipalities') ? 'spainMunicipalities' :
        (type === 'province' || type === 'spainProvinces') ? 'spainProvinces' : 'spainCensus';
}

function getLeafletBoundaryLayerName(type) {
    // Maps logical boundary "type" to the Leaflet layer key used by boundary loaders.
    // Preserves explicit boundaryLayers[type] if present (e.g. if a dataset key already matches).
    return boundaryLayers[type] ? type :
        (type === 'worldCountries') ? 'worldCountries' :
        (type === 'county') ? 'spainComarques' :
        (type === 'lea') ? 'spainMunicipalities' :
        (type === 'province') ? 'spainProvinces' :
        (type === 'census') ? 'spainCensus' :
        type;
}

function getGoogleBoundaryLayerName(type) {
    // Maps logical boundary "type" to the Google boundary layer key used by boundary loaders.
    // Preserves explicit boundaryLayers[type] if present.
    return (boundaryLayers && boundaryLayers[type]) ? type :
        (type === 'worldCountries') ? 'worldCountries' :
        (type === 'county' || type === 'spainComarques') ? 'spainComarques' :
        (type === 'lea' || type === 'spainMunicipalities') ? 'spainMunicipalities' :
        (type === 'province' || type === 'spainProvinces') ? 'spainProvinces' :
        (type === 'census' || type === 'spainCensus') ? 'spainCensus' :
        type;
}

function normalizeBoundarySelectionType(type) {
    // Normalizes logical boundary types to the keys used by the selection state variables.
    // Note: intentionally does NOT consult boundaryLayers; it’s for UI state consistency only.
    return (type === 'province') ? 'spainProvinces' :
        (type === 'county') ? 'spainComarques' :
        (type === 'lea') ? 'spainMunicipalities' :
        (type === 'census') ? 'spainCensus' :
        type;
}

function dispatchBoundaryTerritoryClick({
    layerType,
    name,
    featureId,
    population,
    region,
    clickCoords,
    showGroupFeedback = false
} = {}) {
    // Centralizes the boundary click "state machine" across providers.
    // Groups mode: only add to selection (and optionally show feedback toast).
    // Normal mode: only updateTerritoryInfo.
    if (isGroupsTabActive() && isGroupCreationActive) {
        addTerritoryToSelection(layerType, name, featureId);
        if (showGroupFeedback && typeof showGroupSelectionFeedback === 'function') {
            showGroupSelectionFeedback(layerType, name);
        }
        return true;
    }

    updateTerritoryInfo(
        {
            name,
            type: layerType,
            population: population || '—',
            region: region || '—',
            notes: '—'
        },
        clickCoords
    );
    return false;
}

/* --- Cartagrama.html L26671-L28677: boundary loaders + setupBoundaryControls + custom/per-country sets --- */
async function loadBoundaryLayer(layerName) {
    if (!currentMap || currentProvider !== 'mapbox') return;
    
    const layerConfig = {
        worldCountries: { url: BOUNDARY_DATA.WORLD_COUNTRIES, color: '#4A90E2', weight: 2, fillOpacity: 0.02, name: 'World Countries' },
        spainCCAA: { url: BOUNDARY_DATA.SPAIN_CCAA, color: '#2980b9', weight: 2, fillOpacity: 0.05, name: 'CCAA' },
        spainProvinces: { url: BOUNDARY_DATA.SPAIN_PROVINCES, color: '#FF6B35', weight: 2, fillOpacity: 0.02 },
        spainComarques: { url: BOUNDARY_DATA.SPAIN_COMARCAS, color: '#4A90E2', weight: 2, fillOpacity: 0.02, name: 'Comarcas (Spain)' },
        spainMunicipalities: { url: BOUNDARY_DATA.SPAIN_MUNICIPALITIES, color: '#2ecc71', weight: 1, fillOpacity: 0.02, name: 'Municipalities (Spain)' },
        spainCensus: { url: BOUNDARY_DATA.SPAIN_CENSUS, color: '#9b59b6', weight: 0.5, fillOpacity: 0.02, name: 'Census sections (Spain)' },
        catComarques: { url: BOUNDARY_DATA.CAT_COMARQUES, color: '#4A90E2', weight: 2, fillOpacity: 0.02, name: 'Comarques (Catalonia)' },
        catMunicipalities: { url: BOUNDARY_DATA.CAT_MUNICIPALITIES, color: '#2ecc71', weight: 1, fillOpacity: 0.02, name: 'Municipalities (Catalonia)' },
        catCensus: { url: BOUNDARY_DATA.CAT_CENSUS, color: '#9b59b6', weight: 0.5, fillOpacity: 0.02, name: 'Census sections (Catalonia)' },
        catProvinces: { url: BOUNDARY_DATA.SPAIN_PROVINCES, color: '#FF6B35', weight: 2, fillOpacity: 0.04, name: 'Provinces (Catalonia)' },
        nuts1: { url: BOUNDARY_DATA.NUTS1_2021, color: '#e67e22', weight: 1.5, fillOpacity: 0.02, name: 'NUTS 1' },
        nuts2: { url: BOUNDARY_DATA.NUTS2_2021, color: '#d35400', weight: 1.5, fillOpacity: 0.02, name: 'NUTS 2' },
        nuts3: { url: BOUNDARY_DATA.NUTS3_2021, color: '#c0392b', weight: 1.5, fillOpacity: 0.02, name: 'NUTS 3' },
        irelandCounties: { url: BOUNDARY_DATA.IRELAND_COUNTIES, color: '#16a085', weight: 2, fillOpacity: 0.02, name: 'Ireland Counties' },
        irelandMunicipalDistricts: { url: BOUNDARY_DATA.IRELAND_MUNICIPAL_DISTRICTS, color: '#27ae60', weight: 1.5, fillOpacity: 0.02, name: 'Ireland Municipal Districts' }
    };

    // Check if this is a custom border set
    if (layerName.startsWith('custom_') && window.CUSTOM_BORDER_SETS) {
        const customBorderSets = window.CUSTOM_BORDER_SETS;
        const customIdx = parseInt(layerName.replace('custom_', ''));
        const customSet = customBorderSets.find(s => s.id === customIdx) || customBorderSets[customIdx];
        
        if (customSet) {
            layerConfig[layerName] = {
                url: customSet.url,
                color: '#' + Math.floor(Math.random()*16777215).toString(16), // Random color
                weight: 2,
                fillOpacity: 0.02,
                name: customSet.name
            };
        }
    }

    // Check if this is a per-country custom border set
    if (window.COUNTRY_BORDER_SETS) {
        for (const country in window.COUNTRY_BORDER_SETS) {
            const sets = window.COUNTRY_BORDER_SETS[country];
            for (const set of sets) {
                if (set.layerKey === layerName) {
                    layerConfig[layerName] = {
                        url: set.url,
                        color: '#' + Math.floor(Math.random()*16777215).toString(16),
                        weight: 2,
                        fillOpacity: 0.02,
                        name: set.name
                    };
                    break;
                }
            }
        }
    }
    
        const config = layerConfig[layerName];
        if (!config || !config.url) {
            console.warn('[BOUNDARIES] No URL configured for layer', layerName);
            hideBoundaryLoading();
            return;
        }
    
    try {
        if (currentMap.getSource(layerName)) {
            const visibility = boundaryLayersVisible[layerName] ? 'visible' : 'none';
            currentMap.setLayoutProperty(`${layerName}-fill`, 'visibility', visibility);
            currentMap.setLayoutProperty(`${layerName}-line`, 'visibility', visibility);
            return;
        }
        
        // Use cached GeoJSON (Task 015)
        // Check if this is a TopoJSON file
        // Only Catalunya-specific files are TopoJSON; Spain-wide are GeoJSON or API responses
        const isTopoJSON = layerName === 'catComarques' || layerName === 'catMunicipalities' || layerName === 'catCensus';
        showBoundaryLoading(layerName);
        let baseData = await fetchGeoJSON(config.url, isTopoJSON);
        let data = baseData;
        
        // For Catalan provinces, derive a filtered FeatureCollection without mutating cached data
        if (layerName === 'catProvinces') {
            const filtered = getCatProvincesFilteredData(baseData);
            if (filtered && Array.isArray(filtered.features)) {
                data = filtered;
                cartagramaDebugLog('[BOUNDARIES] Filtered catProvinces features', { total: data.features.length });
            }
        }
        hideBoundaryLoading();
        
        cartagramaDebugLog('[BOUNDARIES] Adding source to map', { layerName, featureCount: data.features?.length });
        currentMap.addSource(layerName, { type: 'geojson', data: data });
        
        // Layer ordering: world (back) -> NUTS -> Spain (CCAA/provinces/others) -> Catalunya -> Ireland (front-ish)
        // Determine where to insert this layer based on desired order
        const layerOrder = {
            'worldCountries': 0,      // Back
            'nuts1': 1,
            'nuts2': 2,
            'nuts3': 3,
            'spainCCAA': 4,
            'spainProvinces': 5,
            'spainComarques': 6,
            'spainMunicipalities': 7,
            'spainCensus': 8,
            'catComarques': 9,
            'catMunicipalities': 10,
            'catCensus': 11,
            'irelandCounties': 6,
            'irelandMunicipalDistricts': 7
        };
        
        const currentOrder = layerOrder[layerName] || 0;
        let beforeId = null;
        
        // Strategy: Find the first layer that should come AFTER this one (higher order)
        // If none exists, find the last layer that should come BEFORE this one (lower order)
        // This ensures proper ordering even when layers are loaded out of order
        
        // First, try to find a layer with higher order (should come after this one)
        for (const [name, order] of Object.entries(layerOrder)) {
            if (order > currentOrder && currentMap.getLayer(`${name}-line`)) {
                beforeId = `${name}-line`;
                break;
            }
        }
        
        // If no higher-order layer exists, find the last lower-order layer to insert after
        if (!beforeId) {
            let lastLowerOrderLayer = null;
            let lastLowerOrder = -1;
            for (const [name, order] of Object.entries(layerOrder)) {
                if (order < currentOrder && currentMap.getLayer(`${name}-line`)) {
                    if (order > lastLowerOrder) {
                        lastLowerOrder = order;
                        lastLowerOrderLayer = `${name}-line`;
                    }
                }
            }
            // If we found a lower-order layer, insert after it by finding what comes after it
            if (lastLowerOrderLayer) {
                // Find what comes after the last lower-order layer
                for (const [name, order] of Object.entries(layerOrder)) {
                    if (order > lastLowerOrder && currentMap.getLayer(`${name}-line`)) {
                        beforeId = `${name}-line`;
                        break;
                    }
                }
            }
        }
        
        const fillLayer = {
            id: `${layerName}-fill`,
            type: 'fill',
            source: layerName,
            paint: { 'fill-color': config.color, 'fill-opacity': config.fillOpacity || 0.02 }
        };
        
        const lineLayer = {
            id: `${layerName}-line`,
            type: 'line',
            source: layerName,
            paint: { 'line-color': config.color, 'line-width': config.weight || 1.5, 'line-opacity': 0.8 }
        };
        
        // Mapbox's addLayer expects beforeId as a separate argument, not inside the definition
        if (beforeId) {
            const beforeFillId = beforeId.replace('-line', '-fill');
            if (currentMap.getLayer(beforeFillId)) {
                currentMap.addLayer(fillLayer, beforeFillId);
            } else {
                currentMap.addLayer(fillLayer);
            }
            currentMap.addLayer(lineLayer, beforeId);
            cartagramaDebugLog('[BOUNDARIES] Added layers with beforeId', { layerName, beforeId });
        } else {
            // No beforeId: add at the end
            currentMap.addLayer(fillLayer);
            currentMap.addLayer(lineLayer);
            cartagramaDebugLog('[BOUNDARIES] Added layers at end', { layerName });
        }
        
        cartagramaDebugLog('[BOUNDARIES] Layers added successfully', {
            fill: `${layerName}-fill`, 
            line: `${layerName}-line`,
            fillOpacity: config.fillOpacity,
            color: config.color
        });
        
        // Log initial layer position for debugging
        
        // CRITICAL: After adding, ALWAYS ensure correct z-order
        // Strategy: Find the LOWEST higher-order layer that exists and move ourselves BEFORE it
        // (In Mapbox, layers earlier in the array render below layers later in the array)
        // moveLayer(id, beforeId) moves id to render BEFORE (below) beforeId
        // So to be ON TOP of lower-order layers, we need to find a higher-order layer to be before
        setTimeout(() => {
            const style = currentMap.getStyle();
            if (!style || !style.layers) return;
            
            const currentLayerIds = style.layers.map(l => l.id);
            const ourFillId = `${layerName}-fill`;
            const ourLineId = `${layerName}-line`;
            const ourFillIndex = currentLayerIds.indexOf(ourFillId);
            
            if (ourFillIndex === -1) return;
            
            // Find the LOWEST higher-order layer (smallest order > currentOrder) that exists
            let lowestHigherOrderFill = null;
            let lowestHigherOrder = Infinity;
            
            for (const [name, order] of Object.entries(layerOrder)) {
                if (order > currentOrder) {
                    const fillId = `${name}-fill`;
                    if (currentMap.getLayer(fillId) && order < lowestHigherOrder) {
                        lowestHigherOrder = order;
                        lowestHigherOrderFill = fillId;
                    }
                }
            }
            
            // If a higher-order layer exists, move ourselves BEFORE it (so we render below it)
            if (lowestHigherOrderFill) {
                const targetIndex = currentLayerIds.indexOf(lowestHigherOrderFill);
                if (targetIndex !== -1 && ourFillIndex > targetIndex) {
                    // We're currently ABOVE a higher-order layer - wrong! Move before it.
                    try {
                        currentMap.moveLayer(ourFillId, lowestHigherOrderFill);
                        currentMap.moveLayer(ourLineId, lowestHigherOrderFill.replace('-fill', '-line'));
                    } catch (e) {
                        console.warn('Error moving layer:', e);
                    }
                }
            } else {
                // No higher-order layers exist - we should be at the top
                // Check if any lower-order layer is incorrectly above us
                let highestLowerOrderIndex = -1;
                let highestLowerOrderFill = null;
                
                for (const [name, order] of Object.entries(layerOrder)) {
                    if (order < currentOrder) {
                        const fillId = `${name}-fill`;
                        const idx = currentLayerIds.indexOf(fillId);
                        if (idx !== -1 && idx > highestLowerOrderIndex) {
                            highestLowerOrderIndex = idx;
                            highestLowerOrderFill = fillId;
                        }
                    }
                }
                
                // If a lower-order layer is above us, move us to the top
                if (highestLowerOrderFill && ourFillIndex < highestLowerOrderIndex) {
                    try {
                        // Move to end (top) by omitting beforeId
                        currentMap.moveLayer(ourFillId);
                        currentMap.moveLayer(ourLineId);
                    } catch (e) {
                        console.warn('Error moving layer:', e);
                    }
                }
            }
            
            // Log final layer order for debugging
            const finalStyle = currentMap.getStyle();
            if (finalStyle && finalStyle.layers) {
                const boundaryLayers = finalStyle.layers
                    .filter(l => l.id.endsWith('-fill') && Object.keys(layerOrder).includes(l.id.replace('-fill', '')))
                    .map((l, idx) => `${l.id} (index: ${finalStyle.layers.indexOf(l)})`);
            }
        }, 100);
        
        // Populate feature maps (ported from Edumapa)
        if (data.features) {
            data.features.forEach(feature => {
                const featureId = feature.id || feature.properties?.id;
                const props = feature.properties || {};
                let name = getBoundaryDisplayName(layerName, props, { featureId });
                
                if (featureId && name) {
                    if (layerName === 'worldCountries') {
                        worldCountriesMapFeatures.set(featureId, name);
                    } else if (layerName === 'spainProvinces') {
                        provinceMapFeatures.set(featureId, name);
                    } else if (layerName === 'spainComarques') {
                        countyMapFeatures.set(featureId, name);
                    } else if (layerName === 'spainMunicipalities') {
                        leaMapFeatures.set(featureId, name);
                    } else if (layerName === 'spainCensus') {
                        censusMapFeatures.set(featureId, name);
                    }
                }
            });
        }
        
        // Set up per-layer boundary click handlers (Edumapa approach)
        // This ensures newly loaded layers are immediately interactive
        setupUnifiedBoundaryClickHandler();
        
        // Set up hover handlers for this specific layer
        const mouseenterHandler = () => {
            if (currentMode !== 'select') return;
            currentMap.getCanvas().style.cursor = 'pointer';
        };
        
        const mouseleaveHandler = () => {
            if (currentMode !== 'select') return;
            currentMap.getCanvas().style.cursor = '';
        };
        
        currentMap.on('mouseenter', `${layerName}-fill`, mouseenterHandler);
        currentMap.on('mouseleave', `${layerName}-fill`, mouseleaveHandler);
        
        // Store hover listeners for cleanup
        if (!boundaryEventListeners[layerName]) {
            boundaryEventListeners[layerName] = {};
        }
        boundaryEventListeners[layerName].mouseenter = mouseenterHandler;
        boundaryEventListeners[layerName].mouseleave = mouseleaveHandler;
        
        boundaryLayers[layerName] = data;
    } catch (error) {
        hideBoundaryLoading();
        console.error(`Error loading ${layerName}:`, error);
        alert(`Failed to load ${layerName}. Please try again.`);
    }
}

function highlightTerritoryForGroup(type, name, featureId, color = '#4CAF50', accumulate = true) {
    // Ported from Edumapa - highlights a territory for group visualization
    if (currentProvider === 'google') {
        if (!boundaryLayers) return;
        const layer = boundaryLayers[getGoogleBoundaryLayerName(type)];
        if (layer && layer.length) {
            layer.forEach(p => {
                if (!p || !p.setOptions) return;
                if (p.get('territoryName') === name) {
                    p.setOptions({ fillOpacity: 0.25, strokeWeight: 2.5, strokeColor: color, fillColor: color, zIndex: 1000 });
                }
            });
        }
    } else if (currentProvider === 'mapbox') {
        if (!currentMap) return;
        
        const sourceLayerId = getMapboxBoundarySourceLayerId(type);
        const actualLayerId = `${sourceLayerId}-fill`;
        
        if (currentMap.getLayer(actualLayerId)) {
            // Get current paint properties to preserve existing highlights
            const currentColor = currentMap.getPaintProperty(actualLayerId, 'fill-color');
            const currentOpacity = currentMap.getPaintProperty(actualLayerId, 'fill-opacity');
            
            const colorCases = ['case'];
            const opacityCases = ['case'];
            
            // If accumulating and there are existing highlights, preserve them
            if (accumulate && currentColor && Array.isArray(currentColor) && currentColor[0] === 'case' && currentColor.length > 2) {
                // Copy existing color cases (skip the first 'case' and last default value)
                for (let i = 1; i < currentColor.length - 1; i++) {
                    colorCases.push(currentColor[i]);
                }
                // Copy existing opacity cases (skip the first 'case' and last default value)
                for (let i = 1; i < currentOpacity.length - 1; i++) {
                    opacityCases.push(currentOpacity[i]);
                }
            }
            
            if (type === 'county' || type === 'spainComarques') {
                // For counties (comarques), use the working specific highlighting
                const propertyChecks = [
                    ['==', ['get', 'name'], name],
                    ['==', ['get', 'NAME_1'], name],
                    ['==', ['get', 'NOMCOMAR'], name],
                    ['==', ['get', 'NOM_COMAR'], name],
                    ['==', ['get', 'nom_comar'], name],
                    ['==', ['get', 'NomComarca'], name],
                    ['==', ['get', 'nom_comarca'], name],
                    ['==', ['get', 'nom_comarc'], name],
                    ['==', ['get', 'nomcomarca'], name],
                    ['==', ['get', 'COMARCA'], name],
                    ['==', ['get', 'comarca'], name],
                    ['==', ['get', 'comarca_name'], name],
                    ['==', ['get', 'NOM'], name],
                    ['==', ['get', 'nom'], name],
                    ['==', ['get', 'Nom'], name]
                ];
                
                propertyChecks.forEach(check => {
                    colorCases.push(check, color);
                    opacityCases.push(check, 0.1);
                });
                
                colorCases.push('#3498db');
                opacityCases.push(0.1);
                
                currentMap.setPaintProperty(actualLayerId, 'fill-color', colorCases);
                currentMap.setPaintProperty(actualLayerId, 'fill-opacity', opacityCases);
            } else if (type === 'lea' || type === 'spainMunicipalities') {
                // For municipal (municipis), use specific highlighting
                const propertyChecks = [
                    ['==', ['get', 'nom_municipi'], name],
                    ['==', ['get', 'name'], name],
                    ['==', ['get', 'NAME_1'], name],
                    ['==', ['get', 'NOM'], name],
                    ['==', ['get', 'nom'], name],
                    ['==', ['get', 'Nom'], name],
                    ['==', ['get', 'municipi'], name],
                    ['==', ['get', 'MUNICIPI'], name],
                    ['==', ['get', 'NOM_MUNICIPI'], name]
                ];
                
                propertyChecks.forEach(check => {
                    colorCases.push(check, color);
                    opacityCases.push(check, 0.22);
                });
                
                colorCases.push('#2ecc71');
                opacityCases.push(0.05);
                
                currentMap.setPaintProperty(actualLayerId, 'fill-color', colorCases);
                currentMap.setPaintProperty(actualLayerId, 'fill-opacity', opacityCases);
            } else if (type === 'province' || type === 'spainProvinces') {
                // For provinces, use specific highlighting
                const propertyChecks = [
                    ['==', ['get', 'name'], name],
                    ['==', ['get', 'NAME_1'], name],
                    ['==', ['get', 'NAME'], name],
                    ['==', ['get', 'nom'], name],
                    ['==', ['get', 'Nom'], name],
                    ['==', ['get', 'provincia'], name],
                    ['==', ['get', 'PROVINCIA'], name],
                    ['==', ['get', 'nom_provincia'], name],
                    ['==', ['get', 'NOM_PROVINCIA'], name]
                ];
                
                propertyChecks.forEach(check => {
                    colorCases.push(check, color);
                    opacityCases.push(check, 0.22);
                });
                
                colorCases.push('#FF6B35');
                opacityCases.push(0.1);
                
                currentMap.setPaintProperty(actualLayerId, 'fill-color', colorCases);
                currentMap.setPaintProperty(actualLayerId, 'fill-opacity', opacityCases);
            } else if (type === 'worldCountries') {
                // For world countries, use specific highlighting
                const propertyChecks = [
                    ['==', ['get', 'name'], name],
                    ['==', ['get', 'NAME'], name],
                    ['==', ['get', 'NAME_1'], name],
                    ['==', ['get', 'ADMIN'], name],
                    ['==', ['get', 'NAME_LONG'], name],
                    ['==', ['get', 'NAME_EN'], name]
                ];
                
                propertyChecks.forEach(check => {
                    colorCases.push(check, color);
                    opacityCases.push(check, 0.22); // Visible opacity for highlighting
                });
                
                colorCases.push('#4A90E2');
                opacityCases.push(0.02);
                
                currentMap.setPaintProperty(actualLayerId, 'fill-color', colorCases);
                currentMap.setPaintProperty(actualLayerId, 'fill-opacity', opacityCases);
            } else if (type === 'census' || type === 'spainCensus') {
                // For census sections, use specific highlighting
                // Extract municipality and section code from the name (format: "Municipality - Secció 001")
                const parts = name.split(' - Secció ');
                const municipality = parts[0];
                const sectionCode = parts[1];
                
                const propertyChecks = [
                    ['all',
                        ['==', ['get', 'nom_municipi'], municipality],
                        ['==', ['get', 'codi_seccio_censal'], sectionCode]
                    ],
                    ['==', ['get', 'name'], name],
                    ['==', ['get', 'NAME_1'], name],
                    ['==', ['get', 'NOM'], name],
                    ['==', ['get', 'nom'], name],
                    ['==', ['get', 'Nom'], name],
                    ['==', ['get', 'seccio'], name],
                    ['==', ['get', 'SECCIO'], name],
                    ['==', ['get', 'NOM_SECCIO'], name]
                ];
                
                propertyChecks.forEach(check => {
                    colorCases.push(check, color);
                    opacityCases.push(check, 0.22);
                });
                
                colorCases.push('#9b59b6');
                opacityCases.push(0.02);
                
                currentMap.setPaintProperty(actualLayerId, 'fill-color', colorCases);
                currentMap.setPaintProperty(actualLayerId, 'fill-opacity', opacityCases);
            }
        }
    } else if (isLeafletProvider()) {
        if (!boundaryLayers) return;
        try {
            const layerName = getLeafletBoundaryLayerName(type);
            const layer = boundaryLayers[layerName];
            if (!layer || typeof layer.eachLayer !== 'function') return;
            layer.eachLayer(layerItem => {
                try {
                    const props = layerItem.feature?.properties || {};
                    const itemName = getBoundaryDisplayName(layerName, props);
                    if (itemName === name && layerItem.setStyle) {
                        layerItem.setStyle({ fillOpacity: 0.25, weight: 2.5, color: color, fillColor: color });
                        if (layerItem.bringToFront) layerItem.bringToFront();
                    }
                } catch (e) { /* skip feature */ }
            });
        } catch (e) { console.warn('highlightTerritoryForGroup OSM error', e); }
    }
}

function removeTerritoryHighlight(type, name, featureId) {
    // Ported from Edumapa - removes highlighting from a territory
    if (currentProvider === 'google' && boundaryLayers) {
        let layer = null;
        let nameProperty = null;
        let defaultStyle = {};
        
        const googleZIndex = { worldCountries: 0, spainProvinces: 1, spainComarques: 2, spainMunicipalities: 3, spainCensus: 4 };
        if (type === 'worldCountries') {
            layer = boundaryLayers.worldCountries;
            nameProperty = 'countryName';
            defaultStyle = { fillOpacity: 0.02, strokeWeight: 2, strokeColor: '#4A90E2', fillColor: '#4A90E2', zIndex: googleZIndex.worldCountries };
        } else if (type === 'county' || type === 'spainComarques') {
            layer = boundaryLayers.spainComarques;
            nameProperty = 'countyName';
            defaultStyle = { fillOpacity: 0.02, strokeWeight: 2, strokeColor: '#4A90E2', fillColor: '#4A90E2', zIndex: googleZIndex.spainComarques };
        } else if (type === 'lea' || type === 'spainMunicipalities') {
            layer = boundaryLayers.spainMunicipalities;
            nameProperty = 'leaName';
            defaultStyle = { fillOpacity: 0.02, strokeWeight: 1, strokeColor: '#2ecc71', fillColor: '#2ecc71', zIndex: googleZIndex.spainMunicipalities };
        } else if (type === 'province' || type === 'spainProvinces') {
            layer = boundaryLayers.spainProvinces;
            nameProperty = 'provinceName';
            defaultStyle = { fillOpacity: 0.02, strokeWeight: 2, strokeColor: '#FF6B35', fillColor: '#FF6B35', zIndex: googleZIndex.spainProvinces };
        } else if (type === 'census' || type === 'spainCensus') {
            layer = boundaryLayers.spainCensus;
            nameProperty = 'censusName';
            defaultStyle = { fillOpacity: 0.02, strokeWeight: 0.5, strokeColor: '#9b59b6', fillColor: '#9b59b6', zIndex: googleZIndex.spainCensus };
        }
        
        if (layer && layer.length) {
            const polygon = layer.find(p => p && p.get && p.get(nameProperty) === name);
            if (polygon && polygon.setOptions) {
                polygon.setOptions(defaultStyle);
            }
        }
    } else if (currentProvider === 'mapbox') {
        // Reset Mapbox layer paint properties to default
        if (!currentMap) return;
        
        const sourceLayerId = getMapboxBoundarySourceLayerId(type);
        const actualLayerId = `${sourceLayerId}-fill`;
        
        if (currentMap.getLayer(actualLayerId)) {
            // Reset to default colors and opacities
            const defaultColor = (type === 'worldCountries') ? '#4A90E2' :
                               (type === 'county' || type === 'spainComarques') ? '#8B0000' : 
                               (type === 'lea' || type === 'spainMunicipalities') ? '#2ecc71' : 
                               (type === 'province' || type === 'spainProvinces') ? '#FF6B35' : '#9b59b6';
            const defaultOpacity = 0.02; // All layers use 0.02 for consistency
            
            currentMap.setPaintProperty(actualLayerId, 'fill-color', defaultColor);
            currentMap.setPaintProperty(actualLayerId, 'fill-opacity', defaultOpacity);
        }
    } else if (isLeafletProvider() && boundaryLayers) {
        // Reset Leaflet layers to default styles - wrapped in try/catch to avoid blank map
        try {
            const layerName = getLeafletBoundaryLayerName(type);
            const layer = boundaryLayers[layerName];
            if (layer && layer.eachLayer) {
                layer.eachLayer(layerItem => {
                    try {
                        const props = layerItem.feature?.properties || {};
                        const itemName = getBoundaryDisplayName(layerName, props);
                        if (itemName === name && layerItem.setStyle) {
                            if (layerName === 'worldCountries') {
                                layerItem.setStyle({ fillOpacity: 0.02, weight: 2, color: '#4A90E2', fillColor: '#4A90E2' });
                            } else if (layerName === 'spainComarques') {
                                layerItem.setStyle({ fillOpacity: 0.02, weight: 2, color: '#8B0000', fillColor: '#8B0000' });
                            } else if (layerName === 'spainMunicipalities') {
                                layerItem.setStyle({ fillOpacity: 0.02, weight: 1, color: '#2ecc71', fillColor: '#2ecc71' });
                            } else if (layerName === 'spainProvinces') {
                                layerItem.setStyle({ fillOpacity: 0.02, weight: 2, color: '#FF6B35', fillColor: '#FF6B35' });
                            } else if (layerName === 'spainCensus') {
                                layerItem.setStyle({ fillOpacity: 0.02, weight: 0.5, color: '#9b59b6', fillColor: '#9b59b6' });
                            }
                        }
                    } catch (e) { /* skip feature */ }
                });
            }
        } catch (e) { console.warn('removeTerritoryHighlight OSM error', e); }
    }
}

async function loadBoundaryLayerGoogle(layerName) {
    if (!currentMap || currentProvider !== 'google') return;
    
    const layerConfig = {
        worldCountries: { url: BOUNDARY_DATA.WORLD_COUNTRIES, strokeColor: '#4A90E2', strokeWeight: 2, fillOpacity: 0.02, name: 'World Countries' },
        spainCCAA: { url: BOUNDARY_DATA.SPAIN_CCAA, strokeColor: '#2980b9', strokeWeight: 2, fillOpacity: 0.05, name: 'CCAA' },
        spainProvinces: { url: BOUNDARY_DATA.SPAIN_PROVINCES, strokeColor: '#FF6B35', strokeWeight: 2, fillOpacity: 0.02 },
        spainComarques: { url: BOUNDARY_DATA.SPAIN_COMARCAS, strokeColor: '#4A90E2', strokeWeight: 2, fillOpacity: 0.02, name: 'Comarcas (Spain)' },
        spainMunicipalities: { url: BOUNDARY_DATA.SPAIN_MUNICIPALITIES, strokeColor: '#2ecc71', strokeWeight: 1, fillOpacity: 0.02, name: 'Municipalities (Spain)' },
        spainCensus: { url: BOUNDARY_DATA.SPAIN_CENSUS, strokeColor: '#9b59b6', strokeWeight: 0.5, fillOpacity: 0.02, name: 'Census sections (Spain)' },
        catComarques: { url: BOUNDARY_DATA.CAT_COMARQUES, strokeColor: '#4A90E2', strokeWeight: 2, fillOpacity: 0.02, name: 'Comarques (Catalonia)' },
        catMunicipalities: { url: BOUNDARY_DATA.CAT_MUNICIPALITIES, strokeColor: '#2ecc71', strokeWeight: 1, fillOpacity: 0.02, name: 'Municipalities (Catalonia)' },
        catCensus: { url: BOUNDARY_DATA.CAT_CENSUS, strokeColor: '#9b59b6', strokeWeight: 0.5, fillOpacity: 0.02, name: 'Census sections (Catalonia)' },
        catProvinces: { url: BOUNDARY_DATA.SPAIN_PROVINCES, strokeColor: '#FF6B35', strokeWeight: 2, fillOpacity: 0.04, name: 'Provinces (Catalonia)' },
        nuts1: { url: BOUNDARY_DATA.NUTS1_2021, strokeColor: '#e67e22', strokeWeight: 1.5, fillOpacity: 0.02, name: 'NUTS 1' },
        nuts2: { url: BOUNDARY_DATA.NUTS2_2021, strokeColor: '#d35400', strokeWeight: 1.5, fillOpacity: 0.02, name: 'NUTS 2' },
        nuts3: { url: BOUNDARY_DATA.NUTS3_2021, strokeColor: '#c0392b', strokeWeight: 1.5, fillOpacity: 0.02, name: 'NUTS 3' },
        irelandCounties: { url: BOUNDARY_DATA.IRELAND_COUNTIES, strokeColor: '#16a085', strokeWeight: 2, fillOpacity: 0.02, name: 'Ireland Counties' },
        irelandMunicipalDistricts: { url: BOUNDARY_DATA.IRELAND_MUNICIPAL_DISTRICTS, strokeColor: '#27ae60', strokeWeight: 1.5, fillOpacity: 0.02, name: 'Ireland Municipal Districts' }
    };
    
    const config = layerConfig[layerName];
    if (!config || !config.url) {
        console.warn('[BOUNDARIES] No URL configured for layer', layerName);
        hideBoundaryLoading();
        return;
    }
    
    try {
        if (boundaryLayers[layerName]) {
            boundaryLayers[layerName].forEach(polygon => {
                polygon.setVisible(boundaryLayersVisible[layerName]);
            });
            return;
        }
        
        // Use cached GeoJSON (Task 015)
        // Check if this is a TopoJSON file
        // Only Catalunya-specific files are TopoJSON; Spain-wide are GeoJSON or API responses
        const isTopoJSON = layerName === 'catComarques' || layerName === 'catMunicipalities' || layerName === 'catCensus';
        showBoundaryLoading(layerName);
        let baseData = await fetchGeoJSON(config.url, isTopoJSON);
        let data = baseData;
        
        if (layerName === 'catProvinces') {
            const filtered = getCatProvincesFilteredData(baseData);
            if (filtered && Array.isArray(filtered.features)) {
                data = filtered;
                cartagramaDebugLog('[BOUNDARIES] Filtered catProvinces (Google)', { total: data.features.length });
            }
        }
        hideBoundaryLoading();
        const polygons = [];

        function wireGooglePolygonInteractions(polygonEl, { layerName, name, featureId, population, region }) {
            polygonEl.addListener('click', (e) => {
                if (currentMode !== 'select') {
                    // Google polygon overlays capture clicks and do not bubble to map listeners.
                    // Forward to map click so TerraDraw draw modes (e.g. ring via circle mode) still work.
                    try { google.maps.event.trigger(currentMap, 'click', e); } catch (_) {}
                    return;
                }
                // Mark that a polygon was clicked to prevent empty map handler from firing
                if (window.__googlePolygonClickHandled) {
                    window.__googlePolygonClickHandled(e);
                }

                if (isGroupsTabActive() && isGroupCreationActive) {
                    if (window.__googlePolygonJustProcessed) return;
                    window.__googlePolygonJustProcessed = true;
                    dispatchBoundaryTerritoryClick({
                        layerType: layerName,
                        name,
                        featureId
                    });
                    setTimeout(() => { window.__googlePolygonJustProcessed = false; }, 50);
                    return;
                }

                const myPriority = getBoundaryClickPriority(layerName);
                const clickId = Date.now();

                const clickData = { name, layerName, population, region, e, featureId };
                if (!boundaryClickClaim({ mode: 'google', layerName, clickId, myPriority, data: clickData })) return;

                setTimeout(() => {
                    if (boundaryClickShouldProcess({ mode: 'google', layerName, clickId })) {
                        const data = window.__boundaryClickData;

                        let clickCoords = null;
                        if (data.e?.latLng) {
                            const mapDiv = currentMap.getDiv();
                            const overlay = new google.maps.OverlayView();
                            overlay.draw = function() {};
                            overlay.setMap(currentMap);
                            const projection = overlay.getProjection();
                            if (projection) {
                                const point = projection.fromLatLngToContainerPixel(data.e.latLng);
                                clickCoords = { x: point.x, y: point.y };
                            }
                            overlay.setMap(null);
                        }
                        dispatchBoundaryTerritoryClick({
                            layerType: data.layerName,
                            name: data.name,
                            population: data.population || '',
                            region: data.region || '',
                            clickCoords
                        });
                        boundaryClickReset();
                    }
                }, 10);
            });

            // Cursor pointer feedback on hover (harvested from Edumapa)
            polygonEl.addListener('mouseover', () => {
                if (currentMode !== 'select') return;
                currentMap.getDiv().style.cursor = 'pointer';
            });
            polygonEl.addListener('mouseout', () => {
                if (currentMode !== 'select') return;
                currentMap.getDiv().style.cursor = '';
            });
        }
        
        const zIndexOrder = {
            worldCountries: 0,
            nuts1: 1,
            nuts2: 2,
            nuts3: 3,
            spainCCAA: 4,
            spainProvinces: 5,
            spainComarques: 6,
            spainMunicipalities: 7,
            spainCensus: 8,
            catComarques: 9,
            catMunicipalities: 10,
            catCensus: 11,
            irelandCounties: 5,
            irelandMunicipalDistricts: 6
        };
        
        data.features.forEach((feature, index) => {
            const props = feature.properties || {};
            let name = getBoundaryDisplayName(layerName, props, { featureId: feature.id, index });
            
            const population = props.POP_EST || props.population || props.POBLACION || '';
            const region = props.CONTINENT || props.country || props.ADMIN || props.CCAA || '';
            
            if (feature.geometry.type === 'Polygon') {
                const paths = feature.geometry.coordinates[0].map(coord => ({
                    lat: coord[1], lng: coord[0]
                }));
                const polygon = new google.maps.Polygon({
                    paths: paths,
                    strokeColor: config.strokeColor || config.color,
                    strokeOpacity: 0.8,
                    strokeWeight: config.strokeWeight || 1.5,
                    fillColor: config.strokeColor || config.color,
                    fillOpacity: config.fillOpacity || 0.1,
                    zIndex: zIndexOrder[layerName] ?? 0,
                    map: currentMap
                });
                
                // Store feature mapping for Google Maps polygons - set territoryName for ALL layers so highlight can match
                const featureId = feature.id || feature.properties?.id || `google-${layerName}-${index}`;
                polygon.set('territoryName', name);
                polygon.set('featureId', featureId);
                if (layerName === 'spainProvinces' || layerName === 'catProvinces') {
                    provinceMapFeatures.set(featureId, name);
                    polygon.set('provinceName', name);
                } else if (layerName === 'spainComarques' || layerName === 'catComarques') {
                    countyMapFeatures.set(featureId, name);
                    polygon.set('countyName', name);
                } else if (layerName === 'spainMunicipalities' || layerName === 'catMunicipalities') {
                    leaMapFeatures.set(featureId, name);
                    polygon.set('leaName', name);
                } else if (layerName === 'spainCensus' || layerName === 'catCensus') {
                    censusMapFeatures.set(featureId, name);
                    polygon.set('censusName', name);
                }
                
                wireGooglePolygonInteractions(polygon, {
                    layerName,
                    name,
                    featureId,
                    population,
                    region
                });
                polygons.push(polygon);
            } else if (feature.geometry.type === 'MultiPolygon') {
                feature.geometry.coordinates.forEach((polyCoords, polyIndex) => {
                    const paths = polyCoords[0].map(coord => ({
                        lat: coord[1], lng: coord[0]
                    }));
                    const polygon = new google.maps.Polygon({
                        paths: paths,
                        strokeColor: config.strokeColor || config.color,
                        strokeOpacity: 0.8,
                        strokeWeight: config.strokeWeight || 1.5,
                        fillColor: config.strokeColor || config.color,
                        fillOpacity: config.fillOpacity || 0.1,
                        map: currentMap
                    });
                    
                    // Store feature mapping for MultiPolygon parts (same featureId for all parts of one feature)
                    const featureIdLocal = feature.id || feature.properties?.id || `google-${layerName}-${index}`;
                    polygon.set('territoryName', name);
                    polygon.set('featureId', featureIdLocal);
                    if (layerName === 'spainProvinces' || layerName === 'catProvinces') {
                        provinceMapFeatures.set(featureIdLocal, name);
                        polygon.set('provinceName', name);
                    } else if (layerName === 'spainComarques' || layerName === 'catComarques') {
                        countyMapFeatures.set(featureIdLocal, name);
                        polygon.set('countyName', name);
                    } else if (layerName === 'spainMunicipalities' || layerName === 'catMunicipalities') {
                        leaMapFeatures.set(featureIdLocal, name);
                        polygon.set('leaName', name);
                    } else if (layerName === 'spainCensus' || layerName === 'catCensus') {
                        censusMapFeatures.set(featureIdLocal, name);
                        polygon.set('censusName', name);
                    }
                    wireGooglePolygonInteractions(polygon, {
                        layerName,
                        name,
                        featureId: featureIdLocal,
                        population,
                        region
                    });
                    polygons.push(polygon);
                });
            }
        });
        
        boundaryLayers[layerName] = polygons;
    } catch (error) {
        hideBoundaryLoading();
        console.error(`Error loading ${layerName}:`, error);
        alert(`Failed to load ${layerName}. Please try again.`);
    }
}

async function loadBoundaryLayerLeaflet(layerName) {
    if (!currentMap || !isLeafletProvider()) return;
    
    const layerConfig = {
        worldCountries: { url: BOUNDARY_DATA.WORLD_COUNTRIES, color: '#4A90E2', weight: 2, fillOpacity: 0.02, name: 'World Countries', zIndex: 1 },
        nuts1: { url: BOUNDARY_DATA.NUTS1_2021, color: '#e67e22', weight: 1.5, fillOpacity: 0.08, name: 'NUTS 1', zIndex: 2 },
        nuts2: { url: BOUNDARY_DATA.NUTS2_2021, color: '#d35400', weight: 1.5, fillOpacity: 0.08, name: 'NUTS 2', zIndex: 3 },
        nuts3: { url: BOUNDARY_DATA.NUTS3_2021, color: '#c0392b', weight: 1.5, fillOpacity: 0.08, name: 'NUTS 3', zIndex: 4 },
        spainCCAA: { url: BOUNDARY_DATA.SPAIN_CCAA, color: '#2980b9', weight: 2, fillOpacity: 0.1, name: 'CCAA', zIndex: 5 },
        spainProvinces: { url: BOUNDARY_DATA.SPAIN_PROVINCES, color: '#FF6B35', weight: 2, fillOpacity: 0.02, zIndex: 6 },
        spainComarques: { url: BOUNDARY_DATA.SPAIN_COMARCAS, color: '#3498db', weight: 2, fillOpacity: 0.15, name: 'Comarcas (Spain)', zIndex: 7 },
        spainMunicipalities: { url: BOUNDARY_DATA.SPAIN_MUNICIPALITIES, color: '#2ecc71', weight: 1, fillOpacity: 0.1, name: 'Municipalities (Spain)', zIndex: 8 },
        spainCensus: { url: BOUNDARY_DATA.SPAIN_CENSUS, color: '#9b59b6', weight: 0.5, fillOpacity: 0.08, name: 'Census sections (Spain)', zIndex: 9 },
        catProvinces: { url: BOUNDARY_DATA.SPAIN_PROVINCES, color: '#FF6B35', weight: 2, fillOpacity: 0.04, name: 'Provinces (Catalonia)', zIndex: 10 },
        catComarques: { url: BOUNDARY_DATA.CAT_COMARQUES, color: '#3498db', weight: 2, fillOpacity: 0.02, name: 'Comarques (Catalonia)', zIndex: 11 },
        catMunicipalities: { url: BOUNDARY_DATA.CAT_MUNICIPALITIES, color: '#2ecc71', weight: 1, fillOpacity: 0.02, name: 'Municipalities (Catalonia)', zIndex: 12 },
        catCensus: { url: BOUNDARY_DATA.CAT_CENSUS, color: '#9b59b6', weight: 0.5, fillOpacity: 0.02, name: 'Census sections (Catalonia)', zIndex: 13 },
        irelandCounties: { url: BOUNDARY_DATA.IRELAND_COUNTIES, color: '#16a085', weight: 2, fillOpacity: 0.06, name: 'Ireland Counties', zIndex: 6 },
        irelandMunicipalDistricts: { url: BOUNDARY_DATA.IRELAND_MUNICIPAL_DISTRICTS, color: '#27ae60', weight: 1.5, fillOpacity: 0.06, name: 'Ireland Municipal Districts', zIndex: 7 }
    };
    
    const config = layerConfig[layerName];
    if (!config || !config.url) {
        console.warn('[BOUNDARIES] No URL configured for layer', layerName);
        hideBoundaryLoading();
        return;
    }
    
    try {
        if (boundaryLayers[layerName]) {
            if (boundaryLayersVisible[layerName]) {
                currentMap.addLayer(boundaryLayers[layerName]);
                // Ensure proper layer ordering - bring smaller territories to front
                const layerOrder = ['worldCountries', 'nuts1', 'nuts2', 'nuts3', 'spainCCAA', 'spainProvinces', 'catProvinces', 'spainComarques', 'catComarques', 'spainMunicipalities', 'catMunicipalities', 'spainCensus', 'catCensus', 'irelandCounties', 'irelandMunicipalDistricts'];
                layerOrder.forEach((name, index) => {
                    if (boundaryLayers[name] && boundaryLayersVisible[name]) {
                        boundaryLayers[name].bringToFront();
                    }
                });
            } else {
                currentMap.removeLayer(boundaryLayers[layerName]);
            }
            return;
        }
        
        // Use cached GeoJSON (Task 015)
        // Check if this is a TopoJSON file
        // Only Catalunya-specific files are TopoJSON; Spain-wide are GeoJSON or API responses
        const isTopoJSON = layerName === 'catComarques' || layerName === 'catMunicipalities' || layerName === 'catCensus';
        showBoundaryLoading(layerName);
        let baseData = await fetchGeoJSON(config.url, isTopoJSON);
        let data = baseData;
        
        if (layerName === 'catProvinces') {
            const filtered = getCatProvincesFilteredData(baseData);
            if (filtered && Array.isArray(filtered.features)) {
                data = filtered;
                cartagramaDebugLog('[BOUNDARIES] Filtered catProvinces (Leaflet)', { total: data.features.length });
            }
        }
        hideBoundaryLoading();
        
        const geoJsonLayer = L.geoJSON(data, {
            style: {
                color: config.color,
                weight: config.weight || 1.5,
                opacity: 0.8,
                fillColor: config.color,
                fillOpacity: config.fillOpacity || 0.1
            },
            onEachFeature: (feature, layer) => {
                layer.feature = feature; // Required for highlightTerritoryOnMap and highlightMultipleTerritories eachLayer iteration
                const props = feature.properties || {};
                let name = getBoundaryDisplayName(layerName, props, { featureId: feature.id });
                
                // Store feature mapping for Leaflet layers (ported from Edumapa)
                const featureId = feature.id || feature.properties?.id || `leaflet-${layerName}-${Date.now()}-${Math.random()}`;
                if (layerName === 'spainProvinces' || layerName === 'catProvinces') {
                    provinceMapFeatures.set(featureId, name);
                } else if (layerName === 'spainComarques' || layerName === 'catComarques') {
                    countyMapFeatures.set(featureId, name);
                } else if (layerName === 'spainMunicipalities' || layerName === 'catMunicipalities') {
                    leaMapFeatures.set(featureId, name);
                } else if (layerName === 'spainCensus' || layerName === 'catCensus') {
                    censusMapFeatures.set(featureId, name);
                }
                
                layer.on('click', (e) => {
                    if (currentMode !== 'select') return;
                    // Mark that a polygon was clicked to prevent empty map handler from firing
                    if (window.__leafletPolygonClickHandled) {
                        window.__leafletPolygonClickHandled();
                    }
                    
                    // Priority: higher number = should be selected over lower
                    const myPriority = getBoundaryClickPriority(layerName);
                    const clickId = e.originalEvent?.timeStamp || Date.now();
                    
                    const clickData = { name, layerName, props, e, featureId };
                    if (!boundaryClickClaim({ mode: 'leaflet', layerName, clickId, myPriority, data: clickData })) return;

                    // Process after all handlers have had a chance to claim
                    setTimeout(() => {
                        if (boundaryClickShouldProcess({ mode: 'leaflet', layerName, clickId })) {
                            const data = window.__boundaryClickData;

                            const population = data.props.POP_EST || data.props.population || data.props.POBLACION || '';
                            const region = data.props.CONTINENT || data.props.country || data.props.ADMIN || data.props.CCAA || '';
                            let clickCoords = null;
                            if (data.e?.originalEvent) {
    var mapContainer = document.getElementById('map-container');
                                if (mapContainer) {
                                    const rect = mapContainer.getBoundingClientRect();
                                    clickCoords = { x: data.e.originalEvent.clientX - rect.left, y: data.e.originalEvent.clientY - rect.top };
                                }
                            }
                            dispatchBoundaryTerritoryClick({
                                layerType: data.layerName,
                                name: data.name,
                                population,
                                region,
                                clickCoords,
                                featureId: data.featureId,
                                showGroupFeedback: true
                            });
                            boundaryClickReset(); // Reset for next click
                        }
                    }, 10);
                });
                // Cursor pointer feedback on hover (harvested from Edumapa)
                layer.on('mouseover', () => {
                    if (currentMode !== 'select') return;
                    if (layer._path) layer._path.style.cursor = 'pointer';
                });
                layer.on('mouseout', () => {
                    if (currentMode !== 'select') return;
                    if (layer._path) layer._path.style.cursor = '';
                });
            }
        });
        
        // Store layer FIRST so bringToFront can find it
        boundaryLayers[layerName] = geoJsonLayer;
        
        if (boundaryLayersVisible[layerName]) {
            geoJsonLayer.addTo(currentMap);
            // Ensure proper layer ordering - bring smaller territories to front
            const layerOrder = ['worldCountries', 'nuts1', 'nuts2', 'nuts3', 'spainCCAA', 'spainProvinces', 'catProvinces', 'spainComarques', 'catComarques', 'spainMunicipalities', 'catMunicipalities', 'spainCensus', 'catCensus', 'irelandCounties', 'irelandMunicipalDistricts'];
            layerOrder.forEach((name) => {
                if (boundaryLayers[name] && boundaryLayersVisible[name]) {
                    boundaryLayers[name].bringToFront();
                }
            });
        }
    } catch (error) {
        hideBoundaryLoading();
        console.error(`Error loading ${layerName}:`, error);
        alert(`Failed to load ${layerName}. Please try again.`);
    }
}

async function toggleBoundaryLayer(layerName, isChecked) {
    boundaryLayersVisible[layerName] = isChecked;
    
    // Reset territory info if turning off the currently selected territory's layer
    if (!isChecked && selectedTerritory && selectedTerritory.type === layerName) {
        resetTerritoryInfo();
    }
    
    if (currentProvider === 'mapbox') {
        await loadBoundaryLayer(layerName);
    } else if (currentProvider === 'google') {
        await loadBoundaryLayerGoogle(layerName);
    } else if (isLeafletProvider()) {
        await loadBoundaryLayerLeaflet(layerName);
    }
}

const BOUNDARY_LAYER_ORDER = [
    'worldCountries',
    'nuts1',
    'nuts2',
    'nuts3',
    'spainCCAA',
    'spainProvinces',
    'catProvinces',
    'spainComarques',
    'catComarques',
    'spainMunicipalities',
    'catMunicipalities',
    'spainCensus',
    'catCensus',
    'irelandCounties',
    'irelandMunicipalDistricts'
];

function ensureBoundaryLayersOnMap() {
    if (!currentMap || !currentProvider) return;
    if (isLeafletProvider()) {
        BOUNDARY_LAYER_ORDER.forEach((name) => {
            const layer = boundaryLayers[name];
            if (!layer) return;
            if (!boundaryLayersVisible[name]) {
                if (currentMap.hasLayer(layer)) {
                    try { currentMap.removeLayer(layer); } catch (_) {}
                }
                return;
            }
            if (!currentMap.hasLayer(layer)) {
                try {
                    currentMap.addLayer(layer);
                } catch (_) {
                    boundaryLayers[name] = null;
                    loadBoundaryLayerLeaflet(name);
                }
            }
        });
        BOUNDARY_LAYER_ORDER.forEach((name) => {
            if (boundaryLayers[name] && boundaryLayersVisible[name] && boundaryLayers[name].bringToFront) {
                boundaryLayers[name].bringToFront();
            }
        });
        return;
    }
    reloadVisibleBoundaryLayers();
}

function reloadVisibleBoundaryLayers() {
    if (!currentMap || !currentProvider) return;
    BOUNDARY_LAYER_ORDER.forEach(async (name) => {
        if (boundaryLayersVisible[name]) {
            if (currentProvider === 'mapbox') await loadBoundaryLayer(name);
            else if (currentProvider === 'google') await loadBoundaryLayerGoogle(name);
            else if (isLeafletProvider()) await loadBoundaryLayerLeaflet(name);
        }
    });
}

const CONTINENT_COUNTRIES = {
    europe: ['Albania','Andorra','Armenia','Austria','Azerbaijan','Belarus','Belgium','Bosnia Herzegovina','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark','Estonia','Finland','France','Georgia','Germany','Greece','Hungary','Iceland','Ireland','Italy','Kazakhstan','Kosovo','Latvia','Liechtenstein','Lithuania','Luxembourg','Malta','Moldova','Monaco','Montenegro','Netherlands','North Macedonia','Norway','Poland','Portugal','Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Turkey','Ukraine','United Kingdom','Vatican City State'],
    asia: ['Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei','Cambodia','China','Cyprus','Georgia','India','Indonesia','Iran','Iraq','Israel','Japan','Jordan','Kazakhstan','Kuwait','Kyrgyzstan','Laos','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman','Pakistan','Palestine','Philippines','Qatar','Saudi Arabia','Singapore','South Korea','Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor-Leste','Turkey','Turkmenistan','UAE','Uzbekistan','Vietnam','Yemen'],
    africa: ['Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cameroon','Cape Verde','Central African Republic','Chad','Comoros','Congo','DRC','Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia','Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Ivory Coast','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone','Somalia','South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe'],
    americas: ['USA','Canada','Mexico','Guatemala','Belize','Honduras','El Salvador','Nicaragua','Costa Rica','Panama','Cuba','Haiti','Dominican Republic','Jamaica','Bahamas','Trinidad and Tobago','Barbados','Saint Lucia','Grenada','Saint Vincent and the Grenadines','Antigua and Barbuda','Dominica','Saint Kitts and Nevis','Brazil','Argentina','Peru','Colombia','Venezuela','Chile','Ecuador','Bolivia','Paraguay','Uruguay','Guyana','Suriname'],
    other: ['Antarctica','Australia','New Zealand','Papua New Guinea','Fiji','Solomon Islands','Vanuatu','Samoa','Kiribati','Micronesia','Tonga','Marshall Islands','Palau','Nauru','Tuvalu','Cook Islands','Niue']
};
const EUROPE_PRE_CHECKED = ['NUTS Regions','Catalunya','Spain','Ireland'];
const EUROPE_LIST_TO_BORDER_SET = {
    'NUTS Regions': 'nuts-content',
    'Catalunya': 'catalonia-content',
    'Spain': 'espana-content',
    'España': 'espana-content',
    'Ireland': 'ireland-content'
};
const CONTINENT_HAS_BORDER_SETS = {
    europe: ['NUTS Regions','Catalunya','Spain','Ireland'],
    asia: [], africa: [], americas: [], other: []
};

// Per-boundary-layer style state
const boundaryStyles = {};

function getDefaultBoundaryStyle(layerName) {
    // Fallback defaults; can be refined per-layer later
    const base = {
        lineColor: '#4A90E2',
        lineWidth: 2,
        fillOpacity: 0.2,
    };
    if (layerName === 'spainProvinces' || layerName === 'catProvinces') {
        return { lineColor: '#FF6B35', lineWidth: 2, fillOpacity: 0.15 };
    }
    if (layerName === 'catComarques' || layerName === 'spainComarques') {
        return { lineColor: '#4A90E2', lineWidth: 2, fillOpacity: 0.15 };
    }
    if (layerName === 'catMunicipalities' || layerName === 'spainMunicipalities') {
        return { lineColor: '#2ecc71', lineWidth: 1.5, fillOpacity: 0.12 };
    }
    if (layerName === 'catCensus' || layerName === 'spainCensus') {
        return { lineColor: '#9b59b6', lineWidth: 1, fillOpacity: 0.1 };
    }
    if (layerName === 'irelandCounties' || layerName === 'irelandMunicipalDistricts') {
        return { lineColor: '#16a085', lineWidth: 2, fillOpacity: 0.18 };
    }
    if (layerName === 'nuts1' || layerName === 'nuts2' || layerName === 'nuts3') {
        return { lineColor: '#e67e22', lineWidth: 1.5, fillOpacity: 0.12 };
    }
    return base;
}

function applyBoundaryStyle(layerName) {
    const style = boundaryStyles[layerName] || getDefaultBoundaryStyle(layerName);

    if (!currentProvider || !currentMap) return;

    if (currentProvider === 'mapbox') {
        const fillId = `${layerName}-fill`;
        const lineId = `${layerName}-line`;
        if (currentMap.getLayer(fillId)) {
            currentMap.setPaintProperty(fillId, 'fill-color', style.lineColor);
            currentMap.setPaintProperty(fillId, 'fill-opacity', style.fillOpacity);
        }
        if (currentMap.getLayer(lineId)) {
            currentMap.setPaintProperty(lineId, 'line-color', style.lineColor);
            currentMap.setPaintProperty(lineId, 'line-width', style.lineWidth);
        }
    } else if (currentProvider === 'google') {
        const layer = boundaryLayers[layerName];
        if (Array.isArray(layer)) {
            layer.forEach(poly => {
                if (poly && poly.setOptions) {
                    poly.setOptions({
                        strokeColor: style.lineColor,
                        strokeWeight: style.lineWidth,
                        fillColor: style.lineColor,
                        fillOpacity: style.fillOpacity,
                    });
                }
            });
        }
    } else if (isLeafletProvider()) {
        const layer = boundaryLayers[layerName];
        if (layer && layer.eachLayer) {
            layer.eachLayer(l => {
                if (l && l.setStyle) {
                    l.setStyle({
                        color: style.lineColor,
                        weight: style.lineWidth,
                        fillColor: style.lineColor,
                        fillOpacity: style.fillOpacity,
                    });
                }
            });
        }
    }
}

function openBoundaryStyleEditor(layerName, container) {
    // The editor is inserted as a sibling *after* the header container
    let existing = container.nextElementSibling;
    if (!existing || !existing.classList.contains('boundary-style-editor')) {
        existing = null;
    }
    const isOpen = existing && existing.style.display === 'block';

    // Close if already open
    if (isOpen) {
        existing.style.display = 'none';
        const btn = container.querySelector('.border-style-btn[data-layer="' + layerName + '"]');
        if (btn) btn.classList.remove('active');
        return;
    }

    // Close any other open editors in the boundary controls
    const boundaryControls = document.querySelector('.boundary-controls');
    if (boundaryControls) {
        boundaryControls.querySelectorAll('.boundary-style-editor').forEach(ed => {
            if (ed !== existing) {
                ed.style.display = 'none';
            }
        });
        boundaryControls.querySelectorAll('.border-style-btn.active').forEach(b => {
            b.classList.remove('active');
        });
    }

    // Ensure style entry
    if (!boundaryStyles[layerName]) {
        boundaryStyles[layerName] = { ...getDefaultBoundaryStyle(layerName) };
    }
    const style = boundaryStyles[layerName];

    let editor = existing;
    if (!editor) {
        editor = document.createElement('div');
        editor.className = 'boundary-style-editor';
        editor.innerHTML = `
            <div class="boundary-style-editor-row">
                <label>Border</label>
                <input type="color" class="boundary-style-color">
            </div>
            <div class="boundary-style-editor-row">
                <label>Width</label>
                <input type="range" class="boundary-style-width" min="0.5" max="6" step="0.5">
            </div>
            <div class="boundary-style-editor-row">
                <label>Fill</label>
                <input type="range" class="boundary-style-fill" min="0" max="1" step="0.05">
            </div>
        `;
        container.insertAdjacentElement('afterend', editor);
    }

    const colorInput = editor.querySelector('.boundary-style-color');
    const widthInput = editor.querySelector('.boundary-style-width');
    const fillInput = editor.querySelector('.boundary-style-fill');
    if (!colorInput || !widthInput || !fillInput) return;

    colorInput.value = style.lineColor;
    widthInput.value = style.lineWidth;
    fillInput.value = style.fillOpacity;

    const updateFromInputs = () => {
        boundaryStyles[layerName] = {
            lineColor: colorInput.value,
            lineWidth: parseFloat(widthInput.value),
            fillOpacity: parseFloat(fillInput.value),
        };
        applyBoundaryStyle(layerName);
    };

    colorInput.oninput = updateFromInputs;
    widthInput.oninput = updateFromInputs;
    fillInput.oninput = updateFromInputs;

    editor.style.display = 'block';
    const btn = container.querySelector('.border-style-btn[data-layer="' + layerName + '"]');
    if (btn) btn.classList.add('active');
}

function toggleBoundaryTerritoryList(layerName, container, toggleBtn) {
    // Look for existing territory list as sibling after container
    let existing = container.nextElementSibling;
    while (existing && !existing.classList.contains('border-territory-list')) {
        existing = existing.nextElementSibling;
    }
    
    const isOpen = existing && existing.style.display === 'block';

    // Close if already open
    if (isOpen) {
        existing.style.display = 'none';
        toggleBtn.classList.remove('expanded');
        return;
    }

    // Close any other open territory lists
    document.querySelectorAll('.border-territory-list').forEach(list => {
        list.style.display = 'none';
    });
    document.querySelectorAll('.border-list-btn.expanded').forEach(btn => {
        btn.classList.remove('expanded');
    });

    // Get the loaded GeoJSON data for this layer
    const layerConfig = {
        worldCountries: BOUNDARY_DATA.WORLD_COUNTRIES,
        nuts1: 'https://raw.githubusercontent.com/eurostat/Nuts2json/master/pub/v2/NUTS2021/NUTS1/20M/4326/NUTS1_2021_20M.geojson',
        nuts2: 'https://raw.githubusercontent.com/eurostat/Nuts2json/master/pub/v2/NUTS2021/NUTS2/20M/4326/NUTS2_2021_20M.geojson',
        nuts3: 'https://raw.githubusercontent.com/eurostat/Nuts2json/master/pub/v2/NUTS2021/NUTS3/20M/4326/NUTS3_2021_20M.geojson',
        spainCCAA: BOUNDARY_DATA.SPAIN_CCAA,
        spainProvinces: BOUNDARY_DATA.SPAIN_PROVINCES,
        spainComarques: BOUNDARY_DATA.SPAIN_COMARCAS,
        spainMunicipalities: BOUNDARY_DATA.SPAIN_MUNICIPALITIES,
        spainCensus: BOUNDARY_DATA.SPAIN_CENSUS,
        catProvinces: BOUNDARY_DATA.SPAIN_PROVINCES,
        catComarques: BOUNDARY_DATA.CAT_COMARQUES,
        catMunicipalities: BOUNDARY_DATA.CAT_MUNICIPALITIES,
        catCensus: BOUNDARY_DATA.CAT_CENSUS,
        irelandCounties: BOUNDARY_DATA.IRELAND_COUNTIES,
        irelandMunicipalDistricts: BOUNDARY_DATA.IRELAND_MUNICIPAL_DISTRICTS
    };

    // Check if this is a per-country custom border set
    if (window.COUNTRY_BORDER_SETS) {
        for (const country in window.COUNTRY_BORDER_SETS) {
            const sets = window.COUNTRY_BORDER_SETS[country];
            for (const set of sets) {
                if (set.layerKey === layerName) {
                    layerConfig[layerName] = set.url;
                    break;
                }
            }
        }
    }

    const url = layerConfig[layerName];
    if (!url) {
        console.warn('[TERRITORY LIST] No URL configured for layer:', layerName);
        return;
    }

    // Check if data is already cached
    const cachedData = geojsonCache[url];
    if (!cachedData || !cachedData.features) {
        // Data not loaded yet
        let list = existing;
        if (!list) {
            list = document.createElement('div');
            list.className = 'border-territory-list';
            container.insertAdjacentElement('afterend', list);
        }
        list.innerHTML = '<div class="border-territory-list-message">Layer not loaded yet. Click the 👁️ button first to load the boundary data.</div>';
        list.style.display = 'block';
        toggleBtn.classList.add('expanded');
        return;
    }

    const features = cachedData.features;
    const count = features.length;

    // Create list if it doesn't exist
    let list = existing;
    if (!list) {
        list = document.createElement('div');
        list.className = 'border-territory-list';
        container.insertAdjacentElement('afterend', list);
    }

    // Check 100 element limit
    if (count > 100) {
        list.innerHTML = `<div class="border-territory-list-message">This boundary set contains ${count} territories, which is too many to display in a simple list. A paginated/filtered view will be implemented in the future.</div>`;
        list.style.display = 'block';
        toggleBtn.classList.add('expanded');
        return;
    }

    // Build the territory list
    const territoryItems = features.map((feature, idx) => {
        const props = feature.properties || {};
        const name = props.name || props.NAME || props.NAME_1 || props.nombre || props.NOMBRE || 
                     props.nuts_name || props.NUTS_NAME || props.nameunit || props.nom || props.NOM ||
                     props.NOMCOMAR || props.NOM_COMAR || props.ADMIN || props.NAME_EN || 
                     props.NAME_LONG || props.admin || `Territory ${idx + 1}`;
        return `<div class="border-territory-list-item" data-feature-id="${feature.id || idx}">${name}</div>`;
    }).join('');

    list.innerHTML = territoryItems;
    list.style.display = 'block';
    toggleBtn.classList.add('expanded');

    // Add click handlers to highlight territory when clicked
    list.querySelectorAll('.border-territory-list-item').forEach((item, idx) => {
        item.addEventListener('click', () => {
            const feature = features[idx];
            if (feature) {
                const props = feature.properties || {};
                const name = props.name || props.NAME || props.NAME_1 || 'Unknown';
                const population = props.POP_EST || props.population || props.POBLACION || '—';
                const region = props.CONTINENT || props.country || props.ADMIN || props.CCAA || '—';
                
                // Show info box for this territory
                updateTerritoryInfo({ 
                    name, 
                    type: layerName, 
                    population: population || '—', 
                    region: region || '—', 
                    notes: '—' 
                }, null);
            }
        });
    });
}

function setupBoundaryControls() {
    // Accessible accordion: expand/collapse on button click (event delegation, safe to call multiple times)
    const boundaryControls = document.querySelector('.boundary-controls');
    if (boundaryControls && !boundaryControls.dataset.accordionWired) {
        boundaryControls.dataset.accordionWired = '1';
        boundaryControls.addEventListener('click', (e) => {
            const btn = e.target.closest('.border-expand-btn');
            if (!btn) return;
            const subgroup = btn.closest('.border-subgroup');
            if (!subgroup) return;
            e.stopPropagation();
            const expanded = subgroup.getAttribute('data-expanded') === 'true';
            subgroup.setAttribute('data-expanded', expanded ? 'false' : 'true');
            btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
    }

    // Populate continent country lists (once)
    if (boundaryControls && !boundaryControls.dataset.continentListsPopulated) {
        boundaryControls.dataset.continentListsPopulated = '1';
        ['europe','asia','africa','americas','other'].forEach(continent => {
            const listEl = document.querySelector(`.continent-country-list[data-continent="${continent}"]`);
            const selectedEl = document.querySelector(`.continent-selected-countries[data-continent="${continent}"]`);
            if (!listEl || !selectedEl || !CONTINENT_COUNTRIES[continent]) return;
            const preChecked = continent === 'europe'
                ? ((typeof window !== 'undefined' && window.EUROPE_PRE_CHECKED_OVERRIDE) || EUROPE_PRE_CHECKED)
                : [];
            const hasSets = CONTINENT_HAS_BORDER_SETS[continent] || [];
            const countries = continent === 'europe' ? ['NUTS Regions','Catalunya', ...CONTINENT_COUNTRIES[continent]] : CONTINENT_COUNTRIES[continent];
            listEl.innerHTML = countries.map(c => {
                const key = c.replace(/\s+/g,'_');
                const checked = preChecked.includes(c) ? ' checked' : '';
                const hasBorderSets = hasSets.includes(c);
                const icon = hasBorderSets ? '✅' : '❌';
                return `<label><input type="checkbox" data-continent="${continent}" data-country="${key}"${checked}> <span class="country-status-icon" title="${hasBorderSets ? 'Has border sets' : 'No border sets yet'}">${icon}</span> ${c}</label>`;
            }).join('');
            listEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.addEventListener('change', (e) => {
                    const continent = e.target.dataset.continent;
                    const country = e.target.dataset.country.replace(/_/g,' ');
                    const selectedEl = document.querySelector(`.continent-selected-countries[data-continent="${continent}"]`);
                    if (!selectedEl) return;
                    const contentId = continent === 'europe' && EUROPE_LIST_TO_BORDER_SET[country];
                    if (contentId) {
                        const contentEl = document.getElementById(contentId);
                        const subgroup = contentEl ? contentEl.closest('.border-subgroup') : null;
                        if (subgroup) {
                            subgroup.style.display = e.target.checked ? '' : 'none';
                            return;
                        }
                    }
                    if (e.target.checked) {
                        const id = `country-${continent}-${e.target.dataset.country}`;
                        if (selectedEl.querySelector(`#${id}`)) return;
                        const subgroup = document.createElement('div');
                        subgroup.className = 'border-subgroup';
                        subgroup.dataset.expanded = 'false';
                        subgroup.id = id;
                        subgroup.innerHTML = `
                            <div class="border-subgroup-header">
                                <button type="button" class="border-expand-btn" aria-expanded="false" aria-controls="${id}-content">
                                    <span class="border-summary-label"><strong>${country}</strong></span>
                                    <span class="border-summary-spacer"></span>
                                    <span class="border-triangle">▶</span>
                                </button>
                                <details class="border-info-details"><summary class="border-info-btn" title="Info">ℹ️</summary><div class="border-info-content"><p>Regional borders (embryonic)</p><details class="border-info-geojson-details"><summary class="border-info-geojson-summary">▶ GeoJSON data</summary><div class="border-info-geojson-body"><p>Source: TBD</p><p>URL: —</p></div></details></div></details>
                            </div>
                            <div id="${id}-content" class="border-sub-content">
                                <p class="border-placeholder-text"><em>Territory list coming soon. If this set has more than 100 elements, the list will be hidden and replaced by a future paginated view.</em></p>
                            </div>
                        `;
                        selectedEl.appendChild(subgroup);
                    } else {
                        const id = `country-${continent}-${e.target.dataset.country}`;
                        const el = selectedEl.querySelector(`#${id}`);
                        if (el) el.remove();
                    }
                });
            });
        });
        document.querySelectorAll('.continent-country-list[data-continent="europe"] input[type="checkbox"]').forEach(cb => {
            const country = cb.dataset.country.replace(/_/g,' ');
            const contentId = EUROPE_LIST_TO_BORDER_SET[country];
            if (contentId) {
                const contentEl = document.getElementById(contentId);
                const subgroup = contentEl ? contentEl.closest('.border-subgroup') : null;
                if (subgroup) subgroup.style.display = cb.checked ? '' : 'none';
            }
        });
    }

    // Map boundary layer eye buttons (visibility toggle)
    function updateEyeButtonState(btn, isVisible) {
        if (!btn) return;
        if (isVisible) btn.classList.remove('eye-off'); else btn.classList.add('eye-off');
        btn.textContent = '👁️';
    }
    const layerEyeBtns = document.querySelectorAll('.boundary-controls .border-eye-btn[data-layer]');
    layerEyeBtns.forEach(btn => {
        if (btn.dataset.eyeWired) return;
        btn.dataset.eyeWired = '1';
        const layerName = btn.getAttribute('data-layer');
        const syncGroup = btn.getAttribute('data-sync-group');
        updateEyeButtonState(btn, boundaryLayersVisible[layerName]);
        btn.addEventListener('click', async (e) => {
            const isChecked = !boundaryLayersVisible[layerName];
            if (syncGroup) {
                document.querySelectorAll(`.boundary-controls .border-eye-btn[data-sync-group="${syncGroup}"]`).forEach(b => {
                    updateEyeButtonState(b, isChecked);
                });
            } else {
                updateEyeButtonState(btn, isChecked);
            }
            await toggleBoundaryLayer(layerName, isChecked);
        });
    });

    // Boundary style buttons (palette)
    const styleBtns = document.querySelectorAll('.boundary-controls .border-style-btn[data-layer]');
    styleBtns.forEach(btn => {
        if (btn.dataset.styleWired) return;
        btn.dataset.styleWired = '1';
        const layerName = btn.getAttribute('data-layer');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const header = btn.closest('.border-control-header');
            if (!header || !layerName) return;
            openBoundaryStyleEditor(layerName, header);
        });
    });

    // Territory list buttons (▶ expander)
    const listBtns = document.querySelectorAll('.boundary-controls .border-list-btn[data-layer]');
    listBtns.forEach(btn => {
        if (btn.dataset.listWired) return;
        btn.dataset.listWired = '1';
        const layerName = btn.getAttribute('data-layer');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const header = btn.closest('.border-control-header');
            if (!header || !layerName) return;
            toggleBoundaryTerritoryList(layerName, header, btn);
        });
    });

    // Info button toggle (only for new-style buttons that have data-layer).
    // IMPORTANT: do NOT bind to legacy <summary.border-info-btn> because preventDefault()
    // would break the native <details> toggle behaviour.
    document.querySelectorAll('.boundary-controls .border-info-btn[data-layer]').forEach(btn => {
        if (btn.dataset.infoWired) return;
        btn.dataset.infoWired = '1';
        const layerName = btn.getAttribute('data-layer');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!layerName) return;
            const header = btn.closest('.border-control-header');
            if (!header) return;
            const parent = header.parentElement;
            const infoContent = parent ? parent.querySelector(`.border-info-content[data-layer="${layerName}"]`) : null;
            if (!infoContent) return;

            const isOpen = infoContent.style.display === 'block';

            // Close all other new-style info panels
            document.querySelectorAll('.boundary-controls .border-info-content[data-layer]').forEach(content => {
                content.style.display = 'none';
            });
            document.querySelectorAll('.boundary-controls .border-info-btn[data-layer]').forEach(b => {
                b.classList.remove('active');
            });

            if (!isOpen) {
                infoContent.style.display = 'block';
                btn.classList.add('active');
            }
        });
    });

    // Generic accordion toggle behaviour
    document.addEventListener('click', (event) => {
        const button = event.target.closest('.accordion-toggle');
        if (!button) return;
        const accordionId = button.getAttribute('data-accordion');
        if (!accordionId) return;
        toggleAccordion(accordionId);
    });
}

function toggleAccordion(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    const toggle = accordion.previousElementSibling;
    accordion.classList.toggle('show');
    if (toggle) {
        toggle.classList.toggle('active');
    }
}

// Custom Border Sets Management
function setupCustomBorderSets() {
    const addBtn = document.getElementById('custom-border-add-btn');
    const nameInput = document.getElementById('custom-border-name-input');
    const urlInput = document.getElementById('custom-border-url-input');
    const listContainer = document.getElementById('custom-borders-list');

    // Load saved custom border sets from localStorage
    let customBorderSets = JSON.parse(localStorage.getItem('cartagrama_custom_border_sets') || '[]');

    function saveCustomBorderSets() {
        localStorage.setItem('cartagrama_custom_border_sets', JSON.stringify(customBorderSets));
    }

    function renderCustomBorderSets() {
        if (!listContainer) return;
        if (customBorderSets.length === 0) {
            listContainer.innerHTML = '<p style="font-size: 11px; color: #999; padding: 8px; text-align: center; font-style: italic;">No custom border sets added yet</p>';
            return;
        }

        listContainer.innerHTML = customBorderSets.map((set, idx) => {
            const layerKey = `custom_${set.id || idx}`;
            const isVisible = boundaryLayersVisible[layerKey] || false;
            return `
                <div class="border-sub-item" style="margin-bottom: 6px;">
                    <div class="border-control-header">
                        <label><strong>${set.name}</strong></label>
                        <button type="button" class="border-eye-btn" data-layer="${layerKey}" data-custom-idx="${idx}" aria-label="Toggle visibility">${isVisible ? '👁️' : '👁️'}</button>
                        <button type="button" class="border-style-btn" data-layer="${layerKey}" aria-label="Edit style">🎨</button>
                        <button type="button" class="border-list-btn" data-layer="${layerKey}" aria-label="Show territory list">▶</button>
                        <button type="button" class="custom-border-delete-btn" data-custom-idx="${idx}" style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; padding: 0; border: 1px solid #ccc; border-radius: 4px; background: #ffebee; cursor: pointer; font-size: 14px; flex-shrink: 0; margin-left: 4px;" aria-label="Delete">❌</button>
                        <details class="border-info-details"><summary class="border-info-btn" title="Info">ℹ️</summary><div class="border-info-content"><p><strong>${set.name}</strong></p><p>Custom boundary set</p><div class="border-info-source-row"><span class="border-info-source-label">URL:</span><span class="border-info-source-value">${set.url}</span><button class="border-info-url-copy-btn" onclick="navigator.clipboard.writeText('${set.url}'); this.textContent='✓ Copied'; setTimeout(() => this.textContent='📋 Copy', 1500)">📋 Copy</button></div><div class="border-info-source-row"><span class="border-info-source-label">Format:</span><span class="border-info-source-value">GeoJSON</span></div><div class="border-info-source-row"><span class="border-info-source-label">Added:</span><span class="border-info-source-value">${new Date(set.dateAdded).toLocaleDateString()}</span></div></div></details>
                    </div>
                </div>
            `;
        }).join('');

        // Re-wire event handlers for the newly rendered custom border sets
        setupBoundaryControls();

        // Add delete button handlers
        document.querySelectorAll('.custom-border-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const idx = parseInt(btn.dataset.customIdx);
                if (confirm(`Delete custom border set "${customBorderSets[idx].name}"?`)) {
                    const layerKey = `custom_${customBorderSets[idx].id || idx}`;
                    // Remove from map if loaded
                    if (boundaryLayers[layerKey]) {
                        if (currentProvider === 'mapbox' && currentMap) {
                            const fillLayerId = `${layerKey}-fill`;
                            const lineLayerId = `${layerKey}-line`;
                            if (currentMap.getLayer(fillLayerId)) currentMap.removeLayer(fillLayerId);
                            if (currentMap.getLayer(lineLayerId)) currentMap.removeLayer(lineLayerId);
                            if (currentMap.getSource(layerKey)) currentMap.removeSource(layerKey);
                        }
                        delete boundaryLayers[layerKey];
                        delete boundaryLayersVisible[layerKey];
                    }
                    // Remove from storage
                    customBorderSets.splice(idx, 1);
                    saveCustomBorderSets();
                    renderCustomBorderSets();
                }
            });
        });
    }

    if (addBtn && nameInput && urlInput) {
        addBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            const url = urlInput.value.trim();

            if (!name || !url) {
                alert('Please enter both a name and a URL');
                return;
            }

            // Basic URL validation
            try {
                new URL(url);
            } catch (e) {
                alert('Invalid URL format');
                return;
            }

            // Check if URL ends with .json or .geojson
            if (!url.match(/\.(geo)?json$/i)) {
                if (!confirm('URL doesn\'t appear to be a GeoJSON file. Add anyway?')) {
                    return;
                }
            }

            // Add to custom border sets
            const newSet = {
                id: Date.now(),
                name,
                url,
                dateAdded: new Date().toISOString()
            };

            customBorderSets.push(newSet);
            saveCustomBorderSets();

            // Clear inputs
            nameInput.value = '';
            urlInput.value = '';

            // Re-render
            renderCustomBorderSets();

            // Show success message
            alert(`Added "${name}"! Click the 👁️ button to load it on the map.`);
        });
    }

    // Initial render
    renderCustomBorderSets();

    // Make custom borders loadable
    window.CUSTOM_BORDER_SETS = customBorderSets;
}

// Call setup when boundary controls are ready
if (document.querySelector('.boundary-controls')) {
    setupCustomBorderSets();
}

// Per-Country Border Set Management System
// Info field edit functions (global for onclick handlers)
window.toggleInfoEdit = function(editBtn, layerName, fieldName) {
    const fieldRow = editBtn.closest('.border-info-field-row');
    if (!fieldRow) return;
    
    const valueDiv = fieldRow.querySelector('.border-info-field-value[data-field="' + fieldName + '"]');
    if (!valueDiv) return;
    
    // Check if already in edit mode
    const existingEditMode = fieldRow.querySelector('.border-info-edit-mode');
    if (existingEditMode) {
        existingEditMode.remove();
        return;
    }
    
    const currentValue = valueDiv.textContent;
    
    // Create edit UI
    const editDiv = document.createElement('div');
    editDiv.className = 'border-info-edit-mode';
    editDiv.innerHTML = `
        <input type="text" class="border-info-edit-input" value="${currentValue.replace(/"/g, '&quot;')}" />
        <div class="border-info-edit-buttons">
            <button class="border-info-edit-btn cancel" onclick="cancelInfoEdit(this)">Cancel</button>
            <button class="border-info-edit-btn save" onclick="saveInfoEdit(this, '${layerName}', '${fieldName}')">Save</button>
        </div>
    `;
    
    fieldRow.appendChild(editDiv);
    editDiv.querySelector('input').focus();
};

window.cancelInfoEdit = function(cancelBtn) {
    const editMode = cancelBtn.closest('.border-info-edit-mode');
    if (editMode) editMode.remove();
};

window.saveInfoEdit = function(saveBtn, layerName, fieldName) {
    const editMode = saveBtn.closest('.border-info-edit-mode');
    if (!editMode) return;
    
    const fieldRow = editMode.closest('.border-info-field-row');
    const valueDiv = fieldRow.querySelector('.border-info-field-value[data-field="' + fieldName + '"]');
    const input = editMode.querySelector('input');
    
    if (!valueDiv || !input) return;
    
    const newValue = input.value.trim();
    if (!newValue) {
        alert('Value cannot be empty');
        return;
    }
    
    // Update the display
    valueDiv.textContent = newValue;
    
    // Save to localStorage
    let borderSetInfo = JSON.parse(localStorage.getItem('cartagrama_border_set_info') || '{}');
    if (!borderSetInfo[layerName]) {
        borderSetInfo[layerName] = {};
    }
    borderSetInfo[layerName][fieldName] = newValue;
    localStorage.setItem('cartagrama_border_set_info', JSON.stringify(borderSetInfo));
    
    // If URL was changed, update the copy button
    if (fieldName === 'url') {
        const copyBtn = fieldRow.querySelector('.border-info-field-action-btn');
        if (copyBtn && copyBtn.textContent.includes('Copy')) {
            copyBtn.onclick = function() {
                navigator.clipboard.writeText(newValue);
                this.textContent = '✓ Copied';
                setTimeout(() => this.textContent = '📋 Copy', 1500);
            };
        }
    }
    
    editMode.remove();
    alert(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} updated for ${layerName}!`);
};

function setupPerCountryBorderSets() {
    // Load custom border sets per country from localStorage
    let countryBorderSets = JSON.parse(localStorage.getItem('cartagrama_country_border_sets') || '{}');
    // Structure: { "Catalunya": [{ id, name, url, layerKey, dateAdded }], "Spain": [...], ... }

    function saveCountryBorderSets() {
        localStorage.setItem('cartagrama_country_border_sets', JSON.stringify(countryBorderSets));
    }

    // Handle "Add Border Set" button clicks
    document.querySelectorAll('.add-border-set-btn').forEach(btn => {
        if (btn.dataset.wired) return;
        btn.dataset.wired = '1';
        
        btn.addEventListener('click', () => {
            const country = btn.dataset.country;
            if (!country) return;

            // Prompt for border set name and URL
            const name = prompt(`Enter border set name for ${country}:`);
            if (!name) return;

            const url = prompt(`Enter GeoJSON URL for "${name}":`);
            if (!url) return;

            // Validate URL
            try {
                new URL(url);
            } catch (e) {
                alert('Invalid URL format');
                return;
            }

            // Create unique layer key
            const layerKey = `${country.toLowerCase().replace(/\s+/g,'_')}_custom_${Date.now()}`;

            // Create new border set entry
            if (!countryBorderSets[country]) {
                countryBorderSets[country] = [];
            }

            const newSet = {
                id: Date.now(),
                name,
                url,
                layerKey,
                dateAdded: new Date().toISOString()
            };

            countryBorderSets[country].push(newSet);
            saveCountryBorderSets();

            // Add the new border set to the DOM
            addBorderSetToDOM(country, newSet, btn.closest('.border-sub-content'));

            alert(`Added "${name}" to ${country}! Click the 👁️ button to load it.`);
        });
    });

    // Add a border set to the DOM
    function addBorderSetToDOM(country, borderSet, container) {
        const addBtnContainer = container.querySelector('.add-border-set-container');
        if (!addBtnContainer) return;

        const borderSetItem = document.createElement('div');
        borderSetItem.className = 'border-sub-item';
        borderSetItem.dataset.customBorderSet = borderSet.layerKey;
        borderSetItem.innerHTML = `
            <div class="border-control-header">
                <label><strong>${borderSet.name}</strong></label>
                <button type="button" class="border-eye-btn" data-layer="${borderSet.layerKey}" aria-label="Toggle visibility">👁️</button>
                <button type="button" class="border-style-btn" data-layer="${borderSet.layerKey}" aria-label="Edit style">🎨</button>
                <button type="button" class="border-list-btn" data-layer="${borderSet.layerKey}" aria-label="Show territory list">▶</button>
                <details class="border-info-details">
                    <summary class="border-info-btn" title="Info">ℹ️</summary>
                    <div class="border-info-content">
                        <p><strong>${borderSet.name}</strong></p>
                        <p>Custom border set for ${country}</p>
                        <div class="border-info-source-row">
                            <span class="border-info-source-label">URL:</span>
                            <span class="border-info-source-value">${borderSet.url}</span>
                            <button class="border-info-url-copy-btn" onclick="navigator.clipboard.writeText('${borderSet.url}'); this.textContent='✓'; setTimeout(() => this.textContent='📋 Copy', 1500)">📋 Copy</button>
                        </div>
                        <div class="border-info-source-row">
                            <span class="border-info-source-label">Format:</span>
                            <span class="border-info-source-value">GeoJSON</span>
                        </div>
                        <div class="border-info-source-row">
                            <span class="border-info-source-label">Added:</span>
                            <span class="border-info-source-value">${new Date(borderSet.dateAdded).toLocaleDateString()}</span>
                        </div>
                        <span class="border-info-edit-toggle" onclick="toggleBorderSetEdit('${borderSet.layerKey}', '${country}')">✏️ Edit URL</span>
                        <div class="border-info-edit-mode" id="edit-${borderSet.layerKey}" style="display:none;">
                            <div class="border-info-edit-label">Edit GeoJSON URL:</div>
                            <input type="text" class="border-info-edit-input" value="${borderSet.url}" data-layer="${borderSet.layerKey}">
                            <div class="border-info-edit-buttons">
                                <button class="border-info-edit-btn cancel" onclick="cancelBorderSetEdit('${borderSet.layerKey}')">Cancel</button>
                                <button class="border-info-edit-btn save" onclick="saveBorderSetEdit('${borderSet.layerKey}', '${country}')">Save</button>
                            </div>
                        </div>
                        <button style="margin-top: 8px; width: 100%; padding: 4px; font-size: 10px; background: #ffebee; border: 1px solid #f44336; border-radius: 3px; cursor: pointer;" onclick="deleteCountryBorderSet('${borderSet.layerKey}', '${country}')">🗑️ Delete Border Set</button>
                    </div>
                </details>
            </div>
        `;

        // Insert before the add button container
        addBtnContainer.parentNode.insertBefore(borderSetItem, addBtnContainer);

        // Re-wire event handlers
        setupBoundaryControls();
    }

    // Restore saved border sets on page load
    Object.keys(countryBorderSets).forEach(country => {
        const sets = countryBorderSets[country];
        if (!sets || sets.length === 0) return;

        // Find the country's content container
        const subgroup = document.querySelector(`.border-subgroup[data-list-country="${country}"]`);
        if (!subgroup) return;

        const content = subgroup.querySelector('.border-sub-content');
        if (!content) return;

        sets.forEach(borderSet => {
            addBorderSetToDOM(country, borderSet, content);
        });
    });

    // Expose functions globally for inline onclick handlers
    window.toggleBorderSetEdit = function(layerKey, country) {
        const editDiv = document.getElementById(`edit-${layerKey}`);
        if (editDiv) {
            editDiv.style.display = editDiv.style.display === 'none' ? 'block' : 'none';
        }
    };

    window.cancelBorderSetEdit = function(layerKey) {
        const editDiv = document.getElementById(`edit-${layerKey}`);
        if (editDiv) editDiv.style.display = 'none';
    };

    window.saveBorderSetEdit = function(layerKey, country) {
        const editDiv = document.getElementById(`edit-${layerKey}`);
        if (!editDiv) return;

        const input = editDiv.querySelector('.border-info-edit-input');
        if (!input) return;

        const newUrl = input.value.trim();
        if (!newUrl) {
            alert('URL cannot be empty');
            return;
        }

        // Validate URL
        try {
            new URL(newUrl);
        } catch (e) {
            alert('Invalid URL format');
            return;
        }

        // Update in storage
        if (countryBorderSets[country]) {
            const set = countryBorderSets[country].find(s => s.layerKey === layerKey);
            if (set) {
                set.url = newUrl;
                saveCountryBorderSets();

                // Update UI
                const urlValue = editDiv.closest('.border-info-content').querySelector('.border-info-source-value');
                if (urlValue) urlValue.textContent = newUrl;

                // Update copy button
                const copyBtn = editDiv.closest('.border-info-content').querySelector('.border-info-url-copy-btn');
                if (copyBtn) {
                    copyBtn.onclick = () => {
                        navigator.clipboard.writeText(newUrl);
                        copyBtn.textContent = '✓';
                        setTimeout(() => copyBtn.textContent = '📋 Copy', 1500);
                    };
                }

                editDiv.style.display = 'none';

                // Clear cached data so it reloads with new URL
                if (geojsonCache[set.url]) {
                    delete geojsonCache[set.url];
                }

                alert('URL updated! Click 👁️ to reload with new data.');
            }
        }
    };

    window.deleteCountryBorderSet = function(layerKey, country) {
        if (!confirm('Delete this border set?')) return;

        // Remove from storage
        if (countryBorderSets[country]) {
            countryBorderSets[country] = countryBorderSets[country].filter(s => s.layerKey !== layerKey);
            if (countryBorderSets[country].length === 0) {
                delete countryBorderSets[country];
            }
            saveCountryBorderSets();
        }

        // Remove from map if loaded
        if (boundaryLayers[layerKey]) {
            if (currentProvider === 'mapbox' && currentMap) {
                const fillLayerId = `${layerKey}-fill`;
                const lineLayerId = `${layerKey}-line`;
                if (currentMap.getLayer(fillLayerId)) currentMap.removeLayer(fillLayerId);
                if (currentMap.getLayer(lineLayerId)) currentMap.removeLayer(lineLayerId);
                if (currentMap.getSource(layerKey)) currentMap.removeSource(layerKey);
            }
            delete boundaryLayers[layerKey];
            delete boundaryLayersVisible[layerKey];
        }

        // Remove from DOM
        const item = document.querySelector(`[data-custom-border-set="${layerKey}"]`);
        if (item) item.remove();
    };

    // Update loadBoundaryLayer to handle country custom border sets
    window.COUNTRY_BORDER_SETS = countryBorderSets;
}

// Initialize per-country border sets
if (document.querySelector('.boundary-controls')) {
    setupPerCountryBorderSets();
}

/* --- Pandora host wiring (not in Cartagrama.html) --- */
function wireTerritoryApplyButtonPandora() {
    const applyBtn = document.getElementById('territory-apply-btn');
    if (!applyBtn || applyBtn.dataset.cartagramaWired) return;
    applyBtn.dataset.cartagramaWired = '1';
    applyBtn.disabled = true;
    applyBtn.addEventListener('click', () => {
        if (!selectedTerritory || !selectedTerritory.type || !selectedTerritory.name) return;
        const nameEl = document.getElementById('territory-name');
        const popEl = document.getElementById('territory-population');
        const regionEl = document.getElementById('territory-region');
        const notesEl = document.getElementById('territory-notes');
        const data = {
            name: nameEl ? nameEl.textContent.trim() : '',
            population: popEl ? popEl.textContent.trim() : '',
            region: regionEl ? regionEl.textContent.trim() : '',
            notes: notesEl ? notesEl.textContent.trim() : ''
        };
        if (typeof saveTerritoryInfoFieldsData === 'function') {
            saveTerritoryInfoFieldsData(selectedTerritory.type, selectedTerritory.name, data);
        }
    });
}

function cartagramaTerritoriesInit() {
    if (typeof setupTerritoryInfoAccordions === 'function') setupTerritoryInfoAccordions();
    wireTerritoryInfoBoxControls();
    wireTerritoryApplyButtonPandora();
    const closeTerritoryInfoBtn = document.getElementById('close-territory-info-btn');
    if (closeTerritoryInfoBtn && !closeTerritoryInfoBtn.dataset.cartagramaWired) {
        closeTerritoryInfoBtn.dataset.cartagramaWired = '1';
        closeTerritoryInfoBtn.addEventListener('click', () => {
            if (typeof window.closeTerritoryInfoBox === 'function') window.closeTerritoryInfoBox();
        });
    }
    if (document.querySelector('.boundary-controls')) {
        if (typeof setupBoundaryControls === 'function') setupBoundaryControls();
        if (typeof setupCustomBorderSets === 'function') setupCustomBorderSets();
        if (typeof setupPerCountryBorderSets === 'function') setupPerCountryBorderSets();
    }
}

window.cartagramaSetMapContext = function (map, provider) {
    currentMap = map;
    window.currentMap = map || null;
    currentProvider = provider || 'openstreetmap';
    if (map && typeof reloadVisibleBoundaryLayers === 'function') {
        reloadVisibleBoundaryLayers();
    }
    if (map && window.BARNA_PORTAL_MARKERS) {
        requestAnimationFrame(() => window.BARNA_PORTAL_MARKERS.sync());
    }
};

window.setupBoundaryControls = setupBoundaryControls;
window.reloadVisibleBoundaryLayers = reloadVisibleBoundaryLayers;
window.ensureBoundaryLayersOnMap = ensureBoundaryLayersOnMap;
window.toggleBoundaryLayer = toggleBoundaryLayer;
window.highlightTerritoryOnMap = highlightTerritoryOnMap;
window.resetTerritoryInfo = resetTerritoryInfo;
window.wireTerritoryInfoBoxControls = wireTerritoryInfoBoxControls;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cartagramaTerritoriesInit);
} else {
    cartagramaTerritoriesInit();
}

})();
