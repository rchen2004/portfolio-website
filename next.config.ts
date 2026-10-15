import type { NextConfig } from "next";
// Parses data/resume.json on every `next build` / `next dev`; a malformed edit throws and stops the build.
import "./src/lib/resume.ts";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
