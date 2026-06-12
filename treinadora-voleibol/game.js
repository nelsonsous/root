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

// As 16 jogadoras do clube Verde-Branco-Preto.
const PLANTEL_BASE = [
  { nome: "Matilde Sousa",     pos: "Levantadora" },
  { nome: "Leonor Almeida",    pos: "Levantadora" },
  { nome: "Beatriz Costa",     pos: "Oposta" },
  { nome: "Carolina Martins",  pos: "Oposta" },
  { nome: "Mariana Silva",     pos: "Central" },
  { nome: "Inês Ferreira",     pos: "Central" },
  { nome: "Francisca Lopes",   pos: "Central" },
  { nome: "Sofia Rodrigues",   pos: "Central" },
  { nome: "Margarida Santos",  pos: "Ponta" },
  { nome: "Joana Pereira",     pos: "Ponta" },
  { nome: "Lara Gomes",        pos: "Ponta" },
  { nome: "Camila Fernandes",  pos: "Ponta" },
  { nome: "Diana Marques",     pos: "Ponta" },
  { nome: "Rita Oliveira",     pos: "Ponta" },
  { nome: "Marta Gonçalves",   pos: "Líbero" },
  { nome: "Catarina Alves",    pos: "Líbero" },
];

// A carreira: as jogadoras começam nos Minis e sobem de escalão a cada
// época ganha, até chegarem a Seniores e aos jogos internacionais.
const ESCALOES = [
  { nome: "Mini A",    nivel: "Escolas",       idadeBase: 8 },
  { nome: "Mini B",    nivel: "Escolas",       idadeBase: 10 },
  { nome: "Infantis",  nivel: "Cidade",        idadeBase: 12 },
  { nome: "Iniciadas", nivel: "Cidade",        idadeBase: 14 },
  { nome: "Juvenis",   nivel: "Regional",      idadeBase: 16 },
  { nome: "Juniores",  nivel: "Nacional",      idadeBase: 18 },
  { nome: "Seniores",  nivel: "Internacional", idadeBase: 20 },
];

// 8 adversários por nível de competição, do mais fácil ao mais difícil.
const ADVERSARIOS = {
  Escolas: [
    { nome: "Escola do Parque",      equipa: "Esquilos do Parque",       pavilhao: "Ginásio da Escola do Parque" },
    { nome: "Escola da Bela Vista",  equipa: "Gaivotas da Bela Vista",   pavilhao: "Ginásio da Bela Vista" },
    { nome: "Colégio do Mar",        equipa: "Golfinhos do Mar",         pavilhao: "Ginásio do Colégio do Mar" },
    { nome: "Escola dos Plátanos",   equipa: "Andorinhas dos Plátanos",  pavilhao: "Ginásio dos Plátanos" },
    { nome: "Escola da Ribeira",     equipa: "Estrelas da Ribeira",      pavilhao: "Ginásio da Ribeira" },
    { nome: "Colégio do Monte",      equipa: "Águias do Monte",          pavilhao: "Ginásio do Monte" },
    { nome: "Escola das Laranjeiras",equipa: "Abelhas das Laranjeiras",  pavilhao: "Ginásio das Laranjeiras" },
    { nome: "Escola Grande",         equipa: "Leoas da Escola Grande",   pavilhao: "Pavilhão da Escola Grande" },
  ],
  Cidade: [
    { nome: "Ovar",       equipa: "Ovarense Jovem",        pavilhao: "Pavilhão de Ovar" },
    { nome: "Esmoriz",    equipa: "Esmoriz Vólei",         pavilhao: "Pavilhão de Esmoriz" },
    { nome: "Espinho",    equipa: "Académico de Espinho",  pavilhao: "Pavilhão de Espinho" },
    { nome: "Ílhavo",     equipa: "Ilhavense Vólei",       pavilhao: "Pavilhão de Ílhavo" },
    { nome: "Águeda",     equipa: "Galitos de Águeda",     pavilhao: "Pavilhão de Águeda" },
    { nome: "Anadia",     equipa: "Vinhas de Anadia",      pavilhao: "Pavilhão de Anadia" },
    { nome: "Gaia",       equipa: "Gaia Vólei Clube",      pavilhao: "Pavilhão de Gaia" },
    { nome: "Matosinhos", equipa: "Ondas de Matosinhos",   pavilhao: "Pavilhão de Matosinhos" },
  ],
  Regional: [
    { nome: "Aveiro",         equipa: "Estudantes da Ria",      pavilhao: "Pavilhão da Ria" },
    { nome: "Coimbra",        equipa: "Académica Jovem",        pavilhao: "Pavilhão do Mondego" },
    { nome: "Leiria",         equipa: "Pinhal Vólei Leiria",    pavilhao: "Pavilhão do Pinhal" },
    { nome: "Viseu",          equipa: "Viriatas de Viseu",      pavilhao: "Pavilhão de Viseu" },
    { nome: "Santarém",       equipa: "Ribatejanas",            pavilhao: "Pavilhão do Ribatejo" },
    { nome: "Castelo Branco", equipa: "Albicastrenses",         pavilhao: "Pavilhão da Beira" },
    { nome: "Évora",          equipa: "Juventude Alentejana",   pavilhao: "Pavilhão das Muralhas" },
    { nome: "Beja",           equipa: "Planícies de Beja",      pavilhao: "Pavilhão das Planícies" },
  ],
  Nacional: [
    { nome: "Setúbal",       equipa: "Sadinas de Setúbal",        pavilhao: "Pavilhão do Sado" },
    { nome: "Faro",          equipa: "Ondas do Algarve",          pavilhao: "Pavilhão do Sul" },
    { nome: "Braga",         equipa: "Minho Vólei Clube",         pavilhao: "Pavilhão do Sameiro" },
    { nome: "Guimarães",     equipa: "Berço Vólei Juvenil",       pavilhao: "Pavilhão do Castelo" },
    { nome: "Funchal",       equipa: "Madeira Vólei",             pavilhao: "Pavilhão do Funchal" },
    { nome: "Ponta Delgada", equipa: "Açores Vólei Clube",        pavilhao: "Pavilhão do Atlântico" },
    { nome: "Porto",         equipa: "Invicta Vólei Escolar",     pavilhao: "Pavilhão da Invicta" },
    { nome: "Lisboa",        equipa: "Atlético Escolar de Lisboa",pavilhao: "Pavilhão da Capital" },
  ],
  Internacional: [
    { nome: "Madrid",         equipa: "Madrid Voleibol Club",   pavilhao: "Arena de Madrid" },
    { nome: "Paris",          equipa: "Paris Volley Féminin",   pavilhao: "Arena de Paris" },
    { nome: "Roma",           equipa: "Roma Pallavolo",         pavilhao: "Arena de Roma" },
    { nome: "Londres",        equipa: "London Lionesses",       pavilhao: "Arena de Londres" },
    { nome: "Berlim",         equipa: "Berlin Volley Damen",    pavilhao: "Arena de Berlim" },
    { nome: "Amesterdão",     equipa: "Amsterdam Volleybal",    pavilhao: "Arena de Amesterdão" },
    { nome: "Rio de Janeiro", equipa: "Rio Vôlei Clube",        pavilhao: "Arena do Rio" },
    { nome: "Tóquio",         equipa: "Tokyo Sakura Volley",    pavilhao: "Arena de Tóquio" },
  ],
};

