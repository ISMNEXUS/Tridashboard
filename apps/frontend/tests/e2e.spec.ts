import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', shouldRedirect: true },
  { path: '/login', shouldRedirect: false },
  { path: '/dashboard', shouldRedirect: false },
  { path: '/dashboard/crm', shouldRedirect: false },
  { path: '/dashboard/erp', shouldRedirect: false },
  { path: '/dashboard/admin', shouldRedirect: false },
  { path: '/dashboard/config', shouldRedirect: false },
];

test.describe('Rutas principales', () => {
  for (const route of routes) {
    test(`La ruta ${route.path} responde correctamente`, async ({ page }) => {
      const response = await page.goto(route.path);
      // Verifica que no sea un error 404
      expect(response?.status()).not.toBe(404);
      // Verifica que la página se cargó correctamente
      if (!route.shouldRedirect) {
        expect(response?.status()).toBeLessThan(400);
      }
    });
  }
});

test('Botón login funciona', async ({ page }) => {
  await page.goto('/login');
  
  // Esperar a que el formulario esté visible
  await page.waitForSelector('input[type="email"]');
  
  await page.fill('input[type="email"]', 'admin@trianglais.com');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  
  // Esperar redirección al dashboard
  await page.waitForURL(/.*dashboard.*/);
  expect(page.url()).toContain('dashboard');
});
