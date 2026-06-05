"use client";

import { Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

type ContactFormProps = {
  defaultType?: "General" | "Technical support" | "Product enquiry";
  relatedProduct?: string;
  relatedSolution?: string;
};

export function ContactForm({ defaultType = "General", relatedProduct, relatedSolution }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/enquiries", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" }
    });
    setStatus(response.ok ? "sent" : "error");
  }

  return (
    <form onSubmit={submit} className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Enquiry type
          <select name="type" defaultValue={defaultType} className="rounded-sm border border-black/15 px-3 py-2 font-normal">
            <option>General</option>
            <option>Technical support</option>
            <option>Product enquiry</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Name
          <input required name="name" className="rounded-sm border border-black/15 px-3 py-2 font-normal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Company
          <input name="company" className="rounded-sm border border-black/15 px-3 py-2 font-normal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Email
          <input required type="email" name="email" className="rounded-sm border border-black/15 px-3 py-2 font-normal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Phone
          <input name="phone" className="rounded-sm border border-black/15 px-3 py-2 font-normal" />
        </label>
        <input type="hidden" name="relatedProduct" value={relatedProduct ?? ""} />
        <input type="hidden" name="relatedSolution" value={relatedSolution ?? ""} />
      </div>
      <label className="mt-4 grid gap-2 text-sm font-semibold">
        Message
        <textarea required name="message" rows={5} className="rounded-sm border border-black/15 px-3 py-2 font-normal" />
      </label>
      <button className="mt-5 inline-flex items-center gap-2 rounded-sm bg-forest-700 px-5 py-3 text-sm font-semibold text-white hover:bg-forest-900">
        <Send size={16} /> Submit enquiry
      </button>
      {status === "sent" && <p className="mt-3 text-sm font-semibold text-forest-700">Enquiry submitted successfully.</p>}
      {status === "error" && <p className="mt-3 text-sm font-semibold text-clay">There was a problem submitting the enquiry.</p>}
    </form>
  );
}
