// Spec §16.1. Prerendered at build; no request data, no network.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { resume } from "@/src/lib/resume";

const { name, tagline } = resume.basics;

export const alt = `${name}. ${tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static Figtree from @fontsource/figtree@5.3.0 (OFL, see _fonts/OFL.txt). Satori reads WOFF, not WOFF2 or variable fonts.
const font = (file: string) =>
  readFile(join(process.cwd(), "src/app/_fonts", file));
const [regular, bold] = await Promise.all([
  font("figtree-latin-400-normal.woff"),
  font("figtree-latin-700-normal.woff"),
]);

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 96px",
        background: "#F4F3F0",
        fontFamily: "Figtree",
        color: "#24201D",
      }}
    >
      <div
        style={{
          width: 56,
          height: 6,
          borderRadius: 3,
          background: "#C0362C",
          marginBottom: 48,
        }}
      />
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: -1.44,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 40,
          fontWeight: 400,
          lineHeight: 1.3,
          maxWidth: 960,
          marginTop: 28,
        }}
      >
        {tagline}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Figtree", data: regular, weight: 400, style: "normal" },
        { name: "Figtree", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
