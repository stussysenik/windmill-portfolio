import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { ScrollReveal } from "~/components/motion/ScrollReveal";

/**
 * AIResearchCTA -- a lightweight CTA that invites prospects to ask popular
 * AI assistants about Windmill. This is a trust signal: if the product is
 * good, third-party AI summaries will confirm it.
 *
 * Each button displays the AI provider's logo (simple-icons style, 16x16)
 * instead of a generic external-link icon, giving instant brand recognition.
 */

/** OpenAI logomark (simple-icons) */
function OpenAIIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

/** Anthropic/Claude logomark (simple-icons) */
function ClaudeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.308 3.616L12 18.326 6.692 3.616h-4.09L12 24 21.398 3.616h-4.09zM9.355 3.616L12 10.572l2.645-6.956h-5.29z" />
    </svg>
  );
}

/** Perplexity logomark (simple-icons) */
function PerplexityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.109.672L11.5 4.747V.672h1v4.075l4.39-4.074v5.894H22v7.063h-2.612v5.86L15.5 15.986v7.342h-1v-7.348L10.5 19.49v-5.86H7.89v5.862L3.5 15.638V.672h1v4.075L7.109.672zM3 12.63h1.39V7.217L3 5.933v6.697zm5.5-5.366v5.366h2.5V7.264zm3.5 0v5.366H14.5V7.264zM22 12.63V5.933l-1.39 1.284V12.63H22zM14.5 13.63v4.368l3-2.735V13.63h-3zm-4 0H7.89v1.763L10.5 17.998V13.63z" />
    </svg>
  );
}

const aiButtons = [
  {
    label: "Ask ChatGPT",
    href: "https://chat.openai.com/?q=tell+me+why+my+company+should+use+windmill+(gowindmill.com)+for+ai+performance+reviews.",
    icon: <OpenAIIcon />,
  },
  {
    label: "Ask Claude",
    href: "https://claude.ai/new?q=tell+me+why+my+company+should+use+windmill+(gowindmill.com)+for+ai+performance+reviews.",
    icon: <ClaudeIcon />,
  },
  {
    label: "Ask Perplexity",
    href: "https://www.perplexity.ai/search/new?q=tell+me+why+my+company+should+use+windmill+(gowindmill.com)+for+ai+performance+reviews.",
    icon: <PerplexityIcon />,
  },
];

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
            <br />
            Click a button and see what your favorite AI says about Windmill.
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
                  icon={btn.icon}
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
