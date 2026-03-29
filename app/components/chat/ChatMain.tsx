/**
 * ChatMain — the right-hand panel containing header, messages, and input.
 *
 * This component composes ChatHeader, MessageList, and ChatInput into a
 * single flex column that fills the remaining space after the sidebar.
 */

import type { ChatMessage } from "~/types/chat";
import type { Channel } from "~/data/chat-prompts";
import { ChatHeader } from "~/components/chat/ChatHeader";
import { MessageList } from "~/components/chat/MessageList";
import { ChatInput } from "~/components/chat/ChatInput";

interface ChatMainProps {
  channel: Channel;
  messages: ChatMessage[];
  isStreaming: boolean;
  showSuggestedPrompts: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onSelectPrompt: (promptText: string, channelId: string) => void;
  onToggleSidebar: () => void;
}

export function ChatMain({
  channel,
  messages,
  isStreaming,
  showSuggestedPrompts,
  inputValue,
  onInputChange,
  onSend,
  onSelectPrompt,
  onToggleSidebar,
}: ChatMainProps) {
  return (
    <div className="flex flex-1 flex-col bg-gray-50 min-w-0">
      <ChatHeader channel={channel} onToggleSidebar={onToggleSidebar} />
      <MessageList
        messages={messages}
        isStreaming={isStreaming}
        showSuggestedPrompts={showSuggestedPrompts}
        onSelectPrompt={onSelectPrompt}
      />
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSend}
        disabled={isStreaming}
      />
    </div>
  );
}
