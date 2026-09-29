"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling — wheel input is eased instead of stepped.
 * autoRaf runs the loop; destroy() tears it down. Skipped entirely under
 * prefers-reduced-motion (native jumps stay instant). Native `scroll`
 * events still fire every frame, so Reveal's observer keeps working.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({ autoRaf: true });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
