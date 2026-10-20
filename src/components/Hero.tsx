import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import { RESUME_PDF, resume } from "@/src/lib/resume";
import { Icon, type IconName } from "./icons";

const PROFILE_ICONS: Record<
  (typeof resume.basics.profiles)[number]["network"],
  IconName
> = {
  LinkedIn: "brand-linkedin",
  GitHub: "brand-github",
  Instagram: "brand-instagram",
};

/**
 * Spec §7 rule 5: a visually hidden full copy for screen readers, then aria-hidden word spans for the blur-in.
 * `start` continues the word index from the previous line; the spaces stay as text nodes so lines break normally.
 */
function BlurWords({ text, start }: { text: string; start: number }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      <span className="sr-only select-none">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            <span
              className="hero-word"
              style={{ "--i": start + i } as CSSProperties}
            >
              {word}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}

const linkClass = "soft-circle relative";
const iconClass = "size-6";

export function Hero() {
  const { greeting, tagline, email, image, profiles } = resume.basics;
  const greetingWords = greeting.split(/\s+/).filter(Boolean).length;

  return (
    <header
      className={`grid gap-6 md:items-start md:gap-10 ${image ? "md:grid-cols-[minmax(0,1fr)_280px]" : ""}`}
    >
      <div className="flex min-w-0 flex-col gap-5">
        <h1 className="text-[36px]/[1.1] font-bold tracking-[-0.015em] text-balance md:text-[48px]/[1.1]">
          <BlurWords text={greeting} start={0} />
        </h1>
        <p className="text-[21px]/[1.35] md:text-[24px]/[1.35]">
          <BlurWords text={tagline} start={greetingWords} />
        </p>
        <div className="hero-links -ml-2.5 flex flex-nowrap gap-2">
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener"
            className={linkClass}
          >
            <Icon name="file-text" className={iconClass} />
            <span className="sr-only">Resume (PDF, opens in a new tab)</span>
          </a>
          <a href={`mailto:${email}`} className={linkClass}>
            <Icon name="mail" className={iconClass} />
            <span className="sr-only">Email</span>
          </a>
          {profiles.map(({ network, url }) => (
            <a
              key={network}
              href={url}
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              <Icon name={PROFILE_ICONS[network]} className={iconClass} />
              <span className="sr-only">{network} (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
      {image && (
        // Pre-cropped 4:5 photo (spec §5). `fill` makes the img absolute at 100% x 100% with no width/height
        // attributes, so the intrinsic height can't override the frame's aspect ratio.
        <div className="relative order-first aspect-[4/3] overflow-hidden rounded-card md:order-none md:aspect-[4/5]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 720px) 280px, calc(100vw)"
            className="object-cover object-[50%_76%]"
          />
        </div>
      )}
    </header>
  );
}
