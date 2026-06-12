/* =====================================================================
   Treinadora de Voleibol — Liga das Escolas Secundárias de Portugal
   És o treinador ou a treinadora: ensinas passe, manchete, remate e
   trabalho de equipa a 16 raparigas da secundária. Cinco dias de treino,
   depois jogo numa cidade de Portugal. Cada vitória vale uma medalha!
   ===================================================================== */

"use strict";

/* ============================ DADOS FIXOS ============================ */

const CHAVE_SAVE = "treinadora-voleibol-save-v1";

const GENEROS = [
  { id: "F", nome: "Treinadora" },
  { id: "M", nome: "Treinador" },
];

const PELES = [
  { id: "clara",   cor: "#f6d7c4" },
  { id: "media",   cor: "#eebd9a" },
  { id: "morena",  cor: "#cf9468" },
  { id: "castanha",cor: "#9c6b43" },
  { id: "escura",  cor: "#5d4030" },
];

const OLHOS = [
  { id: "castanhos", nome: "Castanhos", cor: "#5b3a1e" },
  { id: "azuis",     nome: "Azuis",     cor: "#3b7bd4" },
  { id: "verdes",    nome: "Verdes",    cor: "#3f8f4e" },
  { id: "mel",       nome: "Mel",       cor: "#b8852f" },
  { id: "cinzentos", nome: "Cinzentos", cor: "#7d8a96" },
];

const CABELO_ESTILOS = [
  { id: "curto",    nome: "Curto" },
  { id: "medio",    nome: "Médio" },
  { id: "comprido", nome: "Comprido" },
  { id: "apanhado", nome: "Apanhado" },
];

const CABELO_CORES = [
  { id: "preto",    nome: "Preto",           cor: "#1c1a18" },
  { id: "castanho", nome: "Castanho",        cor: "#5a3a22" },
  { id: "claro",    nome: "Castanho-claro",  cor: "#8a5f33" },
  { id: "loiro",    nome: "Loiro",           cor: "#d8b25c" },
  { id: "ruivo",    nome: "Ruivo",           cor: "#a8502a" },
];

const ROUPAS = [
  { id: "fato",     nome: "Fato de treino" },
  { id: "polo",     nome: "Polo e calças" },
  { id: "camisola", nome: "Camisola do clube" },
];

const ROUPA_CORES = [
  { id: "verde",    nome: "Verde do clube", cor: "#1b7a43" },
  { id: "preto",    nome: "Preto",          cor: "#22262a" },
  { id: "branco",   nome: "Branco",         cor: "#e9ece9" },
  { id: "azul",     nome: "Azul",           cor: "#27548f" },
  { id: "vermelho", nome: "Vermelho",       cor: "#8d2f2f" },
];

// As 16 jogadoras: raparigas da secundária (15 a 17 anos).
const PLANTEL_BASE = [
  { nome: "Matilde Sousa",     pos: "Levantadora", idade: 16 },
  { nome: "Leonor Almeida",    pos: "Levantadora", idade: 15 },
  { nome: "Beatriz Costa",     pos: "Oposta",      idade: 17 },
  { nome: "Carolina Martins",  pos: "Oposta",      idade: 16 },
  { nome: "Mariana Silva",     pos: "Central",     idade: 16 },
  { nome: "Inês Ferreira",     pos: "Central",     idade: 17 },
  { nome: "Francisca Lopes",   pos: "Central",     idade: 15 },
  { nome: "Sofia Rodrigues",   pos: "Central",     idade: 16 },
  { nome: "Margarida Santos",  pos: "Ponta",       idade: 17 },
  { nome: "Joana Pereira",     pos: "Ponta",       idade: 16 },
  { nome: "Lara Gomes",        pos: "Ponta",       idade: 15 },
  { nome: "Camila Fernandes",  pos: "Ponta",       idade: 16 },
  { nome: "Diana Marques",     pos: "Ponta",       idade: 17 },
  { nome: "Rita Oliveira",     pos: "Ponta",       idade: 15 },
  { nome: "Marta Gonçalves",   pos: "Líbero",      idade: 16 },
  { nome: "Catarina Alves",    pos: "Líbero",      idade: 17 },
];

// A digressão: 8 cidades de Portugal, da mais fácil à grande final.
const CIDADES = [
  { nome: "Aveiro",    equipa: "Estudantes da Ria",        pavilhao: "Pavilhão da Ria",          forca: 33 },
  { nome: "Coimbra",   equipa: "Académica Jovem",          pavilhao: "Pavilhão do Mondego",      forca: 40 },
  { nome: "Évora",     equipa: "Juventude Alentejana",     pavilhao: "Pavilhão das Muralhas",    forca: 46 },
  { nome: "Faro",      equipa: "Ondas do Algarve",         pavilhao: "Pavilhão do Sul",          forca: 52 },
  { nome: "Braga",     equipa: "Minho Vólei Clube",        pavilhao: "Pavilhão do Sameiro",      forca: 58 },
  { nome: "Guimarães", equipa: "Berço Vólei Juvenil",      pavilhao: "Pavilhão do Castelo",      forca: 64 },
  { nome: "Porto",     equipa: "Invicta Vólei Escolar",    pavilhao: "Pavilhão da Invicta",      forca: 70 },
  { nome: "Lisboa",    equipa: "Atlético Escolar de Lisboa", pavilhao: "Pavilhão da Capital",    forca: 76 },
];

const EXERCICIOS = [
  {
    id: "passe", icone: "🙌", nome: "Passe",
    desc: "Toque de dedos: ensinar a posição das mãos e a colocar a bola.",
    instrucao: "As jogadoras fazem passes em pares. Apita no momento certo para corrigir a técnica!",
  },
  {
    id: "manchete", icone: "💪", nome: "Manchete",
    desc: "Receção com os antebraços: a base da defesa.",
    instrucao: "Lanças bolas difíceis e elas defendem de manchete. Apita no momento certo!",
  },
  {
    id: "remate", icone: "💥", nome: "Remate",
    desc: "Aproximação, salto e ataque por cima da rede.",
    instrucao: "Fila de remates na ponta. Apita quando a chamada estiver perfeita!",
  },
  {
    id: "equipa", icone: "🤝", nome: "Trabalho de equipa",
    desc: "Jogo 6x6 de treino: comunicação, posições e confiança.",
    instrucao: "Treino jogado entre as 16. Apita no momento certo para parar e explicar!",
  },
  {
    id: "descanso", icone: "🧘", nome: "Recuperação",
    desc: "Alongamentos e descanso para recuperar energia.",
    instrucao: "Sessão calma de alongamentos. Apita com calma, ao ritmo da respiração.",
  },
];

