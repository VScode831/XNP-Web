import { AdminTable } from "@/components/admin/AdminTable";
import { productCategories, solutions, articles } from "@/data/content";
import { unique } from "@/lib/filters";

export default function AdminCategoriesPage() {
  const rows = [
    ...productCategories.map((category) => ({ id: `product-${category}`, type: "Product category", name: category, slug: category.toLowerCase().replaceAll(" ", "-") })),
    ...solutions.map((solution) => ({ id: `solution-${solution.id}`, type: "Solution category", name: solution.title, slug: solution.slug })),
    ...unique(articles.map((article) => article.category)).map((category) => ({ id: `resource-${category}`, type: "Resource category", name: category, slug: category.replaceAll(" ", "-") }))
  ];

  return <AdminTable title="Categories" columns={["type", "name", "slug"]} rows={rows} />;
}
