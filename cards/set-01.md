# Set 01 — "Field Kit" (16 sample cards)

First playtest set. Every card here also lives in `prototype/cards.js` (keep the two in sync — the prototype file is what the webapp loads). Types per `design/mechanics.md`: Exploit / Patch / Daemon / Event.

| # | Name | Type | Rules text | Flavor |
|---|------|------|-----------|--------|
| 1 | Teleport Packet | Exploit | Move one of your pieces to any empty square. This is your move for the turn. | "Arrival is just departure, misfiled." |
| 2 | Overclock | Exploit | This turn, move the same piece twice. At most one of the two moves may capture. | The knight finished its move before it began. |
| 3 | Sudo | Exploit | This turn, one of your pawns moves as if it were a queen. | Permission granted. Briefly. Gloriously. |
| 4 | Ghost Protocol | Exploit | This turn, one of your pieces may move through occupied squares (it still can't land on your own piece). | The rook remembered that walls are a suggestion. |
| 5 | Hot Swap | Exploit | Swap the positions of two of your own pieces. This is your move for the turn. | Standard maintenance. Nothing to see here. |
| 6 | Restore Backup | Exploit | Return one of your captured pieces to its original starting square, if empty. This is your move for the turn. | The Marginalia keeps excellent records. |
| 7 | Fork Bomb | Exploit | Place a new pawn of yours on any empty square adjacent to one of your pawns. This is your move for the turn. | One pawn, given time, is every pawn. |
| 8 | Escape Key | Patch | Play when your piece would be captured: instead, move it one square in any direction to an empty square. The attacker stays where it moved from. | The oldest exploit is leaving. |
| 9 | Checksum | Patch | Play when your opponent plays a card: cancel it. They may still move. | "Denied," said the Archivist, without looking up. |
| 10 | Rollback | Patch | Play at the start of your turn: undo your opponent's last move, then they move again (differently). | Some annotations are corrections. |
| 11 | Mirror Daemon | Patch | Play when your opponent plays an Exploit: after it resolves, apply the same effect for yourself immediately. | It learned the trick by watching. It's very good at watching. |
| 12 | Firewall | Daemon | Choose an empty square and mark it. For 3 of each player's turns, no piece may enter that square. | A little wall, well placed, is a whole philosophy. |
| 13 | Haunt | Daemon | Mark one enemy piece (not the king). It cannot capture while marked. Remove the mark when any piece is captured anywhere. | Something is riding the bishop, and it is a pacifist. |
| 14 | Lag Spike | Daemon | Mark one enemy piece (not the king). It cannot move on your opponent's next turn. Then remove the mark. | The queen is buffering. |
| 15 | Blue Screen | Event | For the next 2 turns of each player, no captures may occur. | The whole board held its breath. |
| 16 | Gravity Storm | Event | Both players, starting with you: move one of your own pawns backward one square (if you can). | The Lattice sneezed. |

## Design notes

- Deck skew: 7 Exploits, 4 Patches, 3 Daemons, 2 Events — proactive-heavy on purpose.
- "This is your move for the turn" is the standard cost template for big Exploits; free-action Exploits (Sudo, Ghost Protocol, Overclock) are riders on a normal move.
- Nothing touches the king as a target except by normal chess. Firewall/Teleport can still create shelter — watch whether that makes mates too hard to find.
- Suspected problem children to watch in playtest: Fork Bomb (pawn spam near promotion), Rollback (feel-bad factor), Restore Backup (queen resurrection may be a 2x power outlier).
- Physical-component check: Daemons and Firewall need markers. Budget says: card corners can be torn? No — use anything (coins). Rules card should say "use any two small objects as markers."
