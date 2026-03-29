import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { cdnImage } from "~/lib/images";

/**
 * VideoSection -- a cinematic product demo embed with parallax depth.
 *
 * Shows a thumbnail image from the CDN that, when clicked, swaps in an
 * embedded Loom video iframe. The thumbnail has a subtle
 * parallax scroll effect driven by `useScroll` + `useTransform`.
 *
 * The play button uses a frosted-glass aesthetic with a scale-up hover
 * transition. Once clicked, the thumbnail cross-fades to the iframe.
 *
 * Accessibility: the play button has an aria-label and the thumbnail
 * image has proper alt text.
 */

const VIDEO_EMBED_URL = "https://www.loom.com/embed/product-demo?autoplay=1";
const THUMBNAIL_KEY = "marketing/hero/product-demo-thumbnail.png";
const THUMB_TACKS_KEY = "marketing/hero/thumb-tacks.png";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax: the video thumbnail moves slightly slower than scroll.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={containerRef} className="relative py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <ScrollReveal>
          <div className="relative mx-auto max-w-4xl">
            {/* Thumb tacks decoration */}
            <img
              src={cdnImage(THUMB_TACKS_KEY, { width: 1280, format: "webp" })}
              alt=""
              aria-hidden="true"
              className="w-full pointer-events-none"
              loading="lazy"
            />
          <div className="overflow-hidden rounded-2xl shadow-dramatic">
            {/* Parallax thumbnail */}
            {!isPlaying && (
              <motion.div style={{ y }} className="relative">
                <img
                  src={cdnImage(THUMBNAIL_KEY, { width: 1280, format: "webp" })}
                  alt="Windmill product demo showing AI-powered performance reviews"
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />

                {/* Play button overlay */}
                <button
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play product demo video"
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    "bg-black/20 backdrop-blur-[2px] transition-colors duration-300",
                    "hover:bg-black/30 cursor-pointer group"
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-full",
                      "bg-white/90 backdrop-blur-sm shadow-card-hover",
                      "group-hover:bg-white transition-colors duration-200"
                    )}
                  >
                    <Play size={32} className="text-foreground ml-1" fill="currentColor" />
                  </motion.div>
                </button>
              </motion.div>
            )}

            {/* Video iframe -- replaces thumbnail on play */}
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="aspect-video"
              >
                <iframe
                  src={VIDEO_EMBED_URL}
                  title="Windmill product demo"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </motion.div>
            )}
          </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
