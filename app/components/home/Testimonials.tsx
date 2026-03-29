import { useRef } from "react";
import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { Badge } from "~/components/ui/Badge";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { testimonials } from "~/data/testimonials";

/**
 * Testimonials -- a dual-row infinite marquee of customer quotes.
 *
 * Each testimonial is a card with a brush-stroke highlight on a key phrase.
 * The highlight color comes from the testimonial data itself, matching
 * Windmill's pastel accent palette.
 *
 * Layout:
 * - Two rows scrolling in opposite directions (top: left, bottom: right)
 *   using the CSS `marquee` keyframe with `animation-direction: reverse`.
 * - `.marquee-mask` fades edges to transparent.
 *
 * The brush-stroke highlight is implemented as an inline `<mark>` with a
 * custom background color and a slight rotation via `skewY(-1deg)` to
 * mimic a hand-drawn underline feel.
 */

/**
 * Renders testimonial text with the highlight phrase wrapped in a styled <mark>.
 */
function HighlightedText({
  text,
  highlight,
  color,
}: {
  text: string;
  highlight?: string;
  color: string;
}) {
  if (!highlight) return <>{text}</>;

  const index = text.indexOf(highlight);
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);

  return (
    <>
      {before}
      <mark
        className="relative inline-block px-1 -mx-1 rounded-sm bg-no-repeat"
        style={{
          backgroundColor: color,
          // Slight skew gives the "hand-drawn" brush stroke feel.
          transform: "skewY(-0.5deg)",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {match}
      </mark>
      {after}
    </>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-[320px] sm:w-[380px] rounded-xl p-6",
        "bg-white border border-border shadow-card",
        "select-none"
      )}
    >
      <p className="text-sm sm:text-base leading-relaxed text-foreground">
        &ldquo;
        <HighlightedText
          text={testimonial.text}
          highlight={testimonial.highlight}
          color={testimonial.highlightColor}
        />
        &rdquo;
      </p>
    </div>
  );
}

export function Testimonials() {
  // Split testimonials into two rows for the dual marquee.
  const mid = Math.ceil(testimonials.length / 2);
  const topRow = testimonials.slice(0, mid);
  const bottomRow = testimonials.slice(mid);

  // Double each row for seamless looping.
  const topDoubled = [...topRow, ...topRow];
  const bottomDoubled = [...bottomRow, ...bottomRow];

  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-14">
            <Badge variant="brand" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="display-headline-2 text-3xl sm:text-4xl lg:text-5xl text-foreground">
              Real feedback from real users
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Anonymous notes from people who used Windmill for their performance reviews.
            </p>
          </div>
        </ScrollReveal>
      </Container>

      {/* Full-bleed marquee (no Container constraint) */}
      <div className="space-y-6">
        {/* Top row -- scrolls left */}
        <div
          className="marquee-mask overflow-hidden"
          style={{ "--marquee-duration": "60s", "--gap": "1.5rem" } as React.CSSProperties}
        >
          <div className="flex items-stretch gap-[var(--gap)] animate-marquee w-max">
            {topDoubled.map((t, i) => (
              <TestimonialCard key={`top-${t.id}-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Bottom row -- scrolls right (reversed) */}
        <div
          className="marquee-mask overflow-hidden"
          style={{ "--marquee-duration": "65s", "--gap": "1.5rem" } as React.CSSProperties}
        >
          <div
            className="flex items-stretch gap-[var(--gap)] animate-marquee w-max"
            style={{ animationDirection: "reverse" }}
          >
            {bottomDoubled.map((t, i) => (
              <TestimonialCard key={`bottom-${t.id}-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
