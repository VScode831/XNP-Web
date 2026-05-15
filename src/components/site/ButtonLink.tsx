import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const classes = {
    primary: "bg-forest-700 text-white hover:bg-forest-900",
    secondary: "border border-forest-700 text-forest-700 hover:bg-forest-50",
    ghost: "text-forest-700 hover:bg-forest-50"
  };

  return (
    <Link href={href} className={`inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold transition ${classes[variant]}`}>
      {children}
    </Link>
  );
}
