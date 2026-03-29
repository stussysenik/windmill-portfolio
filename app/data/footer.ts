export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "mailto:support@gowindmill.com" },
      {
        label: "Help Desk",
        href: "https://help.gowindmill.com",
        external: true,
      },
      {
        label: "Status",
        href: "https://windmill.betteruptime.com",
        external: true,
      },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Science", href: "/science" },
      { label: "Our Vision", href: "/vision" },
      { label: "Customers", href: "/customers" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Resources", href: "/resources" },
      { label: "Blog", href: "/blog" },
      { label: "Tools", href: "/tools" },
      {
        label: "Jobs",
        href: "https://jobs.ashbyhq.com/windmill",
        external: true,
      },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Performance Reviews", href: "/features/performance-reviews" },
      { label: "1:1s", href: "/features/one-on-ones" },
      { label: "Pulse Surveys", href: "/features/pulse-surveys" },
      { label: "Continuous Feedback", href: "/features/continuous-feedback" },
      { label: "Calibrations", href: "/features/calibrations" },
    ],
  },
  {
    title: "Integrations",
    links: [
      { label: "Jira", href: "/integrations/jira" },
      { label: "Slack", href: "/integrations/slack" },
      { label: "Figma", href: "/integrations/figma" },
      { label: "Notion", href: "/integrations/notion" },
      { label: "Google Workspace", href: "/integrations/googleWorkspace" },
      { label: "Asana", href: "/integrations/asana" },
    ],
  },
];

export const legalLinks: FooterLink[] = [
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  {
    label: "Trust Center",
    href: "https://app.drata.com/trust/",
    external: true,
  },
];

export const socialLinks = [
  {
    label: "X",
    href: "https://x.com/trywindmill",
    icon: "twitter",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/gowindmill",
    icon: "linkedin",
  },
];
