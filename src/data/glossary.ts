import { categories, type Category } from "./blog";

export type GlossaryTerm = {
  slug: string; // e.g. "crm"
  term: string; // "CRM"
  category: string; // category slug
  short: string; // one-line
  answer: string; // 40-60 word direct answer for Featured Snippets
  definition: string;
  keyFacts: string[];
  quickSummary: string;
  practicalExample: string;
  whyItMatters: string;
  howItWorks: string[];
  advantages: string[];
  disadvantages?: string[];
  commonMistakes: string[];
  faqs: { q: string; a: string }[];
  related: string[]; // slugs of other terms
  furtherReading?: { label: string; href: string }[]; // internal article slugs preferred
  references?: { label: string; href: string }[];
  synonyms?: string[];
  lastUpdated: string; // ISO
  readingTime: number;
  author: string;
  authorAvatar: string;
  trending?: boolean;
  popular?: boolean;
};

const AUTHOR = "Tuanga Cor Editorial";
const AVATAR = "https://i.pravatar.cc/120?img=12";

// Helper to reduce repetition when authoring terms
const t = (
  p: Omit<GlossaryTerm, "author" | "authorAvatar" | "lastUpdated" | "readingTime"> &
    Partial<Pick<GlossaryTerm, "lastUpdated" | "readingTime" | "author" | "authorAvatar">>
): GlossaryTerm => ({
  author: AUTHOR,
  authorAvatar: AVATAR,
  lastUpdated: "2026-07-20",
  readingTime: 5,
  ...p,
});

// Compact helper for long-tail terms — fills sensible defaults from a short brief.
const tm = (o: {
  slug: string;
  term: string;
  category: string;
  short: string;
  answer: string;
  synonyms?: string[];
  related?: string[];
  trending?: boolean;
  popular?: boolean;
  keyFacts?: string[];
  example?: string;
  matters?: string;
  how?: string[];
  pros?: string[];
  cons?: string[];
  mistakes?: string[];
  faqs?: { q: string; a: string }[];
  furtherReading?: { label: string; href: string }[];
}): GlossaryTerm =>
  t({
    slug: o.slug,
    term: o.term,
    category: o.category,
    synonyms: o.synonyms,
    short: o.short,
    answer: o.answer,
    definition: o.answer,
    keyFacts:
      o.keyFacts ?? [
        `${o.term} is a core building block of modern SMB ${o.category} workflows.`,
        `Most leading ${o.category} platforms support ${o.term.toLowerCase()} out of the box.`,
        `Small teams typically see measurable ROI within the first 90 days.`,
      ],
    quickSummary: o.short,
    practicalExample:
      o.example ??
      `A small business applies ${o.term.toLowerCase()} to standardize a repeatable process, measure outcomes, and free up team capacity for higher-value work.`,
    whyItMatters:
      o.matters ??
      `Mastering ${o.term.toLowerCase()} helps small business owners make faster, data-informed decisions and avoid the operational bottlenecks that stall growth.`,
    howItWorks:
      o.how ?? [
        `Define the specific outcome ${o.term.toLowerCase()} should drive.`,
        `Pick a tool that fits your stack, team size, and budget.`,
        `Pilot with a small group, measure the impact, then roll out.`,
      ],
    advantages:
      o.pros ?? [
        `Improves consistency across the team.`,
        `Creates measurable, repeatable outcomes.`,
        `Scales without adding headcount.`,
      ],
    disadvantages: o.cons,
    commonMistakes:
      o.mistakes ?? [
        `Adopting the tool before defining the process.`,
        `Skipping onboarding and change management.`,
        `Ignoring analytics after launch.`,
      ],
    faqs: o.faqs ?? [
      { q: `What is ${o.term} in simple terms?`, a: o.answer },
    ],
    related: o.related ?? [],
    furtherReading: o.furtherReading,
    trending: o.trending,
    popular: o.popular,
  });

