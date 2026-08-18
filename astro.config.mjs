import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import remarkObsidianLinks from './src/lib/remark-obsidian-links';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: 'https://hakimshifat.me',
  markdown: {
    remarkPlugins: [remarkObsidianLinks],
  },
  output: 'static',
});
