const { Router } = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

module.exports = ( { config, db } ) => {
  console.info('Init Middleware Express Default module');
  const routes = Router();


  routes.use(bodyParser.urlencoded({ extended: true }));
  routes.use(bodyParser.json());
  routes.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


  return routes;
}
