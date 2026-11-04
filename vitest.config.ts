import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.{test,spec}.{ts,js}'],
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      '@components': resolve(import.meta.dirname, './src/components'),
      '@layouts': resolve(import.meta.dirname, './src/layouts'),
      '@data': resolve(import.meta.dirname, './src/data'),
      '@types': resolve(import.meta.dirname, './src/types'),
      '@styles': resolve(import.meta.dirname, './src/styles'),
      '@utils': resolve(import.meta.dirname, './src/utils'),
    },
  },
});
