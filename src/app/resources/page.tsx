import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { getArticles } from "@/lib/contentRepository";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Resources", "Articles about metal roof renewal, corrosion, leakage, patch repair limits and self-fusing film design considerations.", "/resources");
export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero eyebrow="Resources" title="Metal Roof Protection Articles" description="Practical guidance for identifying roof renewal timing, understanding patch repair limits and reviewing self-fusing film design considerations." />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/resources/${article.slug}`} className="rounded-sm border border-black/10 bg-white p-5 shadow-soft hover:bg-forest-50">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-forest-700">{article.category}</p>
              <h2 className="mt-2 text-lg font-semibold">{article.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/64">{article.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-sm bg-white px-2 py-1 text-xs text-ink/70">{tag}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
