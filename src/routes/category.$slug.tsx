import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Sidebar } from "@/components/site/Sidebar";
import { ArticleCard } from "@/components/site/ArticleCard";
import { articlesByCategory, categoryBySlug } from "@/data/blog";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = categoryBySlug(params.slug);
    if (!cat) throw notFound();
    return { cat, posts: articlesByCategory(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found" }, { name: "robots", content: "noindex" }] };
    }
    const { cat } = loaderData;
    return {
      meta: [
        { title: `${cat.name} — ${cat.tagline} | Tuanga Cor` },
        { name: "description", content: cat.description },
        { property: "og:title", content: `${cat.name} — ${cat.tagline}` },
        { property: "og:description", content: cat.description },
        { rel: "canonical", href: `/category/${cat.slug}` },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <Header />
      <div className="tc-container py-24 text-center">
        <h1 className="font-display text-4xl">Category not found</h1>
      </div>
      <Footer />
    </div>
  ),
});

function CategoryPage() {
  const { cat, posts } = Route.useLoaderData();
  const [hero, ...rest] = posts;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <header
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${cat.hex}22, transparent 60%), linear-gradient(180deg, var(--tc-surface), transparent)`,
        }}
      >
        <div className="tc-container py-16">
          <span
            className="tc-badge"
            style={{ backgroundColor: cat.hex }}
          >
            #{cat.name}
          </span>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl leading-tight">
            {cat.tagline}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{cat.description}</p>
          <div className="mt-3 text-xs text-muted-foreground">
            {posts.length} article{posts.length !== 1 ? "s" : ""} in this category
          </div>
        </div>
      </header>

      <main className="tc-container mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          {hero && <ArticleCard article={hero} size="hero" />}
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} size="md" />
            ))}
          </div>
        </div>
        <Sidebar />
      </main>

      <Footer />
    </div>
  );
}
