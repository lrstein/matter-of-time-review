"""Google Gemini API (Nano Banana). 9:16 natively. The model draws edge to edge, and
studio.add_border() adds the same #ebdabc border to every card (Levi's choice, replacing the
addendum's model-drawn border, which came out in a different color on every card)."""
import io

from PIL import Image

NAME = "nanobanana"
LABEL = "Nano Banana"
KEY_NAME = "GEMINI_API_KEY"
MODEL = "gemini-nano-banana-2.1"
ASPECT = "9:16"
IMAGE_SIZE = "2K"             # uppercase K is required
FRAMED = False
SETTINGS = {"model": MODEL, "size": ASPECT + " " + IMAGE_SIZE, "quality": None}

# Google's price list: $30 per 1M image output tokens (a 2K image is 1,680 tokens, $0.0504),
# $7.50 per 1M text and thinking output tokens (thinking is billed), $1.50 per 1M input tokens.
# A 2K 9:16 card comes back 1536 x 2752 and costs about $0.065 with its thinking.
PRICE_OUTPUT = 30.00 / 1e6
PRICE_TEXT_OUT = 7.50 / 1e6
PRICE_INPUT = 1.50 / 1e6

COMPOSITION = (
    "COMPOSITION: This is a 9:16 vertical tarot card illustration that fills the entire image from edge "
    "to edge, like a picture cropped out of a larger scene: the sky, ground, walls and background run "
    "straight off all four edges. Do not draw any border, frame, margin, paper edge, blank strip, inner "
    "frame line, panel, card outline, title banner, text, numbers or lettering anywhere in the image. "
    "A border is added around it later, so keep faces and important objects a little away from the very edges."
)
SNAPSHOT = (
    "SETTING: This is a snapshot of ordinary life in {year}, an everyday moment caught as it happens, "
    "not a staged poster or a science fiction scene. {era} Draw the people, clothes, phones, cars, "
    "buildings and rooms of that year, kept simple. Robots and machines, where the scene has them, "
    "look plain and practical, never steampunk, brass, clockwork or Victorian. The drawing style is "
    "the style guide's, the same on every card; only the world in it belongs to {year}."
)
# How far the world in the picture has moved from today, by the card's year (the IMAGE STYLE GUIDE's
# notes in story.md: 2027 to about 2031 looks like today, change comes gradually, 2060 is still our world).
ERAS = [
    (2031, "It looks like today, the mid-2020s: nothing futuristic, no glowing panels, holograms or "
           "sleek concept designs."),
    (2045, "It still looks mostly like today. Only the few new things the scene names are new, and they "
           "are worked into ordinary surroundings: no glowing panels, holograms or sleek concept designs."),
    (9999, "It is decades from now and still recognizably our world. New technology is ordinary and taken "
           "for granted, never glossy science fiction."),
]


def era(year):
    return next(text for last, text in ERAS if year <= last)


CRAFT = (
    "ANATOMY AND LOGIC: Draw every person and creature with correct anatomy: two arms, two hands with five "
    "fingers each, two legs, one head, no extra, missing, merged or floating limbs. Every hand holds its "
    "object convincingly. Draw exactly the people the style guide keeps from the scene. "
    "Objects keep consistent size, perspective and position, and nothing passes through anything else."
)


def prompt_block(year=2027):
    return COMPOSITION + "\n\n" + SNAPSHOT.format(year=year, era=era(year)) + "\n\n" + CRAFT


def table_estimate():
    return 0.066


def make_client(key):
    from google import genai
    return genai.Client(api_key=key)


def call(client, prompt, ref_img=None):
    """ref_img: a PIL image to revise (the card's previous version), a list of style
    reference images, or None."""
    from google.genai import errors, types
    from . import Refused, Rejected
    try:
        resp = client.models.generate_content(
            model=MODEL, contents=[prompt] + (ref_img if isinstance(ref_img, list) else [ref_img])
            if ref_img is not None else prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE"],
                image_config=types.ImageConfig(aspect_ratio=ASPECT, image_size=IMAGE_SIZE)))
    except errors.ClientError as e:            # 4xx: a bad request won't improve on retry
        if getattr(e, "code", None) == 429:
            raise                               # rate limit: worth a retry
        raise Rejected(str(e))

    usage = resp.usage_metadata.model_dump(exclude_none=True) if resp.usage_metadata else None
    feedback = resp.prompt_feedback
    if feedback and feedback.block_reason:
        raise Refused("Prompt blocked: %s" % feedback.block_reason, feedback.model_dump(exclude_none=True))
    cand = (resp.candidates or [None])[0]
    data = None
    for part in ((cand.content.parts if cand and cand.content else None) or []):
        if part.inline_data and part.inline_data.data:
            data = part.inline_data.data
    if data is None:
        reason = str(cand.finish_reason) if cand and cand.finish_reason else "no image returned"
        details = {"finish_reason": reason,
                   "safety": [r.model_dump(exclude_none=True) for r in (cand.safety_ratings or [])] if cand else None}
        if any(w in reason.upper() for w in ("SAFETY", "PROHIBITED", "BLOCK", "IMAGE_OTHER", "RECITATION")):
            raise Refused("No image: %s" % reason, details)
        raise Exception("No image in the response (%s)" % reason)
    img = Image.open(io.BytesIO(data))
    img.load()
    return img, usage, cost(usage)


def cost(usage):
    if not usage:
        return None
    # Image tokens at the image rate; any other output (text) and thinking tokens at the text rate.
    image = sum(d.get("token_count", 0) for d in usage.get("candidates_tokens_details") or []
                if str(d.get("modality", "")).upper().endswith("IMAGE"))
    text = usage.get("candidates_token_count", 0) - image + usage.get("thoughts_token_count", 0)
    return round(image * PRICE_OUTPUT + text * PRICE_TEXT_OUT
                 + usage.get("prompt_token_count", 0) * PRICE_INPUT, 4)
