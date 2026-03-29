import type { HTMLAttributes } from "react";
import { cn } from "~/lib/cn";

/**
 * Badge variant styles.
 *
 * - **default**: Subtle filled pill on the secondary background.
 * - **outline**: Transparent with a thin border ring.
 * - **brand**: Bold gradient for feature callouts or labels.
 */
const variants = {
  default: "bg-secondary text-secondary-foreground",
  outline:
    "bg-transparent text-foreground ring-1 ring-border",
  brand:
    "bg-gradient-to-r from-[oklch(0.278_0.033_256.848)] to-[oklch(0.205_0.042_265.755)] text-white",
} as const;

export type BadgeVariant = keyof typeof variants;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/**
 * A small pill badge for labels, tags, and status indicators.
 *
 * ```tsx
 * <Badge>New</Badge>
 * <Badge variant="outline">v2.1</Badge>
 * <Badge variant="brand">Pro</Badge>
 * ```
 */
export function Badge({
  variant = "default",
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-3 py-1 rounded-full",
        variants[variant],
        className,
      )}
      {...rest}
    />
  );
}
