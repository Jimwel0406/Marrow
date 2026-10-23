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
          className="section-title text-ink"
        >
          Shop by Category
        </h2>
      </div>

      {/* Full-bleed lookbook band — five panels set edge to edge with no rule
          between them, so the row reads as one continuous sheet of photography
          rather than a set of framed cards. The category name is set in the
          editorial serif directly on the image; below 992px the band becomes a
          CSS-only snap carousel (no JS). */}
      <ul
        className="carousel-scroll mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 lg:mt-12 lg:grid lg:grid-cols-5 lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
        data-reveal="stagger-wipe"
      >
        {CATEGORIES.map((category) => (
          <li
            key={category.name}
            className="w-[72vw] shrink-0 snap-start sm:w-[44vw] lg:w-auto"
          >
            <Link
              href={category.href}
              className="group relative block aspect-[3/4] overflow-hidden focus-visible:outline-offset-2 lg:aspect-auto lg:h-[min(72vh,700px)]"
            >
              <Photo
                shot={category.shot}
                src={category.src}
                // Portrait sources (2:3) cover tall desktop panels. Request
                // enough pixels for their rendered height as well as width,
                // including the small hover zoom, to avoid upscaling a thumbnail.
                sizes="(min-width: 1024px) max(21vw, min(50vh, 484px)), (min-width: 640px) 46vw, 75vw"
                alt={`${category.name} category — Marrow streetwear`}
                className="photo-zoom absolute inset-0 h-full w-full"
              />

              <div
                aria-hidden="true"
                className="scrim-bottom absolute inset-x-0 bottom-0 h-2/3"
              />

              <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 xl:p-8">
                <h3 className="serif-display text-[clamp(1.9rem,2.9vw,3.25rem)] leading-[0.95] text-ivory">
                  {category.name}
                </h3>

                <span className="rule-link mt-4 text-[16px] text-ivory lg:text-[16px]">
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
