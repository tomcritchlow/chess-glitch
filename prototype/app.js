/* Glitch Chess prototype sandbox.
   Philosophy: the app highlights legal chess moves but permits ANY move —
   card effects are adjudicated by the humans playing. Everything is logged. */

const FILES = "abcdefgh";
const GLYPHS = { p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚" };
const SIDE_NAME = { w: "Signal", b: "Static" };

let board, turn, captured, tokens, history, deck, discard, hands, tokenMode, selected;

function initialBoard() {
  const back = ["r", "n", "b", "q", "k", "b", "n", "r"];
  const b = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let c = 0; c < 8; c++) {
    b[0][c] = { t: back[c], c: "b" };
    b[1][c] = { t: "p", c: "b" };
    b[6][c] = { t: "p", c: "w" };
    b[7][c] = { t: back[c], c: "w" };
  }
  return b;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function reset() {
  board = initialBoard();
  turn = "w";
  captured = { w: [], b: [] };
  tokens = new Set();
  history = [];
  deck = shuffle(window.GLITCH_CARDS);
  discard = [];
  hands = { w: [], b: [] };
  for (let i = 0; i < 3; i++) { hands.w.push(deck.pop()); hands.b.push(deck.pop()); }
  tokenMode = false;
  selected = null;
  document.getElementById("log").innerHTML = "";
  log("New game. Signal to move. Each side dealt 3 cards.", "sys");
  render();
}

/* ---------- move generation (pseudo-legal, no check detection — it's a sandbox) ---------- */

function inBounds(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8; }

function legalMoves(r, c) {
  const p = board[r][c];
  if (!p) return [];
  const moves = [];
  const add = (rr, cc) => { if (inBounds(rr, cc) && (!board[rr][cc] || board[rr][cc].c !== p.c)) moves.push([rr, cc]); };
  const slide = (dirs) => {
    for (const [dr, dc] of dirs) {
      let rr = r + dr, cc = c + dc;
      while (inBounds(rr, cc)) {
        if (!board[rr][cc]) moves.push([rr, cc]);
        else { if (board[rr][cc].c !== p.c) moves.push([rr, cc]); break; }
        rr += dr; cc += dc;
      }
    }
  };
  const ORTH = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

  if (p.t === "p") {
    const dir = p.c === "w" ? -1 : 1, start = p.c === "w" ? 6 : 1;
    if (inBounds(r + dir, c) && !board[r + dir][c]) {
      moves.push([r + dir, c]);
      if (r === start && !board[r + 2 * dir][c]) moves.push([r + 2 * dir, c]);
    }
    for (const dc of [-1, 1]) {
      const rr = r + dir, cc = c + dc;
      if (inBounds(rr, cc) && board[rr][cc] && board[rr][cc].c !== p.c) moves.push([rr, cc]);
    }
  } else if (p.t === "n") {
    for (const [dr, dc] of [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]) add(r + dr, c + dc);
  } else if (p.t === "b") slide(DIAG);
  else if (p.t === "r") slide(ORTH);
  else if (p.t === "q") slide(ORTH.concat(DIAG));
  else if (p.t === "k") for (const [dr, dc] of ORTH.concat(DIAG)) add(r + dr, c + dc);
  return moves;
}

/* ---------- game actions ---------- */

function sq(r, c) { return FILES[c] + (8 - r); }

function snapshot() {
  history.push({
    board: board.map(row => row.map(p => (p ? { ...p } : null))),
    captured: { w: captured.w.slice(), b: captured.b.slice() },
    tokens: new Set(tokens),
    turn,
  });
  if (history.length > 200) history.shift();
}

function makeMove(fr, fc, tr, tc) {
  const p = board[fr][fc];
  const legal = legalMoves(fr, fc).some(([r, c]) => r === tr && c === tc);
  snapshot();

  const target = board[tr][tc];
  if (target) captured[target.c].push(target);
  board[tr][tc] = p;
  board[fr][fc] = null;

  const desc = `${GLYPHS[p.t]} ${sq(fr, fc)} → ${sq(tr, tc)}${target ? " ×" + GLYPHS[target.t] : ""}`;
  const outOfTurn = p.c !== turn;
  if (!legal || outOfTurn) {
    log(`⚡ ${SIDE_NAME[p.c]} glitch move: ${desc}${outOfTurn ? " (out of turn)" : ""}${!legal ? " (unbound)" : ""}`, "glitch");
  } else {
    log(`${SIDE_NAME[p.c]}: ${desc}`, p.c === "w" ? "white" : "black");
  }

  // auto-promotion, logged so players can override
  const lastRank = p.c === "w" ? 0 : 7;
  if (p.t === "p" && tr === lastRank) {
    p.t = "q";
    log(`${SIDE_NAME[p.c]} pawn promoted to queen on ${sq(tr, tc)}`, "sys");
  }
  if (target && target.t === "k") log(`👑 ${SIDE_NAME[target.c]}'s king has fallen. Game over?`, "sys");

  turn = turn === "w" ? "b" : "w";
  selected = null;
  render();
}

function onSquareClick(r, c) {
  if (tokenMode) {
    const key = r + "," + c;
    tokens.has(key) ? tokens.delete(key) : tokens.add(key);
    log(`Token ${tokens.has(key) ? "placed on" : "removed from"} ${sq(r, c)}`, "sys");
    render();
    return;
  }
  if (selected) {
    const [fr, fc] = selected;
    if (fr === r && fc === c) { selected = null; render(); return; }
    makeMove(fr, fc, r, c);
    return;
  }
  if (board[r][c]) { selected = [r, c]; render(); }
}

function undo() {
  const prev = history.pop();
  if (!prev) { log("Nothing to undo.", "sys"); return; }
  board = prev.board; captured = prev.captured; tokens = prev.tokens; turn = prev.turn;
  selected = null;
  log("↩ Undo.", "sys");
  render();
}

/* ---------- cards ---------- */

function draw(player) {
  if (deck.length === 0) {
    if (discard.length === 0) { log("Deck and discard are empty.", "sys"); return; }
    deck = shuffle(discard); discard = [];
    log("Discard shuffled back into the deck.", "sys");
  }
  const card = deck.pop();
  hands[player].push(card);
  log(`${SIDE_NAME[player]} draws a card (${hands[player].length} in hand).`, "card");
  render();
}

function playCard(player, idx) {
  const [card] = hands[player].splice(idx, 1);
  discard.push(card);
  log(`🃏 ${SIDE_NAME[player]} plays ${card.name} — ${card.text}`, "card");
  render();
}

/* ---------- rendering ---------- */

function log(msg, cls) {
  const el = document.createElement("div");
  el.className = "entry " + (cls || "");
  el.textContent = msg;
  const logEl = document.getElementById("log");
  logEl.prepend(el);
}

function render() {
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = "";
  const legal = selected ? legalMoves(selected[0], selected[1]) : [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const cell = document.createElement("div");
      cell.className = "sq " + ((r + c) % 2 === 0 ? "light" : "dark");
      if (selected && selected[0] === r && selected[1] === c) cell.classList.add("selected");
      if (legal.some(([rr, cc]) => rr === r && cc === c)) {
        cell.classList.add("legal");
        if (board[r][c]) cell.classList.add("occupied");
      }
      const p = board[r][c];
      if (p) {
        const span = document.createElement("span");
        span.className = "piece " + (p.c === "w" ? "white" : "black");
        span.textContent = GLYPHS[p.t];
        cell.appendChild(span);
      }
      if (tokens.has(r + "," + c)) {
        const t = document.createElement("span");
        t.className = "token";
        t.textContent = "◈";
        cell.appendChild(t);
      }
      const coord = document.createElement("span");
      coord.className = "coord";
      coord.textContent = sq(r, c);
      cell.appendChild(coord);
      cell.addEventListener("click", () => onSquareClick(r, c));
      boardEl.appendChild(cell);
    }
  }

  const ti = document.getElementById("turn-indicator");
  ti.textContent = `${SIDE_NAME[turn]} to move`;
  ti.className = turn === "w" ? "white" : "black";

  document.getElementById("captured-white").textContent = captured.w.map(p => GLYPHS[p.t]).join(" ");
  document.getElementById("captured-black").textContent = captured.b.map(p => GLYPHS[p.t]).join(" ");
  document.getElementById("deck-count").textContent = `deck ${deck.length} · discard ${discard.length}`;
  document.getElementById("btn-token").classList.toggle("active", tokenMode);

  renderHand("w", "hand-white");
  renderHand("b", "hand-black");
}

