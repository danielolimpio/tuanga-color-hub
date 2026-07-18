import { mostRead, categories } from "@/data/blog";
import { ArticleRow } from "@/components/site/ArticleCard";
import { Link } from "@tanstack/react-router";

export function Sidebar() {
  const popular = mostRead(5);
  return (
    <aside className="space-y-8 lg:sticky lg:top-24 self-start">
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display text-xl">Most Read</h3>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Trending now
          </span>
        </div>
        <div className="space-y-2">
          {popular.map((a, i) => (
            <ArticleRow key={a.slug} article={a} index={i} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-display text-xl mb-3">Explore Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: c.hex }}
            >
              #{c.name}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Reviews, comparisons and guides across the SMB SaaS stack.
        </p>
      </section>

      <section
        className="rounded-2xl p-6 text-white"
        style={{
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e293b 55%,#334155 100%)",
        }}
      >
        <h3 className="font-display text-xl">Get the Weekly Brief</h3>
        <p className="mt-1 text-sm text-white/70">
          One email. The best SMB SaaS reviews of the week.
        </p>
        <form className="mt-4 flex flex-col gap-2">
          <input
            aria-label="Your email address"
            type="email"
            placeholder="you@company.com"
            className="rounded-full bg-white/10 px-4 py-2 text-sm placeholder:text-white/50 outline-none ring-1 ring-white/20 focus:ring-white/60"
          />
          <button
            type="button"
            className="rounded-full bg-tc-crm px-4 py-2 text-sm font-semibold"
          >
            Subscribe free
          </button>
        </form>
      </section>
    </aside>
  );
}
