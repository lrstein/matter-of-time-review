// Automated play-testing: plays complete games of A Matter of Time in a real browser
// (Playwright + Chromium) and checks the timeline strip, the gauge, the reveal, the
// results screen, replays and the console after every transition.
//
// Setup (once):   npm i -D playwright && npx playwright install chromium
// Run:            node tools/play-test.js --games 300
// Options:
//   --games N        play at least N games (default 300). Sessions are split evenly between
//                    desktop (1440 × 900) and phone (390 × 844); every third session plays
//                    three Play again replays in a row (4 games without reloading)
//   --workers N      browser pages in parallel (default 6)
//   --seed N         first seed (default 1); seeds count up from here
//   --only N         replay just seed N (with --viewport desktop|phone and --replays 0|3)
//   --viewport V     desktop or phone only (a whole run; default: they alternate)
//   --headed         show the browser
//   --speed N        animation speed in test mode (default 10; 1 is real time)
//   --ignore REGEX   don't count problems matching REGEX (to look past a known bug)
//   --root DIR       serve and play the game from DIR instead of site/
//   --base URL       play against a server that is already running (e.g. a plain static
//                    server of site/) instead of starting one
//   --placeholders   fail if any card front shows an image instead of the placeholder face
//   --shots DIR      save screenshots of each session's key moments (every card, Event, tipping
//                    beat, the reveal and the results) into DIR, for a person to look through
// Every session uses ?seed=N&test=1, so a failure can be replayed exactly. Failures are
// saved to tools/play-test-failures/ (a screenshot and a JSON note with the seed,
// viewport, step and problems).

const http = require("http");
const fs = require("fs");
const path = require("path");
let chromium;
try { ({ chromium } = require("playwright")); } catch (e) {
  console.error("Playwright isn't installed. Run: npm i -D playwright && npx playwright install chromium");
  process.exit(2);
}

// --root DIR serves another folder instead of site/, the folder the live site is deployed from.
const ROOT_ARG = (() => { const i = process.argv.indexOf("--root"); return i === -1 ? null : process.argv[i + 1]; })();
const ROOT = ROOT_ARG ? path.resolve(ROOT_ARG) : path.join(__dirname, "..", "site");
const FAIL_DIR = path.join(__dirname, "play-test-failures");
const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf("--" + name); return i === -1 ? dflt : args[i + 1]; };
const GAMES = parseInt(opt("games", "300"), 10);
const WORKERS = parseInt(opt("workers", "6"), 10);
const SEED0 = parseInt(opt("seed", "1"), 10);
const ONLY = opt("only", null);
const HEADED = args.includes("--headed");
const IGNORE = opt("ignore", null) ? new RegExp(opt("ignore", null)) : null;
const SPEED = parseFloat(opt("speed", "10"));
const SHOTS = opt("shots", null);
const BASE = opt("base", null);
const PLACEHOLDERS = args.includes("--placeholders");
const GAME_TIMEOUT = 180000 * Math.max(1, 10 / SPEED); // ms of wall time for one game before it counts as stuck

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  phone: { width: 390, height: 844, isMobile: true, hasTouch: true }
};
const TINT = { scenario: "#eacc9d", event: "#85837f", milestone: "#9fb4c7", tipping: "#5e5a55" };
// Seeds known to reach the two v5 arcs on desktop (a tipping point, the agents era), so every
// full run plays them. Found with a full run's "Seeds that reached" summary.
const ARC_SEEDS = [5027, 5043, 5057, 5013, 5014, 5007];

// --- A tiny static server for the game folder --------------------------------------

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".md": "text/markdown; charset=utf-8", ".png": "image/png", ".mp3": "audio/mpeg", ".json": "application/json", ".webp": "image/webp" };
function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url.split("?")[0]);
      const file = path.join(ROOT, url === "/" ? "index.html" : url);
      if (!file.startsWith(ROOT) || /(^|\/)(\.|image-studio(\/|$))/.test(url)) { res.writeHead(403); return res.end(); }
      fs.readFile(file, (err, data) => {
        if (err) { res.writeHead(404); return res.end("not found"); }
        res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
        res.end(data);
      });
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

// --- Fonts: the game loads Google Fonts. To keep runs independent of the network, the
// harness fetches each font file once and serves it from memory after that; if the
// network is down, it serves an empty response (the game falls back to system fonts).

const fontCache = new Map();
async function routeFonts(ctx) {
  await ctx.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, async (route) => {
    const url = route.request().url();
    let hit = fontCache.get(url);
    if (!hit) {
      try {
        const res = await route.fetch({ timeout: 8000 });
        if (res.ok()) {
          // Drop transport headers: the body is served whole, so a copied "transfer-encoding:
          // chunked" (or a stale length or encoding) makes Chromium fail the load.
          const headers = {};
          for (const [k, v] of Object.entries(res.headers()))
            if (!/^(transfer-encoding|content-encoding|content-length|connection|keep-alive)$/i.test(k)) headers[k] = v;
          hit = { status: 200, headers, body: await res.body() };
          fontCache.set(url, hit);
        }
      } catch (e) { /* offline */ }
    }
    if (hit) return route.fulfill(hit);
    return route.fulfill({ status: 200, contentType: url.includes("googleapis") ? "text/css" : "font/woff2", body: "" });
  });
}

// --- The harness's own seeded choices (so a session is fully reproducible) ---------

