import { Outlet } from "react-router";
import { AnnouncementBar } from "~/components/layout/AnnouncementBar";
import { Header } from "~/components/layout/Header";
import { FooterCTA } from "~/components/layout/FooterCTA";
import { Footer } from "~/components/layout/Footer";

/**
 * _marketing layout route -- wraps all public marketing pages with the
 * site shell: AnnouncementBar, Header, FooterCTA, and Footer.
 *
 * This is a "pathless" layout route (the underscore prefix is a naming
 * convention only -- the actual path config lives in routes.ts).
 * It does NOT contribute a URL segment, so child routes render at their
 * own paths (/, /pricing, /about-us, etc.).
 *
 * Routes that need a different chrome (e.g. /chat) are placed outside
 * this layout in routes.ts.
 */
export default function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />

      {/* Main content area -- flex-1 ensures footer stays at the bottom */}
      <main className="flex-1">
        <Outlet />
      </main>

      <FooterCTA />
      <Footer />
    </div>
  );
}
