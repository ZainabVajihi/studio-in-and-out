"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The page's scroll behaviours, the same as the original site:
 * photos fade in as they arrive, the statement darkens word by word,
 * and the menu underlines the section on screen (home page only).
 */
export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const cleanups: (() => void)[] = [];

    // photos fade in
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".rv").forEach((el) => (reduce ? el.classList.add("in") : io.observe(el)));
    cleanups.push(() => io.disconnect());

    // statement words darken as you scroll
    const rt = document.querySelector<HTMLElement>(".reveal-text");
    if (rt) {
      const words = Array.from(rt.querySelectorAll(".w"));
      let ticking = false;
      const update = () => {
        const r = rt.getBoundingClientRect();
        const vh = innerHeight;
        const p = reduce ? 1 : clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35));
        const n = Math.round(p * words.length);
        words.forEach((w, i) => w.classList.toggle("on", i < n));
      };
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            update();
            ticking = false;
          });
          ticking = true;
        }
      };
      addEventListener("scroll", onScroll, { passive: true });
      update();
      cleanups.push(() => removeEventListener("scroll", onScroll));
    }

    // underline the menu item for the section on screen (home page)
    if (pathname === "/") {
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav a"));
      const secIO = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) links.forEach((a) => a.classList.toggle("cur", a.hash === "#" + e.target.id));
          }),
        { rootMargin: "-45% 0px -50% 0px" },
      );
      ["studio", "founders", "contact", "join"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) secIO.observe(el);
      });
      cleanups.push(() => {
        secIO.disconnect();
        // clear the section underline before moving to another page
        links.forEach((a) => a.hash && a.classList.remove("cur"));
      });
    }

    return () => cleanups.forEach((f) => f());
  }, [pathname]);

  return null;
}
