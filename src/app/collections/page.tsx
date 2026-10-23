import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { COLLECTIONS, PRODUCTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "The Marrow seasonal runs. Each collection is cut once, in limited numbers.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <section
        aria-labelledby="collections-heading"
        className="bg-ivory pt-[calc(64px+2rem)] pb-12 lg:pt-[calc(88px+2.5rem)] lg:pb-16"
      >
        <div className="shell">
          <div className="mb-8">
            <h1 id="collections-heading" className="eyebrow text-muted">
              Collections
            </h1>
          </div>
          <ul className="space-y-16 lg:space-y-24">
            {COLLECTIONS.map((collection) => {
              const pieces = PRODUCTS.filter((product) =>
                collection.shots.includes(product.shot),
              ).length;

              return (
                <li key={collection.handle} className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-[4.5vw]">
                  <div className="min-w-0" data-reveal="rise">
                    <p className="eyebrow text-muted">{collection.season} / Limited run</p>
                    <h2 className="page-title mt-7 max-w-[10ch] text-ink">
                      {collection.name.split(" ").map((word, index, words) => (
                        <span key={`${word}-${index}`} className="block">
                          {index === words.length - 1 ? <em>{word}.</em> : word}
                        </span>
                      ))}
                    </h2>
                    <p className="mt-8 max-w-[22rem] text-body text-muted lg:mt-10">
                      {pieces} {pieces === 1 ? "piece" : "pieces"}. A cold-weather run in limited numbers.
                    </p>
                    <Link href={`/collections/${collection.handle}`} className="rule-link mt-7 inline-flex items-center gap-10 text-charcoal hover:text-ink">
                      Explore the collection
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </Link>
                  </div>
                  <figure className="min-w-0" data-reveal="rise">
                    <Link href={`/collections/${collection.handle}`} className="block">
                      <Photo
                        shot="drop"
                        src="/images/collections/winter-campaign-v2.png"
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        priority
                        quality={90}
                        alt="Generated fashion editorial of a model in black technical outerwear against sunlit concrete with sculptural shadows"
                        className="aspect-[3/4] w-full lg:aspect-auto lg:h-[min(66vh,660px)]"
                        imgClassName="object-top"
                      />
                    </Link>
                    <figcaption className="mt-3 text-[16px] leading-relaxed text-muted-2">
                      Winter study — generated editorial concept.
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-label="Range" className="bg-ivory pb-24 lg:pb-32">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/12 pt-10">
            <h2 className="section-title max-w-[20ch] text-ink">
              Every piece in the range
            </h2>
            <Link href="/shop" className="rule-link shrink-0 whitespace-nowrap text-charcoal hover:text-ink">
              Shop all
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={PRODUCTS} />
          </div>
        </div>
      </section>

      {/* Statement ending: one line, then the list */}
      <section aria-label="Run policy" className="bg-ivory pb-20 lg:pb-28">
        <div className="shell flex flex-col gap-8 border-t border-ink/12 pt-14 lg:flex-row lg:items-end lg:justify-between">
          <p className="serif-display max-w-[22ch] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-ink">
            Nothing is restocked mid-season.
          </p>
          <Link href="/#newsletter" className="rule-link text-charcoal hover:text-ink">
            Join the list
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>
      </section>
    </>
  );
}
