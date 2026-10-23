import type { Metadata } from "next";
import { ProsePage } from "@/components/sections/ProsePage";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What this Marrow storefront stores, and what it does not.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Privacy Policy"
      deck="What this site keeps, and what it never asks for."
      sections={[
        {
          heading: "What is stored on your device",
          paragraphs: [
            "The shopping bag is kept in your browser's local storage so it survives a page reload. It holds the product, size and quantity you selected. Clearing your browser storage removes it.",
            "The newsletter and contact forms do not send anywhere in this build; whatever you type stays in the page until you leave it.",
          ],
        },
        {
          heading: "What is not collected",
          paragraphs: [
            "There is no account system, no analytics script, no advertising pixel and no payment processor connected to this site.",
            "Card details typed into checkout are never transmitted, stored or logged. The checkout is a demonstration of the flow only.",
          ],
        },
        {
          heading: "Third parties",
          paragraphs: [
            "The site loads its typefaces from Google Fonts at build time. Social links in the footer point to external platforms, which have their own privacy terms once you follow them.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `Questions about this policy can go to the studio through the contact page or by direct message on Instagram.`,
          ],
        },
      ]}
      note={`${SITE.name} is a demo storefront built as a personal project.`}

    />
  );
}
