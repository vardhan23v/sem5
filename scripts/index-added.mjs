/**
 * Builds `src/data/added-dates.json` from Git history.
 *
 * The library has no hand-written "added" timestamps. For a committed
 * resource the date is the most recent commit that added its current path to
 * the repository (`git log --diff-filter=A --no-renames`). That keeps
 * Recently Added chronological without inventing dates and picks up new
 * resources automatically once they are committed.
 *
 * Rename following is deliberately NOT used: similarity-based rename
 * detection is unreliable for scanned PDFs and can attribute a brand-new
 * scan to an unrelated older file. Dating each real path instead means a
 * resource reorganised into a subject folder is dated by that commit — the
 * day it joined the current library layout.
 *
 * An untracked resource has no Git date. For those only, the file's creation
 * time is used as a provisional date so a brand-new PDF can still appear in
 * the library until it is committed. Tracked files in a shallow clone keep
 * their previously generated date instead of inheriting a checkout time.
 *
 * Run automatically before `dev`, `test` and `build`. In CI the checkout must
 * use `fetch-depth: 0`, otherwise only the latest commit is visible.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const METADATA = path.join(ROOT, 'src', 'data', 'subjects.ts');
const OUTPUT = path.join(ROOT, 'src', 'data', 'added-dates.json');

const source = await readFile(METADATA, 'utf8');
const paths = [
  ...new Set(
    [...source.matchAll(/"path"\s*:\s*("(?:[^"\\]|\\.)*")/g)].map((match) =>
      JSON.parse(match[1]),
    ),
  ),
];

let previous = {};
if (existsSync(OUTPUT)) {
  try {
    previous = JSON.parse(await readFile(OUTPUT, 'utf8'));
  } catch {
    console.warn('[index-added] Could not parse existing added-dates.json; rebuilding it.');
  }
}

function runGit(args) {
  try {
    return execFileSync('git', args, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return '';
  }
}

/** Latest commit that added this exact path (no rename following); ISO string, or ''. */
function gitAddedAt(relativePath) {
  const output = runGit([
    'log',
    '--diff-filter=A',
    '--no-renames',
    '--format=%cI',
    '--',
    relativePath,
  ]);
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !Number.isNaN(Date.parse(line)))
    .sort((a, b) => Date.parse(b) - Date.parse(a))[0] ?? '';
}

/** True when the file is committed to Git (so its missing date is not new). */
function isTracked(relativePath, trackedPaths) {
  return trackedPaths.has(relativePath);
}

/** Provisional date for a file that has not been committed yet. */
function fileCreatedAt(relativePath) {
  try {
    return statSync(path.join(ROOT, relativePath)).birthtime.toISOString();
  } catch {
    return '';
  }
}

const tracked = new Set(
  runGit(['ls-files', '-z'])
    .split('\0')
    .map((entry) => entry.trim())
    .filter(Boolean),
);

const dates = {};
const missing = [];
const provisional = [];
const retained = [];

for (const relativePath of paths) {
  const gitDate = gitAddedAt(relativePath);
  const fallback = fileCreatedAt(relativePath);

  let date = gitDate;
  if (!date && !isTracked(relativePath, tracked) && fallback) {
    date = fallback;
    provisional.push(relativePath);
  }
  if (!date) {
    date = previous[relativePath] ?? '';
    if (date) retained.push(relativePath);
  }

  if (date) {
    dates[relativePath] = new Date(date).toISOString();
  } else {
    missing.push(relativePath);
  }
}

const sorted = Object.fromEntries(
  Object.keys(dates)
    .sort()
    .map((key) => [key, dates[key]]),
);

await writeFile(OUTPUT, `${JSON.stringify(sorted, null, 2)}\n`, 'utf8');

const dated = Object.keys(sorted).length;
console.log(`[index-added] ${dated}/${paths.length} resources have an added date.`);

if (provisional.length > 0) {
  console.log(
    `[index-added] ${provisional.length} uncommitted resource(s) use their file creation time until committed:`,
  );
  for (const relativePath of provisional) console.log(`  - ${relativePath}`);
}

if (retained.length > 0) {
  console.warn(
    `[index-added] ${retained.length} tracked file(s) kept the previous date because Git history was unavailable.`,
  );
}

if (missing.length > 0) {
  console.warn('[index-added] No reliable added date for:');
  for (const relativePath of missing) console.warn(`  - ${relativePath}`);
  console.warn(
    '[index-added] Commit these resources (or fetch full Git history) and run `npm run index:added` again.',
  );
}
