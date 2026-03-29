import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "~/lib/cn";
import { useReducedMotion } from "~/hooks/useReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Direction the element slides in from. Defaults to "up". */
  direction?: Direction;
  /** Delay before animation starts, in seconds. */
  delay?: number;
  /** Animation duration in seconds. Defaults to 0.6. */
  duration?: number;
  /** If true, the animation only triggers once. Defaults to true. */
  once?: boolean;
  /** Fraction of the element that must be visible to trigger. Defaults to 0.15. */
  amount?: number;
  className?: string;
}

/**
 * Scroll-triggered reveal animation.
 *
 * Fades (and optionally slides) children into view when they enter the
 * viewport. Uses an ease-out-quint curve for a natural, decelerating feel.
 *
 * Respects `prefers-reduced-motion` -- renders children statically when
 * the user has requested reduced motion.
 */

/** Maps a direction to the initial hidden offset. */
function getHiddenOffset(direction: Direction): { x?: number; y?: number } {
  switch (direction) {
    case "up":
      return { y: 24 };
    case "down":
      return { y: -24 };
    case "left":
      return { x: -24 };
    case "right":
      return { x: 24 };
    case "none":
      return {};
  }
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.15,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReducedMotion = useReducedMotion();

  // Bypass animation entirely when reduced motion is preferred.
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = getHiddenOffset(direction);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
