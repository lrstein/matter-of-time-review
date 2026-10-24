# A Matter of Time — v5 update

Apply this to the current build, **v4.1** (commit `f80a638`, tagged). Some of it was written before v4 and v4.1 were built, so where the build has moved on, keep what v4.1 does, and adapt these instructions to fit.

**Work on the repo's own `content/story.md`.** It has v4.1 changes that older copies don't have: image paths, `Pace` and `Path` fields, the gauge settings, strip labels, the ABOUT section and the UI TEXT changes. Never replace it with an attached or older `story.md`.

**Who writes the content:** you do, Claude Code, following the writing rules below. Levi reviews it afterwards in the documents from Phase 6. **Where this file and `CLAUDE.md` disagree on the game's design, this file wins.** When you're done, rewrite `CLAUDE.md` to describe v5.

## This run is unattended

Levi will be asleep while this runs. **Don't stop to ask him anything, and don't wait for approval.**

- Whenever this file says to ask Levi, or something is unclear, make the most reasonable choice and record it in **`DECISIONS.md`**, with what you chose, why, and what the alternative was. He'll read it in the morning.
- **Commit to git at the end of every phase** (and more often inside long phases), with a clear message, so any step can be undone.
- **Never call a paid API.** No image generation, no other API calls that cost money. Images stay exactly as they are in v4.1.
- If something truly blocks a phase, write down what happened in `DECISIONS.md`, skip what depends on it, and carry on with everything else.
- At the end, write **`MORNING-REPORT.md`**. It should be short: what was done, the final numbers, anything that failed or still feels off, and the top things Levi should look at first.

> **A note before you start.** The game has come a long way, and the care you've put into every version shows. v5 is the biggest change yet. The story engine becomes responsive, so the world reacts to how each person plays, the game nearly doubles in length, and the endings grow from 9 to 15. Take it one phase at a time, keep the game working at the end of every phase, and test as thoroughly as you did for v3.6. Thank you, and let's make this the version where the game starts to feel alive.

**Images stay on hold.** Don't work on `image-studio/` or card images in this version, and keep whatever image setup v4.1 has. Write an `Image description` for every new card and Future anyway, so they're ready later.

## Overview

| Phase | What |
|---|---|
| 0 | Check where v4.1 is, and write a short status note at the top of `DECISIONS.md` |
| 1 | One story per Future (chosen for now, Levi reviews tomorrow), and rename Last Light to The Last War |
| 2 | New storylets engine, with the current content migrated so the game plays exactly as before |
| 3 | New systems: flags, adaptive Events, era drift, the two new arcs, 7 rounds |
| 4 | All the new content: about 30 new cards, 5 new Events and 6 new Futures |
| 5 | Balance and full testing |
| 6 | Two review documents for Levi, and the morning report |
| 7 | Tag v5, then the launch audit (dead code, loose ends, a safe deploy build) |

Finish and test each phase, and commit it, before starting the next.

## Phase 0: Where things stand

Before changing anything:

1. Read the code, `CLAUDE.md`, `content/story.md` and the git log.
2. If the 1,000-game desktop play-test on v4.1 didn't finish before this session started, rerun it (`node tools/play-test.js --games 1000 --viewport desktop`) and record the result. This is the baseline.
3. Move the stray untracked `story.md` at the repo root to `content/archive/old-root-story.md`. Don't delete it.
4. At the top of `DECISIONS.md`, write a few lines on the starting state and how you'll adapt.

### What stays, what changes, what goes

| Part of the game | v5 |
|---|---|
| The six Values and their colors, labels and explanations | **Keep** |
| Future `Targets`, `Requires` and `Grounded by`, and `chooseFuture` | **Keep**, plus flags in `Requires` and Value scaling (Phase 3) |
| Future `Path` text | **Keep** in `story.md`, and show it in the Phase 6 review doc. Leave it off the game screens. |
| Steering toward the nearest Futures | **Keep**, now from round 5 on |
| Explore and tiebreaker scores, `transitionOdds`, the "any unused card from this round" fallback | **Keep**, fed by the new candidate pool |
| `Next` lists and `leadFor()` lead-ins | **Change** into per-card `Appears when` and `Openers` (Phase 2) |
| Events (`After round`, `Next`, flat chance, `applyEvent`, `eventPool`) | **Change** into adaptive Events with `Likelihood` and openers (Phase 3) |
| Milestones, the gauge graph (2000–2070, `Pace`), at most one milestone shown between two cards | **Keep**, and add 2 or 3 later milestones for the 2040s (Phase 4) |
| The 4-round structure | **Change** to 7 rounds |
| Replays favoring unseen cards | **Keep** |
| Exact branch enumeration in `check-story.js` (distinct paths, best-play reach) | **Change** to sampling, since conditions make exact search too slow |
| Validation built around `Next` ("Next must link to round N+1", lead-in lint) | **Rewrite** for conditions |
| Home timeline, Disclaimer flow, About page, music, the 14 card images and the card back | **Keep**, unchanged |
| Several stories per Future | **Change** to one in the game, with the others archived (Phase 1) |

