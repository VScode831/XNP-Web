export type Status = "draft" | "published";

export type ProductCategory =
  | "Waterproofing Membranes"
  | "Roof Protection Systems"
  | "Insulation & Warm Roof Components"
  | "Drainage & Accessories"
  | "Sealants & Primers"
  | "Future Construction Materials";

export type Application =
  | "Flat roof"
  | "Deck and balcony"
  | "Below ground"
  | "Roof renewal"
  | "Green roof"
  | "Solar roof"
  | "Facade"
  | "General construction";

export type DocumentType =
  | "Technical data sheet"
  | "Installation guide"
  | "CAD detail"
  | "Warranty document"
  | "Compliance document"
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
  category: "waterproofing" | "roof renewal" | "compliance" | "product guidance" | "installation tips";
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
