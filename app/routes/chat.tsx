import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Sparkles,
  User,
  RotateCcw,
} from "lucide-react";
import { cn } from "~/lib/cn";
import { Button } from "~/components/ui/Button";

/**
 * Chat page -- a standalone AI demo page outside the marketing layout.
 *
 * This is a prototype chat interface that simulates an AI assistant
 * helping with performance reviews. It uses canned responses (no API
 * calls) to demonstrate the UI and interaction patterns.
 *
 * Architecture:
 * - Full-viewport layout with a sidebar-style header and bottom input.
 * - Messages animate in with framer-motion.
 * - The "AI" responds with a simulated typing delay.
 */
export function meta() {
  return [
    { title: "AI Demo -- Windmill" },
    {
      name: "description",
      content:
        "Try Windmill's AI-powered review assistant. See how AI can draft performance reviews in seconds.",
    },
  ];
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/** Canned AI responses for the demo. */
const cannedResponses = [
  "Great question! Based on the performance data I've analyzed, here are my key observations:\n\n1. **Consistent delivery** -- They shipped 12 features this quarter, up from 8 last quarter.\n2. **Cross-team collaboration** -- Multiple peers highlighted their mentorship of junior engineers.\n3. **Growth area** -- Documentation could be more thorough. Consider suggesting a structured template.\n\nWould you like me to draft a full review based on these insights?",
  "Here's a draft review section for technical execution:\n\n*\"This quarter demonstrated significant growth in both the quality and velocity of technical contributions. The migration to the new API layer was completed ahead of schedule, reducing latency by 40%. Code review feedback from peers consistently highlights clean, well-documented PRs.\"*\n\nWant me to adjust the tone or add specific examples?",
  "I've analyzed the 360-feedback from 6 respondents. Here's the summary:\n\n- **Strengths**: Communication, technical depth, reliability\n- **Development areas**: Delegation (mentioned by 3 respondents), strategic thinking\n- **Sentiment**: Overwhelmingly positive -- 92% positive keyword ratio\n\nThe feedback suggests a strong IC who's ready for more leadership responsibility. Shall I incorporate this into the review draft?",
  "Absolutely! Here are some suggested goals for next quarter:\n\n1. **Lead a cross-team initiative** -- To develop delegation and strategic thinking skills\n2. **Mentor 2 junior engineers** -- Building on existing strengths\n3. **Publish internal tech talk** -- Sharing knowledge more broadly\n4. **Improve documentation practices** -- Address the growth area from this cycle\n\nEach goal follows the SMART framework. Want me to add measurable criteria?",
];

/** Suggested starter prompts. */
const suggestions = [
  "Summarize this person's performance data",
  "Draft a review for a senior engineer",
  "Analyze the 360-feedback results",
  "Suggest goals for next quarter",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: cannedResponses[responseIndex % cannedResponses.length],
      };
      setMessages((prev) => [...prev, aiMessage]);
      setResponseIndex((prev) => prev + 1);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setResponseIndex(0);
    setIsTyping(false);
    setInput("");
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to site</span>
          </Link>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold font-display">
              Windmill AI Assistant
            </span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Demo
            </span>
          </div>
        </div>

        <button
          onClick={resetChat}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </header>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          /* Empty state */
          <div className="flex h-full items-center justify-center p-6">
            <div className="max-w-lg text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <Sparkles size={24} className="text-muted-foreground" />
              </div>
              <h2 className="mt-5 display-headline-2 text-2xl">
                Try Windmill AI
              </h2>
              <p className="mt-3 text-muted-foreground">
                This is a demo of Windmill's AI review assistant. Ask it to
                analyze performance data, draft reviews, or suggest goals.
              </p>

              {/* Suggestion chips */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:shadow-card transition-all cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Message list */
          <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground">
                      <Sparkles size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-foreground text-white"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdown(msg.content),
                        }}
                      />
                    ) : (
                      msg.content
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <User size={14} className="text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-white p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-3 rounded-2xl border border-border bg-background p-2 shadow-card focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 transition-shadow">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about performance reviews..."
              rows={1}
              className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors cursor-pointer",
                input.trim() && !isTyping
                  ? "bg-foreground text-white hover:bg-foreground/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            This is a demo with pre-written responses. No data is sent to any API.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal markdown formatter for the demo.
 *
 * Handles bold (**text**), italic (*text*), newlines, and numbered lists.
 * A real implementation would use a proper markdown parser like remark.
 */
function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br />")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}
