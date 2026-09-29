import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { FEATURED_PRODUCTS } from "@/lib/content";

export function FeaturedProducts() {
  return (
    <section
      aria-labelledby="essentials-heading"
      className="bg-ivory py-16 lg:py-24"
    >
      {/* Editorial masthead — display-lg headline, copy and action right-aligned */}
      <div className="shell">
        <div
          className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-12"
          data-reveal="rise"
        >
          <div>
            <h2
              id="essentials-heading"
              className="display mt-5 text-display-lg text-ink"
            >
              <span className="block">The</span>
              <span className="block">Essentials</span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end md:pb-3">
            <Link
              href="/shop"
              className="rule-link text-charcoal hover:text-ink"
            >
              Shop All
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>

      {/* Full-bleed uniform rail — four equal panels, 0 gap, hairline grid */}
      <ul
        className="mt-8 grid grid-cols-2 gap-px bg-stone lg:mt-12 lg:grid-cols-4"
        data-reveal="stagger-sm"
      >
        {FEATURED_PRODUCTS.map((product) => (
          <li key={product.name} className="group bg-ivory">
            <Link
              href={`/shop/${product.shot}`}
              className="block focus-visible:outline-offset-4"
            >
              <Photo
                shot={product.shot}
                src={product.src}
                sizes="(min-width: 768px) 25vw, 50vw"
                alt={`${product.name} — ${product.material}`}
                className="photo-zoom aspect-[3/4] w-full"
              />

              <div className="px-4 pt-4 pb-6 lg:px-6 lg:pt-5 lg:pb-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[12px] font-semibold tracking-[0.14em] text-ink uppercase lg:text-[13px]">
                    {product.name}
                  </h3>
                  <span className="text-[14px] font-medium tabular-nums text-ink lg:text-[15px]">
                    {product.price}
                  </span>
                </div>

                <p className="mt-1.5 text-[12px] text-muted lg:text-[13px]">
                  {product.material}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
