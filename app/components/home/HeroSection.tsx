import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { cn } from "~/lib/cn";
import { Button } from "~/components/ui/Button";
import { GlowButton } from "~/components/ui/GlowButton";
import { Badge } from "~/components/ui/Badge";
import { Container } from "~/components/ui/Container";

/**
 * HeroSection -- the primary above-the-fold section on the homepage.
 *
 * Layout: centered headline, subhead, dual CTA buttons, and a social-proof
 * teaser line. A soft radial gradient sits behind everything for depth.
 *
 * Animation strategy:
 * - Badge, headline, body, and CTAs stagger in with `ease-out-quint`.
 * - The background gradient is static (no animation) to avoid GPU overhead.
 *
 * This section is intentionally self-contained -- it does not depend on any
 * data files or CDN images, keeping initial page load fast.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <Container size="default">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Announcement badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="outline" className="gap-2 shadow-card">
              <Sparkles size={14} className="text-amber-500" />
              Now with AI-powered reviews
            </Badge>
          </motion.div>

          {/* Headline */}
          <h1 className="mt-8 display-headline text-5xl sm:text-6xl lg:text-7xl text-foreground">
            Performance reviews
            <br />
            <span className="bg-gradient-to-r from-[oklch(0.205_0.02_260)] to-[oklch(0.35_0.06_260)] bg-clip-text text-transparent">
              that run themselves
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Windmill uses AI to draft reviews, surface insights, and eliminate
            the busywork -- so managers can focus on what matters: their people.
          </p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://app.gowindmill.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlowButton size="lg" icon={<ArrowRight size={18} />}>
                Start for Free
              </GlowButton>
            </a>
            <Link to="/pricing">
              <Button variant="secondary" size="lg">
                View Pricing
              </Button>
            </Link>
          </motion.div>

          {/* Social proof teaser */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Trusted by 500+ companies worldwide
          </motion.p>
        </motion.div>
      </Container>

      {/* Background gradient decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-b from-[oklch(0.95_0.02_260)] to-transparent opacity-60 blur-3xl" />
      </div>
    </section>
  );
}