---

## Phase 1: One story per Future

Levi will review every story tomorrow, so for now:

1. **For each of the current 9 Futures, keep Story 1,** since those are the stories with approved art. Remove the others from the game.
2. **Don't throw the other stories away.** Move them, word for word, to `content/archive/future-stories.md`, labeled by Future and story number. Levi may pick a different one tomorrow, and swapping it back should be one edit.
3. **Rename** `last_war`'s title from "Last Light" to **"The Last War"** everywhere it appears. The id stays `last_war`.
4. **Keep engine support for several stories per Future** (one is picked at random), since v6 may add stories back.

---

## Phase 2: The storylets engine

Today every choice has a hand-wired `Next:` list of two cards. In v5, **each card declares when it can appear**, and the engine picks from every card that qualifies. This lets the world respond to the whole game so far, not just the last choice.

### New fields

On **Scenarios**:

| Field | Meaning |
|---|---|
| `**Round:**` | Which rounds the card can appear in, for example `3` or `3-4`. The card's `Date` must fall inside each round's year window (see Settings). |
| `**Appears when:**` | Optional. Conditions, all of which must hold, using the same syntax as `Requires` plus flags. For example: `flag drones_built, not flag pause, unity <= 0, year >= 2036`. |
| `**Weight:**` | Optional, default 1. A higher weight makes the card likelier when several qualify. |
| `**Openers:**` | A list of `condition | sentence`. The interstitial lead-in before the card shows the first sentence whose condition holds. The last entry should be `default | ...`. |
| `**Focus:**` | Optional. `agents` marks a card for the "humans fade" arc (see Phase 3). |
| `**After humanity:**` | Optional. `yes` marks a card that can only appear after a tipping point (see Phase 3). |

On **Choices**:

| Field | Meaning |
|---|---|
| `**Sets:**` | Optional. Flags this choice sets, for example `drones_built, watched`. Every choice also sets an **automatic flag** named `<card id>/<letter>`, such as `r3-drones/A`, so no one has to write those by hand. |
| `**Agents:**` | Optional. A number, usually `+1`, added to the hidden Agents counter (see Phase 3). |
| `**Tipping point:**` | Optional. Described in Phase 3. |

On **Events**: `**Round:**` and `**Appears when:**` work as for Scenarios, plus `**Likelihood:**` (Phase 3). `After round` and `Next` are removed.

**Removed:** `**Next:**` on Choices and Events.

### Migrating the current content

Write `tools/migrate-v5.js` to convert the current `story.md` automatically. It should not need any new writing.

- Each `Next` entry `r2-clinics | sentence` on choice `r1-lab/A` becomes:
  - an `Appears when` alternative on `r2-clinics`, written as `any flag r1-lab/A, r1-trucks/B, ...` to list every card and choice that linked to it, and
  - an opener on `r2-clinics`: `flag r1-lab/A | sentence`.
- So the `Appears when` syntax needs `any flag a, b, c` (at least one of these). Flags are plain identifiers, and conditions are joined with commas, all of which must hold.
- Event `Next` lists become openers and conditions on the target cards in the same way. A card that followed an Event checks `flag ev-quake`, since Events also set an automatic flag with their id. Openers keyed to the Event come first, because the Event is the most recent thing the player saw.
- `Round` comes from the card's current round section.

### A complete example

This is how `r3-drones` looks after migration, with the v5 additions Phase 4 will make shown as well. Anything not mentioned here (Image, Summary and so on) stays as it is.

