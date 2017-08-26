const { version } = require('../../package.json');
const { Router } = require('express');
const loginMiddleware = require('../middleware/login-request-middleware');
const Docs = require('./docs');
const Events = require('./events');
const Admin = require('./admin');

module.exports = ({ config, db }) => {
	console.info('Init API module');
	const loginManager = loginMiddleware({ config, db });

	let api = Router();


	api.use(Docs({ config, db }));
	api.use(Events({ config, db, loginManager }));
	api.use(Admin({ config, db, loginManager }));

	api.get('/', (req, res, next) => {
		res.json({ version });
		next();
	});

	return api;
}
