#!/usr/bin/env node
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const astroBin = path.join(rootDir, 'node_modules/astro/bin/astro.mjs');

// Remove agent-specific environment variables so Astro dev runs in foreground human mode
const cleanEnv = { ...process.env };
delete cleanEnv.ANTIGRAVITY_AGENT;
delete cleanEnv.ANTIGRAVITY_PROJECT_ID;

const args = ['dev', ...process.argv.slice(2)];

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
