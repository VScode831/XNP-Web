import { Database, FileText, Inbox, Layers, Package, PenSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { articles, enquiries, products, projects, solutions, technicalDocuments } from "@/data/content";

export default function AdminDashboardPage() {
  const stats: Array<[string, number, LucideIcon]> = [
    ["Products", products.length, Package],
    ["Solutions", solutions.length, Layers],
    ["Documents", technicalDocuments.length, FileText],
    ["Projects", projects.length, Database],
    ["Articles", articles.length, PenSquare],
    ["Enquiries", enquiries.length, Inbox]
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-sm border border-black/10 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Backend placeholder</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Rhinora Content Dashboard</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/65">
          Mock CRUD screens are wired to local React state. The data contracts match the mock repository in `src/data/content.ts` and can be replaced by Prisma, Supabase, PostgreSQL or a headless CMS service layer.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value, Icon]) => (
          <article key={label} className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
            <Icon size={22} className="text-forest-700" />
            <p className="mt-4 text-3xl font-bold">{value}</p>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink/55">{label}</h2>
          </article>
        ))}
      </section>
    </div>
  );
}
