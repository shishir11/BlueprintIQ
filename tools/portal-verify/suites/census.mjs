/**
 * Dead-control census.
 *
 * React binds click handlers through its root, so a button with no behaviour is
 * indistinguishable from a working one in the DOM — `el.onclick` is null either way.
 * The only place the difference is visible is the source, so this suite reads it.
 *
 * The criterion is **zero enabled controls without a handler**. A decorative action is
 * defensible in a static demo — "Export Audit Package (.ZIP)" has nothing to export without a
 * backend — but only if it says so: `disabled` plus `aria-disabled` passes, because the UI is
 * then telling the truth about itself. An enabled button with no handler still fails, because it
 * invites a click it will silently ignore.
 */
import fs from 'node:fs';
import path from 'node:path';
import { print } from '../lib/report.mjs';

export const name = 'census';

/** Find each `<button …>` opening tag and report whether it carries an onClick. */
function inertButtons(source) {
  const found = [];
  const re = /<button\b/g;
  let m;
  while ((m = re.exec(source))) {
    let i = m.index + m[0].length;
    let depth = 0;
    while (i < source.length) {
      const ch = source[i];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      else if (ch === '>' && depth === 0) break;
      i++;
    }
    const tag = source.slice(m.index, i);
    if (/onClick/.test(tag)) continue;
    if (/type=["']submit["']/.test(tag)) continue; // a form submit is handled on the form
    if (/\bdisabled\b/.test(tag)) continue;        // declared unavailable, which is the honest state
    const label = source.slice(i + 1, i + 160)
      .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 40);
    found.push({ line: source.slice(0, m.index).split('\n').length, label });
  }
  return found;
}

export default async function census({ report, cwd }) {
  report.group('control census (source scan)');
  const dir = path.join(cwd, 'src', 'components', 'portal', 'screens');
  if (!fs.existsSync(dir)) {
    report.notVerified('control census', 'portal screens directory not found');
    return;
  }

  let total = 0;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.tsx')).sort()) {
    const inert = inertButtons(fs.readFileSync(path.join(dir, file), 'utf8'));
    total += inert.length;
    report.check(`${file}: no enabled button without a handler`,
      inert.length === 0,
      inert.length
        ? `${inert.length} enabled and inert — ${inert.slice(0, 3).map((b) => `:${b.line} "${b.label}"`).join(', ')}`
        : '');
  }
  print(`  ${total} enabled button(s) without a handler across the portal screens.`);
}
