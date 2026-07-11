import { test, expect } from '@playwright/test';

/**
 * Smoke tests, not a full test suite: catch "the app is visibly broken"
 * before it deploys, not every regression. See docs/plans/PLANES.md.
 */

test('loads with no console errors', async ({ page }) => {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/');
  await expect(page.locator('#console')).toBeVisible();

  expect(errors, `console errors:\n${errors.join('\n')}`).toEqual([]);
});

test('core module/menu hierarchy is intact', async ({ page }) => {
  await page.goto('/');

  // The Usuario/Colectivo module picker is the top of the nav hierarchy —
  // if this is gone or renamed, navigation is broken for everyone.
  await expect(page.locator('#template-module-picker')).toBeVisible();
  await expect(page.locator('#sindicapp-module-self-btn')).toBeVisible();
  await expect(page.locator('#sindicapp-module-sindicato-btn')).toBeVisible();

  // Switching to the Sindicato module should reveal its nav tree.
  await page.locator('#sindicapp-module-sindicato-btn').click();
  await expect(page.locator('#sindicato-nav-tree')).toBeVisible();
  await expect(page.locator('#sindicato-subnav')).toBeVisible();

  // Switching to Usuario should reveal its nav tree.
  await page.locator('#sindicapp-module-self-btn').click();
  await expect(page.locator('#self-nav-tree')).toBeVisible();
});

test('map background loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#map-container')).toBeVisible();
  // Leaflet stamps this class on its root pane once initialized.
  await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 10_000 });
});
