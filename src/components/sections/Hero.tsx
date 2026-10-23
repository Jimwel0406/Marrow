import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";

/**
 * Hero — one full-height photograph with the statement held in the right
 * column of the shell and the description block sitting under it.
 * Geometry follows the reference frame (zuno home-01):
 *   · section 116svh desktop, taller again on tablet and small phones
 *   · content column capped at 520px, 40px under the headline
 *   · description block 308px wide, 24px from copy to CTA
 *   · headline 95.2px / 700 / line-height 1 / -0.03em tracking
 * Below 992px the column centres and the stack starts under the header.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      data-hero
      className="relative isolate h-[120svh] overflow-hidden bg-ink text-ivory min-[480px]:h-[100svh] min-[768px]:h-[120svh] min-[992px]:h-[116svh]"
    >
      {/* Hero photograph: model beneath a concrete overhang. Mirrored so the
          subject rides the left of the frame and the dark underpass holds the
          type on the right. */}
      <div className="absolute inset-0">
        <Photo
          shot="hero"
          priority
          sizes="100vw"
          src="/images/hero.jpg"
          alt="A model in a black technical jacket and backpack standing beneath a concrete overhang, city skyline behind"
          className="h-full w-full"
          imgClassName="-scale-x-100 object-[46%_50%]"
        />
      </div>

      {/* Desktop: the copy sits over the dark right edge of the frame */}
      <div
        className="scrim-right-soft absolute inset-0 hidden min-[992px]:block"
        aria-hidden="true"
      />
      {/* Below 992 the statement is centred over the subject: a calm veil */}
      <div
        className="scrim-movement absolute inset-0 min-[992px]:hidden"
        aria-hidden="true"
      />

      <div className="shell relative z-10 flex h-full flex-col items-center justify-start gap-6 pt-[132px] text-center min-[480px]:gap-10 min-[480px]:pt-[180px] min-[768px]:pt-[160px] min-[992px]:items-end min-[992px]:justify-center min-[992px]:pt-0 min-[992px]:pb-[10vh] min-[992px]:text-left">
        <div className="flex w-full flex-col items-center gap-5 min-[480px]:gap-10 min-[992px]:max-w-[520px] min-[992px]:items-start">
          <h1
            id="hero-heading"
            className="text-[1.925rem] font-bold leading-none tracking-[-0.03em] min-[480px]:text-[3.325rem] min-[768px]:text-[3.5rem] min-[992px]:text-[5.95rem]"
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
              <span className="block">what&rsquo;s next</span>
            </span>
          </h1>

          <div className="flex w-[80%] flex-col items-center gap-6 min-[480px]:w-[308px] min-[992px]:items-start">
            <p
              className="text-[1rem] font-medium leading-[1.32] tracking-[-0.02em] text-ivory min-[480px]:text-[1.4rem] min-[768px]:text-[1.27rem]"
              data-reveal="rise"
              style={{ "--d": "340ms" } as CSSProperties}
            >
              Functional silhouettes. Elevated essentials.
            </p>

            <Link
              href="/shop"
              className="btn btn-solid group min-h-[56px] min-[480px]:px-[30px]"
              data-reveal="rise"
              style={{ "--d": "460ms" } as CSSProperties}
            >
              Shop the Collection
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
