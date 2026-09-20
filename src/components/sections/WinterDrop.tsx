import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { DROP_FRAMES } from "@/lib/content";

export function WinterDrop() {
  return (
    <section
      aria-labelledby="drop-heading"
      className="relative isolate overflow-hidden bg-ink text-ivory"
    >
      {/* Drop photograph: garment back graphic against dark architecture */}
      <div className="absolute inset-0">
        <Photo
          shot="drop"
          src="/images/winter-drop.jpg"
          sizes="100vw"
          alt="Low-angle view of a hooded black jacket showing the Marrow compass back graphic, photographed against dark city architecture"
          className="h-full w-full"
          imgClassName="object-[70%_50%] lg:object-center"
        />
      </div>

      {/* The photograph is already near-black behind the copy on desktop, so it
          only needs help where the type sits low over the jacket on small screens. */}
      <div className="scrim-bottom absolute inset-0 lg:hidden" aria-hidden="true" />

      <div className="relative flex min-h-[460px] flex-col justify-end py-16 lg:min-h-[420px] lg:justify-center lg:py-0">
        <div className="shell flex items-end justify-between gap-10">
          <div className="max-w-[30rem]">
            <p className="eyebrow text-ivory/80">Limited Time</p>

            <h2
              id="drop-heading"
              className="display mt-5 text-display-md text-ivory"
            >
              <span className="block">The</span>
              <span className="flex flex-wrap gap-x-[0.7em]">
                <span>Winter</span>
                <span>Drop</span>
              </span>
            </h2>

            <p className="mt-5 max-w-[34ch] text-body text-ivory/80">
              New arrivals. Same vision.
            </p>

            <Link href="/collections/winter" className="btn btn-outline group mt-9">
              Shop the Drop
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </Link>
          </div>

          {/* Drop navigator */}
          <div className="hidden shrink-0 flex-col items-end gap-5 lg:flex">
            <span
              aria-hidden="true"
              className="flex items-center gap-2 text-ivory/80"
            >
              <span className="block h-px w-12 bg-ivory/45" />
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </span>

            <ol className="flex flex-col items-end gap-3" aria-label="Drop pieces">
              {DROP_FRAMES.map((frame, index) => (
                <li key={frame} className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-semibold tracking-[0.24em] tabular-nums ${
                      index === 0 ? "text-ivory" : "text-ivory/55"
                    }`}
                  >
                    {frame}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`block h-px ${
                      index === 0 ? "w-8 bg-ivory" : "w-4 bg-ivory/40"
                    }`}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
