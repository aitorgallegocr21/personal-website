import { test, expect } from '@playwright/test';

test.describe('Web Portfolio Interactive E2E', () => {
  test('loads home page without unhandled console errors or exceptions', async ({
    page,
  }) => {
    const errorLogs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errorLogs.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      errorLogs.push(err.message);
    });

    await page.goto('./');
    await page.waitForLoadState('networkidle');

    expect(errorLogs).toEqual([]);
    await expect(page).toHaveTitle(/Aitor Gallego/i);
  });

  test('renders all primary semantic sections and anchor targets', async ({
    page,
  }) => {
    await page.goto('./');

    const sections = [
      '#proyectos',
      '#trayectoria',
      '#certificaciones',
      '#filosofia',
      '#contacto',
    ];

    for (const selector of sections) {
      const section = page.locator(selector);
      await expect(section).toBeAttached();
      await expect(section).toBeVisible();
    }
  });

  test('toggles and persists color palette selection in DOM and localStorage', async ({
    page,
  }) => {
    await page.goto('./');

    const paletteBtn = page.locator('#palette-menu-btn');
    await expect(paletteBtn).toBeVisible();
    await paletteBtn.click();

    const dropdown = page.locator('#palette-dropdown');
    await expect(dropdown).toBeVisible();

    const skyOption = page.locator(
      '.palette-select-option[data-palette-id="sky"]'
    );
    await expect(skyOption).toBeVisible();
    await skyOption.click();

    // Verify attribute on html element
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-palette', 'sky');

    // Verify localStorage persistence
    const storedPalette = await page.evaluate(() =>
      localStorage.getItem('portfolio-palette')
    );
    expect(storedPalette).toBe('sky');
  });

  test('opens certificate modal viewer and closes it on Escape key press', async ({
    page,
  }) => {
    await page.goto('./');

    // Find first certification or timeline credential trigger button
    const certTrigger = page.locator('button[data-doc-url]').first();
    await expect(certTrigger).toBeVisible();
    await certTrigger.click();

    // Verify dialog opened
    const modal = page.locator('#certificate-modal');
    await expect(modal).toBeVisible();
    const isOpen = await modal.evaluate(
      (dialog: HTMLDialogElement) => dialog.open
    );
    expect(isOpen).toBe(true);

    // Press Escape to dismiss
    await page.keyboard.press('Escape');

    // Verify dialog closed
    const isClosed = await modal.evaluate(
      (dialog: HTMLDialogElement) => !dialog.open
    );
    expect(isClosed).toBe(true);
  });

  test('activates and exposes bento-modern skin contract on root html', async ({
    page,
  }) => {
    await page.goto('./');

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-skin', 'bento-modern');

    // Verify skin option in menu
    const paletteBtn = page.locator('#palette-menu-btn');
    await paletteBtn.click();

    const bentoOption = page.locator(
      '.skin-select-option[data-skin-id="bento-modern"]'
    );
    await expect(bentoOption).toBeVisible();
    await expect(bentoOption.locator('.skin-check-icon')).toBeVisible();
  });

  test('injects valid Schema.org JSON-LD structured data with Person and ProfilePage', async ({
    page,
  }) => {
    await page.goto('./');

    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();

    const textContent = await jsonLdScript.textContent();
    expect(textContent).toBeTruthy();

    const parsed = JSON.parse(textContent || '{}');
    expect(parsed['@context']).toBe('https://schema.org');
    expect(Array.isArray(parsed['@graph'])).toBe(true);

    const graph = parsed['@graph'];
    const profilePage = graph.find(
      (item: { '@type': string }) => item['@type'] === 'ProfilePage'
    );
    const person = graph.find(
      (item: { '@type': string }) => item['@type'] === 'Person'
    );

    expect(profilePage).toBeDefined();
    expect(profilePage.inLanguage).toBe('es');

    expect(person).toBeDefined();
    expect(person.name).toBe('Aitor Gallego-Casilda Romero');
    expect(person.jobTitle).toContain('Backend');
    expect(Array.isArray(person.knowsAbout)).toBe(true);
    expect(person.knowsAbout.length).toBeGreaterThan(0);
    expect(Array.isArray(person.alumniOf)).toBe(true);
  });
});
