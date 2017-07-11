const { Router } = require('express');

module.exports = ({ config,  db }) => {
  console.info('Init Login module');
  const app = Router();


  app.get('/login', (req, res) => {

	});

  return app;
};
