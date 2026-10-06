/**
 * Dead-control census.
 *
 * React binds click handlers through its root, so a button with no behaviour is
 * indistinguishable from a working one in the DOM — `el.onclick` is null either way.
 * The only place the difference is visible is the source, so this suite reads it.
 *
 * A decorative action button is defensible in a static demo: "Export Audit Package
 * (.ZIP)" has nothing to export without a backend. What is not defensible is counting
 * it as a working control, so each one is reported NOT-VERIFIED — there is no local
 * behaviour to verify — and the count stays in front of whoever runs the suite.
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
    if (inert.length === 0) {
      report.check(`${file}: every button carries a handler`, true);
    } else {
      report.notVerified(`${file}: every button carries a handler`,
        `${inert.length} without onClick — ${inert.slice(0, 3).map((b) => `:${b.line} "${b.label}"`).join(', ')}`);
    }
  }
  print(`  ${total} decorative button(s) across the portal screens have no local behaviour.`);
}
