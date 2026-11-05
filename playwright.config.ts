import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

function resolveExecutablePath(): string | undefined {
  if (
    process.env.PLAYWRIGHT_CHROME_PATH &&
    existsSync(process.env.PLAYWRIGHT_CHROME_PATH)
  ) {
    return process.env.PLAYWRIGHT_CHROME_PATH;
  }

  const candidates = [
    resolve(
      import.meta.dirname,
      'chrome/linux-156.0.8078.73/chrome-linux64/chrome'
    ),
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  try {
    const whichOut = execSync(
      'which google-chrome || which chromium || which chromium-browser',
      {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }
    ).trim();

    if (whichOut && existsSync(whichOut)) {
      return whichOut;
    }
  } catch {
    // Fallback gracefully to Playwright default browser management
  }

  return undefined;
}

const executablePath = resolveExecutablePath();

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]]
    : 'list',
  use: {
    baseURL: 'http://localhost:4321/personal-website/',
    trace: 'on-first-retry',
    launchOptions: {
      ...(executablePath ? { executablePath } : {}),
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 4321',
    url: 'http://localhost:4321/personal-website/',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
