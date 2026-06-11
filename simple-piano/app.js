/* Piano Mágico — piano para crianças, 100% offline */
"use strict";

/* ============================== Notas ============================== */

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SOLFEGE = { C: "Dó", D: "Ré", E: "Mi", F: "Fá", G: "Sol", A: "Lá", B: "Si" };
const NOTE_COLORS = {
  C: "#ef4444", D: "#f97316", E: "#eab308", F: "#22c55e",
  G: "#0ea5e9", A: "#6366f1", B: "#a855f7",
};

const LOW_MIDI = 55;  // Sol3 (G3)
const HIGH_MIDI = 84; // Dó6 (C6)

function midiToParts(midi) {
  const name = NOTE_NAMES[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return { letter: name[0], sharp: name.length > 1, octave };
}

function nameToMidi(name) {
  // "C4", "Bb4", "F#5"
  const m = /^([A-G])([#b]?)(\d)$/.exec(name);
  let semis = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]];
  if (m[2] === "#") semis += 1;
  if (m[2] === "b") semis -= 1;
  return (parseInt(m[3], 10) + 1) * 12 + semis;
}

function keyLabel(midi, style) {
  const { letter, sharp, octave } = midiToParts(midi);
  if (style === "none") return "";
  if (style === "letters") return letter + (sharp ? "♯" : "") + octave;
  return SOLFEGE[letter] + (sharp ? "♯" : "");
}

/* ============================== Músicas ============================== */
/* d = duração em tempos (1 = semínima) */

const SONGS = [
  {
    id: "brilha", title: "Brilha, Brilha Estrelinha", emoji: "⭐", level: 1, bpm: 100,
    notes: [
      ["C4",1],["C4",1],["G4",1],["G4",1],["A4",1],["A4",1],["G4",2],
      ["F4",1],["F4",1],["E4",1],["E4",1],["D4",1],["D4",1],["C4",2],
      ["G4",1],["G4",1],["F4",1],["F4",1],["E4",1],["E4",1],["D4",2],
      ["G4",1],["G4",1],["F4",1],["F4",1],["E4",1],["E4",1],["D4",2],
      ["C4",1],["C4",1],["G4",1],["G4",1],["A4",1],["A4",1],["G4",2],
      ["F4",1],["F4",1],["E4",1],["E4",1],["D4",1],["D4",1],["C4",2],
    ],
  },
  {
    id: "cordeirinho", title: "O Cordeirinho", emoji: "🐑", level: 1, bpm: 110,
    notes: [
      ["E4",1],["D4",1],["C4",1],["D4",1],["E4",1],["E4",1],["E4",2],
      ["D4",1],["D4",1],["D4",2],["E4",1],["G4",1],["G4",2],
      ["E4",1],["D4",1],["C4",1],["D4",1],["E4",1],["E4",1],["E4",1],["E4",1],
      ["D4",1],["D4",1],["E4",1],["D4",1],["C4",4],
    ],
  },
  {
    id: "sino", title: "Bate o Sino (Jingle Bells)", emoji: "🔔", level: 2, bpm: 120,
    notes: [
      ["E4",1],["E4",1],["E4",2],["E4",1],["E4",1],["E4",2],
      ["E4",1],["G4",1],["C4",1],["D4",1],["E4",4],
      ["F4",1],["F4",1],["F4",1],["F4",1],["F4",1],["E4",1],["E4",1],["E4",1],
      ["E4",1],["D4",1],["D4",1],["E4",1],["D4",2],["G4",2],
      ["E4",1],["E4",1],["E4",2],["E4",1],["E4",1],["E4",2],
      ["E4",1],["G4",1],["C4",1],["D4",1],["E4",4],
      ["F4",1],["F4",1],["F4",1],["F4",1],["F4",1],["E4",1],["E4",1],["E4",1],
      ["G4",1],["G4",1],["F4",1],["D4",1],["C4",4],
    ],
  },
  {
    id: "freijaco", title: "Frei Jacó", emoji: "🛏️", level: 2, bpm: 110,
    notes: [
      ["C4",1],["D4",1],["E4",1],["C4",1],
      ["C4",1],["D4",1],["E4",1],["C4",1],
      ["E4",1],["F4",1],["G4",2],
      ["E4",1],["F4",1],["G4",2],
      ["G4",0.5],["A4",0.5],["G4",0.5],["F4",0.5],["E4",1],["C4",1],
      ["G4",0.5],["A4",0.5],["G4",0.5],["F4",0.5],["E4",1],["C4",1],
      ["C4",1],["G3",1],["C4",2],
      ["C4",1],["G3",1],["C4",2],
    ],
  },
  {
    id: "alegria", title: "Ode à Alegria", emoji: "🎻", level: 2, bpm: 110,
    notes: [
      ["E4",1],["E4",1],["F4",1],["G4",1],["G4",1],["F4",1],["E4",1],["D4",1],
      ["C4",1],["C4",1],["D4",1],["E4",1],["E4",1.5],["D4",0.5],["D4",2],
      ["E4",1],["E4",1],["F4",1],["G4",1],["G4",1],["F4",1],["E4",1],["D4",1],
      ["C4",1],["C4",1],["D4",1],["E4",1],["D4",1.5],["C4",0.5],["C4",2],
    ],
  },
  {
    id: "parabens", title: "Parabéns a Você", emoji: "🎂", level: 3, bpm: 110,
    notes: [
      ["C4",0.75],["C4",0.25],["D4",1],["C4",1],["F4",1],["E4",2],
      ["C4",0.75],["C4",0.25],["D4",1],["C4",1],["G4",1],["F4",2],
      ["C4",0.75],["C4",0.25],["C5",1],["A4",1],["F4",1],["E4",1],["D4",2],
      ["Bb4",0.75],["Bb4",0.25],["A4",1],["F4",1],["G4",1],["F4",2],
    ],
  },
];

/* ============================== Som ============================== */

let audioCtx = null;
let masterOut = null;

function getAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const comp = audioCtx.createDynamicsCompressor();
    const gain = audioCtx.createGain();
    gain.gain.value = 0.9;
    gain.connect(comp);
    comp.connect(audioCtx.destination);
    masterOut = gain;
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

let noiseBuf = null;

function getNoise(ctx) {
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.03), ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  }
  return noiseBuf;
}

