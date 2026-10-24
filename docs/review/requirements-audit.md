# Requirements audit, October 2026

> **Decided and carried out in v5.4** (October 21, 2026). Levi's decisions and what was built are in `DECISIONS.md` under v5.4. The CONTRADICTIONS table in `tools/check-story.js` guards against every finding below.

Where an item's conditions don't guarantee what its text says. This covers every Scenario, Event, milestone, tipping beat and Future story, read against its **Appears when**, **Condition** or **Requires**. A simulation then measured how often each mismatch actually happens.

**How to read this.**
- **Sev** is severity:
  - **High**: a contradiction a player meets often, or one that breaks the story's logic.
  - **Med**: real, but rarer or softer.
  - **Low**: a small wording problem.
- **Freq** is the share of *all* random games where it happens (40,000 simulated games on the current content, including the brake change). Real players choose more consistently than random ones, so some of these will be rarer in practice and some more common.
- **Decision** is left blank for us to fill in together.

The findings come first (A–D), then whether each field earns its place (E), then a suggested order (F).

---

## A. Capability and pace (the core logic)

### A1. "Let it run" can be followed by "Progress levels off" · Sev High · Freq 0.5% (15% of players who choose it)
- **Items:** `r4-selfimprove` Choice A (2039, "Let it run. If we stop, a rival will win."), then `sota-plateau` (2040).
- **The rule:** the plateau needs `brakes >= 2, flag brake_world`. Brakes only ever add up, so a racing Choice can't take one back.
- **Example:** treaty on the desert supercomputer (2029, a world brake) → break up the AI giants (2034) → "Let it run" (2039) → 2040 "Investors stop paying… progress levels off".
- **Suggested fix:** make Brake signed. Racing Choices carry a negative Brake (`Brake: -1`, `-2` for "Let it run"). The plateau then follows the *balance* of the player's decisions, so the 2039 card really decides 2040. The same field can drive the graph (see E: it replaces the proposed Choice Pace).
- **Decision:**

### A2. A worldwide pause call produces a *money* plateau · Sev High · Freq 3.2% (every player who makes the call)
- **Items:** `r4-selfimprove` Choice C ("Call for a worldwide pause… 60 countries endorse… two rival labs keep working in secret"), then `sota-plateau` "Investors Stop Paying for the Next Leap".
- **Why:** the pause call alone is +2 brakes and global, so it always triggers the plateau, whose text is now only about money. This is the flaw Levi found in image 14.
- **Suggested fix:** the planned `sota-held` "AI held at the line" milestone, ahead of the plateau in the same slot, for worlds where a pause or restraint did it. Its text: the pause held, and the secret labs fell behind without the world's chips and power. Its Because cites the pause.
- **Decision:**

### A3. "Progress meets its limits" shows in racing worlds · Sev Med · Freq 2.6%
- **Item:** `sota-limits` (2048, a slowdown). Its condition is just `reached sota-asi`. It is the fallback in the late slot whenever `sota-economy` fails, and that milestone needs `power >= 2`.
- **Edge case:** a superintelligence world with no brakes but a middling power Value gets a slowdown at 2048, citing energy and materials. That breaks the rule that AI climbs unless the player brakes it.
- **Suggested fix:** require brakes for `sota-limits`, and make `sota-economy` the fallback for unbraked superintelligence worlds. Its `power >= 2` would become `brakes <= 1` or similar.
- **Decision:**

### A4. `sota-economy` and `sota-builders` still use the power Value · Sev Med · Freq (structural)
- **Items:** `sota-economy` (`power >= 2, not flag pause…`) and `sota-builders` (`power >= 3, not flag pause, reached sota-robots…`).
- **Why it matters:** these were tuned to the old power-based model. A world that raced through scattered decisions can still end with low power and miss them.
- **Suggested fix:** move them to the brake balance, like A1 and A3.
- **Decision:**

