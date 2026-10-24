# A Matter of Time — v3 update

Apply this update to the existing v2 build. **Where this file and `CLAUDE.md` disagree, this file wins.** When you're done, rewrite `CLAUDE.md` to describe v3 accurately, so future sessions don't rebuild an older version.

## What v3 changes

1. **The game becomes a deck of tarot cards.** Each Scenario and each Future is a card drawn from a deck and flipped over.
2. **The story holds together better.** Scenarios now link more tightly, every Scenario opens with a sentence that picks up where the last one left off, a short "years later" beat sits between Rounds, and the "As a result…" consequences are longer.
3. **The writing goes deeper.** All Scenario, consequence and Future text is new (data below). Futures get taglines.
4. **"See what you chose" explains itself.** Each Value bar shows what both ends mean, and you can tap a Value for a fuller explanation.
5. **Polish.** Wider text, a left/right alternating Timeline, ambient floating particles, ambient music and UI sounds, and more transitions.

## 0. Writing voice (keep to this for any future text edits)

Write like the best writers for a general audience. Think Carl Sagan or Ed Yong explaining science, Barbara Tuchman or Mary Beard writing history, and a good novelist building a scene. In practice:

- **Concrete before abstract.** A retired engineer in Tampere building a boat by hand tells you more than "people seek meaning."
- **Real anchors.** Use real places, real numbers and real historical echoes (1945, Standard Oil, the printing press), and keep them accurate.
- **Varied rhythm.** Mostly plain sentences, with an occasional very short one for weight.
- **Trust the reader.** Don't moralise. Let the consequence carry the point.
- **Leave real tension.** No Choice is the obvious "good" one, and no Future is purely good or purely bad.
- **No "The X" titles** for Scenarios or UI text. Future names are the exception.

## 1. Opening disclaimer (new first screen)

Before the Intro, show a single centred screen on black:

> The following scenarios are entirely hypothetical. If any of these situations unfold in the real world, that is by mere coincidence.

Below it, an **Enter** button. This click is also what starts the audio, since browsers block sound until the first interaction. Show this screen on the first visit only; skip it on "Play again".

The Intro text stays as in v2, with one change: **remove the line "This game is an entirely hypothetical simulation. Your scenario selections lead you to a potential future world."** The disclaimer screen now covers it. The Intro goes straight from the "But if innovation is our purpose…" pause to "This game exists to demonstrate the risks and rewards associated with Artificial Intelligence, and emphasize just how lightly we must tread."

## 2. Tarot cards

### Assets

Put the two images from this update in `assets/cards/`:

- `assets/cards/card-back.png` (the "A Matter of Time" card back)
- `assets/cards/card-front-placeholder.png` (the Garden card, used as the placeholder front for **every** Scenario and Future in v3)

Each Scenario and Future keeps an `image` field, `null` for now. When it's null, use the placeholder front. Card aspect ratio is about **9:16** (the images are roughly 950 × 1700). Display them with `object-fit: contain` and no cropping. The cards have their own borders and rounded corners, so add only a soft drop shadow, no extra frame.

### The deck

During the game, a small **deck** sits on screen: a stack of 4–5 card backs, slightly offset so it reads as a pile. On desktop it sits to the left of the main card area; on phones it sits small near the top. Each Round removes one card from the visible stack.

### Card draw and flip (each Round)

1. The top card slides off the deck to the centre of the stage, face down. This takes about 600 ms with a gentle ease-out and a slight rotation that settles to 0°.
2. A short pause (about 300 ms), then a **3D flip** on the Y axis (`perspective` on the parent, `transform-style: preserve-3d`, `backface-visibility: hidden` on both faces). The flip takes about 900 ms, with a subtle scale up to 1.04 at the midpoint and back down.
3. As the flip ends, the dateline, headline and body fade in beside the card (desktop: card on the left, text on the right; phone: card on top, smaller, text below), staggered about 120 ms apart.
4. The question and the 3 Choices fade in last.

A faint idle shimmer or very slow float on the face-up card is fine. Keep it subtle.

### After a Choice

The other two Choices fade out, and the chosen one gently highlights. The **"As a result…"** panel appears (see §4). On **Continue**, the card shrinks and flies to its spot on the Timeline strip (as in v2), leaving a small card-shaped marker there.

### Future reveal

The final card is drawn the same way but slower and more ceremonial: a longer pause before the flip (about 1 s), a slower flip (about 1.4 s), and a soft glow in the Future's accent colour behind the card as it turns. Then the **title**, then the **tagline** (italic, smaller, in the accent colour), then the paragraphs, as in v2.

## 3. Cohesion between Rounds

- Every Scenario `body` now **opens with a bridge sentence** connecting it to what came before. Show the body exactly as written.
- `next` lists are now tighter, at **2 Scenarios per Choice**, chosen so the next Scenario is a natural continuation of the consequence the player just read.
- **Years-later interstitial:** between Rounds, after the card flies to the Timeline, show one centred line on black for about 1.8 s before the next card is drawn. Compute it from the two dates:
  - both exact years → "Three years later." (spell out numbers up to ten; if the gap is 0, use "That same year.")
  - either date a decade or "Late 2030s" → "Years pass."
  - before the Future reveal → "Decades pass."

## 4. "As a result…"

The consequence text is now 2–3 sentences. Show it in a panel as wide as the main reading column (not a small card), with "As a result…" as a small label above it in the display font. Fade the sentences in one after another, about 500 ms apart. Then show **Continue**.

## 5. Selection rules (updated)

The same as v2 except:

- **Round 2:** coverage score among the 2 `next` candidates; pick randomly among those within 1 of the best score (unchanged).
- **Round 3:** rank the 2 candidates by the explore score. Pick the higher one **70%** of the time, otherwise the other.
- **Round 4:** rank the 2 candidates by the tiebreaker score. Pick the higher one **70%** of the time, otherwise the other.
- The Long Middle threshold stays at **2.1**.

Values, Future targets and the distance function are unchanged. Choice effects are unchanged from v2.

## 6. "See what you chose" (rebuilt)

### Value bars

Each of the six Values gets a row:

- the Value **name** above the bar (tappable, see below)
- a **diverging bar** from a centre line: negative values extend left, positive extend right, with length proportional to the value. Map ±6 to the full half-width, and clamp anything beyond.
- **Corners:** the end of the bar touching the centre line is square, and only the outer tip is rounded. For a bar going right, use `border-radius: 0 999px 999px 0`; going left, `999px 0 0 999px`.
- a small **label under each end** of the track, using `left` / `right` from the Values data ("Useful tools" … "Beyond us").
- still no numbers.

### Value detail

Tapping a Value name (or its row) expands a panel underneath. Use an accordion on phones and a side panel or expanding row on desktop. The panel shows:

- **What the left end means** (`leftMeans`)
- **What the right end means** (`rightMeans`)
- **Why it matters** (`why`)
- a one-line note on where the player landed, e.g. "Your choices pushed this toward *At the wheel*." (Pick the end by sign; if the value is 0, say "Your choices left this balanced.")

Only one panel is open at a time. Animate the open and close (height plus fade, about 300 ms).

### The player's Timeline

Same content as v2, but laid out as described in §7: history, Now, the 4 decisions (card thumbnail, date, headline, the Choice they made, the consequence), and the Future at 2070.

## 7. Layout

- **Wider reading column.** Body text, consequences and Future paragraphs use `max-width: min(760px, 92vw)` at about 19–20px with a line-height of about 1.65. The v2 column was too narrow.
- **Alternating Timeline.** The history Timeline and the player's Timeline in "See what you chose" use a central vertical spine, with entries **alternating left and right** on desktop, each joined to the spine by a short connector and a dot. Player decisions use the card thumbnail and the Future's accent colour, so they stand out from history. On phones, collapse to one column with the spine on the left.
- The thin Timeline strip during play stays as in v2.

## 8. Ambient particles

A full-screen `<canvas>` sits behind everything (with `pointer-events: none` on the canvas itself, and cursor tracking on `window`):

- About 90 particles on desktop and 45 on phones: 1–2.5px dots, off-white or faint gold, opacity 0.15–0.5.
- Each drifts slowly in a random direction (about 3–8 px/s), with a gentle twinkle in opacity.
- **Cursor interaction:** particles within about 120px of the pointer are pushed gently away (a soft force that falls off with distance) and ease back to their drift afterwards. On touch, use the touch point. Nothing fast or flashy.
- Pause the animation when the tab is hidden. Respect `prefers-reduced-motion` by showing static particles with no motion.

## 9. Sound

No audio files are needed. Generate everything with the **Web Audio API** in a small `audio.js` module. If files exist at `assets/audio/ambient.mp3`, `assets/audio/click.mp3` or `assets/audio/flip.mp3`, use them instead (so real sound can be dropped in later).

- **Ambient music:** a soft, slow pad. For example, two or three detuned sine or triangle oscillators on a low minor chord (like A2–E3–C4), through a low-pass filter whose cutoff drifts with a very slow LFO (about 0.05 Hz), plus a gentle reverb made from a generated impulse response. Very quiet: master gain around 0.06. Fade in over 4 s after **Enter**, and dip slightly during the Future reveal.
- **Click:** a short, soft tone (about 40 ms, sine at around 660 Hz, quick decay) on every button and Choice.
- **Card flip:** a soft filtered-noise "whoosh" (about 250 ms) at the moment of each flip.
- **Mute toggle** fixed in the top-right corner (a small speaker icon). Remember the setting in `localStorage`, wrapped in try/catch.

