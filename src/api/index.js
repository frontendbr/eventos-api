const { version }  = require('../../package.json');
const { Router } = require('express');
const Docs = require('./docs');

module.exports = ({ config, db }) => {
  console.info('Init API module');
	let api = Router();

  api.use(Docs({config, db}));

	api.get('/', (req, res, next) => {
		res.json({ version });
    next();
	});

	return api;
}
