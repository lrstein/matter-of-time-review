# Morning report: v5

Good morning. v5 is built, tested and tagged (`v5`), and the launch audit is done. Everything is committed; nothing was deployed, and no paid API was called.

**Read first:** `review/futures-review.docx` and `review/cards-review.docx` (for your notes, in Word), then `DECISIONS.md` (every judgment call, with the alternative).

## What was done

- **Phase 1.** Each Future keeps Story 1 (the one with art); the other 24 stories are archived word for word in `content/archive/future-stories.md`. Last Light is now **The Last War**.
- **Phase 2.** The storylets engine: no more Next lists. Every card has a Round, optional Appears when conditions and Openers; the engine draws from every card that qualifies, favoring the one that continues the last decision. The v4.1 content was migrated by `tools/migrate-v5.js` and **matched v4.1 within 0.41 points** on every Future over 100,000 games (`tools/compat-test.js`); 1,002 play-test games passed.
- **Phase 3.** 7 rounds (2027–2050), adaptive Events, era drift, flags, the agents arc, tipping points with a full-screen beat and a dark strip marker, After humanity rounds, flags in Requires.
- **Phase 4.** 31 new Scenarios (62 in all), 5 new Events (10), 3 new milestones (10), 3 tipping beats, **6 new Futures** with one story each: The Pause, Glass Houses, Two Kinds, Inheritance, A Second Chance, Overgrowth. Every new item is marked `New in v5`. All real facts link to sources I fetched and checked.
- **Phase 5.** Balance, a rewritten `check-story.js`, an updated harness (tipping beats, arcs, known arc seeds, `--shots`), and a screenshot walk-through.
- **Phase 6.** The two review documents (`tools/make-review-docs.js` rebuilds them).
- **Phase 7.** The launch audit (below).

## Final numbers

- **`check-story.js` (100,000 games):** 0 problems, 0 chronology, 0 style, every "never" check clean (no empty round, nothing out of order, no repeats, arcs behave, every Future grounded and every required flag shown in How we got here).
- **Futures:** The Garden 10.6%, Common Ground 12.8%, Afterlife 5.1%, Elsewhere 5.7%, The Gilded Ones 8.3%, The Last War 4.8%, Blackout 4.8%, The Oracle 4.9%, The Pause 4.3%, Glass Houses 4.3%, Two Kinds 4.2%, Inheritance 5.9%, A Second Chance 2.7%, Overgrowth 2.3%, **The Long Middle 19.4%** (target ≤ 25%, was 33.7%).
- **Arcs:** tipping point 6.8%, agents era 11.3%, near miss 4.8%. **Events:** 1.89 per game. **Values at exactly zero:** 0.0%. **Replays:** 99.7% new cards in game 2.
- **Play-test, desktop:** **1,002 games, 0 failures** on v5, and again **1,002 games, 0 failures** on the audited build, played from `dist/` itself.
- **Play-test, phone (300 requested):** 218 games passed and 42 failed, all one cause (below); a session stops at its first failure, so 260 games were played.

## What failed or still feels off

1. **Phones: the timeline strip runs out of room in round 7.** Seven cards, up to three Events, milestones and a tipping point don't all fit as labeled markers on a 390 px strip. I made two phone-only fixes (the strip starts at Now on phones, since the history is on Home, and the strip is 38 px taller so a third label row fits), which took failures from every game to about one game in six, but in the rest a late label overlaps another. Fixing it properly needs a design choice from you: shorter phone labels, fewer label rows with labels only on the latest markers, or a strip that scrolls.
2. **A Second Chance (2.7%) and Overgrowth (2.3%)** are below the 4–8% target, by construction: they can't reach it while tipping points stay at 5–8% (DECISIONS.md, Phase 5, explains). If you want them more common, raise the tipping rate.
3. **I changed the brief's Value scale from 4/7 to 5/7** (one setting). With 4/7 The Long Middle was 39% and the older Futures fell to a third of their shares.
4. **I added "Near miss effects"** (control +2, unity +1 when the world nearly tips): without it A Second Chance was almost unreachable.
5. **Openers use `last flag`** rather than the brief's `flag`, so a lead-in never refers to a decision from two rounds ago.
6. **Images:** untouched, as asked. 47 cards and the 6 new Futures show the placeholder; every one has an Image description ready.

## Look at these first

1. The six new Future stories, in `review/futures-review.docx` (especially Inheritance, which must never say outright that people don't matter, and Overgrowth).
2. A tipping-point game: run `node tools/play-test.js --only 5005 --viewport desktop --headed --speed 1` to watch the harness play one in a real browser window at real speed (a tipping point in round 4, the agents era, and an Overgrowth ending). A seed alone only replays a game if the same Choices are made, so playing it yourself will differ.
3. The new round 5–7 cards in `review/cards-review.docx`, which also shows, for each card, when it appears and the opener into each next card.
4. `DECISIONS.md`, Phase 5 (what I tuned and why) and Phase 7 (what the audit removed).

## Launch audit (Phase 7)

- **Removed:** the unused `inline()` helper; the `.atl-line` paragraph that `historyItem()` built for the results timeline only to delete it again, and its CSS; the parser's empty legacy `next` fields. A scan of every CSS class and id found nothing else unused, and no handler is attached twice.
- **Fixed:** About's Play button now sits above the fold at 1440 × 900 (it was 3 px below it). CLAUDE.md is rewritten for v5, including the gauge as v4.1 built it and the sampled path count.
- **Deploy build:** `node tools/build.js` writes `dist/` (23 files, 4.9 MB) with only what the game needs, and fails if anything from `image-studio/` (the API keys), `tools/`, `review/`, `content/archive/`, tests, `node_modules/` or any hidden or `.env` file gets in. I checked that it really refuses. `dist/` is git-ignored. **Nothing was uploaded.**
- **Checked:** the final 1,000-game desktop run played `dist/` itself (0 failures), and `check-story.js` gives exactly the v5 numbers.

