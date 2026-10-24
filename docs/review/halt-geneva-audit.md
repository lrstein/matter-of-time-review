# The halt, Geneva, and promises with an end condition (audit, built in v6.0)

Prompted by a game where the player chose **r2-assisted/C** ("Stop all training beyond today's systems until the world agrees on rules") in 2028. AGI then arrived two years late (2031), self-improvement came step by step (2036) and superintelligence was paced (2040). Nothing on the strip showed the rules being agreed or the halt ending, and both milestones cited the same 2028 halt. The next card, India's AI judges (2034), read as it would in a racing world.

Levi's decisions (October 21, 2026):

1. **The halt:** most places agree to pause or pace for now, and **the following card brings the player to Geneva soon after**, where the real decision is made.
2. **Citations follow the chain:** each milestone cites the most recent cause in the chain (halt → Geneva → step by step), and repeats only when nothing newer applies.
3. **Openers first:** cards after a big world-state decision acknowledge it in their opener before any Version work.
4. **Audit first:** this file is reviewed before anything is built.

---

## 1. Why this happens today

- r2-assisted/C sets `restraint` and Brake +2, **not** `pause`.
- `restraint` blocks `sota-agi` (2029), `sota-rsi` (2032), `sota-asi` (2035) and `sota-plateau` (2036). It doesn't make `sota-held` happen (that needs `pause` or `r4-selfimprove/C`).
- So the fallbacks in each slot land: `sota-agi-late` (2031, no condition), `sota-rsi-paced` (2036, needs only `not flag pause`) and `sota-asi-paced` (2040). A restraint world behaves exactly like a `paced` world, but with no Choice that paced it.
- `r5-moratorium` (the Geneva treaty, 2033, round 3) already has an opener for r2-assisted/C ("The talks on rules that began when the laboratories paused came to a head in Geneva…"). But nothing makes it the next card, so in round 3 it competes with every other card on the spine. In the game that prompted this, it lost to r4-courts.

## 2. Proposed build for the halt → Geneva

**2a. r2-assisted/C's "As a result" becomes explicitly temporary.** Draft (Writing rules apply at build time):

> Most of the large laboratories halt their biggest training runs while their governments negotiate, and the rest slow down. Talks on permanent rules open in Geneva. A few laboratories in countries that did not sign keep going. Investors pull money out of AI for the first time in a decade.

Sets: `restraint`, plus a new flag **`geneva_pending`** (the halt is waiting on Geneva).

**2b. Geneva is the very next card.** The engine already narrows the pool after an Event that **Demands response** (`engine.js:405`). Extend the same mechanism to Choices: a Choice with `**Demands response:** yes` narrows the next round's pool to the cards that answer it (whose openers or conditions name it). r5-moratorium already names r2-assisted/C in an opener, so it qualifies with no new matching logic. If it can't qualify, the pool falls back as it does for Events today.

**2c. "Soon after".** r5-moratorium is dated 2033, five years after the halt. Two ways to bring it closer (question Q1):

- **(A) A Version can carry its own Date.** A `### Version halt` (When: `flag geneva_pending`) dates the card 2030, with a lede reading "two years after the laboratories paused…". This is an engine and parser change, plus chronology checks in `check-story.js` (the Version's date must still sit inside the round's years, 2030–34).
- **(B) A new card, r3-geneva (2030)**, written only for this path (Appears when: `flag geneva_pending`), with the same three Choices as r5-moratorium. It's simpler to build, but it duplicates the treaty card, and r5-moratorium must then be excluded when r3-geneva was played.

**2d. What each Geneva Choice does to the world** (milestones re-wired to cite Geneva, not the halt):

| Geneva Choice | Sets | World after | Milestones |
|---|---|---|---|
| A. Sign, open every data center | `pause`, clears `geneva_pending` | held at the line | `sota-held` (2035); AGI is either never reached or late (Q2); Pressure cards later, as v5.9 |
| B. Sign with exemptions | `paced`, `exempt_medicine` + `exempt_defense`?, clears `geneva_pending` | paced | AGI two years late (2031) "because the treaty you signed in 2030 slowed…", then the step-by-step and paced milestones as today |
| C. Refuse | Brake −1, clears `restraint` and `geneva_pending` | racing resumes | AGI two years late (2031), cited to the collapse of Geneva; whether RSI and ASI then come on the racing dates or later (Q3) |

**2e. Because lines that must change:** `sota-agi-late` (r2-assisted/C line), `sota-rsi-paced` (r2-assisted/C line), `sota-steady` Ahead and `sota-agi-late` Ahead (both r2-assisted/C lines). Each gets an r5-moratorium/A, /B or /C line placed **above** the r2-assisted/C line, so the most recent cause wins.

**2f. The same hole in r4-selfimprove/C.** "Call for a worldwide pause on self-improving AI, and pause first" sets `restraint`, not `pause`. `sota-held` names it explicitly, so it holds, but only through a special case. Proposal: set `pause` on it too and drop the special case from `sota-held`, so `restraint` alone never means "held".

## 3. Citations follow the chain (engine rule + check)

