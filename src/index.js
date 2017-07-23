const http = require('http');
const express = require('express');
const morgan = require('morgan');
const middleware = require('./middleware');
const initializeDb = require('./database');
const api = require('./api');
const config = require('config');
const views = require('./views');

const app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// connect to db
initializeDb( db => {

	app.use(middleware({ config, db, app }));

	views({ config, db, app });

	app.use('/api', api({ config, db }));

	//essa middleware é responsável por deslogar o usuário
	app.use(( req, res, next ) => {
		db.signOut().then(function() {
		  console.log('Signed Out');
		}, function(error) {
		  console.error('Sign Out Error', error);
		});
	});

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

module.exports = app;
