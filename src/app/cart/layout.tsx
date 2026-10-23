import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Bag",
  description: "The pieces held in your Marrow bag. Limited seasonal runs, cut in Manila.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
