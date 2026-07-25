#!/usr/bin/env node
/* Glitch Chess — card art concepting via OpenRouter image models.
   Zero dependencies; needs Node 18+ (native fetch).

   Usage:
     node art/generate.mjs "a knight with a chrome faceplate, mid-teleport"
     node art/generate.mjs "teleport packet card art" --out teleport-packet
     node art/generate.mjs "raw prompt, no house style" --raw
     node art/generate.mjs "..." --model google/gemini-2.5-flash-image -n 3

   Reads OPENROUTER_API_KEY (and optional OPENROUTER_IMAGE_MODEL) from .env.local
   at the repo root. Images land in art/output/. */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "art", "output");

// House style: "Lattice Luminism" master register. Keep in sync with art/prompts.md.
const STYLE = `Trading card illustration for the sci-fi chess card game Glitch Chess.
Master style: rich painterly full-bleed composition, 1990s airbrushed sci-fi anime energy,
dense layered detail edge to edge, deep atmospheric background, volumetric glow, luminous
rim light, drifting particle fields, opalescent iridescent color transitions, cosmic depth,
museum-grade rendering, single clear focal subject.
Characters keep the chess-piece silhouette and are made of a clearly readable material
(chrome, weathered stone, porcelain, brass); the glitch always manifests as LIGHT —
prismatic afterimages, glowing cracks, dissolving iridescence, luminous handwriting.
World motifs: checkerboard cosmology — board plains, checkered skies, archive canyons, void seas.
Kid-friendly wonder: no gore, no horror imagery, nothing sexualized, no chibi.
No text, no card frame, no border.
Subject: `;

function loadEnv() {
  const env = {};
  try {
    for (const line of readFileSync(join(ROOT, ".env.local"), "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && m[2]) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env.local yet */
  }
  return env;
}

function parseArgs(argv) {
  const args = { prompt: [], n: 1, raw: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--out") args.out = argv[++i];
    else if (a === "--model") args.model = argv[++i];
    else if (a === "--raw") args.raw = true;
    else if (a === "--ar") args.ar = argv[++i]; // e.g. --ar 2:3 for TCG portrait
    else if (a === "-n") args.n = parseInt(argv[++i], 10) || 1;
    else args.prompt.push(a);
  }
  args.prompt = args.prompt.join(" ");
  return args;
}

const env = loadEnv();
const args = parseArgs(process.argv.slice(2));

if (!args.prompt) {
  console.error('Usage: node art/generate.mjs "<prompt>" [--out name] [--model id] [--raw] [-n count]');
  process.exit(1);
}
if (!env.OPENROUTER_API_KEY) {
  console.error("No OPENROUTER_API_KEY found in .env.local — add your key there first.");
  process.exit(1);
}

// gemini-3-pro-image won the July 2026 model bake-off (see model-bakeoff.html);
// note: it returns 2 variants per call, both are saved. Sometimes adds a thin white
// border — trim with sips if it lands in a frame.
const model = args.model || env.OPENROUTER_IMAGE_MODEL || "google/gemini-3-pro-image";
let fullPrompt = args.raw ? args.prompt : STYLE + args.prompt;
if (args.ar) fullPrompt += `\nComposition: vertical portrait orientation, ${args.ar} aspect ratio, full-bleed trading card art.`;
const slug = (args.out || args.prompt).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);

mkdirSync(OUT_DIR, { recursive: true });
console.log(`model: ${model}`);
console.log(`prompt: ${fullPrompt.slice(0, 140)}${fullPrompt.length > 140 ? "…" : ""}`);

async function callApi(withImageConfig) {
  const body = {
    model,
    messages: [{ role: "user", content: fullPrompt }],
    modalities: ["image", "text"],
  };
  if (args.ar && withImageConfig) body.image_config = { aspect_ratio: args.ar };
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function generateOne(i) {
  let res = await callApi(true);
  if (!res.ok && args.ar && res.status === 400) {
    // some providers reject image_config — fall back to prompt-only aspect control
    res = await callApi(false);
  }
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const msg = data.choices?.[0]?.message;
  const images = msg?.images || [];
  if (images.length === 0) {
    throw new Error(`No image in response. Model said: ${msg?.content || JSON.stringify(data).slice(0, 300)}`);
  }
  let saved = 0;
  for (const img of images) {
    const url = img.image_url?.url || img.url || "";
    const m = url.match(/^data:image\/(\w+);base64,(.+)$/s);
    if (!m) { console.warn("Skipping non-data-URL image:", url.slice(0, 80)); continue; }
    const file = join(OUT_DIR, `${slug}-${Date.now()}${args.n > 1 ? "-" + i : ""}.${m[1]}`);
    writeFileSync(file, Buffer.from(m[2], "base64"));
    console.log(`saved: ${file}`);
    saved++;
  }
  if (saved === 0) throw new Error("Response contained images but none were saveable data URLs.");
}

for (let i = 1; i <= args.n; i++) {
  try {
    await generateOne(i);
  } catch (err) {
    console.error(`generation ${i} failed:`, err.message);
    process.exitCode = 1;
  }
}
