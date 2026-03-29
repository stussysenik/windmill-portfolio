# Roadmap

## v0.1.0 -- Foundation
- Project scaffold (React Router v7 + Vite + TypeScript + Tailwind v4)
- Design token system (oklch colors, typography, spacing, animations)
- Utility libraries (cn, images, meta)
- Documentation setup

## v0.2.0 -- UI Primitives + Motion
- Base UI components (Button, Card, Badge, Avatar, Container)
- Specialty components (GlowButton, MagneticButton, TiltCard)
- Motion primitives (ScrollReveal, StaggerGrid, CountUp, PageTransition)
- Custom hooks (useReducedMotion, useMediaQuery)

## v0.3.0 -- Layout Shell
- Root layout with page transitions
- Header with sticky scroll behavior + Radix dropdowns
- Mobile navigation (hamburger + dialog overlay)
- Footer with warm cream theme + mobile accordion
- Announcement bar + navigation progress bar

## v0.4.0 -- Homepage (1:1 Rebuild)
- All 9 homepage sections with pixel-perfect fidelity
- Elevated motion: parallax hero, spring buttons, magnetic CTAs
- Interactive cost calculator with dynamic results
- Testimonial marquee with brush-stroke highlights
- Scroll-triggered reveals with staggered grid entries

## v0.5.0 -- Secondary Pages
- Pricing page (single-tier, feature list)
- About Us page (team grid with headshots)

## v0.6.0 -- AI Chat Prototype
- Slack-inspired chat interface with dark sidebar
- Streaming simulation engine with pre-written demo scripts
- Rich message types (ReviewDraft, ActionItems, FeedbackCard)
- Trust signals (source attribution, confidence bars)
- 3 demo scenarios: self-review, 1:1 prep, quarterly summary

## v0.7.0 -- Design System Showcase
- Interactive component playground
- 8 sections: Colors, Typography, Spacing, Buttons, Containers, Radius, Shadows, Motion
- Live hover demos, on-demand animation playback

## v0.8.0 -- First 1:1 Fidelity Pass
- DOM-snapshot-driven audit against gowindmill.com
- Fixed copy, colors, structure across 14 files
- Corrected section backgrounds, heading copy, CTA labels

## v0.9.0 -- Forensic Audit + Full Site (Current)
- Char-level, byte-level DOM audit (every text string, URL, CDN param)
- 3-step product illustration (replaces video embed)
- Scattered testimonial mosaic with seeded rotations
- 2-column cost calculator with iOS toggle switches
- Real Windmill pinwheel logo SVG from production favicon
- 6 new subpages: Science, Vision, Customers, Integrations, Tools, Blog
- 11 total routes, all returning 200

## v1.0.0 -- Production Deploy
- Vercel production deployment
- Responsive verification at 375/768/1024/1440px
- Lighthouse performance audit (target: 95+)
- Core Web Vitals optimization (LCP < 2.5s, CLS < 0.1)
- Final accessibility pass (keyboard, ARIA, screen reader)

## Future Considerations
- Real Claude API integration for chat (optional ANTHROPIC_API_KEY)
- Feature detail pages (/features/performance-reviews, etc.)
- Individual integration pages
- Blog article pages
- Dark mode variant
- Figma design file export
