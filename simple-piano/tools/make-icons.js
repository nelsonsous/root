/* Gera os ícones PNG da PWA sem dependências externas.
   Uso: node tools/make-icons.js */
"use strict";
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

/* ---------- Codificador PNG mínimo (RGBA, sem filtros) ---------- */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePNG(width, height, rgba) {
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // filtro: nenhum
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // profundidade
  ihdr[9] = 6;  // cor RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- Desenho do ícone (coordenadas base 512×512) ---------- */

function hex(c) {
  return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
}

function mix(a, b, t) {
  return [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t));
}

const BG_TOP = hex("#7c3aed");
const BG_BOTTOM = hex("#4c1d95");
const WHITE = hex("#ffffff");
const BLACK = hex("#1f2937");

// Teclado: 7 teclas brancas entre x=56..456, y=208..456
const KB_X0 = 56, KB_X1 = 456, KB_Y0 = 208, KB_Y1 = 456;
const KEY_W = (KB_X1 - KB_X0) / 7;
const GAP = 5;
const BLACK_AFTER = [0, 1, 3, 4, 5]; // pretas depois de Dó, Ré, Fá, Sol, Lá
const BLACK_W = 36, BLACK_Y1 = KB_Y0 + 150;

// Nota musical: bola + haste
const NOTE_CX = 256, NOTE_CY = 130, NOTE_R = 42;
const STEM_X0 = 292, STEM_X1 = 306, STEM_Y0 = 44;

function colorAt(x, y) {
  // nota musical branca
  const dx = x - NOTE_CX, dy = (y - NOTE_CY) * 1.25;
  if (dx * dx + dy * dy <= NOTE_R * NOTE_R) return WHITE;
  if (x >= STEM_X0 && x < STEM_X1 && y >= STEM_Y0 && y <= NOTE_CY) return WHITE;

  // teclado
  if (x >= KB_X0 && x < KB_X1 && y >= KB_Y0 && y < KB_Y1) {
    const rel = x - KB_X0;
    const keyIdx = Math.floor(rel / KEY_W);
    // teclas pretas por cima
    if (y < BLACK_Y1) {
      for (const i of BLACK_AFTER) {
        const cx = KB_X0 + KEY_W * (i + 1);
        if (Math.abs(x - cx) <= BLACK_W / 2) return BLACK;
      }
    }
    // espaço entre brancas
    if (rel - keyIdx * KEY_W < GAP && keyIdx > 0) return mix(BG_TOP, BG_BOTTOM, y / 512);
    return WHITE;
  }

  return mix(BG_TOP, BG_BOTTOM, y / 512);
}

function render(size) {
  const rgba = Buffer.alloc(size * size * 4);
  const scale = 512 / size;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const [r, g, b] = colorAt((x + 0.5) * scale, (y + 0.5) * scale);
      const o = (y * size + x) * 4;
      rgba[o] = r; rgba[o + 1] = g; rgba[o + 2] = b; rgba[o + 3] = 255;
    }
  }
  return encodePNG(size, size, rgba);
}

const outDir = path.join(__dirname, "..", "icons");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "icon-512.png"), render(512));
fs.writeFileSync(path.join(outDir, "maskable-512.png"), render(512));
fs.writeFileSync(path.join(outDir, "icon-192.png"), render(192));
fs.writeFileSync(path.join(outDir, "apple-touch-icon.png"), render(180));
console.log("Ícones gerados em", outDir);
