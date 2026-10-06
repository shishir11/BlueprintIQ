# portal-verify

Browser verification for the customer portal, driven over the Chrome DevTools
Protocol. It lives in the repo so the portal can be re-verified after the next change
rather than once, by hand, from a temp directory.

## Run it

The dev server has to be up (`npm run dev`, port 3000). The harness launches and tears
down its own browser.

```bash
node tools/portal-verify/run.mjs                    # Chrome, every dev-server suite
node tools/portal-verify/run.mjs --browser both     # Chrome and Edge, so it is not single-engine
node tools/portal-verify/run.mjs --suite keyboard   # one suite
node tools/portal-verify/run.mjs --shots tmp/shots  # full-page screenshots as it goes
```

Against the production bundle instead of the dev server:

```bash
npx vite build
node tools/portal-verify/run.mjs --preview          # serves dist/ on 4173, runs the prod suite
```

Exit code is 0 when nothing failed, 1 when a check failed, 2 when the harness could
not run at all (no dev server, browser not found, `dist/` missing). `--markdown
<file>` writes the result tables for pasting into a PR.

There is no `npm run` entry for this on purpose: `package.json` was outside the scope
contract for the task that built the portal.

## Flags

| Flag | Default | What it does |
|---|---|---|
| `--browser` | `chrome` | `chrome`, `edge`, or `both` |
| `--base` | `http://localhost:3000` | server under test (`:4173` with `--preview`) |
| `--preview` | off | start `vite preview` over `dist/` and run the `prod` suite |
| `--suite` | `all` | `journey`, `a11y`, `keyboard`, `reload`, `prod` (comma-separated) |
| `--widths` | `1440,768,375` | viewports the journey repeats at |
| `--port` | `9222` | DevTools port |
| `--shots` | off | directory for full-page screenshots |
| `--markdown` | off | file to write the result tables to |

Browser binaries are found at the usual Windows, Linux and macOS paths; override with
`BIQ_CHROME` / `BIQ_EDGE`.

## Suites

| Suite | Covers |
|---|---|
| `journey` | The whole customer path at each viewport: marketing home, the gateway, both failure states, sign-in with its loading state, all six screens through the rail, two controls each on invoicing and ingestion, sign-out, a second identity, a cold portal URL, and the console. |
| `a11y` | Marketing regression (five tabs, navbar, footer, five modals, mobile drawer) plus structure per portal screen: one `<h1>`, no skipped heading levels, every field labelled, targets ≥ 44 px, no horizontal scroll at 1440 / 768 / 375, and no spinner animation under `prefers-reduced-motion`. |
| `keyboard` | Keyboard only, through real key events so `:focus-visible` resolves normally. Per screen: Tab reaches every control, focus is visible wherever it lands, Tab never gets stuck. Plus the gateway's roving-tabindex tablist under the arrow keys, Enter-to-submit, and Escape out of the user menu. |
| `reload` | Every `?screen=` value, cold and after sign-in. The session is in memory by design, so both directions must land on the gateway with no shell left behind. |
| `prod` | The built bundle over `vite preview`: sign in, all six screens, two state-changing controls on each, and a scan of `dist/assets/*.js` for the DEV-only affordances. |

## Do not edit the project while a run is in flight

This repo has no `.gitignore`, so Vite's watcher reloads the page for **any** file that
changes under the project root — including a markdown file nothing imports. A reload
drops the in-memory portal session, and every check after it fails for a reason that
has nothing to do with the app. That happened once while this harness was being
written, which is why each suite now ends with a `run was not disturbed` check: the
Page counts load events against the ones the harness asked for, and any surplus is
reported as not-verified rather than left to look like a wall of real failures.

## Notes for whoever changes this next

- **No dependency.** The CDP client in `lib/cdp.mjs` uses the `WebSocket` that ships
  with Node (global since 22). Nothing here is in `package.json`.
- **A fresh browser profile per run** is what makes the suite repeatable — no carried
  storage, no restored tabs, no extensions.
- **Three outcomes, not two.** A check that could not run is reported `NOT-VERIFIED`,
  which is neither a pass nor a failure. Do not let one become a silent pass.
- **Selectors are IDs the components deliberately expose** (`#portal-login-domain`,
  `#portal-drawer-btn`, `#portal-user-menu-btn`, `#ing-filter`, `#gov-filter`). Prefer
  adding an ID to chasing a class name.
- **A radio group is one tab stop**, and a roving-tabindex tablist is one tab stop.
  Both were initially read as unreachable controls; the Tab walk now accounts for
  them, and the tablist gets its own arrow-key checks instead.

## Not covered

- A real screen reader. The suite asserts ARIA wiring and focus order, which is not
  the same as hearing what is announced.
- Contrast ratios, which were sampled by hand on representative elements rather than
  computed over every text node here.
- Engines other than Chromium. `--browser both` gets Chrome and Edge, which share one
  engine; Firefox and Safari are unverified.
