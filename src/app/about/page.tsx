import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageBand } from "@/components/sections/ImageBand";
import { Photo } from "@/components/media/Photo";
import { SITE, POLICIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Marrow is a Manila streetwear label founded in 2018, making functional outerwear, heavyweight jersey and wide-leg bottoms in limited seasonal runs.",
  alternates: { canonical: "/about" },
};

const FACTS = [
  { term: "Founded", detail: SITE.founded },
  { term: "Runs", detail: POLICIES.runs },
  { term: "Returns", detail: POLICIES.returns },
];

export default function AboutPage() {
  return (
    <>
      <section
        aria-labelledby="about-claim"
        className="bg-ivory pt-[calc(64px+2.75rem)] pb-16 lg:pt-[calc(88px+2.75rem)] lg:pb-24"
      >
        <div className="shell grid gap-10 lg:min-h-[76svh] lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-[7vw]">
          <figure className="order-2 min-w-0 lg:order-1" data-reveal="wipe">
            <Photo
              shot="story"
              src="/images/about/concrete-editorial.png"
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              alt="Generated editorial image of a model in black outerwear on a concrete stair landing with tropical foliage beyond"
              className="aspect-[4/5] w-full lg:aspect-auto lg:h-[min(72svh,760px)]"
              imgClassName="object-[50%_55%]"
            />
            <figcaption className="mt-4 text-[16px] leading-[1.6] tracking-[0.02em] text-muted-2">
              Outerwear & architecture — generated editorial concept.
            </figcaption>
          </figure>

          <div className="order-1 min-w-0 lg:order-2" data-reveal="stagger-sm">
            <p className="eyebrow text-muted">About Marrow / {SITE.founded}</p>
            <h1
              id="about-claim"
              className="page-title mt-8 text-ink lg:mt-10"
            >
              A small run.<br />
              A Manila<br />
              beginning.
            </h1>
            <p className="mt-8 max-w-[25rem] text-body text-muted">
              Marrow started in 2018 as a small run of outerwear cut in Manila.
              The idea was narrow: make the few pieces you reach for when the
              weather turns, and make them properly.
            </p>
            <div className="mt-9 flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-ink/12 pt-5 text-[16px] font-semibold tracking-[0.18em] text-muted-2 uppercase">
              <p>{SITE.location}</p>
              <p>{POLICIES.runs}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-story" className="bg-ivory pb-16 lg:pb-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-[9vw]">
          <div className="min-w-0" data-reveal="rise">
            <h2 id="about-story" className="eyebrow text-muted">The label</h2>
            <p className="section-title mt-6 max-w-[16ch] text-ink">
              The range is still built that way.
            </p>
            <div className="mt-7 max-w-[34rem] space-y-5 text-body text-muted">
              <p>
                A three-layer matte ripstop shell with taped seams. A 480 gsm
                loopback crewneck, brushed inside. Wide-leg cargos in dry-touch
                cotton twill. A washed cotton cap with the mark embroidered on it.
              </p>
              <p>
                Each season is cut once, in limited numbers, by the same hands from
                the first jacket to the last. When a run closes it stays closed
                until the next one opens.
              </p>
            </div>
          </div>

          <aside aria-labelledby="about-record" className="min-w-0 border-t border-ink/15 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-9" data-reveal="rise">
            <h2 id="about-record" className="eyebrow text-muted">The record</h2>
            <dl className="mt-6">
              {FACTS.map((fact) => (
                <div key={fact.term} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-ink/15 py-4">
                  <dt className="text-[16px] leading-relaxed text-muted-2">{fact.term}</dt>
                  <dd className="text-[16px] leading-relaxed text-charcoal">{fact.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 text-body text-muted">Nothing is restocked mid-season.</p>
          </aside>
        </div>
      </section>

      <div>
        <ImageBand
          src="/images/about/colonnade-campaign-hq.png"
          imageReveal="wipe"
          mobileSrc="/images/about/colonnade-campaign-mobile.png"
          shot="campaign"
          alt="Generated editorial image of a model in black technical layers standing within a sunlit concrete colonnade"
          eyebrow="In the field"
          caption="Winter study — generated editorial concept."
          position="object-top"
          sizes="100vw"
          quality={90}
          grain={false}
          actions={
            <>
            <Link href="/shop" className="rule-link inline-flex min-h-11 items-center gap-4 text-ivory hover:text-ivory">
              Shop the range
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
            <Link href="/journal" className="rule-link inline-flex min-h-11 items-center gap-4 text-ivory hover:text-ivory">
              Read the notes
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
            </>
          }
        />
      </div>
    </>
  );
}
