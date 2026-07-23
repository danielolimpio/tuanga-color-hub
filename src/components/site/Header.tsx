import { Link } from "@tanstack/react-router";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/blog";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="tc-container flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-tc-ink text-background font-display text-lg">
            T
          </span>
          <span className="font-display text-2xl leading-none">
            tuanga<span className="text-tc-crm">.</span>cor
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavItem to="/" label="Home" />
          {categories.map((c) => (
            <NavItem
              key={c.slug}
              to={`/category/${c.slug}`}
              label={c.name}
              tagline={c.tagline}
              dot={c.hex}
            />
          ))}
          <NavItem to="/glossary" label="Glossary" tagline="B2B SaaS Terms A–Z" />
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-muted transition"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="tc-container py-4 flex flex-col gap-1">
            <MobileItem to="/" label="Home" onClick={() => setOpen(false)} />
            {categories.map((c) => (
              <MobileItem
                key={c.slug}
                to={`/category/${c.slug}`}
                label={c.name}
                tagline={c.tagline}
                dot={c.hex}
                onClick={() => setOpen(false)}
              />
            ))}
            <MobileItem to="/glossary" label="Glossary" tagline="B2B SaaS Terms A–Z" onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({
  to,
  label,
  tagline,
  dot,
}: {
  to: string;
  label: string;
  tagline?: string;
  dot?: string;
}) {
  return (
    <Link
      to={to}
      className="group relative rounded-xl px-3 py-2 text-left transition hover:bg-muted"
      activeProps={{ className: "bg-muted" }}
      activeOptions={{ exact: to === "/" }}
    >
      <div className="flex items-center gap-2 text-sm font-semibold leading-tight">
        {dot && (
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: dot }}
          />
        )}
        {label}
      </div>
      {tagline && (
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
          {tagline}
        </div>
      )}
    </Link>
  );
}

function MobileItem({
  to,
  label,
  tagline,
  dot,
  onClick,
}: {
  to: string;
  label: string;
  tagline?: string;
  dot?: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="rounded-lg px-3 py-3 hover:bg-muted"
    >
      <div className="flex items-center gap-2 font-semibold">
        {dot && (
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: dot }}
          />
        )}
        {label}
      </div>
      {tagline && (
        <div className="text-xs text-muted-foreground mt-0.5">{tagline}</div>
      )}
    </Link>
  );
}
