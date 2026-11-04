#!/usr/bin/env node
import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const distDir = path.join(rootDir, 'dist');
const astroBin = path.join(rootDir, 'node_modules/astro/bin/astro.mjs');

// 1. Ensure production build exists
if (
  !fs.existsSync(distDir) ||
  !fs.existsSync(path.join(distDir, 'index.html'))
) {
  console.log('📦 No static build found in dist/. Running build first...');
  execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
}

// 2. Stop any existing background preview server that may hold the port
try {
  execSync(`"${process.execPath}" "${astroBin}" preview stop`, {
    cwd: rootDir,
    stdio: 'ignore',
  });
} catch {
  // Ignore if no server was running
}

// 3. Remove agent-specific environment variables so Astro runs in foreground human mode
const cleanEnv = { ...process.env };
delete cleanEnv.ANTIGRAVITY_AGENT;
delete cleanEnv.ANTIGRAVITY_PROJECT_ID;

const args = ['preview', ...process.argv.slice(2)];

console.log('🚀 [Preview Engine] Starting preview server...');
console.log('👉 Local URL: http://localhost:4321/personal-website/\n');

const child = spawn(process.execPath, [astroBin, ...args], {
  cwd: rootDir,
  stdio: 'inherit',
  env: cleanEnv,
});

const cleanup = () => {
  if (!child.killed) {
    child.kill('SIGINT');
  }
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
