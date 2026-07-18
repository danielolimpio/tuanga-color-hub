import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tuanga Cor" },
      {
        name: "description",
        content: "Get in touch with the Tuanga Cor editorial team about SMB SaaS reviews, tips and partnerships.",
      },
      { property: "og:title", content: "Contact Tuanga Cor" },
      { property: "og:description", content: "Reach the Tuanga Cor editorial team." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="tc-container py-16 max-w-2xl">
        <h1 className="font-display text-5xl mb-6">Contact</h1>
        <p className="text-muted-foreground mb-8">
          Tips, corrections, partnership questions — we read every message.
        </p>
        <form className="space-y-4">
          <input
            aria-label="Your name"
            className="w-full rounded-xl border border-border bg-card px-4 py-3"
            placeholder="Your name"
          />
          <input
            aria-label="Email"
            type="email"
            className="w-full rounded-xl border border-border bg-card px-4 py-3"
            placeholder="Email"
          />
          <textarea
            aria-label="Message"
            rows={6}
            className="w-full rounded-xl border border-border bg-card px-4 py-3"
            placeholder="Message"
          />
          <button
            type="button"
            className="rounded-full bg-tc-ink text-background px-6 py-3 font-semibold"
          >
            Send message
          </button>
        </form>
      </main>
      <Footer />
    </div>
  ),
});
