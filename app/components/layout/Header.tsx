import { useState } from "react";
import { Link } from "react-router";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "~/lib/cn";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import {
  productLinks,
  resourceLinks,
  companyLinks,
  mainNavLinks,
} from "~/data/navigation";
import type { NavLink } from "~/data/navigation";
import { MobileNav } from "./MobileNav";

/**
 * Header -- sticky top navigation with scroll-aware styling.
 *
 * Architecture:
 * - Uses framer-motion `useScroll` + `useTransform` for a glass-morphism
 *   effect that fades in as the user scrolls past the announcement bar.
 * - Radix NavigationMenu powers the accessible dropdown mega-menus on desktop.
 * - A separate `MobileNav` (Radix Dialog drawer) handles < lg breakpoints.
 *
 * Scroll behavior:
 * - 0px scrollY   -> fully transparent header, no border
 * - 50px scrollY  -> frosted glass background with bottom border
 */
export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Track whether the user has scrolled past the threshold
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Smooth background opacity transition
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-[border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-border/60 shadow-nav"
          : "border-b border-transparent"
      )}
    >
      {/* Frosted background layer */}
      <motion.div
        className="absolute inset-0 bg-white/80 backdrop-blur-xl"
        style={{ opacity: bgOpacity }}
      />

      <Container size="wide" className="relative">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight"
          >
            {/* Windmill icon mark */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              className="shrink-0"
            >
              <rect width="32" height="32" rx="8" fill="oklch(0.205 0.02 260)" />
              <path
                d="M16 8 L20 16 L16 24 L12 16 Z"
                fill="white"
                opacity="0.9"
              />
              <path
                d="M8 16 L16 12 L24 16 L16 20 Z"
                fill="white"
                opacity="0.6"
              />
            </svg>
            Windmill
          </Link>

          {/* Desktop navigation */}
          <NavigationMenu.Root className="hidden lg:flex" delayDuration={100}>
            <NavigationMenu.List className="flex items-center gap-1">
              {/* Product dropdown */}
              <DropdownItem label="Product" links={productLinks} />

              {/* Static links */}
              {mainNavLinks.map((link) => (
                <NavigationMenu.Item key={link.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      to={link.href}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}

              {/* Resources dropdown */}
              <DropdownItem label="Resources" links={resourceLinks} />

              {/* Company dropdown */}
              <DropdownItem label="Company" links={companyLinks} />

              <NavigationMenu.Indicator className="flex items-end justify-center h-2.5 top-full overflow-hidden z-10 transition-transform duration-200">
                <div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white border-t border-l border-border" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            {/* Viewport for dropdown content */}
            <div className="absolute left-0 top-full flex w-full justify-center perspective-[2000px]">
              <NavigationMenu.Viewport
                className={cn(
                  "relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full max-w-lg origin-top overflow-hidden rounded-2xl border border-border bg-white shadow-lg",
                  "transition-[width,height,opacity] duration-300 ease-out",
                  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                )}
              />
            </div>
          </NavigationMenu.Root>

          {/* Right side: CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link to="/chat" className="hidden sm:block">
              <Button variant="secondary" size="sm">
                Try AI Demo
              </Button>
            </Link>
            <a href="https://app.gowindmill.com" target="_blank" rel="noopener noreferrer">
              <Button variant="nav" size="sm" icon={<ArrowRight size={14} />}>
                Get Started
              </Button>
            </a>

            {/* Mobile hamburger */}
            <MobileNav />
          </div>
        </div>
      </Container>
    </motion.header>
  );
}

/**
 * DropdownItem -- a single NavigationMenu trigger + content panel.
 *
 * Renders a list of NavLinks inside a dropdown. External links open in a new
 * tab with proper rel attributes.
 */
function DropdownItem({
  label,
  links,
}: {
  label: string;
  links: NavLink[];
}) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger
        className={cn(
          "group inline-flex items-center gap-1 px-3 py-2 text-sm font-medium",
          "text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted",
          "data-[state=open]:text-foreground cursor-pointer select-none"
        )}
      >
        {label}
        <ChevronDown
          size={14}
          className="transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content className="absolute left-0 top-0 w-full sm:w-auto p-3">
        <ul className="grid gap-1 w-[380px]">
          {links.map((link) => (
            <li key={link.href}>
              <NavigationMenu.Link asChild>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl px-4 py-3 transition-colors hover:bg-muted group/link"
                  >
                    <div className="text-sm font-semibold text-foreground group-hover/link:text-foreground">
                      {link.label}
                      <span className="ml-1 text-muted-foreground text-xs">&nearr;</span>
                    </div>
                    {link.description && (
                      <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                        {link.description}
                      </p>
                    )}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="block rounded-xl px-4 py-3 transition-colors hover:bg-muted group/link"
                  >
                    <div className="text-sm font-semibold text-foreground group-hover/link:text-foreground">
                      {link.label}
                    </div>
                    {link.description && (
                      <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                        {link.description}
                      </p>
                    )}
                  </Link>
                )}
              </NavigationMenu.Link>
            </li>
          ))}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
