/**
 * MessageBubble — renders a single chat message with avatar, metadata,
 * text content, rich content cards, and message actions.
 *
 * Layout:
 * - User messages: blue-tinted bubble, right-aligned feel
 * - Assistant messages: white bubble with APP badge
 * - Streaming messages show a blinking cursor via the .streaming-cursor class
 * - Rich content cards (review drafts, action items, sources) render below text
 * - Copy button appears on completed assistant messages
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, User, Copy, Check } from "lucide-react";
import { cn } from "~/lib/cn";
import type { ChatMessage, RichContent } from "~/types/chat";
import { ReviewDraftCard } from "~/components/chat/cards/ReviewDraftCard";
import { ActionItemsList } from "~/components/chat/cards/ActionItemsList";
import { SourceAttribution } from "~/components/chat/cards/SourceAttribution";

interface MessageBubbleProps {
  message: ChatMessage;
}

/** Format a Date to a short time string (e.g. "2:34 PM"). */
function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/** Render a single rich content block based on its type. */
function RichContentBlock({ content }: { content: RichContent }) {
  switch (content.type) {
    case "source-attribution":
      return content.sources ? (
        <SourceAttribution sources={content.sources} />
      ) : null;

    case "review-draft":
      return content.title && content.sections ? (
        <ReviewDraftCard title={content.title} sections={content.sections} />
      ) : null;

    case "action-items":
      return content.items ? (
        <ActionItemsList title={content.title} items={content.items} />
      ) : null;

    default:
      return null;
  }
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const isStreaming = message.status === "streaming";
  const isComplete = message.status === "complete";

  async function copyText() {
    await navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3"
    >
      {/* Avatar */}
      {isUser ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
          <User size={14} className="text-blue-600" />
        </div>
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground">
          <Sparkles size={14} className="text-white" />
        </div>
      )}

      {/* Content column */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* Name + metadata row */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            {isUser ? "You" : "Windy"}
          </span>
          {!isUser && (
            <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">
              APP
            </span>
          )}
          <span className="text-xs text-gray-400">
            {formatTime(message.timestamp)}
          </span>
        </div>

        {/* Message bubble */}
        <div
          className={cn(
            "max-w-[95%] rounded-xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-tl-sm border border-blue-100 bg-blue-50 text-gray-800"
              : "rounded-tl-sm border border-gray-100 bg-white text-gray-700"
          )}
        >
          {/* Text content — streaming cursor appended when still streaming */}
          {message.text && (
            <p className={cn(isStreaming && message.text && "streaming-cursor")}>
              {message.text}
            </p>
          )}

          {/* Show a blinking cursor even when text is empty during early streaming */}
          {isStreaming && !message.text && (
            <span className="streaming-cursor" />
          )}
        </div>

        {/* Rich content cards — appear after text streaming completes */}
        {isComplete && message.richContent && message.richContent.length > 0 && (
          <div className="mt-2 flex max-w-[95%] flex-col gap-3">
            {message.richContent.map((content, i) => (
              <RichContentBlock key={`${content.type}-${i}`} content={content} />
            ))}
          </div>
        )}

        {/* Copy action on completed assistant messages */}
        {!isUser && isComplete && message.text && (
          <div className="mt-1">
            <button
              onClick={copyText}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
              aria-label="Copy message"
            >
              {copied ? (
                <>
                  <Check size={12} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
