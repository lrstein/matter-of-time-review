# A Matter of Time — v4 images (part 1)

Generate the first card images through the OpenAI Image API, frame them with Levi's tarot frame, and give Levi a private place to review them. **Where this file and `CLAUDE.md` disagree, this file wins.** Do this after v3.6 is finished and its play-tests pass.

> Thank you again for the great work on this game. Images are the moment it starts to look like a real deck, so go slowly here. Show Levi results early and keep every step easy to undo.

## Scope: 30 images, in two batches

This version generates **30 images only**, so Levi can review each one by hand.

- **Batch 1 (14 images):** the 5 opening cards and Story 1 of each of the 9 Futures. This batch sets the look of the deck.
  - Openers: `r1-lab`, `r1-trucks`, `r1-election`, `r1-flaw`, `r1-tutor`
  - Futures: Story 1 of garden, partnership, upload, escape, gilded_few, last_war, blackout, oracle and long_middle
- **Batch 2 (16 images),** only after Levi has reviewed batch 1 and the prompts have been revised from his feedback. These cover documentary scenes, symbolic scenes and scenes where the setting is the subject:
  - `r2-clinics`, `r2-glasses`, `r2-datacenter`, `r2-deepfake`, `r2-robots`
  - `r3-upload`, `r3-drones`, `r3-companions`, `r3-finland`, `r3-nobel`, `r3-worlds`
  - `r4-shutdown`, `r4-rogue`, `r4-cancer`, `r4-twocities`, `r4-virtual`

Nothing beyond these 30 is generated in this version.

## 1. Folder and API key (security first)

- Put all of this in a new folder, **`image-studio/`**, at the project root. It is a tool for Levi only and is **never shipped** with the game. Nothing in the game's pages may link to it or load from it.
- The API key lives in **`image-studio/.env`** as `OPENAI_API_KEY=...`. Add `.env` to `.gitignore` before anything else, and check that it's ignored.
- **The key must never reach a browser.** Only a local Python script (or a small local Python server) calls the API. The review page talks to that local server, never to OpenAI directly.
- Never print the key, log it or write it into any other file.
- Use the official `openai` Python package (`pip install openai python-dotenv pillow`).

## 2. Building each prompt

Each prompt has three parts, joined by blank lines, in this order:

1. **The scene:** the card's `Image description` from `content/story.md`.
2. **The full-bleed block,** word for word:

   > COMPOSITION: This is a full-bleed scene that fills the entire 9:16 image from edge to edge. Do not draw any border, frame, margin, panel, card outline, title banner, rounded corners, text, numbers or lettering anywhere in the image. A decorative frame will be added on top later, so keep the main subject, faces and important objects well inside the image, away from all four edges, and let the background (sky, ground, landscape or room) continue all the way to the very edges.

3. **The style guide:** the text under `**Style guide:**` in the IMAGE STYLE GUIDE section of `content/story.md`, **word for word**. Read it from the file each time, don't copy it into code, so that when Levi edits it every new prompt uses the new version.

Save the exact prompt sent for every image in the log (§5).

### Check the descriptions first

