import type { Article, Enquiry, Product, Project, Solution, TechnicalDocument } from "@/types/content";

export const productCategories = [
  "Metal Roof Protection Film",
  "Detailing & Sealing",
  "Technical Documents"
] as const;

export const applications = [
  "Metal roof renewal",
  "Gutters and valleys",
  "Ridges and eaves",
  "Parapets",
  "Penetrations",
  "Industrial roofs"
] as const;

export const documentTypes = [
  "Brochure",
  "Technical data sheet",
  "Construction detail",
  "Application procedure",
  "Installation guide"
] as const;

export const solutions: Solution[] = [
  {
    id: "metal-roof-protection-system",
    title: "Metal Roof Protection System",
    slug: "metal-roof-protection-system",
    summary: "A self-fusing film system for renewing exposed metal roofs affected by leakage, corrosion and heat.",
    overview:
      "Rhinora supplies XNP/Xiniupi self-fusing functional film as a metal roof protection system for exposed architectural metal surfaces. The system is designed to create a continuous adhered protective layer over sound metal substrates and vulnerable roof details.",
    applications: ["Industrial metal roofs", "Ridge and eaves detailing", "Gutters and valleys", "Parapets and upstands", "Pipe penetrations and fastener zones"],
    recommendedProductIds: ["xnp-self-fusing-metal-roof-protection-film"],
    layers: [
      "Inspect roof condition and replace metal panels that have lost structural function",
      "Clean, de-rust and stabilize the metal substrate so adhesion is not compromised",
      "Pre-seal vulnerable details such as fasteners, joints, penetrations, gutters and valleys",
      "Apply XNP self-fusing metal roof protection film directly to the prepared metal surface",
      "Post-seal weak points and overlaps to form a continuous protective layer"
    ],
    benefits: [
      "Self-fusing adhesive layer is designed for full-surface sealing on metal substrates",
      "PVDF/PET facing supports exposed weather resistance and UV durability",
      "System guidance covers common metal roof details, not only the large flat roof area",
      "Careful source-backed technical data is available for specification review"
    ],
    documentIds: ["brochure-metal-roof-protection", "spec-self-fusing-film", "atlas-functional-film-details", "procedure-self-fusing-film"],
    image: "/images/metal-roof-protection-system-photo.png",
    status: "published"
  }
];

export const products: Product[] = [
  {
    id: "xnp-self-fusing-metal-roof-protection-film",
    name: "XNP Self-Fusing Metal Roof Protection Film",
    slug: "xnp-self-fusing-metal-roof-protection-film",
    category: "Metal Roof Protection Film",
    shortDescription: "PVDF/PET faced self-fusing functional film for exposed architectural metal roof protection.",
    description:
      "A weather-resistant functional film composed of a PVDF/PET facing, a self-fusing modified butyl rubber sealing layer and a release film. Rhinora presents the XNP/Xiniupi film as a NZ-facing distributor product for metal roof renewal and protection projects.",
    applications: ["Metal roof renewal", "Gutters and valleys", "Ridges and eaves", "Parapets", "Penetrations", "Industrial roofs"],
    benefits: [
      "Designed to help prevent water, vapour, oxygen, acid, alkali and salt exposure from reaching the metal substrate",
      "Self-fusing sealing layer supports full-surface adhesion and reduces water tracking risk when installed correctly",
      "Flexible film structure helps accommodate normal metal roof movement, vibration and detail geometry",
      "Reflective facing can help reduce roof surface heat gain; project performance depends on roof condition and installation"
    ],
    specifications: {
      Structure: "PVDF/PET weather-resistant facing, self-fusing modified butyl rubber sealing layer, release protective film",
      "Primary method": "Fusion dry-bonding directly to prepared metal substrates",
      "Alternative method": "Adhesive bonding may be used on cement-based substrates with compatible cement-based adhesive materials",
      "Minimum overlap": "Not less than 30 mm, based on the application technical procedure",
      "Tensile force": ">= 450 N/50 mm, source technical specification table",
      "Elongation at maximum force": ">= 50%, source technical specification table",
      "Peel strength": ">= 1.0 N/mm to untreated film overlap and untreated metal, source technical specification table",
      "Heat resistance": "100 deg C for 2 h with no flowing or dripping; sliding <= 2 mm",
      "Low-temperature flexibility": "No cracks at -40 deg C",
      Watertightness: "0.3 MPa for 120 min, watertight"
    },
    compliance: [
      "Company standard Q/XNP 40-2024 application technical procedure",
      "Product performance references Q/XNP 34-2024 functional film requirements",
      "NZ project compliance and warranty terms require project-specific review"
    ],
    documentIds: ["brochure-metal-roof-protection", "spec-self-fusing-film", "atlas-functional-film-details", "procedure-self-fusing-film"],
    solutionIds: ["metal-roof-protection-system"],
    relatedProductIds: [],
    image: "/images/xnp-pm-rolls.png",
    status: "published"
  }
];

