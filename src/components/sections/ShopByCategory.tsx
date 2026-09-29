import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { CATEGORIES } from "@/lib/content";

export function ShopByCategory() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-ivory py-16 lg:py-24"
    >
      <div className="shell" data-reveal="rise">
        <h2
          id="categories-heading"
          className="display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] text-ink"
        >
          Shop by Category
        </h2>
      </div>

      {/* Full-bleed lookbook strip — five equal panels, hairline grid on
          desktop; CSS-only snap carousel on small screens (no JS). */}
      <ul
        className="carousel-scroll mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 lg:mt-12 lg:grid lg:grid-cols-5 lg:gap-px lg:overflow-visible lg:bg-stone lg:px-0 lg:pb-0"
        data-reveal="stagger-wipe"
      >
        {CATEGORIES.map((category) => (
          <li
            key={category.name}
            className="w-[72vw] shrink-0 snap-start sm:w-[44vw] lg:w-auto"
          >
            <Link
              href={category.href}
              className="group relative block aspect-[3/4] overflow-hidden focus-visible:outline-offset-2 lg:aspect-auto lg:h-[min(70vh,680px)]"
            >
              <Photo
                shot={category.shot}
                src={category.src}
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 44vw, 72vw"
                alt={`${category.name} category — Marrow streetwear`}
                className="photo-zoom absolute inset-0 h-full w-full"
              />

              <div
                aria-hidden="true"
                className="scrim-bottom absolute inset-x-0 bottom-0 h-1/2"
              />

              <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                <h3 className="display text-[clamp(1.5rem,2.2vw,2.25rem)] leading-none text-ivory">
                  {category.name}
                </h3>

                <span className="rule-link mt-3 text-[11px] text-ivory lg:text-[12px]">
                  Shop Now
                  <ArrowRight className="h-3 w-3" strokeWidth={1.75} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
