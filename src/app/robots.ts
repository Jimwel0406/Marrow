import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

/* AI crawlers are explicitly allowed — being blocked means never being cited. */
const AI_AGENTS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "OAI-SearchBot",
  "ChatGPT-User",
  "CCBot",
  "Applebot-Extended",
  "cohere-ai",
  "Amazonbot",
  "Meta-ExternalAgent",
  "Bytespider",
  "ImagesiftBot",
  "Diffbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart", "/account", "/_next/"],
      },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
