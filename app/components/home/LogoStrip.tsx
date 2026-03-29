import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { customerLogos } from "~/data/logos";
import { cdnImage } from "~/lib/images";

/**
 * LogoStrip -- an infinite-scroll marquee of customer logos.
 *
 * Uses pure CSS `@keyframes marquee` (defined in app.css) for buttery-smooth
 * 60fps animation without JavaScript. The logos are duplicated once to create
 * the seamless loop illusion.
 *
 * The `.marquee-mask` utility applies a CSS `mask-image` gradient that fades
 * the edges to transparent, giving a polished fade-out effect.
 *
 * The `--marquee-duration` CSS variable controls scroll speed. A slower
 * duration (40s) is used here so the logos are legible.
 */
export function LogoStrip() {
  // Double the logos array to create seamless infinite scroll.
  const doubled = [...customerLogos, ...customerLogos];

  return (
    <section className="py-16 sm:py-20 bg-[var(--color-beige-section)]">
      <Container>
        <ScrollReveal>
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10">
            Trusted by industry leaders
          </p>
        </ScrollReveal>

        {/* Marquee container */}
        <div
          className="marquee-mask overflow-hidden"
          style={{ "--marquee-duration": "40s", "--gap": "3rem" } as React.CSSProperties}
        >
          <div
            className={cn(
              "flex items-center gap-[var(--gap)]",
              "animate-marquee w-max"
            )}
          >
            {doubled.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0 flex items-center justify-center px-4"
              >
                <img
                  src={cdnImage(logo.src, {
                    width: logo.width * 2,
                    height: logo.height * 2,
                    fit: "contain",
                    format: "webp",
                  })}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.height}
                  className="h-8 sm:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
