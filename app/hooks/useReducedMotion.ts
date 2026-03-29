import { useState, useEffect } from "react";

/**
 * Detects whether the user has requested reduced motion via the
 * `prefers-reduced-motion: reduce` media query.
 *
 * Returns `false` during SSR (no `window` available) and updates
 * reactively if the user changes their OS preference at runtime.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
