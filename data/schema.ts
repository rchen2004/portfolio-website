import { z } from "zod";

// "YYYY-MM", e.g. "2026-01"
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use "YYYY-MM", e.g. "2026-01"');

const link = z.strictObject({
  label: z.string().min(1),
  url: z.url(),
});

// src is a site-root path served from public/, e.g. "/images/headshot.jpg"; alt is required for accessibility.
const image = z.strictObject({
  src: z
    .string()
    .regex(/^\/\S+$/, 'Use a site-root path, e.g. "/images/headshot.jpg"'),
  alt: z.string().min(1),
});

// "YYYY-MM" strings compare correctly as plain strings.
const endNotBeforeStart = (d: { startDate: string; endDate: string | null }) =>
  d.endDate === null || d.endDate >= d.startDate;
const endBeforeStartError = {
  message: "endDate is before startDate",
  path: ["endDate"],
};

const basics = z.strictObject({
  name: z.string().min(1),
  tagline: z.string().min(1),
  summary: z.string().min(1),
  email: z.email(),
  image: image.optional(),
  profiles: z.array(
    z.strictObject({ network: z.string().min(1), url: z.url() }),
  ),
});

const education = z.strictObject({
  institution: z.string().min(1),
  location: z.string().optional(),
  degree: z.string().min(1),
  field: z.string().min(1),
  gpa: z.string().optional(),
  endDate: yearMonth,
  dateLabel: z.string().optional(), // override, e.g. "Expected Dec 2026"
  honors: z.array(z.string()).default([]),
});

const experience = z
  .strictObject({
    company: z.string().min(1),
    title: z.string().min(1),
    startDate: yearMonth,
    endDate: yearMonth.nullable(), // null = current role ("Present")
    dateLabel: z.string().optional(), // override; otherwise derived from dates
    highlights: z.array(z.string().min(1)).min(1),
    links: z.array(link).optional(),
  })
  .refine(endNotBeforeStart, endBeforeStartError);

const project = z
  .strictObject({
    name: z.string().min(1),
    technologies: z.array(z.string().min(1)),
    startDate: yearMonth,
    endDate: yearMonth.nullable(),
    dateLabel: z.string().optional(),
    highlights: z.array(z.string().min(1)).min(1),
    links: z.array(link).optional(),
    image: image.optional(), // screenshot
  })
  .refine(endNotBeforeStart, endBeforeStartError);

export const resumeSchema = z.strictObject({
  basics,
  education: z.array(education),
  skills: z.strictObject({
    languages: z.array(z.string()),
    frameworks: z.array(z.string()),
    tools: z.array(z.string()),
  }),
  experience: z.array(experience),
  projects: z.array(project),
});

export type Resume = z.infer<typeof resumeSchema>;
export type Experience = Resume["experience"][number];
export type Project = Resume["projects"][number];
export type Education = Resume["education"][number];
export type Link = z.infer<typeof link>;
export type Image = z.infer<typeof image>;
