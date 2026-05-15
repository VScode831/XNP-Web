import type { Article, Enquiry, Product, Project, Solution, TechnicalDocument } from "@/types/content";

export const productCategories = [
  "Waterproofing Membranes",
  "Roof Protection Systems",
  "Insulation & Warm Roof Components",
  "Drainage & Accessories",
  "Sealants & Primers",
  "Future Construction Materials"
] as const;

export const applications = [
  "Flat roof",
  "Deck and balcony",
  "Below ground",
  "Roof renewal",
  "Green roof",
  "Solar roof",
  "Facade",
  "General construction"
] as const;

export const documentTypes = [
  "Technical data sheet",
  "Installation guide",
  "CAD detail",
  "Warranty document",
  "Compliance document",
  "Brochure"
] as const;

export const solutions: Solution[] = [
  {
    id: "flat-roof-waterproofing",
    title: "Flat Roof Waterproofing",
    slug: "flat-roof-waterproofing",
    summary: "Robust membrane systems for commercial and residential low-slope roofs.",
    overview:
      "A system-led approach for exposed and protected membrane roofs in New Zealand conditions, with options for insulation, falls, drainage and surface protection.",
    applications: ["Commercial roofs", "Apartment buildings", "Schools and public facilities", "Roof plant areas"],
    recommendedProductIds: ["rhino-flex-900", "guard-board-300", "therma-taper"],
    layers: ["Structural substrate", "Vapour control layer", "Insulation or tapered board", "Waterproofing membrane", "Protection or trafficable finish"],
    benefits: ["System clarity for design teams", "Compatible protection and insulation options", "Downloadable details and specification support"],
    documentIds: ["tds-rhino-flex-900", "cad-flat-roof-outlet", "guide-flat-roof-install"],
    image: "/images/roof-system.svg",
    status: "published"
  },
  {
    id: "deck-balcony-waterproofing",
    title: "Deck & Balcony Waterproofing",
    slug: "deck-balcony-waterproofing",
    summary: "Membrane and protection build-ups for occupied spaces and outdoor living areas.",
    overview:
      "Deck and balcony systems designed around movement, falls, thresholds and the practical detailing needed for long-term service.",
    applications: ["Apartment balconies", "Podium decks", "Terraces", "Outdoor circulation areas"],
    recommendedProductIds: ["rhino-flex-900", "prime-bond-pu", "drain-mat-20"],
    layers: ["Prepared substrate", "Primer", "Waterproofing membrane", "Drainage layer", "Tile, paver or wearing surface"],
    benefits: ["Application-led product selection", "Clear interface guidance", "Suitable for new build and remediation"],
    documentIds: ["tds-rhino-flex-900", "guide-balcony-install", "warranty-system"],
    image: "/images/deck-balcony.svg",
    status: "published"
  },
  {
    id: "below-ground-tanking",
    title: "Below Ground Tanking",
    slug: "below-ground-tanking",
    summary: "Below-grade waterproofing layers for retaining walls, basements and lift pits.",
    overview:
      "Tanking systems that combine membrane continuity, drainage management and protection boards to reduce risk below ground.",
    applications: ["Basements", "Retaining walls", "Lift pits", "Podium edges"],
    recommendedProductIds: ["tank-shield-1200", "drain-mat-20", "guard-board-300"],
    layers: ["Concrete wall or slab", "Primer where required", "Tanking membrane", "Protection board", "Drainage layer and backfill"],
    benefits: ["Designed for concealed risk areas", "Drainage and protection considered together", "Document support for project records"],
    documentIds: ["tds-tank-shield-1200", "cad-retaining-wall", "compliance-placeholder"],
    image: "/images/below-ground.svg",
    status: "published"
  },
  {
    id: "roof-renewal",
    title: "Roof Renewal",
    slug: "roof-renewal",
    summary: "Overlay and renewal pathways for ageing commercial roof assets.",
    overview:
      "Assessment-led renewal systems for roofs where asset owners need practical repair, overlay or full replacement recommendations.",
    applications: ["Ageing commercial roofs", "Industrial buildings", "Retail centres", "Education facilities"],
    recommendedProductIds: ["rhino-flex-900", "guard-board-300", "prime-bond-pu"],
    layers: ["Condition assessment", "Surface preparation", "Primer or separation layer", "New membrane system", "Protection and maintenance plan"],
    benefits: ["Supports staged remediation", "Helps reduce business disruption", "Connects asset planning with technical documents"],
    documentIds: ["guide-roof-renewal", "warranty-system"],
    image: "/images/roof-renewal.svg",
    status: "published"
  },
  {
    id: "green-solar-roof-ready-systems",
    title: "Green Roof / Solar Roof Ready Systems",
    slug: "green-solar-roof-ready-systems",
    summary: "Roof build-ups prepared for planted assemblies, ballast, service zones and PV mounting.",
    overview:
      "Protected membrane roof systems configured for additional loads, drainage, root resistance and roof-mounted energy infrastructure.",
    applications: ["Green roofs", "Solar arrays", "Blue-green roof zones", "Roof terraces"],
    recommendedProductIds: ["root-guard-500", "drain-mat-20", "therma-taper"],
    layers: ["Roof deck", "Waterproofing system", "Root barrier or protection", "Drainage/reservoir layer", "Growing media, ballast or PV support"],
    benefits: ["Future-ready envelope planning", "Compatible drainage and protection components", "Supports sustainability objectives"],
    documentIds: ["brochure-green-roof", "cad-green-roof-edge"],
    image: "/images/green-roof.svg",
    status: "published"
  },
  {
    id: "commercial-building-envelope-solutions",
    title: "Commercial Building Envelope Solutions",
    slug: "commercial-building-envelope-solutions",
    summary: "Expandable material systems for roofs, facades, interfaces and enclosure detailing.",
    overview:
      "A broader building envelope category that keeps Rhinora ready for insulation, facade accessories, sealants and protection products as the range grows.",
    applications: ["Commercial envelopes", "Facade interfaces", "Roof-to-wall junctions", "Large project specification support"],
    recommendedProductIds: ["seal-pro-ms", "prime-bond-pu", "future-envelope-range"],
    layers: ["Primary structure", "Air and water control layers", "Thermal layer", "Cladding or roof finish", "Sealants, flashings and accessories"],
    benefits: ["Not limited to waterproofing", "Supports multi-category procurement", "Technical advice across envelope interfaces"],
    documentIds: ["brochure-envelope-systems", "compliance-placeholder"],
    image: "/images/envelope.svg",
    status: "published"
  }
];

