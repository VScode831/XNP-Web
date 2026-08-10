import type { Metadata } from "next";

const siteName = "Rhinora";
const baseTitle = "Rhinora | Waterproofing Systems New Zealand";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const fullTitle = title === siteName ? baseTitle : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "waterproofing membrane NZ",
      "waterproofing systems New Zealand",
      "waterproofing solutions NZ",
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
