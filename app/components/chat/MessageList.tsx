/**
 * MessageList — scrollable container for all messages in a channel.
 *
 * Key behaviors:
 * - Auto-scrolls to bottom when new messages arrive, BUT only if the user
 *   is already near the bottom (within 100px). This prevents jarring scroll
 *   jumps when the user is reading earlier messages.
 * - Renders WelcomeMessage at the top of every channel
 * - Shows SuggestedPrompts when the channel has no messages
 * - Shows TypingIndicator during streaming
 * - Uses refs for scroll management
 */

import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import type { ChatMessage } from "~/types/chat";
import { MessageBubble } from "~/components/chat/MessageBubble";
import { TypingIndicator } from "~/components/chat/TypingIndicator";
import { WelcomeMessage } from "~/components/chat/WelcomeMessage";
import { SuggestedPrompts } from "~/components/chat/SuggestedPrompts";

interface MessageListProps {
  messages: ChatMessage[];
  isStreaming: boolean;
  showSuggestedPrompts: boolean;
  onSelectPrompt: (promptText: string, channelId: string) => void;
}

export function MessageList({
  messages,
  isStreaming,
  showSuggestedPrompts,
  onSelectPrompt,
}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  /**
   * Smart auto-scroll: only scroll to bottom if the user is already
   * near the bottom of the container (within 100px threshold).
   */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const isNearBottom = distanceFromBottom < 100;

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isStreaming]);

  // Determine if we should show the typing indicator:
  // When streaming but the last message is still accumulating text,
  // we only show the typing indicator before the streaming message appears.
  const lastMessage = messages[messages.length - 1];
  const showTypingIndicator =
    isStreaming && (!lastMessage || lastMessage.status !== "streaming");

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto"
    >
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-6">
        {/* Welcome message — always shown at the top */}
        <WelcomeMessage />

        {/* Suggested prompts — shown when channel is empty */}
        {messages.length === 0 && (
          <div className="pt-2">
            <SuggestedPrompts
              visible={showSuggestedPrompts}
              onSelect={onSelectPrompt}
            />
          </div>
        )}

        {/* Message thread */}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {showTypingIndicator && <TypingIndicator />}
        </AnimatePresence>

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
