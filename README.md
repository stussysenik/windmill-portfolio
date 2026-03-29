# Windmill Portfolio — 1:1 Rebuild + Design Engineering Showcase

A pixel-perfect recreation of [gowindmill.com](https://gowindmill.com) built in **React Router (Remix) + TypeScript + Tailwind CSS v4**, showcasing founding-level design engineering craft.

## Why This Exists

This project demonstrates how I'd work as a **Founding Design Engineer** at Windmill — reverse-engineering the existing marketing site, rebuilding it in the product stack (Remix), and adding three "atomic changes" that elevate the experience:

1. **Elevated Motion System** — Spring physics, parallax hero, scroll-triggered reveals, magnetic CTAs
2. **AI Chat Prototype** (`/chat`) — Interactive "Talk to Windy" experience with streaming responses and rich content cards
3. **Design System Showcase** (`/design-system`) — Live component playground documenting the full token system

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Router v7 (Remix) + Vite |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (oklch color tokens) |
| Animation | Framer Motion + CSS @keyframes |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Fonts | Satoshi, Inter, JetBrains Mono |
| Deployment | Vercel |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — 9 sections, 1:1 recreation with elevated motion |
| `/pricing` | Single-tier pricing page |
| `/about-us` | Team page with member grid |
| `/chat` | AI Chat prototype — streaming demo with rich cards |
| `/design-system` | Live design token & component playground |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Design System

The design system is reverse-engineered from gowindmill.com's production CSS:

- **Colors**: oklch-based achromatic tokens with semantic naming
- **Typography**: Satoshi (display), Inter (body), JetBrains Mono (code)
- **Spacing**: 4px base grid (4/8/12/16/24/32px)
- **Motion**: 3-tier system — CSS-only (performance), IntersectionObserver (reveals), Framer Motion (craft)

See `/design-system` for the full interactive reference.

## Architecture Decisions

- **React Router v7 (Remix)**: Matches Windmill's product stack. Demonstrates SSR, nested routes, and data loading patterns.
- **Pathless layout routes**: `_marketing.tsx` wraps all marketing pages with shared Header/Footer.
- **Static data files**: All content in typed TypeScript — zero loaders, zero waterfalls.
- **CDN image helper**: `cdnImage()` builds responsive srcsets via Cloudflare.
- **Motion tiers**: CSS for performance-critical animations, Framer Motion for interactive craft.

## Project Structure

```
app/
├── routes/           # Page routes (React Router file-based routing)
├── components/
│   ├── layout/       # Header, Footer, navigation
│   ├── ui/           # Design system primitives (Button, Card, Badge...)
│   ├── motion/       # Animation components (ScrollReveal, StaggerGrid...)
│   ├── home/         # Homepage section components
│   ├── chat/         # AI chat prototype components
│   └── design-system/ # Design system showcase sections
├── data/             # Static content (typed TypeScript)
├── hooks/            # Custom React hooks
├── lib/              # Utilities (cn, images, meta)
└── types/            # TypeScript interfaces
```

## License

Portfolio project for demonstration purposes only.
