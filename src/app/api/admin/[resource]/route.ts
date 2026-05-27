import { NextResponse } from "next/server";
import { createAdminRow, deleteAdminRow, updateAdminRow, type AdminResource } from "@/lib/adminRepository";

const resources = new Set(["articles", "categories", "documents", "enquiries", "products", "projects", "solutions"]);

type Context = {
  params: Promise<{ resource: string }>;
};

async function getResource(context: Context) {
  const { resource } = await context.params;
  if (!resources.has(resource)) return undefined;
  return resource as AdminResource;
}

export async function POST(request: Request, context: Context) {
  const resource = await getResource(context);
  if (!resource) return NextResponse.json({ error: "Unknown admin resource" }, { status: 404 });
  const row = await request.json();
  try {
    return NextResponse.json({ row: await createAdminRow(resource, row) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create row" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: Context) {
  const resource = await getResource(context);
  if (!resource) return NextResponse.json({ error: "Unknown admin resource" }, { status: 404 });
  const row = await request.json();
  if (!row.id) return NextResponse.json({ error: "Missing row id" }, { status: 400 });
  try {
    return NextResponse.json({ row: await updateAdminRow(resource, String(row.id), row) });
  } catch {
    return NextResponse.json({ error: "Unable to update row" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: Context) {
  const resource = await getResource(context);
  if (!resource) return NextResponse.json({ error: "Unknown admin resource" }, { status: 404 });
  const row = await request.json();
  if (!row.id) return NextResponse.json({ error: "Missing row id" }, { status: 400 });
  try {
    await deleteAdminRow(resource, String(row.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete row" }, { status: 500 });
  }
}
