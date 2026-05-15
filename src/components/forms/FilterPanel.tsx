"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterPanelProps = {
  searchLabel?: string;
  filters: Array<{ name: string; label: string; options: readonly string[] }>;
};

export function FilterPanel({ searchLabel = "Search", filters }: FilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function setParam(name: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(name, value);
    else next.delete(name);
    router.push(`${pathname}?${next.toString()}`);
  }

  return (
    <div className="rounded-sm border border-black/10 bg-white p-4 shadow-soft">
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
        <label className="block">
          <span className="text-sm font-semibold text-ink">{searchLabel}</span>
          <span className="mt-2 flex items-center gap-2 rounded-sm border border-black/15 px-3 py-2">
            <Search size={18} className="text-ink/45" />
            <input
              value={params.get("q") ?? ""}
              onChange={(event) => setParam("q", event.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search by name, application or document"
            />
          </span>
        </label>
        {filters.map((filter) => (
          <label key={filter.name} className="block">
            <span className="text-sm font-semibold text-ink">{filter.label}</span>
            <select
              value={params.get(filter.name) ?? ""}
              onChange={(event) => setParam(filter.name, event.target.value)}
              className="mt-2 w-full rounded-sm border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-forest-700"
            >
              <option value="">All</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}
