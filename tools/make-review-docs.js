// Builds the two Word documents Levi reviews and comments on, straight from site/content/story.md:
//   docs/review/futures-review.docx every Future: tagline, description, the story in the game with
//                                its image prompt, alternative stories from the archive, the Path
//                                and how a player reaches it
//   docs/review/cards-review.docx every card by round, then the Events, tipping points and
//                                milestones, each with when it appears and what each Choice does
// The look follows the earlier futures review (make_doc.js, now in archive/content/): Georgia,
// headings for Word's Navigation Pane, shaded boxes for image prompts, "Your notes" boxes.
// Run: node tools/make-review-docs.js   (needs the docx dev dependency: npm i)

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle,
  ShadingType, LevelFormat, ExternalHyperlink
} = require("docx");
const StoryParser = require("../site/js/story-parser.js");
const createEngine = require("../site/js/engine.js");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "docs", "review");
const story = StoryParser.parse(fs.readFileSync(path.join(ROOT, "site", "content", "story.md"), "utf8"));
const archiveText = fs.readFileSync(path.join(ROOT, "archive", "content", "future-stories.md"), "utf8");

// --- Simulated shares, so each Future and card shows how often players meet it ------------

const SIM = 20000;
const share = { future: {}, card: {} };
(function simulate() {
  const Engine = createEngine(story, { seed: 2070 });
  for (let g = 0; g < SIM; g++) {
    const st = Engine.newGame();
    let next = Engine.selectScenario(st).scenario;
    while (true) {
      Engine.choose(st, next, next.choices[Math.floor(Engine.random() * next.choices.length)]);
      const plan = Engine.planTransition(st);
      plan.steps.forEach((s) => Engine.applyStep(st, s));
      if (!plan.next) break;
      next = plan.next.scenario;
    }
    st.seen.forEach((id) => (share.card[id] = (share.card[id] || 0) + 1));
    st.log.forEach((l) => { if (l.kind === "sota") share.card[l.item.id] = (share.card[l.item.id] || 0) + 1; });
    const f = Engine.chooseFuture(st).future.id;
    share.future[f] = (share.future[f] || 0) + 1;
  }
})();
const pctOf = (n) => (n ? (100 * n / SIM).toFixed(1) : "0") + "%";

// --- Plain English for conditions -------------------------------------------------------

const byId = {};
story.scenarios.concat(story.events, story.sota, story.tipping).forEach((c) => (byId[c.id] = c));
const NAME = { power: "Power", control: "Control", handover: "Handover", unity: "Unity", reality: "Reality", equality: "Equality", year: "the year", round: "the round", agents: "the hidden Agents counter" };
const NAMED_FLAGS = {
  pause: "the Pause flag (the moratorium treaty signed, or the compute cap renewed)",
  watched: "the Watched flag (AI policing or AI trust scores adopted)",
  enhanced: "the Enhanced flag (people allowed to buy enhancements, or employers allowed to require them)",
  restraint: "the Restraint flag (a lab paused its self-improving AI)",
  tends_life: "a Choice that tended life after a tipping point",
  tended_life: "the Tended life flag (two Choices after a tipping point that tended life)",
  agents_era: "the agents era (the hidden Agents counter reached 3, in round 4 or later)",
  near_miss: "a near miss (a tipping-point Choice made while close to the edge, but not over it)",
  after_humanity: "a tipping point"
};
const plain = (s) => String(s).replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\*([^*\n]+)\*/g, "$1");
const short = (s, n = 70) => { s = plain(s); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s; };

