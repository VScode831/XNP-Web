import { AdminTable } from "@/components/admin/AdminTable";
import { listAdminRows } from "@/lib/adminRepository";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  return <AdminTable title="Products" resource="products" columns={["name", "slug", "category", "shortDescription", "status"]} rows={await listAdminRows("products")} />;
}
