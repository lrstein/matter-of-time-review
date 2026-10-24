// The v5 compatibility test (v5-update.md, Phase 2): plays the same number of random games
// on v4.1 (its engine, parser and content, read from the git tag) and on the current engine
// with a migrated story file, and compares them: Future shares, how often each card and
// Event appears, and which "How we got here" sentences can appear.
//
// Run: node tools/compat-test.js [games] [story file]   (default 100000, site/content/story.md)
// The story file must be the v4.1 content migrated to v5 (tools/migrate-v5.js), with 4 rounds.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "..");
const args = process.argv.slice(2);
const GAMES = parseInt(args.find((a) => /^\d+$/.test(a)), 10) || 100000;
const FILE = args.find((a) => !/^\d+$/.test(a)) || path.join(ROOT, "site", "content", "story.md");

// v4.1 from git, into a temporary folder.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "amot-v41-"));
for (const f of ["js/engine.js", "js/story-parser.js", "content/story.md"]) {
  fs.mkdirSync(path.join(tmp, path.dirname(f)), { recursive: true });
  fs.writeFileSync(path.join(tmp, f), execSync(`git show v4.1:${f}`, { cwd: ROOT, maxBuffer: 1 << 26 }));
}
const OldParser = require(path.join(tmp, "js/story-parser.js"));
const oldEngine = require(path.join(tmp, "js/engine.js"));
const NewParser = require(path.join(ROOT, "site/js/story-parser.js"));
const newEngine = require(path.join(ROOT, "site/js/engine.js"));

const oldStory = OldParser.parse(fs.readFileSync(path.join(tmp, "content/story.md"), "utf8"));
const newStory = NewParser.parse(fs.readFileSync(FILE, "utf8"));
const problems = NewParser.validate(newStory);
if (problems.length) { console.log("The migrated story has problems:"); problems.forEach((p) => console.log(`  - ${p.id}: ${p.message}`)); process.exit(1); }

// One game with random Choices, played as the game plays it.
function play(Engine) {
  const state = Engine.newGame();
  let next = Engine.selectScenario(state).scenario;
  while (true) {
    Engine.choose(state, next, next.choices[Math.floor(Engine.random() * next.choices.length)]);
    const plan = Engine.planTransition(state);
    plan.steps.forEach((step) => Engine.applyStep(state, step));
    if (!plan.next) break;
    next = plan.next.scenario;
  }
  return state;
}

function run(story, createEngine, seed) {
  const Engine = createEngine(story, { seed });
  const futures = {}, cards = {}, sentences = {};
  for (let g = 0; g < GAMES; g++) {
    const state = play(Engine);
    state.seen.forEach((id) => (cards[id] = (cards[id] || 0) + 1));
    const r = Engine.chooseFuture(state);
    futures[r.future.id] = (futures[r.future.id] || 0) + 1;
    const s = (sentences[r.future.id] = sentences[r.future.id] || new Set());
    r.lookingBack.forEach((m) => s.add(m.text));
  }
  return { futures, cards, sentences };
}

const t0 = Date.now();
const a = run(oldStory, oldEngine, 1);
const b = run(newStory, newEngine, 2);
const pct = (n) => ((100 * (n || 0)) / GAMES).toFixed(1).padStart(5) + "%";
const diff = (x, y) => { const d = (100 * ((y || 0) - (x || 0))) / GAMES; return (d >= 0 ? "+" : "") + d.toFixed(1); };

console.log(`\nCompatibility test: ${GAMES.toLocaleString("en-US")} random games each, v4.1 (git tag) against ${path.relative(ROOT, FILE)} on the current engine\n`);
console.log("  " + "Future".padEnd(16) + "  v4.1     now    diff");
let worst = 0;
oldStory.futures.forEach((f) => {
  const d = Math.abs((100 * ((b.futures[f.id] || 0) - (a.futures[f.id] || 0))) / GAMES);
  worst = Math.max(worst, d);
  console.log("  " + f.id.padEnd(16) + pct(a.futures[f.id]) + "  " + pct(b.futures[f.id]) + "  " + diff(a.futures[f.id], b.futures[f.id]).padStart(5) + (d > 1 ? "  <-- more than 1 point" : ""));
});

console.log("\n  Cards and Events (share of games)");
let cardWorst = 0;
const ids = [...new Set([...Object.keys(a.cards), ...Object.keys(b.cards)])];
const onlyOld = ids.filter((id) => a.cards[id] && !b.cards[id]), onlyNew = ids.filter((id) => !a.cards[id] && b.cards[id]);
ids.forEach((id) => {
  const d = Math.abs((100 * ((b.cards[id] || 0) - (a.cards[id] || 0))) / GAMES);
  cardWorst = Math.max(cardWorst, d);
  if (d > 1) console.log("  " + id.padEnd(16) + pct(a.cards[id]) + "  " + pct(b.cards[id]) + "  " + diff(a.cards[id], b.cards[id]).padStart(5));
});
console.log(`  ${ids.length} cards and Events appeared; largest difference ${cardWorst.toFixed(2)} points` + (cardWorst > 1 ? " (listed above)" : ""));
if (onlyOld.length) console.log("  Only in v4.1: " + onlyOld.join(", "));
if (onlyNew.length) console.log("  Only now: " + onlyNew.join(", "));

console.log('\n  "How we got here" sentences seen (per Future)');
let sentenceGaps = 0;
oldStory.futures.forEach((f) => {
  const x = a.sentences[f.id] || new Set(), y = b.sentences[f.id] || new Set();
  const lost = [...x].filter((s) => !y.has(s)), gained = [...y].filter((s) => !x.has(s));
  sentenceGaps += lost.length + gained.length;
  console.log("  " + f.id.padEnd(16) + `${x.size} in v4.1, ${y.size} now` + (lost.length ? `, ${lost.length} missing` : "") + (gained.length ? `, ${gained.length} new` : ""));
});

const ok = worst <= 1 && !onlyOld.length && !onlyNew.length && !sentenceGaps;
console.log(`\n  Largest Future share difference: ${worst.toFixed(2)} points. ${ok ? "PASS" : "CHECK"} (${((Date.now() - t0) / 1000).toFixed(0)} s)\n`);
fs.rmSync(tmp, { recursive: true, force: true });
process.exitCode = ok ? 0 : 1;
