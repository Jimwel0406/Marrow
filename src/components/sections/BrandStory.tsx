import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { SITE } from "@/lib/content";

export function BrandStory() {
  return (
    <section aria-labelledby="story-heading" className="bg-ivory-2">
      <div className="grid lg:grid-cols-[46%_54%]">
        {/* Story photograph: model with graphic jacket back against a concrete facade */}
        <div className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[560px]">
          <Photo
            shot="story"
            sizes="(min-width: 1024px) 50vw, 100vw"
            src="/images/shop-story.jpg"
            alt="A model in a black jacket with the Marrow back graphic, leaning against a railing in front of a concrete building"
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Story copy */}
        <div className="flex items-stretch">
          <div className="flex w-full flex-col px-5 py-16 md:px-11 lg:px-14 lg:py-20">
            <div className="grid flex-1 gap-x-12 gap-y-10 sm:grid-cols-[minmax(0,31rem)_minmax(9rem,1fr)] sm:items-stretch">
              <div className="max-w-[31rem]">
                <p className="eyebrow text-muted">Shop Story</p>

                <h2
                  id="story-heading"
                  className="display mt-5 text-display-md leading-[1.35] tracking-[0.2em] text-ink"
                >
                  <span className="block">More Than</span>
                  <span className="block">Just Clothes</span>
                </h2>

                <p className="mt-6 text-body text-muted">
                  <span className="uppercase">Marrow</span> was born from a
                  belief: that what you wear should mean something. We create
                  timeless streetwear for people who move differently &mdash;
                  dreamers, doers, and those who find beauty in-between.
                </p>
              </div>

              {/* Publication-style sidebar: place and date */}
              <figure className="relative hidden min-h-0 sm:flex">
                <Photo
                  shot="tower"
                  src="/images/tower.jpg"
                  sizes="180px"
                  alt="Glass office towers above palms in the Manila skyline"
                  className="h-full w-full"
                />
                <figcaption className="absolute inset-x-0 bottom-0 border-t border-ivory/20 bg-ink/55 pt-3 text-[10px] leading-[1.7] font-semibold tracking-[0.22em] text-ivory uppercase backdrop-blur-sm">
                  <span className="block px-3 pb-3">
                    {SITE.founded}
                    <br />
                    {SITE.location}
                  </span>
                </figcaption>
              </figure>
            </div>

            <Link
              href="/about"
              className="rule-link mt-10 w-fit self-start text-charcoal hover:text-ink"
            >
              Learn More
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
