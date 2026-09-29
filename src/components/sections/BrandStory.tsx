import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";

export function BrandStory() {
  return (
    <section
      aria-labelledby="story-heading"
      className="relative isolate overflow-hidden bg-ink text-ivory"
    >
      {/* Story photograph — full-bleed band, wipes in left to right */}
      <div className="absolute inset-0" data-reveal="wipe">
        <Photo
          shot="story"
          sizes="100vw"
          src="/images/shop-story.jpg"
          alt="A model in a black jacket with the Marrow back graphic, leaning against a railing in front of a concrete building"
          className="h-full w-full"
          imgClassName="object-[50%_30%]"
        />
      </div>

      {/* Scrim: holds the statement legible along the bottom edge */}
      <div className="scrim-bottom absolute inset-0" aria-hidden="true" />

      {/* The founding line, set on the photograph at display size */}
      <div className="relative z-10 flex h-[min(84vh,760px)] min-h-[520px] items-end">
        <div className="shell w-full pb-14 lg:pb-20">
          <h2
            id="story-heading"
            className="display pb-[0.14em] text-[clamp(2.5rem,6.2vw,6rem)] leading-[0.95] text-ivory"
            data-reveal="line"
            style={{ "--d": "160ms" } as CSSProperties}
          >
            <span className="block">
              Marrow is for the days you refuse to shrink.
            </span>
          </h2>

          <div
            className="mt-8"
            data-reveal="rise"
            style={{ "--d": "420ms" } as CSSProperties}
          >
            <Link href="/about" className="rule-link text-ivory">
              Learn More
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
