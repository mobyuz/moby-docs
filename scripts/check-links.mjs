// Runs markdown-link-check over every tracked Markdown file.
// External http(s) links are ignored (see .markdown-link-check.json) so the
// check is offline and stable. Relative file links are verified.
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const skip = new Set(['node_modules', '.git']);
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.md')) out.push(p);
  }
  return out;
}

const bin = join('node_modules', 'markdown-link-check', 'markdown-link-check');
let failed = 0;
for (const file of walk('.')) {
  try {
    execFileSync(process.execPath, [bin, '-q', '-c', '.markdown-link-check.json', file], { stdio: 'pipe' });
    console.log(`ok   ${file}`);
  } catch (e) {
    failed++;
    console.log(`FAIL ${file}\n${e.stdout}${e.stderr}`);
  }
}
process.exit(failed ? 1 : 0);