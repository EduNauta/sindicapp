        (function () {
            var KEY = 'sindicapp-locale';
            function readLocale() {
                try {
                    var s = localStorage.getItem(KEY);
                    return s === 'es' || s === 'ie' ? s : 'es';
                } catch (_) { return 'es'; }
            }
            function paintLocale(loc) {
                document.querySelectorAll('.template-language-btn[data-locale]').forEach(function (btn) {
                    var on = btn.getAttribute('data-locale') === loc;
                    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
                });
                document.documentElement.lang = loc === 'es' ? 'es' : 'en';
                if (document.body) {
                    document.body.classList.remove('sindicapp-locale-ie', 'sindicapp-locale-es');
                    document.body.classList.add(loc === 'es' ? 'sindicapp-locale-es' : 'sindicapp-locale-ie');
                }
            }
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
                var loc = btn.getAttribute('data-locale') === 'es' ? 'es' : 'ie';
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
            }
            bootPaint();
        })();