### A5. "The first AI that can do nearly any job" comes three years after "AGI achieved" · Sev High · Freq 3.5% (83% of the card's games)
- **Item:** `r3-firstagi` (2034), `Appears when: capability >= AGI`. On-time AGI was announced as a milestone in 2031.
- **Suggested fix (pick one):**
  - (a) Require `reached sota-agi-late`, so it only shows in late-AGI worlds.
  - (b) Reword it as the first *general AI offered for sale or to the public*, which can come years after researchers agree AGI exists.
  - (c) Two versions, by world.
- **Decision:**

### A6. Home robots go on sale in 2030, then "robots catch up" in 2039 · Sev Med · Freq 7.5%
- **Items:** `r2-robots` (2030) "walks, climbs stairs, cooks… learns a new task by watching someone once"; `sota-agi` (2031) "robots still lag behind the software"; `sota-robots` (2039) "finally match human dexterity".
- **Suggested fix:** tone down `r2-robots`: clumsy, limited to set tasks, needing help often. That leaves "match human dexterity" for 2039.
- **Decision:**

### A7. Flags are never cleared, so a pause outlives the treaty that ended it · Sev Med · Freq 1.3%
- **Example:** sign the moratorium (2040, sets `pause`) → `r6-cap` Choice C "Let it expire" (2046). `pause` stays set, so `sota-economy` and `sota-builders` stay blocked ("not flag pause"). The Pause can still be the ending (rare, 0.04%), and its How we got here can cite a treaty that expired.
- **Suggested fix:** add `not flag r6-cap/C` where `pause` is read, rather than adding a new "Clears" field.
- **Decision:**

### A8. The 2040 moratorium card arrives in any world · Sev Med · Freq 16.7% of games show it; 80% of those right after Superintelligence, 20% after a plateau
- **Item:** `r5-moratorium` (2040) has **no Appears when**. Its text says "every year the systems grow more capable" and proposes freezing AI "more capable than the best systems now running".
- **Edge cases:**
  - After a money plateau, AI isn't growing, so the premise is false.
  - Right after Superintelligence, a freeze at that level is plausible, but later text (The Pause story, see C6) then describes expert-level AI.
- **Suggested fix:** in plateau or held worlds, use a version or opener ("a treaty to make the stall permanent"), or exclude it there and let `r6-slowtreaty` cover that idea in 2053.
- **Decision:**

### A9. The self-improvement card can arrive when 2040 is already decided · Sev Med · Freq 4.7%
- **Item:** `r4-selfimprove` (2039). In braked worlds the plateau is already certain before the card, so its three Choices can't change what 2040 brings.
- **Suggested fix:** with signed brakes (A1), the card's Choice becomes decisive. Also consider showing it only when the world is still racing (the planned `sota-rsi` milestone).
- **Decision:**

### A10. The reason for superintelligence is often generic · Sev Low · Freq Superintelligence's Because falls back to its default 40% of the time; `sota-robots` 88%
- **Suggested fix:** in the new model, superintelligence happens *because nothing slowed it*. Rewrite the default that way ("No one slowed the race, and by 2040…"). Add Because lines for the common racing Choices, and robot Because lines for `r2-robots/A` and the agents Choices.
- **Decision:**

---

## B. Cards and Events whose text assumes more than their conditions

### B1. `r4-factories`, "output doubles every year", after a money plateau · Sev High · Freq 1.5% (11% of its games)
- **Rule:** `any flag … , capability >= AGI, reached sota-robots`. Nothing excludes slowdowns.
- **Nuance:** after a *pause or treaty*, the card works. Its opener says "The treaty froze AI's intelligence, not its industry". After a *money* plateau it doesn't, because no one is paying.
- **Suggested fix:** add `not reached sota-plateau, not reached sota-steady`, and keep it in held worlds.
- **Decision:**

### B2. `r6-cap`, "the cap held", after the player signed a paper-only halt · Sev High · Freq 2.0% (35% of its games)
- **Rule:** `any flag r5-moratorium/A, r5-moratorium/B`. Choice B's result says "The halt exists on paper", yet `r6-cap` says the cap held and AI is "about as capable as in 2040". Its opener for B ("the treaty's central limit held") contradicts B's own result.
- **Suggested fix:** require only `r5-moratorium/A`, or write a B version ("the exemptions swallowed the treaty, and now even the paper limit is up for renewal").
- **Decision:**

