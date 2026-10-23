import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";

/**
 * Hero — one full-height photograph with the statement held in the right
 * column of the shell and the description block sitting under it.
 * Geometry follows the reference frame (zuno home-01):
 *   · section 116svh desktop, one full screen below that
 *   · content column capped at 520px, 40px under the headline
 *   · description block 308px wide, 24px from copy to CTA
 *   · headline 95.2px / 700 / line-height 1 / -0.03em tracking
 * Below 992px the copy sits at the lower left beneath the subject's face,
 * with a mobile crop, stronger lower scrim and full-width phone CTA.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      data-hero
      className="relative isolate min-h-[640px] h-[100svh] overflow-hidden bg-ink text-ivory min-[992px]:min-h-0 min-[992px]:h-[116svh]"
    >
      {/* Hero photograph: model beneath a concrete overhang. Mirrored so the
          subject rides the left of the frame and the dark underpass holds the
          type on the right. */}
      <div className="absolute inset-0">
        <Photo
          shot="hero"
          priority
          // Account for the landscape image's rendered width under object-cover
          // in a tall hero, rather than requesting only the narrow phone width.
          sizes="(min-width: 992px) max(100vw, 224svh), max(100vw, 193svh, 1236px)"
          quality={90}
          grain={false}
          src="/images/hero.jpg"
          alt="A model in a black technical jacket and backpack standing beneath a concrete overhang, city skyline behind"
          className="h-full w-full"
          imgClassName="-scale-x-100 object-[64%_50%] min-[992px]:object-[46%_50%]"
        />
      </div>

      {/* Desktop: the copy sits over the dark right edge of the frame */}
      <div
        className="scrim-right-soft absolute inset-0 hidden min-[992px]:block"
        aria-hidden="true"
      />
      {/* Mobile: preserve the portrait above a dependable dark text area. */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,9,11,0.18)_20%,rgba(8,9,11,0.35)_45%,rgba(8,9,11,0.9)_100%)] min-[992px]:hidden"
        aria-hidden="true"
      />

      <div className="shell relative z-10 flex min-h-[640px] h-full flex-col items-start justify-end gap-6 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] text-left min-[480px]:gap-10 min-[768px]:pb-16 min-[992px]:min-h-0 min-[992px]:justify-center min-[992px]:items-end min-[992px]:pt-0 min-[992px]:pb-[10vh]">
        <div className="flex w-full flex-col items-start gap-6 min-[480px]:gap-8 min-[992px]:gap-10 min-[992px]:max-w-[520px]">
          <h1
            id="hero-heading"
            className="text-[clamp(2.5rem,11vw,3.325rem)] font-bold leading-none tracking-[-0.03em] min-[768px]:text-[3.5rem] min-[992px]:text-[5.95rem]"
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

          <div className="flex w-full flex-col items-start gap-6 min-[480px]:w-[308px]">
            <p
              className="max-w-[19rem] text-[1.125rem] font-medium leading-[1.45] tracking-[-0.02em] text-ivory min-[480px]:text-[1.4rem] min-[768px]:text-[1.27rem]"
              data-reveal="rise"
              style={{ "--d": "340ms" } as CSSProperties}
            >
              Functional silhouettes. Elevated essentials.
            </p>

            <Link
              href="/shop"
              className="btn btn-solid group min-h-[56px] w-full whitespace-nowrap px-4 text-base tracking-[0.04em] min-[480px]:w-auto min-[480px]:px-[30px] min-[480px]:tracking-[0.08em]"
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
