---
name: play-test
description: Running and debugging the Playwright play-test harness (tools/play-test.js) for A Matter of Time — options, checks, reproducing failures, screenshots, playing against a plain static server, and the other dev tools (compat-test, migrate-v5, make-review-docs).
---

## `tools/play-test.js` (Playwright)

Setup once: `npm i` and `npx playwright install chromium`. Run: **`node tools/play-test.js --games 1000 --viewport desktop`**. It starts its own static server (it refuses `image-studio/` and hidden files), serves Google Fonts from a cache, and plays complete games in headless Chromium, several at a time (`--workers 6`). Wrap long runs in `caffeinate -i`. A 1,000-game desktop run takes about 75 minutes. For a long run while you keep editing, copy the folder (without `.git`, `image-studio` and `node_modules`, with a symlink to `node_modules`) and run the copy, so edits can't change the games mid-run.

- **Sessions** alternate between desktop (1440 × 900) and phone (390 × 844, touch) unless `--viewport` is given. Every third session plays **three Play again replays**. Each session's own seeded choices decide whether it opens "Read the full story" and "Read more", scrolls mid-game, double-clicks, hovers or taps a milestone diamond and the gauge, and opens State of the art.
- **Known arc seeds** (`ARC_SEEDS`: 5027, 5043, 5057 reach a tipping point; 5013, 5014, 5007 and 5057 the agents era) play first in every desktop run. The run's summary prints which seeds reached each arc; if content changes move them, update the list from a fresh run.
- **Checks**, at every Choice, every Event panel, every tipping beat, the reveal, the results and every replay start:
  - **Chronology:** strip markers in date order left to right, never left of an earlier marker; results timeline in date order; an in-page monitor flags any marker that moves after landing or disappears mid-game.
  - **Flashes:** key text (headlines, summaries, the question, the Future title) must never become visible, disappear and come back within 3 s with the same words. (Two cards that can follow each other must therefore never share a question.)
  - **Completeness, labels and types:** the strip's markers match `__game.timeline` exactly; every label visible, unclipped and on screen, no overlaps over 2 px; Scenario markers tinted `#eacc9d`, Events `#85837f`, milestones a diamond in `#9fb4c7`, tipping points a dark disc in `#5e5a55`.
  - **Arcs:** an After humanity card never before a tipping point and an ordinary card never after one; no Event after a tipping point; the tipping beat fully shown with exactly its beat's text; The Long Middle never after a tipping point; every card after round 1 has a lead-in.
  - **Gauge, Scenario and Event content, reveal, results** (the How we got here sentences, every story paragraph, the results timeline, the State of the art list, the Value bars against the engine's scaled Values), **replays** (a clean start; a card drawn when unseen candidates existed was one of them), **health** (no console errors or warnings, no page errors, every click lands, a Choice click advances exactly one round, no game stuck).
- **On failure** it saves a JSON note (and a screenshot when it can) in `tools/play-test-failures/`. Reproduce with `node tools/play-test.js --only N --viewport desktop|phone --replays 0|3` (`--headed` to watch, `--speed 1` for real time), or open `/?seed=N&test=1`.
- **`--shots DIR`** saves a screenshot of every card, Event, tipping beat, the reveal and the results: the way to "walk through" games unattended and look for anything that feels off.
- **The default root is `site/`**, the folder the live site is deployed from as it is, so every run tests the deployable site. `--root DIR` serves another folder instead. `--base URL` plays against a server that is already running (for example `python3 -m http.server 8123 --bind 127.0.0.1 --directory site`, which is safe now that site/ holds only public files). `--placeholders` fails any card front that shows an image instead of the placeholder face; every run checks that each card back is `card-back.webp` and loaded and that each front image loaded.
- Other options: `--seed N` (first seed), `--ignore REGEX`, `PT_TRACE=<folder>` (debugging a stuck game).
- **Pass bar:** **1,000 desktop games with zero failures**, plus a look through `--shots` screenshots of at least five games (including a tipping point and two replays). Then 300 phone games; phone failures are reported but don't block a release (see `MORNING-REPORT.md` for the known ones).

## Other tools

- **`archive/tools/compat-test.js [games] [file]`**: the v5 compatibility test. Plays v4.1 (its engine, parser and content, read from the `v4.1` git tag) against a migrated story file on the current engine and compares Future shares, card shares and the How we got here sentences. It passed at 0.41 points with the migrated v4.1 content; it is kept for checking engine changes against the 4-round game.
- **`archive/tools/migrate-v5.js`**: the one-time migration from Next lists to storylets (kept for the record).
- **`tools/make-review-docs.js`**: builds `docs/review/futures-review.docx` and `docs/review/cards-review.docx` (Georgia, Navigation Pane headings, shaded image-prompt boxes, "Your notes" boxes, how-to page, every card's appearance rule in plain English with its share of random games). Needs the `docx` dev dependency.

