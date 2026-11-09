import { test, expect } from '@playwright/test';

test.describe('Horizontal Viewport Overflow & Dock Layout Checks', () => {
  test('Dynamic viewport resize from 1280px down to 375px does not introduce lateral overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('./');

    const steps = [
      1100, 950, 850, 820, 800, 780, 768, 750, 700, 640, 500, 390, 375,
    ];
    for (const w of steps) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.waitForTimeout(50);

      const check = await page.evaluate((width) => {
        const docEl = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
        const clientWidth = docEl.clientWidth;

        const overflowing = [];
        const all = document.querySelectorAll('*');
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.right > width + 0.5) {
            overflowing.push({
              tag: el.tagName,
              id: el.id,
              classes: el.className?.toString().slice(0, 50),
              right: rect.right,
              excess: rect.right - width,
            });
          }
        }

        return {
          width,
          scrollWidth,
          clientWidth,
          hasScroll: scrollWidth > clientWidth,
          overflowing: overflowing.slice(0, 5),
        };
      }, w);

      expect(check.hasScroll).toBe(false);
      expect(check.overflowing).toHaveLength(0);
    }
  });

  test('Interface Hub popover does not cause lateral overflow on any screen size', async ({
    page,
  }) => {
    const widths = [375, 412, 640, 700, 768, 800, 850, 1024, 1280];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('./');

      const btn = page.locator('#palette-menu-btn');
      await btn.click();
      await page.waitForTimeout(100);

      const popoverCheck = await page.evaluate((w) => {
        const popover = document.getElementById('palette-dropdown');
        const rect = popover?.getBoundingClientRect();
        const docEl = document.documentElement;
        const scrollWidth = Math.max(
          docEl.scrollWidth,
          document.body.scrollWidth
        );

        return {
          viewport: w,
          popoverLeft: rect?.left,
          popoverRight: rect?.right,
          popoverWidth: rect?.width,
          scrollWidth,
          clientWidth: docEl.clientWidth,
          hasScroll: scrollWidth > docEl.clientWidth,
          leftOverflow: rect ? rect.left < 0 : false,
          rightOverflow: rect ? rect.right > w : false,
        };
      }, width);

      expect(popoverCheck.hasScroll).toBe(false);
      expect(popoverCheck.leftOverflow).toBe(false);
      expect(popoverCheck.rightOverflow).toBe(false);
    }
  });

  test('Dock in 768px-850px range does not wrap or push interface hub icon outside dock', async ({
    page,
  }) => {
    const tabletWidths = [768, 780, 800, 820, 850];
    for (const width of tabletWidths) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('./');

      const layout = await page.evaluate(() => {
        const header = document.getElementById('site-header');
        const headerRect = header?.getBoundingClientRect();
        const nav = document.getElementById('desktop-nav');
        const navRect = nav?.getBoundingClientRect();
        const paletteBtn = document.getElementById('palette-menu-btn');
        const paletteBtnRect = paletteBtn?.getBoundingClientRect();

        return {
          headerLeft: headerRect?.left,
          headerRight: headerRect?.right,
          headerTop: headerRect?.top,
          headerBottom: headerRect?.bottom,
          headerHeight: headerRect?.height,
          navRight: navRect?.right,
          paletteBtnLeft: paletteBtnRect?.left,
          paletteBtnRight: paletteBtnRect?.right,
          paletteBtnTop: paletteBtnRect?.top,
          paletteBtnBottom: paletteBtnRect?.bottom,
          // Button must be completely inside the header bounds
          isPaletteInsideHeader:
            paletteBtnRect && headerRect
              ? paletteBtnRect.right <= headerRect.right + 1 &&
                paletteBtnRect.left >= headerRect.left &&
                paletteBtnRect.top >= headerRect.top &&
                paletteBtnRect.bottom <= headerRect.bottom
              : false,
        };
      });

      expect(layout.isPaletteInsideHeader).toBe(true);
      expect(layout.paletteBtnLeft).toBeDefined();
      expect(layout.navRight).toBeDefined();
      expect(layout.paletteBtnLeft ?? 0).toBeGreaterThan(layout.navRight ?? 0);
    }
  });
});
