# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A Kickstarter card game in development: **Glitch Chess** — "chess, but the rules are glitching." One booster pack (16–32 cards) is the entire product; cards bend chess rules Knightmare-Chess-style to make the game chaotic and beginner-friendly. The project spans four tracks: a playtest webapp, card design, art concepting, and lore capable of sustaining short stories / graphic novels.

**Tone constraints (non-negotiable):** sci-fi, cool-looking, kid-friendly but not kid-looking — no gore, no NSFW, no sexualization. Literary sub-theme (Robin Sloan-adjacent: warm tech-mysticism, books, secret societies).

## State of play (July 24, 2026)

Read `design/register-atlas.md` first — it's the master art-architecture doc. Locked: 32-card structure (6 piece-suite + 8 characters + 16 effects + 2 rules; the 16 = canon "pressed glitches"); each faction has its own document-culture art register; two canon stories in `lore/`. Model playbook in `art/prompts.md` (gemini-3-pro default; gpt-5.4-image-2 + constraint-first long prompts for hero art). Open threads, in rough priority: (1) merge punk Black Catalog grit into the Glitchwrights zine register, (2) settle the Errantry register (Living Rooks candlelit architecture vs waymarker panels), (3) wire Awakened characters into the prototype for playtesting, (4) draft the six piece-suite cards (Continuity Council register), (5) frame compositor v2 using the collage layout language.

## Git workflow

Solo-dev project. Remote: https://github.com/tomcritchlow/chess-glitch. **Default: commit and push directly to `main` — no branches, no PRs** — unless Tom says otherwise for a specific change. Generated art in `art/output/` IS committed (the HTML sheets depend on it); `.env.local` never is.

## Commands

- **Run the prototype:** open `prototype/index.html` directly in a browser. No build step, no server, no dependencies — plain HTML/CSS/JS loaded from `file://`. Keep it that way.
- **Generate card art:** `node art/generate.mjs "<subject prompt>" --out <slug>` (needs `OPENROUTER_API_KEY` in `.env.local`, Node 18+). Flags: `-n 3` for variations, `--raw` to skip house style, `--model <id>` to switch models. Output goes to `art/output/` (gitignored).
- No tests, no linter — it's a design prototype.

## Architecture & conventions

- **The prototype is a sandbox, not a referee.** It highlights legal chess moves but permits any move (logged as a "glitch move"); card effects are adjudicated by the humans playing. Don't add rule enforcement or card-effect automation without being asked — manual adjudication is the point while the card set is unstable.
- **Card data lives twice, deliberately:** `prototype/cards.js` (what the app loads — plain script setting `window.GLITCH_CARDS`, so `file://` works) and `cards/set-01.md` (design notes + balance watch-list). When editing cards, update both.
- **Doc authority:** `design/constraints.md` holds the product constraints (booster-pack-only promise, card-count math, price point); `design/mechanics.md` holds rules drafts and the open playtest questions; `lore/lore-bible.md` is canon for names, tone, and world rules (including "canon rules for writers" — e.g. never reveal the builders). Check lore before naming anything; card names, UI labels (Signal/Static, not White/Black), and art prompts all draw from it.
- **Art style has one source of truth in code:** the `STYLE` constant in `art/generate.mjs`, mirrored in prose in `art/prompts.md` and the lore bible's "Visual language" section. Change all three together.
- In-game sides are **Signal** (white, cyan) and **Static** (black, magenta) everywhere user-facing.

## Design principles to respect when adding cards or mechanics

- Cards never win the game directly (no king-capture cards); chess decides.
- Rules text must fit large-type on a poker card — no FAQ-requiring cards.
- No hidden-memory effects: everything resolves immediately or leaves a visible marker.
- Flat power across the pack — this is one deck, not a TCG; no rarity power gap.
- Losing feeds your hand (draw-on-loss) — chaos is the catch-up mechanic.
