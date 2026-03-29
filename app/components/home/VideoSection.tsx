import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { cdnImage } from "~/lib/images";

/**
 * VideoSection -- 3-step product illustration showing how Windmill works.
 *
 * Recreates the live gowindmill.com layout:
 *   Step 1: "Connects and analyzes your tools" — integration stats card
 *   Step 2: "Windy chats with your team" — Slack-like message card
 *   Step 3: "And reviews write themselves" — performance review card
 *
 * Cards are connected by curved SVG arrows. Below the cards is a dark
 * "See how it works" button that launches a Loom video embed.
 *
 * Stagger animations via Framer Motion reveal each card sequentially
 * as the section scrolls into view.
 */

const LOOM_SHARE_URL =
  "https://www.loom.com/share/6b1771f08a57449883b0a66d754bec01";
const VIDEO_EMBED_URL =
  "https://www.loom.com/embed/6b1771f08a57449883b0a66d754bec01?autoplay=1";
const THUMB_TACKS_KEY = "marketing/thumbtacks.png";

/* ── Stagger animation variants ──────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const arrowVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.35,
    },
  },
};

/* ── Integration row data for Step 1 ─────────────────────────────────────── */

const integrations = [
  { icon: "slack", label: "370 messages sent", color: "#E01E5A" },
  { icon: "google", label: "22 hours in internal meetings", color: "#4285F4" },
  { icon: "google", label: "17 hours in external meetings", color: "#34A853" },
  { icon: "salesforce", label: "41 opportunities created", color: "#00A1E0" },
  { icon: "zoom", label: "38 meetings analyzed", color: "#2D8CFF" },
  { icon: "zendesk", label: "25 chat sessions", color: "#03363D" },
];

/* ── Tiny brand icons (inline SVGs for pixel-perfect rendering) ──────────── */

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-4 h-4", className)}>
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
      <path d="M18.958 8.834a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.527 2.527 0 0 1-2.521 2.521 2.527 2.527 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312z" fill="#2EB67D"/>
      <path d="M15.166 18.958a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.527 2.527 0 0 1-2.521-2.521 2.527 2.527 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.312z" fill="#ECB22E"/>
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-4 h-4", className)}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function SalesforceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-4 h-4", className)}>
      <path d="M10.006 5.415a4.195 4.195 0 0 1 3.045-1.306c1.56 0 2.954.878 3.664 2.168a5.013 5.013 0 0 1 2.129-.474c2.8 0 5.068 2.29 5.068 5.116 0 2.826-2.269 5.116-5.068 5.116-.456 0-.898-.061-1.318-.175a3.86 3.86 0 0 1-3.454 2.14 3.855 3.855 0 0 1-1.73-.408 4.583 4.583 0 0 1-4.071 2.496 4.572 4.572 0 0 1-4.29-2.987 3.76 3.76 0 0 1-.615.051C1.535 17.152 0 15.6 0 13.686c0-1.278.694-2.393 1.724-2.996a4.03 4.03 0 0 1-.408-1.768c0-2.23 1.794-4.04 4.006-4.04 1.248 0 2.363.576 3.1 1.478l-.024.024c.204.22.39.456.558.71l.05.054z" fill="#00A1E0"/>
    </svg>
  );
}

function ZoomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-4 h-4", className)}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z" fill="#2D8CFF"/>
      <path d="M7 8.5h6.5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1zm9 1.25l2.5-1.5v7.5l-2.5-1.5v-4.5z" fill="#fff"/>
    </svg>
  );
}

function ZendeskIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-4 h-4", className)}>
      <path d="M11.088 3v14.316L1 21h10.088V3zm1.824 17h10.088L12.912 6.684V20zM22.912 3a5.044 5.044 0 0 1-5.044 5.044A5.044 5.044 0 0 1 12.824 3h10.088zM1 21a5.044 5.044 0 0 1 5.044-5.044A5.044 5.044 0 0 1 11.088 21H1z" fill="#03363D"/>
    </svg>
  );
}

function WindyAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500",
        "flex items-center justify-center text-white text-xs font-bold",
        className
      )}
    >
      W
    </div>
  );
}

/** Maps integration icon key to the correct SVG component */
function IntegrationIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "slack":
      return <SlackIcon />;
    case "google":
      return <GoogleIcon />;
    case "salesforce":
      return <SalesforceIcon />;
    case "zoom":
      return <ZoomIcon />;
    case "zendesk":
      return <ZendeskIcon />;
    default:
      return null;
  }
}

/* ── Curved arrow SVGs connecting steps ──────────────────────────────────── */

