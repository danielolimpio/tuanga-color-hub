export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: string; // tailwind bg class token
  hex: string;
};

export const categories: Category[] = [
  {
    slug: "crm",
    name: "CRM",
    tagline: "CRM & Sales Tools",
    description:
      "Reviews and comparisons of customer relationship management and sales automation software for small business.",
    accent: "bg-tc-crm",
    hex: "#ef4444",
  },
  {
    slug: "marketing",
    name: "Marketing",
    tagline: "Marketing & Automation",
    description:
      "Email marketing, automation, SEO, analytics and branding tools reviewed for growing SMBs.",
    accent: "bg-tc-marketing",
    hex: "#8b5cf6",
  },
  {
    slug: "finance",
    name: "Finance",
    tagline: "Finance & Accounting",
    description:
      "Accounting, invoicing, payroll and cash-flow software for freelancers and small businesses.",
    accent: "bg-tc-finance",
    hex: "#10b981",
  },
  {
    slug: "productivity",
    name: "Productivity",
    tagline: "Productivity & Project Management",
    description:
      "Task management, collaboration and communication tools for remote teams and SMBs.",
    accent: "bg-tc-productivity",
    hex: "#f59e0b",
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    tagline: "E-commerce & Online Sales",
    description:
      "E-commerce platforms, payment gateways, inventory and conversion tools for online sellers.",
    accent: "bg-tc-ecommerce",
    hex: "#0ea5e9",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string; // slug
  author: string;
  authorAvatar: string;
  date: string; // ISO
  readTime: number;
  cover: string;
  views: number;
  featured?: boolean;
  trending?: boolean;
  editorsChoice?: boolean;
  content: string[];
};

// Unsplash source images (free, hotlinkable)
const img = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const AVATARS = [
  "https://i.pravatar.cc/120?img=32",
  "https://i.pravatar.cc/120?img=47",
  "https://i.pravatar.cc/120?img=12",
  "https://i.pravatar.cc/120?img=68",
  "https://i.pravatar.cc/120?img=5",
];

const AUTHORS = [
  "Anastasia Doe",
  "Kate White",
  "Anna Frank",
  "Marcus Reed",
  "Elena Ortiz",
];

const bodyFor = (topic: string, keywords: string[]) => [
  `When small businesses evaluate ${topic}, the difference between a tool that accelerates growth and one that quietly drains hours often comes down to interface clarity, integration depth, and how forgiving the pricing curve feels as the team scales. In this guide we break down what actually matters, using real workflows rather than feature checklists.`,
  `Our shortlist focuses on ${keywords[0]}, tested across teams of two to fifty. We looked at time-to-first-value, quality of support, and how each platform handles the messy middle: partial data, changing processes, and the reporting a founder actually reads on a Monday morning.`,
  `Setup should feel like unpacking a well-designed product, not assembling flat-pack furniture. The tools we recommend guide you through a first import, a first automation, and a first report in under an hour. Anything longer and adoption suffers.`,
  `Pricing transparency matters more than headline prices. We flag platforms that charge per seat but gate essential features behind higher tiers, and we highlight vendors whose free tier is genuinely usable — not just a trial in disguise.`,
  `For teams already using ${keywords[1] ?? "adjacent tools"}, integrations are the deciding factor. Native connectors beat Zapier hops, and open APIs future-proof your stack. Look for webhooks, granular permissions, and audit logs even on entry plans.`,
  `Our verdict: pick the tool that shortens the loop between insight and action. Every category has a leader, but the right choice for your business depends on the volume of data you're moving and the maturity of your process. Bookmark this guide and revisit it before renewal season.`,
];

export const articles: Article[] = [
  // CRM
  {
    slug: "best-crm-for-small-business-2026",
    title: "Best CRM for Small Business in 2026: Ranked & Reviewed",
    excerpt:
      "We tested 14 CRMs across real sales pipelines. Here are the platforms that actually help SMBs close more deals.",
    category: "crm",
    author: AUTHORS[0],
    authorAvatar: AVATARS[0],
    date: "2026-07-10",
    readTime: 12,
    cover: img("photo-1552664730-d307ca884978"),
    views: 24800,
    featured: true,
    trending: true,
    editorsChoice: true,
    content: bodyFor("a CRM", ["best CRM for small business", "email marketing"]),
  },
  {
    slug: "hubspot-vs-pipedrive-comparison",
    title: "HubSpot vs Pipedrive: Which CRM Wins for Growing Teams?",
    excerpt:
      "Feature-by-feature breakdown of two of the most popular SMB CRMs, with pricing math and real onboarding times.",
    category: "crm",
    author: AUTHORS[1],
    authorAvatar: AVATARS[1],
    date: "2026-07-05",
    readTime: 10,
    cover: img("photo-1460925895917-afdab827c52f"),
    views: 18200,
    trending: true,
    content: bodyFor("HubSpot vs Pipedrive", ["HubSpot vs Pipedrive", "sales automation"]),
  },
  {
    slug: "crm-for-real-estate-agents",
    title: "The 7 Best CRMs for Real Estate Agents in 2026",
    excerpt:
      "Lead capture, drip campaigns, and MLS integration — the CRMs realtors are actually renewing this year.",
    category: "crm",
    author: AUTHORS[2],
    authorAvatar: AVATARS[2],
    date: "2026-06-28",
    readTime: 9,
    cover: img("photo-1560518883-ce09059eeffa"),
    views: 15600,
    editorsChoice: true,
    content: bodyFor("real-estate CRMs", ["CRM for real estate agents", "lead nurturing"]),
  },

  // Marketing
  {
    slug: "best-email-marketing-software-small-business",
    title: "Best Email Marketing Software for Small Business",
    excerpt:
      "Deliverability, automations, and pricing at scale — the platforms worth your list in 2026.",
    category: "marketing",
    author: AUTHORS[3],
    authorAvatar: AVATARS[3],
    date: "2026-07-12",
    readTime: 11,
    cover: img("photo-1526628953301-3e589a6a8b74"),
    views: 21400,
    featured: true,
    trending: true,
    content: bodyFor("email marketing platforms", ["best email marketing software", "automation"]),
  },
  {
    slug: "marketing-automation-tools-comparison",
    title: "Marketing Automation Tools Compared: Which Fits Your Funnel?",
    excerpt:
      "From ActiveCampaign to Customer.io — a hands-on comparison of the automation platforms SMBs actually stick with.",
    category: "marketing",
    author: AUTHORS[4],
    authorAvatar: AVATARS[4],
    date: "2026-07-02",
    readTime: 13,
    cover: img("photo-1533750349088-cd871a92f312"),
    views: 17300,
    editorsChoice: true,
    content: bodyFor("marketing automation", ["marketing automation tools comparison", "CRM"]),
  },
  {
    slug: "seo-tools-for-agencies",
    title: "The SEO Tools Agencies Rely On (and What They Cost)",
    excerpt:
      "Semrush, Ahrefs, and the challengers — an inside look at the SEO stacks running boutique agencies.",
    category: "marketing",
    author: AUTHORS[0],
    authorAvatar: AVATARS[0],
    date: "2026-06-22",
    readTime: 8,
    cover: img("photo-1432888622747-4eb9a8efeb07"),
    views: 12900,
    content: bodyFor("SEO tools", ["SEO tools for agencies", "keyword research"]),
  },

  // Finance
  {
    slug: "best-accounting-software-for-freelancers",
    title: "Best Accounting Software for Freelancers in 2026",
    excerpt:
      "Simple books, clean invoices, and tax-ready reports — the accounting apps built for solo operators.",
    category: "finance",
    author: AUTHORS[1],
    authorAvatar: AVATARS[1],
    date: "2026-07-14",
    readTime: 10,
    cover: img("photo-1554224155-6726b3ff858f"),
    views: 19700,
    featured: true,
    editorsChoice: true,
    content: bodyFor("accounting software", ["best accounting software for freelancers", "invoicing"]),
  },
  {
    slug: "invoicing-tools-for-small-business",
    title: "The 8 Best Invoicing Tools for Small Business",
    excerpt:
      "Get paid faster with invoicing apps that handle recurring billing, taxes, and multi-currency without drama.",
    category: "finance",
    author: AUTHORS[2],
    authorAvatar: AVATARS[2],
    date: "2026-07-06",
    readTime: 9,
    cover: img("photo-1450101499163-c8848c66ca85"),
    views: 14200,
    trending: true,
    content: bodyFor("invoicing tools", ["invoicing tools for small business", "payments"]),
  },
  {
    slug: "payroll-software-comparison",
    title: "Payroll Software Compared: Gusto, Rippling, Justworks",
    excerpt:
      "Payroll is one integration you cannot afford to get wrong. Here's how the top platforms stack up for SMBs.",
    category: "finance",
    author: AUTHORS[3],
    authorAvatar: AVATARS[3],
    date: "2026-06-30",
    readTime: 11,
    cover: img("photo-1607827447604-d9a8c439186e"),
    views: 11800,
    content: bodyFor("payroll platforms", ["payroll software comparison", "HR"]),
  },

  // Productivity
  {
    slug: "best-project-management-software-small-teams",
    title: "Best Project Management Software for Small Teams",
    excerpt:
      "Notion, Asana, ClickUp and the sleepers — the PM tools that actually reduce meetings in 2026.",
    category: "productivity",
    author: AUTHORS[4],
    authorAvatar: AVATARS[4],
    date: "2026-07-15",
    readTime: 12,
    cover: img("photo-1517245386807-bb43f82c33c4"),
    views: 27300,
    featured: true,
    trending: true,
    editorsChoice: true,
    content: bodyFor("project management tools", ["best project management software", "collaboration"]),
  },
  {
    slug: "task-management-tools-comparison",
    title: "Task Management Tools: Todoist vs TickTick vs Things",
    excerpt:
      "Personal productivity apps that scale to small teams — a hands-on look at speed, sync, and cost.",
    category: "productivity",
    author: AUTHORS[0],
    authorAvatar: AVATARS[0],
    date: "2026-07-04",
    readTime: 8,
    cover: img("photo-1484480974693-6ca0a78fb36b"),
    views: 16500,
    content: bodyFor("task apps", ["task management tools comparison", "GTD"]),
  },
  {
    slug: "collaboration-platforms-remote-work",
    title: "Collaboration Platforms for Remote Work That Actually Work",
    excerpt:
      "Async-first workflows, video-lite culture, and the tools that make distributed teams feel close.",
    category: "productivity",
    author: AUTHORS[1],
    authorAvatar: AVATARS[1],
    date: "2026-06-25",
    readTime: 10,
    cover: img("photo-1522071820081-009f0129c71c"),
    views: 13400,
    trending: true,
    content: bodyFor("remote collaboration tools", ["collaboration platforms for remote work", "async"]),
  },

  // E-commerce
  {
    slug: "best-ecommerce-platform-small-business",
    title: "Best E-commerce Platform for Small Business in 2026",
    excerpt:
      "Shopify, BigCommerce, Wix — a merchant's-eye view of the platforms powering seven-figure SMB stores.",
    category: "e-commerce",
    author: AUTHORS[2],
    authorAvatar: AVATARS[2],
    date: "2026-07-16",
    readTime: 13,
    cover: img("photo-1483985988355-763728e1935b"),
    views: 29800,
    featured: true,
    trending: true,
    editorsChoice: true,
    content: bodyFor("e-commerce platforms", ["best ecommerce platform for small business", "conversion"]),
  },
  {
    slug: "shopify-vs-woocommerce-comparison",
    title: "Shopify vs WooCommerce: Which Wins for New Merchants?",
    excerpt:
      "Total cost, developer time, and the moment WooCommerce stops being 'free'. A candid comparison.",
    category: "e-commerce",
    author: AUTHORS[3],
    authorAvatar: AVATARS[3],
    date: "2026-07-08",
    readTime: 11,
    cover: img("photo-1556742049-0cfed4f6a45d"),
    views: 22100,
    editorsChoice: true,
    content: bodyFor("Shopify vs WooCommerce", ["Shopify vs WooCommerce comparison", "platforms"]),
  },
  {
    slug: "payment-gateway-for-startups",
    title: "The Best Payment Gateways for Startups (Fees Compared)",
    excerpt:
      "Stripe, Adyen, Paddle, and merchant-of-record newcomers — pick a gateway you won't outgrow.",
    category: "e-commerce",
    author: AUTHORS[4],
    authorAvatar: AVATARS[4],
    date: "2026-06-29",
    readTime: 9,
    cover: img("photo-1563013544-824ae1b704d3"),
    views: 15900,
    content: bodyFor("payment gateways", ["payment gateway for startups", "checkout"]),
  },
];

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const articlesByCategory = (slug: string) =>
  articles.filter((a) => a.category === slug);

export const trendingArticles = () => articles.filter((a) => a.trending);
export const editorsChoiceArticles = () =>
  articles.filter((a) => a.editorsChoice);
export const featuredArticles = () => articles.filter((a) => a.featured);
export const mostRead = (limit = 5) =>
  [...articles].sort((a, b) => b.views - a.views).slice(0, limit);
export const latestArticles = (limit = 6) =>
  [...articles]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
export const relatedArticles = (slug: string, limit = 3) => {
  const current = articleBySlug(slug);
  if (!current) return [];
  return articles
    .filter((a) => a.slug !== slug && a.category === current.category)
    .slice(0, limit);
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

export const formatViews = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
