import type { Metadata } from "next";
import { ProductCard } from "@/components/cards/ProductCard";
import { FilterPanel } from "@/components/forms/FilterPanel";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { applications, productCategories, products } from "@/data/content";
import { includesText } from "@/lib/filters";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Products", "Search Rhinora construction material products by application, category and keyword.", "/products");

type Props = { searchParams: Promise<Record<string, string | undefined>> };

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q ?? "";
  const category = params.category ?? "";
  const application = params.application ?? "";
  const visibleProducts = products.filter((product) => {
    return product.status === "published"
      && (!category || product.category === category)
      && (!application || product.applications.includes(application as never))
      && includesText([product.name, product.shortDescription, product.category, ...product.applications], q);
  });

  return (
    <>
      <PageHero eyebrow="Products" title="Technical Construction Product Catalogue" description="Browse waterproofing membranes, roof protection, insulation, drainage, sealants and future building envelope materials by application or category." />
      <Section>
        <FilterPanel filters={[{ name: "category", label: "Category", options: productCategories }, { name: "application", label: "Application", options: applications }]} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </Section>
    </>
  );
}
