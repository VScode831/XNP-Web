import type { Metadata } from "next";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { getSolutions } from "@/lib/contentRepository";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "System",
  "XNP self-fusing metal roof protection system supplied by Rhinora for New Zealand roof renewal projects.",
  "/system"
);
export const dynamic = "force-dynamic";

export default async function SystemPage() {
  const systems = await getSolutions();

  return (
    <>
      <PageHero
        eyebrow="System"
        title="Metal Roof Protection System"
        description="A system-led pathway for renewing sound metal roofs affected by leakage, corrosion, heat and vulnerable detail zones."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {systems.map((system) => <SolutionCard key={system.id} solution={system} />)}
        </div>
      </Section>
    </>
  );
}
