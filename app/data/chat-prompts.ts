export interface ChatPrompt {
  icon: string; // emoji
  label: string;
  description: string;
  promptText: string;
  channelId: string;
}

export interface Channel {
  id: string;
  name: string;
  icon: string; // emoji
  description: string;
}

export const suggestedPrompts: ChatPrompt[] = [
  {
    icon: "✨",
    label: "Write my self-review",
    description: "Draft a self-review based on my work this quarter",
    promptText: "Draft a self-review based on my work this quarter",
    channelId: "self-review",
  },
  {
    icon: "📅",
    label: "Prep my 1:1 agenda",
    description: "Create talking points for my next 1:1 with my manager",
    promptText: "Create talking points for my next 1:1 with my manager",
    channelId: "1-on-1-prep",
  },
  {
    icon: "📊",
    label: "Summarize my quarter",
    description: "Summarize my key accomplishments and metrics from Q1",
    promptText: "Summarize my key accomplishments and metrics from Q1",
    channelId: "quarterly-summary",
  },
];

export const channels: Channel[] = [
  {
    id: "self-review",
    name: "self-review",
    icon: "✨",
    description: "Draft and refine your self-review",
  },
  {
    id: "1-on-1-prep",
    name: "1-on-1-prep",
    icon: "📅",
    description: "Prepare for your next 1:1 meeting",
  },
  {
    id: "quarterly-summary",
    name: "quarterly-summary",
    icon: "📊",
    description: "Review your quarterly achievements",
  },
];
