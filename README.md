<p align="center">
  <img src="public/favicon.svg" width="64" height="64" alt="Windmill">
</p>

<h1 align="center">Windmill Portfolio</h1>

<p align="center">
  <strong>1:1 pixel-perfect rebuild of <a href="https://gowindmill.com">gowindmill.com</a></strong><br>
  Built with React Router v7 (Remix) + TypeScript + Tailwind CSS v4 + Framer Motion
</p>

<p align="center">
  <a href="#tech-stack"><img src="https://img.shields.io/badge/React_Router-v7-blue?style=flat-square" alt="React Router v7"></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square" alt="TypeScript"></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square" alt="Tailwind v4"></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Framer_Motion-spring_physics-ff69b4?style=flat-square" alt="Framer Motion"></a>
  <a href="#routes"><img src="https://img.shields.io/badge/11_routes-200_OK-brightgreen?style=flat-square" alt="11 Routes"></a>
</p>

---

## Why This Exists

This project demonstrates how I'd work as a **Founding Design Engineer** at Windmill. I reverse-engineered the entire production marketing site from scratch — every text string, CDN parameter, and interaction — then rebuilt it in the product stack with three "atomic changes" showcasing founding-level craft:

| Change | What It Proves |
|--------|---------------|
| **Elevated Motion System** | Spring physics, parallax, scroll reveals, magnetic CTAs, GPU-accelerated CSS animations |
| **AI Chat Prototype** (`/chat`) | Product thinking — streaming engine, rich content cards, trust signals |
| **Design System Showcase** (`/design-system`) | Systems thinking — living token reference, component playground |

## Forensic Methodology

Every element was verified against the live DOM using a **char-level, byte-level audit**:

```
DOM Snapshot (source of truth)          Our Implementation
─────────────────────────────          ──────────────────
uid=1_80 heading "Performance          <h1>Performance reviews
reviews that people actually           that people <em>actually
like." level="1"                       like</em>.</h1>

uid=1_127 image "Rho"                  alt={logo.name}  // "Rho"
url="...fit=contain,width=960,         cdnImage(logo.src, {
height=960,dpi=3,format=webp/..."      width: 960, height: 960,
                                       fit: "contain", format: "webp"
                                       })
```

Every discrepancy was fixed until the audit returned **ALL CLEAR**.

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React Router v7 (Remix) + Vite | Windmill's product stack |
| Language | TypeScript (strict) | Type safety across data, components, routes |
| Styling | Tailwind CSS v4 (oklch tokens) | Reverse-engineered from production CSS |
| Animation | Framer Motion + CSS @keyframes | 3-tier motion: CSS (perf) / IO (reveals) / FM (craft) |
| UI | Radix UI (NavigationMenu, Dialog) | Accessible primitives |
| Icons | Lucide React + inline SVGs | Tree-shakeable, AI provider logos |
| Fonts | Satoshi + Inter + JetBrains Mono | Exact match to gowindmill.com |
| Images | Cloudflare CDN (gowindmill-images.com) | Responsive WebP with per-asset dimensions |

## Routes

| Route | Page | Status |
|-------|------|--------|
| `/` | Homepage (hero, 3-step illustration, features, calculator, testimonials, security, AI CTA) | Done |
| `/pricing` | Single-tier pricing ($10/user/month, first 10 free) | Done |
| `/about-us` | Team grid with CDN headshots and social links | Done |
| `/science` | How It Works — AI pipeline, deep integrations | Done |
| `/vision` | Company vision with founder callout | Done |
| `/customers` | Stats, case studies, attributed testimonials | Done |
| `/integrations` | 30+ tools across 4 categories | Done |
| `/tools` | Free tools (Self Review, Cost Calculator) | Done |
| `/blog` | Articles with authors, dates, tags | Done |
| `/design-system` | Live component and token playground | Done |
| `/chat` | AI Chat prototype with streaming simulation | Done |

## Project Structure

