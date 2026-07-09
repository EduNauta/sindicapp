import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

/**
 * The app intentionally uses classic (non-module) scripts so that runtime
 * behavior is identical to the original single-file version — including
 * opening index.html directly via double click (file://). Vite serves and
 * previews them as-is; this small hook copies js/ into dist/ at build time,
 * since non-module scripts are not part of the Rollup graph. The stylesheet
 * (css/main.css) IS handled by Vite and bundled into dist/assets/.
 */
function copyClassicAssets() {
  return {
    name: 'copy-classic-assets',
    closeBundle() {
      cpSync(resolve(__dirname, 'js'), resolve(__dirname, 'dist', 'js'), {
        recursive: true,
      });
    },
  };
}

export default defineConfig({
  // Relative base so the built site works on GitHub Pages
  // (https://<user>.github.io/sindicapp/) and any other static host.
  base: './',
  publicDir: false,
  build: {
    outDir: 'dist',
  },
  plugins: [copyClassicAssets()],
});
