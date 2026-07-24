// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { glossarySlugsAll } from "./src/data/glossary";

const isHostingerStaticBuild = process.env.HOSTINGER_STATIC === "true";

const categorySlugs = ["crm", "marketing", "finance", "productivity", "e-commerce"];

const articleSlugs = [
  "best-crm-for-small-business-2026",
  "hubspot-vs-pipedrive-comparison",
  "crm-for-real-estate-agents",
  "best-email-marketing-software-small-business",
  "marketing-automation-tools-comparison",
  "seo-tools-for-agencies",
  "best-accounting-software-for-freelancers",
  "invoicing-tools-for-small-business",
  "payroll-software-comparison",
  "best-project-management-software-small-teams",
  "task-management-tools-comparison",
  "collaboration-platforms-remote-work",
  "best-ecommerce-platform-small-business",
  "shopify-vs-woocommerce-comparison",
  "payment-gateway-for-startups",
];

import { glossarySlugsAll } from "./src/data/glossary";
const glossarySlugs = glossarySlugsAll;

const staticPages = [
  "/",
  "/about",
  "/contact",
  "/glossary",
  "/sitemap.xml",
  ...categorySlugs.map((slug) => `/category/${slug}`),
  ...articleSlugs.map((slug) => `/blog/${slug}`),
  ...glossarySlugs.map((slug) => `/glossary/what-is-${slug}`),
].map((path) => ({ path }));

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isHostingerStaticBuild
      ? {
          pages: staticPages,
          prerender: {
            enabled: true,
            autoStaticPathsDiscovery: false,
            crawlLinks: true,
            failOnError: true,
          },
        }
      : {}),
  },
  // Hostinger shared hosting needs plain static files. Disable the server deploy
  // bundler only in GitHub Actions and emit the browser/prerendered output into ./dist.
  nitro: isHostingerStaticBuild ? false : undefined,
  vite: isHostingerStaticBuild
    ? {
        environments: {
          client: { build: { outDir: "dist" } },
          ssr: { build: { outDir: ".tanstack/server" } },
        },
      }
    : undefined,
});