function rng(seed) {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function plan(seed, index) {
  const r = rng(seed);
  return {
    seed,
    viewport: opt("viewport", null) || (ONLY ? "desktop" : index % 2 === 0 ? "desktop" : "phone"),
    replays: ONLY ? parseInt(opt("replays", "0"), 10) : index % 3 === 2 ? 3 : 0,
    readStory: r() < 0.4,      // chance per Scenario of opening "Read the full story"
    readMore: r() < 0.5,       // chance per Event of opening "Read more"
    scrollMid: r() < 0.35,     // scroll the page back and forth mid-game
    doubleClick: r() < 0.35,   // double-click Choices and Continue buttons
    hover: r() < 0.3,          // hover the gauge and a milestone
    pick: r                    // the harness's own random choices
  };
}

// --- In-page monitoring (added before the game loads) ------------------------------
// Watches every strip marker on every frame: a marker that moves after it has landed,
// or that disappears mid-game, is a failure.

function monitor() {
  const issues = [];
  const seen = new Map();
  const FLASH_IDS = ["ep-headline", "ep-summary", "headline", "summary", "question", "future-title"];
  const flash = {};
  window.__monitor = { issues, reset() { seen.clear(); } };
  window.addEventListener("unhandledrejection", (e) => issues.push("unhandled promise rejection: " + (e.reason && e.reason.message || e.reason)));
  function frame() {
    const strip = document.getElementById("strip");
    if (strip) {
      const marks = strip.querySelectorAll(".s-mark");
      if (!marks.length) seen.clear();
      const now = new Set();
      marks.forEach((m) => {
        const id = m.dataset.id;
        if (!id) return;
        now.add(id);
        if (!m.classList.contains("landed")) return;
        const card = m.querySelector(".s-card").getBoundingClientRect();
        const x = card.left + card.width / 2;
        const prev = seen.get(id);
        if (prev == null) seen.set(id, x);
        else if (Math.abs(x - prev) > 1 && !window.__monitor.resizing) {
          issues.push(`strip marker ${id} moved after landing (${prev.toFixed(1)} → ${x.toFixed(1)})`);
          seen.set(id, x);
        }
      });
      seen.forEach((x, id) => { if (!now.has(id) && marks.length) { issues.push(`strip marker ${id} disappeared mid-game`); seen.delete(id); } });
    }
    // Flashes: text that becomes visible, disappears and comes back within 3 s with the
    // same words (for example, revealed early and then reset before its real reveal).
    FLASH_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      let op = 1;
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (n.hidden || cs.display === "none" || cs.visibility === "hidden") { op = 0; break; }
        op *= parseFloat(cs.opacity);
      }
      const t = performance.now();
      const st = flash[id] || (flash[id] = { text: "", shown: 0, gone: 0 });
      if (el.textContent !== st.text) { st.text = el.textContent; st.shown = 0; st.gone = 0; }
      if (op > 0.15 && !st.shown) st.shown = t;
      else if (op < 0.03 && st.shown && !st.gone) st.gone = t;
      else if (op > 0.15 && st.gone) {
        if (t - st.shown < 3000) issues.push(`#${id} flashed: visible, gone and back within ${Math.round(t - st.shown)} ms ("${st.text.slice(0, 40)}")`);
        st.shown = t; st.gone = 0;
      }
    });
    // Card faces, a few times a second: every back is the real card back and has loaded,
    // every front image has loaded, and with --placeholders every front is the placeholder.
    if ((faceTick = (faceTick + 1) % 20) === 0) {
      document.querySelectorAll(".tback img, .deck-card img").forEach((img) => {
        if (!/\/images\/cards\/card-back\.webp$/.test(img.src)) issues.push(`a card back shows ${img.src || "nothing"} instead of the card back`);
        else if (img.complete && !img.naturalWidth) issues.push("the card back image didn't load");
      });
      document.querySelectorAll(".tfront, .cface").forEach((face) => {
        // Skip backs, milestone and tipping marks, and faces not drawn yet (like #fs-card's).
        if (face.closest(".deck-card, .s-mark.point") || !face.firstElementChild) return;
        const img = face.querySelector("img");
        if (img && img.complete && !img.naturalWidth) issues.push(`a card front image didn't load (${img.src})`);
        if (window.__ptPlaceholders && (img || !face.querySelector(".ph"))) issues.push(`a card front isn't the placeholder face${img ? " (" + img.src + ")" : ""}`);
      });
    }
    requestAnimationFrame(frame);
  }
  let faceTick = 0;
  requestAnimationFrame(frame);
}

// --- Checks (run in the page) -------------------------------------------------------

// The first element matching `sel`: a point inside it where it, not a neighbor, is on top
// (scanning across its box), or null if it's completely covered.
function reachablePoint(sel) {
  const el = document.querySelector(sel);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const mark = el.closest(".s-mark") || el;
  for (let fy = 0.5; fy > 0; fy -= 0.2) {
    for (const fx of [0.5, 0.65, 0.35, 0.8, 0.2, 0.92, 0.08]) {
      const x = r.left + r.width * fx, y = r.top + r.height * fy;
      const hit = document.elementFromPoint(x, y);
      if (hit && (hit.closest(".s-mark") || hit) === mark) return { x, y };
    }
  }
  return null;
}

