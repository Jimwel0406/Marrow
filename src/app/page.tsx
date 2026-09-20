import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Campaign } from "@/components/sections/Campaign";
import { ShopByCategory } from "@/components/sections/ShopByCategory";
import { BrandStory } from "@/components/sections/BrandStory";
import { WinterDrop } from "@/components/sections/WinterDrop";
import { Newsletter } from "@/components/sections/Newsletter";
import { FEATURED_PRODUCTS, SITE } from "@/lib/content";

const season = `Fall/Winter ${new Date().getFullYear()}`;

export const metadata: Metadata = {
  title: "Marrow | Functional Streetwear Built for What's Next",
  description: `Shop the Marrow ${season} collection: hooded utility jackets, heavyweight crewnecks, wide-leg cargo pants and caps. Limited runs, made in Manila, free returns.`,
  alternates: { canonical: "/" },
};

/* Featured products, so answer engines can read the range without crawling a grid */
const featuredSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Marrow ${season} — The Essentials`,
  itemListElement: FEATURED_PRODUCTS.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      sku: product.piece,
      material: product.material,
      brand: { "@type": "Brand", name: SITE.wordmark },
      offers: {
        "@type": "Offer",
        url: `${SITE.url}/shop/${product.shot}`,
        priceCurrency: product.currency,
        price: product.amount.toFixed(2),
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
  })),
};

export default function HomePage() {
  return (
    <>
      {/* Hero — Fall/Winter 2025 */}
      <Hero />

      {/* Featured products — The Essentials */}
      <FeaturedProducts />

      {/* Campaign — City Moves */}
      <Campaign />

      {/* Shop by category */}
      <ShopByCategory />

      {/* Brand story — More Than Just Clothes */}
      <BrandStory />

      {/* Limited drop — The Winter Drop */}
      <WinterDrop />

      {/* Newsletter — Be Part of the Movement */}
      <Newsletter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(featuredSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
