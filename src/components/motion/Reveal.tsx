"use client";

import { useEffect } from "react";

/**
 * Stamps [data-revealed] on every [data-reveal] element once it nears the
 * viewport, letting CSS play that element's signature motion.
 *
 * Belt-and-suspenders: IntersectionObserver (threshold 0, so clipped/
 * pre-revealed elements still fire) is backed by a rAF-throttled rect check
 * on scroll/resize — plus a MutationObserver so nodes swapped in by dev
 * Fast Refresh or hydration get picked up again.
 */
export function Reveal() {
  useEffect(() => {
    const pending = new Set<Element>();

    /* full-bleed photo wipes wait for genuine visibility (top crosses
       55% of the screen) so the reveal plays while being looked at */
    const deep = (el: Element) => el.getAttribute("data-reveal") === "wipe";

    const stamp = (el: Element) => {
      if (!el.hasAttribute("data-revealed")) el.setAttribute("data-revealed", "");
      pending.delete(el);
      observer.unobserve(el);
      deepObserver.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) stamp(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );

    const deepObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) stamp(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -45% 0px" },
    );

    const watch = (root: ParentNode) => {
      root.querySelectorAll?.("[data-reveal]:not([data-revealed])").forEach((el) => {
        if (!pending.has(el)) {
          pending.add(el);
          (deep(el) ? deepObserver : observer).observe(el);
        }
      });
    };

    /* fallback: geometric check against the LIVE dom — immune to nodes
       being swapped after mount (hydration patches, Fast Refresh).
       Anything whose top is above the threshold — including elements
       already scrolled past — stamps, so a swapped-in node can never be
       stranded invisible above the viewport. */
    const check = () => {
      document
        .querySelectorAll("[data-reveal]:not([data-revealed])")
        .forEach((el) => {
          const limit = window.innerHeight * (deep(el) ? 0.55 : 0.94);
          if (el.getBoundingClientRect().top < limit) stamp(el);
        });
    };

    let frame = 0;
    const onViewportChange = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(check);
    };

    watch(document.body);
    check();

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) watch(node as Element);
        }
      }
      onViewportChange();
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      deepObserver.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
    };
  }, []);

  return (
    <noscript>
      <style>{`[data-reveal],[data-reveal]>*{opacity:1!important;transform:none!important;clip-path:none!important;animation:none!important}`}</style>
    </noscript>
  );
}
