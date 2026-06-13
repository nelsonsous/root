# 🤸‍♀️ Estrelas da Ginástica

Um jogo de ginástica artística onde **tu és a professora**! Treina e orienta as tuas atletas,
monta as coreografias e leva a equipa da competição da escola até ao campeonato internacional.

## Como jogar

Abre o `index.html` num browser (não precisa de servidor nem de instalação).

### O ciclo do jogo

1. **Semanas de treino** — em cada semana, cada atleta pode fazer **uma** atividade:
   - 🤸 **Treinar** — a professora escolhe o movimento e **demonstra-o com o dedo**:
     arrasta do ▶ rosa até à ⭐ ao longo de um arco; a ginasta vai executando o
     movimento à medida que avanças. Os juízes **avaliam a demonstração com estrelas**
     — quanto melhor seguires o arco até ao fim, maior a avaliação e mais a atleta evolui!
   - 🛏 **Descansar** — recupera energia e um pouco de felicidade.
   - 💖 **Elogiar** — sobe a felicidade (atletas tristes evoluem pior e têm notas piores).
2. **Coreografia** — no fim das semanas de treino, a professora escolhe a sequência de
   movimentos de cada atleta (mínimo 2). Mais movimentos e mais difíceis = nota mais alta.
3. **Competição** — as atletas apresentam a coreografia, os juízes dão as notas e
   a equipa compete contra as escolas rivais.

### Movimentos

Salto em Extensão, Rolamento à Frente, **Ponte**, **Aranha**, Vela, **Levantar da Ponte**,
Avião, Espargata, Roda e Pino — desbloqueados à medida que sobem de escalão.

### Escalões e campeonatos

| Campeonato | Escalão |
|---|---|
| Competição da Escola | Infantis (6-8 anos) |
| Campeonato da Cidade | Iniciadas (9-10 anos) |
| Campeonato Regional | Juvenis (11-12 anos) |
| Campeonato Nacional | Juniores (13-14 anos) |
| Campeonato Internacional | Seniores (15+ anos) |

Ao vencer cada campeonato, as atletas crescem e sobem de escalão, e novos movimentos
ficam disponíveis para treinar.

### Vestiário 🎀

Personaliza a professora e cada atleta: tom de pele, cor do maillot de ginástica
(ou fato de treino da professora), padrão (liso, brilhantes, faixa), penteado,
cor do cabelo e adereços (laço, bandolete, flor).

### Pontos de Professora ⭐

Ganhas pontos por **fazer evoluir** as atletas, **mantê-las felizes** e **vencer competições**.
No fim, recebes o teu título: de Treinadora Promissora a **Treinadora Lendária**!

## Desenvolvimento

Tudo em HTML/CSS/JavaScript puro, sem dependências. As ginastas são desenhadas e
animadas em `<canvas>` com um sistema de poses por keyframes (`game.js`).

Teste end-to-end (precisa do Playwright):

```bash
node tools/test-e2e.js
```
