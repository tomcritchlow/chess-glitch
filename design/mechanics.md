# Mechanics — working draft

Influences on the table: **Knightmare Chess** (cards that break chess rules), **Pixie/fairy chess** (altered piece movement), **Brawl Stars** (short matches, chaos as an equalizer, personality-forward), **Cataclysm-style arcade** (escalating instability over time).

## Core loop (current draft — "Rules v0")

1. Set up standard chess. Shuffle the glitch deck, deal each player 3 cards face up. *(Open hands for playtesting; hidden hands are a variant to test.)*
2. On your turn: optionally **play one card**, then **make one move**. Card first or move first — playtest both orderings.
3. When you **lose a piece**, draw a card. *(This is the catch-up engine: losing feeds your hand. Steal shamelessly from Brawl Stars — the player who's behind gets more chaos to work with.)*
4. Chess still ends the game: checkmate wins. Cards never checkmate directly.

## The escalation dial (the "cataclysm" idea)

The board itself destabilizes as the game goes on. Candidate mechanisms, pick one:
- **Glitch counter:** every N total moves, flip the top card of the deck and apply it as a global event.
- **Corrupted squares:** captured-on squares become "glitched" (marked) — pieces on glitched squares get a small buff or wild behavior.
- **The Creep:** at fixed turn counts, edge files go offline (board shrinks) — forces endgames, caps match length. Great for the "a match takes 20 minutes, not 2 hours" promise.

## Card taxonomy (working names, lore-aligned)

| Type | What it does | Examples |
|------|--------------|----------|
| **Exploit** | One-shot movement/position hacks, played on your turn | teleport, move twice, pawn-becomes-queen-for-a-turn |
| **Patch** | Reactions/counters, playable on opponent's turn | cancel a card, save a piece from capture |
| **Daemon** | Persistent effects that sit on the board with a marker | firewall square, haunted piece |
| **Event** | Global weirdness affecting both players | no captures for 2 turns, gravity shifts |

Deck skew to test first: heavy on Exploits (fun, proactive), light on Patches (feel-bad if overused), a few Daemons/Events for texture.

## Balance principles

- Every strong effect should have a cost, a telegraph, or a counter in the same pack.
- Cards affect *pieces and squares*, never the win condition.
- No effect stacks into infinite loops (a card can't return itself).
- Prefer effects a 9-year-old can adjudicate: "move it anywhere empty" beats "move it up to 3 squares orthogonally unless…"
- Asymmetry is fine per-game (you drew different cards), never per-product (no rare/common power gap — this is NOT a TCG; one pack, flat power).

## Open questions (playtest agenda)

- [ ] Hand size: 3? 5? Draw-on-loss only, or also draw-per-turn?
- [ ] Open vs hidden hands (hidden = bluffing, open = kid-friendly + faster)
- [ ] Card-then-move vs move-then-card vs either
- [ ] Does check/checkmate need softening when cards exist? (e.g., "king capture" instead of mate rules — much easier for beginners to adjudicate)
- [ ] 16 vs 32 pack: is a 12-play-card game replayable enough?
- [ ] Do pawns need love? (Most glitch fantasies are about big pieces; pawn cards might be the secret sauce)
- [ ] Match length target: 15–25 min. What forces endings? (The Creep?)

## Prototype policy

The webapp (`prototype/`) is a **sandbox, not a referee**. It highlights legal chess moves but lets you make any move — card effects are adjudicated by the humans playing. Automate card logic only after the card set stabilizes.
