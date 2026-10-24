// Checks site/content/story.md: validates it, lints player-facing text for style, updates its
// SCALE table in place, and runs the simulations: Future shares, pools, arcs, Events,
// Values, steering, timeline order, the things a player must never see, cards and replays.
// Run: node tools/check-story.js [games] [--audit]
//   --audit also writes docs/path-audit.md: sample playthroughs per Future (and of a tipping
//   point and of the agents era), for a person to read.

const fs = require("fs");
const path = require("path");
const StoryParser = require(path.join(__dirname, "..", "site", "js", "story-parser.js"));
const createEngine = require(path.join(__dirname, "..", "site", "js", "engine.js"));

const ROOT = path.join(__dirname, "..");
const SITE = path.join(ROOT, "site");
const FILE = path.join(SITE, "content", "story.md");
const AUDIT_FILE = path.join(ROOT, "docs", "path-audit.md");
const ARGS = process.argv.slice(2);
const AUDIT = ARGS.includes("--audit");
const GAMES = parseInt(ARGS.find((a) => /^\d+$/.test(a)), 10) || 100000;

// Targets with random play (v5-update.md, Phase 5): The Long Middle at most 25%, each new
// Future between about 4% and 8%, no Future above 15%. [low, high] in percent.
const TARGET = {
  long_middle: [0, 30], pause: [2, 8], glass_houses: [4, 8], two_kinds: [4, 8],
  inheritance: [4, 8], second_chance: [4, 8], overgrowth: [4, 8], back_to_earth: [0.2, 4]
};
const MAX_SHARE = 15;
// Arc rates (percent of games): tipping point, agents era, near miss.
const ARCS = { tipping: [5, 8], agents_era: [10, 15], near_miss: [5, 10] };

// Expected average final Values of players who reached each Future (v3.3-update.md; for
// reference only).
const ALIGN = {
  garden: { control: 2.4, equality: 1.8, reality: -1.3 },
  partnership: { unity: 1.8, power: 1.4 },
  upload: { reality: 3.0, control: 2.1 },
  escape: { reality: 1.8, equality: -1.0 },
  gilded_few: { equality: -3.2, control: 2.6 },
  last_war: { unity: -2.1, control: -1.0 },
  blackout: { control: -2.1, reality: 2.3 },
  oracle: { handover: 4.5, unity: 2.3, control: -1.4 }
};

const text = fs.readFileSync(FILE, "utf8");
const story = StoryParser.parse(text);
const problems = StoryParser.validate(story);
const chronology = StoryParser.chronology(story);
const warnings = StoryParser.lint(story);
const Engine = createEngine(story, { seed: 1 });
const ROUNDS = story.rounds;
// "Late" decisions, for the steering report: from round 5 of 7 (round 3 of 4 in v4.1).
const LATE = Math.ceil(ROUNDS * 0.7);

// --- 1. Problems -------------------------------------------------------------

console.log("\nChecking site/content/story.md\n");
if (problems.length) {
  console.log(`  ${problems.length} problem(s):`);
  problems.forEach((p) => console.log(`  - ${p.id}: ${p.message}`));
} else {
  console.log("  No problems found.");
}
if (chronology.length) {
  console.log(`\n  ${chronology.length} chronology problem(s):`);
  chronology.forEach((p) => console.log(`  - ${p.id}: ${p.message}`));
} else {
  console.log("  No chronology problems (every card in its round's years, every Event between its rounds).");
}
// Every Future that requires a flag must list, in its Grounded by, everything that can set
// that flag, so "How we got here" can always name the decision behind it.
const setters = {};
story.scenarios.forEach((s) => s.choices.forEach((c) => c.sets.forEach((f) => (setters[f] = setters[f] || []).push(c.key))));
story.events.forEach((e) => e.sets.forEach((f) => (setters[f] = setters[f] || []).push(e.id)));
setters.after_humanity = story.tipping.map((t) => t.id);
setters.near_miss = [].concat(...story.scenarios.map((s) => s.choices.filter((c) => c.tipping).map((c) => c.key)));
setters.agents_era = [].concat(...story.scenarios.map((s) => s.choices.filter((c) => c.agents > 0).map((c) => c.key)));
story.settings.counters.forEach((c) => (setters[c.sets] = (setters[c.sets] || []).concat(setters[c.flag] || [])));
story.settings.mostly.forEach((c) => (setters[c.sets] = (setters[c.sets] || []).concat(setters[c.flag] || [])));
const groundGaps = [];
story.futures.forEach((f) => {
  const keys = new Set(f.grounded.map((g) => g.key));
  StoryParser.flagsIn(f.requires.filter((t) => !t.not)).forEach((flag) => {
    // v6.0: a setter that also sets a flag this Future forbids (r3-geneva/B sets pause, but
    // its exemptions keep The Pause out of reach) can never lead here, so it needn't be listed.
    const forbidden = StoryParser.flagsIn(f.requires.filter((t) => t.not));
    const setsForbidden = (k) => story.scenarios.some((s) => s.choices.some((c) => c.key === k && c.sets.some((x) => forbidden.includes(x))));
    const missing = (setters[flag] || []).filter((k) => !keys.has(k) && !setsForbidden(k));
    if (missing.length) groundGaps.push(`${f.id} requires flag ${flag}, but its Grounded by lacks ${missing.join(", ")}`);
  });
});
if (groundGaps.length) {
  console.log(`\n  ${groundGaps.length} Future(s) whose required flags aren't fully grounded:`);
  groundGaps.forEach((g) => console.log("  - " + g));
}
if (warnings.length) {
  console.log(`\n  ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  - ${w.id}: ${w.message}`));
}
// Image paths that point at nothing.
const images = [];
story.scenarios.concat(story.events).forEach((c) => c.image && images.push([c.id, c.image]));
story.futures.forEach((f) => f.stories.forEach((st) => st.image && images.push([f.id + " " + st.name, st.image])));
const brokenImages = images.filter(([, p]) => !fs.existsSync(path.join(SITE, p)));
if (brokenImages.length) {
  console.log(`\n  ${brokenImages.length} broken image path(s):`);
  brokenImages.forEach(([id, p]) => console.log(`  - ${id}: ${p}`));
}

// --- 2. Style ---------------------------------------------------------------
// Player-facing text only: not image descriptions or the notes at the top.

const BRITISH = [
  /\w*(colour|favour|honour|behaviour|neighbour|labour|harbour|rumour|vapour)\w*/gi,
  /\b(centre|centred|centres|metre|metres|litre|litres|theatre|theatres|fibre|calibre|kilometres?)\b/gi,
  /\b\w*(organis|realis|recognis|apologis|criticis|emphasis|prioritis|minimis|maximis|summaris|specialis|standardis|authoris|civilis|mobilis|characteris|categoris|stabilis|utilis|optimis|modernis|legalis|militaris|weaponis|harmonis|digitis|globalis|normalis|subsidis|jeopardis)(e|ed|es|ing|ation|ations)\b/gi,
  /\b(analyse|analysed|analysing|paralyse|paralysed|catalyse|catalysed)\b/gi,
  /\b(programme|programmes|defence|offence|licence|travelling|travelled|traveller|cancelled|cancelling|modelling|labelled|fuelled|grey|greying|whilst|amongst|amidst|practise|practised|tyres?|cheques?|aeroplanes?|catalogue|dialogue|ageing|sceptic\w*|mould\w*|plough\w*|jewellery|aluminium|enrolment|fulfil|fulfilment|cosy|storeys?|kerb|pyjamas|towards)\b/gi
];

// [visible words](url) -> visible words. Links are checked separately.
const LINK = /\[([^\]]+)\]\(([^)\s]*)\)/g;
const plain = (str) => str.replace(LINK, "$1");

function linkHits(str) {
  const hits = [];
  let m;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(str))) {
    if (!/^https:\/\//i.test(m[2])) hits.push(`link isn't https:// "${m[1]}" -> ${m[2] || "(empty)"}`);
  }
  return hits;
}

function styleHits(raw) {
  const hits = linkHits(raw);
  const str = plain(raw);
  const ctx = (i, n) => "\"" + str.slice(Math.max(0, i - 25), i + n + 25).replace(/\s+/g, " ").trim() + "\"";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === ";") hits.push("semicolon " + ctx(i, 1));
    else if (ch === "—") hits.push("em dash " + ctx(i, 1));
    else if (ch === "–") hits.push("en dash " + ctx(i, 1));
    else if (ch === ":" && !(/\d/.test(str[i - 1] || "") && /\d/.test(str[i + 1] || ""))) hits.push("colon " + ctx(i, 1));
    else if (ch === "-" && str[i - 1] === " " && str[i + 1] === " ") hits.push("spaced hyphen " + ctx(i, 1));
  }
  BRITISH.forEach((re) => {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(str))) hits.push('British spelling "' + m[0] + '" ' + ctx(m.index, m[0].length));
  });
  return hits;
}

const style = [];
function lint(id, field, value) {
  [].concat(value || []).forEach((str) => styleHits(String(str)).forEach((h) => style.push(`${id} (${field}): ${h}`)));
}

