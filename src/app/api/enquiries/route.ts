import { NextResponse } from "next/server";
import { createEnquiry } from "@/lib/contentRepository";

export async function POST(request: Request) {
  const body = await request.json();
  const required = ["type", "name", "email", "message"];
  const missing = required.filter((field) => !body[field]);

  if (missing.length) {
    return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
  }

  try {
    const enquiry = await createEnquiry(body);
    return NextResponse.json({ enquiry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to store enquiry" }, { status: 500 });
  }
}
