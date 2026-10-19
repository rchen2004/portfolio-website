import type { Metadata, Viewport } from "next";
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

// Lets env(safe-area-inset-*) report real insets on notched phones (spec §2).
export const viewport: Viewport = { viewportFit: "cover" };

// Spec §6.9: blocking, before first paint. Reads only the stored choice; every first visit is light.
// If a Content Security Policy is added later, this needs a hash or nonce.
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem("theme")==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script sets data-theme before hydration (spec §6.9).
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="pr-[max(16px,env(safe-area-inset-right))] pl-[max(16px,env(safe-area-inset-left))] antialiased">
        {children}
      </body>
    </html>
  );
}