// The strip against the engine's expected timeline: order, completeness, labels, types.
function checkStrip(TINT) {
  const out = [];
  const g = window.__game;
  const expected = g.timeline;
  const strip = document.getElementById("strip");
  const marks = [...strip.querySelectorAll(".s-mark")];
  const ids = marks.map((m) => m.dataset.id);
  const want = expected.map((e) => e.id);
  if (ids.join(",") !== want.join(",")) out.push(`strip markers [${ids.join(", ")}] don't match the expected timeline [${want.join(", ")}]`);
  const hex = (c) => {
    const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);
    return m ? "#" + [m[1], m[2], m[3]].map((v) => (+v).toString(16).padStart(2, "0")).join("") : c.trim().toLowerCase();
  };
  const recolored = strip.classList.contains("recolor");
  let lastYear = -Infinity, lastX = -Infinity;
  const boxes = [];
  const nowLabel = strip.querySelector(".s-now-label");
  if (nowLabel) boxes.push({ id: "Now", r: nowLabel.getBoundingClientRect() });
  // The labeled history events: on screen and never overlapping any other label.
  strip.querySelectorAll(".s-hmark.on .s-hlabel").forEach((l) => {
    const r = l.getBoundingClientRect();
    const name = "history label \"" + l.textContent.trim() + "\"";
    if (r.left < -1 || r.right > innerWidth + 1 || r.top < -1) out.push(`${name} is cut off at the screen edge`);
    boxes.push({ id: name, r });
  });
  marks.forEach((m, i) => {
    const e = expected[i];
    const id = m.dataset.id;
    const year = parseFloat(m.dataset.year);
    const card = m.querySelector(".s-card");
    const cr = card.getBoundingClientRect();
    const x = cr.left + cr.width / 2;
    if (year < lastYear) out.push(`strip marker ${id} (${year}) comes after a later one (${lastYear})`);
    if (x < lastX - 0.5) out.push(`strip marker ${id} sits left of an earlier marker (${x.toFixed(1)} < ${lastX.toFixed(1)})`);
    lastYear = year; lastX = Math.max(lastX, x);
    if (!m.classList.contains("landed")) out.push(`strip marker ${id} never landed`);
    // Type and tint
    const type = m.dataset.type;
    if (e && type !== e.type) out.push(`strip marker ${id} is a ${type}, expected ${e.type}`);
    if (!recolored) {
      const tc = hex(getComputedStyle(m).getPropertyValue("--tc"));
      if (TINT[type] && tc !== TINT[type]) out.push(`strip marker ${id} (${type}) has tint ${tc}, expected ${TINT[type]}`);
    }
    if (type === "milestone") {
      const img = card.querySelector("img");
      if (!m.classList.contains("point") || (img && getComputedStyle(img).display !== "none") || card.offsetWidth > 9) out.push(`milestone ${id} is drawn as a card, not a diamond`);
    } else if (type === "tipping") {
      const img = card.querySelector("img");
      if (!m.classList.contains("point") || (img && getComputedStyle(img).display !== "none") || card.offsetWidth > 13 || !card.querySelector("svg.shatter")) out.push(`tipping point ${id} is drawn as a card, not a shatter`);
    } else if (m.classList.contains("point")) out.push(`${type} ${id} is drawn as a diamond`);
    // Label: present, visible, not clipped
    const label = m.querySelector(".s-label");
    const short = m.querySelector(".s-short");
    const text = short ? short.textContent.trim() : "";
    if (!text) out.push(`strip marker ${id} has no label`);
    if (!short || getComputedStyle(short).display === "none") out.push(`strip marker ${id}'s label "${text}" is hidden`);
    let op = 1;
    for (let n = label; n && n !== strip; n = n.parentElement) op *= parseFloat(getComputedStyle(n).opacity);
    if (op < 0.95) out.push(`strip marker ${id}'s label is at opacity ${op.toFixed(2)}`);
    const lr = label.getBoundingClientRect();
    if (lr.width < 2 || lr.height < 2) out.push(`strip marker ${id}'s label has no size`);
    // At the reveal the strip rises away with the scroll (--away): a label above the screen
    // then is leaving with the strip, not cut off.
    const lift = Math.min(0, strip.getBoundingClientRect().top);
    if (lr.left < -1 || lr.right > innerWidth + 1 || lr.top < lift - 1) out.push(`strip marker ${id}'s label is cut off at the screen edge`);
    if (lr.bottom > strip.getBoundingClientRect().bottom - 20) out.push(`strip marker ${id}'s label sits in the strip's bottom fade, over the page`);
    if (short && short.scrollWidth > short.clientWidth + 1) out.push(`strip marker ${id}'s label "${text}" is clipped`);
    boxes.push({ id, r: lr });
  });
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i].r, b = boxes[j].r;
    const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    if (w > 2 && h > 2) out.push(`strip labels ${boxes[i].id} and ${boxes[j].id} overlap (${w.toFixed(0)} × ${h.toFixed(0)}px)`);
  }
  // Gauge
  const gauge = document.getElementById("gauge");
  if (gauge && g.gauge != null && gauge.dataset.level !== String(g.gauge)) out.push(`gauge shows level ${gauge.dataset.level}, engine has ${g.gauge}`);
  return out;
}

// Everything a player needs on a Scenario is visible.
function checkScenario() {
  const out = [];
  const vis = (el) => {
    if (!el || el.hidden) return false;
    let op = 1;
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === "none" || cs.visibility === "hidden") return false;
      op *= parseFloat(cs.opacity);
    }
    return op > 0.98;
  };
  ["dateline", "headline", "summary", "question"].forEach((id) => {
    const el = document.getElementById(id);
    if (el && !vis(el)) out.push(`#${id} is stuck invisible`);
    if (el && !el.textContent.trim()) out.push(`#${id} is empty`);
  });
  const choices = [...document.querySelectorAll("#choices .choice")];
  if (choices.length !== 3) out.push(`${choices.length} Choices shown`);
  choices.forEach((c, i) => { if (!vis(c)) out.push(`Choice ${i + 1} is stuck invisible`); });
  const card = document.querySelector("#card-slot .tcard.face-up");
  if (!card) out.push("the drawn card isn't face up");
  const overlay = ["interlude", "event-panel"].filter((id) => { const e = document.getElementById(id); return e && e.classList.contains("on"); });
  if (overlay.length) out.push(`${overlay.join(", ")} still showing over a Scenario`);
  return out;
}

function checkReveal() {
  const out = [];
  const f = window.__game.future;
  if (!f) return ["no Future chosen"];
  const t = document.getElementById("future-title").textContent;
  if (t !== f.title) out.push(`reveal title "${t}" isn't "${f.title}"`);
  if (!document.getElementById("future-tagline").textContent.trim()) out.push("reveal has no tagline");
  const past = [...document.querySelectorAll("#future-past-text p")].map((p) => p.textContent);
  // Invented names are written *in italics* in the text; the screen shows them without the asterisks.
  const expected = f.lookingBack.map((t) => t.replace(/\*/g, ""));
  if (past.join("|") !== expected.join("|")) out.push(`"How we got here" shows [${past.join(" / ")}], expected [${expected.join(" / ")}]`);
  if (f.lookingBack.length && document.getElementById("future-past").hidden) out.push(`"How we got here" is hidden`);
  const paras = [...document.querySelectorAll("#future-text p")];
  if (paras.length !== f.paragraphs) out.push(`reveal shows ${paras.length} story paragraphs, expected ${f.paragraphs}`);
  paras.forEach((p, i) => { if (parseFloat(getComputedStyle(p).opacity) < 0.98) out.push(`story paragraph ${i + 1} is stuck invisible`); });
  return out;
}

