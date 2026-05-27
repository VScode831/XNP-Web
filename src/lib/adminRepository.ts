import { prisma } from "@/lib/db";
import {
  getArticles,
  getCategories,
  getDocuments,
  getEnquiries,
  getProducts,
  getProjects,
  getSolutions
} from "@/lib/contentRepository";

export type AdminResource =
  | "articles"
  | "categories"
  | "documents"
  | "enquiries"
  | "products"
  | "projects"
  | "solutions";

export type AdminRow = Record<string, string | number | undefined>;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const idFrom = (prefix: string, row: AdminRow, fallback = Date.now()) =>
  String(row.id ?? `${prefix}-${slugify(String(row.slug ?? row.name ?? row.title ?? fallback)) || fallback}`);

const dateFrom = (value: unknown) => {
  const text = String(value ?? "").trim();
  return text ? new Date(`${text.slice(0, 10)}T00:00:00.000Z`) : new Date();
};

const stringifyList = (items: string[]) => JSON.stringify(items);
const stringifyJson = (value: unknown) => JSON.stringify(value ?? {});

function parseList(value: unknown): string[] {
  const text = String(value ?? "").trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text) as unknown;
    if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
  } catch {
    return text.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function parseObject(value: unknown): Record<string, string> {
  const text = String(value ?? "").trim();
  if (!text) return {};
  try {
    const parsed = JSON.parse(text) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed as Record<string, string>;
  } catch {
    return {};
  }
  return {};
}

async function syncProductLinks(id: string, row: AdminRow) {
  await prisma.productDocument.deleteMany({ where: { productId: id } });
  await prisma.productSolution.deleteMany({ where: { productId: id } });
  await prisma.relatedProduct.deleteMany({ where: { productId: id } });
  await Promise.all([
    ...parseList(row.documentIds).map((documentId) => prisma.productDocument.create({ data: { productId: id, documentId } })),
    ...parseList(row.solutionIds).map((solutionId) => prisma.productSolution.create({ data: { productId: id, solutionId } })),
    ...parseList(row.relatedProductIds).map((relatedProductId) => prisma.relatedProduct.create({ data: { productId: id, relatedProductId } }))
  ]);
}

async function syncSolutionLinks(id: string, row: AdminRow) {
  await prisma.productSolution.deleteMany({ where: { solutionId: id } });
  await prisma.solutionDocument.deleteMany({ where: { solutionId: id } });
  await Promise.all([
    ...parseList(row.recommendedProductIds).map((productId) => prisma.productSolution.create({ data: { productId, solutionId: id } })),
    ...parseList(row.documentIds).map((documentId) => prisma.solutionDocument.create({ data: { solutionId: id, documentId } }))
  ]);
}

async function syncDocumentLinks(id: string, row: AdminRow) {
  await prisma.productDocument.deleteMany({ where: { documentId: id } });
  await prisma.solutionDocument.deleteMany({ where: { documentId: id } });
  if (row.productId) await prisma.productDocument.create({ data: { productId: String(row.productId), documentId: id } });
  if (row.solutionId) await prisma.solutionDocument.create({ data: { solutionId: String(row.solutionId), documentId: id } });
}

async function syncProjectLinks(id: string, row: AdminRow) {
  await prisma.projectProduct.deleteMany({ where: { projectId: id } });
  await Promise.all(parseList(row.productIds).map((productId) => prisma.projectProduct.create({ data: { projectId: id, productId } })));
}

export async function listAdminRows(resource: AdminResource): Promise<AdminRow[]> {
  if (resource === "products") {
    return (await getProducts()).map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      shortDescription: product.shortDescription,
      description: product.description,
      applications: stringifyList(product.applications),
      benefits: stringifyList(product.benefits),
      specifications: stringifyJson(product.specifications),
      compliance: stringifyList(product.compliance),
      documentIds: stringifyList(product.documentIds),
      solutionIds: stringifyList(product.solutionIds),
      relatedProductIds: stringifyList(product.relatedProductIds),
      image: product.image,
      status: product.status
    }));
  }
  if (resource === "solutions") {
    return (await getSolutions()).map((solution) => ({
      id: solution.id,
      title: solution.title,
      slug: solution.slug,
      summary: solution.summary,
      overview: solution.overview,
      applications: stringifyList(solution.applications),
      recommendedProductIds: stringifyList(solution.recommendedProductIds),
      layers: stringifyList(solution.layers),
      benefits: stringifyList(solution.benefits),
      documentIds: stringifyList(solution.documentIds),
      image: solution.image,
      status: solution.status
    }));
  }
  if (resource === "documents") {
    return (await getDocuments()).map((document) => ({
      id: document.id,
      title: document.title,
      type: document.type,
      category: document.category,
      application: document.application,
      productId: document.productId,
      solutionId: document.solutionId,
      fileUrl: document.fileUrl,
      version: document.version,
      publishDate: document.publishDate
    }));
  }
  if (resource === "projects") {
    return (await getProjects()).map((project) => ({
      id: project.id,
      name: project.name,
      slug: project.slug,
      sector: project.sector,
      location: project.location,
      productIds: stringifyList(project.productIds),
      summary: project.summary,
      overview: project.overview,
      challenge: project.challenge,
      solution: project.solution,
      result: project.result,
      images: stringifyList(project.images)
    }));
  }
  if (resource === "articles") {
    return (await getArticles()).map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt,
      body: article.body,
      seoTitle: article.seoTitle,
      metaDescription: article.metaDescription,
      tags: stringifyList(article.tags),
      publishDate: article.publishDate
    }));
  }
  if (resource === "categories") {
    return (await getCategories()).map((category) => ({
      id: category.id,
      type: category.type,
      name: category.name,
      slug: category.slug
    }));
  }
  return (await getEnquiries()).map((enquiry) => ({
    id: enquiry.id,
    type: enquiry.type,
    name: enquiry.name,
    company: enquiry.company,
    email: enquiry.email,
    phone: enquiry.phone,
    message: enquiry.message,
    relatedProduct: enquiry.relatedProduct,
    relatedSolution: enquiry.relatedSolution,
    dateSubmitted: enquiry.dateSubmitted,
    status: enquiry.status
  }));
}

