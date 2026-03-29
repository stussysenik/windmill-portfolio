import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "~/lib/cn";

interface StaggerGridProps {
  children: React.ReactNode;
  /** Delay between each child's animation, in seconds. Defaults to 0.08. */
  staggerDelay?: number;
  className?: string;
  /** The HTML element to render as. Defaults to "div". */
  as?: React.ElementType;
}

/**
 * Staggered children reveal.
 *
 * Wraps each child in a `motion.div` and staggers their entrance
 * animations when the container scrolls into view. Great for grids,
 * card lists, and feature sections.
 *
 * The container variants only orchestrate timing (`staggerChildren`);
 * each child independently fades up with an ease-out-quint curve.
 */
export function StaggerGrid({
  children,
  staggerDelay = 0.08,
  className,
  as: Component = "div",
}: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Use motion() factory for dynamic element types, fall back to motion.div
  // for the common case.
  const MotionComponent = Component === "div" ? motion.div : motion.create(Component);

  return (
    <MotionComponent
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </MotionComponent>
  );
}
