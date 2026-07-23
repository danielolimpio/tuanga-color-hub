import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, TrendingUp, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  alphabet,
  glossaryTerms,
  popularTerms,
  trendingTerms,
  recentTerms,
  termsByLetter,
  termUrl,
  categoryOf,
} from "@/data/glossary";
import { categories } from "@/data/blog";

const CANON = "https://tuangacor.com/glossary";

export const Route = createFileRoute("/glossary/")({
  head: () => ({
    meta: [
      { title: "Glossary — B2B SaaS Terms Explained | Tuanga Cor" },
      {
        name: "description",
        content:
          "The Tuanga Cor Glossary: clear, expert definitions of B2B SaaS terms across CRM, marketing, finance, productivity and e-commerce for small businesses.",
      },
      { property: "og:title", content: "B2B SaaS Glossary for Small Business" },
      {
        property: "og:description",
        content:
          "Search 100+ B2B SaaS terms with definitions, examples, and further reading — curated for small business owners.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANON },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "B2B SaaS Glossary for Small Business" },
      {
        name: "twitter:description",
        content:
          "Search 100+ B2B SaaS terms with definitions, examples, and further reading.",
      },
    ],
    links: [{ rel: "canonical", href: CANON }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Tuanga Cor Glossary",
          url: CANON,
          potentialAction: {
            "@type": "SearchAction",
            target: `${CANON}?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://tuangacor.com/" },
            { "@type": "ListItem", position: 2, name: "Glossary", item: CANON },
          ],
        }),
      },
    ],
  }),
  component: GlossaryHub,
});

function GlossaryHub() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossaryTerms.filter((t) => {
      if (cat !== "all" && t.category !== cat) return false;
      if (!q) return true;
      return (
        t.term.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        (t.synonyms ?? []).some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [query, cat]);

  const byLetter = useMemo(() => termsByLetter(), []);
  const activeLetters = new Set(
    alphabet.filter((l) => byLetter[l].length > 0),
  );

  const popular = popularTerms();
  const trending = trendingTerms();
  const recent = recentTerms(6);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-tc-surface">
        <div className="tc-container py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-foreground">Glossary</span>
          </nav>
          <div className="max-w-3xl">
            <span className="tc-badge" style={{ background: "var(--tc-ink)" }}>
              Glossary Hub
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              The B2B SaaS Glossary for Small Business
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Plain-English definitions of the CRM, marketing, finance,
              productivity and e-commerce terms every small business owner runs
              into. Curated, cross-linked and updated by the Tuanga Cor
              editorial team.
            </p>

            <div className="mt-8 relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search terms — try 'CRM', 'cash flow', 'SEO'…"
                aria-label="Search glossary terms"
                className="w-full rounded-2xl border border-border bg-background pl-12 pr-4 py-4 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <FilterChip
                active={cat === "all"}
                onClick={() => setCat("all")}
                label={`All (${glossaryTerms.length})`}
              />
              {categories.map((c) => {
                const count = glossaryTerms.filter((t) => t.category === c.slug).length;
                return (
                  <FilterChip
                    key={c.slug}
                    active={cat === c.slug}
                    onClick={() => setCat(c.slug)}
                    label={`${c.name} (${count})`}
                    dot={c.hex}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="tc-container py-12 grid gap-10 lg:grid-cols-[1fr_280px]">
        <main>
          {/* When searching / filtering, show a flat list */}
          {(query.trim() || cat !== "all") && (
            <section className="mb-12">
              <SectionHeading
                icon={<Search className="h-4 w-4" />}
                eyebrow="Results"
                title={`${filtered.length} term${filtered.length === 1 ? "" : "s"} found`}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map((t) => (
                  <TermCard key={t.slug} slug={t.slug} term={t.term} short={t.short} category={t.category} />
                ))}
                {filtered.length === 0 && (
                  <p className="text-muted-foreground">No terms match your search.</p>
                )}
              </div>
            </section>
          )}

          {/* Curated shelves shown only when browsing */}
          {!(query.trim() || cat !== "all") && (
            <>
              {trending.length > 0 && (
                <section className="mb-14">
                  <SectionHeading
                    icon={<TrendingUp className="h-4 w-4" />}
                    eyebrow="Trending"
                    title="Terms in the spotlight right now"
                  />
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {trending.map((t) => (
                      <TermCard key={t.slug} slug={t.slug} term={t.term} short={t.short} category={t.category} highlight />
                    ))}
                  </div>
                </section>
              )}

              {popular.length > 0 && (
                <section className="mb-14">
                  <SectionHeading
                    icon={<Sparkles className="h-4 w-4" />}
                    eyebrow="Popular"
                    title="Most-searched B2B SaaS definitions"
                  />
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {popular.map((t) => (
                      <TermCard key={t.slug} slug={t.slug} term={t.term} short={t.short} category={t.category} />
                    ))}
                  </div>
                </section>
              )}

              {/* A–Z Index */}
              <section id="a-z" className="mb-6 scroll-mt-24">
                <SectionHeading
                  icon={<BookOpen className="h-4 w-4" />}
                  eyebrow="Full index"
                  title="Browse every term A → Z"
                />
              </section>

              {alphabet.map((letter) => {
                const items = byLetter[letter];
                if (!items.length) return null;
                return (
                  <section key={letter} id={`letter-${letter}`} className="mb-10 scroll-mt-24">
                    <div className="flex items-baseline gap-4 border-b border-border pb-2 mb-4">
                      <h2 className="font-display text-3xl leading-none">{letter}</h2>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {items.length} term{items.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {items.map((t) => (
                        <TermCard key={t.slug} slug={t.slug} term={t.term} short={t.short} category={t.category} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </>
          )}
        </main>

        {/* Sidebar — A–Z fixed on desktop */}
        <aside className="lg:sticky lg:top-24 self-start space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Jump to letter
            </div>
            <div
              className="grid grid-cols-7 gap-1 text-sm font-semibold"
              role="navigation"
              aria-label="Alphabet index"
            >
              {alphabet.map((letter) => {
                const active = activeLetters.has(letter);
                return active ? (
                  <a
                    key={letter}
                    href={`#letter-${letter}`}
                    className="grid h-8 place-items-center rounded-lg hover:bg-muted transition"
                    aria-label={`Jump to terms starting with ${letter}`}
                  >
                    {letter}
                  </a>
                ) : (
                  <span
                    key={letter}
                    aria-disabled="true"
                    className="grid h-8 place-items-center rounded-lg text-muted-foreground/40 cursor-not-allowed"
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Recently updated
            </div>
            <ul className="space-y-3">
              {recent.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={termUrl(t.slug)}
                    className="group flex items-start gap-2 text-sm"
                  >
                    <ArrowRight className="mt-1 h-3 w-3 text-muted-foreground group-hover:text-foreground transition" />
                    <span>
                      <span className="font-semibold">{t.term}</span>
                      <span className="block text-xs text-muted-foreground">
                        {t.short}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-tc-surface p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              By category
            </div>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <button
                    onClick={() => setCat(c.slug)}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: c.hex }}
                    />
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  dot?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "bg-foreground text-background border-foreground"
          : "border-border bg-background hover:bg-muted"
      }`}
    >
      {dot && (
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: dot }}
        />
      )}
      {label}
    </button>
  );
}

function SectionHeading({
  icon,
  eyebrow,
  title,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-5">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        {icon}
        {eyebrow}
      </div>
      <h2 className="mt-1 font-display text-2xl sm:text-3xl">{title}</h2>
    </div>
  );
}

function TermCard({
  slug,
  term,
  short,
  category,
  highlight,
}: {
  slug: string;
  term: string;
  short: string;
  category: string;
  highlight?: boolean;
}) {
  const cat = categoryOf(category);
  return (
    <Link
      to={termUrl(slug)}
      className={`group block rounded-2xl border p-5 transition hover:shadow-md ${
        highlight
          ? "border-foreground/20 bg-tc-surface"
          : "border-border bg-card"
      }`}
    >
      <div className="flex items-center justify-between">
        {cat && (
          <span
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold"
            style={{ color: cat.hex }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: cat.hex }}
            />
            {cat.name}
          </span>
        )}
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" />
      </div>
      <div className="mt-2 font-display text-xl leading-tight">{term}</div>
      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{short}</p>
    </Link>
  );
}
