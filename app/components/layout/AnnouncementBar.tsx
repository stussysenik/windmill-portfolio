import { useState } from "react";
import { Link } from "react-router";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AnnouncementBar -- slim, dismissible banner pinned to the top of the viewport.
 *
 * Design notes (gowindmill.com reference):
 * - Dark background with a subtle gradient to draw the eye without clashing
 *   with the white header below.
 * - Single-line message with a text-link CTA that includes a right arrow.
 * - Dismiss button on the far right stores state locally so the bar stays
 *   hidden for the session (no persistence across reloads -- intentional).
 */
export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden bg-gradient-to-r from-[oklch(0.205_0.02_260)] to-[oklch(0.16_0.03_260)] text-white"
        >
          <div className="relative flex items-center justify-center px-4 py-2.5 text-sm font-body">
            {/* Message */}
            <p className="text-center text-white/90">
              Windmill 2.0 is here -- AI-powered performance reviews.{" "}
              <Link
                to="/blog/windmill-2"
                className="inline-flex items-center gap-1 font-semibold text-white underline underline-offset-2 hover:text-white/80 transition-colors"
              >
                Read the announcement
                <ArrowRight size={14} className="shrink-0" />
              </Link>
            </p>

            {/* Dismiss */}
            <button
              onClick={() => setVisible(false)}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
