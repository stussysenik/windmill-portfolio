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
        href: "https://help.gowindmill.com/",
        external: true,
      },
      {
        label: "Status",
        href: "https://windmill.betteruptime.com/",
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
      { label: "+23 more", href: "/integrations" },
    ],
  },
];

export const legalLinks: FooterLink[] = [
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  {
    label: "Trust Center",
    href: "https://app.drata.com/trust/7bd6416b-c1ac-4c6c-afb4-a015fe83db6b",
    external: true,
  },
  {
    label: "Do Not Sell or Share My Personal Information",
    href: "https://app.termly.io/notify/5059523c-b34c-4e5a-a3a5-fa02bbdbed97",
    external: true,
  },
  { label: "Consent Preferences", href: "#" },
];

export const socialLinks = [
  {
    label: "X",
    href: "https://x.com/trywindmill",
    icon: "twitter",
    ariaLabel: "Follow Windmill on X (formerly Twitter)",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/gowindmill/",
    icon: "linkedin",
    ariaLabel: "Follow Windmill on LinkedIn",
  },
];
