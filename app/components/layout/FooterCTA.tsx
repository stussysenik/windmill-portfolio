import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";

/**
 * FooterCTA -- full-width call-to-action band above the footer.
 *
 * Dark gradient background with rounded corners and inset margins.
 * Single centered headline with an italic serif accent and one CTA button.
 */
export function FooterCTA() {
  return (
    <section className="mx-4 md:mx-8 lg:mx-16 mb-8">
      <div className="bg-gradient-to-b from-[#1a1a1a] to-black rounded-2xl py-24 sm:py-32">
        <Container size="medium">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
              Your performance reviews have{" "}
              <em className="font-serif italic">performance issues</em>.
            </h2>

            <div className="mt-10 flex items-center justify-center">
              <Link to="/start">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  className="bg-white text-black hover:bg-white/90"
                >
                  Book a demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
