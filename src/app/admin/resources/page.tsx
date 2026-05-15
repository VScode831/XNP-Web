import { AdminTable } from "@/components/admin/AdminTable";
import { articles } from "@/data/content";

export default function AdminResourcesPage() {
  return <AdminTable title="Blog / Resources" columns={["title", "slug", "category", "seoTitle", "metaDescription"]} rows={articles.map((article) => ({ id: article.id, title: article.title, slug: article.slug, category: article.category, seoTitle: article.seoTitle, metaDescription: article.metaDescription }))} />;
}
