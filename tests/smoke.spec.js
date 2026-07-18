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

  // Since the version unification (17-07-2026) the module picker holds the single
  // ring-based subnav (#sindicato-subnav-propuesta): two boxes, tools + collectives,
  // with role-implicit locks. If the subnav or its key buttons are gone, navigation
  // is broken for everyone.
  await expect(page.locator('#template-module-picker')).toBeVisible();
  await expect(page.locator('#sindicato-subnav-propuesta')).toBeVisible();
  await expect(page.locator('#sindicato-subnav-propuesta [data-propuesta-goto="sub:workplaces"]')).toBeVisible();
  await expect(page.locator('#sindicato-subnav-propuesta [data-propuesta-goto="sub:usuario"]')).toBeVisible();

  // Opening a collective module (Empresas) should reveal the sindicato nav tree.
  await page.locator('#sindicato-subnav-propuesta [data-propuesta-goto="sub:workplaces"]').click();
  await expect(page.locator('#sindicato-nav-tree')).toBeVisible();

  // The Usuario module (locks walk through) should reveal the self nav tree.
  await page.locator('#sindicato-subnav-propuesta [data-propuesta-goto="sub:usuario"]').click();
  await expect(page.locator('#self-nav-tree')).toBeVisible();
});

test('map background loads', async ({ page }) => {
  await page.goto('/');
  // Since 13-07-2026 the default landing is Red Social (a text workspace),
  // so the map is only visible after opening a map view — Empresas → Mapa.
  await page.locator('#sindicato-subnav-propuesta [data-propuesta-goto="sub:workplaces"]').click();
  await expect(page.locator('#map-container')).toBeVisible();
  // Leaflet stamps this class on its root pane once initialized.
  await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 10_000 });
});

test('red social landing shows module stat panels', async ({ page }) => {
  await page.goto('/');
  // Master module (13-07-2026): clickable stat panels, one per trunk module.
  // 17-07-2026 (portada reform): nine panels — the six collectives (Inquilinos was
  // missing) in one group, plus Mapa/Sectores/Empresas as territory & workplace tools.
  await expect(page.locator('.sindicato-redsocial-card')).toHaveCount(9);
  // Panels navigate: Consumidores opens its directory in the workspace.
  await page.locator('.sindicato-redsocial-card[data-sindicato-goto-sub="consumidores"]').click();
  await expect(page.locator('#map-text-display .sindicato-dir-card').first()).toBeVisible();
});
