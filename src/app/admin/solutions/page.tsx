import { AdminTable } from "@/components/admin/AdminTable";
import { listAdminRows } from "@/lib/adminRepository";

export const dynamic = "force-dynamic";

export default async function AdminSolutionsPage() {
  return <AdminTable title="Solutions" resource="solutions" columns={["title", "slug", "summary", "status"]} rows={await listAdminRows("solutions")} />;
}
