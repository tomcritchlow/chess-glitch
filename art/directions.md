# Aesthetic directions to explore

Six candidate directions before we commit. The current `STYLE` constant in `generate.mjs` encodes Direction 1 — treat that as a hypothesis, not a decision. Each direction lists the vibe, anchors, what it *says* about the game, the risk, and a test prompt (run with `--raw` so the house style doesn't contaminate the test).

The bar every direction must clear: sci-fi, very cool, kid-friendly-not-kid-looking, and some literary warmth Robin Sloan would nod at. Also the boring practical bar: **must read at poker-card size from across a table.**

---

## 1. Luminous Marginalia *(current default)*

Dark indigo fields, cyan/magenta light discipline, amber lamplight; circuit traces that resolve into handwriting. TRON: Legacy warmth-corrected by a used bookstore.

- **Anchors:** TRON: Legacy, Monument Valley, Folio Society sci-fi plates
- **Says:** premium, mysterious, "this glows in the dark of the world"
- **Risk:** dark-neon is a crowded aesthetic (every indie cyberpunk deck looks like this); may skew moody rather than playful
- **Test:** `node art/generate.mjs --raw "trading card art: a chess knight of black glass and chrome mid-teleport, dissolving into cyan particles, deep indigo background, amber handwritten annotations floating in the margins, elegant, luminous, clean" --out d1-knight`

## 2. Risograph Arcana

Flat spot-color print look: 2–3 inks (say, fluorescent pink + teal + warm black), visible grain, slight misregistration *as* the glitch. The glitch aesthetic comes from print error, not screen error — which is a very literary move: the world as a misprinting book.

- **Anchors:** riso zine culture, mid-century Penguin sci-fi covers, Blexbolex
- **Says:** indie, warm, collectible, "made by humans who love print" — peak Sloan; also the cheapest look to print faithfully
- **Risk:** flat color can read lo-fi/cheap next to rendered competitors; needs strong shapes to look "very cool" to a 12-year-old
- **Test:** `node art/generate.mjs --raw "risograph print illustration, 3 spot colors (fluorescent pink, teal, warm black) on cream paper, visible grain and slight misregistration: a chess knight glitching between two squares, bold geometric shapes, mid-century sci-fi book cover energy" --out d2-knight`

## 3. Ligne Claire Cosmos (Moebius / Kilian Eng)

Clean confident linework, vast scale, candy-but-sophisticated color. Chess pieces as monumental architecture in an endless Lattice landscape; tiny figures (Archivists, Glitchwrights) for scale. Wonder-forward rather than mystery-forward.

- **Anchors:** Moebius, Kilian Eng, Jean Giraud-era Métal Hurlant (sanitized), Sable (the game)
- **Says:** epic, wondrous, "there is a WORLD here" — best direction for graphic-novel ambitions
- **Risk:** hardest for models to do consistently; landscape grandeur can fight card-size legibility
- **Test:** `node art/generate.mjs --raw "clean ligne claire sci-fi illustration in the style of European comics: a colossal chess knight standing as a monument on an infinite chessboard plain at dusk, a tiny robed figure with a lantern at its base, soft gradient sky in coral and violet, confident linework, sense of wonder" --out d3-knight`

## 4. Arcade Corruption

Chunky, saturated, playable-looking: bold shapes, thick outlines, CRT scanlines and datamosh smears where the glitches happen. The Brawl Stars energy slot — pieces with *personality*, almost characters.

- **Anchors:** Brawl Stars / Supercell rendering, Hyper Light Drifter palettes, vaporwave-lite, Jet Set Radio
- **Says:** FUN, immediate, a kid picks it up without being told to
- **Risk:** the "kid-looking" line is right here — go one notch too cute and we lose the literary adults entirely; also the fastest direction to look dated
- **Test:** `node art/generate.mjs --raw "bold stylized game art: a chess knight character with a chrome faceplate and glowing eyes, mid-glitch with pixel-sorting smears and chromatic aberration, thick confident shapes, saturated teal and magenta palette, dynamic pose, arcade energy, no text" --out d4-knight`

## 5. Archivist's Schematic

The cards as artifacts from inside the fiction: technical/blueprint drawings of pieces-as-machines on aged paper — cyanotype blues or sepia — dense with handwritten tracery annotations, stamps, corrections. Glitches drawn as red-ink emergency marginalia.

- **Anchors:** Codex Seraphinus (restrained), da Vinci notebooks, patent drawings, Boeing blueprint art
- **Says:** deep lore, "every card is a page from the Marginalia" — the most *ownable* direction, nobody's card game looks like this
- **Risk:** driest of the six; may whiff on "very cool" for kids unless the machines themselves are awesome
- **Test:** `node art/generate.mjs --raw "aged technical schematic illustration, cyanotype blueprint style: exploded diagram of a chess knight revealed as an intricate machine, handwritten annotations in the margins, red ink corrections marking a glitch anomaly, stamps and reference numbers, beautiful draftsmanship" --out d5-knight`

## 6. Foil & Fragment (collage)

Physical-media collage: torn book pages and vintage chess diagrams layered with holographic foil shards, hard digital glitch slices cutting through the paper. The thesis made visual: old literary world, new digital crack.

- **Anchors:** Dave McKean (gentled way down), modern editorial collage, holographic sticker culture
- **Says:** artful, tactile, prize-object; foil-stretch-goal-ready
- **Risk:** collage is compositionally noisy — worst direction for at-a-glance card legibility; hardest to keep consistent across 32 cards
- **Test:** `node art/generate.mjs --raw "mixed media collage card art: a chess knight assembled from torn vintage book pages and chess notation diagrams, sliced through by clean holographic iridescent glitch fragments, cream paper background, elegant composition, single focal subject" --out d6-knight`

---

## Bake-off protocol

Same three subjects through every direction, so results are comparable:

1. **A piece** — the knight (tests character/icon work; prompts above)
2. **A place** — the Marginalia bookshop (tests world/story art)
3. **A card effect** — Firewall (tests abstract-mechanic art, the hardest and most common job: ~2/3 of the set is effects, not characters)

Run each with `-n 2`. Judge against: table-read at card size · cool-to-a-12-year-old · warm-to-a-Sloan-reader · consistent across 32 cards · survivable print costs.

**Hunch to test:** the winner is a hybrid — one direction for the *frame and effects* language, another for *piece/character* art. Likely pairings: 2+3 (riso world, ligne claire heroes) or 5+1 (schematic frames, luminous subjects). Direction 4 is the control group for "did we make it fun enough."

When a direction wins, rewrite the `STYLE` constant in `generate.mjs`, and update `prompts.md` + the lore bible's visual language section to match.
