import "server-only";

import type { Enquiry } from "@/types/content";
import { prisma } from "@/lib/prisma";

const allowedTypes = new Set<Enquiry["type"]>(["General", "Technical support", "Product enquiry"]);

function stringValue(input: Record<string, unknown>, field: string) {
  return String(input[field] ?? "").trim();
}

function optionalStringValue(input: Record<string, unknown>, field: string) {
  const value = stringValue(input, field);
  return value || null;
}

type PrismaEnquiry = Awaited<ReturnType<typeof prisma.enquiry.create>>;

function toEnquiry(row: PrismaEnquiry): Enquiry {
  return {
    id: row.id,
    type: row.type as Enquiry["type"],
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone ?? undefined,
    message: row.message,
    relatedProduct: row.relatedProduct ?? undefined,
    relatedSolution: row.relatedSolution ?? undefined,
    dateSubmitted: row.dateSubmitted.toISOString(),
    status: row.status as Enquiry["status"]
  };
}

export async function createEnquiry(input: Record<string, unknown>): Promise<Enquiry> {
  const type = stringValue(input, "type") as Enquiry["type"];

  if (!allowedTypes.has(type)) {
    throw new Error("Invalid enquiry type.");
  }

  const enquiry = await prisma.enquiry.create({
    data: {
      type,
      name: stringValue(input, "name"),
      company: stringValue(input, "company"),
      email: stringValue(input, "email"),
      phone: optionalStringValue(input, "phone"),
      message: stringValue(input, "message"),
      relatedProduct: optionalStringValue(input, "relatedProduct"),
      relatedSolution: optionalStringValue(input, "relatedSolution")
    }
  });

  return toEnquiry(enquiry);
}
