import { test, expect } from '@playwright/test';

test.describe('CV Printable View & A4 Layout E2E', () => {
  test('loads /cv route cleanly without console errors', async ({ page }) => {
    const errorLogs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errorLogs.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      errorLogs.push(err.message);
    });

    await page.goto('./cv');
    await page.waitForLoadState('networkidle');

    expect(errorLogs).toEqual([]);
    await expect(page).toHaveTitle(/Curriculum Vitae/i);
  });

  test('strictly contains cv-container height within 1 A4 printable page budget', async ({
    page,
  }) => {
    await page.goto('./cv');

    // Emulate print media
    await page.emulateMedia({ media: 'print' });

    const cvContainer = page.locator('#cv-container');
    await expect(cvContainer).toBeVisible();

    // Available printable height on A4 with 8mm top & bottom margin:
    // A4 total height = 297mm. Available = 297 - 16 = 281mm.
    // 281mm * (96 / 25.4) = ~1062px max allowed height without overflowing to page 2.
    const boundingBox = await cvContainer.boundingBox();
    expect(boundingBox).not.toBeNull();
    if (boundingBox) {
      expect(boundingBox.height).toBeLessThanOrEqual(1065);
    }
  });

  test('applies palette from URL query parameter (?palette=violet)', async ({
    page,
  }) => {
    await page.goto('./cv?palette=violet');

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-palette', 'violet');
  });

  test('hides floating print bar when in print media mode', async ({
    page,
  }) => {
    await page.goto('./cv');

    const printBar = page.locator('#cv-print-bar');
    if ((await printBar.count()) > 0) {
      await page.emulateMedia({ media: 'print' });
      // In CSS, print:hidden applies display: none !important
      await expect(printBar).toBeHidden();
    }
  });
});