function checkResults() {
  const out = [];
  const g = window.__game;
  const items = [...document.querySelectorAll("#ptl .atl-item[data-balance]")];
  const ids = items.map((i) => i.dataset.id).sort().join(",");
  const want = g.timeline.map((e) => e.id).sort().join(",");
  if (ids !== want) out.push(`results timeline has [${ids}], expected [${want}]`);
  let last = -Infinity, lastTop = -Infinity;
  items.forEach((it) => {
    const y = parseFloat(it.dataset.year);
    const top = it.getBoundingClientRect().top;
    if (y < last) out.push(`results timeline: ${it.dataset.id} (${y}) is listed after a later entry`);
    if (top < lastTop - 0.5) out.push(`results timeline: ${it.dataset.id} sits above the entry before it`);
    last = y; lastTop = top;
  });
  const spine = document.querySelector("#ptl .atl-spine");
  const card = document.querySelector("#ptl .future-thumb");
  if (spine && card) {
    const s = spine.getBoundingClientRect(), c = card.getBoundingClientRect();
    if (Math.abs(s.bottom - (c.top + c.height / 2)) > 2) out.push(`results spine ends at ${s.bottom.toFixed(0)}, not behind the Future card's center (${(c.top + c.height / 2).toFixed(0)})`);
  }
  // v5.6: after a tipping point, the lost Values show their snapshot from the moment before, grayed out.
  document.querySelectorAll("#bars .vrow").forEach((row) => {
    const lost = !!g.snapshot && g.valuesLost.includes(row.dataset.id);
    if (lost !== row.classList.contains("lost")) out.push(`Value bar ${row.dataset.id} is ${lost ? "not " : ""}grayed out, but the world ${lost ? "tipped over" : "never tipped over"}`);
    const v = lost ? g.snapshot[row.dataset.id] : g.values[row.dataset.id];
    const fill = row.querySelector(".vfill");
    const want = Math.min(1, Math.abs(v) / 6) * 50;
    if (Math.abs(parseFloat(fill.dataset.width) - want) > 0.01) out.push(`Value bar ${row.dataset.id} shows ${fill.dataset.width}, engine has ${v}`);
    if (v !== 0 && !fill.classList.contains(v < 0 ? "neg" : "pos")) out.push(`Value bar ${row.dataset.id} points the wrong way`);
  });
  return out;
}

// --- Playing one session ---------------------------------------------------------

