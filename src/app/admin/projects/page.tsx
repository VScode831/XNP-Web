import { AdminTable } from "@/components/admin/AdminTable";
import { listAdminRows } from "@/lib/adminRepository";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  return <AdminTable title="Projects / Case Studies" resource="projects" columns={["name", "slug", "sector", "location", "summary"]} rows={await listAdminRows("projects")} />;
}
