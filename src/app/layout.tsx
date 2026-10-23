import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CartProvider } from "@/components/cart/CartProvider";
import { SITE } from "@/lib/content";
import "lenis/dist/lenis.css";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

/* The one serif on the site. Archivo carries the interface and every uppercase
   display line; Newsreader is reserved for the editorial captions that sit on
   photography, so the page has a second voice instead of one register. */
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Marrow | Functional Streetwear Built for What's Next",
    template: "%s | Marrow",
  },
  description:
    "Marrow is a Manila streetwear label making functional outerwear, heavyweight jersey and wide-leg bottoms in limited seasonal runs. Free returns within 30 days.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.wordmark,
    title: "Marrow | Functional Streetwear Built for What's Next",
    description:
      "Functional silhouettes. Elevated essentials. Limited seasonal outerwear, jersey and bottoms made in Manila since 2018.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrow | Functional Streetwear Built for What's Next",
    description:
      "Functional silhouettes. Elevated essentials. Limited seasonal outerwear, jersey and bottoms made in Manila since 2018.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "light",
};

/* WebSite + Organization, rendered once for the whole site */
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.wordmark,
      description: SITE.description,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.wordmark,
      url: SITE.url,
      logo: `${SITE.url}/logo.png`,
      foundingDate: "2018",
      foundingLocation: { "@type": "Place", name: "Manila, Philippines" },
      description: SITE.description,
      sameAs: [
        "https://instagram.com/marrow",
        "https://tiktok.com/@marrow",
        "https://youtube.com/@marrow",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body className="flex min-h-dvh flex-col bg-ivory text-charcoal antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ivory focus:px-5 focus:py-3 focus:text-[16px] focus:font-semibold focus:tracking-[0.18em] focus:text-ink focus:uppercase"
        >
          Skip to content
        </a>

        <CartProvider>
          <SiteHeader />

          <SmoothScroll />

          <Reveal />

          <main id="main" className="flex-1">{children}</main>

          <SiteFooter />
        </CartProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
