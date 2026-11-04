// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://aitorgallegocr21.github.io',
  base: '/personal-website',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
