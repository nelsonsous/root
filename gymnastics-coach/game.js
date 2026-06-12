/* ============================================================
   Estrelas da Ginástica — jogo da professora de ginástica
   ============================================================ */
'use strict';

const $ = id => document.getElementById(id);

/* ===================== DADOS ===================== */

const SKINS = ['#f6d7b8', '#e8b98c', '#b97a4e', '#7c4a26'];
const HAIRCOLORS = [
  { nome: 'Castanho', c: '#5b3a1e' },
  { nome: 'Preto', c: '#26221f' },
  { nome: 'Loiro', c: '#d9a441' },
  { nome: 'Ruivo', c: '#b4502a' },
  { nome: 'Fantasia', c: '#7b6cd9' },
];
const HAIRSTYLES = [
  { id: 'coque', nome: 'Coque' },
  { id: 'rabo', nome: 'Rabo de cavalo' },
  { id: 'trancas', nome: 'Tranças' },
  { id: 'curto', nome: 'Curto' },
  { id: 'solto', nome: 'Solto' },
];
const ROUPAS = [
  { nome: 'Rosa', c: '#e84d8a' },
  { nome: 'Roxo', c: '#7b4dbf' },
  { nome: 'Azul', c: '#2f6fd6' },
  { nome: 'Verde', c: '#2faa6e' },
  { nome: 'Vermelho', c: '#d6372f' },
  { nome: 'Turquesa', c: '#19b5b0' },
  { nome: 'Dourado', c: '#d4a017' },
  { nome: 'Preto', c: '#26262b' },
];
const PATTERNS = [
  { id: 'liso', nome: 'Liso' },
  { id: 'brilho', nome: 'Brilhantes' },
  { id: 'faixa', nome: 'Faixa' },
];
const ACCS = [
  { id: 'nenhum', nome: 'Nenhum' },
  { id: 'laco', nome: 'Laço' },
  { id: 'bandolete', nome: 'Bandolete' },
  { id: 'flor', nome: 'Flor' },
];

const MOVES = [
  { id: 'salto',     nome: 'Salto em Extensão',  emoji: '⬆️', dif: 0.6, tier: 0, desc: 'Salta bem alto com o corpo esticado.' },
  { id: 'rolamento', nome: 'Rolamento à Frente', emoji: '🔄', dif: 0.8, tier: 0, desc: 'Enrola o corpo e rebola para a frente.' },
  { id: 'ponte',     nome: 'Ponte',              emoji: '🌉', dif: 1.0, tier: 0, desc: 'Deitada, empurra o chão e arqueia a barriga para o céu.' },
  { id: 'aranha',    nome: 'Aranha',             emoji: '🕷️', dif: 1.2, tier: 0, desc: 'De pé, dobra para trás até as mãos chegarem ao chão.' },
  { id: 'vela',      nome: 'Vela',               emoji: '🕯️', dif: 1.3, tier: 1, desc: 'Deitada, pernas bem esticadas para o céu.' },
  { id: 'levantar',  nome: 'Levantar da Ponte',  emoji: '💪', dif: 1.5, tier: 1, requires: 'ponte', desc: 'Da ponte, volta a ficar de pé sem ajuda.' },
  { id: 'aviao',     nome: 'Avião',              emoji: '✈️', dif: 1.4, tier: 1, desc: 'Equilíbrio numa perna com os braços abertos.' },
  { id: 'espargata', nome: 'Espargata',          emoji: '🤸', dif: 1.8, tier: 2, desc: 'Desliza com as pernas abertas até ao chão.' },
  { id: 'roda',      nome: 'Roda',               emoji: '⭐', dif: 2.2, tier: 2, desc: 'Gira de lado como uma estrela.' },
  { id: 'pino',      nome: 'Pino',               emoji: '🙃', dif: 2.6, tier: 3, desc: 'Equilíbrio sobre as mãos, de pernas para o ar.' },
];
const MOVE = Object.fromEntries(MOVES.map(m => [m.id, m]));

const TIERS = [
  { nome: 'Competição da Escola',     escalao: 'Infantis',  idades: '6-8 anos',   semanas: 4, slots: 3, rivais: ['Escola da Quinta', 'Escola do Mar'] },
  { nome: 'Campeonato da Cidade',     escalao: 'Iniciadas', idades: '9-10 anos',  semanas: 3, slots: 3, rivais: ['Clube Estrela', 'Ginásio Central'] },
  { nome: 'Campeonato Regional',      escalao: 'Juvenis',   idades: '11-12 anos', semanas: 4, slots: 4, rivais: ['Académica do Norte', 'Clube Arco-Íris'] },
  { nome: 'Campeonato Nacional',      escalao: 'Juniores',  idades: '13-14 anos', semanas: 4, slots: 4, rivais: ['Sporting de Elite', 'Ginástica Atlântico'] },
  { nome: 'Campeonato Internacional', escalao: 'Seniores',  idades: '15+ anos',   semanas: 5, slots: 5, rivais: ['Equipa da Roménia', 'Equipa dos EUA'] },
];

const FLAWS = [
  { id: 'joelhos',    txt: 'Joelhos dobrados',    fix: 'Estica bem os joelhos e aponta os pés!' },
  { id: 'bracos',     txt: 'Braços caídos',       fix: 'Braços fortes e bem esticados!' },
  { id: 'amplitude',  txt: 'Pouca amplitude',     fix: 'Vai mais longe — mais amplitude no movimento!' },
  { id: 'equilibrio', txt: 'Falta de equilíbrio', fix: 'Aperta a barriga e fixa o olhar num ponto!' },
];

const IDADE_BASE = [7, 7, 8];

/* ===================== POSES E ANIMAÇÕES =====================
   Ângulos em graus: 0 = frente (direita), 90 = cima.
   hipY = altura da anca acima do chão (unidades de figura).     */

const LEN = { torso: 28, neckHead: 12, head: 7, uarm: 16, larm: 14, thigh: 23, shin: 22, foot: 5 };

const P_STAND = {
  hipX: 0, hipY: 45, rot: 0, torso: 90, head: 90,
  auF: -75, alF: -80, auB: -105, alB: -100,
  ltF: -90, lsF: -90, ltB: -87, lsB: -87,
};
const ARMS_UP = { auF: 80, alF: 85, auB: 100, alB: 95 };
const LIE = {
  hipX: -4, hipY: 7, torso: 178, head: 182,
  auF: 150, alF: 200, auB: 155, alB: 205,
  ltF: 55, lsF: -95, ltB: 60, lsB: -95,
};
const BRIDGE = {
  hipX: 0, hipY: 27, torso: 207, head: 218,
  auF: -165, alF: -120, auB: -160, alB: -118,
  ltF: -22, lsF: -70, ltB: -26, lsB: -72,
};
const CROUCH = {
  hipY: 20, torso: 55, head: 45,
  auF: 25, alF: 10, auB: 20, alB: 5,
  ltF: -8, lsF: -118, ltB: -6, lsB: -116,
};
const TUCK = {
  hipY: 15, torso: 60, head: 25,
  auF: -30, alF: -130, auB: -35, alB: -135,
  ltF: -25, lsF: -150, ltB: -22, lsB: -148,
};
const STAR = {
  torso: 90, head: 90,
  auF: 135, alF: 135, auB: 45, alB: 45,
  ltF: -60, lsF: -60, ltB: -120, lsB: -120,
};
const HANDSTAND = {
  hipY: 56, torso: -88, head: -60,
  auF: -93, alF: -93, auB: -85, alB: -85,
  ltF: 86, lsF: 88, ltB: 94, lsB: 96,
};
const SPLIT = {
  hipY: 9, torso: 92, head: 90,
  auF: 10, alF: 5, auB: 170, alB: 175,
  ltF: -10, lsF: -6, ltB: 188, lsB: 186,
};
const VELA_P = {
  hipX: -6, hipY: 32, torso: -95, head: 165,
  auF: -135, alF: -175, auB: -130, alB: -170,
  ltF: 90, lsF: 88, ltB: 94, lsB: 92,
};