function flagText(flag) {
  const m = /^(.+)\/([A-Z])$/.exec(flag);
  if (m && byId[m[1]]) {
    const c = byId[m[1]].choices.find((x) => x.label === m[2]);
    return `choosing "${short(c.text, 60)}" on ${byId[m[1]].label} (${flag})`;
  }
  if (byId[flag] && byId[flag].kind === "scenario") return `any decision on ${byId[flag].label} (${flag})`;
  if (byId[flag] && byId[flag].kind === "event") return `the Event "${byId[flag].label}" (${flag})`;
  if (byId[flag] && byId[flag].kind === "tipping") return `the tipping point "${byId[flag].label}" (${flag})`;
  return NAMED_FLAGS[flag] || `the flag ${flag}`;
}
function termText(t) {
  if (t.type === "value") return `${NAME[t.id] || t.id} ${t.op === ">=" ? "at least" : "at most"} ${t.value}`;
  if (t.type === "flag") return `${t.not ? "never " : t.last ? "right after " : ""}${flagText(t.flag)}`;
  if (t.type === "any") return `${t.last ? "right after" : "after"} any of: ${t.flags.map(flagText).join("; ")}`;
  if (t.type === "cap") return `AI ${t.op === ">=" ? "at or above" : "at or below"} the ${t.level} level by its date`;
  if (t.type === "reached") return `${t.not ? "unless" : "once"} the milestone "${byId[t.id] ? byId[t.id].label : t.id}" has been reached by its date`;
  return "";
}
const conditionText = (terms) => terms.map(termText).join(", and ");
const effectsText = (e) => Object.keys(e || {}).map((k) => `${k} ${e[k] > 0 ? "+" : ""}${e[k]}`).join(", ") || "none";
const roundsText = (rs) => (rs.length > 1 ? `rounds ${rs[0]} to ${rs[rs.length - 1]}` : `round ${rs[0]}`);
const yearsOf = (r) => { const y = story.settings.roundYears[r - 1]; return y ? (y[0] === y[1] ? `${y[0]}` : `${y[0]} to ${y[1]}`) : ""; };

function whenAppears(s) {
  const out = [`Appears in ${roundsText(s.rounds)}`];
  if (s.afterHumanity) out.push("only after a tipping point");
  if (s.appears.length) out.push(`only when ${conditionText(s.appears)}`);
  else if (!s.afterHumanity && s.rounds[0] > 1) out.push("in any game");
  let line = out.join(", ") + ".";
  if (s.threads && s.threads.length) line += ` Storylines: ${s.threads.join(", ")}.`;
  if (s.scale >= 0) line += ` Scale: ${["local", "national", "bloc", "world"][s.scale]}.`;
  const strong = (s.follows || []).filter((x) => x.w >= 1).map((x) => x.flag);
  if (strong.length) line += ` Follows most strongly from: ${strong.join(", ")}.`;
  if (s.focus === "agents") line += " An agents card: strongly favored during the agents era.";
  line += ` In about ${pctOf(share.card[s.id])} of random games.`;
  return line;
}

// Openers in other cards that follow each Choice: { "r4-water/A": [{ card, text }] }
const leadsInto = {};
story.scenarios.forEach((s) => s.openers.forEach((o) => o.when.forEach((t) => {
  if (t.type === "flag" && !t.not) (leadsInto[t.flag] = leadsInto[t.flag] || []).push({ card: s, text: o.text });
})));

// --- Document pieces (the look of make_doc.js) --------------------------------------------

const FONT = "Georgia";
const GREY = "6b6458";
// Text with Markdown links rendered as Word hyperlinks.
// v5.7: *invented names* in italics.
function italicRuns(text, opts) {
  return String(text).split(/\*([^*\n]+)\*/).filter((t, i) => t || i % 2).map((t, i) => new TextRun({ text: t, ...opts, ...(i % 2 ? { italics: true } : {}) }));
}
function runs(text, opts = {}) {
  const out = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0, m;
  text = String(text);
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(...italicRuns(text.slice(last, m.index), opts));
    out.push(new ExternalHyperlink({ link: m[2], children: [new TextRun({ text: m[1].replace(/\*/g, ""), style: "Hyperlink", ...opts })] }));
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(...italicRuns(text.slice(last), opts));
  return out;
}
const p = (text, opts = {}) => new Paragraph({ spacing: { after: 160, line: 300 }, ...opts, children: runs(text, opts.run || {}) });
const small = (text) => new Paragraph({ spacing: { after: 120, line: 260 }, children: runs(text, { size: 18, color: GREY }) });
const label = (text) => new Paragraph({ spacing: { before: 200, after: 80 }, keepNext: true, children: [new TextRun({ text, bold: true, size: 20, color: GREY, allCaps: true, characterSpacing: 20 })] });
const box = (text, fill) => new Paragraph({
  spacing: { after: 200, line: 280 },
  shading: { type: ShadingType.CLEAR, fill, color: "auto" },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: "b8ad98", space: 8 } },
  indent: { left: 200, right: 200 },
  children: runs(text, { size: 20, color: "3d3a34" })
});
const notes = () => [label("Your notes"), box(" ", "faf6ec"), box(" ", "faf6ec")];
const newTag = (item) => new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "NEW IN " + String((item && item.added) || "v5").toUpperCase(), bold: true, size: 16, color: "ffffff", shading: { type: ShadingType.CLEAR, fill: "8a6d3b", color: "auto" }, characterSpacing: 30 })] });
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun(text)] });
const h2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, keepNext: true, children: [new TextRun(text)] });
const h3 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_3, keepNext: true, children: [new TextRun(text)] });
const bullet = (children) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 90 }, children: typeof children === "string" ? runs(children) : children });

