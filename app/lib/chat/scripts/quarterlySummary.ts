/**
 * Quarterly summary demo script.
 *
 * Simulates the AI generating a high-level Q1 accomplishment summary
 * with quantitative metrics. Demonstrates: source attribution + review
 * draft with a metrics-heavy format.
 */

import type { StreamScript } from "~/lib/chat/streamSimulator";

export const quarterlySummaryScript: StreamScript = {
  initialDelay: 1000,
  text: "Here's your Q1 2026 summary. I've aggregated data across your tools to surface the key wins, metrics, and areas to highlight in your next review conversation. The confidence scores reflect how well-supported each claim is by the underlying data.",
  richContent: [
    {
      type: "source-attribution",
      sources: [
        { type: "jira", label: "Jira epics", count: 4 },
        { type: "github", label: "GitHub PRs", count: 23 },
        { type: "slack", label: "Slack kudos", count: 7 },
        { type: "google-docs", label: "Design docs", count: 3 },
        { type: "figma", label: "Figma files", count: 2 },
      ],
    },
    {
      type: "review-draft",
      title: "Q1 2026 Accomplishments",
      sections: [
        {
          heading: "Delivery & Velocity",
          content:
            "Closed 47 tickets across 4 epics. Average cycle time dropped from 5.2 days to 3.1 days (40% improvement). Zero P0 incidents in production. Shipped the new dashboard ahead of the March 15 deadline.",
          rating: 5,
          confidence: 95,
        },
        {
          heading: "Technical Leadership",
          content:
            "Authored 3 design docs adopted by the platform team. Introduced structured logging standards now used by 6 services. Led the RFC process for the event-driven architecture migration.",
          rating: 4,
          confidence: 82,
        },
        {
          heading: "Team & Culture",
          content:
            "Received 7 Slack kudos from 5 different teammates. Ran 2 internal workshops on testing best practices. Onboarded 1 new hire with a 30-60-90 plan that's now a team template.",
          rating: 4,
          confidence: 90,
        },
      ],
    },
  ],
};
