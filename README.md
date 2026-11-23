# Git Flow - Testes

Repositório de estudo para praticar Git, GitHub e o fluxo de trabalho GitFlow.

Atividade 2: documentar os principais comandos e desenvolver um formulário de cadastro com HTML, CSS e JavaScript, registrando cada arquivo em um commit separado.

## Configuração inicial

```bash
# Definir a identificação usada nos próximos commits
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"

# Conferir as configurações
git config --list
```

## Criar ou clonar um repositório

Escolha uma das opções: iniciar uma pasta local ou clonar um repositório existente.

```bash
# Iniciar um repositório na pasta atual, usando main
git init -b main

# OU baixar um repositório existente
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
```

## Consultar alterações e histórico

```bash
# Ver arquivos novos, modificados e preparados para commit
git status

# Ver alterações ainda não preparadas
git diff

# Ver alterações preparadas
git diff --staged

# Consultar o histórico e as branches
git log --oneline --graph --all
```

## Preparar arquivos e criar commits

```bash
# Preparar um arquivo específico
git add README.md

# Criar o commit exigido na atividade
git commit -m "docs: comandos principais de Git"

# Preparar todas as alterações, após conferir o git status
git add .
```

## Conectar ao GitHub, enviar e baixar alterações

Crie o repositório público no GitHub. Se estiver enviando um projeto local, crie o remoto vazio e substitua a URL abaixo pela URL real. Em um repositório clonado, o remoto origin já está configurado.

```bash
# Conectar o projeto local ao repositório remoto
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# Conferir os remotos
git remote -v

# Enviar main pela primeira vez e configurar seu acompanhamento
git push -u origin main

# Enviar novos commits da branch com acompanhamento configurado
git push

# Buscar atualizações sem integrá-las à branch atual
git fetch origin

# Atualizar a branch atual somente se for possível avançar sem merge
git pull --ff-only
```

## Criar e trocar branches

```bash
# Listar branches locais
git branch

# Listar branches locais e remotas
git branch -a

# Criar uma branch e mudar para ela
git switch -c feature/cadastro

# Trocar para uma branch existente
git switch main

# Enviar a nova branch ao GitHub
git push -u origin feature/cadastro

# Excluir uma branch local já integrada
git branch -d feature/cadastro
```

## Integrar branches e resolver conflitos

```bash
# Integrar a funcionalidade à develop
git switch develop
git merge --no-ff feature/cadastro
```

Se ocorrer um conflito, abra os arquivos indicados por `git status`, escolha o conteúdo correto e remova os marcadores de conflito. Depois finalize a integração:

```bash
git add arquivo-corrigido
git commit

# Para cancelar um merge ainda em andamento
git merge --abort
```

## Corrigir e desfazer commits

```bash
# Corrigir a mensagem do último commit ainda não enviado
git commit --amend -m "Mensagem corrigida"

# Incluir um arquivo esquecido no último commit ainda não enviado
git add arquivo-esquecido
git commit --amend --no-edit

# Desfazer o último commit local, mantendo as alterações preparadas
git reset --soft HEAD~1

# Desfazer um commit já compartilhado por meio de um novo commit
# Substitua HASH_DO_COMMIT pelo identificador mostrado no git log
git revert HASH_DO_COMMIT

# Retirar um arquivo da preparação, preservando seu conteúdo
git restore --staged arquivo

# Descartar alterações não preparadas de um arquivo rastreado
# Atenção: alterações locais nesse arquivo serão perdidas
git restore arquivo
```

`--amend` e `reset` alteram o histórico. Use-os em commits ainda não compartilhados; para desfazer commits enviados, prefira `git revert`.

## Guardar alterações temporariamente

```bash
# Guardar alterações, incluindo arquivos novos não ignorados
git stash push -u -m "Cadastro em andamento"

# Listar alterações guardadas
git stash list

# Recuperar o último conjunto guardado
git stash pop
```

## GitFlow com comandos do Git

No GitFlow, as branches têm responsabilidades específicas:

- `main`: versões estáveis.
- `develop`: integração das funcionalidades para a próxima versão.
- `feature/*`: novas funcionalidades, criadas a partir de develop.
- `release/*`: preparação de uma versão, criada a partir de develop.
- `hotfix/*`: correções urgentes, criadas a partir de main.

Os exemplos abaixo usam comandos nativos do Git e pressupõem um repositório com pelo menos um commit. Antes de trocar de branch, confira o `git status` e faça commit ou guarde alterações pendentes.

### Iniciar develop

```bash
git switch main
git switch -c develop
git push -u origin develop
```

### Desenvolver uma funcionalidade

```bash
git switch develop
git switch -c feature/cadastro

# Desenvolver, preparar e registrar as alterações
git add index.html
git commit -m "push 1: estrutura base"
git add style.css
git commit -m "push 2: estilização da tela"
git add script.js
git commit -m "push 3: validação dos campos"
git push -u origin feature/cadastro

# Integrar a funcionalidade concluída
git switch develop
git merge --no-ff feature/cadastro
git push origin develop
```

No GitHub, a integração também pode ser feita por um Pull Request da branch de funcionalidade para develop. Para esta atividade, preserve os três commits individuais na integração.

### Preparar uma versão

```bash
git switch develop
git switch -c release/1.0.0

# Após concluir e registrar os ajustes da versão
git switch main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Versão 1.0.0"
git switch develop
git merge --no-ff release/1.0.0
git push origin main develop
git push origin v1.0.0
```

### Fazer uma correção urgente

```bash
git switch main
git switch -c hotfix/1.0.1

# Corrigir o problema e registrar os arquivos alterados
git add arquivo-corrigido
git commit -m "fix: corrige problema no cadastro"

git switch main
git merge --no-ff hotfix/1.0.1
git tag -a v1.0.1 -m "Correção 1.0.1"
git switch develop
git merge --no-ff hotfix/1.0.1
git push origin main develop
git push origin v1.0.1
```

## Ordem dos commits da atividade

1. `README.md`: `docs: comandos principais de Git`
2. `index.html`: `push 1: estrutura base`
3. `style.css`: `push 2: estilização da tela`
4. `script.js`: `push 3: validação dos campos`

Um commit registra alterações localmente. O comando `git push` envia esses commits ao GitHub.
