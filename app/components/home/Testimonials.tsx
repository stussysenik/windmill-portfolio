import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { testimonials } from "~/data/testimonials";

/**
 * Testimonials -- scattered mosaic of customer feedback cards.
 *
 * Cards are arranged in staggered rows with slight random rotations,
 * overlapping vertically to create an organic "sticky notes on a board"
 * feel. No animation -- this is a purely static, visually rich layout.
 *
 * Each card features a brush-stroke highlight on a key phrase using
 * the pastel accent palette from the testimonials data.
 *
 * Layout uses CSS grid rows, each with a different number of cards
 * and horizontal offset for the cascading mosaic effect.
 */

/**
 * Deterministic pseudo-random number from a seed.
 * Uses a simple hash so rotations are consistent across renders
 * without needing React state or refs.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/**
 * Returns a rotation in degrees between -max and +max,
 * seeded by the card's id for consistency.
 */
function getRotation(id: number, max: number = 2.5): number {
  return (seededRandom(id) * 2 - 1) * max;
}

/**
 * Renders testimonial text with the highlight phrase wrapped in a styled <mark>.
 * The mark uses a pastel background with slight skew for a brush-stroke feel.
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
        className="inline rounded-sm"
        style={{
          backgroundColor: color,
          transform: "skewY(-0.5deg)",
          textDecoration: "none",
          color: "inherit",
          padding: "2px 6px",
          margin: "0 -2px",
        }}
      >
        {match}
      </mark>
      {after}
    </>
  );
}

/**
 * A single testimonial card with white background, subtle shadow,
 * rounded corners, and a slight rotation for the scattered look.
 */
function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: (typeof testimonials)[0];
  className?: string;
}) {
  const rotation = getRotation(testimonial.id);

  return (
    <div
      className={cn(
        "rounded-xl px-5 py-4 sm:px-6 sm:py-5",
        "bg-white border border-border/60",
        "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        "transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <p className="text-[15px] sm:text-base md:text-lg font-semibold leading-snug text-foreground tracking-[-0.01em]">
        <HighlightedText
          text={testimonial.text}
          highlight={testimonial.highlight}
          color={testimonial.highlightColor}
        />
      </p>
    </div>
  );
}

/**
 * Row configuration for the scattered mosaic.
 * Each row specifies which testimonial IDs to show and
 * horizontal padding/offset to create the staggered effect.
 *
 * Cards per row vary (3-6) and rows are offset alternately
 * to prevent a rigid grid appearance.
 */
const rows: { ids: number[]; offsetClass: string }[] = [
  {
    ids: [1, 2, 3, 4, 5],
    offsetClass: "pl-4 sm:pl-8 lg:pl-12",
  },
  {
    ids: [6, 7, 8, 9],
    offsetClass: "pl-8 sm:pl-16 lg:pl-24",
  },
  {
    ids: [10, 11, 12, 13, 14],
    offsetClass: "pl-2 sm:pl-4 lg:pl-6",
  },
  {
    ids: [15, 16, 17, 18],
    offsetClass: "pl-12 sm:pl-20 lg:pl-32",
  },
  {
    ids: [19, 20, 21, 22, 23],
    offsetClass: "pl-6 sm:pl-10 lg:pl-16",
  },
  {
    ids: [24, 25, 26, 27],
    offsetClass: "pl-10 sm:pl-14 lg:pl-20",
  },
];

/** Look up a testimonial by id. */
function findTestimonial(id: number) {
  return testimonials.find((t) => t.id === id);
}

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="display-headline-2 text-3xl sm:text-4xl lg:text-5xl text-foreground">
              Real feedback from real users
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Anonymous notes from people who used Windmill for their
              performance reviews.
            </p>
          </div>
        </ScrollReveal>
      </Container>

      {/* Scattered mosaic -- full bleed, no Container constraint */}
      <div className="relative -mt-2">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "flex flex-wrap gap-3 sm:gap-4",
              row.offsetClass,
              // Negative top margin creates the overlapping rows effect.
              // First row has no negative margin.
              rowIndex > 0 ? "-mt-2 sm:-mt-3" : ""
            )}
          >
            {row.ids.map((id) => {
              const t = findTestimonial(id);
              if (!t) return null;
              return (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  className="max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]"
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
