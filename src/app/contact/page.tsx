import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Contact", "Contact Rhinora about waterproofing systems, technical review and project support in New Zealand.", "/contact");

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to Us About Your Waterproofing Project" description="Tell us about the building, substrate, water ingress issue and project priorities. We can help identify the right technical review and system pathway." />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">Contact details</h2>
            <div className="mt-5 grid gap-4 text-sm text-ink/72">
              <span className="flex items-center gap-2"><MapPin size={17} /> Auckland, New Zealand</span>
              <span className="flex items-center gap-2"><Phone size={17} /> +64 9 000 0000</span>
              <span className="flex items-center gap-2"><Mail size={17} /> technical@rhinora.co.nz</span>
            </div>
            <div className="mt-8 rounded-sm bg-forest-50 p-4">
              <h3 className="font-semibold">What to send</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">Include photos, substrate condition, leak locations, building age and any drawings or technical documents available for review.</p>
            </div>
          </aside>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
