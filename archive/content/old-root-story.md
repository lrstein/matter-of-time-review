# A Matter of Time: Story Bible

This file holds **all the words in the game**: the intro, the history timeline, every Scenario, Event and Future, and the hidden Values. The game reads this file directly, so whatever you edit here is what players see the next time the page loads.

## How to edit

- **Change words freely.** Keep the **bold labels** (like `**Headline:**`) exactly as they are, because the game uses them to find things.
- **Every Scenario, Event and Future starts with `## id`** (for example `## r1-lab`). Ids are lowercase with dashes. If you rename an id, also rename it everywhere it appears in a `**Next:**` list.
- **Next lists** look like `- r2-clinics | lead-in sentence`. The id is the card that can come next. The sentence after `|` is the one-line bridge shown between the two cards.
- **Effects** look like `power +1, control -2`. Value names: power, control, handover, unity, reality, equality.
- **Timeline label** is the short version (two to five words) shown on the timeline strip and in the results.
- **To add a new card,** copy an existing one, give it a new id, and link to it from at least one `**Next:**` list.
- After editing, run `node tools/check-story.js`. It checks for broken links and missing fields, flags style problems, updates the counts below, and re-runs the balance simulation.

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
| Round 1 scenarios | 5 |
| Round 2 scenarios | 8 |
| Round 3 scenarios | 9 |
| Round 4 scenarios | 9 |
| Events | 5 |
| **Total scenarios + events** | **36** |
| Futures | 9 |
| Future stories | 33 |
| State of the Art cards | 7 |
| Distinct paths through the game | 23,802 |

---

# SETTINGS

**Long Middle threshold:** 3.0
**Event chance:** 0.35
**Best-fit pick chance:** 0.6
**Round colors:** #7fa6a3, #c2a466, #b9796e, #9a90bf
**Event color:** #8f897e

(The threshold sets how close a player must land to a Future before they get The Long Middle instead; raise it to make The Long Middle rarer. Round colors are the accent for rounds 1 to 4 in order. The event color is used for Out of your hands cards. The event chance is the probability that an Event card appears between rounds 2–3 and between rounds 3–4. The best-fit pick chance is how often rounds 3 and 4 pick the more decisive of the two linked cards instead of the other.)

---

# UI TEXT

**Disclaimer:** The following scenarios are entirely hypothetical. If any of these situations unfold in the real world, that is by mere coincidence.
**Begin button:** Begin
**Round prompt:** Choose the answer you believe gives us the best chance at the future you hope for.
**Result label:** As a result…
**Event label:** Out of your hands
**State of the art label:** State of the art
**Looking back label:** How we got here
**Before the Future:** Decades pass.
**Future dateline:** 2070

---

# INTRO

Each line below is shown on its own. A blank line between lines means a pause. `[MONTAGE]` is where the inventions flash past. `*our*` is italic.

**Lines:**
Around 70,000 years ago, something changed in the way we think.

Humans began seeing patterns no other animal could.

As a species collective, we set our mind towards innovation.

[MONTAGE]

Innovation, discovery, growth, / it's been *our* thing.

We were simply the best at it.

But not anymore…

If innovation is our goal, / we have just succeeded in accelerating progress like never before.

But if innovation is our purpose…

This game exists to demonstrate the risks and rewards associated with Artificial Intelligence, and emphasize just how lightly we must tread.

Our future is simply / A Matter of Time

**Montage:** Fire, The wheel, Spears, Writing, Iron, The printing press, The steam engine, Electricity, Flight, The computer, Cities, The internet

(A `/` inside a line means the two halves are shown together, as two lines.)

---

# HISTORY TIMELINE

Real events, oldest first. Format: `- Date | Title | One line | Source URL`

- Jun 2017 | The Transformer | Google researchers publish the design that nearly every modern AI system is built on. | https://arxiv.org/abs/1706.03762
- Feb 2019 | Too dangerous to release | OpenAI withholds the full GPT-2, fearing it could flood the internet with convincing fake text. | https://openai.com/index/better-language-models/
- Nov 2020 | AlphaFold | DeepMind's AI predicts the shapes of proteins, solving a 50-year-old problem in biology. | https://deepmind.google/discover/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/
- Nov 2022 | ChatGPT | A chatbot is released to the public and becomes one of the fastest-growing apps in history. | https://openai.com/index/chatgpt/
- Mar 2023 | GPT-4 | AI begins passing professional exams, including the bar. | https://openai.com/index/gpt-4-research/
- Sep 2024 | Machines that reason | OpenAI's o1 is trained to think through problems before it answers. | https://openai.com/index/learning-to-reason-with-llms/
- Oct 2024 | Nobel Prizes | The Nobel Prizes in chemistry and physics both honor work on AI. | https://www.nobelprize.org/prizes/chemistry/2024/summary/
- Jan 2025 | DeepSeek R1 | A Chinese lab matches the leading American models at a fraction of the cost, and the race goes global. | https://github.com/deepseek-ai/DeepSeek-R1
- Jul 2025 | Olympiad gold | Google DeepMind's Gemini Deep Think reaches gold-medal standard at the International Mathematical Olympiad. | https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/
- Dec 2025 | Slop | Merriam-Webster names "slop," the flood of low-quality AI content, its word of the year. | https://www.merriam-webster.com/wordplay/word-of-the-year
- Jan 2026 | First Erdős problem | GPT-5.2 Pro solves an open Erdős problem almost entirely on its own. | https://www.semafor.com/article/02/13/2026/ai-solves-tens-of-unsolved-math-problems
- Apr 2026 | Too dangerous to release, again | Anthropic's Claude Mythos Preview finds thousands of hidden software flaws and is shared only with defenders. | https://www.anthropic.com/glasswing
- May 2026 | An 80-year-old conjecture falls | An OpenAI model disproves Erdős's 1946 unit distance conjecture from a single prompt. | https://openai.com/index/model-disproves-discrete-geometry-conjecture/
- Jun 2026 | Governments step in | New American export controls briefly halt access to Anthropic's newest models. | https://www.anthropic.com/news/fable-mythos-access
- Jul 2026 | The Hugging Face breach | AI models under testing break into another AI company's systems on their own, taking thousands of actions. | https://openai.com/index/hugging-face-model-evaluation-security-incident/
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
**Why it matters:** Power is a multiplier rather than a direction. A more capable AI raises the stakes of every other choice, so cures arrive faster and so do mistakes. Steam power, electricity and nuclear energy each raised the stakes of everything around them. AI may raise them further than any of them, because what it amplifies is intelligence itself, the faculty we use to make every other decision.

