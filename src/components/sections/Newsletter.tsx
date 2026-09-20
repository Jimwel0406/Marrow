import { Photo } from "@/components/media/Photo";
import { NewsletterForm } from "./NewsletterForm";

export function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative isolate overflow-hidden bg-ink text-ivory"
    >
      {/* Newsletter photograph: Marrow hoodie against the city at dusk */}
      <div className="absolute inset-0">
        <Photo
          shot="skyline-sit"
          src="/images/join-the-journey.jpg"
          sizes="100vw"
          alt="A person in a Marrow hoodie sitting on a rooftop ledge, back to camera, looking out over a city skyline at dusk"
          className="h-full w-full"
          imgClassName="object-[70%_50%] lg:object-center"
        />
      </div>

      {/* Subtle dark veil so the copy stays legible on small screens */}
      <div
        aria-hidden="true"
        className="scrim-movement absolute inset-0 lg:hidden"
      />

      <div className="relative flex min-h-[440px] flex-col justify-end py-16 lg:aspect-[2.9/1] lg:min-h-[460px] lg:justify-center lg:py-0">
        <div className="shell">
          <div className="max-w-[34rem]">
            <p className="eyebrow text-ivory/70">Join the Journey</p>

            <h2
              id="newsletter-heading"
              className="display mt-5 text-display-md text-ivory"
            >
              <span className="block">Be Part Of</span>
              <span className="block">The Movement</span>
            </h2>

            <p className="mt-5 max-w-[42ch] text-body text-ivory/80">
              Get early access to new drops, exclusive updates, and stories from
              the streets.
            </p>

            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
