"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/** Local reveal sequences, with independent observers for cards on narrow screens. */
export function Reveal() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pending = new Set<Element>();
    const managed = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;
    let frame = 0;
    const stamp = (el: Element, index = 0) => {
      if (el.hasAttribute("data-revealed")) return;
      (el as HTMLElement).style.setProperty("--reveal-offset", `${Math.min(index * 150, 300)}ms`);
      el.setAttribute("data-revealed", "");
      pending.delete(el);
      observer?.unobserve(el);
    };
    const prepare = (el: HTMLElement) => {
      if (managed.has(el)) return;
      managed.add(el);
      if (media.matches || !observer) { stamp(el); return; }
      el.setAttribute("data-motion-ready", "");
      pending.add(el);
      observer.observe(el);
    };
    const watch = (root: ParentNode) => {
      const elements = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
      if (root instanceof HTMLElement && root.matches("[data-reveal]")) elements.unshift(root);
      elements.forEach(el => {
        if (managed.has(el)) return;
        const kind = el.dataset.reveal;
        if (kind === "stagger-sm" || kind === "stagger-wipe") {
          managed.add(el);
          // Observe each card rather than starting a long cascade at the container edge.
          el.setAttribute("data-revealed", "");
          [...el.children].forEach(child => {
            if (!(child instanceof HTMLElement)) return;
            child.setAttribute("data-reveal-item", kind === "stagger-wipe" ? "wipe" : "rise");
            prepare(child);
          });
        } else prepare(el);
      });
    };
    const check = () => {
      const visible = [...pending].filter(el => {
        const r = el.getBoundingClientRect();
        return r.top < innerHeight * .94 && r.left < innerWidth && r.right > 0;
      });
      visible.forEach((el, index) => stamp(el, index));
    };
    const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(check); };
    const reduce = () => {
      if (media.matches) {
        managed.forEach(el => { el.removeAttribute("data-motion-ready"); stamp(el); });
        pending.clear();
      }
    };
    try {
      if ("IntersectionObserver" in window && !media.matches) {
        observer = new IntersectionObserver(entries => {
          entries.filter(entry => entry.isIntersecting).forEach((entry, index) => stamp(entry.target, index));
        }, {threshold: 0, rootMargin: "0px 0px -6% 0px"});
      }
      watch(document.body);
      check();
      mutations = new MutationObserver(records => {
        records.forEach(record => record.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) watch(node);
        }));
        update();
      });
      mutations.observe(document.body, {childList: true, subtree: true});
      window.addEventListener("scroll", update, {passive: true});
      window.addEventListener("resize", update);
      media.addEventListener("change", reduce);
    } catch {
      managed.forEach(el => { el.removeAttribute("data-motion-ready"); stamp(el); });
    }
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      mutations?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      media.removeEventListener("change", reduce);
      managed.forEach(el => {
        el.removeAttribute("data-motion-ready");
        el.removeAttribute("data-revealed");
        el.removeAttribute("data-reveal-item");
        el.style.removeProperty("--reveal-offset");
      });
    };
  }, [pathname]);
  return null;
}
