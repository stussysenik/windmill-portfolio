import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { Card, CardContent } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { CountUp } from "~/components/motion/CountUp";

/**
 * AIResearchCTA -- a section that highlights Windmill's AI research and
 * credibility, linking out to published papers, blog posts, or benchmarks.
 *
 * This section serves two purposes:
 * 1. Differentiate Windmill from "AI-washing" competitors by showing
 *    concrete research and metrics.
 * 2. Act as a secondary CTA for prospects who want to dig deeper before
 *    committing.
 *
 * Layout: a two-column card with stats on the left and a narrative +
 * CTA on the right. Uses the dark Card variant for visual weight.
 */

const researchStats = [
  { value: 93, suffix: "%", label: "Employee satisfaction" },
  { value: 90, suffix: "%", label: "Faster review cycles" },
  { value: 4.8, suffix: "/5", label: "Average rating", decimals: 1 },
] as const;

export function AIResearchCTA() {
  return (
    <section className="py-20 sm:py-28">
      <Container size="default">
        <ScrollReveal>
          <Card variant="dark" className="overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left side -- stats */}
              <CardContent className="p-8 sm:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                <Badge className="self-start mb-6 bg-white/10 text-white/80 border-0">
                  AI Research
                </Badge>
                <h2 className="display-headline-2 text-2xl sm:text-3xl text-white mb-8">
                  Built on real research,
                  <br />
                  not buzzwords
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  {researchStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-3xl sm:text-4xl font-bold font-display text-white">
                        <CountUp
                          to={stat.value}
                          suffix={stat.suffix}
                          decimals={stat.decimals ?? 0}
                          duration={1.8}
                        />
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-white/50">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Right side -- narrative + CTA */}
              <CardContent className="p-8 sm:p-12 flex flex-col justify-center">
                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
                  Windmill's AI is purpose-built for performance management. Our
                  models are trained on anonymized review data to generate drafts
                  that are specific, actionable, and bias-aware.
                </p>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8">
                  Every AI-generated draft is a starting point -- managers always
                  have the final say. We believe in AI that augments human
                  judgment, never replaces it.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://app.gowindmill.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="primary"
                      icon={<ArrowRight size={16} />}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      Try Windmill Free
                    </Button>
                  </a>
                  <a
                    href="https://gowindmill.com/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      icon={<ExternalLink size={14} />}
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      Read our research
                    </Button>
                  </a>
                </div>
              </CardContent>
            </div>
          </Card>
        </ScrollReveal>
      </Container>
    </section>
  );
}
