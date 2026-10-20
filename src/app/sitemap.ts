import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/lib/site";

// One page. No lastModified: there is no honest per-build content date to give.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/` }];
}