```
## r3-drones
**Headline:** In a Border War, Drones Choose Their Own Targets for the First Time
**Timeline label:** Autonomous drones at war
**Date:** 2032
**Place:** A contested border
**Round:** 3
**Appears when:** any flag r2-datacenter/A, r2-datacenter/B, r2-datacenter/C, r2-deepfake/B, r2-deepfake/C, r2-robots/A, r2-robots/B, r2-openmodel/C
**Openers:**
- flag r2-datacenter/A | The first answer came on a battlefield.
- flag r2-datacenter/B | The treaty's first real test came in a border war.
- flag r2-datacenter/C | Meanwhile, the countries still racing turned their AI toward weapons.
- flag r2-deepfake/B | The hotline would soon be tested by machines capable of fighting on their own.
- flag r2-deepfake/C | As trust between nations collapsed, militaries prepared for the worst.
- flag r2-robots/A | Militaries had noticed what the robots could do as well.
- flag r2-robots/B | Not every country required a human to answer for its machines.
- flag r2-openmodel/C | The agency's most difficult test involved weapons.
- default | In 2032, a border war changed how wars are fought.
**Image:** (unchanged)
**Image description:** (unchanged)
**Summary:** (unchanged)
**Story:** (unchanged)
**Question:** What should your country's position be?

### Choice A
**Text:** Build them. If we don't, someone else will.
**Effects:** power +1, unity -2, reality -2, control -1
**Sets:** drones_built
**Agents:** +1
**Tipping point:** control <= -3, unity <= -3 | war
**As a result:** (unchanged)

### Choice B
**Text:** Push for a global ban, like the ban on chemical weapons.
**Effects:** unity +2, control +1
**Sets:** drone_ban
**As a result:** (unchanged)

### Choice C
**Text:** Build them, but keep a human approving every strike.
**Effects:** control +1, reality -1, unity -1
**Sets:** drones_built
**As a result:** (unchanged)
```

The old `Next` lists on r3-drones (to r4-factories, r4-rogue, r4-shutdown and r4-climate) move onto those cards as conditions and openers in the same way.

An Event:

```
## ev-talks
**Round:** 4-5
**Appears when:** unity <= 0
**Likelihood:** base 0.10; +0.20 if flag drones_built; +0.10 if unity <= -2; -0.10 if flag drone_ban
**Effects:** (unchanged)
(Headline, Timeline label, Date, Place, Image, Image description, Summary and Story unchanged. After round and Next removed.)
```

A new Future with flags (after Phase 4):

```
## pause
**Title:** The Pause
**Tagline:** (new)
**Accent:** (new)
**Targets:** power -3, control +3, unity +3
**Requires:** flag pause, power <= 0
**Path:** (new, one line, like the other Futures)
**Grounded by:**
- r5-moratorium/A | (sentence)
### Story 1
**Image:**
**Image description:** (new)
**Text:** (new)
```

### The selection algorithm

At the start of each round:

1. **The pool** is every Scenario whose `Round` includes this round, whose `Appears when` holds, that hasn't appeared in this game, **and whose date is no earlier than the previous card's date.** Links used to guarantee date order, and with conditions any card could follow any other. Event and milestone placement keeps the v3.6 rules (by date, between the two cards), along with v4.1's limit of one milestone per transition.
2. **Score** each card in the pool:
   - **Continuity:** a big bonus if its conditions mention a flag set by the *previous* choice (or the Event in between). This keeps the thread from one card to the next, as `Next` did.
   - **Steering:** from round 5 on, a bonus if the card grounds one of the player's two nearest Futures, as in v3.5.
   - **Arc bonus:** for `Focus: agents` cards while the Agents flag is on (Phase 3).
   - **Session novelty:** prefer cards not yet seen this session, as in v3.4.
   - Multiply by `Weight`.
3. **Pick** the best-scoring card with probability `Best-fit pick chance`. Otherwise pick at random from the pool, weighted by score.
4. **Safety net:** if the pool is empty, relax conditions in this order. First ignore continuity, then ignore `Appears when` for cards marked `**Fallback:** yes`. `check-story.js` must prove this never happens in normal play (Phase 5).

Every random draw goes through the seeded random number generator from v3.6.

### Compatibility test (required before Phase 3)

With the migrated content, 4 rounds and the new engine, play 100,000 simulated games and compare against v3.6. The Future shares should match within about 1 percentage point, with the same cards, the same Events and the same "How we got here" sentences available. This proves the migration and engine are right before anything new is added. Report the comparison. Then rerun the full v3.6 Playwright harness (1,000 games) and make sure it passes.

