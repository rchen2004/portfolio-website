"use client";

import { useEffect } from "react";

/** Spec §6.6: the rail's current section and marker. Runs only while the rail is shown (1200px and up). */
export function RailScript() {
  useEffect(() => {
    const links = [
      ...document.querySelectorAll<HTMLAnchorElement>(".rail li a"),
    ];
    const marker = document.querySelector<HTMLElement>(".rail-marker");
    const sections = links.map((a) => document.getElementById(a.hash.slice(1)));
    if (!marker || sections.some((s) => !s)) return;
    let current = 0; // the server renders About as current

    const place = (instant: boolean) => {
      const link = links[current];
      // Instant on attach, so a page that loads (or widens) mid-scroll doesn't slide in from About.
      if (instant) marker.style.transition = "none";
      marker.style.transform = `translateY(${link.offsetTop + link.offsetHeight / 2 - 16}px)`;
      if (instant) {
        void marker.offsetHeight;
        marker.style.transition = "";
      }
    };

    const update = (instant = false) => {
      // The last section whose top is at or above 35% of the viewport; About until the first one gets there.
      const line = innerHeight * 0.35;
      let next = 0;
      sections.forEach((s, i) => {
        if (s!.getBoundingClientRect().top <= line) next = i;
      });
      const root = document.documentElement;
      if (innerHeight + scrollY >= root.scrollHeight - 4)
        next = sections.length - 1;
      if (next === current && !instant) return;
      links[current].removeAttribute("aria-current");
      links[next].setAttribute("aria-current", "true");
      current = next;
      place(instant);
    };

    const onEvent = () => update();
    const attach = () => {
      addEventListener("scroll", onEvent, { passive: true });
      addEventListener("resize", onEvent);
      // Sent by TimelineScript after each accordion toggle settles (320ms + one frame).
      document.addEventListener("timeline-settled", onEvent);
      update(true);
    };
    const detach = () => {
      removeEventListener("scroll", onEvent);
      removeEventListener("resize", onEvent);
      document.removeEventListener("timeline-settled", onEvent);
    };

    const wide = matchMedia("(min-width: 1200px)");
    const onChange = () => (wide.matches ? attach() : detach());
    wide.addEventListener("change", onChange);
    if (wide.matches) attach();
    return () => {
      wide.removeEventListener("change", onChange);
      detach();
    };
  }, []);

  return null;
}
