/**
 * SourceAttribution card — shows which data sources the AI consulted.
 *
 * Renders a row of chips, each showing a source icon, count, and label.
 * Staggered entrance animation (60ms per chip) gives a satisfying cascade.
 *
 * Trust signal: lets users verify the AI's response is grounded in real data.
 */

import { motion } from "framer-motion";
import {
  TicketCheck,
  GitPullRequest,
  MessageSquare,
  FileText,
  PenTool,
  Users,
} from "lucide-react";
import { cn } from "~/lib/cn";
import type { SourceInfo } from "~/types/chat";

/** Map source types to icons and colors. */
const sourceConfig: Record<
  SourceInfo["type"],
  { icon: typeof TicketCheck; color: string }
> = {
  jira: { icon: TicketCheck, color: "text-blue-600 bg-blue-50" },
  github: { icon: GitPullRequest, color: "text-purple-600 bg-purple-50" },
  slack: { icon: MessageSquare, color: "text-green-600 bg-green-50" },
  "google-docs": { icon: FileText, color: "text-amber-600 bg-amber-50" },
  figma: { icon: PenTool, color: "text-pink-600 bg-pink-50" },
  "peer-review": { icon: Users, color: "text-indigo-600 bg-indigo-50" },
};

interface SourceAttributionProps {
  sources: SourceInfo[];
}

export function SourceAttribution({ sources }: SourceAttributionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3"
    >
      <p className="mb-2.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
        Based on
      </p>
      <div className="flex flex-wrap gap-2">
        {sources.map((source, i) => {
          const config = sourceConfig[source.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={source.type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.06,
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium",
                config.color
              )}
            >
              <Icon size={13} />
              <span className="font-semibold">{source.count}</span>
              <span className="opacity-75">{source.label}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
