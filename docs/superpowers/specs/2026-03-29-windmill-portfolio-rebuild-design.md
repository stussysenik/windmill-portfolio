# Windmill Portfolio Rebuild — Design Spec

## Context

Rebuilding gowindmill.com as a portfolio project to apply for the **Founding Design Engineer** role at Windmill. The goal is a 1:1 recreation of the marketing site in their product stack (Remix + React + TypeScript + Tailwind) plus three "atomic changes" that demonstrate founding-level design engineering: elevated motion, an AI chat prototype, and a design system showcase.

**Job posting:** https://jobs.ashbyhq.com/windmill/d32e01ef-fad1-4481-b8e3-6e54429f8efb

**Timeline:** ASAP (2-3 days), deploy on Vercel.

**Original site analysis:** 50+ screenshots, 15+ DOM snapshots, and 3 detailed design system reports captured via chrome-devtools swarm agents on 2026-03-29.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Remix v2 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (oklch color tokens) |
| Animation | Framer Motion (interactive) + CSS @keyframes (performance) |
| UI Primitives | Radix UI (navigation dropdowns, dialogs) |
| Icons | Lucide React |
| Fonts | Satoshi (FontShare), Inter (Google Fonts), JetBrains Mono (Google Fonts) |
| Deployment | Vercel (Remix adapter) |

---

## Pages

### 1. Homepage (`/`) — 1:1 Rebuild

9 sections matching the original:

1. **Hero** — H1 "Performance reviews that people *actually* like." (Satoshi 72px/700/tight), dual CTAs with glow effect, 3-step product illustration cards, pink-peach-blue gradient bar
2. **Video CTA** — Loom link "See how it works"
3. **Logo Strip** — 10 customer logos on `#E8F6FA` cyan background, grayscale→color on hover
4. **Features Grid** — 5 product cards (Performance Reviews featured large, 4 smaller), React interactive grid
5. **Cost Calculator** — Interactive ROI calculator with slider (0-5000 employees), stepper inputs, accordion review types
6. **Testimonials** — 35 quotes in auto-scrolling marquee rows, brush-stroke highlight colors, pause on hover
7. **Security** — Black section with SOC 2/GDPR badge (green pulse dot), enterprise trust signals
8. **AI Research CTA** — "Ask ChatGPT/Claude/Perplexity about us" buttons
9. **Footer CTA + Footer** — "Your performance reviews have *performance issues*" tagline, warm cream `#FAF5F1` footer with 4-column links

### 2. Pricing (`/pricing`) — 1:1 Rebuild

- Single-tier: "First 10 users free" + $10/user/month
- Feature list, "Book a demo" CTA
- Clean, minimal layout

### 3. About Us (`/about-us`) — 1:1 Rebuild

- Team grid with circular headshots, name, role, social links
- "We're a motivated bunch based in New York City"
- "Join the team" CTA

### 4. AI Chat Prototype (`/chat`) — NEW

Interactive "Talk to Windy" demo — directly addresses the job's #1 requirement: *"Design AI chat experiences emphasizing speed, usefulness, and trustworthiness."*

**Layout:** Dark sidebar (3 demo channels) + white message area + sticky input bar

**Component tree:**
```
ChatPage
├── ChatSidebar
│   ├── SidebarHeader (Windmill logo)
│   ├── ChannelList (self-review, 1-on-1-prep, quarterly-summary)
│   └── SidebarFooter ("Demo Mode" badge)
├── ChatMain
│   ├── ChatHeader (channel name + description)
│   ├── MessageList
│   │   ├── WelcomeMessage
│   │   ├── MessageBubble (user or assistant)
│   │   │   ├── Avatar + MessageMeta (name, timestamp, APP badge)
│   │   │   ├── MessageContent (text | review-draft | action-items | feedback | sources)
│   │   │   └── MessageActions (Edit, Regenerate, Copy)
│   │   └── TypingIndicator (3 bouncing dots)
│   ├── SuggestedPrompts (3 prompt cards with stagger entrance)
│   └── ChatInput (auto-growing textarea + send button)
└── ChatMobileNav (sidebar toggle on mobile)
```

