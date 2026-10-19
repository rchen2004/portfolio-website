import { resume } from "./resume.ts";

// Vercel sets this to the production domain on every deployment (previews too), so canonical URLs always point at production.
export const SITE_URL = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "rchen2004.vercel.app"}`;

const { basics, education, technologies } = resume;

/** schema.org Person for the home page, serialized for a <script type="application/ld+json">. No email, by decision. */
export const personJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: basics.name,
  url: SITE_URL,
  image: basics.image && new URL(basics.image.src, SITE_URL).href,
  sameAs: basics.profiles.map((p) => p.url),
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.institution,
  })),
  knowsAbout: technologies.map((t) => t.name),
  // "<" escaped so resume text can never close the script tag early.
}).replace(/</g, "\\u003c");