// Força do adversário em cada jornada (1.ª à 8.ª) — sobe a cada época.
const FORCAS_BASE = [33, 40, 46, 52, 58, 64, 70, 76];

// Cores disponíveis para o equipamento de jogo.
const CORES_KIT = [
  { id: "verde",    nome: "Verde do clube", cor: "#1b7a43" },
  { id: "branco",   nome: "Branco",         cor: "#f3f4f3" },
  { id: "preto",    nome: "Preto",          cor: "#15181a" },
  { id: "azul",     nome: "Azul",           cor: "#27548f" },
  { id: "vermelho", nome: "Vermelho",       cor: "#b03434" },
  { id: "roxo",     nome: "Roxo",           cor: "#6d3fa3" },
  { id: "rosa",     nome: "Rosa",           cor: "#d05a8c" },
  { id: "laranja",  nome: "Laranja",        cor: "#d97b2a" },
  { id: "amarelo",  nome: "Amarelo",        cor: "#d4b51e" },
  { id: "azulclaro",nome: "Azul-claro",     cor: "#3aa0c9" },
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
    idadeExtra: aleatorio(0, 2),                    // somada à idade do escalão
    pele: PELES[aleatorio(0, PELES.length - 1)].id, // cada rapariga é diferente
    cabelo: CABELO_CORES[aleatorio(0, CABELO_CORES.length - 1)].id,
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
    clube: { camisola: "#1b7a43", calcoes: "#15181a" },
    dia: 1,            // 1..5 — depois do 5.º dia é dia de jogo
    sessao: 1,         // 1..SESSOES_POR_DIA
    cidadeIdx: 0,
    epoca: 1,          // a época define o escalão (Mini A → … → Seniores)
    medalhas: [],      // { cidade, epoca, escalao }
    vitorias: 0,
    derrotas: 0,
  };
}

// Completa gravações antigas com os campos novos.
function migrar(e) {
  if (!e.clube) e.clube = { camisola: "#1b7a43", calcoes: "#15181a" };
  e.jogadoras.forEach((j) => {
    if (j.idadeExtra === undefined) j.idadeExtra = j.idade ? Math.max(0, Math.min(2, j.idade - 15)) : aleatorio(0, 2);
    if (!j.pele) j.pele = PELES[aleatorio(0, PELES.length - 1)].id;
    if (!j.cabelo) j.cabelo = CABELO_CORES[aleatorio(0, CABELO_CORES.length - 1)].id;
  });
  e.medalhas.forEach((m) => {
    if (!m.escalao) m.escalao = ESCALOES[Math.min(m.epoca - 1, ESCALOES.length - 1)].nome;
  });
  return e;
}

function escalaoAtual() {
  return ESCALOES[Math.min(estado.epoca - 1, ESCALOES.length - 1)];
}

