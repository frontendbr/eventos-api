const { Router } = require('express');

module.exports = ( { config, db } ) => {
  console.info('Init Middleware module');
	let routes = Router();
	// add middleware here

	return routes;
}
