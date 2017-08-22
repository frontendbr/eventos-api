var admin = require("firebase-admin");

module.exports = ({ config }) => {
  const serviceAccount = require(config.serviceAccountAdminPath);
  
  if (serviceAccount.type) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://frontend-br-eventos.firebaseio.com"
    });

    return admin;
  }

  return {};
}