export async function createAdminRow(resource: AdminResource, row: AdminRow) {
  let createdId = "";
  if (resource === "products") {
    const name = String(row.name ?? "New product");
    const slug = String(row.slug ?? slugify(name));
    createdId = idFrom("product", { ...row, slug });
    await prisma.product.create({
      data: {
        id: createdId,
        name,
        slug,
        category: String(row.category ?? "Future Construction Materials"),
        shortDescription: String(row.shortDescription ?? ""),
        description: String(row.description ?? row.shortDescription ?? ""),
        applications: parseList(row.applications),
        benefits: parseList(row.benefits),
        specifications: parseObject(row.specifications),
        compliance: parseList(row.compliance),
        image: String(row.image ?? "/images/product-future.svg"),
        status: String(row.status ?? "draft")
      }
    });
    await syncProductLinks(createdId, row);
  } else if (resource === "solutions") {
    const title = String(row.title ?? "New solution");
    const slug = String(row.slug ?? slugify(title));
    createdId = idFrom("solution", { ...row, slug, title });
    await prisma.solution.create({
      data: {
        id: createdId,
        title,
        slug,
        summary: String(row.summary ?? ""),
        overview: String(row.overview ?? row.summary ?? ""),
        applications: parseList(row.applications),
        layers: parseList(row.layers),
        benefits: parseList(row.benefits),
        image: String(row.image ?? "/images/envelope.svg"),
        status: String(row.status ?? "draft")
      }
    });
    await syncSolutionLinks(createdId, row);
  } else if (resource === "documents") {
    const title = String(row.title ?? "New document");
    createdId = idFrom("document", { ...row, title });
    await prisma.technicalDocument.create({
      data: {
        id: createdId,
        title,
        type: String(row.type ?? "Technical data sheet"),
        category: String(row.category ?? "Future Construction Materials"),
        application: String(row.application ?? "General construction"),
        fileUrl: String(row.fileUrl ?? "/downloads/placeholder.pdf"),
        version: String(row.version ?? "Draft"),
        publishDate: dateFrom(row.publishDate)
      }
    });
    await syncDocumentLinks(createdId, row);
  } else if (resource === "projects") {
    const name = String(row.name ?? "New project");
    const slug = String(row.slug ?? slugify(name));
    createdId = idFrom("project", { ...row, slug });
    await prisma.project.create({
      data: {
        id: createdId,
        name,
        slug,
        sector: String(row.sector ?? "commercial"),
        location: String(row.location ?? ""),
        summary: String(row.summary ?? ""),
        overview: String(row.overview ?? row.summary ?? ""),
        challenge: String(row.challenge ?? ""),
        solution: String(row.solution ?? ""),
        result: String(row.result ?? ""),
        images: parseList(row.images).length ? parseList(row.images) : ["/images/project-industrial.svg"]
      }
    });
    await syncProjectLinks(createdId, row);
  } else if (resource === "articles") {
    const title = String(row.title ?? "New article");
    const slug = String(row.slug ?? slugify(title));
    createdId = idFrom("article", { ...row, slug, title });
    await prisma.article.create({
      data: {
        id: createdId,
        title,
        slug,
        category: String(row.category ?? "product guidance"),
        excerpt: String(row.excerpt ?? row.metaDescription ?? ""),
        body: String(row.body ?? ""),
        seoTitle: String(row.seoTitle ?? title),
        metaDescription: String(row.metaDescription ?? ""),
        tags: parseList(row.tags),
        publishDate: dateFrom(row.publishDate)
      }
    });
  } else if (resource === "categories") {
    const name = String(row.name ?? "New category");
    const slug = String(row.slug ?? slugify(name));
    createdId = idFrom("category", { ...row, slug, name });
    await prisma.category.create({
      data: {
        id: createdId,
        type: String(row.type ?? "Product category"),
        name,
        slug
      }
    });
  } else {
    createdId = idFrom("enq", row);
    await prisma.enquiry.create({
      data: {
        id: createdId,
        type: String(row.type ?? "General"),
        name: String(row.name ?? ""),
        company: String(row.company ?? ""),
        email: String(row.email ?? ""),
        phone: row.phone ? String(row.phone) : null,
        message: String(row.message ?? ""),
        relatedProduct: row.relatedProduct ? String(row.relatedProduct) : null,
        relatedSolution: row.relatedSolution ? String(row.relatedSolution) : null,
        dateSubmitted: dateFrom(row.dateSubmitted),
        status: String(row.status ?? "new")
      }
    });
  }

  return (await listAdminRows(resource)).find((item) => item.id === createdId) ?? (await listAdminRows(resource))[0];
}

