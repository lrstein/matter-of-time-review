# Morning report: ready for launch

Good morning. No API key was ever committed. The repo is on GitHub (private), `main` shows only "coming soon", and the game is on `launch` in the new layout with placeholder card fronts. Nothing is live, and no paid API was called.

## What I did

1. **Committed v6.0 to v6.1** as it was (`f31fd84`).
2. **Security.** I searched every commit in the history for `.env` files, for the exact values of both keys in `image-studio/.env` (OPENAI_API_KEY, GEMINI_API_KEY) and for common key patterns (sk-, AIza, ghp_/gho_, AKIA, Slack tokens, private keys). Nothing turned up. `.gitignore` now also covers `.env.*`, `*.env` and `image-studio/.env` by name.
3. **GitHub.** I created `https://github.com/lrstein/a-matter-of-time` (private).
   - `main` is one commit with only `site/index.html` ("A Matter of Time, coming soon").
   - `launch` has the whole history and already contains main's commit, so operation spirit rain is a clean fast-forward.
4. **New layout** (files moved with `git mv`, nothing deleted):
   - `site/`: what the live site serves, and only that (10 files, 1.6 MB).
   - `tools/`: the checks, the play-test, the local server and `start.command`.
   - `image-studio/`: unchanged except for the new `published/` folder (below).
   - `docs/`: DECISIONS, the roadmap, path-audit, your review documents and the two docs that used to be nested CLAUDE.md files.
   - `archive/`: the old briefs, archived content, early art and the v5 morning report.
5. **Placeholder fronts.**
   - Every card front (Scenarios, Events, Futures) now shows the CSS placeholder face. The card back is unchanged.
   - The 14 generated fronts are in `image-studio/published/`.
   - Each of those cards keeps its path as `**Archived image:** images/cards/<id>.webp` under an empty `**Image:**`.
   - To bring the art back, move the files into `site/images/cards/` and copy each path back into Image (CLAUDE.md, Cards).
6. **The launch rule** is in CLAUDE.md, word for word.

## Test results

- **`node tools/check-story.js`:** no problems, no chronology, style or ungrounded-flag problems, and every "never" check clean. Every card, Event, milestone and Future still appears.
- **Play-test, 200 desktop games with the new `--placeholders` check:** **200 passed, 0 failures** (31 min). 13 Futures were reached, plus 13 tipping points, 10 agents eras and 9 Vienna pauses.
  - The first attempt failed every game because of my new check. It counted the Futures collection's empty frame as a card front that wasn't the placeholder. I fixed the check (it now skips faces that haven't been drawn), not the game, and the rerun is the 200/200 above.
- **One full game served by a plain `python3 -m http.server --directory site`** (seed 4: a tipping point, Overgrowth): passed, with no console errors and no missing files (the server log shows no 404 from the game). Every front was the placeholder and every back the real card back; I looked through the 14 screenshots.
- **Nothing private in `site/`:** on that server, `/image-studio/.env`, `/.env`, `/.gitignore`, `/tools/serve.py`, `/docs/DECISIONS.md`, `/archive/`, `/CLAUDE.md`, `/package.json` and an archived card image (`/images/cards/r1-lab.webp`) all return 404. `node tools/build.js` passes: 10 files, 1.6 MB.

## Things you should know

- **`site/404.html` is new, and it matters.** Without it, Cloudflare Pages treats the site as a single-page app: every unknown path, `/image-studio/.env` included, would get the game with a 200 instead of a 404.
- **There's no build step.** Cloudflare publishes `site/` as it is. Its build command, `node tools/build.js`, only checks `site/`: if anything private is in it, or a needed file is missing, the deploy fails instead of going out. `dist/` isn't used anymore. Your local copy is still there, ignored by git, and safe to delete.
- **To play locally,** double-click `tools/start.command` (it moved). It serves `site/` only.
- **The play-test** now plays `site/` by default. It has two new options: `--base URL` plays against a server that's already running (it can also play levirain.com itself), and `--placeholders` fails any card front that shows an image.
- **`content/CLAUDE.md` and `js/CLAUDE.md` are now `docs/content.md` and `docs/engine.md`,** so they don't end up on the live site. The root CLAUDE.md tells me to read them before editing.
- **Pushed:** `main` (the placeholder), and `launch` with its tags. Nothing else goes to `main` until you say the words.
- **Two leftovers from yesterday's session.** A 1,000-game run from before tonight finished while I worked. It was playing the old layout, so once I moved the files its last games failed on loading with 404s. Ignore it: tonight's 200 games are the run for this build. Also, an old `tools/serve.py` (PID 71882, started yesterday at 8:46 pm) is still running on port 8123 with the old code, serving the repo root. It's localhost-only and still refuses `image-studio/` and hidden files, but you can stop it with `kill 71882`.
- **Text highlighted in the reveal screenshot** comes from the harness, which double-clicks buttons on purpose. It isn't a game bug.

## What to do in the morning

1. **Check levirain.com's nameservers.** In the Cloudflare dashboard, levirain.com must be a site on your account with status **Active**. If it's registered somewhere else, add it to Cloudflare (Add a domain), switch the nameservers at your registrar to the two Cloudflare gives you, and wait for Active (minutes to a few hours).
2. **Connect the repo.** Cloudflare dashboard → **Workers & Pages** → **Create** → the **Pages** tab → **Connect to Git** (if you only see a Workers form, look for the link "Looking to deploy Pages? Get started"). Choose GitHub. When GitHub asks, give access to **only** `a-matter-of-time`. Pick `lrstein/a-matter-of-time` → **Begin setup**.
3. **Enter these settings:**
   - Project name: `a-matter-of-time`
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: `node tools/build.js`
   - Build output directory: `site`
   - Root directory: leave blank
   - Environment variables: none

   Then **Save and Deploy**.
4. **Check the first deploy.** Open the `a-matter-of-time.pages.dev` link it gives you. It should say "A Matter of Time, coming soon".
5. **Stop previews of `launch`.** In the project, **Settings → Builds** (or Builds & deployments) → **Branch control** → Preview branches: **None**, then save. Otherwise every push to `launch` would be public at a pages.dev preview address.
6. **Add the domain.** In the project, **Custom domains** → **Set up a custom domain** → `levirain.com` → **Activate domain**. Do the same for `www.levirain.com` if you want it. Wait until both say **Active**.
7. **Say "run operation spirit rain".**
