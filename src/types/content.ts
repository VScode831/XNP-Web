export type Status = "draft" | "published";

export type ProductCategory =
  | "Metal Roof Protection Film"
  | "Detailing & Sealing"
  | "Technical Documents";

export type Application =
  | "Metal roof renewal"
  | "Gutters and valleys"
  | "Ridges and eaves"
  | "Parapets"
  | "Penetrations"
  | "Industrial roofs";

export type DocumentType =
  | "Technical data sheet"
  | "Installation guide"
  | "Construction detail"
  | "Application procedure"
  | "Brochure";

export type Sector = "commercial" | "residential" | "industrial" | "education" | "healthcare";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  applications: Application[];
  benefits: string[];
  specifications: Record<string, string>;
  compliance: string[];
  documentIds: string[];
  solutionIds: string[];
  relatedProductIds: string[];
  image: string;
  status: Status;
};

export type Solution = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  overview: string;
  applications: string[];
  recommendedProductIds: string[];
  layers: string[];
  benefits: string[];
  documentIds: string[];
  image: string;
  status: Status;
};

export type TechnicalDocument = {
  id: string;
  title: string;
  type: DocumentType;
  productId?: string;
  solutionId?: string;
  category: ProductCategory;
  application: Application;
  fileUrl: string;
  version: string;
  publishDate: string;
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  sector: Sector;
  location: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  productIds: string[];
  images: string[];
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: "metal roof renewal" | "product guidance" | "installation guidance";
  excerpt: string;
  body: string;
  seoTitle: string;
  metaDescription: string;
  tags: string[];
  publishDate: string;
};

export type Enquiry = {
  id: string;
  type: "General" | "Technical support" | "Product enquiry";
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  relatedProduct?: string;
  relatedSolution?: string;
  dateSubmitted: string;
  status: "new" | "in review" | "resolved";
};
