# A Matter of Time: running notes

Decisions made but not yet built. Add to this before writing each update file.

## v3.2 (done; see v3.2-update.md)

- Futures renamed: Common Ground, Afterlife, Elsewhere, Gilded, Last Light. Kept: The Garden, Blackout, The Oracle, The Long Middle. Keep "The" only where it sounds right (The Merge, The Pause and so on) for all future names.
- All text rewritten in a NYT register with American spelling and no colons, semicolons or dashes. The check tool now lints for these.
- Future stories must stay grounded in the competition. Anyone without superhuman AI is at a disadvantage.
- Each Future story has its own image.

## v3.3 (done; see v3.3-update.md)

- Source links (major news, never Wikipedia) for every real past event or statistic.
- Logic pass on lead-ins, results and stories. Garden dancer story moved to Dakar. Thursday-group Oracle story grounded.
- Futures gained hard Requires rules so endings always match the Values. Oracle Control is slightly Adrift.
- Round accent colors, a chronological timeline strip, a zen pace and softer sounds.

## v3.4 (done; see v3.4-update.md)

- "Gilded" renamed **The Gilded Ones**. New card r3-worlds (AI history and fantasy game). Blackout story 1 rewritten with a clear causal chain.
- Sources upgraded to primary sources or major outlets where possible. Levi chose Wikipedia for the East India Company, the Standard Oil breakup and the 2023 AI risk statement, so Wikipedia links are allowed and check-story should no longer flag them. The 300 math problems still links to Ynet, since the event is too recent for a Wikipedia article.
- Strip marker tints (#eacc9d for scenarios, #85837f for events), a balanced final timeline, solid link underlines, replays that favor unseen cards.

## v3.5 (done; see v3.5-update.md)

- Futures must be grounded in the player's path (Grounded by), the reveal shows "How we got here" sentences, and the final rounds steer toward the nearest grounded Futures.
- State of the Art milestones: chips, AGI or steady progress, cheap intelligence, robots, and superintelligence or a plateau. Each is a card or a timeline point.
- Story endings revised (Kwame, Dev, Elif). The top strip scrolls away at the Future reveal.

## v4

- Generated images for every card (30 Scenarios + 5 Events + 9 Futures + card back). Same scale as v3.1.
- Prompt = Image description + blank line + Style guide (word for word). Generate offline at 9:16, round corners in CSS (1/32 of width).
- Now 31 Scenarios, 5 Events, 5 State of the Art cards (the 2 point milestones need no image) and 33 Future stories, plus the card back.
- **Rewrite image descriptions before generating:**
  - Not every image needs a person. The setting can be the subject when it has changed dramatically.
  - Always signal that a scene is in the future (a drone delivery, a windowless AI tower) when it otherwise might not be clear.
  - Scenarios are often documentary snapshots (a UN vote, a satellite view), with an artistic interpretation when the news is abstract (the fake election video).
  - Futures are always a snapshot of one moment in that story's day, grounded in the life described.

## v5

- **Engine change: "storylets".** Cards declare when they can appear (year range, required and excluded flags, Value conditions) instead of using hand-wired Next lists. Choices set flags.
- Bridges become conditional openers on each card ("Ten years after the drone ban…") instead of one per link.
- Grow to about **8 rounds, 2027–2050**, with roughly **60–70 cards** (about 10 Events).
- Tooling: the check script flags cards that can never appear and dead ends where nothing qualifies, plus a visual story map.
- Design the flags around the v6 Future list below.
- **Adaptive Events.** "Out of your hands" Events should be triggered by the state of the world (Values and past choices) instead of a flat 35% chance. For example, a market crash becomes likelier as Equality falls and Power rises, and the weapons talks only collapse if Unity is low or drones were built.
- **Every Value should move by 2070.** In v3.2, about 1.4 of the 6 Values end at exactly zero in an average game (Reality in about 40% of games), because 4 choices each move only 2–4 Values and some cancel out. Fixes:
  - **Era drift.** Each era nudges some Values on its own (for example, Power rises every decade whatever you choose, because the technology keeps advancing).
  - **More Events,** each moving Values.
  - **A check-tool rule** that reports the share of games ending with any Value at zero. The target is near 0% by v6.

## v6

- **10–12 rounds, 2027 to the 2070s**, about 15–20 minutes of play, roughly **130–160 cards** (25–35 per era).
- The scope narrows as you go: late rounds only offer cards for the Futures still in reach.
- **About 23 Futures.** Levi approved these names:
  - Splits of existing Futures: The Garden / **Still Life** (peaceful stagnation; nothing moves) / **Idle Hands** (purposelessness turns restless and destructive); The Oracle / **Faith**; The Last War (was Last Light) / **Embers Remain**; The Gilded Ones / **The Benefactors**; The Long Middle / **A Slow Slide**
  - New: **The Pause**, **Glass Houses** (state surveillance), **The Merge**, **Two Kinds**, **Cold Peace**, **Inheritance**, **A Second Chance**, **Overgrowth**
- Maybe revisit the Frontier (space) now that there are Merge and Inheritance endings.
- Also: a self-updating history timeline, and an end screen showing how other players chose.