async function playSession(browser, base, p) {
  const ctx = await browser.newContext({ viewport: { width: VIEWPORTS[p.viewport].width, height: VIEWPORTS[p.viewport].height }, isMobile: !!VIEWPORTS[p.viewport].isMobile, hasTouch: !!VIEWPORTS[p.viewport].hasTouch });
  await routeFonts(ctx);
  const page = await ctx.newPage();
  if (process.env.PT_TRACE) {
    // Debug aid: if the page's main thread freezes, pause it in the debugger and print where it is.
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Debugger.enable");
    cdp.on("Debugger.paused", async (e) => {
      console.log("  [trace] PAUSED IN:\n" + e.callFrames.slice(0, 12).map(f =>
        `    ${f.functionName || "(anon)"}  ${(f.url || "").split("/").pop()}:${f.location.lineNumber + 1}`).join("\n"));
      await cdp.send("Debugger.resume").catch(() => {});
    });
    globalThis.__pauseProbe = async () => { await cdp.send("Debugger.pause").catch(() => {}); };
    let probes = 0;
    const timer = setInterval(() => {
      if (globalThis.__busySince && Date.now() - globalThis.__busySince > 6000 && probes < 4) { probes++; globalThis.__pauseProbe(); }
    }, 3000);
    page.on("close", () => clearInterval(timer));
  }
  const consoleIssues = [];
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleIssues.push(`console ${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => consoleIssues.push("page error: " + e.message));
  if (PLACEHOLDERS) await page.addInitScript(() => { window.__ptPlaceholders = true; });
  await page.addInitScript(monitor);
  let step = "loading";
  const games = [];
  const fail = async (problems) => {
    fs.mkdirSync(FAIL_DIR, { recursive: true });
    const name = `seed-${p.seed}-${p.viewport}-${step.replace(/[^\w-]+/g, "_")}`;
    await page.screenshot({ path: path.join(FAIL_DIR, name + ".png") }).catch(() => {});
    const note = { seed: p.seed, viewport: p.viewport, replays: p.replays, step, problems, repro: `node tools/play-test.js --only ${p.seed} --viewport ${p.viewport} --replays ${p.replays}`, url: `/?seed=${p.seed}&test=1` };
    fs.writeFileSync(path.join(FAIL_DIR, name + ".json"), JSON.stringify(note, null, 2));
    return note;
  };
  const ev = (fn, arg) => page.evaluate(fn, arg);
  const shot = async (name) => {
    if (!SHOTS) return;
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({ path: path.join(SHOTS, `seed-${p.seed}-${p.viewport}-${name}.png`) }).catch(() => {});
  };
  // Waits for the game's animations, scaled to the speed it runs at.
  const settle = (ms) => page.waitForTimeout(ms * Math.max(1, 10 / SPEED));
  const phase = () => ev(() => window.__game ? window.__game.phase : "loading").catch(() => "loading");
  const collect = async (extra) => {
    const mon = await ev(() => window.__monitor.issues.splice(0)).catch(() => []);
    return consoleIssues.splice(0).concat(mon, extra || []).filter((x) => !IGNORE || !IGNORE.test(x));
  };

  try {
    await page.goto(`${base}/?seed=${p.seed}&test=1${SPEED !== 10 ? "&speed=" + SPEED : ""}`);
    await page.waitForFunction(() => window.__game, null, { timeout: 15000 });

    for (let g = 0; g <= p.replays; g++) {
      const t0 = Date.now();
      let lastId = -1, round = 0, dbl = 0;
      // v6.1: the year the Interlude counted to, which the next card, Event or Future must carry.
      let counted = null;
      const countedMatches = async (sel, what) => {
        if (counted === null) return [];
        const y = counted;
        counted = null;
        const t = await ev((s) => (document.querySelector(s) || {}).textContent || "", sel);
        return t.indexOf(String(y)) === -1 ? [`the Interlude counted to ${y}, but ${what} is dated "${t.trim()}"`] : [];
      };
      const record = { game: g + 1, cards: [] };
      const failNow = async (list) => ({ ok: false, games: games.length, note: await fail(await collect(list)) });
      // Click something the player should be able to click; a click that can't land (hidden,
      // covered by something else) is a failure. Sometimes a double-click instead.
      const press = async (sel, what) => {
        const loc = page.locator(sel);
        try {
          if (p.doubleClick && dbl++ % 2 === 0) await loc.dblclick({ timeout: 4000 });
          else await loc.click({ timeout: 4000 });
          return null;
        } catch (e) { return `couldn't click ${what} (${String(e.message).split("\n")[0]})`; }
      };
      while (true) {
        if (Date.now() - t0 > GAME_TIMEOUT) throw new Error(`stuck at phase "${await phase()}" (${step})`);
        const now = await ev(() => window.__game ? { ph: window.__game.phase, id: window.__game.phaseId } : { ph: "loading", id: -1 }).catch(() => ({ ph: "loading", id: -1 }));
        if (now.id === lastId) {
          if (process.env.PT_TRACE && now.ph === "busy" && Date.now() - (globalThis.__busySince || Date.now()) > 3000 && Date.now() - (globalThis.__lastShot || 0) > 3000) {
            globalThis.__lastShot = Date.now();
            if (globalThis.__pauseProbe) await globalThis.__pauseProbe();
            const f = `${process.env.PT_TRACE}/busy-${((Date.now() - t0) / 1000).toFixed(0)}s.png`;
            await page.screenshot({ path: f }).catch(() => {});
            const info = await ev(() => ({
              anims: document.getAnimations().filter(a => a.playState === "running").map(a => (a.effect && a.effect.target ? (a.effect.target.id || a.effect.target.className) : "?") + ":" + (a.animationName || a.transitionProperty || "wa") + "@" + Math.round((a.effect && a.effect.getComputedTiming().endTime) || 0) + "ms"),
              imgs: [...document.images].filter(i => !i.complete).map(i => i.getAttribute("src")) })).catch(e => String(e));
            console.log(`  [trace] still busy: ${JSON.stringify(info).slice(0, 600)}`);
          }
          await page.waitForTimeout(30); continue;
        }
        globalThis.__busySince = Date.now();
        lastId = now.id;
        const ph = now.ph;
        if (process.env.PT_TRACE) console.log(`  [trace] ${((Date.now() - t0) / 1000).toFixed(1)}s ${step} -> ${ph}`);

        if (ph === "choose") {
          const st = await ev(() => ({ round: window.__game.round, picks: window.__game.picks }));
          round = st.round;
          step = `game ${g + 1}, round ${round}`;
          let problems = await ev(checkStrip, TINT);
          problems = problems.concat(await ev(checkScenario));
          problems = problems.concat(await countedMatches("#dateline", "the next card"));
          // Replays favor unseen cards: if any candidate was unseen, the pick must be one.
          const pick = st.picks[st.picks.length - 1];
          if (!pick || pick.round !== round) problems.push(`no record of the card drawn for round ${round}`);
          else {
            if (pick.fresh.length && pick.fresh.indexOf(pick.id) === -1) problems.push(`round ${round} drew ${pick.id}, but unseen candidates [${pick.fresh.join(", ")}] were available`);
            if (pick.afterHumanity && !pick.tipped) problems.push(`round ${round} drew ${pick.id}, an After humanity card, before any tipping point`);
            if (!pick.afterHumanity && pick.tipped) problems.push(`round ${round} drew ${pick.id}, an ordinary card, after a tipping point`);
            if (round > 1 && !pick.lead) problems.push(`round ${round}'s card ${pick.id} had no lead-in`);
          }
          problems = await collect(problems);
          if (problems.length) return failNow(problems);
          record.cards.push(pick.id);
          await shot(`g${g + 1}-r${round}-${pick.id}`);

          // Sometimes: read the full story, hover a milestone, scroll around. Then choose.
          if (p.pick() < p.readStory) {
            const err = await press("#story-toggle", "Read the full story");
            if (err) return failNow([err]);
            // A double-click opens and closes it again, which is fine; a single click must
            // open it fully (given time for the animation, even on a busy machine).
            if (!(p.doubleClick && (dbl - 1) % 2 === 0)) {
              const opened = await page.waitForFunction(() => {
                const m = document.getElementById("story-more");
                return m.classList.contains("open") && m.querySelector(".expand-clip").getBoundingClientRect().height > 20 && parseFloat(getComputedStyle(m).opacity) > 0.99;
              }, null, { timeout: 5000 }).then(() => true, () => false);
              if (!opened) {
                const st = await ev(() => { const m = document.getElementById("story-more"); return `open ${m.classList.contains("open")}, height ${m.querySelector(".expand-clip").getBoundingClientRect().height.toFixed(0)}, opacity ${getComputedStyle(m).opacity}`; });
                return failNow([`"Read the full story" didn't open the story (${st})`]);
              }
            } else await settle(150);
          }
          // The gauge's dropdown: where AI is now (before any milestone) or the latest one.
          if (p.hover && p.pick() < 0.3) {
            const gl = page.locator("#gauge .g-chart");
            if (p.viewport === "phone") await gl.tap({ force: true }); else await gl.hover({ force: true });
            await settle(80);
            const d = await ev(() => ({ open: document.getElementById("gauge").classList.contains("open"), text: document.querySelector("#gauge .g-drop-text").textContent }));
            if (!d.open || !d.text.trim()) return failNow(["hovering the gauge didn't show a description"]);
            if (p.viewport === "phone") await page.touchscreen.tap(5, VIEWPORTS.phone.height - 5); else await page.mouse.move(5, VIEWPORTS.desktop.height - 5);
            await settle(80);
            if (await ev(() => document.getElementById("gauge").classList.contains("open"))) return failNow(["the gauge's description stayed open after moving away"]);
          }
          if (p.hover && p.pick() < 0.5) {
            const tip = await ev(() => !!document.querySelector("#strip .s-mark.point .s-card"));
            if (tip) {
              // v5.3: aim where the marker is on top (a neighbor may overlap its edge), as a person would.
              const at = await ev(reachablePoint, "#strip .s-mark.point .s-card");
              if (!at) return failNow(["a strip marker (#strip .s-mark.point .s-card) is completely covered and can't be hovered"]);
              if (p.viewport === "phone") await page.touchscreen.tap(at.x, at.y); else await page.mouse.move(at.x, at.y);
              await settle(80);
              const t = await ev(() => { const e = document.getElementById("tip"); return { on: e.classList.contains("on"), text: e.textContent }; });
              if (!t.on || !t.text.trim()) return failNow(["hovering a milestone didn't show its definition"]);
              // v5.2: a milestone also says why it happened in this game.
              const why = await ev(() => { const m = document.querySelector("#strip .s-mark.point .s-card"); const w = document.querySelector("#tip .tip-why"); return !m.closest(".sota") || !!(w && w.textContent.trim()); });
              if (!why) return failNow(["hovering a milestone didn't say why it happened"]);
              if (p.viewport === "phone") await page.touchscreen.tap(5, VIEWPORTS.phone.height - 5); else await page.mouse.move(5, VIEWPORTS.desktop.height - 5);
              await settle(80);
              if (await ev(() => document.getElementById("tip").classList.contains("on"))) return failNow(["a milestone definition stayed open after moving away"]);
            }
          }
          // v5.2: hovering a card on the strip shows the Choice made on it.
          if (p.hover && p.pick() < 0.4) {
            const has = await ev(() => !!document.querySelector("#strip .s-mark:not(.point):not(.event) .s-card"));
            if (has) {
              // v5.3: aim where the marker is on top (a neighbor may overlap its edge), as a person would.
              const at = await ev(reachablePoint, "#strip .s-mark:not(.point):not(.event) .s-card");
              if (!at) return failNow(["a strip marker (#strip .s-mark:not(.point):not(.event) .s-card) is completely covered and can't be hovered"]);
              if (p.viewport === "phone") await page.touchscreen.tap(at.x, at.y); else await page.mouse.move(at.x, at.y);
              await settle(80);
              const t = await ev(() => { const e = document.getElementById("tip"); const h = e.querySelector(".tip-head"); const x = e.querySelector(".tip-text"); return { on: e.classList.contains("on"), head: h ? h.textContent : "", text: x ? x.textContent : "" }; });
              if (!t.on || !t.head.trim() || !t.text.trim()) return failNow(["hovering a card on the strip didn't show the Choice made on it"]);
              if (p.viewport === "phone") await page.touchscreen.tap(5, VIEWPORTS.phone.height - 5); else await page.mouse.move(5, VIEWPORTS.desktop.height - 5);
              await settle(80);
              if (await ev(() => document.getElementById("tip").classList.contains("on"))) return failNow(["a card's Choice stayed open after moving away"]);
            }
          }
          // v5.3: hovering an Event on the strip shows "Out of your hands" and a brief summary.
          if (p.hover && p.pick() < 0.4) {
            const has = await ev(() => !!document.querySelector("#strip .s-mark.event .s-card"));
            if (has) {
              // v5.3: aim where the marker is on top (a neighbor may overlap its edge), as a person would.
              const at = await ev(reachablePoint, "#strip .s-mark.event .s-card");
              if (!at) return failNow(["a strip marker (#strip .s-mark.event .s-card) is completely covered and can't be hovered"]);
              if (p.viewport === "phone") await page.touchscreen.tap(at.x, at.y); else await page.mouse.move(at.x, at.y);
              await settle(80);
              const t = await ev(() => { const e = document.getElementById("tip"); const h = e.querySelector(".tip-head"); const x = e.querySelector(".tip-text"); return { on: e.classList.contains("on"), head: h ? h.textContent : "", text: x ? x.textContent : "" }; });
              if (!t.on || !t.head.trim() || !t.text.trim()) return failNow(["hovering an Event on the strip didn't show its summary"]);
              if (p.viewport === "phone") await page.touchscreen.tap(5, VIEWPORTS.phone.height - 5); else await page.mouse.move(5, VIEWPORTS.desktop.height - 5);
              await settle(80);
              if (await ev(() => document.getElementById("tip").classList.contains("on"))) return failNow(["an Event's summary stayed open after moving away"]);
            }
          }
          if (p.scrollMid && p.pick() < 0.5) {
            await ev(() => { const t = document.getElementById("table"); t.scrollTop = t.scrollHeight; });
            await settle(80);
            await ev(() => { document.getElementById("table").scrollTop = 0; });
            await settle(80);
          }
          const n = Math.floor(p.pick() * 3);
          const err = await press(`#choices .choice >> nth=${n}`, "a Choice");
          if (err) return failNow([err]);
          await settle(80);
          const after = await ev(() => ({ round: window.__game.round, picked: document.querySelectorAll("#choices .choice.picked").length }));
          if (after.round !== round + 1 || after.picked !== 1) return failNow([`a Choice click in round ${round} moved the game to round ${after.round} with ${after.picked} picked`]);
        } else if (ph === "continue") {
          step = `game ${g + 1}, round ${round} result`;
          const err = await press("#btn-continue", "Continue");
          if (err) return failNow([err]);
        } else if (ph === "tipping") {
          step = `game ${g + 1}, tipping point in round ${round}`;
          const shown = await ev(() => {
            const out = [];
            const t = window.__game.tipping;
            const box = document.getElementById("tipping");
            if (!t) out.push("a tipping beat is showing, but the engine has no tipping point");
            if (!box.classList.contains("on") || parseFloat(getComputedStyle(box).opacity) < 0.98) out.push("the tipping beat isn't fully showing");
            const words = document.getElementById("tp-text").textContent;
            // v5.6: what happened, why this decision and whether it could have been stopped.
            const flat = (x) => x.replace(/\s+/g, "");
            if (t && [t.text.join(""), t.why.join(""), t.prevented].some((part) => !flat(words).includes(flat(part)))) out.push(`the tipping beat shows "${words.slice(0, 60)}…", not the beat for ${t.id}`);
            if (t && (!t.why.length || !t.prevented)) out.push(`the tipping beat for ${t.id} has no why or no could-it-have-been-stopped`);
            document.querySelectorAll("#tp-text .fade").forEach((sp, i) => { if (parseFloat(getComputedStyle(sp).opacity) < 0.98) out.push(`tipping beat sentence ${i + 1} is stuck invisible`); });
            if (document.querySelector("#card-slot .tcard.face-up") && !document.querySelector("#tipping.on")) out.push("the tipping beat is hidden");
            return out;
          });
          if (shown.length) return failNow(shown);
          record.tipping = await ev(() => window.__game.tipping.type);
          await shot(`g${g + 1}-r${round}-tipping`);
          const err = await press("#tp-continue", "the tipping beat's Continue");
          if (err) return failNow([err]);
          // v5.8: the line shatters where the tipping point lands.
          if (SHOTS && (await page.waitForSelector(".s-shard", { state: "attached", timeout: 8000 }).catch(() => null))) await shot(`g${g + 1}-r${round}-shatter`);
        } else if (ph === "event") {
          step = `game ${g + 1}, Event after round ${round}`;
          if (await ev(() => !!window.__game.tipping)) return failNow(["an Event came after a tipping point"]);
          const shown = await ev(() => {
            const out = [];
            const panel = document.getElementById("event-panel");
            if (!panel.classList.contains("on")) out.push("the Event panel isn't showing");
            ["ep-dateline", "ep-headline", "ep-summary"].forEach((id) => {
              const e = document.getElementById(id);
              if (!e.textContent.trim()) out.push(`#${id} is empty`);
              if (parseFloat(getComputedStyle(e).opacity) < 0.98) out.push(`#${id} is stuck invisible`);
            });
            if (document.querySelector("#card-slot .tcard")) out.push("an Event was drawn as a card");
            return out;
          });
          shown.push(...(await countedMatches("#ep-dateline", "the Event")));
          if (shown.length) return failNow(shown);
          await shot(`g${g + 1}-r${round}-event`);
          if (p.pick() < p.readMore) {
            const e2 = await press("#event-toggle", "Read more");
            if (e2) return failNow([e2]);
            await settle(150);
          }
          const err = await press("#event-continue", "the Event's Continue");
          if (err) return failNow([err]);
        } else if (ph === "interlude") {
          // v6.1: the year has counted up, each milestone it passed has its box, and the
          // Interlude waits for Continue.
          step = `game ${g + 1}, Interlude after round ${round}`;
          const il = await ev(() => {
            const out = [];
            const box = document.getElementById("interlude");
            if (!box.classList.contains("on")) out.push("the Interlude isn't showing");
            const yr = document.getElementById("il-year");
            let year = null;
            if (!yr.hidden) {
              const digits = [...yr.querySelectorAll(".od-d")];
              if (digits.some((d) => d.children.length !== 1)) out.push("a digit of the year is still rolling when Continue shows");
              const t = digits.map((d) => d.textContent).join("");
              if (!/^\d{4}$/.test(t)) out.push(`the year reads "${t}"`);
              else year = +t;
              if (parseFloat(getComputedStyle(yr).opacity) < 0.98) out.push("the year is stuck invisible");
            }
            const boxes = [...document.querySelectorAll("#il-sotas .il-sota")];
            boxes.forEach((b) => {
              if (!b.classList.contains("in") || parseFloat(getComputedStyle(b).opacity) < 0.98) out.push("a milestone box is stuck invisible");
              const head = b.querySelector(".il-sota-head");
              const y = head && parseInt(head.textContent, 10);
              if (!head || !head.textContent.trim()) out.push("a milestone box has no heading");
              else if (year !== null && y > year) out.push(`a ${y} milestone shows in an Interlude that counted only to ${year}`);
            });
            const lead = document.getElementById("il-lead");
            if (!lead.hidden && parseFloat(getComputedStyle(lead).opacity) < 0.98) out.push("the lead-in is stuck invisible");
            return { out, year, boxes: boxes.length };
          });
          if (il.out.length) return failNow(il.out);
          if (il.boxes && SHOTS) await shot(`g${g + 1}-r${round}-interlude`);
          counted = il.year;
          const ec = await press("#il-continue", "the Interlude's Continue");
          if (ec) return failNow([ec]);
        } else if (ph === "reveal-done") {
          step = `game ${g + 1}, reveal`;
          await settle(80);
          let problems = await ev(checkStrip, TINT);
          problems = problems.concat(await ev(checkReveal));
          problems = problems.concat(await countedMatches("#future-date", "the Future"));
          await shot(`g${g + 1}-reveal`);
          // See what you chose: the strip leaves as the Future card rises.
          const e1 = await press("#btn-explain", "See what you chose");
          if (e1) problems.push(e1);
          await settle(350);
          await ev(() => { const t = document.getElementById("table"); t.scrollTop = document.getElementById("ptl").getBoundingClientRect().top + t.scrollTop - 40; });
          await settle(250);
          const op = await ev(() => ({ strip: parseFloat(getComputedStyle(document.getElementById("strip")).opacity), gauge: parseFloat(getComputedStyle(document.getElementById("gauge")).opacity) }));
          if (op.strip > 0.02) problems.push(`the strip is still showing (opacity ${op.strip.toFixed(2)}) over the results timeline`);
          if (op.gauge > 0.02) problems.push(`the gauge is still showing (opacity ${op.gauge.toFixed(2)}) over the results timeline`);
          step = `game ${g + 1}, results`;
          await settle(300);
          await shot(`g${g + 1}-results`);
          problems = problems.concat(await ev(checkResults));
          await ev(() => { document.getElementById("table").scrollTop = 0; });
          // The strip follows the scroll on the next frame, which can come late with six
          // pages sharing the machine, so wait for it rather than for a fixed time.
          await page.waitForFunction(() => parseFloat(getComputedStyle(document.getElementById("strip")).opacity) >= 0.98, null, { timeout: 2000 * Math.max(1, 10 / SPEED) }).catch(() => {});
          const back = await ev(() => parseFloat(getComputedStyle(document.getElementById("strip")).opacity));
          if (back < 0.98) problems.push(`the strip didn't come back (opacity ${back.toFixed(2)}) after scrolling up`);
          problems = await collect(problems);
          const fut = await ev(() => window.__game.future);
          record.future = fut && fut.id;
          record.agents = await ev(() => window.__game.flags.indexOf("agents_era") !== -1);
          record.paused = await ev(() => window.__game.flags.indexOf("ev-vienna") !== -1);
          if (record.tipping && fut && fut.id === "long_middle") problems.push("The Long Middle came after a tipping point");
          if (problems.length) return { ok: false, games: games.length, note: await fail(problems) };
          games.push(record);
          if (g < p.replays) {
            step = `game ${g + 2}, play again`;
            const again = g % 2 === 0 ? "#btn-again-2" : "#btn-again";
            await ev((sel) => document.querySelector(sel).scrollIntoView({ block: "center" }), again);
            await settle(100);
            const before = await ev(() => window.__game.game);
            const e4 = await press(again, "Play again");
            if (e4) return failNow([e4]);
            // A clean start: no leftover markers, panels, results or captions.
            await page.waitForFunction((n) => window.__game.game === n + 1, before, { timeout: 10000 });
            const left = await ev(() => {
              const out = [];
              const marks = document.querySelectorAll("#strip .s-mark").length;
              if (marks) out.push(`${marks} strip markers left over from the last game`);
              if (!document.getElementById("explain").hidden) out.push("results screen left open");
              if (!document.getElementById("future-view").hidden) out.push("Future left showing");
              ["interlude", "event-panel"].forEach((id) => { if (document.getElementById(id).classList.contains("on")) out.push(id + " left showing"); });
              if (document.querySelector("#strip.recolor")) out.push("strip still recolored");
              if (document.getElementById("gauge-caption").classList.contains("on")) out.push("a gauge caption left showing");
              if (document.getElementById("gauge").dataset.level !== String(window.__game.gauge)) out.push("the gauge didn't reset");
              if (document.getElementById("tip").classList.contains("on")) out.push("a definition left showing");
              return out;
            });
            if (left.length) return failNow(left);
          }
          break;
        }
      }
    }
    const rest = await collect();
    if (rest.length) return { ok: false, games: games.length, note: await fail(rest) };
    return { ok: true, games: games.length, records: games };
  } catch (e) {
    return { ok: false, games: games.length, note: await fail(await collect([String(e.message || e)])) };
  } finally {
    await ctx.close().catch(() => {});
  }
}