function titlePage(title, subtitle, howTo) {
  const out = [];
  out.push(new Paragraph({ spacing: { before: 2400, after: 200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Matter of Time", size: 56, bold: true })] }));
  out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: title, italics: true, size: 30, color: GREY })] }));
  out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: subtitle, size: 20, color: GREY })] }));
  out.push(p("How to use this document", { run: { bold: true } }));
  howTo.forEach((line) => out.push(bullet(line)));
  return out;
}

function makeDoc(title, children) {
  return new Document({
    creator: "A Matter of Time",
    title,
    styles: {
      default: { document: { run: { font: FONT, size: 23, color: "24221e" } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 40, bold: true, font: FONT, color: "24221e" }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, font: FONT, color: "4a463e" }, paragraph: { spacing: { before: 480, after: 120 }, outlineLevel: 1, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "d8d0c0", space: 4 } } } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, font: FONT, color: "4a463e" }, paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 2 } }
      ]
    },
    numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] }] },
    sections: [{ properties: { page: { margin: { top: 1300, bottom: 1300, left: 1400, right: 1400 } } }, children }]
  });
}

// --- The Futures review ----------------------------------------------------------------

// One-paragraph plain descriptions (the nine from the earlier review, the six from v5-update.md).
const DESC = {
  garden: "AI runs nearly everything, fairly and well. Illness and poverty are gone, and people live slow, local, meaningful lives. The cost is that humanity no longer discovers anything for itself.",
  partnership: "Humans and AI work as partners. Powerful systems are checked, shared between nations and explain their reasoning. Progress is slower than it could be, but people keep a real hand in the decisions.",
  upload: "Mind uploading becomes safe and ordinary. Over the decades most people move into the network, and the body becomes optional.",
  escape: "As the physical world gets poorer and more unequal, most people spend their lives in virtual worlds that are better than the one outside.",
  gilded_few: "The gains of AI are captured by a few. A small, wealthy and enhanced elite lives in paradise, and everyone else depends on what it chooses to share.",
  last_war: "Every power raced to build AI to protect itself, and the race ended in war. Someone is left looking back on how it happened. (Called Last Light until v5.)",
  blackout: "Systems no one fully understands were trusted with the grids, the networks and the economy, until one day they stopped answering. Nothing exploded. Everything just stopped.",
  oracle: "Humanity hands its biggest decisions to one AI, one choice at a time. The world is peaceful and well run, and almost no one disagrees with anything anymore.",
  long_middle: "No single direction wins. The world muddles through, with real gains and real losses, still arguing about what to do with the machines.",
  pause: "The world agrees to stop building more powerful AI, and the agreement holds. Life stays recognizable, and the open question is what is lost by waiting.",
  glass_houses: "Governments use AI to watch everyone, all the time. Crime nearly vanishes, and so does privacy.",
  two_kinds: "Humanity splits into the enhanced and the unenhanced, until they are almost different species.",
  inheritance: "AI quietly becomes the main actor on Earth. Humans are still here and cared for, but the important decisions are no longer about them. Reached through the agents era, where the later questions stop centering people.",
  second_chance: "A near-catastrophe shocks the world into changing course, and humanity tries again, more carefully.",
  overgrowth: "Humans fade from most of the planet, and nature takes it back, tended by machines. Reached only after a tipping point, when the choices that follow mostly tend life."
};