function idadeDe(j) {
  return escalaoAtual().idadeBase + j.idadeExtra;
}

// Texto preto ou branco, consoante a cor de fundo.
function corTexto(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#15181a" : "#ffffff";
}

// Aplica as cores do equipamento ao campo (variáveis CSS).
function aplicarCoresKit() {
  const raiz = document.documentElement.style;
  raiz.setProperty("--kit-camisola", estado.clube.camisola);
  raiz.setProperty("--kit-calcoes", estado.clube.calcoes);
  raiz.setProperty("--kit-texto-camisola", corTexto(estado.clube.camisola));
  raiz.setProperty("--kit-texto-calcoes", corTexto(estado.clube.calcoes));
}

function guardar() {
  try {
    localStorage.setItem(CHAVE_SAVE, JSON.stringify(estado));
  } catch (e) { /* sem espaço ou modo privado — o jogo continua sem guardar */ }
}

function carregar() {
  try {
    const bruto = localStorage.getItem(CHAVE_SAVE);
    return bruto ? migrar(JSON.parse(bruto)) : null;
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
    <circle cx="82.5" cy="87.5" r="1" fill="#ffffff"/>
    <circle cx="120.5" cy="87.5" r="1" fill="#ffffff"/>
    ${pestanas}
    <!-- faces coradas -->
    <ellipse cx="72" cy="102" rx="6" ry="3.5" fill="#d9766044"/>
    <ellipse cx="128" cy="102" rx="6" ry="3.5" fill="#d9766044"/>
    <!-- nariz e boca -->
    <path d="M98 96 Q96 104 100 106" stroke="#00000033" stroke-width="2.5" fill="none"/>
    <path d="M86 116 Q100 126 114 116" stroke="#7a3b30" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </svg>`;
}

// Avatar de uma jogadora: cabelo sempre apanhado (coque) e joelheiras
// postas — regras do clube para ninguém se magoar!
function svgJogadora(j, kit = null) {
  const pele = corDe(PELES, j.pele);
  const cabelo = corDe(CABELO_CORES, j.cabelo);
  // A líbero usa o equipamento com as cores trocadas, como no voleibol a sério.
  const libero = j.pos === "Líbero";
  const camisola = kit ? kit.camisola : (libero ? estado.clube.calcoes : estado.clube.camisola);
  const calcoes = kit ? kit.calcoes : (libero ? estado.clube.camisola : estado.clube.calcoes);
  const textoCamisola = corTexto(camisola);
  return `
  <svg viewBox="0 0 80 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${j.nome}">
    <!-- coque (cabelo apanhado) -->
    <circle cx="40" cy="10" r="8" fill="${cabelo}"/>
    <path d="M24 26 Q24 12 40 12 Q56 12 56 26 Q49 19 40 19 Q31 19 24 26 Z" fill="${cabelo}"/>
    <!-- cabeça -->
    <circle cx="40" cy="27" r="14" fill="${pele}"/>
    <circle cx="35" cy="26" r="1.8" fill="#15181a"/>
    <circle cx="45" cy="26" r="1.8" fill="#15181a"/>
    <path d="M36 33 Q40 36 44 33" stroke="#7a3b30" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <!-- braços -->
    <rect x="14" y="46" width="8" height="26" rx="4" fill="${pele}"/>
    <rect x="58" y="46" width="8" height="26" rx="4" fill="${pele}"/>
    <!-- camisola com o número -->
    <path d="M20 44 Q40 38 60 44 L60 78 L20 78 Z" fill="${camisola}" stroke="#00000022"/>
    <text x="40" y="68" text-anchor="middle" font-size="18" font-weight="800" fill="${textoCamisola}">${j.numero}</text>
    <!-- calções -->
    <rect x="22" y="78" width="36" height="16" rx="4" fill="${calcoes}" stroke="#00000022"/>
    <!-- pernas -->
    <rect x="26" y="94" width="10" height="26" rx="4" fill="${pele}"/>
    <rect x="44" y="94" width="10" height="26" rx="4" fill="${pele}"/>
    <!-- JOELHEIRAS de proteção -->
    <rect x="24.5" y="101" width="13" height="9" rx="4" fill="#ffffff" stroke="#b9bdb9"/>
    <rect x="42.5" y="101" width="13" height="9" rx="4" fill="#ffffff" stroke="#b9bdb9"/>
    <!-- sapatilhas -->
    <rect x="23" y="119" width="15" height="7" rx="3" fill="#2c3236"/>
    <rect x="42" y="119" width="15" height="7" rx="3" fill="#2c3236"/>
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

function adversariosAtuais() {
  return ADVERSARIOS[escalaoAtual().nivel];
}

function cidadeAtual() {
  return adversariosAtuais()[estado.cidadeIdx % 8];
}

function forcaAdversario() {
  return FORCAS_BASE[estado.cidadeIdx % 8] + (estado.epoca - 1) * 7;
}

function irParaHub() {
  guardar();
  aplicarCoresKit();
  const t = estado.treinador;
  const esc = escalaoAtual();
  $("hub-avatar").innerHTML = svgAvatar(t);
  $("hub-nome").textContent = t.nome || (t.genero === "F" ? "Treinadora" : "Treinador");
  $("hub-titulo").textContent =
    `${tituloTreinador()} · Época ${estado.epoca} · Escalão ${esc.nome} · Nível ${esc.nivel}`;
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

  // Adversários do nível atual (escolas, cidades ou arenas internacionais)
  const ul = $("hub-cidades");
  ul.innerHTML = "";
  adversariosAtuais().forEach((c, i) => {
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
      div.innerHTML = svgMedalha(m.cidade) + `<span>${m.cidade}<br>${m.escalao}</span>`;
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
    <div class="cartao-cabeca">
      <div class="mini-jogadora">${svgJogadora(j)}</div>
      <div>
        <h4>${j.nome}</h4>
        <p class="posicao">${j.pos} · ${idadeDe(j)} anos</p>
        ${opcoes.editavel
          ? `<label class="numero-edit">N.º <input type="number" min="1" max="99" value="${j.numero}" data-id="${j.id}"></label>`
          : `<p class="posicao">N.º ${j.numero}</p>`}
      </div>
    </div>
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
  if (opcoes.editavel) {
    const input = div.querySelector("input");
    input.addEventListener("click", (ev) => ev.stopPropagation());
    input.addEventListener("change", () => {
      let novo = Math.max(1, Math.min(99, Math.round(Number(input.value) || j.numero)));
      // Se outra jogadora já tem esse número, trocam de número entre si.
      const outra = estado.jogadoras.find((o) => o.numero === novo && o.id !== j.id);
      if (outra) outra.numero = j.numero;
      j.numero = novo;
      guardar();
      abrirPlantel();
    });
  }
  return div;
}

function abrirPlantel() {
  aplicarCoresKit();
  const esc = escalaoAtual();
  $("plantel-descricao").textContent =
    `Escalão ${esc.nome} (nível ${esc.nivel}). Todas jogam de joelheiras e com o cabelo apanhado — ` +
    `regras do clube, para ninguém se magoar. Podes mudar o número de cada jogadora e as cores do equipamento.`;

  // Cores do equipamento
  const pintar = (elId, chave) => {
    const el = $(elId);
    el.innerHTML = "";
    CORES_KIT.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opcao opcao-cor";
      b.style.background = c.cor;
      b.title = c.nome;
      if (estado.clube[chave] === c.cor) b.classList.add("escolhida");
      b.addEventListener("click", () => {
        if (estado.clube.camisola === c.cor && chave === "calcoes") return; // iguais não dá
        if (estado.clube.calcoes === c.cor && chave === "camisola") return;
        estado.clube[chave] = c.cor;
        guardar();
        abrirPlantel();
      });
      el.appendChild(b);
    });
  };
  pintar("op-kit-camisola", "camisola");
  pintar("op-kit-calcoes", "calcoes");

  const lista = $("plantel-lista");
  lista.innerHTML = "";
  estado.jogadoras.forEach((j) => lista.appendChild(cartaoJogadora(j, { editavel: true })));
  mostrarEcra("ecra-plantel");
}

/* ============================ TREINO ============================ */

function abrirTreino() {
  $("treino-titulo").textContent =
    `Treino — ${DIAS_SEMANA[estado.dia - 1]}, ${estado.sessao}.ª sessão de ${SESSOES_POR_DIA}`;
  const cid = cidadeAtual();
  $("treino-descricao").textContent =
    `Escalão ${escalaoAtual().nome} · Faltam ${5 - estado.dia} dia(s) de treino para o jogo: ${cid.equipa} (${cid.nome}). ` +
    `As 16 jogadoras estão no pavilhão, de joelheiras e cabelo apanhado, à tua espera.`;

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
    `O autocarro chegou ao ${cid.pavilhao}. Do outro lado da rede: ${cid.equipa} (nível ${escalaoAtual().nivel}). ` +
    `Joelheiras postas e cabelos apanhados ✅ — ninguém se magoa! ` +
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
  { x: 25, y: 61 }, { x: 50, y: 61 }, { x: 75, y: 61 },   // rede
  { x: 25, y: 83 }, { x: 50, y: 83 }, { x: 75, y: 83 },   // defesa
];
const POSICOES_ELES = [
  { x: 25, y: 39 }, { x: 50, y: 39 }, { x: 75, y: 39 },
  { x: 25, y: 16 }, { x: 50, y: 16 }, { x: 75, y: 16 },
];

function comecarJogo() {
  const cid = cidadeAtual();
  jogo = {
    cidade: cid,
    emCampo: [...escolhaTitulares],
    banco: estado.jogadoras.filter((j) => !escolhaTitulares.has(j.id)).map((j) => j.id),
    jogaram: new Set([...escolhaTitulares]),
    stats: {},            // pontos e falhas de cada jogadora neste jogo
    adversarias: Array.from({ length: 6 }, (_, i) => ({
      numero: i + 1,
      pos: "Ponta",
      pele: PELES[aleatorio(0, PELES.length - 1)].id,
      cabelo: CABELO_CORES[aleatorio(0, CABELO_CORES.length - 1)].id,
    })),
    pontosNos: 0, pontosEles: 0,
    setsNos: 0, setsEles: 0,
    setAtual: 1,
    servimosNos: Math.random() < 0.5,
    aAnimar: false,
    auto: false,
    terminado: false,
  };
  estado.jogadoras.forEach((j) => (jogo.stats[j.id] = { pontos: 0, erros: 0 }));
  $("placar-nome-eles").textContent = cid.equipa;
  $("placar-cidade").textContent = `${cid.nome} · ${cid.pavilhao}`;
  $("comentarios").innerHTML = "";
  comentar(`🏟️ Bem-vindos ao ${cid.pavilhao} (${cid.nome})! A equipa entra a rigor: joelheiras postas e cabelo apanhado.`, "info-set");
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
    div.className = "jogadora-campo nos" + (id === destaqueId ? " destaque" : "");
    div.style.left = POSICOES_NOS[i].x + "%";
    div.style.top = POSICOES_NOS[i].y + "%";
    div.innerHTML = `<div class="figura">${svgJogadora(j)}</div><div class="nome-campo">${j.nome.split(" ")[0]}</div>`;
    campo.appendChild(div);
  });

  POSICOES_ELES.forEach((p, i) => {
    const adv = jogo.adversarias[i];
    const div = document.createElement("div");
    div.className = "jogadora-campo eles";
    div.style.left = p.x + "%";
    div.style.top = p.y + "%";
    div.innerHTML = `<div class="figura">${svgJogadora(adv, { camisola: "#8d2f2f", calcoes: "#2b2b2b" })}</div>`;
    campo.appendChild(div);
  });

  // A treinadora (ou o treinador) está de pé junto à linha lateral.
  $("treinador-campo").innerHTML =
    svgAvatar(estado.treinador) + `<div class="nome-campo">${estado.treinador.genero === "F" ? "Treinadora" : "Treinador"}</div>`;

  atualizarEmCampoStats();
}

