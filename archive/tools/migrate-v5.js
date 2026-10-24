// One-time migration of content/story.md from v4.1 (hand-wired Next lists) to the v5
// storylets format. No new writing: every link becomes a condition and an opener on the
// card it led to.
//
//   Each Next entry "- r2-clinics | sentence" on Choice r1-lab/A becomes, on r2-clinics,
//   part of   **Appears when:** any flag r1-lab/A, ...   (every Choice or Event that linked to it)
//   and an    **Openers:**  line   - last flag r1-lab/A | sentence
//   Event Next lists do the same with the Event's own flag (its id), and their openers come
//   first, since the Event is the most recent thing the player saw.
//   Every Scenario gets **Round:** from its section; Events' **After round:** becomes **Round:**.
//   Next lists are removed.
//
// Run: node tools/migrate-v5.js [in] [out]   (default: site/content/story.md in place)

const fs = require("fs");
const path = require("path");

const IN = process.argv[2] || path.join(__dirname, "..", "..", "site", "content", "story.md");
const OUT = process.argv[3] || IN;
const lines = fs.readFileSync(IN, "utf8").replace(/\r\n?/g, "\n").split("\n");

// --- 1. Read every Next list, and where each item and Choice starts ---------------
let section = "", item = null, choice = null;
const incoming = {};          // target id -> [{ key, lead, event }]
const nextLines = new Set();  // line numbers to drop
const placeLine = {};         // scenario id -> line number of its **Place:** field
const roundOf = {};           // scenario id -> round number
let migrated = 0;

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  let m;
  if ((m = /^#\s+(.+?)\s*$/.exec(l)) && !/^##/.test(l)) { section = m[1].toUpperCase(); item = choice = null; continue; }
  if ((m = /^##\s+(.+?)\s*$/.exec(l)) && !/^###/.test(l)) { item = m[1]; choice = null; continue; }
  if ((m = /^###\s+Choice\s+(\S+)/i.exec(l))) { choice = m[1].toUpperCase(); continue; }
  const round = /^ROUND\s+(\d+)$/.exec(section);
  if (round && item && /^\*\*Place:\*\*/.test(l)) { placeLine[item] = i; roundOf[item] = +round[1]; }
  if (/^\*\*Next:\*\*/.test(l) && (round || section === "EVENTS")) {
    const isEvent = section === "EVENTS";
    const key = isEvent ? item : item + "/" + choice;
    nextLines.add(i);
    for (let j = i + 1; j < lines.length && (m = /^\s*[-*]\s+([^|]+?)\s*\|\s*(.*?)\s*$/.exec(lines[j])); j++) {
      nextLines.add(j);
      (incoming[m[1]] = incoming[m[1]] || []).push({ key, lead: m[2], event: isEvent });
      migrated++;
      i = j;
    }
  }
}
if (!migrated) { console.error("No Next lists found: is this file already migrated?"); process.exit(1); }

// --- 2. Write the new file -----------------------------------------------------
section = ""; item = null;
const out = [];
for (let i = 0; i < lines.length; i++) {
  if (nextLines.has(i)) continue;
  const l = lines[i];
  let m;
  if ((m = /^#\s+(.+?)\s*$/.exec(l)) && !/^##/.test(l)) section = m[1].toUpperCase();
  if ((m = /^##\s+(.+?)\s*$/.exec(l)) && !/^###/.test(l)) item = m[1];
  if (section === "EVENTS" && (m = /^\*\*After round:\*\*\s*(\d+)/.exec(l))) { out.push(`**Round:** ${m[1]}`); continue; }
  out.push(l);
  if (placeLine[item] === i) {
    out.push(`**Round:** ${roundOf[item]}`);
    const links = (incoming[item] || []).slice().sort((a, b) => (b.event ? 1 : 0) - (a.event ? 1 : 0)); // Events' first (stable)
    if (links.length) {
      const keys = [];
      links.forEach((n) => { if (!keys.includes(n.key)) keys.push(n.key); });
      out.push(`**Appears when:** any flag ${keys.join(", ")}`);
      out.push("**Openers:**");
      links.forEach((n) => out.push(`- last flag ${n.key} | ${n.lead}`));
    }
  }
}
// A Choice block used to end with its Next list; drop the blank lines that leaves doubled.
const text = out.join("\n").replace(/\n{3,}/g, "\n\n");
fs.writeFileSync(OUT, text);
console.log(`Migrated ${migrated} Next entries onto ${Object.keys(incoming).length} cards. Wrote ${path.relative(process.cwd(), OUT)}.`);
