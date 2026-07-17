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

  // Since ADR 0010 the module picker holds the flat, always-visible subnav
  // (eight peer modules, no Usuario/Colectivo umbrella). If the subnav or its
  // key buttons are gone, navigation is broken for everyone.
  await expect(page.locator('#template-module-picker')).toBeVisible();
  await expect(page.locator('#sindicato-subnav')).toBeVisible();
  await expect(page.locator('#sindicato-subnav [data-sindicato-sub="workplaces"]')).toBeVisible();
  await expect(page.locator('#sindicato-subnav [data-sindicato-sub="usuario"]')).toBeVisible();

  // Opening a collective module (Empresas) should reveal the sindicato nav tree.
  await page.locator('#sindicato-subnav [data-sindicato-sub="workplaces"]').click();
  await expect(page.locator('#sindicato-nav-tree')).toBeVisible();

  // The Usuario/Perfil module (eighth button) should reveal the self nav tree.
  await page.locator('#sindicato-subnav [data-sindicato-sub="usuario"]').click();
  await expect(page.locator('#self-nav-tree')).toBeVisible();
});

test('map background loads', async ({ page }) => {
  await page.goto('/');
  // Since 13-07-2026 the default landing is Red Social (a text workspace),
  // so the map is only visible after opening a map view — Empresas → Mapa.
  await page.locator('#sindicato-subnav [data-sindicato-sub="workplaces"]').click();
  await expect(page.locator('#map-container')).toBeVisible();
  // Leaflet stamps this class on its root pane once initialized.
  await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 10_000 });
});

test('red social landing shows module stat panels', async ({ page }) => {
  await page.goto('/');
  // Master module (13-07-2026): clickable stat panels, one per trunk module.
  // 17-07-2026: eight panels — Profesionales and Autónomos joined the landing.
  await expect(page.locator('.sindicato-redsocial-card')).toHaveCount(8);
  // Panels navigate: Consumidores opens its directory in the workspace.
  await page.locator('.sindicato-redsocial-card[data-sindicato-goto-sub="consumidores"]').click();
  await expect(page.locator('#map-text-display .sindicato-dir-card').first()).toBeVisible();
});
