import type { Metadata } from "next";

const siteName = "Rhinora";
const baseTitle = "Rhinora | Construction Material Systems NZ";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const fullTitle = title === siteName ? baseTitle : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "waterproofing membrane NZ",
      "commercial waterproofing",
      "roof protection",
      "building envelope materials",
      "technical construction products"
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
