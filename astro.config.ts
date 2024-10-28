import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
    site: SITE.website,
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        react(),
        sitemap(),
    ],
    markdown: {
        rehypePlugins: [rehypeKatex],
        remarkPlugins: [
            remarkAlert,
            remarkMath,
            remarkToc,
        ],
        shikiConfig: {
            // For more themes, visit https://shiki.style/themes
            themes: { light: "catppuccin-latte", dark: "catppuccin-mocha" },
            wrap: true,
        },
    },
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
    },
    scopedStyleStrategy: "where",
    experimental: {
        contentLayer: true,
    },
});
