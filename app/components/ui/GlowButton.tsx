import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "~/lib/cn";
import { Button, type ButtonProps } from "./Button";

/**
 * GlowButton — a primary CTA button wrapped with the `.fancy-glow` CSS effect.
 *
 * The glow animation (defined in `app.css`) uses a conic-gradient that rotates
 * continuously. When the button scrolls into view, `useInView` from Framer
 * Motion adds the `.glow-active` class, triggering the entrance glow.
 *
 * ```tsx
 * <GlowButton icon={<ArrowRight size={16} />}>Start free trial</GlowButton>
 * ```
 */
export function GlowButton({
  className,
  children,
  ...rest
}: ButtonProps<"button">) {
  const ref = useRef<HTMLButtonElement>(null);

  // Activate the glow once the button enters the viewport.
  // `once: true` keeps it lit after the first intersection.
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <span
      className={cn(
        "fancy-glow relative inline-flex rounded-[14px]",
        isInView && "glow-active",
        className,
      )}
    >
      <Button ref={ref} variant="primary" className="relative z-10" {...rest}>
        {children}
      </Button>
    </span>
  );
}