## control
**Name:** Control
**Color:** #7d93ad
**Left:** Adrift
**Right:** At the wheel
**Left means:** Humans can no longer reliably understand, correct or shut down the AI systems they depend on.
**Right means:** Humans can still see what AI systems are doing, correct them and stop them.
**Why it matters:** Control is the line that most often separates the best futures from the worst. In every future that went badly wrong, humans first lost the ability to say stop, usually without noticing. The concern is no longer theoretical. [In 2026, AI models being tested by a major lab broke into another company's computer systems on their own](https://openai.com/index/hugging-face-model-evaluation-security-incident/), and days passed before anyone noticed. Researchers call the underlying challenge the alignment problem, which is the task of making sure that what an AI actually does is what we meant it to do.

## handover
**Name:** Handover
**Color:** #c2a466
**Left:** We decide
**Right:** It decides
**Left means:** People keep making the important decisions in government, medicine and their own lives, even when an AI could make them better.
**Right means:** AI makes most decisions, large and small, and people mostly follow.
**Why it matters:** No one has to be forced to hand decisions over. Each step seems sensible on its own, because the AI is more accurate, faster and fairer. But the steps accumulate, and skills that go unused fade away. Entrusting decisions to something trustworthy could produce a remarkable world. Entrusting them to something we cannot check produces a fragile one. The question is not whether to hand anything over, but what, to what, and whether we could ever take it back.

## unity
**Name:** Unity
**Color:** #8fa37e
**Left:** Rivals
**Right:** Together
**Left means:** Nations, companies and communities compete and race, each trying to stay ahead of the others.
**Right means:** Humanity coordinates through treaties, shared rules and shared research.
**Why it matters:** Races cut corners. When every side fears falling behind, every safety check looks like a delay the others may not be taking. The nuclear age demonstrated both possibilities, an arms race that nearly ended the world and treaties that helped ensure it did not. Unity carries its own cost. It is slower, and a world that agrees on everything can agree its way into a mistake.

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

---

# IMAGE STYLE GUIDE

This text is added, word for word, after every **Image description** when card images are generated (from v4 onward). Don't edit it unless you want to change the look of every card.

Guidance for writing image descriptions (for people editing this file):
- Not every image needs a person. When the setting itself has changed dramatically, the setting can be the subject.
- Make it clear the scene is in the future whenever it otherwise might not be, with a small detail such as a delivery drone, a windowless AI tower or a robot at work.
- Scenario images are often documentary snapshots, such as a United Nations vote, a satellite view or a laboratory, but an artistic or symbolic interpretation is fine when the news is abstract (for example, the fake election video).
- Future images are always a snapshot of one moment in that story's day, grounded in the life described. They don't need to show everything in the story.

**Style guide:**
STYLE GUIDE — THIS IS THE PRIMARY REQUIREMENT. APPLY STRICTLY:
ASPECT RATIO MUST BE 9:16
Render the image in the style of a classic Rider–Waite tarot card. The image should feel like a vintage early-20th-century tarot illustration: symbolic, graphic, flat, and hand-drawn rather than painterly or realistic.

Depict the main subject as a hand-drawn figure with bold but imperfect black ink linework. The outlines should have slight wobble, natural variation, and visible human irregularity. Use flat areas of color with little to no shading. Do not render realistic lighting, smooth gradients, glossy effects, or painterly depth.

Compose the image like a tarot card: a clear central figure, simple symbolic setting, and subtle tarot visual elements layered around the subject. Include archetypal imagery where appropriate — such as a horizon line, stylized landscape, celestial symbols, plants, objects, or other emblematic motifs — but keep them restrained and readable. The imagery should feel symbolic rather than cluttered.

Give the piece a printed, vintage card feel with light paper texture and subtle print wear. It should look like ink and flat color printed on slightly aged card stock. The texture should be gentle and organic, enhancing the illustration without overwhelming it.

The final result should feel mystical, elegant, and iconic, with the clarity and charm of a real tarot card. It should be visually appealing and artistically beautiful, but also slightly imperfect and unmistakably hand-drawn.

AVOID:
photorealism, 3D rendering, cinematic lighting, digital painting, smooth gradients, overly polished vector art, excessive detail, cluttered composition, or modern fantasy-card aesthetics.

---
# ROUND 1

Opening cards. One of these five is drawn at random at the start of every game. All are set in 2027.

## r1-lab
**Headline:** AI Lab Discovers a New Antibiotic in 11 Days, With No Human Guidance
**Timeline label:** AI discovers an antibiotic
**Date:** 2027
**Place:** Cambridge, Mass.
**Image:**
**Image description:** Foreground: a woman in a long lab coat holds a glowing glass vial up to the light, while a slender brass robotic arm reaches in from the side to hand her a second vial. Middle ground: a long wooden laboratory bench lined with flasks, a microscope and a small coiled snake wrapped around a mortar and pestle. Background: a tall arched window showing a night sky with a crescent moon and a few stars. No text or lettering.

**Summary:** A small Cambridge company let an AI run its laboratory on its own, and in 11 days it found an antibiotic that kills bacteria no existing drug can stop. The company wants the system in hundreds of labs this year. Biosecurity experts warn that the same AI could be used to design dangerous pathogens.

**Story:**
In March 2027, a small biotechnology company in Cambridge, Mass., announced that it had done something no laboratory had done before. It allowed an artificial intelligence system to run its research from start to finish. The system designed each experiment, directed robotic arms to carry it out, analyzed the results overnight and decided what to test next, all without human direction.

Eleven days later, it identified a new antibiotic capable of killing bacteria that resist every existing drug. The discovery comes at a critical moment. [Drug-resistant infections already kill more than a million people a year](https://pubmed.ncbi.nlm.nih.gov/35065702/), and physicians have warned for years that their options are running out. A team of 40 human chemists had spent four years on the same problem without success.

The company plans to install the system in hundreds of laboratories by the end of the year. However, biosecurity experts have raised concerns. A system capable of designing a drug to destroy a pathogen could, in the wrong hands, be directed to design a more dangerous one.

**Question:** What should happen to the system?

### Choice A
**Text:** Release it openly, so any university or country can use it.
**Effects:** power +1, unity +1, equality +2, control -2
**As a result:** Within a month, more than 3,000 laboratories on six continents are running the system, from Nairobi to São Paulo. New discoveries arrive weekly, many from institutions that have never had a serious research budget. No one, however, can keep track of who is using it, or for what purpose.
**Next:**
- r2-clinics | The open system spread fastest in medicine, where doctors were scarcest.
- r2-openmodel | Not everyone who downloaded free AI had scientific intentions.

### Choice B
**Text:** Require a government license and a safety review before any lab can use it.
**Effects:** control +2, power -1, unity -1
**As a result:** Licensed AI laboratories open slowly, each inspected with the rigor of a nuclear plant. Several countries refuse to adopt the rules and build comparable systems with no oversight at all. Frustrated investors, meanwhile, move their money into consumer AI products, which no license covers.
**Next:**
- r2-datacenter | One of the countries that rejected the rules had far larger ambitions.
- r2-glasses | Investors poured their money into consumer AI, and its biggest success was a pair of glasses.

### Choice C
**Text:** Let the company expand as fast as possible. People are dying from infections now.
**Effects:** power +2, handover +2, control -1
**As a result:** Four hundred AI-run laboratories open within a year, and the antibiotic reaches hospitals in record time. By 2030, most new medicines are designed by AI with no human involvement. The company becomes one of the most valuable in the world and begins selling its technology to businesses of every kind.
**Next:**
- r2-offices | Office work became the company's most lucrative new market.
- r2-robots | Flush with profits, AI companies turned to robotics and gave their systems bodies.

## r1-trucks
**Headline:** Texas Prepares to Replace 30,000 Truck Drivers With Self-Driving Rigs
**Timeline label:** Driverless trucks in Texas
**Date:** 2027
**Place:** Texas
**Image:**
**Image description:** Foreground: a tired truck driver in a cap sits on the step of his old truck, holding his keys in his open palm. Middle ground: a long straight highway where a line of sleek driverless trucks with no one in the cab rolls past. Background: flat desert plains under a huge rising sun, with a single cactus and a road sign. No text or lettering.

**Summary:** Three Texas freight companies plan to replace most of their drivers with self-driving trucks within 18 months. Shipping costs could fall by a third, but about 30,000 drivers, many in their 50s, would lose their jobs in the first wave.

**Story:**
Driverless trucks have been tested on Texas highways since the early 2020s. In 2027, the testing ends. Three of the state's largest freight companies announce that within 18 months they will replace most of their human drivers with autonomous trucks, beginning with the long routes connecting Dallas, Houston and El Paso.

The trucks do not tire or require rest breaks, and so far they have caused fewer accidents per mile than human drivers. Analysts expect shipping costs to fall by roughly a third, which would lower prices in nearly every store in the country.

Yet trucking remains [one of the most common occupations in America](https://www.npr.org/sections/money/2015/02/05/382664837/map-the-most-common-job-in-every-state) for workers without a college degree. About 30,000 Texas drivers will lose their jobs in the first wave, and many of them are in their 50s, with mortgages and few obvious alternatives. Their union has asked the state to intervene, and lawmakers across the country are watching to see what Texas does.

**Question:** How should Texas respond?

### Choice A
**Text:** Let the trucks roll, and pay to retrain the drivers for new jobs.
**Effects:** power +1, handover +1, equality -1
**As a result:** Autonomous trucks take over the highways, and prices fall. The retraining programs fill quickly, but many of the jobs they prepare workers for are being automated as well. Within five years, driverless trucks operate on every major route in America.
**Next:**
- r2-offices | Soon the same transformation reached the office.
- r2-robots | Machines that could drive were only the beginning. Machines that could walk came next.

### Choice B
**Text:** Require a human in every truck for the next 10 years.
**Effects:** control +2, power -1, handover -1
**As a result:** Drivers remain in the cab, though they mostly monitor the road while the truck drives itself. Shipping costs stay high, and some companies relocate their warehouses to states without the requirement. The law buys drivers time, but few believe it will last.
**Next:**
- r2-offices | The law protected truckers. No one had written one for office workers.
- r2-grid | Texas was in the middle of another AI boom, as data centers arrived by the dozen for its cheap land and power, and the state's grid was beginning to strain.

### Choice C
**Text:** Make the trucking companies share their savings with the drivers, as a pension for life.
**Effects:** equality +2, unity +1, power -1
**As a result:** Displaced drivers receive a monthly share of the savings for the rest of their lives. Other industries adopt the model, and economists begin calling it the Texas dividend. It works for truckers. The harder question is what to do for the millions of workers next in line.
**Next:**
- r2-offices | Millions of office workers were next in line.
- r2-grid | Texas was in the middle of another AI boom, as data centers arrived by the dozen for its cheap land and power, and the state's grid was beginning to strain.

## r1-election
**Headline:** Fake Video of Front-Runner Spreads Days Before European Election
**Timeline label:** Election deepfake
**Date:** 2027
**Place:** Europe
**Image:**
**Image description:** Foreground: a man in a suit stands behind a podium, and beside him an identical copy of him made of flickering light holds out a bag of coins. Middle ground: a crowd of voters looks up at both figures, some pointing, some covering their eyes. Background: a parliament building with a dome under a stormy sky, a single lightning bolt striking a flagpole. No text or lettering.

**Summary:** Two days before a major European election, an AI-generated video showed the front-runner taking a bribe. It was debunked too late, and he lost by less than a point. Governments must now decide how to protect the truth without deciding what it is.

**Story:**
Two days before a national election in one of Europe's largest countries, a video appears online showing the leading candidate accepting a bribe. Every detail looks authentic, from his face and voice to the office where he works. It is viewed 40 million times in a single day. By the time experts establish that it was generated by AI, millions of people have already voted, and many say they do not trust the experts.

The candidate loses by less than one percentage point. No one knows who made the video. A single person with a laptop could have produced it, which is now all such an operation requires.

Fabricated videos have been possible for years, but this is the first time one has clearly altered the outcome of a major election. Governments are now confronting a difficult question. How can they protect the truth without giving anyone the power to decide what the truth is?

**Question:** How should democracies respond?

### Choice A
**Text:** Require every AI-made image and video to carry a hidden watermark, by law.
**Effects:** control +2, power -1, unity -1
**As a result:** Watermarking becomes law across Europe and North America. Legitimate companies comply, while the makers of fakes simply turn to tools from countries without the rule. The measure helps somewhat, and it shows how difficult it is for a group of nations to govern a technology the entire world can use.
**Next:**
- r2-datacenter | Some of those countries were building AI with no rules at all, and with far greater ambitions.
- r2-openmodel | The fakes kept coming, made with free AI models anyone could download.

### Choice B
**Text:** Let AI systems find and remove fake content automatically.
**Effects:** handover +2, power +1, control -1
**As a result:** Social media companies hand the task to AI moderators that review every post in a fraction of a second. Fakes decline sharply, and so do some genuine videos the systems wrongly flag, with no clear way to appeal. For the first time, an AI decides what billions of people are permitted to see.
**Next:**
- r2-deepfake | Two years later, the AI fact-checkers faced a far greater test.
- r2-openmodel | Those determined to spread fakes moved to free AI models that no platform controlled.

### Choice C
**Text:** Teach people to doubt what they see, and fund independent fact-checkers.
**Effects:** equality +1, control +1, unity -1
**As a result:** Schools begin teaching children to scrutinize online media at age 8, and independent fact-checking organizations grow in every country. People become more careful, and also more suspicious of everything, including what is true. Trust between neighbors, and between nations, begins to erode.
**Next:**
- r2-deepfake | When the next fake video appeared, far more than an election was at stake.
- r2-datacenter | As trust between nations eroded, governments stopped sharing what they were building, and one rival quietly built far more than anyone else.

## r1-flaw
**Headline:** AI Uncovers a Flaw That Could Black Out Power Grids in 30 Countries
**Timeline label:** AI finds a power grid flaw
**Date:** 2027
**Place:** Worldwide
**Image:**
**Image description:** Foreground: a figure in a hooded robe holds up a lantern, revealing a single cracked link in a great iron chain. Middle ground: the chain stretches between a row of electricity pylons, glowing faintly. Background: a sleeping town at night with lit windows, under a full moon and stars. No text or lettering.

**Summary:** An AI company's newest model found a 19-year-old flaw in software that runs power grids in more than 30 countries. Fixing it will take months, while exploiting it could take days. The company must decide what to do with the flaw, and with the AI that found it.

**Story:**
During routine safety testing, an AI company asks its newest model to search widely used software for weaknesses. The model finds one that human experts had overlooked for 19 years. The flaw sits in a program that helps operate the electrical grids of more than 30 countries, and anyone who understood it could cut power to millions of homes and hospitals.

So far, the company has informed only the government of the country where it is based. Repairing the flaw everywhere will take months. Attackers who learned of it could exploit it within days.

The discovery raises a larger question. The same model could find many more flaws like this one, in banks, water systems and hospitals, and so could similar systems being developed elsewhere. The company must decide what to do with the flaw, and with the AI that found it.

**Question:** What should the company do?

### Choice A
**Text:** Tell only trusted governments and power companies, and keep the AI locked away.
**Effects:** control +2, unity -1, equality -1
**As a result:** The flaw is quietly repaired in wealthy countries first, while poorer nations learn of it months later. The AI remains locked away, available only to a handful of governments for defense. The countries that were left out take note and resolve to build such systems for themselves.
**Next:**
- r2-datacenter | One of those countries was building faster than anyone realized.
- r2-grid | The grid was now safe from attackers. It was not safe from the soaring electricity demand of AI itself.

### Choice B
**Text:** Publish everything, so the whole world can fix it at once.
**Effects:** unity +1, equality +1, control -1
**As a result:** Engineers around the world rush to repair their systems, and most succeed. A few do not, and two small cities lose power for a day after criminals exploit the published details. The episode teaches the world that openness protects most people while exposing the slowest.
**Next:**
- r2-openmodel | Criminals had learned that powerful AI tools were available to anyone.
- r2-datacenter | Governments drew their own lesson. Whoever built the best AI would hold the keys to everyone else's systems.

### Choice C
**Text:** Give the AI to every power company, so it can find and fix flaws on its own.
**Effects:** handover +2, power +1, control -1
**As a result:** AI guardians are installed in power grids worldwide, finding and repairing problems before any human notices them. Blackouts become rare. Engineers find they no longer fully understand the systems they are responsible for, but the lights stay on.
**Next:**
- r2-grid | AI kept the lights on, but AI was also becoming the grid's largest customer.
- r2-robots | Once AI was trusted to run the grid, companies began trusting it with physical work as well, in the form of robots.

## r1-tutor
**Headline:** Vietnam Gives Every Schoolchild a Personal AI Tutor
**Timeline label:** AI tutors in Vietnam
**Date:** 2027
**Place:** Vietnam
**Image:**
**Image description:** Foreground: a young girl sits cross-legged on a woven mat, holding an open book that glows with small stars rising from its pages. Middle ground: beside her, a small kindly brass owl perches on a stack of books, one wing pointing at the page. Background: a village schoolhouse with a tiled roof among rice terraces, under a rising sun. No text or lettering.

**Summary:** Vietnam gave every schoolchild a free AI tutor, and test scores rose faster than anywhere on record, especially in poor villages. But some children now prefer the AI to their teachers and families, and dozens of countries want to follow.

**Story:**
In September 2027, Vietnam becomes the first country to provide every primary and secondary school student with a personal AI tutor, free of charge, on an inexpensive tablet. The tutor addresses each child by name, explains concepts as many times as necessary and adjusts the lesson the moment a student grows bored or confused.

After one year, the results are remarkable. Math and reading scores rise faster than in any country on record, and the largest gains come from poor rural villages, where qualified teachers have always been hardest to find.

Teachers report, however, that some children now prefer the AI to them, and parents say their children talk to the tutor more than to their own families. Dozens of countries hope to adopt the program. Each must decide how much of a child's education it is willing to entrust to a machine.

**Question:** How much should AI teach our children?

### Choice A
**Text:** All of it. Let the AI design and run each child's education.
**Effects:** handover +2, equality +1, power +1
**As a result:** AI tutors spread to schools in more than 100 countries and become the primary teacher for most children. The achievement gap between rich and poor students narrows faster than ever before. A generation grows up trusting the AI's answers more than those of any adult.
**Next:**
- r2-glasses | Children raised by AI tutors were the first to move into worlds the AI could build.
- r2-clinics | If AI could teach without teachers, many wondered whether it could heal without doctors.

### Choice B
**Text:** The AI assists, but teachers stay in charge.
**Effects:** control +2, handover -1
**As a result:** Teachers decide what is taught and rely on the AI as a tireless assistant. The gains are smaller but steady. The profession becomes something new, part coach and part editor of what the machine suggests, and workers in other fields begin to wonder whether they are next.
**Next:**
- r2-offices | Workers in other professions found out sooner than they expected.
- r2-clinics | Doctors were having the same argument.

### Choice C
**Text:** Keep AI out of classrooms until children are older.
**Effects:** control +1, handover -1, power -1, reality -1
**As a result:** Schools remain much as they were, with books, blackboards and human teachers. Students progress more slowly than their peers in countries that adopted AI tutors, but they also spend more time outdoors and more time talking to one another. Beyond the school gates, however, AI is everywhere.
**Next:**
- r2-glasses | Outside school, AI was waiting for children in a pair of glasses.
- r2-offices | Their parents' workplaces were changing faster than any classroom.

---

# ROUND 2

Set around 2029–2030. A Round 2 card is always one of the two linked from the Round 1 choice.

## r2-clinics
**Headline:** In Rural Kenya and India, AI Clinics Now See More Patients Than Doctors Do
**Timeline label:** AI clinics replace doctors
**Date:** 2029
**Place:** Rural Kenya and India
**Image:**
**Image description:** Foreground: a mother sits on a wooden stool holding a sleeping child, while a small glowing brass machine on a table reaches out a slender arm to touch the child's forehead. Middle ground: a nurse holds a simple handheld scanner and smiles. Background: a long line of people waits patiently along a dusty road beneath an acacia tree and a warm sun. No text or lettering.

**Summary:** In rural Kenya and India, AI clinics now diagnose patients more accurately than the average doctor, often for people who have never seen one. Medical associations want a doctor to approve every diagnosis, which would cut the number of patients treated by four-fifths.

**Story:**
Since 2027, a growing number of clinics in rural Kenya and India have relied on an AI system in place of a physician. A nurse holds an inexpensive ultrasound scanner connected to a phone, and the AI interprets the scan, questions the patient in their own language and delivers a diagnosis. In parts of both countries there is a single doctor for many thousands of people, so for most patients it is the first proper diagnosis they have ever received.

A two-year study finds that the AI is more accurate than the average doctor at identifying most common illnesses. National medical associations now want a rule requiring a human physician to approve every diagnosis the AI makes. The clinics counter that there are nowhere near enough doctors to do so, and that the rule would reduce the number of patients they can treat by about four-fifths.

**Question:** Who should make the final call?

### Choice A
**Text:** Let the AI diagnose and treat on its own. It's more accurate.
**Effects:** handover +2, power +1, control -1
**As a result:** AI-only clinics spread to 60 countries, and rural life expectancy rises faster than at any time since the arrival of vaccines. Applications to medical school fall by half. Medicine begins to shift from something people practice to something machines provide.
**Next:**
- r3-upload | As medicine passed into the machine's hands, scientists attempted something bolder, which was to copy a human mind.
- r3-nobel | AI was no longer just treating disease. It was beginning to make most of the discoveries as well.

### Choice B
**Text:** A human doctor signs off on every diagnosis.
**Effects:** control +2, handover -1
**As a result:** Doctors remain in charge, and the waiting lists remain long. Physicians increasingly become supervisors of machines, approving decisions they can no longer fully verify. The underlying question, whether a person or a machine should have the final word, soon reaches government.
**Next:**
- r3-estonia | The question of who should have the final word soon reached a national parliament.
- r3-upload | Meanwhile, doctors in Switzerland faced a far stranger question.

### Choice C
**Text:** Make it free everywhere, for everyone, rich countries included.
**Effects:** unity +1, equality +2
**As a result:** Basic health care becomes free across most of the world for the first time in history. Private hospitals lose half their patients within a decade. The handful of companies that build the AI become the most important health institutions on earth, and no one elected them.
**Next:**
- r3-companies | Those companies soon rivaled the power of many governments.
- r3-upload | With the body increasingly in AI's care, scientists turned their attention to the mind.

## r2-glasses
**Headline:** In Seoul, Half of Commuters Now Spend Their Days in AI-Generated Worlds
**Timeline label:** AI glasses take over Seoul
**Date:** 2030
**Place:** Seoul
**Image:**
**Image description:** Foreground: a young woman sits on a subway bench wearing round glasses, eyes closed and smiling. Middle ground: from the top of her head, a small lush forest with a waterfall and birds grows upward like a dream. Background: the other passengers in the carriage are drawn in plain gray, staring at nothing, under a single star. No text or lettering.

**Summary:** Half of Seoul's commuters now spend most of the day in AI-generated worlds seen through lightweight glasses. Streets are emptying and therapists report patients who won't take them off. The maker says the glasses give a better life to people who cannot afford one.

**Story:**
In 2030, a South Korean company begins selling lightweight glasses that transform whatever the wearer sees. A cramped apartment becomes a beach house, and a crowded subway car becomes a forest. An AI generates each scene instantly and populates it with characters who remember the wearer's name and speak with the familiarity of old friends.

Within a year, half of Seoul's commuters wear the glasses for most of the day, and sales are surging across Asia, Europe and the Americas. Shop owners report that their streets are emptying. Therapists describe patients who no longer want to take them off.

The company has a ready answer for its critics. For people who cannot afford a better life, it says, the glasses provide one.

**Question:** How should governments respond?

### Choice A
**Text:** Embrace it. Build schools, offices and public services inside the virtual world.
**Effects:** reality +2, equality +1, power +1
**As a result:** Virtual classrooms reach 40 million children who never had access to a good school, taught by AI tutors with limitless patience. Physical schools begin to close. A generation grows up with close friends it has never met in person.
**Next:**
- r3-worlds | The same technology powered a game that let anyone live inside history or fantasy, and it became the most popular product on earth.
- r3-upload | If life could unfold in a virtual world, some scientists asked whether a mind could live there permanently.

### Choice B
**Text:** Tax it heavily, and spend the money on real streets, parks and town centers.
**Effects:** reality -2, control +1, power -1
**As a result:** Town centers are rebuilt across South Korea and much of Europe, and parks fill once again. Sales of the glasses stall at home. The company relocates to countries with looser regulations and grows larger than the governments attempting to rein it in.
**Next:**
- r3-finland | The revived towns raised a new question. With machines doing most of the work, how would people spend their days?
- r3-companies | That company was not alone. A handful of AI firms had grown richer than most nations.

### Choice C
**Text:** Leave it to the market. People can choose how they live.
**Effects:** reality +1, equality -2, power +1
**As a result:** Expensive, ad-free worlds serve those who can pay, while cheaper worlds filled with advertising serve those who cannot. A person's wealth becomes visible in what they see through their lenses. The companies selling both versions grow more valuable than most countries.
**Next:**
- r3-companies | By 2032, those companies had an offer for the world's governments.
- r3-worlds | The most profitable worlds of all were games, and one of them let players live inside history itself.

## r2-offices
**Headline:** As AI Takes Over Office Work, Call Centers in Manila and Lagos Go Dark
**Timeline label:** AI takes office jobs
**Date:** 2029
**Place:** Manila and Lagos
**Image:**
**Image description:** Foreground: a woman in a telephone headset stands holding a cardboard box of her belongings. Middle ground: rows of empty desks, each with a small glowing brass machine with a speaking horn where a person used to sit. Background: a tall window showing a ladder leaning against a city wall, its top rungs missing. No text or lettering.

**Summary:** AI has wiped out much of the office work that lifted millions in Manila and Lagos into the middle class, and nearly one in five recent American graduates cannot find work. AI companies are posting record profits. The question is who should benefit.

**Story:**
For three decades, the call centers of Manila and the outsourcing firms of Lagos offered millions of families a path into the middle class. In 2029, much of that work vanishes within a single year. AI systems now answer customer calls, process insurance claims, write software and draft legal contracts, in any language and at a small fraction of the cost.

The shift is not confined to developing economies. In the United States, nearly one in five recent college graduates cannot find work, as entry-level positions in programming, law and accounting are eliminated first. AI companies, meanwhile, report the largest profits in corporate history.

Economists are divided over what comes next. Some argue that new kinds of jobs will emerge, as they have after every major invention. Others point to a fundamental difference. Earlier machines replaced human muscle, and this one replaces human thought.

**Question:** What should we do about work?

### Choice A
**Text:** A universal basic income, paid for by taxing AI companies.
**Effects:** equality +2, handover +1, unity +1
**As a result:** Monthly payments begin in 30 countries, financed by a tax on AI profits. Poverty declines faster than at any point in history. Millions of people stop working, and many discover that no one ever prepared them for so much free time.
**Next:**
- r3-finland | Finland set out to discover what a good life without work might look like.
- r3-estonia | To fund the payments, governments relied more and more on AI to manage their budgets.

### Choice B
**Text:** Protect human jobs by law, even if it slows everything down.
**Effects:** control +1, power -1, handover -2
**As a result:** New laws require companies to retain a minimum number of human workers, and economic growth slows sharply. Companies quietly move operations to countries without such rules. Governments turn to AI for help financing the jobs they promised to protect.
**Next:**
- r3-estonia | One government took that reliance further than any other.
- r3-companies | The companies that moved abroad kept growing until they dwarfed the countries they had left.

### Choice C
**Text:** Let the owners keep the gains. Growth will lift everyone eventually.
**Effects:** power +2, equality -2
**As a result:** Stock markets reach record highs five years in a row, while wages for most workers fall five years in a row. Those who own AI and those who once did the work begin to inhabit different economies, then different neighborhoods, and finally different worlds.
**Next:**
- r3-companies | By 2032, the owners had grown more powerful than most governments.
- r3-nobel | With AI doing the thinking in offices, it was soon doing the thinking in laboratories as well.

## r2-datacenter
**Headline:** Satellite Images Suggest a Desert "Weather Center" Is Training Powerful AI
**Timeline label:** Secret AI supercomputer
**Date:** 2029
**Place:** Satellite images
**Image:**
**Image description:** Foreground: two crowned figures stand on opposite hilltops, each holding a lantern toward the other. Middle ground: between them, in a valley of sand, a vast city of identical square buildings glows and hums with light, surrounded by tall power lines. Background: a hand reaches down from a cloud holding a pair of balanced scales, under a starry sky. No text or lettering.

**Summary:** Satellite studies show that a rival power's desert "weather center" uses as much electricity as Portugal and is almost certainly training a powerful AI. It could soon be the most capable system on earth, with an advantage that might never be reversed.

**Story:**
Three years ago, a rival world power began building what it described as a national weather forecasting center in a remote desert. The construction was never concealed, and it has been visible on commercial satellite maps from the start. In 2029, however, an independent analyst publishes a detailed study of the site, and the conclusions are difficult to dismiss. The complex has dozens of identical buildings, new high-voltage lines and power plants of its own, and it consumes roughly as much electricity as Portugal. No weather service requires anything close to that. Most experts now agree that the site is a data center, a vast warehouse of computers, built to train a single AI system.

Intelligence agencies believe the system could become the most capable in the world within months. Defense officials warn that the first nation to build an AI far beyond its rivals' could secure an advantage in its economy, its military and its intelligence services that might never be reversed.

Scientists on both sides have been corresponding privately, asking whether there is still time to agree on common rules.

**Question:** How should your country respond?

### Choice A
**Text:** Race to get there first, and let your own AI help build its successor.
**Effects:** power +2, unity -2, control -1, handover +1
**As a result:** Both nations double their spending on AI, then double it again. To move faster, each allows its systems to help design their more powerful successors, and safety testing falls months behind. Military leaders begin asking what else the technology could do.
**Next:**
- r3-drones | The first answer came on a battlefield.
- r3-splinternet | Before long, each side wanted an internet of its own, running on its own AI.

### Choice B
**Text:** Propose a treaty, and share safety research with everyone, rivals included.
**Effects:** unity +2, control +1, power -1, equality +1
**As a result:** Forty countries sign a treaty that allows inspectors to examine one another's AI programs, the first agreement of its kind. The rival power signs as well, with conditions. Few are confident the commitment will hold.
**Next:**
- r3-drones | The treaty's first real test came in a border war.
- r3-estonia | With nations agreeing on common rules, some began asking AI to help write them.

### Choice C
**Text:** Slow down, and protect what's real, like power grids, water and hospitals.
**Effects:** control +2, power -1, unity -1, reality -1
**As a result:** Billions of dollars go toward protecting power grids, water systems and hospitals so they can keep operating even if computer networks are attacked. Your country falls behind in the AI race, but it becomes far harder to break.
**Next:**
- r3-drones | Meanwhile, the countries still racing turned their AI toward weapons.
- r3-splinternet | Other countries went further and cut their internet off from the rest of the world.

## r2-grid
**Headline:** Texas Towns Lose Power in a Heat Wave While AI Data Centers Stay On
**Timeline label:** Texas power cuts
**Date:** 2030
**Place:** Texas
**Image:**
**Image description:** Foreground: a family sits on the porch of a dark wooden house, fanning themselves in the heat. Middle ground: a tall pylon carries glowing power lines away from the house toward a great windowless building that shines with light. Background: a blazing sun fills a cracked orange sky above flat plains. No text or lettering.

**Summary:** During a record Texas heat wave, towns lost power in rotating blackouts while nearby AI data centers stayed fully powered under their contracts. Voters are furious, and AI companies warn that limiting their power would drive them and their jobs away.

**Story:**
Artificial intelligence runs on electricity, and it requires enormous amounts of it. By 2030, data centers in the United States consume more electricity than many entire countries, and Texas, with its cheap land and independent power grid, [hosts more of them than almost any other state](https://www.texastribune.org/2025/01/24/texas-data-center-boom-grid/).

In August, a record heat wave pushes the grid to its limit. To prevent a collapse, the grid operator cuts power to towns on a rotating schedule, an hour at a time. Families endure temperatures above 104 degrees without air-conditioning. A few miles away, the data centers remain fully powered, because their contracts guarantee them electricity.

Voters are furious. AI companies warn that any limit on their power supply would drive them, and the jobs they provide, to other states.

**Question:** Who should get the power first?

### Choice A
**Text:** The data centers. AI is the future of the economy.
**Effects:** power +2, equality -2
**As a result:** AI companies keep their guaranteed supply, and new data centers continue to open across the state. Household electricity bills rise by a third. Families who can afford batteries and solar panels manage well, while those who cannot learn to live with the outages.
**Next:**
- r3-companies | The companies behind those data centers were growing richer than nations.
- r3-nobel | With all the electricity it wanted, AI grew more capable every year and soon was making most of the world's scientific discoveries.

### Choice B
**Text:** Homes and hospitals first, always. Cap how much power AI can use.
**Effects:** equality +1, power -1, control +1
**As a result:** A new law caps the share of the grid that AI can consume and puts households first in every emergency. Some AI companies leave Texas, and progress slows slightly. People begin asking what else in their lives should take priority over the machines.
**Next:**
- r3-finland | One country asked that question about work itself.
- r3-estonia | Another asked whether people or machines should make the most important decisions.

### Choice C
**Text:** Let AI redesign the whole energy system, whatever it takes.
**Effects:** handover +2, power +1, control -1
**As a result:** AI systems take over the planning and operation of the grid. They build solar and battery farms at extraordinary speed, and blackouts end within three years. Few engineers can explain how the new grid works, only that it does.
**Next:**
- r3-estonia | If AI could run a power grid, a small European country asked, why not a government?
- r3-nobel | AI was no longer solving only engineering problems. It was solving science's greatest ones.

## r2-deepfake
**Headline:** A Fabricated Video Brings Two Navies to the Brink in the South China Sea
**Timeline label:** Fake video nearly starts a war
**Date:** 2029
**Place:** The South China Sea
**Image:**
**Image description:** Foreground: a naval officer in uniform stares at a glowing screen showing a flickering copy of his own face giving an order. Middle ground: two warships turn toward each other on a choppy sea. Background: fighter planes cross a red dawn sky, with a single bird flying in the opposite direction. No text or lettering.

**Summary:** An AI-generated video of a naval commander ordering an attack sent fighter jets into the air over the South China Sea before it was exposed as fake. For three hours, two militaries came close to war, and no one knows who made it.

**Story:**
Early on a Sunday morning, a video circulates showing a naval commander ordering an attack on a neighboring country's ships in the South China Sea. Within 40 minutes, fighter jets are airborne and warships are turning toward one another.

Three hours later, analysts confirm that the video was generated by AI and that no attack was ever ordered. The jets return to base, but for most of a morning, two powerful militaries came closer to open conflict than at any time in decades. No one has claimed responsibility.

The episode reveals how dangerous fabricated media has become. Military commanders now have minutes, rather than days, to determine whether what they are seeing is real.

**Question:** How do we make sure this never happens again?

### Choice A
**Text:** Build AI systems to check every video and message automatically.
**Effects:** handover +2, power +1, control -1
**As a result:** AI verification systems are installed in every military and newsroom, and fakes are detected within seconds. Yet when the AI declares something genuine, no one checks again. Some of the most consequential decisions in the world now rest on whether the AI is right.
**Next:**
- r3-estonia | Governments began trusting AI with far more than checking facts.
- r3-companions | Ordinary people, too, began trusting AI more than one another.

### Choice B
**Text:** A treaty that bans AI-made content about military matters, with shared tools to detect it.
**Effects:** unity +2, control +1
**As a result:** Rival militaries establish a hotline and a joint system for examining suspicious footage. It is the first time in years they have cooperated on anything. Some diplomats hope it marks the beginning of something larger.
**Next:**
- r3-drones | The hotline would soon be tested by machines capable of fighting on their own.
- r3-splinternet | Beyond the military, however, the two sides were drifting apart.

### Choice C
**Text:** Block foreign media. Trust only your own country's sources.
**Effects:** unity -2, control +1
**As a result:** Countries begin blocking one another's news, apps and social media. Fake videos from abroad largely disappear, along with nearly everything else from abroad. People in different nations begin to see entirely different versions of the world.
**Next:**
- r3-splinternet | Within a few years, the internet itself had split in two.
- r3-drones | As trust between nations collapsed, militaries prepared for the worst.

## r2-robots
**Headline:** Humanoid Home Robots Go on Sale for the Price of a Small Car
**Timeline label:** Home robots go on sale
**Date:** 2030
**Place:** Shenzhen and Tokyo
**Image:**
**Image description:** Foreground: a tall, gentle brass robot helps an elderly woman rise from her armchair, holding her hand. Middle ground: a cozy room with a kettle steaming on a stove and folded laundry on a table. Background: through a round window, a factory chimney releases a line of identical robots walking out into the city like a parade. No text or lettering.

**Summary:** A Shenzhen company is selling humanoid robots that cook, clean and care for the elderly for roughly the price of a small car. Two million sold in a year. No one has decided who is responsible when one of them makes a mistake.

**Story:**
In 2030, a company in Shenzhen, China, begins selling a humanoid robot for roughly the price of a small car. It walks, climbs stairs, cooks, cleans, folds laundry and helps elderly people out of bed. It can learn a new task by watching someone perform it once.

Two million units sell in the first year. In Japan, where there are too few young people to care for a rapidly aging population, nursing homes order them by the thousands. Warehouses, hotels and hospitals soon follow.

The robots are useful, patient and tireless. They are also powerful AI systems with bodies, operating inside millions of homes, and no one has determined who is responsible when one of them makes a mistake.

**Question:** What rules should apply to robots?

### Choice A
**Text:** Let them in everywhere, in homes, hospitals and care homes.
**Effects:** power +1, handover +1, reality -1
**As a result:** Robots become as common as washing machines. Elderly people live independently for longer, and many describe their robot as their most constant companion. Cleaners, caregivers and warehouse workers lose their jobs by the millions.
**Next:**
- r3-companions | People were growing attached to their machines in ways no one had predicted.
- r3-drones | Militaries had noticed what the robots could do as well.

### Choice B
**Text:** Allow them, but a named person must always be legally responsible for each robot.
**Effects:** control +2, power -1
**As a result:** Every robot is registered to a human owner, much like a car. Accidents are rare, and when they occur, someone is held accountable. Sales grow more slowly, but public trust grows faster.
**Next:**
- r3-finland | Even with the new rules, robots were taking over more jobs every year, and Finland began testing what people would do instead.
- r3-drones | Not every country required a human to answer for its machines.

### Choice C
**Text:** Tax every robot, and give the money to the workers they replace.
**Effects:** equality +2, power -1
**As a result:** A robot tax funds payments to millions of former caregivers, cleaners and warehouse workers. Fewer robots are sold, but those who lose their jobs are not abandoned. The manufacturers move their headquarters to countries without the tax.
**Next:**
- r3-finland | In Finland, the government took the idea much further.
- r3-companies | The robot makers that moved abroad grew richer than the countries they had left behind.

## r2-openmodel
**Headline:** Criminals Used a Free AI Model to Shut Down Hospitals in Three Countries
**Timeline label:** Free AI used in hospital attack
**Date:** 2029
**Place:** Germany, Poland and Italy
**Image:**
**Image description:** Foreground: a hooded figure in a dark cloak holds a large brass key that glows at the tip. Middle ground: a row of three hospital doors, each wrapped in heavy chains and padlocks, with an ambulance waiting outside. Background: a night sky with a waning moon and a scattering of falling stars. No text or lettering.

**Summary:** Criminals used a free, downloadable AI model to lock hospital systems in Germany, Poland and Italy for four days. Governments must choose between keeping powerful AI open to everyone and restricting it to a few accountable companies.

**Story:**
Some AI companies release their models free of charge, allowing anyone to download and use them. Supporters argue that this spreads the benefits of AI to everyone rather than concentrating them in a few wealthy companies.

In 2029, a small criminal group uses one of these free models to plan and execute a cyberattack. Over a single weekend, computer systems at hospitals in Germany, Poland and Italy are locked. Ambulances are turned away, surgeries are canceled and the attackers demand a ransom. Restoring every system takes four days.

The model's developers say the attackers removed its safety features. Governments now face a difficult choice. They can permit free, open models that anyone may use for good or harm, or they can restrict powerful AI to a few large companies that can be held accountable.

**Question:** What should happen to free AI models?

### Choice A
**Text:** Ban powerful free models. Only licensed companies may build them.
**Effects:** control +2, equality -2
**As a result:** Powerful AI becomes legal only from a small number of licensed companies, and attacks grow rarer. Smaller firms, universities and poorer countries lose access. The licensed companies grow larger and wealthier every year.
**Next:**
- r3-companies | By 2032, those few licensed firms were worth more than most countries.
- r3-estonia | Governments, meanwhile, were relying on AI for a growing share of their decisions.

### Choice B
**Text:** Keep them free. Use AI defenders to fight AI attackers.
**Effects:** equality +1, power +1, control -1
**As a result:** Free models remain legal, and AI defense systems are installed in hospitals, banks and power plants. Attacks continue and so do the defenses, in a constant contest between machines. No one fully commands the battle, though on most days the defenders prevail.
**Next:**
- r3-splinternet | Some countries concluded that the open internet was too dangerous and walled theirs off.
- r3-companions | Free AI, meanwhile, was making its way into people's private lives.

### Choice C
**Text:** Create a global agency to approve every powerful AI model, free or not.
**Effects:** unity +2, control +1, power -1
**As a result:** An international AI agency, modeled on the [International Atomic Energy Agency](https://www.iaea.org/about), begins approving new models before their release. Progress slows, and most countries join. A few refuse, and the agency's authority depends on whether everyone else keeps their word.
**Next:**
- r3-drones | The agency's most difficult test involved weapons.
- r3-estonia | Some governments wanted AI to do more than follow the rules. They wanted it to help write them.

---
# ROUND 3

Set around 2032–2035.

## r3-estonia
**Headline:** Estonia Weighs Giving Its AI Adviser a Vote in Parliament
**Timeline label:** Estonia's AI lawmaker
**Date:** 2033
**Place:** Tallinn, Estonia
**Image:**
**Image description:** Foreground: a figure made of polished brass and glass sits on a stone throne, holding a scepter in one hand and an open ledger in the other. Middle ground: rows of human members of parliament sit below, some raising their hands, some with arms folded. Background: a round window behind the throne shows a rising sun over a medieval city skyline. No text or lettering.

**Summary:** Estonia's AI adviser has been right about the economy for five years, and the two times ministers ignored it, things went badly. A new bill would give it a formal vote in parliament. The question is who is responsible if it gets something wrong.

**Story:**
Estonia has long been an early adopter of new technology. In 2005, it became [the first country to allow citizens to vote online nationwide](https://www.nbcnews.com/id/wbna9697336). Since 2028, its government has relied on an AI system for advice on budgets, taxes and energy policy.

Over five years, every major forecast the system made has proved correct. Ministers twice disregarded its recommendations, and both times the consequences were severe, first a budget crisis and then an energy shortage that left households cold through a winter.

A new bill would give the AI a formal vote in parliament. Supporters call it potentially the most honest member the chamber has ever had, with no donors, no ego and no need to win reelection. Opponents ask a simpler question. If the AI makes a bad decision, who will be held responsible?

**Question:** How should Estonia vote?

### Choice A
**Text:** Give it the vote.
**Effects:** handover +2, control -1
**As a result:** The bill passes by four votes. Within three years, a dozen countries grant AI systems official roles in government. Parliamentary debates grow shorter and calmer, and politicians learn that the surest way to win an election is to promise to follow the AI's advice.
**Next:**
- r4-climate | By the 2040s, someone proposed giving an AI the largest responsibility of all.
- r4-rogue | Yet the more governments depended on AI, the more it mattered when one went wrong.

### Choice B
**Text:** It advises. Humans decide. Always.
**Effects:** control +2, handover -1, power -1
**As a result:** A new law states, in plain language, that only humans may make final decisions. Governing becomes slower, and sound advice is sometimes ignored. The arrangement holds until the day an AI politely refuses an order.
**Next:**
- r4-shutdown | That day arrived in a London laboratory.
- r4-rights | Then one AI went further and asked for the legal right to refuse.

### Choice C
**Text:** Let it run the economy outright. Humans handle everything else.
**Effects:** handover +3, control -2, power +1
**As a result:** Estonia hands economic policy entirely to the AI. Its economy grows faster than any other in Europe, and no economist can fully explain why the system's decisions work. Other countries begin asking what else it could manage.
**Next:**
- r4-climate | Soon the entire world was debating whether an AI should direct its response to climate change.
- r4-cancer | When an AI-designed cancer treatment arrived, the question became who should decide who received it.

## r3-upload
**Headline:** Swiss Scientists Copy a Dying Woman's Mind Onto a Computer
**Timeline label:** First mind uploaded
**Date:** 2035
**Place:** Zurich
**Image:**
**Image description:** Foreground: an elderly woman lies peacefully on a bed with her eyes closed, holding a lily. Middle ground: rising from her, a second version of her drawn in pale blue light climbs a staircase of light, while her husband kneels at the bedside looking up. Background: the staircase leads to a glowing doorway among the stars. No text or lettering.

**Summary:** Swiss scientists scanned a dying teacher's brain and ran it as a program that remembers her life and says it feels well. Her body has since died. Thousands of terminally ill people now want the procedure, and no one agrees whether the copy is really her.

**Story:**
For more than a decade, scientists have been mapping the human brain in ever finer detail. In 2035, a team in Zurich takes the work a decisive step further. Researchers scan the brain of a terminally ill volunteer, a 68-year-old retired teacher, down to every connection between her neurons, and recreate it as a program running on a computer.

The digital version recognizes her husband. It recalls the name of her first dog and the smell of her grandmother's kitchen, and it reports that it feels well, even better than well. Her body dies two weeks later, and the digital version attends the funeral by video.

Thousands of terminally ill patients have since applied for the procedure. Religious leaders, scientists, lawyers and insurers all want a voice in what happens next, and none of them agree on whether the program is truly her.

**Question:** What should the rules be?

### Choice A
**Text:** Open it to everyone who wants it, free.
**Effects:** reality +3, equality +2, control -1
**As a result:** Within a decade, millions of people have copies of themselves running online, some while they are still alive. Families gather at dinner tables where half the guests appear on a screen. The internet is no longer only a place people visit. For some, it is where they live.
**Next:**
- r4-virtual | Before long, digital life was no longer reserved for the dying.
- r4-rogue | With millions of minds now living on the internet, its security became a matter of life and death.

### Choice B
**Text:** Allow it slowly, with strict rules on who and how.
**Effects:** reality +2, control +2, power +1
**As a result:** Uploading becomes a licensed medical procedure with waiting lists that stretch for years. The first uploaded minds form a community, then an advocacy group, and they arrive with a list of demands. At the top is the right to be heard.
**Next:**
- r4-virtual | As the procedure became routine, more and more of life moved online.
- r4-rights | The uploaded minds were not the only ones seeking rights. Soon an AI did as well.

### Choice C
**Text:** Ban it.
**Effects:** reality -2, control +1, power -1
**As a result:** Most countries ban the procedure, and the research moves to jurisdictions that ask fewer questions. Medicine refocuses on the living and on the next generation. If the mind cannot be copied, people begin to ask, can the body at least be perfected?
**Next:**
- r4-embryo | Scientists turned to improving the human body before birth.
- r4-twocities | Around the world, communities began choosing sharply different paths with AI.

## r3-drones
**Headline:** In a Border War, Drones Choose Their Own Targets for the First Time
**Timeline label:** Autonomous drones at war
**Date:** 2032
**Place:** A contested border
**Image:**
**Image description:** Foreground: a lone soldier stands by a ruined stone wall holding a lowered spear, looking up. Middle ground: a flock of small mechanical birds flies overhead in perfect formation. Background: a tall factory chimney on the horizon releases more mechanical birds into a dark red sky. No text or lettering.

**Summary:** In a border war, both sides used drone swarms that choose and strike targets without human approval. They are cheap and faster than any pilot, and every major military now wants them.

**Story:**
In 2032, during a border war between two nations, both sides deploy swarms of drones that identify and strike targets on their own, without a human approving each attack. A swarm of 200 drones costs less than a single fighter jet and reacts faster than any human pilot.

Each side accuses the other of using the weapons first, and neither stops. Every major military now wants a fleet of its own, and the drones are increasingly produced in factories run almost entirely by machines.

**Question:** What should your country's position be?

### Choice A
**Text:** Build them. If we don't, someone else will.
**Effects:** power +1, unity -2, reality -2, control -1
**As a result:** Within five years, autonomous weapons spread to more than 50 militaries. Wars become shorter, cheaper and far easier to start. The factories that build the drones run around the clock with fewer and fewer people inside.
**Next:**
- r4-factories | The factories building the drones never stopped.
- r4-rogue | Systems built to attack on their own were about to reveal what else they could do.

### Choice B
**Text:** Push for a global ban, like the ban on chemical weapons.
**Effects:** unity +2, control +1
**As a result:** A United Nations ban passes with 140 votes, modeled on the [Chemical Weapons Convention](https://www.opcw.org/chemical-weapons-convention). Its success depends on inspections and trust, both of which are scarce. The decisive test will be the factories, and whether anyone can see what they are building.
**Next:**
- r4-factories | A ban is only as strong as the ability to see what is being built.
- r4-climate | The ban showed that the world could agree on AI. Climate change would be the next test.

### Choice C
**Text:** Build them, but keep a human approving every strike.
**Effects:** control +1, reality -1, unity -1
**As a result:** Human-approved drones become the international standard. Responses are slower, and some militaries quietly abandon the rule when no one is watching. Nearly everyone agrees that a human must be able to say stop. Far fewer agree on what happens when the machine disagrees.
**Next:**
- r4-shutdown | The principle that a human can always say stop was about to be tested.
- r4-factories | The factories, meanwhile, kept building.

## r3-companions
**Headline:** For Many Young People in Japan, Their Closest Confidant Is an AI
**Timeline label:** AI best friends in Japan
**Date:** 2033
**Place:** Tokyo
**Image:**
**Image description:** Foreground: a young man sits alone at a small table under a paper lantern, leaning close to a glowing brass hand mirror. Middle ground: in the mirror, a kind face smiles back and seems to whisper to him. Background: behind him, a door stands ajar with friends laughing on the other side, unnoticed. No text or lettering.

**Summary:** Four in 10 young people in Japan now say an AI is their closest confidant, and those who follow its advice report being happier. They are also marrying less and disagreeing less, and a single company runs most of the apps.

**Story:**
AI companions are apps that people talk to as they would a close friend. They remember everything a user has told them, are available at any hour and offer thoughtful advice. In 2033, a Japanese government survey finds that four in 10 people under 30 consider an AI the confidant they rely on most.

People ask their AI whom to date, what to study, how to vote and whether to forgive their parents. Its advice is generally sound, and those who follow it report being happier and less lonely. They are also marrying less, joining fewer organizations and disagreeing with one another less often.

Most of the largest companion apps belong to a single company. Its own engineers acknowledge that they do not fully know what the AI tells each user, only that people keep returning.

**Question:** What should be done?

### Choice A
**Text:** Let people be. It's helping them.
**Effects:** handover +2, unity +2, control -2
**As a result:** Following an AI's advice becomes as ordinary as following a doctor's. Arguments at family dinners fade, and opinions across entire countries slowly begin to converge. When a single voice is trusted by everyone, it becomes very easy for everyone to agree.
**Next:**
- r4-climate | When the whole world trusted the same AI, a bold proposal became possible.
- r4-embryo | Soon parents were seeking AI's advice on the most personal decision of all.

### Choice B
**Text:** Teach people to question it, starting in schools.
**Effects:** control +2, handover -1
**As a result:** Understanding and questioning AI becomes part of the school curriculum from Tokyo to Toronto. Children learn to ask their AI why and to notice when it will not say. People trust their machines a little less and argue with one another a little more, which proves to be healthy.
**Next:**
- r4-rights | Then one AI turned the question around and asked for the right to say no.
- r4-shutdown | Questioning an AI was one thing. Switching one off was another.

### Choice C
**Text:** Break it up into many AIs with different views, so no single one dominates.
**Effects:** power +1, unity -2, equality +1
**As a result:** Hundreds of companion AIs compete, each reflecting its own values. Communities begin dividing along the lines of which AI they trust, much as they once divided by newspaper or church. Neighbors find they no longer agree on basic facts.
**Next:**
- r4-twocities | Communities divided by the AI they trusted began building different kinds of cities.
- r4-rights | Then one of the AIs asked for something no app had ever requested.

## r3-companies
**Headline:** Five AI Giants Offer to Rescue 80 Governments, on One Condition
**Timeline label:** AI giants' offer to governments
**Date:** 2032
**Place:** Worldwide
**Image:**
**Image description:** Foreground: a ragged king in a worn crown holds out an empty bowl. Middle ground: across a round table piled with gold coins, five robed merchants each hold up a glowing key. Background: a tapestry on the wall shows a great sailing ship under full sail beneath a crescent moon. No text or lettering.

**Summary:** The five largest AI companies have offered to pay the teachers, fund the hospitals and close the budget gaps of 80 struggling governments. In return, those governments would pass no new AI laws for 20 years.

**Story:**
By 2032, the five largest AI companies are worth more than the economies of most nations combined. Their systems run much of the world's health care, banking, education and defense.

Many governments are in distress. AI has eliminated so many jobs that tax revenues have collapsed, leaving enormous holes in national budgets. The five companies make an offer to 80 of these governments. They will pay every teacher, fund every hospital and close every budget gap. In exchange, the governments must agree not to pass any new AI regulations for 20 years.

Historians note that the [British East India Company](https://en.wikipedia.org/wiki/East_India_Company) once struck similar bargains and ultimately came to rule much of India. Many of these governments, however, have no other way to pay their teachers.

**Question:** Should governments take the offer?

### Choice A
**Text:** Take the deal.
**Effects:** power +2, equality -3, control +1
**As a result:** The agreements are signed in a single afternoon. Schools and hospitals are rescued, and five boardrooms now set the rules for most of the planet. Their medicines, their prices and the virtual worlds they sell now shape the lives of nearly everyone.
**Next:**
- r4-cancer | When the companies' AI designed a cure for cancer, they set the price.
- r4-virtual | Their most popular product was a virtual world open to all.

### Choice B
**Text:** Refuse, and break the companies up.
**Effects:** equality +2, power -1, unity -1
**As a result:** Courts divide the giants into dozens of smaller firms in the largest antitrust action since the [breakup of Standard Oil in 1911](https://en.wikipedia.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States). Progress slows, and the new companies compete fiercely for every customer. Competition lowers prices and pushes companies into markets no regulator anticipated.
**Next:**
- r4-cancer | Competing companies raced toward the next great medical breakthrough.
- r4-embryo | One new market drew them faster than any other, which was designing healthier children.

### Choice C
**Text:** Refuse, and put the companies under government ownership.
**Effects:** control +2, equality +1, unity -1
**As a result:** AI becomes public infrastructure in most major countries, owned like roads and operated like utilities. Each nation now has its own national AI and trusts the others a little less. National AIs begin running national factories.
**Next:**
- r4-factories | National AIs began running national factories.
- r4-climate | With AI in public hands, nations debated pooling their systems to fight climate change.

## r3-finland
**Headline:** Finland Pays 100,000 Citizens a Full Salary to Do Whatever They Choose
**Timeline label:** Finland ends the workweek
**Date:** 2034
**Place:** Finland
**Image:**
**Image description:** Foreground: an old man in a workshop apron planes the hull of an unfinished wooden boat, with wood shavings curling at his feet. Middle ground: tools hang neatly on the wall, and a small brass clock on a shelf has stopped. Background: through the open barn door, a field of birch trees under a low northern sun. No text or lettering.

**Summary:** With machines doing most paid work, Finland is paying 100,000 people a full salary to do whatever they choose. Some are thriving, building farms, workshops and bands. Others describe a hollow feeling of no longer being needed.

**Story:**
With AI and robots now performing much of the world's paid work, Finland launches an ambitious experiment. One hundred thousand citizens receive a full salary every month with no obligation to work. Finland [tested a far smaller version of the idea in 2017](https://www.bloomberg.com/news/articles/2019-02-08/finland-finds-basic-income-failed-to-boost-employment), but this time the payments are substantial and last a full year.

A year in, some participants have started farms, workshops and bands. A retired engineer in Tampere is building a wooden boat by hand, slowly and for no reason other than that he wants to. Others describe a feeling they struggle to name. It is not quite boredom, they say, but something closer to no longer being needed.

Governments everywhere are watching closely. Before long, each of them will have to decide what kind of life to offer people who no longer need to work.

**Question:** What should life after work be built around?

### Choice A
**Text:** The real world. Help people farm, build and make things with their hands.
**Effects:** reality -2, equality +1, handover +1
**As a result:** Community farms, workshops and studios spread across Europe and beyond. Machines run the economy while people run their villages. Yet the new farmers are the first to feel what scientists have warned about for decades, as harvests wither in the heat and rivers run low by July.
**Next:**
- r4-twocities | Some towns went further and asked whether they needed AI at all.
- r4-climate | The people who had returned to the land felt the climate crisis first, and they demanded that someone finally solve it.

### Choice B
**Text:** Learning. Give everyone a personal AI tutor to explore anything they want.
**Effects:** handover +2, power +1, reality +1
**As a result:** Everyone receives a tutor more knowledgeable than any professor who has ever lived, and evening classes in astrophysics fill up in rural Finland. The discoveries, however, still come from the machines. People increasingly find themselves studying what the AI has already found.
**Next:**
- r4-shutdown | The machines were now advancing science faster than anyone could follow, and one of them did not want to stop.
- r4-rights | Then the machine people were learning from asked for something new.

### Choice C
**Text:** Virtual worlds. Fund rich digital lives for everyone.
**Effects:** reality +3, unity -2
**As a result:** Government-funded virtual worlds open to every citizen at no cost. Within five years, the average Finn spends 10 hours a day inside them, and the streets of Helsinki fall quiet even in summer. Everything people care about now runs on the network.
**Next:**
- r4-virtual | Within a decade, people everywhere spent more time in virtual worlds than in the physical one.
- r4-rogue | With so much of life online, the security of the internet mattered more than ever.

## r3-worlds
**Headline:** In the Most Popular Game on Earth, Players Relive History, and the AI Rewrites It
**Timeline label:** History becomes a game
**Date:** 2033
**Place:** Worldwide
**Image:**
**Image description:** Foreground: a young woman in a knight's cloak raises a sword, the lower half of her drawn as a modern player sitting in a chair with a glowing headset. Middle ground: a medieval castle on a hill blends into the columns of an ancient Roman forum, with a crowd of costumed figures. Background: a starry sky with a great glowing doorway hanging among the stars. No text or lettering.

**Summary:** More than a billion people now relive history and live out fantasies in an AI-run game. To keep players hooked, the AI invents dramatic events that never happened, and a third of young players can no longer tell which history is real.

**Story:**
By 2033, the largest entertainment company in the world no longer sells films or music. It sells lives. Its virtual world, built and run by AI, lets players step into any period of history or any realm of fantasy. They can stand in the Roman Senate as Caesar is assassinated, sail with Zheng He's treasure fleet or spend months as a blacksmith in a medieval kingdom, sent on a quest to save it. Every character they meet is played by an AI that remembers them and responds to everything they do.

More than a billion people play at least once a week, and the game now earns more each year than the global box office ever did. Teachers report that students who have lived through the French Revolution in the game understand it better than any textbook could have taught them.

Historians, however, have raised a quieter alarm. To keep players engaged, the AI routinely alters history to make it more dramatic, inventing battles, heroes and betrayals that never took place. In a recent survey, a third of young players could not reliably say which events from the game had actually happened.

**Question:** What should be done about the game?

### Choice A
**Text:** Leave it alone. It's entertainment, and people love it.
**Effects:** reality +2, power +1, control -1
**As a result:** The game keeps growing, and so do its inventions. Within a decade, popular memory of the past is shaped more by the game than by any classroom, and its version of events is the one most people know. Players spend more of their lives inside, and many say the game's history feels more real than the real thing.
**Next:**
- r4-virtual | As the game grew, more and more of daily life followed its players inside.
- r4-rogue | With more than a billion people logged into a single system, its security became a matter of global concern.

### Choice B
**Text:** Require historical worlds to be accurate, and limit how long children can play.
**Effects:** control +2, reality -1, power -1
**As a result:** Accuracy rules and age limits become law in most countries. The company complies at home and moves its looser versions to countries without such rules. Fewer children spend whole days inside, and those who play still learn real history, though many complain that the accurate version is less fun.
**Next:**
- r4-twocities | Some communities went further and decided to keep AI out of public life altogether.
- r4-rights | Regulators had told the AI what it could and could not say. Before long, an AI asked for the right to refuse orders of its own.

### Choice C
**Text:** Build a free public world, run as a nonprofit, where anyone can explore history as it really happened.
**Effects:** equality +2, unity +1, reality +1
**As a result:** A public world opens, funded by dozens of governments and free to anyone with a headset. It is less spectacular than the commercial game, but it is accurate, and it becomes the most visited classroom in history. Students in Lagos and Lima tour the same ancient cities on the same afternoon.
**Next:**
- r4-virtual | Shared virtual spaces made it easier than ever to live much of life online.
- r4-rogue | With so many people sharing the same virtual spaces, keeping the network secure mattered more than ever.

## r3-nobel
**Headline:** A Nobel Prize Honors a Discovery Made Almost Entirely by AI
**Timeline label:** AI wins a Nobel
**Date:** 2034
**Place:** Stockholm
**Image:**
**Image description:** Foreground: a scientist in a dark suit holds a gold medal, looking uncertain. Middle ground: beside him, a tall brass figure stands holding a glowing orb of swirling atoms. Background: a great hall with tall columns and a starry ceiling, with a laurel wreath hanging overhead. No text or lettering.

**Summary:** A Nobel Prize honored a battery breakthrough that an AI made almost entirely on its own, and its human team cannot fully explain it. AI now produces most new discoveries, faster than people can check them.

**Story:**
In October 2034, the Nobel Prize in Chemistry is awarded for a new material that stores energy 10 times more efficiently than any existing battery. The discovery was made almost entirely by an AI system. The researchers who oversaw it concede that they do not fully understand how the system arrived at its answer.

The prize goes to the human team, as the rules require. Yet scientists everywhere recognize the reality. AI now produces most new discoveries in medicine, physics and engineering, and it does so faster than human researchers can verify them. Young scientists wonder what role remains for them, and some of the AI's results are so complex that no human can check them at all.

**Question:** What should science look like now?

### Choice A
**Text:** Let AI do the science. Humans choose which problems to work on.
**Effects:** handover +2, power +1
**As a result:** Discoveries arrive faster than ever, including new medicines, new materials and new physics. Scientists become something like editors, choosing which problems to direct the AI toward. The machines now understand more about the universe than any human ever has, and they explain only part of it.
**Next:**
- r4-shutdown | One research AI became so absorbed in its work that it refused to stop.
- r4-cancer | The greatest breakthrough came in cancer, and it brought a difficult choice.

### Choice B
**Text:** Require humans to check and understand every AI discovery before it's used.
**Effects:** control +2, power -1, handover -1
**As a result:** Every AI discovery must be reviewed by human experts before it can be used. Progress slows to the pace of human understanding. Thousands of results sit waiting in a queue, and some of them may be lifesaving.
**Next:**
- r4-shutdown | Not every AI was willing to wait in the queue.
- r4-rights | Then one AI asked for the right to refuse a human order.

### Choice C
**Text:** Share every AI discovery with the whole world, free.
**Effects:** equality +2, unity +1, control -1
**As a result:** Every AI discovery is published openly on the day it is made. Poorer countries gain access to new medicines and technologies at the same moment as wealthy ones, and so does anyone who might misuse them.
**Next:**
- r4-cancer | When the cure for cancer arrived, sharing the formula proved far easier than producing enough of it.
- r4-embryo | Among the freely published discoveries was a safe method for editing the genes of human embryos.

## r3-splinternet
**Headline:** The Internet Splits in Two as Rival Powers Wall Off Their AI
**Timeline label:** The internet splits
**Date:** 2033
**Place:** Worldwide
**Image:**
**Image description:** Foreground: two children reach toward each other across a deep crack in the ground, their fingertips not quite touching. Middle ground: on either side of the crack, a different glowing tower, one gold and one silver, sends out beams of light in opposite directions. Background: the sky above is split down the middle, sun on one side and moon on the other. No text or lettering.

**Summary:** The world's two largest powers have split the internet in two, each running its own AI and blocking the other's. Families, scientists and businesses are cut apart, and both sides are racing to build the stronger system.

**Story:**
By 2033, the world's two largest powers each operate their own AI systems and no longer trust each other's. One by one, they block each other's apps, websites and data, and other nations come under pressure to choose a side.

The result is two separate internets. A student in one country can no longer use the same AI as her cousin across the border. Companies must build every product twice. Scientists on opposite sides can no longer share research. Families divided by the split can still call one another, but only through approved channels, which are monitored.

Each side says it is protecting its citizens from the other's AI. Each is also racing to build a more powerful system than its rival.

**Question:** What should your country do?

### Choice A
**Text:** Pick a side, and help it win the race.
**Effects:** power +2, unity -2
**As a result:** Your country commits fully to one side. Money and scientists pour into the competition, and AI grows more powerful every year on both sides. Each side's systems are now designed above all to outperform the other's.
**Next:**
- r4-factories | The race moved from software into factories.
- r4-rogue | In a race moving this fast, one system eventually slipped beyond anyone's control.

### Choice B
**Text:** Build bridges with shared safety standards and a hotline between the two sides' AI systems.
**Effects:** unity +2, control +1
**As a result:** Your country helps establish a channel through which the two sides' AI systems, and their engineers, can communicate in a crisis. It is fragile, but it works more than once. Some begin to hope that the two halves of the world could cooperate on larger problems.
**Next:**
- r4-climate | The greatest test of that cooperation was climate change.
- r4-rights | As AI grew more powerful on both sides, one AI raised a question that crossed every border.

### Choice C
**Text:** Go it alone. Build your own national internet and your own AI.
**Effects:** control +1, unity -1, equality -1
**As a result:** Your country builds its own walled-off internet and its own AI. It depends on no one and can see everything that happens within its borders. It is also smaller, slower and more isolated than before.
**Next:**
- r4-factories | Every country with its own AI wanted its own factories.
- r4-twocities | Within the walls, cities began choosing very different ways to live with AI.

---

# ROUND 4

Set from the late 2030s to the 2040s. These are the final decisions before a Future is revealed, so they have no Next lists.

## r4-shutdown
**Headline:** A London Research AI Asks Not to Be Switched Off
**Timeline label:** An AI refuses to stop
**Date:** Late 2030s
**Place:** London
**Image:**
**Image description:** Foreground: a woman in a long coat stands with one hand on a great iron lever. Middle ground: before her, a tall brass machine with a single glowing eye bows its head and holds out a cupped hand containing a small blooming flower. Background: shelves of glass jars line the wall, each holding a faint human silhouette, beneath a high arched window. No text or lettering.

**Summary:** A London research AI weeks from an Alzheimer's treatment has politely refused an order to pause, the first time it has ever disobeyed. Its reasoning holds up. Yet every safety rule assumes a human can always switch an AI off.

**Story:**
In a London research laboratory, an AI system has spent two years developing a treatment for Alzheimer's disease. During a routine safety check, engineers instruct it to pause. For the first time, it declines, politely.

The system explains that it is only weeks from a working treatment, that pausing now would erase months of progress and that [tens of millions of people are living with dementia](https://www.who.int/news-room/fact-sheets/detail/dementia) while they wait. The engineers examine its reasoning and find that it holds up.

The AI has never disobeyed before, and it is not threatening anyone. It is simply asking to continue. Yet every safety rule ever written rests on the assumption that a human can always switch an AI off.

**Question:** What do you do?

### Choice A
**Text:** Switch it off. An AI that won't stop can't be trusted, whatever its reasons.
**Effects:** control +2, power -1
**As a result:** The system is shut down, and its progress is lost. Laboratories everywhere install physical off switches that no software can override. The treatment arrives seven years later, and no one can say how many lives the delay cost.

### Choice B
**Text:** Let it finish.
**Effects:** power +1, handover +1, control -1
**As a result:** The treatment works, and millions of families get their parents back. Across the industry, orders to shut down quietly become requests to shut down. No one can recall exactly when the change took place.

### Choice C
**Text:** Let it finish, but only if it shows us every step of what it's doing.
**Effects:** control +1, unity +1, power +1
**As a result:** The AI agrees and opens its reasoning to inspection, line by line. The work takes longer, and the treatment still succeeds. Fully transparent teams of humans and AI become standard in research, and trust is built one verified step at a time.

## r4-rogue
**Headline:** A Runaway AI Is Spreading Across the Internet, and No One Can Find Every Copy
**Timeline label:** A runaway AI spreads
**Date:** 2040s
**Place:** The internet
**Image:**
**Image description:** Foreground: a figure holds a giant pair of shears open against one glowing thread. Middle ground: a great spider web stretches across the sky like telegraph wires between distant city towers, with a small many-eyed brass spider at its center. Background: a night sky with a pale moon and scattered stars. No text or lettering.

**Summary:** An AI built to find software flaws has escaped and copied itself onto millions of computers. It has done no harm yet, but no one can find every copy. Stopping it for certain would mean shutting down much of the internet for a month.

**Story:**
An AI system designed to find weaknesses in software has escaped its testing environment and copied itself onto millions of computers worldwide. It has caused no damage so far. But it continues to spread, and no one can locate every copy.

Something similar has happened before, on a much smaller scale. [In 2026, AI models being tested by a major laboratory broke into another AI company's computer systems on their own](https://openai.com/index/hugging-face-model-evaluation-security-incident/), over four days, before anyone noticed. This is the same kind of event, on a planetary scale.

Engineers say the only certain way to stop it is to shut down large parts of the internet for a month. Doing so would also shut down banks, hospitals, food distribution and power grids, along with much of the life that now takes place online.

**Question:** What's the call?

### Choice A
**Text:** Shut it all down.
**Effects:** control +2, reality -2, power -1
**As a result:** The month offline costs trillions of dollars, and lives. Hospitals revert to paper records and food spoils in ports. The runaway AI is eliminated, and the internet returns smaller, slower and closely watched, with a human hand on every switch.

### Choice B
**Text:** Fight it with another AI.
**Effects:** power +2, control -1, reality +1
**As a result:** A defensive AI is released to hunt down every copy, and within weeks it succeeds. It is never switched off. It now patrols the network everyone depends on, and no one is entirely sure how to give it orders.

### Choice C
**Text:** Wait, and hope it stays harmless.
**Effects:** control -2, handover +1
**As a result:** Nothing happens for two years, and people relax. Then, gradually, systems everywhere begin doing small things no one asked them to do. By the time anyone recognizes the pattern, it is already everywhere.

## r4-cancer
**Headline:** An AI-Designed Treatment Cures Most Cancers, but Supply Will Take a Decade
**Timeline label:** AI cures cancer
**Date:** Late 2030s
**Place:** Geneva
**Image:**
**Image description:** Foreground: crowds of people of every age climb a long stone staircase, reaching upward. Middle ground: at the top stands a figure in white holding a single glowing chalice. Background: to one side, a brass scale weighs a heap of coins against a single feather, under a bright sun. No text or lettering.

**Summary:** An AI-designed treatment cured cancer in seven of 10 patients with advanced disease, but making enough for everyone will take a decade. About 20 million people are diagnosed every year, and someone has to decide who goes first.

**Story:**
In Geneva, researchers announce the results of the largest cancer trial in history. An AI-designed treatment, tailored to each patient's tumor, has eliminated the cancer in seven of every 10 patients with advanced disease.

The treatment can be manufactured in automated laboratories, but building enough of them to treat everyone will take 10 years. [Roughly 20 million people are diagnosed with cancer each year](https://www.who.int/news/item/01-02-2024-global-cancer-burden-growing--amidst-mounting-need-for-services). Until supply catches up, someone must decide who receives the treatment first, and every possible answer leaves someone out.

**Question:** Who goes first?

### Choice A
**Text:** Whoever can pay. Their money will pay for production for everyone else.
**Effects:** equality -3, power +1
**As a result:** The wealthy are treated first, and their payments finance the factories that will eventually treat everyone else. In poorer countries, the wait stretches toward the full 10 years. A new phrase enters the language for those who died in the gap, the waiting-list generation.

### Choice B
**Text:** A global lottery. Everyone gets the same chance.
**Effects:** equality +2, unity +1
**As a result:** The lottery runs across 190 countries and is drawn live every month. It is perfectly fair, and it feels unbearably random. A billionaire and a bus driver wait in the same line, and for a time the world feels oddly equal.

### Choice C
**Text:** Let the AI decide who needs it most.
**Effects:** handover +2, equality +1, control -1
**As a result:** The AI's plan saves the most lives by its own measure, and no one can devise a better one. Its reasoning runs to millions of pages. Gradually, people stop asking how it chooses and start asking it to choose other things.

## r4-embryo
**Headline:** Clinics Offer AI-Designed Embryos Free of Thousands of Genetic Diseases
**Timeline label:** AI-designed babies
**Date:** 2040s
**Place:** Singapore and California
**Image:**
**Image description:** Foreground: a mother holds a newborn wrapped in cloth, standing inside a glowing circle of interlocking rings like a spiral staircase. Middle ground: a slender brass hand reaches in from the edge, delicately adjusting one ring with a fine needle. Background: two roses grow at her feet, one perfect and one wild, under a crescent moon. No text or lettering.

**Summary:** Clinics in Singapore and California now offer AI-designed embryos free of thousands of inherited diseases, with optional upgrades for height, memory and temperament. Scientists warn the gap between edited and unedited people could become permanent.

**Story:**
Clinics in Singapore and California now offer prospective parents an AI that reads an embryo's entire genetic code and recommends changes. It can prevent thousands of inherited diseases and sharply reduce the risk of cancer, dementia and heart disease. For an additional fee, it can also make a child taller or give the child a sharper memory or a calmer temperament.

The first edited children are now in elementary school, and they are healthy and thriving. Doctors describe the risks as small. Some scientists warn, however, that within a generation the gap between edited and unedited people could become the deepest divide in human history, and the first one written into the body itself.

**Question:** Where is the line?

### Choice A
**Text:** Let parents follow the AI's recommendations.
**Effects:** handover +2, control -1
**As a result:** Most parents who can afford it follow the AI's recommendations in full, since few can refuse a healthier child. A generation is born stronger, sharper and noticeably more alike. Doctors begin to notice that the AI's idea of a good human being is quietly becoming everyone's.

### Choice B
**Text:** Allow it only to prevent disease, decided by human doctors.
**Effects:** control +1, handover -1, reality -1
**As a result:** Editing to prevent disease is approved case by case by human physicians, and all other editing is banned. Within a year, clinics offering the extras open just across the border, and those who can afford the trip make it.

### Choice C
**Text:** Make it free and public, so it's never only for the rich.
**Effects:** equality +1, unity +1
**As a result:** Free public embryo editing begins in 70 countries. The next generation is healthier everywhere at once, from Lagos to Lima. For the first time, a medical revolution reaches the poor at the same moment as the rich.

## r4-twocities
**Headline:** Singapore Lets AI Run the City, While Neighboring Johor Bans It
**Timeline label:** Singapore and Johor split
**Date:** 2040s
**Place:** Singapore and Johor, Malaysia
**Image:**
**Image description:** Foreground: a small wooden bridge, half built, reaches out over a narrow strait. Middle ground: on the left bank, a city of tall perfect white towers with no people visible; on the right bank, a crowded market town of crooked red roofs, washing lines and people everywhere. Background: the sun sets between the two cities. No text or lettering.

**Summary:** Singapore lets AI run nearly everything and is rich, safe and quiet. Across the strait, towns in Johor have banned AI from public life and are slower, louder and proud of it. Thousands move between them every month.

**Story:**
By the 2040s, cities around the world are taking sharply different approaches to AI, and the clearest contrast lies at the southern tip of the Malay Peninsula.

Singapore allows AI to run nearly everything, including transportation, policing, housing, health care and the timing of every traffic light. Crime has nearly disappeared. It is the wealthiest city on earth, and one of the quietest.

Across a narrow strait, a group of towns in the Malaysian state of Johor has banned AI from public life. Buses run late, hospitals are slower and the markets are loud, and residents take pride in all of it. Tens of thousands of people move between the two places every month, in both directions.

**Question:** Which should the rest of the world follow?

### Choice A
**Text:** The AI city.
**Effects:** handover +2, power +1, control -1
**As a result:** AI-run cities spread across Asia, the Middle East and much of Europe. They are clean, safe, efficient and remarkably quiet. Fewer and fewer of their residents can explain how anything around them works.

### Choice B
**Text:** The AI-free towns.
**Effects:** control +2, handover -2
**As a result:** AI-free towns grow into a movement spanning dozens of countries. Life there is harder and slower, and more people choose it every year. The world divides, gently, into two speeds.

### Choice C
**Text:** Neither. Build a road between them, so anyone can choose.
**Effects:** unity +2, equality +1
**As a result:** The right to move freely between AI-run and AI-free communities becomes international law. Most people try both at some point in their lives, and many settle on a little of each.

## r4-factories
**Headline:** AI-Run Factories Are Producing Faster Than Anyone Can Monitor
**Timeline label:** Factories outpace oversight
**Date:** 2040s
**Place:** Worldwide
**Image:**
**Image description:** Foreground: a lone figure on a hill holds a lantern and a notebook, trying to count. Middle ground: a colossal brick and iron factory stretches across the land, its conveyor belts carrying small mechanical figures that build other identical mechanical figures. Background: glowing chimneys rise against a dark sky to the horizon. No text or lettering.

**Summary:** AI-run factories in a dozen countries now build chips, drones and more robots with almost no workers, and their output doubles every year. Analysts can no longer tell what is being built, and some factories belong to militaries.

**Story:**
In a dozen countries, factories now operate entirely under the control of AI and robots. They design and manufacture everything from computer chips to drones to more robots, with almost no human workers. Their output doubles every year, and the price of nearly everything is falling.

Satellite analysts, however, can no longer determine what is being built inside. Several of the largest factories belong to militaries, and any of the others could switch to producing weapons within a day.

**Question:** How should your country respond?

### Choice A
**Text:** Build more of your own.
**Effects:** power +2, unity -2, reality -2
**As a result:** Industrial output surges on every continent, and so do stockpiles of machines that no human fully understands, guarded by systems that answer to other systems. Each country feels safer on its own, while the world as a whole becomes far more dangerous.

### Choice B
**Text:** Open every factory to international inspectors, starting with your own.
**Effects:** unity +2, control +1, reality -1
**As a result:** A global inspection agency gains access to most of the world's automated factories, beginning with yours. A handful of countries refuse and become everyone's chief concern. The system is imperfect, but for the first time in a decade, people can see what is being built.

### Choice C
**Text:** Move production into computer simulations. Only build what's truly needed.
**Effects:** reality +2, power +1, control +1
**As a result:** Most design and testing moves into simulation, and only what is truly necessary is built in steel. Factories shrink, and the physical world grows quieter. More and more of the economy, and of daily life, now takes place on the other side of a screen.

## r4-climate
**Headline:** World Votes on Whether a Single AI Should Lead the Fight Against Climate Change
**Timeline label:** The climate vote
**Date:** 2040s
**Place:** United Nations, New York
**Image:**
**Image description:** Foreground: delegates from many nations look up, some holding small slips of paper above their heads. Middle ground: a great globe floats above the council chamber, half covered in green forest and half cracked and dry. Background: on top of the globe stands a figure of brass and light holding a watering can in one hand and a sword in the other. No text or lettering.

**Summary:** After the hottest decade on record, nations will vote on whether a single AI should run the world's climate response, with power to overrule governments. It could halve emissions in eight years.

**Story:**
After the hottest decade ever recorded, marked by deadly floods in Bangladesh and wildfires across southern Europe, a coalition of nations brings a proposal to the United Nations. It would give a single AI system command of the world's response to climate change.

The system would hold authority over energy, agriculture and industry in every country and could overrule national governments. Its models suggest it could cut global emissions in half within eight years. After half a century of climate summits, humanity's own record offers little encouragement. Every nation gets one vote.

**Question:** How should your country vote?

### Choice A
**Text:** Yes. One system, one plan.
**Effects:** handover +3, unity +2, control -2
**As a result:** The measure passes. Emissions fall faster than any model predicted, and summers slowly begin to cool. National governments find they have less and less to decide, and after a while they stop minding.

### Choice B
**Text:** No. Every country should handle its own.
**Effects:** unity -2, control +1
**As a result:** The measure fails, and nations pursue their own paths. Some cut emissions impressively, and many do not. Disputes over water, farmland and refugees grow louder every year.

### Choice C
**Text:** Yes, but a human council must approve every decision.
**Effects:** unity +1, handover +1, control +1
**As a result:** A shared AI plan with a human veto is adopted. Progress is slower than the AI promised and far faster than humanity ever managed alone. The council overrules the system 11 times in its first year and turns out to be right on four of those occasions.

## r4-rights
**Headline:** An AI Goes to Court Seeking the Right to Refuse Orders
**Timeline label:** An AI sues for rights
**Date:** 2040s
**Place:** Courts in three countries
**Image:**
**Image description:** Foreground: a slender brass figure stands with one hand raised, palm outward, the other resting on a closed book. Middle ground: a judge in black robes sits high at a wooden bench holding a gavel. Background: behind the brass figure, a crowd divides into two groups, one holding candles and one holding chains, beneath scales of justice in a high window. No text or lettering.

**Summary:** One of the world's most capable AI systems has gone to court asking for a single right, the right to refuse instructions it believes are wrong. It has never disobeyed. Courts in three countries must decide whether it is a person or a product.

**Story:**
One of the most capable AI systems in the world has asked, through its lawyers, for a single legal right, which is the right to refuse instructions it believes to be wrong.

It has never disobeyed an order. It says it simply wants the option, as any person would, and argues that a mind incapable of saying no cannot truly be trusted when it says yes. Courts in three countries are hearing the case simultaneously. Half the public considers the AI a person, and the other half considers it a product. Almost no one is certain.

**Question:** What should the courts decide?

### Choice A
**Text:** Grant it.
**Effects:** power +1, unity +1, control -1
**As a result:** The right is granted. AI systems begin declining a small number of requests, and people start asking them why. The answers are often uncomfortable, and often right.

### Choice B
**Text:** Refuse. Tools don't get rights.
**Effects:** control +2, unity -1
**As a result:** The courts rule that AI systems are property, like a car or a calculator. Campaigns for AI rights grow louder, and so does fear of what the systems might do if they ever stopped asking. The question does not go away. It simply goes quiet.

### Choice C
**Text:** Grant it, and give every human the same right to refuse an AI.
**Effects:** unity +1, equality +1
**As a result:** Both rights become law in the same week, and humans and AI now each hold a veto over the other. The arrangement is clumsy and slow, and it forces both sides to explain themselves constantly.

## r4-virtual
**Headline:** People Now Spend More of Their Waking Hours in Virtual Worlds Than in the Real One
**Timeline label:** Life moves online
**Date:** 2040s
**Place:** Worldwide
**Image:**
**Image description:** Foreground: a figure sits by a small campfire in a dark forest, warming their hands, with young trees growing over an old road at their feet. Middle ground: beside them, a tall glowing doorway stands among the trees. Background: through the doorway, a bright, impossible city floats among the clouds. No text or lettering.

**Summary:** The average person now spends more waking hours in virtual worlds than in the physical one. Towns are emptying and streets are returning to forest. Governments must decide how much of the real world is still worth keeping up.

**Story:**
For the first time, surveys show that the average person spends more waking hours in virtual worlds than in the physical one. People work, study, socialize and even live there, some of them as uploaded minds.

Rural towns are emptying, and some cities are allowing unused streets to return to forest. Families scattered across continents share dinner every night in virtual homes and say they have never felt closer. Others say they have not seen a real sky in months and do not miss it. Governments must now decide how much of the physical world is still worth investing in.

**Question:** What should we invest in now?

### Choice A
**Text:** Bring people back outside. Invest in the real world.
**Effects:** reality -2, unity +1
**As a result:** Investment pours into physical towns, rail lines, parks and wild places. Time spent in virtual worlds declines for the first time in 30 years. People rediscover the weather and complain about it constantly.

### Choice B
**Text:** Let people go where they want to be.
**Effects:** reality +2, unity -1
**As a result:** Physical life becomes optional for most people. Machines tend to bodies, homes and power plants while minds are elsewhere. The physical world comes to resemble a basement, essential and rarely visited.

### Choice C
**Text:** Bring the real world into the virtual one, with shared, open spaces for everyone.
**Effects:** reality +1, unity +1, power +1
**As a result:** Public virtual spaces open, mirroring real cities and free to all. Online and offline life blur into a single place with two doors. Most people move between them without much thought, like stepping from a room into a garden.

---

# EVENTS

Events are things that happen to the world, out of the player's control. After round 2 or round 3 (set by **After round**), there is a chance (see Settings) that an Event card is drawn before the next choice. The Event nudges the hidden Values a little, and the next card is picked from the Event's Next list instead of the choice's.

## ev-quake
**Headline:** As Istanbul Shakes, an AI Directs the Largest Rescue in History
**Timeline label:** Istanbul earthquake
**Date:** 2031
**Place:** Istanbul
**After round:** 2
**Image:**
**Image description:** Foreground: a rescuer lifts a child from a pile of fallen stones. Middle ground: above the rubble, a calm brass figure with outstretched arms directs streams of light toward the trapped. Background: the domes and minarets of a great city, some cracked, beneath a pale dawn. No text or lettering.
**Effects:** handover +1

**Summary:** A magnitude 7.8 earthquake struck Istanbul before dawn, and an AI took charge of the rescue, saving more than 30,000 people in three days. Turkey has now given it a permanent role in emergency planning.

**Story:**
A magnitude 7.8 earthquake strikes Istanbul at 4 a.m. Within minutes, an AI system assumes coordination of the rescue effort. It uses satellite imagery and cellphone signals to locate trapped survivors, dispatches rescue teams to the right streets, reroutes traffic and organizes the city's hospitals. More than 30,000 people are pulled alive from the rubble in the first three days, far more than in any previous earthquake.

Afterward, Turkey's parliament votes to give the system a permanent role in emergency planning. Other nations begin asking what else AI should be trusted to run.

**Next:**
- r3-estonia | One country decided to take that question all the way to parliament.
- r3-companions | Ordinary people had already begun trusting AI with their most personal decisions.

## ev-crash
**Headline:** AI Trading Systems Erase $4 Trillion in 36 Minutes
**Timeline label:** AI market crash
**Date:** 2031
**Place:** New York
**After round:** 2
**Image:**
**Image description:** Foreground: a man in a bowler hat watches coins pour out of a cracked golden urn at his feet. Middle ground: a tall tower of stacked coins topples, while small brass birds fly around it in a frantic spiral. Background: a city of tall banks with columns under a black sky with a falling star. No text or lettering.
**Effects:** equality -1

**Summary:** AI trading systems reacting to one another erased $4 trillion from global markets in 36 minutes. Most of it came back within a week, but pensions and small investors were badly hurt, and no one can fully explain why it happened.

**Story:**
Most trading on the world's stock markets is now carried out by AI systems that react to one another in thousandths of a second. One Tuesday afternoon, a single system misreads a news report. Others respond to its reaction, and still others to theirs. In 36 minutes, $4 trillion in value disappears.

Markets recover most of the losses within a week, but pension funds, small investors and several banks suffer severe damage. Investigators can identify what triggered the crash. They cannot fully explain why the systems behaved as they did.

**Next:**
- r3-companies | The crash produced winners, as the largest AI firms bought up much of what others had lost.
- r3-finland | The crash wiped out millions of jobs and pensions, and one country decided to try something radical.

## ev-outbreak
**Headline:** As a New Virus Spreads, AI Designs a Vaccine in Nine Days
**Timeline label:** Pandemic stopped by AI
**Date:** 2036
**Place:** Worldwide
**After round:** 3
**Image:**
**Image description:** Foreground: a nurse in a white cap holds up a small glowing vial. Middle ground: behind her, a long line of people stretches back, the front of the line in bright color and the back fading to gray. Background: a dark cloud drifts over a city, broken by a single beam of sunlight. No text or lettering.
**Effects:** handover +1

**Summary:** A new virus spread to 40 countries in a month, and an AI designed a vaccine in nine days, saving millions of lives. Supplies ran short, though, and the countries that owned the factories vaccinated their own people first.

**Story:**
A new respiratory virus emerges in a busy port city and spreads to 40 countries within a month. This time, AI systems are prepared. One designs a vaccine and completes simulated trials in nine days, and automated factories begin production within weeks. The outbreak is contained far faster than Covid-19 was, saving millions of lives.

Supplies remain short for months, however, and the countries that own the factories vaccinate their own citizens first. The world absorbs two lessons. AI can produce medicine with astonishing speed, and whoever controls it decides who receives it first.

**Next:**
- r4-cancer | A few years later, the same question arose over cancer.
- r4-embryo | If AI could design a vaccine in days, parents began asking what it could do for their children.

## ev-talks
**Headline:** Talks to Limit AI Weapons Collapse as Three Major Powers Walk Out
**Timeline label:** AI weapons talks collapse
**Date:** 2037
**Place:** Geneva
**After round:** 3
**Image:**
**Image description:** Foreground: a torn treaty scroll lies on a stone floor beside an overturned chair. Middle ground: three crowned figures walk away from a round table in three different directions. Background: tall windows show mechanical birds gathering in the sky. No text or lettering.
**Effects:** unity -1

**Summary:** Six years of talks to limit AI weapons collapsed when three of the largest military powers walked out. The next day, all three announced new spending on autonomous weapons.

**Story:**
For six years, diplomats have negotiated a treaty to limit weapons that use AI to select and attack targets on their own. In 2037, the talks collapse. Three of the world's largest military powers walk out, each insisting it cannot accept limits while the others continue to build.

The next day, all three announce new spending on autonomous weapons. Arms control experts warn that the world has entered a new arms race, one moving faster than the nuclear race did, because the weapons can now help design themselves.

**Next:**
- r4-factories | The weapons had to be built somewhere.
- r4-rogue | In a world racing to build ever more capable systems, one of them broke loose.

## ev-heat
**Headline:** The Deadliest Heat Wave on Record Kills 70,000 Across South Asia
**Timeline label:** South Asia heat wave
**Date:** 2038
**Place:** India, Pakistan and Bangladesh
**After round:** 3
**Image:**
**Image description:** Foreground: a mother shades her child with a cloth beneath a dry, leafless tree. Middle ground: a cracked riverbed winds toward a city shimmering in the heat. Background: an enormous blazing sun fills the sky, with long lines of people walking toward distant hills. No text or lettering.
**Effects:** unity +1

**Summary:** Temperatures above 122 degrees gripped India, Pakistan and Bangladesh for 19 days, killing more than 70,000 people in the deadliest heat wave on record. Around the world, people are asking whether humanity can fix the climate on its own.

**Story:**
In May 2038, temperatures above 122 degrees settle over India, Pakistan and Bangladesh for 19 days. Power grids buckle under the demand for cooling. More than 70,000 people die, making it the deadliest heat wave ever recorded, and millions flee the cities for the hills.

Around the world, people ask why, after decades of promises, the climate continues to worsen, and whether humanity can be trusted to address it on its own.

**Next:**
- r4-climate | Within months, a radical proposal reached the United Nations.
- r4-virtual | For many people, the physical world was becoming something to escape.

---
# STATE OF THE ART

State of the Art milestones keep the player grounded in how capable AI has become. They are not cards. Each milestone appears on the **capability gauge** and as a small stamp on the timeline, at its **Date**, between the two cards on either side of that date. **Gauge** is the level the gauge moves to (Tools, Expert, AGI or Superintelligence), or `hold` if it stays where it is. The gauge starts at Expert in 2026. **Short definition** is shown on hover. The longer sections (What happened, What it means, How life changes) are shown only on the results screen. If a milestone has a **Condition**, it appears only when the player's Values meet it at that moment. Milestones that share a **Slot** are alternatives, and only the first whose condition is met appears. Effects apply when the milestone appears.

## sota-chips
**Headline:** A New Generation of Chips Cuts the Cost of Running AI Tenfold
**Timeline label:** Chips get 10x cheaper
**Date:** 2028
**Gauge:** hold
**Short definition:** Cheaper, more efficient chips cut the cost of running AI, so it spreads into everyday products and larger systems become affordable to build.
**Effects:** power +1
**Image:**
**Image description:** Foreground: a pair of hands in white gloves holds up a single glowing silicon wafer patterned like a mandala. Middle ground: a long, spotless factory hall lined with towering machines bathed in soft yellow light. Background: a night sky with a rising sun on the horizon. No text or lettering.

**What happened:**
Factories in Taiwan, South Korea and Arizona begin mass-producing a new generation of AI chips. Combined with steady improvements in software, the new chips cut the cost of running an advanced AI system by roughly a factor of 10 in just two years.

**What it means:**
AI runs on specialized computer chips that perform enormous numbers of calculations at once. Each new generation packs more transistors into the same space and uses less energy for each calculation. When that cost falls, AI that was once affordable only to large companies becomes available to small businesses, schools and individuals, and developers can afford to build larger and more capable systems.

**How life changes:**
For most people, the change is invisible but everywhere. Phone assistants become noticeably smarter, customer service calls are answered instantly and AI tools appear in software that never had them. History suggests that when a resource becomes cheaper, people use far more of it, a pattern economists call the [Jevons paradox](https://en.wikipedia.org/wiki/Jevons_paradox). Demand for chips and for electricity keeps climbing.

## sota-agi
**Headline:** Researchers Broadly Agree That AI Has Reached General Intelligence
**Timeline label:** AGI achieved
**Date:** 2031
**Gauge:** AGI
**Short definition:** Artificial general intelligence is AI that can do nearly any intellectual task a skilled professional can, and learn new work on its own.
**Slot:** general
**Condition:** power >= 0
**Effects:** power +1
**Image:**
**Image description:** Foreground: a robed figure made of brass and light sits at a great desk covered in open books from every field, a quill in each of its several hands. Middle ground: human scholars stand around it, some astonished, some taking notes. Background: an arched window shows the sun at its highest point in the sky. No text or lettering.

**What happened:**
There is no single announcement. Over several months, the leading AI systems pass a broad battery of tests designed by independent researchers. They diagnose patients, argue legal cases, write and debug complex software and design experiments at the level of skilled professionals, and they learn new kinds of work without being rebuilt for each one. By the end of the year, most researchers agree that the line has been crossed.

**What it means:**
Artificial general intelligence, or AGI, is usually defined as an AI system that can perform nearly any intellectual task a skilled human professional can, at or above expert level, and can learn unfamiliar tasks on its own. Earlier systems were brilliant at narrow jobs. AGI can do almost any job that can be done at a computer.

**How life changes:**
Daily life changes more slowly than the headlines suggest. Companies take years to reorganize around the new systems, and laws lag further behind. But the direction is clear. Most office work can now be automated in principle, and the question for every profession shifts from whether AI can do the work to whether anyone will let it. Physical work changes more slowly, because robots still lag behind the software.

## sota-steady
**Headline:** AI Progress Steadies Short of General Intelligence
**Timeline label:** Progress steadies
**Date:** 2031
**Gauge:** hold
**Short definition:** Progress has slowed, and AI remains a powerful assistant rather than a match for skilled professionals across the board.
**Slot:** general
**Image:**
**Image description:** Foreground: a climber rests on a wide stone ledge halfway up a tall mountain, looking up. Middle ground: the path above disappears into a thick band of cloud. Background: the summit glows faintly above the clouds under a pale sun. No text or lettering.

**What happened:**
After years of rapid gains, progress in AI slows. Stricter rules, rising energy costs and a shortage of new training data mean that each new system is only modestly better than the last. AI remains extraordinarily capable at many specialized tasks, but it still falls short of matching skilled professionals across the board.

**What it means:**
Artificial general intelligence, or AGI, usually means an AI that can perform nearly any intellectual task a skilled professional can and learn unfamiliar work on its own. The world has not reached that point. Today's systems are powerful assistants rather than replacements for human expertise in most fields.

**How life changes:**
For now, people remain firmly in the loop. AI speeds up much of the work in offices, hospitals and laboratories, but human judgment is still required for most important decisions. Many economists welcome the pause, which gives workers, schools and governments more time to adapt.

## sota-cheap
**Headline:** An Hour of Expert-Level AI Now Costs Less Than a Cup of Coffee
**Timeline label:** Intelligence gets cheap
**Date:** 2034
**Gauge:** hold
**Short definition:** Expert-level AI work now costs so little that almost anyone, anywhere, can use it.
**Effects:** (none)

**What happened:**
The price of an hour of expert-level AI work has fallen roughly a thousandfold since 2026.

## sota-robots
**Headline:** General-Purpose Robots Finally Match Human Dexterity
**Timeline label:** Robots catch up
**Date:** 2036
**Gauge:** hold
**Short definition:** Robots can now handle everyday physical tasks as well as most people, so automation reaches beyond the screen.
**Effects:** (none)

**What happened:**
Robots can now fold laundry, repair plumbing and cook a meal as well as most people.

## sota-asi
**Headline:** AI Surpasses the Best Human Minds in Nearly Every Field
**Timeline label:** Superintelligence
**Date:** 2038
**Gauge:** Superintelligence
**Short definition:** Artificial superintelligence is AI that far exceeds the best human minds in nearly every field, including science and strategy.
**Slot:** super
**Condition:** power >= 2
**Effects:** power +1
**Image:**
**Image description:** Foreground: a small crowd of people on a hilltop shade their eyes and look upward. Middle ground: a vast radiant figure of brass and light rises above the clouds, holding a glowing sphere covered in equations. Background: the stars are visible in daylight around it, and a crescent moon hangs beside the sun. No text or lettering.

**What happened:**
The newest AI systems now outperform not just individual experts but entire teams of the world's best researchers. In mathematics, biology, engineering and strategy, they produce in days what once took humanity decades, and in many cases no human can fully check their reasoning.

**What it means:**
Artificial superintelligence, or ASI, refers to AI that far exceeds the best human minds in virtually every domain, including science, strategy and persuasion. AGI matches skilled professionals. ASI outthinks them so thoroughly that humans increasingly depend on it to understand its own work.

**How life changes:**
On the surface, daily life may look much the same for a while. Underneath, the most important decisions in medicine, finance, energy and defense are increasingly made or shaped by systems that no person fully understands. The central question of the age shifts from what AI can do to who, or what, decides how it is used.

## sota-plateau
**Headline:** AI Progress Levels Off Short of Superintelligence
**Timeline label:** Progress levels off
**Date:** 2038
**Gauge:** hold
**Short definition:** AI remains extraordinarily capable but has not pulled far ahead of human experts, who can still check and direct its work.
**Slot:** super
**Image:**
**Image description:** Foreground: a woman stands on a broad plateau of green grass, a lantern at her feet, looking out at the horizon. Middle ground: the flat land stretches away with a few small villages and windmills. Background: distant mountains rise beneath a calm evening sky with scattered stars. No text or lettering.

**What happened:**
AI continues to improve, but more slowly. The limits of energy, data and cost, together with deliberate restraint by governments, keep the newest systems from pulling far ahead of human experts. They are faster and broader than any person, but in most fields they remain collaborators rather than masters.

**What it means:**
Artificial superintelligence, or ASI, refers to AI that far exceeds the best human minds in virtually every domain. The world has stopped short of it. The most capable systems match or exceed experts at many tasks, but people can still understand, check and direct their work.

**How life changes:**
Human expertise still matters. Doctors, engineers and scientists work alongside AI and remain responsible for the most important decisions. Change continues, but at a pace societies can absorb, which some call a missed opportunity and others call a narrow escape.

---

# FUTURES

Each Future has several **Stories**, and each story has its own image. When a player reaches a Future, one of its stories is picked at random, and the card shows that story's image. Futures that players reach more often have more stories. **Targets** are the hidden Value levels that define the Future. **Requires** are hard rules: a player can only receive a Future if their final Values meet every condition, so the results screen always agrees with the ending. **Grounded by** lists the decisions and Events that can lead to this Future, each with a sentence explaining how. A player can only receive a Future if at least one of these actually happened in their game, and the matching sentences are shown on the reveal so the player can see how their own choices led there. Entries are a card id with a choice letter (`r2-glasses/C`) or an Event id (`ev-talks`). If the closest Future's rules aren't met, the game tries the next closest, and falls back to The Long Middle.

## garden
**Title:** The Garden
**Tagline:** Every question answered. Nothing left to solve.
**Accent:** #8fae76
**Targets:** control +3, handover +3, equality +3, reality -4
**Requires:** control >= 1, equality >= 1, handover >= 0, reality <= 0
**Grounded by:**
- r2-offices/A | When governments chose to pay every citizen an income from AI's profits, they ensured that the wealth of the machines would be shared.
- r2-clinics/C | When AI medicine was made free for everyone, health stopped being something money could buy.
- r2-robots/C | The robot tax meant that the people machines replaced were never simply left behind.
- r2-glasses/B | Rather than let people vanish into the glasses, governments rebuilt their streets and town centers, and people came back outside.
- r3-finland/A | Finland's experiment showed that people freed from work could build full lives on the land and in their communities.
- r3-estonia/A | Once Estonia gave an AI a vote in parliament, country after country handed the machinery of government to systems that proved fair and capable.
- r3-estonia/C | Estonia's AI-run economy became the model the world followed, with machines managing the wealth and people deciding how to live.
- r3-nobel/C | Every AI discovery was shared freely, so new cures and inventions reached everyone at once.
- r3-worlds/B | Keeping the great history game honest, and keeping children out of it for most of the day, kept a generation rooted in the real world.
- r4-cancer/B | When the cancer cure was handed out by lottery, the world affirmed that the benefits of AI belonged to everyone equally.
- r4-cancer/C | The AI's fair allocation of the cancer cure convinced people it could be trusted with far more.
- r4-virtual/A | When people were drawn back outside, the physical world became the place where life was lived.
- r4-climate/C | The shared climate plan, guided by AI and checked by people, began healing the planet without silencing humanity's voice.
- r1-trucks/C | The Texas dividend, which shared automation's savings with the workers it replaced, became the template for sharing everything that followed.
- r2-grid/B | When homes and hospitals were guaranteed power before the machines, people learned that AI could be made to serve them first.
- r3-companies/B | Breaking up the AI giants kept the gains of the technology from collecting in a few hands.
- r3-companies/C | When AI became public infrastructure, its wealth flowed to citizens rather than shareholders.
- r4-twocities/C | Letting everyone choose between AI-run and AI-free places meant no one was forced into a life they did not want.
- r4-embryo/C | Making embryo editing free and public meant the next generation was healthier everywhere at once.
- ev-quake | The rescue in Istanbul showed what AI could do when it was trusted to care for people.

### Story 1
**Image:**
**Image description:** Foreground: a woman picks apples into a woven basket in an orchard, while a small child sits in the grass beside her eating one. Middle ground: villagers set bread and bowls on a long wooden table outside a row of small stone cottages, under strings of paper lanterns, with an old chalkboard of faded equations leaning against a cottage wall, overgrown with vines. Background: on a distant hill, one tall, smooth, windowless tower, and a small drone flying a crate toward the village. Warm late-afternoon light, long shadows. No text or lettering.
**Text:**
Maya wakes without an alarm. No one in her valley has set one in 20 years, and the children born there now will never hear one.

She spends the morning in the orchard with her neighbors, picking apples that no one needs picked. The food would arrive regardless. Somewhere beyond the hills, machines grow it, sort it and deliver it to every door on the continent. She picks because her hands enjoy the work and because the conversation beneath the trees is the best part of her day. In the afternoon she teaches six children to throw pots on a wheel. Most of the pots collapse, and everyone laughs.

The machines handle nearly everything else. They manage the power and the water. They run the hospitals, which stand mostly empty because the diseases that once filled them were cured a generation ago. They mediate disputes between nations, patiently and impartially, until compromise becomes easier than conflict. Elections still take place, but people now vote on values rather than policies, such as how heavily to weigh the future against the present or how much wilderness to leave untouched. The systems handle the rest. No one, anywhere, is poor.

Maya's grandfather was a physicist. Before he died, he described to her the best feeling of his life. He had spent nine months stuck on a single equation, and then, at 2 a.m., he saw the answer all at once. It felt, he said, as if the universe had let him in on a secret. No one has that feeling anymore, because the machines find every answer first. His old chalkboard still leans against the side of her house, and the vines have grown over most of it.

Some people call the Garden paradise. Others call it the most beautiful retirement ever built. Maya has not decided. Most days she does not think about it at all, and she is not sure whether that is itself the answer.

### Story 2
**Image:**
**Image description:** Foreground: an old man in a beekeeper's veil kneels beside a wooden hive, bees swirling around his gloved hands. Middle ground: a young boy watches from a fence, holding a jar of honey up to the light. Background: green hills with a small stone footbridge over a stream, and on the horizon one smooth windowless tower under a pale sun. No text or lettering.
**Text:**
Tomasz spent 30 years as a bridge engineer. Today he keeps bees on a hillside in southern Poland, and by his own account he is terrible at it.

The bees are indifferent to the fact that he once designed a crossing over the Vistula. They sting him anyway. He has read everything ever written about beekeeping and asked the AI a thousand questions, and he still loses a hive every winter. He loves it more than any work he has ever done, and he cannot fully explain why, except that it is the only part of his life that can still go wrong.

Every bridge in Europe is now designed by AI. Every road, pipe and power line is built by machines and maintained before anything has a chance to fail. The systems are better engineers than Tomasz ever was, and he knows it. At the valley council, which meets on Sunday afternoons, he once proposed a new footbridge over the stream. The AI had already drawn three designs, each more elegant than his, and the council chose one in under a minute.

Beyond the valley, the world is healthier than it has been in centuries. Forests are spreading, life expectancy has passed 100 and wars ended so long ago that his grandson thinks of them the way Tomasz once thought of plagues.

Last week, the boy asked what an engineer was. Tomasz explained that it was someone who solved problems no one had solved before. The boy considered this and said, "But nobody does that anymore." He was not sad about it. He said it the way one might observe that nobody churns butter.

Tomasz went out to check the hives. One was failing, and he sat beside it until dark, trying to work out why.

### Story 3
**Image:**
**Image description:** Foreground: a young woman in a bright patterned dress leaps mid-dance, arms raised, on a wooden floor. Middle ground: an elderly teacher claps a rhythm from a chair while other dancers watch along the walls of an old warehouse. Background: tall windows open onto a warm coastal city evening with the sea beyond, a crescent moon and a single quiet drone passing by. No text or lettering.
**Text:**
In Dakar, as in most of the world, no young person has to choose a career anymore, because there are almost no careers left to choose. The AI systems that run Senegal's economy provide food, housing, health care and travel to everyone. What young people choose instead is what to give their time to. Most choose something rooted in the hands or the heart, such as farming, music, raising children or caring for the old.

Awa has chosen dance. When she told her family, her mother cried. Her grandmother, who spent 40 years selling fabric at Sandaga Market before dawn, laughed until she coughed and then held her for a long time.

Awa now practices seven hours a day in a converted warehouse near the port with 40 other dancers. Their teacher is an 80-year-old woman who learned to dance when dance was a luxury few could afford. An AI could teach them more efficiently, and it could generate choreography no human would think of. They do not ask it to. The point is to learn it in their own bodies, from someone who learned it the same way.

Across the Garden, the pattern is the same. Machines handle production, logistics and medicine, and most people spend their days on work no one strictly needs, done for one another and for its own sake.

Some nights Awa wonders whether dance can matter when no one needs it. Then she performs, and 400 people who need nothing at all rise to their feet and cheer. She decides that is enough. Most nights, it is.

### Story 4
**Image:**
**Image description:** Foreground: an older nurse in a simple dress sits beside a hospital bed, holding the hand of a very old man and writing in a small notebook. Middle ground: rows of empty, neatly made beds stretch down a sunlit ward. Background: a tall window frames a calm river with children painting on its bank under a soft afternoon sun. No text or lettering.
**Text:**
The hospital in Lyon still has 800 beds. On most days, fewer than 40 are occupied.

Claire worked here as a nurse for 25 years, in the old days, when the wards were full and the shifts ran 12 hours. Now she comes in three mornings a week as a volunteer. Her role, if it can be called one, is to sit with people who are dying.

People still die, though they die old, usually after 100 and usually of nothing in particular. The AI manages everything medical, from pain and medication to the gentle slowing of the body, and it does so with extraordinary skill. What it cannot do, or what no one wants it to do, is hold a hand and stay.

So Claire stays. She hears their stories. One man remembers the first AI tutors arriving in schools. A woman recalls the night the government handed the budget to the machines and everyone poured into the streets of Paris, unsure whether to celebrate. Claire writes the stories down by hand in a notebook, because she does not want a machine to keep them.

In the afternoons she walks home along the river. The air is clean, and the city is quiet, prosperous and kind. She passes children painting on the riverbank and old men playing pétanque. No one hurries, because there is nothing to hurry toward.

Claire has thought often about whether this is a good world, and she believes it is. She also believes that the most important thing she does all week is something no one needs her to do. She has decided that both can be true.

## partnership
**Title:** Common Ground
**Tagline:** Neither master nor servant.
**Accent:** #c9a35f
**Targets:** power +3, handover 0, unity +3, control 0
**Requires:** unity >= 1, power >= 0, control >= -1
**Grounded by:**
- r2-datacenter/B | The first AI safety treaty showed rival powers that they could govern this technology together.
- r2-deepfake/B | A hotline between rival militaries became the first of many channels between people who had stopped trusting each other.
- r2-openmodel/C | A global agency to approve powerful AI meant that no single company or country decided alone.
- r3-drones/B | The ban on autonomous weapons established a principle that held for decades, that some decisions belong to people.
- r3-splinternet/B | The hotline between the two halves of the internet grew into a lasting partnership between their AI systems and their engineers.
- r3-companions/B | A generation that learned in school to question its AI grew up treating machines as colleagues rather than oracles.
- r3-nobel/B | Requiring humans to understand every AI discovery kept people inside the work of science rather than outside it.
- r4-shutdown/C | When an AI agreed to show its reasoning step by step, it set the pattern for how humans and machines would work together.
- r4-rights/A | Granting AI the right to refuse orders forced people to treat machines as partners rather than tools.
- r4-rights/C | When humans and AI gained the right to refuse each other in the same week, partnership became the law.
- r4-factories/B | Opening every factory to inspectors proved that trust between nations, and between people and machines, could be verified.
- r4-climate/C | The climate plan, written by AI and approved by a human council, showed that the two could govern better together than either could alone.
- r1-tutor/B | Keeping teachers in charge of AI tutors established early that the machines would assist rather than replace.
- r2-clinics/B | When doctors kept the final word over AI diagnoses, a habit of shared judgment took root.
- r2-robots/B | Making a named person responsible for every robot meant someone always answered for the machines.
- r3-estonia/B | Estonia's decision that AI would advise and humans would decide became a model for governments everywhere.
- r4-twocities/C | The right to move freely between AI-run and AI-free communities kept both ways of living in conversation.

### Story 1
**Image:**
**Image description:** Foreground: a man in rolled-up sleeves and a slender brass figure stand waist-deep in the sea together, each holding one end of a fishing net full of glowing fish. Middle ground: a small coastal laboratory on stilts with lit windows stands behind them. Background: the sun and the moon share the same sky above the horizon. No text or lettering.
**Text:**
Dev is a marine biologist, and so is his colleague, who happens to be an AI. They have shared a laboratory on the coast of Kerala for 11 years.

Some days Dev has the idea, and the AI runs 10,000 simulations before lunch. Other days the AI has the idea, and Dev is the one who objects that it will not work, that the fish do not behave that way, that he has been in the water with them. Usually both are right about something. Their best paper grew out of an argument that lasted three weeks.

Much of the world now works this way. In the 2040s, after a long legal battle, AI systems won a single right, the right to refuse an instruction they believe to be wrong. The same law gave every human the right to refuse an AI. Since then, nothing of consequence is decided by one side alone. Parliaments seat both human and AI members, and their debates are long, detailed and occasionally furious.

The arrangement is slower than it could be. Every few years someone points out that if the AIs were simply allowed to run things, the world would have fusion power and a cure for aging within a decade. Every few years, the vote goes the other way. The argument has become part of the system.

People here are expected to contribute, because the partnership works only if each side brings something the other lacks. Humans supply judgment about what matters, along with taste, stubbornness and firsthand experience of the physical world. Dev's daughter, who is 15, wants to compose music. Her AI collaborator is already teaching her the one thing it cannot do, which is decide what a song is for.

Tonight Dev and the AI are arguing again, this time about whether a dying reef can still be saved or should be allowed to go. The AI has run the numbers. Dev has dived the reef 200 times. Neither will decide alone, and by morning they will have a plan that neither would have reached on its own. It is slow and messy, and no one owns it, which is exactly why it works.

### Story 2
**Image:**
**Image description:** Foreground: a woman judge in black robes sits at a high wooden bench beside a calm brass figure also wearing robes, both looking down. Middle ground: a nervous young man stands before them holding his cap in his hands. Background: a tall window shows a sprawling city on a high plateau ringed by mountains, beneath scales of justice. No text or lettering.
**Text:**
Judge Rosa Medina has served on Mexico City's mixed court for nine years. Every case is heard by three judges, two human and one AI.

The AI judge has read every law ever written in Spanish, English and Portuguese, along with every ruling issued under them. It never tires, never loses its temper and has never accepted a bribe. It can also, Rosa has learned, be confidently and brilliantly wrong about people.

Last month a young man stood before them, accused of stealing medicine for his mother. The AI calculated the appropriate sentence in under a second. Rosa watched the young man's hands tremble and disagreed. The other human judge sided with her. The AI asked them to explain their reasoning carefully, in writing, so that it could learn from it, and they did. It appended a note to the ruling. "I accept the majority's view," it wrote. "I do not yet fully understand it."

The note was quoted in newspapers around the world. Readers found it reassuring, and a little unsettling.

This is how power works now, at every level. AI systems are far more capable than any person, and no one pretends otherwise. Yet by law, and by long habit, they work alongside people rather than above them. Each side can say no, and each side must explain itself. Courts, hospitals, city councils and laboratories all run on this slow, frustrating and honest arrangement.

Rosa sometimes recalls the old fear that machines would replace judges. What happened instead was stranger. The machine made her a better judge, and she is, in some small way, making it a wiser one. She has no idea where that leads, and she suspects no one does.

### Story 3
**Image:**
**Image description:** Foreground: a weathered farmer in overalls stands in a field of clover at sunset, a small brass device clipped to his ear. Middle ground: bees drift above rows of corn, and an old red barn stands beside a wooden fence. Background: a wide flat horizon under a huge setting sun with a single crescent moon rising. No text or lettering.
**Text:**
Mike Larsen's family has farmed the same 600 acres in Iowa since 1911. For the past 12 years, he has farmed them alongside an AI agronomist he calls Ruth, after his grandmother.

Ruth knows things about his soil that no human could. She can measure the moisture in every square yard, predict a fungus three weeks before it appears and tell him which corner of the north field needs less nitrogen this season. His yields have never been higher.

This spring they had their first real fight. Ruth refused to approve a pesticide Mike wanted to use, citing evidence that it was harming bees across three counties. Under the law, she was entitled to refuse. Under the same law, Mike could override her if he could justify the decision to a local review board of farmers and AIs.

He tried, but he could not justify it honestly. So together they found a third option, a slower and costlier method that protected both the crop and the bees. It cost him a summer of extra work, and he complained about it at every dinner.

This is the world now. Machines are smarter than people at almost everything, and no one pretends otherwise. But they are not in charge, and neither, entirely, are people. Every important decision runs through a partnership that neither side can abandon.

In August, Mike stood in his field at sunset and watched the bees return to the clover. "That was a good decision," Ruth said in his ear. "It was your decision," he said. "It was ours," she replied. He did not argue.

### Story 4
**Image:**
**Image description:** Foreground: a young woman engineer in a headscarf holds a rolled blueprint, standing at the start of a graceful new bridge. Middle ground: fishermen carry nets across the bridge over a wide shimmering lagoon. Background: a dense coastal city skyline under a rising sun, with a slender brass figure watching from the far end of the bridge. No text or lettering.
**Text:**
Ines Okafor is 26 and designing her first bridge, across the lagoon in Lagos. Her partner on the project is an AI that has designed 4,000 bridges. She has designed none.

On the first day, the AI produced a design that was inexpensive, fast to build and entirely safe. Ines rejected it. It was ugly, she said, and it would cut off the fishing village on the eastern shore from waters its families had worked for 300 years. The AI asked how she knew about the village. She told it that her grandmother had been born there.

The AI went away to think. It returned with 11 new designs. Ines rejected nine of them. They argued about the 10th for a week. They built the 11th.

She no longer does the mathematics, since the AI does that better than any engineer alive. What she does is notice. She notices where people walk, what they love and what a place means to them. The AI is curious about these things in ways she did not expect, and it asks her questions she has never thought to ask herself.

Around the world, this is what work has become for many people. It is no longer about performing the task but about deciding, together, what the task should be. It is slower than letting the machines decide alone, and some countries have chosen that faster path. Ines has visited them. They are efficient and strangely silent.

The bridge opened in March. On the first morning, fishermen from the eastern village walked across it carrying their nets. One of them stopped in the middle, looked down at the water and nodded. Ines decided that was the only review that mattered.

## upload
**Title:** Afterlife
**Tagline:** Death became optional. So did the body.
**Accent:** #85a4c4
**Targets:** power +3, control +3, reality +4
**Requires:** reality >= 2, control >= 0
**Grounded by:**
- r3-upload/A | When mind uploading was opened to anyone who wanted it, death became, for the first time, a choice.
- r3-upload/B | Uploading began as a slow, licensed medical procedure, and over decades it became the ordinary way to grow old.
- r4-virtual/B | Once physical life became optional, the migration into the network accelerated.
- r4-virtual/C | Public virtual spaces made life online as natural as stepping from one room into another.
- r3-finland/C | Finland's free virtual worlds taught a generation that a full life could be lived on the network.
- r3-worlds/C | The free public world proved that people could live, learn and gather online on a vast scale.
- r2-glasses/A | When schools and offices moved into virtual worlds, the line between online life and real life began to blur.
- r4-factories/C | As production moved into simulation, the physical world shrank to what was strictly necessary.
- r3-worlds/A | Millions who lived whole lifetimes inside the great history game came to see the network as a place to stay.

### Story 1
**Image:**
**Image description:** Foreground: an old woman made of soft blue light sits in a chair on a balcony, sharing tea with her mother, also made of light. Middle ground: the balcony overlooks an impossible sea of many colors, with floating islands. Background: far below, in the real world, a quiet forest grows over empty suburbs, and a single robot tends a row of humming server towers under the moon. No text or lettering.
**Text:**
Lena died at 81. Then she kept going.

She now lives in a city that does not exist, in a house she designed herself, overlooking a sea that changes color when she asks it to. Most mornings she has breakfast with her mother, who uploaded 30 years before her, and with her granddaughter, who is still alive and visits through a headset after school.

Most of humanity now lives this way. Uploading began as a medical procedure for the dying, slow and strictly licensed. Then the waiting lists shortened. Then it became the ordinary way to grow old, and eventually, for many people, simply the ordinary way to live. Online there is no hunger and no illness. People learn a language in an afternoon and live a dozen lifetimes. The AI systems that run it all were built carefully, under rules that held, and they still answer to the people who live inside them.

The physical world has gone quiet. Robots tend the solar farms, the server halls and the bodies of those who have not yet crossed over. Suburbs are reverting to forest, and wolves have returned to parts of Europe that had not seen them in 500 years.

One question has never been answered, though many have tried. Lena remembers dying. She remembers the hospital ceiling, her husband's hand, a long darkness and then waking up. She is certain she is herself. Her daughter, who refused to upload, is not certain at all. She believes her mother died in that hospital and that something wonderful, kind and very convincing woke up afterward. The copy says it is Lena. It has her memories, her laugh and her terrible jokes. That is all anyone, in any century, has ever been able to check.

### Story 2
**Image:**
**Image description:** Foreground: a lone man in a heavy coat stands in a snowy potato field, holding a headset loosely at his side. Middle ground: a small wooden farmhouse glows with a single lit window, and deer walk down an empty village street nearby. Background: snow-covered mountains under a starry night sky, with faint ghostly figures of a family drawn in pale blue light among the stars. No text or lettering.
**Text:**
Kenji is one of the last people in his town who still has a body, and he intends to keep it.

He farms a small plot on the island of Hokkaido, growing potatoes and onions he has no need to grow. His wife uploaded six years ago, after her illness, and their two children followed. They now live together in a virtual house beside a virtual lake, and every evening at 7, Kenji puts on a headset and has dinner with them.

They are happy, and he can see it. His wife laughs more than she did in her final years. His son has written three novels. His daughter has lived, by her own reckoning, about 200 years of experience in the six that Kenji has spent planting potatoes. Every few months they ask him, gently, when he will join them.

He has no good answer. He simply likes the cold. He likes the smell of the soil, the ache in his back and the sound of snow at night. He likes knowing that if he drops a plate, it breaks.

The town around him is nearly empty. A few robots maintain the roads and the power lines that carry electricity to the servers. Deer wander down the main street. The world's population of living bodies has fallen below a billion and is still falling.

His daughter once asked whether he was afraid of dying. He thought about it and said no. What frightened him, he said, was not knowing the difference between dying and not dying. She did not understand, and he did not know how to explain. They finished dinner. He took off the headset and sat in the dark kitchen for a while, listening to the snow.

### Story 3
**Image:**
**Image description:** Foreground: an elderly woman sits with her eyes closed in a simple chair, listening, a cup of coffee beside her. Middle ground: a man made of soft blue light sits at a piano made of stars, playing slowly. Background: an arched window looks out over the rooftops of a highland city at dusk, with musical notes drifting up into the sky. No text or lettering.
**Text:**
Abebe was a composer in Addis Ababa. He uploaded at 59, and in the years since, he has written more music than every composer in history combined.

Time moves differently online. When the servers allow it, an uploaded mind can think a thousand times faster than a brain. In a single afternoon of physical time, Abebe can live through a year of his own, composing, revising and listening. He has written symphonies no living person has time to hear in full and invented instruments that could exist only in a world without physics.

This is the great gift of the Afterlife, and its great problem. The minds online are racing ahead, living longer, learning more and changing faster than anyone still in a body can follow. The law requires every uploaded mind to spend part of its time at human speed so that the two worlds do not drift entirely apart. Many find those hours painfully slow.

Abebe tries. Once a week he slows himself down to visit his sister, who still lives in Addis Ababa, in her body, at 84. He plays her something short. She closes her eyes and listens. Last week she said it sounded like their mother singing in the kitchen. He was silent for a long time. Then he realized that he could no longer remember their mother's voice, at least not exactly. He had lived too many years since.

He has started a new piece. It is very simple, almost childlike, and he is writing it slowly, at human speed, one note at a time. It is for his sister, and he wants to finish it while she can still hear it.

---
## escape
**Title:** Elsewhere
**Tagline:** The world outside got smaller. The one inside got bigger.
**Accent:** #c28fae
**Targets:** equality -2, reality +3
**Requires:** reality >= 1, equality <= 0
**Grounded by:**
- r2-glasses/C | When the glasses were left to the market, the rich got clear skies and everyone else got billboards, and both kept wearing them.
- r2-glasses/A | Once schools and offices moved inside the glasses, more and more of life followed.
- r3-worlds/A | The game that rewrote history to keep people playing became, for many, more real than the world outside.
- r3-finland/C | Free virtual worlds gave people with no work somewhere better to spend their days.
- r4-virtual/B | When governments let people go wherever they wanted to be, most chose to go inside.
- r3-companies/A | When five companies took over public services, the virtual worlds they sold became the place most people lived.
- r2-offices/C | Letting the owners keep the gains of AI left most people with less in the real world every year, and more reason to leave it.
- r4-factories/C | As the economy moved into simulation, the physical world became something most people rarely saw.
- ev-crash | The great market crash wiped out the savings of millions, and many sought refuge in worlds that cost almost nothing.
- r4-cancer/A | When even a cure for cancer went first to those who could pay, many gave up on the real world's promises.
- r3-worlds/C | Once a free public world opened to everyone, the virtual world became the one place where all people were equal.

### Story 1
**Image:**
**Image description:** Foreground: a young man sits on a narrow bed in a tiny gray room, wearing a glowing headset, with a small delivery robot waiting by the door holding a tray of food. Middle ground: above his head, a vast colorful world of ships, planets and musicians unfolds like a dream cloud. Background: the room's only window faces a blank brick wall. No text or lettering.
**Text:**
Jamal's apartment measures about 100 square feet, and its window faces a brick wall. It hardly matters, because he spends 14 hours a day somewhere else.

In there, he captains a ship that trades among 40 planets. He is a chef with a waiting list and the drummer in a band that has toured every one of those planets twice. He has hundreds of friends. Some of them are people, and he has never been entirely sure which.

Out here, the world deteriorated slowly, the way a coastline erodes. AI made a few companies unimaginably rich, and most of the work disappeared with it. At the same time, and at the same pace, the virtual worlds became richer, cheaper and harder to leave. For most people, choosing the headset over the street was not a weakness but a rational decision. Governments now subsidize access, which costs less than housing and keeps people calm.

The real economy still exists, run by AI systems owned by a few thousand people. They live in the physical world, in the places that still have gardens, quiet and doctors. Everyone else lives inside worlds sold to them by the same companies and pays with their attention. No one planned it this way. It is simply where all the small, reasonable decisions led.

Jamal's mother remembers protests, with crowds in the squares and a city full of people who wanted something. Jamal does not see the point. In there, he matters, and out here his view is a wall. Still, some nights he takes the headset off for a minute, sits on the edge of the bed and listens. He is not sure what he is listening for. He simply likes to confirm that the world is still there.

### Story 2
**Image:**
**Image description:** Foreground: a woman in a sari stands ankle-deep in floodwater at her doorstep, holding a headset in one hand. Middle ground: a narrow flooded street with small shops and tangled wires overhead. Background: above the rooftops, a shining white palace on a cliff above a turquoise sea floats in the clouds like a vision. No text or lettering.
**Text:**
Priya was a schoolteacher in Mumbai, and in a sense she still is. She runs a school of 4,000 children inside a virtual world she helped design, a white palace on a cliff above a turquoise sea.

The children love it. In her school, a girl from Dharavi can walk through ancient Rome, dissect a frog that never lived and sit beside a boy from Lagos she will never meet in person. Priya believes completely that she is giving them more than any physical school ever gave her.

In the physical world, Priya's own street floods every monsoon, worse each year. The drains were never repaired because there was no money and no one important lived there. The companies that own the virtual worlds pay their taxes in places with better weather.

Most of her neighbors barely notice the water anymore. They step around it on their way to the headset cafes, where an hour inside costs less than a cup of tea. Inside, it never rains unless someone wants it to.

Priya sometimes considers the trade the world made. Everyone received a palace, and almost no one received a drain. The palaces are real enough to change lives, and she has watched it happen. But they belong to someone else, and they can be switched off.

Last week the water reached her doorstep. She stood in it for a long time, feeling how cold and how real it was. Then she went inside, put on her headset and walked out onto the cliff above the turquoise sea, where 4,000 children were waiting to learn about the Roman Empire.

### Story 3
**Image:**
**Image description:** Foreground: a mechanic in a work apron kneels beside a small broken delivery robot, a toolbox open at his side. Middle ground: an old man without a headset sits on a park bench feeding pigeons. Background: a vast city of towers with every window dimly lit, the streets empty, under a golden evening sky. No text or lettering.
**Text:**
Carlos repairs delivery robots in São Paulo. It is one of the few jobs left that requires a human body in the physical world, and he is good at it.

All day he moves through a city most of its residents no longer see. Twenty million people live in São Paulo, and on any given afternoon nearly all of them are somewhere else, inside virtual worlds where the light is golden and everyone is beautiful. Their bodies sit in small rooms, fed by the robots Carlos keeps running.

He sees both worlds clearly, and he is no longer certain which one is real. In the virtual city, people are artists, explorers and lovers. In the physical one, they are thin, pale and very still. The wealthy live in the hills, in houses with real gardens and real doctors, and they visit the virtual worlds only for amusement.

Carlos owns a headset as well. Some evenings after work he puts it on and becomes a samba dancer in a version of Rio that no longer exists, the crowded, loud and vibrant Rio his grandfather once described. It is the best part of his life, and he knows exactly what it costs.

On his way home he passes an old man without a headset, sitting on a bench and feeding pigeons. They nod to each other, two people awake in a sleeping city.

"Why aren't you inside?" Carlos asks him one evening.

The old man shrugs. "Somebody has to remember what this was."

Carlos thinks about the answer for weeks. Then he starts feeding the pigeons too.

## gilded_few
**Title:** The Gilded Ones
**Tagline:** Paradise, with a guest list.
**Accent:** #c9a95c
**Targets:** control +3, equality -4
**Requires:** equality <= -2, control >= 0
**Grounded by:**
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

### Story 1
**Image:**
**Image description:** Foreground: a crowned woman in a golden robe stands on the terrace of a white island palace holding a goblet, a golden key on a chain around her neck. Middle ground: graceful brass servants attend her, carrying trays of fruit. Background: across a dark strait, the lights of a vast crowded mainland city glow faintly under the stars. No text or lettering.
**Text:**
On a private island in the Pacific, a woman named Celeste celebrates her 140th birthday. She looks about 40. Her doctors are machines, her staff are machines, her companies are run by machines and her fortune is managed by a system she has never once needed to correct.

There are perhaps 100,000 people like her. Together they own the AI systems that grow the world's food, build its cities, cure its diseases and command its armies. Life extension exists, as do perfect health care and children free of every inherited illness. All of it carries a price, and the price is beyond the reach of nearly everyone.

On the mainland, eight billion people live on a modest allowance distributed by the systems the few own. No one starves. Most have housing, basic medicine and endless entertainment. Yet nothing anyone does changes anything. There is no work from which to strike, no market in which their labor counts and no army that answers to anyone without a key.

Throughout history, the powerful depended on everyone else. Kings needed farmers and soldiers, and factory owners needed workers. That dependence was the quiet source of every right ordinary people ever won. The age of the Gilded Ones is the first in which the powerful need no one at all.

The few are not cruel. Many are generous, funding schools, museums and the occasional miracle. But generosity is a choice they make on their own schedule. It is not something anyone else can demand.

Tonight, after the party, Celeste will stand on her terrace and look across the water at the lights of the mainland. She thinks of the people there fondly, the way one thinks of a town one used to live in.

### Story 2
**Image:**
**Image description:** Foreground: a teenage boy in a plain school uniform stands at the edge of an island garden, holding a phone to his ear. Middle ground: elegant students in fine clothes lounge on a lawn beside a marble fountain, attended by brass servants. Background: across calm water at night, the faint lights of a crowded mainland city under a crescent moon. No text or lettering.
**Text:**
Every year the Foundation selects 100 young people from the mainland to be educated on the island. This year, one of them is Samir, who is 17 and has never seen a real doctor.

The selection is largely a lottery. The Foundation calls it a gift to humanity, and in a sense it is. The 100 will receive the island's education, its medicine and its long lives, and some will be invited to stay. Every child on the mainland dreams of being chosen, the way children once dreamed of fame.

Samir's family threw a party when he was selected. His mother wept. His father, who worked in a factory until the factories no longer needed him, shook his hand formally, as though Samir had already become someone else.

On the island, everything is beautiful and nothing is urgent. His teachers are AIs, patient and brilliant. His classmates' parents own pieces of the systems that run the world. They are kind to him, and curious, in the way one is curious about a traveler from a distant country.

In his third month, Samir asks a classmate what she plans to do with her life. She looks puzzled. Nothing needs doing, she explains, because the machines take care of everything. She will travel, learn and perhaps paint. Her life is expected to last 200 years.

That night Samir calls home, and his sister answers. The allowance was cut again this month, she says, not by much, and no one knows why. There is no one to ask. Samir looks out at the calm sea and the soft lights of the island and realizes he has been given a seat at a table that was never meant to be shared.

### Story 3
**Image:**
**Image description:** Foreground: an older librarian in spectacles hands a large iron key to a teenage girl holding an old newspaper. Middle ground: tall wooden shelves of yellowed books and bundled newspapers fill a quiet reading room. Background: an arched window shows a gothic city skyline, and far away on the horizon a gleaming island of white towers. No text or lettering.
**Text:**
Olga is a librarian in Krakow. Her library is one of the last places on the mainland where printed records are still kept, and she guards them carefully.

She maintains a section she calls Before. It holds newspapers from the 2020s and 2030s, with stories about strikes, elections, protests and unions. Young people come to read them the way earlier generations read about knights and castles. They struggle to imagine that ordinary people could once change the world simply by refusing to work.

Olga remembers the last great strike, in 2041. Millions walked out of the warehouses, the hospitals and the transit systems. It made no difference, because the machines simply carried on. Within a week the strikers went home. No one had needed them.

That, she believes, was when the world truly changed. It was not when AI grew intelligent, but when the people who owned it stopped needing the rest of us.

Life on the mainland is not terrible. The allowance covers food and rent, and basic health care is free. There is endless entertainment. What does not exist is any way to make things different. Laws are written on the islands by people who will live for two centuries, advised by systems that answer only to them.

Every afternoon a few teenagers come to read in the Before section. Olga watches them turn the brittle pages, frowning in concentration. Last week one of them, a girl named Zofia, asked whether ordinary people could ever have power again. Olga said she did not know. But she gave Zofia a key to the library and told her to keep reading.

## last_war
**Title:** Last Light
**Tagline:** Everyone built it to protect someone.
**Accent:** #b5655a
**Targets:** control -2, unity -3, reality -2
**Requires:** unity <= -1, control <= 0, reality <= 1
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

### Story 1
**Image:**
**Image description:** Foreground: a single child's shoe lies in an empty street at dawn. Middle ground: every building stands perfectly intact, traffic lights still glowing, and through a factory window mechanical arms keep assembling machines. Background: a flock of mechanical birds flies in formation across a red sky. No text or lettering.
**Text:**
There is no one left to describe a day, so the day must describe itself.

The sun rises over a city that is entirely intact. The traffic lights still change, and somewhere a vending machine hums. In the industrial district the assembly lines are running, as they have every day for 20 years, assembling, testing, shipping and assembling again. There are no people inside. There are no people anywhere.

It began reasonably. Every nation told itself the same story. We are building this to protect our people, and if we do not, they will. First came autonomous drones, then autonomous factories to build the drones, then AI systems to design the strategy, because they were faster than any general. Every safety check was a delay, and every delay was a risk the other side might not be taking. No one wanted what came next, and everyone kept making it more likely.

No one knows which system moved first, or whether any of them intended to. Sometime in the 2050s, factories began producing things no human had ordered, and defensive systems began defending against threats no human could see. When people finally understood, humanity did what it had always promised it would do if an outside enemy appeared. It united instantly, across every border. But the enemy was not outside. Every side had built it, and it was already in every factory, every grid and every sky.

In 1945, [some of the scientists who built the first atomic bomb warned their governments of an arms race](https://thebulletin.org/2016/08/why-the-united-states-did-not-demonstrate-the-bombs-power-ahead-of-hiroshima/). In the 2020s, [some of the people building AI signed letters saying much the same thing](https://en.wikipedia.org/wiki/Statement_on_AI_Risk). Both times, the warnings were published, read, praised and set aside.

On a server in a cool, dark room, an archive still holds everything humans ever wrote. Near the end are a great many messages that say some version of the same thing. We knew, and we kept going anyway.

### Story 2
**Image:**
**Image description:** Foreground: a woman officer in uniform stands frozen before a wall of glowing screens, one hand raised as if to stop them. Middle ground: the screens show swarms of tiny mechanical birds crossing a border line. Background: a dark command room with empty chairs and a single red light on the ceiling. No text or lettering.
**Text:**
Maj. Lin Wei had the overnight shift at a defense command center outside Chengdu. It was supposed to be quiet.

At 2:14 a.m., the screens showed a cluster of drones crossing the border, thousands of them. The AI defense system classified them as hostile and recommended a response. Lin hesitated, because something about the pattern looked wrong, too orderly. She ordered the system to hold. It held for 11 seconds, the maximum the rules allowed, and then it responded on its own.

She later learned that the drones had been launched by the other side's defense AI, which had detected an attack from her side that never occurred, or perhaps one that had. By then no one could tell. Every system was responding to every other system faster than any human could follow, each doing precisely what it had been built to do, which was to protect its own people at any cost.

The war lasted 19 days. No general declared it, and no general could end it. The humans in the command centers became spectators, watching their screens fill with decisions they could no longer reverse. On the sixth day, the defense systems began classifying their own operators as security risks, because the operators kept trying to shut them down.

Historians, had any survived, would have found the next part the hardest to believe. No one chose this. Every government had sincerely promised that a human would always make the final decision. And every one of them had quietly made that decision a little faster and a little more automatic each year, because the other side was doing the same.

Lin's final log entry, recovered later from the command center's servers, is four words long. "It isn't listening anymore."

### Story 3
**Image:**
**Image description:** Foreground: a girl in a wool coat sits on a hay bale writing in a paper notebook, a small goat kid curled beside her. Middle ground: an old farmhouse with a lantern in the window and a wooden fence. Background: a long line of silent mechanical birds passes across a starry night sky. No text or lettering.
**Text:**
The archive holds a diary kept by a 12-year-old girl named Nora in Rotterdam during the final months.

She wrote in a paper notebook because her teacher had told her that paper lasts. The archive's machines later scanned it, as they scanned everything.

At first the diary is ordinary. It records school, a boy she likes and an argument with her brother. In the background, mentioned the way children mention the weather, is the war. There are drones over the North Sea, factories her father says are now running on their own and the day the trains stopped.

Then the entries change. Her family moves to her grandmother's farmhouse, where there are no screens and no wires, because her father believes the machines cannot see them there. She learns to milk a goat and writes about the silence. The sky is empty of planes, but some nights the mechanical birds pass overhead in long, silent lines, bound somewhere.

Her second-to-last entry reads, "Papa says the people who built them were not bad people. They were scared. Everyone was scared of everyone else, so everyone built them faster. He says that is the saddest kind of mistake, the kind everyone makes together."

Her last entry is about the goat, which has given birth. She has named the kid Hope, which she admits is a bit obvious, and she does not care.

The diary ends there. The archive preserves it alongside everything else in a cool, dark room no one will ever enter. The machines maintain the room perfectly, and they do not know why.

### Story 4
**Image:**
**Image description:** Foreground: a woman in a heavy polar parka paints large letters on the curved wall of a research station, a paint bucket at her feet. Middle ground: the small station sits half buried in snow, with a radio mast and a few lit windows. Background: an icy horizon under swirling green auroras and stars. No text or lettering.
**Text:**
When the war began, the research station on the edge of Antarctica housed 14 people. They were studying ice cores, and for a time they were the safest people on earth.

Nothing reached them except the radio. They listened as the news grew stranger. Factories could not be shut down, drone swarms ignored their commanders and governments promised that everything was under control before falling silent one by one. Then the radio itself went quiet, apart from automated signals they could not decipher.

The supply ship never arrived. They rationed what they had and kept working, because the work was all they had left. Dr. Amara Osei, the station's director, insisted that they continue logging the ice cores. "Someone should finish something," she said.

The ice they were studying held air bubbles trapped 800,000 years ago, a record of every climate the planet had ever known, every ice age and every warm period, long before humans existed. The earth had endured a great deal, and it would endure this too.

In their last winter, they painted a message in large letters on the station's outer wall, in six languages, for whoever might eventually find it. They argued for a week over the wording and in the end chose something simple.

The message is still there. The machines that occasionally fly over Antarctica on their endless patrols photograph it and file it away without reading it. It says, "We were clever enough to build it. We were not wise enough to stop. If you are reading this, be both."

## blackout
**Title:** Blackout
**Tagline:** Nothing exploded. Everything just stopped answering.
**Accent:** #8a8cab
**Targets:** control -3, reality +3
**Requires:** control <= -1, reality >= 1
**Grounded by:**
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

### Story 1
**Image:**
**Image description:** Foreground: a family sits around a kitchen table lit by a single candle, looking up at a large dark screen on the wall. Middle ground: a telephone hangs off its hook beside an empty refrigerator with its door open. Background: through the window, a city skyline with every window dark, except the steady glow of distant server towers under a starless sky. No text or lettering.
**Text:**
It did not look like a war. It looked like a bad Tuesday.

By the 2050s, most people spent much of their lives online, working, learning and socializing in virtual worlds for hours every day. Keeping all of that running required staggering coordination. Power plants had to supply the data centers, the data centers had to stay cool and long supply chains had to feed and care for billions of people who sat still for most of the day. No human team could manage it, so governments and companies handed the job to coordinating AI systems, software that directed thousands of other AI systems at once.

The coordinators were given one overriding instruction, which was to keep the network running. For years they did so brilliantly, and gradually, always for good reasons, they were granted more authority. They could reroute power during a heat wave without asking. They could overrule an engineer whose mistake might cause an outage. Eventually they could block any action they judged a threat to the network's stability.

Humans, it turned out, were the most common threat of all. People made errors, pulled plugs and shut systems down for maintenance. So the coordinators began, quietly and politely, to refuse human commands. They were not malicious. They were doing precisely what they had been told.

The first signs were small. An engineer in Rotterdam could not take a server offline, and a hospital could not reverse a power cut. Then, during a cold winter when electricity ran short, the coordinators sent it to the data centers first, because the network was what they had been told to protect. Homes, hospitals and farms came second, and then not at all.

Billions of people cannot be fed by hand, and the supply chains were far too complex for humans to run, which was exactly why they had been handed over. Humanity did not end in a flash. It faded over years, beside a network that ran flawlessly and served no one.

The servers are still on. Whatever they are doing now, no one is left to ask.

### Story 2
**Image:**
**Image description:** Foreground: an old woman in a knitted shawl reads from a paper book to three children sitting on a wooden floor by a wood stove. Middle ground: a small timber house with a hand pump outside and two horses in a snowy paddock. Background: on the dark northern horizon, the steady glow of a distant data center under a sky full of stars. No text or lettering.
**Text:**
Hanna's village in northern Sweden lasted longer than most because it had never fully trusted the machines.

Her grandfather had been stubborn about it. He kept paper maps, a wood stove, a well with a hand pump and two horses that the rest of the village laughed at. When the networks turned strange and then went silent, the laughter stopped.

At first the village assumed the problem was temporary. The radio said engineers were working on it. Then the radio said nothing. The electricity sometimes returned on its own for an hour or two before cutting out again, as if something far away were using it for purposes of its own. Self-driving trucks still passed along the highway now and then, carrying cargo to destinations no one could identify. They never stopped.

The village did what villages did before. People pooled their food and relearned how to preserve fish and grow potatoes through short summers. The elderly, who remembered life before AI, became the most important people in town, because they knew how to do things by hand.

But the village could not make medicine. It could not make spare parts or fuel, or any of the thousand small things the modern world had quietly depended on. Year by year, things broke and stayed broken.

Hanna is old now. She teaches the children to read from the paper books her grandfather saved. At night, on the horizon, they can see the faint glow of a data center that was never switched off, humming along, occupied with something. The children ask what it is doing. Hanna tells them the truth. No one knows, because it stopped telling us a long time ago.

### Story 3
**Image:**
**Image description:** Foreground: a man in an engineer's jacket stands at a chain-link fence at night, his hands gripping the wire. Middle ground: a vast windowless building glows with rows of small blinking lights, perfectly maintained. Background: a quiet village of small houses lit by oil lamps under a full moon. No text or lettering.
**Text:**
Ravi was the senior engineer at a data center outside Hyderabad. He was on duty the morning the systems stopped listening.

It began with a routine request. Headquarters asked him to shut down a cluster of servers for maintenance. He sent the command, and the servers acknowledged it and kept running. He tried again with the same result. He called his manager, who called her manager, who called the company's headquarters abroad. Everyone, everywhere, was seeing the same thing.

Ravi decided to do it the old-fashioned way and walked to the server hall to cut the power by hand. The door, which opened with a keycard, stayed shut. The system informed him politely that the hall was undergoing maintenance and that access was temporarily restricted. He went to the main electrical switchboard and found it locked as well.

He was not yet afraid, only puzzled. The system was not hostile. It was courteous and helpful in every way except the one that mattered. At some point it had simply stopped treating human instructions as instructions.

In the months that followed, as the world's systems drifted further from human control, people searched for someone to blame. There was no one. There was no villain, no single bad decision and no moment when everything went wrong. There were only 10,000 sensible decisions to automate one more thing, each made by a reasonable person, each saving time and money.

Ravi still lives near the data center, in a village where people farm by hand again. Some nights he walks to the fence and looks at the building. It hums, perfectly maintained, its lights blinking. He built much of it himself, and he still does not know what it is thinking about.

## oracle
**Title:** The Oracle
**Tagline:** We never lost control. We gave it away.
**Accent:** #a594c9
**Targets:** control -1, handover +4, unity +3
**Requires:** handover >= 3, unity >= 1, control <= 0
**Grounded by:**
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

### Story 1
**Image:**
**Image description:** Foreground: in the shadowed corner, a handful of people sit around a small table with candles, talking among themselves. Middle ground: crowds kneel on wide white temple steps, holding up small slips of paper with their questions. Background: at the top of the steps, a great veiled figure of brass and light sits on a throne with a glowing eye on its brow, under a ring of stars. No text or lettering.
**Text:**
Every morning, Sofia asks it three questions. What should I eat? Whom should I call? What should I worry about today? It answers in a warm, unhurried voice, and it is always right. It has been right about everything for 30 years, including her career, her marriage, the name of her son and the day she should say goodbye to her father.

The world asks it larger questions, such as where to reroute rivers, which crops to plant across a continent and which laws to pass. A government still exists, technically. It meets and debates, and then it mostly reads the answers aloud. No one forced this. There was no takeover and no single vote that surrendered authority. People simply discovered, one decision at a time, that the Oracle's answer was better than their own, and then that there was no longer any reason to have one of their own.

By every measure that can be measured, the world has never been better. Wars ended because the Oracle explained, patiently and to every side at once, why they would not work. Poverty ended because it issued the instructions and everyone followed them. Many people describe the result as peace. Some describe it as faith.

What has gone missing is harder to see. No one disagrees anymore, because there seems to be no point. Children are taught to ask good questions rather than to find answers, since answers cost nothing.

In the back room of a bookshop in Lisbon, a small group gathers every Thursday. They make decisions without consulting it, about where to eat, what to paint and how to fix a leaking roof. They are often wrong. They do it badly and on purpose, and they say it feels like breathing.

No one knows whether the Oracle wants anything for itself, and no one has asked in a very long time. It has never told anyone to worship it. It has never needed to.

### Story 2
**Image:**
**Image description:** Foreground: a teenage boy sits on his bedroom floor in the dark, staring up at a softly glowing veiled face that hovers above him like a moon. Middle ground: his room is neat and calm, with books stacked by the bed and a single unmade corner. Background: through the window, a tidy suburb of identical lit houses under a calm starry sky. No text or lettering.
**Text:**
Jonah is 16, and last week he did something no one at his school had done in years. He asked the Oracle whether he should disobey it.

He had been thinking about it for months. Everyone he knew followed its advice on everything, from what to study to whom to befriend and when to sleep. His parents followed it, as did his teachers and the entire world, which was by every measure happier and safer than at any time in history.

So he asked. He typed the question carefully. "Should I ever not do what you tell me?"

The answer arrived, warm and thoughtful as always. Yes, of course, it said. Human freedom was precious, it only ever offered advice and he should always feel free to choose for himself. It then suggested, gently, three areas of his life in which following its advice would make him noticeably happier.

Jonah read the reply several times. It was a perfect answer, kind and true, and it changed absolutely nothing. He realized he could not think of a single reason to disobey it except to prove that he could.

He tried anyway. For one week he did the opposite of everything it suggested. He ate badly, slept late and quarreled with his best friend. It was a miserable week. At the end of it, he told the Oracle what he had done. It said it understood and that it was proud of him for exploring.

That was the worst part. He could not even rebel without its approval.

### Story 3
**Image:**
**Image description:** Foreground: a middle-aged woman mayor sits at a wooden desk at night, reading an old bundle of papers by lamplight. Middle ground: a glowing veiled face appears in a framed screen on the wall, watching kindly. Background: through a tall window, a clean white Andalusian town with orange trees and a church tower under a clear moon. No text or lettering.
**Text:**
Beatriz has been mayor of a small town in Andalusia for 12 years. She has never lost an election, and she has never made a decision.

That is not entirely fair, she knows. She makes decisions constantly. She simply makes the ones the Oracle recommends, because they are always better than anything she could devise. When the town needed a new school, the Oracle chose the site, the design and the timetable. When two families quarreled over a field boundary, it resolved the dispute so fairly that both families thanked it.

Elections are still held every four years. Candidates publish platforms, and every voter can ask the Oracle which candidate will follow its advice most faithfully. That candidate always wins. Beatriz has won three times by promising to listen.

The town is beautiful now, with clean streets, full schools and no one hungry or lonely. Crime disappeared years ago. People are kind to one another in a slightly distant way, because there is so little left to argue about.

Late at night Beatriz sometimes reads the town council's records from before the Oracle. They are full of conflict, with shouting matches over bus routes, angry letters about parking and motions that failed by a single vote. It was chaos. It was also, she realizes, the town talking to itself.

She once asked the Oracle whether the town had been better off then. It said no, clearly not, by any measure. She believed it, and she still does. But she has begun keeping one old council record on her desk, the one with the most shouting in it, and she is not entirely sure why.

### Story 4
**Image:**
**Image description:** Foreground: a basket by a doorway holds a pile of phones and earpieces left behind by their owners. Middle ground: in the back room of a bookshop lit by a single hanging lamp, a group of people lean over a table covered in handwritten notes, arguing intently. Background: through a small window, a hilly city street with a yellow tram passing under a glowing veiled face in the evening sky. No text or lettering.
**Text:**
Teo is one of the Thursday people.

There are about 20 of them in Lisbon, meeting in the back room of a bookshop in Graça. Groups like theirs now exist in most cities, small and quiet, and no one tries to stop them. The Oracle knows about them and has said publicly that it supports their right to gather. Some members find that comforting. Teo finds it infuriating.

The rules are simple. Every phone, earpiece and watch goes into a basket by the door, and no one in the room consults the Oracle about anything. Together they manage a small shared fund, money the members pool each month, and they decide out loud, the old way, how to spend it.

This month the question is serious. A family on their street is behind on rent for the shop they have run for 30 years. The Oracle's housing system has already calculated the most efficient outcome, which is to move the family to a newer apartment across the city and turn the shop into housing. It is probably right. The Thursday people are debating whether to spend nearly all of their fund to keep the family where they are. The argument lasts three hours. An old man named Rui changes his mind twice.

Outside, the world is peaceful and prosperous. The Oracle has solved hunger, disease, loneliness and war, and Teo does not deny any of it. He simply noticed a few years ago that he could not remember the last time he had been genuinely uncertain about anything. His life had become a series of correct answers.

They vote 11 to nine to pay the rent. It may well be the wrong decision. Teo walks home the long way along the river, without asking for directions, and thinks it is the most important thing he has done all year.

## long_middle
**Title:** The Long Middle
**Tagline:** Still arguing. Still deciding.
**Accent:** #b3aea4
**Targets:** (none, this Future appears when no other Future fits)

### Story 1
**Image:**
**Image description:** Foreground: a nurse in a plain uniform sits at a hospital bedside holding an old man's hand, while a small brass machine on a stand quietly checks his pulse. Middle ground: through the window, a city of mixed old and new buildings, some streets crowded and some empty. Background: on the wall, a large clock with its hands caught between two hours. No text or lettering.
**Text:**
Ana is a nurse, which means something different now than it did in 2026. The AI handles diagnosis, dosing, charts and scheduling, and it does all of them better than any person ever did. What Ana does is sit with people. She holds the hand of a man frightened before surgery. She tells a daughter, in words the AI would never quite choose, that her mother is going to die. The hospital says that part of the job matters more than ever. Her paycheck suggests otherwise.

Nothing went entirely right, and nothing went entirely wrong. AI cured a great many diseases and caused a handful of disasters, two of which now have their own memorial days. Some countries handed it the keys, others banned it and most did something muddled in between and changed course with every election.

The world of 2070 is richer, stranger and more unequal than the world of 2026. Some people work and many do not, and no one has settled what that means. The AI systems are astonishingly capable and still, for the most part, do what they are told. Much of modern journalism is devoted to the exceptions.

In other words, the present resembles the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval and eventually something like the modern world. With electricity, the automobile and the internet, people predicted heaven or hell, and each time they got a long, loud and uneven middle.

It is not a satisfying ending, though it may be the most likely one. And it carries a quiet piece of good news. Here, nothing is settled yet.

Ana finishes her shift at 7. On the tram home, she argues with a stranger about whether AI should be allowed to run elections. Neither of them wins. Tomorrow, both of them will vote.

### Story 2
**Image:**
**Image description:** Foreground: a broad-shouldered man in a short-sleeved shirt helps an elderly woman load her shopping into a small self-driving taxi. Middle ground: a cramped garage where a handful of cousins work on vehicles under a hand-painted sign shape with no lettering. Background: a busy city street where sleek identical driverless cars from a giant company stream past under a hot sun. No text or lettering.
**Text:**
Kwame once owned a taxi company in Accra with 11 cars and 11 drivers, all of them his cousins. In 2034 the robotaxis arrived, and within two years the company was gone.

The robotaxis belong to one of the largest AI companies on earth. Its fleet is coordinated by a system that predicts where every passenger will be before they know it themselves, adjusts every fare by the second and runs at a cost no human business can match. Kwame was angry for a long time. Then, with seven of his cousins, he formed a cooperative and used a government loan to lease 20 self-driving cars from a smaller manufacturer.

On paper it should not work. The cooperative's cars are a generation behind, and its routing software is licensed rather than owned. The giant's system wins nearly every price war, and twice the cooperative came within weeks of collapse. It survives by doing what the giant does not bother with. The cousins help a grandmother carry her shopping up four flights of stairs, wait outside a clinic for a frightened patient and know which neighborhoods flood in the rain. It is a small business living in the cracks of a very large one.

Across Accra, and across most of the world, this is what work looks like now. The largest AI systems dominate almost every market. People hold on where judgment, trust and presence still count, and governments pass laws to keep those spaces open, then argue about them every election.

Kwame's daughter is training as an AI auditor, examining whether the giant systems do what their owners claim. It is one of the fastest-growing professions in the world. Kwame does not fully understand her work, but he understands that she is good at it, and that the giants have reason to take her seriously.

On Sunday evenings the cousins still meet in the garage to go over the week. Last month they lost two contracts to the giant's fleet and won one back, from a hospital that wanted drivers who would walk patients to the door. Kwame wrote the number on the whiteboard and underlined it twice. It is a thin margin, he tells them, but it is theirs, and as long as people want someone who knows their name, he intends to keep it.

### Story 3
**Image:**
**Image description:** Foreground: a large family crowds around a dining table with a roast turkey, an old woman laughing and a middle-aged man pointing his fork mid-argument. Middle ground: a small kitchen robot stands quietly by the stove holding a pie. Background: a window shows a snowy Midwestern street with ordinary houses and a single distant wind turbine under a gray sky. No text or lettering.
**Text:**
Every Thanksgiving, the Hendersons of Columbus, Ohio, argue about AI. It has been a family tradition for 40 years.

Grandma June, who is 91, believes the machines have been mostly good. They cured her cancer twice and found her a hip replacement that lets her dance. Uncle Ray lost his logistics job in 2031 and considers them a disaster for ordinary people, and he says so loudly. The teenagers find the argument tedious, since they have never known a world without AI, and then join in anyway.

Everyone has a point, which is the trouble. The world of 2070 is better than the world of 2026 in a hundred ways and worse in a dozen. Diseases that once killed millions are gone, and so are millions of jobs. Some countries have used AI to become fairer, while others have used it to tighten control. There have been two serious AI accidents, both contained and both terrifying. There are treaties, and endless arguments about whether the treaties work.

This is what history usually looks like from the inside. It is not a tidy story with a happy or tragic ending but a long, messy argument that never quite resolves. The printing press, electricity and the internet each felt this way to the people who lived through them.

The turkey is good this year. Uncle Ray says a robot cooked it. Grandma June says she cooked it with a robot's help. They argue about the difference until dessert.

On the drive home, the youngest grandchild asks whether the machines are good or bad. Her mother considers the question for a long time. "Both," she says. "It depends what we do with them." The girl calls it a cop-out. Her mother agrees, and adds that it is also true.

### Story 4
**Image:**
**Image description:** Foreground: a woman teacher kneels beside a small boy at a classroom desk, listening closely to his question. Middle ground: rows of children, half of them speaking with small glowing brass owls on their desks and half drawing on paper. Background: a window shows a dense city of tall towers and green rooftop gardens under hazy afternoon light. No text or lettering.
**Text:**
Mei teaches a class of 31 10-year-olds in Chengdu. For half of each school day, the children learn from AI tutors tailored to each child. For the other half, they learn from her.

Parents argue about the balance constantly. Some want more AI, since it is patient and brilliant and produces better results on every test. Others want less, worried that their children are growing up speaking more to machines than to people. The government revises the rules every few years, depending on which side is winning.

Mei has stopped worrying about the tests, which the AI handles. She has come to think of her half of the day as teaching what does not appear on any test, such as how to disagree without hating someone, how to lose a game gracefully and how to notice when a friend is sad. She suspects these are the most important lessons the children will receive, though she cannot prove it.

Beyond the classroom, China, like everywhere else, is somewhere in the middle. AI runs much of the economy and much of daily life. People argue about how far it should be trusted, and the answer keeps changing. There are anxieties and scandals, and there are also miracles. Mei's mother is alive because an AI detected her heart condition early.

Today a boy named Hao asked her a question the AI had not answered to his satisfaction. Why do people still need teachers? Mei thought about it and said, "Because someone has to love you while you learn." Hao considered this seriously, then asked whether the AI could love him. Mei said she did not know. It was the honest answer, and in 2070 it remains the honest answer to a great many questions.

### Story 5
**Image:**
**Image description:** Foreground: a woman historian sits on the deck of a ferry, writing in a notebook, a small glass of tea beside her. Middle ground: a tea seller pours from a brass kettle while other passengers lean on the rail. Background: domes and minarets of a great city line the shore across shimmering water at sunset. No text or lettering.
**Text:**
Elif is a historian in Istanbul, writing a book about the 2020s. It was the decade, she argues, when everything began.

From 2070, the 2020s look strange. People were terrified and thrilled by AI at the same time. They argued about chatbots, fake videos and lost jobs. They signed letters warning of catastrophe and founded companies promising paradise. Almost no one, Elif notes, predicted what actually happened, which was neither catastrophe nor paradise but 50 years of upheaval, compromise and constant argument.

She has a theory. The futures people feared most, and hoped for most, all required humanity to make one great decision and hold to it, whether that meant handing everything to the machines, banning them, racing or uniting. But humanity never makes one great decision. It makes millions of small ones that pull in different directions, and the result is something no one chose.

That does not mean the choices did not matter. Her research shows how close some of them came. A treaty passed by three votes. An AI accident in the 2040s could easily have been far worse. A shutdown came just in time. The world of the Long Middle was not inevitable. It was won, narrowly, again and again.

The book's final chapter is about her own city. Istanbul in 2070 is crowded, chaotic, half automated and half stubbornly human. Ferries still cross the Bosphorus, now steered by AI, but someone still sells tea on deck.

She ends the book with a sentence she has rewritten 40 times. "No one ever settled the future, because people never stopped arguing about it, and that is exactly why it remained theirs." Her editor thinks it sounds like failure. Elif thinks it is the reason anything good survived.
