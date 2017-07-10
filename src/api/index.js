const { version }  = require('../../package.json');
const { Router } = require('express');

module.exports = ({ config, db }) => {
  console.info('Init API module');

	let api = Router();

	// mount the facets resource
	//api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