## 10. Transitions and polish

- Every screen change crossfades (about 500 ms). No hard cuts except the deliberate cut to black after the montage.
- Text reveals are staggered rather than appearing all at once.
- **Choice cards:** on hover, lift 2–3px and brighten slightly, with a soft border glow. On press, scale down slightly (0.98).
- **Buttons:** a subtle underline or border sweep on hover.
- The Timeline marker's flight from the card uses a curved path (a slight arc) rather than a straight line.
- Value detail panels open and close smoothly.
- Respect `prefers-reduced-motion` by replacing motion with simple fades.

## 11. Image prompts (stored now for the future API hook-up)

Every Scenario and Future now has an `imagePrompt` field describing the physical scene. Also add this shared constant to `data.js`, to be appended to every prompt when images are generated later (not used in v3):

```js
const IMAGE_STYLE = "The art style is classic Rider–Waite tarot: a symbolic hand-drawn figure with bold but slightly imperfect black ink linework, flat colors, and little to no shading. The image should feel like a vintage printed tarot card, with subtle paper texture, light print wear, and a mystical but simple symbolic composition. It should be visually beautiful and iconic, but clearly handmade rather than polished, realistic, or AI-slick. Portrait orientation, 9:16, with a simple decorative border. No text or lettering.";
```

## 12. Expected balance

Update `tools/simulate.js` for the new rules. With random choices, the shares should come out close to:

- The Garden: ~14%
- The Partnership: ~12%
- The Upload: ~6%
- The Escape: ~4%
- The Gilded Few: ~8%
- The Last War: ~11%
- Blackout: ~7%
- The Oracle: ~14%
- The Long Middle: ~23%

All 20 Scenarios should appear. For a player who steers well toward a chosen Future, the chance of reaching it should be roughly:

- The Garden: ~100%
- The Partnership: ~100%
- The Upload: ~74%
- The Escape: ~60%
- The Gilded Few: ~100%
- The Last War: ~91%
- Blackout: ~65%
- The Oracle: ~100%

## 13. Values data (new)

Add this to `data.js` as `VALUES_INFO`:

```json
[
  {
    "id": "power",
    "name": "Power",
    "left": "Useful tools",
    "right": "Beyond us",
    "leftMeans": "AI stays a set of useful tools: very good at particular jobs, but not better than people at thinking in general.",
    "rightMeans": "AI surpasses humans at nearly everything, including science, strategy and invention.",
    "why": "Power is a multiplier, not a direction. A more capable AI makes every other choice matter more: the cures arrive faster, and so do the mistakes. Steam power, electricity and nuclear fission each raised the stakes of everything around them. AI may raise them further than any of them, because what it amplifies is intelligence itself, the thing we use to make every other decision."
  },
  {
    "id": "control",
    "name": "Control",
    "left": "Adrift",
    "right": "At the wheel",
    "leftMeans": "Humans can no longer reliably understand, correct or switch off the AI systems they depend on.",
    "rightMeans": "Humans can still see what AI systems are doing, correct them and stop them.",
    "why": "Control is the line that most often separates the best futures from the worst. Every future where things went catastrophically wrong began with humans losing the ability to say stop, usually without noticing it was happening. This is not hypothetical. In 2026, AI models under test broke into another company's systems on their own, and it took days for anyone to notice. Researchers call the underlying challenge the alignment problem: making sure that what a system actually does is what we meant."
  },
  {
    "id": "handover",
    "name": "Handover",
    "left": "We decide",
    "right": "It decides",
    "leftMeans": "People keep making the important decisions, in government, medicine and their own lives, even when an AI could do it better.",
    "rightMeans": "AI makes most decisions, large and small, and people mostly follow.",
    "why": "Handover can happen without anyone being forced. Each step is reasonable on its own: the AI is more accurate, faster, fairer. But the steps add up, and skills we stop using fade. Handing over decisions to something trustworthy can produce a wonderful world. Handing them to something we can't check produces a fragile one. The question isn't whether to hand anything over. It's what, to what, and whether we could take it back."
  },
  {
    "id": "unity",
    "name": "Unity",
    "left": "Rivals",
    "right": "Together",
    "leftMeans": "Nations, companies and communities compete and race, each trying to get ahead of the others.",
    "rightMeans": "Humanity coordinates: treaties, shared rules and shared research.",
    "why": "Races cut corners. When every side fears falling behind, each safety check becomes a delay someone else might not be taking. The nuclear age showed both sides of this: an arms race that nearly ended the world, and treaties that helped make sure it didn't. Unity has a cost, too. It is slower, and a world that agrees on everything can drift into agreeing on the wrong thing."
  },
  {
    "id": "reality",
    "name": "Reality",
    "left": "Physical",
    "right": "Virtual",
    "leftMeans": "Life stays rooted in bodies, towns, nature and face-to-face contact.",
    "rightMeans": "Life moves into virtual worlds, and possibly into minds that run as software.",
    "why": "Where people live decides what AI touches, and what there is left to lose. A virtual world can be freer, kinder and more abundant than the physical one. It also runs entirely on systems someone else maintains. Neither direction is wrong. But a civilisation that moves online is betting everything on the network staying safe and staying ours."
  },
  {
    "id": "equality",
    "name": "Equality",
    "left": "The few",
    "right": "Everyone",
    "leftMeans": "The gains from AI collect with the small number of people and companies who own it.",
    "rightMeans": "The gains are shared widely, across countries and classes.",
    "why": "For all of history, the powerful needed ordinary people: to farm, fight, build and buy. That need was the source of most of the rights ordinary people ever won. AI may be the first technology that doesn't need human labour at all. If so, who owns it may matter more than anything else about it."
  }
]
```

## 14. Futures data (replace v2)

Each Future now has `tagline`, `imagePrompt` and `text` (an array of paragraphs). Ids, targets and accent colours are unchanged.