const DIAS_SEMANA = ["2.ª feira", "3.ª feira", "4.ª feira", "5.ª feira", "6.ª feira"];
const SESSOES_POR_DIA = 2;

/* ============================ ESTADO ============================ */

let estado = null;       // estado do jogo guardado
let jogo = null;         // estado temporário do jogo (partida) em curso
let minijogo = null;     // estado do mini-jogo do apito
let escolhaTitulares = new Set();
let subEscolha = { sai: null, entra: null };

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function novaJogadora(base, indice) {
  // Estatísticas iniciais conforme a posição natural de cada rapariga.
  const perfis = {
    Levantadora: { passe: [45, 58], manchete: [30, 42], remate: [24, 36] },
    "Líbero":    { passe: [32, 44], manchete: [46, 58], remate: [20, 30] },
    Oposta:      { passe: [26, 38], manchete: [27, 39], remate: [46, 58] },
    Ponta:       { passe: [28, 40], manchete: [34, 46], remate: [40, 52] },
    Central:     { passe: [28, 40], manchete: [28, 40], remate: [38, 50] },
  };
  const p = perfis[base.pos];
  return {
    id: indice,
    numero: indice + 1,
    nome: base.nome,
    pos: base.pos,
    idade: base.idade,
    passe: aleatorio(p.passe[0], p.passe[1]),
    manchete: aleatorio(p.manchete[0], p.manchete[1]),
    remate: aleatorio(p.remate[0], p.remate[1]),
    equipa: aleatorio(22, 38),
    energia: 100,
  };
}

function novoEstado() {
  return {
    treinador: {
      nome: "",
      genero: "F",
      pele: PELES[1].id,
      olhos: OLHOS[0].id,
      cabeloEstilo: "comprido",
      cabeloCor: CABELO_CORES[1].id,
      roupa: "fato",
      roupaCor: "verde",
    },
    jogadoras: PLANTEL_BASE.map(novaJogadora),
    dia: 1,            // 1..5 — depois do 5.º dia é dia de jogo
    sessao: 1,         // 1..SESSOES_POR_DIA
    cidadeIdx: 0,
    epoca: 1,
    medalhas: [],      // { cidade, epoca }
    vitorias: 0,
    derrotas: 0,
  };
}

function guardar() {
  try {
    localStorage.setItem(CHAVE_SAVE, JSON.stringify(estado));
  } catch (e) { /* sem espaço ou modo privado — o jogo continua sem guardar */ }
}

function carregar() {
  try {
    const bruto = localStorage.getItem(CHAVE_SAVE);
    return bruto ? JSON.parse(bruto) : null;
  } catch (e) {
    return null;
  }
}

/* ============================ NAVEGAÇÃO ============================ */

function mostrarEcra(id) {
  document.querySelectorAll(".ecra").forEach((e) => e.classList.remove("ativo"));
  document.getElementById(id).classList.add("ativo");
  window.scrollTo(0, 0);
}

const $ = (id) => document.getElementById(id);

/* ============================ AVATAR SVG ============================ */

function corDe(lista, id) {
  const item = lista.find((x) => x.id === id);
  return item ? item.cor : lista[0].cor;
}

function svgAvatar(t) {
  const pele = corDe(PELES, t.pele);
  const olhos = corDe(OLHOS, t.olhos);
  const cabelo = corDe(CABELO_CORES, t.cabeloCor);
  const roupa = t.roupa === "camisola" ? "#1b7a43" : corDe(ROUPA_CORES, t.roupaCor);

  // Cabelo atrás da cabeça (para estilos compridos)
  let cabeloTras = "";
  if (t.cabeloEstilo === "comprido") {
    cabeloTras = `<path d="M58 86 Q56 150 66 170 L134 170 Q144 150 142 86 Z" fill="${cabelo}"/>`;
  } else if (t.cabeloEstilo === "medio") {
    cabeloTras = `<path d="M60 86 Q58 122 66 132 L134 132 Q142 122 140 86 Z" fill="${cabelo}"/>`;
  }

  // Roupa: fato de treino (fecho), polo (colarinho) ou camisola do clube (riscas)
  let detalheRoupa = "";
  if (t.roupa === "fato") {
    detalheRoupa = `
      <line x1="100" y1="160" x2="100" y2="226" stroke="#ffffff" stroke-width="3"/>
      <path d="M52 176 L74 162" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      <path d="M148 176 L126 162" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>`;
  } else if (t.roupa === "polo") {
    detalheRoupa = `
      <path d="M88 156 L100 174 L112 156 Z" fill="#ffffff"/>
      <circle cx="100" cy="182" r="2.5" fill="#ffffff"/>
      <circle cx="100" cy="192" r="2.5" fill="#ffffff"/>`;
  } else {
    detalheRoupa = `
      <rect x="48" y="196" width="104" height="8" fill="#ffffff"/>
      <rect x="48" y="208" width="104" height="8" fill="#15181a"/>`;
  }

  // Cabelo à frente (franja / topo)
  let cabeloFrente = "";
  if (t.cabeloEstilo === "curto") {
    cabeloFrente = `<path d="M58 84 Q58 42 100 42 Q142 42 142 84 Q128 58 100 58 Q72 58 58 84 Z" fill="${cabelo}"/>`;
  } else if (t.cabeloEstilo === "apanhado") {
    cabeloFrente = `
      <path d="M58 84 Q58 42 100 42 Q142 42 142 84 Q128 56 100 56 Q72 56 58 84 Z" fill="${cabelo}"/>
      <circle cx="100" cy="36" r="14" fill="${cabelo}"/>`;
  } else {
    cabeloFrente = `<path d="M56 88 Q56 40 100 40 Q144 40 144 88 Q136 58 100 56 Q64 58 56 88 Z" fill="${cabelo}"/>`;
  }

  // Pestanas só no estilo feminino (pequeno toque)
  const pestanas = t.genero === "F"
    ? `<path d="M74 78 Q80 74 88 76" stroke="#1c1a18" stroke-width="2" fill="none"/>
       <path d="M112 76 Q120 74 126 78" stroke="#1c1a18" stroke-width="2" fill="none"/>`
    : "";

  return `
  <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Avatar">
    ${cabeloTras}
    <!-- tronco -->
    <path d="M48 240 L48 184 Q48 156 76 152 L124 152 Q152 156 152 184 L152 240 Z" fill="${roupa}"/>
    ${detalheRoupa}
    <!-- apito ao pescoço -->
    <path d="M84 152 Q100 170 116 152" stroke="#222" stroke-width="2.5" fill="none"/>
    <rect x="95" y="166" width="12" height="8" rx="3" fill="#d4a017" stroke="#222" stroke-width="1.5"/>
    <!-- pescoço -->
    <rect x="88" y="126" width="24" height="30" fill="${pele}"/>
    <!-- cabeça -->
    <circle cx="100" cy="90" r="44" fill="${pele}"/>
    <!-- orelhas -->
    <circle cx="56" cy="92" r="7" fill="${pele}"/>
    <circle cx="144" cy="92" r="7" fill="${pele}"/>
    ${cabeloFrente}
    <!-- sobrancelhas -->
    <rect x="72" y="74" width="18" height="4" rx="2" fill="${cabelo}"/>
    <rect x="110" y="74" width="18" height="4" rx="2" fill="${cabelo}"/>
    <!-- olhos -->
    <ellipse cx="81" cy="88" rx="9" ry="10" fill="#ffffff"/>
    <ellipse cx="119" cy="88" rx="9" ry="10" fill="#ffffff"/>
    <circle cx="81" cy="89" r="5" fill="${olhos}"/>
    <circle cx="119" cy="89" r="5" fill="${olhos}"/>
    <circle cx="81" cy="89" r="2.2" fill="#15181a"/>
    <circle cx="119" cy="89" r="2.2" fill="#15181a"/>
    ${pestanas}
    <!-- nariz e boca -->
    <path d="M98 96 Q96 104 100 106" stroke="#00000033" stroke-width="2.5" fill="none"/>
    <path d="M86 116 Q100 126 114 116" stroke="#7a3b30" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </svg>`;
}

