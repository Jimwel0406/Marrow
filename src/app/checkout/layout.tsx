import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Delivery details and payment for the Marrow bag.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
