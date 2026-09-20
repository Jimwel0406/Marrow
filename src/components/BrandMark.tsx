import Image from "next/image";
import logo from "@/assets/logo.png";

type LockupProps = {
  className?: string;
  /** Height of the logo image in px — width auto-scales */
  height?: number;
  /** Set on the above-the-fold instance so the lockup is not lazily painted. */
  priority?: boolean;
};

/** Intrinsic aspect ratio of the logo asset — width auto-scales from it. */
const LOGO_ASPECT = logo.width / logo.height;

/**
 * Real logo lockup using the provided brand asset.
 * White on transparent — works over any dark surface.
 *
 * Imported as a module (not referenced from /public) so Next fingerprints the
 * URL. Replacing the artwork then produces a new URL and can never be masked by
 * a stale browser or image-optimizer cache.
 */
export function BrandLockup({
  className = "",
  height = 22,
  priority = false,
}: LockupProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={logo}
        alt="Marrow"
        className="h-[length:var(--logo-h)] w-auto object-contain"
        style={{ "--logo-h": `${height}px` } as React.CSSProperties}
        sizes={`${Math.round(height * LOGO_ASPECT)}px`}
        priority={priority}
      />
    </span>
  );
}
