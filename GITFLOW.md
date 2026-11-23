# Gitflow: guia básico

Gitflow é uma forma de organizar o trabalho com Git usando branches (ramificações). Cada branch tem uma função, ajudando a separar novas funcionalidades, preparação de versões e correções urgentes.

## O que cada branch faz

| Branch | Função | Nasce de | Ao terminar, integra em |
| --- | --- | --- | --- |
| `main` | Guarda o histórico das versões estáveis, prontas para produção. | Branch principal do repositório | — |
| `develop` | Reúne as funcionalidades que vão entrar na próxima versão. Pode conter trabalho ainda não publicado. | `main`, na configuração inicial | `release/*`, para preparar uma versão |
| `feature/*` | Desenvolve uma funcionalidade de forma isolada. Exemplo: `feature/tela-login`. | `develop` | `develop` |
| `release/*` | Prepara uma versão: testes, ajustes finais, documentação e número da versão. Exemplo: `release/1.0.0`. | `develop` | `main` e `develop` |
| `hotfix/*` | Corrige um problema urgente de uma versão em produção. Exemplo: `hotfix/corrigir-login`. | `main` | `main` e `develop` |

> Alguns repositórios usam `master` no lugar de `main`. Confira o nome usado no seu projeto.

As branches `main` e `develop` são permanentes. As branches `feature/*`, `release/*` e `hotfix/*` são temporárias e normalmente são removidas depois da integração.

## Fluxo resumido

1. Crie uma `feature/*` a partir de `develop`.
2. Desenvolva, faça commits e teste sua alteração.
3. Integre a feature em `develop`, geralmente por um Pull Request (PR).
4. Quando as funcionalidades planejadas estiverem prontas, crie uma `release/*` a partir de `develop`.
5. Faça os testes e ajustes finais na release. Evite adicionar novas funcionalidades nela.
6. Integre a release em `main`, marque a versão com uma tag e leve os ajustes também para `develop`.
7. Se aparecer um problema urgente em produção, crie uma `hotfix/*` a partir de `main`. Depois, integre a correção em `main` e `develop` e crie uma nova tag.

> Se houver uma release em andamento, ela também deve receber as correções de hotfix que forem necessárias para a versão.

## Exemplo prático com comandos Git

Estes exemplos usam o Git comum, sem precisar instalar uma extensão de Gitflow. Execute-os em um repositório com `main` e um remoto chamado `origin`. Em projetos de equipe, respeite as regras de PR e proteção de branches.

### 1. Criar a branch de desenvolvimento

Faça isso apenas se `develop` ainda não existir:

```bash
git switch main
git pull --ff-only origin main
git switch -c develop
git push -u origin develop
```

### 2. Criar uma funcionalidade

```bash
git switch develop
git pull --ff-only origin develop
git switch -c feature/tela-login

# Depois de editar os arquivos:
git status
git add caminho/do/arquivo
git commit -m "feat: adiciona tela de login"
git push -u origin feature/tela-login
```

Substitua `caminho/do/arquivo` pelo arquivo que você alterou. Depois do push, abra um PR de `feature/tela-login` para `develop`.

### 3. Preparar uma versão

Depois que as features forem integradas em `develop`:

```bash
git switch develop
git pull --ff-only origin develop
git switch -c release/1.0.0

# Faça os testes e registre os ajustes finais em commits.
git push -u origin release/1.0.0
```

Quando a release estiver aprovada, integre-a em `main` e em `develop` por PRs. Após a integração em `main`, crie a tag no commit da versão:

```bash
git switch main
git pull --ff-only origin main
git tag -a v1.0.0 -m "Versão 1.0.0"
git push origin v1.0.0
```

Uma tag marca um ponto específico do histórico, como uma versão publicada. A integração e a tag não fazem o deploy automaticamente: isso depende da configuração do projeto.

### 4. Criar uma correção urgente

```bash
git switch main
git pull --ff-only origin main
git switch -c hotfix/corrigir-login

# Corrija o problema e execute os testes.
git add caminho/do/arquivo
git commit -m "fix: corrige erro no login"
git push -u origin hotfix/corrigir-login
```

Abra os PRs para levar a correção a `main` e `develop`. Depois da integração em `main`, marque a versão corrigida, por exemplo `v1.0.1`, seguindo o mesmo procedimento da release.

## Dicas básicas

- **Confira onde você está:** `git branch --show-current` mostra a branch atual; `git status` mostra alterações e arquivos pendentes.
- **Use nomes claros:** prefira `feature/cadastro-cliente` a `feature/coisas`.
- **Faça commits pequenos:** cada commit deve representar uma mudança compreensível.
- **Revise antes de adicionar:** use `git diff` e evite incluir arquivos sem relação com a tarefa.
- **Não envie segredos:** senhas, tokens e arquivos `.env` com credenciais não devem entrar nos commits. Configure o `.gitignore`.
- **Atualize a branch de origem antes de criar outra:** isso reduz a chance de começar com código desatualizado.
- **Teste antes de integrar:** uma feature concluída precisa funcionar junto com o restante do projeto.
- **Resolva conflitos com atenção:** entenda as duas alterações e teste o resultado; não escolha um lado automaticamente.
- **Apague branches temporárias após a integração:** isso mantém o repositório organizado. Não remova a release antes de levar seus ajustes aos destinos necessários.
- **Combine o processo com a equipe:** Gitflow é uma convenção, não uma regra obrigatória do Git. Projetos menores ou com entregas contínuas podem usar fluxos mais simples.

## Comandos úteis para estudar

```bash
git status                      # Mostra o estado dos arquivos
git branch                      # Lista branches locais
git branch -a                   # Lista branches locais e referências remotas
git switch nome-da-branch       # Troca de branch
git switch -c nova-branch       # Cria uma branch e muda para ela
git diff                        # Mostra alterações ainda não adicionadas ao stage
git diff --staged               # Mostra o que entrará no próximo commit
git log --oneline --graph --all  # Mostra o histórico das branches em forma de grafo
```

## Para memorizar

- `main`: versão estável.
- `develop`: próxima versão em desenvolvimento.
- `feature/*`: nova funcionalidade.
- `release/*`: preparação de uma versão.
- `hotfix/*`: correção urgente em produção.
