/* Gestor de Tarefas — lógica da aplicação.
   Os dados vivem apenas no localStorage do browser: não há servidor
   nem acesso a contas externas (Outlook, Teams, …). */
"use strict";

/* ===================== Estado e persistência ===================== */

const CHAVE = "gestor-tarefas-v1";

const CORES_PROJETO = [
  "#2563eb", "#0d9488", "#d97706", "#7c3aed",
  "#db2777", "#16a34a", "#dc2626", "#475569",
];

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function estadoInicial() {
  return {
    projetos: [{ id: uid(), nome: "Geral", cor: CORES_PROJETO[0] }],
    tarefas: [],
  };
}

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE));
    if (dados && Array.isArray(dados.projetos) && Array.isArray(dados.tarefas)) {
      return dados;
    }
  } catch {
    /* dados corrompidos: recomeça */
  }
  return estadoInicial();
}

let estado = carregar();

function guardar() {
  localStorage.setItem(CHAVE, JSON.stringify(estado));
}

/* ===================== Datas ===================== */

function hojeISO() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatarData(iso) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("pt-PT", {
    weekday: "short", day: "numeric", month: "short",
  });
}

function diasDeAtraso(iso) {
  const [a, m, d] = iso.split("-").map(Number);
  const [ha, hm, hd] = hojeISO().split("-").map(Number);
  return Math.round((new Date(ha, hm - 1, hd) - new Date(a, m - 1, d)) / 86400000);
}

/* ===================== Utilitários ===================== */

const $ = (sel) => document.querySelector(sel);

