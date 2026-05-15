import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/types/content";

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link href={`/solutions/${solution.slug}`} className="group block overflow-hidden rounded-sm border border-black/10 bg-white shadow-soft transition hover:-translate-y-0.5">
      <div className="relative h-44 bg-forest-50">
        <Image src={solution.image} alt="" fill className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-ink">{solution.title}</h3>
        <p className="mt-2 text-sm leading-6 text-ink/64">{solution.summary}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
          View solution <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
