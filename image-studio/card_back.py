"""Generate options for the card back: one design shared by every card in the deck.

  python image-studio/card_back.py --options 3          (makes card-back-1 … card-back-3)
  python image-studio/card_back.py --void               (makes card-back-4 … card-back-8)
  python image-studio/card_back.py --hourglass          (makes card-back-9 … card-back-13)
  python image-studio/card_back.py --geometric          (makes card-back-14 … card-back-18)
  python image-studio/card_back.py --minimal            (makes card-back-19 … card-back-23)
  python image-studio/card_back.py --solo               (makes card-back-24)
  python image-studio/card_back.py --install 2          (puts option 2 into the game)

Uses the default provider (Nano Banana), Levi's border frame and the style guide, like the
fronts, but with its own prompt, because the back carries the title.
Options land in out/nanobanana/cards/card-back-<N>.png.

The --void set (options 4 to 8) is a second round: five different prompts, each after a real
tarot back, with no title, no border frame and only a few colors (since archived).

The --hourglass set (options 9 to 13) is Levi's brief after those: a #191B21 card, details in
#ece0cb, an hourglass whose sand turns to pixels, and branches behind it growing into a circuit
schematic. Five takes on the one brief, again with no title and no border frame.

The --geometric set (options 14 to 18) keeps that brief but in a simplified, geometric,
kaleidoscopic line style, after Levi's reference (reference/card-back-style.png, sent with each
prompt as a style reference). The hourglass is the center, with the branches around it, never
behind it. This set replaces the story's hand-drawn style guide with its own.

The --minimal set (options 19 to 23) is the same again with less in it ("less is more"), sent
with both of Levi's references (reference/card-back-style.png and card-back-style-2.png).

The --solo option (24) is just the hourglass from option 12, larger, in the card fronts' style,
on the plain #191B21 card with simple frame border art (drawn by the model, so the painted
border check is off for it). Option 12's raw image (reference/card-back-12-hourglass.png) is
sent as the reference for the hourglass.
"""
import argparse
import sys

from PIL import Image

import studio as S

TITLE = "A Matter Of Time"

DESCRIPTION = (
    "The back of a tarot card for a deck called " + TITLE + ", the same design on every card. "
    "A symmetrical, centered emblem. In the middle stands a tall, elegant hourglass. The left half of "
    "the design is nature: leafy vines, ferns, wildflowers, twisting roots, a crescent moon and a small "
    "bird, in warm greens, ochres and cream. The right half is digital: the same shapes rebuilt as clean "
    "circuit traces, glowing nodes, fine grid lines and small pixel blocks, in deep blue with a soft cyan "
    "glow, sleek and precise. The two halves mirror each other and meet along the vertical center line, "
    "where a vine turns into a circuit trace. Inside the hourglass, the upper bulb holds dark soil and "
    "seeds, and what falls into the lower bulb is a stream of tiny glowing pixels. Near the bottom, on a "
    "simple ribbon banner, the title is lettered by hand in elegant capitals, spelled exactly: "
    + TITLE + "."
)

BLOCK = (
    "COMPOSITION: This is a 9:16 vertical tarot card back that fills the entire image from edge to edge, "
    "with the background pattern running straight off all four edges. Do not draw any border, frame, "
    "margin, paper edge, inner frame line or card outline; a border is added around it later, so keep the "
    "emblem and the title a little away from the very edges. The only text anywhere in the image is the "
    "title, " + TITLE + ", spelled exactly like that, once. No other letters, numbers or symbols that look "
    "like writing.\n\n"
    "ANATOMY AND LOGIC: The bird has correct anatomy. The hourglass is symmetrical, with two bulbs joined "
    "at a narrow neck, and nothing passes through anything else."
)


# The --void set: one prompt per option, each modeled on a real tarot back. They share PALETTE
# and VOID_BLOCK, and they get no border frame.
PALETTE = (
    "Use only three colors: a deep blue-black ground, a soft bone cream for the linework and motifs, "
    "and one muted accent of faded sage green used sparingly. No other colors."
)