export const products: Product[] = [
  {
    id: "rhino-flex-900",
    name: "Rhinora Flex 900 Membrane",
    slug: "rhinora-flex-900-membrane",
    category: "Waterproofing Membranes",
    shortDescription: "Flexible sheet membrane for roof, deck and balcony waterproofing assemblies.",
    description:
      "A versatile waterproofing membrane placeholder product for exposed or protected systems, designed in the catalogue as a specification-ready construction material rather than a retail item.",
    applications: ["Flat roof", "Deck and balcony", "Roof renewal"],
    benefits: ["Adaptable system detailing", "Compatible with primers and protection layers", "Clear document pathway for designers"],
    specifications: {
      Thickness: "Nominal 1.5 mm placeholder",
      Finish: "Mineral or smooth finish options",
      Roll: "1 m x 10 m placeholder",
      Compatibility: "Primer, insulation and protection accessories"
    },
    compliance: ["CodeMark/BRANZ appraisal placeholder", "NZBC E2 and B2 pathway placeholder"],
    documentIds: ["tds-rhino-flex-900", "guide-flat-roof-install", "guide-balcony-install"],
    solutionIds: ["flat-roof-waterproofing", "deck-balcony-waterproofing", "roof-renewal"],
    relatedProductIds: ["prime-bond-pu", "guard-board-300", "therma-taper"],
    image: "/images/product-membrane.svg",
    status: "published"
  },
  {
    id: "tank-shield-1200",
    name: "TankShield 1200 Below Ground Membrane",
    slug: "tankshield-1200-below-ground-membrane",
    category: "Waterproofing Membranes",
    shortDescription: "Heavy duty tanking membrane for basement and retaining wall applications.",
    description:
      "A below-ground waterproofing membrane concept for concealed tanking applications where drainage, protection and installation sequencing are critical.",
    applications: ["Below ground"],
    benefits: ["Built for concealed waterproofing zones", "Pairs with drainage and protection boards", "Supports basement detailing"],
    specifications: {
      Thickness: "Nominal 2.0 mm placeholder",
      Substrates: "Concrete and masonry",
      Exposure: "Concealed below-ground use",
      Installation: "Torch, adhesive or mechanically fixed placeholder"
    },
    compliance: ["Below-grade waterproofing compliance placeholder"],
    documentIds: ["tds-tank-shield-1200", "cad-retaining-wall"],
    solutionIds: ["below-ground-tanking"],
    relatedProductIds: ["drain-mat-20", "guard-board-300", "prime-bond-pu"],
    image: "/images/product-tanking.svg",
    status: "published"
  },
  {
    id: "guard-board-300",
    name: "GuardBoard 300 Protection Board",
    slug: "guardboard-300-protection-board",
    category: "Roof Protection Systems",
    shortDescription: "Protection layer for membranes in roofs, decks and tanking systems.",
    description:
      "A durable protection board used to reduce mechanical damage risk above waterproofing membranes during installation and service.",
    applications: ["Flat roof", "Deck and balcony", "Below ground", "Roof renewal"],
    benefits: ["Protects membrane investment", "Useful in high-traffic construction zones", "Works across multiple system types"],
    specifications: {
      Thickness: "3 mm placeholder",
      Format: "Board or roll placeholder",
      Use: "Horizontal and vertical protection",
      Compatibility: "Membrane and drainage systems"
    },
    compliance: ["System warranty placeholder"],
    documentIds: ["warranty-system", "tds-guard-board-300"],
    solutionIds: ["flat-roof-waterproofing", "below-ground-tanking", "roof-renewal"],
    relatedProductIds: ["rhino-flex-900", "tank-shield-1200", "drain-mat-20"],
    image: "/images/product-board.svg",
    status: "published"
  },
  {
    id: "therma-taper",
    name: "ThermaTaper Warm Roof Board",
    slug: "thermataper-warm-roof-board",
    category: "Insulation & Warm Roof Components",
    shortDescription: "Tapered and flat insulation board concept for warm roof assemblies.",
    description:
      "A future-ready insulation component for warm roof and tapered falls design, included to show Rhinora's expandable construction materials structure.",
    applications: ["Flat roof", "Green roof", "Solar roof"],
    benefits: ["Supports falls design", "Improves roof build-up performance", "Connects with protected membrane systems"],
    specifications: {
      Board: "PIR or mineral wool placeholder",
      Falls: "Custom tapered scheme placeholder",
      Facing: "Compatible facer placeholder",
      Thermal: "R-value project-specific placeholder"
    },
    compliance: ["Thermal performance declaration placeholder"],
    documentIds: ["brochure-envelope-systems"],
    solutionIds: ["flat-roof-waterproofing", "green-solar-roof-ready-systems"],
    relatedProductIds: ["rhino-flex-900", "guard-board-300", "root-guard-500"],
    image: "/images/product-insulation.svg",
    status: "published"
  },
  {
    id: "drain-mat-20",
    name: "DrainMat 20 Drainage Layer",
    slug: "drainmat-20-drainage-layer",
    category: "Drainage & Accessories",
    shortDescription: "Drainage and separation layer for protected roofs, balconies and below-ground walls.",
    description:
      "A drainage accessory that helps route water away from protected waterproofing systems while maintaining separation between layers.",
    applications: ["Deck and balcony", "Below ground", "Green roof"],
    benefits: ["Improves water management", "Pairs with protection boards", "Useful in green roof and tanking systems"],
    specifications: {
      Core: "Profiled drainage core placeholder",
      Filter: "Geotextile bonded layer placeholder",
      Flow: "Project-specific drainage rate placeholder",
      Use: "Horizontal or vertical drainage"
    },
    compliance: ["Drainage performance placeholder"],
    documentIds: ["cad-retaining-wall", "brochure-green-roof"],
    solutionIds: ["deck-balcony-waterproofing", "below-ground-tanking", "green-solar-roof-ready-systems"],
    relatedProductIds: ["tank-shield-1200", "guard-board-300", "root-guard-500"],
    image: "/images/product-drainage.svg",
    status: "published"
  },
  {
    id: "prime-bond-pu",
    name: "PrimeBond PU Primer",
    slug: "primebond-pu-primer",
    category: "Sealants & Primers",
    shortDescription: "Primer concept for improving adhesion to common construction substrates.",
    description:
      "A system primer placeholder for use with Rhinora waterproofing and accessory products on suitably prepared substrates.",
    applications: ["Flat roof", "Deck and balcony", "Below ground", "General construction"],
    benefits: ["Supports reliable adhesion", "Simple specification pathway", "Compatible with multiple product categories"],
    specifications: {
      Base: "Polyurethane placeholder",
      Coverage: "Project-specific placeholder",
      Substrates: "Concrete, plywood and masonry placeholder",
      DryTime: "Weather-dependent placeholder"
    },
    compliance: ["VOC and safety data placeholder"],
    documentIds: ["tds-prime-bond-pu"],
    solutionIds: ["deck-balcony-waterproofing", "roof-renewal", "commercial-building-envelope-solutions"],
    relatedProductIds: ["rhino-flex-900", "tank-shield-1200", "seal-pro-ms"],
    image: "/images/product-primer.svg",
    status: "published"
  },
  {
    id: "seal-pro-ms",
    name: "SealPro MS Construction Sealant",
    slug: "sealpro-ms-construction-sealant",
    category: "Sealants & Primers",
    shortDescription: "Flexible construction sealant placeholder for envelope interfaces.",
    description:
      "A future sealant category product for junctions, terminations and broader building envelope interface support.",
    applications: ["Facade", "General construction"],
    benefits: ["Supports envelope junction detailing", "Broad substrate compatibility placeholder", "Complements membrane terminations"],
    specifications: {
      Chemistry: "MS polymer placeholder",
      Movement: "Class placeholder",
      Colours: "Neutral construction colours placeholder",
      Packaging: "Cartridge and sausage placeholder"
    },
    compliance: ["Facade joint testing placeholder"],
    documentIds: ["brochure-envelope-systems"],
    solutionIds: ["commercial-building-envelope-solutions"],
    relatedProductIds: ["prime-bond-pu", "future-envelope-range"],
    image: "/images/product-sealant.svg",
    status: "published"
  },
  {
    id: "root-guard-500",
    name: "RootGuard 500 Barrier",
    slug: "rootguard-500-barrier",
    category: "Roof Protection Systems",
    shortDescription: "Root barrier concept for planted and future green roof assemblies.",
    description:
      "A protected roof accessory for green roof build-ups where the waterproofing layer needs an additional root-resistant separation layer.",
    applications: ["Green roof", "Solar roof", "Flat roof"],
    benefits: ["Supports green roof planning", "Protects membrane layers", "Fits future sustainability-focused systems"],
    specifications: {
      Thickness: "0.5 mm placeholder",
      Use: "Root barrier and separation layer",
      Installation: "Loose laid or welded placeholder",
      Compatibility: "Green roof drainage and protection layers"
    },
    compliance: ["Root resistance placeholder"],
    documentIds: ["brochure-green-roof", "cad-green-roof-edge"],
    solutionIds: ["green-solar-roof-ready-systems"],
    relatedProductIds: ["drain-mat-20", "therma-taper"],
    image: "/images/product-root.svg",
    status: "published"
  },
  {
    id: "future-envelope-range",
    name: "Future Envelope Materials Range",
    slug: "future-envelope-materials-range",
    category: "Future Construction Materials",
    shortDescription: "Reserved catalogue space for insulation, facade, roofing and envelope accessories.",
    description:
      "A placeholder product entry that demonstrates how Rhinora can expand beyond waterproofing into broader technical construction products.",
    applications: ["Facade", "General construction", "Flat roof"],
    benefits: ["Keeps the platform expandable", "Supports future category launches", "Avoids a waterproofing-only information architecture"],
    specifications: {
      Status: "Future range placeholder",
      Categories: "Facade, insulation, accessories and protection",
      Availability: "To be confirmed",
      Support: "Technical team enquiry"
    },
    compliance: ["Future certification placeholder"],
    documentIds: ["brochure-envelope-systems"],
    solutionIds: ["commercial-building-envelope-solutions"],
    relatedProductIds: ["seal-pro-ms", "therma-taper"],
    image: "/images/product-future.svg",
    status: "draft"
  }
];

