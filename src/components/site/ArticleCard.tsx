import { Link } from "@tanstack/react-router";
import { Clock, Eye } from "lucide-react";
import {
  type Article,
  categoryBySlug,
  formatDate,
  formatViews,
} from "@/data/blog";

export function CategoryBadge({ slug, className = "" }: { slug: string; className?: string }) {
  const cat = categoryBySlug(slug);
  if (!cat) return null;
  return (
    <span
      className={`tc-badge ${className}`}
      style={{ backgroundColor: cat.hex }}
    >
      # {cat.name}
    </span>
  );
}

export function ArticleCard({
  article,
  size = "md",
}: {
  article: Article;
  size?: "sm" | "md" | "lg" | "hero";
}) {
  const heightMap = {
    sm: "h-40",
    md: "h-56",
    lg: "h-72",
    hero: "h-[420px] sm:h-[520px]",
  } as const;

  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:shadow-lg"
    >
      <div className={`relative w-full ${heightMap[size]} overflow-hidden`}>
        <img
          src={article.cover}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <CategoryBadge slug={article.category} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
          <h3
            className={`font-display leading-tight ${
              size === "hero"
                ? "text-3xl sm:text-4xl"
                : size === "lg"
                ? "text-2xl"
                : size === "sm"
                ? "text-base"
                : "text-xl"
            }`}
          >
            {article.title}
          </h3>
          <div className="mt-3 flex items-center gap-3 text-xs text-white/80">
            <img
              src={article.authorAvatar}
              alt=""
              className="h-6 w-6 rounded-full ring-2 ring-white/40"
            />
            <span>{article.author}</span>
            <span>·</span>
            <span>{formatDate(article.date)}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {article.readTime}m
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ArticleRow({
  article,
  index,
}: {
  article: Article;
  index?: number;
}) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group grid grid-cols-[80px_1fr] gap-3 rounded-xl p-2 transition hover:bg-muted"
    >
      <div className="relative h-16 w-20 overflow-hidden rounded-lg">
        <img
          src={article.cover}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {index !== undefined && (
          <span className="absolute top-1 left-1 grid h-5 w-5 place-items-center rounded-full bg-black/70 text-[10px] font-bold text-white">
            {index + 1}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <div className="mb-1">
          <CategoryBadge slug={article.category} />
        </div>
        <h4 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:underline">
          {article.title}
        </h4>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{formatDate(article.date)}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3 w-3" /> {formatViews(article.views)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function SectionTitle({
  title,
  subtitle,
  to,
}: {
  title: string;
  subtitle?: string;
  to?: string;
}) {
  return (
    <div className="tc-section-title">
      <div className="min-w-0">
        <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {to && (
        <Link
          to={to}
          className="shrink-0 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider hover:bg-muted"
        >
          Read more →
        </Link>
      )}
    </div>
  );
}
