import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import { footerColumns, legalLinks, socialLinks } from "~/data/footer";

/**
 * Footer -- site-wide footer with four link columns, legal links, and socials.
 *
 * Layout:
 * - Top: logo + tagline on the left, four link columns on the right (responsive grid).
 * - Bottom: legal links on the left, social icons on the right, copyright centered.
 *
 * Design notes:
 * - Uses the same cream background as FooterCTA for visual continuity.
 * - Muted text colors keep the footer understated.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-cream-footer)] border-t border-border/40">
      <Container size="wide" className="py-16 sm:py-20">
        {/* Top section */}
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* Brand column */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                className="shrink-0"
              >
                <rect
                  width="32"
                  height="32"
                  rx="8"
                  fill="oklch(0.205 0.02 260)"
                />
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
            <p className="mt-4 text-sm text-muted-foreground max-w-[240px] leading-relaxed">
              AI-powered performance management that actually works. Faster
              cycles, fairer reviews, happier teams.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-border/40" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Legal links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span>&copy; {currentYear} Windmill. All rights reserved.</span>
            {legalLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {social.icon === "twitter" && <TwitterIcon />}
                {social.icon === "linkedin" && <LinkedInIcon />}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

/** Inline SVG for X/Twitter icon -- avoids importing a full icon library just for two social icons. */
function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** Inline SVG for LinkedIn icon. */
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
