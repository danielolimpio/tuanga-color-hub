import { createFileRoute } from "@tanstack/react-router";
import { articles, categories } from "@/data/blog";

const BASE_URL = "https://tuangacor.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          { path: "/", priority: "1.0", changefreq: "daily" },
          { path: "/about", priority: "0.5", changefreq: "monthly" },
          { path: "/contact", priority: "0.5", changefreq: "monthly" },
          ...categories.map((c) => ({
            path: `/category/${c.slug}`,
            priority: "0.8",
            changefreq: "weekly",
          })),
          ...articles.map((a) => ({
            path: `/blog/${a.slug}`,
            lastmod: a.date,
            priority: "0.7",
            changefreq: "monthly",
          })),
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls.map((u) =>
            [
              "  <url>",
              `    <loc>${BASE_URL}${u.path}</loc>`,
              "lastmod" in u && u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
              `    <changefreq>${u.changefreq}</changefreq>`,
              `    <priority>${u.priority}</priority>`,
              "  </url>",
            ]
              .filter(Boolean)
              .join("\n"),
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
