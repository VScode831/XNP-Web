import Link from "next/link";
import { Shield } from "lucide-react";

const adminNav = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Categories", "/admin/categories"],
  ["Solutions", "/admin/solutions"],
  ["Documents", "/admin/documents"],
  ["Projects", "/admin/projects"],
  ["Resources", "/admin/resources"],
  ["Enquiries", "/admin/enquiries"]
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-black/10 bg-[#f1f0ea]">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[250px_1fr] lg:px-8">
        <aside className="rounded-sm border border-black/10 bg-white p-4 shadow-soft lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-2 font-bold text-ink"><Shield size={18} /> Admin</div>
          <p className="mt-2 text-xs leading-5 text-ink/60">Authentication placeholder. Replace with NextAuth, Supabase Auth or your CMS login.</p>
          <nav className="mt-5 grid gap-1 text-sm">
            {adminNav.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-sm px-3 py-2 font-semibold text-ink/70 hover:bg-forest-50 hover:text-forest-700">
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
