import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicCvDir = path.join(rootDir, 'public', 'cv');
const distCvDir = path.join(distDir, 'cv');

const PALETTES = ['emerald', 'slate', 'sky', 'violet', 'rose', 'monochrome'];
const DEFAULT_PALETTE = 'emerald';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

function findChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  const candidates = [
    path.join(rootDir, 'chrome', 'linux-156.0.8078.73', 'chrome-linux64', 'chrome'),
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }
  try {
    const whichOut = execSync('which google-chrome || which chromium || which chromium-browser', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
    if (whichOut && fs.existsSync(whichOut)) {
      return whichOut;
    }
  } catch {
    // Ignore
  }
  return null;
}

function startStaticServer() {
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      let reqPath = decodeURIComponent(url.pathname);

      // Strip base prefix '/personal-website' if present
      if (reqPath.startsWith('/personal-website')) {
        reqPath = reqPath.slice('/personal-website'.length);
      }
      if (!reqPath || reqPath === '/') {
        reqPath = '/index.html';
      }

      let filePath = path.join(distDir, reqPath);

      // If directory, try index.html
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

async function main() {
  console.log('🚀 [PDF Engine] Starting multi-palette headless PDF compilation...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ [PDF Engine] dist/ folder does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  const chromePath = findChromePath();
  if (!chromePath) {
    console.warn('⚠️ [PDF Engine] No Chrome or Chromium binary found on this system.');
    console.warn('⚠️ [PDF Engine] Skipping automated PDF generation; precompiled public/ assets will be preserved.');
    process.exit(0);
  }

  console.log(`🔍 [PDF Engine] Using Chrome binary at: ${chromePath}`);

  // Ensure target directories exist
  fs.mkdirSync(publicCvDir, { recursive: true });
  fs.mkdirSync(distCvDir, { recursive: true });

  const { server, port } = await startStaticServer();
  console.log(`🌐 [PDF Engine] Ephemeral static server listening on http://127.0.0.1:${port}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--font-render-hinting=max',
      ],
    });

    const page = await browser.newPage();
    // Emulate high-DPI print media
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
    await page.emulateMediaType('print');

    for (const palette of PALETTES) {
      const targetUrl = `http://127.0.0.1:${port}/personal-website/cv?palette=${palette}`;
      console.log(`📄 [PDF Engine] Rendering palette "${palette}" from ${targetUrl}...`);

      await page.goto(targetUrl, { waitUntil: 'networkidle0' });

      // Wait for Google Fonts to be fully resolved
      await page.evaluate(async () => {
        await document.fonts.ready;
      });

      // Brief layout pause to ensure all font metrics and borders settle
      await new Promise((r) => setTimeout(r, 150));

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
      });

      const filename = `cv-aitor-gallego-${palette}.pdf`;
      const publicPath = path.join(publicCvDir, filename);
      const distPath = path.join(distCvDir, filename);

      fs.writeFileSync(publicPath, pdfBuffer);
      fs.writeFileSync(distPath, pdfBuffer);
      console.log(`   ✓ Saved ${filename} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);

      // If default palette, also save canonical cv-aitor-gallego.pdf
      if (palette === DEFAULT_PALETTE) {
        const canonicalName = 'cv-aitor-gallego.pdf';
        fs.writeFileSync(path.join(publicCvDir, canonicalName), pdfBuffer);
        fs.writeFileSync(path.join(distCvDir, canonicalName), pdfBuffer);
        console.log(`   ✓ Saved canonical alias ${canonicalName}`);
      }
    }

    console.log('✨ [PDF Engine] All multi-palette PDFs compiled successfully!');
  } catch (error) {
    console.error('❌ [PDF Engine] Error during PDF generation:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
    server.close();
  }
}

main();
