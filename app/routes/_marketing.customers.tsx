import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Badge } from "~/components/ui/Badge";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { CountUp } from "~/components/motion/CountUp";
import { StaggerGrid } from "~/components/motion/StaggerGrid";
import { cdnImage } from "~/lib/images";

/* ------------------------------------------------------------------ */
/*  Meta                                                               */
/* ------------------------------------------------------------------ */

export function meta() {
  return [
    { title: "Customers — Windmill" },
    {
      name: "description",
      content:
        "See how fast-growing, AI-forward teams transform their performance reviews with Windmill — faster cycles, happier employees, zero busywork.",
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Data — hero stats                                                  */
/* ------------------------------------------------------------------ */

const heroStats = [
  { value: 90, suffix: "%", label: "faster reviews" },
  { value: 93, suffix: "%", label: "employee satisfaction" },
  { value: 8, suffix: " days", label: "average cycle time" },
] as const;

/* ------------------------------------------------------------------ */
/*  Data — case studies                                                */
/* ------------------------------------------------------------------ */

interface CaseStudy {
  slug: string;
  company: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  imageSrc: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  featured?: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    slug: "rho-perf",
    company: "Rho",
    logoSrc: "marketing/customers/rho-2.png",
    logoWidth: 960,
    logoHeight: 960,
    imageSrc: "marketing/customers/rho-2.png",
    title: "Streamlining Performance Reviews at Scale with Windmill",
    description:
      "How Rho transformed their performance review process with Windmill, reducing time spent by 83% and boosting employee satisfaction to 93%.",
    stats: [
      { value: "83%", label: "Reduction in hours spent on reviews" },
      { value: "93%", label: "Employees preferred Windmill" },
      { value: "8 days", label: "To complete all written reviews" },
    ],
    featured: true,
  },
  {
    slug: "case-status",
    company: "Case Status",
    logoSrc: "marketing/customers/case-status.png",
    logoWidth: 320,
    logoHeight: 63,
    imageSrc: "marketing/customers/case-status.png",
    title: 'How Case Status Solved the "Blank Page Problem"',
    description:
      "Case Status used Windmill to complete their performance review cycle 84% faster while achieving 93% employee satisfaction, eliminating the dreaded blank page problem through AI-powered work summaries and Slack-based reviews.",
    stats: [
      { value: "84%", label: "Faster than previous review process" },
      { value: "9 min", label: "Average time spent on a manager review" },
    ],
  },
  {
    slug: "nirvana",
    company: "Nirvana",
    logoSrc: "marketing/customers/nirvana-2.png",
    logoWidth: 960,
    logoHeight: 173,
    imageSrc: "marketing/customers/nirvana-2.png",
    title: "How Nirvana ran their performance cycle without an HR team",
    description:
      "Nirvana uses Windmill to run efficient performance reviews during peak season, achieving 100% completion rates and 80% employee preference without dedicated HR resources.",
    stats: [
      { value: "5 min", label: "Median peer review completion time" },
      { value: "80%+", label: "Employees preferred Windmill" },
    ],
  },
  {
    slug: "marqii",
    company: "Marqii",
    logoSrc: "marketing/customers/marqii.png",
    logoWidth: 1280,
    logoHeight: 427,
    imageSrc: "marketing/customers/marqii.png",
    title: "How Marqii Cut Meeting Overhead by 30%",
    description:
      "Marqii uses Windmill to enable data-driven decision making across their team, provide deep insight into employee performance, and elicit meaningful, quality feedback across their org.",
    stats: [
      { value: "10x", label: "Increase in feedback volume" },
      { value: "43%", label: "Reduction in internal meeting time" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Data — customer testimonials with attribution                      */
/* ------------------------------------------------------------------ */

interface CustomerQuote {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarSrc: string;
  companySrc: string;
  companyWidth: number;
  companyHeight: number;
}

const customerQuotes: CustomerQuote[] = [
  {
    quote:
      "\u201CThe performance review feature was amazing. I completed 5-10 reviews in less than an hour.\u201D",
    name: "Zorica Tasi\u0107",
    role: "Client Service Manager, Rho",
    company: "Rho",
    avatarSrc: "marketing/testimonials/zorica-tasic.png",
    companySrc: "marketing/customers/rho-2.png",
    companyWidth: 960,
    companyHeight: 960,
  },
  {
    quote:
      "\u201CWindmill took me from three hours per person to about half an hour. It felt like someone was brainstorming with me on improvement points.\u201D",
    name: "Karim Atef Mansour",
    role: "Director of Engineering, Retail Next",
    company: "Retail Next",
    avatarSrc: "marketing/testimonials/karim-mansour.jpeg",
    companySrc: "marketing/customers/retail-next.png",
    companyWidth: 960,
    companyHeight: 204,
  },
  {
    quote:
      "\u201CAutomating all of this is a gift from heaven, honestly.\u201D",
    name: "David Borenius",
    role: "Head of HR, Cal.com",
    company: "Cal.com",
    avatarSrc: "marketing/testimonials/david-borenius.png",
    companySrc: "marketing/customers/cal.png",
    companyWidth: 1280,
    companyHeight: 279,
  },
  {
    quote:
      "\u201CIt\u2019s like having a second brain that specializes in organization and recall... It\u2019s amazing.\u201D",
    name: "Ron Alexssen",
    role: "Engineering Manager, Counterpart",
    company: "Counterpart",
    avatarSrc: "marketing/testimonials/ron-alexssen.jpeg",
    companySrc: "marketing/customers/counterpart-logo.png",
    companyWidth: 640,
    companyHeight: 108,
  },
  {
    quote:
      "\u201CIt helps me keep my 1:1s organised \u2014 I can easily track all of them in one place with smart suggestions that help keep the conversation going.\u201D",
    name: "Igor Topolski",
    role: "Engineering Manager, Retail Next",
    company: "Retail Next",
    avatarSrc: "marketing/testimonials/igor-topolski.png",
    companySrc: "marketing/customers/retail-next.png",
    companyWidth: 960,
    companyHeight: 204,
  },
  {
    quote:
      "\u201CAll of the admin is gone. I literally open it, have Gemini take notes, and that\u2019s it. The biggest game changer.\u201D",
    name: "Janien Dearham",
    role: "Deployment Quality Assurance Lead, Retail Next",
    company: "Retail Next",
    avatarSrc: "marketing/testimonials/janien-dearham.jpeg",
    companySrc: "marketing/customers/retail-next.png",
    companyWidth: 960,
    companyHeight: 204,
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function CustomersPage() {
  const featured = caseStudies.find((c) => c.featured);
  const rest = caseStudies.filter((c) => !c.featured);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container size="medium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-6">
              Trusted by fast growing, AI-forward teams
            </Badge>

            <h1 className="display-headline text-4xl sm:text-5xl lg:text-6xl">
              Hear from our{" "}
              <em className="font-serif italic">customers.</em>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              See how companies are transforming their performance reviews with
              Windmill&mdash;faster cycles, happier employees, zero busywork.
            </p>

            <div className="mt-8">
              <Link to="/start">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                >
                  Book a demo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 rounded-2xl border border-border bg-white p-6 sm:p-10 shadow-card"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
                  <CountUp to={stat.value} suffix={stat.suffix} duration={1.8} />
                </p>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── Featured case study ───────────────────────────────── */}
      {featured && (
        <section className="pb-16 sm:pb-24">
          <Container size="wide">
            <ScrollReveal>
              <Link
                to={`/customers/${featured.slug}`}
                className="group block rounded-2xl border border-border bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="p-6 sm:p-8">
                  <Badge className="mb-4">Featured Case Study</Badge>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 px-6 sm:px-8 pb-8">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl bg-muted aspect-[4/3]">
                    <img
                      src={cdnImage(featured.imageSrc, {
                        width: 960,
                        height: 960,
                      })}
                      alt={featured.company}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl sm:text-3xl font-display font-bold leading-tight">
                      {featured.title}
                    </h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {featured.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold group-hover:text-primary transition-colors">
                      Read Case Study
                      <ArrowRight size={16} />
                    </span>

                    {/* Stats row */}
                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
                      {featured.stats.map((s) => (
                        <div key={s.label}>
                          <p className="text-xl sm:text-2xl font-display font-bold">
                            {s.value}
                          </p>
                          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* ── Other case studies ────────────────────────────────── */}
      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <StaggerGrid
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {rest.map((study) => (
              <Link
                key={study.slug}
                to={`/customers/${study.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                {/* Logo header */}
                <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                  <img
                    src={cdnImage(study.logoSrc, {
                      width: study.logoWidth,
                      height: study.logoHeight,
                    })}
                    alt={study.company}
                    className="h-8 w-auto object-contain"
                  />
                </div>

                {/* Copy */}
                <div className="flex flex-1 flex-col px-6 pb-6">
                  <h3 className="text-lg font-display font-bold leading-snug">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {study.description}
                  </p>

                  {/* Stats */}
                  <div className="mt-auto pt-6 grid grid-cols-2 gap-4 border-t border-border">
                    {study.stats.map((s) => (
                      <div key={s.label}>
                        <p className="text-lg font-display font-bold">
                          {s.value}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      {/* ── Testimonials carousel ─────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#fafafa]">
        <Container size="wide">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold">
              What customers are saying
            </h2>
          </ScrollReveal>

          <StaggerGrid
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.06}
          >
            {customerQuotes.map((q) => (
              <div
                key={q.name}
                className="flex flex-col rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-card"
              >
                <p className="flex-1 text-base leading-relaxed text-foreground">
                  {q.quote}
                </p>

                <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                  <img
                    src={cdnImage(q.avatarSrc, { width: 96, height: 96 })}
                    alt={q.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{q.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {q.role}
                    </p>
                  </div>
                  <img
                    src={cdnImage(q.companySrc, {
                      width: q.companyWidth,
                      height: q.companyHeight,
                    })}
                    alt={q.company}
                    className="h-6 w-auto object-contain opacity-60"
                  />
                </div>
              </div>
            ))}
          </StaggerGrid>
        </Container>
      </section>
    </>
  );
}
