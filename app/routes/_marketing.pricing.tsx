import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "~/lib/cn";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";

/**
 * Pricing page -- displays plan tiers with a monthly/annual toggle.
 *
 * Meta tags for SEO.
 */
export function meta() {
  return [
    { title: "Pricing -- Windmill" },
    {
      name: "description",
      content:
        "Simple, transparent pricing for teams of every size. Start free, upgrade when you're ready.",
    },
  ];
}

/** Plan data. Prices are illustrative for the portfolio piece. */
const plans = [
  {
    name: "Starter",
    description: "For small teams getting started with structured reviews.",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "Get Started Free",
    ctaVariant: "secondary" as const,
    features: [
      "Up to 10 team members",
      "Quarterly review cycles",
      "Basic 1:1 agendas",
      "Pulse surveys (3/quarter)",
      "Email support",
    ],
  },
  {
    name: "Pro",
    description: "For growing teams that need AI-powered performance tools.",
    monthlyPrice: 12,
    annualPrice: 10,
    cta: "Start Free Trial",
    ctaVariant: "primary" as const,
    popular: true,
    features: [
      "Unlimited team members",
      "AI-drafted reviews",
      "Continuous feedback",
      "Custom pulse surveys",
      "Calibration tools",
      "Slack & Jira integrations",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced security and compliance needs.",
    monthlyPrice: null,
    annualPrice: null,
    cta: "Contact Sales",
    ctaVariant: "secondary" as const,
    features: [
      "Everything in Pro",
      "SSO / SAML",
      "Custom integrations",
      "Dedicated CSM",
      "SLA guarantee",
      "Advanced analytics & exports",
      "SOC 2 Type II",
    ],
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-24 sm:py-32">
      <Container size="wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="display-headline text-4xl sm:text-5xl lg:text-6xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Start free. Upgrade when your team is ready. No surprises.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              !annual ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={cn(
              "relative h-7 w-12 rounded-full transition-colors cursor-pointer",
              annual ? "bg-foreground" : "bg-border"
            )}
            aria-label="Toggle annual billing"
          >
            <motion.div
              className="absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-sm"
              animate={{ x: annual ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              annual ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Annual
            <span className="ml-1.5 text-xs text-green-600 font-semibold">
              Save 20%
            </span>
          </span>
        </motion.div>

        {/* Plan cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 * (i + 1),
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8",
                plan.popular
                  ? "border-foreground/20 shadow-card-hover bg-white ring-1 ring-foreground/5"
                  : "border-border bg-white"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-foreground px-3 py-0.5 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-display font-bold">{plan.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-6">
                {plan.monthlyPrice !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold">
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /user/mo
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-display font-bold">
                    Custom
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="mt-6">
                <a
                  href="https://app.gowindmill.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant={plan.ctaVariant}
                    size="default"
                    className="w-full"
                    icon={
                      plan.ctaVariant === "primary" ? (
                        <ArrowRight size={16} />
                      ) : undefined
                    }
                  >
                    {plan.cta}
                  </Button>
                </a>
              </div>

              {/* Feature list */}
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-green-600"
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
