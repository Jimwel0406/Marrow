import Link from "next/link";
import { BrandLockup } from "@/components/BrandMark";
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/icons/SocialIcons";
import { NAV_LINKS, SITE } from "@/lib/content";

const SOCIALS = [
  { label: "Marrow on Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "Marrow on TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
  { label: "Marrow on YouTube", href: "https://youtube.com", Icon: YouTubeIcon },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="shell flex min-h-[100px] flex-wrap items-center justify-between gap-x-10 gap-y-7 py-8 lg:py-6">
        <Link
          href="/"
          className="transition-opacity duration-300 hover:opacity-80"
          aria-label="Marrow — home"
        >
          <BrandLockup height={36} />
        </Link>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:gap-x-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[12px] font-medium tracking-[0.16em] text-ivory/80 uppercase transition-colors duration-300 hover:text-ivory"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="flex items-center gap-4">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  rel="me noreferrer"
                  target="_blank"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center text-ivory/75 transition-colors duration-300 hover:text-ivory"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>

          <span aria-hidden="true" className="hidden h-4 w-px bg-ivory/20 sm:block" />

          <p className="text-[11px] font-medium tracking-[0.12em] text-ivory/65 uppercase">
            &copy; {new Date().getFullYear()} {SITE.wordmark}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
