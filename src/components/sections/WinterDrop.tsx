import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";

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
        </div>
      </div>
    </section>
  );
}
