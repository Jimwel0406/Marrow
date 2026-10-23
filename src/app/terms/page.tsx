import type { Metadata } from "next";
import { ProsePage } from "@/components/sections/ProsePage";
import { POLICIES, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms this Marrow demo storefront operates under.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Terms of Service"
      deck="The short version: this is a demonstration storefront."
      sections={[
        {
          heading: "The storefront",
          paragraphs: [
            `${SITE.name} is a personal project built to demonstrate a storefront design. Products, prices and policies are part of that demonstration.`,
            "Placing an order in checkout does not create a contract, does not charge a card and does not reserve stock.",
          ],
        },
        {
          heading: "Product information",
          paragraphs: [
            "Materials, construction details and prices describe the range as it is presented on this site. Colours can differ between screens.",
            POLICIES.runs,
          ],
        },
        {
          heading: "Use of the site",
          paragraphs: [
            "You may browse, search and add pieces to the bag freely. You may not attempt to disrupt the site or scrape it at volume.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The Marrow name, wordmark and the photography shown here belong to the project. Typefaces are licensed by their foundries.",
          ],
        },
      ]}
      note="These terms are illustrative and are not legal advice."

    />
  );
}
