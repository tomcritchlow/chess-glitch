# Art direction & prompt library

The house style lives in the `STYLE` constant in `generate.mjs` — every prompt gets it prepended unless you pass `--raw`. Keep this file, that constant, and `lore/lore-bible.md` ("Visual language") in agreement.

## MASTER STYLE — "Lattice Luminism" (current, anchored on Volt + Colossus)

One sentence: **material pieces, glitch as light, checkerboard cosmology, painted lush.**

- Rendering: painterly full-bleed, 90s airbrushed sci-fi anime, volumetric glow, particle fields, opalescent transitions (see "lush register" recipe below — now baked into the STYLE constant).
- Characters: chess-piece silhouette + a readable MATERIAL; the glitch is always LIGHT.
- World: checkerboard cosmology — board plains, checkered skies, archive canyons, void seas.

Faction sub-styles = **material × light** (this is the whole adaptation system):

| Faction | Material | Glitch-light | Palette | World motif |
|---|---|---|---|---|
| Glitchwrights | chrome | prismatic afterimages, lightning | fluoro magenta, cyan, gold, indigo | circuit canyons, checkered storm skies |
| Errantry | weathered stone | glowing cracks | stone, coral, violet, cyan | infinite board plains, auroras |
| Hush | porcelain / paper | dissolving iridescence | cream, ink black, aurora opal | void seas, blank horizons |
| Marginalia | brass / parchment | luminous handwriting, glowing motes | amber, prussian blue, parchment gold | archive canyons, lamplit stacks |

Usage: prompt = subject + one palette line, no `--raw` needed, e.g.
`node art/generate.mjs --ar 2:3 --out my-card "a stout brass rook… Faction: the Marginalia — amber lamplight, prussian blue, parchment gold; archive canyon backdrop."`

The flat dialects below (riso / ligne claire / schematic / collage) are retained as **secondary registers** for effect cards, rules cards, and card backs — the frame unifies (the Phantasm lesson). Card frames are built in code (`card-frames.html`), never generated in the image.

## Art direction in one paragraph

Luminous dark sci-fi with a warm literary undertone. Deep indigo-black fields; cyan (Signal) and magenta (Static) light; amber lamplight from the Marginalia. Clean, almost vector rendering with bookish texture — circuit traces that resolve into handwriting, scanlines over vellum, brass-and-glass next to holograms. Pieces are elegant and slightly *wrong* in beautiful ways. Kid-friendly but not kid-looking: menace and mystery yes, gore and grime no.

## Style anchors (reference when briefing artists/models)

- TRON: Legacy's light discipline, but warmer
- Moebius line clarity (without the surrealism dial at 10)
- Monument Valley / Alto's Odyssey color confidence
- Folio Society sci-fi book plates — the "literary" tell
- Explicitly NOT: Warhammer grimdark, MTG realism, chibi/kawaii

## Prompt recipes

Card subject prompts (style is auto-prepended by generate.mjs):

```
node art/generate.mjs "a chess knight with a chrome faceplate dissolving into cyan teleport particles, arriving on a glowing square" --out teleport-packet

node art/generate.mjs "a pawn wreathed in golden root-access light, casting the shadow of a queen" --out sudo

node art/generate.mjs "a translucent rook phasing through a wall of other pieces, leaving a ghost trail" --out ghost-protocol

node art/generate.mjs "a single chessboard square protected by a small elegant wall of amber hexagonal light" --out firewall

node art/generate.mjs "a cozy impossible bookshop between two giant chessboard squares, amber lamplight, shelves curving into circuit traces, a hooded archivist at a desk" --out the-marginalia

node art/generate.mjs "a vast chessboard landscape at dusk where distant squares dissolve into white silent blankness" --out the-nullity
```

Exploration flags:
- `-n 3` — three variations of one prompt
- `--raw` — skip the house style (for testing whether the style is helping)
- `--model <id>` — try another OpenRouter image model (e.g. `openai/gpt-image-1`)

