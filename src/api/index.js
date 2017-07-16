const { version }  = require('../../package.json');
const { Router } = require('express');
const firebase = require('firebase');
const Docs = require('./docs');
const Login = require('./login');

module.exports = ({ config, db }) => {
  console.info('Init API module');
	let api = Router();

  api.use(Docs({config, db}));
  api.use(Login({config, db}));

	api.get('/', (req, res, next) => {
		res.json({ version });
    next();
	});

  //essa middleware é responsável por deslogar o usuário
	api.use(( req, res, next ) => {
		firebase.auth().signOut().then(function() {
		  console.log('Signed Out');
		}, function(error) {
		  console.error('Sign Out Error', error);
		});
	});

	return api;
}
