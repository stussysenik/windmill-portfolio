import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { cn } from "~/lib/cn";

interface CountUpProps {
  /** Starting value. Defaults to 0. */
  from?: number;
  /** Target value to count up (or down) to. */
  to: number;
  /** Text appended after the number (e.g. "+" or "%"). */
  suffix?: string;
  /** Text prepended before the number (e.g. "$"). */
  prefix?: string;
  /** Animation duration in seconds. Defaults to 1.5. */
  duration?: number;
  /** Number of decimal places to display. Defaults to 0. */
  decimals?: number;
  className?: string;
}

/**
 * Animated number counter.
 *
 * Counts from `from` to `to` when the element enters the viewport,
 * driven by a Framer Motion `motionValue` for silky performance.
 * Supports prefix/suffix text and configurable decimal precision.
 */
export function CountUp({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  duration = 1.5,
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(from);

  // Derive the formatted display string from the raw motion value.
  const display = useTransform(motionValue, (current) => {
    return `${prefix}${current.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, to, {
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, motionValue, to, duration]);

  return <motion.span ref={ref} className={cn(className)}>{display}</motion.span>;
}