Object.keys(story.ui).forEach((k) => lint("UI TEXT", k, story.ui[k]));
lint("ABOUT", "Heading", story.about.heading); lint("ABOUT", "Text", story.about.text);
story.history.forEach((h) => { lint("HISTORY " + h.date, "Title", h.title); lint("HISTORY " + h.date, "Line", h.line); if (h.strip) lint("HISTORY " + h.date, "Strip label", h.strip); });
story.values.forEach((v) => {
  lint(v.id, "Name", v.name); lint(v.id, "Left", v.left); lint(v.id, "Right", v.right);
  lint(v.id, "Left means", v.leftMeans); lint(v.id, "Right means", v.rightMeans); lint(v.id, "Why it matters", v.why);
});
story.scenarios.forEach((s) => {
  lint(s.id, "Headline", s.headline); lint(s.id, "Timeline label", s.label); lint(s.id, "Place", s.place);
  lint(s.id, "Summary", s.summary); lint(s.id, "Story", s.story); lint(s.id, "Question", s.question);
  s.openers.forEach((o) => lint(s.id, "Openers", o.text));
  s.choices.forEach((c) => {
    const id = s.id + " Choice " + c.label;
    lint(id, "Text", c.text); lint(id, "As a result", c.result);
  });
});
story.events.forEach((e) => {
  lint(e.id, "Headline", e.headline); lint(e.id, "Timeline label", e.label); lint(e.id, "Place", e.place);
  lint(e.id, "Summary", e.summary); lint(e.id, "Story", e.story);
});
// v5.4: every Version of a card or Event.
story.scenarios.concat(story.events).forEach((c) => (c.versions || []).forEach((v) => {
  const id = c.id + " " + v.name, f = v.fields;
  ["headline", "label", "place", "summary", "story", "question"].forEach((k) => { if (f[k]) lint(id, k, f[k]); });
}));
story.sota.forEach((a) => {
  lint(a.id, "Headline", a.headline); lint(a.id, "Timeline label", a.label); lint(a.id, "Short definition", a.definition);
  lint(a.id, "What happened", a.happened); lint(a.id, "What it means", a.means); lint(a.id, "How life changes", a.life);
  (a.because || []).forEach((o) => lint(a.id, "Because", o.text));
});
story.tipping.forEach((t) => {
  lint(t.id, "Headline", t.headline); lint(t.id, "Timeline label", t.label); lint(t.id, "Text", t.text);
  (t.prevented || []).forEach((o) => lint(t.id, "Prevented", o.text));
  (t.versions || []).forEach((v) => lint(t.id + " " + v.name, "Text", v.text));
});
// v5.6: the new player-facing fields.
story.values.forEach((v) => { if (v.afterTipping) lint(v.id, "After the tipping point", v.afterTipping); });
story.sota.forEach((a) => (a.ahead || []).forEach((o) => lint(a.id, "Ahead", o.text)));
story.scenarios.forEach((s) => s.choices.forEach((c) => { if (c.tippingWhy && c.tippingWhy.length) lint(s.id + " Choice " + c.label, "Tipping why", c.tippingWhy); }));

// v5.6: "As a result" tells only what follows within about a year of the card, never what a
// later card, milestone or the Future decides: no later year, no "within five years", no
// "for the rest of their lives".
const AHEAD = [
  /within (two|three|four|five|six|seven|eight|nine|ten|twenty|a few|several|\d+) (years|decades)\b/i,
  /\b(over|after|for) (two|three|four|five|six|seven|eight|nine|ten|twenty|\d+) years\b/i,
  /\b(a|two|three|four|five|ten) (years|decades?) later\b/i,
  /\bby the end of the decade\b/i, /\bfor the rest of (their|his|her) lives\b/i, /\beventually\b/i,
  /\bfor decades\b/i, /\bwithin a (decade|generation)\b/i, /\ba generation (grows|is born)\b/i, /\bevery year\b/i, /\bfor (a|another) decade\b/i
];
story.scenarios.forEach((s) => s.choices.forEach((c) => {
  const text = plain(c.result.join(" "));
  (text.match(/\b(19|20)\d\d\b/g) || []).forEach((y) => { if (+y > s.year) style.push(`${s.id} Choice ${c.label} (As a result): names ${y}, after the card's own date (${s.year})`); });
  AHEAD.forEach((re) => { const m = re.exec(text); if (m) style.push(`${s.id} Choice ${c.label} (As a result): looks ahead "${m[0]}"`); });
}));

// v5.6: image descriptions belong to their era. No humanoid robots, and no robots at all
// before 2034, on a card that neither is about them nor guarantees they exist by its date.
const ROBOT = /\b(humanoid|android)s?\b|\brobots?\b(?! (arm|arms|vacuum|lawnmower)\b)/i;
story.scenarios.concat(story.events).forEach((c) => {
  const desc = [c.imageDescription || ""].join(" ");
  const about = /robot|humanoid/i.test(plain([].concat(c.summary || []).join(" ")));
  const guaranteed = (c.appears || []).some((t) => t.type === "reached" && !t.not && /sota-robots/.test(t.id)) || c.afterHumanity;
  const m = ROBOT.exec(desc);
  if (m && !about && !guaranteed && (c.year < 2034 || /humanoid|android/i.test(m[0]))) style.push(`${c.id} (Image description): "${m[0]}" in ${c.year}, before robots like it exist in every world`);
});
story.futures.forEach((f) => {
  lint(f.id, "Title", f.title); lint(f.id, "Tagline", f.tagline); lint(f.id, "Path", f.path);
  f.grounded.forEach((g) => lint(f.id, "Grounded by " + g.key, g.text));
  f.stories.forEach((st) => { lint(f.id + " " + st.name, "Text", st.text); lint(f.id + " " + st.name, "Ending", st.ending.map((o) => o.text)); });
});

if (style.length) {
  console.log(`\n  ${style.length} style problem(s):`);
  style.forEach((s) => console.log("  - " + s));
} else {
  console.log("  No style problems found.");
}

// --- 3. Simulation -----------------------------------------------------------
// One game with random Choices, played exactly as the game plays it. Returns the finished
// state and what the player was shown: each round's card with its pool size, lead-in and
// safety level, and any tipping beat.

// v5.4: with `checkPast`, the capability graph is redrawn after every step, as the game
// redraws it, and any change to the part already filled in (the past) counts in never.pastMoved.
const GY = story.settings.gaugeYears, GSTEPS = 256;
function pastGuard() {
  let prev = null, fill = 2026;
  return {
    fill(y) { fill = Math.max(fill, y); },
    check(state) {
      const H = Engine.gaugeHeights(state, GSTEPS);
      const k = Math.floor(((fill - GY[0]) / (GY[1] - GY[0])) * GSTEPS + 1e-9);
      if (prev && H.slice(0, k + 1).some((h, i) => Math.abs(h - prev[i]) > 1e-9)) never.pastMoved++;
      prev = H;
    }
  };
}

function playRandom(history, pickChoice, checkPast) {
  const state = Engine.newGame(history);
  const shown = [];
  const past = checkPast ? pastGuard() : null;
  let pick = Engine.selectScenario(state);
  if (past) { past.check(state); past.fill(pick.scenario.year); past.check(state); }
  let pool = Engine.pool(state).list.length;
  while (true) {
    const s = pick.scenario;
    // v5.1 flow: whether the card continues the player's storylines, whether something it
    // follows (at full strength) was decided in the last two rounds, whether its Scale is
    // below the round's, and whether it assumes more AI than the world has at its date.
    const recent = (s.follows || []).some((x) => x.w >= 1 && state.flags[x.flag] && (state.round - 1) - state.when[x.flag] <= 2);
    const target = story.settings.roundScales[state.round - 1];
    const capOk = Engine.holds(state, (s.appears || []).filter((t) => t.type === "cap" || t.type === "reached"));
    // v5.2: the Future the game is heading for before its last card, and whether that card offers it.
    let leader = null, offers = false;
    if (state.round === ROUNDS && !state.flags.after_humanity) {
      const L = Engine.leaders(state)[0];
      leader = L ? L.future.id : null;
      offers = !!L && s.choices.some((c) => L.future.grounded.some((g) => g.key === c.key));
    }
    shown.push({ round: state.round, id: s.id, pool, lead: pick.lead, safety: pick.safety || 0, afterHumanity: !!state.flags.after_humanity,
      spine: Engine.onSpine(state, s), recent, below: s.scale >= 0 && target != null && s.scale < target, capOk, leader, offers });
    const choice = pickChoice ? pickChoice(state, s) : s.choices[Math.floor(Engine.random() * s.choices.length)];
    Engine.choose(state, s, choice);
    if (past) past.check(state);
    const plan = Engine.planTransition(state);
    plan.steps.forEach((step) => {
      Engine.applyStep(state, step);
      if (past) { past.check(state); if (step.kind === "milestone") { past.fill(step.item.year); past.check(state); } }
    });
    if (past) { past.fill(plan.next ? plan.next.scenario.year : FUTURE_YEAR); past.check(state); }
    if (!plan.next) break;
    pool = Engine.pool(state).list.length;
    pick = plan.next;
  }
  return { state, shown };
}