export const technicalDocuments: TechnicalDocument[] = [
  { id: "tds-rhino-flex-900", title: "Rhinora Flex 900 Technical Data Sheet", type: "Technical data sheet", productId: "rhino-flex-900", solutionId: "flat-roof-waterproofing", category: "Waterproofing Membranes", application: "Flat roof", fileUrl: "/downloads/rhinora-flex-900-tds.pdf", version: "1.0", publishDate: "2026-02-12" },
  { id: "guide-flat-roof-install", title: "Flat Roof System Installation Guide", type: "Installation guide", productId: "rhino-flex-900", solutionId: "flat-roof-waterproofing", category: "Waterproofing Membranes", application: "Flat roof", fileUrl: "/downloads/flat-roof-installation-guide.pdf", version: "1.0", publishDate: "2026-02-18" },
  { id: "cad-flat-roof-outlet", title: "CAD Detail - Flat Roof Outlet", type: "CAD detail", solutionId: "flat-roof-waterproofing", category: "Drainage & Accessories", application: "Flat roof", fileUrl: "/downloads/cad-flat-roof-outlet.dwg", version: "A", publishDate: "2026-01-30" },
  { id: "guide-balcony-install", title: "Deck and Balcony Waterproofing Guide", type: "Installation guide", productId: "rhino-flex-900", solutionId: "deck-balcony-waterproofing", category: "Waterproofing Membranes", application: "Deck and balcony", fileUrl: "/downloads/deck-balcony-guide.pdf", version: "1.0", publishDate: "2026-02-20" },
  { id: "tds-tank-shield-1200", title: "TankShield 1200 Technical Data Sheet", type: "Technical data sheet", productId: "tank-shield-1200", solutionId: "below-ground-tanking", category: "Waterproofing Membranes", application: "Below ground", fileUrl: "/downloads/tankshield-1200-tds.pdf", version: "1.0", publishDate: "2026-03-01" },
  { id: "cad-retaining-wall", title: "CAD Detail - Retaining Wall Tanking", type: "CAD detail", productId: "tank-shield-1200", solutionId: "below-ground-tanking", category: "Drainage & Accessories", application: "Below ground", fileUrl: "/downloads/cad-retaining-wall.dwg", version: "A", publishDate: "2026-03-04" },
  { id: "tds-guard-board-300", title: "GuardBoard 300 Technical Data Sheet", type: "Technical data sheet", productId: "guard-board-300", category: "Roof Protection Systems", application: "General construction", fileUrl: "/downloads/guardboard-300-tds.pdf", version: "1.0", publishDate: "2026-01-22" },
  { id: "tds-prime-bond-pu", title: "PrimeBond PU Technical Data Sheet", type: "Technical data sheet", productId: "prime-bond-pu", category: "Sealants & Primers", application: "General construction", fileUrl: "/downloads/primebond-pu-tds.pdf", version: "1.0", publishDate: "2026-01-18" },
  { id: "warranty-system", title: "Rhinora System Warranty Placeholder", type: "Warranty document", category: "Waterproofing Membranes", application: "Flat roof", fileUrl: "/downloads/system-warranty.pdf", version: "Draft", publishDate: "2026-03-10" },
  { id: "compliance-placeholder", title: "NZBC Compliance Pathway Placeholder", type: "Compliance document", category: "Waterproofing Membranes", application: "Below ground", fileUrl: "/downloads/nzbc-compliance-placeholder.pdf", version: "Draft", publishDate: "2026-03-14" },
  { id: "guide-roof-renewal", title: "Roof Renewal Assessment Checklist", type: "Installation guide", solutionId: "roof-renewal", category: "Roof Protection Systems", application: "Roof renewal", fileUrl: "/downloads/roof-renewal-checklist.pdf", version: "1.0", publishDate: "2026-03-18" },
  { id: "brochure-green-roof", title: "Green and Solar Ready Roof Systems Brochure", type: "Brochure", productId: "root-guard-500", solutionId: "green-solar-roof-ready-systems", category: "Roof Protection Systems", application: "Green roof", fileUrl: "/downloads/green-solar-ready-brochure.pdf", version: "1.0", publishDate: "2026-04-02" },
  { id: "cad-green-roof-edge", title: "CAD Detail - Green Roof Edge Zone", type: "CAD detail", solutionId: "green-solar-roof-ready-systems", category: "Drainage & Accessories", application: "Green roof", fileUrl: "/downloads/cad-green-roof-edge.dwg", version: "A", publishDate: "2026-04-03" },
  { id: "brochure-envelope-systems", title: "Building Envelope Materials Overview", type: "Brochure", productId: "future-envelope-range", solutionId: "commercial-building-envelope-solutions", category: "Future Construction Materials", application: "Facade", fileUrl: "/downloads/building-envelope-overview.pdf", version: "Draft", publishDate: "2026-04-08" }
];

