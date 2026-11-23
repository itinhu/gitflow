# Git Flow - Testes

Atividade 2 de prática de Git e GitFlow: documentação dos principais comandos e desenvolvimento de um formulário de cadastro com HTML, CSS e JavaScript.

**Repositório:** [itinhu/gitflow](https://github.com/itinhu/gitflow)

## Arquivos da atividade

| Arquivo | Finalidade |
| --- | --- |
| `README.md` | Referência dos principais comandos de Git e GitFlow |
| `index.html` | Estrutura do formulário com título, pelo menos quatro campos e botão de cadastrar |
| `style.css` | Estilização do formulário |
| `script.js` | Validação dos campos e funcionamento do formulário |

## Principais comandos de Git

### Repositório e sincronização

| Comando | Finalidade |
| --- | --- |
| `git clone https://github.com/itinhu/gitflow.git` | Clonar este repositório |
| `git remote -v` | Consultar os repositórios remotos |
| `git status` | Consultar o estado dos arquivos |
| `git fetch origin` | Buscar atualizações do remoto |
| `git pull --ff-only` | Atualizar a branch atual por avanço direto |
| `git push -u origin main` | Enviar main e configurar o acompanhamento remoto |
| `git push` | Enviar os commits da branch atual com acompanhamento configurado |

### Commits e histórico

| Comando | Finalidade |
| --- | --- |
| `git add README.md` | Preparar o README para commit |
| `git add .` | Preparar todas as alterações da pasta atual |
| `git commit -m "docs: comandos principais de Git"` | Registrar o commit da documentação |
| `git log --oneline --graph --all` | Consultar o histórico das branches |
| `git diff` | Exibir alterações ainda não preparadas |
| `git diff --staged` | Exibir alterações preparadas para commit |

### Branches e integração

| Comando | Finalidade |
| --- | --- |
| `git branch` | Listar branches locais |
| `git branch -a` | Listar branches locais e remotas |
| `git switch -c develop` | Criar develop a partir da branch atual e mudar para ela |
| `git switch -c feature/cadastro` | Criar a branch do cadastro a partir da branch atual |
| `git switch main` | Mudar para main |
| `git switch develop` | Mudar para develop |
| `git push -u origin feature/cadastro` | Enviar a branch do cadastro |
| `git merge --no-ff feature/cadastro` | Integrar a funcionalidade à branch atual com um commit de merge |
| `git merge --abort` | Cancelar um merge em andamento |
| `git branch -d feature/cadastro` | Excluir a branch local após sua integração |

### Correção de commits e alterações

| Comando | Finalidade |
| --- | --- |
| `git commit --amend -m "Mensagem corrigida"` | Corrigir a mensagem do último commit local |
| `git commit --amend --no-edit` | Incluir alterações preparadas no último commit, mantendo a mensagem |
| `git reset --soft HEAD~1` | Desfazer o último commit e manter as alterações preparadas |
| `git revert <hash-do-commit>` | Criar um novo commit que desfaz as alterações do commit indicado |
| `git restore --staged README.md` | Retirar o README da preparação sem apagar suas alterações |
| `git restore README.md` | Descartar alterações não preparadas do README |
| `git stash push -u -m "Cadastro em andamento"` | Guardar temporariamente alterações, incluindo arquivos novos não ignorados |
| `git stash list` | Listar alterações guardadas |
| `git stash pop` | Recuperar o último conjunto de alterações guardadas |

`--amend` e `reset` reescrevem o histórico e ficam reservados a commits ainda não compartilhados. `revert` registra a correção de um commit compartilhado. `restore` sem `--staged` descarta as alterações locais do arquivo. Em `git revert`, `<hash-do-commit>` representa o identificador exibido por `git log`.

## Referência de GitFlow

| Branch | Responsabilidade | Origem |
| --- | --- | --- |
| `main` | Versões estáveis | Branch principal |
| `develop` | Integração da próxima versão | `main` |
| `feature/*` | Novas funcionalidades | `develop` |
| `release/*` | Preparação de versões | `develop` |
| `hotfix/*` | Correções urgentes | `main` |

Comandos nativos do Git associados ao fluxo, executados na branch de origem ou destino correspondente:

| Comando | Finalidade |
| --- | --- |
| `git switch -c feature/cadastro develop` | Criar a funcionalidade a partir de develop |
| `git switch -c release/1.0.0 develop` | Criar a preparação da versão a partir de develop |
| `git switch -c hotfix/1.0.1 main` | Criar uma correção urgente a partir de main |
| `git merge --no-ff release/1.0.0` | Integrar a release à branch atual; a release deve ser integrada a main e develop |
| `git merge --no-ff hotfix/1.0.1` | Integrar a correção à branch atual; o hotfix deve ser integrado a main e develop |
| `git tag -a v1.0.0 -m "Versão 1.0.0"` | Marcar o commit da versão |
| `git push origin v1.0.0` | Enviar a tag da versão |

## Commits da atividade

| Ordem | Arquivo | Mensagem |
| --- | --- | --- |
| 1 | `README.md` | `docs: comandos principais de Git` |
| 2 | `index.html` | `push 1: estrutura base` |
| 3 | `style.css` | `push 2: estilização da tela` |
| 4 | `script.js` | `push 3: validação dos campos` |
