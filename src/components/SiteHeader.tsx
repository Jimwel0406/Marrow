"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/BrandMark";
import { NAV_LINKS } from "@/lib/content";

const ICON_BUTTON =
  "inline-flex h-11 w-11 items-center justify-center text-ivory/85 transition-colors duration-300 hover:text-ivory";

const ICON_LINK =
  "hidden h-11 w-11 items-center justify-center text-ivory/85 transition-colors duration-300 hover:text-ivory sm:inline-flex";

const NAV_ITEM =
  "text-[13px] font-medium uppercase tracking-[0.14em] text-ivory/85 transition-colors duration-300 hover:text-ivory";

/* How far above the hero's end the bar starts sliding in, so it has already
   arrived by the time the hero clears rather than appearing right on its edge. */
const PIN_LEAD = 128;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [tracking, setTracking] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* The bar is not fixed to the viewport on scroll. Over the hero it is anchored
     to the document and travels up out of view with the page; only once the hero
     has nearly cleared does it slide back down and stick to the top. */
  useEffect(() => {
    const header = headerRef.current;
    const bar = barRef.current;
    if (!header || !bar) return;

    let frame = 0;

    const measure = () => {
      const barH = bar.offsetHeight;
      const hero = document.querySelector("[data-hero]");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      const y = window.scrollY;

      // Keep the bar on screen whenever the mobile menu is open.
      const nextPinned = open || heroBottom <= barH + PIN_LEAD;
      const nextTracking = !nextPinned && y < barH;

      header.style.transform = `translateY(${nextPinned ? 0 : -Math.min(y, barH)}px)`;
      setPinned(nextPinned);
      setTracking(nextTracking);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [open]);

useEffect(() => {
    if (!open) return;

    /* Move focus into the panel so screen-reader and keyboard users land on
       the first link instead of staying on the toggle. */
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  /* Off-screen but still in the DOM — take it out of the tab order too. */
  const offscreen = !pinned && !tracking;

  return (
    <header
      ref={headerRef}
      inert={offscreen || undefined}
      className={`fixed inset-x-0 top-0 z-40 will-change-transform ${
        tracking
          ? ""
          : "transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-editorial)]"
      } ${
        pinned || open
          ? "border-b border-ivory/10 bg-ink/92 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div
        ref={barRef}
        className="shell flex h-[84px] items-center justify-between gap-6 lg:h-[116px]"
      >
        {/* Brand */}
        <Link
          href="/"
          className="text-ivory transition-opacity duration-300 hover:opacity-80"
          aria-label="Marrow — home"
        >
          <BrandLockup height={60} priority />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={NAV_ITEM}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Utilities */}
        <div className="flex items-center gap-0.5">
          <Link
            href="/search"
            className={`${ICON_LINK}`}
            aria-label="Search"
          >
            <Image
              src="/icons/search.png"
              alt=""
              width={1536}
              height={1024}
              className="h-[26px] w-auto"
              aria-hidden
            />
          </Link>
          <Link
            href="/account"
            className={`${ICON_LINK}`}
            aria-label="Account"
          >
            <Image
              src="/icons/user.png"
              alt=""
              width={1254}
              height={1254}
              className="h-[26px] w-auto"
              aria-hidden
            />
          </Link>
<Link
            href="/cart"
            className={`${ICON_LINK}`}
            aria-label="Shopping bag, 0 items"
          >
            <Image
              src="/icons/cart.png"
              alt=""
              width={1536}
              height={1024}
              className="h-[26px] w-auto"
              aria-hidden
            />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`${ICON_BUTTON} lg:hidden`}
          >
            {open ? (
              <X className="h-[20px] w-[20px]" strokeWidth={1.5} />
            ) : (
              <Menu className="h-[20px] w-[20px]" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        ref={panelRef}
        hidden={!open}
        className="border-t border-ivory/10 bg-ink lg:hidden"
      >
<nav aria-label="Primary mobile" className="shell py-2">
          <ul className="divide-y divide-ivory/10">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-sm font-medium uppercase tracking-[0.18em] text-ivory/85 transition-colors duration-300 hover:text-ivory"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-ivory/10">
          <ul className="grid grid-cols-3">
            <li>
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-2 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ivory/85 transition-colors duration-300 hover:text-ivory"
              >
                <Image
                  src="/icons/search.png"
                  alt=""
                  width={1536}
                  height={1024}
                  className="h-[22px] w-auto object-contain"
                  aria-hidden
                />
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-2 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ivory/85 transition-colors duration-300 hover:text-ivory"
              >
                <Image
                  src="/icons/user.png"
                  alt=""
                  width={1254}
                  height={1254}
                  className="h-[22px] w-auto object-contain"
                  aria-hidden
                />
                <span>Account</span>
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-2 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ivory/85 transition-colors duration-300 hover:text-ivory"
              >
                <Image
                  src="/icons/cart.png"
                  alt=""
                  width={1536}
                  height={1024}
                  className="h-[22px] w-auto object-contain"
                  aria-hidden
                />
                <span>Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}




