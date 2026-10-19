// Rebuilds src/app/favicon.ico (16, 32, 48) from the light version of src/app/icon.svg (spec §16.2).
// Run after any icon.svg change: npm run build:favicon. Packs PNGs into the ICO (supported since Windows Vista).
// shortcut: sharp comes in with Next (not in package.json); if `import "sharp"` ever fails, add it as a devDependency.
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const SIZES = [16, 32, 48];
const svgPath = new URL("../src/app/icon.svg", import.meta.url);
const icoPath = new URL("../src/app/favicon.ico", import.meta.url);

// Dropping the dark media query leaves the light rules, so colors come from icon.svg alone.
const svg = readFileSync(svgPath, "utf8").replace(
  /@media \(prefers-color-scheme: dark\) \{(?:[^{}]*\{[^}]*\})*[^}]*\}/,
  "",
);
if (svg.includes("prefers-color-scheme"))
  throw new Error("icon.svg: could not strip the dark media query");

const pngs = await Promise.all(
  SIZES.map((s) =>
    // Rasterize at 4x the target, then downsample, for smoother edges.
    sharp(Buffer.from(svg), { density: ((72 * s) / 32) * 4 })
      .resize(s, s)
      .png()
      .toBuffer(),
  ),
);

// ICONDIR (6 bytes) + one 16-byte ICONDIRENTRY per image, then the PNG data.
const header = Buffer.alloc(6 + 16 * SIZES.length);
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(SIZES.length, 4);
let offset = header.length;
SIZES.forEach((s, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4); // color planes
  header.writeUInt16LE(32, e + 6); // bits per pixel
  header.writeUInt32LE(pngs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});

writeFileSync(icoPath, Buffer.concat([header, ...pngs]));
console.log(`favicon.ico: ${SIZES.join(", ")} px, ${offset} bytes`);