function playNote(midi, duration = 0, velocity = 1) {
  const ctx = getAudio();
  const t = ctx.currentTime;
  const freq = 440 * Math.pow(2, (midi - 69) / 12);
  // num piano as notas graves soam mais tempo do que as agudas
  const dur = Math.max(duration, Math.max(1.2, 3.4 - (midi - 48) * 0.045));

  // filtro que "fecha": ataque brilhante, cauda suave (ao contrário de um órgão)
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(Math.min(11000, freq * 9), t);
  lp.frequency.exponentialRampToValueAtTime(Math.max(700, freq * 1.6), t + Math.min(1.2, dur * 0.6));
  const out = ctx.createGain();
  out.gain.value = velocity;
  lp.connect(out);
  out.connect(masterOut);

  // harmónicos com decaimento próprio — os agudos morrem primeiro — e leve inarmonia
  const partials = [
    [1, 0.85, 1.0], [2, 0.4, 0.62], [3, 0.16, 0.4],
    [4, 0.08, 0.3], [5, 0.05, 0.22], [6, 0.03, 0.16],
  ];
  for (const [n, amp, frac] of partials) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq * n * (1 + 0.0004 * n * n);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.33 * amp, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(0.18, dur * frac));
    osc.connect(g);
    g.connect(lp);
    osc.start(t);
    osc.stop(t + dur + 0.1);
  }

  // segunda "corda" ligeiramente desafinada dá vida ao som
  const osc2 = ctx.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.value = freq * 1.0019;
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0.0001, t);
  g2.gain.linearRampToValueAtTime(0.1, t + 0.008);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.8);
  osc2.connect(g2);
  g2.connect(lp);
  osc2.start(t);
  osc2.stop(t + dur + 0.1);

  // "martelo": estalido curto de ruído no ataque
  const noise = ctx.createBufferSource();
  noise.buffer = getNoise(ctx);
  const nf = ctx.createBiquadFilter();
  nf.type = "bandpass";
  nf.frequency.value = Math.min(8000, freq * 4);
  nf.Q.value = 0.8;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.22 * velocity, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  noise.connect(nf);
  nf.connect(ng);
  ng.connect(out);
  noise.start(t);
}

