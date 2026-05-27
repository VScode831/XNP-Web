import { AdminTable } from "@/components/admin/AdminTable";
import { listAdminRows } from "@/lib/adminRepository";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  return <AdminTable title="Blog / Resources" resource="articles" columns={["title", "slug", "category", "excerpt", "body", "seoTitle", "metaDescription", "tags", "publishDate"]} rows={await listAdminRows("articles")} />;
}
