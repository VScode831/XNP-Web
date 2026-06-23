import type { Metadata } from "next";

const siteName = "Rhinora";
const baseTitle = "Rhinora | Metal Roof Protection NZ";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const fullTitle = title === siteName ? baseTitle : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "waterproofing membrane NZ",
      "metal roof protection",
      "metal roof renewal",
      "self-fusing film",
      "roof corrosion protection"
    ],
    alternates: {
      canonical: path
    },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      siteName
    }
  };
}
