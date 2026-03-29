import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "~/lib/cn";

/**
 * Pixel dimensions for each size preset.
 */
const sizeMap = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
} as const;

/** Tailwind classes matching each size preset. */
const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
} as const;

/**
 * A simple palette used to pick a deterministic background color for the
 * initials fallback. The index is derived from the character codes of the
 * name string so the same name always gets the same color.
 */
const fallbackColors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-teal-500",
];

function pickColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return fallbackColors[Math.abs(hash) % fallbackColors.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export type AvatarSize = keyof typeof sizeMap;

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  /** Full name — used for alt text and initials fallback. */
  name: string;
  /** Image URL. When missing or broken the initials fallback is shown. */
  src?: string;
  size?: AvatarSize;
}

/**
 * Circular avatar with an image and an automatic initials fallback.
 *
 * The fallback background color is deterministically derived from the name so
 * repeated renders of the same person are visually consistent.
 *
 * ```tsx
 * <Avatar name="Jane Doe" src="/avatars/jane.jpg" size="lg" />
 * <Avatar name="Alex" />
 * ```
 */
export function Avatar({
  name,
  src,
  size = "md",
  className,
  ...rest
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const showFallback = !src || imgError;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden",
        sizeClasses[size],
        showFallback && [pickColor(name), "text-white font-semibold"],
        className,
      )}
    >
      {showFallback ? (
        <span aria-hidden>{getInitials(name)}</span>
      ) : (
        <img
          src={src}
          alt={name}
          width={sizeMap[size]}
          height={sizeMap[size]}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
          {...rest}
        />
      )}
    </span>
  );
}
