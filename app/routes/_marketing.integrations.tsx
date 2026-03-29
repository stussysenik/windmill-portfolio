import { motion } from "framer-motion";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { StaggerGrid } from "~/components/motion/StaggerGrid";
import { cdnImage } from "~/lib/images";

/* ------------------------------------------------------------------ */
/*  Meta                                                               */
/* ------------------------------------------------------------------ */

export function meta() {
  return [
    { title: "Integrations — Windmill" },
    {
      name: "description",
      content:
        "Windmill pulls context from the tools your team already uses — so reviews reflect what people actually did. Connect Jira, Slack, GitHub, and more.",
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Data — integration items                                           */
/* ------------------------------------------------------------------ */

interface Integration {
  name: string;
  /** S3 key for CDN image, or a full external URL for brandfetch icons. */
  icon: string;
  /** If true, `icon` is already a full URL (brandfetch). Otherwise use cdnImage. */
  external?: boolean;
  description: string;
  slug: string;
}

interface IntegrationCategory {
  title: string;
  subtitle: string;
  integrations: Integration[];
}

const categories: IntegrationCategory[] = [
  {
    title: "Productivity",
    subtitle:
      "Track projects, tickets, and tasks across your engineering and product teams.",
    integrations: [
      {
        name: "Airtable",
        icon: "marketing/integrations/airtable.png",
        description: "Connect Airtable to sync bases and track project data",
        slug: "airtable",
      },
      {
        name: "Asana",
        icon: "marketing/integrations/asana.png",
        description:
          "Sync Asana tasks to track project progress and individual contributions",
        slug: "asana",
      },
      {
        name: "Figma",
        icon: "marketing/integrations/figma2.png",
        description:
          "Connect Figma to track design work and collaboration",
        slug: "figma",
      },
      {
        name: "GitHub",
        icon: "marketing/integrations/github.png",
        description:
          "Connect GitHub to track code contributions and engineering activity",
        slug: "github",
      },
      {
        name: "Google Workspace",
        icon: "marketing/integrations/google.webp",
        description:
          "Connect Google Workspace to sync calendar, email, and document activity",
        slug: "googleWorkspace",
      },
      {
        name: "Jira",
        icon: "marketing/integrations/jira.png",
        description:
          "Sync Jira issues to track engineering progress and contributions",
        slug: "jira",
      },
      {
        name: "Linear",
        icon: "marketing/integrations/linear.png",
        description:
          "Connect Linear to track issues and engineering progress",
        slug: "linear",
      },
      {
        name: "Monday",
        icon: "marketing/integrations/monday.png",
        description:
          "Sync Monday.com boards to track project progress and team workload",
        slug: "monday",
      },
      {
        name: "Notion",
        icon: "marketing/integrations/notion.png",
        description:
          "Sync Notion pages and databases to track documentation and knowledge sharing",
        slug: "notion",
      },
      {
        name: "Roam",
        icon: "marketing/integrations/roam.png",
        description:
          "Connect Roam to track notes and knowledge management",
        slug: "roam",
      },
    ],
  },
  {
    title: "Sales & Support",
    subtitle:
      "Pull deal activity, support tickets, and customer interactions into reviews.",
    integrations: [
      {
        name: "Attio",
        icon: "marketing/integrations/attio-1.png",
        description:
          "Connect Attio to track relationships and sales activities",
        slug: "attio",
      },
      {
        name: "Front",
        icon: "marketing/integrations/front.png",
        description:
          "Connect Front to track customer conversations and team inbox activity",
        slug: "front",
      },
      {
        name: "Gong",
        icon: "marketing/integrations/Gong.webp",
        description:
          "Connect Gong to analyze sales calls and customer conversations",
        slug: "gong",
      },
      {
        name: "Hubspot",
        icon: "marketing/integrations/hubspot.webp",
        description:
          "Connect HubSpot to track deals, marketing campaigns, and customer interactions",
        slug: "hubspot",
      },
      {
        name: "Salesforce",
        icon: "marketing/integrations/salesforce.png",
        description:
          "Connect Salesforce to track deals, pipeline, and sales activities",
        slug: "salesforce",
      },
      {
        name: "Zendesk Support",
        icon: "https://cdn.brandfetch.io/zendesk.com?c=1id40UrZO_zX9TbVwiD",
        external: true,
        description:
          "Track support tickets and customer interactions from Zendesk Support",
        slug: "zendesk-support",
      },
    ],
  },
  {
    title: "Meetings & Chat",
    subtitle:
      "Surface collaboration patterns and meeting context that often gets forgotten.",
    integrations: [
      {
        name: "Front",
        icon: "marketing/integrations/front.png",
        description:
          "Connect Front to track customer conversations and team inbox activity",
        slug: "front",
      },
      {
        name: "Gong",
        icon: "marketing/integrations/Gong.webp",
        description:
          "Connect Gong to analyze sales calls and customer conversations",
        slug: "gong",
      },
      {
        name: "Google Workspace",
        icon: "marketing/integrations/google.webp",
        description:
          "Connect Google Workspace to sync calendar, email, and document activity",
        slug: "googleWorkspace",
      },
      {
        name: "Slack Business Analytics",
        icon: "https://cdn.brandfetch.io/slack.com?c=1id40UrZO_zX9TbVwiD",
        external: true,
        description: "Advanced Slack analytics for enterprise customers",
        slug: "slack-business-analytics",
      },
      {
        name: "Slack",
        icon: "marketing/integrations/slack.png",
        description:
          "Connect Slack to surface important conversations and team interactions",
        slug: "slack",
      },
      {
        name: "Zoom",
        icon: "marketing/integrations/zoom.png",
        description:
          "Connect Zoom to automatically pull in meeting context and recordings",
        slug: "zoom",
      },
    ],
  },
  {
    title: "HRIS & Org Chart",
    subtitle:
      "Sync your employee directory and reporting structure automatically.",
    integrations: [
      {
        name: "ADP",
        icon: "https://cdn.brandfetch.io/adp.com?c=1id40UrZO_zX9TbVwiD",
        external: true,
        description:
          "Connect ADP to sync employee data and organizational structure",
        slug: "adp",
      },
      {
        name: "BambooHR",
        icon: "https://cdn.brandfetch.io/bamboohr.com?c=1id40UrZO_zX9TbVwiD",
        external: true,
        description:
          "Connect BambooHR to sync employee data and organizational structure",
        slug: "bamboohr",
      },
      {
        name: "ChartHop",
        icon: "marketing/integrations/charthop.webp",
        description:
          "Connect ChartHop to sync organizational data and people analytics",
        slug: "charthop",
      },
      {
        name: "HiBob",
        icon: "https://cdn.brandfetch.io/hibob.com?c=1id40UrZO_zX9TbVwiD",
        external: true,
        description:
          "Connect HiBob to sync employee data and organizational information",
        slug: "hibob",
      },
      {
        name: "Gusto",
        icon: "https://cdn.brandfetch.io/gusto.com?c=1id40UrZO_zX9TbVwiD",
        external: true,
        description:
          "Connect Gusto to sync employee data and organizational information",
        slug: "gusto",
      },
      {
        name: "Justworks",
        icon: "marketing/integrations/justworks.png",
        description:
          "Connect Justworks to sync employee data and organizational structure",
        slug: "justworks",
      },
      {
        name: "Paylocity",
        icon: "https://cdn.brandfetch.io/paylocity.com?c=1id40UrZO_zX9TbVwiD",
        external: true,
        description:
          "Connect Paylocity to sync employee data and organizational information",
        slug: "paylocity",
      },
      {
        name: "Rippling",
        icon: "https://cdn.brandfetch.io/rippling.com?c=1id40UrZO_zX9TbVwiD",
        external: true,
        description:
          "Connect Rippling to sync employee data and organizational structure",
        slug: "rippling",
      },
      {
        name: "Workday",
        icon: "marketing/integrations/workday.png",
        description:
          "Connect Workday to sync employee data and organizational structure",
        slug: "workday",
      },
      {
        name: "Oracle HCM",
        icon: "https://cdn.brandfetch.io/oracle.com?c=1id40UrZO_zX9TbVwiD",
        external: true,
        description:
          "Connect Oracle HCM to sync employee data and organizational structure",
        slug: "oracle-hcm",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Flatten all integrations for the "All Integrations" section,       */
/*  de-duplicated by slug and sorted alphabetically.                   */
/* ------------------------------------------------------------------ */

const allIntegrations = Array.from(
  new Map(
    categories
      .flatMap((c) => c.integrations)
      .map((i) => [i.slug, i])
  ).values()
).sort((a, b) => a.name.localeCompare(b.name));

/* ------------------------------------------------------------------ */
/*  Reusable integration card                                          */
/* ------------------------------------------------------------------ */

function IntegrationCard({ integration }: { integration: Integration }) {
  const iconSrc = integration.external
    ? integration.icon
    : cdnImage(integration.icon, { width: 80, height: 80 });

  return (
    <div className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f5f5f5]">
        <img
          src={iconSrc}
          alt={integration.name}
          className="h-8 w-8 object-contain"
          loading="lazy"
        />
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-display font-bold">{integration.name}</h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {integration.description}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
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
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Integrations
            </p>
            <h1 className="display-headline text-4xl sm:text-5xl lg:text-6xl">
              Connect your tools, surface real work
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Windmill pulls context from the tools your team already
              uses&mdash;so reviews reflect what people actually did.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Category sections ─────────────────────────────────── */}
      {categories.map((category, idx) => (
        <section key={category.title} className="pb-20 sm:pb-28">
          <Container size="wide">
            <ScrollReveal delay={idx * 0.05}>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">
                {category.title}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                {category.subtitle}
              </p>
            </ScrollReveal>

            <StaggerGrid
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              staggerDelay={0.05}
            >
              {category.integrations.map((integration) => (
                <IntegrationCard
                  key={`${category.title}-${integration.slug}`}
                  integration={integration}
                />
              ))}
            </StaggerGrid>
          </Container>
        </section>
      ))}

      {/* ── All integrations ──────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#fafafa]">
        <Container size="wide">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              All Integrations
            </h2>
            <p className="mt-3 text-muted-foreground">
              Browse every integration Windmill supports.
            </p>
          </ScrollReveal>

          <StaggerGrid
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            staggerDelay={0.03}
          >
            {allIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.slug}
                integration={integration}
              />
            ))}
          </StaggerGrid>
        </Container>
      </section>
    </>
  );
}
