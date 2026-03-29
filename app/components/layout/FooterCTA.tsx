import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";

/**
 * FooterCTA -- full-width call-to-action band above the footer.
 *
 * Design reference (gowindmill.com):
 * - Warm cream background (`--color-cream-footer`) with generous vertical
 *   padding to create visual separation from the last content section.
 * - Centered headline + subtext + two CTA buttons.
 * - Subtle fade-in-up animation triggered by scroll.
 */
export function FooterCTA() {
  return (
    <section className="bg-[var(--color-cream-footer)] py-24 sm:py-32">
      <Container size="medium">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="display-headline text-4xl sm:text-5xl lg:text-6xl text-foreground">
            Ready to rethink
            <br />
            performance?
          </h2>

          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
            Join the companies using Windmill to run faster, fairer performance
            cycles -- powered by AI.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://app.gowindmill.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
              >
                Start for Free
              </Button>
            </a>
            <Link to="/pricing">
              <Button variant="secondary" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