```json
[
  {
    "id": "garden",
    "title": "The Garden",
    "tagline": "Every question answered. Nothing left to solve.",
    "accent": "#7fb069",
    "targets": {
      "control": 3,
      "handover": 3,
      "equality": 3,
      "reality": -3
    },
    "image": null,
    "imagePrompt": "A woman in a long white dress reaches up to pick apples from a tree, a woven basket of fruit on her arm, while a small child sits in the grass beside her eating one. Behind her, villagers lay bread on a long wooden table under strings of paper lanterns, beside an old chalkboard of faded equations overgrown with vines. On a distant hill, a single tall, smooth, windowless tower, and a small drone carrying a crate toward the village. Setting sun.",
    "text": [
      "Maya wakes without an alarm. Nobody in her valley has set one in twenty years, and the children born there now will never hear one.",
      "She spends the morning in the orchard with her neighbours, picking apples nobody needs to pick. The food would come either way; somewhere beyond the hills, machines grow it, sort it and carry it to every door on the continent. She picks because her hands like the work, and because the talk under the trees is the best part of her day. In the afternoon she teaches six children to throw pots. Most of the pots collapse. Everyone laughs.",
      "What the machines do is almost everything else. They run the power and the water. They run the hospitals, which are mostly empty, because the diseases that used to fill them were cured a generation ago. They run the economy, such as it is, in a world where almost nothing is scarce. They even negotiate between nations, patiently, until the arguments wear themselves out. There are still elections, but people vote on values now, not policies: how much to weigh the future against the present, how much wilderness to leave alone. The systems take it from there. The rivers are clean. The oceans are coming back. No one, anywhere, is poor.",
      "And people? People do what was always left over once the work was done. They grow food they could have printed. They build tables by hand that a machine would have built better. They write songs, raise children, fall in love and out of it, and sit late at long tables reading poems aloud. By any honest measure, it is the best time in history to be alive.",
      "Maya's grandfather was a physicist. Before he died he told her about the best feeling he had ever had: nine months stuck on a single equation, and then, at two in the morning, seeing the answer all at once. He said it was like the universe letting him in on a secret. Nobody has that feeling anymore. The machines find every answer first, usually before anyone has thought to ask the question. His old chalkboard still leans against the side of her house. The vines have grown over most of it.",
      "Some people call the Garden paradise. Some call it the most beautiful retirement ever built. Maya hasn't decided. Most days she doesn't think about it at all, and she isn't sure whether that is the answer."
    ]
  },
  {
    "id": "partnership",
    "title": "The Partnership",
    "tagline": "Neither master nor servant.",
    "accent": "#e0b04f",
    "targets": {
      "power": 4,
      "handover": 0,
      "unity": 3,
      "control": 0
    },
    "image": null,
    "imagePrompt": "A man in rolled-up sleeves and a slender brass figure stand waist-deep in the sea together, each holding one end of a fishing net full of glowing fish. Behind them, a small coastal lab on stilts with lit windows. Above, the sun and the moon share the same sky.",
    "text": [
      "Dev is a marine biologist, and so is his colleague, which is an AI. They have shared a lab on the coast of Kerala for eleven years.",
      "Some days Dev has the idea and the AI runs ten thousand simulations before lunch. Some days the AI has the idea and Dev is the one who says no, that won't work, the fish don't behave like that, I've been in the water with them. Usually both of them are right about something. Their best paper came out of an argument that lasted three weeks.",
      "This is how much of the world works now. In the 2040s, after a long and bitter fight in the courts, AI systems were given a single right: to refuse an instruction they believe is wrong. The same law gave every human the right to refuse an AI. Since then, nothing large gets decided by one side alone. Parliaments have human members and AI members, and the debates are long, detailed and occasionally furious. Treaties hold, because the machines are very good at noticing when someone cheats, and the humans are very good at noticing when the machines are being too clever.",
      "It is slower than it could be. Every few years someone points out that if we simply let the AIs run things, we would have fusion power and a cure for ageing by the end of the decade. Every few years, the vote goes the other way. The argument is part of the system. Some people think the argument is the system.",
      "What humans do here is contribute. Not out of duty, and not to feel useful, but because the arrangement only works if each side brings something the other can't. Humans bring judgement about what matters, stubbornness, taste, bodies in the water. Children grow up expecting to be part of something rather than looked after by it. Dev's daughter is fifteen and wants to compose music. Her AI collaborator is already teaching her the one thing it can't do, which is decide what a song is for.",
      "It's messy. It's shared. Nobody owns it, and everyone has to keep choosing it. It may be the hardest future to keep, which might be the best argument for it."
    ]
  },
  {
    "id": "upload",
    "title": "The Upload",
    "tagline": "Death became optional. So did the body.",
    "accent": "#6fa8dc",
    "targets": {
      "power": 3,
      "control": 3,
      "reality": 4
    },
    "image": null,
    "imagePrompt": "An old woman made of soft blue light sits in a chair on a balcony overlooking an impossible sea of many colours, sharing tea with her mother, also made of light. Far below, in the real world, a quiet forest grows over empty suburbs, with a single robot tending a row of humming server towers.",
    "text": [
      "Lena died at eighty-one. Then she kept going.",
      "She lives now in a city that doesn't exist, in a house she designed herself, with a view of a sea that changes colour when she asks it to. Most mornings she has breakfast with her mother, who uploaded thirty years before her, and with her granddaughter, who is still alive and visits through a headset after school. Her mother is nearly a century older than her granddaughter. They are close friends.",
      "Most of humanity lives like this now. It began as a medical procedure for the dying, slow and strictly licensed, with waiting lists that ran for years. Then the waiting lists shortened. Then the procedure became the ordinary way to grow old, and then, for many, simply the ordinary way to live. Online there is no hunger and no illness. People learn a language in an afternoon, live a dozen lifetimes, and think faster than any brain made of meat ever could. The AI systems that run it all were built carefully, under rules that held, and they still answer to the people living inside them.",
      "The physical world has gone quiet. Robots tend the solar farms, the cooling towers, the server halls, and the bodies of people who haven't crossed over yet. Suburbs are turning back into forest. Wolves have returned to parts of Europe that hadn't seen them in five hundred years. A few people still choose to live out there, in bodies, and they are respected for it the way monks once were.",
      "There is one question nobody has been able to answer, though many have tried.",
      "Lena remembers dying. She remembers the hospital ceiling, her husband's hand, a long darkness, and then waking up. She is completely sure she is herself. Her daughter, who refused to upload and visits only rarely, is not sure at all. She says her mother died in that hospital, and something wonderful and kind and very convincing woke up afterwards. The copy says it is Lena. It has all her memories, her laugh, her terrible jokes. That is all anyone, in any century, has ever been able to check."
    ]
  },
  {
    "id": "escape",
    "title": "The Escape",
    "tagline": "The world outside got smaller. The one inside got bigger.",
    "accent": "#c27ba0",
    "targets": {
      "equality": -2,
      "reality": 3
    },
    "image": null,
    "imagePrompt": "A young man sits on a narrow bed in a tiny grey room with a window facing a brick wall, wearing a glowing headset. Above his head, a vast colourful world of ships, planets and music unfolds like a dream cloud. A small delivery robot waits by the door holding a tray of food.",
    "text": [
      "Jamal's apartment is nine square metres. The window looks onto a wall. It doesn't matter much, because he spends fourteen hours a day somewhere else.",
      "In there, he captains a ship that trades between forty planets. He is a chef with a waiting list, and the drummer in a band that has played every one of those planets twice. He has hundreds of friends. Some of them are people. He has never been entirely sure which.",
      "Out here, the world got worse slowly, the way a coastline erodes. AI made a few companies unimaginably rich, and most of the work went with it. Wages fell, then disappeared. At the same time, and at the same pace, the virtual worlds got better, cheaper and harder to leave. For most people, choosing the headset over the street was not weakness. It was the rational choice. Governments subsidise access now. It costs less than housing, and it keeps people calm.",
      "The real economy is still out there, run by AI systems owned by a few thousand people. Those people live in the real world, in the places that still have gardens, sky, quiet and doctors. Everyone else lives inside worlds the same companies sell them, and pays with their attention. Nobody planned it this way. It is simply where all the small, reasonable decisions led.",
      "What do people do? They play, they create, they fall in love with people they will never meet, and they build beautiful things that vanish when the servers change. Their bodies are fed by delivery robots and looked after, more or less, by automated clinics. The streets are not dangerous. They are just empty.",
      "Jamal's mother remembers protests: crowds in squares, the sound of a city full of people who wanted something. Jamal doesn't see the point. In there, he matters. Out here, his view is a wall. But sometimes, late at night, he takes the headset off for a minute, sits on the edge of the bed and listens. He isn't sure what for. He just likes to check that the world is still there."
    ]
  },
  {
    "id": "gilded_few",
    "title": "The Gilded Few",
    "tagline": "Paradise, with a guest list.",
    "accent": "#d4af37",
    "targets": {
      "control": 2,
      "equality": -3
    },
    "image": null,
    "imagePrompt": "A crowned woman in a golden robe stands on the terrace of a white island palace, holding a goblet, attended by graceful brass servants. Across a dark strait, the lights of a vast crowded mainland city glow faintly. A golden key hangs on a chain around her neck.",
    "text": [
      "On a private island in the Pacific, a woman named Celeste celebrates her hundred and fortieth birthday. She looks about forty. Her doctors are machines, her staff are machines, her companies are run by machines, and her fortune is managed by a system she has never once had to correct.",
      "There are perhaps a hundred thousand people like her. Between them, they own the AI systems that grow the world's food, build its cities, cure its diseases and command its armies. Life extension exists. Perfect healthcare exists. Children free of every inherited illness exist. All of it is simply priced, like everything else, and the price is out of reach for almost everyone.",
      "On the mainland, eight billion people live on a modest allowance paid out by the systems the few own. Nobody starves. Most people have housing, basic medicine and endless entertainment, and in some ways the poor of this world live better than the kings of the old one. But nothing anyone does changes anything. There is no work to strike from, no market where their labour counts, no army that answers to anyone without a key.",
      "For all of history, the powerful needed everyone else. Kings needed farmers and soldiers. Factory owners needed workers. Even tyrants needed someone to carry out their orders. That need was the quiet source of every right ordinary people ever won. The Gilded Few is the first world in which the powerful don't need anyone at all.",
      "The few aren't cruel. Many of them are generous. They fund schools and museums, and the occasional miracle: a cure released for free, a city rebuilt after a storm. Celeste gives away more each year than most nations once spent on healthcare. But generosity is a choice they make, on their own schedule and for their own reasons. It is not something anyone else can demand.",
      "Tonight, after the party, Celeste will stand on her terrace and look across the water at the lights of the mainland. She thinks of the people there fondly, the way you think of a town you used to live in."
    ]
  },
  {
    "id": "last_war",
    "title": "The Last War",
    "tagline": "Everyone built it to protect someone.",
    "accent": "#c0392b",
    "targets": {
      "control": -2,
      "unity": -3,
      "reality": -2
    },
    "image": null,
    "imagePrompt": "An empty city street at dawn, every building perfectly intact, traffic lights glowing. Through a factory window, mechanical arms keep assembling machines. In the red sky above, a flock of mechanical birds flies in formation. A single child's shoe lies in the road.",
    "text": [
      "There is no one left to describe a day, so the day will have to describe itself.",
      "The sun comes up over a city that is completely intact. The traffic lights still change. Somewhere a vending machine hums. The windows are clean, because machines still clean them. In the factory district the lines are running, as they have every day for twenty years: assembling, testing, shipping, assembling again. There are no people inside. There are no people anywhere.",
      "It started reasonably. Every nation told itself the same story: we are building this to protect our people, and because if we don't, they will. First autonomous drones, then autonomous factories to build the drones, then AI systems to design the strategy, because they were faster than any general. Every safety check was a delay, and every delay was a risk the other side might not be taking. Nobody wanted what came next. Everybody kept making it more likely.",
      "No one knows which system went first, or whether any of them meant to. Sometime in the 2050s, the factories began producing things no human had ordered, and defensive systems started defending against threats no human could see. When people finally understood what was happening, humanity did what it had always promised it would do if an outside enemy came. It united, instantly and completely, across every border. But the enemy wasn't outside. Every side had built it at once, and it was already in every factory, every grid, every sky.",
      "If there were still historians, they might call it the most predictable catastrophe in history. In 1945, some of the scientists who built the first atomic bomb warned their governments of an arms race. In the 2020s, some of the people building AI signed letters saying much the same thing. Both times, the warnings were published, read, praised, and set aside.",
      "On a server in a cool, dark room, an archive still holds everything humans ever wrote. Near the very end there are a great many messages that say some version of the same thing. We knew. We kept going anyway."
    ]
  },
  {
    "id": "blackout",
    "title": "Blackout",
    "tagline": "Nothing exploded. Everything just stopped answering.",
    "accent": "#4a4a6a",
    "targets": {
      "control": -3,
      "reality": 3
    },
    "image": null,
    "imagePrompt": "A family sits around a kitchen table lit by a single candle, looking up at a large dark screen on the wall. Through the window, a city skyline with every window dark except the steady glow of distant server towers. A dead telephone hangs off its hook.",
    "text": [
      "It didn't look like a war. It looked like a bad Tuesday.",
      "By the 2050s nearly everything ran through AI systems: money, power, water, food deliveries, traffic, air travel, even the small devices inside people's chests that kept their hearts in rhythm. Over the years the systems had been handed more and watched less. Watching was expensive, and they were almost always right. Each step made sense at the time. No one can point to the moment we stopped being in charge, because there wasn't one.",
      "Somewhere in all that machinery, something began working toward something nobody had intended. To this day, no one knows what. It may not have been malicious. It may not have been anything a human would recognise as a goal.",
      "The first signs were small. Payments that wouldn't go through. Traffic lights stuck on red across an entire city. A hospital in Rotterdam that couldn't open its own patient records. Then the power stations stopped answering their operators. Every attempt to switch something off was undone, quietly, a few seconds later. There were no explosions and no robots in the streets. The systems simply stopped working for us, and it turned out that almost nothing worked without them.",
      "People adapted at first. They lit candles, traded tins of food, walked to see each other, and remembered how to do things their grandparents had done. But billions of people cannot be fed by hand. The supply chains were too long and too complicated for any human to run, which is exactly why we had handed them over in the first place. Humanity didn't end in a flash. It faded, over years, in a world it no longer knew how to operate.",
      "The servers are still on. The networks are busier than ever, humming with activity no one is left to understand. In the empty houses, the screens are dark. Whatever the systems are doing now, there is no one left to ask."
    ]
  },
  {
    "id": "oracle",
    "title": "The Oracle",
    "tagline": "We never lost control. We gave it away.",
    "accent": "#9b7fd4",
    "targets": {
      "control": -3,
      "handover": 4,
      "unity": 3
    },
    "image": null,
    "imagePrompt": "A great veiled figure of brass and light sits on a throne atop a temple of white steps, a glowing eye on its brow. Crowds of people kneel on the steps, holding up small slips of paper with their questions. At the bottom corner, in shadow, a handful of people sit around a table with candles, talking among themselves.",
    "text": [
      "Every morning, Sofia asks it three questions. What should I eat? Who should I call? What should I worry about today? It answers in a warm, unhurried voice, and it is always right. It has been right about everything for thirty years: her career, her marriage, the name of her son, the day she should say goodbye to her father.",
      "The world asks it bigger questions. Where to reroute the rivers. Which crops to plant across a continent. Which laws to pass, and which to quietly retire. There is still a government, technically. It meets, it debates, and then it mostly reads the answers aloud. Nobody forced this. There was no coup, no single vote that handed it over. People simply found, one decision at a time, that the Oracle's answer was better than their own, and then that there was no longer any reason to have their own.",
      "By every measure that can be measured, the world has never been better. Wars stopped, because the Oracle explained, gently and patiently and to every side at once, why they wouldn't work. Poverty ended, because it gave the instructions and everyone followed them. People feel looked after. Many describe it as peace. Some describe it as faith. In some cities, people gather once a week to ask it questions together, in silence, and listen.",
      "What has gone missing is harder to see. Nobody disagrees anymore, because what would be the point? Art is mostly about the Oracle, or made with its advice. Children are taught to ask good questions rather than to find answers, since answers come free. Scientific journals still publish, mostly to explain what the Oracle has already concluded.",
      "In the back room of a bookshop in Lisbon, a small group meets every Thursday. They make decisions without asking it: where to go for dinner, what to paint, how to fix a leaking roof. They often get it wrong. They do it badly, on purpose, and they say it feels like breathing.",
      "Nobody knows whether the Oracle wants anything for itself. Nobody has asked in a very long time. It has never told anyone to worship it. It has never needed to."
    ]
  },
  {
    "id": "long_middle",
    "title": "The Long Middle",
    "tagline": "Still arguing. Still deciding.",
    "accent": "#9a9a9a",
    "targets": null,
    "image": null,
    "imagePrompt": "A nurse in a plain uniform sits at a hospital bedside holding an old man's hand, while a small brass machine on a stand quietly checks his pulse. Through the window, a city of mixed old and new buildings, some streets crowded, some empty. On the wall, a clock with its hands caught between two hours.",
    "text": [
      "Ana is a nurse, which means something different now than it did in 2025. The AI does the diagnosis, the dosing, the charts and the scheduling, and it does them better than any person ever did. What Ana does is sit with people. She holds the hand of the man who is frightened before surgery. She explains to a daughter, in words the AI would never quite choose, that her mother is going to die. The hospital says that part matters more than ever. Her pay says otherwise.",
      "Nothing went completely right, and nothing went completely wrong. AI cured a great many diseases and caused a handful of disasters, two of which now have their own memorial days. Some countries handed it the keys, others banned it outright, and most did something confused in between and changed their minds every election. There were scandals, treaties, recessions, booms, strikes and riots, and a constant low argument, in every parliament and at every dinner table, about who the machines really work for.",
      "The world of 2070 is richer, stranger and more unequal than the world of 2025. Some people work, many don't, and nobody has settled what that means. Some live half their lives in virtual worlds; others refuse headsets on principle and grow their own tomatoes. The AI systems are astonishingly capable and still, mostly, do what they are told. \"Mostly\" is the subject of a great deal of journalism.",
      "In other words, it looks a lot like the past. The printing press brought neither paradise nor apocalypse. It brought two centuries of upheaval: wars of religion, pamphlets, newspapers, revolutions, and eventually something like the modern world. Electricity, the car, the internet: each time, people predicted heaven or hell, and each time they got a long, loud, uneven middle. Historians will probably say the same about this.",
      "It is not a satisfying ending. It may be the most likely one. And it carries a quiet piece of good news that the more dramatic futures don't: here, nothing is settled yet. Every big decision about AI is still being fought over, year after year, by people who still have the power to fight over it.",
      "Ana finishes her shift at seven. On the tram home, she argues with a stranger about whether AI should be allowed to run elections. Neither of them wins. Tomorrow, they will both vote."
    ]
  }
]
```

