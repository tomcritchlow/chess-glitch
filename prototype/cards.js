// Set 01 — "Field Kit". Keep in sync with cards/set-01.md (that file holds design notes).
// Loaded as a plain script so index.html works from file:// with no server.
window.GLITCH_CARDS = [
  { id: 1,  name: "Teleport Packet", type: "Exploit", text: "Move one of your pieces to any empty square. This is your move for the turn.", flavor: "“Arrival is just departure, misfiled.”" },
  { id: 2,  name: "Overclock", type: "Exploit", text: "This turn, move the same piece twice. At most one of the two moves may capture.", flavor: "The knight finished its move before it began." },
  { id: 3,  name: "Sudo", type: "Exploit", text: "This turn, one of your pawns moves as if it were a queen.", flavor: "Permission granted. Briefly. Gloriously." },
  { id: 4,  name: "Ghost Protocol", type: "Exploit", text: "This turn, one of your pieces may move through occupied squares (it still can't land on your own piece).", flavor: "The rook remembered that walls are a suggestion." },
  { id: 5,  name: "Hot Swap", type: "Exploit", text: "Swap the positions of two of your own pieces. This is your move for the turn.", flavor: "Standard maintenance. Nothing to see here." },
  { id: 6,  name: "Restore Backup", type: "Exploit", text: "Return one of your captured pieces to its original starting square, if empty. This is your move for the turn.", flavor: "The Marginalia keeps excellent records." },
  { id: 7,  name: "Fork Bomb", type: "Exploit", text: "Place a new pawn of yours on any empty square adjacent to one of your pawns. This is your move for the turn.", flavor: "One pawn, given time, is every pawn." },
  { id: 8,  name: "Escape Key", type: "Patch", text: "Play when your piece would be captured: instead, move it one square in any direction to an empty square. The attacker stays where it moved from.", flavor: "The oldest exploit is leaving." },
  { id: 9,  name: "Checksum", type: "Patch", text: "Play when your opponent plays a card: cancel it. They may still move.", flavor: "“Denied,” said the Archivist, without looking up." },
  { id: 10, name: "Rollback", type: "Patch", text: "Play at the start of your turn: undo your opponent's last move, then they move again (differently).", flavor: "Some annotations are corrections." },
  { id: 11, name: "Mirror Daemon", type: "Patch", text: "Play when your opponent plays an Exploit: after it resolves, apply the same effect for yourself immediately.", flavor: "It learned the trick by watching. It's very good at watching." },
  { id: 12, name: "Firewall", type: "Daemon", text: "Choose an empty square and mark it. For 3 of each player's turns, no piece may enter that square.", flavor: "A little wall, well placed, is a whole philosophy." },
  { id: 13, name: "Haunt", type: "Daemon", text: "Mark one enemy piece (not the king). It cannot capture while marked. Remove the mark when any piece is captured anywhere.", flavor: "Something is riding the bishop, and it is a pacifist." },
  { id: 14, name: "Lag Spike", type: "Daemon", text: "Mark one enemy piece (not the king). It cannot move on your opponent's next turn. Then remove the mark.", flavor: "The queen is buffering." },
  { id: 15, name: "Blue Screen", type: "Event", text: "For the next 2 turns of each player, no captures may occur.", flavor: "The whole board held its breath." },
  { id: 16, name: "Gravity Storm", type: "Event", text: "Both players, starting with you: move one of your own pawns backward one square (if you can).", flavor: "The Lattice sneezed." },
];