/* ==================== Ouvir um piano verdadeiro ==================== */
/* Duas vias: microfone (funciona no iPhone/iPad) e Web MIDI por cabo
   USB (Chrome/Edge em Android e PC — o Safari/iOS não suporta MIDI). */

let micStream = null;
let micAnalyser = null;
let micTimer = null;
let micBuf = null;
let micNoteOn = false;       // há uma nota a soar neste momento
let micCand = null;          // nota candidata (precisa de 2 leituras seguidas)
let micCandCount = 0;
let micLastFired = null;
let lastTouchTime = 0;       // para o microfone ignorar o som das teclas do ecrã

async function toggleMic() {
  if (micStream) { stopMic(); return; }
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      // AGC ligado: o sistema amplifica sons fracos (piano longe do telemóvel)
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: true },
    });
  } catch (err) {
    alert("Não consegui ligar o microfone 😢\nVerifica as permissões do navegador.");
    return;
  }
  micStream = stream;
  const ctx = getAudio();
  const src = ctx.createMediaStreamSource(micStream);
  const boost = ctx.createGain();
  boost.gain.value = 4; // amplificação extra para captar o piano à distância
  micAnalyser = ctx.createAnalyser();
  micAnalyser.fftSize = 2048;
  src.connect(boost);
  boost.connect(micAnalyser);
  micBuf = new Float32Array(micAnalyser.fftSize);
  micTimer = setInterval(micTick, 50);
  document.getElementById("btn-mic").classList.add("active");
}

function stopMic() {
  clearInterval(micTimer);
  micTimer = null;
  if (micStream) micStream.getTracks().forEach((t) => t.stop());
  micStream = null;
  micAnalyser = null;
  micNoteOn = false;
  micCand = null;
  micCandCount = 0;
  micLastFired = null;
  const btn = document.getElementById("btn-mic");
  btn.classList.remove("active");
  btn.style.removeProperty("--mic-level");
}

function micTick() {
  if (!micAnalyser) return;
  if (demoTimers.length) return;                  // não ouvir a demonstração
  if (Date.now() - lastTouchTime < 500) return;   // não ouvir as teclas do ecrã

  micAnalyser.getFloatTimeDomainData(micBuf);
  let rms = 0;
  for (let i = 0; i < micBuf.length; i++) rms += micBuf[i] * micBuf[i];
  rms = Math.sqrt(rms / micBuf.length);

  // anel no botão 🎤 mostra o nível de som captado
  document.getElementById("btn-mic").style.setProperty("--mic-level", Math.min(1, rms * 120).toFixed(2));

  if (rms < 0.0015) {
    // silêncio: a próxima nota (mesmo repetida) conta como novo toque
    micNoteOn = false;
    micCand = null;
    micCandCount = 0;
    return;
  }
  if (rms < 0.0025) return; // demasiado fraco para analisar com confiança

  const freq = autoCorrelate(micBuf, audioCtx.sampleRate);
  if (freq < 60 || freq > 2200) return;
  const midi = Math.round(69 + 12 * Math.log2(freq / 440));

  if (midi === micCand) micCandCount++;
  else { micCand = midi; micCandCount = 1; }

  if (micCandCount >= 2 && (!micNoteOn || midi !== micLastFired)) {
    micNoteOn = true;
    micLastFired = midi;
    onExternalNote(midi, true);
  }
}

/* Deteção de altura por autocorrelação (boa para uma nota de cada vez) */
function autoCorrelate(buf, sampleRate) {
  let size = buf.length;

  // recortar o silêncio nas pontas
  const thres = 0.2;
  let r1 = 0, r2 = size - 1;
  for (let i = 0; i < size / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break; }
  for (let i = 1; i < size / 2; i++) if (Math.abs(buf[size - i]) < thres) { r2 = size - i; break; }
  buf = buf.slice(r1, r2);
  size = buf.length;
  if (size < 64) return -1;

  const c = new Float32Array(size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - i; j++) c[i] += buf[j] * buf[j + i];
  }

  let d = 0;
  while (d < size - 1 && c[d] > c[d + 1]) d++;
  let maxval = -1, maxpos = -1;
  for (let i = d; i < size; i++) {
    if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
  }
  if (maxpos <= 0 || maxpos >= size - 1) return -1;

  // interpolação parabólica para afinar o resultado
  const x1 = c[maxpos - 1], x2 = c[maxpos], x3 = c[maxpos + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  const t0 = a ? maxpos - b / (2 * a) : maxpos;
  return sampleRate / t0;
}