**Interaction flow:**
1. Page loads → sidebar slides in, welcome message from Windy fades up
2. 3 suggested prompts stagger in (80ms between)
3. User clicks/types → prompts exit, user message appears
4. 300ms pause → typing indicator (3 CSS-animated dots, 800-1200ms)
5. Typing indicator exits → response streams word-by-word (2 words/40ms)
6. Source attribution renders first: "Based on 12 Jira tickets, 8 PRs, 3 peer reviews"
7. Rich cards animate in: ReviewDraftCard (staggered sections), ActionItemsList, confidence bars
8. Stream completes → Edit/Regenerate/Copy actions fade in

**State:** `useReducer` with `ChatState` (channels, messages, streaming status). Active channel reflected in URL via `useSearchParams`.

**Streaming engine:** Pre-written scripts per scenario with simulated word-by-word streaming. Demo mode — zero API keys required. Optional real mode via Claude API (`/api/chat` action route returning SSE stream).

**Trust signals:**
- Source attribution chips with integration icons (Jira, GitHub, Slack, Docs)
- Confidence bars per review section (emerald/amber/orange)
- Edit/Regenerate/Copy affordances on completed messages

**Message types:**
```typescript
type MessageContentType = "text" | "review-draft" | "action-items" | "feedback-card" | "source-attribution";
```

**3 demo scripts:**
- **Self-review**: Drafts a Q1 review with 3 rated sections (Technical Execution, Collaboration, Growth Areas)
- **1:1 prep**: Generates agenda with talking points, action items from last meeting
- **Quarterly summary**: Key accomplishments with metrics, peer feedback highlights

### 5. Design System (`/design-system`) — NEW

Live component playground with sticky sidebar nav. 7 sections:

1. **Colors** — All oklch tokens as swatches with hex values, click-to-copy
2. **Typography** — Live specimens: Satoshi display (72/48/30px), Inter body (24/20/18/16/14px), JetBrains Mono (14px)
3. **Spacing** — Visual ruler bars showing 4/8/12/16/24/32px grid
4. **Buttons** — Primary (dark gradient + glow), Secondary (translucent + ring), Ghost, Nav variants. Interactive state toggles (hover, active, disabled)
5. **Cards** — Dark feature card, glass card, light card, interactive selection card, gradient card. Live hover demos
6. **Form Controls** — Slider, stepper (from cost calculator), toggle
7. **Animations** — On-demand playback: scroll reveal, stagger grid, glow-rotate, marquee, spring button

---

## Design System Tokens

### Colors (CSS Custom Properties)

```css
:root {
  --background: oklch(1 0 0);           /* #ffffff */
  --foreground: oklch(.145 0 0);        /* #0a0a0a */
  --primary: oklch(.205 0 0);           /* #171717 */
  --primary-foreground: oklch(.985 0 0); /* #fafafa */
  --secondary: oklch(.97 0 0);          /* #f5f5f5 */
  --muted: oklch(.97 0 0);             /* #f5f5f5 */
  --muted-foreground: oklch(.46 0 0);   /* #585858 */
  --border: oklch(.922 0 0);            /* #e5e5e5 */
  --destructive: oklch(.577 .245 27.325); /* #e7000b */
  --ring: oklch(.708 0 0);             /* #a1a1a1 */
  --radius: 0.625rem;                   /* 10px */

  --font-display: "Satoshi", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

### Section Backgrounds

| Section | Color |
|---------|-------|
| Hero | white |
| Logo strip + features gradient start | `#E8F6FA` |
| Cost calculator | `#F4EFED` |
| Security | `#000000` |
| Footer | `#FAF5F1` |

### Typography Scale

| Size | Weight | Tracking | Font | Usage |
|------|--------|----------|------|-------|
| 72px | 700 | -1.8px | Satoshi | H1 hero |
| 48px | 700 | -1.2px | Satoshi | H2 sections |
| 30px | 600 | -0.75px | Satoshi | Stat values |
| 24px | 400 | normal | Inter | Subheading/lead |
| 20px | 400 | normal | Inter | Body large |
| 18px | 600 | normal | Inter | Card headings |
| 16px | 400 | normal | Inter | Body default |
| 14px | 500 | normal | Inter | Nav, small text |
| 14px | 500 | 1.4px | JetBrains Mono | Blueprint labels |

### Button System

**Primary CTA:**
```css
background: linear-gradient(in oklab, #2a2a2a, #000000);
color: white;
font: 600 16px/24px Inter;
padding: 14px 28px;
border-radius: 14px;
box-shadow: inset 0 2px 0 rgba(255,255,255,0.15);
```

