import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocumentCard } from "@/components/cards/DocumentCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/site/ButtonLink";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { documentsForIds, findProduct, productsForIds, solutionsForIds } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  return pageMetadata(product.name, `${product.shortDescription} Product information for New Zealand construction projects.`, `/products/${slug}`);
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  const documents = documentsForIds(product.documentIds);
  const relatedSolutions = solutionsForIds(product.solutionIds);
  const relatedProducts = productsForIds(product.relatedProductIds).filter((item) => item.status === "published");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    category: product.category,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: "Rhinora" }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero eyebrow={product.category} title={product.name} description={product.description}>
        <div className="relative min-h-[280px] overflow-hidden rounded-sm border border-black/10 bg-forest-50">
          <Image src={product.image} alt="" fill className="object-cover" />
        </div>
      </PageHero>
      <Section title="Key Benefits">
        <div className="grid gap-3 md:grid-cols-3">
          {product.benefits.map((benefit) => <div key={benefit} className="rounded-sm border border-black/10 bg-white p-4 text-sm leading-6">{benefit}</div>)}
        </div>
      </Section>
      <Section title="Typical Applications" tone="white">
        <div className="flex flex-wrap gap-2">
          {product.applications.map((application) => <span key={application} className="rounded-sm bg-forest-50 px-3 py-2 text-sm font-semibold text-forest-900">{application}</span>)}
        </div>
      </Section>
      <Section title="Technical Specifications">
        <div className="overflow-hidden rounded-sm border border-black/10 bg-white">
          {Object.entries(product.specifications).map(([label, value]) => (
            <div key={label} className="grid border-b border-black/10 last:border-0 md:grid-cols-[240px_1fr]">
              <div className="bg-forest-50 px-4 py-3 text-sm font-semibold">{label}</div>
              <div className="px-4 py-3 text-sm text-ink/72">{value}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Compliance & Certification Placeholders" tone="white">
        <div className="grid gap-3 md:grid-cols-2">
          {product.compliance.map((item) => <div key={item} className="rounded-sm border border-black/10 p-4 text-sm font-semibold">{item}</div>)}
        </div>
      </Section>
      <Section title="Available Downloads">
        <div className="grid gap-5 md:grid-cols-2">
          {documents.map((document) => <DocumentCard key={document.id} document={document} />)}
        </div>
      </Section>
      <Section title="Related Solutions" tone="white">
        <div className="grid gap-3 md:grid-cols-3">
          {relatedSolutions.map((solution) => (
            <Link key={solution.id} href={`/solutions/${solution.slug}`} className="rounded-sm border border-black/10 p-4 font-semibold hover:bg-forest-50">
              {solution.title}
            </Link>
          ))}
        </div>
      </Section>
      <Section title="Related Products">
        <div className="grid gap-5 md:grid-cols-3">
          {relatedProducts.map((related) => <ProductCard key={related.id} product={related} />)}
        </div>
      </Section>
      <Section title="Product Enquiry" tone="dark">
        <div className="mb-5"><ButtonLink href="/contact" variant="secondary">Open Contact Page</ButtonLink></div>
        <ContactForm defaultType="Product enquiry" relatedProduct={product.name} />
      </Section>
    </>
  );
}
