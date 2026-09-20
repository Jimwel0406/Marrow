import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { FEATURED_PRODUCTS } from "@/lib/content";

export function FeaturedProducts() {
  return (
    <section
      aria-labelledby="essentials-heading"
      className="bg-ivory py-10 lg:py-[3.5rem]"
    >
      <div className="shell grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,0.33fr)_minmax(0,0.67fr)]">
        {/* Section intro */}
        <div className="lg:pt-1">
          <p className="eyebrow text-muted">Featured Products</p>

          <h2
            id="essentials-heading"
            className="display mt-5 text-display-md leading-[1.35] text-ink"
          >
            <span className="block">The</span>
            <span className="block">Essentials</span>
          </h2>

          <p className="mt-5 max-w-[26ch] text-body text-muted">
            Timeless pieces, designed for everyday movement.
          </p>

          <Link
            href="/shop"
            className="rule-link mt-7 text-charcoal hover:text-ink"
          >
            Shop All
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>

        {/* Product rail — reads as part of the editorial grid, not as cards */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-4 sm:gap-x-5">
          {FEATURED_PRODUCTS.map((product) => (
            <li key={product.name} className="group">
              <Link
                href={`/shop/${product.shot}`}
                className="block focus-visible:outline-offset-4"
              >
                <Photo
                  shot={product.shot}
                  src={product.src}
                  sizes="(min-width: 1024px) 17vw, (min-width: 640px) 24vw, 45vw"
                  alt={`${product.name} — ${product.material}`}
                  className="photo-zoom aspect-[3/4] w-full"
                />
                <h3 className="mt-4 text-[12px] font-semibold tracking-[0.14em] text-ink uppercase">
                  {product.name}
                </h3>
                <p className="mt-1.5 text-[15px] font-medium text-muted">
                  {product.price}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
