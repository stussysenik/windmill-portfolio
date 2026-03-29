import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./app.css";

/**
 * Root links -- preconnect to font CDNs for faster first paint.
 *
 * Fonts loaded:
 * - Inter (body text) -- variable weight 100-900, optical sizing 14-32
 * - JetBrains Mono (code / mono text) -- weights 400, 500, 600
 * - Satoshi (display / headings) -- weights 400, 500, 600, 700, 900 via Fontshare
 *
 * Also sets the favicon (SVG) for modern browsers.
 */
export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous" as const,
  },
  { rel: "preconnect", href: "https://api.fontshare.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,900&display=swap",
  },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

/**
 * Layout -- the outermost HTML shell shared by every route.
 *
 * This wraps the entire application (including error boundaries) with the
 * `<html>`, `<head>`, and `<body>` tags. React Router injects `<Meta>`,
 * `<Links>`, `<Scripts>`, and `<ScrollRestoration>` automatically.
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#667eea" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * App -- the root route component.
 *
 * Simply renders the matched child route via `<Outlet />`. Layout chrome
 * (header, footer) lives in the `_marketing` layout route so non-marketing
 * routes (e.g. /chat) can opt out.
 */
export default function App() {
  return <Outlet />;
}

/**
 * ErrorBoundary -- catches unhandled errors and 404s.
 *
 * Renders a minimal error page. In development, includes the stack trace
 * for faster debugging.
 */
export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-4xl font-display font-bold">{message}</h1>
      <p className="mt-2 text-muted-foreground">{details}</p>
      {stack && (
        <pre className="mt-4 w-full p-4 overflow-x-auto rounded-lg bg-muted text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
