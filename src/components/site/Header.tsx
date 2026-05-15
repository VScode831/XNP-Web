"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/solutions", label: "Solutions" },
  { href: "/products", label: "Products" },
  { href: "/technical-library", label: "Technical Library" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fbfaf6]/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-sm bg-forest-700 text-lg font-bold text-white">R</span>
          <span>
            <span className="block text-xl font-bold tracking-tight text-ink">Rhinora</span>
            <span className="block text-xs uppercase tracking-[0.18em] text-ink/55">Material Systems</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/72 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "text-forest-700" : "hover:text-forest-700"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/admin" className="hidden rounded-sm border border-forest-700 px-4 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-700 hover:text-white lg:inline-flex">
          Admin
        </Link>
        <button className="focus-ring rounded-sm p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-black/10 bg-[#fbfaf6] px-5 py-4 lg:hidden">
          <nav className="grid gap-3 text-sm font-medium text-ink/75">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/admin" onClick={() => setOpen(false)} className="rounded-sm bg-forest-700 px-4 py-2 text-center font-semibold text-white">
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
