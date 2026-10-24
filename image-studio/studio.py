"""Shared pieces of the image studio: cards, prompts, cropping, framing, files and the log.
Only the API call differs between providers (see providers/).

Levi's tool only. Never shipped with the game, and nothing in the game loads from here.
"""
import json
import os
import re
import shutil
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image

from providers import PROVIDERS, Refused, Rejected

# ---------------------------------------------------------------- settings
DEFAULT_PROVIDER = "nanobanana"   # Levi chose Nano Banana after the batch 1 comparison
MAX_IMAGES_PER_RUN = 16       # per provider, per run; change it here, there is no override flag
# Where an OpenAI scene sits under the frame: x, y, width, height. It covers the transparent
# window plus its soft edge, so the frame only overlaps it at the four corner boxes.
SCENE_BOX = (98, 47, 740, 1568)
MAX_BORDER_TRIES = 3          # a picture with a painted-in border is made again, at most this many tries in all

BATCHES = {
    1: ["r1-lab", "r1-trucks", "r1-election", "r1-flaw", "r1-tutor",
        "future-garden-1", "future-partnership-1", "future-upload-1", "future-escape-1",
        "future-gilded_few-1", "future-last_war-1", "future-blackout-1", "future-oracle-1",
        "future-long_middle-1"],
    2: ["r2-clinics", "r2-glasses", "r2-datacenter", "r2-deepfake", "r2-robots",
        "r3-upload", "r3-drones", "r3-companions", "r3-finland", "r3-nobel", "r3-worlds",
        "r4-shutdown", "r4-rogue", "r4-cancer", "r4-twocities", "r4-virtual"],
}
ALL_IDS = BATCHES[1] + BATCHES[2]

# ---------------------------------------------------------------- paths
STUDIO = Path(__file__).resolve().parent
PROJECT = STUDIO.parent
SITE = PROJECT / "site"   # the folder the live site is deployed from
STORY = SITE / "content" / "story.md"
FRAME = STUDIO / "frame" / "tarot_card_frame.png"
# Nano Banana cards: the model draws edge to edge, and Levi's border frame (1530 x 2720, a
# #ebdabc edge with a thin ink line around a clear 1438 x 2628 window) is laid on top, so the
# border is identical on every card.
CARD_FRAME = STUDIO / "frame" / "frame2.png"
OUT = STUDIO / "out"
LOG = STUDIO / "log.jsonl"
# Style references sent with every story card: the images in reference/story-style/, described by its note.txt.
# reference/olympians/ keeps the George O'Connor pages tried on 2026-10-23, no longer sent.
STORY_STYLE_REFS = sorted((STUDIO / "reference" / "story-style").glob("*.png"))
STORY_STYLE_NOTE = STUDIO / "reference" / "story-style" / "note.txt"   # what the references are for
DIRS = {
    "openai": {"scenes": OUT / "openai" / "scenes", "final": OUT / "openai" / "framed",
               "archive": OUT / "openai" / "archive"},
    "nanobanana": {"raw": OUT / "nanobanana" / "raw", "final": OUT / "nanobanana" / "cards",
                   "archive": OUT / "nanobanana" / "archive"},
}


def final_path(provider, card_id):
    """The finished card: framed for OpenAI, bordered for Nano Banana."""
    return DIRS[provider]["final"] / (card_id + ".png")


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# ---------------------------------------------------------------- cards
_PARSE_JS = r"""
const fs = require("fs"), P = require(process.argv[1]);
const s = P.parse(fs.readFileSync(process.argv[2], "utf8"));
const cards = {};
for (const c of s.scenarios) cards[c.id] = { id: c.id, round: c.round, headline: c.headline,
  label: c.label, date: c.date, place: c.place, description: c.imageDescription || "",
  summary: c.summary || [], text: c.story || [], question: c.question || "" };
for (const f of s.futures) f.stories.forEach((st, i) => {
  const id = "future-" + f.id + "-" + (i + 1);
  cards[id] = { id, future: f.id, title: f.title, tagline: f.tagline, story: i + 1,
    headline: f.title, description: st.imageDescription || "",
    summary: f.tagline ? [f.tagline] : [], text: st.text || [] };
});
process.stdout.write(JSON.stringify({ style: s.imageStyle, cards }));
"""


