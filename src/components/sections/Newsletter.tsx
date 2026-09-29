import type { CSSProperties } from "react";
import { NewsletterForm } from "./NewsletterForm";

export function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative isolate overflow-hidden bg-dusk text-ink"
    >
      {/* Lit-surface wash — warm light top-left, shadow in the far corner,
          so the band reads as a lit plane rather than a flat fill */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        data-reveal="bloom"
        style={{
          background:
            "radial-gradient(70% 95% at 16% 0%, rgba(244,241,236,0.45), transparent 62%), radial-gradient(75% 100% at 88% 105%, rgba(35,20,10,0.5), transparent 60%), radial-gradient(55% 70% at 62% 40%, rgba(220,166,116,0.55), transparent 70%)",
        }}
      />

      <div className="shell relative py-16 lg:py-28">
        {/* The band's dominant: display type at full width, settling into place */}
        <h2
          id="newsletter-heading"
          className="display whitespace-nowrap text-[clamp(2.6rem,13vw,13.75rem)] leading-[0.9] tracking-[0.06em] text-ink [--track-land:0.06em] lg:tracking-[0.14em] lg:[--track-land:0.14em]"
        >
          <span
            className="block"
            data-reveal="track"
            style={{ "--d": "60ms" } as CSSProperties}
          >
            Be Part
          </span>
          <span
            className="block"
            data-reveal="track"
            style={{ "--d": "180ms" } as CSSProperties}
          >
            Of The
          </span>
          <span
            className="block"
            data-reveal="track"
            style={{ "--d": "300ms" } as CSSProperties}
          >
            Movement
          </span>
        </h2>

        <div
          data-reveal="rise"
          style={{ "--d": "520ms" } as CSSProperties}
        >
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
