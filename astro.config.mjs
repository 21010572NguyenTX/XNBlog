import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify/functions';

export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: netlify({
    // These are the default options
    dist: new URL('./dist/', import.meta.url),
  }),
  vite: {
    // Sử dụng 'VITE_' làm prefix thay vì để trống
    envPrefix: 'VITE_'
  }
});