### B3. `r6-slowtreaty` proposes a ceiling that already exists, or explains the stall wrongly · Sev Med · Freq 1.0% with a pause already in force; 2.3% right after a pause call
- **Rule:** `not reached sota-asi`. The text says AI has been "held back by the cost of energy and chips" and proposes a new ceiling treaty.
- **Suggested fix:** `not flag pause`, plus a version for held worlds ("the pause of 2039 was never written into law; scientists propose making it permanent").
- **Decision:**

### B4. `r5-checkers` says "since progress leveled off in 2040" in steady worlds · Sev Low · Freq 0.2%
- **Fix:** say "since progress leveled off" without the year.
- **Decision:**

### B5. `r7-work`, "fewer than one adult in five has a job", in stalled worlds · Sev Med · Freq 1.7% after a plateau
- **Question for us:** can AI at a skilled professional's level, plus robots, end most jobs? Plausibly yes. But it conflicts with the plateau and Back to Earth story that people go back to roughly where they were.
- **Suggested fix:** exclude it from plateau worlds, or give it a gentler stalled version ("one in three").
- **Decision:**

### B6. `r3-finland` (2035) "AI and robots now performing much of the world's paid work", before robots catch up (2039/2043) · Sev Low · Freq most of its games
- **Fix:** "AI now performing much of the world's office work".
- **Decision:**

### B7. `ev-talks`, "six years of talks… collapse", after the UN drone ban passed · Sev Low · Freq ~0.01%
- `r3-drones/B` passed a UN ban with 140 votes. The likelihood already drops by 0.3. **Fix:** `not flag r3-drones/B`.
- **Decision:**

### B8. Events that don't show AI or don't fit the era · Sev High (Levi's brief) · Freq every game after 2040
- `ev-heat` (2043): AI plays no part at all.
- `ev-blight` (2053): "an AI designs a resistant variety in six weeks" reads the same in a superintelligence world (where it would take hours) as in a stalled one.
- `ev-outbreak` (2039): the same, nine days in any world.
- `ev-cables`: already says "depths only robotic submarines can reach". Levi wants this in the summary too.
- **Suggested fix:** as planned. Rewrite `ev-heat` around AI's rescue role. Give the outbreak and the blight versions by world. Write the three new late Events (storm, update, malaria).
- **Decision:**

### Checked and fine (no action proposed)
- `r4-rogue` after a pause (1.8%): its openers already explain it ("two holdouts working in secret… one of their systems got out").
- `r6-arms` with a pause in force (4.7%): a training cap doesn't stop deployed weapons.
- `r5-bust` after a pause call: its opener handles it ("The pause had held, and the money… began to leave").
- `r4-cancer` and `r4-climate` in plateau worlds: plausible at expert level.

---

## C. Futures whose story claims more than their Requires guarantee

### C1. The Last War and Blackout end humanity without a tipping point · Sev High · Freq Last War 5.2% (81% of its endings); Blackout 0.5% (36%)
- **Story:** "There are no people anywhere" (Last War); "no one is left to ask" (Blackout). **Requires:** only Values (`unity <= -0.5, control <= 0.5, reality <= 1` for Last War). The tipping point is meant to be *the* line past which humanity ends, but most Last War endings never crossed it.
- **Options:**
  - (a) Require `flag after_humanity`. Simple, but Last War would fall to about 1.2% and The Long Middle would rise.
  - (b) A second story for each (`When: not flag after_humanity`): the war or blackout happened, it was devastating, and humanity survived and is rebuilding. This keeps the shares and fits "never collapse all the way" outside the tipping arc.
- **Decision:**

### C2. Common Ground cites events most players never saw · Sev High · Freq 12% (92% of its endings)
- **Story:** "after a long legal battle, AI systems won… the right to refuse… The same law gave every human the right to refuse an AI… Parliaments seat both human and AI members". That is `r4-rights` Choice C plus `r3-estonia` Choice A. 92% of Common Ground games never saw `r4-rights`, and some refused AI rights (`r4-rights/B`) or chose "humans decide, always" (`r3-estonia/B`).
- **Suggested fix:** rewrite the middle paragraph around what *every* Common Ground path shares: treaties, shared oversight, the hardest decisions made together. Or add a version that keeps the rights paragraph only `When: flag r4-rights/C`.
- **Decision:**

