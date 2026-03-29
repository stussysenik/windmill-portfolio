export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: string; // lucide icon name
  external?: boolean;
}

export interface NavDropdown {
  label: string;
  links: NavLink[];
}

export const productLinks: NavLink[] = [
  {
    label: "Performance Reviews",
    href: "/features/performance-reviews",
    description: "Performance reviews that run themselves.",
    icon: "star",
  },
  {
    label: "1:1s",
    href: "/features/one-on-ones",
    description:
      "Smart, automated agendas for effective 1:1 meetings with your team.",
    icon: "users",
  },
  {
    label: "Pulse Surveys",
    href: "/features/pulse-surveys",
    description:
      "Custom surveys to understand team sentiment, gather blockers, or run retros.",
    icon: "bar-chart-2",
  },
  {
    label: "Continuous Feedback",
    href: "/features/continuous-feedback",
    description:
      "Ongoing feedback system to help your team grow and improve consistently.",
    icon: "message-circle",
  },
  {
    label: "Calibrations",
    href: "/features/calibrations",
    description:
      "AI-powered pre-reads highlight discrepancies and flag biases before calibration.",
    icon: "scale",
  },
];

export const resourceLinks: NavLink[] = [
  {
    label: "Blog",
    href: "/blog",
    description: "Insights on performance management and AI.",
  },
  {
    label: "Tools",
    href: "/tools",
    description: "Free tools for performance management.",
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Guides and templates.",
  },
];

export const companyLinks: NavLink[] = [
  {
    label: "About Us",
    href: "/about-us",
    description: "Meet the team behind Windmill.",
  },
  {
    label: "How It Works",
    href: "/science",
    description: "The science behind our approach.",
  },
  {
    label: "Our Vision",
    href: "/vision",
    description: "Why we're building the future of work.",
  },
  {
    label: "Jobs",
    href: "https://jobs.ashbyhq.com/windmill",
    description: "Join the team.",
    external: true,
  },
];

export const mainNavLinks = [
  { label: "How It Works", href: "/science" },
  { label: "Pricing", href: "/pricing" },
  { label: "Customers", href: "/customers" },
];