export const technicalDocuments: TechnicalDocument[] = [
  {
    id: "brochure-metal-roof-protection",
    title: "Metal Roof Protection Brochure",
    type: "Brochure",
    productId: "xnp-self-fusing-metal-roof-protection-film",
    solutionId: "metal-roof-protection-system",
    category: "Metal Roof Protection Film",
    application: "Metal roof renewal",
    fileUrl: "request:metal-roof-protection-brochure",
    version: "2025",
    publishDate: "2025-06-25"
  },
  {
    id: "spec-self-fusing-film",
    title: "Self-Fusing Functional Film Technical Specification",
    type: "Technical data sheet",
    productId: "xnp-self-fusing-metal-roof-protection-film",
    solutionId: "metal-roof-protection-system",
    category: "Technical Documents",
    application: "Metal roof renewal",
    fileUrl: "request:self-fusing-functional-film-technical-specification",
    version: "Q/XNP 40-2024",
    publishDate: "2024-04-29"
  },
  {
    id: "atlas-functional-film-details",
    title: "Functional Film Construction Detail Atlas",
    type: "Construction detail",
    productId: "xnp-self-fusing-metal-roof-protection-film",
    solutionId: "metal-roof-protection-system",
    category: "Detailing & Sealing",
    application: "Ridges and eaves",
    fileUrl: "request:functional-film-construction-detail-atlas",
    version: "2024-03-01",
    publishDate: "2024-03-01"
  },
  {
    id: "procedure-self-fusing-film",
    title: "Application Technical Procedure for Self-Fusing Functional Film",
    type: "Application procedure",
    productId: "xnp-self-fusing-metal-roof-protection-film",
    solutionId: "metal-roof-protection-system",
    category: "Technical Documents",
    application: "Industrial roofs",
    fileUrl: "request:self-fusing-functional-film-application-procedure",
    version: "2024-05-01",
    publishDate: "2024-05-01"
  }
];

export const projects: Project[] = [
  {
    id: "industrial-roof-renewal-assessment",
    name: "Industrial Roof Renewal Assessment",
    slug: "industrial-roof-renewal-assessment",
    sector: "industrial",
    location: "Project example",
    summary: "A large exposed metal roof reaches its maintenance window with early corrosion, fastener leaks and heat concerns.",
    overview: "This example shows how Rhinora can frame a metal roof renewal enquiry before detailed inspection and specification.",
    challenge: "The roof has repeated patch repairs, localized corrosion and multiple leakage paths around joints and fasteners.",
    solution: "Assess structural condition first, stabilize the substrate, reinforce details and apply XNP self-fusing film as a continuous protection layer over sound metal surfaces.",
    result: "The owner receives a system-led renewal pathway with technical documents ready for installer and project-specific review.",
    productIds: ["xnp-self-fusing-metal-roof-protection-film"],
    images: ["/images/project-industrial.svg"]
  },
  {
    id: "gutter-valley-detail-protection",
    name: "Gutter and Valley Detail Protection",
    slug: "gutter-valley-detail-protection",
    sector: "commercial",
    location: "Project example",
    summary: "A roof drainage zone requires stronger sealing at gutters, valleys and rainwater outlets.",
    overview: "Drainage details are common weak points because water flow, movement and material junctions concentrate risk.",
    challenge: "Existing repairs have focused on visible leak points without creating a reliable continuous seal through the detail zone.",
    solution: "Follow the source detail guidance: overlap in the direction of water flow, turn film up from gutter bottoms and reinforce vulnerable junctions.",
    result: "The design conversation moves from local patching to a complete detail protection method.",
    productIds: ["xnp-self-fusing-metal-roof-protection-film"],
    images: ["/images/roof-renewal.svg"]
  },
  {
    id: "penetration-fastener-zone-sealing",
    name: "Penetration and Fastener Zone Sealing",
    slug: "penetration-fastener-zone-sealing",
    sector: "industrial",
    location: "Project example",
    summary: "Pipe penetrations, screw zones and roof junctions are reviewed before whole-roof protection work.",
    overview: "The system sequence gives vulnerable details extra attention before and after large-area film application.",
    challenge: "Movement at metal roof penetrations and fasteners can create water paths even when the main roof sheet appears sound.",
    solution: "Clean and prepare the substrate, pre-reinforce fixing holes and joints, then apply the film and post-seal weak points.",
    result: "Detail-first sequencing reduces the chance that a renewed roof still fails at common junctions.",
    productIds: ["xnp-self-fusing-metal-roof-protection-film"],
    images: ["/images/project-education.svg"]
  }
];

