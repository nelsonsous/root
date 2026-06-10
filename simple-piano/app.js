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

function playNote(midi, duration = 1.6, velocity = 1) {
  const ctx = getAudio();
  const t = ctx.currentTime;
  const freq = 440 * Math.pow(2, (midi - 69) / 12);
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.linearRampToValueAtTime(0.4 * velocity, t + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  env.connect(masterOut);

  // Tom "tipo piano": fundamental + harmónicos a desvanecer
  const partials = [
    [1, 1.0, "triangle"],
    [2, 0.28, "sine"],
    [3, 0.10, "sine"],
  ];
  for (const [mult, amp, type] of partials) {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq * mult;
    const g = ctx.createGain();
    g.gain.value = amp;
    osc.connect(g);
    g.connect(env);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  }
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
  kb.style.width = `calc(var(--white-key-w) * ${whites.length})`;

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
  const midi = Number(el.dataset.midi);
  el.classList.add("down");
  playNote(midi);
  if (mode === "learn") checkLearnNote(midi, el);
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
  showScreen("piano");
  updateProgress();
  highlightTarget();
}

function startFree() {
  stopDemo();
  mode = "free";
  song = null;
  clearTarget();
  $("learn-info").classList.add("hidden");
  $("free-title").classList.remove("hidden");
  $("btn-demo").classList.add("hidden");
  $("btn-restart").classList.add("hidden");
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
}

function updateProgress() {
  $("learn-count").textContent = `${noteIdx} / ${song.notes.length}`;
  $("progress-fill").style.width = `${(noteIdx / song.notes.length) * 100}%`;
}

function checkLearnNote(midi, el) {
  if (demoTimers.length) return; // a demonstração está a tocar
  if (noteIdx >= song.notes.length) return; // música já terminada
  if (midi === targetMidi()) {
    noteIdx++;
    updateProgress();
    if (noteIdx >= song.notes.length) {
      clearTarget();
      setTimeout(finishSong, 500);
    } else {
      highlightTarget();
    }
  } else {
    errors++;
    el.classList.add("wrong");
    setTimeout(() => el.classList.remove("wrong"), 350);
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

function renderSongList() {
  const list = $("song-list");
  list.innerHTML = "";
  for (const s of SONGS) {
    const best = Number(localStorage.getItem(`piano.best.${s.id}`) || 0);
    const card = document.createElement("button");
    card.className = "song-card";
    card.innerHTML = `
      <span class="song-emoji">${s.emoji}</span>
      <span>
        <span class="song-name">${s.title}</span>
        <span class="song-meta">${"🎵".repeat(s.level)} · ${s.notes.length} notas</span>
      </span>
      <span class="song-best">${best ? "⭐".repeat(best) : ""}</span>`;
    card.addEventListener("click", () => startSong(s));
    list.appendChild(card);
  }
}

/* ============================== Arranque ============================== */

function init() {
  buildKeyboard();
  setupInput();

  $("btn-free").addEventListener("click", startFree);
  $("btn-learn").addEventListener("click", () => { renderSongList(); showScreen("songs"); });
  document.querySelectorAll("[data-goto]").forEach((b) =>
    b.addEventListener("click", () => showScreen(b.dataset.goto))
  );
  $("btn-back-piano").addEventListener("click", () => {
    stopDemo();
    showScreen(mode === "learn" ? "songs" : "home");
    if (mode === "learn") renderSongList();
  });
  $("btn-restart").addEventListener("click", () => startSong(song));
  $("btn-demo").addEventListener("click", playDemo);
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

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

init();
