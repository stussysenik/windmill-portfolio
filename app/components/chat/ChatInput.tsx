/**
 * ChatInput — auto-growing textarea with send button.
 *
 * Features:
 * - Auto-resizes from 1 row to max 4 rows as the user types
 * - Enter sends the message; Shift+Enter inserts a newline
 * - Send button is disabled when input is empty or AI is streaming
 * - Placeholder: "Message Windy..."
 */

import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "~/lib/cn";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /** Auto-resize the textarea to fit its content (max 4 rows). */
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    // Max height ~ 4 rows at text-sm line-height (roughly 96px)
    textarea.style.height = `${Math.min(textarea.scrollHeight, 96)}px`;
  }, [value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  }

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 transition-shadow focus-within:border-gray-300 focus-within:bg-white focus-within:shadow-sm focus-within:ring-1 focus-within:ring-gray-200">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Windy..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm leading-relaxed text-gray-800 outline-none placeholder:text-gray-400"
          />
          <button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all cursor-pointer",
              value.trim() && !disabled
                ? "bg-foreground text-white hover:bg-foreground/90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            <Send size={14} />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-gray-400">
          Demo mode — responses are pre-written. No data is sent to any API.
        </p>
      </div>
    </div>
  );
}
