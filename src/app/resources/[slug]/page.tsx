import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { findArticle } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    keywords: article.tags
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero eyebrow={article.category} title={article.title} description={article.excerpt} />
      <Section>
        <article className="max-w-3xl text-lg leading-8 text-ink/72">
          <p>{article.body}</p>
        </article>
        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => <span key={tag} className="rounded-sm bg-forest-50 px-3 py-2 text-sm font-semibold text-forest-900">{tag}</span>)}
        </div>
      </Section>
      <Section title="Ask Rhinora Technical Support" tone="white">
        <ContactForm defaultType="Technical support" />
      </Section>
    </>
  );
}
