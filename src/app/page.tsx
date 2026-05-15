import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Blocks, FileText, LifeBuoy, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ProductCard } from "@/components/cards/ProductCard";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Section } from "@/components/site/Section";
import { productCategories, products, projects, solutions } from "@/data/content";

export default function Home() {
  const featuredProducts = products.filter((product) => product.status === "published").slice(0, 3);
  const reasons: Array<[string, LucideIcon, string]> = [
    ["System thinking", Blocks, "Products are presented as compatible assemblies for roofs, decks, tanking and envelope interfaces."],
    ["Technical support", LifeBuoy, "Design, application and document pathways are built into every product and solution page."],
    ["NZ market focus", ShieldCheck, "Content is written for local construction terminology, compliance expectations and project workflows."],
    ["Document access", FileText, "Data sheets, CAD details, guides, warranties and compliance documents are searchable."]
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-black/10 bg-white">
        <div className="mx-auto grid min-h-[680px] max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-forest-700">New Zealand technical supplier</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight text-ink md:text-6xl">
              Construction Material Systems for New Zealand Projects
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/68">
              Rhinora supplies system-led waterproofing and building envelope materials for architects, main contractors, installers and asset owners who need clear technical support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/solutions">Explore Solutions</ButtonLink>
              <ButtonLink href="/products" variant="secondary">View Products</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">Request Technical Support</ButtonLink>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-sm border border-black/10 bg-forest-50 shadow-soft">
            <Image src="/images/hero-systems.svg" alt="Layered construction material system illustration" fill priority className="object-cover" />
          </div>
        </div>
      </section>

      <Section title="Featured Solutions" description="Application-led pathways help users find products by use case, not only by product name.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.slice(0, 6).map((solution) => <SolutionCard key={solution.id} solution={solution} />)}
        </div>
      </Section>

      <Section title="Featured Product Categories" tone="white" description="The catalogue starts with waterproofing and is structured for expansion into broader construction material categories.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category) => (
            <Link key={category} href={`/products?category=${encodeURIComponent(category)}`} className="rounded-sm border border-black/10 p-5 transition hover:border-forest-700 hover:bg-forest-50">
              <h3 className="font-semibold text-ink">{category}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/62">Browse products, applications, related solutions and technical documents.</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Why Choose Rhinora" description="A professional supplier experience for technical construction products, not cheap e-commerce.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map(([title, Icon, text]) => (
            <div key={title} className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
              <Icon className="text-forest-700" size={24} />
              <h3 className="mt-4 font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/64">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Technical Support & Design Support" tone="dark" description="Help specifiers move from application and risk profile to product system, document set and enquiry pathway.">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="grid gap-4 md:grid-cols-3">
            {["Project review", "System selection", "CAD and document support"].map((item) => (
              <div key={item} className="rounded-sm border border-white/10 p-5">
                <h3 className="font-semibold">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-white/68">Placeholder support stream ready for sales, technical and specification workflows.</p>
              </div>
            ))}
          </div>
          <div className="rounded-sm bg-white p-5 text-ink">
            <h3 className="text-xl font-bold">Need help with a project?</h3>
            <p className="mt-3 text-sm leading-6 text-ink/65">Send the application, substrate, location and required documents. The mock enquiry flow is ready for future CRM or database integration.</p>
            <ButtonLink href="/contact">Request Technical Support</ButtonLink>
          </div>
        </div>
      </Section>

      <Section title="Product Highlights">
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </Section>

      <Section title="Project & Resource Highlights" tone="white">
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="rounded-sm border border-black/10 p-5 hover:bg-forest-50">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-700">{project.sector}</p>
              <h3 className="mt-2 font-semibold text-ink">{project.name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/64">{project.summary}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">Read case study <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Start with the application. We will help connect the system.</h2>
            <p className="mt-3 max-w-2xl text-white/70">Waterproofing membrane NZ, commercial waterproofing, roof protection and building envelope materials in one expandable platform.</p>
          </div>
          <ButtonLink href="/contact" variant="secondary">Contact Rhinora</ButtonLink>
        </div>
      </Section>
    </>
  );
}
