import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  ArticleCard,
  ArticleRow,
  CategoryBadge,
  SectionTitle,
} from "@/components/site/ArticleCard";
import { Sidebar } from "@/components/site/Sidebar";
import {
  articles,
  categories,
  editorsChoiceArticles,
  featuredArticles,
  formatDate,
  latestArticles,
  trendingArticles,
} from "@/data/blog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Tuanga Cor — B2B SaaS Reviews for Small Business (CRM, Marketing, Finance)",
      },
      {
        name: "description",
        content:
          "Independent SMB SaaS reviews and comparisons. Find the best CRM, marketing, finance, productivity and e-commerce tools for your small business.",
      },
      {
        property: "og:title",
        content: "Tuanga Cor — B2B SaaS Reviews for Small Business (CRM, Marketing, Finance)",
      },
      {
        property: "og:description",
        content:
          "Independent SMB SaaS reviews and comparisons. Find the best CRM, marketing, finance, productivity and e-commerce tools for your small business.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const heroPicks = featuredArticles().slice(0, 5);
  const daily = articles.slice(0, 5);
  const trending = trendingArticles().slice(0, 2);
  const editors = editorsChoiceArticles();
  const buzz = articles.slice(5, 13);
  const featured = latestArticles(4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroCarousel items={heroPicks} />

      <main className="tc-container mt-16 space-y-20">
        {/* Daily Discoveries */}
        <section>
          <SectionTitle
            title="Daily Discoveries"
            subtitle="New Things We Learn"
            to="/category/crm"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ArticleCard article={daily[0]} size="lg" />
            </div>
            <div className="lg:col-span-5">
              <ColorPanel article={daily[1]} />
            </div>
            <div className="lg:col-span-4">
              <ArticleCard article={daily[2]} size="md" />
            </div>
            <div className="lg:col-span-4">
              <ArticleCard article={daily[3]} size="md" />
            </div>
            <div className="lg:col-span-4">
              <ArticleCard article={daily[4]} size="md" />
            </div>
          </div>
        </section>

        {/* Trending Posts */}
        <section>
          <SectionTitle
            title="Trending Posts"
            subtitle="You're not the only one"
            to="/category/marketing"
          />
          <div className="grid gap-5 md:grid-cols-2">
            <ArticleCard article={trending[0]} size="lg" />
            <div className="rounded-2xl bg-tc-panel p-8 flex flex-col justify-between">
              <div>
                <CategoryBadge slug={trending[1]?.category ?? "marketing"} />
                <h3 className="mt-4 font-display text-3xl leading-tight">
                  {trending[1]?.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-4">
                  {trending[1]?.excerpt}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span>{trending[1] && formatDate(trending[1].date)}</span>
                <Link
                  to={`/blog/${trending[1]?.slug}`}
                  className="rounded-full border border-border bg-background px-4 py-1.5 font-semibold hover:bg-muted"
                >
                  Read →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Editor's Choice */}
        <section>
          <SectionTitle
            title="Editor's Choice"
            subtitle="Our Best Stories"
            to="/category/finance"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <ArticleCard article={editors[0]} size="hero" />
            <div className="grid gap-3 content-start">
              {editors.slice(1, 5).map((a, i) => (
                <div
                  key={a.slug}
                  className="rounded-2xl border border-border bg-card p-3"
                >
                  <ArticleRow article={a} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Buzz Chronicles */}
        <section>
          <SectionTitle
            title="Buzz Chronicles"
            subtitle="Exploring Stories That Resonate"
            to="/category/productivity"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {buzz.map((a) => (
              <ArticleCard key={a.slug} article={a} size="md" />
            ))}
          </div>
        </section>

        {/* Featured Articles + Sidebar */}
        <section className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionTitle
              title="Featured Articles"
              subtitle="Thoughtful Trends in Focus"
              to="/category/e-commerce"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {featured.map((a) => (
                <ArticleCard key={a.slug} article={a} size="md" />
              ))}
            </div>
          </div>
          <Sidebar />
        </section>

        {/* Explore Categories */}
        <section>
          <SectionTitle
            title="Explore Categories"
            subtitle="Indulge in Your Interests"
          />
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => {
              const count = articles.filter((a) => a.category === c.slug).length;
              return (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  className="group relative overflow-hidden rounded-2xl h-40 shadow-sm ring-1 ring-border"
                  style={{
                    background: `linear-gradient(160deg, ${c.hex}22, ${c.hex}66)`,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 70% 30%, ${c.hex}55, transparent 60%)`,
                    }}
                  />
                  <div className="relative h-full p-4 flex flex-col justify-between">
                    <span
                      className="tc-badge self-start"
                      style={{ backgroundColor: c.hex }}
                    >
                      {c.name}
                    </span>
                    <div>
                      <div className="font-display text-lg leading-tight">
                        {c.tagline}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {count} posts
                        </span>
                        <span className="rounded-full bg-background/70 px-2 py-0.5 font-semibold">
                          See all →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Newsletter */}
        <section
          className="rounded-3xl overflow-hidden relative p-10 sm:p-16 text-white text-center"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, #6366f155 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ec489955 0%, transparent 50%), linear-gradient(135deg,#0f172a,#1e1b4b)",
          }}
        >
          <h2 className="font-display text-4xl sm:text-5xl">
            Stay Informed with Our Newsletter
          </h2>
          <p className="mt-3 text-white/70">
            Get the latest updates delivered to your inbox.
          </p>
          <form className="mt-6 mx-auto flex max-w-md flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full bg-white/10 px-4 py-3 text-sm placeholder:text-white/50 ring-1 ring-white/20 outline-none focus:ring-white/60"
            />
            <button
              type="button"
              className="rounded-full bg-tc-crm px-6 py-3 text-sm font-semibold"
            >
              Join Us
            </button>
          </form>
          <label className="mt-3 inline-flex items-center gap-2 text-xs text-white/60">
            <input type="checkbox" className="accent-tc-crm" /> I have read and
            agree to the terms & conditions
          </label>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ColorPanel({ article }: { article: (typeof articles)[number] }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl p-6 text-white"
      style={{
        background:
          "linear-gradient(135deg,#0f766e 0%,#0d9488 50%,#14b8a6 100%)",
      }}
    >
      <CategoryBadge slug={article.category} className="self-start bg-white/20" />
      <div>
        <h3 className="font-display text-2xl leading-tight">{article.title}</h3>
        <div className="mt-3 flex items-center gap-2 text-xs text-white/80">
          <img src={article.authorAvatar} alt="" className="h-6 w-6 rounded-full" />
          <span>{article.author}</span>
          <span>·</span>
          <span>{formatDate(article.date)}</span>
        </div>
      </div>
    </Link>
  );
}

function HeroCarousel({ items }: { items: (typeof articles) }) {
  const [i, setI] = useState(0);
  const active = items[i];
  if (!active) return null;
  const prev = () => setI((i - 1 + items.length) % items.length);
  const next = () => setI((i + 1) % items.length);

  return (
    <section className="tc-container mt-6">
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: "linear-gradient(160deg,#1f2937,#0f172a)",
        }}
      >
        <div className="relative h-[520px] sm:h-[560px]">
          <img
            src={active.cover}
            alt={active.title}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10 text-white">
            <div>
              <CategoryBadge slug={active.category} className="bg-teal-500" />
              <h1 className="mt-4 max-w-2xl font-display text-4xl sm:text-5xl leading-tight">
                {active.title}
              </h1>
              <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
                <img
                  src={active.authorAvatar}
                  alt=""
                  className="h-8 w-8 rounded-full ring-2 ring-white/50"
                />
                <span>{active.author}</span>
                <span>·</span>
                <span>{formatDate(active.date)}</span>
              </div>
              <Link
                to={`/blog/${active.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2 text-sm font-semibold"
              >
                Read article →
              </Link>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
                {items.slice(0, 4).map((it, idx) => (
                  <button
                    key={it.slug}
                    onClick={() => setI(idx)}
                    className={`group flex items-center gap-2 rounded-xl p-2 text-left transition ${
                      idx === i
                        ? "bg-white/20 ring-1 ring-white/40"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <img
                      src={it.cover}
                      alt=""
                      className="h-10 w-14 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-white/60">
                        # {it.category}
                      </div>
                      <div className="line-clamp-2 text-xs font-semibold">
                        {it.title}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/15 hover:bg-white/25"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/15 hover:bg-white/25"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
