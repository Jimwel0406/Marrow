import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Let's get you back on track.",
  robots: { index: false, follow: true },
};

const QUICK_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/collections/winter" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Journal", href: "/journal" },
] as const;

export default function NotFound() {
  return (
    <>
      {/* Section 01 — full-bleed 404 hero */}
      <section
        aria-labelledby="error-heading"
        className="relative isolate overflow-hidden bg-ink text-ivory"
      >
        {/* Photograph: figure in technical outerwear beneath a concrete overhang */}
        <div className="absolute inset-0">
          <Photo
            shot="error-hero"
            priority
            sizes="(min-width: 1024px) 100vw, 300vw"
            quality={90}
            src="/images/error-hero.jpg"
            alt="A figure in a technical jacket and backpack walking beneath a concrete overhang at a low angle, city skyline behind"
            className="h-full w-full"
            imgClassName="object-[38%_50%] lg:object-center"
          />
        </div>

        <div className="scrim-left-soft absolute inset-0" aria-hidden="true" />

        <div className="relative shell flex min-h-dvh max-h-[640px] flex-col justify-center py-24 lg:min-h-dvh lg:max-h-none lg:py-36">
          <div className="max-w-[28rem]">
            <p className="eyebrow text-ivory/75">404 / Page Not Found</p>

            <h1
              id="error-heading"
              className="display mt-8 font-semibold text-[clamp(1.85rem,8vw,2.6rem)] leading-[1.08] tracking-[0.09em] sm:tracking-[0.14em] text-ivory"
            >
              <span className="sm:whitespace-nowrap">The Page{" "}</span>
              <br className="hidden sm:block" />
              <span className="sm:whitespace-nowrap">
                You&rsquo;re Looking{" "}
              </span>
              <br className="hidden sm:block" />
              <span className="sm:whitespace-nowrap">
                For Doesn&rsquo;t Exist
              </span>
            </h1>

            <p className="mt-7 max-w-[19rem] text-body text-ivory/80">
              It might have been moved, deleted,
              <br className="hidden sm:block" /> or you entered the wrong
              address.
              <br className="hidden sm:block" /> Let&rsquo;s get you back on
              track.
            </p>

            <Link
              href="/"
              className="group mt-9 inline-flex h-[42px] w-[166px] items-center justify-between border border-ivory/50 px-5 text-[10px] font-semibold tracking-[0.2em] text-ivory uppercase transition-colors duration-300 hover:border-ivory"
            >
              Back to Home
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 02 — warm cream recovery */}
      <section
        aria-labelledby="recover-heading"
        className="bg-ivory text-charcoal"
      >
        <div className="shell py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-12">
            {/* Left — editorial typography */}
            <div className="lg:col-span-5">
              <p className="eyebrow text-muted">Quick Links</p>

              <h2
                id="recover-heading"
                className="display mt-7 font-semibold text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.05] tracking-[0.1em] text-ink"
              >
                <span className="block">Maybe You</span>
                <span className="block">Were Looking</span>
                <span className="block">For&hellip;</span>
              </h2>

              <p className="mt-7 max-w-[17rem] text-body text-muted">
                Explore our most popular pages
                <br className="hidden sm:block" /> and get back to what you
                need.
              </p>
            </div>

            {/* Middle — quick navigation */}
            <nav
              aria-label="Quick navigation"
              className="self-center lg:col-span-4"
            >
              <ul>
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex h-[44px] items-center justify-between border-b border-stone/90 text-[11px] font-semibold tracking-[0.18em] text-charcoal uppercase transition-colors duration-300 hover:border-muted hover:text-ink"
                    >
                      {link.label}
                      <ArrowRight
                        className="h-3.5 w-3.5 text-muted transition-all duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1 group-hover:text-ink"
                        strokeWidth={1.75}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right — feature image card */}
            <Link
              href="/collections"
              className="group relative block min-h-[420px] overflow-hidden bg-ink-3 lg:col-span-3 lg:min-h-[310px]"
            >
              <div className="photo-zoom absolute inset-0">
                <Photo
                  shot="error-card"
                  sizes="(min-width: 1024px) 26vw, 100vw"
                  quality={90}
                  src="/images/error-card.jpg"
                  alt="A figure seen from behind against a raw concrete facade, low light"
                  className="h-full w-full"
                />
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                <p className="text-sm font-medium tracking-[0.22em] uppercase">
                  Our Collections
                </p>
                <p className="mt-3 flex w-fit items-center gap-3 border-b border-ivory/50 pb-1.5 text-[10px] font-semibold tracking-[0.28em] text-ivory uppercase transition-colors duration-300 group-hover:border-ivory">
                  Explore Now
                  <ArrowRight
                    className="h-3 w-3 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}