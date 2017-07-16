var admin = require("firebase-admin");

module.exports = () => {

  var serviceAccount = require("./frontend-br-eventos-firebase-adminsdk-cwau8-feba252aa4.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://frontend-br-eventos.firebaseio.com"
  });

  return admin;
}
