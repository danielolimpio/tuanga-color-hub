import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tuanga Cor — Independent SMB SaaS Reviews" },
      {
        name: "description",
        content:
          "Tuanga Cor is an independent publication reviewing B2B software for small business. Learn about our editorial standards and testing methodology.",
      },
      { property: "og:title", content: "About Tuanga Cor" },
      {
        property: "og:description",
        content: "Independent reviews of SMB SaaS you can trust.",
      },
      { property: "og:url", content: "https://tuangacor.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://tuangacor.com/about" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="tc-container py-16 max-w-3xl">
        <h1 className="font-display text-5xl mb-6">About Tuanga Cor</h1>
        <div className="space-y-5 text-lg text-foreground/90">
          <p>
            Tuanga Cor is an independent magazine reviewing B2B software for
            small business. The name means "the color of tuning" — we tune our
            recommendations to the real texture of small-team work.
          </p>
          <p>
            We cover five domains: CRM, Marketing, Finance, Productivity, and
            E-commerce. Every review is hands-on. Every comparison is done on
            live workflows, not marketing sheets.
          </p>
          <p>
            We accept no editorial payment from vendors. When a link is
            affiliate we mark it clearly, and it never changes our ranking.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  ),
});
