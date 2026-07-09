/* sindicapp/sindicapp-locale-es-content.js */
/**
 * España (es) locale pack for SindicApp — UI labels + Spanish content.
 * Ireland (ie) lives in sindicapp-locale-en-content.js; SindicApp.html registers shared core ids (talk, info, admin).
 */
(function () {
    const CP_MILITANT_ONLY_BANNER = '<p class="cp-militant-only-banner" role="status">Solo militantes (Nv 3+). Visitantes y participantes no ven este directorio en producción.</p>';

    function buildTalkNewsFeedHtml(articles) {
        const items = Object.entries(articles).map(([slug, article]) =>
            `<li class="cp-news-item">
                <a class="cp-news-link" href="#news:${slug}" data-news-article="${slug}">
                    <time datetime="${article.datetime}">${article.dateLabel}</time>
                    <strong>${article.title}</strong>
                    <p>${article.teaser}</p>
                </a>
            </li>`
        ).join('');
        return `<ul class="cp-news-feed">${items}</ul>`;
    }

    function buildTalkForumBoardHtml(threads) {
        const items = Object.entries(threads).map(([slug, thread]) => {
            const pinned = thread.pinned ? ' cp-forum-post--pinned' : '';
            return `<li><a class="cp-forum-post${pinned}" href="#forum:${slug}" data-forum-thread="${slug}">
                <span class="cp-forum-post-title">${thread.title}</span>
                <span class="cp-forum-post-meta">${thread.meta}</span>
            </a></li>`;
        }).join('');
        return `<ul class="cp-forum-board">${items}</ul>`;
    }

    const TALK_NEWS_ARTICLES = {
        'saffron-provisional-good': {
            datetime: '2026-05-26',
            dateLabel: '26 may 2026 · 09:14',
            title: 'La Célula Directora declara el amarillo «Bien provisional» hasta que la fotocopiadora se calme',
            teaser: 'Tras reimprimir el manifiesto entero con rotulador fluorescente, el PBI-MS votó 11–3 para tratar el amarillo como color oficial del optimismo.',
            body: `<p>La Célula Directora del <strong>Partido del Bien Intencionao y del Mal Sospechoso (PBI-MS)</strong> convocó sesión de urgencia tras salir 400 ejemplares del manifiesto de primavera en «amarillo agresivo» desde la fotocopiadora de la sede.</p>
                <p>La secretaria general Marina del Campo propuso reconocer el amarillo como <em>Bien provisional</em> hasta que el tóner vuelva a territorio moralmente neutro. Aprobado 11–3, con dos abstenciones y un voto «verde moralmente dudoso».</p>
                <p>Operaciones técnicas debe conseguir cartuchos que impriman «esperanza sin gritar». Comunicación actualizará el manual de imagen el viernes, o cuando la impresora acceda.</p>`
        },
        'coalition-sausage-rolls': {
            datetime: '2026-05-25',
            dateLabel: '25 may 2026 · 16:02',
            title: 'Cumbre de coalición: empate de bollería; la facción del Bien reclama victoria moral',
            teaser: 'Las negociaciones se atascaron cuando los rivales llegaron con croissants superiores.',
            body: `<p>Las conversaciones en un hotel de provincia entraron en la novena hora cuando delegados rivales aparecieron con bollería de una pastelería premiada. La facción del Bien calificó los croissants de «tácticamente superiores».</p>
                <p>El comunicado ofrece gobernar «si el Mal trae servilletas». El Mal respondió que la hospitalidad es «condición previa, no concesión». Sin acuerdo sobre paridad de bollería.</p>`
        },
        'leaflet-typo': {
            datetime: '2026-05-24',
            dateLabel: '24 may 2026 · 11:30',
            title: 'Errata en folleto municipal: «contra el Bien, a favor del Mal»',
            teaser: 'Se retiran 10.000 octavillas de tres pueblos. El partido culpa al autocorrector, al Mal y a un voluntario llamado Autocorrector.',
            body: `<p>Comunicación detectó el error tras un militante de campaña que reportó «claridad ideológica inesperada» en el titular.</p>
                <p>Texto aprobado: <em>«A favor del Bien, en contra del Mal — con matices.»</em> Texto impreso: <em>«Contra el Bien, a favor del Mal — sin dudas.»</em></p>
                <p>Retirada en curso en tres municipios. Culpables designados: autocorrector, el Mal y un voluntario que también se llama Autocorrector.</p>`
        },
        'coat-rack-consultative': {
            datetime: '2026-05-23',
            dateLabel: '23 may 2026 · 08:45',
            title: 'El perchero de la sede obtiene estatus consultivo por aclamación',
            teaser: 'La Habitación Encima de la Papelería reconoce al perchero como miembro observador con veto sobre borradores.',
            body: `<p>Por aclamación unánime, la sede — La Habitación Encima de la Papelería — otorgó al perchero principal <strong>estatus consultivo</strong> con veto sobre borradores colgados en sus ganchos.</p>
                <p>Primer triunfo político del trimestre. La facción del Mal exige ganchos equivalentes para bufandas de oposición.</p>`
        },
        'treasury-q2-ledger': {
            datetime: '2026-05-22',
            dateLabel: '22 may 2026 · 19:20',
            title: 'Tesorería publica el libro mayor del 2T; investigada la partida «tóner amarillo misterioso»',
            teaser: 'Los auditores piden explicación de 214,50 € en «tinta que solo imprime optimismo».',
            body: `<p>Tesorería publicó las cuentas del segundo trimestre. Los auditores señalaron la partida 520: 214,50 € por «tinta que solo imprime optimismo», vinculada al incidente del manifiesto amarillo.</p>
                <p>Finanzas promete transparencia después del café. Disputas vía <strong>Admin → Tesorería</strong>.</p>`
        },
        'staring-contest-chairs': {
            datetime: '2026-05-21',
            dateLabel: '21 may 2026 · 14:00',
            title: 'Concurso de miradas resuelve disputa por sillas plegables',
            teaser: 'La coordinación territorial retiene doce sillas tras tres horas de silencio.',
            body: `<p>Disputa territorial resuelta con el protocolo aprobado: concurso de miradas de tres horas. Acta: «parpadeo ideológico intenso y un estornudo».</p>`
        },
        'virtue-mugs-ploughing': {
            datetime: '2026-05-20',
            dateLabel: '20 may 2026 · 10:15',
            title: 'Agotadas las tazas de virtud; fondo de emergencia para galletas',
            teaser: 'Tazas «Voté al Bien (probablemente)» financian hospitalidad de coalición.',
            body: `<p>Agotadas las tazas de edición limitada. La facción del Mal exige tazas iguales y «galletas equitativas».</p>`
        },
        'forum-manifesto-colour': {
            datetime: '2026-05-19',
            dateLabel: '19 may 2026 · 07:50',
            title: 'Hilo del foro sobre color del manifiesto: 201 respuestas, cero acuerdo',
            teaser: 'Comunicación recomienda Pantone Esperanzado para el Bien y «lo que salga de la impresora» para lo demás.',
            body: `<p>El hilo superó 201 respuestas sin consenso. Comunicación recomienda Pantone Esperanzado y «lo que salga de la impresora» para el resto. Hilo completo en <strong>Comunicación → Foro</strong>.</p>`
        }
    };

    const TALK_FORUM_THREADS = {
        'faq-good-bad': {
            pinned: true,
            title: 'LEED PRIMERO: A favor del Bien, en contra del Mal — hilo FAQ',
            meta: 'Moderación · 142 respuestas · Último hace 2 h',
            author: 'Mesa de moderación',
            authorHandle: '@moderacion',
            op: `<p>Bienvenida/o. Este partido está <strong>a favor del Bien</strong> y <strong>en contra del Mal</strong>. La confusión es funcional.</p>
                <ul>
                    <li><strong>¿Qué es el Bien?</strong> — Lo que la Célula Directora no haya votado «Mal provisional».</li>
                    <li><strong>¿Qué es el Mal?</strong> — Lo que la otra facción trajo a la cumbre sin servilletas.</li>
                </ul>`,
            replies: [
                { author: 'Marina del Campo', handle: '@marina_del_campo', time: 'Hace 2 h', html: '<p>Pin renovado para el 2T. «Verde moralmente dudoso» no es alineación oficial.</p>' }
            ]
        },
        'rename-directorate': {
            title: 'Propuesta: renombrar «Célula Directora» por «Célula que Dirige, con Suerte»',
            meta: '@marina_del_campo · 38 respuestas · Hace 5 h',
            author: 'Marina del Campo',
            authorHandle: '@marina_del_campo',
            op: '<p>El nombre actual suena a cooperativa agraria. Propuesta: respeto, dirección y menos yogur.</p>',
            replies: [
                { author: 'Comunicación', handle: '@comunicacion', time: 'Hace 4 h', html: '<p>Siglas CDCS no caben en tazas.</p>' }
            ]
        },
        'folding-chairs': {
            title: 'Elecciones municipales — ¿quién trae las sillas plegables?',
            meta: 'Territorial · 67 respuestas · Ayer',
            author: 'Coordinación territorial',
            authorHandle: '@territorial',
            op: '<p>En la feria «prestamos» doce sillas. Hay que devolverlas antes del verano. Apúntate abajo.</p>',
            replies: []
        },
        'saffron-colour-debate': {
            title: '¿Es el amarillo un color moralmente aceptable para el manifiesto? (en serio)',
            meta: 'Comunicación · 201 respuestas · Ayer',
            author: 'Comunicación',
            authorHandle: '@comunicacion',
            op: '<p>Hilo serio. Necesitamos fallo antes de la reimpresión. Opciones: Pantone Esperanzado, verde apagado o «lo que salga».</p>',
            replies: [
                { author: 'Célula Directora', handle: '@celula', time: 'Ayer', html: '<p>Bien provisional hasta arreglar tóner. Ver noticia del 26 may.</p>' }
            ]
        },
        'alignment-scorecard': {
            title: 'CONFIDENCIAL: cuadro de mando Bien/Mal — borrador 2T',
            meta: 'Célula Directora · 24 respuestas · Hace 1 h',
            author: 'Célula Directora',
            authorHandle: '@celula',
            op: '<p>Solo militantes Nv 3+. No capturas. No tuits. No imprimir en amarillo.</p>',
            replies: []
        },
        'sausage-roll-leak': {
            title: 'Filtración: ¿quién contó a la facción de bollería nuestra postura?',
            meta: 'Seguridad · 56 respuestas · Ayer',
            author: 'Seguridad',
            authorHandle: '@seguridad',
            op: '<p>Nuestra postura de coalición llegó a círculos de bollería antes que los delegados. Investigando foro y cola de impresión.</p>',
            replies: []
        },
        'treasury-printer': {
            title: 'Hilo tesorería — expliquen la partida de la impresora amarilla',
            meta: 'Finanzas · 17 respuestas · Ayer',
            author: 'Tesorería',
            authorHandle: '@tesoreria',
            op: '<p>Los auditores quieren memo sobre 214,50 €. Borrador: «incidente de reimpresión; tóner retirado; amarillo = Bien provisional».</p>',
            replies: [
                { author: 'Técnico', handle: '@tecnico', time: 'Ayer', html: '<p>El tóner no fue retirado. Se unió al caucus del perchero.</p>' }
            ]
        },
        'tayto-crisps-column': {
            title: 'Columna invitada: por qué importan los croissants de coalición',
            meta: 'Mesa de coalición · 19 respuestas · Hace 2 días',
            author: 'Mesa de coalición',
            authorHandle: '@coalicion',
            op: '<p>La bollería en mesas de coalición correlaciona con participación. No es soborno: es «hospitalidad estructurada».</p>',
            replies: []
        },
        'emoji-intro': {
            title: 'Preséntate con 3 emojis o menos',
            meta: 'Rompehielos · 88 respuestas · Hace 3 días',
            author: 'Miscelánea',
            authorHandle: '@misc',
            op: '<p>Tres emojis máximo. Sin banderas tricolor. Ejemplo: 🗂️☕🪑.</p>',
            replies: []
        },
        'john-murphy-bug': {
            title: 'Bug: el foro muestra 3.000 usuarios «José García» conectados',
            meta: 'Técnico · 12 respuestas · Hace 4 días',
            author: 'Técnico',
            authorHandle: '@tecnico',
            op: '<p>Límite de demo del generador de nombres. Parche pendiente.</p>',
            replies: []
        },
        'bad-wins-leaders-questions': {
            title: 'Plan B si el Mal gana el próximo debate',
            meta: 'Estrategia · 43 respuestas · Hace 3 días',
            author: 'Estrategia',
            authorHandle: '@estrategia',
            op: '<p>Se piden planes si la facción del Mal gana el próximo turno de palabra. Incluir líneas de prensa y estrategia de café.</p>',
            replies: []
        }
    };

    const PARTY_TALK_NEWS_FEED_HTML = buildTalkNewsFeedHtml(TALK_NEWS_ARTICLES);
    const PARTY_TALK_FORUM_THREADS_HTML = buildTalkForumBoardHtml(TALK_FORUM_THREADS);

    const PARTY_TALK_SOCIAL_GRID_HTML = `
                            <div class="cp-social-grid">
                                <a class="cp-social-link cp-social-link--wa" href="https://chat.whatsapp.com/ExampleAbstractPartyGroup" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#25D366" role="img"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></span>
                                    <span class="cp-social-label">WhatsApp</span>
                                    <span class="cp-social-desc">Chat de militantes</span>
                                </a>
                                <a class="cp-social-link cp-social-link--tg" href="https://t.me/abstract_party_militants" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#229ED9" role="img"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></span>
                                    <span class="cp-social-label">Telegram</span>
                                    <span class="cp-social-desc">Estrategia y alertas</span>
                                </a>
                                <a class="cp-social-link cp-social-link--ig" href="https://instagram.com/abstractparty" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#E4405F" role="img"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></span>
                                    <span class="cp-social-label">Instagram</span>
                                    <span class="cp-social-desc">Cuenta pública</span>
                                </a>
                                <a class="cp-social-link cp-social-link--tk" href="https://tiktok.com/@abstractparty" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#000000" role="img"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 3.2.01 6.39.02 9.59.04 1.88-.47 3.77-1.44 5.26-1.09 1.67-2.86 2.86-4.83 3.22-2.06.38-4.21-.12-5.89-1.36-1.97-1.35-3.2-3.65-3.32-6.05-.1-1.6.28-3.2 1.07-4.55.96-1.66 2.49-2.85 4.25-3.27 1.55-.35 3.19-.15 4.6.57.01-2.39-.01-4.78.02-7.17z"/></svg></span>
                                    <span class="cp-social-label">TikTok</span>
                                    <span class="cp-social-desc">Cuenta pública</span>
                                </a>
                                <a class="cp-social-link cp-social-link--x" href="https://x.com/AbstractParty" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#000000" role="img"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></span>
                                    <span class="cp-social-label">X</span>
                                    <span class="cp-social-desc">Cuenta pública</span>
                                </a>
                                <a class="cp-social-link cp-social-link--yt" href="https://youtube.com/@AbstractParty" target="_blank" rel="noopener noreferrer">
                                    <span class="cp-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#FF0000" role="img"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></span>
                                    <span class="cp-social-label">YouTube</span>
                                    <span class="cp-social-desc">Charlas y directos</span>
                                </a>
                            </div>
                            <p class="template-muted" style="margin-top:12px;">Enlaces de demostración — sustituir antes de producción.</p>`;

    function buildTalkSplitSectionHtml(title, sectionId, introHtml, mapBodyHtml) {
        return `<h5>${title}</h5>
                    <div class="cp-section-intro">${introHtml}</div>
                    <div class="cp-map-body" data-map-body="${sectionId}" hidden aria-hidden="true">${mapBodyHtml}</div>`;
    }

    function buildPartyTalkSeedHtml() {
        return {
            news: buildTalkSplitSectionHtml(
                'Noticias',
                'news',
                '<p>Agencia oficial del partido — crónicas del <strong>Partido del Bien Intencionao y del Mal Sospechoso (PBI-MS)</strong>. Los titulares se leen en el panel de fondo.</p>',
                PARTY_TALK_NEWS_FEED_HTML
            ),
            forum: buildTalkSplitSectionHtml(
                'Foro',
                'forum',
                '<p>Un solo tablón: militantes, visitantes, hilos públicos y filas «ultrasecretas» en la misma lista (demo). Elige hilo en el panel de fondo.</p>',
                PARTY_TALK_FORUM_THREADS_HTML
            ),
            'social-media': buildTalkSplitSectionHtml(
                'Redes sociales',
                'social-media',
                '<p>Canales oficiales — chats de militantes y cuentas públicas. Abre un enlace desde el panel de fondo.</p>',
                PARTY_TALK_SOCIAL_GRID_HTML
            )
        };
    }

    function buildStructureTeamHtml(title, blurb, bullets) {
        const items = bullets.map((b) => `<li>${b}</li>`).join('');
        return `<h5>${title}</h5>
                    ${CP_MILITANT_ONLY_BANNER}
                    <p class="template-muted">${blurb}</p>
                    <ul class="cp-wiki-pages" style="margin-top:10px;">${items}</ul>`;
    }

    function buildPartyStructureHtml(opts) {
        const municipalityLabel = opts && opts.municipalityLabel;
        const localSedes = (opts && opts.localSedes) || '<li>Barcelona — sede de grupo local (demo)</li><li>Girona — sede de grupo local (demo)</li><li>Lleida — sede de grupo local (demo)</li>';
        const candidacyPointer = municipalityLabel
            ? `<p class="template-muted" style="margin-top:10px;">Candidaturas de congreso y municipales: abre <strong>Partido → Candidatura</strong> (lista nacional más candidatura de <strong>${municipalityLabel}</strong>).</p>`
            : '<p class="template-muted" style="margin-top:10px;">Listas electorales (congreso y municipales): abre <strong>Partido → Candidatura</strong>.</p>';
        return `<h5>Estructura del partido</h5>
                    ${CP_MILITANT_ONLY_BANNER}
                    <p class="template-muted">Organigrama funcional del PBI-MS — cargos, coordinaciones y enlace con el congreso (demo).</p>
                    <ul class="cp-party-structure-tree">
                        <li><strong>Dirección Orgánica</strong><span>Coordinación ejecutiva; revisiones de alineación Bien/Mal</span>
                            <ul>
                                <li>Secretaria general — Marina del Campo</li>
                                <li>Mesa de coalición — Iker Montenegro</li>
                                <li>Enlace congreso — Helena Votes</li>
                                <li>Operaciones técnicas — Pau Infrastructure</li>
                                <li>Prensa y relato — Lúcia Comms</li>
                                <li>Custodio del libro público — Omar Treasury</li>
                            </ul>
                        </li>
                        <li><strong>Dirección General</strong><span>Coordinaciones temáticas, núcleos municipales, enlace congreso</span>
                            <ul>
                                <li>Coordinaciones temáticas (8) — mín. 5 % de puntuación partidaria por bloque</li>
                                <li>Intelectual · Espiritual · Cultural · Profesional</li>
                                <li>Territorial · Sindical · Miscelánea · Bollería de coalición</li>
                                ${localSedes}
                                <li>Oficina de enlace congreso — delegados (Nv 5), coordinadores (Nv 6)</li>
                            </ul>
                        </li>
                    </ul>
                    ${candidacyPointer}`;
    }

    const PARTY_CONGRESS_CANDIDATES = {
        organic: [
            { pos: 1, name: 'Marina del Campo', seat: 'Cabeza de lista nacional', note: 'Secretaria general · promete reforma del tóner antes del postre de coalición' },
            { pos: 2, name: 'Helena Votes', seat: 'Enlace congreso', note: 'Mantiene los concursos de miradas dentro del reglamento' },
            { pos: 3, name: 'Iker Montenegro', seat: 'Mesa de coalición', note: 'Autorizado a cambiar cláusulas del manifiesto por croissants (máx. 2)' },
            { pos: 4, name: 'Lúcia Comms', seat: 'Prensa y relato', note: 'Declaró el «Bien provisional» amarillo en todos los comunicados' },
            { pos: 5, name: 'Pau Infrastructure', seat: 'Papeletas y CRM', note: 'Cuarentena de los 3.000 José García antes del escrutinio' },
            { pos: 6, name: 'Omar Treasury', seat: 'Libro público', note: 'Publica todo gasto salvo la línea del tóner amarillo' },
            { pos: 7, name: 'Clara Domènech', seat: 'Enlace puntos de honor', note: 'Explica por qué el 50 % sigue siendo una carta de amor en matemáticas de cáucus' },
            { pos: 8, name: 'Elena Morales', seat: 'Organización militantil', note: 'Pipeline de delegados de calle · avalaciones Nv 4' }
        ],
        general: [
            { pos: 9, name: 'Prof. Sebastian Optimum', seat: 'Coordinación intelectual', note: 'Tecno-aristocracia neo · modela el Bien en hojas de cálculo' },
            { pos: 10, name: 'Gaia-7 Sterling', seat: 'Bloque espiritual/eco', note: 'Eco-aceleracionismo cósmico · fotosíntesis urgente' },
            { pos: 11, name: 'Comrade Moss FastForward', seat: 'Aceleración cultural', note: 'Misma facción · subcomité de crecimiento' },
            { pos: 12, name: 'Duque Bluetooth de Castilla', seat: 'Gremios digitales', note: 'Sindicalismo digital retro-feudal · juramento Bluetooth' },
            { pos: 13, name: 'Maestrogremio Slack O\'Brien', seat: 'Cooperativas de plataforma', note: 'Plaza sindical · permisos feudales en Slack' },
            { pos: 14, name: 'Alcalde-En-Espera Bruno Barrio', seat: 'Populismo territorial', note: 'Hiperlocal soberanista · doctrina de la silla plegable' },
            { pos: 15, name: 'Carmen La Vecina Eterna', seat: 'Asambleas vecinales', note: 'Misma facción · estatus de vecina eterna' },
            { pos: 16, name: 'Condesa Aldric van Metrics', seat: 'Miscelánea / KPI', note: 'Anota asistencia al congreso con pluma y tinta' },
            { pos: 17, name: 'Lady Cordelia Benchmark', seat: 'Bollería de coalición', note: 'Índice de superioridad croissant de rivales' },
            { pos: 18, name: 'Dr. Helix Permaculture', seat: 'Reserva soberanía alimentaria', note: 'Eco cósmico · suplente si Gaia-7 llega tarde a fotosíntesis' },
            { pos: 19, name: '«Riot» Paloma Desorden', seat: 'Cuota invitada antisistema', note: 'Frente Revolucionario · nota al pie 47 (no vinculante)' },
            { pos: 20, name: 'La Hermana del Vacío (Patricia M.)', seat: 'Reserva de manifiesto', note: 'Antisistema espiritual · define términos que rechazamos en otros sitios' }
        ]
    };

    function renderCongressCandidateRows(rows) {
        return rows.map((c) => `<tr>
                        <td>${c.pos}</td>
                        <td><strong>${c.name}</strong></td>
                        <td>${c.seat}</td>
                        <td class="cp-candidacy-note">${c.note}</td>
                    </tr>`).join('');
    }

    function buildPartyCandidacyHtml(opts = {}) {
        let scope = opts.scope;
        if (!scope) scope = opts.municipalityLabel ? 'municipales' : 'congreso';
        const territoryLabel = opts.territoryLabel || opts.municipalityLabel || '';

        if (scope === 'municipales') {
            if (!territoryLabel) {
                return `<h5>Municipales</h5>
                    ${CP_MILITANT_ONLY_BANNER}
                    <p class="template-muted">Elige un municipio en la barra lateral para ver su lista abierta (Nv 7).</p>`;
            }
            return `<h5>Municipales — ${territoryLabel}</h5>
                        ${CP_MILITANT_ONLY_BANNER}
                        <p class="cp-candidacy-meta"><strong>${territoryLabel}</strong> — lista municipal abierta (Nv 7). Misma repartición <strong>50 %</strong> Dirección Orgánica / <strong>50 %</strong> Dirección General que el Congreso de los Diputados.</p>
                        <div class="cp-party-structure-candidacy-split">
                            <div>
                                <strong>Mitad orgánica (municipal)</strong>
                                <ul>
                                    <li>Marina del Campo — coordinadora de lista (provisional)</li>
                                    <li>Bruno Barrio — referente territorial (si ${territoryLabel} admite sillas)</li>
                                    <li>Plaza libre — plebiscito pendiente</li>
                                </ul>
                            </div>
                            <div>
                                <strong>Mitad general (municipal)</strong>
                                <ul>
                                    <li>Carmen La Vecina Eterna — asambleas vecinales</li>
                                    <li>Lord Pemberton KPI — métricas municipales</li>
                                    <li>Plaza libre — plebiscito pendiente</li>
                                </ul>
                            </div>
                        </div>
                        <p class="template-muted" style="margin-top:12px;">Lista estatal: pestaña <strong>Congreso de los Diputados</strong> en <strong>Partido → Candidatura</strong>.</p>`;
        }

        if (scope === 'ccaa') {
            if (!territoryLabel) {
                return `<h5>Comunidad Autónoma</h5>
                    ${CP_MILITANT_ONLY_BANNER}
                    <p class="template-muted">Elige una comunidad autónoma en la barra lateral para ver su lista autonómica (demo).</p>`;
            }
            return `<h5>Comunidad Autónoma — ${territoryLabel}</h5>
                    ${CP_MILITANT_ONLY_BANNER}
                    <p class="cp-candidacy-meta">Lista autonómica del <strong>PBI-MS</strong> para <strong>${territoryLabel}</strong> (demo). Misma regla <strong>50 % / 50 %</strong> que el Congreso; plazas al Parlamento autonómico y refuerzos para el congreso nacional.</p>
                    <div class="cp-party-structure-candidacy-split">
                        <div>
                            <strong>Mitad orgánica (autonómica)</strong>
                            <ul>
                                <li>Delegado/a autonómico/a — coordinación de sedes en ${territoryLabel}</li>
                                <li>Enlace congreso autonómico — plebiscito Nv 6</li>
                                <li>Plaza libre — cumbre de bollería pendiente</li>
                            </ul>
                        </div>
                        <div>
                            <strong>Mitad general (autonómica)</strong>
                            <ul>
                                <li>Coordinación temática — coaliciones interterritoriales</li>
                                <li>Métricas de asistencia al parlamento autonómico</li>
                                <li>Plaza libre — veto del consejo posible</li>
                            </ul>
                        </div>
                    </div>
                    <p class="template-muted" style="margin-top:12px;">Lista nacional completa: pestaña <strong>Congreso de los Diputados</strong>.</p>`;
        }

        const organicRows = renderCongressCandidateRows(PARTY_CONGRESS_CANDIDATES.organic);
        const generalRows = renderCongressCandidateRows(PARTY_CONGRESS_CANDIDATES.general);
        return `<h5>Congreso de los Diputados</h5>
                    ${CP_MILITANT_ONLY_BANNER}
                    <p class="cp-candidacy-meta">Lista oficial del <strong>PBI-MS</strong> para el <strong>Congreso de los Diputados</strong> (demo). Bloqueada al <strong>50 % Dirección Orgánica</strong> y <strong>50 % Dirección General</strong>; el consejo de coordinación puede vetar filas tras la cumbre de bollería.</p>
                    <p class="template-muted">Estado: redacción del plebiscito aprobada · reparto de plazas 3T · 12.000 militantes pueden confirmar orden (Nv 7).</p>
                    <p class="cp-candidacy-bloc-title">Dirección Orgánica — 50 % de la lista (puestos 1–8)</p>
                    <table class="cp-contact-table cp-candidacy-congress-list">
                        <thead><tr><th>#</th><th>Candidato/a</th><th>Plaza / cargo</th><th>Notas</th></tr></thead>
                        <tbody>${organicRows}</tbody>
                    </table>
                    <p class="cp-candidacy-bloc-title">Dirección General — 50 % de la lista (puestos 9–20)</p>
                    <table class="cp-contact-table cp-candidacy-congress-list">
                        <thead><tr><th>#</th><th>Candidato/a</th><th>Plaza / bloque</th><th>Notas</th></tr></thead>
                        <tbody>${generalRows}</tbody>
                    </table>
                    <p class="template-muted" style="margin-top:14px;">Banquillo de reserva: Serf Liberation Zhang, Abbess Blockchain, Doña Pilar del Territorio, Gideon Unmanager — se activan si algún delegado pasa al Mal después del postre.</p>
                    <p class="template-muted">Listas autonómicas y municipales: pestañas <strong>Comunidad Autónoma</strong> y <strong>Municipales</strong> en <strong>Partido → Candidatura</strong>.</p>`;
    }

    const CP_REAL_CONTENT_BANNER = '<p class="cp-real-content-banner" role="status">Norma oficial de Plataforma 21 — no es lore de demostración.</p>';

    const PLATFORM_RANK_LADDER = {
        title: 'Escalafón de la plataforma',
        html: `<!-- locale:es -->
                        ${CP_REAL_CONTENT_BANNER}
                        <p>Cada usuario tiene un <strong>voto divisible</strong> para repartir entre personas. Algunos rangos dependen de <strong>Puntos de Honor recibidos</strong> por votos sociales (solo enteros; los parciales cuentan en el total pero pueden ocultarse).</p>
                        <ul class="cp-opciones-list">
                            <li><strong>1 — Visitante</strong> Navega zonas públicas con participación limitada.</li>
                            <li><strong>2 — Usuario</strong> Cuenta registrada con acceso estándar a la plataforma.</li>
                            <li><strong>3 — Militante</strong> Pagas cuota de afiliación; plenos derechos de participación en partido y colectivos que integras.</li>
                            <li><strong>4 — Representante</strong> Al menos <strong>1 Punto de Honor</strong> recibido por votos sociales.</li>
                            <li><strong>5 — Profesional</strong> Ocupas un cargo en la estructura del partido o de un colectivo.</li>
                            <li><strong>6 — Candidato/a</strong> Figuras en la lista electoral del partido.</li>
                        </ul>
                        <p class="template-muted">El estatus de representante puede alcanzarse con un solo entero si bastantes votantes te asignan un punto completo; la mayoría reparte el voto, así que subir en el escalafón suele exigir apoyo más amplio.</p>`
    };

    function buildPlatformRankLadderSeedHtml() {
        const rank = PLATFORM_RANK_LADDER;
        return `<h5>${rank.title}</h5>${rank.html}`;
    }

    const PARTY_TEAM_SUBMODULES = {
        talk: {
            id: 'talk',
            header: 'Comunicación',
            sections: [
                { id: 'news', label: 'Noticias' },
                { id: 'forum', label: 'Foro' },
                { id: 'social-media', label: 'Redes sociales' }
            ],
            seedHtml: buildPartyTalkSeedHtml()
        },
        info: {
            id: 'info',
            header: 'Info',
            sections: [
                {
                    id: 'structure',
                    label: 'Estructura',
                    children: [
                        { id: 'party-structure', label: 'Estructura del partido' },
                        { id: 'contact-list', label: 'Lista de contactos' },
                        { id: 'individual-scoreboard', label: 'Marcador individual' },
                        {
                            id: 'structure-teams',
                            label: 'Equipos',
                            children: [
                                { id: 'team-ideology', label: 'Ideología' },
                                { id: 'team-it', label: 'Informática' },
                                { id: 'team-legal', label: 'Legal' },
                                { id: 'team-administration', label: 'Administración' },
                                { id: 'team-accounting', label: 'Contabilidad' },
                                { id: 'team-communication', label: 'Comunicación' },
                                { id: 'team-campaigning', label: 'Campaña' },
                                { id: 'team-policy', label: 'Política' },
                                { id: 'team-events', label: 'Eventos' }
                            ]
                        }
                    ]
                },
                {
                    id: 'money',
                    label: 'Dinero',
                    children: [
                        { id: 'financial-statement', label: 'Balance' },
                        { id: 'journal', label: 'Diario' },
                        { id: 'income-expenditure', label: 'Ingresos y gastos' }
                    ]
                },
                {
                    id: 'goals',
                    label: 'Objetivos',
                    children: [
                        { id: 'issues', label: 'Incidencias' },
                        { id: 'objective-tree', label: 'Árbol de objetivos' }
                    ]
                },
                {
                    id: 'wiki',
                    label: 'Wiki',
                    children: [
                        { id: 'wiki-index', label: 'Índice' },
                        {
                            id: 'rules',
                            label: 'Normas',
                            children: [
                                { id: 'platform-rank-ladder', label: 'Escalafón de la plataforma' },
                                { id: 'rules-statutes', label: 'Estatutos' }
                            ]
                        }
                    ]
                }
            ],
            seedHtml: {
                'rules-statutes': `<h5>Estatutos</h5>
                            <p class="template-muted">Estatutos satíricos del partido (lore demo). Niveles de acceso oficiales: <strong>Wiki → Normas → Escalafón de la plataforma</strong>.</p>
                            <div class="cp-statutes-wrap">
                                <div class="cp-statutes-bg" aria-label="Estatutos de muestra">
                                    <h6>Título I — Denominación y objeto</h6>
                                    <p>El <strong>Partido del Bien Intencionao y del Mal Sospechoso (PBI-MS)</strong> tiene por objeto estar <strong>a favor del Bien</strong> y <strong>en contra del Mal</strong>, sin perjuicio de que una asamblea futura redefina cuál es cuál.</p>
                                    <h6>Título II — Afiliación</h6>
                                    <p>Podrá afiliarse quien esté de acuerdo con el artículo I. Quien no esté de acuerdo también, siempre que registre su desacuerdo por triplicado ante fedatario. Los miembros honoríficos no son obligatorios pero se recomiendan para el plano de mesas del banquete.</p>
                                    <h6>Título III — Democracia interna</h6>
                                    <p>Las decisiones se tomarán por mayoría, unanimidad, aclamación o el método que genere menos expedientes. La Célula Directora podrá declarar «emergencia de consenso» y decidir mediante concurso de miradas.</p>
                                    <h6>Título IV — Financiación</h6>
                                    <p>Los fondos serán transparentes, circulares y preferiblemente en unidades de crédito moral. Todo gasto debe servir al Bien o, en excepciones documentadas, al Mal estratégicamente necesario.</p>
                                    <h6>Título V — Disolución</h6>
                                    <p>En caso de disolución, el remanente pasará al bien común, al Mal (para destrucción segura) o al armario de material de oficina, por ese orden de preferencia.</p>
                                    <p><em>Certificado abstractamente en el Congreso Provisional de Ubicación Indeterminada, revisión 0.Ω.</em></p>
                                </div>
                            </div>`,
                'platform-rank-ladder': buildPlatformRankLadderSeedHtml(),
                'wiki-index': null,
                issues: `<h5>Incidencias</h5>
                            <p class="template-muted">Repositorio de operaciones estratégicas — incidencias políticas y técnicas (panel estilo GitHub).</p>
                            <div class="cp-repo-bar">pbi-ms / operaciones-estrategicas</div>
                            <div class="cp-issues-toolbar">
                                <span>Abiertas: 5</span>
                                <span>Cerradas: 12</span>
                                <span>Etiquetas: política · técnica · coalición · comunicación</span>
                            </div>
                            <ul class="cp-issues-list">
                                <li class="cp-issue open">
                                    <span class="cp-issue-state">ABIERTA</span>
                                    <div><strong>#47</strong> Conversaciones de alianza municipal atascadas: el rival trajo croissants superiores <div class="cp-issue-meta">@mesa-coalicion · política</div></div>
                                    <span class="cp-issue-tag">política</span>
                                </li>
                                <li class="cp-issue open">
                                    <span class="cp-issue-state">ABIERTA</span>
                                    <div><strong>#46</strong> La impresora de sede solo saca amarillo — manifiestos ilegibles sobre papel crema <div class="cp-issue-meta">@operaciones · técnica</div></div>
                                    <span class="cp-issue-tag">técnica</span>
                                </li>
                                <li class="cp-issue open">
                                    <span class="cp-issue-state">ABIERTA</span>
                                    <div><strong>#44</strong> ¿«Contra el Mal» incluye auditorías morales retroactivas? <div class="cp-issue-meta">@celula-etica · política</div></div>
                                    <span class="cp-issue-tag">política</span>
                                </li>
                                <li class="cp-issue open">
                                    <span class="cp-issue-state">ABIERTA</span>
                                    <div><strong>#41</strong> El CRM duplica 3.000 militantes llamados «José García» <div class="cp-issue-meta">@datos · técnica</div></div>
                                    <span class="cp-issue-tag">técnica</span>
                                </li>
                                <li class="cp-issue closed">
                                    <span class="cp-issue-state">CERRADA</span>
                                    <div><strong>#38</strong> Orientación del logo cuando el partido está moralmente al revés <div class="cp-issue-meta">cerrada por @imagen · comunicación</div></div>
                                    <span class="cp-issue-tag">comunicación</span>
                                </li>
                            </ul>`,
                'objective-tree': `<h5>Árbol de objetivos</h5>
                            <p class="template-muted">Grafo de objetivos estratégicos — electoral, organizativo y reputacional.</p>
                            <div class="cp-objective-tree">
                                <ul>
                                    <li><span class="cp-tree-node cp-tree-node--root">Horizonte estratégico 2026–2029</span>
                                        <ul>
                                            <li><span class="cp-tree-node">Huella electoral</span>
                                                <ul>
                                                    <li><span class="cp-tree-node">Alcanzar 12.000 participantes registrados</span></li>
                                                    <li><span class="cp-tree-node">Ganar 3 ayuntamientos (&lt;50.000 hab.)</span></li>
                                                    <li><span class="cp-tree-node">Completar lista al congreso (50 % por dirección)</span></li>
                                                </ul>
                                            </li>
                                            <li><span class="cp-tree-node">Capacidad organizativa</span>
                                                <ul>
                                                    <li><span class="cp-tree-node">Abrir 15 sedes locales operativas</span></li>
                                                    <li><span class="cp-tree-node">Formar 200 delegados de calle (pipeline Nv 4)</span></li>
                                                    <li><span class="cp-tree-node cp-tree-node--done">Lanzar intranet v2 (completado)</span></li>
                                                </ul>
                                            </li>
                                            <li><span class="cp-tree-node">Coalición y congreso</span>
                                                <ul>
                                                    <li><span class="cp-tree-node">Asegurar 5 % de puntuación en 2 coordinaciones temáticas</span></li>
                                                    <li><span class="cp-tree-node">Firmar 1 pacto preelectoral sin traicionar el artículo I</span></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>`,
                'party-structure': buildPartyStructureHtml(),
                'candidacy': buildPartyCandidacyHtml(),
                'team-ideology': buildStructureTeamHtml(
                    'Ideología',
                    'Doctrina, relato y posicionamiento de coalición — el PBI-MS al estilo T.I.A. de barrio.',
                    [
                        '<strong>Alineación Bien/Mal</strong> — revisiones estatutarias y debates de color del manifiesto',
                        '<strong>Narrativa de coalición</strong> — diplomacia de bollería, pactos preelectorales y líneas de prensa',
                        '<strong>Mensajes de congreso</strong> — puntos de coordinaciones temáticas',
                        '<strong>Informes de la Célula</strong> — declaraciones semanales de «Bien provisional» (véase incidente de la impresora amarilla)'
                    ]
                ),
                'team-it': buildStructureTeamHtml(
                    'Informática',
                    'Intranet, CRM y la maquinaria que distingue a 3.000 José García.',
                    [
                        '<strong>Intranet v2</strong> — registro de militantes (Nv 3+) y anulaciones de colectivos',
                        '<strong>CRM / datos</strong> — cuarentena de homónimos, sincronización de puntos de honor',
                        '<strong>Mesa de operaciones</strong> — impresora de sede (modo solo amarillo), usuarios fantasma del foro',
                        '<strong>Enlace plataforma</strong> — integraciones reserva IDIN (línea del 30 % del libro)'
                    ]
                ),
                'team-legal': buildStructureTeamHtml(
                    'Legal',
                    'Estatutos, cumplimiento y auditorías morales retroactivas.',
                    [
                        '<strong>Estatutos</strong> — mantenimiento títulos I–V y registro de desacuerdos por triplicado',
                        '<strong>Cumplimiento electoral</strong> — listas, redacción de plebiscitos, presentaciones municipales',
                        '<strong>Acuerdos de coalición</strong> — validez de servilletas y cláusulas de bollería',
                        '<strong>Retraso ético</strong> — incidencia #44: si «contra el Mal» es retroactivo'
                    ]
                ),
                'team-administration': buildStructureTeamHtml(
                    'Administración',
                    'Sede, sedes locales, tesorería y logística de sillas plegables.',
                    [
                        '<strong>Sede</strong> — Habitación Encima de la Papelería; perchero con estatus consultivo',
                        '<strong>Sedes municipales</strong> — tres núcleos demo; protocolos de custodia de sillas',
                        '<strong>Enlace tesorería</strong> — custodio del libro público; ingresos de tazas de virtud',
                        '<strong>Logística congreso</strong> — viajes de delegados, mesas del banquete, galletas de emergencia'
                    ]
                ),
                'team-accounting': buildStructureTeamHtml(
                    'Contabilidad',
                    'Libro público, asientos y la misteriosa partida de tóner amarillo.',
                    [
                        '<strong>Balance</strong> — situación 2T y posición neta (demo 27.297,70 €)',
                        '<strong>Diario</strong> — libro diario; saldo de apertura hasta donación J-2408',
                        '<strong>Ingresos y gastos</strong> — cuotas militantes, transferencias de colectivos, tazas',
                        '<strong>Auditorías</strong> — conciliar caja con hash <code>0xBIEN-MAL-27a3f9</code>'
                    ]
                ),
                'team-communication': buildStructureTeamHtml(
                    'Comunicación',
                    'Prensa, redes y colores de manifiesto que la impresora sí renderiza.',
                    [
                        '<strong>Prensa y relato</strong> — Lúcia Comms; comunicados «Bien provisional» amarillos',
                        '<strong>Redes sociales</strong> — WhatsApp militantes, Telegram, IG/TikTok/X/YouTube',
                        '<strong>Foro y agencia</strong> — hilos del tablón y crónicas satíricas oficiales',
                        '<strong>Imagen</strong> — Pantone Esperanzado; logo boca abajo moralmente'
                    ]
                ),
                'team-campaigning': buildStructureTeamHtml(
                    'Campaña',
                    'Listas municipales, reparto de octavillas y logística electoral con sillas.',
                    [
                        '<strong>Candidaturas municipales</strong> — tres listas abiertas; plebiscitos pendientes',
                        '<strong>Listas autonómicas y congreso</strong> — reparto 50 % Orgánica / 50 % General',
                        '<strong>Campo</strong> — puerta a puerta, custodia de sillas, desempates a miradas',
                        '<strong>Material</strong> — retirada de folletos «contra el Bien, a favor del Mal»'
                    ]
                ),
                'team-policy': buildStructureTeamHtml(
                    'Política',
                    'Repositorio de incidencias, árbol de objetivos y estatutos que rechazan definir términos clave.',
                    [
                        '<strong>Incidencias estratégicas</strong> — backlog político y técnico (#47 bollería, #46 impresora)',
                        '<strong>Árbol de objetivos</strong> — 12k participantes, 3 ayuntamientos, lista al congreso',
                        '<strong>Corpus normativo</strong> — objeto Bien/Mal, registro de desacuerdos por triplicado',
                        '<strong>Enlace wiki</strong> — matriz de coalición, manual de crisis, glosario de rechazo'
                    ]
                ),
                'team-events': buildStructureTeamHtml(
                    'Eventos',
                    'Cumbres de coalición, asambleas y catering que gana o pierde alianzas.',
                    [
                        '<strong>Cumbres</strong> — protocolo de empate de bollería; acuerdos en servilleta',
                        '<strong>Asambleas</strong> — emergencias de consenso; concursos de miradas',
                        '<strong>Actos municipales</strong> — despliegue de sillas plegables; merchandising de virtud',
                        '<strong>Social de congreso</strong> — plano de mesas; reserva de galletas de emergencia'
                    ]
                ),
                'financial-statement': `<h5>Balance</h5>
                            <p class="template-muted">Balance de situación — 2T 2026, resumen público.</p>
                            <div class="cp-fin-summary">
                                <div class="cp-fin-summary-card"><span>Total activo</span><strong>31.840,00 €</strong></div>
                                <div class="cp-fin-summary-card"><span>Total pasivo</span><strong>4.542,30 €</strong></div>
                                <div class="cp-fin-summary-card"><span>Posición neta</span><strong>27.297,70 €</strong></div>
                                <div class="cp-fin-summary-card"><span>Caja y equivalentes</span><strong>22.120,00 €</strong></div>
                            </div>
                            <p class="cp-ledger-foot">Nota auditor (demo): cifras concilian con cierre del Diario · Último cierre 22-05-2026.</p>`,
                journal: `<h5>Diario</h5>
                            <p class="template-muted">Libro diario — movimientos cronológicos, libro público.</p>
                            <table class="cp-ledger-table">
                                <thead><tr><th>Fecha</th><th>Asiento</th><th>Cuenta</th><th>Debe</th><th>Haber</th><th>Nota</th></tr></thead>
                                <tbody>
                                    <tr><td>2026-05-05</td><td>J-2403</td><td>510 Alquiler sede</td><td class="cp-ledger-in">—</td><td class="cp-ledger-out">890,00 €</td><td>Habitación Encima de la Papelería</td></tr>
                                    <tr><td>2026-05-08</td><td>J-2404</td><td>520 Impresión</td><td class="cp-ledger-in">—</td><td class="cp-ledger-out">214,50 €</td><td>Incidente manifiesto solo amarillo</td></tr>
                                    <tr><td>2026-05-18</td><td>J-2407</td><td>540 Eventos</td><td class="cp-ledger-in">—</td><td class="cp-ledger-out">467,80 €</td><td>Catering cumbre de coalición (mesas del banquete)</td></tr>
                                </tbody>
                            </table>
                            <p class="cp-ledger-foot">Hash del libro (demo): <code>0xBIEN-MAL-27a3f9</code> · Disputas vía Admin → Tesorería.</p>`,
                'income-expenditure': `<h5>Ingresos y gastos</h5>
                            <p class="template-muted">Cuenta de ingresos y gastos — 2T 2026 hasta la fecha (demo).</p>
                            <p class="cp-ledger-foot" style="margin-top:14px;">Superávit (demo): <strong>8.468,70 €</strong>.</p>`
            }
        },
        admin: {
            id: 'admin',
            defaultHtml: `<h4 class="template-section-title">Admin</h4>
                        <p class="template-muted">Administración del partido — cada colectivo de la lista la refleja salvo que guarde su propia versión.</p>
                        <div class="party-admin-sections">
                            <section class="party-admin-block">
                                <h5>Afiliación y cargos</h5>
                                <p>Registro de militantes (Nv 3), plebiscitos de representantes (Nv 4), disciplina de delegados en congreso (Nv 5).</p>
                                <ul>
                                    <li>Cobro de cuotas y seguimiento del compromiso fiduciario</li>
                                    <li>Reglas de acceso a intranet por colectivo votado</li>
                                </ul>
                            </section>
                            <section class="party-admin-block">
                                <h5>Votos y puntuaciones</h5>
                                <p>Totales de voto social por colectivo, reparto de afiliación partidaria, ponderación en congreso.</p>
                            </section>
                            <section class="party-admin-block">
                                <h5>Candidaturas 21</h5>
                                <p>Lotes de plazas de congreso y municipales — 50 % Dirección Orgánica / 50 % Dirección General por lista. Vetos del consejo de coordinación (ensayo).</p>
                            </section>
                            <section class="party-admin-block">
                                <h5>Moderación y cumplimiento</h5>
                                <p>Moderación reservada IDIN por conducta ilegal o incumplimiento de términos (wiki IDIN).</p>
                            </section>
                        </div>`
        }
    };

    const COLLECTIVE_LABELS_ES = {
        'miscellaneous-team-1': 'Cajón de Llaves Sin Etiquetar',
        'miscellaneous-team-2': 'Coalición de Transeúntes Levemente Preocupados',
        'miscellaneous-team-3': 'Instituto del Papeleo Opcional',
        'intellectual-team-1': 'Seminario Que No Acaba Nunca',
        'intellectual-team-2': 'Revisores Anónimos Entre Pares',
        'intellectual-team-3': 'Sociedad de Preservación de Notas a Pie',
        'spiritual-team-1': 'Templo de Seguridad de Velas Ambientales',
        'spiritual-team-2': 'Orden del Halo Vacilante',
        'spiritual-team-3': 'Comité Solo Vibraciones Cósmicas',
        'cultural-team-1': 'Museo de Paraguas Perdidos',
        'cultural-team-2': 'Respuesta de Emergencia al Baile Folk',
        'cultural-team-3': 'Subcomité de Snacks de Vanguardia',
        'professional-team-1': 'Gremio de Pensadores Certificados',
        'professional-team-2': 'Oficina del Café Estratégico',
        'professional-team-3': 'Sindicato de Expertos Reacios',
        'territorial-team-1': 'Vecinos Sin Fronteras (Capítulo Muy Local)',
        'territorial-team-2': 'Cartografía de Sentimientos S. L.',
        'territorial-team-3': 'Municipio de Obras Perpetuas',
        'syndical-team-1': 'Sindicato de Cosas Que Piten de Noche',
        'syndical-team-2': 'Comité de Huelga por Mejores Salas de Descanso',
        'syndical-team-3': 'Solidaridad con la Hora del Bocadillo'
    };

    const MILITANT_CONTACT_ROLE_ES = {
        'General Secretary': 'Secretaria general',
        'Coalition Desk': 'Mesa de coalición',
        'Congress Liaison': 'Enlace congreso',
        'Technical Ops': 'Operaciones técnicas',
        'Press & Narrative': 'Prensa y relato',
        'Public Ledger Custodian': 'Custodio del libro público',
        'Coordination deputy': 'Adjunto/a de coordinación',
        'Policy modeling': 'Modelado de política',
        'Congress scoring': 'Puntuación en congreso',
        'Municipal lists': 'Listas municipales',
        'Street mobilization': 'Movilización en calle',
        'Direct action liaison': 'Enlace de acción directa',
        'Manifesto drafting': 'Redacción de manifiesto',
        'Anti-bureaucracy cell': 'Célula antiburocracia',
        'Municipal campaigns': 'Campañas municipales',
        'Neighborhood assemblies': 'Asambleas vecinales',
        'Local sedes': 'Sedes locales',
        'Territorial pledges': 'Compromisos territoriales',
        'Climate narrative': 'Narrativa climática',
        'Growth & urgency': 'Crecimiento y urgencia',
        'Food sovereignty': 'Soberanía alimentaria',
        'Land use working group': 'Grupo de uso del suelo',
        'Digital guilds': 'Gremios digitales',
        'Platform cooperatives': 'Cooperativas de plataforma',
        'Labor standards': 'Normas laborales',
        'Ledger rituals': 'Rituales de libro mayor',
        'Militant organizer': 'Organizador/a militante',
        'Sede host': 'Anfitrión/a de sede',
        'Training pipeline': 'Pipeline de formación',
        'Coalition pastries': 'Bollería de coalición',
        'CRM hygiene': 'Higiene de CRM',
        'Event logistics': 'Logística de eventos',
        'Interpreter corps': 'Cuerpo de intérpretes',
        'Militant (duplicate registry)': 'Militante (registro duplicado)'
    };

    const MILITANT_CONTACT_CURRENT_ES = {
        'Organic Directorate': 'Dirección Orgánica',
        'Neo-Aristocratic Technocracy': 'Tecno-aristocracia neo',
        'Revolutionary Antisystem Front': 'Frente antisistema revolucionario',
        'Sovereignist Hyperlocal Populism': 'Populismo hiperlocal soberanista',
        'Cosmic Eco-Accelerationism': 'Eco-aceleracionismo cósmico',
        'Retro-Feudalist Digital Syndicalism': 'Sindicalismo digital retro-feudal',
        'Unaligned': 'Sin adscripción',
        'Data quarantine': 'Cuarentena de datos'
    };

    function personIdFromEmail(email) {
        return (email || '').split('@')[0].replace(/\+.*/, '').replace(/\./g, '-');
    }

    function localizeMilitantContact(contact) {
        const personId = contact.personId || personIdFromEmail(contact.email);
        const catalog = window.SINDICAPP_DEMO_PERSON_NAMES;
        const name = catalog && catalog[personId] ? catalog[personId].es : contact.name;
        return {
            ...contact,
            personId,
            name,
            role: MILITANT_CONTACT_ROLE_ES[contact.role] || contact.role,
            current: MILITANT_CONTACT_CURRENT_ES[contact.current] || contact.current
        };
    }

    const WIKI_ARTICLES = {
        'party-history-vol-0': {
            title: 'Historia del partido, vol. 0',
            html: `<p>La reunión fundacional casi seguro que ocurrió, aunque las actas quedaron detrás de un radiador.</p>
                        <p>Resoluciones clave: adoptar el eje Bien/Mal; aplazar la definición de ambos; establecer la supremacía de la papelería.</p>`
        },
        'hq-stationery-shop': {
            title: 'Sede — La habitación encima de la papelería',
            html: `<p>El plano incluye una ventana, tres sillas y una salida de emergencia que desemboca en ideología.</p>
                        <p>El perchero sagrado guarda exactamente doce sillas plegables y un paraguas de lealtad indecisa.</p>`
        },
        'official-website': {
            title: 'Web oficial',
            html: `<p><code>www.seguro-que-tenemos-web.partido</code> — propagación DNS pendiente desde el ciclo electoral anterior.</p>`
        },
        'brand-guidelines': {
            title: 'Manual de imagen para señalar virtudes',
            html: `<p>Paleta aprobada del Bien: Pantone Esperanzado. Fuentes del Mal prohibidas: Comic Sans (salvo ironía obligatoria).</p>`
        },
        'coalition-matrix': {
            title: 'Matriz de compatibilidad de coalición',
            html: `<p>Filas: facción bollería, bloque impresora amarilla, célula directora. Columnas: antes de comer, después del postre. Celdas: quizá.</p>`
        },
        'crisis-manual': {
            title: 'Manual de crisis',
            html: `<p>Cuando el Bien y el Mal presentan listas conjuntas: comunicado, reparto de culpas y distribución de galletas de emergencia.</p>`
        },
        'glossary-undefined': {
            title: 'Glosario de términos que nos negamos a definir',
            html: `<p><strong>Pueblo</strong>, <strong>soberanía</strong>, <strong>progreso</strong> y «la situación» — véase también: todo lo demás.</p>`
        }
    };

    function buildPartyWikiIndexHtml() {
        return `<h5>Wiki</h5>
                            <p class="template-muted">Base de conocimiento — lore satírico del PBI-MS (demo). Normas oficiales de acceso: <strong>Wiki → Normas → Escalafón de la plataforma</strong>.</p>
                            <ul class="cp-wiki-pages" data-wiki-index>
                                <li><a href="#wiki:party-history-vol-0" data-wiki-article="party-history-vol-0">Historia del partido, vol. 0: la reunión que casi seguro hubo</a><span class="cp-wiki-blurb">Mitos fundacionales, actas perdidas y por qué el café siempre estaba frío.</span></li>
                                <li><a href="#wiki:hq-stationery-shop" data-wiki-article="hq-stationery-shop">Sede — La habitación encima de la papelería</a><span class="cp-wiki-blurb">Plano, salida a ideología y el perchero sagrado.</span></li>
                                <li><a href="#wiki:official-website" data-wiki-article="official-website">Web oficial — www.seguro-que-tenemos-web.partido</a><span class="cp-wiki-blurb">DNS pendiente desde el ciclo electoral anterior.</span></li>
                                <li><a href="#wiki:brand-guidelines" data-wiki-article="brand-guidelines">Manual de imagen para señalar virtudes</a><span class="cp-wiki-blurb">Tonos aprobados del Bien (Pantone Esperanzado), fuentes del Mal prohibidas.</span></li>
                                <li><a href="#wiki:coalition-matrix" data-wiki-article="coalition-matrix">Matriz de coalición (spoiler: quizá)</a><span class="cp-wiki-blurb">Con quién gobernamos antes de comer y a quién nos oponemos después del postre.</span></li>
                                <li><a href="#wiki:crisis-manual" data-wiki-article="crisis-manual">Manual de crisis — cuando el Bien y el Mal van en la misma lista</a><span class="cp-wiki-blurb">Comunicados, reparto de culpas y galletas de emergencia.</span></li>
                                <li><a href="#wiki:glossary-undefined" data-wiki-article="glossary-undefined">Glosario de términos que nos negamos a definir</a><span class="cp-wiki-blurb">Pueblo, soberanía, progreso y «la situación».</span></li>
                            </ul>`;
    }

    PARTY_TEAM_SUBMODULES.info.seedHtml['wiki-index'] = buildPartyWikiIndexHtml();

    const MESSAGE_THREADS_ES = {
        clara: {
            name: 'Clara Domènech',
            preview: 'El 50 % sigue siendo una carta de amor',
            messages: [
                { from: 'them', text: '¿Ya terminaste de repartir el voto?', time: 'Lun 10:42' },
                { from: 'me', text: 'Sí — 50 % para ti, el resto al caos.', time: 'Lun 10:45' },
                { from: 'them', text: 'El 50 % sigue siendo una carta de amor en este partido.', time: 'Lun 10:46' }
            ]
        },
        marina: {
            name: 'Marina del Campo',
            preview: 'La Célula Directora otra vez renombrada',
            messages: [
                { from: 'them', text: '¿Me votas antes de la reunión de la Célula?', time: 'Dom 18:02' },
                { from: 'me', text: 'Ya estás al 20 % en el borrador.', time: 'Dom 18:15' },
                { from: 'them', text: 'Perfecto. Trae sillas plegables.', time: 'Dom 18:16' }
            ]
        },
        iker: {
            name: 'Iker Montenegro',
            preview: 'Pregunta sobre capa del mapa',
            messages: [
                { from: 'them', text: '¿Qué capa municipal muestra los votos secretos?', time: 'Sáb 09:10' },
                { from: 'me', text: 'Ninguna. Esa es la gracia.', time: 'Sáb 09:22' }
            ]
        },
        helena: {
            name: 'Helena Puntuaciones',
            preview: 'Hilo de auditoría de votos',
            messages: [
                { from: 'them', text: 'Tu lista visible tiene 7 nombres — el foro dice 42.', time: 'Vie 14:00' },
                { from: 'me', text: '35 son secretos. Bienvenido a Plataforma 21.', time: 'Vie 14:08' }
            ]
        },
        elena: {
            name: 'Elena Morales',
            preview: 'Gracias por los 0,80 p',
            messages: [
                { from: 'them', text: 'Te di 0,80 p — espero que te ayude en el escalafón.', time: 'Jue 11:30' },
                { from: 'me', text: 'Ayuda. Los votantes secretos son otro cantar.', time: 'Jue 11:45' }
            ]
        },
        marc: {
            name: 'Marc Puig',
            preview: '¿Asamblea esta semana?',
            messages: [
                { from: 'them', text: '¿Vienes a la asamblea territorial?', time: 'Mié 16:20' },
                { from: 'me', text: 'Si llegan las sillas plegables.', time: 'Mié 16:33' }
            ]
        },
        sofia: {
            name: 'Sofia Andersen',
            preview: 'Intriga y bollería',
            messages: [
                { from: 'them', text: 'La facción de croissants quiere tu voto.', time: 'Mar 08:05' },
                { from: 'me', text: 'Solo voto a personas, no a bollería.', time: 'Mar 08:19' },
                { from: 'them', text: 'Los croissants están decepcionados.', time: 'Mar 08:20' }
            ]
        }
    };

    const VOTE_CAST_UI_ES = {
        remaining: 'Restante',
        currentVote: 'Voto actual',
        loading: 'Cargando…',
        noVoteYet: 'Aún no has emitido voto.',
        openEditor: 'Abrir editor',
        closeEditor: 'Cerrar editor',
        modifyVotes: 'Modificar, quitar o añadir votos',
        saveVote: 'Guardar voto',
        removeAll: 'Quitar todo',
        selectFriends: 'Elige amistades y asigna porcentajes que sumen 100 %.',
        exceeds100: 'El total supera el 100 %. Reduce asignaciones.',
        voteSaved: 'Voto guardado (demo).',
        now: 'Ahora',
        honorPoints: 'Puntos de Honor',
        partialSuffix: 'p'
    };

    function buildMessagesPageHtmlEs() {
        const threadOrder = ['clara', 'marina', 'iker', 'helena', 'elena', 'marc', 'sofia'];
        const listItems = threadOrder.map((id) => {
            const t = MESSAGE_THREADS_ES[id];
            return `<li><button type="button" class="cp-messages-thread-btn" data-message-thread="${id}"><span class="cp-messages-thread-name">${t.name}</span><span class="cp-messages-thread-preview">${t.preview}</span></button></li>`;
        }).join('');
        return `<!-- locale:es -->
                    <h5>Mensajes</h5>
                    <p class="template-muted">Chats privados con personas que conoces en Plataforma 21 (demo).</p>
                    <div class="cp-messages-page" data-messages-page>
                        <div class="cp-messages-layout">
                            <aside class="cp-messages-threads">
                                <h6>Conversaciones</h6>
                                <ul class="cp-messages-thread-list">${listItems}</ul>
                            </aside>
                            <div class="cp-messages-chat">
                                <div class="cp-messages-chat-header" data-messages-chat-title>Clara Domènech</div>
                                <div class="cp-messages-log" data-messages-log></div>
                                <form class="cp-messages-compose" data-messages-compose>
                                    <input type="text" data-messages-input placeholder="Escribe un mensaje…" autocomplete="off" />
                                    <button type="submit">Enviar</button>
                                </form>
                            </div>
                        </div>
                    </div>`;
    }

    function buildCuentaPersonalSeedEs() {
        return {
            'self:public-profile': `<!-- locale:es -->
                    <h5>Perfil público</h5>
                    <p class="template-muted">Lo que ven otros usuarios en Plataforma 21 (demo).</p>
                    <p><strong>Nombre visible:</strong> Usuario demo</p>
                    <p><strong>Bio:</strong> Militante del PBI-MS (Partido del Bien Intencionao y del Mal Sospechoso). Solo voto a personas, nunca a abstracciones antes de comer.</p>
                    <p class="template-muted" style="margin-top:10px;">Totales de voto en <strong>Votación</strong>. Escalafón oficial: <strong>Partido → Info → Wiki → Normas → Escalafón de la plataforma</strong>.</p>`,
            'self:messages': buildMessagesPageHtmlEs(),
            'self:votes-received': `<!-- locale:es -->
                    <h5>Votos recibidos</h5>
                    <p class="template-muted">Votos parciales de personas — visibles y secretos (demo).</p>
                    <p><strong>Visibles</strong></p>
                    <ul class="cp-vote-list" data-votes-received-list>
                        <li><span>Elena Morales</span><span>0,80 p</span></li>
                        <li><span>Marc Puig</span><span>0,65 p</span></li>
                        <li><span>Sofia Andersen</span><span>0,50 p</span></li>
                        <li><span>João Ferreira</span><span>0,40 p</span></li>
                        <li><span>Lucía Vidal</span><span>0,35 p</span></li>
                        <li><span>Tomás Riera</span><span>0,28 p</span></li>
                        <li><span>Nadia El Amrani</span><span>0,22 p</span></li>
                    </ul>
                    <details class="cp-vote-secret-toggle">
                        <summary>Votantes secretos (13) — solo porcentajes</summary>
                        <ul class="cp-vote-secret-list">
                            <li><span>0,41 p</span></li>
                            <li><span>0,39 p</span></li>
                            <li><span>0,37 p</span></li>
                            <li><span>0,34 p</span></li>
                            <li><span>0,31 p</span></li>
                            <li><span>0,29 p</span></li>
                            <li><span>0,27 p</span></li>
                            <li><span>0,25 p</span></li>
                            <li><span>0,24 p</span></li>
                            <li><span>0,22 p</span></li>
                            <li><span>0,20 p</span></li>
                            <li><span>0,18 p</span></li>
                            <li><span>0,16 p</span></li>
                        </ul>
                    </details>
                    <div class="cp-vote-received-total"><strong>Total recibido:</strong> 23,76 Puntos de Honor</div>
                    <p style="margin-top:10px;" class="template-muted"><strong>20 personas</strong> te han votado · <strong>13</strong> en secreto · las entradas ocultas solo muestran porcentajes (sin nombres)</p>`,
            'self:voting': `<!-- locale:es -->
                    <h5>Votación</h5>
                    <p class="template-muted">Reparto de tu voto social entre amistades (100 % en total). Resumen arriba; el editor se abre bajo demanda.</p>
                    <div class="cp-vote-cast-page" data-vote-cast-page>
                        <div class="cp-vote-cast-summary-box">
                            <h6>Voto actual</h6>
                            <ul class="cp-vote-list" data-vote-cast-summary hidden></ul>
                            <p class="cp-vote-cast-summary-empty" data-vote-cast-summary-empty>Cargando…</p>
                        </div>
                        <button type="button" class="cp-vote-cast-open-btn" data-vote-cast-toggle aria-expanded="false">Abrir editor</button>
                        <div class="cp-vote-cast-editor-box" data-vote-cast-editor hidden>
                            <h6>Modificar, quitar o añadir votos</h6>
                            <div class="cp-vote-cast-tool" data-vote-cast-root>
                                <div class="cp-vote-cast-meter" data-vote-cast-meter>
                                    <span>Restante</span>
                                    <strong data-vote-remaining>100</strong><span>%</span>
                                </div>
                                <ul class="cp-vote-cast-friends" data-vote-cast-friends>
                                    <li data-friend-id="clara"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Clara Domènech</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="marina"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Marina del Campo</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="iker"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Iker Montenegro</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="helena"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Helena Puntuaciones</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="pau"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Pau Infraestructura</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="elena"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Elena Morales</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="marc"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Marc Puig</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                    <li data-friend-id="sofia"><label class="cp-vote-cast-friend-label"><input type="checkbox" class="cp-vote-cast-friend-check" /> Sofia Andersen</label><span class="cp-vote-cast-pct-wrap"><input type="number" class="cp-vote-cast-pct" min="0" max="100" step="1" value="0" disabled /> %</span></li>
                                </ul>
                                <div class="cp-vote-cast-actions">
                                    <button type="button" class="cp-vote-cast-submit" disabled>Guardar voto</button>
                                    <button type="button" class="cp-vote-cast-reset">Quitar todo</button>
                                </div>
                                <p class="cp-vote-cast-status" data-vote-cast-status>Elige amistades y asigna porcentajes que sumen 100 %.</p>
                            </div>
                        </div>
                    </div>
                    <p class="template-muted" style="margin-top:10px;">Solo votos a personas con nombre — no a colectivos ni al partido.</p>`
        };
    }

    window.SINDICAPP_ES = {
        id: 'es',
        localeUi: {
            infoLocalGroupsNav: 'Agrupaciones locales',
            infoLocalGroupsTitle: 'Agrupaciones locales',
            selectCcaa: 'Comunidad autónoma',
            selectCcaaPlaceholder: 'Seleccionar comunidad autónoma…',
            selectProvince: 'Provincia',
            selectProvincePlaceholder: 'Seleccionar provincia…',
            selectProvinceFirst: 'Selecciona una provincia primero…',
            selectComarca: 'Comarca',
            selectComarcaPlaceholder: 'Seleccionar comarca…',
            selectComarcaFirst: 'Selecciona una comarca primero…',
            selectCounty: 'Seleccionar provincia',
            selectCountyPlaceholder: 'Seleccionar provincia…',
            selectMunicipality: 'Municipio o comarca completa',
            selectMunicipalityPlaceholder: 'Seleccionar municipio…',
            comarcaWideSuffix: 'toda la comarca',
            municipalityModulesAria: 'Módulos del municipio',
            filterMunicipality: 'Municipio',
            filterAllMunicipalities: 'Todos los municipios',
            municipalList: 'Lista municipal',
            municipalityColumn: 'Municipio',
            localGroupIntro: 'este municipio',
            partyStructurePath: 'Partido → Local → [municipio] → Info → Estructura → Estructura del partido',
            generalDirectorateNuclei: 'núcleos municipales',
            welcome: 'Bienvenido a SindicApp',
            mapPlaceholder: 'Pulsa OpenStreetMap para cargar el mapa.',
            mapHint: 'Elige <strong>Colectivo</strong> → <strong>Mapa</strong>, luego <strong>OpenStreetMap</strong>.',
            sidebar: 'Barra lateral',
            background: 'Fondo',
            mobileToggleAria: 'Mostrar barra lateral',
            showBackgroundAria: 'Mostrar fondo',
            territoryInfo: 'Info',
            mapProviderTitle: 'Proveedor de mapa',
            mapProviderMuted: 'Solo OpenStreetMap (sin capas extra en esta plantilla).',
            bordersTitle: 'Fronteras',
            bordersHelp1: 'Activa capas de límites administrativos en el mapa. Haz clic en una región y usa <strong>Info</strong> para abrir su página de Agrupaciones locales.',
            bordersHelp2: 'Consejo: activa o desactiva capas para explorar la estructura administrativa a distintos niveles.',
            bordersHelp3: '✅ = hay conjuntos de fronteras. ❌ = aún no hay conjuntos.',
            bordersHelp4: 'Consejo: pulsa 👁️ para ver límites en el mapa. Datasets grandes pueden tardar un momento.',
            collectivesScoreboardIntro: 'Poder de voto del partido aportado por cada colectivo civil (votos sociales agregados). Barras más largas = más influencia dentro del partido.',
            generalCoordinationIntro: 'Libro de la Coordinación General: 10 directores, bloques de participación ponderada y coaliciones de apoyo activas detrás de cada director.',
            collectivesScoreboardTitle: 'Ranking',
            collectivesScoreboardMuted: 'Ranking de poder de voto por colectivo — abre el espacio de fondo para el gráfico completo. Pulsa un colectivo para abrir su perfil.',
            generalCoordinationTitle: 'Coordinación general',
            generalCoordinationMuted: 'Dirección de colectivos — abre el espacio de fondo para el expediente completo y la tabla de plazas.',
            selectCollective: 'Seleccionar colectivo…',
            areas: 'Áreas',
            selectCollectiveLabel: 'Seleccionar colectivo',
            candidacyCcaaSelect: 'Seleccionar comunidad autónoma…',
            candidacyMunicipalesSelect: 'Seleccionar municipio…',
            candidacyCcaaSubtitle: 'Comunidad autónoma',
            candidacyMunicipalesSubtitle: 'Municipio',
            aboutSindicApp: 'Bienvenido/a a SindicApp — usuario y sindicato con mapa o espacio de texto a pantalla completa.',
            aboutModules: 'Módulos: Usuario y Colectivo. Usuario concentra tu lugar de trabajo; Colectivo es la plataforma de coordinación laboral SindicApp.',
            aboutHome: 'Pulsa el título <strong>SindicApp</strong> para volver al inicio.',
            changeLocation: 'Cambiar ubicación',
            copy: 'Copiar',
            copied: '✓ Copiado',
            countySuffix: 'comarca',
            contactCount: (visible, total) => `Mostrando ${visible} de ${total} militantes`
        },
        moduleLabels: {
            self: 'Usuario',
            collectives: 'Colectivos',
            sindicato: 'Colectivo',
            sindicatoNavAria: 'Navegación Colectivo',
            sindicatoViewsAria: 'Vistas de Colectivo',
            'local-groups': 'Local',
            party: 'Partido',
            partido: 'Partido',
            candidatura: 'Candidatura',
            candidacy: 'Candidatura',
            agrupaciones: 'Agrupaciones',
            'candidacy-congreso': 'Congreso de los Diputados',
            'candidacy-ccaa': 'Comunidad Autónoma',
            'candidacy-municipales': 'Municipales',
            talk: 'Comunicación',
            info: 'Info',
            admin: 'Admin',
            local: 'Local',
            'geo-teams': 'Local',
            'topic-teams': 'Lista completa',
            map: 'Mapa',
            lista: 'Lista',
            'complete-list': 'Lista completa',
            ranking: 'Ranking',
            'collectives-scoreboard': 'Ranking',
            'general-coordination': 'Coordinación general',
            'personal-account': 'Cuenta personal'
        },
        orgMirrorLabels: {
            collectives: 'Colectivos',
            'local-groups': 'Agrupaciones locales'
        },
        topicAreaLabels: {
            all: 'Todos',
            miscellaneous: 'Miscelánea',
            intellectual: 'Intelectual',
            spiritual: 'Espiritual',
            cultural: 'Cultural',
            professional: 'Profesional',
            territorial: 'Territorial',
            syndical: 'Sindical'
        },
        selfSections: {
            header: 'Usuario',
            profile: 'Perfil',
            publicProfile: 'Perfil público',
            accountDetails: 'Datos de cuenta',
            votesReceived: 'Votos recibidos',
            voting: 'Votación',
            messages: 'Mensajes',
            admin: 'Admin',
            adminParty: 'Partido',
            adminCollectives: 'Colectivos',
            adminGroupings: 'Agrupaciones',
            adminSindicato: 'Sindicato',
            selfSubSindicato: 'Sindicato',
            selfSubPartido: 'Partido',
            selfWorkplaceLabel: 'Tu empresa',
            selfNoWorkplace: 'Sin empresa asignada'
        },
        cpMilitantOnlyBanner: CP_MILITANT_ONLY_BANNER,
        buildTalkNewsFeedHtml,
        buildTalkForumBoardHtml,
        TALK_NEWS_ARTICLES,
        TALK_FORUM_THREADS,
        PARTY_TEAM_SUBMODULES,
        PLATFORM_RANK_LADDER,
        buildPlatformRankLadderSeedHtml,
        WIKI_ARTICLES,
        buildPartyWikiIndexHtml,
        buildPartyStructureHtml,
        buildPartyCandidacyHtml,
        buildCollectiveRepresentationHtml: function (representation, formatPct, buildRow) {
            const top = representation[0];
            const totalVotes = representation.reduce((s, c) => s + c.militantVotes, 0);
            const rowHtml = typeof buildRow === 'function'
                ? (c) => buildRow(c, formatPct)
                : (c) => `
                    <div class="collective-rep-row">
                        <div class="collective-rep-label">
                            <button type="button" class="collective-rep-profile-link" data-collective-profile-id="${c.id}">${c.label}</button>
                            <span class="collective-rep-meta">${c.areaLabel}</span>
                        </div>
                        <div class="collective-rep-bar-track" title="${formatPct(c.sharePct)} del peso partidario del colectivo">
                            <div class="collective-rep-bar-fill" style="width:${Math.max(c.sharePct, 1.5).toFixed(1)}%"></div>
                        </div>
                        <span class="collective-rep-pct">${formatPct(c.sharePct)}</span>
                    </div>`;
            const rows = representation.map(rowHtml).join('');
            return `
                    <div class="collective-representation-panel">
                        <h2>Representación de colectivos en el partido</h2>
                        <p class="template-muted">Cada colectivo civil emite <strong>votos sociales</strong> que se agregan en la puntuación partidaria. Más apoyo militantil y más votos sociales = más peso en coaliciones, listas y plebiscitos internos.</p>
                        <div class="collective-representation-summary">
                            <div class="collective-representation-stat">
                                <strong>${representation.length}</strong>
                                <span>Colectivos listados</span>
                            </div>
                            <div class="collective-representation-stat">
                                <strong>${totalVotes.toLocaleString('es-ES')}</strong>
                                <span>Votos militantes demo (suma)</span>
                            </div>
                            <div class="collective-representation-stat">
                                <strong>${top ? top.label : '—'}</strong>
                                <span>Mayor cuota (${top ? formatPct(top.sharePct) : '0'})</span>
                            </div>
                        </div>
                        <div class="collective-representation-chart" role="img" aria-label="Gráfico de barras de poder de voto por colectivo">
                            <h3>Poder de voto por colectivo</h3>
                            ${rows}
                        </div>
                        <p class="collective-representation-note"><em>Datos demo:</em> pesos ficticios pero estables por colectivo. En producción, las puntuaciones siguen las reglas de Plataforma 21.</p>
                    </div>`;
        },
        buildCollectivesGeneralCoordinationHtml: function () {
            const directorate = [
                { name: 'Marina del Campo', collective: 'Seminario Que No Acaba Nunca', share: 15 },
                { name: 'Helena Votes', collective: 'Gremio de Pensadores Certificados', share: 12 },
                { name: 'Iker Montenegro', collective: 'Coalición de Transeúntes Levemente Preocupados', share: 11 },
                { name: 'Pau Infrastructure', collective: 'Oficina del Café Estratégico', share: 10 },
                { name: 'Elena Morales', collective: 'Respuesta de Emergencia al Baile Folk', share: 9 },
                { name: 'Marc Puig', collective: 'Museo de Paraguas Perdidos', share: 9 },
                { name: 'Sofia Andersen', collective: 'Revisores Anónimos Entre Pares', share: 8 },
                { name: 'João Ferreira', collective: 'Vecinos Sin Fronteras (Capítulo Muy Local)', share: 8 },
                { name: 'Lucía Vidal', collective: 'Sindicato de Cosas Que Piten de Noche', share: 8 },
                { name: 'Nadia El Amrani', collective: 'Orden del Halo Vacilante', share: 10 }
            ];
            const rows = directorate.map((p, i) => `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${p.name}</td>
                            <td>${p.collective}</td>
                            <td>${p.share} %</td>
                        </tr>`).join('');
            return `
                    <div class="collective-representation-panel">
                        <h2>Dirección de Coordinación General</h2>
                        <p class="template-muted">Tras la Noche de los Siete Empates, los colectivos firmaron el <strong>Pacto de Custodia Rotatoria</strong>: ningún bloque mandaría solo, y cada ciclo estratégico lo coescribiría una cámara mixta.</p>
                        <p class="template-muted">De ahí salió la Coordinación General: mesa de mando de 10 plazas, cada una con bloque protegido, cada coordinador/a respondiendo a su asamblea, legitimidad renovada en cada Congreso con recuento abierto.</p>
                        <div class="collective-representation-summary">
                            <div class="collective-representation-stat">
                                <strong>10</strong>
                                <span>Directores/as</span>
                            </div>
                            <div class="collective-representation-stat">
                                <strong>Apoyo multicolectivo</strong>
                                <span>Cada director puede tener varias coordinaciones detrás</span>
                            </div>
                            <div class="collective-representation-stat">
                                <strong>100 %</strong>
                                <span>Cuota de voto total</span>
                            </div>
                        </div>
                        <div class="collective-representation-chart">
                            <h3>Libro de plazas actual</h3>
                            <p class="template-muted">Los bloques marcan influencia en líneas de coalición, orden de candidatura y ventanas de veto procedimental.</p>
                            <table class="cp-contact-table">
                                <thead>
                                    <tr><th>#</th><th>Coordinador/a</th><th>Colectivo de origen</th><th>Cuota de voto</th></tr>
                                </thead>
                                <tbody>${rows}</tbody>
                            </table>
                        </div>
                        <p class="collective-representation-note"><em>Estado del lore:</em> doctrina y rituales aplazados para revisión futura. Esta página se centra en cuotas y estructura de apoyo.</p>
                    </div>`;
        },
        buildSelfAccountDetailsSeed: function () {
            return `<!-- locale:es -->
                    <h5>Datos de cuenta</h5>
                    <p class="template-muted">Ajustes privados de cuenta (demo).</p>
                    <p><strong>Nivel de acceso demo:</strong> Usuario (nivel 2) — cuenta registrada.</p>
                    <p class="template-muted">El escalafón de seis niveles (Visitante → Candidato/a) está en <strong>Partido → Info → Wiki → Normas → Escalafón de la plataforma</strong> (norma real de Plataforma 21, no simulación).</p>`;
        },
        cuentaPersonalSeed: buildCuentaPersonalSeedEs(),
        collectiveLabelsById: COLLECTIVE_LABELS_ES,
        localizeMilitantContact,
        messageThreads: MESSAGE_THREADS_ES,
        voteCastUi: VOTE_CAST_UI_ES,
        voteCastFriendNames: {
            clara: 'Clara Domènech',
            marina: 'Marina del Campo',
            iker: 'Iker Montenegro',
            helena: 'Helena Puntuaciones',
            pau: 'Pau Infraestructura',
            elena: 'Elena Morales',
            marc: 'Marc Puig',
            sofia: 'Sofia Andersen'
        },
        nav: {
            '[data-module="self"]': 'Usuario',
            '[data-self-sub="sindicato"]': 'Sindicato',
            '[data-self-sub="partido"]': 'Partido',
            '[data-self-party-section="public-profile"]': 'Perfil público',
            '[data-self-party-section="account-details"]': 'Datos de cuenta',
            '[data-self-party-section="votes-received"]': 'Votos recibidos',
            '[data-self-party-section="voting"]': 'Votación',
            '[data-self-party-section="messages"]': 'Mensajes',
            '[data-self-party-section="admin-party"]': 'Partido',
            '[data-self-party-section="admin-collectives"]': 'Colectivos',
            '[data-self-party-section="admin-groupings"]': 'Agrupaciones',
            '[data-self-party-section="admin-sindicato"]': 'Sindicato',
            '[data-self-sindicato-section="overview"]': 'Resumen',
            '[data-self-sindicato-section="location"]': 'Localización',
            '[data-self-sindicato-section="reports"]': 'Denuncias',
            '[data-self-sindicato-section="wages"]': 'Sueldos',
            '[data-self-sindicato-section="convenio"]': 'Convenio',
            '[data-self-sindicato-section="action"]': 'Acción',
            '[data-module="party"]': 'Partido',
            '[data-module="collectives"]': 'Colectivos',
            '[data-module="sindicato"]': 'Colectivo',
            '[data-sindicato-sub="coordination"]': 'Coordinación',
            '[data-sindicato-sub="wiki"]': 'Wiki',
            '[data-sindicato-sub="unions"]': 'Sindicatos',
            '[data-sindicato-sub="vivienda"]': 'Vivienda',
            '[data-sindicato-sub="map"]': 'Mapa',
            '[data-sindicato-sub="feed"]': 'Foro',
            '[data-sindicato-sub="sectores"]': 'Sectores',
            '[data-sindicato-sub="workplaces"]': 'Empresas',
            '[data-sindicato-coord-section="admin"]': 'Admin',
            '[data-sindicato-coord-section="wiki"]': 'Wiki',
            '[data-sindicato-coord-sub="estructura"]': 'Estructura',
            '[data-sindicato-coord-sub="dinero"]': 'Dinero',
            '[data-sindicato-coord-sub="objetivos"]': 'Objetivos',
            '[data-sindicato-wiki-sub="index"]': 'Índice',
            '[data-sindicato-wiki-sub="normas"]': 'Normas',
            '[data-party-internal-sub="talk"]': 'Comunicación',
            '[data-party-internal-sub="info"]': 'Info',
            '[data-party-internal-sub="admin"]': 'Admin',
            '[data-sindicato-section="location"]': 'Localización',
            '[data-sindicato-section="overview"]': 'Resumen',
            '[data-sindicato-section="reports"]': 'Denuncias',
            '[data-sindicato-section="wages"]': 'Sueldos',
            '[data-sindicato-section="convenio"]': 'Convenio',
            '[data-sindicato-section="action"]': 'Acción',
            '[data-org-nav="partido"]': 'Partido',
            '[data-org-nav="candidatura"]': 'Candidatura',
            '[data-org-nav="colectivos"]': 'Colectivos',
            '[data-org-nav="agrupaciones"]': 'Agrupaciones',
            '[data-candidacy-sub="congreso"]': 'Congreso de los Diputados',
            '[data-candidacy-sub="ccaa"]': 'Comunidad Autónoma',
            '[data-candidacy-sub="municipales"]': 'Municipales',
            '[data-collectives-section="lista"]': 'Lista',
            '[data-collectives-section="general-coordination"]': 'Coordinación general',
            '[data-collectives-list-sub="complete-list"]': 'Lista completa',
            '[data-collectives-list-sub="ranking"]': 'Ranking',
            '[data-geo-teams-mode="info"]': 'Agrupaciones locales',
            '[data-geo-teams-mode="map"]': 'Mapa',
            '[data-collectives-org-sub="talk"]': 'Comunicación',
            '[data-collectives-org-sub="info"]': 'Info',
            '[data-collectives-org-sub="admin"]': 'Admin',
            '[data-local-groups-org-sub="talk"]': 'Comunicación',
            '[data-local-groups-org-sub="info"]': 'Info',
            '[data-local-groups-org-sub="admin"]': 'Admin',
            '[data-geo-team-sub="talk"]': 'Comunicación',
            '[data-geo-team-sub="info"]': 'Info',
            '[data-geo-team-sub="admin"]': 'Admin',
            '[data-topic-team-sub="talk"]': 'Comunicación',
            '[data-topic-team-sub="info"]': 'Info',
            '[data-topic-team-sub="admin"]': 'Admin',
            '[data-topic-team-sub="local"]': 'Local',
            '[data-topic-area="all"]': 'Todos',
            '[data-topic-area="miscellaneous"]': 'Miscelánea',
            '[data-topic-area="intellectual"]': 'Intelectual',
            '[data-topic-area="spiritual"]': 'Espiritual',
            '[data-topic-area="cultural"]': 'Cultural',
            '[data-topic-area="professional"]': 'Profesional',
            '[data-topic-area="territorial"]': 'Territorial',
            '[data-topic-area="syndical"]': 'Sindical'
        }
    };
})();
