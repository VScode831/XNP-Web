import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards/ProductCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { findProject, productsForIds } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  return pageMetadata(project.name, project.summary, `/projects/${slug}`);
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const usedProducts = productsForIds(project.productIds);

  return (
    <>
      <PageHero eyebrow={`${project.sector} · ${project.location}`} title={project.name} description={project.overview}>
        <div className="relative min-h-[280px] overflow-hidden rounded-sm border border-black/10">
          <Image src={project.images[0]} alt="" fill className="object-cover" />
        </div>
      </PageHero>
      <Section title="Project Story">
        <div className="grid gap-5 md:grid-cols-3">
          {[["Challenge", project.challenge], ["Solution", project.solution], ["Result", project.result]].map(([title, text]) => (
            <article key={title} className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/66">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Products Used" tone="white">
        <div className="grid gap-5 md:grid-cols-3">
          {usedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </Section>
      <Section title="Discuss a Similar Project" tone="dark">
        <ContactForm defaultType="Technical support" />
      </Section>
    </>
  );
}
