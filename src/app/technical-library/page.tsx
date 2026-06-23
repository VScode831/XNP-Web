import type { Metadata } from "next";
import { DocumentCard } from "@/components/cards/DocumentCard";
import { FilterPanel } from "@/components/forms/FilterPanel";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { getApplications, getDocuments, getDocumentTypes, getProductCategories } from "@/lib/contentRepository";
import { includesText } from "@/lib/filters";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Technical Library", "Request brochures, technical specifications, construction details and application procedures for XNP metal roof protection film.", "/technical-library");
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<Record<string, string | undefined>> };

export default async function TechnicalLibraryPage({ searchParams }: Props) {
  const params = await searchParams;
  const [technicalDocuments, productCategories] = await Promise.all([getDocuments(), getProductCategories()]);
  const applications = getApplications();
  const documentTypes = getDocumentTypes();
  const q = params.q ?? "";
  const category = params.category ?? "";
  const type = params.type ?? "";
  const application = params.application ?? "";
  const documents = technicalDocuments.filter((document) => {
    return (!category || document.category === category)
      && (!type || document.type === type)
      && (!application || document.application === application)
      && includesText([document.title, document.type, document.category, document.application], q);
  });

  return (
    <>
      <PageHero eyebrow="Technical Library" title="Source Documents for Metal Roof Protection Review" description="Request the brochure, technical specification, construction detail atlas and application procedure for the XNP self-fusing film system." />
      <Section>
        <FilterPanel filters={[
          { name: "category", label: "Product category", options: productCategories },
          { name: "type", label: "Document type", options: documentTypes },
          { name: "application", label: "Application", options: applications }
        ]} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((document) => <DocumentCard key={document.id} document={document} />)}
        </div>
      </Section>
    </>
  );
}
