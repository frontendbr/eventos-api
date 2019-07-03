# frontendbr-eventos-api
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Master: [![Build Status](https://travis-ci.org/frontendbr/eventos-api.svg?branch=master)](https://travis-ci.org/frontendbr/eventos-api)
[![Coverage Status](https://coveralls.io/repos/github/frontendbr/eventos-api/badge.svg?branch=master)](https://coveralls.io/github/frontendbr/eventos-api?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/frontendbr/eventos-api.svg)](https://greenkeeper.io/)

Esse projeto tem como intuito criar uma API capaz de fornecer os dados para os eventos do [frontendbr](frontendbr.com.br/eventos).

### Draft
O desenho da API está sendo feito no [Swagger](https://swagger.io).
Para visualizar, você pode acessar a [documentação](https://frontendbreventosapi-eventosapi.wedeploy.io/api/docs/) (Em atualização)

Com isso é possível visualizar o atual draft, qualquer sugestão pode ser feita pelas issues.

## Run
As seguintes tecnologias são usadas nesse projeto:
 - Node
 - Express 4
 - ES6
 - MongoDB
 - Babel (Para uso das novas features)
 - Mocha + Chai + Mongo-In-Memory + pow-mongodb-fixtures
 - Nodemon

Você pode, se desejar, configurar uma aplicação do github através do arquivo `dev.json`, a aplicação atual aponta para o callback `http://localhost:3000/auth/callback`.

Para rodar, basta executar `npm i` na raiz, em seguida `npm start`.

### Configuração do ambiente com Firebase e Admin
Link de comandos e configuração atualizados: https://firebase.google.com/docs/functions/config-env?hl=pt-BR



## Dev
Para contribuir com o projeto é muito simples!

Você tem algumas opções:
- Para subir a aplicação para desenvolver, você pode rodar o comando `npm run dev`. Isso inicia o servidor com o `nodemon`, o que permite um desenvolvimento mais ágil.
- Você pode rodar o linter do projeto, usando a opção `npm run eslint`. Por favor, faça isso antes de submeter um pull request.
- Você pode rodar os testes do projeto, usando a opção `npm t` ou `npm test`, essa opção já vai rodar o linter por padrão sempre. Por favor, faça isso antes de submeter um pull request.
- Se você quiser, pode usar o comando `npm run watch` para iniciar o modo watch, que roda o lint e os testes sempre que um arquivo for salvo. Isso nos permite agilidade e feedback rápido. :)

## Testes
A nossa aplicação tem dois tipos de testes, **Integração** e **Unidade**.
Todos os testes estão dentro da pasta test.
#### Testes de integração
Os testes de integração são todos os arquivos terminados em _integration.spec.js_.
Todos os testes são rodados com base em um servidor conectado a uma base do mongo-in-memory. É possível fazer um load de dados nessa base, adicionado informações a pasta fixtures. Esses dados são carregados através do [pow-mongodb-fixtures](https://github.com/powmedia/pow-mongodb-fixtures).
#### Testes de unidade
Os testes de unidade são todos os arquivos terminados em _unit.spec.js_.


## Deploy

A plataforma de Deploy escolhida, foi o [WeDeploy](https://wedeploy.com/).

Para realizar o deploy, é necessário ter instalado o CLI do WeDeploy e alterar o arquivo `wedeploy.json` colocando as variáveis do Admin do Firebase. Sem isso a aplicação não ira funcionar corretamente.

Faça deploy através do comando `we deploy -p eventosapi`, onde eventosapi é o nome do projeto.

Futuramente vamos configurar para que o Deploy seja feito pelo próprio TravisCI após o Build da master.


## Pull-Request e Issues
Você pode abrir uma Issue a qualquer momento e todas elas são bem vindas.
Nós pedimos que você abra uma issue antes de realizar um PR, para que possamos debater sobre a sua ideia e guiar o projeto para o melhor caminho junto com você.

Nós temos algumas restrições para o merge do PR:
- O build do Travis tem que passar, sem isso não podemos realizar o merge.
- É necessário que um admin aprove o PR.
- Entendemos que todos os PRs são importantes, então se você abriu um PR e ninguêm deu um feedback em uma semana, por favor marque alguem para um follow-up. (A ideia de esperar uma semana é para não atolar ninguém com milhões de mensagens)


Dúvidas? Problemas? Quer ajudar?
***Sinta-se a vontade para abrir uma issue.***