const ANIMS = {
  ponte: [
    [0, {}], [0.16, LIE], [0.4, BRIDGE], [0.62, BRIDGE], [0.8, LIE], [1, {}],
  ],
  aranha: [
    [0, {}], [0.12, ARMS_UP],
    [0.3, { torso: 135, head: 160, hipY: 42, hipX: 4, auF: 150, alF: 160, auB: 155, alB: 165, ltF: -85, lsF: -80, ltB: -82, lsB: -78 }],
    [0.5, { torso: 175, head: 195, hipY: 35, hipX: 2, auF: -175, alF: -150, auB: -172, alB: -148, ltF: -65, lsF: -72, ltB: -62, lsB: -70 }],
    [0.62, BRIDGE], [0.78, BRIDGE],
    [0.92, ARMS_UP], [1, {}],
  ],
  levantar: [
    [0, BRIDGE], [0.2, Object.assign({}, BRIDGE, { hipX: 6, hipY: 30 })],
    [0.5, { torso: 140, head: 150, hipY: 40, hipX: 4, auF: 140, alF: 150, auB: 145, alB: 155, ltF: -80, lsF: -72, ltB: -78, lsB: -70 }],
    [0.72, ARMS_UP], [1, {}],
  ],
  rolamento: [
    [0, {}], [0.18, CROUCH],
    [0.32, Object.assign({}, TUCK, { rot: -60, hipX: 4 })],
    [0.55, Object.assign({}, TUCK, { rot: -220, hipX: 10 })],
    [0.72, Object.assign({}, CROUCH, { rot: -360, hipX: 16 })],
    [1, { rot: -360, hipX: 16 }],
  ],
  salto: [
    [0, {}],
    [0.22, { hipY: 32, torso: 75, head: 80, auF: -150, alF: -145, auB: -155, alB: -150, ltF: -70, lsF: -115, ltB: -68, lsB: -113 }],
    [0.42, Object.assign({ hipY: 80, torso: 92, head: 90, ltF: -90, lsF: -92, ltB: -88, lsB: -90 }, ARMS_UP)],
    [0.55, Object.assign({ hipY: 78, torso: 92, head: 90, ltF: -90, lsF: -92, ltB: -88, lsB: -90 }, ARMS_UP)],
    [0.74, { hipY: 32, torso: 78, head: 82, auF: 0, alF: -10, auB: -5, alB: -15, ltF: -70, lsF: -115, ltB: -68, lsB: -113 }],
    [1, {}],
  ],
  aviao: [
    [0, {}], [0.25, { auF: 5, alF: 0, auB: 175, alB: 180 }],
    [0.5, { torso: 35, head: 30, auF: 5, alF: 0, auB: 175, alB: 180, ltB: 155, lsB: 160, ltF: -88, lsF: -88 }],
    [0.78, { torso: 35, head: 30, auF: 5, alF: 0, auB: 175, alB: 180, ltB: 155, lsB: 160, ltF: -88, lsF: -88 }],
    [1, {}],
  ],
  vela: [
    [0, {}], [0.2, LIE], [0.45, VELA_P], [0.72, VELA_P], [0.86, LIE], [1, {}],
  ],
  espargata: [
    [0, {}], [0.2, { auF: 10, alF: 5, auB: 170, alB: 175 }],
    [0.52, SPLIT], [0.78, SPLIT], [1, {}],
  ],
  roda: [
    [0, {}],
    [0.15, Object.assign({}, STAR, { rot: 0, hipY: 45 })],
    [0.3, Object.assign({}, STAR, { rot: -90, hipY: 52, hipX: 6 })],
    [0.5, Object.assign({}, STAR, { rot: -180, hipY: 56, hipX: 12 })],
    [0.7, Object.assign({}, STAR, { rot: -270, hipY: 52, hipX: 18 })],
    [0.85, Object.assign({}, STAR, { rot: -360, hipY: 45, hipX: 24 })],
    [1, { rot: -360, hipX: 24 }],
  ],
  pino: [
    [0, {}], [0.14, ARMS_UP],
    [0.3, { torso: 50, head: 40, hipY: 38, auF: -20, alF: -30, auB: -15, alB: -25, ltB: 130, lsB: 132, ltF: -80, lsF: -75 }],
    [0.5, HANDSTAND], [0.68, HANDSTAND],
    [0.85, { torso: 50, head: 40, hipY: 38, auF: -20, alF: -30, auB: -15, alB: -25, ltB: 130, lsB: 132, ltF: -80, lsF: -75 }],
    [1, {}],
  ],
};

const ANIM_DUR = {
  ponte: 4200, aranha: 4600, levantar: 3400, rolamento: 3000, salto: 2400,
  aviao: 3600, vela: 4200, espargata: 3800, roda: 3200, pino: 3800,
};

const POSE_KEYS = Object.keys(P_STAND);

// pré-normaliza keyframes: cada frame fica com a pose completa
const NORM_ANIMS = {};
for (const [id, frames] of Object.entries(ANIMS)) {
  NORM_ANIMS[id] = frames.map(([t, p]) => [t, Object.assign({}, P_STAND, p)]);
}

function ease(t) { return t * t * (3 - 2 * t); }

function samplePose(animId, t) {
  const frames = NORM_ANIMS[animId];
  t = Math.max(0, Math.min(1, t));
  let i = 0;
  while (i < frames.length - 2 && t > frames[i + 1][0]) i++;
  const [t0, p0] = frames[i];
  const [t1, p1] = frames[i + 1];
  const k = ease(t1 > t0 ? (t - t0) / (t1 - t0) : 0);
  const out = {};
  for (const key of POSE_KEYS) out[key] = p0[key] + (p1[key] - p0[key]) * k;
  return out;
}

function applyFlaw(pose, flawId, sev, now) {
  if (!flawId || sev <= 0) return pose;
  const p = Object.assign({}, pose);
  const lerp = (a, b, k) => a + (b - a) * k;
  if (flawId === 'joelhos') {
    p.lsF += 30 * sev; p.lsB += 30 * sev;
  } else if (flawId === 'bracos') {
    p.auF = lerp(p.auF, -75, 0.55 * sev); p.alF = lerp(p.alF, -85, 0.55 * sev);
    p.auB = lerp(p.auB, -100, 0.55 * sev); p.alB = lerp(p.alB, -105, 0.55 * sev);
  } else if (flawId === 'amplitude') {
    for (const key of POSE_KEYS) {
      if (key === 'rot' || key === 'hipX') continue;
      p[key] = lerp(p[key], P_STAND[key], 0.42 * sev);
    }
  } else if (flawId === 'equilibrio') {
    p.rot += Math.sin(now / 55) * 8 * sev;
  }
  return p;
}

