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
    text: "Much smoother than 15Five.",
    highlight: "Much smoother",
    highlightColor: highlightColors.green,
  },
  {
    id: 4,
    text: "A half a day's work can now be done in 30 minutes.",
    highlight: "done in 30 minutes",
    highlightColor: highlightColors.peach,
  },
  {
    id: 5,
    text: "The AI-generated drafts were surprisingly accurate and saved me hours.",
    highlight: "surprisingly accurate",
    highlightColor: highlightColors.pink,
  },
  {
    id: 6,
    text: "Our managers actually look forward to review season now.",
    highlight: "look forward to review season",
    highlightColor: highlightColors.purple,
  },
  {
    id: 7,
    text: "Windmill reduced our review cycle from 6 weeks to 2 weeks.",
    highlight: "6 weeks to 2 weeks",
    highlightColor: highlightColors.rose,
  },
  {
    id: 8,
    text: "The best performance management tool we've ever used.",
    highlight: "best performance management tool",
    highlightColor: highlightColors.yellow,
  },
  {
    id: 9,
    text: "I used to dread writing reviews. Now they practically write themselves.",
    highlight: "write themselves",
    highlightColor: highlightColors.sage,
  },
  {
    id: 10,
    text: "It pulls context from Jira and Slack so I don't have to remember everything.",
    highlight: "pulls context from Jira and Slack",
    highlightColor: highlightColors.blue,
  },
  {
    id: 11,
    text: "Our team's feedback quality improved dramatically after switching to Windmill.",
    highlight: "feedback quality improved dramatically",
    highlightColor: highlightColors.green,
  },
  {
    id: 12,
    text: "Finally, a tool that makes 1:1s actually productive.",
    highlight: "actually productive",
    highlightColor: highlightColors.peach,
  },
  {
    id: 13,
    text: "The calibration pre-reads caught biases we didn't even realize we had.",
    highlight: "caught biases",
    highlightColor: highlightColors.red,
  },
  {
    id: 14,
    text: "We rolled it out to 200 employees in a day. Zero complaints.",
    highlight: "Zero complaints",
    highlightColor: highlightColors.pink,
  },
  {
    id: 15,
    text: "Windy summarized my quarter better than I could have myself.",
    highlight: "better than I could have myself",
    highlightColor: highlightColors.purple,
  },
  {
    id: 16,
    text: "Performance reviews went from our most dreaded process to our smoothest.",
    highlight: "most dreaded process to our smoothest",
    highlightColor: highlightColors.yellow,
  },
  {
    id: 17,
    text: "The pulse surveys give us real-time insight into team morale.",
    highlight: "real-time insight",
    highlightColor: highlightColors.sage,
  },
  {
    id: 18,
    text: "I love that it integrates with the tools we already use every day.",
    highlight: "tools we already use",
    highlightColor: highlightColors.blue,
  },
  {
    id: 19,
    text: "Setting up review cycles takes minutes instead of hours.",
    highlight: "minutes instead of hours",
    highlightColor: highlightColors.rose,
  },
  {
    id: 20,
    text: "Our HR team saved over 100 hours last quarter with Windmill.",
    highlight: "saved over 100 hours",
    highlightColor: highlightColors.green,
  },
  {
    id: 21,
    text: "The continuous feedback feature keeps our team aligned between review cycles.",
    highlight: "keeps our team aligned",
    highlightColor: highlightColors.peach,
  },
  {
    id: 22,
    text: "It's like having a chief of staff for every manager on the team.",
    highlight: "chief of staff for every manager",
    highlightColor: highlightColors.purple,
  },
  {
    id: 23,
    text: "We switched from Lattice and haven't looked back.",
    highlight: "haven't looked back",
    highlightColor: highlightColors.red,
  },
  {
    id: 24,
    text: "The AI drafts are a starting point, not a replacement. That's the right balance.",
    highlight: "the right balance",
    highlightColor: highlightColors.yellow,
  },
  {
    id: 25,
    text: "Onboarding new managers is so much easier with the 1:1 prep feature.",
    highlight: "so much easier",
    highlightColor: highlightColors.pink,
  },
  {
    id: 26,
    text: "Windmill made our first formal review cycle feel effortless.",
    highlight: "feel effortless",
    highlightColor: highlightColors.sage,
  },
  {
    id: 27,
    text: "The review quality from our engineering team went through the roof.",
    highlight: "went through the roof",
    highlightColor: highlightColors.blue,
  },
  {
    id: 28,
    text: "I can't imagine going back to spreadsheets and Google Docs for reviews.",
    highlight: "going back to spreadsheets",
    highlightColor: highlightColors.rose,
  },
  {
    id: 29,
    text: "Windy turned a half-day task into 30 minutes.",
    highlight: "half-day task into 30 minutes",
    highlightColor: highlightColors.peach,
  },
];
