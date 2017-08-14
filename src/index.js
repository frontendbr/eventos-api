const http = require('http');
const express = require('express');
const morgan = require('morgan');
const middleware = require('./middleware');
const initializeDb = require('./database');
const api = require('./api');
const config = require('config');
const views = require('./views');
const signout = require('./middleware/signout-middleware');
const errorHandler = require('./middleware/error-handler-middleware');

const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

initializeDb(db => {

	app.use(middleware({ config, db, app }));

	views({ config, db, app });

	app.use('/api', api({ config, db }));

	signout({ app, db });

	errorHandler({ app, db });

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

module.exports = app;
