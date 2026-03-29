import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { pricingData } from "~/data/pricing";

export function meta() {
  return [
    { title: "Pricing — Windmill" },
    {
      name: "description",
      content:
        "Simple, transparent pricing. First 10 users free, forever. $10/user/month after that.",
    },
  ];
}

export default function PricingPage() {
  return (
    <section className="py-24 sm:py-32">
      <Container size="medium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="display-headline text-4xl sm:text-5xl lg:text-6xl">
            {pricingData.tagline}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            {pricingData.note}
          </p>
        </motion.div>

        {/* Single pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 mx-auto max-w-lg"
        >
          <div className="rounded-2xl border border-border bg-white p-8 sm:p-10 shadow-card">
            {/* Free tier highlight */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                First {pricingData.freeUsers} users free, forever
              </div>
            </div>

            {/* Price */}
            <div className="mt-8 text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-display font-bold">
                  ${pricingData.pricePerUser}
                </span>
                <span className="text-lg text-muted-foreground">
                  /user/{pricingData.period}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                For each additional user after {pricingData.freeUsers}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link to={pricingData.ctaHref} className="block">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<ArrowRight size={18} />}
                >
                  {pricingData.ctaText}
                </Button>
              </Link>
            </div>

            {/* Divider */}
            <div className="mt-8 border-t border-border" />

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Everything included
              </h3>
              <ul className="mt-6 space-y-4">
                {pricingData.features.map((feature) => (
                  <li
                    key={feature.label}
                    className="flex items-start gap-3 text-base"
                  >
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    <span className="text-foreground">{feature.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Enterprise callout */}
        <ScrollReveal className="mt-16 text-center">
          <p className="text-muted-foreground">
            Need custom integrations, SSO, or a dedicated CSM?{" "}
            <Link
              to="/start"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Talk to sales
            </Link>
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
