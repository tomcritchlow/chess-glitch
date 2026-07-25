# Glitch Chess

*Chess, but the rules are glitching.*

A Kickstarter card game in development: a single booster pack (16–32 cards) that turns any chess set into a chaotic, beginner-friendly, sci-fi card-driven game. Knightmare Chess × fairy chess × Brawl Stars pacing, wrapped in a literary sci-fi world.

## What's here

- **`prototype/`** — playable sandbox webapp. Open `prototype/index.html` in a browser (no build, no server). Play chess, draw and play glitch cards, adjudicate effects yourself.
- **`design/`** — constraints (the booster-pack promise) and mechanics drafts, with the playtest agenda.
- **`cards/`** — card sets. Set 01 "Field Kit" is the first 16.
- **`lore/`** — the lore bible: the Lattice, the Archivists of the Marginalia, the Glitchwrights, the Nullity.
- **`art/`** — card art concepting. Put an OpenRouter key in `.env.local`, then:
  `node art/generate.mjs "a knight dissolving into cyan teleport particles" --out teleport-packet`
