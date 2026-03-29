/**
 * ChatSidebar — dark Slack-inspired sidebar with channel list.
 *
 * Features:
 * - Dark background (#1a1d21) matching Slack's dark theme
 * - Windmill logo/branding at top
 * - 3 channel items with active channel highlighting
 * - "Demo Mode" badge at bottom
 * - Hidden on mobile, shown at lg breakpoint via CSS + overlay on mobile toggle
 */

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Hash, X } from "lucide-react";
import { cn } from "~/lib/cn";
import { channels } from "~/data/chat-prompts";

interface ChatSidebarProps {
  activeChannelId: string;
  onSelectChannel: (channelId: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function ChatSidebar({
  activeChannelId,
  onSelectChannel,
  mobileOpen,
  onCloseMobile,
}: ChatSidebarProps) {
  const sidebarContent = (
    <div className="flex h-full w-64 flex-col bg-[#1a1d21] text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold leading-tight">Talk to Windy</h2>
            <p className="text-[11px] text-white/50">AI Performance Assistant</p>
          </div>
        </div>

        {/* Close button — mobile only */}
        <button
          onClick={onCloseMobile}
          className="rounded-md p-1 text-white/50 hover:bg-white/10 hover:text-white lg:hidden cursor-pointer"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Channels section */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
          Channels
        </p>
        <nav className="flex flex-col gap-0.5">
          {channels.map((channel) => {
            const isActive = channel.id === activeChannelId;
            return (
              <button
                key={channel.id}
                onClick={() => {
                  onSelectChannel(channel.id);
                  onCloseMobile();
                }}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors cursor-pointer",
                  isActive
                    ? "bg-white/15 text-white font-medium"
                    : "text-white/60 hover:bg-white/10 hover:text-white/90"
                )}
              >
                <Hash size={14} className="shrink-0 opacity-60" />
                <span className="truncate">{channel.name}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-green-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer — demo badge */}
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-white/60">Demo Mode</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — always visible at lg+ */}
      <div className="hidden lg:flex">{sidebarContent}</div>

      {/* Mobile sidebar — overlay with backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
            {/* Slide-in panel */}
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
