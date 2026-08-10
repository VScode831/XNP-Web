import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  inverted?: boolean;
  priority?: boolean;
};

export function BrandLogo({ className = "", inverted = false, priority = false }: BrandLogoProps) {
  return (
    <span
      className={`relative block h-[3.55rem] w-[10.25rem] shrink-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/images/rhinora-waterproofing-logo-transparent.png"
        alt=""
        width={1536}
        height={1024}
        priority={priority}
        sizes="164px"
        className={`absolute left-[-1rem] top-[-2.2rem] h-auto w-[12.25rem] max-w-none ${inverted ? "brightness-0 invert" : ""}`}
      />
    </span>
  );
}