// Painel ao vivo: pontos ✅ e falhas ❌ de quem está em campo.
// Clicar numa jogadora abre logo a substituição com ela escolhida para sair.
function atualizarEmCampoStats() {
  const painel = $("em-campo-stats");
  painel.innerHTML = "";
  jogo.emCampo.forEach((id) => {
    const j = jogadoraPorId(id);
    const s = jogo.stats[id];
    const falhando = s.erros >= 2 && s.erros > s.pontos;
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip-jogadora" + (falhando ? " falhando" : "");
    chip.title = "Clica para substituir a " + j.nome.split(" ")[0];
    chip.innerHTML =
      `<strong>${j.numero} ${j.nome.split(" ")[0]}</strong>` +
      `<span>✅${s.pontos} ❌${s.erros} ⚡${Math.round(j.energia)}</span>` +
      (falhando ? `<span class="aviso-falha">a falhar!</span>` : "");
    chip.addEventListener("click", () => abrirSubs(id));
    painel.appendChild(chip);
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

function frescuraDe(j) {
  return 0.55 + 0.45 * (j.energia / 100);
}

function skillDe(j, stat) {
  return j[stat] * frescuraDe(j);
}

// Escolhe uma jogadora em campo, com mais probabilidade para quem tem o
// stat mais alto. A líbero é a defesa preferida; no ataque não conta
// (como no voleibol a sério, a líbero não remata).
function escolherPorStat(stat, excluir = []) {
  let candidatas = jogo.emCampo.map(jogadoraPorId).filter((j) => !excluir.includes(j.id));
  if (stat === "remate") {
    const semLibero = candidatas.filter((j) => j.pos !== "Líbero");
    if (semLibero.length) candidatas = semLibero;
  }
  const peso = (j) => {
    let w = j[stat] * j[stat];
    if (stat === "manchete" && j.pos === "Líbero") w *= 2;
    if (stat === "passe" && j.pos === "Levantadora") w *= 2;
    return w;
  };
  const total = candidatas.reduce((s, j) => s + peso(j), 0);
  let r = Math.random() * total;
  for (const j of candidatas) {
    r -= peso(j);
    if (r <= 0) return j;
  }
  return candidatas[candidatas.length - 1];
}

// Quando perdemos um ponto, a culpa cai com mais probabilidade em quem
// está mais fraca ou mais cansada nessa fase do jogo.
function escolherCulpada(fases) {
  const total = fases.reduce((s, f) => s + f.peso, 0);
  let r = Math.random() * total;
  for (const f of fases) {
    r -= f.peso;
    if (r <= 0) return f;
  }
  return fases[fases.length - 1];
}

function registarPonto(j) { jogo.stats[j.id].pontos++; }
function registarErro(j) { jogo.stats[j.id].erros++; }

function jogarPonto() {
  if (!jogo || jogo.aAnimar || jogo.terminado) return;
  jogo.aAnimar = true;
  $("btn-jogar-ponto").disabled = true;
  $("btn-substituicao").disabled = true;

  // O resultado do ponto depende das jogadoras que tocam na bola nesta
  // jogada — receção, passe e remate — e do trabalho de equipa.
  const recetora = escolherPorStat("manchete");
  const levantadora = escolherPorStat("passe", [recetora.id]);
  const atacante = escolherPorStat("remate", [recetora.id, levantadora.id]);
  const servidora = jogadoraPorId(jogo.emCampo[0]); // posição 1 serve

  const mediaEquipa = jogo.emCampo.reduce((s, id) => s + jogadoraPorId(id).equipa, 0) / 6;
  const fatorEquipa = 0.8 + 0.4 * (mediaEquipa / 100);
  const score =
    (skillDe(recetora, "manchete") * 0.35 +
      skillDe(levantadora, "passe") * 0.2 +
      skillDe(atacante, "remate") * 0.45) * fatorEquipa;
  // Servir é um pouco mais difícil de ganhar do que receber (realista).
  const eles = forcaAdversario() * (0.92 + Math.random() * 0.16) + (jogo.servimosNos ? 2.5 : 0);
  const pNos = Math.pow(score, 1.4) / (Math.pow(score, 1.4) + Math.pow(eles, 1.4));
  const ganhamos = Math.random() < pNos;

  const passos = construirNarracao(ganhamos, { recetora, levantadora, atacante, servidora });

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

function construirNarracao(ganhamos, atores) {
  const { recetora, levantadora, atacante, servidora } = atores;
  const passos = [];
  const primeiro = (j) => j.nome.split(" ")[0];
  const eq = jogo.cidade.equipa;

  // Pesos de "culpa": quanto mais fraca/cansada na fase, mais provável falhar.
  const fasesRececao = [
    { quem: recetora, fase: "rececao", peso: Math.max(8, 115 - skillDe(recetora, "manchete")) },
    { quem: levantadora, fase: "passe", peso: Math.max(5, (110 - skillDe(levantadora, "passe")) * 0.55) },
    { quem: atacante, fase: "remate", peso: Math.max(8, 115 - skillDe(atacante, "remate")) },
  ];

  if (jogo.servimosNos) {
    passos.push({ texto: `${primeiro(servidora)} atira a bola ao ar e serve…`, bola: { x: 82, y: 93 }, destaque: servidora.id });
    if (ganhamos) {
      const v = Math.random();
      if (v < 0.16) {
        registarPonto(servidora);
        passos.push({ texto: `A bola voa rasante à rede…`, bola: { x: 50, y: 32 } });
        passos.push({ texto: `ÁS DE SERVIÇO da ${primeiro(servidora)}! Ninguém lhe tocou! 🎯`, bola: { x: 40, y: 14 }, classe: "ponto-nos" });
      } else if (v < 0.34) {
        passos.push({ texto: `Serviço colocado a queimar a linha…`, bola: { x: 30, y: 25 } });
        passos.push({ texto: `A receção da ${eq} sai torta e a bola vai para fora! Ponto nosso! ✅`, bola: { x: 8, y: 6 }, classe: "ponto-nos" });
      } else {
        registarPonto(atacante);
        passos.push({ texto: `A ${eq} devolve por cima…`, bola: { x: 55, y: 35 } });
        passos.push({ texto: `${primeiro(recetora)} segura a defesa de manchete! 💪`, bola: { x: 35, y: 78 }, destaque: recetora.id });
        passos.push({ texto: `${primeiro(levantadora)} levanta na perfeição…`, bola: { x: 50, y: 64 }, destaque: levantadora.id });
        passos.push({ texto: `${primeiro(atacante)} REMATA no contra-ataque — PONTO! 💥`, bola: { x: 62, y: 20 }, destaque: atacante.id, classe: "ponto-nos" });
      }
    } else {
      const v = Math.random();
      if (v < 0.2) {
        registarErro(servidora);
        passos.push({ texto: `…mas o serviço da ${primeiro(servidora)} fica na rede. Ponto para a ${eq}. 😬`, bola: { x: 75, y: 50 }, classe: "ponto-eles" });
      } else if (v < 0.45) {
        passos.push({ texto: `A ${eq} constrói o ataque com calma…`, bola: { x: 55, y: 35 } });
        passos.push({ texto: `O remate delas entra sem hipótese. Ponto para a ${eq}.`, bola: { x: 45, y: 78 }, classe: "ponto-eles" });
      } else {
        const culpa = escolherCulpada(fasesRececao.slice(0, 2)); // defesa ou passe de transição
        registarErro(culpa.quem);
        passos.push({ texto: `A ${eq} responde com um ataque forte…`, bola: { x: 60, y: 38 } });
        if (culpa.fase === "rececao") {
          passos.push({ texto: `${primeiro(culpa.quem)} tenta a manchete, mas a bola foge para fora. Ponto delas.`, bola: { x: 10, y: 95 }, destaque: culpa.quem.id, classe: "ponto-eles" });
        } else {
          passos.push({ texto: `${primeiro(culpa.quem)} não consegue segurar o passe e a bola morre na rede. Ponto delas.`, bola: { x: 50, y: 52 }, destaque: culpa.quem.id, classe: "ponto-eles" });
        }
      }
    }
  } else {
    passos.push({ texto: `Serviço da ${eq}…`, bola: { x: 18, y: 7 } });
    if (ganhamos) {
      const v = Math.random();
      passos.push({ texto: `${primeiro(recetora)} recebe de manchete, bola controlada.`, bola: { x: 40, y: 80 }, destaque: recetora.id });
      passos.push({ texto: `${primeiro(levantadora)} levanta para a ponta…`, bola: { x: 55, y: 63 }, destaque: levantadora.id });
      if (v < 0.55) {
        registarPonto(atacante);
        passos.push({ texto: `${primeiro(atacante)} REMATA na diagonal — a bola explode no chão! PONTO! 💥`, bola: { x: 30, y: 18 }, destaque: atacante.id, classe: "ponto-nos" });
      } else if (v < 0.8) {
        registarPonto(atacante);
        passos.push({ texto: `${primeiro(atacante)} ataca, elas defendem…`, bola: { x: 50, y: 35 }, destaque: atacante.id });
        passos.push({ texto: `…mas a segunda bola da ${primeiro(atacante)} é imparável! Ponto! ✅`, bola: { x: 70, y: 16 }, destaque: atacante.id, classe: "ponto-nos" });
      } else {
        registarPonto(atacante);
        passos.push({ texto: `${primeiro(atacante)} finge o remate e larga um amorti subtil… 🪶`, bola: { x: 45, y: 40 }, destaque: atacante.id });
        passos.push({ texto: `A ${eq} nem se mexe! Ponto de inteligência pura!`, bola: { x: 45, y: 42 }, classe: "ponto-nos" });
      }
    } else {
      const culpa = escolherCulpada(fasesRececao);
      registarErro(culpa.quem);
      if (culpa.fase === "rececao") {
        const ace = Math.random() < 0.4;
        if (ace) {
          passos.push({ texto: `A bola cai entre a ${primeiro(culpa.quem)} e a linha — ás da ${eq}. 😬`, bola: { x: 60, y: 88 }, destaque: culpa.quem.id, classe: "ponto-eles" });
        } else {
          passos.push({ texto: `${primeiro(culpa.quem)} tenta a manchete…`, bola: { x: 40, y: 82 }, destaque: culpa.quem.id });
          passos.push({ texto: `…mas a receção sai torta e a bola vai para fora. Ponto da ${eq}.`, bola: { x: 8, y: 95 }, classe: "ponto-eles" });
        }
      } else if (culpa.fase === "passe") {
        passos.push({ texto: `${primeiro(recetora)} recebe…`, bola: { x: 40, y: 80 }, destaque: recetora.id });
        passos.push({ texto: `O passe da ${primeiro(culpa.quem)} sai curto e a bola fica na rede. Ponto da ${eq}.`, bola: { x: 50, y: 52 }, destaque: culpa.quem.id, classe: "ponto-eles" });
      } else {
        passos.push({ texto: `${primeiro(recetora)} recebe, ${primeiro(levantadora)} levanta…`, bola: { x: 50, y: 65 }, destaque: levantadora.id });
        if (Math.random() < 0.5) {
          passos.push({ texto: `${primeiro(culpa.quem)} remata… BLOCO da ${eq}! Ponto delas.`, bola: { x: 55, y: 58 }, destaque: culpa.quem.id, classe: "ponto-eles" });
        } else {
          passos.push({ texto: `${primeiro(culpa.quem)} bate forte… mas a bola sai pela linha de fundo. Ponto da ${eq}.`, bola: { x: 50, y: 4 }, destaque: culpa.quem.id, classe: "ponto-eles" });
        }
      }
    }
  }
  return passos;
}

function terminarPonto(ganhamos) {
  if (ganhamos) {
    if (!jogo.servimosNos) {
      // Recuperámos o serviço: a equipa RODA uma posição, como no voleibol a sério.
      jogo.emCampo.push(jogo.emCampo.shift());
    }
    jogo.pontosNos++;
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
  } else {
    // Momentos de tensão, como num jogo a sério.
    if (jogo.pontosNos === alvo - 1 && jogo.pontosNos - jogo.pontosEles >= 1) {
      comentar(`🔥 ${jogo.pontosNos}–${jogo.pontosEles}: PONTO DE SET para nós!`, "info-set");
    } else if (jogo.pontosEles === alvo - 1 && jogo.pontosEles - jogo.pontosNos >= 1) {
      comentar(`⚠️ ${jogo.pontosNos}–${jogo.pontosEles}: ponto de set para a ${jogo.cidade.equipa}…`, "info-set");
    } else if (jogo.pontosNos === jogo.pontosEles && jogo.pontosNos >= alvo - 1) {
      comentar(`😮 Empate a ${jogo.pontosNos} — agora é ponto a ponto até haver 2 de diferença!`, "info-set");
    } else if ((jogo.pontosNos + jogo.pontosEles) % 6 === 0) {
      comentar(`Marcador: ${jogo.pontosNos}–${jogo.pontosEles}.`, "info-set");
    }
  }

  desenharCampo(); // atualiza rotação, energia e estatísticas em campo

  // Avisos da bancada: cansaço e jogadoras a falhar muito.
  const aFalhar = jogo.emCampo
    .map(jogadoraPorId)
    .filter((j) => jogo.stats[j.id].erros >= 3 && jogo.stats[j.id].erros > jogo.stats[j.id].pontos);
  if (aFalhar.length && Math.random() < 0.35) {
    const j = aFalhar[0];
    comentar(`📣 A ${j.nome.split(" ")[0]} já falhou ${jogo.stats[j.id].erros} bolas — clica nela em baixo para a trocares por uma suplente melhor!`, "info-set");
  } else {
    const mediaEnergia = jogo.emCampo.reduce((s, id) => s + jogadoraPorId(id).energia, 0) / 6;
    if (mediaEnergia < 40 && Math.random() < 0.25) {
      comentar("📣 As tuas jogadoras parecem cansadas… talvez seja altura de uma substituição!", "info-set");
    }
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

function abrirSubs(preSai = null) {
  if (!jogo || jogo.aAnimar || jogo.terminado) return;
  subEscolha = { sai: null, entra: null };
  const desenhaLista = (elId, ids, chave) => {
    const el = $(elId);
    el.innerHTML = "";
    ids.forEach((id) => {
      const j = jogadoraPorId(id);
      const s = jogo.stats[id];
      const div = document.createElement("div");
      div.className = "sub-item";
      const desempenho = chave === "sai"
        ? ` · ✅${s.pontos} ❌${s.erros}`
        : ` · Remate ${Math.round(j.remate)} · Manchete ${Math.round(j.manchete)}`;
      div.innerHTML = `<strong>${j.numero}. ${j.nome}</strong> — ${j.pos}<br>
        <span class="energia-txt">⚡ Energia: ${Math.round(j.energia)}${desempenho}</span>`;
      div.addEventListener("click", () => {
        subEscolha[chave] = id;
        el.querySelectorAll(".sub-item").forEach((x) => x.classList.remove("escolhida"));
        div.classList.add("escolhida");
        $("btn-confirmar-sub").disabled = !(subEscolha.sai !== null && subEscolha.entra !== null);
      });
      if (chave === "sai" && id === preSai) div.click();
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
    estado.medalhas.push({ cidade: cid.nome, epoca: estado.epoca, escalao: escalaoAtual().nome });
    $("resultado-jogo-titulo").textContent = `🎉 Vitória contra ${cid.equipa}!`;
    $("resultado-jogo-texto").textContent =
      `Final: ${jogo.setsNos}–${jogo.setsEles} em sets contra ${cid.equipa}. ` +
      `No fim do jogo, as 16 jogadoras juntam-se à tua volta, aos saltos… e a capitã pendura-te uma medalha ao pescoço!`;
    $("medalha-svg").innerHTML = svgMedalha(cid.nome);
    $("medalha-texto").textContent = f
      ? `Medalha de ${cid.nome} entregue à treinadora ${estado.treinador.nome}! 🏅`
      : `Medalha de ${cid.nome} entregue ao treinador ${estado.treinador.nome}! 🏅`;
    $("medalha-cerimonia").classList.remove("escondido");

    estado.cidadeIdx++;
    if (estado.cidadeIdx >= 8) {
      // Época completa: título ganho e subida de escalão!
      const esc = escalaoAtual();
      const proximo = ESCALOES[Math.min(estado.epoca, ESCALOES.length - 1)];
      $("resultado-jogo-titulo").textContent = `🏆 CAMPEÃS DO NÍVEL ${esc.nivel.toUpperCase()}! 🏆`;
      if (esc.nome === "Seniores") {
        $("resultado-jogo-texto").textContent =
          `As tuas Seniores ganharam o título internacional em ${cid.nome}! São as melhores do mundo — ` +
          `e gritam o teu nome ao erguer a taça. A próxima época internacional vem ainda mais forte!`;
      } else {
        $("resultado-jogo-texto").textContent =
          `Ganhaste todos os jogos do escalão ${esc.nome}! As tuas jogadoras erguem a taça em ${cid.nome} e ` +
          `gritam o teu nome. Na próxima época sobem ao escalão ${proximo.nome} (nível ${proximo.nivel}) — ` +
          `mais crescidas e prontas para adversárias mais fortes!`;
      }
      estado.epoca++;
      estado.cidadeIdx = 0;
    }
  } else {
    estado.derrotas++;
    $("resultado-jogo-titulo").textContent = `Derrota contra ${cid.equipa}…`;
    $("resultado-jogo-texto").textContent =
      `Final: ${jogo.setsNos}–${jogo.setsEles} contra ${cid.equipa}. As jogadoras estão de cabeça baixa, mas tu sabes o que dizer: ` +
      `"Para a semana treinamos mais passe, mais manchete, mais remate — e voltamos para ganhar!" Nova semana de treinos, novo jogo contra ${cid.equipa}.`;
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
  $("btn-substituicao").addEventListener("click", () => abrirSubs());
  $("btn-confirmar-sub").addEventListener("click", confirmarSub);
  $("btn-fechar-subs").addEventListener("click", fecharSubs);
  $("btn-resultado-continuar").addEventListener("click", irParaHub);
});
