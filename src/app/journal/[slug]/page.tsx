import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageBand } from "@/components/sections/ImageBand";
import { Photo } from "@/components/media/Photo";
import { JOURNAL_NOTES, journalNoteBySlug } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return JOURNAL_NOTES.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const note = journalNoteBySlug(slug);
  if (!note) return {};

  return {
    title: note.title,
    description: note.standfirst,
    alternates: { canonical: `/journal/${note.slug}` },
    openGraph: {
      title: note.title,
      description: note.standfirst,
      images: [{ url: note.image.src }],
    },
  };
}

export default async function JournalNotePage({ params }: Params) {
  const { slug } = await params;
  const note = journalNoteBySlug(slug);
  if (!note) notFound();

  const index = JOURNAL_NOTES.findIndex((entry) => entry.slug === note.slug);
  const next = JOURNAL_NOTES[(index + 1) % JOURNAL_NOTES.length];

  const [opening, ...rest] = note.body;

  return (
    <article key={note.slug} className="bg-ivory pt-[calc(64px+3rem)] pb-20 lg:pt-[calc(88px+4.5rem)] lg:pb-28">
      <div className="shell">
        <Link
          href="/journal"
          data-reveal="rise"
          className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[0.16em] text-muted uppercase transition-colors duration-300 hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          Journal
        </Link>

        <div className="mt-9 max-w-[52rem]" data-reveal="stagger-sm">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <p className="eyebrow text-muted">Note {note.number}</p>
            <p className="text-[16px] font-semibold tracking-[0.18em] text-muted-2 uppercase">
              Marrow Studio
            </p>
          </div>

          <h1 className="page-title page-title-utility mt-4 text-ink">
            {note.title}
          </h1>

          <p className="lede mt-7 max-w-[40rem] border-l border-ink/20 pl-5 text-[clamp(1.15rem,1.9vw,1.55rem)]">
            {note.standfirst}
          </p>
        </div>
      </div>

      <div className="mt-10 lg:mt-14" data-reveal="wipe">
        <ImageBand
          src={note.image.src}
          shot={note.image.shot}
          alt={note.image.alt}
          caption={note.image.caption}
          position={note.image.position}
          priority
        />
      </div>

      <div className="shell">
        <div className="mx-auto mt-12 grid max-w-[76rem] gap-8 border-t border-ink/20 pt-8 md:grid-cols-[1fr_1.15fr] md:gap-14 lg:mt-16 lg:gap-24 lg:pt-12">
          <p className="text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.4] font-semibold tracking-[-0.02em] text-ink" data-reveal="rise">
            {opening}
          </p>
          <div className="space-y-7 text-[18px] leading-[1.8] text-charcoal lg:text-[20px]">
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} data-reveal="rise">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-ink/20 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-24" data-reveal="rise">
          <div className="flex items-center gap-6">
            <Photo
              src={next.image.src}
              shot={next.image.shot}
              alt={next.image.alt}
              sizes="160px"
              grain={false}
              className="hidden aspect-[4/3] w-40 shrink-0 sm:block"
            />
            <div>
            <p className="text-base font-semibold text-charcoal">Continue reading</p>
            <p className="card-title mt-2 text-ink">{next.title}</p>
            </div>
          </div>

          <Link
            href={`/journal/${next.slug}`}
            className="rule-link text-charcoal hover:text-ink"
          >
            Read next
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </article>
  );
}