### C3. Afterlife says most of humanity uploaded, though most players never saw uploading · Sev High · Freq 5.3% (88% of its endings); banned uploading 0.1%
- **Requires:** `reality >= 1.5, control >= 0`. You get there through glasses, virtual worlds and grief bots, without ever meeting `r3-upload`.
- **Options:**
  - (a) Require `any flag r3-upload/A, r3-upload/B` (smaller share).
  - (b) A second story, `When: not flag r3-upload`, where life moves online through virtual worlds rather than uploaded minds.
- **Decision:**

### C4. Glass Houses assumes cameras and trust scores the player may have rejected · Sev Med · Freq 1.0% rejected scores; 0.8% banned face recognition (together about half its endings)
- **Requires:** `flag watched, control >= 1.5`. Six different Choices set `watched`, including AI fact-checking (`r2-deepfake/A`).
- **Suggested fix:** `not flag r5-socialcredit/B`, or a story that doesn't depend on scores.
- **Decision:**

### C5. Two Kinds tells of a designed son, even when the player limited embryo editing to disease or made it free · Sev Med · Freq 0.4% (33% of its endings)
- **Suggested fix:** require `not flag r4-embryo/B, not flag r4-embryo/C`, or make Theo's advantage an implant rather than his genes.
- **Decision:**

### C6. The Pause story assumes a 2040 treaty and expert-level AI · Sev High · Freq 1.8% with no 2040 treaty (59% of its endings); 1.2% with superintelligence (37%)
- **Story:** "an inspector… since it began in 2040", and AI "very good at their jobs… none much more capable than the early 2040s". But `pause` also comes from the 2053 ceiling (`r6-slowtreaty/A`, the largest source) and from the 2046 renewal. In 37% of Pause games the treaty froze a *superintelligence*.
- **Suggested fix:** versions by `When`: (1) the 2040 treaty at expert level, (2) the 2040 treaty on superintelligence, (3) the 2053 ceiling. Or one story that doesn't name the year or level.
- **Decision:**

### C7. A Second Chance always tells of a runaway AI, but most near misses are wars · Sev Med · Freq 1.2% of games: war 44%, collapse 21%, runaway 35%
- **Suggested fix:** three versions, matching the planned near-miss Events: war, collapse, runaway.
- **Decision:**

### C8. Back to Earth says "No treaty stops the machines" after the player called for a pause · Sev Med · Freq 0.7% (16% of its endings); after a rescue that restarted the race, 0.2%
- **Suggested fix:** `not flag restraint` (that world becomes "held"), and `not flag r5-bust/A`.
- **Decision:**

### C9. The Gilded Ones' Celeste turns 140 in 2060 · Sev Low
- She would have been born in 1920. **Fix:** 105, or "looks 40 at 90".
- **Decision:**

---

## D. Openers and Because lines

### D1. `r6-cap` opener for `r5-moratorium/B` contradicts that Choice · Sev Med (see B2)
"For all its exemptions, the treaty's central limit held" against B's own result, "The halt exists on paper."
- **Decision:**

### D2. Lines that can never show, or almost never · Sev Low
- `sota-steady`: 4 of 6 lines never show (it happens in 1% of games, so this is fine).
- `sota-plateau`: 8 of 20 are superseded, because a more recent brake always wins. Fine.
- `sota-agi`: 2 never show (`r1-lab/C`, `r1-tutor/A`), because a round 2 decision always comes later.

No action needed unless we want shorter lists.
- **Decision:**

### D3. Sampled openers are mostly good
The pause, treaty and expiry openers on `r4-factories`, `r4-rogue`, `r5-bust` and `r6-slowtreaty` already handle their edge cases well. They are a model for the fixes above.

---

## E. Do the fields earn their place?

Uses = how many items set it. "Read by" = what uses it.

