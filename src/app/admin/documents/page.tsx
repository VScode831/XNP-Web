import { AdminTable } from "@/components/admin/AdminTable";
import { listAdminRows } from "@/lib/adminRepository";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
  return <AdminTable title="Documents" resource="documents" columns={["title", "type", "category", "application", "productId", "solutionId", "fileUrl", "version", "publishDate"]} rows={await listAdminRows("documents")} />;
}
