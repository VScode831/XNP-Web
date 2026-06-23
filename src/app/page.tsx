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
        <div className="mx-auto grid min-h-[680px] max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-forest-700">Rhinora NZ distributor for XNP/Xiniupi technology</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight text-ink md:text-6xl">
              Metal Roof Protection for Leaking, Corroding and Overheating Roofs
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/68">
              Rhinora supplies XNP self-fusing functional film as a system-led protection pathway for sound architectural metal roofs that need more than repeated patch repairs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/system">View System</ButtonLink>
              <ButtonLink href="/products" variant="secondary">View Product</ButtonLink>
              <ButtonLink href="/technical-library" variant="ghost">Review Documents</ButtonLink>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-sm border border-black/10 bg-white shadow-soft">
            <Image src="/images/xnp-pm-rolls.png" alt="XNP metal roof protection membrane rolls" fill priority className="object-contain" />
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

      <Section title="Featured System" tone="white" description="One launch system, presented clearly instead of a broad catalogue of unrelated product categories.">
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
            <h2 className="text-3xl font-bold">Start with roof condition, then choose the protection method.</h2>
            <p className="mt-3 max-w-2xl text-white/70">Send roof photos, substrate condition, leak locations and document requirements. Rhinora can help frame the next technical review.</p>
          </div>
          <ButtonLink href="/contact" variant="secondary">Contact Rhinora</ButtonLink>
        </div>
      </Section>
    </>
  );
}
