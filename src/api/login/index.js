const { Router } = require('express');
const firebase = require('firebase');
var admin = require("firebase-admin");

module.exports = ({ config,  db }) => {
  console.info('Init Login module');
  const app = Router();


  app.get('/login', (req, res) => {
    firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
      admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
          res.json(decodedToken);
        }).catch(function(error) {
          // Handle error
        });


    }).catch(function(error) {
      // Handle error
    });
	});

  return app;
};
