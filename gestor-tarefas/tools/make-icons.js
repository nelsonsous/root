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

const BG_TOP = hex("#3b82f6");
const BG_BOTTOM = hex("#1e3a8a");
const WHITE = hex("#ffffff");
const LINE = hex("#bfdbfe");
const CHECK = hex("#16a34a");

// Prancheta: retângulo arredondado com clipe no topo
const BOARD_X0 = 116, BOARD_X1 = 396, BOARD_Y0 = 92, BOARD_Y1 = 436, BOARD_R = 28;
const CLIP_X0 = 206, CLIP_X1 = 306, CLIP_Y0 = 64, CLIP_Y1 = 124, CLIP_R = 16;

// Linhas de "texto" na prancheta
const LINES = [
  { y: 196, x1: 356 },
  { y: 256, x1: 356 },
  { y: 316, x1: 290 },
];
const LINE_X0 = 156, LINE_H = 20;

// Visto (✓): dois segmentos grossos
const CHECK_PTS = [[196, 372], [248, 416], [344, 312]];
const CHECK_W = 26;

function dentroRetArredondado(x, y, x0, y0, x1, y1, r) {
  if (x < x0 || x >= x1 || y < y0 || y >= y1) return false;
  const cx = Math.max(x0 + r, Math.min(x1 - r, x));
  const cy = Math.max(y0 + r, Math.min(y1 - r, y));
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r
    || (x >= x0 + r && x < x1 - r) || (y >= y0 + r && y < y1 - r);
}

function distSegmento(x, y, [ax, ay], [bx, by]) {
  const dx = bx - ax, dy = by - ay;
  const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - (ax + t * dx), y - (ay + t * dy));
}

function colorAt(x, y) {
  // visto verde por cima de tudo
  if (distSegmento(x, y, CHECK_PTS[0], CHECK_PTS[1]) <= CHECK_W / 2) return CHECK;
  if (distSegmento(x, y, CHECK_PTS[1], CHECK_PTS[2]) <= CHECK_W / 2) return CHECK;

  // clipe da prancheta
  if (dentroRetArredondado(x, y, CLIP_X0, CLIP_Y0, CLIP_X1, CLIP_Y1, CLIP_R)) {
    return mix(BG_TOP, BG_BOTTOM, 0.7);
  }

  // prancheta com linhas de texto
  if (dentroRetArredondado(x, y, BOARD_X0, BOARD_Y0, BOARD_X1, BOARD_Y1, BOARD_R)) {
    for (const l of LINES) {
      if (x >= LINE_X0 && x < l.x1 && Math.abs(y - l.y) <= LINE_H / 2) return LINE;
    }
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
