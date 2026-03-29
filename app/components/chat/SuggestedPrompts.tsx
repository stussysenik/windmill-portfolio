/**
 * SuggestedPrompts — 3 starter prompt cards shown before the first message.
 *
 * Each card displays an icon, label, and description from the chat-prompts
 * data. Cards stagger in (80ms delay) and animate out on selection.
 * Uses AnimatePresence for coordinated enter/exit.
 */

import { motion, AnimatePresence } from "framer-motion";
import { suggestedPrompts } from "~/data/chat-prompts";

interface SuggestedPromptsProps {
  visible: boolean;
  onSelect: (promptText: string, channelId: string) => void;
}

export function SuggestedPrompts({ visible, onSelect }: SuggestedPromptsProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="grid gap-3 sm:grid-cols-3"
        >
          {suggestedPrompts.map((prompt, i) => (
            <motion.button
              key={prompt.channelId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                delay: i * 0.08,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => onSelect(prompt.promptText, prompt.channelId)}
              className="group flex flex-col items-start gap-2 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-gray-300 hover:shadow-md cursor-pointer"
            >
              <span className="text-2xl">{prompt.icon}</span>
              <span className="text-sm font-semibold text-gray-900 group-hover:text-foreground">
                {prompt.label}
              </span>
              <span className="text-xs leading-relaxed text-gray-500">
                {prompt.description}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
