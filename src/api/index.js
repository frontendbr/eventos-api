const { version }  = require('../../package.json');
const { Router } = require('express');
const Docs = require('./docs');
const Events = require('./events');
const firebase = require('firebase');

module.exports = ({ config, db }) => {
  console.info('Init API module');
	let api = Router();

	api.use(function myauth(req, res, next) {

		const accessToken = req.get('Authorization');
    if (accessToken) {
				const credential = firebase.auth.GithubAuthProvider.credential(accessToken);

				firebase
				.auth()
				.signInWithCredential(credential)
				.then(()=> {
					console.log('OK');
					req.authentication = { user: 'bob' };
    			next();
				})
				.catch((error) => {
						console.log('ruim');
				});
				
    } else {
        res.status(401).json({error : 'User not Allowed!'});
    }

});

	api.use(Docs({config, db}));
	api.use(Events({config, db}));

	api.get('/',(req, res, next) => {
		res.json({ version });
    next();
	});

	return api;
}