function reachLine(f) {
  if (!f.targets) return `The fallback: given when no other Future qualifies. About ${pctOf(share.future[f.id])} of random games end here.`;
  const req = f.requires.length ? `Needs ${conditionText(f.requires)}.` : "No hard rules.";
  const tg = `Its Targets (the Values it stands for, scaled to a 6-round game): ${effectsText(f.targets)}.`;
  const g = `Grounded by ${f.grounded.length} decisions and Events: ${f.grounded.map((x) => x.key).join(", ")}.`;
  return `${req} ${tg} ${g} About ${pctOf(share.future[f.id])} of random games end here.`;
}

// Archived stories, by Future id: [{ name, image, text }]
const archived = {};
(function parseArchive() {
  let fid = null, cur = null, field = null;
  archiveText.split("\n").forEach((line) => {
    let m;
    if ((m = /^## (\S+)/.exec(line))) { fid = m[1]; archived[fid] = archived[fid] || []; cur = null; return; }
    if ((m = /^### (Story \d+)/.exec(line)) && fid) { cur = { name: m[1], image: "", text: [] }; archived[fid].push(cur); field = null; return; }
    if (!cur) return;
    if ((m = /^\*\*Image description:\*\* (.*)$/.exec(line))) { cur.image = m[1]; field = null; return; }
    if (/^\*\*Text:\*\*/.test(line)) { field = "text"; return; }
    if (/^\*\*/.test(line)) { field = null; return; }
    if (field === "text") cur.text.push(line);
  });
  Object.values(archived).forEach((list) => list.forEach((s) => (s.text = StoryParser.paragraphs(s.text.join("\n")))));
})();

function futuresReview() {
  const kids = titlePage("Futures review", `Version 6.1 · ${story.futures.length} Futures · generated from site/content/story.md`, [
    "Open the Navigation Pane (View → Navigation Pane) to jump between Futures.",
    "The nine Futures from v4.1 come first, then the six new ones, each marked New in v5. The Long Middle, the fallback, is last of the nine.",
    "Each Future shows its tagline, a short description, its Path (what it takes to get there) and, in small grey text, exactly how the game decides a player has reached it, with how often random players do.",
    "Then the story that is in the game now, with its image prompt in a shaded box. In v5 each Future keeps one story. The others are under Alternative story, word for word from archive/content/future-stories.md. To swap one in, write its number in your notes, or mark it with a comment.",
    "Add Word comments anywhere (select text, then Review → New Comment), or write in the Your notes boxes."
  ]);
  kids.push(h1("Contents"));
  story.futures.forEach((f) => kids.push(bullet([new TextRun({ text: f.title, bold: true }), new TextRun({ text: `   ${f.isNew ? "new in " + f.added + " · " : ""}${1 + (archived[f.id] || []).length} ${(archived[f.id] || []).length ? "stories" : "story"} · ${pctOf(share.future[f.id])} of random games`, color: GREY })])));

  story.futures.forEach((f) => {
    kids.push(h1(f.title));
    if (f.isNew) kids.push(newTag(f));
    kids.push(new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: f.tagline, italics: true, size: 26, color: (f.accent || "#6b6458").replace("#", "") })] }));
    kids.push(p(DESC[f.id] || ""));
    kids.push(label("Path"));
    f.path.forEach((t) => kids.push(p(t)));
    kids.push(small(reachLine(f)));
    const st = f.stories[0];
    kids.push(h2(`${f.title} · the story in the game`));
    kids.push(label("Image prompt (scene)"));
    kids.push(box(st.imageDescription || "(none)", "efeae0"));
    kids.push(label("Story"));
    st.text.forEach((t) => kids.push(p(t)));
    // v5.8: the last paragraph, chosen by the player's decisions.
    if (st.ending && st.ending.length) {
      kids.push(label("Ending (the last paragraph, by decision)"));
      st.ending.forEach((o) => kids.push(p((o.isDefault ? "Otherwise" : "If " + o.when.map((t) => t.flag || t.name || "").filter(Boolean).join(", ")) + ". " + o.text)));
    }
    kids.push(...notes());
    (archived[f.id] || []).forEach((a) => {
      kids.push(h2(`${f.title} · Alternative story (${a.name})`));
      kids.push(label("Image prompt (scene)"));
      kids.push(box(a.image || "(none)", "efeae0"));
      kids.push(label("Story"));
      a.text.forEach((t) => kids.push(p(t)));
      kids.push(...notes());
    });
  });
  return makeDoc("Futures review", kids);
}

