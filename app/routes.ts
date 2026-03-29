import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

/**
 * Route configuration for the Windmill portfolio site.
 *
 * Structure:
 * - `_marketing` is a layout route that wraps pages with the Header,
 *   AnnouncementBar, FooterCTA, and Footer. It does NOT add a URL segment.
 * - `/chat` is a standalone route outside the marketing layout so it can
 *   render a full-screen chat interface without the standard chrome.
 */
export default [
  layout("routes/_marketing.tsx", [
    index("routes/_marketing._index.tsx"),
    route("pricing", "routes/_marketing.pricing.tsx"),
    route("about-us", "routes/_marketing.about-us.tsx"),
    route("design-system", "routes/_marketing.design-system.tsx"),
  ]),
  route("chat", "routes/chat.tsx"),
] satisfies RouteConfig;
