export interface Testimonial {
  id: number;
  text: string;
  highlight?: string; // phrase to highlight with brush stroke
  highlightColor: string; // one of the highlight colors
}

/**
 * Highlight color palette from the original Windmill site.
 * Each color is a soft pastel used as the background for
 * the brush-stroke highlight on the marquee testimonials.
 */
export const highlightColors = {
  pink: "#f0d1dc",
  yellow: "#f4ecb3",
  blue: "#cbe6ff",
  green: "#d8e5d1",
  rose: "#fadce5",
  peach: "#f8e2ca",
  red: "#fecaca",
  purple: "#e2d4ef",
  sage: "#d2dfc1",
} as const;

export type HighlightColorKey = keyof typeof highlightColors;

export const testimonials: Testimonial[] = [
  // ── Row 1 ──────────────────────────────────────────────
  {
    id: 1,
    text: "Self-assessment was quick and easy compared to last year.",
    highlight: "quick and easy",
    highlightColor: highlightColors.yellow,
  },
  {
    id: 2,
    text: "Windy feels like having a little assistant guiding the review process.",
    highlight: "little assistant",
    highlightColor: highlightColors.blue,
  },
  {
    id: 3,
    text: "Easy, clear, and chatting in Slack sped things up.",
    highlight: "sped things up",
    highlightColor: highlightColors.green,
  },
  {
    id: 4,
    text: "Windy was extremely helpful recapping key moments.",
    highlight: "extremely helpful",
    highlightColor: highlightColors.peach,
  },
  {
    id: 5,
    text: "Windy drafts were accurate\u2014just needed slight tweaks.",
    highlight: "accurate",
    highlightColor: highlightColors.pink,
  },
  {
    id: 6,
    text: "Much smoother than 15Five.",
    highlight: "Much smoother",
    highlightColor: highlightColors.green,
  },

  // ── Row 2 ──────────────────────────────────────────────
  {
    id: 7,
    text: "Way better than previous review tools.",
    highlight: "Way better",
    highlightColor: highlightColors.rose,
  },
  {
    id: 8,
    text: "Layouts made reviews transparent and easy.",
    highlight: "transparent and easy",
    highlightColor: highlightColors.blue,
  },
  {
    id: 9,
    text: "Instructions were clear and intuitive.",
    highlight: "clear and intuitive",
    highlightColor: highlightColors.purple,
  },
  {
    id: 10,
    text: "Review conversations felt natural and engaging.",
    highlight: "natural and engaging",
    highlightColor: highlightColors.yellow,
  },
  {
    id: 11,
    text: "A half a day\u2019s work can now be done in 30 minutes.",
    highlight: "30 minutes",
    highlightColor: highlightColors.peach,
  },

  // ── Row 3 ──────────────────────────────────────────────
  {
    id: 12,
    text: "Record-speed without losing precision.",
    highlight: "Record-speed",
    highlightColor: highlightColors.red,
  },
  {
    id: 13,
    text: "Windy made performance reviews painless.",
    highlight: "painless",
    highlightColor: highlightColors.sage,
  },
  {
    id: 14,
    text: "I finished my review in minutes instead of hours.",
    highlight: "minutes instead of hours",
    highlightColor: highlightColors.rose,
  },
  {
    id: 15,
    text: "The process was smoother and less time-consuming.",
    highlight: "smoother and less time-consuming",
    highlightColor: highlightColors.blue,
  },
  {
    id: 16,
    text: "Summaries from Windy were spot on and useful.",
    highlight: "spot on",
    highlightColor: highlightColors.pink,
  },
  {
    id: 17,
    text: "Windy reminded me of accomplishments I\u2019d forgotten.",
    highlightColor: highlightColors.yellow,
  },

  // ── Row 4 ──────────────────────────────────────────────
  {
    id: 18,
    text: "Windy saved me half a day per review.",
    highlight: "half a day",
    highlightColor: highlightColors.purple,
  },
  {
    id: 19,
    text: "Windy is much better than 15Five\u2014love it.",
    highlight: "love it",
    highlightColor: highlightColors.red,
  },
  {
    id: 20,
    text: "Best review experience I\u2019ve had so far.",
    highlight: "Best review",
    highlightColor: highlightColors.green,
  },
  {
    id: 21,
    text: "Review cycle was quick and efficient with Windy.",
    highlight: "quick and efficient",
    highlightColor: highlightColors.peach,
  },
  {
    id: 22,
    text: "Windy helped me track achievements effortlessly.",
    highlight: "effortlessly",
    highlightColor: highlightColors.sage,
  },

  // ── Row 5 ──────────────────────────────────────────────
  {
    id: 23,
    text: "Seamless and intuitive process.",
    highlight: "Seamless and intuitive",
    highlightColor: highlightColors.pink,
  },
  {
    id: 24,
    text: "The whole process felt lighter and more engaging.",
    highlight: "lighter and more engaging",
    highlightColor: highlightColors.yellow,
  },
  {
    id: 25,
    text: "Windy provided a great starting point for writing.",
    highlight: "great starting point",
    highlightColor: highlightColors.blue,
  },
  {
    id: 26,
    text: "Windy turned a half-day task into 30 minutes.",
    highlight: "30 minutes",
    highlightColor: highlightColors.peach,
  },
  {
    id: 27,
    text: "Windy made feedback transparent and easy.",
    highlight: "transparent and easy",
    highlightColor: highlightColors.rose,
  },
];