function renderHand(player, elId) {
  const el = document.getElementById(elId);
  el.innerHTML = "";
  hands[player].forEach((card, idx) => {
    const div = document.createElement("div");
    div.className = "card " + card.type;
    div.innerHTML = `
      <div class="card-top"><span class="card-name"></span><span class="card-type">${card.type}</span></div>
      <div class="card-text"></div>
      <div class="card-flavor"></div>
      <div class="card-actions"><button>Play</button></div>`;
    div.querySelector(".card-name").textContent = card.name;
    div.querySelector(".card-text").textContent = card.text;
    div.querySelector(".card-flavor").textContent = card.flavor;
    div.querySelector("button").addEventListener("click", () => playCard(player, idx));
    el.appendChild(div);
  });
}

/* ---------- wiring ---------- */

document.getElementById("btn-undo").addEventListener("click", undo);
document.getElementById("btn-reset").addEventListener("click", reset);
document.getElementById("btn-pass").addEventListener("click", () => {
  snapshot();
  log(`${SIDE_NAME[turn]} passes.`, "sys");
  turn = turn === "w" ? "b" : "w";
  render();
});
document.getElementById("btn-token").addEventListener("click", () => {
  tokenMode = !tokenMode;
  selected = null;
  render();
});
document.querySelectorAll(".draw-btn").forEach(btn =>
  btn.addEventListener("click", () => draw(btn.dataset.player === "white" ? "w" : "b"))
);

reset();