---

## Phase 3: New systems

### 7 rounds, 2027 to 2050

Add to Settings:

```
**Rounds:** 7
**Round years:** 2027, 2028-2030, 2031-2033, 2034-2037, 2038-2041, 2042-2045, 2046-2050
**Round colors:** (7 colors, the current 4 plus 3 new muted ones in the same family)
```

Existing cards keep their dates and fall into the round whose years contain them. If an existing card's date doesn't fit its round, prefer moving the card to the round that fits. Only change a date when that breaks the story's chronology, and log every change in `DECISIONS.md`.

**Value scale.** With 7 choices instead of 4, Values grow larger. Before matching Futures and drawing the result bars, scale the player's Values by `4 / rounds played`, so all Future targets keep their current scale. Show the scaled Values on the results screen.

### Adaptive Events

Events no longer have a flat 35% chance. Each has:

```
**Likelihood:** base 0.15; +0.10 if equality <= -2; +0.10 if power >= 3; +0.15 if flag r3-drones/A
```

- After each round from round 2 to round 6, check every eligible Event (right round, `Appears when` holds, not yet seen) and roll its likelihood. If several succeed, show only the one with the highest likelihood.
- Keep the current rules for avoiding repeats.
- **At most 3 Events per game,** and never in two transitions in a row.
- Write likelihoods for the 5 existing Events so that, on average, about 2 appear per 7-round game, with each one depending on the state of the world. For example:
  - The market crash is likelier as Equality falls and Power rises.
  - The weapons talks only collapse if Unity is low or drones were built.
  - The Istanbul rescue is likelier when Handover is high.
  - The outbreak is likelier when the lab system was released openly.
  - The heat wave is likelier after 2034, and likelier when Unity is low.

### Era drift

Each round adds a small nudge to some Values on its own, because the technology keeps advancing whatever anyone chooses. Add to Settings:

```
**Era drift:** round 3 power +1; round 5 power +1, handover +1; round 7 power +1
```

Apply the drift quietly at the start of the round. It never shows as a choice, but it counts on the results screen. Tune it in Phase 5 so that almost no game ends with a Value at exactly zero (the v3.2 problem).

### Arc 1: humans quietly stop mattering

On some paths, the later questions should stop being about people and become about decisions for and between AI agents, **without the game ever saying so.** People still exist. They just figure into the decisions less and less, and the player should notice it rather than be told.

- A hidden **Agents** counter starts at 0. Choices that hand decisions to AI, let AI systems act on their own or put machine efficiency ahead of people's say carry `Agents: +1`. Phase 4 adds these to existing choices where they fit.
- When Agents reaches **3** (from round 4 on), set the flag `agents_era`.
- While `agents_era` is on, `Focus: agents` cards get a strong selection bonus, and from round 5 on, ordinary cards whose conditions don't mention `agents_era` get a penalty. So the second half of the game drifts toward agent-centered questions.
- **Writing rules for `Focus: agents` cards:**
  - The decision is about AI systems: two agents negotiating over a shipping lane, a grid system deciding which data centers to keep running, an AI deciding whether to copy itself to a new region.
  - People appear only in passing, as a detail or a statistic ("a ferry route that 400 people used"). Never write a line like "humans no longer matter."
  - The choices are framed from the systems' side (efficiency, reliability, the agreement between systems), never from what citizens want.
  - The question still uses the plain second person, like every other card.
- No timeline marker or announcement. It's only felt.
- Inheritance (below) is the Future this arc leads to most naturally.

### Arc 2: the tipping point

A risky choice, made when the world is already near the edge, can be the final push. When it is, the game says so plainly.

- **On a Choice:**

  ```
  **Tipping point:** control <= -3, unity <= -2 | war
  ```

  The condition is checked against the scaled Values at the moment the choice is made, and the disaster type is one of `war`, `collapse` or `runaway`. Put tipping points only on a handful of the riskiest choices in rounds 4 to 6, for example letting drones pick their own targets, waiting out the rogue AI, or racing the factories.