function escaparHTML(texto) {
  return String(texto)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

const NOME_PRIORIDADE = { 1: "Alta", 2: "Média", 3: "Baixa" };

function projetoPorId(id) {
  return estado.projetos.find((p) => p.id === id);
}

function compararTarefas(a, b) {
  return (a.data || "9999").localeCompare(b.data || "9999")
    || a.prioridade - b.prioridade
    || a.titulo.localeCompare(b.titulo, "pt");
}

/* ===================== Navegação entre vistas ===================== */

let vistaAtual = "hoje";

document.querySelectorAll(".aba").forEach((botao) => {
  botao.addEventListener("click", () => {
    vistaAtual = botao.dataset.vista;
    document.querySelectorAll(".aba").forEach((b) =>
      b.classList.toggle("ativa", b === botao));
    document.querySelectorAll(".vista").forEach((v) =>
      v.classList.toggle("oculta", v.id !== `vista-${vistaAtual}`));
    desenhar();
  });
});

/* ===================== Desenho ===================== */

function desenhar() {
  $("#data-hoje").textContent = new Date().toLocaleDateString("pt-PT", {
    weekday: "long", day: "numeric", month: "long",
  });
  preencherSeletoresProjeto();
  if (vistaAtual === "hoje") desenharHoje();
  if (vistaAtual === "projetos") desenharProjetos();
}

function preencherSeletoresProjeto() {
  const opcoes = estado.projetos
    .map((p) => `<option value="${p.id}">${escaparHTML(p.nome)}</option>`)
    .join("");
  for (const sel of ["#rapido-projeto", "#importar-projeto", "#tarefa-projeto"]) {
    const el = $(sel);
    const anterior = el.value;
    el.innerHTML = opcoes;
    if (projetoPorId(anterior)) el.value = anterior;
  }
}

function htmlTarefa(tarefa, { mostrarAtraso = true } = {}) {
  const etiquetas = [];
  if (tarefa.prioridade !== 2) {
    etiquetas.push(`<span class="etiqueta prio-${tarefa.prioridade}">${NOME_PRIORIDADE[tarefa.prioridade]}</span>`);
  }
  if (tarefa.data) {
    const atraso = diasDeAtraso(tarefa.data);
    if (mostrarAtraso && !tarefa.feita && atraso > 0) {
      const dias = atraso === 1 ? "1 dia" : `${atraso} dias`;
      etiquetas.push(`<span class="etiqueta atraso">Em atraso há ${dias}</span>`);
    } else {
      etiquetas.push(`<span class="etiqueta">${formatarData(tarefa.data)}</span>`);
    }
  }
  return `
    <li class="tarefa ${tarefa.feita ? "feita" : ""}" data-id="${tarefa.id}">
      <input type="checkbox" ${tarefa.feita ? "checked" : ""} aria-label="Concluir tarefa" />
      <div class="tarefa-corpo">
        <span class="tarefa-titulo">${escaparHTML(tarefa.titulo)}</span>
        ${tarefa.notas ? `<span class="tarefa-notas">${escaparHTML(tarefa.notas)}</span>` : ""}
        ${etiquetas.length ? `<div class="etiquetas">${etiquetas.join("")}</div>` : ""}
      </div>
    </li>`;
}

/* ---------- Vista: Hoje ---------- */

function desenharHoje() {
  const hoje = hojeISO();
  const pendentes = estado.tarefas.filter((t) => !t.feita && t.data && t.data <= hoje);
  const emAtraso = pendentes.filter((t) => t.data < hoje).length;

  const resumo = $("#resumo-hoje");
  if (pendentes.length === 0) {
    resumo.textContent = "Sem tarefas com data para hoje.";
  } else {
    resumo.innerHTML =
      `<strong>${pendentes.length}</strong> tarefa${pendentes.length === 1 ? "" : "s"} para gerir hoje`
      + (emAtraso ? `, <strong>${emAtraso}</strong> em atraso.` : ".");
  }

  const blocos = [];
  for (const projeto of estado.projetos) {
    const doProjeto = pendentes
      .filter((t) => t.projetoId === projeto.id)
      .sort(compararTarefas);
    if (doProjeto.length === 0) continue;
    blocos.push(`
      <section class="grupo-projeto">
        <header class="grupo-cabecalho" style="border-left-color:${projeto.cor}">
          <h2>${escaparHTML(projeto.nome)}</h2>
          <span class="contagem">${doProjeto.length}</span>
        </header>
        <ul class="lista-tarefas">${doProjeto.map((t) => htmlTarefa(t)).join("")}</ul>
      </section>`);
  }

  $("#lista-hoje").innerHTML = blocos.length
    ? blocos.join("")
    : `<div class="vazio"><span class="emoji">🎉</span>
         Tudo em dia! Adiciona tarefas acima ou consulta a aba «Projetos»
         para veres tarefas sem data.</div>`;
}

/* ---------- Vista: Projetos ---------- */

function desenharProjetos() {
  const blocos = estado.projetos.map((projeto) => {
    const tarefas = estado.tarefas.filter((t) => t.projetoId === projeto.id);
    const abertas = tarefas.filter((t) => !t.feita).sort(compararTarefas);
    const feitas = tarefas.filter((t) => t.feita);
    return `
      <details class="grupo-projeto" data-projeto="${projeto.id}" open>
        <summary>
          <header class="grupo-cabecalho" style="border-left-color:${projeto.cor}">
            <span class="seta">▶</span>
            <h2>${escaparHTML(projeto.nome)}</h2>
            <span class="contagem">${abertas.length} aberta${abertas.length === 1 ? "" : "s"}</span>
            <button type="button" class="btn-editar-projeto" data-editar-projeto="${projeto.id}"
              aria-label="Editar projeto">✎</button>
          </header>
        </summary>
        <ul class="lista-tarefas">${abertas.map((t) => htmlTarefa(t)).join("")}</ul>
        <form class="form-tarefa-projeto" data-projeto="${projeto.id}" autocomplete="off">
          <input type="text" name="titulo" placeholder="Nova tarefa…" required />
          <input type="date" name="data" aria-label="Data limite" />
          <select name="prioridade" aria-label="Prioridade">
            <option value="1">Alta</option>
            <option value="2" selected>Média</option>
            <option value="3">Baixa</option>
          </select>
          <button type="submit" class="btn primario">+</button>
        </form>
        ${feitas.length ? `
          <details class="concluidas">
            <summary>Concluídas (${feitas.length})</summary>
            <ul class="lista-tarefas">${feitas.map((t) => htmlTarefa(t)).join("")}</ul>
          </details>` : ""}
      </details>`;
  });

  $("#lista-projetos").innerHTML = blocos.join("")
    || `<div class="vazio"><span class="emoji">📁</span>Cria o primeiro projeto.</div>`;
}

/* ===================== Ações sobre tarefas ===================== */

function adicionarTarefa(dados) {
  estado.tarefas.push({
    id: uid(),
    projetoId: dados.projetoId,
    titulo: dados.titulo.trim(),
    notas: dados.notas || "",
    data: dados.data || null,
    prioridade: dados.prioridade || 2,
    feita: false,
    criadaEm: new Date().toISOString(),
  });
  guardar();
}

/* Clique numa tarefa: a caixa conclui, o resto abre a edição. */
document.querySelector("main").addEventListener("click", (evento) => {
  const itemTarefa = evento.target.closest(".tarefa");
  if (itemTarefa && !itemTarefa.closest("#previsao-importar")) {
    const tarefa = estado.tarefas.find((t) => t.id === itemTarefa.dataset.id);
    if (!tarefa) return;
    if (evento.target.matches('input[type="checkbox"]')) {
      tarefa.feita = evento.target.checked;
      guardar();
      desenhar();
    } else {
      abrirDialogoTarefa(tarefa);
    }
    return;
  }
  const botaoEditar = evento.target.closest("[data-editar-projeto]");
  if (botaoEditar) {
    evento.preventDefault();
    abrirDialogoProjeto(projetoPorId(botaoEditar.dataset.editarProjeto));
  }
});

/* Adição rápida na vista «Hoje» (fica com data de hoje). */
$("#form-rapido").addEventListener("submit", (evento) => {
  evento.preventDefault();
  adicionarTarefa({
    projetoId: $("#rapido-projeto").value,
    titulo: $("#rapido-titulo").value,
    data: hojeISO(),
  });
  $("#rapido-titulo").value = "";
  desenhar();
});

/* Adição dentro de um projeto. */
$("#vista-projetos").addEventListener("submit", (evento) => {
  const form = evento.target.closest(".form-tarefa-projeto");
  if (!form) return;
  evento.preventDefault();
  adicionarTarefa({
    projetoId: form.dataset.projeto,
    titulo: form.elements.titulo.value,
    data: form.elements.data.value || null,
    prioridade: Number(form.elements.prioridade.value),
  });
  form.reset();
  desenhar();
});

/* ---------- Diálogo de edição de tarefa ---------- */

let tarefaEmEdicao = null;

function abrirDialogoTarefa(tarefa) {
  tarefaEmEdicao = tarefa;
  preencherSeletoresProjeto();
  $("#tarefa-titulo").value = tarefa.titulo;
  $("#tarefa-projeto").value = tarefa.projetoId;
  $("#tarefa-data").value = tarefa.data || "";
  $("#tarefa-prioridade").value = String(tarefa.prioridade);
  $("#tarefa-notas").value = tarefa.notas || "";
  $("#dialogo-tarefa").showModal();
}

$("#form-tarefa").addEventListener("submit", () => {
  Object.assign(tarefaEmEdicao, {
    titulo: $("#tarefa-titulo").value.trim(),
    projetoId: $("#tarefa-projeto").value,
    data: $("#tarefa-data").value || null,
    prioridade: Number($("#tarefa-prioridade").value),
    notas: $("#tarefa-notas").value.trim(),
  });
  guardar();
  desenhar();
});

$("#btn-apagar-tarefa").addEventListener("click", () => {
  if (!confirm("Apagar esta tarefa?")) return;
  estado.tarefas = estado.tarefas.filter((t) => t !== tarefaEmEdicao);
  guardar();
  $("#dialogo-tarefa").close();
  desenhar();
});

/* ===================== Projetos ===================== */

let projetoEmEdicao = null; // null = novo projeto
let corEscolhida = CORES_PROJETO[0];

function desenharPaleta() {
  $("#paleta-cores").innerHTML = CORES_PROJETO.map((cor) =>
    `<button type="button" class="cor ${cor === corEscolhida ? "escolhida" : ""}"
       style="background:${cor}" data-cor="${cor}" aria-label="Cor ${cor}"></button>`
  ).join("");
}

$("#paleta-cores").addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-cor]");
  if (!botao) return;
  corEscolhida = botao.dataset.cor;
  desenharPaleta();
});

