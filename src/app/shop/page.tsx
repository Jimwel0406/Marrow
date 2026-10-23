import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/shop/ProductGrid";
import {
  CATALOGUE,
  CATEGORIES,
  PRODUCTS,
  categoryBySlug,
  productsIn,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The Marrow range: taped ripstop outerwear, heavyweight loopback jersey, wide-leg cargos and caps, cut in Manila in limited seasonal runs.",
  alternates: { canonical: "/shop" },
};

/* Lookbook catalogue. The page opens on the product, not on a masthead: the
   title and facets hold a sticky rail on the left at desktop, and the pieces
   run as a staggered two-up beside it. Stacks to one column below lg. */

const FACET =
  "group flex items-baseline gap-3 text-[16px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = categoryBySlug(category);
  const products = active ? productsIn(active.slug) : PRODUCTS;

  return (
    <section className="bg-ivory pt-[calc(64px+3rem)] pb-16 lg:pt-[calc(88px+4rem)] lg:pb-28">
      <div className="shell lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
        <aside className="lg:sticky lg:top-[calc(88px+3rem)] lg:col-span-4">
          <div data-reveal="rise">
            <p className="eyebrow text-muted">{CATALOGUE.eyebrow}</p>
            <h1 className="page-title mt-5 text-ink">
              {CATALOGUE.title}
            </h1>
            <p className="deck mt-6 max-w-[24rem]">{CATALOGUE.deck}</p>
          </div>

          {/* Facets: category words only, one hairline rule on the active one.
              A column on desktop, a wrapping row on mobile. */}
          <nav
            aria-label="Categories"
            className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-ink/12 pt-6 lg:mt-14 lg:flex-col lg:gap-y-3"
          >
            <Link
              href="/shop"
              aria-current={active ? undefined : "page"}
              className={`${FACET} ${
                active ? "text-muted hover:text-ink" : "text-ink"
              }`}
            >
              <span className={!active ? "border-b border-ink pb-1" : ""}>All</span>
            </Link>

            {CATEGORIES.map((entry) => {
              const current = active?.slug === entry.slug;
              return (
                <Link
                  key={entry.slug}
                  href={entry.href}
                  aria-current={current ? "page" : undefined}
                  className={`${FACET} ${
                    current ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className={current ? "border-b border-ink pb-1" : ""}>
                    {entry.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="mt-12 lg:col-span-8 lg:mt-0">
          {products.length > 0 ? (
            <ProductGrid products={products} layout="pair" />
          ) : (
            <div className="max-w-[34rem] lg:pt-2">
              <p className="text-body text-muted">
                Nothing in {active?.name} this season. The run is finite and the
                category is empty until the next one opens.
              </p>
              <Link
                href="/shop"
                className="rule-link mt-6 text-charcoal hover:text-ink"
              >
                See the full range
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
