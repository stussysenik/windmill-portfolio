export interface CustomerLogo {
  name: string;
  src: string; // CDN image path
  width: number;
  height: number;
  /** CDN resize width (matches live site params exactly). */
  cdnWidth: number;
  /** CDN resize height (matches live site params exactly). */
  cdnHeight: number;
}

export const customerLogos: CustomerLogo[] = [
  {
    name: "Rho",
    src: "marketing/customers/rho-2.png",
    width: 120,
    height: 40,
    cdnWidth: 960,
    cdnHeight: 960,
  },
  {
    name: "TickPick",
    src: "marketing/customers/tickpick.png",
    width: 120,
    height: 40,
    cdnWidth: 960,
    cdnHeight: 204,
  },
  {
    name: "Merge",
    src: "marketing/customers/merge.png",
    width: 120,
    height: 40,
    cdnWidth: 320,
    cdnHeight: 67,
  },
  {
    name: "Counterpart",
    src: "marketing/customers/counterpart-logo.png",
    width: 140,
    height: 40,
    cdnWidth: 640,
    cdnHeight: 108,
  },
  {
    name: "Retail Next",
    src: "marketing/customers/retail-next.png",
    width: 140,
    height: 40,
    cdnWidth: 960,
    cdnHeight: 204,
  },
  {
    name: "Inngest",
    src: "marketing/customers/inngest.png",
    width: 120,
    height: 40,
    cdnWidth: 960,
    cdnHeight: 240,
  },
  {
    name: "Nirvana",
    src: "marketing/customers/nirvana-2.png",
    width: 120,
    height: 40,
    cdnWidth: 960,
    cdnHeight: 173,
  },
  {
    name: "Cal.com",
    src: "marketing/customers/cal.png",
    width: 120,
    height: 40,
    cdnWidth: 1280,
    cdnHeight: 279,
  },
  {
    name: "Circle",
    src: "marketing/customers/circle.webp",
    width: 120,
    height: 40,
    cdnWidth: 1280,
    cdnHeight: 512,
  },
  {
    name: "Allwhere",
    src: "marketing/customers/allwhere-2.png",
    width: 130,
    height: 40,
    cdnWidth: 960,
    cdnHeight: 480,
  },
];
