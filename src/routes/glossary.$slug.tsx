import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Clock, CalendarClock, User, ChevronRight, BookOpen, Lightbulb, AlertTriangle, Check, X, ArrowRight, Sparkles, Volume2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  glossaryBySlug,
  relatedTerms,
  categoryOf,
  termUrl,
} from "@/data/glossary";
import { articlesByCategory, formatDate } from "@/data/blog";

const BASE = "https://tuangacor.com";

export const Route = createFileRoute("/glossary/$slug")({
  loader: ({ params }) => {
    // URLs are /glossary/what-is-<slug>
    const raw = params.slug;
    const termSlug = raw.startsWith("what-is-") ? raw.slice("what-is-".length) : raw;
    const term = glossaryBySlug(termSlug);
    if (!term || !raw.startsWith("what-is-")) throw notFound();
    return {
      term,
      category: categoryOf(term.category)!,
      related: relatedTerms(term.slug, 4),
      pillarArticles: articlesByCategory(term.category).slice(0, 3),
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Term not found — Tuanga Cor Glossary" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { term, category } = loaderData;
    const url = `${BASE}/glossary/${params.slug}`;
    const title = `What is ${term.term}? Definition, Examples & FAQs`;
    const description = term.answer.slice(0, 158);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: `${term.term} — Definition & Guide` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:section", content: category.name },
        { property: "article:modified_time", content: term.lastUpdated },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${term.term} — Definition & Guide` },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            name: term.term,
            description: term.answer,
            url,
            inDefinedTermSet: {
              "@type": "DefinedTermSet",
              name: "Tuanga Cor Glossary",
              url: `${BASE}/glossary`,
            },
            termCode: term.slug,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: term.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
              { "@type": "ListItem", position: 2, name: "Glossary", item: `${BASE}/glossary` },
              { "@type": "ListItem", position: 3, name: term.term, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `What is ${term.term}?`,
            description: term.answer,
            author: { "@type": "Person", name: term.author },
            publisher: {
              "@type": "Organization",
              name: "Tuanga Cor",
              url: BASE,
            },
            dateModified: term.lastUpdated,
            mainEntityOfPage: url,
            about: { "@type": "DefinedTerm", name: term.term },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["#quick-answer", "#quick-summary"],
            },
          }),
        },
      ],
    };
  },
  component: TermPage,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <Header />
      <div className="tc-container py-24 text-center">
        <h1 className="font-display text-4xl">Term not found</h1>
        <p className="mt-3 text-muted-foreground">
          Try browsing the{" "}
          <Link to="/glossary" className="underline">
            full glossary
          </Link>
          .
        </p>
      </div>
      <Footer />
    </div>
  ),
});

function TermPage() {
  const { term, category, related, pillarArticles } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="tc-container mt-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight className="inline mx-1 h-3 w-3" />
          <Link to="/glossary" className="hover:underline">Glossary</Link>
          <ChevronRight className="inline mx-1 h-3 w-3" />
          <span className="text-foreground">{term.term}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <main>
            <header>
              <span
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold"
                style={{ color: category.hex }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: category.hex }}
                />
                {category.name}
              </span>
              <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight">
                {term.term}
              </h1>
              {term.synonyms && term.synonyms.length > 0 && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Also known as: {term.synonyms.join(", ")}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> {term.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5" /> Updated {formatDate(term.lastUpdated)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {term.readingTime} min read
                </span>
              </div>
            </header>

            {/* Quick answer (featured-snippet target) */}
            <section
              id="quick-answer"
              className="mt-8 rounded-3xl border border-border bg-tc-surface p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Volume2 className="h-4 w-4" />
                Quick answer
              </div>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl leading-tight">
                What is {term.term}?
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-foreground">
                {term.answer}
              </p>
            </section>

            {/* Definition */}
            <section className="mt-10">
              <h2 className="font-display text-3xl">Definition</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-foreground/90">
                {term.definition}
              </p>
            </section>

            {/* Key facts */}
            <section className="mt-10">
              <h2 className="font-display text-3xl">Key Facts</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {term.keyFacts.map((f, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: category.hex }}
                      />
                      <span>{f}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Quick summary callout */}
            <aside
              id="quick-summary"
              className="mt-10 rounded-2xl border-l-4 bg-muted/40 p-5"
              style={{ borderLeftColor: category.hex }}
            >
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Quick summary
              </div>
              <p className="mt-1 text-[17px] font-medium leading-relaxed">
                {term.quickSummary}
              </p>
            </aside>

            {/* Practical example */}
            <section className="mt-10">
              <h2 className="font-display text-3xl">Practical Example</h2>
              <div className="mt-3 rounded-2xl border border-dashed border-border bg-card p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <Lightbulb className="h-4 w-4" />
                  Real-world scenario
                </div>
                <p className="mt-2 text-[17px] leading-relaxed">
                  {term.practicalExample}
                </p>
              </div>
            </section>

            {/* Why it matters */}
            <section className="mt-10">
              <h2 className="font-display text-3xl">Why It Matters</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-foreground/90">
                {term.whyItMatters}
              </p>
            </section>

            {/* How it works */}
            <section className="mt-10">
              <h2 className="font-display text-3xl">How It Works</h2>
              <ol className="mt-4 space-y-3">
                {term.howItWorks.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-4 rounded-xl border border-border bg-card p-4"
                  >
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                      style={{ background: category.hex }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[16px] leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Advantages / Disadvantages */}
            <section className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-xl flex items-center gap-2">
                  <Check className="h-5 w-5 text-tc-finance" /> Advantages
                </h3>
                <ul className="mt-3 space-y-2 text-[15px]">
                  {term.advantages.map((a, i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-tc-finance" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {term.disadvantages && term.disadvantages.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-xl flex items-center gap-2">
                    <X className="h-5 w-5 text-tc-crm" /> Disadvantages
                  </h3>
                  <ul className="mt-3 space-y-2 text-[15px]">
                    {term.disadvantages.map((d, i) => (
                      <li key={i} className="flex gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-tc-crm" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Common mistakes */}
            <section className="mt-10">
              <h2 className="font-display text-3xl">Common Mistakes</h2>
              <ul className="mt-4 space-y-2">
                {term.commonMistakes.map((m, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <AlertTriangle
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: "var(--tc-productivity)" }}
                    />
                    <span className="text-[15px] leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQs — accordion */}
            <section className="mt-10">
              <h2 className="font-display text-3xl">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-3">
                {term.faqs.map((f, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm"
                  >
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-lg leading-snug">{f.q}</h3>
                        <ChevronRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-open:rotate-90" />
                      </div>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Deep Dive — pillar articles */}
            {pillarArticles.length > 0 && (
              <section className="mt-14 rounded-3xl border border-border bg-tc-surface p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  Deep dive
                </div>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                  Continue learning about {category.name.toLowerCase()}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Hand-picked long-form guides that go beyond the definition.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {pillarArticles.map((a) => (
                    <Link
                      key={a.slug}
                      to={`/blog/${a.slug}`}
                      className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition"
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={a.cover}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: category.hex }}>
                          {category.name}
                        </div>
                        <div className="mt-1 font-display text-base leading-snug line-clamp-2">
                          {a.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related terms */}
            {related.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-3xl">Related Terms</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to={termUrl(r.slug)}
                      className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover:shadow-md transition"
                    >
                      <div>
                        <div className="font-display text-lg">{r.term}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {r.short}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Further reading + Last updated */}
            {term.furtherReading && term.furtherReading.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-3xl">Further Reading</h2>
                <ul className="mt-4 space-y-2 text-[15px]">
                  {term.furtherReading.map((r, i) => (
                    <li key={i}>
                      <Link
                        to={r.href}
                        className="inline-flex items-center gap-2 text-foreground hover:underline"
                      >
                        <ArrowRight className="h-4 w-4" />
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <footer className="mt-14 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span>
                  Last updated <strong className="text-foreground">{formatDate(term.lastUpdated)}</strong> · Reviewed by{" "}
                  <strong className="text-foreground">{term.author}</strong>
                </span>
                <Link
                  to="/glossary"
                  className="inline-flex items-center gap-1 font-semibold text-foreground hover:underline"
                >
                  Back to glossary <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </footer>
          </main>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 self-start space-y-6">
            <nav
              aria-label="On this page"
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                On this page
              </div>
              <ul className="space-y-2 text-sm">
                <TocLink href="#quick-answer" label={`What is ${term.term}?`} />
                <TocLink href="#quick-summary" label="Quick summary" />
              </ul>
            </nav>

            {related.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Related terms
                </div>
                <ul className="space-y-2 text-sm">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to={termUrl(r.slug)}
                        className="hover:underline font-medium"
                      >
                        {r.term}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="rounded-2xl p-5 text-white"
              style={{ background: category.hex }}
            >
              <div className="text-xs uppercase tracking-wider opacity-80">
                Explore
              </div>
              <div className="mt-1 font-display text-xl leading-tight">
                All {category.name} guides
              </div>
              <p className="mt-2 text-sm opacity-90">{category.description}</p>
              <Link
                to={`/category/${category.slug}`}
                className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-semibold transition"
              >
                Browse category <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  );
}

function TocLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        className="text-muted-foreground hover:text-foreground transition"
      >
        {label}
      </a>
    </li>
  );
}
