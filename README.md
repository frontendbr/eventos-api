# frontendbr-eventos-api

Develop: [![Build Status](https://travis-ci.org/angeliski/frontendbr-eventos-api.svg?branch=master)](https://travis-ci.org/angeliski/frontendbr-eventos-api)
[![Coverage Status](https://coveralls.io/repos/github/angeliski/frontendbr-eventos-api/badge.svg?branch=master)](https://coveralls.io/github/angeliski/frontendbr-eventos-api?branch=develop)

Esse projeto tem como intuito criar uma API capaz de fornecer os dados para os eventos do [frontendbr](frontendbr.com.br/eventos).

### Draft
O desenho da API está sendo feito no [Swagger](https://swagger.io).
Para visualizar, você pode acessar a [documentação](https://frontendbreventosapi-eventosapi.wedeploy.io/api/docs/) (Em atualização)

Com isso é possível visualizar o atual draft, qualquer sugestão pode ser feita pelas issues.

## Run
As seguintes tecnologias são usadas nesse projeto:
 - Firebase
 - Node 
 - Express 4
 - ES6

Para rodar o projeto, atualmente é necessário adicionar o arquivo `firebase-admin-sdk.json` na pasta `/src/admin-firebase`. Você pode entender o que é esse arquivo, no seguinte link: [Firebase Admin](https://firebase.google.com/docs/admin/setup?hl=pt-br).
Você pode, se desejar, configurar uma aplicação do github através do arquivo `default.json`, a aplicação atual aponta para o callback `http://localhost:3000/auth/github/callback`.

Para rodar, basta executar `npm i` na raiz, em seguida `npm start`.

## Deploy

A plataforma de Deploy escolhida, foi o [WeDeploy](https://wedeploy.com/).

Para realizar o deploy, é necessário ter instalado o CLI do WeDeploy e alterar o arquivo `wedeploy.json` colocando as variáveis do Admin do Firebase. Sem isso a aplicação não ira funcionar corretamente.

Faça deploy através do comando `we deploy -p eventosapi`, onde eventosapi é o nome do projeto.

Futuramente irei configurar para que o Deploy seja feito pelo próprio TravisCI após o Build da master.

Dúvidas? Sinta-se a vontade para abrir uma issue.
