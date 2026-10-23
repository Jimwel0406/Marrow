import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { ProductBuy } from "@/components/shop/ProductBuy";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductStory } from "@/components/sections/ProductStory";
import {
  PRODUCTS,
  POLICIES,
  SITE,
  categoryBySlug,
  productBySlug,
} from "@/lib/content";
import { notFound } from "next/navigation";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.shot }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.description} ${product.material}. ${product.price}.`,
    alternates: { canonical: `/shop/${product.shot}` },
    openGraph: {
      title: `${product.name} — ${SITE.wordmark}`,
      description: product.description,
      images: [{ url: product.src }],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const category = categoryBySlug(product.category);
  const related = PRODUCTS.filter((entry) => entry.shot !== product.shot);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    material: product.material,
    image: `${SITE.url}${product.src}`,
    brand: { "@type": "Brand", name: SITE.wordmark },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/shop/${product.shot}`,
      priceCurrency: product.currency,
      price: product.amount.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <section
        aria-labelledby="product-heading"
        className="bg-ivory pt-[calc(64px+2.5rem)] pb-14 lg:pt-[calc(88px+4rem)] lg:pb-20"
      >
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Product photograph */}
            <div className="lg:col-span-7">
              <Photo
                shot={product.shot}
                src={product.src}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                alt={`${product.name} — ${product.material}`}
                className="aspect-[3/4] w-full"
              />
            </div>

            {/* Label stack */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(88px+2rem)]">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[0.16em] text-muted uppercase transition-colors duration-300 hover:text-ink"
                >
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                  The range
                </Link>

                <div className="mt-7">
                  <p className="eyebrow text-muted">{category?.name}</p>
                </div>

                <h1
                  id="product-heading"
                  className="section-title mt-3 text-ink"
                >
                  {product.name}
                </h1>

                <p className="deck mt-6 max-w-[31rem] text-[1.2rem] lg:text-[1.3rem]">
                  {product.description}
                </p>

                <ProductBuy product={product} />

                <div className="mt-9 border-t border-ink/12 pt-4">
                  <p className="text-[16px] leading-[1.7] tracking-[0.02em] text-muted-2">
                    {POLICIES.returns} {POLICIES.origin}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The long-form half of the page */}
      <ProductStory product={product} />

      {/* Rest of the range */}
      <section aria-labelledby="related-heading" className="bg-ivory py-16 lg:py-24">
        <div className="shell">
          <div className="flex items-end justify-between gap-6 border-t border-ink/12 pt-8">
            <h2
              id="related-heading"
              className="display text-display-sm text-ink"
            >
              Also in the range
            </h2>
            <Link href="/shop" className="rule-link text-charcoal hover:text-ink">
              Shop all
            </Link>
          </div>

          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
