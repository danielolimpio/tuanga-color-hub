import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Clock, Eye } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Sidebar } from "@/components/site/Sidebar";
import { ArticleCard, CategoryBadge } from "@/components/site/ArticleCard";
import {
  articleBySlug,
  categoryBySlug,
  formatDate,
  formatViews,
  relatedArticles,
} from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return {
      article,
      category: categoryBySlug(article.category)!,
      related: relatedArticles(params.slug, 3),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { article, category } = loaderData;
    return {
      meta: [
        { title: `${article.title} | Tuanga Cor` },
        { name: "description", content: article.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:image", content: article.cover },
        { property: "article:section", content: category.name },
        { property: "article:published_time", content: article.date },
        { name: "twitter:image", content: article.cover },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: [article.cover],
            datePublished: article.date,
            author: [{ "@type": "Person", name: article.author }],
            publisher: {
              "@type": "Organization",
              name: "Tuanga Cor",
            },
            articleSection: category.name,
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <Header />
      <div className="tc-container py-24 text-center">
        <h1 className="font-display text-4xl">Article not found</h1>
      </div>
      <Footer />
    </div>
  ),
});

function ArticlePage() {
  const { article, category, related } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="tc-container mt-8">
        <nav className="text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to={`/category/${category.slug}`} className="hover:underline">
            {category.name}
          </Link>
          <span className="mx-1">/</span>
          <span className="text-foreground">{article.title}</span>
        </nav>

        <header className="max-w-3xl">
          <CategoryBadge slug={article.category} />
          <h1 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <img
              src={article.authorAvatar}
              alt=""
              className="h-9 w-9 rounded-full ring-2 ring-border"
            />
            <span className="font-semibold text-foreground">{article.author}</span>
            <span>·</span>
            <span>{formatDate(article.date)}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {article.readTime} min read
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {formatViews(article.views)}
            </span>
          </div>
        </header>

        <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl">
          <img
            src={article.cover}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="prose prose-neutral max-w-none">
            {article.content.map((p: string, i: number) => (
              <p
                key={i}
                className="mb-5 text-[17px] leading-relaxed text-foreground/90"
              >
                {p}
              </p>
            ))}

            <div className="mt-10 rounded-2xl border border-border bg-card p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Filed under
              </div>
              <Link
                to={`/category/${category.slug}`}
                className="mt-1 inline-block font-display text-2xl hover:underline"
              >
                {category.name} — {category.tagline}
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
          </div>
          <Sidebar />
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-3xl mb-6">Related in {category.name}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a: any) => (
                <ArticleCard key={a.slug} article={a} size="md" />
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
