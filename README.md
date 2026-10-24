# A Matter of Time

A web game about AI and the future, played as a deck of tarot cards. It grew out of my curiosity and anxiety about our species’ future as AI expands. Users respond to imaginary global tech-related scenarios, shaping a speculative timeline. Over six rounds, from 2027 to 2053, each choice changes what the world looks like next, and the game ends with one of sixteen Futures, set in 2060.

## Running it locally

The game is a static site in `site/`. It loads its content with `fetch`, so it needs a local server rather than opening the file directly.

```
python3 tools/serve.py 8000
```

Then open http://localhost:8000. On a Mac you can also double-click `tools/start.command`.

To check the content after editing it, run `node tools/check-story.js`. The browser play-test needs Playwright (`npm install`, then `npx playwright install chromium`) and runs with `node tools/play-test.js`.

## How the engine works

Everything a player reads, and every number the game uses, is in one file, `site/content/story.md`. The JavaScript in `site/js/` only parses it and applies the rules.

- **Scenarios** are the cards. Each is a short news story dated to a year, with a question and three **Choices**. There are 97.
- **Hidden Values.** Every Choice moves six hidden Values: Power, Control, Handover, Unity, Reality and Equality. The player only sees them at the end.
- **Condition-based storylets.** Cards are not linked to each other. Each card says when it can appear (`Appears when`) and which earlier decisions lead to it (`Follows`). At the start of a round the engine gathers every card that qualifies and favors the ones that continue what the player has been doing, so the game reads as one story.
- **Events** (20) are things the player doesn't control, like an earthquake that AI helps with or a flaw no one saw coming.
- **Milestones** (33) mark what AI can do by each year, such as AGI or robots catching up. The player's choices move them earlier or later, or stop them, and a capability graph in the corner shows the curve.
- **Tipping points.** A few risky Choices can tip the world past the point where people matter, and the rest of the game is asked from there.
- **Futures** (16) are the endings. A Future is only given if a collection of the player's own decisions leads to it, and its reveal names those decisions.

`tools/check-story.js` validates the content and simulates thousands of games to make sure, for example, that no card assumes AI the world doesn't have yet and no Future contradicts a choice the player made.

## Repository layout

| Folder | What's in it |
|---|---|
| `site/` | The game exactly as it is served: HTML, CSS, JavaScript, the content file and the card back |
| `tools/` | Content checks, the browser play-test, the local server, and a script that builds Word review documents |
| `image-studio/` | The local tool I use to make card art with an image API (code only; keys and images are kept off GitHub) |
| `docs/` | Design decisions, audits, and the reference for the content format and the engine |
| `archive/` | The briefs for earlier versions, retired content and one-time scripts |
| `CLAUDE.md` | The working spec for the current version, which Claude Code reads at the start of each session |

## Versions

| Version | What changed |
|---|---|
| v2 to v3.6 | The tarot card format, news-style writing with sources, the Values, Futures grounded in the player's path, and the first milestones |
| v4 | Generated card images and an image style guide |
| v5 | Cards stopped being hand-wired and became storylets that answer the whole game so far |
| v5.1 to v5.3 | Storylines, so a game reads as one story that climbs in scale, and capability that follows the player's choices |
| v5.4 to v5.5 | AI climbs by default unless the player slows it, near misses, and a timeline based on 2026 forecasts |
| v5.6 to v5.9 | Cards written as news stories, a calmer pace, a Futures collection, and pressure for more AI in slowed worlds |
| v6.0 to v6.1 | A pause the player calls for is answered by the world, and the Interlude counts the years |
| Next | New card art for every card (round 1 is done), more Futures, and launching the site |

## How this was built

A Matter of Time was made in collaboration with Claude Code through an iterative prompt engineering design process. It grew out of my curiosity and anxiety about our species' future as AI expands. Users respond to imaginary global tech-related scenarios, shaping a speculative timeline.

Early on, I struggled with feeling like I was in the driver's seat. Claude had built so much, and I had barely prompted. However, it was not yet what I had imagined, so I kept prompting it. Still, Claude cannot do everything, and figuring out what I want and where to take it has required plenty of thinking on my end. Every version came out of that loop: writing specs, testing what Claude built, catching what didn't work or didn't feel right, and refining the prompts.

This has made me quite interested in how we can work with AI without giving away the essential human aspects of thinking, creativity, and judgment that make our work feel personal, and how humans and AI can create novel things together, each bringing distinct and complementary things to the table.

The briefs I wrote for each version are in `archive/briefs/`, and the judgment calls behind recent versions are in `docs/DECISIONS.md`.
