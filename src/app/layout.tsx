import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { BrandLogo } from "@/components/site/BrandLogo";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Rhinora",
  "Rhinora provides system-led waterproofing solutions, technical guidance and project support for the New Zealand market."
);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const footerNav = [
    ["System", "/system"],
    ["Product", "/products"],
    ["Technical Library", "/technical-library"],
    ["Projects", "/projects"],
    ["Resources", "/resources"],
    ["About", "/about"],
    ["Contact", "/contact"]
  ];

  return (
    <html lang="en-NZ">
      <body>
        <Header />
        <main>{children}</main>
        <footer className="border-t border-black/10 bg-ink text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
            <div>
              <Link
                href="/"
                className="inline-block"
                aria-label="Rhinora home"
              >
                <BrandLogo inverted />
              </Link>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/72">
                System-led waterproofing solutions, technical guidance and project support for New Zealand buildings.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sand">Navigation</h2>
              <div className="mt-4 grid gap-2 text-sm text-white/75">
                {footerNav.map(([item, href]) => <Link key={item} href={href}>{item}</Link>)}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sand">Contact</h2>
              <div className="mt-4 grid gap-3 text-sm text-white/75">
                <span className="flex items-center gap-2"><MapPin size={16} /> Auckland, New Zealand</span>
                <span className="flex items-center gap-2"><Phone size={16} /> +64 9 000 0000</span>
                <span className="flex items-center gap-2"><Mail size={16} /> technical@rhinora.co.nz</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/55">
            (c) 2026 Rhinora. Waterproofing systems for the New Zealand market.
          </div>
        </footer>
      </body>
    </html>
  );
}
