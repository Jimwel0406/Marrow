import type { Shot } from "@/components/media/PlaceholderArt";
import type { ReactNode } from "react";
import { Photo } from "@/components/media/Photo";

/**
 * Full-bleed campaign frame. Used between editorial blocks so a long page
 * breaks on a photograph instead of another rule. The caption sits on the
 * scrim, so the frame is never credited to the wrong product.
 */
export function ImageBand({
  src,
  mobileSrc,
  shot,
  alt,
  eyebrow,
  caption,
  position,
  priority = false,
  actions,
  sizes = "100vw",
  quality = 75,
  grain = true,
  imageReveal,
}: {
  src: string;
  mobileSrc?: string;
  shot: Shot;
  alt: string;
  eyebrow?: string;
  caption?: string;
  position?: string;
  priority?: boolean;
  actions?: ReactNode;
  sizes?: string;
  quality?: number;
  grain?: boolean;
  imageReveal?: "wipe" | "rise";
}) {
  return (
    <figure className="relative isolate overflow-hidden bg-ink">
      <div data-reveal={imageReveal}>
      <Photo
        shot={shot}
        src={src}
        mobileSrc={mobileSrc}
        alt={alt}
        sizes={sizes}
        quality={quality}
        grain={grain}
        priority={priority}
        className="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]"
        imgClassName={position}
      />
      </div>

      <div
        aria-hidden="true"
        className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
      />

      {(eyebrow || caption || actions) && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-ink/90">
          <div className="shell flex flex-wrap items-end justify-between gap-x-8 gap-y-2 py-6 lg:py-8">
            {eyebrow && <p className="eyebrow text-ivory">{eyebrow}</p>}
            {caption && (
              <p className="text-[16px] leading-[1.6] tracking-[0.02em] text-ivory">
                {caption}
              </p>
            )}
          </div>
          {actions && (
            <div className="shell pb-6 lg:pb-8">
              <nav aria-label="Continue" className="flex flex-wrap gap-x-8 gap-y-4 border-t border-ivory/25 pt-5">
                {actions}
              </nav>
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
}
