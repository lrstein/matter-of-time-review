"""Put approved card images into the game (v4-images.md §8).

  python image-studio/publish.py --ids r1-lab,future-garden-1
  python image-studio/publish.py --approved            (every card currently approved on the review page)

For each card: compresses the finished card to site/images/cards/<id>.webp (900 x 1600, high-quality
WebP; the full-size original stays in image-studio/), and writes that path into the card's
**Image:** field in site/content/story.md (as images/cards/<id>.webp) (for a Future story, the field under its ### Story N).
Only run it for cards Levi has approved for the game.
"""
import argparse
import re
import sys

from PIL import Image

import studio as S

GAME_DIR = S.SITE / "images" / "cards"
GAME_SIZE = (900, 1600)
QUALITY = 90


def set_image_field(text, card_id, path):
    """Return story text with the card's **Image:** line set to path."""
    lines = text.split("\n")
    m = re.fullmatch(r"future-(.+)-(\d+)", card_id)
    head = "## " + (m.group(1) if m else card_id)
    try:
        start = lines.index(head)
    except ValueError:
        raise SystemExit("No section %r in story.md" % head)
    i = start + 1
    if m:                                  # find ### Story N inside this Future
        while i < len(lines) and lines[i] != "### Story %s" % m.group(2):
            if lines[i].startswith("## "):
                raise SystemExit("No ### Story %s under %s" % (m.group(2), head))
            i += 1
        i += 1
    while i < len(lines):
        if lines[i].startswith("## ") or (m and lines[i].startswith("### ")):
            break
        if lines[i].startswith("**Image:**"):
            lines[i] = "**Image:** " + path
            return "\n".join(lines)
        i += 1
    raise SystemExit("No **Image:** field for %s" % card_id)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--ids", help="comma-separated card ids")
    ap.add_argument("--approved", action="store_true", help="every card approved on the review page")
    a = ap.parse_args()
    prov = S.DEFAULT_PROVIDER
    if a.approved:
        made = S.current_versions(prov)
        latest = {}
        for r in S.read_log():
            if r.get("type") == "review" and r.get("provider") == prov and r.get("version") == made.get(r["id"], {}).get("time"):
                latest[r["id"]] = r.get("decision")
        ids = [i for i in S.load_story()[1] if latest.get(i) == "approve"]
    elif a.ids:
        ids = [i.strip() for i in a.ids.split(",") if i.strip()]
    else:
        ap.error("give --ids or --approved")
    if not ids:
        sys.exit("No cards to publish.")

    GAME_DIR.mkdir(parents=True, exist_ok=True)
    text = S.STORY.read_text(encoding="utf-8")
    for i in ids:
        src = S.final_path(prov, i)
        if not src.exists():
            sys.exit("No finished card for %s" % i)
        out = GAME_DIR / (i + ".webp")
        Image.open(src).convert("RGB").resize(GAME_SIZE, Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=6)
        rel = out.relative_to(S.SITE).as_posix()
        text = set_image_field(text, i, rel)
        S.log({"type": "publish", "provider": prov, "id": i, "source": str(src.relative_to(S.STUDIO)),
               "game_file": rel, "version": S.current_versions(prov).get(i, {}).get("time")})
        print("  %-22s -> %s  (%d KB)" % (i, rel, out.stat().st_size // 1024))
    S.STORY.write_text(text, encoding="utf-8")
    print("%d card(s) published; story.md updated. Run node tools/check-story.js and the play-test." % len(ids))


if __name__ == "__main__":
    main()
