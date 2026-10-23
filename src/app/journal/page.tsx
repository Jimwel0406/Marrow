import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { JOURNAL_NOTES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description: "Studio notes from Marrow: the cloth, the city, and the size of a run.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <div className="bg-ivory pt-[calc(64px+2.5rem)] pb-16 lg:pt-[calc(88px+2.5rem)] lg:pb-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h1 className="page-title text-ink" data-reveal="rise">
            The Journal.
          </h1>
          <p className="eyebrow text-muted lg:pb-2" data-reveal="rise" style={{ "--d": "140ms" } as CSSProperties}>The cloth. The city. The run.</p>
        </div>

        <section aria-label="Studio notes" className="mt-9 lg:mt-12">
          <ul className="grid gap-x-7 gap-y-12 md:grid-cols-[1.3fr_1fr_1fr] md:items-start md:[&>li:nth-child(2)]:mt-20 md:[&>li:nth-child(3)]:mt-40">
            {JOURNAL_NOTES.map((note, index) => {
              const materialStudy = index === 0;
              return (
                <li
                  key={note.slug}
                  className="min-w-0"
                  data-reveal="rise"
                  style={{ "--d": `${160 + index * 140}ms` } as CSSProperties}
                >
                  <article>
                    <Link href={`/journal/${note.slug}`} className="group block">
                      <Photo
                        shot={note.image.shot}
                        src={materialStudy ? "/images/journal/ripstop-study.png" : note.image.src}
                        alt={materialStudy ? "Generated editorial illustration of charcoal ripstop weave folded under soft light" : note.image.alt}
                        priority={materialStudy}
                        quality={90}
                        sizes={materialStudy ? "(min-width: 768px) 38vw, 100vw" : "(min-width: 768px) 29vw, 100vw"}
                        className="photo-zoom aspect-[4/3] w-full md:aspect-auto md:h-[clamp(15rem,24vw,25rem)]"
                        imgClassName="object-[50%_35%]"
                      />
                      <p className="mt-5 text-[16px] font-semibold tracking-[0.18em] text-muted-2 uppercase tabular-nums">
                        Note {note.number}
                      </p>
                      <h2 className="card-title mt-3 text-ink">
                        {note.title}
                        <ArrowUpRight className="ml-2 inline-block h-4 w-4 align-baseline transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </h2>
                      <p className="mt-4 max-w-[32rem] text-body text-muted">{note.standfirst}</p>
                    </Link>
                    {materialStudy && (
                      <p className="mt-4 text-[16px] leading-relaxed text-muted-2">
                        Material study — generated editorial illustration.
                      </p>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
