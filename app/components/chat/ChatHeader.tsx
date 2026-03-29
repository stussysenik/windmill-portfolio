/**
 * ChatHeader — top bar showing the active channel and navigation.
 *
 * Displays:
 * - Back arrow link to the homepage
 * - Channel icon + name + description
 * - "Windmill" branding on the right
 * - Mobile menu button to toggle the sidebar
 */

import { Link } from "react-router";
import { ArrowLeft, Menu, Sparkles } from "lucide-react";
import { cn } from "~/lib/cn";
import type { Channel } from "~/data/chat-prompts";

interface ChatHeaderProps {
  channel: Channel;
  onToggleSidebar: () => void;
}

export function ChatHeader({ channel, onToggleSidebar }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        {/* Mobile sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Back</span>
        </Link>

        <div className="h-5 w-px bg-gray-200" />

        {/* Channel info */}
        <div className="flex items-center gap-2">
          <span className="text-lg">{channel.icon}</span>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              #{channel.name}
            </h1>
            <p className="hidden text-xs text-gray-500 sm:block">
              {channel.description}
            </p>
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="hidden items-center gap-2 sm:flex">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground">
          <Sparkles size={12} className="text-white" />
        </div>
        <span className="text-xs font-semibold text-gray-500">
          Windmill AI
        </span>
      </div>
    </header>
  );
}
