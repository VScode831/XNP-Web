import { AdminTable } from "@/components/admin/AdminTable";
import { listAdminRows } from "@/lib/adminRepository";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  return <AdminTable title="Categories" resource="categories" columns={["type", "name", "slug"]} rows={await listAdminRows("categories")} />;
}
