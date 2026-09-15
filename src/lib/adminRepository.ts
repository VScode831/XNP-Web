import {
  getCategories,
  getDocuments,
  getProducts,
  getProjects,
  getSolutions
} from "@/lib/contentRepository";
import { listEnquiries } from "@/lib/enquiryRepository";

export type AdminResource =
  | "categories"
  | "documents"
  | "enquiries"
  | "products"
  | "projects"
  | "solutions";

export type AdminRow = Record<string, string | number | undefined>;

export async function listAdminRows(resource: AdminResource): Promise<AdminRow[]> {
  if (resource === "products") {
    return (await getProducts()).map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      shortDescription: product.shortDescription,
      status: product.status
    }));
  }
  if (resource === "solutions") {
    return (await getSolutions()).map((solution) => ({
      id: solution.id,
      title: solution.title,
      slug: solution.slug,
      summary: solution.summary,
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
      summary: project.summary
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
  return (await listEnquiries()).map((enquiry) => ({
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
