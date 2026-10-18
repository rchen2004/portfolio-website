import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { resume } from "@/src/lib/resume";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Temporary Phase 3 metadata; Backend owns SEO in Phase 6.
export const metadata: Metadata = {
  title: resume.basics.name,
  description: resume.basics.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the Phase 4 theme script sets data-theme before hydration (spec §6.9).
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