/* MIDI por cabo USB (Yamaha P-145 e afins) — quando o navegador suporta */
function setupMIDI() {
  if (!navigator.requestMIDIAccess) return;
  navigator.requestMIDIAccess().then((access) => {
    const attach = () => {
      for (const input of access.inputs.values()) input.onmidimessage = onMIDIMessage;
    };
    attach();
    access.onstatechange = attach;
  }).catch(() => {});
}

function onMIDIMessage(e) {
  const [status, note, velocity] = e.data;
  if ((status & 0xf0) === 0x90 && velocity > 0) onExternalNote(note, false);
}

/* Nota vinda do piano verdadeiro (microfone ou MIDI) */
function onExternalNote(midi, tolerant) {
  const el = keysByMidi.get(midi);
  if (el) {
    el.classList.add("down");
    spawnParticle(el);
    setTimeout(() => el.classList.remove("down"), 200);
  }
  if (mode === "learn") checkLearnNote(midi, el, tolerant);
}

/* ============================== Estado ============================== */

const LABEL_STYLES = ["solfege", "letters", "none"];
let labelStyle = localStorage.getItem("piano.labels") || "solfege";

let mode = "free";          // "free" | "learn"
let song = null;
let noteIdx = 0;
let errors = 0;
let demoTimers = [];

const keysByMidi = new Map();

const $ = (id) => document.getElementById(id);

/* ============================== Teclado ============================== */

function buildKeyboard() {
  const kb = $("keyboard");
  kb.innerHTML = "";
  keysByMidi.clear();

  const whites = [];
  for (let m = LOW_MIDI; m <= HIGH_MIDI; m++) {
    if (!midiToParts(m).sharp) whites.push(m);
  }
  $("kb-inner").style.width = `calc(var(--white-key-w) * ${whites.length})`;

  whites.forEach((m) => {
    const el = document.createElement("div");
    el.className = "key white";
    el.dataset.midi = m;
    const label = document.createElement("span");
    label.className = "key-label";
    label.style.background = NOTE_COLORS[midiToParts(m).letter];
    el.appendChild(label);
    kb.appendChild(el);
    keysByMidi.set(m, el);
  });

  for (let m = LOW_MIDI; m <= HIGH_MIDI; m++) {
    if (!midiToParts(m).sharp) continue;
    const whiteIdx = whites.indexOf(m - 1); // tecla branca à esquerda
    const el = document.createElement("div");
    el.className = "key black";
    el.dataset.midi = m;
    el.style.left = `calc(var(--white-key-w) * ${whiteIdx + 1})`;
    const label = document.createElement("span");
    label.className = "key-label";
    label.style.background = "#52525b";
    el.appendChild(label);
    kb.appendChild(el);
    keysByMidi.set(m, el);
  }

  applyLabels();
}

function applyLabels() {
  for (const [midi, el] of keysByMidi) {
    const span = el.querySelector(".key-label");
    span.textContent = keyLabel(midi, labelStyle);
    span.style.visibility = labelStyle === "none" ? "hidden" : "visible";
  }
}

/* Toque (multi-touch + deslizar entre teclas) */

const pointerKeys = new Map(); // pointerId -> elemento da tecla

function keyFromPoint(x, y) {
  const el = document.elementFromPoint(x, y);
  return el ? el.closest(".key") : null;
}

function pressKey(el) {
  if (!el) return;
  lastTouchTime = Date.now();
  const midi = Number(el.dataset.midi);
  el.classList.add("down");
  playNote(midi);
  spawnParticle(el);
  if (mode === "learn") checkLearnNote(midi, el);
}

function spawnParticle(el) {
  const rect = el.getBoundingClientRect();
  const glyphs = ["🎵", "🎶", "✨", "⭐", "💜"];
  const p = document.createElement("div");
  p.className = "particle";
  p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
  p.style.left = `${rect.left + rect.width / 2 - 10 + (Math.random() * 18 - 9)}px`;
  p.style.top = `${rect.top + 16}px`;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 900);
}