export const glossaryTerms: GlossaryTerm[] = [
  // -------- CRM --------
  t({
    slug: "crm",
    term: "CRM",
    category: "crm",
    synonyms: ["Customer Relationship Management", "Sales CRM"],
    short: "Software to manage customer and sales relationships.",
    answer:
      "CRM (Customer Relationship Management) is software that centralizes contacts, deals, and interactions so sales, marketing, and support teams can track every customer touchpoint. Small businesses use a CRM to shorten sales cycles, forecast revenue, automate follow-ups, and turn scattered spreadsheets into a single source of truth.",
    definition:
      "A CRM is a system of record for every relationship your business has — leads, prospects, customers, and partners. It stores contact data, pipeline stages, activities, emails, and notes in one place, and layers automation and reporting on top so teams work from the same picture of each account.",
    keyFacts: [
      "Category leaders for SMBs include HubSpot, Pipedrive, Zoho, and Monday CRM.",
      "Modern CRMs bundle email, calendar, VoIP, and marketing automation natively.",
      "Adoption — not features — is the #1 predictor of ROI.",
      "Free tiers are usable for teams under ~5 seats; paid plans unlock reporting and automation.",
    ],
    quickSummary:
      "A CRM replaces spreadsheets with a shared pipeline, automates follow-ups, and gives owners real-time forecasting. Pick one that your team will actually use daily.",
    practicalExample:
      "A 6-person B2B agency moves from a shared Google Sheet to Pipedrive. Deal stages, email sync, and a weekly forecast dashboard cut manual admin by 4 hours per rep per week and lift close rate from 18% to 26% within a quarter.",
    whyItMatters:
      "Without a CRM, revenue lives in individual inboxes. When a rep leaves, deals stall. A CRM protects institutional knowledge, makes pipeline reviews meaningful, and unlocks the automation and reporting that separate hobby sales from repeatable growth.",
    howItWorks: [
      "Contacts and companies are imported or captured from web forms and email.",
      "Deals are attached to contacts and progressed through a visual pipeline.",
      "Activities (calls, emails, tasks) are logged automatically via integrations.",
      "Automations trigger follow-ups, sequences, and internal handoffs.",
      "Dashboards surface pipeline value, velocity, and forecast accuracy.",
    ],
    advantages: [
      "Single source of truth for every customer relationship.",
      "Forecasting and pipeline visibility for owners and managers.",
      "Automation reduces manual data entry and missed follow-ups.",
      "Integrates with marketing, support, and finance tools.",
    ],
    disadvantages: [
      "Requires disciplined data hygiene to stay useful.",
      "Per-seat pricing scales quickly on growing teams.",
      "Over-customization can slow adoption.",
    ],
    commonMistakes: [
      "Choosing based on feature lists instead of daily workflows.",
      "Skipping onboarding — reps default back to spreadsheets.",
      "Not defining pipeline stages before importing data.",
      "Ignoring reporting until quarter-end.",
    ],
    faqs: [
      {
        q: "What is the best CRM for small business?",
        a: "For most SMBs, HubSpot's free tier and Pipedrive's pipeline-first UX are the strongest starting points. Zoho wins on price at scale, and Monday CRM shines for teams already using Monday for projects.",
      },
      {
        q: "How much does a CRM cost?",
        a: "Entry paid plans start around $12–$25 per user per month. Full sales, marketing, and service suites for SMBs typically land between $50–$100 per user per month.",
      },
      {
        q: "Do I need a CRM if I only have 20 customers?",
        a: "Yes, if you plan to grow. Building the habit early is far easier than migrating years of email history later.",
      },
    ],
    related: ["sales-pipeline", "lead-nurturing", "sales-automation", "marketing-automation"],
    furtherReading: [
      { label: "Best CRM for Small Business in 2026", href: "/blog/best-crm-for-small-business-2026" },
      { label: "HubSpot vs Pipedrive", href: "/blog/hubspot-vs-pipedrive-comparison" },
      { label: "HubSpot CRM Review", href: "/blog/hubspot-crm-review-for-small-business" },
    ],
    trending: true,
    popular: true,
    readingTime: 7,
  }),
  t({
    slug: "sales-pipeline",
    term: "Sales Pipeline",
    category: "crm",
    short: "Visual representation of deals across sales stages.",
    answer:
      "A sales pipeline is the visual sequence of stages a deal moves through — from first contact to closed-won. It shows how many opportunities exist at each stage, their value, and their velocity, giving small business owners a real-time forecast of revenue and where deals are getting stuck.",
    definition:
      "The sales pipeline is a structured view of every active opportunity, grouped by the stage it currently occupies (e.g. Qualified, Proposal Sent, Negotiation, Closed-Won). Each stage has entry criteria and expected conversion rates.",
    keyFacts: [
      "Pipelines drive forecasting via stage-weighted deal value.",
      "5–7 stages is optimal — more creates friction, fewer hides bottlenecks.",
      "Pipeline velocity = (deals × win rate × deal size) ÷ sales cycle length.",
    ],
    quickSummary:
      "A well-designed pipeline turns sales from guesswork into a measurable process. Track stages, conversion, and velocity — not just closed deals.",
    practicalExample:
      "A SaaS founder splits her pipeline into Lead → Discovery → Demo → Proposal → Closed. Reviewing conversion between Demo and Proposal reveals a 22% drop-off — she adds a follow-up sequence and lifts overall win rate by 11%.",
    whyItMatters:
      "Owners who can name their bottleneck stage can fix it. Owners who only know their total revenue can only hope.",
    howItWorks: [
      "Define stages with clear entry and exit criteria.",
      "Log every deal against a stage inside your CRM.",
      "Track conversion rate and average time per stage.",
      "Review pipeline weekly — coach, don't just report.",
    ],
    advantages: [
      "Objective forecasting instead of gut feel.",
      "Clear coaching signals for individual reps.",
      "Uncovers process bottlenecks quickly.",
    ],
    commonMistakes: [
      "Too many stages that nobody updates.",
      "Stages defined by rep activity instead of buyer commitment.",
      "Leaving stalled deals in the pipeline indefinitely.",
    ],
    faqs: [
      {
        q: "How many stages should a sales pipeline have?",
        a: "Five to seven stages works for most SMB sales cycles. Anything more usually adds admin without insight.",
      },
      {
        q: "What's the difference between a sales pipeline and a sales funnel?",
        a: "A pipeline is your view of active deals by stage. A funnel is the aggregate conversion picture across all leads over time.",
      },
    ],
    related: ["crm", "lead-nurturing", "sales-automation"],
    furtherReading: [
      { label: "Best CRM for Small Business", href: "/blog/best-crm-for-small-business-2026" },
    ],
    popular: true,
  }),
  t({
    slug: "lead-nurturing",
    term: "Lead Nurturing",
    category: "crm",
    short: "Systematically warming leads toward a purchase.",
    answer:
      "Lead nurturing is the process of building relationships with prospects who aren't yet ready to buy, using targeted emails, content, and touchpoints. Effective nurturing keeps your brand top-of-mind, educates buyers through the funnel, and hands sales a warmer, more qualified conversation when the time is right.",
    definition:
      "Lead nurturing combines segmentation, marketing automation, and content sequencing to progressively deepen a prospect's engagement until they show buying intent.",
    keyFacts: [
      "Nurtured leads produce a 20% average increase in sales opportunities (DemandGen).",
      "Behavior-triggered emails outperform batch-and-blast by 3–5x.",
      "The best nurture sequences balance education and social proof.",
    ],
    quickSummary:
      "Nurturing isn't about more emails — it's about the right message at the right stage. Automate the cadence, but keep the content human.",
    practicalExample:
      "A real-estate CRM captures leads from an open house. Instead of an immediate sales call, a 6-email drip educates on neighborhood trends and mortgage tips. 41% of leads book a follow-up within 30 days.",
    whyItMatters:
      "Most buyers aren't ready today. Nurturing keeps you on the shortlist for when they are.",
    howItWorks: [
      "Segment leads by source, industry, or lifecycle stage.",
      "Design sequences per segment — 4–8 emails is typical.",
      "Trigger touchpoints on behavior (email open, page view, form fill).",
      "Score engagement and hand hot leads to sales.",
    ],
    advantages: [
      "Higher lead-to-opportunity conversion.",
      "Shorter sales cycles once leads engage sales.",
      "Compounding brand recall over time.",
    ],
    commonMistakes: [
      "Sending the same content to every segment.",
      "Sales-heavy tone in early emails.",
      "No exit criteria — leads never graduate to sales.",
    ],
    faqs: [
      {
        q: "How long should a lead nurturing sequence be?",
        a: "For most SMB funnels, 4–8 emails over 3–6 weeks strikes the balance between staying top-of-mind and creating fatigue.",
      },
    ],
    related: ["crm", "email-marketing", "marketing-automation", "sales-pipeline"],
    furtherReading: [
      { label: "CRM for Real Estate Agents", href: "/blog/crm-for-real-estate-agents" },
    ],
  }),
  t({
    slug: "sales-automation",
    term: "Sales Automation",
    category: "crm",
    short: "Removing repetitive sales tasks with software.",
    answer:
      "Sales automation uses software to handle repetitive selling tasks — logging activities, sending follow-ups, updating pipeline stages, and routing leads. It gives reps back hours each week for real selling, enforces consistency across the pipeline, and ensures no prospect slips through the cracks.",
    definition:
      "Sales automation covers any process where software takes over an action a rep would otherwise do manually, from email sequences to deal stage transitions and internal notifications.",
    keyFacts: [
      "Automating admin returns 3–5 selling hours per rep per week.",
      "Most CRMs include native automation on paid tiers.",
      "The highest-ROI use case is follow-up cadence.",
    ],
    quickSummary:
      "Automate the tasks that don't require judgment. Keep humans in the loop for pricing, objections, and relationships.",
    practicalExample:
      "A 4-person outbound team automates lead assignment, first-touch email, and 3-step follow-up in Pipedrive. Response rate rises 34% and no lead waits more than 5 minutes for a first reply.",
    whyItMatters:
      "Speed and consistency win deals. Automation delivers both — cheaply.",
    howItWorks: [
      "Identify tasks that are rule-based (not judgment-based).",
      "Build workflows inside your CRM using triggers and actions.",
      "Test on a small segment before rolling out.",
      "Review analytics monthly and prune underperforming steps.",
    ],
    advantages: [
      "Consistent follow-through on every lead.",
      "Frees reps for high-value conversations.",
      "Scalable without adding headcount.",
    ],
    commonMistakes: [
      "Automating outreach that feels robotic.",
      "No handoff triggers when leads reply.",
      "Building sequences you never review.",
    ],
    faqs: [
      {
        q: "Is sales automation the same as marketing automation?",
        a: "They overlap but differ in intent. Marketing automation nurtures unknown or early-stage leads at scale; sales automation supports one-to-one selling.",
      },
    ],
    related: ["crm", "marketing-automation", "sales-pipeline", "lead-nurturing"],
    furtherReading: [
      { label: "HubSpot vs Pipedrive", href: "/blog/hubspot-vs-pipedrive-comparison" },
    ],
  }),

  // -------- Marketing --------
  t({
    slug: "marketing-automation",
    term: "Marketing Automation",
    category: "marketing",
    short: "Software that runs marketing workflows on autopilot.",
    answer:
      "Marketing automation is software that executes marketing tasks — emails, segmentation, lead scoring, and multichannel campaigns — based on rules and user behavior. It lets small teams run enterprise-grade personalized campaigns, nurture leads at scale, and hand sales-ready contacts to reps automatically.",
    definition:
      "A marketing automation platform combines contact management, segmentation, email, forms, workflows, and analytics into a single environment that reacts to user behavior in real time.",
    keyFacts: [
      "ActiveCampaign, HubSpot, and Customer.io lead the SMB space.",
      "Behavior-based triggers convert 3–5x better than time-based ones.",
      "Deliverability depends more on list hygiene than on the platform.",
    ],
    quickSummary:
      "Great automation feels like great service — the right message at the right moment. Bad automation feels like spam.",
    practicalExample:
      "An e-commerce store triggers a 3-email post-purchase sequence: shipping update, care tips, review request. Review submission rate jumps from 4% to 22%.",
    whyItMatters:
      "Every SMB competes with brands that automate. Not automating is choosing to work harder for the same result.",
    howItWorks: [
      "Capture leads via forms, chat, or integrations.",
      "Segment by properties and behavior.",
      "Trigger workflows on entry, action, or inaction.",
      "Score engagement and route to sales.",
    ],
    advantages: [
      "Personalization at scale.",
      "Consistent lead follow-up.",
      "Measurable revenue attribution.",
    ],
    disadvantages: [
      "Setup and maintenance take real time.",
      "Bad segmentation multiplies bad messages.",
    ],
    commonMistakes: [
      "Building complex flows before basic segmentation works.",
      "Neglecting list hygiene — deliverability suffers.",
      "Treating automation as a set-and-forget project.",
    ],
    faqs: [
      {
        q: "What's the difference between email marketing and marketing automation?",
        a: "Email marketing is one channel. Marketing automation orchestrates email, segmentation, scoring, and cross-channel actions based on behavior.",
      },
    ],
    related: ["email-marketing", "lead-nurturing", "seo", "crm"],
    furtherReading: [
      { label: "Marketing Automation Tools Compared", href: "/blog/marketing-automation-tools-comparison" },
      { label: "Best Email Marketing Software", href: "/blog/best-email-marketing-software-small-business" },
    ],
    trending: true,
    popular: true,
  }),
  t({
    slug: "email-marketing",
    term: "Email Marketing",
    category: "marketing",
    short: "Reaching customers through targeted email campaigns.",
    answer:
      "Email marketing is the practice of sending targeted messages to a list of subscribers to nurture relationships, drive sales, and share content. It remains the highest-ROI channel for small businesses because it's owned, measurable, and directly tied to revenue when paired with segmentation and automation.",
    definition:
      "Email marketing spans broadcast newsletters, transactional emails, drip campaigns, and behavioral triggers, delivered through platforms like Mailchimp, Klaviyo, or ActiveCampaign.",
    keyFacts: [
      "Average email ROI is reported at $36 for every $1 spent (DMA).",
      "Deliverability lives or dies by list hygiene and sender reputation.",
      "Segmented campaigns can lift revenue by 760% (Campaign Monitor).",
    ],
    quickSummary:
      "Build a clean list, segment it, and send emails people actually want. Everything else is decoration.",
    practicalExample:
      "A B2B SaaS blog captures 1,200 subscribers via a lead magnet. A weekly digest with tool reviews converts 3.4% into trial signups — outperforming paid ads by 4x on cost per trial.",
    whyItMatters:
      "You own your list. You don't own your algorithmic reach on any social platform. Email compounds.",
    howItWorks: [
      "Capture emails via lead magnets, checkout, or content upgrades.",
      "Segment subscribers by interest and behavior.",
      "Send a mix of value (content) and offers (products).",
      "Monitor open, click, and unsubscribe rates.",
    ],
    advantages: [
      "Direct, owned channel with predictable ROI.",
      "Easy to test and measure.",
      "Works across every industry and price point.",
    ],
    commonMistakes: [
      "Buying email lists — trashes deliverability.",
      "Sending the same email to everyone.",
      "No re-engagement plan for inactive subscribers.",
    ],
    faqs: [
      {
        q: "What's a good open rate for small business email?",
        a: "Averages fall between 20–35% depending on industry. Beyond averages, focus on click-through and conversion.",
      },
    ],
    related: ["marketing-automation", "lead-nurturing", "seo"],
    furtherReading: [
      { label: "Best Email Marketing Software", href: "/blog/best-email-marketing-software-small-business" },
    ],
    popular: true,
  }),
  t({
    slug: "seo",
    term: "SEO",
    category: "marketing",
    synonyms: ["Search Engine Optimization"],
    short: "Optimizing content to rank in organic search.",
    answer:
      "SEO (Search Engine Optimization) is the practice of improving a website so it appears higher in unpaid search results. Strong SEO combines helpful content, technical performance, and authoritative backlinks to attract compounding, high-intent organic traffic — the lowest-cost acquisition channel for most small businesses.",
    definition:
      "SEO covers on-page (content, structure), technical (crawlability, Core Web Vitals), and off-page (backlinks, brand mentions) work that helps search engines and users understand and trust your site.",
    keyFacts: [
      "Organic search drives 53% of website traffic on average (BrightEdge).",
      "Google evaluates E-E-A-T: Experience, Expertise, Authoritativeness, Trust.",
      "AI Overviews are reshaping what 'ranking' means in 2026.",
    ],
    quickSummary:
      "Publish content that genuinely helps a real audience, make it fast and crawlable, and earn links naturally over time.",
    practicalExample:
      "An SMB SaaS blog targets 'best CRM for small business.' A 3,000-word comparison, tight on-page SEO, and 12 organic backlinks push it into the top 5 within 6 months — driving 4,800 monthly clicks.",
    whyItMatters:
      "Paid channels stop the day your budget stops. SEO keeps compounding.",
    howItWorks: [
      "Research keywords with intent behind them.",
      "Publish content that answers those queries better than competitors.",
      "Ensure technical performance (speed, mobile, structured data).",
      "Earn backlinks through outreach, PR, and quality.",
    ],
    advantages: [
      "Compounding, low-cost traffic over time.",
      "Builds brand authority.",
      "High-intent visitors convert better than ads.",
    ],
    disadvantages: [
      "Slow — meaningful results typically take 6+ months.",
      "Algorithm changes can move rankings overnight.",
    ],
    commonMistakes: [
      "Chasing keywords with no commercial intent.",
      "Ignoring technical SEO fundamentals.",
      "Publishing thin content at high volume.",
    ],
    faqs: [
      {
        q: "How long does SEO take to work?",
        a: "For new sites, expect 6–12 months to see meaningful organic traffic. Established sites can see wins in weeks.",
      },
    ],
    related: ["marketing-automation", "email-marketing"],
    furtherReading: [
      { label: "SEO Tools Agencies Rely On", href: "/blog/seo-tools-for-agencies" },
    ],
    trending: true,
    popular: true,
  }),
  t({
    slug: "conversion-rate",
    term: "Conversion Rate",
    category: "marketing",
    short: "Percentage of visitors completing a desired action.",
    answer:
      "Conversion rate is the percentage of visitors who complete a specific action — buying a product, signing up, or booking a call — out of the total who had the opportunity. For small businesses, improving conversion rate is often faster and cheaper than driving more traffic to the same underperforming page.",
    definition:
      "Formally: conversions ÷ total visitors × 100. Measured at any funnel step: ad → landing page → signup → paid.",
    keyFacts: [
      "Average e-commerce conversion rate hovers around 2–3%.",
      "SaaS trial-to-paid conversion averages 15–20% for self-serve.",
      "A 1% conversion lift on the same traffic often beats a 30% traffic increase.",
    ],
    quickSummary:
      "Measure conversion at every meaningful step. Fix the weakest link before adding traffic.",
    practicalExample:
      "An e-commerce store cuts checkout from 5 steps to 2 and adds Apple Pay. Cart-to-purchase conversion rises from 61% to 79% — worth $34,000 extra revenue per quarter.",
    whyItMatters:
      "Traffic is expensive. Conversion optimization is a compounding return on the traffic you already have.",
    howItWorks: [
      "Define the conversion event and the eligible universe.",
      "Instrument analytics to measure it per source and device.",
      "Hypothesize friction points.",
      "A/B test changes and roll out winners.",
    ],
    advantages: [
      "Cheaper than acquiring more traffic.",
      "Improves ROI on every existing channel.",
    ],
    commonMistakes: [
      "Testing tiny changes without traffic to reach significance.",
      "Optimizing for micro-conversions that don't tie to revenue.",
    ],
    faqs: [
      {
        q: "What's a good conversion rate?",
        a: "It depends entirely on the offer, price, and traffic source. Benchmark yourself against your own history, not industry averages.",
      },
    ],
    related: ["seo", "email-marketing", "ecommerce"],
    furtherReading: [
      { label: "Best E-commerce Platform for Small Business", href: "/blog/best-ecommerce-platform-small-business" },
    ],
  }),

  // -------- Finance --------
  t({
    slug: "accounting-software",
    term: "Accounting Software",
    category: "finance",
    short: "Software that tracks income, expenses, and reporting.",
    answer:
      "Accounting software records financial transactions, tracks income and expenses, generates invoices, and produces reports required for taxes and decision-making. Small businesses use it to replace spreadsheets, stay compliant, understand cash flow in real time, and hand clean books to accountants without last-minute reconciliation panic.",
    definition:
      "Modern accounting software (QuickBooks, Xero, FreshBooks, Wave) combines bookkeeping, invoicing, expense tracking, bank feeds, and reporting in a single cloud platform.",
    keyFacts: [
      "Bank-feed reconciliation is the single biggest time-saver.",
      "Most SMB tools cost $15–$60 per month.",
      "Cloud-based accounting is now the default — desktop tools are legacy.",
    ],
    quickSummary:
      "Pick software your accountant supports. Automate bank feeds and reconcile weekly, not annually.",
    practicalExample:
      "A freelance designer switches from spreadsheets to Xero. Bank-feed reconciliation cuts monthly bookkeeping from 6 hours to 40 minutes and produces tax-ready reports at year-end in one click.",
    whyItMatters:
      "You can't grow what you can't measure — and you can't measure what lives in shoeboxes.",
    howItWorks: [
      "Connect bank and card accounts for automatic transaction sync.",
      "Categorize transactions (rules automate the repetitive ones).",
      "Send invoices and match payments.",
      "Generate P&L, balance sheet, and tax reports on demand.",
    ],
    advantages: [
      "Real-time financial picture.",
      "Reduces bookkeeping hours dramatically.",
      "Tax-ready reports year-round.",
    ],
    commonMistakes: [
      "Skipping reconciliation for months.",
      "Miscategorizing owner draws as expenses.",
      "Choosing a tool your accountant doesn't support.",
    ],
    faqs: [
      {
        q: "What's the best accounting software for a solo freelancer?",
        a: "FreshBooks and Wave are the most common picks — FreshBooks for invoice-heavy service work, Wave for free basic bookkeeping.",
      },
    ],
    related: ["invoicing", "cash-flow", "payroll"],
    furtherReading: [
      { label: "Best Accounting Software for Freelancers", href: "/blog/best-accounting-software-for-freelancers" },
    ],
    popular: true,
  }),
  t({
    slug: "invoicing",
    term: "Invoicing",
    category: "finance",
    short: "Billing customers formally for goods or services.",
    answer:
      "Invoicing is the process of issuing itemized bills to customers with amounts due, payment terms, and remittance details. Modern invoicing software automates recurring billing, taxes, reminders, and multi-currency payments — helping small businesses get paid faster and reduce the awkward manual chase for overdue balances.",
    definition:
      "An invoice is a legal payment request that includes issue and due dates, itemized services or goods, taxes, and total. Software tracks status (draft, sent, paid, overdue) and enforces payment terms.",
    keyFacts: [
      "Net-30 is standard for B2B; upfront is standard for retail.",
      "Automated reminders reduce days-sales-outstanding by 30–50%.",
      "Multi-currency and tax handling are must-haves for global SMBs.",
    ],
    quickSummary:
      "Automate reminders. Offer online payment inside the invoice. Track DSO monthly.",
    practicalExample:
      "A consulting firm moves from PDF invoices to FreshBooks with Stripe payment links. Average payment time drops from 34 to 11 days without any awkward emails.",
    whyItMatters:
      "Late payments are the leading cause of SMB cash-flow crises. Invoicing well is survival.",
    howItWorks: [
      "Create invoices from templates or projects.",
      "Send via email with online payment options.",
      "Automated reminders trigger before and after due date.",
      "Payments reconcile automatically against accounting.",
    ],
    advantages: [
      "Faster payments.",
      "Fewer awkward follow-ups.",
      "Cleaner books at year-end.",
    ],
    commonMistakes: [
      "Vague payment terms.",
      "No late-fee policy.",
      "Manual reminders that never happen.",
    ],
    faqs: [
      {
        q: "What should every invoice include?",
        a: "Business name and tax ID, customer details, invoice number, issue and due dates, itemized services, subtotal, taxes, total, and payment instructions.",
      },
    ],
    related: ["accounting-software", "cash-flow"],
    furtherReading: [
      { label: "Best Invoicing Tools for Small Business", href: "/blog/invoicing-tools-for-small-business" },
    ],
  }),
  t({
    slug: "cash-flow",
    term: "Cash Flow",
    category: "finance",
    short: "Movement of money into and out of a business.",
    answer:
      "Cash flow is the net movement of money into and out of a business over a specific period. Positive cash flow means more comes in than goes out. Even profitable small businesses fail when cash flow turns negative — which is why weekly forecasting matters more than monthly profit-and-loss statements.",
    definition:
      "Cash flow includes operating (day-to-day), investing (assets), and financing (loans, equity) activities. The cash-flow statement reconciles net income to actual cash position.",
    keyFacts: [
      "82% of small business failures are attributed to cash-flow problems (US Bank).",
      "A 13-week rolling forecast is the SMB standard.",
      "Cash flow ≠ profit — timing is everything.",
    ],
    quickSummary:
      "Forecast cash weekly. Keep at least 3 months of operating runway. Watch receivables like a hawk.",
    practicalExample:
      "A growing agency lands a $60K project but is invoiced net-60. A 13-week forecast reveals a payroll shortfall in week 9. They negotiate 50% upfront and avoid a bridge loan.",
    whyItMatters:
      "Profit is theoretical. Cash pays payroll.",
    howItWorks: [
      "Track incoming receivables and outgoing payables by week.",
      "Model best/expected/worst-case scenarios.",
      "Update the forecast weekly with actuals.",
      "Trigger action rules (financing, cost cuts) at defined thresholds.",
    ],
    advantages: [
      "Early warning system for financial trouble.",
      "Confidence to invest or hire when runway is safe.",
    ],
    commonMistakes: [
      "Confusing profit with cash.",
      "No forecast — only rear-view accounting.",
      "Ignoring seasonality.",
    ],
    faqs: [
      {
        q: "How much cash runway should a small business keep?",
        a: "A common floor is 3 months of operating expenses; 6 months is safer for seasonal or project-based businesses.",
      },
    ],
    related: ["accounting-software", "invoicing", "payroll"],
    furtherReading: [
      { label: "Best Accounting Software for Freelancers", href: "/blog/best-accounting-software-for-freelancers" },
    ],
    trending: true,
  }),
  t({
    slug: "payroll",
    term: "Payroll",
    category: "finance",
    short: "Process of paying employees and handling taxes.",
    answer:
      "Payroll is the process of calculating and distributing employee compensation, withholding taxes, and filing required government reports. Modern payroll software (Gusto, Rippling, Justworks) automates tax filing, benefits, and compliance — turning what used to be a monthly headache into a background process for small businesses.",
    definition:
      "Payroll covers gross-to-net calculation, tax withholding, benefit deductions, direct deposit, and quarterly/annual filings across federal, state, and local jurisdictions.",
    keyFacts: [
      "Gusto, Rippling, and Justworks dominate the SMB payroll space.",
      "Payroll penalties from late filings are the #1 avoidable SMB tax expense.",
      "Contractor payments (1099) are a growing category alongside W-2.",
    ],
    quickSummary:
      "Outsource compliance, automate filings, and integrate payroll with accounting from day one.",
    practicalExample:
      "A 12-person agency moves from a manual spreadsheet to Gusto. Payroll runs go from 4 hours to 15 minutes, and year-end W-2s are delivered automatically with zero errors.",
    whyItMatters:
      "Payroll mistakes create tax penalties, unhappy employees, and legal risk. Automation eliminates all three.",
    howItWorks: [
      "Enter employee details and pay rates once.",
      "Software calculates gross pay, taxes, and deductions.",
      "Direct deposit funds employee accounts on payday.",
      "Taxes are filed automatically each quarter and year.",
    ],
    advantages: [
      "Automatic tax filings.",
      "Integrated benefits and time tracking.",
      "Scales from 1 to 100 employees with the same UX.",
    ],
    commonMistakes: [
      "Misclassifying employees as contractors.",
      "Missing state registration in new hire states.",
      "Not reconciling payroll with accounting monthly.",
    ],
    faqs: [
      {
        q: "How much does payroll software cost?",
        a: "Entry SMB plans start around $40 per month plus $6–$12 per employee.",
      },
    ],
    related: ["accounting-software", "cash-flow"],
    furtherReading: [
      { label: "Payroll Software Compared", href: "/blog/payroll-software-comparison" },
    ],
  }),

  // -------- Productivity --------
  t({
    slug: "project-management",
    term: "Project Management",
    category: "productivity",
    short: "Planning and running work to achieve outcomes.",
    answer:
      "Project management is the discipline of planning, executing, and closing work to hit defined outcomes on time and on budget. For small teams, project management software (Asana, ClickUp, Notion, Monday) replaces status meetings with shared visibility, turning scattered tasks into a coordinated system anyone can update.",
    definition:
      "Project management combines methodology (agile, waterfall, hybrid), tooling (task trackers), and rituals (standups, reviews) to deliver work predictably.",
    keyFacts: [
      "Notion, Asana, ClickUp, and Linear lead the SMB space.",
      "Kanban is the most popular methodology for small teams.",
      "The best tool is the one your team updates daily.",
    ],
    quickSummary:
      "Pick one tool. Use it for everything. Rituals matter more than features.",
    practicalExample:
      "A 5-person product team moves from Trello + Slack to Linear. Weekly cycle planning replaces ad-hoc requests, and shipping velocity doubles in one quarter.",
    whyItMatters:
      "Coordination is the tax that grows fastest as teams scale. PM tools cut that tax.",
    howItWorks: [
      "Break work into projects, tasks, and subtasks.",
      "Assign owners and due dates.",
      "Track progress on boards or timelines.",
      "Review and re-plan at a fixed cadence.",
    ],
    advantages: [
      "Shared visibility replaces status meetings.",
      "Historical record for retrospectives.",
      "Predictable delivery.",
    ],
    commonMistakes: [
      "Adopting a heavy tool for a light process.",
      "Multiple tools competing for source of truth.",
      "No ritual — tools go stale in weeks.",
    ],
    faqs: [
      {
        q: "What's the best project management tool for small teams?",
        a: "Asana and ClickUp are the safest defaults. Linear wins for product teams; Notion wins for docs-heavy teams.",
      },
    ],
    related: ["task-management", "remote-collaboration"],
    furtherReading: [
      { label: "Best Project Management Software", href: "/blog/best-project-management-software-small-teams" },
    ],
    trending: true,
    popular: true,
  }),
  t({
    slug: "task-management",
    term: "Task Management",
    category: "productivity",
    short: "Organizing individual work items to completion.",
    answer:
      "Task management is the practice of capturing, organizing, and completing individual work items. It differs from project management in scope — tasks are personal or team-level, while projects roll up multiple tasks toward an outcome. Great task management software (Todoist, TickTick, Things) turns overwhelm into a next-action list.",
    definition:
      "Task management systems combine capture, categorization, prioritization, and review — often following GTD (Getting Things Done) or similar frameworks.",
    keyFacts: [
      "Todoist, TickTick, and Things dominate the personal productivity space.",
      "Cross-device sync is a non-negotiable feature.",
      "Natural language date parsing is the biggest UX differentiator.",
    ],
    quickSummary:
      "Capture everything. Review daily. Trust your system so your brain can rest.",
    practicalExample:
      "A founder juggling 3 projects moves from a scattered notes app to Todoist. Daily and weekly reviews replace mental load, and nothing important falls through the cracks for 90 straight days.",
    whyItMatters:
      "Attention is the scarcest resource for founders. Systems restore it.",
    howItWorks: [
      "Capture tasks from any device the moment they arise.",
      "Organize into projects, labels, or contexts.",
      "Prioritize daily using a top-3 or MIT approach.",
      "Review weekly to reset the system.",
    ],
    advantages: [
      "Removes mental load.",
      "Faster prioritization.",
      "Reliable follow-through.",
    ],
    commonMistakes: [
      "Over-categorizing until capture becomes friction.",
      "No weekly review — the system decays.",
    ],
    faqs: [
      {
        q: "Is task management the same as project management?",
        a: "No. Task management handles individual items; project management coordinates many tasks toward an outcome. Small teams often start with tasks and add PM as they scale.",
      },
    ],
    related: ["project-management", "remote-collaboration"],
    furtherReading: [
      { label: "Task Management Tools Compared", href: "/blog/task-management-tools-comparison" },
    ],
  }),
  t({
    slug: "remote-collaboration",
    term: "Remote Collaboration",
    category: "productivity",
    short: "Working together across locations and time zones.",
    answer:
      "Remote collaboration is the set of tools, rituals, and cultural practices that let distributed teams work together as effectively as (or better than) co-located ones. It relies on async-first communication, shared documentation, video-lite meetings, and clear ownership — turning distance into an operating advantage rather than a friction tax.",
    definition:
      "Remote collaboration spans chat (Slack), video (Zoom, Meet), docs (Notion, Google Docs), and project tools, tied together by explicit norms on when to use each.",
    keyFacts: [
      "Async-first companies report 21% higher productivity (GitLab).",
      "Video meetings should be the exception, not the default.",
      "Documentation quality is the #1 predictor of remote success.",
    ],
    quickSummary:
      "Write it down. Prefer async. Make meetings expensive on purpose.",
    practicalExample:
      "A 15-person remote team replaces 8 weekly meetings with Loom updates and threaded Slack discussions. Deep-work hours per person double, and cycle time on projects shrinks by 30%.",
    whyItMatters:
      "Remote isn't just 'office minus office.' It's a different operating model — and done well, a superior one.",
    howItWorks: [
      "Default to async for anything not time-critical.",
      "Document decisions in a searchable place.",
      "Reserve video for high-context or emotional conversations.",
      "Define clear owners on every project and task.",
    ],
    advantages: [
      "Deep work protected.",
      "Global hiring pool.",
      "Institutional memory captured in writing.",
    ],
    commonMistakes: [
      "Replicating in-office rituals online (endless standups).",
      "Chat as system of record — nothing is ever findable.",
      "Ambiguous ownership.",
    ],
    faqs: [
      {
        q: "What's the best remote collaboration tool?",
        a: "There isn't one. Winning stacks combine a comms tool (Slack), a docs tool (Notion or Google Docs), and a project tool (Linear, Asana).",
      },
    ],
    related: ["project-management", "task-management"],
    furtherReading: [
      { label: "Collaboration Platforms for Remote Work", href: "/blog/collaboration-platforms-remote-work" },
    ],
  }),

  // -------- E-commerce --------
  t({
    slug: "ecommerce",
    term: "E-commerce",
    category: "e-commerce",
    synonyms: ["Online Store", "Online Retail"],
    short: "Buying and selling goods or services online.",
    answer:
      "E-commerce is the buying and selling of goods or services over the internet. It spans direct-to-consumer stores, marketplaces, subscriptions, and digital products. Modern e-commerce platforms (Shopify, BigCommerce, WooCommerce) give small businesses enterprise-grade payments, inventory, and analytics out of the box — the entry barrier has never been lower.",
    definition:
      "E-commerce infrastructure combines a storefront, product catalog, checkout, payment gateway, inventory, shipping, and post-purchase experience.",
    keyFacts: [
      "Global e-commerce is expected to exceed $8 trillion by 2027 (Statista).",
      "Mobile accounts for 60%+ of e-commerce traffic.",
      "Shopify powers ~10% of all US e-commerce.",
    ],
    quickSummary:
      "Pick the platform your product needs — not the one your neighbor uses. Optimize checkout above everything else.",
    practicalExample:
      "A jewelry brand launches on Shopify with 5 SKUs. Adding Shop Pay and abandoned-cart emails lifts checkout completion by 24% in the first month.",
    whyItMatters:
      "E-commerce is where the customer decides. It's where every marketing dollar either converts or doesn't.",
    howItWorks: [
      "List products with images, copy, and pricing.",
      "Route traffic from ads, SEO, or email.",
      "Convert at checkout with a trusted payment gateway.",
      "Fulfill, ship, and follow up post-purchase.",
    ],
    advantages: [
      "Sell 24/7 globally.",
      "Data-driven every step of the funnel.",
      "Scales without opening physical locations.",
    ],
    disadvantages: [
      "Rising customer acquisition costs.",
      "Return logistics can be complex.",
    ],
    commonMistakes: [
      "Slow, cluttered product pages.",
      "Hidden shipping costs revealed at checkout.",
      "No post-purchase follow-up.",
    ],
    faqs: [
      {
        q: "What's the best e-commerce platform for beginners?",
        a: "Shopify remains the most beginner-friendly for physical products. Wix and Squarespace suit small catalogs; WooCommerce fits WordPress-heavy stacks.",
      },
    ],
    related: ["payment-gateway", "shopify", "conversion-rate"],
    furtherReading: [
      { label: "Best E-commerce Platform for Small Business", href: "/blog/best-ecommerce-platform-small-business" },
      { label: "Shopify vs WooCommerce", href: "/blog/shopify-vs-woocommerce-comparison" },
    ],
    trending: true,
    popular: true,
  }),
  t({
    slug: "shopify",
    term: "Shopify",
    category: "e-commerce",
    short: "Leading hosted e-commerce platform for SMBs.",
    answer:
      "Shopify is a hosted e-commerce platform that lets small businesses launch a full online store — storefront, checkout, payments, inventory, and shipping — without managing infrastructure. Its app ecosystem, mobile-first themes, and Shop Pay checkout make it the default choice for most physical-product SMBs launching in 2026.",
    definition:
      "Shopify handles hosting, security, PCI compliance, and updates in exchange for a monthly subscription plus transaction fees (waived when using Shopify Payments).",
    keyFacts: [
      "Powers ~4.8 million stores globally.",
      "Basic plan starts at ~$39/month.",
      "Shop Pay converts up to 50% higher than generic checkouts.",
    ],
    quickSummary:
      "Pick Shopify when you want speed to market and don't want to manage servers or plugins.",
    practicalExample:
      "A candle brand launches on Shopify Basic with a free theme. Shop Pay + Klaviyo automation deliver $12K in first-month revenue from Instagram ads.",
    whyItMatters:
      "Shopify removes 90% of the technical decisions so you can focus on product and marketing.",
    howItWorks: [
      "Choose a theme and customize.",
      "Add products and variants.",
      "Enable Shopify Payments (or a third-party gateway).",
      "Install apps for shipping, email, and analytics.",
    ],
    advantages: [
      "Fastest path to launch.",
      "Trusted checkout with Shop Pay.",
      "Massive app ecosystem.",
    ],
    disadvantages: [
      "Transaction fees if not using Shopify Payments.",
      "Customization limits vs. self-hosted platforms.",
    ],
    commonMistakes: [
      "Installing too many apps — slows the store.",
      "Ignoring theme performance scores.",
      "Not using Shop Pay on mobile.",
    ],
    faqs: [
      {
        q: "Is Shopify better than WooCommerce?",
        a: "Shopify wins on ease and reliability; WooCommerce wins on flexibility and long-term cost for developer-savvy teams.",
      },
    ],
    related: ["ecommerce", "payment-gateway", "conversion-rate"],
    furtherReading: [
      { label: "Shopify vs WooCommerce", href: "/blog/shopify-vs-woocommerce-comparison" },
    ],
    popular: true,
  }),
  t({
    slug: "payment-gateway",
    term: "Payment Gateway",
    category: "e-commerce",
    short: "Service that authorizes online payments.",
    answer:
      "A payment gateway is the service that securely authorizes and processes online payments between a customer, merchant, and bank. For small businesses, choosing the right gateway (Stripe, Adyen, PayPal, Paddle) determines checkout conversion, cross-border fees, and how much time you spend on fraud disputes and reconciliation.",
    definition:
      "Payment gateways encrypt card data, route authorization requests to processors, and return approval or decline. Merchant-of-record gateways (Paddle) additionally handle tax and compliance.",
    keyFacts: [
      "Stripe is the SMB default for developers.",
      "Merchant-of-record gateways simplify global tax compliance.",
      "Checkout conversion varies 10–30% between gateways.",
    ],
    quickSummary:
      "Pick a gateway that supports your currencies and geographies from day one. Migration later is painful.",
    practicalExample:
      "A SaaS company selling globally moves from Stripe to Paddle. VAT/GST compliance becomes automatic, saving ~$18K/year in tax filings and freeing 40 hours/month.",
    whyItMatters:
      "The gateway is the last step of your funnel. A bad one silently kills conversions.",
    howItWorks: [
      "Customer enters card details at checkout.",
      "Gateway tokenizes and forwards to the processor.",
      "Processor requests authorization from the issuing bank.",
      "Approval flows back to the merchant in milliseconds.",
    ],
    advantages: [
      "Secure, PCI-compliant checkout without custom development.",
      "Global card, wallet, and bank-transfer support.",
      "Chargeback and fraud tooling included.",
    ],
    commonMistakes: [
      "Underestimating cross-border FX fees.",
      "Not enabling local payment methods (iDEAL, SEPA, Pix).",
      "Skipping 3DS in regions where it lifts approval rates.",
    ],
    faqs: [
      {
        q: "What's the best payment gateway for startups?",
        a: "Stripe for most developer-led products; Paddle for SaaS wanting merchant-of-record; Shopify Payments for merchants already on Shopify.",
      },
    ],
    related: ["ecommerce", "shopify", "conversion-rate"],
    furtherReading: [
      { label: "Best Payment Gateways for Startups", href: "/blog/payment-gateway-for-startups" },
    ],
    trending: true,
  }),

  // ================= CRM & Sales — long-tail =================
  tm({ slug: "lead-scoring", term: "Lead Scoring", category: "crm",
    short: "Ranking leads by likelihood to buy.",
    answer: "Lead scoring assigns numerical values to leads based on demographics, firmographics, and behavior so sales prioritizes the prospects most likely to convert. For SMBs, a simple 0–100 model surfaces sales-ready leads and prevents reps from wasting cycles on tire-kickers.",
    related: ["lead-qualification", "lead-nurturing", "crm", "marketing-automation"], popular: true }),
  tm({ slug: "sales-funnel", term: "Sales Funnel", category: "crm",
    short: "Buyer journey from awareness to purchase.",
    answer: "A sales funnel maps the stages a buyer moves through — awareness, interest, evaluation, and purchase — with drop-off rates at each step. Small businesses use funnel analytics to spot leaks, focus optimization on the weakest stage, and forecast revenue from top-of-funnel volume.",
    related: ["sales-pipeline", "marketing-funnel", "conversion-rate"] }),
  tm({ slug: "deal-stage", term: "Deal Stage", category: "crm",
    short: "The phase an opportunity occupies in your pipeline.",
    answer: "A deal stage is a named checkpoint (e.g. Qualified, Proposal, Negotiation) that reflects a buyer's commitment level. Well-defined stages with exit criteria make CRM forecasting reliable and let managers coach reps on the specific transition that's stalling.",
    related: ["sales-pipeline", "crm", "sales-forecasting"] }),
  tm({ slug: "customer-lifetime-value", term: "Customer Lifetime Value", category: "crm",
    synonyms: ["CLV", "LTV"],
    short: "Total revenue a customer generates over their lifetime.",
    answer: "Customer Lifetime Value (CLV or LTV) is the total revenue a business can expect from a single customer across their relationship. For SMBs, CLV determines how much you can spend to acquire customers and which segments deserve premium retention investment.",
    related: ["customer-retention", "customer-acquisition-cost", "customer-success"], popular: true }),
  tm({ slug: "sales-forecasting", term: "Sales Forecasting", category: "crm",
    short: "Predicting future revenue from pipeline data.",
    answer: "Sales forecasting uses historical performance, current pipeline, and stage-weighted probabilities to project revenue for upcoming periods. Accurate forecasts let SMB owners plan hiring, inventory, and cash flow with confidence instead of gut feel.",
    related: ["sales-pipeline", "pipeline-velocity", "financial-forecasting"] }),
  tm({ slug: "sales-cadence", term: "Sales Cadence", category: "crm",
    short: "A scheduled sequence of outreach touches.",
    answer: "A sales cadence is a repeatable sequence of touchpoints (calls, emails, LinkedIn messages) across a set number of days. Modern SMB cadences run 8–12 touches over 2–3 weeks, mixing channels to lift reply rates without overwhelming prospects.",
    related: ["sales-automation", "cold-email-outreach", "sales-cycle"] }),
  tm({ slug: "contact-management", term: "Contact Management", category: "crm",
    short: "Organizing customer and prospect information.",
    answer: "Contact management is the practice of storing, updating, and segmenting contact records — names, emails, roles, activity history — inside a CRM. Clean contact data is the foundation of every marketing, sales, and support workflow that follows.",
    related: ["crm", "customer-segmentation", "crm-integration"] }),
  tm({ slug: "sales-enablement", term: "Sales Enablement", category: "crm",
    short: "Equipping reps with content, tools, and training.",
    answer: "Sales enablement provides reps with the content, playbooks, training, and technology they need to sell effectively at every stage. For SMBs, it usually means a shared library of case studies, battlecards, and email templates that shortens ramp time.",
    related: ["sales-cadence", "customer-success", "crm"] }),
  tm({ slug: "crm-integration", term: "CRM Integration", category: "crm",
    short: "Connecting your CRM with other business tools.",
    answer: "CRM integration syncs your CRM with email, calendar, marketing automation, billing, and support tools so data flows in both directions. Native integrations and platforms like Zapier or Make eliminate double entry and give every team the same view of the customer.",
    related: ["crm", "marketing-automation", "workflow-automation"] }),
  tm({ slug: "lead-qualification", term: "Lead Qualification", category: "crm",
    short: "Deciding which leads are worth pursuing.",
    answer: "Lead qualification is the process of judging a lead's fit and readiness using frameworks like BANT (Budget, Authority, Need, Timeline) or MEDDIC. Good qualification stops reps from wasting time on bad-fit prospects and keeps forecast accuracy high.",
    related: ["lead-scoring", "mql-vs-sql", "sales-cycle"] }),
  tm({ slug: "sales-cycle", term: "Sales Cycle", category: "crm",
    short: "Time between first contact and closed deal.",
    answer: "The sales cycle is the average time it takes to convert a new lead into a paying customer. SMBs shorten cycles by tightening qualification, automating follow-ups, and removing friction from proposals and contracts.",
    related: ["sales-pipeline", "sales-cadence", "pipeline-velocity"] }),
  tm({ slug: "customer-onboarding", term: "Customer Onboarding", category: "crm",
    short: "Guiding new customers to first value.",
    answer: "Customer onboarding is the structured process of helping new customers reach their first meaningful outcome with your product. Strong onboarding lifts activation, reduces early churn, and is the single biggest lever on lifetime value for SMB SaaS.",
    related: ["customer-success", "customer-retention", "customer-lifetime-value"] }),
  tm({ slug: "customer-retention", term: "Customer Retention", category: "crm",
    short: "Keeping existing customers over time.",
    answer: "Customer retention is the ability to keep paying customers from month to month. Retention costs a fraction of acquisition and is the most efficient growth lever for subscription businesses — a 5% retention lift can raise profits 25–95%.",
    related: ["customer-lifetime-value", "customer-success", "net-revenue-retention"], popular: true }),
  tm({ slug: "customer-segmentation", term: "Customer Segmentation", category: "crm",
    short: "Grouping customers by shared attributes.",
    answer: "Customer segmentation splits your customer base into groups based on industry, size, behavior, or value so marketing, sales, and success can tailor messaging and offers. For SMBs, even three segments beat a single one-size-fits-all approach.",
    related: ["buyer-persona", "customer-lifetime-value", "email-marketing"] }),
  tm({ slug: "sales-quota", term: "Sales Quota", category: "crm",
    short: "Revenue or activity target assigned to a rep.",
    answer: "A sales quota is a measurable target — usually revenue, deals closed, or activities — assigned to a rep for a defined period. Realistic, transparent quotas drive performance; unrealistic ones drive turnover.",
    related: ["sales-forecasting", "sales-territory-management", "sales-enablement"] }),
  tm({ slug: "pipeline-velocity", term: "Pipeline Velocity", category: "crm",
    short: "How fast deals turn into revenue.",
    answer: "Pipeline velocity measures how quickly deals move through your pipeline to revenue, calculated as (opportunities × win rate × deal size) ÷ sales cycle length. Improving any lever compounds — small gains on each produce big revenue impact.",
    related: ["sales-pipeline", "sales-cycle", "sales-forecasting"] }),
  tm({ slug: "cold-email-outreach", term: "Cold Email Outreach", category: "crm",
    short: "Emailing prospects who haven't opted in.",
    answer: "Cold email outreach targets prospects who match your ICP but haven't engaged before. Effective SMB cold email is personalized at the opener, short, offers a specific insight, and follows up 3–5 times before disqualifying.",
    related: ["sales-cadence", "b2b-sales-prospecting", "email-marketing"] }),
  tm({ slug: "mql-vs-sql", term: "MQL vs SQL", category: "crm",
    synonyms: ["Marketing Qualified Lead", "Sales Qualified Lead"],
    short: "The difference between marketing- and sales-ready leads.",
    answer: "A Marketing Qualified Lead (MQL) has shown interest through content or forms; a Sales Qualified Lead (SQL) has been vetted by sales as a real opportunity. Clear MQL→SQL criteria stop marketing and sales from arguing over lead quality.",
    related: ["lead-qualification", "lead-scoring", "marketing-funnel"] }),
  tm({ slug: "sales-territory-management", term: "Sales Territory Management", category: "crm",
    short: "Dividing customers among reps fairly.",
    answer: "Sales territory management assigns accounts, geographies, or verticals to specific reps to prevent overlap and ensure coverage. Even 3-person SMB teams benefit from clear territories — it removes conflict and clarifies who owns each account.",
    related: ["sales-quota", "sales-enablement", "crm"] }),
  tm({ slug: "customer-success", term: "Customer Success", category: "crm",
    short: "Proactively driving customer outcomes.",
    answer: "Customer success is the discipline of proactively helping customers achieve their goals with your product so they renew and expand. For SMB SaaS, even a part-time CSM can lift net revenue retention by 15–30 points.",
    related: ["customer-onboarding", "customer-retention", "net-revenue-retention"] }),

  // ================= Marketing — long-tail =================
  tm({ slug: "content-marketing", term: "Content Marketing", category: "marketing",
    short: "Attracting customers with useful content.",
    answer: "Content marketing creates and distributes valuable articles, videos, and guides to attract and retain a defined audience. For SMBs, it's the highest-ROI long-term channel — every piece keeps working long after publication, compounding organic traffic and authority.",
    related: ["seo", "inbound-marketing", "keyword-research"], popular: true }),
  tm({ slug: "inbound-marketing", term: "Inbound Marketing", category: "marketing",
    short: "Pulling customers in with valuable content.",
    answer: "Inbound marketing attracts prospects through content, SEO, and social rather than interrupting them with ads. The SMB payoff: lower cost per lead over time and prospects who arrive already educated and self-qualified.",
    related: ["content-marketing", "seo", "lead-nurturing"] }),
  tm({ slug: "account-based-marketing", term: "Account-Based Marketing", category: "marketing",
    synonyms: ["ABM"],
    short: "Targeting specific high-value accounts.",
    answer: "Account-Based Marketing (ABM) focuses sales and marketing on a curated list of high-value target accounts with personalized campaigns. SMBs use lightweight ABM to punch above their weight against larger competitors in enterprise deals.",
    related: ["b2b-sales-prospecting", "buyer-persona", "customer-acquisition-cost"] }),
  tm({ slug: "keyword-research", term: "Keyword Research", category: "marketing",
    short: "Finding the terms your audience searches.",
    answer: "Keyword research identifies the search terms your audience uses so you can create content that ranks. Tools like Semrush, Ahrefs, and Google Keyword Planner reveal volume, difficulty, and intent — the foundation of every SEO strategy.",
    related: ["seo", "on-page-seo", "content-marketing"], popular: true }),
  tm({ slug: "on-page-seo", term: "On-Page SEO", category: "marketing",
    short: "Optimizing individual pages to rank higher.",
    answer: "On-page SEO covers everything on a page you control — title tags, headings, content quality, internal links, image alt text, and schema. For SMB sites, on-page fixes are the fastest ranking lever because they don't require earning backlinks.",
    related: ["seo", "technical-seo", "keyword-research"] }),
  tm({ slug: "off-page-seo", term: "Off-Page SEO", category: "marketing",
    short: "Signals from outside your site that boost rankings.",
    answer: "Off-page SEO covers ranking signals that happen away from your site — backlinks, brand mentions, and reputation. High-quality links from trusted sites remain the single strongest ranking factor Google uses.",
    related: ["link-building", "seo", "technical-seo"] }),
  tm({ slug: "technical-seo", term: "Technical SEO", category: "marketing",
    short: "Making a site crawlable, fast, and indexable.",
    answer: "Technical SEO covers the crawling, indexing, and rendering side of search — site speed, mobile usability, structured data, canonicals, and sitemaps. Broken technical foundations cap the ceiling of everything else you do.",
    related: ["seo", "on-page-seo", "off-page-seo"] }),
  tm({ slug: "link-building", term: "Link Building", category: "marketing",
    short: "Earning backlinks from other websites.",
    answer: "Link building earns inbound links from other websites through guest posts, digital PR, resource-page outreach, and quality content. Google still treats high-authority backlinks as one of its top ranking signals.",
    related: ["off-page-seo", "seo", "content-marketing"] }),
  tm({ slug: "ppc-advertising", term: "PPC Advertising", category: "marketing",
    synonyms: ["Pay-Per-Click"],
    short: "Paid ads charged per click.",
    answer: "Pay-per-click (PPC) advertising charges you only when someone clicks your ad. Google Ads and Meta Ads dominate the SMB market, offering high-intent traffic that's easy to measure and scale — as long as your unit economics work.",
    related: ["google-ads", "return-on-ad-spend", "customer-acquisition-cost"] }),
  tm({ slug: "google-ads", term: "Google Ads", category: "marketing",
    short: "Google's paid search and display ad platform.",
    answer: "Google Ads is Google's platform for search, display, YouTube, and Shopping ads. For most SMBs, high-intent search campaigns targeting bottom-of-funnel keywords deliver the fastest, most predictable ROI.",
    related: ["ppc-advertising", "return-on-ad-spend", "keyword-research"] }),
  tm({ slug: "landing-page", term: "Landing Page", category: "marketing",
    short: "A focused page built for a single conversion goal.",
    answer: "A landing page is a standalone web page designed around one specific offer and one call-to-action, with distractions stripped away. Purpose-built landing pages typically convert 2–5x better than sending traffic to a home page.",
    related: ["ab-testing", "conversion-rate", "ppc-advertising"] }),
  tm({ slug: "ab-testing", term: "A/B Testing", category: "marketing",
    synonyms: ["Split Testing"],
    short: "Comparing two variants to see which performs better.",
    answer: "A/B testing splits traffic between two versions of a page, email, or ad to measure which drives more conversions. For SMBs, testing headlines, CTAs, and hero images usually surfaces the biggest wins without needing a data science team.",
    related: ["landing-page", "conversion-rate", "email-marketing"] }),
  tm({ slug: "lead-magnet", term: "Lead Magnet", category: "marketing",
    short: "A free asset offered in exchange for an email.",
    answer: "A lead magnet is a valuable free asset — a template, guide, checklist, or tool — offered in exchange for contact details. Great lead magnets are specific, immediately useful, and aligned with what your paid product solves.",
    related: ["email-marketing", "landing-page", "lead-nurturing"] }),
  tm({ slug: "drip-campaign", term: "Drip Campaign", category: "marketing",
    short: "An automated series of pre-scheduled emails.",
    answer: "A drip campaign sends a pre-written sequence of emails triggered by a signup, purchase, or behavior. SMB drips typically educate new subscribers over 5–10 emails, warming them for a sales conversation or upgrade offer.",
    related: ["email-marketing", "marketing-automation", "lead-nurturing"] }),
  tm({ slug: "buyer-persona", term: "Buyer Persona", category: "marketing",
    short: "A fictional profile of your ideal customer.",
    answer: "A buyer persona is a semi-fictional profile of your ideal customer, capturing their role, goals, pains, and buying triggers. Personas keep marketing and sales aligned on who you're actually selling to — and who to say no to.",
    related: ["customer-segmentation", "account-based-marketing", "content-marketing"] }),
  tm({ slug: "marketing-funnel", term: "Marketing Funnel", category: "marketing",
    short: "The path from stranger to customer.",
    answer: "The marketing funnel maps the stages a prospect moves through — awareness, consideration, decision — with content and offers matched to each. Understanding funnel drop-off shows where to invest content and where to invest budget.",
    related: ["sales-funnel", "content-marketing", "conversion-rate"] }),
  tm({ slug: "customer-acquisition-cost", term: "Customer Acquisition Cost", category: "marketing",
    synonyms: ["CAC"],
    short: "Total cost to acquire one customer.",
    answer: "Customer Acquisition Cost (CAC) is total sales and marketing spend divided by new customers acquired. A healthy SMB SaaS business keeps LTV:CAC above 3:1 and payback under 12 months — anything worse burns cash without scaling.",
    related: ["customer-lifetime-value", "return-on-ad-spend", "burn-rate"], popular: true }),
  tm({ slug: "return-on-ad-spend", term: "Return on Ad Spend", category: "marketing",
    synonyms: ["ROAS"],
    short: "Revenue generated per dollar of ad spend.",
    answer: "Return on Ad Spend (ROAS) measures revenue generated for every dollar spent on advertising. A 4:1 ROAS is a common breakeven benchmark for e-commerce, though your true target depends on gross margin and repeat purchase rate.",
    related: ["ppc-advertising", "google-ads", "customer-acquisition-cost"] }),
  tm({ slug: "brand-awareness", term: "Brand Awareness", category: "marketing",
    short: "How familiar your target market is with your brand.",
    answer: "Brand awareness measures how well your target audience recognizes and remembers your brand. It's a leading indicator of demand — high awareness compounds into lower CAC, faster sales cycles, and stronger pricing power.",
    related: ["content-marketing", "social-media-marketing", "inbound-marketing"] }),
  tm({ slug: "social-media-marketing", term: "Social Media Marketing", category: "marketing",
    short: "Using social platforms to grow and engage an audience.",
    answer: "Social media marketing uses platforms like LinkedIn, Instagram, TikTok, and X to build audience, drive traffic, and support sales. For SMBs, focus wins — one platform executed well beats five neglected accounts.",
    related: ["content-marketing", "brand-awareness", "inbound-marketing"] }),
  tm({ slug: "b2b-sales-prospecting", term: "B2B Sales Prospecting", category: "crm",
    short: "Finding and researching potential business customers.",
    answer: "B2B sales prospecting identifies and researches companies and contacts that match your ideal customer profile before outreach. Tools like Apollo, LinkedIn Sales Navigator, and Clay let SMB teams build targeted lists in minutes instead of days.",
    related: ["cold-email-outreach", "account-based-marketing", "lead-qualification"] }),

  // ================= Finance & Accounting — long-tail =================
  tm({ slug: "bookkeeping", term: "Bookkeeping", category: "finance",
    short: "Recording day-to-day financial transactions.",
    answer: "Bookkeeping is the daily practice of recording income, expenses, and other financial transactions. Modern SMB bookkeeping runs in tools like QuickBooks or Xero with bank feeds and rules automating 80% of the work.",
    related: ["accounting-software", "bank-reconciliation", "chart-of-accounts"], popular: true }),
  tm({ slug: "accounts-receivable", term: "Accounts Receivable", category: "finance",
    synonyms: ["AR"],
    short: "Money customers owe you.",
    answer: "Accounts receivable (AR) is money owed by customers for goods or services already delivered. Fast, automated invoicing and dunning shrink AR days outstanding — the single biggest cash flow lever for most SMBs.",
    related: ["invoicing", "cash-flow", "dunning-management"] }),
  tm({ slug: "accounts-payable", term: "Accounts Payable", category: "finance",
    synonyms: ["AP"],
    short: "Money you owe to suppliers.",
    answer: "Accounts payable (AP) is money you owe to suppliers for goods or services already received. Well-managed AP protects vendor relationships, captures early-payment discounts, and avoids surprise cash crunches.",
    related: ["cash-flow", "expense-management", "accounting-software"] }),
  tm({ slug: "general-ledger", term: "General Ledger", category: "finance",
    short: "The master record of all financial transactions.",
    answer: "The general ledger is the master record where every financial transaction is posted using double-entry accounting. It's the source of your P&L, balance sheet, and every audit-grade financial report.",
    related: ["chart-of-accounts", "bookkeeping", "balance-sheet"] }),
  tm({ slug: "profit-and-loss-statement", term: "Profit and Loss Statement", category: "finance",
    synonyms: ["P&L", "Income Statement"],
    short: "A summary of revenue, costs, and profit.",
    answer: "A profit and loss (P&L) statement summarizes revenue, cost of goods sold, operating expenses, and net profit for a period. Reviewing your P&L monthly is the minimum bar for owning your numbers as an SMB founder.",
    related: ["balance-sheet", "net-profit", "gross-margin"] }),
  tm({ slug: "balance-sheet", term: "Balance Sheet", category: "finance",
    short: "A snapshot of assets, liabilities, and equity.",
    answer: "A balance sheet shows what a business owns (assets), owes (liabilities), and the owner's equity at a specific point in time. It's the first document investors and lenders read — a healthy balance sheet unlocks financing.",
    related: ["profit-and-loss-statement", "general-ledger", "cash-flow"] }),
  tm({ slug: "gross-margin", term: "Gross Margin", category: "finance",
    short: "Revenue minus cost of goods, as a percentage.",
    answer: "Gross margin is (revenue − cost of goods sold) ÷ revenue, expressed as a percentage. It's the ceiling on your profitability — a business with 20% gross margin cannot support the same overhead as one with 80%.",
    related: ["net-profit", "profit-and-loss-statement", "break-even-point"] }),
  tm({ slug: "net-profit", term: "Net Profit", category: "finance",
    short: "What's left after all expenses and taxes.",
    answer: "Net profit is total revenue minus all costs — including operating expenses, interest, and taxes. It's the true bottom line and the number that determines whether a business is actually creating value.",
    related: ["gross-margin", "profit-and-loss-statement", "burn-rate"] }),
  tm({ slug: "burn-rate", term: "Burn Rate", category: "finance",
    short: "How fast a business spends its cash.",
    answer: "Burn rate is the monthly rate at which a business consumes cash. Combined with cash on hand, it tells you your runway — the most important survival metric for any unprofitable SMB or startup.",
    related: ["runway", "cash-flow", "financial-forecasting"], popular: true }),
  tm({ slug: "runway", term: "Runway", category: "finance",
    short: "How many months of cash you have left.",
    answer: "Runway is cash on hand divided by monthly burn rate, expressed in months. Most SMBs and startups should maintain 12–18 months of runway; below 6 months forces reactive, often bad, decisions.",
    related: ["burn-rate", "cash-flow", "financial-forecasting"] }),
  tm({ slug: "break-even-point", term: "Break-Even Point", category: "finance",
    short: "The sales level where revenue equals total costs.",
    answer: "The break-even point is the revenue level at which total revenue equals total costs — the moment a business stops losing money. Knowing yours in units and dollars is the foundation of pricing and budgeting.",
    related: ["gross-margin", "net-profit", "financial-forecasting"] }),
  tm({ slug: "financial-forecasting", term: "Financial Forecasting", category: "finance",
    short: "Projecting future financial performance.",
    answer: "Financial forecasting projects revenue, expenses, and cash across future periods using historical data and assumptions. A rolling 12-month forecast lets SMB owners see cash crunches coming and act before it's an emergency.",
    related: ["cash-flow", "burn-rate", "sales-forecasting"] }),
  tm({ slug: "expense-management", term: "Expense Management", category: "finance",
    short: "Tracking, approving, and reporting business expenses.",
    answer: "Expense management covers how a business tracks, approves, and reimburses spending — usually through cards, apps, and receipt capture. Tools like Ramp, Brex, and Expensify eliminate spreadsheets and enforce policy automatically.",
    related: ["accounts-payable", "accounting-software", "cash-flow"] }),
  tm({ slug: "tax-compliance", term: "Tax Compliance", category: "finance",
    short: "Meeting all tax filing and payment obligations.",
    answer: "Tax compliance is the process of accurately calculating, filing, and paying every tax a business owes — income, payroll, sales/VAT, and local. Automation via Avalara, TaxJar, or your accounting tool prevents the fines that sink small businesses.",
    related: ["accounting-software", "invoicing", "recurring-billing"] }),
  tm({ slug: "recurring-billing", term: "Recurring Billing", category: "finance",
    short: "Charging customers on a repeating schedule.",
    answer: "Recurring billing automatically charges customers on a schedule — weekly, monthly, or yearly. It's the engine of the subscription economy and requires tooling that handles proration, upgrades, failed payments, and taxes correctly.",
    related: ["subscription-billing", "dunning-management", "mrr-monthly-recurring-revenue"] }),
  tm({ slug: "subscription-billing", term: "Subscription Billing", category: "finance",
    short: "Managing plans, upgrades, and renewals.",
    answer: "Subscription billing manages the full lifecycle of subscription plans — signup, upgrades, add-ons, renewals, cancellations, and refunds. Stripe Billing, Chargebee, and Paddle are the SMB defaults for anything beyond a single flat plan.",
    related: ["recurring-billing", "dunning-management", "mrr-monthly-recurring-revenue"] }),
  tm({ slug: "dunning-management", term: "Dunning Management", category: "finance",
    short: "Recovering failed subscription payments.",
    answer: "Dunning management automatically retries failed payments and emails customers to update expired cards. Smart dunning recovers 30–50% of involuntary churn — often more revenue than a small growth experiment.",
    related: ["subscription-billing", "recurring-billing", "customer-retention"] }),
  tm({ slug: "chart-of-accounts", term: "Chart of Accounts", category: "finance",
    short: "The structured list of every account in your ledger.",
    answer: "The chart of accounts is the structured list of every asset, liability, equity, revenue, and expense account a business uses. A clean chart of accounts makes reports readable; a messy one makes them useless.",
    related: ["general-ledger", "bookkeeping", "accounting-software"] }),
  tm({ slug: "bank-reconciliation", term: "Bank Reconciliation", category: "finance",
    short: "Matching your books to your bank statement.",
    answer: "Bank reconciliation matches transactions in your accounting software against your bank statement to catch errors, missing entries, and fraud. Monthly reconciliation is a non-negotiable habit for accurate financials.",
    related: ["bookkeeping", "accounting-software", "chart-of-accounts"] }),
  tm({ slug: "mrr-monthly-recurring-revenue", term: "MRR (Monthly Recurring Revenue)", category: "finance",
    synonyms: ["MRR", "ARR"],
    short: "Predictable subscription revenue per month.",
    answer: "Monthly Recurring Revenue (MRR) is the normalized monthly revenue from all active subscriptions. It's the north-star metric of SaaS — growth, churn, expansion, and forecasting all flow from MRR and its annualized cousin ARR.",
    related: ["subscription-billing", "customer-lifetime-value", "net-revenue-retention"], trending: true }),
  tm({ slug: "net-revenue-retention", term: "Net Revenue Retention", category: "finance",
    synonyms: ["NRR"],
    short: "Revenue retained from existing customers, net of churn.",
    answer: "Net Revenue Retention (NRR) measures the change in revenue from your existing customer base over a period, including upgrades, downgrades, and churn. Best-in-class SaaS businesses run NRR above 110% — expansion outpaces churn.",
    related: ["customer-retention", "mrr-monthly-recurring-revenue", "customer-success"] }),

  // ================= Productivity & PM — long-tail =================
  tm({ slug: "kanban-board", term: "Kanban Board", category: "productivity",
    short: "A visual board of columns representing workflow.",
    answer: "A Kanban board visualizes work as cards moving through columns (To Do, Doing, Done). It exposes bottlenecks, limits work-in-progress, and works for anything from software sprints to editorial calendars in Trello, Notion, or Jira.",
    related: ["scrum-methodology", "agile-project-management", "work-in-progress-limit"], popular: true }),
  tm({ slug: "scrum-methodology", term: "Scrum Methodology", category: "productivity",
    short: "An agile framework based on short sprints.",
    answer: "Scrum is an agile framework that organizes work into fixed-length sprints, with daily standups, sprint planning, and retrospectives. It's overkill for a 2-person team but transformative for growing engineering or product groups.",
    related: ["agile-project-management", "sprint-planning", "daily-standup"] }),
  tm({ slug: "agile-project-management", term: "Agile Project Management", category: "productivity",
    short: "Iterative delivery in short, feedback-driven cycles.",
    answer: "Agile project management delivers work in short, iterative cycles with continuous feedback rather than one big-bang release. For SMBs, agile principles matter more than any specific framework — ship small, learn fast, adjust.",
    related: ["scrum-methodology", "kanban-board", "sprint-planning"] }),
  tm({ slug: "gantt-chart", term: "Gantt Chart", category: "productivity",
    short: "A timeline view of tasks and dependencies.",
    answer: "A Gantt chart displays tasks as horizontal bars across a timeline, showing durations, dependencies, and progress. It's the go-to view for waterfall-style planning and client-facing project schedules.",
    related: ["project-management", "project-milestone", "resource-planning"] }),
  tm({ slug: "workflow-automation", term: "Workflow Automation", category: "productivity",
    short: "Software that runs multi-step processes automatically.",
    answer: "Workflow automation uses tools like Zapier, Make, or n8n to chain apps together and remove manual steps from routine processes. A typical SMB automates lead capture, invoice creation, and internal notifications first.",
    related: ["marketing-automation", "sales-automation", "crm-integration"] }),
  tm({ slug: "time-tracking", term: "Time Tracking", category: "productivity",
    short: "Recording time spent on tasks and projects.",
    answer: "Time tracking records how long team members spend on tasks or clients, feeding billing, capacity planning, and profitability analysis. For agencies and consultancies, accurate time tracking is the difference between profit and quiet loss.",
    related: ["resource-planning", "project-management", "productivity-metrics"] }),
  tm({ slug: "okrs-objectives-key-results", term: "OKRs (Objectives & Key Results)", category: "productivity",
    synonyms: ["OKR"],
    short: "A goal-setting framework linking objectives to measurable results.",
    answer: "OKRs (Objectives and Key Results) pair a qualitative objective with 2–5 measurable key results per quarter. Popularized at Google, OKRs help SMBs focus a whole team on a small number of outcomes that actually move the business.",
    related: ["productivity-metrics", "project-management", "sprint-planning"] }),
  tm({ slug: "sprint-planning", term: "Sprint Planning", category: "productivity",
    short: "Selecting and committing to work for a sprint.",
    answer: "Sprint planning is the meeting where a team selects and commits to the work they'll complete in an upcoming sprint. Good sprint planning ends with a clear goal, a realistic backlog, and shared understanding of what 'done' means.",
    related: ["scrum-methodology", "agile-project-management", "daily-standup"] }),
  tm({ slug: "asynchronous-communication", term: "Asynchronous Communication", category: "productivity",
    synonyms: ["Async Work"],
    short: "Communication that doesn't require simultaneous presence.",
    answer: "Asynchronous communication lets teammates respond on their own schedule — via Loom, Notion, Slack threads, or long-form docs — instead of live meetings. It's the operating system of high-performing remote teams.",
    related: ["remote-work", "team-collaboration-software", "meeting-management"] }),
  tm({ slug: "remote-work", term: "Remote Work", category: "productivity",
    short: "Working from any location outside a central office.",
    answer: "Remote work lets teams operate from any location using cloud tools for communication, collaboration, and access. Well-run remote SMBs hire from a global talent pool and cut real-estate overhead to zero.",
    related: ["asynchronous-communication", "team-collaboration-software", "remote-collaboration"], popular: true }),
  tm({ slug: "team-collaboration-software", term: "Team Collaboration Software", category: "productivity",
    short: "Tools for shared work, chat, and docs.",
    answer: "Team collaboration software (Slack, Microsoft Teams, Notion, Google Workspace) centralizes chat, documents, and project work in one place. Choosing a small, coherent stack beats stitching together a dozen niche tools.",
    related: ["remote-collaboration", "document-management", "knowledge-base"] }),
  tm({ slug: "document-management", term: "Document Management", category: "productivity",
    short: "Storing, versioning, and sharing business documents.",
    answer: "Document management organizes business documents with permissions, versioning, and search — usually in Google Drive, SharePoint, or Notion. For SMBs, a clear folder taxonomy plus consistent naming beats any expensive DMS.",
    related: ["knowledge-base", "team-collaboration-software", "remote-collaboration"] }),
  tm({ slug: "knowledge-base", term: "Knowledge Base", category: "productivity",
    short: "A searchable library of internal or customer articles.",
    answer: "A knowledge base is a searchable collection of articles that answer common internal or customer questions. Public knowledge bases deflect support tickets; internal ones cut onboarding time and Slack pings in half.",
    related: ["document-management", "customer-success", "team-collaboration-software"] }),
  tm({ slug: "meeting-management", term: "Meeting Management", category: "productivity",
    short: "Running fewer, shorter, better meetings.",
    answer: "Meeting management covers the practices — agendas, timeboxing, decisions, notes — that keep meetings short and productive. Every SMB should audit its recurring meetings quarterly; most can cancel half without losing anything.",
    related: ["asynchronous-communication", "team-collaboration-software", "productivity-metrics"] }),
  tm({ slug: "task-prioritization", term: "Task Prioritization", category: "productivity",
    short: "Deciding what to work on first.",
    answer: "Task prioritization uses frameworks like Eisenhower, RICE, or MoSCoW to rank tasks by impact and urgency. For SMB founders, a weekly prioritization ritual is worth more than any new productivity app.",
    related: ["task-management", "okrs-objectives-key-results", "productivity-metrics"] }),
  tm({ slug: "resource-planning", term: "Resource Planning", category: "productivity",
    short: "Allocating people and budget across projects.",
    answer: "Resource planning matches people, budget, and time across active and upcoming projects so nothing is over- or under-committed. Tools like Float, Runn, and Resource Guru make capacity planning visual for SMB service businesses.",
    related: ["project-management", "gantt-chart", "time-tracking"] }),
  tm({ slug: "project-milestone", term: "Project Milestone", category: "productivity",
    short: "A significant checkpoint in a project timeline.",
    answer: "A project milestone is a fixed checkpoint in a project — often tied to a deliverable, approval, or payment. Milestones give stakeholders visible progress and turn a long project into a series of manageable wins.",
    related: ["project-management", "gantt-chart", "sprint-planning"] }),
  tm({ slug: "work-in-progress-limit", term: "Work-in-Progress Limit", category: "productivity",
    synonyms: ["WIP Limit"],
    short: "A cap on how many tasks are active at once.",
    answer: "A work-in-progress (WIP) limit caps how many tasks are active at any time in a workflow column. WIP limits force teams to finish before starting — the single fastest way to increase throughput on any Kanban board.",
    related: ["kanban-board", "agile-project-management", "task-management"] }),
  tm({ slug: "daily-standup", term: "Daily Standup", category: "productivity",
    short: "A short daily meeting to sync on progress.",
    answer: "A daily standup is a short (usually 15-minute) meeting where teammates share what they did, what they're doing, and what's blocking them. Async standups in Slack or Geekbot work as well as live ones for most remote SMBs.",
    related: ["scrum-methodology", "asynchronous-communication", "sprint-planning"] }),
  tm({ slug: "productivity-metrics", term: "Productivity Metrics", category: "productivity",
    short: "Measurements of individual or team output.",
    answer: "Productivity metrics measure output relative to input — throughput, cycle time, lead time, utilization. Track a small set of trend lines rather than obsessing over individual numbers, which tend to distort behavior.",
    related: ["okrs-objectives-key-results", "time-tracking", "project-management"] }),

  // ================= E-commerce — long-tail =================
  tm({ slug: "abandoned-cart-recovery", term: "Abandoned Cart Recovery", category: "e-commerce",
    short: "Winning back shoppers who left items in cart.",
    answer: "Abandoned cart recovery uses email, SMS, and retargeting to bring back shoppers who added items but didn't check out. Well-tuned recovery flows commonly recover 10–15% of abandoned carts — pure incremental revenue.",
    related: ["cart-abandonment-rate", "email-marketing", "ecommerce-conversion-funnel"], popular: true }),
  tm({ slug: "dropshipping", term: "Dropshipping", category: "e-commerce",
    short: "Selling products shipped directly from a supplier.",
    answer: "Dropshipping is an e-commerce model where the retailer sells products but a third-party supplier ships them directly to the customer. It removes inventory risk but caps margins and product control — best paired with strong branding.",
    related: ["ecommerce", "inventory-management", "fulfillment-service"] }),
  tm({ slug: "product-listing-optimization", term: "Product Listing Optimization", category: "e-commerce",
    short: "Improving product pages to convert more visitors.",
    answer: "Product listing optimization improves titles, images, descriptions, reviews, and structured data to convert more visitors and rank higher on Amazon, Google Shopping, and your own site. Small copy and imagery tweaks compound across every SKU.",
    related: ["on-page-seo", "ecommerce-conversion-funnel", "checkout-optimization"] }),
  tm({ slug: "checkout-optimization", term: "Checkout Optimization", category: "e-commerce",
    short: "Reducing friction between cart and confirmation.",
    answer: "Checkout optimization removes friction from the final steps of an e-commerce funnel — guest checkout, express payments, address autofill, trust signals. Every field removed typically lifts conversion 1–3%.",
    related: ["cart-abandonment-rate", "conversion-rate", "payment-gateway"] }),
  tm({ slug: "inventory-management", term: "Inventory Management", category: "e-commerce",
    short: "Tracking stock levels across products and locations.",
    answer: "Inventory management tracks stock levels, reorder points, and movement across SKUs and warehouses. Getting it right prevents stockouts (lost sales) and overstock (dead cash) — both silent killers of SMB e-commerce margin.",
    related: ["order-management-system", "shipping-management", "dropshipping"] }),
  tm({ slug: "order-management-system", term: "Order Management System", category: "e-commerce",
    synonyms: ["OMS"],
    short: "Software that handles orders end-to-end.",
    answer: "An Order Management System (OMS) consolidates orders from every sales channel and manages inventory, fulfillment, and returns in one workflow. Growing multi-channel SMB retailers hit the ceiling of Shopify's native tools around this point.",
    related: ["inventory-management", "shipping-management", "omnichannel-retail"] }),
  tm({ slug: "shipping-management", term: "Shipping Management", category: "e-commerce",
    short: "Automating labels, carriers, and rates.",
    answer: "Shipping management platforms (ShipStation, Shippo, EasyPost) automate label creation, compare carrier rates, and print in bulk. For SMB e-commerce, they cut fulfillment time per order from minutes to seconds.",
    related: ["order-management-system", "fulfillment-service", "inventory-management"] }),
  tm({ slug: "omnichannel-retail", term: "Omnichannel Retail", category: "e-commerce",
    short: "Selling seamlessly across every customer channel.",
    answer: "Omnichannel retail gives customers a consistent experience across web, mobile, marketplaces, social, and physical stores — with unified inventory, orders, and customer data. It's how modern SMB brands compete with big retailers.",
    related: ["ecommerce", "marketplace-selling", "order-management-system"] }),
  tm({ slug: "headless-commerce", term: "Headless Commerce", category: "e-commerce",
    short: "Decoupling the storefront from the commerce backend.",
    answer: "Headless commerce separates the customer-facing storefront from the commerce engine, letting brands build custom frontends (Next.js, Astro) on top of platforms like Shopify or commercetools. It trades speed of setup for design and performance freedom.",
    related: ["ecommerce", "shopify", "conversion-rate"] }),
  tm({ slug: "product-information-management", term: "Product Information Management", category: "e-commerce",
    synonyms: ["PIM"],
    short: "A central source of truth for product data.",
    answer: "Product Information Management (PIM) centralizes product data — attributes, descriptions, images, translations — and syndicates it to every sales channel. Retailers with more than a few hundred SKUs eventually need one; smaller catalogs can live in Shopify plus a spreadsheet.",
    related: ["inventory-management", "omnichannel-retail", "product-listing-optimization"] }),
  tm({ slug: "digital-wallet", term: "Digital Wallet", category: "e-commerce",
    short: "Stored payment methods for one-tap checkout.",
    answer: "A digital wallet (Apple Pay, Google Pay, Shop Pay, PayPal) stores payment credentials for one-tap checkout. Enabling the top 3 wallets in your region typically lifts mobile conversion 10–20% with almost no engineering effort.",
    related: ["payment-gateway", "checkout-optimization", "conversion-rate"] }),
  tm({ slug: "subscription-commerce", term: "Subscription Commerce", category: "e-commerce",
    short: "Selling physical goods on a recurring schedule.",
    answer: "Subscription commerce sells physical products (coffee, supplements, consumables) on a recurring schedule via tools like Recharge or Skio. It boosts LTV and predictability but demands tight logistics and churn management.",
    related: ["subscription-billing", "customer-retention", "mrr-monthly-recurring-revenue"] }),
  tm({ slug: "b2b-ecommerce", term: "B2B E-commerce", category: "e-commerce",
    short: "Online selling to other businesses.",
    answer: "B2B e-commerce covers online buying and selling between businesses, with features like customer-specific pricing, quotes, purchase orders, and net terms. Platforms like Shopify Plus B2B and BigCommerce B2B now match legacy systems at a fraction of the cost.",
    related: ["ecommerce", "shopify", "account-based-marketing"] }),
  tm({ slug: "marketplace-selling", term: "Marketplace Selling", category: "e-commerce",
    short: "Listing products on Amazon, Etsy, and similar platforms.",
    answer: "Marketplace selling lists your products on Amazon, eBay, Etsy, Walmart, or vertical platforms to reach existing buyer traffic. It trades margin and brand control for volume — most SMB retailers now sell across both their own store and 1–2 marketplaces.",
    related: ["omnichannel-retail", "product-listing-optimization", "ecommerce"] }),
  tm({ slug: "average-order-value", term: "Average Order Value", category: "e-commerce",
    synonyms: ["AOV"],
    short: "Average revenue per order.",
    answer: "Average Order Value (AOV) is total revenue divided by number of orders. Lifting AOV through upsells, bundles, and free-shipping thresholds is often faster than acquiring new traffic and drops straight to the bottom line.",
    related: ["upsell-and-cross-sell", "ecommerce-conversion-funnel", "conversion-rate"] }),
  tm({ slug: "cart-abandonment-rate", term: "Cart Abandonment Rate", category: "e-commerce",
    short: "Share of carts started but never checked out.",
    answer: "Cart abandonment rate measures the percentage of shoppers who add items to cart but leave without buying — industry averages sit around 70%. Improving checkout UX, adding trust signals, and running recovery flows are the standard levers.",
    related: ["abandoned-cart-recovery", "checkout-optimization", "conversion-rate"] }),
  tm({ slug: "return-management", term: "Return Management", category: "e-commerce",
    synonyms: ["RMA", "Reverse Logistics"],
    short: "Handling refunds, exchanges, and returned inventory.",
    answer: "Return management covers the policies and tooling for processing refunds, exchanges, and returned inventory. Self-serve return portals like Loop and Returnly cut support tickets and turn returns into exchange revenue.",
    related: ["order-management-system", "customer-retention", "fulfillment-service"] }),
  tm({ slug: "fulfillment-service", term: "Fulfillment Service", category: "e-commerce",
    synonyms: ["3PL"],
    short: "A third party that stores and ships your inventory.",
    answer: "A fulfillment service (3PL) stores your inventory and ships orders on your behalf — ShipBob, Deliverr, and Amazon FBA are common SMB choices. It converts fixed warehousing costs into variable per-order fees and frees founders from the warehouse.",
    related: ["shipping-management", "inventory-management", "dropshipping"] }),
  tm({ slug: "upsell-and-cross-sell", term: "Upsell and Cross-Sell", category: "e-commerce",
    short: "Offering upgrades or complementary products.",
    answer: "Upselling offers a higher-tier version of what a customer is buying; cross-selling offers complementary products. Post-purchase upsells on the thank-you page and one-click add-ons at checkout are the highest-ROI SMB tactics.",
    related: ["average-order-value", "ecommerce-conversion-funnel", "customer-lifetime-value"] }),
  tm({ slug: "ecommerce-conversion-funnel", term: "E-commerce Conversion Funnel", category: "e-commerce",
    short: "The path from product view to purchase.",
    answer: "The e-commerce conversion funnel tracks visitors from landing → product view → add to cart → checkout → purchase, with drop-off measured at each step. Fixing the biggest leak — usually cart-to-checkout — typically produces the fastest revenue gains.",
    related: ["conversion-rate", "cart-abandonment-rate", "checkout-optimization"] }),
];

