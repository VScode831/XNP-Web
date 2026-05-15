import { AdminTable } from "@/components/admin/AdminTable";
import { projects } from "@/data/content";

export default function AdminProjectsPage() {
  return <AdminTable title="Projects / Case Studies" columns={["name", "slug", "sector", "location", "summary"]} rows={projects.map((project) => ({ id: project.id, name: project.name, slug: project.slug, sector: project.sector, location: project.location, summary: project.summary }))} />;
}
