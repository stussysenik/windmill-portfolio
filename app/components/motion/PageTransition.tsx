import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/cn";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AnimatePresence wrapper for route transitions.
 *
 * Wraps page content in a `motion.div` that fades + slides in on mount
 * and fades + slides out on unmount. Pair with React Router's route
 * components to animate between pages.
 *
 * Uses ease-out-quint for a snappy, natural feel.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