export const articles: Article[] = [
  {
    id: "metal-roof-maintenance-window",
    title: "When a Metal Roof Enters Its Maintenance Window",
    slug: "metal-roof-maintenance-window",
    category: "metal roof renewal",
    excerpt: "Early corrosion and repeated leaks should trigger a system review before the roof loses structural value.",
    body: "Metal roofs commonly move from isolated rust spots to broader corrosion and leakage risk. The XNP source materials frame early intervention as important because severe corrosion can require panel replacement rather than surface protection. A project review should confirm whether the metal substrate is still sound before any film system is specified.",
    seoTitle: "Metal Roof Maintenance Window | Rhinora",
    metaDescription: "How to identify when a metal roof needs system-led renewal rather than repeated patch repair.",
    tags: ["metal roof renewal", "roof corrosion", "roof leak repair"],
    publishDate: "2026-06-06"
  },
  {
    id: "why-patch-repairs-fail-metal-roofs",
    title: "Why Patch Repairs Often Fail on Metal Roofs",
    slug: "why-patch-repairs-fail-metal-roofs",
    category: "product guidance",
    excerpt: "Local repairs can leave water tracking, movement and corrosion drivers unresolved.",
    body: "Metal roof leakage is often tied to movement, rigid laps, fasteners, gutters, penetrations and coating breakdown. Repairing only the visible leak point can leave neighbouring details and hidden water paths active. A system-led method treats the prepared roof surface and details together so the protective layer is continuous.",
    seoTitle: "Why Metal Roof Patch Repairs Fail | Rhinora",
    metaDescription: "A practical explanation of metal roof leakage, corrosion and patch repair limits.",
    tags: ["metal roof leak", "self-fusing film", "roof protection"],
    publishDate: "2026-06-06"
  },
  {
    id: "self-fusing-film-design-considerations",
    title: "Design Considerations for Self-Fusing Roof Film",
    slug: "self-fusing-film-design-considerations",
    category: "installation guidance",
    excerpt: "Substrate condition, overlap width and detail reinforcement determine whether the system can perform as intended.",
    body: "The application procedure requires the film to be installed directly on prepared metal surfaces using fusion dry-bonding. It also identifies a minimum overlap width of not less than 30 mm and calls for detail reinforcement where project conditions require it. Cement-based substrates use a different adhesive bonding method and should be reviewed separately.",
    seoTitle: "Self-Fusing Metal Roof Film Design Considerations | Rhinora",
    metaDescription: "Key design and installation considerations for self-fusing functional film on architectural metal roofs.",
    tags: ["self-fusing film", "metal roof protection", "roof detailing"],
    publishDate: "2026-06-06"
  }
];

export const enquiries: Enquiry[] = [
  {
    id: "enq-1001",
    type: "Technical support",
    name: "Mereana Clarke",
    company: "Northline Architecture",
    email: "mereana@example.co.nz",
    phone: "+64 9 000 0000",
    message: "Need a review pathway for an existing metal roof with corrosion around fasteners and gutters.",
    relatedSolution: "Metal Roof Protection System",
    dateSubmitted: "2026-06-06",
    status: "new"
  },
  {
    id: "enq-1002",
    type: "Product enquiry",
    name: "James Patel",
    company: "Harbour Build",
    email: "james@example.co.nz",
    message: "Please send the metal roof protection film brochure and technical specification.",
    relatedProduct: "XNP Self-Fusing Metal Roof Protection Film",
    dateSubmitted: "2026-06-06",
    status: "in review"
  }
];

export const findProduct = (slug: string) => products.find((product) => product.slug === slug);
export const findSolution = (slug: string) => solutions.find((solution) => solution.slug === slug);
export const findProject = (slug: string) => projects.find((project) => project.slug === slug);
export const findArticle = (slug: string) => articles.find((article) => article.slug === slug);

export const documentsForIds = (ids: string[]) => technicalDocuments.filter((document) => ids.includes(document.id));
export const productsForIds = (ids: string[]) => products.filter((product) => ids.includes(product.id));
export const solutionsForIds = (ids: string[]) => solutions.filter((solution) => ids.includes(solution.id));
