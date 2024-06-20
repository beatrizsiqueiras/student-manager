# Trabalho Avaliativo - Programação para Dispositivos Móveis :

### Objetivo

-   O objetivo deste trabalho é desenvolver uma aplicação web utilizando Angular, Angular Material e Bootstrap no front-end, e json-server como backend, simulando um banco de dados em JSON. A aplicação deve proporcionar uma interface amigável e responsiva para o usuário, demonstrando os conhecimentos adquiridos em programação para dispositivos móveis.

## Requisitos

-   Node.js (versão > 20) e npm instalados.

    Site oficial: <a href="https://nodejs.org/pt">Node.js</a>
    Certifique-se de baixar a versão mais recente disponível no site oficial.

-   Angular CLI instalado globalmente.
    `npm install -g @angular/cli`

-   json-server instalado globalmente.
    `npm install -g json-server`

## Instruções de Uso:

-   Certifique-se de que você possui o Node.js e o npm instalados em sua máquina.
-   Clone o repositório do projeto para o seu ambiente local

    `git clone <URL_DO_REPOSITORIO> `

-   Navegue até o diretório do projeto.

cd <NOME_DO_DIRETORIO>

-   Instale as dependências do projeto.

    `npm install`

### Iniciando a API:

-   Inicie o json-server para simular o backend.

    `json-server --watch db/students.json`

-   O json-server estará rodando em http://localhost:3000.

### Iniciando a aplicação Angular:

-   Abra um novo terminal e navegue até o diretório do projeto, se ainda não estiver nele.

    `cd <NOME_DO_DIRETORIO>`

-   Inicie a aplicação Angular.

    `ng serve`

-   A aplicação estará rodando em http://localhost:4200.

### O que foi feito?

-   Estrutura do Projeto: O projeto foi estruturado utilizando Angular, Angular Material para componentes de UI e Bootstrap para estilos adicionais e responsividade.
-   Componentes Angular: Foram criados diversos componentes, cada um responsável por uma parte específica da aplicação.
-   Serviços: Serviços foram desenvolvidos para lidar com a comunicação entre o front-end e o json-server.
-   Rotas: Configuração de rotas para navegação entre diferentes vistas da aplicação.
-   Estilização: Utilização de Angular Material e Bootstrap para uma interface limpa e responsiva.

-   Banco de Dados Simulado: Utilização do json-server para simular uma API RESTful com um banco de dados JSON.

-   Funcionalidades Implementadas:
 -   Listagem de itens.
 -   Visualização detalhada de itens.
 -   Adição, edição e remoção de itens.

<small>Os gráficos e cards da Home são apenas para a estética do projeto, servindo apenas como um protótipo no momento, apenas os itens acima são funcionais!</small>

### Versão desktop:

[Screencast from 20-06-2024 20:37:49.webm](https://github.com/beatrizsiqueiras/student-manager/assets/88863619/7a0a9937-168f-4704-b4b0-565773198f03)

### Versão mobile:

[Screencast from 20-06-2024 20:42:16.webm](https://github.com/beatrizsiqueiras/student-manager/assets/88863619/525d0418-df85-4f07-a21b-a60120e10681)

