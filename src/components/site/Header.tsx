"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/site/BrandLogo";

const navItems = [
  { href: "/system", label: "System" },
  { href: "/products", label: "Product" },
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
        <Link href="/" onClick={() => setOpen(false)} aria-label="Rhinora home">
          <BrandLogo priority />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/72 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-1 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-forest-700 after:transition-transform after:duration-200 after:ease-out hover:text-forest-700 hover:after:scale-x-100 focus-visible:text-forest-700 focus-visible:outline-none focus-visible:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none ${
                  isActive ? "text-forest-700 after:scale-x-100" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/contact" className="hidden rounded-sm border border-forest-700 px-4 py-2 text-sm font-semibold text-forest-700 transition hover:bg-forest-700 hover:text-white lg:inline-flex">
          Discuss a project
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
            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-sm bg-forest-700 px-4 py-2 text-center font-semibold text-white">
              Discuss a project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