function svgMedalha(cidade) {
  return `
  <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Medalha de ${cidade}">
    <!-- fita verde, branca e preta -->
    <path d="M40 0 L60 56 L80 0 L66 0 L60 18 L54 0 Z" fill="#1b7a43"/>
    <path d="M40 0 L54 0 L60 18 L57 27 Z" fill="#ffffff"/>
    <path d="M80 0 L66 0 L60 18 L63 27 Z" fill="#15181a"/>
    <circle cx="60" cy="100" r="44" fill="#e8b923" stroke="#b8860b" stroke-width="5"/>
    <circle cx="60" cy="100" r="33" fill="none" stroke="#b8860b" stroke-width="2" stroke-dasharray="4 3"/>
    <text x="60" y="112" text-anchor="middle" font-size="34">🏐</text>
  </svg>`;
}

/* ============================ ECRÃ INICIAL ============================ */

function iniciarApp() {
  const guardado = carregar();
  if (guardado && guardado.treinador && guardado.treinador.nome) {
    $("btn-continuar").classList.remove("escondido");
  }

  $("btn-novo-jogo").addEventListener("click", () => {
    estado = novoEstado();
    montarCriacao();
    mostrarEcra("ecra-treinador");
  });

  $("btn-continuar").addEventListener("click", () => {
    estado = carregar();
    irParaHub();
  });
}

/* ============================ CRIAÇÃO ============================ */

function montarOpcoes(elId, lista, valorAtual, aoEscolher, comCor) {
  const el = $(elId);
  el.innerHTML = "";
  lista.forEach((item) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opcao" + (comCor ? " opcao-cor" : "");
    if (comCor) {
      b.style.background = item.cor;
      b.title = item.nome || item.id;
    } else {
      b.textContent = item.nome;
    }
    if (item.id === valorAtual) b.classList.add("escolhida");
    b.addEventListener("click", () => {
      el.querySelectorAll(".opcao").forEach((o) => o.classList.remove("escolhida"));
      b.classList.add("escolhida");
      aoEscolher(item.id);
      atualizarAvatarPreview();
    });
    el.appendChild(b);
  });
}

function montarCriacao() {
  const t = estado.treinador;
  montarOpcoes("op-genero", GENEROS, t.genero, (v) => (t.genero = v), false);
  montarOpcoes("op-pele", PELES, t.pele, (v) => (t.pele = v), true);
  montarOpcoes("op-olhos", OLHOS, t.olhos, (v) => (t.olhos = v), true);
  montarOpcoes("op-cabelo-estilo", CABELO_ESTILOS, t.cabeloEstilo, (v) => (t.cabeloEstilo = v), false);
  montarOpcoes("op-cabelo-cor", CABELO_CORES, t.cabeloCor, (v) => (t.cabeloCor = v), true);
  montarOpcoes("op-roupa", ROUPAS, t.roupa, (v) => (t.roupa = v), false);
  montarOpcoes("op-roupa-cor", ROUPA_CORES, t.roupaCor, (v) => (t.roupaCor = v), true);
  $("input-nome-treinador").value = t.nome;
  atualizarAvatarPreview();
}

function atualizarAvatarPreview() {
  $("avatar-preview").innerHTML = svgAvatar(estado.treinador);
}

/* ============================ HUB ============================ */

function tituloTreinador() {
  const n = estado.medalhas.length;
  const f = estado.treinador.genero === "F";
  if (n >= 8) return f ? "Campeã Nacional 🏆" : "Campeão Nacional 🏆";
  if (n >= 5) return "Lenda dos pavilhões";
  if (n >= 3) return f ? "Mestre das manchetes" : "Mestre das manchetes";
  if (n >= 1) return "Promessa da Liga Escolar";
  return f ? "Treinadora estreante" : "Treinador estreante";
}

function cidadeAtual() {
  return CIDADES[estado.cidadeIdx % CIDADES.length];
}

function forcaAdversario() {
  return cidadeAtual().forca + (estado.epoca - 1) * 8;
}

