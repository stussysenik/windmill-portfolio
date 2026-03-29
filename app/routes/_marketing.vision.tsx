import { motion } from "framer-motion";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { cdnImage } from "~/lib/images";

export function meta() {
  return [
    { title: "Our Vision | Windmill" },
    {
      name: "description",
      content:
        "Why we're building the future of work. We're frustrated operators building Windmill to reinvent how companies operate.",
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Founders data                                                     */
/* ------------------------------------------------------------------ */

const founders = [
  {
    name: "Max",
    fullName: "Max Shaw",
    image: cdnImage("marketing/headshots/v1/max.png", {
      width: 640,
      height: 640,
    }),
    linkedin: "https://www.linkedin.com/in/max-shaw-82287025/",
  },
  {
    name: "Mark",
    fullName: "Mark Tanner",
    image: cdnImage("marketing/headshots/v1/mark.jpg", {
      width: 640,
      height: 640,
    }),
    linkedin: "https://www.linkedin.com/in/mark-tanner-88623123/",
  },
  {
    name: "Brian",
    fullName: "Brian Distelburger",
    image: cdnImage("marketing/headshots/v1/brian.png", {
      width: 640,
      height: 640,
    }),
    linkedin: "https://www.linkedin.com/in/briandistelburger/",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function VisionPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container size="medium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="display-headline text-4xl sm:text-5xl lg:text-6xl">
              Our Vision
            </h1>
            <h2 className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Why we're building the future of work.
            </h2>
          </motion.div>
        </Container>
      </section>

      {/* ── Body copy ────────────────────────────────────────────── */}
      <section className="pb-24 sm:pb-32">
        <Container size="narrow">
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <ScrollReveal>
              <p>
                We are{" "}
                <strong className="text-foreground font-semibold">
                  frustrated operators
                </strong>
                .
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <p>
                We've spent years managing teams inside fast-moving companies,
                and we've all used the same{" "}
                <strong className="text-foreground font-semibold">
                  broken tools
                </strong>
                . HR systems that no one actually likes. Performance reviews that
                feel like paperwork. Dashboards no one looks at. Tools built for
                compliance, not real management.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p>
                <strong className="text-foreground font-semibold">
                  Windmill is our response.
                </strong>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p>
                We're not here to polish the same old playbook. We're here to{" "}
                <strong className="text-foreground font-semibold">
                  reinvent how companies operate
                </strong>
                . Not with slides or surveys, but with software that embeds
                itself in the daily rhythm of your team and actually helps run
                the business.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p>
                The future of management is{" "}
                <strong className="text-foreground font-semibold">
                  flatter, faster, and smarter
                </strong>
                .
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p>
                Managers won't just manage. They'll build, sell, support, and
                lead. Windmill takes care of the rest. It handles the busywork,
                tracks the details, and keeps everyone aligned without another
                meeting or spreadsheet.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p>
                <strong className="text-foreground font-semibold">
                  We're not waiting for the future of work. We're building it
                  now.
                </strong>
              </p>
            </ScrollReveal>
          </div>

          {/* ── Founders callout ───────────────────────────────────── */}
          <ScrollReveal delay={0.35}>
            <div className="mt-16 flex flex-col items-center text-center">
              {/* Headshots */}
              <div className="flex -space-x-4">
                {founders.map((founder) => (
                  <img
                    key={founder.name}
                    src={founder.image}
                    alt={founder.fullName}
                    className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ))}
              </div>

              {/* Names with LinkedIn links */}
              <p className="mt-4 text-base text-muted-foreground">
                <a
                  href={founders[0].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  {founders[0].name}
                </a>
                ,{" "}
                <a
                  href={founders[1].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  {founders[1].name}
                </a>
                , and{" "}
                <a
                  href={founders[2].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  {founders[2].name}
                </a>
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