Before batch 1, read the descriptions for the 14 batch-1 cards against the guidance notes at the top of the IMAGE STYLE GUIDE section (the setting can be the subject; make it clear when a scene is in the future; scenarios are often documentary; a Future image is one moment from that story's day). If a description breaks one of these, propose a rewrite. **Show Levi every proposed rewrite (old and new, side by side) and only change `story.md` once he approves.** Do the same for batch 2 before generating it.

## 3. Size: the scene must be 9:16

The frame (`tarot_card_frame.png`, from Levi) is 9:16, so every scene must be exactly 9:16 too.

- **Model:** check OpenAI's image generation docs for the current model names and pick the best quality one for illustration. At the time of writing they list `gpt-image-2.5-flare` (fast, everyday) and `gpt-image-2.5-sunburst` (best for precise edits). Start with `gpt-image-2.5-flare`. Keep the model name in one setting so it's easy to change.
- **Size:** check which sizes the model accepts.
  - If it accepts a 9:16 size (or custom sizes), ask for 9:16 directly at the closest supported resolution to the frame's size.
  - If its tallest option is 2:3 (for example 1024 × 1536), generate at that size and **center-crop to 9:16** (1024 × 1536 becomes 864 × 1536, cutting 80 pixels from each side). The full-bleed block already keeps subjects away from the sides, which protects them from this crop.
- Then resize the scene to **exactly the frame's pixel size** with high-quality resampling.
- Save the unframed scene too, so the frame can be changed later without paying to generate again.

## 4. Framing

1. Load `tarot_card_frame.png` (Levi will put it in `image-studio/frame/`). **Before anything else, check that it is 9:16 and has a transparent window in the middle.** If it isn't 9:16, or has no transparency, stop and tell Levi. Don't stretch it or guess.
2. **Measure the safe area** from the frame itself: the largest rectangle in the middle where the frame is fully transparent. Report its size and border thickness in pixels to Levi. If the frame's outer corners are transparent (rounded card corners), note that too.
3. Lay the frame on top of the resized scene (alpha composite, frame on top) and save as PNG.
4. If the frame has rounded, transparent outer corners, the game no longer needs its own CSS corner rounding on framed cards. Turn it off for those cards only, and check they still look right on the card flip.

### Where files go

```
image-studio/
  .env                  (ignored by git)
  frame/tarot_card_frame.png
  out/scenes/<id>.png   (unframed, after crop and resize)
  out/framed/<id>.png   (with frame)
  out/history/          (older versions after a regenerate, never deleted)
  log.jsonl
```

Future stories use ids like `future-garden-1`.

## 5. Generating: careful with money

- `python image-studio/generate.py --batch 1` generates batch 1. Also support `--ids r1-lab,r1-tutor` for single cards and `--regenerate <id>`.
- **Before calling the API,** print how many images will be made and an estimated cost from OpenAI's current pricing, then **ask for confirmation** in the terminal.
- Add a hard limit (`MAX_IMAGES_PER_RUN = 16`) that can't be passed without changing the setting.
- Use the medium quality setting for batch 1 while the look is still being worked out, and high quality once Levi is happy with it. Keep quality as a setting.
- Run one request at a time, retry a failed request at most twice with a pause, and never retry a request that was refused for content reasons. Log it instead.
- **Every attempt is logged** in `log.jsonl`: id, time, model, size, quality, the full prompt, the file paths, any error, and later Levi's decision, tags and comment.

## 6. The private review page

A local page for Levi only, served by a small Python server in `image-studio/` (`python image-studio/review.py`, then open `http://localhost:8765`). It must only listen on localhost.

**For each image it shows:**
- the framed card at full height, the headline under it, and the scene prompt (collapsed by default)
- the card's position in the game (for example "Round 1 opener" or "Future: The Garden, Story 1")

**Controls:**
- **Approve**, **Deny** and **Regenerate**
- a comment box
- one-click tags: *too realistic*, *too cluttered*, *border appeared*, *text appeared*, *subject too close to edge*, *doesn't feel like the future*, *wrong subject*, *love this*

Regenerate asks for confirmation and goes through the same budget checks as §5. The old image moves to `out/history/`, and both versions can be compared side by side.

**A filter** shows all images, still to review, approved or denied, and a counter shows how many of the 30 are approved.

Everything is saved to `log.jsonl` straight away, so nothing is lost if the page closes.

## 7. After each batch

1. Summarize the log for Levi: approvals, denials, the most common tags and his comments.
2. Propose changes based on it, either to individual descriptions, or a change to the full-bleed block if borders or text keep appearing. **Never change the style guide text yourself.** If you think it needs changing, suggest it to Levi.
3. Optional: check whether the API can take reference images (OpenAI's edits endpoint or the Responses API image tool). If it can, try passing 2 or 3 approved cards with new prompts to keep the deck consistent. Test it on one or two cards first and show Levi before using it for a whole batch.

## 8. Putting approved images into the game

- When Levi approves an image, copy the framed PNG to `images/cards/<id>.png`. Ask him before filling in that card's `**Image:**` field in `story.md`.
- Cards with an image show it on the front. Every other card keeps the current placeholder, so the game always works with a mix of both.
- Compress the game copies (for example to high-quality WebP or optimized PNG) so the game stays fast, and keep the full-size originals in `image-studio/`.
- Run the v3.6 play-test harness again afterwards. Cards with and without images must both pass.

## Done when

- The API key is only in an ignored `.env` file and never reaches a browser.
- Batch 1 (14 images) is generated at 9:16, full bleed and framed, and Levi has reviewed it in the review page.
- Batch 2 is generated only after his feedback has been worked into the prompts.
- Approved images appear in the game, and the play-tests still pass.
- `CLAUDE.md` explains how to use `image-studio/` and states that it is never shipped.