function releaseKey(el) {
  if (el) el.classList.remove("down");
}

function setupInput() {
  const kb = $("keyboard");

  kb.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    const key = e.target.closest(".key");
    if (!key) return;
    pointerKeys.set(e.pointerId, key);
    pressKey(key);
  });

  kb.addEventListener("pointermove", (e) => {
    if (!pointerKeys.has(e.pointerId)) return;
    const key = keyFromPoint(e.clientX, e.clientY);
    const prev = pointerKeys.get(e.pointerId);
    if (key && key !== prev) {
      releaseKey(prev);
      pointerKeys.set(e.pointerId, key);
      pressKey(key);
    }
  });

  const end = (e) => {
    releaseKey(pointerKeys.get(e.pointerId));
    pointerKeys.delete(e.pointerId);
  };
  kb.addEventListener("pointerup", end);
  kb.addEventListener("pointercancel", end);

  // Teclado do computador: A S D F G H J K L = brancas a partir do Dó4
  const KEYMAP = {
    a: "C4", w: "C#4", s: "D4", e: "D#4", d: "E4", f: "F4", t: "F#4",
    g: "G4", y: "G#4", h: "A4", u: "A#4", j: "B4", k: "C5", o: "C#5",
    l: "D5", p: "D#5", ç: "E5", ";": "E5",
  };
  const heldKeys = new Set();
  document.addEventListener("keydown", (e) => {
    const note = KEYMAP[e.key.toLowerCase()];
    if (!note || heldKeys.has(e.key) || !$("screen-piano").classList.contains("active")) return;
    heldKeys.add(e.key);
    const el = keysByMidi.get(nameToMidi(note));
    if (el) pressKey(el);
  });
  document.addEventListener("keyup", (e) => {
    heldKeys.delete(e.key);
    const note = KEYMAP[e.key.toLowerCase()];
    if (note) releaseKey(keysByMidi.get(nameToMidi(note)));
  });
}

/* ===================== Cascata de notas (modo aprender) ===================== */

let laneEls = [];

function buildLane() {
  const lane = $("note-lane");
  lane.innerHTML = "";
  laneEls = [];
  if (!song) return;
  for (const [name] of song.notes) {
    const midi = nameToMidi(name);
    const { letter, sharp } = midiToParts(midi);
    const b = document.createElement("div");
    b.className = "lane-note";
    b.textContent = SOLFEGE[letter] + (sharp ? "♯" : "");
    b.style.background = sharp ? "#3f3f46" : NOTE_COLORS[letter];
    lane.appendChild(b);
    laneEls.push(b);
  }
  requestAnimationFrame(layoutLane);
}

function layoutLane() {
  if (!song || !laneEls.length) return;
  const laneH = $("note-lane").clientHeight || 118;
  laneEls.forEach((b, i) => {
    const rel = i - noteIdx;
    const key = keysByMidi.get(nameToMidi(song.notes[i][0]));
    b.style.left = `${key.offsetLeft + key.offsetWidth / 2}px`;
    b.classList.toggle("next", rel === 0);
    if (rel < 0) {
      // nota já tocada: cai para o teclado e desaparece
      b.style.top = `${laneH + 12}px`;
      b.style.opacity = 0;
    } else {
      b.style.top = `${laneH - 68 - rel * 44}px`;
      b.style.opacity = rel === 0 ? 1 : Math.max(0, 0.85 - rel * 0.18);
    }
  });
}

/* ===================== Modo pauta (notação musical) ===================== */

const SVGNS = "http://www.w3.org/2000/svg";
const DIATONIC = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
const STAFF_X0 = 86;
const STAFF_SPACING = 58;

let viewMode = localStorage.getItem("piano.view") || "cascade"; // "cascade" | "staff"
let staffNoteEls = [];

function svgEl(tag, attrs, parent) {
  const el = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  parent.appendChild(el);
  return el;
}

// passos diatónicos acima da linha do Mi4 (linha de baixo da pauta)
function staffStep(midi) {
  const { letter, octave } = midiToParts(midi);
  return (octave - 4) * 7 + DIATONIC[letter] - 2;
}

