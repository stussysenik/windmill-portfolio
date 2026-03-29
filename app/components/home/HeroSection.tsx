import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
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
 * teaser line.
 *
 * Animation strategy:
 * - Badge, headline, body, and CTAs stagger in with `ease-out-quint`.
 *
 * This section is intentionally self-contained -- it does not depend on any
 * data files or CDN images, keeping initial page load fast.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-10 pb-12 md:pb-24 lg:pt-[72px] lg:pb-[72px]">
      {/* Gradient glow bar */}
      <div className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to right, #ffaedcc1 0%, #ffc37e98 25%, #6185f05c 50%, transparent 100%)',
          }}
        />
      </div>

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
              AI Performance Reviews
            </Badge>
          </motion.div>

          {/* Headline */}
          <h1 className="mt-8 display-headline text-5xl md:text-6xl lg:text-[72px] text-foreground">
            Performance reviews that people{" "}
            <em className="font-serif italic">actually like</em>.
          </h1>

          {/* Subheading */}
          <h2 className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
            Finally, performance management that runs itself. 90% faster reviews.
            93% employee satisfaction. Zero nagging required.
          </h2>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/s/new">
              <GlowButton size="lg" icon={<ArrowRight size={18} />}>
                Get started for free
              </GlowButton>
            </Link>
            <Link to="/start">
              <Button variant="secondary" size="lg" icon={<Calendar size={16} />}>
                Book a demo
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
            First 10 users free, forever
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
