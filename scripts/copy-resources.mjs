/**
 * Copies every resource referenced by the metadata into `dist/`.
 *
 * The app is deployed as a static site, so the PDFs, slides and scans have to
 * sit next to the built bundle. Reading the paths from `src/data/subjects.ts`
 * guarantees the deployed files and the indexed resources can never drift.
 *
 * Run automatically after `vite build` (see package.json).
 */

import { access, copyFile, mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const METADATA = path.join(ROOT, 'src', 'data', 'subjects.ts');
const OUT = path.join(ROOT, 'dist');

const source = await readFile(METADATA, 'utf8');
const paths = [
  ...source.matchAll(/"path"\s*:\s*("(?:[^"\\]|\\.)*")/g),
].map((match) => JSON.parse(match[1]));

const unique = [...new Set(paths)];

if (unique.length === 0) {
  console.error('[copy-resources] No resource paths found in', METADATA);
  process.exit(1);
}

let copied = 0;
let bytes = 0;
const missing = [];

for (const relativePath of unique) {
  const from = path.join(ROOT, relativePath);
  const to = path.join(OUT, relativePath);

  try {
    await access(from);
  } catch {
    missing.push(relativePath);
    continue;
  }

  await mkdir(path.dirname(to), { recursive: true });
  await copyFile(from, to);
  bytes += (await stat(from)).size;
  copied += 1;
}

if (missing.length > 0) {
  console.error('[copy-resources] Missing resource files:');
  for (const file of missing) console.error('  -', file);
  process.exit(1);
}

console.log(
  `[copy-resources] Copied ${copied} resources (${(bytes / 1024 / 1024).toFixed(1)} MB) into dist/`,
);