def load_story():
    """Read story.md fresh through the game's own parser. Returns (style, cards)."""
    out = subprocess.run(
        ["node", "-e", _PARSE_JS, str(SITE / "js" / "story-parser.js"), str(STORY)],
        capture_output=True, text=True, check=True,
    ).stdout
    data = json.loads(out)
    return data["style"].strip(), data["cards"]


def position(card):
    if card.get("future"):
        return "Future: %s, Story %d" % (card["title"], card["story"])
    if card["round"] == 1:
        return "Round 1 opener"
    return "Round %d card" % card["round"]


def card_year(card):
    """The year the picture shows: the card's date, or 2060 for a Future."""
    m = re.match(r"\d{4}", str(card.get("date") or ""))
    return int(m.group()) if m else 2060


def build_prompt(card, style, provider, comment=None, with_image=False):
    """Scene, the provider's blocks, the style guide; blank lines between.

    With Levi's regeneration notes: if he chose to start from the previous image, the prompt
    asks for that image to be revised by the notes; otherwise the notes are added after the
    scene and take priority over it (so they can adjust the scene or replace it outright)."""
    scene = card["description"].strip()
    comment = (comment or "").strip()
    if comment and with_image:
        head = ("The attached image is the current illustration for this card. Revise it according to "
                "these notes from the art director, and keep everything the notes don't mention as it is:\n"
                + comment + "\n\nThe card's original scene, for reference:\n" + scene)
    elif comment:
        head = (scene + "\n\nREVISION NOTES from the art director. They take priority over the scene "
                "above wherever the two differ, and if they describe a different scene, draw that scene "
                "instead:\n" + comment)
    elif with_image:
        head = ("The attached image is the current illustration for this card. Make a fresh version of it "
                "that keeps its idea and composition.\n\nThe card's scene:\n" + scene)
    elif card.get("style_ref"):
        head = (card["ref_note"] + "\n\n" + scene) if card.get("ref_note") else ("The attached image (or images) is a STYLE REFERENCE ONLY. Match its drawing style: clean, simple, flat "
                "line art with thin even lines, strict symmetry and geometric construction. Do not copy its "
                "subject, its moons, its suns, its stars, its frame or its colors.\n\n" + scene)
    else:
        head = scene
    # A card can bring its own block (the card back, which carries the title, does), and can
    # carry its own style in that block instead of the story's style guide.
    block = card.get("prompt_block") or PROVIDERS[provider].prompt_block(card_year(card))
    if not story_card(card):
        return head + "\n\n" + block + ("" if card.get("own_style") else "\n\n" + style)
    # A story card: the style goes first (models weigh the start of a prompt most), then the
    # scene, then the year. Any style references come with it.
    refs = ""
    if STORY_STYLE_REFS:
        if with_image:
            head = head.replace("The attached image is", "The first attached image is", 1)
        note = STORY_STYLE_NOTE.read_text().strip() if STORY_STYLE_NOTE.exists() else (
            "The attached images are STYLE REFERENCES. Draw this card in their style. Do not copy their "
            "characters, lettering or compositions.")
        if with_image:
            note = note.replace("The attached images are", "The attached images after the first are", 1)
        refs = note + "\n\n"
    return refs + style + "\n\nTHE SCENE:\n" + head + "\n\n" + block


def story_card(card):
    """A card from story.md, drawn in the story's style (not a card back)."""
    return (not card["id"].startswith("card-back-")
            and not card.get("own_style") and not card.get("style_ref"))