**Secondary CTA:**
```css
background: rgba(255,255,255, 0.6);
color: oklch(0.278 0.033 256.848);
padding: 14px 28px;
border-radius: 14px;
ring: 1px gray-300/70;
backdrop-filter: blur(4px);
```

### Gradients

- **Hero wash:** `linear-gradient(to right, rgba(255,174,220,0.757), rgba(255,195,126,0.596) 25%, rgba(97,133,240,0.36) 50%, transparent)`
- **Primary button:** `linear-gradient(in oklab, #2a2a2a, #000000)`
- **CTA glow:** `conic-gradient(from var(--angle), #6a9eff, #e76fe5, #ffdb00, #fc5818, #6a9eff)` rotating at 4s linear infinite

---

## Motion System

### Tier 1: CSS-Only (Performance)

| Animation | Duration | Usage |
|-----------|----------|-------|
| `marquee` | variable | Testimonial + logo auto-scroll |
| `glow-rotate` | 4s linear infinite | CTA conic gradient rotation |
| `pulse` | 2s infinite | SOC2 green dot |
| `shiny-text` | 8s ease-in-out | Shimmer text effect |
| hover transitions | 0.15-0.3s cubic-bezier | Color, transform, opacity |
| `blink-cursor` | 0.8s step-end | Chat streaming cursor |
| `typing-dot` | 1.4s infinite | Chat typing indicator dots |

### Tier 2: Framer Motion (Craft Differentiators)

| Feature | Config | Purpose |
|---------|--------|---------|
| Scroll reveals | `useInView`, 0.6s ease-out-quint, 24px translateY | Section entrances |
| Stagger grids | 80ms staggerChildren, child variants | Feature cards, team grid |
| Hero parallax | `useScroll` + `useTransform`, 3 depth layers (0.3x/0.5x/0.7x) | Depth without library |
| Page transitions | `AnimatePresence mode="wait"`, 300ms fade+slide, `useOutlet()` key | Smooth route changes |
| Spring buttons | `whileTap={{ scale: 0.97 }}`, stiffness 400, damping 17 | Organic press feedback |
| Magnetic CTA | 8px max displacement, spring return stiffness 300, damping 20 | Craft signal on hero CTAs |
| Number counting | `useMotionValue` + `animate`, 1.5s ease-out, 200ms stagger | Stats: 90%, 93%, 8 days |
| Accordion height | `AnimatePresence`, height "auto", 0.3s ease-out-quint | Cost calculator sections |
| Nav scroll | `useTransform` on scrollY [0,100] — blur, shadow, margin interpolated | No hard toggle |
| Glow ignition | `useInView` triggers glow-active class, 0.8s opacity+scale entrance | CTA glow "breathes on" |

All motion respects `prefers-reduced-motion: reduce`.

---

## Project Structure

