/**
 * TypingIndicator — three bouncing dots showing "Windy is typing...".
 *
 * Uses the `.typing-dot` CSS classes defined in app.css for the bounce
 * animation. Wrapped in AnimatePresence for smooth enter/exit transitions.
 */

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3"
    >
      {/* Windy avatar */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground">
        <Sparkles size={14} className="text-white" />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">
          Windy is typing...
        </span>
        <div className="rounded-xl rounded-tl-sm border border-gray-100 bg-white px-4 py-3">
          <div className="flex items-center gap-1.5">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
