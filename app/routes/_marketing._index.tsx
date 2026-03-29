import { HeroSection } from "~/components/home/HeroSection";
import { VideoSection } from "~/components/home/VideoSection";
import { LogoStrip } from "~/components/home/LogoStrip";
import { FeaturesGrid } from "~/components/home/FeaturesGrid";
import { CostCalculator } from "~/components/home/CostCalculator";
import { Testimonials } from "~/components/home/Testimonials";
import { SecuritySection } from "~/components/home/SecuritySection";
import { AIResearchCTA } from "~/components/home/AIResearchCTA";
import { BottomCTA } from "~/components/home/BottomCTA";

export function meta() {
  return [
    { title: "Windmill | AI Performance Reviews" },
    {
      name: "description",
      content:
        "Performance reviews are broken. So we fixed them. 90% faster reviews. 93% employee satisfaction. Zero nagging required.",
    },
    { property: "og:title", content: "Windmill | AI Performance Reviews" },
    { property: "og:description", content: "Performance reviews are broken. So we fixed them." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VideoSection />
      <LogoStrip />
      <FeaturesGrid />
      <CostCalculator />
      <Testimonials />
      <SecuritySection />
      <AIResearchCTA />
      <BottomCTA />
    </>
  );
}
