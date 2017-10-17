const app = require('./app'),
	middleware = require('./middleware'),
	initializeDb = require('./database'),
	api = require('./api'),
	config = require('config'),
	views = require('./views'),
	signout = require('./middleware/signout-middleware'),
	errorHandler = require('./middleware/error-handler-middleware');

initializeDb(db => {

	signout({ app, db });
	views({ config, db, app });
	errorHandler({ app, db });

	app.use(middleware({ config, db, app }));
	app.use('/api', api({ config, db }));

	app.listen(app.get('PORT'), () => console.log(`Started on port ${app.get('PORT')}`));
});