export async function updateAdminRow(resource: AdminResource, id: string, row: AdminRow) {
  if (resource === "products") {
    await prisma.product.update({
      where: { id },
      data: {
        name: String(row.name ?? ""),
        slug: String(row.slug ?? ""),
        category: String(row.category ?? ""),
        shortDescription: String(row.shortDescription ?? ""),
        description: String(row.description ?? ""),
        applications: parseList(row.applications),
        benefits: parseList(row.benefits),
        specifications: parseObject(row.specifications),
        compliance: parseList(row.compliance),
        image: String(row.image ?? ""),
        status: String(row.status ?? "draft")
      }
    });
    await syncProductLinks(id, row);
  } else if (resource === "solutions") {
    await prisma.solution.update({
      where: { id },
      data: {
        title: String(row.title ?? ""),
        slug: String(row.slug ?? ""),
        summary: String(row.summary ?? ""),
        overview: String(row.overview ?? ""),
        applications: parseList(row.applications),
        layers: parseList(row.layers),
        benefits: parseList(row.benefits),
        image: String(row.image ?? ""),
        status: String(row.status ?? "draft")
      }
    });
    await syncSolutionLinks(id, row);
  } else if (resource === "documents") {
    await prisma.technicalDocument.update({
      where: { id },
      data: {
        title: String(row.title ?? ""),
        type: String(row.type ?? ""),
        category: String(row.category ?? ""),
        application: String(row.application ?? ""),
        fileUrl: String(row.fileUrl ?? ""),
        version: String(row.version ?? ""),
        publishDate: dateFrom(row.publishDate)
      }
    });
    await syncDocumentLinks(id, row);
  } else if (resource === "projects") {
    await prisma.project.update({
      where: { id },
      data: {
        name: String(row.name ?? ""),
        slug: String(row.slug ?? ""),
        sector: String(row.sector ?? ""),
        location: String(row.location ?? ""),
        summary: String(row.summary ?? ""),
        overview: String(row.overview ?? ""),
        challenge: String(row.challenge ?? ""),
        solution: String(row.solution ?? ""),
        result: String(row.result ?? ""),
        images: parseList(row.images)
      }
    });
    await syncProjectLinks(id, row);
  } else if (resource === "articles") {
    await prisma.article.update({
      where: { id },
      data: {
        title: String(row.title ?? ""),
        slug: String(row.slug ?? ""),
        category: String(row.category ?? ""),
        excerpt: String(row.excerpt ?? ""),
        body: String(row.body ?? ""),
        seoTitle: String(row.seoTitle ?? ""),
        metaDescription: String(row.metaDescription ?? ""),
        tags: parseList(row.tags),
        publishDate: dateFrom(row.publishDate)
      }
    });
  } else if (resource === "categories") {
    await prisma.category.update({
      where: { id },
      data: {
        type: String(row.type ?? ""),
        name: String(row.name ?? ""),
        slug: String(row.slug ?? "")
      }
    });
  } else {
    await prisma.enquiry.update({
      where: { id },
      data: {
        type: String(row.type ?? "General"),
        name: String(row.name ?? ""),
        company: String(row.company ?? ""),
        email: String(row.email ?? ""),
        phone: row.phone ? String(row.phone) : null,
        message: String(row.message ?? ""),
        relatedProduct: row.relatedProduct ? String(row.relatedProduct) : null,
        relatedSolution: row.relatedSolution ? String(row.relatedSolution) : null,
        dateSubmitted: dateFrom(row.dateSubmitted),
        status: String(row.status ?? "new")
      }
    });
  }

  return (await listAdminRows(resource)).find((item) => item.id === id);
}

export async function deleteAdminRow(resource: AdminResource, id: string) {
  if (resource === "products") await prisma.product.delete({ where: { id } });
  else if (resource === "solutions") await prisma.solution.delete({ where: { id } });
  else if (resource === "documents") await prisma.technicalDocument.delete({ where: { id } });
  else if (resource === "projects") await prisma.project.delete({ where: { id } });
  else if (resource === "articles") await prisma.article.delete({ where: { id } });
  else if (resource === "categories") await prisma.category.delete({ where: { id } });
  else await prisma.enquiry.delete({ where: { id } });
}
