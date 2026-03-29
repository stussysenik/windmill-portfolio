import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "~/lib/cn";

/**
 * TiltCard — 3D perspective tilt that follows the cursor on hover.
 *
 * When the pointer moves over the card, `rotateX` and `rotateY` motion values
 * are updated based on the cursor position relative to the card center. A
 * spring smooths the values so the tilt feels physical rather than snapping.
 *
 * The outer wrapper sets `perspective: 800px` to enable the 3D effect, and the
 * inner `motion.div` applies `transformStyle: "preserve-3d"` so nested content
 * participates in the depth illusion.
 *
 * ```tsx
 * <TiltCard className="p-8 rounded-2xl bg-white shadow-card">
 *   <h3>Hover over me</h3>
 *   <p>Content tilts in 3D space.</p>
 * </TiltCard>
 * ```
 */
export function TiltCard({
  children,
  className,
  maxRotation = 8,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees. */
  maxRotation?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalise position to [-1, 1].
    const normalX = (e.clientX - centerX) / (rect.width / 2);
    const normalY = (e.clientY - centerY) / (rect.height / 2);

    // rotateX is driven by vertical offset (inverted so top edge tilts toward you).
    // rotateY is driven by horizontal offset.
    rotateX.set(-normalY * maxRotation);
    rotateY.set(normalX * maxRotation);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn("will-change-transform", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
