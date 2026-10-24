# v4 images addendum: compare OpenAI and Nano Banana on batch 1

Apply this together with `v4-images.md`. Where they disagree, this file wins.

Levi wants to generate **batch 1 (the same 14 cards) with two image services** and compare them before choosing one for the rest of the deck. Batch 2 waits until he has chosen.

## Two providers

- Add a `--provider` option to `generate.py`, with the values `openai` (the default), `nanobanana` and `both`.
- Put each provider in its own small module, so the prompt building, cropping, resizing, framing and logging code is shared, and only the API call is different.
- Both providers get the same scene and style guide, but they differ in one way:
  - **OpenAI:** the scene, the full-bleed block and the style guide, with Levi's tarot frame laid on top, as in `v4-images.md`.
  - **Nano Banana:** **no tarot frame and no full-bleed block.** Instead, the model draws its own simple border as part of the image (see the prompt below).

## Nano Banana (Google Gemini API)

- **Key:** `GEMINI_API_KEY` in the same `image-studio/.env`, next to `OPENAI_API_KEY`. The same rules apply: it is never printed, logged, committed or sent to a browser.
- **Package:** the official `google-genai` Python package (`pip install google-genai`).
- **Model:** check Google's image generation docs for the current model id. At the time of writing they recommend `gemini-nano-banana-2.1`. Keep the id in one setting.
- **Size:** this model supports **9:16 natively**, so ask for `aspect_ratio` 9:16 directly, with no crop. Use `image_size` "2K" (an uppercase K is required). Check that every image comes back at exactly 9:16. If one doesn't, log it and flag it in the review page rather than stretching it.
- **No framing step.** Do not lay `tarot_card_frame.png` over Nano Banana images, and don't resize them to the frame. Save the image as it comes back (converted to PNG).
- **Prompt:** the scene, then this border block word for word, then the style guide word for word, joined by blank lines:

  > BORDER: The image is a 9:16 vertical tarot card. Surround the illustration with one simple, plain border of the same thickness on all four sides, about 3% of the image width, in a single flat ink color with a thin inner line. Keep the border identical on every card: no ornaments, corner decorations, title banner, number, text or lettering in it. The illustration fills everything inside the border.

  If borders keep coming out uneven between cards, tell Levi. Don't fix it by drawing a border in code unless he asks.
- **Price:** about $0.05 per 2K image at the time of writing. Show the estimate and ask for confirmation before generating, the same as for OpenAI. The image limit per run (16) applies to each provider separately.
- Google adds an invisible SynthID watermark to every image. Nothing needs to be done about it.

## Files and the log

- Keep the outputs separate: `out/openai/scenes/` and `out/openai/framed/` for OpenAI, and `out/nanobanana/cards/` for Nano Banana.
- Add a `provider` field to every log entry.

## Comparing in the review page

- Add a **Compare** view that shows the two versions of each card side by side at the same height (the framed OpenAI card and the bordered Nano Banana card), with the headline below. Hide which provider made which, labeling them **A** and **B** in a random order for each card, so Levi judges the images and not the name. **Reveal** shows which is which.
- For each card, Levi can pick **A**, **B**, **Both good** or **Neither**, and add a comment and the usual tags.
- After all 14, show a summary: how many cards each provider won, the most common tags for each, and the cost of each.

## After the comparison

- Levi chooses a provider (or keeps both for different kinds of cards). Make that the default in `generate.py`, and only then move on to batch 2.
- Either provider's approved images can go into the game, as described in `v4-images.md` §8.
