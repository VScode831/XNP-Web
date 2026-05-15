import { AdminTable } from "@/components/admin/AdminTable";
import { solutions } from "@/data/content";

export default function AdminSolutionsPage() {
  return <AdminTable title="Solutions" columns={["title", "slug", "summary", "status"]} rows={solutions.map((solution) => ({ id: solution.id, title: solution.title, slug: solution.slug, summary: solution.summary, status: solution.status }))} />;
}