VOID_BACKS = [
    # After the Rider-Waite back: an allover lattice.
    "The back of a tarot card, modeled on the classic Rider-Waite card back: a quiet allover pattern of a "
    "small repeating diamond lattice that covers the whole card. Each diamond cell holds one tiny seed. "
    "Toward the middle of the card the seeds slowly become small square pixels and the lattice lines "
    "become thin circuit traces with tiny round nodes at the crossings. In the very center the pattern "
    "opens onto an empty oval of plain deep blue-black, a calm void with nothing in it. The design is "
    "reversible: it looks the same upside down.",
    # After the Thoth back: a single central rosette.
    "The back of a tarot card, modeled on the Thoth tarot's card back: a single symmetrical rosette in "
    "the center of a wide, empty, deep blue-black field. The rosette is an open flower seen from above. "
    "Its inner petals are real petals with fine veins, and each ring of petals further out is drawn more "
    "and more as concentric circuit rings and tiny nodes, until the outermost ring is pure circuitry. The "
    "center of the flower is a small dark empty circle, like a pupil or a doorway. Lots of empty dark "
    "space around it. The design is reversible: it looks the same upside down.",
    # After Tarot de Marseille backs: a mirrored, reversible emblem.
    "The back of a tarot card, modeled on old Tarot de Marseille card backs with their mirrored, "
    "reversible designs. A slender tree stands in the center: its branches and leaves reach up into the "
    "top half of the card. The bottom half mirrors it exactly, but the reflection is its roots, drawn as "
    "branching circuit traces ending in small round nodes. Where trunk and roots meet, in the exact "
    "middle of the card, there is a small dark empty circle, a void the tree grows out of. Sparse dots "
    "scattered around on a deep blue-black field. Reads the same upside down.",
    # After star-field and celestial backs.
    "The back of a tarot card, modeled on celestial tarot card backs with their night skies. A vast, "
    "nearly empty deep blue-black sky. Down the vertical center line, five small moons show the phases "
    "from crescent to full to crescent. A few constellations are drawn around them, and their stars are "
    "linked by thin straight circuit traces with tiny square nodes, like a diagram of a network. A single "
    "fern frond curls in from the bottom center and a matching one hangs from the top center, so the "
    "design reads the same upside down. Calm, sparse and spacious.",
    # After emblem backs with a single symbolic creature.
    "The back of a tarot card, modeled on old emblematic card backs built around a single symbolic "
    "creature. In the center, a large moth seen from directly above, wings spread, perfectly symmetrical. "
    "The patterns on its wings are drawn as fine circuit traces and tiny nodes, while its body, legs and "
    "feathered antennae are drawn naturally. Its antennae lean toward a small dark empty circle just "
    "above its head, as if it is curious about it. Behind it, a deep blue-black field with a sparse "
    "scatter of tiny dots, like dust in the dark. The moth has six legs and four wings.",
]

VOID_BLOCK = (
    "COMPOSITION: This is a 9:16 vertical tarot card back that fills the entire image from edge to edge. "
    "The deep blue-black ground runs straight off all four edges. Do not draw any border, frame, margin, "
    "paper edge, inner frame line, ornamental edge or card outline. Mostly empty dark space: the design "
    "is restrained, quiet and spacious, like looking into a void.\n\n"
    "TEXT: No text, letters, numbers, runes or symbols that look like writing anywhere in the image.\n\n"
    "COLOR: " + PALETTE + "\n\n"
    "MOOD: Mellow, inquisitive and a little mysterious. The natural and the digital are woven into one "
    "design, not fighting. Nothing glows brightly.\n\n"
    "This is a card back, so ignore any instruction below about a central figure or a landscape; the "
    "style below applies only to the drawing and printing."
)

VOID_FIRST = 4

# The --hourglass set: five takes on one brief. They share HOURGLASS_BLOCK.
BG = "a very dark blue-charcoal, hex #191B21"
INK = "a warm pale parchment cream, hex #ece0cb"

