import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { StaggerGrid } from "~/components/motion/StaggerGrid";
import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";
import { Avatar } from "~/components/ui/Avatar";
import { cdnImage } from "~/lib/images";

/**
 * Blog listing page.
 *
 * Mirrors gowindmill.com/blog — a clean heading, newsletter signup bar,
 * and a card grid of articles. Each card shows title, excerpt, author
 * avatar + name, publish date, and tag badges.
 */

export function meta() {
  return [
    { title: "Blog — Windmill" },
    {
      name: "description",
      content:
        "Latest insights, updates and thoughts from the Windmill team on performance management, AI, and the future of work.",
    },
  ];
}

// ── Blog data ───────────────────────────────────────────────────────────────

interface Author {
  name: string;
  /** S3 key for CDN headshot. */
  image: string;
}

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  authors: Author[];
  date: string;
  tags: string[];
}

const authors: Record<string, Author> = {
  ben: {
    name: "Ben Danzig",
    image: "marketing/headshots/v1/ben-new.jpg",
  },
  max: {
    name: "Max Shaw",
    image: "marketing/headshots/v1/max.png",
  },
  mark: {
    name: "Mark Tanner",
    image: "marketing/headshots/v1/mark.jpg",
  },
  nicole: {
    name: "Nicole Alonso",
    image: "marketing/headshots/v1/nicole.png",
  },
  brian: {
    name: "Brian Distelburger",
    image: "marketing/headshots/v1/brian.png",
  },
};

const blogPosts: BlogPost[] = [
  {
    slug: "building-internal-agents",
    title:
      "Building Internal Agents for Your Company (Without Getting Fired)",
    description:
      "How we built Pim, our internal AI agent at Windmill, to automate tedious workflows across Attio, PostHog, Slack, and more — without exposing ourselves to security risks.",
    authors: [authors.ben],
    date: "March 20, 2026",
    tags: ["ai", "agents", "engineering", "automation"],
  },
  {
    slug: "measuring-driving-ai-adoption",
    title: "Measuring and Driving AI Adoption",
    description:
      "Every company has an AI strategy. Few have an AI measurement strategy. This guide covers both: three methods to measure adoption, and four levers to drive it through your existing management infrastructure.",
    authors: [authors.max],
    date: "February 11, 2026",
    tags: ["ai", "management", "guide"],
  },
  {
    slug: "when-ai-should-write-reviews",
    title: "When AI Should Write Reviews",
    description:
      "The key to AI-assisted performance reviews isn't choosing between manual and fully automated — it's knowing when AI should help and when humans should decide. We built Windmill around a deliberate multi-stage process that uses AI for remembering and finding information while keeping judgment calls with managers.",
    authors: [authors.max],
    date: "January 28, 2026",
    tags: ["performance-reviews", "ai", "product"],
  },
  {
    slug: "say-goodbye-annual-checkup",
    title: "Say Goodbye to the Annual Check-Up",
    description:
      "Just like annual physicals miss the bigger picture of your health, annual performance reviews fail to capture how you're actually doing at work. The future of performance management is real-time measurement and continuous improvement — not once-a-year evaluations.",
    authors: [authors.mark],
    date: "January 15, 2026",
    tags: ["performance-reviews", "performance-management", "autonomous-management"],
  },
  {
    slug: "best-performance-reviews-december",
    title: "The Best Performance Reviews Never Happen in December",
    description:
      "Annual performance reviews create anxiety, introduce recency bias, and promote self-protection because feedback is crammed into one high-stakes moment. But the tools we use every day already capture what matters, now making continuous feedback possible and December just another month.",
    authors: [authors.nicole],
    date: "December 22, 2025",
    tags: ["performance-reviews", "performance-management", "feedback"],
  },
  {
    slug: "history-of-performance-reviews",
    title: "The History of Performance Reviews",
    description:
      "From WWI military merit ratings to forced ranking and continuous feedback, performance reviews have evolved for 100 years — yet still fail to deliver. This is the story of how we got here, and why it's time for something better.",
    authors: [authors.brian, authors.nicole],
    date: "October 3, 2025",
    tags: ["performance-reviews", "performance-management", "history"],
  },
];

// ── Component ───────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="py-24 sm:py-32 pb-12 sm:pb-16">
        <Container size="medium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="display-headline text-4xl sm:text-5xl lg:text-6xl">
              Blog
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
              Latest insights, updates and thoughts from the Windmill team
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Newsletter signup */}
      <section className="pb-16">
        <Container size="medium">
          <ScrollReveal>
            <div className="rounded-2xl border border-border bg-white p-8 sm:p-10 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-xl font-display font-bold text-foreground">
                    Stay in the loop
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get the latest updates, insights, and news from Windmill
                    delivered to your inbox.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Newsletter submission would be handled here
                  }}
                  className="flex w-full sm:w-auto gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 sm:w-64 rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-shadow"
                  />
                  <Button variant="primary" size="default" type="submit">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Blog grid */}
      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <StaggerGrid
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.06}
          >
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  {/* Title & description */}
                  <div className="flex-1">
                    <h2 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  {/* Author + date row */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {post.authors.map((author) => (
                        <Avatar
                          key={author.name}
                          name={author.name}
                          src={cdnImage(author.image, {
                            width: 64,
                            height: 64,
                          })}
                          size="sm"
                          className="ring-2 ring-white"
                        />
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="text-foreground font-medium">
                        {post.authors
                          .map((a) => a.name.split(" ")[0])
                          .join(" & ")}
                      </span>
                      <span className="mx-1.5 text-muted-foreground">
                        &bull;
                      </span>
                      <time className="text-muted-foreground">{post.date}</time>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[11px] px-2 py-0.5"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </StaggerGrid>
        </Container>
      </section>
    </>
  );
}
