import { PrismaClient } from "@prisma/client";
import {
  enquiries,
  productCategories,
  products,
  projects,
  solutions,
  technicalDocuments
} from "../src/data/content";

function assertSafeSeedTarget() {
  const seedEnvironment = process.env.SEED_ENVIRONMENT?.trim().toLowerCase();

  if (process.env.NODE_ENV === "production") {
    throw new Error("Database seeding is disabled when NODE_ENV is production.");
  }

  if (seedEnvironment !== "development" && seedEnvironment !== "test") {
    throw new Error("Set SEED_ENVIRONMENT to development or test before running the destructive seed.");
  }

  if (process.env.ALLOW_DESTRUCTIVE_SEED !== "true") {
    throw new Error("Set ALLOW_DESTRUCTIVE_SEED=true to acknowledge that seeding deletes existing records.");
  }

  const databaseUrl = process.env.DATABASE_URL;
  const expectedIdentity = process.env.SEED_TARGET_IDENTITY?.trim();

  if (!databaseUrl || !expectedIdentity) {
    throw new Error("DATABASE_URL and SEED_TARGET_IDENTITY are required to identify the seed target.");
  }

  let target: URL;
  try {
    target = new URL(databaseUrl);
  } catch {
    throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL before seeding.");
  }

  if (target.protocol !== "postgres:" && target.protocol !== "postgresql:") {
    throw new Error("Database seeding is allowed only for an identified PostgreSQL target.");
  }

  const databaseName = decodeURIComponent(target.pathname.replace(/^\/+/, "")).split("/")[0];
  const databaseUser = decodeURIComponent(target.username);
  const databasePort = target.port || "5432";

  if (!databaseName || !databaseUser) {
    throw new Error("DATABASE_URL does not identify both a database and database user.");
  }

  const actualIdentity = `${databaseUser}@${target.hostname}:${databasePort}/${databaseName}`;
  if (actualIdentity !== expectedIdentity) {
    throw new Error("SEED_TARGET_IDENTITY does not match DATABASE_URL. Refusing to delete data.");
  }
}

assertSafeSeedTarget();

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
