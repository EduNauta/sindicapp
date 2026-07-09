/* sindicapp/sindicapp-locale-geo-data.js */
/** Ireland counties + municipal districts; España CCAA → provincia → comarca → municipio (SindicApp locale geo). */
(function (global) {
    /** Catalunya v1 — expand ES_TERRITORY_TREE for more CCAA later. Census sections: map only, no local teams. */
    const ES_TERRITORY_TREE = [
        {
            id: 'catalunya',
            label: 'Catalunya',
            provinces: [
                {
                    id: 'barcelona',
                    label: 'Barcelona',
                    comarques: [
                        {
                            id: 'barcelones',
                            label: 'Barcelonès',
                            municipalities: [
                                { id: 'municipality-barcelona', label: 'Barcelona' },
                                { id: 'municipality-hospitalet', label: "L'Hospitalet de Llobregat" },
                                { id: 'municipality-badalona', label: 'Badalona' }
                            ]
                        },
                        {
                            id: 'maresme',
                            label: 'Maresme',
                            municipalities: [
                                { id: 'municipality-mataro', label: 'Mataró' },
                                { id: 'municipality-premia', label: 'El Masnou' }
                            ]
                        }
                    ]
                },
                {
                    id: 'girona',
                    label: 'Girona',
                    comarques: [
                        {
                            id: 'girones',
                            label: 'Gironès',
                            municipalities: [
                                { id: 'municipality-girona', label: 'Girona' },
                                { id: 'municipality-salt', label: 'Salt' }
                            ]
                        },
                        {
                            id: 'baix-emporda',
                            label: 'Baix Empordà',
                            municipalities: [
                                { id: 'municipality-palafrugell', label: 'Palafrugell' }
                            ]
                        }
                    ]
                },
                {
                    id: 'lleida',
                    label: 'Lleida',
                    comarques: [
                        {
                            id: 'segria',
                            label: 'Segrià',
                            municipalities: [
                                { id: 'municipality-lleida', label: 'Lleida' },
                                { id: 'municipality-mollerussa', label: 'Mollerussa' }
                            ]
                        }
                    ]
                },
                {
                    id: 'tarragona',
                    label: 'Tarragona',
                    comarques: [
                        {
                            id: 'tarragones',
                            label: 'Tarragonès',
                            municipalities: [
                                { id: 'municipality-tarragona', label: 'Tarragona' },
                                { id: 'municipality-reus', label: 'Reus' }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    const ES_MUNICIPALITY_ID_ALIASES = {
        'municipality-1': 'municipality-barcelona',
        'municipality-2': 'municipality-girona',
        'municipality-3': 'municipality-lleida'
    };

    function getCcaaTeamId(ccaaId) {
        return ccaaId ? `ccaa-${ccaaId}` : '';
    }

    function getProvinceTeamId(provinceId) {
        return provinceId ? `province-${provinceId}` : '';
    }

    function getComarcaTeamId(comarcaId) {
        return comarcaId ? `comarca-${comarcaId}` : '';
    }

    function getSpainGeoTeamsFlat() {
        const teams = [];
        ES_TERRITORY_TREE.forEach((ccaa) => {
            teams.push({
                id: getCcaaTeamId(ccaa.id),
                label: ccaa.label,
                level: 'ccaa',
                ccaaId: ccaa.id,
                ccaaLabel: ccaa.label
            });
            (ccaa.provinces || []).forEach((province) => {
                teams.push({
                    id: getProvinceTeamId(province.id),
                    label: province.label,
                    level: 'province',
                    ccaaId: ccaa.id,
                    ccaaLabel: ccaa.label,
                    provinceId: province.id,
                    provinceLabel: province.label
                });
                (province.comarques || []).forEach((comarca) => {
                    teams.push({
                        id: getComarcaTeamId(comarca.id),
                        label: comarca.label,
                        level: 'comarca',
                        ccaaId: ccaa.id,
                        ccaaLabel: ccaa.label,
                        provinceId: province.id,
                        provinceLabel: province.label,
                        comarcaId: comarca.id,
                        comarcaLabel: comarca.label
                    });
                    (comarca.municipalities || []).forEach((muni) => {
                        teams.push({
                            id: muni.id,
                            label: muni.label,
                            shortLabel: muni.shortLabel || muni.label,
                            level: 'municipality',
                            ccaaId: ccaa.id,
                            ccaaLabel: ccaa.label,
                            provinceId: province.id,
                            provinceLabel: province.label,
                            comarcaId: comarca.id,
                            comarcaLabel: comarca.label
                        });
                    });
                });
            });
        });
        return teams;
    }

    /** @deprecated Use getSpainGeoTeamsFlat(); kept for callers expecting GEO_TEAMS_ES. */
    const GEO_TEAMS_ES = getSpainGeoTeamsFlat();

    /** @type {{ id: string, label: string, municipalDistricts: { id: string, label: string }[] }[]} */
    const IE_COUNTIES = [
        {
            id: 'carlow',
            label: 'Carlow',
            municipalDistricts: [
                { id: 'md-carlow', label: 'Municipal District of Carlow' },
                { id: 'md-muinebeag', label: 'Municipal District of Muinebeag' },
                { id: 'md-tullow', label: 'Municipal District of Tullow' }
            ]
        },
        {
            id: 'cavan',
            label: 'Cavan',
            municipalDistricts: [
                { id: 'md-cavan-belturbet', label: 'Municipal District of Cavan–Belturbet' },
                { id: 'md-bailieborough-cootehill', label: 'Municipal District of Bailieborough–Cootehill' },
                { id: 'md-ballyjamesduff', label: 'Municipal District of Ballyjamesduff' }
            ]
        },
        {
            id: 'clare',
            label: 'Clare',
            municipalDistricts: [
                { id: 'md-ennistymon', label: 'Municipal District of Ennistymon' },
                { id: 'md-kilrush', label: 'Municipal District of Kilrush' },
                { id: 'md-shannon', label: 'Municipal District of Shannon' },
                { id: 'md-ennis', label: 'Municipal District of Ennis' }
            ]
        },
        {
            id: 'cork',
            label: 'Cork',
            municipalDistricts: [
                { id: 'md-cork-city-north-east', label: 'Municipal District of Cork City North East' },
                { id: 'md-cork-city-south-east', label: 'Municipal District of Cork City South East' },
                { id: 'md-cork-city-south-west', label: 'Municipal District of Cork City South West' },
                { id: 'md-cork-city-north-west', label: 'Municipal District of Cork City North West' },
                { id: 'md-bandon-kinsale', label: 'Municipal District of Bandon–Kinsale' },
                { id: 'md-carrigaline', label: 'Municipal District of Carrigaline' },
                { id: 'md-cobh', label: 'Municipal District of Cobh' },
                { id: 'md-east-cork', label: 'Municipal District of East Cork' },
                { id: 'md-fermoy', label: 'Municipal District of Fermoy' },
                { id: 'md-kanturk-mallow', label: 'Municipal District of Kanturk–Mallow' },
                { id: 'md-macroom', label: 'Municipal District of Macroom' },
                { id: 'md-west-cork', label: 'Municipal District of West Cork' }
            ]
        },
        {
            id: 'donegal',
            label: 'Donegal',
            municipalDistricts: [
                { id: 'md-letterkenny', label: 'Municipal District of Letterkenny' },
                { id: 'md-glenties', label: 'Municipal District of Glenties' },
                { id: 'md-inishowen', label: 'Municipal District of Inishowen' },
                { id: 'md-donegal', label: 'Municipal District of Donegal' },
                { id: 'md-stranorlar', label: 'Municipal District of Stranorlar' },
                { id: 'md-buncrana', label: 'Municipal District of Buncrana' }
            ]
        },
        {
            id: 'dublin',
            label: 'Dublin',
            municipalDistricts: [
                { id: 'md-dublin-city', label: 'Dublin City Council' },
                { id: 'md-dun-laoghaire-rathdown', label: 'Dún Laoghaire–Rathdown County Council' },
                { id: 'md-fingal', label: 'Fingal County Council' },
                { id: 'md-south-dublin', label: 'South Dublin County Council' }
            ]
        },
        {
            id: 'galway',
            label: 'Galway',
            municipalDistricts: [
                { id: 'md-galway-city-east', label: 'Municipal District of Galway City East' },
                { id: 'md-galway-city-central', label: 'Municipal District of Galway City Central' },
                { id: 'md-galway-city-west', label: 'Municipal District of Galway City West' },
                { id: 'md-ballinasloe', label: 'Municipal District of Ballinasloe' },
                { id: 'md-connemara', label: 'Municipal District of Connemara' },
                { id: 'md-loughrea', label: 'Municipal District of Loughrea' },
                { id: 'md-athenry-ortanmore', label: 'Municipal District of Athenry–Oranmore' },
                { id: 'md-tuam', label: 'Municipal District of Tuam' }
            ]
        },
        {
            id: 'kerry',
            label: 'Kerry',
            municipalDistricts: [
                { id: 'md-killarney', label: 'Municipal District of Killarney' },
                { id: 'md-listowel', label: 'Municipal District of Listowel' },
                { id: 'md-south-kerry', label: 'Municipal District of South Kerry' },
                { id: 'md-tralee', label: 'Municipal District of Tralee' },
                { id: 'md-corca-dhuibhne', label: 'Municipal District of Corca Dhuibhne' }
            ]
        },
        {
            id: 'kildare',
            label: 'Kildare',
            municipalDistricts: [
                { id: 'md-athy', label: 'Municipal District of Athy' },
                { id: 'md-clane', label: 'Municipal District of Clane' },
                { id: 'md-kildare-newbridge', label: 'Municipal District of Kildare–Newbridge' },
                { id: 'md-naas', label: 'Municipal District of Naas' },
                { id: 'md-maynooth', label: 'Municipal District of Maynooth' }
            ]
        },
        {
            id: 'kilkenny',
            label: 'Kilkenny',
            municipalDistricts: [
                { id: 'md-kilkenny-city', label: 'Municipal District of Kilkenny City' },
                { id: 'md-piltown', label: 'Municipal District of Piltown' },
                { id: 'md-castlecomer', label: 'Municipal District of Castlecomer' },
                { id: 'md-callan-thomastown', label: 'Municipal District of Callan–Thomastown' }
            ]
        },
        {
            id: 'laois',
            label: 'Laois',
            municipalDistricts: [
                { id: 'md-portlaoise', label: 'Municipal District of Portlaoise' },
                { id: 'md-graiguecullen-portarlington', label: 'Municipal District of Graiguecullen–Portarlington' },
                { id: 'md-mountmellick-borris-in-ossory', label: 'Municipal District of Mountmellick–Borris-in-Ossory' }
            ]
        },
        {
            id: 'leitrim',
            label: 'Leitrim',
            municipalDistricts: [
                { id: 'md-carrick-on-shannon', label: 'Municipal District of Carrick-on-Shannon' },
                { id: 'md-manorhamilton', label: 'Municipal District of Manorhamilton' },
                { id: 'md-ballinamore', label: 'Municipal District of Ballinamore' }
            ]
        },
        {
            id: 'limerick',
            label: 'Limerick',
            municipalDistricts: [
                { id: 'md-limerick-city-east', label: 'Municipal District of Limerick City East' },
                { id: 'md-limerick-city-north', label: 'Municipal District of Limerick City North' },
                { id: 'md-limerick-city-south', label: 'Municipal District of Limerick City South' },
                { id: 'md-adare-rathkeale', label: 'Municipal District of Adare–Rathkeale' },
                { id: 'md-cappamore-kilmallock', label: 'Municipal District of Cappamore–Kilmallock' },
                { id: 'md-newcastlewest', label: 'Municipal District of Newcastle West' }
            ]
        },
        {
            id: 'longford',
            label: 'Longford',
            municipalDistricts: [
                { id: 'md-longford', label: 'Municipal District of Longford' },
                { id: 'md-granard', label: 'Municipal District of Granard' },
                { id: 'md-ballymahon', label: 'Municipal District of Ballymahon' }
            ]
        },
        {
            id: 'louth',
            label: 'Louth',
            municipalDistricts: [
                { id: 'md-dundalk', label: 'Municipal District of Dundalk' },
                { id: 'md-ardee', label: 'Municipal District of Ardee' },
                { id: 'md-drogheda', label: 'Municipal District of Drogheda' }
            ]
        },
        {
            id: 'mayo',
            label: 'Mayo',
            municipalDistricts: [
                { id: 'md-ballina', label: 'Municipal District of Ballina' },
                { id: 'md-castlebar', label: 'Municipal District of Castlebar' },
                { id: 'md-claremorris', label: 'Municipal District of Claremorris' },
                { id: 'md-south-mayo', label: 'Municipal District of South Mayo' },
                { id: 'md-west-mayo', label: 'Municipal District of West Mayo' },
                { id: 'md-belmullet', label: 'Municipal District of Belmullet' }
            ]
        },
        {
            id: 'meath',
            label: 'Meath',
            municipalDistricts: [
                { id: 'md-ashbourne', label: 'Municipal District of Ashbourne' },
                { id: 'md-kells', label: 'Municipal District of Kells' },
                { id: 'md-laytown-bettystown', label: 'Municipal District of Laytown–Bettystown' },
                { id: 'md-navan', label: 'Municipal District of Navan' },
                { id: 'md-ratoath', label: 'Municipal District of Ratoath' },
                { id: 'md-trim', label: 'Municipal District of Trim' }
            ]
        },
        {
            id: 'monaghan',
            label: 'Monaghan',
            municipalDistricts: [
                { id: 'md-monaghan', label: 'Municipal District of Monaghan' },
                { id: 'md-carrickmacross-castleblayney', label: 'Municipal District of Carrickmacross–Castleblayney' },
                { id: 'md-ballybay-clones', label: 'Municipal District of Ballybay–Clones' }
            ]
        },
        {
            id: 'offaly',
            label: 'Offaly',
            municipalDistricts: [
                { id: 'md-tullamore', label: 'Municipal District of Tullamore' },
                { id: 'md-birr', label: 'Municipal District of Birr' },
                { id: 'md-edenderry', label: 'Municipal District of Edenderry' }
            ]
        },
        {
            id: 'roscommon',
            label: 'Roscommon',
            municipalDistricts: [
                { id: 'md-roscommon', label: 'Municipal District of Roscommon' },
                { id: 'md-boyle', label: 'Municipal District of Boyle' },
                { id: 'md-athlone', label: 'Municipal District of Athlone' }
            ]
        },
        {
            id: 'sligo',
            label: 'Sligo',
            municipalDistricts: [
                { id: 'md-sligo', label: 'Municipal District of Sligo' },
                { id: 'md-ballymote-tubbercurry', label: 'Municipal District of Ballymote–Tubbercurry' },
                { id: 'md-sligo-drumcliff', label: 'Municipal District of Sligo–Drumcliff' }
            ]
        },
        {
            id: 'tipperary',
            label: 'Tipperary',
            municipalDistricts: [
                { id: 'md-cahir-cashel', label: 'Municipal District of Cahir–Cashel' },
                { id: 'md-clonmel', label: 'Municipal District of Clonmel' },
                { id: 'md-nenagh', label: 'Municipal District of Nenagh' },
                { id: 'md-thurles', label: 'Municipal District of Thurles' },
                { id: 'md-carrick-on-suir', label: 'Municipal District of Carrick-on-Suir' },
                { id: 'md-newport', label: 'Municipal District of Newport' },
                { id: 'md-roscrea-templemore', label: 'Municipal District of Roscrea–Templemore' },
                { id: 'md-templemore-thurles', label: 'Municipal District of Templemore–Thurles' }
            ]
        },
        {
            id: 'waterford',
            label: 'Waterford',
            municipalDistricts: [
                { id: 'md-waterford', label: 'Municipal District of Waterford City & County' },
                { id: 'md-dungarvan', label: 'Municipal District of Dungarvan' },
                { id: 'md-lismore', label: 'Municipal District of Lismore' },
                { id: 'md-tramore', label: 'Municipal District of Tramore' }
            ]
        },
        {
            id: 'westmeath',
            label: 'Westmeath',
            municipalDistricts: [
                { id: 'md-athlone-moate', label: 'Municipal District of Athlone–Moate' },
                { id: 'md-mullingar', label: 'Municipal District of Mullingar' },
                { id: 'md-kinnegad', label: 'Municipal District of Kinnegad' }
            ]
        },
        {
            id: 'wexford',
            label: 'Wexford',
            municipalDistricts: [
                { id: 'md-wexford', label: 'Municipal District of Wexford' },
                { id: 'md-enniscorthy', label: 'Municipal District of Enniscorthy' },
                { id: 'md-new-ross', label: 'Municipal District of New Ross' },
                { id: 'md-gorey', label: 'Municipal District of Gorey' },
                { id: 'md-rosslare', label: 'Municipal District of Rosslare' }
            ]
        },
        {
            id: 'wicklow',
            label: 'Wicklow',
            municipalDistricts: [
                { id: 'md-arklow', label: 'Municipal District of Arklow' },
                { id: 'md-baltinglass', label: 'Municipal District of Baltinglass' },
                { id: 'md-bray', label: 'Municipal District of Bray' },
                { id: 'md-greystones', label: 'Municipal District of Greystones' },
                { id: 'md-wicklow', label: 'Municipal District of Wicklow' }
            ]
        }
    ];

    global.SINDICAPP_GEO = {
        GEO_TEAMS_ES,
        ES_TERRITORY_TREE,
        ES_MUNICIPALITY_ID_ALIASES,
        IE_COUNTIES,
        getSpainGeoTeamsFlat,
        getCcaaTeamId,
        getProvinceTeamId,
        getComarcaTeamId
    };
})(typeof window !== 'undefined' ? window : globalThis);
