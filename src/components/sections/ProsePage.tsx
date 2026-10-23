import type { Shot } from "@/components/media/PlaceholderArt";
import { PageHeader } from "@/components/sections/PageHeader";
import { ImageBand } from "@/components/sections/ImageBand";

export type ProseSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Policy and information pages. A numbered contents rail holds the left edge,
 * the sections sit on one measure at reading size, and a campaign frame closes
 * the page — the same rhythm as the journal, without cards.
 */
export function ProsePage({
  eyebrow,
  title,
  deck,
  sections,
  note,
  band,
}: {
  eyebrow: string;
  title: string;
  deck: string;
  sections: readonly ProseSection[];
  note?: string;
  band?: {
    src: string;
    shot: Shot;
    alt: string;
    caption?: string;
    eyebrow?: string;
  };
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} deck={deck} />

      <section aria-label={title} className="bg-ivory pb-16 lg:pb-20">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <nav
              aria-label="On this page"
              className="lg:col-span-3 lg:self-start"
            >
              <div className="border-t border-ink/12 pt-4 lg:sticky lg:top-[calc(88px+2rem)]">
                <p className="eyebrow text-muted-2">On this page</p>

                <ol className="mt-5 space-y-3">
                  {sections.map((section, i) => (
                    <li key={section.heading}>
                      <a
                        href={`#${slug(section.heading)}`}
                        className="flex gap-3 text-[16px] leading-[1.4] text-muted transition-colors duration-300 hover:text-ink"
                      >
                        <span className="text-[16px] font-semibold tracking-[0.12em] text-muted-2 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="max-w-[44rem] lg:col-span-8 lg:col-start-5">
              {sections.map((section, i) => (
                <div
                  key={section.heading}
                  id={slug(section.heading)}
                  className="scroll-mt-[calc(64px+2rem)] border-t border-ink/12 py-7 first:border-t-0 first:pt-0 lg:scroll-mt-[calc(88px+2rem)] lg:py-8"
                >
                  <p className="text-[16px] font-semibold tracking-[0.18em] text-muted-2 uppercase tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>

                  <h2 className="display mt-3 text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.15] text-ink">
                    {section.heading}
                  </h2>

                  <div className="mt-4 space-y-4 text-[1.0625rem] leading-[1.75] text-muted">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}

                    {section.bullets && (
                      <ul className="space-y-2 pt-1">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[0.72em] h-px w-3 shrink-0 bg-ink/40"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

              {note && (
                <p className="mt-8 border-t border-ink/12 pt-5 text-[16px] leading-[1.6] text-muted-2">
                  {note}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {band && (
        <ImageBand
          src={band.src}
          shot={band.shot}
          alt={band.alt}
          caption={band.caption}
          eyebrow={band.eyebrow}
        />
      )}
    </>
  );
}