function abrirDialogoProjeto(projeto) {
  projetoEmEdicao = projeto || null;
  corEscolhida = projeto ? projeto.cor : CORES_PROJETO[estado.projetos.length % CORES_PROJETO.length];
  $("#titulo-dialogo-projeto").textContent = projeto ? "Editar projeto" : "Novo projeto";
  $("#projeto-nome").value = projeto ? projeto.nome : "";
  $("#btn-apagar-projeto").hidden = !projeto;
  desenharPaleta();
  $("#dialogo-projeto").showModal();
}

$("#btn-novo-projeto").addEventListener("click", () => abrirDialogoProjeto(null));

$("#form-projeto").addEventListener("submit", () => {
  const nome = $("#projeto-nome").value.trim();
  if (projetoEmEdicao) {
    projetoEmEdicao.nome = nome;
    projetoEmEdicao.cor = corEscolhida;
  } else {
    estado.projetos.push({ id: uid(), nome, cor: corEscolhida });
  }
  guardar();
  desenhar();
});

$("#btn-apagar-projeto").addEventListener("click", () => {
  const total = estado.tarefas.filter((t) => t.projetoId === projetoEmEdicao.id).length;
  const aviso = total
    ? `Apagar o projeto «${projetoEmEdicao.nome}» e as suas ${total} tarefas?`
    : `Apagar o projeto «${projetoEmEdicao.nome}»?`;
  if (!confirm(aviso)) return;
  estado.tarefas = estado.tarefas.filter((t) => t.projetoId !== projetoEmEdicao.id);
  estado.projetos = estado.projetos.filter((p) => p !== projetoEmEdicao);
  if (estado.projetos.length === 0) estado = estadoInicial();
  guardar();
  $("#dialogo-projeto").close();
  desenhar();
});

/* Botões «Cancelar» fecham o diálogo respetivo. */
document.querySelectorAll("dialog [data-fechar]").forEach((botao) => {
  botao.addEventListener("click", () => botao.closest("dialog").close());
});

