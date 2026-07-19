        (function () {
            var KEY = 'sindicapp-locale';
            function readLocale() {
                try {
                    var s = localStorage.getItem(KEY);
                    return s === 'es' || s === 'ie' || s === 'ca' ? s : 'es';
                } catch (_) { return 'es'; }
            }
            function paintLocale(loc) {
                document.querySelectorAll('.template-language-btn[data-locale]').forEach(function (btn) {
                    var on = btn.getAttribute('data-locale') === loc;
                    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
                });
                document.documentElement.lang = loc === 'ie' ? 'en' : loc;
                if (document.body) {
                    document.body.classList.remove('sindicapp-locale-ie', 'sindicapp-locale-es', 'sindicapp-locale-ca');
                    document.body.classList.add('sindicapp-locale-' + (loc === 'ie' ? 'ie' : loc));
                }
            }
            /* 17-07-2026: tema (claro/oscuro) aplicado temprano para evitar parpadeo. */
            var THEME_KEY = 'sindicapp-theme';
            function readTheme() {
                /* 18-07 (idea 56, report v4): sin preferencia guardada, se respeta el tema
                   del sistema (prefers-color-scheme). El toggle manual sigue mandando. */
                try {
                    var stored = localStorage.getItem(THEME_KEY);
                    if (stored === 'dark' || stored === 'light') return stored;
                } catch (_) { /* demo */ }
                try {
                    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
                } catch (_) { return 'light'; }
            }
            function paintTheme(theme) {
                if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
                else document.documentElement.removeAttribute('data-theme');
                var btn = document.getElementById('sindicapp-theme-toggle');
                if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
            paintTheme(readTheme());
            document.addEventListener('click', function (e) {
                var tb = e.target.closest('#sindicapp-theme-toggle');
                if (!tb) return;
                var next = readTheme() === 'dark' ? 'light' : 'dark';
                try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
                paintTheme(next);
            }, true);

            var early = readLocale();
            var bootShellMarked = false;
            function markBootShell() {
                if (!document.body || bootShellMarked) return;
                bootShellMarked = true;
                document.body.classList.add('sindicapp-booting');
            }
            window.__sindicappEarlyLocale = early;
            window.__sindicappLocaleQueue = null;
            document.addEventListener('click', function (e) {
                var btn = e.target.closest('.template-language-btn[data-locale]');
                if (!btn) return;
                var raw = btn.getAttribute('data-locale');
                var loc = (raw === 'es' || raw === 'ca') ? raw : 'ie';
                paintLocale(loc);
                window.__sindicappEarlyLocale = loc;
                try { localStorage.setItem(KEY, loc); } catch (_) {}
                if (typeof window.__sindicappApplyLocale === 'function') {
                    window.__sindicappApplyLocale(loc);
                } else {
                    window.__sindicappLocaleQueue = loc;
                }
            }, true);
            function bootPaint() {
                if (!document.querySelector('.template-language-btn[data-locale]')) {
                    requestAnimationFrame(bootPaint);
                    return;
                }
                markBootShell();
                paintLocale(early);
                paintTheme(readTheme());
            }
            bootPaint();
        })();