export const projects: Project[] = [
  {
    id: "harbour-logistics-roof-renewal",
    name: "Harbour Logistics Roof Renewal",
    slug: "harbour-logistics-roof-renewal",
    sector: "industrial",
    location: "Auckland",
    summary: "A staged commercial roof renewal concept for an operating logistics facility.",
    overview: "The project required a practical renewal pathway that could be planned around business continuity and roof plant access.",
    challenge: "Existing roof areas had mixed substrates, ageing membranes and restricted access around plant equipment.",
    solution: "Rhinora mock systems combined membrane renewal, protection board and staged documentation for future maintenance.",
    result: "The case study shows how the site can present product systems, project constraints and support documents in one place.",
    productIds: ["rhino-flex-900", "guard-board-300", "prime-bond-pu"],
    images: ["/images/project-industrial.svg"]
  },
  {
    id: "central-school-warm-roof",
    name: "Central School Warm Roof Upgrade",
    slug: "central-school-warm-roof",
    sector: "education",
    location: "Hamilton",
    summary: "Warm roof and waterproofing system planning for a classroom block.",
    overview: "A design-led roof upgrade used a warm roof build-up to improve durability and thermal performance.",
    challenge: "The project team needed clear falls, drainage and membrane detailing for a low-slope roof.",
    solution: "A tapered insulation concept was paired with membrane and outlet documentation.",
    result: "The mock case study demonstrates how designers can navigate from project story to related products and downloads.",
    productIds: ["therma-taper", "rhino-flex-900", "drain-mat-20"],
    images: ["/images/project-education.svg"]
  },
  {
    id: "terrace-apartments-balcony-systems",
    name: "Terrace Apartments Balcony Systems",
    slug: "terrace-apartments-balcony-systems",
    sector: "residential",
    location: "Wellington",
    summary: "Balcony waterproofing and drainage support for a medium-density apartment project.",
    overview: "The project needed consistent membrane, primer and drainage guidance across repeated balcony details.",
    challenge: "Thresholds, falls and balcony finishes created coordination pressure across trades.",
    solution: "Rhinora mock balcony systems linked membrane selection to drainage and installation guide downloads.",
    result: "The case study format supports technical users and commercial buyers with concise product references.",
    productIds: ["rhino-flex-900", "prime-bond-pu", "drain-mat-20"],
    images: ["/images/project-residential.svg"]
  }
];

