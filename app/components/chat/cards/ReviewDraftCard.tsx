/**
 * ReviewDraftCard — a structured performance review draft card.
 *
 * Renders a titled card with multiple review sections. Each section has:
 * - A heading (e.g. "Technical Execution")
 * - Prose content summarizing performance
 * - Optional star rating (1-5 filled stars)
 * - Optional confidence bar with color coding:
 *     emerald (80-100%), amber (60-79%), orange (<60%)
 * - An edit button (visual-only in the demo)
 *
 * The card uses smooth entrance animation and each section staggers in.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Star } from "lucide-react";
import { cn } from "~/lib/cn";
import type { ReviewSection } from "~/types/chat";

interface ReviewDraftCardProps {
  title: string;
  sections: ReviewSection[];
}

/** Returns the Tailwind color classes for a confidence value. */
function confidenceColor(confidence: number): string {
  if (confidence >= 80) return "bg-emerald-500";
  if (confidence >= 60) return "bg-amber-500";
  return "bg-orange-500";
}

function confidenceTextColor(confidence: number): string {
  if (confidence >= 80) return "text-emerald-700";
  if (confidence >= 60) return "text-amber-700";
  return "text-orange-700";
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          className={cn(
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-none text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-gray-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className={cn("h-full rounded-full", confidenceColor(confidence))}
        />
      </div>
      <span className={cn("text-xs font-medium", confidenceTextColor(confidence))}>
        {confidence}%
      </span>
    </div>
  );
}

export function ReviewDraftCard({ title, sections }: ReviewDraftCardProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Title bar */}
      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>

      {/* Sections */}
      <div className="divide-y divide-gray-100">
        {sections.map((section, i) => (
          <motion.div
            key={section.heading}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.1 + i * 0.08,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group px-4 py-3.5"
          >
            {/* Section header row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h4 className="text-sm font-medium text-gray-900">
                  {section.heading}
                </h4>
                {section.rating !== undefined && (
                  <StarRating rating={section.rating} />
                )}
              </div>
              <div className="flex items-center gap-3">
                {section.confidence !== undefined && (
                  <ConfidenceBar confidence={section.confidence} />
                )}
                <button
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === section.heading
                        ? null
                        : section.heading
                    )
                  }
                  className="rounded-md p-1 text-gray-400 opacity-0 transition-opacity hover:bg-gray-100 hover:text-gray-600 group-hover:opacity-100 cursor-pointer"
                  aria-label={`Edit ${section.heading}`}
                >
                  <Pencil size={13} />
                </button>
              </div>
            </div>

            {/* Section content */}
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