```
windmill-portfolio/
├── app/
│   ├── routes/                  # 11 page routes
│   │   ├── _marketing.tsx       # Shared layout (Header + Footer)
│   │   ├── _marketing._index.tsx
│   │   ├── _marketing.pricing.tsx
│   │   ├── _marketing.about-us.tsx
│   │   ├── _marketing.science.tsx
│   │   ├── _marketing.vision.tsx
│   │   ├── _marketing.customers.tsx
│   │   ├── _marketing.integrations.tsx
│   │   ├── _marketing.tools.tsx
│   │   ├── _marketing.blog.tsx
│   │   ├── _marketing.design-system.tsx
│   │   └── chat.tsx
│   ├── components/
│   │   ├── home/                # 9 homepage sections
│   │   ├── layout/              # Header, Footer, FooterCTA, MobileNav
│   │   ├── ui/                  # Button, Card, Badge, GlowButton, MagneticButton
│   │   ├── motion/              # ScrollReveal, StaggerGrid, CountUp
│   │   └── chat/                # AI chat prototype components
│   ├── data/                    # Typed content (testimonials, features, logos, nav)
│   ├── lib/                     # Utilities (cn, cdnImage, chat engine)
│   └── hooks/                   # useReducedMotion, useMediaQuery
├── public/
│   ├── favicon.svg              # Real Windmill pinwheel logo
│   └── favicon-dark.svg         # Dark mode variant
└── docs/                        # Design specs
```

## Design Tokens

Reverse-engineered from gowindmill.com's production CSS:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-cyan-section` | `#e8f6fa` | Logo strip, features gradient |
| `--color-beige-section` | `#f4efed` | Calculator background |
| `--color-cream-footer` | `#faf5f1` | Footer background |
| `--font-display` | Satoshi 700 | Headlines |
| `--font-body` | Inter 400-900 | Body text |
| `--ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | Primary easing |

## Motion System

Three tiers of animation, each chosen for its performance profile:

| Tier | Technology | Use Cases | FPS |
|------|-----------|-----------|-----|
| CSS-only | `@keyframes` | Marquee, pulse, glow rotation | 60 (GPU) |
| Intersection Observer | `useInView` | Scroll reveals, stagger grids | 60 |
| Framer Motion | `motion`, springs | Interactive: hover, tap, parallax | 60 |

Key animations:
- **Glow CTA**: Conic gradient rotation via `@property --glow-angle` (GPU-composited)
- **Magnetic button**: Cursor-following with spring return (stiffness 300, damping 20)
- **Testimonial scatter**: Seeded random rotations for deterministic layout
- **Logo spin**: Windmill icon rotates 360deg on hover (1s linear)

## Getting Started

```bash
git clone <repo-url>
cd windmill-portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build       # Production build
npm run preview     # Preview production build locally
```

## Bundle Analysis

| Chunk | Size (gzip) |
|-------|-------------|
| Entry client | 59.03 KB |
| Homepage | 16.45 KB |
| Marketing layout | 28.21 KB |
| Chat prototype | 8.86 KB |
| Framer Motion | 42.59 KB |

## Git History

| Tag | Milestone |
|-----|-----------|
| `v0.1.0` | Foundation: scaffold, design tokens, utilities |
| `v0.4.0` | Layout shell + full homepage (9 sections) |
| `v0.6.0` | AI chat prototype + secondary pages |
| `v0.7.0` | Design system showcase |
| `v0.8.0` | First 1:1 fidelity pass |
| `v0.9.0` | Forensic audit + 6 subpages (current) |

## License

Portfolio project for demonstration purposes only. All Windmill branding, content, and assets belong to [Windmill](https://gowindmill.com).

---

<p align="center">
  Built with care by a designer who codes.<br>
  <sub>Applying for <a href="https://jobs.ashbyhq.com/windmill/d32e01ef-fad1-4481-b8e3-6e54429f8efb">Founding Design Engineer</a> at Windmill</sub>
</p>
