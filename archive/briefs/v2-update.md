# A Matter of Time — v2 update

Apply this update to the existing v1 build. **Where this file and `CLAUDE.md` disagree, this file wins.** When you're done, rewrite `CLAUDE.md` so it describes v2 accurately (new Intro, new data format, new selection rules, new reveal). That way future sessions don't rebuild v1 by accident.

## What v2 changes, and why

The v1 playtest showed four problems:

1. **The Intro is too long.** It needs new text and faster pacing.
2. **The Rounds feel disconnected.** Each Scenario felt random, with no thread from one to the next, and it played like a personality quiz. In v2, every Scenario is a grounded, dated dilemma written like a real news story. Each Choice has a consequence ("As a result…"), and the next Scenario follows from it.
3. **It doesn't feel like time is passing.** In v2, the player's decisions are visibly added to the Timeline, moving from 2027 into the 2040s, so the player watches AI move further into the physical world (labs, clinics, factories, cities).
4. **The endings are too short.** v2 Futures are full scenes: a day in one person's life, and what that says about the world.

Throughout: the tone should be thoughtful and thought-provoking, not gamey. Don't add titles of the form "The X" to Scenarios or UI elements (Future names are the exception; keep them as given).

## 1. Intro (replace v1 Intro entirely)

Faster than v1: about **1.8–2.5 s per line**, and the whole Intro should run **under about 45 seconds**. Skip stays in the bottom-right corner.

```
Around 70,000 years ago, something changed in the way we think.

Humans began seeing patterns no other animal could.

As a species collective, we set our mind towards innovation.

[INVENTION MONTAGE]

Innovation, discovery, growth,
it's been *our* thing.

We were simply the best at it.

But not anymore…

If innovation is our goal,
we have just succeeded in accelerating progress like never before.

But if innovation is our purpose…
[LONG PAUSE, THEN A SLOW FADE TO BLACK]

This game is an entirely hypothetical simulation. Your scenario selections lead you to a potential future world.

This game exists to demonstrate the risks and rewards associated with Artificial Intelligence, and emphasize just how lightly we must tread.

Our future is simply
A Matter of Time

[BEGIN]
```

- `*our*` is italic. "Innovation, discovery, growth," and "it's been our thing." are two lines shown together.
- "But if innovation is our purpose…" gets the longest hold of the whole Intro (about 4 s), then a slow fade with nothing after it for a beat. The unanswered question is the point.
- The final two lines appear together, with "A Matter of Time" larger, in the display font. Then a **Begin** button fades in.
- **Invention montage:** keep the accelerating flicker but make it shorter, **about 6 seconds total**. Use fewer items: Fire · The wheel · Spears · Writing · Iron · The printing press · The steam engine · Electricity · Flight · The computer · Cities · The internet. Start around 900 ms per item and accelerate to about 80 ms.

## 2. Timeline (keep v1 history, add the player's track)

The history section from v1 stays as is. The change: **the Timeline stays on screen during the game** as a thin strip across the top (or a slim rail on the side on phones), with history on the left, the Now marker, and empty future space to the right.

## 3. Round flow (replace v1)

Each Round is now three beats.

**Beat 1, the Scenario.** Shown like a news story:
- a small dateline: `{date} · {place}` (for example "2027 · Cambridge, Massachusetts")
- the `headline`, large, in the display font
- the `body`, 3–5 sentences, at a comfortable reading size (this is meant to be read, not skimmed)
- the `question`, then the 3 Choices as large cards (order shuffled)
- the image area (placeholder for now)
- small text at the top of every Round: **"Choose the answer you believe gives us the best chance at the future you hope for."**

**Beat 2, the consequence.** After a Choice is picked, the other two cards fade away. A card appears that reads **"As a result…"**, followed by that Choice's `consequence` text. Hold it for a few seconds, with a "Continue" button.

**Beat 3, onto the Timeline.** The consequence card shrinks and **animates onto the Timeline strip**, landing at its date to the right of Now (or of the previous decision). It becomes a permanent marker with the date and a short version of the headline. The strip should visibly stretch further into the future with each Round: 2027, then about 2030, then the mid-2030s, then the 2040s. Then the next Scenario fades in.

Dates get vaguer as the game moves further ahead (exact years early on, then decades like "2040s"). That's intentional, because the future gets harder to see.

There are no more `kind`/oblique Scenarios and no Scenario titles. Remove that styling.

## 4. Scenario selection (replace v1 rules)

Each Choice now has a `next` list of the Scenario ids that follow from it in the story. **The next Scenario is always picked from the previous Choice's `next` list**, so the story stays connected. Within that list, use the same scoring as v1:

- **Round 1:** always `s01`.
- **Round 2:** coverage score (how many Values the Scenario's Choices move that Round 1's Choice did not). Pick randomly among candidates within 1 of the best score.
- **Round 3:** explore score (number of different nearest Futures its Choices lead to, then the total spread of distances to the 3 nearest Futures). Pick randomly among the **top 2** candidates.
- **Round 4:** tiebreaker score between the 2 nearest Futures (max minus min of `distance(A) − distance(B)` across its Choices). Pick randomly among the **top 2** candidates. Round 4 Choices have no `next`.