HOURGLASS_BACKS = [
    # A tree behind the hourglass, natural near the trunk and digital at the tips.
    "The back of a tarot card. In the center stands a tall, slender, symmetrical hourglass. In its upper "
    "bulb is fine sand; the thin stream falling through the neck breaks into tiny square pixels, and the "
    "lower bulb fills with a small pile of pixels. Behind the hourglass grows a large tree whose crown "
    "spreads symmetrically across the whole card. Near the trunk its branches are natural, twisting wood "
    "with a few small leaves; as they reach outward they straighten into right-angled circuit traces with "
    "small round solder nodes, so the outermost tips are a pure circuit schematic.",
    # Time flows upward: old wood at the bottom, schematic at the top.
    "The back of a tarot card. In the center stands a tall, slender, symmetrical hourglass. Sand in the "
    "upper bulb falls through the neck and turns into tiny square pixels that pile up in the lower bulb. "
    "Behind it, branches rise from the bottom of the card like a vine climbing through time: at the bottom "
    "they are old, gnarled, natural wood with leaves and buds; higher up they grow thinner and straighter; "
    "at the top of the card they have become a clean circuit schematic of traces, nodes and small chip "
    "pads. The change happens gradually, so you can follow a single branch from wood into circuitry.",
    # Branches grow out of the hourglass itself, in rings like growth rings.
    "The back of a tarot card. In the center stands a tall, slender, symmetrical hourglass, its sand in the "
    "upper bulb turning into tiny square pixels as it falls into the lower bulb. Branches grow outward from "
    "the hourglass's own top and base in every direction, in a radiating, symmetrical pattern that fills "
    "the card. Each branch is natural wood with small leaves close to the hourglass, then forks into finer "
    "and finer twigs that turn into circuit traces with nodes and right-angled bends further out, like "
    "growth rings of time: the further from the hourglass, the more digital.",
    # A round crown like a clock face, its outer ring a schematic.
    "The back of a tarot card. In the center stands a tall, slender, symmetrical hourglass. In the upper "
    "bulb is sand; as it falls through the neck it becomes tiny square pixels that collect in the lower "
    "bulb. Behind the hourglass, a tree's branches form a great round crown, like a clock face of "
    "branches. The inner branches are natural, with leaves and buds; the outer ring of the crown has grown "
    "into a circuit schematic, its traces running in concentric arcs and straight lines with nodes. Below "
    "the crown, a few roots spread toward the bottom, also turning into circuit traces as they go.",
    # Reversible, like a real tarot back: the same above and below.
    "The back of a tarot card, reversible like a real tarot back, so it reads the same upside down. In the "
    "center lies a tall, slender, symmetrical hourglass. In its upper bulb the sand is falling and becoming "
    "tiny square pixels in the lower bulb. Behind it, branches spread out from the center toward the top of "
    "the card and, mirrored exactly, toward the bottom. Close to the hourglass the branches are natural "
    "wood with small leaves and seed pods; they lengthen and straighten as they reach toward the top and "
    "bottom edges, where they have become a fine circuit schematic of traces, nodes and pads.",
]

HOURGLASS_BLOCK = (
    "COMPOSITION: This is a 9:16 vertical tarot card back with square corners, filling the entire image. "
    "The background is one flat color everywhere, " + BG + ". The design reaches nearly to the edges, but "
    "stops just short of them, leaving a narrow even margin of plain background color on all four sides, "
    "about 4% of the card's width. That margin is just empty background: do not draw any border line, "
    "frame, ornamental edge, paper edge, card outline or rounded corners.\n\n"
    "TEXT: No text, letters, numbers, runes or symbols that look like writing anywhere in the image.\n\n"
    "COLOR: Use exactly two colors: the background, " + BG + ", and every line and detail in " + INK + ". "
    "No other colors, no green, no blue glow.\n\n"
    "MOOD: The branches seem to be growing with time and becoming digital as they grow. Mellow, "
    "inquisitive, a little like looking into a deep dark void. Nothing glows brightly.\n\n"
    "ANATOMY AND LOGIC: The hourglass is symmetrical, with two bulbs joined at a narrow neck, and nothing "
    "passes through anything else.\n\n"
    "This is a card back, so ignore any instruction below about a central figure or a landscape; the "
    "style below applies only to the drawing and printing."
)

HOURGLASS_FIRST = 9

# The --geometric set: five kaleidoscopic takes. They share GEOMETRIC_BLOCK and the style reference.
STYLE_REF = S.STUDIO / "reference" / "card-back-style.png"

