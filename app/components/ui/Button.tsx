import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  forwardRef,
} from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "~/lib/cn";

/**
 * Button variant definitions.
 *
 * - **primary**: Dark gradient CTA with inset light edge — the main call-to-action.
 * - **secondary**: Frosted glass look with a subtle ring border.
 * - **ghost**: Invisible until hovered, then a muted fill appears.
 * - **nav**: Compact dark gradient used inside navigation bars.
 */
const variants = {
  primary: [
    "bg-gradient-to-b from-[#2a2a2a] to-black text-white",
    "shadow-[inset_0_2px_0_rgba(255,255,255,0.15)]",
    "rounded-[14px]",
  ].join(" "),
  secondary: [
    "bg-white/60 backdrop-blur-sm text-[oklch(0.278_0.033_256.848)]",
    "ring-1 ring-border",
    "rounded-[14px]",
  ].join(" "),
  ghost: "bg-transparent hover:bg-muted text-foreground rounded-lg",
  nav: [
    "bg-gradient-to-b from-[oklch(0.278_0.033_256.848)] to-[oklch(0.13_0.028_261.692)]",
    "text-white rounded-md",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
  ].join(" "),
} as const;

/**
 * Size presets controlling padding and font size.
 */
const sizes = {
  sm: "py-2 px-4 text-sm",
  default: "py-3.5 px-7 text-base",
  lg: "py-4 px-8 text-lg",
} as const;

/** Override sizes for the compact `nav` variant. */
const navSize = "py-1.5 px-4 text-sm";

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

/**
 * Props shared across all polymorphic renderings of Button.
 *
 * The `as` prop lets callers swap the underlying element (e.g. a React Router
 * `<Link>`) while keeping the same visual treatment. When `as` is supplied the
 * component forwards all additional props appropriate for that element type.
 */
type ButtonOwnProps<T extends ElementType = "button"> = {
  /** Visual style variant. */
  variant?: ButtonVariant;
  /** Padding / text size preset. */
  size?: ButtonSize;
  /** Optional icon rendered to the right of children. */
  icon?: ReactNode;
  /** Render as a different element or component (e.g. Link). */
  as?: T;
};

export type ButtonProps<T extends ElementType = "button"> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

/**
 * Polymorphic button with Framer Motion spring tap feedback.
 *
 * ```tsx
 * <Button variant="primary" icon={<ArrowRight size={16} />}>
 *   Get started
 * </Button>
 *
 * <Button as={Link} to="/about" variant="ghost">
 *   About
 * </Button>
 * ```
 */
function ButtonInner<T extends ElementType = "button">(
  {
    variant = "primary",
    size = "default",
    icon,
    as,
    className,
    children,
    ...rest
  }: ButtonProps<T>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const Component = as ?? "button";

  // Create the motion-wrapped version of the target element.
  // `motion.create` produces a motion component from any HTML element or
  // React component, giving us whileTap / transition props.
  const MotionComponent = motion.create(Component as ElementType);

  return (
    <MotionComponent
      ref={ref}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        // Base styles shared by every variant
        "inline-flex items-center justify-center gap-2 font-semibold font-body",
        "cursor-pointer select-none transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        // Variant + size
        variants[variant],
        variant === "nav" ? navSize : sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
    </MotionComponent>
  );
}

/**
 * Forward-ref wrapper preserving the generic so callers get correct prop types
 * for their chosen `as` element.
 */
export const Button = forwardRef(ButtonInner) as <
  T extends ElementType = "button",
>(
  props: ButtonProps<T> & { ref?: React.Ref<HTMLButtonElement> },
) => React.ReactElement | null;