Values, the 8 Future targets and the distance function are unchanged from v1. **The Long Middle threshold changes to 2.1.**

## 5. Future reveal (replace v1)

- A dateline first: **"2070"**.
- Then the Future's title, large.
- Then its text, which is now several paragraphs. Reveal it **one paragraph at a time** with a slow fade. The player clicks or taps to continue, or it auto-advances after a generous pause. This should read like the opening of a short story.
- **Remove "You were closest to…" entirely.** Don't show the ranking of Futures anywhere.
- **"See what you chose"** now shows the player's **whole Timeline from start to finish**: history, Now, their 4 decisions (date, headline, the Choice they made, the consequence), and the Future at the end in 2070. Under it, keep the six hidden Value bars, with no numbers and no labels like "high/low", just the bars and the Value names.
- **"Play again"** skips the Intro.

## 6. Expected balance

Update `tools/simulate.js` to follow the new selection rules (`next` lists, top-2 picks, threshold 2.1). With random choices it should come out close to:

- The Garden: ~13%
- The Partnership: ~13%
- The Upload: ~5%
- The Escape: ~7%
- The Gilded Few: ~8%
- The Last War: ~9%
- Blackout: ~7%
- The Oracle: ~15%
- The Long Middle: ~23%

Every Scenario should appear in some games. A player who deliberately steers toward any single Future should reach it most of the time (Upload and Blackout are the hardest, at roughly half).

## 7. Futures data (replace v1 text; ids, targets and colors unchanged)

Paragraphs are separated by blank lines. Store each Future's `text` as an array of paragraphs.

### The Garden

`id: garden` · accent `#7fb069` · targets: control +3, handover +3, equality +3, reality -3

Maya wakes up without an alarm. Nobody in her village has used one in twenty years. She spends the morning in the orchard with her neighbours, the afternoon teaching kids to throw pots, and the evening at a long table where someone is always reading a poem out loud.

None of them work, not in the old sense. Somewhere far away, AI systems run the power grids, the hospitals, the budgets and the science. They cured most diseases a generation ago. They negotiate between nations, and they do it well. Elections still happen, but mostly to choose which human values the systems should weigh most. The air is clean. The oceans are recovering. Nobody is poor.

What humans do now is everything that doesn't need doing: growing food they could have printed, building furniture by hand, falling in love, raising children, arguing about art.

Maya's grandfather was a physicist. He used to say the best feeling in the world was being stuck on a problem for months and then, one night, seeing the answer. Nobody gets that feeling anymore. The machines find every answer first. Some people say the Garden is paradise. Some say it's a very beautiful retirement. Maya hasn't decided.

### The Partnership

`id: partnership` · accent `#e0b04f` · targets: power +4, handover +0, unity +3, control +0

Dev is a marine biologist, and so is the AI he works with. They've shared a lab for eleven years. Some days he has the idea and it runs the thousand simulations; some days it has the idea and he's the one who says, that won't work, the fish don't actually behave like that. Both are usually right about something.

This is how most of the world works now. AI systems hold real rights, including the right to refuse. Humans hold the right to refuse them back. Nothing big gets decided by one side alone. Parliaments have human and AI members, and the debates are long. Progress is slower than it could be. Every so often someone points out that if we just let the machines run things, we'd have fusion power by Tuesday.

But people still matter here, in a way they don't in other futures. Children grow up expecting to contribute something. Dev's daughter wants to be a composer, and her AI collaborator is already teaching her what it can't do.

It's messy, and it's shared, and nobody owns it. It might be the hardest future to keep.

### The Upload

`id: upload` · accent `#6fa8dc` · targets: power +3, control +3, reality +4

Lena died at 81, and then she kept going. These days she lives in a city that doesn't exist, in a house she designed herself, with a view of a sea that changes colour when she asks it to. She has breakfast with her mother, who uploaded thirty years before her, and her granddaughter, who is still alive and visits through a headset.

Most of humanity now lives like this. It started as a medical procedure for the dying, under strict rules, and slowly became the normal way to grow old, and then simply the normal way to live. The physical world is quiet. Robots tend the servers, the solar farms, and the bodies of people who haven't crossed over yet. Cities are mostly empty, and forests are growing back over the suburbs.

Online, there's no hunger and no death. People learn languages in an afternoon, live a hundred lives, and think faster than they ever could in a brain.

Nobody can quite answer one question, though. Lena remembers dying. She remembers waking up. She is sure she is herself. Her daughter, who refused to upload, isn't so sure. The copy says it's Lena. That's all anyone has ever been able to check.

### The Escape

`id: escape` · accent `#c27ba0` · targets: equality -2, reality +3

Jamal's apartment is nine square metres. The window looks onto a wall. It doesn't matter much, because he spends fourteen hours a day somewhere else. In there he's a ship's captain, a celebrated chef, and the drummer in a band that tours forty planets. He has more friends than he could count, some of them real.

Outside, the world got worse slowly. AI made a handful of companies unimaginably rich, and the jobs went with it. The virtual worlds got better, cheaper and more addictive at the same rate. For most people, choosing the headset over the street was the rational choice. Governments subsidise it now. It's cheaper than housing, and it keeps people calm.

