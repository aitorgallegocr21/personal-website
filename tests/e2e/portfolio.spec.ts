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

  test('renders floating navbar and supports responsive mobile navigation drawer', async ({
    page,
  }) => {
    // 1. Desktop viewport verification
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('./');

    const header = page.locator('#site-header');
    await expect(header).toBeVisible();

    const desktopNav = header.locator('nav[aria-label="Navegación principal"]');
    await expect(desktopNav).toBeVisible();

    const mobileToggle = page.locator('#mobile-nav-toggle');
    await expect(mobileToggle).toBeHidden();

    // 2. Mobile viewport verification (iPhone-like 375x667)
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(desktopNav).toBeHidden();
    await expect(mobileToggle).toBeVisible();
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'false');

    const mobileMenu = page.locator('#mobile-nav-menu');
    await expect(mobileMenu).toBeHidden();

    // Open mobile menu
    await mobileToggle.click();
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileMenu).toBeVisible();

    // Check all mobile links exist
    const mobileLinks = mobileMenu.locator('.mobile-nav-link');
    await expect(mobileLinks).toHaveCount(6); // 5 sections + CV button

    // Close on Escape
    await page.keyboard.press('Escape');
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(mobileMenu).toBeHidden();

    // Open again and click a section link to test auto-close
    await mobileToggle.click();
    await expect(mobileMenu).toBeVisible();
    await mobileLinks.first().click();
    await expect(mobileMenu).toBeHidden();
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

  test('always defaults to live rotation mode upon loading the page', async ({
    page,
  }) => {
    await page.goto('./');

    // Open dropdown to inspect controls
    const paletteBtn = page.locator('#palette-menu-btn');
    await paletteBtn.click();

    // Confirm that upon loading, live rotation is active
    const autoStatusText = page.locator('#auto-status-text');
    await expect(autoStatusText).toContainText('Activa');

    const autoLiveIndicator = page.locator('#auto-live-indicator');
    await expect(autoLiveIndicator).toBeVisible();

    // Select a manual palette
    const skyOption = page.locator(
      '.palette-select-option[data-palette-id="sky"]'
    );
    await skyOption.click();
    await expect(page.locator('html')).toHaveAttribute('data-palette', 'sky');

    // Reload the page: must default back to live rotation
    await page.reload();
    await paletteBtn.click();
    await expect(autoStatusText).toContainText('Activa');
    await expect(autoLiveIndicator).toBeVisible();
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

  test('adapts certificate modal for mobile viewports with multi-document tabs and resilient PDF helpers', async ({
    page,
  }) => {
    // 1. Mobile viewport test (375x667)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('./');

    const multiDocTrigger = page.locator('button[data-docs]').first();
    await expect(multiDocTrigger).toBeVisible();
    await multiDocTrigger.click();

    const modal = page.locator('#certificate-modal');
    await expect(modal).toBeVisible();
    expect(
      await modal.evaluate((dialog: HTMLDialogElement) => dialog.open)
    ).toBe(true);

    // Mobile fallback banner should be visible on small viewport
    const mobileBanner = page.locator('#cert-modal-mobile-banner');
    await expect(mobileBanner).toBeVisible();

    const mobileNativeOpen = page.locator('#cert-modal-mobile-open');
    await expect(mobileNativeOpen).toBeVisible();
    await expect(mobileNativeOpen).toHaveAttribute('href', /\.pdf$/i);

    // Multi-document tab bar should be visible with multiple tab buttons
    const navContainer = page.locator('#cert-modal-nav-container');
    await expect(navContainer).toBeVisible();

    const tabButtons = navContainer.locator('.doc-tab-btn');
    const tabCount = await tabButtons.count();
    expect(tabCount).toBeGreaterThan(1);

    // Switching tabs updates iframe src
    const iframe = page.locator('#cert-modal-iframe');
    const initialSrc = await iframe.getAttribute('src');

    await tabButtons.nth(1).click();
    const updatedSrc = await iframe.getAttribute('src');
    expect(updatedSrc).not.toBe(initialSrc);

    // Mobile close button has touch target >= 44x44px and closes modal
    const mobileClose = modal.locator('.cert-modal-close-trigger:visible');
    const box = await mobileClose.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }

    await mobileClose.click();
    expect(
      await modal.evaluate((dialog: HTMLDialogElement) => !dialog.open)
    ).toBe(true);

    // 2. Desktop viewport test (1280x800): Mobile banner should be hidden
    await page.setViewportSize({ width: 1280, height: 800 });
    await multiDocTrigger.click();
    await expect(modal).toBeVisible();
    await expect(mobileBanner).toBeHidden();

    // Close via desktop close button
    const desktopClose = page.locator('#cert-modal-close');
    await expect(desktopClose).toBeVisible();
    await desktopClose.click();
    expect(
      await modal.evaluate((dialog: HTMLDialogElement) => !dialog.open)
    ).toBe(true);
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

  test('serves robots.txt with sitemap directive', async ({ page }) => {
    const response = await page.goto('./robots.txt');
    expect(response?.status()).toBe(200);

    const body = await response?.text();
    expect(body).toContain('User-agent: *');
    expect(body).toContain('sitemap-index.xml');
  });

  test('generates valid and accessible sitemap-index.xml', async ({ page }) => {
    const response = await page.goto('./sitemap-index.xml');
    expect(response?.status()).toBe(200);

    const body = await response?.text();
    expect(body).toContain('sitemap');
  });

  test('serves dedicated Open Graph and Twitter card preview metadata', async ({
    page,
  }) => {
    await page.goto('./');

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /images\/og-image\.png$/);

    const ogWidth = page.locator('meta[property="og:image:width"]');
    await expect(ogWidth).toHaveAttribute('content', '1200');

    const ogHeight = page.locator('meta[property="og:image:height"]');
    await expect(ogHeight).toHaveAttribute('content', '630');

    const ogType = page.locator('meta[property="og:image:type"]');
    await expect(ogType).toHaveAttribute('content', 'image/png');

    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
  });

  test('supports desktop dock repositioning to left, right, bottom and reset to top', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    const header = page.locator('#site-header');
    await expect(header).toBeVisible();
    await expect(header).toHaveAttribute('data-dock', 'top');

    const dockMenuBtn = page.locator('#dock-menu-btn');
    await expect(dockMenuBtn).toBeVisible();

    const popover = page.locator('#dock-menu-popover');
    await expect(popover).toBeHidden();

    // 1. Open quick-dock menu and select Left
    await dockMenuBtn.click();
    await expect(popover).toBeVisible();
    await page.locator('[data-dock-target="left"]').click();
    await expect(header).toHaveAttribute('data-dock', 'left');
    await expect(popover).toBeHidden();

    // Verify localStorage persistence
    const savedPosLeft = await page.evaluate(() =>
      localStorage.getItem('portfolio-dock-position')
    );
    expect(savedPosLeft).toBe('left');

    // 2. Double click handle to reset to Top
    const dragHandle = page.locator('#dock-drag-handle');
    await expect(dragHandle).toBeVisible();
    await dragHandle.dblclick();
    await expect(header).toHaveAttribute('data-dock', 'top');

    const savedPosReset = await page.evaluate(() =>
      localStorage.getItem('portfolio-dock-position')
    );
    expect(savedPosReset).toBe('top');

    // 3. Switch to Bottom dock and reload to verify state persistence
    await dockMenuBtn.click();
    await page.locator('[data-dock-target="bottom"]').click();
    await expect(header).toHaveAttribute('data-dock', 'bottom');

    await page.reload();
    await page.waitForLoadState('networkidle');
    const headerAfterReload = page.locator('#site-header');
    await expect(headerAfterReload).toHaveAttribute('data-dock', 'bottom');

    // Clean up back to default Top
    const handleAfterReload = page.locator('#dock-drag-handle');
    await handleAfterReload.dblclick();
    await expect(headerAfterReload).toHaveAttribute('data-dock', 'top');
  });

  test('tracks fluid scroll-spy indicator during desktop section scrolling', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    const indicator = page.locator('#navbar-fluid-indicator');
    await expect(indicator).toBeAttached();

    // Scroll down to Projects section
    await page.locator('#proyectos').scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    const projectsLink = page.locator('.nav-link[href="#proyectos"]');
    await expect(projectsLink).toHaveAttribute('data-active', 'true');

    // Scroll down to Career/Timeline section
    await page.locator('#trayectoria').scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    const timelineLink = page.locator('.nav-link[href="#trayectoria"]');
    await expect(timelineLink).toHaveAttribute('data-active', 'true');
  });

  test('preserves mobile top navigation and drawer on mobile viewports without docking overhead', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    // Dock drag handle and quick dock button must remain hidden on mobile
    await expect(page.locator('#dock-drag-handle')).toBeHidden();
    await expect(page.locator('#dock-menu-btn')).toBeHidden();

    // Standard header remains at top with mobile toggle
    const mobileToggle = page.locator('#mobile-nav-toggle');
    await expect(mobileToggle).toBeVisible();
    await expect(page.locator('#site-header')).toHaveAttribute(
      'data-dock',
      'top'
    );
  });
});
