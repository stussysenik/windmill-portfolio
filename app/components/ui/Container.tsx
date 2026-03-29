import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "~/lib/cn";

/**
 * Max-width presets for the Container.
 *
 * These map to common content-width tiers used across the portfolio site:
 * - **narrow** (672px): Long-form text, blog posts, focused content.
 * - **medium** (896px): Forms, mid-density layouts.
 * - **default** (1096px): Standard page sections — the most common choice.
 * - **wide** (1280px): Full-bleed feature grids, hero areas.
 */
const maxWidths = {
  narrow: "max-w-[672px]",
  medium: "max-w-[896px]",
  default: "max-w-[1096px]",
  wide: "max-w-[1280px]",
} as const;

export type ContainerSize = keyof typeof maxWidths;

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Controls the max-width tier. */
  size?: ContainerSize;
}

/**
 * Centered max-width container with responsive horizontal padding.
 *
 * Provides consistent gutters that widen at each breakpoint:
 * `px-4` -> `sm:px-6` -> `lg:px-8`.
 *
 * ```tsx
 * <Container size="narrow">
 *   <h1>Blog Post Title</h1>
 *   <p>Content lives inside a narrow column.</p>
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "default", className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        maxWidths[size],
        className,
      )}
      {...rest}
    />
  ),
);
Container.displayName = "Container";
