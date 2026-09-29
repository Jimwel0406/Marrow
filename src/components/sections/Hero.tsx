import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      data-hero
      className="relative isolate overflow-hidden bg-ink text-ivory"
    >
      {/* Hero photograph: model in technical outerwear beneath a concrete overhang */}
      <div className="absolute inset-0">
        <Photo
          shot="hero"
          priority
          sizes="(min-width: 1024px) 100vw, 2048px"
          src="/images/hero.jpg"
          alt="A model in a black technical jacket and backpack standing beneath a concrete overhang, city skyline behind"
          className="h-full w-full"
          imgClassName="object-[66%_50%] lg:object-[50%_45%]"
        />
      </div>

      {/* Cinematic scrim: holds the display type dominant over the photograph */}
      <div className="scrim-left-soft absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 flex h-[100svh] min-h-[600px] flex-col justify-between">
        {/* Hero copy */}
        <div className="shell pt-[152px] lg:pt-[224px]">
          <div className="max-w-[62rem]">
            <h1
              id="hero-heading"
              className="display mt-6 text-[clamp(2.125rem,7.4vw,6.5rem)] leading-[0.95] tracking-[0.16em] min-[640px]:tracking-[0.2em] text-ivory"
            >
              <span
                className="block overflow-hidden"
                data-reveal="line"
                style={{ "--d": "60ms" } as CSSProperties}
              >
                <span className="block">Built for</span>
              </span>
              <span
                className="block overflow-hidden"
                data-reveal="line"
                style={{ "--d": "180ms" } as CSSProperties}
              >
                <span className="block">What&rsquo;s Next</span>
              </span>
            </h1>

            <p
              className="mt-6 max-w-[34ch] text-body text-ivory/80"
              data-reveal="rise"
              style={{ "--d": "340ms" } as CSSProperties}
            >
              Functional silhouettes. Elevated essentials.
              <br className="hidden sm:block" /> A new chapter in modern
              streetwear.
            </p>

            <div
              className="mt-12"
              data-reveal="rise"
              style={{ "--d": "460ms" } as CSSProperties}
            >
              <Link href="/shop" className="btn btn-solid group min-h-[52px] px-7">
                Shop the Collection
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
