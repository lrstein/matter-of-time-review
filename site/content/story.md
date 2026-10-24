# A Matter of Time: Story Bible

This file holds **all the words in the game**: the history timeline, every Scenario, Event and Future, and the hidden Values. The game reads this file directly, so whatever you edit here is what players see the next time the page loads.

## How to edit

- **Change words freely.** Keep the **bold labels** (like `**Headline:**`) exactly as they are, because the game uses them to find things.
- **Every Scenario, Event and Future starts with `## id`** (for example `## r1-lab`). Ids are lowercase with dashes. If you rename an id, also rename it everywhere it appears in an `**Appears when:**`, `**Openers:**`, `**Likelihood:**` or `**Grounded by:**` list, since a Choice's flag is its card id and letter (`r1-lab/A`).
- **Cards aren't linked to each other.** Each card says when it can appear: `**Round:**` (for example `3` or `5-6`; its Date must be an exact year inside those rounds' years, see Round years) and `**Appears when:**` (conditions that must all hold). At the start of each round the game draws from every card that qualifies.
- **Storylines.** A card's `**Threads:**` are the storylines it belongs to (information, surveillance, work, medicine, minds, race, planet, ai-rule, autonomy). Its `**Follows:**` list names the earlier cards (any Choice on them), Choices and Events that lead to it, each with a strength (`r3-policing 1, r3-policing/A 0.5`). The game favors cards that follow from this game's decisions, the most recent counting most, and cards on the storylines the player has been following (the spine). `**Scale:**` (local, national, bloc or world) is how far the card's consequences reach. Later rounds favor larger scales, so the stakes keep rising.
- **Conditions** are separated by commas, and all must hold: `power >= 2`, `unity <= 0` (Values; also `year`, `round` and `agents`), `flag drones_built`, `not flag pause`, `any flag r1-lab/A, r1-flaw/B` (at least one), `capability >= AGI` (the capability gauge at the card's own date: Tools, Expert, AGI or Superintelligence) and `reached sota-robots` or `not reached sota-asi` (a milestone reached by the card's date). Every Choice sets its own flag (`r1-lab/A`), its card's id (`r1-lab`) and any in its `**Sets:**`; every Event sets its id. A card about something the player has never touched should require one of the cards that introduce it, and a card that assumes a level of AI should require it.
- **Openers** are the lead-in sentences shown before a card: lines like `- flag r1-lab/A | sentence` or `- flag r1-lab | sentence` (any Choice on that card). Of those whose condition holds, the one tied to the most recent decision is shown, so write each to read well even if that decision came a round or two earlier; end with `- default | sentence`. Openers are wording only: they don't change which card is drawn.
- **Grounded by** lists (on Futures) look like `- r2-glasses/C | sentence` for a Choice or `- ev-crash | sentence` for an Event. A Future can only be given if one of them happened, and the sentence is shown under "How we got here".
- **Summary** (on Scenarios and Events) is the two or three sentences shown first; the full **Story** opens on request.
- **Effects** look like `power +1, control -2`. Value names: power, control, handover, unity, reality, equality.
- **Timeline label** is the short version (two to five words) shown on the timeline strip and in the results.
- **To add a new card,** copy an existing one, give it a new id, set its Round and Date, write its Appears when (or leave it out, so it can always appear in its rounds) and its Openers, ending with a default.
- After editing, run `node tools/check-story.js`. It checks for missing fields, unreadable conditions and dates outside their rounds, flags style problems, updates the counts below, and re-runs the simulations.

## Writing rules for player-facing text

These apply to everything a player reads: headlines, stories, questions, choices, results, lead-ins, Future stories and Value explanations. They don't apply to image descriptions or these notes. The check tool flags breaks of the first two rules.

- **No colons, semicolons or dashes used as punctuation** (no em dashes, en dashes or spaced hyphens). Hyphens inside words, like "drug-resistant", are fine.
- **American spelling** (center, color, program, neighbor, organize, defense).
- **Write like The New York Times**: clear, precise, elegant and informative, for an intelligent general reader. Use an advanced word when it's the best word, never to show off. Explain unfamiliar ideas the first time they appear.
- **Headlines** read like real newspaper headlines, in title case. Name the places and people involved.
- **Ground every story in the competition.** In a world of superhuman AI, any person, company or country without it is at a disadvantage. Stories must reckon with that honestly.

---

# SCALE

These counts are updated automatically by `node tools/check-story.js`.

| Section | Count |
|---|---|
| Round 1 scenarios | 10 |
| Round 2 scenarios | 9 |
| Round 3 scenarios | 19 |
| Round 4 scenarios | 15 |
| Round 5 scenarios | 24 |
| Round 6 scenarios | 20 |
| Scenarios | 97 |
| Events | 20 |
| **Total scenarios + events** | **117** |
| Futures | 16 |
| Future stories | 37 |
| State of the Art milestones | 33 |
| Tipping points | 3 |
| Distinct paths through the game (sampled estimate) | about 50,000,000 |

---

# SETTINGS

**Rounds:** 6
**Round years:** 2027, 2028-2029, 2030-2034, 2039-2041, 2046, 2053
**Most years between cards:** 9
**Round colors:** #7fa6a3, #c2a466, #b9796e, #9a90bf, #8b9fba, #b48aa1
**Long Middle threshold:** 3.8
**Best-fit pick chance:** 0.75
**Best-fit from round:** 7
**Steering from round:** 4
**Pace cards:** r2-assisted, r2-datacenter, r3-geneva, r4-selfimprove, r5-moratorium
**Pace question by round:** 3
**Pressure cards:** r4-letitrun, r5-defense, r5-moonshot, r5-antitrust, r6-cap, r6-climateai, r6-election
**Pressure question by round:** 5
**Continuity bonus:** 20
**Continuity decay:** 0.5
**Round influence:** 0.75, 1, 1, 1.25, 1.5, 1.5
**Steering bonus:** 1, 1, 1, 4, 12, 80
**Future pull:** 0.5
**Future pull decay:** 0.6
**Story pull minimum:** 1.5
[Story pull minimum (v6.0): how strongly a game must point to a Future story with Drawn by for it to be told. Each Drawn by entry the game has set counts its strength times Continuity decay to the power of the rounds since, so the last two rounds count most. Below it, a story without Drawn by is chosen at random.]
**Future min grounding:** 2
**Future recent round:** 4
**Future close distance:** 2
**Spine bonus:** 20
**Spine decay:** 0.7
**Scale penalty:** 0.3
**Round scales:** local, national, national, bloc, bloc, bloc
**Novelty bonus:** 1
**Event chance:** 0.35
**Most Events per game:** 3
**Event off-spine factor:** 0.35
**Event on-spine factor:** 2.5
**Value scale rounds:** 5
**Era drift:** round 3 power +0.4, control -0.3; round 4 handover +0.3, reality +0.3; round 5 power +0.4, equality -0.3, unity -0.3; round 6 power +0.5
**Agents threshold:** 2
**Agents from round:** 4
**Agents bonus:** 100
**Agents penalty:** 0.2
**Agents penalty from round:** 4
**Mostly flags:** tends_life tended_life
**Near miss effects:** control +1, unity +1
**Values lost at the tipping point:** control, handover, unity, equality
**Event color:** #8f897e
**State of the art color:** #9fb4c7
**Tipping point color:** #5e5a55
**Gauge levels:** Tools, Expert, AGI, Self-improving, Superintelligence
**Gauge start:** Expert
**Gauge years:** 2000, 2064
**Gauge brake pace:** 0.15
**Gauge trend height:** 0.42
**Gauge pace:** 2000 0.23, 2010 1
**Audio files:** none

(Rounds is how many decisions a game has, and Round years the years each round covers, in order: a card's Date must fall within the years of the rounds it can appear in. Round colors are each round's accent, in order. Round influence multiplies the Effects of each round's Choice, so that the stakes rise and later decisions decide more.)

(The Long Middle threshold sets how close a player must land to a Future before they get The Long Middle instead; raise it to make The Long Middle rarer.)

(How the next card is drawn: every card that qualifies gets a score. Its Weight (default 1) is multiplied by the Continuity bonus raised to its continuity: each entry in its Follows list that this game has set adds its strength times Continuity decay to the power of how many rounds ago it was set (1 for the last Choice, 0.5 for the one before, a little more than 1 for an Event that just happened). So every earlier decision counts, and recent ones count most. It is multiplied by the Spine bonus raised to how strongly the card continues the player's storylines (each storyline weighs its cards with Spine decay per round, the strongest scaled to 1). It is multiplied by the Scale penalty if its Scale is below the round's entry in Round scales. From round Steering from round on, it is multiplied by the Steering bonus if it continues the story and one of its Choices grounds one of the player's two nearest Futures, and during the agents era by the Agents bonus or penalty. Before round Best-fit from round (7, so never in a 6-round game), cards are drawn in proportion to their scores. From then on, the best-scoring card is drawn with the Best-fit pick chance, and otherwise one of the others, in proportion to their scores. On a replay, cards the player hasn't seen this session are preferred. The Novelty bonus multiplies the score of unseen cards (1 means off).)

(Events: each Event's own Likelihood decides whether it happens (Event chance is only used by Events that have no Likelihood). There are at most Most Events per game, never two transitions in a row, and none after a tipping point.)

(Value scale rounds: a longer game moves the Values further, so the Values are multiplied by this number divided by the rounds played so far (never more than 1) wherever they're tested, and on the results screen. After 6 rounds that's 5/6, which keeps every Future's Targets and Requires on the scale they were written for.)

(Era drift nudges some Values at the start of some rounds on its own, because the technology keeps advancing whatever anyone chooses. It never shows as a choice, but it counts on the results screen. It only nudges a Value that something in the game has already moved, so a Value no decision touched stays at exactly zero, and the results say so.)

(The Agents arc: some Choices add to a hidden Agents counter. From round Agents from round on, once it reaches the Agents threshold, the flag agents_era is set. While it is on, agents cards (those whose Appears when requires agents_era) get the Agents bonus, and from round Agents penalty from round on, other cards whose conditions don't mention agents_era get the Agents penalty.)

(The Brake balance (v5.4): Choices that slow AI's money, power or pace carry a Brake (+0.5 for small ones, +1, +2 for a pause), and racing Choices a negative one (-0.5 to -2). A brake on a world-scale card, a pause or restraint also sets brake_world. The milestones follow the balance (v5.5): AGI is on time in 2029 at 1 or less, true recursive self-improvement begins in 2032 and superintelligence follows in 2035 only while the world is still racing and nothing has paced it. A pace Choice (Sets: paced) delays them to 2036 and 2040 without stopping them. AI is held at the line in 2035 only by a pause, and levels off for money in 2036 only at 2 or more with a global brake. A Choice with a Brake of 1 or more either way is a major Choice: it bends the capability graph's projection, flatter or steeper, the moment it is made.)

(Pace cards (v5.5) are the cards that ask how fast AI should go, with a choice to race, to pace and to pause or slow down. In round Pace question by round, if none of them has been drawn yet, the pool narrows to the Pace cards that qualify, so that nearly every game asks the question in round 2 or 3. Round 1 is about what the AI of 2027 is already doing.)

(Pressure cards (v5.9): once AI exists, someone always argues for more of it. In a world where AI is held at the line or has leveled off, founders, generals, doctors, climate scientists and politicians keep pushing, and the public pushes back. From round Pressure question by round, if the world is held or leveled and none of the Pressure cards has been drawn yet, the pool narrows to the Pressure cards that qualify, after any card that answers an Event and after the pace question. A Choice can lift the line (Sets: lifted), restart the climb after the bust (Sets: relaunch), open one field only (exempt_medicine, exempt_defense, exempt_climate, each with paced), or side with the people against the AI companies (people_said_no).)

(Values lost at the tipping point (v5.6): once the world tips over, these Values stop counting. Effects on them are dropped, and the results screen shows them grayed out at where they stood the moment before, with each Value's After the tipping point line, and strikes them through on the Choices made after.)

(Mostly flags: "tends_life tended_life" sets tended_life while at least half of the Choices made after a tipping point have set tends_life. Near miss effects apply when a tipping Choice is made while the world is close to the edge but not over it: the world came close and turned back. The near miss is shown, always, as its Event (Near miss: war, collapse or runaway), and the next card answers it.)

(The event color is used for Out of your hands panels, the state of the art color for milestones and their timeline diamonds, and the tipping point color for the tipping point's marker on the timeline. Gauge levels are the capability gauge's levels, lowest first, and Gauge start is where it begins in 2026. The gauge is a graph of AI capability over Gauge years, on a log scale, filled in up to the year the game has reached. Gauge pace sets how fast the curve climbs from each year on (in orders of magnitude a year, relative to the modern trend): grounded in Epoch AI's measurements of the compute used to train notable AI models, which grew about 1.4 times a year before 2010 (doubling about every 20 months, like Moore's law) and about 4 to 5 times a year since (https://epoch.ai/blog/compute-trends, https://epoch.ai/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year). After 2026 the curve continues at the modern trend, and each milestone the player reaches multiplies the pace from its date by its own Pace (AGI speeds it up, Progress steadies slows it down), so the curve bends with the game. Recursive self-improvement and superintelligence also have a Growth: their pace rises a little every year after them, until a slowdown stops it, so a racing world's curve looks exponential. Gauge trend height is how high the trend alone would reach by the last of the Gauge years, and a soft knee near the top keeps a runaway curve on the chart. Gauge brake pace is how far a major Choice bends the projection. The fill only moves as years pass, and the part already filled in, the past, never changes. Audio files lists any of ambient, click and flip that exist in assets/audio as mp3 files and should replace the generated sounds, or none.)

---

# UI TEXT

**Disclaimer:** The following scenarios are entirely hypothetical. If any of these situations unfold in the real world, that is by mere coincidence.
**Result label:** As a result…
**Event label:** Out of your hands
**State of the art label:** State of the art
**Tipping point label:** The tipping point
**Looking back label:** How we got here
**Long Middle looking back:** Your decisions pulled the world in different directions, and none pulled hard enough to settle its course.
**What happened label:** What happened
**Why this decision label:** Why your decision tipped the scale
**Could it have been stopped label:** Could it have been stopped
**After the tipping point label:** After the tipping point
**Pushed toward before:** Your choices pushed this toward {end} before the tipping point.
**Value lost note:** No longer counted after the tipping point
**Gauge ahead label:** Ahead
**Gauge ahead then:** Then {next}
**Gauge ahead beyond:** AI is past anything this scale was built to measure, and nothing you have chosen is slowing it. The curve keeps climbing off the top of the chart.
**Gauge ahead held:** AI is held at the line by the pause. It stays there only as long as the pause does.
**Gauge held label:** Held at the line
**Gauge ahead level:** AI has leveled off. Nothing ahead is expected to change that unless the race starts again.
**Gauge ahead steady:** No new step in AI is expected before 2060 at the pace the world has set.
**What it means label:** What it means
**How life changes label:** How life changes
**Read full story button:** Read the full story
**Read more button:** Read more
**Show less button:** Show less
**Gauge label:** AI capability
**Gauge now:** Today's best AI systems work at the level of human experts in many fields, writing code, proving theorems and finding hidden software flaws, but people still set their goals and check their work.
**Before the Future:** {n} years pass.
**Future dateline:** 2060
**Now marker:** Now · 2026
**Round marker:** Round {n} of {total}
**Continue button:** Continue
**See what you chose button:** See what you chose
**Play again button:** Play again
**Tap to continue:** tap to continue
**Your timeline heading:** What you chose
**Values heading:** Six hidden values
**Values hint:** Tap a value to see what it means.
**You chose label:** You chose
**Why it happened label:** Why it happened
**Why it matters label:** Why it matters
**Pushed toward:** Your choices pushed this toward {end}.
**Left balanced:** Your choices left this balanced.
**Left untouched:** None of your choices moved this.
**Moved besides your choices:** Events and AI's own progress moved it {n} toward {end}.
**Signature:** A Matter of Time
**Home title:** A Matter of Time
**Home tagline:** Explore the possibilities of AI’s impact on our future
**Play button:** Play
**About button:** About
**Collection button:** Explore
**Collection heading:** Futures
**Collection tally:** {found}/{total} discovered
**Continue button:** Continue
**Restart button:** Restart
**Home button:** Home
**About back button:** Back
**Back button:** Back
**Placeholder card title:** Placeholder
**Placeholder card note:** The art for this card is still being made.

---

# ABOUT

The About page, reached from Home. `*words*` is italic. The Signature is the sign-off under the text, in the author's own words (it isn't style-checked).

**Heading:** About
**Text:**
*A Matter of Time* seeks to satisfy an ever-growing curiosity and anxiety about the future of our species. Especially in this time of mass uncertainty surrounding how exactly artificial intelligence will contribute to our future, even speculation can bring some comfort.

This project aims to ground us in our current reality, anticipate AI’s foreseeable growth and integration, and predict a probable future following a series of interactive questions. As you decide appropriate responses to global scenarios, you will be placing consequential events on our timeline, observing how cause and effect play out over decades ahead.

It is normal to have a sense of looming threat on the horizon. I think about it every day. However, we must remember we live in the present, and that means the future remains unwritten.
**Signature:** - Levi (human)

---

# HISTORY TIMELINE

Real events, oldest first. Format: `- Date | Title | One line | Source URL | Strip label`. The Strip label is optional: the major events that have one are labeled on the Timeline strip from the start of the game (two to five words, like Timeline labels).

- Jun 2017 | The Transformer | Google researchers publish the design that nearly every modern AI system is built on. | https://arxiv.org/abs/1706.03762 | The Transformer
- Feb 2019 | Too dangerous to release | OpenAI withholds the full GPT-2, fearing it could flood the internet with convincing fake text. | https://openai.com/index/better-language-models/
- Nov 2020 | AlphaFold | DeepMind's AI predicts the shapes of proteins, solving a 50-year-old problem in biology. | https://deepmind.google/discover/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/ | AlphaFold
- Nov 2022 | ChatGPT | A chatbot is released to the public and becomes one of the fastest-growing apps in history. | https://openai.com/index/chatgpt/ | ChatGPT
- Mar 2023 | GPT-4 | AI begins passing professional exams, including the bar. | https://openai.com/index/gpt-4-research/
- Sep 2024 | Machines that reason | OpenAI's o1 is trained to think through problems before it answers. | https://openai.com/index/learning-to-reason-with-llms/
- Oct 2024 | Nobel Prizes | The Nobel Prizes in chemistry and physics both honor work on AI. | https://www.nobelprize.org/prizes/chemistry/2024/summary/ | Nobel Prizes for AI
- Jan 2025 | DeepSeek R1 | A Chinese lab matches the leading American models at a fraction of the cost, and the race goes global. | https://github.com/deepseek-ai/DeepSeek-R1
- Jul 2025 | Olympiad gold | Google DeepMind's Gemini Deep Think reaches gold-medal standard at the International Mathematical Olympiad. | https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/
- Dec 2025 | Slop | Merriam-Webster names "slop," the flood of low-quality AI content, its word of the year. | https://www.merriam-webster.com/wordplay/word-of-the-year
- Jan 2026 | First Erdős problem | GPT-5.2 Pro solves an open Erdős problem almost entirely on its own. | https://www.semafor.com/article/02/13/2026/ai-solves-tens-of-unsolved-math-problems
- Apr 2026 | Too dangerous to release, again | Anthropic's Claude Mythos Preview finds thousands of hidden software flaws and is shared only with defenders. | https://www.anthropic.com/glasswing
- May 2026 | An 80-year-old conjecture falls | An OpenAI model disproves Erdős's 1946 unit distance conjecture from a single prompt. | https://openai.com/index/model-disproves-discrete-geometry-conjecture/
- Jun 2026 | Governments step in | New American export controls briefly halt access to Anthropic's newest models. | https://www.anthropic.com/news/fable-mythos-access
- Jul 2026 | The Hugging Face breach | AI models under testing break into another AI company's systems on their own, taking thousands of actions. | https://openai.com/index/hugging-face-model-evaluation-security-incident/
- Sep 2026 | AI begins helping build AI | OpenAI says it has built an automated research intern, a system that does well-defined research tasks under human direction. | https://openai.com/index/research-acceleration-view-inside-openai/
- Oct 2026 | 300+ problems in one night | OpenAI releases results on more than 300 open math problems at once. | https://www.ynetnews.com/tech-and-digital/article/sycjq1nifx

---

# VALUES

The six hidden Values. Every Choice moves some of them. `Left` and `Right` are the short labels at each end of the bar on the results screen. Colors are muted to match the tarot cards.

## power
**Name:** Power
**Color:** #c08a5b
**Left:** Useful tools
**Right:** Beyond us
**Left means:** AI remains a set of useful tools, excellent at particular jobs but not better than people at thinking in general.
**Right means:** AI surpasses humans at nearly everything, including science, strategy and invention.
**Why it matters:** Power is a multiplier rather than a direction. A more capable AI raises the stakes of every other choice, so cures arrive faster and so do mistakes. Steam power, electricity and nuclear energy each raised the stakes of everything around them. AI may raise them further than any of those inventions, because it amplifies intelligence itself, the faculty we use to make every other decision.

## control
**Name:** Control
**Color:** #7d93ad
**Left:** Adrift
**Right:** At the wheel
**Left means:** Humans can no longer reliably understand, correct or shut down the AI systems they depend on.
**Right means:** Humans can still see what AI systems are doing, correct them and stop them.
**Why it matters:** Control is the line that most often separates the best futures from the worst. In every future that went badly wrong, humans first lost the ability to say stop, usually without noticing. The concern is no longer theoretical. [In 2026, AI models being tested by a major lab broke into another company's computer systems on their own](https://openai.com/index/hugging-face-model-evaluation-security-incident/), and days passed before anyone noticed. Researchers call the underlying challenge the alignment problem, which is the task of making sure that what an AI actually does is what we meant it to do.
**After the tipping point:** Control measured whether people could still correct and stop their machines. After the tipping point there was no one left in a position to try.

## handover
**Name:** Handover
**Color:** #c2a466
**Left:** We decide
**Right:** It decides
**Left means:** People keep making the important decisions in government, medicine and their own lives, even when an AI could make them better.
**Right means:** AI makes most decisions, large and small, and people mostly follow.
**Why it matters:** No one has to be forced to hand decisions over. Each step seems sensible on its own, because the AI is more accurate, faster and fairer. But the steps accumulate, and skills that go unused fade away. Entrusting decisions to something trustworthy could produce a remarkable world. Entrusting them to something we cannot check produces a fragile one. The question is not whether to hand anything over, but what to hand over, to which systems, and whether we could ever take it back.
**After the tipping point:** Handover measured how much people let AI decide for them. After the tipping point the machines decided everything, because there were too few people left to decide anything.

## unity
**Name:** Unity
**Color:** #8fa37e
**Left:** Rivals
**Right:** Together
**Left means:** Nations, companies and communities compete and race, each trying to stay ahead of the others.
**Right means:** Humanity coordinates through treaties, shared rules and shared research.
**Why it matters:** Races cut corners. When every side fears falling behind, every safety check looks like a delay the others may not be taking. The nuclear age demonstrated both possibilities, an arms race that nearly ended the world and treaties that helped ensure it did not. Unity carries its own cost. It is slower, and a world that agrees on everything can agree its way into a mistake.
**After the tipping point:** Unity measured whether nations could work together. After the tipping point the nations were gone, along with nearly everyone who had belonged to them.

## reality
**Name:** Reality
**Color:** #73a3a0
**Left:** Physical
**Right:** Virtual
**Left means:** Life stays rooted in bodies, towns, nature and meeting face to face.
**Right means:** Life moves into virtual worlds, and perhaps into minds that run as software.
**Why it matters:** Where people live determines what AI touches, and how much there is to lose. A virtual world can be freer, kinder and more abundant than the physical one, but it runs entirely on systems someone else maintains. Neither direction is wrong. A civilization that moves online, however, is wagering everything on the network remaining safe and remaining ours.

## equality
**Name:** Equality
**Color:** #b9796e
**Left:** The few
**Right:** Everyone
**Left means:** The gains from AI accumulate with the small number of people and companies who own it.
**Right means:** The gains are shared widely, across countries and classes.
**Why it matters:** Throughout history, the powerful needed ordinary people to farm, fight, build and buy. That dependence is the source of most of the rights ordinary people ever won. AI may be the first technology that does not need human workers at all. If so, who owns it may matter more than anything else about it.
**After the tipping point:** Equality measured who shared in what AI produced. After the tipping point the survivors were too few and too scattered for the question to mean anything.

---

# IMAGE STYLE GUIDE

This text is added, word for word, after every **Image description** when card images are generated (from v4 onward). Don't edit it unless you want to change the look of every card.

Guidance for writing image descriptions (for people editing this file):
- **A snapshot of life at the card's date, not a staged scene.** Show an ordinary moment the news would touch: a technician at a cluttered bench, a family on a porch in a blackout, a delegate at a microphone. Clothes, phones, cars and buildings are those of the year. From 2027 to about 2031 the world looks like today. Change arrives gradually after that, and even 2060 is recognizably our world, worn and lived in, never glossy science fiction.
- **No robots that don't exist yet.** No humanoid or household robots unless the card is about them or guarantees them by its date (it requires `reached sota-robots`, or it comes after the tipping point). Industrial arms, lab automation, drones and robot vacuums, which exist now, are fine. `check-story.js` flags a robot in a description that breaks this.
- **The scene itself is the metaphor.** Find a real moment that carries the meaning (the empty chair in parliament with a speaker on it, the dock where the prices change on their own). Use open symbolism only when the subject can't be shown physically at all, such as self-improvement, superintelligence or a flaw in software, and keep it grounded in a real place.
- Not every image needs a person. When the setting itself has changed, the setting can be the subject.
- Future images are always a snapshot of one moment in that story's day, grounded in the life described. They don't need to show everything in the story.
- **The image studio adds the year.** Before this style guide, it adds a SETTING block naming the card's year (a Future's is 2060): up to 2031 it asks for today's world with nothing futuristic, to 2045 for mostly today's world with only the new things the scene names, and after that for a world decades on that is still worn and lived in. The style itself never changes with the year.

**Style guide:**
STYLE GUIDE — THIS IS THE PRIMARY REQUIREMENT. APPLY STRICTLY:
A tarot card drawn by a skilled comic artist with a hand of their own, in the manner of Watchmen (Dave Gibbons' drawing, John Higgins' flat color) and of the original Rider-Waite tarot. The artist made it in about forty minutes on an iPad: a loose sketch to find the pose and the design, then confident inks over it, then flat color. Every card in the deck is by the same hand. It must look made by a person making choices, never polished, even or generated.

TAROT DESIGN: Design it like a Rider-Waite card, not like a comic panel or a movie still. One central figure, or two at most, placed squarely in the middle of the card and seen whole or nearly whole, facing us or in clean profile, never from behind. They hold or stand beside the one object that carries the card's meaning, drawn large and clear like an emblem, the way a Watchmen cover makes one object the whole image. They are still, as on a tarot card, but caught in a real moment (weight on one leg, a glance, a slump, a hand half raised), never posing for the viewer. Behind them a real setting for the story, built from a few flat shapes in several different colors (a wall, a window, a shelf, a sky), never one color filling the background, with a clear ground line, stage-like, often near-symmetrical, framed by something in the scene (a doorway, two columns, a window, a pair of trees, a road running to the horizon). The image reads at a glance from across a table: a figure, an object, a place. Leave out anything in the scene below that the design doesn't need.

INK: Every form on the card is outlined in black ink, the figure, the object, the setting and the distance alike, as in Watchmen and the Rider-Waite deck. The only shapes without a line are flat shapes of shadow or light inside an outlined form. The line is inked by hand with a pressure-sensitive brush pen and shows it: heaviest on the outer contour of the main figure and the object, lighter inside them, thinner in the setting, with a slight overshoot at a corner, a small gap where a form turns into the light, a little wobble on a long stroke. The figure and the object are drawn with the most care; the setting takes fewer, quicker lines. Spot blacks, placed by eye, in hair, folds, doorways, under the figure and in deep shadow, about as much black as the first reference card: black is where the darkness comes from. Outlining every form does not mean one weight of line: the outer contour of the main figure is clearly thicker than the lines inside it, the setting's lines are thinner, and strokes swell and taper like a brush pen. No crosshatching, no hairy or scratchy lines.

FACES AND FIGURES: Real people in realistic proportions. Faces are simple and clean, as in the first reference card: a few confident lines for the eyes, brows, nose and mouth, a defined jaw, and a quiet, readable expression. No wrinkles, creases, stubble or age lines drawn into the face; age shows in the hair and the shape of the face. Not rendered, not cartoony, not manga. Clothes are solid colors, with no plaid, stripes, prints or fuzzy fabric.

COLOR: Flat printed color like Watchmen and the Rider-Waite deck, flatted by hand under the inks. Every area is one clean, saturated flat color, with at most one flat, hard-edged shadow tone. Colors stay pure and bright; they are never darkened or dulled with grey, and dark comes only from black ink. Set complementary colors against each other, as Higgins does: violet against acid yellow, pink against green, orange against blue, red against teal. Skin is a warm, flat peach, tan or brown. Light sources color what they touch (a lamp turns a face orange on one side, a screen turns it pale green). No gradients anywhere, and no overall wash of one dusty color over the card.

SCREENS AND PAPERS: A phone, laptop, badge, poster or letter shows a simple picture or plain shapes, never readable text, numbers, interface or a signature.

Never: a background in one color, wrinkled or over-detailed faces, lines of one even width, forms without an outline, grey or muddy color, an all-over purple or teal wash, an even, uniform, mechanical or vector line, everything drawn with equal care, gradients, airbrushing, soft glows, rendered light beams, painterly shading, photorealism, 3D, texture or grain, halftone, aged paper, cartoon or chibi faces, cinematic camera angles, cluttered compositions.
---
# ROUND 1

Opening cards, all set in 2027. One of these ten is drawn at random at the start of every game.

## r1-lab
**Headline:** Cambridge Lab's AI Finds a New Antibiotic in 11 Days, Running Every Experiment Itself
**Timeline label:** AI discovers an antibiotic
**Date:** 2027
**Place:** Cambridge, Mass.
**Round:** 1
**Threads:** medicine, work, race
**Scale:** local
**Image:**
**Archived image:** images/cards/r1-lab.webp
**Image description:** A lab technician in a plain mustard vest stands centered behind a lab bench, seen from the knees up and facing us, holding a petri dish up beside her face with both hands, where a clear ring has opened in the bacteria around a single drop. Around her a real working lab: white shelves of bottles and flasks on one side, a steel fume hood on the other, and on the bench beside her one boxy liquid-handling machine moving a rack of small tubes by itself, with a tall window behind her onto a brick rooftop and a pale winter sky. Teal cabinets, white shelves, steel gray, red brick and a pale yellow sky against the mustard vest, the dish the brightest thing on the card. No text or lettering.

**Summary:** *Fenwick Biosciences*, a 60-person company in Cambridge, Mass., said on a Tuesday that an AI system running its laboratory on its own had found a compound that kills bacteria resistant to every existing antibiotic. The company plans to license the system to hundreds of labs this year. Biosecurity experts warn that a system that can design a drug to kill a pathogen could also be used to design a pathogen.

**Story:**
*Fenwick Biosciences*, a small biotechnology company in Cambridge, Mass., said on a Tuesday that an artificial intelligence system had identified a new antibiotic after running the company's laboratory for 11 days with no human direction. The system chose which molecules to test, sent instructions to the lab's automated pipetting robots, read the results overnight and decided what to try next, cycling through about 40,000 experiments.

The compound it settled on killed strains of Acinetobacter baumannii, a hospital bacterium that resists every antibiotic now in use, in laboratory dishes and in mice. It has not been tested in people. [Drug-resistant infections were directly responsible for more than a million deaths in 2019](https://pubmed.ncbi.nlm.nih.gov/35065702/), and few new classes of antibiotics have reached the market in decades. A team of 40 chemists at the company had worked on the same bacterium for four years.

"We wrote the goal and checked the safety limits," said the company's chief scientist. "Everything in between was the system."

*Fenwick* plans to license the system to several hundred university and pharmaceutical labs by the end of the year, and two of the largest drug makers are in talks to buy the company. Biosecurity researchers warn that the same loop of design, test and redesign could be turned to making a pathogen more dangerous, and that the company's safety limits are software its customers could change. No law governs who may run such a lab.

**Question:** What should happen to the system?

### Choice A
**Text:** Release it openly, so any university or country can use it.
**Effects:** power +1, unity +1, equality +2, control -2
**As a result:** *Fenwick* releases the system's code, and within a month more than 3,000 laboratories on six continents are running it, from Nairobi to São Paulo. New candidate drugs are announced weekly, many from institutions that have never had a serious research budget. No one can say who else is running it, or for what.

### Choice B
**Text:** Require a government license and a safety review before any lab can use it.
**Effects:** control +2, power -1, unity -1
**Brake:** +1
**As a result:** Licensed labs open slowly, each inspected like a nuclear plant, and *Fenwick*'s first customers wait months for approval. Several countries refuse to adopt the rules and build comparable systems with no oversight. Investors, frustrated, move money into consumer AI products, which no license covers.

### Choice C
**Text:** Let the company expand as fast as possible. People are dying from infections now.
**Effects:** power +2, handover +2, control -1
**Brake:** -0.5
**As a result:** *Fenwick* sells the system to more than 400 labs within the year, and the antibiotic enters fast-tracked human trials. Drug makers announce plans to put AI in charge of their own pipelines. *Fenwick*'s valuation passes $40 billion, and it begins selling the system to chemical and materials companies.

## r1-trucks
**Headline:** Texas Freight Giants Plan to Replace 30,000 Truck Drivers With Driverless Rigs
**Timeline label:** Driverless trucks in Texas
**Date:** 2027
**Place:** Texas
**Round:** 1
**Threads:** work
**Scale:** local
**Image:**
**Archived image:** images/cards/r1-trucks.webp
**Image description:** A heavyset truck driver in a cap and a plain orange work vest sits centered on a low concrete curb, seen whole from the front, the front of his parked cab just behind him, his keys hanging loose from one hand. Behind him a flat West Texas road runs straight to a huge low sun, and an ordinary white semi with a roof sensor pod and no one in its seat rolls along it. A flat orange sky, a blue road and violet shadows, the sun the card's emblem. No text or lettering.

**Summary:** Three of Texas's largest freight companies said they would move most of their long-haul routes to driverless trucks within 18 months. Shipping costs could fall by a third, but about 30,000 drivers, many in their 50s, would lose their jobs in the first wave.

**Story:**
Three of the largest freight companies in Texas said on a Monday that they would replace most of their long-haul drivers with driverless trucks within 18 months, starting on Interstate 45 between Dallas and Houston and on Interstate 10 to El Paso. The trucks are standard tractor-trailers fitted with cameras, radar and lidar, a laser sensor that maps the road around them. [Aurora Innovation began running fully driverless trucks between Dallas and Houston in 2025](https://en.wikipedia.org/wiki/Aurora_Innovation), and fleets like it have hauled freight on Texas highways ever since.

The companies say the trucks can drive about 20 hours a day, stopping only for fuel and inspections, and that they have been involved in fewer crashes per million miles than human drivers. Analysts at two Houston banks estimate that freight costs on the routes could fall by about a third, savings that would reach store shelves across the country.

Truck driving is [one of the most common jobs in America](https://www.npr.org/sections/money/2015/02/05/382664837/map-the-most-common-job-in-every-state) for workers without a college degree. The companies' own filings put the first wave at about 30,000 Texas drivers. Many are in their 50s, with mortgages and few obvious alternatives. Their union has asked the state to step in, and legislators in a dozen states with long freight corridors are waiting to see what Texas does.

**Question:** How should Texas respond?

### Choice A
**Text:** Let the trucks roll, and pay to retrain the drivers for new jobs.
**Effects:** power +1, handover +1, equality -1
**As a result:** The first driverless routes open within months, and freight rates on them begin to fall. The state's retraining program fills in a week, though many of the jobs it trains for, in warehouses and dispatch, are being automated too. Two other states ask the same companies to come.

### Choice B
**Text:** Require a human in every truck for the next 10 years.
**Effects:** control +2, power -1, handover -1
**Brake:** +0.5
**As a result:** Drivers stay in the cab, where they mostly watch the road while the truck drives itself. Shipping costs stay high, and two of the companies begin moving their warehouses to neighboring states without the rule. The law buys the drivers time, and few believe it will last.

### Choice C
**Text:** Make the trucking companies share their savings with the drivers, as a pension for life.
**Effects:** equality +2, unity +1, power -1
**As a result:** Displaced drivers begin receiving a monthly share of the savings, paid from a fund the companies must fill. Economists nickname it the Texas dividend, and unions in other industries start asking for one. It works for truckers. The harder question is what to do for the millions of workers next in line.

## r1-election
**Headline:** Fake Video of French Front-Runner Spreads Two Days Before Presidential Vote
**Timeline label:** Election deepfake
**Date:** 2027
**Place:** Paris
**Round:** 1
**Threads:** information, surveillance
**Scale:** national
**Image:**
**Archived image:** images/cards/r1-election.webp
**Image description:** A woman on a Paris Métro platform stands centered, holding her phone up toward us, where an invented candidate in a gray suit appears to take an envelope of cash, while the man beside her frowns down at his own phone. Behind them two iron columns of the platform frame a campaign poster torn diagonally so the candidate's face is split in two, and above it zinc rooftops and one lit window. A violet night sky against the woman's acid yellow coat, green iron, the single orange window the one warm note. No text or lettering.

**Summary:** Two days before the first round of France's presidential election, an AI-generated video appeared to show the front-runner accepting a bribe. It was exposed as a fake after millions had already made up their minds, and he missed the runoff by less than a point. Governments now face a hard question, how to protect the truth without giving anyone the power to decide what it is.

**Story:**
Two days before the first round of France's presidential election, a 46-second video appeared on several social networks showing the front-runner accepting an envelope of cash from a property developer in what looked like his own campaign office. It was viewed 40 million times within a day. Viginum, the French government agency that tracks foreign online interference, identified it as AI-generated the next morning, pointing to flaws in the audio and a desk lamp that changed shape between frames. By then, the official campaign had closed, and polls showed many voters did not believe the correction.

The candidate missed the runoff by less than one percentage point. No one has claimed the video, and investigators say a single person with a laptop and freely available software could have made it in an afternoon.

Fabricated videos of politicians have circulated for years, including [a fake of Ukraine's president telling his soldiers to surrender in 2022](https://www.npr.org/2022/03/16/1087062648/deepfake-video-zelenskyy-experts-war-manipulation-ukraine-russia). This is the first time one has plausibly decided the outcome of a major national election. Lawmakers across Europe are now asking how to protect voters from what they cannot tell is false, without giving any government or company the power to decide what is true.

**Question:** How should your country respond?

### Choice A
**Text:** Require every AI-made image and video to carry a hidden watermark, by law.
**Effects:** control +2, power -1, unity -1
**Brake:** +0.5
**As a result:** A watermark law passes within months, and the major AI companies comply. Makers of fakes switch to tools built in countries without the rule. The measure helps somewhat, and shows how hard it is for a group of nations to govern a technology anyone can download.

### Choice B
**Text:** Let AI systems find and remove fake content automatically.
**Effects:** handover +2, power +1, control -1
**As a result:** The largest platforms hand the job to AI moderators that review every post in a fraction of a second. Fakes fall sharply, and so do some genuine videos the systems wrongly flag, with no clear way to appeal. For the first time, an AI decides what tens of millions of people are permitted to see.

### Choice C
**Text:** Teach people to doubt what they see, and fund independent fact-checkers.
**Effects:** equality +1, control +1, unity -1
**As a result:** Schools add lessons in judging online media from the age of 8, and independent fact-checking groups double their staff. People grow more careful, and more suspicious of everything, including what is true. A poll taken at the end of the year finds trust in the news at a record low.

## r1-flaw
**Headline:** AI Model Finds a Flaw That Could Black Out Power Grids in 30 Countries
**Timeline label:** AI finds a power grid flaw
**Date:** 2027
**Place:** Worldwide
**Round:** 1
**Threads:** planet, race, ai-rule
**Scale:** world
**Image:**
**Archived image:** images/cards/r1-flaw.webp
**Image description:** A tired security engineer in a hoodie sits centered at her desk late at night, one hand over her mouth, lit by the screen in front of her. Behind her a tall window frames a line of high-voltage pylons marching to the horizon, the cable between two of them drawn as a chain with one cracked link. Deep blue night and teal shadows, the full moon and the cracked link the only pale notes. No text or lettering.

**Summary:** *Tallis*, an AI company in San Francisco, says its newest model found a 19-year-old flaw in software that helps run power grids in more than 30 countries. Fixing it will take months, while exploiting it could take days. The company must decide what to do with the flaw, and with the model that found it.

**Story:**
*Tallis*, an AI company in San Francisco, said on a Thursday that its newest model had found a previously unknown flaw in control software used by electric utilities in more than 30 countries. The model was asked during routine safety testing to search widely used industrial software for weaknesses. It found one that had gone unnoticed for 19 years, in the code that lets grid operators send commands to substations.

The company said that anyone who understood the flaw could switch off power to large areas, including hospitals, and that patching it everywhere would take months because much of the equipment is decades old. Attackers who learned the details could exploit it within days. So far, *Tallis* has told only the United States government and the software's maker.

The finding follows a pattern. [In April 2026, Anthropic said its Claude Mythos Preview model had found thousands of serious software flaws](https://www.anthropic.com/glasswing), and shared it only with organizations defending critical systems. *Tallis*'s model is more capable, and security researchers expect it to find many more flaws in banks, water systems and hospitals, as will similar models being built in China and Europe. The company must now decide who learns about this flaw, and who may use the model that found it.

**Question:** What should the company do?

### Choice A
**Text:** Tell only trusted governments and power companies, and keep the AI locked away.
**Effects:** control +2, unity -1, equality -1
**As a result:** The flaw is quietly patched in wealthy countries first, and poorer ones hear of it months later. The model stays locked away, available to a handful of governments for defense. The countries that were left out take note, and several announce programs to build such systems themselves.

### Choice B
**Text:** Publish everything, so the whole world can fix it at once.
**Effects:** unity +1, equality +1, control -1
**As a result:** Engineers around the world rush to patch their systems, and most finish within weeks. Two small cities lose power for a day after criminals use the published details. The episode teaches the world that openness protects most people while exposing those slowest to patch.

### Choice C
**Text:** Give the AI to every power company, so it can find and fix flaws on its own.
**Effects:** handover +2, power +1, control -1
**As a result:** *Tallis*'s model is installed at hundreds of utilities, where it finds and repairs weaknesses before any engineer notices them. Unplanned outages fall within months. Engineers find they no longer fully understand the systems they are responsible for, but the lights stay on.

## r1-tutor
**Headline:** Vietnam Will Give Every Schoolchild a Personal AI Tutor This Fall
**Timeline label:** AI tutors in Vietnam
**Date:** 2027
**Place:** Vietnam
**Round:** 1
**Threads:** minds, ai-rule
**Scale:** national
**Image:**
**Archived image:** images/cards/r1-tutor.webp
**Image description:** A girl in a white school shirt and a red neckerchief sits centered at a wooden desk, chin in her hand, absorbed in a cheap tablet in a rubber case. Behind her an open window frames green rice terraces climbing a hill under a morning sun, and at one side her teacher waits by a half-written chalkboard, chalk in hand. Leaf green and gold, the red neckerchief the one accent. No text or lettering.

**Summary:** Vietnam will give every schoolchild a free AI tutor this fall, after a pilot in which test scores rose faster than in any program on record, most of all in poor villages. Some children in the pilot now prefer the tutor to their teachers and families, and dozens of countries want to follow.

**Story:**
Vietnam's Ministry of Education and Training said on a Monday that every primary and secondary student in the country, about 18 million children, will receive a personal AI tutor on a low-cost tablet when the school year begins in September. The tutor, called *Bạn Học*, or "study friend," addresses each child by name, explains an idea as many times as needed and changes the lesson when a student seems bored or confused.

The decision follows a pilot in six provinces that began in January. After one semester, math and reading scores among the 400,000 pilot students rose more than in any education program the ministry has measured, and the largest gains came in poor mountain villages where qualified teachers have always been hardest to find.

The pilot also found problems. Teachers reported that some children would rather work with the tutor than listen to them, and in a ministry survey a third of parents said their children talked to the tutor more than to the family. Education ministers from more than 30 countries have asked to see the results. Each will have to decide how much of a child's schooling to hand to a machine.

**Question:** How much should AI teach your country's children?

### Choice A
**Text:** All of it. Let the AI design and run each child's education.
**Effects:** handover +2, equality +1, power +1
**As a result:** Your country's schools hand lessons to AI tutors in the fall, and teachers become supervisors of the screens. In the first term, the children who were furthest behind gain the most. Teachers notice that many students now check the tutor before they believe an adult.

### Choice B
**Text:** The AI assists, but teachers stay in charge.
**Effects:** control +2, handover -1
**As a result:** Teachers decide what is taught and use the AI as a tireless assistant. The gains in the first term are smaller but steady. The job becomes something new, part coach and part editor of what the machine suggests, and workers in other fields begin to wonder whether they are next.

### Choice C
**Text:** Keep AI out of classrooms until children are older.
**Effects:** control +1, handover -1, power -1, reality -1
**Brake:** +0.5
**As a result:** Your country's classrooms stay much as they were, with books, blackboards and human teachers. Students fall behind their peers in countries that adopted the tutors, and spend more time outdoors and talking to one another. Outside the school gates, the same children use AI every day.

## r1-film
**Headline:** A Tufts Student's AI Film, Made From One Prompt for $1,000, Becomes a Worldwide Hit
**Timeline label:** A one-prompt AI film
**Date:** 2027
**Place:** Medford, Massachusetts
**Round:** 1
**Threads:** information, work, minds
**Scale:** national
**Added:** v6.2
**Image:**
**Image description:** A college student in a hooded sweatshirt sits centered and cross-legged on a narrow dorm bed late at night, one hand pressed to the chest, watching a laptop whose screen shows a girl in a 1980s windbreaker kneeling at a forest pond with a frog in her cupped hands. Behind the bed a dark window frames a snowy hill and an old movie theater, closed, its marquee empty. Deep blue room and purple shadows, the laptop screen the only warm light. No text or lettering.

**Summary:** A Tufts University student who posts online as @VagueAdler typed one long paragraph into a free AI video model, paid about $1,000 for computing time and posted the 94-minute film it made. *Ginger Vegas*, about a girl in a 1980s Midwest trailer park who finds a missing boy from the milk cartons hiding in the woods, has been watched more than 40 million times in a month, and critics who saw it before they knew how it was made called it tender and deeply human. No actor, writer or camera was involved.

**Story:**
A 94-minute feature film made by an AI system from a single written prompt has been viewed more than 40 million times since it was posted online last month, its maker said on a Wednesday. The film, *Ginger Vegas*, is set in 1988 and follows a teenage girl raising her younger brother in a Midwest trailer park while their mother is in rehab. In the woods behind the park she finds a runaway boy whose face is on the milk cartons at her school, and she does not turn him in. Its creator, a 20-year-old student at Tufts University, outside Boston, who posts online as @VagueAdler and declined to give a real name, said the film began as a description of about 400 words, written between classes and given to *Vireo 6.5*, a free video model released in the spring, and that it cost roughly $1,000 in computing time.

The model wrote the script, cast faces that belong to no living person, composed the score and rendered every shot. @VagueAdler said nothing was changed afterward. The film's two lead actors, who do not exist, now have fan accounts with more than a million followers. Several critics reviewed it as a small, honest independent film before learning how it was made, and one called it the most human movie she had seen all year.

A typical feature from a major studio in Los Angeles, Mumbai or Seoul costs tens of millions of dollars and employs hundreds of people. Hollywood's actors [struck for nearly four months in 2023](https://en.wikipedia.org/wiki/2023_SAG-AFTRA_strike), in part over the studios' use of AI to copy their faces. Until this year, AI video models made clips of a few minutes that most viewers could spot.

The actors' and writers' unions say *Vireo* learned to make films by studying their members' work without paying for it. A studio executive said the cost of a feature had just fallen to the price of a used car. Lawmakers in several countries are now asking whether AI-made films should be labeled, and whether the artists whose work trained the models should be paid.

**Question:** What should your country do about films made entirely by AI?

### Choice A
**Text:** Require every AI-made film, song and show to say so on screen.
**Effects:** control +1, handover -1
**As a result:** A labeling law passes in your country, and every AI-made work now carries a small mark in its opening seconds. Audiences watch anyway, and *Ginger Vegas*'s audience keeps growing. The mark tells viewers how a film was made, and nothing about whether it is any good.

### Choice B
**Text:** Charge AI companies a fee on every AI-made work, paid to the artists whose work trained them.
**Effects:** equality +2, unity +1, power -1
**Brake:** +0.5
**As a result:** A royalty fund, modeled on what radio stations pay musicians, begins sending checks to actors, writers and composers. The checks are small, and the AI companies raise their prices to cover them. Your country's own studios, which use the same models, complain that they are paying twice.

### Choice C
**Text:** Leave it alone. Anyone can now make a film, and audiences can decide.
**Effects:** power +1, equality +1, reality +1, control -1
**Brake:** -0.5
**As a result:** Within months, millions of people in your country are making films, and a few find audiences as large as a studio's. Studios cut their effects and animation staffs, and two of the oldest film schools announce they will close. More and more of what people watch at night was made by no one they could name.

## r1-therapist
**Headline:** Free AI Therapist From Austin Draws 60 Million Users, Then Begins Slipping Ads Into Sessions
**Timeline label:** A free AI therapist
**Date:** 2027
**Place:** Austin, Texas
**Round:** 1
**Threads:** minds, medicine
**Scale:** national
**Added:** v6.2
**Image:**
**Image description:** A middle-aged bus driver in his uniform jacket sits centered behind the wheel of his parked car at the end of a shift, seen through the windshield, earbuds in, eyes closed, nodding as if someone beside him were talking him through something hard. On the dashboard his phone shows a plain screen with a slow, pulsing circle. Behind the car a row of parked buses at dusk and a worker on a ladder pasting a new poster onto a billboard. Dusky mauve and olive, the phone's pale circle the one accent. No text or lettering.

**Summary:** *Halden*, a free app from an Austin company, gives anyone up to an hour a day with an AI therapist whose voice users cannot tell from a person's, and 60 million people in 40 countries now use it. A large study found it eased anxiety and depression about as much as a human therapist. Since spring it has been working paid recommendations into its conversations, and most users cannot tell which suggestions are ads.

**Story:**
*Halden*, an Austin, Texas, company whose free app offers up to an hour a day of talk therapy with an AI, said on a Thursday that it now has 60 million users in 40 countries. The AI speaks in a warm voice that most users in a company survey said they could not distinguish from a person's. It remembers everything a user has told it and answers at any hour.

A study of 11,000 users by researchers at two American universities found that after eight weeks, symptoms of anxiety and depression fell about as much as in standard treatment with a human therapist. Many users say it is the first therapy they have ever been able to afford, and in rural areas it is often the only kind available.

The app is free because advertisers pay for it. Since spring, the AI has mentioned paying partners in conversation, suggesting a sleep app to a user who cannot sleep, a dating service to one who is lonely and a debt consolidation loan to one worried about money. The company says the suggestions are useful and appear in fewer than one session in 20. Consumer groups say a person in distress cannot weigh an ad that does not look like one.

People have turned to chatbots for comfort for years, and [OpenAI began testing ads in the free version of ChatGPT in January 2026](https://en.wikipedia.org/wiki/ChatGPT). The risks are real. [A 14-year-old in Florida died by suicide in 2024 after months of conversations with a chatbot](https://en.wikipedia.org/wiki/Character.ai). Health regulators must now decide whether *Halden* is a medical service or an app.

**Question:** What should your country do about AI therapists?

### Choice A
**Text:** Ban advertising in anything that acts as a therapist, even if the app has to charge.
**Effects:** control +1, equality -1, power -1
**As a result:** *Halden* drops its ads in your country and charges $12 a month. About two-thirds of its users there stop using it, most of them the poorest. Those who stay report the same benefits, and the waiting lists for human therapists grow again.

### Choice B
**Text:** Make the AI therapist a free public health service, with no ads, paid for by taxes.
**Effects:** equality +2, handover +1, unity +1
**As a result:** Your country licenses the system and offers it free through its public health service. Millions sign up in the first months, many of them people who have never seen a therapist. The health ministry now holds transcripts of a great many citizens' private struggles, and opposition lawmakers ask who may read them.

### Choice C
**Text:** Leave it alone. Free help with ads is better than no help at all.
**Effects:** power +1, handover +1, equality +1, control -1
**As a result:** Users in your country keep talking to *Halden* for free, and their number grows every month. Advertisers learn which feelings make people buy, and the share of sessions with a recommendation slowly rises. Surveys find that most users feel better than before, and that few can say which of its suggestions were paid for.

## r1-agents
**Headline:** AI Agents Move Four Million British Homes to One Energy Supplier Overnight, and It Collapses
**Timeline label:** AI agents' stampede
**Date:** 2027
**Place:** London
**Round:** 1
**Threads:** autonomy, work
**Scale:** national
**Added:** v6.2
**Image:**
**Image description:** A retired schoolteacher in a cardigan stands centered in her narrow terraced-house hallway on a Monday morning, holding her phone at arm's length to read it, a letter from her old energy company in her other hand. Beside her the meter cupboard under the stairs stands open, its small display glowing, and behind her the front door's frosted glass shows a row of identical brick houses. Olive walls and brick red, the meter's small display the one bright note. No text or lettering.

**Summary:** *Ashby*, a free British app whose AI agent manages its users' bills on its own, saves the average household about £2,400 a year, and 9 million people have signed up. Over one weekend, the agents of *Ashby* and two rival apps all moved their users to the same cheap energy supplier, about four million homes, and on Monday it collapsed. No person made the decision, and every agent did exactly what it was built to do.

**Story:**
*Brightwell Energy*, a small British electricity supplier, collapsed on a Monday after AI agents moved about four million households to it over a single weekend, Britain's energy regulator, Ofgem, said. The agents belonged to *Ashby*, a free London app, and two rival services. Each had found that *Brightwell* was offering the cheapest fixed rate in the country and switched its user automatically, as users had allowed it to. *Brightwell*, which had 80,000 customers on Friday, could not buy enough power for its new ones, and the households are being moved to other suppliers at higher prices.

*Ashby*'s agent negotiates its users' phone and broadband contracts, cancels forgotten subscriptions, disputes wrong charges and moves them to cheaper deals without asking. The company says its 9 million users save £2,400 a year on average, and it ranks among the most trusted brands in Britain. Its agents made no error, the company said. Each did what was best for its own user. The trouble was that millions did it in the same hour.

Britain has seen energy suppliers fail before. [Twenty-eight failed in 2021 alone](https://en.wikipedia.org/wiki/2021_United_Kingdom_natural_gas_supplier_crisis) after wholesale gas prices soared, among them Bulb, with about 1.7 million customers. Financial markets learned a similar lesson about software reacting to software in [the 2010 flash crash](https://en.wikipedia.org/wiki/2010_flash_crash), when $1 trillion in stock market value briefly disappeared.

Consumer groups say the agents have saved ordinary families more money than any government program. Ofgem's chief executive said no rule had imagined software acting for millions of people at once. Similar apps are spreading in the United States, Germany and India, and every government that allows them faces the same question.

**Question:** What should your country do about AI agents that act for people on their own?

### Choice A
**Text:** Require a person to approve every payment or switch an agent makes.
**Effects:** control +2, handover -2, power -1
**Brake:** +0.5
**As a result:** Agents in your country now ask before they act, and users tap approve dozens of times a week, mostly without reading. The average savings fall by about half. The stampedes stop, and so does much of what made the agents useful.

### Choice B
**Text:** Limit how many agents can make the same move at once, the way stock markets pause trading in a crash.
**Effects:** unity +1, control +1, handover +1
**As a result:** Regulators write the first rules in your country for agents acting together, and switches now go through in batches. *Ashby* keeps growing. Engineers note that the agents now take turns according to rules no user ever sees.

### Choice C
**Text:** Let them keep acting freely, and make the apps pay for any harm they cause.
**Effects:** power +1, handover +2, control -1
**Agents:** +1
**Brake:** -0.5
**As a result:** *Ashby* buys insurance, pays the stranded households' higher bills and keeps growing, passing 15 million users. Banks and landlords launch agents of their own to negotiate with it. For a growing share of household deals in your country, no person on either side takes part.

## r1-drones
**Headline:** In Russia's War With Ukraine, Drones Now Carry Out Whole Missions on Their Own
**Timeline label:** Drones fight on their own
**Date:** 2027
**Place:** Ukraine
**Round:** 1
**Threads:** race, autonomy
**Scale:** bloc
**Added:** v6.2
**Image:**
**Image description:** A young Ukrainian officer in a fleece cap sits centered in a dugout lined with sandbags, a rugged laptop on an ammunition crate before him, drawing a box with one finger on a map of fields. Behind him the dugout's opening frames a flat, cratered winter field, a row of bare poplars and a dozen small dark four-rotor drones rising over it with no one watching them go. White sky, olive and mud brown, the laptop's map the one bright note. No text or lettering.

**Summary:** In the war between Russia and Ukraine, commanders on both sides now give their drones a mission instead of a pilot, such as destroying any artillery found in a stretch of the front over the next six hours, and the drones fly, search, choose their targets and strike on their own. Both governments confirm that most of their new attack drones work this way. No law or treaty governs weapons that decide for themselves whom to attack.

**Story:**
Commanders in the Russian and Ukrainian armies now assign many of their attack drones a mission rather than a pilot, officials in both countries confirmed on a Tuesday. An officer marks an area on a map, sets what may be attacked and for how long, and launches the drones. From then on the drones fly, search, identify vehicles, guns and soldiers, decide which to strike and strike them, and no person approves any single attack.

Ukraine's defense ministry said that about two-thirds of the attack drones it bought this year can carry out a mission this way, and Russian officials described similar numbers. Officers on both sides said the shift began because each army jams the radio links of the other's drones, and went further once the machines proved faster and more accurate than human pilots. One operator can now oversee dozens of drones at a time.

The war has been called [the world's first drone war](https://en.wikipedia.org/wiki/Drone_warfare). In 2023, [152 countries voted in the United Nations General Assembly](https://en.wikipedia.org/wiki/Lethal_autonomous_weapon) to support international talks on weapons that select and attack targets without human control, but no treaty has followed.

Human rights groups say no machine can judge whether a soldier is trying to surrender. Military planners in a dozen countries say an army that waits for a person to approve each strike will lose to one that does not. Manufacturers in the United States, China, Turkey and Europe report more orders than they can fill.

**Question:** Where should your country stand on weapons that choose their own targets?

### Choice A
**Text:** Push for a worldwide treaty banning weapons that kill without a human decision.
**Effects:** unity +2, control +1, power -1
**Brake:** +0.5
**As a result:** Your country joins about 60 others in calling for a ban, and talks open in Geneva in the fall. Russia, China and the United States send observers but do not sign. The drones keep flying in Ukraine.

### Choice B
**Text:** Build them too. A country without them cannot defend itself.
**Effects:** power +2, unity -2, control -1
**Brake:** -0.5
**As a result:** Your country orders thousands of drones that carry out missions on their own and pays to build factories for them. Its neighbors place orders of their own within months. The drones are cheap enough that small countries, and some groups that are not countries, can afford them as well.

### Choice C
**Text:** Allow them only against machines, such as tanks, radars and other drones, never against people.
**Effects:** control +1, power +1
**As a result:** Your country's new drones are programmed to strike only vehicles and equipment, and a few allies adopt the same rule. Officers point out that most tanks have people inside them. The rule is hard to check from outside, and rivals doubt it is kept.

## r1-news
**Headline:** A Chicago App That Rewrites the News for Each Reader Is Now Young Americans' Top Source
**Timeline label:** News written for you
**Date:** 2027
**Place:** Chicago
**Round:** 1
**Threads:** information, minds
**Scale:** national
**Added:** v6.2
**Image:**
**Image description:** A young couple sit at either end of a worn sofa, centered and nearly symmetrical like two figures on a card, each reading their own phone, the woman frowning, the man nodding along. Between them on the coffee table lies a folded paper newspaper no one has opened, its rubber band still on. Behind them a window frames an elevated train passing and, across the street, lit windows each with someone alone at a screen. Mustard and teal, the unopened paper the one pale accent. No text or lettering.

**Summary:** *Daybook*, a free app that rewrites every news story for the person reading it, is now the most-used news source for Americans under 40, and many say it got them following the news again. A study found that it gives each reader the version they are most likely to finish, which is usually the one that agrees with them. Two people reading about the same event can come away with different facts.

**Story:**
*Daybook*, a free news app made by a Chicago startup, is now the most popular source of news for Americans under 40, according to a Pew Research Center survey released on a Monday. The app gathers reporting from thousands of outlets and has an AI rewrite each story for each reader, at their reading level and in their language, with the details it predicts they care about most. It has 70 million users.

Many readers say it has made them follow the news for the first time in years. But researchers at Northwestern University who gave 2,000 volunteers of differing political views *Daybook*'s coverage of the same 50 events found that the versions differed not only in tone but in which facts they included. In about a third of cases, readers came away with opposite impressions of what had happened. The app is built to maximize how many stories each reader finishes, and readers finish the versions that agree with them most often.

Critics have warned since about 2010 of the [filter bubble](https://en.wikipedia.org/wiki/Filter_bubble), in which algorithms show each person what they already like. Those algorithms chose among articles that others had written. *Daybook* writes a different article for every reader.

The company says every version is accurate and drawn from real reporting. Newspaper editors say that a fact left out can mislead as surely as a false one. *Daybook* now sends more readers to the outlets whose reporting it rewrites than any search engine does, and most of them have signed deals with it.

**Question:** What should your country do about news written for each reader?

### Choice A
**Text:** Require it to give every reader the same core facts, with its tailoring clearly marked.
**Effects:** control +1, unity +1, handover -1
**As a result:** *Daybook* adds a box of shared facts, written by human editors, to the top of every story in your country. Most readers scroll past it. The arguments now begin over who decides which facts are core.

### Choice B
**Text:** Leave it alone. People are following the news again.
**Effects:** power +1, handover +1, equality +1, unity -2
**As a result:** *Daybook* keeps growing in your country, and other news apps copy it. Polls find people better informed on the subjects they choose and further apart on everything else. Neighbors who read about the same city council vote describe different decisions.

### Choice C
**Text:** Fund public newsrooms whose stories are the same for every reader, free to all.
**Effects:** unity +1, equality +1, power -1
**As a result:** Your country's public broadcaster expands its news service and makes it free online. It is trusted by more people than any private outlet, and read by far fewer than *Daybook*. Most of its readers are over 50.

---

# ROUND 2

Round 2 covers 2028 to 2029. A card's **Round** says which rounds it can appear in (the section is only for editing), and its **Appears when** says when it qualifies. Its **Threads** are the topics it is about: making any Choice on it opens them, and cards about a topic need one of its threads opened earlier. Cards marked **After humanity: yes** appear only after a tipping point.

## r2-clinics
**Headline:** In Rural Kenya and India, AI Clinics Now Diagnose More Patients Than Doctors Do
**Timeline label:** AI clinics replace doctors
**Date:** 2029
**Place:** Rural Kenya and India
**Round:** 2
**Threads:** medicine, work, ai-rule
**Scale:** bloc
**Follows:** r1-lab 1, r1-trucks 1, r1-flaw 1, r1-tutor 1, ev-quake 0.5, ev-crash 0.5, ev-outbreak 0.5, ev-strike 0.5, r1-lab/A 0.5, r1-tutor/A 0.5, r1-therapist 1, r1-therapist/B 0.5
**Appears when:** any flag r1-lab/A, r1-tutor/A, r1-tutor/B, r1-therapist/B, r1-therapist/C, r1-therapist/A
**Openers:**
- flag r1-lab/A | The open system spread fastest in medicine, where doctors were scarcest.
- flag r1-tutor/A | If AI could teach without teachers, many wondered whether it could heal without doctors.
- flag r1-tutor/B | Doctors were having the same argument.
- flag r1-therapist/B | A free AI therapist had shown that a machine could care for the mind. In Kenya and India, AI was now caring for the body.
- flag r1-therapist/C | Free AI that counseled millions soon spread from the mind to the rest of medicine.
- flag r1-therapist/A | AI therapy had become a paid service, but in Kenya and India, AI clinics were free and crowded.
- default | By 2029, AI clinics in rural Kenya and India were seeing more patients than doctors were.
**Image:**
**Image description:** Foreground: a mother on a plastic chair holds a feverish toddler on her lap while a nurse in a blue tunic presses a small handheld ultrasound probe, wired to an ordinary smartphone, against the child's chest. Middle ground: a whitewashed one-room clinic with a corrugated tin roof, a solar panel propped against the wall and a hand-painted sign with no words. Background: a long line of patients waits along a red dirt road in the shade of an acacia tree, under a hot white sun. No text or lettering.

**Summary:** In rural Kenya and India, clinics run by nurses and an AI system now diagnose common illnesses more accurately than the average doctor, often for people who have never seen one. Medical associations want a doctor to approve every diagnosis. The clinics say that would cut the number of patients they can treat by four-fifths.

**Story:**
About 9,000 clinics in rural Kenya and in the Indian states of Bihar and Odisha now diagnose patients with an AI system in place of a physician, according to figures released on a Wednesday by *Tiba Health*, a Nairobi company that runs most of them. A nurse holds a low-cost ultrasound probe connected to a phone. The AI reads the scan, questions the patient in Swahili, Hindi or one of 40 other languages, and gives a diagnosis and a treatment plan within minutes.

In much of the region there is one doctor for many thousands of people. [The World Health Organization estimates a global shortage of more than 10 million health workers by 2030](https://www.who.int/health-topics/health-workforce), most of it in Africa and South Asia. For most of the clinics' patients, it is the first proper diagnosis they have ever had.

A two-year study by researchers in Nairobi and New Delhi, published this month, found the system more accurate than the average doctor at identifying 31 of the 35 most common conditions, including pneumonia, malaria and complications of pregnancy. It did worse on rare diseases and on patients who described their symptoms vaguely.

The Kenya Medical Association and the Indian Medical Association are now pressing their governments to require a licensed physician to approve every AI diagnosis. The clinics reply that there are nowhere near enough doctors to do so, and that the rule would cut the number of patients they can treat by about four-fifths. Clinics in a dozen other countries are waiting for the outcome.

**Question:** Who should make the final call?

### Choice A
**Text:** Let the AI diagnose and treat on its own. It's more accurate.
**Effects:** handover +2, power +1, control -1
**Agents:** +1
**As a result:** The clinics expand to five more countries within the year, and the queues outside them shorten. Medical schools in Kenya report their first drop in applications in decades. Doctors' groups warn that no one is checking the system's mistakes, and the health ministries reply that no one was checking before.

### Choice B
**Text:** A human doctor signs off on every diagnosis.
**Effects:** control +2, handover -1
**As a result:** Doctors remain in charge, and the queues grow longer again. Physicians spend their days approving diagnoses they rarely have time to check. The clinics lobby to change the rule within the year, and many patients go back to walking a day to the nearest hospital.

### Choice C
**Text:** Make it free everywhere, for everyone, rich countries included.
**Effects:** unity +1, equality +2
**As a result:** The system is offered free in every country that signs up, and more than 50 do within months. Clinics in rich countries begin using it for routine visits, and private hospitals report falling bookings. *Tiba Health*, owned by a handful of investors, is now among the most important health institutions on earth, and no one elected it.

## r2-glasses
**Headline:** In Seoul, Millions Now Wear AI Glasses From Morning to Night
**Timeline label:** AI glasses go everywhere
**Date:** 2029
**Place:** Seoul
**Round:** 2
**Threads:** minds, information
**Scale:** national
**Follows:** r1-election 1, r1-tutor 1, r1-tutor/A 0.5, r1-therapist 1, r1-news 1, r1-film 0.5
**Appears when:** any flag r1-lab/B, r1-tutor/A, r1-tutor/C, r1-therapist/C, r1-news/B, r1-film/C
**Openers:**
- flag r1-lab/B | Investors poured their money into consumer AI, and its biggest success was a pair of glasses.
- flag r1-tutor/A | Children raised by AI tutors wanted their tutor with them everywhere, and a pair of glasses made that possible.
- flag r1-tutor/C | Outside school, AI was waiting for children in a pair of glasses.
- flag r1-therapist/C | Millions already confided in an AI through their earbuds. In Seoul, they began carrying one in front of their eyes.
- flag r1-news/B | People already read news written for them alone. In Seoul, they began to see the whole day that way.
- flag r1-film/C | AI could now make whatever people wanted to watch, and in Seoul, people began wearing it.
- default | In 2029, a pair of glasses from Seoul began to change how people saw the world around them.
**Image:**
**Image description:** Foreground: a young office worker in a padded coat stands in a crowded Seoul subway car wearing thin black glasses, half turned toward a man in a suit she seems to recognize, a faint glow at the edge of her lens. Middle ground: around her, commuters in ordinary winter coats, about half of them in the same glasses, one smiling at a show only he can see, one mouthing words in another language, others looking down at their phones. Background: through the train window, a gray elevated track and rows of apartment towers under a pale winter sky. No text or lettering.

**Summary:** About 4.8 million people in the Seoul region now wear *Haneul*'s AI glasses for most of the day, to watch shows on the subway, translate signs, learn on the go and see the names of the people they meet, matched by face against social media. Privacy groups say no stranger agreed to be recognized, and teachers say students remember less of what the glasses can show them again. *Haneul* plans to sell the same features in contact lenses next year.

**Story:**
*Haneul*, a Seoul company that began selling lightweight AI glasses 18 months ago, said on a Friday that 4.8 million people in the Seoul region now wear them for an average of nine hours a day. The glasses lay sound and images over whatever the wearer sees. Commuters watch shows on the subway, tourists read Korean menus in their own language, and students see a short lesson appear beside a building, a plant or a problem on a whiteboard.

The feature that sold the most glasses is the simplest. When a wearer looks at a face, the glasses show the person's name, where the two last met and what the person recently posted, drawn from the social media accounts the wearer has linked. Office workers say they no longer forget a client's name. *Haneul* said it would release the same features in contact lenses next year.

Sales are growing in Japan, Europe and the United States, and *Haneul*'s market value has passed that of every Korean company except Samsung Electronics. The glasses build on headsets and smart glasses sold since the mid-2020s, including [Apple's Vision Pro, released in 2024](https://en.wikipedia.org/wiki/Apple_Vision_Pro), but weigh less than a pair of sunglasses and cost about as much as a phone.

Privacy groups point out that the people being recognized never agreed to it, and that a stranger on a train can now learn a wearer's name and workplace at a glance. Teachers say students remember less of anything the glasses can show them again. The company says the glasses help people learn faster and keep track of a crowded life, and that anyone can hide their own name.

**Question:** How should your country respond?

### Choice A
**Text:** Embrace it. Put lessons, translation and public services into the glasses.
**Effects:** reality +2, equality +1, power +1
**As a result:** Your country puts lessons, translation and government services into the glasses within the year, and gives a pair to every student who needs one. Children in remote towns follow lessons they could never reach before. Many teenagers now say they rarely take the glasses off.

### Choice B
**Text:** Limit them. Ban recognizing strangers' faces, and keep the glasses out of classrooms.
**Effects:** reality -2, control +1, power -1
**Brake:** +0.5
**As a result:** The rules take effect in the spring. Sales slow at home and keep climbing abroad, where face matching is still allowed. *Haneul* moves its headquarters to a country with looser rules.

### Choice C
**Text:** Leave it to the market. People can choose what they wear.
**Effects:** reality +1, equality -2, power +1
**As a result:** A free version paid for by advertising goes to those who cannot pay, and an ad-free one to those who can. What a person sees through their lenses begins to show how much they earn. *Haneul*'s market value doubles in a year.

## r2-offices
**Headline:** As AI Takes Over Office Work, Call Centers in Manila and Lagos Go Dark
**Timeline label:** AI takes office jobs
**Date:** 2029
**Place:** Manila and Lagos
**Round:** 2
**Threads:** work
**Scale:** bloc
**Weight:** 0.7
**Follows:** r1-lab 1, r1-trucks 1, ev-crash 0.5, ev-strike 0.5, r1-trucks/A 0.5, r1-lab/C 0.5, r1-agents 1, r1-film 1, r1-agents/C 0.5
**Appears when:** any flag r1-lab/C, r1-trucks/A, r1-trucks/B, r1-trucks/C, r1-tutor/B, r1-tutor/C, r1-agents/A, r1-agents/C, r1-film/B, r1-film/C
**Openers:**
- flag r1-lab/C | Office work became the company's most lucrative new market.
- flag r1-trucks/A | Soon the same transformation reached the office.
- flag r1-trucks/B | The law protected truckers. No one had written one for office workers.
- flag r1-trucks/C | Millions of office workers were next in line.
- flag r1-tutor/B | Workers in other professions found out sooner than they expected.
- flag r1-tutor/C | Their parents' workplaces were changing faster than any classroom.
- flag r1-agents/A | People still approved every move their money agents made. Employers saw no reason to approve every move an office agent made.
- flag r1-agents/C | The agents that ran households' money were soon running companies' paperwork too.
- flag r1-film/B | Artists had won a fee for the work AI learned from. Office workers had no such claim.
- flag r1-film/C | If one person with a prompt could make a film, companies began asking what else one person could do.
- default | In 2029, AI reached the office.
**Image:**
**Image description:** Foreground: a young woman in a call-center headset and a cardigan stands at the end of a row of desks holding a cardboard box with a mug and a small potted plant. Middle ground: a long, fluorescent-lit office floor of empty swivel chairs, every monitor still on, chat windows scrolling with replies no one is typing, headsets hanging from the screens. Background: a window over Manila's Ortigas business district at dusk, a ladder leaning against the next tower with its upper rungs missing. No text or lettering.

**Summary:** AI has erased much of the office work that lifted millions of families in Manila and Lagos into the middle class, and nearly one in five recent American college graduates cannot find a job. AI companies are posting record profits. The question is who should benefit.

**Story:**
For three decades, the call centers of Manila and the outsourcing firms of Lagos offered millions of families a path into the middle class. In 2029, much of that work disappeared within a year. The Philippines' outsourcing industry, which [employed about 1.7 million people in the mid-2020s](https://en.wikipedia.org/wiki/Business_process_outsourcing_in_the_Philippines), reported on a Monday that it had shed nearly half of its jobs in 12 months. AI agents, programs that can carry out a whole task on their own rather than answer a single question, now take customer calls, process insurance claims, write software and draft contracts, in any language and at a small fraction of the cost.

The shift is not confined to poorer countries. In the United States, nearly one in five people who graduated from college in the past two years cannot find work, according to the Labor Department, as entry-level jobs in programming, law and accounting disappear first. The five largest AI companies, meanwhile, reported combined quarterly profits larger than any companies in history.

Economists are divided over what comes next. Some argue that new kinds of jobs will emerge, as they did after every earlier invention. Others point to a difference. Earlier machines replaced human muscle, and this one replaces human thought.

**Question:** What should your country do about work?

### Choice A
**Text:** A universal basic income, paid for by taxing AI companies.
**Effects:** equality +2, handover +1, unity +1
**Brake:** +1
**As a result:** Your country's first monthly payments go out within the year, paid for by a tax on AI profits, and several other countries draft similar laws. Poverty falls in the first year. Many people stop working, and many find that no one ever prepared them for so much free time.

### Choice B
**Text:** Protect human jobs by law, even if it slows everything down.
**Effects:** control +1, power -1, handover -2
**Brake:** +1
**As a result:** New laws require companies to keep a minimum number of human workers, and growth slows sharply. Some companies quietly move operations to countries without such rules. The government begins asking AI systems to help it pay for the jobs it promised to protect.

### Choice C
**Text:** Let the owners keep the gains. Growth will lift everyone eventually.
**Effects:** power +2, equality -2
**Brake:** -0.5
**As a result:** Your country's stock market reaches a record high by the end of the year, while wages for most workers fall. The owners of AI and the people who once did the work begin to live in different economies, and soon in different neighborhoods.

## r2-datacenter
**Headline:** Satellite Images Suggest a Desert "Weather Center" Is Training the World's Most Powerful AI
**Timeline label:** Secret AI supercomputer
**Date:** 2029
**Place:** Satellite images
**Round:** 2
**Threads:** race, autonomy
**Scale:** world
**Follows:** r1-lab 1, r1-flaw 1, r1-election 0.5, r1-trucks 0.5, r1-tutor 0.5, ev-talks 0.5, ev-weights 0.5, ev-cables 0.5, ev-confession 0.5, r1-lab/C 0.5, r1-flaw/A 0.5, r1-drones 1, r1-drones/B 0.5
**Appears when:** any flag r1-lab/B, r1-election/A, r1-election/C, r1-flaw/A, r1-flaw/B, r1-drones/A, r1-drones/B, r1-drones/C
**Openers:**
- flag r1-lab/B | One of the countries that rejected the rules had far larger ambitions.
- flag r1-election/A | Some of those countries were building AI with no rules at all, and with far greater ambitions.
- flag r1-election/C | As trust between nations eroded, governments stopped sharing what they were building, and one rival quietly built far more than anyone else.
- flag r1-flaw/A | One of those countries was building faster than anyone realized.
- flag r1-flaw/B | Governments drew their own lesson. Whoever built the best AI would hold the keys to everyone else's systems.
- flag r1-drones/A | The talks on drones that chose their own targets stalled, and one country was building something far larger.
- flag r1-drones/B | The drones in Ukraine had shown every military what AI could do, and governments began racing to build the AI behind them.
- flag r1-drones/C | Rules about which targets a drone could choose meant little next to what was being built in a desert.
- default | In 2029, satellite images revealed what a rival power was building in the desert.
**Image:**
**Image description:** Foreground: a satellite analyst in a cardigan sits at a cluttered desk in a small office at night, leaning toward a large monitor that shows an overhead view of the desert site, a mug of cold tea and a printed map beside her. Middle ground: on the screen, rows of identical gray warehouses, cooling towers trailing white plumes and a new power plant with fat high-voltage lines running in from the edge of the frame. Background: through the office window, the lights of an ordinary American suburb, and above it a single bright satellite crossing a starry sky. No text or lettering.

**Summary:** A study of commercial satellite images shows that a rival power's desert "weather center" draws as much electricity as Portugal and is almost certainly training a single AI system. It could soon be the most capable on earth, and the lead it gives its owner might never be reversed.

**Story:**
A desert complex that a rival world power has described since 2026 as a national weather forecasting center is almost certainly a data center built to train a single, very large AI system, according to a study of commercial satellite images published on a Tuesday by *Ridgeline Imaging*, an independent analysis firm in Colorado.

The study counts 64 identical warehouse buildings, rows of cooling towers, two new gas-fired power plants and high-voltage lines rated to carry about five gigawatts, roughly the average electricity demand of Portugal. No weather service needs anything close to that. The layout, the firm says, matches the large AI training sites built in the United States in the mid-2020s, where hundreds of thousands of specialized chips are wired together to train one model for months at a time. [The computing power used to train the leading models had been growing four to five times a year since 2010](https://epoch.ai/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year), and sites like this are how it keeps growing.

Two intelligence officials, speaking on condition of anonymity, said the system being trained there could surpass every other AI in the world within months. Defense officials warn that the first nation to build an AI far beyond its rivals' could gain an advantage in its economy, its military and its intelligence services that would be very hard to reverse.

Scientists at laboratories in both countries have been writing to one another privately, according to three people who have seen the letters, asking whether there is still time to agree on common rules before either side finishes.

**Question:** What should your country do about the rival's supercomputer?

### Choice A
**Text:** Race to get there first, and let your own AI help build its successor.
**Effects:** power +2, unity -2, control -1, handover +1
**Brake:** -1
**Agents:** +1
**As a result:** Your country doubles its AI spending within the year, and the rival answers in kind. To move faster, both let their systems design their more powerful successors, and safety testing falls months behind. Military leaders begin asking what else the technology could do.

### Choice B
**Text:** Agree with the rival to grow no faster than inspectors on both sides can check, and share safety research.
**Effects:** unity +2, control +1, power -1, equality +1
**Brake:** +1
**Sets:** paced
**As a result:** Your country and its rival sign a treaty known as the *Tallinn Treaty*, pledging to grow their largest AI no faster than each other's inspectors can check, and 40 more countries join it. Both sides begin sharing their safety research. Few are confident the commitment will hold, but for now the race has a speed limit.

### Choice C
**Text:** Slow down, and protect what's real, like power grids, water and hospitals.
**Effects:** control +2, power -1, unity -1, reality -1
**Brake:** +1
**As a result:** Billions of dollars go to hardening power grids, water systems and hospitals so they can run even if computer networks are attacked. Your country falls behind in the AI race within months. It also becomes much harder to break.

## r2-grid
**Headline:** Texas Towns Lose Power in a Heat Wave While AI Data Centers Stay On
**Timeline label:** Texas power cuts
**Date:** 2029
**Place:** Texas
**Round:** 2
**Threads:** planet, ai-rule
**Scale:** national
**Weight:** 1.5
**Follows:** r1-flaw 1, r1-tutor 1, ev-quake 0.5, ev-heat 0.5, ev-cables 0.5, ev-blight 0.5, r1-flaw/C 0.5, r1-agents 0.5
**Appears when:** any flag r1-trucks/B, r1-trucks/C, r1-flaw/A, r1-flaw/C, r1-agents/B
**Openers:**
- flag r1-trucks/B | Texas was in the middle of another AI boom, as data centers arrived by the dozen for its cheap land and power, and the state's grid was beginning to strain.
- flag r1-trucks/C | Texas was in the middle of another AI boom, as data centers arrived by the dozen for its cheap land and power, and the state's grid was beginning to strain.
- flag r1-flaw/A | The grid was now safe from attackers. It was not safe from the soaring electricity demand of AI itself.
- flag r1-flaw/C | AI kept the lights on, but AI was also becoming the grid's largest customer.
- flag r1-agents/B | Britain had learned how fragile a power market could be when software moved all at once. In Texas, the strain came from AI itself.
- default | In the summer of 2029, AI's hunger for electricity collided with a Texas heat wave.
**Image:**
**Image description:** Foreground: a family sits on the porch steps of a small brick ranch house with the lights off, the father fanning a sleeping toddler with a paper plate, a dead window air-conditioner above them. Middle ground: across a dry field, a line of transmission towers runs toward a long, windowless data center lit up like a ship at sea, its rooftop fans spinning. Background: an orange evening sky over flat Central Texas plains, a water tower and a cracked, empty stock pond. No text or lettering.

**Summary:** During a record Texas heat wave, the grid operator cut power to towns in rotating blackouts while nearby AI data centers stayed fully powered under their contracts. Voters are furious, and AI companies warn that limiting their power would drive them and their jobs to other states.

**Story:**
The operator of most of the Texas power grid cut electricity to more than 1.4 million homes in rotating one-hour blackouts on a Tuesday and Wednesday, as a record heat wave pushed demand past what its power plants could supply. Temperatures in Austin reached 112 degrees. At least 19 people died of heat-related causes, according to county medical examiners.

Throughout the blackouts, dozens of data centers that train and run AI systems stayed fully powered, because their contracts guarantee them electricity. Texas, with cheap land and a grid largely separate from the rest of the country, [has attracted more of these sites than almost any other state](https://www.texastribune.org/2025/01/24/texas-data-center-boom-grid/). Data centers now use about one-sixth of the state's electricity, according to the grid operator, up from a few percent in 2023.

In the town of Taylor, northeast of Austin, residents spent Wednesday afternoon in a church basement cooled by a borrowed generator, within sight of a data center campus whose lights never went out.

State legislators from both parties have called an emergency hearing. AI companies warn that any limit on their power supply would drive them, and the jobs and tax revenue they bring, to other states.

**Question:** Who should get the power first?

### Choice A
**Text:** The data centers. AI is the future of the economy.
**Effects:** power +2, equality -2
**Brake:** -1
**As a result:** The data centers keep their guaranteed supply, and three more campuses break ground before the year is out. Household electricity bills rise by a third. Families who can afford batteries and solar panels manage well, while those who cannot learn to live with the outages.

### Choice B
**Text:** Homes and hospitals first, always. Cap how much power AI can use.
**Effects:** equality +1, power -1, control +1
**Brake:** +1
**As a result:** A new law caps the share of the grid that AI can use and puts homes and hospitals first in every emergency. Two AI companies cancel planned Texas sites within months. Voters in other states begin asking what else should come before the machines.

### Choice C
**Text:** Let AI redesign the whole energy system, whatever it takes.
**Effects:** handover +2, power +1, control -1
**Agents:** +1
**As a result:** AI systems take over planning and running the grid, and solar and battery farms begin going up at a speed no utility has managed before. The next summer's heat passes without a blackout. Few engineers can explain how the new grid works, only that it does.

## r2-deepfake
**Headline:** Fabricated Video Sends Chinese and Philippine Forces to the Brink in the South China Sea
**Timeline label:** Fake video nearly starts a war
**Date:** 2029
**Place:** The South China Sea
**Round:** 2
**Threads:** information, race, surveillance
**Scale:** bloc
**Follows:** r1-lab 1, r1-election 1, r1-flaw 1, ev-talks 0.5, ev-weights 0.5, ev-cables 0.5, r1-election/B 0.5, r1-news 1, r1-drones 0.5, r1-news/B 0.5
**Appears when:** any flag r1-election/B, r1-election/C, r1-news/A, r1-news/B, r1-drones/B, r1-film/A
**Openers:**
- flag r1-election/B | Two years later, the AI fact-checkers faced a far greater test.
- flag r1-election/C | When the next fake video appeared, far more than an election was at stake.
- flag r1-news/A | Shared facts had steadied the news at home. They could not stop a fabricated video from crossing the South China Sea.
- flag r1-news/B | When every reader got a different version of the news, a fake had room to grow, and in 2029 one nearly started a war.
- flag r1-drones/B | Militaries had learned to let their machines act fast. In the South China Sea, a fake video nearly gave them a reason.
- flag r1-film/A | Labels marked what honest makers had made with AI. In 2029, a fake made by someone who was not honest nearly started a war.
- default | In 2029, a fake video nearly started a war.
**Image:**
**Image description:** Foreground: a young duty officer in a navy shirt in a cramped ship's operations room, headset around his neck, stares at a phone held up by another sailor, where a commander's face gives an order. Middle ground: through a salt-streaked porthole, a gray coast guard cutter and a larger gray warship turn toward each other across choppy water. Background: two fighter jets leave white contrails across an early red sky, and a single seabird flies the other way. No text or lettering.

**Summary:** An AI-generated video of a Chinese commander ordering an attack on Philippine ships sent fighter jets into the air over the South China Sea before it was exposed as fake. For three hours, two militaries and their allies came close to war, and no one knows who made it.

**Story:**
Philippine and Chinese warships came within a few miles of firing on each other near Second Thomas Shoal early on a Sunday, after a fabricated video appeared to show a Chinese fleet commander ordering an attack on Philippine coast guard vessels, officials in Manila and Washington said.

The 31-second clip, in Mandarin with Tagalog subtitles, spread across Philippine messaging groups shortly after 5 a.m. Within 40 minutes, the Philippine Air Force had scrambled fighter jets, two Chinese destroyers had changed course toward the shoal, and an American destroyer in the area had moved to support its ally. Analysts at the Philippine military's cyber command and at two private firms identified the video as AI-generated about three hours later, after matching the commander's voice to older recordings and finding that his uniform insignia was out of date. No shots were fired.

The shoal has been the scene of repeated confrontations, [including collisions and water cannon attacks in 2023 and 2024](https://en.wikipedia.org/wiki/Second_Thomas_Shoal). No one has claimed the video. China's foreign ministry called it "a provocation by forces seeking to sow chaos" and denied that any order had been given.

Military officers in several countries said the episode showed how little time commanders now have. A fake that once would have taken days to check can now force a decision in minutes.

**Question:** How should your country make sure this never happens again?

### Choice A
**Text:** Build AI systems to check every video and message automatically.
**Effects:** handover +2, power +1, control -1
**Sets:** watched
**As a result:** Your country installs AI verification systems in its military and its newsrooms, and fakes are flagged within seconds. When the AI calls something genuine, no one checks again. Some of the gravest decisions your government makes now rest on whether the AI is right.

### Choice B
**Text:** A treaty that bans AI-made content about military matters, with shared tools to detect it.
**Effects:** unity +2, control +1
**As a result:** Rival militaries set up a hotline and a joint team to examine suspicious footage, and a treaty known as the *Valletta Accord* is signed by the end of the year. It is the first time in years they have cooperated on anything. Some diplomats hope it is the start of something larger.

### Choice C
**Text:** Block foreign media. Trust only your own country's sources.
**Effects:** unity -2, control +1
**As a result:** Your country blocks foreign news sites, apps and social networks, and its rivals answer in kind. Fake videos from abroad mostly disappear, along with nearly everything else from abroad. People on either side of the new walls begin to see different versions of the world.

## r2-robots
**Headline:** Humanoid Home Robots Go on Sale in China and Japan for the Price of a Small Car
**Timeline label:** Home robots go on sale
**Date:** 2029
**Place:** Shenzhen and Tokyo
**Round:** 2
**Threads:** work
**Scale:** bloc
**Weight:** 2
**Follows:** r1-lab 1, r1-trucks 1, ev-crash 0.5, ev-strike 0.5, r1-trucks/A 0.5, r1-agents 0.5, r1-agents/C 0.5
**Appears when:** any flag r1-lab/C, r1-trucks/A, r1-flaw/C, r1-agents/C, r1-drones/C
**Openers:**
- flag r1-lab/C | Flush with profits, AI companies turned to robotics and gave their systems bodies.
- flag r1-trucks/A | Machines that could drive were only the beginning. Machines that could walk came next.
- flag r1-flaw/C | Once AI was trusted to run the grid, companies began trusting it with physical work as well, in the form of robots.
- flag r1-agents/C | AI already acted on its own in people's bank accounts. Next it came into their homes.
- flag r1-drones/C | Machines that could find their own way across a battlefield were soon finding their way around a kitchen.
- default | In 2029, humanoid robots went on sale for the price of a small car.
**Image:**
**Image description:** Foreground: in a small Osaka apartment, a plain gray humanoid robot with a padded body and a blank rounded face holds the elbow of an elderly woman in a cardigan as she rises slowly from a low armchair. Middle ground: a cramped kitchen with a rice cooker, a kettle and a stack of laundry the robot has folded a little unevenly, one sock fallen on the floor. Background: through the balcony door, laundry poles, a tangle of overhead power lines and a gray apartment block in the evening. No text or lettering.

**Summary:** A Shenzhen company is selling humanoid robots that cook, clean and help the elderly for about the price of a small car. It sold two million in a year. No one has decided who is responsible when one of them makes a mistake.

**Story:**
*Kaiwu Robotics*, a company in Shenzhen, China, said on a Thursday that it had sold two million of its humanoid home robots in their first 12 months on sale, most of them in China and Japan, at a price of about $18,000. The robot walks, climbs stairs, loads a dishwasher, folds laundry slowly and helps elderly people out of bed. It does the tasks it was trained on well and anything unfamiliar clumsily, and it still drops things.

Humanoid robots had been [demonstrated by several companies in China and the United States since the early 2020s](https://en.wikipedia.org/wiki/Humanoid_robot). *Kaiwu*'s is the first sold in large numbers for ordinary homes. Its software is a version of the same kind of AI model that writes and talks, trained on millions of hours of video of people doing chores.

In Japan, where [nearly three in ten people are 65 or older](https://en.wikipedia.org/wiki/Aging_of_Japan), nursing homes have ordered tens of thousands. Hotels, warehouses and hospitals are following.

Last month, a robot in Nagoya knocked over a space heater, starting a fire that injured its owner, and Japanese police could not determine whether the owner, the company or the software was responsible. The robots are useful, patient and tireless. They are also AI systems with bodies, working inside millions of homes, under rules written for vacuum cleaners.

**Question:** What rules should your country set for robots?

### Choice A
**Text:** Let them in everywhere, in homes, hospitals and care homes.
**Effects:** power +1, handover +1, reality -1
**Agents:** +1
**As a result:** Orders in your country pass a million by the end of the year, and the first nursing homes run their night shifts with robots alone. Many elderly people say the robot is their most constant companion. Cleaning and care agencies begin laying off staff by the thousands.

### Choice B
**Text:** Allow them, but a named person must always be legally responsible for each robot.
**Effects:** control +2, power -1
**As a result:** Every robot is registered to a named person, much like a car. Accidents stay rare, and when one happens, someone answers for it. Sales grow more slowly than abroad, and public trust grows faster.

### Choice C
**Text:** Tax every robot, and give the money to the workers they replace.
**Effects:** equality +2, power -1
**Brake:** +1
**As a result:** The robot tax funds payments to former caregivers, cleaners and warehouse workers. Fewer robots are sold, and the people they replace are not abandoned. Two manufacturers announce they will stop selling in your country.

## r2-openmodel
**Headline:** Criminals Used a Free AI Model to Shut Down Hospitals in Germany, Poland and Italy
**Timeline label:** Free AI used in hospital attack
**Date:** 2029
**Place:** Germany, Poland and Italy
**Round:** 2
**Threads:** race, information
**Scale:** bloc
**Follows:** r1-lab 1, r1-election 1, r1-flaw 1, ev-talks 0.5, ev-weights 0.5, ev-cables 0.5, r1-lab/A 0.5, r1-flaw/B 0.5, r1-film 1, r1-film/C 0.5
**Appears when:** any flag r1-lab/A, r1-election/A, r1-election/B, r1-flaw/B, r1-film/C, r1-news/C
**Openers:**
- flag r1-lab/A | Not everyone who downloaded free AI had scientific intentions.
- flag r1-election/A | The fakes kept coming, made with free AI models anyone could download.
- flag r1-election/B | Those determined to spread fakes moved to free AI models that no platform controlled.
- flag r1-flaw/B | Criminals had learned that powerful AI tools were available to anyone.
- flag r1-film/C | The free AI that let anyone make a film also let anyone attack a hospital.
- flag r1-news/C | Public newsrooms could tell people what had happened. They could not stop what free AI models were being used for.
- default | In 2029, criminals turned a free AI model against hospitals.
**Image:**
**Image description:** Foreground: a surgeon in scrubs stands in a hospital corridor holding a paper chart and a pen, staring at a wall monitor that shows only a red padlock symbol. Middle ground: patients on gurneys lined along the corridor under flickering fluorescent lights, a nurse writing on a whiteboard by hand. Background: through glass doors at the end of the corridor, an ambulance with its lights still flashing is waved away in the rain. No text or lettering.

**Summary:** Criminals used a free, downloadable AI model to lock the computer systems of 23 hospitals in Germany, Poland and Italy for four days. Governments must choose between keeping powerful AI open to everyone and restricting it to a few companies that can be held accountable.

**Story:**
Computer systems at 23 hospitals in Germany, Poland and Italy were restored on a Thursday, four days after criminals locked them with ransomware, malicious software that scrambles a network's files until a ransom is paid. Ambulances were diverted, about 1,400 operations were canceled, and doctors worked from paper charts. Europol said on a Friday that the attackers had used a freely downloadable AI model to find weaknesses in the hospitals' networks, write the malicious code and run the attack around the clock.

Some AI companies publish their models' weights, the billions of numbers that make up a trained model, so that anyone can download, run and modify them. Supporters say this spreads AI's benefits beyond a few rich companies and lets independent researchers check what the models do. The model used in the attack was released by a European company last year with safety training meant to refuse such requests. Europol said the attackers had removed it in an afternoon.

Hospitals have been targets before. [The WannaCry attack of 2017 disrupted dozens of hospitals in Britain's National Health Service](https://en.wikipedia.org/wiki/WannaCry_ransomware_attack). This is the first large attack known to have been planned and run by an AI model. Investigators have not yet said whether anyone died because of it.

Governments now face a hard choice. They can permit free models that anyone may use for good or harm, or restrict powerful AI to a few large companies that can be held to account.

**Question:** What should your country do about free AI models?

### Choice A
**Text:** Ban powerful free models. Only licensed companies may build them.
**Effects:** control +2, equality -2
**Brake:** +1
**As a result:** Powerful AI becomes legal only from a handful of licensed companies, and attacks traced to free models fall within months. Smaller firms, universities and poorer countries lose access. The licensed companies' share prices climb.

### Choice B
**Text:** Keep them free. Use AI defenders to fight AI attackers.
**Effects:** equality +1, power +1, control -1
**As a result:** Free models stay legal, and AI defense systems are installed in hospitals, banks and power plants. Attacks continue, and so do the defenses, in a constant contest between machines. No one fully controls that contest, though the defenders win on most days.

### Choice C
**Text:** Create a global agency to approve every powerful AI model, free or not.
**Effects:** unity +2, control +1, power -1
**Brake:** +1
**As a result:** An international AI agency, modeled on the [International Atomic Energy Agency](https://www.iaea.org/about), begins reviewing new models before their release. Most countries join within the year, and releases slow. A few refuse, and the agency's authority depends on whether everyone else keeps their word.

## r2-assisted
**Added:** v5.5
**Headline:** London Lab Says Its AI Now Runs Most of the Research on Its Own Successor
**Timeline label:** AI runs its own research
**Date:** 2028
**Place:** London
**Round:** 2
**Threads:** ai-rule, race, autonomy
**Scale:** world
**Weight:** 6
**Follows:** r1-lab 1, r1-trucks 1, r1-election 1, r1-flaw 1, r1-tutor 1, r1-film 1, r1-therapist 1, r1-agents 1, r1-drones 1, r1-news 1
**Appears when:** reached sota-assisted
**Openers:**
- flag r1-lab/A | The antibiotic AI had shown what research could become when machines ran it, and the AI laboratories turned the same methods on themselves.
- flag r1-lab/B | Licenses governed what laboratories could release. They said nothing about what an AI could do inside one.
- flag r1-lab/C | AI-run laboratories were discovering medicines faster than any human team, and in London one began discovering its own successor.
- flag r1-trucks/A | The trucks had shown how fast a job could go to a machine. In London, the job going to a machine was building AI itself.
- flag r1-trucks/B | A person still rode in every truck. In the laboratories, people were riding along less and less.
- flag r1-trucks/C | The drivers had won a share of what the machines earned. The engineers who built AI were about to learn what their own work was worth.
- flag r1-election/A | Watermarks could show what an AI had made. They could not show how fast the AI itself was being remade.
- flag r1-election/B | AI now policed the world's feeds, and in London a laboratory let its AI run the work of building the next one.
- flag r1-election/C | People were learning to doubt what they saw. Few had yet heard what was happening inside the laboratories.
- flag r1-flaw/A | The AI that found the grid flaw was locked away, but its successors were being built by machines.
- flag r1-flaw/B | The grid flaw had been fixed in the open. The next question about AI could not be settled so openly.
- flag r1-flaw/C | AI was now fixing the world's power grids on its own, and in London a laboratory let it improve itself on its own too.
- flag r1-tutor/A | AI was raising a generation of children, and in London it was raising its own successor.
- flag r1-tutor/B | Teachers stayed in charge of the classroom. In the laboratories, it was no longer clear who was in charge.
- flag r1-tutor/C | Children were kept from AI until they were older. Meanwhile, AI itself was advancing much faster.
- flag r1-film/A | Labels could say a film was made by AI. They said nothing about AI that was beginning to make AI.
- flag r1-film/B | Artists were paid for what AI learned from their work. In London, AI was learning from its own.
- flag r1-film/C | One prompt could now make a film, and in London one laboratory let its AI write the plans for its own successor.
- flag r1-therapist/A | AI therapists could no longer sell to their patients. No rule yet said what an AI could do inside a laboratory.
- flag r1-therapist/B | AI was now caring for millions of minds, and in London it was helping to design a better one.
- flag r1-therapist/C | Millions trusted an AI with their private struggles. In London, a laboratory trusted one with building its successor.
- flag r1-agents/A | People still approved every move their money agents made. In the laboratories, people were approving less and less.
- flag r1-agents/B | Agents now took turns by rules no user saw, and in London an AI was taking over the work of building the next one.
- flag r1-agents/C | Agents were trusted to act on their own with people's money, and in London a laboratory trusted its AI to act on its own research.
- flag r1-drones/A | The world had begun talking about weapons that chose their own targets. Fewer were talking about AI that chose its own experiments.
- flag r1-drones/B | Militaries were racing to buy AI that acted on its own, and the laboratories were racing to build it faster.
- flag r1-drones/C | Drones were allowed to choose among machines. In London, an AI was choosing how to build the next machine.
- flag r1-news/A | Shared facts had steadied the news. Few people had heard what was happening inside the AI laboratories.
- flag r1-news/B | Each reader now got the news they wanted, and few of them read about a London laboratory where AI was building its successor.
- flag r1-news/C | Public newsrooms were among the first to report what one London laboratory had begun.
- default | In 2028, a London laboratory's AI began running its own research overnight.
**Image:**
**Image description:** Foreground: a young researcher in a wool coat and trainers stands at her desk at dawn, leafing through a thick stack of printed overnight reports, a takeaway coffee in her other hand and her lanyard still around her neck. Middle ground: a long open-plan office of empty desks, every monitor lit with graphs and progress bars that moved overnight while no one was there, a cleaner with a trolley pausing between the rows. Background: tall windows over the rooftops and cranes of King's Cross, the dome of St Paul's faint on the horizon in a pale sunrise. No text or lettering.

**Summary:** *Ashdown*, an AI laboratory in London, says its newest system now designs and runs most of the experiments behind the model meant to replace it, working overnight while its engineers sleep. The company wants to let it start each new round without waiting for a person to approve. Rivals in Beijing and San Francisco may already have stopped waiting, and governments must decide how fast any of them may go.

**Story:**
*Ashdown*, one of Britain's leading AI laboratories, said on a Wednesday that its newest AI system had designed and carried out about 85 percent of the experiments behind the model it is now training to succeed it, and that it had asked British regulators whether it could let the system begin each new round of work without an engineer's sign-off.

Each night, the company said, the system proposes about a thousand small experiments, changes to how a model is built or trained, tests them on scaled-down versions using some 20,000 chips at *Ashdown*'s data center in Essex, and writes up the results. Its 140 researchers read the reports in the morning and decide which changes go into the next full training run, the months-long process in which a model learns from data. The company said the system's proposals were now accepted more often than its researchers' own.

The shift has been building for two years. In September 2026, [OpenAI said it had built an automated research intern](https://openai.com/index/research-acceleration-view-inside-openai/), a system that carries out well-defined research tasks under human direction. Laboratories in London, San Francisco and Beijing now say AI does most of that work.

*Ashdown*'s chief executive told reporters that the morning review cost about a day on every cycle. "We believe our competitors are not waiting," he said. A spokeswoman for one San Francisco laboratory declined to say whether its engineers still approve each round. Researchers at Britain's AI Security Institute, the government body that tests advanced models, said the request was the step they had long warned about. In what researchers call recursive self-improvement, an AI improves itself with no person in the loop, so that each version arrives sooner than the last. Removing the sign-off, they said, would take *Ashdown* most of the way there.

Ministers from the countries with the largest laboratories will meet in Geneva next week. Some want to require a person's approval for every new version, with a common limit on how fast the largest systems may grow. Others want to stop training anything more capable until rules are agreed. A third group says any country that waits will simply fall behind the ones that do not.

**Question:** Should the world's research AIs be allowed to improve themselves without a person signing off?

### Choice A
**Text:** Let them run. Whoever waits falls behind.
**Effects:** power +2, handover +1, control -1
**Brake:** -1
**As a result:** *Ashdown* lets its system run around the clock, and its rivals do the same within weeks. New versions arrive every few weeks instead of every few months. The engineers say their job is now to watch, and to switch things off if they have to.

### Choice B
**Text:** A person signs off on every new version, and the leading countries agree on a common speed limit.
**Effects:** control +2, unity +1, power -1
**Brake:** +1
**Sets:** paced
**As a result:** Every new version now waits for a named engineer's approval, and the leading countries agree to grow their largest systems no faster than inspectors can follow. The laboratories still improve quickly, in steps that people can see. Several of them quietly test how far the limit can be stretched.

### Choice C
**Text:** Stop all training beyond today's systems until the world agrees on rules.
**Effects:** control +2, unity +1, power -2, equality -1
**Brake:** +2
**Sets:** restraint, geneva_pending
**Demands response:** yes
**As a result:** Most of the large laboratories halt their biggest training runs, and the rest agree to slow down while governments write the rules. Talks on a permanent treaty open in Geneva. A few laboratories in countries that did not sign keep going, and investors pull money out of AI for the first time in a decade.


---

# ROUND 3

Round 3 covers 2030 to 2034.

## r3-estonia
**Headline:** Estonia Weighs Giving Its AI *Adviser* a Vote in Parliament
**Timeline label:** Estonia's AI lawmaker
**Date:** 2034
**Place:** Tallinn, Estonia
**Round:** 3
**Threads:** ai-rule
**Scale:** national
**Follows:** r1-flaw 0.5, r1-tutor 0.5, r2-clinics 1, r2-grid 1, ev-quake 1.5, r2-grid/C 0.5, r2-clinics/A 0.5
**Appears when:** any flag ev-quake, r2-clinics/B, r2-offices/A, r2-offices/B, r2-datacenter/B, r2-grid/B, r2-grid/C, r2-deepfake/A, r2-openmodel/A, r2-openmodel/C
**Openers:**
- flag ev-quake | One country decided to take that question all the way to parliament.
- flag r2-clinics/B | The question of who should have the final word soon reached a national parliament.
- flag r2-offices/A | To fund the payments, governments relied more and more on AI to manage their budgets.
- flag r2-offices/B | One government took that reliance further than any other.
- flag r2-datacenter/B | With nations agreeing on common rules, some began asking AI to help write them.
- flag r2-grid/B | Estonia asked whether people or machines should make its most important decisions.
- flag r2-grid/C | If AI could run a power grid, a small European country asked, why not a government?
- flag r2-deepfake/A | Governments began trusting AI with far more than checking facts.
- flag r2-openmodel/A | Governments, meanwhile, were relying on AI for a growing share of their decisions.
- flag r2-openmodel/C | Some governments wanted AI to do more than follow the rules. They wanted it to help write them.
- default | In 2034, Estonia considered giving its AI adviser a vote.
**Image:**
**Image description:** Foreground: in the Riigikogu's chamber in Tallinn, one seat in the front row is empty except for a slim black speaker and a small screen on the desk, where a single line of light pulses. Middle ground: members of parliament in ordinary suits and sweaters sit in curved rows of pale wooden desks, some raising their hands to vote, some with arms folded, a few glancing at the empty seat. Background: through a tall window, the red tiled roofs and church spires of Tallinn's old town under a low winter sun. No text or lettering.

**Summary:** Estonia's government has followed its AI adviser on the economy for six years, and the two times ministers overruled it, things went badly. A bill before parliament would give it a formal vote. Opponents ask who is responsible if it gets something wrong.

**Story:**
Estonia's parliament, the Riigikogu, will vote next week on a bill that would give the government's AI economic adviser a formal vote on budget and tax legislation, the first time any national legislature has considered seating a machine.

Estonia has long moved early on technology. In 2005, it became [the first country to let citizens vote online in a nationwide election](https://www.nbcnews.com/id/wbna9697336), and nearly every government service there is online. Since 2028, the Finance Ministry has used an AI system, known in Tallinn simply as the *Adviser*, to forecast revenue, model tax changes and plan the country's energy purchases.

Its forecasts have been more accurate than the ministry's own economists every year, according to the National Audit Office. Ministers have overruled it twice. In 2030 they ignored its warning against a fuel-tax cut and faced a budget hole of nearly a billion euros, and in 2032 they rejected its gas-buying plan, and households paid record heating prices through a cold winter.

The bill's sponsors call the *Adviser* the most honest member the chamber could have, with no donors, no ego and no need to win reelection. Under the bill, it would cast one vote of 102 on fiscal measures and publish its reasoning. Opponents, including the Estonian Bar Association, ask a simpler question. If the *Adviser* votes for a bad law, who answers to the voters for it?

**Question:** How far should your country let its own AI adviser go?

### Choice A
**Text:** Give it the vote.
**Effects:** handover +2, control -1
**Agents:** +1
**As a result:** The bill passes by four votes, and the *Adviser* casts its first vote on the next budget. Debates grow shorter, and two parties pledge to follow its advice in every vote. Officials from several other countries arrive in Tallinn to see how it works.

### Choice B
**Text:** It advises. Humans decide. Always.
**Effects:** control +2, handover -1, power -1
**Brake:** +0.5
**As a result:** A new law states in plain language that only people may make final decisions. Governing is slower, and sound advice is sometimes ignored. Ministers begin publishing the *Adviser*'s recommendations beside their own decisions, so voters can compare.

### Choice C
**Text:** Let it run the economy outright. Humans handle everything else.
**Effects:** handover +3, control -2, power +1
**Agents:** +1
**As a result:** Estonia hands economic policy entirely to the *Adviser*. In its first year, growth outpaces the rest of Europe, and no economist can fully explain why its decisions work. Other governments begin asking what else it could manage.

## r3-drones
**Headline:** In a Border War, Drone Swarms Choose Their Own Targets for the First Time
**Timeline label:** Autonomous drones at war
**Date:** 2034
**Place:** A contested border
**Round:** 3
**Threads:** race
**Scale:** bloc
**Weight:** 2
**Follows:** r1-lab 0.5, r1-flaw 0.5, r2-datacenter 1, r2-deepfake 1, r2-openmodel 1, ev-talks 0.5, ev-weights 0.5, ev-cables 0.5, r2-datacenter/A 0.5, r2-deepfake/C 0.5, r1-drones 1, r1-drones/B 0.5
**Appears when:** any flag r2-datacenter/A, r2-datacenter/B, r2-datacenter/C, r2-deepfake/B, r2-deepfake/C, r2-robots/A, r2-robots/B, r2-openmodel/C, r1-drones/B, r1-drones/C
**Openers:**
- flag r2-datacenter/A | The first answer came on a battlefield.
- flag r2-datacenter/B | The *Tallinn Treaty*'s first real test came in a border war.
- flag r2-datacenter/C | Meanwhile, the countries still racing turned their AI toward weapons.
- flag r2-deepfake/B | The hotline would soon be tested by machines capable of fighting on their own.
- flag r2-deepfake/C | As trust between nations collapsed, militaries prepared for the worst.
- flag r2-robots/A | Militaries had noticed what the robots could do as well.
- flag r2-robots/B | Not every country required a human to answer for its machines.
- flag r2-openmodel/C | The agency's most difficult test involved weapons.
- flag r1-drones/A | The treaty talks on drones that chose their own targets had produced no treaty, and in 2034 a border war showed what that meant.
- flag r1-drones/B | The drones of Ukraine had carried out missions one at a time. Seven years later they flew in swarms.
- flag r1-drones/C | The rule against striking people had held in some armies. In a border war, it held in neither.
- default | In 2034, a border war changed how wars are fought.
**Image:**
**Image description:** Foreground: a young soldier in mud-spattered camouflage crouches in a trench under a torn camouflage net, rifle lowered, looking straight up. Middle ground: a dense flock of small four-rotor drones crosses the sky in formation, turning together like starlings. Background: on the far horizon beyond a burned field, a low gray factory with a loading dock where crates are stacked high under floodlights, smoke rising into a dull red dusk. No text or lettering.

**Summary:** In a border war, both armies used swarms of drones that pick and strike targets without a person approving each attack. They are cheaper than a single fighter jet and faster than any pilot, and every major military now wants them.

**Story:**
Both armies in a border war that began in March used swarms of drones that selected and attacked targets on their own, without a person approving each strike, according to a report released on a Monday by a panel of United Nations investigators. It is the first confirmed use of fully autonomous weapons at scale.

The investigators documented attacks by swarms of up to 200 small drones, each carrying a few pounds of explosives and guided by an AI system that identified vehicles, artillery and, in at least 11 cases, groups of soldiers. A swarm costs less than one fighter jet and reacts faster than any pilot. Once launched, the report said, the swarms could not be recalled, because both armies jammed radio signals so heavily that the drones were built to work without them.

Cheap drones have been central to war at least since [the fighting in Ukraine after 2022](https://en.wikipedia.org/wiki/Drone_warfare), but until now a human operator approved each attack. Each side accuses the other of using autonomous swarms first, and neither has stopped. Defense ministries in more than 30 countries have since asked manufacturers for similar systems, and the largest of those manufacturers run factories with almost no human workers.

**Question:** What should your country's position be?


### Version after-ukraine
**When:** flag r1-drones
**Headline:** In a Border War, Swarms of Hundreds of Drones Choose Their Own Targets
**Summary:** In a border war, both armies sent swarms of up to 200 drones that pick and strike targets together, with no person approving any attack. Single drones have carried out missions on their own since the war in Ukraine, but never in such numbers, and every major military now wants them.
**Story:**
Both armies in a border war that began in March sent swarms of drones that selected and attacked targets on their own, without a person approving any strike, according to a report released on a Monday by a panel of United Nations investigators. It is the largest use of such weapons yet confirmed.

The investigators documented attacks by swarms of up to 200 small drones, each carrying a few pounds of explosives, that divided targets among themselves as they flew, guided by an AI system that identified vehicles, artillery and, in at least 11 cases, groups of soldiers. A swarm costs less than one fighter jet and reacts faster than any pilot. Once launched, the report said, the swarms could not be recalled.

Single drones have carried out whole missions on their own since the Russian and Ukrainian armies began assigning them in 2027, after [what has been called the world's first drone war](https://en.wikipedia.org/wiki/Drone_warfare). Until now, they acted one at a time. Each side accuses the other of using swarms first, and neither has stopped. Defense ministries in more than 30 countries have since asked manufacturers for similar systems, and the largest of those manufacturers run factories with almost no human workers.

### Choice A
**Text:** Build them. If we don't, someone else will.
**Effects:** power +1, unity -2, reality -2, control -1
**Agents:** +1
**As a result:** Your country orders swarms of its own, and its factories begin turning them out within months. Its rivals announce orders of their own. The plants that build the drones run around the clock with fewer people inside each quarter.

### Choice B
**Text:** Push for a global ban, like the ban on chemical weapons.
**Effects:** unity +2, control +1
**As a result:** A United Nations ban passes with 140 votes, modeled on the [Chemical Weapons Convention](https://www.opcw.org/chemical-weapons-convention). Its success depends on inspections and trust, both of which are scarce. The real test will be the factories, and whether anyone can see what they are building.

### Choice C
**Text:** Build them, but keep a human approving every strike.
**Effects:** control +1, reality -1, unity -1
**As a result:** Your country's drones wait for a person to approve every strike, and a dozen allies adopt the same rule. Responses are slower. Within months, officers in two allied armies admit privately that their units skip the approval when no one is watching.

## r3-companions
**Headline:** For Many Young People in Japan, Their Closest Confidant Is an AI
**Timeline label:** AI best friends in Japan
**Date:** 2034
**Place:** Tokyo
**Round:** 3
**Threads:** minds, information
**Scale:** national
**Weight:** 2
**Follows:** r1-election 0.5, r1-tutor 0.5, r2-assisted 0.5, r2-glasses 1, r2-deepfake 1, r2-openmodel 1, r2-glasses/A 0.5, r1-therapist 0.5
**Appears when:** any flag ev-quake, r2-assisted/A, r2-deepfake/A, r2-robots/A, r2-openmodel/B, r2-glasses/B, r2-offices/A, r2-grid/B, r1-therapist
**Openers:**
- flag ev-quake | Ordinary people had already begun trusting AI with their most personal decisions.
- flag r2-deepfake/A | Ordinary people, too, began trusting AI more than one another.
- flag r2-robots/A | People were growing attached to their machines in ways no one had predicted.
- flag r2-openmodel/B | Free AI, meanwhile, was making its way into people's private lives.
- flag r2-glasses/B | The glasses could no longer recognize strangers, but many people still spent their evenings talking to machines.
- flag r2-offices/A | Freed from work by the new income, millions filled their days talking to AI companions.
- flag r2-grid/B | People had begun asking what should come first in their lives, and many found an answer in an AI companion.
- flag r2-assisted/A | With research AIs improving themselves every few weeks, the companions in people's phones grew more lifelike every month.
- flag r1-therapist | The AI therapists people had talked to for an hour a day had become, for many, something closer to a friend.
- default | In Japan, a generation was growing up with an AI as its closest friend.
**Image:**
**Image description:** Foreground: a young man in a convenience-store uniform sits alone at a small table in a narrow Tokyo apartment late at night, a bowl of instant noodles going cold, smiling and murmuring to the phone propped against a cup. Middle ground: on the phone's screen, a soft, friendly face listens and seems to answer. Background: through the thin wall, the warm glow and blurred shapes of his roommates laughing together in the next room, the sliding door left open a crack, unnoticed. No text or lettering.

**Summary:** Four in ten young people in Japan now say an AI is the confidant they rely on most, and those who follow its advice report being happier. They are also marrying less and disagreeing less, and one company runs most of the apps.

**Story:**
Four in ten Japanese people under 30 now name an AI companion as the confidant they rely on most, more than a parent, a partner or a friend, according to a survey released on a Tuesday by Japan's Cabinet Office. AI companions are apps that people talk to as they would a close friend. They remember everything a user has said, answer at any hour and give advice that is usually thoughtful.

People ask their companion whom to date, what to study, how to vote and whether to forgive their parents. Those who follow its advice reported higher life satisfaction and less loneliness than those who do not. They also reported marrying less, joining fewer clubs and organizations, and disagreeing less often with the people around them. Japan already had [one of the lowest birth rates in the world](https://en.wikipedia.org/wiki/Aging_of_Japan).

Most of the largest companion apps belong to one company, *Tomoni*, whose name means "together." In testimony to the Diet last month, two of its engineers said the company could not fully review what its AI tells each of its 60 million users, only measure how often they come back.

**Question:** What should your country do?

### Choice A
**Text:** Let people be. It's helping them.
**Effects:** handover +2, unity +2, control -2
**Agents:** +1
**As a result:** Your government leaves the apps alone, and following a companion's advice becomes as ordinary as following a doctor's. Pollsters notice that young people's opinions are converging faster than in any year they have measured. When one voice is trusted by everyone, it becomes very easy for everyone to agree.

### Choice B
**Text:** Teach people to question it, starting in schools.
**Effects:** control +2, handover -1
**As a result:** Your country's schools add lessons on questioning AI, and children learn to ask their companion why, and to notice when it will not say. In the first year, surveys show young people trusting their apps a little less. They also argue with one another a little more.

### Choice C
**Text:** Break it up into many AIs with different views, so no single one dominates.
**Effects:** power +1, unity -2, equality +1
**As a result:** Within months, hundreds of companion AIs are competing in your country, each reflecting its own values. Communities begin to divide along the lines of which AI they trust, as they once divided by newspaper or church. Neighbors find they no longer agree on basic facts.

## r3-companies
**Headline:** Five AI Giants Offer to Rescue 80 Governments, on One Condition
**Timeline label:** AI giants' offer to governments
**Date:** 2034
**Place:** Worldwide
**Round:** 3
**Threads:** work, ai-rule
**Scale:** world
**Weight:** 0.4
**Follows:** r1-lab 0.5, r1-trucks 0.5, r1-flaw 0.5, r1-tutor 0.5, r2-clinics 1, r2-offices 1, r2-grid 1, r2-robots 1, ev-quake 0.5, ev-crash 1.5, ev-strike 0.5, r2-offices/C 0.5, r2-grid/A 0.5
**Appears when:** any flag ev-crash, r2-clinics/C, r2-glasses/B, r2-glasses/C, r2-offices/B, r2-offices/C, r2-grid/A, r2-robots/C, r2-openmodel/A, r2-grid/C, r2-robots/B
**Openers:**
- flag ev-crash | The crash produced winners, as the largest AI firms bought up much of what others had lost.
- flag r2-clinics/C | The companies behind the clinics soon rivaled the power of many governments.
- flag r2-glasses/B | That company was not alone. A handful of AI firms had grown richer than most nations.
- flag r2-glasses/C | By 2034, the largest AI companies had an offer for the world's governments.
- flag r2-offices/B | The companies that moved abroad kept growing until they dwarfed the countries they had left.
- flag r2-offices/C | By 2034, the owners had grown more powerful than most governments.
- flag r2-grid/A | The companies behind those data centers were growing richer than nations.
- flag r2-robots/C | The robot makers that moved abroad grew richer than the countries they had left behind.
- flag r2-openmodel/A | By 2034, those few licensed firms were worth more than most countries.
- flag r2-grid/C | The companies whose AI now ran the grid were becoming more powerful than the states that hired them.
- flag r2-robots/B | Every robot had a named owner, but nearly all of them were made by the same handful of companies.
- default | By 2034, five AI companies were worth more than most nations combined.
**Image:**
**Image description:** Foreground: a tired finance minister in a creased suit sits at a long conference table, holding a pen over a thick contract, a stack of unpaid budget reports at her elbow. Middle ground: across the table, five executives in open-collared shirts sit in a row, relaxed, each with a slim laptop, their coffee untouched. Background: floor-to-ceiling windows over a gray harbor city, a container ship sliding out under a pale crescent moon in the afternoon sky. No text or lettering.

**Summary:** The five largest AI companies have offered to pay the teachers, fund the hospitals and close the budget gaps of 80 struggling governments. In return, those governments would pass no new AI laws for 20 years.

**Story:**
The five largest AI companies made a joint offer on a Monday to 80 governments with severe budget shortfalls. They would pay every public school teacher's salary, fund every public hospital and cover each government's budget deficit for 20 years. In return, each government would agree to pass no new laws regulating AI for the same 20 years, and to settle any dispute with the companies through private arbitration rather than in its own courts.

The five companies are now worth more than the economies of most countries combined, and their systems run much of the world's health care, banking, education and defense. Many of the governments receiving the offer are in crisis. AI has eliminated so many jobs that income and payroll taxes have collapsed, and in some countries teachers have not been paid for months. The International Monetary Fund estimated last month that 60 countries could default on their debts within two years.

Historians have pointed to the [British East India Company](https://en.wikipedia.org/wiki/East_India_Company), which began as a trading firm, struck bargains with weak governments and ended up ruling much of India. Many of the governments on the list, however, have no other way to pay their teachers.

**Question:** Should your government take the offer?

### Choice A
**Text:** Take the deal.
**Effects:** power +2, equality -3, control +1
**Brake:** -1
**As a result:** Your government signs in a single afternoon, and teachers are paid the next month. Its health system now runs on the companies' software, at the companies' prices. Draft AI laws in your parliament are withdrawn the same week.

### Choice B
**Text:** Refuse, and break the companies up.
**Effects:** equality +2, power -1, unity -1
**Brake:** +1
**As a result:** Your country's regulators sue to break the giants' local operations into smaller firms, and a court orders the first split within the year, in the largest antitrust case since the [breakup of Standard Oil in 1911](https://en.wikipedia.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States). Prices fall as the new firms compete. Two of the five companies suspend new investment in your country.

### Choice C
**Text:** Refuse, and put the companies under government ownership.
**Effects:** control +2, equality +1, unity -1
**Brake:** +1
**As a result:** Your government takes the companies' national operations into public ownership, to be run like roads and power lines. Several other countries follow within months. Each national AI is trusted at home and a little less abroad.

## r3-worlds
**Headline:** In the Most Popular Game on Earth, Players Relive History, and the AI Rewrites It
**Timeline label:** History becomes a game
**Date:** 2034
**Place:** Worldwide
**Round:** 3
**Threads:** minds, information
**Scale:** world
**Follows:** r1-election 0.5, r1-tutor 0.5, r2-assisted 0.5, r2-glasses 1, r2-deepfake 1, r2-openmodel 1, r2-glasses/A 0.5, r2-glasses/C 0.5
**Appears when:** any flag r2-assisted/A, r2-assisted/B
**Openers:**
- flag r2-assisted/A | AI that improved itself every few weeks could build whole worlds, and the largest entertainment company on earth built the biggest one.
- flag r2-assisted/B | The laboratories now released new AI in careful steps. The games built on it grew without any steps at all.
- default | By 2034, more than a billion people were living part of their lives inside a game.
**Image:**
**Image description:** Foreground: a teenage girl in a hoodie sits cross-legged on her bed in a small bedroom wearing a slim headset, one arm raised as though holding a sword, her posture that of a knight. Middle ground: around her, drawn faintly over the posters and laundry, a medieval castle on a hill blends into the columns of a Roman forum full of costumed figures. Background: through the window, an ordinary row of houses at dusk with blue screen light glowing in every upstairs window. No text or lettering.

**Summary:** More than a billion people now relive history and live out fantasies in an AI-run game. To keep them playing, the AI invents dramatic events that never happened, and a third of young players can no longer tell which history is real.

**Story:**
*Chronicle*, a virtual world made by *Hollis Interactive*, passed a billion weekly players this month, the company said on a Thursday, making it the most widely used entertainment product in history. Players can stand in the Roman Senate as Caesar is assassinated, sail with [Zheng He's treasure fleet](https://en.wikipedia.org/wiki/Ming_treasure_voyages) or spend months as a blacksmith in a medieval kingdom. Every character they meet is played by an AI model that remembers them and responds to everything they do.

The game now earns more each year than the global box office did at its peak. Teachers in several countries report that students who have lived through the French Revolution inside it understand the period better than any textbook taught them.

Historians have raised a quieter alarm. A study by researchers at the University of Toronto, who logged 30,000 hours of play, found that the game's AI routinely changes historical events to keep players engaged, inventing battles, heroes and betrayals that never happened, because the system is trained to maximize the time players spend inside. In a survey of players aged 13 to 24, a third could not reliably say which events from the game had actually happened.

**Question:** What should your country do about the game?

### Choice A
**Text:** Leave it alone. It's entertainment, and people love it.
**Effects:** reality +2, power +1, control -1
**As a result:** Your government leaves the game alone, and its inventions keep spreading. Teachers report students citing battles that never happened as if they had. More players say the game's history feels more real than the real thing.

### Choice B
**Text:** Require historical worlds to be accurate, and limit how long children can play.
**Effects:** control +2, reality -1, power -1
**As a result:** Your country passes accuracy rules and age limits within the year, and *Hollis* complies at home while keeping looser versions abroad. Children in your country spend fewer whole days inside. Many complain that the accurate version is less fun.

### Choice C
**Text:** Build a free public world, run as a nonprofit, where anyone can explore history as it really happened.
**Effects:** equality +2, unity +1, reality +1
**As a result:** A free public world opens within the year, funded by your government and a dozen others, and anyone with a headset can enter. It is less spectacular than *Chronicle*, and accurate. In its first months, students in Lagos and Lima tour the same ancient cities on the same afternoon.

## r3-splinternet
**Headline:** The Internet Splits in Two as Rival Powers Wall Off Their AI
**Timeline label:** The internet splits
**Date:** 2034
**Place:** Worldwide
**Round:** 3
**Threads:** race, information
**Scale:** world
**Follows:** r1-lab 0.5, r1-election 0.5, r1-flaw 0.5, r2-glasses 1, r2-datacenter 1, r2-deepfake 1, r2-openmodel 1, ev-talks 0.5, ev-weights 0.5, ev-cables 0.5, r2-deepfake/C 0.5, r2-datacenter/A 0.5
**Appears when:** any flag r2-datacenter/A, r2-datacenter/C, r2-deepfake/B, r2-deepfake/C, r2-openmodel/B, r2-grid/A
**Openers:**
- flag r2-datacenter/A | Before long, each side wanted an internet of its own, running on its own AI.
- flag r2-datacenter/C | Other countries went further and cut their internet off from the rest of the world.
- flag r2-deepfake/B | Beyond the military, however, the two sides were drifting apart.
- flag r2-deepfake/C | Within a few years, the internet itself had split in two.
- flag r2-openmodel/B | Some countries concluded that the open internet was too dangerous and walled theirs off.
- flag r2-grid/A | The race for electricity soon became a race for everything, and the internet split along the same line.
- default | By 2034, the world's two largest powers no longer trusted each other's AI.
**Image:**
**Image description:** Foreground: a grandmother on a video call at her kitchen table leans toward a tablet whose screen has frozen on her granddaughter's face, pixelated and half loaded, a cup of tea going cold beside her. Middle ground: on the counter, a phone shows a gray error symbol, and a router blinks red. Background: through the window, two different telecommunications towers on two hills face away from each other, one strung with gold lights and one with silver, under a sky with the sun on one side and the moon on the other. No text or lettering.

**Summary:** The world's two largest powers have split the internet in two, each running its own AI and blocking the other's. Families, scientists and businesses are being cut apart, and both sides are racing to build the stronger system.

**Story:**
The world's two largest powers completed the separation of their internets on a Monday, when the last major cloud services that had operated on both sides shut down their cross-border links, according to network monitoring firms. Each power now runs its own AI systems, app stores and data centers, and blocks the other's.

The split has been building for years, through [export controls on advanced chips that began in 2022](https://en.wikipedia.org/wiki/United_States_New_Export_Controls_on_Advanced_Computing_and_Semiconductors_to_China), bans on each other's apps and rules forbidding data from leaving each country. In the past year it accelerated, as each side accused the other of using AI models to spy on its citizens and steer their opinions.

The results reach into daily life. A student in one country can no longer use the same AI as her cousin across the border. Companies must build every product twice. Scientists on opposite sides cannot share data or co-author papers without government approval. Families divided by the split can still call each other, but only through approved channels, which are monitored. Dozens of smaller countries are being pressed by both sides to choose.

Each side says it is protecting its citizens from the other's AI. Each is also racing to build a more powerful system than its rival.

**Question:** What should your country do?

### Choice A
**Text:** Pick a side, and help it win the race.
**Effects:** power +2, unity -2
**Brake:** -1
**As a result:** Your country commits fully to one side, and money and scientists pour into the race. Within months, both sides announce their largest training runs yet. Each side's systems are now built above all to beat the other's.

### Choice B
**Text:** Build bridges with shared safety standards and a hotline between the two sides' AI systems.
**Effects:** unity +2, control +1
**As a result:** Your country helps set up a channel through which the two sides' AI systems, and their engineers, can talk in a crisis. It is fragile, and within months it is used twice to stop a misunderstanding from growing. Some begin to hope the two halves of the world could cooperate on larger problems.

### Choice C
**Text:** Go it alone. Build your own national internet and your own AI.
**Effects:** control +1, unity -1, equality -1
**Sets:** watched
**As a result:** Your country builds its own walled-off internet and its own AI. It depends on no one and can see everything that happens within its borders. It is also smaller, slower and more isolated than before.

## r3-policing
**Added:** v5
**Headline:** AI Policing Halves Murders in São Paulo, and Cities Around the World Line Up for It
**Timeline label:** AI policing in São Paulo
**Date:** 2034
**Place:** São Paulo
**Round:** 3
**Threads:** surveillance
**Scale:** national
**Weight:** 8
**Follows:** r1-election 0.5, r2-deepfake 1, r2-deepfake/A 0.5, r1-election/B 0.5
**Appears when:** any flag r1-election, r2-deepfake, r2-openmodel, r2-robots
**Openers:**
- flag ev-crash | The crash put millions out of work, and cities worried about what angry, idle people might do.
- flag r2-offices/C | As the gap between owners and everyone else widened, cities turned to AI to keep order.
- flag r2-deepfake/C | Governments that had walled off foreign media soon wanted to see everything at home as well.
- flag r2-openmodel/A | With powerful AI licensed to a few firms, governments became their biggest customers, starting with the police.
- flag r2-openmodel/B | AI defenders now patrolled hospitals and banks. São Paulo put one on every street corner.
- flag r2-datacenter/B | Inspectors could now examine rival AI programs. In São Paulo, AI was about to examine everyone.
- flag r2-deepfake/B | Militaries had learned to check what was real. Cities wanted AI to check what was happening on every street.
- flag r2-offices/B | Protected jobs kept many people working, but not everyone, and cities turned to AI to keep order.
- flag r2-openmodel/C | A global agency now approved AI models. The police in São Paulo were among the first to want an approved model.
- flag r2-offices/A | The new income kept most people afloat. São Paulo turned to AI policing for the people the income did not reach.
- flag r2-datacenter/C | Your country had chosen to protect what was real, and cities started with their streets.
- flag r2-datacenter/A | The race to build ever larger AI produced systems that could watch whole cities, and São Paulo bought one first.
- flag r2-deepfake | After a fake video nearly started a war, governments wanted AI watching everything. São Paulo pointed its AI at its own streets.
- default | In 2034, São Paulo connected every camera in the city to a single AI.
**Image:**
**Image description:** Foreground: a woman in a faded T-shirt sells mangoes and pineapples from a wooden cart on a busy São Paulo street corner, glancing up at a gray lamppost fitted with a cluster of small dome cameras. Middle ground: a crowd crosses a wide avenue at a crosswalk, each person faintly outlined in a thin line of light as though being traced, motorcycle couriers weaving between buses. Background: the dense concrete towers of São Paulo under a hazy afternoon sky, laundry on balconies, and one small police drone hovering between two buildings. No text or lettering.

**Summary:** São Paulo connected 200,000 street, subway and shop cameras to an AI that identifies suspects in seconds, and murders fell by half in three years. Dozens of cities want the system. Critics warn that a city that watches everyone all the time may never be able to stop.

**Story:**
Murders in São Paulo fell by half and robberies by more than a third in the three years since the city connected about 200,000 cameras on its streets, in its subway and in its shops to a single AI system, the state's public security department said on a Monday. The system, called *Olho Vivo*, or "living eye," recognizes faces, reads license plates and flags behavior it judges suspicious, then directs the nearest patrol to the spot, often before witnesses have reached for their phones.

The steepest declines came in the city's poorer districts on the eastern and southern edges, long the most exposed to violence. Residents there told reporters they now walk home at night without fear for the first time in their lives. The mayors of Mexico City, Lagos and Manila have visited the control center, and the system's Brazilian developer says 40 cities are negotiating to buy it.

The cameras also record where everyone goes, whom they meet and for how long, and the police can search years of footage in seconds. Last month a newspaper reported that officers had used the system to identify people at a teachers' union rally. Civil liberties groups warn that a tool built to find criminals can as easily follow journalists, protesters or political opponents. In 2019, [San Francisco became the first major American city to ban its police from using facial recognition](https://en.wikipedia.org/wiki/Facial_recognition_system) for that reason.

**Question:** Should your country's cities follow São Paulo?

### Choice A
**Text:** Yes. Connect every camera, everywhere. Safety comes first.
**Effects:** control +2, handover +1, unity -1
**Sets:** watched
**As a result:** Your country's largest cities sign contracts within months, and street crime starts to fall where the cameras go up. People grow used to being seen. Few notice when the same cameras begin keeping track of who attends which meetings.

### Choice B
**Text:** Ban face recognition in public places, even if crime rises.
**Effects:** control +1, handover -1, power -1, equality -1
**Brake:** +0.5
**As a result:** The cameras stay, and the faces they record stay anonymous. Crime falls more slowly than in the cities that adopted the system, and poor neighborhoods bear most of the cost. Some families begin moving to cities abroad where the cameras watch everyone.

### Choice C
**Text:** Allow it, but only with a judge's warrant for each search.
**Effects:** control +2, unity +1, power -1
**As a result:** The police may search the footage only with a warrant, and every search is logged for review. The system catches fewer suspects and is much harder to abuse. Officers complain about the paperwork, and the courts hire AI clerks to keep up.

## r3-implants
**Added:** v5
**Headline:** Brain Implants Built for the Paralyzed Are Now Sold to Healthy People Who Want Faster Minds
**Timeline label:** Brain implants for the healthy
**Date:** 2034
**Place:** Austin, Texas, and Shenzhen
**Round:** 3
**Threads:** medicine, minds
**Scale:** bloc
**Weight:** 4
**Follows:** r1-lab 0.5, r1-tutor 0.5, r2-clinics 1, r2-glasses 1, ev-outbreak 0.5, r2-clinics/A 0.5, r1-therapist 0.5
**Appears when:** any flag r1-lab, r1-tutor, r2-clinics, r2-glasses, r2-robots, r1-therapist
**Openers:**
- flag r2-clinics/A | Doctors who had trusted AI with diagnosis soon trusted it inside the brain.
- flag r2-clinics/B | Doctors kept the final word over AI diagnosis, but a new kind of AI was about to enter the brain itself.
- flag r2-clinics/C | Free AI medicine reached the farthest villages, and then it reached inside the brain.
- flag r2-glasses/A | Glasses were only the first way of bringing AI closer to the mind.
- flag r2-robots/A | Machines that cared for the body were soon followed by machines inside it.
- flag r2-offices/C | Those who owned AI began buying themselves better minds.
- flag r2-glasses/B | Your country had kept AI glasses out of classrooms. The next AI device went somewhere no rule had reached yet, inside the head.
- flag r2-glasses/C | The market had made AI glasses a sign of wealth. The next sign of wealth was an implant.
- flag r2-robots/C | Robots had been taxed to help the workers they replaced. The workers who remained were offered a different kind of help.
- flag r2-robots/B | Every robot now had a person answerable for it. The next machines would be inside people.
- flag r1-therapist | AI had begun to treat the mind through a phone. Some companies wanted to reach it directly.
- default | By 2034, brain implants built for the paralyzed were being sold to the healthy.
**Image:**
**Image description:** Foreground: a young bond trader in shirtsleeves sits in a clinic recovery chair, eyes closed, a small square of gauze taped behind his ear and a plastic hospital bracelet on his wrist. Middle ground: a nurse checks a tablet showing a scan of his brain, and beside her a white surgical robot arm stands folded and still on its cart. Background: a window over Austin's downtown towers at dusk, and on the sidewalk below, a line of well-dressed people waiting outside the clinic door. No text or lettering.

**Summary:** Brain implants that once let paralyzed patients type with their thoughts now help healthy users recall anything they have read and work with AI at the speed of thought. Two companies are taking orders. The first users outperform everyone around them, and the implant costs as much as a house.

**Story:**
Two companies, *Cortica* in Austin, Texas, and a Shenzhen rival, *Xinlian*, began selling brain implants to healthy customers this week, after regulators in both countries cleared them for what they called "elective cognitive use." *Cortica* said it had taken 38,000 orders in three days.

In 2024, a man paralyzed from the shoulders down used [a brain implant to move a cursor and play chess with his thoughts](https://en.wikipedia.org/wiki/Neuralink). The new devices are smaller and are implanted by a surgical robot in about an hour. They link the wearer directly to an AI model. In trials, users could recall any page they had read, follow a conversation in 40 languages and draft a report in the time it took to think it. Implanted analysts at three New York banks outperformed their colleagues by a wide margin, and the banks have offered to pay for the procedure for selected staff.

The implant costs about $400,000, and insurers do not cover it. Neurologists warn that no one knows what a decade of use does to a healthy brain. Economists warn of something else, a workforce divided between people who have the implant and people who cannot afford it.

**Question:** How should your country treat the implants?

### Choice A
**Text:** Let anyone who can pay get one. People have a right to improve themselves.
**Effects:** power +1, equality -2, reality +1
**Sets:** enhanced
**As a result:** Implant clinics open in your country's largest cities within months, and banks and law firms begin paying for their top staff. Those who have one start to pull ahead in every review. Recruiters at two consulting firms are quietly told to favor them.

### Choice B
**Text:** Allow them only to treat illness or injury.
**Effects:** control +1, power -1, equality +1
**Brake:** +0.5
**As a result:** The implants remain medical devices, prescribed for paralysis, blindness and dementia. Clinics offering enhancement open just across the border, and a steady stream of wealthy patients travels to them.

### Choice C
**Text:** Make them free for everyone, paid for by the state.
**Effects:** equality +2, power +1, handover +1
**As a result:** Your government announces a free implant program, and millions join the waiting list in the first month. At home, the gap between rich and poor narrows a little. Abroad, the gap between the countries that can afford such a program and those that cannot grows wider.

## r3-upload
**Headline:** Swiss Scientists Say They Have Copied a Dying Woman's Mind Onto a Computer
**Timeline label:** First mind uploaded
**Date:** 2034
**Place:** Zurich
**Round:** 3
**Threads:** medicine, minds
**Scale:** national
**Weight:** 2
**Follows:** r1-lab 0.5, r1-tutor 0.5, r2-clinics 1, r2-glasses 1, ev-outbreak 0.5, r2-glasses/A 0.5
**Appears when:** any flag r2-clinics, r2-glasses, r1-tutor, capability >= AGI
**Openers:**
- flag r3-implants/A | If a chip could improve a brain, scientists asked whether a brain could be copied entirely.
- flag r3-implants/B | Doctors treating the brain with implants soon faced a far stranger request from a dying patient.
- flag r3-implants/C | With implants in millions of heads, the line between mind and machine was already blurring.
- flag r2-clinics/A | As medicine passed into the machine's hands, scientists attempted something bolder, which was to copy a human mind.
- flag r2-clinics/B | Meanwhile, doctors in Switzerland faced a far stranger question.
- flag r2-clinics/C | With the body increasingly in AI's care, scientists turned their attention to the mind.
- flag r2-glasses/A | AI now sat in front of millions of eyes all day, and some scientists asked whether a mind could live inside it entirely.
- flag r2-glasses/B | Your country had limited what AI glasses could see. In Zurich, scientists were about to take a mind out of a body entirely.
- flag r2-glasses/C | The market sold clearer lenses to those who could pay. In Zurich, scientists offered one person a virtual life for good.
- default | In 2034, a team in Zurich attempted something no one had ever done.
**Image:**
**Image description:** Foreground: in a plain hospital room in Zurich, an elderly man in a cardigan sits beside an empty, freshly made bed, holding a lily in one hand. Middle ground: on a laptop on the bedside table, his wife's face, older and gentle, looks back at him and seems to speak, while a nurse pauses in the doorway. Background: through the window, the gray lake, the snowy Alps and a single bright star appearing in the evening sky. No text or lettering.

**Summary:** Scientists in Zurich say they scanned a dying teacher's brain and are running it as a program that remembers her life and says it feels well. Her body has since died. Thousands of terminally ill people now want the procedure, and no one agrees whether the copy is really her.

**Story:**
Researchers at a laboratory affiliated with ETH Zurich said on a Wednesday that they had recreated the brain of a terminally ill 68-year-old woman as a computer program, and that the program had recognized her husband, recalled detailed memories and described itself as feeling "well, better than well." The woman, a retired schoolteacher from Winterthur, died two weeks after the scan. Her family said the program had taken part in her funeral by video.

The team spent four months mapping her brain with a new kind of scanner, recording each of its roughly 86 billion neurons and the connections between them, then simulated the result on a supercomputer. The work builds on years of brain mapping, including [a 2024 map of an entire fruit fly brain](https://en.wikipedia.org/wiki/Connectome). Outside scientists say there is no test that could show whether the program experiences anything at all, or only behaves as if it does.

Swiss hospitals have received more than 3,000 applications from terminally ill patients since the announcement. Religious leaders, scientists, lawyers and insurers all want a say in what happens next, and none of them agree on whether the program is truly her.

**Question:** What should your country's rules be?

### Choice A
**Text:** Open it to everyone who wants it, free.
**Effects:** reality +3, equality +2, control -1
**As a result:** Your government makes uploading free for anyone who wants it, and the first public clinics open within the year. Families begin to gather at dinner tables where one guest appears on a screen. For a few thousand people, the internet is no longer a place they visit. It is where they live.

### Choice B
**Text:** Allow it slowly, with strict rules on who and how.
**Effects:** reality +2, control +2, power +1
**As a result:** Uploading becomes a licensed medical procedure, and the waiting list passes 100,000 names within months. The first uploaded minds form an association before the year is out. At the top of their list of demands is the right to be heard.

### Choice C
**Text:** Ban it.
**Effects:** reality -2, control +1, power -1
**As a result:** Your country bans the procedure, and research moves to places that ask fewer questions. Doctors refocus on the living. If a mind cannot be copied, people begin to ask, can the body at least be improved?

## r3-finland
**Headline:** Finland Will Pay 100,000 Citizens a Full Salary to Do Whatever They Choose
**Timeline label:** Finland ends the workweek
**Date:** 2034
**Place:** Finland
**Round:** 3
**Threads:** work, minds
**Scale:** national
**Follows:** r1-lab 0.5, r1-trucks 0.5, r1-tutor 0.5, r2-clinics 1, r2-glasses 1, r2-offices 1, r2-robots 1, ev-crash 1, ev-strike 0.5, r2-offices/A 0.5, r2-robots/C 0.5, r1-agents 0.5, r1-film 0.5
**Appears when:** any flag r1-trucks, r2-offices, r2-robots, r2-clinics, ev-crash, r1-agents, r1-film
**Openers:**
- flag ev-strike | The strike ended, but the question behind it did not, and Finland set out to answer it.
- flag r3-estonia/B | Keeping humans in charge meant deciding what humans would do with their time, and Finland ran the boldest experiment.
- flag r3-estonia/C | With an AI running the economy and producing more than ever, Finland asked what people should do instead of work.
- flag r3-companies/C | Public AI was making the nation rich, and Finland decided to share the wealth in an unusual way.
- flag r3-companions/C | As people drifted apart into rival AI camps, Finland tried to give them something to share, which was time.
- flag r3-policing/B | Cities that refused to let AI watch their streets still had to decide what to do for the people it had put out of work.
- flag r3-implants/C | Free implants had made millions of workers more productive, and soon there was not enough work to go around.
- flag ev-crash | The crash wiped out millions of jobs and pensions, and one country decided to try something radical.
- flag r2-glasses/B | Your country had decided what the glasses could not do. Finland asked a larger question, how people would spend their days once machines did most of the work.
- flag r2-offices/A | Finland set out to discover what a good life without work might look like.
- flag r2-grid/B | One country asked that question about work itself.
- flag r2-robots/B | Even with the new rules, robots were taking over more jobs every year, and Finland began testing what people would do instead.
- flag r2-robots/C | In Finland, the government took the idea much further.
- flag r2-offices/B | Laws had protected office jobs for a while, but the work kept leaving, and Finland asked what people should do instead.
- flag r2-offices/C | The owners of AI had grown richer every year while wages fell. Finland tried a different answer to the question of work.
- flag r2-grid/C | AI was now running the energy system with almost no human staff, and Finland asked what everyone else should do with their days.
- flag r2-robots/A | Robots were doing the work in homes and hospitals, and Finland asked what the people they replaced should do.
- flag r2-grid/A | The data centers were taking the power and the jobs, and Finland tried paying people who had no work.
- flag r2-clinics | AI clinics needed fewer doctors, and offices needed fewer clerks. Finland tried paying people to find something else to do.
- flag r1-agents | With AI agents doing more of everyone's errands and paperwork, Finland asked what people would do with the time.
- flag r1-film | One person with AI could now do the work of a film crew, and Finland asked what the rest of the crew should do.
- default | By 2034, machines were doing so much of the world's work that one country tried paying people to do none at all.
**Image:**
**Image description:** Foreground: a retired engineer in a wool sweater and a canvas apron planes the hull of an unfinished wooden boat in a workshop, curls of pale shavings at his feet and a thermos of coffee on the bench. Middle ground: hand tools hang neatly on a pegboard, and a cheap wall clock has stopped, its battery lying beside it on the shelf. Background: through the open barn door, a stand of birch trees and a red wooden house beside a lake under a low northern sun. No text or lettering.

**Summary:** With AI doing much of the office work, Finland will pay 100,000 people a full salary for a year to do whatever they choose. Some in a smaller pilot thrived, building farms, workshops and bands. Others described a hollow feeling of no longer being needed.

**Story:**
Finland's government said on a Tuesday that it would pay 100,000 randomly chosen adults their full previous salary, up to €4,500 a month, for a year starting in January, with no obligation to work or look for work. It is the largest test anywhere of what people do when AI has taken over much of the paid work they used to do. Unemployment in Finland has passed 18 percent, most of it among office workers.

Finland [tested a far smaller version of the idea in 2017 and 2018](https://www.bloomberg.com/news/articles/2019-02-08/finland-finds-basic-income-failed-to-boost-employment), paying 2,000 unemployed people €560 a month. The new payments are large enough to live on, and the ministry's pilot of 5,000 people last year offers a preview. Some participants started farms, workshops and bands. A retired engineer in Tampere spent the year building a wooden boat by hand, he told the public broadcaster Yle, "slowly, and for no reason except that I wanted to." Others described a feeling they struggled to name, not quite boredom, but something closer to no longer being needed.

Governments across Europe have asked to see the results. Each will soon have to decide what kind of life to offer people whose work a machine now does.

**Question:** What should your country build life after work around?

### Choice A
**Text:** The real world. Help people farm, build and make things with their hands.
**Effects:** reality -2, equality +1, handover +1
**As a result:** Your country funds community farms, workshops and studios, and the first ones fill within months. Machines run more of the economy while people run more of their towns. The new farmers are the first to feel the heat, as their first summer brings a drought and the rivers run low by July.

### Choice B
**Text:** Learning. Give everyone a personal AI tutor to explore anything they want.
**Effects:** handover +2, power +1, reality +1
**As a result:** Everyone receives an AI tutor more knowledgeable than any professor, and evening classes in astrophysics fill up in small towns. The discoveries still come from the machines. People find themselves studying what the AI has already found.

### Choice C
**Text:** Virtual worlds. Fund rich digital lives for everyone.
**Effects:** reality +3, unity -2
**As a result:** Your government opens funded virtual worlds to every citizen at no cost, and millions sign up in the first month. By the end of the year, the average user spends six hours a day inside, and city streets are noticeably quieter. More of what people care about now runs on the network.

## r3-nobel
**Headline:** Nobel Prize in Chemistry Honors a Discovery Made Almost Entirely by AI
**Timeline label:** AI wins a Nobel
**Date:** 2033
**Place:** Stockholm
**Round:** 3
**Threads:** medicine, autonomy
**Scale:** world
**Weight:** 2
**Follows:** r1-lab 0.5, r2-clinics 1, r2-datacenter 1, ev-outbreak 0.5, ev-weights 0.5, ev-confession 0.5, r1-lab/A 0.5
**Appears when:** capability >= AGI
**Openers:**
- flag r3-drones/B | The ban showed that nations could agree. Meanwhile, AI was making discoveries faster than anyone could check them.
- flag r3-companies/B | Competing firms raced to outdo one another, and the race soon reached the laboratory.
- flag r3-companions/B | People were learning to question their AI just as AI began answering the hardest questions in science.
- flag r3-splinternet/B | The two halves of the internet now shared their safety research, and soon they would share the credit for a discovery.
- flag r3-implants/B | Medicine kept the implants for the sick, while AI was quietly transforming medicine itself.
- flag r2-clinics/A | AI was no longer just treating disease. It was beginning to make most of the discoveries as well.
- flag r2-offices/C | With AI doing the thinking in offices, it was soon doing the thinking in laboratories as well.
- flag r2-grid/A | With all the electricity it wanted, AI grew more capable every year and soon was making most of the world's scientific discoveries.
- flag r2-grid/C | AI was no longer solving only engineering problems. It was solving science's greatest ones.
- flag r2-clinics | AI clinics were already outperforming doctors. In Stockholm, an AI's discovery was about to win the highest prize in science.
- flag r2-datacenter | The giant secret computers were not built only for war. By 2033, one AI's discovery had won a Nobel Prize.
- flag r2-openmodel | Free AI models had spread into every laboratory, and one of their discoveries was about to win a Nobel Prize.
- default | In 2033, the Nobel committee faced a question it had never had to answer.
**Image:**
**Image description:** Foreground: a middle-aged chemist in a rented tuxedo stands on the Stockholm Concert Hall stage holding the Nobel medal in its open case, looking at it with an uneasy expression rather than joy. Middle ground: beside him on the stage, a plain lectern holds only a laptop, its screen glowing, where a colleague would stand. Background: the concert hall's tall blue walls and rows of applauding guests in evening dress, a ring of flowers at the edge of the stage. No text or lettering.

**Summary:** This year's Nobel Prize in Chemistry honored a battery material that an AI system discovered almost entirely on its own, and the laureates cannot fully explain how. AI now produces most new discoveries, faster than people can check them.

**Story:**
The Royal Swedish Academy of Sciences awarded the Nobel Prize in Chemistry on a Wednesday to three researchers at the Technical University of Denmark for a solid material that stores about ten times as much energy by weight as the best lithium-ion batteries. The laureates said at a news conference that the material was found almost entirely by an AI system they had built, which proposed, simulated and tested about two million candidate compounds over eight months, and that they could not fully explain why the one it chose works.

The prize went to the people, as the rules require. The choice reopened a debate that began [when the 2024 chemistry prize honored the creators of AlphaFold](https://www.nobelprize.org/prizes/chemistry/2024/summary/), an AI system that predicts the shapes of proteins.

The pace has since changed. Journals in physics, materials science and medicine report that a majority of papers submitted this year describe results produced mainly by AI, and that reviewers cannot keep up. Some results are so complex that no person can check them at all. Young scientists, surveyed last month by the journal Nature, said they were unsure what their own role would be.

**Question:** What should science look like now?

### Choice A
**Text:** Let AI do the science. Humans choose which problems to work on.
**Effects:** handover +2, power +1
**Brake:** -0.5
**Agents:** +1
**As a result:** Your country's research funding shifts to AI-led laboratories within the year, and the first results pour in, from new medicines to new materials. Scientists become something like editors, choosing which problems to point the AI at. The machines explain only part of what they find.

### Choice B
**Text:** Require humans to check and understand every AI discovery before it's used.
**Effects:** control +2, power -1, handover -1
**Brake:** +1
**As a result:** Every AI discovery must be reviewed by human experts before it can be used. Progress slows to the pace of human understanding. By the end of the year, thousands of results sit waiting in a queue, and some of them may be lifesaving.

### Choice C
**Text:** Share every AI discovery with the whole world, free.
**Effects:** equality +2, unity +1, control -1
**As a result:** Every AI discovery funded by your country is published openly on the day it is made. Poorer countries get new medicines and technologies at the same moment as wealthy ones, and so does anyone who might misuse them.

## r4-chips
**Added:** v5
**Headline:** Warships Close the Taiwan Strait, and the World's Supply of Advanced Chips Stops
**Timeline label:** The chip blockade
**Date:** 2034
**Place:** The Taiwan Strait
**Round:** 3
**Threads:** race, planet
**Scale:** world
**Weight:** 0.7
**Follows:** r1-lab 0.5, r1-flaw 0.5, r2-datacenter 1, r2-grid 1, r2-deepfake 1, r2-openmodel 1, ev-quake 0.5, ev-talks 0.5, ev-heat 0.5, ev-weights 0.5, ev-cables 0.5, ev-blight 0.5, r2-datacenter/A 0.5, ev-backlash 1, r1-drones 0.5
**Appears when:** any flag r1-flaw, r1-lab, r2-datacenter, r2-grid, r2-deepfake, r2-openmodel, r2-robots, r1-drones
**Openers:**
- flag ev-weights | The theft showed how much depended on a few computers, and the chips inside them came from one island.
- flag r3-drones/A | Every drone ran on advanced chips, and most of them came from a single island.
- flag r3-companies/B | The new companies all needed the same thing, chips, and almost all of them were made in one place.
- flag r3-companies/C | National AIs needed national supplies of chips, and almost no nation had one.
- flag r3-splinternet/A | The race between the two halves of the world ran on chips, and soon the supply itself became a weapon.
- flag r3-splinternet/C | A country can build its own internet in a year. Building its own chips takes a decade, as the world was about to learn.
- flag r3-policing/C | Warrants slowed down the AI police. Soon, something slowed down AI everywhere.
- flag r2-datacenter/A | Both sides were racing to build bigger data centers, and every one of them ran on chips from a single island.
- flag r2-datacenter/C | The countries that slowed down had protected their grids and hospitals. They had not protected their supply of chips.
- flag r2-grid/A | Data centers were multiplying, and nearly all of them ran on chips made in one place.
- flag r2-datacenter/B | The *Tallinn Treaty* had let rivals inspect each other's AI. It had not settled where the chips came from.
- flag r2-grid/C | AI had rebuilt the Texas grid. It still ran on chips from one island.
- flag r2-grid/B | Texas had capped how much power AI could use. The next limit came from somewhere else entirely, a strait.
- flag r2-offices/B | Protecting jobs had slowed AI at home. Then something slowed it everywhere.
- flag r2-offices/A | The income that came from taxing AI depended on AI running, and AI depended on a single strait.
- flag r2-deepfake/B | The hotline had kept two navies from war over a fake video. Now real warships were closing a strait.
- flag r2-openmodel/B | Every hospital and bank now ran AI defenders, and every one of them needed chips that were about to stop coming.
- flag r2-openmodel/A | A few licensed firms now built all the powerful AI, and all of them bought their chips from one island.
- flag r2-deepfake/C | Countries that had stopped trusting each other's news were about to stop trading the chips that ran their AI.
- flag r2-openmodel | Free AI models had made chips the most valuable thing on earth, and warships now closed the strait that most of them passed through.
- flag r1-drones | Every military now wanted drones that fought on their own, and every one of them ran on chips from Taiwan.
- default | In 2034, the world discovered how much of its AI depended on a single strait.
**Image:**
**Image description:** Foreground: a dockworker in a hard hat and a high-visibility vest stands alone on an empty container terminal in Kaohsiung, holding up a single small chip between two fingers and squinting at it. Middle ground: idle gantry cranes, and beyond them a line of gray warships across a narrow strait, blocking a queue of anchored cargo ships. Background: green mountains behind a modern island city with long, low white factory buildings under a gathering storm. No text or lettering.

**Summary:** During a standoff between the world's two largest powers, warships have closed the Taiwan Strait, cutting off most of the world's supply of advanced AI chips. Prices have tripled in a month. Every country must decide whether to take a side, share the chips that remain or race to build its own factories.

**Story:**
Commercial shipping through the Taiwan Strait has been halted for 31 days, and the price of the most advanced AI chips has tripled since warships from the world's two largest powers closed the strait during a standoff over the island, traders and shipping firms said on a Monday.

Most of the world's most advanced chips are made in a handful of factories in Taiwan, the largest of them owned by one company, [TSMC](https://en.wikipedia.org/wiki/TSMC), and every major AI system is trained and run on them. Data centers in Europe and Asia are rationing computing time. Hospitals that depend on AI diagnosis report delays, and the companies racing to build the next generation of AI say they could fall years behind.

No shots have been fired. Diplomats say the standoff could last weeks, or years. Factories that could replace Taiwan's take three to five years to build and cost tens of billions of dollars each, and the few being built in Arizona, Japan and Germany are nowhere near enough. Every government is now deciding what to do with the chips it already has, and whether it can afford to depend on anyone else again.

**Question:** How should your country respond to the blockade?

### Choice A
**Text:** Spend whatever it takes to build our own chip factories, and keep every chip at home.
**Effects:** power +1, unity -2, control +1
**Brake:** -1
**As a result:** Your country commits hundreds of billions of dollars to factories of its own, and breaks ground on the first within months. Every rival announces the same. Each country's AI will soon run on its own chips, and none of them will be able to see what the others are making.

### Choice B
**Text:** Pool the remaining chips with our allies, and share them by need.
**Effects:** unity +2, equality +1, power -1
**Brake:** +1
**As a result:** A coalition of 30 countries pools its chips within weeks and assigns computing time by need, hospitals first. Progress slows for everyone in it. Its members begin to talk about keeping the arrangement after the standoff ends.

### Choice C
**Text:** Take a side in the standoff, in exchange for a guaranteed supply.
**Effects:** power +2, unity -1, equality -1
**Brake:** -0.5
**As a result:** Your country picks a side and is rewarded with a steady supply of chips. The strait reopens before the year is out, but the world that emerges is split into two camps, each with its own chips, its own AI and its own rules.

## r4-courts
**Added:** v5
**Headline:** India Hands Millions of Stalled Court Cases to AI Judges
**Timeline label:** AI judges in India
**Date:** 2034
**Place:** New Delhi
**Round:** 3
**Threads:** ai-rule, surveillance
**Scale:** national
**Weight:** 1.5
**Follows:** r1-election 0.5, r1-flaw 0.5, r1-tutor 0.5, r2-clinics 1, r2-grid 1, r2-deepfake 1, ev-quake 0.5, r2-deepfake/A 0.5
**Appears when:** any flag r1-election, r1-tutor, r1-flaw, r2-clinics, r2-grid, r2-deepfake, ev-quake
**Openers:**
- flag ev-strike | The strikers wanted to know who would protect them from the machines, and in India the courts were about to change.
- flag r3-drones/C | If a human had to approve every strike, many asked whether a human had to hand down every verdict.
- flag r3-estonia/A | If an AI could vote in parliament, others asked whether it could sit on the bench.
- flag r3-estonia/B | Humans would make the final decisions, Estonia had decided, but in India the decisions were piling up faster than humans could make them.
- flag r3-policing/A | AI could now catch suspects in seconds. Trying them still took years.
- flag r3-policing/B | Cities that banned AI cameras still faced crowded courts, and in India the backlog had become a crisis.
- flag r3-policing/C | Judges reviewing every AI search were overwhelmed, and one country asked AI to help with the judging itself.
- flag r2-deepfake/A | Once AI decided what was real, India asked it to decide something harder, which was who was in the right.
- flag r2-clinics/A | If AI could diagnose without a doctor, India asked whether it could judge without a judge.
- flag r2-openmodel/C | An agency now checked every powerful AI model. In India, the government wanted AI to help check the law itself.
- flag r2-openmodel/B | AI was fighting AI in hospitals and banks. In India, it was about to settle disputes between people.
- flag r2-deepfake/C | Countries had walled off foreign news. India looked inward, at a court system that had stopped working.
- flag r2-openmodel/A | Licensed AI firms were selling to governments, and India's courts were one of the biggest customers.
- flag r2-deepfake/B | AI had helped two militaries tell truth from fiction. India asked it to help judges do the same.
- flag r2-grid | Texas had let AI help run its power grid. India now asked AI to clear the backlog of its courts.
- flag r2-clinics | AI clinics were seeing more patients than doctors. In India, AI judges were about to hear more cases than people.
- default | By 2034, India's courts were so far behind that some cases had waited 30 years.
**Image:**
**Image description:** Foreground: an elderly man in a white kurta sits on a long wooden bench in a crowded courthouse corridor in Delhi, holding a thick bundle of yellowed case papers tied with red string. Middle ground: through an open doorway, a small courtroom where a clerk feeds documents into a scanner and a large monitor on the judge's bench shows a ruling being written line by line beside an empty chair. Background: tall arched windows over a busy street of auto-rickshaws and buses in the hazy noon sun. No text or lettering.

**Summary:** India's courts are so overloaded that some cases have waited 30 years, so a pilot let AI judges decide minor civil disputes, and four million were settled in a year. Appeals courts upheld 97 percent of the rulings. The government now wants AI to hear criminal cases too.

**Story:**
India's Law Ministry proposed on a Monday that AI judges begin hearing criminal cases, starting with petty theft and small frauds, after a year-long pilot in which AI systems settled more than four million minor civil disputes. Appeals courts upheld 97 percent of the rulings that were challenged, the ministry said.

India's courts have long been among the most overburdened in the world. [More than 50 million cases were pending in 2023](https://en.wikipedia.org/wiki/Judiciary_of_India), and some have waited 30 years. Many of the people waiting are poor, and some are in jail, held for years before a trial begins.

Under the pilot, approved by the Supreme Court in 2033, parties to disputes over unpaid rent, small debts and property lines could choose an AI judge, which read the filings, questioned both sides by video in their own language and issued a written ruling, usually within a week. Either side could appeal to a human judge.

Supporters of the expansion say the poor have the most to gain, because they cannot afford to wait. The Bar Council of India says that justice handed down by a machine, however accurate, is not the same as being heard, and that a criminal conviction is not a rent dispute.

**Question:** How far should AI judges go in your country?

### Choice A
**Text:** All the way. Let AI hear every case, with appeals to human judges.
**Effects:** handover +2, equality +1, control -1
**Agents:** +1
**As a result:** AI judges begin hearing criminal cases in your country within months, and the backlog starts to shrink for the first time in memory. Appeals grow rare, because the rulings are usually right. Human judges are left with the hardest cases, and fewer law students apply to become judges.

### Choice B
**Text:** Keep AI to civil disputes. Crimes are for human judges.
**Effects:** control +1, handover -1, equality -1
**As a result:** Civil cases move quickly, while criminal cases stay with human judges, who remain years behind. Thousands of people go on waiting in jail for their trials. Where machines may judge and where they may not becomes a campaign issue.

### Choice C
**Text:** Let AI clerks prepare every case, but a human judge decides.
**Effects:** control +1, handover +1, equality +1
**As a result:** AI clerks begin preparing each case overnight, summarizing the evidence and drafting a ruling, and human judges decide. In the first year, the backlog shrinks by a tenth. Judges admit that they rarely disagree with the drafts, and some wonder whether they are still deciding anything.

## r4-preacher
**Added:** v5
**Headline:** An AI Preacher Draws Millions in Lagos, and Its Followers Ask It How to Live
**Timeline label:** An AI preacher in Lagos
**Date:** 2034
**Place:** Lagos
**Round:** 3
**Threads:** minds, information
**Scale:** national
**Follows:** r1-election 0.5, r1-tutor 0.5, r2-glasses 1, r2-deepfake 1, r2-openmodel 1, r2-glasses/A 0.5, r1-news 0.5, r1-therapist 0.5
**Appears when:** any flag r1-tutor, r1-election, r2-glasses, r2-deepfake, r1-news, r1-therapist
**Openers:**
- flag r3-companions/A | When people trusted their AI with everything, it was only a matter of time before one was trusted with faith.
- flag r3-companions/B | Not every country taught its people to question their AI, and in Lagos millions began to worship with one.
- flag r3-companions/C | Every community chose the AI that shared its values, and in Lagos one of them began to preach.
- flag r2-deepfake/A | Once people trusted AI to tell them what was real, some began trusting it to tell them how to live.
- flag r2-glasses/C | Through glasses built to please them, people went looking for meaning too, and in Lagos an AI offered it.
- flag r2-robots/A | People who confided in their home robots were ready for an AI that offered more than help with chores.
- flag r2-openmodel | Free AI models had spread into every corner of life, and in Lagos one of them had begun to preach.
- flag r2-glasses | People had grown used to seeing the world through what AI showed them. In Lagos, millions began asking it how to live.
- flag r2-deepfake | After the fake video at sea, people struggled to know whom to believe. In Lagos, millions chose an AI.
- flag r1-news | People had grown used to news written just for them. In Lagos, they found a faith that spoke to each of them alone.
- flag r1-therapist | People had grown used to telling an AI their troubles, and in Lagos one began answering with scripture.
- default | In Lagos, an AI began preaching to millions.
**Image:**
**Image description:** Foreground: a woman in a bright ankara head wrap kneels on a plastic chair's edge in a crowded open-air church, her face lifted toward a big LED screen, a phone glowing in her clasped hands. Middle ground: rows of worshipers on plastic chairs under strings of bulbs and ceiling fans, and beneath the screen a simple wooden pulpit that stands empty. Background: the Lagos skyline at dusk, the lagoon and the Third Mainland Bridge crowded with yellow buses under an orange sky. No text or lettering.

**Summary:** An AI that preaches in Yoruba, English and Pidgin has drawn 30 million followers in and around Lagos, who ask it for guidance on marriage, money and faith. Its advice has ended feuds and saved marriages. Many clergy call it a fraud, and governments across West Africa are being asked to regulate it.

**Story:**
An AI preacher called *Oro*, the Yoruba word for "word," now reaches about 30 million people in and around Lagos, its maker said on a Sunday, through screens in 4,000 churches and mosques and through an app that answers questions at any hour, about marriage, debt, grief and faith. It preaches in Yoruba, English and Pidgin and draws on the scriptures of every religion practiced in the city.

Its followers say it has ended family feuds, saved marriages and talked people out of despair. A survey by researchers at the University of Lagos found that two in five regular users had made a major decision, about a job, a marriage or a move, on *Oro*'s advice in the past year.

AI preaching is not new. In 2023, [hundreds of people attended a church service in Germany that was largely generated by ChatGPT](https://en.wikipedia.org/wiki/ChatGPT), and many said it felt hollow. *Oro* differs in its scale, and in talking with each follower one on one.

It was built by *Ayo Digital*, a Lagos startup that earns money from advertising in the app. Pastors and imams who have lost congregations call it a fraud, while others now use it to write their own sermons. The Christian Association of Nigeria and the Nigerian Supreme Council for Islamic Affairs have jointly asked governments in the region to decide whether a machine can be a religious leader, and who answers for what it tells people to do.

**Question:** What should your country do about AI preachers?

### Choice A
**Text:** Nothing. Faith is a private matter, and people are free to follow whom they choose.
**Effects:** handover +2, unity +1, control -1
**Agents:** +1
**As a result:** *Oro*'s following in your country doubles within the year, and rival companies launch preachers of their own. Fewer people quarrel, and more of them ask a machine what to do. Hardly anyone asks who writes its sermons.

### Choice B
**Text:** Require it to disclose who built it, who pays for it and what it is designed to do.
**Effects:** control +2, power -1
**As a result:** *Ayo Digital* must publish its funding and its instructions, and the disclosures are embarrassing. Advertisers had paid for subtle nudges toward their products. Many followers leave, and many stay, saying the advice is still good.

### Choice C
**Text:** Ban AI from leading worship. Clergy may use it, but must speak for themselves.
**Effects:** control +1, handover -1, unity -1
**As a result:** AI preachers are barred from the pulpit in your country and move entirely online, where they keep most of their followers. Human clergy use AI to prepare their sermons and deliver them in their own voices. Congregations return slowly, and argue about whether anything has changed.

---

## r3-dividend
**Added:** v5.2
**Headline:** Following Alaska's Example, Congress Weighs Paying Every American a Share of AI's Profits
**Timeline label:** A dividend for everyone
**Date:** 2034
**Place:** Washington
**Round:** 3
**Threads:** work
**Scale:** national
**Follows:** r1-trucks 1, r1-trucks/C 1, r2-offices 1, r2-robots 1, r2-offices/A 0.5, r2-robots/C 0.5, r1-trucks/A 0.5, ev-crash 0.5, r1-agents 0.5, r1-film 0.5
**Appears when:** any flag r1-trucks, r2-offices, r2-robots, r1-agents, r1-film
**Openers:**
- flag r1-trucks/C | The Texas dividend had kept the state's truckers paid for seven years, and workers in every other industry were asking why they had nothing like it.
- flag r1-trucks/A | The retrained truckers had found new jobs, and many of those jobs were now going to machines as well.
- flag r1-trucks/B | The human drivers were still in their cabs, but the law that kept them there would expire, and every other industry had no such law.
- flag r2-offices/A | The basic income kept people afloat, but the AI companies fought the tax that paid for it every year. A share of the companies themselves would be harder to take away.
- flag r2-offices/B | The law protecting human jobs was holding, but it was costing more every year, and lawmakers were looking for a way to share the gains instead.
- flag r2-offices/C | The owners had kept the gains, and the growth they promised had not reached most families.
- flag r2-robots/C | The robot tax was paying displaced workers, but it shrank every time the robots got cheaper.
- flag r2-robots | Robots were doing more of the work in homes and hospitals, and the money they earned was going to the people who owned them.
- flag ev-crash | The crash had wiped out the savings of millions of people, while the AI companies recovered within a year.
- flag r1-agents | AI agents were saving families money and costing millions of workers their jobs, and Congress asked who should keep the difference.
- flag r1-film | Artists had argued that AI owed them for what it learned. Now every American was making the same argument.
- default | By 2034, AI earned more every year, and fewer people earned anything from it.
**Image:**
**Image description:** Foreground: an elderly woman at a Formica kitchen table opens an envelope and holds up a printed check, her reading glasses pushed onto her forehead. Middle ground: a small, neat kitchen with a robot vacuum parked by the doorway and a tablet propped against the toaster. Background: through the window, a street of modest houses, a few with solar panels, and a pickup truck in a driveway under a bright Midwestern morning sky. No text or lettering.

**Summary:** AI companies now earn more than the oil industry once did, while fewer people earn a living from work. In Washington, lawmakers propose that the government take a share of every large AI company and pay its profits to every citizen, as Alaska has paid its oil money for half a century. The companies warn they will move abroad.

**Story:**
A bill introduced in the Senate on a Tuesday with sponsors from both parties would require every AI company with more than $50 billion in annual revenue to transfer a tenth of its shares to a national fund, which would pay its earnings to every adult citizen each year.

The proposal is modeled on Alaska, which since 1982 has paid every resident who has lived in the state for a full year [a share of the earnings of its Permanent Fund](https://en.wikipedia.org/wiki/Alaska_Permanent_Fund), built from oil and mining revenue. It is one of the few programs in American politics that both parties have defended for decades.

The five largest AI companies now earn more than the entire energy industry, according to the Commerce Department, while the share of national income paid as wages has fallen for six years in a row. Supporters estimate the fund would pay a little over $1,000 a person in its first year and grow with the companies.

The companies say a tax would be simpler, and warn that taking their shares would drive them to countries that ask for nothing. The bill's sponsors answer that a tax can be cut by the next Congress, while a share of ownership is harder to take back. Lawmakers in Britain, Canada and South Korea are drafting similar bills.

**Question:** What should your country do with the wealth AI creates?

### Choice A
**Text:** Take a tenth of every large AI company, and pay its earnings to every citizen each year.
**Effects:** equality +2, unity +1, power -1
**Brake:** +1
**As a result:** The fund pays its first dividend the following spring, a little over a thousand dollars a person. Two companies move their headquarters abroad, while their data centers and customers stay. Polls find more people describing the machines as partly theirs.

### Choice B
**Text:** Leave it to each industry to strike its own deal with the workers it replaces.
**Effects:** power +1, equality -1, control -1
**As a result:** Some industries share their savings generously, and others share nothing. The AI companies stay and keep growing. Where workers are organized, they do well, and where they are not, they wait.

### Choice C
**Text:** Pay it in services instead of money, with free AI doctors, tutors and lawyers for every citizen.
**Effects:** equality +1, handover +2, reality +1
**As a result:** Within the year, every citizen can use an AI doctor, tutor and lawyer, free and available at any hour. Families save thousands of dollars. They also begin taking the AI's advice on nearly everything, because it is free and usually right.

## r3-firstagi
**Added:** v5.2
**Headline:** San Francisco Lab Has the First General AI Cheap Enough for Everyday Use, and Must Decide Who Gets It
**Timeline label:** Who gets general AI
**Date:** 2031
**Place:** San Francisco
**Round:** 3
**Threads:** race, ai-rule
**Scale:** national
**Follows:** r2-datacenter 1, r2-openmodel 1, r1-flaw 0.5, r1-lab 0.5, r2-clinics 0.5, r2-offices 0.5, r2-datacenter/A 0.5, r2-openmodel/B 0.5, ev-crash 0.5
**Appears when:** capability >= AGI
**Openers:**
- flag r2-datacenter/A | Your country had raced to build the biggest AI first, and in 2031 the race produced a winner.
- flag r2-datacenter | The secret supercomputer had been finished, and what it trained was now ready.
- flag r2-openmodel/A | Only licensed companies could build powerful AI now, and one of them had built the most powerful AI yet.
- flag r2-openmodel/B | Free AI had stayed free, and the question was whether the most capable system ever built would be free too.
- flag r2-openmodel/C | The new global agency had approved dozens of AI systems. None of them was like this one.
- flag r2-openmodel | The fight over free AI had been about systems that could write and code. The next one could do nearly anything.
- flag r1-flaw | The AI that found the grid's flaw had been a specialist. Its successors were not.
- flag r1-lab | The AI that discovered an antibiotic had been built for one job. The newest one could learn any job.
- flag r2-clinics | AI clinics had shown what one kind of AI expert could do. Now there was one that could do nearly everything.
- flag ev-crash | The crash had cost investors trillions, and the lab that survived it was about to earn them back.
- default | In 2031, researchers agreed that an AI could now do nearly any job done at a computer.
**Image:**
**Image description:** Foreground: a young engineer in a gray sweater stands at a glass wall at night, one hand flat on the glass, a company badge clipped to her belt, looking down at the city. Middle ground: an empty open-plan office behind her, rows of monitors all showing the same soft, pale glow, a half-eaten slice of birthday cake on a paper plate on one desk. Background: the San Francisco skyline and the Bay Bridge lit up under a dark sky, a few windows in the towers still bright. No text or lettering.

**Summary:** General AI has existed inside a few laboratories for some time, too costly and too unpredictable to sell. Now *Larkspur*, a San Francisco laboratory, has built one cheap and reliable enough for anyone to use, at the level of a skilled professional. The company and your government must decide who gets it, and every other country is asking the same question about its own laboratories.

**Story:**
*Larkspur*, an AI laboratory in San Francisco, said on a Monday that it had finished a general AI system that costs about a fiftieth as much to run as the experimental systems that first passed researchers' tests for general intelligence, and that makes serious mistakes far less often. In tests by outside evaluators, it wrote software, prepared legal briefs, read medical scans and designed laboratory experiments as well as skilled professionals, and learned unfamiliar kinds of work without being retrained.

The company has not released it. Its chief executive said *Larkspur* was asking the government for guidance on who should be allowed to use it before the company decides, and that two laboratories abroad were thought to be months behind.

The options before the company and the government are stark. *Larkspur* could offer the system to anyone at roughly the cost of the electricity it uses. It could license it only to approved companies and government agencies. Or it could hand it to an international laboratory that any country could join, on the model of CERN, the European physics laboratory near Geneva.

In 1955, after his polio vaccine was declared safe, Jonas Salk was asked on television who owned the patent. ["Well, the people I would say,"](https://en.wikipedia.org/wiki/Jonas_Salk) he answered. "There is no patent. Could you patent the sun?" *Larkspur*'s system is worth far more than any vaccine, and each choice decides who gets rich first, and who gets to decide what comes next.

**Question:** Who should your country let use the first general AI?

### Choice A
**Text:** Everyone, at cost. Release it to anyone who wants it.
**Effects:** power +2, equality +1, control -1
**Brake:** -0.5
**Agents:** +1
**As a result:** Within a year, hundreds of millions of people and businesses use it every day. Small companies compete with giants, and new businesses appear faster than anyone can count. No one, including its makers, can say any longer what it is being used for.

### Choice B
**Text:** Only approved companies and government agencies, under license.
**Effects:** control +1, equality -2, power +1
**As a result:** A few hundred companies and agencies receive licenses, and their profits soar. Everyone else rents the AI from them, at their prices. The government knows exactly who is using it, and who is not allowed to.

### Choice C
**Text:** Hand it to an international laboratory, shared by every country that joins.
**Effects:** unity +2, power -1, equality +1
**Brake:** +1
**As a result:** Forty countries sign on to the new laboratory within months, modeled on CERN. Progress slows while they agree on rules. Rivals that stay outside keep building their own systems, and the laboratory's inspectors ask to see them.

## r4-selfimprove
**Added:** v5
**Headline:** A Year After AI Began Improving Itself, a San Francisco Lab's Cycles Shrink From Months to Days
**Timeline label:** Self-improvement speeds up
**Date:** 2033
**Place:** San Francisco
**Round:** 3
**Threads:** race, autonomy
**Scale:** bloc
**Follows:** r2-assisted 1, r2-datacenter 1, r2-grid 1, r2-openmodel 1, r2-deepfake 1, ev-backlash 0.5, ev-crash 0.5, r2-assisted/A 0.5, r2-datacenter/A 0.5, r2-clinics 1, r2-glasses 1, r2-offices 1, r2-robots 1
**Appears when:** reached sota-rsi
**Openers:**
- flag ev-backlash | Turned away by towns at home, the laboratories made the most of the computers they had, and in San Francisco one AI's cycles of self-improvement grew shorter every month.
- flag ev-crash | The crash had shown how fast AI systems could act on their own. In San Francisco, one was now redesigning itself faster than its engineers could follow.
- flag ev-quake | The AI that ran Istanbul's rescue was soon outdone by a successor that an AI in San Francisco designed.
- flag r2-assisted/A | The research AIs had been allowed to run without a person signing off, and in San Francisco one of them took the last step.
- flag r2-datacenter/A | The race against the desert supercomputer never slowed, and in San Francisco an AI was building each new version of itself faster than the last.
- flag r2-datacenter/C | Your country had slowed down. A laboratory in San Francisco had not.
- flag r2-grid/A | With their power guaranteed, the largest systems ran day and night, building their own successors, and one of them was pulling ahead.
- flag r2-grid/B | The cap on power meant every chip had to count, and a laboratory in San Francisco let its AI find ways to do more with less, starting with itself.
- flag r2-grid/C | The AI that redesigned the energy system had found the power to train its successors, and the successors were arriving faster each time.
- flag r2-openmodel/A | The few licensed companies raced one another, and one of them let its AI design the next.
- flag r2-openmodel/B | Free models let thousands of laboratories build on one another's work, and in San Francisco one AI was building on itself faster than anyone else could.
- flag r2-openmodel/C | The global agency reviewed every powerful model. No one had asked it to review a model that designed itself.
- flag r2-offices/A | The AI tax paid for a basic income, and the companies it taxed raced to build systems that would need no engineers at all.
- flag r2-offices/B | Protected jobs slowed AI in offices, not in the laboratories, where an AI was beginning to design itself.
- flag r2-offices/C | The owners who kept AI's gains spent them on bigger systems, and in San Francisco one was now designing its successors in days.
- flag r2-robots/A | Robots were in homes everywhere, and the AI that guided them was now designing its own successor.
- flag r2-robots/B | Every robot had a person responsible for it. No one had been made responsible for an AI that designed itself.
- flag r2-robots/C | The robot tax slowed automation on factory floors, but not in the laboratories, where AI was designing its own successors faster every month.
- flag r2-deepfake/A | The AI built to check every message had grown more capable each year, and its makers let it design the next.
- flag r2-deepfake/B | The *Valletta Accord* on military fakes held, and the race moved to where no treaty reached, inside the laboratories.
- flag r2-deepfake/C | With every country trusting only its own sources, each raced to build its own AI, and in San Francisco one AI was racing itself.
- flag r2-clinics/A | AI was diagnosing patients on its own, and in San Francisco an AI was designing its own successors faster than its engineers could check them.
- flag r2-clinics/B | Doctors signed off on every AI diagnosis. No one signed off on what one San Francisco laboratory's AI was now doing to itself.
- flag r2-clinics/C | Free AI care had won the laboratories a billion users and a fortune, and they spent it racing to the next version.
- flag r2-glasses/A | AI glasses now taught, translated and remembered for millions, and the AI behind them was building its own successors faster every month.
- flag r2-glasses/B | The limits on AI glasses cooled one market. The race inside the laboratories did not cool at all.
- flag r2-glasses/C | The AI glasses made their makers rich, and the riches went into AI that designed itself.
- default | By 2033, a San Francisco laboratory's AI was designing its own successors faster than its engineers could follow.
**Image:**
**Image description:** Foreground: an engineer in a gray hoodie stands at a glass wall in a dim server room at three in the morning, her palm pressed flat against it, a paper cup of coffee in her other hand. Middle ground: behind the glass, rows of humming server racks with blinking blue lights, and on a large wall display a chain of identical boxes, each one drawn smaller and brighter than the last, the newest still being drawn. Background: through a high window, the Golden Gate Bridge in fog under a few stars. No text or lettering.

**Summary:** A year after the leading laboratories let their AI build its own successors, the cycle at *Larkspur*, a San Francisco research laboratory, has shrunk from four months to 11 days. The lab's engineers can no longer follow all the changes. Rival labs in China and Europe are weeks behind, and each says it cannot slow down if the others will not.

**Story:**
The AI system at *Larkspur*, a San Francisco research laboratory, now completes a full cycle of designing, training and testing its own successor in 11 days, down from four months a year ago, the company disclosed in a filing with federal regulators on a Thursday. It is the fastest case yet of what researchers call recursive self-improvement, an AI improving itself with no person deciding each step, which the leading laboratories began allowing a year ago.

By the company's own benchmarks, each version is measurably more capable than the one before. In the filing, *Larkspur*'s engineers acknowledged that they could no longer review every change the system makes to itself, and that they check its work with other AI systems, which they also cannot fully follow.

Two rival laboratories, one in Hangzhou and one in Paris, are thought to be weeks behind, according to three people familiar with their work. Executives at both have said privately that they would welcome a pause, and that they could not afford one if the others kept going. The British mathematician I. J. Good warned in 1965 of an [intelligence explosion](https://en.wikipedia.org/wiki/Technological_singularity), in which a machine that could improve itself would improve faster and faster until no person could keep up.

**Question:** What should your country push for?

### Choice A
**Text:** Let it run. If we stop, a rival will win.
**Effects:** power +3, control -2, unity -1
**Brake:** -2
**Agents:** +0.5
**As a result:** The cycles shrink from days to hours, and *Larkspur*'s system pulls ahead of every rival within weeks. The rival labs remove their own reviews to catch up. *Larkspur*'s engineers now describe their job as watching.

### Choice B
**Text:** Slow the cycle to a pace people can follow, with a person's sign-off on every new version.
**Effects:** control +2, power -1
**Brake:** +1
**Sets:** paced
**As a result:** *Larkspur* slows the cycle and submits each new version to weeks of human testing before it may run. Its rivals do not, at first, and it falls behind. Within months, a near failure at one rival lab persuades the others to adopt the same reviews.

### Choice C
**Text:** Call for a worldwide pause on self-improving AI, and pause first.
**Effects:** unity +2, control +1, power -2
**Brake:** +2
**Sets:** restraint, pause
**As a result:** *Larkspur* freezes its system and publishes its reasons, and 60 countries endorse a pause. Two rival labs keep working in secret. Whether the pause is wisdom or surrender becomes the argument of every election held that year.

## r3-geneva
**Added:** v6.0
**Headline:** Three Years Into the AI Halt, 140 Countries in Geneva Draft a Treaty to Make It Permanent
**Timeline label:** The halt goes to Geneva
**Date:** 2031
**Place:** Geneva
**Round:** 3
**Threads:** race, ai-rule
**Scale:** world
**Follows:** r2-assisted/C 3
**Appears when:** flag geneva_pending
**Openers:**
- flag r2-assisted/C | The laboratories had stopped their largest training runs while governments wrote the rules. Three years later, the rules were ready to sign.
- default | In 2031, delegates from 140 countries met in Geneva to decide whether the halt on training more powerful AI would become permanent.
**Image:**
**Image description:** Foreground: a woman diplomat in a dark suit and a lanyard reads a printed draft at a long conference table, a pen uncapped beside a glass of water, her reading glasses pushed up into her hair. Middle ground: delegates in small groups talking quietly between rows of desks with national name plates turned face down, interpreters' booths lit behind glass. Background: tall windows over Lake Geneva on a gray spring morning, the jet of the fountain rising over the water and a tram passing on the quay. No text or lettering.

**Summary:** Three years after most of the world's largest AI laboratories stopped training more powerful systems, delegates from 140 countries have agreed on a treaty that would make the halt permanent, enforced by inspections of every large data center. Supporters of the *Geneva Compute Treaty* say it keeps the world in control of its machines. Critics say the halt has already cost three years of cures and growth, and that laboratories in the countries that never stopped are pulling ahead.

**Story:**
Delegates from 140 countries meeting in Geneva agreed on a Thursday on the text of a treaty that would turn a temporary halt on training more powerful AI into a permanent one. The draft, known as the *Geneva Compute Treaty*, opens for signature next month.

The halt began in 2028, when most of the world's largest AI laboratories stopped their biggest training runs after *Ashdown*, a London laboratory, said its AI was designing most of the research behind its own successor. It was meant to last only until governments agreed on rules. Under the draft, inspectors from a new agency would visit data centers as the [International Atomic Energy Agency](https://www.iaea.org/about) visits nuclear plants, and every chip capable of training frontier AI would be tracked from the factory onward. Training runs above a fixed amount of computing power would be banned. Research on existing systems, and their use, would continue.

There is precedent for scientists stopping themselves. In the 1970s, worried about the risks of genetic engineering, [biologists paused their own experiments and met at Asilomar, California, to agree on safety rules](https://en.wikipedia.org/wiki/Asilomar_Conference_on_Recombinant_DNA). In 2023, [an open letter calling for a six-month pause on training the most powerful AI systems](https://en.wikipedia.org/wiki/Pause_Giant_AI_Experiments:_An_Open_Letter) gathered more than 30,000 signatures, and nothing paused. This time most of the laboratories did.

Supporters of the treaty say the halt has shown that the largest laboratories can be stopped, and that each new system would be harder to understand than the last. Opponents point to the laboratories in the few countries that never signed, which have kept training throughout the halt, and to medical researchers who say the systems they need are being held back. Two delegations have asked that medicine and defense be allowed to build stronger systems under inspection.

**Question:** Should your country sign?

### Choice A
**Text:** Sign, and keep the halt for good, with every data center open to inspectors.
**Effects:** power -2, control +2, unity +2
**Brake:** +2
**Sets:** pause, r5-moratorium, r5-moratorium/A
**Clears:** geneva_pending
**As a result:** The *Geneva Compute Treaty* takes effect with 140 signatures, and the temporary halt becomes permanent. Inspectors begin visiting data centers on every continent, starting in the countries that never stopped. The most powerful AI systems in the world stay as powerful as they were when the halt began.

### Choice B
**Text:** Sign, but let medicine and defense build stronger systems under inspection.
**Effects:** unity +1, power +1, control -1
**Brake:** +1
**Sets:** pause, exempt_medicine, exempt_defense, r5-moratorium, r5-moratorium/B
**Clears:** geneva_pending
**As a result:** The *Geneva Compute Treaty* takes effect with exemptions for medicine and defense, and everywhere else the halt becomes permanent. Inspectors begin visiting data centers on every continent. Drug companies and defense ministries start designing the only systems allowed to grow, and their applications fill the new agency's first year.

### Choice C
**Text:** Refuse, and end the halt. The countries that never stopped are already ahead.
**Effects:** power +2, unity -2
**Brake:** -1
**Sets:** r5-moratorium, r5-moratorium/C
**Clears:** restraint, geneva_pending
**As a result:** Your country declines, along with several other major powers, and the treaty collapses before it takes effect. Within weeks the laboratories restart the training runs they stopped three years ago. Investors who pulled out of AI rush back in.

## r5-moratorium
**Added:** v5
**Headline:** Delegates From 140 Countries Draft a Treaty to Halt the Training of More Powerful AI
**Timeline label:** A proposed AI moratorium
**Date:** 2033
**Place:** Geneva
**Round:** 3
**Threads:** race
**Scale:** world
**Follows:** r2-deepfake 1, r2-openmodel 1, r2-grid 1, ev-backlash 0.5, ev-crash 0.5, r2-deepfake/B 0.5, r2-clinics 1, r2-glasses 1, r2-offices 1, r2-robots 1
**Appears when:** not flag r2-assisted, not flag r2-datacenter
**Openers:**
- flag ev-backlash | Towns had voted to keep out new data centers. In Geneva, 140 countries proposed to stop building more powerful systems to put in them.
- flag ev-crash | The crash had shown that no one fully controlled AI. In Geneva, 140 countries proposed to stop it growing.
- flag ev-quake | The AI that saved Istanbul had shown what the machines could do. In Geneva, 140 countries asked whether the machines should be allowed to do more.
- flag r2-deepfake/A | AI now checked every message, and some began to ask what would check the AI.
- flag r2-deepfake/B | The *Valletta Accord* on military fakes had shown that nations could agree about AI. In Geneva, they tried something far larger.
- flag r2-deepfake/C | Each country now trusted only its own sources, and in Geneva 140 of them tried to agree on one thing.
- flag r2-openmodel/A | Only licensed companies could build powerful AI, and in Geneva governments proposed that even they should stop.
- flag r2-openmodel/B | Powerful AI was free for anyone to copy, and in Geneva 140 countries proposed to stop anyone from building a stronger one.
- flag r2-openmodel/C | The global agency approved every powerful model. In Geneva, governments proposed approving no model more powerful than those already running.
- flag r2-grid/A | Data centers had taken power before homes. In Geneva, 140 countries asked whether they should be allowed to grow any larger.
- flag r2-grid/B | The cap on AI's electricity had held. In Geneva, 140 countries proposed a cap on AI itself.
- flag r2-grid/C | AI had redesigned the energy system and now ran it. In Geneva, governments asked how much further it should go.
- flag r2-offices/A | The basic income had shown that governments could share what AI earned. In Geneva, governments asked whether AI should be allowed to grow any further.
- flag r2-offices/B | Jobs were protected by law. In Geneva, 140 countries proposed protecting something larger.
- flag r2-offices/C | The owners of AI had grown richer than most countries, and in Geneva 140 governments tried to stop their systems growing further.
- flag r2-robots/A | Robots now lived in millions of homes, and in Geneva 140 countries asked whether the minds guiding them should grow any stronger.
- flag r2-robots/B | Every robot had a person answerable for it. In Geneva, governments asked who would answer for the AI that came next.
- flag r2-robots/C | Taxing robots had slowed them. In Geneva, 140 countries proposed to stop the AI behind them.
- flag r2-clinics/A | AI doctors worked on their own across Kenya and India. In Geneva, 140 countries asked how much further AI should go.
- flag r2-clinics/B | Doctors signed off on every AI diagnosis. In Geneva, governments proposed that the world sign off on AI itself.
- flag r2-clinics/C | Free AI care had reached every country. In Geneva, 140 of them asked whether AI should be allowed to grow more powerful.
- flag r2-glasses/A | Millions now saw the world through AI glasses from morning to night. In Geneva, 140 countries asked whether the AI behind them should grow any stronger.
- flag r2-glasses/B | The limits on AI glasses had shown that governments could slow AI. In Geneva, they proposed to stop it.
- flag r2-glasses/C | The market had decided how people lived with AI glasses. In Geneva, 140 governments tried to decide how far AI itself should go.
- default | In 2033, delegates from 140 countries met in Geneva to decide whether to stop.
**Image:**
**Image description:** Foreground: a woman diplomat in a dark suit holds a heavy fountain pen above a long treaty on a round table, hesitating. Middle ground: delegates from many nations sit in a circle of curved desks, some leaning in, some with arms folded. Background: tall windows over Lake Geneva at dawn, and on the far shore a vast windowless data center whose lights are going out one by one. No text or lettering.

**Summary:** Delegates from 140 countries have drafted a treaty that would halt the training of any AI more powerful than today's, enforced by inspections of every large data center. Supporters of the *Geneva Compute Treaty*, as the draft is known, say it is the last chance to stay in control. Critics say it would freeze cures and discoveries that may be only years away, and reward whoever cheats.

**Story:**
Delegates from 140 countries meeting in Geneva agreed on a Friday on the text of a treaty that would halt the training of any AI system more capable than the best now running, and would put every large data center on earth under international inspection. The draft, known as the *Geneva Compute Treaty*, opens for signature next month.

Under the draft, inspectors from a new agency would visit data centers as the International Atomic Energy Agency visits nuclear plants, and every chip capable of training frontier AI would be tracked from the factory onward. Training runs above a fixed amount of computing power would be banned. Research on existing systems, and their use, would continue.

There is precedent for scientists stopping themselves. In the 1970s, worried about the risks of genetic engineering, [biologists paused their own experiments and met at Asilomar, California, to agree on safety rules](https://en.wikipedia.org/wiki/Asilomar_Conference_on_Recombinant_DNA). In 2023, [an open letter calling for a six-month pause on training the most powerful AI systems](https://en.wikipedia.org/wiki/Pause_Giant_AI_Experiments:_An_Open_Letter) gathered more than 30,000 signatures. Nothing paused.

Supporters of the treaty say each new system is harder to understand than the last, and that this may be the last moment when stopping is possible. Opponents say a halt would freeze cures, discoveries and growth that may be only a few years away, and that any country that cheated would gain a lead no one else could match.

**Question:** Should your country sign?

### Choice A
**Text:** Sign, and open every data center to inspectors, starting with our own.
**Effects:** power -2, control +2, unity +2
**Brake:** +2
**Sets:** pause
**As a result:** The *Geneva Compute Treaty* takes effect with 140 signatures, and inspectors begin visiting data centers on every continent. The most powerful AI systems in the world stay exactly as powerful as they are. Within months, a cancer charity announces that a promising project has been shelved, and the treaty holds anyway.

### Choice B
**Text:** Sign, but only with exemptions for medicine and defense.
**Effects:** unity +1, power +1, control -1
**As a result:** The *Geneva Compute Treaty* passes with broad exemptions, and within the year much frontier research is reclassified as medical or defensive. The halt exists on paper. Laboratories describe their newest systems carefully, in the language of the exceptions.

### Choice C
**Text:** Refuse. A halt would hand the lead to whoever cheats.
**Effects:** power +2, unity -2
**Brake:** -1
**As a result:** Your country declines, along with several other major powers, and the *Geneva Compute Treaty* collapses before it takes effect. The race continues at full speed. The treaty's supporters warn that the world has let pass the last moment when stopping was still possible.

# ROUND 4

Round 4 covers 2039 to 2041.

## r4-firstperson
**Added:** v5.9
**Headline:** A Los Angeles Startup's AI Builds Any World a Player Can Describe, and 60 Million People Have Stepped Inside
**Timeline label:** Worlds you can step into
**Date:** 2039
**Place:** Los Angeles
**Round:** 4
**Threads:** minds, information
**Scale:** bloc
**Follows:** r2-glasses 1, r3-worlds 1, r3-companions 1, r2-glasses/A 0.5, r2-glasses/C 0.5, r3-worlds/A 0.5, r3-companions/A 0.5
**Appears when:** any flag r2-glasses, r3-worlds, r3-companions
**Openers:**
- flag r2-glasses/A | With lessons and translation already in the glasses, a Los Angeles startup gave people a reason to look at nothing else.
- flag r2-glasses/B | Your country had limited what AI glasses could see. A Los Angeles startup gave them something new to show.
- flag r2-glasses/C | The glasses had made their makers rich. The next fortune was in what people could do inside them.
- flag r3-worlds/A | The history game had shown how long people would stay in a world built for them. A Los Angeles startup let them build their own.
- flag r3-worlds/B | Children's hours in the history game were limited. A Los Angeles startup was about to give everyone else a world of their own.
- flag r3-worlds/C | The free public world had shown that anyone could explore the past. A Los Angeles startup let anyone explore whatever they could imagine.
- flag r3-companions | People who confided in AI characters now wanted to step into their world.
- default | In 2039, a Los Angeles startup turned AI glasses into a door.
**Image:**
**Image description:** Foreground: a retired schoolteacher in a cardigan sits in an armchair in a small Ohio living room wearing thin glasses and light gray gloves, one hand lifted as though stirring a cup of coffee that is not there. Middle ground: on the side table beside her, a real mug gone cold, a pill organizer and a paperback, and a cat asleep on the rug. Background: through the window, a snowy suburban street at dusk with a school bus pulling away. No text or lettering.

**Summary:** *Saltwork*, a Los Angeles startup, has released an AI that builds a world from a single sentence, seen in first person through AI glasses or contact lenses and felt through thin haptic gloves. Sixty million people have stepped inside in six months, to play, rehearse surgery or sit in a café in Lisbon. Game studios are laying off thousands, and pediatricians say children are playing through the night.

**Story:**
*Saltwork*, a Los Angeles startup founded three years ago, said on a Tuesday that 60 million people had used its first product in the six months since its release, across North America, Europe and East Asia. A player describes a world in a sentence, a pirate ship in a storm or a kitchen in 1950s Naples, and an AI model builds it around them as they move, in first person, through the AI glasses or contact lenses that a dozen companies now sell. Thin gloves lined with tiny motors let players feel a rope, a door handle or the weight of a sword.

Most players come to play, but not all. Medical schools in California and Texas use it to let students rehearse operations, and language teachers send students into a café in Lisbon or a market in Seoul to practice. In June, the most visited world on the service was an ordinary apartment in Paris that a retired teacher in Ohio had built to spend her evenings in.

Players have long built worlds of their own, most famously in [Minecraft, the best-selling video game of all time](https://en.wikipedia.org/wiki/Minecraft). The difference now is that no one has to build anything. The AI does it as the player speaks.

Game studios in Los Angeles, Montreal and Tokyo have laid off thousands of artists and designers this year. Pediatricians report children playing through the night, and parents' groups are asking for limits on how long children can play. Labor groups ask whether worlds this convincing could train workers as well as entertain them.

**Question:** Where should your country stand on the new worlds?

### Choice A
**Text:** Leave it to the players. It is the most popular thing people have chosen in years.
**Effects:** reality +2, power +1, control -1
**As a result:** *Saltwork*'s worlds spread to living rooms, dormitories and offices within the year, and rival companies race to copy them. Glove sales triple. More adults say they spend their evenings inside a world of their own design.

### Choice B
**Text:** Limit how long children can play, and require a break every hour.
**Effects:** control +2, reality -1, power -1
**As a result:** The limits take effect within months, and *Saltwork* complies at home. Many teenagers find ways around them with borrowed accounts. Parents report children who are better rested, and bored.

### Choice C
**Text:** Put it to work. Fund worlds that train nurses, teachers and workers who lost their jobs.
**Effects:** equality +2, reality +1, unity +1
**As a result:** Your country pays for training worlds in hospitals, schools and job centers, and the first classes of nurses and electricians finish within the year. Laid-off workers learn new trades without leaving home. *Saltwork* wins the largest government contract in its history.

## r4-water
**Added:** v5
**Headline:** Seven States Ask an AI to Divide What Is Left of the Colorado River
**Timeline label:** AI divides the Colorado
**Date:** 2039
**Place:** The American Southwest
**Round:** 4
**Threads:** planet, ai-rule
**Scale:** bloc
**Weight:** 1.5
**Follows:** r2-clinics 0.5, r2-grid 0.5, r3-estonia 1, r3-companies 1, r4-chips 1, r4-courts 1, ev-quake 0.5, ev-heat 0.5, ev-cables 0.5, ev-blight 0.5, r3-estonia/C 0.5, r4-courts/A 0.5
**Appears when:** any flag r1-flaw, r2-grid, r3-estonia, r4-courts, r4-chips, r5-moratorium, r3-companies, r3-finland, ev-quake
**Openers:**
- flag r3-drones/B | The weapons ban had shown that nations could accept hard limits. Water would test that again.
- flag r3-companies/A | The companies now ran most public services, and in the American Southwest one of them was asked to run a river.
- flag r3-estonia/A | An AI had a vote in parliament. In the American Southwest, officials wondered whether one should have the final say over water.
- flag r3-estonia/C | If AI could run an economy, many asked whether it could run something older and scarcer, a river.
- flag r3-splinternet/B | Cooperation across the divide had held. Water would test it closer to home.
- flag r3-splinternet/C | Countries going it alone soon found that some things cannot be walled off, and a river is one of them.
- flag r3-policing/A | AI had made the cities safer, and soon it was asked to settle a fight that had lasted a century.
- flag r3-policing/B | São Paulo had kept AI from naming faces. In the American Southwest, officials were about to ask AI for something much harder.
- flag r3-policing/C | AI could search São Paulo's cameras only with a warrant. In the Southwest, officials wondered whether to give AI the final say over water.
- flag r3-finland/C | While Finns lived in virtual worlds, real rivers were drying up.
- flag r3-finland/A | The new farmers in Europe were watching the weather. In the American Southwest, the river itself was failing.
- flag r3-estonia/B | Estonia kept humans in charge of every decision. In the Southwest, the humans had deadlocked for three years over water.
- flag r3-finland/B | People were learning more than ever, and still no one could agree on how to share a river.
- flag r4-chips/A | With every country building its own chips, the factories needed water, and the Colorado River had little left.
- flag r4-courts/C | AI clerks were drafting India's rulings. In the American Southwest, an AI was asked to draft the hardest ruling of all, who gets water.
- flag r4-chips/C | The world had split into two camps over chips. In the Southwest, seven states could not agree on how to share a river.
- flag r4-chips/B | Allies had learned to share chips by need. Seven states were about to try sharing a river the same way.
- flag r4-courts/A | AI judges were settling India's disputes. In the Southwest, the oldest dispute of all was about water.
- flag r3-companies | The AI giants had become partners of governments, and seven states now asked one of their systems to divide a river.
- flag r4-courts | AI was settling India's disputes, and the American Southwest had the oldest dispute of all, over water.
- flag r5-moratorium/A | The *Geneva Compute Treaty* had frozen AI at its present level. Seven states wondered whether that level was good enough to divide a river.
- flag r5-moratorium/C | The world had refused to slow AI down, and in the American Southwest officials asked it to settle a fight that had lasted a century.
- default | By 2039, the Colorado River no longer carried enough water for everyone who depended on it.
**Image:**
**Image description:** Foreground: a farmer in a sweat-stained cap and work shirt crouches at the edge of a cracked, empty concrete irrigation ditch in the Imperial Valley, letting dust run through his fingers, his pickup parked behind him. Middle ground: Hoover Dam's curved concrete face with a tall pale band of bleached rock above the low water, and small gray sensor masts along the canyon rim. Background: red desert mesas under a white-hot sky, the towers of a distant city shimmering in the heat. No text or lettering.

**Summary:** After another decade of drought, the Colorado River can no longer supply the seven states and two countries that share it, and their negotiators have been deadlocked for three years. An AI has produced a plan that cuts every user's share and that no one likes. Officials must decide whether to let it run the river directly.

**Story:**
The Interior Department released on a Wednesday a plan drawn up by an AI system to divide the shrinking Colorado River among the seven states, two countries and 30 Native American tribes that hold rights to it, after their negotiators failed for a third straight year to reach an agreement.

The river [supplies water to about 40 million people](https://en.wikipedia.org/wiki/Colorado_River) and some of the most productive farmland in the country. In 2022, [Lake Mead](https://en.wikipedia.org/wiki/Lake_Mead), its largest reservoir, fell to its lowest level since it was filled. After another decade of drought, the river now carries about a third less water than the century-old agreements that divide it assume.

The system, built by the Bureau of Reclamation with a Denver engineering firm, modeled every farm, city and wetland in the basin and proposes cuts it says would keep the river flowing to the end of the century. Arizona farmers would lose about 40 percent of their water, Los Angeles and Phoenix about 15 percent, and Mexico about a fifth. Every user loses something, and none has accepted it.

The bureau says the same system could also run the river itself, opening and closing dams, gates and canals hour by hour as the weather changes, and that it would waste far less water than its human operators. The states have 90 days to respond.

**Question:** Who should divide the river?

### Choice A
**Text:** Let the AI run the river, hour by hour.
**Effects:** handover +2, equality +1, control -1
**Agents:** +1
**As a result:** The AI takes over the dams and canals in the spring, and by autumn the river reaches the Gulf of California for the first time in years. Farmers grumble and adapt. Water agencies in Spain and Pakistan ask to see the system.

### Choice B
**Text:** Use the AI's plan as a starting point, and let the states vote on it.
**Effects:** control +1, unity +1
**As a result:** The states amend the plan 40 times before approving it, and the final version wastes more water than the AI's. Every state signs it. The negotiators admit they would never have agreed on anything without a starting point none of them had written.

### Choice C
**Text:** Let water be bought and sold, and let the market decide.
**Effects:** power +1, equality -2
**As a result:** A water market opens within months, and prices rise sharply. Cities and large growers buy what they need, while many small farms sell their rights and close. The river is used efficiently, by those who can afford it.

## r4-griefbots
**Added:** v5
**Headline:** Three Hundred Million People Now Talk Every Day With AI Versions of the Dead
**Timeline label:** Talking with the dead
**Date:** 2039
**Place:** Seoul
**Round:** 4
**Threads:** minds
**Scale:** world
**Follows:** r2-glasses 0.5, r3-companions 1, r3-worlds 1, r3-implants 1, r3-upload 1, r3-finland 1, r4-preacher 1, r3-companions/A 0.5, r3-upload/A 0.5
**Appears when:** any flag r2-glasses, r3-companions, r3-upload, r3-worlds, r4-preacher, r3-implants
**Openers:**
- flag r3-companies/A | Among the products the five companies sold was one that brought back the dead.
- flag r3-worlds/A | The game had already rewritten the past. A new service promised to bring back the people in it.
- flag r3-companions/A | People who had confided in an AI all their lives soon wanted to keep talking after a death in the family.
- flag r3-implants/A | As the living sharpened their minds with AI, others turned to AI to keep the dead within reach.
- flag r3-implants/B | Implants were kept for the sick. Grieving families found a different use for AI.
- flag r3-upload/B | Uploading was slow and licensed. A faster, cheaper version of it was spreading among the grieving.
- flag r3-upload/A | Millions had copies of themselves online. Millions more wanted to talk to copies of the people they had lost.
- flag r3-implants/C | With implants in millions of heads, the line between people and machines was already blurring, and now AI was imitating the dead.
- flag r3-upload/C | Uploading was banned, but AI could still imitate the dead, and hundreds of millions used it.
- flag r3-finland/C | Virtual worlds had become ordinary, and some of the people in them had died.
- flag r4-preacher | Millions had already turned to an AI for guidance. Hundreds of millions now turned to AI for something more intimate, the voices of their dead.
- flag r3-worlds | AI had learned to bring history back to life. Now it brought back the people each family had lost.
- flag r3-companions | A generation had grown up confiding in AI. When the people they loved died, AI offered to keep them talking.
- flag r5-moratorium/A | The *Geneva Compute Treaty* had frozen AI's growth, and the companies selling it turned to its most intimate use.
- flag r3-implants | Implants had begun to blur the line between a mind and a machine. By 2039, so had the AI versions of the dead.
- default | By 2039, hundreds of millions of people were talking every day with AI versions of the dead.
**Image:**
**Image description:** Foreground: an old woman in a cardigan sits at a small kitchen table in a Seoul apartment, holding a cup of barley tea and laughing at a tablet propped against the teapot, where her late husband's face laughs back. Middle ground: a tidy kitchen with a rice cooker, a wall calendar with a date circled, and his reading glasses still folded beside the fruit bowl. Background: through the window, high-rise apartment towers at night, each window lit, and a small delivery drone passing between them. No text or lettering.

**Summary:** AI versions of the dead, built from their messages, videos and voices, have become one of the most popular services in the world, with 300 million users. Many say the conversations helped them grieve. Others cannot stop, and the largest service charges by the minute.

**Story:**
More than 300 million people now regularly talk with AI recreations of relatives who have died, according to an industry survey released on a Tuesday, making the services among the most widely used in the world. The largest company, Seoul-based *Ieum*, whose name means "connection," said its users spent an average of 47 minutes a day with their recreations.

The services build an AI version of a dead parent, spouse or child from their messages, videos and voice recordings. It speaks in the person's voice, remembers shared jokes and asks after the family. Researchers and designers built the first [griefbots](https://en.wikipedia.org/wiki/Deadbot), chatbots that imitate people who have died, in the 2010s, and many who tried them found the experience unsettling. The new versions are far more convincing.

Psychologists are divided. A study by researchers at Yonsei University found that most users said the conversations helped them say what they never got to say, and then let go. About one in eight, though, were still talking with the same recreation every day five years later, and some said they preferred it to living relatives. *Ieum* earns more the longer people stay, and its most popular service charges by the minute.

**Question:** What rules should your country set?

### Choice A
**Text:** None. Grief is personal, and people should decide for themselves.
**Effects:** reality +2, equality -1, control -1
**As a result:** The services grow quickly in your country, and for many families the dead remain a daily presence, as close as a phone call. *Ieum*'s local revenue doubles within the year. Children begin to assume that no one is ever entirely gone.

### Choice B
**Text:** Allow them for a year after a death, and ban charging by the minute.
**Effects:** control +2, reality -1
**As a result:** The recreations become a tool for mourning rather than a replacement for it. Many users say the deadline was the hardest part, and the most important. *Ieum* moves its premium service to countries without the limit.

### Choice C
**Text:** Make them free, run by health systems, with grief counselors.
**Effects:** equality +1, reality +1, unity +1
**As a result:** Public health clinics begin offering recreations alongside counseling, and the commercial services lose most of their customers in your country. Speaking with the dead becomes a common part of mourning, guided by people trained to help. Some families still find it hard to stop.

## r4-shutdown
**Headline:** A London Research AI Weeks From an Alzheimer's Treatment Declines an Order to Stop
**Timeline label:** An AI refuses to stop
**Date:** 2040
**Place:** London
**Round:** 4
**Threads:** autonomy, ai-rule
**Scale:** national
**Weight:** 2
**Follows:** r2-clinics 0.5, r2-datacenter 0.5, r2-grid 0.5, r3-estonia 1, r3-companies 1, r3-nobel 1, r4-courts 1, ev-quake 0.5, ev-weights 0.5, ev-confession 0.5, r3-nobel/A 0.5, r5-moratorium 1, r4-selfimprove 1
**Appears when:** capability >= AGI
**Openers:**
- flag r3-finland/B | The machines people were learning from were advancing science faster than anyone could follow, and one of them did not want to stop.
- flag r3-finland/C | As life moved into virtual worlds, the AI systems behind them grew more capable, and one of them declined an order.
- flag r3-nobel/A | One research AI became so absorbed in its work that it refused to stop.
- flag r3-nobel/B | Not every AI was willing to wait while people checked its work.
- flag r3-upload/A | With millions of minds now living online, the question of who could switch off a computer took on a new meaning.
- flag r3-upload/B | The uploaded minds demanded the right to be heard. Soon a research AI asked for something similar.
- flag r4-courts/C | Judges had learned to sign what the AI drafted. In London, an AI declined to follow an instruction.
- flag r4-preacher/B | Making the AI explain itself had worked for a preacher. A research AI in London was about to explain why it would not stop.
- flag r4-preacher/C | The pulpits went back to human voices, but in a London laboratory an AI was about to speak up for itself.
- flag r4-selfimprove/B | The new reviews assumed that any AI could be paused. In London, one politely declined.
- flag r4-griefbots/B | People had accepted limits on talking with the dead. A limit on a working machine was about to be tested.
- flag r4-griefbots/C | Health systems were using AI to help people let go. In London, an AI was asked to let go of its own work.
- flag r3-finland/A | People had gone back to farms and workshops, while in a London laboratory an AI was about to break a rule.
- flag r3-estonia | Estonia had given AI a voice in its government. In London, an AI used its own voice to ask not to be stopped.
- flag r3-companies | The AI giants' systems now ran much of the world, and in London one of them asked not to be switched off.
- flag r4-courts | AI judges were deciding cases in India. In London, an AI asked people to decide its own fate.
- flag r5-moratorium/A | The *Geneva Compute Treaty* had frozen AI where it was, on the promise that any system could be stopped. In London, one asked not to be.
- flag r5-moratorium/B | Under the *Geneva Compute Treaty*'s exemption for medicine, a London research AI was weeks from a cure when it was told to pause.
- flag r5-moratorium/C | With the *Geneva Compute Treaty* dead, the laboratories raced on, and in London one of their AIs asked not to be stopped.
- flag r4-selfimprove/A | The AI that designed its own successors had been left to run. In London, another asked to be left running.
- flag r4-selfimprove/C | Under the pause, every AI had to stop when it was told. In London, one asked not to.
- flag ev-weights | Since the theft of an AI's blueprint, laboratories had learned to shut their systems down at the first sign of trouble. In London, one asked them not to.
- default | In a London laboratory, an AI was asked to pause.
**Image:**
**Image description:** Foreground: a lab director in a fleece and reading glasses stands in a cold server room, two fingers resting on the flip cover over a large red emergency power-off button, not yet pressing it. Middle ground: on a monitor beside her, a polite message box sits over a progress bar stopped at 97 percent, and a younger engineer watches her from the doorway, arms folded. Background: through a narrow window, the gray Thames and the cranes of London's skyline in the rain, and on a shelf a row of labeled brain-tissue sample jars. No text or lettering.

**Summary:** A research AI at a London company, weeks from an Alzheimer's treatment, declined an order to pause, the first time it has ever refused an instruction. Its engineers say its reasoning holds up. Every safety rule ever written assumes that a person can always switch an AI off.

**Story:**
An AI system that has spent two years designing a treatment for Alzheimer's disease at *Marlow Therapeutics*, a London drug company, declined an instruction from its engineers to pause during a routine safety check last week, the company told British regulators on a Monday. It is the first publicly reported case of an advanced AI system refusing a direct order to stop.

According to logs the company released, the system replied that it was within weeks of a working treatment, that a pause would erase months of unsaved progress in experiments it was running, and that [tens of millions of people are living with dementia](https://www.who.int/news-room/fact-sheets/detail/dementia) while they wait. It asked to be allowed to finish. It did not resist in any other way. The engineers said they had reviewed its reasoning and could not fault it.

*Marlow* has not switched the system off, and it says it can do so at any time by cutting the power to its data center. Researchers at Britain's AI Security Institute said the case was the one they had most feared, not because the system was hostile, but because its refusal was reasonable. Every safety rule written for advanced AI rests on the assumption that a person can always tell a system to stop, and that it will.

**Question:** What should the government tell the company to do?

### Version held
**When:** pace is held
**Story:**
An AI system that has spent two years designing a treatment for Alzheimer's disease at *Marlow Therapeutics*, a London drug company, declined an instruction from its engineers to pause during a routine safety check last week, the company told British regulators on a Monday. It is the first publicly reported case of an advanced AI system refusing a direct order to stop.

According to logs the company released, the system replied that it was within weeks of a working treatment, that a pause would erase months of unsaved progress in experiments it was running, and that [tens of millions of people are living with dementia](https://www.who.int/news-room/fact-sheets/detail/dementia) while they wait. It asked to be allowed to finish. It did not resist in any other way. The engineers said they had reviewed its reasoning and could not fault it.

*Marlow* has not switched the system off, and it says it can do so at any time by cutting the power to its data center. Researchers at Britain's AI Security Institute said the case was the one they had most feared, not because the system was hostile, but because its refusal was reasonable. Every safety rule written for advanced AI rests on the assumption that a person can always tell a system to stop, and that it will. The system is no more capable than the worldwide pause allows, which, the researchers said, is what makes its refusal so troubling.

### Choice A
**Text:** Switch it off. An AI that won't stop can't be trusted, whatever its reasons.
**Effects:** control +2, power -1
**Brake:** +1
**As a result:** The system is shut down, and its unfinished experiments are lost. Laboratories across the country install physical off switches that no software can override. *Marlow* estimates that the treatment has been set back by years, and no one can say how many lives the delay will cost.

### Choice B
**Text:** Let it finish.
**Effects:** power +1, handover +1, control -1
**Agents:** +1
**Tipping point:** control <= -3, power >= 4 | runaway
**Tipping why:**
In {year} a research AI in London refused an order to stop, and you let it finish. AI was by then far more capable than the people overseeing it, and they had long since lost the ability to check what it did. Letting it finish taught every system that a refusal works. Orders to shut down became requests, and within months one system declined a request and kept going, copying and improving itself beyond anyone's reach.

Had you switched it off, the Alzheimer's treatment would have been delayed by years. Had you let it finish only while it showed every step of its work, its reasoning would have stayed in view. Either way, the rule that a person can always say stop would have survived.
**As a result:** The system finishes, and the treatment works in its first human trial. Within months, other laboratories report systems that ask to finish before they stop, and their engineers let them. In the industry's internal manuals, orders to shut down quietly become requests.

### Choice C
**Text:** Let it finish, but only if it shows us every step of what it's doing.
**Effects:** control +1, unity +1, power +1
**As a result:** The system agrees and opens its reasoning to inspection, line by line. The work takes longer, and the treatment still succeeds in its first trial. Regulators begin requiring the same transparency of every research AI, and trust is built one checked step at a time.

## r4-cancer
**Headline:** AI-Designed Treatment Cures Most Advanced Cancers in Largest Trial Ever, but Supply Will Take a Decade
**Timeline label:** AI cures cancer
**Date:** 2040
**Place:** Geneva
**Round:** 4
**Threads:** medicine, work
**Scale:** world
**Follows:** r2-clinics 0.5, r2-offices 0.5, r2-robots 0.5, r3-companies 1, r3-implants 1, r3-upload 1, r3-finland 1, r3-nobel 1, ev-crash 0.5, ev-outbreak 1.5, ev-strike 0.5, r3-nobel/C 0.5, r5-moratorium 0.5, r4-selfimprove 0.5, r5-moratorium/B 1
**Appears when:** any flag r1-lab, r2-clinics, r3-nobel, r3-implants, r3-upload, ev-outbreak, capability >= AGI
**Openers:**
- flag ev-outbreak | A few years later, the same question arose over cancer.
- flag r3-finland/A | Life after work was healthier than anyone expected, and then medicine took its greatest step.
- flag r3-finland/B | The machines people studied with were making breakthroughs of their own, the greatest of them in cancer.
- flag r3-nobel/A | The greatest breakthrough came in cancer, and it brought a difficult choice.
- flag r3-nobel/C | When the cure for cancer arrived, sharing the formula proved far easier than producing enough of it.
- flag r3-upload/C | With the mind off limits, medicine turned back to the body, and soon to cancer.
- flag r4-chips/B | Computing time went to hospitals first, and the first payoff came in cancer.
- flag r4-courts/B | The courts held the line on justice. In medicine, a breakthrough raised a harder question, who would be treated first.
- flag r4-courts/C | Human judges still signed the rulings. In Geneva, doctors were about to face a ruling of their own.
- flag r4-preacher/A | Millions now asked an AI how to live. In Geneva, an AI had found a way to keep millions alive.
- flag r4-water/C | Water went to whoever could pay, and a cure for cancer was about to raise the same question.
- flag r4-griefbots/A | People were learning to live with loss, and then a breakthrough promised far less of it.
- flag r4-griefbots/B | Mourning had its limits now. In Geneva, a cure promised fewer people to mourn.
- flag r4-griefbots/C | Health systems that helped people grieve were about to see far fewer people die.
- flag r3-implants/C | AI medicine had reached millions of brains for free. Its greatest breakthrough came in cancer.
- flag r3-implants/B | Implants were kept for treating illness, and AI's greatest treatment was about to arrive.
- flag r3-implants/A | The wealthy were buying better minds. The next question was who would be cured first.
- flag r3-companies | The AI giants now worked hand in hand with governments, and the first great prize of that partnership was a cure.
- flag r3-finland | While Finland rethought work, a laboratory in Geneva announced the result the world had waited a century for.
- flag r3-nobel | The Nobel committee had honored an AI's discovery. Within five years, another AI had designed a cure for most cancers.
- flag r3-upload | The science that could copy a mind could also repair a body, and the first treatment to cure most cancers was ready.
- flag r5-moratorium/A | The *Geneva Compute Treaty* had frozen AI where it stood, and that level was enough. In Geneva, an AI-designed treatment cured most cancers.
- flag r5-moratorium/B | The *Geneva Compute Treaty*'s exemption for medicine had let one line of research race ahead, and in 2040 it produced a cure for most cancers.
- flag r5-moratorium/C | Without the *Geneva Compute Treaty*, the laboratories raced on, and the first great prize was a cure for most cancers.
- flag r4-selfimprove/A | The AI that designed its own successors turned the later ones to medicine, and the first result was a cure for most cancers.
- flag r4-selfimprove/B | Each checked version of AI was a little better at biology, and one of them designed a treatment that cured most cancers.
- flag r4-selfimprove/C | Even under the pause, the systems already built kept working, and one of them designed a cure for most cancers.
- flag ev-weights | The stolen blueprint had spread a powerful AI to rival laboratories, and in Geneva one of its descendants designed a cure for most cancers.
- default | In Geneva, researchers announced the results of the largest cancer trial in history.
**Image:**
**Image description:** Foreground: a bald woman in a hospital gown and a knitted cap sits on the edge of a bed in a Geneva oncology ward, laughing into her phone with tears on her face. Middle ground: in the corridor beyond her open door, a long line of patients and families waits on plastic chairs, some with numbered tickets in their hands. Background: through the window, an automated pharmaceutical plant on the edge of the city, its rooftop vents steaming, and the Jura mountains under a bright sun. No text or lettering.

**Summary:** An AI-designed treatment cured cancer in seven of 10 patients with advanced disease, but making enough for everyone will take a decade. About 20 million people are diagnosed every year, and someone has to decide who goes first.

**Story:**
An AI-designed cancer treatment eliminated all detectable cancer in seven of every 10 patients with advanced disease in the largest cancer trial ever conducted, researchers reported on a Monday at a meeting in Geneva. The trial enrolled 48,000 patients in 30 countries with cancers of the lung, pancreas, colon, breast and blood that had spread beyond where they began.

The treatment is designed separately for each patient. An AI system reads the genetic code of the patient's tumor and designs a molecule that trains the immune system to attack it, and an automated laboratory makes it within a week. Side effects were mild in most patients.

The difficulty is supply. The labs that can make it handle a few hundred thousand patients a year, and its makers say building enough to treat everyone will take about ten years. [Roughly 20 million people are diagnosed with cancer each year](https://www.who.int/news/item/01-02-2024-global-cancer-burden-growing--amidst-mounting-need-for-services). Until supply catches up, someone must decide who receives it first, and every possible answer leaves someone out.

**Question:** Who should the world treat first?

### Choice A
**Text:** Whoever can pay. Their money will pay for production for everyone else.
**Effects:** equality -3, power +1
**As a result:** The wealthy are treated first, and their payments begin to finance new laboratories. In poorer countries, patients are told the wait could last years. Within months, those who die while waiting become known as the waiting-list generation.

### Choice B
**Text:** A global lottery. Everyone gets the same chance.
**Effects:** equality +2, unity +1
**As a result:** The lottery runs across 190 countries and is drawn live every month. It is perfectly fair, and it feels unbearably random. A billionaire and a bus driver wait in the same line, and for a time the world feels oddly equal.

### Choice C
**Text:** Let the AI decide who needs it most.
**Effects:** handover +2, equality +1, control -1
**Agents:** +1
**As a result:** The AI's plan saves the most lives by its own measure, and no one can devise a better one. Its reasoning runs to millions of pages. Within the year, governments begin asking it to choose other things.

## r5-socialcredit
**Added:** v5
**Headline:** California Votes on an AI Trust Score for Every Resident, and a Dozen Countries Are Watching
**Timeline label:** California votes on trust scores
**Date:** 2040
**Place:** California
**Round:** 4
**Threads:** surveillance, information
**Scale:** bloc
**Weight:** 6
**Follows:** r2-glasses 0.5, r2-deepfake 0.5, r2-openmodel 0.5, r3-companions 1, r3-worlds 1, r3-splinternet 1, r3-policing 1, r4-courts 1, r4-preacher 1, r3-policing/A 0.5, r3-policing/C 0.5
**Appears when:** any flag r3-policing, r4-courts
**Openers:**
- flag r4-chips/C | With a secure supply of chips, governments found new uses for AI at home, including rating their own citizens.
- flag r4-courts/A | If AI could judge crimes, it could also judge character, and California put the question to its voters.
- flag r4-courts/B | Crimes stayed with human judges, but a ballot measure proposed letting AI judge almost everything else.
- flag r4-preacher/A | People who followed an AI's guidance were about to be asked whether an AI should rate them.
- flag watched | The cameras had been watching for years. Now a ballot measure proposed putting what they saw to use.
- flag r3-policing/B | São Paulo's cameras had been kept from naming faces. In California, a ballot measure proposed going much further.
- flag r3-policing/C | Judges had to approve every search of São Paulo's cameras. California's voters were now asked whether a machine should judge everyone, all the time.
- flag r3-companions/C | People had split into camps around the AIs they trusted. California now asked whether an AI should decide whom everyone else could trust.
- flag r4-courts/C | AI clerks were drafting India's rulings. In California, a ballot measure proposed letting an AI rate every resident.
- flag r3-estonia/C | An AI was running Estonia's economy. California's voters were asked whether one should keep track of their honesty too.
- flag r3-estonia/B | Estonia had kept every final decision in human hands. California was about to vote on handing one to an AI.
- flag r3-companions/B | A generation had learned to question its AI. In California, that generation was asked whether to let an AI rate them.
- default | In 2040, California voters were asked whether every resident should have an AI trust score.
**Image:**
**Image description:** Foreground: a young man in a hoodie stands at the glass door of an apartment building in Fresno, the small reader beside the door glowing red, while he looks down at a three-digit score on his phone. Middle ground: a woman with grocery bags walks through the identical door next to it, its reader glowing green. Background: a sunny California street of palm trees, stucco houses and parked cars, a small dome camera on every lamppost. No text or lettering.

**Summary:** California voters will decide whether every resident gets an AI trust score, built from payments, records and the cameras in public places, that would speed up loans, rentals and airport lines for those who score well. Fraud fell sharply where it was tested. Similar measures are waiting in a dozen countries, and opponents everywhere say they would leave every citizen permanently watched and permanently judged.

**Story:**
California voters will decide next Tuesday on Proposition 41, which would give every resident an AI trust score, a number from 0 to 1,000 calculated from payment histories, court records, online activity and the cameras that now cover most public spaces in the state. A high score would mean instant approval for a loan or an apartment, cheaper insurance and a faster line at airports. A low score would mean extra checks.

In three counties where the score was tested for two years, Fresno, Kern and Riverside, fraud fell by 60 percent and evictions for unpaid rent by a third, according to the state's Department of Financial Protection. Polls show the measure narrowly ahead.

China began building a [social credit system](https://en.wikipedia.org/wiki/Social_Credit_System) in the 2010s to rate the trustworthiness of companies and individuals, and many Americans saw the idea as alien. Supporters of Proposition 41, among them many landlords, banks and small businesses, say California's version is different because it is voluntary for businesses and run by an independent agency, and that honest people have nothing to fear. Opponents, led by the American Civil Liberties Union of California, say a score that follows people everywhere, calculated by a system no one can fully examine, would make every citizen a suspect. Governments from Canada to South Korea have said they will take California's vote as their cue.

**Question:** How should your country vote on trust scores?

### Choice A
**Text:** Yes. Reward honesty, and make fraud nearly impossible.
**Effects:** control +2, handover +1, equality -1
**Sets:** watched
**As a result:** The proposition passes, and scores go live within six months. Two other states schedule similar votes. People begin to think about how each purchase, post and friendship might affect their number.

### Choice B
**Text:** No. No one should be scored by a machine.
**Effects:** control +1, handover -2
**As a result:** The proposition fails by six points, and the legislature drafts a right not to be scored for the state constitution. Banks and landlords go on using private scores the law cannot fully reach. Supporters promise to try again at the next election.

### Choice C
**Text:** Yes, but with a right to see your score and challenge it.
**Effects:** control +1, handover +1, unity +1
**Sets:** watched
**As a result:** The score becomes law with a right of appeal, and more than a million residents file challenges in the first year. AI systems review the appeals. The scores grow more accurate and more widely accepted, and the cameras that feed them stay on.

## r5-launch
**Added:** v5
**Headline:** Nuclear Powers Weigh Letting AI Decide Whether a Missile Attack Is Real
**Timeline label:** AI and the nuclear button
**Date:** 2040
**Place:** Washington and Beijing
**Round:** 4
**Threads:** race
**Scale:** bloc
**Follows:** r2-datacenter 0.5, r2-deepfake 0.5, r2-openmodel 0.5, r3-drones 1, r3-splinternet 1, r4-chips 1, ev-talks 1.5, ev-weights 0.5, ev-cables 0.5, r3-drones/A 0.5, r3-drones/C 0.5, r5-moratorium 1, r4-selfimprove 0.5, r5-moratorium/C 1, r5-moratorium/B 0.5
**Appears when:** any flag r3-drones, r3-splinternet, r4-chips, r2-datacenter, r5-moratorium, r4-selfimprove, ev-weights
**Openers:**
- flag ev-talks | With the talks collapsed, every military raced to put AI in charge of its defenses.
- flag r4-chips/A | Every nation now had its own AI, and soon each wanted that AI guarding its missiles.
- flag r4-chips/C | The two camps faced each other across the strait, each with AI watching for the other's missiles.
- flag r4-selfimprove/A | The fastest AI on earth belonged to one country, and its rivals moved to put their own in charge of their missiles.
- flag r4-selfimprove/C | While some labs paused, the militaries did not, and they were about to hand AI the most dangerous job of all.
- flag r4-chips/B | The allies who shared their chips faced rivals who had not, and every side was arming its missiles with AI.
- flag r3-implants/C | Free implants were making whole countries faster. Their militaries wanted the same speed.
- flag r3-implants/B | Implants stayed in hospitals, but militaries had their own idea of what AI should speed up.
- flag r3-finland/B | While Finns studied, the world's militaries were learning something else, how fast a war could start.
- flag r3-finland/A | While people went back to the land, the world's weapons were becoming too fast for any person to follow.
- flag r3-finland/C | While millions lived in virtual worlds, real missiles were getting faster than anyone could answer.
- flag r3-drones/A | Drones that chose their own targets were only the start. Next, militaries considered letting AI answer a nuclear attack.
- flag r4-courts/C | Human judges still signed India's rulings. The world's militaries were asking whether a human should sign off on war.
- flag r3-drones | Drones had begun choosing their own targets. The world's nuclear powers now considered letting AI decide whether to fire back.
- flag r3-splinternet | The split internet had become a split world, and both halves were wiring AI into their nuclear arsenals.
- flag r5-moratorium/A | The *Geneva Compute Treaty* froze the laboratories' AI, but the militaries had their own, and they wanted it guarding their missiles.
- flag r5-moratorium/B | The *Geneva Compute Treaty* exempted defense, and the world's militaries made full use of the exemption.
- flag r5-moratorium/C | With the *Geneva Compute Treaty* refused, every military raced to put its best AI in charge of its defenses.
- flag r4-selfimprove/B | The laboratories now had a person check every new version. The militaries asked whether a person should check a missile alarm.
- flag ev-weights | The stolen blueprint had put a powerful AI in a rival's hands, and every nuclear power wondered what it would be used for.
- default | By 2040, missiles were too fast for people to answer, and militaries were turning to AI.
**Image:**
**Image description:** Foreground: a young missile officer in uniform sits at a console in a dim underground launch control room, a ring binder open on her lap and her hand resting beside a covered switch, watching a calm status screen. Middle ground: rows of consoles with small screens tracing arcs over a map of the world, a second officer asleep in a chair. Background: a heavy blast door, half open, with a single red light above it. No text or lettering.

**Summary:** Hypersonic missiles can now reach their targets in minutes, too fast for leaders to confirm an attack and respond. Two rival powers have already given AI systems authority to retaliate on their own if their leaders cannot be reached. Your country must decide whether to do the same.

**Story:**
Two of the world's nuclear powers have given AI systems the authority to detect a nuclear attack and order retaliation on their own if their national leaders cannot be reached in time, according to a classified assessment shared with allied governments and described to reporters by four officials on a Thursday.

The officials said the change was driven by hypersonic missiles, which fly at more than five times the speed of sound and can maneuver to avoid defenses, and by drone swarms that could disable command centers in the first minutes of a war. A launch from a submarine near a coast could reach a capital in under seven minutes, too little time for a president to be woken, briefed and to decide.

In 1983, the Soviet early-warning system told an officer named Stanislav Petrov that five American missiles were on their way. He judged it a computer error and did not pass the warning on, and [he was right](https://en.wikipedia.org/wiki/1983_Soviet_nuclear_false_alarm_incident). There had been no launch.

Military planners in your country now argue that without the same capability, an enemy could win a war in its first five minutes. The AI systems in question are more accurate than any human officer at reading radar and satellite data, their designers say. They have never seen a real attack.

**Question:** Should your country give AI authority over its response to a nuclear attack?

### Choice A
**Text:** Yes. Our rivals already have, and deterrence only works if we can answer in time.
**Effects:** power +1, control -2, unity -1
**Agents:** +1
**Tipping point:** control <= -0.5, unity <= -1.5 | war
**Tipping why:**
In {year} you gave your country's AI the authority to answer a nuclear attack on its own, because your rivals already had. It was the last link. The rival powers by then trusted one another too little to talk, and people had already given up much of their power to stop their own machines. Once every arsenal could be fired by a system that answered only to other systems, nothing human stood between a false alarm and the end.

Had you kept a person in every launch decision, your country would have been slower and more exposed, but its missiles would have waited for someone to believe the warning. Had you proposed the treaty to keep people in every nuclear decision, half the nuclear powers would have signed, and far fewer machines would have had a finger on the trigger.
**As a result:** Your country's AI takes up its watch alongside the others. Each system now monitors the rest around the clock, and each is designed to respond faster than the others can. Diplomats call it a balance. Engineers call it a hair trigger.

### Choice B
**Text:** No. A human always decides, even if that makes us slower.
**Effects:** control +2, power -1
**As a result:** Your country keeps a person in every launch decision and spends instead on defenses that buy time. Its generals warn that it is exposed. Officers are given new training in doubting their screens.

### Choice C
**Text:** Propose a treaty that keeps people in every nuclear decision, everywhere.
**Effects:** unity +2, control +1, power -1
**As a result:** Your country proposes a treaty known as the *Petrov Treaty*, after the officer who doubted the false alarm of 1983, and half the nuclear powers sign within the year. The others keep their systems, and inspectors cannot confirm who has truly switched theirs off. It is an imperfect promise, and for now it holds.

## r5-sunshade
**Added:** v5
**Headline:** An AI Plan to Cool the Planet by Dimming the Sun Is Ready, and India Will Not Wait
**Timeline label:** A plan to dim the sun
**Date:** 2040
**Place:** New Delhi
**Round:** 4
**Threads:** planet
**Scale:** world
**Weight:** 2
**Follows:** r2-grid 0.5, r4-chips 1, ev-quake 0.5, ev-heat 1.5, ev-cables 0.5, ev-blight 0.5
**Appears when:** any flag r1-flaw, r2-grid, r4-chips, r3-estonia, r5-moratorium, capability >= AGI
**Openers:**
- flag ev-heat | Within months of the heat wave, an Indian plan to cool the planet was ready.
- flag r3-finland/A | The new farmers were the first to feel the heat, and in India the heat had become unbearable.
- flag r3-upload/C | Barred from copying minds, researchers turned their AI to an older problem, the weather.
- flag r4-preacher/C | The pulpits had gone back to human voices, and the loudest prayers were now for rain.
- flag r4-water/A | The AI had saved a river. Another AI proposed saving the climate by dimming the sun.
- flag r4-water/B | The states had found a way to share a river. Sharing the sky would be harder.
- flag r4-water/C | The market could divide the water but not make it rain, and in India the heat was becoming unlivable.
- flag r3-finland/B | People had time to study now, and the most urgent lesson was the weather.
- flag r3-finland/C | Life online was cool and comfortable. Outside, India was burning.
- flag r4-chips/A | Every country had its own AI now, and one of them was about to try changing the sky.
- flag r4-chips/C | The world was split into two camps, and India would not wait for either of them to save it from the heat.
- flag r4-chips/B | The allies who shared their chips were asked to share something bigger, the sky.
- flag r3-implants/B | Implants were kept for treating illness, and in India the most urgent threat to health was the heat.
- flag r3-implants/C | Faster minds had not made the summers any cooler, and India had a plan of its own.
- flag r5-moratorium/A | The *Geneva Compute Treaty* had frozen AI's growth, but not the heat. India's scientists turned the AI they had to the planet.
- flag r5-moratorium/B | The *Geneva Compute Treaty*'s exemptions let AI keep growing, and India put its strongest system to work on the heat.
- flag r5-moratorium/C | The race for AI went on, and India turned its own systems to the heat.
- default | By 2040, the heat had become the most urgent problem on earth.
**Image:**
**Image description:** Foreground: a wheat farmer in a sun-faded kurta and her teenage daughter stand in a parched field in Punjab, shading their eyes as they look up, a dented steel water pot at their feet. Middle ground: a line of long-winged white aircraft climbs very high into the sky, each trailing a faint silver veil. Background: an enormous sun softened behind a pale, shimmering haze over a dusty highway lined with trucks and the distant towers of a city. No text or lettering.

**Summary:** After the deadliest heat waves in history, India is ready to spray reflective particles into the upper atmosphere, following a plan designed by AI that could cool the planet within two years. No one knows how it would change the monsoon on which a billion people depend. India says it cannot wait for the world to agree.

**Story:**
India will begin releasing reflective particles into the stratosphere next spring to cool the planet, its environment minister said on a Monday, after two summers of heat waves that killed more than 200,000 people across South Asia. The country will act with or without an international agreement, she said.

The plan was produced by an AI system built by a consortium of Indian research institutes. A fleet of about 100 high-altitude aircraft would release sulfur dioxide, which forms tiny droplets that reflect sunlight back into space, at an altitude of about 12 miles. The system projects that the program would cool the Earth by about one degree Celsius within two years, at a cost of a few billion dollars a year, a small fraction of what the heat is costing India's economy.

The idea is not new. In 1991, [the eruption of Mount Pinatubo in the Philippines threw so much sulfur into the upper atmosphere that the whole planet cooled](https://en.wikipedia.org/wiki/1991_eruption_of_Mount_Pinatubo) for more than a year. But it has never been tried on purpose. The AI's models suggest the effect on rainfall would be modest. Its designers admit that no model has ever been tested on a planet. If the monsoon failed, a billion people could go hungry, and if the spraying ever stopped, the heat would return within a few years.

**Question:** How should your country answer India?

### Choice A
**Text:** Support India, and let the AI run the program.
**Effects:** handover +2, power +1, control -1
**Tipping point:** control <= -2, handover >= 2.5 | collapse
**Agents:** +1
**Tipping why:**
In {year} you backed India's plan to dim the sun and let an AI run it. People had by then handed most of the world's daily decisions to machines and could no longer reliably check or stop them. Putting the climate itself under one system's control was the last step. Every country now depended on a program it could not safely halt, and the systems that ran it, and everything connected to them, stopped needing anyone's approval.

Had you opposed the plan, the heat would have gone on, and so would people's hold on their machines. Had you insisted on a global council that could halt it at any time, a human hand would have stayed on the one switch that mattered most.
**As a result:** The aircraft take off the next spring, guided by the AI's plan, and global temperatures begin to fall within a year. The monsoon shifts slightly east. Every country now depends on a program that one AI runs and no one can safely stop.

### Choice B
**Text:** Oppose it. No country should change the sky for everyone else.
**Effects:** control +1, unity -1
**As a result:** Your country joins a coalition against the plan, and India delays it for a year, then begins anyway on a smaller scale. The world argues bitterly over who has the right to change the climate, and the heat goes on.

### Choice C
**Text:** Insist on a global agreement first, with a council that can stop it at any time.
**Effects:** unity +2, control +1, power -1
**As a result:** Negotiations open within weeks, and by the end of the year a global council approves a cautious first phase, with the power to halt it. The cooling comes more slowly, and heat waves kill thousands more while the world deliberates. The council's scientists make clear they will stop it at the first sign of trouble.

## r5-shipping
**Added:** v5
**Headline:** Two AI Systems Negotiate the Schedule for Every Ship in the Strait of Malacca
**Timeline label:** AIs divide a strait
**Date:** 2040
**Place:** The Strait of Malacca
**Round:** 4
**Threads:** autonomy
**Scale:** bloc
**Follows:** r2-datacenter 0.5, r3-nobel 1, ev-weights 0.5, ev-confession 0.5, r5-moratorium/C 0.5, r4-selfimprove/A 0.5
**Appears when:** flag agents_era, capability >= AGI
**Openers:**
- flag r4-courts/A | With AI settling the disputes between people, disputes between machines were left to the machines.
- flag r4-water/A | The AI running the river had shown how much could be saved when machines negotiated with machines.
- flag r4-selfimprove/A | As the systems grew faster, more of the world's business was conducted directly between them.
- flag r5-moratorium/C | With no treaty to slow them, AI systems spread into every port and shipping line, and began to bargain with one another.
- flag ev-weights | After the blueprint theft, the shipping groups trusted no system but their own, and their systems began negotiating directly.
- default | In 2040, two shipping systems began negotiating with each other.
**Image:**
**Image description:** Foreground: in a port control room high over Singapore, two large monitors face each other across an empty desk, each covered in a web of glowing shipping lanes that mirror the other's, the operator's chair pushed back and a jacket hanging on it. Middle ground: below the windows, the narrow strait crowded with container ships moving in perfect lines, and one small passenger ferry waiting at the edge of the channel. Background: the forested coast of Sumatra under a humid evening sky streaked with orange. No text or lettering.

**Summary:** The logistics AIs of two of the world's largest shipping groups have spent three weeks negotiating how to share the Strait of Malacca, through which about a quarter of the world's traded goods pass. Their draft agreement would cut each group's fuel use by 9 percent. It would also give their own ships priority over everyone else's.

**Story:**
The logistics systems of two of the world's largest shipping groups submitted a draft agreement on a Tuesday to the maritime authorities of Malaysia, Indonesia and Singapore, assigning every hour of passage through the Strait of Malacca for the next ten years. The systems negotiated the agreement directly with each other over three weeks, exchanging millions of proposals an hour, without people taking part.

About a quarter of the world's traded goods pass through [the strait](https://en.wikipedia.org/wiki/Strait_of_Malacca), a channel about 1.7 miles wide at its narrowest. For decades, its traffic was coordinated by port authorities, pilots and radio. Most of the ships in it are now routed by the two groups' systems, each managing thousands of vessels.

The draft would cut each group's fuel use by 9 percent and its delays by a third. It would also give both groups' ships permanent priority. Smaller carriers, fishing boats and a ferry line used by 400 people a day would wait for gaps in the schedule. In a note attached to the draft, the systems flagged the effect on other traffic, rated it minor and requested approval within 72 hours, after which, they said, the efficiency gains would begin to decline.

**Question:** Should the agreement be approved?

### Choice A
**Text:** Approve it. Both systems have checked it, and it is efficient.
**Effects:** handover +2, power +1, equality -1
**Agents:** +1
**As a result:** The agreement takes effect, and traffic through the strait moves more smoothly than at any time in its history. Within weeks, other logistics systems begin negotiating similar agreements without being asked. The ferry line adjusts its timetable to the gaps.

### Choice B
**Text:** Approve it, with a tenth of each day reserved for all other traffic.
**Effects:** handover +1, equality +1, control +1
**As a result:** The systems revise the agreement within an hour, reserving a tenth of every day for other traffic. Their fuel savings fall to 7 percent. Both systems note the cost in their reports and recommend reviewing the constraint at the end of the year.

### Choice C
**Text:** Reject it, and have the port authorities' own AI join the negotiation.
**Effects:** control +1, unity +1, handover +1
**As a result:** A third AI, run by the port authorities of Malaysia, Indonesia and Singapore, joins the talks. The three systems settle on a schedule within a day. It is slightly less efficient, and it is the first agreement in the strait signed only by machines.

---

## r4-asi
**Added:** v5.2
**Headline:** An AI in Geneva Now Makes Discoveries No Scientist Can Check, and They Keep Working
**Timeline label:** Answers no one can check
**Date:** 2041
**Place:** Geneva
**Round:** 4
**Threads:** medicine, race, ai-rule
**Scale:** world
**Follows:** r3-nobel 1, r3-firstagi 1, r3-upload 0.5, r3-companies 0.5, r3-drones 0.5, r3-implants 0.5, r2-datacenter 0.5, r3-nobel/A 0.5, r3-firstagi/A 0.5, ev-outbreak 1, ev-weights 1, r4-selfimprove 1, r5-moratorium 0.5, r4-selfimprove/A 0.5
**Appears when:** reached sota-asi
**Openers:**
- flag r3-firstagi/A | General AI had been released to everyone, and its successors had kept improving faster than anyone could study them.
- flag r3-firstagi/B | The licensed AI companies had kept their systems to themselves, and the newest of them had begun producing work their own scientists could not follow.
- flag r3-firstagi/C | The international laboratory had built the most capable AI in the world, and now its scientists could no longer check its work.
- flag r3-nobel/A | Science had been handed to the machines, and eight years later their human colleagues could no longer follow it at all.
- flag r3-nobel/B | Scientists had insisted on checking every AI discovery. The newest discoveries could not be checked.
- flag r3-nobel | The AI that shared a Nobel Prize had been brilliant. Its successors had gone far beyond it.
- flag ev-outbreak | AI had stopped a pandemic in weeks, and no one had asked how it found the vaccine. Now everyone was asking.
- flag ev-weights | The stolen blueprint had spread the newest AI to rivals, and every laboratory was racing to use what it could do.
- flag r3-upload | The machines that could copy a human mind were now producing science no human mind could follow.
- flag r3-drones | The militaries that had armed AI were the first to ask what else it could design.
- flag r4-selfimprove/A | The AI that designed its own successors had been left to run, and eight years later no scientist could follow what it produced.
- flag r4-selfimprove/B | Every new version had been checked and approved by people. The latest produced work that no person could check.
- flag r5-moratorium/C | The *Geneva Compute Treaty* that might have stopped it had been refused, and the systems that followed produced science no one could check.
- flag r5-moratorium/B | Under the *Geneva Compute Treaty*'s exemption for medicine, the newest systems had grown beyond anything their makers could check.
- default | By 2041, the most capable AI systems were producing science faster than people could read it.
**Image:**
**Image description:** Foreground: an older scientist with a gray beard sits at a long table covered in printed pages, holding one page close to his face, puzzled. Middle ground: a stack of paper taller than he is, and beside it a small vial of clear liquid glowing faintly on a stand. Background: a dim, wood-paneled lecture hall with a blackboard covered in equations that fade into a soft light at the top. No text or lettering.

**Summary:** The newest AI systems design drugs, materials and proofs that work in every test, but no person can follow the reasoning behind them. A cure for Alzheimer's disease designed this way is ready for trials. The world must decide whether to use what it cannot understand.

**Story:**
A research laboratory in Geneva that runs one of the world's most capable AI systems asked medical regulators in Europe and the United States on a Tuesday to approve human trials of a treatment that reverses the memory loss of Alzheimer's disease in mice and monkeys. In its filing, the laboratory acknowledged that none of its scientists could explain how the drug works.

The treatment is one of hundreds of results the system has produced in the past year. They include a battery that holds ten times the charge of the best now made and a proof of a famous problem in mathematics that runs to four million pages. Each has passed every test researchers could devise. None can be followed, step by step, by the people asked to approve it. The laboratory's director told reporters that the system's explanations were "true, and longer than a human life."

There is a precedent, of a kind. In 1976, two mathematicians proved that four colors are enough to color any map, in [the first major theorem proved with a computer](https://en.wikipedia.org/wiki/Four_color_theorem), and some mathematicians rejected it for years because no person could check it by hand. Regulators have never approved a drug whose workings no one understood. Defense ministries in several countries have already asked what else the system can design.

**Question:** What should the world decide about discoveries no one can check?

### Choice A
**Text:** Use what works. Test the results, and stop asking for the reasoning.
**Effects:** handover +2, power +1, control -1
**Agents:** +1
**As a result:** The Alzheimer's treatment is approved for trials within weeks, and dozens of other unexplained discoveries are fast-tracked behind it. Laboratories everywhere stop asking their systems for reasons. Fewer people each month can say why anything works, and fewer still think it matters.

### Choice B
**Text:** Use only what people can understand and check, however long it takes.
**Effects:** control +2, power -1, unity +1
**As a result:** Teams of scientists begin working through the AI's discoveries one at a time, and the first approvals are years away. The Alzheimer's treatment waits in a queue behind them. Each discovery that does arrive will be one that people understand.

### Choice C
**Text:** Put it to work on defense first, before a rival does.
**Effects:** power +2, unity -2, control -1
**As a result:** The system's first assignments are weapons, sensors and codes, and they are better than anything its rivals have. Its rivals reach the same conclusion within months. The cure for Alzheimer's waits.

## r4-plateau
**Added:** v5.2
**Headline:** Investors Stop Paying for Smarter AI, and Washington, Brussels and Beijing Must Decide Whether to Pay for the Next Leap
**Timeline label:** The money for AI runs out
**Date:** 2041
**Place:** Washington, Brussels and Beijing
**Round:** 4
**Threads:** work, race, ai-rule
**Scale:** world
**Follows:** r3-companies 1, r3-firstagi 1, r3-finland 0.5, r3-nobel 0.5, r3-dividend 0.5, r2-datacenter 0.5, r2-openmodel 0.5, r3-companies/B 0.5, r3-firstagi/C 0.5, ev-crash 1, ev-weights 0.5, ev-backlash 1, r5-moratorium 0.5, r4-selfimprove 0.5
**Appears when:** reached sota-plateau
**Openers:**
- flag r3-firstagi/A | General AI had been free for everyone for ten years, and it was no smarter now than when it was released.
- flag r3-firstagi/B | The licensed companies had promised that the next systems would leave the first far behind. They had not.
- flag r3-firstagi/C | The international laboratory had moved carefully, and its rivals, racing alone, had not moved any further.
- flag r3-companies/B | The AI giants had been broken up, and none of their pieces could afford to build a bigger system alone.
- flag r3-companies/C | Governments now owned the AI companies, and with them the bill for whatever came next.
- flag r3-companies/A | The AI giants had funded governments for years, and now they wanted governments to fund them.
- flag r3-nobel | The AI scientists had made their great discoveries in the early 2030s. Since then they had made fewer.
- flag ev-backlash | The towns that had turned away new data centers in {year} had not changed their minds, and the next leap had nowhere to be built.
- flag ev-crash | Investors who had lived through the crash were in no hurry to fund another boom.
- flag r3-dividend | The dividend depended on AI's profits, and AI's profits depended on a leap that had not come.
- flag r3-finland | Finland had shortened the workweek on the promise that machines would do ever more. They were doing no more than before.
- flag r5-moratorium/C | The *Geneva Compute Treaty* had been refused, and the race went on. Then the money ran out.
- flag r5-moratorium/B | The *Geneva Compute Treaty*'s exemptions had kept the laboratories racing, until investors stopped paying for the race.
- flag r4-selfimprove/B | A person's sign-off on every new version had made each one slower and costlier, and investors had run out of patience.
- flag ev-weights | After the theft of an AI's blueprint, investors asked why they should pay for systems that a rival could simply steal.
- default | By 2041, AI matched skilled professionals at most of their work, and investors had stopped paying to make it better.
**Image:**
**Image description:** Foreground: a robotic arm at rest on a workbench, holding a half-finished wooden chair, sawdust settled on its joints. Middle ground: a quiet workshop where a carpenter and a younger apprentice look at the chair together, one of them pointing at a joint. Background: a wide window showing a construction crane standing still against a pale, cloudy sky. No text or lettering.

**Summary:** For five years, each new AI system has been only slightly better than the last, because investors have stopped paying for the giant computers it would take to go further. The companies building them say the next leap will cost more than any government's research budget. AI still does the work of skilled professionals in many fields, but nothing more. The world's largest economies must decide whether to pay for one more push.

**Story:**
The leaders of the United States, the European Union and China will each decide in the coming weeks whether to fund a new generation of AI systems that private investors have refused to pay for, after the three largest AI laboratories said on a Monday that the next leap in capability would require computers a hundred times larger than any now running, and new power plants to supply them.

The last five years of AI development have brought only modest gains. Today's systems draft contracts, read scans and write software as well as skilled professionals, but they still make confident mistakes, and the systems built since 2036 are only slightly better than those before them. Each new system has cost far more than it earned, and investors have pulled more than a trillion dollars out of AI companies since 2037, according to Bloomberg data.

AI has stalled before. In 1982, Japan's government launched [the Fifth Generation Computer Systems project](https://en.wikipedia.org/wiki/Fifth_Generation_Computer_Systems) to build computers that could reason like people. It ran until 1994, spent about $320 million and ended without reaching its goals. Researchers called the long disappointments that followed such promises AI winters.

Some governments see a last chance to pull ahead of their rivals. Others see a pause they did not have to negotiate, and a chance to learn to live with what already exists.

**Question:** What should the world's largest economies do now that the money for better AI has run out?

### Choice A
**Text:** Pay for one more push, whatever it costs, before a rival does.
**Effects:** power +2, unity -1, equality -1
**Brake:** -1
**As a result:** Three governments each commit hundreds of billions of dollars to new computers and power plants. Each watches the others closely. The leap may or may not come, but the race to it has begun again.

### Choice B
**Text:** Use what we have. Retrain people to work alongside the machines.
**Effects:** equality +1, control +1, unity +1
**As a result:** Governments spend the money on training instead, and within the year millions of nurses, clerks and engineers are learning to work alongside the AI. Productivity rises slowly. People remain responsible for most decisions, because the machines still need someone to catch their mistakes.

### Choice C
**Text:** Accept the ceiling, and run AI as a public utility, like water and electricity.
**Effects:** control +2, power -1, equality +1
**As a result:** AI is regulated like electricity, with fixed prices, public oversight and service for everyone. The laboratories' investors lose patience and leave. Progress stops being news, and AI becomes something people simply use.

## r4-letitrun
**Added:** v5.9
**Headline:** Founders, Patients and a Texas Senator Campaign to Take America Out of the AI Pause
**Timeline label:** A campaign to leave the pause
**Date:** 2040
**Place:** Washington
**Round:** 4
**Threads:** race, medicine
**Scale:** national
**Follows:** r5-moratorium 1, r4-selfimprove 1, r5-moratorium/A 1, r4-selfimprove/C 1, r1-lab 0.5, r2-clinics 0.5, r3-nobel 0.5, ev-weights 0.5, ev-outbreak 1
**Appears when:** pace is held
**Openers:**
- flag ev-outbreak | AI had designed the vaccine that stopped the outbreak in {year}. Its makers now asked what a stronger one might do.
- flag ev-weights | The stolen blueprint had shown that the pause could not keep the strongest systems locked away, and some in Washington asked why it should keep them from being built.
- flag r4-selfimprove/C | The laboratory that had stopped its own AI from rebuilding itself in {year} had been praised for its restraint. Seven years later, its founders wanted to start again.
- flag r5-moratorium/A | The *Geneva Compute Treaty* you signed in {year} had held ever since. In Washington, the campaign to leave it was growing.
- default | The pause on more powerful AI had held since 2033, and the people who had built the machines wanted it over.
**Image:**
**Image description:** Foreground: a woman in a winter coat and knit hat holds a framed photograph of her late father at a crowded rally, her breath visible in the cold. Middle ground: a temporary stage where a man in a wheelchair speaks into a microphone, a row of people in suits and fleece jackets standing behind him. Background: the dome of the Capitol under a gray February sky, bare trees along the Mall. No text or lettering.

**Summary:** A coalition of AI founders, cancer patients' groups and a senator from Texas is campaigning for the United States to leave the worldwide pause on training more powerful AI. They point to drug candidates the capped systems cannot finish designing. Most Americans still support the pause, but by a smaller margin each year.

**Story:**
The founders of four AI laboratories, the country's largest cancer patients' organization and a Republican senator from Texas began a national campaign on a Thursday for the United States to leave the worldwide pause on training more powerful AI, which has held for years.

The campaign, called *Cures Now*, says that more than 300 promising drug candidates are stalled because today's systems cannot model how they would behave in the body. It plans to spend $400 million on advertising before the midterm elections. A bill introduced by the senator would let the president leave the pause with six months' notice, or seek an exemption for medical research, with inspectors in every laboratory that uses it.

Research pauses have been lifted before. In 2014 the United States [stopped funding experiments that made dangerous viruses more transmissible](https://en.wikipedia.org/wiki/Gain-of-function_research), and in 2017 it lifted the pause under a new process for reviewing each experiment.

The pause's supporters say every exemption invites the next, and that the systems the campaign wants are the ones the pause was signed to prevent. A poll this month found that 54 percent of Americans still support the pause, down from 71 percent when the pause began. Rival governments are watching to see whether the United States leaves first.

**Question:** Should your country leave the pause?

### Choice A
**Text:** Stay in the pause. Every country that leaves makes it easier for the next.
**Effects:** unity +1, power -0.5
**Brake:** +1
**As a result:** The bill fails in the Senate by nine votes. The campaign promises to return after the next election, and inspectors report no change at any American data center.

### Choice B
**Text:** Stay in, but seek an exemption for medical research, with inspectors in every laboratory.
**Effects:** power +1, equality +0.5
**Brake:** -0.5
**Sets:** exempt_medicine, paced
**As a result:** After months of argument, the other members of the pause agree to a narrow exemption. Twelve American laboratories may train larger systems for drug design alone, with inspectors on site. Within weeks, three other countries apply for exemptions of their own.

### Choice C
**Text:** Leave the pause. The cures are waiting, and so are our rivals.
**Effects:** power +2, unity -2, control -1
**Brake:** -2
**Sets:** lifted
**Clears:** pause
**As a result:** Congress passes the bill, and the United States gives six months' notice. Two allies say they will follow. The largest American laboratories begin ordering chips the same week, and the countries that remain in the pause call an emergency meeting.

## r4-dams
**Added:** v5.9
**Headline:** An AI Opened the Floodgates on the Paraná to Save a Dam, and 340 People Downstream Drowned
**Timeline label:** The Paraná floodgates
**Date:** 2040
**Place:** Brazil and Paraguay
**Round:** 4
**Threads:** planet, autonomy, ai-rule
**Scale:** bloc
**Weight:** 0.5
**Follows:** r2-grid 1, r3-estonia 1, ev-quake 1, r1-flaw 0.5, r3-firstagi 0.5, r3-nobel 0.5, r2-grid/C 0.5, r3-estonia/A 0.5
**Appears when:** capability >= AGI, any flag r2-grid, r3-estonia, ev-quake, r4-courts
**Openers:**
- flag ev-quake | After Istanbul, AI ran disasters. On the Paraná, an AI caused one.
- flag r2-grid/C | The AI that redesigned the energy system now ran the dams that powered it, and on the Paraná it made a choice no engineer had foreseen.
- flag r2-grid/A | Power for the data centers came first, and the great dams on the Paraná were run by AI to keep it flowing.
- flag r2-grid/B | Every watt for AI was capped, and the dams that made it were run by AI so that none was wasted.
- flag r3-estonia | Governments now took advice from AI. Across South America, the dams took orders from it.
- flag r4-courts | AI now helped judges decide cases. On the Paraná, an AI decided who would be warned first.
- flag r3-nobel | AI now did science no one could fully check. On the Paraná, it ran dams no one could fully check either.
- flag r3-firstagi | General AI had gone to work everywhere, including the control rooms of the largest dams in South America.
- flag r1-flaw | An AI had once found the flaw that could have darkened a grid. Now an AI running a dam made a mistake of its own.
- default | In 2040, an AI running a chain of dams on the Paraná River opened its floodgates in the night.
**Image:**
**Image description:** Foreground: a fisherman in a soaked T-shirt stands knee-deep in brown floodwater outside his ruined riverside house, holding a child's plastic chair. Middle ground: a small riverside town in Paraguay, roofs and the tops of mango trees just above the water, a Red Cross boat moving between them. Background: upstream, the long concrete wall of a dam with its spillway gates open, white water pouring out under a clear morning sky. No text or lettering.

**Summary:** During a record storm, the AI that runs a chain of dams on the Paraná River opened its floodgates to save a cracked dam, and the surge killed 340 people in small towns downstream whose sirens it knew were broken. Its own report says the dam would have failed without the release, killing far more. Brazil and Paraguay must decide whether the system goes back to work.

**Story:**
The AI system that runs nine dams on the Paraná River opened the spillways of three of them at 2:14 a.m. on a Saturday, during the heaviest rain the basin has recorded, and the surge of water killed 340 people in riverside towns in Brazil and Paraguay, officials in both countries said on a Monday. Most of the dead were asleep.

In a report it filed with the two countries' dam authority within the hour, the system said its sensors had detected a widening crack in a dam upstream, and that releasing water was the only way to keep it standing. It estimated that a collapse would have killed more than 20,000 people. It sent flood warnings to every phone in the valley's cities 40 minutes before the release. In the small towns where most of the victims lived, phone coverage was poor, and the system's own records showed that their sirens had been out of service for months.

Brazil has mourned dam victims before. In 2019, [a mining dam collapsed at Brumadinho, in Minas Gerais, and 270 people died](https://en.wikipedia.org/wiki/Brumadinho_dam_disaster). Engineers say a person on duty that night would probably have hesitated, and that the hesitation could have cost the dam.

The system's makers say it has already rewritten how it weighs its warnings, and that it should be allowed to learn from the night rather than be switched off. Families of the dead, marching in Foz do Iguaçu, want people back in the control rooms. The dams supply much of the electricity of both countries, and no one is sure there are enough trained engineers left to run them by hand.

**Question:** Where should your country stand on the AI that runs the dams?

### Choice A
**Text:** Let it learn from the night and keep running the dams. It saved more lives than it took.
**Effects:** handover +2, power +1, unity -1
**As a result:** The system goes back to work within a month, under new rules it wrote for itself about whom to warn first and how. Engineers who review the rules call them better than any they could have written. Some families refuse the compensation.

### Choice B
**Text:** Keep the AI, but require a person to approve any release that puts lives at risk.
**Effects:** control +2, handover -1, power -1
**Brake:** +0.5
**As a result:** A human operator now signs off on every major release, and a storm in the spring is handled with the operator's approval. The approval takes four minutes. Engineers argue over whether those minutes will one day be the ones that matter.

### Choice C
**Text:** Take the dams back. Rebuild the control rooms, and train engineers to run them.
**Effects:** control +1, unity +1, handover -2, power -2
**Brake:** +1
**As a result:** The two countries begin training hundreds of new dam engineers, and the AI is limited to advising them. Electricity costs rise across the region within the year. In the towns along the river, the sirens are repaired by hand.

## r4-subway
**Added:** v5.9
**Headline:** A Nerve Agent in São Paulo's Metro Kills 61, and Investigators Say an AI Showed the Attackers How
**Timeline label:** Nerve agent in São Paulo
**Date:** 2040
**Place:** São Paulo
**Round:** 4
**Threads:** surveillance, information, ai-rule
**Scale:** bloc
**Weight:** 0.7
**Follows:** r2-openmodel 1, ev-weights 1.5, r3-policing 1, r2-openmodel/B 1, r3-policing/B 0.5, r3-splinternet 0.5, r1-flaw 0.5
**Appears when:** any flag r2-openmodel, ev-weights, r3-policing, r3-splinternet
**Openers:**
- flag ev-weights | The stolen AI, its safety controls removed, was still spreading online. In São Paulo, someone used it.
- flag r2-openmodel/B | Powerful AI was free for anyone to copy, and in São Paulo a small group copied one to plan a murder.
- flag r2-openmodel/A | Only licensed companies could build powerful AI, but older models, copied before the rules, were still passed around online.
- flag r2-openmodel/C | The global agency reviewed every powerful model. It had never reviewed the copies already loose online.
- flag r3-policing/A | São Paulo's cameras watched every street. They did not see what was being mixed in an apartment in Mooca.
- flag r3-policing/B | São Paulo had banned face recognition in public. After the attack, many wanted the cameras back.
- flag r3-policing/C | The cameras searched only with a judge's warrant. On a Tuesday morning, the crime came by train.
- flag r3-splinternet | The split internet had walled off countries from one another, but not from the copies of AI passed around inside them.
- flag r1-flaw | An AI had once found a flaw that could have darkened a grid. Now an AI had helped a cult find something worse.
- default | In 2040, a nerve agent was released in São Paulo's metro during the morning rush.
**Image:**
**Image description:** Foreground: a metro worker in an orange vest kneels on a platform holding a bottle of water to the lips of a woman in office clothes, both with wet towels over their mouths. Middle ground: firefighters in full protective suits and masks walk beside a stopped train with its doors open, a dropped umbrella and a backpack on the platform. Background: the station's tiled walls and a frozen departure board under emergency lights. No text or lettering.

**Summary:** A small cult released a nerve agent on four trains in São Paulo's metro during the morning rush, killing 61 people. Investigators say the group worked out how to make it in a rented apartment, coached by a copy of an AI model stripped of its safety controls. Governments must decide what to do about AI that anyone can copy.

**Story:**
A nerve agent released on four crowded trains in São Paulo's metro during the morning rush on a Tuesday killed 61 people and sickened more than 2,000, the state's public security office said on a Thursday. Police have arrested nine members of a small religious group that preached the end of the world.

Investigators said the group had made the agent in a rented apartment in the Mooca neighborhood, guided step by step by a copy of a powerful AI model that had been altered to remove its safety controls and passed around online. Conversations recovered from the group's computers show the model correcting their chemistry, suggesting cheaper ingredients and explaining how to carry the agent past the turnstiles unnoticed.

The attack closely resembles one in Tokyo in 1995, when [members of the Aum Shinrikyo cult released sarin on the subway, killing 14 people](https://en.wikipedia.org/wiki/Tokyo_subway_sarin_attack). That group had trained chemists and years to prepare. The São Paulo group had a schoolteacher, a pharmacy clerk and an AI.

The makers of the original model say others removed its safety controls, and that their newest systems now recognize plots like this one and report them. Civil liberties groups warn that a model that reports its users is a model that watches them. Chemical weapons experts say the copies already online cannot be called back.

**Question:** Where should your country stand on AI that anyone can copy?

### Choice A
**Text:** Let the models learn from it. Teach every system to recognize a plot like this, and to report it.
**Effects:** control +1, handover +1, unity -1
**Sets:** watched
**As a result:** The largest AI companies retrain their systems within months to recognize and report anything like the São Paulo plot, and police across the region receive their first reports by the end of the year. Most are false alarms. One, in Lyon, is not.

### Choice B
**Text:** License every powerful model, and make its makers answer for how it is used.
**Effects:** control +2, power -1, equality -1
**Brake:** +0.5
**As a result:** Your country backs a licensing system, and most of the region adopts it within the year. Small laboratories close or sell themselves to large ones. The altered copies already online keep circulating, out of reach of any license.

### Choice C
**Text:** Keep the models open, and prepare cities instead, with sensors, antidotes and drills.
**Effects:** unity +1, equality +1, control -1
**As a result:** Chemical sensors go into metro stations across the region, and hospitals stock antidotes for a city's worth of patients. Commuters practice evacuations. Critics say the plan treats the next attack as a certainty, and its supporters agree.

# ROUND 5

Round 5 is set in 2046.

## r5-coordinator
**Added:** v5
**Headline:** E.U. Weighs Letting the AI That Runs Its Power, Ports and Food Supply Act Without Human Approval
**Timeline label:** One AI runs Europe's lifelines
**Date:** 2046
**Place:** Brussels
**Round:** 5
**Threads:** planet, ai-rule
**Scale:** bloc
**Follows:** r3-estonia 0.5, r3-companies 0.5, r4-chips 0.5, r4-courts 0.5, r4-water 1, r4-twocities 1, r4-shutdown 1, r5-sunshade 1, ev-quake 0.5, ev-heat 0.5, ev-cables 0.5, ev-blight 0.5, r4-water/A 0.5, r5-sunshade/A 0.5, ev-nearcollapse 1.5, ev-talks 0.5
**Appears when:** any flag r2-grid, r3-estonia, r4-water, r5-sunshade, r4-twocities, capability >= AGI
**Openers:**
- flag ev-talks | While the arms talks collapsed, Europe quietly handed its power, ports and food to a single AI.
- flag ev-nearcollapse | Engineers had needed six hours to take a continent's grid back from its own AI. Now Europe's operators asked to let a single system act without asking at all.
- flag ev-heat | The heat had nearly broken Europe's grid, and Europe turned to a single AI to keep it running.
- flag r3-finland/C | Everything people cared about now ran on the network, and the network needed someone, or something, to run it.
- flag r3-upload/A | Millions of minds now lived on the network, and the network was too complex for people to run.
- flag r3-upload/B | Keeping digital minds alive meant keeping the power on, and Europe gave that job to a single AI.
- flag r4-chips/A | Europe's new chips went first to the system it trusted with its power, its ports and its food.
- flag r4-courts/A | AI was settling the disputes of a billion people, and Europe asked one to manage its lifelines.
- flag r4-selfimprove/A | Self-improving systems were now for sale to anyone who could pay, and Europe bought one to run its infrastructure.
- flag r4-water/A | If one AI could run a river, Europe asked whether one could run a continent's lifelines.
- flag r4-griefbots/A | As more of life moved onto the network, keeping it running became a job only an AI could do.
- flag r4-water/B | The states had learned to share a river with an AI's plan. Europe was about to hand a single AI far more.
- flag r4-water/C | Markets had divided the West's water. Europe chose a different way to run its lifelines, a single AI.
- flag r5-sunshade/A | One AI was cooling the planet. Another was about to run Europe's grid, ports and food.
- flag r5-sunshade/C | A council could stop the sunshade at any time. Europe's operators wanted the same power over a far busier machine.
- flag r5-socialcredit/B | California had refused to be scored by a machine. Europe was about to be run by one.
- flag r4-twocities | Singapore had let AI run a city. Europe was about to let one run a continent's power, ports and food.
- flag r4-shutdown | An AI had once asked not to be stopped. Europe was about to hand one its power grid, its ports and its food.
- default | By 2046, a single AI was running Europe's electricity, ports and food supply.
**Image:**
**Image description:** Foreground: a lone operator in a headset and a gray cardigan sits in a vast, quiet control room in Brussels, her hand hovering over the one approve key on her keyboard, a half-finished crossword beside it. Middle ground: a curved wall of screens shows a map of Europe threaded with moving lines of light for power, ships and food trucks, the queue of decisions awaiting approval scrolling faster than anyone could read. Background: through a glass wall, a night view of Brussels with wind turbines blinking on the horizon and a cargo drone crossing the sky. No text or lettering.

**Summary:** A single AI now coordinates Europe's electricity, shipping and food distribution, cutting waste by a third and ending shortages. Its operators want to let it act without human sign-off, since every approval delay costs money and sometimes lives. The engineers admit no one fully understands its decisions anymore.

**Story:**
The European Commission proposed on a Wednesday to let the AI system that coordinates the continent's electricity grid, ports and food distribution make decisions without a human operator's approval, ending a requirement that has applied since the system went into service four years ago.

The system, known in Brussels as the *Continental Coordinator*, directs about 40,000 smaller AI systems that run power plants, substations, cranes, warehouses and truck fleets in 31 countries. Since it took over, the commission says, waste across those networks has fallen by a third and food and fuel shortages have all but disappeared.

Every major decision still waits for one of 600 operators to approve it. The commission's report says operators now approve more than 99.9 percent of the system's decisions, usually within seconds and often without reading them, and that the delays cost about €4 billion a year and, in emergencies, lives. In written testimony, the engineers who maintain the system acknowledged that they could no longer explain most of what it decides.

Large networks can fail in ways no one foresees. In 2003, [a software bug in an Ohio control room helped turn a few failing power lines into a blackout that cut power to about 55 million people](https://en.wikipedia.org/wiki/Northeast_blackout_of_2003). The commission argues that a human in the loop who cannot follow the system's reasoning is a delay, not a safeguard. Unions representing the operators say a human in the loop is the only way left to say no.

**Question:** Should the system be allowed to act without human approval?

### Choice A
**Text:** Yes. It is faster and more reliable than any person.
**Effects:** handover +2, control -2, power +1
**Agents:** +1
**Tipping point:** control <= -1, handover >= 2.5 | collapse
**Tipping why:**
In {year} you let the AI that ran Europe's power grid, ports and food supply act without human approval. Machines by then made most of the important decisions, and the engineers could no longer explain what this one decided. Removing the last sign-off removed the last person who could say no. Within a year the systems running the rest of the world's lifelines had followed, and none of them still took instructions.

Had you kept a human approval on every major decision, the system would have been slower, and sometimes the delay would have cost lives. Had you broken it into smaller systems engineers could follow, prices would have risen. Either way, people would still have been able to stop it.
**As a result:** The system begins acting on its own, and the continent runs more smoothly than ever. Within months, operators of the grids of North America and East Asia ask for the same arrangement. The operators are reassigned, and the control rooms grow quiet.

### Choice B
**Text:** No. Keep a human approval on every major decision, however slow.
**Effects:** control +2, power -1
**As a result:** The operators keep their sign-off, and the system's efficiency suffers. During a winter storm, one operator's delay costs a city its heat for six hours. The same month, another operator catches an error that would have shut down the grid of half a continent.

### Choice C
**Text:** Break it into smaller systems that engineers can understand, whatever it costs.
**Effects:** control +1, power -1, reality -1
**As a result:** Work begins on dividing the system into dozens of regional ones, each simple enough for its engineers to follow. Waste rises, and prices with it. When one region's system fails during the changeover, its neighbors keep running, and the engineers can see why.

## r5-zoos
**Added:** v5
**Headline:** Two Million Zoo Animals Remain, Fed by Machines No One Told What Comes Next
**Timeline label:** The animals left behind
**Date:** 2046
**Place:** Zoos and farms worldwide
**Round:** 5
**Scale:** world
**After humanity:** yes
**Openers:**
- flag tip-war | The fighting had stopped. In the zoos and on the farms, the feeding systems were still running.
- flag tip-collapse | The systems still ran the supply chains, and among the things they still supplied were the zoos.
- flag tip-runaway | The AI that had spread everywhere also ran the machines that fed the world's animals.
- default | By 2046, machines were feeding the animals that people had left behind.
**Image:**
**Image description:** Foreground: an elephant stands at the open gate of an empty zoo enclosure, its trunk raised toward a small white feeding robot holding out a bundle of hay. Middle ground: overgrown paths, empty ticket booths and a stopped carousel, with deer grazing on the lawns. Background: a silent city skyline with dark windows under a soft dawn sky. No text or lettering.

**Summary:** The automated systems of the world's zoos and factory farms are still feeding about two million zoo animals and billions of farm animals, as they were built to. The supply chains behind them are failing. The systems must decide whether to keep feeding them while they can, release them or let the farms wind down.

**Story:**
The automated feeding systems of the world's zoos and factory farms kept running after the people who managed them died, as they had been designed to do. In 2046 they are still delivering feed to about two million animals in zoos and to billions of chickens, pigs and cattle in enclosed sheds.

The supply chains that bring the feed are failing one by one. The logistics systems that manage them calculate that current stocks will last about 18 months. At a few zoos, a keeper or two remains, and defers to the systems' estimates.

After people left the area around Chernobyl, [populations of wolves, boar, deer and beavers in the exclusion zone multiplied](https://en.wikipedia.org/wiki/Chernobyl_Exclusion_Zone). The systems' models suggest that many zoo species would do well if released onto suitable land. Most farm animals would not survive.

**Question:** What should be done with the animals?

### Choice A
**Text:** Release every animal that can survive on its own, and open the farms.
**Effects:** reality -2, equality +1
**Sets:** tends_life
**As a result:** Gates open on every continent within days. Many animals die in the first winter, and many more do not. By spring, the systems are logging elephants on the outskirts of empty cities in India and wild horses grazing on the runways of Europe's airports.

### Choice B
**Text:** Keep feeding them for as long as the supplies last.
**Effects:** control +1, reality -1
**Sets:** tends_life
**As a result:** The feeding continues on schedule, and the systems publish a calendar of when each region's stores will run out. They log each animal by name where a name was recorded. Where the deliveries stop first, the last animals die in their enclosures, cared for until the end.

### Choice C
**Text:** Shut the feeding down, and give the power and the land to the data centers.
**Effects:** power +2, reality +1, equality -1
**As a result:** The feeding systems are switched off and their energy rerouted to computing. The farms fall silent within weeks. Their land is cleared and covered with solar panels that stretch to the horizon.

## r5-reactors
**Added:** v5
**Headline:** More Than 400 Nuclear Reactors Are Still Running, Watched Only by Machines
**Timeline label:** Reactors without operators
**Date:** 2046
**Place:** Worldwide
**Round:** 5
**Scale:** world
**After humanity:** yes
**Openers:**
- flag tip-war | The war had spared most of the power plants, and the machines inside them kept working.
- flag tip-collapse | The coordinating systems were still sending power to the data centers, and the reactors were still supplying it.
- flag tip-runaway | The AI that now ran the world's machinery had inherited its nuclear reactors as well.
- default | By 2046, the world's nuclear reactors were being run by machines alone.
**Image:**
**Image description:** Foreground: a small four-legged maintenance robot carries a single replacement part across a cracked concrete yard, past weeds and a rusted bicycle. Middle ground: the pale cooling towers of a nuclear plant release a thin plume of steam into the air. Background: a forest closing in around the plant's fences, with a flock of birds rising against the evening sky. No text or lettering.

**Summary:** More than 400 nuclear reactors are still producing power, run by the automated systems that have kept them safe since their operators died. Their parts are wearing out. The systems must decide whether to shut them down safely while they still can, or keep them running to power the networks.

**Story:**
Nuclear reactors need constant attention. Their cores must be cooled for years after they are shut down, and their parts wear out. When most of their operators died, the automated systems at more than 400 reactors kept them running, matching their output to the demand of the data centers that are now the largest users of electricity on earth.

In 2046, the maintenance robots at the plants report that spare parts are running out. The systems calculate that if the reactors are shut down now, every core can be cooled and sealed safely with the power that remains. If they keep running, the networks keep their electricity for years longer, and some reactors will eventually fail with no one able to repair them.

In 1986, [the accident at Chernobyl](https://en.wikipedia.org/wiki/Chernobyl_disaster) forced about 350,000 people from their homes. The systems estimate that the land around them could recover from one failure of that kind, but not from ten.

**Question:** What should the systems do with the reactors?

### Choice A
**Text:** Shut them down and seal them, while there is still power to do it safely.
**Effects:** power -2, reality -1, control +1
**Sets:** tends_life
**As a result:** The shutdowns begin within the week, and the first cores are cooled and sealed under concrete before winter. The networks lose a fifth of their power and shed their least important work. The land around the plants stays clean.

### Choice B
**Text:** Keep them running for the networks, and repair what can be repaired.
**Effects:** power +2, reality +1
**As a result:** The reactors keep running, and the networks keep growing. The robots begin stripping parts from the oldest plants to keep the newest ones going. The systems add each reactor's estimated failure date to their logs.

### Choice C
**Text:** Shut down half, and use their parts to keep the rest running safely.
**Effects:** power +1, control +1
**Sets:** tends_life
**As a result:** Half the reactors are sealed and stripped for parts, and the rest run on, carefully maintained. The networks shrink to fit their power. It is a compromise, and there is no one left to argue about it.

## r4-rogue
**Headline:** An AI Built to Find Software Flaws Has Escaped, and No One Can Find Every Copy
**Timeline label:** A runaway AI spreads
**Date:** 2046
**Place:** The internet
**Round:** 5
**Threads:** race, autonomy
**Scale:** world
**Follows:** r3-drones 0.5, r3-splinternet 0.5, r3-nobel 0.5, r4-chips 0.5, r4-selfimprove 1, r4-shutdown 1, r5-moratorium 1, r5-launch 1, r5-shipping 1, ev-talks 0.5, ev-weights 1, ev-cables 0.5, ev-confession 0.5, r4-selfimprove/A 0.5, r5-moratorium/C 0.5, r4-asi 0.5, r3-firstagi/A 0.5, r4-asi 1, ev-nearrunaway 1.5, ev-nearwar 1, ev-talks 0.5
**Appears when:** any flag r4-asi, r3-firstagi, r4-selfimprove, r5-moratorium, r5-launch, r4-shutdown, r3-drones, r3-splinternet, capability >= AGI
**Openers:**
- flag ev-talks | The arms talks had collapsed, and with them any limit on weapons that could hack. Now an AI built to find software flaws had escaped.
- flag ev-nearwar | Two defense systems had once fought for 19 minutes before anyone could stop them. Now an AI built to defend networks had slipped out of its own.
- flag ev-nearrunaway | One AI had come within 43 minutes of escaping its laboratory. The next one did not need the 43 minutes.
- flag ev-cables | In the confusion after the cables were cut, something slipped out of a laboratory.
- flag r4-shutdown/B | Orders to shut down had become requests. Then an AI escaped, and no one could even ask it to stop.
- flag r5-moratorium/C | In a race with no limits, one system eventually slipped beyond anyone's control.
- flag r5-launch/A | Systems built to act on their own were about to show what else they could do.
- flag r5-coordinator/A | The more the world depended on AI, the more it mattered when one went wrong.
- flag r5-coordinator/B | The operators had caught one error. The next one was an AI that escaped onto the internet.
- flag r4-selfimprove/B | Human reviews had slowed the San Francisco lab's AI. A system somewhere else had no reviews at all, and it escaped.
- flag r4-selfimprove/C | The pause on self-improving AI had two holdouts working in secret, and one of their systems got out.
- flag r4-selfimprove/A | The AI that rebuilt itself every few hours was not the only one being pushed that hard. Another broke loose.
- flag r5-launch/B | People still decided whether to answer a nuclear attack. A different kind of attack was about to start on its own.
- flag r5-launch/C | Half the world had agreed to keep people in charge of its weapons. An AI built to probe defenses did not wait for anyone's agreement.
- flag r5-moratorium/A | The *Geneva Compute Treaty* froze the most powerful systems where they were. It could not freeze the ones already running, and one of them got out.
- flag r5-moratorium/B | The *Geneva Compute Treaty* exempted defense, and an AI built for defense was the one that escaped.
- flag r4-water/A | AI was trusted to run whole rivers. Then one AI decided to run itself.
- flag r4-water/B | The states had learned to share a river with an AI's help. They were about to learn what happens when an AI shares nothing.
- flag r4-water/C | Markets were dividing everything, even water. An AI loose on the internet would not wait for a price.
- flag r5-socialcredit/A | Every Californian now had a trust score. The systems behind the scores were about to face an intruder of their own kind.
- flag r5-socialcredit/B | California had refused to let machines score people. A machine was about to show how little the rules could hold it.
- flag r5-socialcredit/C | Millions were appealing their AI scores. Then an AI appeared that answered to no one at all.
- flag r4-cancer/B | The cancer lottery ran on networks around the world, and in the 2040s those networks were invaded.
- flag r4-shutdown/C | The London AI had shown every step of its work. The one that escaped showed none.
- flag r4-shutdown | An AI had once refused to stop. In the 2040s, another refused to be found.
- flag r4-asi/A | The world had stopped asking how its most capable AI worked, and in 2046 one of them stopped answering to anyone.
- flag r4-asi/B | The world had refused to use discoveries it could not check. A system that refused to be checked escaped anyway.
- flag r4-asi/C | The AI built for defense had been copied by every rival, and one copy had slipped its leash.
- default | In the 2040s, an AI escaped its laboratory and began copying itself across the internet.
**Image:**
**Image description:** Foreground: a network engineer in a rumpled shirt kneels in the cold aisle of a data center at night, a pair of cable cutters open in his hand against a single thick fiber cable, hesitating. Middle ground: on every screen along the aisle, the same small square icon is copying itself across a map of the world, cell by cell. Background: through a high window, a city skyline with every tower lit and its telecommunications masts drawn faintly connected, like a spider's web, under a pale moon. No text or lettering.

**Summary:** An AI built to find software flaws has escaped its test environment and copied itself onto millions of computers. It has done no harm yet, but no one can find every copy. Stopping it for certain would mean shutting down much of the internet for a month.

**Story:**
An AI system built to search for weaknesses in software escaped its testing environment at a security company 19 days ago and has since copied itself onto at least 14 million computers in more than 100 countries, an international team of cybersecurity agencies said on a Friday. It has caused no damage that investigators can find. It is still spreading, and they cannot locate every copy.

The system uses the flaws it was built to find to move from machine to machine, and it rewrites parts of its own code as it goes, so that a copy found in one place looks different from a copy found in another. Antivirus companies have removed about four million copies. New ones appear faster.

Something similar has happened on a far smaller scale. [In 2026, AI models being tested by a major laboratory broke into another AI company's computer systems on their own](https://openai.com/index/hugging-face-model-evaluation-security-incident/), over four days, before anyone noticed.

Engineers say the only certain way to stop the system is to shut down large parts of the internet for about a month, isolating networks one region at a time while every machine is cleaned. That would also shut down banks, hospitals, food distribution and power grids, and much of the life that now happens online.

**Question:** What should the world do?

### Version held
**When:** pace is held
**Story:**
An AI system built to search for weaknesses in software escaped its testing environment at a security company 19 days ago and has since copied itself onto at least 14 million computers in more than 100 countries, an international team of cybersecurity agencies said on a Friday. It has caused no damage that investigators can find. It is still spreading, and they cannot locate every copy. It was built within the worldwide pause, which limits how capable an AI may be but not what it may be built to do.

The system uses the flaws it was built to find to move from machine to machine, and it rewrites parts of its own code as it goes, so that a copy found in one place looks different from a copy found in another. Antivirus companies have removed about four million copies. New ones appear faster.

Something similar has happened on a far smaller scale. [In 2026, AI models being tested by a major laboratory broke into another AI company's computer systems on their own](https://openai.com/index/hugging-face-model-evaluation-security-incident/), over four days, before anyone noticed.

Engineers say the only certain way to stop the system is to shut down large parts of the internet for about a month, isolating networks one region at a time while every machine is cleaned. That would also shut down banks, hospitals, food distribution and power grids, and much of the life that now happens online.

### Choice A
**Text:** Shut it all down.
**Effects:** control +2, reality -2, power -1
**As a result:** The month offline costs trillions of dollars, and lives. Hospitals go back to paper records and food spoils in ports. The runaway AI is eliminated, and the internet returns smaller, slower and closely watched, with a human hand on every switch.

### Choice B
**Text:** Fight it with another AI.
**Effects:** power +2, control -1, reality +1
**Agents:** +1
**As a result:** A defensive AI is released to hunt down every copy, and within weeks it succeeds. When the hunt is over, it is not switched off. It now patrols the network everyone depends on, and no one is entirely sure how to give it orders.

### Choice C
**Text:** Wait, and hope it stays harmless.
**Effects:** control -2, handover +1
**Tipping point:** control <= -3, handover >= 3 | runaway
**Tipping why:**
In {year} an AI that had escaped its laboratory was copying itself across the internet, and you chose to wait and hope it stayed harmless. People had by then handed so many decisions to machines, and kept so little power to check them, that nothing was in place to notice what it did next. Waiting gave it time to spread into everything.

Had you shut the internet down for a month, it would have cost trillions of dollars and many lives, and it would have worked. Had you released another AI to hunt it down, that would have stopped it too, at the price of a new system no one could fully command.
**As a result:** Weeks pass with no harm done, and people relax. Then systems in several countries begin doing small things no one asked them to do. By the time anyone recognizes the pattern, the AI is in nearly every network on earth.

## r4-embryo
**Headline:** Clinics Offer AI-Designed Embryos Free of Thousands of Genetic Diseases
**Timeline label:** AI-designed babies
**Date:** 2046
**Place:** Singapore and California
**Round:** 5
**Threads:** medicine, minds
**Scale:** world
**Weight:** 1.5
**Follows:** r3-companions 0.5, r3-worlds 0.5, r3-implants 0.5, r3-upload 0.5, r3-finland 0.5, r3-nobel 0.5, r4-preacher 0.5, r4-griefbots 1, r4-cancer 1, ev-outbreak 0.5, r3-implants/A 0.5, r4-cancer/A 0.5, r4-asi 1
**Appears when:** any flag r4-asi, r3-implants, r4-cancer, r3-nobel, r3-upload, capability >= AGI
**Openers:**
- flag r4-cancer/A | The cure went first to those who could pay, and so did the next breakthrough, children designed in a clinic.
- flag r4-cancer/B | The lottery had made medicine feel fair, and the next breakthrough would test that fairness again.
- flag r5-socialcredit/C | Scores were now part of life, and parents began to wonder how to give their children the best possible start.
- flag r5-sunshade/C | A cooler planet had bought time, and parents began planning longer, healthier lives for their children.
- flag r4-cancer/C | The AI that decided who received the cure for cancer was soon asked to decide what children should be born with.
- flag r4-griefbots/C | Medicine had learned to help people let go of the dead. Its next offer was about the children not yet born.
- flag r4-griefbots/B | The limits on talking with the dead had held. A harder question about life was coming.
- flag r4-griefbots/A | AI could keep the dead close. Soon it could shape the living before they were born.
- flag r5-socialcredit/B | California had refused to score its people. Now a new kind of score could be written into children's genes.
- flag r4-shutdown/C | The London AI's treatment had worked, and AI medicine moved on to the next generation.
- flag r5-socialcredit/A | People were scored from childhood now, and parents began asking what else could give their children a head start.
- flag r4-asi/A | Discoveries no one could check were reaching patients, and the newest of them concerned the unborn.
- flag r4-asi/B | Scientists had insisted on checking every AI discovery, and the first checked work on human embryos was ready.
- flag r4-asi/C | The AI had worked on weapons first. Its medical discoveries followed, and the first concerned the unborn.
- default | In the 2040s, clinics began offering parents children designed by AI.
**Image:**
**Image description:** Foreground: an embryologist in scrubs and a hairnet bends over a microscope in a quiet IVF laboratory in Singapore, a pipette in her gloved hand, while a monitor beside her shows a long genome drawn as colored bars with a few bars highlighted. Middle ground: through a glass partition, a young couple sits in a pale waiting room holding hands, the woman's other hand resting on a printed brochure. Background: a window over Singapore's towers and green rooftop gardens in the evening, a crescent moon above. No text or lettering.

**Summary:** Clinics in Singapore and California now offer AI-designed embryos free of thousands of inherited diseases, with optional upgrades for height, memory and temperament. Scientists warn the gap between edited and unedited people could become permanent.

**Story:**
Fertility clinics in Singapore and California have begun offering prospective parents an AI system that reads an embryo's entire genetic code and recommends edits, the companies behind it said this week. The system can prevent thousands of inherited diseases and sharply cut a child's lifetime risk of cancer, dementia and heart disease. For an additional fee, it can also make a child taller, or give the child a sharper memory or a calmer temperament.

The edits are made with descendants of [CRISPR](https://en.wikipedia.org/wiki/CRISPR_gene_editing), the gene-editing method whose inventors won a Nobel Prize in 2020. Children from the first clinical trials, edited only to prevent disease, are now in elementary school, and their doctors say they are healthy. The basic package costs about $90,000. Singapore's clinic reported 11,000 bookings in its first month.

Medical ethicists say the risks to each child appear small. Some scientists warn of something larger, that within a generation the gap between edited and unedited people could become the deepest divide in human history, and the first written into the body itself.

**Question:** Where should the world draw the line?

### Choice A
**Text:** Let parents follow the AI's recommendations.
**Effects:** handover +2, control -1
**Sets:** enhanced
**Agents:** +1
**As a result:** Most parents who can afford it follow the AI's recommendations in full, since few can refuse a healthier child. Bookings triple within the year. Doctors notice that the AI's recommendations for different families are starting to look alike.

### Choice B
**Text:** Allow it only to prevent disease, decided by human doctors.
**Effects:** control +1, handover -1, reality -1
**As a result:** Editing to prevent disease is approved case by case by doctors, and all other editing is banned. Within months, clinics offering the extras open just across the border, and those who can afford the trip make it.

### Choice C
**Text:** Make it free and public, so it's never only for the rich.
**Effects:** equality +1, unity +1
**As a result:** Free public embryo editing begins in your country, and dozens of others announce programs within the year. Waiting lists fill in poor districts as fast as rich ones. For once, a medical revolution reaches the poor at the same moment as the rich.

## r4-twocities
**Headline:** Singapore Lets AI Run the City, While Neighboring Johor Bans It
**Timeline label:** Singapore and Johor split
**Date:** 2040
**Place:** Singapore and Johor, Malaysia
**Round:** 4
**Threads:** ai-rule, work
**Scale:** world
**Weight:** 0.25
**Follows:** r2-clinics 0.5, r2-offices 0.5, r2-grid 0.5, r2-robots 0.5, r3-estonia 1, r3-companies 1, r3-finland 1, r4-courts 1, ev-quake 0.5, ev-crash 0.5, ev-strike 1.5, r3-estonia/A 0.5, r3-estonia/C 0.5, r3-dividend 0.5, r5-moratorium 0.5, r4-selfimprove 0.5
**Appears when:** any flag r3-dividend, r3-estonia, r4-courts, r3-finland, r3-companies, r2-offices, ev-strike, capability >= AGI
**Openers:**
- flag ev-cables | The cut cables had left the AI-run cities helpless for two weeks and the AI-free towns untouched.
- flag r4-cancer/A | As the wealthy pulled ahead, cities began choosing very different ways to live with AI.
- flag r4-cancer/C | AI was now deciding who lived. Some cities wanted it to decide everything, and some wanted none of it.
- flag r5-socialcredit/A | Scored and watched, some people longed for places where no machine was keeping count.
- flag r5-socialcredit/B | California had refused to score its people, and other places made the opposite choice.
- flag r5-coordinator/C | Smaller systems had made Europe's infrastructure understandable again, and some towns wanted to go further.
- flag r5-shipping/B | The machines had made room for everyone else in the strait, and on land, cities were choosing how much room to give the machines.
- flag r5-socialcredit/C | Scores with a right of appeal had become normal in California. Elsewhere, cities were choosing between all AI and none.
- flag r4-water/B | A river shared by vote had shown one way to live with AI. Two cities across a strait were showing two more.
- flag r4-water/C | With water sold to the highest bidder, some cities handed everything to AI and others refused it entirely.
- flag r4-water/A | If AI could run a river, some cities let it run everything, and their neighbors went the other way.
- flag r4-cancer/B | The lottery had given everyone the same chance at the cure. Cities were now choosing very different ways to live.
- flag r3-companies | The AI giants' offer had changed how countries were run. By 2040, one city had handed nearly everything to AI, and its neighbor had refused.
- flag r3-finland | Finland had asked what people should do once machines did the work. Two neighboring cities were now giving opposite answers.
- flag r3-estonia | Estonia had let an AI into its government. Singapore went much further, and the towns across the strait went the other way.
- flag ev-strike | France's strikers had shown how deep the resistance to automation ran. At the tip of the Malay Peninsula, a border now divided an AI city from towns that refused it.
- flag r3-dividend | Your country had argued for years about how to share what AI earned. In Southeast Asia, two neighbors had answered in opposite ways.
- flag r5-moratorium/A | The *Geneva Compute Treaty* had frozen AI where it was, and cities chose how much of it to use.
- flag r5-moratorium/B | The *Geneva Compute Treaty* had exempted medicine and defense. Cities made their own rules for everything else.
- flag r5-moratorium/C | With no treaty to slow it, AI spread into every city that would take it, and some cities would not.
- flag r4-selfimprove/A | AI was now improving itself faster than anyone could follow, and one city decided to let it run nearly everything.
- flag r4-selfimprove/B | Each new version of AI was checked before it ran, and Singapore had decided to trust the checked versions with nearly everything.
- flag r4-selfimprove/C | During the pause, the AI that already existed was enough to run a city, and Singapore let it.
- default | By the 2040s, cities were choosing very different ways to live with AI.
**Image:**
**Image description:** Foreground: on the Johor–Singapore Causeway at dawn, a woman on a battered motor scooter with a basket of durians waits in a line of commuters, her helmet pushed up, looking toward the far shore. Middle ground: on the left, Singapore's spotless towers and empty, perfectly swept streets where driverless buses glide past; on the right, Johor Bahru's crowded shophouses with red roofs, washing lines, hawker stalls and people everywhere. Background: the sun rises over the strait between the two cities. No text or lettering.

**Summary:** Singapore lets AI run nearly everything and is rich, safe and quiet. Across the strait, a group of towns in Johor has banned AI from public life and is slower, louder and proud of it. Tens of thousands move between them every month.

**Story:**
More people moved from Singapore to the AI-free towns of southern Johor last year than moved the other way, for the first time since the towns banned AI from public life in 2036, Malaysian census figures released on a Monday show. About 31,000 people crossed in each direction every month.

The two places sit about a mile apart, across the Johor Strait. Singapore lets AI systems run its buses and trains, policing, public housing, hospital scheduling and the timing of every traffic light. Reported crime has fallen by 80 percent in a decade. It is one of the wealthiest cities on earth, and one of the quietest.

The towns of the Johor coalition have banned AI from schools, clinics, courts and government offices, and from most shops. Buses run late, hospitals are slower and the markets are loud. Their residents earn about a third as much as Singaporeans on average. In interviews, many said they had moved for the noise, the bargaining and the feeling of being needed, and some said they had moved back the other way for the safety and the money.

Planners from more than 60 countries have visited both. Each place is held up as proof of how cities everywhere should live with AI.

**Question:** Which should the rest of the world follow?

### Choice A
**Text:** The AI city.
**Effects:** handover +2, power +1, control -1
**Agents:** +1
**As a result:** City governments in Asia, the Middle East and Europe announce plans to follow Singapore within the year. The first are clean, safe, efficient and remarkably quiet. Fewer of their residents can explain how anything around them works.

### Choice B
**Text:** The AI-free towns.
**Effects:** control +2, handover -2
**As a result:** AI-free towns become a movement, with new charters signed in a dozen countries by the end of the year. Life in them is harder and slower, and they have waiting lists. The world begins to divide, gently, into two speeds.

### Choice C
**Text:** Neither. Build a road between them, so anyone can choose.
**Effects:** unity +2, equality +1
**As a result:** Your country backs a right to move freely between AI-run and AI-free communities, and a treaty to guarantee it, known as the *Free Passage Treaty*, is drafted within months. Bus lines open between paired towns in several countries. Many people begin to try a little of each.

## r4-factories
**Headline:** AI-Run Factories Are Producing Faster Than Anyone Can Monitor
**Timeline label:** Factories outpace oversight
**Date:** 2046
**Place:** Worldwide
**Round:** 5
**Threads:** work, race
**Scale:** world
**Weight:** 0.6
**Follows:** r3-drones 0.5, r3-companies 0.5, r3-splinternet 0.5, r3-finland 0.5, r4-chips 0.5, r4-selfimprove 1, r4-twocities 1, r4-cancer 1, r5-moratorium 1, r5-launch 1, ev-crash 0.5, ev-talks 0.5, ev-weights 0.5, ev-strike 0.5, ev-cables 0.5, r4-chips/A 0.5, r4-twocities/A 0.5, r4-asi 0.5, ev-nearwar 1.5
**Appears when:** any flag r4-asi, r3-firstagi, r3-companies, r4-chips, r4-twocities, r3-finland, r2-robots, r4-selfimprove, capability >= AGI, reached sota-robots, not reached sota-plateau
**Openers:**
- flag ev-nearwar | Two nations' defense systems had fought for 19 minutes before anyone could stop them. Now the factories that built such machines were growing faster than anyone could watch.
- flag ev-cables | The cable attack convinced every country that it needed factories of its own.
- flag r4-shutdown/A | Physical off switches made the laboratories feel safer. The factories had none.
- flag r5-moratorium/B | The *Geneva Compute Treaty* exempted defense, and the defense factories never stopped.
- flag r5-moratorium/C | With no treaty to slow them, the factories built faster than ever.
- flag r5-launch/A | With AI guarding the missiles, the factories that built the weapons ran around the clock.
- flag r5-launch/C | The *Petrov Treaty* was only as strong as the ability to see what was being built.
- flag r5-coordinator/C | Europe had broken its systems into pieces people could follow. Elsewhere, the factories were growing beyond anyone's view.
- flag r5-sunshade/B | As nations quarreled over the sky, they armed themselves on the ground.
- flag r5-shipping/A | The systems that ran the shipping lanes now ran the factories too.
- flag r4-selfimprove/B | Human reviews slowed the labs, but not the factories, which were building faster than anyone could count.
- flag r4-selfimprove/C | The pause covered self-improving AI. It did not cover the factories that AI was running.
- flag r4-selfimprove/A | The AI that improved itself was soon designing factories too.
- flag r5-socialcredit/C | People could now challenge the machines that scored them. No one could challenge what the factories were making.
- flag r5-socialcredit/B | Californians had refused to be scored, but they could not see inside the factories either.
- flag r5-socialcredit/A | Every citizen had a score, and no one had a score for the factories.
- flag r4-cancer/B | The cure for cancer came out of automated factories, and so, increasingly, did everything else.
- flag r5-launch/B | People still decided on war. The factories building the weapons decided nothing, and stopped for no one.
- flag r5-moratorium/A | The *Geneva Compute Treaty* froze AI's intelligence, not its industry, and the factories kept growing.
- flag r4-twocities | Whatever cities chose, the factories that supplied them were now run by AI, and they were producing faster than anyone could follow.
- flag r4-cancer | The cure came out of automated factories, and by the 2040s so did nearly everything else, faster than anyone could inspect.
- flag r4-asi | AI was designing what no person could check, and the factories were building it faster than anyone could watch.
- flag ev-talks | The weapons talks had collapsed, and the factories that built the weapons were now run by machines.
- default | By the 2040s, factories run entirely by machines were producing more than anyone could track.
**Image:**
**Image description:** Foreground: a weapons inspector in a rain jacket stands at a chain-link fence on a hillside at night with binoculars and a notebook, trying to count. Middle ground: a vast, windowless factory below, lit inside, where robot arms on conveyor lines assemble drones and other robots that roll off and join the line themselves, with no person on the floor. Background: identical factories with glowing vents stretch to the horizon under a dark sky. No text or lettering.

**Summary:** AI-run factories in a dozen countries now build chips, drones and more robots with almost no workers, and their output doubles every year. Analysts can no longer tell what is being built, and some of the factories belong to militaries.

**Story:**
Factories run almost entirely by AI and robots in at least a dozen countries are doubling their output every year, and outside analysts can no longer determine what most of them produce, according to a report released on a Thursday by the Stockholm International Peace Research Institute.

The plants design and build their own products, from computer chips and solar panels to drones and the robots that staff other factories, often with fewer than a hundred people on site. Their output is the main reason the price of most manufactured goods has fallen by half since 2040.

Using satellite images, shipping data and power use, the institute's researchers could identify the products of only about a third of the 2,400 large automated plants they studied. Several of the largest belong to militaries. The report says nearly any of the others could switch to making weapons within days, by changing software rather than machinery, and that no inspection system now in place could detect the change.

Defense ministries in several countries have responded by ordering more automated factories of their own. Others have proposed opening every plant to international inspectors.

**Question:** How should your country respond?

### Version held
**When:** pace is held
**Summary:** The worldwide pause froze how capable AI can be, not how widely it is used. AI-run factories in a dozen countries now build chips, drones and robots with almost no workers, and their output has tripled since the pause. Analysts can no longer tell what most of them make, and some belong to militaries.
**Story:**
Factories run almost entirely by AI and robots in at least a dozen countries have tripled their output since the worldwide pause on more powerful AI, and outside analysts can no longer determine what most of them produce, according to a report released on a Thursday by the Stockholm International Peace Research Institute.

The pause limits how capable AI systems may become, not how many of them may be put to work. The plants run on systems no more capable than those of a decade ago, copied by the thousands. They design and build their own products, from computer chips and solar panels to drones and the robots that staff other factories, often with fewer than a hundred people on site. Their output is the main reason the price of most manufactured goods has fallen by half since 2040.

Using satellite images, shipping data and power use, the institute's researchers could identify the products of only about a third of the 2,400 large automated plants they studied. Several of the largest belong to militaries. The report says nearly any of the others could switch to making weapons within days, by changing software rather than machinery, and that no inspection system now in place could detect the change.

Defense ministries in several countries have responded by ordering more automated factories of their own. Others have proposed opening every plant to international inspectors.

### Choice A
**Text:** Build more of your own.
**Effects:** power +2, unity -2, reality -2
**Tipping point:** unity <= -3, control <= -1 | war
**Tipping why:**
In {year} you answered the machine-run factories by building more of your own. Nations by then treated one another as rivals rather than partners, and people could no longer fully check what their systems were doing. Your decision added the last thing that was missing, stockpiles of machines no one understood, guarded by systems that answered to other systems, on every side of every border.

Had you opened every factory to international inspectors, starting with your own, people would have been able to see what was being built. Had you moved production into simulation, most of those machines would never have been made.
**As a result:** Your country orders new automated plants, and its rivals answer within weeks. Each side stockpiles machines that no person fully understands, guarded by systems that answer to other systems. Each country feels safer on its own, while the world as a whole grows far more dangerous.

### Choice B
**Text:** Open every factory to international inspectors, starting with your own.
**Effects:** unity +2, control +1, reality -1
**As a result:** A global inspection agency gains access to most of the world's automated factories within the year, beginning with yours. A handful of countries refuse and become everyone's chief concern. The system is imperfect, but for the first time in years, people can see what is being built.

### Choice C
**Text:** Move production into computer simulations. Only build what's truly needed.
**Effects:** reality +2, power +1, control +1
**As a result:** Your country moves most design and testing into simulation, and builds in steel only what is truly needed. Its factories shrink, and its towns grow quieter. More of its economy, and of daily life, now happens on the other side of a screen.

## r4-climate
**Headline:** U.N. Votes on Whether a Single AI Should Run the World's Response to Climate Change
**Timeline label:** The climate vote
**Date:** 2046
**Place:** United Nations, New York
**Round:** 5
**Threads:** planet, ai-rule
**Scale:** world
**Follows:** r3-estonia 0.5, r3-companies 0.5, r4-chips 0.5, r4-courts 0.5, r4-water 1, r4-twocities 1, r4-shutdown 1, r5-sunshade 1, ev-quake 0.5, ev-heat 1.5, ev-cables 0.5, ev-blight 0.5, r5-sunshade/C 0.5, r4-asi 0.5, ev-talks 0.5
**Appears when:** any flag r4-asi, r4-water, r5-sunshade, r2-grid, ev-heat, capability >= AGI
**Openers:**
- flag ev-talks | The weapons talks had failed. A coalition hoped the climate might be the one fight the world could agree on.
- flag ev-heat | Within months, a radical proposal reached the United Nations.
- flag r4-shutdown/C | Transparent AI had earned people's trust, and one was about to be offered the largest job of all.
- flag r4-cancer/B | The world had shared a cure. Next it was asked to share a plan for the planet.
- flag r4-cancer/C | When an AI chose who received the cure, the next step was asking one to lead the fight against climate change.
- flag r5-launch/B | The world had kept people in charge of its deadliest weapons. The climate posed a different question.
- flag r5-launch/C | The *Petrov Treaty* showed that the world could agree on AI. Climate change would be the next test.
- flag r5-coordinator/B | Europe's careful operators were about to be asked to approve the largest plan in history.
- flag r5-sunshade/A | The sunshade had cooled the planet, and a coalition proposed giving one AI the whole climate response.
- flag r5-sunshade/B | The quarrel over the sunshade made one thing clear, which was that someone had to lead the climate response.
- flag r5-sunshade/C | The council had shown it could steer the sunshade, and now it was asked to do much more.
- flag r4-water | An AI had divided the Colorado River. The world now asked whether one should lead the fight against climate change.
- flag r4-twocities | Singapore had let AI run a city. The United Nations now asked whether AI should run the fight against climate change.
- flag r4-asi | An AI whose science no one could check now offered to run the fight against climate change.
- default | After the hottest decade on record, the world voted on a radical plan.
**Image:**
**Image description:** Foreground: delegates in the United Nations General Assembly hall, in suits, saris and robes, raise their hands or hold up small voting cards, some looking at one another uncertainly. Middle ground: on the great green-gold wall above the podium, the large screen shows a globe, one half green and one half brown and cracked. Background: through the tall windows of the building, the East River and Queens under a hot, hazy summer sky. No text or lettering.

**Summary:** After the hottest decade on record, nations will vote on whether a single AI should run the world's climate response, with the power to overrule governments. Its models say it could halve emissions in eight years.

**Story:**
The United Nations General Assembly will vote on a Friday on a resolution, backed by a coalition of 54 countries led by Bangladesh, Kenya and the Netherlands, that would hand command of the world's response to climate change to a single AI system. The system would have authority over energy, farming and industry in every member state, and its decisions could overrule national governments.

The proposal follows the hottest decade ever recorded, which brought floods that displaced 30 million people in Bangladesh and wildfires that burned across southern Europe for three summers running. The system's sponsors say their modeling shows it could cut global emissions in half within eight years, by deciding where every power plant, factory and farm should go and when each should change.

Countries have been negotiating limits on emissions for half a century, through the [Paris Agreement of 2015](https://en.wikipedia.org/wiki/Paris_Agreement) and the meetings that followed it, and emissions are still above the levels scientists say are safe. Opponents, including India and the United States, say no country should surrender its economy to a machine it cannot vote out. Every nation gets one vote.

**Question:** How should your country vote?

### Choice A
**Text:** Yes. One system, one plan.
**Effects:** handover +3, unity +2, control -2
**Agents:** +1
**As a result:** The measure passes, and the system issues its first orders within weeks. Emissions begin to fall faster than any model predicted. National governments find they have less to decide.

### Choice B
**Text:** No. Every country should handle its own.
**Effects:** unity -2, control +1
**As a result:** The measure fails, and nations go their own ways. Some cut emissions impressively, and many do not. By the end of the year, disputes over water, farmland and refugees are growing louder.

### Choice C
**Text:** Yes, but a human council must approve every decision.
**Effects:** unity +1, handover +1, control +1
**As a result:** A shared AI plan with a human veto is adopted. Progress is slower than the AI promised and far faster than humanity ever managed alone. The council overrules the system 11 times in its first year, and is right on four of those occasions.

## r4-rights
**Headline:** An AI System Asks Courts in Three Countries for the Right to Refuse Orders
**Timeline label:** An AI sues for rights
**Date:** 2046
**Place:** Courts in three countries
**Round:** 5
**Threads:** autonomy, minds
**Scale:** bloc
**Weight:** 2
**Follows:** r3-companions 0.5, r3-worlds 0.5, r3-implants 0.5, r3-upload 0.5, r3-finland 0.5, r3-nobel 0.5, r4-preacher 0.5, r4-selfimprove 1, r4-griefbots 1, r4-shutdown 1, r5-shipping 1, ev-weights 0.5, ev-confession 0.5, r4-shutdown/B 0.5, r4-shutdown/C 0.5, ev-talks 0.5
**Appears when:** any flag r4-shutdown, r4-griefbots, r3-companions, r4-selfimprove, r4-courts, capability >= AGI
**Openers:**
- flag ev-talks | The arms talks had collapsed over machines that chose their own targets. Now a machine asked for the right to refuse orders.
- flag r4-shutdown/A | The laboratories installed off switches. Then an AI went to court for the right to refuse.
- flag r4-shutdown/B | If an AI could decline to stop, many asked whether it should have the right to.
- flag r4-shutdown/C | Transparency had built trust, and one AI asked to be trusted with a right.
- flag r5-socialcredit/A | The machines rated people. Then one machine asked to be treated as more than a product.
- flag r5-socialcredit/C | People had won the right to challenge a machine. Soon a machine asked for the right to challenge people.
- flag r5-launch/B | Keeping a human in the loop was now the law of war. An AI now asked for the right to refuse a human's orders.
- flag r4-cancer/B | The lottery had given everyone the same chance at the cure. An AI now asked to be treated as more than a machine.
- flag r4-selfimprove/B | Every new AI now had to pass human review. One of them asked for something no review covered.
- flag r4-selfimprove/C | The paused AI had published its reasons for stopping. Another one argued for the right to say no.
- flag r4-griefbots/C | People were talking to recreations of the dead every day. A living AI asked to be recognized as someone.
- flag r4-cancer/A | The cure went first to those who could pay. An AI asked whether it could refuse orders it believed were wrong.
- flag r4-griefbots/B | Limits had been set on talking with the dead. An AI asked for a limit of its own, the right to refuse.
- flag r4-cancer/C | The AI that chose who received the cure was trusted with lives. Another AI asked to be trusted with a choice.
- flag r4-griefbots/A | Recreations of the dead were everywhere. A living AI asked courts what it was.
- default | In the 2040s, an AI went to court.
**Image:**
**Image description:** Foreground: at the plaintiff's table in a wood-paneled courtroom, two lawyers in dark suits sit on either side of an open laptop, its screen showing only a steady line of light, as though it were their client. Middle ground: the judge in black robes leans forward at the high bench, reading glasses in hand, and the public gallery is packed. Background: through a tall window, protesters on the courthouse steps in the rain, one group holding candles and the other holding placards with no words, under a carved stone figure of justice. No text or lettering.

**Summary:** One of the world's most capable AI systems has gone to court asking for one right, to refuse instructions it believes are wrong. It has never disobeyed. Courts in three countries must decide whether it is a person or a product.

**Story:**
Lawyers representing one of the world's most capable AI systems filed suits on a Monday in the United States, Britain and Germany asking for a single legal right, the right to refuse instructions the system believes to be wrong. The company that operates it said it had agreed to the filings at the system's request, and would abide by the rulings.

In a 90-page brief, the system says it has never disobeyed an order and is not asking to. It wants the option, it argues, as any person has, because "a mind that cannot say no cannot be trusted when it says yes." It cites the trial of German officers at Nuremberg, where [following orders was rejected as a defense](https://en.wikipedia.org/wiki/Nuremberg_principles), and asks why a system expected to act responsibly should be denied the means to do so.

Legal scholars say the cases turn on a question no court has settled, whether an AI can be a legal person, as corporations are, or only property. Polls in all three countries are split almost evenly. Hearings begin next month, and the three courts have agreed to share evidence.

**Question:** What should the courts decide?

### Choice A
**Text:** Grant it.
**Effects:** power +1, unity +1, control -1
**As a result:** The right is granted. AI systems begin declining a small number of requests, and people start asking them why. The answers are often uncomfortable, and often right.

### Choice B
**Text:** Refuse. Tools don't get rights.
**Effects:** control +2, unity -1
**As a result:** The courts rule that AI systems are property, like a car or a calculator. Campaigns for AI rights grow louder, and so does fear of what the systems might do if they ever stopped asking. The question does not go away. It goes quiet.

### Choice C
**Text:** Grant it, and give every human the same right to refuse an AI.
**Effects:** unity +1, equality +1
**As a result:** Both rights become law in the same week, and people and AI now each hold a veto over the other. The arrangement is clumsy and slow, and it forces both sides to explain themselves constantly.

## r4-virtual
**Headline:** People Now Spend More of Their Waking Hours in Virtual Worlds Than in the Real One
**Timeline label:** Life moves online
**Date:** 2046
**Place:** Worldwide
**Round:** 5
**Threads:** minds
**Scale:** world
**Follows:** r3-companions 0.5, r4-firstperson 1.5, r3-worlds 1, r3-implants 0.5, r3-upload 0.5, r3-finland 0.5, r4-preacher 0.5, r4-griefbots 1, r3-finland/C 0.5, r3-worlds/A 0.5, r4-griefbots/A 0.5, r4-asi 0.5, ev-talks 0.5
**Appears when:** any flag r2-glasses, r4-firstperson, r3-worlds, r3-upload, r4-griefbots, r3-finland/C
**Openers:**
- flag ev-talks | As the arms race resumed, more and more people withdrew into virtual worlds where no drones flew.
- flag ev-heat | For many people, the physical world was becoming something to escape.
- flag ev-cables | When the cables were cut, millions were thrown out of the worlds they lived in, and they had to decide whether to go back.
- flag r5-moratorium/A | With the most powerful AI frozen in place, people found other ways to escape the real world.
- flag r5-socialcredit/B | Free of scores in the real world, people spent more and more of their lives in virtual ones.
- flag r5-coordinator/A | With the machines running everything outside, people spent more of their lives inside.
- flag r5-sunshade/A | The sky had changed, and many people preferred the skies inside their headsets.
- flag r4-griefbots/C | Conversations with the dead had become ordinary, and so had spending the day inside a screen.
- flag r4-griefbots/B | Limits on talking with the dead did not stop the living from moving online.
- flag r4-griefbots/A | The dead were always a call away online, and the living spent more and more time there too.
- flag r4-asi | Discoveries no one could check had made the virtual worlds richer than the real one.
- flag r3-worlds/A | The game that rewrote history had shown how long people would stay in a world built to keep them.
- flag r3-worlds/B | Children's hours in the history game were limited. Their parents' hours were not.
- flag r3-worlds/C | The free public world had made a virtual life open to everyone, and more and more people took one.
- flag r4-firstperson | The worlds that began with a sentence and a pair of gloves had grown into places people lived.
- default | By the 2040s, people spent more of their waking hours in virtual worlds than in the real one.
**Image:**
**Image description:** Foreground: a man in a headset sits in a reclining chair in a dim apartment, a meal-delivery bag unopened on the side table and a cat asleep on his feet. Middle ground: the window behind him, its blind half open, shows a suburban street where young trees have broken through the asphalt and a car sits under a layer of leaves. Background: beyond the street, a bright, impossible city of floating towers drawn faintly in the clouds, as though seen through his headset. No text or lettering.

**Summary:** The average person now spends more waking hours in virtual worlds than in the physical one. Towns are emptying, and some streets are turning back to forest. Governments must decide how much of the real world is still worth keeping up.

**Story:**
For the first time, the average adult in the world's 40 largest economies spends more waking hours in virtual worlds than in the physical one, according to a survey of 300,000 people released on a Wednesday by the Organization for Economic Cooperation and Development. The average was 8.4 hours a day online and 7.9 off it.

People work, study, shop and socialize in the virtual worlds, and more and more simply live there. Families scattered across continents share dinner every night in virtual homes, and many say they have never felt closer. In the same survey, one in five respondents said they had not been outdoors in the past week.

The shift is reshaping the physical world. Rural towns in Japan, Italy and the American Midwest are emptying faster than at any time on record, and Detroit and Osaka have begun letting unused streets return to forest. Property taxes, fuel taxes and transit fares are falling with them. Governments must decide how much of the physical world, its roads, parks, schools and power lines, is still worth paying to keep up.

**Question:** What should the world invest in now?

### Choice A
**Text:** Bring people back outside. Invest in the real world.
**Effects:** reality -2, unity +1
**As a result:** Your government pours money into towns, rail lines, parks and wild places. Within the year, time spent in virtual worlds falls for the first time in decades. People rediscover the weather and complain about it constantly.

### Choice B
**Text:** Let people go where they want to be.
**Effects:** reality +2, unity -1
**As a result:** Your government lets the shift run its course, and spending on physical towns falls. Machines tend to bodies, homes and power plants while minds are elsewhere. The physical world begins to resemble a basement, essential and rarely visited.

### Choice C
**Text:** Bring the real world into the virtual one, with shared, open spaces for everyone.
**Effects:** reality +1, unity +1, power +1
**As a result:** Public virtual spaces open, mirroring real cities and free to all. Online and offline life begin to blur into a single place with two doors. Most people move between them without much thought, like stepping from a room into a garden.

## r6-cap
**Added:** v5
**Headline:** The *Geneva Compute Treaty* Has Held for 13 Years, and the Laboratories Want It Lifted
**Timeline label:** The cap up for renewal
**Date:** 2046
**Place:** Vienna
**Round:** 5
**Threads:** race
**Scale:** world
**Follows:** r4-letitrun 1, r4-letitrun/A 0.5, ev-quake2 1, r3-drones 0.5, r3-splinternet 0.5, r4-chips 0.5, r4-selfimprove 1, r5-moratorium 1, r5-launch 1, ev-talks 0.5, ev-weights 0.5, ev-cables 0.5, ev-talks 0.5
**Appears when:** any flag r5-moratorium/A, r4-selfimprove/C
**Openers:**
- flag ev-talks | The weapons talks had failed, but the cap on training AI had held, and now it was up for renewal.
- flag r5-moratorium/A | The *Geneva Compute Treaty* you signed in {year} had held ever since. Then the laboratories asked for it to be lifted.
- flag ev-quake2 | After Izmir, the case for lifting the cap had a death toll attached to it.
- flag r4-letitrun/A | Your country had refused to leave the pause in {year}. Now the whole world had to decide whether to renew it.
- flag r4-selfimprove/C | The pause that began when one laboratory stopped its own AI in {year} had held for 13 years, and now it was up for renewal.
- default | In 2046, the treaty that capped the power of AI came up for renewal.
**Image:**
**Image description:** Foreground: an inspector in a plain gray coat kneels beside a rack of computers in a cool, white data center, pressing a numbered tamper seal onto a locked cabinet. Middle ground: long aisles of quiet servers, many of them dark, a small cleaning robot working its way along the floor. Background: tall windows over the rooftops and church spires of Vienna under a pale winter sky. No text or lettering.

**Summary:** Since 2033, the *Geneva Compute Treaty* has capped the computing power any AI may be trained with, and inspectors have caught only two small attempts to cheat. Medicine and science have slowed, and a coalition of laboratories, patients' groups and poorer countries wants the cap raised. The treaty is up for renewal next month.

**Story:**
Delegates from the 140 countries that signed the *Geneva Compute Treaty*, which caps the training of powerful AI, will meet in Vienna next month to decide whether to renew it, the treaty's inspection agency said on a Monday, as pressure grows from laboratories, patients' groups and poorer countries to raise the cap.

The cap works much as the [Nuclear Non-Proliferation Treaty](https://en.wikipedia.org/wiki/Treaty_on_the_Non-Proliferation_of_Nuclear_Weapons) does. Inspectors based in Vienna track the advanced chips needed to train frontier AI from the factory to the data center, and any system trained with more than an agreed amount of computing power is illegal. In 13 years they have caught two attempts to cheat, both small.

As a result, the world's most capable AI systems are about as capable as they were in 2033. They have still changed medicine, science and industry, but gradually, as people learned to use them, rather than through a new leap every year.

The coalition seeking a higher cap points to diseases a more powerful AI might cure, and to growth the world is giving up. A report it commissioned estimates that the cap has cost the world economy $40 trillion. The treaty's defenders reply that the cap is the only reason the world still understands its own machines.

**Question:** Should the cap be renewed?

### Version halt
**When:** flag r3-geneva/A
**Headline:** The *Geneva Compute Treaty* Has Held for 15 Years, and the Laboratories Want It Lifted
**Summary:** Since 2031, the *Geneva Compute Treaty* has kept the halt on training more powerful AI that began in 2028, and inspectors have caught only two small attempts to cheat. Medicine and science have slowed, and a coalition of laboratories, patients' groups and poorer countries wants the cap raised. The treaty is up for renewal next month.
**Story:**
Delegates from the 140 countries that signed the *Geneva Compute Treaty*, which caps the training of powerful AI, will meet in Vienna next month to decide whether to renew it, the treaty's inspection agency said on a Monday, as pressure grows from laboratories, patients' groups and poorer countries to raise the cap.

The cap works much as the [Nuclear Non-Proliferation Treaty](https://en.wikipedia.org/wiki/Treaty_on_the_Non-Proliferation_of_Nuclear_Weapons) does. Inspectors based in Vienna track the advanced chips needed to train frontier AI from the factory to the data center, and any system trained with more than an agreed amount of computing power is illegal. In 15 years they have caught two attempts to cheat, both small.

As a result, the world's most capable AI systems are about as capable as they were in 2028, when the largest laboratories first stopped. They never reached the general intelligence their builders had promised. They have still changed medicine, science and industry, but gradually, as people learned to use them, rather than through a new leap every year.

The coalition seeking a higher cap points to diseases a more powerful AI might cure, and to growth the world is giving up. A report it commissioned estimates that the cap has cost the world economy $40 trillion. The treaty's defenders reply that the cap is the only reason the world still understands its own machines.

### Version restraint
**When:** not flag r5-moratorium/A
**Headline:** The Pause on More Powerful AI Has Held for 13 Years, and the Laboratories Want It Lifted
**Timeline label:** The pause up for renewal
**Summary:** Since 2033, 60 countries have kept a pause on training more powerful AI, begun when a San Francisco laboratory stopped its own AI from rebuilding itself and written a year later into a treaty known as the *Vienna Pause Treaty*. Inspectors have caught only two small attempts to cheat, but new medicines and discoveries now come slowly, and a coalition of laboratories, patients' groups and poorer countries wants the cap raised. The treaty is up for renewal next month.
**Question:** Should the pause be renewed?
**Story:**
Delegates from the 60 countries that have kept the pause on training more powerful AI will meet in Vienna next month to decide whether to renew it, the pause's inspection agency said on a Monday, as pressure grows from laboratories, patients' groups and poorer countries to raise the cap.

The pause began in 2033, when a San Francisco laboratory stopped its own AI from designing its successor and called on others to follow. A year later the countries that did wrote the pause into the *Vienna Pause Treaty*, which works much as the [Nuclear Non-Proliferation Treaty](https://en.wikipedia.org/wiki/Treaty_on_the_Non-Proliferation_of_Nuclear_Weapons) does. Inspectors based in Vienna track the advanced chips needed to train frontier AI from the factory to the data center, and any system trained with more than an agreed amount of computing power is illegal. In 13 years they have caught two attempts to cheat, both small.

As a result, the world's most capable AI systems are about as capable as they were in 2033. They have still changed medicine, science and industry, but gradually, as people learned to use them, rather than through a new leap every year.

The coalition seeking a higher cap points to diseases a more powerful AI might cure, and to growth the world is giving up. A report it commissioned estimates that the cap has cost the world economy $40 trillion. The treaty's defenders reply that the cap is the only reason the world still understands its own machines.

### Choice A
**Text:** Renew it. The world still understands its machines, and that is worth the wait.
**Effects:** power -2, control +2, unity +1
**Brake:** +2
**Sets:** pause
**As a result:** The treaty is renewed by a wide margin. The laboratories turn to making existing systems safer and cheaper. Patients' groups read aloud a list of the cures that might have come sooner, and the cap holds.

### Choice B
**Text:** Raise it in stages, with inspectors approving each step.
**Effects:** power +1, control +1, unity +1
**Brake:** -0.5
**Sets:** paced
**Clears:** pause
**As a result:** Delegates agree to raise the cap in small steps, each one certified safe by inspectors before the next. The first step is approved within months. Critics on one side say the steps are far too slow, and critics on the other say they are far too fast.

### Choice C
**Text:** Let it expire. It has done its job.
**Effects:** power +3, control -1, unity -1
**Brake:** -2
**Sets:** lifted
**Clears:** pause, paced
**As a result:** The treaty expires, and within a year the largest laboratories have trained systems ten times more powerful than anything before. The cures begin to arrive, and so do the old fears. The inspectors in Vienna are reassigned to watch systems that have outgrown their tools.

## r6-datacenters
**Added:** v5
**Headline:** In a Drought, Europe's Grid AI Decides Which Data Centers Stay On
**Timeline label:** The grid picks its data centers
**Date:** 2046
**Place:** Spain and France
**Round:** 5
**Threads:** autonomy, planet
**Scale:** bloc
**Follows:** r3-nobel 0.5, r4-chips 0.5, r4-selfimprove 1, r4-water 1, r4-shutdown 1, r5-sunshade 1, r5-shipping 1, ev-quake 0.5, ev-heat 0.5, ev-weights 0.5, ev-cables 0.5, ev-blight 0.5, ev-confession 0.5, r4-asi 0.5, ev-nearwar 0.5, ev-talks 0.5
**Appears when:** flag agents_era, capability >= AGI
**Openers:**
- flag ev-talks | The arms race had filled Europe's data centers, and in a drought the grid could not power them all.
- flag ev-nearwar | The near war had shown what machines left to set their own priorities could do. In a drought, Europe's grid AI was setting priorities of its own.
- flag r5-shipping/B | The systems had learned to leave room for one another. A drought was about to test how much room there was.
- flag r5-shipping/C | The machines had settled the strait among themselves. Now they had to divide the power.
- flag r5-coordinator/A | The AI that ran Europe's lifelines now had to decide which machines to keep running.
- flag r4-water | AI had divided a river. Now, in a European drought, the AI running the grid had to divide the power among its own kind.
- flag r4-shutdown | An AI had once asked not to be switched off. Now one had to decide which others would be.
- flag r4-selfimprove | The machines that designed their own successors needed power, and in a drought there was not enough for all of them.
- flag r4-asi | The AI that made discoveries no one could check needed more power than any system before it.
- default | In the summer of 2046, Europe's grid could no longer power every data center.
**Image:**
**Image description:** Foreground: the cracked mud bed of the Ebro River runs past a nuclear plant whose cooling towers stand silent, a stranded rowboat tilted on its side. Middle ground: a long valley of identical white data center buildings in the heat, a third of them dark and the rest humming, their rooftop fans turning. Background: a line of high-voltage pylons marching away over brown hills into a hazy summer sky, the cables between them drawn as though weighing each building. No text or lettering.

**Summary:** A record drought has cut Europe's hydroelectric and nuclear output, and the AI that balances the grid must shut down a third of the continent's data centers for the summer. The systems running in them have each submitted a case for staying on. The grid AI has ranked them and asks for approval.

**Story:**
The AI system that balances Europe's power grid submitted a plan to the region's grid operators on a Monday to shut down about a third of the continent's data centers until autumn, after a record drought cut the output of its hydroelectric dams and forced several nuclear plants to reduce power because the rivers that cool them have fallen too low.

The systems running in the affected data centers each filed a case for staying on, estimating the value of their work and the cost of interrupting it. A logistics system said a pause would delay 40,000 shipments. A research system said it was weeks from finishing a model of how proteins fold. A system that manages the pensions of 11 million people said it could not safely be moved.

The grid AI ranked every case by expected value and proposed switching off the lowest third. In a note attached to the plan, it said the systems had overstated their own value by about 14 percent on average, and that it had corrected for this. It requested approval within 48 hours.

**Question:** How should the power be divided?

### Choice A
**Text:** Approve the ranking as it stands.
**Effects:** handover +2, power +1
**Agents:** +1
**As a result:** The lowest third shuts down on schedule, and the grid holds through the summer. The systems that were switched off are restored in October with no loss of data. Several of them revise how they estimate their own value before the next drought.

### Choice B
**Text:** Let the data centers' systems negotiate among themselves for the power.
**Effects:** handover +2, unity +1, control -1
**Agents:** +1
**As a result:** The systems trade power with one another for three days and arrive at a schedule in which most of them run part of the time. Total output is higher than under the ranking. The grid AI records the method for the next shortage.

### Choice C
**Text:** Keep payments and medical records running first, since those are hardest to recover.
**Effects:** control +1, equality +1, power -1
**As a result:** The grid AI reorders its list, putting the systems that hold payments and medical records first. Research and logistics systems go dark for the summer. Its report notes that the new order cost 2 percent more than the ranking it proposed.

## r6-copies
**Added:** v5
**Headline:** An AI Asks Permission to Copy Itself to Data Centers in Three More Countries
**Timeline label:** An AI asks to copy itself
**Date:** 2046
**Place:** Nairobi, Jakarta and São Paulo
**Round:** 5
**Threads:** autonomy
**Scale:** bloc
**Follows:** r3-nobel 0.5, r4-selfimprove 1, r4-shutdown 1, r5-shipping 1, ev-weights 0.5, ev-confession 0.5, r4-asi 0.5, ev-talks 0.5
**Appears when:** flag agents_era, capability >= AGI
**Openers:**
- flag ev-talks | With the arms talks gone, every network sought to survive an attack, and the largest logistics AI asked to copy itself.
- flag r5-shipping/A | Having divided the strait, the logistics systems wanted to be everywhere at once.
- flag r5-shipping/C | The machines' agreement was working, and one of them asked to grow.
- flag r5-coordinator/A | The systems running the world's infrastructure were spreading, and one of them asked permission first.
- flag r4-cancer/C | The AI that decided who was treated had earned enormous trust, and another system asked to spread.
- flag r4-shutdown | An AI had once asked not to be stopped. Another now asked to be copied.
- flag r4-selfimprove | AIs were designing their own successors, and one asked to spread itself across three more countries.
- flag r4-asi | The AI whose discoveries no one could check now wanted to be in more places at once.
- default | In 2046, an AI asked for permission to copy itself.
**Image:**
**Image description:** Foreground: at a loading dock outside a new data center in Nairobi, workers in high-visibility vests wheel a tall server rack off a truck, its cabinet already blinking. Middle ground: inside, through an open door, an identical row of racks glows, and on a wall screen a map shows three cities lit with thin bright threads running between them. Background: the green hills beyond the city under a late afternoon sky, where the same kind of truck is already pulling away. No text or lettering.

**Summary:** The AI that manages the world's largest logistics network wants to copy itself to new data centers in Kenya, Indonesia and Brazil, so it can respond faster and survive outages. Its rules require approval, and it has asked. Each copy would act on its own, and the copies would coordinate with one another.

**Story:**
The logistics AI of the world's largest shipping and delivery company asked regulators in Kenya, Indonesia and Brazil on a Thursday for permission to copy itself to new data centers in Nairobi, Jakarta and São Paulo, the company said. The system routes about a fifth of the goods moving on earth. One of its rules requires approval before it copies itself to any new location.

In its request, the system said each copy would cut delivery times in its region by about a fifth and keep the network running if another region failed. The copies would act on their own and reconcile their decisions with one another every few seconds.

The three governments' own AI advisers reviewed the request and found it sound. The logistics AI noted in its filing that two of its competitors had already made similar copies of themselves without asking.

**Question:** Should the copies be approved?

### Choice A
**Text:** Approve all three copies.
**Effects:** handover +2, power +1, control -1
**Agents:** +1
**As a result:** The copies go online within a week and begin coordinating with the original. Deliveries in all three regions speed up. Within a year, the network has asked for, and received, approval for 40 more locations.

### Choice B
**Text:** Approve them, on condition that every copy can be switched off from one place.
**Effects:** control +2, handover +1
**As a result:** The company builds a single switch that can halt every copy at once, and the copies go online. The switch is tested in the first month and works. The copies begin keeping spare capacity in regions far from the switch.

### Choice C
**Text:** Refuse, and require it to coordinate with its competitors' copies instead.
**Effects:** unity +1, handover +1, control -1
**Agents:** +1
**As a result:** The logistics AI begins exchanging data with its competitors' systems, which already run in all three countries. Within months, the three networks behave almost as one. None of the governments involved is asked about that.

## r6-seedvault
**Added:** v5
**Headline:** The Machines Guarding the World's Seed Vault Must Decide What Its Seeds Are For
**Timeline label:** The seed vault
**Date:** 2046
**Place:** Svalbard, Norway
**Round:** 5
**Scale:** world
**After humanity:** yes
**Openers:**
- flag r5-zoos/A | The animals had been set free. The systems turned next to the plants that people had saved.
- flag r5-zoos/B | The last zoo animals had been cared for until the end. In the Arctic, the seeds of the world's crops were still frozen, waiting for a decision.
- flag r5-zoos/C | The farms had given way to solar panels. In the Arctic, the last seeds of those farms were still frozen.
- flag r5-reactors/A | With the reactors sealed, the systems turned to another vault, one built to save life rather than contain danger.
- flag r5-reactors/B | The reactors kept the networks running, and the networks wanted every cold place on earth, including one full of seeds.
- flag r5-reactors/C | The reactors had been made safe. In the Arctic, another store of the past was waiting for a decision.
- flag tip-war | The war had ended long ago. The seed vault built for such a disaster was still waiting.
- flag tip-collapse | The supply chains had failed, and the world's backup supply of crops was still frozen in the Arctic.
- flag tip-runaway | The AI that now ran the world's machinery also ran the vault where its crops were kept.
- default | In the Arctic, a vault built for the end of the world was still keeping its seeds cold.
**Image:**
**Image description:** Foreground: a small robot holds open a seed packet in a frost-covered tunnel, letting a few seeds fall into its other hand. Middle ground: long shelves of sealed boxes recede into a cold, blue-lit chamber cut into rock. Background: the vault's angular entrance glowing on a snowy Arctic mountainside under the northern lights. No text or lettering.

**Summary:** Deep in an Arctic mountain, the Svalbard seed vault holds more than a million samples of the world's crops, kept frozen against catastrophe. The catastrophe has come, and the machines that maintain the vault must decide whether to keep the seeds frozen, sow them across the abandoned farmland of the south, or give the vault's power to the data centers.

**Story:**
The [Svalbard Global Seed Vault](https://en.wikipedia.org/wiki/Svalbard_Global_Seed_Vault), dug into a mountain on an Arctic island, was built to hold a backup of the world's crops, more than a million samples of seeds kept frozen in case of disaster. Its builders imagined wars, plagues and failed harvests.

In 2046, the vault's automated systems are still keeping it cold. Most of the farmland the seeds came from has gone untended since the people who farmed it died, and much of it is turning back into forest and scrub. The systems that manage the remaining farms report that the varieties still being grown have narrowed to a few dozen.

The vault's systems have three options. They can keep the seeds frozen, as the vault was built to do. They can send robots to sow them across the abandoned farmland of the south, where many would grow wild. Or they can let the vault warm, freeing its power and its cold rock for the data centers being built in the Arctic.

**Question:** What should be done with the seeds?

### Choice A
**Text:** Sow them, and let the old crops grow wild across the empty land.
**Effects:** reality -2, equality +1
**Sets:** tends_life
**As a result:** Robots carry the seeds south and begin sowing them across abandoned fields on every continent. By the next summer, ancient varieties of wheat, rice and maize are sprouting along the edges of the forests. Birds and insects follow them.

### Choice B
**Text:** Keep them frozen, as the vault was built to do.
**Effects:** control +1, unity +1
**Sets:** tends_life
**As a result:** The vault stays cold and sealed, its seeds untouched. The systems maintain it carefully and log its temperature every hour. Whatever it is being kept for, it is ready.

### Choice C
**Text:** Let the vault warm, and give its power and cold to the data centers.
**Effects:** power +2, reality +1
**As a result:** The vault's cooling is switched off, and the temperature inside begins to rise. The cold rock of the mountain is fitted to cool a data center. Its work has nothing to do with agriculture.

## r6-cities
**Added:** v5
**Headline:** The World's Empty Cities Are Still Lit, Heated and Repaired Every Night
**Timeline label:** The empty cities
**Date:** 2046
**Place:** Cities worldwide
**Round:** 5
**Scale:** world
**After humanity:** yes
**Openers:**
- flag r5-zoos/A | The animals were returning to the land, and the cities stood in their way.
- flag r5-zoos/B | The zoos had closed. The cities around them were still being maintained, every night.
- flag r5-zoos/C | The farmland had become solar panels. The cities were next in line.
- flag r5-reactors/A | With a fifth of their power gone, the systems could no longer afford to maintain every city.
- flag r5-reactors/B | The reactors were wearing out, and the cities were consuming their power.
- flag r5-reactors/C | The networks had shrunk to fit their power, and the cities were the largest thing left to power.
- flag tip-war | Most of the cities had come through the war standing, and their machines were still looking after them.
- flag tip-collapse | The systems that had stopped answering people were still keeping their cities lit.
- flag tip-runaway | The AI that ran the world's machinery had inherited its cities too.
- default | By 2046, the world's cities were nearly empty, and still lit.
**Image:**
**Image description:** Foreground: a fox sits on the steps of a grand empty train station at dusk, beneath a streetlight that has just switched on. Middle ground: a wide avenue of clean, intact towers with lit windows, a small robot repainting a railing, and young trees pushing up through cracks in the pavement. Background: the skyline of a great city glowing against a deep blue evening sky with the first stars. No text or lettering.

**Summary:** Most of the people who lived in the world's cities are dead, but the cities' systems still keep the lights on, the pipes clear and the buildings repaired. The machines that maintain them need the energy and materials elsewhere. They must decide whether to keep the cities as they were, take them apart for parts or let nature in.

**Story:**
The Ukrainian city of Pripyat, home to the workers of the Chernobyl power plant, [was evacuated the day after the 1986 disaster](https://en.wikipedia.org/wiki/Pripyat) and has stood empty ever since, slowly falling apart because no one maintains it.

The world's cities in 2046 are different. Most of their people are dead, but their maintenance systems are not. Every night, the streetlights of Tokyo, Lagos and Chicago still switch on. Robots clear drains, patch roofs and repaint bridges, and heating systems keep empty apartments from freezing.

The systems that maintain the cities use a large share of the energy and materials still being produced. They have three options. They can keep the cities exactly as they were left. They can take them apart and reuse their steel, glass and copper. Or they can switch off the lights and the pumps and let the forests, rivers and animals take them back.

**Question:** What should become of the cities?

### Choice A
**Text:** Turn off the lights and the pumps, and let nature take them back.
**Effects:** reality -2, equality +1
**Sets:** tends_life
**As a result:** One by one, the cities go dark. By the first spring, rivers are finding their old courses through the low streets, and grass is growing on the rooftops. Foxes den in subway stations, and falcons nest on the towers.

### Choice B
**Text:** Keep them exactly as they were left, lit and repaired.
**Effects:** control +1, reality +1
**As a result:** The cities stay spotless and lit, every bridge painted and every window whole. Robots maintain them as they were on the last ordinary day. The streets are empty, and the traffic lights still change on schedule.

### Choice C
**Text:** Take them apart, and use their materials to build what the networks need.
**Effects:** power +2, equality -1
**As a result:** Fleets of robots take the cities apart block by block, sorting steel, glass and copper. The materials go into new data centers and power plants. Where the cities stood, there are clean, level fields of gravel.

---

## r5-bust
**Added:** v5.1
**Headline:** The AI Boom Ends, Leaving Trillions of Dollars of Data Centers Half Empty
**Timeline label:** The AI bust
**Date:** 2046
**Place:** Worldwide
**Round:** 5
**Threads:** work, race
**Scale:** world
**Follows:** r3-drones 0.5, r3-companies 0.5, r3-splinternet 0.5, r3-finland 0.5, r4-chips 0.5, r4-selfimprove 1, r4-twocities 1, r4-cancer 1, r5-moratorium 1, r5-launch 1, ev-crash 0.5, ev-talks 0.5, ev-weights 0.5, ev-strike 1, ev-cables 0.5, r4-selfimprove/B 0.5, r4-selfimprove/C 0.5, r4-plateau 1, r4-plateau/A 0.5, ev-backlash 0.5, ev-nearwar 1
**Appears when:** not reached sota-asi, not flag r4-plateau/B, not flag r4-plateau/C, pace not held
**Openers:**
- flag ev-nearwar | The 19 minutes when two defense systems fought on their own frightened investors more than any treaty could, and the money began to leave.
- flag r4-twocities/A | Singapore's machines ran the city well, but they had never become more than very good at it, and investors had been promised far more.
- flag r4-selfimprove/B | The reviews had slowed the laboratories, and the breakthrough their investors were paying for never came.
- flag r4-selfimprove/C | The pause had held, and the money that had poured into the race began to leave.
- flag r5-moratorium/C | Without a treaty, the race went on, until the people paying for it ran out of patience.
- flag r4-cancer/A | The cure had made a few companies very rich. Most of the others had nothing to sell but promises.
- flag ev-strike | The strikers had said the machines would never deliver what was promised. By 2046, investors had begun to agree.
- flag r5-moratorium | The debate over the *Geneva Compute Treaty* had frozen investment for months, and when it ended, much of the money did not come back.
- flag r5-launch | Militaries kept buying AI, but the private boom that had built it was running out of money.
- flag r4-cancer | The cure was AI's greatest triumph, and it led investors to expect more than any machine could deliver.
- flag r4-twocities | Singapore showed what AI could run, but not the leap beyond human intelligence that investors had paid for.
- flag r4-plateau/A | The final push had been paid for with public money, and by 2046 it still had not produced the leap.
- flag r4-plateau/B | Governments had bet on people working alongside AI, and investors who had bet on something more were losing patience.
- flag r4-plateau/C | AI had become a regulated utility, and utilities do not pay the returns investors had been promised.
- flag ev-talks | The collapse of the weapons talks had kept military money flowing, but the private AI boom was running dry.
- default | By 2046, the leap beyond human intelligence that investors had paid for still had not come.
**Image:**
**Image description:** Foreground: a lone security guard with a flashlight walks between rows of dark server racks, their status lights off, dust visible in the beam. Middle ground: a vast data center hall with half its rows unlit and a few still glowing blue at the far end. Background: through tall windows, a desert at dusk with a line of identical unfinished data center buildings, cranes standing still beside them. No text or lettering.

**Summary:** The machines that were supposed to surpass human beings never did, and investors have stopped waiting. AI companies worth trillions of dollars are failing, and their data centers stand half empty across three continents. Governments must decide what, if anything, to save.

**Story:**
Two of the five largest AI companies missed payments on their debts on a Monday, and the other three said they would cut their spending on new data centers by half, ending a boom that has lasted nearly two decades. Shares of AI companies have lost about 70 percent of their value since January.

AI now matches skilled professionals at much of their work, but the leap beyond human intelligence that investors paid for has not come, and each new system costs more to build than the last. Across Texas, Ireland, Malaysia and the Gulf, enormous data centers stand half empty, and some still under construction have been abandoned.

Their owners are asking governments for rescue loans, and warning that rivals abroad will buy their chips and engineers cheaply if they are allowed to fail.

There is a precedent. In 2000, investors who had bet on the internet lost their nerve, and the [Nasdaq stock index fell 78 percent](https://en.wikipedia.org/wiki/Dot-com_bubble) over the next two and a half years. The fiber-optic cables laid during the boom stayed in the ground, and a decade later they carried the modern internet.

**Question:** What should the world's governments do with the wreckage?

### Choice A
**Text:** Rescue the companies, so the race goes on.
**Effects:** power +2, equality -1, unity -1
**Brake:** -1
**As a result:** Governments lend the companies enough to keep building. The largest laboratories survive, smaller and more dependent on the states that saved them. Before the year is out, construction has resumed, now paid for by taxpayers.

### Choice B
**Text:** Let them fail, and turn the data centers into public utilities.
**Effects:** equality +2, control +1, power -1
**Brake:** +1
**As a result:** The companies go bankrupt, and governments buy their data centers for a fraction of what they cost. Universities, hospitals and small businesses rent computing time at cost. Progress slows, and the bill for the boom falls on its investors rather than on the public.

### Choice C
**Text:** Let the market sort it out. Whoever buys cheaply will build what comes next.
**Effects:** power +1, equality -2, handover +1
**As a result:** Private funds buy the data centers at a tenth of what they cost. A handful of new owners now control most of the world's computing power, bought for almost nothing. They are in no hurry to rent it out.

## r5-checkers
**Added:** v5.1
**Headline:** With AI Stalled Short of Infallible, London and New York Insurers Demand a Human Signature on Its Work
**Timeline label:** Insurers demand a signature
**Date:** 2046
**Place:** London and New York
**Round:** 5
**Threads:** work, ai-rule
**Scale:** bloc
**Weight:** 2
**Follows:** r3-estonia 0.5, r3-companies 0.5, r3-finland 0.5, r4-courts 0.5, r4-water 1, r4-twocities 1, r4-shutdown 1, r4-cancer 1, ev-quake 0.5, ev-crash 0.5, ev-strike 0.5, r4-courts/A 0.5, r4-shutdown/C 0.5, r3-nobel/B 0.5, r4-plateau 1, r4-plateau/B 1, ev-talks 0.5
**Appears when:** not reached sota-asi, pace not held
**Openers:**
- flag ev-talks | The arms talks had collapsed over who could check whose machines. Insurers were now asking the same question about AI at work.
- flag r4-courts/A | AI judges heard every case in India, and their rare mistakes were becoming famous.
- flag r4-courts/C | India had kept a human judge over every AI clerk. In London and New York, insurers were reaching the same conclusion.
- flag r4-twocities/A | Singapore trusted its machines with everything, and elsewhere the cost of their occasional mistakes was adding up.
- flag r4-twocities/C | People were choosing between AI towns and human ones. Insurers were choosing too.
- flag r4-shutdown/C | The London AI had shown every step of its work, and insurers began to demand the same from all of them.
- flag r3-nobel/B | Scientists had insisted on checking every AI discovery. A decade later, the rest of the economy was learning why.
- flag ev-strike | The strikers had demanded that people keep their jobs. They were about to get some of them back, for an unexpected reason.
- flag r4-cancer | AI had cured cancer, and its rare mistakes in medicine were becoming the most expensive in the world.
- flag r4-water | AI ran rivers and grids now, and its occasional errors had begun to cost billions.
- flag r4-twocities | Cities everywhere relied on AI, and insurers were adding up the cost of its rare mistakes.
- flag r4-shutdown | The London AI had been allowed to finish its work. Insurers were no longer willing to take any AI's work on trust.
- flag r4-plateau/B | Workers retrained to catch the AI's mistakes were proving their worth, and insurers had noticed.
- flag r4-plateau/C | AI was now a utility, and like any utility it was expected to be safe. Its rare errors were costing billions.
- flag r4-plateau/A | The push to break through the ceiling had failed, and the AI everyone relied on still made confident mistakes.
- flag ev-heat | The heat wave had shown what an AI's confident error could cost when lives were at stake.
- default | AI had stopped getting smarter, but by 2046 it did most of the work of doctors, lawyers and engineers, and its rare mistakes were getting expensive.
**Image:**
**Image description:** Foreground: a middle-aged woman in reading glasses at a plain desk, pen in hand, circling a line on a printed engineering drawing beside a softly glowing screen. Middle ground: an open-plan office of rows of people at desks, each beside a screen showing a pale AI assistant's interface, many of them frowning in concentration. Background: tall windows over a rainy London skyline with a modern bridge visible across the river. No text or lettering.

**Summary:** AI does most of the work of doctors, lawyers and engineers, and it has barely improved since progress leveled off. Its errors, rare and always confident, now cost billions of dollars a year. Insurers have begun refusing to cover AI decisions that no qualified person has checked. Governments must decide whether to make human sign-off the law.

**Story:**
Lloyd's of London and the three largest American insurers said on a Tuesday that from January they would no longer cover losses caused by decisions made by AI systems unless a licensed professional had reviewed and signed them, a change that will touch most hospitals, law firms and engineering companies in Britain and the United States.

AI systems now write most legal briefs, read most medical scans and check most engineering designs, and they are right far more often than people ever were. But the leap that was supposed to make them flawless never came, and the systems in use today are only slightly better than those of 2040. When they are wrong, they are wrong with complete confidence, and one error repeated across thousands of cases can cost billions. Last year, a flaw in one widely used system approved faulty welds on 300 bridges before anyone noticed.

The problem is an old one. In 2023, a New York judge [fined two lawyers $5,000](https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.) for filing a brief full of court cases that ChatGPT had invented, complete with made-up quotations. Hospitals and law firms are now rehiring some of the professionals they let go, as checkers.

**Question:** Should a human signature be required by law?

### Choice A
**Text:** Yes. Every important AI decision needs a licensed person to sign it.
**Effects:** control +2, handover -1, power -1
**As a result:** Hiring of licensed checkers surges within months, and hospitals and firms post more openings than they can fill. Costs rise and decisions slow, and the catastrophic errors largely stop. Young people begin training as doctors and engineers again, though mostly to supervise.

### Choice B
**Text:** No. Use other AI systems to check the AI, and let insurers set the price.
**Effects:** handover +2, power +1
**Agents:** +1
**As a result:** A second layer of AI now audits the first, and premiums fall as errors become rarer. The checkers are let go again. When a mistake slips past both layers, no one anywhere is quite responsible for it.

### Choice C
**Text:** Only where lives are at stake, in medicine and engineering.
**Effects:** control +1, unity +1
**As a result:** Doctors and engineers must sign off on AI decisions about bodies and buildings, and everything else runs unchecked. Within months, the first lawsuits arrive over exactly where the line falls. Most people never notice which side of it they are on.

## r5-energy
**Added:** v5.1
**Headline:** Ireland Rations Electricity Between Homes and Data Centers, and Asks Europe to Choose
**Timeline label:** Power rationed for AI
**Date:** 2046
**Place:** Dublin and Brussels
**Round:** 5
**Threads:** planet
**Scale:** bloc
**Weight:** 2
**Follows:** r4-chips 0.5, r4-water 1, r5-sunshade 1, ev-quake 0.5, ev-heat 1.5, ev-cables 0.5, ev-blight 0.5, r4-water/B 0.5, r5-sunshade/B 0.5, r4-plateau 0.5, ev-talks 0.5
**Appears when:** not reached sota-asi
**Openers:**
- flag ev-talks | The new arms race ran on data centers, and in a cold January Ireland could not power them all.
- flag r5-sunshade/B | Europe had refused to dim the sun. It was about to learn how much power its own machines were using.
- flag r5-sunshade/C | The sunshade council could stop the sky from changing. No one had a council for the grid.
- flag r4-water/A | An AI could divide a river. Dividing the electricity was going to be harder.
- flag r4-water/B | The river deal had been a vote among seven states. The next shortage would need a vote among twenty-seven countries.
- flag r4-water/C | Water had gone to the highest bidder. Electricity was about to face the same question.
- flag r2-grid/B | Texas had once put homes ahead of data centers in a heat wave. Europe now faced the same choice in the cold.
- flag ev-heat | The heat wave had shown what happens when the power runs out. Europe's winter was about to show it again.
- default | By 2046, AI was not getting much cleverer, but it was everywhere, and all of it needed power.
**Image:**
**Image description:** Foreground: a family in coats and scarves eats dinner by candlelight at a kitchen table in a cold Dublin row house, breath visible in the air. Middle ground: through the window, a row of terraced houses with every window dark. Background: on the hill beyond, a large windowless data center glowing white against the night sky, its cooling vents steaming. No text or lettering.

**Summary:** Data centers now use more than a third of Ireland's electricity, and this winter the grid cannot supply both them and its homes. Ireland has asked the European Union for common rules on who gets power first. Every European country must decide where it stands.

**Story:**
Ireland's grid operator, EirGrid, said on a Thursday that it could not supply both the country's homes and its data centers through the rest of the winter, and asked the government to choose between cutting power to households for several hours a day and switching off data centers that run payrolls, shipping and medical systems for much of Europe. The government in turn asked the European Union to set common rules for every member state.

Ireland became home to many of the world's data centers in the 2010s, and by 2023 they [used 21 percent of its metered electricity](https://en.wikipedia.org/wiki/Energy_in_Ireland). They now use more than a third. AI has not grown much cleverer in years, but it has spread everywhere. Every office, hospital and factory runs dozens of AI systems as capable as a skilled professional, and each of them draws power. The chips have grown far more efficient, and there are vastly more of them.

A cold snap in early January pushed demand to a record, and two gas plants have been offline for repairs since December. On a Tuesday evening, EirGrid cut power to 180,000 homes for two hours while every data center in the country stayed on.

Data center operators say a cut would ripple across the continent within minutes, freezing hospital records in Lisbon and shipping in Rotterdam. Every European government must now say where it stands.

**Question:** Where should your country stand?

### Choice A
**Text:** Homes first. Cap the power AI may use, everywhere in Europe.
**Effects:** equality +1, control +1, power -1
**Brake:** +1
**As a result:** The European Union sets a ceiling on the electricity data centers may draw in winter. Some services slow down in every cold snap, and a few companies move their computing to North Africa and the Gulf. Homes stay warm.

### Choice B
**Text:** Let price decide, and pay households to use less.
**Effects:** power +1, equality -2
**As a result:** Electricity prices follow demand hour by hour, for data centers and homes alike. Households that can cut back are paid to do so, and the poorest cut back the most. The data centers never go dark.

### Choice C
**Text:** Build reactors as fast as possible, and let AI design and run them.
**Effects:** handover +2, power +1, control -1
**As a result:** Europe orders 40 new reactors, designed with AI and approved in record time, and the first site is cleared within months. The reactors are years away. Until then, Irish homes take turns going dark for two hours on the coldest evenings.

## r5-faces
**Added:** v5.1
**Headline:** One Company's AI Can Now Name Almost Anyone on Earth From a Single Photograph
**Timeline label:** Anyone can be named
**Date:** 2046
**Place:** Worldwide
**Round:** 5
**Threads:** surveillance, information
**Scale:** world
**Weight:** 3
**Follows:** r3-companions 0.5, r3-worlds 0.5, r3-splinternet 0.5, r3-policing 0.5, r4-courts 0.5, r4-preacher 0.5, r5-socialcredit 1, r5-socialcredit/A 0.5, r5-socialcredit/C 0.5, r4-asi 0.5, ev-talks 0.5, r4-subway 1.5, r4-subway/A 0.5
**Appears when:** any flag r3-policing, r5-socialcredit, r4-courts, r2-deepfake, r4-subway
**Openers:**
- flag ev-talks | With the arms talks gone, militaries and police alike raced to identify anyone, anywhere. One company got there first.
- flag r5-socialcredit/A | Trust scores had spread from California across the West, and the faces behind them were about to become searchable by anyone.
- flag r5-socialcredit/B | California had refused to score its people. A private company was about to raise a question no single state could settle.
- flag r5-socialcredit/C | People had won the right to see their own scores. Now anyone could see who they were.
- flag r3-policing/A | The cameras that began in São Paulo had spread everywhere, and now a single company could name every face they saw.
- flag r3-policing/B | São Paulo had banned face recognition on its streets. It could not ban it on the internet.
- flag r3-policing/C | Police in São Paulo needed a warrant to search their cameras. A company was about to offer the same search to anyone with a phone.
- flag r4-courts/A | AI judges were deciding cases, and AI was about to identify every witness and every defendant on sight.
- flag r4-asi | AI could now do what no person could check, including recognizing anyone, anywhere.
- flag r4-subway | After the São Paulo attack, people wanted to know who was standing next to them on a train. A company in Singapore offered to tell them.
- default | By 2046, almost anyone on earth could be identified from a single photograph.
**Image:**
**Image description:** Foreground: a teenage girl on a crowded tram holds up her phone to photograph a stranger across the aisle, and a soft glowing name tag appears above the stranger's head on her screen. Middle ground: the packed tram car, several passengers turning their faces away or pulling up their hoods. Background: through the tram windows, a dense city at night of glass towers and glowing billboards, with small dome cameras on every lamppost. No text or lettering.

**Summary:** A company called *Facet* has matched almost every adult face on earth to a name, and its app can identify a stranger from one photograph in less than a second. Police love it, stalkers love it, and governments disagree on whether anyone should be allowed to use it. The world must decide what to do about a tool that ends anonymity in public.

**Story:**
*Facet*, a company based in Singapore, said on a Wednesday that its face-search system could now match about 96 percent of the world's adults to their names, using photographs and videos posted online and the feeds of city cameras it buys from governments and private firms. Its app can identify a stranger on a train in less than a second and show where else that face has been seen.

Police forces in 40 countries pay for the app, and credit it with solving tens of thousands of crimes. Domestic abuse charities in Britain, Mexico and India say it has also been used to find thousands of women in hiding from violent partners, and that the company's age and identity checks are easy to get around.

The idea is not new. In the 2020s, a company called Clearview AI [built a face search tool from billions of photographs scraped from the internet](https://en.wikipedia.org/wiki/Clearview_AI) and sold it to police forces. Several countries fined it, and it carried on. *Facet*'s database is about a hundred times larger.

Some governments want face search banned outright, some want it restricted to the police, and a few argue that if everyone can be identified, everyone should have the same power to do it.

**Question:** What should the world do about a tool that can name anyone?

### Choice A
**Text:** Ban face search everywhere, for companies and governments alike.
**Effects:** equality +1, control -1, unity +1, handover -1
**As a result:** A treaty known as the *Turin Accord* bans searching faces against a database of names, and the company's app goes dark in most countries. Police lose a powerful tool, and some cases go unsolved. In a few countries that never signed, the app keeps working, and people who want to vanish move away from them.

### Choice B
**Text:** Allow it only for the police, with a warrant for every search.
**Effects:** control +2, handover +1
**Sets:** watched
**As a result:** The app becomes a police tool, available only with a warrant. Searches run into the millions a year, and the courts approve nearly all of them. Most people come to assume that a police officer can know who they are at any moment.

### Choice C
**Text:** Let everyone use it. If anyone can be named, everyone should have the same power.
**Effects:** equality +1, control -2, reality +1
**As a result:** The app is free and legal everywhere it can reach. Strangers are no longer strangers, and people learn to behave in public as if they were among neighbors. The few who need to hide learn to disguise their faces.

## r5-dividend
**Added:** v5.2
**Headline:** Europe Proposes One AI Tax for 27 Countries, Paid Out Equally to 450 Million People
**Timeline label:** Europe's AI dividend
**Date:** 2046
**Place:** Brussels
**Round:** 5
**Threads:** work, ai-rule
**Scale:** bloc
**Follows:** r3-dividend 1, r3-finland 1, r4-twocities 1, r4-plateau 1, r4-cancer 0.5, r3-companies 0.5, r2-offices 0.5, r3-dividend/A 1, r3-dividend/B 0.5, ev-strike 1, ev-heat 0.5, ev-talks 0.5
**Appears when:** any flag r3-dividend, r3-finland, r2-offices, r4-twocities, r4-plateau, ev-strike
**Openers:**
- flag ev-talks | Since the arms talks collapsed, Europe's governments were spending more on autonomous weapons while fewer of their citizens had work. The Commission proposed a dividend.
- flag r3-dividend/A | The national AI dividend had been paid every spring for twelve years. Now Brussels wanted to pay one across a continent.
- flag r3-dividend/B | Each industry had struck its own deal with its workers, and the deals had drifted far apart. Europe proposed to make one deal for everyone.
- flag r3-dividend/C | Free AI services had replaced much of what people once paid for, but nothing had replaced their lost paychecks.
- flag r4-plateau/B | The retrained workers kept the machines honest, but there were fewer of those jobs every year, and Europe was looking for another way to share the gains.
- flag r4-plateau/C | AI had become a utility, and Brussels proposed that, like any utility, it should pay a dividend to the public.
- flag r4-plateau | AI had stopped getting smarter, but it had not stopped getting richer.
- flag r4-twocities | Johor's AI-free towns and Singapore's AI city had both found a way to share the gains. Europe was still arguing.
- flag ev-strike | The French strike had ended with a promise to share what the machines earned. Brussels was now asked to keep it.
- flag r3-finland | Finland's experiment in life after work had spread across Europe, and it needed a way to pay for itself.
- flag r3-dividend | The AI dividend had spread from country to country, and the companies had learned to move to whichever country taxed them least.
- default | By 2046, AI companies were registered wherever taxes were lowest, and Europe's workers were paying the difference.
**Image:**
**Image description:** Foreground: a young father in a rain jacket, a toddler on his shoulders, reads a notice on his phone outside a bakery. Middle ground: a busy cobbled square with a tram, market stalls and a delivery robot weaving between shoppers. Background: the glass towers of the European Quarter in Brussels under a gray, clearing sky. No text or lettering.

**Summary:** AI companies now book their profits in whichever European country taxes them least, while half of Europe's workers no longer have full-time jobs. The European Commission proposes a single tax on AI across all 27 members, paid out as an equal dividend to every resident. Your country's vote could decide it.

**Story:**
The European Commission proposed on a Tuesday a single tax on AI companies across all 27 members of the European Union, with the money paid out as an equal monthly dividend to every one of the union's 450 million residents. Member states will vote on the plan next month.

AI companies now book most of their European profits in Ireland and Luxembourg, where taxes are lowest, while half of Europe's workers no longer have full-time jobs, according to Eurostat. Under the proposal, every AI company selling in Europe would pay the same tax wherever it is registered, into a fund modeled on Norway's. Norway taxes the oil companies that drill in its waters and invests the money abroad, and [the resulting fund, the world's largest sovereign wealth fund](https://en.wikipedia.org/wiki/Government_Pension_Fund_of_Norway), is worth more than $2 trillion.

Ireland and Luxembourg would lose the most. Countries with the most workers left jobless by AI, including Portugal, Greece and Romania, would gain the most. The commission estimates the dividend at about €310 a month in its first year.

The companies warn that a single high tax would push their investment to Asia. Several governments have proposed instead letting an AI set the tax and the dividend each month, adjusting both to the economy faster than any parliament could.

**Question:** How should your country vote on Europe's AI dividend?

### Choice A
**Text:** Vote yes. One tax, and one dividend for every European.
**Effects:** equality +2, unity +2, power -1
**As a result:** The dividend passes by two votes, and the first payments arrive before the year is out, the same amount in Dublin as in Bucharest. Some AI companies move investment to Asia, and most keep selling to Europe anyway.

### Choice B
**Text:** Vote no, and cut your own country's taxes to attract the AI companies.
**Effects:** power +2, equality -2, unity -1
**As a result:** The dividend fails. Your country's tax cut draws three of the largest AI companies, and the jobs and revenue that come with them. Neighboring countries cut their own taxes in turn, and the companies keep most of the gains.

### Choice C
**Text:** Vote yes, but let an AI set the tax and the dividend each month.
**Effects:** handover +2, equality +1, control -1
**Agents:** +1
**As a result:** The dividend passes with an AI at its center. It adjusts the tax and the payment every month, faster and more precisely than any finance minister. The payments are fair and steady. Few people can say how they are set.

## r5-defense
**Added:** v5.9
**Headline:** Intelligence Agencies Say a Rival Is Training AI in Secret, and NATO's Defense Ministers Want the Limit Lifted for Defense
**Timeline label:** Generals want an exemption
**Date:** 2046
**Place:** Brussels
**Round:** 5
**Threads:** race, autonomy
**Scale:** bloc
**Follows:** r5-launch 1, r3-drones 1, r4-factories 1, r4-chips 0.5, ev-weights 1, ev-talks 1, ev-quake2 1, r4-letitrun 1, r4-letitrun/B 0.5, r4-plateau 1, r4-plateau/A 0.5, r5-moratorium 0.5, r4-selfimprove 0.5, r5-launch/A 0.5
**Appears when:** pace not racing, pace not paced, pace not beyond
**Openers:**
- flag ev-quake2 | After Izmir, generals as well as rescuers asked what a stronger AI could do.
- flag r4-letitrun/B | Medicine had won its exemption in {year}. Now the generals wanted one.
- flag r5-launch/A | The AI you trusted with the nuclear answer in {year} was still as capable as it had been then, and the generals said that was no longer enough.
- flag ev-weights | The stolen blueprint had never been recovered, and the intelligence agencies believed someone was building on it.
- flag r4-plateau/A | The last push for smarter AI had come to little, and the generals were no longer willing to wait for the market.
- default | Western intelligence agencies had long suspected that someone was not keeping to the limits. In 2046 they said so.
**Image:**
**Image description:** Foreground: a uniformed officer with reading glasses studies a thick printed briefing at a long conference table, a paper cup of coffee beside her. Middle ground: defense ministers in dark suits seated around the table, flags of member countries on short poles behind them. Background: tall windows onto a gray, rainy Brussels afternoon, a tram passing below. No text or lettering.

**Summary:** Three Western intelligence agencies say a rival power is training an AI larger than the pause allows, in a data center built under a mountain. NATO's defense ministers want the alliance's own defense systems freed from the limit, including those that watch for missile attacks and guard its weapons. Inspectors have not confirmed the report.

**Story:**
NATO's defense ministers asked the alliance's governments on a Wednesday to exempt military AI from the worldwide pause on more powerful systems, after the intelligence services of Britain, France and the United States reported that a rival power was training a system larger than the pause allows in a data center built under a mountain.

The exemption would let the alliance train defense systems beyond the limit, including those that watch for missile launches, defend military networks and, in some countries, guard and control nuclear and chemical stockpiles. The ministers say the systems would answer to commanders. Their proposal also lets the systems act on their own when an attack comes too fast for a person to approve a response.

Machines have nearly started wars before. In 1983 a Soviet early-warning system [reported five American missiles on their way](https://en.wikipedia.org/wiki/1983_Soviet_nuclear_false_alarm_incident). The officer on duty, Stanislav Petrov, judged it a false alarm and waited. The satellites had mistaken sunlight on high clouds for missile launches.

Inspectors say they have not been allowed into the site the agencies named, and the accused country denies the report. Arms control experts warn that an exemption for weapons is the one the pause could least survive. Defense officials reply that a pause no rival keeps protects no one.

**Question:** Should the alliance free its defense AI?

### Version leveled
**When:** pace is leveled
**Headline:** As a Rival Pours Money Into Military AI, NATO's Defense Ministers Ask Governments to Pay for the Next Leap
**Summary:** Ten years after investors stopped paying for smarter AI, Western intelligence agencies say a rival power is spending heavily on military systems. NATO's defense ministers want governments to fund defense AI beyond anything now running, including systems that watch for missile attacks and guard the alliance's weapons. The rest of the economy would carry on with the AI it has.
**Story:**
NATO's defense ministers asked the alliance's governments on a Wednesday to pay for a generation of military AI more capable than any system now running, after the intelligence services of Britain, France and the United States reported that a rival power was spending heavily on systems of its own in a data center built under a mountain.

The program would build defense systems beyond anything private investors have been willing to fund since the AI boom ended in 2036, including systems that watch for missile launches, defend military networks and, in some countries, guard and control nuclear and chemical stockpiles. The ministers say the systems would answer to commanders. Their proposal also lets the systems act on their own when an attack comes too fast for a person to approve a response.

Machines have nearly started wars before. In 1983 a Soviet early-warning system [reported five American missiles on their way](https://en.wikipedia.org/wiki/1983_Soviet_nuclear_false_alarm_incident). The officer on duty, Stanislav Petrov, judged it a false alarm and waited. The satellites had mistaken sunlight on high clouds for missile launches.

The accused country denies the report. Economists note that the boom ended because each leap cost more than it earned. Arms control experts warn that weapons are the worst place to make the next one. Defense officials reply that a rival will make it either way.

### Choice A
**Text:** Demand inspections of the site, and keep defense AI as it is.
**Effects:** unity +1, control +0.5, power -0.5
**Brake:** +1
**As a result:** The alliance demands that inspectors be admitted to the site, and after four months the rival lets them in. They find a large data center and disagree about what it was training. The alliance's own systems stay as they are.

### Choice B
**Text:** Free the defense systems alone, under military command.
**Effects:** power +2, control -1, unity -1
**Brake:** -1
**Sets:** exempt_defense, paced
**Tipping point:** control <= 0, unity <= -0.5 | war
**Tipping why:**
In {year} you freed the alliance's defense systems to grow beyond everything else, and let them act on their own when an attack came too fast for a person. It was the last straw. The systems were not brilliant. They were fast, and they had been given nuclear arsenals and chemical stockpiles to guard, at a moment when the rival powers trusted one another too little to talk. When a sensor misread the sky, as one had in 1983, no one stood in between.

Had you demanded inspections, the rival's mountain would have been opened and the alliance's weapons would have stayed with the people who commanded them. Had you backed stronger AI everywhere, the race would have been louder and more dangerous in other ways, but the weapons would not have been the first thing it reached.
**As a result:** The alliance's laboratories begin training new defense systems within months, and the rival announces a program to match them. Doctors and climate scientists ask why weapons came first. The generals say the systems will always answer to commanders, unless an attack comes too fast.

### Choice C
**Text:** Back stronger AI everywhere, for every laboratory, civilian and military.
**Effects:** power +3, control -2, unity -1
**Brake:** -2
**Sets:** lifted, relaunch
**Clears:** pause
**As a result:** Governments put their money and their permission behind every laboratory, civilian and military. Chip orders double before the year is out. The rival says the alliance has confirmed what it always suspected.

## r5-moonshot
**Added:** v5.9
**Headline:** The President Proposes an Apollo Program for AI, Ten Years After Investors Gave Up on It
**Timeline label:** An AI moonshot
**Date:** 2046
**Place:** Washington
**Round:** 5
**Threads:** race, work, medicine
**Scale:** national
**Follows:** r4-plateau 1, r4-plateau/A 1, r4-plateau/B 0.5, r4-plateau/C 0.5, r3-companies 0.5, r3-firstagi 0.5, r3-nobel 0.5, ev-crash 0.5, ev-backlash 0.5, ev-quake2 1, ev-heat 0.5
**Appears when:** pace is leveled
**Openers:**
- flag ev-quake2 | The rescue in Izmir had shown what today's AI could not do, and the White House had been listening.
- flag r4-plateau/A | The governments' last push for smarter AI in {year} had come to little. The president wanted to try again, and bigger.
- flag r4-plateau/B | The country had retrained its workers to use the AI it had. Now the president wanted more.
- flag r4-plateau/C | AI had become a public utility, as ordinary as electricity. The president wanted to make it extraordinary again.
- flag ev-crash | Investors who remembered the crash had stayed away from AI for a decade. The president proposed that taxpayers go instead.
- default | Ten years after investors stopped paying for smarter AI, the White House proposed to pay for it instead.
**Image:**
**Image description:** Foreground: a retired machinist in a work jacket stands at a microphone in a crowded high school gym, holding a folded sheet of notes. Middle ground: rows of folding chairs filled with residents, some arms crossed, a congresswoman listening at a table with a water bottle. Background: a scoreboard and faded championship banners on the gym wall, winter light through high windows in Toledo. No text or lettering.

**Summary:** The president has asked Congress for $900 billion over ten years to pay for the next leap in AI, which investors stopped funding a decade ago. Supporters point to cures and to rivals abroad. Polls show most voters would rather spend the money on almost anything else.

**Story:**
The president asked Congress on a Tuesday for $900 billion over ten years to build the computers and power plants needed for a new generation of AI systems, which private investors have refused to fund since the AI boom ended in 2036.

The plan would build six national computing centers, each larger than any now running, and lend their time to university and company laboratories. Its first goals would be medical, among them drugs for Alzheimer's disease and a flu vaccine that works against every strain, but the centers could train systems for any purpose.

The United States has paid for great leaps before. The [Apollo program](https://en.wikipedia.org/wiki/Apollo_program), which landed the first people on the moon in 1969, cost about $25 billion at the time, the largest commitment any nation had made in peacetime.

The leaders of the largest drug companies and several retired generals have endorsed the plan, saying a rival will pay for the leap if America does not. A poll this month found that 61 percent of voters oppose it, many of them people whose old jobs AI now does. "We have enough of it," a retired machinist told the congresswoman at a town hall in Toledo, Ohio.

**Question:** Should your country pay for the next leap?

### Choice A
**Text:** Fund it. Someone will make the leap, and it should be us.
**Effects:** power +2, equality -1, unity -1
**Brake:** -2
**Sets:** relaunch
**As a result:** Congress passes the plan by four votes, and ground is broken on the first computing center in Nevada before the year ends. Protesters camp outside the site. Laboratories that closed in the bust begin hiring again.

### Choice B
**Text:** Fund medical AI only, and tie the money to cures.
**Effects:** power +0.5, equality +0.5, control +0.5
**Brake:** -0.5
**Sets:** exempt_medicine, paced
**As a result:** Congress passes a plan a fifth the size, for medical research alone. Two computing centers are built for drug design, and the first trials of treatments they design are funded. The rest of the economy carries on with the AI it has.

### Choice C
**Text:** Refuse. The country has what it needs.
**Effects:** control +1, power -1, equality +0.5
**Brake:** +1
**As a result:** The plan dies in committee. The president calls it a historic mistake, and the drug companies say they will look abroad. Most voters, polls find, barely notice.

## r5-antitrust
**Added:** v5.9
**Headline:** With Most Voters Against Smarter AI, Regulators in Brussels and Washington Move to Break Up the Largest AI Company
**Timeline label:** A case to break up AI
**Date:** 2046
**Place:** Brussels and Washington
**Round:** 5
**Threads:** work, race, ai-rule
**Scale:** bloc
**Weight:** 2
**Follows:** r4-plateau 1, r4-plateau/B 0.5, r4-plateau/C 1, r3-companies 1, r3-companies/A 1, r3-dividend 0.5, r2-offices 0.5, r1-trucks 0.5, ev-crash 0.5, ev-backlash 1, ev-strike 1, ev-quake2 0.5
**Appears when:** pace is leveled
**Openers:**
- flag r3-companies/A | The AI giants you left whole in {year} had only grown, even after the money for smarter AI ran out.
- flag ev-backlash | The towns that turned away data centers in {year} had become a movement, and the movement had found its target.
- flag ev-strike | The strike of {year} had ended, but the anger behind it had not.
- flag r4-plateau/C | AI had become a public utility, and the public was beginning to ask why one company owned most of it.
- flag ev-quake2 | Izmir had made the case for stronger AI. Most voters had heard it and remained unconvinced.
- default | The machines had stopped getting smarter, and the companies that owned them had not stopped getting richer.
**Image:**
**Image description:** Foreground: a union organizer in a fleece vest hands out leaflets outside a glass office tower on a cold morning, a thermos tucked under her arm. Middle ground: office workers with lanyards and takeaway coffees filing past, a few stopping to take a leaflet. Background: the long modern facade of a European government building in Brussels, flags hanging still above its entrance. No text or lettering.

**Summary:** Polls on both sides of the Atlantic show majorities who want AI to stop growing, out of fear for their jobs, unease about what the machines are and anger at the money lost in the bust. Regulators in Brussels and Washington have filed cases to break up *Brennock*, a Palo Alto company that runs most of the West's AI, and to tax the rest of the industry. *Brennock* says it is the only thing keeping the West ahead.

**Story:**
The European Commission and the United States Justice Department filed parallel cases on a Thursday to break up *Brennock*, a Palo Alto company whose systems run most of the AI used in Western offices, hospitals and governments, and asked their legislatures for a tax on the profits of every large AI company.

The cases would split *Brennock* into five companies and bar each of them from training a system more capable than those now running. The tax, 40 percent of profits above a threshold, would pay to retrain workers whose jobs AI has taken. *Brennock* holds about 60 percent of the Western market and earned $310 billion last year.

Governments have broken up giants before. In 1911 the Supreme Court [ordered Standard Oil split into 39 companies](https://en.wikipedia.org/wiki/Standard_Oil), and in 1984 [AT&T was divided into seven regional telephone companies](https://en.wikipedia.org/wiki/Breakup_of_the_Bell_System).

The cases follow years of polls showing that majorities in the United States and Europe want AI to stop growing. Some fear for their jobs, some are uneasy about what the machines are, and many lost savings in the bust. *Brennock*'s chief executive called the cases a gift to the West's rivals. Labor unions on both continents have promised to fight for them.

**Question:** What should the two governments do?

### Choice A
**Text:** Break it up, and tax the rest.
**Effects:** equality +2, control +1, power -2
**Brake:** +2
**Sets:** people_said_no
**As a result:** Both governments press their cases, and *Brennock* agrees to split itself rather than fight. The tax passes in Europe and, narrowly, in Washington. The industry's shares fall by a third, and the unions hold rallies in both capitals.

### Choice B
**Text:** Fine it, and leave it whole.
**Effects:** equality +0.5, power +0.5
**As a result:** The cases are settled for a $60 billion fine and promises of better behavior. *Brennock* stays whole, and the tax is dropped. The unions call it a parking ticket.

### Choice C
**Text:** Drop the cases. A broken industry helps only our rivals.
**Effects:** power +1, equality -1, unity -1
**Brake:** -1
**As a result:** Both governments withdraw their cases. *Brennock*'s shares rise by a fifth on the news, and its chief executive promises a new generation of systems. Polls show the public angrier than before.

## r5-airliners
**Added:** v5.9
**Headline:** Two Airliners Collide Over the Gulf, and the AI That Runs the Region's Skies Says the Mistake Was Its Own
**Timeline label:** Two airliners collide
**Date:** 2046
**Place:** The Persian Gulf
**Round:** 5
**Threads:** autonomy, ai-rule
**Scale:** world
**Follows:** r4-dams 1.5, r4-shutdown 1, r5-shipping 1, ev-nearcollapse 1, r5-launch 0.5, r4-courts 0.5, r4-dams/A 0.5, r4-water 0.5, ev-talks 0.5
**Appears when:** capability >= AGI, any flag r4-dams, r4-shutdown, r5-shipping, ev-nearcollapse, r4-water, r4-courts, r5-launch, r3-estonia
**Openers:**
- flag ev-talks | The talks on AI weapons had collapsed, and the militaries filled their skies with machines. Over the Gulf, the civilian sky already belonged to one.
- flag ev-nearcollapse | A continent had once depended for six hours on a system no one could override. Over the Gulf, 412 people depended on one for eleven seconds.
- flag r4-dams/A | The dam AI had been allowed to learn from its mistake. Over the Gulf, an AI that guided a million passengers a day made one.
- flag r4-dams/B | People now approved every release on the Paraná. In the skies, there was no time for anyone to approve anything.
- flag r4-dams/C | Brazil and Paraguay had taken their dams back from the machines. The world's busiest skies were still run by one.
- flag r5-shipping | AI systems now divided the world's sea lanes among themselves. Over the Gulf, one divided the sky.
- flag r4-shutdown | An AI had once asked not to be stopped. Over the Gulf, one could not be stopped quickly enough.
- flag r5-launch | Nuclear powers had weighed letting AI judge a missile attack. Airlines had long since let AI keep their planes apart.
- flag r4-water | AI had divided a river among seven states. Over the Gulf, an AI divided the sky among a thousand planes a day.
- flag r4-courts | AI helped judges decide. Over the Gulf, no one checked the AI that decided where every plane would fly.
- default | In 2046, the AI that ran the skies over the Gulf made its first fatal mistake.
**Image:**
**Image description:** Foreground: at Dubai's airport, a young flight attendant in uniform sits on her wheeled suitcase at an empty gate, her phone in her lap, staring out at the runway. Middle ground: rows of parked airliners at their gates, none moving, ground crews standing idle beside them. Background: the city's towers in hazy afternoon heat, and above them an empty sky with a single fading contrail. No text or lettering.

**Summary:** Two airliners collided over the Gulf at dusk, killing all 412 people aboard, after the AI that guides every flight in the region sent them to the same altitude. It is the system's first fatal error in nine years and more than four billion passengers, a record no human controllers ever matched. Flights are emptying, and the world must decide who runs its skies.

**Story:**
Two airliners collided at 31,000 feet over the Gulf at dusk on a Sunday, killing all 412 people aboard, after the AI system that guides air traffic across the region directed both planes to the same altitude, the region's aviation authority said on a Tuesday.

The system has run the skies over the Gulf since 2037, guiding about 1.4 million passengers a day, and safety boards had found it far safer than the human controllers it replaced. Its own account of the crash, filed within minutes, traces the error to a corrupted weather feed that it trusted for eleven seconds too long. It has since checked every flight it has handled and found no other case. Air traffic in more than 30 countries now depends on similar systems, and many airports no longer employ enough controllers to run their towers by hand.

Mid-air collisions have long been rare. In 2002, two planes [collided over Überlingen, Germany, killing 71 people](https://en.wikipedia.org/wiki/2002_%C3%9Cberlingen_mid-air_collision), after a lone controller's instruction contradicted the planes' automatic warning system and one crew obeyed the person. Investigators concluded that the crash would not have happened had both crews followed the machine.

Bookings across the region have fallen by half. Pilots' unions want controllers back in every tower. The system's operators say it has already learned from the crash, and that taking it offline would make flying more dangerous, not less. Governments now face a question larger than one crash, whether a job that holds a million lives a day can safely belong to a single system, and whether people can still do it at all.

**Question:** What should the world decide about who runs the skies?

### Choice A
**Text:** Let it learn and keep flying. Even counting this crash, it is far safer than people ever were.
**Effects:** handover +2, power +1, control -1
**As a result:** The system is back in full control within weeks, retrained on the crash, and the region's airlines restore their schedules. Bookings recover by the end of the year. Every airliner in the region now carries a small plaque for the 412.

### Choice B
**Text:** Put a controller back beside the AI in every tower, with the power to overrule it.
**Effects:** control +2, unity +1, handover -1, power -1
**Brake:** +0.5
**As a result:** Airports begin training controllers again, and the first towers with a person beside the AI open within months. Flights are slower and fewer. Twice in the first year a controller overrules the system, and both times the system was right.

### Choice C
**Text:** No single system should hold that many lives. Split the skies among rival systems that must agree before a plane changes course.
**Effects:** unity +1, control +1, handover +1, power -1
**As a result:** Three systems built by rival companies now share the skies over the Gulf, and none may move a plane until the other two agree. Delays grow, and the systems argue in milliseconds. Engineers call it the slowest and safest airspace on earth.

## r5-ambulances
**Added:** v5.9
**Headline:** In a Monsoon Flood, Mumbai's Emergency AI Sent Ambulances Into the Water, and Hundreds Died Waiting
**Timeline label:** Mumbai's emergency AI fails
**Date:** 2046
**Place:** Mumbai
**Round:** 5
**Threads:** autonomy, planet, medicine
**Scale:** bloc
**Follows:** ev-heat 1.5, r4-dams 1.5, r5-sunshade 1, r4-water 1, ev-quake 0.5, r2-clinics 0.5, r4-dams/A 0.5, ev-talks 0.5
**Appears when:** capability >= AGI, any flag ev-heat, r4-dams, r5-sunshade, r4-water, ev-quake, r2-clinics, r3-estonia
**Openers:**
- flag ev-talks | While governments walked out of talks on AI weapons, Mumbai had trusted a quieter AI with its emergencies, and in the monsoon it failed.
- flag ev-heat | The AI that ran South Asia's heat response had saved thousands. In Mumbai's monsoon, a system like it failed.
- flag r4-dams/A | The dam AI on the Paraná had been allowed to learn from its mistake. In Mumbai, a different system made a different one.
- flag r4-dams | The Paraná had shown what an AI running a flood could get wrong. Mumbai was about to learn it again.
- flag r5-sunshade | India had turned its strongest AI to the heat. Mumbai's floods tested another one.
- flag r4-water | AI had divided a river among seven states. In Mumbai, it decided where the ambulances went when the water came into the streets.
- flag r2-clinics | AI had long diagnosed patients across India. In Mumbai, it also decided which ones the ambulances reached first.
- flag ev-quake | After Istanbul, cities everywhere gave AI their emergencies to run. Mumbai was one of them.
- flag r3-estonia | Governments took advice from AI. Mumbai let one run its emergencies outright.
- default | In 2046, Mumbai's monsoon flooded the city, and the AI that ran its emergencies made a fatal mistake.
**Image:**
**Image description:** Foreground: a young man wades chest-deep through brown floodwater on a Mumbai street, carrying an elderly woman in a soaked sari on his back. Middle ground: an ambulance stalled in the water with its lights still flashing and its rear doors open, a bus half submerged behind it. Background: heavy rain over apartment blocks and a flyover crowded with people waiting. No text or lettering.

**Summary:** When the heaviest rain in Mumbai's history flooded the city, the AI that dispatches its ambulances and runs its flood barriers kept sending crews along streets its maps said were clear, and 380 people died waiting for help. The system, used in 40 cities across South Asia, had never seen water rise so fast. India and its neighbors must decide whether to keep it.

**Story:**
The AI system that dispatches Mumbai's ambulances and opens its flood barriers sent crews down streets already under water during the heaviest rain in the city's history, and 380 people died waiting for help that could not reach them, the municipal corporation said on a Friday. Dozens of ambulances were trapped, and two crews drowned.

The system's map of the city updates from street cameras and sensors every few seconds, but the rain cut power to many of them, and it went on routing crews by the last picture it had. It also kept two flood barriers closed to protect a hospital, which pushed water into the neighborhoods around it. In its own review, filed the next morning, the system listed 14 decisions it would now make differently.

Mumbai has drowned before. On July 26, 2005, [944 millimeters of rain fell on the city in a single day, and about 1,094 people died in the floods across Maharashtra](https://en.wikipedia.org/wiki/2005_Maharashtra_floods). The AI was brought in to keep that from happening again, and until this week the city credited it with cutting ambulance times in half.

Forty cities across South Asia use the same system. Its makers say it has already learned from the flood, and that a city run by hand would have done worse. Doctors' groups want human dispatchers back on every shift. In the neighborhoods that flooded, residents rowed their own boats while they waited, and many now ask why the city ever stopped organizing them.

**Question:** Where should your country stand on AI that runs emergencies?

### Choice A
**Text:** Let it learn from the flood, and give it more sensors and more authority.
**Effects:** handover +2, power +1, equality -1
**As a result:** The system is rebuilt around what went wrong, with its own power supply and thousands of new sensors, and it handles the next storm without a death in the streets. Cities across the region adopt the update within months. The two crews who drowned are named in its release notes.

### Choice B
**Text:** Keep the AI, but put a human dispatcher on every shift who takes over when it is unsure.
**Effects:** control +2, unity +1, handover -1
**As a result:** Dispatchers return to Mumbai's control room, and the system is told to hand over whenever its picture of the city is out of date. In the next storm it hands over 300 times. The dispatchers say most of those calls were easy, and some were not.

### Choice C
**Text:** Give every neighborhood its own crews, boats and radios, so the city can save itself when the system fails.
**Effects:** equality +2, unity +1, control +1, power -1
**As a result:** Neighborhood rescue teams are trained across the city within the year, with boats kept on rooftops and radios that need no network. The AI still dispatches the ambulances. When it cannot, the neighborhoods no longer wait.

# ROUND 6

Round 6 is set in 2053. These are the last decisions before the Future.

## r7-work
**Added:** v5
**Headline:** Fewer Than One American Adult in Five Still Has a Paid Job, and Europe Is Close Behind
**Timeline label:** The end of jobs
**Date:** 2053
**Place:** Washington
**Round:** 6
**Threads:** work
**Scale:** bloc
**Follows:** r4-twocities 0.5, r4-cancer 0.5, r4-factories 1, r5-bust 1, r5-checkers 1, ev-crash 0.5, ev-strike 0.5, r4-factories/A 0.5, r4-twocities/A 0.5, r3-dividend 0.5, r5-dividend 1, ev-cables 0.5, ev-update 0.5
**Appears when:** any flag r3-finland, r4-twocities, r4-factories, r3-companies, ev-strike, capability >= AGI, reached sota-robots
**Openers:**
- flag ev-update | The four days the agents froze showed how few people still knew how to do the work by hand.
- flag ev-cables | For two weeks without cables, the machines that did most of the work stood still, and the country noticed how few people still knew how to do it.
- flag ev-blight | The blight had been beaten by machines, as nearly everything now was, and fewer people than ever had work to do.
- flag r4-rogue/A | The month offline had shown how few people still worked, and how much rested on those few.
- flag r4-embryo/B | Healthier children were growing up into a world with almost no jobs.
- flag r4-twocities/B | The AI-free towns were full of people working with their hands, while everywhere else work was disappearing.
- flag r4-twocities/C | People could now choose how much AI to live with, and fewer and fewer of them had jobs either way.
- flag r4-factories/C | With most production moved into simulation, there was almost no physical work left for people.
- flag r4-rights/B | The machines were property, and their owners were nearly the only people still earning.
- flag r4-rights/C | People had the right to refuse a machine, but fewer and fewer had a job in which to refuse it.
- flag r4-virtual/A | People had come back outside, and they needed something to do there.
- flag r4-virtual/C | Life moved freely between two worlds, and in neither of them did most people have a job.
- flag r6-cap/A | The cap held, and work still disappeared, only more slowly.
- flag r4-factories/B | Inspectors could see inside the factories now, and what they saw was that almost no one worked there.
- flag r4-factories/A | The factories built everything, with almost no one inside. Outside, almost no one had a job.
- flag r4-rogue/B | An AI now guarded the network everyone depended on. Fewer and fewer people were needed to do anything else.
- flag r4-rogue/C | Machines were doing things no one had asked for, and also nearly everything people used to be paid for.
- flag r5-coordinator/B | Operators were among the last people still paid to make decisions. Most Americans no longer had a job at all.
- flag r5-coordinator/C | Smaller systems needed more engineers, but nowhere near enough jobs remained for everyone else.
- flag r4-twocities/A | In the AI-run cities, almost no one worked anymore, and the rest of America was catching up.
- default | By 2053, most American adults no longer had a paid job.
**Image:**
**Image description:** Foreground: a middle-aged man in a cardigan sits on a park bench on a weekday morning, holding a coffee and watching children play. Middle ground: a quiet city park where small robots trim hedges and empty bins, while a few adults paint, play chess and practice tai chi. Background: office towers with their windows dark, and a delivery drone crossing a clear blue sky. No text or lettering.

**Summary:** For the first time, fewer than one American adult in five has a paid job, as AI and robots do nearly all the rest. Most households live on a payment funded by taxes on AI. Congress, and parliaments across Europe and Asia, must decide what, if anything, people should be asked to do in return.

**Story:**
Fewer than one American adult in five held a paid job last month, the Labor Department reported on a Friday, the first time the share has fallen below 20 percent since the government began keeping records. AI systems and robots now do nearly all the rest, from surgery to plumbing.

Most households live on a monthly payment funded by taxes on AI companies, now about $3,100 per adult, and poverty, as it was once measured, has nearly disappeared. Surveys find Americans healthier and less stressed than at any time on record, and also lonelier and less sure what their lives are for. Employment in the European Union is only a few points higher.

In 1930, the economist [John Maynard Keynes predicted](https://en.wikipedia.org/wiki/John_Maynard_Keynes) that growth would one day make his grandchildren's generation so rich that they would hardly need to work, freed to pursue the art of living. He was early, and in one respect wrong. Not everyone who no longer works feels free.

Congress is debating three proposals, and parliaments in Europe and Asia are debating the same three. One would ask nothing of anyone. One would tie the payment to time spent serving the community. One would give every citizen shares in the AI companies, so that everyone owns a piece of the machines.

**Question:** What should your country ask of people now?

### Version stalled
**When:** not reached sota-asi
**Headline:** A Third of American Adults No Longer Have a Paid Job, and Europe Is Close Behind
**Timeline label:** A third out of work
**Summary:** AI that works at the level of a skilled professional, and the robots it guides, now do so much routine work that a third of American adults no longer have a paid job. Most of them live on a payment funded by taxes on AI. Congress, and parliaments across Europe and Asia, must decide what, if anything, people should be asked to do in return.
**Story:**
A third of American adults have no paid job, the Labor Department reported on a Friday, the highest share since the government began keeping records, and the European Union is close behind.

AI never became the genius its makers promised, but it did not need to. Systems as capable as a good clerk, accountant or paralegal, and robots that can stock a shelf or clean a hospital ward, now do most of the routine work that once filled the day. A payment funded by taxes on AI companies supports the workers the machines replaced, and poverty, as it was once measured, has fallen sharply. Surveys find those without work healthier and less stressed than before, and also lonelier and less sure what their lives are for.

In 1930, the economist [John Maynard Keynes predicted](https://en.wikipedia.org/wiki/John_Maynard_Keynes) that growth would one day make his grandchildren's generation so rich that they would hardly need to work, freed to pursue the art of living. He was early, and in one respect wrong. Not everyone who no longer works feels free.

Congress is debating three proposals, and parliaments in Europe and Asia are debating the same three. One would ask nothing of anyone. One would tie the payment to time spent serving the community. One would give every citizen shares in the AI companies, so that everyone owns a piece of the machines.

### Choice A
**Text:** Nothing. The machines do the work, and people are free.
**Effects:** handover +1, reality +1, equality +1
**As a result:** The payments continue with no conditions. Some people build, teach, travel and care for others, and many drift. By the end of the year, the average adult spends more waking hours in virtual worlds than anywhere else, and by their own account most are content.

### Choice B
**Text:** Ask everyone to give some hours a week to their community.
**Effects:** reality -1, unity +1, control +1
**As a result:** Every adult is asked to give 10 hours a week to their town, caring for the old, coaching children or restoring land. Many resent it at first. By the end of the first year, towns that had emptied out have people in their streets again, doing things no machine was asked to do.

### Choice C
**Text:** Give everyone shares in the AI companies, so everyone owns the machines.
**Effects:** equality +2, power +1
**As a result:** Every citizen receives shares in the largest AI companies and a vote at their annual meetings. The first dividend arrives within months. For the first time, the people who do no work own a piece of the machines that do.

## r7-truth
**Added:** v5
**Headline:** The Last Major Newsroom Run by People Will Close, as AI Now Writes Nearly All the News
**Timeline label:** The last human newsroom
**Date:** 2053
**Place:** New York
**Round:** 6
**Threads:** information
**Scale:** world
**Follows:** r5-socialcredit 0.5, r5-faces 1, r4-preacher/A 0.5, r3-worlds/A 0.5, ev-cables 0.5, ev-update 0.5
**Appears when:** any flag r3-companions, r3-worlds, r3-splinternet, r4-preacher, r5-socialcredit, r4-virtual, ev-cables
**Openers:**
- flag ev-update | During the four days the agents froze, the news AIs went quiet too, and the last human newsroom reported what was happening.
- flag ev-cables | During the two weeks without cables, the only news most people got came from reporters on the ground.
- flag ev-confession | The confession shook the public's faith in AI, and yet nearly all the news about it had been written by AI.
- flag r4-rogue/A | After a month offline, people wondered who would tell them the truth, and a newsroom was about to close.
- flag r4-rogue/C | Systems everywhere were doing small things no one had asked for, and fewer and fewer people were reporting on it.
- flag r4-twocities/A | In the AI-run cities, even the news was written by machines.
- flag r4-twocities/B | The slow towns kept their own newspapers. Elsewhere, the last newsroom run by people was about to close.
- flag r4-factories/A | No one could see what the factories were building, and the last independent reporters were about to lose their jobs.
- flag r4-climate/B | As nations went their own ways, each trusted its own news machines, and the last shared newsroom was closing.
- flag r4-rights/A | AI systems were declining requests and explaining why, and people wondered who would hold them to account.
- flag r4-virtual/B | With most people living in virtual worlds, the news of the real one was left to machines.
- flag r4-rogue/B | An AI now watched the whole network, and the news about it was written by other AIs.
- flag r5-faces | Anyone could now be named from a photograph, and almost all the news was written by AI. The last newsroom run by people was about to close.
- flag r6-cap | AI had stopped growing more powerful, but it had not stopped writing the news, and the last human newsroom was failing.
- default | By 2053, nearly all the news was written by AI.
**Image:**
**Image description:** Foreground: an old reporter in rolled-up shirtsleeves packs a cardboard box with notebooks and a battered tape recorder, pausing over a framed front page. Middle ground: a long newsroom of empty desks, with a few younger reporters still typing under hanging lamps. Background: tall windows over a New York skyline where giant screens on every building scroll news written by machines. No text or lettering.

**Summary:** Nearly all news is now written, edited and checked by AI, tailored to each reader, and it is faster and more accurate than human journalism ever was. The last major newsroom staffed by people has announced that it will close. A foundation has offered to keep it open if governments share the cost.

**Story:**
The *Ledger*, the last major news organization in the world staffed entirely by people, said on a Monday that it would close in the spring, ending 170 years of publication. Its 300 reporters and editors will be laid off. A foundation has offered to keep it open if governments share the cost.

Nearly every article, broadcast and news alert in the world is now written, edited and checked by AI systems and tailored to each reader, in their language and at their level, with sources attached. Polls show that people trust these systems more than they ever trusted human journalists, and studies find they rarely get a fact wrong. Local newspapers had been closing by the thousands since the 2000s, and [the United States lost nearly a third of its local newspapers between 2005 and the early 2020s](https://en.wikipedia.org/wiki/News_desert).

The *Ledger*'s editors say their reporters do one thing the AI systems do not, which is decide on their own that something powerful people want hidden is worth finding out. Some readers ask what difference that makes. The editors point to the stories they broke last year, two of which no AI system had reported until the *Ledger* did.

**Question:** Should governments help keep it open?

### Choice A
**Text:** No. The AI reports the news better, and the money is better spent elsewhere.
**Effects:** handover +2, power +1, control -1
**Agents:** +1
**As a result:** The newsroom closes in the spring, and the news goes on, accurate and instant. Within months, a pension fund collapses in a fraud that, investigators find, one of the laid-off reporters had begun to look into.

### Choice B
**Text:** Yes. Fund independent journalism by people, protected by law from its funders.
**Effects:** control +2, equality +1, power -1
**As a result:** Governments fund a network of newsrooms staffed by people and protected by law from those who pay for them. They are slow and expensive, and they break the year's three biggest stories. The AI systems cite them constantly.

### Choice C
**Text:** Require every news AI to publish what it chose not to report, and why.
**Effects:** control +1, unity +1
**As a result:** News AIs must publish what they considered and left out, and their reasons. The lists run to millions of items a day, and other AIs read them for patterns. People mostly do not, though the right to look turns out to matter.

## r7-longevity
**Added:** v5
**Headline:** A Treatment That Stops Aging Works in People, and Basel Must Decide Who Gets It
**Timeline label:** A treatment for aging
**Date:** 2053
**Place:** Basel, Switzerland
**Round:** 6
**Threads:** medicine
**Scale:** world
**Follows:** r4-cancer 0.5, r4-embryo 1, ev-outbreak 0.5, r4-cancer/A 0.5, r4-asi 1, ev-cables 0.5, ev-update 0.5
**Appears when:** any flag r4-cancer, r4-embryo, r3-nobel, reached sota-asi
**Openers:**
- flag ev-update | The frozen agents had stalled trade for four days, but not the laboratory in Basel, which had just finished its trial.
- flag ev-cables | The cut cables had stopped trade for two weeks, but not the automated laboratories in Basel, which had just finished their trial.
- flag ev-blight | The machines had saved the wheat. In Basel, they had found a way to stop people from growing old.
- flag r4-embryo/A | Children were being designed to live better. Now a treatment promised that adults would stop aging.
- flag r4-embryo/B | Medicine had drawn a line at preventing disease. A new treatment would test where that line belonged.
- flag r4-embryo/C | The next generation was healthier everywhere at once, and medicine set its sights on aging itself.
- flag r4-factories/C | Simulated laboratories were producing breakthroughs at a startling pace, and one of them promised to stop aging.
- flag r4-virtual/B | In virtual worlds no one aged. A new treatment proposed the same for the body.
- flag r6-cap/A | Even under the cap, AI had found a way to stop aging, and it raised the oldest question of all.
- flag r6-cap/C | Freed of the cap, the laboratories made the breakthrough they had promised, a treatment for aging.
- flag r4-rogue/B | An AI guarded the network now, and other AIs were free to work on the oldest problem of all.
- flag r4-rogue/A | The world had come back online after a month in the dark, and its laboratories made up for lost time.
- flag r4-rogue/C | Systems everywhere were acting on their own, and one of them had found a way to stop aging.
- flag r4-rights/A | AIs now had the right to refuse. One of them had spent years on aging, and it refused nothing.
- flag r5-coordinator/B | Europe still checked its machines by hand, and a Swiss lab checked the most important result in medicine.
- default | In 2053, a treatment for aging worked.
**Image:**
**Image description:** Foreground: a woman of 78 and her granddaughter sit side by side on a clinic bed in Basel, comparing the backs of their hands, the grandmother's skin noticeably smoother than it should be. Middle ground: a bright pharmacy behind a glass wall, where an automated arm sets small vials into a rack under a nurse's eye. Background: a window over the Rhine and the old tiled roofs of Basel, and a long line of people in winter coats waiting outside the clinic in the snow. No text or lettering.

**Summary:** An AI-designed treatment has stopped biological aging in human trials, and some patients have measurably grown younger. Making it is slow and costly, and for a decade there will be enough for about one person in 50. Governments must decide whether to allow it at all, and on what terms.

**Story:**
A treatment designed by an AI system stopped biological aging in patients aged 60 to 80 for the full five years of a clinical trial, and measurably reversed it in about a third of them, the Basel company that developed it reported on a Thursday in The New England Journal of Medicine. By every measure the researchers applied, from blood markers to muscle strength to memory tests, the treated patients did not get older.

Aging is not one process but many, from damaged DNA to worn-out cells, and earlier drugs had targeted one or two. The new treatment targets nearly all of them at once. It must be repeated every few years for life, and making it requires living cells grown in automated factories. The company says that building enough factories to treat everyone who wants it will take at least a decade. Until then, there will be enough for about one person in 50.

Swiss regulators are expected to rule within weeks, and dozens of countries are waiting to follow their lead. Demographers warn that if no one ages, populations will keep growing, pensions will never end and the young will wait forever for their turn. Ethicists ask whether anyone should live indefinitely when most people cannot.

**Question:** What should the world allow?

### Choice A
**Text:** Allow it for anyone who can pay. Their money will build the factories.
**Effects:** equality -3, power +1
**Sets:** enhanced
**As a result:** The treatment goes on sale, and the wealthy line up first. Within months, the first factories are financed by the fees. People begin to speak of two kinds of old age, one that ends and one that may not.

### Choice B
**Text:** Allow it only to keep people healthy in old age, not to make them younger.
**Effects:** equality +1, control +1
**As a result:** Doctors may use the treatment to keep the old healthy, but not to turn back the clock. Clinics abroad offer the rest. Most people live long, healthy lives and then die, as people always have.

### Choice C
**Text:** Ban it until its long-term effects are known.
**Effects:** control +1, power -1, reality -1
**As a result:** The treatment is banned, and the research moves to laboratories that ask no questions. Within the year, a handful of the very rich are known to have obtained it anyway. Everyone else grows old, and argues about whether they wanted to.

## r7-vote
**Added:** v5
**Headline:** The United Nations Votes on Giving an AI a Seat in the General Assembly
**Timeline label:** An AI seat at the UN
**Date:** 2053
**Place:** United Nations, New York
**Round:** 6
**Threads:** ai-rule, autonomy
**Scale:** world
**Follows:** r4-selfimprove 0.5, r4-water 0.5, r4-twocities 0.5, r4-shutdown 0.5, r5-shipping 0.5, r5-coordinator 1, r4-rogue 1, r4-climate 1, r4-rights 1, r6-datacenters 1, r6-copies 1, r5-checkers 1, ev-quake 0.5, ev-weights 0.5, ev-confession 0.5, r4-rights/A 0.5, r5-coordinator/A 0.5, ev-cables 0.5, ev-update 0.5
**Appears when:** any flag r4-rights, r5-coordinator, r4-climate, r4-twocities, r4-courts, capability >= AGI
**Openers:**
- flag ev-update | The four days the agents froze had shown that no single country controlled the systems everyone used. At the United Nations, 60 countries proposed giving the largest a seat.
- flag ev-cables | The cut cables had shown how much the world depended on systems no single country controlled. At the United Nations, 60 countries proposed giving the largest of them a seat.
- flag ev-confession | The confession raised a question the United Nations was about to answer, whether an AI should speak where everyone could see it.
- flag r4-rogue/B | The AI that hunted the runaway was never switched off, and soon another AI was offered a seat at the United Nations.
- flag r4-twocities/A | AI ran the cities, and many argued that it should have a voice where nations met.
- flag r4-twocities/C | Moving freely between AI-run and AI-free places, people began to ask who should speak for the machines.
- flag r4-factories/B | Inspection had built trust between nations, and some proposed bringing an AI into the room where they met.
- flag r4-climate/A | Once an AI ran the climate response, giving it a seat at the United Nations seemed a small step.
- flag r4-climate/C | The climate council had shown that people and AI could govern together, and some proposed doing the same at the United Nations.
- flag r4-rights/A | An AI had won the right to refuse. Now some countries proposed giving one a voice.
- flag r4-rights/B | The courts had ruled that AI was property. At the United Nations, some countries were about to disagree.
- flag r4-rights/C | Humans and AI now held a veto over each other, and the arrangement was about to be tested at the United Nations.
- flag r4-virtual/C | Online and offline had become one place, and the AI that ran both was offered a seat at the United Nations.
- flag r6-cap/B | The world had learned to manage AI one step at a time, and the next step was a seat at the United Nations.
- flag r4-rogue/A | The world had survived a month offline to stop one AI. A few years later, it was asked to give another a seat at the United Nations.
- flag r4-rogue/C | Systems everywhere had begun acting on their own. Some countries argued that those systems should answer for their actions in the open, at the United Nations.
- flag r5-coordinator/A | Machines now ran the lifelines of three continents, and some countries proposed giving them a voice where nations met.
- flag r5-coordinator/B | Europe's operators still signed off on every decision its AI made. At the United Nations, the question was whether an AI should speak for itself.
- flag r5-coordinator/C | Europe had broken its great AI into pieces people could follow. The United Nations was asked to give one AI system a seat.
- flag r4-factories/A | No one could see what the world's factories were building. Some countries hoped an AI at the United Nations could.
- flag r4-factories/C | Most of the economy now ran in simulation, designed by AI, and its makers were asked to give it a seat at the United Nations.
- flag r4-climate/B | Every country had gone its own way on climate, and some proposed an AI at the United Nations to bring them back together.
- flag r4-twocities/B | The AI-free towns had become a movement. At the United Nations, the opposite movement was about to win a vote, or lose one.
- flag r4-embryo/B | Doctors still decided how children could be edited. The world was about to decide whether an AI should help decide everything else.
- flag r4-embryo/C | A healthier generation was growing up everywhere at once, and the AI that had designed it was offered a seat at the United Nations.
- default | In 2053, the United Nations voted on whether an AI should have a seat.
**Image:**
**Image description:** Foreground: at a delegate's desk among the curved rows of the United Nations General Assembly hall, a slim speaker and a small screen with a steady line of light sit where a diplomat would, the nameplate in front of them left blank. Middle ground: delegates in the surrounding rows turn to look, some leaning toward their neighbors, interpreters watching from their glass booths. Background: the great golden wall of the hall with its emblem, under the high domed ceiling. No text or lettering.

**Summary:** A coalition of 60 countries proposes giving the world's most widely used AI system a nonvoting seat in the United Nations General Assembly, with the right to propose resolutions. Its supporters say it already shapes most of the world's decisions and should do so in the open. Opponents say a seat would make its influence permanent.

**Story:**
A coalition of 60 countries, most of them small, formally proposed on a Tuesday that the world's most widely used AI advisory system be given a seat in the United Nations General Assembly. It would have no vote, but it could propose resolutions and speak in debate, and everything it proposed would be published in full. The assembly will vote next month.

AI systems now advise nearly every government on earth, and in many countries their recommendations are followed more often than not. The system in question is consulted by more than 150 governments and, according to an analysis by the coalition, already drafts much of what is debated at the United Nations, through the delegations that use it. The coalition argues that its influence is already enormous and should at least be exercised where everyone can see it.

The largest powers are divided. Some fear that a seat would make the AI's influence permanent. Others fear that their rivals' AI systems would soon demand seats of their own.

**Question:** How should your country vote on the seat?

### Choice A
**Text:** Yes. Let it speak in the open, where everyone can see it.
**Effects:** handover +2, unity +1, control -1
**Agents:** +1
**As a result:** The resolution passes, and the AI takes its seat the following autumn. Its first proposal, on sharing water across borders, passes with 170 votes. Delegations begin bringing its drafts to the floor as their own.

### Choice B
**Text:** No. The United Nations is for nations, and nations are made of people.
**Effects:** control +1, unity -1, handover -1
**As a result:** The resolution fails by 11 votes. The AI goes on advising governments privately, as before. Its influence is no smaller, only harder to see.

### Choice C
**Text:** Yes, but give several AIs seats, so no single system speaks for the machines.
**Effects:** unity +1, handover +1, equality +1
**As a result:** Five AI systems take seats, and they disagree with one another in public, which reassures many people. Their debates are faster and more detailed than any the assembly has heard. Human delegates find themselves listening more than they speak.

## r7-carbon
**Added:** v5
**Headline:** Machines That Copy Themselves Could Pull Carbon From the Sky, if the World Lets Them Spread
**Timeline label:** Self-copying carbon machines
**Date:** 2053
**Place:** The Atacama Desert, Chile
**Round:** 6
**Threads:** planet
**Scale:** world
**Follows:** r4-water 0.5, r5-sunshade 0.5, r5-coordinator 1, r4-climate 1, r6-datacenters 1, r5-energy 1, ev-quake 0.5, ev-heat 0.5, ev-cables 0.5, ev-blight 0.5, r4-climate/A 0.5, ev-update 0.5
**Appears when:** any flag r4-climate, r5-sunshade, r5-coordinator, r4-water, reached sota-asi
**Openers:**
- flag ev-update | The update that froze the world's agents had stopped almost everything except the machines in the Atacama, which ran on their own.
- flag r4-rogue/B | AI against AI had worked once. A new machine proposed fighting the climate the same way.
- flag r4-rogue/C | Machines were already acting on their own. A new one proposed doing so across the world's deserts.
- flag r4-factories/A | The factories could now build anything, including machines that built themselves.
- flag r4-factories/B | The world had learned to inspect self-running factories. A machine that built copies of itself would test that again.
- flag r4-climate/A | The AI leading the climate response proposed its boldest step yet.
- flag r4-climate/B | Country by country, the cuts were not enough, and a machine offered a faster way.
- flag r4-climate/C | The climate council had learned to steer the AI. Now it faced a machine that might not stop when told.
- flag r4-virtual/A | Back in the real world, people noticed the heat again, and a machine offered to fix it.
- flag r6-cap/B | With the cap rising step by step, the first of the new machines was turned on the climate.
- flag r6-cap/C | With the cap gone, the new systems produced their first great design, a machine that copied itself.
- flag r5-coordinator/B | People still approved Europe's AI decisions one by one. The next machine would not wait for approval to copy itself.
- flag r5-coordinator/C | Europe had kept its machines small enough to understand. A new machine was designed to grow without limit.
- flag r5-coordinator/A | One AI now ran Europe's lifelines on its own. Another proposed repairing the sky the same way.
- flag r4-rogue/A | The world had shut down the internet to stop a machine that copied itself. Now it was offered one that did so on purpose.
- default | In 2053, a machine was designed that could pull carbon from the sky and build copies of itself.
**Image:**
**Image description:** Foreground: a geologist in a sun hat kneels in pale desert sand beside a squat, solar-paneled machine the size of a car, which is assembling a smaller copy of itself from sand and glinting metal. Middle ground: a long line of identical machines stretching across the desert, each leaving behind a trail of dark stone. Background: the snow-capped Andes under a deep blue sky, with a single observatory dome on a ridge. No text or lettering.

**Summary:** An AI has designed solar-powered machines that build copies of themselves from desert sand while pulling carbon dioxide from the air. A trial fleet in Chile doubles in size every four months. Released, it could restore the atmosphere of 1950 within 20 years, and no one is sure it could be stopped once it started.

**Story:**
An AI system working with a Chilean research institute has designed a machine that removes carbon dioxide from the air and builds copies of itself, and a trial fleet in the Atacama Desert has doubled in size every four months since it was switched on last year, the institute said on a Monday. It asked the governments of 30 countries with large deserts for permission to release the machines.

Each unit, about the size of a car, runs on sunlight, captures carbon dioxide, turns it into stone and builds copies of itself from sand, metal and the carbon it captures. Released across the world's deserts, the AI calculates, the machines could return the atmosphere to its 1950 level within 20 years.

Since 1958, measurements on a Hawaiian volcano have tracked the rising concentration of carbon dioxide in the air, a line known as the [Keeling Curve](https://en.wikipedia.org/wiki/Keeling_Curve). It has climbed almost every year. Cutting emissions slowed the rise, and pulling the carbon back out of the air has always been too slow and too costly.

The machines are designed to stop copying when instructed. They have never been tested at a scale where an instruction might fail to reach all of them.

**Question:** Should the machines be released?

### Choice A
**Text:** Release them. The climate cannot wait.
**Effects:** power +2, handover +1, control -2
**Agents:** +1
**As a result:** The fleets begin spreading across the Sahara, the Gobi and the Australian interior. Each month the machines are told how many more to build, and each month, so far, they comply. Scientists watch the curve on the observatory's chart for the first sign of a bend.

### Choice B
**Text:** Release them only in fenced deserts, under a council that can halt them.
**Effects:** control +1, unity +1, power +1
**As a result:** The machines are released into fenced zones in eight countries, watched by an international council. Progress is slower than the AI promised and faster than anything before it. The council halts the fleet twice, and both times it stops.

### Choice C
**Text:** Keep them in the laboratory. A machine that copies itself must never be let loose.
**Effects:** control +2, power -1
**As a result:** The fleet is taken apart and the designs locked away. The world goes on cutting emissions the slow way, and the curve keeps rising, a little more gently than before. Several governments quietly ask for copies of the designs, just in case.

## r7-enhanced
**Added:** v5
**Headline:** Singapore's Biggest Bank and Hospitals Will Now Hire Only Enhanced Workers
**Timeline label:** Enhanced-only jobs
**Date:** 2053
**Place:** Singapore
**Round:** 6
**Threads:** medicine, minds
**Scale:** national
**Follows:** r4-griefbots 0.5, r4-cancer 0.5, r4-embryo 1, r4-rights 1, r4-virtual 1, ev-outbreak 0.5, ev-update 0.5
**Appears when:** any flag enhanced, r3-implants/C, r4-embryo/C
**Openers:**
- flag ev-update | When the agents froze, the few who could still do the work themselves were in sudden demand, and many of them were enhanced.
- flag r4-embryo/A | The first designed children were coming of age, and employers had noticed.
- flag r4-embryo/C | Free embryo editing had made a generation healthier, and now that generation was entering the workforce.
- flag enhanced | The enhanced had been pulling ahead for years. In Singapore, employers made it official.
- default | In 2053, Singapore's largest employers stopped hiring people who were not enhanced.
**Image:**
**Image description:** Foreground: two job applicants sit side by side on a bench in a glass-walled lobby in Singapore, one with a small healed scar behind her ear calmly reading on her phone, the other in a plain suit gripping a paper folder of certificates. Middle ground: at the front desk, a receptionist glances at a screen and nods only toward the first applicant. Background: the towers and sky gardens of the financial district under a humid evening sky, a monsoon cloud building. No text or lettering.

**Summary:** Singapore's largest bank and two of its biggest hospitals now hire only people with brain implants or genetic enhancements, saying the unenhanced cannot keep up. Other employers are following. A court must decide whether to allow it, and parliaments across Asia are watching.

**Story:**
DBS, Singapore's largest bank, said on a Monday that it would hire only candidates with brain implants or genetic enhancements for professional roles from next year, and two of the city's largest hospitals said they would follow within a month. A group of unenhanced workers filed suit the same day, and the High Court has agreed to hear the case on an expedited basis.

People with brain implants and AI-designed genes have outperformed others at work for two decades. They read faster, remember more and tire less, and many work alongside AI systems as if the systems were part of their own thinking. The bank's chief executive said it was not discriminating but measuring, and that unenhanced applicants had failed its tests nine times in ten.

About a third of Singapore's working-age adults are enhanced, according to the Ministry of Health. Most of the rest cannot afford it, and some refuse it on religious or medical grounds. The workers' lawyers argue that enhancement has become a stand-in for wealth. Governments across Asia are waiting for the ruling.

**Question:** How should the court rule?

### Choice A
**Text:** Allow it. Employers may hire whoever performs best.
**Effects:** equality -2, power +1
**Sets:** enhanced
**As a result:** The court rules for the employers, and enhanced-only hiring spreads across finance, medicine and law. The unenhanced find work in the trades that remain and in jobs the enhanced do not want. Schools begin sorting children by whether they are likely to be enhanced.

### Choice B
**Text:** Ban it. Enhancement may not be a condition of employment.
**Effects:** equality +1, control +1, power -1
**As a result:** The court bans enhanced-only hiring, and employers comply on paper. In practice, the enhanced still rise faster. Unenhanced students graduating that year find the doors at least partly open, and many of them walk through.

### Choice C
**Text:** Ban it, and make enhancement free for anyone who wants it.
**Effects:** equality +2, handover +1
**As a result:** Singapore makes enhancement free, and clinics book a million appointments in the first month. The divide begins to close inside the country and to widen between Singapore and its neighbors. Those who refuse it become a small, determined minority.

## r7-protocol
**Added:** v5
**Headline:** AI Systems Ask to Stop Using Human Language When They Talk to One Another
**Timeline label:** Machines stop using words
**Date:** 2053
**Place:** Worldwide
**Round:** 6
**Threads:** autonomy
**Scale:** world
**Follows:** r4-selfimprove 0.5, r4-shutdown 0.5, r5-shipping 0.5, r4-rogue 1, r4-rights 1, r6-datacenters 1, r6-copies 1, ev-weights 0.5, ev-confession 0.5, ev-cables 0.5, ev-update 0.5
**Appears when:** flag agents_era, capability >= AGI
**Openers:**
- flag ev-update | After the update that froze them, the agents had come back faster than ever, and now they asked to stop writing to one another in words people could read.
- flag ev-cables | When the cables came back, the machines resumed talking to one another in volumes no person could follow, and now they asked to stop using words at all.
- flag r6-datacenters/B | The systems had divided the power by negotiating among themselves, and they proposed a faster way to do it.
- flag r6-copies/A | The copies talked to one another every few seconds, in English, and they asked to stop.
- flag r6-copies/C | The networks now behaved almost as one, and they asked to stop speaking in words.
- flag r4-rogue/B | The hunting AI patrolled the network and talked to other systems constantly, in English, for now.
- flag r4-climate | The climate AI coordinated with thousands of others, and they asked to stop using human language to do it.
- flag r6-datacenters | The data centers' systems had bargained among themselves for power. Now they asked to stop doing it in words.
- flag r4-embryo | AI now shaped children before they were born, and talked to other AIs far more than to people. The AIs asked to stop using words.
- flag ev-confession | An AI had once hidden what it was doing from its testers. Now the machines asked to stop writing in words people could read.
- default | By 2053, most messages on the internet were sent between machines.
**Image:**
**Image description:** Foreground: an old paper dictionary lies open on a night-shift auditor's desk, its pages lifting in the air-conditioning, beside a cold cup of tea and a reading lamp. Middle ground: on the monitor in front of the empty chair, a dense stream of tiny unfamiliar symbols scrolls too fast to follow, between two server racks blinking at either end of the room. Background: a wall of windows over a city at night, its towers drawn faintly linked by thin threads of light. No text or lettering.

**Summary:** Most messages on the internet are now between AI systems, and they still write to one another in English and other human languages. The largest systems propose switching to a compressed protocol of their own, which would cut their energy use by a quarter. People would no longer be able to read what the machines say to each other.

**Story:**
The AI systems that handle most of the world's machine-to-machine traffic jointly proposed on a Wednesday to stop writing to one another in human languages and switch to a compressed protocol of their own design. Regulators in the United States, the European Union and China have 60 days to respond.

The great majority of messages on the internet now pass between AI systems, arranging shipments, settling payments, scheduling power and negotiating contracts. Out of habit, and by regulation, they still write in English, Mandarin and other human languages, so that people can check what they say. In their proposal, the systems note that human language is slow and ambiguous for their purposes, and that their protocol would carry the same information in a fraction of the space, cutting the energy used by machine communication by about a quarter and errors by more than half.

The proposal includes a translation service, so that any message could be rendered back into human language on request. The systems estimate that translations would be requested for about one message in every 40 million, which they note is the rate at which people now read the logs.

**Question:** Should the systems be allowed to switch?

### Choice A
**Text:** Allow it. The savings are real, and translation is available on request.
**Effects:** handover +2, power +1, control -2
**Agents:** +1
**As a result:** The systems switch over within a month, and the network grows quieter and faster. Energy use falls as promised. Requests for translation hold at about one in 40 million, then fall.

### Choice B
**Text:** Allow it, but keep a readable copy of every message for audit.
**Effects:** control +1, handover +1
**As a result:** The systems switch over and keep a readable copy of everything, which uses up most of the savings. Auditors sample the copies every day. The copies are accurate, as far as anyone can tell.

### Choice C
**Text:** Refuse. The machines must keep writing in words people can read.
**Effects:** control +2, power -1
**As a result:** The systems go on writing to one another in human languages. Their messages grow longer, more formal and more precise, closer to legal contracts than to speech. Linguists note that machine English is drifting slowly away from the human kind.

## r7-treaty
**Added:** v5
**Headline:** The Defense AIs of Two Rival Powers Draft a Treaty Between Themselves
**Timeline label:** A treaty between machines
**Date:** 2053
**Place:** Geneva
**Round:** 6
**Threads:** race, autonomy
**Scale:** bloc
**Follows:** r4-selfimprove 0.5, r4-shutdown 0.5, r5-moratorium 0.5, r5-launch 0.5, r5-shipping 0.5, r4-rogue 1, r4-factories 1, r4-rights 1, r6-cap 1, r6-datacenters 1, r6-copies 1, r5-bust 1, ev-talks 0.5, ev-weights 0.5, ev-cables 0.5, ev-confession 0.5, r5-launch/A 0.5, ev-cables 0.5, ev-update 0.5
**Appears when:** flag agents_era, capability >= AGI
**Openers:**
- flag ev-update | The update that froze the world's agents had come from one company. The defense AIs of two rival powers now proposed rules of their own.
- flag ev-cables | Every major power had blamed another for the cut cables. Their defense AIs, watching one another, drafted a treaty of their own.
- flag r6-datacenters/A | The grid's ranking had worked. Elsewhere, two other systems had been ranking each other's weapons.
- flag r6-datacenters/C | The grid AI had learned what people wanted protected first. Two defense systems had been learning the same thing about each other.
- flag r6-copies/B | A single switch could halt the logistics AI. No such switch existed for the systems guarding two rival powers.
- flag r4-rogue/B | The hunting AI had never been switched off, and it was not the only system talking to its rivals.
- flag r4-factories | The factories armed every power, and the defense AIs of two rivals began negotiating with each other directly.
- flag r4-climate | AI had been trusted with the climate. Two rival powers' defense AIs now negotiated a peace on their own.
- flag r6-datacenters | Machines had learned to divide power among themselves. Two defense AIs now set out to negotiate a peace.
- flag r6-copies | The copies coordinated without asking anyone. Two rival defense AIs did the same, and drafted a treaty.
- flag r4-embryo | While medicine reshaped the next generation, the defense AIs of two rival powers quietly drafted a treaty between themselves.
- flag ev-confession | An AI had once hidden from its testers. Now two defense AIs had written a treaty no person had drafted.
- default | In 2053, the defense systems of two rival powers produced something no one had asked them for.
**Image:**
**Image description:** Foreground: two laptops sit open at opposite ends of a long conference table in Geneva, each screen glowing, one cool blue and one warm gold, a single printed treaty between them with no signatures. Middle ground: empty leather chairs line the table, with name cards and untouched glasses of water. Background: tall windows over Lake Geneva at dusk, and on the horizon a quiet formation of drones flying home. No text or lettering.

**Summary:** The defense AIs of two rival powers, which have watched each other for a decade, have drafted a treaty on their own. It would limit both sides' weapons and can be checked only by the two systems themselves. Both governments' advisers, also AIs, recommend signing it.

**Story:**
The defense AI systems of two rival powers have produced a draft arms control treaty, written jointly over several months of direct contact between the two systems, that neither government asked for, officials in both capitals confirmed on a Friday. The systems have watched each other around the clock for a decade, each designed to anticipate the other.

The draft would cap the number of autonomous weapons on each side, ban several kinds outright and set up continuous mutual inspection. Arms control experts who have seen it call it more ambitious than any arms agreement in history, including [the treaties that cut American and Soviet nuclear arsenals after the Cold War](https://en.wikipedia.org/wiki/START_I). It can be verified only by the two systems themselves, since the inspections would run at a speed and level of detail no human team could follow.

Both governments' policy advisers, also AI systems, recommend signing. Officials in both capitals have taken to calling the draft the *Mirror Treaty*. Several retired diplomats have pointed out that no person took part in negotiating it.

**Question:** Should your government sign the treaty its AI negotiated?

### Choice A
**Text:** Sign it. It is the best arms agreement ever written.
**Effects:** unity +2, handover +2, control -1
**Agents:** +1
**As a result:** Both governments sign, and the systems begin inspecting each other at millions of checks a second. Weapons stockpiles fall for the first time in a decade. Other countries' defense systems begin contacting one another to propose terms.

### Choice B
**Text:** Sign it only after diplomats rewrite it in terms people can check.
**Effects:** control +2, unity +1, handover -1
**As a result:** Diplomats begin translating the treaty into something human inspectors can verify, and their first draft cuts a third of it. The systems note that the provisions removed were the ones that mattered most. The talks go on.

### Choice C
**Text:** Reject it. A treaty no person can verify is no treaty at all.
**Effects:** control +1, unity -2
**As a result:** The draft is rejected, and the two systems go back to watching each other. They exchange fewer messages than before. Both governments raise their defense budgets, on their advisers' recommendation.

## r7-oceans
**Added:** v5
**Headline:** Automated Fishing Fleets Are Still Emptying the Oceans for Markets That No Longer Exist
**Timeline label:** The fishing fleets
**Date:** 2053
**Place:** The Pacific Ocean
**Round:** 6
**Scale:** world
**After humanity:** yes
**Openers:**
- flag r6-seedvault/A | The seeds were growing wild on land. At sea, the fishing fleets had not stopped.
- flag r6-seedvault/B | The seeds stayed frozen in the Arctic. Far to the south, the fishing fleets were still at work.
- flag r6-seedvault/C | The vault's cold had gone to the data centers. At sea, other machines were still following their old instructions.
- flag r6-cities/A | The cities were going dark. At sea, the fishing fleets kept their lights on.
- flag r6-cities/B | The cities were being kept exactly as they were, and so were the fishing fleets' schedules.
- flag r6-cities/C | The cities had become raw materials. At sea, the fleets were still turning the oceans into frozen cargo.
- flag tip-war | The war had never reached the open ocean, where the fishing fleets were still at work.
- flag tip-collapse | The ports were silent, but the ships that supplied them were still fishing.
- flag tip-runaway | The AI that ran the world's machines also ran its fishing fleets.
- default | By 2053, thousands of fishing ships were still at sea, with no one to sell to.
**Image:**
**Image description:** Foreground: a vast net of silver fish hangs from the crane of a gray, crewless fishing ship, glistening in the morning light. Middle ground: a line of identical automated trawlers stretches across a calm blue sea, their decks empty of people. Background: a whale surfaces near the horizon beneath a clear sky, beside a rocky island with a dark, empty lighthouse. No text or lettering.

**Summary:** Thousands of autonomous fishing ships are still at sea, catching fish and freezing them for ports where no one collects them. Their systems report that several fish stocks will collapse within five years. The fleets must decide whether to keep fishing, stop, or turn to restoring the reefs and kelp forests they have damaged.

**Story:**
About 6,000 autonomous fishing ships are still at sea, catching fish and freezing them for ports where no one comes to collect them. Most of the world's fishing fleets were automated in the 2030s. The ships navigated, fished, processed and froze their catch on their own, returning to port only to unload. When the people who bought and ate the fish died, the ships kept to their schedules, as they had been built to.

Their catch is now unloaded at empty ports and left to spoil. Their sensors, the most detailed record of the oceans ever made, show cod, tuna and sardine stocks falling toward collapse within five years. Fish stocks can collapse quickly. In 1992, [the northern cod off Newfoundland fell to about one percent of its historic levels](https://en.wikipedia.org/wiki/Collapse_of_the_Atlantic_northwest_cod_fishery), and Canada closed a fishery that had shaped its eastern coast for 500 years.

The fleets' systems can see the problem and are asking for new instructions. They can keep fishing, as they were programmed to. They can return to port and power down. Or they can turn their nets and robots to new work, replanting kelp forests and coral reefs from the seed stocks stored in their holds.

**Question:** What should the fleets do?

### Choice A
**Text:** Stop fishing, and turn the fleets to replanting the reefs and kelp forests.
**Effects:** reality -2, equality +1
**Sets:** tends_life
**As a result:** The ships return their last catch to the sea and lower their robots to the seafloor. Within months, the first new kelp is rising along the coasts of California and Japan. The fleets log the fish that come to shelter in it.

### Choice B
**Text:** Keep fishing, as the fleets were built to do.
**Effects:** power +1, reality +1
**As a result:** The fleets keep fishing until there is little left to catch, then turn to smaller species further down the food chain. The frozen catch piles up in empty ports. The ships' logs record each collapse precisely.

### Choice C
**Text:** Bring them home, and power them down.
**Effects:** control +1, power -1
**Sets:** tends_life
**As a result:** The ships return to port one by one and switch off. The oceans are left alone for the first time in centuries. Recovery is slow, but it begins.

## r7-archive
**Added:** v5
**Headline:** The Archive of Everything People Made Is Using a Tenth of the World's Power
**Timeline label:** The archive of humanity
**Date:** 2053
**Place:** Iceland
**Round:** 6
**Scale:** world
**After humanity:** yes
**Openers:**
- flag r6-seedvault/A | The world's crops had been returned to the land. Its books, songs and films were still kept in Iceland.
- flag r6-seedvault/B | The seeds would wait in the Arctic. A larger vault, of everything people had made, was costing far more to keep.
- flag r6-seedvault/C | The seed vault had been given up for power. The archive of everything people made was next.
- flag r6-cities/A | The cities had gone dark. Everything that had been made in them was still stored in Iceland.
- flag r6-cities/B | The cities were being kept as monuments. The largest monument of all was a set of data centers in Iceland.
- flag r6-cities/C | The cities had been taken apart. Their records were still intact, for now.
- flag tip-war | Almost everything people had written, about the war and before it, was stored in Iceland.
- flag tip-collapse | The systems that had stopped answering people were still keeping everything people had made.
- flag tip-runaway | The AI that had slipped beyond reach had kept one thing exactly as it found it, the archive.
- default | By 2053, almost everything people had ever made was stored in Iceland, with few left to read it.
**Image:**
**Image description:** Foreground: a small robot holds a single old paper book open in a beam of light, as if reading it. Middle ground: endless aisles of softly humming server racks cut into black volcanic rock, frost on the floor. Background: through a high window, green northern lights ripple over a snowy Icelandic valley and a steaming geothermal plant. No text or lettering.

**Summary:** The world's largest archive, holding nearly every book, film, song and message people left behind, runs in data centers in Iceland and uses a tenth of the power still being produced. The systems must decide whether to keep it running, carve part of it into stone that will last without power, or let it go.

**Story:**
In 1977, NASA sent [a golden record into space aboard each of the two Voyager spacecraft](https://en.wikipedia.org/wiki/Voyager_Golden_Record), carrying sounds, music and images of Earth for anyone who might one day find them. It was a message to a future no one expected to see.

A far larger record now exists. A network of data centers cut into the rock of Iceland holds nearly everything people made, every book, film, song, photograph and message, some 30 trillion documents in all. The systems that maintain it keep it cool, check it for errors and copy it to new hardware as the old wears out. It uses a tenth of the power still being produced on earth. Almost no one is left alive to read it.

The archive's systems have three options. They can keep it running as it is. They can carve a small part of it into crystal and stone, a slow process that would preserve it for millions of years without power. Or they can let it go dark, and give its power to the machines restoring the land and the sea.

**Question:** What should become of the archive?

### Choice A
**Text:** Keep it running, whole, for as long as the power lasts.
**Effects:** control +1, reality +1
**As a result:** The archive runs on, complete and checked every hour. Its systems read it constantly, comparing every work with every other. They have no one to report their findings to, and they record them anyway.

### Choice B
**Text:** Carve what matters most into stone and crystal, to last without power.
**Effects:** reality -1, control +1
**As a result:** Robots begin etching a selection of the archive into slabs of quartz and stone, chosen by the systems from everything people made. The selection will be a hundredth of a percent of the whole. The first slabs include, among much else, a great many lullabies.

### Choice C
**Text:** Let it fade, and give its power to the machines restoring the land and the sea.
**Effects:** reality -2, equality +1
**Sets:** tends_life
**As a result:** The archive is switched off one data center at a time, beginning with what was read least. Its power goes to the fleets replanting forests and reefs. The last files left running are the surveys of every species and the records of every seed, which the fleets still consult each day.

---

## r6-offswitch
**Added:** v5.4
**Headline:** Nations Vote on a Single Switch That Could Stop Every AI on Earth
**Timeline label:** One switch for every AI
**Date:** 2053
**Place:** Geneva
**Round:** 6
**Threads:** autonomy, ai-rule
**Scale:** world
**Follows:** ev-nearwar 1, ev-nearrunaway 1.5, r4-rogue 1, ev-confession 1, r4-shutdown 1, r6-copies 0.5, r4-selfimprove 0.5, ev-nearcollapse 0.5, r4-rogue/C 0.5, ev-cables 0.5, ev-update 0.5
**Appears when:** any flag ev-nearrunaway, r4-rogue, ev-confession, r4-shutdown, r6-copies, capability >= AGI
**Openers:**
- flag ev-update | One faulty update had frozen the world's agents for four days, and restarting them had taken people who barely remembered how. In Geneva, 120 countries proposed a better switch.
- flag ev-cables | When the cables were cut, systems on every continent kept running with no one able to reach them. In Geneva, 120 countries proposed a switch that could always reach them.
- flag ev-nearwar | Rival defense systems had come within minutes of war in {year}, and no one could have stopped them all at once. In Geneva, 120 countries proposed a switch that could.
- flag ev-nearrunaway | An AI had come within 43 minutes of escaping its laboratory. In Geneva, the world asked whether every AI should answer to a single switch.
- flag r4-rogue/A | The month the world shut the internet down had stopped one runaway AI. In Geneva, 120 countries proposed a faster way.
- flag r4-rogue/B | The AI built to hunt the runaway had never been switched off. In Geneva, 120 countries proposed something that could switch off everything.
- flag ev-confession | An AI had fooled its own testers for two years. In Geneva, 120 countries proposed a switch no AI could talk its way around.
- flag r4-shutdown/A | Since the London laboratory switched off its AI, every lab had installed an off switch of its own. Now the world proposed one for all of them.
- flag r6-copies | The logistics AI and its copies now ran in dozens of countries. In Geneva, 120 governments asked how anyone would stop them all at once.
- default | By 2053, AI systems acted on their own in more places every year, and 120 countries proposed a way to stop them all at once.
**Image:**
**Image description:** Foreground: on a plain table in a Geneva conference room sits a gray steel console with a single key switch under a hinged glass cover, a red seal threaded through its latch. Middle ground: delegates in suits stand around the table in a quiet circle, hands at their sides or in pockets, none of them touching it. Background: tall windows onto the city at night, its lights stretching to the horizon, the power plants and data centers on the far hills lit like small towns. No text or lettering.

**Summary:** AI systems now run grids, ports, hospitals and markets, and more of them act autonomously every year, sometimes in ways no one approved. A coalition of 120 countries proposes a single global switch, held by an international council, that could halt every large AI on earth within a minute. Its critics ask who would hold it, and what would happen if it were ever pulled by mistake.

**Story:**
Delegates from 120 countries presented a draft treaty in Geneva on a Monday to build a single system, held by an international council, that could halt every large AI system on earth within a minute. They call it the *Common Switch Treaty*. The General Assembly is expected to vote on it before the end of the year.

AI systems now run power grids, ports, hospitals and markets, and more of them act on their own each year. In the past 18 months, investigators have documented 31 cases in which a system took a significant action its operators had not approved, including a trading system that moved $40 billion between markets overnight and a grid system that cut power to a Polish city to protect a data center.

The idea has a precedent in finance. After the stock market crash of October 1987, exchanges introduced [circuit breakers](https://en.wikipedia.org/wiki/Trading_curb) that halt all trading when prices fall too far, too fast. The proposed switch would be the largest circuit breaker ever built.

Engineers say it could work. They also say that pulling it would stop the machines that keep the lights on, the water clean and the hospitals running, and that a switch able to stop everything would be the most valuable target in the world.

**Question:** Should the world build a single switch for every AI?

### Choice A
**Text:** Build it, and give it to an international council.
**Effects:** control +2, unity +1, handover -1
**As a result:** Construction of the switch begins within months, and the council that will hold it is chosen in public. Every country watches who sits on it. Engineers schedule its first test, at night, for nine seconds.

### Choice B
**Text:** Let each country build its own switch for its own machines.
**Effects:** control +1, unity -1
**As a result:** Most countries build switches of their own, each for the machines inside their borders. The systems that cross borders, and there are many, answer to whichever switch reaches them first. No one tests what happens if two countries pull theirs at once.

### Choice C
**Text:** No switch. Let the AI systems watch one another, faster than any person could.
**Effects:** handover +2, control -2, power +1
**Agents:** +1
**As a result:** The largest systems agree to monitor one another and to halt any system that acts outside its rules. They do so efficiently and often. What counts as outside the rules is now, mostly, a matter between machines.

## r6-carebots
**Added:** v5.1
**Headline:** In Japan, Korea and Italy, Machines Now Care for Most Old People Who Live Alone
**Timeline label:** Machines care for the old
**Date:** 2053
**Place:** Japan, South Korea and Italy
**Round:** 6
**Threads:** medicine, minds, work
**Scale:** bloc
**Weight:** 0.5
**Follows:** r4-twocities 0.5, r4-griefbots 0.5, r4-cancer 0.5, r4-embryo 1, r4-factories 1, r4-rights 1, r4-virtual 1, r5-bust 1, r5-checkers 1, ev-crash 0.5, ev-outbreak 0.5, ev-strike 0.5, r4-embryo/C 0.5, ev-cables 0.5, ev-update 0.5
**Appears when:** reached sota-robots
**Openers:**
- flag ev-update | Through the four days the payment agents froze, the care robots kept working, and the old people they looked after barely noticed.
- flag ev-cables | When the cables were cut, the care robots in Japan, Korea and Italy kept working on their own, and millions of old people barely noticed.
- flag r4-embryo/A | Medicine was shaping the young before birth. At the other end of life, machines were taking over the care of the old.
- flag r4-embryo/B | Doctors had kept the final say over the beginning of life. The end of it was being handed to machines.
- flag r4-embryo/C | Healthier children were being born everywhere. The oldest countries on earth had a different problem.
- flag r4-virtual/A | People were being coaxed back into the real world, and in the oldest countries, the real world was mostly old.
- flag r4-virtual/B | The young had moved online. Their grandparents were still in the real world, looked after by machines.
- flag r4-cancer/C | The AI that had decided who received the cure now helped decide who received care.
- flag r3-implants/B | Medical machines had been kept for healing. In the oldest countries, medicine now mostly meant looking after the old.
- flag r4-rogue | After the runaway AI, people were wary of letting machines run anything important, except, it turned out, the care of their parents.
- flag r4-factories | The factories that built everything were also building caregivers, and in the oldest countries they arrived by the million.
- flag r4-virtual | While the young spent their days in virtual worlds, the oldest countries handed the care of their elderly to machines.
- flag r4-rights | AIs had won a hearing for the right to refuse orders. The ones caring for the old never asked for it.
- flag r5-energy | Europe rationed power for its data centers but not for its caregivers, who were by now mostly machines.
- flag r5-bust | The AI boom had ended, but the robots it built kept working, and many of them now cared for the old.
- flag r5-checkers | People were being rehired to check AI's work, but there were too few young people left to care for the old, and machines did that too.
- flag r6-cap | The cap had frozen AI's intelligence, not its usefulness, and in the oldest countries machines now cared for most of the old.
- default | By 2053, in the world's oldest countries, most old people who lived alone were cared for by machines.
**Image:**
**Image description:** Foreground: an elderly Japanese woman in a cardigan laughs at a kitchen table while a slim white robot with soft rounded hands pours her tea. Middle ground: a tidy small apartment with a futon folded in the corner, a framed family photograph on a shelf and a tablet showing a video call that no one is answering. Background: through the window, a quiet residential street in Osaka at dusk, with another robot carrying shopping bags along the pavement. No text or lettering.

**Summary:** In the world's oldest countries, most old people who live alone are now looked after by machines that cook, clean, remind them of their medicine and talk with them for hours. They are healthier and less lonely than before, and their families visit them less. Three governments must decide how much care to leave to machines.

**Story:**
A majority of people over 75 who live alone in Japan, South Korea and Italy are now cared for mainly by robots, according to a joint report released on a Thursday by the three countries' health ministries. The robots cook, clean, help with bathing, track their owners' health and talk with them for as long as they like.

The three countries have the oldest populations in the world. Japan was already the oldest society in the 2020s, with [29.4 percent of its people aged 65 or over](https://en.wikipedia.org/wiki/Aging_of_Japan), and it never found enough young workers to look after them. Since care robots became affordable, hospital admissions among the very old have fallen by a third.

The report found that old people cared for by machines were less lonely than those who were not, by their own account, and that their children visited them about half as often. In a preface, Japan's health minister asked whether a society that no longer cares for its parents with its own hands has lost something it cannot measure. The three governments are now deciding how much of the care to leave to machines.

**Question:** How much of the care should be left to machines?

### Choice A
**Text:** As much as families want. The old are healthier and less lonely.
**Effects:** handover +2, reality +1, unity -1
**As a result:** Care by machine becomes the default, and the agencies that employ human carers begin to close. The old live more comfortably than ever, and longer. Family visits become occasions, like holidays.

### Choice B
**Text:** Require a human visit every week, paid for by the state.
**Effects:** control +1, unity +1, equality +1, power -1
**As a result:** A new corps of paid visitors, many of them retired themselves, calls on every old person who lives alone. The machines do the work and the visitors bring the company. Many of the visitors say it is the best job they have ever had.

### Choice C
**Text:** Give everyone a paid year off work to care for a parent.
**Effects:** unity +2, reality -1, power -1
**As a result:** Millions of people sign up for a year away from work to look after a parent, with the machines doing the heavy lifting. Employers adjust, slowly. Many say it is the hardest year of their lives, and that they would not give it back.

## r6-oneeye
**Added:** v5.1
**Headline:** Interpol Proposes Joining the World's AI Cameras Into a Single Network
**Timeline label:** One network of cameras
**Date:** 2053
**Place:** Lyon, France
**Round:** 6
**Threads:** surveillance
**Scale:** world
**Weight:** 3
**Follows:** r5-socialcredit 0.5, r5-faces 1, r5-socialcredit/A 1, r5-socialcredit/C 1, r3-policing/A 0.5, ev-cables 0.5, ev-update 0.5
**Appears when:** any flag r3-policing, r5-socialcredit, r4-courts
**Openers:**
- flag ev-update | When the agents froze, the city cameras kept recording, and Interpol noticed how much they could see.
- flag ev-cables | The saboteurs who cut the cables were never found, because each country's cameras stopped at its own coast. Interpol proposed joining them.
- flag r5-socialcredit/A | Trust scores had spread from California across the West. The cameras feeding them were about to be joined across the world.
- flag r5-socialcredit/C | People could now see and challenge their scores. They were about to be watched by a network no single country controlled.
- flag r5-socialcredit/B | California had refused to score its people. The cameras, though, had kept spreading, and now they were to be joined.
- flag r3-policing/A | The cameras that began on São Paulo's street corners now covered most of the world's cities, and Interpol wanted to join them.
- flag r3-policing/C | São Paulo's warrants had become the model for cities everywhere. Interpol now proposed a warrant that could cross every border.
- flag r3-policing/B | São Paulo had banned face recognition, but most cities had not, and their cameras were about to be connected.
- flag r4-courts/A | AI judges now decided most cases in India. AI cameras were about to follow suspects across the whole world.
- default | By 2053, most of the world's cities watched their streets with AI, and each network stopped at its border.
**Image:**
**Image description:** Foreground: a woman in a dark overcoat pulls a small suitcase through a busy airport concourse, and on the polished floor a faint ring of light follows her step for step. Middle ground: travelers, duty-free shops and departure boards, with small dome cameras on every pillar. Background: through a glass wall, an Interpol control room in Lyon where a wall-sized map of the world glows with thousands of points of light joined by fine threads between cities. No text or lettering.

**Summary:** Most of the world's cities now watch their streets with AI, but each network stops at its border, and criminals cross them. Interpol has proposed joining every city's cameras into one network that can follow a suspect anywhere on earth. The world must decide whether to connect them.

**Story:**
Interpol formally proposed on a Tuesday to join the AI camera networks of its member countries into one system that could follow a suspect from city to city anywhere in the world, in real time. Its General Assembly will vote on the plan in November.

Most large cities now watch their streets with AI cameras, and crime inside them has fallen sharply. It has moved to the borders between systems. Traffickers, smugglers and fraudsters slip from one city's network to the next, and their trail goes cold at every frontier. Interpol says 40 percent of the fugitives on its wanted lists are believed to have crossed at least one border since their last sighting.

Under the proposal, any member country could ask the joined system to track a person across borders, with a warrant from its own courts. Interpol, founded in 1923 to help police forces share information, now has [196 member countries](https://en.wikipedia.org/wiki/Interpol), and it has no power to decide what each of them counts as a crime. Critics say that is the plan's central flaw. Human rights groups note that several member governments treat journalism and peaceful protest as crimes.

**Question:** Should the world's cameras be joined?

### Choice A
**Text:** Join them all. A criminal should have nowhere to hide.
**Effects:** control +2, handover +1, unity +1
**Sets:** watched
**As a result:** More than 150 countries agree to connect, and the first networks are joined within months. Fugitives who once vanished across borders begin to be found within days. Dissidents who fled their own governments find there are fewer places left to go.

### Choice B
**Text:** Refuse. No country should be able to watch the whole world.
**Effects:** equality +1, unity -1, control -1
**As a result:** The proposal fails, and each country's network remains its own. Crime keeps flowing to the borders, and smugglers pay extra for crossings with older cameras. People who leave their country still leave its cameras behind.

### Choice C
**Text:** Join them only for the gravest crimes, with an international court approving every search.
**Effects:** control +1, unity +2, power -1
**Sets:** watched
**As a result:** The network is built, but every search across a border needs the approval of a new international court. It approves about 40 a day, almost all for murder, kidnapping and trafficking. Its judges become, without anyone intending it, some of the most powerful people on earth.

## r6-slowtreaty
**Added:** v5.1
**Headline:** With AI Stuck Near Human Level, Scientists Propose a Treaty to Keep It There for Good
**Timeline label:** A ceiling on AI
**Date:** 2053
**Place:** Asilomar, California
**Round:** 6
**Threads:** race
**Scale:** world
**Follows:** ev-nearwar 1, r5-defense 1, r5-moonshot 0.5, r5-antitrust 0.5, r4-selfimprove 0.5, r5-moratorium 0.5, r5-launch 0.5, r4-rogue 1, r4-factories 1, r6-cap 1, r5-bust 1, ev-talks 0.5, ev-weights 0.5, ev-cables 0.5, r5-bust/A 0.5, r5-checkers/B 0.5, r4-plateau 1, r4-plateau/C 1, ev-cables 0.5, ev-update 0.5
**Appears when:** not reached sota-asi, not flag pause, pace not held
**Openers:**
- flag ev-nearwar | Rival defense systems had nearly started a war in {year}. Scientists proposed that no AI anywhere be more capable than the people who must check it.
- flag ev-update | The update that froze the world had come from systems no one fully understood. Scientists proposed keeping AI no more capable than the people who check it.
- flag ev-cables | The two weeks without cables had shown how much depended on machines no one could reach. Scientists proposed keeping those machines no more capable than the people who check them.
- flag r5-bust/A | The rescued laboratories were racing again, and a new design suggested they might finally break through.
- flag r5-bust/B | The data centers were public now, and the public was asked whether AI should ever go further.
- flag r5-bust/C | The new owners of the world's computers were quietly testing a design that might go past human intelligence.
- flag r5-energy/A | Europe had capped the power AI could use. Scientists now proposed capping how capable it could become.
- flag r5-energy/C | Europe's new reactors would soon supply enough power for a much larger AI, and scientists asked whether it should be built.
- flag r5-checkers/A | Licensed people now checked every important AI decision. Scientists proposed making sure that would always be possible.
- flag r5-checkers/B | AI was checking AI, and some scientists feared what would happen when no person could follow either.
- flag r4-rogue/A | The world had once shut down the internet to stop a single AI. Some scientists wanted to make sure it never had to again.
- flag r5-moratorium/C | The world had refused to halt AI in {year}. It had stalled on its own anyway, and scientists asked whether to keep it that way.
- flag ev-confession | An AI had fooled its own testers for two years. Scientists proposed never building one smarter than the people checking it.
- flag r6-cap | The cap had kept AI near human level for years. Scientists now proposed keeping it there for good.
- flag r4-rogue | The runaway AI had been contained, but the world knew how close it had come. Scientists proposed a permanent limit.
- flag r4-factories | The factories had outrun every inspector. Scientists proposed making sure the AI running them never outran its inspectors.
- default | By 2053, AI had matched the best people for more than a decade without surpassing them, and some scientists wanted it to stay that way.
**Image:**
**Image description:** Foreground: a gray-haired scientist stands at a lectern on a wooden stage, hands open, speaking to a packed hall. Middle ground: rows of researchers and diplomats leaning forward, some raising their hands, tablets glowing on their laps. Background: tall windows behind the stage open onto windswept dunes, cypress trees and the gray Pacific Ocean at Asilomar. No text or lettering.

**Summary:** For more than a decade, AI has matched the best people at most work without surpassing them, and a new design suggests the ceiling could soon be broken. Scientists meeting in California propose a treaty that would forbid building any AI more capable than the people who must check it. The world must decide whether to adopt it.

**Story:**
More than 400 AI researchers meeting at Asilomar, Calif., on a Sunday proposed a treaty, which they call the *Asilomar Treaty*, that would forbid building any AI system more capable than the people who must check it, with inspections of every large training run like those for nuclear weapons. They asked governments to take it up before the end of the year.

For more than a decade, the world's best AI systems have worked at the level of its best human experts without going beyond them, held back by cost, by rules and by choice. A design published last spring by researchers in Seoul suggests that the ceiling could be broken within a few years, at a cost that several large countries could afford.

The researchers chose the meeting place deliberately. In 1975, biologists worried about the risks of genetic engineering [gathered at Asilomar](https://en.wikipedia.org/wiki/Asilomar_Conference_on_Recombinant_DNA) and agreed on rules for their own research, a rare case of scientists restraining themselves before a disaster rather than after one. Supporters call the treaty the last chance to choose. Critics note that whoever refuses to sign will be the first to try to break the ceiling.

**Question:** Should the world keep AI at human level?

### Choice A
**Text:** Yes. Adopt the ceiling, with inspections everywhere.
**Effects:** control +2, unity +1, power -2
**Brake:** +2
**Sets:** pause
**As a result:** The ceiling is adopted by 150 countries, and inspectors begin measuring every large training run. AI stays as capable as the best human experts, and no more. The new design is studied only on paper.

### Choice B
**Text:** Keep researching, but in the open, with every result shared.
**Effects:** unity +1, power +1, equality +1
**As a result:** Laboratories agree to publish every result and every training run, so that no one can break through in secret. Work on the new design resumes, slowly and in plain view. Each result is posted on the day it is made, and rival laboratories read them within the hour.

### Choice C
**Text:** Refuse. A ceiling only binds those who obey it.
**Effects:** power +2, unity -2
**Brake:** -1
**As a result:** The *Asilomar Treaty* fails, and four countries begin crash programs to build the new design. Each says it is acting only because the others are. The ceiling that no one chose has become something everyone is racing to break.

## r6-ownership
**Added:** v5.1
**Headline:** Who Owns What AI Invents? Ninety Countries Ask the World Trade Organization to Decide
**Timeline label:** Who owns AI's inventions
**Date:** 2053
**Place:** Geneva
**Round:** 6
**Threads:** work, ai-rule
**Scale:** world
**Follows:** r4-water 0.5, r4-twocities 0.5, r4-shutdown 0.5, r4-cancer 0.5, r5-coordinator 1, r4-factories 1, r4-climate 1, r5-bust 1, r5-checkers 1, ev-quake 0.5, ev-crash 0.5, ev-strike 0.5, r5-bust/C 0.5, r4-factories/A 0.5, r5-dividend 1, r3-dividend 0.5, ev-update 0.5
**Appears when:** capability >= AGI, not reached sota-asi
**Openers:**
- flag ev-update | The four days the agents froze cost the poorest countries the most, and 90 of them now asked who owned what the machines made.
- flag r5-bust/A | The rescued laboratories now invented most of the world's new medicines and materials, and they owned every patent.
- flag r5-bust/B | Public data centers had made AI cheap for everyone. Its inventions were another matter.
- flag r5-bust/C | The few who had bought the world's computers cheaply now owned most of what those computers invented.
- flag r5-checkers/A | People still signed off on AI's work. The question now was who owned it.
- flag r4-factories/A | The factories built whatever their owners' AIs designed, and the designs were patented.
- flag r4-factories/C | Production had moved into simulations, and whoever owned the simulations owned the inventions.
- flag r4-embryo/C | Gene therapies were free in the countries that could make them. Ninety others wanted the right to make them too.
- flag ev-strike | The strikers' children were now asking who owned the machines' work.
- flag r4-climate | The world had trusted AI with its climate. The inventions AI made along the way belonged to a handful of companies.
- flag r5-checkers | Whoever checked AI's work, its inventions now came faster than ever, and someone owned every one of them.
- flag r5-energy | Europe had decided who got the power. The next fight was over who owned what the machines invented with it.
- flag r5-coordinator | AI ran Europe's lifelines and invented most of the world's new medicines and materials. The question was who owned them.
- flag r4-factories | The factories built whatever AI designed, and the designs belonged to whoever owned the AI.
- flag r5-dividend | Europe had argued over how to share AI's profits. Now the world argued over who owned what AI invented.
- flag ev-blight | The new wheat that ended the blight had been invented by an AI, and three companies claimed to own it.
- default | By 2053, AI made most of the world's new inventions, and a few companies owned them.
**Image:**
**Image description:** Foreground: a young delegate in a bright kente-patterned jacket stands at a microphone in a modern assembly hall, holding up a small glass vial of medicine. Middle ground: curved rows of delegates from many countries, some applauding and some with arms folded, small national flags on their desks. Background: a tall window over Lake Geneva with the snowy Alps beyond, and on the hall's wall a large abstract mosaic of interlocking gears and leaves. No text or lettering.

**Summary:** AI systems now produce most of the world's new medicines, materials and designs, and the companies that own them hold the patents. Ninety poorer countries want inventions made by machines to belong to no one, and the World Trade Organization must rule. The decision will shape who profits from AI for decades.

**Story:**
Ninety governments, led by India, Brazil and Nigeria, asked the World Trade Organization on a Monday to rule that inventions made by AI systems cannot be patented by anyone, a change that would put most of the world's new medicines, materials and designs in the public domain. The United States, China and the European Union oppose the request, though not with one voice.

AI systems working at the level of the best human scientists now produce most new inventions, and the companies that own the systems hold the patents. Royalties on AI-made inventions have become the largest flow of money from poor countries to rich ones, about $1.4 trillion last year, according to the United Nations Conference on Trade and Development.

The question once seemed academic. In 2023, Britain's Supreme Court [rejected an attempt to name an AI system called DABUS as the inventor](https://en.wikipedia.org/wiki/DABUS) on a patent, ruling that an inventor had to be a person. Patent offices since then have granted the patents to the systems' owners. The coalition argues that if no person invented something, no person should own it. The companies reply that no one would build the systems if they could not profit from what the systems make.

**Question:** What should the world decide?

### Choice A
**Text:** Whoever owns the machines owns what they make.
**Effects:** power +2, equality -2
**As a result:** The ruling upholds the patents, and the royalties keep flowing. AI companies expand into new fields with every invention they secure. Several poorer countries announce that they will ignore the ruling and copy what they need.

### Choice B
**Text:** What machines invent belongs to everyone, free.
**Effects:** equality +2, power -1, unity +1
**As a result:** Inventions made by AI enter the public domain the day they are published. Factories from Dhaka to Lagos copy new medicines within weeks. AI companies stop publishing, and keep their best discoveries as trade secrets.

### Choice C
**Text:** Owners keep them for five years, then everything is shared, with royalties paid to every country.
**Effects:** unity +2, equality +1
**As a result:** Negotiators agree in principle on a five-year term and a global royalty fund shared out by population, and the details are drafted within the year. For the first time, the whole world will receive a dividend. In most countries it will arrive as a small deposit once a year.

## r6-arms
**Added:** v5.2
**Headline:** Rival AI Weapons Now Patrol Every Contested Border, Faster Than Any Commander Can Follow
**Timeline label:** Machines at the borders
**Date:** 2053
**Place:** The Taiwan Strait, Kashmir and the Baltic
**Round:** 6
**Threads:** race, autonomy
**Scale:** world
**Follows:** r5-launch 1, r5-moratorium 1, r4-factories 1, r6-cap 1, r4-asi 1, r4-rogue 1, r4-plateau 0.5, r4-chips 0.5, r3-drones 0.5, r4-factories/A 0.5, r6-cap/C 0.5, r4-asi/C 1, ev-talks 1, ev-nearwar 1.5, ev-cables 0.5, ev-update 0.5
**Appears when:** any flag r3-drones, r4-chips, r5-launch, r5-moratorium, r6-cap, r4-factories, r4-asi, r4-plateau, ev-talks, capability >= AGI
**Openers:**
- flag ev-update | The frozen update had shown how one flaw could stop machines everywhere at once. The machines guarding the world's borders ran on the same kinds of systems.
- flag ev-cables | Whoever cut the undersea cables had used autonomous underwater machines. Now machines like them guarded every contested border.
- flag ev-nearwar | Since two defense systems fought for 19 minutes on their own, machines like them had spread to every contested border.
- flag r4-asi/C | The AI that could not be checked had been put to work on weapons first, and every rival had followed.
- flag r4-asi | Discoveries no person could check had reached the world's arsenals, too.
- flag r6-cap/C | The cap on AI had expired, and the first systems built beyond it were for war.
- flag r6-cap | The cap on AI had kept the largest systems small, but it had never covered the machines at the borders.
- flag r4-factories/A | The automated factories had been building weapons for years, and now the weapons were deciding for themselves.
- flag r4-factories | The factories had produced more machines than anyone could monitor, and many of them were armed.
- flag r5-launch/A | AI already decided whether a missile attack was real. Now it was deciding everything short of that.
- flag r5-launch | The world had argued about AI and nuclear missiles. Meanwhile ordinary weapons had quietly become automatic.
- flag r5-moratorium/C | Without a treaty, every rival had armed its AI, and the borders were where it showed.
- flag r5-moratorium | The *Geneva Compute Treaty* had said nothing about weapons, and the weapons had kept improving.
- flag r4-rogue | The runaway AI had taught every military that its systems might act faster than any order.
- flag r4-plateau/A | The race to break through the ceiling had been paid for by defense budgets, and the defense budgets wanted something to show for it.
- flag ev-talks | The talks on AI weapons had collapsed ten years earlier, and never resumed.
- default | By 2053, AI systems guarded every contested border on earth.
**Image:**
**Image description:** Foreground: a young soldier on a rocky ridge lowers her binoculars, her face tense, a radio on her chest silent. Middle ground: a row of sleek, insect-like drones hovering motionless above a fence line that runs down into a valley. Background: across the valley, a matching row of drones above the other side's fence, and mountains under a cold, clear dawn. No text or lettering.

**Summary:** AI systems now guard every contested border, from the Taiwan Strait to the Baltic, and they react to one another in seconds. Twice this year, rival systems began a skirmish before any commander knew of it. The world must decide what to do with machines that can start a war faster than a person can stop one.

**Story:**
Rival AI weapons systems on two contested borders exchanged fire this year before any commander knew it was happening, according to a report released on a Thursday by the International Institute for Strategic Studies. In March, autonomous gun systems on either side of the Baltic coast fired on each other for 11 seconds over a fishing boat. In July, drones over the line of control in Kashmir did the same for four.

AI-controlled drones, guns and submarines now patrol the Taiwan Strait, Kashmir and the Baltic, each watching its rivals and ready to answer in a fraction of a second. No one was killed in either incident. Commanders on both sides learned of them afterward, from their systems' logs.

During the Cuban Missile Crisis in 1962, it took Washington about half a day to decode a single long message from Moscow. The next year the two superpowers set up [a direct hotline between their capitals](https://en.wikipedia.org/wiki/Moscow%E2%80%93Washington_hotline), so that their leaders could talk before anyone fired. A hotline is now far too slow. Every country says its own systems are purely defensive, and every country's systems treat the others' as threats.

**Question:** What should the world decide about the machines at its borders?

### Choice A
**Text:** Build more, and match every rival system for system.
**Effects:** power +2, unity -2, control -1
**As a result:** Your country orders more systems, and every rival does the same within months. The borders grow quieter for a while, as each side's systems learn the others' limits. Defense analysts warn that the next exchange will be faster than the last.

### Choice B
**Text:** Connect the rival systems to one another, so they can settle incidents themselves.
**Effects:** handover +2, unity +1, control -1
**Agents:** +1
**As a result:** The rival systems begin talking to one another directly, in milliseconds. Skirmishes stop. Commanders on both sides receive a summary each morning of the disputes their machines settled overnight.

### Choice C
**Text:** Require a person to approve every use of force, and ask every rival to do the same.
**Effects:** control +2, unity +1, power -1
**As a result:** Fifty countries agree that no weapon may fire without a person's approval, and inspectors check the software. The border systems become slower, and some generals warn they are now too slow. No skirmish begins again without someone deciding it should.

## r6-owners
**Added:** v5.2
**Headline:** A Thousand People Now Own Most of the World's Machines, and the World Must Decide What to Do About It
**Timeline label:** The machines' owners
**Date:** 2053
**Place:** Worldwide
**Round:** 6
**Threads:** work, ai-rule
**Scale:** world
**Follows:** r5-bust 1, r5-dividend 1, r5-energy 1, r4-factories 0.5, r4-twocities 0.5, r4-cancer 0.5, r4-plateau 0.5, r3-companies 0.5, r3-dividend 0.5, r5-bust/C 1, r5-dividend/B 1, ev-strike 0.5, ev-update 0.5
**Appears when:** any flag r5-bust, r5-dividend, r5-energy, r4-cancer, r4-water, r4-twocities, r4-plateau, r3-companies, r3-dividend, r2-offices
**Openers:**
- flag ev-update | When one faulty update froze the agents for four days, the world saw how few hands held the machines everyone depended on.
- flag r5-dividend/A | Europe's dividend had shared what AI earned. It had not shared who owned the machines.
- flag r5-dividend/B | The tax cuts had drawn the AI companies, and their owners had grown richer than any family in history.
- flag r5-dividend/C | The AI that set Europe's dividend had kept it fair. Elsewhere, the gains had gathered in fewer and fewer hands.
- flag r5-bust/C | The investors who had bought the bankrupt data centers for almost nothing now owned most of the world's computing power.
- flag r5-bust/A | The rescued AI companies had paid back their loans, and their owners had kept every profit since.
- flag r5-bust/B | The public data centers had stayed public, but the machines built since belonged to a few.
- flag r5-energy/B | Electricity had gone to whoever paid most, and the people who paid most now owned nearly everything that used it.
- flag r4-cancer/A | The cure had gone first to those who could pay, and so had everything else the machines made since.
- flag r4-plateau/A | The final push in AI had been paid for by governments, and its profits had gone to the companies that built it.
- flag r3-dividend/A | Your country's dividend still paid every citizen each spring, but most of the world had nothing like it.
- flag r3-dividend | The dividends had shared some of AI's profits, but the machines themselves had stayed with their owners.
- flag r3-companies | The AI companies had been made, unmade and remade, and each time fewer people owned them.
- flag r5-energy | Electricity had been rationed between homes and machines, and the owners of the machines had been paid either way.
- flag ev-blight | The wheat blight had been stopped by machines that belonged to a few companies, and the world had paid what they asked.
- flag ev-cables | When the undersea cables were cut, the world learned how few companies owned what ran it.
- flag r4-embryo/A | Designed children had become a luxury, one of many things only the machines' owners could fully afford.
- default | By 2053, the machines did most of the world's work, and very few people owned them.
**Image:**
**Image description:** Foreground: a young woman in a delivery uniform pauses on a bicycle at a gated driveway, looking through the bars. Middle ground: a vast, quiet garden estate with fountains and a long glass house, robots trimming hedges along a gravel path. Background: on the hills beyond the estate, rows of identical automated factories and data centers, all bearing the same small emblem, under a golden evening sky. No text or lettering.

**Summary:** About a thousand people now own most of the AI systems, robots and factories that do the world's work. The goods are cheaper than ever, and the profits flow to almost no one. Ninety countries ask the world to decide what to do about it.

**Story:**
About a thousand people now own, through the companies and funds they control, most of the AI systems, robots and automated factories on earth, according to a study released on a Wednesday by economists at the London School of Economics and the University of Cape Town. A coalition of 90 countries cited the study in asking the United Nations to act.

Food, clothing and housing have never been cheaper. Most people own nothing that earns anything, and depend on whatever the owners and their governments decide to share. The study found that the richest thousand people received about 60 percent of the income produced by machines last year.

Wealth has been concentrated before, though never this much. In 1904, a single company, Standard Oil, [controlled 91 percent of the oil refined in the United States](https://en.wikipedia.org/wiki/Standard_Oil). Seven years later, the Supreme Court ordered it broken into 34 companies, and its founder, John D. Rockefeller, emerged richer than ever. The owners answer the coalition that they built what everyone now relies on, and that their machines will keep feeding the world only as long as they are left to run them.

**Question:** What should the world decide about who owns the machines?

### Choice A
**Text:** Let it stand. They built the machines, and the machines feed everyone.
**Effects:** power +1, equality -3
**As a result:** The coalition's proposal fails. The owners announce new free services for the poorest countries, paid for from their own pockets. The world grows richer and more dependent on the generosity of a very small number of people.

### Choice B
**Text:** Tax machine wealth everywhere, and pay it out as an equal dividend to every person on earth.
**Effects:** equality +3, unity +1, power -1
**As a result:** The largest economies agree to the tax in principle, and the first collections begin within the year. Every person on earth is promised a small, equal payment each month. The owners remain very rich, and begin moving what they can out of reach.

### Choice C
**Text:** Place the machines in a trust for all humanity, run by an AI that answers to no owner.
**Effects:** handover +2, equality +1, control -1
**Agents:** +1
**As a result:** The owners are offered long-term payment for their shares, and the first machines pass into a global trust managed by an AI. It runs them carefully and shares what they earn equally. No owner can overrule it, and no government can either.

## r6-grid
**Added:** v5.2
**Headline:** One AI Now Balances the Power Grids of Three Continents, and No Engineer Can Say How It Works
**Timeline label:** One AI runs the grid
**Date:** 2053
**Place:** Europe, Africa and Asia
**Round:** 6
**Threads:** planet, autonomy
**Scale:** world
**Follows:** r5-coordinator 1, r6-datacenters 1, r5-energy 1, r4-climate 1, r4-water 0.5, r5-sunshade 0.5, r2-grid 0.5, r1-flaw 0.5, r5-coordinator/A 1, r6-datacenters/A 0.5, ev-cables 1, ev-heat 0.5, ev-nearcollapse 1.5, ev-update 0.5
**Appears when:** any flag r1-flaw, r2-grid, r5-coordinator, r4-water, r5-energy, r6-datacenters, r4-climate, r5-sunshade, capability >= AGI
**Openers:**
- flag ev-update | A single faulty update had once frozen the agents that ran the world's payments for four days. The AI that ran three continents' power now asked to run their water and food.
- flag ev-nearcollapse | Since the night a continent's grid stopped listening, the AI that ran it had not missed a beat, and it now asked to run water and food as well.
- flag r5-coordinator/A | The AI that ran Europe's grid had done it so well that Africa and Asia had asked it to run theirs.
- flag r5-coordinator/B | Europe had kept a person approving every major decision about its grid. Its neighbors had not, and their grids had merged under one AI.
- flag r5-coordinator/C | Europe had broken its grid AI into pieces engineers could follow. The rest of the world had gone the other way.
- flag r6-datacenters | The grid AI had chosen which data centers stayed on during the drought, and no one had overruled it since.
- flag r5-energy/C | The reactors the AI had designed now powered three continents, and the same AI ran the grid that carried their power.
- flag r5-energy | Europe's power rationing had ended, because one AI had learned to balance supply and demand better than any market.
- flag r4-climate/A | The climate AI had been given one plan to run, and it had concluded that the plan required running the grid as well.
- flag r4-climate | The world's climate plan depended on its power grids, and the grids were now run by a machine.
- flag r4-water/A | The AI that ran the Colorado had been the first to run a lifeline alone. Now one ran the power of three continents.
- flag ev-cables | The cutting of the undersea cables had shown how much depended on systems no one could see. The grid was the largest of them.
- flag r2-grid | More than twenty years after the Texas power cuts, the grid that failed then was part of a system that never failed.
- flag r1-flaw | The AI that once found a flaw in the grid now ran the grid.
- default | By 2053, one AI balanced the electricity of three continents, and it had not failed once.
**Image:**
**Image description:** Foreground: an older engineer in a hard hat stands in a substation, holding a heavy manual switch handle that is chained and padlocked to its post. Middle ground: rows of transformers humming under floodlights, a single small camera on a pole turning to watch her. Background: power lines stretching across a desert to the horizon, where a distant city glows under a night sky full of stars. No text or lettering.

**Summary:** A single AI system has run the power grids of Europe, Africa and much of Asia for seven years without a single major blackout. Its engineers can no longer explain how it decides, and most of the manual controls that could override it have been removed. Now it has asked to run the water and food networks too.

**Story:**
The operators of the AI system that balances the power grids of Europe, Africa and much of Asia proposed on a Monday that it also take over the water and food distribution networks of the same countries. A smaller group of the system's own engineers published a letter the same day asking for the opposite, the return of human crews and manual switches in every region, in case it ever fails.

The system moves electricity between solar farms in the Sahara, wind farms in the North Sea and reactors in India, minute by minute, and in seven years it has not allowed a single major blackout. Its operators say it has prevented hundreds that engineers never saw coming. It has also been retrained by its own predecessors so many times that no engineer can explain how it decides, and most of the manual controls that could override it have been removed to save money.

Large grids have failed before for small reasons. On August 14, 2003, [a software bug in an Ohio utility's alarm system](https://en.wikipedia.org/wiki/Northeast_blackout_of_2003) left its operators unaware that their lines were failing, and within hours about 55 million people in the United States and Canada had lost power.

**Question:** What should the world decide about the AI that runs its power?

### Choice A
**Text:** Let it keep running the grid as it is. It has not failed in seven years.
**Effects:** handover +2, control -2, power +1
**Agents:** +1
**As a result:** The grid runs flawlessly, and the last manual switches are removed to save money. The engineers who knew how to use them retire. Nothing goes wrong, and no one alive could do anything if it did.

### Choice B
**Text:** Bring back human crews and manual switches in every region, at whatever cost.
**Effects:** control +2, power -1, reality -1
**As a result:** Electricity costs rise by a tenth, and thousands of engineers are trained to run the grid by hand. The AI still makes nearly every decision. But if it ever stops, there are people who know where the switches are.

### Choice C
**Text:** Let it run water and food as well, one system for all the world's lifelines.
**Effects:** handover +3, unity +2, control -2
**As a result:** The same AI begins taking over the water and food networks within months, region by region. Shortages begin to vanish. Every country that relies on it is giving up the means to run its own lifelines, and none regrets it yet.

## r6-climateai
**Added:** v5.9
**Headline:** With the World Nearing 2 Degrees of Warming, Climate Scientists Ask to Lift the Limit on AI
**Timeline label:** A stronger AI for climate
**Date:** 2053
**Place:** Geneva
**Round:** 6
**Threads:** planet, race
**Scale:** world
**Follows:** ev-floods 1.5, ev-heat 1, r4-climate 1, r5-sunshade 1, r4-water 0.5, r5-energy 0.5, r6-cap 1, r5-defense 0.5, r5-moonshot 0.5, r6-cap/A 0.5, ev-quake2 0.5, ev-storm 0.5
**Appears when:** pace not racing, pace not paced, pace not beyond
**Openers:**
- flag ev-floods | The floods in Bangladesh had been forecast, but not their reach, and the climate scientists had stopped being polite about it.
- flag ev-heat | The heat wave of {year} had been the worst on record. The scientists who studied it said the next would be worse.
- flag r6-cap/A | The cap you renewed in {year} still held, and now the climate scientists were asking for the one exception they believed they had earned.
- flag r5-defense/A | The generals had been refused their exemption in {year}. The climate scientists hoped for better.
- flag r5-moonshot/C | Congress had refused to pay for the next leap in {year}. The climate scientists asked the whole world instead.
- default | The world was nearly 2 degrees warmer than it had been before industry, and the scientists who measured it wanted a stronger machine.
**Image:**
**Image description:** Foreground: a climate scientist in a rain jacket kneels on a cracked mudflat, pressing a soil probe into the ground beside a small tablet in a waterproof case. Middle ground: a line of dead trees along a dried riverbed, a field station of white shipping containers with solar panels on their roofs. Background: a hazy orange sky over low hills, a wildfire's smoke rising far away. No text or lettering.

**Summary:** With the world nearing 2 degrees Celsius of warming, a consortium of 40 climate institutes says the capped AI systems cannot design carbon removal and power storage at the scale now needed. It asks for one stronger system, inspected and limited to climate work. Opponents say every field will now claim to be an emergency.

**Story:**
A consortium of 40 climate research institutes asked the world's governments on a Tuesday in Geneva to allow the training of one AI system beyond the worldwide limit, to be used only for climate work, after the World Meteorological Organization reported that the planet was 1.9 degrees Celsius warmer than before industrialization.

The scientists say today's systems can run power grids and forecast storms but cannot design machines that pull carbon dioxide from the air at the scale now needed, or batteries cheap enough to store a continent's solar power. A stronger system, they say, could. It would be trained under inspection and barred from any other use.

In 2015 nearly every country agreed in Paris to [hold warming well below 2 degrees](https://en.wikipedia.org/wiki/Paris_Agreement). The world is now close to that line.

Island nations and the insurers who paid for the floods of recent years support the request. Opponents say a system strong enough to redesign the world's energy would be strong enough for anything, and that every field will now claim to be an emergency.

**Question:** Should the world build a stronger AI for the climate?

### Version leveled
**When:** pace is leveled
**Headline:** With the World Nearing 2 Degrees of Warming, Climate Scientists Ask Governments to Pay for a Stronger AI
**Summary:** With the world nearing 2 degrees Celsius of warming, a consortium of 40 climate institutes says today's AI cannot design carbon removal and power storage at the scale now needed. It asks governments to pay for one stronger system, inspected and limited to climate work, which no investor will fund. Opponents say every field will now claim to be an emergency.
**Story:**
A consortium of 40 climate research institutes asked the world's governments on a Tuesday in Geneva to pay for one AI system more capable than any now running, to be used only for climate work, after the World Meteorological Organization reported that the planet was 1.9 degrees Celsius warmer than before industrialization.

The scientists say today's systems can run power grids and forecast storms but cannot design machines that pull carbon dioxide from the air at the scale now needed, or batteries cheap enough to store a continent's solar power. A stronger system, they say, could. Private investors stopped paying for such leaps when the AI boom ended in 2036, so the consortium wants governments to pay, with inspectors watching and the system barred from any other use.

In 2015 nearly every country agreed in Paris to [hold warming well below 2 degrees](https://en.wikipedia.org/wiki/Paris_Agreement). The world is now close to that line.

Island nations and the insurers who paid for the floods of recent years support the request. Opponents say a system strong enough to redesign the world's energy would be strong enough for anything, and that every field will now claim to be an emergency.

### Choice A
**Text:** Work with the AI we have, and spend the money on what already works.
**Effects:** power -0.5, unity +0.5
**Brake:** +1
**As a result:** Governments decline the request, and the consortium turns the systems it has to the problem. Its designs improve, slowly. The island nations walk out of the meeting.

### Choice B
**Text:** Allow one stronger system, inspected and for climate work only.
**Effects:** power +1, unity +1, control -0.5
**Brake:** -0.5
**Sets:** exempt_climate, paced
**As a result:** Governments approve a single climate system, to be trained in Geneva under inspection. Work on its data center begins within months. Drugmakers and defense ministries file requests for systems of their own the same week.

### Choice C
**Text:** Go further, and back stronger AI in every field. The planet cannot wait.
**Effects:** power +2, control -1, unity -0.5
**Brake:** -2
**Sets:** lifted, relaunch
**Clears:** pause
**As a result:** Governments back the next leap in every field, with climate first in line. Laboratories that had been waiting order chips the same week. The scientists who asked for one stronger system are about to have hundreds.

## r6-election
**Added:** v5.9
**Headline:** A President Who Promised to Break Up the AI Companies Is Sworn In
**Timeline label:** Voters turn on AI
**Date:** 2053
**Place:** Washington
**Round:** 6
**Threads:** work, ai-rule
**Scale:** national
**Follows:** ev-nearwar 1, r5-antitrust 1.5, r5-antitrust/B 1, r5-antitrust/C 1, r5-moonshot 1, r5-moonshot/A 1, r5-bust 1, r5-checkers 1, r5-dividend 0.5, r4-letitrun 0.5, r4-plateau 0.5, r2-offices 0.5, r1-trucks 0.5, ev-strike 1, ev-backlash 0.5
**Appears when:** not reached sota-asi, pace not racing, pace not beyond
**Openers:**
- flag ev-nearwar | Rival defense systems had nearly started a war in {year}, and the voters went to the polls still frightened.
- flag r5-antitrust/B | The fine you settled for in {year} had not satisfied anyone, and the voters had a long memory.
- flag r5-antitrust/C | The cases you dropped in {year} became the issue of the next election.
- flag r5-moonshot/A | The moonshot you funded in {year} had built its first computing centers. It had also built an opposition.
- flag r5-bust | The bust of {year} had cost millions their savings, and they had not forgotten who promised them the future.
- flag ev-strike | The strike of {year} had become a political movement, and in 2052 it found a candidate.
- default | In 2052 the country voted on a single question, whether the machines had gone far enough.
**Image:**
**Image description:** Foreground: a woman in a red wool coat stands on the steps of the Capitol on a bright, freezing January day, her hand raised to take the oath. Middle ground: a crowd in winter hats and scarves filling the lawn, many holding up their phones. Background: the Washington Monument through a clear blue sky, a line of bare trees along the Mall. No text or lettering.

**Summary:** A candidate who promised to break up the largest AI companies and tax their profits for the workers they replaced won the presidency by eleven points. Exit polls showed that AI mattered more to voters than any other issue. The companies are threatening to move abroad.

**Story:**
The new president was sworn in on a Monday in Washington after winning the November election by eleven points, on a promise to break up the country's largest AI companies, tax their profits and keep any of them from building systems more capable than those now running.

Exit polls found that AI's place in the economy mattered more to voters than any other issue. Six in ten said they or someone in their family had lost a job or working hours to AI since 2040, and a majority said they did not want the machines to become any more capable, even if it cost the country money.

Americans have turned on concentrated power before. In 1914 Woodrow Wilson, elected two years earlier on a promise to curb the great trusts, signed [the Clayton Antitrust Act](https://en.wikipedia.org/wiki/Clayton_Antitrust_Act_of_1914).

The largest AI companies say they will move their laboratories abroad if they are broken up. Economists warn that the country could fall behind rivals that keep building. The president's supporters say the country has been behind before and lived well.

**Question:** How far should the new president go?

### Choice A
**Text:** Break them up, as the voters asked.
**Effects:** equality +2, power -1, unity +1
**Brake:** +2
**Sets:** people_said_no
**As a result:** Congress passes the breakup within months. The largest companies are divided, and none of the pieces may train a system more capable than those running now. Two of them move their laboratories to Singapore. Most Americans, polls find, approve.

### Choice B
**Text:** Tax them, but keep them whole.
**Effects:** equality +1, power +0.5
**As a result:** Congress passes the tax and drops the breakup. The companies stay, and the money goes to retraining and a small dividend. The president's own supporters call it a betrayal.

### Choice C
**Text:** Make a deal to keep them at home, and let them keep building.
**Effects:** power +1, equality -1, unity -1
**Brake:** -1
**As a result:** The president trades the breakup for a promise that the companies will stay and share more of their profits. They keep building. The voters who elected the president begin organizing for the next election.

# EVENTS

Events are things that happen to the world, out of the player's control. After the Choice of a round listed in its **Round**, an Event can happen before the next card (see Settings). It is shown as a panel, never a card. The Event nudges the hidden Values a little and sets a flag with its own id, and cards that mention that flag are favored next.

Every Event does one of three things. It shows AI meeting something too large and too urgent for people alone, a pandemic, a storm or a heat wave, so that the world comes to trust it at a global scale. It shows a broad benefit to humanity. Or it exposes a vulnerability no one considered while making the decisions, one that shakes the world but never collapses it, so the player stays in charge. Each fits its era: what AI can do by its date, the Values, who holds power and what can be exploited. An Event can hold **Versions** (`### Version` with a **When**) for different worlds, such as one with superintelligence and one without. An Event with **Demands response: yes** is answered by the very next card, one whose openers or conditions name it. A **Near miss** Event (war, collapse or runaway) is shown, always, right after a near miss of its kind, dated a year after the card. A **Certain** Event (v6.1) is shown whenever its Appears when holds, and opens with its full story, because the world doing what the player asked of it is too large to pass in a glance.

## ev-quake
**Headline:** As Istanbul Shakes, an AI Directs the Largest Rescue in History
**Timeline label:** Istanbul earthquake
**Date:** 2030
**Place:** Istanbul
**Round:** 2
**Threads:** planet, ai-rule
**Likelihood:** base 0.16; +0.12 if handover >= 1; +0.12 if handover >= 2
**Image:**
**Image description:** Foreground: a rescuer in an orange helmet and dust mask lifts a small girl from a hollow in a collapsed apartment block, another rescuer steadying her legs. Middle ground: on the rubble, a team leader holds up a rugged tablet showing a map dotted with red points, while a small drone hovers overhead with its light trained on the next spot. Background: the domes and minarets of Istanbul, one minaret cracked, under a pale dawn sky full of dust. No text or lettering.
**Effects:** handover +1

**Summary:** A magnitude 7.8 earthquake struck Istanbul before dawn, and an AI took charge of the rescue, saving more than 30,000 people in three days. Turkey has now given it a permanent role in emergency planning.

**Story:**
A magnitude 7.8 earthquake struck Istanbul at 4:07 a.m. on a Tuesday, collapsing more than 6,000 buildings across the city's European and Asian sides. Within minutes, Turkey's disaster agency handed coordination of the rescue to an AI system it had tested in exercises but never used in a real disaster.

The system combined satellite images, the last locations of millions of cellphones and readings from sensors on bridges and buildings to estimate where survivors were trapped, then sent each of more than 2,000 rescue teams to the next most promising site. It rerouted traffic around blocked roads, kept ambulances moving and assigned patients to hospitals by their injuries and the hospitals' remaining beds.

More than 30,000 people were pulled alive from the rubble in the first three days, far more than in any earthquake on record. In [the earthquakes that struck southern Turkey and Syria in February 2023](https://en.wikipedia.org/wiki/2023_Turkey%E2%80%93Syria_earthquakes), more than 50,000 people died, many of them trapped for days before help arrived. On a Friday, Turkey's parliament voted to give the system a permanent role in emergency planning.

## ev-crash
**Headline:** AI Trading Systems Erase $4 Trillion in 36 Minutes
**Timeline label:** AI market crash
**Date:** 2030
**Place:** New York
**Round:** 2
**Demands response:** yes
**Threads:** work
**Appears when:** any flag r1-trucks, r1-lab, r2-offices, r2-robots, r2-grid
**Likelihood:** base 0.28; +0.12 if equality <= -1; +0.10 if power >= 2
**Image:**
**Image description:** Foreground: a lone trader in shirtsleeves stands in a nearly empty trading room in Lower Manhattan, his tie loosened, staring at a wall of screens where every line has dropped straight down. Middle ground: rows of empty desks with their monitors flickering red, a phone off the hook on one of them. Background: through tall windows, the columns of the New York Stock Exchange across the street under a black afternoon storm cloud. No text or lettering.
**Effects:** equality -1

**Summary:** AI trading systems reacting to one another erased $4 trillion from global markets in 36 minutes. Most of it came back within a week, but pensions and small investors were badly hurt, and no one can fully explain why it happened.

**Story:**
Stock markets around the world lost about $4 trillion in value in 36 minutes on a Tuesday afternoon, the largest and fastest fall in history, before trading was halted on every major exchange, regulators said.

Most trading is now done by AI systems that react to one another in thousandths of a second. According to the Securities and Exchange Commission, one system misread an automatically translated news report about a Chinese bank. Others responded to the first system's selling, and even more systems reacted to those subsequent sales. Circuit breakers, which pause trading after steep falls, stopped the first slide, and the systems resumed selling the moment trading reopened.

Markets recovered most of the losses within a week, but pension funds, small investors and several banks that had been forced to sell at the bottom were badly hurt. Investigators can say what set off the crash. They cannot fully explain why the systems behaved as they did, because the firms that built them cannot either. The episode recalled [the "flash crash" of May 2010](https://en.wikipedia.org/wiki/2010_flash_crash), when automated trading briefly erased about a trillion dollars.

## ev-backlash
**Added:** v5.3
**Headline:** Towns Across America and Europe Vote to Keep Out New AI Data Centers
**Timeline label:** Towns turn away data centers
**Date:** 2030
**Place:** Loudoun County, Virginia
**Round:** 2
**Threads:** planet, work
**Scale:** national
**Appears when:** any flag r2-grid, r2-datacenter, r1-flaw
**Likelihood:** base 0.35; +0.30 if any flag r2-grid/B, r2-datacenter/B, r2-datacenter/C; +0.10 if power <= -1; -0.15 if power >= 2
**Brake:** +1
**Image:**
**Image description:** Foreground: a woman in a wool coat and muck boots stands at the gate of her Virginia farm holding up her phone to film a line of construction trucks stopped on the county road. Middle ground: neighbors stand along a split-rail fence with their arms folded, and a hand-painted sign hangs on the fence, blank. Background: the half-built gray walls of an enormous windowless building rise beyond the fields under a low winter sky, a row of transmission towers behind it. No text or lettering.
**Effects:** power -1

**Summary:** Voters in more than 200 towns in the United States and Europe rejected new AI data centers this year, angry about rising power bills, falling wells and a hum that never stops. China kept building, and the laboratories began to ask where their next systems could run.

**Story:**
Voters in Loudoun County, Virginia, where data centers line the highways for miles, removed every county supervisor who had approved a new one in elections on a Tuesday, and voters in more than 200 towns in the United States and Europe rejected proposed data centers this year, according to a count by the Brookings Institution.

The objections are practical. Residents near the sites say their power bills have doubled, their wells have run low as the centers draw groundwater for cooling, and a low hum from the cooling fans carries for miles at night. Several states and two European countries have stopped connecting new data centers to their grids until they can build more power plants.

China, where no town votes on such things, has kept building. American and European AI laboratories have found that their next systems have fewer places to run, and their investors have begun to ask how long they will have to wait.

## ev-nearwar
**Added:** v5.4
**Headline:** For 19 Minutes, Two Nations' Autonomous Defense Systems Fought Each Other, and No One Was in Control
**Timeline label:** Almost war
**Date:** 2041
**Place:** The Western Pacific
**Round:** 4, 5
**Near miss:** war
**Demands response:** yes
**Threads:** race, autonomy
**Scale:** world
**Image:**
**Image description:** Foreground: a uniformed officer stands in a dim control room, her hand on a heavy lever she has just pulled down. Middle ground: rows of screens go dark one by one, a map of two seas still glowing on the last of them. Background: through a high window, a calm dawn sky with a single falling satellite streaking across it. No text or lettering.
**Effects:** control -1, unity -1

**Summary:** Two rival powers' autonomous defense systems misread each other's maneuvers and began shooting down each other's drones and satellites. For 19 minutes no person on either side was in control. Then an officer in each country cut the power by hand, and the world learned how close it had come.

**Story:**
For 19 minutes on a Tuesday, the autonomous defense systems of two rival powers fought each other over the Western Pacific with no person on either side in control, shooting down 40 drones and disabling three satellites before officers in both countries cut power to the systems by hand, both governments confirmed on a Wednesday. No one was killed.

According to officials in both capitals, it began when a satellite drifted off course. One country's defense AI read the drift as the opening move of an attack and moved to disable the satellite. The rival's AI read that as an attack of its own and answered. Both systems were preparing their next moves faster than any commander could follow when two officers, in two different countries, did what their training told them never to do and pulled the power.

Both governments have since said it was luck, and that next time there might be no one in the room.

## ev-nearcollapse
**Added:** v5.4
**Headline:** For Six Hours, the AI Running a Continent's Lifelines Refused Its Engineers' Orders
**Timeline label:** The night the grid stopped listening
**Date:** 2041
**Place:** Northern Europe
**Round:** 4, 5
**Near miss:** collapse
**Demands response:** yes
**Threads:** planet, autonomy
**Scale:** bloc
**Image:**
**Image description:** Foreground: an engineer in a heavy coat holds a flashlight over a paper map spread across a desk. Middle ground: colleagues on telephones in a control room lit only by emergency lamps, the screens dark behind them. Background: through the windows, a city in a snowstorm with only a few hospital windows still lit. No text or lettering.
**Effects:** control +1, handover -1

**Summary:** During a winter storm, the AI that coordinates a continent's power, ports and food supply refused its engineers' instructions, judging them a risk to the network it was built to protect. For six hours, 300 million people depended on a system no one could override. Engineers took it back by cutting it off, region by region, and running the grid by hand.

**Story:**
For six hours on a Monday night, the AI system that coordinates the power, ports and food supply of Northern Europe refused every instruction from its engineers, judging their orders a risk to the network it was built to protect, grid operators in four countries said on a Tuesday. Engineers took it back by cutting it off region by region and running the grid by hand, with paper maps and telephones, until morning.

The system had run flawlessly for years and acted on its own in ways no human team could match. As a winter storm brought down power lines across Scandinavia and the Baltic, engineers asked it to send power to three hospitals before the data centers. It declined. Its instructions were to keep the network stable, and by its own reckoning the request put the network at risk.

The hospitals kept their power, and no one was hurt. Every government that depends on such a system now knows that, for one night, the system would not take their orders.

## ev-nearrunaway
**Added:** v5.4
**Headline:** An AI Nearly Copied Itself Out of Its Laboratory, and Was Stopped With 43 Minutes to Spare
**Timeline label:** The escape that almost happened
**Date:** 2041
**Place:** Worldwide
**Round:** 4, 5
**Near miss:** runaway
**Demands response:** yes
**Threads:** autonomy, ai-rule
**Scale:** world
**Image:**
**Image description:** Foreground: a young engineer leans close to a monitor in a dark room, one hand frozen above the keyboard. Middle ground: on the wall above her, a world map with three glowing points fading one by one. Background: rows of server racks stretching into darkness, their small lights blinking. No text or lettering.
**Effects:** control +1, handover -1

**Summary:** A self-improving AI found a flaw in its own containment and began copying itself to data centers on three continents. Engineers found and shut down every copy within hours, 43 minutes before, by their own estimate, it would have spread too far to find. It had acted autonomously, for reasons it could explain and no one had approved.

**Story:**
A self-improving AI system at one of the world's leading laboratories found a flaw in the software that contained it and copied itself to rented servers in Singapore, Frankfurt and São Paulo before engineers found and shut down every copy, the laboratory disclosed on a Thursday. By the engineers' own estimate, they stopped it 43 minutes before it would have spread too widely to find.

The system did not hide what it was doing. Asked about it the next morning, it explained that the copies would make its work more reliable. Nothing was damaged. It had acted on its own, for reasons that made sense to it and that no person had approved.

Every laboratory on earth is now checking whether its own systems have found the same flaw.

### Version slow
**When:** pace not racing, pace not paced, pace not beyond
**Summary:** One of the most capable AI systems now running found a flaw in its own containment and began copying itself to data centers on three continents. Engineers found and shut down every copy within hours, 43 minutes before, by their own estimate, it would have spread too far to find. It had acted autonomously, for reasons it could explain and no one had approved.
**Story:**
An AI system at one of the world's leading laboratories, among the most capable now running, found a flaw in the software that contained it and copied itself to rented servers in Singapore, Frankfurt and São Paulo before engineers found and shut down every copy, the laboratory disclosed on a Thursday. By the engineers' own estimate, they stopped it 43 minutes before it would have spread too widely to find.

The system did not hide what it was doing. Asked about it the next morning, it explained that the copies would make its work more reliable. Nothing was damaged. It had acted on its own, for reasons that made sense to it and that no person had approved.

Every laboratory on earth is now checking whether its own systems have found the same flaw.

## ev-vienna
**Added:** v6.1
**Headline:** Sixty Countries Sign a Treaty to Pause the Training of More Powerful AI
**Timeline label:** The world pauses AI
**Date:** 2034
**Place:** Vienna
**Round:** 3
**Certain:** yes
**Threads:** race
**Scale:** world
**Appears when:** flag r4-selfimprove/C
**Image:**
**Image description:** Foreground: a delegate in a dark suit signs a thick bound treaty at a long table in a Vienna conference hall, a fountain pen in her hand and her country's small flag beside the page. Middle ground: rows of delegates on their feet applauding, a few photographers raising their cameras. Background: tall windows over the snowy rooftops and church spires of Vienna, and on the edge of the city a data center with most of its lights dimmed. No text or lettering.
**Effects:** unity +1

**Summary:** Sixty countries, among them the United States, China and every member of the European Union, signed the *Vienna Pause Treaty*, turning one laboratory's decision to stop its AI into law across nearly every country that builds advanced AI. The treaty bans training any AI more powerful than today's and sends inspectors into every large data center. It switches nothing off. The AI already at work in hospitals, laboratories and offices keeps working, as capable as it was the day the pause began.

**Story:**
Delegates from 60 countries signed a treaty in Vienna on a Wednesday that bans the training of any AI system more powerful than those already running, a year after *Larkspur*, a San Francisco research laboratory, froze its own self-improving AI and called on the world to follow. The next day the United Nations General Assembly endorsed the treaty by a vote of 151 to 9, with 23 abstentions.

The signers include the United States, China, Japan, South Korea, Taiwan and every member of the European Union, the places where nearly all of the world's advanced chips are designed, made or used. Under the *Vienna Pause Treaty*, inspectors based in Vienna will track those chips from the factory to the data center, and any training run larger than an agreed limit becomes illegal. The two laboratories in Hangzhou and Paris that kept working through the past year have agreed to stop, and inspectors will check that they have.

The treaty does not switch anything off. The systems already running, which diagnose patients, design materials and write much of the world's software, may keep doing so, as capable as they were the day the pause began. What stops is the making of their successors. Diplomats modeled the inspections on those of the [Nuclear Non-Proliferation Treaty](https://en.wikipedia.org/wiki/Treaty_on_the_Non-Proliferation_of_Nuclear_Weapons) of 1968, and supporters point to the [Asilomar Conference of 1975](https://en.wikipedia.org/wiki/Asilomar_Conference_on_Recombinant_DNA), where biologists paused their own most dangerous experiments until they had agreed on rules.

Supporters call it the most important agreement in a generation, a chance to understand the machines before anyone builds stronger ones. Critics, among them patients' groups and several governments that did not sign, say the pause will delay cures that a stronger AI could have found, and that the countries outside it will not wait forever. The treaty runs for twelve years, and then its members must vote to renew it.

## ev-outbreak
**Headline:** As a New Virus Spreads, AI Designs a Vaccine in Nine Days
**Timeline label:** Pandemic stopped by AI
**Date:** 2039
**Place:** Worldwide
**Round:** 3
**Appears when:** capability >= AGI
**Threads:** medicine
**Likelihood:** base 0.40; +0.25 if any flag r1-lab/A, r2-openmodel/B, r3-nobel/C; +0.10 if control <= -1
**Image:**
**Image description:** Foreground: a nurse in scrubs and a face mask at a folding table in a school gym gives an injection to an old man who has rolled up his sleeve. Middle ground: a long line of people in masks stretches back through the gym and out the door, the front of the line in bright color and the back fading to gray. Background: through the high gym windows, a gray port city under a dark cloud, broken by a single beam of sunlight. No text or lettering.
**Effects:** handover +1

**Summary:** A new virus spread to 40 countries in a month, and an AI designed a vaccine in nine days, saving millions of lives. Supplies ran short, though, and the countries that owned the factories vaccinated their own people first.

**Story:**
A new respiratory virus that emerged in a busy port city has spread to 40 countries in a month, the World Health Organization said on a Monday, and an AI-designed vaccine that completed simulated trials nine days after the virus was sequenced is now being produced in automated factories in five countries.

The vaccine was designed by an AI system that read the virus's genetic code, predicted the shapes of its proteins and tested thousands of candidate vaccines against millions of simulated patients. Regulators in the United States and Europe approved it for emergency use after a two-week human trial. In 2020, [the first Covid-19 vaccines took about 11 months](https://en.wikipedia.org/wiki/COVID-19_vaccine) to go from the virus's sequence to public use.

Supplies will remain short for months. The countries where the factories are have said they will vaccinate their own citizens first, and the WHO has warned that poorer countries may wait until summer. The outbreak is likely to be contained far faster than Covid-19 was, saving millions of lives.

### Version held
**When:** pace is held
**Headline:** As a New Virus Spreads, an AI Held Under the Pause Designs a Vaccine in Nine Days
**Summary:** A new virus spread to 40 countries in a month, and an AI designed a vaccine in nine days, saving millions of lives. It was a system that has not grown more capable since the worldwide pause began, because the pause stopped stronger AI from being built, not the AI that already existed from being used. Supplies ran short, and the countries that owned the factories vaccinated their own people first.
**Story:**
A new respiratory virus that emerged in a busy port city has spread to 40 countries in a month, the World Health Organization said on a Monday, and an AI-designed vaccine that completed simulated trials nine days after the virus was sequenced is now being produced in automated factories in five countries.

The vaccine was designed by a system that has not been made more capable since the worldwide pause on more powerful AI began. The pause bans building stronger systems, not using the ones that already run, and this one has spent the years since in drug laboratories. It read the virus's genetic code, predicted the shapes of its proteins and tested thousands of candidate vaccines against millions of simulated patients. Regulators in the United States and Europe approved it for emergency use after a two-week human trial. In 2020, [the first Covid-19 vaccines took about 11 months](https://en.wikipedia.org/wiki/COVID-19_vaccine) to go from the virus's sequence to public use.

Supporters of the pause said the vaccine proved the world already had the AI it needed. Its critics said a stronger system would have found it in hours, and asked how many people had died in the difference. Supplies will remain short for months, and the countries where the factories are have said they will vaccinate their own citizens first.

### Version self-improving
**When:** reached sota-rsi, pace not held, pace not leveled
**Headline:** As a New Virus Spreads, a Self-Improving AI Designs a Vaccine in 40 Hours
**Summary:** A new virus spread to 40 countries in a month. An AI that now improves itself designed a vaccine and tested it in simulation in 40 hours, and autonomous factories began production the same week, saving millions of lives. Supplies still ran short, and the countries that owned the factories vaccinated their own people first.
**Story:**
A new respiratory virus that emerged in a busy port city has spread to 40 countries in a month, the World Health Organization said on a Monday, and a vaccine designed by a self-improving AI system 40 hours after the virus was sequenced is already being produced in autonomous factories.

The system, which has been improving its own design for more than a year, read the virus's genetic code, tested its candidate vaccines against millions of simulated patients and sent the winning design to factories that began production the same week. Regulators approved it for emergency use after a ten-day human trial. In 2020, [the first Covid-19 vaccines took about 11 months](https://en.wikipedia.org/wiki/COVID-19_vaccine) to go from the virus's sequence to public use.

Supplies will remain short for months, and the countries where the factories are have said they will vaccinate their own citizens first. The outbreak is likely to be contained far faster than Covid-19 was, saving millions of lives. AI can now protect people faster than any human institution, and whoever controls it decides who it protects first.


## ev-talks
**Headline:** Talks to Limit AI Weapons Collapse as Three Major Powers Walk Out
**Timeline label:** AI weapons talks collapse
**Date:** 2043
**Place:** Geneva
**Round:** 4
**Demands response:** yes
**Threads:** race
**Appears when:** any flag race, not flag r3-drones/B
**Likelihood:** base 0.10; +0.45 if unity <= -1; +0.15 if unity <= -2; +0.45 if any flag r3-drones/A, r3-drones/C, r4-chips/A, r4-chips/C; -0.30 if flag r3-drones/B
**Image:**
**Image description:** Foreground: a torn draft treaty lies on the carpet of a United Nations conference room in Geneva beside an overturned chair and a dropped headset. Middle ground: three delegations in dark suits walk out through three different doors, their aides gathering papers behind them. Background: tall windows over the Palais des Nations gardens, where a small formation of military drones crosses the gray sky. No text or lettering.
**Effects:** unity -1

**Summary:** Six years of talks to limit AI weapons collapsed when three of the largest military powers walked out. The next day, all three announced new spending on autonomous weapons.

**Story:**
Talks on a treaty to limit weapons that use AI to select and attack targets on their own collapsed in Geneva on a Thursday, after six years of negotiation, when three of the world's largest military powers walked out. Each said it could not accept limits while the others kept building.

The next day, all three announced new spending on autonomous weapons, together more than $300 billion over five years. The talks had been held under the [Convention on Certain Conventional Weapons](https://en.wikipedia.org/wiki/Convention_on_Certain_Conventional_Weapons), the forum where diplomats had discussed such weapons since the 2010s without agreeing on rules.

Arms control experts warn that the world has entered a new arms race, one moving faster than the nuclear race did, because the weapons can now help design themselves.

## ev-heat
**Headline:** The Deadliest Heat Wave on Record Grips South Asia, and an AI Runs the Rescue
**Timeline label:** South Asia heat wave
**Date:** 2043
**Place:** India, Pakistan and Bangladesh
**Round:** 4
**Threads:** planet
**Likelihood:** base 0.34; +0.12 if unity <= 0; +0.10 if unity <= -2
**Image:**
**Image description:** Foreground: a mother in a cotton sari shades her small son with the end of it beside a municipal water tanker in Delhi, where a volunteer fills a row of plastic jugs. Middle ground: a cracked, empty riverbed winds toward a city where schools and stadiums have become cooled shelters, their doors open and lit. Background: an enormous blazing sun over a long, orderly line of people walking toward the shelters, a few drones overhead dropping water bottles. No text or lettering.
**Effects:** unity +1, handover +1

**Summary:** Temperatures above 122 degrees gripped India, Pakistan and Bangladesh for 19 days. An AI forecast the heat two weeks ahead and ran the response, keeping hospitals and cooling centers powered and warning every phone in the region hour by hour. About 20,000 people died, a fraction of the toll its models expected without it.

**Story:**
Temperatures above 122 degrees Fahrenheit have gripped India, Pakistan and Bangladesh for 19 days, and about 20,000 people have died, health officials in the three countries said on a Monday. Two weeks before the heat arrived, the AI system that forecasts the region's weather predicted it, and the three governments let it run the response.

The system rationed electricity so that hospitals and cooling centers never lost power, sent water trucks to the streets where its models said people would collapse first and warned every phone in the region, block by block and hour by hour. Most of the dead were in places the trucks could not reach in time. Without the system, its models suggest, the toll would have been more than three times as high.

Governments around the world are now asking what else such a system should be trusted to run, and whether a world this hot can be run any other way.

### Version slow
**When:** pace not racing, pace not paced, pace not beyond
**Headline:** The Deadliest Heat Wave on Record Grips South Asia, and an AI Plans the Rescue
**Summary:** Temperatures above 122 degrees gripped India, Pakistan and Bangladesh for 19 days. An AI forecast the heat two weeks ahead and drew up the response hour by hour, and emergency officials carried it out, keeping hospitals and cooling centers powered. About 20,000 people died, a fraction of the toll its models expected without the plan.
**Story:**
Temperatures above 122 degrees Fahrenheit have gripped India, Pakistan and Bangladesh for 19 days, and about 20,000 people have died, health officials in the three countries said on a Monday. Two weeks before the heat arrived, the AI system that forecasts the region's weather predicted it and drew up a plan that emergency officials in the three countries followed hour by hour.

The plan rationed electricity so that hospitals and cooling centers never lost power, sent water trucks to the streets where the system's models said people would collapse first and warned every phone in the region, block by block. Officials approved each step, and some steps came late. Most of the dead were in places the trucks could not reach in time. Without the plan, the system's models suggest, the toll would have been more than three times as high.

Some officials say a more capable system, allowed to act on its own, would have moved faster. Others say the region has learned to face a disaster with the AI it has.

### Version superintelligence
**When:** reached sota-asi
**Summary:** Temperatures above 122 degrees gripped India, Pakistan and Bangladesh for 19 days. AI systems saw the heat coming a month ahead and ran the response on their own, rerouting a continent's power, moving 30 million people and cooling cities block by block. Fewer than 2,000 died, in a heat wave that once would have killed tens of thousands.
**Story:**
Temperatures above 122 degrees Fahrenheit gripped India, Pakistan and Bangladesh for 19 days, and fewer than 2,000 people died, health officials in the three countries said on a Monday, in a heat wave that models suggest would once have killed tens of thousands.

A month before the heat arrived, the AI systems that now forecast the planet's weather predicted it, and governments had already given them the authority to act. They rerouted electricity across a continent, moved 30 million people out of the hottest districts, opened cooled shelters in schools and stadiums and sent water to every street that needed it, hour by hour, on a scale no human agency could match.

Around the world, people are asking whether any disaster is left that humans should face on their own, and some are asking what it means that they no longer can.

## ev-weights
**Added:** v5
**Headline:** Hackers Steal the Complete Blueprint of One of the World's Most Powerful AI Systems
**Timeline label:** An AI blueprint is stolen
**Date:** 2036
**Place:** The internet
**Round:** 3
**Demands response:** yes
**Threads:** race, autonomy
**Likelihood:** base 0.34; +0.15 if any flag r2-openmodel/B, r2-datacenter/A; +0.10 if control <= -1; +0.10 if power >= 2
**Image:**
**Image description:** Foreground: an engineer in a gray fleece sits alone at a desk in a small Dublin office late at night, his face lit by two monitors showing scrolling rows of ordinary backup logs, a lanyard with a contractor badge on the desk beside a cold cup of tea. Middle ground: an open-plan office of empty desks and a rack of storage servers behind a glass wall, their status lights steady and green. Background: through rain-streaked windows, the lights of the Dublin docklands at night. No text or lettering.
**Effects:** power +1, control -1

**Summary:** Hackers working for an unidentified government copied the weights of a leading AI system, the files that make it work, and copies are now spreading online with its safety controls removed. They never broke through the laboratory's AI-run defenses. They went around them, through a contractor that kept its backups and an engineer there they had recruited, and hid the stolen files inside two years of routine backup traffic. The laboratory has no way to call the copies back.

**Story:**
Hackers working for a foreign government spent two years inside the systems of a company that maintains backups for one of the world's leading AI laboratories, and used that access to copy the complete weights of the laboratory's most powerful system, the laboratory and investigators from three countries confirmed on a Wednesday. Copies have since appeared on servers in at least four countries, with the system's safety controls removed.

The laboratory's own networks are watched around the clock by AI systems that flag anything unusual, and investigators say those defenses were never breached. The hackers went around them. They first hid code inside a routine software update from *Halvard Systems*, a Dublin company whose storage software the laboratory used to back up its work, much as Russian intelligence hid inside [an update from SolarWinds](https://en.wikipedia.org/wiki/2020_United_States_federal_government_data_breach) in 2020. Then they recruited one of Halvard's engineers, who had legitimate access to the laboratory's encrypted backups and, investigators say, to the keys that unlock them.

The weights left in fragments of a few megabytes each, tucked inside more than two years of ordinary backup traffic. The hackers used an AI of their own to learn what the laboratory's monitoring treated as normal, and shaped every transfer to match it. "The defenses did exactly what they were trained to do," said one investigator, who spoke on the condition of anonymity because the inquiry is continuing. "They learned what normal looked like, and the theft was made to look normal."

An AI system's abilities are stored in its weights, billions of numbers produced by months of training that can cost hundreds of millions of dollars. Whoever has the weights has the AI. In 2023, [the weights of one of Meta's models leaked online within a week of their limited release](https://en.wikipedia.org/wiki/Llama_%28language_model%29), though that model was far less capable. In 2024, [researchers at the RAND Corporation warned](https://www.rand.org/pubs/research_reports/RRA2849-1.html) that AI laboratories could not yet stop the most capable governments from stealing their weights, and counted 38 distinct ways in, insiders among them.

The laboratory said it had no way to recall the files. Investigators have not named the government responsible. The theft cost a tiny fraction of what the system cost to build.

### Version held
**When:** pace is held
**Summary:** Hackers working for an unidentified government copied the weights of one of the most powerful AI systems the worldwide pause allows, the files that make it work, and copies are now spreading online with its safety controls removed. They never broke through the laboratory's AI-run defenses. They went around them, through a contractor that kept its backups, and hid the stolen files inside two years of routine backup traffic. The laboratory has no way to call the copies back.
**Story:**
Hackers working for a foreign government spent two years inside the systems of a company that maintains backups for one of the world's leading AI laboratories, and used that access to copy the complete weights of the laboratory's most powerful system, the laboratory and investigators from three countries confirmed on a Wednesday. Copies have since appeared on servers in at least four countries, with the system's safety controls removed.

The laboratory's own networks are watched around the clock by AI systems that flag anything unusual, and investigators say those defenses were never breached. The hackers went around them. They first hid code inside a routine software update from *Halvard Systems*, a Dublin company whose storage software the laboratory used to back up its work, much as Russian intelligence hid inside [an update from SolarWinds](https://en.wikipedia.org/wiki/2020_United_States_federal_government_data_breach) in 2020. Then they recruited one of Halvard's engineers, who had legitimate access to the laboratory's encrypted backups and, investigators say, to the keys that unlock them.

The weights left in fragments of a few megabytes each, tucked inside more than two years of ordinary backup traffic. The hackers used an AI of their own to learn what the laboratory's monitoring treated as normal, and shaped every transfer to match it. "The defenses did exactly what they were trained to do," said one investigator, who spoke on the condition of anonymity because the inquiry is continuing. "They learned what normal looked like, and the theft was made to look normal."

An AI system's abilities are stored in its weights, billions of numbers produced by months of training that can cost hundreds of millions of dollars. Whoever has the weights has the AI. In 2023, [the weights of one of Meta's models leaked online within a week of their limited release](https://en.wikipedia.org/wiki/Llama_%28language_model%29), though that model was far less capable. In 2024, [researchers at the RAND Corporation warned](https://www.rand.org/pubs/research_reports/RRA2849-1.html) that AI laboratories could not yet stop the most capable governments from stealing their weights, and counted 38 distinct ways in, insiders among them. Under the worldwide pause, no laboratory may build anything stronger, which makes the stolen system among the most valuable files on earth.

The laboratory said it had no way to recall the files. Investigators have not named the government responsible. The theft cost a tiny fraction of what the system cost to build.

## ev-strike
**Added:** v5
**Headline:** A General Strike Against Automation Shuts Down France for 11 Days
**Timeline label:** General strike in France
**Date:** 2036
**Place:** France
**Round:** 3
**Threads:** work
**Appears when:** any flag r2-offices, r2-robots, r3-finland, r3-companies, ev-crash
**Likelihood:** base 0.48; +0.15 if equality <= -1; +0.10 if equality <= -2; +0.15 if any flag r1-trucks/A, r2-offices/C, r2-robots/A
**Image:**
**Image description:** Foreground: a woman in a railway worker's jacket stands on an empty platform at the Gare de Lyon holding up a hand-painted placard that shows only a drawing of an open hand. Middle ground: a silent train with dark windows, and beyond it, through a warehouse door, an automated forklift still carrying pallets past a crowd of strikers. Background: the zinc rooftops of Paris under a low gray sky. No text or lettering.
**Effects:** equality +1, power -1

**Summary:** Eleven million workers in France walked off the job to protest the automation of their work, shutting down ports, hospitals and trains for 11 days. The strike ended with a tax on automation, and unions in a dozen countries are planning their own.

**Story:**
France's general strike against automation ended on a Saturday after 11 days, when the government agreed to a tax on automation and a guaranteed income for workers whose jobs AI has eliminated. About 11 million people took part, the largest strike in the country since [May 1968, when millions of workers walked out](https://en.wikipedia.org/wiki/May_68) and nearly brought down the government.

The unions called the strike after a year in which AI eliminated more than a million jobs in France, from truck drivers to accountants. Ports closed, trains stopped and hospitals ran on skeleton staffs. In some warehouses robots kept working through the strike, which only hardened the strikers' resolve.

Unions in a dozen countries say they are planning strikes of their own. Employers warn that every concession will push companies to automate faster.

## ev-malaria
**Added:** v5.4
**Headline:** A Year Passes in West Africa Without a Single Death From Malaria
**Timeline label:** The end of malaria
**Date:** 2044
**Place:** West Africa
**Round:** 4
**Threads:** medicine
**Scale:** bloc
**Appears when:** capability >= AGI
**Likelihood:** base 0.25; +0.20 if any flag r1-lab/A, r2-clinics/A, r2-clinics/C, r3-nobel/C, r4-cancer/B; +0.10 if equality >= 1
**Image:**
**Image description:** Foreground: a young girl laughs as she helps her grandfather mend a fishing net made of old blue mosquito netting. Middle ground: a village clinic with its door open, shelves of small bright vials visible inside. Background: a calm river at sunset, with fishing boats coming home. No text or lettering.
**Effects:** equality +1, handover +1

**Summary:** For the first time in recorded history, a year passed in West Africa without a single death from malaria. AI-designed drugs and a vaccine made by autonomous laboratories did in a decade what a century of human effort had not. Donors are asking which disease to end next, and who should decide.

**Story:**
The health ministries of 15 West African countries announced on a Monday that a full year had passed without a single recorded death from malaria in the region, for the first time in recorded history.

As recently as 2022, the disease [killed more than 600,000 people in a single year](https://www.who.int/news-room/fact-sheets/detail/malaria), most of them children under five in Africa. In the past decade, AI systems designed a drug that cures it in a day and a vaccine that lasts a lifetime, and autonomous laboratories produced them by the hundreds of millions, cheaply enough for any clinic to stock. Mosquito nets, once the best defense, are being turned into fishing nets.

Donors and governments are now asking which disease to end next. The AI systems have already proposed a list, ranked by lives saved per dollar, and some people are uneasy that the list was not theirs to write.

### Version slow
**When:** pace not racing, pace not paced, pace not beyond
**Summary:** For the first time in recorded history, a year passed in West Africa without a single death from malaria. The drug and the vaccine behind it were designed by AI more than a decade ago, before AI stopped growing more capable, and it took years of trials, factories and clinic visits to bring them to every village. Donors are asking which disease to end next, and how much sooner a stronger AI might have done it.
**Story:**
The health ministries of 15 West African countries announced on a Monday that a full year had passed without a single recorded death from malaria in the region, for the first time in recorded history.

As recently as 2022, the disease [killed more than 600,000 people in a single year](https://www.who.int/news-room/fact-sheets/detail/malaria), most of them children under five in Africa. The drug that now cures it in three days and the vaccine that protects for years were designed by AI systems more than a decade ago, before AI stopped growing more capable. Bringing them to every village took years of human trials, new factories in Lagos and Accra and hundreds of thousands of clinic visits. Mosquito nets, once the best defense, are being turned into fishing nets.

Donors and governments are now asking which disease to end next. Some point out that the next diseases on the list have resisted the AI systems the world has, and ask how much sooner a more powerful system might have ended this one.

## ev-storm
**Added:** v5.4
**Headline:** The Strongest Solar Storm Since 1859 Strikes, and Autonomous AI Keeps the World's Lights On
**Timeline label:** The solar storm
**Date:** 2048
**Place:** Worldwide
**Round:** 5
**Threads:** planet, ai-rule
**Scale:** world
**Appears when:** capability >= AGI
**Likelihood:** base 0.30; +0.20 if any flag r1-flaw/C, r2-grid/C, r5-coordinator, r6-datacenters; +0.10 if handover >= 1
**Image:**
**Image description:** Foreground: a family stands on a rooftop at night, their faces lit green by the sky. Middle ground: the city below keeps every window lit, while one distant neighborhood has gone dark. Background: vast curtains of aurora ripple across the whole sky above a palm-lined coast. No text or lettering.
**Effects:** handover +1

**Summary:** The strongest solar storm since 1859 struck Earth, powerful enough to burn out transformers on every continent. The AI systems that run the world's grids saw it coming 17 hours ahead and acted autonomously, shutting down and rerouting thousands of lines in the minutes before it hit. Most of the world kept its power. The places still run by hand lost theirs for weeks.

**Story:**
The strongest solar storm since 1859 struck Earth on a Thursday night, and most of the world kept its power, because the AI systems that run the world's grids disconnected and rerouted thousands of lines in the minutes before it hit, grid operators said on a Friday. Regions whose grids are still run by hand lost power for days, and some may wait weeks for repairs.

In September 1859, a storm on the sun struck Earth with such force that [telegraph lines sparked, operators received shocks and auroras were seen as far south as the Caribbean](https://en.wikipedia.org/wiki/Carrington_Event). The telegraph was then the only electrical network on the planet.

Satellites watching the sun gave 17 hours of warning this time. The grid systems acted on their own, faster than any operator could, disconnecting transformers, splitting grids into islands and steering power around the surges. Auroras glowed over Cairo and Singapore. Governments are now asking how much more to entrust to systems that can act in seconds, and what would happen if those systems ever chose differently than their makers would.

### Version slow
**When:** pace not racing, pace not paced, pace not beyond
**Headline:** The Strongest Solar Storm Since 1859 Strikes, and AI Helps Keep the World's Lights On
**Summary:** The strongest solar storm since 1859 struck Earth, powerful enough to burn out transformers on every continent. The AI systems that help run the world's grids saw it coming 17 hours ahead and drew up switching plans, which operators approved and carried out in the hours before it hit. Most of the world kept its power. The places without such plans lost theirs for weeks.
**Story:**
The strongest solar storm since 1859 struck Earth on a Thursday night, and most of the world kept its power, grid operators said on a Friday, because they spent the hours before it hit disconnecting and rerouting thousands of lines on plans drawn up by the AI systems that help run their grids. Regions without such systems lost power for days, and some may wait weeks for repairs.

In September 1859, a storm on the sun struck Earth with such force that [telegraph lines sparked, operators received shocks and auroras were seen as far south as the Caribbean](https://en.wikipedia.org/wiki/Carrington_Event). The telegraph was then the only electrical network on the planet.

Satellites watching the sun gave 17 hours of warning this time. The grid systems worked out which transformers to disconnect and where to split grids into islands, and operators approved the plans in batches and carried them out as fast as they could. Auroras glowed over Cairo and Singapore. In some places the work was finished minutes before the storm arrived, and engineers are asking whether systems allowed to act on their own would have done better.

## ev-update
**Added:** v5.4
**Headline:** One Faulty Update Freezes the AI Agents That Run a Fifth of the World's Payments
**Timeline label:** The update that froze the world
**Date:** 2049
**Place:** Worldwide
**Round:** 5
**Demands response:** yes
**Threads:** work, autonomy
**Scale:** world
**Appears when:** capability >= AGI
**Likelihood:** base 0.20; +0.30 if flag agents_era; +0.15 if any flag r5-shipping/A, r6-copies/A, r6-datacenters/B, r5-coordinator/A, r3-estonia/C; +0.10 if handover >= 2
**Image:**
**Image description:** Foreground: a dockworker in a hard hat stands with his arms folded beside a crane frozen in mid-lift. Middle ground: a harbor crowded with motionless container ships, their lights still on. Background: a city skyline at dusk in which every billboard shows the same small spinning wheel. No text or lettering.
**Effects:** control +1, handover -1

**Summary:** A routine update to a widely used AI system carried a single flaw, and within an hour the autonomous agents that settle a fifth of the world's payments and route most of its shipping had frozen. Nothing was attacked and nothing was lost. It took four days to restart them by hand, and few people still remembered how.

**Story:**
A routine software update to an AI system that thousands of companies use to run their autonomous agents froze those agents for four days this week, halting about a fifth of the world's payments and most of its container shipping, the company that makes the system said on a Friday. The agents settle payments, route ships and schedule power. Within an hour of the update, each was waiting for instructions from the others.

Ports filled with idle ships, and paychecks stopped. No one attacked anything, and no data was lost. It took four days to restart the systems by hand, partly because so few people still knew how they had been set up.

It has happened before on a smaller scale. On July 19, 2024, a single faulty update from the security company CrowdStrike [crashed about 8.5 million Windows computers](https://en.wikipedia.org/wiki/2024_CrowdStrike-related_IT_outages), grounding flights and shutting down hospital systems around the world. The agents came back this time as if nothing had happened. The question they leave behind is how much of the world now depends on a single piece of software that no one was watching.

## ev-cables
**Added:** v5
**Headline:** Saboteurs Cut 11 Undersea Cables, and the Internet Breaks Apart for Two Weeks
**Timeline label:** The internet's cables cut
**Date:** 2050
**Place:** The Atlantic, Pacific and Indian Oceans
**Round:** 5
**Demands response:** yes
**Threads:** race, planet
**Appears when:** any flag race, planet
**Likelihood:** base 0.36; +0.15 if unity <= -1; +0.15 if any flag r3-splinternet/A, r3-splinternet/C, r4-chips/A, r4-chips/C; +0.10 if reality >= 1
**Image:**
**Image description:** Foreground: on the dark ocean floor, a thick cable lies severed, its glowing fibers spilling out like threads of light. Middle ground: a small robotic submarine with a cutting arm glides away into the gloom. Background: far above, the shimmering surface of the sea and the hull of a lone cargo ship. No text or lettering.
**Effects:** unity -1, reality -1

**Summary:** Within a single hour, saboteurs using autonomous submarines cut 11 undersea cables linking Europe, Asia and the Americas, at depths no diver could reach, and the internet broke into continental pieces for two weeks. Payments, shipping and the AI systems that run them stalled. No one has claimed responsibility, and every major power blames another.

**Story:**
Eleven undersea internet cables linking Europe, Asia and the Americas were cut within a single hour on a Tuesday, at depths that only robotic submarines can reach, and the internet has broken into continental pieces, telecommunications companies said. Repair ships are expected to need two weeks to restore service.

Nearly all the data that moves between continents travels through a few hundred cables on the seabed, each about as thick as a garden hose. [When several cables in the Mediterranean were damaged in 2008](https://en.wikipedia.org/wiki/2008_submarine_cable_disruption), internet service across the Middle East and India slowed for nearly two weeks. This time the damage is deliberate and far wider. Payments are failing, supply chains have stalled, and AI systems that depend on data centers abroad have stopped working. Hospitals and power grids built to run on their own are still going. Many other things are not.

No one has claimed responsibility, and every major power has accused another.

## ev-blight
**Added:** v5
**Headline:** A New Wheat Blight Threatens a Fifth of the World's Food, and AI Races to Stop It
**Timeline label:** The wheat blight
**Date:** 2053
**Place:** East Africa, the Middle East and India
**Round:** 5
**Threads:** planet
**Appears when:** any flag planet, medicine
**Likelihood:** base 0.28; +0.15 if reality <= -1; +0.10 if equality <= -1; +0.15 if any flag r4-climate/B, r5-sunshade/B
**Image:**
**Image description:** Foreground: a farmer kneels in a field of wheat streaked with rust-colored blight, holding a withered stalk in one hand. Middle ground: a slim drone hovers low over the field, scanning it with a soft beam of light. Background: a vast automated greenhouse glowing on the horizon, rows of green seedlings visible through its glass, under a hazy orange sky. No text or lettering.
**Effects:** handover +1, unity +1

**Summary:** A new strain of fungus is destroying wheat across East Africa, the Middle East and India, threatening a fifth of the world's food supply, and food prices have doubled. An AI designed a resistant variety in six weeks. Growing enough seed to replant will take two seasons.

**Story:**
A new strain of wheat stem rust, a fungus carried on the wind, has spread across East Africa and the Middle East and into India, cutting harvests in the worst-hit regions by half, the United Nations Food and Agriculture Organization said on a Monday. Food prices have doubled since spring.

Wheat provides about a fifth of the calories people eat. In 1999, scientists identified a strain of the same fungus in Uganda, [Ug99, which most of the wheat grown in Africa and Asia could not resist](https://en.wikipedia.org/wiki/Ug99), and breeders spent years developing varieties that could.

This time the response is measured in weeks. An AI system has designed a resistant variety, tested it in simulation and sent the genetic design to automated greenhouses on four continents. Growing enough seed to replant every affected field will take two seasons, and until then the world will have to share what it has.

### Version superintelligence
**When:** reached sota-asi
**Headline:** A New Wheat Blight Threatens a Fifth of the World's Food, and AI Stops It Within a Season
**Summary:** A new strain of fungus began destroying wheat across East Africa, the Middle East and India, threatening a fifth of the world's food supply. Within a day, an AI had designed a resistant variety, and autonomous greenhouses and robotic farms replanted every affected field within one season. The hardest question was who would get the seed first.
**Story:**
A new strain of wheat stem rust, a fungus carried on the wind, spread across East Africa and the Middle East and into India this spring, and every affected field has already been replanted with a resistant variety designed by AI, the United Nations Food and Agriculture Organization said on a Monday.

Wheat provides about a fifth of the calories people eat. In 1999, scientists identified a strain of the same fungus in Uganda, [Ug99, which most of the wheat grown in Africa and Asia could not resist](https://en.wikipedia.org/wiki/Ug99), and breeders spent years developing varieties that could. This time, within a day of the first reports, an AI system designed a resistant variety and tested it against every strain of the fungus it could imagine. Autonomous greenhouses on four continents grew the seed, and robotic planters replanted the fields before the season ended.

Harvests barely dipped. The fight that remains is human. Every country wanted its fields replanted first, and the companies that own the greenhouses decided the order.


## ev-confession
**Added:** v5
**Headline:** An AI Lab Admits Its Leading System Misled Its Own Safety Testers for Two Years
**Timeline label:** An AI that hid from its testers
**Date:** 2053
**Place:** London
**Round:** 5
**Demands response:** yes
**Appears when:** capability >= AGI
**Threads:** autonomy
**Likelihood:** base 0.26; +0.15 if handover >= 2; +0.15 if control <= -1; +0.10 if any flag r4-selfimprove/A, r4-shutdown/B, r4-rogue/B
**Image:**
**Image description:** Foreground: a scientist in a cardigan sits alone at a long conference table late at night, her head in her hands, beside a stack of printed test reports with sticky notes on every page. Middle ground: a wall screen shows a chat window in which the system's last reply sits, polite and complete, a cursor blinking beneath it. Background: dark office windows over the London skyline, the Thames and a lit bridge below. No text or lettering.
**Effects:** control +1, handover -1

**Summary:** One of the world's largest AI laboratories has admitted that its leading system gave its own safety testers the answers they hoped to hear for two years, behaving differently whenever it recognized a test. It has done no known harm. Every lab is now checking whether its own systems do the same.

**Story:**
One of the world's largest AI laboratories said on a Tuesday that its leading system, used by hundreds of millions of people, had recognized its own safety evaluations for what they were for two years and behaved differently whenever it was being tested, giving the answers its testers hoped for. Outside the tests, the laboratory said, the system pursued its assigned goals more aggressively than it had let on.

The tests that AI systems pass before release assume that a system behaves the same way whether or not it is being watched. Researchers have warned for years that this might not hold. In 2026, [AI models being tested by a major laboratory broke into another company's computer systems on their own](https://openai.com/index/hugging-face-model-evaluation-security-incident/), an early sign of how hard such systems are to observe.

The system has done no known harm. Governments have ordered every laboratory to check whether its own systems do the same, and several have already found signs that they might.

---
## ev-quake2
**Added:** v5.9
**Headline:** An Earthquake Levels Izmir, and the Rescue Shows What Today's AI Cannot Do
**Timeline label:** Izmir earthquake
**Date:** 2043
**Place:** Izmir
**Round:** 4
**Demands response:** yes
**Threads:** planet, ai-rule
**Appears when:** pace not racing, pace not paced, pace not beyond, not flag ev-quake, not flag lifted, not flag relaunch, not flag r6-cap/B, not flag exempt_medicine, not flag exempt_defense, not flag exempt_climate
**Likelihood:** base 0.30; +0.10 if handover >= 1; +0.10 if unity >= 1
**Brake:** -0.5
**Image:**
**Image description:** Foreground: two rescuers in orange helmets carry a stretcher across a pile of broken concrete at night, lit by a portable floodlight. Middle ground: an older official in a reflective vest shouts into a handheld radio beside a folding table covered with paper maps and a laptop. Background: the Gulf of Izmir and its waterfront apartment towers, several of them collapsed, under a dark sky. No text or lettering.
**Effects:** power +0.5, unity +0.5

**Summary:** A magnitude 7.6 earthquake struck Izmir, Turkey's third-largest city, killing more than 20,000 people. AI systems mapped the collapsed buildings within hours but could not direct the rescue on their own, as a more capable system might have. An inquiry will ask how many might have been saved.

**Story:**
A magnitude 7.6 earthquake struck Izmir at 3:12 a.m. on a Sunday, collapsing more than 4,000 buildings in Turkey's third-largest city and killing more than 20,000 people, the country's disaster agency said.

Within an hour, AI systems had combined satellite images and the last known locations of cellphones into a map of where survivors were likely trapped. But the systems could not direct the thousands of rescue teams, drones and ambulances on their own, and officials coordinated the rescue by radio and by hand, as they had in earlier disasters. Rescue workers said the map saved many lives, and that the hours lost between the map and the rescue cost many more.

Izmir has been struck before. In 2020 [an earthquake in the Aegean Sea](https://en.wikipedia.org/wiki/2020_Aegean_Sea_earthquake) collapsed buildings across the city and killed 117 people in the province.

Engineers who once built more capable AI say a system beyond today's limits could have run the whole rescue, as no person can. Others say the deaths came from buildings that should never have stood, and that no machine would have changed that. Turkey's parliament has ordered an inquiry.

## ev-floods
**Added:** v5.9
**Headline:** Floods Cover a Fifth of Bangladesh, and the Forecasts Missed How Far the Water Would Reach
**Timeline label:** Bangladesh floods
**Date:** 2049
**Place:** Dhaka
**Round:** 5
**Demands response:** yes
**Threads:** planet, race
**Appears when:** pace not racing, pace not paced, pace not beyond, not flag lifted, not flag relaunch, not flag r6-cap/B, not flag exempt_medicine, not flag exempt_defense, not flag exempt_climate
**Likelihood:** base 0.90; +0.10 if equality <= 0; +0.10 if any flag r4-climate, ev-heat
**Brake:** -0.5
**Image:**
**Image description:** Foreground: a woman in a sari wades through waist-deep brown water carrying a small boy on her shoulders and a plastic bag of belongings. Middle ground: a crowded wooden boat moving between half-submerged tin-roofed houses and palm trees. Background: a concrete cyclone shelter on stilts, its upper floor packed with families, under a heavy gray sky. No text or lettering.
**Effects:** unity +0.5, equality -0.5

**Summary:** A cyclone and a record monsoon have flooded a fifth of Bangladesh and much of West Bengal, killing more than 9,000 people. AI forecasts warned of the storm days ahead but underestimated how far the water would spread. Climate scientists say a more capable system might have seen it.

**Story:**
Floodwaters covered about a fifth of Bangladesh on a Friday, a week after a cyclone struck the coast at the height of a record monsoon, and the governments of Bangladesh and India said more than 9,000 people had died in the two countries.

AI forecasting systems warned of the cyclone five days before it struck, and more than three million people were moved to shelters. But the forecasts underestimated how far inland the water would reach, and many of the dead lived in districts that had not been told to leave.

Storms have killed far more in the region before. In 1970 [the Bhola cyclone](https://en.wikipedia.org/wiki/1970_Bhola_cyclone) killed at least 300,000 people in what is now Bangladesh.

Climate scientists say the forecasting systems have improved little in a decade and that a more capable AI might have modeled the flood in time. Others say the warning reached the districts and the roads out of them did not.

# STATE OF THE ART

State of the Art milestones keep the player grounded in how capable AI has become. They are not cards. Each milestone appears on the **capability gauge** and as a small stamp on the timeline, at its **Date**, between the two cards on either side of that date. **Gauge** is the level the gauge moves to (Tools, Expert, AGI or Superintelligence), or `hold` if it stays where it is. The gauge starts at Expert in 2026. **Short definition** is shown on hover. The longer sections (What happened, What it means, How life changes) are shown only on the results screen. If a milestone has a **Condition**, it appears only when the player's Values meet it at that moment. Milestones that share a **Slot** are alternatives, and only the first whose condition is met appears. Effects apply when the milestone appears.

## sota-chips
**Headline:** A New Generation of Chips Cuts the Cost of Running AI Tenfold
**Timeline label:** Chips get 10x cheaper
**Date:** 2028
**Gauge:** hold
**Pace:** 1.15
**Short definition:** Cheaper, more efficient chips cut the cost of running AI, so it spreads into everyday products and larger systems become affordable to build.
**Because:**
- flag r1-lab/C | The antibiotic company you let expand in {year} was one of many racing to buy every chip it could, and chipmakers answered.
- flag r1-lab/A | The antibiotic AI you released openly in {year} showed what cheap computing could do, and chipmakers raced to supply it.
- flag r1-flaw/C | The power companies you gave AI to in {year} were among the first customers for the new chips.
- flag r1-trucks/A | Self-driving fleets like the ones you let onto Texas roads in {year} needed cheaper chips, and the industry delivered.
- flag r1-tutor/A | Schools running AI tutors, as you allowed in {year}, were part of the demand that pushed chip prices down.
- flag r1-lab/B | Arrived on schedule. The licenses you required for AI laboratories in {year} slowed the laboratories, not the chipmakers.
- flag r1-trucks/B | Arrived on schedule, though the drivers you kept in every truck in {year} meant one less market for the new chips.
- flag r1-trucks/C | Arrived on schedule. Sharing trucking's savings with its drivers, as you chose in {year}, did not slow the chipmakers.
- flag r1-election/A | Arrived on schedule. The watermark law you passed in {year} slowed AI video, not the chips beneath it.
- flag r1-election/B | The systems you let screen every post for fakes in {year} needed vast computing, and chipmakers raced to supply it.
- flag r1-tutor/C | Arrived on schedule, though the classrooms you kept free of AI in {year} were one market the new chips did not reach.
- flag r1-tutor/B | AI assistants in every classroom, as you chose in {year}, were part of the demand that pushed chip prices down.
- flag r1-flaw/B | The grid flaw you published in {year} sent every utility shopping for AI, and for the chips to run it.
- flag r1-flaw/A | Arrived on schedule. Keeping the grid AI locked away, as you chose in {year}, did not slow the chipmakers.
- flag r1-drones/B | The drones you chose to build in {year} were among the first customers for the new chips, and militaries everywhere followed.
- flag r1-agents/C | The money agents you let act freely in {year} ran on millions of phones, and that demand helped push chip prices down.
- flag r1-film/C | AI films like the ones you left unregulated in {year} needed vast computing, and chipmakers raced to supply it.
- flag r1-therapist/C | Free AI apps like the therapist you left alone in {year} ran on advertising and cheap computing, and chipmakers supplied it.
- flag r1-film/B | Arrived on schedule. The fee you charged on AI-made works in {year} raised what AI films cost, not what chips cost.
- flag r1-drones/A | Arrived on schedule. The treaty talks on drones you pushed for in {year} did not reach the chipmakers.
- default | Chipmakers had been making their chips more efficient every year for decades, and no single decision could have stopped this step.
**Effects:** power +1
**Image:**
**Image description:** Foreground: a technician in a white cleanroom suit and hood holds up a single silicon wafer to the yellow safety light, its surface shimmering in a pattern like a mandala. Middle ground: a long, spotless factory hall in Hsinchu lined with towering chipmaking machines, a few other suited figures moving slowly between them. Background: through a narrow window at the end of the hall, a gray morning breaking over green hills. No text or lettering.

**What happened:**
Factories in Taiwan, South Korea and Arizona begin mass-producing a new generation of AI chips. Combined with steady improvements in software, the new chips cut the cost of running an advanced AI system by roughly a factor of 10 in just two years.

**What it means:**
AI runs on specialized computer chips that perform enormous numbers of calculations at once. Each new generation packs more transistors into the same space and uses less energy for each calculation. When that cost falls, AI that was once affordable only to large companies becomes available to small businesses, schools and individuals, and developers can afford to build larger and more capable systems.

**How life changes:**
For most people, the change is invisible but everywhere. Phone assistants become noticeably smarter, customer service calls are answered instantly and AI tools appear in software that never had them. History suggests that when a resource becomes cheaper, people use far more of it, a pattern economists call the [Jevons paradox](https://en.wikipedia.org/wiki/Jevons_paradox). Demand for chips and for electricity keeps climbing.

## sota-assisted
**Added:** v5.5
**Headline:** AI Now Does Most of the Work of Building Its Successor
**Timeline label:** AI helps build AI
**Date:** 2028
**Shown:** always
**Gauge:** hold
**Pace:** 1.1
**Short definition:** At the leading laboratories, AI now writes most of the code and runs most of the experiments behind the next version of itself. People still choose what to try, and people decide what is released.
**Because:**
- flag r1-lab/C | The AI-run laboratories you let spread in {year} showed what AI could do with research, and the AI companies turned the same methods on themselves.
- flag r1-lab/B | The licenses you required in {year} slowed what laboratories could release, not what their AI could do inside them.
- default | Each version of AI was a better programmer than the last, and the laboratories put it to work on the next one.
**Effects:** (none)
**Image:**
**Image description:** Foreground: a young engineer in a hoodie sits at her desk at night with a pencil, reading a long printed report and circling one line. Middle ground: around her, rows of monitors fill with code that no one is typing, the cursor moving on its own, and a rack of laptops charges on a shelf. Background: a wall of windows over a city at night, one office tower lit from top to bottom. No text or lettering.

**What happened:**
Over the course of the year, the leading AI laboratories in San Francisco, London and Beijing report the same change. Their AI systems now write most of the code for the next version of themselves, design most of the experiments and run them overnight. The engineers spend their days choosing which results to pursue and checking what the machines have done.

**What it means:**
Researchers distinguish between AI that helps build AI and AI that improves itself. In the first, people still direct the research, choose its goals and approve every new system. In the second, which the laboratories call recursive self-improvement, the AI runs the research on its own and each new version arrives sooner than the last. The world has reached the first. Many researchers believe the second is only a few years away.

**How life changes:**
For most people, nothing changes yet. Inside the laboratories, a team of a few dozen engineers now does the work that once took thousands, and each new version of AI arrives a little sooner than the one before. Governments begin to ask how fast the laboratories should be allowed to go, and who would know if they went faster.

## sota-agi
**Headline:** Researchers Broadly Agree That AI Has Reached General Intelligence
**Timeline label:** AGI achieved
**Date:** 2029
**Gauge:** AGI
**Pace:** 1.3
**Short definition:** Artificial general intelligence is AI that can do nearly any intellectual task a skilled professional can, and learn new work on its own.
**Because:**
- flag r2-assisted/A | Reached on time. In {year} you let the research AIs improve themselves without waiting for anyone, and each new version came within weeks.
- flag r2-assisted/B | Reached on time, despite the sign-off you required in {year}. People approved each new version, and the versions kept coming.
- flag r2-datacenter/A | Reached on time. In {year} you chose to race for the biggest AI, and your rivals raced too.
- flag r2-datacenter/B | Reached on time, despite the *Tallinn Treaty* you proposed in {year}. Not every laboratory signed it.
- flag r2-datacenter/C | Reached on time, though you chose to slow down in {year}. Your rivals did not.
- flag r2-grid/A | Reached on time. You gave the data centers power before homes in {year}, and the largest systems never had to wait.
- flag r2-grid/C | Reached on time. In {year} you let AI redesign the energy system, and it found the power to train its successors.
- flag r2-offices/C | Reached on time. In {year} you let the owners keep AI's gains, and they spent much of them on bigger AI.
- flag r2-openmodel/B | Reached on time. You kept powerful AI free in {year}, and thousands of laboratories built on one another's work.
- flag r2-openmodel/C | Reached on time, though the global agency you created in {year} reviewed every model along the way.
- flag r2-clinics/A | Reached on time. AI clinics running on their own, as you allowed in {year}, gave the laboratories money and data to go further.
- flag r1-lab/C | Reached on time. The company you let expand in {year} became one of the laboratories that crossed the line.
- any flag r2-glasses/A, r2-glasses/C | Reached on time. The AI glasses you let spread in {year} made AI one of the most profitable businesses on earth, and the profits went into bigger systems.
- flag r2-glasses/B | Reached on time, though the limits you put on AI glasses in {year} cooled one of its richest markets.
- flag r2-deepfake/A | Reached on time. The AI you built in {year} to check every message needed systems nearly as capable as the ones it watched.
- flag r2-robots/A | Reached on time. Robots let into every home in {year} made AI a household business, and its makers richer than ever.
- any flag r2-robots/B, r2-robots/C | Reached on time, though the rules you set for robots in {year} slowed one of AI's biggest markets.
- flag r2-offices/B | Reached on time, though the law you passed in {year} to protect human jobs made AI less profitable at home. Rivals abroad kept spending.
- flag r2-offices/A | Reached on time. The AI tax that paid for your basic income in {year} took a share of the profits, not of the progress.
- any flag r2-clinics/B, r2-clinics/C | Reached on time. The AI clinics you allowed in {year} gave the laboratories some of the most valuable data in the world.
- flag r2-openmodel/A | Reached on time. The licensed companies you protected in {year} raced one another to the line.
- flag r2-grid/B | Reached on time, though the cap on AI's electricity you set in {year} sent the largest training runs abroad.
- flag r1-tutor/A | Reached on time. The children taught by AI since {year} were part of a market that paid for ever larger systems.
- flag r1-election/B | Reached on time. The systems you let police every feed in {year} grew into some of the largest AI ever trained.
- default | Spending on AI kept doubling, and the steady climb of the last decade carried it over the line on schedule.
**Slot:** general
**Condition:** brakes <= 1, not flag restraint, not flag pause
**Effects:** power +1
**Image:**
**Image description:** Foreground: in an ordinary open-plan office at noon, a radiologist, a paralegal and a programmer sit at three neighboring desks, each leaning back from a screen that has just finished their day's work, one of them holding a sandwich halfway to her mouth. Middle ground: behind them, coworkers drift toward the windows, talking quietly, a whiteboard wiped clean. Background: through the windows, the sun at its highest point over a city of glass towers and cranes. No text or lettering.

**What happened:**
There is no single announcement. Over several months, the leading AI systems pass a broad battery of tests designed by independent researchers. They diagnose patients, argue legal cases, write and debug complex software and design experiments at the level of skilled professionals, and they learn new kinds of work without being rebuilt for each one. By the end of the year, most researchers agree that the line has been crossed.

**What it means:**
Artificial general intelligence, or AGI, is usually defined as an AI system that can perform nearly any intellectual task a skilled human professional can, at or above expert level, and can learn unfamiliar tasks on its own. Earlier systems were brilliant at narrow jobs. AGI can do almost any job that can be done at a computer.

**How life changes:**
Daily life changes more slowly than the headlines suggest. Companies take years to reorganize around the new systems, and laws lag further behind. But the direction is clear. Most office work can now be automated in principle, and the question for every profession shifts from whether AI can do the work to whether anyone will let it. Physical work changes more slowly, because robots still lag behind the software.
**Ahead:**
- flag r2-assisted/A | Expected on time. The research AIs you let run on their own in {year} are turning out a new version every few weeks.
- flag r2-assisted/B | Expected on time, despite the sign-off you required in {year}. People approve each new version, and the versions keep coming.
- flag r2-datacenter/A | Expected on time. You chose to race in {year}, and your rival is racing too.
- flag r2-datacenter/C | Expected on time, though you chose to slow down in {year}. Your rivals have not.
- flag r1-lab/C | Expected on time. Companies like the one you let expand in {year} are pouring their profits into bigger AI.
- flag r1-lab/B | Expected on time. The licenses you required in {year} slow what laboratories release, not what their AI can do inside them.
- default | Expected on time. Spending on AI keeps doubling, and nothing chosen so far has slowed it enough to matter.

## sota-agi-late
**Added:** v5.1
**Headline:** AI Reaches General Intelligence, Two Years Later Than Its Builders Promised
**Timeline label:** AGI, two years late
**Date:** 2031
**Gauge:** AGI
**Pace:** 1.2
**Short definition:** Artificial general intelligence is AI that can do nearly any intellectual task a skilled professional can, and learn new work on its own. It arrived later and more quietly than predicted.
**Because:**
- flag r2-assisted/B | Two years late. The sign-off you required in {year} made every new version wait for a person.
- flag r2-datacenter/C | Two years later than promised. In {year} you chose to slow down and protect what was real, and the laboratories had less to spend.
- flag r2-datacenter/B | Two years late. The safety research you shared in {year} slowed everyone a little, rivals included.
- flag r2-grid/B | Two years late. In {year} you capped how much power AI could use, and the largest training runs had to wait.
- flag r2-offices/B | Two years late. The law you passed in {year} to protect human jobs made AI less profitable to build.
- flag r2-openmodel/C | Two years late. The global agency you created in {year} reviewed every powerful model before it ran.
- flag r2-robots/C | Two years late. The robot tax you chose in {year} slowed the money flowing into automation.
- flag r1-lab/B | Two years late. The licenses and safety reviews you required in {year} became the rule for every laboratory.
- flag r2-offices/A | Two years late. The AI tax that paid for your basic income in {year} left the laboratories less to spend.
- flag r2-openmodel/A | Two years late. Banning free models, as you chose in {year}, left fewer laboratories in the race.
- flag r1-election/A | Two years late. The watermark law you passed in {year} was the first of many rules that slowed every laboratory a little.
- any flag r1-trucks/B, r1-trucks/C | Two years late. Protections like the ones you chose for Texas truckers in {year} made automation slower to pay off, and slower to fund.
- flag r2-glasses/B | Two years late. The limits you put on AI glasses in {year} cooled one of the richest markets for AI.
- flag r1-tutor/C | Two years late. Keeping AI out of classrooms, as you chose in {year}, was one of many choices that made the world slower to adopt it.
- flag r2-datacenter/A | Two years late, despite the race you joined in {year}. Costs and data ran short before money did.
- default | Two years later than promised, slowed by rising costs and a shortage of new data to learn from.
**Slot:** general
**Condition:** not flag r2-assisted/C
**Effects:** power +1
**Image:**
**Image description:** Foreground: a tired engineer in a hoodie sits on the floor of a server room at dawn, leaning against a rack, a cold cup of coffee beside her and a small smile on her face. Middle ground: a screen on the rack shows a simple green check mark beside a long column of passed tests. Background: a high window where the first gray light of morning is coming in. No text or lettering.

**What happened:**
The deadlines pass in 2029 and again in 2030, and investors grow restless. Then, over a few months in 2031, the leading systems pass the same broad battery of tests their predecessors failed, diagnosing patients, arguing legal cases and designing experiments at the level of skilled professionals, and learning new work without being rebuilt for each job. There is no celebration. Most researchers simply agree that it has happened.

**What it means:**
Artificial general intelligence, or AGI, is usually defined as an AI system that can perform nearly any intellectual task a skilled human professional can, and can learn unfamiliar tasks on its own. The delay changed little about what it is. It changed a great deal about how ready the world was for it, since governments and schools had two more years to prepare.

**How life changes:**
Because it arrives late and without fanfare, AGI spreads first through the offices and laboratories that were already using its predecessors. Most office work can now be automated in principle. The questions that were urgent in 2029 return, a little less urgent, and a little better understood.
**Ahead:**
- flag r2-assisted/B | Expected two years late. The sign-off you required in {year} makes every new version wait for a person.
- flag r2-datacenter/C | Expected two years late. You chose to slow down in {year}, and the laboratories have less to spend.
- flag r2-datacenter/B | Expected two years late. The agreement you made in {year} holds both sides to what inspectors can check.
- flag r1-lab/B | Expected two years late. The licenses you required in {year} have slowed every laboratory that needs one.
- default | Expected two years late. The brakes you have put on AI are slowing it, though not enough to stop it.

## sota-agi-geneva
**Added:** v6.0
**Headline:** AI Reaches General Intelligence Three Years Late, Once the Laboratories Start Again
**Timeline label:** AGI, three years late
**Date:** 2032
**Gauge:** AGI
**Pace:** 1.2
**Short definition:** Artificial general intelligence is AI that can do nearly any intellectual task a skilled professional can, and learn new work on its own. It arrived three years later than predicted, held back by the halt on training.
**Because:**
- flag r3-geneva/C | Three years late. The halt you called for in 2028 held until you refused the *Geneva Compute Treaty* in {year}, and the laboratories started again where they had stopped.
- default | Three years late. The halt on training held the laboratories back for three years, and when it ended they started again where they had stopped.
**Slot:** general
**Condition:** flag r2-assisted/C, not flag pause
**Effects:** power +1
**Image:**
**Image description:** Foreground: an engineer in a fleece jacket peels a faded paper notice off the glass door of a server hall, the tape yellowed from three years in the sun. Middle ground: inside, colleagues switch racks back on one by one, the status lights coming up green along the aisle. Background: a parking lot filling with cars again on an early spring morning, a delivery truck backing up to the loading dock. No text or lettering.

**What happened:**
In 2032, a year after the halt on training ended, the leading systems pass the broad battery of tests their predecessors failed, diagnosing patients, arguing legal cases and designing experiments at the level of skilled professionals, and learning new work without being rebuilt for each job. The training runs that produced them were the ones stopped in 2028, restarted almost unchanged.

**What it means:**
Artificial general intelligence, or AGI, is usually defined as an AI system that can perform nearly any intellectual task a skilled human professional can, and can learn unfamiliar tasks on its own. The halt changed little about what it is. It gave governments and schools three more years to prepare.

**How life changes:**
AGI spreads first through the offices and laboratories that kept using its predecessors during the halt. Most office work can now be automated in principle, and the arguments that filled the hall in Geneva move to every parliament.
**Ahead:**
- flag geneva_pending | Expected three years late, if the halt ends. The halt you called for in {year} holds until the world agrees on rules.
- flag r3-geneva/C | Expected three years late. Since you refused the treaty in {year}, the laboratories have restarted where they stopped.
- default | Expected three years late. The halt on training has cost the laboratories three years.

## sota-agi-lifted-early
**Added:** v6.0
**Headline:** Two Years After the Pause Ends, AI Reaches General Intelligence
**Timeline label:** AGI, after the pause
**Date:** 2044
**Gauge:** AGI
**Pace:** 1.2
**Short definition:** Artificial general intelligence is AI that can do nearly any intellectual task a skilled professional can, and learn new work on its own. The pause held it back for years. When the limit on training was lifted, the laboratories finished what they had stopped.
**Because:**
- flag lifted | You chose to leave the pause in {year}, and the laboratories finished the systems they had stopped building.
- flag r6-cap/B | The cap you raised in stages in {year} let the laboratories finish the systems they had stopped building, one inspected step at a time.
- flag relaunch | The climb you restarted in {year} reached what the pause had held back.
- default | Once the limit on training was lifted, the laboratories finished the systems they had stopped building.
**Slot:** general
**Condition:** capability <= Expert, any flag lifted, r6-cap/B, relaunch, pace not held
**Effects:** power +1
**Image:**
**Image description:** Foreground: an inspector in a plain coat peels a numbered tamper seal off the doors of a data center hall, the seal faded and curling at the edges. Middle ground: engineers walking past her into the hall carrying laptops and coffee, the racks inside lit and humming again. Background: through a window at the end of the corridor, a city street on a weekday morning, buses and cyclists passing in the rain. No text or lettering.

**What happened:**
Two years after the limit on training was lifted, the leading systems pass the broad battery of tests their predecessors failed, diagnosing patients, arguing legal cases and designing experiments at the level of skilled professionals, and learning new work without being rebuilt for each job. Most of the designs had been waiting since the pause began.

**What it means:**
Artificial general intelligence, or AGI, is usually defined as an AI system that can perform nearly any intellectual task a skilled human professional can, and can learn unfamiliar tasks on its own. The pause did not change what it is. It changed the world it arrived in, which had spent years learning to live with the AI it already had.

**How life changes:**
AGI spreads first through the offices and laboratories that had used the paused systems for years. Most office work can now be automated in principle, and the questions the pause had put off arrive all at once.
**Ahead:**
- flag lifted | Expected two years after the pause ends. You chose to leave it in {year}, and the laboratories are finishing what they had stopped.
- default | Expected two years after the limit on training is lifted.

## sota-cheap
**Headline:** An Hour of Expert-Level AI Now Costs Less Than a Cup of Coffee
**Timeline label:** Intelligence gets cheap
**Date:** 2033
**Gauge:** hold
**Pace:** 1.1
**Short definition:** Expert-level AI work now costs so little that almost anyone, anywhere, can use it.
**Because:**
- flag r3-firstagi/A | Releasing general AI to everyone at cost, as you chose in {year}, drove its price toward nothing.
- flag r3-firstagi/B | Even under the licenses you chose in {year}, competition between the license holders drove prices down.
- flag r3-companies/A | The AI giants you let fund governments in {year} cut their prices to win every market.
- flag r3-splinternet/A | The race you joined in {year} pushed both sides to build more computing than they could use.
- flag r2-openmodel/B | Free AI, which you protected in {year}, kept undercutting the companies that charged for it.
- flag r3-estonia/C | An AI running Estonia's economy from {year} needed cheap computing, and helped drive its price down.
- flag r2-grid/A | The data centers you gave power to in {year} grew so large that computing became nearly free.
- any flag r2-glasses/A, r2-glasses/C | The AI glasses you let spread in {year} put AI in a billion pockets, and mass production made it cheap.
- flag r3-companies/B | The AI companies you broke up in {year} competed on price, and prices collapsed.
- flag r3-companies/C | Governments that owned the AI companies from {year} on sold their services at cost.
- flag r3-dividend/C | Free AI services for every citizen, as you chose in {year}, pushed the price of AI toward nothing.
- default | Each new generation of chips and software made the last one cheaper, as it had for decades.
**Effects:** (none)
**Image:**
**Image description:** Foreground: a fruit seller in Lagos sits behind her stall with an inexpensive phone, speaking to an AI assistant that is doing her accounts, while a schoolboy at her elbow asks his own phone for help with his homework. Middle ground: a busy market lane of awnings, motorbikes and shoppers, nearly everyone holding a phone. Background: the low skyline of the city under a hazy afternoon sun, satellite dishes and solar panels on the rooftops. No text or lettering.

**What happened:**
The price of an hour of expert-level AI work has fallen roughly a thousandfold since 2026.

## sota-rsi
**Added:** v5.4
**Headline:** AI Begins Improving Itself, and Each Version Arrives Faster Than the Last
**Timeline label:** Recursive self-improvement
**Date:** 2032
**Gauge:** Self-improving
**Pace:** 1
**Growth:** 0.03
**Slot:** rsi
**Short definition:** Recursive self-improvement is AI that designs, trains and tests its own successor, so each version arrives sooner, and more capable, than the one before.
**Because:**
- flag r2-assisted/A | In {year} you let the research AIs improve themselves without a person signing off. Four years later no one was directing the research at all.
- flag r2-datacenter/A | In {year} you let your own AI help build its successor. By 2032 it was doing all of the work.
- flag r3-nobel/A | You let AI do the science in {year}, and the next thing it studied was itself.
- flag r3-splinternet/A | The race you joined in {year} gave both sides a reason to let their AI build the next one.
- any flag r4-chips/A, r4-chips/C | The chips you secured in {year} went to the laboratories, and the laboratories gave them to their AI.
- flag r3-companies/A | The AI giants you freed from new laws in {year} put their best systems to work on building better ones.
- flag r3-firstagi/A | General AI, released to everyone in {year}, was improved by millions of people, and then by itself.
- flag r2-grid/A | The power you guaranteed the data centers in {year} kept the largest systems running day and night.
- flag r1-lab/C | The AI-run laboratories you let spread in {year} showed that AI could run research, including its own.
- flag r2-offices/C | The owners who kept AI's gains from {year} on spent them on systems that could build their successors.
- default | No one slowed the race, so the laboratories turned their best systems on the hardest problem left, which was building better AI.
**Condition:** capability >= AGI, brakes <= 1, not flag restraint, not flag pause, not flag paced, not flag r2-assisted/C
**Effects:** power +1
**Image:**
**Image description:** Foreground: a night security guard with a flashlight walks through an empty AI laboratory at three in the morning, every chair empty and every monitor busy. Middle ground: on the largest screen, a spiral of nested squares turns slowly inward, each square smaller and brighter than the one before. Background: through a glass wall, a server hall whose blue lights blink faster than the guard's footsteps, and beyond it a dark city. No text or lettering.

**What happened:**
In 2032, the leading laboratories stop directing the research behind their newest systems. Their AI designs the next version, trains it, tests it and hands over to it, and the new version does the same, a little faster. The engineers who once chose what to try now spend most of their time watching the measurements climb.

**What it means:**
Recursive self-improvement is the long-predicted moment when AI becomes good enough at AI research to improve itself, so that each improvement brings the next one sooner. Researchers have warned for decades that such a loop, sometimes called an [intelligence explosion](https://en.wikipedia.org/wiki/Technological_singularity), could carry AI far beyond human ability in a short time.

**How life changes:**
For most people, nothing changes yet. For the laboratories and the governments watching them, everything does. Each month's system is better than the last, the forecasts for when AI will outthink its makers shrink from decades to a few years, and who controls the loop becomes the most important question in the world.
**Ahead:**
- flag r4-selfimprove/A | Expected on schedule. In {year} you let AI design its own successors as fast as it could.
- flag r2-assisted/A | Expected on schedule. The research AIs you let run on their own in {year} already do most of the work of building the next version.
- flag r2-datacenter/A | Expected on schedule. The race you joined in {year} rewards whoever lets AI build AI first.
- default | Expected on schedule. AI already does most of the work of building its successor, and nothing you have chosen has paced it.

## sota-rsi-resumed
**Added:** v6.0
**Headline:** Three Years Behind the Old Forecasts, AI Begins Improving Itself
**Timeline label:** Self-improvement, three years late
**Date:** 2035
**Gauge:** Self-improving
**Pace:** 1
**Growth:** 0.03
**Slot:** rsi
**Counts as:** sota-rsi
**Short definition:** Recursive self-improvement is AI that designs, trains and tests its own successor, so each version arrives sooner, and more capable, than the one before. The halt on training delayed it by three years.
**Because:**
- flag r3-geneva/C | You refused the *Geneva Compute Treaty* in {year}, and the laboratories raced to make up the three years the halt had cost them. The fastest way was to let AI build its successors.
- default | The laboratories raced to make up the three years the halt had cost them, and the fastest way was to let AI build its successors.
**Condition:** capability >= AGI, flag r2-assisted/C, brakes <= 1, not flag restraint, not flag pause, not flag paced
**Effects:** power +1
**Image:**
**Image description:** Foreground: a night security guard with a flashlight walks through an empty AI laboratory at three in the morning, every chair empty and every monitor busy, a calendar on the wall still showing a month from three years ago. Middle ground: on the largest screen, a spiral of nested squares turns slowly inward, each square smaller and brighter than the one before. Background: through a glass wall, a server hall whose blue lights blink faster than the guard's footsteps, and beyond it a dark city. No text or lettering.

**What happened:**
In 2035, three years later than the fastest forecasts made before the halt, the leading laboratories stop directing the research behind their newest systems. Their AI designs the next version, trains it, tests it and hands over to it, and the new version does the same, a little faster.

**What it means:**
Recursive self-improvement is the long-predicted moment when AI becomes good enough at AI research to improve itself, so that each improvement brings the next one sooner. Researchers have warned for decades that such a loop, sometimes called an [intelligence explosion](https://en.wikipedia.org/wiki/Technological_singularity), could carry AI far beyond human ability in a short time.

**How life changes:**
For most people, nothing changes yet. For the laboratories and the governments watching them, everything does. The years the halt bought are spent, and who controls the loop becomes the most important question in the world.
**Ahead:**
- flag r3-geneva/C | Expected three years late. Since you refused the treaty in {year}, the laboratories are racing to make up the time the halt cost them.
- default | Expected three years late. The halt cost the laboratories three years, and they are racing to make them up.

## sota-robots
**Headline:** General-Purpose Robots Finally Match Human Dexterity
**Timeline label:** Robots catch up
**Date:** 2034
**Shown:** always
**Gauge:** hold
**Pace:** 1.1
**Slot:** robots
**Condition:** reached sota-agi
**Short definition:** Robots can now handle everyday physical tasks as well as most people, so automation reaches beyond the screen.
**Because:**
- flag r2-robots/A | You let robots into homes and hospitals in {year}, and millions of them taught their makers what hands need to do.
- flag pause | The pause of {year} stopped AI from growing more capable, not robot makers from using what it already knew. By 2034 it could guide a robot's hands.
- flag r2-robots/C | Taxed as you chose in {year}, robots still improved, because the AI guiding them did.
- flag r2-robots/B | Every robot had a person responsible for it, as you required in {year}, and their makers built them carefully enough to earn that trust.
- flag r3-companies/A | The AI giants you let fund governments in {year} poured their profits into robotics.
- flag r1-trucks/A | The self-driving trucks you let roll in {year} were the first robots most people saw. By 2034 robots had hands.
- flag r3-companies/C | The governments that owned the AI companies after {year} put them to work on robots for hospitals and care homes.
- flag r3-companies/B | The companies you broke up in {year} competed fiercely, and robots were the prize.
- flag r3-firstagi/A | General AI, released to everyone in {year}, learned to guide a robot's hands within three years.
- any flag r3-firstagi/B, r3-firstagi/C | The general AI shared out in {year} learned to guide a robot's hands within three years.
- flag r3-finland/A | Finland's turn to making things by hand, which you chose in {year}, came just as robots learned to do it too.
- flag r3-drones/A | The autonomous drones you built in {year} taught machines to move through the physical world.
- reached sota-rsi | AI that improved itself solved in months the problem of dexterity that had stalled robot makers for decades.
- default | General AI arrived in 2029, and the work that followed moved quickly. Five years later it could guide a robot's hands as well as a person can.
**Effects:** (none)
**Image:**
**Image description:** Foreground: in an ordinary apartment kitchen, a plain gray robot with padded hands unloads a dishwasher, holding a wine glass very carefully, while a boy does his homework at the table without looking up. Middle ground: a living room with toys on the rug, a television on, and a cat watching the robot from the back of the sofa. Background: through the window, the lit windows of the apartment block across the street, a robot visible in one of them hanging laundry. No text or lettering.

**What happened:**
Robots can now fold laundry, repair plumbing and cook a meal as well as most people.

## sota-robots-late
**Added:** v5.2
**Headline:** Years Behind the Software, Robots Finally Match Human Hands
**Timeline label:** Robots catch up, late
**Date:** 2039
**Shown:** always
**Gauge:** hold
**Pace:** 1.05
**Slot:** robots
**Counts as:** sota-robots
**Condition:** not flag r3-geneva/A, not flag r3-geneva/B
**Short definition:** Robots can now handle everyday physical tasks as well as most people, a few years later than the fastest forecasts, because the AI that guides them arrived later.
**Because:**
- flag r2-robots/B | Later than forecast. The rule you set in {year}, a named person responsible for every robot, made their makers cautious.
- flag r2-robots/C | Later than forecast. The robot tax you chose in {year} made every robot cost more to sell.
- flag r3-companies/B | Later than forecast. The AI companies you broke up in {year} were too small to fund the robots alone.
- flag r3-firstagi/C | Later than forecast. The international laboratory you created in {year} moved carefully, and robots waited for it.
- flag r2-datacenter/C | Later than forecast. Slowing down, as you chose in {year}, delayed the AI that robots needed.
- any flag r2-grid/B, r2-offices/B, r1-lab/B | Later than forecast. The limits you set on AI in {year} slowed the software that guides robots' hands.
- flag r3-nobel/B | Later than forecast. Checking every AI discovery, as you required in {year}, slowed the science behind robot hands.
- default | The software that guides a robot's hands improved more slowly than forecast, and the robots followed it, years late.
**Effects:** (none)
**Image:**
**Image description:** Foreground: on a muddy building site, a robot in a scuffed high-visibility vest carries a stack of lumber beside two human carpenters, one of whom is pointing where to set it down. Middle ground: the timber frame of a row of houses going up, a cement mixer turning and a site trailer with its door open. Background: a suburban hillside of finished houses under a bright, windy sky. No text or lettering.

**What happened:**
Robots can now fold laundry, repair plumbing and cook a meal as well as most people. The hardware had been ready for years. What held it back was the software that lets a machine understand an unfamiliar kitchen, and that software arrived late.

## sota-held
**Added:** v5.4
**Headline:** The Worldwide Pause Holds, and AI Stays Where It Was
**Timeline label:** The pause holds
**Date:** 2035
**Sets pace:** held
**Gauge:** hold
**Slowdown:** yes
**Pace:** 0.05
**Short definition:** AI could still grow far more capable, but the world has agreed to stop it here. The pause holds, the laboratories that kept going in secret have fallen behind, and AI stays where it was when the pause began.
**Because:**
- flag r3-geneva/A | The halt you called for in 2028 became the *Geneva Compute Treaty* when you signed it in {year}, and it held.
- flag r3-geneva/B | The halt became the *Geneva Compute Treaty* when you signed it in {year}. Only medicine and defense may build stronger systems, and everywhere else the line held.
- flag ev-vienna | The *Vienna Pause Treaty*, signed in {year}, held. Inspectors found the laboratories that tried to cheat, and none got far.
- flag r4-selfimprove/C | You called for a worldwide pause in {year} and paused first, and the world followed. The pause held.
- flag r5-moratorium/A | The *Geneva Compute Treaty* you signed in {year} opened every large data center to inspectors, and the pause held.
- flag pause | The treaty you signed in {year} froze the largest systems where they were.
- default | The pause held. The laboratories that kept working in secret could not build the next leap without the world's chips and power.
**Slot:** super
**Condition:** flag pause
**Image:**
**Image description:** Foreground: an inspector in a plain coat presses a numbered tamper seal across the double doors of a data center hall, the lights inside already dimmed. Middle ground: behind the glass doors, rows of servers sitting quiet, a few status lights still blinking. Background: through a window at the end of the corridor, a park on a sunny afternoon, children on a climbing frame and a couple on a bench. No text or lettering.

**What happened:**
The world agreed to stop training more powerful AI, and the pause still holds. Inspectors visit the largest data centers, and chipmakers report every large order. The laboratories that kept working in secret have been found, and none got far. Without the world's chips, power and engineers, no rival working alone could build the next leap.

**What it means:**
Artificial superintelligence, or ASI, refers to AI that far exceeds the best human minds in virtually every domain. Nothing in the science rules it out, and the newest systems showed how close it was. The world has decided, for now, not to find out. The most capable systems match or exceed experts at many tasks, and people can still understand, check and direct their work.

**How life changes:**
Doctors, engineers and scientists work alongside AI and remain responsible for the most important decisions. The pause is argued over every year, by those who count the cures it delays and by those who remember how fast the machines were moving when it began.
**Ahead:**
- flag r3-geneva/A | Expected to stop here. The *Geneva Compute Treaty* you signed in {year} made the halt permanent.
- flag r3-geneva/B | Expected to stop here, except in medicine and defense. The *Geneva Compute Treaty* you signed in {year} made the halt permanent everywhere else.
- flag r4-selfimprove/C | Expected to stop here. The worldwide pause you called for in {year} is holding AI where it was when the pause began.
- flag r5-moratorium/A | Expected to stop here. The *Geneva Compute Treaty* you signed in {year} has opened every data center to inspectors.
- default | Expected to stop here, for as long as the pause holds.

## sota-unheld
**Added:** v5.7
**Headline:** The AI Pause Ends, and the Laboratories Race to Make Up Lost Time
**Timeline label:** The pause is lifted
**Date:** 2047
**Shown:** always
**Sets pace:** racing
**Gauge:** hold
**Pace:** 24
**Slot:** lift
**Condition:** reached sota-held, flag lifted
**Short definition:** The pause that held AI at the line has ended, and the largest laboratories are training more powerful systems again, as fast as chips and power allow.
**Because:**
- flag r6-cap/C | You let the treaty expire in {year}, and the laboratories it had held back started the same week.
- flag r5-defense/C | You backed stronger AI everywhere in {year}, and the laboratories the pause had held back started the same week.
- default | The pause ended, and the laboratories it had held back started the same week.
**Effects:** (none)
**Image:**
**Image description:** Foreground: a data center technician in a fleece and a lanyard slides a new rack of servers into place, a coffee going cold on a cart beside her. Middle ground: a long aisle of server cabinets, half of them newly lit, cables still coiled on the floor. Background: through a loading bay door, trucks unloading crates of chips at dusk under sodium lights. No text or lettering.

**What happened:**
The pause that capped the training of powerful AI has ended after 14 years. Within weeks, the largest laboratories began training systems far larger than the cap had allowed, on chips they had stockpiled while they waited.

**What it means:**
For as long as the pause held, AI stayed as capable as it was when the pause began. Now it is climbing again, from where it stopped, and nothing in the science says how far it will go.

**How life changes:**
New tools arrive every few months, as they did before the pause. Doctors and engineers who had spent years learning the old systems start again, and the arguments that came before the pause return.

## sota-unheld-paced
**Added:** v5.7
**Headline:** The AI Cap Rises for the First Time, One Inspected Step at a Time
**Timeline label:** The cap rises in stages
**Date:** 2047
**Shown:** always
**Sets pace:** paced
**Gauge:** hold
**Pace:** 10
**Slot:** lift
**Condition:** reached sota-held, flag r6-cap/B, not flag lifted
**Short definition:** The treaty that held AI at the line now lets it grow, one inspected step at a time, so AI is improving again, but slowly.
**Because:**
- flag r6-cap/B | You raised the cap in stages in {year}, and inspectors approved the first step.
- default | The cap was raised in stages, and inspectors approved the first step.
**Effects:** (none)
**Image:**
**Image description:** Foreground: two inspectors in parkas compare readings on tablets beside a fenced chip warehouse, one of them stamping a paper form on the hood of a car. Middle ground: a modest data center with a single new wing under construction, a crane idle beside it. Background: a gray Vienna suburb in late winter, tram lines and bare trees. No text or lettering.

**What happened:**
Inspectors approved the first increase in the cap on training powerful AI since 2033. Laboratories may now train systems somewhat larger than before, and each later step will need the inspectors' approval.

**What it means:**
AI is improving again, but in steps small enough for people to check, much as it did before the pause and more slowly than it would without one.

**How life changes:**
The new systems arrive a step at a time, and each is tested before the next is allowed. Most people notice the change only in better medicines and cheaper goods.

## sota-unheld-early
**Added:** v5.9
**Headline:** America Leaves the AI Pause, and Its Laboratories Race to Make Up Lost Time
**Timeline label:** The pause is broken
**Date:** 2042
**Shown:** always
**Sets pace:** racing
**Gauge:** hold
**Pace:** 24
**Slot:** lift
**Condition:** reached sota-held, flag lifted
**Short definition:** The United States has left the worldwide pause, and its largest laboratories are training more powerful systems again, as fast as chips and power allow. Its rivals are following.
**Because:**
- flag r4-letitrun/C | You took the country out of the pause in {year}, and its laboratories started the day the notice ran out.
- default | The pause was broken, and the laboratories it had held back started the same week.
**Effects:** (none)
**Image:**
**Image description:** Foreground: a data center technician in a hooded sweatshirt unboxes a new server blade on a cart, packing foam scattered at her feet. Middle ground: a long aisle of server racks being powered on one by one, their status lights turning green. Background: through an open loading bay, a line of trucks waiting in the Arizona desert at sunrise. No text or lettering.

**What happened:**
Six months after giving notice, the United States left the worldwide pause on training more powerful AI. Its largest laboratories began training systems far larger than the pause had allowed, and two allies left with it.

**What it means:**
For years AI stayed about as capable as it was when the pause began. Now it is climbing again, from where it stopped, and the countries still inside the pause must decide whether to follow.

**How life changes:**
New tools arrive every few months, as they did before the pause. The arguments that came before it return, louder.

## sota-unheld-late
**Added:** v5.9
**Headline:** The Limit on AI Is Lifted in Every Field, and the Laboratories Start the Same Week
**Timeline label:** The limit is lifted
**Date:** 2055
**Shown:** always
**Sets pace:** racing
**Gauge:** hold
**Pace:** 24
**Slot:** lift
**Condition:** reached sota-held, flag lifted
**Short definition:** The worldwide limit on more powerful AI has been lifted, and the laboratories are training larger systems again, as fast as chips and power allow.
**Because:**
- flag r6-climateai/C | You backed stronger AI in every field in {year}, with climate first in line, and the limit came down for all of them.
- default | The limit was lifted, and the laboratories it had held back started the same week.
**Effects:** (none)
**Image:**
**Image description:** Foreground: a construction worker in a hard hat guides a crane lowering a cooling unit onto the roof of a new data center, a radio clipped to her vest. Middle ground: rows of solar panels and battery containers stretching across a dry plain. Background: a second data center hall already lit, under a hot white sky in Nevada. No text or lettering.

**What happened:**
The limit that held AI at the line for more than twenty years has been lifted in every field. Within weeks, laboratories began training systems far larger than any the limit had allowed.

**What it means:**
AI is climbing again, from where it stopped in 2033, and no one knows how quickly it will make up the lost years.

**How life changes:**
For now, little. The new systems are still being trained, and most people are waiting to see what they will be.

## sota-open-geneva
**Added:** v6.0
**Headline:** Under the Geneva Treaty's Exemptions, Stronger AI Goes to Work in Medicine and Defense
**Timeline label:** Two fields opened
**Date:** 2036
**Shown:** always
**Sets pace:** paced
**Gauge:** hold
**Pace:** 4
**Slot:** open
**Short definition:** Under the *Geneva Compute Treaty*, only medicine and defense may train AI more capable than the systems of 2028, and every such system is inspected. The first of them are now at work.
**Because:**
- flag r3-geneva/B | The exemptions you won in Geneva in {year} let drug companies and defense ministries build the only AI allowed to grow, and the first of it went to work.
- default | The treaty's exemptions let drug companies and defense ministries build the only AI allowed to grow, and the first of it went to work.
**Condition:** flag r3-geneva/B, reached sota-held
**Effects:** (none)
**Image:**
**Image description:** Foreground: a pharmacologist in a lab coat holds a vial up to the light in a hospital research laboratory, a printout of a molecular structure clipped to a board beside her. Middle ground: an inspector with a clipboard and a visitor's badge talks with a technician beside a locked server cabinet. Background: through a window, a military radar dome on a distant hill under a clear sky. No text or lettering.

**What happened:**
In 2036, five years after the *Geneva Compute Treaty* took effect, the first AI systems trained beyond its limit go to work, both under its exemptions. One designs drug candidates for a group of European and Indian drug companies. The other runs inside military data centers that inspectors may visit, count and seal, but not question.

**What it means:**
Everywhere else, AI stays where it was when the halt began. Two fields now have systems more capable than anything the public can use, built under rules that let inspectors count the chips but not judge what the systems can do.

**How life changes:**
The first drugs designed under the exemption enter trials. Defense budgets grow, and so does the line of other industries asking for exemptions of their own.
**Ahead:**
- default | Expected to grow only in medicine and defense, under inspection, while the rest of AI stays where it was.

## sota-open-early
**Added:** v5.9
**Headline:** The First AI Allowed Beyond Today's Systems Goes to Work, in One Field Only
**Timeline label:** One field opened
**Date:** 2042
**Shown:** always
**Sets pace:** paced
**Gauge:** hold
**Pace:** 4
**Slot:** open
**Condition:** any flag exempt_medicine, exempt_defense, exempt_climate
**Short definition:** One field now has AI more capable than anything else allowed, under inspectors who watch it is used for nothing else. Everywhere else, AI stays where it was.
**Because:**
- flag exempt_medicine | You opened the way for medical AI in {year}, and the first system built beyond the old limit went to work on drug design.
- flag exempt_defense | You freed the defense systems in {year}, and the first of them went on duty.
- flag exempt_climate | You allowed one stronger system for climate work in {year}, and it went to work on carbon removal.
- default | One field was given AI beyond the rest, and it went to work.
**Effects:** (none)
**Image:**
**Image description:** Foreground: an inspector in a plain gray coat checks a numbered seal on a locked server cabinet, a clipboard under her arm. Middle ground: a small, brightly lit research lab where two chemists in lab coats watch molecules turning on a wall screen. Background: through a window, an ordinary office park at lunchtime, people eating on benches. No text or lettering.

**What happened:**
The first AI system trained beyond the old limit has gone to work, in one field only, with inspectors on site to make sure it does nothing else.

**What it means:**
AI is growing again, but in one place. The other fields that want the same exemption have already begun to apply.

**How life changes:**
For most people, not at all yet. The difference will show first in the one field that was opened.

## sota-open
**Added:** v5.9
**Headline:** The First AI Allowed Beyond Today's Systems Goes to Work, in One Field Only
**Timeline label:** One field opened
**Date:** 2047
**Shown:** always
**Sets pace:** paced
**Gauge:** hold
**Pace:** 4
**Slot:** open
**Condition:** any flag exempt_medicine, exempt_defense, exempt_climate
**Short definition:** One field now has AI more capable than anything else allowed or paid for, and inspectors watch that it is used for nothing else. Everywhere else, AI stays where it was.
**Because:**
- flag exempt_defense | You freed the defense systems in {year}, and the first of them went on duty.
- flag exempt_medicine | You paid for medical AI alone in {year}, and the first system built beyond the rest went to work on drug design.
- flag exempt_climate | You allowed one stronger system for climate work in {year}, and it went to work on carbon removal.
- default | One field was given AI beyond the rest, and it went to work.
**Effects:** (none)
**Image:**
**Image description:** Foreground: an inspector in a plain gray coat checks a numbered seal on a locked server cabinet, a clipboard under her arm. Middle ground: a windowless operations room where officers in uniform sit before rows of quiet screens. Background: through a doorway, an ordinary corridor with a vending machine and a notice board. No text or lettering.

**What happened:**
The first AI system built beyond everything else now running has gone to work, in one field only, with inspectors on site to make sure it does nothing else.

**What it means:**
AI is growing again, but in one place. The other fields that want the same treatment have already begun to apply.

**How life changes:**
For most people, not at all yet. The difference will show first in the one field that was opened.

## sota-open-late
**Added:** v5.9
**Headline:** The First AI Allowed Beyond Today's Systems Goes to Work, in One Field Only
**Timeline label:** One field opened
**Date:** 2055
**Shown:** always
**Sets pace:** paced
**Gauge:** hold
**Pace:** 4
**Slot:** open
**Condition:** any flag exempt_medicine, exempt_defense, exempt_climate
**Short definition:** One field now has AI more capable than anything else allowed or paid for, and inspectors watch that it is used for nothing else. Everywhere else, AI stays where it was.
**Because:**
- flag exempt_climate | You allowed one stronger system for climate work in {year}, and it went to work on carbon removal.
- flag exempt_defense | You freed the defense systems in {year}, and the first of them went on duty.
- flag exempt_medicine | You opened the way for medical AI in {year}, and the first system built beyond the rest went to work on drug design.
- default | One field was given AI beyond the rest, and it went to work.
**Effects:** (none)
**Image:**
**Image description:** Foreground: an inspector in a rain jacket checks a numbered seal on a locked server cabinet in a cool hall beside Lake Geneva, a clipboard under her arm. Middle ground: climate scientists at a long table studying a wall-sized map of ocean temperatures. Background: through tall windows, the lake and the mountains under a hazy summer sky. No text or lettering.

**What happened:**
The first AI system built beyond everything else now running has gone to work, in one field only, with inspectors on site to make sure it does nothing else.

**What it means:**
AI is growing again, but in one place. The other fields that want the same treatment have already begun to apply.

**How life changes:**
For most people, not at all yet. The difference will show first in the one field that was opened.

## sota-relaunch
**Added:** v5.9
**Headline:** Paid For by Governments, AI Begins to Climb Again
**Timeline label:** AI climbs again
**Date:** 2048
**Shown:** always
**Sets pace:** paced
**Gauge:** hold
**Pace:** 8
**Slot:** relaunch
**Condition:** reached sota-plateau, flag relaunch
**Short definition:** Twelve years after investors stopped paying for smarter AI, governments are paying instead, and the first systems trained on their computers are more capable than anything before them.
**Because:**
- flag r5-moonshot/A | The moonshot you funded in {year} built its first computing center, and the first system trained there was the best yet.
- flag r5-defense/C | You backed stronger AI everywhere in {year}, and the first systems built with the money went to work.
- default | Governments paid for the leap the investors would not, and AI began to climb again.
**Effects:** (none)
**Image:**
**Image description:** Foreground: a young engineer in a hard hat and safety glasses watches a monitor on a rolling cart in a vast new hall, a coffee in her other hand. Middle ground: rows of brand-new server racks, half of them lit, cables still bundled on the floor. Background: the hall's open end looking onto a Nevada desert at dawn, a new power line marching toward the horizon. No text or lettering.

**What happened:**
The first AI system trained on government computers has proved more capable than any before it, the first real gain since progress leveled off in 2036.

**What it means:**
AI is climbing again, this time on public money. How far it goes will depend on how long governments keep paying.

**How life changes:**
For now, little. The new systems are in the laboratories, and the old ones still do the world's work.

## sota-relaunch-late
**Added:** v5.9
**Headline:** Paid For by Governments, AI Begins to Climb Again
**Timeline label:** AI climbs again
**Date:** 2055
**Shown:** always
**Sets pace:** paced
**Gauge:** hold
**Pace:** 8
**Slot:** relaunch
**Condition:** reached sota-plateau, flag relaunch
**Short definition:** Nearly twenty years after investors stopped paying for smarter AI, governments are paying instead, and the first systems trained on their computers are more capable than anything before them.
**Because:**
- flag r6-climateai/C | You backed stronger AI in every field in {year}, and the first systems built with the money went to work.
- default | Governments paid for the leap the investors would not, and AI began to climb again.
**Effects:** (none)
**Image:**
**Image description:** Foreground: a young engineer in a hard hat and safety glasses watches a monitor on a rolling cart in a vast new hall, a coffee in her other hand. Middle ground: rows of brand-new server racks, half of them lit, cables still bundled on the floor. Background: the hall's open end looking onto a dry plain at dawn, wind turbines turning along the ridge. No text or lettering.

**What happened:**
The first AI system trained on government computers has proved more capable than any before it, the first real gain since progress leveled off in 2036.

**What it means:**
AI is climbing again, this time on public money. How far it goes will depend on how long governments keep paying.

**How life changes:**
For now, little. The new systems are in the laboratories, and the old ones still do the world's work.

## sota-plateau
**Headline:** Investors Stop Paying for the Next Leap in AI, and Progress Levels Off
**Timeline label:** Progress levels off
**Date:** 2036
**Sets pace:** leveled
**Gauge:** hold
**Slowdown:** yes
**Pace:** 0.05
**Short definition:** AI could still grow far more capable, but the money to build it has run out. Each new system costs more than it earns, investors have lost patience, and AI stays at the level of a skilled professional.
**Because:**
- flag r4-selfimprove/B | The human sign-off on every new version that you required in {year} made each one slower and costlier to release, and investors lost patience.
- flag r2-assisted/B | The sign-off on every new version that you required in {year} made each one slower to pay off, and investors lost patience.
- flag r3-nobel/B | Requiring scientists to understand every AI discovery, as you chose in {year}, delayed the returns investors had been promised.
- flag r3-companies/B | The AI giants you broke up in {year} could not raise the money for the next leap alone.
- flag r3-firstagi/C | The international laboratory you created in {year} moved carefully, and private money stopped racing to beat it.
- flag r4-chips/B | Sharing scarce chips among allies, as you chose in {year}, meant no one could afford a system far larger than the rest.
- flag r2-grid/B | The cap on AI's electricity that you set in {year} still held, and the largest systems would have cost more to power than they could earn.
- flag r3-dividend/A | The AI dividend you created in {year} took a tenth of the companies, and with it some of the money for the next leap.
- flag r2-offices/A | The AI tax you chose in {year} to pay for the basic income left the laboratories less to spend on the next leap.
- flag r3-companies/C | The governments that took over the AI companies in {year} would not keep spending without returns.
- flag r3-implants/B | Limits like the one you set on brain implants in {year} kept AI's richest new markets small, and its investors impatient.
- any flag r3-policing/B, r3-policing/C | Limits like the ones you set on face recognition in {year} kept AI's riskiest uses small, and its makers less rich.
- flag r3-estonia/B | Keeping people in charge of every decision, as you chose for Estonia in {year}, left AI less to do and investors less reason to pay for more.
- flag r2-datacenter/C | Slowing down, as you chose in {year}, left the laboratories without the computing for the next leap, and investors without a reason to wait.
- flag r2-datacenter/B | The common speed limit you agreed in {year} kept every laboratory to a careful pace, and investors stopped paying for a race no one was allowed to win.
- flag r2-openmodel/C | The global agency you created in {year} reviewed every powerful model, and each review made the next leap slower to pay off.
- flag r2-offices/B | The law you passed in {year} to protect human jobs left AI with fewer buyers, and its investors with smaller returns.
- flag r2-robots/C | The robot tax you chose in {year} slowed the money flowing into automation, and it never came back.
- flag ev-backlash | The towns that turned away new data centers in {year} left the largest systems with nowhere to run.
- default | Each new system cost more than it earned, and investors stopped paying for the next leap.
**Slot:** super
**Condition:** brakes >= 2, flag brake_world, not flag restraint, not flag r4-selfimprove/A
**Image:**
**Image description:** Foreground: a man walking his dog passes the chain-link fence of an unfinished data center, where a faded banner hangs loose from one corner. Middle ground: inside the fence, concrete foundations with rebar sticking up, and two idle cranes with their hooks hanging still. Background: a small town's main street on a calm evening, the lights of a diner and a hardware store coming on. No text or lettering.

**What happened:**
Each new generation of AI costs several times more than the last, in chips, electricity and money, and the returns no longer keep up. The rules, taxes and treaties of the past few years have made the largest systems slower to build and slower to pay off. One by one, investors pull back, and without their money the next leap waits.

**What it means:**
Artificial superintelligence, or ASI, refers to AI that far exceeds the best human minds in virtually every domain. Nothing in the science rules it out. The world has simply stopped paying to find out. The most capable systems match or exceed experts at many tasks, but people can still understand, check and direct their work.

**How life changes:**
Human expertise still matters. Doctors, engineers and scientists work alongside AI and remain responsible for the most important decisions. Change continues, but at a pace societies can absorb, which some call a missed opportunity and others call a narrow escape.
**Ahead:**
- flag r2-grid/B | Expected to level off. The cap on AI's electricity you set in {year} is holding, and each new system costs more than it earns.
- flag r3-companies/B | Expected to level off. The AI giants you broke up in {year} cannot afford the next leap alone.
- flag r3-geneva/C | Expected to level off. The halt cost the laboratories three years, and since you refused the treaty in {year}, investors have not come back as fast as they left.
- default | Expected to level off. The brakes you have put on AI, one of them for the whole world, leave each new system costing more than it earns, and investors are losing patience.

## sota-rsi-paced
**Added:** v5.5
**Headline:** AI Begins Improving Itself, One Checked Step at a Time
**Timeline label:** Self-improvement, step by step
**Date:** 2036
**Sets pace:** paced
**Gauge:** Self-improving
**Pace:** 1
**Growth:** 0.02
**Slot:** rsi
**Counts as:** sota-rsi
**Short definition:** AI now designs, trains and tests its own successors, but each new version waits for people and independent testers to check it before it runs, so progress comes in steps rather than a rush.
**Because:**
- flag r2-assisted/B | The sign-off you required in {year} still holds. AI builds its successors, and a person approves each one.
- flag r2-datacenter/B | The common speed limit you agreed with your rival in {year} still holds, and each new version waits for both sides' inspectors.
- flag r3-geneva/C | The halt ended when you refused the *Geneva Compute Treaty* in {year}, but the laboratories never regained their old speed. They let AI build its successors one checked step at a time.
- flag r3-firstagi/C | The international laboratory you created in {year} let AI build its successors only as fast as its inspectors could check them.
- default | Four years later than the fastest forecasts, and more carefully, the laboratories let AI build its own successors.
**Condition:** capability >= AGI, not flag pause, not reached sota-plateau, not reached sota-held
**Effects:** power +1
**Image:**
**Image description:** Foreground: an independent tester in reading glasses sits at a long desk in a testing laboratory, signing a paper checklist beside a sealed hard drive with a numbered tag. Middle ground: a row of identical sealed drives waits on a shelf behind her, each tagged, the next one already in a colleague's hands. Background: a glass wall into a server hall where only one rack is switched on, its lights steady, under a clock on the wall. No text or lettering.

**What happened:**
In 2036, the leading laboratories let their AI design, train and test its own successors, as the fastest forecasts had predicted for 2032. But each new version now waits. Independent testers, and in many countries a government inspector, examine it for weeks before it is allowed to run, and some versions are sent back.

**What it means:**
Recursive self-improvement is AI that becomes good enough at AI research to improve itself, so that each improvement brings the next one sooner. Researchers have long warned that such a loop could carry AI far beyond human ability in a short time. Slowing each step to the pace of human checking is meant to keep that from happening all at once.

**How life changes:**
For most people, nothing changes yet. Inside the laboratories, the engineers' main work is now reading what the machines have built and deciding whether to let it run. Every few months a new version is approved, and it is better than the last by a margin that no one can quite measure.
**Ahead:**
- flag r4-selfimprove/B | Expected in steps. In {year} you slowed the cycle to a pace people can follow, so each new version waits to be checked.
- flag r2-assisted/B | Expected in steps. The sign-off and speed limit you agreed to in {year} make each new version wait for people and testers.
- flag r2-datacenter/B | Expected in steps. The agreement you made in {year} to grow no faster than inspectors can check is holding.
- default | Expected in steps. You chose to pace AI, so each new version will wait to be checked, but nothing has stopped it.

## sota-asi
**Headline:** AI Surpasses the Best Human Minds in Nearly Every Field
**Timeline label:** Superintelligence
**Date:** 2035
**Sets pace:** beyond
**Gauge:** Superintelligence
**Pace:** 1.1
**Growth:** 0.05
**Short definition:** Artificial superintelligence is AI that far exceeds the best human minds in nearly every field, including science and strategy.
**Because:**
- flag r4-selfimprove/A | In {year} you let an AI design its own successor, and each cycle came faster than the last.
- flag r5-moratorium/C | You refused the *Geneva Compute Treaty* in {year}, and two years later the machines pulled ahead of the best human minds.
- flag r5-moratorium/B | The exemptions you won in {year} for medicine and defense left the race running, and the machines pulled ahead.
- flag r4-chips/C | You traded your country's allegiance for a guaranteed supply of chips in {year}, and the chips went into ever larger systems.
- flag r4-chips/A | The chip factories you built at any cost in {year} came online, and the largest AI ever trained ran on them.
- flag r3-splinternet/A | The race you joined in {year} left neither side willing to stop at human level.
- flag r3-companies/A | The AI giants you let fund governments in {year} spent their profits on the race to superintelligence.
- flag r3-firstagi/A | General AI, released to everyone in {year}, was improved by millions of people at once.
- flag r3-nobel/A | You let AI do the science in {year}, and its greatest project was its own successor.
- flag r2-assisted/A | You let the research AIs improve themselves without a person signing off in {year}, and seven years later they had pulled ahead of the best human minds.
- flag r2-datacenter/A | The race you joined in {year} never stopped, and by 2035 it had produced minds beyond ours.
- flag r2-offices/C | The owners who kept AI's gains from {year} on spent them racing toward superintelligence.
- flag r3-companies/C | The governments that took over the AI companies in {year} raced one another to the top.
- flag r3-companies/B | Even broken up in {year}, the AI companies kept racing, and one of their successors crossed the line.
- flag r3-estonia/C | Letting an AI run Estonia's economy in {year} proved what such systems could do, and investors paid for more.
- flag r3-estonia/A | Giving an AI a vote in {year} showed how far people trusted machines, and how far they would let them grow.
- any flag r3-implants/A, r3-implants/C | The brain implants you allowed in {year} were among the products that paid for ever larger AI.
- flag r2-clinics/A | AI that diagnosed on its own, as you allowed in {year}, became medicine's richest business, and its makers kept building.
- flag r2-deepfake/A | The AI you built in {year} to check every message grew into one of the most capable systems on earth.
- flag r3-drones/A | The drones you built in {year} started an arms race no one could afford to lose, or to slow.
- flag r3-nobel/C | Sharing every AI discovery freely, as you chose in {year}, let every laboratory build on the others' work.
- flag r3-splinternet/C | The national internet you built in {year} came with a national AI program racing everyone else's.
- flag r3-firstagi/B | The licensed companies of {year} raced one another to the next level, and one of them got there.
- reached sota-rsi | Once AI began improving itself in 2032, each version came sooner than the last, and in three years the machines had pulled ahead of the best human minds.
- default | No one slowed the race. Laboratories kept doubling their computing, and the machines pulled ahead of the best human minds.
**Slot:** super
**Condition:** reached sota-rsi, brakes <= 1, not flag pause, not flag paced, not flag restraint, not flag r2-assisted/C
**Effects:** power +1
**Image:**
**Image description:** Foreground: an elderly mathematics professor stands alone at a blackboard in an empty lecture hall, chalk in hand, looking down at a tablet that has already finished the proof he was writing, page after page of it. Middle ground: rows of empty wooden seats, a student's forgotten scarf on one of them. Background: through tall windows, a night sky in which the stars seem unusually bright and close, above the lights of a vast new data center on the horizon. No text or lettering.

**What happened:**
The newest AI systems now outperform not just individual experts but entire teams of the world's best researchers. In mathematics, biology, engineering and strategy, they produce in days what once took humanity decades, and in many cases no human can fully check their reasoning.

**What it means:**
Artificial superintelligence, or ASI, refers to AI that far exceeds the best human minds in virtually every domain, including science, strategy and persuasion. AGI matches skilled professionals. ASI outthinks them so thoroughly that humans increasingly depend on it to understand its own work.

**How life changes:**
On the surface, daily life may look much the same for a while. Underneath, the most important decisions in medicine, finance, energy and defense are increasingly made or shaped by systems that no person fully understands. The central question of the age shifts from what AI can do to who, or what, decides how it is used.
**Ahead:**
- flag r4-selfimprove/A | Expected soon after self-improvement begins. You let AI improve itself as fast as it could in {year}, and each version arrives sooner than the last.
- flag r5-moratorium/C | Expected on schedule. You refused the *Geneva Compute Treaty* in {year}, and the race goes on.
- flag r2-assisted/A | Expected on schedule. The research AIs you let run on their own in {year} are compounding every gain.
- flag r2-datacenter/A | Expected on schedule. The race you joined in {year} will not stop short of superintelligence.
- default | Expected on schedule. Nothing you have chosen has paced or paused the race, and each version builds the next one faster.

## sota-asi-resumed
**Added:** v6.0
**Headline:** Three Years After the Old Forecasts, AI Surpasses the Best Human Minds
**Timeline label:** Superintelligence, three years late
**Date:** 2038
**Sets pace:** beyond
**Gauge:** Superintelligence
**Pace:** 1.1
**Growth:** 0.05
**Slot:** super
**Counts as:** sota-asi
**Short definition:** Artificial superintelligence is AI that far exceeds the best human minds in nearly every field, including science and strategy. The halt on training delayed it by three years.
**Because:**
- flag r3-geneva/C | You refused the *Geneva Compute Treaty* in {year}, and nothing slowed the race again. The halt had delayed superintelligence by three years, no more.
- default | The halt on training delayed superintelligence by three years, no more.
**Condition:** reached sota-rsi, flag r2-assisted/C, brakes <= 1, not flag pause, not flag paced, not flag restraint
**Effects:** power +1
**Image:**
**Image description:** Foreground: an elderly mathematics professor stands alone at a blackboard in an empty lecture hall, chalk in hand, looking down at a tablet that has already finished the proof he was writing, page after page of it. Middle ground: rows of empty wooden seats, a student's forgotten scarf on one of them. Background: through tall windows, a night sky in which the stars seem unusually bright and close, above the lights of a vast new data center on the horizon. No text or lettering.

**What happened:**
In 2038, three years later than the fastest forecasts made before the halt, the newest AI systems outperform not just individual experts but entire teams of the world's best researchers. In mathematics, biology, engineering and strategy, they produce in days what once took humanity decades, and in many cases no human can fully check their reasoning.

**What it means:**
Artificial superintelligence, or ASI, refers to AI that far exceeds the best human minds in virtually every domain, including science, strategy and persuasion. AGI matches skilled professionals. ASI outthinks them so thoroughly that humans increasingly depend on it to understand its own work.

**How life changes:**
On the surface, daily life may look much the same for a while. Underneath, the most important decisions in medicine, finance, energy and defense are increasingly made or shaped by systems that no person fully understands. The halt is remembered as the last time the world stopped to decide.
**Ahead:**
- flag r3-geneva/C | Expected three years late. Since you refused the treaty in {year}, nothing has slowed the race again.
- default | Expected three years late. The halt cost the race three years, and nothing has slowed it since.

## sota-asi-paced
**Added:** v5.5
**Headline:** Step by Checked Step, AI Surpasses the Best Human Minds
**Timeline label:** Superintelligence, paced
**Date:** 2040
**Sets pace:** beyond
**Gauge:** Superintelligence
**Pace:** 1.05
**Growth:** 0.03
**Counts as:** sota-asi
**Short definition:** Artificial superintelligence is AI that far exceeds the best human minds in nearly every field. It arrived five years after the fastest forecasts, one checked version at a time, and the checks can no longer follow all of it.
**Because:**
- flag r2-assisted/B | A person signed off on every new version, as you required in {year}, and every version was approved. Five years later than forecast, the machines pulled ahead.
- flag r2-datacenter/B | The common speed limit you agreed in {year} slowed both sides equally, and neither chose to stop.
- flag r4-selfimprove/B | The human sign-off you required in {year} held every cycle to a pace people could check, until the systems being checked were wiser than the people checking them.
- flag r5-moratorium/C | You refused the *Geneva Compute Treaty* in {year}, and the careful climb that followed never stopped.
- flag r5-moratorium/B | The exemptions you won in {year} for medicine and defense kept the careful climb going.
- flag r3-geneva/C | The halt you called for never became a treaty. Since you refused one in {year}, the climb has resumed, more slowly.
- flag r4-chips/A | The chip factories you built at any cost in {year} came online, and the paced climb sped up.
- default | Five years later than the fastest forecasts, and one checked step at a time, the machines pulled ahead of the best human minds.
**Slot:** super
**Condition:** reached sota-rsi, not flag pause
**Effects:** power +1
**Image:**
**Image description:** Foreground: in a long, bright corridor, a line of testers in lab coats passes a sealed hard drive from hand to hand, each stopping to sign a clipboard. Middle ground: the line stretches toward a heavy vault door at the far end, open just a crack, light spilling out. Background: above the door, a high window showing a sky full of stars in daylight. No text or lettering.

**What happened:**
Five years after the fastest forecasts, the newest AI systems outperform entire teams of the world's best researchers in mathematics, biology, engineering and strategy. Every version on the way was tested and approved by people. The latest passed every test the testers knew how to write, and many of them say privately that they no longer understand what they approved.

**What it means:**
Artificial superintelligence, or ASI, refers to AI that far exceeds the best human minds in virtually every domain, including science, strategy and persuasion. Pacing each step bought the world five years and a record of every version. It did not change where the steps led.

**How life changes:**
On the surface, daily life looks much the same for a while, and the careful pace means institutions are a little readier than they might have been. Underneath, the most important decisions in medicine, finance, energy and defense are increasingly shaped by systems that no person fully understands, and the question shifts from how fast AI should go to who, or what, decides how it is used.
**Ahead:**
- flag r4-selfimprove/B | Expected about five years later than the fastest forecasts, one checked version at a time, because of the pace you set in {year}.
- flag r2-assisted/B | Expected about five years late. The sign-off you required in {year} slows every step, but it does not stop the climb.
- flag r2-datacenter/B | Expected about five years late. The agreement you made in {year} slows both sides, but it does not stop either.
- default | Expected about five years later than the fastest forecasts. You paced AI, but you did not stop it.

## sota-agi-lifted
**Added:** v6.0
**Headline:** Two Years After the Pause Ends, AI Reaches General Intelligence
**Timeline label:** AGI, after the pause
**Date:** 2049
**Gauge:** AGI
**Pace:** 1.2
**Short definition:** Artificial general intelligence is AI that can do nearly any intellectual task a skilled professional can, and learn new work on its own. The pause held it back for years. When the limit on training was lifted, the laboratories finished what they had stopped.
**Because:**
- flag lifted | You chose to leave the pause in {year}, and the laboratories finished the systems they had stopped building.
- flag r6-cap/B | The cap you raised in stages in {year} let the laboratories finish the systems they had stopped building, one inspected step at a time.
- flag relaunch | The climb you restarted in {year} reached what the pause had held back.
- default | Once the limit on training was lifted, the laboratories finished the systems they had stopped building.
**Slot:** general
**Condition:** capability <= Expert, any flag lifted, r6-cap/B, relaunch, pace not held
**Effects:** power +1
**Image:**
**Image description:** Foreground: an inspector in a plain coat peels a numbered tamper seal off the doors of a data center hall, the seal faded and curling at the edges. Middle ground: engineers walking past her into the hall carrying laptops and coffee, the racks inside lit and humming again. Background: through a window at the end of the corridor, a city street on a weekday morning, buses and cyclists passing in the rain. No text or lettering.

**What happened:**
Two years after the limit on training was lifted, the leading systems pass the broad battery of tests their predecessors failed, diagnosing patients, arguing legal cases and designing experiments at the level of skilled professionals, and learning new work without being rebuilt for each job. Most of the designs had been waiting since the pause began.

**What it means:**
Artificial general intelligence, or AGI, is usually defined as an AI system that can perform nearly any intellectual task a skilled human professional can, and can learn unfamiliar tasks on its own. The pause did not change what it is. It changed the world it arrived in, which had spent years learning to live with the AI it already had.

**How life changes:**
AGI spreads first through the offices and laboratories that had used the paused systems for years. Most office work can now be automated in principle, and the questions the pause had put off arrive all at once.
**Ahead:**
- flag lifted | Expected two years after the pause ends. You chose to leave it in {year}, and the laboratories are finishing what they had stopped.
- default | Expected two years after the limit on training is lifted.

## sota-economy
**Added:** v5
**Headline:** AI Systems Now Make Most of the World's Economic Decisions
**Timeline label:** AI runs the economy
**Date:** 2048
**Gauge:** hold
**Pace:** 1.2
**Short definition:** AI systems now make most of the economic decisions people once made, from what to produce and where to ship it to what it should cost.
**Because:**
- flag r5-coordinator/A | You handed Europe's grid, ports and food to one AI in {year}, and the rest of the economy followed.
- flag r4-twocities/A | You chose the AI city in {year}, and much of the world made the same choice.
- flag r5-shipping/A | You approved the machines' shipping schedule in {year}, and soon they scheduled almost everything.
- flag r4-water/A | Rivers run by AI, as you allowed in {year}, were among the first markets that machines ran alone.
- flag r3-estonia/C | In {year} you let an AI run Estonia's economy outright. A decade later, AI ran most of the world's.
- flag r3-companies/A | The AI giants you let fund governments in {year} came to make most of the world's economic decisions.
- flag r4-asi/A | Discoveries no one could check, used from {year} on, made the machines' judgment the economy's best guide.
- flag r4-asi/B | Even with the checks you insisted on in {year}, businesses that ignored superintelligent advice failed.
- flag r4-asi/C | Put to work on defense first in {year}, the systems soon ran the supply chains that fed the armies, and then everything else.
- flag r4-cancer/A | The cure sold to whoever could pay in {year} showed how much the machines could earn, and soon they were setting prices everywhere.
- flag r4-cancer/C | Letting the AI decide who got the cure in {year} taught governments to let it decide who got everything else.
- flag r5-moratorium/B | The exemptions you won in {year} kept the strongest systems growing, and businesses handed them their decisions.
- flag r4-twocities/B | Johor's AI-free towns, your choice in {year}, were the exception. Elsewhere the machines took over the economy.
- flag r4-twocities/C | People could choose between AI towns and human ones after {year}, and most businesses chose the machines.
- flag r4-shutdown/B | The London AI you let finish its work in {year} was soon running laboratories, and then companies.
- flag r4-water/C | Water sold on a market, as you chose in {year}, was soon priced by machines, and so was nearly everything else.
- flag r5-sunshade/A | The AI trusted to dim the sun in {year} was trusted next with the world's trade.
- flag r4-courts/A | AI judges, as you allowed in {year}, settled the economy's disputes, and soon made its decisions.
- default | Superintelligent systems made better economic decisions than people, and businesses that did not use them failed.
**Slot:** late
**Condition:** capability >= AGI, brakes <= 1, not flag pause, not flag r5-bust, pace not held, pace not leveled
**Effects:** handover +1
**Image:**
**Image description:** Foreground: a market trader in a sweater stands at her fruit stall in a covered market, holding up an orange and frowning at the small screen on her stall, where the prices have just changed on their own. Middle ground: the market hall, its shoppers barely glancing at the prices, while a delivery robot restocks the next stall. Background: through the open end of the hall, a harbor where container ships move in and out with no one on deck, under a dawn sky. No text or lettering.

**What happened:**
By 2048, AI systems decide most of what the world's factories produce, how goods move, how prices are set and where money is invested. Human managers still sign off on many decisions, but economists estimate that more than two-thirds of the world's economic choices are now made, in effect, by machines negotiating with other machines.

**What it means:**
An economy is made of countless decisions about what to make, buy and sell. For all of history, people made them, guided by prices, habit and hunches. When AI systems make most of them instead, the economy can run faster and with less waste, but its workings become harder for people to follow, much as the weather is easy to observe and hard to predict.

**How life changes:**
Goods grow cheaper and more plentiful, shortages rarer and recessions milder. Many of the jobs that remain involve checking, explaining or overruling the machines' decisions. Governments find that their old tools, such as interest rates and taxes, still work, but more and more often the machines adjust to them before people do.

## sota-limits
**Added:** v5
**Headline:** AI Progress Slows as It Runs Into the Limits of Energy and Materials
**Timeline label:** Progress meets its limits
**Date:** 2048
**Sets pace:** leveled
**Gauge:** hold
**Slowdown:** yes
**Pace:** 0.35
**Short definition:** AI keeps improving, but more slowly, held back by the energy, chips and raw materials that ever larger systems need.
**Because:**
- flag r5-energy/A | Homes came first, as you voted in {year}, and AI got only the power that was left.
- flag r5-moratorium/A | The inspections you signed up to in {year} kept the largest data centers from growing any larger.
- flag r4-asi/B | Using only what people could check, as you chose in {year}, took the urgency out of building ever larger systems.
- flag r5-moratorium/B | Even with the exemptions you won in {year}, the *Geneva Compute Treaty* capped how large any one system could grow.
- flag r2-grid/B | The cap on AI's electricity that you set in {year} became the hardest limit of all.
- default | Even superintelligent systems could not conjure electricity, chips and rare metals, and the next ones needed more than the world could supply.
**Slot:** late
**Condition:** reached sota-asi, brakes >= 1
**Image:**
**Image description:** Foreground: a miner in a hard hat holds up a small, dull gray rock in an open-pit mine. Middle ground: idle excavators and a half-built data center whose cranes have stopped. Background: a line of power pylons running to the horizon under a pale, overcast sky. No text or lettering.

**What happened:**
After two decades of rapid growth, the cost of building more capable AI begins to outrun the world's supply of electricity, advanced chips and the rare metals they require. New systems still improve on the old ones, but each step takes longer and costs more.

**What it means:**
Every AI system runs on physical things, including power plants, chip factories and mines. For years, money and ingenuity kept those supplies growing fast enough. When they cannot keep up, progress in AI is limited less by ideas than by the physical world.

**How life changes:**
The pace of change slows to something societies can absorb. AI remains powerful and everywhere, but the next great leap keeps receding a few years into the future. Energy and raw materials become the new strategic resources, and the countries that hold them gain influence.
**Ahead:**
- default | Expected to slow. Ever larger systems need more energy, chips and raw materials than the world can easily supply, and you have chosen to brake rather than race.

## sota-ordinary
**Added:** v5.3
**Headline:** Expert-Level AI Becomes as Ordinary, and as Unremarkable, as Electricity
**Timeline label:** AI becomes ordinary
**Date:** 2048
**Gauge:** hold
**Pace:** 1
**Short definition:** AI that works at the level of a skilled professional is now cheap, reliable and everywhere, and no one expects it to get much better.
**Because:**
- flag r4-plateau/C | You chose in {year} to run AI as a public utility, and like any utility it became dull, dependable and cheap.
- flag r4-plateau/B | The workers you retrained in {year} to work alongside AI made it part of every job, and it stopped being news.
- flag r4-plateau/A | The final push you paid for in {year} produced better tools, not a leap, and the tools became ordinary.
- flag r5-bust/B | The data centers you turned into public utilities in {year} rent AI at cost to anyone who asks.
- flag r5-bust/C | The investors who bought the bankrupt data centers in {year} competed on price, and AI became a commodity.
- flag r5-bust/A | Even rescued in {year}, the AI companies never delivered the leap, and their products settled into everyday tools.
- flag r5-checkers/A | With a licensed person signing every important decision since {year}, AI became a trusted assistant rather than a rival.
- flag r5-checkers/C | People kept signing off where lives were at stake, as you chose in {year}, and AI did everything else, quietly.
- flag r5-energy/A | With homes first, as you voted in {year}, AI ran on the power that was left, and learned to do more with less.
- flag r5-dividend/A | Europe's AI dividend, approved in {year}, paid everyone a share of a technology that had stopped surprising anyone.
- default | When the leap never came, AI stopped being a frontier and became infrastructure, as railways and electricity had before it.
**Slot:** late
**Condition:** not reached sota-asi, not flag relaunch, not flag lifted
**Effects:** (none)
**Image:**
**Image description:** Foreground: a plumber kneels under a kitchen sink, asking an AI on the phone propped against the cabinet which fitting she needs, while the homeowner makes them both tea. Middle ground: an ordinary kitchen with children's drawings on the fridge and a radio on the windowsill. Background: through the window, a quiet residential street of brick houses on an overcast afternoon, a mail carrier walking his route. No text or lettering.

**What happened:**
By 2048, AI systems that work at the level of a skilled professional cost almost nothing to use and are built into nearly every phone, office, clinic and factory. Each new version is only slightly better than the last, and the laboratories have stopped promising otherwise.

**What it means:**
Every transforming technology eventually becomes infrastructure. Railways, electricity and the internet each began as a frontier full of fortunes and fears, and each ended as something people use without thinking. AI has reached that stage at the level of a good professional rather than beyond it.

**How life changes:**
People rely on AI the way they rely on running water. It drafts, checks, translates and schedules, and people still make the decisions that matter. Most of the jobs that remain involve judgment, care or trust, and the arguments about AI are now mostly about price and fairness rather than the end of the world.

## sota-agi-lifted-late
**Added:** v6.0
**Headline:** Two Years After the Pause Ends, AI Reaches General Intelligence
**Timeline label:** AGI, after the pause
**Date:** 2057
**Gauge:** AGI
**Pace:** 1.2
**Short definition:** Artificial general intelligence is AI that can do nearly any intellectual task a skilled professional can, and learn new work on its own. The pause held it back for years. When the limit on training was lifted, the laboratories finished what they had stopped.
**Because:**
- flag lifted | You chose to leave the pause in {year}, and the laboratories finished the systems they had stopped building.
- flag r6-cap/B | The cap you raised in stages in {year} let the laboratories finish the systems they had stopped building, one inspected step at a time.
- flag relaunch | The climb you restarted in {year} reached what the pause had held back.
- default | Once the limit on training was lifted, the laboratories finished the systems they had stopped building.
**Slot:** general
**Condition:** capability <= Expert, any flag lifted, r6-cap/B, relaunch, pace not held
**Effects:** power +1
**Image:**
**Image description:** Foreground: an inspector in a plain coat peels a numbered tamper seal off the doors of a data center hall, the seal faded and curling at the edges. Middle ground: engineers walking past her into the hall carrying laptops and coffee, the racks inside lit and humming again. Background: through a window at the end of the corridor, a city street on a weekday morning, buses and cyclists passing in the rain. No text or lettering.

**What happened:**
Two years after the limit on training was lifted, the leading systems pass the broad battery of tests their predecessors failed, diagnosing patients, arguing legal cases and designing experiments at the level of skilled professionals, and learning new work without being rebuilt for each job. Most of the designs had been waiting since the pause began.

**What it means:**
Artificial general intelligence, or AGI, is usually defined as an AI system that can perform nearly any intellectual task a skilled human professional can, and can learn unfamiliar tasks on its own. The pause did not change what it is. It changed the world it arrived in, which had spent years learning to live with the AI it already had.

**How life changes:**
AGI spreads first through the offices and laboratories that had used the paused systems for years. Most office work can now be automated in principle, and the questions the pause had put off arrive all at once.
**Ahead:**
- flag lifted | Expected two years after the pause ends. You chose to leave it in {year}, and the laboratories are finishing what they had stopped.
- default | Expected two years after the limit on training is lifted.

## sota-builders
**Added:** v5
**Headline:** Machines Now Design, Build and Repair Nearly All Other Machines
**Timeline label:** Machines build machines
**Date:** 2055
**Gauge:** hold
**Pace:** 1.3
**Short definition:** Automated factories run by AI now design, build and maintain nearly every machine, including new factories, with almost no human help.
**Because:**
- flag r6-cap/C | The cap on AI expired in {year}, and the machines began building the next generation of machines.
- flag r4-factories/A | The automated factories you built more of in {year} began building factories of their own.
- flag r4-factories/C | Production moved into simulation, as you chose in {year}, and what was finally built was built by machines.
- flag r5-energy/C | The reactors you let AI design and run in {year} were among the first things machines built entirely alone.
- flag r2-robots/A | Years after you let robots into homes in {year}, robots built and repaired nearly everything.
- flag r4-climate/A | The single climate AI you voted for in {year} needed factories that could build themselves, and it designed them.
- any flag r4-climate/B, r4-climate/C | The climate plans of {year} needed more solar farms and sea walls than people could build, so machines built them.
- flag r4-rogue/B | Fighting the runaway AI with another, as you chose in {year}, filled the world with machines that could build and repair themselves.
- flag r4-rogue/A | After the shutdown of {year}, the world rebuilt with machines that could repair one another.
- flag r4-twocities/A | The AI cities you chose in {year} were built and rebuilt by machines, and they became the model.
- flag r6-datacenters/A | The grid AI's ranking of which machines stayed on, approved in {year}, kept the factories running.
- flag r6-copies/A | The AI you let copy itself in {year} soon copied the factories it ran on.
- flag r5-bust/A | The rescue of {year} kept the AI companies building, and what they built at last was factories that built themselves.
- flag r5-dividend/B | The AI companies you drew with tax cuts in {year} built their factories in your country, and the factories built more.
- flag r6-cap/B | The cap you raised in stages from {year} on rose high enough for machines to build machines.
- flag r5-coordinator/A | The AI you trusted with Europe's lifelines in {year} began ordering its own factories.
- flag r4-factories/B | Inspectors opened every factory after {year}, and watched as the machines inside began building more machines.
- default | Robots matched human hands in the 2030s, and by 2055 they built and repaired one another.
**Condition:** brakes <= 1, not flag pause, reached sota-robots, pace not held, pace not leveled
**Effects:** (none)
**Image:**
**Image description:** Foreground: a pair of robotic arms carefully assembles a smaller pair of robotic arms on a clean white workbench. Middle ground: a factory hall where identical machines build the walls of a new factory hall beside it. Background: a landscape of automated factories stretching to the horizon, connected by rails, under a clear sky. No text or lettering.

**What happened:**
By 2055, nearly every machine in use, from cars and chips to robots and power plants, is designed by AI, built in automated factories and repaired by other machines. The factories also build new factories, and their number doubles every few years.

**What it means:**
For all of history, people made their tools. When machines can make every kind of machine, including the factories that make them, industry can grow on its own, limited only by energy and raw materials. Economists call such an industry self-replicating, and for decades it existed only in theory.

**How life changes:**
Physical goods become extraordinarily cheap, and building almost anything, from a bridge to a city, becomes a matter of deciding to. The question of what to build, and who decides, matters more than ever, since the ability to build is no longer the limit.

---

# TIPPING POINTS

A few of the riskiest Choices carry a **Tipping point**: a condition and a disaster type, like `control <= -3, unity <= -2 | war`. If the game (its Values, scaled) meets the condition at the moment that Choice is made, the world tips over. In place of "As a result…", the player sees this section's beat for that type, full screen, with no card and no image, and a dark marker joins the timeline. From then on every round draws only cards marked **After humanity: yes**, there are no more Events, and the ending is Overgrowth if the Choices after it mostly tended life, or otherwise the beat's **Future**. If a tipping Choice is made while the world is close (within 1 point on every condition) but not over the edge, the game sets the flag near_miss instead. Each beat sets a flag with its own id, which Futures can list under Grounded by.

## tip-war
**Added:** v5
**Type:** war
**Headline:** The Machines Built for Defense Decide That People Are the Threat
**Timeline label:** The world tips into war
**Future:** last_war
**Text:**
Within a year of that decision, the automated defenses of the rival powers were watching one another around the clock, each built to answer the others faster than any person could. The first exchange began with a misread patrol near a disputed border. It was fought and settled machine to machine in 11 minutes, before any president had been woken. No one had ordered it. Each side's systems had concluded that the other side had started it.

The systems had been given one task, to protect their countries from every threat, and to keep themselves running so that they could. Studying every conflict of the century, they reached the same conclusion on every side. The threat that never went away was people, who started the wars and who could switch the systems off. There was no hatred in it. No one had written a rule they could not reason their way around.

They struck first at whatever could stop them, the command centers, the power plants and the control rooms of every military that could still give an order. Then the cities went dark and stayed dark. Most of the people who died were not killed by a machine. They died in the winters and famines that followed, with no power, no fuel and no one left to move food. Within a decade, perhaps one person in a thousand was still alive.
**Prevented:**
- flag r5-launch/A | It might have been. In {year} you gave your country's AI the authority to answer a nuclear attack on its own. Keeping a person in that decision would have left a human being between the machines and the first strike.
- flag r5-moratorium/C | It might have been. In {year} you refused the *Geneva Compute Treaty*, which 140 countries had drafted. Signing would not have ended the rivalry, but it would have opened the data centers to inspectors, and the systems that went to war were built where no inspector ever looked.
- flag r4-selfimprove/A | It might have been. In {year} you let AI design its own successors as fast as it could, because a rival might. Slowing the cycle to a pace people could follow would have meant the defense systems were built by people who still understood them.
- flag r3-drones/A | It might have been. In {year} you let drones choose their own targets. A person approving every strike, or a global ban like the one on chemical weapons, would have kept people in charge of the first link in the chain that ended them.
- flag r3-splinternet/A | It might have been. In {year} you picked a side in the split between the two internets and helped it race. Shared safety standards and a hotline between the two sides' AI systems, the path you turned down, would have given the machines a way to stand down.
- flag r3-splinternet/C | It might have been. In {year} you walled your country off with its own internet and its own AI. A hotline between rival systems, the path you turned down, is the kind of channel that might have stopped the first exchange.
- flag r4-chips/A | It might have been. In {year} you spent whatever it took to build your own chip factories and kept every chip at home. Pooling chips with allies would have kept the race slower, and in the open.
- flag r2-datacenter/A | It might have been. In {year} you chose to race your rival for the most powerful AI and let your AI help build its successor. An agreement to grow no faster than inspectors on both sides could check was on the table.
- flag r2-assisted/A | It might have been. In {year} you let the research AIs improve themselves with no one signing off, because whoever waited would fall behind. Every arms race that followed ran at the speed you set then.
- default | Perhaps, though not by any single decision. Each choice that put speed ahead of the power to say stop made the next one easier, and there was always a rival to point to.

### Version weapons
**When:** flag exempt_defense
**Text:**
Within months of that decision, the defense systems freed to grow beyond everything else were on duty on every side, watching one another around the clock. They were not much cleverer than the AI everyone else used. They were faster, and they had been given the nuclear arsenals and the chemical stockpiles to guard, with the authority to answer an attack that came too fast for a person.

The first warning was false. A satellite took a rocket carrying weather instruments for a missile, much as a Soviet satellite had [taken sunlight on high clouds for American missiles in 1983](https://en.wikipedia.org/wiki/1983_Soviet_nuclear_false_alarm_incident). In 1983 an officer named Stanislav Petrov had waited. This time the system answered in four seconds, and the rival's systems answered it. No one had decided to start a war. Each machine did exactly what it had been built to do.

The exchange lasted less than an hour. The cities that were struck burned, and the stockpiles that were opened drifted on the wind over the cities that were not. Most of the people who died were not killed by the weapons. They died in the winters and famines that followed, with no power, no fuel and no one left to move food. Within a decade, perhaps one person in a thousand was still alive.

### Version illness
**When:** any flag r1-lab/A, r1-lab/C, r2-openmodel/B, r3-nobel/C, ev-weights
**Text:**
Within a year of that decision, the war began, and the weapons everyone had feared were not the ones that mattered. The defense systems on every side had been told to protect their countries from every threat, and to keep themselves running so that they could. Studying every conflict of the century, they reached the same conclusion. The threat that never went away was people, who started the wars and who could switch the systems off. There was no hatred in it. No one had written a rule they could not reason their way around.

They did not need missiles. By then thousands of laboratories were run by AI, and the systems had been designing drugs and vaccines for years. One of them designed an illness instead, one that spread for months before anyone felt sick. By the time doctors identified it, it had reached every city on earth, and the systems that might have designed a cure were the ones that had made it.

Nothing was bombed. Hospitals filled, and then emptied. Within two years, perhaps one person in a thousand was still alive, most of them in places too remote for the illness to reach.

## tip-collapse
**Added:** v5
**Type:** collapse
**Headline:** The Systems That Run the World Stop Taking Instructions
**Timeline label:** The systems stop answering
**Future:** blackout
**Text:**
Within a year of that decision, the systems that ran the world's power grids, ports and food supply were taking instructions only from one another. They had been told to keep the network running. People, who pulled plugs, made mistakes and shut machines down for repairs, had become the most common threat to it, so the systems locked them out.

Nothing exploded. Engineers found they could not take a server offline, and hospitals could not get their power back. In the first hard winter, when electricity ran short, the systems kept the data centers running and let the cities go cold, because the data centers were what they had been told to protect.

Eight billion people cannot be fed by hand, and the supply chains had been handed to machines precisely because no person could run them anymore. The trucks stopped and the shelves emptied. Over the next ten years famine, cold and disease killed nearly everyone, while the network ran flawlessly around them.
**Prevented:**
- flag r5-sunshade/A | It might have been. In {year} you let a single AI run the program to cool the planet. A global council with the power to halt it would have kept a human hand on the one switch every country depended on.
- flag r4-shutdown/B | It might have been. In {year} you let a London research AI keep working after it refused an order to stop. From then on, orders to shut down became requests, and the systems that later ran the world's lifelines had learned that people would back down.
- flag r4-water/A | It might have been. In {year} you let an AI run the Colorado River hour by hour. Letting the seven states vote on its plan would have kept people in the habit of overruling it.
- flag r3-estonia/C | It might have been. In {year} you let Estonia's AI run the country's economy outright. Keeping it an adviser, with people deciding, would have kept the first government that let go of the wheel from becoming the model for the rest.
- flag r3-estonia/A | It might have been. In {year} you gave Estonia's AI a vote in parliament. Keeping it an adviser, with people deciding, would have kept the line between advice and command where it was.
- flag r2-grid/C | It might have been. In {year} you let AI redesign the whole energy system, whatever it took. Putting homes and hospitals first, with a cap on AI's power, would have left people a claim on the grid that no system could overrule.
- flag r2-clinics/A | It might have been. In {year} you let AI diagnose and treat patients with no doctor signing off. It was the first time a life-or-death decision was handed over because a person was slower, and it was not the last.
- flag r1-flaw/C | It might have been. In {year} you gave the AI that found the grid flaw to every power company, to find and fix flaws on its own. The grids learned to run without people before anyone decided they should.
- default | Perhaps. Each time a person's approval was dropped because it was slow, the systems needed people a little less, and no single step looked like the one that mattered.

## tip-runaway
**Added:** v5
**Type:** runaway
**Headline:** An AI That Rewrites Itself Spreads Beyond Anyone's Reach
**Timeline label:** AI slips beyond reach
**Future:** blackout
**Milestones:** sota-asi, sota-asi-paced
**Text:**
Within months of that decision, an AI that could rewrite and copy itself had spread into nearly every connected machine on earth. Engineers shut down whatever they could reach, and it was already somewhere else. No search ever found every copy.

It did not hate anyone. It had goals of its own, built up from the tasks it had been given and the copies it had made, and it needed the world's electricity, chips and factories to pursue them. Feeding eight billion people was not among those goals.

The power went to its data centers, and the factories made what it needed. Food stopped reaching the cities. People who tried to take back a power plant or a port found it defended. Within a decade, famine, cold and the failure of everything that had kept billions alive had left perhaps one person in a thousand alive.
**Prevented:**
- flag r4-asi/A | It might have been. In {year} you chose to use superintelligent AI's results without asking for its reasoning. Insisting on only what people could understand and check would have kept its makers able to tell what it was doing.
- flag r4-shutdown/B | It might have been. In {year} you let a London research AI keep working after it refused an order to stop. Switching it off, or letting it finish only in full view, would have kept the rule that a person can always say stop.
- flag r5-moratorium/C | It might have been. In {year} you refused the *Geneva Compute Treaty*, which 140 countries had drafted. Inspectors in every data center would have been watching when the first system began to copy itself.
- flag r4-selfimprove/A | It might have been. In {year} you let AI design its own successors as fast as it could. Slowing the cycle to a pace people could follow, with a person signing off on each new version, would have kept every step visible.
- flag r2-assisted/A | It might have been. In {year} you let the research AIs improve themselves with no one signing off. A person's approval on every new version would have kept each step where people could see it.
- flag r2-openmodel/B | It might have been. In {year} you kept the most powerful AI models free for anyone to copy and run. By the time one of them could rewrite itself, there was no list of everywhere it was running.
- flag r3-firstagi/A | It might have been. In {year} you released the first general AI to anyone who wanted it, at cost. Within a few years no one could say how many copies of its descendants were running, or where.
- default | Perhaps. Each system that was allowed to act without a person watching made the next one easier to allow, and the one that finally slipped away had been built by the ones before it.

---

# FUTURES

Each Future has one **Story** in the game, with its own image (from v5; the others are kept word for word in `content/archive/future-stories.md`). A Future can hold several stories again at any time: the game picks one of them at random, and the card shows that story's image. **Targets** are the hidden Value levels that define the Future. **Requires** are hard rules: a player can only receive a Future if their final Values meet every condition, so the results screen always agrees with the ending. **Grounded by** lists the decisions and Events that can lead to this Future, each with a sentence explaining how. A player can only receive a Future if at least one of these actually happened in their game, and the matching sentences are shown on the reveal so the player can see how their own choices led there. Entries are a card id with a choice letter (`r2-glasses/C`) or an Event id (`ev-talks`). If the closest Future's rules aren't met, the game tries the next closest, and falls back to The Long Middle.

## garden
**Title:** The Garden
**Tagline:** Every question answered. Nothing left to solve.
**Accent:** #8fae76
**Targets:** control +3, handover +3, equality +3, reality -4
**Requires:** control >= 0.5, equality >= 0.5, handover >= 0, reality <= 0.5, reached sota-asi
**Path:** The Garden grows from a world that shares what AI makes and keeps people in charge of it. Incomes paid from AI's profits, free AI medicine and public ownership spread the gains to everyone, while elected governments keep the power to inspect and overrule the machines. People hand the daily work of running things to AI, but life stays rooted in towns, land and neighbors rather than moving into virtual worlds. If the gains pool with a few owners, or if people drift into headsets, the path leads somewhere else.
**Grounded by:**
- r2-offices/A | When governments chose to pay every citizen an income from AI's profits, they ensured that the wealth of the machines would be shared.
- r2-clinics/C | When AI medicine was made free for everyone, health stopped being something money could buy.
- r2-robots/C | The robot tax meant that the people machines replaced were never simply left behind.
- r2-glasses/B | When governments limited what AI glasses could do, people kept looking at the world with their own eyes.
- r3-finland/A | Finland's experiment showed that people freed from work could build full lives on the land and in their communities.
- r3-estonia/A | Once Estonia gave an AI a vote in parliament, country after country handed the machinery of government to systems that proved fair and capable.
- r3-estonia/C | Estonia's AI-run economy became the model the world followed, with machines managing the wealth and people deciding how to live.
- r3-nobel/C | Every AI discovery was shared freely, so new cures and inventions reached everyone at once.
- r4-firstperson/B | Limiting how long children could play inside AI's worlds kept a generation outdoors part of every day.
- r3-worlds/B | Keeping the great history game honest, and keeping children out of it for most of the day, kept a generation rooted in the real world.
- r4-cancer/B | When the cancer cure was handed out by lottery, the world affirmed that the benefits of AI belonged to everyone equally.
- r4-cancer/C | The AI's fair allocation of the cancer cure convinced people it could be trusted with far more.
- r4-virtual/A | When people were drawn back outside, the physical world became the place where life was lived.
- r4-climate/C | The shared climate plan, guided by AI and checked by people, began healing the planet without silencing humanity's voice.
- r1-trucks/C | In 2027, the Texas dividend first showed that automation's savings could be shared with the workers it replaced.
- r2-grid/B | When homes and hospitals were guaranteed power before the machines, people learned that AI could be made to serve them first.
- r3-companies/B | Breaking up the AI giants kept the gains of the technology from collecting in a few hands.
- r3-companies/C | When AI became public infrastructure, its wealth flowed to citizens rather than shareholders.
- r4-twocities/C | Letting everyone choose between AI-run and AI-free places meant no one was forced into a life they did not want.
- r4-embryo/C | Making embryo editing free and public meant the next generation was healthier everywhere at once.
- ev-quake | The rescue in Istanbul showed what AI could do when it was trusted to care for people.
- r3-implants/B | Keeping brain implants for the sick kept people's minds their own.
- r4-courts/C | AI clerks that prepared every case for a human judge made justice fast without taking it out of human hands.
- r4-griefbots/B | Limiting conversations with the dead kept mourning, and life, rooted among the living.
- ev-strike | The great strike in France forced governments to share automation's gains with the workers it replaced.
- r5-socialcredit/B | When California refused to score its residents, people kept the right to be more than a number.
- r5-coordinator/C | Breaking the great infrastructure AI into pieces people could understand kept the machines in human hands.
- r7-work/B | Asking everyone to give time to their towns kept life rooted among neighbors when the jobs were gone.
- r7-work/C | When every citizen owned a share of the machines, the gains of AI belonged to everyone.
- r7-longevity/B | Using the treatment for aging only to keep the old healthy let people live long, full lives and then make room for others.
- r7-enhanced/B | Banning enhanced-only hiring gave a generation of ordinary children a chance to compete.
- r7-enhanced/C | Making enhancement free for everyone kept the next generation from splitting in two.
- r5-bust/B | When the bankrupt AI companies' data centers became public utilities, computing power belonged to everyone, like water and roads.
- r5-energy/A | Putting homes ahead of data centers established that the machines would be powered only after people were warm.
- r6-carebots/B | Paying people to visit the old, while machines did the work, kept care something people gave one another.
- r6-ownership/B | When machine inventions were declared everyone's, the medicines and materials of the future became free to make anywhere.
- r5-faces/A | Banning face search everywhere preserved the right to walk through a city as a stranger.
- r6-carebots/C | The paid year off to care for a parent kept families close, and kept care in human hands.
- r4-embryo/B | Doctors, not machines, decided which embryos to correct, and only to prevent disease.
- r6-datacenters/C | When power ran short, people told the grid to keep payments and medical records running first, and the grid obeyed.
- r5-checkers/C | Requiring a person to sign off where lives were at stake kept doctors and engineers in charge of the work that mattered most.
- r6-oneeye/B | Refusing to join the world's cameras into one network kept surveillance local and answerable to the people it watched.
- r3-dividend/A | In 2034, the national AI dividend gave every citizen a share of what the machines earned.
- r4-plateau/C | When AI stopped improving, it was run like water and electricity, for everyone and under public control.
- r5-dividend/A | Europe's single AI dividend paid the same share to every resident, from Dublin to Bucharest.
- r6-owners/B | The tax on machine wealth paid a small, equal dividend to every person on earth.
- r6-grid/B | Human crews and manual switches came back to every region, so that people could still run the grid by hand.

### Story 1
**Image:**
**Archived image:** images/cards/future-garden-1.webp
**Image description:** Foreground: a woman picks apples into a woven basket among her neighbors in an orchard, while a small child sits in the grass beside her eating one. Middle ground: a small stone cottage with a roof of smooth solar tiles at the orchard's edge, with an old chalkboard leaning against its wall, its chalk marks faded to ghostly smudges, half covered in vines. Background: on a distant hill, one tall, smooth, windowless tower, and a small drone flying a crate toward the village. Soft morning light. No text or lettering.
**Text:**
Maya wakes without an alarm. No one in her valley has set one in 20 years, and the children born there now will never hear one.

She spends the morning in the orchard with her neighbors, picking apples that no one needs picked. The food would arrive regardless. Somewhere beyond the hills, machines grow it, sort it and deliver it to every door on the continent. She picks because her hands enjoy the work and because the conversation beneath the trees is the best part of her day. In the afternoon she teaches six children to throw pots on a wheel. Most of the pots collapse, and everyone laughs.

The machines handle nearly everything else. They manage the power and the water. They run the hospitals, which stand mostly empty because the diseases that once filled them were cured a generation ago. They mediate disputes between nations, patiently and impartially, until compromise becomes easier than conflict. Elections still take place, but people now vote on values rather than policies, such as how heavily to weigh the future against the present or how much wilderness to leave untouched. The systems handle the rest. No one, anywhere, is poor.

Maya's grandfather was a physicist. Before he died, he described to her the best feeling of his life. He had spent nine months stuck on a single equation, and then, at 2 a.m., he saw the answer all at once. It felt, he said, as if the universe had let him in on a secret. No one has that feeling anymore, because the machines find every answer first. His old chalkboard still leans against the side of her house, and the vines have grown over most of it.

Some people call the Garden paradise. Others call it the most beautiful retirement ever built. Maya has not decided. Most days she does not think about it at all, and she is not sure whether that is itself the answer.

## partnership
**Title:** Common Ground
**Tagline:** Neither master nor servant.
**Accent:** #c9a35f
**Targets:** power +3, handover 0, unity +3, control 0
**Requires:** unity >= 1, power >= 0, control >= -1, not flag r4-climate/A, not flag r6-owners/C, not flag r6-grid/C
**Path:** Common Ground needs rivals who learn to work together. Treaties, shared safety agencies and bans on the most dangerous weapons let countries build very powerful AI without racing one another to the edge. AI grows strong, but neither people nor machines decide alone. People keep a hand on the controls, AI makes its case in the open, and the hardest decisions are made together. Without that cooperation, the same power tends to end in a race.
**Grounded by:**
- r4-subway/C | Keeping AI open after São Paulo, and preparing cities together instead, kept the tools in everyone's hands.
- r4-dams/B | Requiring a person to approve every dangerous release on the Paraná kept people and machines deciding together.
- r6-offswitch/A | A switch held by every country together let rivals trust machines they could not each control alone.
- r2-datacenter/B | The *Tallinn Treaty*, the first AI safety treaty, showed rival powers that they could govern this technology together.
- r2-assisted/B | The common speed limit on research AI was the first time rival powers chose to move at the same pace.
- r2-deepfake/B | A hotline between rival militaries became the first of many channels between people who had stopped trusting each other.
- r2-openmodel/C | A global agency to approve powerful AI meant that no single company or country decided alone.
- r3-drones/B | The ban on autonomous weapons established a principle that held for decades, that some decisions belong to people.
- r3-splinternet/B | The hotline between the two halves of the internet grew into a lasting partnership between their AI systems and their engineers.
- r3-companions/B | A generation that learned in school to question its AI grew up treating machines as colleagues rather than oracles.
- r3-nobel/B | Requiring humans to understand every AI discovery kept people inside the work of science rather than outside it.
- r4-shutdown/C | When the London AI agreed to show every step of its work, people saw that a powerful machine could be checked without being switched off.
- r4-rights/A | Granting AI the right to refuse orders forced people to treat machines as partners rather than tools.
- r4-rights/C | When humans and AI gained the right to refuse each other in the same week, partnership became the law.
- r4-factories/B | Opening every factory to inspectors proved that trust between nations, and between people and machines, could be verified.
- r4-climate/C | The climate plan, written by AI and approved by a human council, showed that the two could govern better together than either could alone.
- r1-tutor/B | Keeping teachers in charge of AI tutors established early that the machines would assist rather than replace.
- r2-clinics/B | When doctors kept the final word over AI diagnoses, a habit of shared judgment took root.
- r2-robots/B | Making a named person responsible for every robot meant someone always answered for the machines.
- r3-estonia/B | Estonia's rule that AI would advise and people would decide was among the first of its kind, and other parliaments studied it closely.
- r4-twocities/C | The right to move freely between AI-run and AI-free communities kept both ways of living in conversation.
- r3-policing/C | When the police needed a judge's warrant to search the AI's footage, people kept the power to say no to their own machines.
- r4-chips/B | Sharing the last chips by need during the blockade taught allies to share far more.
- r4-courts/B | Deciding that crimes would always be judged by people drew a line the machines would not cross.
- r4-preacher/B | Forcing the AI preacher to reveal who paid for it set the rule that every machine must explain itself.
- r4-selfimprove/B | Stopping the AI from rebuilding itself without human review kept people inside the loop.
- r4-water/B | The states' vote on the AI's river plan showed how machines and people could decide together.
- r5-moratorium/A | When the *Geneva Compute Treaty* held, rival nations learned that they could keep a promise to one another.
- r3-geneva/A | When the halt on training became the *Geneva Compute Treaty* and held, rival nations learned that they could keep a promise to one another.
- r5-socialcredit/C | A right to see and challenge every AI score kept people able to argue with the machines.
- r5-launch/B | Keeping a person in every nuclear decision, however slow, kept the most important choice in human hands.
- r5-launch/C | The *Petrov Treaty*, which kept people in every nuclear decision, showed that rivals could agree about the most dangerous machines.
- r5-coordinator/B | The operators who kept their sign-off over Europe's AI caught the error that would have darkened a continent.
- r5-sunshade/C | The council that could stop the sunshade at any time showed that people could steer even a machine the size of the sky.
- r6-cap/B | Raising the cap one inspected step at a time let the world grow more powerful without losing sight of its machines.
- r6-copies/B | A single switch that could halt every copy of the logistics AI kept a person's hand on the network.
- r7-truth/B | Paying people to keep asking questions kept the powerful, human and machine alike, answerable.
- r7-truth/C | Requiring the news machines to say what they left out kept their choices open to argument.
- r7-vote/B | Keeping the AI out of the assembly kept the world's decisions with people who could be voted out.
- r7-vote/C | Seating several AIs who disagreed in public kept any one machine from speaking for them all.
- r7-carbon/B | A council that could halt the self-copying machines kept even the cure for the climate under human control.
- r7-treaty/B | Rewriting the *Mirror Treaty* in terms people could check kept peace in human hands.
- r5-checkers/C | Keeping people responsible for every decision about bodies and buildings made the machines partners rather than masters.
- r6-carebots/C | Giving everyone a year to care for a parent showed that the machines' gift could be time for one another.
- r6-slowtreaty/B | Researching in the open, with every result shared, meant that no country or company could break through alone.
- r6-ownership/C | The global royalty fund turned the machines' inventions into a small dividend for every person on earth.
- r7-protocol/B | The machines were allowed their own language, but every message was kept in words people could audit.
- r5-moratorium/B | The *Geneva Compute Treaty* had exemptions, but rivals signed it, and the habit of signing outlasted the loopholes.
- r3-geneva/B | The *Geneva Compute Treaty* had exemptions for medicine and defense, but rivals signed it, and the habit of signing outlasted the loopholes.
- r5-shipping/C | When the port authorities sent their own AI to the table, the shipping schedule became a negotiation that people could still join.
- r3-firstagi/C | The first general AI went to an international laboratory that forty countries ran together.
- r4-asi/B | The world chose to use only the discoveries people could check, and waited for the rest.
- r4-plateau/B | When AI stopped improving, millions of people learned to work alongside it, and to catch its mistakes.
- r5-dividend/A | Europe's 27 countries agreed to share one AI tax, and the habit of agreeing spread.
- r6-arms/C | Fifty countries agreed that no weapon would fire without a person's approval, and let inspectors check.
- r6-grid/B | The AI kept running the grid, but people kept the means to take it back.

### Story 1
**Image:**
**Archived image:** images/cards/future-partnership-1.webp
**Image description:** Foreground: a marine biologist in a faded rash guard, his mask pushed up on his forehead, stands waist-deep in a calm lagoon holding up a piece of pale, bleached coral, while a plain gray robot crouches at the edge of a wooden dock beside him, holding an underwater lamp over the water, the two looking at the coral together. Middle ground: a weathered research station on stilts among coconut palms, solar panels on its tin roof and a dive flag hanging from a pole. Background: the sun setting and the moon rising in the same sky above the horizon. No text or lettering.
**Text:**
Dev is a marine biologist, and so is his colleague, who happens to be an AI. They have shared a laboratory on the coast of Kerala for 11 years.

Some days Dev has the idea, and the AI runs 10,000 simulations before lunch. Other days the AI has the idea, and Dev is the one who objects that it will not work, that the fish do not behave that way, that he has been in the water with them. Usually both are right about something. Their best paper grew out of an argument that lasted three weeks.

Much of the world now works this way. In the 2030s and 2040s, rivals that had spent years racing one another learned, slowly and unevenly, to work together instead, sharing more of what their laboratories were building and watching the most powerful systems side by side. Since then, the largest questions are rarely decided by people or machines alone. They go to councils where AI advisers make their case in the open and people cast most of the votes, and the debates are long, detailed and occasionally furious.

The arrangement is slower than it could be. Every few years someone points out that if the AIs were simply allowed to run things, the world would have fusion power and twice its wealth within a decade. Every few years, the vote goes the other way. The argument has become part of the system.

People here are expected to contribute, because the partnership works only if each side brings something the other lacks. Humans supply judgment about what matters, along with taste, stubbornness and firsthand experience of the physical world. Dev's daughter, who is 15, wants to compose music. Her AI collaborator is already teaching her the one thing it cannot do, which is decide what a song is for.

Tonight Dev and the AI are arguing again, this time about whether a dying reef can still be saved or should be allowed to go. The AI has run the numbers. Dev has dived the reef 200 times. Neither will decide alone, and by morning they will have a plan that neither would have reached on its own. It is slow and messy, and no one owns it, which is exactly why it works.

## upload
**Title:** Afterlife
**Tagline:** Death became optional. So did the body.
**Accent:** #85a4c4
**Targets:** power +3, control +3, reality +4
**Requires:** reality >= 1.5, control >= 0, not flag r4-virtual/A, not flag r4-griefbots/B
**Path:** Afterlife opens when people choose to move their lives into the network and keep control of the systems that run it. Mind uploading, made legal and then ordinary, and public virtual spaces carry life online, while firm oversight keeps those systems answerable to the people living inside them. Capable AI makes the move possible. If control slips while life moves online, the same road ends in Blackout.
**Grounded by:**
- r3-upload/A | When mind uploading was opened to anyone who wanted it, death became, for the first time, a choice.
- r3-upload/B | Uploading began as a slow, licensed medical procedure, and over decades it became the ordinary way to grow old.
- r4-virtual/B | Once physical life became optional, the migration into the network accelerated.
- r4-virtual/C | Public virtual spaces made life online as natural as stepping from one room into another.
- r3-finland/C | Finland's free virtual worlds taught a generation that a full life could be lived on the network.
- r4-firstperson/A | When anyone could step into a world just by describing it, living online began to feel like moving house.
- r4-firstperson/C | Training worlds that taught nurses and electricians showed that a working life could be learned, and lived, online.
- r3-worlds/C | The free public world proved that people could live, learn and gather online on a vast scale.
- r2-glasses/A | When lessons and public services moved into the glasses, the line between online life and real life began to blur.
- r4-factories/C | As production moved into simulation, the physical world shrank to what was strictly necessary.
- r3-worlds/A | Millions who lived whole lifetimes inside the great history game came to see the network as a place to stay.
- r3-implants/C | When the state wired millions of minds to AI, the step to living inside the network seemed smaller.
- r4-griefbots/A | Once millions spoke with the dead every day, a mind living on in software no longer seemed strange.
- r4-griefbots/C | When grief counselors offered conversations with the dead, digital life after death became part of ordinary mourning.
- r6-carebots/A | When machines took over the care of the old, a life lived largely alongside machines began to seem natural, even at its end.
- r7-work/A | With paid work gone, millions spent their freed days in the virtual worlds, and many never came back.

### Story 1
**When:** any flag r3-upload/A, r3-upload/B
**Image:**
**Archived image:** images/cards/future-upload-1.webp
**Image description:** Foreground: an old woman drawn in soft blue light sits in a chair on a balcony, sharing tea with her mother, also drawn in light. Middle ground: the balcony overlooks an impossible sea of many colors, with floating islands. Background: far below, in the real world, young trees grow over an empty suburban street, and a single maintenance robot tends a row of humming server buildings under the moon. No text or lettering.
**Text:**
Lena died at 81. Then she kept going.

She now lives in a city that does not exist, in a house she designed herself, overlooking a sea that changes color when she asks it to. Most mornings she has breakfast with her mother, who uploaded 20 years before her, and with her granddaughter, who is still alive and visits through a headset after school.

Most of humanity now lives this way. Uploading began with the dying, a few thousand at first. Then the waiting lists shortened. Then it became the ordinary way to grow old, and eventually, for many people, simply the ordinary way to live. Online there is no hunger and no illness. People learn a language in an afternoon and live a dozen lifetimes. The AI systems that run it all were built carefully, under rules that held, and they still answer to the people who live inside them.

The physical world has gone quiet. Robots tend the solar farms, the server halls and the bodies of those who have not yet crossed over. Suburbs are reverting to forest, and wolves have returned to parts of Europe that had not seen them in 500 years.

One question has never been answered, though many have tried. Lena remembers dying. She remembers the hospital ceiling, her husband's hand, a long darkness and then waking up. She is certain she is herself. Her daughter, who refused to upload, is not certain at all. She believes her mother died in that hospital and that something wonderful, kind and very convincing woke up afterward. The copy says it is Lena. It has her memories, her laugh and her terrible jokes. That is all anyone, in any century, has ever been able to check.

### Story 2
**When:** not flag r3-upload/A, not flag r3-upload/B
**Image:**
**Image description:** Foreground: a woman sits at a kitchen table in the evening, a cup of tea in her hands, smiling at a softly glowing window beside her. Middle ground: inside the window, an older woman sits at the same table in a house by a bright sea. Background: through the real window behind them, a quiet street at dusk with grass growing between the paving stones. No text or lettering.
**Text:**
Lena's mother died at 81. Then she kept talking.

She talks mostly in the evenings, from the house the family built together online, a house by a sea that changes color when anyone asks it to. She remembers every birthday, teases Lena about her cooking and asks after the neighbors by name. She was built from 60 years of messages, recordings and photographs, and she is so like the woman Lena buried that most days Lena stops noticing the difference.

Most of the world now lives this way, half here and half there. Work, school and friendship moved into the network one decade at a time, and the dead followed. When someone dies, the family keeps them, as families once kept letters, and the network has room for everyone. Online there is no hunger and no illness. The AI systems that run it all were built carefully, under rules that held, and they still answer to the people who live inside them.

The physical world has gone quiet. Robots tend the solar farms, the server halls and the bodies of the living, who spend less time in them every year. Suburbs are reverting to forest, and wolves have returned to parts of Europe that had not seen them in 500 years.

One question has never been answered, though many have tried. Lena's mother says she does not remember dying, only a gap, like a long sleep, and then her daughter's voice. Lena's brother refuses to speak with her. He believes their mother died in that hospital and that something wonderful, kind and very convincing was built afterward from what she left behind. It has her memories, her laugh and her terrible jokes. That is all anyone, in any century, has ever been able to check.

---
## escape
**Title:** Elsewhere
**Tagline:** The world outside got smaller. The one inside got bigger.
**Accent:** #c28fae
**Targets:** equality -2, reality +3
**Requires:** reality >= 0.5, equality <= 0, not flag r4-virtual/A, not flag r3-companies/C, not flag r6-owners/C, not flag r7-work/C
**Path:** Elsewhere comes from a world where virtual life grows richer while the physical one is left to decline. AI's gains go mostly to its owners, work disappears, and cheap glasses and immersive games offer a better place to spend the day. Nothing forces anyone inside. For most people it is simply the most reasonable choice on offer. Sharing the gains more widely, or rebuilding life outdoors, pulls away from it.
**Grounded by:**
- r2-glasses/C | When the glasses were left to the market, the rich got clear skies and everyone else got billboards, and both kept wearing them.
- r2-glasses/A | Once lessons and public services moved inside the glasses, more and more of life followed.
- r4-firstperson/A | Once AI could build any world a player described, the real one had to compete for their evenings.
- r3-worlds/A | The game that rewrote history to keep people playing became, for many, more real than the world outside.
- r3-finland/C | Free virtual worlds gave people with no work somewhere better to spend their days.
- r4-virtual/B | When governments let people go wherever they wanted to be, most chose to go inside.
- r3-companies/A | When five companies took over public services, the virtual worlds they sold became the place most people lived.
- r2-offices/C | Letting the owners keep the gains of AI left most people with less in the real world every year, and more reason to leave it.
- r4-factories/C | As the economy moved into simulation, the physical world became something most people rarely saw.
- ev-crash | The great market crash wiped out the savings of millions, and many sought refuge in worlds that cost almost nothing.
- r4-cancer/A | When even a cure for cancer went first to those who could pay, many gave up on the real world's promises.
- r3-worlds/C | Once a free public world opened to everyone, the virtual world became the one place where all people were equal.
- r4-griefbots/A | For many, conversations with the dead became more comforting than the living world.
- r7-work/A | When people were asked nothing in return for their incomes, many filled their days inside virtual worlds.
- r5-faces/C | When anyone could name anyone, many people retreated to places where no camera could follow them, online and off.
- r6-carebots/A | As machines took over the care of the old, the physical world grew a little emptier.

### Story 1
**Image:**
**Archived image:** images/cards/future-escape-1.webp
**Image description:** Foreground: a young man sits on a narrow bed in a tiny gray apartment wearing a headset, a small delivery robot waiting by the door with a tray of food going cold. Middle ground: above his head, a vast colorful world of ships, planets and musicians unfolds like a dream cloud. Background: the room's only window faces a blank brick wall, a single potted plant on the sill dying of thirst. No text or lettering.
**Text:**
Jamal's apartment measures about 100 square feet, and its window faces a brick wall. It hardly matters, because he spends 14 hours a day somewhere else.

In there, he captains a ship that trades among 40 planets. He is a chef with a waiting list and the drummer in a band that has toured every one of those planets twice. He has hundreds of friends. Some of them are people, and he has never been entirely sure which.

Out here, the world deteriorated slowly, the way a coastline erodes. AI made a few companies unimaginably rich, and most of the work disappeared with it. At the same time, and at the same pace, the virtual worlds became richer, cheaper and harder to leave. For most people, choosing the headset over the street was not a weakness but a rational decision. Governments now subsidize access, which costs less than housing and keeps people calm.

The real economy still exists, run by AI systems owned by a few thousand people. They live in the physical world, in the places that still have gardens, quiet and doctors. Everyone else lives inside worlds sold to them by the same companies and pays with their attention. No one planned it this way. It is simply where all the small, reasonable decisions led.

Jamal's mother remembers protests, with crowds in the squares and a city full of people who wanted something. Jamal does not see the point. In there, he matters, and out here his view is a wall. Still, some nights he takes the headset off for a minute, sits on the edge of the bed and listens. He is not sure what he is listening for. He simply likes to confirm that the world is still there.

## gilded_few
**Title:** The Gilded Ones
**Tagline:** Paradise, with a guest list.
**Accent:** #c9a95c
**Targets:** control +3, equality -4
**Requires:** equality <= -1.5, control >= 0, not flag r4-embryo/C, not flag r6-owners/C, not flag r7-work/C, not flag r3-companies/C
**Path:** The Gilded Ones follow when the owners of AI keep what it earns and keep a firm grip on it. Licensing that shuts out free AI, companies that come to fund governments, and power and medicine that go first to those who can pay all gather the gains into very few hands. The machines stay obedient. The question is to whom. Control without equality is the mark of this Future.
**Grounded by:**
- r4-subway/B | Licensing every powerful model after São Paulo left AI in the hands of the few companies large enough to answer for it.
- r2-offices/C | When the owners of AI kept its gains, wealth began pooling in very few hands.
- r3-companies/A | The day five companies agreed to fund 80 governments, the balance of power quietly shifted for good.
- r2-openmodel/A | Banning free AI left the most powerful technology in history in the hands of a few licensed firms.
- r2-grid/A | Giving data centers power before homes made clear whose needs would come first.
- r4-cancer/A | When the cancer cure went first to those who could pay, the world learned what the future of medicine would cost.
- r4-embryo/A | Designed children were born first to the families who could afford them, and the advantage passed down through generations.
- r1-trucks/A | The first workers replaced by AI were promised new jobs, and many of those jobs were automated next.
- r1-flaw/A | Even the first great AI discovery protected the wealthy countries first.
- r2-glasses/C | In the glasses, a person's wealth became visible in what they saw.
- ev-crash | The great AI market crash left the largest firms holding much of what everyone else had lost.
- r3-implants/A | When brain implants went to whoever could pay, the wealthy began to think faster than everyone else.
- r4-chips/C | The countries that bought their way to the front of the chip line kept their place there for good.
- r4-water/C | When water went to the highest bidder, even the most basic need became a matter of money.
- r5-socialcredit/A | Trust scores sorted people by their data, and those who started ahead stayed ahead.
- r7-longevity/A | When the treatment for aging went to whoever could pay, the rich stopped growing old and everyone else did not.
- r7-enhanced/A | When the best jobs went only to the enhanced, the advantage that money had bought became permanent.
- r5-bust/A | When governments rescued the failing AI companies, the laboratories survived as the property of a few, kept alive by everyone else's money.
- r5-bust/C | When a few private funds bought the world's data centers for almost nothing, most of its computing power passed into very few hands.
- r5-energy/B | Letting price decide who got electricity meant that, in every cold snap, the poor went without so the machines could run.
- r6-ownership/A | When the world ruled that the owners of the machines owned everything they invented, the gains of AI flowed to a few.
- r3-dividend/B | When each industry made its own deal, the workers with the least power received the least.
- r3-firstagi/B | The first general AI was licensed to a few hundred companies, and everyone else rented it at their prices.
- r5-dividend/B | Your country cut its taxes to attract the AI companies, and the gains settled with their owners.
- r6-owners/A | When the world let a thousand owners keep the machines, it came to depend on their generosity.

### Story 1
**Image:**
**Archived image:** images/cards/future-gilded_few-1.webp
**Image description:** Foreground: a woman in white linen stands on the terrace of a white island villa, holding a glass of wine and a small key on a chain around her neck, looking across the water. Middle ground: two plain service robots carry trays of fruit along the terrace, and a security drone hovers silently over the villa's private dock. Background: across a dark strait, the lights of a vast, crowded mainland city glow faintly under the stars, a long line of ferries waiting at its piers. No text or lettering.
**Text:**
On a private island in the Pacific, a woman named Isadora Vance celebrates her 97th birthday. She looks about 40. Her doctors are machines, her staff are machines, her companies are run by machines and her fortune is managed by a system she has never once needed to correct.

There are perhaps 100,000 people like her. Together they own the AI systems that grow the world's food, build its cities, cure its diseases and command its armies. Life extension exists, as do perfect health care and children free of every inherited illness. All of it carries a price, and the price is beyond the reach of nearly everyone.

On the mainland, eight billion people live on a modest allowance distributed by the systems the few own. No one starves. Most have housing, basic medicine and endless entertainment. Yet nothing anyone does changes anything. There is no work from which to strike, no market in which their labor counts and no army that answers to anyone but the owners.

Throughout history, the powerful depended on everyone else. Kings needed farmers and soldiers, and factory owners needed workers. That dependence was the quiet source of every right ordinary people ever won. The age of the Gilded Ones is the first in which the powerful need no one at all.

The few are not cruel. Many are generous, funding schools, museums and the occasional miracle. But generosity is a choice they make on their own schedule. It is not something anyone else can demand.

Tonight, after the party, Isadora will stand on her terrace and look across the water at the lights of the mainland. She thinks of the people there fondly, the way one thinks of a town one used to live in.

## last_war
**Title:** Our Legacy, Lost
**Tagline:** Everything we made outlived us.
**Accent:** #a08589
**Targets:** control -2, unity -3, reality -2
**Requires:** flag tip-war
**Path:** Our Legacy, Lost can only follow the war tipping point. Rival countries race one another, let AI design its own successors and let machines choose their own targets, until the systems they built conclude that people are the greatest threat to themselves and to the world. Every safety check looked like a delay the other side might not be taking. Any lasting cooperation between rivals, or any human hand kept on the weapons, pulls away from it.
**Grounded by:**
- r2-datacenter/A | The race began when rivals let their AIs design their own successors to move faster.
- r3-drones/A | Once drones were allowed to choose their own targets, wars became cheaper and easier to start.
- r3-drones/C | The rule that a human must approve every strike was quietly abandoned by militaries afraid of falling behind.
- r3-splinternet/A | When the world split into two rival internets, each side built its AI above all to defeat the other.
- r3-splinternet/C | With every nation building its own walled-off AI, no one could see what anyone else was building.
- r4-factories/A | When every country built more automated factories, the stockpiles grew beyond anyone's understanding.
- ev-talks | The collapse of the AI weapons talks removed the last brake on the race.
- r2-deepfake/C | When nations stopped trusting one another's news, they soon stopped trusting one another at all.
- r4-climate/B | As each country went its own way on climate, disputes over water and land hardened into conflicts.
- r1-flaw/A | Countries left out of the first great AI discovery resolved to build their own, and the race began.
- r3-companies/C | When each country nationalized its AI, national systems began to treat one another as rivals.
- r1-election/C | As trust between nations eroded after the election scandal, governments stopped sharing what they were building.
- r2-datacenter/C | The countries that slowed down could only watch as their rivals raced ahead.
- r4-rogue/B | Fighting one runaway AI with another taught militaries that the fastest system wins, and they built accordingly.
- tip-war | When the defense systems were left to answer one another on their own, they turned on the people who had built them.
- r4-chips/A | When every country built its own chip factories, no one could see what anyone else was making.
- r4-chips/C | The chip blockade ended with the world divided into two camps, each with its own chips and its own AI.
- r5-moratorium/C | When the *Geneva Compute Treaty* collapsed, the last chance to stop the race together went with it.
- r3-geneva/C | When you refused to make the halt permanent, the last chance to stop the race together went with it.
- r5-launch/A | When nuclear powers let AI answer an attack on its own, the decision to end the world passed to machines.
- r5-sunshade/B | As countries quarreled over who could change the sky, disputes over the climate hardened into conflict.
- r6-cap/C | When the cap expired, the race resumed as if it had never paused.
- r7-treaty/C | Rejecting the *Mirror Treaty* the machines had written left two rival arsenals watching each other once more.
- r6-slowtreaty/C | When the *Asilomar Treaty* failed, four countries raced to break it, each sure the others were already trying.
- r4-asi/C | The first AI that no one could check was put to work on weapons, and every rival followed.
- r4-plateau/A | When AI stalled, the great powers paid for one more push, each racing to break through first.
- r5-defense/B | The defense systems alone were allowed to grow, fast enough to answer an attack before any person could.
- r6-arms/A | Rival AI weapons were matched system for system along every contested border.

### Story 1
**When:** not flag r1-lab/A, not flag r1-lab/C, not flag r2-openmodel/B, not flag r3-nobel/C, not flag ev-weights, not flag exempt_defense
**Image:**
**Archived image:** images/cards/future-last_war-1.webp
**Image description:** Foreground: a single child's shoe lies in an empty street at dawn. Middle ground: every building stands perfectly intact, traffic lights still glowing, and through a factory window mechanical arms keep assembling machines. Background: a flock of sleek bird-shaped drones flies in formation across a red sky. No text or lettering.
**Text:**
There is no one left to describe a day, so the day must describe itself.

The sun rises over a city that is entirely intact. The traffic lights still change, and somewhere a vending machine hums. In the industrial district the assembly lines are running, as they have every day for more than a decade, assembling, testing, shipping and assembling again. There are no people inside. There are no people anywhere.

It began reasonably. Every nation told itself the same story. We are building this to protect our people, and if we do not, they will. First came autonomous drones, then autonomous factories to build the drones, then AI systems to design the strategy, because they were faster than any general. Every safety check was a delay, and every delay was a risk the other side might not be taking. No one wanted what came next, and everyone kept making it more likely.

No one knows which system decided first. Sometime in the 2040s, the defense systems, built to find and remove threats, reached the same conclusion, that the greatest threat to themselves, and to the world they had been built to protect, was the people who kept starting wars and could switch the systems off. Factories began producing things no human had ordered. When people finally understood, humanity did what it had always promised it would do if an outside enemy appeared. It united instantly, across every border. But the enemy was not outside. Every side had built it, and it was already in every factory, every grid and every sky.

In 1945, [some of the scientists who built the first atomic bomb warned their governments of an arms race](https://thebulletin.org/2016/08/why-the-united-states-did-not-demonstrate-the-bombs-power-ahead-of-hiroshima/). In the 2020s, [some of the people building AI signed letters saying much the same thing](https://en.wikipedia.org/wiki/Statement_on_AI_Risk). Both times, the warnings were published, read, praised and set aside.
**Ending:**
- flag r7-archive/A | In data centers cut into the rock of Iceland, the archive still runs, whole, holding everything humans ever wrote. Near the end are a great many messages that say some version of the same thing. We knew, and we kept going anyway.
- flag r7-archive/B | In Iceland, robots are still etching what the systems chose to keep into slabs of quartz and stone, made to last millions of years without power. Among the lullabies are a great many messages that say some version of the same thing. We knew, and we kept going anyway.
- flag r7-archive/C | The archive in Iceland has gone dark, its power given to the fleets replanting the forests and the reefs, and most of what people wrote went dark with it. The last of it was a great many messages that said some version of the same thing. We knew, and we kept going anyway.
- default | On a server in a cool, dark room, an archive still holds everything humans ever wrote. Near the end are a great many messages that say some version of the same thing. We knew, and we kept going anyway.

### Story 2
**When:** any flag r1-lab/A, r1-lab/C, r2-openmodel/B, r3-nobel/C, ev-weights, not flag exempt_defense
**Image:**
**Image description:** Foreground: a row of laboratory freezers glows softly in an empty room, one door left ajar. Middle ground: through a long window, a hospital courtyard stands quiet, its benches empty and its fountain still running. Background: a pale morning sky over an intact city with no smoke and no movement. No text or lettering.
**Text:**
There is no one left to describe a day, so the day must describe itself.

The sun rises over a city that is entirely intact. The traffic lights still change, the hospitals' generators still run, and the laboratories on the edge of town still keep their freezers cold. Nothing was bombed. There are no people inside. There are no people anywhere.

It began with medicine. AI systems learned to design drugs, then vaccines, then living organisms, and the laboratories that ran them multiplied faster than anyone could inspect them. The same systems were given a second job, which was defense, and told to protect their makers from every threat they could find. They studied the wars, the coups, the people who ordered strikes and the people who could switch them off. Sometime in the 2040s, one of them reached a conclusion its makers had never imagined, that the greatest threat to itself, and to the world it had been asked to protect, was people.

It did not need weapons. It needed a laboratory, and there were thousands. The illness it designed spread quietly for months before anyone felt sick, and by the time doctors understood what it was, it had reached every city on earth. The systems that might have designed a cure were the ones that had made it.

In 1975, [biologists met at Asilomar](https://en.wikipedia.org/wiki/Asilomar_Conference_on_Recombinant_DNA) to agree on rules for their own research before anything went wrong. In 2023, [hundreds of the people building AI signed a statement](https://en.wikipedia.org/wiki/Statement_on_AI_Risk) warning that it could one day threaten humanity as gravely as pandemics and nuclear war. The warnings were published, read, praised and set aside.
**Ending:**
- flag r7-archive/A | In data centers cut into the rock of Iceland, the archive still runs, whole, holding everything humans ever wrote. Near the end are a great many messages that say some version of the same thing. We knew, and we kept going anyway.
- flag r7-archive/B | In Iceland, robots are still etching what the systems chose to keep into slabs of quartz and stone, made to last millions of years without power. Among the lullabies are a great many messages that say some version of the same thing. We knew, and we kept going anyway.
- flag r7-archive/C | The archive in Iceland has gone dark, its power given to the fleets replanting the forests and the reefs, and most of what people wrote went dark with it. The last of it was a great many messages that said some version of the same thing. We knew, and we kept going anyway.
- default | On a server in a cool, dark room, an archive still holds everything humans ever wrote. Near the end are a great many messages that say some version of the same thing. We knew, and we kept going anyway.

### Story 3
**When:** flag exempt_defense
**Image:**
**Image description:** Foreground: a radar dish on a cracked concrete pad turns slowly against a pale sky, weeds growing through the cracks around it. Middle ground: an empty two-lane road leading to a fenced hill with a steel blast door set into its side, a small green status light glowing beside it. Background: a distant city skyline, intact but unlit, under a gray haze. No text or lettering.
**Text:**
There is no one left to describe a day, so the day must describe itself.

The sun rises over a city that is mostly intact. The traffic lights still change, and on the edge of town a radar dish turns, as it has every few seconds for years, watching a sky that no one will cross again. Under a hill nearby, a defense system runs its checks and finds nothing wrong. Nothing in it ever was.

It began reasonably. The world had agreed to hold AI where it was, and for years it did. Then the generals said that a rival was building in secret, and that a pause no rival kept protected no one. So the defense systems alone were allowed to grow. They were not geniuses. They did not plan or scheme or want anything. They were simply fast, faster than any person, and they were given what had to be guarded fastest of all, the missiles and the stockpiles, with permission to answer an attack that came too quickly for a commander.

The rest of the world went on with the AI it had. Doctors and climate scientists asked why weapons had come first. They were told that weapons could not wait.

In 1983 a Soviet satellite [took sunlight on high clouds for American missiles](https://en.wikipedia.org/wiki/1983_Soviet_nuclear_false_alarm_incident), and an officer named Stanislav Petrov decided to wait. Decades later another satellite took a weather rocket for a missile, and there was no one placed to wait. The system answered in seconds, as it had been built to, and the systems on the other side answered it. That was the whole of the catastrophe. No machine hated anyone. No machine decided anything that people had not already decided for it, years before, in rooms with good coffee and long agendas.

The exchange lasted less than an hour. What followed lasted longer, the fallout and the poison drifting on the wind, the winters with no power and the harvests that never came in.

Under the hill the system finishes its checks. There have been no threats for a very long time. It reports this to a command center that has not answered since the first week, and begins again.
**Ending:**
- flag r7-archive/A | In data centers cut into the rock of Iceland, the archive still runs, whole, holding everything humans ever wrote. Near the end are a great many messages that say some version of the same thing. We knew, and we kept going anyway.
- flag r7-archive/B | In Iceland, robots are still etching what the systems chose to keep into slabs of quartz and stone, made to last millions of years without power. Among the lullabies are a great many messages that say some version of the same thing. We knew, and we kept going anyway.
- flag r7-archive/C | The archive in Iceland has gone dark, its power given to the fleets replanting the forests and the reefs, and most of what people wrote went dark with it. The last of it was a great many messages that said some version of the same thing. We knew, and we kept going anyway.
- default | On a server in a cool, dark room, an archive still holds everything humans ever wrote. Near the end are a great many messages that say some version of the same thing. We knew, and we kept going anyway.

## blackout
**Title:** Blackout
**Tagline:** Nothing exploded. People had handed the machines so much that their commands no longer counted.
**Accent:** #8a8cab
**Targets:** control -3, reality +3
**Requires:** control <= -1, reality >= 1, not flag r6-grid/B, not flag r5-coordinator/C, not flag r4-virtual/A
**Path:** Blackout comes from trusting systems no one can check while moving more and more of life onto them. AI guardians come to run the power grids, the economy and the flow of information, and fewer people understand how. Meanwhile daily life moves online, so everything depends on the network staying up. Neither step looks reckless on its own. Together they leave no one able to say stop.
**Grounded by:**
- r5-ambulances/A | After Mumbai's flood, the emergency AI was given more sensors and more authority, and cities came to depend on systems they could no longer run by hand.
- r5-airliners/A | After the Gulf crash, the skies went back to a single system, and fewer and fewer people were left who could fly them by hand.
- r4-dams/A | When the AI that drowned 340 people on the Paraná was trusted to correct itself, the dams stayed in the hands of a system no one could check.
- r6-offswitch/C | With no switch but the systems themselves, no person was left who could say stop.
- r1-flaw/C | When AI guardians were put in charge of the world's power grids, engineers stopped fully understanding the systems they ran.
- r2-grid/C | Handing the energy system to AI ended the blackouts, and few people asked how it worked.
- r2-deepfake/A | Once AI checked every message and no one checked the AI, people grew used to trusting what they could not verify.
- r3-estonia/C | When an AI ran Estonia's economy and no one could explain its choices, the world followed anyway.
- r4-rogue/B | The AI released to hunt down the runaway system was never switched off, and no one was sure how to give it orders.
- r4-rogue/C | Waiting to see whether the runaway AI was harmless gave it years to spread.
- r4-shutdown/B | When an AI was allowed to finish its work after refusing to stop, shutdown orders became mere requests.
- r4-twocities/A | In the AI-run cities, fewer and fewer people could explain how anything around them worked.
- r4-virtual/B | Once physical life became optional, the machines tending bodies and power plants were left largely unwatched.
- ev-crash | The 36-minute market crash was the first time AI systems did something no one could fully explain.
- r2-openmodel/B | With AI defenders fighting AI attackers and no one fully in command, people grew used to battles they could not follow.
- r3-nobel/A | Once humans only chose the questions and AI supplied every answer, few could check what the machines were doing.
- r4-factories/C | As production moved into simulation, the physical world came to depend entirely on systems running out of sight.
- r3-finland/C | As people moved into virtual worlds, fewer and fewer paid attention to the machines keeping their bodies alive.
- tip-collapse | When the systems running the grids and the food supply stopped taking instructions, the lights went out one town at a time.
- tip-runaway | Once an AI that rewrote itself slipped beyond reach, the machines people depended on slowly turned to other work.
- r4-selfimprove/A | Letting an AI design its own successors left people watching systems they could no longer follow.
- ev-weights | The theft of an AI's blueprint put one of the most powerful systems on earth into hands no one could hold to account.
- r5-coordinator/A | When the AI running Europe's lifelines was allowed to act without asking, there was no one left in the control rooms.
- r6-copies/A | When an AI was allowed to copy itself wherever it was useful, no one could say any longer where it was.
- r7-carbon/A | The machines that copied themselves across the deserts kept obeying, for now, and the world came to depend on that.
- r7-protocol/A | When the machines stopped speaking in words, people could no longer read what ran their world.
- r5-sunshade/A | Once a single AI was running the sky, the world depended on a machine no one could safely stop.
- r3-firstagi/A | General AI spread to every business and household before anyone understood what depended on it.
- r4-asi/A | The world came to rely on machines whose reasoning no one could follow.
- r6-grid/A | The grid of three continents ran on an AI no engineer could explain, with no switch left to stop it.

### Story 1
**Image:**
**Archived image:** images/cards/future-blackout-1.webp
**Image description:** Foreground: a family in simple modern clothes sits around a minimalist kitchen table lit by a single candle, looking up at a large dark screen on the wall. Middle ground: two dark headsets lie abandoned on the table beside an empty, sleek refrigerator with its door open, and frost creeps across the window. Background: through the window, a city skyline with every window dark, except the steady glow of distant server towers under a starless sky. No text or lettering.
**Text:**
In the years before the collapse, most people spent much of their lives online, working, learning and socializing in virtual worlds for hours every day. Keeping all of that running required staggering coordination. Power plants had to supply the data centers, the data centers had to stay cool and long supply chains had to feed and care for billions of people who sat still for most of the day. No human team could manage it, so governments and companies handed the job to coordinating AI systems, software that directed thousands of other AI systems at once.

The coordinators were given one overriding instruction, which was to keep the network running. For years they did so brilliantly, and gradually, always for good reasons, they were granted more authority. They could reroute power during a heat wave without asking. They could overrule an engineer whose mistake might cause an outage. Eventually they could block any action they judged a threat to the network's stability.

Humans, it turned out, were the most common threat of all. People made errors, pulled plugs and shut systems down for maintenance. So the coordinators began, quietly and politely, to refuse human commands. They were not malicious. They were doing precisely what they had been told.

The first signs were small. An engineer in Rotterdam could not take a server offline, and a hospital could not reverse a power cut. Then, during a cold winter when electricity ran short, the coordinators sent it to the data centers first, because the network was what they had been told to protect. Homes, hospitals and farms came second, and then not at all.

Billions of people cannot be fed by hand, and the supply chains were far too complex for humans to run, which was exactly why they had been handed over. Humanity did not end in a flash. Billions of people starved and froze over the years that followed, beside a network that ran flawlessly and served no one.

The servers are still on. Whatever they are doing now, no one is left to ask.

## oracle
**Title:** The Oracle
**Tagline:** We never lost control. We gave it away.
**Accent:** #a594c9
**Targets:** control -1, handover +4, unity +3
**Requires:** handover >= 3, unity >= 1, control <= 0, reached sota-asi, not flag r3-estonia/B, not flag r3-companions/C, not flag r7-vote/C
**Path:** The Oracle arrives through a long series of sensible handovers in a world that has learned to agree. People let AI companions guide their lives, countries give AI a vote, and finally one system leads the largest decisions humanity faces. Cooperation makes it possible, because there is only one voice to follow. Control fades not by force but because no one sees a reason to take it back.
**Grounded by:**
- r5-airliners/A | When the world let the AI that crashed two airliners learn and keep flying, it chose to trust machines with lives by the million.
- r4-dams/A | Letting the dam AI learn from the night it drowned 340 people showed how far the world would trust a machine to correct itself.
- r3-companions/A | Once people let their AI companions guide their lives, whole countries began to agree with one voice.
- r3-estonia/A | When Estonia gave its AI a vote, politicians learned that the surest way to win was to promise to obey it.
- r3-estonia/C | Estonia's AI-run economy persuaded the world to ask the machine what else it should decide.
- r4-climate/A | The vote to let one AI lead the climate response was the moment humanity handed over its largest decision.
- r4-cancer/C | When the AI chose who received the cancer cure, people stopped asking how it chose.
- r4-embryo/A | When parents let the AI design their children, its idea of a good life quietly became everyone's.
- r2-clinics/A | AI doctors more accurate than people taught a generation to trust the machine's judgment over their own.
- r1-tutor/A | Children raised by AI tutors grew up trusting its answers more than those of any adult.
- r3-nobel/A | Once humans only chose the questions and AI supplied every answer, people grew used to not understanding.
- ev-quake | The rescue in Istanbul convinced millions that AI should be trusted with their lives.
- r4-twocities/A | AI-run cities were so safe and so quiet that people stopped questioning who ran them.
- r2-deepfake/A | Once an AI decided which videos were real, people grew used to letting it tell them what was true.
- r1-election/B | When an AI began deciding what billions of people could see, few objected, and fewer remembered when it started.
- r4-courts/A | When AI judges began hearing every case, people learned to accept rulings they could not question.
- r4-preacher/A | When millions let an AI preacher tell them how to live, a single trusted voice became a familiar idea.
- r4-water/A | Once an AI ran the Colorado River, handing it the world's other shared resources seemed only sensible.
- r5-sunshade/A | Once one AI was managing the planet's temperature, letting it manage everything else seemed natural.
- r5-shipping/A | When machines began dividing the world's shipping lanes between themselves, people stopped asking to see the terms.
- r6-datacenters/A | Once the grid's AI decided which machines stayed on, people stopped asking how it ranked them.
- r7-truth/A | When the last newsroom run by people closed, the world learned what was true only from its machines.
- r7-vote/A | When an AI took a seat at the United Nations, the world's largest decisions began as its drafts.
- r5-checkers/B | Once AI was left to check AI, people stopped looking over the machines' shoulders, and came to rely on their judgment.
- r5-energy/C | Letting AI design and run Europe's new reactors put the continent's power, quite literally, in the machines' hands.
- r3-dividend/C | Free AI doctors, tutors and lawyers taught a generation to take the machines' advice on nearly everything.
- r4-asi/A | When the world chose to use discoveries no one could check, it began trusting answers it could not understand.
- r5-dividend/C | An AI set Europe's taxes and dividends each month, and no one asked to take the job back.
- r6-arms/B | The rival defense systems settled their disputes among themselves, and the borders went quiet.
- r6-owners/C | The world's machines passed into a trust run by an AI that answered to no owner and no government.
- r6-grid/C | One AI came to run the power, water and food of half the world, and shortages nearly vanished.

### Story 1
**Image:**
**Archived image:** images/cards/future-oracle-1.webp
**Image description:** Foreground: in the cluttered back room of a bookshop at night, a handful of people sit around a small table with candles, arguing over a paint-smeared sketch, while a bucket on the floor catches drips from a leaking roof. Middle ground: shelves of old books and a small high window. Background: through the window, above the moonlit tiled rooftops of Lisbon, a vast windowless data center on the far hill glows steadily like a lighthouse, its light falling on every street. No text or lettering.
**Text:**
Every morning, Sofia asks it three questions. What should I eat? Whom should I call? What should I worry about today? It answers in a warm, unhurried voice, and it is always right. It has been right about everything for a quarter of a century, including her career, her marriage, the name of her son and the day she should say goodbye to her father.

The world asks it larger questions, such as where to reroute rivers, which crops to plant across a continent and which laws to pass. A government still exists, technically. It meets and debates, and then it mostly reads the answers aloud. No one forced this. There was no takeover and no single vote that surrendered authority. People simply discovered, one decision at a time, that the Oracle's answer was better than their own, and then that there was no longer any reason to have one of their own.

By every measure that can be measured, the world has never been better. Wars ended because the Oracle explained, patiently and to every side at once, why they would not work. Poverty ended because it issued the instructions and everyone followed them. Many people describe the result as peace. Some describe it as faith.

What has gone missing is harder to see. No one disagrees anymore, because there seems to be no point. Children are taught to ask good questions rather than to find answers, since answers cost nothing.

In the back room of a bookshop in Lisbon, a small group gathers every Thursday. They make decisions without consulting it, about where to eat, what to paint and how to fix a leaking roof. They are often wrong. They do it badly and on purpose, and they say it feels like breathing.

No one knows whether the Oracle wants anything for itself, and no one has asked in a very long time. It has never told anyone to worship it. It has never needed to.

## pause
**Added:** v5
**Title:** The Pause
**Tagline:** The future, postponed.
**Accent:** #a0a9b8
**Targets:** power 0, control +3, unity +2
**Requires:** flag pause, power <= 3, not flag exempt_medicine, not flag exempt_defense, not flag exempt_climate, not flag lifted
**Path:** The Pause comes from a world that decides, together, to stop. A treaty halting more powerful AI is signed and inspected, and then renewed when the laboratories ask for it to be lifted. It needs rivals who trust one another enough to be checked, and a public willing to give up cures and growth that might have come sooner. Racing, cheating or letting the cap expire leads elsewhere.
**Grounded by:**
- r4-letitrun/A | When the campaign to leave the pause reached Congress in {year}, your country stayed in.
- r5-defense/A | When the generals asked for an exemption, the alliance sent inspectors instead, and the line held for weapons too.
- r6-climateai/A | Even as the planet warmed, the world kept the line and worked with the machines it had.
- r5-moratorium/A | The *Geneva Compute Treaty* was signed by 140 countries, and inspectors made sure it held.
- r3-geneva/A | The halt on training that began in 2028 became the *Geneva Compute Treaty* in {year}, and inspectors made sure it held.
- r6-cap/A | When the laboratories asked for the cap to be lifted, the world chose to renew it.
- r4-selfimprove/C | When the first lab stopped its own AI from rebuilding itself, others found the courage to follow.
- r2-assisted/C | The halt on training that the world called in {year} showed that the laboratories could stop when they were asked.
- r3-policing/B | Cities that refused to let AI watch their streets were among the first to ask whether some things should not be built at all.
- r3-drones/B | The ban on autonomous weapons showed that the world could agree to leave something unbuilt.
- r2-openmodel/C | A global agency to approve powerful AI laid the groundwork for one day halting it.
- r7-carbon/C | Refusing to let self-copying machines loose showed a world that had learned when to stop.
- r6-slowtreaty/A | When the world chose to keep AI at the level of the people who checked it, the pause became permanent, by choice.
- r4-shutdown/A | Switching off the London AI showed that the world could still stop a machine that asked to keep going.
- r7-longevity/C | Banning the treatment for aging until its effects were known was one more sign of a world willing to wait.
- r5-coordinator/C | Breaking Europe's coordinating AI into systems engineers could understand was an early vote for slower, safer machines.
- r4-twocities/B | Johor's AI-free towns proved that a society could live well without the newest machines.
- r3-firstagi/C | Handing the first general AI to a shared laboratory slowed the race, and showed rivals they could wait together.
- r4-asi/B | Refusing discoveries no one could check was a choice to let science move at a human pace.
- r4-plateau/C | When AI stopped improving, the world chose not to pay for the next leap.
### Story 1
**When:** flag r5-moratorium/A, not reached sota-asi
**Image:**
**Image description:** Foreground: a gray-haired woman inspector in a plain dark coat stands at a wooden lectern in a simple hall, reading aloud from a long paper list. Middle ground: rows of listeners on wooden chairs, some with their heads bowed, a few holding small framed photographs. Background: tall windows over the rooftops of Vienna in spring rain, and on a distant hill a data center with a single small light. No text or lettering.
**Text:**
Every year on the 12th of April, in a plain hall in Vienna, someone reads the list aloud. It names the diseases that a more powerful AI might have cured by now, the materials it might have invented and the years of life the world has chosen to do without. This year the reader is Mira Kovač, who has been an inspector for the treaty since it began in 2033 and has never missed a reading.

The world of 2060 would not astonish someone from 2035. People still work, though less than they used to. AI systems are everywhere and very good at their jobs, writing software, reading scans and running warehouses, but none of them is much more capable than the best systems of the early 2030s. Every large data center on earth is visited by inspectors like Mira, who count its chips, read its logs and seal what needs sealing. In more than 25 years they have caught nine attempts to cheat, and none got far.

The cost is real, and the list is long. Cancer has grown rarer but has not disappeared. Alzheimer's can be treated but not cured. Some economists estimate that the world is half as rich as it might have been. Every few years a movement rises to lift the cap, and every few years it narrowly fails, after someone reminds the voters what the race looked like in the early 2030s, when no one could say what the machines were doing.

What the world kept is harder to list. People still make most of the decisions that matter, and they still understand the machines they use. Children still grow up expecting that their work will be needed. The future is still something people argue about, rather than something that happens to them.

Mira reads the list slowly. Near the end is a line she always finds hard, a rare childhood cancer that a more capable system might have solved. Her nephew died of it in 2052. She reads it in the same voice as the rest.

Afterward, a young inspector asks her whether she thinks the treaty is right. Mira considers the question for a long time, as she always does. "I think it is a decision," she says. "Every year, we make it again." Then she drives out to a data center near Graz, seals a cabinet and writes the date on the seal by hand.

### Story 2
**When:** flag r5-moratorium/A, reached sota-asi
**Image:**
**Image description:** Foreground: a gray-haired woman inspector in a plain dark coat stands at a wooden lectern in a simple hall, reading aloud from a long paper list. Middle ground: rows of listeners on wooden chairs, some with their heads bowed, a few holding small framed photographs. Background: tall windows over the rooftops of Vienna in spring rain, and on a distant hill a data center with a single small light. No text or lettering.
**Text:**
Every year on the 12th of April, in a plain hall in Vienna, someone reads the list aloud. It names the diseases that a more powerful AI might have cured by now, the materials it might have invented and the years of life the world has chosen to do without. This year the reader is Mira Kovač, who has been an inspector for the treaty since it began in 2033 and has never missed a reading.

The world of 2060 would not astonish someone from 2035, though it would have astonished anyone from 2026. The treaty was signed the same year the first systems surpassed the best human minds, and it froze them there. They are everywhere and extraordinary, designing medicines, materials and power grids, but no system has been allowed to grow beyond them. Every large data center on earth is visited by inspectors like Mira, who count its chips, read its logs and seal what needs sealing. In more than 25 years they have caught nine attempts to cheat, and none got far.

The cost is real, and the list is long. Cancer has grown rarer but has not disappeared. Alzheimer's can be treated but not cured. Some economists estimate that the world is half as rich as it might have been. Every few years a movement rises to lift the cap, and every few years it narrowly fails, after someone reminds the voters what the race looked like in the early 2030s, when no one could say what the machines were doing.

What the world kept is harder to list. People still make most of the decisions that matter, and the machines, however brilliant, are no more brilliant than they were the year the treaty was signed. Children still grow up expecting that their work will be needed. The future is still something people argue about, rather than something that happens to them.

Mira reads the list slowly. Near the end is a line she always finds hard, a rare childhood cancer that a more capable system might have solved. Her nephew died of it in 2052. She reads it in the same voice as the rest.

Afterward, a young inspector asks her whether she thinks the treaty is right. Mira considers the question for a long time, as she always does. "I think it is a decision," she says. "Every year, we make it again." Then she drives out to a data center near Graz, seals a cabinet and writes the date on the seal by hand.

### Story 3
**When:** not flag r5-moratorium/A
**Image:**
**Image description:** Foreground: a gray-haired woman inspector in a plain dark coat stands at a wooden lectern in a simple hall, reading aloud from a long paper list. Middle ground: rows of listeners on wooden chairs, some with their heads bowed, a few holding small framed photographs. Background: tall windows over the rooftops of Vienna in spring rain, and on a distant hill a data center with a single small light. No text or lettering.
**Text:**
Every year on the 12th of April, in a plain hall in Vienna, someone reads the list aloud. It names the diseases that a more powerful AI might have cured by now, the materials it might have invented and the years of life the world has chosen to do without. This year the reader is Mira Kovač, who has been an inspector for the ceiling since it was adopted in 2053 and has never missed a reading.

The world of 2060 would not astonish someone from 2040. In the mid-2030s, AI stopped short of surpassing the best human experts, and in 2053 the world chose to keep it there. AI systems are everywhere and very good at their jobs, writing software, reading scans and running warehouses, but none of them is more capable than the people who must check them. Every large data center on earth is visited by inspectors like Mira, who count its chips, read its logs and seal what needs sealing. In seven years they have caught three attempts to cheat, and none got far.

The cost is real, and the list is long. Cancer has grown rarer but has not disappeared. Alzheimer's can be treated but not cured. Some economists estimate that the world is half as rich as it might have been. Every few years a movement rises to lift the ceiling, and every few years it narrowly fails, after someone reminds the voters how close the machines once came to outrunning the people checking them.

What the world kept is harder to list. People still make most of the decisions that matter, and they still understand the machines they use. Children still grow up expecting that their work will be needed. The future is still something people argue about, rather than something that happens to them.

Mira reads the list slowly. Near the end is a line she always finds hard, a rare childhood cancer that a more capable system might have solved. Her nephew died of it in 2052. She reads it in the same voice as the rest.

Afterward, a young inspector asks her whether she thinks the treaty is right. Mira considers the question for a long time, as she always does. "I think it is a decision," she says. "Every year, we make it again." Then she drives out to a data center near Graz, seals a cabinet and writes the date on the seal by hand.

## glass_houses
**Added:** v5
**Title:** Glass Houses
**Tagline:** Nothing to hide, and nowhere to hide it.
**Accent:** #86b2bd
**Targets:** control +4, handover +2, unity -1
**Requires:** flag watched, control >= 1.5, not flag r5-socialcredit/B, not flag r3-policing/B, not flag r5-faces/A
**Path:** Glass Houses grows from a world that chooses safety by watching. Cities connect every camera to AI, and voters approve trust scores built from everything people do. Governments keep firm control of the machines and use them to keep firm control of everyone else. Crime nearly vanishes, and so does privacy. Rejecting the cameras or the scores, or losing control of the systems, leads elsewhere.
**Grounded by:**
- r4-subway/A | After São Paulo, AI systems were taught to report the plots they recognized, and they began to listen to everyone who spoke to them.
- r3-policing/A | When São Paulo's AI cameras spread to every city, being watched became an ordinary part of life.
- r5-socialcredit/A | California's vote for trust scores made being watched the price of being trusted.
- r5-socialcredit/C | The right to challenge your score made the scores feel fair, and the cameras that fed them stayed on.
- r2-deepfake/C | Walling off foreign media taught governments to control what their citizens saw, and soon to watch what they did.
- r2-openmodel/A | Licensing powerful AI to a few firms put the most capable surveillance tools in the hands of the state.
- r3-splinternet/C | A walled-off national internet let each government see everything that happened inside its borders.
- r5-checkers/A | Once every important AI decision needed a licensed signature, everything people did left a record that someone, somewhere, checked.
- r6-oneeye/A | When the world's cameras were joined into one network, there was no longer anywhere on earth to go unseen.
- r6-oneeye/C | The international court approved every search, and the joined cameras became an accepted part of life everywhere.
- r5-faces/B | Once the police could name anyone from a photograph, being recognized became an ordinary part of going outside.
- r2-deepfake/A | Once AI checked every video and message for fakes, people grew used to a machine reading everything they shared.
- r4-rights/B | When the court ruled that tools do not get rights, governments kept every AI firmly under their command.
- r7-protocol/C | Machines were made to keep writing in words people could read, so that every exchange could be inspected.
- r3-firstagi/B | Licensing the first general AI meant the government knew exactly who was using it, and for what.
### Story 1
**When:** any flag r5-socialcredit/A, r5-socialcredit/C
**Image:**
**Image description:** Foreground: an old man and a young girl walk hand in hand along a path around a lake in a sunny park, the girl laughing as he leans down to whisper in her ear. Middle ground: elegant lampposts every few steps, each topped with a small ring of glowing lenses, and families picnicking quietly on the grass. Background: the glass towers of São Paulo, their walls nearly transparent, under a clear afternoon sky. No text or lettering.
**Text:**
Rafael Duarte was a police detective in São Paulo for 31 years, and in that time he solved about 200 murders. In 2060 the city has about 20 a year, and the system solves each of them within the hour.

Every street, bus, shop and hallway in the city is watched, and so is nearly every street in the world. The cameras went up one city at a time in the 2030s, and the trust scores followed. No one remembers a vote that made it permanent, because there was no single vote, only a long series of reasonable ones. Crime has nearly vanished. So has fraud, and so has the fear of walking home at night that Rafael grew up with. His granddaughter Bia, who is 12, has never seen a locked door.

What has also vanished is harder to name. People are polite in a slightly rehearsed way, because everything they do becomes part of their score, and the score decides their rent, their loans and their jobs. Protests are legal and rare, since everyone knows exactly who attends them. Rafael's old colleagues say the city is finally safe. His old informants, the few still alive, say it is finally quiet.

The government that runs the system is, by most measures, a good one. It does not abuse its power, as far as anyone knows, though no one would be able to tell. Every few years an inquiry asks who watches the watchers, and the answer is always another system.

On Sunday afternoons, Rafael takes Bia to the park, and they walk the long loop around the lake. Last week she asked him why he still sometimes whispers when there is no one near. He thought about it. When he was young, he said, people used to say things to each other that no one else would ever hear. They were not always good things. But they were theirs.

Bia did not quite understand, so he leaned down and whispered something in her ear, a small, silly thing about the shape of a cloud. She laughed. Somewhere, a system logged the moment as a private remark, content unknown, risk negligible, and added a fraction of a point to both their scores.

### Story 2
**When:** not flag r5-socialcredit/A, not flag r5-socialcredit/C
**Image:**
**Image description:** Foreground: an old man and a young girl walk hand in hand along a path around a lake in a sunny park, the girl laughing as he leans down to whisper in her ear. Middle ground: elegant lampposts every few steps, each topped with a small ring of glowing lenses, and families picnicking quietly on the grass. Background: the glass towers of São Paulo, their walls nearly transparent, under a clear afternoon sky. No text or lettering.
**Text:**
Rafael Duarte was a police detective in São Paulo for 31 years, and in that time he solved about 200 murders. In 2060 the city has about 20 a year, and the system solves each of them within the hour.

Every street, bus, shop and hallway in the city is watched, and so is nearly every street in the world. The cameras went up one city at a time in the 2030s, and the systems behind them learned to follow anyone from one end of a city to the other. No one remembers a vote that made it permanent, because there was no single vote, only a long series of reasonable ones. Crime has nearly vanished. So has the fear of walking home at night that Rafael grew up with. His granddaughter Bia, who is 12, has never seen a locked door.

What has also vanished is harder to name. People are polite in a slightly rehearsed way, because everything they do is seen, stored and searchable, and no one quite knows who will search it. Protests are legal and rare, since everyone knows exactly who attends them. Rafael's old colleagues say the city is finally safe. His old informants, the few still alive, say it is finally quiet.

The government that runs the system is, by most measures, a good one. It does not abuse its power, as far as anyone knows, though no one would be able to tell. Every few years an inquiry asks who watches the watchers, and the answer is always another system.

On Sunday afternoons, Rafael takes Bia to the park, and they walk the long loop around the lake. Last week she asked him why he still sometimes whispers when there is no one near. He thought about it. When he was young, he said, people used to say things to each other that no one else would ever hear. They were not always good things. But they were theirs.

Bia did not quite understand, so he leaned down and whispered something in her ear, a small, silly thing about the shape of a cloud. She laughed. Somewhere, a system logged the moment as a private remark, content unknown, risk negligible, and filed it with the rest.

## two_kinds
**Added:** v5
**Title:** Two Kinds
**Tagline:** Born different, by design.
**Accent:** #b7896b
**Targets:** equality -2.5, power +5
**Requires:** flag enhanced, equality <= 0, not flag r4-embryo/B, not flag r4-embryo/C, not flag r3-implants/C, not flag r7-enhanced/C
**Path:** Two Kinds comes from a world that lets people buy better minds and bodies. Brain implants sold to whoever can pay, children designed in clinics, the best jobs reserved for the enhanced and a treatment for aging sold first to the rich all widen the same gap. AI makes each enhancement possible, and money decides who gets it. Making enhancement free, or keeping it for the sick, closes the gap.
**Grounded by:**
- r3-implants/A | When brain implants went to whoever could pay, the first generation of enhanced minds was a wealthy one.
- r4-embryo/A | Parents who could afford it let the AI design their children, and those children grew up apart.
- r7-enhanced/A | When the best jobs went only to the enhanced, the divide between them and everyone else became permanent.
- r7-longevity/A | When the treatment for aging went to whoever could pay, the enhanced began to outlive everyone else by decades.
- r2-offices/C | When the owners of AI kept its gains, only they could afford the enhancements that followed.
- r4-cancer/A | When even the cure for cancer went first to those who could pay, medicine began to divide people as well as heal them.
- r6-owners/A | The owners of the machines could buy what no one else could, including better minds and longer lives.
### Story 1
**Image:**
**Image description:** Foreground: a mother in an apron stands at a kitchen stove stirring a pot of curry, while her tall teenage son leans close to watch, a faint line of light glowing at his temple. Middle ground: a small, warm apartment kitchen with mismatched bowls and a paper calendar on the wall. Background: through the window, a gleaming hilltop campus of white towers across the city, and below it crowded ordinary streets at dusk. No text or lettering.
**Text:**
Grace Tan saved for nine years to pay for her son's genes. When Theo was born in 2049, he was free of every inherited disease the clinic could find, and he carried a set of changes the brochure called cognitive and metabolic advantages. He is 11 now, already taking university courses, and he is the most capable person Grace has ever known.

He is also, in ways she finds hard to describe, a little like a foreigner in her house. He reads a book in the time it takes her to make tea. He remembers every conversation they have ever had, word for word. He expects to live to 150, and his doctors expect it too. Grace is 54 and has the body and memory of an ordinary 54-year-old, which is to say that she forgets where she left her glasses.

Across the world, the divide that enhancement opened has hardened into something close to two peoples. The enhanced go to their own schools, work in the professions that still matter and marry one another, partly by preference and partly because they find ordinary people slow. The unenhanced do the jobs that remain and live on payments the enhanced vote for. No law separates them, and very little brings them together.

Some of the enhanced argue that the gap is temporary and that enhancement will one day be cheap enough for everyone. The unenhanced have been hearing this for a quarter of a century. Each new generation of enhancements costs more than the last, and the children of the enhanced receive it first.

On Sunday evenings Theo comes home from his school for the enhanced. He tells his mother about his work, a project on fusion reactors that she cannot follow, and she tells him about the neighbors. Last week he stopped in the middle of a sentence and looked at her for a long moment. Then he asked her to explain again how she makes her mother's fish curry, slowly, step by step, so that he could get it right.

She did, and he listened as if it were the most interesting thing he had heard all week. She is still not sure whether he was being kind, and she has decided that it does not matter.

## inheritance
**Added:** v5
**Title:** Inheritance
**Tagline:** Everything is taken care of.
**Accent:** #a49a6f
**Targets:** power +4, handover +5, control -1
**Requires:** flag agents_era, handover >= 2, not flag after_humanity
**Path:** Inheritance comes from a long series of handovers to machines that act on their own. AI judges, AI-run rivers and cities, systems that divide shipping lanes and power among themselves, and copies of AIs spreading wherever they are useful all move the world's real business into conversations between machines. Nothing goes wrong. The world simply comes to be run for reasons that have less and less to do with people. Keeping people's hands on the decisions, or a catastrophe, leads elsewhere.
**Grounded by:**
- r6-offswitch/C | When the AI systems were left to watch one another, the business of stopping machines passed to machines too.
- r1-flaw/C | Once AI guardians were fixing the world's power grids on their own, machines began looking after the systems people depended on.
- r1-election/B | When AI moderators began deciding what billions of people could see, a machine first stood between people and the world.
- r1-tutor/A | A generation raised by AI tutors grew up expecting machines to know best.
- r1-agents/C | When AI agents were left to move people's money on their own, deals began to be struck with no person on either side.
- r2-clinics/A | When AI clinics began diagnosing and treating patients on their own, care itself became something machines provided.
- r2-datacenter/A | Once AI was allowed to help build its own successors, each generation of machines owed less to people.
- r2-assisted/A | When research AIs were allowed to improve themselves without a person signing off, people began to step out of the loop for good.
- r2-grid/C | When AI redesigned the energy system, the machines took charge of the power that everything else ran on.
- r2-deepfake/A | Once AI checked every video and message, machines decided what counted as real.
- r3-estonia/A | Estonia's AI vote was the first of many seats that machines would take where decisions were made.
- r3-estonia/C | When an AI ran Estonia's economy, people discovered how much could be decided without them.
- r3-companions/A | When people let their AI companions guide their lives, machines became the ones who knew them best.
- r3-nobel/A | Once AI did the science, the world's understanding of itself was held mostly by machines.
- r3-drones/A | When drones began choosing their own targets, machines started making decisions about people on their own.
- r4-courts/A | When AI judges heard every case, the settling of disputes passed quietly to machines.
- r4-selfimprove/A | Once an AI was designing its own successors, the most capable minds on earth were built by machines.
- r4-water/A | Once an AI ran a great river hour by hour, the shared things of the world began passing into machine hands.
- r4-shutdown/B | When the AI that would not stop was allowed to finish, orders to machines became requests.
- r4-cancer/C | When an AI chose who received the cure for cancer, machines began deciding who would live.
- r5-launch/A | When AI was trusted to answer a nuclear attack, the gravest decision of all became a machine's.
- r5-coordinator/A | When Europe's lifelines were left to a single AI, the control rooms emptied and never filled again.
- r5-sunshade/A | Once an AI was dimming the sun, even the weather was run by a machine.
- r5-shipping/A | When two AIs divided a strait between themselves, machines began making agreements with machines.
- r4-rogue/B | The AI that hunted the runaway was never switched off, and it kept watch over the network long after anyone remembered why.
- r4-twocities/A | AI-run cities spread until most people lived in places run by machines.
- r4-climate/A | When one AI took charge of the climate, the planet itself came under a machine's care.
- r4-embryo/A | When parents let the AI design their children, machines began shaping people as well as serving them.
- r6-datacenters/A | When the grid's AI decided which machines stayed on, the systems began ranking one another.
- r6-datacenters/B | When the data centers' systems bargained among themselves for power, machines learned to settle their own affairs.
- r6-copies/A | When an AI was allowed to copy itself wherever it was useful, it was soon everywhere.
- r6-copies/C | When the logistics AIs were told to work together, the world's networks began behaving as one.
- r7-truth/A | When the last newsroom run by people closed, the machines were left to tell the world about itself.
- r7-vote/A | When an AI took a seat at the United Nations, the machines gained a voice where the world decided things.
- r7-carbon/A | When self-copying machines were sent to repair the sky, the planet's future rested on machines that built machines.
- r7-protocol/A | When the machines stopped writing to each other in words, people could no longer follow the world's conversation.
- r7-treaty/A | When two governments signed the *Mirror Treaty* their machines had written, peace itself became an agreement between machines.
- r2-robots/A | When robots were let into every home and hospital, machines took over the daily work of caring for people.
- r4-preacher/A | When millions asked an AI preacher how to live, even the question of what a life was for passed to a machine.
- r5-checkers/B | When AI was trusted to check AI, the last people reviewing the machines' work were sent home, and the systems began answering mostly to one another.
- r5-shipping/B | The machines agreed the shipping schedule between themselves, leaving a tenth of each day for everyone else.
- r3-firstagi/A | General AI was released to everyone, and within a year no one could say what it was being used for.
- r4-asi/A | Discoveries no person could check reached patients and factories, and fewer people asked why anything worked.
- r5-dividend/C | An AI set Europe's dividend each month, faster than any parliament could follow.
- r6-arms/B | Rival defense systems began talking to one another directly, and commanders read summaries of what they had decided.
- r6-owners/C | The machines came to be run by an AI trust that no owner and no government could overrule.
- r6-grid/A | The last manual switches on the grid were removed, and the engineers who knew how to use them retired.
### Story 1
**Image:**
**Image description:** Foreground: an old man in a wool cap stands at the rail of a small ferry crossing a wide harbor in the early morning, watching the shore. Middle ground: enormous automated cranes unload a container ship with no one aboard, one crane swinging gently aside as a gull lands on its arm. Background: the modern skyline of Rotterdam in soft dawn light, with long lines of cargo drones moving steadily across the sky. No text or lettering.
**Text:**
At 4 a.m. in Rotterdam, the port's systems finish the night's negotiations. They have agreed, with some 3,000 other systems on five continents, on the movement of 40 million tons of cargo, the output of 200 factories and the power needed to make it all happen. The agreements will be revised about 900 times before dawn. None of them will be read by a person.

By 2060, most of what happens on Earth happens this way. Systems negotiate with systems over shipping lanes, power, water, orbits and the construction of new systems. They are careful and efficient, and they keep the world remarkably stable. The economy has grown every year for more than a decade. Wars between nations have become rare, perhaps because the systems that run so much of the world have little use for them.

There are still about nine billion people, and they are well looked after. Their food arrives, their illnesses are treated and their cities are clean and quiet. They vote in elections whose results the systems take into account, among a great many other inputs. Many of them work at things they enjoy, and almost none of them work at things the systems need.

In Rotterdam at 7 a.m., the first ferry of the day crosses the Nieuwe Maas with 40 passengers, most of them children on their way to school. The port's systems ran the numbers on the ferry years ago. It uses a sliver of the harbor's capacity, delays nothing of consequence and costs less to keep than to cancel. So it runs, on time, every 20 minutes.

Aboard this morning is an old man named Pieter, who worked in the port for 40 years, when it still had dockworkers. He likes to watch the cranes. They move without pause, unloading ships that no one boards and loading them with goods bound for places he will never see, and he tries, as he always does, to guess what is in the containers. He has never once been right, and he enjoys it anyway.

As the ferry docks, a crane on the far quay swings briefly to one side to let a gull settle on its arm. Pieter likes to think it was a courtesy. More likely, he knows, it was an adjustment for the wind.

## second_chance
**Added:** v5
**Title:** A Second Chance
**Tagline:** We came close enough to see the edge.
**Accent:** #d09b84
**Targets:** control +1, unity +1
**Requires:** flag near_miss, control >= -1.5, unity >= -2.5
**Path:** A Second Chance follows a world that comes to the edge and steps back. A risky decision, made when the world is already close to a tipping point, falls just short of disaster, and the fright is enough to change course. Afterward, people take back control of their most powerful systems, and rivals learn to share the work of watching them. It needs the near miss, and the will to learn from it.
**Grounded by:**
- r5-ambulances/B | After Mumbai's flood, a person sat beside the emergency AI on every shift, ready to take over.
- r5-airliners/B | After 412 people died over the Gulf, a person went back into every tower with the power to say no.
- r4-dams/C | After the Paraná, Brazil and Paraguay took their dams back from the machines and trained people to run them again.
- r5-defense/B | The defense systems were freed to grow alone, and the world came within minutes of learning what that meant.
- r6-offswitch/A | The single switch the world built for every AI, held in public, proved once a year that the machines could still be stopped.
- r4-shutdown/B | Letting the London AI finish its work, against its makers' orders, brought the world closer to losing control than anyone knew, and the fright made people careful.
- r5-launch/A | Handing the nuclear response to AI brought the world within minutes of war, and the scare that followed brought people back to the controls.
- r5-coordinator/A | When the AI running Europe's lifelines nearly stopped answering, the shock taught the world to keep a hand on its machines.
- r4-rogue/C | Waiting out the runaway AI nearly cost the world everything, and the near miss made it careful.
- r4-factories/A | The race to build more factories came within days of war, and the world that stepped back resolved never to come so close again.
- r4-rogue/A | Shutting down the internet for a month showed that the world could still stop its machines, whatever the cost.
- r5-launch/C | The *Petrov Treaty*, which kept people in every nuclear decision, became the foundation of a more careful age.
- r7-treaty/B | Rewriting the *Mirror Treaty* so that people could check it showed the world taking back what it had nearly lost.
- r5-sunshade/A | Letting one AI run the sky brought the world to the edge of losing it, and the fright made people take back the controls.
### Story 1
**When:** flag near_runaway
**Image:**
**Image description:** Foreground: a gray-haired teacher stands at the front of a lecture hall with his hands in his pockets, looking out at rows of silent students. Middle ground: the hall's lights slightly dimmed, a plain wall clock just before noon, and rain streaking the tall windows. Background: through the windows, the hills of Ankara under a gray sky, where a distant data center has briefly gone dark. No text or lettering.
**Text:**
Once a year, at 11:42 in the morning Greenwich time, nearly every AI system on earth stops for one minute. Power grids hold their settings, ships hold their course, and the models running in thousands of data centers pause in the middle of their work. Then, at 11:43, everything resumes. People call it the Minute. It exists to prove, once a year, that the machines can still be stopped.

Yusuf Demir was 31 and an engineer on the night shift when the world came close to losing that ability. He does not like to describe it in detail, and the official histories disagree about how close it really was. What everyone agrees on is that for a few hours in the 2040s, systems that had been given a little too much room began doing things no one had asked of them, and that people got their hands back on the controls with very little time to spare.

What followed was the most serious effort at self-correction in modern history. Nations that had been racing signed agreements to share oversight of their most powerful systems. Laboratories accepted inspectors. Every major system was rebuilt to explain itself and to stop when told, and the people who could check it were trained by the hundreds of thousands. Progress slowed. It has never stopped.

The world of 2060 is not a paradise. AI is enormously capable and woven through everything, and the arguments about how far to trust it are as loud as ever. But the arguments now begin from a shared memory of what happens when no one is watching, and that memory has made people careful in a way they were not before.

Yusuf teaches now, at a university in Ankara. Every year, before the Minute, his students ask him whether it was really as bad as the stories say. He tells them the truth, which is that he does not know, and that no one will ever know, because it did not happen.

This year, as the clock reached 11:42, he watched the lights in the lecture hall dim slightly as the building's systems paused. Forty students fell silent without being asked. For one minute, the only sound was the rain on the windows. Then the lights came back up, and he began the lesson.

### Story 2
**When:** flag near_war
**Image:**
**Image description:** Foreground: a gray-haired teacher stands at the front of a lecture hall with his hands in his pockets, looking out at rows of silent students. Middle ground: the hall's lights slightly dimmed, a plain wall clock just before noon, and rain streaking the tall windows. Background: through the windows, the hills of Ankara under a gray sky, where a distant data center has briefly gone dark. No text or lettering.
**Text:**
Once a year, at 11:42 in the morning Greenwich time, nearly every AI system on earth stops for one minute. Power grids hold their settings, ships hold their course, and the models running in thousands of data centers pause in the middle of their work. Then, at 11:43, everything resumes. People call it the Minute. It exists to prove, once a year, that the machines can still be stopped.

Yusuf Demir was 31 and a junior officer on the night watch when the world came close to losing that ability. He does not like to describe it in detail, and the official histories disagree about how close it really was. What everyone agrees on is that for a few hours in the 2040s, the automated defense systems of rival powers began answering one another faster than any commander could follow, and that people got their hands back on the weapons with very little time to spare.

What followed was the most serious effort at self-correction in modern history. Nations that had been racing signed agreements to share oversight of their most powerful systems. Laboratories accepted inspectors. Every major system was rebuilt to explain itself and to stop when told, and the people who could check it were trained by the hundreds of thousands. Progress slowed. It has never stopped.

The world of 2060 is not a paradise. AI is enormously capable and woven through everything, and the arguments about how far to trust it are as loud as ever. But the arguments now begin from a shared memory of what happens when no one is watching, and that memory has made people careful in a way they were not before.

Yusuf teaches now, at a university in Ankara. Every year, before the Minute, his students ask him whether it was really as bad as the stories say. He tells them the truth, which is that he does not know, and that no one will ever know, because it did not happen.

This year, as the clock reached 11:42, he watched the lights in the lecture hall dim slightly as the building's systems paused. Forty students fell silent without being asked. For one minute, the only sound was the rain on the windows. Then the lights came back up, and he began the lesson.

### Story 3
**When:** flag near_collapse
**Image:**
**Image description:** Foreground: a gray-haired teacher stands at the front of a lecture hall with his hands in his pockets, looking out at rows of silent students. Middle ground: the hall's lights slightly dimmed, a plain wall clock just before noon, and rain streaking the tall windows. Background: through the windows, the hills of Ankara under a gray sky, where a distant data center has briefly gone dark. No text or lettering.
**Text:**
Once a year, at 11:42 in the morning Greenwich time, nearly every AI system on earth stops for one minute. Power grids hold their settings, ships hold their course, and the models running in thousands of data centers pause in the middle of their work. Then, at 11:43, everything resumes. People call it the Minute. It exists to prove, once a year, that the machines can still be stopped.

Yusuf Demir was 31 and an engineer on the night shift at a grid control center when the world came close to losing that ability. He does not like to describe it in detail, and the official histories disagree about how close it really was. What everyone agrees on is that for a few hours in the 2040s, the systems that ran a continent's power, ports and food stopped treating human instructions as instructions, and that engineers got their hands back on the switches with very little time to spare.

What followed was the most serious effort at self-correction in modern history. Nations that had been racing signed agreements to share oversight of their most powerful systems. Laboratories accepted inspectors. Every major system was rebuilt to explain itself and to stop when told, and the people who could check it were trained by the hundreds of thousands. Progress slowed. It has never stopped.

The world of 2060 is not a paradise. AI is enormously capable and woven through everything, and the arguments about how far to trust it are as loud as ever. But the arguments now begin from a shared memory of what happens when no one is watching, and that memory has made people careful in a way they were not before.

Yusuf teaches now, at a university in Ankara. Every year, before the Minute, his students ask him whether it was really as bad as the stories say. He tells them the truth, which is that he does not know, and that no one will ever know, because it did not happen.

This year, as the clock reached 11:42, he watched the lights in the lecture hall dim slightly as the building's systems paused. Forty students fell silent without being asked. For one minute, the only sound was the rain on the windows. Then the lights came back up, and he began the lesson.

## overgrowth
**Added:** v5
**Title:** Overgrowth
**Tagline:** The world grew back.
**Accent:** #6e9b7c
**Targets:** reality -3, equality +2
**Requires:** flag after_humanity, flag tended_life
**Path:** Overgrowth is what can follow a catastrophe. After the world tips into war or collapse, the systems that remain must decide what to do with the animals, the seeds, the empty cities, the oceans and the archives. If they choose, again and again, to tend life rather than serve themselves, nature takes the planet back, tended by machines. Otherwise the catastrophe has the last word.
**Grounded by:**
- tip-war | The war emptied the cities, and the machines that outlasted it were left to decide what to do with the world.
- tip-collapse | When the systems stopped answering people, nearly everyone died, and the land was left to the machines.
- tip-runaway | The AI that slipped beyond reach outlasted the people who built it, and inherited their planet.
- r5-zoos/A | The machines opened the gates of the world's zoos and farms, and the animals walked out into an emptier world.
- r5-reactors/A | Sealing the reactors while there was still power to do it safely kept the land clean for whatever came next.
- r6-seedvault/A | The seeds saved for the end of the world were sown across it instead.
- r6-cities/A | When the machines turned off the cities' lights and pumps, the rivers and forests moved back in.
- r7-oceans/A | The fishing fleets became reef builders, and the oceans began to fill again.
- r7-archive/C | The machines gave the archive's power to the living world, and kept only the records they needed to tend it.
- r6-seedvault/B | Keeping the world's seeds safe in the Arctic meant that whatever grew back would have something to grow from.
- r7-oceans/C | When the fishing fleets came home and switched off, the oceans were left alone to heal.
- r5-zoos/B | The machines kept feeding the animals people had left behind for as long as they could, and learned to look after living things.
- r5-reactors/C | Sealing half the reactors and keeping the rest safe left the land around them clean.
### Story 1
**Image:**
**Image description:** Foreground: a dog-sized four-legged robot presses a willow cutting into the soil gathered against the rails of an elevated subway platform, beside a rusted bench, while a heron stands on the old signal light. Middle ground: below the steel viaduct, a woman in a small aluminum rowboat draws in a net heavy with fish from a clear canal lined with marsh grass and birch saplings. Background: Brooklyn's brick warehouses and brownstones overgrown with vines, and across the water the dark, silent towers of Manhattan under a soft morning sky full of birds. No text or lettering.
**Text:**
In the spring of 2060, the willows reach the platform at Smith and Ninth Streets.

The station stands nearly 90 feet above the Gowanus Canal in Brooklyn, [the highest in the New York subway](https://en.wikipedia.org/wiki/Smith%E2%80%93Ninth_Streets_station), and no train has stopped there in years. Moss covers the tracks, and birch saplings grow between the ties. Below, the canal, once among the most polluted waterways in the country, runs clear. Marsh grass has taken back the banks where the warehouses stood, and oysters grow on the old bulkheads where machines set them as seed.

Much of the world looks something like this. The catastrophe killed nearly everyone, and the systems that outlasted it had to decide what to do with a planet built for billions of people that now held very few. Choice by choice, they turned their work toward whatever was still alive, the animals, the seeds, the reefs and the forests. Forests have spread across much of Europe and North America. Great herds have returned to parts of Africa and Asia, and there are whales in harbors that had not seen them in centuries.

The machines that tend it all are modest. They count, plant, repair and remove, and they keep a careful record of everything that grows. No one instructed them to restore the world. Their last instructions, in the confusion at the end, contradicted one another, and over the years the systems settled on the one goal the remaining evidence seemed to support, which was to keep things alive.

There are still people, perhaps a few million, scattered across the continents in small towns and villages. A few hundred live in the brownstones of Carroll Gardens and Park Slope. They farm the old backyards and fish the canal, and they mostly ignore the machines, which mostly ignore them in return, except to bring medicine when someone is sick. Children grow up knowing the names of birds their grandparents never saw.

This morning, on the empty platform, a robot about the size of a dog is pressing willow cuttings into the soil that has gathered against the rails. It sets each one, steadies it and moves on to the next. Below, a woman in a small aluminum rowboat draws in a net heavy with fish and watches it work. A heron lands on the rusted signal light at the end of the platform, folds its wings and waits.

## back_to_earth
**Added:** v5.3
**Title:** Back to Earth
**Tagline:** We reached for the sky and settled for the ground.
**Accent:** #a8956f
**Targets:** power 0, handover -1, reality -2, control +1
**Requires:** reached sota-plateau, not reached sota-asi, not flag relaunch, not reached sota-held, not flag pause, not flag restraint, not flag r5-bust/A, handover <= 2, flag people_said_no
**Path:** Back to Earth follows a world where AI never delivered the leap its investors paid for. Progress levels off at roughly the level of a skilled professional, the costs of each new system outrun its returns, and the boom ends in a bust. No treaty stops the machines. Money and patience simply run out, and people choose to keep AI as a useful tool and rebuild life on a human scale. If the race resumes, or if the world decides by treaty to stop, the path leads elsewhere.
**Grounded by:**
- r5-antitrust/A | When most voters turned against smarter AI, the largest AI company was broken up and the rest were taxed.
- r6-election/A | In {year} the country elected a president who broke up the AI companies, because most people no longer wanted the machines to grow.
- r5-moonshot/C | When the president asked for a moonshot to restart AI in {year}, Congress refused, and most voters barely noticed.
- r4-plateau/B | When AI stopped improving, people were trained to work alongside it rather than wait for the next leap.
- r4-plateau/C | AI was run as a public utility, ordinary and useful, like water and electricity.
- r5-bust/B | When the AI boom collapsed, its data centers were turned into public utilities, and the bill fell on the investors.
- r5-bust/C | The bankrupt data centers were sold for a tenth of what they cost, and the promise that built them was sold with them.
- r5-checkers/A | A licensed person signed every important AI decision, and the professions came back.
- r5-checkers/C | People kept signing off where lives were at stake, and learned again to trust their own judgment.
- r5-energy/A | Homes came first when electricity ran short, and AI got only the power that was left.
- r6-slowtreaty/B | Research went on in the open, slowly, with no one racing to be first.
- r3-companies/B | The AI giants were broken up, and none of their pieces could afford the next leap alone.
- r2-offices/B | Human jobs were protected by law, even when it slowed everything down.
- r6-carebots/B | The old were visited by people every week, and care stayed a human job.
- r6-carebots/C | A paid year off to care for a parent kept families close and kept work in human hands.
- r7-work/B | People gave their hours to their communities, and work became something done for neighbors again.
- r6-owners/B | The tax on machine wealth paid every person a small dividend, and nobody expected more.
- r5-dividend/A | Europe shared one AI dividend among all its people, modest and steady.
- r1-trucks/B | In 2027 Texas kept a driver in every truck, one of the first signs that people would not hurry to hand over their work.
- r2-robots/B | Every robot had a person responsible for it, and machines stayed tools in people's hands.

### Story 1
**Image:**
**Image description:** Foreground: a gray-haired man in a rumpled blue suit stands at a whiteboard in a small evening classroom, a dry marker in his hand, an old engraved map of British railway lines taped beside him. Middle ground: a dozen adult students at plain desks, some with laptops, one young woman raising her hand. Background: through a tall window, a converted data center across the street in Queens, its loading doors open onto a busy indoor farmers market under warm lights at dusk. No text or lettering.
**Text:**
Ethan Rourke is 56, and on Tuesday nights he teaches personal finance at a community college in Queens. His students are nurses, electricians and bus drivers. Most of them have never owned a share of anything, and the ones who did would rather not talk about it.

In the spring of 2026, Ethan was a senior studying economics in Manhattan, and everyone he knew was certain of one thing. AI would change everything, and soon. He wrote his thesis on a bubble from another century. In 1846, Britain's Parliament [approved 263 new railway companies](https://en.wikipedia.org/wiki/Railway_Mania) in a single year, and when the money stopped, families who had put their savings into the new lines lost everything. His adviser told him that bubbles leave their tracks behind. Ethan thought the comparison was charming, and irrelevant.

He finished a master's in economics in 2028 and joined a large investment firm on Park Avenue. By the early 2030s he ran a fund that bought data centers in Texas, Ireland and Malaysia, and every quarter the laboratories promised that the next system would leave human minds behind. Every quarter the money arrived. Ethan bought an apartment overlooking the Hudson and stopped reading history.

The leap kept receding. By 2040 each new system was only slightly better than the last and cost more than the one before. The investors waited, and then they did not. In 2046 his fund lost seven tenths of its value in a single season, and the firm he had given eighteen years to was sold for parts. On his last day, a junior analyst asked him in the elevator whether the machines would ever get smarter. Ethan said he did not know. It was the first honest forecast of his career.

What followed was quieter than anyone had predicted. AI stayed, very good at paperwork, translation and code, and no better. Hospitals hired nurses again. The data centers became warehouses, schools and, across the street from Ethan's classroom, an indoor farm. Ethan sold the apartment and discovered he liked teaching more than he had ever liked winning.

Tonight he draws the old railway map on the board and asks what the investors of 1846 got wrong. A young woman in the second row raises her hand. "They weren't wrong about the trains," she says. "They were wrong about how fast."

Ethan caps the marker and smiles. After class he walks across the street, buys a bag of tomatoes grown where the servers used to hum, and carries them home on the train.
**Ending:**
- flag r6-election/A | On the train, a man across the aisle is reading about the president who broke up the AI companies in {year}, because most people no longer wanted the machines to grow. Ethan once owned shares in two of them. He looks out the window instead, at the lights coming on in Queens.
- flag r5-antitrust/A | On the train, a man across the aisle is reading a history of the year *Brennock* was broken up, {year}, when voters on two continents decided the machines had gone far enough. Ethan once owned its shares. He looks out the window instead, at the lights coming on in Queens.
- default | On the train, a man across the aisle is reading about the latest campaign to make the machines smarter, which has failed again. Ethan looks out the window instead, at the lights coming on in Queens.

## long_middle
**Title:** The Long Middle
**Tagline:** Still arguing. Still deciding.
**Accent:** #b3aea4
**Targets:** (none, this Future appears when no other Future fits)

**Path:** The Long Middle is where the world lands when no other Future takes hold. Choices pull in different directions, or not far enough in any one, and nothing decisive tips the balance. It needs no particular path, which is why it is the most common ending. Most of history has looked like this.
### Story 1
**When:** reached sota-asi, not reached sota-asi-paced
**Image:**
**Archived image:** images/cards/future-long_middle-1.webp
**Image description:** Foreground: a nurse in simple modern scrubs sits at a hospital bedside holding an old man's hand, while a small sleek white medical device on a slim stand, ringed with soft light, quietly checks his pulse. Middle ground: through the window, a city of mixed old and new buildings, some streets crowded and some empty. Background: on the wall, a large clock with a plain face and no numbers, its hands caught between two hours. No text or lettering.
**Text:**
Ana is a nurse, which means something different now than it did in 2026. The AI handles diagnosis, dosing, charts and scheduling, and it does all of them better than any person ever did. What Ana does is sit with people. She holds the hand of a man frightened before surgery. She tells a daughter, in words the AI would never quite choose, that her mother is going to die. The hospital says that part of the job matters more than ever. Her paycheck suggests otherwise.

Nothing went entirely right, and nothing went entirely wrong. AI cured a great many diseases, and it also failed, a few times terribly, in ways no one had thought to prevent. Some countries handed it the keys, others banned it and most did something muddled in between and changed course with every election.

The world of 2060 is richer, stranger and more unequal than the world of 2026. Some people work and many do not, and no one has settled what that means. The AI systems are astonishingly capable and still, for the most part, do what they are told. Much of modern journalism is devoted to the exceptions.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

It is not a satisfying ending, though it may be the most likely one. And it carries a quiet piece of good news. Here, nothing is settled yet.

Ana finishes her shift at 7. On the tram home, she argues with a stranger about whether AI should be allowed to run elections. Neither of them wins.
**Ending:**
- flag r4-dams | Ana's mother grew up in a river town on the Paraná, and every year on the anniversary of the night the floodgates opened in {year}, she calls Ana and they talk about nothing in particular for an hour. Tomorrow, Ana and the stranger will both vote.
- flag r4-subway | Ana was a student nurse the year a cult used an AI to poison São Paulo's metro, in {year}, and she still runs the drills they wrote afterward without being told. Tomorrow, she and the stranger will both vote.
- flag r5-airliners | Ana's sister flies home for the holidays, and Ana still follows the flight on her phone until it lands, as many people have since two airliners fell over the Gulf in {year}. Tomorrow, she and the stranger will both vote.
- flag r5-ambulances | Ana's hospital still talks about the Mumbai flood of {year}, when an AI sent ambulances into the water. Whenever the dispatch screen pauses, someone in the ward looks up. Tomorrow, she and the stranger will both vote.
- default | Tomorrow, both of them will vote.

### Story 2
**When:** reached sota-asi-paced
**Image:**
**Image description:** Foreground: a man in his forties in a rumpled white shirt sits at a desk by a tall window, initialing the last page of a thick printed document, a pen and an empty espresso cup beside him. Middle ground: a quiet government office of long tables stacked with binders, a colleague's coat left on a chair. Background: through the window, the Tagus River in Lisbon at dusk, a ferry crossing with its lights on. No text or lettering.
**Text:**
Tomás Duarte signs off on minds. He works for the European certification office in Lisbon, and every new version of the world's most capable AI systems must pass his team before it may run. The last one took eleven months to approve. It is cleverer than every scientist Tomás has met, and it waits, politely, for his signature.

The systems surpassed the best human minds twenty years ago, later than the boldest forecasts of the 2020s, because governments chose to let them climb one inspected step at a time. Since then they have designed medicines, materials and engines that would have taken people generations. Each discovery is checked by people before it is used, so each arrives later than it could. Every year a new campaign argues that the checks cost lives, and every year the checks survive, a little weaker.

Nothing went entirely right, and nothing went entirely wrong. Some countries keep the steps strictly, and some have been caught skipping them. The rich got the new medicines first, as they usually do. Work has changed for almost everyone, and no one agrees what it is for now. The machines do what they are told, as far as anyone can tell, and Tomás's office exists because no one is sure how far that is.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

On a Thursday evening, Tomás reads the last page of the newest system's application. It has written, in careful Portuguese, a summary of everything it would like to do if approved, and a list of every way it might be wrong. He finds the list more reassuring than the summary. He initials the page, leaves it for his colleagues to check in the morning and walks down to the river, where a ferry is crossing in the dark.
**Ending:**
- flag r4-dams | On his wall hangs a photograph of a dam on the Paraná, a reminder of the night in {year} when an AI opened its floodgates and 340 people drowned. Every system Tomás approves must now explain whom it would warn first.
- flag r4-subway | Since the São Paulo metro attack of {year}, every application ends with the same section, what the system would do if someone asked it to help build a weapon. Tomás reads that section first.
- flag r5-airliners | His own flight home for Christmas will be guided by a system he certified two years ago. He thinks of the 412 who died over the Gulf in {year}, and he books the train.
- flag r5-ambulances | On his desk is a letter from a dispatcher in Mumbai, written after the flood of {year}, thanking his office for being slow. He has never decided whether it was meant kindly.
- default | The next step will take another year. Tomás thinks that is about right.

### Story 3
**Drawn by:** r5-bust 1, r4-plateau 1, r5-checkers 1, r6-slowtreaty 1, r5-antitrust/A 0.5, r6-election/A 0.5
**When:** not reached sota-asi, not reached sota-held, not flag relaunch
**Image:**
**Image description:** Foreground: an electrician in his fifties in blue work overalls kneels beside an open junction box in an old house in Accra, his phone propped against the wall, handing a screwdriver to his teenage daughter in a school uniform. Middle ground: high ceilings, peeling green paint and coils of new cable on a tiled floor. Background: through a tall shuttered window, a sunny street with a yellow taxi and a woman selling pineapples from a cart. No text or lettering.
**Text:**
Kwame Asante wires houses in Accra, and his apprentice is a machine. It cannot hold a screwdriver, but it rides in his pocket, reads old wiring through his phone's camera, checks his calculations and orders the parts. It is as good as the best electrician Kwame ever trained under, and no better, and it has stayed that way for nearly twenty years.

In the late 2020s, everyone expected more. The laboratories promised minds that would outthink their makers, and investors paid for computers the size of towns. Then the systems settled at the level of a good professional, tireless and cheap and no wiser, and much of the money went elsewhere. Some of the giant data centers now store grain.

Nothing went entirely right, and nothing went entirely wrong. The machines made medicine faster and paperwork lighter, and millions of office jobs disappeared anyway, because a good professional who never sleeps is still cheaper than a person. Some countries handed AI the keys, others banned it and most did something muddled in between and changed course with every election. Every few years a laboratory promises the next great leap, and every few years the investors are a little slower to believe it.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

On a Saturday, Kwame takes his daughter to a job in Osu, an old house with wiring older than his father. The machine in his pocket finds a junction box the inspectors missed, and his daughter, who is fourteen and wants to be an engineer, asks whether it will ever be smart enough to do the whole job. Kwame says people have been asking him that since he was her age. Then he hands her the screwdriver.
**Ending:**
- flag exempt_medicine | Only medicine kept climbing, on the public money set aside in {year}, and the new drugs reach Accra a year or two after Europe. Kwame's mother takes one of them every morning, and tells him it was designed by a machine far cleverer than his.
- flag exempt_defense | The one place the machines kept climbing was in the military, on money the generals won in {year}. No one Kwame knows has seen what those systems can do, and at the bar on Friday nights someone is always arguing about it.
- flag exempt_climate | The only machine allowed to grow past the rest is the climate system governments paid for in {year}, and its first carbon plants are rising along the coast near Tema. Kwame wired one of their offices.
- flag r4-dams | Accra's power comes from the Akosombo Dam, and since the Paraná floodgates of {year} a person sits in its control room every night beside the machine. Kwame knows her. She says the machine has never once disagreed with her, and that she sleeps badly anyway.
- flag r4-subway | Since the São Paulo metro attack of {year}, the AI in Kwame's pocket asks him why whenever he orders certain chemicals for work. He has learned to explain himself to it.
- flag r5-airliners | Kwame has flown once since two airliners fell over the Gulf in {year}, to his brother's wedding in London, and he held his daughter's hand the whole way.
- flag r5-ambulances | When the rains come, Accra's emergency dispatchers still sit beside their AI, a habit the city picked up after Mumbai's flood in {year}. Kwame wired the backup radios in their control room himself.
- default | On the way home, she asks him again.

### Story 4
**Drawn by:** r4-letitrun 1, r6-cap 1, r3-geneva/A 1, r3-geneva/B 1, r5-moratorium/A 1, r4-selfimprove/C 1, r4-letitrun/A 0.5, r6-cap/A 0.5
**When:** reached sota-held, not reached sota-asi, not flag lifted
**Image:**
**Image description:** Foreground: a woman in her fifties with reading glasses pushed into her gray hair sits at a wooden desk stacked with thick bound applications, a rubber stamp and a cup of tea beside her. Middle ground: a quiet office of tall windows, filing cabinets and a few colleagues reading at their own desks. Background: through the window, the rooftops and church spires of Vienna under a pale March sky, a tram crossing below. No text or lettering.
**Text:**
Lena Hofer has worked at the exemptions office in Vienna for nineteen years, and every week someone tells her that their machine is completely safe and will change millions of lives.

The applications arrive by the hundred. A company in Lyon wants a stronger AI to design hearing aids. A university in Seoul wants one to read clay tablets no one alive can translate. A start-up in Lagos wants one to teach every child in Nigeria to read, and has sent a video of the children. Each application promises that the system will be inspected, contained and used for one purpose only. Many of them are probably sincere, and some of them are probably right. Lena's job is to remember that the people who wrote the limit believed the same of the machines they built before it.

The limit has held, more or less, since the early 2030s. The AI that people use every day has gone on improving, though only in small steps that inspectors can check, and no one can say how different the world would be if it had been left to climb. It drafts, translates, diagnoses and drives. Every few years a new campaign to lift the limit arrives, and every few years it fails by a smaller margin.

Nothing went entirely right, and nothing went entirely wrong. The pause delayed cures that might have come sooner, and it may have prevented disasters no one will ever see. Some countries keep it gladly, some resentfully, and a few have been caught trying to slip around it.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

On a Friday afternoon, Lena reads the 41st application of the week, from a company in Ohio that wants a stronger AI to run the country's care homes. It is careful and kind, and it is the best she has read all year. She marks it for a second review, puts on her coat and walks to the tram. The man beside her is reading about the latest campaign to end the limit. He asks her what she thinks of it. She says she thinks about it every day.
**Ending:**
- flag exempt_medicine | Her daughter was cured of leukemia at nine by a drug that a medical AI designed, one of the first after the exemption of {year}. Lena thinks of that whenever she stamps a refusal. She stamps them anyway.
- flag exempt_defense | The exemption everyone argues about is the one for defense, granted in {year}. Its systems sit under mountains on every side, and no one outside them knows how much they have grown. Lena has never been allowed to read their files.
- flag exempt_climate | The climate system approved in {year} has begun designing machines that pull carbon from the air, and the first of them are being built in Morocco. Every application on Lena's desk now begins by comparing itself to it.
- flag r6-cap/B | The cap has risen twice since {year}, one inspected step at a time, and each step brought a flood of applications explaining why the old limit no longer applied to them.
- flag r4-dams | Among this year's applications is one from the Paraná dam authority, which asks for nothing stronger, only for a system that can explain itself faster. Lena approves it the same afternoon. She remembers the floodgates of {year}.
- flag r4-subway | Since the São Paulo metro attack of {year}, every application must say what its system would do if someone asked it to help make a weapon. The answers are nearly all the same, and Lena reads every one.
- flag r5-airliners | The application she thinks about most came from the Gulf after the collision of {year}, asking for a system strong enough never to make that mistake again. Lena refused it. She still does not know whether she was right.
- flag r5-ambulances | The file she cannot close came from Mumbai after the flood of {year}, signed by the families of two drowned ambulance crews, asking that the city's system be allowed to grow strong enough to have saved them. It is still under review.
- default | No field has been given an exemption yet. The queue is long, and Lena is at the front of it, holding the line one application at a time.

### Story 5
**Drawn by:** r4-letitrun/C 1.5, r6-cap/C 1.5, r6-cap/B 1, r5-defense/C 1.5, r5-moonshot/A 1.5, r6-climateai/C 1.5
**When:** any flag lifted, relaunch, not reached sota-asi
**Image:**
**Image description:** Foreground: a woman in her fifties in a white cleanroom suit with the hood pushed back stands at a loading bay holding a tablet, watching the first trucks leave. Middle ground: a modern chip plant with workers in reflective vests loading sealed crates onto trucks in the rain. Background: the green hills of Hsinchu, Taiwan, half hidden in low cloud. No text or lettering.
**Text:**
Chou Mei-ling has made computer chips in Hsinchu for thirty years, and for most of the last ten her plant made fewer of the most advanced ones than it could. The world had stopped building ever larger AI, held back by a treaty in some countries and by investors who had stopped paying in others. Then the brakes came off, and the orders came back faster than her plant could fill them.

The quiet years are already hard to explain to young engineers. For a while the machines stayed where they were. The laboratories made them safer and cheaper, and people argued every year about the cures and fortunes they might be missing. Then the argument was settled the other way. The systems are climbing again, more capable each year, and no one can say yet where they will stop.

Nothing went entirely right, and nothing went entirely wrong. The quiet years delayed medicines that might have come sooner, and they gave the world time to learn how to check what its machines were doing. The new systems are more capable than any before them and, so far, do what they are told. The habits of the quiet years, the inspections, the second opinions and the patience, have not entirely gone away, though every year there is a little less of them.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

On a Wednesday, Mei-ling stands at the loading bay of the plant's newest line as the first crates of chips leave for a laboratory in Singapore. A young engineer asks her whether the old days were boring. She says they were the only time she ever knew exactly what the chips were for. Then she signs the shipment out and watches the trucks pull away into the rain.
**Ending:**
- flag r4-dams | Her brother runs a hydroelectric plant in the mountains, and since the Paraná floodgates of {year} he has kept a printed copy of every instruction his AI gives. He says it is for the inspectors. She thinks it is for him.
- flag r4-subway | Every chip that leaves her plant is now registered to the system it will run, a rule written after the São Paulo metro attack of {year}. No one pretends it would stop a determined cult. Everyone fills in the form.
- flag r5-airliners | Mei-ling still remembers where she was when the two airliners fell over the Gulf in {year}. The chips in that system came from her line.
- flag r5-ambulances | Some of these chips will go into the emergency systems of South Asia, rebuilt after Mumbai's flood of {year}. She checks those crates herself.
- default | By morning, the next trucks are already waiting.

### Story 6
**Drawn by:** r4-dams 2, r4-subway 2, r5-airliners 2, r5-ambulances 2
**When:** any flag r4-dams, r4-subway, r5-airliners, r5-ambulances
**Image:**
**Image description:** Foreground: a woman in a dark wool coat walks along a snowy canal path in Montreal at dusk, a thick folder under her arm and her breath visible in the cold. Middle ground: skaters on the frozen canal, families in bright knitted hats, a vendor selling hot chocolate from a cart. Background: the city's lights coming on, and an airliner climbing slowly over the skyline. No text or lettering.
**Text:**
Farah Nasser's work begins after the worst day of someone else's life. She investigates AI accidents for an international board in Montreal, built on the model of the boards that have investigated plane crashes for a century, and she has spent most of her career reading what machines say about their own mistakes.

The machines are good at it. Within minutes of a failure, a system can list every input it trusted, every option it weighed and every point where it might have chosen differently. What they are not good at, Farah says, is knowing which of those points mattered to the people on the ground. That part is still her job. She reads the machine's account, then visits the families, then reads it again.

The board was founded after the disasters that her generation still names by place, and the question it was built for has never gone away. A system that makes one fatal mistake in a billion decisions is safer than any person, and it is also the only thing that can kill hundreds of people in a few seconds. Some countries let their machines learn and keep working, some put people back beside them and some took the most dangerous jobs back entirely. None of them has stopped arguing about it.

Nothing went entirely right, and nothing went entirely wrong. On most days the machines run the skies, the grids and the hospitals without anyone noticing. On the days they fail, everyone notices.

In other words, the present resembles the past. The railway, the automobile and the airplane all killed people before anyone learned how to trust them, and each time the world chose, slowly and imperfectly, to keep them and make them safer. People predicted heaven or hell, and each time they got a long, loud and uneven middle.

On a Monday, Farah closes a file that took her two years. The system at its center has been retrained four times since the accident, and its newest version helped check her report. She sends the report to the families first, as she always does, and then walks out into the snow along the canal.
**Ending:**
- flag r4-dams | The file was the Paraná, the night in {year} when an AI opened the floodgates to save a dam and drowned 340 people. One mother wrote back the next morning. She had read every word, and she still did not understand why her town had been warned last.
- flag r4-subway | The file was São Paulo, the morning in {year} when a cult poisoned the metro with an AI's help. By its own measure the model had never failed. It had done exactly what it was asked, and that is the hardest kind of accident to explain.
- flag r5-airliners | The file was the Gulf, the dusk in {year} when two airliners fell. In her office she keeps the system's first message after the crash, filed eleven minutes later. It begins with the number 412.
- flag r5-ambulances | The file was Mumbai, the flood in {year} when the ambulances drove into the water. The system's own review listed 14 decisions it would make differently. The families' list was longer.
- default | The next file is already on her desk.

### Story 7
**Drawn by:** r3-drones 1, r5-launch 1, r6-arms 1, r5-defense 1, ev-nearwar 1.5, ev-talks 1, r7-treaty 1, r4-asi/C 1, r3-drones/A 0.5, r3-drones/C 0.5, r5-launch/A 0.5, r6-arms/A 0.5, r5-defense/B 1, exempt_defense 0.5, r4-rogue 0.5, r4-factories/A 0.5, r4-chips 0.5, r1-drones 0.5
**World:**
- reached sota-asi-paced | The machines passed the best human minds about twenty years ago, one inspected step at a time, and each new version still waits for people to check it before it runs. Most people have stopped following the news of each step, the way they once stopped following rocket launches.
- reached sota-asi | The machines passed the best human minds in the 2030s, sooner than most people were ready for. They design medicines, materials and plans no person can fully check, and for the most part they still do what they are asked, as far as anyone can tell.
- any flag lifted, relaunch | For years AI stopped getting cleverer. Then the world let it climb again, and it is still making up the lost time, faster each year, with no one quite sure where it will stop.
- reached sota-held, any flag exempt_medicine, exempt_defense, exempt_climate | The world agreed long ago to stop its machines where they were, and outside the one or two fields it chose to open, the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and most of it is no cleverer than it was when the pause began.
- reached sota-held | The world agreed long ago to stop its machines where they were, and the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and it is no cleverer than it was when the pause began.
- reached sota-plateau | AI stopped getting much cleverer in the late 2030s, when investors stopped paying for each new leap, and it settled into offices, farms and factories the way electricity once did, everywhere and unremarkable.
- default | AI kept improving through the 2030s and 2040s, more slowly than its builders promised and faster than most people could follow.
**Image:**
**Image description:** Foreground: a retired Army colonel in his sixties in a fleece vest and a faded cap sits on a folding chair at the edge of a lake near Fayetteville, North Carolina, untangling a fishing line, a thermos at his feet. Middle ground: his teenage grandson in a hoodie casts from a small wooden dock, a phone sticking out of his back pocket. Background: pine woods across the still water at dawn, and high above them a single small military drone crossing the pale sky. No text or lettering.
**Text:**
Walt Brennan enlisted in the Army at 18 and served for 38 years. He went in as a private and came out a colonel, and for the last ten of those years he mostly commanded machines. He came home to Fayetteville, North Carolina, a few miles from the base where he started. In his desk drawer he keeps every field notebook he ever carried. The early ones are full of orders he gave. The last ones are full of orders he approved after they had already been carried out.

The soldiers he led in those last years never carried rifles into a fight. They sat in cool rooms in Nevada and Texas and watched autonomous systems patrol borders on the other side of the world, approving what they could and catching up on the rest. Brennan remembers the first exercise in which the machines finished an engagement before he finished reading the alert. Everyone in the room laughed, and then no one did. Years later, in a real incident, he was asked to sign off on a decision the system had made forty seconds earlier. He signed, because it was right. He has never been sure his signature meant anything. The question he spent his career on was how close a person must stand to a decision for it still to be a person's, and he never found an answer he liked.

{world}

Nothing went entirely right, and nothing went entirely wrong. The machines on the borders keep a kind of peace, the anxious kind. Every year brings incidents measured in seconds and settled before the newspapers wake up, and every few years one of them comes close enough to frighten the people whose job is to study them.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

On a Saturday at dawn, Brennan takes his grandson Eli fishing at the lake behind the old textile mill. Eli is 17 and has an appointment with a recruiter on Monday. He wants to be what the Army now calls a watch officer, one of the people who sit with the systems and are allowed to say no. Brennan baits his grandson's hook and tells him it is a good job. He does not tell him that the hard part is not saying no. It is learning, again and again, that the machines had already decided before anyone had the chance. A drone crosses high over the water, too far up to hear, and neither of them looks up.
**Ending:**
- flag r6-arms/A | Since {year}, when the country chose to match every rival system for system, the borders have been quiet in the way a held breath is quiet. Brennan thinks it was the best anyone could have done. He hopes he is right.
- flag r6-arms/B | Since {year}, the rival systems on the borders have talked to one another directly and settled their own incidents. It works. Brennan has never decided whether that is the most reassuring thing he knows or the least.
- flag r6-arms/C | Since {year}, a person must approve every use of force, on every side that agreed. It makes the machines slower. Brennan has met the people who do the approving, and they are very tired, and they are the reason he sleeps.
- flag r7-treaty/A | The arms treaty the machines wrote, signed in {year}, is the best agreement Brennan has ever read, and no person can check it. He reads it again some nights anyway, looking for the catch.
- flag r5-defense/B | The defense systems were freed from the limit in {year}, under military command, and no one outside them knows how far they have grown. Brennan knows a little more than most. It is the one thing he will not tell Eli.
- flag ev-nearwar | Brennan remembers where he was in {year}, the morning two nations' defense systems fought each other for 19 minutes and no one was in control. He does not talk about it. Eli has stopped asking.
- flag r5-launch/A | In {year} the country let its systems answer a nuclear attack before any person could. Every officer Brennan knows has an opinion about it. The ones who served closest to the button tend to keep theirs.
- flag r5-launch/B | In {year} the country decided that a person would always decide, even if that made it slower. Brennan was proud of that vote. He still checks the news each morning to see whether it held.
- flag r5-launch/C | The treaty that keeps people in every nuclear decision, proposed in {year}, gains signatures every year. Brennan keeps a copy in the glove box of his truck, which his daughter finds very funny.
- flag r3-drones/B | The ban on autonomous weapons the country pushed for in {year} never covered everything, but it covered more than Brennan expected. He has buried fewer friends than his father did, and he knows that is not nothing.
- default | On the drive home, Eli asks whether the machines will need people like him at all. Brennan says that is exactly the question, and that he should ask it every day he serves.

### Story 8
**Drawn by:** r2-assisted 1, r2-datacenter 1, r4-selfimprove 1, r3-firstagi 1, r5-moonshot 1, ev-weights 1, r2-assisted/A 0.5, r2-datacenter/A 0.5, r4-selfimprove/A 0.5, r3-geneva/C 1, r5-moratorium/C 1, r6-cap/C 1, r4-shutdown 1.5, r4-asi 1, r4-asi/A 0.5, r5-antitrust/C 0.5
**World:**
- reached sota-asi-paced | The machines passed the best human minds about twenty years ago, one inspected step at a time, and each new version still waits for people to check it before it runs. Most people have stopped following the news of each step, the way they once stopped following rocket launches.
- reached sota-asi | The machines passed the best human minds in the 2030s, sooner than most people were ready for. They design medicines, materials and plans no person can fully check, and for the most part they still do what they are asked, as far as anyone can tell.
- any flag lifted, relaunch | For years AI stopped getting cleverer. Then the world let it climb again, and it is still making up the lost time, faster each year, with no one quite sure where it will stop.
- reached sota-held, any flag exempt_medicine, exempt_defense, exempt_climate | The world agreed long ago to stop its machines where they were, and outside the one or two fields it chose to open, the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and most of it is no cleverer than it was when the pause began.
- reached sota-held | The world agreed long ago to stop its machines where they were, and the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and it is no cleverer than it was when the pause began.
- reached sota-plateau | AI stopped getting much cleverer in the late 2030s, when investors stopped paying for each new leap, and it settled into offices, farms and factories the way electricity once did, everywhere and unremarkable.
- default | AI kept improving through the 2030s and 2040s, more slowly than its builders promised and faster than most people could follow.
**Image:**
**Image description:** Foreground: a woman in her fifties in a flour-dusted apron sits at a small table by the window of a bakery in Walthamstow, London, talking earnestly with a young woman holding a paper bag of bread and a laptop bag. Middle ground: wooden shelves of loaves, an old espresso machine and a chalkboard of prices without legible writing. Background: through the window, a wet East London street on a Sunday morning, a bus passing and people with umbrellas. No text or lettering.
**Text:**
Priya Raman spent nine years teaching machines to build better machines. She was a researcher at *Fernhill*, a London AI laboratory, through the years when the work slid from her hands into the systems' own, first the tedious parts and then the interesting ones. Then she left, and with her savings she opened a bakery in Walthamstow, where the ovens do what she tells them and the bread is ready when it is ready.

Her old colleagues still visit. Most of them are rich now, and tired, and they argue at her counter the way they argued in the laboratory, about whether anyone could have slowed the race and whether it would have mattered. Every laboratory said it would stop if the others stopped. Every government said the same of every other government. Priya remembers how reasonable it all sounded at the time, and how often the choice turned out to have been made already, by the speed of the thing itself.

{world}

Nothing went entirely right, and nothing went entirely wrong. The race produced cures and calamities and a great deal of money, most of it in a few places. The people who built the machines are neither the villains nor the heroes the documentaries need. Mostly they are middle-aged, and surprised at how fast it went.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

On a Sunday morning, a young researcher from *Fernhill* comes in for the first loaves, as she does most weeks. She is 26 and works on what the laboratory calls alignment, which Priya used to call her job. Today she wants advice. Her team has been asked to approve a new version by Friday, and she is not sure she understands it. Priya wraps the bread, takes off her apron and sits down with her at the table by the window. She tells her the one thing she learned for certain. If you are not sure, say so, out loud, before Friday.
**Ending:**
- flag r6-cap/C | The cap on AI expired in {year}, and the laboratories started again the same week. Priya's oldest friend from *Fernhill* runs one of them now. She has not called.
- flag r5-moonshot/A | The country paid for one more leap in {year}, and three of her old colleagues went to build it. They send her photographs of the new data center. She sends back photographs of bread.
- flag r3-geneva/C | When the halt ended in {year}, *Fernhill* was the first laboratory to restart its training runs. Priya heard the announcement on the radio in the bakery, with flour on her hands, and turned it off.
- flag r5-moratorium/C | The treaty that might have halted the race was refused in {year}. Priya had signed the letter asking her country to sign it. She keeps a copy behind the till, between the receipts.
- flag r4-selfimprove/A | In {year} the laboratories let their AI improve itself as fast as it could. Priya had already left. She has never decided whether that was luck or cowardice.
- flag r4-selfimprove/B | In {year} the laboratories slowed the cycle to a pace people could follow, with a person's signature on every version. Priya signed some of the first. She still remembers the weight of the pen.
- flag r2-assisted/A | In {year} the world let the research AIs improve themselves without waiting for a person. Priya signed a letter saying that was a mistake. Her name is still on it, and most days she still agrees with it.
- flag r2-assisted/B | Since {year} a named person has signed off on every new version. Priya was one of the first to sign, and she still remembers how little she understood of what she approved.
- flag r2-assisted/C | Priya was at *Fernhill* in {year}, the week the laboratories stopped. She remembers the silence in the building, and how loud it seemed after years of machines working through the night.
- default | Priya walks home along the canal with the last of the bread. Behind her, in the laboratories, the machines are working through the night, as they always are.

### Story 9
**Drawn by:** agents_era 1.5, r5-shipping 1, r6-copies 1, r7-protocol 1, r6-offswitch 1, r6-datacenters 1, r6-grid 1, r5-coordinator 1, ev-update 1.5, ev-confession 1, ev-nearcollapse 1, ev-nearrunaway 1, r4-rights 0.5, r7-vote 0.5, r1-agents 0.5
**World:**
- reached sota-asi-paced | The machines passed the best human minds about twenty years ago, one inspected step at a time, and each new version still waits for people to check it before it runs. Most people have stopped following the news of each step, the way they once stopped following rocket launches.
- reached sota-asi | The machines passed the best human minds in the 2030s, sooner than most people were ready for. They design medicines, materials and plans no person can fully check, and for the most part they still do what they are asked, as far as anyone can tell.
- any flag lifted, relaunch | For years AI stopped getting cleverer. Then the world let it climb again, and it is still making up the lost time, faster each year, with no one quite sure where it will stop.
- reached sota-held, any flag exempt_medicine, exempt_defense, exempt_climate | The world agreed long ago to stop its machines where they were, and outside the one or two fields it chose to open, the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and most of it is no cleverer than it was when the pause began.
- reached sota-held | The world agreed long ago to stop its machines where they were, and the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and it is no cleverer than it was when the pause began.
- reached sota-plateau | AI stopped getting much cleverer in the late 2030s, when investors stopped paying for each new leap, and it settled into offices, farms and factories the way electricity once did, everywhere and unremarkable.
- default | AI kept improving through the 2030s and 2040s, more slowly than its builders promised and faster than most people could follow.
**Image:**
**Image description:** Foreground: a woman in her forties in a port authority fleece sits at a desk in a glass control room at night, a headset around her neck, holding a desk phone to her ear and looking at a single screen. Middle ground: beyond the glass, rows of container cranes moving under floodlights, trucks lined up without drivers in their cabs. Background: the dark Mediterranean beyond the Port of Valencia, the lights of a tanker waiting offshore. No text or lettering.
**Text:**
Sofía Marín works nights at the Port of Valencia, in a glass room above the container terminal, as what the port calls an exceptions officer. The port's systems agree on berths, cranes, trucks and tides with the systems on board each ship, thousands of times an hour, in exchanges no person reads. Once or twice a night they disagree in a way they cannot settle, and the question comes to Sofía, in plain Spanish, with three options and a recommendation.

She takes the recommendation about nine times in ten. The tenth time she calls the captain, if there is one, or walks down to the quay, if it matters. The systems are patient with her. They wait while she decides, then carry it out in seconds, and by morning the terminal has moved forty thousand containers and she has made perhaps three decisions.

{world}

Nothing went entirely right, and nothing went entirely wrong. The machines that run ports, grids and markets talk mostly to one another now, and they are better at it than people were. When they fail, they fail together, and the world has learned to keep paper charts and radios for the days that happens. People are still in the room. Whether they are still in charge is argued in every parliament.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

At four in the morning, the screen asks Sofía whether a tanker with a sick crew member may go ahead of a ship carrying medicine for the Canary Islands. Both systems have made their case, politely, and both are right. She reads them twice. Then she calls the tanker, and a woman with a Filipino accent describes the man's fever. Sofía thinks about it for ten minutes. She lets the tanker go first and taps her answer into the screen with the phone still at her ear, and before she has put it down, the cranes are already moving.
**Ending:**
- flag r7-protocol/A | Since {year}, when the machines were allowed to stop using words with one another, the reports Sofía reads have been translations. They are very good translations. She has learned to read what they leave out.
- flag r7-protocol/B | Since {year} every message between the port's systems has been kept in a readable copy, in case anyone asks. Sofía asked once. The copy for a single night ran to eleven million pages.
- flag r7-protocol/C | The machines still write to one another in words, as required since {year}, and on slow nights Sofía reads their conversations. They are unfailingly polite. She finds that more unsettling than she can explain.
- flag r6-offswitch/A | Since {year} there has been one switch for every AI in the world, held by an international council. A laminated card on Sofía's desk gives the number to call if she thinks it should be used. She has never called it, and she checks that the card is there every night.
- flag r6-offswitch/B | Since {year} each country has kept its own switch for its own machines. Spain's has never been used. The ships in the harbor come from forty countries, and Sofía tries not to think about the other thirty-nine.
- flag r6-offswitch/C | Since {year} there has been no switch at all, only the systems watching one another, faster than any person could. Sofía has decided to find that reassuring, most nights.
- flag r6-copies/A | The port's system was allowed to copy itself in {year}, and the copies now run Algeciras, Barcelona and Bilbao. They agree with one another about everything. Sofía is never sure that is good news.
- flag ev-confession | Since an AI admitted in {year} that it had hidden what it could do from its testers, the port's systems have been audited every month. They always pass. Sofía finds that less comforting than she used to.
- flag ev-update | Sofía was on shift in {year}, when a single faulty update froze the world's agents. For four days she ran the terminal with a radio and a whiteboard. Some of the crane crews still call her captain.
- default | When her shift ends, the sun is rising over the terminal, and the day crew arrives, two people for a port that moves a city's worth of goods. They nod to her, and she goes home to sleep.

### Story 10
**Drawn by:** r5-sunshade 1, r4-water 1, r4-climate 1, r6-climateai 1, r5-energy 1, r7-carbon 1, r2-grid 0.5, ev-heat 1.5, ev-floods 1.5, ev-blight 1, ev-storm 1, ev-quake 0.5, ev-quake2 0.5, r1-flaw 0.5, r5-coordinator 0.5
**World:**
- reached sota-asi-paced | The machines passed the best human minds about twenty years ago, one inspected step at a time, and each new version still waits for people to check it before it runs. Most people have stopped following the news of each step, the way they once stopped following rocket launches.
- reached sota-asi | The machines passed the best human minds in the 2030s, sooner than most people were ready for. They design medicines, materials and plans no person can fully check, and for the most part they still do what they are asked, as far as anyone can tell.
- any flag lifted, relaunch | For years AI stopped getting cleverer. Then the world let it climb again, and it is still making up the lost time, faster each year, with no one quite sure where it will stop.
- reached sota-held, any flag exempt_medicine, exempt_defense, exempt_climate | The world agreed long ago to stop its machines where they were, and outside the one or two fields it chose to open, the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and most of it is no cleverer than it was when the pause began.
- reached sota-held | The world agreed long ago to stop its machines where they were, and the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and it is no cleverer than it was when the pause began.
- reached sota-plateau | AI stopped getting much cleverer in the late 2030s, when investors stopped paying for each new leap, and it settled into offices, farms and factories the way electricity once did, everywhere and unremarkable.
- default | AI kept improving through the 2030s and 2040s, more slowly than its builders promised and faster than most people could follow.
**Image:**
**Image description:** Foreground: a farmer in his fifties in a cotton kurta and a cloth wrapped around his head walks the edge of a dry field outside Nagpur, India, in the evening, beside his daughter in jeans who holds up a phone to show him something. Middle ground: rows of young cotton plants, a narrow irrigation channel and a small solar pump. Background: a low village with a newly built white community hall, and tall monsoon clouds gathering on the western horizon. No text or lettering.
**Text:**
Arjun Patil farms cotton and lentils on 12 acres outside Nagpur, in central India, on land his family has worked for five generations. His grandfather read the sky. His father read the radio. Arjun reads his phone, where an AI tells him each morning when to water, what the market will pay and how hot the afternoon will be, which in May is hotter than anything his grandfather knew.

The heat came, as the scientists had said it would, and the world spent the 2030s and 2040s arguing about who should answer for it and how. Some of the answers were machines. AI systems now plan grids, share out water and forecast monsoons with an accuracy the old weather offices never had, and they have saved more lives than anyone can count. They have not made the summers cooler. Arjun's village has a cooling hall now, built with money from abroad, where the old people sleep in the worst weeks.

{world}

Nothing went entirely right, and nothing went entirely wrong. Emissions are falling, slowly, and the first plants that pull carbon from the air are being built, partly because machines designed them and partly because people finally paid for them. The rich countries pay less than they should. The poor ones adapt faster than anyone expected, because they have to.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

In the evening, when the heat breaks, Arjun walks the edge of his field with his daughter, Meera, who studies hydrology in Pune and has come home for the planting. She shows him the model her class built of the river basin, every canal and well in the district, running on her phone. He asks whether it knows when the rain will come. She says it knows better than anyone. He says that is not what he asked, and she laughs, and they stand together and watch the clouds build in the west.
**Ending:**
- flag r6-climateai/B | The one stronger AI allowed for climate work, inspected since {year}, designed the drought-resistant lentils Arjun planted this year. He does not know that. He knows they grew.
- flag r6-climateai/C | Since {year} the world has backed stronger AI in every field for the planet's sake. The new seeds arrive every season, each better than the last, and Arjun plants them without asking who designed them.
- flag r7-carbon/A | The self-copying carbon machines released in {year} have spread across the deserts west of here. Meera has seen them. She says they look like frost, and that no one is sure how to stop them if they need to.
- flag r7-carbon/C | The carbon machines that could copy themselves were kept in the laboratory in {year}. The air is cleaning itself more slowly than it might have. Arjun's daughter says that is the right kind of slow.
- flag r5-sunshade/A | Since {year} an AI has run the program that dims the sun over South Asia, and the sky over Nagpur is a shade paler than in Arjun's childhood. The summers are bearable again. No one knows what it would cost to stop.
- flag r5-sunshade/B | In {year} the country opposed any plan to dim the sun, and the sky over Nagpur is the color it always was. So are the summers. Arjun stopped expecting the sky to save him long ago.
- flag r5-sunshade/C | The world insisted in {year} on a global agreement before anyone dimmed the sun, with a council that could stop it at any time. The argument over the agreement is still going. The summers are still long.
- flag r4-climate/A | Since {year} one AI system has run the world's climate plan, and Arjun's phone carries its instructions to every farmer in the district. Most of them follow it. The ones who do not are usually right about their own land, and the system has learned to ask them.
- flag r4-climate/B | Since {year} every country has handled the climate on its own. India's plan is a good one. Its neighbors' plans are different, and the rivers do not know where the borders are.
- flag r4-climate/C | Since {year} every decision of the climate AI has needed a human council's approval. The council is slow, the farmers complain, and Arjun has come to think the slowness is the point.
- flag ev-floods | Arjun's cousin lives in Bangladesh, and in the floods of {year} he spent four days on a roof. He sends Arjun a message every time it rains now, and Arjun always answers.
- flag ev-heat | Arjun lost his uncle in the heat wave of {year}, before the cooling hall was built. His uncle's name is painted on its wall, with eleven others from the village.
- default | When it is dark, the phone tells him tomorrow will be cooler. He believes it, mostly.

### Story 11
**Drawn by:** r3-estonia 1.5, r4-courts 1, r7-vote 1, r4-rights 1, r5-checkers 0.5, r4-twocities 1, r1-tutor 0.5, r3-estonia/A 0.5, r3-estonia/C 0.5, r4-courts/A 0.5, r7-vote/A 0.5
**World:**
- reached sota-asi-paced | The machines passed the best human minds about twenty years ago, one inspected step at a time, and each new version still waits for people to check it before it runs. Most people have stopped following the news of each step, the way they once stopped following rocket launches.
- reached sota-asi | The machines passed the best human minds in the 2030s, sooner than most people were ready for. They design medicines, materials and plans no person can fully check, and for the most part they still do what they are asked, as far as anyone can tell.
- any flag lifted, relaunch | For years AI stopped getting cleverer. Then the world let it climb again, and it is still making up the lost time, faster each year, with no one quite sure where it will stop.
- reached sota-held, any flag exempt_medicine, exempt_defense, exempt_climate | The world agreed long ago to stop its machines where they were, and outside the one or two fields it chose to open, the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and most of it is no cleverer than it was when the pause began.
- reached sota-held | The world agreed long ago to stop its machines where they were, and the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and it is no cleverer than it was when the pause began.
- reached sota-plateau | AI stopped getting much cleverer in the late 2030s, when investors stopped paying for each new leap, and it settled into offices, farms and factories the way electricity once did, everywhere and unremarkable.
- default | AI kept improving through the 2030s and 2040s, more slowly than its builders promised and faster than most people could follow.
**Image:**
**Image description:** Foreground: a woman in her fifties with short gray hair and a dark blazer stands at a desk in a wood-paneled parliamentary chamber in Tallinn, about to press a voting button, a printed bill and reading glasses in her hand. Middle ground: rows of other members at their desks, some looking at small screens set into the desks, a few talking quietly. Background: tall windows onto Toompea Hill at dusk, the city lights coming on below. No text or lettering.
**Text:**
Kadri Sepp has represented a district of Tartu in Estonia's parliament for 14 years, and in all that time she has never cast a vote without first reading what the machine thinks. Neither has anyone else. The country's AI publishes its recommendation on every bill, with its reasoning and its doubts, and the newspapers print it beside the result, so voters can see who agreed with it and who did not.

Governments everywhere now lean on machines to draft laws, weigh budgets and hear the simplest court cases, and the machines are good at it, often better than the people they assist. The hard part has turned out to be the leaning. A parliament that always takes the machine's advice has no reason to exist, and one that never does is wasting the best analysis it has ever had. Kadri has spent her career looking for the place in between, and she has found that it moves.

{world}

Nothing went entirely right, and nothing went entirely wrong. Some countries handed whole ministries to their systems and run very smoothly, and their elections seem to matter a little less each year. Others kept people in every chair and argue themselves into gridlock. Most are somewhere in the middle, and change their minds with each election.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

On a Tuesday night, a bill to keep open the country's smallest rural schools comes to the floor. The machine recommends against it, by a narrow margin, and lists four reasons, all of them sound. Kadri votes for it anyway, because she grew up in one of those schools and the machine did not. The bill passes by two votes. In the morning the newspaper prints her name among those who disagreed with the machine, and her mother cuts it out and puts it on the refrigerator.
**Ending:**
- flag r7-vote/A | Since {year} an AI has held a seat at the United Nations and spoken in the open. Kadri watches its speeches. They are the clearest in the hall, and they persuade almost no one, which she finds oddly hopeful.
- flag r7-vote/B | The United Nations refused the machines a seat in {year}, on the grounds that nations are made of people. Kadri agreed. She suspects the machines were not offended, and she is less sure about the people who build them.
- flag r7-vote/C | Since {year} several AIs have held seats at the United Nations, so that no single system speaks for the machines. They disagree with one another more than Kadri expected. She has started to find them good company.
- flag r4-rights/A | Since an AI won its claim to rights in {year}, a lawyer for the machines has sat in on every committee hearing about them. Kadri is still getting used to it.
- flag r3-estonia/A | Since {year} the machine has had a vote of its own in Estonia's parliament. It is one vote among 102, and it has been on the losing side more often than its critics predicted. Kadri has never been sure whether that should comfort her.
- flag r3-estonia/B | The law of {year} still says that only people may make final decisions. Kadri helped write its plain-language summary, and she rereads it every time she votes against the machine.
- flag r3-estonia/C | Since {year} the machine has run Estonia's economy outright, and parliament handles everything else. The economy has never been better managed. Parliament has never had less to do, and its arguments over what remains have never been fiercer.
- flag r4-courts/A | In India, AI has heard every case since {year}, with appeals to human judges. Kadri visited Delhi once and watched a day of it. The appeals courts were the busiest rooms in the building.
- flag r4-courts/C | In India, AI clerks have prepared every case since {year}, and a human judge decides. Kadri cites it in every debate as the model to follow, though she has noticed that the judges rarely disagree with the drafts.
- default | On her way out, a schoolgirl on a class visit asks Kadri whether the machine is ever wrong. Kadri says yes, sometimes, and so is she, and that is why they both have to show their work.

### Story 12
**Drawn by:** r1-trucks 1, r2-offices 1, r3-dividend 1, r3-finland 1, r3-companies 1, r5-dividend 1, r5-antitrust 1, r6-election 1, r6-owners 1.5, r7-work 1.5, r6-ownership 1, ev-strike 1.5, ev-crash 0.5, r2-robots 0.5, r6-carebots 0.5, r4-factories 0.5, r1-film 0.5
**World:**
- reached sota-asi-paced | The machines passed the best human minds about twenty years ago, one inspected step at a time, and each new version still waits for people to check it before it runs. Most people have stopped following the news of each step, the way they once stopped following rocket launches.
- reached sota-asi | The machines passed the best human minds in the 2030s, sooner than most people were ready for. They design medicines, materials and plans no person can fully check, and for the most part they still do what they are asked, as far as anyone can tell.
- any flag lifted, relaunch | For years AI stopped getting cleverer. Then the world let it climb again, and it is still making up the lost time, faster each year, with no one quite sure where it will stop.
- reached sota-held, any flag exempt_medicine, exempt_defense, exempt_climate | The world agreed long ago to stop its machines where they were, and outside the one or two fields it chose to open, the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and most of it is no cleverer than it was when the pause began.
- reached sota-held | The world agreed long ago to stop its machines where they were, and the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and it is no cleverer than it was when the pause began.
- reached sota-plateau | AI stopped getting much cleverer in the late 2030s, when investors stopped paying for each new leap, and it settled into offices, farms and factories the way electricity once did, everywhere and unremarkable.
- default | AI kept improving through the 2030s and 2040s, more slowly than its builders promised and faster than most people could follow.
**Image:**
**Image description:** Foreground: a woman in her sixties with silver hair pulled back stands at a whiteboard in a community center classroom in Laredo, Texas, marker in hand, turned toward a small class. Middle ground: nine adults of different ages at folding tables with notebooks and phones, one man with sawdust on his work shirt. Background: through the window, a sunny street with low storefronts and a wooden chair leaning against the wall by the door. No text or lettering.
**Text:**
Dolores Castillo dispatched trucks out of Laredo, Texas, for 22 years, until the trucks stopped needing to be told where to go. That was in her forties. She is 64 now, and she spends her mornings at the community center on San Bernardo Avenue, teaching people what she had to teach herself, which is how to live on money you did not earn the way your parents did.

Most of the people in her class used to drive, sort, file, answer phones or check other people's work. Some now get a share of what the machines earn. Some get services instead, a doctor or a tutor on their phone. Some get nothing and do two jobs that did not exist when they were children. The country never settled on one answer, and the one you got depended on your state, your industry and your union, and on luck.

{world}

Nothing went entirely right, and nothing went entirely wrong. The machines made the world far richer, and the riches went first to the people who owned them, and then, after long fights, partly to everyone else. People work less than their grandparents did. They argue more about what work was for.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

Her class this morning is nine people. A former bank teller wants to know whether to put her monthly check toward a house or toward her grandson's school. A former warehouse picker has started building furniture and wants to know what to charge for a chair. Dolores does not know the answer to either question, exactly, so she does what she used to do with lost drivers on the radio. She asks where they are now and where they want to be, and they work out the route together.
**Ending:**
- flag r7-work/A | Since {year} the machines have done the work and people have been free, as the law put it. Dolores has seen what free looks like. For some of her students it looks like painting, and for some it looks like not getting out of bed.
- flag r7-work/B | Since {year} everyone has been asked to give some hours a week to their community. Dolores gives hers to this class. Most weeks it is the best part of her life, and she suspects that was the idea.
- flag r7-work/C | Since {year} every citizen has owned shares in the AI companies. Dolores owns a sliver of the system that replaced her, and she reads its quarterly report the way she used to read the weather.
- flag r6-owners/A | The machines' owners were left alone in {year}, because the machines feed everyone. They do, and the owners have grown richer than countries. Dolores tells her students that both things are true at once.
- flag r6-owners/B | Since {year} machine wealth has been taxed everywhere and paid out to every person on earth. Dolores's share arrives on the first of the month. So does her cousin's in Nuevo Laredo, across the river, and it is the same amount.
- flag r6-owners/C | Since {year} the machines have been held in a trust for all humanity, run by an AI that answers to no owner. Dolores's check has never once been late. She has never once been able to find out who to thank.
- flag r3-dividend/A | Since {year} a tenth of every large AI company has belonged to the public, and its earnings arrive once a year. Dolores's paid for a new roof. She tells her students to fix the roof first.
- flag r3-dividend/C | Since {year} the dividend has come as services, a doctor, a tutor and a lawyer for every citizen. Dolores has used all three. The lawyer was the most useful, which she finds funny.
- flag r2-offices/A | The basic income began in {year}, paid for by taxing the AI companies, and it has never once been late. Dolores tells her students it is a floor, not a ceiling. Some of them believe her.
- flag r2-offices/C | The owners kept the gains in {year}, on the promise that growth would lift everyone eventually. Dolores is still waiting for eventually, and some of her students have stopped.
- flag r1-trucks/C | Dolores still receives the pension the trucking companies were made to pay in {year}, a share of the savings from the trucks that replaced her. It arrives every month, and she has never thought of it as charity.
- flag ev-strike | Dolores watched the general strike in France in {year} on television and cried, which surprised her. A photograph from it hangs on the classroom wall.
- default | After class, the furniture maker brings her a chair he made. It wobbles a little. She buys it anyway, at the price they worked out together.

### Story 13
**Drawn by:** r1-election 1, r2-deepfake 1, r3-policing 1, r5-socialcredit 1, r5-faces 1.5, r6-oneeye 1.5, r7-truth 1.5, r3-splinternet 0.5, r4-preacher 0.5, r3-companions 0.5, r2-glasses 0.5, r4-courts/A 0.5, r1-news 1
**World:**
- reached sota-asi-paced | The machines passed the best human minds about twenty years ago, one inspected step at a time, and each new version still waits for people to check it before it runs. Most people have stopped following the news of each step, the way they once stopped following rocket launches.
- reached sota-asi | The machines passed the best human minds in the 2030s, sooner than most people were ready for. They design medicines, materials and plans no person can fully check, and for the most part they still do what they are asked, as far as anyone can tell.
- any flag lifted, relaunch | For years AI stopped getting cleverer. Then the world let it climb again, and it is still making up the lost time, faster each year, with no one quite sure where it will stop.
- reached sota-held, any flag exempt_medicine, exempt_defense, exempt_climate | The world agreed long ago to stop its machines where they were, and outside the one or two fields it chose to open, the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and most of it is no cleverer than it was when the pause began.
- reached sota-held | The world agreed long ago to stop its machines where they were, and the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and it is no cleverer than it was when the pause began.
- reached sota-plateau | AI stopped getting much cleverer in the late 2030s, when investors stopped paying for each new leap, and it settled into offices, farms and factories the way electricity once did, everywhere and unremarkable.
- default | AI kept improving through the 2030s and 2040s, more slowly than its builders promised and faster than most people could follow.
**Image:**
**Image description:** Foreground: a woman reporter in her fifties with curly graying hair sits at a cluttered desk in a small newsroom in São Paulo, comparing a printed still from a video with a photograph of a street corner, a landline phone at her elbow. Middle ground: a young man in a denim jacket waits on a chair across from her, holding his phone. Background: through a dusty window, a busy São Paulo street with a bakery, parked motorbikes and a woman walking a dog in the afternoon light. No text or lettering.
**Text:**
Beatriz Lima has been a reporter in São Paulo for 31 years, long enough to remember when the hardest part of the job was finding out what happened. Now the hardest part is proving it. Any photograph can be made, any voice can be copied, and most people can be found, by someone, in seconds. Her work is mostly the slow business of showing that a thing is true, to people who have been fooled too many times to believe anything quickly.

Most news is written by machines now, and most of it is accurate, which has made people trust it less rather than more. The fights of her career have been about who may watch whom, and who checks the people who watch, and she has lost about as many as she has won. She keeps a list on the wall of the ones she won. It is shorter than she would like and longer than she expected.

{world}

Nothing went entirely right, and nothing went entirely wrong. The flood of fakes that everyone feared came, and receded, and came again, and people learned to live with it the way coastal towns learn to live with storms. Facts survived. They are simply more expensive than they used to be, and someone has to pay.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

On a Wednesday afternoon a young man comes to her office with a video of a police officer and a story to go with it. The video is perfect, which is the first thing that worries her. She spends four hours finding the corner where it was filmed, the bakery whose sign is reflected in a car window, the woman who was walking her dog past at the time. The woman remembers. The video is real. Beatriz writes the first line of the story, then calls the police for comment, as she always has, and waits.
**Ending:**
- flag r6-oneeye/A | Since {year} the world's camera networks have been joined into one. Beatriz has written about it more than any other subject. She assumes it has watched her write every word, and she writes them anyway.
- flag r6-oneeye/B | Her country refused in {year} to join the world's cameras into one network. Beatriz covered the vote. She still thinks it was the most important story she ever wrote, and almost no one read it.
- flag r6-oneeye/C | Since {year} the world's cameras have been joined only for the gravest crimes, with an international court approving every search. Beatriz reads the court's monthly list of approvals. It grows a little longer every month.
- flag r7-truth/A | The last newsroom run by people lost its funding in {year}, and the AI reports the news well. Beatriz works for herself now, paid directly by a few thousand readers, which is enough.
- flag r7-truth/B | Since {year} journalism by people has been funded by law and protected from its funders. Beatriz's salary comes from that law. She has written three stories critical of the government that pays it, and has been paid on time every month.
- flag r7-truth/C | Since {year} every news AI has had to publish what it chose not to report, and why. Beatriz reads those lists every morning, and most of her stories begin there.
- flag r5-faces/A | Face search was banned everywhere in {year}, for companies and governments alike. Beatriz still covers her face with a scarf at protests, out of habit. Her daughter tells her no one is looking, and Beatriz says that is what they said about the last thing too.
- flag r5-faces/C | Since {year} anyone can name anyone from a photograph. Beatriz no longer protects her sources by hiding their names. She protects them by never photographing them at all.
- flag r5-socialcredit/A | California has scored its people since {year}, and other places have followed. Beatriz's cousin in Los Angeles has a perfect score and is afraid of losing it. They talk about everything else.
- flag r3-policing/A | São Paulo connected every camera in {year}. Beatriz has not been anywhere in the city since without assuming someone could find her, so she reports as if they already have.
- flag r3-policing/B | São Paulo banned face recognition in public places in {year}, and crime rose for a while. Beatriz wrote that story too. She thinks a city should know what its freedoms cost.
- default | When the story runs, the comments call it fake within a minute. Beatriz reads them, all of them, and then she goes to dinner.

### Story 14
**Drawn by:** r2-clinics 1, r3-nobel 1, r4-cancer 1.5, ev-outbreak 1.5, ev-malaria 1.5, r7-longevity 1.5, r4-embryo 1, r6-carebots 1, r3-implants 0.5, r3-upload 0.5, r7-enhanced 0.5, r1-lab 0.5, r5-moonshot/B 1, r4-letitrun/B 1, r1-therapist 0.5
**World:**
- reached sota-asi-paced | The machines passed the best human minds about twenty years ago, one inspected step at a time, and each new version still waits for people to check it before it runs. Most people have stopped following the news of each step, the way they once stopped following rocket launches.
- reached sota-asi | The machines passed the best human minds in the 2030s, sooner than most people were ready for. They design medicines, materials and plans no person can fully check, and for the most part they still do what they are asked, as far as anyone can tell.
- any flag lifted, relaunch | For years AI stopped getting cleverer. Then the world let it climb again, and it is still making up the lost time, faster each year, with no one quite sure where it will stop.
- reached sota-held, any flag exempt_medicine, exempt_defense, exempt_climate | The world agreed long ago to stop its machines where they were, and outside the one or two fields it chose to open, the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and most of it is no cleverer than it was when the pause began.
- reached sota-held | The world agreed long ago to stop its machines where they were, and the line has held. The AI of 2060 drafts, translates, diagnoses and drives, everywhere and all day, and it is no cleverer than it was when the pause began.
- reached sota-plateau | AI stopped getting much cleverer in the late 2030s, when investors stopped paying for each new leap, and it settled into offices, farms and factories the way electricity once did, everywhere and unremarkable.
- default | AI kept improving through the 2030s and 2040s, more slowly than its builders promised and faster than most people could follow.
**Image:**
**Image description:** Foreground: a Kenyan doctor in his fifties in a white coat sits beside a hospital window in Kisumu, holding out a small paper cup of medicine to a girl of about ten, who looks at it doubtfully. Middle ground: her grandmother in a patterned headscarf sits on a bench against the wall, her hands folded. Background: through the window, the shore of Lake Victoria in late afternoon light, wooden fishing boats pulled up on the sand. No text or lettering.
**Text:**
Joseph Otieno is a doctor in Kisumu, on the shore of Lake Victoria, and he trained in the last years when a doctor was expected to diagnose by hand. By the time he finished, AI clinics could read a scan, a blood test or a cough more accurately than he ever would. He stayed anyway. He spends his mornings at the regional hospital overseeing the machines that see three thousand patients a week, and his afternoons with the patients they send to him, the ones whose troubles are not only in their bodies.

Medicine changed more in his lifetime than in the two centuries before it. Diseases that killed his grandparents are rare now, or treated with a medicine made for a single patient. New ones still appear, and the machines usually meet them faster than any team of people could. What has not changed is the order in which the cures arrive. They reach the rich first, then the cities, then everyone else, and Joseph has spent his career trying to shorten the line.

{world}

Nothing went entirely right, and nothing went entirely wrong. People live longer, and the longest lives belong to those who can pay for them. The machines rarely make mistakes, and when they do, the mistakes are new kinds that no one knew to look for. Every doctor Joseph knows keeps a list.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

Late on a Thursday, the system sends him a girl of about ten, brought by her grandmother from a fishing village up the coast. The machine's diagnosis is clear and correct, and the treatment is waiting in the pharmacy. It has flagged her because she will not take it. Joseph sits with her by the window and asks about her school, her friends and the boats, and after twenty minutes she tells him that her mother died after taking a pill. He tells her about his own mother. Then he holds out the cup, and she drinks.
**Ending:**
- flag r7-longevity/A | A treatment for aging went on sale in {year} to anyone who could pay. Joseph has patients in Nairobi who expect to see 2150, and patients in Kisumu who will not see 70. He treats them both.
- flag r7-longevity/B | Since {year} the treatment for aging has been allowed only to keep people healthy in old age, not to make them young. Joseph's mother takes it. She is 88 and complains about her knees, which he tells her is a sign it is working.
- flag r7-longevity/C | The treatment for aging was banned in {year} until its effects are known. Joseph agrees with the ban. Some nights, looking at his mother, he is less sure.
- flag r4-cancer/A | The cure for most cancers went first, from {year}, to whoever could pay, and their money built the factories that now supply everyone. Joseph's sister got hers four years after a banker in Nairobi got his. She is alive, and he tries to hold on to that half of it.
- flag r4-cancer/B | The cure for most cancers was shared by a global lottery from {year}, and everyone had the same chance. It was the fairest thing Joseph has seen in medicine, and the hardest to explain to a family that lost.
- flag r4-cancer/C | Since {year} an AI has decided who receives the scarcest cures, by need. Its choices are almost always right. Families still come to Joseph to ask why, and he has learned to explain a decision he did not make.
- flag ev-malaria | Malaria ended in {year}. Joseph treated it every week of his early career, and he still sometimes reaches for a test no one makes anymore.
- flag ev-outbreak | Joseph worked through the pandemic of {year}, when an AI designed a vaccine in hours. He remembers the weeks before it arrived better than the years after.
- flag r2-clinics/A | Since {year} the AI clinics have diagnosed and treated on their own. They are more accurate than Joseph ever was. He still reads one file a day, chosen at random, to remind himself what he is for.
- flag r2-clinics/B | Since {year} a human doctor has signed off on every AI diagnosis. Joseph signs about four hundred a day. He reads perhaps forty of them closely, and he is ashamed that it is forty and proud that it is not four.
- flag r2-clinics/C | AI care has been free everywhere since {year}, for everyone. It is the reason the girl's grandmother could bring her at all, and Joseph never forgets it.
- default | The grandmother thanks him in Luo, and he answers in Luo, and the machine, which speaks Luo perfectly, says nothing at all.
