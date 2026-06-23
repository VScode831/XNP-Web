import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentCard } from "@/components/cards/DocumentCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { documentsForIds, getDocuments, getProducts, getSolutionBySlug, productsForIds } from "@/lib/contentRepository";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const system = await getSolutionBySlug(slug);
  if (!system) return {};
  return pageMetadata(system.title, `${system.summary} Source-backed system information for NZ metal roof renewal projects.`, `/system/${slug}`);
}

export default async function SystemDetailPage({ params }: Props) {
  const { slug } = await params;
  const system = await getSolutionBySlug(slug);
  if (!system) notFound();

  const [allProducts, allDocuments] = await Promise.all([getProducts(), getDocuments()]);
  const recommendedProducts = productsForIds(allProducts, system.recommendedProductIds);
  const documents = documentsForIds(allDocuments, system.documentIds);
  const conditionChecks = [
    "Confirm corrosion has not removed the metal panel's required structural function",
    "Check coatings for chalking, delamination or contamination that would reduce adhesion",
    "Identify joints, fasteners, gutters, valleys, parapets and penetrations before large-area work",
    "Choose fusion dry-bonding for prepared metal substrates; review other substrates separately"
  ];

  return (
    <>
      <PageHero eyebrow="System" title={system.title} description={system.overview} />
      <Section title="When to Use This System">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {system.applications.map((application) => <div key={application} className="rounded-sm border border-black/10 bg-white p-4 text-sm font-semibold">{application}</div>)}
        </div>
      </Section>
      <Section title="Roof Condition Review" tone="white" description="The source procedure requires unsuitable corroded metal parts to be replaced before protection work. Rhinora should review project condition before any warranty or performance position is made.">
        <div className="grid gap-3 md:grid-cols-2">
          {conditionChecks.map((check) => <div key={check} className="rounded-sm border border-black/10 p-4 text-sm leading-6">{check}</div>)}
        </div>
      </Section>
      <Section title="System Sequence">
        <ol className="grid gap-3 md:grid-cols-2">
          {system.layers.map((layer, index) => (
            <li key={layer} className="flex gap-4 rounded-sm border border-black/10 bg-white p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-forest-700 text-sm font-bold text-white">{index + 1}</span>
              <span className="font-medium">{layer}</span>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Core Product" tone="white">
        <div className="grid gap-5 md:grid-cols-3">
          {recommendedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </Section>
      <Section title="Careful Benefits">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {system.benefits.map((benefit) => <div key={benefit} className="rounded-sm border border-black/10 bg-white p-4 text-sm leading-6">{benefit}</div>)}
        </div>
      </Section>
      <Section title="Related Technical Documents" tone="white">
        <div className="grid gap-5 md:grid-cols-2">
          {documents.map((document) => <DocumentCard key={document.id} document={document} />)}
        </div>
      </Section>
      <Section title="Discuss This Roof System" tone="dark">
        <ContactForm defaultType="Technical support" relatedSolution={system.title} />
      </Section>
    </>
  );
}
