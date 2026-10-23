import type { Metadata } from "next";
import { ProsePage } from "@/components/sections/ProsePage";
import { POLICIES, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "How Marrow ships: cut in Manila in limited runs, free returns within 30 days.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <ProsePage
      eyebrow="Help"
      title="Shipping & Returns"
      deck={`${POLICIES.origin} ${POLICIES.returns}`}
      sections={[
        {
          heading: "Production",
          paragraphs: [
            "Every piece is cut and finished in Manila in a limited seasonal run. A run closes when the cloth does, so sizes are not restocked mid-season.",
            "Nothing is held back for a later drop. If a size shows as available, it is part of the current run.",
          ],
        },
        {
          heading: "Shipping",
          paragraphs: [
            "Orders are dispatched from the studio in Manila. Delivery cost and time depend on the destination and are quoted at checkout.",
            "This storefront is a demo, so no shipment is arranged and no shipping figure is calculated.",
          ],
        },
        {
          heading: "Returns",
          paragraphs: [
            "Returns are free within 30 days of delivery. Pieces should come back unworn, with the tags attached and the original packaging where possible.",
          ],
          bullets: [
            "30 days from delivery",
            "Unworn, tags attached",
            "Free return shipping",
          ],
        },
        {
          heading: "Exchanges",
          paragraphs: [
            "Because runs are finite, an exchange depends on the size still being in the run. If it is not, the return is refunded instead.",
          ],
        },
      ]}
      note={`${SITE.name} is a demo storefront built as a personal project. No orders are processed.`}
    />
  );
}
