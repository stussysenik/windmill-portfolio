/**
 * Chat type definitions.
 *
 * These interfaces model the full data shape for the Slack-inspired
 * AI chat prototype. The design supports:
 * - Multi-channel conversations (like Slack channels)
 * - Streaming message simulation (word-by-word)
 * - Rich content cards (review drafts, action items, source attribution)
 * - Trust signals (confidence scores, source counts)
 */

/** Who sent the message — the human user or the AI assistant. */
export type MessageRole = "user" | "assistant";

/**
 * Message lifecycle status.
 * - sending: user message in transit (brief optimistic state)
 * - streaming: assistant is "typing" — text arrives word by word
 * - complete: message fully delivered
 * - error: something went wrong (unused in demo, here for completeness)
 */
export type MessageStatus = "sending" | "streaming" | "complete" | "error";

/**
 * A data source the AI "consulted" when generating a response.
 * Rendered as chips in the SourceAttribution card.
 */
export interface SourceInfo {
  type: "jira" | "github" | "slack" | "google-docs" | "figma" | "peer-review";
  label: string;
  count: number;
}

/**
 * One section of a performance review draft.
 * Each section has a heading, prose content, optional star rating (1-5),
 * and an optional confidence percentage (0-100).
 */
export interface ReviewSection {
  heading: string;
  content: string;
  rating?: number;
  confidence?: number;
}

/**
 * A single actionable task with priority and completion state.
 */
export interface ActionItem {
  id: string;
  text: string;
  priority: "high" | "medium" | "low";
  checked: boolean;
}

/**
 * Rich content block attached to a message.
 * After the streamed text completes, one or more of these cards
 * appear below the message bubble.
 */
export interface RichContent {
  type: "review-draft" | "action-items" | "source-attribution";
  title?: string;
  sections?: ReviewSection[];
  items?: ActionItem[];
  sources?: SourceInfo[];
}

/**
 * A single chat message in the conversation thread.
 */
export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  richContent?: RichContent[];
  timestamp: Date;
  status: MessageStatus;
}

/**
 * A chat channel — analogous to a Slack channel.
 */
export interface ChatChannel {
  id: string;
  name: string;
  icon: string;
  description: string;
}