## Character design rule (learned from Character Samples 01)

**The piece IS the character.** Keep the chess-piece silhouette as the body; add personality through face, props, pose, and costume (Solder: pawn body + goggles + taped-can jetpack; Fermata: newsprint pawn + scarf + heart). Characters that drift fully human (or horse-headed-humanoid) lose the game's DNA. Prompt with "a chess [piece] shaped character — the piece silhouette kept intact — with [face/props/pose]" and add "not humanoid, not chibi" as guardrails. Animal-scholars (the Docent's owl) are the sanctioned exception for Marginalia humanoids.

## The lush register (validated — see lush-sheet.html)

For character/hero cards, the flat dialects felt thin next to modern TCG art. The lush register fixes it. Preamble recipe:

> Rich painterly full-bleed trading card illustration, 1990s airbrushed sci-fi anime energy: dense layered detail edge to edge, deep atmospheric background, volumetric glow, luminous rim light, drifting particle fields, opalescent iridescent color transitions, chrome and opal accents, cosmic depth. Kid-friendly wonder, no gore, no text, no card frame. Subject: …

Rules learned:
- **Character + world in ONE generation** — the model unifies lighting; composites look fake. Layering is a production concern (art plate / frame layer / spot-holo mask), not a concepting one.
- The piece-silhouette rule survives the register (Volt finally worked as a chrome knight piece once both rules were in the prompt).
- Faction identity carries through **palette + world motifs**, not rendering style: Hush = cream/ink/aurora-opal; Glitchwrights = fluoro pink/teal/indigo; Marginalia = amber/prussian/parchment; Errantry = stone/coral/violet/cyan.
- Design for foil: dark grounds, particle fields, beams, and iridescent zones are where holographic finish will sit in print.
- Working hypothesis: lush register for characters/rares; the flat faction dialects live on for effect cards, rules cards, and card backs. The FRAME unifies (the Phantasm lesson).

## Model playbook (July 2026 — see model-bakeoff.html + oai2-experiments.html)

- **`google/gemini-3-pro-image`** (default): painterly warmth, fast (~20s), 2 variants/call. Best for character card finals at speed.
- **`openai/gpt-5.4-image-2`**: the maximalist. Slow (~2min) but unmatched texture density (it renders legible micro-text, score cards with real numbers), environments, and narrative detail. Use for hero art, posters, world/faction art, and anything Kickstarter-page-facing. **Requires constraint-first prompting** (below) or it drifts off-silhouette.
- **`google/gemini-3.1-flash-image`**: cheap fast drafts only; skews toy-like on characters.

### Constraint-first prompt template (cures gpt-5.4 silhouette drift — validated)

> Full-bleed trading card illustration, painterly airbrushed 1990s sci-fi anime, museum-grade. HARD CONSTRAINTS FIRST: the subject is a chess [piece] PIECE — one continuous sculpted form, NO legs, NO arms, exactly two eyes, kid-friendly, no text. THE SUBJECT: [long, weird, specific storytelling — this model rewards length and strangeness: causality jokes, text-as-terrain, reflections that disagree with their owners].

### Variation grids (cheap ideation — validated)

Ask ONE call for "a character design exploration sheet: ONE image divided into a clean 2x3 grid… six DIFFERENT takes… (1)…(2)…(3)…" with explicitly enumerated variations per cell. 18 concepts cost 3 calls. Zero in on winning cells, then regenerate them as full singles.

## Card frame notes (later)

- Poker size (2.5" × 3.5"), art box roughly top 60%
- Type color-coding matches the prototype: Exploit cyan, Patch green, Daemon amber, Event magenta
- Card backs: the Lattice motif — a chessboard grid dissolving into tracery handwriting (also the Option C board-tile candidate — see design/constraints.md)

## Session log

Keep notes here on what worked: model, prompt phrasing, keepers (move keepers out of `output/` — it's gitignored).
