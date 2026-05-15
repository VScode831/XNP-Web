import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentCard } from "@/components/cards/DocumentCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { documentsForIds, findSolution, productsForIds } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = findSolution(slug);
  if (!solution) return {};
  return pageMetadata(solution.title, `${solution.summary} Technical construction product systems for New Zealand projects.`, `/solutions/${slug}`);
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = findSolution(slug);
  if (!solution) notFound();

  const recommendedProducts = productsForIds(solution.recommendedProductIds);
  const documents = documentsForIds(solution.documentIds);

  return (
    <>
      <PageHero eyebrow="Solution" title={solution.title} description={solution.overview} />
      <Section title="Suitable Applications">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {solution.applications.map((application) => <div key={application} className="rounded-sm border border-black/10 bg-white p-4 text-sm font-semibold">{application}</div>)}
        </div>
      </Section>
      <Section title="Recommended Product Systems" tone="white">
        <div className="grid gap-5 md:grid-cols-3">
          {recommendedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </Section>
      <Section title="Typical Build-Up / System Layers">
        <ol className="grid gap-3 md:grid-cols-2">
          {solution.layers.map((layer, index) => (
            <li key={layer} className="flex gap-4 rounded-sm border border-black/10 bg-white p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-forest-700 text-sm font-bold text-white">{index + 1}</span>
              <span className="font-medium">{layer}</span>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Benefits" tone="white">
        <div className="grid gap-3 md:grid-cols-3">
          {solution.benefits.map((benefit) => <div key={benefit} className="rounded-sm border border-black/10 p-4 text-sm leading-6">{benefit}</div>)}
        </div>
      </Section>
      <Section title="Related Technical Documents">
        <div className="grid gap-5 md:grid-cols-2">
          {documents.map((document) => <DocumentCard key={document.id} document={document} />)}
        </div>
      </Section>
      <Section title="Enquire About This Solution" tone="dark">
        <ContactForm defaultType="Technical support" relatedSolution={solution.title} />
      </Section>
    </>
  );
}