GEOMETRIC_BACKS = [
    # Radiating rays.
    "The back of a tarot card. The central element is a simple geometric hourglass inside a thin circle "
    "in the exact middle of the card. In its upper bulb, sand drawn as fine dots; falling through the neck "
    "the dots become tiny squares, and the lower bulb holds a small stepped pile of square pixels. Around "
    "the circle, eight identical branches radiate outward like rays, evenly spaced. Each branch forks in "
    "clean Y shapes with a few small leaf shapes near the circle, and further out its forks bend at 45 and "
    "90 degree angles into circuit traces ending in small round nodes.",
    # Six-fold, like a kaleidoscope.
    "The back of a tarot card. The central element is a simple geometric hourglass inside a thin hexagon "
    "in the middle of the card. Sand drawn as fine dots in the upper bulb becomes tiny square pixels as it "
    "falls, collecting in the lower bulb. Around the hexagon, six identical branch motifs are arranged "
    "with six-fold mirror symmetry, like the view through a kaleidoscope. Each motif starts as a stylized "
    "branch with small leaves next to the hexagon and grows outward into a geometric circuit pattern of "
    "straight traces, right angles and small nodes.",
    # Concentric rings, mirrored on both axes.
    "The back of a tarot card. The central element is a simple geometric hourglass in the middle of the "
    "card, framed by two thin concentric circles. In the upper bulb the sand is fine dots; it becomes tiny "
    "square pixels as it falls into the lower bulb. Around the circles, branches grow in the four "
    "diagonal directions, mirrored left to right and top to bottom. Close to the circles they are simple "
    "curving branches with a few leaves; further out they straighten into parallel circuit traces with "
    "nodes, following the outer circle in concentric arcs before running toward the corners.",
    # A mandala of branches.
    "The back of a tarot card. The central element is a simple geometric hourglass standing in the middle "
    "of the card inside a thin vertical diamond shape. Sand drawn as fine dots in the upper bulb turns into "
    "tiny square pixels as it falls into the lower bulb. Around the diamond, branches form a symmetrical "
    "mandala: rings of identical curling branch shapes repeat around the center, and each ring further "
    "out is more geometric than the last, until the outermost ring is made of circuit traces and nodes. "
    "A few small dots and tiny squares are scattered in the dark space between.",
    # A wreath, reversible.
    "The back of a tarot card, reversible so it reads the same upside down. The central element is a "
    "simple geometric hourglass in the middle of the card. Sand drawn as fine dots in the upper bulb "
    "becomes tiny square pixels as it falls into the lower bulb. Around the hourglass, two symmetrical "
    "branches form an open wreath, like a laurel, with simple leaf shapes; toward their tips the leaves "
    "become small squares and the stems become circuit traces with nodes. Above and below the wreath, "
    "vertical lines with small nodes extend toward the top and bottom edges, mirrored exactly.",
]

GEOMETRIC_BLOCK = (
    "COMPOSITION: This is a 9:16 vertical tarot card back with square corners, filling the entire image. "
    "The background is one flat color everywhere, " + BG + ". The hourglass is the central element. The "
    "branches surround it and never pass behind it or overlap it. The design reaches nearly to the edges "
    "but stops just short of them, leaving a narrow even margin of plain background on all four sides, "
    "about 4% of the card's width. That margin is just empty background: do not draw any border line, "
    "frame, corner ornament, card outline or rounded corners.\n\n"
    "TEXT: No text, letters, numbers, runes or symbols that look like writing anywhere in the image.\n\n"
    "COLOR: Use exactly two colors: the background, " + BG + ", and every line and detail in " + INK + ". "
    "No other colors, no shading, no gradients, no glow.\n\n"
    "STYLE: Simplified, flat line art, like a modern minimalist tarot card back. Thin lines of one even "
    "weight, clean geometric construction from circles, straight lines and arcs, strict symmetry, mostly "
    "open dark space. The design feels oddly geometric and kaleidoscopic. Mellow, inquisitive, a little "
    "like a void. No texture, no hand-drawn wobble, no realistic detail.\n\n"
    "ANATOMY AND LOGIC: The hourglass is symmetrical, with two bulbs joined at a narrow neck, and nothing "
    "passes through anything else."
)

GEOMETRIC_FIRST = 14

# The --minimal set: sparse takes, after both references. GEOMETRIC_BLOCK plus LESS.
STYLE_REFS = [STYLE_REF, S.STUDIO / "reference" / "card-back-style-2.png"]

