import type { ReactNode } from "react";
import type { Shot } from "@/components/media/PlaceholderArt";
import { Photo } from "@/components/media/Photo";

/**
 * Inner-page masthead. The site header is fixed and dark, so every page that
 * is not the homepage opens with the same measured block: eyebrow, display
 * title, one line of supporting copy. An optional photograph carries the
 * page's subject straight under the type so no page opens as a wall of words.
 */
export function PageHeader({
  eyebrow,
  title,
  deck,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  deck?: ReactNode;
  image?: {
    src: string;
    shot: Shot;
    alt: string;
    caption?: string;
    position?: string;
  };
  children?: ReactNode;
}) {
  return (
    <section className="bg-ivory pt-[calc(64px+3.5rem)] pb-10 lg:pt-[calc(88px+5rem)] lg:pb-14">
      <div className="shell">
        <div data-reveal="rise">
          <p className="eyebrow text-muted">{eyebrow}</p>

          <h1 className="page-title page-title-utility mt-5 text-ink">
            {title}
          </h1>

          {deck && <p className="deck mt-6 max-w-[44rem]">{deck}</p>}
        </div>

        {children}
      </div>

      {image && (
        <figure className="mt-10 lg:mt-14">
          <Photo
            shot={image.shot}
            src={image.src}
            alt={image.alt}
            sizes="100vw"
            className="aspect-[16/9] w-full lg:aspect-[21/9]"
            imgClassName={image.position}
          />

          {image.caption && (
            <div className="shell">
              <figcaption className="mt-4 text-[16px] leading-[1.6] tracking-[0.02em] text-muted-2">
                {image.caption}
              </figcaption>
            </div>
          )}
        </figure>
      )}
    </section>
  );
}
