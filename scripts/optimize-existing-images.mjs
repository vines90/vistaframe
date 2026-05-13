#!/usr/bin/env node
/**
 * Compress all existing public/images/*.jpg files (skip already-tiny ones).
 * Hero stays at 1920px, og at 1200px, others at 1600px, JPEG q=82.
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(process.cwd(), "public/images");

async function* walk(dir) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const widthFor = (rel) => {
  if (rel === "hero.jpg") return 1920;
  if (rel === "og-image.jpg") return 1200;
  return 1600;
};

let totalBefore = 0;
let totalAfter = 0;
for await (const file of walk(ROOT)) {
  if (!file.match(/\.(jpe?g|png)$/i)) continue;
  const rel = path.relative(ROOT, file);
  const before = (await fs.stat(file)).size;
  if (before < 250 * 1024) {
    // Already small (<250KB) — skip.
    continue;
  }
  const buf = await sharp(file)
    .rotate()
    .resize({ width: widthFor(rel), withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await fs.writeFile(file, buf);
  totalBefore += before;
  totalAfter += buf.length;
  console.log(
    `${rel.padEnd(48)}  ${(before / 1024 / 1024).toFixed(2)}MB → ${(buf.length / 1024 / 1024).toFixed(2)}MB`,
  );
}
console.log(
  `\nTotal compressed: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB`,
);
