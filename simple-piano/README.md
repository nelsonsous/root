# 🎹 Piano Mágico

Uma PWA (Progressive Web App) de piano para crianças aprenderem a tocar as primeiras músicas — inspirada no Simply Piano, mas simples, gratuita e **100% offline**.

## Funcionalidades

- **🎵 Tocar à Vontade** — piano livre com 30 teclas (Sol3 a Dó6), multi-toque e glissando (deslizar o dedo pelas teclas).
- **⭐ Aprender Músicas** — a tecla seguinte acende com uma estrela; a criança avança ao seu ritmo, com barra de progresso, e ganha 1 a 3 estrelas no fim (guardadas no dispositivo).
- **👂 Ouvir** — demonstração da música com as teclas a acender.
- **🏷️ Nomes das notas** — alternar entre Dó-Ré-Mi, C-D-E ou sem nomes; cada nota tem uma cor própria (arco-íris).
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
- O som é sintetizado com a **Web Audio API** (sem ficheiros de áudio), por isso funciona offline e a app é minúscula.
- Não usa nenhuma API externa (Mistral, etc.) — não é necessária para esta funcionalidade e assim a app funciona sem internet e sem custos. Pode ser adicionada no futuro, por exemplo para gerar novas músicas ou um "professor" virtual.
- Os ícones são gerados por `tools/make-icons.js` (`node tools/make-icons.js`), sem dependências.
