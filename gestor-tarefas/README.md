# Gestor de Tarefas

Aplicação web (PWA) para gerir tarefas por projeto e ver num relance o que
tens de tratar **hoje**. Funciona offline e pode ser instalada no telemóvel
ou no computador como uma app.

## Porquê assim?

A app não liga ao Outlook nem ao Teams — esses acessos exigem autorização
da empresa e não estão disponíveis aqui. Em alternativa, **todos os dados
ficam apenas no teu dispositivo** (no armazenamento do browser) e podes
trazer tarefas de fora pela aba **Importar**: basta copiar texto de um
email, de um documento do Teams ou de uma exportação (Outlook, Planner,
Excel) e colar.

## Como usar

- **Hoje** — mostra, agrupadas por projeto, as tarefas com data até hoje
  (as em atraso aparecem destacadas). A caixa no topo adiciona uma tarefa
  para o próprio dia. Toca na caixa para concluir; toca no texto para
  editar (projeto, data, prioridade, notas) ou apagar.
- **Projetos** — cria projetos com cor própria, adiciona tarefas com data
  e prioridade, e consulta as concluídas. O lápis (✎) permite renomear,
  mudar a cor ou apagar o projeto.
- **Importar** — cola texto com uma tarefa por linha. São reconhecidos:
  - campos separados por `;` ou tabulação: `título; data; prioridade`;
  - datas no meio do texto: `15/06`, `15/06/2026` ou `2026-06-15`;
  - prioridades pelas palavras `urgente`/`alta` e `baixa`.

  Usa «Pré-visualizar» para confirmar antes de importar.
- **Cópia de segurança** — no rodapé, «Guardar cópia (JSON)» descarrega os
  dados e «Repor cópia» restaura-os (útil para mudar de dispositivo).

## Desenvolvimento

Sem dependências: HTML, CSS e JavaScript puros.

```bash
# servir localmente
python3 -m http.server 8000 --directory gestor-tarefas

# regenerar os ícones
node gestor-tarefas/tools/make-icons.js
```
