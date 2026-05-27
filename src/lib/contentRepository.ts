import { prisma } from "@/lib/db";
import type { Article, Enquiry, Product, Project, Solution, TechnicalDocument } from "@/types/content";
import {
  articles as mockArticles,
  applications,
  documentTypes,
  enquiries as mockEnquiries,
  productCategories,
  products as mockProducts,
  projects as mockProjects,
  solutions as mockSolutions,
  technicalDocuments as mockDocuments
} from "@/data/content";
import type {
  Article as DbArticle,
  Category as DbCategory,
  Enquiry as DbEnquiry,
  Product as DbProduct,
  Project as DbProject,
  Solution as DbSolution,
  TechnicalDocument as DbDocument
} from "@prisma/client";

type ProductRecord = DbProduct & {
  documents: Array<{ documentId: string }>;
  relatedFrom: Array<{ relatedProductId: string }>;
  solutions: Array<{ solutionId: string }>;
};

type SolutionRecord = DbSolution & {
  documents: Array<{ documentId: string }>;
  recommendedProducts: Array<{ productId: string }>;
};

type DocumentRecord = DbDocument & {
  products: Array<{ productId: string }>;
  solutions: Array<{ solutionId: string }>;
};

type ProjectRecord = DbProject & {
  products: Array<{ productId: string }>;
};

const productInclude = { documents: true, relatedFrom: true, solutions: true };
const solutionInclude = { documents: true, recommendedProducts: true };
const documentInclude = { products: true, solutions: true };
const projectInclude = { products: true };

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function toProduct(product: ProductRecord): Product {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category as Product["category"],
    shortDescription: product.shortDescription,
    description: product.description,
    applications: asStringArray(product.applications) as Product["applications"],
    benefits: asStringArray(product.benefits),
    specifications: (product.specifications ?? {}) as Record<string, string>,
    compliance: asStringArray(product.compliance),
    documentIds: product.documents.map((link) => link.documentId),
    solutionIds: product.solutions.map((link) => link.solutionId),
    relatedProductIds: product.relatedFrom.map((link) => link.relatedProductId),
    image: product.image,
    status: product.status as Product["status"]
  };
}

function toSolution(solution: SolutionRecord): Solution {
  return {
    id: solution.id,
    title: solution.title,
    slug: solution.slug,
    summary: solution.summary,
    overview: solution.overview,
    applications: asStringArray(solution.applications),
    recommendedProductIds: solution.recommendedProducts.map((link) => link.productId),
    layers: asStringArray(solution.layers),
    benefits: asStringArray(solution.benefits),
    documentIds: solution.documents.map((link) => link.documentId),
    image: solution.image,
    status: solution.status as Solution["status"]
  };
}

function toDocument(document: DocumentRecord): TechnicalDocument {
  return {
    id: document.id,
    title: document.title,
    type: document.type as TechnicalDocument["type"],
    productId: document.products[0]?.productId,
    solutionId: document.solutions[0]?.solutionId,
    category: document.category as TechnicalDocument["category"],
    application: document.application as TechnicalDocument["application"],
    fileUrl: document.fileUrl,
    version: document.version,
    publishDate: document.publishDate.toISOString().slice(0, 10)
  };
}

function toProject(project: ProjectRecord): Project {
  return {
    id: project.id,
    name: project.name,
    slug: project.slug,
    sector: project.sector as Project["sector"],
    location: project.location,
    summary: project.summary,
    overview: project.overview,
    challenge: project.challenge,
    solution: project.solution,
    result: project.result,
    productIds: project.products.map((link) => link.productId),
    images: asStringArray(project.images)
  };
}

function toArticle(article: DbArticle): Article {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category as Article["category"],
    excerpt: article.excerpt,
    body: article.body,
    seoTitle: article.seoTitle,
    metaDescription: article.metaDescription,
    tags: asStringArray(article.tags),
    publishDate: article.publishDate.toISOString().slice(0, 10)
  };
}

function toEnquiry(enquiry: DbEnquiry): Enquiry {
  return {
    id: enquiry.id,
    type: enquiry.type as Enquiry["type"],
    name: enquiry.name,
    company: enquiry.company,
    email: enquiry.email,
    phone: enquiry.phone ?? undefined,
    message: enquiry.message,
    relatedProduct: enquiry.relatedProduct ?? undefined,
    relatedSolution: enquiry.relatedSolution ?? undefined,
    dateSubmitted: enquiry.dateSubmitted.toISOString().slice(0, 10),
    status: enquiry.status as Enquiry["status"]
  };
}