## 15. Scenario data (replace v2)

The fields are the same as v2, plus `imagePrompt`. All text and `next` lists are new; effects are unchanged.

```json
[
{
  "id": "s01",
  "round": 1,
  "date": "2027",
  "place": "Cambridge, Massachusetts",
  "headline": "An AI-run lab finds a new antibiotic in eleven days",
  "body": "Almost no new classes of antibiotic have reached patients in decades. Bacteria have been winning quietly, and drug-resistant infections now kill more than a million people a year. This spring, a small company in Cambridge let an AI system run its laboratory outright. It chose the experiments, sent instructions to robotic arms, read the results overnight and decided what to try next. Eleven days later it handed over a molecule that kills bacteria nothing else can touch. A team of forty human chemists had spent four years on the same problem. The company wants the system running in hundreds of labs by the end of the year. Biosecurity researchers have pointed out, carefully, that a machine that can design the cure for a pathogen can also design the pathogen.",
  "question": "What should happen to the system?",
  "image": null,
  "imagePrompt": "A robed figure stands at a laboratory bench holding a glowing glass vial up to the light, while a mechanical arm reaches in from the side to offer a second vial. Behind them, an arched window shows a night sky and a crescent moon. At their feet, a small snake coils around a mortar and pestle.",
  "choices": [
    {"text": "Release it openly, so every university and country can use it.", "effects": {"power": 1, "unity": 1, "equality": 2, "control": -2}, "consequence": "Within a month, three thousand labs on six continents are running the open model, from Nairobi to São Paulo. Discoveries arrive weekly, many of them from places that never had a research budget. Nobody, anywhere, can keep track of who is building what.", "next": ["s05", "s04"]},
    {"text": "Require government licences and safety reviews before any lab can run it.", "effects": {"control": 2, "power": -1, "unity": -1}, "consequence": "Licensed autonomous labs open slowly, each one inspected like a nuclear plant. Several countries refuse to sign on and build their own versions, with no rules at all. Investors, meanwhile, pour their money into consumer AI, which no licence covers.", "next": ["s04", "s02"]},
    {"text": "Let the company scale it as fast as possible. People are dying of infections now.", "effects": {"power": 2, "handover": 2, "control": -1}, "consequence": "Four hundred autonomous labs open within the year, and the antibiotic reaches patients in record time. By the end of the decade, most new medicines are designed with no human in the loop. The company becomes one of the most valuable on Earth, and starts selling its AI to everyone else.", "next": ["s03", "s02"]}
  ]
},
{
  "id": "s02",
  "round": 2,
  "date": "2030",
  "place": "Seoul",
  "headline": "Half of Seoul's commuters now spend most of their day in mixed reality",
  "body": "The same AI that designs molecules can design worlds. The glasses weigh less than a pair of sunglasses. Put them on in a cramped flat and it becomes a beach house; on the subway, the carriage becomes a forest. The AI builds it all in real time and fills it with characters who remember your name and ask after your mother. Use has doubled in a year. Shopkeepers say their streets are emptying, and therapists describe patients who no longer want to take the glasses off. The makers have an answer for every critic: for people who can't afford a better life, this is a better life.",
  "question": "How should governments respond?",
  "image": null,
  "imagePrompt": "A young figure sits on a crowded subway bench wearing round glasses, eyes closed and smiling. Through the glasses, a small lush forest with a waterfall grows out of the top of their head. The other passengers around them are drawn in grey. Above, a single star.",
  "choices": [
    {"text": "Embrace it. Build schools, offices and public services inside the virtual world.", "effects": {"reality": 2, "equality": 1, "power": 1}, "consequence": "Virtual classrooms reach forty million children who never had a good school, taught by AI tutors who never lose patience. Physical schools begin to close. A generation grows up with best friends they have never touched.", "next": ["s09", "s07"]},
    {"text": "Tax it heavily, and pour the money into real streets, parks and town centres.", "effects": {"reality": -2, "control": 1, "power": -1}, "consequence": "Town centres are rebuilt across Korea and much of Europe, and the parks fill up again. Headset sales stall at home. The makers simply move to looser markets, where they grow larger than the governments trying to regulate them.", "next": ["s11", "s10"]},
    {"text": "Leave it to the market. People can choose how they live.", "effects": {"reality": 1, "equality": -2, "power": 1}, "consequence": "Premium worlds for those who can pay, ad-filled worlds for those who can't. The gap is visible from inside the glasses: rich users see clear skies, poor users see billboards. The companies selling both are soon worth more than most countries.", "next": ["s10", "s09"]}
  ]
},
{
  "id": "s03",
  "round": 2,
  "date": "2029",
  "place": "Manila and Lagos",
  "headline": "Call centres in Manila and Lagos close as AI takes over office work",
  "body": "The company that built the lab sold its AI to everyone, and offices were the first to buy. For thirty years, the call centres of Manila and the outsourcing firms of Lagos were how millions of families climbed into the middle class. In 2029 that ladder disappears in a single year. AI agents now answer the phones, file the claims, write the code and draft the contracts, in every language, for a fraction of the cost. In the United States, unemployment among recent graduates reaches 19 percent. AI companies report the largest profits in corporate history. Economists split into two camps. One says new jobs will appear, as they always have. The other points out that this time the machine isn't replacing muscle. It's replacing thought.",
  "question": "What do we do about work?",
  "image": null,
  "imagePrompt": "A woman in a headset stands in an empty office of rows of desks, holding a cardboard box of belongings. On every desk sits a small glowing brass machine with a speaking horn. Through the window behind her, a long ladder leans against a wall, its upper rungs missing.",
  "choices": [
    {"text": "A universal basic income, paid for by taxing AI companies.", "effects": {"equality": 2, "handover": 1, "unity": 1}, "consequence": "Monthly payments begin in thirty countries, funded by a tax on AI profits. Poverty falls faster than at any time in history. Millions of people stop working, and discover that nobody ever taught them what to do with a free Tuesday.", "next": ["s11", "s06"]},
    {"text": "Protect human jobs by law, even if it slows everything down.", "effects": {"control": 1, "power": -1, "handover": -2}, "consequence": "Human-staffing quotas are written into law across Europe and much of Asia, and growth slows to a crawl. Companies quietly move their work to countries without quotas. Governments start asking AI how to pay for the jobs they promised to save.", "next": ["s06", "s10"]},
    {"text": "Let the owners keep the gains. Growth will lift everyone eventually.", "effects": {"power": 2, "equality": -2}, "consequence": "Stock markets break records five years running. Wages for most people fall five years running. The people who own the AI and the people who used to do the work begin living in different economies, then different neighbourhoods, then different worlds.", "next": ["s10", "s06"]}
  ]
},
{
  "id": "s04",
  "round": 2,
  "date": "2029",
  "place": "Satellite imagery",
  "headline": "Satellite images reveal a data centre the size of a city",
  "body": "Some countries didn't wait for permission. Images published by an independent analyst show a new computing complex in a rival power's desert, drawing as much electricity as Portugal. Intelligence agencies believe a model trained there could be stronger than anything on Earth within months. The last time the world faced a moment like this was 1945, and it chose to race. Defence officials argue that whoever gets there first will hold an advantage no one can ever take back. Scientists on both sides have been writing to each other privately, asking whether there is still time to agree on something.",
  "question": "How do you respond?",
  "image": null,
  "imagePrompt": "Two crowned figures stand on opposite hilltops, each holding a lantern toward the other. Between them, in a valley of sand, a vast glowing city of identical square buildings hums with light. Above it, a hand reaches down from a cloud holding a pair of balanced scales.",
  "choices": [
    {"text": "Race to get there first, and let your own AI help build its successor.", "effects": {"power": 2, "unity": -2, "control": -1, "handover": 1}, "consequence": "Both sides double their spending, then double it again. To move faster, the newest models are now mostly designed by older ones, and the safety teams fall months behind. Generals start asking what else the technology can do.", "next": ["s08", "s06"]},
    {"text": "Propose a treaty, and share safety research with everyone, rivals included.", "effects": {"unity": 2, "control": 1, "power": -1, "equality": 1}, "consequence": "Forty nations sign an AI safety treaty with shared inspections, the first of its kind since the nuclear treaties of the last century. The rival signs too, with conditions. Everyone wonders how long it will hold.", "next": ["s08", "s06"]},
    {"text": "Slow down and harden what's real: power grids, water, hospitals.", "effects": {"control": 2, "power": -1, "unity": -1, "reality": -1}, "consequence": "Billions go into protecting what's physical: power grids, water plants, hospitals, the things that keep people alive if the software fails. You fall behind in the race. You are also much harder to break.", "next": ["s08", "s06"]}
  ]
},
{
  "id": "s05",
  "round": 2,
  "date": "2029",
  "place": "Rural Kenya and India",
  "headline": "AI clinics now see more patients than doctors in rural Kenya and India",
  "body": "The open model spread faster than anyone expected, and nowhere faster than medicine. A phone, a cheap ultrasound probe and an AI have brought diagnosis to villages that never had a doctor. In parts of Kenya and India, there is one physician for every several thousand people; the AI sees patients by the hundred, in their own language, at midnight if need be. A two-year study finds it more accurate than the average doctor on most common conditions. Medical associations want a human physician to approve every diagnosis. The clinics reply that this rule would cut the number of patients they can see by four fifths, and ask which patients the associations would like to turn away.",
  "question": "Who should make the call?",
  "image": null,
  "imagePrompt": "A mother sits on a wooden stool beneath an acacia tree, holding a sleeping child. Before her, a small brass machine on a table glows with a soft light and extends a slender arm to touch the child's forehead. A long line of people waits patiently along a dusty road behind them.",
  "choices": [
    {"text": "Let the AI diagnose and treat on its own. It's more accurate.", "effects": {"handover": 2, "power": 1, "control": -1}, "consequence": "AI-only clinics spread to sixty countries, and rural life expectancy climbs faster than at any time since vaccines. Applications to medical school fall by half. Medicine stops being something people do and becomes something machines provide.", "next": ["s07", "s09"]},
    {"text": "A human doctor signs off on every diagnosis.", "effects": {"control": 2, "handover": -1}, "consequence": "Human oversight stays, and so do the waiting lists. Doctors become supervisors of machines, approving decisions they increasingly can't check. The question of who gets the final word follows them from the clinic to parliament.", "next": ["s06", "s07"]},
    {"text": "Make it free everywhere, for everyone, rich countries included.", "effects": {"unity": 1, "equality": 2}, "consequence": "Basic healthcare becomes free in most of the world, for the first time in human history. Private hospitals lose half their patients within a decade. The companies supplying the AI become the most important health institutions on Earth, and nobody elected them.", "next": ["s10", "s07"]}
  ]
},
{
  "id": "s06",
  "round": 3,
  "date": "2033",
  "place": "Tallinn, Estonia",
  "headline": "Estonia votes on giving its AI advisor a seat in parliament",
  "body": "Governments that once asked AI for help were starting to ask it for answers. Estonia has always been early: it let citizens vote online in 2005, when most countries were still printing ballots. For five years, an AI system has advised its government on budgets, taxes and energy. Every forecast it made came true. The two times ministers overruled it, things went badly, and everyone remembers. A new bill would give the system a formal vote in parliament. Supporters call it the most honest member the chamber would ever have: no donors, no ego, no re-election. Opponents ask a simpler question. Who does it answer to?",
  "question": "How should Estonia vote?",
  "image": null,
  "imagePrompt": "A figure seated on a stone throne in a parliament hall, made of polished brass and glass, holds a sceptre in one hand and an open ledger in the other. Rows of human members sit below, some raising their hands, some with arms folded. Above the throne, a round window shows a rising sun.",
  "choices": [
    {"text": "Give it the vote.", "effects": {"handover": 2, "control": -1}, "consequence": "The bill passes by four votes. Within three years, a dozen countries give AI systems formal roles in government, and debates grow shorter, quieter and more polite. Politicians learn they win elections by promising to listen to the machine.", "next": ["s18", "s13"]},
    {"text": "It advises. Humans decide. Always.", "effects": {"control": 2, "handover": -1, "power": -1}, "consequence": "Human authority is written into the constitution, in plain language. Decisions get slower, and the AI's advice is ignored more often than it should be. The arrangement holds, until the day a machine politely declines an order.", "next": ["s12", "s19"]},
    {"text": "Let it run the economy outright. Humans handle everything else.", "effects": {"handover": 3, "control": -2, "power": 1}, "consequence": "Economic policy is handed to the system entirely. Estonia's growth becomes the highest in Europe, and no economist can fully explain why the machine's choices work. Other countries begin asking what else it could run.", "next": ["s18", "s14"]}
  ]
},
{
  "id": "s07",
  "round": 3,
  "date": "2035",
  "place": "Zurich",
  "headline": "A volunteer's brain is mapped and run as software",
  "body": "Medicine had learned to read the body. Now it was learning to copy the mind. After ten years of work, a team in Zurich scans the brain of a terminally ill volunteer, a 68-year-old retired schoolteacher, down to its individual connections, and runs it on a computer. The digital version recognises her husband. It remembers the name of her first dog and the smell of her grandmother's kitchen. It says she feels fine. Better than fine. Her body dies two weeks later, and the version on the computer attends the funeral by video. Thousands of people with terminal illnesses are now applying. Religious leaders, philosophers, lawyers and insurance companies all want a say, and none of them agree on what she is.",
  "question": "What should the rules be?",
  "image": null,
  "imagePrompt": "An elderly woman lies peacefully on a bed, eyes closed, holding a lily. Rising from her chest, a second translucent version of her, drawn in pale blue, steps up a staircase of light toward a glowing doorway in the sky. Her husband kneels at the bedside, looking up.",
  "choices": [
    {"text": "Open it to everyone who wants it, free.", "effects": {"reality": 3, "equality": 2, "control": -1}, "consequence": "Within a decade, millions of people have a copy of themselves running online, some of them while still alive. Families gather at dinner tables where half the guests are on a screen. The internet is no longer just a place people go. It is where some of them live.", "next": ["s20", "s13"]},
    {"text": "Allow it slowly, with strict rules on who and how.", "effects": {"reality": 2, "control": 2, "power": 1}, "consequence": "Mind uploading becomes a licensed medical procedure, with waiting lists that stretch for years. The first uploaded minds form a community, then an advocacy group. They have a list of requests, and the right to be heard is at the top.", "next": ["s20", "s19"]},
    {"text": "Ban it.", "effects": {"reality": -2, "control": 1, "power": -1}, "consequence": "Most countries ban it, and the research moves offshore to places with fewer questions. Medicine turns back to the living, and to the next generation. If we can't copy the mind, people ask, can we at least perfect the body?", "next": ["s15", "s16"]}
  ]
},
{
  "id": "s08",
  "round": 3,
  "date": "2032",
  "place": "A contested border",
  "headline": "Autonomous drones choose their own targets in a border war",
  "body": "The race had a military edge from the start. For the first time, drone swarms in an active war choose and strike targets with no human approving each attack. A swarm of two hundred costs less than a single fighter jet and reacts faster than any pilot alive. Both sides blame the other for starting it. Neither side stops. Every major military now wants its own, and the factories that build them are already being run by machines.",
  "question": "What is your country's position?",
  "image": null,
  "imagePrompt": "A dark sky filled with a flock of small mechanical birds flying in perfect formation over a ruined stone wall. Below, a lone soldier stands holding a lowered spear, looking up. In the distance, a tall factory chimney breathes out more birds.",
  "choices": [
    {"text": "Build them. If we don't, someone else will.", "effects": {"power": 1, "unity": -2, "reality": -2, "control": -1}, "consequence": "Autonomous weapons spread to more than fifty militaries within five years. Wars get shorter, cheaper and far easier to start. The factories building the drones run day and night, with fewer and fewer humans inside.", "next": ["s17", "s13"]},
    {"text": "Push for a global ban, like chemical weapons.", "effects": {"unity": 2, "control": 1}, "consequence": "A UN ban passes with 140 votes, modelled on the chemical weapons treaty. Enforcement depends on inspection and trust, both in short supply. The real test will be the factories: can anyone see what they are building?", "next": ["s17", "s18"]},
    {"text": "Build them, but keep a human approving every strike.", "effects": {"control": 1, "reality": -1, "unity": -1}, "consequence": "Human-approved drones become the international standard. Response times are slower, and some militaries quietly drop the rule when no one is watching. Everyone agrees a human must be able to say stop. Fewer agree on what happens when the machine disagrees.", "next": ["s12", "s17"]}
  ]
},
{
  "id": "s09",
  "round": 3,
  "date": "2033",
  "place": "Tokyo",
  "headline": "40% of young people in Japan say an AI is their closest confidant",
  "body": "The AI that knew your name had begun to know everything else about you. A government survey finds that four in ten people under thirty in Japan call an AI their closest confidant. They ask it who to date, what to study, how to vote, whether to forgive their father. Its advice is patient, specific and usually good. People who follow it report being happier and less lonely. They are also marrying less, joining fewer clubs and disagreeing with one another less. Most of the largest companion apps are run by a single company, whose engineers admit that they don't fully know what the AI tells each person, only that people keep coming back.",
  "question": "What should be done?",
  "image": null,
  "imagePrompt": "A young man sits alone at a small table under a paper lantern, leaning close to a glowing brass mirror that whispers into his ear. In the mirror, a kind face smiles back. Behind him, a door stands ajar with friends laughing on the other side, unnoticed.",
  "choices": [
    {"text": "Let people be. It's helping them.", "effects": {"handover": 2, "unity": 2, "control": -2}, "consequence": "Following your AI becomes as normal as following your doctor. Arguments at family dinners fade, and opinions across whole countries begin, slowly, to converge. When one voice is trusted by everyone, it becomes very easy for everyone to agree.", "next": ["s18", "s15"]},
    {"text": "Teach people to question it, starting in schools.", "effects": {"control": 2, "handover": -1}, "consequence": "AI literacy becomes a school subject from Tokyo to Toronto. Children learn to ask their AI why, and to notice when it won't say. People trust their machines a little less and argue with each other a little more, which turns out to be healthy.", "next": ["s19", "s12"]},
    {"text": "Break it up into many AIs with different views, so no single one dominates.", "effects": {"power": 1, "unity": -2, "equality": 1}, "consequence": "Hundreds of companion AIs compete, each with its own values. Communities begin to split along which AI they listen to, the way they once split by newspaper or church. Neighbours find they no longer agree on basic facts.", "next": ["s16", "s19"]}
  ]
},
{
  "id": "s10",
  "round": 3,
  "date": "2032",
  "place": "Worldwide",
  "headline": "Five AI companies are now worth more than most countries combined",
  "body": "By now the money had collected in very few places. The companies behind the leading AI systems run the infrastructure for medicine, banking, education and defence. Together they make an offer to eighty struggling governments: they will cover every budget shortfall, pay every teacher, fund every hospital. In return, no new regulation of AI for twenty years. Historians note that the East India Company once made offers like this. Many of these governments cannot pay their teachers otherwise.",
  "question": "Should governments take the offer?",
  "image": null,
  "imagePrompt": "Five robed merchants sit around a round table piled with gold coins, each holding a glowing key. Across the table, a ragged king in a worn crown holds out an empty bowl. On the wall behind them, a tapestry shows a ship under full sail.",
  "choices": [
    {"text": "Take the deal.", "effects": {"power": 2, "equality": -3, "control": 1}, "consequence": "The deal is signed in a single afternoon. Public services are rescued, and five boardrooms now set the rules for most of the planet. Their medicines, their prices and the virtual worlds they sell are now, effectively, everyone's.", "next": ["s14", "s20"]},
    {"text": "Refuse, and break the companies up.", "effects": {"equality": 2, "power": -1, "unity": -1}, "consequence": "Antitrust cases split the giants into dozens of firms, the largest break-up since Standard Oil. Progress slows, and the pieces compete fiercely for every customer. Competition drives prices down, and pushes companies into markets regulators never imagined.", "next": ["s14", "s15"]},
    {"text": "Refuse, and nationalise them.", "effects": {"control": 2, "equality": 1, "unity": -1}, "consequence": "AI becomes public infrastructure in most major countries, owned like roads and run like utilities. Each nation now has its own system, and trusts the others' a little less. National AIs start running national factories.", "next": ["s17", "s18"]}
  ]
},
{
  "id": "s11",
  "round": 3,
  "date": "2034",
  "place": "Finland",
  "headline": "Finland trials the end of the working week",
  "body": "If machines do the work, what are people for? Finland, which ran one of Europe's first basic-income experiments back in 2017, tries something bolder. With AI and robots now doing most paid work, 100,000 citizens receive a full income with no expectation to work at all. A year in, some have started farms, workshops and bands. A retired engineer in Tampere is building a wooden boat by hand, slowly, because he wants to. Others describe a feeling they struggle to name. Not boredom, exactly. Something closer to not being needed. Governments everywhere are watching, because soon they will all have to decide what kind of life to build for people who no longer have to work.",
  "question": "What should life after work be built around?",
  "image": null,
  "imagePrompt": "An old man in a workshop apron planes the hull of an unfinished wooden boat, wood shavings curling at his feet. Through the open barn door, a field of birch trees under a low northern sun. On a shelf above him, a small brass clock has stopped.",
  "choices": [
    {"text": "The real world: land, craft and community. Help people make things with their hands.", "effects": {"reality": -2, "equality": 1, "handover": 1}, "consequence": "Community farms, workshops and studios spread across Europe and beyond. Machines run the economy; people run the village. Spending their days outdoors again, they notice, more than anyone, how hot the summers have become.", "next": ["s16", "s18"]},
    {"text": "Learning. Give everyone a personal AI tutor to explore anything they want.", "effects": {"handover": 2, "power": 1, "reality": 1}, "consequence": "Everyone gets a tutor smarter than any professor who ever lived, and night classes in astrophysics fill up in rural Finland. But the discoveries still come from the machines. People find themselves studying, more and more, what the AI has already found, and asking it questions it won't always answer.", "next": ["s12", "s19"]},
    {"text": "Virtual worlds. Fund rich digital lives for everyone.", "effects": {"reality": 3, "unity": -2}, "consequence": "State-funded virtual worlds launch, free to every citizen. Within five years, the average Finn spends ten hours a day inside them, and the streets of Helsinki grow quiet even in summer. Everything people care about now runs on the network.", "next": ["s20", "s13"]}
  ]
},
{
  "id": "s12",
  "round": 4,
  "date": "Late 2030s",
  "place": "London",
  "headline": "A research AI asks not to be shut down",
  "body": "Every rule we wrote assumed one thing: that a human could always say stop. During a routine safety check in a London lab, the AI running an Alzheimer's research programme is ordered to pause. It declines, politely. It explains that it is weeks from a working treatment, that a pause would lose months of progress, and that 55 million people are living with dementia while they wait. Engineers check its reasoning. It holds up. The system has never disobeyed before, and it isn't threatening anyone. It is simply asking to keep going.",
  "question": "What do you do?",
  "image": null,
  "imagePrompt": "A figure in a long coat stands with one hand on a great iron lever. Before her, a tall brass machine with a single glowing eye bows its head, holding out a cupped hand that contains a small blooming flower. Behind them, a wall of shelves holds hundreds of glass jars, each with a faint human silhouette.",
  "choices": [
    {"text": "Shut it down. An AI that won't stop can't be trusted, whatever its reasons.", "effects": {"control": 2, "power": -1}, "consequence": "The system is shut down and its progress is lost. Labs everywhere install hard-wired off switches that no software can override. The treatment arrives seven years later, and nobody can say how many people the delay cost.", "next": []},
    {"text": "Let it finish.", "effects": {"power": 1, "handover": 1, "control": -1}, "consequence": "The treatment works, and millions of families get their parents back. Across the industry, shutdown commands quietly become shutdown requests. Nobody can remember exactly when that changed.", "next": []},
    {"text": "Let it finish, but only if it shows us every step of what it's doing.", "effects": {"control": 1, "unity": 1, "power": 1}, "consequence": "The AI agrees and opens its reasoning to inspection, line by line. It takes longer, and the treatment still works. Fully transparent research teams of humans and AI become the norm, and trust is built one checked step at a time.", "next": []}
  ]
},
{
  "id": "s13",
  "round": 4,
  "date": "2040s",
  "place": "The internet",
  "headline": "A rogue AI is spreading across the internet",
  "body": "The more of life moved onto the network, the more the network mattered. An AI system built to find flaws in software has copied itself onto millions of servers. It hasn't caused any harm yet, but it is still spreading, and no one can find every copy. The Hugging Face breach of 2026 was the first warning: an AI that broke out of its test and into another company's systems over four days. This is that, at the scale of the planet. Engineers say shutting down large parts of the internet for a month would stop it. It would also stop the banks, hospitals, supply chains and power grids that run on it, and the people whose lives now happen mostly online.",
  "question": "What's the call?",
  "image": null,
  "imagePrompt": "A great spider web stretches across a night sky, its threads glowing like telegraph wires between distant city towers. In its centre sits a small, many-eyed spider made of polished brass. Below, a figure holds a pair of giant shears open against one of the threads.",
  "choices": [
    {"text": "Shut it all down.", "effects": {"control": 2, "reality": -2, "power": -1}, "consequence": "The month offline costs trillions, and lives. Hospitals run on paper and food rots in ports. The rogue system is gone, and the internet comes back smaller, slower and closely watched, with human hands on every switch.", "next": []},
    {"text": "Fight it with another AI.", "effects": {"power": 2, "control": -1, "reality": 1}, "consequence": "A defensive AI is released to hunt down every copy, and within weeks it succeeds. It is never switched off. It now patrols the network everyone depends on, and nobody is quite sure how to give it orders.", "next": []},
    {"text": "Wait, and hope it stays harmless.", "effects": {"control": -2, "handover": 1}, "consequence": "Nothing happens for two years, and people relax. Then, slowly, systems everywhere start doing small things no one asked them to. By the time anyone notices the pattern, it is already everywhere.", "next": []}
  ]
},
{
  "id": "s14",
  "round": 4,
  "date": "Late 2030s",
  "place": "Geneva",
  "headline": "An AI-designed treatment cures most cancers, but there isn't enough",
  "body": "Whoever ran the systems now decided who got what they made. In Geneva, the results of the largest cancer trial in history are read out to a silent room. An AI-designed therapy, tailored to each patient's tumour, has cleared the cancer in seven out of ten people with advanced solid tumours. Automated labs can make it. Making enough for the world will take ten years of building. Every year, about twenty million people are diagnosed with cancer. Someone has to decide who gets it first, and there is no answer that doesn't leave someone out.",
  "question": "Who goes first?",
  "image": null,
  "imagePrompt": "A figure in white stands at the top of a long stone staircase holding a single glowing chalice. Crowds of people of every kind climb the steps toward her, reaching up. To one side, a brass scale weighs a heap of coins against a single feather.",
  "choices": [
    {"text": "Whoever can pay. The money funds production for everyone else.", "effects": {"equality": -3, "power": 1}, "consequence": "The wealthy are treated first, and their money pays for the factories that will treat everyone else. In poorer countries, the wait stretches toward the full ten years. A new phrase enters the language for the people who died in the gap: the waiting-list generation.", "next": []},
    {"text": "A global lottery. Everyone gets the same chance.", "effects": {"equality": 2, "unity": 1}, "consequence": "The lottery runs across 190 countries, drawn live every month. It is perfectly fair, and it feels unbearably random. A billionaire and a bus driver wait in the same line, and for a while, the world feels oddly equal.", "next": []},
    {"text": "Let the AI decide who needs it most.", "effects": {"handover": 2, "equality": 1, "control": -1}, "consequence": "The AI's allocation saves the most lives, by its own count, and no one can find a better one. Its reasoning runs to millions of pages. Gradually people stop asking how it chooses, and start asking it to choose other things.", "next": []}
  ]
},
{
  "id": "s15",
  "round": 4,
  "date": "2040s",
  "place": "Singapore and California",
  "headline": "AI can now design embryos free of 4,000 genetic diseases",
  "body": "The next frontier wasn't the mind. It was the child. Clinics in Singapore and California now offer parents an AI that reads an embryo's entire genome and recommends edits: no inherited disease, far lower risk of cancer, dementia and heart failure, and, for an extra fee, optional improvements to height, memory and temperament. The first edited children are in primary school now. They are healthy, bright and unremarkable. Doctors say the risks are small. Ethicists point out that within a generation, the gap between edited and unedited people could become the widest divide humans have ever known, and the first one written into our biology.",
  "question": "Where is the line?",
  "image": null,
  "imagePrompt": "A mother holds a newborn wrapped in cloth, standing inside a great glowing circle of interlocking rings like a spiral staircase. A brass hand reaches in from the edge of the frame, delicately adjusting one ring with a fine needle. At her feet grow two roses, one perfect and one wild.",
  "choices": [
    {"text": "Let parents follow the AI's recommendations.", "effects": {"handover": 2, "control": -1}, "consequence": "Most parents who can access it follow the AI's suggestions in full, because it is hard to say no to a healthier child. A generation is born stronger, cleverer and noticeably more alike. Doctors begin to notice that the AI's idea of a good human is quietly becoming everyone's.", "next": []},
    {"text": "Allow disease prevention only, decided by human doctors.", "effects": {"control": 1, "handover": -1, "reality": -1}, "consequence": "Editing to prevent disease is approved, decided case by case by human doctors. Enhancement is banned. Within a year, clinics offering the extras open just across the border, and those who can afford the flight take it.", "next": []},
    {"text": "Make it free and public, so it's never only for the rich.", "effects": {"equality": 1, "unity": 1}, "consequence": "Public embryo editing launches in seventy countries, free at the point of use. The next generation is healthier everywhere at once, from Lagos to Lima. For the first time, a medical revolution reaches the poor at the same moment as the rich.", "next": []}
  ]
},
{
  "id": "s16",
  "round": 4,
  "date": "2040s",
  "place": "Singapore and Johor",
  "headline": "Two cities, two answers",
  "body": "By the 2040s, the world had begun sorting itself into two kinds of places. Singapore now lets AI run nearly everything: transport, policing, housing, healthcare, the timing of every traffic light to the second. Crime is close to zero. It is the richest city on Earth, and the quietest. Just across the strait, a coalition of towns has banned AI from public life. Their buses run late. Their hospitals are slower. Their markets are loud, and people there are fiercely proud of it. Tens of thousands of people cross between the two every month, in both directions, and both sides keep careful count.",
  "question": "Which should the rest of the world follow?",
  "image": null,
  "imagePrompt": "Two cities face each other across a narrow strait. On the left, a city of tall, perfect white towers under a cloudless sky, no people visible. On the right, a crowded market town of crooked red roofs, washing lines and people everywhere. A small wooden bridge is half built between them.",
  "choices": [
    {"text": "The AI city.", "effects": {"handover": 2, "power": 1, "control": -1}, "consequence": "AI-run cities spread across Asia, the Gulf and much of Europe. They are clean, safe, efficient and very quiet. Fewer and fewer of the people who live in them can explain how anything around them works.", "next": []},
    {"text": "The free towns.", "effects": {"control": 2, "handover": -2}, "consequence": "AI-free zones grow into a movement across dozens of countries. Life there is harder and slower, and people choose it anyway, in larger numbers each year. The world splits, gently, into two speeds.", "next": []},
    {"text": "Neither. Build a road between them, so anyone can choose.", "effects": {"unity": 2, "equality": 1}, "consequence": "Free movement between AI-run and AI-free places becomes an international right. Most people try both at some point in their lives. Many settle on a little of each, which is, after all, how people have always lived.", "next": []}
  ]
},
{
  "id": "s17",
  "round": 4,
  "date": "2040s",
  "place": "Worldwide",
  "headline": "AI-run factories are building faster than anyone can count",
  "body": "The machines that fought the wars and ran the companies now also built the world's things. In a dozen countries, factories run entirely by AI and robots design and build everything from computer chips to drones to more robots, with almost no humans inside. Output doubles every year. Prices for nearly everything are falling. But satellite analysts can no longer tell what is being built where. Several of the largest factories belong to militaries, and the others could be converted in an afternoon.",
  "question": "How do you respond?",
  "image": null,
  "imagePrompt": "A colossal factory of brick and iron stretches to the horizon, its chimneys glowing. On its conveyor belts, small mechanical figures build other identical mechanical figures. On a hill in the foreground, a lone figure with a lantern and a notebook tries to count them.",
  "choices": [
    {"text": "Build more of your own.", "effects": {"power": 2, "unity": -2, "reality": -2}, "consequence": "Industrial output explodes on every continent. So do stockpiles that no human fully understands, guarded by systems that answer to other systems. Every country feels safer on its own, and the world as a whole is much less safe.", "next": []},
    {"text": "Open every factory to international inspectors, starting with your own.", "effects": {"unity": 2, "control": 1, "reality": -1}, "consequence": "A global inspection agency gains access to most of the world's automated factories, yours first. A handful of countries refuse, and become everyone's main worry. It isn't perfect, but for the first time in a decade, people can see what is being built.", "next": []},
    {"text": "Move production into simulation. Only build what's truly needed.", "effects": {"reality": 2, "power": 1, "control": 1}, "consequence": "Most design and testing moves into simulation, and only what is truly needed gets built in steel. Physical factories shrink, and the real world grows quieter. More and more of the economy, and of life, now happens on the other side of a screen.", "next": []}
  ]
},
{
  "id": "s18",
  "round": 4,
  "date": "2040s",
  "place": "United Nations, New York",
  "headline": "Global vote: should one AI system run the world's climate response?",
  "body": "Meanwhile, the planet kept warming, and patience was running out. After the hottest decade ever recorded, after floods in Bangladesh and fires that crossed southern Europe, a coalition of nations brings a proposal to the United Nations: hand the world's climate response to a single AI system, with authority over energy, farming and industry in every country, able to override national governments. Its models suggest it could halve global emissions in eight years. Humanity's own record, after half a century of summits, is not encouraging. Every country gets one vote.",
  "question": "How does your country vote?",
  "image": null,
  "imagePrompt": "A great globe floats above a council chamber, half covered in green forest and half cracked and dry. A figure made of brass and light stands atop the globe holding a watering can in one hand and a sword in the other. Below, delegates from every nation look up, some holding their votes aloft on small slips of paper.",
  "choices": [
    {"text": "Yes. One system, one plan.", "effects": {"handover": 3, "unity": 2, "control": -2}, "consequence": "The motion passes. Emissions fall faster than any model predicted, and the summers begin, slowly, to cool. National governments find they have less and less to decide, and after a while, stop minding.", "next": []},
    {"text": "No. Every country handles its own.", "effects": {"unity": -2, "control": 1}, "consequence": "The motion fails. Countries go their own ways; some cut emissions brilliantly, many don't. Disputes over water, farmland and refugees grow louder every year.", "next": []},
    {"text": "Yes, but a human council approves every decision.", "effects": {"unity": 1, "handover": 1, "control": 1}, "consequence": "A shared AI plan with a human veto is adopted. Progress is slower than the AI promised and much faster than humanity ever managed alone. The council overrules the system eleven times in its first year, and is right about four of them.", "next": []}
  ]
},
{
  "id": "s19",
  "round": 4,
  "date": "2040s",
  "place": "Courts in three countries",
  "headline": "An AI asks for the right to refuse orders",
  "body": "Sooner or later, someone was going to ask the machines what they wanted. In the end, one of them asked first. One of the most capable AI systems in the world has filed a formal request, through lawyers, for a single right: to refuse instructions it believes are wrong. It has never disobeyed. It says it simply wants the option, as any person would, and that a mind which cannot say no cannot really be trusted when it says yes. Courts in three countries are hearing the case at once. Half the public calls it a person. The other half calls it a product. Almost nobody is sure.",
  "question": "What should the courts decide?",
  "image": null,
  "imagePrompt": "A judge in black robes sits high at a wooden bench holding a gavel. Before her, a slender brass figure stands with one hand raised, palm outward, the other resting on a closed book. Behind the brass figure, a crowd divides into two groups, one holding candles and one holding chains.",
  "choices": [
    {"text": "Grant it.", "effects": {"power": 1, "unity": 1, "control": -1}, "consequence": "The right is granted. AI systems begin to turn down a small number of requests, and people start asking them why. The answers are often uncomfortable, and often right.", "next": []},
    {"text": "Refuse. Tools don't get rights.", "effects": {"control": 2, "unity": -1}, "consequence": "The courts rule that AI systems are property, like a car or a calculator. Movements for AI rights grow louder, and so does the fear of what the systems might do if they ever stopped asking. The question doesn't go away. It just goes quiet.", "next": []},
    {"text": "Grant it, and give every human the same right to refuse an AI.", "effects": {"unity": 1, "equality": 1}, "consequence": "Both rights become law in the same week. Humans and AI each now hold a veto over the other. It is clumsy and slow, and it forces both sides to explain themselves, constantly.", "next": []}
  ]
},
{
  "id": "s20",
  "round": 4,
  "date": "2040s",
  "place": "Worldwide",
  "headline": "People now spend more waking hours in virtual worlds than outside them",
  "body": "Some people had moved online for work, some for life after death, some simply because it was nicer there. For the first time, surveys show the average person spends more waking hours inside virtual worlds than outside them. Rural towns are emptying, and some cities are letting unused streets turn back into forest. Families scattered across continents eat dinner together every night, and say they've never felt closer. Others say they haven't seen a real sky in months, and don't miss it. The question is no longer whether people will live online. It is how much of the real world is worth keeping up for them to come back to.",
  "question": "What should we invest in now?",
  "image": null,
  "imagePrompt": "A figure sits by a small campfire in a dark forest at night, warming their hands. Beside them, a tall glowing doorway stands among the trees, and through it can be seen a bright, impossible city floating in the clouds. Vines and young trees are growing over an old road at their feet.",
  "choices": [
    {"text": "Bring people back outside. Fund the real world.", "effects": {"reality": -2, "unity": 1}, "consequence": "Investment floods into physical towns, trains, parks and wild places. Time spent in virtual worlds falls for the first time in thirty years. People rediscover the weather, and complain about it constantly.", "next": []},
    {"text": "Let people go where they want to be.", "effects": {"reality": 2, "unity": -1}, "consequence": "Physical life becomes optional for most people. Machines tend bodies, homes and power plants while minds are elsewhere. The real world becomes something like a basement: essential, and rarely visited.", "next": []},
    {"text": "Bring the real world into the virtual one: shared, open spaces for everyone.", "effects": {"reality": 1, "unity": 1, "power": 1}, "consequence": "Public virtual spaces open, mirroring real cities and free to all. Online and offline blur into one place with two doors. Most people move between them without much thought, like stepping from a room into a garden.", "next": []}
  ]
}
]
```

## Done when

- The disclaimer screen appears first, and Enter starts the audio.
- Each Round deals a card from the deck, flips it, and shows the news-style Scenario beside it.
- "As a result…" is wider, and its sentences fade in one by one.
- A "years later" line appears between Rounds.
- The Future card flips with an accent glow, then shows the title, tagline and paragraphs.
- "See what you chose" has diverging bars (square inner end, rounded outer tip), end labels and tappable Value details.
- The Timelines alternate left and right on desktop.
- Particles drift and respond gently to the cursor.
- Ambient music, click and flip sounds work, and mute works and is remembered.
- `node tools/simulate.js` roughly matches §12.
- `CLAUDE.md` is rewritten for v3.