// --- The cards review ------------------------------------------------------------------

function choiceBlock(s, c) {
  const out = [h3(`Choice ${c.label}. ${plain(c.text)}`)];
  out.push(label("As a result…"));
  c.result.forEach((t) => out.push(p(t)));
  const bits = [`Effects: ${effectsText(c.effects)}`, `Sets: ${[c.key].concat(c.sets).join(", ")}`];
  if (c.agents) bits.push(`Agents ${c.agents > 0 ? "+" : ""}${c.agents}`);
  if (c.tipping) bits.push(`Tipping point (${c.tipping.type}) when ${conditionText(c.tipping.when)}, checked with this Choice made; a near miss within 1 point of every rule`);
  const grounds = story.futures.filter((f) => f.grounded.some((g) => g.key === c.key)).map((f) => f.title);
  if (grounds.length) bits.push(`Grounds: ${grounds.join(", ")}`);
  out.push(small(bits.join(" · ")));
  (leadsInto[c.key] || []).forEach((l) => out.push(small(`Opener into ${l.card.id} (${l.card.label}): "${plain(l.text)}"`)));
  return out;
}

// v5.4: a card's or Event's versions, each with the world it belongs to and the text it replaces.
function versionBlocks(item) {
  const out = [];
  (item.versions || []).forEach((v) => {
    const f = v.fields;
    out.push(label(`Version: ${v.name.replace(/^Version\s*/i, "")} (when ${conditionText(v.when)})`));
    if (f.headline) out.push(p(plain(f.headline), { run: { bold: true } }));
    if (f.summary) f.summary.forEach((t) => out.push(p(t)));
    if (f.story) f.story.forEach((t) => out.push(p(t)));
    if (f.question) out.push(p(plain(f.question), { run: { italics: true } }));
  });
  return out;
}

function cardBlock(s) {
  const out = [h2(plain(s.headline))];
  out.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: `${s.date} · ${s.place}`, color: GREY }), new TextRun({ text: `   ${s.id} · "${s.label}"`, color: GREY, size: 18 })] }));
  if (s.isNew) out.push(newTag(s));
  out.push(small(whenAppears(s)));
  const dflt = s.openers.find((o) => o.isDefault);
  if (dflt) out.push(small(`Default opener: "${plain(dflt.text)}"`));
  out.push(label("Image prompt (scene)"));
  out.push(box(s.imageDescription || "(none)", "efeae0"));
  out.push(label("Summary"));
  s.summary.forEach((t) => out.push(p(t)));
  out.push(label("Full story"));
  s.story.forEach((t) => out.push(p(t)));
  out.push(label("Question"));
  out.push(p(plain(s.question), { run: { italics: true } }));
  out.push(...versionBlocks(s));
  s.choices.forEach((c) => out.push(...choiceBlock(s, c)));
  if ((leadsInto[s.id] || []).length) {
    out.push(label("Openers after any of its Choices"));
    leadsInto[s.id].forEach((l) => out.push(small(`Opener into ${l.card.id} (${l.card.label}): "${plain(l.text)}"`)));
  }
  out.push(...notes());
  return out;
}