# ---------------------------------------------------------------- frame and images
def load_frame():
    """Open the frame and refuse to go on unless it is 9:16 with a transparent window."""
    if not FRAME.exists():
        raise SystemExit("No frame at %s" % FRAME)
    frame = Image.open(FRAME)
    w, h = frame.size
    if w * 16 != h * 9:
        raise SystemExit("The frame is %d x %d, not 9:16. Stopping." % (w, h))
    alpha = frame.getchannel("A") if frame.mode == "RGBA" else None
    if alpha is None or alpha.getpixel((w // 2, h // 2)) > 8:
        raise SystemExit("The frame has no transparent window in the middle. Stopping.")
    # Every see-through pixel of the window (inside the outer edge) must fall on the scene.
    see = alpha.point(lambda v: 255 if v <= 128 else 0).crop((40, 20, w - 40, h - 20)).getbbox()
    x, y, bw, bh = SCENE_BOX
    if see and not (see[0] + 40 >= x and see[1] + 20 >= y and see[2] + 40 <= x + bw and see[3] + 20 <= y + bh):
        raise SystemExit("The frame's window doesn't fit SCENE_BOX %s. Stopping." % (SCENE_BOX,))
    return frame


def to_scene(img, size=None):
    """Center-crop to the scene box's shape if needed, then resize to exactly its size."""
    tw, th = size or SCENE_BOX[2:]
    img = img.convert("RGB")
    w, h = img.size
    if w * th > h * tw:                      # too wide: trim the sides
        nw = round(h * tw / th)
        img = img.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    elif w * th < h * tw:                    # too tall: trim top and bottom
        nh = round(w * th / tw)
        img = img.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    return img.resize((tw, th), Image.LANCZOS)


def frame_scene(scene, frame):
    """The scene sits only inside the frame's window; the frame goes on top, so only its
    corner boxes overlap the scene. Under the rest of the frame is the frame's own color."""
    out = frame.copy()
    out.putalpha(255)
    out.paste(scene.convert("RGBA"), SCENE_BOX[:2])
    out.alpha_composite(frame)
    return out


_card_frame = None


def load_card_frame():
    """Levi's border frame for Nano Banana cards and its clear window (x, y, w, h). Refuses a
    frame that isn't 9:16 or has no transparent window."""
    global _card_frame
    if _card_frame is None:
        if not CARD_FRAME.exists():
            raise SystemExit("No border frame at %s" % CARD_FRAME)
        f = Image.open(CARD_FRAME).convert("RGBA")
        if not is_9x16(f.size):
            raise SystemExit("The border frame is %d x %d, not 9:16. Stopping." % f.size)
        box = f.getchannel("A").point(lambda v: 255 if v <= 8 else 0).getbbox()
        if not box:
            raise SystemExit("The border frame has no transparent window. Stopping.")
        _card_frame = (f, (box[0], box[1], box[2] - box[0], box[3] - box[1]))
    return _card_frame


def add_border(img):
    """Fit the model's image to the frame's window (center-crop to its shape, then resize),
    and lay the frame on top. Returns the finished card at the frame's size."""
    frame, (x, y, w, h) = load_card_frame()
    card = Image.new("RGBA", frame.size, (0, 0, 0, 255))
    card.paste(to_scene(img, (w, h)).convert("RGBA"), (x, y))
    card.alpha_composite(frame)
    return card.convert("RGB")


def painted_border(img, band=0.15, dark=90, need=0.75, pale=150):
    """True if the model painted its own frame into the picture: on at least three sides, a long,
    straight dark line inside the outer band, with a pale margin between it and the edge.
    (Tuned on batch 1: it matches Levi's picks on all 14 cards, and a dark night sky running to
    the edge doesn't count.)"""
    g = img.convert("L")
    s = g.resize((max(1, g.size[0] // 4), max(1, g.size[1] // 4)))
    w, h = s.size
    px = s.load()
    xs = range(int(w * .1), int(w * .9))
    ys = range(int(h * .1), int(h * .9))

    def line(side, k):
        if side == "top":
            return [px[x, k] for x in xs]
        if side == "bottom":
            return [px[x, h - 1 - k] for x in xs]
        if side == "left":
            return [px[k, y] for y in ys]
        return [px[w - 1 - k, y] for y in ys]

    sides = 0
    for side in ("top", "bottom", "left", "right"):
        depth = int((h if side in ("top", "bottom") else w) * band)
        for k in range(2, depth):
            ln = line(side, k)
            if sum(v < dark for v in ln) / len(ln) >= need:
                margin = [v for j in range(k) for v in line(side, j)]
                if sum(margin) / len(margin) > pale:
                    sides += 1
                break
    return sides >= 3


def is_9x16(size):
    w, h = size
    return w * 16 == h * 9


def archive_dir(provider, card_id):
    """The card's own folder in the archive. All card back options share card-back/."""
    name = "card-back" if card_id.startswith("card-back-") else card_id
    return DIRS[provider]["archive"] / name


def move_to_history(provider, card_id):
    """Move a card's current version into its archive folder; nothing is ever deleted."""
    hist = archive_dir(provider, card_id)
    hist.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    moved = []
    for kind in ("final", "scenes", "raw"):
        if kind not in DIRS[provider]:
            continue
        src = DIRS[provider][kind] / (card_id + ".png")
        if src.exists():
            label = {"scenes": "scene", "raw": "raw"}.get(kind, "framed" if provider == "openai" else "card")
            dst = hist / ("%s.%s.%s.png" % (card_id, stamp, label))
            shutil.move(str(src), str(dst))
            moved.append(str(dst.relative_to(STUDIO)))
    return moved


# ---------------------------------------------------------------- the log
def log(entry):
    entry.setdefault("time", now())
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")
        f.flush()
        os.fsync(f.fileno())


def read_log():
    """Every row. Rows from before the second provider have no provider field: they are OpenAI."""
    if not LOG.exists():
        return []
    rows = []
    for line in LOG.read_text(encoding="utf-8").splitlines():
        if line.strip():
            try:
                row = json.loads(line)
            except ValueError:
                continue
            if row.get("type") in ("attempt", "review"):
                row.setdefault("provider", "openai")
            rows.append(row)
    return rows


def current_versions(provider):
    """The latest successful attempt per id for a provider: the version reviews belong to."""
    out = {}
    for r in read_log():
        if r.get("type") == "attempt" and r.get("provider") == provider and r.get("final", r.get("framed")):
            out[r["id"]] = r
    return out


def row_cost(r):
    """An attempt's cost, recomputed from its logged usage with the provider's current prices
    (so a price fix applies to old rows too); the logged cost if there's no usage."""
    p = PROVIDERS.get(r.get("provider"))
    if p and r.get("usage"):
        return p.cost(r["usage"]) or 0
    return r.get("cost") or 0


def estimate_per_image(provider):
    """The average real cost of this provider's earlier images with the same settings, plus
    10% headroom; before there are any, the provider's own table price."""
    p = PROVIDERS[provider]
    seen = [row_cost(r) for r in read_log() if r.get("type") == "attempt" and r.get("provider") == provider
            and r.get("usage") and all(r.get(k) == v for k, v in p.SETTINGS.items())]
    if seen:
        return round(sum(seen) / len(seen) * 1.1, 4)
    return p.table_estimate()


def spent(provider, ids=None, since=None):
    return round(sum(row_cost(r) for r in read_log() if r.get("type") == "attempt"
                     and r.get("provider") == provider and (ids is None or r["id"] in ids)
                     and (since is None or r.get("time", "") >= since)), 4)


# ---------------------------------------------------------------- generating
def make_client(provider):
    from dotenv import dotenv_values
    p = PROVIDERS[provider]
    key = (dotenv_values(STUDIO / ".env").get(p.KEY_NAME) or "").strip()
    if not key or key.startswith("paste-your"):
        raise SystemExit("No %s in image-studio/.env yet." % p.KEY_NAME)
    return p.make_client(key)


def reference_image(provider, card_id):
    """The image a revision starts from: the model's own unbordered output when there is one."""
    for kind in ("raw", "scenes", "final"):
        f = DIRS[provider].get(kind)
        if f and (f / (card_id + ".png")).exists():
            return f / (card_id + ".png")
    return None


def generate_one(provider, client, card, style, frame, say=print, comment=None, with_image=False):
    """One card from one provider, one request at a time, at most two retries.
    Logs every attempt. Returns True on success."""
    p = PROVIDERS[provider]
    ref = reference_image(provider, card["id"]) if with_image else None
    if with_image and ref is None:
        say("  no previous image to start from; generating from the notes alone")
    prompt = build_prompt(card, style, provider, comment, with_image=ref is not None)
    if ref is None and card.get("style_ref"):
        ref = card["style_ref"]                # sent as a style reference (build_prompt says so)
    elif story_card(card):
        ref = ([ref] if ref else []) + STORY_STYLE_REFS or None   # the previous image first, then any references
    base = dict({"type": "attempt", "provider": provider, "id": card["id"], "prompt": prompt,
                 "comment": (comment or "").strip() or None,
                 "reference": ([str(r.relative_to(STUDIO)) for r in ref] if isinstance(ref, list)
                               else str(ref.relative_to(STUDIO)) if ref else None)}, **p.SETTINGS)
    ref_img = None
    if ref is not None:
        # A list of style references is sent as several images.
        ref_img = [Image.open(r) for r in ref] if isinstance(ref, list) else Image.open(ref)
        for im in (ref_img if isinstance(ref_img, list) else [ref_img]):
            im.load()
    errors_left, border_tries, try_no = 2, 0, 0
    while True:
        try_no += 1
        t0 = time.time()
        try:
            img, usage, cost = p.call(client, prompt, ref_img)
        except Refused as e:
            log(dict(base, try_no=try_no, error=str(e)[:2000], refused=True, moderation=e.details))
            say("  refused for content, not retrying: %s" % str(e)[:300])
            return False
        except Rejected as e:
            log(dict(base, try_no=try_no, error=str(e)[:2000]))
            say("  request rejected, not retrying: %s" % str(e)[:300])
            return False
        except Exception as e:               # network, rate limit, server error
            log(dict(base, try_no=try_no, error=str(e)[:2000]))
            if errors_left == 0:
                say("  failed after 3 tries: %s" % str(e)[:300])
                return False
            pause = 15 * (3 - errors_left)
            errors_left -= 1
            say("  error (%s), retrying in %ds" % (str(e)[:120], pause))
            time.sleep(pause)
            continue

        returned = "%dx%d" % img.size
        extra = {}
        if not p.FRAMED and not card.get("frame_ok") and painted_border(img):
            border_tries += 1
            if border_tries < MAX_BORDER_TRIES:
                hist = archive_dir(provider, card["id"])
                hist.mkdir(parents=True, exist_ok=True)
                kept = hist / ("%s.%s.painted-border.png" % (card["id"], datetime.now().strftime("%Y%m%d-%H%M%S")))
                img.save(kept, "PNG")
                log(dict(base, try_no=try_no, returned_size=returned, seconds=round(time.time() - t0, 1),
                         usage=usage, cost=cost, painted_border=True, kept=str(kept.relative_to(STUDIO)),
                         error="painted its own border; made again"))
                say("  painted its own border, making it again ($%.3f)" % (cost or 0))
                continue
            extra["painted_border"] = True
            say("  WARNING: still painted its own border after %d tries; kept and flagged" % MAX_BORDER_TRIES)

        moved = move_to_history(provider, card["id"])
        final = final_path(provider, card["id"])
        final.parent.mkdir(parents=True, exist_ok=True)
        if p.FRAMED:
            scene = to_scene(img)
            scene_path = DIRS[provider]["scenes"] / (card["id"] + ".png")
            scene_path.parent.mkdir(parents=True, exist_ok=True)
            scene.save(scene_path)
            frame_scene(scene, frame).save(final)
            extra["scene"] = str(scene_path.relative_to(STUDIO))
        else:
            # The model's own image is kept as it came back; the card gets Levi's border frame.
            raw = DIRS[provider]["raw"] / (card["id"] + ".png")
            raw.parent.mkdir(parents=True, exist_ok=True)
            img.save(raw, "PNG")
            # A card can opt out of the border (the void card backs do).
            (add_border(img) if card.get("border", True) else img).save(final, "PNG")
            extra["raw"] = str(raw.relative_to(STUDIO))
        log(dict(base, try_no=try_no, returned_size=returned, seconds=round(time.time() - t0, 1),
                 final=str(final.relative_to(STUDIO)), moved_to_history=moved, usage=usage, cost=cost,
                 error=None, **extra))
        say("  done in %.0fs%s" % (time.time() - t0, ", $%.3f" % cost if cost is not None else ""))
        return True
