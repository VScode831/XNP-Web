import type { ReactNode } from "react";

type SectionProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  tone?: "default" | "white" | "dark";
};

export function Section({ title, description, children, tone = "default" }: SectionProps) {
  const toneClasses = {
    default: "bg-transparent text-ink",
    white: "bg-white text-ink",
    dark: "bg-ink text-white"
  };

  return (
    <section className={`py-14 lg:py-20 ${toneClasses[tone]}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {(title || description) && (
          <div className="mb-9 max-w-3xl">
            {title && <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>}
            {description && <p className={`mt-4 text-base leading-7 ${tone === "dark" ? "text-white/72" : "text-ink/65"}`}>{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