MINIMAL_BACKS = [
    # Rays.
    "The back of a tarot card. In the exact middle, a simple geometric hourglass inside one thin circle. "
    "Sand drawn as fine dots in the upper bulb becomes tiny square pixels as it falls into the lower bulb. "
    "From the circle, thin straight rays radiate outward in all directions, evenly spaced. A few of the "
    "rays end in a tiny leaf bud, a few in a tiny round circuit node, and some bend once at a right angle "
    "like a circuit trace. Directly above and below the circle, on the vertical center line, a short "
    "column of three tiny symbols: a seed, a sprout, a small square.",
    # Two branches like parentheses.
    "The back of a tarot card. In the exact middle, a simple geometric hourglass inside one thin circle. "
    "Sand drawn as fine dots in the upper bulb becomes tiny square pixels as it falls into the lower bulb. "
    "Two slender branches, mirror images of each other, curve around the left and right of the circle "
    "like a pair of parentheses, each with three small leaves. At the top and bottom their tips turn into "
    "a single right-angled circuit trace ending in a small round node. A few tiny dots in the dark space. "
    "Nothing else.",
    # Four diagonal branches.
    "The back of a tarot card. In the exact middle, a simple geometric hourglass inside one thin circle. "
    "Sand drawn as fine dots in the upper bulb becomes tiny square pixels as it falls into the lower bulb. "
    "From the circle, four short branches reach toward the four corners, mirrored on both axes. Each "
    "forks once: one fork ends in a small leaf, the other bends at a right angle into a circuit trace "
    "ending in a node. On the vertical center line above and below the circle: a dot, a small square, a dot.",
    # Concentric rings.
    "The back of a tarot card. In the exact middle, a simple geometric hourglass inside one thin circle. "
    "Sand drawn as fine dots in the upper bulb becomes tiny square pixels as it falls into the lower bulb. "
    "Around it, two more thin concentric circles, widely spaced. Small leaves sit along the inner circle; "
    "small square pixels sit along the outer one, as if time is spreading outward and turning digital. "
    "Faint thin rays cross the space between the circles. A few tiny dots beyond.",
    # A column of growth, like the moon phases in the reference.
    "The back of a tarot card, reversible so it reads the same upside down. In the exact middle, a simple "
    "geometric hourglass inside one thin circle with thin rays around it. Sand drawn as fine dots in the "
    "upper bulb becomes tiny square pixels as it falls into the lower bulb. Above and below the circle, on "
    "the vertical center line, a column of small symbols shows growth turning digital, in the same order "
    "outward in both directions: a seed, a sprout, a small branch, a circuit node, a square pixel.",
]

LESS = (
    "\n\nLESS IS MORE: Keep the design very sparse and calm, with few elements and lots of empty dark "
    "space, like the reference images. One centered emblem with a few quiet supporting lines, never a "
    "busy pattern. Big, clear shapes that still read when the card is shown small."
)

MINIMAL_FIRST = 19

# The --solo option: option 12's hourglass alone, with a simple drawn frame.
SOLO_REF = S.STUDIO / "reference" / "card-back-12-hourglass.png"   # option 12, kept after it was archived
SOLO_NOTE = (
    "The attached image is a REFERENCE FOR THE HOURGLASS ONLY. Draw the hourglass the way it is drawn "
    "there: its turned posts and caps, its proportions, its ink style, and its sand falling as fine "
    "grains that become small square pixels piled in the lower bulb. Do not copy the tree, the roots, "
    "the circle or anything else around it."
)
SOLO_BACK = (
    "The back of a tarot card. The single central piece is a large hourglass standing in the middle of "
    "the card, about two thirds of the card's height. In its upper bulb is fine sand; as it falls through "
    "the narrow neck the grains turn into tiny square pixels, which pile up in the lower bulb as a small "
    "stepped heap of pixels. A moderate amount of detail: turned wooden posts, simple caps, a few "
    "highlights drawn as ink lines on the glass; not simplified to an icon, but not ornate either. "
    "Nothing else is around the hourglass: the rest of the card is plain empty background. Around the "
    "edge of the card is a simple frame border: a thin inner line set a little in from the edge, with "
    "small, simple ornaments at the four corners and at the middle of each side, drawn in the same cream "
    "ink. The ornaments quietly mix the natural and the digital, such as a small leaf sprig at one end "
    "and a tiny circuit node at the other. The design is symmetrical."
)
SOLO_BLOCK = (
    "COMPOSITION: This is a 9:16 vertical tarot card back with square corners, filling the entire image. "
    "The background is one flat color everywhere, " + BG + ", from the very edge inward, inside and "
    "outside the frame. Do not draw a paper edge, a card outline or rounded corners.\n\n"
    "TEXT: No text, letters, numbers, runes or symbols that look like writing anywhere in the image.\n\n"
    "COLOR: Use exactly two colors: the background, " + BG + ", and every line and detail in " + INK + ". "
    "No other colors, no glow.\n\n"
    "MOOD: Mellow, inquisitive, a little like looking into a dark void.\n\n"
    "ANATOMY AND LOGIC: The hourglass is symmetrical, with two bulbs joined at a narrow neck, and nothing "
    "passes through anything else.\n\n"
    "This is a card back, so ignore any instruction below about a setting, a landscape or symbolic imagery "
    "around the subject; the style below applies only to the drawing and printing."
)

SOLO_ID = 24


