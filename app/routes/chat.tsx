/**
 * Chat route — "Talk to Windy" AI chat prototype.
 *
 * A standalone full-screen chat interface (outside the _marketing layout)
 * demonstrating conversational AI patterns for performance reviews.
 *
 * Architecture:
 * - useReducer for state management (chatReducer)
 * - useSearchParams for persisting active channel in the URL
 * - createStreamSimulator for word-by-word text streaming
 * - 3 demo channels with pre-written scripts
 * - Rich content cards (review drafts, action items, source attribution)
 * - Slack-inspired dark sidebar + light message area
 *
 * No API calls — everything runs client-side with simulated streaming.
 */

import { useReducer, useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import { chatReducer, createInitialState } from "~/lib/chat/chatReducer";
import { createStreamSimulator } from "~/lib/chat/streamSimulator";
import type { StreamScript } from "~/lib/chat/streamSimulator";
import type { ChatMessage, RichContent } from "~/types/chat";
import { channels } from "~/data/chat-prompts";
import { ChatSidebar } from "~/components/chat/ChatSidebar";
import { ChatMain } from "~/components/chat/ChatMain";

// Demo scripts — one per channel
import { selfReviewScript } from "~/lib/chat/scripts/selfReview";
import { oneOnOnePrepScript } from "~/lib/chat/scripts/oneOnOnePrep";
import { quarterlySummaryScript } from "~/lib/chat/scripts/quarterlySummary";

/**
 * Route meta — sets the page title and description for this standalone page.
 */
export function meta() {
  return [
    { title: "Talk to Windy — AI Chat Demo" },
    {
      name: "description",
      content:
        "Try Windmill's AI performance assistant. Draft self-reviews, prep 1:1s, and summarize your quarter — all in a Slack-inspired chat interface.",
    },
  ];
}

/** Map channel IDs to their pre-written demo scripts. */
const scriptsByChannel: Record<string, StreamScript> = {
  "self-review": selfReviewScript,
  "1-on-1-prep": oneOnOnePrepScript,
  "quarterly-summary": quarterlySummaryScript,
};

const DEFAULT_CHANNEL = "self-review";

export default function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialChannel = searchParams.get("channel") ?? DEFAULT_CHANNEL;

  const [state, dispatch] = useReducer(
    chatReducer,
    initialChannel,
    createInitialState
  );
  const [inputValue, setInputValue] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Track the active stream so we can abort on channel switch
  const activeStreamRef = useRef<{ abort: () => void } | null>(null);

  // Track whether a script has been used per channel (demo plays only once)
  const usedScriptsRef = useRef<Set<string>>(new Set());

  /** Get the active channel object. */
  const activeChannel =
    channels.find((c) => c.id === state.activeChannelId) ?? channels[0];

  /** Get messages for the active channel. */
  const activeMessages = state.messages[state.activeChannelId] ?? [];

  /**
   * Run the streaming simulation for a given channel's script.
   * Creates an assistant message, streams text into it word by word,
   * then reveals rich content cards.
   */
  const runStream = useCallback(
    (channelId: string) => {
      const script = scriptsByChannel[channelId];
      if (!script) return;

      // Mark this channel's script as used
      usedScriptsRef.current.add(channelId);

      const messageId = `assistant-${Date.now()}`;

      // Create the empty streaming message
      dispatch({ type: "START_STREAMING", channelId, messageId });

      const sim = createStreamSimulator(
        script,
        // onChunk — append streamed text
        (text: string) => {
          dispatch({ type: "APPEND_STREAM", channelId, messageId, text });
        },
        // onRichContent — attach rich cards
        (content: RichContent[]) => {
          dispatch({
            type: "COMPLETE_STREAM",
            channelId,
            messageId,
            richContent: content,
          });
        },
        // onComplete — mark streaming finished (if no rich content)
        () => {
          dispatch({ type: "COMPLETE_STREAM", channelId, messageId });
        }
      );

      activeStreamRef.current = sim;
      sim.start();
    },
    [dispatch]
  );

  /** Handle sending a message (from input or suggested prompt). */
  const sendMessage = useCallback(
    (text: string, targetChannelId?: string) => {
      const trimmed = text.trim();
      if (!trimmed || state.isStreaming) return;

      const channelId = targetChannelId ?? state.activeChannelId;

      // If switching channels via prompt selection, update the active channel
      if (targetChannelId && targetChannelId !== state.activeChannelId) {
        dispatch({ type: "SELECT_CHANNEL", channelId: targetChannelId });
        setSearchParams({ channel: targetChannelId });
      }

      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        text: trimmed,
        timestamp: new Date(),
        status: "complete",
      };

      dispatch({ type: "ADD_USER_MESSAGE", channelId, message: userMessage });
      setInputValue("");

      // Run the demo script if it hasn't been used yet for this channel
      if (!usedScriptsRef.current.has(channelId)) {
        runStream(channelId);
      } else {
        // Fallback: a generic response for subsequent messages
        const fallbackId = `assistant-${Date.now() + 1}`;
        dispatch({
          type: "START_STREAMING",
          channelId,
          messageId: fallbackId,
        });

        // Simple fallback stream
        const fallbackScript: StreamScript = {
          initialDelay: 600,
          text: "Thanks for the follow-up! In a production environment, I'd refine the draft based on your feedback. For this demo, try switching to a different channel to see another scenario.",
        };

        const sim = createStreamSimulator(
          fallbackScript,
          (chunk) =>
            dispatch({
              type: "APPEND_STREAM",
              channelId,
              messageId: fallbackId,
              text: chunk,
            }),
          () => {
            dispatch({
              type: "COMPLETE_STREAM",
              channelId,
              messageId: fallbackId,
            });
          },
          () => {
            dispatch({
              type: "COMPLETE_STREAM",
              channelId,
              messageId: fallbackId,
            });
          }
        );

        activeStreamRef.current = sim;
        sim.start();
      }
    },
    [state.activeChannelId, state.isStreaming, runStream, setSearchParams]
  );

  /** Handle channel selection from sidebar. */
  const handleSelectChannel = useCallback(
    (channelId: string) => {
      if (channelId === state.activeChannelId) return;

      // Abort any running stream
      activeStreamRef.current?.abort();

      dispatch({ type: "SELECT_CHANNEL", channelId });
      setSearchParams({ channel: channelId });
    },
    [state.activeChannelId, setSearchParams]
  );

  /** Handle suggested prompt selection. */
  const handleSelectPrompt = useCallback(
    (promptText: string, channelId: string) => {
      sendMessage(promptText, channelId);
    },
    [sendMessage]
  );

  /** Handle send from input. */
  const handleSend = useCallback(() => {
    sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      activeStreamRef.current?.abort();
    };
  }, []);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <ChatSidebar
        activeChannelId={state.activeChannelId}
        onSelectChannel={handleSelectChannel}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />
      <ChatMain
        channel={activeChannel}
        messages={activeMessages}
        isStreaming={state.isStreaming}
        showSuggestedPrompts={state.showSuggestedPrompts}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSend={handleSend}
        onSelectPrompt={handleSelectPrompt}
        onToggleSidebar={() => setMobileSidebarOpen(true)}
      />
    </div>
  );
}
