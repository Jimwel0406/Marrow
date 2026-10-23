import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { ProductGrid } from "@/components/shop/ProductGrid";
import {
  COLLECTIONS,
  PRODUCTS,
  collectionByHandle,
} from "@/lib/content";

type Params = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({ handle: collection.handle }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const collection = collectionByHandle(handle);
  if (!collection) return {};

  return {
    title: collection.name,
    description: collection.deck,
    alternates: { canonical: `/collections/${collection.handle}` },
  };
}

export default async function CollectionPage({ params }: Params) {
  const { handle } = await params;
  const collection = collectionByHandle(handle);
  if (!collection) notFound();

  const products = PRODUCTS.filter((product) =>
    collection.shots.includes(product.shot),
  );

  return (
    <>
      {/* Collection cover — photograph, then the season set on it */}
      <section
        aria-labelledby="collection-heading"
        className="relative isolate overflow-hidden bg-ink text-ivory"
      >
        <div className="absolute inset-0">
          <Photo
            shot="drop"
            src="/images/winter-drop.jpg"
            sizes="100vw"
            priority
            alt="Low-angle view of a hooded black jacket showing the Marrow compass back graphic, against dark city architecture"
            className="h-full w-full"
            imgClassName="object-[70%_50%] lg:object-center"
          />
        </div>

        <div className="scrim-bottom absolute inset-0 lg:hidden" aria-hidden="true" />

        <div className="relative flex min-h-[min(78vh,720px)] items-end">
          <div className="shell w-full pb-14 lg:pb-20">
            <p className="eyebrow text-ivory/80">{collection.season}</p>

            <h1
              id="collection-heading"
              className="page-title mt-4 max-w-[24ch] text-ivory"
            >
              {collection.name}
            </h1>

            <p className="deck mt-6 max-w-[36rem] text-[1.15rem] text-ivory/85">
              {collection.deck}
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Pieces in this collection" className="bg-ivory py-16 lg:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <h2 className="display text-display-sm text-ink">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </h2>
            <Link href="/shop" className="rule-link text-charcoal hover:text-ink">
              The full range
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          <div className="mt-10">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      <section aria-label="Next drop" className="bg-ivory pb-20 lg:pb-28">
        <div className="shell">
          <div className="flex flex-col gap-6 border-t border-ink/12 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[30rem] text-body text-muted">
              The next run is announced to the newsletter first. Nothing is
              restocked mid-season.
            </p>
            <Link
              href="/#newsletter"
              className="rule-link text-charcoal hover:text-ink"
            >
              Join the list
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
