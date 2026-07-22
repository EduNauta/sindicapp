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

    const COPY = window.SINDICAPP_SINDICATO_COPY; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-copy.js */

    /* 17-07-2026 (ADR 0018): capa de textos en català, fusionada SOBRE el castellà.
       Qualsevol clau no traduïda cau al castellà, mai a `undefined`.
       18-07 (F2 del report v4): fusió PROFUNDA — abans un objecte imbricat parcial del
       pack CA substituïa sencer el d'ES i les sub-claus no traduïdes quedaven
       `undefined`. Ara els objectes plans es fusionen clau a clau recursivament;
       arrays i valors escalars se substitueixen. */
    function deepMergeCopy(base, extra) {
        const isPlain = (v) => v && typeof v === 'object' && !Array.isArray(v);
        if (!isPlain(base) || !isPlain(extra)) return extra !== undefined ? extra : base;
        const out = {};
        Object.keys(base).forEach((k) => { out[k] = base[k]; });
        Object.keys(extra).forEach((k) => {
            out[k] = isPlain(base[k]) && isPlain(extra[k]) ? deepMergeCopy(base[k], extra[k]) : extra[k];
        });
        return out;
    }
    if (window.SINDICAPP_COPY_CA) {
        COPY.ca = deepMergeCopy(COPY.es, window.SINDICAPP_COPY_CA);
    }

    const BASE_WORKPLACES = window.SINDICAPP_SINDICATO_DATA.BASE_WORKPLACES; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    /* Union metadata (founded/website/about) reflects real organisations and was verified
       via web search on 2026-07-12 — sources noted in docs/changelog. Membership/delegate
       counts for the pre-existing demo unions (siptu/unite/inmo/mandate/fsu/ccoo/ugt/cgt/
       csc/usoc/sat) are illustrative and unchanged; llogateres and iac are new entries with
       real recent figures. */
    const UNIONS = window.SINDICAPP_SINDICATO_DATA.UNIONS; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    const FEED = window.SINDICAPP_SINDICATO_DATA.FEED; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    const REPORTS_BY_WORKPLACE = window.SINDICAPP_SINDICATO_DATA.REPORTS_BY_WORKPLACE; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    const WAGE_CHART = window.SINDICAPP_SINDICATO_DATA.WAGE_CHART; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    /* R3 — Datos registrales (BORME / Registro Mercantil · CRO). Demo data keyed by workplace id. */
    const REGISTRO_BY_WORKPLACE = window.SINDICAPP_SINDICATO_DATA.REGISTRO_BY_WORKPLACE; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    const CONVENIO_CLAUSES = window.SINDICAPP_SINDICATO_DATA.CONVENIO_CLAUSES; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    function getConvenioClausesForWorkplace(locale, wp) {
        const key = localeKey(locale);
        const lib = CONVENIO_CLAUSES[key] || CONVENIO_CLAUSES.ie;
        const subId = wp.subsectorId || '';
        return lib[subId] || lib.default || [];
    }

    /* R1 — Tablas salariales demo por locale Y por sector para la calculadora de convenio
       (mínimo anual a jornada completa de 40 h). Fase 3 C1: antes había una única tabla de
       hostelería que se mostraba también en empresas de logística, sanidad, etc. */
    const CONVENIO_SALARY_TABLES = window.SINDICAPP_SINDICATO_DATA.CONVENIO_SALARY_TABLES; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    /* B4 (R1) — directorio demo de convenios por sector: «encuentra tu convenio».
       En producción esto sería una búsqueda real sobre el registro del BOE / autonómicos. */
    const CONVENIO_DIRECTORY = window.SINDICAPP_SINDICATO_DATA.CONVENIO_DIRECTORY; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

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
        return Number(value || 0).toLocaleString(localeKey(locale) === 'es' ? 'es-ES' : 'en-IE', { maximumFractionDigits: 0 });
    }

    /* ============================================================
       R4 — Agenda: la capa temporal (docs/REFORMAS-PROPUESTAS.md).
       Eventos demo por empresa y por territorio; los eventos añadidos
       por el usuario se guardan en localStorage (agendaEvents).
       ============================================================ */
    const AGENDA_BY_WORKPLACE = window.SINDICAPP_SINDICATO_DATA.AGENDA_BY_WORKPLACE; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    const AGENDA_BY_TERRITORY = window.SINDICAPP_SINDICATO_DATA.AGENDA_BY_TERRITORY; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    const AGENDA_EVENT_TYPES = ['assembly', 'vote', 'deadline', 'strike', 'negotiation'];

    function agendaTypeLabel(locale, type) {
        const types = t(locale).agendaTypes || {};
        return types[type] || type;
    }

    function formatAgendaDate(locale, iso) {
        const d = new Date(`${iso}T12:00:00`);
        if (Number.isNaN(d.getTime())) return iso;
        return d.toLocaleDateString(localeKey(locale) === 'es' ? 'es-ES' : 'en-IE', { day: 'numeric', month: 'short', year: 'numeric' });
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
    const FORUM_THREAD_TRUST = window.SINDICAPP_SINDICATO_DATA.FORUM_THREAD_TRUST; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

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
    const BUILDINGS_BY_TERRITORY = window.SINDICAPP_SINDICATO_DATA.BUILDINGS_BY_TERRITORY; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    const BUILDING_CONDITION_REPORTS = window.SINDICAPP_SINDICATO_DATA.BUILDING_CONDITION_REPORTS; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    const RENT_BANDS_BY_TERRITORY = window.SINDICAPP_SINDICATO_DATA.RENT_BANDS_BY_TERRITORY; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    const TENANT_PLEDGE_BASE = window.SINDICAPP_SINDICATO_DATA.TENANT_PLEDGE_BASE; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

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
        const es = localeKey(locale) === 'es';
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
                const statusLabel = alert.status === 'scheduled' ? c.alertStatusScheduled : c.alertStatusRisk;
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
        const localeTag = localeKey(locale) === 'es' ? 'es-ES' : 'en-IE';
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
            <p>${buildTelegramLinkHtml(locale, localeKey(locale) === 'es' ? 'vivienda' : 'housing')}</p>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildHousingAlarmasHtml(locale) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const alerts = getAllViviendaAlerts(locale);
        const alertsHtml = alerts.length
            ? alerts.map((alert) => {
                const statusLabel = alert.status === 'scheduled'
                    ? c.alertStatusScheduled
                    : c.alertStatusRisk;
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
    const LARGE_HOLDERS = window.SINDICAPP_SINDICATO_DATA.LARGE_HOLDERS; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    const TENANT_ASSEMBLIES = window.SINDICAPP_SINDICATO_DATA.TENANT_ASSEMBLIES; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    /* Índice de referencia demo (€/m² mes) — mismas zonas que RENT_BANDS_BY_TERRITORY. */
    const RENT_INDEX = window.SINDICAPP_SINDICATO_DATA.RENT_INDEX; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

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
        const llogateres = localeKey(locale) === 'es' ? findUnion(locale, 'llogateres') : null;
        const cards = holders.map((h) => `
            <div class="sindicato-coord-card sindicato-holder-card">
                <div class="sindicato-holder-head">
                    <strong>${h.icon} ${h.name}</strong>
                    <span class="template-muted">${h.type}</span>
                </div>
                <p class="template-muted"><strong>${h.buildings}</strong> ${c.housingTenedoresBuildings} · <strong>${h.units.toLocaleString(localeKey(locale) === 'es' ? 'es-ES' : 'en-IE')}</strong> ${c.housingTenedoresUnits}</p>
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
        const localeTag = localeKey(locale) === 'es' ? 'es-ES' : 'en-IE';
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
            `<option value="${terr.id}">${terr.name} — ${terr.index.toLocaleString(localeKey(locale) === 'es' ? 'es-ES' : 'en-IE')} €/m²</option>`
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

    /* 17-07-2026: Inquilinos gana directorio de equipos sindicales como el resto de tipos.
       Al no haber un único sindicato de inquilinas, se diferencia por comunidad autónoma
       (Catalunya por defecto). Las funcionalidades del módulo (huelgómetro, alarmas,
       calculadora, asambleas) pasan a ser SECCIONES del equipo, junto a Resumen, Foro,
       Estructura, Propietarios (el equivalente a «Empresas» aquí) y CRM. */
    const HOUSING_UNIONS = window.SINDICAPP_SINDICATO_DATA.HOUSING_UNIONS; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    function getHousingUnions(locale) {
        return HOUSING_UNIONS[localeKey(locale)] || [];
    }

    function findHousingUnion(locale, unionId) {
        return getHousingUnions(locale).find((u) => u.id === unionId) || null;
    }

    /* Equipo por defecto: el primero (Catalunya / Dublin). */
    function defaultHousingUnionId(locale) {
        const list = getHousingUnions(locale);
        return list.length ? list[0].id : '';
    }

    function buildHousingDirectoryHtml(locale, view) {
        const c = t(locale);
        const localeTag = localeKey(locale) === 'es' ? 'es-ES' : 'en-IE';
        const cards = getHousingUnions(locale).map((u) => `
            <button type="button" class="sindicato-redsocial-card sindicato-dir-card" data-sindicato-goto-housing-union="${u.id}">
                <span class="sindicato-redsocial-card-icon" aria-hidden="true">${u.icon}</span>
                <strong class="sindicato-redsocial-card-name">${u.name}</strong>
                <span class="template-muted">${u.region}</span>
                <span class="sindicato-redsocial-card-stats">
                    <span><strong>${u.members.toLocaleString(localeTag)}</strong> ${c.housingUnionMembers}</span>
                    <span><strong>${u.buildings}</strong> ${c.housingUnionBuildings}</span>
                </span>
            </button>`).join('');
        return `<div class="sindicato-panel sindicato-housing-directory">
            <h2>🏠 ${c.housingDirectoryTitle}</h2>
            <p class="template-muted">${c.housingDirectoryIntro}</p>
            <div class="sindicato-redsocial-grid">${cards}</div>
            ${buildPropuestaInternalSpaceHtml(locale, view)}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildHousingUnionHeadHtml(locale, union) {
        const c = t(locale);
        return `<p><button type="button" class="sindicato-back-btn" data-sindicato-goto-housing-union="">← ${c.housingUnionBack}</button></p>
            <h2>${union.icon} ${union.name}</h2>
            <p class="template-muted">${union.region}</p>`;
    }

    function buildHousingUnionResumenHtml(locale, union, view) {
        const c = t(locale);
        const localeTag = localeKey(locale) === 'es' ? 'es-ES' : 'en-IE';
        const issues = union.issues.map((i) => `<div class="sindicato-coord-card"><strong>${i}</strong></div>`).join('');
        return `<div class="sindicato-panel">
            ${buildHousingUnionHeadHtml(locale, union)}
            <div class="sindicato-summary-grid">
                <div class="sindicato-stat"><strong>${union.members.toLocaleString(localeTag)}</strong><span>${c.housingUnionMembers}</span></div>
                <div class="sindicato-stat"><strong>${union.buildings}</strong><span>${c.housingUnionBuildings}</span></div>
            </div>
            <h3>✊ ${c.housingUnionIssues}</h3>
            ${issues}
            ${buildSocialLinksBlockHtml(locale, union.id)}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildHousingHtml(locale, housingSub, view) {
        const v = view || {};
        const union = v.housingUnionId ? findHousingUnion(locale, v.housingUnionId) : null;
        /* Sin equipo elegido: directorio de sindicatos de inquilinas por comunidad. */
        if (!union) return buildHousingDirectoryHtml(locale, v);
        const section = v.equipoSection || 'resumen';
        const head = `<div class="sindicato-panel sindicato-equipo-head">${buildHousingUnionHeadHtml(locale, union)}</div>`;
        /* Las herramientas del módulo pasan a ser secciones del equipo. */
        if (section === 'huelgometro') return head + buildHousingHuelgometroHtml(locale);
        if (section === 'alarmas') return head + buildHousingAlarmasHtml(locale);
        if (section === 'propietarios') return head + buildHousingTenedoresHtml(locale);
        if (section === 'calculadora') return head + buildHousingCalculadoraHtml(locale);
        if (section === 'asambleas') return head + buildHousingAsambleasHtml(locale);
        /* Secciones comunes a todos los equipos sindicales. */
        if (section === 'foro' || section === 'estructura' || section === 'crm' || section.indexOf('crm-') === 0) {
            const c = t(locale);
            return buildEquipoProfileSectionHtml(locale, section, 'housing', {
                backAttr: 'data-sindicato-goto-housing-union=""', backLabel: c.housingUnionBack,
                heading: `${union.icon} ${union.name}`, name: union.name, id: union.id,
                empresasHtml: ''
            }, v);
        }
        return buildHousingUnionResumenHtml(locale, union, v);
    }

    /* ================================================================
     * Redes y canales (13-07-2026) — cada entidad (territorio, sector,
     * sindicato, empresa, producto/servicio, centro de estudios) tiene su
     * grupo de Telegram y canales sociales. Enlaces demo, generados del slug.
     * ================================================================ */
    /* 18-07 (F6 del report v4): los canales son demo — las cuentas generadas por slug no
       existen, así que ya no se enlaza a ellas (un 404 de Telegram en mitad de una
       reunión resta credibilidad). Mismo aspecto de chip, sin href; el handle generado
       queda visible en el title como recordatorio de lo que sería. */
    function demoSocialChipHtml(icon, label, handle, extraClass) {
        return `<span class="sindicato-union-company-link sindicato-social-link sindicato-social-link--demo${extraClass ? ' ' + extraClass : ''}" title="${handle} · demo" aria-label="${label} (demo)"><span aria-hidden="true">${icon}</span> ${label}</span>`;
    }

    function buildTelegramLinkHtml(locale, slug) {
        const c = t(locale);
        const tg = String(slug || '').replace(/[^a-z0-9]+/gi, '_');
        return demoSocialChipHtml('✈️', c.telegramGroupLabel, `t.me/sindicapp_${tg}`, 'sindicato-social-link--telegram');
    }

    function buildSocialLinksHtml(locale, slug) {
        const tg = String(slug || '').replace(/[^a-z0-9]+/gi, '_');
        const dots = String(slug || '').replace(/[^a-z0-9]+/gi, '.');
        return `<div class="sindicato-union-companies sindicato-social-links">
            ${buildTelegramLinkHtml(locale, slug)}
            ${demoSocialChipHtml('🐘', 'Mastodon', `@sindicapp_${tg}`)}
            ${demoSocialChipHtml('📷', 'Instagram', `sindicapp.${dots}`)}
            ${demoSocialChipHtml('✖️', 'X', `@sindicapp_${tg}`)}
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
    const CONSUMER_ITEMS = window.SINDICAPP_SINDICATO_DATA.CONSUMER_ITEMS; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    function getConsumerItems(locale) {
        return CONSUMER_ITEMS[localeKey(locale)] || [];
    }

    function findConsumerItem(locale, itemId) {
        return getConsumerItems(locale).find((i) => i.id === itemId) || null;
    }

    function buildConsumidoresHtml(locale, itemId, view) {
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
                ${buildPropuestaInternalSpaceHtml(locale, view)}
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
        const section = (view && view.equipoSection) || 'resumen';
        if (section !== 'resumen') {
            const empresasHtml = relatedHtml || `<p class="template-muted">—</p>`;
            return buildEquipoProfileSectionHtml(locale, section, 'consumidores', {
                backAttr: 'data-sindicato-goto-consumidor=""', backLabel: c.consumidoresBack,
                heading: `${item.icon} ${item.name}`, name: item.name, id: item.id, empresasHtml
            }, view);
        }
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
    const STUDY_CENTERS = window.SINDICAPP_SINDICATO_DATA.STUDY_CENTERS; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    function getStudyCenters(locale) {
        return STUDY_CENTERS[localeKey(locale)] || [];
    }

    function findStudyCenter(locale, centerId) {
        return getStudyCenters(locale).find((s) => s.id === centerId) || null;
    }

    function buildEstudiantesHtml(locale, centerId, view) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
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
                ${buildPropuestaInternalSpaceHtml(locale, view)}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        const terr = getSubterritoryById(locale, center.territoryId);
        const groupTags = center.groups.map((g) => `<span class="sindicato-union-tag">${g}</span>`).join('');
        const issueCards = center.issues.map((i) =>
            `<div class="sindicato-coord-card"><strong>${i.title}</strong><p class="template-muted">${i.replies} ${c.feedRepliesLabel}</p></div>`
        ).join('') || `<p class="template-muted">—</p>`;
        const mobCards = center.mobilizations.map((m) =>
            `<div class="sindicato-coord-card sindicato-mob-card"><strong>${m.date}</strong><p>${m.title}</p><p class="template-muted">📍 ${m.place}</p></div>`
        ).join('') || `<p class="template-muted">—</p>`;
        const terrBtn = terr
            ? `<p><button type="button" class="sindicato-cta-btn" data-sindicato-goto-vivienda="${terr.id}">🗺️ ${terr.parentName} / ${terr.name}</button></p>`
            : '';
        const section = (view && view.equipoSection) || 'resumen';
        if (section !== 'resumen') {
            const empresasHtml = `<p class="template-muted">${c.estudiantesGroupsTitle}</p><div class="sindicato-union-tags">${center.groups.map((g) => `<span class="sindicato-union-tag">${g}</span>`).join('')}</div>`;
            return buildEquipoProfileSectionHtml(locale, section, 'estudiantes', {
                backAttr: 'data-sindicato-goto-centro=""', backLabel: c.estudiantesBack,
                heading: `${center.icon} ${center.name}`, name: center.name, id: center.id, empresasHtml
            }, view);
        }
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
     * Profesionales (17-07-2026) — colegios profesionales (médicos, abogados,
     * arquitectos, enfermería…) con colegiación, cuota, reivindicaciones y
     * sindicatos de profesión. Mismo patrón directorio+perfil que Estudiantes.
     * ================================================================ */
    const PRO_BODIES = window.SINDICAPP_SINDICATO_DATA.PRO_BODIES; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    function getProBodies(locale) {
        return PRO_BODIES[localeKey(locale)] || [];
    }

    function findProBody(locale, bodyId) {
        return getProBodies(locale).find((b) => b.id === bodyId) || null;
    }

    function buildProfesionalesHtml(locale, bodyId, view) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const localeTag = es ? 'es-ES' : 'en-IE';
        const bodies = getProBodies(locale);
        const body = bodyId ? findProBody(locale, bodyId) : null;
        if (!body) {
            const cards = bodies.map((b) => `
                <button type="button" class="sindicato-redsocial-card sindicato-dir-card" data-sindicato-goto-profesional="${b.id}">
                    <span class="sindicato-redsocial-card-icon" aria-hidden="true">${b.icon}</span>
                    <strong class="sindicato-redsocial-card-name">${b.name}</strong>
                    <span class="template-muted">${b.type}</span>
                    <span class="sindicato-redsocial-card-stats">
                        <span><strong>${b.members.toLocaleString(localeTag)}</strong> ${c.profesionalesStatMembers}</span>
                        <span><strong>${b.unions.length}</strong> ${c.profesionalesUnionsTitle.toLowerCase()}</span>
                    </span>
                </button>`).join('');
            return `<div class="sindicato-panel sindicato-profesionales">
                <h2>🩺 ${c.profesionalesTitle}</h2>
                <p class="template-muted">${c.profesionalesIntro}</p>
                <p>${c.profesionalesDirectoryHint}</p>
                <div class="sindicato-redsocial-grid">${cards}</div>
                ${buildPropuestaInternalSpaceHtml(locale, view)}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        const terr = getSubterritoryById(locale, body.territoryId);
        const unionTags = body.unions.map((u) => `<span class="sindicato-union-tag">${u}</span>`).join('');
        const issueCards = body.issues.map((i) =>
            `<div class="sindicato-coord-card"><strong>${i.title}</strong><p class="template-muted">${i.replies} ${c.feedRepliesLabel}</p></div>`
        ).join('') || `<p class="template-muted">—</p>`;
        const mobCards = body.mobilizations.map((m) =>
            `<div class="sindicato-coord-card sindicato-mob-card"><strong>${m.date}</strong><p>${m.title}</p><p class="template-muted">📍 ${m.place}</p></div>`
        ).join('') || `<p class="template-muted">—</p>`;
        const terrBtn = terr
            ? `<p><button type="button" class="sindicato-cta-btn" data-sindicato-goto-vivienda="${terr.id}">🗺️ ${terr.parentName} / ${terr.name}</button></p>`
            : '';
        const section = (view && view.equipoSection) || 'resumen';
        if (section !== 'resumen') {
            const empresasHtml = `<p class="template-muted">${c.profesionalesUnionsTitle}</p><div class="sindicato-union-tags">${body.unions.map((u) => `<span class="sindicato-union-tag">${u}</span>`).join('')}</div>`;
            return buildEquipoProfileSectionHtml(locale, section, 'profesionales', {
                backAttr: 'data-sindicato-goto-profesional=""', backLabel: c.profesionalesBack,
                heading: `${body.icon} ${body.name}`, name: body.name, id: body.id, empresasHtml
            }, view);
        }
        return `<div class="sindicato-panel sindicato-profesionales-profile">
            <p><button type="button" class="sindicato-back-btn" data-sindicato-goto-profesional="">← ${c.profesionalesBack}</button></p>
            <h2>${body.icon} ${body.name}</h2>
            <p class="template-muted">${body.type}${terr ? ` · ${terr.name}` : ''}</p>
            <div class="sindicato-summary-grid">
                <div class="sindicato-stat"><strong>${body.members.toLocaleString(localeTag)}</strong><span>${c.profesionalesStatMembers}</span></div>
                <div class="sindicato-stat"><strong>€ ${body.fee.toLocaleString(localeTag)}</strong><span>${c.profesionalesStatFee}</span></div>
                <div class="sindicato-stat"><strong>${body.issues.length}</strong><span>${c.profesionalesStatIssues}</span></div>
            </div>
            <h3>✊ ${c.profesionalesUnionsTitle}</h3>
            <div class="sindicato-union-tags">${unionTags}</div>
            <h3>📢 ${c.profesionalesIssuesTitle}</h3>
            ${issueCards}
            <h3>📅 ${c.profesionalesMobilizationsTitle}</h3>
            ${mobCards}
            ${terrBtn}
            ${buildSocialLinksBlockHtml(locale, body.id)}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* ================================================================
     * Autónomos (17-07-2026) — plataformas y grandes clientes que fijan las
     * condiciones del trabajo autónomo: tarifas colaborativas (estilo
     * Sueldos), campañas de presión y asociaciones presentes.
     * ================================================================ */
    const AUTONOMO_PLATFORMS = window.SINDICAPP_SINDICATO_DATA.AUTONOMO_PLATFORMS; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    function getAutonomoPlatforms(locale) {
        return AUTONOMO_PLATFORMS[localeKey(locale)] || [];
    }

    function findAutonomoPlatform(locale, platformId) {
        return getAutonomoPlatforms(locale).find((p) => p.id === platformId) || null;
    }

    /* 17-07-2026: sindicatos y asociaciones de autónomas como equipos sindicales de pleno
       derecho (antes solo una lista plana). Cada uno tiene perfil + secciones. */
    const AUTONOMO_UNIONS = window.SINDICAPP_SINDICATO_DATA.AUTONOMO_UNIONS; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    function getAutonomoUnions(locale) {
        return AUTONOMO_UNIONS[localeKey(locale)] || [];
    }

    function findAutonomoUnion(locale, unionId) {
        return getAutonomoUnions(locale).find((u) => u.id === unionId) || null;
    }

    function buildAutonomoUnionProfile(locale, union, view) {
        const c = t(locale);
        const localeTag = localeKey(locale) === 'es' ? 'es-ES' : 'en-IE';
        const section = (view && view.equipoSection) || 'resumen';
        const empresasHtml = `<p class="template-muted">${c.autonomosUnionPlatforms}</p><div class="sindicato-union-tags">${union.platforms.map((p) => `<span class="sindicato-union-tag">${p}</span>`).join('')}</div>`;
        if (section !== 'resumen') {
            return buildEquipoProfileSectionHtml(locale, section, 'autonomos', {
                backAttr: 'data-sindicato-goto-autonomo=""', backLabel: c.autonomosBack,
                heading: `${union.icon} ${union.name}`, name: union.name, id: union.id, empresasHtml
            }, view);
        }
        const issues = union.issues.map((i) => `<div class="sindicato-coord-card"><strong>${i}</strong></div>`).join('');
        return `<div class="sindicato-panel">
            <p><button type="button" class="sindicato-back-btn" data-sindicato-goto-autonomo="">← ${c.autonomosBack}</button></p>
            <h2>${union.icon} ${union.name}</h2>
            <p class="template-muted">${union.sector}</p>
            <div class="sindicato-summary-grid">
                <div class="sindicato-stat"><strong>${union.members.toLocaleString(localeTag)}</strong><span>${c.autonomosUnionMembers}</span></div>
                <div class="sindicato-stat"><strong>${union.platforms.length}</strong><span>${c.autonomosUnionPlatforms}</span></div>
            </div>
            <h3>✊ ${c.autonomosUnionIssues}</h3>
            ${issues}
            ${buildSocialLinksBlockHtml(locale, union.id)}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function buildAutonomosHtml(locale, platformId, view) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const localeTag = es ? 'es-ES' : 'en-IE';
        const platforms = getAutonomoPlatforms(locale);
        /* El id puede ser un sindicato de autónomas (equipo) o una plataforma (actor). */
        const autUnion = platformId ? findAutonomoUnion(locale, platformId) : null;
        if (autUnion) return buildAutonomoUnionProfile(locale, autUnion, view);
        const plat = platformId ? findAutonomoPlatform(locale, platformId) : null;
        if (!plat) {
            const cards = platforms.map((p) => `
                <button type="button" class="sindicato-redsocial-card sindicato-dir-card" data-sindicato-goto-autonomo="${p.id}">
                    <span class="sindicato-redsocial-card-icon" aria-hidden="true">${p.icon}</span>
                    <strong class="sindicato-redsocial-card-name">${p.name}</strong>
                    <span class="template-muted">${p.type}</span>
                    <span class="sindicato-redsocial-card-stats">
                        <span><strong>${p.freelancers.toLocaleString(localeTag)}</strong> ${c.autonomosStatFreelancers}</span>
                        <span><strong>${p.campaigns.length}</strong> ${c.autonomosStatCampaigns}</span>
                    </span>
                </button>`).join('');
            /* 17-07-2026: los sindicatos de autónomas son equipos seleccionables, con su
               perfil y sus secciones (Resumen/Foro/Estructura/Empresas/CRM). */
            const autUnions = getAutonomoUnions(locale);
            const unionCards = autUnions.map((u) => `
                <button type="button" class="sindicato-redsocial-card sindicato-dir-card" data-sindicato-goto-autonomo="${u.id}">
                    <span class="sindicato-redsocial-card-icon" aria-hidden="true">${u.icon}</span>
                    <strong class="sindicato-redsocial-card-name">${u.name}</strong>
                    <span class="template-muted">${u.sector}</span>
                    <span class="sindicato-redsocial-card-stats">
                        <span><strong>${u.members.toLocaleString(localeTag)}</strong> ${c.autonomosUnionMembers}</span>
                        <span><strong>${u.platforms.length}</strong> ${c.autonomosUnionPlatforms}</span>
                    </span>
                </button>`).join('');
            const unionsList = autUnions.length
                ? `<section class="sindicato-sector-section">
                    <header class="sindicato-sector-section-head">
                        <span class="sindicato-sector-section-icon" aria-hidden="true">🏛️</span>
                        <h3>${c.autonomosUnionsListTitle}</h3>
                    </header>
                    <div class="sindicato-redsocial-grid">${unionCards}</div>
                </section>`
                : '';
            return `<div class="sindicato-panel sindicato-autonomos">
                <h2>🧰 ${c.autonomosTitle}</h2>
                <p class="template-muted">${c.autonomosIntro}</p>
                ${unionsList}
                <p>${c.autonomosDirectoryHint}</p>
                <div class="sindicato-redsocial-grid">${cards}</div>
                ${buildPropuestaInternalSpaceHtml(locale, view)}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        const rateCards = plat.rates.map((r) =>
            `<div class="sindicato-coord-card"><strong>${r.role}</strong><p>${r.rate} <span class="template-muted">· ✓ ${r.votes}</span></p></div>`
        ).join('') || `<p class="template-muted">—</p>`;
        const campaignCards = plat.campaigns.map((k) => `
            <div class="sindicato-coord-card sindicato-campaign-card">
                <strong>${k.title}</strong>
                <div class="sindicato-strike-track sindicato-campaign-track">
                    <div class="sindicato-strike-fill" style="width:${k.support}%"></div>
                </div>
                <p class="template-muted">${k.support}% ${c.campaignSupportShort}</p>
            </div>`).join('') || `<p class="template-muted">—</p>`;
        const assocTags = plat.associations.map((a) => `<span class="sindicato-union-tag">${a}</span>`).join('');
        const section = (view && view.equipoSection) || 'resumen';
        if (section !== 'resumen') {
            const empresasHtml = `<p class="template-muted">${c.autonomosAssociationsTitle}</p><div class="sindicato-union-tags">${plat.associations.map((a) => `<span class="sindicato-union-tag">${a}</span>`).join('')}</div>`;
            return buildEquipoProfileSectionHtml(locale, section, 'autonomos', {
                backAttr: 'data-sindicato-goto-autonomo=""', backLabel: c.autonomosBack,
                heading: `${plat.icon} ${plat.name}`, name: plat.name, id: plat.id, empresasHtml
            }, view);
        }
        return `<div class="sindicato-panel sindicato-autonomos-profile">
            <p><button type="button" class="sindicato-back-btn" data-sindicato-goto-autonomo="">← ${c.autonomosBack}</button></p>
            <h2>${plat.icon} ${plat.name}</h2>
            <p class="template-muted">${plat.type} · ${plat.sector}</p>
            <div class="sindicato-summary-grid">
                <div class="sindicato-stat"><strong>${plat.freelancers.toLocaleString(localeTag)}</strong><span>${c.autonomosStatFreelancers}</span></div>
                <div class="sindicato-stat"><strong>${plat.campaigns.length}</strong><span>${c.autonomosStatCampaigns}</span></div>
                <div class="sindicato-stat"><strong>${plat.rates.length}</strong><span>${c.autonomosStatRates}</span></div>
            </div>
            <h3>💶 ${c.autonomosRatesTitle}</h3>
            <p class="template-muted">${c.autonomosRatesHint}</p>
            ${rateCards}
            <h3>📢 ${c.autonomosCampaignsTitle}</h3>
            ${campaignCards}
            <h3>✊ ${c.autonomosAssociationsTitle}</h3>
            <div class="sindicato-union-tags">${assocTags}</div>
            ${buildSocialLinksBlockHtml(locale, plat.id)}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* ================================================================
     * PROPUESTA (17-07-2026) — web triplicada. La versión «propuesta» es un
     * shell de navegación por ANILLOS DE ACCESO sobre la misma plataforma:
     *   Anillo 0 Público (toda la extranet actual, reutilizada tal cual),
     *   Anillo 1 Personal (≥ verificada), Anillo 2 Afiliadas (≥ afiliada),
     *   Anillo 3 Responsabilidad (militante) con las herramientas internas
     *   nuevas: intake, fichas de caso vivas, asambleas con turnos.
     * Un simulador «Ver como» cambia el rol y bloquea/desbloquea anillos.
     * Las versiones «clásica» y «final» comparten el código existente.
     * ================================================================ */
    /* 20-07-2026 (ADR 0024): la escalera de RELACIÓN queda en tres etapas —
       visitante · usuario · afiliado. «Militante» deja de ser un rol seleccionable:
       es un estado emergente (tener ≥1 cargo). El rango 'militante' se conserva solo
       como alias defensivo de 'afiliado' para estados persistidos pre-migración. */
    const PROPUESTA_ROLE_RANK = { visitante: 0, usuario: 1, afiliado: 2, militante: 2 };

    function propuestaRoleAllows(role, minRole) {
        return (PROPUESTA_ROLE_RANK[role] || 0) >= (PROPUESTA_ROLE_RANK[minRole] || 0);
    }

    /* 20-07-2026 (ideas 42+43, ADR 0024, §7 de PROPUESTA-ACCESOS-200726): cargos
       arquetipo demo. Cada cargo concede un paquete de CAPACIDADES — exactamente los
       botones crm-* de la sidebar de Gestión (el vocabulario que dejó el ADR 0019).
       El organigrama ES la ACL: ocupar el cargo abre sus herramientas; 'ninguno' es
       el estado normal de una afiliada de base. Nombres en COPY.propuestaCargos. */
    const DEMO_CARGOS = ['ninguno', 'coordinacion', 'accion', 'comunicacion', 'datos'];
    const CARGO_CAPABILITIES = {
        /* coordinacion: TODAS las capacidades (se resuelve en cargoAllows). */
        accion: ['intake', 'casos', 'asambleas', 'documentos'],
        comunicacion: ['campanas', 'comunicaciones', 'calendario'],
        datos: ['afiliadas', 'datos', 'fuentes', 'estructura', 'finanzas']
    };

    /* Acepta el id de capacidad con o sin prefijo 'crm-' (los llamadores mezclan
       ids de tab del CRM e ids de sección de sidebar). */
    function normalizeCapabilityId(capabilityId) {
        const id = String(capabilityId || '');
        return id.indexOf('crm-') === 0 ? id.slice(4) : id;
    }

    /* 20-07-2026 tarde (idea 63, report v5): además de los 4 arquetipo, se pueden
       ocupar los cargos del ORGANIGRAMA del equipo abierto. Ids autocontenidos:
       - 'team:<tipo>:<comisión>:<cargo>' — cargo de seed (índices estables es/ie,
         las capacidades son idénticas en ambos datasets, solo cambian los textos);
       - 'adhoc:<datasetKey>:<orgId>:<ts>' — cargo ad hoc del runtime del equipo
         (idea 64), con caducidad. Caducado deja de conceder. */
    function getTeamCargos(locale, type) {
        const tp = type || 'base';
        return getComisionesForTeam(locale, tp).reduce((acc, com, ci) => acc.concat(
            (com.cargos || []).map((cg, gi) => ({
                id: 'team:' + tp + ':' + ci + ':' + gi,
                label: cg.role,
                capacidades: cg.capacidades || [],
                ambito: cg.ambito || '',
                ambitoTerritorio: cg.ambitoTerritorio || ''
            }))
        ), []);
    }

    /* Caducidad de un cargo ad hoc: fecha (YYYY-MM-DD) estrictamente pasada. */
    function adhocCargoExpired(cg) {
        if (!cg || !cg.caduca) return false;
        return cg.caduca < new Date().toISOString().slice(0, 10);
    }

    /* 20-07 tarde (idea 64): cargos ad hoc del equipo — viven en el runtime CRM
       persistido del equipo (getCrmData), como cualquier otro dato de gestión. */
    function getAdhocCargos(locale, orgId) {
        const data = getCrmData(locale, orgId);
        return (data && Array.isArray(data.adhocCargos)) ? data.adhocCargos : [];
    }

    /* Fecha de caducidad legible (DD-MM) para el badge «ad hoc · caduca …». */
    function formatAdhocDate(iso) {
        const p = String(iso || '').split('-');
        return p.length === 3 ? p[2] + '-' + p[1] : String(iso || '');
    }

    /* 20-07 tarde (idea 64): crear un cargo ad hoc — la excepción disciplinada del
       §4 de PROPUESTA-ACCESOS-200726: temporal, con caducidad, registrado en el
       MISMO organigrama (nunca una matriz aparte). Devuelve el cargo creado o null. */
    function crmCreateAdhocCargo(locale, orgId, fields) {
        const f = fields || {};
        const nombre = String(f.nombre || '').trim();
        const capacidades = Array.isArray(f.capacidades) ? f.capacidades.filter(Boolean) : [];
        const caduca = String(f.caduca || '').trim();
        if (!nombre || !capacidades.length || !caduca) return null;
        const org = findCrmOrg(locale, orgId) ? orgId : 'sindicapp';
        const data = getCrmData(locale, org);
        if (!Array.isArray(data.adhocCargos)) data.adhocCargos = [];
        const cargo = {
            id: 'adhoc:' + localeKey(locale) + ':' + org + ':' + Date.now(),
            nombre: nombre,
            capacidades: capacidades,
            ambito: String(f.ambito || '').trim(),
            caduca: caduca
        };
        data.adhocCargos.push(cargo);
        persistCrmRuntime(locale);
        /* Idea 66: la creación deja rastro, igual que ocupar/soltar. */
        recordCargoTrail('adhoc', nombre);
        return cargo;
    }

    /* Resuelve cualquier id de cargo a su definición {label, capacidades,
       ambitoTerritorio, expired}. Para capacidades el locale es indiferente
       (seeds paralelos); para textos se pasa el locale real. */
    function resolveCargoDef(locale, cargoId) {
        const id = String(cargoId || '');
        if (id.indexOf('team:') === 0) {
            const p = id.split(':');
            const coms = getComisionesForTeam(locale || 'es', p[1]);
            const com = coms[Number(p[2])];
            const cg = com && (com.cargos || [])[Number(p[3])];
            return cg ? { label: cg.role, capacidades: cg.capacidades || [], ambitoTerritorio: cg.ambitoTerritorio || '' } : null;
        }
        if (id.indexOf('adhoc:') === 0) {
            const p = id.split(':');
            const list = (getCrmData(p[1], p[2]) || {}).adhocCargos || [];
            const cg = list.find((x) => x.id === id);
            return cg ? { label: cg.nombre, capacidades: cg.capacidades || [], ambitoTerritorio: '', expired: adhocCargoExpired(cg) } : null;
        }
        if (id === 'coordinacion') return { label: '', capacidades: [], all: true };
        if (CARGO_CAPABILITIES[id]) return { label: '', capacidades: CARGO_CAPABILITIES[id] };
        return null;
    }

    function cargoAllows(cargoId, capabilityId) {
        if (cargoId === 'coordinacion') return true;
        const cap = normalizeCapabilityId(capabilityId);
        const caps = CARGO_CAPABILITIES[cargoId];
        if (caps) return caps.indexOf(cap) !== -1;
        /* Cargos de equipo (63) y ad hoc (64): conceden lo que declara su seed;
           un ad hoc caducado no concede nada. */
        const def = resolveCargoDef('es', cargoId);
        if (!def || def.expired) return false;
        if (def.all) return true;
        return (def.capacidades || []).indexOf(cap) !== -1;
    }

    /* Nombre visible de un cargo, sea arquetipo, de equipo o ad hoc. */
    function cargoDisplayName(locale, cargoId) {
        const c = t(locale);
        if (c.propuestaCargos && c.propuestaCargos[cargoId]) return c.propuestaCargos[cargoId];
        const def = resolveCargoDef(locale, cargoId);
        return (def && def.label) || cargoId;
    }

    /* 20-07-2026 tarde (idea 66, report v5): rastro de cargos — historial persistido
       de ocupaciones (quién / qué cargo / cuándo). Se registra al ocupar o soltar un
       cargo demo y al crear un cargo ad hoc. Clave sindicapp-* (el reset demo la borra). */
    const CARGO_TRAIL_KEY = 'sindicapp-cargo-trail-v1';
    function getCargoTrail() {
        try {
            const raw = localStorage.getItem(CARGO_TRAIL_KEY);
            const parsed = raw ? JSON.parse(raw) : null;
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) { return []; }
    }
    function recordCargoTrail(action, cargoName) {
        const trail = getCargoTrail();
        trail.unshift({
            when: new Date().toISOString().slice(0, 16).replace('T', ' '),
            action: action,
            cargo: cargoName
        });
        try { localStorage.setItem(CARGO_TRAIL_KEY, JSON.stringify(trail.slice(0, 30))); } catch (e) { /* demo */ }
    }

    /* «Militante» como estado emergente: cualquier cargo ≠ ninguno. */
    function cargoIsAny(cargoId) {
        return Boolean(cargoId) && cargoId !== 'ninguno';
    }

    /* Quién LLEVA una capacidad — para el candado informativo («esto lo opera el
       cargo X»). Prefiere el cargo específico; coordinación es el paraguas final. */
    function cargoForCapability(capabilityId) {
        const cap = normalizeCapabilityId(capabilityId);
        const specific = ['accion', 'comunicacion', 'datos'].find((id) => CARGO_CAPABILITIES[id].indexOf(cap) !== -1);
        return specific || 'coordinacion';
    }

    /* 20-07-2026 tarde (idea 68 parcial, report v5): la pantalla «anillo/inicio» y
       PROPUESTA_RINGS se purgaron — los anillos ya no existen ni como doctrina en
       código (ADR 0024). PENDIENTE (anotado, demasiado invasivo para esta tanda):
       renombrar propuestaRoleAllows y las claves COPY con prefijo 'propuesta'. */

    /* Cuadros de la nav propuesta — espejo exacto de la Clásica, con candados por rol.
       Nada de accesos extra: el módulo Usuario contiene perfil + mis casos/documentos
       DENTRO (anillo usuario, módulo propio); el CRM contiene intake/casos/asambleas
       DENTRO (anillo militante); el Foro contiene el tablón interno DENTRO (anillo
       afiliado). Los candados se atraviesan: el módulo se abre y es el propio módulo
       quien explica el anillo y ofrece el cambio de rol (demo contextual). */
    /* 17-07-2026 (reestructura): los dos cuadros intercambian sitio. Arriba, los
       COLECTIVOS (los 6 tipos de sindicato); abajo, las HERRAMIENTAS. Red Social sale
       de la nav — se llega a ella clicando el título «SindicApp» de la cabecera. El CRM
       también sale de la nav: se descompone y vive DENTRO de cada módulo de colectivo
       (cada tipo con sus peculiaridades). */
    const PROPUESTA_COLECTIVOS = [
        { type: 'sub', id: 'unions', icon: '🏛️' },
        { type: 'sub', id: 'profesionales', icon: '🩺' },
        { type: 'sub', id: 'housing', icon: '🏠' },
        { type: 'sub', id: 'autonomos', icon: '🧰' },
        { type: 'sub', id: 'consumidores', icon: '🛒' },
        { type: 'sub', id: 'estudiantes', icon: '🎓' }
    ];

    const PROPUESTA_TOOLS = [
        { type: 'sub', id: 'usuario', icon: '👤', labelKey: 'perfil', minRole: 'usuario' },
        { type: 'sub', id: 'vivienda', icon: '🏘️' },
        { type: 'sub', id: 'foro', icon: '🗣️' },
        { type: 'sub', id: 'wiki', icon: '📖' },
        { type: 'sub', id: 'sectores', icon: '🏭' },
        { type: 'sub', id: 'workplaces', icon: '🏢' }
    ];

    /* Datos demo de la propuesta (por locale). Estado de turnos en memoria de sesión. */
    const PROPUESTA_DEMO = window.SINDICAPP_SINDICATO_DATA.PROPUESTA_DEMO; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    /* 17-07-2026 (peculiaridades por tipo): casos/intake/asambleas propios de cada tipo de
       equipo sindical. Trabajadores e Inquilinos usan el dataset base (SdLl-ish); estos
       sobrescriben intake/cases/sessions con contenido de su sector. */
    const PROPUESTA_TYPE_DEMO = window.SINDICAPP_SINDICATO_DATA.PROPUESTA_TYPE_DEMO; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

    /* Runtime de Intake/Casos/Asambleas por (locale, tipo). Hasta 18-07 vivía solo en
       memoria — mover un caso, convertir un intake o avanzar un turno se perdía al
       recargar, en contradicción con el CRM_RUNTIME que sí persiste (F1 del report v4).
       Ahora se carga y guarda en localStorage como el resto del estado demo (ADR 0003). */
    const PROPUESTA_RUNTIME_KEY = 'sindicapp-propuesta-runtime-v1';
    const PROPUESTA_RUNTIME = (function loadPropuestaRuntime() {
        try {
            const raw = localStorage.getItem(PROPUESTA_RUNTIME_KEY);
            const parsed = raw ? JSON.parse(raw) : null;
            return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
        } catch (e) { return {}; }
    })();

    function savePropuestaRuntime() {
        try { localStorage.setItem(PROPUESTA_RUNTIME_KEY, JSON.stringify(PROPUESTA_RUNTIME)); } catch (e) { /* demo */ }
    }

    function getPropuestaData(locale, type) {
        const key = localeKey(locale);
        const typed = type && PROPUESTA_TYPE_DEMO[key] && PROPUESTA_TYPE_DEMO[key][type] ? type : 'base';
        const rk = key + ':' + typed;
        if (!PROPUESTA_RUNTIME[rk]) {
            const data = JSON.parse(JSON.stringify(PROPUESTA_DEMO[key]));
            if (typed !== 'base') Object.assign(data, JSON.parse(JSON.stringify(PROPUESTA_TYPE_DEMO[key][type])));
            PROPUESTA_RUNTIME[rk] = data;
        }
        return PROPUESTA_RUNTIME[rk];
    }

    /* Etapas ordenadas de un caso vivo (fusión 17-07: la ficha viva recupera el
       mover-etapa que tenía el pipeline clásico, para no perder esa interacción). */
    const PROPUESTA_CASE_STAGES = {
        es: ['Nuevo', 'En curso', 'Negociación', 'Resuelto'],
        ie: ['New', 'In progress', 'Bargaining', 'Resolved']
    };

    /* 18-07 (idea 47, report v4): documentos requeridos según el tema del caso. El
       checklist de faltantes se calcula contra los docs del caso — un doc presente
       pero con estado 'falta' cuenta como faltante. Temas sin entrada: sin checklist. */
    const PROPUESTA_THEME_DOCS = {
        es: {
            'Salario': ['Contrato', 'Nóminas', 'Registro horario'],
            'Jornada': ['Contrato', 'Cuadrante'],
            'Disciplinario': ['Carta de sanción', 'Alegaciones'],
            'Vivienda': ['Contrato de alquiler', 'Burofax']
        },
        ie: {
            'Pay': ['Contract', 'Payslips', 'Time records'],
            'Hours': ['Contract', 'Roster'],
            'Disciplinary': ['Sanction letter', 'Appeal'],
            'Housing': ['Lease', 'Notice letter']
        }
    };

    function propuestaMissingDocs(locale, cs) {
        const req = (PROPUESTA_THEME_DOCS[localeKey(locale)] || {})[cs.theme];
        if (!req) return null;
        const has = (r) => (cs.docs || []).some((d) => d.status !== 'falta'
            && (d.name.toLowerCase().indexOf(r.toLowerCase()) !== -1 || r.toLowerCase().indexOf(d.name.toLowerCase()) !== -1));
        return req.filter((r) => !has(r));
    }

    /* 18-07 (idea 44, report v4): del patrón detectado a la acción — convoca una sesión
       especial con los casos abiertos del actor pre-agrupados como turnos. */
    function propuestaCreatePatternSession(locale, actor, type) {
        const data = getPropuestaData(locale, type);
        const key = localeKey(locale);
        const es = key === 'es';
        if ((data.sessions || []).some((s) => s.patternActor === actor)) return 'exists';
        const lastStage = (PROPUESTA_CASE_STAGES[key] || []).slice(-1)[0];
        const openCases = (data.cases || []).filter((cs) => cs.actor === actor && cs.stage !== lastStage);
        if (!openCases.length) return null;
        if (!data.sessions) data.sessions = [];
        data.sessions.push({
            id: 'ps-pat-' + Date.now(),
            type: 'especial',
            patternActor: actor,
            title: (es ? 'Sesión especial: ' : 'Special session: ') + actor + ' (' + openCases.length + (es ? ' casos' : ' cases') + ')',
            date: es ? 'Por fijar' : 'To be scheduled',
            place: es ? 'Local del sindicato' : 'Union hall',
            attendance: 0,
            roles: [{ role: es ? 'Moderación' : 'Moderation', holder: '', backup: '' }],
            turns: openCases.map((cs) => ({ who: cs.person, kind: 'actualizacion', status: 'pendiente', caseRef: cs.title }))
        });
        savePropuestaRuntime();
        return 'created';
    }

    /* 18-07 (idea 45, report v4): registro de asistencia por sesión (contador demo). */
    function propuestaAddAttendance(locale, sessionId, type) {
        const data = getPropuestaData(locale, type);
        const s = (data.sessions || []).find((x) => x.id === sessionId);
        if (!s) return;
        s.attendance = (s.attendance || 0) + 1;
        savePropuestaRuntime();
    }

    /* 20-07 tarde (idea 65, report v5): toggle demo «sesión en curso» de una sesión de
       crm-asambleas — mientras está activo, las suplentes del cuadrante heredan las
       capacidades del rol (demo visual, sin gating real). Persistido en el runtime. */
    function propuestaToggleSessionLive(locale, sessionId, type) {
        const data = getPropuestaData(locale, type);
        const s = (data.sessions || []).find((x) => x.id === sessionId);
        if (!s) return false;
        s.enCurso = !s.enCurso;
        savePropuestaRuntime();
        return Boolean(s.enCurso);
    }

    /* 18-07 (idea 54, report v4): avisos según rol — lo que te toca, no un feed.
       Usuario+: documentos que faltan en tu caso y próxima agenda.
       20-07 (ADR 0024): los avisos internos ya no piden «militante» — relación
       afiliada + cualquier cargo ≠ ninguno (el estado militante emergente). */
    function collectNotifications(locale, role, cargo) {
        const c = t(locale);
        const items = [];
        const allow = (min) => propuestaRoleAllows(role || 'visitante', min);
        if (!allow('usuario')) return items;
        const data = getPropuestaData(locale, '');
        (data.myDocs || []).filter((d) => d.status === 'falta').forEach((d) => {
            items.push({ icon: '📄', text: String(c.notifDocFalta || '{d}').replace('{d}', d.name) });
        });
        getUpcomingAgendaDigest(locale, 2).forEach((ev) => {
            items.push({ icon: '📅', text: `${ev.date} · ${ev.title}` });
        });
        if (allow('afiliado') && cargoIsAny(cargo)) {
            (data.sessions || []).forEach((s) => {
                const pend = (s.turns || []).filter((tn) => tn.status === 'pendiente').length;
                if (pend) items.push({ icon: '🗳️', text: String(c.notifTurns || '{n}').replace('{n}', pend) + ' — ' + s.title });
            });
            const crm = getCrmData(locale, 'sindicapp');
            const rev = (crm.docs || []).filter((d) => d.revision && d.revision !== 'revisada').length;
            if (rev) items.push({ icon: '🔍', text: String(c.notifDocsReview || '{n}').replace('{n}', rev) });
        }
        return items;
    }

    function getNotificationCount(locale, role, cargo) {
        return collectNotifications(locale, role, cargo).length;
    }

    function buildNotificationsHtml(locale, role, cargo) {
        const c = t(locale);
        const items = collectNotifications(locale, role, cargo);
        const canSee = propuestaRoleAllows(role || 'visitante', 'usuario');
        const body = items.length
            ? items.map((it) => `<p class="sindicapp-notif-item"><span aria-hidden="true">${it.icon}</span> ${it.text}</p>`).join('')
            : `<p class="template-muted sindicapp-notif-item">${canSee ? c.notifEmpty : c.notifRoleTeaser}</p>`;
        return `<p class="sindicapp-notif-title"><span aria-hidden="true">🔔</span> ${c.notifTitle}</p>
            ${body}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>`;
    }

    /* 18-07 (idea 50, report v4): modo asamblea — panel de proyección a pantalla
       completa para moderar en vivo: turno actual en grande, cola siguiente, avanzar.
       «La mejor herramienta es la que se puede usar en medio de una asamblea.» */
    function buildAsambleaLiveHtml(locale, sessionId, type) {
        const data = getPropuestaData(locale, type);
        const s = (data.sessions || []).find((x) => x.id === sessionId);
        if (!s) return '';
        const c = t(locale);
        const turns = s.turns || [];
        const current = turns.find((tn) => tn.status === 'encurso');
        const pending = turns.filter((tn) => tn.status === 'pendiente');
        const done = turns.filter((tn) => tn.status === 'atendida').length;
        const cur = current
            ? `<p class="asamblea-live-label">${c.asambleaLiveNow}</p>
               <p class="asamblea-live-who">${current.who}</p>
               <p class="asamblea-live-case">${(c.propuestaTurnKind[current.kind] || current.kind)} · ${current.caseRef}</p>`
            : `<p class="asamblea-live-who asamblea-live-none">${pending.length ? c.asambleaLiveNone : c.asambleaLiveEmpty}</p>`;
        const queue = pending.slice(0, 4).map((tn) =>
            `<li><strong>${tn.who}</strong> <span class="template-muted">${tn.caseRef}</span></li>`
        ).join('');
        return `<div class="asamblea-live" role="dialog" aria-modal="true" aria-label="${c.asambleaLiveBtn}">
            <button type="button" class="asamblea-live-close" data-asamblea-live-close aria-label="${c.asambleaLiveClose}">✕</button>
            <p class="asamblea-live-title">${s.title} · <strong>${done}/${turns.length}</strong></p>
            <div class="asamblea-live-current">${cur}</div>
            ${pending.length ? `<p class="asamblea-live-label">${c.asambleaLiveNext}</p><ol class="asamblea-live-queue">${queue}</ol>` : ''}
            ${(current || pending.length) ? `<button type="button" class="crm-btn asamblea-live-advance" data-asamblea-live-next="${type || ''}|${s.id}">▶ ${c.propuestaAsambleasNext}</button>` : ''}
        </div>`;
    }

    /* 18-07 (idea 55, report v4): orden del día imprimible de una sesión, en markdown —
       sustituye un documento que hoy se hace a mano antes de cada asamblea. */
    function propuestaOrderOfDayText(locale, sessionId, type) {
        const data = getPropuestaData(locale, type);
        const s = (data.sessions || []).find((x) => x.id === sessionId);
        if (!s) return null;
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const lines = [];
        lines.push('# ' + s.title);
        lines.push('');
        lines.push(s.date + ' · ' + s.place);
        lines.push((c.propuestaSessionTypes[s.type] || s.type) + ' · ' + (s.attendance || 0) + ' ' + c.propuestaAttendance);
        lines.push('');
        lines.push('## ' + c.propuestaAsambleasRoles);
        (s.roles || []).forEach((r) => {
            const holder = r.holder || ('⚠️ ' + c.propuestaAsambleasRoleGap);
            lines.push('- ' + r.role + ': ' + holder + (r.backup ? ' (' + (es ? 'suplente' : 'backup') + ': ' + r.backup + ')' : ''));
        });
        if ((s.turns || []).length) {
            lines.push('');
            lines.push('## ' + c.propuestaAsambleasTurns);
            s.turns.forEach((tn, i) => {
                lines.push((i + 1) + '. [' + (c.propuestaTurnStatus[tn.status] || tn.status) + '] '
                    + tn.who + ' — ' + (c.propuestaTurnKind[tn.kind] || tn.kind) + ' · ' + tn.caseRef);
            });
        }
        lines.push('');
        lines.push('---');
        lines.push('_SindicApp (demo) · ' + new Date().toISOString().slice(0, 10) + '_');
        return { filename: 'orden-del-dia-' + s.id + '.md', content: lines.join('\n') };
    }

    function propuestaMoveCase(locale, caseId, dir, type) {
        const key = localeKey(locale);
        const stages = PROPUESTA_CASE_STAGES[key] || [];
        const data = getPropuestaData(locale, type);
        const cs = data.cases.find((x) => x.id === caseId);
        if (!cs) return;
        const idx = stages.indexOf(cs.stage);
        const next = idx + (dir === 'back' ? -1 : 1);
        if (idx === -1 || next < 0 || next >= stages.length) return;
        cs.stage = stages[next];
        if (cs.stage === stages[stages.length - 1] && !cs.outcome) cs.outcome = 'favorable';
        if (cs.stage !== stages[stages.length - 1]) cs.outcome = '';
        savePropuestaRuntime();
    }

    /* 17-07-2026 (idea 4, cola): botón «Convertir en afiliada» funcional en el Intake. */
    function propuestaConvertIntake(locale, name, type) {
        const data = getPropuestaData(locale, type);
        const p = (data.intake || []).find((x) => x.name === name && x.state !== 'convertida' && x.state !== 'archivada');
        if (!p) return;
        p.state = 'convertida';
        p.next = '—';
        savePropuestaRuntime();
    }

    function propuestaAdvanceTurn(locale, sessionId, type) {
        const data = getPropuestaData(locale, type);
        const session = data.sessions.find((s) => s.id === sessionId);
        if (!session) return;
        const current = session.turns.find((tn) => tn.status === 'encurso');
        if (current) current.status = 'atendida';
        const next = session.turns.find((tn) => tn.status === 'pendiente');
        if (next) next.status = 'encurso';
        savePropuestaRuntime();
    }

    function propuestaItemLabel(c, item) {
        if (item.type === 'sub' && !item.labelKey) return (c.subs && c.subs[item.id]) || item.id;
        const key = item.labelKey || item.id;
        return (c.propuestaItems && c.propuestaItems[key]) || key;
    }

    /* 20-07-2026 (ADR 0025): grupo del acordeón al que pertenece un sub — para la
       auto-expansión cuando el sub activo cambia por cualquier vía (click de nav,
       búsqueda global, hash/History). 'self'/'usuario' viven en
       Funcionalidades; los subs sin botón en la nav (feed, coordination…)
       devuelven '' y no fuerzan cambio de grupo. */
    function navGroupForSub(sub) {
        if (sub === 'self' || sub === 'usuario') return 'funcionalidades';
        if (PROPUESTA_COLECTIVOS.some((it) => it.id === sub)) return 'sindicatos';
        if (PROPUESTA_TOOLS.some((it) => it.id === sub)) return 'funcionalidades';
        return '';
    }

    /* Nav de la propuesta: SOLO los dos cuadros de la Clásica (sin selector de rol
       global ni pantalla explicativa — decisión Edu: eso vive dentro de cada módulo).
       Los items con anillo superior al rol actual muestran candado pero se atraviesan:
       el módulo abierto explica el anillo y ofrece el cambio de rol contextual.
       20-07-2026 (ADR 0025): los dos cuadros pasan a ser un ACORDEÓN con cabecera —
       «Sindicatos» (los 6 colectivos) y «Funcionalidades» (las 6 herramientas). Solo
       un grupo está abierto (expandedGroup); del cerrado se ve SOLO su cabecera. El
       nombre del stub `sindicatos` renace como cabecera del grupo de colectivos (el
       id del módulo sigue reservado y fuera de uso). */
    /* 20-07 tarde (idea 68 parcial): fuera el 4º parámetro `activeScreen` — solo
       existía para marcar activa la pantalla del sub `anillo`, ya purgado. */
    function buildPropuestaNavHtml(locale, role, activeSub, expandedGroup) {
        const c = t(locale);
        const item = (it) => {
            const label = propuestaItemLabel(c, it);
            const gated = it.minRole && !propuestaRoleAllows(role, it.minRole);
            const isActive = activeSub === it.id || (it.id === 'usuario' && activeSub === 'self');
            const wide = it.wide ? ' template-module-btn--wide' : '';
            const lockCls = gated ? ' propuesta-item-locked' : '';
            const icon = gated ? '🔒' : it.icon;
            /* 18-07 (F7): el candado no puede comunicarse solo por emoji — aria-label
               explícito con el rol necesario para lectores de pantalla. */
            const roleName = gated ? ((c.propuestaRoles && c.propuestaRoles[it.minRole]) || it.minRole) : '';
            const gatedAria = gated ? ` aria-label="${label} — ${c.propuestaLockedTitle || ''} (${roleName})"` : '';
            return `<button type="button" class="template-module-btn${isActive ? ' active' : ''}${lockCls}${wide}" data-propuesta-goto="${it.type}:${it.id}"${gatedAria}>
                <span aria-hidden="true">${icon}</span> ${label}
            </button>`;
        };
        /* Sin argumento (llamadas legacy) el grupo por defecto es 'sindicatos'. */
        const open = expandedGroup === 'funcionalidades' ? 'funcionalidades' : 'sindicatos';
        const group = (key, labelKey, items, extraCls) => {
            const expanded = open === key;
            const label = c[labelKey] || key;
            return `<div class="sindicato-subnav-group${extraCls}${expanded ? '' : ' sindicato-subnav-group--collapsed'}">
                <button type="button" class="sindicato-subnav-group-header" data-propuesta-navgroup="${key}" aria-expanded="${expanded ? 'true' : 'false'}">
                    <span class="sindicato-subnav-group-chevron" aria-hidden="true">${expanded ? '▾' : '▸'}</span> ${label}
                </button>
                ${expanded ? items.map(item).join('') : ''}
            </div>`;
        };
        return group('sindicatos', 'navGroupSindicatos', PROPUESTA_COLECTIVOS, ' sindicato-subnav-group--colectivos')
            + group('funcionalidades', 'navGroupFuncionalidades', PROPUESTA_TOOLS, '');
    }

    /* Chips de rol contextuales (demo): aparecen DENTRO de los espacios protegidos,
       no en la nav — el cambio de rol se ofrece donde el anillo se hace visible. */
    function buildPropuestaRoleChipsHtml(locale, role) {
        const c = t(locale);
        /* 20-07-2026 (ADR 0024): tres etapas de relación — 'militante' desaparece de
           los chips; dentro de la organización el acceso lo dan los cargos. */
        const roles = ['visitante', 'usuario', 'afiliado'];
        const chips = roles.map((r) =>
            `<button type="button" class="propuesta-role-chip${r === role ? ' active' : ''}" data-propuesta-role="${r}">${c.propuestaRoles[r]}</button>`
        ).join('');
        return `<p class="propuesta-viewas-line">${c.propuestaViewAs}:</p><div class="propuesta-role-row">${chips}</div>`;
    }

    /* 20-07-2026 (ideas 42+43, ADR 0024): chips de cargo demo — «ocupa un cargo» en
       lugar del viejo chip militante. Mismo estilo que los chips de relación.
       20-07 tarde (idea 63): con ctx {type, orgId} añade además los cargos del
       ORGANIGRAMA del equipo abierto (seed + ad hoc vigentes) como chips propios. */
    function buildCargoChipsHtml(locale, cargo, ctx) {
        const c = t(locale);
        const current = cargo || 'ninguno';
        const chip = (id, label) =>
            `<button type="button" class="propuesta-role-chip${id === current ? ' active' : ''}" data-propuesta-cargo="${id}">${label}</button>`;
        const chips = DEMO_CARGOS.map((id) =>
            chip(id, (c.propuestaCargos && c.propuestaCargos[id]) || id)
        ).join('');
        let teamRow = '';
        if (ctx && ctx.type) {
            const teamCargos = getTeamCargos(locale, ctx.type);
            const adhoc = ctx.orgId
                ? getAdhocCargos(locale, ctx.orgId).filter((cg) => !adhocCargoExpired(cg))
                : [];
            const teamChips = teamCargos.map((cg) => chip(cg.id, cg.label))
                .concat(adhoc.map((cg) => chip(cg.id, `${cg.nombre} ⏳`)))
                .join('');
            if (teamChips) {
                teamRow = `<p class="propuesta-viewas-line">${c.propuestaCargoTeamLine || ''}</p><div class="propuesta-role-row">${teamChips}</div>`;
            }
        }
        return `<p class="propuesta-viewas-line">${c.propuestaCargoChipsLine}</p><div class="propuesta-role-row">${chips}</div>${teamRow}`;
    }

    /* 20-07-2026 (ADR 0024): candado de CARGO. Si la relación no llega a afiliada,
       manda el candado de relación de siempre; si eres afiliada sin la capacidad,
       el candado se vuelve información organizativa — dice QUIÉN lo lleva y ofrece
       ocupar el cargo (demo). capabilityId vacío = basta cualquier cargo.
       20-07 tarde (idea 63): ctx {type, orgId} opcional para ofrecer también los
       cargos del organigrama del equipo abierto. */
    function buildCargoLockedHtml(locale, capabilityId, currentRole, currentCargo, ctx) {
        const role = currentRole || 'visitante';
        if (!propuestaRoleAllows(role, 'afiliado')) {
            return buildPropuestaLockedHtml(locale, 'afiliado', role);
        }
        const c = t(locale);
        const cap = normalizeCapabilityId(capabilityId);
        const holder = cap ? cargoForCapability(cap) : '';
        const holderName = holder ? ((c.propuestaCargos && c.propuestaCargos[holder]) || holder) : '';
        const body = cap
            ? String(c.propuestaCargoLockedBody || '{cargo}').replace('{cargo}', holderName)
            : (c.propuestaCargoLockedAnyBody || '');
        return `<div class="sindicato-panel propuesta-locked-panel propuesta-cargo-locked">
            <h2><span aria-hidden="true">🔒</span> ${c.propuestaCargoLockedTitle}</h2>
            <p class="template-muted">${body}</p>
            ${buildCargoChipsHtml(locale, currentCargo || 'ninguno', ctx)}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* Espacio interno de un colectivo (anillo afiliado) — tarjeta embebida al final
       del directorio de cada módulo de la Red Social, solo en la versión Propuesta. */
    function buildPropuestaInternalSpaceHtml(locale, view) {
        const v = view || {};
        if (v.webVersion !== 'propuesta') return '';
        const c = t(locale);
        const role = v.propuestaRole || 'visitante';
        if (!propuestaRoleAllows(role, 'afiliado')) {
            return `<section class="sindicato-sector-section propuesta-internal propuesta-internal-locked">
                <header class="sindicato-sector-section-head">
                    <span class="sindicato-sector-section-icon" aria-hidden="true">🔒</span>
                    <h3>${c.propuestaInternalTitle}</h3>
                </header>
                <p class="template-muted">${c.propuestaLockedBody.replace('{role}', c.propuestaRoles.afiliado)}</p>
                ${buildPropuestaRoleChipsHtml(locale, role)}
            </section>`;
        }
        const data = getPropuestaData(locale);
        const threads = data.internalThreads.slice(0, 2).map((th) =>
            `<div class="sindicato-coord-card"><strong>${th.title}</strong><p class="template-muted">${th.replies} ${c.feedRepliesLabel} · ${th.last}</p></div>`
        ).join('');
        return `<section class="sindicato-sector-section propuesta-internal">
            <header class="sindicato-sector-section-head">
                <span class="sindicato-sector-section-icon" aria-hidden="true">🫂</span>
                <h3>${c.propuestaInternalTitle}</h3>
            </header>
            <p class="template-muted">${c.propuestaInternalIntro}</p>
            ${threads}
            ${buildPropuestaRoleChipsHtml(locale, role)}
        </section>`;
    }

    /* 17-07-2026 (descomposición del CRM): entrada de gestión dentro de cada módulo de
       colectivo. El CRM ya no es un módulo aparte; cada uno de los 6 tipos de sindicato
       alberga su propia gestión, militante-gated, con una nota de peculiaridad por tipo.
       `moduleType` ∈ unions|profesionales|housing|autonomos|consumidores|estudiantes. */
    function buildModuleGestionEntryHtml(locale, moduleType, view) {
        const v = view || {};
        if (v.webVersion !== 'propuesta') return '';
        const c = t(locale);
        const role = v.propuestaRole || 'visitante';
        const cargo = v.propuestaCargo || 'ninguno';
        const note = (c.crmModuleNotes || {})[moduleType] || '';
        /* 20-07-2026 (ADR 0024): la entrada de gestión ya no pide «militante» —
           relación afiliada + cualquier cargo del equipo. */
        if (!propuestaRoleAllows(role, 'afiliado') || !cargoIsAny(cargo)) {
            const chips = !propuestaRoleAllows(role, 'afiliado')
                ? buildPropuestaRoleChipsHtml(locale, role)
                : buildCargoChipsHtml(locale, cargo, { type: moduleType });
            return `<section class="sindicato-sector-section propuesta-internal propuesta-internal-locked propuesta-gestion-entry">
                <header class="sindicato-sector-section-head">
                    <span class="sindicato-sector-section-icon" aria-hidden="true">🔒</span>
                    <h3>${c.gestionEntryTitle}</h3>
                </header>
                <p class="template-muted">${propuestaRoleAllows(role, 'afiliado') ? (c.propuestaCargoLockedAnyBody || c.gestionEntryLockedIntro) : c.gestionEntryLockedIntro}</p>
                ${chips}
            </section>`;
        }
        return `<section class="sindicato-sector-section propuesta-internal propuesta-gestion-entry">
            <header class="sindicato-sector-section-head">
                <span class="sindicato-sector-section-icon" aria-hidden="true">📇</span>
                <h3>${c.gestionEntryTitle}</h3>
            </header>
            <p class="template-muted">${note}</p>
            <button type="button" class="sindicato-cta-btn sindicato-cta-btn-active" data-sindicato-goto-crm="${moduleType}">${c.gestionEntryCta}</button>
        </section>`;
    }

    function buildPropuestaLockedHtml(locale, minRole, currentRole) {
        const c = t(locale);
        const roleName = c.propuestaRoles[minRole] || minRole;
        return `<div class="sindicato-panel propuesta-locked-panel">
            <h2><span aria-hidden="true">🔒</span> ${c.propuestaLockedTitle}</h2>
            <p class="template-muted">${c.propuestaLockedBody.replace('{role}', roleName)}</p>
            ${buildPropuestaRoleChipsHtml(locale, currentRole || 'visitante')}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    function propuestaDocBadge(c, status) {
        const cls = { ok: 'activa', falta: 'baja', revision: 'pendiente' }[status] || 'borrador';
        return `<span class="crm-badge crm-badge-${cls}">${(c.propuestaDocStatus && c.propuestaDocStatus[status]) || status}</span>`;
    }

    function buildPropuestaScreenHtml(locale, screen, role, type, cargo) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const data = getPropuestaData(locale, type);
        const roleName = c.propuestaRoles[role] || role;
        const tp = type || '';
        const cg = cargo || 'ninguno';
        /* Comisión responsable por tipo, para la línea de playbook del caso. */
        const casoComision = {
            profesionales: es ? 'Defensa profesional' : 'Professional defence',
            autonomos: es ? 'Tarifas y condiciones' : 'Rates & conditions',
            estudiantes: es ? 'Reivindicativa' : 'Demands'
        }[type] || (es ? 'Acción sindical' : 'Union action');
        /* Puertas por pantalla: la doctrina, aplicada.
           20-07 (ADR 0024): las pantallas de gestión piden relación afiliada + cargo
           con la capacidad. 20-07 tarde (idea 69, DECISIÓN Edu): el foro interno
           vuelve a ser afiliado-solo, SIN exigir cargo — el espacio interno de base
           pertenece a la afiliación, no al cargo (igual que la tarjeta embebida
           buildPropuestaInternalSpaceHtml). Los avisos internos de la campana sí
           siguen requiriendo cargo: son operativos (collectNotifications). */
        const gates = { miscasos: 'usuario', forointerno: 'afiliado', intake: 'afiliado', casos: 'afiliado', asambleas: 'afiliado' };
        if (gates[screen] && !propuestaRoleAllows(role, gates[screen])) {
            return buildPropuestaLockedHtml(locale, gates[screen], role);
        }
        const cargoGates = { intake: 'intake', casos: 'casos', asambleas: 'asambleas' };
        if (cargoGates[screen] && !cargoAllows(cg, cargoGates[screen])) {
            return buildCargoLockedHtml(locale, cargoGates[screen], role, cg, { type: tp });
        }
        if (screen === 'miscasos') {
            const caseCards = data.myCases.map((cs) =>
                `<div class="sindicato-coord-card"><strong>${cs.title}</strong><p><span class="crm-badge crm-badge-programada">${cs.stage}</span> <span class="template-muted">· ${cs.updated}</span></p><p class="template-muted">${cs.note}</p></div>`
            ).join('');
            const docRows = data.myDocs.map((d) =>
                `<div class="sindicato-coord-card propuesta-doc-row"><strong>${d.name}</strong>${propuestaDocBadge(c, d.status)}</div>`
            ).join('');
            /* 20-07 (idea 43, ADR 0024): simulador «ver como» — bloque compacto en el
               perfil de Usuario: relación actual + cargo actual, y una línea que dice
               que así ves la app. La doctrina de privacidad hecha visible sin escribirla. */
            const viewAsBlock = `<section class="sindicato-sector-section propuesta-viewas-sim">
                <header class="sindicato-sector-section-head">
                    <span class="sindicato-sector-section-icon" aria-hidden="true">👁</span>
                    <h3>${c.propuestaViewAs}</h3>
                </header>
                <p class="template-muted">${c.propuestaViewAsNow}</p>
                ${buildPropuestaRoleChipsHtml(locale, role)}
                ${buildCargoChipsHtml(locale, cg)}
            </section>`;
            return `<div class="sindicato-panel propuesta-screen">
                <h2>🗂️ ${c.propuestaMisCasosTitle}</h2>
                <p class="template-muted">${c.propuestaMisCasosIntro}</p>
                <h3>${c.propuestaMisCasosCases}</h3>
                ${caseCards}
                <h3>${c.propuestaMisCasosDocs}</h3>
                ${docRows}
                ${viewAsBlock}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        if (screen === 'forointerno') {
            const threads = data.internalThreads.map((th) =>
                `<div class="sindicato-coord-card"><strong>${th.title}</strong><p class="template-muted">${th.replies} ${c.feedRepliesLabel} · ${th.last}</p></div>`
            ).join('');
            const sessions = data.sessions.filter((s) => s.type === 'ordinaria').map((s) =>
                `<div class="sindicato-coord-card sindicato-mob-card"><strong>${s.date}</strong><p>${s.title}</p><p class="template-muted">📍 ${s.place} · ${s.attendance} ${c.propuestaAttendance}</p></div>`
            ).join('');
            return `<div class="sindicato-panel propuesta-screen">
                <h2>🫂 ${c.propuestaForoInternoTitle}</h2>
                <p class="template-muted">${c.propuestaForoInternoIntro}</p>
                <h3>${c.propuestaForoInternoThreads}</h3>
                ${threads}
                <h3>${c.propuestaForoInternoSessions}</h3>
                ${sessions}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        if (screen === 'intake') {
            const states = ['nuevo', 'seguimiento', 'convertida', 'archivada'];
            const cols = states.map((st) => {
                const cards = data.intake.filter((p) => p.state === st).map((p) => `
                    <div class="crm-case-card propuesta-intake-card">
                        <strong>${p.name}</strong>
                        <p class="template-muted">${p.theme}</p>
                        <p class="crm-case-meta">${p.channel} · ${p.territory}</p>
                        <p class="crm-case-meta">${c.propuestaIntakeNext}: ${p.next}</p>
                        ${(st === 'seguimiento' || st === 'nuevo') ? `<button type="button" class="crm-mini-btn propuesta-convert-btn" data-propuesta-intake-convert="${tp}|${String(p.name).replace(/"/g, '&quot;')}">➜ ${c.propuestaIntakeConvert}</button>` : ''}
                    </div>`).join('');
                return `<div class="crm-pipeline-col">
                    <h4>${c.propuestaIntakeStates[st]} <span class="crm-count">${data.intake.filter((p) => p.state === st).length}</span></h4>
                    ${cards || `<p class="template-muted crm-empty-col">—</p>`}
                </div>`;
            }).join('');
            return `<div class="sindicato-panel propuesta-screen">
                <h2>📥 ${c.propuestaIntakeTitle}</h2>
                <p class="template-muted">${c.propuestaIntakeIntro}</p>
                <input type="search" class="sindicato-search-input" placeholder="${c.propuestaFilterPlaceholder}" aria-label="${c.propuestaFilterPlaceholder}" data-live-filter=".propuesta-intake-card">
                <div class="crm-pipeline">${cols}</div>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        if (screen === 'casos') {
            /* 20-07 tarde (idea 67, report v5): ámbitos operativos — si el cargo
               ocupado declara `ambitoTerritorio`, la pantalla de casos se recorta a
               los casos de ese territorio (los sin territorio se muestran siempre).
               Coordinación ve todo. */
            const cargoDef = cg === 'coordinacion' ? null : resolveCargoDef(locale, cg);
            const scopeTerr = (cargoDef && cargoDef.ambitoTerritorio) || '';
            const visibleCases = scopeTerr
                ? data.cases.filter((cs) => !cs.territoryId || cs.territoryId === scopeTerr)
                : data.cases;
            const scopeTerrObj = scopeTerr ? getSubterritoryById(locale, scopeTerr) : null;
            const scopeLine = scopeTerr
                ? `<p class="propuesta-scope-line">📍 ${String(c.propuestaCasosScope || '{t}').replace('{t}', scopeTerrObj ? scopeTerrObj.name : scopeTerr)}</p>`
                : '';
            /* Detección de patrones: actores con ≥3 casos abiertos (sobre lo visible) */
            const actorCounts = {};
            visibleCases.filter((cs) => cs.stage !== (es ? 'Resuelto' : 'Resolved')).forEach((cs) => {
                actorCounts[cs.actor] = (actorCounts[cs.actor] || 0) + 1;
            });
            const pattern = Object.entries(actorCounts).find(([, n]) => n >= 3);
            /* 18-07 (idea 44): del patrón a la acción — botón para convocar la sesión
               especial con los casos del actor pre-agrupados. */
            const patternSessionExists = pattern && (data.sessions || []).some((s) => s.patternActor === pattern[0]);
            const patternAction = pattern
                ? (patternSessionExists
                    ? ` <span class="template-muted">· ${c.propuestaCasosSessionExists}</span>`
                    : ` <button type="button" class="crm-mini-btn" data-propuesta-pattern-session="${tp}|${String(pattern[0]).replace(/"/g, '&quot;')}">🗳️ ${c.propuestaCasosConvene}</button>`)
                : '';
            const patternBanner = pattern
                ? `<div class="propuesta-pattern-banner">${c.propuestaCasosPattern.replace('{n}', pattern[1]).replace('{actor}', pattern[0])}${patternAction}</div>`
                : '';
            const caseCards = visibleCases.map((cs) => {
                const updates = cs.updates.map((u) =>
                    `<li><span class="propuesta-update-date">${u.date}</span> <strong>${u.by}</strong> — ${u.note}</li>`
                ).join('');
                const docs = cs.docs.map((d) =>
                    `<span class="propuesta-doc-chip">${d.name} ${propuestaDocBadge(c, d.status)}</span>`
                ).join('');
                const outcome = cs.outcome
                    ? `<p><strong>${c.propuestaCasosOutcome}:</strong> <span class="crm-badge crm-badge-activa">${c.propuestaFavorableBadge}</span></p>`
                    : '';
                /* Idea 8: el tema conecta con el playbook — guía wiki + comisión responsable. */
                const playbook = `<p class="propuesta-playbook">${c.propuestaCasosPlaybook}:
                    <button type="button" class="sindicato-union-company-link" data-sindicato-wiki-jump="derechos">📖 ${(c.wikiArticles && c.wikiArticles.derechos ? c.wikiArticles.derechos.title : (es ? 'Derechos' : 'Rights'))}</button>
                    <button type="button" class="sindicato-union-company-link" data-sindicato-wiki-jump="denunciar">📢 ${(c.wikiArticles && c.wikiArticles.denunciar ? c.wikiArticles.denunciar.title : (es ? 'Cómo denunciar' : 'How to report'))}</button>
                    <span class="template-muted">· ${c.propuestaComisionLabel}: ${casoComision}</span>
                </p>`;
                const stages = PROPUESTA_CASE_STAGES[localeKey(locale)] || [];
                const stIdx = stages.indexOf(cs.stage);
                const stageControls = `<div class="crm-case-actions propuesta-case-stage">
                        <button type="button" class="crm-mini-btn" data-propuesta-case-move="${tp}|${cs.id}|back" ${stIdx <= 0 ? 'disabled' : ''} aria-label="${c.crmStagePrevAria}">◀</button>
                        <span class="crm-badge crm-badge-programada">${cs.stage}</span>
                        <button type="button" class="crm-mini-btn" data-propuesta-case-move="${tp}|${cs.id}|fwd" ${stIdx === stages.length - 1 ? 'disabled' : ''} aria-label="${c.crmStageNextAria}">▶</button>
                    </div>`;
                return `<details class="propuesta-case">
                    <summary><strong>${cs.title}</strong> <span class="crm-badge crm-badge-programada">${cs.stage}</span> <span class="template-muted">· ${cs.person} · ${c.propuestaLlevaLabel} ${cs.owner}</span></summary>
                    <p class="template-muted">${c.propuestaCasosActor}: <strong>${cs.actor}</strong> · ${c.propuestaTemaLabel}: ${cs.theme}</p>
                    ${stageControls}
                    ${playbook}
                    <h4>${c.propuestaCasosHistory}</h4>
                    <ul class="propuesta-updates">${updates}</ul>
                    <h4>${c.propuestaCasosDocs}</h4>
                    <p class="propuesta-doc-chips">${docs}</p>
                    ${(() => {
                        /* 18-07 (idea 47): checklist de documentos requeridos por tema. */
                        const missing = propuestaMissingDocs(locale, cs);
                        if (missing === null) return '';
                        return missing.length
                            ? `<p class="propuesta-docs-missing"><span aria-hidden="true">⚠️</span> ${c.propuestaCasosDocsMissing}: <strong>${missing.join(', ')}</strong></p>`
                            : `<p class="propuesta-docs-missing propuesta-docs-ok"><span aria-hidden="true">✅</span> ${c.propuestaCasosDocsComplete}</p>`;
                    })()}
                    ${outcome}
                </details>`;
            }).join('');
            return `<div class="sindicato-panel propuesta-screen">
                <h2>📂 ${c.propuestaCasosTitle}</h2>
                <p class="template-muted">${c.propuestaCasosIntro}</p>
                ${scopeLine}
                ${patternBanner}
                <input type="search" class="sindicato-search-input" placeholder="${c.propuestaFilterPlaceholder}" aria-label="${c.propuestaFilterPlaceholder}" data-live-filter=".propuesta-case">
                ${caseCards}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        if (screen === 'asambleas') {
            const sessionCards = data.sessions.map((s) => {
                const typeBadge = `<span class="crm-badge crm-badge-${s.type === 'ordinaria' ? 'asamblea' : s.type === 'bienvenida' ? 'formacion' : 'negociacion'}">${c.propuestaSessionTypes[s.type]}</span>`;
                /* 20-07 tarde (idea 65, report v5): toggle demo «sesión en curso» — con la
                   sesión activa, las suplentes del cuadrante HEREDAN las capacidades del rol
                   (demo visual: badge «hereda»; sin gating real por sesión). Persistido en
                   el runtime propuesta (savePropuestaRuntime). */
                const live = Boolean(s.enCurso);
                const heredaBadge = live
                    ? ` <span class="crm-badge crm-badge-activa propuesta-hereda-badge">${c.propuestaHeredaBadge || 'hereda'}</span>`
                    : '';
                const roles = (s.roles || []).map((r) => {
                    const gap = !r.holder;
                    return `<div class="propuesta-role-slot${gap ? ' propuesta-role-gap' : ''}">
                        <strong>${r.role}</strong>
                        <span>${gap ? `⚠️ ${c.propuestaAsambleasRoleGap}` : r.holder}${r.backup ? ` <span class="template-muted">· ${c.propuestaSuplenteLabel}: ${r.backup}</span>${heredaBadge}` : ''}</span>
                    </div>`;
                }).join('');
                const liveToggle = `<button type="button" class="crm-mini-btn${live ? ' propuesta-session-live-active' : ''}" data-propuesta-session-live="${tp}|${s.id}" aria-pressed="${live ? 'true' : 'false'}">${live ? (c.propuestaSessionLiveOn || '⏹') : (c.propuestaSessionLiveOff || '▶')}</button>`;
                const liveNote = live
                    ? `<p class="propuesta-session-live-note">🟢 ${c.propuestaSessionLiveNote || ''}</p>`
                    : '';
                const turns = (s.turns || []).map((tn) =>
                    `<li class="propuesta-turn propuesta-turn-${tn.status}">
                        <span class="propuesta-turn-status">${c.propuestaTurnStatus[tn.status]}</span>
                        <strong>${tn.who}</strong>
                        <span class="template-muted">${c.propuestaTurnKind[tn.kind]} · ${tn.caseRef}</span>
                    </li>`
                ).join('');
                const turnBlock = (s.turns || []).length
                    ? `<h4>${c.propuestaAsambleasTurns}</h4>
                       <ol class="propuesta-turns">${turns}</ol>
                       <button type="button" class="crm-btn" data-propuesta-turno-next="${tp}|${s.id}">${c.propuestaAsambleasNext}</button>
                       <button type="button" class="crm-btn" data-asamblea-live-open="${tp}|${s.id}">📽️ ${c.asambleaLiveBtn}</button>`
                    : '';
                return `<div class="sindicato-coord-card propuesta-session">
                    <p>${typeBadge} <strong>${s.title}</strong></p>
                    <p class="template-muted">${s.date} · 📍 ${s.place} · ${s.attendance} ${c.propuestaAttendance}
                        <button type="button" class="crm-mini-btn" data-propuesta-attend="${tp}|${s.id}" aria-label="${c.propuestaAttendAdd}">➕ ${c.propuestaAttendAdd}</button>
                        <button type="button" class="crm-mini-btn" data-propuesta-agenda-export="${tp}|${s.id}">🖨️ ${c.propuestaAgendaExport}</button>
                        ${liveToggle}
                    </p>
                    ${liveNote}
                    <h4>${c.propuestaAsambleasRoles}</h4>
                    <div class="propuesta-role-grid">${roles}</div>
                    ${turnBlock}
                </div>`;
            }).join('');
            return `<div class="sindicato-panel propuesta-screen">
                <h2>🗳️ ${c.propuestaAsambleasTitle}</h2>
                <p class="template-muted">${c.propuestaAsambleasIntro}</p>
                ${sessionCards}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        /* 20-07 tarde (idea 68 parcial): la pantalla «inicio» (tarjetas de anillos)
           se purgó junto con PROPUESTA_RINGS — ya no hay pantalla por defecto. */
        return '';
    }

    /* ================================================================
     * Red Social (13-07-2026) — módulo master: landing por defecto, tronco
     * hacia los módulos de colectivo y herramienta. Panel de stats por
     * módulo + feed de actividad. 17-07-2026: se añaden Profesionales y
     * Autónomos (8 tarjetas).
     * ================================================================ */
    function buildRedSocialHtml(locale) {
        const c = t(locale);
        const localeTag = localeKey(locale) === 'es' ? 'es-ES' : 'en-IE';
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
        const proBodies = getProBodies(locale);
        const proUnions = proBodies.reduce((s, b) => s + b.unions.length, 0);
        const autPlatforms = getAutonomoPlatforms(locale);
        const autCampaigns = autPlatforms.reduce((s, p) => s + p.campaigns.length, 0);
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
        /* 17-07-2026 (reforma de portada): los seis colectivos van juntos y separados de
           las herramientas transversales, igual que la navegación; se añade Inquilinos,
           que faltaba. Arriba, cifras agregadas de la plataforma; debajo, las próximas
           fechas de la agenda y la actividad reciente. */
        const housingUnions = getHousingUnions(locale);
        const housingBuildings = housingUnions.reduce((s, u) => s + (u.buildings || 0), 0);
        const agenda = buildAgendaHtml(locale, getUpcomingAgendaDigest(locale, 4), { compact: true });
        return `<div class="sindicato-panel sindicato-redsocial">
            <header class="redsocial-hero">
                <h2>💬 ${c.redSocialTitle}</h2>
                <p class="redsocial-claim">${c.redSocialClaim}</p>
                <p class="template-muted">${c.redSocialIntro}</p>
            </header>
            <div class="redsocial-totals">
                <div class="sindicato-stat"><strong>${fmt(members)}</strong><span>${c.redSocialTotalMembers}</span></div>
                <div class="sindicato-stat"><strong>${fmt(wps.length)}</strong><span>${c.redSocialTotalCompanies}</span></div>
                <div class="sindicato-stat"><strong>${fmt(reports)}</strong><span>${c.redSocialTotalReports}</span></div>
                <div class="sindicato-stat"><strong>${fmt(terrs.length)}</strong><span>${c.redSocialTotalTerritories}</span></div>
            </div>
            <h3>${c.redSocialColectivosTitle}</h3>
            <div class="sindicato-redsocial-grid">
                ${card('unions', '🏛️', unions.length, members)}
                ${card('profesionales', '🩺', proBodies.length, proUnions)}
                ${card('housing', '🏠', housingUnions.length, housingBuildings)}
                ${card('autonomos', '🧰', autPlatforms.length, autCampaigns)}
                ${card('consumidores', '🛒', consumers.length, consumerCampaigns)}
                ${card('estudiantes', '🎓', centers.length, studentGroups)}
            </div>
            <h3>${c.redSocialHerramientasTitle}</h3>
            <div class="sindicato-redsocial-grid">
                ${card('vivienda', '🏘️', terrs.length, alerts.length)}
                ${card('sectores', '🏭', sectorParents, subforums)}
                ${card('workplaces', '🏢', wps.length, reports)}
            </div>
            <h3>${c.agendaUpcomingTitle}</h3>
            ${agenda}
            <h3>${c.redSocialActivityTitle}</h3>
            <div class="sindicato-feed">${activity}</div>
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em>
                <button type="button" class="sindicato-reset-demo-btn" data-sindicapp-reset-demo>↺ ${c.resetDemoLabel}</button>
            </p>
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
        /* 18-07 (idea 51, report v4): rutas para el historial real del navegador —
           módulo de primer nivel y equipo abierto (tipo:entidad:sección). */
        const subMatch = h.match(/^sindicato-sub:([a-z]+)$/);
        if (subMatch) return { view: 'sub', subId: subMatch[1] };
        const eqMatch = h.match(/^sindicato-equipo:([a-z]+):([^:]+)(?::([a-z0-9-]+))?$/);
        if (eqMatch) return { view: 'equipo', type: eqMatch[1], entityId: eqMatch[2], sectionId: eqMatch[3] || '' };
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

    /* 17-07-2026 (ADR 0018): el català és un IDIOMA sobre el conjunt de dades `es`.
       `localeKey` resol DADES (empreses, territoris, sindicats…) i només retorna
       'es' | 'ie'; `copyKey` resol TEXTOS i pot retornar 'ca'. */
    function localeKey(locale) {
        return (locale === 'es' || locale === 'ca') ? 'es' : 'ie';
    }

    function copyKey(locale) {
        if (locale === 'ca' && COPY.ca) return 'ca';
        return localeKey(locale);
    }

    function t(locale) {
        return COPY[copyKey(locale)];
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
            sector: payload.sector.trim() || (subsector?.parentName || (localeKey(locale) === 'es' ? 'Sin clasificar' : 'Unclassified')),
            subsectorId: subsector?.id || subsectorId || '',
            territoryId: territory?.id || territoryId || '',
            address: payload.address.trim(),
            lat: Number(payload.lat) || base.lat,
            lng: Number(payload.lng) || base.lng,
            workers: 0,
            reports: 0,
            unions: [],
            strikeSupport: 0,
            convenio: localeKey(locale) === 'es' ? 'Convenio sectorial por determinar' : 'Sectoral agreement TBD',
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
        const es = localeKey(locale) === 'es';
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
            <div class="sindicato-panel-head">
                <h2>${wp.name}</h2>
                <button type="button" class="sindicato-share-btn" data-sindicato-share="empresa:${wp.id}">${c.shareBtn}</button>
            </div>
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
        const playbook = (c.wikiArticles && c.wikiArticles.derechos)
            ? `<div class="sindicato-report-playbook">
                <strong>📖 ${c.reportPlaybookTitle}</strong>
                <div class="sindicato-union-companies">
                    <button type="button" class="sindicato-union-company-link" data-sindicato-wiki-jump="derechos">${c.wikiArticles.derechos.title}</button>
                    <button type="button" class="sindicato-union-company-link" data-sindicato-wiki-jump="denunciar">${(c.wikiArticles.denunciar || {}).title || (localeKey(locale) === 'es' ? 'Cómo denunciar' : 'How to report')}</button>
                </div>
            </div>`
            : '';
        return `<div class="sindicato-panel">
            <h2>${wp.name} — ${c.sections.reports}</h2>
            <p class="template-muted">${c.reportsIntro}</p>
            ${playbook}
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

    /* 17-07-2026: comparador sectorial de sueldos — cruza la banda de esta empresa con
       las del mismo sector (dato demo extraído de wageRange). Vista nueva sobre datos
       existentes; sinergia con la calculadora de convenio. */
    function wageRangeMidpoint(range) {
        const nums = String(range || '').match(/\d[\d.,]*/g);
        if (!nums || !nums.length) return null;
        const toNum = (s) => parseFloat(s.replace(/\./g, '').replace(',', '.'));
        const vals = nums.map(toNum).filter((n) => !isNaN(n));
        if (!vals.length) return null;
        return vals.reduce((a, b) => a + b, 0) / vals.length;
    }

    function buildWageSectorComparisonHtml(locale, wp) {
        const c = t(locale);
        const peers = getWorkplaces(locale)
            .filter((w) => w.sector === wp.sector && wageRangeMidpoint(w.wageRange) != null)
            .map((w) => ({ id: w.id, name: w.name, mid: wageRangeMidpoint(w.wageRange), self: w.id === wp.id }));
        if (peers.length < 2) return '';
        const max = Math.max.apply(null, peers.map((p) => p.mid));
        peers.sort((a, b) => b.mid - a.mid);
        const bars = peers.map((p) => `
            <div class="sindicato-wagecmp-row${p.self ? ' sindicato-wagecmp-self' : ''}">
                <span class="sindicato-wagecmp-name">${p.name}${p.self ? ` <em>(${c.wageCompareThisCompany})</em>` : ''}</span>
                <div class="sindicato-strike-track"><div class="sindicato-strike-fill" style="width:${Math.round((p.mid / max) * 100)}%"></div></div>
                <strong class="sindicato-wagecmp-val">${Math.round(p.mid).toLocaleString(localeKey(locale) === 'es' ? 'es-ES' : 'en-IE')} €</strong>
            </div>`).join('');
        return `<section class="sindicato-sector-section sindicato-wagecmp">
            <header class="sindicato-sector-section-head">
                <span class="sindicato-sector-section-icon" aria-hidden="true">📊</span>
                <h3>${c.wageCompareTitle}</h3>
            </header>
            <p class="template-muted">${c.wageCompareIntro}</p>
            ${bars}
        </section>`;
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
            ${buildWageSectorComparisonHtml(locale, wp)}
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
        const es = localeKey(locale) === 'es';
        const branchClauses = getConvenioClausesForWorkplace(locale, wp);
        const clauseRows = branchClauses.map((cl) =>
            `<details><summary>${cl.title}</summary><p>${cl.body}</p></details>`
        ).join('');
        const iaDoctrine = (c.wikiArticles || {}).ia;
        return `<div class="sindicato-panel">
            <h2>${wp.name} — ${c.sections.convenio}</h2>
            <div class="sindicato-convenio-box">
                <h3>📋 ${wp.convenio}</h3>
                <p class="sindicato-ai-hint">✨ ${c.aiConvenioHint}</p>
                ${iaDoctrine ? `<button type="button" class="sindicato-union-company-link" data-sindicato-wiki-jump="ia">📖 ${iaDoctrine.title}</button>` : ''}
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
    function buildUnionsDirectoryHtml(locale, view) {
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
            ${buildPropuestaInternalSpaceHtml(locale, view)}
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
            `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${c.feedRepliesLabel}</p></div>`
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
        const es = localeKey(locale) === 'es';
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

    /* 17-07-2026 (descomposición CRM): la gestión (CRM) vive DENTRO de cada equipo
       sindical, como una sección más. Renderizador inline reutilizable por cualquier
       tipo: fila de pestañas (las que encajan en el tipo) + panel del CRM contextualizado
       al equipo. Militante-gated. `orgId` es el equipo si existe en el CRM; si no, cae a
       SindicApp pero se muestra el nombre del equipo. */
    function buildEquipoCrmHtml(locale, orgId, type, displayName, ctx, opts) {
        const role = (ctx && ctx.propuestaRole) || 'visitante';
        const cargo = (ctx && ctx.propuestaCargo) || 'ninguno';
        const c = t(locale);
        const tabs = getCrmTabsForType(type);
        let tab = (ctx && ctx.equipoCrmTab) || tabs[0];
        if (tabs.indexOf(tab) === -1) tab = tabs[0];
        /* 20-07-2026 (ADR 0024): el gate «militante» se sustituye por relación
           afiliada + cargo con la capacidad concreta. El candado dice quién lo lleva. */
        if (!propuestaRoleAllows(role, 'afiliado') || !cargoAllows(cargo, tab)) {
            return buildCargoLockedHtml(locale, tab, role, cargo);
        }
        /* Decreto 18-07: con las pestañas desparramadas en la sidebar, la fila de chips
           interna es redundante y se oculta (opts.hideTabs). Se conserva para el camino
           legacy 'crm' (p. ej. deep links antiguos). */
        const hideTabs = opts && opts.hideTabs;
        const tabRow = hideTabs ? '' : tabs.map((id) => {
            const label = (id === 'afiliadas' && c.crmCensusByType && c.crmCensusByType[type])
                ? c.crmCensusByType[type]
                : (c.coordSubs[id] || id);
            return `<button type="button" class="crm-chip${id === tab ? ' active' : ''}" data-equipo-crm-tab="${id}">${label}</button>`;
        }).join('');
        const panel = buildCoordinationSubHtml(locale, tab, {
            crmOrg: orgId, crmContextModule: type, webVersion: 'propuesta',
            propuestaRole: role, propuestaCargo: cargo, equipoName: displayName, equipoCrmTab: tab
        });
        return `<div class="equipo-crm">
            ${hideTabs ? '' : `<div class="crm-chip-row equipo-crm-tabs" role="group" aria-label="${c.gestionContextLabel}">${tabRow}</div>`}
            ${panel}
        </div>`;
    }

    /* 17-07-2026: secciones del equipo sindical por tipo. Inquilinos absorbe además las
       herramientas del módulo (huelgómetro, alarmas, calculadora, asambleas) y llama
       «Propietarios» a lo que en Trabajadores es «Empresas». */
    /* Las secciones se agrupan en tres bloques para que la lista no sea plana:
       PERFIL (quiénes son), ACCIÓN (sus herramientas de lucha) y GESTIÓN (el CRM).
       La lista plana se deriva de los grupos, así que agrupar no esconde nada. */
    const EQUIPO_SECTION_GROUPS = {
        housing: [
            { id: 'perfil', sections: ['resumen', 'foro', 'estructura', 'propietarios'] },
            { id: 'accion', sections: ['huelgometro', 'alarmas', 'calculadora', 'asambleas'] },
            { id: 'gestion', sections: ['crm'] }
        ],
        default: [
            { id: 'perfil', sections: ['resumen', 'foro', 'estructura', 'empresas'] },
            { id: 'gestion', sections: ['crm'] }
        ]
    };

    function getEquipoSectionGroupsForType(type) {
        const base = EQUIPO_SECTION_GROUPS[type] || EQUIPO_SECTION_GROUPS.default;
        /* Decreto 18-07 (Edu): el CRM se desparrama — cada pestaña es un botón propio de
           la sidebar, todas al mismo nivel dentro de GESTIÓN. Quedan muchos botones a
           propósito: primero verlo todo en un plano, reordenar vendrá después. */
        return base.map((g) => (g.id !== 'gestion' ? g : {
            id: 'gestion',
            sections: getCrmTabsForType(type).map((tabId) => 'crm-' + tabId)
        }));
    }

    function getEquipoSectionsForType(type) {
        return getEquipoSectionGroupsForType(type).reduce((acc, g) => acc.concat(g.sections), []);
    }

    function equipoGroupLabel(locale, groupId) {
        const c = t(locale);
        return (c.equipoGroups && c.equipoGroups[groupId]) || groupId;
    }

    /* 20-07 tarde (idea 70, report v5): sub-etiquetas NO clicables dentro del grupo
       GESTIÓN — primer gesto de orden sobre los botones desparramados (ADR 0019 dejó
       «muchos botones a propósito»; esto los agrupa sin re-jerarquizar nada):
       Captar (llegan) / Acompañar (se trabaja) / Impulsar (se empuja) / Administrar
       (se sostiene). En tipos reducidos (p.ej. Consumidores) las etiquetas sin
       botones se omiten. Labels en COPY.crmNavGroups (es/ie; ca cae a es). */
    const CRM_NAV_SUBGROUPS = [
        { id: 'captar', tabs: ['intake', 'afiliadas'] },
        { id: 'acompanar', tabs: ['casos', 'asambleas', 'documentos'] },
        /* 22-07-2026: 'objetivos' (housing-only) va en Impulsar — es lo que la
           organización empuja. En los tipos sin la pestaña, el filtro por
           disponibilidad lo omite (no aparece la etiqueta si queda vacía). */
        { id: 'impulsar', tabs: ['objetivos', 'campanas', 'comunicaciones', 'calendario'] },
        { id: 'administrar', tabs: ['finanzas', 'estructura', 'datos', 'fuentes'] }
    ];

    /* Iconos de las secciones-CRM desparramadas en la sidebar (decreto 18-07). */
    const CRM_SECTION_ICONS = {
        afiliadas: '🧾', intake: '📥', casos: '📂', asambleas: '🗳️', objetivos: '🎯',
        campanas: '📣', finanzas: '💶', comunicaciones: '✉️', calendario: '📅',
        documentos: '📄', estructura: '🧬', datos: '🗄️', fuentes: '📇'
    };

    function equipoSectionMeta(locale, id, type) {
        const c = t(locale);
        const hs = c.housingSubs || {};
        if (id.indexOf('crm-') === 0) {
            const tabId = id.slice(4);
            const label = (tabId === 'afiliadas' && c.crmCensusByType && c.crmCensusByType[type])
                ? c.crmCensusByType[type]
                : ((c.coordSubs && c.coordSubs[tabId]) || tabId);
            return { icon: CRM_SECTION_ICONS[tabId] || '📇', label };
        }
        return {
            resumen: { icon: '📋', label: c.equipoSectionResumen || 'Resumen' },
            foro: { icon: '💬', label: (c.subs && c.subs.foro) || 'Foro' },
            estructura: { icon: '🧱', label: c.equipoSectionEstructura || 'Estructura' },
            empresas: { icon: '🏢', label: (c.subs && c.subs.workplaces) || 'Empresas' },
            propietarios: { icon: '🏦', label: c.equipoSectionPropietarios || 'Propietarios' },
            crm: { icon: '📇', label: 'CRM' },
            huelgometro: { icon: '✊', label: hs.huelgometro || 'Huelgómetro' },
            alarmas: { icon: '🚨', label: hs.alarmas || 'Alarmas' },
            calculadora: { icon: '🧮', label: hs.calculadora || 'Calculadora' },
            asambleas: { icon: '🗳️', label: hs.asambleas || 'Asambleas' }
        }[id] || { icon: '•', label: id };
    }

    function buildEquipoSectionNavHtml(locale, type, active, ctx) {
        /* 20-07-2026 (ADR 0024): los crm-* que el cargo actual no concede se marcan
           con 🔒 (candado informativo con aria-label de quién lo lleva) pero SIGUEN
           siendo clicables — el candado se atraviesa y explica dentro (doctrina
           ADR 0014, que sobrevive al cambio de modelo). */
        const v = ctx || {};
        const role = v.propuestaRole || 'visitante';
        const cargo = v.propuestaCargo || 'ninguno';
        const c = t(locale);
        const sectionBtn = (id) => {
            const m = equipoSectionMeta(locale, id, type);
            const locked = id.indexOf('crm-') === 0
                && !(propuestaRoleAllows(role, 'afiliado') && cargoAllows(cargo, id));
            const holder = locked ? cargoForCapability(id) : '';
            const holderName = holder ? ((c.propuestaCargos && c.propuestaCargos[holder]) || holder) : '';
            const lockedAria = locked ? ` aria-label="${m.label} — ${c.propuestaCargoLockedTitle || ''} (${holderName})"` : '';
            return `<button type="button" class="template-module-btn${id === active ? ' active' : ''}${locked ? ' propuesta-item-locked' : ''}" data-equipo-section="${id}"${lockedAria}>
                <span aria-hidden="true">${locked ? '🔒' : m.icon}</span> ${m.label}
            </button>`;
        };
        return getEquipoSectionGroupsForType(type).map((g) => {
            let buttons;
            if (g.id === 'gestion') {
                /* Idea 70: los crm-* se ordenan bajo sub-etiquetas no clicables;
                   las sub-etiquetas sin botones en este tipo se omiten. */
                const available = g.sections;
                buttons = CRM_NAV_SUBGROUPS.map((sg) => {
                    const ids = sg.tabs.map((tab) => 'crm-' + tab).filter((id) => available.indexOf(id) !== -1);
                    if (!ids.length) return '';
                    return `<p class="equipo-section-sublabel">${(c.crmNavGroups && c.crmNavGroups[sg.id]) || sg.id}</p>`
                        + ids.map(sectionBtn).join('');
                }).join('');
                /* Red de seguridad: cualquier sección de gestión fuera de los
                   sub-grupos (no debería haber ninguna) se pinta al final. */
                const grouped = CRM_NAV_SUBGROUPS.reduce((acc, sg) => acc.concat(sg.tabs.map((tb) => 'crm-' + tb)), []);
                buttons += available.filter((id) => grouped.indexOf(id) === -1).map(sectionBtn).join('');
            } else {
                buttons = g.sections.map(sectionBtn).join('');
            }
            return `<div class="equipo-section-group">
                <p class="equipo-section-group-label">${equipoGroupLabel(locale, g.id)}</p>
                ${buttons}
            </div>`;
        }).join('');
    }

    /* Sección no-Resumen de un equipo sindical (tipos cuyo perfil se generaliza a las
       mismas secciones que Trabajadores). `entity` = {backAttr, backLabel, heading, name,
       id, orgId, empresasHtml}. La nav de secciones vive en la barra lateral. */
    function buildEquipoProfileSectionHtml(locale, section, type, entity, view) {
        const c = t(locale);
        const head = `<p><button type="button" class="sindicato-back-btn" ${entity.backAttr}>← ${entity.backLabel}</button></p>
            <h2>${entity.heading}</h2>`;
        if (section === 'crm' || section.indexOf('crm-') === 0) {
            const v = section === 'crm' ? view
                : Object.assign({}, view, { equipoCrmTab: section.slice(4) });
            return `<div class="sindicato-panel">${head}${buildEquipoCrmHtml(locale, entity.orgId || '', type, entity.name, v, { hideTabs: section !== 'crm' })}</div>`;
        }
        if (section === 'estructura') {
            return `<div class="sindicato-panel">${head}
                <p class="template-muted">${c.crmEstructuraIntro}</p>
                ${buildCrmEstructuraHtml(locale, entity.orgId || '', type)}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        if (section === 'foro') {
            return `<div class="sindicato-panel">${head}
                <p class="template-muted">${c.equipoForoIntro}</p>
                ${buildSocialLinksBlockHtml(locale, entity.id)}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        if (section === 'empresas') {
            return `<div class="sindicato-panel">${head}
                <h3>🏢 ${c.equipoEmpresasTitle}</h3>
                ${entity.empresasHtml || '<p class="template-muted">—</p>'}
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
        return `<div class="sindicato-panel">${head}</div>`;
    }

    function buildUnionSectionHtml(locale, unionId, section, ctx) {
        const union = findUnion(locale, unionId);
        if (!union) return buildUnionsDirectoryHtml(locale);
        if (section === 'forum') return buildUnionForumHtml(locale, union);
        if (section === 'structure') return buildUnionStructureHtml(locale, union);
        if (section === 'companies') return buildUnionCompaniesHtml(locale, union);
        if (section === 'crm' || section.indexOf('crm-') === 0) {
            const v = section === 'crm' ? ctx
                : Object.assign({}, ctx, { equipoCrmTab: section.slice(4) });
            return buildEquipoCrmHtml(locale, union.id, 'unions', union.name, v, { hideTabs: section !== 'crm' });
        }
        return buildUnionOverviewHtml(locale, union);
    }

    const SINDICATO_GENERAL_FORUM_THREADS = window.SINDICAPP_SINDICATO_DATA.SINDICATO_GENERAL_FORUM_THREADS; /* 20-07 tarde (idea 71): literal movido a sindicapp-sindicato-data.js */

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
                `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${c.feedRepliesLabel}</p></div>`
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
                `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${c.feedRepliesLabel}</p></div>`
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
        return localeKey(locale) === 'es'
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
            const name = wp.sector || (localeKey(locale) === 'es' ? 'Sin clasificar' : 'Unclassified');
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
        return sectors.sort((a, b) => a.name.localeCompare(b.name, localeKey(locale) === 'es' ? 'es' : 'en'));
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
        const es = localeKey(locale) === 'es';
        return [{ title: es ? `Foro del sector — ${name}` : `Sector forum — ${name}`, replies: 12 }];
    }

    function getSubsubsectorForumPosts(locale, subsubId, name) {
        const key = localeKey(locale);
        const stored = SECTOR_FORUM_POSTS[key]?.[subsubId];
        if (stored) return stored;
        const es = localeKey(locale) === 'es';
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
        const es = localeKey(locale) === 'es';
        return [{ title: es ? `Foro general — ${subName}` : `General forum — ${subName}`, replies: 8 }];
    }

    function getTerritoryForumPosts(locale, territoryId, terrName) {
        const key = localeKey(locale);
        const stored = TERRITORY_FORUM_POSTS[key]?.[territoryId];
        if (stored) return stored;
        const es = localeKey(locale) === 'es';
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
        const es = localeKey(locale) === 'es';
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
        const viviendaLabel = c.viviendaOpenHousing;

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
            `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${c.feedRepliesLabel}</p></div>`
        ).join('');
        const housingAlerts = getViviendaAlerts(locale, terr.id);
        const es = localeKey(locale) === 'es';
        const alertsHtml = housingAlerts.length
            ? housingAlerts.slice(0, 2).map((alert) =>
                `<div class="sindicato-coord-card sindicato-alert-card"><strong>${alert.date}</strong><p>${alert.address}</p></div>`
            ).join('')
            : '';
        const mapBack = opts.showMapBack && opts.mapTerritoryId
            ? `<p><button type="button" class="sindicato-back-btn" data-sindicato-map-clear-territory>← ${c.mapClearTerritory}</button></p>`
            : '';
        /* 18-07 (F8 del report v4): las comarcas/municipios sin datos merecen un estado
           vacío con invitación, no un perfil en blanco. */
        if (!terr.workplaces.length && !terr.unions.length && !terr.forumPosts.length && !housingAlerts.length) {
            return `<div class="sindicato-panel sindicato-territory-dossier">
                ${mapBack}
                <h2>${c.mapTerritoryDossier} — ${terr.parentName} / ${terr.name}</h2>
                <div class="sindicato-empty-state">
                    <p class="sindicato-empty-state-icon" aria-hidden="true">🌱</p>
                    <h3>${c.territoryEmptyTitle}</h3>
                    <p class="template-muted">${c.territoryEmptyBody}</p>
                    <p><button type="button" class="sindicato-cta-btn" data-sindicato-goto-vivienda="${terr.id}">${c.territoryHousingLink}</button></p>
                </div>
                <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
            </div>`;
        }
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
            `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${c.feedRepliesLabel}</p></div>`
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
        const c = t(locale);
        return (c.crmStages || {})[stage] || stage;
    }

    /* Hash simple del id de organización — desplaza y escala los datasets
       demo para que cada sindicato tenga cifras y repartos distintos. */
    function crmOrgHash(orgId) {
        let h = 0;
        for (let i = 0; i < String(orgId).length; i += 1) h = (h * 31 + String(orgId).charCodeAt(i)) % 997;
        return h;
    }

    function getCrmOrgs(locale) {
        const es = localeKey(locale) === 'es';
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
        const es = localeKey(locale) === 'es';
        const h = crmOrgHash(orgId);
        const people = CRM_PEOPLE[localeKey(locale)];
        const wps = getWorkplaces(locale);
        const wpName = (i) => wps[(h + i) % wps.length]?.name || '—';
        const person = (i) => people[(h + i) % people.length];
        const estados = ['activa', 'activa', 'pendiente', 'activa', 'activa', 'baja', 'activa', 'pendiente', 'activa', 'activa'];
        const roles = es
            ? ['delegada', 'afiliada', 'afiliada', 'liberada', 'afiliada', 'afiliada', 'delegada', 'afiliada', 'afiliada', 'delegada']
            : ['delegate', 'member', 'member', 'official', 'member', 'member', 'delegate', 'member', 'member', 'delegate'];
        /* 17-07-2026 (idea 6): relación con la organización, separada del estado de cuota.
           participante = en intake (aún no afiliada); el resto son grados de implicación. */
        const relaciones = ['afiliada', 'militante', 'afiliada', 'delegada', 'afiliada', 'participante', 'liberada', 'afiliada', 'militante', 'cargo'];
        const members = people.map((_, i) => ({
            id: `m${i}`,
            name: person(i),
            workplace: wpName(i),
            estado: estados[(h + i) % estados.length],
            rol: roles[(h + i) % roles.length],
            relacion: relaciones[(h + i) % relaciones.length],
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
        /* 17-07-2026 (idea 14): ámbito de acceso + estado de revisión por documento. */
        const docAmbitos = ['publico', 'afiliadas', 'comision', 'caso', 'afiliadas', 'comision'];
        const docRevisiones = ['revisada', 'revisada', 'revisada', 'pendiente', 'revision', 'pendiente'];
        const docs = docDefs.map(([cat, title], i) => ({
            id: `d${i}`,
            cat,
            title,
            updated: `2026-0${1 + ((h + i) % 7)}`,
            by: person(i + 4),
            ambito: docAmbitos[(h + i) % docAmbitos.length],
            revision: docRevisiones[(h + i) % docRevisiones.length],
            revisor: person(i + 6)
        }));
        /* 17-07-2026: registro de fuentes de datos de la organización (petición literal
           de la reunión SdLl 14-07): qué fuentes alimentan los datos, quién responde de
           cada una y su estado de integración en el macrosistema. */
        const sourceDefs = es
            ? [
                ['Base de datos de afiliación', 'BD principal', 'integrada'],
                ['CRM externo (Action Network)', 'CRM', 'parcial'],
                ['Encuestas a afiliadas', 'Formularios', 'parcial'],
                ['Hojas de cálculo heredadas', 'Excel', 'pendiente'],
                ['Calendario compartido', 'Calendario', 'integrada']
            ]
            : [
                ['Membership database', 'Main DB', 'integrada'],
                ['External CRM (Action Network)', 'CRM', 'parcial'],
                ['Member surveys', 'Forms', 'parcial'],
                ['Legacy spreadsheets', 'Excel', 'pendiente'],
                ['Shared calendar', 'Calendar', 'integrada']
            ];
        const sources = sourceDefs.map(([name, tipo, estado], i) => ({ name, tipo, estado, owner: person(i + 2) }));
        /* 17-07-2026: plantillas de respuesta (petición de la reunión SdLl 14-07:
           «automatización de emails de respuesta, plantillas») rellenadas con datos demo. */
        const orgName = (findCrmOrg(locale, orgId) || {}).name || 'SindicApp';
        const firstEvent = events[0] || {};
        const firstCase = cases[0] || {};
        const templateDefs = es
            ? [
                ['bienvenida', 'Bienvenida a un primer contacto',
                    `Hola ${person(3).split(' ')[0]},\n\nGracias por escribir a ${orgName}. Hemos recibido tu consulta y a partir de ahora te acompaña ${person(1)}. Te esperamos en la próxima asamblea de bienvenida (${firstEvent.date || 'fecha por confirmar'}) — no hace falta ser afiliada para venir.\n\nUn abrazo,\n${orgName}`],
                ['documentos', 'Petición de documentos para un caso',
                    `Hola ${person(3).split(' ')[0]},\n\nPara avanzar con tu caso «${firstCase.title || 'tu caso'}» necesitamos: contrato, última nómina y cualquier comunicación escrita de la empresa. Puedes traerlos a la asamblea o responder a este correo.\n\nGracias,\n${person(1)} — ${orgName}`],
                ['convocatoria', 'Convocatoria de asamblea',
                    `Compañeras,\n\n${orgName} convoca asamblea el ${firstEvent.date || 'próximamente'}: «${firstEvent.title || 'orden del día por confirmar'}». Vuestra presencia decide — traed dudas y casos.\n\n✊ ${orgName}`],
                ['seguimiento', 'Seguimiento de caso sin novedades',
                    `Hola ${person(3).split(' ')[0]},\n\nHace días que no tenemos novedades de tu caso «${firstCase.title || 'tu caso'}». ¿Ha cambiado algo? ¿Necesitas que lo tratemos en la próxima asamblea? Tu situación no está olvidada.\n\n${person(1)} — ${orgName}`]
            ]
            : [
                ['bienvenida', 'Welcome to a first contact',
                    `Hi ${person(3).split(' ')[0]},\n\nThanks for writing to ${orgName}. We have received your query and ${person(1)} will accompany you from here. Join us at the next welcome assembly (${firstEvent.date || 'date TBC'}) — you don't need to be a member to come.\n\nIn solidarity,\n${orgName}`],
                ['documentos', 'Document request for a case',
                    `Hi ${person(3).split(' ')[0]},\n\nTo move your case "${firstCase.title || 'your case'}" forward we need: your contract, latest payslip and any written communication from the company. Bring them to the assembly or reply to this email.\n\nThanks,\n${person(1)} — ${orgName}`],
                ['convocatoria', 'Assembly notice',
                    `Colleagues,\n\n${orgName} calls an assembly on ${firstEvent.date || 'a date TBC'}: "${firstEvent.title || 'agenda to be confirmed'}". Your presence decides — bring doubts and cases.\n\n✊ ${orgName}`],
                ['seguimiento', 'Case follow-up, no news',
                    `Hi ${person(3).split(' ')[0]},\n\nWe haven't heard about your case "${firstCase.title || 'your case'}" in a while. Has anything changed? Should we bring it to the next assembly? Your situation has not been forgotten.\n\n${person(1)} — ${orgName}`]
            ];
        const templates = templateDefs.map(([id, title, body]) => ({ id, title, body }));
        /* 22-07-2026 (petición Edu): repositorio de objetivos de la organización
           (housing). Se siembra siempre; solo se pinta donde existe la pestaña. */
        const objetivos = crmSeedObjetivos(locale, orgId);
        return { members, cases, campaigns, finances, comms, events, docs, sources, templates, objetivos };
    }

    /* 22-07-2026: semilla del repo de Objetivos — metas colectivas de la organización
       (estilo GitHub: número, estado abierto/conseguido, prioridad, etiquetas, comisión
       responsable, hito, meta temporal, progreso y nº de actualizaciones). Housing-flavour
       porque hoy solo se muestra en Inquilinos, pero es estado user-owned del runtime
       (persiste y se puede marcar conseguido/reabrir). */
    function crmSeedObjetivos(locale, orgId) {
        const es = localeKey(locale) === 'es';
        const h = crmOrgHash(orgId);
        const defs = es ? [
            { title: 'Frenar los desahucios sin alternativa habitacional en el municipio', desc: 'Ni un desahucio sin alquiler social: acompañamiento y presión hasta parar cada lanzamiento.', prioridad: 'alta', etiquetas: ['vivienda', 'urgente'], comision: 'Acción sindical', hito: 'Plan 2026', meta: '2026-12', progreso: 60 },
            { title: 'Convenio de alquiler estable con la gran tenedora del barrio', desc: 'Negociar rebajas y contratos indefinidos para los bloques de un mismo gran tenedor.', prioridad: 'alta', etiquetas: ['negociación', 'territorial'], comision: 'Acción sindical', hito: 'Plan 2026', meta: '2026-10', progreso: 35 },
            { title: 'Llegar a 1.000 hogares afiliados en la comarca', desc: 'Crecer para tener fuerza real en la mesa: campaña puerta a puerta y en asambleas de bloque.', prioridad: 'media', etiquetas: ['afiliación', 'crecimiento'], comision: 'Organización', hito: 'Órgano anual', meta: '2027-03', progreso: 72 },
            { title: 'Registro público de grandes tenedores del barrio', desc: 'Mapa abierto de quién concentra la vivienda para detectar patrones y actuar en bloque.', prioridad: 'media', etiquetas: ['transparencia', 'datos'], comision: 'Contenidos', hito: 'Datos abiertos', meta: '2026-11', progreso: 45 },
            { title: 'Caja de resistencia para impagos colectivos', desc: 'Fondo común que sostenga a las familias que entran en huelga de alquileres.', prioridad: 'media', etiquetas: ['finanzas'], comision: 'Organización', hito: '', meta: '2027-01', progreso: 20 },
            { title: 'Ordenanza municipal contra los pisos turísticos ilegales', desc: 'Presión institucional conseguida: el pleno aprobó la moratoria.', prioridad: 'alta', etiquetas: ['institucional', 'victoria'], comision: 'Acción sindical', hito: 'Plan 2025', meta: '2026-02', estado: 'conseguido', progreso: 100 },
            { title: 'Red de acompañamiento a juicios de desahucio', desc: 'Turnos estables de acompañamiento en cada señalamiento. En marcha y consolidada.', prioridad: 'media', etiquetas: ['cuidados', 'acción'], comision: 'Acción sindical', hito: 'Plan 2025', meta: '2025-12', estado: 'conseguido', progreso: 100 }
        ] : [
            { title: 'Stop evictions with no housing alternative in the municipality', desc: 'No eviction without social rent: accompaniment and pressure until every eviction is halted.', prioridad: 'alta', etiquetas: ['housing', 'urgent'], comision: 'Union action', hito: 'Plan 2026', meta: '2026-12', progreso: 60 },
            { title: 'Stable rent agreement with the district’s largest landlord', desc: 'Negotiate reductions and open-ended contracts across one landlord’s blocks.', prioridad: 'alta', etiquetas: ['bargaining', 'territorial'], comision: 'Union action', hito: 'Plan 2026', meta: '2026-10', progreso: 35 },
            { title: 'Reach 1,000 affiliated households in the county', desc: 'Grow to hold real power at the table: door-to-door and block-assembly drive.', prioridad: 'media', etiquetas: ['membership', 'growth'], comision: 'Organisation', hito: 'Annual congress', meta: '2027-03', progreso: 72 },
            { title: 'Public register of the district’s large landlords', desc: 'An open map of who concentrates housing, to spot patterns and act collectively.', prioridad: 'media', etiquetas: ['transparency', 'data'], comision: 'Content', hito: 'Open data', meta: '2026-11', progreso: 45 },
            { title: 'Solidarity fund for collective rent strikes', desc: 'A shared fund to sustain families that go on rent strike.', prioridad: 'media', etiquetas: ['finance'], comision: 'Organisation', hito: '', meta: '2027-01', progreso: 20 },
            { title: 'Municipal bylaw against illegal tourist flats', desc: 'Institutional pressure won: the council passed the moratorium.', prioridad: 'alta', etiquetas: ['institutional', 'win'], comision: 'Union action', hito: 'Plan 2025', meta: '2026-02', estado: 'conseguido', progreso: 100 },
            { title: 'Eviction-hearing accompaniment network', desc: 'Steady accompaniment shifts at every hearing. Up and running, consolidated.', prioridad: 'media', etiquetas: ['care', 'action'], comision: 'Union action', hito: 'Plan 2025', meta: '2025-12', estado: 'conseguido', progreso: 100 }
        ];
        return defs.map((d, i) => ({
            id: 'o' + i,
            num: 100 + i,
            title: d.title,
            desc: d.desc || '',
            estado: d.estado || 'abierto',
            prioridad: d.prioridad || 'media',
            etiquetas: d.etiquetas || [],
            comision: d.comision || '',
            hito: d.hito || '',
            meta: d.meta || '',
            progreso: d.estado === 'conseguido' ? 100 : Math.max(5, Math.min(95, (d.progreso || 0) + ((h + i) % 6))),
            actualizaciones: 2 + ((h + i * 3) % 12)
        }));
    }

    /* 17-07-2026 (idea 22): persistencia del CRM en localStorage. Antes el estado del
       CRM vivía solo en memoria de sesión (se perdía al recargar); ahora se guarda para
       que las demos de varios días no pierdan lo introducido, y el export JSON exporte
       trabajo real. Se persiste por locale la parte user-owned del runtime. */
    const CRM_LOADED = { es: false, ie: false };
    function crmStorageKey(key) { return `sindicapp-crm-${key}-v1`; }

    function loadCrmRuntime(key) {
        if (CRM_LOADED[key]) return;
        CRM_LOADED[key] = true;
        try {
            const raw = window.localStorage && window.localStorage.getItem(crmStorageKey(key));
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object') CRM_RUNTIME[key] = parsed;
            }
        } catch (e) { /* demo: sin persistencia disponible */ }
    }

    function persistCrmRuntime(locale) {
        const key = localeKey(locale);
        try {
            if (window.localStorage) window.localStorage.setItem(crmStorageKey(key), JSON.stringify(CRM_RUNTIME[key]));
        } catch (e) { /* demo */ }
    }

    function getCrmData(locale, orgId) {
        const key = localeKey(locale);
        loadCrmRuntime(key);
        const org = findCrmOrg(locale, orgId) ? orgId : 'sindicapp';
        if (!CRM_RUNTIME[key][org]) CRM_RUNTIME[key][org] = crmSeedData(locale, org);
        return CRM_RUNTIME[key][org];
    }

    /* 18-07 (idea 38 mock-up, report v4): import de CSV al censo — «no tiráis vuestros
       excels: los traéis». Las filas entran como participantes pendientes; el mapeo de
       columnas lo hace el handler (cabeceras nombre/empresa/rol, con sinónimos). */
    function crmImportMembers(locale, orgId, rows) {
        const data = getCrmData(locale, orgId);
        const es = localeKey(locale) === 'es';
        let n = 0;
        (rows || []).forEach((r) => {
            if (!r || !r.name) return;
            data.members.push({
                name: r.name,
                workplace: r.workplace || '—',
                rol: r.rol || (es ? 'Importada (CSV)' : 'Imported (CSV)'),
                relacion: 'participante',
                estado: 'pendiente',
                cuota: '0',
                alta: new Date().toISOString().slice(0, 10)
            });
            n++;
        });
        if (n) persistCrmRuntime(locale);
        return n;
    }

    function crmMoveCase(locale, orgId, caseId, dir) {
        const data = getCrmData(locale, orgId);
        const item = data.cases.find((cs) => cs.id === caseId);
        if (!item) return;
        const idx = CRM_STAGES.indexOf(item.stage);
        const next = idx + (dir === 'back' ? -1 : 1);
        if (next < 0 || next >= CRM_STAGES.length) return;
        item.stage = CRM_STAGES[next];
        item.updated = localeKey(locale) === 'es' ? 'ahora' : 'now';
        persistCrmRuntime(locale);
    }

    function crmSupportCampaign(locale, orgId, campaignId) {
        const data = getCrmData(locale, orgId);
        const item = data.campaigns.find((cp) => cp.id === campaignId);
        if (item && item.support < item.target) { item.support += 1; persistCrmRuntime(locale); }
    }

    /* 22-07-2026: marcar un objetivo como conseguido / reabrirlo (repo de Objetivos). */
    function crmToggleObjetivo(locale, orgId, objId) {
        const data = getCrmData(locale, orgId);
        if (!Array.isArray(data.objetivos)) data.objetivos = crmSeedObjetivos(locale, orgId);
        const o = data.objetivos.find((x) => x.id === objId);
        if (!o) return;
        if (o.estado === 'conseguido') {
            o.estado = 'abierto';
            if (o.progreso >= 100) o.progreso = 80;
        } else {
            o.estado = 'conseguido';
            o.progreso = 100;
        }
        o.actualizaciones = (o.actualizaciones || 0) + 1;
        persistCrmRuntime(locale);
    }

    function crmSendComm(locale, orgId, commId) {
        const data = getCrmData(locale, orgId);
        const item = data.comms.find((cm) => cm.id === commId);
        if (!item) return;
        item.estado = item.estado === 'borrador' ? 'programada' : 'enviada';
        persistCrmRuntime(locale);
    }

    function crmAddEvent(locale, orgId, event) {
        if (!event || !event.date || !event.title) return;
        const data = getCrmData(locale, orgId);
        data.events.push({ type: event.type || 'asamblea', title: event.title, date: event.date });
        data.events.sort((a, b) => a.date.localeCompare(b.date));
        persistCrmRuntime(locale);
    }

    /* 17-07-2026 (idea 14): avanzar el estado de revisión de un documento. */
    const CRM_DOC_REVIEW_FLOW = ['pendiente', 'revision', 'revisada'];
    function crmAdvanceDocReview(locale, orgId, docId) {
        const data = getCrmData(locale, orgId);
        const doc = (data.docs || []).find((d) => d.id === docId);
        if (!doc) return;
        const idx = CRM_DOC_REVIEW_FLOW.indexOf(doc.revision);
        if (idx === -1 || idx >= CRM_DOC_REVIEW_FLOW.length - 1) return;
        doc.revision = CRM_DOC_REVIEW_FLOW[idx + 1];
        persistCrmRuntime(locale);
    }

    /* 17-07-2026: plantilla de respuesta por id (para el botón «Copiar» de Comunicaciones). */
    function crmGetTemplate(locale, orgId, templateId) {
        const data = getCrmData(locale, orgId);
        return (data.templates || []).find((tp) => tp.id === templateId) || null;
    }

    /* 17-07-2026: payload de exportación JSON de la organización — doctrina
       «tus datos son tuyos»: todo lo de la org sale en un fichero abierto. */
    function crmExportPayload(locale, orgId) {
        const org = findCrmOrg(locale, orgId) || { id: 'sindicapp', name: 'SindicApp', sector: '' };
        return {
            exportedAt: new Date().toISOString(),
            locale: localeKey(locale),
            organisation: { id: org.id, name: org.name, sector: org.sector || '' },
            note: localeKey(locale) === 'es'
                ? 'Exportación demo de SindicApp — tus datos son tuyos.'
                : 'SindicApp demo export — your data is yours.',
            data: getCrmData(locale, orgId)
        };
    }

    function crmMemberEstadoLabel(locale, estado) {
        const c = t(locale);
        return (c.crmMemberEstados || {})[estado] || estado;
    }

    function crmMemberRelacionLabel(locale, relacion) {
        const c = t(locale);
        return (c.crmMemberRelaciones || {})[relacion] || relacion;
    }

    function crmEventTypeLabel(locale, type) {
        const c = t(locale);
        return (c.crmEventTypes || {})[type] || type;
    }

    function crmDocCatLabel(locale, cat) {
        const c = t(locale);
        return (c.crmDocCats || {})[cat] || cat;
    }

    function crmEuro(n) {
        return `${n < 0 ? '−' : ''}€ ${Math.abs(n).toLocaleString('de-DE')}`;
    }

    function buildCrmMemberRowsHtml(locale, orgId, query, filter) {
        const c = t(locale);
        const q = String(query || '').trim().toLowerCase();
        const data = getCrmData(locale, orgId);
        const rows = data.members
            .filter((m) => (filter && filter !== 'todas' ? m.estado === filter : true))
            .filter((m) => (q ? `${m.name} ${m.workplace} ${m.rol}`.toLowerCase().includes(q) : true));
        if (!rows.length) {
            return `<tr><td colspan="5" class="template-muted">${c.crmNoResults}</td></tr>`;
        }
        return rows.map((m) => `<tr>
            <td><strong>${m.name}</strong></td>
            <td>${m.workplace}</td>
            <td>${m.relacion ? crmMemberRelacionLabel(locale, m.relacion) : m.rol}</td>
            <td><span class="crm-badge crm-badge-${m.estado}">${crmMemberEstadoLabel(locale, m.estado)}</span></td>
            <td>€ ${m.cuota}/${c.crmPerMonthShort} · ${c.crmSinceLabel} ${m.alta}</td>
        </tr>`).join('');
    }

    function buildCrmAfiliadasHtml(locale, orgId, view) {
        const c = t(locale);
        const data = getCrmData(locale, orgId);
        const activas = data.members.filter((m) => m.estado === 'activa').length;
        const filters = ['todas', 'activa', 'pendiente', 'baja'];
        const filterLabel = (f) => (f === 'todas' ? c.crmFilterAll : crmMemberEstadoLabel(locale, f));
        const active = view.crmMemberFilter || 'todas';
        return `
            <p class="template-muted">${c.crmAfiliadasIntro}</p>
            <div class="crm-stat-row">
                <div class="crm-stat"><strong>${data.members.length}</strong><span>${c.crmStatCensus}</span></div>
                <div class="crm-stat"><strong>${activas}</strong><span>${c.crmStatActive}</span></div>
                <div class="crm-stat"><strong>${data.members.filter((m) => m.estado === 'pendiente').length}</strong><span>${c.crmStatPending}</span></div>
            </div>
            <input type="search" class="sindicato-search-input" value="${(view.crmMemberQuery || '').replace(/"/g, '&quot;')}"
                placeholder="${c.crmSearchPlaceholder}"
                aria-label="${c.crmSearchAria}" data-sindicato-crm-member-search>
            <div class="crm-chip-row" role="group" aria-label="${c.crmFilterEstadoAria}">
                ${filters.map((f) => `<button type="button" class="crm-chip${f === active ? ' active' : ''}" data-sindicato-crm-member-filter="${f}">${filterLabel(f)}</button>`).join('')}
                <label class="crm-chip crm-import-label">⬆️ ${c.crmImportCsv}<input type="file" accept=".csv,text/csv" data-crm-import-csv="${orgId}" hidden></label>
            </div>
            <table class="crm-table">
                <thead><tr>
                    <th>${c.crmMembersTable.nombre}</th><th>${c.crmMembersTable.empresa}</th><th>${c.crmMembersTable.relacion}</th><th>${c.crmMembersTable.estado}</th><th>${c.crmMembersTable.cuota}</th>
                </tr></thead>
                <tbody data-sindicato-crm-member-list>${buildCrmMemberRowsHtml(locale, orgId, view.crmMemberQuery, active)}</tbody>
            </table>`;
    }

    function buildCrmCasosHtml(locale, orgId) {
        const c = t(locale);
        const data = getCrmData(locale, orgId);
        const cols = CRM_STAGES.map((stage) => {
            const cards = data.cases.filter((cs) => cs.stage === stage).map((cs) => `
                <div class="crm-case-card">
                    <strong>${cs.title}</strong>
                    <p class="template-muted">${cs.workplace}</p>
                    <p class="crm-case-meta">${c.crmCaseLleva}: ${cs.owner} · ${cs.updated}</p>
                    <div class="crm-case-actions">
                        <button type="button" class="crm-mini-btn" data-sindicato-crm-case-move="${cs.id}:back" ${stage === 'nuevo' ? 'disabled' : ''} aria-label="${c.crmStagePrevAria}">◀</button>
                        <button type="button" class="crm-mini-btn" data-sindicato-crm-case-move="${cs.id}:fwd" ${stage === 'resuelto' ? 'disabled' : ''} aria-label="${c.crmStageNextAria}">▶</button>
                    </div>
                </div>`).join('');
            return `<div class="crm-pipeline-col">
                <h4>${crmStageLabel(locale, stage)} <span class="crm-count">${data.cases.filter((cs) => cs.stage === stage).length}</span></h4>
                ${cards || `<p class="template-muted crm-empty-col">${c.crmEmptyCol}</p>`}
            </div>`;
        }).join('');
        return `
            <p class="template-muted">${c.crmCasosIntro}</p>
            <div class="crm-pipeline">${cols}</div>`;
    }

    function buildCrmCampanasHtml(locale, orgId) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
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
                    <p class="template-muted">${cp.support} / ${cp.target} ${c.crmApoyosLabel} (${pct}%)</p>
                    <button type="button" class="crm-btn" data-sindicato-crm-campaign-support="${cp.id}" ${cp.support >= cp.target ? 'disabled' : ''}>${c.crmAddSupportBtn}</button>
                </div>`;
            }).join('')}`;
    }

    /* 22-07-2026 (petición Edu): repositorio de OBJETIVOS de la organización, estilo
       GitHub — no son casos de personas afiliadas, son las metas colectivas de la
       organización en sí. Abiertos primero, conseguidos después; barra de progreso,
       hito, comisión responsable, etiquetas y nº de actualizaciones. Se puede marcar
       como conseguido / reabrir (muta el runtime persistido y re-renderiza). */
    function buildCrmObjetivosHtml(locale, orgId) {
        const c = t(locale);
        const data = getCrmData(locale, orgId);
        /* Runtimes ya persistidos antes de este cambio no traen `objetivos`: se
           siembran a demanda una sola vez. */
        if (!Array.isArray(data.objetivos)) {
            data.objetivos = crmSeedObjetivos(locale, orgId);
            persistCrmRuntime(locale);
        }
        const objs = data.objetivos;
        const abiertos = objs.filter((o) => o.estado !== 'conseguido');
        const conseguidos = objs.filter((o) => o.estado === 'conseguido');
        const hitos = objs.reduce((acc, o) => (o.hito && acc.indexOf(o.hito) === -1 ? acc.concat(o.hito) : acc), []);
        const card = (o) => {
            const pct = Math.max(0, Math.min(100, o.progreso | 0));
            const done = o.estado === 'conseguido';
            const labels = (o.etiquetas || []).map((l) => `<span class="crm-obj-label">${l}</span>`).join('');
            const badge = done
                ? `<span class="crm-badge crm-badge-enviada">${c.crmObjEstados.conseguido}</span>`
                : `<span class="crm-badge crm-badge-${o.prioridad}">${(c.crmObjPrioridad || {})[o.prioridad] || ''}</span>`;
            return `<div class="sindicato-coord-card crm-obj-card${done ? ' crm-obj-done' : ''}">
                <div class="crm-obj-head">
                    <span class="crm-obj-status crm-obj-status-${done ? 'done' : 'open'}" aria-hidden="true">${done ? '✓' : '◎'}</span>
                    <strong class="crm-obj-title">${o.title}</strong>
                    ${badge}
                </div>
                ${o.desc ? `<p class="template-muted crm-obj-desc">${o.desc}</p>` : ''}
                <div class="crm-obj-meta">
                    <span class="crm-obj-id">#${o.num}</span>
                    ${o.comision ? `<span>· ${c.crmObjOwnerLabel}: ${o.comision}</span>` : ''}
                    ${o.hito ? `<span>· ${c.crmObjHitoLabel}: ${o.hito}</span>` : ''}
                    ${o.meta ? `<span>· ${c.crmObjMetaLabel} ${o.meta}</span>` : ''}
                    <span>· 💬 ${o.actualizaciones || 0} ${c.crmObjUpdatesLabel}</span>
                </div>
                ${labels ? `<div class="crm-obj-labels">${labels}</div>` : ''}
                <div class="crm-progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${o.title}">
                    <div class="crm-progress-fill" style="width:${pct}%"></div>
                </div>
                <p class="template-muted crm-obj-progress-label">${pct}%</p>
                <button type="button" class="crm-btn" data-sindicato-crm-obj-toggle="${o.id}">${done ? c.crmObjReopenBtn : c.crmObjCloseBtn}</button>
            </div>`;
        };
        const section = (title, list) => `<h4 class="crm-obj-section-title">${title} <span class="crm-obj-count">${list.length}</span></h4>`
            + (list.length ? list.map(card).join('') : `<p class="template-muted">${c.crmObjEmpty}</p>`);
        return `
            <p class="template-muted">${c.crmObjetivosIntro}</p>
            <div class="crm-stat-row">
                <div class="crm-stat"><strong>${abiertos.length}</strong><span>${c.crmObjStats.abiertos}</span></div>
                <div class="crm-stat"><strong>${conseguidos.length}</strong><span>${c.crmObjStats.conseguidos}</span></div>
                <div class="crm-stat"><strong>${hitos.length}</strong><span>${c.crmObjStats.hitos}</span></div>
            </div>
            ${section(c.crmObjOpenTitle, abiertos)}
            ${section(c.crmObjDoneTitle, conseguidos)}`;
    }

    function buildCrmFinanzasHtml(locale, orgId, view) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const data = getCrmData(locale, orgId);
        const f = data.finances;
        const tab = view.crmFinanzasView === 'movimientos' ? 'movimientos' : 'resumen';
        const tabs = [['resumen', c.crmFinTabs.resumen], ['movimientos', c.crmFinTabs.movimientos]];
        let body;
        if (tab === 'movimientos') {
            body = `<table class="crm-table">
                <thead><tr><th>${c.crmFinHeads.concepto}</th><th>${c.crmFinHeads.mes}</th><th class="crm-num">${c.crmFinHeads.importe}</th></tr></thead>
                <tbody>${f.movimientos.map((m) => `<tr>
                    <td>${m.concepto}</td><td>${m.fecha}</td>
                    <td class="crm-num ${m.importe < 0 ? 'crm-neg' : 'crm-pos'}">${crmEuro(m.importe)}</td>
                </tr>`).join('')}</tbody>
            </table>`;
        } else {
            body = `<div class="crm-stat-row">
                <div class="crm-stat"><strong>${crmEuro(f.cuotasMes)}</strong><span>${c.crmFinStats.cuotas}</span></div>
                <div class="crm-stat"><strong>${crmEuro(f.fondoHuelga)}</strong><span>${c.crmFinStats.fondo}</span></div>
                <div class="crm-stat"><strong>${crmEuro(f.gastosMes)}</strong><span>${c.crmFinStats.gastos}</span></div>
            </div>`;
        }
        return `
            <p class="template-muted">${c.crmFinanzasIntro}</p>
            <div class="crm-chip-row" role="group" aria-label="${c.crmFinViewAria}">
                ${tabs.map(([id, label]) => `<button type="button" class="crm-chip${id === tab ? ' active' : ''}" data-sindicato-crm-finanzas-view="${id}">${label}</button>`).join('')}
            </div>
            ${body}`;
    }

    function buildCrmComunicacionesHtml(locale, orgId) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const data = getCrmData(locale, orgId);
        const estadoLabel = (s) => ((c.crmComEstados || {})[s] || s);
        const nextAction = (s) => (s === 'borrador' ? c.crmComNextProgramar : c.crmComNextEnviar);
        return `
            <p class="template-muted">${c.crmComunicacionesIntro}</p>
            ${data.comms.map((cm) => `<div class="sindicato-coord-card crm-comm-card">
                <div class="crm-comm-head">
                    <strong>${cm.title}</strong>
                    <span class="crm-badge crm-badge-${cm.estado}">${estadoLabel(cm.estado)}</span>
                </div>
                <p class="template-muted">${c.crmAudienciaLabel}: ${cm.audiencia}</p>
                ${cm.estado !== 'enviada' ? `<button type="button" class="crm-btn" data-sindicato-crm-comm-send="${cm.id}">✉️ ${nextAction(cm.estado)}</button>` : ''}
            </div>`).join('')}
            <h4 class="crm-templates-title">📋 ${c.crmTemplatesTitle}</h4>
            <p class="template-muted">${es
                ? 'Respuestas tipo para el trabajo repetitivo — mostradas rellenadas con datos demo. Copia y adapta.'
                : 'Standard replies for the repetitive work — shown filled with demo data. Copy and adapt.'}</p>
            ${(data.templates || []).map((tp) => `<div class="sindicato-coord-card crm-template-card">
                <div class="crm-comm-head">
                    <strong>${tp.title}</strong>
                    <span class="crm-badge crm-badge-doc">${c.crmTemplateBadge}</span>
                </div>
                <p class="template-muted crm-template-body">${tp.body.replace(/\n/g, '<br>')}</p>
                <button type="button" class="crm-btn" data-sindicato-crm-template-copy="${tp.id}">📋 ${c.crmCopyBtn}</button>
            </div>`).join('')}`;
    }

    function buildCrmCalendarioHtml(locale, orgId) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
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
                <h4>${c.crmCalAddTitle}</h4>
                <select name="type" aria-label="${c.crmCalTypeAria}">
                    ${types.map((ty) => `<option value="${ty}">${crmEventTypeLabel(locale, ty)}</option>`).join('')}
                </select>
                <input type="date" name="date" required aria-label="${c.crmCalDateAria}">
                <input type="text" name="title" required maxlength="80" placeholder="${c.crmCalTitlePlaceholder}" aria-label="${c.crmCalTitleAria}">
                <button type="submit" class="crm-btn">${c.crmCalAddBtn}</button>
            </form>`;
    }

    function buildCrmDocumentosHtml(locale, orgId, view) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const data = getCrmData(locale, orgId);
        const cats = ['todas', 'estatutos', 'actas', 'convenios', 'plantillas'];
        const active = view.crmDocFilter || 'todas';
        const docs = data.docs.filter((d) => (active !== 'todas' ? d.cat === active : true));
        return `
            <p class="template-muted">${c.crmDocumentosIntro}</p>
            <div class="crm-chip-row" role="group" aria-label="${c.crmDocFilterAria}">
                ${cats.map((cat) => `<button type="button" class="crm-chip${cat === active ? ' active' : ''}" data-sindicato-crm-doc-filter="${cat}">${cat === 'todas' ? c.crmFilterAll : crmDocCatLabel(locale, cat)}</button>`).join('')}
            </div>
            ${docs.length ? docs.map((d) => {
                const revCls = { revisada: 'activa', revision: 'pendiente', pendiente: 'baja' }[d.revision] || 'borrador';
                const ambitoLabel = (c.crmDocAmbitos && c.crmDocAmbitos[d.ambito]) || d.ambito || '';
                const revLabel = (c.crmDocRevision && c.crmDocRevision[d.revision]) || d.revision || '';
                const canAdvance = d.revision && d.revision !== 'revisada';
                return `<div class="sindicato-coord-card crm-doc-card">
                <span class="crm-badge crm-badge-doc">${crmDocCatLabel(locale, d.cat)}</span>
                <strong>${d.title}</strong>
                <span class="crm-doc-access">${d.ambito ? `<span class="crm-badge crm-badge-ambito"><span aria-hidden="true">🔒</span> ${ambitoLabel}</span>` : ''}${d.revision ? `<span class="crm-badge crm-badge-${revCls}">${revLabel}</span>` : ''}</span>
                <span class="template-muted">${c.crmDocUpdatedLabel} ${d.updated}${d.by ? ` · ${d.by}` : ''}${d.revisor ? ` · ${c.crmDocRevisaLabel}: ${d.revisor}` : ''}</span>
                ${canAdvance ? `<button type="button" class="crm-mini-btn crm-doc-review-btn" data-sindicato-crm-doc-review="${d.id}">${c.crmDocAdvanceBtn}</button>` : ''}
            </div>`;
            }).join('') : `<p class="template-muted">${c.crmDocsEmpty}</p>`}
            <p class="template-muted crm-doc-access-note">${es
                ? 'Cada documento lleva su ámbito de acceso (quién puede verlo) y su estado de revisión. Las tablas viven en Bases de datos y el registro de fuentes en Fuentes de datos.'
                : 'Each document carries its access scope (who may see it) and its review status. Tables live under Databases and the source registry under Data sources.'}</p>`;
    }

    /* 17-07-2026 (idea 19 + petición reunión): pestaña «Bases de datos» del CRM.
       Presenta las tablas del modelo de datos con nº de registros y la cardinalidad
       que soporta pluralidad (respuesta al «1 persona / 1 dirección / 1 piso pocha»),
       más el registro de fuentes y el export JSON. */
    function buildCrmDatosHtml(locale, orgId, view) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const data = getCrmData(locale, orgId);
        const nWps = (getWorkplaces(locale) || []).length;
        const nTerr = (getSubterritories(locale) || []).length;
        const nUnions = (getUnions(locale) || []).length;
        const tables = es ? [
            { icon: '👤', name: 'Personas', n: data.members.length, card: 'una persona ↔ N direcciones, N casos, N relaciones con la organización' },
            { icon: '📂', name: 'Casos', n: data.cases.length, card: 'un caso ↔ N personas afectadas, N actualizaciones, N documentos' },
            { icon: '🏢', name: 'Actores (empresas / tenedores)', n: nWps, card: 'un actor ↔ N casos, N centros de trabajo' },
            { icon: '🏘️', name: 'Territorios', n: nTerr, card: 'provincia ↔ N comarcas ↔ N municipios ↔ N edificios' },
            { icon: '🏛️', name: 'Organizaciones', n: nUnions, card: 'una organización ↔ N secciones, N comisiones' },
            { icon: '📁', name: 'Documentos', n: data.docs.length, card: 'un documento ↔ 1 caso o 1 ámbito, con estado de revisión' }
        ] : [
            { icon: '👤', name: 'People', n: data.members.length, card: 'one person ↔ N addresses, N cases, N relationships with the org' },
            { icon: '📂', name: 'Cases', n: data.cases.length, card: 'one case ↔ N affected people, N updates, N documents' },
            { icon: '🏢', name: 'Actors (companies / landlords)', n: nWps, card: 'one actor ↔ N cases, N work centres' },
            { icon: '🏘️', name: 'Territories', n: nTerr, card: 'province ↔ N counties ↔ N municipalities ↔ N buildings' },
            { icon: '🏛️', name: 'Organisations', n: nUnions, card: 'one org ↔ N branches, N commissions' },
            { icon: '📁', name: 'Documents', n: data.docs.length, card: 'one document ↔ 1 case or 1 scope, with review status' }
        ];
        return `
            <p class="template-muted">${c.crmDatosIntro}</p>
            <h4 class="crm-sources-title">🗄️ ${c.crmDatosTablesTitle}</h4>
            <table class="crm-table">
                <thead><tr>
                    <th>${c.crmDatosHeads.tabla}</th><th class="crm-num">${c.crmDatosHeads.registros}</th><th>${c.crmDatosHeads.cardinalidad}</th>
                </tr></thead>
                <tbody>${tables.map((tb) => `<tr>
                    <td><strong>${tb.icon} ${tb.name}</strong></td>
                    <td class="crm-num">${tb.n.toLocaleString(es ? 'es-ES' : 'en-IE')}</td>
                    <td class="template-muted">${tb.card}</td>
                </tr>`).join('')}</tbody>
            </table>
            <p class="template-muted">${es
                ? 'El registro de fuentes que alimentan estas tablas vive ahora en su propia pestaña: Fuentes de datos.'
                : 'The registry of sources feeding these tables now lives in its own tab: Data sources.'}</p>
            <button type="button" class="crm-btn" data-sindicato-crm-export>⬇️ ${c.crmExportBtn}</button>
            <p class="template-muted">${es
                ? 'Tus datos son tuyos: todo lo de la organización se exporta en un fichero abierto, sin dependencia de la plataforma.'
                : 'Your data is yours: everything in the organisation exports to an open file, with no platform lock-in.'}</p>`;
    }

    /* 18-07 (decreto Edu): «Fuentes de datos» separada como funcionalidad propia del
       CRM — antes era una sección dentro de Bases de datos. Petición literal de la
       reunión SdLl 14-07: «hay que crear un listado de fuentes de datos». */
    function buildCrmFuentesHtml(locale, orgId) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const data = getCrmData(locale, orgId);
        return `
            <h4 class="crm-sources-title">📇 ${c.crmDatosSourcesTitle}</h4>
            <p class="template-muted">${es
                ? 'Qué fuentes alimentan los datos de la organización, quién responde de cada una y su estado de integración en el sistema común (BD principal, encuestas, excels heredados, calendario…).'
                : 'Which sources feed the organisation’s data, who answers for each one, and its integration status in the shared system (main DB, surveys, legacy spreadsheets, calendar…).'}</p>
            <table class="crm-table">
                <thead><tr>
                    <th>${c.crmFuentesHeads.fuente}</th><th>${c.crmFuentesHeads.tipo}</th><th>${c.crmFuentesHeads.responsable}</th><th>${c.crmFuentesHeads.estado}</th>
                </tr></thead>
                <tbody>${(data.sources || []).map((s) => `<tr>
                    <td><strong>${s.name}</strong></td>
                    <td>${s.tipo}</td>
                    <td>${s.owner}</td>
                    <td><span class="crm-badge crm-badge-${{ integrada: 'activa', parcial: 'pendiente', pendiente: 'baja' }[s.estado] || 'borrador'}">${(c.crmFuentesEstados || {})[s.estado] || s.estado}</span></td>
                </tr>`).join('')}</tbody>
            </table>
            <p class="template-muted">${es
                ? 'Integrar una fuente no es copiarla: es decidir qué tabla del modelo la absorbe y quién deja de mantener la copia vieja.'
                : 'Integrating a source is not copying it: it is deciding which table of the model absorbs it and who stops maintaining the old copy.'}</p>`;
    }

    /* 17-07-2026 (idea 16 + petición reunión SdLl): pestaña «Estructura» del CRM —
       organigrama vivo. Comisiones → cargos → personas, con ámbito por comisión y
       documento de funciones por cargo. Cargos vacantes en rojo. Personas tomadas del
       censo demo para que cada organización muestre nombres coherentes. */
    /* 17-07-2026 (descomposición CRM, peculiaridades): comisiones propias por tipo de
       colectivo. Profesionales, Autónomos y Estudiantes tienen un organigrama distinto
       del sindical clásico; Trabajadores e Inquilinos conservan el set base (que les
       encaja). Devuelve null para que caiga al set por defecto. */
    /* 20-07-2026 (ADR 0024): cada cargo declara además sus CAPACIDADES (ids de tab
       del CRM — el vocabulario del ADR 0019) y su ÁMBITO (texto libre corto). El
       organigrama documenta así el modelo de accesos dentro de la propia Gestión:
       coherente con los 4 arquetipos demo (coordinación / acción / comunicación / datos). */
    function crmComisionesForType(locale, type, nm) {
        const es = localeKey(locale) === 'es';
        const T = {
            profesionales: es ? [
                { icon: '⚖️', name: 'Deontología', scope: 'Código deontológico, expedientes y buenas prácticas', cargos: [
                    { role: 'Presidencia de deontología', person: nm(0), funciones: 'Vela por el cumplimiento del código y resuelve las consultas éticas.', capacidades: ['casos', 'documentos'], ambito: 'expedientes deontológicos' },
                    { role: 'Instrucción de expedientes', person: '', funciones: 'Instruye los expedientes disciplinarios con garantías.', capacidades: ['casos'], ambito: 'expedientes abiertos' }
                ] },
                { icon: '🛡️', name: 'Defensa profesional', scope: 'Intrusismo, honorarios dignos y condiciones de ejercicio', cargos: [
                    { role: 'Coordinación de defensa', person: nm(1), funciones: 'Denuncia el intrusismo y defiende los honorarios de referencia.', capacidades: ['intake', 'casos', 'asambleas', 'documentos'], ambito: 'toda la organización' },
                    { role: 'Referente jurídico', person: nm(2), funciones: 'Asesora en los conflictos de ejercicio profesional.', capacidades: ['casos', 'documentos'], ambito: 'conflictos de ejercicio (Barcelonès)', ambitoTerritorio: 'barcelona-ciutat' }
                ] },
                { icon: '📚', name: 'Formación continua', scope: 'Formación obligatoria, acreditación y actualización', cargos: [
                    { role: 'Coordinación de formación', person: nm(3), funciones: 'Programa la formación continua y gestiona la acreditación.', capacidades: ['calendario', 'comunicaciones'], ambito: 'programa formativo' }
                ] }
            ] : [
                { icon: '⚖️', name: 'Ethics board', scope: 'Code of conduct, disciplinary files and good practice', cargos: [
                    { role: 'Ethics chair', person: nm(0), funciones: 'Upholds the code and answers ethical queries.', capacidades: ['casos', 'documentos'], ambito: 'ethics files' },
                    { role: 'Case instruction', person: '', funciones: 'Runs disciplinary files with due-process guarantees.', capacidades: ['casos'], ambito: 'open files' }
                ] },
                { icon: '🛡️', name: 'Professional defence', scope: 'Unlicensed practice, fair fees and working conditions', cargos: [
                    { role: 'Defence coordination', person: nm(1), funciones: 'Reports unlicensed practice and defends reference fees.', capacidades: ['intake', 'casos', 'asambleas', 'documentos'], ambito: 'the whole organisation' },
                    { role: 'Legal reference', person: nm(2), funciones: 'Advises on professional-practice disputes.', capacidades: ['casos', 'documentos'], ambito: 'practice disputes (Docklands)', ambitoTerritorio: 'dublin-docklands' }
                ] },
                { icon: '📚', name: 'Continuing education', scope: 'Mandatory training, accreditation and updates', cargos: [
                    { role: 'Training coordination', person: nm(3), funciones: 'Programmes continuing education and manages accreditation.', capacidades: ['calendario', 'comunicaciones'], ambito: 'training programme' }
                ] }
            ],
            autonomos: es ? [
                { icon: '💶', name: 'Tarifas y condiciones', scope: 'Tarifas de referencia, plazos de pago y cláusulas abusivas', cargos: [
                    { role: 'Coordinación de tarifas', person: nm(0), funciones: 'Recoge y publica las tarifas de referencia por actividad.', capacidades: ['datos', 'fuentes', 'campanas'], ambito: 'tarifas de referencia' },
                    { role: 'Referente de contratos', person: '', funciones: 'Revisa cláusulas abusivas y situaciones de falso autónomo.', capacidades: ['casos', 'documentos'], ambito: 'contratos y cláusulas' }
                ] },
                { icon: '🛵', name: 'Plataformas', scope: 'Relación con plataformas y grandes clientes', cargos: [
                    { role: 'Referente de plataformas', person: nm(1), funciones: 'Coordina la respuesta ante desconexiones y cambios de algoritmo.', capacidades: ['intake', 'casos', 'asambleas'], ambito: 'su plataforma (Barcelonès)', ambitoTerritorio: 'barcelona-ciutat' }
                ] },
                { icon: '🤝', name: 'Mutualismo y coberturas', scope: 'Cese de actividad, coberturas y apoyo mutuo', cargos: [
                    { role: 'Coordinación de coberturas', person: nm(2), funciones: 'Gestiona la caja de apoyo mutuo y orienta sobre coberturas.', capacidades: ['afiliadas', 'datos'], ambito: 'caja de apoyo mutuo' }
                ] }
            ] : [
                { icon: '💶', name: 'Rates & conditions', scope: 'Reference rates, payment terms and unfair clauses', cargos: [
                    { role: 'Rates coordination', person: nm(0), funciones: 'Collects and publishes reference rates by activity.', capacidades: ['datos', 'fuentes', 'campanas'], ambito: 'reference rates' },
                    { role: 'Contracts reference', person: '', funciones: 'Reviews unfair clauses and bogus self-employment.', capacidades: ['casos', 'documentos'], ambito: 'contracts & clauses' }
                ] },
                { icon: '🛵', name: 'Platforms', scope: 'Relations with platforms and big clients', cargos: [
                    { role: 'Platforms reference', person: nm(1), funciones: 'Coordinates responses to deactivations and algorithm changes.', capacidades: ['intake', 'casos', 'asambleas'], ambito: 'their platform (Docklands)', ambitoTerritorio: 'dublin-docklands' }
                ] },
                { icon: '🤝', name: 'Mutual aid & cover', scope: 'Cessation of activity, cover and mutual support', cargos: [
                    { role: 'Cover coordination', person: nm(2), funciones: 'Runs the mutual-aid fund and advises on cover.', capacidades: ['afiliadas', 'datos'], ambito: 'mutual-aid fund' }
                ] }
            ],
            estudiantes: es ? [
                { icon: '✊', name: 'Reivindicativa', scope: 'Tasas, becas y calidad docente', cargos: [
                    { role: 'Coordinación reivindicativa', person: nm(0), funciones: 'Coordina las campañas por tasas y becas.', capacidades: ['intake', 'casos', 'asambleas'], ambito: 'campañas de tasas y becas' },
                    { role: 'Referente de becas', person: '', funciones: 'Orienta sobre becas y ayudas y detecta casos.', capacidades: ['intake', 'documentos'], ambito: 'becas y ayudas' }
                ] },
                { icon: '💚', name: 'Bienestar y salud mental', scope: 'Salud mental, acoso y convivencia', cargos: [
                    { role: 'Coordinación de bienestar', person: nm(1), funciones: 'Impulsa las plazas de atención psicológica y los protocolos anti-acoso.', capacidades: ['casos', 'documentos'], ambito: 'protocolos y acompañamiento (Barcelonès)', ambitoTerritorio: 'barcelona-ciutat' }
                ] },
                { icon: '📣', name: 'Comunicación', scope: 'Redes, asambleas y comunicación estudiantil', cargos: [
                    { role: 'Coordinación de comunicación', person: nm(2), funciones: 'Coordina la comunicación y la convocatoria de asambleas.', capacidades: ['campanas', 'comunicaciones', 'calendario'], ambito: 'toda la organización' }
                ] }
            ] : [
                { icon: '✊', name: 'Demands', scope: 'Fees, grants and teaching quality', cargos: [
                    { role: 'Demands coordination', person: nm(0), funciones: 'Coordinates the fees and grants campaigns.', capacidades: ['intake', 'casos', 'asambleas'], ambito: 'fees & grants campaigns' },
                    { role: 'Grants reference', person: '', funciones: 'Advises on grants and aid and spots cases.', capacidades: ['intake', 'documentos'], ambito: 'grants & aid' }
                ] },
                { icon: '💚', name: 'Wellbeing & mental health', scope: 'Mental health, harassment and coexistence', cargos: [
                    { role: 'Wellbeing coordination', person: nm(1), funciones: 'Pushes for counselling places and anti-harassment protocols.', capacidades: ['casos', 'documentos'], ambito: 'protocols & accompaniment (Docklands)', ambitoTerritorio: 'dublin-docklands' }
                ] },
                { icon: '📣', name: 'Communication', scope: 'Social media, assemblies and student comms', cargos: [
                    { role: 'Comms coordination', person: nm(2), funciones: 'Coordinates communication and assembly calls.', capacidades: ['campanas', 'comunicaciones', 'calendario'], ambito: 'the whole organisation' }
                ] }
            ]
        };
        return T[type] || null;
    }

    /* 20-07-2026 tarde (ideas 63+67, report v5): el set BASE de comisiones sale de
       buildCrmEstructuraHtml a función propia para que el motor de cargos (getTeamCargos,
       resolveCargoDef) pueda leer el mismo seed que pinta el organigrama. Los cargos con
       `ambitoTerritorio` (idea 67) recortan la pantalla de casos a su territorio. */
    function crmComisionesBase(locale, nm) {
        const es = localeKey(locale) === 'es';
        return es ? [
            { icon: '⚖️', name: 'Acción sindical', scope: 'Asamblea de los viernes, gestión de conflictos, huelgas y presión institucional', cargos: [
                { role: 'Coordinación de acción', person: nm(0), funciones: 'Convoca y modera la asamblea de casos, prioriza conflictos y coordina las respuestas colectivas.', capacidades: ['intake', 'casos', 'asambleas', 'documentos'], ambito: 'toda la organización' },
                { role: 'Referente jurídico', person: nm(1), funciones: 'Revisa la documentación de los casos, orienta sobre vías legales y prepara escritos.', capacidades: ['casos', 'documentos'], ambito: 'casos abiertos del Barcelonès', ambitoTerritorio: 'barcelona-ciutat' },
                { role: 'Piquetes y acompañamiento', person: '', funciones: 'Organiza los acompañamientos a desahucios y las acciones de presión sobre el terreno.', capacidades: ['asambleas', 'calendario'], ambito: 'su territorio (Bages)', ambitoTerritorio: 'central-bages' }
            ] },
            { icon: '📣', name: 'Comunicación', scope: 'Redes, prensa, CRM de comunicación y campañas públicas', cargos: [
                { role: 'Coordinación de comunicación', person: nm(2), funciones: 'Define la línea comunicativa, gestiona el CRM y coordina las campañas.', capacidades: ['campanas', 'comunicaciones', 'calendario'], ambito: 'toda la organización' },
                { role: 'Redes y contenidos', person: nm(3), funciones: 'Produce y programa los contenidos en redes y el boletín de afiliadas.', capacidades: ['comunicaciones'], ambito: 'redes y boletín' }
            ] },
            { icon: '🧩', name: 'Organización', scope: 'Base de datos, informática, altas y logística interna', cargos: [
                { role: 'Coordinación de organización', person: nm(4), funciones: 'Mantiene el censo y la estructura, coordina el grupo de informática y la logística.', capacidades: ['afiliadas', 'estructura', 'finanzas'], ambito: 'toda la organización' },
                { role: 'Datos e informática', person: nm(5), funciones: 'Gestiona las bases de datos, las fuentes y las integraciones del sistema común.', capacidades: ['datos', 'fuentes'], ambito: 'sistema común' }
            ] },
            { icon: '📚', name: 'Contenidos', scope: 'Formación, elaboración política y las 3 reuniones anuales', cargos: [
                { role: 'Coordinación de contenidos', person: nm(6), funciones: 'Prepara las reuniones de contenidos y coordina la formación de delegadas.', capacidades: ['documentos', 'calendario'], ambito: 'formación y reuniones' }
            ] }
        ] : [
            { icon: '⚖️', name: 'Union action', scope: 'Friday assembly, dispute handling, strikes and institutional pressure', cargos: [
                { role: 'Action coordination', person: nm(0), funciones: 'Calls and moderates the case assembly, prioritises disputes and coordinates collective responses.', capacidades: ['intake', 'casos', 'asambleas', 'documentos'], ambito: 'the whole organisation' },
                { role: 'Legal reference', person: nm(1), funciones: 'Reviews case documents, advises on legal routes and drafts submissions.', capacidades: ['casos', 'documentos'], ambito: 'open cases in the Docklands', ambitoTerritorio: 'dublin-docklands' },
                { role: 'Pickets & accompaniment', person: '', funciones: 'Organises eviction accompaniment and on-the-ground pressure actions.', capacidades: ['asambleas', 'calendario'], ambito: 'their territory (Cork)', ambitoTerritorio: 'cork-city' }
            ] },
            { icon: '📣', name: 'Communication', scope: 'Social media, press, comms CRM and public campaigns', cargos: [
                { role: 'Comms coordination', person: nm(2), funciones: 'Sets the communication line, runs the CRM and coordinates campaigns.', capacidades: ['campanas', 'comunicaciones', 'calendario'], ambito: 'the whole organisation' },
                { role: 'Social & content', person: nm(3), funciones: 'Produces and schedules social content and the members\' bulletin.', capacidades: ['comunicaciones'], ambito: 'social & bulletin' }
            ] },
            { icon: '🧩', name: 'Organisation', scope: 'Database, IT, memberships and internal logistics', cargos: [
                { role: 'Org coordination', person: nm(4), funciones: 'Keeps the census and structure, coordinates the IT group and logistics.', capacidades: ['afiliadas', 'estructura', 'finanzas'], ambito: 'the whole organisation' },
                { role: 'Data & IT', person: nm(5), funciones: 'Manages the databases, sources and integrations of the shared system.', capacidades: ['datos', 'fuentes'], ambito: 'shared system' }
            ] },
            { icon: '📚', name: 'Content', scope: 'Training, political drafting and the 3 yearly meetings', cargos: [
                { role: 'Content coordination', person: nm(6), funciones: 'Prepares the content meetings and coordinates delegate training.', capacidades: ['documentos', 'calendario'], ambito: 'training & meetings' }
            ] }
        ];
    }

    /* Organigrama efectivo de un tipo de equipo: el suyo propio o el set base. */
    function getComisionesForTeam(locale, type, nm) {
        const n = nm || (() => '');
        return crmComisionesForType(locale, type, n) || crmComisionesBase(locale, n);
    }

    function buildCrmEstructuraHtml(locale, orgId, contextType) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const data = getCrmData(locale, orgId);
        const names = data.members.map((m) => m.name);
        const nm = (i) => names.length ? names[i % names.length] : '—';
        /* 20-07-2026 (ADR 0024): capacidades + ámbito también en el set base — ver
           nota sobre crmComisionesForType. */
        const comisiones = getComisionesForTeam(locale, contextType, nm);
        /* 20-07 tarde (idea 64, report v5): cargos ad hoc — la excepción disciplinada.
           Viven en el runtime persistido del equipo (getCrmData) y se muestran en el
           mismo organigrama con badge «ad hoc · caduca DD-MM»; caducados, tachados y
           sin conceder (ver adhocCargoExpired en cargoAllows). */
        const adhoc = getAdhocCargos(locale, orgId);
        const adhocCards = adhoc.map((cg) => {
            const expired = adhocCargoExpired(cg);
            const capChips = (cg.capacidades || []).map((cap) =>
                `<span class="crm-cap-chip">${(c.coordSubs && c.coordSubs[cap]) || cap}</span>`).join('');
            const badge = expired
                ? `<span class="crm-badge crm-badge-baja">${c.crmAdhocExpiredBadge}</span>`
                : `<span class="crm-badge crm-badge-pendiente">${String(c.crmAdhocBadge || '{d}').replace('{d}', formatAdhocDate(cg.caduca))}</span>`;
            return `<div class="sindicato-coord-card crm-estructura-cargo crm-adhoc-cargo${expired ? ' crm-adhoc-expired' : ''}">
                <div class="crm-estructura-cargo-head"><strong>${cg.nombre}</strong> <span>${badge}</span></div>
                <p class="crm-estructura-caps"><strong>${c.crmEstructuraCapacidades}:</strong> ${capChips}${cg.ambito ? ` <span class="template-muted">· ${c.crmEstructuraAmbito}: ${cg.ambito}</span>` : ''}</p>
            </div>`;
        }).join('');
        const capChecks = getCrmTabsForType(contextType).map((tab) =>
            `<label class="crm-adhoc-cap"><input type="checkbox" value="${tab}" data-crm-adhoc-cap> ${(c.coordSubs && c.coordSubs[tab]) || tab}</label>`
        ).join('');
        const adhocSection = `<section class="sindicato-sector-section crm-adhoc-section" data-crm-adhoc-form>
            <header class="sindicato-sector-section-head">
                <span class="sindicato-sector-section-icon" aria-hidden="true">⏳</span>
                <h3>${c.crmAdhocTitle}</h3>
            </header>
            <p class="template-muted">${c.crmAdhocIntro}</p>
            ${adhocCards}
            <label class="crm-adhoc-field">${c.crmAdhocName}
                <input type="text" class="sindicato-search-input" data-crm-adhoc-name></label>
            <p class="crm-adhoc-field crm-adhoc-caps-label"><strong>${c.crmAdhocCaps}:</strong></p>
            <div class="crm-adhoc-caps">${capChecks}</div>
            <label class="crm-adhoc-field">${c.crmAdhocAmbito}
                <input type="text" class="sindicato-search-input" data-crm-adhoc-ambito></label>
            <label class="crm-adhoc-field">${c.crmAdhocCaduca}
                <input type="date" class="sindicato-search-input" data-crm-adhoc-caduca></label>
            <p><button type="button" class="crm-btn" data-crm-adhoc-create="${orgId}">➕ ${c.crmAdhocCreate}</button></p>
        </section>`;
        /* 20-07 tarde (idea 66, report v5): rastro de cargos al final de Estructura —
           lista sobria de quién ocupó qué y cuándo (persistido, este navegador). */
        const trail = getCargoTrail();
        const trailItems = trail.length
            ? trail.map((it) =>
                `<li class="crm-trail-item"><span class="template-muted">${it.when}</span> — <strong>${c.crmTrailYou}</strong> ${(c.crmTrailActions && c.crmTrailActions[it.action]) || it.action} «${it.cargo}»</li>`).join('')
            : `<li class="template-muted">${c.crmTrailEmpty}</li>`;
        const trailSection = `<section class="sindicato-sector-section crm-trail-section">
            <header class="sindicato-sector-section-head">
                <span class="sindicato-sector-section-icon" aria-hidden="true">🧾</span>
                <h3>${c.crmTrailTitle}</h3>
            </header>
            <p class="template-muted">${c.crmTrailIntro}</p>
            <ul class="crm-trail-list">${trailItems}</ul>
        </section>`;
        return `
            <p class="template-muted">${c.crmEstructuraIntro}</p>
            ${comisiones.map((com) => {
                const cargos = com.cargos.map((cg) => {
                    const vacante = !cg.person;
                    /* 20-07-2026 (ADR 0024): el organigrama ES la ACL — cada cargo muestra
                       las capacidades (botones crm-*) que concede y sobre qué ámbito. */
                    const capChips = (cg.capacidades || []).map((cap) =>
                        `<span class="crm-cap-chip">${(c.coordSubs && c.coordSubs[cap]) || cap}</span>`
                    ).join('');
                    const capLine = capChips
                        ? `<p class="crm-estructura-caps"><strong>${c.crmEstructuraCapacidades}:</strong> ${capChips}${cg.ambito ? ` <span class="template-muted">· ${c.crmEstructuraAmbito}: ${cg.ambito}</span>` : ''}</p>`
                        : '';
                    return `<div class="sindicato-coord-card crm-estructura-cargo${vacante ? ' crm-estructura-vacante' : ''}">
                        <div class="crm-estructura-cargo-head">
                            <strong>${cg.role}</strong>
                            <span>${vacante ? `⚠️ ${c.crmEstructuraVacante}` : cg.person}</span>
                        </div>
                        ${capLine}
                        <details><summary>${c.crmEstructuraFunciones}</summary><p class="template-muted">${cg.funciones}</p></details>
                    </div>`;
                }).join('');
                return `<section class="sindicato-sector-section crm-estructura-com">
                    <header class="sindicato-sector-section-head">
                        <span class="sindicato-sector-section-icon" aria-hidden="true">${com.icon}</span>
                        <h3>${com.name} <span class="crm-count">${com.cargos.length} ${c.crmEstructuraMembers}</span></h3>
                    </header>
                    <p class="template-muted"><strong>${c.crmEstructuraScope}:</strong> ${com.scope}</p>
                    ${cargos}
                </section>`;
            }).join('')}
            ${adhocSection}
            ${trailSection}`;
    }

    /* 17-07-2026 (descomposición CRM, fase 2): qué pestañas de gestión encajan en cada
       tipo de sindicato. Se quita de cada uno lo que no le corresponde:
       - Autónomos y Estudiantes: sin Finanzas (no hay cuotas/caja de resistencia clásicas).
       - Consumidores: es coordinación de campañas, no una unión de afiliadas con casos y
         asambleas → solo Campañas, Comunicaciones, Calendario, Documentos, Bases de datos.
       - Trabajadores, Inquilinos y Profesionales conservan el juego completo. */
    /* 18-07 (decreto Edu): «Fuentes de datos» deja de vivir dentro de Bases de datos y
       pasa a ser funcionalidad propia (botón propio en la sidebar del equipo). */
    const CRM_ALL_TABS = ['afiliadas', 'intake', 'casos', 'asambleas', 'campanas', 'finanzas', 'comunicaciones', 'calendario', 'documentos', 'estructura', 'datos', 'fuentes'];
    /* 22-07-2026 (petición Edu): Inquilinos estrena «Objetivos» — un repositorio de
       objetivos de la organización estilo GitHub (metas colectivas, estado, progreso,
       hitos). De momento es housing-only, así que housing tiene su propia lista en vez
       de apuntar a CRM_ALL_TABS. */
    const CRM_HOUSING_TABS = ['afiliadas', 'intake', 'casos', 'asambleas', 'objetivos', 'campanas', 'finanzas', 'comunicaciones', 'calendario', 'documentos', 'estructura', 'datos', 'fuentes'];
    const CRM_TABS_BY_TYPE = {
        unions: CRM_ALL_TABS,
        housing: CRM_HOUSING_TABS,
        profesionales: CRM_ALL_TABS,
        autonomos: ['afiliadas', 'intake', 'casos', 'asambleas', 'campanas', 'comunicaciones', 'calendario', 'documentos', 'estructura', 'datos', 'fuentes'],
        estudiantes: ['afiliadas', 'intake', 'casos', 'asambleas', 'campanas', 'comunicaciones', 'calendario', 'documentos', 'estructura', 'datos', 'fuentes'],
        consumidores: ['campanas', 'comunicaciones', 'calendario', 'documentos', 'datos', 'fuentes']
    };
    function getCrmTabsForType(type) {
        return CRM_TABS_BY_TYPE[type] || CRM_ALL_TABS;
    }

    function buildCoordinationSubHtml(locale, coordSub, ctx) {
        const c = t(locale);
        const view = ctx || {};
        /* Propuesta (17-07): los anillos van implícitos en los módulos — el CRM es la
           herramienta del rol militante y ABSORBE las pantallas internas como pestañas
           propias: Intake y Asambleas son tabs nuevos, y Casos se convierte en fichas
           vivas. Sin rol suficiente, el módulo entero se explica en vez de abrirse. */
        if (view.webVersion === 'propuesta') {
            const role = view.propuestaRole || 'visitante';
            const cargo = view.propuestaCargo || 'ninguno';
            /* 20-07-2026 (ADR 0024): relación afiliada + cargo con la capacidad de la
               pestaña pedida — el candado informa de quién lleva esa área. */
            if (!propuestaRoleAllows(role, 'afiliado') || !cargoAllows(cargo, coordSub)) {
                /* 20-07 tarde (idea 63): el candado ofrece también los cargos del
                   organigrama del equipo abierto (y sus ad hoc vigentes). */
                return buildCargoLockedHtml(locale, coordSub, role, cargo, { type: view.crmContextModule, orgId: view.crmOrg });
            }
            if (coordSub === 'intake' || coordSub === 'asambleas' || coordSub === 'casos') {
                return buildPropuestaScreenHtml(locale, coordSub, role, view.crmContextModule, cargo);
            }
        }
        const orgId = findCrmOrg(locale, view.crmOrg) ? view.crmOrg : 'sindicapp';
        const org = findCrmOrg(locale, orgId);
        /* Pestañas permitidas según el tipo de colectivo del que se entró. */
        const allowedTabs = getCrmTabsForType(view.crmContextModule);
        let sub = c.coordSubs[coordSub] ? coordSub : allowedTabs[0];
        /* Si la pestaña no encaja en este tipo, cae a la primera permitida. */
        if (allowedTabs.indexOf(sub) === -1) sub = allowedTabs[0];
        const builders = {
            afiliadas: () => buildCrmAfiliadasHtml(locale, orgId, view),
            casos: () => buildCrmCasosHtml(locale, orgId),
            objetivos: () => buildCrmObjetivosHtml(locale, orgId),
            campanas: () => buildCrmCampanasHtml(locale, orgId),
            finanzas: () => buildCrmFinanzasHtml(locale, orgId, view),
            comunicaciones: () => buildCrmComunicacionesHtml(locale, orgId),
            calendario: () => buildCrmCalendarioHtml(locale, orgId),
            documentos: () => buildCrmDocumentosHtml(locale, orgId, view),
            datos: () => buildCrmDatosHtml(locale, orgId, view),
            fuentes: () => buildCrmFuentesHtml(locale, orgId),
            estructura: () => buildCrmEstructuraHtml(locale, orgId, view.crmContextModule)
        };
        /* Descomposición del CRM (17-07): banner de contexto según el módulo de colectivo
           desde el que se entró. La gestión ya no es un módulo aparte: es la de ESTE tipo. */
        const ctxType = view.crmContextModule;
        const ctxBanner = (ctxType && c.subs && c.subs[ctxType])
            ? `<div class="crm-context-banner"><span class="crm-context-icon" aria-hidden="true">📇</span> <strong>${c.gestionContextLabel} · ${c.subs[ctxType]}</strong><p class="template-muted">${(c.crmModuleNotes || {})[ctxType] || ''}</p></div>`
            : '';
        /* Peculiaridad por tipo: el censo se nombra según el colectivo. */
        const subLabel = (sub === 'afiliadas' && ctxType && c.crmCensusByType && c.crmCensusByType[ctxType])
            ? c.crmCensusByType[ctxType]
            : c.coordSubs[sub];
        const orgDisplay = view.equipoName || org.name;
        return `<div class="sindicato-panel crm-panel">
            ${ctxBanner}
            <h2>${subLabel} <span class="crm-org-tag">· ${orgDisplay}</span></h2>
            ${builders[sub]()}
            <p class="sindicato-note sindicato-note-demo"><em>${c.demoNote}</em></p>
        </div>`;
    }

    /* Orden de artículos de la base de conocimiento (claves compartidas ES/EN).
       'sindicapp' es el artículo inicial/destacado de la wiki. */
    /* 20-07-2026 (ADR 0024): «accesos» — la teoría de quién ve qué, en la wiki. */
    const WIKI_KB_ARTICLES = ['sindicapp', 'derechos', 'denunciar', 'organizar', 'glosario', 'ia', 'accesos'];

    function buildWikiArticleHtml(locale, id) {
        const c = t(locale);
        const es = localeKey(locale) === 'es';
        const art = (c.wikiArticles || {})[id];
        if (!art) return buildWikiIndexHtml(locale);
        const backLabel = c.wikiBackIndex;
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
        const es = localeKey(locale) === 'es';
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
        const es = localeKey(locale) === 'es';
        const backLabel = c.wikiBackIndex;
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
        const es = localeKey(locale) === 'es';
        const backLabel = c.wikiBackIndex;
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
        const es = localeKey(locale) === 'es';
        const forumPosts = getViviendaForumPosts(locale, territoryId, terr.name);
        const forumHtml = forumPosts.map((post) =>
            `<div class="sindicato-coord-card"><strong>${post.title}</strong><p class="template-muted">${post.replies} ${c.feedRepliesLabel}</p></div>`
        ).join('');
        const linkedWorkplaces = terr.workplaces.slice(0, 8).map((wp) =>
            `<button type="button" class="sindicato-union-company-link" data-sindicato-goto-workplace="${wp.id}">${wp.name}</button>`
        ).join('') || `<span class="template-muted">—</span>`;
        const alerts = getViviendaAlerts(locale, territoryId);
        const alertsHtml = alerts.length
            ? alerts.map((alert) => {
                const statusLabel = alert.status === 'scheduled'
                    ? c.alertStatusScheduled
                    : c.alertStatusRisk;
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
            if (!ctx.unionId) return buildUnionsDirectoryHtml(locale, ctx);
            return buildUnionSectionHtml(locale, ctx.unionId, ctx.unionSection || 'overview', ctx);
        }
        /* 13-07-2026: «feed» es ahora Red Social (módulo master, landing con stats);
           el foro real vive en el sub «foro» con los ámbitos de siempre. */
        if (sub === 'feed') return buildRedSocialHtml(locale);
        if (sub === 'foro') {
            /* Propuesta (17-07): tablón «Interno» como 4º ámbito del Foro — el anillo
               afiliado, implícito dentro del módulo. Solo existe en la Propuesta. */
            if ((ctx.feedScope || '') === 'interno') {
                if (ctx.webVersion !== 'propuesta') {
                    return buildFeedHtml(locale, { feedScope: 'general' });
                }
                return buildPropuestaScreenHtml(locale, 'forointerno', ctx.propuestaRole || 'visitante', '', ctx.propuestaCargo || 'ninguno');
            }
            return buildFeedHtml(locale, {
                feedScope: ctx.feedScope || 'general',
                feedSectorId: ctx.feedSectorId || '',
                feedTerritoryId: ctx.feedTerritoryId || '',
                feedCompanyId: ctx.feedCompanyId || '',
                forumThreadSlug: ctx.forumThreadSlug || ''
            });
        }
        if (sub === 'consumidores') return buildConsumidoresHtml(locale, ctx.consumidorId || '', ctx);
        if (sub === 'estudiantes') return buildEstudiantesHtml(locale, ctx.estudianteCentroId || '', ctx);
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
        if (sub === 'housing') return buildHousingHtml(locale, ctx.housingSub || 'huelgometro', ctx);
        /* 17-07-2026: `sindicatos` sigue reservado (fuera de la subnav); `autonomos`
           y el nuevo `profesionales` estrenan contenido. */
        if (sub === 'sindicatos') return buildComingSoonHtml(locale, '🚩', 'sindicatos');
        if (sub === 'autonomos') return buildAutonomosHtml(locale, ctx.autonomoId || '', ctx);
        if (sub === 'profesionales') return buildProfesionalesHtml(locale, ctx.profesionalId || '', ctx);
        /* 20-07 tarde (idea 68 parcial): la ruta del sub `anillo` se purgó con la
           pantalla «inicio» y PROPUESTA_RINGS — las pantallas propuesta restantes
           (miscasos, forointerno, intake, casos, asambleas) se piden por su ruta real. */
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

    /* ================================================================
     * 20-07-2026 (idea 52, ADR 0024): búsqueda global por nombre sobre ENTIDADES
     * PÚBLICAS — empresas, sindicatos, equipos, colegios, fichas de consumo,
     * centros, territorios y artículos de la wiki. Doctrina de la propuesta de
     * accesos: la búsqueda NUNCA indexa contenido de gestión (censo, casos,
     * documentos…) — lo público se busca; lo interno se navega con relación y cargo.
     * Matching case- e acento-insensible (NFD); devuelve como máximo 10 resultados
     * {kind, icon, id, name, hint}.
     * ================================================================ */
    function searchEntities(locale, q) {
        const c = t(locale);
        const norm = (s) => {
            const low = String(s || '').toLowerCase();
            try { return low.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { return low; }
        };
        const needle = norm(q).trim();
        if (!needle) return [];
        const kinds = c.searchKinds || {};
        const out = [];
        const push = (kind, icon, id, name, hint) => {
            if (out.length >= 10 || !id || !name) return;
            if (norm(name).indexOf(needle) === -1) return;
            out.push({ kind, icon, id, name, hint: hint || kinds[kind] || '' });
        };
        (getWorkplaces(locale) || []).forEach((w) => push('workplace', '🏢', w.id, w.name, w.sector));
        (getUnions(locale) || []).forEach((u) => push('union', '🏛️', u.id, u.name, u.sector));
        (getHousingUnions(locale) || []).forEach((u) => push('housing', '🏠', u.id, u.name, u.region));
        (getProBodies(locale) || []).forEach((b) => push('profesionales', '🩺', b.id, b.name, b.type));
        (getAutonomoUnions(locale) || []).forEach((u) => push('autonomos', '🧰', u.id, u.name, u.sector));
        (getConsumerItems(locale) || []).forEach((it) => push('consumidores', '🛒', it.id, it.name, it.sector));
        (getStudyCenters(locale) || []).forEach((ct) => push('estudiantes', '🎓', ct.id, ct.name, ct.type));
        (getSubterritories(locale) || []).forEach((tr) => push('territory', '🏘️', tr.id, tr.name, tr.parentName));
        WIKI_KB_ARTICLES.forEach((id) => {
            const art = (c.wikiArticles || {})[id];
            if (art) push('wiki', '📖', id, art.title, kinds.wiki || '');
        });
        return out;
    }

    /* 20-07-2026: el onboarding de primera visita (idea 53, ADR 0024) se RETIRÓ del
       código por decisión de Edu — a la moratoria (ADR 0021) hasta la fase producto.
       El flag 'sindicapp-onboarded-v1' deja de leerse y escribirse; la idea 53 se
       re-evaluará entonces. */

    window.SINDICAPP_SINDICATO = {
        t,
        localeKey,
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
        crmToggleObjetivo,
        crmSendComm,
        crmAddEvent,
        crmAdvanceDocReview,
        crmGetTemplate,
        crmExportPayload,
        getCrmTabsForType,
        /* Propuesta (17-07-2026) */
        buildPropuestaNavHtml,
        /* 20-07-2026 (ADR 0025): acordeón de la nav — grupo al que pertenece un sub */
        navGroupForSub,
        buildPropuestaScreenHtml,
        buildPropuestaLockedHtml,
        buildEquipoCrmHtml,
        buildEquipoSectionNavHtml,
        getEquipoSectionsForType,
        getHousingUnions,
        defaultHousingUnionId,
        getAutonomoUnions,
        getAutonomoPlatforms,
        propuestaAdvanceTurn,
        propuestaMoveCase,
        propuestaCreatePatternSession,
        propuestaAddAttendance,
        propuestaOrderOfDayText,
        buildAsambleaLiveHtml,
        crmImportMembers,
        buildNotificationsHtml,
        getNotificationCount,
        propuestaConvertIntake,
        propuestaRoleAllows,
        /* Cargos (20-07-2026, ideas 42+43, ADR 0024) */
        DEMO_CARGOS,
        cargoAllows,
        cargoIsAny,
        cargoForCapability,
        buildCargoChipsHtml,
        buildCargoLockedHtml,
        /* 2ª generación de accesos (20-07 tarde, ideas 63-66, report v5) */
        cargoDisplayName,
        getTeamCargos,
        getAdhocCargos,
        crmCreateAdhocCargo,
        recordCargoTrail,
        propuestaToggleSessionLive,
        /* Búsqueda global (20-07-2026, idea 52) */
        searchEntities,
        /* Directorios con selector en sidebar (17-07-2026) */
        getProBodies,
        getConsumerItems,
        getStudyCenters,
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
