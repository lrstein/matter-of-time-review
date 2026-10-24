"""OpenAI Image API. The scene is drawn to the frame window's shape; Levi's frame goes on top."""
import base64
import io

from PIL import Image

NAME = "openai"
LABEL = "OpenAI"
KEY_NAME = "OPENAI_API_KEY"
MODEL = "gpt-image-2.5-flare"
QUALITY = "medium"            # medium while the look is worked out, then "high"
SIZE = "944x2000"             # the frame window's shape (0.472); sides multiples of 16 (API rule)
FRAMED = True
SETTINGS = {"model": MODEL, "size": SIZE, "quality": QUALITY}

PRICE_OUTPUT_IMAGE = 30.00 / 1e6
PRICE_INPUT_TEXT = 5.00 / 1e6

FULL_BLEED = (
    "COMPOSITION: This is a full-bleed scene that fills the entire image from edge to edge. "
    "Do not draw any border, frame, margin, panel, card outline, title banner, rounded corners, text, "
    "numbers or lettering anywhere in the image. A decorative frame will be added on top later, so keep "
    "the main subject, faces and important objects well inside the image, away from all four edges, and "
    "let the background (sky, ground, landscape or room) continue all the way to the very edges."
)


def prompt_block(year=2027):
    return FULL_BLEED


def table_estimate():
    # Measured on batch 1 at medium: about $0.010 to $0.012 per image.
    return 0.012


def make_client(key):
    from openai import OpenAI
    return OpenAI(api_key=key)


def call(client, prompt, ref_img=None):
    from openai import BadRequestError
    from . import Refused, Rejected
    if ref_img is not None:
        raise Rejected("Starting from a previous image isn't set up for OpenAI.")
    try:
        result = client.images.generate(model=MODEL, prompt=prompt, size=SIZE, quality=QUALITY, n=1)
    except BadRequestError as e:
        body = getattr(e, "body", None)
        body = body if isinstance(body, dict) else {}
        if body.get("code") == "moderation_blocked" or "safety" in str(e).lower() or "moderation" in str(e).lower():
            raise Refused(str(e), body.get("moderation_details"))
        raise Rejected(str(e))
    img = Image.open(io.BytesIO(base64.b64decode(result.data[0].b64_json)))
    usage = result.usage.model_dump() if getattr(result, "usage", None) else None
    return img, usage, cost(usage)


def cost(usage):
    if not usage:
        return None
    det = usage.get("input_tokens_details") or {}
    return round(usage.get("output_tokens", 0) * PRICE_OUTPUT_IMAGE
                 + det.get("text_tokens", usage.get("input_tokens", 0)) * PRICE_INPUT_TEXT, 4)