export const articles: Article[] = [
  {
    id: "choosing-waterproofing-membrane-nz",
    title: "Choosing a Waterproofing Membrane for NZ Projects",
    slug: "choosing-waterproofing-membrane-nz",
    category: "waterproofing",
    excerpt: "Key design considerations for waterproofing membrane NZ specifications across roofs, decks and below-ground areas.",
    body: "Successful waterproofing specification starts with the application, substrate, exposure, maintenance access and compatible system layers. This placeholder article can later be expanded into search-focused technical guidance.",
    seoTitle: "Waterproofing Membrane NZ Selection Guide | Rhinora",
    metaDescription: "A practical guide to selecting waterproofing membrane systems for New Zealand construction projects.",
    tags: ["waterproofing membrane NZ", "commercial waterproofing", "building envelope materials"],
    publishDate: "2026-03-05"
  },
  {
    id: "roof-renewal-commercial-buildings",
    title: "Planning Roof Renewal for Commercial Buildings",
    slug: "roof-renewal-commercial-buildings",
    category: "roof renewal",
    excerpt: "How asset owners can structure assessment, product selection and documentation before a roof renewal project.",
    body: "Commercial roof renewal needs more than a product swap. A good process considers moisture risk, substrate condition, access, sequencing, warranty goals and future service zones.",
    seoTitle: "Commercial Roof Renewal Guidance | Rhinora",
    metaDescription: "Roof renewal guidance for commercial buildings using technical construction products and system documentation.",
    tags: ["roof protection", "commercial waterproofing", "technical construction products"],
    publishDate: "2026-03-22"
  },
  {
    id: "building-envelope-materials-expansion",
    title: "Thinking Beyond Waterproofing: Building Envelope Materials",
    slug: "building-envelope-materials-expansion",
    category: "product guidance",
    excerpt: "Why roofs, facades, sealants, insulation and drainage should be considered as connected envelope systems.",
    body: "A building envelope approach helps project teams manage interfaces between waterproofing, thermal layers, cladding, sealants and accessories.",
    seoTitle: "Building Envelope Materials NZ | Rhinora",
    metaDescription: "Rhinora's expandable approach to building envelope materials for New Zealand construction projects.",
    tags: ["building envelope materials", "facade", "technical construction products"],
    publishDate: "2026-04-10"
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
    message: "Need a flat roof membrane build-up for a school project.",
    relatedSolution: "Flat Roof Waterproofing",
    dateSubmitted: "2026-04-18",
    status: "new"
  },
  {
    id: "enq-1002",
    type: "Product enquiry",
    name: "James Patel",
    company: "Harbour Build",
    email: "james@example.co.nz",
    message: "Please send availability for protection board and primer.",
    relatedProduct: "GuardBoard 300 Protection Board",
    dateSubmitted: "2026-04-21",
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
