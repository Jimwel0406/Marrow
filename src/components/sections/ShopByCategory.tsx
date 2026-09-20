"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { CATEGORIES } from "@/lib/content";

export function ShopByCategory() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const update = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      const value = max > 0 ? scroller.scrollLeft / max : 0;
      setProgress(value);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-ivory py-14 lg:py-16"
    >
      <div className="shell">
        <h2 id="categories-heading" className="eyebrow text-muted">
          Shop by Category
        </h2>

        {/* Five tight vertical crops; scrolls sideways on narrow screens */}
        <div
          ref={scrollerRef}
          className="carousel-scroll -mx-5 mt-7 overflow-x-auto px-5 pb-1 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
        >
          <ul className="flex gap-4 md:grid md:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((category) => (
              <li
                key={category.name}
                className="w-1/2 min-w-0 shrink-0 sm:w-[calc((100%-2rem)/3)] md:w-auto md:shrink"
              >
                <Link
                  href={category.href}
                  className="group relative block aspect-[2/3] w-full overflow-hidden focus-visible:outline-offset-4"
                >
                  <Photo
                    shot={category.shot}
                    src={category.src}
                    sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 58vw"
                    alt={`${category.name} category — Marrow streetwear`}
                    className="photo-zoom absolute inset-0 h-full w-full"
                  />

                  <div
                    aria-hidden="true"
                    className="scrim-bottom absolute inset-x-0 bottom-0 h-1/2"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-3 lg:p-5">
                    <h3 className="text-[13px] font-semibold text-ivory uppercase md:text-[20px]">
                      {category.name}
                    </h3>
                    <span className="rule-link mt-2 text-[11px] text-ivory lg:text-[13px]">
                      Shop Now
                      <ArrowRight
                        className="h-3 w-3 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                        strokeWidth={1.75}
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
            {/* trailing room so the last card fully clears the edge */}
            <li aria-hidden="true" className="w-5 shrink-0 md:hidden" />
          </ul>
        </div>

        {/* Custom scrollbar — visible on every mobile browser */}
        <div
          aria-hidden="true"
          className="mx-5 mt-4 h-px overflow-hidden bg-ink/10 md:hidden"
        >
          <div
            className="h-full bg-ink/40 transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(progress * 100, 8)}%` }}
          />
        </div>
      </div>
    </section>
  );
}