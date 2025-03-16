import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    // Sử dụng 'VITE_' làm prefix thay vì để trống
    envPrefix: 'VITE_'
  }
});
