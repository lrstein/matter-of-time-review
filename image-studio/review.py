"""The private review page. Listens on localhost only.

  image-studio/.venv/bin/python image-studio/review.py      then open http://localhost:8765
  (the studio's own .venv: the system Python lacks dotenv and can't read the keys)

Shows every card in story.md for the default provider (Nano Banana), in tabs by round, then the
Futures and the card back. Each card's headline, article and scene prompt open as dropdowns. A card's
current image is the one in use (there is no approving). Levi can Generate a card not made yet, or
write notes and regenerate, choosing whether the previous image is the starting point.
The page talks only to this server. Only this server (through studio.py) talks to the image
APIs, so the keys never reach the browser.
"""
import json
import re
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

import card_back
import studio as S
from providers import PROVIDERS

PORT = 8765
HOSTS = {"localhost:%d" % PORT, "127.0.0.1:%d" % PORT}
PROVIDER = S.DEFAULT_PROVIDER
busy = threading.Lock()


def back_ids():
    """The card back options made so far (card-back-1, card-back-2, …)."""
    folder = S.DIRS[PROVIDER]["final"]
    found = [p.stem for p in folder.glob("card-back-*.png") if p.stem.split("-")[-1].isdigit()]
    return sorted(found, key=lambda i: int(i.split("-")[-1]))


def known(cid):
    return cid in S.load_story()[1] or cid in back_ids()


def card_for(cid, cards):
    if cid.startswith("card-back-"):
        return card_back.card(cid)
    return cards[cid]


def tab_of(card):
    """The page's tab for a card: its round, the Futures, or the card back."""
    if card.get("future"):
        return "futures"
    return "r%d" % card["round"]


def state():
    style, cards = S.load_story()
    made = S.current_versions(PROVIDER)
    notes = {}                         # id -> latest notes draft, whatever the version
    errors = {}
    for r in S.read_log():
        if r.get("provider") != PROVIDER:
            continue
        if r.get("type") == "attempt":
            errors[r["id"]] = r.get("error")
        elif r.get("type") == "review":
            if "notes" in r:
                notes[r["id"]] = r["notes"]
    items = []
    for i in back_ids() + list(cards):
        f = S.final_path(PROVIDER, i)
        att = made.get(i) or {}
        c = card_for(i, cards)
        if i.startswith("card-back-"):
            tab, position, label = "back", "Card back, option " + i.split("-")[-1], "The back of every card"
        else:
            tab, position = tab_of(c), S.position(c)
            label = (c["title"] + ", Story %d" % c["story"]) if c.get("future") else (c.get("label") or c["headline"])
        items.append({
            "id": i, "tab": tab, "position": position, "label": label,
            "headline": c.get("headline", ""), "date": c.get("date", ""), "place": c.get("place", ""),
            "summary": c.get("summary", []), "text": c.get("text", []), "question": c.get("question", ""),
            "scene": c.get("description", ""), "prompt": S.build_prompt(c, style, PROVIDER),
            "ready": f.exists(), "v": int(f.stat().st_mtime) if f.exists() else 0,
            "notes": notes.get(i, ""),
            "last_notes": att.get("comment"), "from_image": bool(att.get("reference")),
            "painted_border": bool(att.get("painted_border")),
            "error": errors.get(i),
        })
    return {"items": items, "label": PROVIDERS[PROVIDER].LABEL,
            "estimate": S.estimate_per_image(PROVIDER), "busy": busy.locked()}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass

    def guard(self):
        if self.headers.get("Host") not in HOSTS:
            self.send_error(403)
            return False
        return True

    def send(self, code, body, ctype="application/json"):
        if isinstance(body, (dict, list)):
            body = json.dumps(body)
        if isinstance(body, str):
            body = body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if not self.guard():
            return
        path = urlparse(self.path).path
        if path == "/":
            return self.send(200, PAGE, "text/html; charset=utf-8")
        if path == "/api/state":
            return self.send(200, state())
        m = re.fullmatch(r"/img/([A-Za-z0-9_\-]+)\.png", path)
        if m:
            f = S.final_path(PROVIDER, m.group(1))
            if f.exists():
                return self.send(200, f.read_bytes(), "image/png")
        self.send_error(404)

    def do_POST(self):
        if not self.guard():
            return
        if not (self.headers.get("Content-Type") or "").startswith("application/json"):
            return self.send_error(415)
        try:
            data = json.loads(self.rfile.read(int(self.headers.get("Content-Length") or 0)) or b"{}")
        except ValueError:
            return self.send_error(400)
        cid = data.get("id")
        if not known(cid):
            return self.send(400, {"error": "unknown id"})
        path = urlparse(self.path).path
        notes = str(data.get("notes", ""))[:5000]

        if path == "/api/review":
            dec = data.get("decision")
            S.log({"type": "review", "provider": PROVIDER, "id": cid,
                   "version": S.current_versions(PROVIDER).get(cid, {}).get("time"),
                   "decision": dec if dec in ("approve", "deny") else None, "notes": notes})
            return self.send(200, {"ok": True})

        if path == "/api/regenerate":
            # Same budget rules as generate.py: one image, under the hard limit, confirmed on the page.
            if S.MAX_IMAGES_PER_RUN < 1:
                return self.send(400, {"error": "MAX_IMAGES_PER_RUN is 0"})
            if not busy.acquire(blocking=False):
                return self.send(409, {"error": "Another image is being made. Wait for it to finish."})
            try:
                style, cards = S.load_story()
                lines = []
                ok = S.generate_one(PROVIDER, S.make_client(PROVIDER), card_for(cid, cards), style, S.load_frame(),
                                    say=lines.append, comment=notes, with_image=bool(data.get("with_image")))
                if ok:   # the notes were used; clear the draft for the new version
                    S.log({"type": "review", "provider": PROVIDER, "id": cid,
                           "version": S.current_versions(PROVIDER).get(cid, {}).get("time"),
                           "decision": None, "notes": ""})
                return self.send(200 if ok else 500, {"ok": ok, "message": " ".join(lines)})
            except SystemExit as e:
                return self.send(500, {"ok": False, "message": str(e)})
            except Exception as e:     # say what went wrong on the page instead of dropping the connection
                return self.send(500, {"ok": False, "message": "%s: %s" % (type(e).__name__, e)})
            finally:
                busy.release()
        self.send_error(404)


