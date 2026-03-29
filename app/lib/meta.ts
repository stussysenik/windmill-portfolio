interface MetaConfig {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

/**
 * Generate standard meta tags for a page.
 * Mirrors gowindmill.com's Open Graph / Twitter Card setup.
 */
export function generateMeta({ title, description, image, url }: MetaConfig) {
  const siteName = "Windmill";
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const defaultDescription =
    "Performance reviews are broken. So we fixed them.";
  const defaultImage = "/og-image.png";

  const desc = description || defaultDescription;
  const img = image || defaultImage;

  return [
    { title: fullTitle },
    { name: "description", content: desc },
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: siteName },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: desc },
    { property: "og:image", content: img },
    ...(url ? [{ property: "og:url", content: url }] : []),
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@trywindmill" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: desc },
    { name: "twitter:image", content: img },
  ];
}
