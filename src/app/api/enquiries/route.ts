import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const required = ["type", "name", "email", "message"];
  const missing = required.filter((field) => !body[field]);

  if (missing.length) {
    return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
  }

  const enquiry = {
    id: `enq-${Date.now()}`,
    ...body,
    dateSubmitted: new Date().toISOString(),
    status: "new"
  };

  return NextResponse.json({ enquiry }, { status: 201 });
}
