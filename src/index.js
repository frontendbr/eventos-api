const http = require('http');
const express = require('express');
const morgan = require('morgan');
const middleware = require('./middleware');
const initializeDb = require('./database');
const api = require('./api');
const config = require('config');

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan());

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

module.exports = app;
