import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("About", "Rhinora is the NZ-facing supplier and technical contact for XNP/Xiniupi metal roof protection film.", "/about");

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Rhinora" title="NZ-Facing Supplier for XNP Metal Roof Protection Technology" description="Rhinora connects New Zealand project teams with XNP/Xiniupi self-fusing functional film, technical documents and project review support for exposed metal roof renewal." />
      <Section title="Company Story">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["NZ market focus", "Rhinora presents the product and system information in language suited to local architects, contractors, installers and asset owners."],
            ["Source-backed content", "Technical claims are drawn from the supplied XNP/Xiniupi brochure, standard, detail atlas and application procedure."],
            ["Project review support", "Roof condition, substrate preparation, detail design and document needs are reviewed before a project-specific position is made."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/65">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Responsible Renewal" tone="white" description="The system is positioned for renewing sound metal roof assets where surface protection may avoid premature replacement. Severely corroded panels still need structural review and replacement where required." />
    </>
  );
}