function irParaHub() {
  guardar();
  const t = estado.treinador;
  $("hub-avatar").innerHTML = svgAvatar(t);
  $("hub-nome").textContent = t.nome || (t.genero === "F" ? "Treinadora" : "Treinador");
  $("hub-titulo").textContent = tituloTreinador() + " · Época " + estado.epoca;
  $("hub-medalhas-resumo").textContent = "🏅 × " + estado.medalhas.length;

  // Semana de treinos
  const semana = $("hub-semana");
  semana.innerHTML = "";
  for (let d = 1; d <= 5; d++) {
    const pil = document.createElement("span");
    pil.className = "dia-pilula" + (d < estado.dia ? " feito" : "") + (d === estado.dia && !semanaCompleta() ? " hoje" : "");
    pil.textContent = DIAS_SEMANA[d - 1];
    semana.appendChild(pil);
  }
  const pilJogo = document.createElement("span");
  pilJogo.className = "dia-pilula jogo" + (semanaCompleta() ? " hoje" : "");
  pilJogo.textContent = "Sábado: JOGO";
  semana.appendChild(pilJogo);

  const cid = cidadeAtual();
  $("hub-proximo-jogo").textContent =
    `Próximo jogo: ${cid.equipa}, em ${cid.nome} (${cid.pavilhao}).`;

  const btn = $("btn-ir-treino");
  if (semanaCompleta()) {
    btn.textContent = `🚌 Viajar para ${cid.nome} — dia de jogo!`;
    btn.onclick = abrirPreJogo;
  } else {
    btn.textContent = `🏋️ Treinar (${DIAS_SEMANA[estado.dia - 1]}, ${estado.sessao}.ª sessão)`;
    btn.onclick = abrirTreino;
  }

  // Cidades
  const ul = $("hub-cidades");
  ul.innerHTML = "";
  CIDADES.forEach((c, i) => {
    const li = document.createElement("li");
    const ganha = estado.medalhas.some((m) => m.cidade === c.nome && m.epoca === estado.epoca);
    if (ganha) li.classList.add("ganha");
    if (i === estado.cidadeIdx) li.classList.add("atual");
    li.innerHTML = `<span>${i + 1}. ${c.nome} — ${c.equipa}</span><span>${ganha ? "🏅" : i === estado.cidadeIdx ? "⏳" : ""}</span>`;
    ul.appendChild(li);
  });

  // Vitrina
  const vit = $("hub-vitrina");
  vit.innerHTML = "";
  if (estado.medalhas.length === 0) {
    vit.innerHTML = `<p class="vitrina-vazia">Ainda sem medalhas… ganha o primeiro jogo para estreares a vitrina!</p>`;
  } else {
    estado.medalhas.forEach((m) => {
      const div = document.createElement("div");
      div.className = "medalha-mini";
      div.innerHTML = svgMedalha(m.cidade) + `<span>${m.cidade}<br>Época ${m.epoca}</span>`;
      vit.appendChild(div);
    });
  }

  // Resumo da equipa
  const medias = mediasEquipa(estado.jogadoras);
  $("hub-equipa-resumo").innerHTML =
    `Médias da equipa — Passe: <strong>${medias.passe}</strong> · Manchete: <strong>${medias.manchete}</strong> · ` +
    `Remate: <strong>${medias.remate}</strong> · Equipa: <strong>${medias.equipa}</strong> · Energia: <strong>${medias.energia}</strong><br>` +
    `Vitórias: ${estado.vitorias} · Derrotas: ${estado.derrotas}`;

  mostrarEcra("ecra-hub");
}

function semanaCompleta() {
  return estado.dia > 5;
}

function mediasEquipa(lista) {
  const m = { passe: 0, manchete: 0, remate: 0, equipa: 0, energia: 0 };
  lista.forEach((j) => {
    m.passe += j.passe; m.manchete += j.manchete; m.remate += j.remate;
    m.equipa += j.equipa; m.energia += j.energia;
  });
  Object.keys(m).forEach((k) => (m[k] = Math.round(m[k] / lista.length)));
  return m;
}

/* ============================ PLANTEL ============================ */

function cartaoJogadora(j, opcoes = {}) {
  const div = document.createElement("div");
  div.className = "cartao-jogadora";
  const barra = (rotulo, valor, extra = "") => `
    <div class="stat-linha">
      <span>${rotulo}</span>
      <div class="stat-barra"><div class="stat-valor ${extra}" style="width:${Math.min(100, valor)}%"></div></div>
      <span>${Math.round(valor)}</span>
    </div>`;
  div.innerHTML = `
    <span class="numero">${j.numero}</span>
    <h4>${j.nome}</h4>
    <p class="posicao">${j.pos} · ${j.idade} anos</p>
    ${barra("Passe", j.passe)}
    ${barra("Manchete", j.manchete)}
    ${barra("Remate", j.remate)}
    ${barra("Equipa", j.equipa)}
    ${barra("Energia", j.energia, "energia")}
  `;
  if (opcoes.selecionavel) {
    div.classList.add("selecionavel");
    div.addEventListener("click", () => opcoes.aoClicar(j, div));
  }
  return div;
}

function abrirPlantel() {
  const lista = $("plantel-lista");
  lista.innerHTML = "";
  estado.jogadoras.forEach((j) => lista.appendChild(cartaoJogadora(j)));
  mostrarEcra("ecra-plantel");
}

/* ============================ TREINO ============================ */

function abrirTreino() {
  $("treino-titulo").textContent =
    `Treino — ${DIAS_SEMANA[estado.dia - 1]}, ${estado.sessao}.ª sessão de ${SESSOES_POR_DIA}`;
  const cid = cidadeAtual();
  $("treino-descricao").textContent =
    `Faltam ${5 - estado.dia} dia(s) de treino para o jogo em ${cid.nome}. ` +
    `As 16 jogadoras estão no pavilhão, de equipamento verde, branco e preto, à tua espera.`;

  const grelha = $("treino-exercicios");
  grelha.innerHTML = "";
  EXERCICIOS.forEach((ex) => {
    const div = document.createElement("div");
    div.className = "exercicio";
    div.innerHTML = `<div class="icone">${ex.icone}</div><h4>${ex.nome}</h4><p>${ex.desc}</p>`;
    div.addEventListener("click", () => iniciarMinijogo(ex));
    grelha.appendChild(div);
  });

  $("treino-escolha").classList.remove("escondido");
  $("treino-minijogo").classList.add("escondido");
  $("treino-resultado").classList.add("escondido");
  mostrarEcra("ecra-treino");
}

function iniciarMinijogo(ex) {
  $("treino-escolha").classList.add("escondido");
  $("treino-minijogo").classList.remove("escondido");
  $("minijogo-titulo").textContent = `${ex.icone} ${ex.nome}`;
  $("minijogo-instrucao").textContent = ex.instrucao + " (Apita na zona verde para um treino perfeito.)";

  minijogo = { ex, pos: 0, dir: 1, ativo: true };
  const este = minijogo;
  const cursor = $("cursor-precisao");

  function passo() {
    if (minijogo !== este || !este.ativo) return;
    // O cursor anda de um lado ao outro; mais depressa nas épocas seguintes.
    const velocidade = 0.9 + estado.epoca * 0.25;
    minijogo.pos += minijogo.dir * velocidade;
    if (minijogo.pos >= 100) { minijogo.pos = 100; minijogo.dir = -1; }
    if (minijogo.pos <= 0) { minijogo.pos = 0; minijogo.dir = 1; }
    cursor.style.left = `calc(${minijogo.pos}% - 3px)`;
    requestAnimationFrame(passo);
  }
  requestAnimationFrame(passo);
}

function pararMinijogo() {
  if (!minijogo || !minijogo.ativo) return;
  minijogo.ativo = false;
  // Zonas alinhadas com o CSS (flex 3/2/1.4/2/3 = total 11.4):
  // fraca 0-26.3, boa 26.3-43.9, perfeita 43.9-56.1, boa 56.1-73.7, fraca 73.7-100
  const p = minijogo.pos;
  let mult, qualidade;
  if (p >= 43.9 && p <= 56.1) { mult = 1.6; qualidade = "perfeito"; }
  else if (p >= 26.3 && p <= 73.7) { mult = 1.0; qualidade = "bom"; }
  else { mult = 0.5; qualidade = "fraco"; }
  aplicarTreino(minijogo.ex, mult, qualidade);
}

