const { Router } = require('express');

module.exports = ({ config, db, app }) => {

  app.set('views', __dirname + '/ejs');
  app.set('view engine', 'ejs');

  app.get('/home',(req, res, next) => {
			res.render('home', { user: req.user });
      next();
	});

}
