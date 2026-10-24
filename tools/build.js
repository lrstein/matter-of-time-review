// The site check: site/ is what the live site serves, exactly as it is (Cloudflare Pages runs
// this as its build command and publishes site/). Nothing is copied. It fails if site/ holds
// anything that shouldn't be public (image-studio/, tools/, docs, reviews, archives, tests,
// node_modules/, any .env or other hidden file, Markdown other than content/story.md, scripts,
// documents, logs), a card image no **Image:** field uses (so archived art can't slip back in
// by accident), or a file the game needs that is missing. It uploads nothing.
// Run: node tools/build.js

const fs = require("fs");
const path = require("path");

const SITE = path.join(__dirname, "..", "site");

// What the game loads: the page, its styles and scripts, the content, the card back, the card
// art its Image fields name and any sound files listed in SETTINGS → Audio files.
const NEED = [
  "index.html",
  "404.html",
  "styles.css",
  "js/story-parser.js",
  "js/engine.js",
  "js/audio.js",
  "js/particles.js",
  "js/game.js",
  "content/story.md",
  "images/cards/card-back.webp"
];

const story = fs.readFileSync(path.join(SITE, "content", "story.md"), "utf8");
const audio = (/^\*\*Audio files:\*\*\s*(.*)$/m.exec(story) || [])[1] || "none";
audio.split(",").map((s) => s.trim().toLowerCase()).filter((s) => s && s !== "none").forEach((name) => NEED.push(`assets/audio/${name}.mp3`));
const usedImages = new Set(["images/cards/card-back.webp"]);
story.replace(/^\*\*Image:\*\*[ \t]*(\S+)[ \t]*$/gm, (m, p) => { usedImages.add(p); NEED.push(p); });

const FORBIDDEN = [
  [/(^|\/)\./, "a hidden file (like .env or .DS_Store)"],
  [/(^|\/)image-studio(\/|$)/, "image-studio/ (it holds the API keys)"],
  [/(^|\/)tools(\/|$)/, "tools/"],
  [/(^|\/)(docs|review|archive)(\/|$)/, "docs, reviews or archives"],
  [/(^|\/)node_modules(\/|$)/, "node_modules/"],
  [/(^|\/)(tests?|play-test-failures)(\/|$)|\.test\.js$/, "a test"],
  [/\.env$|env\./i, "an env file"],
  [/\.md$/, "a Markdown file other than content/story.md"],
  [/\.(py|docx|log|jsonl|command|sh)$/, "a script, document or log"]
];
const files = [];
(function walk(dir) {
  fs.readdirSync(path.join(SITE, dir), { withFileTypes: true }).forEach((e) => {
    const rel = path.join(dir, e.name);
    if (e.name === ".DS_Store") return;  // Finder's, git-ignored, so it never reaches the live site
    if (e.isDirectory()) walk(rel); else files.push(rel.split(path.sep).join("/"));
  });
})("");
const bad = [];
files.forEach((f) => FORBIDDEN.forEach(([re, what]) => { if (re.test(f) && f !== "content/story.md") bad.push(`${f}: ${what}`); }));
files.filter((f) => f.startsWith("images/") && !usedImages.has(f)).forEach((f) => bad.push(`${f}: an image no **Image:** field uses (archived art lives in image-studio/published/)`));
NEED.filter((f) => !files.includes(f)).forEach((f) => bad.push(`${f}: missing`));
if (bad.length) {
  console.error("site/ isn't ready to publish:\n  " + bad.join("\n  "));
  process.exit(1);
}
const bytes = files.reduce((n, f) => n + fs.statSync(path.join(SITE, f)).size, 0);
console.log(`site/ checked: ${files.length} files, ${(bytes / 1e6).toFixed(1)} MB. Nothing from image-studio/, tools/, docs, reviews, archives, tests, node_modules/ or hidden files, and every file the game needs is there. Nothing was uploaded.`);