/* ===================== DESENHO ===================== */

function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * f);
  const g = Math.round(((n >> 8) & 255) * f);
  const b = Math.round((n & 255) * f);
  return `rgb(${r},${g},${b})`;
}

function lookColors(look) {
  return {
    skin: SKINS[look.skin],
    hair: HAIRCOLORS[look.hairColor].c,
    roupa: ROUPAS[look.leo].c,
    hairStyle: HAIRSTYLES[look.hair].id,
    pattern: PATTERNS[look.pattern].id,
    acc: ACCS[look.acc].id,
  };
}

function computeJoints(P, x, gy, s) {
  const rot = P.rot || 0;
  const RAD = Math.PI / 180;
  const pt = (p, a, len) => {
    const r = (a + rot) * RAD;
    return [p[0] + Math.cos(r) * len * s, p[1] - Math.sin(r) * len * s];
  };
  const hip = [x + P.hipX * s, gy - P.hipY * s];
  const sh = pt(hip, P.torso, LEN.torso);
  const headC = pt(sh, P.head, LEN.neckHead);
  const elbF = pt(sh, P.auF, LEN.uarm), handF = pt(elbF, P.alF, LEN.larm);
  const elbB = pt(sh, P.auB, LEN.uarm), handB = pt(elbB, P.alB, LEN.larm);
  const kneF = pt(hip, P.ltF, LEN.thigh), footF = pt(kneF, P.lsF, LEN.shin), toeF = pt(footF, P.lsF + 78, LEN.foot);
  const kneB = pt(hip, P.ltB, LEN.thigh), footB = pt(kneB, P.lsB, LEN.shin), toeB = pt(footB, P.lsB + 78, LEN.foot);
  return { pt, hip, sh, headC, elbF, handF, elbB, handB, kneF, footF, toeF, kneB, footB, toeB };
}