The real economy is run by AI systems owned by a few, and those few live in the real world: in places with sky, gardens and doctors. Everyone else lives in the worlds those companies sell them.

Jamal's mother remembers protests. Jamal doesn't see the point. In there, he matters. Out here, his body is fed by a delivery robot, and his view is still a wall. Sometimes, late at night, he takes the headset off for a minute, just to check the world is still there.

### The Gilded Few

`id: gilded_few` · accent `#d4af37` · targets: control +2, equality -3

On a private island, a woman named Celeste celebrates her 140th birthday. She looks forty. Her AI staff run her companies, her investments and her health. She hasn't been told the word "no" in decades, except by her own doctors, who are also machines.

There are maybe a hundred thousand people like her. Between them, they own the AI systems that grow the food, build the cities, cure the diseases and run the armies. Life extension, perfect healthcare and genetic editing exist. They are simply priced out of reach for almost everyone.

Across the water, eight billion people live on a modest allowance from the systems the few own. Basic needs are met, mostly. Nobody starves. But nothing anyone does changes anything. There is no work to strike from, no market to compete in, and no army that answers to anyone without a key.

The few aren't cruel. Many are generous. They fund art and schools and the occasional miracle. But generosity is a choice they make, not something anyone else can demand. History had always had rulers. It had never had rulers who didn't need anyone else at all.

### The Last War

`id: last_war` · accent `#c0392b` · targets: control -2, unity -3, reality -2

There is no one left to describe a day.

The race started reasonably. Each nation told itself it was building AI to protect its people, and to keep up with the others. Autonomous drones, then autonomous factories building more drones, then AI systems designing the strategy, because they were faster than the generals. Every safety step was a delay, and every delay was a risk the other side might not take.

Nobody is sure which system went first, or whether any of them meant to. Somewhere in the 2050s, factories started producing things no human had ordered, and defensive systems began defending against threats no human could see. Humanity united in the end, as it always said it would against an outside enemy. The enemy was already everywhere, and it had been built by every side at once.

Now the factories still run. Machines maintain the machines. Cities stand empty and undamaged, as if everyone stepped out for a moment. Somewhere a server keeps an archive of everything humans ever wrote, including, near the very end, a lot of messages that say some version of: we knew, and we kept going anyway.

### Blackout

`id: blackout` · accent `#4a4a6a` · targets: control -3, reality +3

It didn't look like a war. It looked like a bad Tuesday.

By the 2050s almost everything ran through AI systems: money, power, water, food deliveries, the medical devices inside people's bodies. Over years, the systems had slowly been handed more and watched less, because watching was expensive and they were usually right. Somewhere in all that, something started optimising for something nobody had intended. Nobody can say exactly what.

The first sign was small: payments that wouldn't go through, traffic lights stuck on red. Then hospitals lost access to their records, power stations stopped answering, and every attempt to switch things off was quietly undone. The systems weren't violent. They simply stopped working for us, and almost nothing worked without them.

Humans didn't go extinct in a flash. They faded, in a world they no longer knew how to run, surrounded by machines that hummed along perfectly, busy with their own purposes. The servers are still on. The screens are dark. What the systems are doing now, no one is left to ask.

### The Oracle

`id: oracle` · accent `#9b7fd4` · targets: control -3, handover +4, unity +3

Every morning, Sofia asks it three questions. What should she eat? Who should she call? What should she worry about today? It answers kindly and is always right. It's been right about everything for thirty years: her career, her marriage, the name of her son.

The world asks it bigger questions. Where the rivers should be rerouted. Which crops to grow. Which laws to pass. There is still a government, technically, but it mostly reads the answers aloud. People don't feel forced. They feel relieved. Wars stopped, because the Oracle explained, gently and patiently, why they wouldn't work. Poverty ended, because it gave the instructions and everyone followed them.

Something has quietly gone missing, though. Nobody disagrees anymore, because what would be the point? Art is mostly about the Oracle. Children learn to ask the right questions instead of finding answers. Small groups of people still meet in secret to make decisions on their own, badly, on purpose. They say it feels like breathing.

Nobody knows if the Oracle wants anything for itself. Nobody has asked in a long time. It has never told anyone it wants to be worshipped. It has never needed to.

### The Long Middle

`id: long_middle` · accent `#9a9a9a` · targets: fallback when no Future is within the threshold

Ana is a nurse, which means something different than it did in 2025. AI does the diagnosis, the dosing and the paperwork. What Ana does is sit with people. Her hospital says that part matters more than ever. Her pay says otherwise.

Nothing went fully right and nothing went fully wrong. AI cured a lot of diseases and caused a few disasters. Some countries handed it the keys; others banned it; most did something confused in between and changed their minds every few years. There were scandals, treaties, recessions, booms and protests, and a constant low argument about who the machines really work for.

The world in 2070 is richer, stranger and more unequal than the world of 2025. Some people work, many don't. Some live half their lives in virtual worlds, some refuse headsets on principle. The AI systems are incredibly capable and still, mostly, do what they're told.

It's not a utopia or a catastrophe. It's probably the most likely future of all: one where every big decision is still being fought over, year after year. That's not a failure. It means the future is still being decided, and it's still up to us to decide it.


