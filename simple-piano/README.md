# 🎹 Piano Mágico

Uma PWA (Progressive Web App) de piano para crianças aprenderem a tocar as primeiras músicas — inspirada no Simply Piano, mas simples, gratuita e **100% offline**.

## Funcionalidades

- **🎵 Tocar à Vontade** — piano livre com 30 teclas (Sol3 a Dó6), multi-toque e glissando (deslizar o dedo pelas teclas).
- **⭐ Aprender Músicas** — a tecla seguinte acende com uma estrela; a criança avança ao seu ritmo, com barra de progresso, e ganha 1 a 3 estrelas no fim (guardadas no dispositivo).
- **🎼 Modo pauta** — notação musical a sério (clave de sol, linhas suplementares, mínimas/semínimas/semibreves), com a nota atual destacada, verde quando acertam e vermelho quando falham. Alterna com a cascata de notas no botão 🎼.
- **👂 Ouvir** — demonstração da música com as teclas a acender.
- **🏷️ Nomes das notas** — alternar entre Dó-Ré-Mi, C-D-E ou sem nomes; cada nota tem uma cor própria (arco-íris).
- **🎤 Ouvir o piano verdadeiro** — com o botão do microfone, a app deteta as notas tocadas num piano a sério (ex.: Yamaha P-145) e verifica se a música está a ser bem tocada. Funciona no iPhone/iPad.
- **🔌 MIDI por cabo USB** — em navegadores com Web MIDI (Chrome/Edge em Android e PC), basta ligar o piano por USB e as notas são detetadas com precisão total, sem microfone.
- **PWA instalável** — funciona offline e pode ser adicionada ao ecrã inicial do tablet/telemóvel como uma app normal.

## Músicas incluídas

| Música | Dificuldade |
|---|---|
| ⭐ Brilha, Brilha Estrelinha | 🎵 |
| 🐑 O Cordeirinho | 🎵 |
| 🔔 Bate o Sino (Jingle Bells) | 🎵🎵 |
| 🛏️ Frei Jacó | 🎵🎵 |
| 🎻 Ode à Alegria | 🎵🎵 |
| 🎂 Parabéns a Você | 🎵🎵🎵 (usa uma tecla preta!) |

Para adicionar músicas, basta acrescentar uma entrada ao array `SONGS` no início de `app.js` — cada nota é `["C4", 1]` (nome da nota, duração em tempos).

## Tocar com um piano verdadeiro (ex.: Yamaha P-145)

| Como | Onde funciona | Precisão |
|---|---|---|
| 🎤 Microfone (botão na barra do piano) | iPhone, iPad, Android, PC | Boa para uma nota de cada vez; aceita a nota certa em qualquer oitava próxima |
| 🔌 Cabo USB (MIDI) | Chrome/Edge em Android e PC — **não funciona no Safari/iOS** (a Apple não suporta Web MIDI) | Perfeita |

No modo 🎤, basta pôr o iPhone/tablet perto do piano e carregar no botão do microfone — a app pede permissão na primeira vez (requer HTTPS, por exemplo GitHub Pages). No modo 🔌, liga o cabo USB do piano («USB TO HOST» no P-145) ao computador/Android e a app deteta as notas automaticamente.

## Como experimentar localmente

```bash
cd simple-piano
python3 -m http.server 8080
# abrir http://localhost:8080
```

> O service worker (offline) e a instalação como app requerem HTTPS ou `localhost`.

## Como publicar (GitHub Pages)

1. No GitHub: **Settings → Pages → Deploy from a branch**, escolher a branch e a pasta.
2. Abrir o URL publicado no tablet e usar **"Adicionar ao ecrã principal"** (Safari) ou **"Instalar aplicação"** (Chrome).

## Notas técnicas

- Sem dependências nem build: HTML + CSS + JavaScript puro.
- O som usa **amostras de um piano de cauda real**: [Salamander Grand Piano](https://github.com/Tonejs/audio) (Yamaha C5) © Alexander Holm, licença [CC-BY 3.0](https://creativecommons.org/licenses/by/3.0/). Uma amostra a cada terceira menor; as restantes notas ajustam a velocidade de reprodução (±1 meio-tom). Se as amostras falharem, há síntese Web Audio como recurso.
- Não usa nenhuma API externa (Mistral, etc.) — não é necessária para esta funcionalidade e assim a app funciona sem internet e sem custos. Pode ser adicionada no futuro, por exemplo para gerar novas músicas ou um "professor" virtual.
- Os ícones são gerados por `tools/make-icons.js` (`node tools/make-icons.js`), sem dependências.
