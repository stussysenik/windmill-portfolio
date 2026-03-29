import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton — a wrapper that makes its children subtly follow the cursor.
 *
 * On hover the inner `motion.div` shifts toward the pointer position, creating
 * a magnetic "pull" effect. On leave, a spring eases it back to center.
 *
 * The `strength` prop controls the maximum pixel offset (default 8px).
 *
 * ```tsx
 * <MagneticButton strength={10}>
 *   <Button variant="primary">Hover me</Button>
 * </MagneticButton>
 * ```
 */
export function MagneticButton({
  children,
  strength = 8,
}: {
  children: ReactNode;
  /** Maximum pixel offset in any direction. */
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Raw motion values updated synchronously on every mousemove frame.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs applied on top for a smooth, physical feel.
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalise offset to [-1, 1] then scale by strength.
    const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * strength;
    const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * strength;

    x.set(offsetX);
    y.set(offsetY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}
