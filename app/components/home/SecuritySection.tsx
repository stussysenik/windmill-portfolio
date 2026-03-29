import { Shield, Lock, Server, Eye, CheckCircle2 } from "lucide-react";
import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { Card, CardContent } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { StaggerGrid } from "~/components/motion/StaggerGrid";

/**
 * SecuritySection -- builds trust by showcasing Windmill's security posture.
 *
 * HR data is highly sensitive. This section addresses the #1 objection
 * enterprise buyers have: "Is my data safe?" It features a grid of
 * security credential cards and a short reassurance paragraph.
 *
 * The dark Card variant is used here to visually differentiate this
 * section from the rest of the page and signal "serious / trustworthy."
 */

const securityItems = [
  {
    icon: Shield,
    title: "SOC 2 Type II",
    description:
      "Independently audited controls for security, availability, and confidentiality.",
  },
  {
    icon: Lock,
    title: "End-to-end Encryption",
    description:
      "All data encrypted in transit (TLS 1.3) and at rest (AES-256).",
  },
  {
    icon: Server,
    title: "US-based Infrastructure",
    description:
      "Hosted on AWS in US regions with 99.99% uptime SLA.",
  },
  {
    icon: Eye,
    title: "Privacy by Design",
    description:
      "GDPR and CCPA compliant. Your data is never used to train AI models.",
  },
] as const;

export function SecuritySection() {
  return (
    <section className="py-20 sm:py-28 bg-[oklch(0.145_0_0)] text-white">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-14">
            <Badge className="mb-4 bg-white/10 text-white/90 border-0">
              Security & Compliance
            </Badge>
            <h2 className="display-headline-2 text-3xl sm:text-4xl lg:text-5xl text-white">
              Enterprise-grade security
            </h2>
            <p className="mt-4 text-lg text-white/60 leading-relaxed">
              Your people data deserves the highest level of protection.
              Windmill is built with security at every layer.
            </p>
          </div>
        </ScrollReveal>

        <StaggerGrid
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.1}
        >
          {securityItems.map((item) => (
            <Card
              key={item.title}
              variant="glass"
              className="group"
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/15 transition-colors">
                  <item.icon size={20} className="text-white/80" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </StaggerGrid>

        {/* Trust badges row */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/40">
            {[
              "GDPR Compliant",
              "CCPA Compliant",
              "99.99% Uptime",
              "24/7 Monitoring",
            ].map((label) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400/60" />
                {label}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
