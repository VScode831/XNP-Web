import type { Metadata } from "next";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { solutions } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Solutions", "Construction material solution pathways for waterproofing, roof renewal, tanking, green roofs and commercial building envelope systems.", "/solutions");

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="Application-Led Construction Material Systems" description="Find suitable product systems by roof, deck, below-ground, renewal or broader building envelope application." />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => <SolutionCard key={solution.id} solution={solution} />)}
        </div>
      </Section>
    </>
  );
}
