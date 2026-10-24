"""Logo options for the site, made with Nano Banana at 1:1. Each option has its own prompt;
all share the game's look (the card back's hourglass whose sand turns to pixels, cream on
warm near-black). Images go to out/nanobanana/logo/, and every attempt is logged.

  .venv/bin/python logo.py              all options
  .venv/bin/python logo.py --options 2,4
"""
import argparse
import time

import studio
from providers import nanobanana as nb

OUT = studio.OUT / "nanobanana" / "logo"

BASE = (
    "A sleek, simple, modern logo mark for an artistic website called A Matter of Time, about AI and "
    "the future. Flat vector style, a single color: soft warm cream (#ece6da) on a plain, solid, warm "
    "near-black background (#161614). Centered, with generous empty space around it. Thin, precise, "
    "even line weight, geometric and minimal, like a luxury brand mark or an icon that still reads at "
    "favicon size. No gradients, no shadows, no glow, no texture, no 3D, no extra decoration, no "
    "border or frame, no mockup. No text, letters or words of any kind."
)

OPTIONS = {
    1: "The mark: a slender hourglass drawn in a single continuous thin line. The sand in the top bulb "
       "is solid, and as it falls through the neck it breaks into a few tiny square pixels that scatter "
       "into the bottom bulb.",
    2: "The mark: an hourglass reduced to two triangles meeting point to point. The top triangle is "
       "outlined; the bottom one fills with a small, neat grid of square pixels, a few missing at the top "
       "edge as if still falling.",
    3: "The mark: a thin circle, like a clock face, with a minimal hourglass inside it. A single vertical "
       "line of three small square pixels falls through the hourglass's neck.",
    4: "The mark: a minimal hourglass whose left half is drawn in smooth organic curves and whose right "
       "half is drawn in straight lines and right angles, like a circuit; a few tiny square pixels fall "
       "through the center.",
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--options", help="comma-separated option numbers (default: all)")
    args = ap.parse_args()
    which = [int(x) for x in args.options.split(",")] if args.options else sorted(OPTIONS)
    OUT.mkdir(parents=True, exist_ok=True)
    nb.ASPECT = "1:1"
    client = studio.make_client("nanobanana")
    for n in which:
        cid = "logo-%d" % n
        prompt = BASE + "\n\n" + OPTIONS[n]
        path = OUT / (cid + ".png")
        if path.exists():
            stamp = time.strftime("%Y%m%d-%H%M%S")
            arch = studio.archive_dir("nanobanana", "logo")
            arch.mkdir(parents=True, exist_ok=True)
            path.rename(arch / ("%s.%s.png" % (cid, stamp)))
        entry = {"provider": "nanobanana", "id": cid, "model": nb.MODEL,
                 "settings": {"model": nb.MODEL, "size": "1:1 " + nb.IMAGE_SIZE}, "prompt": prompt}
        try:
            img, usage, cost = nb.call(client, prompt)
        except Exception as e:
            entry["error"] = str(e)
            studio.log(entry)
            print("%s: failed (%s)" % (cid, e))
            continue
        img.save(path)
        entry.update({"path": str(path.relative_to(studio.STUDIO)), "usage": usage, "cost": cost})
        studio.log(entry)
        print("%s: %s (%dx%d, $%s)" % (cid, path, img.width, img.height, cost))


if __name__ == "__main__":
    main()