async function fallback<T>(query: () => Promise<T>, mock: T): Promise<T> {
  try {
    return await query();
  } catch {
    return mock;
  }
}

export async function getProducts() {
  return fallback(
    async () => (await prisma.product.findMany({ include: productInclude, orderBy: { sortOrder: "asc" } })).map(toProduct),
    mockProducts
  );
}

export async function getProductBySlug(slug: string) {
  return fallback(
    async () => {
      const product = await prisma.product.findUnique({ where: { slug }, include: productInclude });
      return product ? toProduct(product) : undefined;
    },
    mockProducts.find((product) => product.slug === slug)
  );
}

export async function getSolutions() {
  return fallback(
    async () => (await prisma.solution.findMany({ include: solutionInclude, orderBy: { sortOrder: "asc" } })).map(toSolution),
    mockSolutions
  );
}

export async function getSolutionBySlug(slug: string) {
  return fallback(
    async () => {
      const solution = await prisma.solution.findUnique({ where: { slug }, include: solutionInclude });
      return solution ? toSolution(solution) : undefined;
    },
    mockSolutions.find((solution) => solution.slug === slug)
  );
}

export async function getDocuments() {
  return fallback(
    async () => (await prisma.technicalDocument.findMany({ include: documentInclude, orderBy: { sortOrder: "asc" } })).map(toDocument),
    mockDocuments
  );
}

export async function getProjects() {
  return fallback(
    async () => (await prisma.project.findMany({ include: projectInclude, orderBy: { sortOrder: "asc" } })).map(toProject),
    mockProjects
  );
}

export async function getProjectBySlug(slug: string) {
  return fallback(
    async () => {
      const project = await prisma.project.findUnique({ where: { slug }, include: projectInclude });
      return project ? toProject(project) : undefined;
    },
    mockProjects.find((project) => project.slug === slug)
  );
}

export async function getArticles() {
  return fallback(async () => (await prisma.article.findMany({ orderBy: { sortOrder: "asc" } })).map(toArticle), mockArticles);
}

export async function getArticleBySlug(slug: string) {
  return fallback(
    async () => {
      const article = await prisma.article.findUnique({ where: { slug } });
      return article ? toArticle(article) : undefined;
    },
    mockArticles.find((article) => article.slug === slug)
  );
}

export async function getEnquiries() {
  return fallback(async () => (await prisma.enquiry.findMany({ orderBy: { dateSubmitted: "desc" } })).map(toEnquiry), mockEnquiries);
}

export async function getCategories() {
  return fallback(
    async () => prisma.category.findMany({ orderBy: [{ type: "asc" }, { sortOrder: "asc" }] }),
    [
      ...productCategories.map((name) => ({ id: `product-${name}`, type: "Product category", name, slug: name.toLowerCase().replaceAll(" ", "-") })),
      ...mockSolutions.map((solution) => ({ id: `solution-${solution.id}`, type: "Solution category", name: solution.title, slug: solution.slug })),
      ...Array.from(new Set(mockArticles.map((article) => article.category))).map((name) => ({ id: `resource-${name}`, type: "Resource category", name, slug: name.replaceAll(" ", "-") }))
    ] as DbCategory[]
  );
}

export async function getProductCategories() {
  const categories = await getCategories();
  const productRows = categories.filter((category) => category.type === "Product category").map((category) => category.name);
  return productRows.length ? productRows : [...productCategories];
}

export function getApplications() {
  return [...applications];
}

export function getDocumentTypes() {
  return [...documentTypes];
}

export async function createEnquiry(input: Record<string, unknown>) {
  const id = `enq-${Date.now()}`;
  const enquiry = await prisma.enquiry.create({
    data: {
      id,
      type: String(input.type ?? "General"),
      name: String(input.name ?? ""),
      company: String(input.company ?? ""),
      email: String(input.email ?? ""),
      phone: input.phone ? String(input.phone) : null,
      message: String(input.message ?? ""),
      relatedProduct: input.relatedProduct ? String(input.relatedProduct) : null,
      relatedSolution: input.relatedSolution ? String(input.relatedSolution) : null,
      status: "new"
    }
  });
  return toEnquiry(enquiry);
}

export function documentsForIds(documents: TechnicalDocument[], ids: string[]) {
  return documents.filter((document) => ids.includes(document.id));
}

export function productsForIds(products: Product[], ids: string[]) {
  return products.filter((product) => ids.includes(product.id));
}

export function solutionsForIds(solutions: Solution[], ids: string[]) {
  return solutions.filter((solution) => ids.includes(solution.id));
}
