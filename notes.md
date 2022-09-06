# Projeto final disciplina SI401 - Programação para WEB

## 1ª entrega

- Página Login
    - Formulário autenticação:
        - Usuário
        - Senha
        - Botão confirmar
        - Botão cadastro

- Página Cadastro
    - Formulário cadastro:
        - Nome completo
        - Data nascimento
        - CPF
        - Telefone
        - E-mail
        - Username (único)
        - Senha

- Página inicial
    (Somente com autenticação)
    - Jogo implementado em JS
        - Construir parte visual
    - Painel com informações
       - Tempo da partida até o momento
       - Configuração do tabuleiro
       - Modalidade da partida
       - (Modo contra o tempo) tempo restante para conclusão
       - Botão trapaça
    - Painel histórico
        - Informações sobre todas as partidas jogadas anteriormente pelo jogador:
            - Nome do jogador
            - Dimensões utilizadas na partida 
            - Modalidade
            - Tempo gasto
            - Resultado
            - Data/Hora da partida
    - Links de navegação:
        - Ranking Global
            - Ranking entre todos os jogadores cadastrados no servidor.
            - Deve exibir os 10 melhores de acordo com maior tabuleiro seguido por menor número de jogadas.
        - Editar informações
            - Editar informações sobre o perfil:
                Não pode alterar data de nascimento, CPF e username.
        - Desconectar
            - Retorna a página de login e encerra a sessão.