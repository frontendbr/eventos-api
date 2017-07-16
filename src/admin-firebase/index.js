var admin = require("firebase-admin");

module.exports = () => {

  const serviceAccount = require("./frontend-br-eventos-firebase-adminsdk-cwau8-feba252aa4.json");
  if (serviceAccount.type) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://frontend-br-eventos.firebaseio.com"
    });

    return admin;
  }

  return {};
}
