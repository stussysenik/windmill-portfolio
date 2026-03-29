import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";

/**
 * Free Performance Management Tools page.
 *
 * Showcases standalone, no-signup-required tools that solve real performance
 * management problems. Each tool card links to its dedicated interactive page.
 * Layout mirrors gowindmill.com/tools — a tight hero, numbered tool cards,
 * and a branded footer nudge.
 */

export function meta() {
  return [
    { title: "Free Performance Management Tools — Windmill" },
    {
      name: "description",
      content:
        "Practical tools for performance management. No signup. No email. Just useful tools that solve real problems.",
    },
  ];
}

// ── Tool data ───────────────────────────────────────────────────────────────

interface Tool {
  number: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

const tools: Tool[] = [
  {
    number: "01",
    title: "Self Review Tool",
    description:
      "Transform scattered accomplishments into a compelling narrative. Our AI helps you articulate impact you've forgotten and structure your self-review in minutes.",
    cta: "WRITE YOUR REVIEW",
    href: "/tools/self-review",
  },
  {
    number: "02",
    title: "Performance Cycle Cost Calculator",
    description:
      "Expose the hidden cost of your review cycle. See exactly how many hours your org burns on performance reviews — and what you'd save with automation.",
    cta: "CALCULATE YOUR COSTS",
    href: "/tools/cost-calculator",
  },
];

// ── Component ───────────────────────────────────────────────────────────────

export default function ToolsPage() {
  return (
    <section className="py-24 sm:py-32">
      <Container size="medium">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Free Tools
          </p>
          <h1 className="mt-4 display-headline text-4xl sm:text-5xl lg:text-6xl">
            Practical tools for{" "}
            <br className="hidden sm:block" />
            performance management
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            No signup. No email. Just useful tools that solve real problems.
          </p>
        </motion.div>

        {/* Tool cards */}
        <div className="mt-16 space-y-6">
          {tools.map((tool, index) => (
            <ScrollReveal key={tool.number} delay={index * 0.1}>
              <Link to={tool.href} className="group block">
                <article className="relative overflow-hidden rounded-2xl border border-border bg-white p-8 sm:p-10 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  {/* Number badge */}
                  <span className="inline-block text-sm font-mono font-semibold text-muted-foreground/50 mb-6">
                    {tool.number}
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    {/* Icon placeholder — gradient circle with tool initial */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.278_0.033_256.848)] to-[oklch(0.205_0.042_265.755)] text-white text-xl font-display font-bold">
                      {tool.number}
                    </div>

                    {/* Copy */}
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {tool.title}
                      </h2>
                      <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* CTA row */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                    <span>{tool.cta}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer nudge */}
        <ScrollReveal delay={0.2} className="mt-16 text-center">
          <p className="text-muted-foreground">
            Built by Windmill — the AI-powered performance review platform that
            runs itself.{" "}
            <Link
              to="/start"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              See how it works →
            </Link>
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