function aplicarTreino(ex, mult, qualidade) {
  const linhas = [];
  const titulos = {
    perfeito: "🔔 Apito no momento perfeito! Sessão de treino excelente!",
    bom: "🔔 Boa sessão de treino!",
    fraco: "🔔 Apitaste fora de tempo… a sessão rendeu pouco.",
  };
  $("resultado-titulo").textContent = titulos[qualidade];

  if (ex.id === "descanso") {
    estado.jogadoras.forEach((j) => {
      j.energia = Math.min(100, j.energia + Math.round(25 * mult));
    });
    linhas.push("As jogadoras alongam, bebem água e recuperam energia. 💧");
    linhas.push("Equipa mais fresca para os próximos treinos!");
  } else {
    let melhorGanho = 0;
    let melhorNome = "";
    estado.jogadoras.forEach((j) => {
      const cansada = j.energia < 30;
      let ganho = (2 + Math.random() * 2.5) * mult * (cansada ? 0.5 : 1);
      // Cada jogadora evolui mais na sua especialidade natural.
      const especialidade =
        (ex.id === "passe" && j.pos === "Levantadora") ||
        (ex.id === "manchete" && j.pos === "Líbero") ||
        (ex.id === "remate" && (j.pos === "Oposta" || j.pos === "Ponta"));
      if (especialidade) ganho *= 1.3;
      ganho = Math.round(ganho * 10) / 10;
      if (ex.id === "equipa") {
        j.equipa = Math.min(99, j.equipa + ganho);
        j.passe = Math.min(99, j.passe + ganho * 0.2);
        j.manchete = Math.min(99, j.manchete + ganho * 0.2);
      } else {
        j[ex.id] = Math.min(99, j[ex.id] + ganho);
      }
      j.energia = Math.max(0, j.energia - 13);
      if (ganho > melhorGanho) { melhorGanho = ganho; melhorNome = j.nome.split(" ")[0]; }
    });

    const frases = {
      passe: [
        `Ensinaste a posição das mãos e a olhar para a bola. A ${melhorNome} já faz dez passes seguidos sem deixar cair!`,
        "O ginásio enche-se do som de bolas bem tocadas. O passe está cada vez melhor!",
      ],
      manchete: [
        `Braços esticados, joelhos fletidos! A ${melhorNome} defendeu uma bola impossível e a equipa toda aplaudiu.`,
        "As receções estão mais seguras — a manchete começa a sair natural.",
      ],
      remate: [
        `Chamada, salto e PUMBA! O remate da ${melhorNome} até fez eco no pavilhão. 💥`,
        "A fila de remates não pára. Cada vez batem mais forte e mais colocado!",
      ],
      equipa: [
        `No 6x6 de treino, gritaram "MINHA!" e ninguém chocou. A ${melhorNome} puxou pela equipa toda. 🤝`,
        "Estão a aprender a confiar umas nas outras — e isso vale pontos no sábado!",
      ],
    };
    linhas.push(frases[ex.id][aleatorio(0, 1)]);
    if (qualidade === "perfeito") linhas.push("Com o teu apito no momento certo, todas perceberam a correção. Grande progresso! ⭐");
    if (qualidade === "fraco") linhas.push("Apitaste tarde demais e a confusão instalou-se. Para a próxima corre melhor!");
    const cansadas = estado.jogadoras.filter((j) => j.energia < 30).length;
    if (cansadas >= 4) linhas.push(`⚠️ ${cansadas} jogadoras estão muito cansadas. Uma sessão de recuperação faria bem.`);
  }

  // Avançar sessão / dia
  estado.sessao++;
  if (estado.sessao > SESSOES_POR_DIA) {
    estado.sessao = 1;
    estado.dia++;
    if (estado.dia <= 5) {
      // Noite de descanso: recupera alguma energia.
      estado.jogadoras.forEach((j) => (j.energia = Math.min(100, j.energia + 18)));
      linhas.push(`🌙 Fim de ${DIAS_SEMANA[estado.dia - 2]}. Boa noite de sono e amanhã há mais!`);
    } else {
      estado.jogadoras.forEach((j) => (j.energia = Math.min(100, j.energia + 18)));
      linhas.push("🗓️ A semana de treinos acabou — sábado é dia de JOGO! 🏐");
    }
  }
  guardar();

  const ul = $("resultado-linhas");
  ul.innerHTML = "";
  linhas.forEach((l) => {
    const li = document.createElement("li");
    li.textContent = l;
    ul.appendChild(li);
  });
  $("treino-minijogo").classList.add("escondido");
  $("treino-resultado").classList.remove("escondido");
}

/* ============================ PRÉ-JOGO ============================ */

function abrirPreJogo() {
  const cid = cidadeAtual();
  escolhaTitulares = new Set();
  $("prejogo-titulo").textContent = `Dia de jogo em ${cid.nome}!`;
  $("prejogo-descricao").textContent =
    `O autocarro chegou ao ${cid.pavilhao}. Do outro lado da rede: ${cid.equipa}. ` +
    `Escolhe as 6 titulares — joga-se à melhor de 3 sets, até aos 25 pontos.`;

  const lista = $("prejogo-lista");
  lista.innerHTML = "";
  estado.jogadoras.forEach((j) => {
    const cartao = cartaoJogadora(j, {
      selecionavel: true,
      aoClicar: (jog, div) => {
        if (escolhaTitulares.has(jog.id)) {
          escolhaTitulares.delete(jog.id);
          div.classList.remove("selecionada");
        } else if (escolhaTitulares.size < 6) {
          escolhaTitulares.add(jog.id);
          div.classList.add("selecionada");
        }
        atualizarContagemTitulares();
      },
    });
    lista.appendChild(cartao);
  });
  atualizarContagemTitulares();
  mostrarEcra("ecra-prejogo");
}

function atualizarContagemTitulares() {
  $("prejogo-contador").textContent = escolhaTitulares.size;
  $("btn-comecar-jogo").disabled = escolhaTitulares.size !== 6;
}

function autoEscolherSeis() {
  escolhaTitulares = new Set(
    [...estado.jogadoras]
      .sort((a, b) => valorGeral(b) - valorGeral(a))
      .slice(0, 6)
      .map((j) => j.id)
  );
  // Repinta os cartões
  const lista = $("prejogo-lista");
  [...lista.children].forEach((div, i) => {
    div.classList.toggle("selecionada", escolhaTitulares.has(estado.jogadoras[i].id));
  });
  atualizarContagemTitulares();
}