def card(cid):
    """The prompt for a card back option (review.py uses this to regenerate one)."""
    n = int(cid.split("-")[-1])
    if VOID_FIRST <= n < VOID_FIRST + len(VOID_BACKS):
        return {"id": cid, "description": VOID_BACKS[n - VOID_FIRST], "prompt_block": VOID_BLOCK, "border": False}
    if HOURGLASS_FIRST <= n < HOURGLASS_FIRST + len(HOURGLASS_BACKS):
        return {"id": cid, "description": HOURGLASS_BACKS[n - HOURGLASS_FIRST], "prompt_block": HOURGLASS_BLOCK,
                "border": False}
    if GEOMETRIC_FIRST <= n < GEOMETRIC_FIRST + len(GEOMETRIC_BACKS):
        return {"id": cid, "description": GEOMETRIC_BACKS[n - GEOMETRIC_FIRST], "prompt_block": GEOMETRIC_BLOCK,
                "border": False, "own_style": True, "style_ref": STYLE_REF}
    if n == SOLO_ID:
        return {"id": cid, "description": SOLO_BACK, "prompt_block": SOLO_BLOCK, "border": False,
                "frame_ok": True, "style_ref": SOLO_REF, "ref_note": SOLO_NOTE}
    if MINIMAL_FIRST <= n < MINIMAL_FIRST + len(MINIMAL_BACKS):
        return {"id": cid, "description": MINIMAL_BACKS[n - MINIMAL_FIRST], "prompt_block": GEOMETRIC_BLOCK + LESS,
                "border": False, "own_style": True, "style_ref": STYLE_REFS}
    return {"id": cid, "description": DESCRIPTION, "prompt_block": BLOCK}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--options", type=int, help="how many options to make (each about $0.07)")
    ap.add_argument("--void", action="store_true", help="make the five void options (4 to 8)")
    ap.add_argument("--hourglass", action="store_true", help="make the five hourglass options (9 to 13)")
    ap.add_argument("--geometric", action="store_true", help="make the five geometric options (14 to 18)")
    ap.add_argument("--minimal", action="store_true", help="make the five minimal options (19 to 23)")
    ap.add_argument("--solo", action="store_true", help="make the solo hourglass option (24)")
    ap.add_argument("--install", type=int, help="put option N into the game")
    a = ap.parse_args()
    prov = S.DEFAULT_PROVIDER

    if a.install:
        src = S.final_path(prov, "card-back-%d" % a.install)
        if not src.exists():
            sys.exit("No option %d" % a.install)
        out = S.SITE / "images" / "cards" / "card-back.webp"
        out.parent.mkdir(parents=True, exist_ok=True)
        Image.open(src).convert("RGB").resize((900, 1600), Image.LANCZOS).save(out, "WEBP", quality=90, method=6)
        S.log({"type": "publish", "provider": prov, "id": "card-back", "source": str(src.relative_to(S.STUDIO)),
               "game_file": out.relative_to(S.SITE).as_posix()})
        print("Installed option %d as %s" % (a.install, out.relative_to(S.PROJECT)))
        return

    if a.solo:
        nums = [SOLO_ID]
    elif a.minimal:
        nums = list(range(MINIMAL_FIRST, MINIMAL_FIRST + len(MINIMAL_BACKS)))
    elif a.geometric:
        nums = list(range(GEOMETRIC_FIRST, GEOMETRIC_FIRST + len(GEOMETRIC_BACKS)))
    elif a.hourglass:
        nums = list(range(HOURGLASS_FIRST, HOURGLASS_FIRST + len(HOURGLASS_BACKS)))
    elif a.void:
        nums = list(range(VOID_FIRST, VOID_FIRST + len(VOID_BACKS)))
    else:
        nums = list(range(1, (a.options or 3) + 1))
    n = len(nums)
    if n > S.MAX_IMAGES_PER_RUN:
        sys.exit("More than MAX_IMAGES_PER_RUN (%d)." % S.MAX_IMAGES_PER_RUN)
    style, _ = S.load_story()
    each = S.estimate_per_image(prov)
    print("Card back: %d option(s) with %s, about $%.2f (~$%.3f each)." % (n, prov, each * n, each))
    if input("Generate them? Type yes to continue: ").strip().lower() != "yes":
        print("Cancelled. Nothing sent.")
        return
    client = S.make_client(prov)
    for k, i in enumerate(nums, 1):
        c = card("card-back-%d" % i)
        print("[%d/%d] %s" % (k, n, c["id"]))
        S.generate_one(prov, client, c, style, S.load_frame())


if __name__ == "__main__":
    main()
