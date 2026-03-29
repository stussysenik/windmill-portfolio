/**
 * Self-review demo script.
 *
 * Simulates an AI drafting a quarterly self-review by pulling data from
 * multiple workplace tools (Jira, GitHub, peer reviews, Slack).
 * Demonstrates: source attribution, review draft card with confidence bars.
 */

import type { StreamScript } from "~/lib/chat/streamSimulator";

export const selfReviewScript: StreamScript = {
  initialDelay: 800,
  text: "Here's a draft self-review based on your work from January through March. I've organized it by your role's key competencies and pulled evidence from your tools. Feel free to edit any section — click the pencil icon to refine the language.",
  richContent: [
    {
      type: "source-attribution",
      sources: [
        { type: "jira", label: "Jira tickets", count: 12 },
        { type: "github", label: "GitHub PRs", count: 8 },
        { type: "peer-review", label: "Peer reviews", count: 3 },
        { type: "slack", label: "Slack threads", count: 2 },
      ],
    },
    {
      type: "review-draft",
      title: "Q1 2026 Self-Review Draft",
      sections: [
        {
          heading: "Technical Execution",
          content:
            "Led the migration of the auth service to edge functions, reducing p99 latency from 340ms to 45ms. Shipped 3 major features with zero rollbacks. Code review turnaround averaged under 4 hours.",
          rating: 4,
          confidence: 92,
        },
        {
          heading: "Collaboration & Impact",
          content:
            "Drove the cross-team API standardization initiative, unifying 4 services under a shared schema. Peer feedback highlights clear communication and proactive knowledge sharing. Mentored 2 junior engineers through their first production deploys.",
          rating: 5,
          confidence: 88,
        },
        {
          heading: "Growth Areas",
          content:
            "Could improve on writing design docs before implementation — 2 of 3 peer reviewers flagged this pattern. Sprint estimation accuracy was 65%, below the team average of 78%. Consider adopting reference-class forecasting.",
          rating: 3,
          confidence: 75,
        },
      ],
    },
  ],
};