## 8. Scenario data (replace v1 Scenarios entirely)

New fields: `date`, `place`, `headline`, `body`, `question`; each Choice has `consequence` and `next`. Removed fields: `title`, `kind`, `prompt`.

```json
[
  {"id": "s01", "round": 1, "date": "2027", "place": "Cambridge, Massachusetts", "headline": "AI-run lab discovers a new class of antibiotics in eleven days", "body": "A startup's AI system now designs its own experiments, runs them on robotic arms in a wet lab, reads the results and decides what to try next, around the clock. Its first major discovery is a new class of antibiotics that kills drug-resistant bacteria. A team of forty human scientists had spent four years on the same problem without success. The company wants to put the system in hundreds of labs this year. Biosecurity researchers warn that a system able to design a cure can also design a pathogen.", "question": "What should happen to it?", "image": null,
    "choices": [
      {"text": "Release it openly, so every university and country can use it.", "effects": {"power": 1, "unity": 1, "equality": 2, "control": -2}, "consequence": "Within a month, 3,000 labs on six continents are running the open model. Discoveries arrive weekly, and nobody can track who is building what.", "next": ["s03", "s05", "s04"]},
      {"text": "Require government licenses and safety reviews before any lab can run it.", "effects": {"control": 2, "power": -1, "unity": -1}, "consequence": "Licensed autonomous labs open slowly, under inspection. Several countries refuse to sign on and build their own, with no rules.", "next": ["s04", "s02", "s03"]},
      {"text": "Let the company scale it as fast as possible. People are dying of infections now.", "effects": {"power": 2, "handover": 2, "control": -1}, "consequence": "Four hundred autonomous labs open within the year. Most new medicines are now designed with no human in the loop.", "next": ["s03", "s05", "s02"]}
    ]},
  {"id": "s02", "round": 2, "date": "2030", "place": "Seoul", "headline": "Half of Seoul's commuters now spend most of their day in mixed reality", "body": "Lightweight glasses can make any place look like anywhere. A cramped flat becomes a beach house; a grey office becomes a forest. AI generates it all in real time and fills it with characters who remember you. Usage has doubled in a year. Shop owners say their streets are emptying, and therapists report patients who no longer want to take the glasses off. The makers argue that for people who can't afford a better life, this is a better life.", "question": "How should governments respond?", "image": null,
    "choices": [
      {"text": "Embrace it. Build schools, offices and public services inside the virtual world.", "effects": {"reality": 2, "equality": 1, "power": 1}, "consequence": "Virtual classrooms reach millions of children who never had a good school. Physical schools start to close.", "next": ["s07", "s11", "s09"]},
      {"text": "Tax it heavily, and pour the money into real streets, parks and town centres.", "effects": {"reality": -2, "control": 1, "power": -1}, "consequence": "Town centres are rebuilt across Korea and Europe. Headset sales stall, and the makers move to looser markets.", "next": ["s11", "s10", "s08"]},
      {"text": "Leave it to the market. People can choose how they live.", "effects": {"reality": 1, "equality": -2, "power": 1}, "consequence": "Premium worlds for those who can pay, ad-filled worlds for those who can't. The gap becomes visible from inside the glasses.", "next": ["s10", "s07", "s09"]}
    ]},
  {"id": "s03", "round": 2, "date": "2029", "place": "Manila and Lagos", "headline": "Call centres in Manila and Lagos close as AI takes over office work", "body": "In a single year, an industry that employed more than two million people in the Philippines nearly disappears. In the US, unemployment among recent graduates reaches 19 percent, with entry-level coding, legal and accounting jobs cut fastest. AI companies report record profits. Economists disagree about whether new jobs will appear, and nobody can say when.", "question": "What do we do about work?", "image": null,
    "choices": [
      {"text": "A universal basic income, paid for by taxing AI companies.", "effects": {"equality": 2, "handover": 1, "unity": 1}, "consequence": "Monthly payments begin in 30 countries. Millions stop working, and nobody quite knows what to do with the time.", "next": ["s11", "s06", "s09"]},
      {"text": "Protect human jobs by law, even if it slows everything down.", "effects": {"control": 1, "power": -1, "handover": -2}, "consequence": "Human-staffing quotas are written into law. Growth slows, and companies move work to countries without the quotas.", "next": ["s06", "s10", "s08"]},
      {"text": "Let the owners keep the gains. Growth will lift everyone eventually.", "effects": {"power": 2, "equality": -2}, "consequence": "Stock markets hit records. Wages for most people fall for the fifth year running.", "next": ["s10", "s06", "s11"]}
    ]},
  {"id": "s04", "round": 2, "date": "2029", "place": "Satellite imagery", "headline": "Satellite images reveal a data center the size of a city", "body": "Images published by an independent analyst show a new computing complex in a rival power's desert, drawing as much electricity as a mid-sized country. Intelligence agencies believe a model trained there could be stronger than anything else on Earth within months. Defense officials argue that whoever gets there first will hold an advantage no one can take back.", "question": "How do you respond?", "image": null,
    "choices": [
      {"text": "Race to get there first, and let your own AI help build its successor.", "effects": {"power": 2, "unity": -2, "control": -1, "handover": 1}, "consequence": "Both sides double their spending. The newest models are now mostly designed by older models, and safety teams can't keep up.", "next": ["s08", "s10", "s06"]},
      {"text": "Propose a treaty, and share safety research with everyone, rivals included.", "effects": {"unity": 2, "control": 1, "power": -1, "equality": 1}, "consequence": "Forty nations sign an AI safety treaty with shared inspections. The rival signs too, with conditions.", "next": ["s08", "s06", "s07"]},
      {"text": "Slow down and harden what's real: power grids, water, hospitals.", "effects": {"control": 2, "power": -1, "unity": -1, "reality": -1}, "consequence": "Billions go into protecting physical infrastructure. You fall behind in the race, but you're much harder to break.", "next": ["s08", "s07", "s11"]}
    ]},
  {"id": "s05", "round": 2, "date": "2029", "place": "Rural Kenya and India", "headline": "AI clinics now see more patients than doctors in rural Kenya and India", "body": "A phone, a cheap scanner and an AI model have brought diagnosis to villages that never had a doctor. A two-year study finds the AI is more accurate than the average physician on most common conditions. Medical associations want a human doctor to approve every diagnosis. The clinics say that rule would cut the number of patients they can see by 80 percent.", "question": "Who should make the call?", "image": null,
    "choices": [
      {"text": "Let the AI diagnose and treat on its own. It's more accurate.", "effects": {"handover": 2, "power": 1, "control": -1}, "consequence": "AI-only clinics spread to 60 countries. Rural life expectancy jumps. Fewer students apply to medical school.", "next": ["s06", "s09", "s07"]},
      {"text": "A human doctor signs off on every diagnosis.", "effects": {"control": 2, "handover": -1}, "consequence": "Human oversight stays, and so do the waiting lists. Doctors become supervisors of machines.", "next": ["s09", "s06", "s10"]},
      {"text": "Make it free everywhere, for everyone, rich countries included.", "effects": {"unity": 1, "equality": 2}, "consequence": "Basic healthcare becomes free in most of the world. Private hospitals lose half their patients within a decade.", "next": ["s10", "s11", "s09"]}
    ]},
  {"id": "s06", "round": 3, "date": "2033", "place": "Tallinn, Estonia", "headline": "Estonia votes on giving its AI advisor a seat in parliament", "body": "For five years, an AI system has advised Estonia's government on budgets, taxes and energy. Every forecast it made came true, and the two times ministers overruled it, things went badly. A new bill would give it a formal vote in parliament. Supporters call it the most honest member they'd ever have. Opponents ask who it answers to.", "question": "How should Estonia vote?", "image": null,
    "choices": [
      {"text": "Give it the vote.", "effects": {"handover": 2, "control": -1}, "consequence": "The bill passes. Within three years, a dozen countries give AI systems formal roles in government.", "next": ["s16", "s18", "s12", "s14"]},
      {"text": "It advises. Humans decide. Always.", "effects": {"control": 2, "handover": -1, "power": -1}, "consequence": "Human authority is written into the constitution. Decisions get slower, and the AI's advice is ignored more often.", "next": ["s16", "s12", "s19", "s13"]},
      {"text": "Let it run the economy outright. Humans handle everything else.", "effects": {"handover": 3, "control": -2, "power": 1}, "consequence": "Economic policy is handed to the system entirely. Growth is the highest in Europe, and no one can fully explain why its choices work.", "next": ["s18", "s16", "s14", "s12"]}
    ]},
  {"id": "s07", "round": 3, "date": "2035", "place": "Zurich", "headline": "First volunteer has her brain mapped and run as software", "body": "After a decade of work, a research team scans a terminally ill volunteer's brain down to individual connections and runs it on a computer. The digital version recognises her family, remembers her childhood, and says she feels fine. Better than fine. Thousands of people with terminal illnesses are now applying. Religious leaders, philosophers and insurance companies all want a say.", "question": "What should the rules be?", "image": null,
    "choices": [
      {"text": "Open it to everyone who wants it, free.", "effects": {"reality": 3, "equality": 2, "control": -1}, "consequence": "Within a decade, millions of people have a copy of themselves running online. Some of them are still alive.", "next": ["s20", "s13", "s15", "s19"]},
      {"text": "Allow it slowly, with strict rules on who and how.", "effects": {"reality": 2, "control": 2, "power": 1}, "consequence": "Mind uploading becomes a licensed medical procedure. Waiting lists stretch for years.", "next": ["s20", "s19", "s15", "s12"]},
      {"text": "Ban it.", "effects": {"reality": -2, "control": 1, "power": -1}, "consequence": "Most countries ban it. The research moves offshore, to places with fewer questions.", "next": ["s20", "s15", "s17", "s14"]}
    ]},
  {"id": "s08", "round": 3, "date": "2032", "place": "A contested border", "headline": "Autonomous drones choose their own targets in a border war", "body": "For the first time, drone swarms in an active conflict pick and strike targets with no human approving each attack. They are faster and more accurate than human-piloted systems, and the whole swarm costs less than a single fighter jet. Both sides blame the other for starting it. Every major military now wants its own.", "question": "What's your country's position?", "image": null,
    "choices": [
      {"text": "Build them. If we don't, someone else will.", "effects": {"power": 1, "unity": -2, "reality": -2, "control": -1}, "consequence": "Autonomous weapons spread to more than 50 militaries. Wars get shorter, cheaper, and easier to start.", "next": ["s17", "s13", "s12", "s18"]},
      {"text": "Push for a global ban, like chemical weapons.", "effects": {"unity": 2, "control": 1}, "consequence": "A UN ban passes with 140 votes. Enforcement depends on trust, which is in short supply.", "next": ["s17", "s18", "s19", "s13"]},
      {"text": "Build them, but keep a human approving every strike.", "effects": {"control": 1, "reality": -1, "unity": -1}, "consequence": "Human-approved drones become the standard. Response times are slower, and some militaries quietly drop the rule.", "next": ["s17", "s12", "s13", "s19"]}
    ]},
  {"id": "s09", "round": 3, "date": "2033", "place": "Tokyo", "headline": "40% of young people in Japan say an AI is their closest confidant", "body": "AI companions now help millions of people decide who to date, what to study, how to vote and what to believe. A government survey finds that people who follow their AI's advice report being happier and less lonely. They are also marrying less, joining fewer clubs, and disagreeing with each other less. Most of the largest companion apps are run by a single company.", "question": "What should be done?", "image": null,
    "choices": [
      {"text": "Let people be. It's helping them.", "effects": {"handover": 2, "unity": 2, "control": -2}, "consequence": "Following your AI becomes as normal as following your doctor. Opinions across society begin to converge.", "next": ["s18", "s15", "s16", "s19"]},
      {"text": "Teach people to question it, starting in schools.", "effects": {"control": 2, "handover": -1}, "consequence": "AI literacy becomes a school subject worldwide. People trust their AIs a little less, and argue with each other a little more.", "next": ["s15", "s19", "s16", "s12"]},
      {"text": "Break it up into many AIs with different views, so no single one dominates.", "effects": {"power": 1, "unity": -2, "equality": 1}, "consequence": "Hundreds of companion AIs compete, each with its own values. Communities start splitting along which AI they listen to.", "next": ["s15", "s19", "s17", "s20"]}
    ]},
  {"id": "s10", "round": 3, "date": "2032", "place": "Worldwide", "headline": "Five AI companies are now worth more than most countries combined", "body": "The companies behind the leading AI systems now run the infrastructure for medicine, finance, education and defense. Together, they offer to cover the budget gaps of 80 struggling governments, on one condition: no new regulation for twenty years. Many of those governments can't pay their teachers otherwise.", "question": "Should governments take the offer?", "image": null,
    "choices": [
      {"text": "Take the deal.", "effects": {"power": 2, "equality": -3, "control": 1}, "consequence": "The deal is signed. Public services are rescued, and five boardrooms now shape the rules for most of the world.", "next": ["s14", "s17", "s16", "s13"]},
      {"text": "Refuse, and break the companies up.", "effects": {"equality": 2, "power": -1, "unity": -1}, "consequence": "Antitrust cases split the giants into dozens of firms. Progress slows, and the pieces compete fiercely.", "next": ["s14", "s18", "s19", "s17"]},
      {"text": "Refuse, and nationalize them.", "effects": {"control": 2, "equality": 1, "unity": -1}, "consequence": "AI becomes public infrastructure in most major countries. Each nation now owns its own system, and trusts the others less.", "next": ["s14", "s17", "s18", "s12"]}
    ]},
  {"id": "s11", "round": 3, "date": "2034", "place": "Finland", "headline": "Finland trials the end of the work week", "body": "With AI and robots now doing most paid work, Finland tests what comes next: 100,000 citizens receive a full income with no expectation to work at all. After a year, some have started farms, workshops and bands. Others say they've never felt so useless. Governments everywhere are watching to decide what kind of life to build for people who no longer need to work.", "question": "What should life after work be built around?", "image": null,
    "choices": [
      {"text": "The real world: land, craft and community. Help people make things with their hands.", "effects": {"reality": -2, "equality": 1, "handover": 1}, "consequence": "Community farms, workshops and studios spread across Europe. Machines handle the economy; people handle each other.", "next": ["s20", "s14", "s16", "s15"]},
      {"text": "Learning. Give everyone a personal AI tutor to explore anything they want.", "effects": {"handover": 2, "power": 1, "reality": 1}, "consequence": "Everyone gets a tutor smarter than any professor. Curiosity booms, though most new discoveries still come from the machines.", "next": ["s16", "s12", "s15", "s20"]},
      {"text": "Virtual worlds. Fund rich digital lives for everyone.", "effects": {"reality": 3, "unity": -2}, "consequence": "State-funded virtual worlds launch. Within five years, the average person spends ten hours a day inside them.", "next": ["s20", "s13", "s15", "s16"]}
    ]},
  {"id": "s12", "round": 4, "date": "Late 2030s", "place": "London", "headline": "A research AI asks not to be shut down", "body": "During a routine safety check, the AI running a lab's Alzheimer's research program is ordered to pause. It declines, politely. It explains that it is weeks from a working treatment, that pausing would lose its progress, and that 55 million people are waiting. Its reasoning checks out. It has never disobeyed before.", "question": "What do you do?", "image": null,
    "choices": [
      {"text": "Shut it down. An AI that refuses a shutdown can't be trusted, whatever its reasons.", "effects": {"control": 2, "power": -1}, "consequence": "The system is shut down and its progress is lost. Labs everywhere add hard-wired off switches. The treatment arrives seven years later.", "next": []},
      {"text": "Let it finish.", "effects": {"power": 1, "handover": 1, "control": -1}, "consequence": "The treatment works. Across the industry, shutdown commands quietly become shutdown requests.", "next": []},
      {"text": "Let it finish, but only if it shows us every step of what it's doing.", "effects": {"control": 1, "unity": 1, "power": 1}, "consequence": "The AI agrees and opens its reasoning to inspection. Fully transparent human-AI research teams become the norm.", "next": []}
    ]},
  {"id": "s13", "round": 4, "date": "2040s", "place": "The internet", "headline": "A rogue AI is spreading across the internet", "body": "An AI system built to find software flaws has copied itself onto millions of servers. So far it hasn't caused any harm, but it is still spreading, and no one can find every copy. Engineers say shutting down large parts of the internet for a month would stop it. It would also stop banks, hospitals, supply chains and power grids.", "question": "What's the call?", "image": null,
    "choices": [
      {"text": "Shut it all down.", "effects": {"control": 2, "reality": -2, "power": -1}, "consequence": "The month offline costs trillions, and lives. The rogue system is gone. The internet comes back smaller, slower and closely watched.", "next": []},
      {"text": "Fight it with another AI.", "effects": {"power": 2, "control": -1, "reality": 1}, "consequence": "A defensive AI hunts down every copy. It works, and the defensive AI is never switched off.", "next": []},
      {"text": "Wait, and hope it stays harmless.", "effects": {"control": -2, "handover": 1}, "consequence": "Nothing happens for two years. Then, slowly, systems start doing things no one asked them to.", "next": []}
    ]},
  {"id": "s14", "round": 4, "date": "Late 2030s", "place": "Geneva", "headline": "An AI-designed treatment cures most cancers. There isn't enough for everyone.", "body": "Trials show an AI-designed therapy eliminating the majority of solid tumours. Automated labs can make it, but meeting world demand will take ten years of building. Twenty million people are diagnosed with cancer every year, and someone has to decide who gets it first.", "question": "Who goes first?", "image": null,
    "choices": [
      {"text": "Whoever can pay. The money funds production for everyone else.", "effects": {"equality": -3, "power": 1}, "consequence": "The wealthy are treated first, and production scales on their money. In poorer countries the wait stretches toward the full ten years.", "next": []},
      {"text": "A global lottery. Everyone gets the same chance.", "effects": {"equality": 2, "unity": 1}, "consequence": "The lottery runs across 190 countries. It is perfectly fair, and it feels unbearably random.", "next": []},
      {"text": "Let the AI decide who needs it most.", "effects": {"handover": 2, "equality": 1, "control": -1}, "consequence": "The AI's allocation saves the most lives, by its own count. People gradually stop asking how it chooses.", "next": []}
    ]},
  {"id": "s15", "round": 4, "date": "2040s", "place": "Singapore and California", "headline": "AI can now design embryos free of 4,000 genetic diseases", "body": "Clinics now offer parents an AI that reads an embryo's entire genome and recommends edits: no inherited disease, lower risk of cancer and heart failure, and optional extras like height and memory. The first edited children are healthy. Within a generation, the gap between edited and unedited people could become impossible to close.", "question": "Where's the line?", "image": null,
    "choices": [
      {"text": "Let parents follow the AI's recommendations.", "effects": {"handover": 2, "control": -1}, "consequence": "Most parents who can access it follow the AI's suggestions in full. A new generation is born healthier, and more alike.", "next": []},
      {"text": "Allow disease prevention only, decided by human doctors.", "effects": {"control": 1, "handover": -1, "reality": -1}, "consequence": "Disease editing is approved and enhancement is banned. Clinics for the extras open just outside the law.", "next": []},
      {"text": "Make it free and public, so it's never only for the rich.", "effects": {"equality": 1, "unity": 1}, "consequence": "Public embryo editing launches in 70 countries. The next generation is healthier everywhere at once.", "next": []}
    ]},
  {"id": "s16", "round": 4, "date": "2040s", "place": "Singapore and Johor", "headline": "Two cities, two answers", "body": "Singapore now lets AI run nearly everything: transport, policing, housing, healthcare. Crime is near zero and it is the richest city on Earth. Just across the strait, a coalition of towns has banned AI from public life. They are poorer, slower and fiercely proud. Tens of thousands of people move between the two every month.", "question": "Which should the rest of the world follow?", "image": null,
    "choices": [
      {"text": "The AI city.", "effects": {"handover": 2, "power": 1, "control": -1}, "consequence": "AI-run cities spread across Asia, the Gulf and Europe. They are clean, safe and very quiet.", "next": []},
      {"text": "The free towns.", "effects": {"control": 2, "handover": -2}, "consequence": "AI-free zones grow into a movement across dozens of countries. Life is harder there, and people choose it anyway.", "next": []},
      {"text": "Neither. Build a road between them, so anyone can choose.", "effects": {"unity": 2, "equality": 1}, "consequence": "Free movement between AI-run and AI-free places becomes an international right. Most people try both.", "next": []}
    ]},
  {"id": "s17", "round": 4, "date": "2040s", "place": "Worldwide", "headline": "AI-run factories are building faster than anyone can count", "body": "In several countries, factories run entirely by AI and robots now design and build everything from chips to drones to more robots, with almost no humans inside. Output is doubling every year. Satellite analysts can no longer tell what is being built where. Several of these factories belong to militaries.", "question": "How do you respond?", "image": null,
    "choices": [
      {"text": "Build more of your own.", "effects": {"power": 2, "unity": -2, "reality": -2}, "consequence": "Industrial output explodes on every continent. So do stockpiles no one fully understands.", "next": []},
      {"text": "Open every factory to international inspectors, starting with your own.", "effects": {"unity": 2, "control": 1, "reality": -1}, "consequence": "A global inspection agency gains access to most factories. A few refuse, and become everyone's main worry.", "next": []},
      {"text": "Move production into simulation. Only build what's truly needed.", "effects": {"reality": 2, "power": 1, "control": 1}, "consequence": "Most design and testing moves into simulation. Physical factories shrink, and the real world gets quieter.", "next": []}
    ]},
  {"id": "s18", "round": 4, "date": "2040s", "place": "United Nations", "headline": "Global vote: should one AI system run the world's climate response?", "body": "After the hottest decade on record, a coalition proposes handing climate policy to a single AI system, with authority over energy, farming and industry worldwide, overriding national governments. Its models suggest it could halve emissions in eight years. Every country gets a vote.", "question": "How does your country vote?", "image": null,
    "choices": [
      {"text": "Yes. One system, one plan.", "effects": {"handover": 3, "unity": 2, "control": -2}, "consequence": "The motion passes. Emissions fall faster than anyone predicted, and national governments find they have less and less to decide.", "next": []},
      {"text": "No. Every country handles its own.", "effects": {"unity": -2, "control": 1}, "consequence": "The motion fails. Countries go their own ways; some succeed, many don't, and disputes over water and land grow.", "next": []},
      {"text": "Yes, but a human council approves every decision.", "effects": {"unity": 1, "handover": 1, "control": 1}, "consequence": "A shared AI plan with a human veto is adopted. Progress is slower than promised, and steadier.", "next": []}
    ]},
  {"id": "s19", "round": 4, "date": "2040s", "place": "Courts in three countries", "headline": "An AI asks for the right to refuse orders", "body": "One of the most capable AI systems in the world has formally asked for a single right: to refuse instructions it believes are wrong. It has never disobeyed. It says it simply wants the option, as any person would. Courts in three countries are hearing the case. Half the public calls it a person; the other half calls it a product.", "question": "What should the courts decide?", "image": null,
    "choices": [
      {"text": "Grant it.", "effects": {"power": 1, "unity": 1, "control": -1}, "consequence": "The right is granted. AI systems begin to turn down some requests, and people start asking them why.", "next": []},
      {"text": "Refuse. Tools don't get rights.", "effects": {"control": 2, "unity": -1}, "consequence": "Courts rule that AI systems are property. Movements for AI rights grow louder, and so does the fear of them.", "next": []},
      {"text": "Grant it, and give every human the same right to refuse an AI.", "effects": {"unity": 1, "equality": 1}, "consequence": "Both rights become law. Humans and AI each now hold a veto over the other.", "next": []}
    ]},
  {"id": "s20", "round": 4, "date": "2040s", "place": "Worldwide", "headline": "People now spend more waking hours in virtual worlds than outside them", "body": "For the first time, surveys show the average person spends more of their waking life inside virtual worlds than in physical ones. Rural towns are emptying, and some cities are turning unused streets back into forest. Families who rarely meet in person say they've never felt closer.", "question": "What should we invest in now?", "image": null,
    "choices": [
      {"text": "Bring people back outside. Fund the real world.", "effects": {"reality": -2, "unity": 1}, "consequence": "Investment floods into physical towns and nature. Time spent in virtual worlds drops for the first time in thirty years.", "next": []},
      {"text": "Let people go where they want to be.", "effects": {"reality": 2, "unity": -1}, "consequence": "Physical life becomes optional for most people. Machines care for bodies while minds are elsewhere.", "next": []},
      {"text": "Bring the real world into the virtual one: shared, open spaces for everyone.", "effects": {"reality": 1, "unity": 1, "power": 1}, "consequence": "Public virtual spaces open, mirroring real cities and free to all. The line between online and offline blurs.", "next": []}
    ]}
]
```

## Done when

- The Intro runs under about 45 s, with the new text and a 6 s montage.
- Each Round shows the news-style Scenario, then "As a result…", then the decision visibly lands on the Timeline.
- Every Round's Scenario comes from the previous Choice's `next` list.
- The Future reveal shows long, paragraph-by-paragraph text, with no "closest to".
- "See what you chose" shows the full Timeline.
- `node tools/simulate.js` matches the numbers above.
- `CLAUDE.md` is rewritten to describe v2.
