import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FilterPanel } from "@/components/forms/FilterPanel";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { getProjects } from "@/lib/contentRepository";
import { includesText } from "@/lib/filters";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Projects", "Rhinora project case studies for commercial, residential, industrial, education and healthcare sectors.", "/projects");
export const dynamic = "force-dynamic";

const sectors = ["commercial", "residential", "industrial", "education", "healthcare"] as const;
type Props = { searchParams: Promise<Record<string, string | undefined>> };

export default async function ProjectsPage({ searchParams }: Props) {
  const params = await searchParams;
  const projects = await getProjects();
  const sector = params.sector ?? "";
  const q = params.q ?? "";
  const visible = projects.filter((project) => (!sector || project.sector === sector) && includesText([project.name, project.location, project.summary, project.sector], q));

  return (
    <>
      <PageHero eyebrow="Projects" title="Case Studies Across NZ Construction Sectors" description="Project examples show how products, applications and technical documents connect in real specification workflows." />
      <Section>
        <FilterPanel searchLabel="Search projects" filters={[{ name: "sector", label: "Sector", options: sectors }]} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group overflow-hidden rounded-sm border border-black/10 bg-white shadow-soft">
              <div className="relative h-44">
                <Image src={project.images[0]} alt="" fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-forest-700">{project.sector} · {project.location}</p>
                <h2 className="mt-2 text-lg font-semibold">{project.name}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/64">{project.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