PAGE = r"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Image Studio</title>
<style>
:root { --bg:#0d0c0b; --panel:#171513; --line:#2c2925; --text:#ece6da; --text-2:#c9c2b5; --faint:#8f897e;
        --ok:#8fae76; --no:#b5655a; --gold:#c9a95c; }
* { box-sizing:border-box }
body { margin:0; background:var(--bg); color:var(--text); font:15px/1.5 -apple-system, Inter, system-ui, sans-serif }
header { position:sticky; top:0; z-index:5; background:rgba(13,12,11,.94); backdrop-filter:blur(6px);
         border-bottom:1px solid var(--line); padding:14px 24px 0 }
.top { display:flex; flex-wrap:wrap; gap:12px 24px; align-items:center }
h1 { font:500 22px/1 Georgia, serif; margin:0; letter-spacing:.02em }
.count { color:var(--text-2) } .count b { color:var(--ok); font-weight:600 }
.meta { color:var(--faint); font-size:13px; margin-left:auto }
.group { display:flex; gap:6px; flex-wrap:wrap; align-items:center }
.tabs { display:flex; gap:2px; overflow-x:auto; margin-top:14px }
.tab { border:0; border-bottom:2px solid transparent; border-radius:0; padding:10px 16px; color:var(--text-2); white-space:nowrap }
.tab:hover { color:var(--text); border-color:var(--line) }
.tab.on { color:var(--text); border-color:var(--gold); background:transparent }
.tab small { color:var(--faint); margin-left:6px }
.bar { display:flex; flex-wrap:wrap; gap:8px 20px; align-items:center; max-width:1300px; margin:0 auto; padding:18px 24px 0 }
.bar .lbl2 { color:var(--faint); font-size:13px }
button { font:inherit; color:var(--text); background:transparent; border:1px solid var(--line); border-radius:999px;
         padding:7px 16px; cursor:pointer; transition:border-color .2s, background .2s }
button:hover { border-color:var(--text-2) }
button.on { background:var(--text); color:var(--bg); border-color:var(--text) }
button.small { padding:4px 12px; font-size:13px }
button:disabled { opacity:.45; cursor:default }
main { padding:20px 24px 60px; display:flex; flex-direction:column; gap:24px; max-width:1300px; margin:0 auto }
.item { display:grid; grid-template-columns:auto minmax(300px, 1fr); gap:32px; background:var(--panel);
        border:1px solid var(--line); border-radius:14px; padding:20px }
.item img, .empty { height:min(70vh, 640px); aspect-ratio:9/16; border-radius:10px; display:block; background:#000; position:sticky; top:150px }
.empty { display:grid; place-items:center; color:var(--faint); border:1px dashed var(--line) }
.pos { color:var(--text-2); font-size:13px; text-transform:uppercase; letter-spacing:.08em }
.id { color:var(--faint); font-size:12px; font-family:ui-monospace, Menlo, monospace }
h2 { font:500 26px/1.25 Georgia, serif; margin:6px 0 6px }
details { border-top:1px solid var(--line); padding:10px 0 }
details:last-of-type { border-bottom:1px solid var(--line) }
summary { cursor:pointer; color:var(--text-2); font-size:13px; text-transform:uppercase; letter-spacing:.08em; list-style:none }
summary::before { content:"▸"; display:inline-block; width:16px; transition:transform .2s }
details[open] > summary::before { transform:rotate(90deg) }
summary:hover { color:var(--text) }
.body { padding:10px 0 4px 16px }
.headline { font:500 21px/1.35 Georgia, serif }
.dek { color:var(--text-2); font-size:13px; margin-top:6px }
.article p { font:16px/1.65 Georgia, serif; margin:0 0 12px; max-width:68ch }
.article .sum { color:var(--text-2); font-style:italic }
.article .q { font-weight:600 }
.article a { color:var(--gold) }
.scene { font:15px/1.6 Georgia, serif; max-width:68ch }
pre { white-space:pre-wrap; font:12px/1.5 ui-monospace, Menlo, monospace; color:var(--text-2); background:#0f0e0d;
      border:1px solid var(--line); border-radius:8px; padding:10px 12px; max-height:360px; overflow:auto }
details details { border:0; padding:8px 0 0 }
.row { display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin:16px 0 }
label.lbl { display:block; color:var(--text-2); font-size:13px; margin:22px 0 6px }
textarea { width:100%; min-height:100px; background:#0f0e0d; color:var(--text); border:1px solid var(--line);
           border-radius:10px; padding:10px 12px; font:inherit; resize:vertical }
textarea:focus { outline:none; border-color:var(--text-2) }
.check { display:flex; gap:8px; align-items:center; color:var(--text-2); font-size:14px; cursor:pointer }
.check input { width:16px; height:16px; accent-color:var(--gold) }
.saved { color:var(--faint); font-size:12px; min-height:16px }
.last { color:var(--text-2); font-size:13px; border-left:2px solid var(--line); padding-left:10px; margin-top:14px }
.err { color:#e0a397; font-size:13px; margin-top:8px }
.status { color:var(--gold); font-size:14px; min-height:20px }
@media (max-width: 900px) { .item { grid-template-columns:1fr } .item img, .empty { position:static; height:auto; width:min(100%, 440px) } .meta { margin-left:0 } }
</style></head><body>
<header>
  <div class="top">
    <h1>Image Studio</h1>
    <div class="count" id="count"></div>
    <div class="meta" id="meta"></div>
  </div>
  <nav class="tabs" id="tabs"></nav>
</header>
<div class="bar">
  <div class="group" id="filters"></div>
  <div class="group"><span class="lbl2">Open all</span>
    <button class="small" data-all="headline">Headlines</button>
    <button class="small" data-all="article">Articles</button>
    <button class="small" data-all="scene">Scene prompts</button>
    <button class="small" data-all="none">Close all</button></div>
</div>
<main id="list"></main>
<script>
let S = null, filter = "all", drafts = {}, withImg = {}, open = {};
const TABS = [["r1","Round 1"],["r2","Round 2"],["r3","Round 3"],["r4","Round 4"],["r5","Round 5"],["r6","Round 6"],
              ["futures","Futures"],["back","Card back"]];
let tab = TABS.some(t => t[0] === location.hash.slice(1)) ? location.hash.slice(1) : "r1";
const FILTERS = [["all","All"],["new","Not made"],["made","Made"]];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
// story.md's own markup: [words](https://…) links and *invented names* in italics
const rich = s => esc(s).replace(/\[([^\]]+)\]\((https:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
                        .replace(/\*([^*]+)\*/g, "<em>$1</em>");
const plain = s => esc(String(s ?? "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")).replace(/\*([^*]+)\*/g, "<em>$1</em>");
const post = (url, body) => fetch(url, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
const $ = id => document.getElementById(id);
const paras = x => (Array.isArray(x) ? x : x ? [x] : []);

async function load() { S = await (await fetch("/api/state")).json(); render(); }
function shown(it) {
  return filter === "all" ? true : filter === "new" ? !it.ready : it.ready;
}
function render() {
  const inTab = S.items.filter(it => it.tab === tab);
  $("count").innerHTML = `<b>${inTab.filter(x => x.ready).length}</b> of ${inTab.length} made`;
  $("meta").textContent = `${S.label} · ~$${S.estimate} per image`;
  $("tabs").innerHTML = TABS.map(([k,l]) => {
    const n = S.items.filter(x => x.tab === k);
    return n.length ? `<button class="tab ${k===tab?"on":""}" data-tab="${k}">${l}<small>${n.filter(x=>x.ready).length}/${n.length}</small></button>` : "";
  }).join("");
  $("filters").innerHTML = FILTERS.map(([k,l]) => `<button class="small ${k===filter?"on":""}" data-f="${k}">${l}</button>`).join("");
  const items = inTab.filter(shown);
  $("list").innerHTML = items.length ? items.map(card).join("") : `<p style="color:var(--text-2)">Nothing here.</p>`;
}
const det = (it, key, title, body) =>
  `<details data-key="${key}" data-id="${it.id}" ${open[it.id + ":" + key] ? "open" : ""}><summary>${title}</summary><div class="body">${body}</div></details>`;
function card(it) {
  const notes = drafts[it.id] ?? it.notes;
  const keep = withImg[it.id] ?? true;
  const where = [it.date, it.place].filter(Boolean).join(" · ");
  const article = paras(it.summary).map(p => `<p class="sum">${rich(p)}</p>`).join("") +
                  paras(it.text).map(p => `<p>${rich(p)}</p>`).join("") +
                  (it.question ? `<p class="q">${plain(it.question)}</p>` : "");
  return `<section class="item" id="c-${it.id}">
    ${it.ready ? `<img src="/img/${it.id}.png?v=${it.v}" alt="">` : `<div class="empty">Not generated yet</div>`}
    <div>
      <div class="pos">${esc(it.position)}${where ? " · " + esc(where) : ""}</div>
      <h2>${plain(it.label)}</h2>
      <div class="id">${it.id}</div>
      <div style="margin-top:16px">
        ${det(it, "headline", "Headline", `<div class="headline">${plain(it.headline)}</div>`)}
        ${det(it, "article", "Article", `<div class="article">${article || '<p class="sum">No text.</p>'}</div>`)}
        ${det(it, "scene", "Scene prompt", `<div class="scene">${esc(it.scene) || "No image description yet."}</div>
           <details><summary>Full prompt sent to ${esc(S.label)}</summary><pre>${esc(it.prompt)}</pre></details>`)}
      </div>
      <label class="lbl" style="margin-top:16px" for="n-${it.id}">${it.ready ? "Notes for regeneration" : "Notes (optional)"}</label>
      <textarea id="n-${it.id}" data-id="${it.id}" placeholder="What to change, or a different idea for the scene">${esc(notes)}</textarea>
      <div class="saved" id="sv-${it.id}"></div>
      <div class="row">
        ${it.ready ? `<label class="check"><input type="checkbox" data-keep="${it.id}" ${keep?"checked":""}> Start from this image</label>` : ""}
        <button data-act="regen" data-id="${it.id}" ${S.busy || !it.scene?"disabled":""}>${it.ready ? "Regenerate" : "Generate"}</button>
      </div>
      <div class="status" id="st-${it.id}"></div>
      ${it.last_notes ? `<div class="last">This version was made ${it.from_image ? "from the previous image" : "from scratch"} with your notes: ${esc(it.last_notes)}</div>` : ""}
      ${it.painted_border ? `<div class="err">The model painted its own border into this picture on every try, so it may show a double border.</div>` : ""}
      ${it.error && !it.ready ? `<div class="err">Last attempt: ${esc(it.error.slice(0,300))}</div>` : ""}
    </div></section>`;
}
const find = id => S.items.find(x => x.id === id);
async function save(it) {
  const r = await post("/api/review", { id:it.id, notes:drafts[it.id] ?? it.notes });
  const el = $("sv-" + it.id); if (el) el.textContent = r.ok ? "Saved" : "Not saved. Is review.py still running?";
}
document.addEventListener("toggle", e => {
  const d = e.target; if (d.tagName === "DETAILS" && d.dataset.key) open[d.dataset.id + ":" + d.dataset.key] = d.open;
}, true);
document.addEventListener("click", async e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.tab) { tab = b.dataset.tab; history.replaceState(null, "", "#" + tab); window.scrollTo(0, 0); return render(); }
  if (b.dataset.f) { filter = b.dataset.f; return render(); }
  if (b.dataset.all) {
    const k = b.dataset.all;
    S.items.filter(it => it.tab === tab).forEach(it => ["headline","article","scene"].forEach(x => {
      if (k === "none") open[it.id + ":" + x] = false; else if (x === k) open[it.id + ":" + x] = true;
    }));
    return render();
  }
  const it = b.dataset.id && find(b.dataset.id); if (!it) return;
  const act = b.dataset.act;
  if (act === "regen") {
    const notes = (drafts[it.id] ?? it.notes).trim();
    const keep = it.ready && (withImg[it.id] ?? true);
    if (keep && !notes) { alert("Write what to change first, or untick “Start from this image” for a fresh version."); return; }
    const how = !it.ready ? "for the first time" : keep ? "starting from this image" : "from scratch";
    if (!confirm(`${it.ready ? "Regenerate" : "Generate"} ${it.id} ${how}${notes ? " with your notes" : ""}?\n\nOne image, about $${S.estimate}.` +
                 (it.ready ? "\nThe current version moves to history and stays there." : ""))) return;
    S.busy = true; render();
    $("st-" + it.id).textContent = "Generating… this takes about half a minute.";
    try {
      const r = await post("/api/regenerate", { id:it.id, notes, with_image:keep }); const j = await r.json();
      if (!j.ok) alert(j.message || j.error || "It didn't work.");
      else delete drafts[it.id];
    } catch (err) { alert("Lost contact with review.py."); }
    await load();
    $("c-" + it.id)?.scrollIntoView({ block:"start" });
  }
});
document.addEventListener("change", e => { if (e.target.dataset.keep) withImg[e.target.dataset.keep] = e.target.checked; });
let timers = {};
document.addEventListener("input", e => {
  const t = e.target; if (t.tagName !== "TEXTAREA") return;
  const it = find(t.dataset.id); drafts[it.id] = t.value;
  $("sv-" + it.id).textContent = "…";
  clearTimeout(timers[it.id]); timers[it.id] = setTimeout(() => save(it), 600);
});
load();
</script></body></html>
"""


def port_taken():
    """True if anything already answers on this port, on IPv4 or IPv6 localhost.
    (A browser's "localhost" may reach either, so both must be free.)"""
    import socket
    for family, addr in ((socket.AF_INET, "127.0.0.1"), (socket.AF_INET6, "::1")):
        with socket.socket(family, socket.SOCK_STREAM) as s:
            s.settimeout(0.5)
            try:
                if s.connect_ex((addr, PORT)) == 0:
                    return True
            except OSError:
                pass
    return False


if __name__ == "__main__":
    if port_taken():
        raise SystemExit("Port %d is already in use by another program. Stop it first "
                         "(lsof -nP -iTCP:%d -sTCP:LISTEN shows which)." % (PORT, PORT))
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print("Image Studio: http://localhost:%d  (localhost only; Ctrl+C to stop)" % PORT)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
