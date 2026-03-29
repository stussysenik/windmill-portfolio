import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "~/lib/cn";

/**
 * Card variant styles.
 *
 * - **default**: Clean white surface with a hairline border and soft shadow.
 * - **dark**: Dark slate surface for contrast sections — text flips to white.
 * - **glass**: Semi-transparent dark with backdrop blur — pairs well with
 *   gradient or image backgrounds.
 * - **interactive**: Extends `default` with hover lift and shadow growth for
 *   clickable cards.
 */
const variants = {
  default: "bg-background border border-border shadow-card rounded-xl",
  dark: "bg-[oklch(0.208_0.042_265.755)] text-white border-white/10 rounded-2xl",
  glass:
    "bg-[oklch(0.208_0.042_265.755)]/40 backdrop-blur-md text-white border border-white/10 rounded-2xl",
  interactive: [
    "bg-background border border-border shadow-card rounded-xl",
    "hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200",
  ].join(" "),
} as const;

export type CardVariant = keyof typeof variants;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

/**
 * Card — a versatile surface container.
 *
 * ```tsx
 * <Card variant="interactive">
 *   <CardHeader>
 *     <h3>Feature</h3>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Description of the feature goes here.</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button size="sm">Learn more</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn("overflow-hidden", variants[variant], className)}
      {...rest}
    />
  ),
);
Card.displayName = "Card";

// ── Sub-components ──────────────────────────────────────────────────────────

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pb-0", className)}
    {...rest}
  />
));
CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...rest} />
));
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0 flex items-center", className)}
    {...rest}
  />
));
CardFooter.displayName = "CardFooter";
