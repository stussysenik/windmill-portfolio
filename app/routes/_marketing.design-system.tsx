import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "~/lib/cn";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";

/**
 * Design System showcase -- a living reference of Windmill's UI components.
 *
 * This page serves as both documentation and a visual regression test surface.
 * Each section demonstrates a component or design token with interactive examples.
 */
export function meta() {
  return [
    { title: "Design System -- Windmill" },
    {
      name: "description",
      content:
        "Windmill's design system: typography, colors, spacing, and component library.",
    },
  ];
}

const sections = [
  "Typography",
  "Colors",
  "Spacing",
  "Buttons",
  "Container Sizes",
  "Border Radius",
  "Shadows",
  "Motion",
];

export default function DesignSystemPage() {
  return (
    <section className="py-20">
      <Container size="wide">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="display-headline text-4xl sm:text-5xl">
            Design System
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            A living reference of Windmill's visual language — typography,
            colors, components, and motion primitives. Reverse-engineered from
            gowindmill.com's production CSS.
          </p>
        </motion.div>

        <div className="mt-16 flex gap-16">
          {/* Sticky sidebar nav */}
          <nav className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-24 space-y-1">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {section}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex-1 min-w-0 space-y-20">
          {/* ─── Typography ─── */}
          <DesignSection title="Typography">
            <div className="space-y-6">
              <div>
                <Label>Display Headline (font-display, 700)</Label>
                <h2 className="display-headline text-5xl">
                  The quick brown fox
                </h2>
              </div>
              <div>
                <Label>Display Headline 2 (font-display, 700)</Label>
                <h3 className="display-headline-2 text-3xl">
                  Jumps over the lazy dog
                </h3>
              </div>
              <div>
                <Label>Body (font-body / Inter)</Label>
                <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                  Performance management shouldn't feel like pulling teeth.
                  Windmill uses AI to automate the tedious parts so managers can
                  focus on what actually matters: helping their people grow.
                </p>
              </div>
              <div>
                <Label>Mono (font-mono / JetBrains Mono)</Label>
                <code className="font-mono text-sm bg-muted px-3 py-1.5 rounded-lg">
                  const review = await windmill.draft(cycle)
                </code>
              </div>
            </div>
          </DesignSection>

          {/* ─── Colors ─── */}
          <DesignSection title="Colors">
            <div className="space-y-8">
              <div>
                <Label>Core palette</Label>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  <Swatch name="Background" className="bg-background border border-border" />
                  <Swatch name="Foreground" className="bg-foreground" light />
                  <Swatch name="Primary" className="bg-primary" light />
                  <Swatch name="Muted" className="bg-muted" />
                  <Swatch name="Border" className="bg-border" />
                  <Swatch name="Ring" className="bg-ring" light />
                </div>
              </div>
              <div>
                <Label>Section backgrounds</Label>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Swatch name="Cyan" className="bg-[var(--color-cyan-section)]" />
                  <Swatch name="Beige" className="bg-[var(--color-beige-section)]" />
                  <Swatch name="Cream" className="bg-[var(--color-cream-footer)]" />
                  <Swatch name="Warm White" className="bg-[var(--color-warm-white)]" />
                </div>
              </div>
              <div>
                <Label>Highlight colors (testimonials)</Label>
                <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
                  {[
                    "pink", "yellow", "blue", "green", "rose",
                    "peach", "red", "purple", "sage",
                  ].map((color) => (
                    <Swatch
                      key={color}
                      name={color}
                      className={`bg-[var(--color-highlight-${color})]`}
                      small
                    />
                  ))}
                </div>
              </div>
            </div>
          </DesignSection>

          {/* ─── Spacing ─── */}
          <DesignSection title="Spacing">
            <div className="space-y-4">
              <Label>4px base grid</Label>
              <div className="space-y-3">
                {[
                  { name: "1 (4px)", width: "w-1" },
                  { name: "2 (8px)", width: "w-2" },
                  { name: "3 (12px)", width: "w-3" },
                  { name: "4 (16px)", width: "w-4" },
                  { name: "6 (24px)", width: "w-6" },
                  { name: "8 (32px)", width: "w-8" },
                  { name: "12 (48px)", width: "w-12" },
                  { name: "16 (64px)", width: "w-16" },
                  { name: "24 (96px)", width: "w-24" },
                ].map(({ name, width }) => (
                  <div key={name} className="flex items-center gap-4">
                    <span className="w-24 text-xs font-mono text-muted-foreground text-right shrink-0">
                      {name}
                    </span>
                    <div
                      className={cn(
                        "h-3 rounded-sm bg-foreground/80",
                        width
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </DesignSection>

          {/* ─── Buttons ─── */}
          <DesignSection title="Buttons">
            <div className="space-y-8">
              <div>
                <Label>Variants</Label>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="nav">Nav</Button>
                </div>
              </div>
              <div>
                <Label>Sizes</Label>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              <div>
                <Label>With icon</Label>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <Button icon={<ArrowRight size={16} />}>Get Started</Button>
                  <Button variant="secondary" icon={<Star size={16} />}>
                    Star on GitHub
                  </Button>
                </div>
              </div>
              <div>
                <Label>Fancy glow effect (hover)</Label>
                <div className="mt-3">
                  <Button className="fancy-glow" icon={<ArrowRight size={16} />}>
                    Hover me
                  </Button>
                </div>
              </div>
            </div>
          </DesignSection>

          {/* ─── Container ─── */}
          <DesignSection title="Container Sizes">
            <div className="space-y-4">
              {(["narrow", "medium", "default", "wide"] as const).map(
                (size) => (
                  <Container key={size} size={size} className="bg-muted rounded-xl py-4 px-6">
                    <span className="text-sm font-mono text-muted-foreground">
                      Container size=&quot;{size}&quot;
                    </span>
                  </Container>
                )
              )}
            </div>
          </DesignSection>

          {/* ─── Spacing & Radius ─── */}
          <DesignSection title="Border Radius">
            <div className="flex flex-wrap gap-6">
              {[
                { name: "sm", className: "rounded-sm" },
                { name: "md", className: "rounded-md" },
                { name: "lg", className: "rounded-lg" },
                { name: "xl", className: "rounded-xl" },
                { name: "2xl", className: "rounded-2xl" },
                { name: "full", className: "rounded-full" },
              ].map(({ name, className }) => (
                <div key={name} className="text-center">
                  <div
                    className={cn(
                      "h-16 w-16 bg-foreground",
                      className
                    )}
                  />
                  <span className="mt-2 block text-xs font-mono text-muted-foreground">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </DesignSection>

          {/* ─── Shadows ─── */}
          <DesignSection title="Shadows">
            <div className="flex flex-wrap gap-8">
              {[
                { name: "card", className: "shadow-card" },
                { name: "card-hover", className: "shadow-card-hover" },
                { name: "nav", className: "shadow-nav" },
                { name: "dramatic", className: "shadow-dramatic" },
              ].map(({ name, className }) => (
                <div key={name} className="text-center">
                  <div
                    className={cn(
                      "h-20 w-20 rounded-2xl bg-white border border-border",
                      className
                    )}
                  />
                  <span className="mt-3 block text-xs font-mono text-muted-foreground">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </DesignSection>

          {/* ─── Motion ─── */}
          <DesignSection title="Motion">
            <p className="text-muted-foreground mb-6">
              Interactive motion demos will be added here. The site uses
              framer-motion with these easing curves:
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { name: "ease-out-quint", value: "cubic-bezier(0.22, 1, 0.36, 1)" },
                { name: "ease-out-expo", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
                { name: "ease-material", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
              ].map(({ name, value }) => (
                <div
                  key={name}
                  className="rounded-xl border border-border bg-white p-5"
                >
                  <span className="text-sm font-mono font-semibold">
                    {name}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground font-mono">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </DesignSection>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Section wrapper with a title and anchor link. */
function DesignSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <div id={id}>
      <h2 className="display-headline-2 text-2xl sm:text-3xl mb-8 pb-4 border-b border-border">
        <a href={`#${id}`} className="hover:text-muted-foreground transition-colors">
          {title}
        </a>
      </h2>
      {children}
    </div>
  );
}

/** Small label above each sub-section. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
      {children}
    </p>
  );
}

/** Color swatch block. */
function Swatch({
  name,
  className,
  light = false,
  small = false,
}: {
  name: string;
  className?: string;
  light?: boolean;
  small?: boolean;
}) {
  return (
    <div className="text-center">
      <div
        className={cn(
          "rounded-xl",
          small ? "h-10" : "h-16",
          className
        )}
      />
      <span
        className={cn(
          "mt-2 block text-xs font-mono",
          light ? "text-muted-foreground" : "text-muted-foreground"
        )}
      >
        {name}
      </span>
    </div>
  );
}
