import { defineConfig } from '@playwright/test';

/**
 * QA smoke tests — see docs/decisions/README.md and docs/plans/PLANES.md
 * ("Harness de QA como herramienta del repo"). Runs against a production
 * build served by `vite preview`, matching what actually ships to GitHub
 * Pages, not the dev server.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173/',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://localhost:4173/',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
