"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "./icons";

// Spec §6.9. The head script in layout.tsx sets data-theme before paint; this reads it after hydration.
const root = () => document.documentElement;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const isDark = () => root().dataset.theme === "dark";

let fadeTimer: number | undefined;

function toggleTheme() {
  const next = isDark() ? "light" : "dark";
  // The 240ms color fade runs only during the switch, and never under reduced motion.
  if (matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    root().classList.add("theme-fade");
    clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(
      () => root().classList.remove("theme-fade"),
      240,
    );
  }
  root().dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Blocked storage: the switch still works for this visit.
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Server snapshot is light, so the first client render matches the static HTML (aria-pressed="false").
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  return (
    <button
      type="button"
      aria-pressed={dark}
      onClick={toggleTheme}
      className={`theme-toggle soft-circle ${className}`}
    >
      <Icon name="moon" className="theme-icon-moon size-[22px]" />
      <Icon name="sun" className="theme-icon-sun size-[22px]" />
      <span className="sr-only">Dark mode</span>
    </button>
  );
}