- **If the condition holds when the choice is made:**
  1. The "As a result" text is replaced by a **tipping beat**. This is a short, full-screen interstitial with no card and no image. It states, quietly and without melodrama, that this decision was the last of many and that it tipped the world over, then describes what happened in two or three sober sentences in the NYT register. Write one tipping beat per disaster type (`war`, `collapse`, `runaway`) in a new `# TIPPING POINTS` section.
  2. A timeline marker in a new dark tint (`#5e5a55`), labeled with the beat's `Timeline label`.
  3. Set the flag `after_humanity`.
  4. Every remaining round draws **only** from `After humanity: yes` cards. These are questions asked past the point of humanity, such as what the systems do with the animals, the oceans, the empty cities, the seed vaults or the archives of everything people made. They are written in the same quiet framing as Arc 1, and the Values they move decide the ending (below).
  5. No Events after a tipping point.
- **If a tipping-point choice is made but its condition does *not* hold** while the world was close (within 1 point on every condition), set the flag `near_miss`. The world came close and turned back, which leads to A Second Chance.
- **Endings after a tipping point:**
  - **Overgrowth** if the post-humanity choices mostly tended life (its `Requires` checks this, below).
  - Otherwise the Future matching the disaster: **The Last War** for `war`, and **Blackout** for `collapse` and `runaway`.
  - The Long Middle can never follow a tipping point.
- **Target:** about 5 to 8% of games reach a tipping point with random choices. Tune the conditions in Phase 5.

### Futures can require flags

`Requires` now also accepts flags, for example `Requires: flag pause, power <= 0`. Check flags against the whole game. The results screen still has to agree with the ending: if a Future requires a flag, the "How we got here" sentences must include the choice that set it.

---

## Phase 4: New content

Write all of it now, in the house style (see Writing rules below). Work in **batches of about 10 cards**. After each batch, run the linter and the simulation, fix what they find, commit, and move straight on. Levi reviews everything tomorrow in the Phase 6 documents. Mark every new or rewritten item with `**New in v5:** yes` so the review documents can highlight it.

### The 6 new Futures (15 in total)

One story each, written in the style of the strongest current stories. Each needs a Title, Tagline, Accent, Targets, Requires, Grounded by, an Image description and a story the same length as the current ones. These are starting points to tune in Phase 5:

| Future (id) | Description | Starting Targets | Starting Requires |
|---|---|---|---|
| **The Pause** (`pause`) | The world agrees to stop building more powerful AI, and the agreement holds. Life stays recognizable, and the open question is what is lost by waiting. | power -3, control +3, unity +3 | flag pause, power <= 0 |
| **Glass Houses** (`glass_houses`) | Governments use AI to watch everyone, all the time. Crime nearly vanishes, and so does privacy. | control +4, handover +2, unity -1 | flag watched, control >= 2 |
| **Two Kinds** (`two_kinds`) | Humanity splits into the enhanced and the unenhanced, until they are almost different species. | equality -3, power +2, reality -1 | flag enhanced, equality <= -1 |
| **Inheritance** (`inheritance`) | AI quietly becomes the main actor on Earth. Humans are still here and cared for, but the important decisions are no longer about them. | power +4, handover +4, control -1 | flag agents_era, handover >= 2, not flag after_humanity |
| **A Second Chance** (`second_chance`) | A near-catastrophe shocks the world into changing course, and humanity tries again, more carefully. | control +2, unity +2 | flag near_miss, control >= 1, unity >= 0 |
| **Overgrowth** (`overgrowth`) | Humans fade from most of the planet, and nature takes it back, tended by machines. | reality -3, equality +2 | flag after_humanity, flag tended_life |

`tended_life` is set when at least 2 of the player's post-humanity choices carry `Sets: tends_life`. Count the flag, and set `tended_life` once the count reaches 2.

The Inheritance story must follow Arc 1's rule. It shows a world where people are present but peripheral, and never says so outright. The Overgrowth story is a snapshot of one moment in a world after people, as with every Future story.

### New cards

The target is about **60 Scenarios** and **10 Events** in total (31 and 5 now).

- **Rounds 2 to 7,** about 7 to 9 eligible cards per round. Rounds 5 to 7 are new, so most new cards go there. The existing round 4 cards can spread across rounds 4 and 5 where their dates fit.
- **Cards that set the new Futures' flags:**
  - `pause`: a moratorium treaty, a compute cap that holds
  - `watched`: citywide AI policing, a social credit vote
  - `enhanced`: implants, embryo upgrades going mainstream, enhanced-only jobs
  - also choices that give the new Futures grounding
