import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://wyliefisher.com',
  integrations: [mdx(), sitemap(), react({
    config: {
      forward: ["dataLayer.push"],
    },}), partytown()],
  vite: {
    assetsInclude: ['**/*.docx']
  }
});