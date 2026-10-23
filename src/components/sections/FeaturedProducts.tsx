import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { FEATURED_PRODUCTS } from "@/lib/content";

export function FeaturedProducts() {
  return (
    <section
      aria-labelledby="essentials-heading"
      className="bg-ivory py-16 lg:py-24"
    >
      {/* Editorial masthead with the action aligned at the right. */}
      <div className="shell">
        <div
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16"
          data-reveal="rise"
        >
          <h2
            id="essentials-heading"
            className="section-title text-ink"
          >
            <span className="block">The</span>
            <span className="block">Essentials</span>
          </h2>

          <div className="flex max-w-[30rem] flex-col items-start gap-6 md:items-end">
            <Link
              href="/shop"
              className="rule-link text-charcoal hover:text-ink"
            >
              View the range
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>

      {/* Product index — four plates on an open grid: 20px column gutters,
          40px row gutters, no rules. The label stack sits directly under each
          plate, so the name, price and fabric read as one block and the row
          stays calm. Below 992px the grid steps down to three, two, then one
          column without changing the card. */}
      <div className="shell mt-12 lg:mt-16">
        <ul
          className="grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 min-[768px]:grid-cols-3 min-[992px]:grid-cols-4"
          data-reveal="stagger-sm"
        >
          {FEATURED_PRODUCTS.map((product) => (
            <li key={product.name} className="min-w-0">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
