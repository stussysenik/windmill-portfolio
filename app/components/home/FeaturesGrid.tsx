import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { Card, CardContent } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { StaggerGrid } from "~/components/motion/StaggerGrid";
import { features } from "~/data/features";
import { cdnImage } from "~/lib/images";

/**
 * FeaturesGrid -- showcases Windmill's core product features.
 *
 * Layout: a section header + a responsive grid of feature cards.
 * The first feature (marked `featured: true`) gets a larger, hero-style
 * card spanning the full width. Remaining features sit in a 2- or 3-column
 * grid below.
 *
 * Each card uses the `interactive` Card variant for the hover-lift effect.
 * Images are loaded via the CDN pipeline with responsive srcSets.
 *
 * Animation: the grid uses `StaggerGrid` so cards cascade in sequentially
 * as the section scrolls into view.
 */
export function FeaturesGrid() {
  const featured = features.find((f) => f.featured);
  const rest = features.filter((f) => !f.featured);

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#e8f6fa] to-white">
      <Container>
        {/* Section header */}
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge variant="brand" className="mb-4">
              Features
            </Badge>
            <h2 className="display-headline-2 text-3xl sm:text-4xl lg:text-5xl text-foreground">
              The work is already done. AI makes sense of it for you.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Memory fades quickly. Windmill captures your work and feedback so you can focus on what really matters.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured card -- full width */}
        {featured && (
          <ScrollReveal className="mb-8">
            <Link to={featured.href} className="block group">
              <Card variant="interactive" className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Text side */}
                  <CardContent className="flex flex-col justify-center p-8 sm:p-12">
                    {featured.badge && (
                      <Badge variant="outline" className="self-start mb-4">
                        {featured.badge}
                      </Badge>
                    )}
                    <h3 className="display-headline-2 text-2xl sm:text-3xl text-foreground">
                      {featured.title}
                    </h3>
                    <p className="mt-2 text-lg font-medium text-foreground/80">
                      {featured.subtitle}
                    </p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {featured.description}
                    </p>
                    <div className="mt-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<ArrowRight size={16} />}
                        className="group-hover:translate-x-1 transition-transform"
                      >
                        Learn more
                      </Button>
                    </div>
                  </CardContent>

                  {/* Image side */}
                  <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-[var(--color-beige-section)]">
                    <img
                      src={cdnImage(featured.image, { width: 800, format: "webp" })}
                      alt={`${featured.title} feature screenshot`}
                      className="h-full w-full object-cover object-left-top"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Card>
            </Link>
          </ScrollReveal>
        )}

        {/* Remaining features grid */}
        <StaggerGrid
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
          staggerDelay={0.1}
        >
          {rest.map((feature) => (
            <Link key={feature.id} to={feature.href} className="block group">
              <Card variant="interactive" className="h-full flex flex-col">
                {/* Feature image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-beige-section)]">
                  <img
                    src={cdnImage(feature.image, { width: 640, format: "webp" })}
                    alt={`${feature.title} feature screenshot`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                {/* Feature text */}
                <CardContent className="flex-1 flex flex-col p-6 sm:p-8">
                  {feature.badge && (
                    <Badge variant="outline" className="self-start mb-3">
                      {feature.badge}
                    </Badge>
                  )}
                  <h3 className="display-headline-2 text-xl text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-foreground/80">
                    {feature.subtitle}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
