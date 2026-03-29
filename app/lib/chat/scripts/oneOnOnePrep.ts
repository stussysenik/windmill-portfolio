/**
 * 1:1 prep demo script.
 *
 * Simulates the AI preparing an agenda for the user's next 1:1 meeting
 * with their manager. Demonstrates: action items card with priority badges
 * and interactive checkboxes.
 */

import type { StreamScript } from "~/lib/chat/streamSimulator";

export const oneOnOnePrepScript: StreamScript = {
  initialDelay: 600,
  text: "I've prepared your 1:1 agenda based on recent activity. There are a few things worth discussing — a blocker on the payments migration, positive peer feedback to share, and a career growth topic you mentioned in Slack last week.",
  richContent: [
    {
      type: "source-attribution",
      sources: [
        { type: "jira", label: "Jira blockers", count: 2 },
        { type: "slack", label: "Slack mentions", count: 5 },
        { type: "peer-review", label: "Recent feedback", count: 1 },
      ],
    },
    {
      type: "action-items",
      title: "1:1 Agenda — March 31",
      items: [
        {
          id: "ai-1",
          text: "Discuss the payments migration blocker — awaiting API team's v2 endpoint (blocked 4 days)",
          priority: "high",
          checked: false,
        },
        {
          id: "ai-2",
          text: "Share positive peer review from Sarah on the onboarding flow redesign",
          priority: "medium",
          checked: false,
        },
        {
          id: "ai-3",
          text: "Bring up interest in tech lead track — you mentioned this in #career-growth on March 20",
          priority: "medium",
          checked: false,
        },
        {
          id: "ai-4",
          text: "Review sprint velocity trend — down 15% over last 2 sprints, likely due to context switching",
          priority: "high",
          checked: false,
        },
        {
          id: "ai-5",
          text: "Ask about conference budget for React Summit in June",
          priority: "low",
          checked: false,
        },
      ],
    },
  ],
};
