import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("About", "Rhinora provides waterproofing systems, technical guidance and project support for the New Zealand market.", "/about");

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Rhinora" title="A Waterproofing Systems Partner for New Zealand Projects" description="Rhinora brings system-led waterproofing solutions to the New Zealand market, helping project teams connect building conditions, technical requirements and practical application." />
      <Section title="How We Add Value" description="We focus on the complete waterproofing pathway—from understanding the problem to supporting a suitable system response.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["System-led thinking", "We start with the substrate, exposure, failure points and project outcome before recommending a waterproofing pathway."],
            ["New Zealand market focus", "We communicate product and system information for local architects, contractors, installers and asset owners."],
            ["Technical transparency", "Recommendations and performance language are tied to available source documents and reviewed in the context of each project."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/65">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Our Current Specialist System" tone="white" description="Rhinora's featured XNP self-fusing film system is designed for renewing sound metal roof assets where continuous surface and detail protection may avoid repeated patching or premature replacement. Severely corroded panels still require structural review and replacement where needed." />
    </>
  );
}
