// Shared vector kit for the print sheets: piece silhouettes, faction sigils, mini-board diagrams.
// Plain script (no modules) so the sheets open from file:// like the prototype.
(function () {
  const INK = "#17161c", ENEMY = "#c22a72", PAPER = "#fffdf8";

  // 100x100 geometric silhouettes. Each shares the same collar + plinth so the set reads as one family.
  const BASE = "M18 92 L82 92 L82 84 L74 80 L26 80 L18 84 Z M30 80 L70 80 L66 74 L34 74 Z";
  const PIECE = {
    pawn:   BASE + " M37 74 L43 47 L57 47 L63 74 Z M38 47 L62 47 L62 41 L38 41 Z M50 12 a15 15 0 1 1 -0.01 0 Z",
    rook:   BASE + " M33 74 L36 40 L64 40 L67 74 Z M28 40 L28 14 L38 14 L38 22 L45 22 L45 14 L55 14 L55 22 L62 22 L62 14 L72 14 L72 40 Z",
    bishop: BASE + " M38 74 L43 50 L57 50 L62 74 Z M35 50 L65 50 L65 45 L35 45 Z M50 12 C66 24 68 38 60 45 L40 45 C32 38 34 24 50 12 Z M50 2 a5 5 0 1 1 -0.01 0 Z",
    knight: BASE + " M31 74 L38 54 L24 52 L20 43 L42 20 L45 7 L54 16 C70 22 76 44 69 74 Z",
    queen:  BASE + " M36 74 L41 47 L59 47 L64 74 Z M30 47 L22 18 L37 32 L43 12 L50 28 L57 12 L63 32 L78 18 L70 47 Z",
    king:   BASE + " M36 74 L41 47 L59 47 L64 74 Z M30 47 C25 30 40 24 50 31 C60 24 75 30 70 47 Z M46 3 L54 3 L54 10 L61 10 L61 17 L54 17 L54 27 L46 27 L46 17 L39 17 L39 10 L46 10 Z",
  };
  // Cut-outs so silhouettes don't read as blobs at small sizes.
  const CUT = {
    bishop: "M52 24 L60 31 L57 34 L49 27 Z",
    knight: "M43 31 a3 3 0 1 1 -0.01 0 Z",
  };

  function piece(kind, opts = {}) {
    const { x = 0, y = 0, size = 20, who = "you", ghost = false } = opts;
    const s = size / 100;
    const d = PIECE[kind] + (CUT[kind] ? " " + CUT[kind] : "");
    let style;
    if (ghost) style = `fill="none" stroke="${who === "enemy" ? ENEMY : INK}" stroke-width="${1.4 / s}" stroke-dasharray="${5} ${4}" opacity=".7"`;
    else if (who === "enemy") style = `fill="${PAPER}" stroke="${ENEMY}" stroke-width="${1.6 / s}"`;
    else if (who === "plain") style = `fill="currentColor"`;
    else style = `fill="${INK}"`;
    return `<path transform="translate(${x} ${y}) scale(${s})" d="${d}" fill-rule="evenodd" ${style} stroke-linejoin="round"/>`;
  }
  function pieceSVG(kind, size = 40, color = INK) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" style="color:${color}">${piece(kind, { size: 100, who: "plain" })}</svg>`;
  }

  // Faction sigils, 24x24 viewBox, drawn in currentColor.
  const SIGIL = {
    Marginalia: `<g stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/></g>`,
    Glitchwrights: `<rect x="3" y="3" width="12" height="12" fill="none" stroke="#00a3c4" stroke-width="2.4"/><rect x="9" y="9" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
    Errantry: `<path transform="scale(.24)" d="${PIECE.knight}" fill="currentColor" fill-rule="evenodd"/><path d="M14 5 L11.5 10 L14.5 12 L11 18" fill="none" stroke="#7fe3f0" stroke-width="1.6" stroke-linejoin="round"/>`,
    Hush: `<rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-dasharray="3 2.2"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>`,
    Council: `<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 6v12M6 12h12" stroke="currentColor" stroke-width="2"/>`,
  };
  function sigil(name, size = 14, color = "currentColor") {
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" style="color:${color};vertical-align:-2px">${SIGIL[name] || ""}</svg>`;
  }

  // ---------- mini-board diagrams ----------
  // board({cols, rows, tint}) returns a builder; coords are (col,row), row 0 = far side (opponent), last row = your side.
  function board({ cols = 5, rows = 4, tint = "#dcecf0", accent = "#0b8aa6", pad = 0, extraRight = 0, extraLeft = 0 } = {}) {
    const C = 20;
    const parts = [], over = [];
    const W = cols * C, H = rows * C;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        parts.push(`<rect x="${c * C}" y="${r * C}" width="${C}" height="${C}" fill="${(r + c) % 2 ? tint : "#fff"}"/>`);
    parts.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="${INK}" stroke-width=".8"/>`);
    const ctr = (c, r) => [c * C + C / 2, r * C + C / 2];
    const api = {
      C, accent,
      piece(c, r, kind, who = "you", ghost = false) { parts.push(piece(kind, { x: c * C + .5, y: r * C, size: C - 1, who, ghost })); return api; },
      fill(c, r, color, op = 1) { parts.splice(rows * cols, 0, `<rect x="${c * C}" y="${r * C}" width="${C}" height="${C}" fill="${color}" opacity="${op}"/>`); return api; },
      dot(c, r, color = accent, rad = 3.2) { const [x, y] = ctr(c, r); over.push(`<circle cx="${x}" cy="${y}" r="${rad}" fill="${color}"/>`); return api; },
      ring(c, r, color = accent) { const [x, y] = ctr(c, r); over.push(`<circle cx="${x}" cy="${y}" r="9.3" fill="none" stroke="${color}" stroke-width="1.5"/>`); return api; },
      x(c, r, color = ENEMY, s = 5) { const [x, y] = ctr(c, r); over.push(`<path d="M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>`); return api; },
      arrow(c1, r1, c2, r2, o = {}) {
        const { color = accent, dash = false, bend = 0, shorten = 7, w = 1.8, head = true } = o;
        let [x1, y1] = ctr(c1, r1), [x2, y2] = ctr(c2, r2);
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
        const ux = dx / len, uy = dy / len;
        x2 -= ux * shorten; y2 -= uy * shorten; x1 += ux * (o.startShorten ?? 4); y1 += uy * (o.startShorten ?? 4);
        const mx = (x1 + x2) / 2 - uy * bend, my = (y1 + y2) / 2 + ux * bend;
        const id = "h" + Math.random().toString(36).slice(2, 8);
        // tangent at end for the head
        const tx = x2 - mx, ty = y2 - my, tl = Math.hypot(tx, ty) || 1;
        const hx = tx / tl, hy = ty / tl, hs = 4.2;
        const headPath = `M${x2 + hx * hs * .6} ${y2 + hy * hs * .6} L${x2 - hx * hs - hy * hs * .75} ${y2 - hy * hs + hx * hs * .75} L${x2 - hx * hs + hy * hs * .75} ${y2 - hy * hs - hx * hs * .75} Z`;
        over.push(`<path d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" ${dash ? 'stroke-dasharray="3 2.6"' : ""}/>` + (head ? `<path d="${headPath}" fill="${color}"/>` : ""));
        return api;
      },
      badge(c, r, text, color = accent, dx = 6.5, dy = -6.5) {
        const [x, y] = ctr(c, r);
        over.push(`<circle cx="${x + dx}" cy="${y + dy}" r="5" fill="${color}" stroke="#fff" stroke-width="1"/><text x="${x + dx}" y="${y + dy + 2.3}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="6.4" fill="#fff">${text}</text>`);
        return api;
      },
      wall(c, r, color = "#e09a10") {
        const x = c * C, y = r * C;
        let h = `<rect x="${x + 1}" y="${y + 1}" width="${C - 2}" height="${C - 2}" fill="${color}" opacity=".22"/>`;
        for (let i = -C; i < C; i += 4) h += `<line x1="${x + Math.max(0, i)}" y1="${y + Math.max(0, -i)}" x2="${x + Math.min(C, C + i)}" y2="${y + Math.min(C, C - i)}" stroke="${color}" stroke-width="1.1"/>`;
        h += `<rect x="${x + 1}" y="${y + 1}" width="${C - 2}" height="${C - 2}" fill="none" stroke="${color}" stroke-width="2"/>`;
        over.unshift(h); return api;
      },
      raw(svg) { over.push(svg); return api; },
      svg({ width = "100%", height = "100%" } = {}) {
        const L = extraLeft * C, R = extraRight * C, P = pad;
        return `<svg viewBox="${-L - P} ${-P} ${W + L + R + 2 * P} ${H + 2 * P}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet">${parts.join("")}${over.join("")}</svg>`;
      },
    };
    return api;
  }

  window.GG = { piece, pieceSVG, sigil, board, INK, ENEMY, PIECE };
})();