function valorGeral(j) {
  return (j.passe + j.manchete + j.remate) / 3 + j.equipa * 0.3;
}

/* ============================ JOGO (PARTIDA) ============================ */

// Posições no campo em percentagem (as nossas em baixo, as adversárias em cima).
const POSICOES_NOS = [
  { x: 25, y: 62 }, { x: 50, y: 62 }, { x: 75, y: 62 },   // rede
  { x: 25, y: 85 }, { x: 50, y: 85 }, { x: 75, y: 85 },   // defesa
];
const POSICOES_ELES = [
  { x: 25, y: 38 }, { x: 50, y: 38 }, { x: 75, y: 38 },
  { x: 25, y: 15 }, { x: 50, y: 15 }, { x: 75, y: 15 },
];

function comecarJogo() {
  const cid = cidadeAtual();
  jogo = {
    cidade: cid,
    emCampo: [...escolhaTitulares],
    banco: estado.jogadoras.filter((j) => !escolhaTitulares.has(j.id)).map((j) => j.id),
    jogaram: new Set([...escolhaTitulares]),
    pontosNos: 0, pontosEles: 0,
    setsNos: 0, setsEles: 0,
    setAtual: 1,
    servimosNos: Math.random() < 0.5,
    servidorIdx: 0,
    aAnimar: false,
    auto: false,
    terminado: false,
  };
  $("placar-nome-eles").textContent = cid.equipa;
  $("placar-cidade").textContent = `${cid.nome} · ${cid.pavilhao}`;
  $("comentarios").innerHTML = "";
  comentar(`🏟️ Bem-vindos ao ${cid.pavilhao}, em ${cid.nome}! A equipa entra de verde, branco e preto.`, "info-set");
  comentar(`O jogo é à melhor de 3 sets. ${jogo.servimosNos ? "Nós" : "Elas"} servem primeiro. Boa sorte, ${estado.treinador.nome}!`, "info-set");
  atualizarPlacar();
  desenharCampo();
  moverBola(50, 50);
  $("btn-jogar-ponto").disabled = false;
  $("btn-substituicao").disabled = false;
  $("btn-auto-jogar").textContent = "Auto ⏩";
  mostrarEcra("ecra-jogo");
}

function jogadoraPorId(id) {
  return estado.jogadoras.find((j) => j.id === id);
}

function desenharCampo(destaqueId = null) {
  const campo = $("campo");
  campo.querySelectorAll(".jogadora-campo").forEach((e) => e.remove());

  jogo.emCampo.forEach((id, i) => {
    const j = jogadoraPorId(id);
    const div = document.createElement("div");
    div.className = "jogadora-campo nos" + (j.pos === "Líbero" ? " libero" : "") + (id === destaqueId ? " destaque" : "");
    div.style.left = POSICOES_NOS[i].x + "%";
    div.style.top = POSICOES_NOS[i].y + "%";
    div.innerHTML = `<div class="camisola">${j.numero}</div><div class="nome-campo">${j.nome.split(" ")[0]}</div>`;
    campo.appendChild(div);
  });

  POSICOES_ELES.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "jogadora-campo eles";
    div.style.left = p.x + "%";
    div.style.top = p.y + "%";
    div.innerHTML = `<div class="camisola">${i + 1}</div>`;
    campo.appendChild(div);
  });
}

function moverBola(x, y) {
  const bola = $("bola");
  bola.style.left = x + "%";
  bola.style.top = y + "%";
}

function comentar(texto, classe = "") {
  const box = $("comentarios");
  const p = document.createElement("p");
  if (classe) p.className = classe;
  p.textContent = texto;
  box.appendChild(p);
  box.scrollTop = box.scrollHeight;
}

function atualizarPlacar() {
  $("placar-pontos-nos").textContent = jogo.pontosNos;
  $("placar-pontos-eles").textContent = jogo.pontosEles;
  $("placar-sets-nos").textContent = jogo.setsNos;
  $("placar-sets-eles").textContent = jogo.setsEles;
  $("placar-set-atual").textContent = jogo.setAtual + ".º set";
}

function ratingEquipaNos() {
  const emCampo = jogo.emCampo.map(jogadoraPorId);
  let soma = 0, somaEquipa = 0;
  emCampo.forEach((j) => {
    const frescura = 0.55 + 0.45 * (j.energia / 100);
    soma += ((j.passe + j.manchete + j.remate) / 3) * frescura;
    somaEquipa += j.equipa;
  });
  const media = soma / 6;
  const fatorEquipa = 0.8 + 0.4 * (somaEquipa / 6 / 100); // o trabalho de equipa vale até +20%
  return media * fatorEquipa;
}

function escolherPorStat(stat, excluir = []) {
  // Escolhe uma jogadora em campo, com mais probabilidade para quem tem o stat mais alto.
  const candidatas = jogo.emCampo.map(jogadoraPorId).filter((j) => !excluir.includes(j.id));
  const total = candidatas.reduce((s, j) => s + j[stat] * j[stat], 0);
  let r = Math.random() * total;
  for (const j of candidatas) {
    r -= j[stat] * j[stat];
    if (r <= 0) return j;
  }
  return candidatas[candidatas.length - 1];
}

function jogarPonto() {
  if (!jogo || jogo.aAnimar || jogo.terminado) return;
  jogo.aAnimar = true;
  $("btn-jogar-ponto").disabled = true;
  $("btn-substituicao").disabled = true;

  const nos = ratingEquipaNos();
  const eles = forcaAdversario() * (0.92 + Math.random() * 0.16);
  const pNos = Math.pow(nos, 1.4) / (Math.pow(nos, 1.4) + Math.pow(eles, 1.4));
  const ganhamos = Math.random() < pNos;

  const passos = construirNarracao(ganhamos);

  let i = 0;
  const executarPasso = () => {
    if (i < passos.length) {
      const p = passos[i++];
      if (p.bola) moverBola(p.bola.x, p.bola.y);
      if (p.destaque !== undefined) desenharCampo(p.destaque);
      if (p.texto) comentar(p.texto, p.classe || "");
      setTimeout(executarPasso, jogo.auto ? 300 : 620);
    } else {
      terminarPonto(ganhamos);
    }
  };
  executarPasso();
}

