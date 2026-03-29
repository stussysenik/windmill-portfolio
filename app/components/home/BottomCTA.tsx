import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { GlowButton } from "~/components/ui/GlowButton";
import { Button } from "~/components/ui/Button";
import { MagneticButton } from "~/components/ui/MagneticButton";
import { ScrollReveal } from "~/components/motion/ScrollReveal";

/**
 * BottomCTA -- the final conversion section before the footer.
 *
 * A full-width section with a warm background, a punchy headline, and
 * dual CTA buttons. The primary CTA uses GlowButton for maximum visual
 * weight, wrapped in MagneticButton for that delightful cursor-follow
 * interaction.
 *
 * This mirrors the hero section's messaging but with a stronger,
 * more action-oriented tone -- the user has scrolled through the entire
 * page and should be primed to convert.
 */
export function BottomCTA() {
  return (
    <section className="py-20 sm:py-28 bg-[var(--color-warm-white)]">
      <Container size="medium">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display-headline-2 text-3xl sm:text-4xl lg:text-5xl text-foreground">
              Ready to transform your
              <br className="hidden sm:block" />
              performance reviews?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Join hundreds of companies that have switched to Windmill.
              Set up takes minutes, not months.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://app.gowindmill.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton strength={6}>
                  <GlowButton size="lg" icon={<ArrowRight size={18} />}>
                    Start for Free
                  </GlowButton>
                </MagneticButton>
              </a>
              <Link to="/pricing">
                <Button variant="secondary" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Free for teams up to 10. No credit card required.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
