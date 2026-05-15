import { AdminTable } from "@/components/admin/AdminTable";
import { products } from "@/data/content";

export default function AdminProductsPage() {
  return <AdminTable title="Products" columns={["name", "slug", "category", "shortDescription", "status"]} rows={products.map((product) => ({ id: product.id, name: product.name, slug: product.slug, category: product.category, shortDescription: product.shortDescription, status: product.status }))} />;
}