function CurvedArrow() {
  return (
    <svg
      width="60"
      height="40"
      viewBox="0 0 60 40"
      fill="none"
      className="hidden lg:block flex-shrink-0"
    >
      <path
        d="M4 36C16 36 20 4 36 4C46 4 50 10 56 10"
        stroke="#b0d4db"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <path
        d="M50 6L56 10L50 14"
        stroke="#b0d4db"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Step 1 Card: Integration Stats ──────────────────────────────────────── */

function StepOneCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 w-full">
      <div className="space-y-3">
        {integrations.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <IntegrationIcon icon={item.icon} />
            </div>
            <span className="text-[13px] text-gray-700 leading-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 2 Card: Slack-like Chat ─────────────────────────────────────────── */

function StepTwoCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full overflow-hidden">
      {/* Message area */}
      <div className="p-5 pb-3">
        <div className="flex items-start gap-3">
          <WindyAvatar className="flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-semibold text-sm text-gray-900">Windy</span>
              <span className="text-[10px] font-medium bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase tracking-wide">
                APP
              </span>
              <span className="text-[11px] text-gray-400 ml-auto">11:55</span>
            </div>
            <p className="text-[13px] text-gray-700 leading-relaxed">
              Hi, <span className="text-blue-600 font-medium">@Emily</span>! It's
              time for your self review. Here is a report on your last 6 months.
              What are you most proud of in that time?
            </p>
          </div>
        </div>
      </div>
      {/* Input bar */}
      <div className="border-t border-gray-100 px-5 py-3">
        <div className="bg-gray-50 rounded-lg px-4 py-2.5 text-[13px] text-gray-400">
          Message Windy
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 Card: Performance Review ──────────────────────────────────────── */

function StepThreeCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
          E
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-sm font-semibold text-gray-900">
            Performance Review for Emily
          </span>
        </div>
      </div>

      {/* Key Contributions */}
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Key Contributions
      </h4>
      <div className="space-y-3">
        <div>
          <div className="flex items-start gap-2">
            <span className="text-sm leading-none mt-0.5">💡</span>
            <div>
              <p className="text-[13px] font-medium text-gray-900 leading-tight">
                Proactive technical problem-solving
              </p>
              <p className="text-[12px] text-gray-500 leading-snug mt-0.5">
                Identified and resolved complex challenges before they escalated.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-start gap-2">
            <span className="text-sm leading-none mt-0.5">📊</span>
            <div>
              <p className="text-[13px] font-medium text-gray-900 leading-tight">
                Improved data infrastructure and reporting
              </p>
              <p className="text-[12px] text-gray-500 leading-snug mt-0.5">
                Enhanced systems for faster, more accurate insights.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-start gap-2">
            <span className="text-sm leading-none mt-0.5">⚡</span>
            <div>
              <p className="text-[13px] font-medium text-gray-900 leading-tight">
                Drove operational process improvements
              </p>
              <p className="text-[12px] text-gray-500 leading-snug mt-0.5">
                Streamlined workflows to boost efficiency and...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Number badge ─────────────────────────────────────────────────────────── */

function StepNumber({ n }: { n: number }) {
  return (
    <div className="w-8 h-8 rounded-full bg-amber-400 text-white font-bold text-sm flex items-center justify-center shadow-sm mb-3">
      {n}
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────────── */

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#e8f6fa]">
      <Container size="wide">
        {/* Thumb tacks decorative image */}
        <ScrollReveal>
          <img
            src={cdnImage(THUMB_TACKS_KEY, {
              width: 960,
              height: 549,
              format: "webp",
              dpi: 3,
            })}
            alt=""
            aria-hidden="true"
            className="w-full max-w-3xl mx-auto pointer-events-none -mb-4"
            loading="lazy"
          />
        </ScrollReveal>

        {/* 3-Step Cards Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col lg:flex-row items-start justify-center gap-4 lg:gap-0"
        >
          {/* Step 1 */}
          <motion.div variants={cardVariants} className="flex-1 max-w-xs mx-auto lg:mx-0">
            <div className="flex flex-col items-center text-center">
              <StepNumber n={1} />
              <h3 className="text-base font-semibold text-gray-900 mb-4 leading-snug">
                Connects and analyzes your tools
              </h3>
              <StepOneCard />
            </div>
          </motion.div>

          {/* Arrow 1→2 */}
          <motion.div
            variants={arrowVariants}
            className="self-center pt-16 hidden lg:flex"
          >
            <CurvedArrow />
          </motion.div>

          {/* Step 2 */}
          <motion.div variants={cardVariants} className="flex-1 max-w-xs mx-auto lg:mx-0">
            <div className="flex flex-col items-center text-center">
              <StepNumber n={2} />
              <h3 className="text-base font-semibold text-gray-900 mb-4 leading-snug">
                Windy chats with your team
              </h3>
              <StepTwoCard />
            </div>
          </motion.div>

          {/* Arrow 2→3 */}
          <motion.div
            variants={arrowVariants}
            className="self-center pt-16 hidden lg:flex"
          >
            <CurvedArrow />
          </motion.div>

          {/* Step 3 */}
          <motion.div variants={cardVariants} className="flex-1 max-w-xs mx-auto lg:mx-0">
            <div className="flex flex-col items-center text-center">
              <StepNumber n={3} />
              <h3 className="text-base font-semibold text-gray-900 mb-4 leading-snug">
                And reviews write themselves
              </h3>
              <StepThreeCard />
            </div>
          </motion.div>
        </motion.div>

        {/* "See how it works" CTA Button */}
        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex justify-center">
            {!isPlaying ? (
              <button
                onClick={() => setIsPlaying(true)}
                className={cn(
                  "inline-flex items-center gap-2.5 px-7 py-3.5",
                  "bg-gradient-to-b from-[#2a2a2a] to-black text-white",
                  "rounded-[14px] font-semibold text-base",
                  "shadow-[inset_0_2px_0_rgba(255,255,255,0.15)]",
                  "hover:opacity-90 transition-opacity duration-200",
                  "cursor-pointer select-none"
                )}
              >
                <Play size={16} fill="currentColor" className="opacity-80" />
                See how it works
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-dramatic"
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
        </ScrollReveal>
      </Container>
    </section>
  );
}
