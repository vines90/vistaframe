#!/usr/bin/env node
/**
 * One-shot optimizer for the freshly generated VistaFrame images.
 * Reads from public/images/{products,factory}, resizes to max-width 1600px,
 * encodes JPEG quality 82 with mozjpeg.
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(process.cwd(), "public/images");
const TARGETS = [
  { dir: "products/windows", files: ["casement.jpg", "sliding.jpg", "picture.jpg"] },
  { dir: "products/doors", files: ["entry.jpg", "bifold.jpg", "sliding.jpg"] },
  { dir: "factory", files: ["line.jpg", "cnc.jpg", "qc.jpg", "packaging.jpg"] },
];

async function compress(file) {
  const before = (await fs.stat(file)).size;
  const buf = await sharp(file)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await fs.writeFile(file, buf);
  const after = buf.length;
  const ratio = (after / before) * 100;
  console.log(
    `${path.relative(ROOT, file).padEnd(36)}  ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB  (${ratio.toFixed(0)}%)`,
  );
}

let totalBefore = 0;
let totalAfter = 0;
for (const t of TARGETS) {
  for (const f of t.files) {
    const p = path.join(ROOT, t.dir, f);
    try {
      const before = (await fs.stat(p)).size;
      totalBefore += before;
      await compress(p);
      totalAfter += (await fs.stat(p)).size;
    } catch (err) {
      console.error("Skip", p, err.message);
    }
  }
}
console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB (${((totalAfter / totalBefore) * 100).toFixed(0)}%)`,
);
