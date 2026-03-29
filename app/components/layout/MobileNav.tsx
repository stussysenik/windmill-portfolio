import { useState } from "react";
import { Link } from "react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/cn";
import { Button } from "~/components/ui/Button";
import {
  productLinks,
  resourceLinks,
  companyLinks,
  mainNavLinks,
} from "~/data/navigation";
import type { NavLink } from "~/data/navigation";

/**
 * MobileNav -- full-screen drawer for small viewports (< lg).
 *
 * Architecture:
 * - Built on Radix Dialog for focus-trapping, Escape handling, and a11y.
 * - Slides in from the right with framer-motion.
 * - Accordion-style sections for Product / Resources / Company links.
 * - Static links (How It Works, Pricing, Customers) render as plain items.
 * - CTA buttons pinned to the bottom.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* Drawer panel */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col"
              >
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <span className="font-display text-lg font-bold tracking-tight">
                    Menu
                  </span>
                  <Dialog.Close asChild>
                    <button
                      className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                      aria-label="Close menu"
                    >
                      <X size={20} />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Scrollable nav content */}
                <nav className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="space-y-1">
                    {/* Product section */}
                    <MobileSection
                      label="Product"
                      links={productLinks}
                      onNavigate={() => setOpen(false)}
                    />

                    {/* Static links */}
                    {mainNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}

                    {/* Resources section */}
                    <MobileSection
                      label="Resources"
                      links={resourceLinks}
                      onNavigate={() => setOpen(false)}
                    />

                    {/* Company section */}
                    <MobileSection
                      label="Company"
                      links={companyLinks}
                      onNavigate={() => setOpen(false)}
                    />
                  </div>
                </nav>

                {/* Bottom CTAs */}
                <div className="border-t border-border px-5 py-4 space-y-3">
                  <Link to="/chat" onClick={() => setOpen(false)} className="block">
                    <Button variant="secondary" size="default" className="w-full">
                      Try AI Demo
                    </Button>
                  </Link>
                  <a
                    href="https://app.gowindmill.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="primary"
                      size="default"
                      icon={<ArrowRight size={16} />}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </a>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/**
 * MobileSection -- expandable section within the mobile drawer.
 *
 * Uses a simple controlled open/close pattern (no Radix Accordion needed)
 * with framer-motion for the height animation.
 */
function MobileSection({
  label,
  links,
  onNavigate,
}: {
  label: string;
  links: NavLink[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors cursor-pointer",
          expanded
            ? "text-foreground bg-muted"
            : "text-foreground hover:bg-muted"
        )}
      >
        {label}
        <ChevronRight
          size={16}
          className={cn(
            "text-muted-foreground transition-transform duration-200",
            expanded && "rotate-90"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-4 py-1 space-y-0.5">
              {links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onNavigate}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  >
                    {link.label}
                    <span className="text-xs">&nearr;</span>
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={onNavigate}
                    className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
