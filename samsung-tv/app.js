/*
  app.js — navegação por comando da Samsung Smart TV.

  Numa TV não há rato nem toque: tudo se faz com as setas do comando
  e a tecla OK. A app tem de manter um "foco" (o item selecionado)
  e movê-lo conforme as setas. Este ficheiro faz exatamente isso.

  As teclas chegam como eventos normais de teclado (keydown), mas com
  códigos próprios da TV. Os valores abaixo são os da Samsung (Tizen).
*/

// Códigos das teclas do comando Samsung
const TECLAS = {
  ESQUERDA: 37,
  CIMA: 38,
  DIREITA: 39,
  BAIXO: 40,
  OK: 13,       // tecla "Enter"/"OK" central
  VOLTAR: 10009, // tecla "Return"/"Back" da Samsung
};

const tiles = Array.from(document.querySelectorAll(".tile"));
const COLUNAS = 4; // tem de bater certo com o grid-template-columns do CSS
let indiceFoco = 0;

// Mostra visualmente onde está o foco
function aplicarFoco(novoIndice) {
  if (novoIndice < 0 || novoIndice >= tiles.length) return;
  tiles[indiceFoco].classList.remove("focado");
  indiceFoco = novoIndice;
  tiles[indiceFoco].classList.add("focado");
  tiles[indiceFoco].focus();
}

// O que acontece ao carregar OK em cada tile
function ativar(acao) {
  const msg = document.getElementById("mensagem");
  switch (acao) {
    case "sobre":
      msg.textContent = "TV Base v1.0 — esqueleto pronto a crescer. 🎉";
      break;
    case "voleibol":
    case "ginastica":
    case "piano":
      msg.textContent = `A abrir “${acao}”… (liga aqui o teu jogo)`;
      // Quando portares um jogo, basta fazer: location.href = "./voleibol/index.html";
      break;
    default:
      msg.textContent = "";
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case TECLAS.ESQUERDA:
      aplicarFoco(indiceFoco - 1);
      break;
    case TECLAS.DIREITA:
      aplicarFoco(indiceFoco + 1);
      break;
    case TECLAS.CIMA:
      aplicarFoco(indiceFoco - COLUNAS);
      break;
    case TECLAS.BAIXO:
      aplicarFoco(indiceFoco + COLUNAS);
      break;
    case TECLAS.OK:
      ativar(tiles[indiceFoco].dataset.acao);
      break;
    case TECLAS.VOLTAR:
      // Em Tizen, isto fecha a app. Protegido para também correr no browser.
      if (typeof tizen !== "undefined" && tizen.application) {
        tizen.application.getCurrentApplication().exit();
      }
      break;
  }
});

// Também funciona com clique/toque (útil para testar no browser do PC)
tiles.forEach((tile, i) => {
  tile.addEventListener("click", () => {
    aplicarFoco(i);
    ativar(tile.dataset.acao);
  });
});

// Foco inicial
aplicarFoco(0);
