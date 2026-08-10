import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createEnquiry } from "@/lib/enquiryRepository";

export async function POST(request: Request) {
  const body = await request.json();
  const required = ["type", "name", "email", "message"];
  const missing = required.filter((field) => !body[field]);

  if (missing.length) {
    return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
  }

  try {
    const enquiry = await createEnquiry(body);
    revalidatePath("/admin");
    revalidatePath("/admin/enquiries");
    return NextResponse.json({ enquiry }, { status: 201 });
  } catch (error) {
    console.error("Unable to store enquiry", error);
    return NextResponse.json({ error: "Unable to store enquiry" }, { status: 500 });
  }
}
