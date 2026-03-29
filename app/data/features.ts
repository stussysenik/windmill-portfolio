export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string; // CDN image key
  badge?: string;
  featured?: boolean;
}

export const features: Feature[] = [
  {
    id: "performance-reviews",
    title: "Performance Reviews",
    subtitle: "Performance reviews that run themselves.",
    description:
      "AI-powered reviews that gather context from your tools and write themselves. 90% faster. 93% satisfaction.",
    href: "/features/performance-reviews",
    image: "marketing/features/performance-review-feature-card-5.png",
    badge: "The Future of People Management",
    featured: true,
  },
  {
    id: "one-on-ones",
    title: "1:1s",
    subtitle: "Smart, automated agendas for effective 1:1 meetings with your team.",
    description:
      "Windy prepares your 1:1 agendas using context from recent work, feedback, and past conversations.",
    href: "/features/one-on-ones",
    image: "marketing/features/one-on-one-feature-card-4.png",
  },
  {
    id: "pulse-surveys",
    title: "Pulse Surveys",
    subtitle: "Custom surveys to understand team sentiment, gather blockers, or run retros.",
    description:
      "Create and deploy surveys to gather feedback, identify blockers, or run retrospectives.",
    href: "/features/pulse-surveys",
    image: "marketing/features/pulse-feature-card-3.png",
  },
  {
    id: "continuous-feedback",
    title: "Continuous Feedback",
    subtitle: "Ongoing feedback system to help your team grow and improve consistently.",
    description:
      "A continuous feedback system that helps your team grow and improve consistently.",
    href: "/features/continuous-feedback",
    image: "marketing/features/feedback-feature-card-2.png",
  },
  {
    id: "calibrations",
    title: "Calibrations",
    subtitle: "AI-powered pre-reads highlight discrepancies and flag biases for faster, fairer calibrations.",
    description:
      "AI-powered pre-reads highlight discrepancies and flag biases before calibration sessions.",
    href: "/features/calibrations",
    image: "marketing/features/calibration-feature-card-2.png",
  },
];
