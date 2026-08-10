import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, LifeBuoy, ShieldCheck, ThermometerSun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DocumentCard } from "@/components/cards/DocumentCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Section } from "@/components/site/Section";
import { getDocuments, getProducts, getProjects, getSolutions } from "@/lib/contentRepository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [documents, products, projects, systems] = await Promise.all([
    getDocuments(),
    getProducts(),
    getProjects(),
    getSolutions()
  ]);
  const proofPoints: Array<[string, LucideIcon, string]> = [
    ["Self-fusing seal", ShieldCheck, "Modified butyl rubber adhesive is designed to fuse with prepared metal substrates and reduce water tracking risk."],
    ["Weather-resistant facing", ThermometerSun, "PVDF/PET facing supports exposed UV and weather resistance while reflecting solar heat."],
    ["Detail-led system", LifeBuoy, "The system sequence treats gutters, valleys, fasteners, penetrations and other weak points before large-area work."],
    ["Source-backed documents", FileText, "Brochure, technical specification, construction detail atlas and application procedure are available for review."]
  ];
  const risks = [
    "Leaks around laps, fasteners, gutters and penetrations",
    "Corrosion that accelerates after coatings break down",
    "Heat gain and work environment discomfort under exposed metal roofs"
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-black/10 bg-white">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-forest-900 lg:block" />
        <div className="pointer-events-none absolute left-[-8rem] top-[-10rem] h-80 w-80 rounded-full bg-forest-100/70 blur-3xl" />
        <div className="mx-auto grid min-h-[680px] max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-forest-700">Waterproofing systems for New Zealand</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight text-ink md:text-6xl">
              Waterproofing Systems for New Zealand Buildings
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/68">
              Rhinora provides system-led waterproofing solutions for the New Zealand market, helping specifiers, contractors and asset owners move from technical review to a practical project pathway.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/system">Explore Our Systems</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">Discuss a Project</ButtonLink>
              <ButtonLink href="/technical-library" variant="ghost">Technical Library</ButtonLink>
            </div>
          </div>
          <div className="relative z-10 min-h-[440px] overflow-hidden rounded-sm border border-white/20 bg-white shadow-soft">
            <Image src="/images/metal-roof-protection-system-photo.png" alt="Waterproofing film applied over an architectural metal roof profile" fill priority className="object-cover" />
            <div className="absolute inset-x-4 bottom-4 border border-white/20 bg-ink/90 p-5 text-white backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">Featured specialist system</p>
              <p className="mt-2 text-lg font-semibold">XNP self-fusing metal roof protection</p>
              <p className="mt-1 text-sm leading-6 text-white/70">A continuous, detail-led renewal pathway for sound metal roof substrates.</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 border-t border-black/10 bg-[#f7f6f1]">
          <div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-5 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
            {[
              ["01", "Understand the building", "Review the substrate, exposure, failure points and project constraints."],
              ["02", "Select the system", "Match the waterproofing approach to the condition and intended outcome."],
              ["03", "Support delivery", "Provide clear technical information for detailing, application and review."]
            ].map(([number, title, text]) => (
              <div key={number} className="py-6 md:px-6 md:first:pl-0 md:last:pr-0">
                <p className="text-xs font-bold tracking-[0.16em] text-clay">{number}</p>
                <h2 className="mt-2 font-semibold text-ink">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/64">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Why Metal Roofs Need System-Led Protection" description="The source materials identify leakage, corrosion and heat as common problems when exposed metal roofs enter their maintenance window.">
        <div className="grid gap-4 md:grid-cols-3">
          {risks.map((risk) => (
            <article key={risk} className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
              <h3 className="font-semibold text-ink">{risk}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/64">A local patch can miss movement, water paths and neighbouring detail zones. The roof condition should be reviewed as a whole before renewal work.</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Our Featured Waterproofing System" tone="white" description="Rhinora's current specialist offering addresses metal roof leakage, corrosion and vulnerable details through one coordinated protection method.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {systems.map((system) => <SolutionCard key={system.id} solution={system} />)}
        </div>
      </Section>

      <Section title="Core Product">
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </Section>

      <Section title="Careful Technical Claims" tone="white" description="Performance language is tied to the supplied source documents and should be reviewed project by project.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map(([title, Icon, text]) => (
            <div key={title} className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
              <Icon className="text-forest-700" size={24} />
              <h3 className="mt-4 font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/64">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Technical Document Set" description="The large brochure is request-only until it is optimized for web delivery.">
        <div className="grid gap-5 md:grid-cols-2">
          {documents.slice(0, 4).map((document) => <DocumentCard key={document.id} document={document} />)}
        </div>
      </Section>

      <Section title="Application Examples" tone="white">
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="rounded-sm border border-black/10 p-5 hover:bg-forest-50">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-700">{project.sector}</p>
              <h3 className="mt-2 font-semibold text-ink">{project.name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/64">{project.summary}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">Read example <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Start with the waterproofing problem, not a product list.</h2>
            <p className="mt-3 max-w-2xl text-white/70">Share the building condition, leak locations, substrate information and project priorities. Rhinora can help frame the right technical review and next step.</p>
          </div>
          <ButtonLink href="/contact" variant="secondary">Contact Rhinora</ButtonLink>
        </div>
      </Section>
    </>
  );
}
