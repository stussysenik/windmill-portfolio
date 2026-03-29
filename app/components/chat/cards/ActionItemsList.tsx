/**
 * ActionItemsList card — interactive checklist with priority badges.
 *
 * Each item has:
 * - A toggleable checkbox (local state only — demo mode)
 * - The action item text
 * - A priority badge: high (red), medium (amber), low (green)
 *
 * Items stagger in with a 60ms delay for a satisfying cascade entrance.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "~/lib/cn";
import type { ActionItem } from "~/types/chat";

const priorityStyles: Record<ActionItem["priority"], string> = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-green-50 text-green-700 border-green-200",
};

interface ActionItemsListProps {
  title?: string;
  items: ActionItem[];
}

export function ActionItemsList({ title, items: initialItems }: ActionItemsListProps) {
  const [items, setItems] = useState(initialItems);

  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Title bar */}
      {title && (
        <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
      )}

      {/* Items */}
      <div className="divide-y divide-gray-100">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.1 + i * 0.06,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-start gap-3 px-4 py-3"
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                "mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-all cursor-pointer",
                item.checked
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-gray-300 bg-white hover:border-gray-400"
              )}
              aria-label={`Toggle ${item.text}`}
            >
              {item.checked && <Check size={11} strokeWidth={3} />}
            </button>

            {/* Text */}
            <span
              className={cn(
                "flex-1 text-sm leading-relaxed transition-colors",
                item.checked
                  ? "text-gray-400 line-through"
                  : "text-gray-700"
              )}
            >
              {item.text}
            </span>

            {/* Priority badge */}
            <span
              className={cn(
                "shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium capitalize",
                priorityStyles[item.priority]
              )}
            >
              {item.priority}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
