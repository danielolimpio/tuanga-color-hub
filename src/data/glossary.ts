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
];

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
