/**
 * WelcomeMessage — the initial greeting from Windy shown at the top
 * of a new channel conversation.
 *
 * Styled as an assistant message bubble with a brief intro explaining
 * what the AI can do in this demo.
 */

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function WelcomeMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3"
    >
      {/* Windy avatar */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground">
        <Sparkles size={14} className="text-white" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">Windy</span>
          <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">
            APP
          </span>
          <span className="text-xs text-gray-400">just now</span>
        </div>

        <div className="rounded-xl rounded-tl-sm border border-gray-100 bg-white px-4 py-3">
          <p className="text-sm leading-relaxed text-gray-700">
            Hey! I'm <strong>Windy</strong>, your AI performance assistant. I can
            help you draft self-reviews, prep for 1:1s, and summarize your quarter
            — all by pulling context from your work tools.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Pick a topic below to see me in action, or type your own message.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