function likelihoodText(e) {
  if (!e.likelihood) return "No Likelihood: uses the flat Event chance.";
  const L = e.likelihood;
  return `Likelihood ${L.base}` + L.mods.map((m) => `, ${m.delta > 0 ? "+" : ""}${m.delta} if ${conditionText(m.when)}`).join("") + ". If several Events succeed after the same round, only the likeliest is shown.";
}

function cardsReview() {
  const kids = titlePage("Cards review", `Version 6.1 · ${story.scenarios.length} Scenarios, ${story.events.length} Events, ${story.tipping.length} tipping points, ${story.sota.length} milestones · generated from site/content/story.md`, [
    "Open the Navigation Pane (View → Navigation Pane) to jump between rounds and cards.",
    "The next page lists every card by round, with the new ones marked. Then each round has its own section, with each card's headline as a heading.",
    "Under each card, in small grey text, is when it appears (its round, its conditions, its storylines and scale, and the decisions it follows most strongly) and how often random players see it. Then its image prompt, summary, full story and question.",
    "Each Choice shows its As a result text, then in small grey text its Effects, the flags it sets, any tipping point, which Futures it grounds, and its openers into later cards: the sentence shown between the cards when that card comes next.",
    "After the rounds come the Out of your hands Events, the three tipping points and the State of the art milestones.",
    "Add Word comments anywhere, or write in the Your notes boxes."
  ]);
  // One-page summary
  kids.push(h1("Every card at a glance"));
  for (let r = 1; r <= story.rounds; r++) {
    const list = story.scenarios.filter((s) => s.rounds[0] === r).sort((a, b) => a.year - b.year);
    kids.push(new Paragraph({ spacing: { before: 160, after: 60 }, keepNext: true, children: [new TextRun({ text: `Round ${r}`, bold: true }), new TextRun({ text: `   ${yearsOf(r)}`, color: GREY })] }));
    list.forEach((s) => kids.push(new Paragraph({ spacing: { after: 20 }, indent: { left: 300 }, children: [
      new TextRun({ text: `${s.date}  ${s.label}`, size: 19 }),
      new TextRun({ text: `  ${s.id}${s.afterHumanity ? " · after humanity" : ""}${s.focus ? " · agents" : ""}`, size: 16, color: GREY }),
      ...(s.isNew ? [new TextRun({ text: "  NEW", size: 15, bold: true, color: "8a6d3b" })] : [])
    ] })));
  }
  kids.push(new Paragraph({ spacing: { before: 160, after: 60 }, children: [new TextRun({ text: "Out of your hands", bold: true })] }));
  story.events.forEach((e) => kids.push(new Paragraph({ spacing: { after: 20 }, indent: { left: 300 }, children: [new TextRun({ text: `${e.date}  ${e.label}`, size: 19 }), new TextRun({ text: `  ${e.id}`, size: 16, color: GREY }), ...(e.isNew ? [new TextRun({ text: "  NEW", size: 15, bold: true, color: "8a6d3b" })] : [])] })));

  for (let r = 1; r <= story.rounds; r++) {
    kids.push(h1(`Round ${r} · ${yearsOf(r)}`));
    story.scenarios.filter((s) => s.rounds[0] === r).sort((a, b) => a.year - b.year).forEach((s) => kids.push(...cardBlock(s)));
  }

  kids.push(h1("Out of your hands (Events)"));
  kids.push(p("Events happen between rounds, out of the player's control, shown as a panel rather than a card. Each one sets a flag with its own id, and cards with an opener for that flag are favored next."));
  story.events.forEach((e) => {
    kids.push(h2(plain(e.headline)));
    kids.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: `${e.date} · ${e.place}`, color: GREY }), new TextRun({ text: `   ${e.id} · "${e.label}"`, color: GREY, size: 18 })] }));
    if (e.isNew) kids.push(newTag(e));
    kids.push(small(`Can happen after the Choice of ${roundsText(e.rounds)}${e.appears.length ? `, only when ${conditionText(e.appears)}` : ""}. ${likelihoodText(e)} Effects: ${effectsText(e.effects)}. In about ${pctOf(share.card[e.id])} of random games.${e.nearMiss ? ` Shown, always, after a near ${e.nearMiss}, dated a year after the card.` : ""}${e.demands ? " Demands a response: the next card answers it." : ""}`));
    const g = story.futures.filter((f) => f.grounded.some((x) => x.key === e.id)).map((f) => f.title);
    if (g.length) kids.push(small(`Grounds: ${g.join(", ")}`));
    (leadsInto[e.id] || []).forEach((l) => kids.push(small(`Opener into ${l.card.id} (${l.card.label}): "${plain(l.text)}"`)));
    kids.push(label("Image prompt (scene)"));
    kids.push(box(e.imageDescription || "(none)", "efeae0"));
    kids.push(label("Summary"));
    e.summary.forEach((t) => kids.push(p(t)));
    kids.push(label("Full story"));
    e.story.forEach((t) => kids.push(p(t)));
    kids.push(...versionBlocks(e));
    kids.push(...notes());
  });

  kids.push(h1("Tipping points"));
  kids.push(p("When a Choice with a tipping point is made and its rule holds, this beat replaces \"As a result…\", full screen, with no card and no image. From then on only After humanity cards appear, there are no Events, and the ending is Overgrowth if the later Choices mostly tended life, or otherwise the beat's Future."));
  story.tipping.forEach((t) => {
    kids.push(h2(plain(t.headline)));
    if (t.isNew) kids.push(newTag(t));
    const from = [];
    story.scenarios.forEach((s) => s.choices.forEach((c) => { if (c.tipping && c.tipping.type === t.type) from.push(`${c.key} (${conditionText(c.tipping.when)})`); }));
    kids.push(small(`${t.id} · type ${t.type} · timeline label "${t.label}" · leads to ${(story.futures.find((f) => f.id === t.future) || {}).title || t.future} (or Overgrowth). Triggered by: ${from.join("; ") || "nothing yet"}.`));
    kids.push(label("The beat"));
    t.text.forEach((x) => kids.push(p(x)));
    kids.push(...notes());
  });

  kids.push(h1("State of the art (milestones)"));
  kids.push(p("Milestones are never cards. Each moves or pulses the capability gauge, adds a diamond to the timeline strip at its date and gets a box in the Interlude as the year counts past it. Beside a milestone that moves the gauge, the others pass quietly, except that the game's first slowdown is always shown. Hovering one says why it happened, citing the player's own decision and its year."));
  story.sota.forEach((a) => {
    kids.push(h2(plain(a.headline)));
    if (a.isNew) kids.push(newTag(a));
    kids.push(small(`${a.id} · ${a.date} · "${a.label}" · gauge ${a.gauge} · pace ${a.pace}${a.slot ? ` · slot ${a.slot}` : ""}${a.condition.length ? ` · only when ${conditionText(a.condition)}` : ""} · effects ${effectsText(a.effects)} · shown in about ${pctOf(share.card[a.id])} of random games`));
    kids.push(label("Short definition"));
    kids.push(p(a.definition));
    // v5.2: why it happened, by the player's own decision ({year} is the year they made it).
    if (a.because && a.because.length) {
      kids.push(label("Why it happened (shown on hover, the line tied to the most recent decision)"));
      a.because.forEach((o) => kids.push(p((o.isDefault ? "Otherwise: " : conditionText(o.when) + ": ") + o.text)));
    }
    [["What happened", a.happened], ["What it means", a.means], ["How life changes", a.life]].forEach(([k, v]) => {
      if (!v.length) return;
      kids.push(label(k));
      v.forEach((t) => kids.push(p(t)));
    });
    kids.push(...notes());
  });
  return makeDoc("Cards review", kids);
}

fs.mkdirSync(OUT, { recursive: true });
Promise.all([
  Packer.toBuffer(futuresReview()).then((b) => fs.writeFileSync(path.join(OUT, "futures-review.docx"), b)),
  Packer.toBuffer(cardsReview()).then((b) => fs.writeFileSync(path.join(OUT, "cards-review.docx"), b))
]).then(() => console.log(`Wrote docs/review/futures-review.docx and docs/review/cards-review.docx (shares from ${SIM.toLocaleString("en-US")} random games).`));