function drawFigure(ctx, x, gy, s, poseIn, look, now) {
  const P = Object.assign({}, P_STAND, poseIn);
  const C = lookColors(look);
  const { pt, hip, sh, headC, elbF, handF, elbB, handB, kneF, footF, toeF, kneB, footB, toeB } =
    computeJoints(P, x, gy, s);
  const RAD = Math.PI / 180;

  const seg = (pts, w, col) => {
    ctx.strokeStyle = col; ctx.lineWidth = w * s;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();
  };
  const dot = (p, r, col) => {
    ctx.fillStyle = col; ctx.beginPath();
    ctx.arc(p[0], p[1], r * s, 0, Math.PI * 2); ctx.fill();
  };

  const skinB = shade(C.skin, 0.82);
  const roupaB = shade(C.roupa, 0.8);
  const coach = !!look.coach;
  const legColF = coach ? C.roupa : C.skin;
  const legColB = coach ? roupaB : skinB;
  const legW = coach ? 7 : 5.2;

  // membros de trás
  seg([sh, elbB, handB], coach ? 6.5 : 4.6, coach ? roupaB : skinB);
  seg([hip, kneB, footB, toeB], legW, legColB);

  // cabelo de trás
  if (C.hairStyle === 'solto') {
    dot(pt(headC, P.head + 165, 5), 7.5, shade(C.hair, 0.85));
    dot(pt(headC, P.head + 195, 7), 6.5, shade(C.hair, 0.85));
  } else if (C.hairStyle === 'rabo') {
    const base = pt(headC, P.head + 135, LEN.head * 0.95);
    const tip = pt(base, P.head + 235, 13);
    seg([base, tip], 3.4, C.hair);
    dot(base, 2.6, C.hair);
  } else if (C.hairStyle === 'trancas') {
    const b1 = pt(headC, P.head + 155, LEN.head * 0.9);
    const b2 = pt(headC, P.head + 25, LEN.head * 0.9);
    seg([b1, pt(b1, P.head + 250, 11)], 2.8, C.hair);
    seg([b2, pt(b2, P.head + 290, 11)], 2.8, C.hair);
  }

  // tronco (roupa de ginástica / fato de treino)
  seg([hip, sh], 10, C.roupa);
  dot(hip, 5.6, C.roupa);
  if (!coach) dot(pt(hip, P.torso, 6), 5.2, C.roupa);

  // padrão da roupa
  if (C.pattern === 'brilho') {
    const tw = 0.6 + 0.4 * Math.sin((now || 0) / 180);
    ctx.fillStyle = `rgba(255,255,255,${0.55 + 0.35 * tw})`;
    for (let i = 0; i < 4; i++) {
      const p = pt(hip, P.torso, 5 + i * 6);
      ctx.beginPath();
      ctx.arc(p[0] + (i % 2 ? 2 : -2) * s, p[1], 1.1 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (C.pattern === 'faixa') {
    const m1 = pt(hip, P.torso, 13), m2 = pt(hip, P.torso, 19);
    seg([[m1[0] - 4 * s, m1[1]], [m2[0] + 4 * s, m2[1]]], 2.2, '#ffffff');
  }
  if (coach) { // risca branca do fato de treino
    seg([pt(hip, P.torso, 2), pt(hip, P.torso, 26)], 1.6, '#ffffff');
  }

  // perna da frente
  seg([hip, kneF, footF, toeF], legW, legColF);

  // cabeça
  dot(headC, LEN.head, C.skin);

  // cabelo de cima
  dot(pt(headC, P.head + 40, 2.5), 6.4, C.hair);
  if (C.hairStyle === 'coque') dot(pt(headC, P.head + 125, LEN.head * 1.15), 3.6, C.hair);
  if (C.hairStyle === 'curto') dot(pt(headC, P.head + 95, 3), 5.2, C.hair);

  // adereços
  if (C.acc === 'laco') {
    const b = pt(headC, P.head + 118, LEN.head * 1.2);
    ctx.fillStyle = '#ff5e8a';
    ctx.beginPath();
    ctx.moveTo(b[0], b[1]);
    ctx.lineTo(b[0] - 4.5 * s, b[1] - 3 * s);
    ctx.lineTo(b[0] - 4.5 * s, b[1] + 3 * s);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(b[0], b[1]);
    ctx.lineTo(b[0] + 4.5 * s, b[1] - 3 * s);
    ctx.lineTo(b[0] + 4.5 * s, b[1] + 3 * s);
    ctx.closePath(); ctx.fill();
    dot(b, 1.5, '#d63d72');
  } else if (C.acc === 'bandolete') {
    const a = pt(headC, P.head + 140, LEN.head * 0.95);
    const b = pt(headC, P.head + 40, LEN.head * 0.95);
    seg([a, b], 1.8, '#ffffff');
  } else if (C.acc === 'flor') {
    const f = pt(headC, P.head + 55, LEN.head * 0.95);
    for (let i = 0; i < 5; i++) {
      const a = i * 72 * RAD;
      dot([f[0] + Math.cos(a) * 2.2 * s, f[1] + Math.sin(a) * 2.2 * s], 1.6, '#ffb6d0');
    }
    dot(f, 1.5, '#ffd24d');
  }

  // cara
  dot(pt(headC, P.head - 55, 3.8), 0.9, '#3a2a3f');
  const mouth = pt(headC, P.head - 95, 4.2);
  ctx.strokeStyle = '#3a2a3f'; ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.arc(mouth[0], mouth[1], 1.8 * s, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();

  // braço da frente
  seg([sh, elbF, handF], coach ? 6.5 : 4.6, coach ? C.roupa : C.skin);
  if (coach) dot(pt(sh, P.torso - 160, 5), 1.8, '#ffd24d'); // apito
}

function drawGymBg(ctx, w, h, label) {
  const gy = h - 34;
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#fdeef6');
  grad.addColorStop(1, '#f3e7fb');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  // janelas
  ctx.fillStyle = 'rgba(255,255,255,.65)';
  for (let i = 0; i < 3; i++) ctx.fillRect(60 + i * (w / 3), 18, 70, 34);
  // faixa do campeonato
  if (label) {
    ctx.fillStyle = '#7b4dbf';
    ctx.font = 'bold 15px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏵 ' + label + ' 🏵', w / 2, 14);
  }
  // chão
  ctx.fillStyle = '#e8d9c4';
  ctx.fillRect(0, gy, w, h - gy);
  // colchão
  ctx.fillStyle = '#7ec8e3';
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(40, gy - 8, w - 80, 14, 7);
  else ctx.rect(40, gy - 8, w - 80, 14);
  ctx.fill();
  return gy - 8; // linha de apoio (em cima do colchão)
}

/* ===================== MOTOR DE ANIMAÇÃO ===================== */

let activeRaf = null;
function stopLoop() {
  if (activeRaf) { cancelAnimationFrame(activeRaf); activeRaf = null; }
}
function startLoop(fn) {
  stopLoop();
  const tick = now => { fn(now); activeRaf = requestAnimationFrame(tick); };
  activeRaf = requestAnimationFrame(tick);
}

/* Reproduz uma sequência de movimentos numa tela.
   items: [{anim, q, flaw, nome}]  */
function playSequence(canvas, items, look, opts, onDone) {
  opts = opts || {};
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  let idx = 0;
  let start = null;
  let finished = false;

  startLoop(now => {
    if (start === null) start = now;
    if (finished) return;
    let it = items[idx];
    const dur = (ANIM_DUR[it.anim] || 3000) * (opts.speed || 1);
    let t = (now - start) / dur;
    if (t >= 1) {
      idx++;
      if (idx >= items.length) {
        finished = true;
        renderFrame(items[items.length - 1], 1, now);
        stopLoop();
        if (onDone) onDone();
        return;
      }
      start = now; t = 0; it = items[idx];
    }
    renderFrame(it, t, now);
  });

  function renderFrame(it, t, now) {
    ctx.clearRect(0, 0, w, h);
    const gy = drawGymBg(ctx, w, h, opts.banner);
    // professora a observar
    if (opts.coachLook) {
      drawFigure(ctx, 90, gy, 2.0, P_STAND, opts.coachLook, now);
      ctx.fillStyle = '#7a6a86';
      ctx.font = '12px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(opts.coachName || 'Professora', 90, gy + 24);
    }
    let pose = samplePose(it.anim, t);
    const sev = Math.min(1, Math.max(0, (1 - (it.q == null ? 1 : it.q)) * 1.25));
    pose = applyFlaw(pose, it.flaw, sev, now);
    const ax = opts.coachLook ? w * 0.55 : w * 0.5;
    drawFigure(ctx, ax, gy, 2.0, pose, look, now);
    ctx.fillStyle = '#7b4dbf';
    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    if (it.nome) ctx.fillText(it.nome + (items.length > 1 ? `  (${idx + 1}/${items.length})` : ''), ax, gy + 24);
    if (opts.caption) {
      ctx.fillStyle = '#b06aa0';
      ctx.font = '13px "Segoe UI", sans-serif';
      ctx.fillText(opts.caption, w / 2, h - 4);
    }
  }
}

/* ===================== ESTADO ===================== */

const SAVE_KEY = 'estrelas-ginastica-save';
let state = null;

function defaultLook(i) {
  const base = [
    { skin: 0, hair: 0, hairColor: 0, leo: 0, pattern: 1, acc: 1 },
    { skin: 1, hair: 1, hairColor: 1, leo: 2, pattern: 0, acc: 0 },
    { skin: 2, hair: 2, hairColor: 2, leo: 1, pattern: 2, acc: 2 },
  ];
  return Object.assign({}, base[i % base.length]);
}

function newGame(coachName) {
  return {
    pontos: 0, evolucao: 0, tier: 0, week: 1, trofeus: [],
    coach: { nome: coachName || 'Professora Ana', look: Object.assign(defaultLook(1), { coach: true, leo: 1, acc: 0 }) },
    atletas: [
      { id: 0, nome: 'Beatriz', look: defaultLook(0), fel: 75, ene: 100, skills: {}, acted: false },
      { id: 1, nome: 'Matilde', look: defaultLook(1), fel: 75, ene: 100, skills: {}, acted: false },
      { id: 2, nome: 'Sofia',   look: defaultLook(2), fel: 75, ene: 100, skills: {}, acted: false },
    ],
    choreo: {},
  };
}

function save() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) { /* sem armazenamento */ }
}
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const idadeDe = a => IDADE_BASE[a.id % 3] + state.tier * 2;
const skillDe = (a, mId) => a.skills[mId] || 0;
const felMedia = () => Math.round(state.atletas.reduce((s, a) => s + a.fel, 0) / state.atletas.length);

function movesDisponiveis() {
  return MOVES.filter(m => m.tier <= state.tier);
}

/* ===================== ECRÃS ===================== */

function show(id) {
  stopLoop();
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  $(id).classList.remove('hidden');
  $('hud').classList.toggle('hidden', id === 'screen-menu' || !state);
  updateHUD();
}

function updateHUD() {
  if (!state) return;
  const T = TIERS[state.tier];
  $('hud-coach').textContent = '👩‍🏫 ' + state.coach.nome;
  $('hud-tier').textContent = `${T.nome} · ${T.escalao} (${T.idades})`;
  $('hud-week').textContent = state.week <= T.semanas ? `Semana ${state.week}/${T.semanas}` : '🏆 Competição!';
  $('hud-points').textContent = `⭐ ${state.pontos}`;
}

/* ---------- Menu ---------- */

function initMenu() {
  $('btn-continue').disabled = !load();
  $('btn-new').onclick = () => {
    state = newGame($('inp-coach-name').value.trim() || 'Professora Ana');
    save();
    showGym('Bem-vinda, ' + state.coach.nome + '! Vamos treinar para a ' + TIERS[0].nome + '.');
  };
  $('btn-continue').onclick = () => {
    const s = load();
    if (s) { state = s; showGym('Bem-vinda de volta!'); }
  };
}

/* ---------- Ginásio (hub) ---------- */

function showGym(msg) {
  show('screen-gym');
  $('gym-message').textContent = msg || '';
  renderGymCanvas();
  renderCards();
  const T = TIERS[state.tier];
  const compReady = state.week > T.semanas;
  $('btn-endweek').classList.toggle('hidden', compReady);
  $('btn-competition').classList.toggle('hidden', !compReady);
  if (compReady) $('gym-message').textContent = msg || `Chegou a semana da ${T.nome}! Prepara as coreografias. 🎵`;
  $('btn-wardrobe').onclick = () => showCustom();
  $('btn-endweek').onclick = endWeek;
  $('btn-competition').onclick = () => showChoreo();
}

function renderGymCanvas() {
  const cv = $('cv-gym');
  const ctx = cv.getContext('2d');
  startLoop(now => {
    ctx.clearRect(0, 0, cv.width, cv.height);
    const gy = drawGymBg(ctx, cv.width, cv.height, TIERS[state.tier].nome);
    const wave = Math.sin(now / 400) * 8;
    drawFigure(ctx, 100, gy, 1.9, Object.assign({}, P_STAND, { auF: -70 + wave * 0.4 }), state.coach.look, now);
    ctx.fillStyle = '#7a6a86'; ctx.font = '12px "Segoe UI", sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(state.coach.nome, 100, gy + 22);
    state.atletas.forEach((a, i) => {
      const x = 280 + i * 180;
      const breathe = Math.sin(now / 500 + i * 2) * 2;
      const pose = i === 1
        ? Object.assign({}, P_STAND, { auF: 75 + breathe, alF: 80 + breathe })
        : Object.assign({}, P_STAND, { auF: -75 + breathe, auB: -105 - breathe });
      drawFigure(ctx, x, gy, 1.7, pose, a.look, now);
      ctx.fillStyle = '#7a6a86';
      ctx.fillText(`${a.nome}, ${idadeDe(a)} anos`, x, gy + 22);
    });
  });
}

function renderCards() {
  const box = $('athlete-cards');
  box.innerHTML = '';
  const T = TIERS[state.tier];
  const compReady = state.week > T.semanas;
  state.atletas.forEach(a => {
    const card = document.createElement('div');
    card.className = 'card';
    const tops = movesDisponiveis()
      .filter(m => skillDe(a, m.id) > 0)
      .sort((x, y) => skillDe(a, y.id) - skillDe(a, x.id))
      .slice(0, 3)
      .map(m => `${m.emoji} ${m.nome}: ${skillDe(a, m.id)}%`)
      .join(' · ') || 'Ainda não aprendeu movimentos';
    card.innerHTML = `
      <h3>${a.nome} <span class="age">${idadeDe(a)} anos · ${T.escalao}</span></h3>
      <div class="bar-label">😊 Felicidade ${a.fel}%</div>
      <div class="bar fel"><div style="width:${a.fel}%"></div></div>
      <div class="bar-label">⚡ Energia ${a.ene}%</div>
      <div class="bar ene"><div style="width:${a.ene}%"></div></div>
      <div class="skill-mini">${tops}</div>
    `;
    const actions = document.createElement('div');
    actions.className = 'actions';
    if (compReady) {
      actions.innerHTML = '<span class="done-tag">Pronta para a competição! 🏆</span>';
    } else if (a.acted) {
      actions.innerHTML = '<span class="done-tag">✓ Já fez a atividade desta semana</span>';
    } else {
      const bT = document.createElement('button');
      bT.textContent = '🤸 Treinar';
      bT.disabled = a.ene < 25;
      bT.title = a.ene < 25 ? 'Demasiado cansada para treinar!' : '';
      bT.onclick = () => showMoves(a);
      const bD = document.createElement('button');
      bD.textContent = '🛏 Descansar';
      bD.onclick = () => {
        a.ene = clamp(a.ene + 40, 0, 100);
        a.fel = clamp(a.fel + 8, 0, 100);
        a.acted = true; save();
        showGym(`${a.nome} descansou e recuperou energia. 💤`);
      };
      const bE = document.createElement('button');
      bE.textContent = '💖 Elogiar';
      bE.onclick = () => {
        a.fel = clamp(a.fel + 14, 0, 100);
        a.acted = true; save();
        showGym(`Disseste à ${a.nome} que ela está a fazer um ótimo trabalho! 💖`);
      };
      actions.append(bT, bD, bE);
    }
    card.appendChild(actions);
    box.appendChild(card);
  });
}

function endWeek() {
  state.atletas.forEach(a => {
    a.acted = false;
    a.ene = clamp(a.ene + 15, 0, 100);
    a.fel = clamp(a.fel - 3, 0, 100);
  });
  state.week++;
  save();
  const T = TIERS[state.tier];
  showGym(state.week > T.semanas ? '' : `Nova semana de treinos! (${state.week}/${T.semanas})`);
}

/* ---------- Escolher movimento ---------- */

let trainingCtx = null; // {atleta, move, attempts, best}

function showMoves(atleta) {
  show('screen-moves');
  $('moves-title').textContent = `O que vai a ${atleta.nome} treinar?`;
  const list = $('move-list');
  list.innerHTML = '';
  movesDisponiveis().forEach(m => {
    const sk = skillDe(atleta, m.id);
    const locked = m.requires && skillDe(atleta, m.requires) < 25;
    const div = document.createElement('div');
    div.className = 'move-item' + (locked ? ' locked' : '');
    div.innerHTML = `
      <h4>${m.emoji} ${m.nome}</h4>
      <div class="dif">Dificuldade ${m.dif.toFixed(1)}</div>
      <div class="desc">${m.desc}</div>
      ${locked ? `<div class="desc">🔒 Primeiro aprende bem: ${MOVE[m.requires].nome}</div>` : ''}
      <div class="bar"><div style="width:${sk}%"></div></div>
      <div class="bar-label">Nível: ${sk}%</div>
    `;
    if (!locked) div.onclick = () => startTraining(atleta, m);
    list.appendChild(div);
  });
  $('btn-moves-back').onclick = () => showGym();
}

/* ---------- Treino: demonstra o movimento com o dedo ---------- */

const TRACE_S = 2.0;       // escala da figura no treino
const TRACE_R = 30;        // raio para "apanhar" o ponto seguinte
let trace = null;          // estado do tracado da tentativa atual

function buildTracePath(animId, cx, gy, s) {
  const raw = [];
  for (let i = 0; i <= 80; i++) {
    const t = i / 80;
    const J = computeJoints(Object.assign({}, P_STAND, samplePose(animId, t)), cx, gy, s);
    raw.push({ t, x: J.headC[0], y: J.headC[1] });
  }
  // simplifica: mantem pontos com pelo menos 12px de distancia
  const pts = [raw[0]];
  for (const p of raw) {
    const l = pts[pts.length - 1];
    if (Math.hypot(p.x - l.x, p.y - l.y) >= 12) pts.push(p);
  }
  const last = raw[raw.length - 1];
  if (pts[pts.length - 1] !== last) pts.push(last);
  return pts;
}

function startTraining(atleta, move) {
  trainingCtx = { atleta, move, attempts: 0, best: null };
  show('screen-training');
  $('tr-title').textContent = `Demonstra à ${atleta.nome}: ${move.emoji} ${move.nome}`;
  $('tr-instr').classList.remove('hidden');
  $('tr-result').classList.add('hidden');
  setupTrace();
}

function setupTrace() {
  const tc = trainingCtx;
  const cv = $('cv-training');
  const w = cv.width, h = cv.height;
  const gy = h - 42; // mesmo nivel devolvido por drawGymBg
  const cx = w * 0.55;
  trace = {
    pts: buildTracePath(tc.move.id, cx, gy, TRACE_S),
    idx: 0, displayT: 0, dragging: false, finished: false,
    devSum: 0, devCount: 0, breaks: 0,
  };
  window.__trace = trace; // usado pelo teste e2e
  const toCanvas = e => {
    const r = cv.getBoundingClientRect();
    return [(e.clientX - r.left) * w / r.width, (e.clientY - r.top) * h / r.height];
  };
  const handleMove = e => {
    const t = trace;
    if (t.finished) return;
    const [px, py] = toCanvas(e);
    let guard = 0;
    while (t.idx < t.pts.length - 1 && guard++ < 8 &&
           Math.hypot(px - t.pts[t.idx + 1].x, py - t.pts[t.idx + 1].y) < TRACE_R) {
      t.idx++;
    }
    let dmin = Infinity;
    for (let k = Math.max(0, t.idx - 1); k <= Math.min(t.pts.length - 1, t.idx + 3); k++) {
      dmin = Math.min(dmin, Math.hypot(px - t.pts[k].x, py - t.pts[k].y));
    }
    t.devSum += dmin; t.devCount++;
    if (t.idx >= t.pts.length - 1) finishAttempt();
  };
  cv.onpointerdown = e => {
    if (trace.finished) return;
    trace.dragging = true;
    cv.setPointerCapture(e.pointerId);
    handleMove(e);
  };
  cv.onpointermove = e => { if (trace.dragging) handleMove(e); };
  cv.onpointerup = () => {
    if (trace.dragging) {
      trace.dragging = false;
      if (!trace.finished && trace.idx > 0) trace.breaks++;
    }
  };

  const ctx = cv.getContext('2d');
  startLoop(now => {
    ctx.clearRect(0, 0, w, h);
    drawGymBg(ctx, w, h, 'Treino · ' + tc.move.nome);
    const t = trace;
    // a atleta acompanha a demonstracao da professora
    const targetT = t.pts[t.idx].t;
    t.displayT += (targetT - t.displayT) * 0.18;
    drawFigure(ctx, cx, gy, TRACE_S, samplePose(tc.move.id, t.displayT), tc.atleta.look, now);
    // caminho pontilhado
    for (let i = 0; i < t.pts.length; i++) {
      ctx.fillStyle = i <= t.idx ? '#e84d8a' : '#c9b6e4';
      ctx.beginPath();
      ctx.arc(t.pts[i].x, t.pts[i].y, i <= t.idx ? 4 : 3, 0, Math.PI * 2);
      ctx.fill();
    }
    // estrela no fim e marcador atual (a "mao" da professora)
    const end = t.pts[t.pts.length - 1];
    ctx.font = '20px serif'; ctx.textAlign = 'center';
    ctx.fillText('⭐', end.x, end.y + 7);
    if (!t.finished) {
      const cur = t.pts[t.idx];
      const pulse = 8 + Math.sin(now / 200) * 2;
      ctx.strokeStyle = '#e84d8a'; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cur.x, cur.y, pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#b06aa0';
      ctx.font = '13px "Segoe UI", sans-serif';
      ctx.fillText(t.idx === 0 ? 'Começa aqui! Arrasta até à ⭐' : 'Continua até à ⭐…', w / 2, h - 4);
    }
    ctx.fillStyle = '#7a6a86';
    ctx.font = '12px "Segoe UI", sans-serif';
    ctx.fillText(tc.atleta.nome, cx, gy + 24);
  });
}

function finishAttempt() {
  const tc = trainingCtx;
  const t = trace;
  t.finished = true;
  tc.attempts++;
  const avg = t.devSum / Math.max(1, t.devCount);
  let score = clamp(1 - (avg - 8) / 36, 0, 1) - t.breaks * 0.08;
  score = clamp(score, 0, 1);
  const q = clamp(0.25 + 0.7 * score + skillDe(tc.atleta, tc.move.id) / 1000, 0.05, 0.98);
  const stars = clamp(Math.round(q * 5 + 0.3), 1, 5);
  const attempt = { stars, q, breaks: t.breaks };
  if (!tc.best || stars > tc.best.stars || (stars === tc.best.stars && q > tc.best.q)) tc.best = attempt;

  $('tr-instr').classList.add('hidden');
  $('tr-result').classList.remove('hidden');
  const starsTxt = n => '⭐'.repeat(n) + '☆'.repeat(5 - n);
  const feedback =
    stars >= 5 ? '🤩 Demonstração perfeita! Os juízes adoraram!' :
    stars === 4 ? '👏 Muito boa demonstração!' :
    stars === 3 ? '🙂 Boa, mas dá para fazer melhor.' :
    stars === 2 ? '😅 Saíste muitas vezes do caminho…' :
    '🫣 Foi difícil de acompanhar — tenta seguir o caminho com mais calma.';
  $('tr-result-text').innerHTML = `
    Os juízes avaliaram a tua demonstração: <b>${starsTxt(stars)}</b><br>
    ${feedback}
    ${t.breaks ? `<br><small>(levantaste o dedo ${t.breaks}x — tenta fazer tudo seguido)</small>` : ''}
    ${tc.attempts > 1 ? `<br><small>Conta a melhor das tentativas: ${starsTxt(tc.best.stars)}</small>` : ''}
  `;
  $('btn-retry').classList.toggle('hidden', tc.attempts >= 2);
  $('btn-retry').onclick = () => {
    $('tr-result').classList.add('hidden');
    $('tr-instr').classList.remove('hidden');
    setupTrace();
  };
  $('btn-tr-done').onclick = applyTraining;
}

function applyTraining() {
  const tc = trainingCtx;
  const a = tc.atleta;
  const starsMult = [0.45, 0.65, 0.9, 1.15, 1.4][tc.best.stars - 1];
  const cansada = a.fel < 35 ? 0.6 : 1;
  const gain = Math.max(2, Math.round((9 + state.tier * 2.5) * starsMult * cansada * (0.85 + Math.random() * 0.3)));
  const antes = skillDe(a, tc.move.id);
  // a primeira sessao garante sempre o nivel basico do movimento
  a.skills[tc.move.id] = clamp(antes === 0 ? Math.max(antes + gain, 15) : antes + gain, 0, 100);
  const subiu = skillDe(a, tc.move.id) - antes;
  a.ene = clamp(a.ene - 30, 0, 100);
  const felDelta = tc.best.stars >= 4 ? 6 : tc.best.stars === 3 ? 2 : -3;
  a.fel = clamp(a.fel + felDelta, 0, 100);
  a.acted = true;
  state.evolucao += gain;
  state.pontos += Math.round(gain / 2);
  save();
  showGym(`${a.nome} ${antes === 0 ? 'aprendeu' : 'treinou'} ${tc.move.nome}: +${subiu}% (agora ${skillDe(a, tc.move.id)}%). ` +
    `Felicidade ${felDelta >= 0 ? '+' : ''}${felDelta}. +${Math.round(gain / 2)} Pontos de Professora! ⭐`);
}

/* ---------- Vestiário ---------- */

let customSel = 0; // 0 = professora, 1.. = atletas

function personAt(i) {
  return i === 0 ? state.coach : state.atletas[i - 1];
}

function showCustom() {
  show('screen-custom');
  customSel = 0;
  renderCustomTabs();
  renderCustomOptions();
  renderCustomPreview();
  $('btn-custom-done').onclick = () => { save(); showGym('Que equipa tão elegante! ✨'); };
}

function renderCustomTabs() {
  const tabs = $('custom-tabs');
  tabs.innerHTML = '';
  ['👩‍🏫 ' + state.coach.nome, ...state.atletas.map(a => '🤸 ' + a.nome)].forEach((nm, i) => {
    const b = document.createElement('button');
    b.textContent = nm;
    b.classList.toggle('active', i === customSel);
    b.onclick = () => { customSel = i; renderCustomTabs(); renderCustomOptions(); };
    tabs.appendChild(b);
  });
  const p = personAt(customSel);
  $('inp-person-name').value = p.nome;
  $('inp-person-name').oninput = e => {
    p.nome = e.target.value || p.nome;
    renderCustomTabs();
  };
}

function renderCustomOptions() {
  const p = personAt(customSel);
  const look = p.look;
  const box = $('custom-options');
  box.innerHTML = '';
  $('inp-person-name').value = p.nome;

  const group = (label, render) => {
    const g = document.createElement('div');
    g.className = 'opt-group';
    g.innerHTML = `<div class="opt-label">${label}</div>`;
    const row = document.createElement('div');
    row.className = 'opt-row';
    render(row);
    g.appendChild(row);
    box.appendChild(g);
  };
  const swatches = (row, colors, key) => {
    colors.forEach((c, i) => {
      const b = document.createElement('button');
      b.className = 'swatch' + (look[key] === i ? ' active' : '');
      b.style.background = c.c || c;
      b.title = c.nome || '';
      b.onclick = () => { look[key] = i; renderCustomOptions(); };
      row.appendChild(b);
    });
  };
  const chips = (row, items, key) => {
    items.forEach((it, i) => {
      const b = document.createElement('button');
      b.className = 'opt-chip' + (look[key] === i ? ' active' : '');
      b.textContent = it.nome;
      b.onclick = () => { look[key] = i; renderCustomOptions(); };
      row.appendChild(b);
    });
  };

  group('Tom de pele', row => swatches(row, SKINS, 'skin'));
  group(customSel === 0 ? 'Cor do fato de treino' : 'Cor do maillot de ginástica', row => swatches(row, ROUPAS, 'leo'));
  if (customSel !== 0) group('Padrão do maillot', row => chips(row, PATTERNS, 'pattern'));
  group('Penteado', row => chips(row, HAIRSTYLES, 'hair'));
  group('Cor do cabelo', row => swatches(row, HAIRCOLORS, 'hairColor'));
  group('Adereço no cabelo', row => chips(row, ACCS, 'acc'));
}

function renderCustomPreview() {
  const cv = $('cv-custom');
  const ctx = cv.getContext('2d');
  startLoop(now => {
    ctx.clearRect(0, 0, cv.width, cv.height);
    const grad = ctx.createLinearGradient(0, 0, 0, cv.height);
    grad.addColorStop(0, '#fff3fa');
    grad.addColorStop(1, '#f1e6fb');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = '#e8d9c4';
    ctx.fillRect(0, cv.height - 26, cv.width, 26);
    const p = personAt(customSel);
    const wave = Math.sin(now / 350);
    const pose = Object.assign({}, P_STAND, {
      auF: 60 + wave * 14, alF: 75 + wave * 14,
      head: 90 + wave * 2,
    });
    drawFigure(ctx, cv.width / 2, cv.height - 26, 3.0, pose, p.look, now);
    ctx.fillStyle = '#7b4dbf';
    ctx.font = 'bold 15px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(p.nome, cv.width / 2, cv.height - 6);
  });
}

/* ---------- Coreografia ---------- */

let choreoSel = 0;

function showChoreo() {
  show('screen-choreo');
  choreoSel = 0;
  const T = TIERS[state.tier];
  $('choreo-title').textContent = `🎵 Coreografias para ${T.nome}`;
  state.atletas.forEach(a => {
    if (!state.choreo[a.id]) state.choreo[a.id] = [];
    state.choreo[a.id] = state.choreo[a.id].filter(id => skillDe(a, id) >= 15).slice(0, T.slots);
  });
  renderChoreoTabs();
  renderChoreo();
  $('btn-choreo-back').onclick = () => { state.week = T.semanas + 1; showGym(); };
  $('btn-preview').onclick = previewChoreo;
  $('btn-start-comp').onclick = startCompetition;
}

function renderChoreoTabs() {
  const tabs = $('choreo-tabs');
  tabs.innerHTML = '';
  state.atletas.forEach((a, i) => {
    const T = TIERS[state.tier];
    const n = (state.choreo[a.id] || []).length;
    const b = document.createElement('button');
    b.textContent = `${a.nome} (${n}/${T.slots})`;
    b.classList.toggle('active', i === choreoSel);
    b.onclick = () => { choreoSel = i; renderChoreoTabs(); renderChoreo(); };
    tabs.appendChild(b);
  });
}

function renderChoreo() {
  const a = state.atletas[choreoSel];
  const T = TIERS[state.tier];
  const seq = state.choreo[a.id];
  $('choreo-seq-title').textContent = `Coreografia da ${a.nome} (${seq.length}/${T.slots} movimentos)`;

  const avail = $('choreo-available');
  avail.innerHTML = '';
  const aprendidos = movesDisponiveis().filter(m => skillDe(a, m.id) >= 15);
  if (!aprendidos.length) avail.innerHTML = '<i>Esta atleta ainda precisa de treinar (nível mínimo 15%).</i>';
  aprendidos.forEach(m => {
    const used = seq.includes(m.id);
    const full = seq.length >= T.slots;
    const c = document.createElement('div');
    c.className = 'chip' + (used || full ? ' disabled' : '');
    c.innerHTML = `${m.emoji} ${m.nome} <span class="lvl">${skillDe(a, m.id)}% · D${m.dif.toFixed(1)}</span>`;
    if (!used && !full) c.onclick = () => { seq.push(m.id); save(); renderChoreoTabs(); renderChoreo(); };
    avail.appendChild(c);
  });

  const seqBox = $('choreo-sequence');
  seqBox.innerHTML = seq.length ? '' : '<i>Escolhe os movimentos ao lado, pela ordem da coreografia.</i>';
  seq.forEach((id, i) => {
    const m = MOVE[id];
    const c = document.createElement('div');
    c.className = 'chip seq-chip';
    c.innerHTML = `${i + 1}º ${m.emoji} ${m.nome} ✕`;
    c.title = 'Clica para remover';
    c.onclick = () => { seq.splice(i, 1); save(); renderChoreoTabs(); renderChoreo(); };
    seqBox.appendChild(c);
  });

  const dTotal = seq.reduce((s, id) => s + MOVE[id].dif, 0);
  $('choreo-difficulty').textContent = `Dificuldade total: ${dTotal.toFixed(1)}`;
  // mínimo 2 movimentos por atleta; mais movimentos = nota mais alta
  $('btn-start-comp').disabled = !state.atletas.every(at => (state.choreo[at.id] || []).length >= Math.min(2, T.slots));
}

function previewChoreo() {
  const a = state.atletas[choreoSel];
  const seq = state.choreo[a.id];
  if (!seq.length) return;
  const cv = $('cv-choreo');
  cv.classList.remove('hidden');
  const items = seq.map(id => ({
    anim: id, nome: MOVE[id].nome,
    q: clamp(0.3 + skillDe(a, id) / 100 * 0.7, 0, 1), flaw: null,
  }));
  playSequence(cv, items, a.look, { banner: 'Ensaio · ' + a.nome }, null);
}

/* ---------- Competição ---------- */

function notaAtleta(a) {
  const seq = state.choreo[a.id];
  let nota = 0;
  for (const id of seq) {
    nota += MOVE[id].dif * (3 + 7 * skillDe(a, id) / 100) * (0.95 + Math.random() * 0.1);
  }
  return nota * (0.88 + a.fel / 100 * 0.24);
}

function notaRival(tier, fator) {
  const T = TIERS[tier];
  const difs = MOVES.filter(m => m.tier <= tier).map(m => m.dif).sort((x, y) => y - x).slice(0, T.slots);
  const d = difs.reduce((s, v) => s + v, 0);
  const skill = 30 + tier * 9;
  return d * (3 + 7 * skill / 100) * fator * (0.92 + Math.random() * 0.16);
}

async function startCompetition() {
  const T = TIERS[state.tier];
  show('screen-competition');
  $('comp-title').textContent = `🏆 ${T.nome} — Escalão ${T.escalao}`;
  $('comp-scores').innerHTML = '';
  $('btn-comp-next').classList.add('hidden');
  const status = $('comp-status');
  const cv = $('cv-comp');

  const notas = [];
  for (const a of state.atletas) {
    status.textContent = `Em pista: ${a.nome}! 🎵`;
    const seq = state.choreo[a.id];
    const items = seq.map(id => {
      const q = clamp(0.25 + skillDe(a, id) / 100 * 0.65 + (a.fel - 50) / 400, 0.05, 1);
      return {
        anim: id, nome: MOVE[id].nome, q,
        flaw: q < 0.55 ? FLAWS[Math.floor(Math.random() * FLAWS.length)].id : null,
      };
    });
    await new Promise(res => playSequence(cv, items, a.look,
      { banner: T.nome, speed: 0.85, coachLook: state.coach.look, coachName: state.coach.nome }, res));
    const nota = notaAtleta(a);
    notas.push(nota);
    addScoreRow(`🤸 ${a.nome}`, nota.toFixed(2));
    await sleep(700);
  }

  const equipa = notas.reduce((s, v) => s + v, 0) / notas.length;
  const rivais = T.rivais.map((nome, i) => ({ nome, nota: notaRival(state.tier, i === 0 ? 1.0 : 0.93) }));
  status.textContent = 'E agora… as outras equipas! 🥁';
  await sleep(900);
  rivais.forEach(r => addScoreRow('🏫 ' + r.nome, r.nota.toFixed(2)));
  await sleep(600);
  addScoreRow('💜 A tua equipa', equipa.toFixed(2), true);

  const tabela = [{ nome: 'A tua equipa', nota: equipa, nossa: true }, ...rivais.map(r => ({ nome: r.nome, nota: r.nota }))]
    .sort((x, y) => y.nota - x.nota);
  const lugar = tabela.findIndex(t => t.nossa) + 1;
  const premio = lugar === 1 ? 60 + state.tier * 20 : lugar === 2 ? 25 : 10;
  const bonusFel = Math.round(felMedia() / 5);
  state.pontos += premio + bonusFel;

  const medalha = lugar === 1 ? '🥇' : lugar === 2 ? '🥈' : '🥉';
  status.innerHTML = `${medalha} Ficaram em <b>${lugar}º lugar</b>! ` +
    `+${premio} pontos de competição, +${bonusFel} pontos pela felicidade da equipa (${felMedia()}%).`;

  const btn = $('btn-comp-next');
  btn.classList.remove('hidden');

  if (lugar === 1) {
    state.trofeus.push(`${medalha} ${T.nome} (${T.escalao})`);
    if (state.tier >= TIERS.length - 1) {
      btn.textContent = '🎆 Ver a grande festa final!';
      btn.onclick = () => { save(); showFinal(); };
    } else {
      state.tier++;
      state.week = 1;
      state.choreo = {};
      state.atletas.forEach(a => { a.ene = 100; a.fel = clamp(a.fel + 10, 0, 100); a.acted = false; });
      btn.textContent = `Subir de escalão: ${TIERS[state.tier].escalao}! →`;
      btn.onclick = () => {
        save();
        showGym(`🎉 Venceram! As atletas subiram para ${TIERS[state.tier].escalao} (${TIERS[state.tier].idades}). Novos movimentos desbloqueados!`);
      };
    }
  } else {
    state.week = Math.max(1, T.semanas - 1);
    state.atletas.forEach(a => { a.ene = 100; a.fel = clamp(a.fel - 8, 0, 100); a.acted = false; });
    btn.textContent = 'Voltar aos treinos 💪';
    btn.onclick = () => {
      save();
      showGym(`Ficaram em ${lugar}º. Anima a equipa e treinem mais — para a próxima é vossa!`);
    };
  }
  save();
}

function addScoreRow(nome, nota, team) {
  const row = document.createElement('div');
  row.className = 'score-row' + (team ? ' team' : '');
  row.innerHTML = `<span>${nome}</span><span class="pts">${nota}</span>`;
  $('comp-scores').appendChild(row);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- Final ---------- */

function showFinal() {
  show('screen-final');
  const titulo =
    state.pontos >= 600 ? '🌟 Treinadora Lendária!' :
    state.pontos >= 450 ? '🥇 Treinadora de Ouro!' :
    state.pontos >= 300 ? '🥈 Treinadora de Prata!' :
    '🌱 Treinadora Promissora!';
  $('final-title').textContent = '🏅 Campeãs Internacionais!';
  $('final-text').innerHTML = `
    <p>A equipa da <b>${state.coach.nome}</b> chegou ao topo do mundo da ginástica! 🤸‍♀️✨</p>
    <p class="trophy-line">🏆 Troféus conquistados:<br>${state.trofeus.map(t => '&nbsp;&nbsp;' + t).join('<br>') || '—'}</p>
    <p>📈 Evolução total das atletas: <b>${state.evolucao}%</b><br>
    😊 Felicidade final da equipa: <b>${felMedia()}%</b><br>
    ⭐ Pontos de Professora: <b>${state.pontos}</b></p>
    <p style="font-size:1.2rem;text-align:center"><b>${titulo}</b></p>
  `;
  $('btn-final-menu').onclick = () => {
    localStorage.removeItem(SAVE_KEY);
    state = null;
    show('screen-menu');
    initMenu();
  };
}

/* ===================== ARRANQUE ===================== */

initMenu();
show('screen-menu');
