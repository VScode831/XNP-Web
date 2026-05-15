import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("About", "Rhinora is a New Zealand-focused construction materials supplier built for technical support, quality supply and future envelope product expansion.", "/about");

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Rhinora" title="A New Zealand-Focused Technical Materials Supplier" description="Rhinora is positioned to launch with waterproofing membrane and material products, while keeping the brand and platform open for broader construction material categories." />
      <Section title="Company Story">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["NZ market focus", "Content, support and product pathways are structured around New Zealand construction workflows and terminology."],
            ["Quality supply", "The site presents products as system components with compatible documents, applications and related products."],
            ["Long-term support", "The platform is ready for product expansion, technical enquiries, project resources and future CMS/database integration."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/65">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Sustainability Placeholder" tone="white" description="Future content can cover durability, roof renewal, thermal performance, green roof readiness, solar readiness and responsible material sourcing." />
    </>
  );
}