function buildStaff() {
  const wrap = $("staff-wrap");
  wrap.innerHTML = "";
  staffNoteEls = [];
  if (!song) return;

  const width = STAFF_X0 + song.notes.length * STAFF_SPACING + 30;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} 132`, width, height: 132 }, wrap);

  // as 5 linhas da pauta (Mi4 em baixo, Fá5 em cima)
  for (let i = 0; i < 5; i++) {
    svgEl("line", { x1: 8, y1: 30 + i * 10, x2: width - 8, y2: 30 + i * 10, class: "staff-line" }, svg);
  }
  const clef = svgEl("text", { x: 16, y: 78, class: "staff-clef" }, svg);
  clef.textContent = "𝄞";

  song.notes.forEach(([name, d], i) => {
    const midi = nameToMidi(name);
    const { letter, sharp } = midiToParts(midi);
    const x = STAFF_X0 + i * STAFF_SPACING;
    const y = 70 - staffStep(midi) * 5;
    const color = NOTE_COLORS[letter];
    const g = svgEl("g", { class: "staff-note" }, svg);

    // linhas suplementares abaixo da pauta (Dó4 e mais graves)
    for (let ly = 80; ly <= y; ly += 10) {
      svgEl("line", { x1: x - 13, y1: ly, x2: x + 13, y2: ly, class: "staff-line" }, g);
    }

    svgEl("circle", { cx: x, cy: y, r: 14, class: "staff-halo" }, g);

    // haste (mínimas e semínimas; semibreves não têm)
    if (d < 4) {
      const up = y >= 55;
      svgEl("line", {
        x1: up ? x + 7.5 : x - 7.5, y1: y,
        x2: up ? x + 7.5 : x - 7.5, y2: up ? y - 30 : y + 30,
        class: "staff-stem", stroke: color,
      }, g);
    }
    // cabeça da nota: cheia (semínima) ou vazia (mínima/semibreve)
    svgEl("ellipse", {
      cx: x, cy: y, rx: 8, ry: 5.8,
      transform: `rotate(-16 ${x} ${y})`,
      class: "staff-head",
      fill: d >= 2 ? "none" : color,
      stroke: color, "stroke-width": d >= 2 ? 2.6 : 1,
    }, g);

    if (sharp) {
      const acc = svgEl("text", { x: x - 19, y: y + 5, class: "staff-acc" }, g);
      acc.textContent = "♯";
    }
    const label = svgEl("text", { x, y: 124, class: "staff-name", fill: color }, g);
    label.textContent = SOLFEGE[letter] + (sharp ? "♯" : "");

    staffNoteEls.push(g);
  });

  updateStaff(false);
}

function updateStaff(smooth = true) {
  if (!song || !staffNoteEls.length) return;
  staffNoteEls.forEach((g, i) => {
    g.classList.toggle("played", i < noteIdx);
    g.classList.toggle("current", i === noteIdx);
  });
  const wrap = $("staff-wrap");
  const target = STAFF_X0 + Math.min(noteIdx, song.notes.length - 1) * STAFF_SPACING;
  wrap.scrollTo({ left: target - wrap.clientWidth * 0.35, behavior: smooth ? "smooth" : "auto" });
}

function refreshView() {
  const staffOn = mode === "learn" && viewMode === "staff";
  $("staff-wrap").classList.toggle("hidden", !staffOn);
  $("screen-piano").classList.toggle("staff", viewMode === "staff");
  $("btn-view").classList.toggle("active", viewMode === "staff");
  if (staffOn) updateStaff(false);
}

/* ============================== Modo aprender ============================== */

function startSong(s) {
  stopDemo();
  mode = "learn";
  song = s;
  noteIdx = 0;
  errors = 0;
  $("learn-info").classList.remove("hidden");
  $("free-title").classList.add("hidden");
  $("btn-demo").classList.remove("hidden");
  $("btn-restart").classList.remove("hidden");
  $("learn-title").textContent = `${s.emoji} ${s.title}`;
  $("btn-view").classList.remove("hidden");
  $("screen-piano").classList.remove("free");
  showScreen("piano");
  buildLane();
  buildStaff();
  refreshView();
  updateProgress();
  highlightTarget();
}

function startFree() {
  stopDemo();
  mode = "free";
  song = null;
  clearTarget();
  laneEls = [];
  $("note-lane").innerHTML = "";
  $("learn-info").classList.add("hidden");
  $("free-title").classList.remove("hidden");
  $("btn-demo").classList.add("hidden");
  $("btn-restart").classList.add("hidden");
  $("btn-view").classList.add("hidden");
  $("screen-piano").classList.add("free");
  refreshView();
  showScreen("piano");
  centerKeyboard(nameToMidi("C4"), nameToMidi("C5"));
}

function targetMidi() {
  return nameToMidi(song.notes[noteIdx][0]);
}

function clearTarget() {
  document.querySelectorAll(".key.target").forEach((k) => k.classList.remove("target"));
}

function highlightTarget() {
  clearTarget();
  const el = keysByMidi.get(targetMidi());
  el.classList.add("target");
  el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  layoutLane();
  updateStaff();
}

function updateProgress() {
  $("learn-count").textContent = `${noteIdx} / ${song.notes.length}`;
  $("progress-fill").style.width = `${(noteIdx / song.notes.length) * 100}%`;
}

function checkLearnNote(midi, el, tolerant = false) {
  if (demoTimers.length) return; // a demonstração está a tocar
  if (noteIdx >= song.notes.length) return; // música já terminada
  const target = targetMidi();
  // Com o microfone aceitamos a nota certa em qualquer oitava próxima,
  // porque a deteção de oitava nem sempre é perfeita.
  const correct = midi === target ||
    (tolerant && midi % 12 === target % 12 && Math.abs(midi - target) <= 12);
  if (correct) {
    noteIdx++;
    updateProgress();
    if (noteIdx >= song.notes.length) {
      clearTarget();
      layoutLane();
      updateStaff();
      setTimeout(finishSong, 500);
    } else {
      highlightTarget();
    }
  } else {
    errors++;
    if (el) {
      el.classList.add("wrong");
      setTimeout(() => el.classList.remove("wrong"), 350);
    }
    const staffNote = staffNoteEls[noteIdx];
    if (staffNote) {
      staffNote.classList.add("miss");
      setTimeout(() => staffNote.classList.remove("miss"), 350);
    }
  }
}

function finishSong() {
  const stars = errors <= 2 ? 3 : errors <= 6 ? 2 : 1;
  const bestKey = `piano.best.${song.id}`;
  const best = Math.max(stars, Number(localStorage.getItem(bestKey) || 0));
  localStorage.setItem(bestKey, best);

  $("celebrate-song").textContent = `${song.emoji} ${song.title}`;
  $("celebrate-stars").innerHTML = Array.from({ length: 3 }, (_, i) =>
    `<span class="star">${i < stars ? "⭐" : "☆"}</span>`
  ).join("");
  $("celebrate").classList.remove("hidden");
  throwConfetti();

  // Pequena fanfarra
  const fanfare = ["C5", "E5", "G5", "C6"];
  fanfare.forEach((n, i) => setTimeout(() => playNote(nameToMidi(n), 1.2, 0.8), i * 150));
}

function throwConfetti() {
  const emojis = ["🎉", "⭐", "🎵", "🎶", "💜", "✨"];
  for (let i = 0; i < 30; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    c.style.left = `${Math.random() * 100}vw`;
    c.style.animationDuration = `${2 + Math.random() * 2}s`;
    c.style.animationDelay = `${Math.random() * 0.8}s`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

/* Demonstração: toca a música com as teclas a acender */

function stopDemo() {
  demoTimers.forEach(clearTimeout);
  demoTimers = [];
  document.querySelectorAll(".key.demo").forEach((k) => k.classList.remove("demo"));
  $("btn-demo").classList.remove("active");
}

function playDemo() {
  if (demoTimers.length) { stopDemo(); highlightTarget(); return; }
  getAudio();
  clearTarget();
  $("btn-demo").classList.add("active");
  const beat = 60000 / song.bpm;
  let time = 300;
  for (const [name, dur] of song.notes) {
    const midi = nameToMidi(name);
    const ms = dur * beat;
    demoTimers.push(setTimeout(() => {
      const el = keysByMidi.get(midi);
      playNote(midi, Math.max(0.5, (ms / 1000) * 1.2));
      el.classList.add("demo");
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setTimeout(() => el.classList.remove("demo"), ms * 0.85);
    }, time));
    time += ms;
  }
  demoTimers.push(setTimeout(() => { stopDemo(); highlightTarget(); }, time + 300));
}

/* ============================== Ecrãs ============================== */

function showScreen(name) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(`screen-${name}`).classList.add("active");
}

function centerKeyboard(fromMidi, toMidi) {
  requestAnimationFrame(() => {
    const a = keysByMidi.get(fromMidi);
    const b = keysByMidi.get(toMidi);
    if (!a || !b) return;
    const scroll = $("kb-scroll");
    const center = (a.offsetLeft + b.offsetLeft + b.offsetWidth) / 2;
    scroll.scrollLeft = center - scroll.clientWidth / 2;
  });
}

const CARD_COLORS = [
  ["#f472b6", "#be185d"], ["#34d399", "#047857"], ["#fbbf24", "#b45309"],
  ["#38bdf8", "#0369a1"], ["#a78bfa", "#6d28d9"], ["#fb7185", "#be123c"],
];

function renderSongList() {
  const list = $("song-list");
  list.innerHTML = "";
  SONGS.forEach((s, i) => {
    const best = Number(localStorage.getItem(`piano.best.${s.id}`) || 0);
    const card = document.createElement("button");
    card.className = "song-card";
    const [c1, c2] = CARD_COLORS[i % CARD_COLORS.length];
    card.style.setProperty("--c1", c1);
    card.style.setProperty("--c2", c2);
    card.innerHTML = `
      <span class="song-emoji">${s.emoji}</span>
      <span>
        <span class="song-name">${s.title}</span>
        <span class="song-meta">${"🎵".repeat(s.level)} · ${s.notes.length} notas</span>
      </span>
      <span class="song-best">${best ? "⭐".repeat(best) : ""}</span>`;
    card.addEventListener("click", () => startSong(s));
    list.appendChild(card);
  });
}

function initBackground() {
  const bg = $("bg");
  const glyphs = ["🎵", "🎶", "♪", "♫", "⭐", "✨"];
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("span");
    s.className = "bg-note";
    s.textContent = glyphs[i % glyphs.length];
    s.style.left = `${Math.random() * 100}vw`;
    s.style.fontSize = `${1 + Math.random() * 1.6}rem`;
    s.style.animationDuration = `${9 + Math.random() * 14}s`;
    s.style.animationDelay = `${-Math.random() * 20}s`;
    bg.appendChild(s);
  }
}

/* ============================== Arranque ============================== */

function init() {
  initBackground();
  buildKeyboard();
  setupInput();
  window.addEventListener("resize", layoutLane);

  $("btn-free").addEventListener("click", startFree);
  $("btn-learn").addEventListener("click", () => { renderSongList(); showScreen("songs"); });
  document.querySelectorAll("[data-goto]").forEach((b) =>
    b.addEventListener("click", () => {
      if (b.dataset.goto === "home") stopMic();
      showScreen(b.dataset.goto);
    })
  );
  $("btn-back-piano").addEventListener("click", () => {
    stopDemo();
    if (mode === "learn") {
      renderSongList();
      showScreen("songs"); // o microfone fica ligado para a próxima música
    } else {
      stopMic();
      showScreen("home");
    }
  });
  $("btn-restart").addEventListener("click", () => startSong(song));
  $("btn-demo").addEventListener("click", playDemo);
  $("btn-mic").addEventListener("click", toggleMic);
  $("btn-view").addEventListener("click", () => {
    viewMode = viewMode === "staff" ? "cascade" : "staff";
    localStorage.setItem("piano.view", viewMode);
    refreshView();
    if (mode === "learn") layoutLane();
  });
  $("btn-labels").addEventListener("click", () => {
    labelStyle = LABEL_STYLES[(LABEL_STYLES.indexOf(labelStyle) + 1) % LABEL_STYLES.length];
    localStorage.setItem("piano.labels", labelStyle);
    applyLabels();
  });
  $("btn-again").addEventListener("click", () => {
    $("celebrate").classList.add("hidden");
    startSong(song);
  });
  $("btn-more-songs").addEventListener("click", () => {
    $("celebrate").classList.add("hidden");
    renderSongList();
    showScreen("songs");
  });

  // Desbloquear o áudio no primeiro toque (iOS)
  document.addEventListener("pointerdown", getAudio, { once: true });

  setupMIDI();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

init();