function construirNarracao(ganhamos) {
  const passos = [];
  const primeiro = (j) => j.nome.split(" ")[0];

  const recetora = escolherPorStat("manchete");
  const levantadora = escolherPorStat("passe", [recetora.id]);
  const atacante = escolherPorStat("remate", [recetora.id, levantadora.id]);

  if (jogo.servimosNos) {
    const servidora = jogadoraPorId(jogo.emCampo[jogo.servidorIdx % 6]);
    passos.push({ texto: `${primeiro(servidora)} prepara o serviço…`, bola: { x: 80, y: 92 }, destaque: servidora.id });
    if (ganhamos && Math.random() < 0.14) {
      passos.push({ texto: `A bola voa por cima da rede…`, bola: { x: 50, y: 30 } });
      passos.push({ texto: `ÁS DE SERVIÇO da ${primeiro(servidora)}! Ninguém lhe tocou! 🎯`, bola: { x: 40, y: 12 }, classe: "ponto-nos" });
      return passos;
    }
    passos.push({ texto: `Serviço por cima, a bola passa a rede.`, bola: { x: 50, y: 25 } });
    passos.push({ texto: `A ${jogo.cidade.equipa} constrói o ataque…`, bola: { x: 60, y: 38 } });
    if (ganhamos) {
      passos.push({ texto: `${primeiro(recetora)} defende de MANCHETE uma bola fortíssima! 💪`, bola: { x: 35, y: 80 }, destaque: recetora.id });
      passos.push({ texto: `${primeiro(levantadora)} faz um passe perfeito…`, bola: { x: 50, y: 65 }, destaque: levantadora.id });
      passos.push({ texto: `${primeiro(atacante)} sobe e REMATA para o chão! PONTO! 💥`, bola: { x: 65, y: 20 }, destaque: atacante.id, classe: "ponto-nos" });
    } else {
      if (Math.random() < 0.5) {
        passos.push({ texto: `O remate adversário entra sem hipótese de defesa. Ponto para ${jogo.cidade.equipa}.`, bola: { x: 45, y: 78 }, classe: "ponto-eles" });
      } else {
        passos.push({ texto: `${primeiro(recetora)} ainda toca na bola, mas ela sai fora. Ponto para elas.`, bola: { x: 12, y: 95 }, destaque: recetora.id, classe: "ponto-eles" });
      }
    }
  } else {
    passos.push({ texto: `Serviço da ${jogo.cidade.equipa}…`, bola: { x: 20, y: 8 } });
    if (!ganhamos && Math.random() < 0.12) {
      passos.push({ texto: `A bola cai no nosso campo sem ninguém lhe chegar. Ás delas. 😬`, bola: { x: 60, y: 88 }, classe: "ponto-eles" });
      return passos;
    }
    passos.push({ texto: `${primeiro(recetora)} recebe de manchete…`, bola: { x: 40, y: 80 }, destaque: recetora.id });
    passos.push({ texto: `${primeiro(levantadora)} levanta para a ponta…`, bola: { x: 55, y: 63 }, destaque: levantadora.id });
    if (ganhamos) {
      const variante = Math.random();
      if (variante < 0.6) {
        passos.push({ texto: `${primeiro(atacante)} REMATA na diagonal — a bola explode no chão! PONTO! 💥`, bola: { x: 30, y: 18 }, destaque: atacante.id, classe: "ponto-nos" });
      } else {
        passos.push({ texto: `${primeiro(atacante)} ataca, elas defendem…`, bola: { x: 50, y: 35 }, destaque: atacante.id });
        passos.push({ texto: `…mas mandam a bola para fora! Ponto para nós! ✅`, bola: { x: 90, y: 5 }, classe: "ponto-nos" });
      }
    } else {
      const variante = Math.random();
      if (variante < 0.5) {
        passos.push({ texto: `${primeiro(atacante)} remata… BLOCO da ${jogo.cidade.equipa}. Ponto para elas.`, bola: { x: 55, y: 70 }, destaque: atacante.id, classe: "ponto-eles" });
      } else {
        passos.push({ texto: `O passe sai curto e a bola fica na rede. Ponto para ${jogo.cidade.equipa}.`, bola: { x: 50, y: 50 }, destaque: levantadora.id, classe: "ponto-eles" });
      }
    }
  }
  return passos;
}

function terminarPonto(ganhamos) {
  if (ganhamos) {
    jogo.pontosNos++;
    if (!jogo.servimosNos) jogo.servidorIdx++; // recuperámos o serviço: roda a servidora
    jogo.servimosNos = true;
  } else {
    jogo.pontosEles++;
    jogo.servimosNos = false;
  }

  // Cansaço: quem está em campo gasta energia, o banco recupera.
  jogo.emCampo.forEach((id) => {
    const j = jogadoraPorId(id);
    j.energia = Math.max(0, j.energia - 0.6);
  });
  jogo.banco.forEach((id) => {
    const j = jogadoraPorId(id);
    j.energia = Math.min(100, j.energia + 0.3);
  });

  atualizarPlacar();

  const alvo = jogo.setAtual === 3 ? 15 : 25;
  const fim2 = (a, b) => a >= alvo && a - b >= 2;

  if (fim2(jogo.pontosNos, jogo.pontosEles) || fim2(jogo.pontosEles, jogo.pontosNos)) {
    const ganhamosSet = jogo.pontosNos > jogo.pontosEles;
    if (ganhamosSet) {
      jogo.setsNos++;
      comentar(`🎉 GANHÁMOS o ${jogo.setAtual}.º set, ${jogo.pontosNos}–${jogo.pontosEles}!`, "info-set");
    } else {
      jogo.setsEles++;
      comentar(`O ${jogo.setAtual}.º set foi para elas, ${jogo.pontosEles}–${jogo.pontosNos}. Cabeça erguida!`, "info-set");
    }
    if (jogo.setsNos === 2 || jogo.setsEles === 2) {
      atualizarPlacar();
      return terminarJogo();
    }
    jogo.setAtual++;
    jogo.pontosNos = 0;
    jogo.pontosEles = 0;
    comentar(`— Começa o ${jogo.setAtual}.º set (até ${jogo.setAtual === 3 ? 15 : 25} pontos) —`, "info-set");
    atualizarPlacar();
  }

  // Aviso de cansaço para lembrar as substituições.
  const mediaEnergia = jogo.emCampo.reduce((s, id) => s + jogadoraPorId(id).energia, 0) / 6;
  if (mediaEnergia < 40 && Math.random() < 0.25) {
    comentar("📣 As tuas jogadoras parecem cansadas… talvez seja altura de uma substituição!", "info-set");
  }

  jogo.aAnimar = false;
  $("btn-jogar-ponto").disabled = false;
  $("btn-substituicao").disabled = false;

  if (jogo.auto && !jogo.terminado) {
    setTimeout(jogarPonto, 350);
  }
}

function terminarJogo() {
  jogo.terminado = true;
  jogo.auto = false;
  const vitoria = jogo.setsNos > jogo.setsEles;
  comentar(vitoria ? "🏆 VITÓRIA! O pavilhão veio abaixo!" : "Fim do jogo. Hoje não deu, mas vamos treinar ainda mais.", "info-set");

  setTimeout(() => mostrarResultado(vitoria), 1200);
}