// The Knuth estimator for the number of distinct paths (every combination of card,
// Choice, Event and next card): walk one random path, multiplying the number of options at
// each branch; the average over many walks estimates the total.
function knuth(walks) {
  let total = 0;
  for (let w = 0; w < walks; w++) {
    const state = Engine.newGame();
    let options = Engine.scenarioOdds(state).odds.filter((o) => o.p > 0);
    let product = options.length;
    let s = options[Math.floor(Engine.random() * options.length)].scenario;
    while (true) {
      product *= s.choices.length;
      Engine.choose(state, s, s.choices[Math.floor(Engine.random() * s.choices.length)]);
      if (Engine.isOver(state)) { total += product; break; }
      const outs = Engine.transitionOdds(state).filter((o) => o.p > 0);
      // Distinct (Event, next card) pairs: milestones don't branch the story.
      const keys = [...new Set(outs.map((o) => (o.event ? o.event.id : "-") + ">" + (o.next ? o.next.scenario.id : "")))];
      product *= keys.length;
      const key = keys[Math.floor(Engine.random() * keys.length)];
      const o = outs.find((x) => (x.event ? x.event.id : "-") + ">" + (x.next ? x.next.scenario.id : "") === key);
      o.steps.forEach((step) => Engine.applyStep(state, step));
      s = o.next.scenario;
    }
  }
  return total / walks;
}

const fmt = (x) => Math.round(x).toLocaleString("en-US");
const pct = (x) => x.toFixed(1).padStart(5) + "%";

// --- SCALE table ----------------------------------------------------------------

const counts = {};
for (let r = 1; r <= ROUNDS; r++) counts[`Round ${r} scenarios`] = story.scenarios.filter((s) => s.rounds.includes(r)).length;
counts["Scenarios"] = story.scenarios.length;
counts["Events"] = story.events.length;
counts["**Total scenarios + events**"] = `**${story.scenarios.length + story.events.length}**`;
counts["Futures"] = story.futures.length;
counts["Future stories"] = story.futures.reduce((n, f) => n + f.stories.length, 0);
counts["State of the Art milestones"] = story.sota.length;
counts["Tipping points"] = story.tipping.length;
const pathEstimate = knuth(Math.max(2000, Math.round(GAMES / 20)));
counts["Distinct paths through the game (sampled estimate)"] = "about " + fmt(Number(pathEstimate.toPrecision(2)));

