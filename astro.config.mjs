import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from 'astro-icon';
import node from '@astrojs/node';

export default defineConfig({
  output: 'hybrid',
  adapter: node({
    mode: "standalone"
  }),
  integrations: [react(), tailwind(), icon()],
  build: {
    sourcemap: true, // TODO: Auto set in dev-mode
  },
  devToolbar: {
    enabled: false // TODO: Auto set in dev-mode
  }
});