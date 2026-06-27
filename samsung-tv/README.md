# TV Base — app para Samsung Smart TV (Tizen)

Projeto-base para desenvolver aplicações para a tua **Samsung Neo QLED 2022
("Tyson")**, que corre **Tizen OS**. As apps Samsung fazem-se em **HTML + CSS +
JavaScript** — exatamente a mesma tecnologia dos outros projetos web deste
repositório (piano, ginástica, voleibol). Por isso, portar um deles para a TV é
sobretudo adaptar a **navegação ao comando** e o **layout ao ecrã grande**.

## O que está aqui

| Ficheiro       | Para que serve                                                        |
|----------------|----------------------------------------------------------------------|
| `config.xml`   | Configuração da app Tizen (o "manifest" da TV: id, ícone, permissões) |
| `index.html`   | Ecrã principal com uma grelha de itens (tiles)                       |
| `styles.css`   | Estilos para TV: ecrã 1920×1080, texto grande, foco bem visível     |
| `app.js`       | Navegação pelo comando (setas + OK + Voltar)                         |

## Como é diferente de uma app web normal

1. **Sem rato nem toque.** Tudo se faz com o comando: setas para mover o "foco",
   OK para escolher, Voltar para sair. Ver `app.js`.
2. **Ecrã fixo 1920×1080**, visto de longe → texto e botões grandes.
3. **Safe area**: as TVs cortam as bordas, por isso há margem de segurança no CSS.
4. **`config.xml`** em vez de `manifest.webmanifest`.

## Testar rapidamente no PC (sem TV)

Abre `index.html` no navegador. As setas do teclado e o Enter já funcionam como o
comando. A tecla "Voltar" da TV só funciona na TV real.

```bash
# a partir da pasta samsung-tv/
python3 -m http.server 8080
# depois abre http://localhost:8080
```

## Instalar na TV (modo programador)

1. **Ativa o Modo Programador na TV**
   - Abre a app **Apps**, escreve `12345` no comando → aparece o menu de
     Developer Mode → liga e indica o **IP do teu PC**. Reinicia a TV.
2. **No PC, instala o Tizen Studio** (com a "TV Extension") ou só o **Tizen CLI**.
3. **Cria um certificado de programador** (Samsung) no Certificate Manager e
   atualiza o `id`/`package` no `config.xml` com o teu prefixo.
4. **Liga, empacota e instala:**
   ```bash
   sdb connect IP_DA_TV
   tizen build-web -- .
   tizen package -t wgt -s NOME_DO_PERFIL -- .buildResult
   tizen install -n TVBase.wgt -t NOME_DO_DISPOSITIVO
   ```
5. A app aparece na linha de apps da TV. 🎉

> Documentação oficial: Samsung Developers → Smart TV → "Get Started".

## Próximo passo: portar um jogo

Para trazer, por exemplo, a **Treinadora de Voleibol** para a TV:
1. Copiar a pasta do jogo para dentro de `samsung-tv/`.
2. Em `app.js`, no tile do voleibol, usar `location.href = "./voleibol/index.html"`.
3. Adaptar o jogo para navegação por comando e ecrã landscape.

Diz-me qual queres portar e eu trato disso.
