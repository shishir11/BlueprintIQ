/**
 * Collects results and prints them. Three outcomes, never two: a check that did not
 * run is `not-verified`, which is neither a pass nor a failure, and is reported as
 * itself rather than quietly dropped.
 *
 * Every line the harness prints goes through `print`. A terminal reporter's output is
 * its product rather than a leftover debug statement, so the one suppression the
 * forbidden-strings rule needs lives at that single call site.
 */

// portal-ui-allow: debug
export const print = (...args) => console.log(...args);

export class Report {
  constructor() {
    this.rows = [];
    this.section = '';
  }

  /** Begin a named group of checks. */
  group(name) {
    this.section = name;
    print(`\n--- ${name} ---`);
  }

  check(name, passed, detail = '') {
    const status = passed ? 'PASS' : 'FAIL';
    this.rows.push({ section: this.section, name, status, detail });
    print(`  ${status}  ${name}${detail ? '  — ' + detail : ''}`);
    return passed;
  }

  /** A check that could not be run here. Not a pass. */
  notVerified(name, why) {
    this.rows.push({ section: this.section, name, status: 'NOT-VERIFIED', detail: why });
    print(`  NOT-VERIFIED  ${name}  — ${why}`);
  }

  get counts() {
    const c = { pass: 0, fail: 0, notVerified: 0 };
    for (const r of this.rows) {
      if (r.status === 'PASS') c.pass++;
      else if (r.status === 'FAIL') c.fail++;
      else c.notVerified++;
    }
    return c;
  }

  get failed() {
    return this.rows.filter((r) => r.status === 'FAIL');
  }

  /** Markdown table per section, for pasting into a PR body. */
  markdown() {
    const sections = [...new Set(this.rows.map((r) => r.section))];
    const out = [];
    for (const s of sections) {
      const rows = this.rows.filter((r) => r.section === s);
      const c = rows.filter((r) => r.status === 'PASS').length;
      out.push(`### ${s} — ${c}/${rows.length}`, '', '| Check | Result | Detail |', '|---|---|---|');
      for (const r of rows) {
        out.push(`| ${r.name} | ${r.status} | ${r.detail || ''} |`);
      }
      out.push('');
    }
    return out.join('\n');
  }

  summary(title) {
    const c = this.counts;
    print(`\n===== ${title} =====`);
    print(`  ${c.pass}/${this.rows.length} passed · ${c.fail} failed · ${c.notVerified} not-verified`);
    for (const f of this.failed) {
      print(`  FAILED: [${f.section}] ${f.name}${f.detail ? ' — ' + f.detail : ''}`);
    }
    return c.fail === 0;
  }
}
