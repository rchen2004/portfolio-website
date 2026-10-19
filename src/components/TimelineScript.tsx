"use client";

import { useEffect } from "react";

// Spec §6.4 "Settle timing": the card height transition (globals.css).
const SETTLE_MS = 320;

/** Timeline reveal (§7) and the accordion scroll correction (§6.4). Renders nothing. */
export function TimelineScript() {
  useEffect(() => {
    const list = document.querySelector<HTMLOListElement>(".timeline");
    if (!list) return;
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");

    // Reveal: only entries below the viewport at load, only with motion allowed, once each.
    // CSS shows every entry by default, so without JS (or with reduced motion) nothing is hidden.
    let observer: IntersectionObserver | undefined;
    if (motion.matches) {
      const below = [...list.children].filter(
        (el) => el.getBoundingClientRect().top > innerHeight,
      );
      observer = new IntersectionObserver(
        (items) => {
          for (const { isIntersecting, target } of items) {
            if (!isIntersecting) continue;
            target.classList.replace("reveal-pending", "reveal-shown");
            observer?.unobserve(target);
          }
        },
        { threshold: 0.15 },
      );
      for (const el of below) {
        el.classList.add("reveal-pending");
        observer.observe(el);
      }
    }

    // One shared timer: a new toggle cancels the pending run, so a quick second click runs the work once.
    let timer: number | undefined;
    let frame = 0;
    let opened: HTMLDetailsElement | null = null;

    const settle = () => {
      const details = opened;
      opened = null;
      const summary = details?.open && details.querySelector("summary");
      // block "start" honors scroll-padding-top; "auto" follows html's scroll-behavior (smooth only with motion).
      if (summary && summary.getBoundingClientRect().top < 0) {
        summary.scrollIntoView({
          block: "start",
          behavior: motion.matches ? "smooth" : "auto",
        });
      }
      // The rail (RailScript) updates its current section now that the height has settled (§6.6).
      document.dispatchEvent(new Event("timeline-settled"));
    };

    // `toggle` doesn't bubble, so it is caught in the capture phase on the list.
    const onToggle = (event: Event) => {
      const details = event.target as HTMLDetailsElement;
      // The browser also fires `close` on the card it shuts; keep the card that opened.
      if ((event as ToggleEvent).newState === "open") opened = details;
      else if (opened === details) opened = null;

      clearTimeout(timer);
      cancelAnimationFrame(frame);
      const run = () => (frame = requestAnimationFrame(settle));
      const animates =
        motion.matches &&
        CSS.supports("selector(::details-content)") &&
        CSS.supports("interpolate-size", "allow-keywords");
      if (animates) timer = window.setTimeout(run, SETTLE_MS);
      else run();
    };

    list.addEventListener("toggle", onToggle, true);
    return () => {
      list.removeEventListener("toggle", onToggle, true);
      observer?.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
