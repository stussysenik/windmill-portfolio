/**
 * Chat state reducer — pure function managing all chat state transitions.
 *
 * Uses the useReducer pattern for predictable state updates.
 * Messages are keyed by channel ID so each channel has its own thread.
 *
 * State shape:
 * - activeChannelId: which channel is currently visible
 * - messages: Record<channelId, ChatMessage[]>
 * - isStreaming: whether an AI response is currently being streamed
 * - showSuggestedPrompts: whether to show the starter prompt cards
 */

import type { ChatMessage, RichContent } from "~/types/chat";

export interface ChatState {
  activeChannelId: string;
  messages: Record<string, ChatMessage[]>;
  isStreaming: boolean;
  showSuggestedPrompts: boolean;
}

export type ChatAction =
  | { type: "SELECT_CHANNEL"; channelId: string }
  | { type: "ADD_USER_MESSAGE"; channelId: string; message: ChatMessage }
  | { type: "START_STREAMING"; channelId: string; messageId: string }
  | { type: "APPEND_STREAM"; channelId: string; messageId: string; text: string }
  | { type: "COMPLETE_STREAM"; channelId: string; messageId: string; richContent?: RichContent[] }
  | { type: "HIDE_PROMPTS" }
  | { type: "SHOW_PROMPTS" };

/**
 * Helper to find and update a specific message within a channel's message array.
 * Returns a new array (immutable update).
 */
function updateMessage(
  messages: ChatMessage[],
  messageId: string,
  updater: (msg: ChatMessage) => ChatMessage
): ChatMessage[] {
  return messages.map((msg) =>
    msg.id === messageId ? updater(msg) : msg
  );
}

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SELECT_CHANNEL":
      return {
        ...state,
        activeChannelId: action.channelId,
        // Show prompts if the selected channel has no messages yet
        showSuggestedPrompts: !(state.messages[action.channelId]?.length > 0),
      };

    case "ADD_USER_MESSAGE": {
      const channelMessages = state.messages[action.channelId] ?? [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.channelId]: [...channelMessages, action.message],
        },
        showSuggestedPrompts: false,
      };
    }

    case "START_STREAMING": {
      const channelMessages = state.messages[action.channelId] ?? [];
      const streamingMessage: ChatMessage = {
        id: action.messageId,
        role: "assistant",
        text: "",
        timestamp: new Date(),
        status: "streaming",
      };
      return {
        ...state,
        isStreaming: true,
        messages: {
          ...state.messages,
          [action.channelId]: [...channelMessages, streamingMessage],
        },
      };
    }

    case "APPEND_STREAM": {
      const channelMessages = state.messages[action.channelId] ?? [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.channelId]: updateMessage(
            channelMessages,
            action.messageId,
            (msg) => ({ ...msg, text: msg.text + action.text })
          ),
        },
      };
    }

    case "COMPLETE_STREAM": {
      const channelMessages = state.messages[action.channelId] ?? [];
      return {
        ...state,
        isStreaming: false,
        messages: {
          ...state.messages,
          [action.channelId]: updateMessage(
            channelMessages,
            action.messageId,
            (msg) => ({
              ...msg,
              status: "complete" as const,
              richContent: action.richContent,
            })
          ),
        },
      };
    }

    case "HIDE_PROMPTS":
      return { ...state, showSuggestedPrompts: false };

    case "SHOW_PROMPTS":
      return { ...state, showSuggestedPrompts: true };

    default:
      return state;
  }
}

/** Create initial state with a given default channel. */
export function createInitialState(defaultChannelId: string): ChatState {
  return {
    activeChannelId: defaultChannelId,
    messages: {},
    isStreaming: false,
    showSuggestedPrompts: true,
  };
}
