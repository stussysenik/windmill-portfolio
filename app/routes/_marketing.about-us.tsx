import { motion } from "framer-motion";
import { Container } from "~/components/ui/Container";

/**
 * About Us page -- company story, mission, and team overview.
 *
 * This is a scaffold that will be fleshed out in Step 6. For now it
 * provides a real route to test the marketing layout and navigation.
 */
export function meta() {
  return [
    { title: "About Us -- Windmill" },
    {
      name: "description",
      content:
        "Meet the team building the future of performance management. Learn about Windmill's mission, values, and story.",
    },
  ];
}

const values = [
  {
    title: "People First",
    description:
      "We believe technology should amplify human judgment, not replace it. Every feature we ship is designed to help managers have better conversations.",
  },
  {
    title: "Radical Transparency",
    description:
      "Clear expectations, honest feedback, and open communication are the foundation of high-performing teams. We practice what we preach.",
  },
  {
    title: "Bias for Action",
    description:
      "We ship fast, learn from real usage, and iterate. Perfect is the enemy of good -- and our customers can't wait for perfect.",
  },
  {
    title: "Craft & Quality",
    description:
      "Details matter. From pixel-perfect UI to thoughtful AI prompts, we sweat the small stuff because our users notice.",
  },
];

const team = [
  { name: "Alex Chen", role: "CEO & Co-founder" },
  { name: "Sarah Kim", role: "CTO & Co-founder" },
  { name: "Marcus Johnson", role: "Head of Product" },
  { name: "Priya Patel", role: "Head of Design" },
  { name: "James Wright", role: "Head of Engineering" },
  { name: "Mia Torres", role: "Head of Customer Success" },
];

/** Staggered fade-in variants for list items. */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutUsPage() {
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="py-24 sm:py-32">
        <Container size="medium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="display-headline text-4xl sm:text-5xl lg:text-6xl">
              We're building the future
              <br />
              of performance management
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Windmill started with a simple question: why do performance reviews
              still feel like they were designed in 1995? We're a small,
              passionate team on a mission to fix that.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ───────────── Mission ───────────── */}
      <section className="py-20 bg-[var(--color-beige-section)]">
        <Container size="medium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="display-headline-2 text-3xl sm:text-4xl text-center">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
              To make performance management feel less like paperwork and more
              like progress. We combine AI with thoughtful design to help every
              team run faster, fairer review cycles -- so people can focus on
              growth, not busywork.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ───────────── Values ───────────── */}
      <section className="py-20">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="display-headline-2 text-3xl sm:text-4xl text-center"
          >
            Our Values
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-14 grid gap-8 sm:grid-cols-2"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-white p-8"
              >
                <h3 className="text-lg font-display font-bold">
                  {value.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ───────────── Team ───────────── */}
      <section className="py-20 bg-[var(--color-cyan-section)]">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="display-headline-2 text-3xl sm:text-4xl text-center"
          >
            Meet the Team
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="flex flex-col items-center rounded-2xl border border-border bg-white p-8 text-center"
              >
                {/* Avatar placeholder */}
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-muted to-border" />
                <h3 className="mt-4 text-base font-display font-bold">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
