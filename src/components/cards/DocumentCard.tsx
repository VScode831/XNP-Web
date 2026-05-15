import { Download } from "lucide-react";
import type { TechnicalDocument } from "@/types/content";

export function DocumentCard({ document }: { document: TechnicalDocument }) {
  return (
    <article className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-forest-700">{document.type}</p>
          <h3 className="mt-2 text-lg font-semibold text-ink">{document.title}</h3>
        </div>
        <span className="rounded-sm bg-sand/35 px-2 py-1 text-xs font-semibold text-ink">v{document.version}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/70">
        <span className="rounded-sm bg-forest-50 px-2 py-1">{document.category}</span>
        <span className="rounded-sm bg-forest-50 px-2 py-1">{document.application}</span>
        <span className="rounded-sm bg-forest-50 px-2 py-1">{document.publishDate}</span>
      </div>
      <a href={document.fileUrl} className="mt-5 inline-flex items-center gap-2 rounded-sm bg-forest-700 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-900">
        <Download size={16} /> Download
      </a>
    </article>
  );
}