- **Engine:** when picking a milestone's Because line (and the Ahead line), skip a line whose decision was already cited by the previous milestone shown on the strip, if another non-default line holds. If none does, repeat it rather than fall to the default.
- **How we got here** already prefers recent decisions. No change.
- **`check-story.js --audit`:** report, in `path-audit.md`, any sampled game where two consecutive milestones cite the same decision, so the content gaps behind it can be written.

## 4. Openers for big world-state decisions

Rounds 3 and 4 have 33 cards. Only 7 have an opener tied to the halt or a pause (`restraint`, `pause`, `r2-assisted/C`, `r4-selfimprove/C` or `pace is held`): r3-companions, r5-moratorium, r4-shutdown, r4-cancer, r5-launch, r4-letitrun and r4-twocities.

With Geneva as the very next card after the halt, round 3 is covered. Proposal: add a `flag restraint` or `pace is held` opener to the round 4 cards most often drawn in restraint and held worlds. I'd pick them by sampling 2,000 restraint games with `--audit` rather than writing all 26. Likely candidates: r4-firstperson, r4-water, r5-socialcredit, r5-sunshade, r4-dams, r4-subway, r4-asi, r4-plateau.

## 5. Other Choices that promise an end condition

Every Choice whose text says *until*, *for now*, *for N years*, *pause*, *halt*, *stop* or *freeze*:

| Choice | Promise | Is it kept or broken on the strip? |
|---|---|---|
| r2-assisted/C | stop until the world agrees on rules | **No** (this audit, §2) |
| r4-selfimprove/C | worldwide pause on self-improving AI | Held through a special case in `sota-held` (§2f) |
| r1-tutor/C | keep AI out of classrooms until children are older | Local, round 1. No follow-up needed? (Q5) |
| r7-longevity/C | ban it until its long-term effects are known | After humanity. Check that no Future story treats longevity as freely available after this Choice |
| r6-ownership/C | owners keep them five years, then everything is shared | The share would fall around 2051, before the 2060 Future. Check that no Future story says the owners still hold everything |
| r5-sunshade/C | a council that can stop it at any time | The council is never seen again. Fine unless a later card says the sunshade ran unchecked |
| r7-carbon/B | a council that can halt them | Same as above |
| r4-letitrun/A, r6-cap/A, r6-slowtreaty/A, r5-moratorium/A | stay in or sign the pause | Kept (`pause`, `sota-held`, v5.9 lifts on the strip) |

The world-state flags (`watched`, `enhanced`, `tends_life`, `exempt_*`, `lifted`, `relaunch`, `people_said_no`) were checked in v5.9 (`review/v5.9-pressure-audit.md`) and aren't repeated here.

## 6. Questions for Levi

- **Q1.** Bring Geneva closer with a **Version with its own date** (2c A, the cleaner content, needs an engine change) or a **new card r3-geneva** (2c B)? And which year: 2029 or 2030?
- **Q2.** If the player signs at Geneva (A) after the halt, does AGI arrive at all? Today a held world still gets "AGI, two years late" in 2031 unless the brakes are 3 or more. Options: no AGI (the line holds below it), or AGI late as now.
- **Q3.** If the player refuses at Geneva (C), does the race resume on the original dates (self-improvement 2032, superintelligence 2035), or do the lost years carry over (self-improvement 2034, superintelligence 2037, new milestones)?
- **Q4.** Exemptions at Geneva (B): should they set the v5.9 carve-out flags (`exempt_medicine`, `exempt_defense`), so that world can reach the defense-carve-out ending and The Long Middle carve-out story?
- **Q5.** Do round 1 and other local "until" promises (r1-tutor/C) need a follow-up, or is the rule only for world and bloc scale Choices?
- **Q6.** Should the "Choice demands a response" mechanism (2b) be available to other big Choices too (r4-selfimprove/C, r6-slowtreaty/A), or only the halt for now?

---

## 7. Levi's answers (October 21, 2026), as built in v6.0

- **Q1.** Geneva as **its own card, r3-geneva, in 2031** (not a dated Version, since its Choices must mean different things after a halt; not 2030, which under the 9-year rule would leave round 4 only its 2039 cards).
- **Q2.** Signing holds AI **below general intelligence** (no AGI milestone; "The pause holds" in 2035).
- **Q3.** Refusing carries the **lost years over**: AGI 2032, self-improvement 2035, superintelligence 2038.
- **Q4.** Exemptions set **both** `exempt_medicine` and `exempt_defense` ("Two fields opened", 2036).
- **Q5.** The rule applies to **world and bloc** promises only.
- **Q6.** Only the halt demands a response for now. A worldwide pause or slow-down treaty **must stick**, with pressure possible in the next rounds: r4-selfimprove/C sets `pause`, and a new check fails any climb past a pause without a lifting Choice on the strip.
- Citations **follow the chain** (the engine already picks the most recent cause; the gaps were content, now written), and repeats are reported by `check-story.js`. Openers: r3-geneva sets the `r5-moratorium/*` flags, so the existing treaty openers in rounds 4 to 6 apply to halt worlds.
