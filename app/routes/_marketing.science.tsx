import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { cdnImage } from "~/lib/images";

export function meta() {
  return [
    { title: "How It Works — Windmill" },
    {
      name: "description",
      content:
        "Windmill combines deep integrations, organizational network analysis, and conversational AI to turn raw data into true understanding of how work happens.",
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Data for the numbered pipeline sections                           */
/* ------------------------------------------------------------------ */

interface PipelineSection {
  number: string;
  label: string;
  title: string;
  subtitle: string;
  image?: { src: string; alt: string };
  cards: { heading: string; body: string }[];
  cta: { text: string; to: string };
}

const pipelineSections: PipelineSection[] = [
  {
    number: "01",
    label: "FOUNDATION",
    title: "Deep Integrations",
    subtitle:
      "To understand how work actually happens, you need to see it where it happens. No single system knows what everyone is working on in real-time. So we connect to all of them.",
    cards: [
      {
        heading: "The Challenge",
        body: "Most 'visibility' tools fail because they either rely on manual input (which never scales) or violate trust through surveillance.",
      },
      {
        heading: "Our Solution",
        body: "Observe work as it naturally happens through the digital trails left in business systems. By connecting to GitHub, Jira, Asana, Salesforce, Slack, Zoom, and 20+ other tools, we build a comprehensive picture of work across your organization.",
      },
      {
        heading: "The Technical Challenge",
        body: "Identity mapping across systems, normalizing disparate APIs, resolving duplicates, and creating unified timelines — all while ensuring only work-related data is captured. This isn't surveillance. It's infrastructure.",
      },
    ],
    cta: { text: "View All Integrations", to: "/integrations" },
  },
  {
    number: "02",
    label: "ANALYSIS",
    title: "Organizational Network Analysis",
    subtitle:
      "Org charts show formal structure, not functional reality. They tell you who reports to whom, but not who actually solves problems together.",
    image: {
      src: cdnImage("marketing/ona.png", { width: 2880, height: 1763 }),
      alt: "ONA",
    },
    cards: [
      {
        heading: "The Problem",
        body: "Cross-functional collaboration is the reality of modern work, but most systems still think in hierarchies and silos.",
      },
      {
        heading: "Our Approach",
        body: "Map real collaboration patterns through digital breadcrumbs — engineers reviewing each other's code, designers collaborating in Figma, PMs commenting on docs, sales reps joining calls with support.",
      },
      {
        heading: "Why It Matters",
        body: "This real-time map powers smarter systems. Take feedback: instead of asking people to pick reviewers (who usually choose friends), Windmill suggests reviewers based on actual working relationships — including recent ones. Feedback becomes grounded in reality, easier to give, and more relevant.",
      },
      {
        heading: "The Insight",
        body: "We identify super-connectors (who work across functions and pass context between teams) and isolates (focused on deep, specialized work). Neither is better or worse — but understanding the difference helps you design better systems and support each type of contributor.",
      },
    ],
    cta: {
      text: "Read More: Your Org Isn't a Tree. It's a Graph.",
      to: "/blog/your-org-isnt-a-tree-its-a-graph",
    },
  },
  {
    number: "03",
    label: "CONVERSATION",
    title: "Conversational AI",
    subtitle:
      "Traditional surveys have <5% response rates. Forms are rigid and impersonal. Windy changes that.",
    image: {
      src: cdnImage("marketing/natural-language-chat-preview-3.png", {
        width: 1920,
        height: 933,
      }),
      alt: "Natural Language Preview",
    },
    cards: [
      {
        heading: "The Problem",
        body: "Most performance management tools force employees into forms and surveys that feel like administrative overhead, not meaningful conversations.",
      },
      {
        heading: "Our Solution",
        body: "State-of-the-art large language models power natural, adaptive conversations in Slack and Teams — where employees already work.",
      },
      {
        heading: "How It Works",
        body: "Windy doesn't just ask pre-written questions. It adapts based on responses, asks follow-up questions to get depth, and has conversations that feel natural. This is why companies see 80%+ response rates with Windy instead of the 10-30% typical of traditional tools.",
      },
      {
        heading: "AI Agent",
        body: "Windy isn't just a chatbot. It's an AI agent that proactively gathers context, understands nuance, and gets smarter over time.",
      },
    ],
    cta: { text: "Meet Windy: The AI Teammate", to: "/blog/meet-windy" },
  },
];

/* ------------------------------------------------------------------ */
/*  Stats bar for the Application section                             */
/* ------------------------------------------------------------------ */

const reviewStats = [
  { label: "Time per review", value: "6 min" },
  { label: "Cycle time reduction", value: "86%" },
  { label: "Response rate", value: "80%+" },
  { label: "Pre-written by AI", value: "90%" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function SciencePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container size="medium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="display-headline text-4xl sm:text-5xl lg:text-6xl">
              Data is nothing without context.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Windmill combines deep integrations, organizational network
              analysis, and conversational AI to turn raw data into true
              understanding of how work happens.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Pipeline sections (01 / 02 / 03) ────────────────────── */}
      {pipelineSections.map((section, idx) => (
        <section key={section.number} className="py-16 sm:py-24">
          <Container size="wide">
            {/* Section badge */}
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-sm font-mono font-bold text-primary">
                  {section.number}
                </span>
                <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {section.label}
                </span>
              </div>
            </ScrollReveal>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left column — text content */}
              <div>
                <ScrollReveal delay={0.1}>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                    {section.subtitle}
                  </p>
                </ScrollReveal>

                <div className="mt-10 space-y-8">
                  {section.cards.map((card, cardIdx) => (
                    <ScrollReveal key={card.heading} delay={0.15 + cardIdx * 0.08}>
                      <div className="rounded-xl border border-border bg-white p-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                          {card.heading}
                        </h3>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                          {card.body}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* CTA link */}
                <ScrollReveal delay={0.3}>
                  <div className="mt-8">
                    <Link
                      to={section.cta.to}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 transition-colors"
                    >
                      {section.cta.text}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right column — image (when available) */}
              {section.image && (
                <ScrollReveal delay={0.2} direction="right">
                  <div className="flex items-start justify-center">
                    <img
                      src={section.image.src}
                      alt={section.image.alt}
                      className="w-full rounded-2xl border border-border shadow-card"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </ScrollReveal>
              )}
            </div>
          </Container>
        </section>
      ))}

      {/* ── Application — AI-Powered Performance Reviews ─────── */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <Container size="wide">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-sm font-mono font-bold text-primary">
                04
              </span>
              <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                APPLICATION
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight max-w-3xl">
              AI-Powered Performance Reviews
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl">
              See how deep integrations, organizational network analysis, and
              conversational AI combine to transform performance reviews from 6
              hours of busywork into 6 minutes of meaningful reflection.
            </p>
          </ScrollReveal>

          {/* Self Review + Peer Review cards */}
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Self Review */}
            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl border border-border bg-white p-8 h-full">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  Self Review
                </h3>
                <p className="mt-1 text-sm text-primary font-medium">
                  Context from Integrations
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Windy automatically gathers context from GitHub, Jira,
                  Salesforce, and your other tools to create a comprehensive
                  report of what you've accomplished. No more digging through
                  your work to remember what you've done.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Then Windy has a natural conversation to help you reflect on
                  your impact, challenges, and growth areas — all grounded in
                  real work data.
                </p>
              </div>
            </ScrollReveal>

            {/* Peer Review */}
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl border border-border bg-white p-8 h-full">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  Peer Review
                </h3>
                <p className="mt-1 text-sm text-primary font-medium">
                  Powered by ONA
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Instead of asking you to pick reviewers (who are often just
                  friends), Windy uses organizational network analysis to
                  suggest colleagues you've actually collaborated with recently.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Windy then has natural conversations with your peers to gather
                  specific, actionable feedback based on real work you've done
                  together.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats bar */}
          <ScrollReveal delay={0.25}>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-2xl border border-border bg-white p-8">
              {reviewStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="text-sm text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-3xl font-display font-bold tracking-tight text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8">
              <Link
                to="/features/performance-reviews"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 transition-colors"
              >
                See How Performance Reviews Work
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ── The Future ───────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container size="medium">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              The Future
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              This is just the beginning. Imagine having a live network view of
              your organization that evolves week to week. Then imagine being
              able to simulate changes:
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              That's the future: organizational design with feedback loops. A
              system that helps you experiment, learn, and build a company that
              works better over time.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Because running a great company isn't just about strategy. It's
              about coordination. And coordination starts with knowing how your
              people really work together.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-10">
              <Link
                to="/start"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                See Windmill in Action
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
