import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="border-b border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest-700">{eyebrow}</p>}
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-ink md:text-5xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/68">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
