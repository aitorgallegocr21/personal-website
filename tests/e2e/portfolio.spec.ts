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
      '#github',
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
    await page.waitForTimeout(350); // Allow header height transition (h-16 sm to h-14 mobile) to settle

    await expect(desktopNav).toBeHidden();
    await expect(mobileToggle).toBeVisible();
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'false');

    const mobileMenu = page.locator('#mobile-nav-menu');
    await expect(mobileMenu).toBeHidden();

    // Measure header height and main element document position before opening menu
    const mainElement = page.locator('main');
    const headerHeightBefore = await header.evaluate(
      (el: HTMLElement) => el.offsetHeight
    );
    const mainTopBefore = await mainElement.evaluate(
      (el: HTMLElement) => el.offsetTop
    );

    // Open mobile menu
    await mobileToggle.click();
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileMenu).toBeVisible();

    // Verify background backdrop is visible and blurred
    const mobileBackdrop = page.locator('#mobile-nav-backdrop');
    await expect(mobileBackdrop).toBeVisible();

    // Verify document scroll is locked when mobile menu is open
    const isLockedFirst = await page.evaluate(() => {
      return (
        document.body.style.overflow === 'hidden' &&
        document.documentElement.style.overflow === 'hidden'
      );
    });
    expect(isLockedFirst).toBe(true);

    // Verify zero layout shift: header pill height stays constant and main offset is stationary
    const headerHeightAfter = await header.evaluate(
      (el: HTMLElement) => el.offsetHeight
    );
    const mainTopAfter = await mainElement.evaluate(
      (el: HTMLElement) => el.offsetTop
    );
    expect(headerHeightAfter).toBe(headerHeightBefore);
    expect(mainTopAfter).toBe(mainTopBefore);

    // Check all mobile links exist
    const mobileLinks = mobileMenu.locator('.mobile-nav-link');
    await expect(mobileLinks).toHaveCount(7); // 6 sections + CV button

    // Close on Escape
    await page.keyboard.press('Escape');
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(mobileMenu).toBeHidden();
    await expect(mobileBackdrop).toBeHidden();

    // Verify document scroll is restored
    const isUnlockedFirst = await page.evaluate(() => {
      return (
        document.body.style.overflow === '' &&
        document.documentElement.style.overflow === ''
      );
    });
    expect(isUnlockedFirst).toBe(true);

    // Open again and click backdrop to test auto-close
    await mobileToggle.click();
    await expect(mobileMenu).toBeVisible();
    await expect(mobileBackdrop).toBeVisible();
    await mobileBackdrop.click({ position: { x: 10, y: 350 } });
    await expect(mobileMenu).toBeHidden();
    await expect(mobileBackdrop).toBeHidden();

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

  test('supports desktop dock repositioning to left, right, bottom and reset to top via interface hub', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    const header = page.locator('#site-header');
    await expect(header).toBeVisible();
    await expect(header).toHaveAttribute('data-dock', 'top');

    const interfaceHubBtn = page.locator('#palette-menu-btn');
    await expect(interfaceHubBtn).toBeVisible();

    const popover = page.locator('#palette-dropdown');
    await expect(popover).toBeHidden();

    // 1. Open interface hub popover and select Left
    await interfaceHubBtn.click();
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
    await interfaceHubBtn.click();
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

  test('supports mobile bottom docking and upward mobile drawer navigation', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    const header = page.locator('#site-header');
    await expect(header).toHaveAttribute('data-dock', 'top');

    // Drag handle is tactile and visible on mobile
    const dragHandle = page.locator('#dock-drag-handle');
    await expect(dragHandle).toBeVisible();

    // Standard header starts at top with mobile toggle
    const mobileToggle = page.locator('#mobile-nav-toggle');
    await expect(mobileToggle).toBeVisible();

    // Open Interface Hub and switch to Bottom dock
    const interfaceHubBtn = page.locator('#palette-menu-btn');
    await interfaceHubBtn.click();
    const dropdown = page.locator('#palette-dropdown');
    await expect(dropdown).toBeVisible();

    // Left and Right buttons are hidden on mobile
    const leftDockBtn = page.locator('[data-dock-target="left"]');
    await expect(leftDockBtn).toBeHidden();

    // Click Bottom dock
    await page.locator('[data-dock-target="bottom"]').click();
    await expect(header).toHaveAttribute('data-dock', 'bottom');
    await expect(dropdown).toBeHidden();

    // Open mobile menu while docked at bottom
    await mobileToggle.click();
    const mobileMenu = page.locator('#mobile-nav-menu');
    await expect(mobileMenu).toBeVisible();

    // Verify upward placement: mobile menu top is above header top
    const headerBox = await header.boundingBox();
    const menuBox = await mobileMenu.boundingBox();
    expect(headerBox).not.toBeNull();
    expect(menuBox).not.toBeNull();
    if (headerBox && menuBox) {
      expect(menuBox.y).toBeLessThan(headerBox.y);
    }

    // Close menu by clicking a link
    const firstLink = mobileMenu.locator('.mobile-nav-link').first();
    await firstLink.click();
    await expect(mobileMenu).toBeHidden();

    // Reset back to Top
    await interfaceHubBtn.click();
    await page.locator('[data-dock-target="top"]').first().click();
    await expect(header).toHaveAttribute('data-dock', 'top');
  });

  test('supports directional palette popover, blurred page backdrop, vertical alignment and hero active indicator', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    const header = page.locator('#site-header');

    // 1. Verify Hero active origin indicator at top of page
    await expect(header).toHaveAttribute('data-hero-active', 'true');

    // 2. Switch to Left dock
    const interfaceHubBtn = page.locator('#palette-menu-btn');
    await interfaceHubBtn.click();
    await page.locator('[data-dock-target="left"]').click();
    await expect(header).toHaveAttribute('data-dock', 'left');
    await expect(header).toHaveAttribute('data-hero-active', 'true');

    // Verify Theme controls container is vertically aligned
    const themeControls = page.locator('#theme-controls-container');
    await expect(themeControls).toHaveCSS('flex-direction', 'column');

    // 3. Open palette menu
    const paletteBtn = page.locator('#palette-menu-btn');
    await paletteBtn.click();

    const dropdown = page.locator('#palette-dropdown');
    await expect(dropdown).toBeVisible();
    await expect(dropdown).toHaveAttribute('data-state', 'open');

    // Verify document scroll is locked when palette menu is open
    const isScrollLocked = await page.evaluate(
      () =>
        document.body.style.overflow === 'hidden' &&
        document.documentElement.style.overflow === 'hidden'
    );
    expect(isScrollLocked).toBe(true);

    // Verify colors list in desktop displays all colors without scrollbar overflow
    const colorsList = page.locator('.palette-colors-list');
    await expect(colorsList).toBeVisible();
    const hasScrollbar = await colorsList.evaluate(
      (el) => el.scrollHeight > el.clientHeight
    );
    expect(hasScrollbar).toBe(false);

    const backdrop = page.locator('#palette-backdrop');
    await expect(backdrop).toBeVisible();

    // Verify backdrop click closes popover and hides backdrop
    await backdrop.click({ position: { x: 50, y: 50 } });
    await expect(dropdown).toBeHidden();
    await expect(backdrop).toBeHidden();

    // Verify document scroll is restored when palette menu closes
    const isScrollUnlocked = await page.evaluate(
      () =>
        document.body.style.overflow === '' &&
        document.documentElement.style.overflow === ''
    );
    expect(isScrollUnlocked).toBe(true);

    // Reopen palette and select a palette color: must close both dropdown & backdrop
    await paletteBtn.click();
    await expect(dropdown).toBeVisible();
    await expect(backdrop).toBeVisible();

    const firstPaletteOption = page.locator('.palette-select-option').first();
    await firstPaletteOption.click();
    await expect(dropdown).toBeHidden();
    await expect(backdrop).toBeHidden();

    // 4. Scroll down to projects section and verify hero active is removed
    await page.locator('#proyectos').scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    await expect(header).not.toHaveAttribute('data-hero-active', 'true');

    // 5. Reset back to Top
    await page.locator('#dock-drag-handle').dblclick();
    await expect(header).toHaveAttribute('data-dock', 'top');
  });

  test('dock remains fixed and visible at the top during page scroll (desktop & mobile)', async ({
    page,
  }) => {
    // 1. Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    const header = page.locator('#site-header');
    await expect(header).toBeVisible();
    await expect(header).toHaveAttribute('data-dock', 'top');

    // Scroll down 1000px
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(100);

    const desktopBox = await header.boundingBox();
    expect(desktopBox).not.toBeNull();
    // Bounding box Y must remain anchored near top of viewport (~16px)
    expect(desktopBox?.y).toBeLessThan(35);
    expect(desktopBox?.y).toBeGreaterThanOrEqual(8);
    await expect(header).toBeVisible();

    // 2. Mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(100);

    const mobileBox = await header.boundingBox();
    expect(mobileBox).not.toBeNull();
    expect(mobileBox?.y).toBeLessThan(25);
    expect(mobileBox?.y).toBeGreaterThanOrEqual(8);
    await expect(header).toBeVisible();
  });

  test('Interface Hub displays 1 column on screens < 768px (including 640px-767px) and 3 columns on >= 768px', async ({
    page,
  }) => {
    // 1. Tablet 700px (between 640px and 767px)
    await page.setViewportSize({ width: 700, height: 800 });
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    const paletteBtn = page.locator('#palette-menu-btn');
    await paletteBtn.click();
    const dropdown = page.locator('#palette-dropdown');
    await expect(dropdown).toBeVisible();

    const gridEl = dropdown.locator('> div');
    const cols700 = await gridEl.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
    });
    // Must be 1 column on 700px (not 3!)
    expect(cols700).toBe(1);

    // 2. Desktop 1024px
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.waitForTimeout(100);

    const cols1024 = await gridEl.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
    });
    // Must be 3 columns on 1024px
    expect(cols1024).toBe(3);
  });

  test('renders GitHub activity bento section with interactive heatmap and language breakdown', async ({
    page,
  }) => {
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    // Section exists and is visible
    const githubSection = page.locator('#github');
    await expect(githubSection).toBeAttached();
    await expect(githubSection).toBeVisible();

    // Verify heatmap canvas exists and contains cells
    const heatmapScroll = githubSection.locator('[data-heatmap-scroll]');
    await expect(heatmapScroll).toBeVisible();

    const cells = heatmapScroll.locator('.heatmap-cell');
    const cellCount = await cells.count();
    expect(cellCount).toBeGreaterThan(300);

    // Verify metrics cards exist
    await expect(
      githubSection.getByText('Contribuciones', { exact: true })
    ).toBeVisible();
    await expect(
      githubSection.getByText('Racha Actual', { exact: true })
    ).toBeVisible();
    await expect(
      githubSection.getByText('Racha Máxima', { exact: true })
    ).toBeVisible();
    await expect(
      githubSection.getByText('Repositorios', { exact: true })
    ).toBeVisible();

    // Verify language distribution including Python and TypeScript
    await expect(
      githubSection.getByText('Distribución de Lenguajes')
    ).toBeVisible();
    await expect(githubSection.getByText('Python').first()).toBeVisible();
    await expect(githubSection.getByText('TypeScript').first()).toBeVisible();

    // Verify section header does not prefix section number
    await expect(
      githubSection.locator('span', { hasText: '// Open Source & Actividad' })
    ).toBeVisible();

    // Verify highlights do not include obsidian
    await expect(githubSection.getByText(/obsidian/i)).toHaveCount(0);

    // Verify hovering cell displays floating tooltip
    const cellWithTooltip = heatmapScroll
      .locator('.heatmap-cell[data-tooltip]')
      .first();
    await cellWithTooltip.hover();
    const tooltip = page.locator('#heatmap-floating-tooltip');
    await expect(tooltip).toBeVisible();

    // Verify profile CTA button
    const profileCta = githubSection.locator('a', {
      hasText: /Visitar Perfil en GitHub/i,
    });
    await expect(profileCta).toBeVisible();
    await expect(profileCta).toHaveAttribute('href', /github\.com/);
  });

  test('opens interface hub popover from sticky top dock even after page scroll', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('./');
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(100);

    const btn = page.locator('#palette-menu-btn');
    await btn.click();
    const popover = page.locator('#palette-dropdown');
    await expect(popover).toBeVisible();

    const rect = await popover.boundingBox();
    expect(rect).not.toBeNull();
    expect(rect!.y).toBeGreaterThan(0);
    expect(rect!.y).toBeLessThan(400);
  });
});
