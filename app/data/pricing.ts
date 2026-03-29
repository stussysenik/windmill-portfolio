export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingData {
  tagline: string;
  freeUsers: number;
  pricePerUser: number;
  period: string;
  ctaText: string;
  ctaHref: string;
  note: string;
  features: PricingFeature[];
}

export const pricingData: PricingData = {
  tagline: "Simple, transparent pricing",
  freeUsers: 10,
  pricePerUser: 10,
  period: "month",
  ctaText: "Book a demo",
  ctaHref: "/start",
  note: "Try Windmill risk-free.",
  features: [
    { label: "Performance Reviews", included: true },
    { label: "1:1s", included: true },
    { label: "Pulse Surveys", included: true },
    { label: "Continuous Feedback", included: true },
    { label: "Calibrations", included: true },
    { label: "Dedicated Slack Support", included: true },
    { label: "SSO & SAML", included: true },
    { label: "Custom Integrations", included: true },
  ],
};
