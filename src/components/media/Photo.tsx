import Image from "next/image";
import { SHOTS, type Shot } from "./PlaceholderArt";

type PhotoProps = {
  /** which composition this slot needs — see PlaceholderArt */
  shot: Shot;
  /** real, descriptive alt text. Required. */
  alt: string;
  className?: string;
  /** drop in the final photograph and the layout does not move */
  src?: string;
  sizes?: string;
  priority?: boolean;
  /** film grain, on by default so every frame reads as one campaign */
  grain?: boolean;
  /** extra classes for the <img> itself — e.g. a responsive object-position
   *  so a tall mobile crop still lands on the subject */
  imgClassName?: string;
};

export function Photo({
  shot,
  alt,
  className = "",
  src,
  sizes = "100vw",
  priority = false,
  grain = true,
  imgClassName = "",
}: PhotoProps) {
  const art = SHOTS[shot];

  return (
    <div className={`relative overflow-hidden bg-ink-3 ${grain ? "grain" : ""} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <svg
          role="img"
          aria-label={alt}
          viewBox={art.viewBox}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          {art.render(`ph-${shot}`)}
        </svg>
      )}
    </div>
  );
}
