const { version }  = require('../../package.json');
const { Router } = require('express');
const Docs = require('./docs');
const Login = require('./login');

module.exports = ({ config, db }) => {
  console.info('Init API module');
	let api = Router();

  api.use(Docs({config, db}));
  api.use(Login({config, db}));

	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
