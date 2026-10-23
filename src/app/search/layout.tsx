import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Marrow range by name, cloth or category.",
  alternates: { canonical: "/search" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
