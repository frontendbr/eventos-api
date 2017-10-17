const express = require('express'),
	config = require('config'),
	morgan = require('morgan'),
	app = express();

// Configuração da porta
app.set('PORT', process.env.PORT || config.port);

// Configuração do morgan
app.use(morgan('dev'));

module.exports = app;