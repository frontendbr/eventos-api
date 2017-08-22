const express = require('express');
const path = require('path');

module.exports = ({ config, db, app }) => {


app.use('/', express.static(__dirname + '/../../dist'));
app.use('/scripts', express.static(__dirname + '/../../node_modules'));

app.use(function (req, res, next) {
    if (path.extname(req.path).length > 0) {
        // normal static file request
        next();
    } else if(req.path.indexOf('/api') > -1) {
        // api
        next();
    }
    else {
        // redirect all html requests to `index.html`
        res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
    }
});


  // app.set('views', __dirname + '/ejs');
  // app.set('view engine', 'ejs');

  // app.get('/home',(req, res, next) => {
	// 		res.render('home', { user: req.user });
  //     next();
	// });

}