// --- Main ----------------------------------------------------------------------

(async () => {
  const server = BASE ? null : await serve();
  const base = BASE ? BASE.replace(/\/$/, "") : `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: !HEADED });
  if (fs.existsSync(FAIL_DIR)) fs.rmSync(FAIL_DIR, { recursive: true });

  const sessions = [];
  if (ONLY) sessions.push(plan(parseInt(ONLY, 10), 0));
  else {
    let games = 0, i = 0;
    // The known arc seeds first (desktop, no replays), unless a viewport other than desktop is forced.
    if ((opt("viewport", "desktop") === "desktop")) ARC_SEEDS.forEach((seed) => { const p = Object.assign(plan(seed, 0), { viewport: "desktop", replays: 0 }); sessions.push(p); games++; });
    while (games < GAMES) { const p = plan(SEED0 + i, i); sessions.push(p); games += 1 + p.replays; i++; }
  }
  const total = sessions.reduce((n, s) => n + 1 + s.replays, 0);
  console.log(`\nPlaying ${total} games in ${sessions.length} sessions (${WORKERS} at a time)\n`);

  let next = 0, played = 0, passed = 0;
  const failures = [];
  const futures = {};
  const arcSeeds = { tipping: [], agents: [], paused: [] };
  const t0 = Date.now();
  async function worker() {
    while (next < sessions.length) {
      const p = sessions[next++];
      const r = await playSession(browser, base, p);
      played += r.ok ? 1 + p.replays : r.games + 1;
      passed += r.games;
      (r.records || []).forEach((g) => {
        futures[g.future] = (futures[g.future] || 0) + 1;
        if (g.game === 1 && p.viewport === "desktop") { if (g.tipping) arcSeeds.tipping.push(p.seed); if (g.agents) arcSeeds.agents.push(p.seed); if (g.paused) arcSeeds.paused.push(p.seed); }
      });
      if (!r.ok) {
        failures.push(r.note);
        console.log(`  FAIL seed ${p.seed} (${p.viewport}) at ${r.note.step}:\n    - ${r.note.problems.slice(0, 6).join("\n    - ")}`);
      }
      if (played % 50 < 1 + p.replays) process.stdout.write(`  ${played}/${total} games, ${failures.length} failure(s), ${Math.round((Date.now() - t0) / 1000)} s\n`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(WORKERS, sessions.length) }, worker));
  await browser.close();
  if (server) server.close();

  console.log(`\n${passed} game(s) passed, ${failures.length} failure(s), in ${Math.round((Date.now() - t0) / 1000)} s.`);
  console.log("Futures reached: " + Object.keys(futures).sort().map((k) => `${k} ${futures[k]}`).join(", "));
  console.log(`Seeds that reached a tipping point (desktop, first game): ${arcSeeds.tipping.sort((a, b) => a - b).join(", ") || "none"}`);
  console.log(`Seeds that reached the agents era (desktop, first game): ${arcSeeds.agents.sort((a, b) => a - b).join(", ") || "none"}`);
  console.log(`Seeds where the world paused AI, the Vienna treaty (desktop, first game): ${arcSeeds.paused.sort((a, b) => a - b).join(", ") || "none"}`);
  if (failures.length) {
    console.log(`\nFailures (screenshots and notes in tools/play-test-failures/):`);
    failures.forEach((f) => console.log(`  - seed ${f.seed}, ${f.viewport}, ${f.step}: ${f.problems[0]}\n    repro: ${f.repro}`));
  }
  process.exitCode = failures.length ? 1 : 0;
})();
