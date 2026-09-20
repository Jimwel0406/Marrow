import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { CAMPAIGN_FRAMES } from "@/lib/content";

export function Campaign() {
  return (
    <section
      aria-labelledby="campaign-heading"
      className="relative isolate overflow-hidden bg-ink text-ivory"
    >
      {/* Campaign photograph: two models on the waterfront at dusk */}
      <div className="absolute inset-0">
        <Photo
          shot="campaign"
          sizes="(min-width: 1024px) 100vw, 2048px"
          src="/images/campaign.jpg"
          alt="Two models in dark streetwear leaning on a waterfront railing at dusk, city skyline behind them"
          className="h-full w-full"
          imgClassName="object-[61%_50%] lg:object-center"
        />
      </div>

      <div className="scrim-left-soft absolute inset-0" aria-hidden="true" />

      <div className="relative flex min-h-[520px] flex-col justify-end py-16 lg:aspect-[2.6/1] lg:min-h-[460px] lg:justify-center lg:py-0">
        <div className="shell flex items-end justify-between gap-10">
          {/* Campaign copy */}
          <div className="max-w-[32rem]">
            <p className="eyebrow text-ivory/70">Campaign</p>

            <h2
              id="campaign-heading"
              className="display mt-5 text-[clamp(2.25rem,4vw,3.5rem)] tracking-[0.55em] leading-[1.3] text-ivory"
            >
              <span className="block">City</span>
              <span className="block">Moves</span>
            </h2>

            <p className="mt-5 max-w-[38ch] text-body text-ivory/80">
              A visual exploration of movement, space and self. Shot in the
              streets, for the ones who keep going.
            </p>

            <Link href="/journal/city-moves" className="rule-link mt-10 text-ivory">
              View the Series
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          {/* Frame indicator */}
          <ol
            className="hidden shrink-0 flex-col items-end gap-3 lg:flex"
            aria-label="Campaign frames"
          >
            {CAMPAIGN_FRAMES.map((frame, index) => (
              <li key={frame} className="flex items-center gap-3">
                <span
                  className={`text-[11px] font-semibold tracking-[0.24em] tabular-nums ${
                    index === 0 ? "text-ivory" : "text-ivory/60"
                  }`}
                >
                  {frame}
                </span>
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all duration-300 ${
                    index === 0 ? "w-10 bg-ivory" : "w-5 bg-ivory/45"
                  }`}
                />
              </li>
            ))}
            <li aria-hidden="true" className="mt-3 block h-16 w-px bg-ivory/40" />
          </ol>
        </div>
      </div>
    </section>
  );
}
