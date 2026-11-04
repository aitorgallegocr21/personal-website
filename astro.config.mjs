// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://aitorgallegocr21.github.io',
  base: '/personal-website',
  integrations: [
    sitemap(),
    {
      name: 'root-redirect-dev',
      hooks: {
        'astro:server:setup': ({ server }) => {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/' || req.url === '') {
              res.writeHead(302, { Location: '/personal-website/' });
              res.end();
              return;
            }
            next();
          });
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
