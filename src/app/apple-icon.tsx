// Spec §16.2: the light icon.svg at 180 x 180, square (iOS applies its own mask) and fully opaque.
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <svg width="180" height="180" viewBox="0 0 32 32">
      <rect width="32" height="32" fill="#24201D" />
      <path
        d="M10 24V8h6a4 4 0 0 1 0 8h-6m6 0l6 8"
        fill="none"
        stroke="#F4F3F0"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    size,
  );
}