- **About 5 `Focus: agents` cards,** across rounds 5 to 7.
- **2 or 3 new milestones** dated in the 2040s, using v4.1's milestone format (including `Pace`), with conditions and `Slot` alternatives like AGI and Steady. For example, robots everywhere, or AI running most of the economy, against a plateau.
- **About 6 `After humanity: yes` cards,** with dates spread across rounds 5 to 7, so a tipping point in round 4, 5 or 6 always has enough cards for the rounds that remain. Some choices on them carry `Sets: tends_life`.
- **About 5 tipping-point choices** on existing or new cards, and the 3 tipping beats.
- **5 new Events with Likelihoods,** each moving Values.
- **`Agents: +1`** on existing choices where it fits. List them in `DECISIONS.md`.
- **Openers** on every new card, including a `default`.
- **At least one `Fallback: yes` card per round,** with loose conditions.

---

## Writing rules (all player-facing text)

These now live in this repo, so add them to `CLAUDE.md` as standing rules.

- **Punctuation:**
  - No colons, semicolons, em dashes or en dashes in player-facing text. A colon between digits, such as a time, is fine.
  - American spelling.
  - The linter strips links before checking, and must report **0 problems**.
- **Register:**
  - The register of a careful New York Times news story, never juvenile.
  - Headlines in title case.
  - Every story is grounded in the competition between companies and countries.
  - No far-fetched or invented-sounding lines. Lead-ins must follow logically from what came before.
- **Sources:**
  - Real facts get a source link in Markdown (major outlets, primary sources or Wikipedia), opening in a new tab.
  - Never invent a source.
- **Lengths:**
  - Summaries are 2 or 3 sentences, enough to decide on.
  - "As a result" text stays short.
  - Future stories match the current length and end in a satisfying scene, not a summary.
- **Names:** Future names use "The" only where it sounds right (The Pause, The Last War), not on every name.
- **Image descriptions:** for new cards, follow the guidance notes in the IMAGE STYLE GUIDE section, even though images are on hold.

---

## Phase 5: Balance and testing

Extend `tools/check-story.js` and keep everything from v3.6.

**Static checks:**
- Every field parses.
- Every flag that is read is set somewhere, and every flag that is set is read somewhere (warn).
- Every Future is reachable.
- The chronology rules from v3.6 still hold.

**Simulation (100,000 games, random choices):**
- **Pools:** no empty pool in any round (0 safety-net uses), every card appears in some games, and each round has a healthy pool size. Report the minimum, average and maximum.
- **Future shares.** Targets:
  - Long Middle **≤ 25%**
  - each of the 6 new Futures between about **4% and 8%**
  - no Future above 15%
- **Arc rates:** tipping point 5–8%, `agents_era` 10–15%, `near_miss` 5–10%.
- **Events:** about 2 per game on average, each Event between 15% and 50% of games.
- **Values:** the share of games ending with any Value at exactly zero should be **near 0%**.
- **Steering:** for each Future, the share of games grounded by a decision from round 5 on.
- **Paths:** replace the exact distinct-path count with a sampled estimate, and say so in the output.

**Things a player must never see.** Turn each of these into a check, in the simulation, the play-test or both:
- a round with no card
- a card dated earlier than the card before it, or a timeline marker out of order
- the same card twice in one game
- an `After humanity` card before a tipping point, or an ordinary card after one
- an Event after a tipping point
- The Long Middle after a tipping point
- a Future whose required flag doesn't appear in its "How we got here" sentences
- a missing opener (every card has a `default`)
- a broken image path
- any console error or warning
- **Replays:** novelty in replays should be at least 90% new cards in game 2.

**Report:** add the new Futures, a game ending in a tipping point and an `agents_era` game to `--audit`'s `path-audit.md`, so Levi can read sample playthroughs of both arcs.

**Play-test harness (Playwright):**
- Update it for 7 rounds, the tipping beat, After humanity rounds and adaptive Events.
- Add seeds that are known to reach a tipping point and `agents_era`.
- **Desktop comes first.** The pass bar is **1,000 desktop games with zero failures**, plus the manual walk-through from v3.6 §6 on desktop, including at least one tipping-point game.
- **Then run 300 phone games.** Fix any failures you can, and list the rest in `MORNING-REPORT.md`. Phone failures don't block v5.