// Full list of every glossary slug — imported by vite.config.ts for static prerender.
export const glossarySlugsAll = glossaryTerms.map((g) => g.slug);

export const glossaryBySlug = (slug: string) =>
  glossaryTerms.find((t) => t.slug === slug);

export const glossaryByCategory = (categorySlug: string) =>
  glossaryTerms.filter((t) => t.category === categorySlug);

export const popularTerms = () => glossaryTerms.filter((t) => t.popular);
export const trendingTerms = () => glossaryTerms.filter((t) => t.trending);
export const recentTerms = (limit = 6) =>
  [...glossaryTerms]
    .sort((a, b) => +new Date(b.lastUpdated) - +new Date(a.lastUpdated))
    .slice(0, limit);

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const termsByLetter = () => {
  const map: Record<string, GlossaryTerm[]> = {};
  for (const letter of alphabet) map[letter] = [];
  for (const t of glossaryTerms) {
    const l = t.term[0].toUpperCase();
    if (map[l]) map[l].push(t);
  }
  for (const l of alphabet) {
    map[l].sort((a, b) => a.term.localeCompare(b.term));
  }
  return map;
};

export const categoryOf = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export const relatedTerms = (slug: string, limit = 4) => {
  const current = glossaryBySlug(slug);
  if (!current) return [];
  const explicit = current.related
    .map(glossaryBySlug)
    .filter((x): x is GlossaryTerm => !!x);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const bySameCat = glossaryByCategory(current.category)
    .filter((t) => t.slug !== current.slug && !explicit.some((e) => e.slug === t.slug))
    .slice(0, limit - explicit.length);
  return [...explicit, ...bySameCat];
};

export const termUrl = (slug: string) => `/glossary/what-is-${slug}`;
