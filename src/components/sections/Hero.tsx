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

      <div className="relative z-10 flex h-[min(100svh,720px)] min-h-[600px] flex-col justify-between lg:h-screen lg:min-h-[600px]">
        {/* Hero copy */}
        <div className="shell pt-[152px] lg:pt-[224px]">
          <div className="max-w-[46rem]">
            <p className="eyebrow text-ivory/75">Fall / Winter {new Date().getFullYear()}</p>

            <h1
              id="hero-heading"
              className="display mt-5 text-[clamp(2.25rem,5.2vw,4.5rem)] tracking-[0.2em] text-ivory"
            >
              <span className="block">Built for</span>
              <span className="block">What&rsquo;s Next</span>
            </h1>

            <p className="mt-5 max-w-[34ch] text-body text-ivory/80">
              Functional silhouettes. Elevated essentials.
              <br className="hidden sm:block" /> A new chapter in modern
              streetwear.
            </p>

            <div className="mt-10">
              <Link href="/shop" className="btn btn-solid group">
                Shop the Collection
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Hero footer rail */}
        <div className="shell flex items-end justify-between pb-8 lg:pb-10">
          <p className="text-[11px] font-semibold tracking-[0.24em] text-ivory/70 uppercase">
            01 &mdash; 04
          </p>

          <div className="hidden flex-col items-center gap-3 lg:flex">
            <span
              aria-hidden="true"
              className="block h-16 w-px bg-gradient-to-b from-transparent via-ivory/45 to-ivory/70"
            />
            <span className="text-[10px] font-semibold tracking-[0.32em] text-ivory/70 uppercase">
              Scroll
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
