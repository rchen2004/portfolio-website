// Tabler Icons outline set, @tabler/icons v3.49.0, MIT license (https://tabler.io/icons).
// Paths copied from the pinned files; Tabler's invisible 24x24 bounding path is dropped.
// `scale` is the optical size (spec §6.1, §6.9), applied about the center of the 24-unit box.
// These are Design's starting values; the final tuning is by eye with the owner.
const ICONS = {
  "file-text": {
    scale: 0.95,
    paths: [
      "M14 3v4a1 1 0 0 0 1 1h4",
      "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2",
      "M9 9l1 0",
      "M9 13l6 0",
      "M9 17l6 0",
    ],
  },
  mail: {
    scale: 1,
    paths: [
      "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10",
      "M3 7l9 6l9 -6",
    ],
  },
  "brand-linkedin": {
    scale: 0.9,
    paths: [
      "M8 11v5",
      "M8 8v.01",
      "M12 16v-5",
      "M16 16v-3a2 2 0 1 0 -4 0",
      "M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10",
    ],
  },
  // Shared with Scout's repo links and the project GitHub links (spec §6.1).
  "brand-github": {
    scale: 0.92,
    paths: [
      "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",
    ],
  },
  "brand-instagram": {
    scale: 0.9,
    paths: [
      "M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10",
      "M8.5 12a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0 -7 0",
      "M17 7v.01",
    ],
  },
  moon: {
    scale: 1,
    paths: [
      "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008",
    ],
  },
  sun: {
    scale: 1,
    paths: [
      "M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
      "M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",
    ],
  },
} as const;

export type IconName = keyof typeof ICONS;

/** Outline icon. Size it with `className` (e.g. `size-6`); it must be a direct flex child (spec §6.1). */
export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  const { scale, paths } = ICONS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`flex-none ${className}`}
    >
      <g transform={`translate(12 12) scale(${scale}) translate(-12 -12)`}>
        {paths.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