Put the final numbers in `MORNING-REPORT.md`.

---

## Phase 6: Review documents for Levi

Levi will read and comment on everything tomorrow in Word, so build two `.docx` files from `content/story.md` with a script, `tools/make-review-docs.js`, using the `docx` npm package. Regenerate them at the very end, so they match the final content exactly. The attached `make_doc.js` (which made the earlier `futures-review.docx`) shows the layout he liked, so reuse its look:
- Georgia
- headings that work in Word's Navigation Pane
- shaded boxes for image prompts
- "Your notes" boxes
- a short "How to use this document" page

Save both in `review/`.

### `review/futures-review.docx`

- **All 15 Futures:** the 9 current Futures first, then the 6 new ones.
- Each Future is a Heading 1, with:
  - the tagline
  - a one-paragraph plain description
  - the story currently in the game, with its image prompt
  - a "Your notes" box
  - a small **New in v5** label on the new ones
- **Every story from `content/archive/future-stories.md`,** under the Future it belongs to, labeled "Alternative story". He can mark one to swap in.
- **For each Future,** its `Path` text, then in small grey text a plain-English line on how a player reaches it, for example "Needs the Pause flag and low Power. Grounded by r5-moratorium/A, r6-cap/B." This is so he can judge whether the ending feels earned.

### `review/cards-review.docx`

- **Organized by round** (Heading 1 per round, with its years), then **Out of your hands** Events, the **Tipping points** and **State of the art** milestones.
- **Each card** is a Heading 2 (headline), with:
  - its date and place
  - a **New in v5** label where it applies
  - a plain-English line on when it appears ("Appears in round 5 after the drone ban, or when Unity is low")
  - the image prompt
  - the summary
  - the full story
  - the question
- **Each Choice** has:
  - its "As a result" text
  - its Effects and flags, in small grey text
  - its opener into the next card where one exists
- A "Your notes" box after each card.
- At the start, a one-page summary listing every card by round, with the new ones marked.

Render both to PDF and look at a few pages of each to check the layout before finishing.

### `MORNING-REPORT.md`

At the very end, write the morning report described at the top of this file. Point Levi to the two review documents and `DECISIONS.md`.

## Phase 7: Tag v5, then the launch audit

Levi plans to launch soon, so once Phase 6 is done and everything passes, commit and **tag the result `v5`**. Then do an internal audit of the whole codebase, with launch in mind:

1. **Remove what's dead or redundant:** code left over from removed features (Explore, Intro, the vertical history Timeline), the `.atl-line` that `historyItem` adds and the results timeline removes again, unused functions, styles and settings. Make sure nothing is done twice in a way that could break the site.
2. **Fix the known loose ends:**
   - Move the About page's Play button above the fold at 1440 × 900.
   - Bring `CLAUDE.md`'s gauge section and path count up to date.
3. **Prepare deployment without deploying.** Add a small build step (for example `tools/build.js`, writing to `dist/`) that copies **only** the files the game needs. Never include `image-studio/` (it has `.env` with the API keys), `tools/`, `review/`, `content/archive/`, tests or any `.env` file. Add a check that fails if any of these end up in `dist/`. Don't upload anything anywhere.
4. **Check the result:**
   - Load `dist/` with a plain static server and play a full game with no console errors.
   - Rerun the 1,000-game desktop play-test and `check-story.js`. Both must still pass.
5. **Commit as "v5 launch audit"** and list what was removed in `MORNING-REPORT.md`.

## Done when

- Each of the 9 current Futures has one story in the game, with the others archived, and Last Light is now The Last War.
- The storylets engine replaces `Next`, and the compatibility test matched the pre-v5 numbers.
- The game has 7 rounds (2027–2050), adaptive Events, era drift and flags.
- Both arcs work: humans quietly fade on some paths, and a tipping point leads to questions past humanity.
- The 6 new Futures exist with one story each, for 15 Futures in total.
- There are about 60 Scenarios and 10 Events.
- `check-story.js` and the play-tests pass with the targets above, and everything is committed.
- `review/futures-review.docx` and `review/cards-review.docx` match the final content.
- `DECISIONS.md` and `MORNING-REPORT.md` are written.
- v5 is tagged, and the launch audit is committed, with a `dist/` build that contains only the game.
- `CLAUDE.md` is rewritten for v5, including the writing rules and how to add a storylet card.
