const CDN_BASE = "https://gowindmill-images.com/cdn-cgi/image";
const S3_BASE = "https://windmill-storage-prod.s3.us-east-1.amazonaws.com";

interface ImageOptions {
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "crop" | "scale-down";
  format?: "webp" | "avif" | "auto";
  dpi?: number;
}

/**
 * Build a Cloudflare CDN image URL from an S3 key.
 * Matches gowindmill.com's image pipeline exactly.
 */
export function cdnImage(key: string, options: ImageOptions = {}): string {
  const {
    width,
    height,
    fit = "cover",
    format = "webp",
    dpi = 3,
  } = options;

  const params = [`fit=${fit}`];

  if (width) params.push(`width=${width}`);
  if (height) params.push(`height=${height}`);

  params.push(`dpi=${dpi}`, `format=${format}`);

  return `${CDN_BASE}/${params.join(",")}/${S3_BASE}/${key}`;
}

/**
 * Generate a responsive srcSet string for an image.
 */
export function cdnSrcSet(
  key: string,
  widths: number[] = [320, 640, 960, 1280],
  options: Omit<ImageOptions, "width"> = {}
): string {
  return widths
    .map((w) => `${cdnImage(key, { ...options, width: w })} ${w}w`)
    .join(", ");
}