```
windmill-portfolio/
├── app/
│   ├── root.tsx                          # AnimatePresence page transitions
│   ├── routes/
│   │   ├── _marketing.tsx                # Shared layout (Header + Footer)
│   │   ├── _marketing._index.tsx         # Homepage
│   │   ├── _marketing.pricing.tsx        # Pricing
│   │   ├── _marketing.about-us.tsx       # About Us
│   │   ├── _marketing.design-system.tsx  # Design System showcase
│   │   ├── chat.tsx                      # AI Chat (own layout)
│   │   └── api.chat.tsx                  # Chat API (SSE stream action)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx                # Sticky nav + scroll behavior
│   │   │   ├── MobileNav.tsx             # Hamburger dialog
│   │   │   ├── Footer.tsx                # Warm cream footer
│   │   │   ├── FooterCTA.tsx             # "Performance issues" CTA
│   │   │   ├── AnnouncementBar.tsx       # Top banner
│   │   │   └── NavigationProgress.tsx    # Route transition progress bar
│   │   ├── ui/
│   │   │   ├── Button.tsx                # Spring physics, 4 variants
│   │   │   ├── GlowButton.tsx            # Conic gradient glow CTA
│   │   │   ├── MagneticButton.tsx         # Cursor-following CTA
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Container.tsx
│   │   │   └── TiltCard.tsx              # 3D perspective hover
│   │   ├── motion/
│   │   │   ├── ScrollReveal.tsx          # useInView + variants
│   │   │   ├── StaggerGrid.tsx           # Staggered children reveal
│   │   │   ├── CountUp.tsx               # Animated number counter
│   │   │   └── PageTransition.tsx        # AnimatePresence wrapper
│   │   ├── home/
│   │   │   ├── HeroSection.tsx           # Parallax hero
│   │   │   ├── VideoSection.tsx
│   │   │   ├── LogoStrip.tsx             # Grayscale→color marquee
│   │   │   ├── FeaturesGrid.tsx          # Interactive feature cards
│   │   │   ├── CostCalculator.tsx        # ROI calculator
│   │   │   ├── Testimonials.tsx          # Marquee rows
│   │   │   ├── SecuritySection.tsx       # Dark trust section
│   │   │   ├── AIResearchCTA.tsx         # Ask ChatGPT/Claude/Perplexity
│   │   │   └── BottomCTA.tsx
│   │   ├── chat/
│   │   │   ├── ChatSidebar.tsx
│   │   │   ├── ChatMain.tsx
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── SuggestedPrompts.tsx
│   │   │   ├── WelcomeMessage.tsx
│   │   │   └── cards/
│   │   │       ├── ReviewDraftCard.tsx
│   │   │       ├── ActionItemsList.tsx
│   │   │       ├── FeedbackCard.tsx
│   │   │       └── SourceAttribution.tsx
│   │   └── design-system/
│   │       ├── ColorSection.tsx
│   │       ├── TypographySection.tsx
│   │       ├── SpacingSection.tsx
│   │       ├── ButtonSection.tsx
│   │       ├── CardSection.tsx
│   │       ├── FormSection.tsx
│   │       └── AnimationSection.tsx
│   ├── data/
│   │   ├── navigation.ts
│   │   ├── features.ts
│   │   ├── testimonials.ts
│   │   ├── logos.ts
│   │   ├── team.ts
│   │   ├── pricing.ts
│   │   ├── footer.ts
│   │   └── chat-prompts.ts
│   ├── hooks/
│   │   ├── useScrollObserver.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useReducedMotion.ts
│   │   └── useChatStream.ts
│   ├── lib/
│   │   ├── cn.ts                         # clsx + tailwind-merge
│   │   ├── images.ts                     # CDN URL builder
│   │   ├── calculator.ts                 # ROI calculation logic
│   │   ├── meta.ts                       # SEO meta helpers
│   │   └── chat/
│   │       ├── streamSimulator.ts
│   │       ├── chatReducer.ts
│   │       └── scripts/
│   │           ├── selfReview.ts
│   │           ├── oneOnOnePrep.ts
│   │           └── quarterlySummary.ts
│   ├── types/
│   │   └── chat.ts
│   └── styles/
│       ├── tailwind.css                  # Base + component layers
│       ├── fonts.css                     # @font-face declarations
│       └── animations.css                # @keyframes + @property
├── public/
│   └── fonts/                            # Self-hosted woff2 files
├── tailwind.config.ts                    # Full design token system
├── vite.config.ts
├── tsconfig.json
├── vercel.json                           # Cache headers for fonts
└── package.json
```

---

## Data Strategy

All content in typed TypeScript files under `app/data/`. No CMS, no DB. Static imports = zero loaders, zero waterfalls, instant page loads.

## Image Strategy

`cdnImage(key, { width, height })` helper builds Cloudflare CDN URLs with responsive srcsets. Hero images `loading="eager"`, all others `loading="lazy"` + `decoding="async"`. Explicit dimensions prevent CLS.

---

## Verification Plan

- [ ] Visual comparison: overlay screenshots at 375/768/1024/1440px against captured originals
- [ ] Lighthouse: target 95+ accessibility, 100 best practices, 100 SEO
- [ ] LCP < 2.5s, TBT < 200ms, total JS < 150KB gzipped
- [ ] Keyboard navigation: all interactive elements focusable, chat input handles Enter/Shift+Enter
- [ ] `prefers-reduced-motion`: all Framer Motion respects the setting
- [ ] Chat demo: all 3 scenarios stream correctly, rich cards render, trust signals display
- [ ] Responsive: header collapses to hamburger, footer to accordion, chat sidebar to drawer
- [ ] Vercel deploy: production build succeeds, all routes resolve
