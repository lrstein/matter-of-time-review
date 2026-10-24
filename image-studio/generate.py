"""Generate card images through OpenAI, Nano Banana (Google Gemini) or both.

  python image-studio/generate.py --batch 1                         (default provider)
  python image-studio/generate.py --batch 1 --provider nanobanana
  python image-studio/generate.py --batch 1 --provider both
  python image-studio/generate.py --ids r1-lab,r1-tutor --provider openai
  python image-studio/generate.py --regenerate r1-lab --provider nanobanana
  python image-studio/generate.py --batch 1 --provider both --dry-run   (prompts and cost only)

Cards that already have an image from that provider are skipped unless named with --regenerate.
Every run shows the count and an estimated cost per provider and asks before spending anything.
"""
import argparse
import sys

import studio as S
from providers import PROVIDERS


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--batch", type=int, choices=sorted(S.BATCHES))
    ap.add_argument("--ids", help="comma-separated card ids")
    ap.add_argument("--regenerate", help="comma-separated ids to make again (old versions go to history)")
    ap.add_argument("--provider", choices=["openai", "nanobanana", "both"], default=S.DEFAULT_PROVIDER)
    ap.add_argument("--dry-run", action="store_true", help="print the prompts and the estimate, call nothing")
    a = ap.parse_args()

    style, cards = S.load_story()
    frame = S.load_frame()
    providers = ["openai", "nanobanana"] if a.provider == "both" else [a.provider]

    wanted, forced = [], set()
    if a.batch:
        wanted += S.BATCHES[a.batch]
    if a.ids:
        wanted += [i.strip() for i in a.ids.split(",") if i.strip()]
    if a.regenerate:
        forced = {i.strip() for i in a.regenerate.split(",") if i.strip()}
        wanted += sorted(forced)
    if not wanted:
        ap.error("give --batch, --ids or --regenerate")
    wanted = list(dict.fromkeys(wanted))

    for i in wanted:
        if i not in cards:
            sys.exit("Unknown card id: %s" % i)
        if not cards[i]["description"].strip():
            sys.exit("%s has no Image description in story.md." % i)

    plan = {}
    for prov in providers:
        todo = [i for i in wanted if i in forced or not S.final_path(prov, i).exists()]
        skipped = [i for i in wanted if i not in todo]
        if skipped:
            print("%s: already made, skipping (use --regenerate to redo): %s" % (PROVIDERS[prov].LABEL, ", ".join(skipped)))
        if todo:
            plan[prov] = todo
    if not plan:
        print("Nothing to generate.")
        return

    total = 0
    for prov, todo in plan.items():
        p = PROVIDERS[prov]
        if a.dry_run:
            for i in todo:
                print("\n===== %s / %s  (%s)\n%s" % (p.LABEL, i, S.position(cards[i]), S.build_prompt(cards[i], style, prov)))
        each = S.estimate_per_image(prov)
        total += each * len(todo)
        how = "framed with the tarot frame" if p.FRAMED else "its own border, no frame"
        print("\n%s: %s, %s, %s." % (p.LABEL, p.MODEL, ", ".join("%s %s" % (k, v) for k, v in p.SETTINGS.items()
                                                                  if k != "model" and v), how))
        print("  Images to make: %d  (%s)" % (len(todo), ", ".join(todo)))
        print("  Estimated cost: about $%.2f  (~$%.3f each)" % (each * len(todo), each))
        if len(todo) > S.MAX_IMAGES_PER_RUN:
            sys.exit("That is more than MAX_IMAGES_PER_RUN (%d) for %s. Stopping. Change the setting in studio.py "
                     "to allow it." % (S.MAX_IMAGES_PER_RUN, p.LABEL))
    if len(plan) > 1:
        print("\nTotal estimate: about $%.2f" % total)
    if a.dry_run:
        print("Dry run: nothing sent.")
        return
    n_all = sum(len(t) for t in plan.values())
    if input("Generate these %d images? Type yes to continue: " % n_all).strip().lower() != "yes":
        print("Cancelled. Nothing sent.")
        return

    started = S.now()
    for prov, todo in plan.items():
        p = PROVIDERS[prov]
        client = S.make_client(prov)
        ok = 0
        print("\n%s" % p.LABEL)
        for n, i in enumerate(todo, 1):
            print("[%d/%d] %s" % (n, len(todo), i))
            ok += S.generate_one(prov, client, cards[i], style, frame)
        cost = S.spent(prov, since=started)
        print("%s: %d of %d made, about $%.2f (from the API's usage)." % (p.LABEL, ok, len(todo), cost))
    print("\nLogged to image-studio/log.jsonl. Review: python image-studio/review.py, then open http://localhost:8765")


if __name__ == "__main__":
    main()
