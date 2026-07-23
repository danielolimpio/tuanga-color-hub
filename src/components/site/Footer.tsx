import { Link } from "@tanstack/react-router";
import { categories, latestArticles } from "@/data/blog";

export function Footer() {
  const latest = latestArticles(3);
  return (
    <footer className="mt-24 border-t border-border bg-tc-surface">
      <div className="tc-container py-16 grid gap-12 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-tc-ink text-background font-display text-lg">
              T
            </span>
            <span className="font-display text-2xl">
              tuanga<span className="text-tc-crm">.</span>cor
            </span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Independent reviews and comparisons of B2B SaaS for small business.
            The color of clarity, one tool at a time.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Categories</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/category/${c.slug}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {c.name} — <span className="text-xs">{c.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Latest Posts</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {latest.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/blog/${a.slug}`}
                  className="text-muted-foreground hover:text-foreground line-clamp-2"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Sitemap</h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/glossary" className="hover:text-foreground">Glossary</Link></li>
            <li><a href="/sitemap.xml" className="hover:text-foreground">XML Sitemap</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="tc-container flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Tuanga Cor. All rights reserved.</div>
          <div>tuangacor.com — Independent SMB SaaS reviews</div>
        </div>
      </div>
    </footer>
  );
}