// Rewrite only the numbers in the SCALE table's rows; add rows that are missing.
const lines = text.split("\n");
let inScale = false, lastRow = -1;
const done = {};
for (let i = 0; i < lines.length; i++) {
  if (/^#\s/.test(lines[i])) inScale = /^#\s+SCALE\s*$/i.test(lines[i]);
  if (!inScale) continue;
  const m = /^\|\s*(.+?)\s*\|\s*(.*?)\s*\|\s*$/.exec(lines[i]);
  if (!m || /^-+$/.test(m[1]) || m[1] === "Section") continue;
  lastRow = i;
  if (!(m[1] in counts)) { if (/^(Round \d+ scenarios|Distinct paths)/.test(m[1])) { lines.splice(i, 1); i--; } continue; }
  lines[i] = `| ${m[1]} | ${typeof counts[m[1]] === "number" ? fmt(counts[m[1]]) : counts[m[1]]} |`;
  done[m[1]] = true;
}
const extra = Object.keys(counts).filter((k) => !done[k]);
if (extra.length && lastRow >= 0) {
  // New round rows go after the last round row; anything else at the end of the table.
  extra.forEach((k) => {
    let at = -1;
    for (let i = 0; i < lines.length; i++) if (/^\|\s*Round \d+ scenarios/.test(lines[i])) at = i;
    if (!/^Round /.test(k) || at < 0) { for (let i = lastRow; i < lines.length && /^\|/.test(lines[i]); i++) at = i; }
    lines.splice(at + 1, 0, `| ${k} | ${typeof counts[k] === "number" ? fmt(counts[k]) : counts[k]} |`);
  });
}
const updated = lines.join("\n");
if (updated !== text) fs.writeFileSync(FILE, updated);

console.log(`\nSCALE table ${updated !== text ? "updated" : "already up to date"}:\n`);
Object.keys(counts).forEach((k) => console.log("  " + k.replace(/\*/g, "").padEnd(52) + String(counts[k]).replace(/\*/g, "")));

// --- 4. The big simulation ----------------------------------------------------

const futureCounts = {};
story.futures.forEach((f) => (futureCounts[f.id] = 0));
const cardCounts = {};
story.scenarios.concat(story.events, story.sota).forEach((c) => (cardCounts[c.id] = 0));
const sums = {}, reached = {}, lateGrounded = {}, samples = {};
story.futures.forEach((f) => {
  sums[f.id] = {}; reached[f.id] = 0; lateGrounded[f.id] = 0; samples[f.id] = [];
  Engine.VALUE_IDS.forEach((v) => (sums[f.id][v] = 0));
});
const pools = {};
for (let r = 1; r <= ROUNDS; r++) pools[r] = { min: Infinity, max: 0, sum: 0, n: 0 };
const never = {
  noCard: 0, safety: 0, order: 0, duplicate: 0, ahBefore: 0, ordinaryAfter: 0, eventAfter: 0,
  longMiddleAfter: 0, flagUnshown: 0, missingOpener: 0, requires: 0, ungrounded: 0, capability: 0, slowdowns: 0,
  hiddenSlowdown: 0, earlyOnly: 0, unfilled: 0, sameQuestion: 0, gap: 0, noStory: 0, gaugeClimb: 0, pastMoved: 0, unanswered: 0, contradiction: 0,
  unseenMilestone: 0, paceRose: 0, rateInSlowWorld: 0
};
// v5.7: the world's pace, ranked, and words that state a rate of growth.
const SOTA_BY = {}; story.sota.forEach((a) => (SOTA_BY[a.id] = a));
const PACE_RANK = { held: 0, leveled: 0, paced: 1, racing: 2, beyond: 3 };
const RATE_WORDS = /\b(output|capabilit\w*|computing power)\b[^.]{0,60}\bdoubl\w*|\bdoubl\w*[^.]{0,40}\b(output|capabilit\w*)\b|\bexponential\w*/i;
const paceBy = (st, year) => { let p = "racing"; st.reached.forEach((id) => { const a = SOTA_BY[id]; if (a && a.setsPace && a.year <= year) p = a.setsPace; }); return p; };
const ladder = { agiOnTime: 0, rsi: 0, asi: 0, asiPaced: 0, slowed: 0 };
let paceAsked = 0;
// v5.9: a world held or leveled off at round Pressure question by round meets the push for more AI by then.
const PRESSURE_CARDS = new Set(story.settings.pressureCards || []);
let pressureWorlds = 0, pressureMet = 0;
const PACE_CARDS = new Set(story.settings.paceCards || []);
const flow = { cards: 0, spine: 0, recent: 0, below: 0, agi: 0, asi: 0, agiOnTime: 0, lastCards: 0, offers: 0, onLeader: 0, futures: 0 };
// v5.2: cards that assume AI stopped short of superintelligence ("not reached sota-asi").
const SLOW_CARD = new Set(story.scenarios.filter((s) => (s.appears || []).some((t) => t.type === "reached" && t.not && t.id === "sota-asi")).map((s) => s.id));
const LEVEL = (name) => story.settings.gaugeLevels.map((l) => l.toLowerCase()).indexOf(name);
const storySamples = [];
const arcs = { tipping: 0, agents_era: 0, near_miss: 0 };
const tipTypes = {};
let eventsTotal = 0, zeroGames = 0;
const eventsPerGame = {}, perGame = {};
const zeroByValue = {};
Engine.VALUE_IDS.forEach((v) => (zeroByValue[v] = 0));
const arcSamples = { tipping: [], agents_era: [], near_miss: [] };
const FUTURE_YEAR = parseInt((story.ui && story.ui["Future dateline"]) || "2060", 10);
const rateHits = {}, unseenHits = {};
const yearOf = (l) => (l.kind === "tipping" ? l.year : (l.scenario || l.event || l.item).year);

// v5.4: contradictions a player must never meet: a card, milestone or Future in a world its
// text denies, or after a decision it contradicts. Each is prevented by conditions in
// story.md; these rules catch any later edit that would let one through.
const chose = (state, k) => !!state.flags[k];
const saw = (log, id) => log.some((l) => (l.kind === "choice" && l.scenario.id === id) || (l.kind === "event" && l.event.id === id));
// A milestone reached, or one that Counts as it (sota-asi-paced counts as sota-asi).
const COUNTS = {}; story.sota.forEach((a) => (COUNTS[a.id] = a.countsAs || null));
const got = (state, id) => state.reached.some((r) => r === id || COUNTS[r] === id);
const tipped = (state) => !!state.flags.after_humanity;
// v5.9: milestones that show AI climbing again after a slowdown, each caused by a Choice.
const RISE = ["sota-unheld", "sota-unheld-paced", "sota-unheld-early", "sota-unheld-late", "sota-open-early", "sota-open", "sota-open-late", "sota-relaunch", "sota-relaunch-late"];
const EXEMPT = ["exempt_medicine", "exempt_defense", "exempt_climate"];
const STALLED_TEXT = /settled instead at the level of a good professional/;
const CONTRADICTIONS = [
  { name: "AI-run factories doubling output after a money plateau", test: (st, log) => saw(log, "r4-factories") && (got(st, "sota-plateau") || got(st, "sota-steady")) },
  { name: "the cap renewal without the full moratorium", test: (st, log) => saw(log, "r6-cap") && !chose(st, "r5-moratorium/A") && !chose(st, "r4-selfimprove/C") },
  { name: "a ceiling treaty proposed while a pause is in force", test: (st, log) => { const i = log.findIndex((l) => l.kind === "choice" && l.scenario.id === "r6-slowtreaty"); if (i === -1) return false; const before = log.slice(0, i).filter((l) => l.kind === "choice"); const set = before.map((l) => l.choice.sets.includes("pause")).lastIndexOf(true); return set !== -1 && !before.slice(set).some((l) => (l.choice.clears || []).includes("pause")); } },
  { name: "arms talks collapsing after the drone ban passed", test: (st, log) => saw(log, "ev-talks") && chose(st, "r3-drones/B") },
  { name: "AI leveling off after the player let it improve itself", test: (st) => chose(st, "r4-selfimprove/A") && (got(st, "sota-plateau") || got(st, "sota-held")) },
  { name: "a money plateau after a worldwide pause call", test: (st) => chose(st, "restraint") && got(st, "sota-plateau") },
  { name: "a growth milestone after AI leveled off", test: (st) => (got(st, "sota-economy") || got(st, "sota-builders")) && (["sota-plateau", "sota-steady"].some((m) => got(st, m)) || got(st, "sota-held")) && !RISE.some((m) => got(st, m)) },
  // v5.8: the story's last paragraph agrees with what the player did with the archive.
  { name: "Our Legacy, Lost saying the whole archive survives after it was carved or let go", test: (st, log, f) => f === "last_war" && ["r7-archive/B", "r7-archive/C"].some((k) => chose(st, k)) && Engine.storiesFor(st, story.futures.find((x) => x.id === "last_war")).some((s) => /still holds everything|still runs, whole/.test(Engine.storyText(st, s).slice(-1)[0])) },
  { name: "Our Legacy, Lost without the war tipping point", test: (st, log, f) => f === "last_war" && !chose(st, "tip-war") },
  { name: "The Pause with no pause in force", test: (st, log, f) => f === "pause" && !chose(st, "pause") },
  { name: "Glass Houses after rejecting scores or face recognition", test: (st, log, f) => f === "glass_houses" && ["r5-socialcredit/B", "r3-policing/B", "r5-faces/A"].some((k) => chose(st, k)) },
  { name: "Two Kinds after limiting or sharing enhancement", test: (st, log, f) => f === "two_kinds" && ["r4-embryo/B", "r4-embryo/C", "r3-implants/C", "r7-enhanced/C"].some((k) => chose(st, k)) },
  { name: "Back to Earth after a pause call or a rescue of the race", test: (st, log, f) => f === "back_to_earth" && (["restraint", "pause", "r5-bust/A"].some((k) => chose(st, k)) || got(st, "sota-held")) },
  { name: "Common Ground after putting one AI above governments", test: (st, log, f) => f === "partnership" && ["r4-climate/A", "r6-owners/C", "r6-grid/C"].some((k) => chose(st, k)) },
  { name: "Afterlife after investing in the real world or limiting recreations of the dead", test: (st, log, f) => f === "upload" && ["r4-virtual/A", "r4-griefbots/B"].some((k) => chose(st, k)) },
  { name: "Elsewhere or The Gilded Ones after the machines were shared", test: (st, log, f) => (f === "escape" || f === "gilded_few") && ["r6-owners/C", "r7-work/C", "r3-companies/C"].some((k) => chose(st, k)) },
  { name: "Blackout after manual control came back", test: (st, log, f) => f === "blackout" && !tipped(st) && ["r6-grid/B", "r5-coordinator/C", "r4-virtual/A"].some((k) => chose(st, k)) },
  // v5.5: pacing delays superintelligence to 2040; it never comes in 2035 after a pace Choice.
  { name: "superintelligence in 2035 after a pace Choice", test: (st) => st.reached.includes("sota-asi") && chose(st, "paced") && st.years.paced < 2035 },
  // v5.5: nothing a player reads says the race ran unchecked after they chose to pace it.
  { name: "AI said to race unchecked after a pace Choice", test: (st, log, f, said) => chose(st, "paced") && said.some(([t, y]) => y > st.years.paced && UNCHECKED.test(t)) },
  // v5.9: the push for more AI. Every rise has its Choice, and the pure Futures stay pure.
  { name: "the pause lifted with no Choice to lift it", test: (st) => ["sota-unheld", "sota-unheld-early", "sota-unheld-late"].some((m) => got(st, m)) && !chose(st, "lifted") },
  { name: "one field opened with no exemption", test: (st) => ["sota-open-early", "sota-open", "sota-open-late"].some((m) => got(st, m)) && !EXEMPT.some((k) => chose(st, k)) },
  { name: "AI climbing again with no Choice to pay for it", test: (st) => ["sota-relaunch", "sota-relaunch-late"].some((m) => got(st, m)) && !chose(st, "relaunch") },
  { name: "Back to Earth without the people's verdict, or after a restart", test: (st, log, f) => f === "back_to_earth" && (!chose(st, "people_said_no") || ["relaunch", "lifted"].some((k) => chose(st, k))) },
  // v6.0: a worldwide pause or halt sticks. AI never climbs past it unless a Choice on the
  // strip lifted it, raised it in stages, opened a field or restarted the climb.
  { name: "AI climbing after a pause with no Choice to lift it", test: (st) => st.flags.pause && st.years.pause != null && !["lifted", "relaunch", "r6-cap/B"].concat(EXEMPT).some((k) => chose(st, k)) && st.reached.some((id) => { const a = SOTA_BY[id]; return a.year > st.years.pause && (a.gauge && a.gauge.toLowerCase() !== "hold" || ["paced", "racing", "beyond"].includes(a.setsPace)); }) },
  { name: "general intelligence after the halt was signed into a treaty", test: (st) => ["r3-geneva/A", "r3-geneva/B"].some((k) => chose(st, k)) && ["sota-agi", "sota-agi-late", "sota-agi-geneva", "sota-robots-late"].some((m) => got(st, m)) },
  { name: "The Pause after an exemption or a lift", test: (st, log, f) => f === "pause" && (EXEMPT.some((k) => chose(st, k)) || chose(st, "lifted")) },
  // v5.9: an Event or card shown while AI is held or leveled never says it improves itself now.
  { name: "AI said to improve itself in a world that held or leveled it", test: (st, log) => log.some((l) => { const it = l.kind === "event" ? l.event : l.kind === "choice" ? l.scenario : null; return it && ["held", "leveled"].includes(paceBy(st, it.year)) && SELF_NOW.test([].concat(it.summary, it.story).join(" ")); }) },
  { name: "a card saying AI stalled, in a world that held it", test: (st, log) => log.some((l) => l.kind === "choice" && ["r5-bust", "r5-checkers", "r6-slowtreaty"].includes(l.scenario.id) && paceBy(st, l.scenario.year) === "held") },
  { name: "The Long Middle saying AI stalled in a world that held it or restarted it", test: (st, log, f) => f === "long_middle" && (got(st, "sota-held") || chose(st, "relaunch")) && Engine.storiesFor(st, story.futures.find((x) => x.id === "long_middle")).some((x) => STALLED_TEXT.test(x.text.join(" "))) },
  { name: "Our Legacy, Lost blaming scheming machines after the defense carve-out", test: (st, log, f) => f === "last_war" && chose(st, "exempt_defense") && Engine.storiesFor(st, story.futures.find((x) => x.id === "last_war")).some((x) => /reached the same conclusion/.test(x.text.join(" "))) },
  { name: "The Oracle after humans-decide or many competing AIs", test: (st, log, f) => f === "oracle" && ["r3-estonia/B", "r3-companions/C", "r7-vote/C"].some((k) => chose(st, k)) }
];
const contradictionHits = {};
// v6.0: the decision a milestone's Because line cites (the flag its line names), for the repeats report.
const repeatCites = {};
const citeOf = (l) => (l.cite && l.cite.length ? l.cite.join(",") : null);
const SELF_NOW = /self-improving|improves itself|now improving itself|designs, trains and tests/i;
const UNCHECKED = /\bunchecked\b|no brakes at all|no one slowed|nothing slowed|at full speed/i;
// Worlds report (developer only, in path-audit.md): where each item appears.
const yearOfFlag = (st, f) => (st.years[f] != null ? st.years[f] : Infinity);
const SOTA_YEAR = {}; story.sota.forEach((a) => (SOTA_YEAR[a.id] = a.year));
const reachedBy = (st, id, y) => st.reached.some((r) => (r === id || COUNTS[r] === id) && SOTA_YEAR[r] <= y);
const WORLD_KEYS = [
  ["plateau", (st, y) => reachedBy(st, "sota-plateau", y)],
  ["held", (st, y) => reachedBy(st, "sota-held", y)],
  ["self-improving", (st, y) => reachedBy(st, "sota-rsi", y)],
  ["superintelligence", (st, y) => reachedBy(st, "sota-asi", y)],
  ["pause", (st, y) => yearOfFlag(st, "pause") <= y],
  ["tipped", (st, y) => yearOfFlag(st, "after_humanity") <= y],
  ["agents era", (st, y) => yearOfFlag(st, "agents_era") <= y]
];
const worlds = {};
const leads = { n: 0, dflt: 0 };
for (let g = 0; g < GAMES; g++) {
  const { state, shown } = playRandom(undefined, undefined, g < 3000);
  const log = state.log;
  // Things a player must never see.
  if (shown.length !== ROUNDS) never.noCard++;
  shown.forEach((x) => {
    if (x.safety) never.safety++;
    if (x.round > 1 && !x.lead) never.missingOpener++;
    const s = Engine.cardById(x.id);
    if (x.round > 1 && !s.afterHumanity) {
      leads.n++;
      const d = s.openers.find((o) => o.isDefault);
      if (d && x.lead === d.text) leads.dflt++;
    }
    if (!x.capOk) never.capability++;
    if (x.round > 1 && !s.afterHumanity) {
      flow.cards++;
      if (x.spine >= 0.75) flow.spine++;
      if (x.recent) flow.recent++;
      if (x.below) flow.below++;
    }
    if (s.afterHumanity && !x.afterHumanity) never.ahBefore++;
    if (!s.afterHumanity && x.afterHumanity) never.ordinaryAfter++;
    const p = pools[x.round];
    p.min = Math.min(p.min, x.pool); p.max = Math.max(p.max, x.pool); p.sum += x.pool; p.n++;
  });
  if (log.some((l, i) => i && yearOf(l) < yearOf(log[i - 1]))) never.order++;
  if (new Set(state.seen).size !== state.seen.length) never.duplicate++;
  if (log.filter((l) => l.kind === "sota" && l.item.slowdown).length > 1) never.slowdowns++;
  if (state.gauge >= LEVEL("agi")) flow.agi++;
  if (state.reached.includes("sota-agi")) flow.agiOnTime++;
  // v5.5: the ladder, and the race, pace or pause question in round 1 or 2.
  if (state.reached.includes("sota-rsi")) ladder.rsi++;
  if (state.reached.includes("sota-asi")) ladder.asi++;
  if (state.reached.includes("sota-asi-paced")) ladder.asiPaced++;
  if (got(state, "sota-held") || got(state, "sota-plateau")) ladder.slowed++;
  if (shown.some((x) => x.round <= (story.settings.paceBy || 3) && PACE_CARDS.has(x.id))) paceAsked++;
  {
    const by = story.settings.pressureBy || 5, at = shown.find((x) => x.round === by);
    if (at && !at.afterHumanity && ["held", "leveled"].includes(paceBy(state, Engine.cardById(at.id).year))) {
      pressureWorlds++;
      if (shown.some((x) => x.round <= by && PRESSURE_CARDS.has(x.id))) pressureMet++;
    }
  }
  // v5.3: after a slowdown the capability curve flattens (it rises less than 12% of its
  // height from the slowdown to the last year); with superintelligence it keeps climbing.
  // v5.4: unless the player raced again after it (a Choice with a Brake of -1 or less).
  if (!state.flags.after_humanity) {
    const H = Engine.gaugeHeights(state, GSTEPS);
    const at = (y) => H[Math.round(((y - GY[0]) / (GY[1] - GY[0])) * GSTEPS)];
    const slow = log.find((l) => l.kind === "sota" && l.item.slowdown);
    const racedAfter = slow && log.some((l) => l.kind === "choice" && l.scenario.year >= slow.item.year && (l.choice.brake || 0) <= -1);
    const lifted = slow && log.some((l) => l.kind === "sota" && ["lift", "open", "relaunch"].includes(l.item.slot) && l.item.year > slow.item.year);
    if (slow && !racedAfter && !lifted && !got(state, "sota-asi") && (H[GSTEPS] - at(slow.item.year)) / H[GSTEPS] > 0.12) never.gaugeClimb++;
  }
  // v5.7: a card that requires a milestone comes only after the strip has shown it; the
  // pace never rises unless a shown milestone says why; and no card or Event states a
  // rate of growth (doubling, exponential) in a world held at the line or leveled off.
  log.forEach((l, i) => {
    if (l.kind !== "choice") return;
    const before = log.slice(0, i).filter((x) => x.kind === "sota");
    const miss = (l.scenario.appears || []).filter((t) => t.type === "reached" && !t.not && !before.some((x) => x.item.id === t.id || x.item.countsAs === t.id));
    if (miss.length) { never.unseenMilestone++; miss.forEach((t) => { const k = l.scenario.id + " needs " + t.id; unseenHits[k] = (unseenHits[k] || 0) + 1; }); }
  });
  {
    let p = "racing";
    state.reached.forEach((id) => {
      const a = SOTA_BY[id];
      if (!a || !a.setsPace) return;
      if (PACE_RANK[a.setsPace] > PACE_RANK[p] && !log.some((l) => l.kind === "sota" && l.item.id === id)) never.paceRose++;
      p = a.setsPace;
    });
  }
  log.forEach((l) => {
    const c = l.kind === "choice" ? l.scenario : l.kind === "event" ? l.event : null;
    if (!c) return;
    const pace = paceBy(state, c.year);
    if ((pace === "held" || pace === "leveled") && RATE_WORDS.test([c.headline].concat(c.summary || [], c.story || []).join(" "))) {
      never.rateInSlowWorld++;
      rateHits[c.id + " (" + pace + ")"] = (rateHits[c.id + " (" + pace + ")"] || 0) + 1;
    }
  });
  // v5.4: an Event that demands a response is answered by the very next card (one of its
  // openers or conditions names the Event).
  log.forEach((l, i) => {
    if (l.kind !== "event" || !l.event.demands) return;
    const next = log.slice(i + 1).find((x) => x.kind === "choice");
    if (!next) return;
    const c = next.scenario, named = StoryParser.flagsIn(c.appears).concat(...c.openers.map((o) => StoryParser.flagsIn(o.when)));
    if (named.indexOf(l.event.id) === -1) never.unanswered++;
  });
  // v6.0: so is a Choice that demands a response (the halt, answered in Geneva).
  log.forEach((l, i) => {
    if (l.kind !== "choice" || !l.choice.demands) return;
    const next = log.slice(i + 1).find((x) => x.kind === "choice");
    if (!next || state.flags.after_humanity) return;
    const c = next.scenario, named = StoryParser.flagsIn(c.appears).concat(...c.openers.map((o) => StoryParser.flagsIn(o.when)));
    if (named.indexOf(l.choice.key) === -1 && named.indexOf(l.scenario.id) === -1 && !(c.appears || []).some((t) => (l.choice.sets || []).includes(t.flag))) never.unanswered++;
    if (log.slice(i + 1, log.indexOf(next)).some((x) => x.kind === "event")) never.unanswered++;
  });
  // v6.0: two milestones in a row explained by the same decision (a gap in the chain of
  // Because lines, for a person to write; reported, not a failure).
  {
    const whys = log.filter((l) => l.kind === "sota" && l.why);
    whys.forEach((l, i) => { if (i && citeOf(l) && citeOf(l) === citeOf(whys[i - 1])) { const k = whys[i - 1].item.id + " → " + l.item.id + " (" + citeOf(l) + ")"; repeatCites[k] = (repeatCites[k] || 0) + 1; } });
  }
  // A slow-world card must come after a slowdown the player saw.
  log.forEach((l, i) => {
    if (l.kind === "choice" && SLOW_CARD.has(l.scenario.id) && !log.slice(0, i).some((x) => x.kind === "sota" && x.item.slowdown)) never.hiddenSlowdown++;
    if (l.kind === "sota" && /\{year\}/.test(l.why || "")) never.unfilled++;
  });
  shown.forEach((x) => { if (/\{year\}/.test(x.lead || "")) never.unfilled++; });
  // Two cards in a row asking the same words look, on screen, like the question flickering.
  shown.forEach((x, i) => { if (i && Engine.cardById(x.id).question === Engine.cardById(shown[i - 1].id).question) never.sameQuestion++; });
  // v5.3: at most Most years between cards between two cards in a row, and from the last card to the Future.
  const gapMax = story.settings.maxGap || Infinity;
  const ys = shown.map((x) => Engine.cardById(x.id).year).concat([FUTURE_YEAR]);
  if (ys.some((y, i) => i && y - ys[i - 1] > gapMax)) never.gap++;
  if (state.gauge >= LEVEL("superintelligence")) flow.asi++;
  if (storySamples.length < 30) storySamples.push({ state, shown, future: null });
  // v5.4: the known contradictions (CONTRADICTIONS, below) never happen, and the worlds
  // report counts where each card, Event, milestone and Future appears.
  const futureId = Engine.chooseFuture(state).future.id;
  // What the player read after each decision, with its year: lead-ins, card texts, milestones' why, and the Future.
  const said = [];
  shown.forEach((x) => { const c = Engine.cardById(x.id); [x.lead, c.summary, c.story].forEach((t) => t && said.push([[].concat(t).join(" "), c.year])); });
  log.forEach((l) => { if (l.kind === "sota" && l.why) said.push([l.why, l.item.year]); });
  const fc = Engine.chooseFuture(state);
  fc.lookingBack.forEach((m) => said.push([m.text, FUTURE_YEAR]));
  CONTRADICTIONS.forEach((r) => { if (r.test(state, log, futureId, said)) { never.contradiction++; contradictionHits[r.name] = (contradictionHits[r.name] || 0) + 1; } });
  const items = log.map((l) => l.kind === "choice" ? [l.scenario.id, l.scenario.year] : l.kind === "event" ? [l.event.id, l.event.year] : l.kind === "sota" ? [l.item.id, l.item.year] : null).filter(Boolean);
  items.push(["Future: " + futureId, FUTURE_YEAR]);
  items.forEach(([id, y]) => {
    const w = (worlds[id] = worlds[id] || { n: 0 });
    w.n++;
    WORLD_KEYS.forEach(([k, f]) => { if (f(state, y)) w[k] = (w[k] || 0) + 1; });
  });
  const tipAt = log.findIndex((l) => l.kind === "tipping");
  if (tipAt !== -1 && log.slice(tipAt).some((l) => l.kind === "event")) never.eventAfter++;

  const n = log.filter((l) => l.kind === "choice" || l.kind === "event").length;
  perGame[n] = (perGame[n] || 0) + 1;
  const evs = log.filter((l) => l.kind === "event").length;
  eventsTotal += evs;
  eventsPerGame[evs] = (eventsPerGame[evs] || 0) + 1;
  state.seen.forEach((id) => cardCounts[id]++);
  log.forEach((l) => { if (l.kind === "sota") cardCounts[l.item.id]++; });

  if (state.flags.after_humanity) { arcs.tipping++; tipTypes[state.tipping.type] = (tipTypes[state.tipping.type] || 0) + 1; }
  if (state.flags.agents_era) arcs.agents_era++;
  if (state.flags.near_miss) arcs.near_miss++;
  const scaledEnd = Engine.scaled(state);
  // v5.6: after a tipping point the lost Values are frozen and shown as they stood before it,
  // grayed out, so a zero there is a snapshot, not a balance the game ended on.
  const live = (v) => !(state.snapshot && (story.settings.valuesLost || []).includes(v));
  if (Engine.VALUE_IDS.some((v) => live(v) && state.values[v] === 0)) zeroGames++;
  Engine.VALUE_IDS.forEach((v) => { if (live(v) && state.values[v] === 0) zeroByValue[v]++; });

  const choice = Engine.chooseFuture(state);
  const fut = choice.future;
  futureCounts[fut.id]++;
  reached[fut.id]++;
  Engine.VALUE_IDS.forEach((v) => (sums[fut.id][v] += scaledEnd[v]));
  if (!Engine.meets(state, fut) && !(state.flags.after_humanity && state.tipping && state.tipping.future === fut.id)) never.requires++;
  if (fut.targets && !choice.grounding.length) never.ungrounded++;
  // v5.3: a story that fits the world the player saw (its When).
  if (!fut.stories.some((st) => Engine.holds(state, st.when))) never.noStory++;
  if (state.flags.after_humanity && !fut.targets) never.longMiddleAfter++;
  // A Future that requires a flag shows, in How we got here, the decision that set it.
  StoryParser.flagsIn(fut.requires.filter((t) => !t.not)).forEach((f) => {
    if (!choice.lookingBack.some((m) => m.key === state.source[f])) never.flagUnshown++;
  });
  if (choice.grounding.some((m) => m.entry.kind === "choice" && m.round >= LATE)) lateGrounded[fut.id]++;
  // v5.2: a Future is a collection of decisions, never only early ones.
  if (fut.targets && !state.flags.after_humanity && !choice.lookingBack.some((m) => m.round >= story.settings.futureRecentRound)) never.earlyOnly++;
  if (choice.lookingBack.some((m) => /\{year\}/.test(m.text))) never.unfilled++;
  const last = shown[shown.length - 1];
  if (last && last.leader) {
    flow.lastCards++;
    if (last.offers) flow.offers++;
    if (fut.id === last.leader) flow.onLeader++;
  }
  // Keep a few distinct playthroughs for the audit.
  const sig = log.map((l) => (l.kind === "choice" ? l.choice.key : l.kind === "event" ? l.event.id : "")).join(" ");
  if (samples[fut.id].length < 3 && !samples[fut.id].some((x) => x.sig === sig)) samples[fut.id].push({ sig, state, choice });
  ["tipping", "agents_era", "near_miss"].forEach((k) => {
    const on = k === "tipping" ? state.flags.after_humanity : state.flags[k];
    if (on && arcSamples[k].length < 2 && !arcSamples[k].some((x) => x.sig === sig)) arcSamples[k].push({ sig, state, choice });
  });
}

// "Seeking" reach: a player who always picks the Choice that sets the Future's required
// flags or grounds it, and otherwise brings the (scaled) Values closest to its Targets.
// A sampled, rough stand-in for v4.1's exact best-play reach.
function seekReach(future, games) {
  const keys = new Set(future.grounded.map((g) => g.key));
  const want = new Set(StoryParser.flagsIn(future.requires.filter((t) => !t.not)));
  let hits = 0;
  for (let g = 0; g < games; g++) {
    const { state } = playRandom(undefined, (st, s) => {
      let best = null, bestScore = -Infinity;
      for (const c of s.choices) {
        let sc = 0;
        if (c.sets.some((f) => want.has(f))) sc += 100;
        if (want.has("agents_era") && c.agents > 0) sc += 50;
        if (want.has("near_miss") && c.tipping) sc += 50;
        if (want.has("after_humanity") && c.tipping) sc += 50;
        if (want.has("tended_life") && c.sets.includes("tends_life")) sc += 100;
        if (keys.has(c.key)) sc += 10;
        if (future.targets) {
          const v = Engine.applyEffects(st.values, c.effects);
          const k = Math.min(1, story.settings.valueScaleRounds / Math.min(ROUNDS, st.round));
          const scaledV = {};
          Engine.VALUE_IDS.forEach((id) => (scaledV[id] = v[id] * k));
          sc -= Engine.distance(scaledV, future);
        }
        sc += Engine.random() * 0.01;
        if (sc > bestScore) { bestScore = sc; best = c; }
      }
      return best;
    });
    if (Engine.chooseFuture(state).future.id === future.id) hits++;
  }
  return (100 * hits) / games;
}

const flagShare = (got, t) => (t && (got < t[0] - 0.05 || got > t[1] + 0.05) ? "  <-- check" : "");
console.log(`\nFutures (${fmt(GAMES)} random games; "seeking" reach from ${fmt(Math.max(500, GAMES / 50))} games of a player aiming for it)\n`);
console.log("  " + "Future".padEnd(18) + " share  (target)        seeking reach");
const SEEK = Math.max(500, Math.round(GAMES / 50));
let shareFlags = 0;
story.futures.forEach((f) => {
  const share = (100 * futureCounts[f.id]) / GAMES;
  const t = TARGET[f.id] || [0, MAX_SHARE];
  const fl = flagShare(share, t) || (f.targets && share > MAX_SHARE ? "  <-- check" : "");
  if (fl) shareFlags++;
  let line = "  " + f.title.padEnd(18) + pct(share) + ("  (" + (TARGET[f.id] ? `${t[0]}–${t[1]}%` : `≤${MAX_SHARE}%`) + ")").padEnd(12) + fl.padEnd(12);
  if (f.targets) line += "   " + pct(seekReach(f, SEEK));
  console.log(line.trimEnd());
});

// --- Pools, arcs, Events, Values ---------------------------------------------------

console.log(`\nPools (cards that qualify at the start of each round: min / average / max)\n`);
for (let r = 1; r <= ROUNDS; r++) {
  const p = pools[r];
  if (!p.n) { console.log(`  Round ${r}: never reached`); continue; }
  console.log(`  Round ${r}`.padEnd(12) + `${p.min} / ${(p.sum / p.n).toFixed(1)} / ${p.max}`);
}
console.log(never.safety ? `  The safety net was used ${never.safety} time(s).  <-- check` : "  The safety net was never used (no round ever had an empty pool).");

console.log(`\nArcs (share of games)\n`);
const arcLine = (name, k) => {
  const got = (100 * arcs[k]) / GAMES;
  return "  " + name.padEnd(18) + pct(got) + `  (${ARCS[k][0]}–${ARCS[k][1]}%)` + flagShare(got, ARCS[k]);
};
console.log(arcLine("Tipping point", "tipping") + (arcs.tipping ? "   " + Object.keys(tipTypes).map((t) => `${t} ${pct((100 * tipTypes[t]) / GAMES).trim()}`).join(", ") : ""));
console.log(arcLine("Agents era", "agents_era"));
console.log(arcLine("Near miss", "near_miss"));

// v5.1: how the story flows. Targets (after v5.3, AI climbs unless the player brakes it):
// AGI in nearly every game and on time in most, superintelligence in most; at least 75% of cards on the player's storylines; at least 85% following, at full
// strength, a decision from the last two rounds; few cards below the round's scale.
console.log(`\nFlow (cards after round 1, before any tipping point)\n`);
const fl = (name, n, d, lo, hi) => { const v = (100 * n) / d; return "  " + name.padEnd(34) + pct(v) + `  (${lo}–${hi}%)` + (v < lo || v > hi ? "  <-- check" : ""); };
console.log(fl("AGI reached", flow.agi, GAMES, 90, 100));
const AGI_YEAR = (story.sota.find((a) => a.id === "sota-agi") || {}).year;
console.log(fl("AGI on time (" + AGI_YEAR + ")", flow.agiOnTime, GAMES, 70, 90));
// v5.5 (docs/review/v5.5-timelines-audit.md): true self-improvement 2032, superintelligence 2035, paced 2040, or held or leveled off.
console.log(fl("Self-improvement on time (2032)", ladder.rsi, GAMES, 45, 70));
console.log(fl("Superintelligence in 2035", ladder.asi, GAMES, 40, 65));
console.log(fl("Paced superintelligence (2040)", ladder.asiPaced, GAMES, 10, 35));
console.log(fl("Held at the line or leveled off", ladder.slowed, GAMES, 10, 35)); // v6.0: 10–35, since signing in Geneva holds the line
console.log(fl("Race, pace or pause by round " + (story.settings.paceBy || 3), paceAsked, GAMES, 90, 100));
console.log(fl("Pushed for more AI by round " + (story.settings.pressureBy || 5), pressureMet, pressureWorlds || 1, 90, 100) + `  of ${pressureWorlds} held or leveled games`);
console.log(fl("Superintelligence reached", flow.asi, GAMES, 60, 92)); // v6.0: 60–92
console.log(fl("On the player's storylines", flow.spine, flow.cards, 75, 100));
console.log(fl("Follows a decision from 2 rounds", flow.recent, flow.cards, 85, 100));
console.log(fl("Below the round's scale", flow.below, flow.cards, 0, 5));
// v5.2: the last card continues the Future the game is heading for (random players often turn away).
console.log(fl("Last card offers the leading Future", flow.offers, flow.lastCards, 60, 100));
console.log(fl("Random play ends at that Future", flow.onLeader, flow.lastCards, 40, 100));

console.log(`\nEvents (${(eventsTotal / GAMES).toFixed(2)} per game on average; target about 1.5, each Event in 7–50% of games (v5.3: Events follow the player's storylines))\n`);
console.log("  Events per game: " + Object.keys(eventsPerGame).sort().map((k) => `${k}: ${pct((100 * eventsPerGame[k]) / GAMES).trim()}`).join(", "));
story.events.forEach((e) => {
  const share = (100 * cardCounts[e.id]) / GAMES;
  const target = !e.nearMiss && !e.certain && story.events.some((x) => x.likelihood);
  console.log("    " + e.id.padEnd(20) + pct(share) + "   rounds " + e.rounds.join(", ") + (e.nearMiss ? "   (after every near miss)" : "") + (e.certain ? "   (certain once its Appears when holds)" : "") + (target && (share < 7 || share > 50) ? "  <-- check" : ""));
});

console.log(`\nValues: ${pct((100 * zeroGames) / GAMES).trim()} of games end with a Value at exactly zero (fine: a Value no decision moved stays at zero)`);
console.log("  " + Engine.VALUE_IDS.map((v) => `${v} ${pct((100 * zeroByValue[v]) / GAMES).trim()}`).join(", "));

// --- Steering and grounding ----------------------------------------------------------

console.log(`\nSteering (share of each Future's games grounded by a decision from round ${LATE} on)\n`);
story.futures.forEach((f) => {
  if (!f.targets) return;
  const share = reached[f.id] ? (100 * lateGrounded[f.id]) / reached[f.id] : 0;
  console.log("  " + f.title.padEnd(18) + pct(share) + "   (" + f.grounded.length + " Grounded by entries)");
});

// --- Timeline order and the things a player must never see ---------------------------

console.log(`\nTimeline (${fmt(GAMES)} random games)\n`);
console.log(`  Lead-ins that fall back to a card's default: ${pct((100 * leads.dflt) / leads.n).trim()} (keep it low: an opener tied to an earlier decision shows how we got here)`);
console.log("  Cards and Events per game: " + Object.keys(perGame).sort((a, b) => a - b).map((k) => `${k}: ${pct((100 * perGame[k]) / GAMES).trim()}`).join(", "));
const NEVER = [
  ["noCard", "a round with no card"],
  ["order", "something dated before what came just before it"],
  ["duplicate", "the same card twice in one game"],
  ["ahBefore", "an After humanity card before a tipping point"],
  ["ordinaryAfter", "an ordinary card after a tipping point"],
  ["eventAfter", "an Event after a tipping point"],
  ["longMiddleAfter", "The Long Middle after a tipping point"],
  ["flagUnshown", "a Future whose required flag isn't in its How we got here"],
  ["missingOpener", "a card after round 1 with no lead-in"],
  ["requires", "a Future given to a game that fails its Requires"],
  ["ungrounded", "a Future none of the game's decisions or Events lead to"],
  ["capability", "a card that assumes more capable AI than the world has at its date"],
  ["slowdowns", "more than one slowdown milestone shown in one game"],
  ["hiddenSlowdown", "a card about AI stalling with no slowdown shown before it"],
  ["earlyOnly", "a Future whose How we got here names no decision from round 4 on"],
  ["unfilled", "a sentence with an unfilled {year}"],
  ["sameQuestion", "two cards in a row with the same question"],
  ["gap", "more than " + (story.settings.maxGap || "?") + " years between two cards in a row, or between the last card and the Future"],
  ["noStory", "a Future with no story that fits the world's AI"],
  ["gaugeClimb", "a capability curve still climbing after AI leveled off"],
  ["pastMoved", "the filled part of the capability graph (the past) changing"],
  ["unanswered", "an Event that demands a response with no card answering it next"],
  ["contradiction", "a known contradiction (see CONTRADICTIONS in tools/check-story.js)"],
  ["unseenMilestone", "a card that requires a milestone the strip never showed"],
  ["paceRose", "AI's pace rising with no milestone shown to say why"],
  ["rateInSlowWorld", "a card or Event stating a rate of growth (doubling, exponential) in a world held or leveled off"]
];
// v5.5: no player text still gives AGI's, self-improvement's or superintelligence's old years.
const STALE = [
  [/(general AI|general intelligence|AGI)[^.]{0,60}\b2031\b|\b2031\b[^.]{0,60}(general AI|general intelligence|AGI)/i, ["sota-agi-late"]],
  [/(improv\w* itself|self-improv\w*|its own successor)[^.]{0,60}\b2038\b|\b2038\b[^.]{0,60}(improv\w* itself|self-improv\w*)/i, []],
  [/(superintelligen\w*|best human minds|minds beyond ours)[^.]{0,60}\b2040\b|\b2040\b[^.]{0,60}(superintelligen\w*|best human minds|minds beyond ours)/i, ["sota-asi-paced"]]
];
const staleHits = [];
text.split(/\n(?=## )/).forEach((chunk) => {
  const id = (chunk.match(/^## (\S+)/) || [])[1];
  if (!id) return;
  chunk.split("\n").filter((l) => !/^\*\*(Date|Image description):/.test(l)).forEach((l) => STALE.forEach(([re, ok]) => { if (re.test(l) && ok.indexOf(id) === -1) staleHits.push(id + ": " + l.slice(0, 120)); }));
});
never.stale = staleHits.length;
NEVER.push(["stale", "a line that still gives an old year for AGI, self-improvement or superintelligence (sentences, not games)"]);
let neverTotal = 0;
NEVER.forEach(([k, what]) => {
  neverTotal += never[k];
  console.log(never[k] ? `  ${never[k]} game(s) showed ${what}.  <-- check` : `  Never: ${what}.`);
});
console.log(brokenImages.length ? `  ${brokenImages.length} broken image path(s) (listed above).  <-- check` : "  Never: a broken image path.");
Object.keys(contradictionHits).forEach((k) => console.log(`    - ${contradictionHits[k]} game(s): ${k}`));
staleHits.forEach((h) => console.log("    - " + h));
Object.keys(unseenHits).forEach((k) => console.log(`    - milestone never shown: ${k}, ${unseenHits[k]} game(s)`));
Object.keys(rateHits).forEach((k) => console.log(`    - rate of growth in a slow world: ${k}, ${rateHits[k]} game(s)`));
// v6.0: the chain of Because lines (reported, for writing; not a failure).
{
  const rk = Object.keys(repeatCites).sort((a, b) => repeatCites[b] - repeatCites[a]);
  console.log(rk.length ? `  Two milestones in a row explained by the same decision (a gap in the chain to write), in ${rk.reduce((n, k) => n + repeatCites[k], 0)} game(s):` : "  Never: two milestones in a row explained by the same decision.");
  rk.slice(0, 12).forEach((k) => console.log(`    - ${repeatCites[k]} game(s): ${k}`));
}

// --- Alignment ------------------------------------------------------------------

console.log(`\nAlignment (average final Values, scaled, of players who reached each Future; v3.3's expected in brackets)\n`);
const sign = (x) => (x >= 0 ? "+" : "−") + Math.abs(x).toFixed(1);
story.futures.forEach((f) => {
  if (!f.targets || !reached[f.id]) return;
  const exp = ALIGN[f.id] || {};
  const keys = Object.keys(ALIGN[f.id] || f.targets);
  const parts = keys.map((v) => {
    const avg = sums[f.id][v] / reached[f.id];
    return `${v} ${sign(avg)}` + (exp[v] != null ? ` (${sign(exp[v])})` : "");
  });
  console.log("  " + f.title.padEnd(18) + parts.join(", "));
});

// --- Cards ----------------------------------------------------------------------

console.log(`\nCards (share of games each appears in)\n`);
const neverShown = [];
for (let r = 1; r <= ROUNDS; r++) {
  const row = story.scenarios.filter((s) => s.rounds[0] === r);
  console.log(`  Round ${r}`);
  row.forEach((s) => {
    if (!cardCounts[s.id]) neverShown.push(s.id);
    const tags = [s.rounds.length > 1 ? "rounds " + s.rounds.join("-") : "", s.focus ? "agents" : "", s.afterHumanity ? "after humanity" : ""].filter(Boolean).join(", ");
    console.log("    " + s.id.padEnd(22) + pct((100 * cardCounts[s.id]) / GAMES) + (tags ? "   " + tags : ""));
  });
}
console.log(`  State of the Art milestones`);
story.sota.forEach((a) => {
  if (!cardCounts[a.id]) neverShown.push(a.id);
  console.log("    " + a.id.padEnd(22) + pct((100 * cardCounts[a.id]) / GAMES) + "   " + a.date + ", gauge " + a.gauge + (a.slot ? ", slot " + a.slot : ""));
});
story.events.forEach((e) => { if (!cardCounts[e.id]) neverShown.push(e.id); });
console.log(neverShown.length ? `\n  Never appeared: ${neverShown.join(", ")}  <-- check` : `\n  Every card, Event and milestone appeared.`);
const unreached = story.futures.filter((f) => !futureCounts[f.id]).map((f) => f.title);
console.log(unreached.length ? `  Never reached: ${unreached.join(", ")}  <-- check` : "  Every Future was reached.");

// --- Replays: how many cards are new when a player plays again in one session ---

const SESSIONS = Math.max(1000, Math.round(GAMES / 10));
const REPLAYS = 5;
const fresh = new Array(REPLAYS).fill(0), seenCount = new Array(REPLAYS).fill(0);
for (let n = 0; n < SESSIONS; n++) {
  const history = {};
  for (let g = 0; g < REPLAYS; g++) {
    const { state } = playRandom(history);
    state.seen.forEach((id) => { seenCount[g]++; if (!history[id]) fresh[g]++; });
    state.seen.forEach((id) => (history[id] = true));
  }
}
console.log(`\nReplays (${fmt(SESSIONS)} sessions of ${REPLAYS} games; share of cards and Events not seen earlier in the session)\n`);
const game2 = (100 * fresh[1]) / seenCount[1];
for (let g = 1; g < REPLAYS; g++) console.log("  " + `Game ${g + 1}`.padEnd(18) + pct((100 * fresh[g]) / seenCount[g]) + (g === 1 && game2 < 90 ? "  <-- check (target at least 90%)" : ""));

// --- Audit: sample playthroughs per Future, written to path-audit.md -----------

function describe(out, { state, choice }) {
  state.log.forEach((l) => {
    if (l.kind === "choice") out.push(`- Round ${l.round} · ${l.scenario.date} · ${plain(l.scenario.label)}. Chose: ${plain(l.choice.text)}`);
    else if (l.kind === "event") out.push(`- *${plain(story.ui["Event label"] || "Out of your hands")}:* ${l.event.date} · ${plain(l.event.label)}`);
    else if (l.kind === "tipping") out.push(`- **Tipping point (${l.beat.type}):** ${plain(l.beat.label)}`);
    else out.push(`- *${plain(story.ui["State of the art label"] || "State of the art")}:* ${l.item.date} · ${plain(l.item.label)}`);
  });
  const flags = Object.keys(state.flags).filter((f) => !/\//.test(f) && !/^(ev|tip)-/.test(f));
  if (flags.length) out.push("", "*Flags:* " + flags.join(", "));
  out.push("", `*Future:* ${choice.future.title}`);
  if (choice.lookingBack.length) out.push("", `*${plain(story.ui["Looking back label"] || "How we got here")}:* ` + choice.lookingBack.map((m) => plain(m.text)).join(" "));
  if (choice.grounding.length > choice.lookingBack.length) {
    out.push("", "*Also grounded by:* " + choice.grounding.filter((m) => !choice.lookingBack.includes(m)).map((m) => m.key).join(", "));
  }
  const v = Engine.scaled(state);
  out.push("", "*Final Values (scaled):* " + Engine.VALUE_IDS.map((k) => `${k} ${v[k] >= 0 ? "+" : "-"}${Math.abs(v[k]).toFixed(1)}`).join(", "));
}

if (AUDIT) {
  const out = [
    "# Path audit (v5 simulation)",
    "",
    "Sample playthroughs for each Future, showing the cards drawn, the choices made, and the \"How we got here\" sentences the reveal would show, followed by samples of the two arcs (a tipping point, and the agents era where people quietly stop mattering) and of a near miss. Use this to check that each ending feels earned. Written by `node tools/check-story.js --audit` from " + fmt(GAMES) + " random games.",
    "",
    `## Weakly connected endings`,
    "",
    `Share of games where no grounding decision came from round ${LATE} or later (the ending is still explained, but not by the last, highest-stakes choices):`,
    ""
  ];
  story.futures.forEach((f) => {
    if (!f.targets || !reached[f.id]) return;
    out.push(`- ${f.title}: ${Math.round((100 * (reached[f.id] - lateGrounded[f.id])) / reached[f.id])}%`);
  });
  story.futures.forEach((f) => {
    out.push("", "", `## ${f.title}`);
    if (!samples[f.id].length) { out.push("", "No game reached this Future."); return; }
    samples[f.id].forEach((smp, i) => { out.push("", `**Sample ${i + 1}**`, ""); describe(out, smp); });
  });
  out.push("", "", "## Story timelines", "", "The first 30 random games as a player would see them on the timeline strip, to read as stories. ★ marks a card that continues the player's storylines.", "");
  storySamples.forEach(({ state, shown }, i) => {
    const on = {};
    shown.forEach((x) => (on[x.id] = x.round === 1 || x.spine >= 0.75));
    const lines = state.log.map((l) => {
      if (l.kind === "choice") return `${l.scenario.date} · ${plain(l.scenario.label)}${on[l.scenario.id] ? " ★" : ""}`;
      if (l.kind === "event") return `${l.event.date} · *${plain(l.event.label)}*`;
      if (l.kind === "tipping") return `${l.scenario.date} · **${plain(l.beat.label)}**`;
      return `${l.item.date} · [${plain(l.item.label)}]`;
    });
    out.push(`${i + 1}. ` + lines.join(" → ") + ` ⇒ **${Engine.chooseFuture(state).future.title}**`);
  });
  [["tipping", "A tipping point"], ["agents_era", "The agents era"], ["near_miss", "A near miss"]].forEach(([k, title]) => {
    out.push("", "", `## Arc: ${title}`);
    if (!arcSamples[k].length) { out.push("", "No game reached it."); return; }
    arcSamples[k].forEach((smp, i) => { out.push("", `**Sample ${i + 1}**`, ""); describe(out, smp); });
  });
  out.push("", "", "## Worlds each card appears in", "", "For developers only, never shown to players. For each card, Event, milestone and Future: how many random games it appeared in, and the share of those in which, by its date, AI had steadied, leveled off for money (plateau), been held by a pause (held), begun improving itself, reached superintelligence, or the world was under a pause, past a tipping point or in the agents era. Read it for any item whose text a world contradicts.", "");
  out.push("| Item | Games | " + WORLD_KEYS.map(([k]) => k).join(" | ") + " |", "|---|---|" + WORLD_KEYS.map(() => "---").join("|") + "|");
  Object.keys(worlds).sort().forEach((id) => {
    const w = worlds[id];
    out.push(`| ${id} | ${w.n} | ` + WORLD_KEYS.map(([k]) => (w[k] ? Math.round((100 * w[k]) / w.n) + "%" : "·")).join(" | ") + " |");
  });
  fs.writeFileSync(AUDIT_FILE, out.join("\n") + "\n");
  console.log(`\nAudit written to docs/path-audit.md.`);
}

console.log();
const failed = problems.length || chronology.length || style.length || brokenImages.length || groundGaps.length || neverTotal;
process.exitCode = failed ? 1 : 0;
