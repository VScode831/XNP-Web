import type { Enquiry } from "@/types/content";
import {
  applications,
  articles,
  documentTypes,
  enquiries,
  productCategories,
  products,
  projects,
  solutions,
  technicalDocuments
} from "@/data/content";

type CategoryRow = {
  id: string;
  type: string;
  name: string;
  slug: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export async function getProducts() {
  return [...products];
}

export async function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export async function getSolutions() {
  return [...solutions];
}

export async function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}

export async function getDocuments() {
  return [...technicalDocuments];
}

export async function getProjects() {
  return [...projects];
}

export async function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function getArticles() {
  return [...articles];
}

export async function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export async function getEnquiries() {
  return [...enquiries];
}

export async function getCategories(): Promise<CategoryRow[]> {
  return [
    ...productCategories.map((name) => ({ id: `product-${slugify(name)}`, type: "Product category", name, slug: slugify(name) })),
    ...solutions.map((solution) => ({ id: `solution-${solution.id}`, type: "Solution category", name: solution.title, slug: solution.slug })),
    ...Array.from(new Set(articles.map((article) => article.category))).map((name) => ({
      id: `resource-${slugify(name)}`,
      type: "Resource category",
      name,
      slug: slugify(name)
    }))
  ];
}

export async function getProductCategories() {
  return [...productCategories];
}

export function getApplications() {
  return [...applications];
}

export function getDocumentTypes() {
  return [...documentTypes];
}

export async function createEnquiry(input: Record<string, unknown>): Promise<Enquiry> {
  return {
    id: `enq-${Date.now()}`,
    type: String(input.type ?? "General") as Enquiry["type"],
    name: String(input.name ?? ""),
    company: String(input.company ?? ""),
    email: String(input.email ?? ""),
    phone: input.phone ? String(input.phone) : undefined,
    message: String(input.message ?? ""),
    relatedProduct: input.relatedProduct ? String(input.relatedProduct) : undefined,
    relatedSolution: input.relatedSolution ? String(input.relatedSolution) : undefined,
    dateSubmitted: new Date().toISOString().slice(0, 10),
    status: "new"
  };
}

export function documentsForIds(documents: typeof technicalDocuments, ids: string[]) {
  return documents.filter((document) => ids.includes(document.id));
}

export function productsForIds(productsList: typeof products, ids: string[]) {
  return productsList.filter((product) => ids.includes(product.id));
}

export function solutionsForIds(solutionsList: typeof solutions, ids: string[]) {
  return solutionsList.filter((solution) => ids.includes(solution.id));
}