/* ============================ SUBSTITUIÇÕES ============================ */

function abrirSubs() {
  if (!jogo || jogo.aAnimar || jogo.terminado) return;
  subEscolha = { sai: null, entra: null };
  const desenhaLista = (elId, ids, chave) => {
    const el = $(elId);
    el.innerHTML = "";
    ids.forEach((id) => {
      const j = jogadoraPorId(id);
      const div = document.createElement("div");
      div.className = "sub-item";
      div.innerHTML = `<strong>${j.numero}. ${j.nome}</strong> — ${j.pos}<br>
        <span class="energia-txt">⚡ Energia: ${Math.round(j.energia)}</span>`;
      div.addEventListener("click", () => {
        subEscolha[chave] = id;
        el.querySelectorAll(".sub-item").forEach((s) => s.classList.remove("escolhida"));
        div.classList.add("escolhida");
        $("btn-confirmar-sub").disabled = !(subEscolha.sai !== null && subEscolha.entra !== null);
      });
      el.appendChild(div);
    });
  };
  desenhaLista("subs-campo", jogo.emCampo, "sai");
  desenhaLista("subs-banco", jogo.banco, "entra");
  $("btn-confirmar-sub").disabled = true;
  $("modal-subs").classList.remove("escondido");
}

function confirmarSub() {
  const { sai, entra } = subEscolha;
  if (sai === null || entra === null) return;
  const idxCampo = jogo.emCampo.indexOf(sai);
  const idxBanco = jogo.banco.indexOf(entra);
  jogo.emCampo[idxCampo] = entra;
  jogo.banco[idxBanco] = sai;
  jogo.jogaram.add(entra);
  const jSai = jogadoraPorId(sai);
  const jEntra = jogadoraPorId(entra);
  comentar(`🔄 Substituição: sai a ${jSai.nome.split(" ")[0]}, entra a ${jEntra.nome.split(" ")[0]}. Boa gestão, ${estado.treinador.genero === "F" ? "treinadora" : "treinador"}!`, "info-set");
  desenharCampo();
  fecharSubs();
}

function fecharSubs() {
  $("modal-subs").classList.add("escondido");
}

/* ============================ RESULTADO ============================ */

function mostrarResultado(vitoria) {
  const cid = jogo.cidade;
  const f = estado.treinador.genero === "F";

  // Experiência de jogo: quem jogou aprende trabalho de equipa.
  jogo.jogaram.forEach((id) => {
    const j = jogadoraPorId(id);
    j.equipa = Math.min(99, j.equipa + (vitoria ? 2 : 1));
  });
  // Banho, descanso e viagem de volta: energia recuperada.
  estado.jogadoras.forEach((j) => (j.energia = Math.max(j.energia, 85)));

  $("medalha-cerimonia").classList.add("escondido");

  if (vitoria) {
    estado.vitorias++;
    estado.medalhas.push({ cidade: cid.nome, epoca: estado.epoca });
    $("resultado-jogo-titulo").textContent = `🎉 Vitória em ${cid.nome}!`;
    $("resultado-jogo-texto").textContent =
      `Final: ${jogo.setsNos}–${jogo.setsEles} em sets contra ${cid.equipa}. ` +
      `No fim do jogo, as 16 jogadoras juntam-se à tua volta, aos saltos… e a capitã pendura-te uma medalha ao pescoço!`;
    $("medalha-svg").innerHTML = svgMedalha(cid.nome);
    $("medalha-texto").textContent = f
      ? `Medalha de ${cid.nome} entregue à treinadora ${estado.treinador.nome}! 🏅`
      : `Medalha de ${cid.nome} entregue ao treinador ${estado.treinador.nome}! 🏅`;
    $("medalha-cerimonia").classList.remove("escondido");

    estado.cidadeIdx++;
    if (estado.cidadeIdx >= CIDADES.length) {
      // Época completa: campeãs nacionais!
      $("resultado-jogo-titulo").textContent = `🏆 CAMPEÃS DE PORTUGAL! 🏆`;
      $("resultado-jogo-texto").textContent =
        `Ganhaste em todas as cidades da época ${estado.epoca}! As tuas jogadoras erguem a taça em ${cid.nome} ` +
        `e gritam o teu nome. Para a próxima época, as adversárias vêm mais fortes… mas a tua equipa também!`;
      estado.epoca++;
      estado.cidadeIdx = 0;
    }
  } else {
    estado.derrotas++;
    $("resultado-jogo-titulo").textContent = `Derrota em ${cid.nome}…`;
    $("resultado-jogo-texto").textContent =
      `Final: ${jogo.setsNos}–${jogo.setsEles} contra ${cid.equipa}. As jogadoras estão de cabeça baixa, mas tu sabes o que dizer: ` +
      `"Para a semana treinamos mais passe, mais manchete, mais remate — e voltamos cá para ganhar!" Nova semana de treinos, novo jogo em ${cid.nome}.`;
  }

  // Nova semana de treinos.
  estado.dia = 1;
  estado.sessao = 1;
  guardar();
  mostrarEcra("ecra-resultado");
}

/* ============================ LIGAÇÕES (EVENTOS) ============================ */

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();

  $("btn-comecar").addEventListener("click", () => {
    const nome = $("input-nome-treinador").value.trim();
    if (!nome) {
      $("input-nome-treinador").placeholder = "Escreve primeiro o teu nome!";
      $("input-nome-treinador").focus();
      return;
    }
    estado.treinador.nome = nome;
    guardar();
    irParaHub();
  });

  $("btn-ver-plantel").addEventListener("click", abrirPlantel);
  $("btn-voltar-hub").addEventListener("click", irParaHub);
  $("btn-parar-cursor").addEventListener("click", pararMinijogo);
  $("btn-continuar-treino").addEventListener("click", irParaHub);
  $("btn-auto-seis").addEventListener("click", autoEscolherSeis);
  $("btn-comecar-jogo").addEventListener("click", comecarJogo);
  $("btn-jogar-ponto").addEventListener("click", jogarPonto);
  $("btn-auto-jogar").addEventListener("click", () => {
    if (!jogo || jogo.terminado) return;
    jogo.auto = !jogo.auto;
    $("btn-auto-jogar").textContent = jogo.auto ? "Pausa ⏸" : "Auto ⏩";
    if (jogo.auto && !jogo.aAnimar) jogarPonto();
  });
  $("btn-substituicao").addEventListener("click", abrirSubs);
  $("btn-confirmar-sub").addEventListener("click", confirmarSub);
  $("btn-fechar-subs").addEventListener("click", fecharSubs);
  $("btn-resultado-continuar").addEventListener("click", irParaHub);
});