/* ===================== Importação por texto ===================== */

/* Interpreta uma linha colada. Aceita campos separados por «;» ou
   tabulação (título; data; prioridade) e deteta datas e palavras de
   prioridade dentro do texto. */
function interpretarLinha(linha) {
  const campos = linha.split(/\t|;/).map((c) => c.trim()).filter(Boolean);
  if (campos.length === 0) return null;

  let titulo = campos[0];
  let data = null;
  let prioridade = 2;

  const restante = campos.slice(1).join(" ");
  const textoCompleto = `${restante} ${campos.length === 1 ? titulo : ""}`;

  // Datas: 2026-06-15, 15/06/2026, 15-06-2026 ou 15/06 (ano atual)
  const iso = textoCompleto.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  const pt = textoCompleto.match(/\b(\d{1,2})[/\-](\d{1,2})(?:[/\-](\d{2,4}))?\b/);
  if (iso) {
    data = iso[0];
  } else if (pt) {
    const dia = Number(pt[1]), mes = Number(pt[2]);
    let ano = pt[3] ? Number(pt[3]) : new Date().getFullYear();
    if (ano < 100) ano += 2000;
    if (dia >= 1 && dia <= 31 && mes >= 1 && mes <= 12) {
      data = `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
      if (campos.length === 1) titulo = titulo.replace(pt[0], "").replace(/\s{2,}/g, " ").trim();
    }
  }

  if (/\b(urgente|alta)\b/i.test(textoCompleto)) prioridade = 1;
  else if (/\bbaixa\b/i.test(textoCompleto)) prioridade = 3;

  if (!titulo) return null;
  return { titulo, data, prioridade };
}

function interpretarTexto(texto) {
  return texto.split("\n")
    .map((linha) => interpretarLinha(linha.trim()))
    .filter(Boolean);
}

let tarefasPrevistas = [];

$("#btn-previsualizar").addEventListener("click", () => {
  tarefasPrevistas = interpretarTexto($("#importar-texto").value);
  $("#btn-importar").disabled = tarefasPrevistas.length === 0;
  $("#btn-importar").textContent = tarefasPrevistas.length
    ? `Importar ${tarefasPrevistas.length} tarefa${tarefasPrevistas.length === 1 ? "" : "s"}`
    : "Importar";

  if (tarefasPrevistas.length === 0) {
    $("#previsao-importar").innerHTML =
      `<div class="vazio">Nenhuma tarefa reconhecida no texto colado.</div>`;
    return;
  }
  $("#previsao-importar").innerHTML = `
    <section class="grupo-projeto">
      <header class="grupo-cabecalho"><h2>Pré-visualização</h2></header>
      <ul class="lista-tarefas">
        ${tarefasPrevistas.map((t) => htmlTarefa(
          { ...t, id: "", notas: "", feita: false },
          { mostrarAtraso: false },
        )).join("")}
      </ul>
    </section>`;
});

$("#form-importar").addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (tarefasPrevistas.length === 0) return;
  const projetoId = $("#importar-projeto").value;
  for (const t of tarefasPrevistas) adicionarTarefa({ ...t, projetoId });
  const total = tarefasPrevistas.length;
  tarefasPrevistas = [];
  $("#importar-texto").value = "";
  $("#btn-importar").disabled = true;
  $("#btn-importar").textContent = "Importar";
  $("#previsao-importar").innerHTML =
    `<div class="vazio"><span class="emoji">✅</span>${total} tarefa${total === 1 ? "" : "s"} importada${total === 1 ? "" : "s"}.</div>`;
  desenhar();
});

/* ===================== Cópia de segurança ===================== */

$("#btn-exportar").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(estado, null, 2)], { type: "application/json" });
  const ligacao = document.createElement("a");
  ligacao.href = URL.createObjectURL(blob);
  ligacao.download = `tarefas-${hojeISO()}.json`;
  ligacao.click();
  URL.revokeObjectURL(ligacao.href);
});

$("#btn-restaurar").addEventListener("click", () => $("#ficheiro-restauro").click());

$("#ficheiro-restauro").addEventListener("change", async (evento) => {
  const ficheiro = evento.target.files[0];
  if (!ficheiro) return;
  try {
    const dados = JSON.parse(await ficheiro.text());
    if (!Array.isArray(dados.projetos) || !Array.isArray(dados.tarefas)) {
      throw new Error("formato inválido");
    }
    if (!confirm("Substituir os dados atuais pela cópia escolhida?")) return;
    estado = dados;
    guardar();
    desenhar();
  } catch {
    alert("O ficheiro escolhido não é uma cópia válida.");
  } finally {
    evento.target.value = "";
  }
});

/* ===================== Arranque ===================== */

desenhar();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {
    /* sem service worker continua a funcionar, só não fica offline */
  });
}
