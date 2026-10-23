import type { MetadataRoute } from "next";
import {
  CATEGORIES,
  COLLECTIONS,
  JOURNAL_NOTES,
  PRODUCTS,
  SITE,
} from "@/lib/content";

const PAGE_PRIORITY: { path: string; priority: number }[] = [
  { path: "/shop", priority: 0.9 },
  { path: "/collections", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/journal", priority: 0.6 },
  { path: "/cart", priority: 0.3 },
  { path: "/contact", priority: 0.4 },
  { path: "/shipping", priority: 0.4 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...PAGE_PRIORITY.map((page) => ({
      url: `${SITE.url}${page.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    ...CATEGORIES.map((category) => ({
      url: `${SITE.url}/shop?category=${category.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${SITE.url}/shop/${product.shot}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...COLLECTIONS.map((collection) => ({
      url: `${SITE.url}/collections/${collection.handle}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...JOURNAL_NOTES.map((note) => ({
      url: `${SITE.url}/journal/${note.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
