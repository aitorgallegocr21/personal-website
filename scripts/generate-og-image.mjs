import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputPath = path.join(rootDir, 'public', 'images', 'og-image.png');
const avatarPath = path.join(rootDir, 'public', 'images', 'avatar.webp');

function findChromePath() {
  if (
    process.env.PLAYWRIGHT_CHROME_PATH &&
    fs.existsSync(process.env.PLAYWRIGHT_CHROME_PATH)
  ) {
    return process.env.PLAYWRIGHT_CHROME_PATH;
  }
  const candidates = [
    path.join(
      rootDir,
      'chrome',
      'linux-156.0.8078.73',
      'chrome-linux64',
      'chrome'
    ),
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }
  throw new Error('Chrome/Chromium binary not found.');
}

async function generateOgImage() {
  console.log('🎨 [OG Engine] Generating 1200x630 Open Graph preview image...');
  const chromePath = findChromePath();
  const avatarBase64 = fs.existsSync(avatarPath)
    ? `data:image/webp;base64,${fs.readFileSync(avatarPath).toString('base64')}`
    : '';

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background-color: #09090b;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #f4f4f5;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px 72px;
      position: relative;
    }
    /* Ambient Glow */
    .glow {
      position: absolute;
      top: -120px;
      right: -80px;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0.03) 60%, transparent 80%);
      pointer-events: none;
    }
    .glow-bottom {
      position: absolute;
      bottom: -150px;
      left: -100px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    /* Grid Pattern */
    .grid-pattern {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
    }
    /* Header Badge */
    .top-bar {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 8px 16px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: #34d399;
      text-transform: uppercase;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #10b981;
      box-shadow: 0 0 10px #10b981;
    }
    .domain-tag {
      font-family: monospace;
      font-size: 15px;
      color: #71717a;
      letter-spacing: 0.02em;
    }
    /* Content Layout */
    .main-content {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 48px;
      margin-top: 10px;
    }
    .text-column {
      flex: 1;
      max-width: 720px;
    }
    .name {
      font-size: 54px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.1;
      color: #ffffff;
      margin-bottom: 12px;
      background: linear-gradient(to bottom right, #ffffff, #d4d4d8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
      color: #34d399;
      letter-spacing: -0.01em;
      margin-bottom: 20px;
    }
    .description {
      font-size: 19px;
      line-height: 1.5;
      color: #a1a1aa;
      margin-bottom: 28px;
    }
    .skills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .skill-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #e4e4e7;
    }
    .portrait-column {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-wrapper {
      width: 230px;
      height: 230px;
      border-radius: 28px;
      padding: 6px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(56, 189, 248, 0.2), rgba(255,255,255,0.05));
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.7), 0 0 30px rgba(16, 185, 129, 0.15);
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 22px;
      display: block;
    }
    /* Footer Bar */
    .footer-bar {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 24px;
      font-size: 15px;
      color: #71717a;
    }
    .footer-left {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .footer-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  </style>
</head>
<body>
  <div class="glow"></div>
  <div class="glow-bottom"></div>
  <div class="grid-pattern"></div>

  <div class="top-bar">
    <div class="badge">
      <span class="status-dot"></span>
      Portfolio &amp; CV Profesional
    </div>
    <div class="domain-tag">aitorgallego.dev &bull; GitHub Pages</div>
  </div>

  <div class="main-content">
    <div class="text-column">
      <h1 class="name">Aitor Gallego</h1>
      <h2 class="title">Desarrollador de Software | Backend &amp; Sistemas</h2>
      <p class="description">
        Desarrollo multiplataforma (DAM) y administración de sistemas (SMR). Especializado en desarrollo backend, arquitecturas modulares y código limpio.
      </p>
      <div class="skills-row">
        <span class="skill-pill">Java</span>
        <span class="skill-pill">Python</span>
        <span class="skill-pill">TypeScript</span>
        <span class="skill-pill">Angular</span>
        <span class="skill-pill">Docker</span>
        <span class="skill-pill">Linux / SMR</span>
        <span class="skill-pill">SQL</span>
      </div>
    </div>

    <div class="portrait-column">
      <div class="avatar-wrapper">
        <img class="avatar-img" src="${avatarBase64}" alt="Aitor Gallego" />
      </div>
    </div>
  </div>

  <div class="footer-bar">
    <div class="footer-left">
      <div class="footer-item">
        <span>📍 Herencia, Ciudad Real, España</span>
      </div>
      <div class="footer-item">
        <span>⚡ Disponible para incorporación</span>
      </div>
    </div>
    <div class="footer-right">
      <span>github.com/aitorgallegocr21</span>
    </div>
  </div>
</body>
</html>`;

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: outputPath, type: 'png' });
  await browser.close();

  console.log(`✅ [OG Engine] Saved 1200x630 preview image to: ${outputPath}`);
}

generateOgImage().catch((err) => {
  console.error('❌ [OG Engine] Failed to generate OG image:', err);
  process.exit(1);
});
