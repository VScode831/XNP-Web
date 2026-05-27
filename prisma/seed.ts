import { PrismaClient } from "@prisma/client";
import {
  articles,
  enquiries,
  productCategories,
  products,
  projects,
  solutions,
  technicalDocuments
} from "../src/data/content";
import { unique } from "../src/lib/filters";

const prisma = new PrismaClient();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const date = (value: string) => new Date(`${value}T00:00:00.000Z`);

async function main() {
  await prisma.relatedProduct.deleteMany();
  await prisma.projectProduct.deleteMany();
  await prisma.solutionDocument.deleteMany();
  await prisma.productDocument.deleteMany();
  await prisma.productSolution.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.category.deleteMany();
  await prisma.article.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technicalDocument.deleteMany();
  await prisma.solution.deleteMany();
  await prisma.product.deleteMany();

  await Promise.all(
    products.map((product, sortOrder) =>
      prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category,
          shortDescription: product.shortDescription,
          description: product.description,
          applications: product.applications,
          benefits: product.benefits,
          specifications: product.specifications,
          compliance: product.compliance,
          image: product.image,
          status: product.status,
          sortOrder
        }
      })
    )
  );

  await Promise.all(
    solutions.map((solution, sortOrder) =>
      prisma.solution.create({
        data: {
          id: solution.id,
          title: solution.title,
          slug: solution.slug,
          summary: solution.summary,
          overview: solution.overview,
          applications: solution.applications,
          layers: solution.layers,
          benefits: solution.benefits,
          image: solution.image,
          status: solution.status,
          sortOrder
        }
      })
    )
  );

  await Promise.all(
    technicalDocuments.map((document, sortOrder) =>
      prisma.technicalDocument.create({
        data: {
          id: document.id,
          title: document.title,
          type: document.type,
          category: document.category,
          application: document.application,
          fileUrl: document.fileUrl,
          version: document.version,
          publishDate: date(document.publishDate),
          sortOrder
        }
      })
    )
  );

  await Promise.all(
    projects.map((project, sortOrder) =>
      prisma.project.create({
        data: {
          id: project.id,
          name: project.name,
          slug: project.slug,
          sector: project.sector,
          location: project.location,
          summary: project.summary,
          overview: project.overview,
          challenge: project.challenge,
          solution: project.solution,
          result: project.result,
          images: project.images,
          sortOrder
        }
      })
    )
  );

  await Promise.all(
    articles.map((article, sortOrder) =>
      prisma.article.create({
        data: {
          id: article.id,
          title: article.title,
          slug: article.slug,
          category: article.category,
          excerpt: article.excerpt,
          body: article.body,
          seoTitle: article.seoTitle,
          metaDescription: article.metaDescription,
          tags: article.tags,
          publishDate: date(article.publishDate),
          sortOrder
        }
      })
    )
  );

  const categoryRows = [
    ...productCategories.map((name, sortOrder) => ({
      id: `product-${slugify(name)}`,
      type: "Product category",
      name,
      slug: slugify(name),
      sortOrder
    })),
    ...solutions.map((solution, sortOrder) => ({
      id: `solution-${solution.id}`,
      type: "Solution category",
      name: solution.title,
      slug: solution.slug,
      sortOrder
    })),
    ...unique(articles.map((article) => article.category)).map((name, sortOrder) => ({
      id: `resource-${slugify(name)}`,
      type: "Resource category",
      name,
      slug: slugify(name),
      sortOrder
    }))
  ];

  await Promise.all(categoryRows.map((category) => prisma.category.create({ data: category })));

  const productSolutionPairs = new Set<string>();
  for (const product of products) {
    for (const solutionId of product.solutionIds) productSolutionPairs.add(`${product.id}|${solutionId}`);
  }
  for (const solution of solutions) {
    for (const productId of solution.recommendedProductIds) productSolutionPairs.add(`${productId}|${solution.id}`);
  }
  await Promise.all(
    Array.from(productSolutionPairs).map((pair) => {
      const [productId, solutionId] = pair.split("|");
      return prisma.productSolution.create({ data: { productId, solutionId } });
    })
  );

  const productDocumentPairs = new Set<string>();
  for (const product of products) {
    for (const documentId of product.documentIds) productDocumentPairs.add(`${product.id}|${documentId}`);
  }
  for (const document of technicalDocuments) {
    if (document.productId) productDocumentPairs.add(`${document.productId}|${document.id}`);
  }
  await Promise.all(
    Array.from(productDocumentPairs).map((pair) => {
      const [productId, documentId] = pair.split("|");
      return prisma.productDocument.create({ data: { productId, documentId } });
    })
  );

  const solutionDocumentPairs = new Set<string>();
  for (const solution of solutions) {
    for (const documentId of solution.documentIds) solutionDocumentPairs.add(`${solution.id}|${documentId}`);
  }
  for (const document of technicalDocuments) {
    if (document.solutionId) solutionDocumentPairs.add(`${document.solutionId}|${document.id}`);
  }
  await Promise.all(
    Array.from(solutionDocumentPairs).map((pair) => {
      const [solutionId, documentId] = pair.split("|");
      return prisma.solutionDocument.create({ data: { solutionId, documentId } });
    })
  );

  await Promise.all(
    products.flatMap((product) =>
      product.relatedProductIds.map((relatedProductId) =>
        prisma.relatedProduct.create({ data: { productId: product.id, relatedProductId } })
      )
    )
  );

  await Promise.all(
    projects.flatMap((project) =>
      project.productIds.map((productId) => prisma.projectProduct.create({ data: { projectId: project.id, productId } }))
    )
  );

  await Promise.all(
    enquiries.map((enquiry) =>
      prisma.enquiry.create({
        data: {
          ...enquiry,
          company: enquiry.company ?? "",
          dateSubmitted: date(enquiry.dateSubmitted)
        }
      })
    )
  );
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
