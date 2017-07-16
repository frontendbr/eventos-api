const { Router } = require('express');
const defaultMiddleware = require('./default-middleware-application');
const passportMiddleware = require('./passport-middleware');


module.exports = ({ config, db, app }) => {
  console.info('Init Middleware module');
  const routes = Router();

  defaultMiddleware({ config, app });

	routes.use(passportMiddleware({ config, db }));

	return routes;
}
