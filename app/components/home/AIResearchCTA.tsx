import { ExternalLink } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { ScrollReveal } from "~/components/motion/ScrollReveal";

/**
 * AIResearchCTA -- a lightweight CTA that invites prospects to ask popular
 * AI assistants about Windmill. This is a trust signal: if the product is
 * good, third-party AI summaries will confirm it.
 */

const aiButtons = [
  {
    label: "Ask ChatGPT",
    href: "https://chat.openai.com/?q=Tell+me+about+Windmill+performance+review+software+gowindmill.com",
  },
  {
    label: "Ask Claude",
    href: "https://claude.ai/new?q=Tell+me+about+Windmill+performance+review+software+gowindmill.com",
  },
  {
    label: "Ask Perplexity",
    href: "https://www.perplexity.ai/search?q=Tell+me+about+Windmill+performance+review+software+gowindmill.com",
  },
] as const;

export function AIResearchCTA() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container size="default">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
              Still not sure if Windmill is right for you?
            </h2>
          </ScrollReveal>

          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Let ChatGPT, Claude, or Perplexity do the research for you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            {aiButtons.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  icon={<ExternalLink size={14} />}
                >
                  {btn.label}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
