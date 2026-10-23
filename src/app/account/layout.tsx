import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in to your Marrow account.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
