import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  vite: {
    // Sử dụng 'VITE_' làm prefix thay vì để trống
    envPrefix: 'VITE_'
  }
});