| Field | Uses | Read by | What it does | Verdict |
|---|---|---|---|---|
| Threads | 83 | engine | storylines, the spine, which Events fit | **Keep** |
| Follows | 67 | engine | continuity (what leads to what) | **Keep.** Note: most cards also list the same ids in Appears when's `any flag`. A later simplification could be "Appears when: follows". |
| Appears when / Condition / Requires | 73 / 9 / 15 | engine | eligibility | **Keep** (this audit is mostly about them) |
| Openers / Because | 73 / 13 | engine | grounding in the player's decisions | **Keep** |
| Scale | 79 | engine | the climb in stakes | **Keep** |
| Weight | 25 | engine | draw odds, the main balance lever | **Keep** |
| Fallback | 5 | engine safety net | never used in 100,000 games | **Optional.** The safety net's other two tiers already cover it. Keep as insurance or drop. |
| Focus | 5 | engine (agents bonus) | marks agents cards | **Drop.** All five already require `flag agents_era`. The engine can give the bonus to any card that requires it. |
| Sets | 26 | engine | named flags | **Keep** |
| Agents | 39 | engine | hidden counter → agents era | **Keep** |
| Brake | 31 | engine | hidden counter → slowdowns | **Keep and make it signed** (A1). It can also bend the graph, so the proposed Choice Pace isn't needed. |
| Tipping point | 7 | engine | the catastrophe arc | **Keep** |
| Likelihood | 11 | engine | Event odds | **Keep** |
| Slot | 10 | engine | milestone alternatives | **Keep** |
| Counts as | 1 | engine | robots-late counts as robots | **Keep** (tiny, and conditions have no "or") |
| Slowdown | 3 | engine and checks | only one slowdown shown | **Keep.** It could be derived from Pace < 0.5, but explicit is clearer. |
| Pace / Gauge | 13 / 13 | engine | the graph | **Keep** |
| When (Future stories) | 2 | engine | the story fits the world | **Keep, and reuse it** for Event and Future versions (C1, C3, C6, C7, B8) |
| After humanity / Milestones | 6 / 1 | engine | the tipping arc | **Keep** |
| Path | 16 | review docs and style check | author-facing description | **Keep** (for Levi, not the game) |
| New in v5 / v5.1 / v5.2 / v5.3 | 48 / 9 / 9 / 3 | review docs only | marks new cards | **Collapse into one field** (`Added: v5.2`) **or drop.** They add 69 lines the game never reads. |

**Fields proposed for v5.4:**

| Proposed | Verdict |
|---|---|
| Choice **Pace** (major Choices bend the graph) | **Don't add.** A signed Brake covers it: \|Brake\| ≥ 1 on a bloc or world card bends the projection, with racing steepening it and braking flattening it. One field, two jobs. |
| Event **Role** (rescue, benefit or blind spot) | **Don't add as a field.** Nothing in the engine needs it. Make it the writing brief in `content/CLAUDE.md`, plus a line in the review docs. |
| Event **versions** | **Add, by reusing `When` exactly** (`### Story` with `**When:**`, as Futures have). Only where needed: outbreak, blight, heat, the near-miss Events. |
| **Assumes: growth** | **Don't add.** Use plain conditions (B1). Add a **worlds report** to `check-story.js` (each card's share of games after a plateau, pause or superintelligence, like this audit's table), so mismatches show as numbers on every run. |
| **Demands response** | **Add.** It changes which card comes next, and nothing existing does that. |

---

## F. Suggested order

1. **Signed Brake** (A1, A9), then milestone conditions on the brake balance (A3, A4), plus `sota-held` (A2). This one change fixes the most visible logic.
2. **Futures** C1, C2, C3, C6: high frequency, and the ending is what players remember.
3. **Cards** B1, B2, A5, A8, B3: conditions and small rewrites.
4. **Events** (B8) and the near-miss work, using the Event brief.
5. The low-severity wording (A6, B4, B6, B7, C9, D1).
6. Field cleanup (E): drop Focus, collapse the New-in markers, add the worlds report.

*Method:* every item read against its conditions. Simulations of 30,000 and 40,000 random games on the current content: world state at each card, Event and milestone; sequences; Future versus path; Because line usage. The scripts are in the session scratchpad, not the repo.
