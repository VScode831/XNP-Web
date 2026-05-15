import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/content";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group grid overflow-hidden rounded-sm border border-black/10 bg-white shadow-soft transition hover:-translate-y-0.5">
      <div className="relative h-40 bg-forest-50">
        <Image src={product.image} alt="" fill className="object-cover" />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-forest-700">{product.category}</p>
        <h3 className="mt-2 text-lg font-semibold text-ink">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-ink/64">{product.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.applications.slice(0, 3).map((application) => (
            <span key={application} className="rounded-sm bg-forest-50 px-2 py-1 text-xs text-forest-900">
              {application}
            </span>
          ))}
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
          Product details <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
